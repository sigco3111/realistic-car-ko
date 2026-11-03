// Does anything on the ground draw inside the car? Draws the car alone, to learn which pixels are solid car, then the car with the land,
// and counts the pixels of solid car the land has covered, from cameras inside the cabin and straight above it. Nothing in front of the
// glass can cover solid car from the seat, and nothing beside it from above, so any such pixel is something poking through.
// Parked on grass, driven through grass, and run up against every kind of thing that stands on the ground. Muted.
//   node tools/cabin-check.mjs <demo url> [out dir for pictures of the worst]
import fs from 'node:fs';
import { chromium } from 'playwright';
import { guard } from 'file:///C:/Users/drini/Patch/seeds/no-pointer-lock.mjs';

guard(chromium);
const [url, out] = process.argv.slice(2);
if (out) fs.mkdirSync(out, { recursive: true });
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--ignore-gpu-blocklist', '--use-angle=d3d11'] });
const page = await browser.newPage({ viewport: { width: 960, height: 540 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => { if (m.type() === 'error' || /context|lost|reload/i.test(m.text())) console.log('page says:', m.text().slice(0, 300)); });
page.on('framenavigated', (f) => console.log('navigated', f.url(), new Date().toISOString()));
page.on('crash', () => console.log('page crashed', new Date().toISOString()));
await page.goto(`${url}?map=stage`);
await page.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 90000 });
await page.evaluate(() => {
	const a = window.__block.app;
	a.set('view', 'driver');
	const { camera, scene, renderer, model } = a;
	const SIZE = 480;
	// three's own classes, borrowed from what the demo already has.
	let shadowMap = null;
	scene.traverse((o) => {
		if (o.isDirectionalLight && o.shadow?.map) shadowMap = o.shadow.map;
	});
	const THREE = { Vector3: camera.position.constructor, Color: scene.fog.color.constructor, Target: shadowMap.constructor };
	window.checkCamera = new camera.constructor(75, 1, 0.05, 400);
	window.covered = (name) => {
		const rt = (window.rt ??= new THREE.Target(SIZE, SIZE));
		const o = model.object;
		const glass = [...model.glass];
		const looks = [];
		const eye = camera.position.clone();
		const at = (x, y, z) => o.localToWorld(new THREE.Vector3(x, y, z));
		// From the seat: ahead, the footwells, the shifter, across, behind. From above, looking straight down.
		for (const [x, y, z] of [[0, 0.7, 2], [0.35, 0.15, 0.7], [-0.35, 0.15, 0.7], [0, 0.2, 0.1], [-0.7, 0.3, -0.4], [0, 0.4, -1.5], [0.7, 0.2, -0.3]]) looks.push([eye, at(x, y, z)]);
		// From above and wide, seeing nothing higher than the roof: boughs over the car are fine, and what's beside it can't hide it from there.
		const over = o.position.clone();
		over.y += 2.2;
		looks.push([over, o.position.clone()]);
		const shadows = renderer.shadowMap.autoUpdate;
		renderer.shadowMap.autoUpdate = false;
		const background = scene.background;
		scene.background = null;
		for (const m of glass) m.visible = false;
		const visible = scene.children.map((c) => c.visible);
		const land = a.land.group;
		const cam = window.checkCamera;
		let total = 0;
		let worst = 0;
		const views = [];
		const clear = new THREE.Color();
		renderer.getClearColor(clear);
		const alpha = renderer.getClearAlpha();
		renderer.setClearColor(0x000000, 0);
		const A = new Uint8Array(SIZE * SIZE * 4);
		const B = new Uint8Array(SIZE * SIZE * 4);
		looks.forEach(([from, to], i) => {
			cam.position.copy(from);
			cam.up.set(0, 1, 0);
			if (i === looks.length - 1) cam.up.set(0, 0, 1);
			cam.fov = i === looks.length - 1 ? 110 : 75;
			cam.near = i === looks.length - 1 ? 0.75 : 0.05;
			cam.far = 400;
			cam.aspect = 1;
			cam.lookAt(to);
			cam.updateProjectionMatrix();
			cam.updateMatrixWorld();
			scene.children.forEach((c) => (c.visible = c === o || (c.isLight ?? false)));
			renderer.setRenderTarget(rt);
			renderer.clear();
			renderer.render(scene, cam);
			renderer.readRenderTargetPixels(rt, 0, 0, SIZE, SIZE, A);
			scene.children.forEach((c) => (c.visible = c === o || c === land || (c.isLight ?? false)));
			renderer.clear();
			renderer.render(scene, cam);
			renderer.readRenderTargetPixels(rt, 0, 0, SIZE, SIZE, B);
			let n = 0;
			for (let p = 0; p < A.length; p += 4) {
				if (A[p + 3] < 250) continue;
				if (Math.abs(A[p] - B[p]) + Math.abs(A[p + 1] - B[p + 1]) + Math.abs(A[p + 2] - B[p + 2]) > 14) n++;
			}
			total += n;
			worst = Math.max(worst, n);
			views.push(n);
			if (n > 40 && window.keepWorst && n > (window.keepWorst.n ?? 0)) window.keepWorst = { n, view: i, name, data: B.slice(), size: SIZE };
		});
		renderer.setRenderTarget(null);
		renderer.setClearColor(clear, alpha);
		scene.children.forEach((c, i) => (c.visible = visible[i]));
		scene.background = background;
		for (const m of glass) m.visible = true;
		renderer.shadowMap.autoUpdate = shadows;
		return { name, pixels: total, worst, seat: views.slice(0, -1).reduce((x, y) => x + y, 0), above: views[views.length - 1] };
	};
});
// Spots on deep grass, at random headings.
const results = [];
const saveWorst = async (name) => {
	if (!out) return;
	const png = await page.evaluate(() => {
		const k = window.keepWorst;
		window.keepWorst = {};
		if (!k?.data) return null;
		const c = document.createElement('canvas');
		c.width = c.height = k.size;
		const g = c.getContext('2d');
		const image = g.createImageData(k.size, k.size);
		for (let y = 0; y < k.size; y++) for (let x = 0; x < k.size * 4; x++) image.data[(k.size - 1 - y) * k.size * 4 + x] = x % 4 === 3 ? 255 : Math.min(255, 255 * Math.pow(k.data[y * k.size * 4 + x] / 255, 1 / 2.2));
		g.putImageData(image, 0, 0);
		return { url: c.toDataURL('image/png'), name: k.name, view: k.view, n: k.n };
	});
	if (!png) return;
	fs.writeFileSync(`${out}/worst-${name}.png`, Buffer.from(png.url.split(',')[1], 'base64'));
	console.log(`  worst ${name}: ${png.name}, view ${png.view}, ${png.n} pixels`);
};
await page.evaluate(() => { window.keepWorst = {}; });
const spots = await page.evaluate(() => {
	const a = window.__block.app;
	const shape = a.stage.shape;
	let s = 777;
	const rnd = () => ((s = (s * 1664525 + 1013904223) >>> 0) / 4294967296);
	const out = [];
	for (let i = 0; i < 4000 && out.length < 14; i++) {
		const x = (rnd() - 0.5) * 900;
		const z = (rnd() - 0.5) * 900;
		if (shape.inYard(x, z) || shape.surfaceAt(x, z) !== 'grass' || shape.distanceAt(x, z) < 8 || shape.slopeAt(x, z) > 0.14) continue;
		out.push({ x, z, yaw: rnd() * 6.28 });
	}
	return out;
});
const frames = (n) => page.evaluate((count) => new Promise((go) => { let i = 0; const f = () => (++i >= count ? go() : requestAnimationFrame(f)); requestAnimationFrame(f); }), n);
const placeAt = (spot) =>
	page.evaluate((p) => {
		const a = window.__block.app;
		a.script = () => ({ throttle: 0, steer: 0, brake: 0, handbrake: 0 });
		a.car.moveTo({ x: p.x, y: a.stage.shape.heightAt(p.x, p.z) + 0.15, z: p.z }, p.yaw);
	}, spot);
let parked = 0;
for (const [i, spot] of (process.env.INTO_ONLY ? [] : spots).entries()) {
	await placeAt(spot);
	await frames(30);
	await page.waitForTimeout(600);
	const r = await page.evaluate((n) => window.covered(n), `parked ${i}`);
	results.push(r);
	parked += r.pixels;
}
await saveWorst('parked');
console.log(`parked on grass, ${spots.length} spots: ${parked} pixels, worst ${Math.max(...results.map((r) => r.pixels))}`);

// Driving through it, flat out across the meadow, sampled as it goes.
const driving = [];
for (const [i, spot] of (process.env.INTO_ONLY ? [] : spots.slice(0, 5)).entries()) {
	await placeAt(spot);
	await frames(30);
	await page.evaluate(() => {
		const a = window.__block.app;
		let t = 0;
		a.script = (car, dt) => {
			t += dt;
			return { throttle: 1, steer: Math.sin(t * 0.8) * 0.25, brake: 0, handbrake: 0 };
		};
	});
	for (let k = 0; k < 8; k++) {
		await page.waitForTimeout(350);
		const r = await page.evaluate((n) => { const q = window.covered(n); q.speed = window.__block.app.car.speed; q.surface = window.__block.app.car.wheels[2].surface; return q; }, `driving ${i}.${k}`);
		driving.push(r);
	}
}
await saveWorst('driving');
const onGrass = driving.filter((r) => r.surface === 'grass');
console.log(`driving through grass, ${driving.length} samples (${onGrass.length} on grass, top ${(Math.max(...driving.map((r) => r.speed)) * 3.6).toFixed(0)} km/h): ${driving.reduce((n, r) => n + r.pixels, 0)} pixels, worst ${Math.max(...driving.map((r) => r.pixels))}`);

// Run up against each kind of thing, if the build says where they are.
const standing = await page.evaluate(() => window.__block.app.stage.standing?.());
if (standing) {
	for (const [kind, places] of Object.entries(standing)) {
		let total = 0;
		let seatTotal = 0;
		let worst = 0;
		let reached = 0;
		for (const [i, p] of places.slice(0, 10).entries()) {
			const yaw = i * 1.7;
			const back = 5.5;
			await placeAt({ x: p.x - Math.sin(yaw) * back, z: p.z - Math.cos(yaw) * back, yaw });
			// The land nearby takes a few frames to come to full detail after a jump this far.
			await frames(30);
			await page.evaluate(() => {
				window.__block.app.script = () => ({ throttle: 0.5, steer: 0, brake: 0, handbrake: 0 });
			});
			const distance = () => page.evaluate((q) => { const c = window.__block.app.car.position; return Math.hypot(c.x - q.x, c.z - q.z); }, p);
			for (let k = 0; k < 40 && (await distance()) > 3.2; k++) await page.waitForTimeout(50);
			let peak = 0;
			let seat = 0;
			for (let k = 0; k < 7; k++) {
				await page.waitForTimeout(120);
				const r = await page.evaluate((n) => window.covered(n), `${kind} ${i}.${k}`);
				peak = Math.max(peak, r.pixels);
				seat = Math.max(seat, r.seat);
			}
			if ((await distance()) < 3.6) reached++;
			total += peak;
			seatTotal += seat;
			worst = Math.max(worst, peak);
		}
		await saveWorst(kind);
		console.log(`into ${kind}, ${Math.min(10, places.length)} runs, ${reached} reached: ${total} pixels (${seatTotal} from the seat), worst ${worst}`);
	}
}
console.log('errors', errors.length, errors.slice(0, 2).join(' | '));
await browser.close();
