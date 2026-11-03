// Plays hard for minutes in real Chrome with its own profile, muted: full speed into everything, every control, every car
// both ways, resets, flips. Logs slow frames, long tasks, lost contexts and errors.
//
//   node tools/stress.mjs <demo url> [seconds, default 240] [out dir]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright';
import { guard } from 'file:///C:/Users/drini/Patch/seeds/no-pointer-lock.mjs';

guard(chromium);
const url = process.argv[2];
const seconds = Number(process.argv[3] ?? 240);
const out = process.argv[4] ?? 'tools/out/stress';
fs.mkdirSync(out, { recursive: true });
const profile = fs.mkdtempSync(path.join(os.tmpdir(), 'car-stress-'));
const context = await chromium.launchPersistentContext(profile, { channel: 'chrome', headless: false, viewport: { width: 1600, height: 900 }, args: ['--mute-audio', '--disable-backgrounding-occluded-windows', '--disable-renderer-backgrounding', '--disable-background-timer-throttling', '--ignore-gpu-blocklist'] });
const page = context.pages()[0] ?? (await context.newPage());
const errors = [];
page.on('console', (m) => {
	if (m.type() === 'error' || /context lost/i.test(m.text())) errors.push(m.text().slice(0, 300));
});
page.on('pageerror', (e) => errors.push(e.message.slice(0, 300)));
await page.addInitScript(() => {
	window.__stress = { gaps: [], long: 0, longest: 0, lost: 0, hidden: 0 };
	document.addEventListener('visibilitychange', () => {
		if (document.hidden) window.__stress.hidden++;
	});
	new PerformanceObserver((list) => {
		for (const e of list.getEntries()) {
			window.__stress.long++;
			window.__stress.longest = Math.max(window.__stress.longest, e.duration);
		}
	}).observe({ entryTypes: ['longtask'] });
	document.addEventListener(
		'webglcontextlost',
		() => {
			window.__stress.lost++;
		},
		true,
	);
	let last = 0;
	const tick = (now) => {
		if (last) window.__stress.gaps.push(now - last);
		last = now;
		requestAnimationFrame(tick);
	};
	requestAnimationFrame(tick);
});
await page.goto(url);
await page.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 90000 });
console.log('ready after', await page.evaluate(() => Math.round(window.__block.times.ready)), 'ms');
await page.evaluate(() => {
	window.__stress.gaps.length = 0;
	window.__stress.long = 0;
	window.__stress.longest = 0;
});
await page.mouse.click(800, 450);
const rand = (a) => a[Math.floor(Math.random() * a.length)];
const cars = ['muscle', 'vireo', 'rally', 'pickup'];
const set = (id, value) => page.evaluate(([i, v]) => window.__block.app.set(i, v), [id, value]);
const started = Date.now();
let round = 0;
const held = new Set();
const press = async (k, on) => {
	if (on && !held.has(k)) {
		held.add(k);
		await page.keyboard.down(k);
	} else if (!on && held.has(k)) {
		held.delete(k);
		await page.keyboard.up(k);
	}
};
let maxBodies = 0;
let bad = 0;
while (Date.now() - started < seconds * 1000) {
	round++;
	// Drive like someone trying to break it for a few seconds: everything held and let go at random.
	const until = Date.now() + 2500 + Math.random() * 2500;
	await press('KeyW', true);
	while (Date.now() < until) {
		await press('KeyS', Math.random() < 0.08);
		await press('KeyA', Math.random() < 0.35);
		await press('KeyD', Math.random() < 0.35);
		await press('Space', Math.random() < 0.25);
		await page.waitForTimeout(160 + Math.random() * 260);
	}
	for (const k of [...held]) await press(k, false);
	// Then fiddle.
	const what = round % 6;
	if (what === 0) await set('car', rand(cars));
	if (what === 1) await set('grip', 0.4 + Math.random() * 1.2);
	if (what === 2) await set('assists', Math.random() < 0.5);
	if (what === 3) await set('slow', Math.random() < 0.5 ? 0 : 0.8);
	if (what === 4) await set('stiffness', 0.6 + Math.random() * 1.6);
	if (what === 5) await page.keyboard.press('KeyR');
	if (round % 3 === 0) await page.keyboard.press('KeyV');
	if (round % 4 === 0) await page.mouse.wheel(0, Math.random() < 0.5 ? 300 : -300);
	const state = await page.evaluate(() => {
		const a = window.__block.app;
		const c = a.car;
		return { y: c.position.y, x: c.position.x, z: c.position.z, up: c.up.y, bodies: a.world.bodies.len?.() ?? a.world.bodies.map?.size ?? 0, falling: a.figures.filter((f) => f.falling).length, flips: c.flips, finite: Number.isFinite(c.position.x + c.position.y + c.position.z) };
	});
	maxBodies = Math.max(maxBodies, state.bodies);
	if (!state.finite || Math.abs(state.y) > 200) bad++;
	if (round % 10 === 0) {
		console.log(`round ${round}, ${Math.round((Date.now() - started) / 1000)} s`, JSON.stringify(state));
		await page.screenshot({ path: `${out}/round-${round}.jpg`, type: 'jpeg', quality: 70 });
	}
}
const result = await page.evaluate(() => {
	const g = window.__stress.gaps;
	const sorted = [...g].sort((a, b) => a - b);
	return { hidden: window.__stress.hidden, frames: g.length, over100: g.filter((x) => x > 100).length, over50: g.filter((x) => x > 50).length, worst: Math.round(sorted[sorted.length - 1] ?? 0), p99: Math.round(sorted[Math.floor(sorted.length * 0.99)] ?? 0), median: Math.round(sorted[Math.floor(sorted.length / 2)] ?? 0), longTasks: window.__stress.long, longestTask: Math.round(window.__stress.longest), lost: window.__stress.lost, heapMB: Math.round((performance.memory?.usedJSHeapSize ?? 0) / 1048576), programs: window.__block.renderer.info.programs.length, geometries: window.__block.renderer.info.memory.geometries, textures: window.__block.renderer.info.memory.textures };
});
console.log(JSON.stringify({ rounds: round, bad, maxBodies, errors: errors.slice(0, 5), ...result }));
await context.close();
process.exit(bad || errors.length || result.lost ? 1 : 0);
