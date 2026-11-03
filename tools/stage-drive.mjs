// Laps the rally stage on autopilot, in fast-forward, and looks for what a driver would hit: the solid land not matching the drawn land,
// the road going under, getting stuck, rolling over. With a third argument, also takes pictures along the way, outside and from the seat.
//   node tools/stage-drive.mjs <demo url> [car] [out dir]
import fs from 'node:fs';
import { chromium } from 'playwright';
import { guard } from 'file:///C:/Users/drini/Patch/seeds/no-pointer-lock.mjs';

guard(chromium);
const [url, carId = 'vireo', out] = process.argv.slice(2);
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--ignore-gpu-blocklist', '--use-angle=d3d11'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
	if (m.type() === 'error') errors.push(m.text());
});
const started = Date.now();
await page.goto(`${url}?car=${carId}`);
await page.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 90000 });
console.log('ready', await page.evaluate(() => { const a = window.__block.app; const i = a.renderer.info; return JSON.stringify({ ready: Math.round(window.__block.times.ready), map: a.values.map, calls: i.render.calls, tris: i.render.triangles, textures: i.memory.textures, geometries: i.memory.geometries, programs: i.programs.length, forest: a.stage.count }); }), `wall ${Date.now() - started} ms`);

// Does the solid land match the drawn land?
console.log('probe', await page.evaluate(() => {
	const a = window.__block.app;
	const R = a.RAPIER;
	const shape = a.stage.shape;
	let s = 12345;
	const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
	let worst = 0;
	let worstRoad = 0;
	let n = 0;
	let miss = 0;
	for (let i = 0; i < 1500; i++) {
		const x = (rnd() - 0.5) * 1900;
		const z = (rnd() - 0.5) * 1900;
		if (shape.inYard(x, z) || shape.distanceAt(x, z) < 16) continue;
		const hit = a.world.castRay(new R.Ray({ x, y: 300, z }, { x: 0, y: -1, z: 0 }), 700, true);
		if (!hit) { miss++; continue; }
		const y = 300 - hit.timeOfImpact;
		// Trunks are solid too: only count hits close to the land.
		const d = Math.abs(y - shape.heightAt(x, z));
		if (d < 2.5) worst = Math.max(worst, d);
		n++;
	}
	for (const p of shape.road.points.filter((_, i) => i % 3 === 0)) {
		const hit = a.world.castRay(new R.Ray({ x: p.x, y: p.y + 30, z: p.z }, { x: 0, y: -1, z: 0 }), 60, true);
		if (hit) worstRoad = Math.max(worstRoad, Math.abs(p.y + 30 - hit.timeOfImpact - p.y));
		else miss++;
	}
	return JSON.stringify({ samples: n, miss, worstLand: +worst.toFixed(2), worstRoad: +worstRoad.toFixed(2) });
}));

// A lap, by steering at a point ahead on the road, slowing for what's coming.
const lap = await page.evaluate(() => {
	const a = window.__block.app;
	const car = a.car;
	const road = a.stage.shape.road.points;
	const hold = a.hold;
	a.hold = true;
	let at = 0;
	let time = 0;
	const stats = { time: 0, top: 0, airborne: 0, longestAir: 0, air: 0, flips: 0, stuckAt: null, finished: false, lowest: 1e9, offRoad: 0, worstSlide: 0, tarmac: 0, gravel: 0, grass: 0, maxBump: 0 };
	car.moveTo({ x: road[0].x, y: road[0].y + 0.3, z: road[0].z }, Math.atan2(road[0].dx, road[0].dz));
	let still = 0;
	const STEP = 1 / 120;
	a.script = () => {
		const p = car.position;
		// Where it is on the road: look a little forward from the last place.
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
		if (bestD > road[at].half + 1) stats.offRoad++;
		const speed = Math.max(car.forwardSpeed, 3);
		const look = Math.min(road.length - 1, at + Math.round(4 + speed * 0.42));
		const t = road[look];
		const want = Math.atan2(t.x - p.x, t.z - p.z);
		const head = Math.atan2(car.forward.x, car.forward.z);
		let diff = want - head;
		while (diff > Math.PI) diff -= 2 * Math.PI;
		while (diff < -Math.PI) diff += 2 * Math.PI;
		let tightest = 0;
		for (let i = at; i < Math.min(road.length, at + 40 + Math.round(speed)); i += 2) tightest = Math.max(tightest, Math.abs(road[i].bend));
		const safe = Math.min(70, Math.sqrt(0.72 * 9.81 / Math.max(tightest, 0.001)));
		return { throttle: speed < safe ? 1 : 0, brake: speed > safe + 2 ? 1 : 0, steer: Math.max(-1, Math.min(1, diff * 2.4)), handbrake: 0 };
	};
	for (let i = 0; i < 120 * 420; i++) {
		a.stepWorld();
		time += STEP;
		stats.top = Math.max(stats.top, car.speed);
		if (car.wheelsOnGround === 0) {
			stats.air += STEP;
			stats.longestAir = Math.max(stats.longestAir, stats.air);
		} else stats.air = 0;
		for (const w of car.wheels) stats.maxBump = Math.max(stats.maxBump, w.travelled ?? 0);
		const surf = car.wheels[2].surface;
		if (stats[surf] !== undefined && car.wheels[2].inContact) stats[surf] += STEP;
		still = car.speed < 1 ? still + STEP : 0;
		if (still > 6) {
			stats.stuckAt = { at, s: Math.round(road[at].s), x: Math.round(car.position.x), z: Math.round(car.position.z), y: +car.position.y.toFixed(1) };
			break;
		}
		if (at >= road.length - 12) {
			stats.finished = true;
			break;
		}
	}
	stats.flips = car.flips;
	stats.time = +time.toFixed(1);
	stats.top = Math.round(stats.top * 3.6);
	stats.longestAir = +stats.longestAir.toFixed(2);
	stats.offRoad = +(stats.offRoad * STEP).toFixed(1);
	stats.tarmac = +stats.tarmac.toFixed(0);
	stats.gravel = +stats.gravel.toFixed(0);
	stats.grass = +stats.grass.toFixed(0);
	stats.maxBump = +stats.maxBump.toFixed(2);
	delete stats.air;
	delete stats.airborne;
	delete stats.lowest;
	delete stats.worstSlide;
	a.script = null;
	a.hold = hold;
	return stats;
});
console.log('lap', JSON.stringify(lap));

if (out) {
	fs.mkdirSync(out, { recursive: true });
	const spots = await page.evaluate(() => {
		const road = window.__block.app.stage.shape.road.points;
		return [0.02, 0.1, 0.17, 0.24, 0.31, 0.38, 0.46, 0.52, 0.6, 0.68, 0.76, 0.84, 0.92].map((f) => Math.floor(f * road.length));
	});
	let n = 0;
	for (const i of spots) {
		await page.evaluate((k) => {
			const a = window.__block.app;
			a.reset();
			const p = a.stage.shape.road.points[k];
			a.car.moveTo({ x: p.x, y: p.y + 0.25, z: p.z }, Math.atan2(p.dx, p.dz));
			a.model.snap?.();
			a.view.jump?.(a.car);
		}, i);
		await page.waitForTimeout(900);
		const tag = String(n++).padStart(2, '0');
		await page.screenshot({ path: `${out}/${tag}-chase.jpg`, type: 'jpeg', quality: 82 });
		await page.keyboard.press('KeyV');
		await page.evaluate(() => window.__block.app.set('view', 'driver'));
		await page.waitForTimeout(500);
		await page.screenshot({ path: `${out}/${tag}-seat.jpg`, type: 'jpeg', quality: 82 });
		await page.evaluate(() => window.__block.app.set('view', 'chase'));
	}
	await page.evaluate(() => {
		const a = window.__block.app;
		a.reset();
		a.view.pitch = 1.15;
		a.view.zoom = 3.5;
	});
	await page.waitForTimeout(1800);
	await page.screenshot({ path: `${out}/zz-plain.jpg`, type: 'jpeg', quality: 82 });
}
console.log('errors', errors.length, errors.slice(0, 3).join(' | ').slice(0, 400));
await browser.close();
