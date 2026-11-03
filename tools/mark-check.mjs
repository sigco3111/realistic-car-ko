// Tyre marks stay where they were laid. Slides, lets go, drives away and slides again, reading the marks' own geometry:
// no visible piece may be long enough to stretch between places, and a visible point may never move once laid.
//   node tools/mark-check.mjs <demo url> [out picture]
import { chromium } from 'playwright';
import { guard } from 'file:///C:/Users/drini/Patch/seeds/no-pointer-lock.mjs';

guard(chromium);
const url = process.argv[2];
const picture = process.argv[3];
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--ignore-gpu-blocklist', '--use-angle=d3d11'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
await page.goto(url);
await page.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 60000 });
await page.evaluate(() => {
	const a = window.__block.app;
	a.view.pitch = 0.9;
	a.view.zoom = 1.6;
	let t = 0;
	a.script = (car, dt) => {
		t = (t + dt) % 4.2;
		if (t < 1.6) return { throttle: 1, steer: 0, brake: 0, handbrake: 0 };
		if (t < 2.5) return { throttle: 1, steer: 1, brake: 0, handbrake: 1 };
		if (t < 3.3) return { throttle: 1, steer: -0.3, brake: 0, handbrake: 0 };
		return { throttle: 0, steer: 0, brake: 1, handbrake: 0 };
	};
});
// What's drawn right now: each ribbon's pieces with any opacity, and its points that show.
const read = () =>
	page.evaluate(() => {
		const out = { pieces: 0, longest: 0, long: 0, marks: 0, points: {} };
		const { marks } = window.__block.app.effects;
		for (const [surface, set] of Object.entries(marks)) {
			set.forEach((r, wheel) => {
				const p = r.position;
				const al = r.alpha;
				for (let i = 0; i < r.length - 1; i++) {
					const a = i * 2;
					const b = (i + 1) * 2;
					if (al[a] <= 0 && al[b] <= 0) continue;
					out.pieces++;
					const d = Math.hypot(p[a * 3] - p[b * 3], p[a * 3 + 2] - p[b * 3 + 2]);
					out.longest = Math.max(out.longest, d);
					if (d > 2) out.long++;
					if (al[a] > 0) out.points[`${surface}${wheel}:${i}`] = [+p[a * 3].toFixed(3), +p[a * 3 + 2].toFixed(3)];
				}
			});
		}
		return out;
	});
let long = 0;
let longest = 0;
let moved = 0;
let pieces = 0;
let before = null;
for (let i = 0; i < 90; i++) {
	await page.waitForTimeout(200);
	const now = await read();
	long = Math.max(long, now.long);
	longest = Math.max(longest, now.longest);
	pieces = Math.max(pieces, now.pieces);
	// A point can only change by being overwritten, which needs the whole strip to have come round.
	if (before) for (const [key, at] of Object.entries(before.points)) if (now.points[key] && (now.points[key][0] !== at[0] || now.points[key][1] !== at[1])) moved++;
	before = now;
}
if (picture) {
	await page.evaluate(() => {
		window.__block.app.script = () => ({ throttle: 0, steer: 0, brake: 1, handbrake: 0 });
	});
	await page.waitForTimeout(1500);
	await page.screenshot({ path: picture, type: 'jpeg', quality: 85 });
}
const ok = pieces > 50 && long === 0 && moved === 0 && !errors.length;
console.log(ok ? 'all passed' : 'FAILED', JSON.stringify({ pieces, long, longest: +longest.toFixed(1), moved, errors: errors.length }));
await browser.close();
process.exit(ok ? 0 : 1);
