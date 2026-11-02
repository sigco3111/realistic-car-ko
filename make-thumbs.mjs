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
		a.view.yawOffset = Math.PI - 0.75;
		a.view.pitch = 0.3;
		a.view.zoom = 0.72;
	}, id);
	await page.waitForTimeout(500);
	const png = path.join(out, `${id}.png`);
	await page.screenshot({ path: png });
	const webp = path.join(out, `${id}.webp`);
	execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', png, '-vf', 'scale=112:112:flags=lanczos', '-c:v', 'libwebp', '-quality', '86', webp]);
	fs.rmSync(png);
	console.log(`${id}: ${fs.statSync(webp).size} bytes`);
}

// The cover: the rally car thrown sideways on the gravel, on its springs, throwing dust.
const cover = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await cover.goto(url);
await cover.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 60000 });
await cover.addStyleTag({ content: noHud });
await cover.evaluate(() => {
	const a = window.__block.app;
	let t = 0;
	a.view.pitch = 0.24;
	a.view.zoom = 0.9;
	a.script = (car, dt) => {
		t += dt;
		if (t < 2.2) return { throttle: 1, steer: 0, brake: 0, handbrake: 0 };
		if (t < 2.8) return { throttle: 1, steer: -1, brake: 0, handbrake: 0 };
		return { throttle: 1, steer: 1, brake: 0, handbrake: t < 3.5 ? 1 : 0 };
	};
});
await cover.waitForTimeout(3100);
await cover.evaluate(() => {
	window.__block.app.values.slow = 0.8;
	window.__block.app.view.yawOffset = 0.9;
});
for (let i = 0; i < 6; i++) {
	await cover.waitForTimeout(450);
	await cover.screenshot({ path: path.join(shots, `cover-${i}.png`) });
}
await browser.close();
console.log('shots/cover-0..5.png');
