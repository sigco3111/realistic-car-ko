// How far a slide carries, on each surface, on scripted input: node tools/slide-bench.mjs
// Flat floor, no browser. Side-on means thrown sideways with nothing pressed; the handbrake runs hold it until the car stops.
import { Car } from '../src/car.js';
import { specOf } from '../src/vireo.js';

const mod = await import(new URL('../node_modules/@dimforge/rapier3d-compat/rapier.es.js', import.meta.url).href);
const R = mod.default ?? mod;
await R.init();
const STEP = 1 / 120;
const NONE = { throttle: 0, steer: 0, brake: 0, handbrake: 0 };

function setup(surface) {
	const world = new R.World({ x: 0, y: -9.81, z: 0 });
	world.timestep = STEP;
	world.createCollider(R.ColliderDesc.cuboid(4000, 1, 4000).setTranslation(0, -1, 0).setFriction(0.5));
	const car = new Car(R, world, { ...specOf(), surfaceAt: () => surface, position: { x: 0, y: 0.1, z: 0 } });
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
		if (each && each(i * STEP) === false) return (i + 1) * STEP;
	}
	return seconds;
}
const flat = (c) => Math.hypot(c.velocity.x, c.velocity.z);
const settled = (surface) => {
	const s = setup(surface);
	run(s, 1.5, NONE);
	return s;
};
const toSpeed = (s, kmh) => run(s, 30, { ...NONE, throttle: 1 }, () => flat(s.car) * 3.6 < kmh);
/** Runs until it's stopped, and says how far and how long, and what it read when it was at its most side-on. */
function untilStopped(s, input, seconds = 30) {
	const a = { ...s.car.position };
	let side = 0;
	let yaw = 0;
	let was = Math.atan2(s.car.forward.x, s.car.forward.z);
	const time = run(s, seconds, input, () => {
		side = Math.max(side, Math.abs(s.car.sideSpeed));
		const now = Math.atan2(s.car.forward.x, s.car.forward.z);
		let d = now - was;
		if (d > Math.PI) d -= 2 * Math.PI;
		if (d < -Math.PI) d += 2 * Math.PI;
		yaw += d;
		was = now;
		return flat(s.car) > 0.5;
	});
	return { metres: Math.hypot(s.car.position.x - a.x, s.car.position.z - a.z), time, side, turned: Math.abs((yaw * 180) / Math.PI) };
}
function sideOn(surface, speed) {
	const s = settled(surface);
	s.car.body.setLinvel({ x: speed * s.car.side.x, y: 0, z: speed * s.car.side.z }, true);
	return untilStopped(s, NONE);
}
function handbrake(surface, kmh, steer) {
	const s = settled(surface);
	toSpeed(s, kmh);
	return untilStopped(s, { ...NONE, handbrake: 1, steer });
}
/** The classic: a flick on the handbrake and full lock, let go after 0.9 s and nothing pressed after. */
function flick(surface, kmh) {
	const s = settled(surface);
	toSpeed(s, kmh);
	return untilStopped(s, (t) => ({ ...NONE, handbrake: t < 0.9 ? 1 : 0, steer: t < 0.9 ? 1 : 0 }));
}
function brake(surface, kmh) {
	const s = settled(surface);
	toSpeed(s, kmh);
	return untilStopped(s, { ...NONE, brake: 1 });
}
function launch(surface) {
	const s = settled(surface);
	return run(s, 25, { ...NONE, throttle: 1 }, () => flat(s.car) * 3.6 < 100);
}
function corner(surface) {
	const s = settled(surface);
	toSpeed(s, 70);
	let lat = 0;
	let n = 0;
	run(s, 7, () => ({ ...NONE, throttle: flat(s.car) * 3.6 < 70 ? 0.6 : 0, steer: 1 }), (t) => {
		if (t > 3.5) {
			lat += Math.abs(s.car.yawRate * flat(s.car));
			n++;
		}
	});
	return lat / n / 9.81;
}
/** Power slide: full throttle and full lock with no assists, the way someone keeps it sideways. How sideways does it stay? */
function powerSlide(surface) {
	const s = settled(surface);
	toSpeed(s, 60);
	s.car.tune.assists = false;
	let peak = 0;
	let sum = 0;
	let n = 0;
	let low = 1;
	run(s, 5, { ...NONE, throttle: 1, steer: 1 }, () => {
		const v = flat(s.car);
		low = Math.min(low, s.car.up.y);
		if (v < 2) return;
		const beta = Math.abs((Math.atan2(s.car.sideSpeed, Math.abs(s.car.forwardSpeed)) * 180) / Math.PI);
		peak = Math.max(peak, beta);
		sum += beta;
		n++;
	});
	return { peak, mean: sum / Math.max(n, 1), low };
}

const surfaces = ['tarmac', 'gravel', 'grass'];
const rows = [
	['side-on from 54 km/h: m, s', (a) => { const r = sideOn(a, 15); return `${r.metres.toFixed(1)}, ${r.time.toFixed(2)}`; }],
	['side-on from 90 km/h: m, s', (a) => { const r = sideOn(a, 25); return `${r.metres.toFixed(1)}, ${r.time.toFixed(2)}`; }],
	['handbrake held from 90, straight: m, s', (a) => { const r = handbrake(a, 90, 0); return `${r.metres.toFixed(1)}, ${r.time.toFixed(2)}`; }],
	['handbrake held from 90, full lock: m, s', (a) => { const r = handbrake(a, 90, 1); return `${r.metres.toFixed(1)}, ${r.time.toFixed(2)}`; }],
	['handbrake flick from 60: m, s, turned', (a) => { const r = flick(a, 60); return `${r.metres.toFixed(1)}, ${r.time.toFixed(2)}, ${r.turned.toFixed(0)}`; }],
	['  power slide, no assists: mean, peak deg', (a) => { const r = powerSlide(a); return `${r.mean.toFixed(0)}, ${r.peak.toFixed(0)}, up ${r.low.toFixed(2)}`; }],
	['  brakes from 100: m', (a) => brake(a, 100, 0).metres.toFixed(1)],
	['  full lock at 70: g', (a) => corner(a).toFixed(2)],
	['  0-100 km/h: s', (a) => launch(a).toFixed(2)],
];
const table = [['', ...surfaces], ...rows.map(([name, get]) => [name, ...surfaces.map(get)])];
const widths = table[0].map((_, i) => Math.max(...table.map((r) => String(r[i]).length)));
for (const r of table) console.log(r.map((c, i) => (i ? String(c).padStart(widths[i]) : String(c).padEnd(widths[i]))).join('  '));
