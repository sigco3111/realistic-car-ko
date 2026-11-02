// Writes the Car choice's pictures, thumbs/cars/<id>.webp, 112 x 112 (the block page draws them at 56 x 56), and candidate
// covers, shots/cover-<n>.png, captured from the demo in headless Chrome, muted.
//
//   npm run dev   (in another terminal), then: node make-thumbs.mjs [url, default http://127.0.0.1:5393/]
//
// Needs ffmpeg (with libwebp) on PATH.
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { chromium } from 'playwright';
import { guard } from 'file:///C:/Users/drini/Patch/seeds/no-pointer-lock.mjs';
import { cars } from './make-recipe.mjs';

guard(chromium);
const here = path.dirname(fileURLToPath(import.meta.url));
const url = process.argv[2] ?? 'http://127.0.0.1:5393/';
const out = path.join(here, 'thumbs', 'cars');
const shots = path.join(here, 'shots');
fs.mkdirSync(out, { recursive: true });
fs.mkdirSync(shots, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--ignore-gpu-blocklist', '--use-angle=d3d11'] });
const page = await browser.newPage({ viewport: { width: 448, height: 448 } });
await page.goto(url);
await page.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 60000 });
const noHud = '.hud { display: none !important; }';
await page.addStyleTag({ content: noHud });
for (const [id] of cars) {
	await page.evaluate((car) => {
		const a = window.__block.app;
		a.set('car', car);
		a.view.radiusMin = 13.5;
		a.view.radiusMax = 13.5;
		a.view.phi = 1.12;
		a.view.theta = -2.45;
		a.view.reset = () => {};
	}, id);
	await page.waitForTimeout(500);
	const png = path.join(out, `${id}.png`);
	await page.screenshot({ path: png });
	const webp = path.join(out, `${id}.webp`);
	execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', png, '-vf', 'scale=112:112:flags=lanczos', '-c:v', 'libwebp', '-quality', '86', webp]);
	fs.rmSync(png);
	console.log(`${id}: ${fs.statSync(webp).size} bytes`);
}

// The cover: the rally car, a mannequin in the air over the bonnet.
const cover = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await cover.goto(url);
await cover.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 60000 });
await cover.addStyleTag({ content: noHud });
await cover.evaluate(() => {
	const a = window.__block.app;
	const f = a.figures[0];
	a.view.radiusMin = 22;
	a.view.radiusMax = 30;
	a.view.zoom = 1;
	a.view.zoomSmoothed = 1;
	a.view.theta = Math.PI * 0.25 + 1.05;
	a.view.phi = 1.02;
	a.script = (car) => {
		const dx = f.home.position.x - car.position.x;
		const dz = f.home.position.z - car.position.z;
		let d = Math.atan2(dx, dz) - Math.atan2(car.forward.x, car.forward.z);
		if (d > Math.PI) d -= 2 * Math.PI;
		if (d < -Math.PI) d += 2 * Math.PI;
		return { throttle: 1, steer: f.falling ? 0 : Math.max(-1, Math.min(1, d * 4)), boost: 0, brake: 0, jump: 0 };
	};
});
await cover.waitForFunction(() => window.__block.app.figures[0].falling, null, { timeout: 8000 });
await cover.evaluate(() => {
	window.__block.app.values.slow = 0.9;
});
for (let i = 0; i < 6; i++) {
	await cover.waitForTimeout(300);
	await cover.screenshot({ path: path.join(shots, `cover-${i}.png`) });
}
await browser.close();
console.log('shots/cover-0..5.png');
