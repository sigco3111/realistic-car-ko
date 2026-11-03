// What the rally stage asks of a graphics card, in the full and the light build, round the whole road and from both views: triangles, draw
// calls, and how long the GPU spends on a frame. And how long a first load takes with a new profile and the processor slowed down.
// This measures the load, on whatever card this machine has: it doesn't stand in for playing on a laptop. Muted.
//   node tools/laptop-check.mjs <demo url> [cpu slowdown for the load, default 4] [width, default 1366] [height, default 768]
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { chromium } from 'playwright';
import { guard } from 'file:///C:/Users/drini/Patch/seeds/no-pointer-lock.mjs';

guard(chromium);
const [url, slowdown = '4', width = '1366', height = '768'] = process.argv.slice(2);
const percentile = (a, p) => [...a].sort((x, y) => x - y)[Math.min(a.length - 1, Math.floor(a.length * p))];

async function firstLoad(query, rate) {
	const dir = fs.mkdtempSync(path.join(os.tmpdir(), 'car-laptop-'));
	const context = await chromium.launchPersistentContext(dir, { channel: 'chrome', headless: true, viewport: { width: +width, height: +height }, args: ['--mute-audio', '--ignore-gpu-blocklist', '--use-angle=d3d11'] });
	const page = context.pages()[0] ?? (await context.newPage());
	const cdp = await context.newCDPSession(page);
	await cdp.send('Emulation.setCPUThrottlingRate', { rate });
	await page.goto(`${url}?${query}`);
	await page.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 180000 });
	const ready = await page.evaluate(() => Math.round(window.__block.times.ready));
	await context.close();
	fs.rmSync(dir, { recursive: true, force: true });
	return ready;
}

async function load(query, lowered = false) {
	const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--ignore-gpu-blocklist', '--use-angle=d3d11'] });
	// As low as a card that can't keep up goes: three quarters of the pixels, a smaller shadow drawn every other frame, half the grass.
	const page = await browser.newPage({ viewport: lowered ? { width: Math.round(+width * 0.75), height: Math.round(+height * 0.75) } : { width: +width, height: +height } });
	await page.goto(`${url}?${query}`);
	await page.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 90000 });
	if (lowered) await page.evaluate(() => window.__block.app.lowest());
	const timer = await page.evaluate(() => {
		const a = window.__block.app;
		const gl = a.renderer.getContext();
		const ext = gl.getExtension('EXT_disjoint_timer_query_webgl2');
		window.gpu = [];
		if (!ext) return false;
		const render = a.renderer.render.bind(a.renderer);
		const waiting = [];
		a.renderer.render = (scene, camera) => {
			const q = gl.createQuery();
			gl.beginQuery(ext.TIME_ELAPSED_EXT, q);
			render(scene, camera);
			gl.endQuery(ext.TIME_ELAPSED_EXT);
			waiting.push(q);
			while (waiting.length && gl.getQueryParameter(waiting[0], gl.QUERY_RESULT_AVAILABLE)) {
				const done = waiting.shift();
				if (!gl.getParameter(ext.GPU_DISJOINT_EXT)) window.gpu.push(gl.getQueryParameter(done, gl.QUERY_RESULT) / 1e6);
				gl.deleteQuery(done);
			}
		};
		return true;
	});
	const stops = await page.evaluate(() => window.__block.app.stage.shape.road.points.filter((_, i) => i % 75 === 0).map((p) => ({ x: p.x, y: p.y, z: p.z, yaw: Math.atan2(p.dx, p.dz) })));
	const out = {};
	for (const view of ['chase', 'driver']) {
		await page.evaluate((v) => {
			const a = window.__block.app;
			a.script = () => ({ throttle: 0, steer: 0, brake: 1, handbrake: 0 });
			a.set('view', v);
		}, view);
		const samples = [];
		for (const stop of stops) {
			await page.evaluate((s) => {
				const a = window.__block.app;
				a.car.moveTo({ x: s.x, y: s.y + 0.1, z: s.z }, s.yaw);
				a.view.jump?.(a.car);
				window.gpu.length = 0;
			}, stop);
			await page.waitForTimeout(700);
			samples.push(await page.evaluate(() => {
				const a = window.__block.app;
				const i = a.renderer.info.render;
				return { tris: i.triangles, calls: i.calls, gpu: window.gpu.slice(-15) };
			}));
		}
		const gpu = samples.flatMap((s) => s.gpu);
		out[view] = {
			trisPeak: Math.max(...samples.map((s) => s.tris)),
			trisMedian: percentile(samples.map((s) => s.tris), 0.5),
			callsPeak: Math.max(...samples.map((s) => s.calls)),
			gpuMedian: gpu.length ? +percentile(gpu, 0.5).toFixed(2) : null,
			gpu95: gpu.length ? +percentile(gpu, 0.95).toFixed(2) : null,
			gpuWorst: gpu.length ? +Math.max(...gpu).toFixed(2) : null,
		};
	}
	const memory = await page.evaluate(() => {
		const m = window.__block.app.renderer.info.memory;
		return { textures: m.textures, geometries: m.geometries };
	});
	await browser.close();
	return { timer, memory, ...out };
}

const rate = Number(slowdown);
for (const [name, query] of [['full', 'map=stage'], ['light', 'map=stage&light']]) {
	console.log(name, JSON.stringify(await load(query)));
	console.log(name, `first load: ${await firstLoad(query, 1)} ms; processor slowed 2 times: ${await firstLoad(query, 2)} ms; ${rate} times: ${await firstLoad(query, rate)} ms`);
}
console.log('light, lowered', JSON.stringify(await load('map=stage&light', true)));
