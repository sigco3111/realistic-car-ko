// Plays the demo in a cross-origin frame with real keys and only patch-block messages, the way the block page does:
//   node tools/play-check.mjs [demo folder, default dist] [--shots dir]
// Serves the folder on one port and a harness page on another. Muted. Prints each check, and exits 1 if any fail.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import { chromium } from 'playwright';
import { guard } from 'file:///C:/Users/drini/Patch/seeds/no-pointer-lock.mjs';

guard(chromium);
const root = path.resolve(process.argv[2] && !process.argv[2].startsWith('--') ? process.argv[2] : 'dist');
const shotsAt = process.argv.indexOf('--shots');
const shots = shotsAt > 0 ? process.argv[shotsAt + 1] : null;
if (shots) fs.mkdirSync(shots, { recursive: true });
const TYPES = { '.html': 'text/html', '.js': 'text/javascript', '.glb': 'model/gltf-binary', '.ogg': 'audio/ogg', '.webp': 'image/webp', '.json': 'application/json' };
const demo = http.createServer((req, res) => {
	const p = path.join(root, decodeURIComponent(req.url.split('?')[0]));
	const file = p.endsWith(path.sep) || p === root ? path.join(root, 'index.html') : p;
	if (!fs.existsSync(file)) {
		res.writeHead(404).end();
		return;
	}
	res.writeHead(200, { 'content-type': TYPES[path.extname(file)] ?? 'application/octet-stream' });
	fs.createReadStream(file).pipe(res);
});
await new Promise((go) => demo.listen(0, '127.0.0.1', go));
const demoUrl = `http://127.0.0.1:${demo.address().port}/`;
const harness = http.createServer((req, res) => {
	res.writeHead(200, { 'content-type': 'text/html' });
	res.end(`<!doctype html><body style="margin:0"><iframe id="f" src="${demoUrl}" style="border:0;width:1280px;height:720px" allow="autoplay"></iframe><script>
		window.got = { state: null, ready: false, progress: [] };
		const frame = document.getElementById('f');
		addEventListener('message', (e) => {
			const m = e.data; if (m?.channel !== 'patch-block') return;
			if (m.type === 'state') window.got.state = m.values;
			if (m.type === 'ready') window.got.ready = true;
			if (m.type === 'progress') window.got.progress.push(m.value);
			if (m.type === 'stats') window.got.stats = m;
		});
		window.tell = (m) => frame.contentWindow.postMessage({ channel: 'patch-block', ...m }, '*');
		setInterval(() => window.tell({ type: 'hello' }), 300);
	</script>`);
});
await new Promise((go) => harness.listen(0, 'localhost', go));

const recipe = JSON.parse(fs.readFileSync('recipe.json', 'utf8')).block;
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--ignore-gpu-blocklist', '--use-angle=d3d11', '--disable-features=IsolateOrigins,site-per-process'] });
const page = await browser.newPage({ viewport: { width: 1280, height: 720 } });
const errors = [];
const outside = [];
page.on('console', (m) => {
	if (m.type() === 'error') errors.push(m.text().slice(0, 300));
});
page.on('pageerror', (e) => errors.push(e.message.slice(0, 300)));
page.on('request', (r) => {
	const u = r.url();
	if (!u.startsWith('data:') && !u.startsWith('blob:') && !u.includes('127.0.0.1') && !u.includes('localhost')) outside.push(u);
});
await page.goto(`http://localhost:${harness.address().port}/`);
await page.waitForFunction(() => window.got.ready, null, { timeout: 45000 });
const frame = page.frames().find((f) => f.url().startsWith(demoUrl));
let failed = 0;
const check = (name, ok, detail = '') => {
	console.log(`${ok ? 'ok  ' : 'FAIL'} ${name}${detail ? `  (${detail})` : ''}`);
	if (!ok) failed++;
};
const read = () =>
	frame.evaluate(() => {
		const a = window.__block.app;
		const c = a.car;
		return { x: c.position.x, y: c.position.y, z: c.position.z, speed: c.speed, up: c.up.y, wheels: c.wheelsOnGround, flips: c.flips, falling: a.figures.filter((f) => f.falling).length, values: { ...a.values }, yawOffset: a.view.yawOffset, zoom: a.view.zoom, mass: c.tune.mass, length: c.size.length,  renderer: a.renderer.info.programs.length };
	});
const wait = (ms) => page.waitForTimeout(ms);
const shot = async (name) => {
	if (shots) await page.screenshot({ path: path.join(shots, `${name}.jpg`), type: 'jpeg', quality: 76 });
};

// Progress came, and ready came with every control at its default.
check('ready, and the first state has every control at its default', recipe.controls.every((c) => page && true));
const first = await page.evaluate(() => window.got.state);
check('state after ready', recipe.controls.every((c) => first[c.id] === c.default), JSON.stringify(first));
check('progress reported', (await page.evaluate(() => window.got.progress.length)) > 0);

// Asleep until clicked; the click takes the keyboard and doesn't move the car.
const before = await read();
await page.mouse.click(640, 360);
await wait(300);
const after = await read();
check('first click moves nothing', Math.hypot(after.x - before.x, after.z - before.z) < 0.05);
await page.keyboard.down('KeyW');
await wait(1000);
const going = await read();
check('W drives', going.speed > 6, `${going.speed.toFixed(1)} m/s after 1 s`);
await page.keyboard.up('KeyW');
await page.keyboard.down('KeyS');
await page.waitForFunction(() => true);
await wait(900);
const braked = await read();
await page.keyboard.up('KeyS');
check('S brakes it', braked.speed < 6, `${braked.speed.toFixed(1)} m/s`);
await wait(500);
const stopped = await read();
await page.keyboard.down('KeyA');
await page.keyboard.down('KeyW');
await wait(900);
const turned = await read();
await page.keyboard.up('KeyA');
await page.keyboard.up('KeyW');
check('A turns while driving', Math.hypot(turned.x - stopped.x, turned.z - stopped.z) > 1.5);
const letGo = await read();
await wait(2500);
const coasting = await read();
check('letting go, it slows by itself', coasting.speed < Math.max(1, letGo.speed * 0.8), `${letGo.speed.toFixed(1)} to ${coasting.speed.toFixed(1)} m/s`);
await page.keyboard.down('KeyW');
await wait(1500);
await page.keyboard.down('Space');
await wait(120);
const spaceHolds = await frame.evaluate(() => window.__block.app.car.input.handbrake);
check('Space is the handbrake', spaceHolds === 1, `input ${spaceHolds}`);
await page.keyboard.up('Space');
await page.keyboard.up('KeyW');
// How far it slides, from a clean start and in the game's own time, so neither where the steps above left the car nor a
// busy machine changes the answer. The same start gives the same slide every time.
await page.evaluate(() => window.tell({ type: 'trigger', id: 'reset' }));
await wait(300);
const sliding = await frame.evaluate(
	() =>
		new Promise((done) => {
			const a = window.__block.app;
			const out = { spin: 99, side: 0, speed: 0 };
			let t = 0;
			a.script = (car, dt) => {
				t += dt;
				if (t < 1.6) return { throttle: 1, steer: 0, brake: 0, handbrake: 0 };
				if (!out.speed) out.speed = car.speed;
				out.side = Math.max(out.side, Math.abs(car.sideSpeed));
				if (t > 1.9) out.spin = Math.min(out.spin, Math.abs(car.wheels[2].spin));
				if (t >= 2.6) {
					a.script = null;
					done(out);
				}
				return { throttle: 1, steer: 1, brake: 0, handbrake: 1 };
			};
		}),
);
check('The handbrake locks the rear wheels and slides it', sliding.spin < 1 && sliding.side > 3, `rear spin ${sliding.spin.toFixed(1)}, peak sideways ${sliding.side.toFixed(1)} m/s, from ${sliding.speed.toFixed(1)} m/s`);
await shot('handbrake');
await wait(2500);
await page.keyboard.down('KeyS');
await wait(1500);
const backing = await frame.evaluate(() => {
	const c = window.__block.app.car;
	return { gear: c.gear, forward: c.forwardSpeed };
});
await page.keyboard.up('KeyS');
check('S from a stop reverses', backing.gear === -1 && backing.forward < -0.3, `gear ${backing.gear}, ${backing.forward.toFixed(1)} m/s`);

// Reset
await page.evaluate(() => window.tell({ type: 'trigger', id: 'reset' }));
await wait(500);
const reset1 = await read();
check('Reset puts the car home', Math.hypot(reset1.x, reset1.z) < 0.5, `${reset1.x.toFixed(2)}, ${reset1.z.toFixed(2)}`);

// Every number control at both ends, sent as the page does. Then drive a bit at each, and look for anything off.
for (const c of recipe.controls) {
	if (c.type !== 'number') continue;
	for (const value of [c.min, c.max]) {
		await page.evaluate(([id, v]) => window.tell({ type: 'set', id, value: v }), [c.id, value]);
		await page.mouse.click(640, 360);
		await page.keyboard.down('KeyW');
		await page.keyboard.down('KeyD');
		await wait(700);
		await page.keyboard.up('KeyD');
		await page.keyboard.up('KeyW');
		const r = await read();
		check(`${c.id} = ${value}`, r.values[c.id] === value && Number.isFinite(r.x) && Number.isFinite(r.y), `speed ${r.speed.toFixed(1)}, y ${r.y.toFixed(2)}, up ${r.up.toFixed(2)}`);
		await shot(`${c.id}-${value}`);
		await page.evaluate(() => window.tell({ type: 'trigger', id: 'reset' }));
		await wait(150);
	}
}

// The car choice, every way round.
const cars = recipe.controls.find((c) => c.id === 'car').options.map((o) => o.value);
const programs0 = (await read()).renderer;
for (const a of cars)
	for (const b of cars) {
		if (a === b) continue;
		await page.evaluate((v) => window.tell({ type: 'set', id: 'car', value: v }), a);
		await wait(120);
		await page.evaluate((v) => window.tell({ type: 'set', id: 'car', value: v }), b);
		await wait(250);
		const r = await read();
		const home = Math.hypot(r.x, r.z) < 0.5 && r.wheels === 4 && r.up > 0.99;
		check(`${a} to ${b}`, r.values.car === b && home, `length ${r.length.toFixed(2)}, y ${r.y.toFixed(3)}`);
	}
check('switching cars compiles nothing new', (await read()).renderer === programs0, `${programs0} programs`);
await page.evaluate(() => window.tell({ type: 'trigger', id: 'reset' }));
await wait(300);

// Upside down: on its roof with no one touching it, it rights itself.
await frame.evaluate(() => {
	const a = window.__block.app;
	a.car.body.setTranslation({ x: 0, y: 2.5, z: 0 }, true);
	a.car.body.setRotation({ x: 0, y: 0, z: 1, w: 0 }, true);
});
await wait(5600);
const righted = await read();
check('on its roof, it rights itself', righted.up > 0.95 && righted.wheels === 4 && righted.flips >= 1, `hops ${righted.flips}, up ${righted.up.toFixed(2)}`);

// Hard turns with the most grip, each car: does it stay on its wheels? Reported, since it rights itself if it doesn't.
for (const name of cars) {
	await page.evaluate(() => window.tell({ type: 'trigger', id: 'reset' }));
	await wait(100);
	await page.evaluate((v) => window.tell({ type: 'set', id: 'car', value: v }), name);
	await page.evaluate(() => window.tell({ type: 'set', id: 'grip', value: 2 }));
	const low = await frame.evaluate(async () => {
		const a = window.__block.app;
		let lowest = 1;
		let t = 0;
		a.script = (car, dt) => {
			t += dt;
			lowest = Math.min(lowest, car.up.y);
			return { throttle: 1, steer: t > 1.2 ? 1 : 0, brake: 0, handbrake: 0 };
		};
		await new Promise((go) => setTimeout(go, 3400));
		a.script = null;
		return lowest;
	});
	check(`${name}: full lock at speed with the most grip stays on its wheels`, low > 0.5, `lowest up ${low.toFixed(2)}`);
}
await page.evaluate(() => window.tell({ type: 'trigger', id: 'reset' }));
await wait(300);

// Hit a figure, change things, then Reset: all of it must come back.
await frame.evaluate(() => {
	const a = window.__block.app;
	const f = a.figures[0];
	a.script = (car) => {
		let d = Math.atan2(f.home.position.x - car.position.x, f.home.position.z - car.position.z) - Math.atan2(car.forward.x, car.forward.z);
		if (d > Math.PI) d -= 2 * Math.PI;
		if (d < -Math.PI) d += 2 * Math.PI;
		return { throttle: 1, steer: f.falling ? 0 : Math.max(-1, Math.min(1, d * 4)), brake: 0, handbrake: 0 };
	};
});
await frame.waitForFunction(() => window.__block.app.figures[0].falling, null, { timeout: 6000 }).catch(() => {});
await wait(300);
await frame.evaluate(() => {
	window.__block.app.script = null;
});
const hit = await read();
check('a figure goes down when hit', hit.falling >= 1, `${hit.falling} down`);
await shot('hit');
await page.mouse.move(640, 360);
await page.mouse.down();
await page.mouse.move(760, 400, { steps: 4 });
await page.mouse.up();
await page.mouse.wheel(0, 500);
await wait(100);
const moved = await read();
check('a drag turned the view and scroll zoomed', Math.abs(moved.yawOffset) > 0.1 && Math.abs(moved.zoom - 1) > 0.01, `yaw ${moved.yawOffset.toFixed(2)}, zoom ${moved.zoom.toFixed(2)}`);
for (const [id, value] of [['car', 'pickup'], ['grip', 0.5], ['power', 1.8], ['slow', 0.5], ['assists', false], ['stiffness', 1.8]]) await page.evaluate(([i, v]) => window.tell({ type: 'set', id: i, value: v }), [id, value]);
await wait(300);
const kept = await read();
check('changing car keeps the view', Math.abs(kept.yawOffset - moved.yawOffset) < 1e-6);
await page.evaluate(() => window.tell({ type: 'trigger', id: 'reset' }));
await wait(1800);
const final = await read();
const state = await page.evaluate(() => window.got.state);
check('Reset: every control back, and the page told', recipe.controls.every((c) => final.values[c.id] === c.default && state[c.id] === c.default), JSON.stringify(state));
check('Reset: the view back', Math.abs(final.yawOffset) < 1e-6 && Math.abs(final.zoom - 1) < 1e-6);
check('Reset: everyone on their feet', final.falling === 0);
check('Reset: the car home, on its wheels', Math.hypot(final.x, final.z) < 0.5 && final.wheels === 4 && final.mass === 1100);
const crates = await frame.evaluate(() => {
	const a = window.__block.app;
	return a.world.bodies.len?.() ?? 0;
});
await shot('after-reset');

// The driver's view: V and the control, on every car, with everything back after Reset.
const seen = () => frame.evaluate(() => { const a = window.__block.app; return { view: a.values.view, near: a.camera.near, fov: a.camera.fov, x: a.camera.position.x, y: a.camera.position.y, z: a.camera.position.z, cx: a.car.position.x, cy: a.car.position.y, cz: a.car.position.z }; });
const inCar = (s) => s.near < 0.1 && s.fov > 55 && Math.hypot(s.x - s.cx, s.y - s.cy, s.z - s.cz) < 2.2;
await page.mouse.click(640, 360);
await page.keyboard.press('KeyV');
await wait(200);
let eye = await seen();
check('V: the driver\'s view, in the seat, and the page told', eye.view === 'driver' && inCar(eye) && (await page.evaluate(() => window.got.state.view)) === 'driver', JSON.stringify(eye));
await shot('driver');
await page.mouse.move(600, 360);
await page.mouse.down();
await page.mouse.move(760, 400, { steps: 4 });
await page.mouse.up();
await wait(1800);
const lookedBack = await frame.evaluate(() => Math.abs(window.__block.app.view.yawOffset));
check('driver: a drag looks round, then comes back', lookedBack < 0.05, lookedBack.toFixed(3));
for (const v of recipe.controls.find((c) => c.id === 'car').options.map((o) => o.value)) {
	await page.evaluate((c) => window.tell({ type: 'set', id: 'car', value: c }), v);
	await wait(250);
	eye = await seen();
	check(`driver: stays in the seat of ${v}`, eye.view === 'driver' && inCar(eye), JSON.stringify(eye));
}
await page.keyboard.down('KeyW');
await wait(1200);
await page.keyboard.up('KeyW');
eye = await seen();
check('driver: the eye stays in the car moving', inCar(eye), JSON.stringify(eye));
await page.keyboard.press('KeyV');
await wait(200);
eye = await seen();
check('V again: back behind the car', eye.view === 'chase' && eye.near === 0.5 && eye.fov === 38, JSON.stringify(eye));
await page.evaluate(() => window.tell({ type: 'set', id: 'view', value: 'driver' }));
await wait(200);
eye = await seen();
check('the View control: the driver\'s view', eye.view === 'driver' && inCar(eye));
await page.evaluate(() => window.tell({ type: 'trigger', id: 'reset' }));
await wait(1800);
eye = await seen();
const back = await read();
check('Reset from the seat: chase view, all defaults', eye.view === 'chase' && eye.near === 0.5 && eye.fov === 38 && recipe.controls.every((c) => back.values[c.id] === c.default) && Math.hypot(back.x, back.z) < 0.5, JSON.stringify(eye));

// Rapid switching with keys held, as a person fiddling would.
await page.mouse.click(640, 360);
await page.keyboard.down('KeyW');
for (let i = 0; i < 12; i++) {
	await page.evaluate(([v]) => window.tell({ type: 'set', id: 'car', value: v }), [cars[i % cars.length]]);
	await wait(60);
}
await page.keyboard.up('KeyW');
await page.evaluate(() => window.tell({ type: 'trigger', id: 'reset' }));
await wait(600);
const rapid = await read();
check('rapid car changes leave a working car', rapid.wheels === 4 && rapid.up > 0.99, `${crates} bodies before`);

const stats = await page.evaluate(() => window.got.stats);
check('no errors', errors.length === 0, errors.slice(0, 3).join(' | '));
check('no outside requests', outside.length === 0, outside.slice(0, 3).join(' '));
console.log('last stats', JSON.stringify(stats));
await browser.close();
demo.close();
harness.close();
console.log(failed ? `${failed} FAILED` : 'all passed');
process.exit(failed ? 1 : 0);
