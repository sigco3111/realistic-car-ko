// A realistic car on Rapier, in real units at real gravity. No three.js in this file.
//
// Rapier only carries the rigid body and answers the ray queries; everything a car does is worked out here and applied as
// forces: springs and dampers at each wheel, tyres with a proper slip curve, an engine, a gearbox and differentials.
//
// Where it comes from, all MIT:
// - The tyre (a Pacejka curve, combined slip by normalised slip, load sensitivity) follows Godot-Advanced-Vehicle by Dechode.
// - The gearbox logic, anti-roll bars, damping ratios, brake balance, ABS, traction control and steering assists follow
//   Godot-Easy-Vehicle-Physics by David Shoemaker, Dechode and Baron Wittman (both in third-party/).
// - What counts as upside down, and hopping to right itself, are from folio-2025 by Bruno Simon.
// Patch's own: a curve set by its peak and its falloff, tyre relaxation, wheel speed solved in small steps, the surfaces.

const RPM = 60 / (2 * Math.PI);

/**
 * How each surface grips. `mu` is peak friction, `alpha` and `kappa` the slip angle (rad) and slip ratio at that peak, `falloff` what's left at
 * huge slip, and `scrub` how much harder a tyre going sideways, well past its peak, drags: it ploughs what's under it, so a slide dies.
 * `rough` is how uneven it is, in metres, felt through the springs like any other bump.
 */
export const SURFACES = {
	tarmac: { mu: 1.2, alpha: 0.13, kappa: 0.11, falloff: 0.82, scrub: 0.3, rolling: 0.012, rough: 0.001 },
	gravel: { mu: 0.86, alpha: 0.24, kappa: 0.2, falloff: 0.9, scrub: 0.4, rolling: 0.03, rough: 0.016 },
	grass: { mu: 0.66, alpha: 0.28, kappa: 0.24, falloff: 0.85, scrub: 0.45, rolling: 0.05, rough: 0.024 },
};

/** A sensible car, for anything `new Car` isn't told. */
export const DEFAULTS = {
	mass: 1200,
	comHeight: 0.52, // Centre of mass above the ground, m
	frontWeight: 0.52,
	// Suspension
	travel: 0.26, // m, full length of the spring's stroke
	rest: 0.55, // How far through its travel it sits, loaded: more than half means plenty of droop
	hertz: [1.9, 1.75], // Ride frequency, front and rear
	damping: [0.42, 0.42], // Damping ratio
	bump: 0.7, // Bump and rebound as a share of it
	rebound: 1.35,
	antiRoll: [0.45, 0.25], // Anti-roll bar, as a share of the spring rate
	// Tyres
	tyreGive: 0.025, // s the tyre's own spring takes to pass a sudden change on to the damper
	gripScale: 1,
	loadSensitivity: 0.13,
	relaxation: 0.35, // m rolled before a change of slip angle is fully felt
	wheelInertia: 1.1,
	// Steering
	lock: 0.6, // rad
	steerRate: 3.6, // Lock to lock takes 2 / this, in s
	// Engine and gears
	torque: 340,
	torqueCurve: [[1000, 0.62], [2500, 0.86], [4500, 1], [6000, 0.97], [7200, 0.74]],
	idle: 1100,
	redline: 7200,
	launch: 3400, // The rpm the clutch slips at, pulling away
	engineInertia: 0.16,
	engineBrake: 0.018, // Nm per rpm with the throttle shut
	gears: [3.42, 2.26, 1.68, 1.29, 1.03],
	reverse: 3.3,
	finalDrive: 3.9,
	shiftTime: 0.16,
	efficiency: 0.9,
	frontDrive: 0.4, // Share of drive to the front: 0 is rear drive, 1 front drive
	limitedSlip: 900, // Nm per rad/s a differential resists wheels at different speeds, up to diffLimit
	diffLimit: 500,
	// Brakes
	brakeTorque: 2900, // Nm, all four wheels together
	brakeFront: 0.62,
	handbrakeTorque: 3200,
	handbrakeDrag: 0.3, // How much of the foot brake comes on with the handbrake, so holding it stops the car
	coastBrake: 0.08, // How much of it the engine's worth with nothing pressed below coastSpeed, or rolling against the gear
	coastSpeed: 5, // m/s
	// Air
	dragArea: 0.72, // Drag coefficient times frontal area, m²
	// Assists
	assists: true,
};

const rotate = (q, x, y, z) => {
	const tx = 2 * (q.y * z - q.z * y);
	const ty = 2 * (q.z * x - q.x * z);
	const tz = 2 * (q.x * y - q.y * x);
	return { x: x + q.w * tx + q.y * tz - q.z * ty, y: y + q.w * ty + q.z * tx - q.x * tz, z: z + q.w * tz + q.x * ty - q.y * tx };
};
const dot = (a, b) => a.x * b.x + a.y * b.y + a.z * b.z;
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

/** Smooth noise from about -1 to 1, the same at the same place every time. */
function lumpy(x, z) {
	const ix = Math.floor(x);
	const iz = Math.floor(z);
	const fx = x - ix;
	const fz = z - iz;
	const at = (i, j) => {
		const n = Math.sin(i * 127.1 + j * 311.7) * 43758.5453;
		return (n - Math.floor(n)) * 2 - 1;
	};
	const u = fx * fx * (3 - 2 * fx);
	const v = fz * fz * (3 - 2 * fz);
	return (at(ix, iz) * (1 - u) + at(ix + 1, iz) * u) * (1 - v) + (at(ix, iz + 1) * (1 - u) + at(ix + 1, iz + 1) * u) * v;
}
/** The small unevenness of a surface, as a share of its `rough`: long swells, and shorter ones on top. Nothing short enough to rattle. */
const unevenAt = (x, z) => lumpy(x / 6, z / 6) * 0.75 + lumpy(x / 2.4 + 40, z / 2.4) * 0.25;

/**
 * How much of a tyre's peak force it makes at a slip of `s`, where 1 is the peak: it builds, peaks at 1, and lets go down
 * to `falloff`. A Pacejka curve with its shape factor worked out from the falloff, so it's set by things you can picture.
 */
export function slipCurve(s, falloff) {
	const C = (Math.PI - Math.asin(falloff)) / (Math.PI / 2);
	const B = Math.tan(Math.PI / (2 * C));
	return Math.sin(C * Math.atan(B * s));
}

/**
 * The car.
 *
 *   const car = new Car(RAPIER, world, {
 *     wheels: [{ x, y, z, radius, front }, ...], // Wheel centres on the model, ground at y = 0, front +Z. Left is +x.
 *     size: { width, height, length },
 *     surfaceAt: (x, z, collider) => 'tarmac',   // Optional: what's under a wheel. Tarmac if you don't say.
 *     // ...anything in DEFAULTS
 *   });
 *   // Each physics step, before world.step():
 *   car.input = { throttle, steer, brake, handbrake };  // throttle and brake 0 to 1, steer -1 to 1 (positive is left)
 *   car.update(dt);
 *   world.step();
 *   car.afterStep(dt);
 *
 * Step at 120 Hz. `car.speed`, `.gear`, `.rpm` and each wheel's `.travelled`, `.slip` and `.surface` are there to read.
 */
export class Car {
	constructor(RAPIER, world, options) {
		this.RAPIER = RAPIER;
		this.world = world;
		const { wheels, size, position = { x: 0, y: 0.5, z: 0 }, yaw = 0, groups = {}, surfaceAt = null, ...rest } = options;
		this.tune = { ...DEFAULTS, ...rest };
		this.size = size;
		this.surfaceAt = surfaceAt;
		this.input = { throttle: 0, steer: 0, brake: 0, handbrake: 0 };
		this.listeners = new Map();
		this.spawn = { position: { ...position }, yaw };
		this.position = { ...position };
		this.quaternion = { x: 0, y: Math.sin(yaw / 2), z: 0, w: Math.cos(yaw / 2) };
		this.forward = rotate(this.quaternion, 0, 0, 1);
		this.up = { x: 0, y: 1, z: 0 };
		this.side = rotate(this.quaternion, 1, 0, 0);
		this.velocity = { x: 0, y: 0, z: 0 };
		this.speed = 0;
		this.forwardSpeed = 0;
		this.sideSpeed = 0;
		this.yawRate = 0;
		this.steer = 0;
		this.gear = 1;
		this.rpm = this.tune.idle;
		this.shifting = 0;
		this.sinceShift = 1;
		this.throttleOut = 0;
		this.tractionCut = 0;
		this.wheelsOnGround = 0;
		this.airborne = false;
		this.upsideDown = { active: false, wait: 0 };
		this.flips = 0;
		this.flipWait = 3;
		this.righting = 0;
		this.stuckFor = 0;

		this.makeBody(position, yaw, groups, wheels);
		const rayStart = size.height * 0.5;
		this.wheels = wheels.map((w, index) => {
			const front = w.front ?? w.z > 0;
			return {
				...w,
				index,
				front,
				left: w.x > 0,
				ride: rayStart - w.y,
				rayStart,
				steerAngle: 0,
				spin: 0,
				angle: 0,
				inContact: false,
				contactY: 0,
				contact: { x: 0, y: 0, z: 0 },
				normal: { x: 0, y: 1, z: 0 },
				length: 0,
				compression: 0,
				lastCompression: 0,
				travelled: 0.5,
				load: 0,
				slipAngle: 0,
				slipRatio: 0,
				slip: 0,
				surface: 'tarmac',
				rough: 0,
				dampSpeed: 0,
				fx: 0,
				fy: 0,
				braking: 0,
			};
		});
		this.computeSprings();
		this.rayFlags = RAPIER.QueryFilterFlags.EXCLUDE_DYNAMIC | RAPIER.QueryFilterFlags.EXCLUDE_SENSORS;
	}

	makeBody(position, yaw, groups, wheels) {
		const R = this.RAPIER;
		const t = this.tune;
		const { width, height, length } = this.size;
		this.body = this.world.createRigidBody(
			R.RigidBodyDesc.dynamic()
				.setTranslation(position.x, position.y, position.z)
				.setRotation({ x: 0, y: Math.sin(yaw / 2), z: 0, w: Math.cos(yaw / 2) })
				.setCanSleep(false)
				.setCcdEnabled(true)
				.setLinearDamping(0)
				.setAngularDamping(0.05),
		);
		// A car's mass is spread along it and held low, so these are a little under a solid box's.
		const m = t.mass;
		const pitch = (m * (height * height + length * length)) / 12;
		const yawing = (m * (width * width + length * length)) / 12;
		const roll = (m * (width * width + height * height)) / 12;
		const frontZ = wheels.filter((w) => w.front ?? w.z > 0)[0].z;
		const rearZ = wheels.filter((w) => !(w.front ?? w.z > 0))[0].z;
		const comZ = rearZ + t.frontWeight * (frontZ - rearZ);
		const box = (hw, hh, hl, y, z, main, filter, friction = 0.35) => {
			let c = R.ColliderDesc.cuboid(hw, hh, hl).setTranslation(0, y, z).setFriction(friction).setRestitution(0.1);
			c = main ? c.setMassProperties(m, { x: 0, y: t.comHeight - y, z: comZ - z }, { x: pitch * 0.8, y: yawing * 0.85, z: roll * 0.75 }, { x: 0, y: 0, z: 0, w: 1 }) : c.setMass(0);
			if (filter !== undefined) c = c.setCollisionGroups(filter);
			c = c.setActiveEvents(R.ActiveEvents.CONTACT_FORCE_EVENTS).setContactForceEventThreshold(m * 8);
			return this.world.createCollider(c, this.body);
		};
		const under = 0.3 * height;
		const shoulder = 0.68 * height;
		box(0.47 * width, (shoulder - under) / 2, 0.48 * length, (shoulder + under) / 2, 0, true, groups.body);
		box(0.4 * width, ((height - shoulder) * 0.9) / 2, 0.22 * length, shoulder + ((height - shoulder) * 0.9) / 2, -0.04 * length, false, groups.body);
		if (groups.bumper !== undefined) box(0.5 * width, 0.3 * height, 0.505 * length, 0.42 * height, 0, false, groups.bumper);
	}

	// Spring and damper rates from the ride frequency and damping ratio you asked for, and what each corner carries.
	computeSprings() {
		const t = this.tune;
		const grav = Math.abs(this.world.gravity.y);
		for (const w of this.wheels) {
			const i = w.front ? 0 : 1;
			const share = (w.front ? t.frontWeight : 1 - t.frontWeight) / 2;
			const sprung = t.mass * share;
			w.sprung = sprung;
			const omega = 2 * Math.PI * t.hertz[i];
			w.k = sprung * omega * omega;
			w.c = 2 * t.damping[i] * sprung * omega;
			w.arb = w.k * t.antiRoll[i];
			// The spring holds the corner's weight at the height the model was drawn at: its free length follows.
			w.sag = (sprung * grav) / w.k;
			const droop = t.travel * (1 - t.rest);
			w.maxLength = w.ride + droop;
			w.minLength = Math.max(0.02, w.ride - t.travel * t.rest);
			w.length = w.ride;
			w.opposite = this.wheels.find((o) => o.front === w.front && o.left !== w.left);
			w.inertia = t.wheelInertia;
			w.brakeMax = (t.brakeTorque * (w.front ? t.brakeFront : 1 - t.brakeFront)) / 2;
		}
		this.driven = {
			front: this.wheels.filter((w) => w.front),
			rear: this.wheels.filter((w) => !w.front),
		};
		this.driveWheelCount = (t.frontDrive > 0 ? 2 : 0) + (t.frontDrive < 1 ? 2 : 0);
		this.driveRadius = this.wheels.reduce((sum, w) => sum + w.radius, 0) / this.wheels.length;
		this.wheelbase = Math.abs(this.driven.front[0].z - this.driven.rear[0].z);
	}

	/** After changing car.tune. */
	applyTune() {
		this.computeSprings();
	}

	on(name, fn) {
		if (!this.listeners.has(name)) this.listeners.set(name, []);
		this.listeners.get(name).push(fn);
		return this;
	}

	emit(name, ...args) {
		for (const fn of this.listeners.get(name) ?? []) fn(...args);
	}

	torqueAt(rpm) {
		const c = this.tune.torqueCurve;
		if (rpm <= c[0][0]) return c[0][1] * this.tune.torque;
		for (let i = 1; i < c.length; i++) {
			if (rpm <= c[i][0]) {
				const a = c[i - 1];
				const b = c[i];
				return (a[1] + ((b[1] - a[1]) * (rpm - a[0])) / (b[0] - a[0])) * this.tune.torque;
			}
		}
		return c[c.length - 1][1] * this.tune.torque;
	}

	ratio() {
		const t = this.tune;
		if (this.gear < 0) return -t.reverse * t.finalDrive;
		return t.gears[this.gear - 1] * t.finalDrive;
	}

	/** Before world.step(). */
	update(dt) {
		this.readBody();
		this.updateSteering(dt);
		this.updateGearbox(dt);
		this.readRoad();
		this.applySuspension(dt);
		this.solveTyres(dt);
		this.applyAir(dt);
	}

	readBody() {
		const b = this.body;
		const q = b.rotation();
		this.quaternion = { x: q.x, y: q.y, z: q.z, w: q.w };
		this.forward = rotate(q, 0, 0, 1);
		this.up = rotate(q, 0, 1, 0);
		this.side = rotate(q, 1, 0, 0);
		const v = b.linvel();
		this.velocity = { x: v.x, y: v.y, z: v.z };
		this.speed = Math.hypot(v.x, v.y, v.z);
		this.forwardSpeed = dot(v, this.forward);
		this.sideSpeed = dot(v, this.side);
		const w = b.angvel();
		this.angular = { x: w.x, y: w.y, z: w.z };
		this.yawRate = dot(w, this.up);
		const p = b.translation();
		this.position = { x: p.x, y: p.y, z: p.z };
		this.com = b.worldCom();
	}

	// Keyboard steering: a rate limit, a lock that shrinks with speed so full left doesn't just scrub the front tyres, and
	// a little correction towards where the car's going. All but the rate limit are assists.
	updateSteering(dt) {
		const t = this.tune;
		const want = clamp(this.input.steer, -1, 1);
		const rate = want === 0 || Math.sign(want) !== Math.sign(this.steer) ? t.steerRate * 1.7 : t.steerRate;
		this.steer += clamp(want - this.steer, -rate * dt, rate * dt);
		let lock = t.lock;
		const v = Math.abs(this.forwardSpeed);
		let correction = 0;
		if (t.assists && v > 2 && !this.input.handbrake) {
			// The angle that puts the front tyres just past their peak in a steady turn at this speed.
			const surface = SURFACES[this.wheels[0].surface];
			const grip = surface.mu * t.gripScale * 9.81;
			const steady = Math.atan((this.wheelbase * grip) / (v * v));
			lock = Math.min(t.lock, steady + surface.alpha * 0.95);
			// Sliding: point the wheels where the car's going, more the less you're steering yourself.
			if (this.forwardSpeed > 2 && !this.airborne) {
				const beta = Math.atan2(this.sideSpeed, Math.abs(this.forwardSpeed));
				correction = clamp(beta * 0.65 * (1 - Math.abs(this.steer) * 0.6), -t.lock * 0.7, t.lock * 0.7);
			}
		}
		const angle = clamp(this.steer * lock + correction, -t.lock, t.lock);
		for (const w of this.wheels) {
			if (!w.front) continue;
			// Ackermann: the inside wheel turns a little more.
			const inside = angle > 0 === w.left;
			w.steerAngle = angle * (inside ? 1.06 : 0.94);
		}
	}

	updateGearbox(dt) {
		const t = this.tune;
		this.sinceShift += dt;
		if (this.shifting > 0) {
			this.shifting -= dt;
			if (this.shifting <= 0 && this.nextGear !== undefined) {
				this.gear = this.nextGear;
				this.nextGear = undefined;
				this.sinceShift = 0;
			}
		}
		// Forward or reverse: only from nearly stopped, and only with a foot asking for it.
		if (this.reverseRequest && Math.abs(this.forwardSpeed) < 1.2 && this.gear > 0) this.gear = -1;
		if (this.forwardRequest && Math.abs(this.forwardSpeed) < 1.2 && this.gear < 0) this.gear = 1;
		if (this.gear < 0 || this.shifting > 0) return;
		// Up at the redline, from what the road speed says so wheelspin doesn't shift it. Down when there's room below.
		const spin = Math.abs(this.forwardSpeed) / this.driveRadius;
		const rpmHere = spin * this.ratio() * RPM;
		if (this.sinceShift > 0.35) {
			if (rpmHere > t.redline * 0.96 && this.gear < t.gears.length) this.shift(this.gear + 1);
			else if (this.gear > 1) {
				const below = spin * t.gears[this.gear - 2] * t.finalDrive * RPM;
				const low = this.input.throttle > 0.5 ? 0.82 : 0.62;
				if (below < t.redline * low) this.shift(this.gear - 1);
			}
		}
	}

	shift(to) {
		if (this.shifting > 0) return;
		this.nextGear = to;
		this.shifting = this.tune.shiftTime;
		this.emit('shift', to);
	}

	readRoad() {
		const R = this.RAPIER;
		let contacts = 0;
		for (const w of this.wheels) {
			const c = rotate(this.quaternion, w.x, w.rayStart, w.z);
			const origin = { x: this.position.x + c.x, y: this.position.y + c.y, z: this.position.z + c.z };
			const dir = { x: -this.up.x, y: -this.up.y, z: -this.up.z };
			w.origin = origin;
			const reach = w.maxLength + w.radius;
			const hit = this.up.y > 0.05 ? this.world.castRayAndGetNormal(new R.Ray(origin, dir), reach, true, this.rayFlags, undefined, undefined, this.body) : null;
			if (hit && hit.timeOfImpact > 1e-4) {
				const d = hit.timeOfImpact;
				w.inContact = true;
				w.contact = { x: origin.x + dir.x * d, y: origin.y + dir.y * d, z: origin.z + dir.z * d };
				w.normal = hit.normal;
				w.contactY = w.contact.y;
				const name = this.surfaceAt ? this.surfaceAt(w.contact.x, w.contact.z, hit.collider) : 'tarmac';
				w.surface = SURFACES[name] ? name : 'tarmac';
				// Eased from one surface's roughness to the next, so the edge between them isn't a bump of its own.
				w.rough += (SURFACES[w.surface].rough - w.rough) * 0.04;
				const free = d - w.radius - w.rough * unevenAt(w.contact.x, w.contact.z);
				w.length = Math.max(w.minLength, free);
				w.bottomed = free < w.minLength;
				w.bottomDepth = w.bottomed ? w.minLength - free : 0;
				contacts++;
			} else {
				w.inContact = false;
				w.length = w.maxLength;
				w.bottomed = false;
				w.bottomDepth = 0;
			}
			w.compression = w.ride + w.sag - w.length; // Metres from the spring's free length
			w.travelled = (w.maxLength - w.length) / this.tune.travel; // 0 at full droop, 1 fully compressed
		}
		if (this.airborne && contacts >= 3) this.emit('land', Math.abs(this.velocity.y));
		if (contacts === 0) {
			if (!this.airborne) this.emit('takeoff');
			this.airborne = true;
		} else if (contacts >= 3) this.airborne = false;
		this.wheelsOnGround = contacts;
	}

	applySuspension(dt) {
		const t = this.tune;
		for (const w of this.wheels) {
			const speed = (w.compression - w.lastCompression) / dt;
			w.lastCompression = w.compression;
			w.load = 0;
			if (!w.inContact) continue;
			const damp = speed > 0 ? t.bump : t.rebound;
			// A wheel here has no weight and a tyre no give, so a kink in the road would reach the damper all at once. This is that give.
			w.dampSpeed += (speed - w.dampSpeed) * (1 - Math.exp(-dt / t.tyreGive));
			let force = w.k * w.compression + w.c * damp * clamp(w.dampSpeed, -2.5, 2.5);
			force += w.arb * (w.compression - w.opposite.compression);
			// The bump stop: stiff going in, and it gives almost nothing back coming out, or a hard landing is a trampoline.
			if (w.bottomed) force += speed > 0 ? w.k * 5 * w.bottomDepth + w.c * 2.5 * speed : w.k * 0.5 * w.bottomDepth;
			// No corner takes more than this, however hard the landing: past it the body lands on its own bottom.
			force = clamp(force, 0, w.sprung * 9.81 * 7);
			if (dot(w.normal, this.up) < 0.2) continue;
			w.load = force;
			const impulse = force * dt;
			this.body.applyImpulseAtPoint({ x: w.normal.x * impulse, y: w.normal.y * impulse, z: w.normal.z * impulse }, w.contact, true);
		}
	}

	// The engine, differentials and tyres together, in small steps so a wheel can lock or spin up without blowing up. The
	// body's speed is held still through them; the forces they add up to go to the body once, at the contact points.
	solveTyres(dt) {
		const t = this.tune;
		const input = this.input;
		const v = this.body.linvel();
		const w0 = this.body.angvel();
		const com = this.com;

		// Which pedal means what: S brakes while it's rolling forward, and asks for reverse once it's stopped.
		const movingBack = this.forwardSpeed < -0.5;
		this.forwardRequest = input.throttle > 0;
		this.reverseRequest = input.brake > 0 && !(input.throttle > 0);
		let throttle = 0;
		let brake = 0;
		if (this.gear > 0) {
			throttle = input.throttle;
			brake = input.brake;
		} else {
			throttle = input.brake;
			brake = input.throttle;
		}
		if (movingBack && this.gear > 0 && input.throttle > 0) brake = Math.max(brake, input.throttle);
		if (this.shifting > 0) throttle = 0;
		// With nothing pressed at a crawl, it holds still rather than rolling away.
		if (!input.throttle && !input.brake && Math.abs(this.forwardSpeed) < 0.6) brake = Math.max(brake, 0.25);
		// Nothing pressed, it dies away rather than rolling on and on: at low revs, where the engine's stopped holding it back, and
		// rolling backwards in a forward gear after a spin.
		if (!input.throttle && !input.brake && (Math.abs(this.forwardSpeed) < t.coastSpeed || this.forwardSpeed * this.gear < -0.5)) brake = Math.max(brake, t.coastBrake);
		if (input.handbrake > 0) brake = Math.max(brake, t.handbrakeDrag);

		// The ground velocity at each tyre, and its slip angle, once per step.
		for (const w of this.wheels) {
			w.fx = 0;
			w.fy = 0;
			w.vx = 0;
			w.vz = 0;
			if (!w.inContact || w.load <= 0) continue;
			const rx = w.contact.x - com.x;
			const ry = w.contact.y - com.y;
			const rz = w.contact.z - com.z;
			const px = v.x + (w0.y * rz - w0.z * ry);
			const py = v.y + (w0.z * rx - w0.x * rz);
			const pz = v.z + (w0.x * ry - w0.y * rx);
			// The tyre's own axes, flat on the ground under it.
			const s = Math.sin(w.steerAngle);
			const c = Math.cos(w.steerAngle);
			let fx = this.forward.x * c + this.side.x * s;
			let fy = this.forward.y * c + this.side.y * s;
			let fz = this.forward.z * c + this.side.z * s;
			const n = w.normal;
			const d = fx * n.x + fy * n.y + fz * n.z;
			fx -= n.x * d;
			fy -= n.y * d;
			fz -= n.z * d;
			const len = Math.hypot(fx, fy, fz) || 1;
			fx /= len;
			fy /= len;
			fz /= len;
			// Left of the tyre: up × forward.
			const lx = n.y * fz - n.z * fy;
			const ly = n.z * fx - n.x * fz;
			const lz = n.x * fy - n.y * fx;
			w.axisF = { x: fx, y: fy, z: fz };
			w.axisL = { x: lx, y: ly, z: lz };
			w.vz = px * fx + py * fy + pz * fz;
			w.vx = px * lx + py * ly + pz * lz;
			// The slip angle takes a little rolling to build: tyre relaxation. It also keeps this steady at a crawl.
			const rolling = Math.abs(w.vz) + Math.abs(w.vx) * 0.25;
			const wanted = Math.atan2(w.vx, Math.max(Math.abs(w.vz), 1.2));
			const blend = 1 - Math.exp((-(rolling + 2) * dt) / t.relaxation);
			w.slipAngle += (wanted - w.slipAngle) * blend;
		}

		// Engine: what it can give at its current revs. Pulling away, the clutch slips at launch revs.
		const ratio = this.ratio();
		const inGear = this.shifting <= 0;
		const driven = this.wheels.filter((w) => (w.front ? t.frontDrive > 0 : t.frontDrive < 1));
		const wheelSpin = driven.reduce((sum, w) => sum + w.spin, 0) / driven.length;
		const rpmFromWheels = Math.abs(wheelSpin * ratio) * RPM;
		const launchRpm = t.idle + (t.launch - t.idle) * throttle;
		let rpm = Math.max(rpmFromWheels, launchRpm);
		if (!inGear) rpm = Math.max(t.idle, this.rpm + (rpmFromWheels - this.rpm) * Math.min(1, dt * 14));
		const overRev = rpm > t.redline * 1.02;
		this.rpm += (Math.min(rpm, t.redline * 1.03) - this.rpm) * Math.min(1, dt * 18);
		this.rpm = Math.max(t.idle, this.rpm);

		// Traction control: eases the throttle as the driven tyres pass their peak.
		if (t.assists) {
			let worst = 0;
			// Combined slip: it also eases off when the car's sliding sideways, which is most of keeping it from spinning.
			// The front tyres' slip angle is the driver's business: only their wheelspin counts.
			for (const w of driven) if (w.inContact) worst = Math.max(worst, w.front ? Math.abs(w.slipRatio) / SURFACES[w.surface].kappa : w.slip);
			const over = clamp((worst - 1.25) / 1.4, 0, 1);
			this.tractionCut += (over - this.tractionCut) * Math.min(1, dt * (over > this.tractionCut ? 30 : 7));
		} else this.tractionCut = 0;
		const applied = throttle * (1 - this.tractionCut * 0.92);
		this.throttleOut = applied;
		const engineTorque = overRev ? 0 : this.torqueAt(this.rpm) * applied;
		// Shut throttle: the engine holds it back, through the gears, when the wheels are turning the way the gear goes.
		const signRatio = Math.sign(ratio);
		const withGear = wheelSpin * signRatio > 0;
		const engineDrag = inGear && withGear && rpmFromWheels > t.idle * 1.1 ? t.engineBrake * this.rpm * (1 - applied) : 0;
		let driveTotal = inGear ? (engineTorque - engineDrag) * Math.abs(ratio) * t.efficiency * signRatio : 0;
		// With the handbrake on, the rear is unclutched from the engine, as on a rally car.
		const handbrake = input.handbrake > 0;
		if (handbrake && t.frontDrive === 0) driveTotal = 0;
		const frontShare = handbrake ? (t.frontDrive > 0 ? 1 : 0) : t.frontDrive;
		const engineInertia = inGear ? (t.engineInertia * ratio * ratio) / Math.max(1, this.driveWheelCount) : 0;

		// Small steps of wheel speed and tyre force. Force is averaged over them for the body.
		const N = 14;
		const h = dt / N;
		for (const w of this.wheels) {
			w.avgX = 0;
			w.avgY = 0;
		}
		for (let i = 0; i < N; i++) {
			for (const axle of [this.driven.front, this.driven.rear]) {
				const isFront = axle === this.driven.front;
				const share = isFront ? frontShare : 1 - frontShare;
				const axleTorque = driveTotal * share;
				// A limited-slip differential: a torque that drags the faster wheel back and the slower up.
				const [a, b] = axle;
				const lock = share > 0 ? clamp((a.spin - b.spin) * t.limitedSlip, -t.diffLimit, t.diffLimit) : 0;
				for (const w of axle) {
					const diff = w === a ? -lock : lock;
					this.stepWheel(w, axleTorque / 2 + diff * 0.5, brake, handbrake && !w.front, share > 0 ? engineInertia : 0, h);
				}
			}
		}

		// All that, on the body, at each tyre's contact.
		for (const w of this.wheels) {
			if (!w.inContact || w.load <= 0) {
				w.fx = 0;
				w.fy = 0;
				continue;
			}
			w.fx = w.avgX / N;
			w.fy = w.avgY / N;
			// A tyre can only take out the sideways speed it's got, not put it back the other way.
			const stop = (w.sprung * Math.abs(w.vx)) / dt;
			if (Math.abs(w.fx) > stop) w.fx = Math.sign(w.fx) * stop;
			const rolling = SURFACES[w.surface].rolling * w.load * Math.tanh(w.vz);
			const ff = w.fy - rolling;
			const ix = (w.axisL.x * w.fx + w.axisF.x * ff) * dt;
			const iy = (w.axisL.y * w.fx + w.axisF.y * ff) * dt;
			const iz = (w.axisL.z * w.fx + w.axisF.z * ff) * dt;
			this.body.applyImpulseAtPoint({ x: ix, y: iy, z: iz }, w.contact, true);
		}
	}

	stepWheel(w, drive, brakePedal, handbrake, engineInertia, h) {
		const t = this.tune;
		const inertia = w.inertia + engineInertia;
		let force = 0;
		let lateral = 0;
		if (w.inContact && w.load > 0) {
			const surface = SURFACES[w.surface];
			const groundSpeed = w.vz;
			const wheelSpeed = w.spin * w.radius;
			const denom = Math.max(Math.abs(groundSpeed), Math.abs(wheelSpeed) * 0.5, 4.5);
			const kappa = clamp((wheelSpeed - groundSpeed) / denom, -1.2, 1.2);
			w.slipRatio = kappa;
			// Combined slip: how far along the curve the tyre is, whichever way it's slipping.
			const sx = kappa / surface.kappa;
			const sy = Math.tan(w.slipAngle) / Math.tan(surface.alpha);
			const rho = Math.hypot(sx, sy);
			w.slip = rho;
			const nominal = w.sprung * 9.81;
			const mu = surface.mu * t.gripScale * (1 - t.loadSensitivity * (w.load / nominal - 1));
			const peak = Math.max(0.2 * surface.mu, mu) * w.load;
			const total = peak * slipCurve(rho, surface.falloff);
			if (rho > 1e-5) {
				force = (total * sx) / rho;
				// Past its peak, sideways, it ploughs.
				lateral = (-total * sy * (1 + surface.scrub * clamp((Math.abs(sy) - 1) / 2, 0, 1))) / rho;
			}
		} else {
			w.slip = 0;
			w.slipRatio = 0;
		}

		// Brakes, with ABS easing the pedal as a tyre passes its peak.
		let brakeTorque = brakePedal * w.brakeMax;
		if (t.assists && brakePedal > 0 && w.inContact && !handbrake) {
			const over = (Math.abs(w.slipRatio) - SURFACES[w.surface].kappa) / SURFACES[w.surface].kappa;
			if (w.slipRatio < 0 && over > 0) brakeTorque *= Math.max(0.15, 1 - over * 1.6);
		}
		if (handbrake) brakeTorque += t.handbrakeTorque / 2;
		w.braking = brakeTorque;

		const net = drive - force * w.radius;
		let spin = w.spin + (net / inertia) * h;
		const stop = (brakeTorque / inertia) * h;
		// Brakes can stop a wheel, not turn it back.
		if (Math.abs(spin) <= stop) spin = 0;
		else spin -= Math.sign(spin) * stop;
		w.spin = spin;
		if (!w.inContact) w.spin *= 1 - 0.3 * h;
		w.avgY += force;
		w.avgX += lateral;
	}

	applyAir(dt) {
		const v = this.velocity;
		const drag = 0.5 * 1.225 * this.tune.dragArea * this.speed;
		this.body.applyImpulse({ x: -v.x * drag * dt, y: -v.y * drag * dt, z: -v.z * drag * dt }, true);
	}

	/** After world.step(). */
	afterStep(dt) {
		this.readBody();
		for (const w of this.wheels) w.angle += w.spin * dt;
		// Folio's test for lying on its roof or side. Then it hops and turns itself over, however long you set.
		const u = this.upsideDown;
		const down = this.up.y < 0.4 && this.speed < 6;
		if (down !== u.active) {
			u.active = down;
			u.wait = 0;
			this.emit(down ? 'upsideDown' : 'rightSideUp');
		}
		if (this.righting > 0) this.guideRighting(dt);
		else if (u.active) {
			u.wait += dt;
			if (u.wait >= this.flipWait) {
				u.wait = 0;
				this.flip();
			}
		}
		// Stuck: a foot down for a good while and hardly moving.
		if (Math.abs(this.input.throttle) + Math.abs(this.input.brake) > 0.5 && this.speed < 0.6) {
			this.stuckFor += dt;
			if (this.stuckFor > 3) {
				this.stuckFor = 0;
				this.emit('stuck');
			}
		} else this.stuckFor = 0;
	}

	/**
	 * Hops and turns the car over, whichever way it's lying. The turn is guided all the way up and down, so it arrives
	 * level with no spin left to tip it straight back over. It's the one thing here that isn't physics: real cars don't.
	 */
	flip() {
		const v = this.body.linvel();
		this.body.setLinvel({ x: v.x * 0.5, y: 6.5, z: v.z * 0.5 }, true);
		this.righting = 1.5;
		this.flips++;
		this.emit('flip');
	}

	guideRighting(dt) {
		this.righting -= dt;
		const u = this.up;
		const angle = Math.acos(clamp(u.y, -1, 1));
		let ax = -u.z;
		let az = u.x;
		const len = Math.hypot(ax, az);
		if (len < 1e-3) {
			ax = this.forward.x;
			az = this.forward.z;
		} else {
			ax /= len;
			az /= len;
		}
		const rate = Math.min(4.5, angle * 5);
		this.body.setAngvel({ x: ax * rate, y: 0, z: az * rate }, true);
		if (this.righting <= 0 || (angle < 0.03 && this.wheelsOnGround > 0)) this.righting = 0;
	}

	/** Puts the car somewhere, still, on its wheels. */
	moveTo(position = this.spawn.position, yaw = this.spawn.yaw) {
		const q = { x: 0, y: Math.sin(yaw / 2), z: 0, w: Math.cos(yaw / 2) };
		this.body.setTranslation(position, true);
		this.body.setRotation(q, true);
		this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
		this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
		this.readBody();
		this.airborne = false;
		this.stuckFor = 0;
		this.righting = 0;
		this.upsideDown.active = false;
		this.upsideDown.wait = 0;
		this.gear = 1;
		this.shifting = 0;
		this.nextGear = undefined;
		this.rpm = this.tune.idle;
		this.steer = 0;
		this.tractionCut = 0;
		for (const w of this.wheels) {
			w.spin = 0;
			w.angle = 0;
			w.slipAngle = 0;
			w.slipRatio = 0;
			w.slip = 0;
			w.lastCompression = w.compression;
		}
	}

	dispose() {
		this.world.removeRigidBody(this.body);
	}
}
