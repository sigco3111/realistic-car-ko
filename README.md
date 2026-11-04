---
kind: system
engine: three
---

# Realistic car

A realistic car on Rapier at real scale and real gravity: tyres that build grip, peak and let go, suspension you can see working, an engine and gearbox, a handbrake that locks the rears, and tarmac, gravel and grass. Give it any model with separate wheels.

Rapier carries the body and answers the ray queries; everything a car does is worked out in `src/car.js` and applied as forces. The tyre follows **Dechode's** [Godot Advanced Vehicle](https://github.com/Dechode/Godot-Advanced-Vehicle), and the gearbox, suspension rates and assists follow [Godot Easy Vehicle Physics](https://github.com/DAShoe1/Godot-Easy-Vehicle-Physics) by **David Shoemaker, Dechode and Baron Wittman**, all MIT. In the live demo, drive the Vireo, Patch's own Group B-style rally car, on a rally stage through forest, or round the open yard. WASD drives, Space is the handbrake, V is the driver's seat, R resets. Drag turns the view and scroll zooms.

Code here is MIT, art and sound are CC0, except the stage's trees and leaves, which are MIT.

## What this owns

- **Renderer:** The game files need none. `src/car.js` is physics with no three.js, and `src/car-model.js` and `src/view.js` move three objects and a camera. Only drawing `look.object` needs a renderer, and that's yours: the model's glTF materials ran on WebGL and on forests' WebGPU renderer. The `WebGLRenderer` in `src/demo.js` is the demo's.
- **Frame loop:** It doesn't draw the frame. At 120 Hz in your own loop: `car.input = {...}`, `car.update(STEP)`, `world.step()`, `car.afterStep(STEP)`, `look.stepped()`. Each frame: `look.update(frameTime, alpha)` and `view.update(car, look.object.position, frameTime)`. Add `look.object` to your scene.
- **three:** `package.json` pins 0.186.1 and `@dimforge/rapier3d-compat` 0.17.3. `src/car.js` needs only Rapier, which you pass in.
- **Copy:** `src/car.js`, plus `src/car-model.js` and `src/view.js` for three.js, and a model with separate wheels, such as `public/models/vireo-rally.glb`.
- **Elsewhere:** The body and the wheels' rays live in the Rapier world you pass, so another block's ground has to be colliders in it. Forests' heights as a heightfield and capsules from `world.trunksNear` worked.

## Use it in a game

Start from the files below rather than `src/demo.js`. The demo is the yard, with its crates, ramps and mannequins (`yard.js`, `stage*.js`, `mannequin.js`, `stage-furniture.js`), and it talks to Patch's page through `patch-block`, which a game doesn't need. Your game supplies its own ground and scene. The car's physics and model also run on WebGPU, under `patch/forests`: Patch's guide has that recipe.

Copy `src/car.js`, which only needs Rapier, plus `src/car-model.js` and `src/view.js` if you use three.js. Your model's front must face +Z with the ground at y = 0, and its wheels must be separate nodes. **Step at 120 Hz.**

```js
import RAPIER from '@dimforge/rapier3d-compat';
import { Car } from './car.js';
import { CarModel, measureCar } from './car-model.js';
import { ChaseView } from './view.js';

await RAPIER.init();
const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
const STEP = 1 / 120;
world.timestep = STEP;

// Wheels called part_wheel_fl, fr, rl, rr, or say what yours are called.
const names = { fl: 'WheelFL', fr: 'WheelFR', rl: 'WheelRL', rr: 'WheelRR' };
const { wheels, size } = measureCar(gltf.scene, names);
const car = new Car(RAPIER, world, {
	wheels,
	size,
	mass: 1180,
	torque: 400,
	frontDrive: 0.38, // 0 is rear drive, 1 front drive
	surfaceAt: (x, z, collider) => (onRoad(x, z) ? 'tarmac' : 'gravel'),
	position: { x: 0, y: 0.1, z: 0 },
});
const look = new CarModel(gltf.scene, car, { names, steerNames: {} });
scene.add(look.object);
const view = new ChaseView(camera, car);
view.reset(car);

car.on('stuck', () => car.flip()); // Also upsideDown, rightSideUp, flip, land, takeoff, shift

// In your fixed step, 120 times a second:
function step() {
	car.input = { throttle, brake, steer, handbrake }; // throttle and brake 0 to 1, steer -1 to 1 with left positive, handbrake 0 or 1
	car.update(STEP);
	world.step();
	car.afterStep(STEP);
	look.stepped();
}
// Each frame, with alpha how far you are between the last two steps:
look.update(frameTime, alpha);
view.update(car, look.object.position, frameTime);
```

To read: `car.speed`, `car.gear`, `car.rpm`, `car.sideSpeed`, and for each of `car.wheels`: `travelled` (0 at full droop, 1 fully compressed), `load` in newtons, `slip` (1 is the tyre's peak) and `surface`. `src/vireo.js` has the Vireo's complete numbers to start a tune from, and `DEFAULTS` in `src/car.js` lists everything you can set.

## What's in it

- **Tyres:** a Pacejka curve set by its peak and its falloff (`slipCurve`). Grip against slip angle on tarmac: 0.75 at 2°, 1.20 at 7°, 1.06 at 37°. Longitudinal and lateral slip share one budget, so a locked wheel has no cornering left. Grip rises less than load does, so weight transfer changes the balance. Slip angle builds over a short rolling distance.
- **Surfaces:** `SURFACES` holds tarmac, gravel and grass: gravel grips less, peaks later and lets go gently.
- **Slides die away:** a tyre going sideways past its peak ploughs what's under it (`scrub`), so a slide scrubs off speed. The handbrake brings on a little of the foot brake too (`handbrakeDrag`), and with nothing pressed the car stops rolling rather than coasting on (`coastBrake`).
- **Suspension:** springs and dampers worked out from the ride frequency and damping ratio you ask for, separate bump and rebound, anti-roll bars and bump stops.
- **Drivetrain:** a torque curve, a clutch that slips pulling away, an automatic gearbox with a real gap in the drive while shifting, front/rear split and limited-slip differentials.
- **Brakes:** front-biased, and each wheel can lock. The handbrake locks the rears and takes them off the engine.
- **Assists, all switched by `tune.assists`:** ABS, traction control, steering that stops at the tyres' limit, and a little countersteer. They're for a keyboard.
- **Rights itself:** on its roof or side it waits, then hops and turns over.

## The driver's view

V, or the View control, swaps between the chase camera and the driver's seat. `src/driver-view.js` is the seat: `new DriverView(camera)`, then `seat(model, eye)` and `update(car, null, dt)` once a frame, with a near plane of about 0.05 m.

- **The head steadies itself.** The cabin stays fixed to the car, while 70% of its pitch and 55% of its roll reach the eye, so the horizon holds and the cabin leans round it.
- **Acceleration moves it** up to 4 cm, smoothed, and it looks a little into corners and slides. The field of view goes from 62° to 67° with speed. Drag looks round, and lets go back to the road.
- **What moves in a model:** the steering wheel on any car. With `cabin` numbers, the needles, pedals, handbrake and gear lever too (see `CarModel`). An empty called `eye_driver` is the eye; without one, say where with `eye` in `src/cars.js`.
- **From the seat:** glass thins, dust stays out of the cabin, and trim lifts a little where `cabinGlow` says.

## The rally stage

A 3.4 km loop round the open yard, with 1.1 km sealed and 2.3 km of gravel, hairpins, crests and a fast section, on 2 km square of land. Its shape is pure data in `src/stage-shape.js`; `src/stage.js` draws the land and road and makes them solid.

- **Nothing stands on the road.** Grass only grows where the land's painted as grass. Marker poles, chevron boards and rocks stand back from the edge.
- **Trees** are grown with ez-tree and drawn three ways by distance: the real tree, a thinner one, then a picture baked as it loads. Every trunk is solid.
- **Nothing ends up inside the car.** Grass lies flat under it, rocks are as solid as they look, poles and boards snap off when hit and come back on Reset, and any bough or low rock inside the car's box isn't drawn. `tools/cabin-check.mjs` counts what the land draws over solid car, from the seat and from above.
- **A weak card** gets lighter models, a quarter of the triangles (about 0.9 million at most), less grass, fewer rocks and simpler shaders, then fewer pixels and a smaller shadow if it still can't keep up.

## The sound

Real recordings only, all CC0, listed in `public/audio/CREDITS.txt`. `tools/sound-spec.py` says which recording each sound is cut from, so swapping one is a line there, then `python -I tools/fetch-sounds.py <id>` and `python -I tools/make-sounds.py`.

- **Engines** are loops at steady revs, faded from one to the next and pitched by the car's real revs. Most are cut from a pull up the revs on a dyno, bent to hold one pitch (`tools/sound_track.py`). Lifting off muffles and quietens them, and it spits a little.
- **Under the car,** road noise, gravel, squeal and wind follow speed and slip.
- **Hits** are chosen by what was hit and how hard, never the same one twice running, with the car's own body in there too.
- **From the seat,** what's outside is muffled and the engine's nearer.

`tools/make-sounds.py` reports levels, clipping and each loop's join. `tools/sound-check.mjs` measures the mix as the game plays it. Neither can say whether it sounds good: that's for ears.

## How it measures up

Measured on the Vireo, 1,100 kg and 450 Nm, by `node tools/bench.mjs`:

| | Tarmac | Gravel |
|---|---:|---:|
| 0 to 100 km/h | 3.5 s | 4.1 s |
| 100 to 0 km/h, ABS | 35.5 m, 1.08 g | 44.9 m, 0.87 g |
| 100 to 0 km/h, no ABS | 36.6 m, 1.05 g | 47.1 m, 0.84 g |
| Most grip, held at 70 km/h | 1.02 g | 0.77 g |
| Body roll there | 4.9° | 4.8° |
| Nose dive on the brakes | 3.3° | 2.6° |

How far a slide carries, by `node tools/slide-bench.mjs`:

| | Tarmac | Gravel | Grass |
|---|---:|---:|---:|
| Side-on from 90 km/h | 30.6 m | 33.9 m | 39.7 m |
| Handbrake held from 90 km/h, straight | 45.5 m | 46.2 m | 52.2 m |
| Handbrake and full lock held from 90 km/h | 30.5 m | 35.7 m | 44.4 m |
| A handbrake flick from 60 km/h, then let go | 14.2 m, 1.7 s | 17.0 m, 2.0 s | 21.7 m, 4.2 s |

## What it's bad at

- **It's a game car, not an engineering model.** The numbers are chosen to behave well, not fitted to any real tyre or car. There's no camber, tyre temperature or wear, aerodynamic downforce or engine stall.
- **The suspension is rays and forces.** Wheels have no mass of their own going up and down, so a wheel doesn't hop over rough ground.
- **Rays, not tyre shapes.** A single ray under each wheel centre means sharp kerbs and steps hit late and hard. It's been driven on smooth ramps and the stage's land, not on rough ground at any scale smaller than that.
- **No manual gears or clutch pedal.** The gearbox is automatic.
- **It costs 14 tyre steps per physics step.** That's nothing for one car; hundreds would need a lighter model.
- **The surface is looked up by you.** `surfaceAt` is called four times a step, so keep it cheap.
- **Wheels clip the arches** on the hardest landings (`bump` and `droop` on `CarModel`).
- **On a keyboard, steering is all or nothing.** The assists make up for that; with them off it's hard work, on purpose. A gamepad's analogue input isn't wired up in the demo.
- **The engines are cut from what could be found.** There's no real recording of the Vireo. Low revs fade between two recordings, a flat-four's idle and a dyno pull.
- **Off-throttle is the same recording, muffled and quieter**, not a recording of a car on overrun.
- **The handbrake isn't pure.** A real one only holds the rears; here a little foot brake comes on with it, so holding it stops the car.
- **A snapped pole just goes.** Nothing flies off, there's only some dust.
- **The light build hasn't been played on a real laptop.** Its load has been measured, on a fast card with the processor slowed, by `tools/laptop-check.mjs`.

## In this repo

| | |
|---|---|
| `src/car.js` | The car: physics only, no three.js |
| `src/vireo.js` | The Vireo's numbers |
| `src/dirt.js` | The car's dirt: `value` from clean to a whole stage of gravel |
| `src/car-model.js` | Fits any model to a car and moves its wheels |
| `src/view.js` | The chase camera |
| `src/driver-view.js` | The driver's view |
| `src/mannequin.js` | A figure that stands until hit, then a ragdoll. One draw each |
| `src/effects.js`, `src/sound.js`, `src/yard.js`, `src/demo.js` | The demo's marks, dust, impacts and yard |
| `src/stage-shape.js`, `src/stage.js`, `src/stage-forest.js`, `src/stage-furniture.js` | The rally stage: its shape, land and road, trees and grass, rocks and poles |
| `tools/stage-drive.mjs`, `tools/stage-check.mjs` | Laps the stage on autopilot, and checks its land against its road |
| `tools/cabin-check.mjs` | Counts anything on the ground drawn inside the car |
| `src/sound.js`, `tools/sound-spec.py`, `tools/make-sounds.py`, `tools/fetch-sounds.py`, `tools/sound_track.py`, `tools/sound-check.mjs` | The sound, where it comes from and its checks |
| `tools/make-board.py` | A local page of every sound and alternatives, for judging by ear |
| `tools/vibe-check.mjs` | How much the seat shakes, by surface, and where the worst jolts are |
| `tools/slide-bench.mjs` | How far slides and handbrake stops carry, on each surface |
| `tools/laptop-check.mjs` | The load on the card, and a first load with the processor slowed |
| `tools/mark-check.mjs` | Checks tyre marks stay where they were laid: `node tools/mark-check.mjs <demo url>` |
| `tools/bench.mjs` | Measures the car: `node tools/bench.mjs --curve` |

`npm install`, then `npm run dev` for the demo or `npm run build` for `dist/`. Every part's source and licence is in `LICENCE-NOTES.md` and `CREDITS.txt`.
