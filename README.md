---
kind: system
engine: three
---

# Realistic car

A realistic car on Rapier at real scale and real gravity: tyres that build grip, peak and let go, suspension you can see working, an engine and gearbox, a handbrake that locks the rears, and tarmac, gravel and grass. Give it any model with separate wheels.

Rapier carries the body and answers the ray queries; everything a car does is worked out in `src/car.js` and applied as forces. The tyre follows **Dechode's** [Godot Advanced Vehicle](https://github.com/Dechode/Godot-Advanced-Vehicle), and the gearbox, suspension rates and assists follow [Godot Easy Vehicle Physics](https://github.com/DAShoe1/Godot-Easy-Vehicle-Physics) by **David Shoemaker, Dechode and Baron Wittman**, all MIT. In the live demo, drive the rally car, muscle car or pickup round a yard with a road, a tarmac circle and loose gravel. WASD drives, Space is the handbrake, R resets. Drag turns the view and scroll zooms.

Code here is MIT, art and sound are CC0.

## Use it in a game

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

To read: `car.speed`, `car.gear`, `car.rpm`, `car.sideSpeed`, and for each of `car.wheels`: `travelled` (0 at full droop, 1 fully compressed), `load` in newtons, `slip` (1 is the tyre's peak) and `surface`. `src/cars.js` has four complete cars to start a tune from, and `DEFAULTS` in `src/car.js` lists everything you can set.

## What's in it

- **Tyres:** a Pacejka curve set by its peak and its falloff (`slipCurve`). Grip against slip angle on tarmac: 0.64 at 2°, 1.05 at 7°, 0.91 at 37°. Longitudinal and lateral slip share one budget, so a locked wheel has no cornering left. Grip rises less than load does, so weight transfer changes the balance. Slip angle builds over a short rolling distance.
- **Surfaces:** `SURFACES` holds tarmac, gravel and grass: gravel grips less, peaks later and lets go gently.
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

The Vireo has all of it. The other three cars have only a steering wheel moving, in plainer cabins.

## How it measures up

Measured on the Vireo, 1,100 kg and 450 Nm, by `node tools/bench.mjs vireo`:

| | Tarmac | Gravel |
|---|---:|---:|
| 0 to 100 km/h | 3.7 s | 5.2 s |
| 100 to 0 km/h, ABS | 37.9 m, 1.02 g | 56.1 m, 0.70 g |
| 100 to 0 km/h, no ABS | 43.8 m, 0.90 g | 59.5 m, 0.67 g |
| Most grip, held at 70 km/h | 0.86 g | 0.53 g |
| Body roll there | 4.2° | 3.0° |
| Nose dive on the brakes | 3.2° | 2.2° |

## What it's bad at

- **It's a game car, not an engineering model.** The numbers are chosen to behave well, not fitted to any real tyre or car. There's no camber, tyre temperature or wear, aerodynamic downforce or engine stall.
- **The suspension is rays and forces.** Wheels have no mass of their own going up and down, so a wheel doesn't hop over rough ground.
- **Rays, not tyre shapes.** A single ray under each wheel centre means sharp kerbs and steps hit late and hard. It's only been driven on flat ground and smooth ramps.
- **No manual gears or clutch pedal.** The gearbox is automatic.
- **It costs 14 tyre steps per physics step.** That's nothing for one car; hundreds would need a lighter model.
- **The surface is looked up by you.** `surfaceAt` is called four times a step, so keep it cheap.
- **Wheels clip the arches** on the hardest landings (`bump` and `droop` on `CarModel`).
- **On a keyboard, steering is all or nothing.** The assists make up for that; with them off it's hard work, on purpose. A gamepad's analogue input isn't wired up in the demo.
- **No engine or tyre sound yet.** The demo only has impacts.

## In this repo

| | |
|---|---|
| `src/car.js` | The car: physics only, no three.js |
| `src/cars.js` | Four cars' numbers |
| `src/dirt.js` | The Vireo's dirt: `value` from clean to a whole stage of gravel |
| `src/car-model.js` | Fits any model to a car and moves its wheels |
| `src/view.js` | The chase camera |
| `src/driver-view.js` | The driver's view |
| `src/mannequin.js` | A figure that stands until hit, then a ragdoll. One draw each |
| `src/effects.js`, `src/sound.js`, `src/yard.js`, `src/demo.js` | The demo's marks, dust, impacts and yard |
| `tools/mark-check.mjs` | Checks tyre marks stay where they were laid: `node tools/mark-check.mjs <demo url>` |
| `tools/bench.mjs` | Measures any of the cars: `node tools/bench.mjs vireo --curve` |

`npm install`, then `npm run dev` for the demo or `npm run build` for `dist/`. Every part's source and licence is in `LICENCE-NOTES.md` and `CREDITS.txt`.
