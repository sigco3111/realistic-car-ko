// What the car does, measured on scripted input, in real units: node tools/bench.mjs [--curve]
// Runs on a flat floor with no browser and no rendering. Compare with road-test numbers.
import { Car, SURFACES, slipCurve } from '../src/car.js';
import { VIREO, specOf } from '../src/vireo.js';

const mod = await import(new URL('../node_modules/@dimforge/rapier3d-compat/rapier.es.js', import.meta.url).href);
const R = mod.default ?? mod;
await R.init();
const STEP = 1 / 120;

function setup(surface, tune = {}) {
	const world = new R.World({ x: 0, y: -9.81, z: 0 });
	world.timestep = STEP;
	world.createCollider(R.ColliderDesc.cuboid(4000, 1, 4000).setTranslation(0, -1, 0).setFriction(0.5));
	const car = new Car(R, world, { ...specOf(), ...tune, surfaceAt: () => surface, position: { x: 0, y: 0.1, z: 0 } });
	car.flipWait = 1e9;
	return { world, car };
}
function run(s, seconds, input, each) {
	const n = Math.round(seconds / STEP);
	for (let i = 0; i < n; i++) {
		s.car.input = typeof input === 'function' ? input(i * STEP) : input;
		s.car.update(STEP);
		s.world.step();
		s.car.afterStep(STEP);
		if (each && each(i * STEP) === false) return i * STEP;
	}
	return seconds;
}
const NONE = { throttle: 0, steer: 0, brake: 0, handbrake: 0 };
const deg = (r) => (r * 180) / Math.PI;
const pitchOf = (c) => deg(Math.asin(c.forward.y));
const rollOf = (c) => deg(Math.asin(c.side.y));
const speedKmh = (c) => Math.hypot(c.velocity.x, c.velocity.z) * 3.6;
const larger = (a, b) => (Math.abs(b) > Math.abs(a) ? b : a);
const toSpeed = (s, kmh) => run(s, 30, { ...NONE, throttle: 1 }, () => speedKmh(s.car) < kmh);

function measure(surface, tune) {
	const out = {};
	let s = setup(surface, tune);
	run(s, 2.5, NONE);
	out.restY = s.car.position.y;
	out.restSpeed = s.car.speed;

	// Launch.
	s = setup(surface, tune);
	run(s, 2, NONE);
	let pitch = 0;
	out.t100 = run(s, 25, { ...NONE, throttle: 1 }, () => {
		pitch = larger(pitch, pitchOf(s.car));
		return speedKmh(s.car) < 100;
	});
	out.launchPitch = pitch;
	out.gearAt100 = s.car.gear;
	out.rpmAt100 = s.car.rpm;

	// Brakes from 100, with ABS and without.
	for (const assists of [true, false]) {
		s = setup(surface, tune);
		run(s, 1.5, NONE);
		toSpeed(s, 100);
		s.car.tune.assists = assists;
		const start = { ...s.car.position };
		const v0 = speedKmh(s.car);
		let dive = 0;
		const t = run(s, 12, { ...NONE, brake: 1 }, () => {
			dive = larger(dive, pitchOf(s.car));
			return speedKmh(s.car) > 1;
		});
		const d = Math.hypot(s.car.position.x - start.x, s.car.position.z - start.z);
		out[assists ? 'brakeAbs' : 'brakeLock'] = { d: d * (100 / v0) ** 2, g: v0 / 3.6 / t / 9.81, dive };
	}

	// Full lock at a held speed: how many g, and how far it leans.
	s = setup(surface, tune);
	run(s, 1.5, NONE);
	toSpeed(s, 70);
	let roll = 0;
	let lat = 0;
	let n = 0;
	run(s, 7, () => ({ ...NONE, throttle: speedKmh(s.car) < 70 ? 0.6 : 0, steer: 1 }), (t) => {
		if (t > 3.5) {
			lat += Math.abs(s.car.yawRate * Math.hypot(s.car.velocity.x, s.car.velocity.z));
			n++;
			roll = Math.max(roll, Math.abs(rollOf(s.car)));
		}
	});
	out.steadyG = lat / n / 9.81;
	out.steadyRoll = roll;
	out.steadyBeta = deg(Math.atan2(s.car.sideSpeed, s.car.forwardSpeed));
	out.steadySpeed = speedKmh(s.car);
	out.steadyLoads = s.car.wheels.map((w) => Math.round(w.load));

	// The same with no assists: full lock is full lock.
	s = setup(surface, tune);
	run(s, 1.5, NONE);
	toSpeed(s, 70);
	s.car.tune.assists = false;
	let spun = 0;
	run(s, 4, () => ({ ...NONE, throttle: 0.5, steer: 1 }), () => {
		spun = Math.max(spun, Math.abs(deg(Math.atan2(s.car.sideSpeed, Math.abs(s.car.forwardSpeed)))));
	});
	out.rawSlide = spun;
	out.rawUp = s.car.up.y;

	// Step steer at 70 km/h: how quickly the car answers.
	s = setup(surface, tune);
	run(s, 1.5, NONE);
	toSpeed(s, 70);
	let t90 = null;
	let yaw = 0;
	let prev = Math.atan2(s.car.forward.x, s.car.forward.z);
	run(s, 6, () => ({ ...NONE, throttle: 0.3, steer: 1 }), (t) => {
		const a = Math.atan2(s.car.forward.x, s.car.forward.z);
		let d = a - prev;
		if (d > Math.PI) d -= 2 * Math.PI;
		if (d < -Math.PI) d += 2 * Math.PI;
		yaw += d;
		prev = a;
		if (t90 === null && Math.abs(yaw) > Math.PI / 2) t90 = t;
	});
	out.t90 = t90;

	// Handbrake at 60 km/h with steer for 0.9 s, then let go: how far round it comes.
	s = setup(surface, tune);
	run(s, 1.5, NONE);
	toSpeed(s, 60);
	let slide = 0;
	let yawH = 0;
	let prevH = Math.atan2(s.car.forward.x, s.car.forward.z);
	run(s, 3, (t) => ({ ...NONE, steer: t < 0.9 ? 1 : 0, handbrake: t < 0.9 ? 1 : 0 }), (t) => {
		const sp = Math.hypot(s.car.velocity.x, s.car.velocity.z);
		if (sp > 2) slide = Math.max(slide, Math.abs(deg(Math.atan2(s.car.sideSpeed, Math.abs(s.car.forwardSpeed)))));
		const a = Math.atan2(s.car.forward.x, s.car.forward.z);
		let d = a - prevH;
		if (d > Math.PI) d -= 2 * Math.PI;
		if (d < -Math.PI) d += 2 * Math.PI;
		yawH += d;
		prevH = a;
		if (t < 0.8) out.rearSpin = s.car.wheels[2].spin;
	});
	out.handbrakeSlide = slide;
	out.handbrakeTurned = Math.abs(deg(yawH));
	out.handbrakeEnd = speedKmh(s.car);

	// A drop from half a metre: how far the springs go, and how quickly it settles.
	s = setup(surface, tune);
	run(s, 2, NONE);
	const y0 = s.car.position.y;
	s.car.body.setTranslation({ x: 0, y: y0 + 0.5, z: 0 }, true);
	let low = y0;
	let up = 0;
	let settled = 0;
	let hit = false;
	run(s, 3, NONE, (t) => {
		const y = s.car.position.y;
		low = Math.min(low, y);
		if (y < y0) hit = true;
		if (hit) up = Math.max(up, y - y0);
		if (hit && Math.abs(y - y0) > 0.01) settled = t;
	});
	out.drop = { low: y0 - low, up, settled };
	return out;
}

if (process.argv.includes('--curve')) {
	console.log('grip against slip angle, on each surface:');
	for (const name of Object.keys(SURFACES)) {
		const { falloff, alpha, mu } = SURFACES[name];
		const row = [0.1, 0.25, 0.5, 0.75, 1, 1.5, 2, 3, 5, 8].map((x) => `${((alpha * x * 180) / Math.PI).toFixed(0)}°:${(mu * slipCurve(x, falloff)).toFixed(2)}`);
		console.log(' ', name.padEnd(7), row.join('  '));
	}
}
const f = (x, d = 1) => (x === null || x === undefined ? '-' : x.toFixed(d));
const results = ['tarmac', 'gravel', 'grass'].map((surface) => [surface, measure(surface)]);
console.log(`\n${VIREO.label}, ${specOf().mass} kg, ${specOf().torque} Nm`);
const rows = [
	['rest: y, speed', (m) => `${f(m.restY, 3)}, ${f(m.restSpeed, 3)}`],
	['0-100 km/h, s', (m) => f(m.t100)],
	['  pitch on launch, deg', (m) => f(m.launchPitch)],
	['  gear, rpm at 100', (m) => `${m.gearAt100}, ${f(m.rpmAt100, 0)}`],
	['100-0 with ABS: m, g', (m) => `${f(m.brakeAbs.d)}, ${f(m.brakeAbs.g, 2)}`],
	['  nose dive, deg', (m) => f(m.brakeAbs.dive)],
	['100-0 no ABS: m, g', (m) => `${f(m.brakeLock.d)}, ${f(m.brakeLock.g, 2)}`],
	['full lock at 70: g', (m) => f(m.steadyG, 2)],
	['  body roll, deg', (m) => f(m.steadyRoll)],
	['  slide angle, deg', (m) => f(m.steadyBeta)],
	['  speed held, km/h', (m) => f(m.steadySpeed, 0)],
	['  corner loads, N', (m) => m.steadyLoads.join('/')],
	['no assists, peak slide', (m) => f(m.rawSlide, 0)],
	['90 deg of turn at 70, s', (m) => f(m.t90, 2)],
	['handbrake 60: slide, deg', (m) => f(m.handbrakeSlide, 0)],
	['  turned, deg', (m) => f(m.handbrakeTurned, 0)],
	['  rear wheel spin', (m) => f(m.rearSpin, 1)],
	['  speed after 3 s, km/h', (m) => f(m.handbrakeEnd, 0)],
	['0.5 m drop: low, m', (m) => f(m.drop.low, 3)],
	['  rebound, m', (m) => f(m.drop.up, 3)],
	['  settled after, s', (m) => f(m.drop.settled, 2)],
];
const table = [['', ...results.map((r) => r[0])], ...rows.map(([label, get]) => [label, ...results.map((r) => get(r[1]))])];
const widths = table[0].map((_, i) => Math.max(...table.map((r) => String(r[i]).length)));
for (const r of table) console.log(r.map((c, i) => String(c).padStart(widths[i])).join('  '));
