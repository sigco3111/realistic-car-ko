// A raycast car on Rapier that drives like the car in Bruno Simon's folio-2025, at any size. No three.js in this file.
//
// The driving is ported from folio-2025's sources/Game/Physics/PhysicsVehicle.js and sources/Game/Player.js
// (MIT, Copyright (c) 2025 Bruno Simon, https://github.com/brunosimon/folio-2025, commit 41046b5; LICENSE has the text):
// the engine that gives way past top speed, the idle and reverse brakes, the suspension, the jump, what counts as upside
// down or stuck, and the flip that rights the car. Everything to do with size and time is Patch's: see `tuneFor`.
//
// How folio's car gets its feel, measured in tools/bench.mjs:
// - Its world runs at double speed (Ticker.scale = 2): each frame steps the world 1/30 s, but the vehicle controller
//   1/60 s. To the eye, gravity is about 4 g and everything happens twice as fast, on a car 3 m long.
// - Grip, engine and suspension are all per kilogram, so its low mass (2.5) only matters when it hits something.
// - Steering is instant, and full lock is 0.5 rad at every speed. Past the tyres' limit it slides instead of turning.
// - Its centre of mass is low and its inertia is small, so it turns on the spot and hardly ever rolls.

/** Folio's car, as it is. */
export const FOLIO = {
	length: 3, // its colliders' longest: 1.5 m either side of the centre
	gravity: 9.81 * 4, // to the eye: world time is doubled, so 4 times 9.81
	engine: 32, // what its force works out to on all four wheels, to the eye, m/s²
	boostMultiplier: 2, // boosting adds this many times the engine again
	topSpeed: 10, // past this the engine gives way, m/s, to the eye
	topSpeedBoost: 80,
	brake: 56, // m/s², to the eye
	idleBrake: 0.06,
	reverseBrake: 0.4,
	steering: 0.5, // rad
	frictionSlip: 0.9,
	sideFriction: 3,
	stiffness: 40, // 1/s², per wheel, per kg, to the eye
	stiffnessJump: 80,
	compression: 10, // 1/s
	relaxation: 2.7,
	maxSuspension: 120, // m/s² for each wheel
	jumpExtra: 0.75, // rest length gained while jumping
	inertia: 0.4, // m², per kg, on every axis
	comHeight: 0.435, // the collider's -0.1 and its -0.5 below that, from a centre that settles 1.035 up
	damping: 0.2, // 1/s, linear and angular, to the eye
	flipSpeed: 10, // m/s
	flipSpin: 4, // rad/s
	stuckSeconds: 1.5,
	stuckDistance: 0.5,
};

/**
 * Folio's car made a different size and given a different gravity, with every number worked out from the two. A car `s`
 * times longer needs accelerations `s` times bigger to look the same in a frame that shows it the same size, so at the
 * same gravity it would look exactly like folio's filmed from further away. Gravity is the one thing to choose: real
 * gravity makes a real car, slow and floaty beside folio's; the higher it is, the closer the car comes to folio's
 * quickness, at the cost of landing harder than the world around it.
 *
 * `length` is the car's length in metres; `gravity` what pulls on the chassis, m/s².
 */
export function tuneFor({ length = 5, gravity = 26 } = {}) {
	const s = length / FOLIO.length;
	// How much slower this car's clock runs than folio's. Accelerations go as s / tau², speeds as s / tau, rates as 1 / tau.
	const tau = Math.sqrt((FOLIO.gravity * s) / gravity);
	const accel = s / (tau * tau);
	const speed = s / tau;
	return {
		length,
		gravity,
		s,
		tau,
		engine: FOLIO.engine * accel,
		boostMultiplier: FOLIO.boostMultiplier,
		topSpeed: FOLIO.topSpeed * speed,
		topSpeedBoost: FOLIO.topSpeedBoost * speed,
		speedUnit: 2 * speed, // one of folio's own m/s, in this car's: the engine's give-way counts in these
		brake: FOLIO.brake * accel,
		idleBrake: FOLIO.idleBrake,
		reverseBrake: FOLIO.reverseBrake,
		steering: FOLIO.steering,
		frictionSlip: FOLIO.frictionSlip,
		sideFriction: FOLIO.sideFriction,
		stiffness: FOLIO.stiffness / (tau * tau),
		stiffnessJump: FOLIO.stiffnessJump / (tau * tau),
		compression: FOLIO.compression / tau,
		relaxation: FOLIO.relaxation / tau,
		maxSuspension: FOLIO.maxSuspension * accel,
		jumpExtra: FOLIO.jumpExtra * s,
		inertia: FOLIO.inertia * s * s,
		comHeight: (FOLIO.comHeight / FOLIO.length) * length,
		damping: FOLIO.damping / tau,
		flipSpeed: FOLIO.flipSpeed * speed,
		flipSpin: FOLIO.flipSpin / tau,
		stuckSeconds: FOLIO.stuckSeconds,
		stuckDistance: FOLIO.stuckDistance * s,
	};
}

const rotate = (q, x, y, z) => {
	const tx = 2 * (q.y * z - q.z * y);
	const ty = 2 * (q.z * x - q.x * z);
	const tz = 2 * (q.x * y - q.y * x);
	return { x: x + q.w * tx + q.y * tz - q.z * ty, y: y + q.w * ty + q.z * tx - q.x * tz, z: z + q.w * tz + q.x * ty - q.y * tx };
};

/**
 * The car: a chassis, four rays and what to do when it lands on its roof.
 *
 *   const car = new Car(RAPIER, world, {
 *     wheels: [{ x, y, z, radius, front }, ...], // where each wheel's centre sits on the model, ground at y = 0, front +Z
 *     size: { width, height, length },
 *     mass: 1400,
 *     position: { x, y, z },
 *   });
 *   // Each physics step, before world.step():
 *   car.input = { throttle, steer, boost, brake, jump };
 *   car.update(dt);
 *   world.step();
 *   car.afterStep(dt);
 *
 * Wheels on the left are at +x. Positive steer turns left. `throttle` and `steer` run from -1 to 1, the rest are 0 or 1.
 */
export class Car {
	constructor(RAPIER, world, options) {
		this.RAPIER = RAPIER;
		this.world = world;
		const { wheels, size, mass = 1400, position = { x: 0, y: 1, z: 0 }, yaw = 0, groups = {}, tune = {} } = options;
		this.size = size;
		this.mass = mass;
		this.tune = { ...tuneFor({ length: size.length, gravity: options.gravity ?? 26 }), ...tune };
		this.tuneBase = { ...this.tune };
		this.input = { throttle: 0, steer: 0, boost: 0, brake: 0, jump: 0 };
		this.listeners = new Map();
		this.spawn = { position: { ...position }, yaw };

		// Filled in by afterStep.
		this.position = { ...position };
		this.quaternion = { x: 0, y: Math.sin(yaw / 2), z: 0, w: Math.cos(yaw / 2) };
		this.forward = { x: 0, y: 0, z: 1 };
		this.up = { x: 0, y: 1, z: 0 };
		this.side = { x: 1, y: 0, z: 0 };
		this.velocity = { x: 0, y: 0, z: 0 };
		this.speed = 0;
		this.forwardSpeed = 0;
		this.goingForward = false;
		this.wheelsOnGround = 0;
		this.upsideDown = { active: false, ratio: 0, wait: 0 };
		this.stuck = { active: false, items: [], distance: 0, duration: 0 };
		this.flips = 0;
		this.airborne = false;

		this.makeChassis(mass, position, yaw, groups);
		this.controller = world.createVehicleController(this.body);
		this.controller.indexUpAxis = 1;
		this.controller.setIndexForwardAxis = 2;
		// Each ray starts inside the body. Folio's start at its chassis' centre too: higher, and a car on its roof has them
		// starting under the floor, where they hold it up and cancel the hop that would right it.
		const rayStart = size.height * 0.5;
		this.wheels = wheels.map((w, i) => {
			const ride = rayStart - w.y;
			this.controller.addWheel({ x: w.x, y: rayStart, z: w.z }, { x: 0, y: -1, z: 0 }, { x: -1, y: 0, z: 0 }, ride, w.radius);
			return { ...w, index: i, ride, front: w.front ?? w.z > 0, inContact: false, suspension: ride, spin: 0, steer: 0 };
		});
		this.applyTune();
		// Rays only see what doesn't move: a car doesn't climb a crate or a body, it hits them.
		this.rayFlags = RAPIER.QueryFilterFlags.EXCLUDE_DYNAMIC | RAPIER.QueryFilterFlags.EXCLUDE_SENSORS;
	}

	/**
	 * How much longer the spring is with no load on it than when the car has settled with the model's wheels on the ground.
	 * The second term is the damper holding some of the weight each step, because gravity has already moved the body down
	 * by the time the controller looks: measured in tools/bench.mjs. It changes with the step, so slow motion needs it too.
	 */
	sag(dt = 1 / 60) {
		const t = this.tune;
		return (t.gravity / (4 * t.stiffness)) * (1 - 1.5 * t.compression * dt);
	}

	makeChassis(mass, position, yaw, groups) {
		const R = this.RAPIER;
		const t = this.tune;
		const { width, height, length } = this.size;
		const desc = R.RigidBodyDesc.dynamic()
			.setTranslation(position.x, position.y, position.z)
			.setRotation({ x: 0, y: Math.sin(yaw / 2), z: 0, w: Math.cos(yaw / 2) })
			.setCanSleep(false)
			.setCcdEnabled(true)
			.setLinearDamping(t.damping)
			.setAngularDamping(t.damping);
		this.body = this.world.createRigidBody(desc);
		this.body.setGravityScale(t.gravity / Math.abs(this.world.gravity.y), true);
		const inertia = t.inertia * mass;
		const box = (hw, hh, hl, y, z, withMass, filter) => {
			let c = R.ColliderDesc.cuboid(hw, hh, hl).setTranslation(0, y, z).setFriction(0.4).setRestitution(0.15);
			c = withMass
				? c.setMassProperties(mass, { x: 0, y: t.comHeight - y, z: 0 }, { x: inertia, y: inertia, z: inertia }, { x: 0, y: 0, z: 0, w: 1 })
				: c.setMass(0);
			if (filter !== undefined) c = c.setCollisionGroups(filter);
			c = c.setActiveEvents(R.ActiveEvents.CONTACT_FORCE_EVENTS).setContactForceEventThreshold(mass * 8);
			return this.world.createCollider(c, this.body);
		};
		// The lower body, then the roof. Both keep off the ground, so a hard landing is the suspension's and not a scrape.
		const under = 0.42 * height;
		const shoulder = 0.72 * height;
		this.colliders = [
			box(0.46 * width, (shoulder - under) / 2, 0.47 * length, (shoulder + under) / 2, 0, true, groups.body),
			box(0.4 * width, ((height - shoulder) * 0.9) / 2, 0.22 * length, shoulder + ((height - shoulder) * 0.9) / 2, -0.04 * length, false, groups.body),
		];
		// The bumper, wider and lower than the body, touches only loose objects, so they get hit before the body arrives
		// and fly instead of being pushed along. Needs groups: see the demo.
		if (groups.bumper !== undefined) box(0.5 * width, 0.36 * height, 0.51 * length, 0.42 * height, 0, false, groups.bumper);
	}

	/** Sends this.tune to the wheels: after you change it, and on building. */
	applyTune() {
		const t = this.tune;
		const c = this.controller;
		this.body.setLinearDamping(t.damping);
		this.body.setAngularDamping(t.damping);
		this.body.setGravityScale(t.gravity / Math.abs(this.world.gravity.y), true);
		for (const w of this.wheels) {
			const i = w.index;
			c.setWheelFrictionSlip(i, t.frictionSlip);
			c.setWheelSideFrictionStiffness(i, t.sideFriction);
			c.setWheelMaxSuspensionForce(i, t.maxSuspension * this.mass);
			c.setWheelMaxSuspensionTravel(i, 100); // Folio's 2 never comes into it; the rays are what's long.
			c.setWheelSuspensionCompression(i, t.compression);
			c.setWheelSuspensionRelaxation(i, t.relaxation);
		}
	}

	on(name, fn) {
		if (!this.listeners.has(name)) this.listeners.set(name, []);
		this.listeners.get(name).push(fn);
		return this;
	}

	emit(name, ...args) {
		for (const fn of this.listeners.get(name) ?? []) fn(...args);
	}

	/** Before world.step(). */
	update(dt) {
		const t = this.tune;
		const { throttle, steer, boost, brake: braking, jump } = this.input;
		const mass = this.mass;

		// The engine: force on every wheel, boost for more of it and a higher top speed, and past top speed it gives way.
		const top = boost ? t.topSpeedBoost : t.topSpeed;
		const overflow = Math.max(0, this.speed - top) / t.speedUnit;
		const throttled = braking ? 0 : throttle;
		let force = ((throttled * (1 + boost * t.boostMultiplier) * t.engine) / (1 + overflow)) * (mass / 4);

		// No throttle: a little brake. Throttle against the way it's going: brake, no engine, until it stops.
		let brake = braking ? 1 : Math.abs(throttled) < 0.1 ? t.idleBrake : 0;
		if (this.speed > 0.5 * t.speedUnit && ((throttled > 0 && !this.goingForward) || (throttled < 0 && this.goingForward))) {
			brake = t.reverseBrake;
			force = 0;
		}
		const impulse = brake * t.brake * mass * dt;

		const rest = this.sag(dt) + (jump > 0 ? t.jumpExtra : 0);
		const stiffness = jump > 0 ? t.stiffnessJump : t.stiffness;
		for (const w of this.wheels) {
			const i = w.index;
			w.steer = w.front ? steer * t.steering : 0;
			this.controller.setWheelSteering(i, w.steer);
			this.controller.setWheelBrake(i, impulse);
			this.controller.setWheelEngineForce(i, force);
			this.controller.setWheelSuspensionRestLength(i, w.ride + rest);
			this.controller.setWheelSuspensionStiffness(i, stiffness);
		}
		this.controller.updateVehicle(dt, this.rayFlags);
	}

	/** After world.step(): reads where it all ended up, and rights the car when it needs it. */
	afterStep(dt) {
		const b = this.body;
		const p = b.translation();
		const q = b.rotation();
		const moved = Math.hypot(p.x - this.position.x, p.y - this.position.y, p.z - this.position.z);
		this.position = { x: p.x, y: p.y, z: p.z };
		this.quaternion = { x: q.x, y: q.y, z: q.z, w: q.w };
		this.forward = rotate(q, 0, 0, 1);
		this.up = rotate(q, 0, 1, 0);
		this.side = rotate(q, 1, 0, 0);
		const v = b.linvel();
		this.velocity = { x: v.x, y: v.y, z: v.z };
		this.speed = Math.hypot(v.x, v.y, v.z);
		const along = v.x * this.forward.x + v.y * this.forward.y + v.z * this.forward.z;
		this.forwardSpeed = along;
		this.goingForward = this.speed > 1e-3 && along / this.speed > 0.5;

		let contacts = 0;
		for (const w of this.wheels) {
			const i = w.index;
			w.wasInContact = w.inContact;
			w.inContact = this.controller.wheelIsInContact(i);
			w.suspension = this.controller.wheelSuspensionLength(i) ?? w.suspension;
			if (w.inContact) contacts++;
			w.spin += ((this.input.brake && !this.input.throttle ? 0 : along) / w.radius) * dt;
		}
		const landed = this.airborne && contacts >= 3;
		if (landed) this.emit('land', Math.abs(v.y));
		if (contacts === 0) {
			if (!this.airborne) this.emit('takeoff');
			this.airborne = true;
		} else if (contacts >= 3) this.airborne = false;
		this.wheelsOnGround = contacts;

		this.testUpsideDown(dt);
		this.testStuck(moved, dt);
	}

	// Folio's test: upside down from when the roof is 66° off upright. Three seconds of that and it hops and turns over,
	// and goes on trying until it's on its wheels.
	testUpsideDown(dt) {
		const u = this.upsideDown;
		u.ratio = -this.up.y * 0.5 + 0.5;
		const was = u.active;
		u.active = u.ratio > 0.3;
		if (u.active !== was) {
			this.emit(u.active ? 'upsideDown' : 'rightSideUp', u.ratio);
			u.wait = 0;
		}
		if (!u.active) return;
		u.wait += dt;
		if (u.wait >= (this.flipWait ?? 3)) {
			u.wait = 0;
			this.flip();
		}
	}

	/**
	 * Hops and turns the car over, whichever way it's lying. Folio's hop, but where its spin is a fixed amount and it tries
	 * again if that falls short, this one works out the turn that lands the car on its wheels: a longer car on a heavier
	 * gravity gets less time in the air to do it.
	 */
	flip() {
		const t = this.tune;
		const mass = this.mass;
		this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
		const v = this.body.linvel();
		this.body.setLinvel({ x: v.x * 0.5, y: 0, z: v.z * 0.5 }, true);
		this.body.applyImpulse({ x: 0, y: t.flipSpeed * mass, z: 0 }, true);
		const air = (2 * t.flipSpeed) / t.gravity;
		const u = this.up;
		// The axis that takes the car's up to the world's: up × (0, 1, 0).
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
		const angle = Math.acos(Math.min(1, Math.max(-1, u.y)));
		const spin = (angle / air) * t.inertia * mass;
		this.body.applyTorqueImpulse({ x: ax * spin, y: 0, z: az * spin }, true);
		this.flips++;
		this.emit('flip');
	}

	// Folio's test: three seconds (of its clock) on the throttle and hardly moved.
	testStuck(moved, dt) {
		const s = this.stuck;
		const t = this.tune;
		if (Math.abs(this.input.throttle) > 0.5) {
			s.items.unshift([moved, dt]);
			s.distance = 0;
			s.duration = 0;
			for (let i = 0; i < s.items.length; i++) {
				if (s.duration >= t.stuckSeconds) {
					s.items.length = i;
					break;
				}
				s.distance += s.items[i][0];
				s.duration += s.items[i][1];
			}
		}
		const now = s.duration >= t.stuckSeconds && s.distance < t.stuckDistance;
		if (now !== s.active) {
			s.active = now;
			this.emit(now ? 'stuck' : 'unstuck');
		}
	}

	/** Puts the car somewhere, still, on its wheels. */
	moveTo(position = this.spawn.position, yaw = this.spawn.yaw) {
		const q = { x: 0, y: Math.sin(yaw / 2), z: 0, w: Math.cos(yaw / 2) };
		this.body.setTranslation(position, true);
		this.body.setRotation(q, true);
		this.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
		this.body.setAngvel({ x: 0, y: 0, z: 0 }, true);
		this.position = { ...position };
		this.quaternion = q;
		this.speed = 0;
		this.forwardSpeed = 0;
		this.goingForward = false;
		this.airborne = false;
		this.stuck.items.length = 0;
		this.stuck.distance = 0;
		this.stuck.duration = 0;
		this.stuck.active = false;
		this.upsideDown.active = false;
		this.upsideDown.wait = 0;
		for (const w of this.wheels) w.spin = 0;
	}

	/** Takes it all out of the world. */
	dispose() {
		this.world.removeVehicleController(this.controller);
		this.world.removeRigidBody(this.body);
	}
}
