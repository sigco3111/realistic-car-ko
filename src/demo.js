// The car block's demo. WASD drives; the driving is src/car.js, the look of it src/car-model.js, the camera src/view.js.
// The yard, the mannequins and the marks on the ground are src/yard.js, src/mannequin.js and src/effects.js.
// Patch's block page steers it through Patch's block demo helper (lib/patch-block.js), with its controls in recipe.json.
import { ACESFilmicToneMapping, BackSide, Color, DirectionalLight, Fog, HemisphereLight, Mesh, PCFShadowMap, PerspectiveCamera, PMREMGenerator, Scene, ShaderMaterial, SphereGeometry, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { patchBlock } from 'patch-block';
import { block as recipeBlock } from '../recipe.json';
import { Car, tuneFor } from './car.js';
import { CarModel, measureCar } from './car-model.js';
import { CarEffects } from './effects.js';
import { Mannequin, prepareMannequin } from './mannequin.js';
import { Sounds } from './sound.js';
import { CarView } from './view.js';
import { buildYard, COURSE_YAW, place, YARD } from './yard.js';

const params = new URLSearchParams(location.search);
const STEP = 1 / 60;
const WORLD_GRAVITY = 9.81;
const CARS = {
	rally: { file: 'models/rally-car.glb', mass: 1150 },
	muscle: { file: 'models/muscle-car.glb', mass: 1450 },
	pickup: { file: 'models/pickup-truck.glb', mass: 2100 },
};
// Collision groups, as folio's: the bumper only touches loose things; bodies in a ragdoll don't touch each other.
const SOLID = 1;
const OBJECT = 2;
const BUMPER = 4;
const DOLL = 8;
const groupOf = (member, filter) => (member << 16) | filter;
const GROUPS = {
	solid: groupOf(SOLID, SOLID | DOLL),
	body: groupOf(SOLID, SOLID | DOLL),
	loose: groupOf(SOLID | OBJECT, SOLID | BUMPER | DOLL),
	bumper: groupOf(BUMPER, OBJECT | DOLL),
	ragdoll: groupOf(DOLL, SOLID | BUMPER),
	sensor: groupOf(SOLID | OBJECT, SOLID | BUMPER),
};

const times = { start: performance.now() };
const canvas = document.getElementById('view');
const cover = document.getElementById('cover');
const defaults = Object.fromEntries(recipeBlock.controls.map((c) => [c.id, c.default]));
if (params.get('g')) defaults.gravity = Number(params.get('g'));
const values = { ...defaults };
if (params.get('car')) values.car = params.get('car');

const block = patchBlock({
	...recipeBlock,
	onSet(id, value) {
		if (!app || values[id] === value) return;
		values[id] = value;
		if (id === 'car') {
			makeCar(value);
			placeCar();
		} else if (id !== 'slow') applyControls();
	},
	onTrigger(id) {
		if (id === 'reset') reset();
	},
	onVisible(visible) {
		paused = !visible;
		sounds?.setVisible(visible);
		if (visible) {
			last = performance.now();
			accumulator = 0;
		}
	},
});
let sounds = null;
const breathe = () => new Promise((go) => setTimeout(go));
block.progress?.(0.05, 'Loading the physics');
const RAPIER = (await import('@dimforge/rapier3d-compat')).default;
await RAPIER.init();
block.progress?.(0.2, 'Loading the cars');

// Rendering
let pixelRatio = Math.min(devicePixelRatio, 1.5);
const renderer = new WebGLRenderer({ canvas, antialias: true, powerPreference: 'high-performance' });
renderer.setPixelRatio(pixelRatio);
renderer.toneMapping = ACESFilmicToneMapping;
renderer.toneMappingExposure = 0.95;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = PCFShadowMap;
renderer.debug.checkShaderErrors = false;
// A lost graphics card reloads the page once; a second time inside a minute, it says so and stops.
canvas.addEventListener('webglcontextlost', (e) => {
	e.preventDefault();
	let then = 0;
	try {
		then = Number(sessionStorage.getItem('car-lost')) || 0;
		sessionStorage.setItem('car-lost', String(Date.now()));
	} catch {
		// No storage: treat it as the first time.
	}
	if (Date.now() - then > 60000) location.reload();
	else {
		const note = document.getElementById('lost');
		note.hidden = false;
	}
});
const scene = new Scene();
scene.fog = new Fog('#e7bd8d', 190, 560);
const camera = new PerspectiveCamera(25, 1, 1, 1200);
const pmrem = new PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.3;
pmrem.dispose();
scene.add(new HemisphereLight('#c6d8ea', '#8d6a42', 0.75));
const sun = new DirectionalLight('#ffd3a0', 3.1);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const SHADOW = 42;
Object.assign(sun.shadow.camera, { left: -SHADOW, right: SHADOW, top: SHADOW, bottom: -SHADOW, near: 1, far: 260 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.05;
scene.add(sun, sun.target);
const SUN_FROM = { x: -70, y: 74, z: 44 };

// The sky, for when the view goes low.
scene.add(
	new Mesh(
		new SphereGeometry(900, 24, 12),
		new ShaderMaterial({
			side: BackSide,
			depthWrite: false,
			fog: false,
			vertexShader: 'varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
			fragmentShader: `varying vec3 vDir;
				void main() {
					float h = clamp(vDir.y, 0.0, 1.0);
					vec3 low = vec3(0.905, 0.741, 0.553);
					vec3 mid = vec3(0.86, 0.72, 0.68);
					vec3 top = vec3(0.42, 0.56, 0.72);
					vec3 c = mix(low, mid, smoothstep(0.0, 0.12, h));
					c = mix(c, top, smoothstep(0.08, 0.6, h));
					gl_FragColor = vec4(c, 1.0);
					#include <colorspace_fragment>
				}`,
		}),
	),
);

// Physics
const world = new RAPIER.World({ x: 0, y: -WORLD_GRAVITY, z: 0 });
world.timestep = STEP;
const events = new RAPIER.EventQueue(true);

const loader = new GLTFLoader();
const [muscleGltf, rallyGltf, pickupGltf, dummyGltf] = await Promise.all([CARS.muscle.file, CARS.rally.file, CARS.pickup.file, 'models/mannequin.glb'].map((f) => loader.loadAsync(f)));
const loaded = { muscle: muscleGltf.scene, rally: rallyGltf.scene, pickup: pickupGltf.scene };
block.progress?.(0.5, 'Building the yard');
await breathe();

const yard = buildYard(RAPIER, world, scene, GROUPS);
sounds = new Sounds();
await sounds.load().catch(() => {});
const startSound = () => sounds.start();
addEventListener('pointerdown', startSound);
addEventListener('keydown', startSound);

const dummy = prepareMannequin(dummyGltf);
const STANDING = [
	[13, -1.6, 'idle', 2.8],
	[17.5, 2.4, 'fold', 3.6],
	[18.5, 1.3, 'talk', -1.2],
	[24, -3.4, 'idle', 0.4],
	[52, -8, 'talk', 1],
	[52.8, -9, 'fold', 4],
	[-15, -3, 'idle', 0.5],
	[38, 16, 'fold', 2],
];
const figures = STANDING.map(([u, v, clip, yaw], i) => new Mannequin(RAPIER, world, dummy, { position: place(u, v), yaw: COURSE_YAW + yaw, clip, groups: { ragdoll: GROUPS.ragdoll, sensor: GROUPS.sensor }, phase: i * 0.37 }));
for (const f of figures) scene.add(f.mesh);
const figureBySensor = new Map(figures.map((f) => [f.sensor.handle, f]));

const effects = new CarEffects(scene, renderer);

// The cars: each model is prepared once, and only the physics are rebuilt when you change car.
const START = { x: 0, y: 0.05, z: 0 };
const INPUT = { throttle: 0, steer: 0, boost: 0, brake: 0, jump: 0 };
const measured = {};
const models = {};
for (const id of Object.keys(CARS)) {
	measured[id] = measureCar(loaded[id]);
	const stand = { wheels: measured[id].wheels.map((w, index) => ({ ...w, index, ride: 0, suspension: 0, spin: 0 })), position: START, quaternion: { x: 0, y: 0, z: 0, w: 1 }, input: INPUT, tune: tuneFor({ length: measured[id].size.length, gravity: values.gravity }) };
	models[id] = new CarModel(loaded[id], stand);
	models[id].object.visible = false;
	scene.add(models[id].object);
}
let car = null;
let model = null;
let view = null;
let hitStop = 0;
function makeCar(id) {
	if (car) car.dispose();
	if (model) model.object.visible = false;
	const c = CARS[id];
	const m = measured[id];
	car = new Car(RAPIER, world, { wheels: m.wheels, size: m.size, mass: c.mass, gravity: values.gravity, position: START, yaw: COURSE_YAW, groups: { body: GROUPS.body, bumper: GROUPS.bumper } });
	car.on('stuck', () => car.flip());
	car.on('land', (speed) => {
		if (speed < 6) return;
		effects.burst(car.position.x, 0.3, car.position.z, Math.min(14, Math.floor(speed)), 3 + speed * 0.3, 2);
		view?.kick(Math.min(0.6, speed * 0.018));
		sounds.play('heavy', Math.min(1, speed / 24), 0.62, 1 - values.slow * 0.75);
	});
	applyControls();
	model = models[id];
	model.object.visible = true;
	model.attach(car);
	view?.fit(car.tune);
}

function applyControls() {
	const base = tuneFor({ length: car.size.length, gravity: values.gravity });
	Object.assign(car.tune, base, {
		frictionSlip: base.frictionSlip * values.grip,
		engine: base.engine * values.power,
		topSpeed: base.topSpeed * values.power,
		topSpeedBoost: base.topSpeedBoost * values.power,
		steering: values.steering,
		boostMultiplier: values.boost,
	});
	car.flipWait = values.flip_wait;
	car.applyTune();
}

function placeCar() {
	car.moveTo(START, COURSE_YAW);
	model.snap();
	view.jump(START);
	effects.reset();
}

function reset() {
	const wasCar = values.car;
	Object.assign(values, defaults);
	if (wasCar !== values.car) makeCar(values.car);
	else applyControls();
	block.state({ ...recipeBlock.controls.reduce((all, c) => ({ ...all, [c.id]: values[c.id] }), {}) });
	yard.reset();
	for (const f of figures) f.reset();
	events.clear();
	hitStop = 0;
	placeCar();
	view.reset(START);
	view.glideIn();
}

// Keys
const held = new Set();
const keyName = (e) => {
	if (e.code === 'ShiftLeft' || e.code === 'ShiftRight') return 'shift';
	if (e.code === 'Space') return 'space';
	if (e.code === 'ArrowUp') return 'w';
	if (e.code === 'ArrowDown') return 's';
	if (e.code === 'ArrowLeft') return 'a';
	if (e.code === 'ArrowRight') return 'd';
	if (/^Key[A-Z]$/.test(e.code)) return e.code[3].toLowerCase();
	return null;
};
const keysEl = document.getElementById('keys');
const light = (k, on) => keysEl.querySelector(`[data-k="${k}"]`)?.classList.toggle('down', on);
let jumpLeft = 0;
addEventListener('keydown', (e) => {
	const k = keyName(e);
	if (!k || e.ctrlKey || e.metaKey || e.altKey) return;
	if (['w', 'a', 's', 'd', 'shift', 'space', 'b', 'r'].includes(k)) e.preventDefault();
	if (e.repeat) return;
	held.add(k);
	light(k, true);
	if (k === 'space' && car?.wheelsOnGround > 0) jumpLeft = 0.18;
	if (k === 'r' && app) reset();
});
addEventListener('keyup', (e) => {
	const k = keyName(e);
	if (!k) return;
	held.delete(k);
	light(k, false);
});
const focusChanged = () => {
	keysEl.classList.toggle('asleep', !document.hasFocus());
	if (document.hasFocus()) return;
	for (const k of held) light(k, false);
	held.clear();
};
addEventListener('blur', focusChanged);
addEventListener('focus', focusChanged);
focusChanged();

// Mouse: drag turns the view, scroll zooms.
let dragging = null;
canvas.addEventListener('pointerdown', (e) => {
	canvas.focus({ preventScroll: true });
	dragging = { x: e.clientX, y: e.clientY };
	canvas.setPointerCapture(e.pointerId);
});
canvas.addEventListener('pointermove', (e) => {
	if (!dragging || !view) return;
	view.drag(e.clientX - dragging.x, e.clientY - dragging.y);
	dragging = { x: e.clientX, y: e.clientY };
});
canvas.addEventListener('pointerup', () => (dragging = null));
canvas.addEventListener(
	'wheel',
	(e) => {
		e.preventDefault();
		view?.scroll(e.deltaY);
	},
	{ passive: false },
);
canvas.addEventListener('contextmenu', (e) => e.preventDefault());

const resize = () => {
	const w = innerWidth;
	const h = innerHeight;
	renderer.setSize(w, h, false);
	camera.aspect = w / h;
	camera.updateProjectionMatrix();
};
addEventListener('resize', resize);
resize();

makeCar(values.car);
view = new CarView(camera, car.tune);
view.reset(START);

/** A figure's been reached: it lets go moving with whatever hit it, and is thrown up over the front. */
function knock(figure, v, speed) {
	if (figure.falling) return;
	const carry = 0.9;
	const lift = Math.min(12, 1 + speed * 0.3);
	figure.fall({ x: v.x * carry, y: v.y * carry + lift, z: v.z * carry });
	if (speed > 6) {
		hitStop = Math.max(hitStop, 0.06);
		view.kick(Math.min(0.5, speed * 0.02));
		const spinOf = () => (Math.random() - 0.5) * Math.min(14, speed);
		figure.shove({ x: 0, y: 0, z: 0 }, { x: spinOf(), y: spinOf(), z: spinOf() });
		const p = figure.mesh.position;
		effects.burst(p.x, 0.3, p.z, 5, 3, 1.4);
	}
}

const speedOf = (body) => {
	const v = body?.linvel();
	return v ? Math.hypot(v.x, v.y, v.z) : 0;
};
function readEvents() {
	const rate = 1 - values.slow * 0.75;
	events.drainCollisionEvents((a, b, started) => {
		if (!started) return;
		const figure = figureBySensor.get(a) ?? figureBySensor.get(b);
		if (figure) {
			if (figure.falling) return;
			const other = world.getCollider(figureBySensor.has(a) ? b : a);
			const body = other?.parent();
			if (!body || !body.isDynamic()) return;
			const speed = speedOf(body);
			if (body.handle === car.body.handle ? speed > 1.5 : speed > 3.5) {
				knock(figure, body.linvel(), speed);
				sounds.play('plate', Math.min(1, speed / 26), 0.7, rate);
			}
			return;
		}
		// A crate or a drum against anything.
		const one = world.getCollider(a)?.parent();
		const two = world.getCollider(b)?.parent();
		const kind = yard.kindOf(one) ?? yard.kindOf(two);
		if (!kind) return;
		const speed = Math.abs(speedOf(one) - speedOf(two));
		sounds.play(kind, speed / 18, kind === 'wood' ? 0.85 : 1, rate);
	});
	events.drainContactForceEvents((event) => {
		const force = event.maxForceMagnitude() / car.mass;
		if (force < 30) return;
		const strength = Math.min(1, force / 260);
		sounds.play('heavy', strength, 0.8, rate);
		view.kick(Math.min(0.5, strength * 0.6));
	});
}

// Each frame: fixed steps of the world, slow motion by making them smaller, and the picture between the last two.
let accumulator = 0;
let last = performance.now();
let paused = false;
function stepWorld() {
	const stop = hitStop > 0 ? 0.15 : 1;
	if (hitStop > 0) hitStop -= STEP;
	const dt = STEP * (1 - values.slow) * stop;
	world.timestep = dt;
	if (jumpLeft > 0) jumpLeft -= dt;
	car.input = app?.script
		? app.script(car, dt)
		: {
				throttle: (held.has('w') ? 1 : 0) - (held.has('s') ? 1 : 0),
				steer: (held.has('a') ? 1 : 0) - (held.has('d') ? 1 : 0),
				boost: held.has('shift') ? 1 : 0,
				brake: held.has('b') ? 1 : 0,
				jump: jumpLeft > 0 ? 1 : 0,
			};
	car.update(dt);
	world.step(events);
	car.afterStep(dt);
	readEvents();
	model.stepped();
	if (car.position.y < -8 || Math.abs(car.position.x) > YARD + 30 || Math.abs(car.position.z) > YARD + 30) car.moveTo(START, COURSE_YAW);
	return dt;
}

function draw(real, scaled, alpha) {
	model.update(scaled, alpha);
	for (const f of figures) f.update(scaled);
	yard.update(scaled);
	effects.update(car, scaled, camera);
	view.update(model.object.position, real);
	sun.target.position.set(view.smoothed.x, 0, view.smoothed.z);
	sun.position.set(view.smoothed.x + SUN_FROM.x, SUN_FROM.y, view.smoothed.z + SUN_FROM.z);
	renderer.render(scene, camera);
}

// The lowest quality: a smaller shadow, drawn every other frame, and less grass.
let shadowEveryOther = false;
function lowest() {
	sun.shadow.mapSize.set(1024, 1024);
	sun.shadow.map?.dispose();
	sun.shadow.map = null;
	renderer.shadowMap.autoUpdate = false;
	renderer.shadowMap.needsUpdate = true;
	shadowEveryOther = true;
	yard.lower();
}

let slowTime = 0;
let frameCount = 0;
function frame(now) {
	requestAnimationFrame(frame);
	const gap = now - last;
	const real = Math.min(0.1, gap / 1000);
	last = now;
	if (paused) return;
	accumulator += real;
	let steps = 0;
	let scaled = 0;
	while (accumulator >= STEP && steps < 4) {
		scaled += stepWorld();
		accumulator -= STEP;
		steps++;
	}
	if (steps === 4) accumulator = 0;
	frameCount++;
	if (shadowEveryOther && frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;
	draw(real, scaled, accumulator / STEP);
	// A card that can't keep up gets fewer pixels: nothing here compiles anything.
	if (times.ready) {
		// Only for a card that's truly stuck, for seconds on end: changing it reallocates the screen, itself a stall.
		slowTime = gap > 30 ? slowTime + gap : Math.max(0, slowTime - gap * 3);
		if (slowTime > 5000 && pixelRatio > 0.75) {
			pixelRatio = Math.max(0.75, pixelRatio - 0.25);
			renderer.setPixelRatio(pixelRatio);
			resize();
			slowTime = 0;
			times.scaledDown = (times.scaledDown ?? 0) + 1;
		}
	}
}

const app = {
	world,
	view,
	yard,
	figures,
	effects,
	sounds,
	camera,
	scene,
	values,
	held,
	renderer,
	script: null,
	stepWorld,
	reset,
	get car() {
		return car;
	},
	get model() {
		return model;
	},
	set(id, value) {
		if (values[id] === value) return;
		values[id] = value;
		if (id === 'car') {
			makeCar(value);
			placeCar();
		} else if (id !== 'slow') applyControls();
	},
};
window.__block = { app, times, renderer, block };

// Warm-up, all behind the cover: settle the world, send everything to the GPU, draw every car and every kind of thing once.
block.progress?.(0.65, 'Settling the yard');
await breathe();
for (let i = 0; i < 60; i++) stepWorld();
// A practice fall, so the first real one has nothing new to do.
figures[0].fall({ x: 0, y: 1, z: 0 });
for (let i = 0; i < 4; i++) stepWorld();
figures[0].update(STEP);
block.progress?.(0.75, 'Preparing the pictures');
await breathe();
const gl = renderer.getContext();
for (const id of Object.keys(CARS)) models[id].object.visible = true;
effects.burst(0, 0.5, 0, 4, 1, 1);
effects.update(car, STEP, camera);
scene.traverse((o) => {
	const material = o.material;
	if (!material) return;
	for (const key of ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap']) if (material[key]) renderer.initTexture(material[key]);
});
await renderer.compileAsync(scene, camera);
block.progress?.(0.88, 'Preparing the pictures');
await breathe();
view.update({ x: 0, y: 0, z: 0 }, STEP);
sun.target.position.set(0, 0, 0);
sun.position.set(SUN_FROM.x, SUN_FROM.y, SUN_FROM.z);
renderer.render(scene, camera);
await breathe();
for (const id of Object.keys(CARS)) models[id].object.visible = id === values.car;
figures[0].reset();
yard.reset();
effects.reset();
events.clear();
car.moveTo(START, COURSE_YAW);
for (let i = 0; i < 60; i++) stepWorld();
yard.reset();
model.snap();
view.reset(car.position);
draw(STEP, STEP, 1);
// Wait until the GPU has really caught up.
const sync = gl.fenceSync(gl.SYNC_GPU_COMMANDS_COMPLETE, 0);
gl.flush();
await new Promise((done) => {
	const check = () => {
		const state = gl.clientWaitSync(sync, 0, 0);
		if (state === gl.ALREADY_SIGNALED || state === gl.CONDITION_SATISFIED) done();
		else setTimeout(check, 8);
	};
	check();
});
gl.deleteSync(sync);
block.progress?.(0.96, 'Almost there');

// Lift the cover under the page's own loader, and only say ready once frames are on time.
last = performance.now();
accumulator = 0;
requestAnimationFrame(frame);
await new Promise((go) => requestAnimationFrame(go));
cover.remove();
// A card that can't keep up starts with less: fewer pixels, then a smaller shadow and less grass. Nothing here compiles.
await new Promise((go) => {
	let quick = 0;
	let lowered = 0;
	let then = performance.now();
	const started = then;
	let since = then;
	const wait = (now) => {
		const gap = now - then;
		then = now;
		quick = gap < 26 ? quick + 1 : 0;
		if (quick >= 20 || now - started > 5500) return go();
		if (now - since > 1500 && lowered < 2) {
			since = now;
			lowered++;
			times.lowered = lowered;
			pixelRatio = 1;
			renderer.setPixelRatio(pixelRatio);
			resize();
			if (lowered === 2) lowest();
		}
		requestAnimationFrame(wait);
	};
	requestAnimationFrame(wait);
});
times.ready = performance.now() - times.start;
block.ready();
