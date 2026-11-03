// The car block's demo. WASD drives and Space is the handbrake. The physics is src/car.js, the look of it src/car-model.js,
// the camera src/view.js; the yard, the mannequins and the marks on the ground are src/yard.js, src/mannequin.js and
// src/effects.js. Patch's block page steers it through Patch's block demo helper (lib/patch-block.js), with its controls
// in recipe.json.
import { ACESFilmicToneMapping, BackSide, DirectionalLight, Fog, Group, HemisphereLight, Mesh, PCFShadowMap, PerspectiveCamera, PMREMGenerator, Scene, ShaderMaterial, SphereGeometry, Vector3, WebGLRenderer } from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { patchBlock } from 'patch-block';
import { block as recipeBlock } from '../recipe.json';
import { Car } from './car.js';
import { CarModel, measureCar } from './car-model.js';
import { VIREO, specOf } from './vireo.js';
import { addDirt } from './dirt.js';
import { CarEffects } from './effects.js';
import { Mannequin, prepareMannequin } from './mannequin.js';
import { Sounds } from './sound.js';
import { DRIVER_FOV, DRIVER_NEAR, DriverView } from './driver-view.js';
import { ChaseView } from './view.js';
import { buildStage } from './stage.js';
import { buildYard, COURSE_YAW, place } from './yard.js';

const params = new URLSearchParams(location.search);
const STEP = 1 / 120;
const WORLD_GRAVITY = 9.81;
// Collision groups: the bumper only touches loose things, and the parts of a ragdoll don't touch each other.
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
const values = { ...defaults };
if (params.get('view')) defaults.view = values.view = params.get('view');
if (params.get('map')) defaults.map = values.map = params.get('map');

let app = null;
let paused = false;
let last = performance.now();
let accumulator = 0;
let sounds = null;
const block = patchBlock({
	...recipeBlock,
	onSet(id, value) {
		app?.set(id, value);
	},
	onTrigger(id) {
		if (id === 'reset') app?.reset();
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
const breathe = () => new Promise((go) => setTimeout(go));
block.progress?.(0.05, 'Loading the physics');
const RAPIER = (await import('@dimforge/rapier3d-compat')).default;
await RAPIER.init();
block.progress?.(0.2, 'Loading the car');

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
	else document.getElementById('lost').hidden = false;
});
const scene = new Scene();
scene.fog = new Fog('#e7bd8d', 170, 620);
const CHASE_FOV = 38;
const CHASE_NEAR = 0.5;
const camera = new PerspectiveCamera(CHASE_FOV, 1, CHASE_NEAR, 1400);
// What the paint and glass reflect: this yard's own sky over its own ground, not a room with bright ceiling panels, which
// showed in a glossy bonnet as a white patch hiding the paint.
const reflected = new Scene();
reflected.add(
	new Mesh(
		new SphereGeometry(10, 24, 12),
		new ShaderMaterial({
			side: BackSide,
			depthWrite: false,
			vertexShader: 'varying vec3 vDir; void main() { vDir = normalize(position); gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0); }',
			fragmentShader: `varying vec3 vDir;
				void main() {
					float h = vDir.y;
					vec3 ground = vec3(0.3, 0.25, 0.18);
					vec3 low = vec3(0.86, 0.68, 0.5);
					vec3 top = vec3(0.3, 0.45, 0.68);
					vec3 c = mix(low, top, smoothstep(0.0, 0.55, h));
					c = mix(ground, c, smoothstep(-0.02, 0.02, h));
					gl_FragColor = vec4(c, 1.0);
				}`,
		}),
	),
);
const pmrem = new PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(reflected, 0.02).texture;
scene.environmentIntensity = 0.55;
pmrem.dispose();
const hemisphere = new HemisphereLight('#c6d8ea', '#8d6a42', 0.75);
scene.add(hemisphere);
const sun = new DirectionalLight('#ffd3a0', 3.1);
sun.castShadow = true;
sun.shadow.mapSize.set(2048, 2048);
const SHADOW = 46;
Object.assign(sun.shadow.camera, { left: -SHADOW, right: SHADOW, top: SHADOW, bottom: -SHADOW, near: 1, far: 280 });
sun.shadow.bias = -0.0004;
sun.shadow.normalBias = 0.05;
scene.add(sun, sun.target);
const SUN_FROM = { x: -70, y: 74, z: 44 };

// The sky.
const yardSky = new Group();
scene.add(yardSky);
yardSky.add(
	new Mesh(
		new SphereGeometry(1200, 24, 12),
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
// A weak card gets the car's lighter model. `?light` asks for it, for checks.
const context = renderer.getContext();
const cardInfo = context.getExtension('WEBGL_debug_renderer_info');
const card = cardInfo ? context.getParameter(cardInfo.UNMASKED_RENDERER_WEBGL) : '';
const weakCard = params.has('light') || /intel|swiftshader|llvmpipe|software|basic render|mali|adreno|powervr/i.test(card);
const [dummyGltf, carGltf] = await Promise.all(['models/mannequin.glb', weakCard ? VIREO.light : VIREO.file].map((f) => loader.loadAsync(f)));
block.progress?.(0.5, 'Building the yard');
await breathe();

const yard = buildYard(RAPIER, world, scene, GROUPS);
block.progress?.(0.52, 'Building the stage');
await breathe();
const stage = await buildStage(RAPIER, world, scene, GROUPS, { light: weakCard, renderer, progress: (words) => block.progress?.(0.56, words) });
await breathe();
// The two maps share the open space's ramps and loose things and mannequins. What's different is here.
const yardLook = { environment: scene.environment, environmentIntensity: scene.environmentIntensity, sun: new Vector3(SUN_FROM.x, SUN_FROM.y, SUN_FROM.z).normalize(), sunColour: sun.color.getStyle(), sunIntensity: sun.intensity, hemisphere: { sky: '#c6d8ea', ground: '#8d6a42', intensity: 0.75 }, fog: { colour: '#e7bd8d', near: 170, far: 620 }, far: 1400 };
let land = yard;
let landLook = yardLook;
function applyMap() {
	const isStage = values.map !== 'yard';
	land = isStage ? stage : yard;
	landLook = isStage ? stage : yardLook;
	yard.setActive(!isStage);
	stage.setActive(isStage);
	yardSky.visible = !isStage;
	scene.environment = landLook.environment;
	scene.environmentIntensity = landLook.environmentIntensity;
	sun.color.setStyle(landLook.sunColour);
	sun.intensity = landLook.sunIntensity;
	hemisphere.color.set(landLook.hemisphere.sky);
	hemisphere.groundColor.set(landLook.hemisphere.ground);
	hemisphere.intensity = landLook.hemisphere.intensity;
	scene.fog.color.set(landLook.fog.colour);
	scene.fog.near = landLook.fog.near;
	scene.fog.far = landLook.fog.far;
	camera.far = landLook.far;
	camera.updateProjectionMatrix();
	effects.heightAt = land.heightAt;
	if (chase) chase.groundAt = land.heightAt;
}
sounds = new Sounds();
await sounds.load().catch(() => {});
const startSound = () => sounds.start();
addEventListener('pointerdown', startSound);
addEventListener('keydown', startSound);

const dummy = prepareMannequin(dummyGltf);
const STANDING = [
	[16, -11, 'idle', 2.2],
	[21, 11, 'fold', 3.6],
	[22, 10, 'talk', -1.2],
	[32, -13, 'idle', 0.4],
	[52, -12, 'talk', 1],
	[53, -13, 'fold', 4],
	[-15, -11, 'idle', 0.5],
	[38, 13, 'fold', 2],
];
const figures = STANDING.map(([u, v, clip, yaw], i) => new Mannequin(RAPIER, world, dummy, { position: place(u, v), yaw: COURSE_YAW + yaw, clip, groups: { ragdoll: GROUPS.ragdoll, sensor: GROUPS.sensor }, phase: i * 0.37 }));
for (const f of figures) scene.add(f.mesh);
const figureBySensor = new Map(figures.map((f) => [f.sensor.handle, f]));

const effects = new CarEffects(scene);

// The car: its model's measured, and the physics is built to fit.
const START = { x: 0, y: 0.06, z: 0 };
const CLEAN = 0.12;
const dirt = addDirt(carGltf.scene, { value: CLEAN });
const measured = measureCar(carGltf.scene);
const stand = { wheels: measured.wheels.map((w, index) => ({ ...w, index, ride: 0, length: 0, angle: 0, steerAngle: 0 })), position: START, quaternion: { x: 0, y: 0, z: 0, w: 1 } };
const model = new CarModel(carGltf.scene, stand, { ...VIREO.travelDrawn, wheelTurn: VIREO.wheelTurn, wheelAxis: VIREO.wheelAxis, cabin: VIREO.cabin, cabinGlow: VIREO.cabinGlow });
scene.add(model.object);
let view = null;
let chase = null;
let driver = null;
const speedOf = (body) => {
	const v = body?.linvel();
	return v ? Math.hypot(v.x, v.y, v.z) : 0;
};

const car = new Car(RAPIER, world, { ...specOf(), wheels: measured.wheels, size: VIREO.bodySize ?? measured.size, position: START, yaw: COURSE_YAW, groups: { body: GROUPS.body, bumper: GROUPS.bumper }, surfaceAt: (x, z) => land.surfaceAt(x, z) });
car.base = { ...car.tune, hertz: [...car.tune.hertz] };
car.on('stuck', () => car.flip());
car.on('land', (speed) => {
	if (speed < 1.5) return;
	sounds.play('land', Math.min(1, speed / 7), 1, 1 - values.slow * 0.75);
	if (speed < 3) return;
	effects.burst(car.position.x, car.position.y + 0.3, car.position.z, Math.min(14, Math.floor(speed * 1.5)), 2 + speed * 0.3, 1.6, land.surfaceAt(car.position.x, car.position.z));
});
car.on('shift', () => {
	const strength = 0.35 + car.input.throttle * 0.35;
	sounds.play('gear', strength, 1, 1 - values.slow * 0.75);
});
sounds.useEngine(VIREO.engine);
applyControls();
model.attach(car);

function applyControls() {
	const b = car.base;
	car.tune.assists = values.assists;
	car.tune.gripScale = values.grip;
	car.tune.hertz = b.hertz.map((h) => h * values.stiffness);
	car.tune.torque = b.torque * values.power;
	car.tune.frontDrive = values.drive < 0 ? b.frontDrive : values.drive;
	car.tune.lock = b.lock * values.lock;
	car.flipWait = values.flip_wait;
	car.applyTune();
}

function placeCar() {
	car.moveTo(START, COURSE_YAW);
	model.attach(car);
	view.jump(car);
	effects.reset();
}

// Chase or driver. A model with nowhere to put the eye only has the chase view.
function applyView() {
	const eye = model.eye;
	if (values.view === 'driver' && !eye) {
		values.view = 'chase';
		block.state({ ...values });
	}
	const inside = values.view === 'driver';
	model.showInside(inside);
	sounds.setInside(inside);
	effects.clearAround = inside;
	if (inside) driver.seat(model, eye);
	else if (view === driver) chase.jump(car);
	view = inside ? driver : chase;
	camera.near = inside ? DRIVER_NEAR : CHASE_NEAR;
	camera.fov = inside ? DRIVER_FOV : CHASE_FOV;
	camera.updateProjectionMatrix();
}

function reset() {
	const wasMap = values.map;
	Object.assign(values, defaults);
	if (wasMap !== values.map) applyMap();
	applyControls();
	block.state({ ...values });
	yard.reset();
	stage.reset();
	for (const f of figures) f.reset();
	events.clear();
	driver.reset();
	chase.reset(car);
	applyView();
	placeCar();
	dirt.value = CLEAN;
	view.glideIn();
}

// Keys
const held = new Set();
const keyName = (e) => {
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
addEventListener('keydown', (e) => {
	const k = keyName(e);
	if (!k || e.ctrlKey || e.metaKey || e.altKey) return;
	if (['w', 'a', 's', 'd', 'space', 'r', 'v'].includes(k)) e.preventDefault();
	if (e.repeat) return;
	held.add(k);
	light(k, true);
	if (k === 'r' && app) reset();
	if (k === 'v' && app) {
		app.set('view', values.view === 'driver' ? 'chase' : 'driver');
		block.state({ ...values });
	}
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
canvas.addEventListener('pointerup', () => {
	dragging = null;
	view?.release?.();
});
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

chase = view = new ChaseView(camera, car);
chase.reset(car);
driver = new DriverView(camera);
applyMap();
applyView();

/** A figure's been reached: it lets go, moving with whatever hit it and lifted a little by the bumper. The rest is contact. */
function knock(figure, v, speed) {
	if (figure.falling) return;
	const lift = Math.min(7, 0.6 + speed * 0.2);
	figure.fall({ x: v.x * 0.8, y: v.y * 0.8 + lift, z: v.z * 0.8 });
	if (speed > 5) {
		view.kick(Math.min(0.35, speed * 0.012));
		const spinOf = () => (Math.random() - 0.5) * Math.min(10, speed);
		figure.shove({ x: 0, y: 0, z: 0 }, { x: spinOf(), y: spinOf(), z: spinOf() });
		const p = figure.mesh.position;
		effects.burst(p.x, p.y + 0.3, p.z, 4, 2, 1.1, land.surfaceAt(p.x, p.z));
	}
}

/** What the car's run into, by the look of it. */
function materialAgainst(event) {
	const one = world.getCollider(event.collider1());
	const two = world.getCollider(event.collider2());
	const other = one?.parent()?.handle === car.body.handle ? two : one;
	const body = other?.parent();
	const loose = body && yard.kindOf(body);
	if (loose) return loose;
	const T = RAPIER.ShapeType;
	switch (other?.shape.type) {
		case T.Cylinder:
			return 'wood';
		case T.ConvexPolyhedron:
		case T.HeightField:
		case T.TriMesh:
			return 'rock';
		default:
			return 'metal';
	}
}

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
				sounds.play('figure', Math.min(1, speed / 22), 1, rate);
			}
			return;
		}
		// A crate or a drum against anything.
		const one = world.getCollider(a)?.parent();
		const two = world.getCollider(b)?.parent();
		const kind = yard.kindOf(one) ?? yard.kindOf(two);
		if (!kind) return;
		sounds.play(kind, Math.abs(speedOf(one) - speedOf(two)) / 16, kind === 'wood' ? 0.85 : 1, rate);
	});
	events.drainContactForceEvents((event) => {
		const force = event.maxForceMagnitude() / car.tune.mass;
		const kind = materialAgainst(event);
		// Going on while it's moving, it's dragging along whatever that is.
		if (force > 6 && kind !== 'wood') sounds.scrape(Math.min(1, force / 60));
		if (force < 30) return;
		const strength = Math.min(1, force / 260);
		sounds.play(kind, strength, 1, rate);
		// Whatever it hit, its own body takes the hit too.
		if (kind !== 'metal') sounds.play('metal', strength * 0.55, 0.9, rate);
		view.kick(Math.min(0.3, strength * 0.4));
	});
}

// Each frame: fixed steps of the world, slow motion by making them smaller, and the picture between the last two.
const now = () => performance.now();
let thumped = 0;
function stepWorld() {
	const dt = STEP * (1 - values.slow);
	world.timestep = dt;
	car.input = app?.script
		? app.script(car, dt)
		: {
				throttle: held.has('w') ? 1 : 0,
				brake: held.has('s') ? 1 : 0,
				steer: (held.has('a') ? 1 : 0) - (held.has('d') ? 1 : 0),
				handbrake: held.has('space') ? 1 : 0,
			};
	if (land === stage) stage.solidAround(car.position.x, car.position.z);
	car.update(dt);
	world.step(events);
	car.afterStep(dt);
	readEvents();
	// A wheel taking a sudden hit, going over something sharp.
	for (const w of car.wheels) {
		if (w.inContact && w.dampSpeed > 1 && now() - thumped > 260) {
			thumped = now();
			sounds.play('thump', Math.min(1, (w.dampSpeed - 0.6) / 2), 1, 1 - values.slow * 0.75);
		}
	}
	model.stepped();
	// Loose ground slowly dirties the car: a few hundred metres to go from washed to filthy.
	if (car.wheels[2].inContact && car.wheels[2].surface !== 'tarmac') dirt.value = Math.min(1, dirt.value + (Math.abs(car.forwardSpeed) * dt) / 450);
	if (car.position.y < land.heightAt(car.position.x, car.position.z) - 8 || Math.abs(car.position.x) > land.bounds || Math.abs(car.position.z) > land.bounds) car.moveTo(START, COURSE_YAW);
	return dt;
}

// The readout: speed, gear, and how far each spring is through its travel.
const readout = {
	speed: document.getElementById('speed'),
	gear: document.getElementById('gear'),
	surface: document.getElementById('surface'),
	bars: [...document.querySelectorAll('#springs i')],
	tc: document.getElementById('tc'),
	abs: document.getElementById('abs'),
	next: 0,
};
function showReadout(now) {
	if (now < readout.next) return;
	readout.next = now + 80;
	readout.speed.textContent = String(Math.round(Math.abs(car.forwardSpeed) * 3.6));
	readout.gear.textContent = car.gear < 0 ? 'R' : String(car.gear);
	readout.surface.textContent = car.wheels[2].surface;
	car.wheels.forEach((w, i) => {
		readout.bars[i].style.transform = `scaleY(${Math.max(0.03, Math.min(1, w.travelled)).toFixed(2)})`;
	});
	readout.tc.classList.toggle('on', values.assists && car.tractionCut > 0.08);
	readout.abs.classList.toggle('on', values.assists && car.input.brake > 0 && car.wheels.some((w) => w.front && w.slipRatio < -0.13));
}

/** The car's hit a pole or a board. */
function snapped(item) {
	const speed = car.speed;
	effects.burst(item.x, item.y + 0.4, item.z, 3, 1.5 + speed * 0.1, 0.8, land.surfaceAt(item.x, item.z));
	sounds.play('snap', 0.35 + Math.min(0.65, speed / 30), 1, 1 - values.slow * 0.75);
}

function draw(real, scaled, alpha, now) {
	model.update(scaled, alpha);
	for (const f of figures) f.update(scaled);
	yard.update(scaled);
	if (land === stage) stage.update(real, camera, { object: model.object, size: car.size }, snapped);
	effects.update(car, scaled, camera);
	sounds.update(car, real, 1 - values.slow * 0.75);
	view.update(car, model.object.position, real);
	const o = model.object.position;
	sun.target.position.set(o.x, o.y, o.z);
	sun.position.set(o.x + landLook.sun.x * 110, o.y + landLook.sun.y * 110, o.z + landLook.sun.z * 110);
	showReadout(now);
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
	stage.lower();
}

let slowTime = 0;
let frameCount = 0;
function frame(now) {
	requestAnimationFrame(frame);
	const gap = now - last;
	const real = Math.min(0.1, gap / 1000);
	last = now;
	if (paused || app?.hold) return;
	accumulator += real;
	let steps = 0;
	let scaled = 0;
	while (accumulator >= STEP && steps < 8) {
		scaled += stepWorld();
		accumulator -= STEP;
		steps++;
	}
	if (steps === 8) accumulator = 0;
	frameCount++;
	if (shadowEveryOther && frameCount % 2 === 0) renderer.shadowMap.needsUpdate = true;
	draw(real, scaled, accumulator / STEP, now);
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

app = {
	world,
	RAPIER,
	stage,
	get land() {
		return land;
	},
	get view() {
		return view;
	},
	yard,
	figures,
	effects,
	dirt,
	sounds,
	camera,
	scene,
	values,
	held,
	renderer,
	script: null,
	sounds,
	stepWorld,
	lowest,
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
		if (id === 'map') {
			applyMap();
			yard.reset();
			for (const f of figures) f.reset();
			placeCar();
		} else if (id === 'view') applyView();
		else if (id !== 'slow') applyControls();
	},
};
window.__block = { app, times, renderer, block };

// Warm-up, all behind the cover: settle the world, send everything to the GPU, draw every kind of thing once.
block.progress?.(0.65, 'Settling the yard');
await breathe();
for (let i = 0; i < 120; i++) stepWorld();
// A practice fall, so the first real one has nothing new to do.
figures[0].fall({ x: 0, y: 1, z: 0 });
for (let i = 0; i < 8; i++) stepWorld();
figures[0].update(STEP);
block.progress?.(0.75, 'Preparing the pictures');
await breathe();
const gl = renderer.getContext();
stage.group.visible = true;
yard.group.visible = true;
yardSky.visible = true;
const stagePieces = stage.allPieces();
const wasDrawn = stagePieces.map((o) => [o, o.visible, o.frustumCulled]);
for (const o of stagePieces) {
	o.visible = true;
	o.frustumCulled = false;
}
effects.burst(0, 0.5, 0, 4, 1, 1, 'gravel');
effects.update(car, STEP, camera);
scene.traverse((o) => {
	const material = o.material;
	if (!material) return;
	for (const key of ['map', 'normalMap', 'roughnessMap', 'metalnessMap', 'aoMap', 'emissiveMap']) if (material[key]) renderer.initTexture(material[key]);
});
await renderer.compileAsync(scene, camera);
block.progress?.(0.88, 'Preparing the pictures');
await breathe();
renderer.render(scene, camera);
await breathe();
for (const [o, visible, culled] of wasDrawn) {
	o.visible = visible;
	o.frustumCulled = culled;
}
applyMap();
figures[0].reset();
yard.reset();
effects.reset();
events.clear();
car.moveTo(START, COURSE_YAW);
for (let i = 0; i < 180; i++) stepWorld();
yard.reset();
model.attach(car);
chase.reset(car);
applyView();
draw(STEP, STEP, 1, performance.now());
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
