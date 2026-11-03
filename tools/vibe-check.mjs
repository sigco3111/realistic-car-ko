// How much the car shakes, from the seat, on an autopilot lap of the stage at a held speed, in the game's own time. Tells the body's and the
// seat camera's movement apart, by surface, and lists the worst jolts with what the wheels were doing there. Muted.
//   node tools/vibe-check.mjs <demo url> [speed in km/h, default 100] [json file for the whole log] [metres past the road's edge to weave out to]
import fs from 'node:fs';
import { chromium } from 'playwright';
import { guard } from 'file:///C:/Users/drini/Patch/seeds/no-pointer-lock.mjs';

guard(chromium);
const [url, kmh = '100', logFile, weaveOut] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--ignore-gpu-blocklist', '--use-angle=d3d11'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
await page.goto(`${url}?map=stage`);
await page.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 90000 });
const log = await page.evaluate(async ([cap, weave]) => {
	const a = window.__block.app;
	a.set('view', 'driver');
	const car = a.car;
	const road = a.stage.shape.road.points;
	a.hold = true;
	let at = 0;
	car.moveTo({ x: road[0].x, y: road[0].y + 0.3, z: road[0].z }, Math.atan2(road[0].dx, road[0].dz));
	a.view.jump?.(car);
	a.script = () => {
		const p = car.position;
		let best = at;
		let bestD = 1e9;
		for (let i = at; i < Math.min(road.length, at + 40); i++) {
			const d = Math.hypot(road[i].x - p.x, road[i].z - p.z);
			if (d < bestD) {
				bestD = d;
				best = i;
			}
		}
		at = best;
		const speed = Math.max(car.forwardSpeed, 3);
		const t = road[Math.min(road.length - 1, at + Math.round(4 + speed * 0.42))];
		const aim = weave === null ? 0 : Math.sin(t.s / 26) * (t.half + weave);
		let diff = Math.atan2(t.x + t.sx * aim - p.x, t.z + t.sz * aim - p.z) - Math.atan2(car.forward.x, car.forward.z);
		while (diff > Math.PI) diff -= 2 * Math.PI;
		while (diff < -Math.PI) diff += 2 * Math.PI;
		let tightest = 0;
		for (let i = at; i < Math.min(road.length, at + 40 + Math.round(speed)); i += 2) tightest = Math.max(tightest, Math.abs(road[i].bend));
		const safe = Math.min(cap, Math.sqrt((0.72 * 9.81) / Math.max(tightest, 0.001)));
		return { throttle: speed < safe ? (speed < safe - 1 ? 1 : 0.35) : 0, brake: speed > safe + 2 ? 1 : 0, steer: Math.max(-1, Math.min(1, diff * 2.4)), handbrake: 0 };
	};
	const STEP = 1 / 120;
	const rows = [];
	const cam = a.camera;
	for (let i = 0; i < 120 * 300 && at < road.length - 12; i++) {
		// A page that doesn't breathe for minutes gets killed.
		if (i % 600 === 0) await new Promise((go) => setTimeout(go));
		a.stepWorld();
		const v = car.velocity;
		const w = car.body.angvel();
		const dot = (p, q) => p.x * q.x + p.y * q.y + p.z * q.z;
		let camera = null;
		if (i % 2 === 0) {
			a.model.update(STEP * 2, 1);
			a.view.update(car, a.model.object.position, STEP * 2);
			camera = [cam.position.y, cam.quaternion.x, cam.quaternion.y, cam.quaternion.z, cam.quaternion.w];
		}
		const r = road[at];
		rows.push({
			s: r.s,
			bend: r.bend,
			sealed: r.sealed,
			surface: car.wheels[2].surface,
			speed: car.speed,
			y: car.position.y,
			vy: v.y,
			pitch: dot(w, car.side),
			roll: dot(w, car.forward),
			yaw: dot(w, car.up),
			side: car.sideSpeed,
			wheels: car.wheels.map((q) => [q.inContact ? +q.contactY.toFixed(4) : null, +q.length.toFixed(4), Math.round(q.load), +q.normal?.y?.toFixed(5), q.bottomed ? 1 : 0]),
			on: car.wheelsOnGround,
			camera,
		});
	}
	a.script = null;
	return rows;
}, [Number(kmh) / 3.6, weaveOut === undefined ? null : Number(weaveOut)]);
await browser.close();
if (logFile) fs.writeFileSync(logFile, JSON.stringify(log));
const STEP = 1 / 120;

/** What's left of a signal once its slow movement's taken away: what you feel as shake, not the road's rise and fall. */
function shake(values, span) {
	const out = new Float64Array(values.length);
	let sum = 0;
	for (let i = 0; i < values.length; i++) {
		sum += values[i];
		if (i >= span) sum -= values[i - span];
		const n = Math.min(i + 1, span);
		out[i] = values[i] - sum / n;
	}
	return out;
}
const rms = (a) => Math.sqrt(a.reduce((s, x) => s + x * x, 0) / Math.max(1, a.length));
const pct = (a, p) => [...a].map(Math.abs).sort((x, y) => x - y)[Math.floor(a.length * p)] ?? 0;
const worst = (a) => a.reduce((m, x) => Math.max(m, Math.abs(x)), 0);

// The body, every step: up-and-down acceleration, and how fast it pitches and rolls.
const ay = log.map((r, i) => (i ? (r.vy - log[i - 1].vy) / STEP : 0));
const shakeY = shake(ay, 24);
const pitchRate = shake(log.map((r) => r.pitch), 24);
const rollRate = shake(log.map((r) => r.roll), 24);
// The seat camera, every other step: how fast it's moving up and down apart from the road's rise and fall, and how fast it turns.
const frames = log.map((r, i) => ({ r, i })).filter((f) => f.r.camera);
const FRAME = STEP * 2;
const camV = frames.map((f, k) => (k ? (f.r.camera[0] - frames[k - 1].r.camera[0]) / FRAME : 0));
const camA = shake(camV.map((v, k) => (k ? (v - camV[k - 1]) / FRAME : 0)), 12);
const camTurn = frames.map((f, k) => {
	if (!k) return { pitchRoll: 0 };
	const [, x, y, z, w] = f.r.camera;
	const [, x0, y0, z0, w0] = frames[k - 1].r.camera;
	// The turn between frames, in the camera's own frame: x is pitch, z is roll.
	const dx = w0 * x - x0 * w - y0 * z + z0 * y;
	const dz = w0 * z + x0 * y - y0 * x - z0 * w;
	return { pitchRoll: (2 * Math.hypot(dx, dz) * 180) / Math.PI / FRAME };
});
const camRate = shake(camTurn.map((t) => t.pitchRoll), 12);

const steady = (r) => Math.abs(r.bend) < 0.012 && r.on === 4 && r.speed > 15;
console.log(`laps ${(log.length * STEP).toFixed(0)} s at up to ${kmh} km/h, ${log.filter((r) => r.on === 0).length * STEP} s in the air`);
const table = [];
for (const surface of ['tarmac', 'gravel', 'grass']) {
	const keep = log.map((r, i) => (r.surface === surface && steady(r) ? i : -1)).filter((i) => i >= 0);
	const keepFrames = frames.map((f, k) => (f.r.surface === surface && steady(f.r) ? k : -1)).filter((k) => k >= 0);
	if (keep.length < 240) continue;
	const pick = (a, list) => list.map((i) => a[i]);
	const row = {
		surface,
		seconds: +(keep.length * STEP).toFixed(1),
		bodyShake: +rms(pick(shakeY, keep)).toFixed(3),
		bodyShake99: +pct(pick(shakeY, keep), 0.99).toFixed(2),
		bodyWorst: +worst(pick(shakeY, keep)).toFixed(1),
		pitchRate: +((rms(pick(pitchRate, keep)) * 180) / Math.PI).toFixed(2),
		rollRate: +((rms(pick(rollRate, keep)) * 180) / Math.PI).toFixed(2),
		seatShake: +rms(pick(camA, keepFrames)).toFixed(3),
		seatShake99: +pct(pick(camA, keepFrames), 0.99).toFixed(2),
		seatWorst: +worst(pick(camA, keepFrames)).toFixed(1),
		seatTurn: +rms(pick(camRate, keepFrames)).toFixed(2),
		seatTurn99: +pct(pick(camRate, keepFrames), 0.99).toFixed(2),
	};
	table.push(row);
}
console.table(table);
console.log('bodyShake: up-and-down m/s² (rms), seatShake: the same at the eye, seatTurn: degrees per second of pitch and roll at the eye (rms)');

// The body's own worst jolts anywhere, in the air or not: what a hard knock in the seat would be.
const hard = ay.map((v, i) => ({ i, a: Math.abs(v - 0) })).filter(({ i }) => log[i].on > 0 && i > 240).sort((p, q) => q.a - p.a);
const picked = [];
for (const e of hard) {
	if (picked.some((q) => Math.abs(q.i - e.i) < 60)) continue;
	picked.push(e);
	if (picked.length >= 8) break;
}
for (const e of picked) {
	const r = log[e.i];
	console.log(`body ${e.a.toFixed(1)} m/s² at s ${r.s.toFixed(0)} m, ${r.surface}, ${(r.speed * 3.6).toFixed(0)} km/h, wheels on ${r.on}, travel left ${r.wheels.map((q) => q[1].toFixed(2)).join(' ')}, loads ${r.wheels.map((q) => q[2]).join(' ')}${r.wheels.some((q) => q[4]) ? ', BOTTOMED' : ''}`);
}

// The worst jolts on straights, with the road under each wheel.
const events = [];
for (const [k] of frames.entries()) {
	if (!steady(frames[k].r)) continue;
	events.push({ k, a: Math.abs(camA[k]) });
}
events.sort((p, q) => q.a - p.a);
const seen = [];
for (const e of events) {
	if (seen.some((q) => Math.abs(q.k - e.k) < 30)) continue;
	seen.push(e);
	if (seen.length >= 8) break;
}
for (const e of seen) {
	const f = frames[e.k];
	const i = f.i;
	const kinks = f.r.wheels.map((_, n) => {
		let most = 0;
		for (let j = Math.max(2, i - 4); j <= Math.min(log.length - 1, i + 4); j++) {
			const [a, b, c] = [log[j - 2], log[j - 1], log[j]].map((q) => q.wheels[n][0]);
			if (a !== null && b !== null && c !== null) most = Math.max(most, Math.abs(c - 2 * b + a));
		}
		return +(most * 1000).toFixed(1);
	});
	console.log(`s ${f.r.s.toFixed(0)} m, ${f.r.surface}, ${(f.r.speed * 3.6).toFixed(0)} km/h, eye ${e.a.toFixed(1)} m/s²; road kink under each wheel (mm per step²): ${kinks.join(' ')}; loads ${f.r.wheels.map((q) => q[2]).join(' ')}${f.r.wheels.some((q) => q[4]) ? ', bottomed' : ''}`);
}
