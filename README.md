---
kind: system
engine: three
---

# Drivable car

A raycast car on Rapier that's a joy to drive, at full size: instant steering, a big jump, boost, and it rights itself when it lands on its roof. Give it any model with separate wheels.

The driving is [folio-2025](https://github.com/brunosimon/folio-2025)'s by **Bruno Simon** (MIT), ported and retuned from his 3 m toy to any length, with every number worked out from the car's size. In the live demo, drive our muscle car, rally car or pickup round a yard, over ramps, through crates and into mannequins, which go flying as Rapier ragdolls. WASD drives, Shift boosts, Space jumps, B brakes and R resets. Drag turns the view and scroll zooms.

Driving and camera: folio-2025 by Bruno Simon (MIT), on Rapier (Apache-2.0). Code here is MIT, art and sound are CC0.

## Use it in a game

Copy `src/car.js`, which only needs Rapier, plus `src/car-model.js` and `src/view.js` if you use three.js. Your model's front must face +Z with the ground at y = 0, and its wheels must be separate nodes.

```js
import RAPIER from '@dimforge/rapier3d-compat';
import { Car } from './car.js';
import { CarModel, measureCar } from './car-model.js';
import { CarView } from './view.js';

await RAPIER.init();
const world = new RAPIER.World({ x: 0, y: -9.81, z: 0 });
const STEP = 1 / 60;
world.timestep = STEP;

// Wheels called part_wheel_fl, fr, rl, rr, or say what yours are called.
const names = { fl: 'WheelFL', fr: 'WheelFR', rl: 'WheelRL', rr: 'WheelRR' };
const { wheels, size } = measureCar(gltf.scene, names);
const car = new Car(RAPIER, world, { wheels, size, mass: 1400, gravity: 40, position: { x: 0, y: 0.1, z: 0 } });
const look = new CarModel(gltf.scene, car, { names, steerNames: {} });
scene.add(look.object);
const view = new CarView(camera, car.tune);
view.reset(car.position);

car.on('upsideDown', () => {}); // also rightSideUp, flip, stuck, unstuck, land, takeoff
car.on('stuck', () => car.flip()); // Or put it back somewhere: car.moveTo(place, yaw)

// In your fixed step, 60 times a second:
function step() {
	car.input = { throttle, steer, boost, brake, jump }; // throttle and steer from -1 to 1, the rest 0 or 1. Positive steer is left.
	car.update(STEP);
	world.step();
	car.afterStep(STEP);
	look.stepped();
}
// Each frame, with alpha how far you are between the last two steps:
look.update(frameTime, alpha);
view.update(look.object.position, frameTime);
```

Hold `jump` for about 0.18 s, not for as long as the key is down, or the car stands on stilts.

## Tuning it

`gravity` is the one choice that matters: it's what pulls on the chassis, in m/s². Every other number comes from it and the car's length (`tuneFor`), so the car stays balanced whatever you pick.

| `gravity` | A 5 m car |
|---|---|
| 65 | Moves as folio's 3 m car does: 90° of full lock in 1.02 s against its 1.00 |
| 40 | The demo's default: 90° in 1.28 s, most of the quickness and still a car |
| 26 | Reads as a real heavy car: 90° in 1.57 s |
| 9.8 | Real gravity, slow and floaty beside the others |

It only acts on the chassis, through its gravity scale, so crates and bodies keep your world's gravity. Change anything else in `car.tune`, then call `car.applyTune()`. `frictionSlip` is grip, `engine` and `topSpeed` are power, `steering` is full lock in radians.

**What folio's feel is made of**, in case you retune it, all measured in `tools/bench.mjs`, which runs folio's own numbers beside ours on the same scripted keys:

- Folio's world runs at double speed, so to the eye its gravity is about 4 g on a 3 m car. That's most of it.
- Steering is instant, with the same full lock at every speed. There's no gearbox, and all four wheels drive.
- Grip, engine and suspension are per kilogram. Mass only decides how far things fly when hit.
- The camera is high up on a long lens, always facing the same way. It doesn't swing round behind the car.

**Collisions:** to throw things rather than push them, pass `groups: { body, bumper }`. The bumper is a slightly bigger box that only touches loose objects, so they get hit before the body arrives. `src/demo.js` has the collision groups. The rays ignore anything dynamic and any sensor, so the car hits a crate rather than climbing it.

## What it's bad at

- **It isn't a simulation.** There's no gearbox, tyre model, differential or weight transfer to speak of, and all four wheels are the same.
- **It doesn't really drift.** Past the grip limit it mostly runs wide, with about 5° of slide. Low grip slides more, but there's no handbrake turn or countersteer assist.
- **High gravity lands hard.** The chassis falls faster than the world around it, which you may notice next to slower debris.
- **Very fast.** With boost at the default it passes 60 m/s, so it needs a big world: the yard is 300 m across. Lower `power` or `topSpeedBoost` for small levels.
- **A long car on boost rears up until its tail touches.** Folio's short car rears much further. Lower `comHeight` to keep the nose down.
- **Bumps.** It's only been driven on flat ground and smooth ramps. Rough terrain isn't tested.
- **Wheels clip the arches** on the hardest landings, because the drawn wheel stops at the arch and the physics doesn't (`bump` and `droop` on `CarModel`).
- **Rapier's version changes it.** This is tuned on 0.17.3, the version folio ships. On 0.21, folio's own car stays much flatter on boost, so re-check the feel if you upgrade.
- **Fixed step.** Run it at 60 steps a second, smaller for slow motion. Its ride height allows for the step size, but its tune was only measured at 60.
- **No engine or tyre sound yet.** The demo only has impacts.

## In this repo

| | |
|---|---|
| `src/car.js` | The car: physics only, no three.js |
| `src/car-model.js` | Fits any model to a car and moves its wheels |
| `src/view.js` | The camera |
| `src/mannequin.js` | A figure that stands until hit, then a ragdoll. One draw each |
| `src/effects.js`, `src/sound.js`, `src/yard.js`, `src/demo.js` | The demo's marks, dust, trails, impacts and yard |
| `tools/bench.mjs` | Folio's numbers beside ours: `node tools/bench.mjs` |

`npm install`, then `npm run dev` for the demo or `npm run build` for `dist/`. Every part's source and licence is in `LICENCE-NOTES.md` and `CREDITS.txt`.
