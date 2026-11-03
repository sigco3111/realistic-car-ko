// Measures the mix as the game makes it, since nobody here can hear it: taps the sound just before the speakers while a script drives the
// car, and prints how loud it is, its peak, and which sounds were asked for. Automated browsers are muted, so this reads the numbers, not the air.
//   node tools/sound-check.mjs <demo url>
import { chromium } from 'playwright';
import { guard } from 'file:///C:/Users/drini/Patch/seeds/no-pointer-lock.mjs';

guard(chromium);
const url = process.argv[2];
const browser = await chromium.launch({ channel: 'chrome', headless: true, args: ['--mute-audio', '--ignore-gpu-blocklist', '--use-angle=d3d11', '--autoplay-policy=no-user-gesture-required'] });
const page = await browser.newPage({ viewport: { width: 640, height: 360 } });
const errors = [];
page.on('pageerror', (e) => errors.push(e.message));
page.on('console', (m) => {
	if (m.type() === 'error') errors.push(m.text());
});
await page.goto(`${url}?map=stage`);
await page.waitForFunction(() => window.__block?.times?.ready, null, { timeout: 90000 });
await page.mouse.click(320, 180);
await page.waitForTimeout(300);
await page.evaluate(() => {
	const a = window.__block.app;
	const s = a.sounds;
	const c = s.context;
	const tap = c.createAnalyser();
	tap.fftSize = 4096;
	s.limiter.connect(tap);
	const data = new Float32Array(tap.fftSize);
	const log = (window.soundLog = { peak: 0, sum: 0, n: 0, kinds: {} });
	const play = s.play.bind(s);
	s.play = (kind, ...rest) => {
		log.kinds[kind] = (log.kinds[kind] ?? 0) + 1;
		return play(kind, ...rest);
	};
	setInterval(() => {
		tap.getFloatTimeDomainData(data);
		let e = 0;
		for (const v of data) {
			e += v * v;
			log.peak = Math.max(log.peak, Math.abs(v));
		}
		log.sum += e / data.length;
		log.n++;
	}, 40);
	window.readSound = () => {
		const out = { rms: +(10 * Math.log10(log.sum / Math.max(1, log.n) + 1e-12)).toFixed(1), peak: +(20 * Math.log10(log.peak + 1e-9)).toFixed(1), kinds: { ...log.kinds } };
		Object.assign(log, { peak: 0, sum: 0, n: 0, kinds: {} });
		return out;
	};
});
const phase = async (name, script, ms) => {
	await page.evaluate(() => window.readSound());
	await page.evaluate((src) => {
		window.__block.app.script = new Function('car', 'dt', src);
	}, script);
	await page.waitForTimeout(ms);
	const r = await page.evaluate(() => {
		const a = window.__block.app;
		const e = a.sounds.engine;
		return { sound: window.readSound(), rpm: Math.round(a.car.rpm), kmh: Math.round(a.car.speed * 3.6), engineLoops: e?.loops.length ?? 0, surface: a.car.wheels[2].surface };
	});
	console.log(`${name.padEnd(30)} level ${String(r.sound.rms).padStart(6)} dB  peak ${String(r.sound.peak).padStart(6)} dB  ${String(r.rpm).padStart(5)} rpm  ${String(r.kmh).padStart(3)} km/h  ${r.surface.padEnd(6)} ${JSON.stringify(r.sound.kinds)}`);
};
const go = (t, b = 0, s = 0, h = 0) => `return { throttle: ${t}, brake: ${b}, steer: ${s}, handbrake: ${h} };`;
await page.waitForTimeout(600);
await phase('idle', go(0), 1500);
await phase('full throttle', go(1), 4000);
await phase('lift off', go(0), 1500);
await phase('full throttle again', go(1), 2000);
await phase('handbrake and lock', go(0.5, 0, 1, 1), 1500);
await phase('brake hard', go(0, 1), 1500);
console.log('-- impacts, full speed into the ground from above');
await page.evaluate(() => {
	const a = window.__block.app;
	a.script = () => ({ throttle: 0, brake: 0, steer: 0, handbrake: 0 });
	a.car.body.setTranslation({ x: a.car.position.x, y: a.car.position.y + 4, z: a.car.position.z }, true);
});
await phase('a drop of 4 m', go(0), 1400);
await page.evaluate(() => {
	const a = window.__block.app;
	a.set('view', 'driver');
});
await phase('from the seat, full throttle', go(1), 3000);
const final = await page.evaluate(() => ({ state: window.__block.app.sounds.context.state, played: window.__block.app.sounds.played }));
console.log(JSON.stringify(final), 'errors', errors.length, errors.slice(0, 3).join(' | '));
await browser.close();
