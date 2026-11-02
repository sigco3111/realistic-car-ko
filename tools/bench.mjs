// Folio's own car, exactly as its code runs it, beside ours on the same scripted keys: node tools/bench.mjs
// Prints each measure both ways: in the world's units, and in car lengths and seconds, which is what the eye compares.
// Folio's numbers are "to the eye": its world runs at double speed, so its speeds count double and its accelerations
// four times. No browser and no rendering: this only needs Rapier.
import { createRequire } from 'node:module';
import { Car, FOLIO } from '../src/car.js';

const require = createRequire(import.meta.url);
const mod = await import(new URL('../node_modules/@dimforge/rapier3d-compat/rapier.es.js', import.meta.url).href);
const R = mod.default ?? mod;
await R.init();
void require;

const clamp = (x, a, b) => Math.min(b, Math.max(a, x));

// Folio's PhysicsVehicle with its Player's four inputs, on a flat floor, 60 frames a second. Copied line for line where
// it matters. Forward is +X as in folio; its numbers below come straight from its source.
function folioCar(world) {
	const body = world.createRigidBody(
		R.RigidBodyDesc.dynamic().setTranslation(0, 4, 0).setCanSleep(false).setLinearDamping(0.1).setAngularDamping(0.1),
	);
	world.createCollider(
		R.ColliderDesc.cuboid(1.3, 0.4, 0.85).setTranslation(0, -0.1, 0).setDensity(0.1).setMassProperties(2.5, { x: 0, y: -0.5, z: 0 }, { x: 1, y: 1, z: 1 }, { x: 0, y: 0, z: 0, w: 1 }).setFriction(0.4).setRestitution(0.15),
		body,
	);
	world.createCollider(R.ColliderDesc.cuboid(0.5, 0.15, 0.65).setTranslation(0, 0.4, 0).setDensity(0.1).setMass(0).setFriction(0.4).setRestitution(0.15), body);
	const c = world.createVehicleController(body);
	const pos = [[0.9, 0, 0.75], [0.9, 0, -0.75], [-0.9, 0, 0.75], [-0.9, 0, -0.75]];
	for (let i = 0; i < 4; i++) {
		c.addWheel({ x: pos[i][0], y: pos[i][1], z: pos[i][2] }, { x: 0, y: -1, z: 0 }, { x: 0, y: 0, z: 1 }, 1, 1);
		c.setWheelDirectionCs(i, { x: 0, y: -1, z: 0 });
		c.setWheelAxleCs(i, { x: 0, y: 0, z: 1 });
		c.setWheelRadius(i, 0.4);
		c.setWheelChassisConnectionPointCs(i, { x: pos[i][0], y: pos[i][1], z: pos[i][2] });
		c.setWheelFrictionSlip(i, 0.9);
		c.setWheelMaxSuspensionForce(i, 150);
		c.setWheelMaxSuspensionTravel(i, 2);
		c.setWheelSideFrictionStiffness(i, 3);
		c.setWheelSuspensionCompression(i, 10);
		c.setWheelSuspensionRelaxation(i, 2.7);
	}
	const self = {
		L: FOLIO.length,
		time: 2, // world seconds per real second
		body,
		speed: 0,
		goingForward: false,
		pos: { x: 0, y: 4, z: 0 },
		dtWorld: 1 / 30,
		input: { throttle: 0, steer: 0, boost: 0, brake: 0, jump: 0 },
		yawAxis: 'x',
		forwardOf() {
			const q = body.rotation();
			return rotate(q, 1, 0, 0);
		},
		upOf() {
			const q = body.rotation();
			return rotate(q, 0, 1, 0);
		},
		pre() {
			const { throttle, steer, boost, brake: braking, jump } = this.input;
			const d = 1 / 30;
			const top = boost ? 40 : 5;
			const overflow = Math.max(0, this.speed - top);
			const acc = braking ? 0 : throttle;
			let force = ((acc * (1 + boost * 2)) * 300) / (1 + overflow) * d;
			let brake = braking ? 1 : 0;
			if (!braking && Math.abs(acc) < 0.1) brake = 0.06;
			if (this.speed > 0.5 && ((acc > 0 && !this.goingForward) || (acc < 0 && this.goingForward))) {
				brake = 0.4;
				force = 0;
			}
			brake *= 35 * d;
			c.setWheelSteering(0, steer * 0.5);
			c.setWheelSteering(1, steer * 0.5);
			for (let i = 0; i < 4; i++) {
				c.setWheelBrake(i, brake);
				c.setWheelEngineForce(i, force);
				c.setWheelSuspensionRestLength(i, jump ? 1.63 : 0.88);
				c.setWheelSuspensionStiffness(i, jump ? 40 : 20);
			}
			c.updateVehicle(1 / 60);
			world.timestep = d;
		},
		post() {
			const p = body.translation();
			const dx = p.x - this.pos.x;
			const dy = p.y - this.pos.y;
			const dz = p.z - this.pos.z;
			const len = Math.hypot(dx, dy, dz);
			this.speed = len / (1 / 30);
			const f = this.forwardOf();
			const ratio = len > 1e-9 ? (dx * f.x + dy * f.y + dz * f.z) / len : 0;
			this.goingForward = ratio > 0.5;
			this.pos = { x: p.x, y: p.y, z: p.z };
		},
		place(q, v) {
			body.setRotation(q, true);
			body.setAngvel({ x: 0, y: 0, z: 0 }, true);
			if (v) body.setLinvel(v, true);
		},
		wheelsDown() {
			let n = 0;
			for (let i = 0; i < 4; i++) if (c.wheelIsInContact(i)) n++;
			return n;
		},
	};
	return self;
}

function rotate(q, x, y, z) {
	const tx = 2 * (q.y * z - q.z * y);
	const ty = 2 * (q.z * x - q.x * z);
	const tz = 2 * (q.x * y - q.y * x);
	return { x: x + q.w * tx + q.y * tz - q.z * ty, y: y + q.w * ty + q.z * tx - q.x * tz, z: z + q.w * tz + q.x * ty - q.y * tx };
}

// Ours, looking like the above to the runner.
function ourCar(world, { gravity = 26, length = 5.02, width = 2.07, height = 1.27, mass = 1400, tune = {}, wheels } = {}) {
	const car = new Car(R, world, {
		size: { width, height, length },
		mass,
		gravity,
		tune,
		position: { x: 0, y: 1.5, z: 0 },
		wheels: wheels ?? [
			{ x: 0.82, y: 0.365, z: 1.5, radius: 0.365, front: true },
			{ x: -0.82, y: 0.365, z: 1.5, radius: 0.365, front: true },
			{ x: 0.82, y: 0.395, z: -1.4, radius: 0.395 },
			{ x: -0.82, y: 0.395, z: -1.4, radius: 0.395 },
		],
	});
	car.flipWait = 1e9;
	return {
		L: length,
		time: 1,
		car,
		body: car.body,
		input: car.input,
		forwardOf: () => rotate(car.body.rotation(), 0, 0, 1),
		upOf: () => rotate(car.body.rotation(), 0, 1, 0),
		pre() {
			car.input = this.input;
			car.update(1 / 60);
			world.timestep = 1 / 60;
		},
		post() {
			car.afterStep(1 / 60);
		},
		wheelsDown: () => car.wheelsOnGround,
	};
}

const SIZE = 600;
function freshWorld() {
	const world = new R.World({ x: 0, y: -9.81, z: 0 });
	const floor = world.createRigidBody(R.RigidBodyDesc.fixed());
	world.createCollider(R.ColliderDesc.cuboid(SIZE, 1, SIZE).setTranslation(0, -1, 0).setFriction(0.5), floor);
	return world;
}

// Runs `script(car, t)` for `seconds` of real time: 60 frames a second, each one a world step.
function run(car, world, seconds, script, each) {
	const frames = Math.round(seconds * 60);
	for (let i = 0; i < frames; i++) {
		script?.(car, i / 60);
		car.pre();
		world.step();
		car.post();
		each?.(car, i / 60);
	}
}

const measures = (make) => {
	const m = {};
	const speedOf = (c) => {
		const v = c.body.linvel();
		return Math.hypot(v.x, v.z) * c.time; // to the eye
	};
	const settle = (c, w) => run(c, w, 2.5, (x) => (x.input = { throttle: 0, steer: 0, boost: 0, brake: 0, jump: 0 }));

	// Sag: where it rests, and how far the spring is from full length.
	{
		const w = freshWorld();
		const c = make(w);
		settle(c, w);
		m.restY = c.body.translation().y;
	}
	// Full throttle: speed against time.
	{
		const w = freshWorld();
		const c = make(w);
		settle(c, w);
		const at = {};
		let pitch = 0;
		run(c, w, 6, (x) => (x.input = { throttle: 1, steer: 0, boost: 0, brake: 0, jump: 0 }), (x, t) => {
			for (const k of [0.25, 0.5, 1, 2, 4]) if (Math.abs(t - k) < 1 / 120) at[k] = speedOf(x);
			if (t < 1) pitch = Math.max(pitch, Math.abs(Math.asin(clamp(x.forwardOf().y, -1, 1))));
		});
		m.throttle = at;
		m.plateau = speedOf(c);
		m.launchPitchDeg = (pitch * 180) / Math.PI;

		// Let go: coast for 2 s.
		const before = speedOf(c);
		run(c, w, 2, (x) => (x.input = { throttle: 0, steer: 0, boost: 0, brake: 0, jump: 0 }));
		m.coastLoss = 1 - speedOf(c) / before;
	}
	// Boost from a standstill.
	{
		const w = freshWorld();
		const c = make(w);
		settle(c, w);
		const at = {};
		let pitch = 0;
		run(c, w, 3, (x) => (x.input = { throttle: 1, steer: 0, boost: 1, brake: 0, jump: 0 }), (x, t) => {
			for (const k of [0.25, 0.5, 1, 2]) if (Math.abs(t - k) < 1 / 120) at[k] = speedOf(x);
			if (t > 0.5 && t < 1.5) pitch = Math.max(pitch, Math.abs(Math.asin(clamp(x.forwardOf().y, -1, 1))));
			m.boostWheels = Math.min(m.boostWheels ?? 4, x.wheelsDown());
		});
		m.boostPitchDeg = (pitch * 180) / Math.PI;
		m.boost = at;
	}
	// Brake from the plateau: time and distance.
	{
		const w = freshWorld();
		const c = make(w);
		settle(c, w);
		run(c, w, 4, (x) => (x.input = { throttle: 1, steer: 0, boost: 0, brake: 0, jump: 0 }));
		const v0 = speedOf(c);
		const p0 = c.body.translation();
		let t0 = null;
		run(c, w, 4, (x) => (x.input = { throttle: 0, steer: 0, boost: 0, brake: 1, jump: 0 }), (x, t) => {
			if (t0 === null && speedOf(x) < 0.05 * v0) t0 = t;
		});
		const p1 = c.body.translation();
		m.brakeFrom = v0;
		m.brakeTime = t0;
		m.brakeDist = Math.hypot(p1.x - p0.x, p1.z - p0.z) * c.time;
	}
	// Full lock at the plateau: yaw rate, how wide, how much it slides, how it leans.
	{
		const w = freshWorld();
		const c = make(w);
		settle(c, w);
		run(c, w, 4, (x) => (x.input = { throttle: 1, steer: 0, boost: 0, brake: 0, jump: 0 }));
		const yawNow = (x) => {
			const f = x.forwardOf();
			return Math.atan2(f.x, f.z);
		};
		let last = yawNow(c);
		let total = 0;
		let t90 = null;
		let t180 = null;
		let peakRate = 0;
		let slipSum = 0;
		let slipN = 0;
		let roll = 0;
		const v0 = speedOf(c);
		run(c, w, 4, (x) => (x.input = { throttle: 1, steer: 1, boost: 0, brake: 0, jump: 0 }), (x, t) => {
			const y = yawNow(x);
			let d = y - last;
			if (d > Math.PI) d -= 2 * Math.PI;
			if (d < -Math.PI) d += 2 * Math.PI;
			last = y;
			total += d;
			peakRate = Math.max(peakRate, Math.abs(d) * 60 * x.time / x.time);
			if (t90 === null && Math.abs(total) >= Math.PI / 2) t90 = t;
			if (t180 === null && Math.abs(total) >= Math.PI) t180 = t;
			if (t > 1) {
				const v = x.body.linvel();
				const f = x.forwardOf();
				const sp = Math.hypot(v.x, v.z);
				if (sp > 0.2) {
					slipSum += Math.acos(clamp((v.x * f.x + v.z * f.z) / (sp * Math.hypot(f.x, f.z)), -1, 1));
					slipN++;
				}
				roll = Math.max(roll, Math.abs(Math.asin(clamp(rotateSide(x).y, -1, 1))));
			}
		});
		m.lockFrom = v0;
		m.t90 = t90;
		m.t180 = t180;
		m.peakYawDeg = (peakRate * 180) / Math.PI;
		m.lockSlipDeg = slipN ? ((slipSum / slipN) * 180) / Math.PI : 0;
		m.rollDeg = (roll * 180) / Math.PI;
		m.lockEnd = speedOf(c);
	}
	// Boost for 1.5 s, then full lock: how far the back steps out.
	{
		const w = freshWorld();
		const c = make(w);
		settle(c, w);
		run(c, w, 1.5, (x) => (x.input = { throttle: 1, steer: 0, boost: 1, brake: 0, jump: 0 }));
		let peak = 0;
		let turned = 0;
		const v0 = speedOf(c);
		let last = null;
		run(c, w, 1.5, (x) => (x.input = { throttle: 1, steer: 1, boost: 0, brake: 0, jump: 0 }), (x) => {
			const v = x.body.linvel();
			const f = x.forwardOf();
			const sp = Math.hypot(v.x, v.z);
			if (sp > 0.5) peak = Math.max(peak, Math.acos(clamp((v.x * f.x + v.z * f.z) / (sp * Math.hypot(f.x, f.z)), -1, 1)));
			const y = Math.atan2(f.x, f.z);
			if (last !== null) {
				let d = y - last;
				if (d > Math.PI) d -= 2 * Math.PI;
				if (d < -Math.PI) d += 2 * Math.PI;
				turned += d;
			}
			last = y;
		});
		m.slideFrom = v0;
		m.slideDeg = (peak * 180) / Math.PI;
		m.slideTurnDeg = Math.abs((turned * 180) / Math.PI);
	}
	// Jump: Space for 0.15 s from a standstill. How high, how long.
	{
		const w = freshWorld();
		const c = make(w);
		settle(c, w);
		const y0 = c.body.translation().y;
		let top = y0;
		let air = 0;
		run(c, w, 3, (x, t) => (x.input = { throttle: 0, steer: 0, boost: 0, brake: 0, jump: t < 0.15 ? 1 : 0 }), (x) => {
			top = Math.max(top, x.body.translation().y);
			if (x.wheelsDown() === 0) air += 1 / 60;
		});
		m.jump = top - y0;
		m.air = air;
	}
	// Drop from 2 car-heights... a landing: from one car length up, how long until it's still, and how low it goes.
	{
		const w = freshWorld();
		const c = make(w);
		settle(c, w);
		const y0 = c.body.translation().y;
		const p = c.body.translation();
		c.body.setTranslation({ x: p.x, y: y0 + c.L * 0.5, z: p.z }, true);
		c.body.setLinvel({ x: 0, y: 0, z: 0 }, true);
		let low = y0;
		let bounce = 0;
		let phase = 0;
		let settledAt = null;
		run(c, w, 3, null, (x, t) => {
			const y = x.body.translation().y;
			low = Math.min(low, y);
			if (phase === 0 && y < y0) phase = 1;
			if (phase === 1) bounce = Math.max(bounce, y - y0);
			if (phase === 1 && Math.abs(y - y0) > 0.02 * x.L) settledAt = t;
		});
		m.landLow = y0 - low;
		m.landBounce = bounce;
		m.landSettled = settledAt;
	}
	return m;
};

function rotateSide(x) {
	const q = x.body.rotation();
	// The car's side axis: +Z in folio, +X in ours.
	return x.car ? rotate(q, 1, 0, 0) : rotate(q, 0, 0, 1);
}

const table = (rows) => {
	const w = rows[0].map((_, i) => Math.max(...rows.map((r) => String(r[i]).length)));
	for (const r of rows) console.log(r.map((c, i) => String(c).padStart(w[i])).join('  '));
};

// The demo's default car, the rally car, measured from its model. --muscle for the muscle car.
const RALLY = {
	length: 4.31,
	width: 1.94,
	height: 1.49,
	mass: 1150,
	wheels: [
		{ x: 0.78, y: 0.335, z: 1.2, radius: 0.335, front: true },
		{ x: -0.78, y: 0.335, z: 1.2, radius: 0.335, front: true },
		{ x: 0.78, y: 0.335, z: -1.25, radius: 0.335 },
		{ x: -0.78, y: 0.335, z: -1.25, radius: 0.335 },
	],
};
const body = process.argv.includes('--muscle') ? {} : RALLY;
const L = body.length ?? 5.02;
const cars = [['folio', (w) => folioCar(w), FOLIO.length], ...(process.argv.includes('--com') ? [0.625, 0.58, 0.54, 0.5].map((h) => [`c=${h}`, (w) => ourCar(w, { gravity: 45, ...body, tune: { comHeight: h } }), L]) : [26, 40, 45, 50, 65].map((g) => [`g=${g}`, (w) => ourCar(w, { gravity: g, ...body }), L]))];
const results = cars.map(([name, make, L]) => ({ name, L, m: measures(make) }));
const n = (x, d = 2) => (x === null || x === undefined ? '-' : x.toFixed(d));
const rows = [['', ...results.map((r) => r.name)]];
const line = (label, f) => rows.push([label, ...results.map((r) => f(r.m, r.L))]);
line('wheels down at top boost', (m) => n(m.boostWheels, 0));
line('rest height / L', (m, L) => n(m.restY / L, 3));
line('throttle .25s, L/s', (m, L) => n(m.throttle[0.25] / L));
line('throttle .5s', (m, L) => n(m.throttle[0.5] / L));
line('throttle 1s', (m, L) => n(m.throttle[1] / L));
line('throttle 2s', (m, L) => n(m.throttle[2] / L));
line('throttle 4s', (m, L) => n(m.throttle[4] / L));
line('6 s, m/s to the eye', (m) => n(m.plateau, 1));
line('launch pitch, deg', (m) => n(m.launchPitchDeg, 1));
line('coast 2s, lost', (m) => n(m.coastLoss));
line('boost pitch, deg', (m) => n(m.boostPitchDeg, 1));
line('boost .25s, L/s', (m, L) => n(m.boost[0.25] / L));
line('boost .5s', (m, L) => n(m.boost[0.5] / L));
line('boost 1s', (m, L) => n(m.boost[1] / L));
line('boost 2s', (m, L) => n(m.boost[2] / L));
line('brake from, L/s', (m, L) => n(m.brakeFrom / L));
line('brake time, s', (m) => n(m.brakeTime));
line('brake dist, L', (m, L) => n(m.brakeDist / L));
line('lock from, L/s', (m, L) => n(m.lockFrom / L));
line('90 deg in, s', (m) => n(m.t90));
line('180 deg in, s', (m) => n(m.t180));
line('peak yaw, deg/frame*60', (m) => n(m.peakYawDeg, 0));
line('slip in lock, deg', (m) => n(m.lockSlipDeg, 1));
line('roll in lock, deg', (m) => n(m.rollDeg, 1));
line('speed after 4s lock', (m, L) => n(m.lockEnd / L));
line('slide from, L/s', (m, L) => n(m.slideFrom / L));
line('slide peak, deg', (m) => n(m.slideDeg, 0));
line('slide turned 1.5s, deg', (m) => n(m.slideTurnDeg, 0));
line('jump, L', (m, L) => n(m.jump / L));
line('jump air, s', (m) => n(m.air));
line('land low / L', (m, L) => n(m.landLow / L, 3));
line('land bounce / L', (m, L) => n(m.landBounce / L, 3));
line('land settled, s', (m) => n(m.landSettled));
table(rows);

// Upside down, on a side, on its nose: how long until it's on its wheels, with the wait before the hop.
console.log('\nrighting itself, g=40 (hops, seconds, wheels at the end):');
for (const [name, q] of [
	['roof', { x: 0, y: 0, z: 1, w: 0 }],
	['roof, turned', { x: 0.7071, y: 0, z: 0.7071, w: 0 }],
	['left side', { x: 0, y: 0, z: 0.7071, w: 0.7071 }],
	['right side', { x: 0, y: 0, z: -0.7071, w: 0.7071 }],
	['nose', { x: 0.7071, y: 0, z: 0, w: 0.7071 }],
	['tail', { x: -0.7071, y: 0, z: 0, w: 0.7071 }],
]) {
	for (const [cname, opts] of [['rally', RALLY], ['muscle', {}], ['pickup', { length: 5.58, width: 2.27, height: 2.09, mass: 2100 }]]) {
		const w = freshWorld();
		const c = ourCar(w, { gravity: 40, ...opts });
		c.car.flipWait = 2;
		c.body.setTranslation({ x: 0, y: 2.5, z: 0 }, true);
		c.body.setRotation(q, true);
		let upright = null;
		run(c, w, 14, null, (x, t) => {
			if (upright === null && x.car.up.y > 0.95 && x.car.wheelsOnGround === 4 && t > 0.5) upright = t;
		});
		console.log(`  ${name.padEnd(13)} ${cname.padEnd(7)} hops ${c.car.flips}, ${upright === null ? 'NEVER' : `${upright.toFixed(2)} s`}`);
	}
}
