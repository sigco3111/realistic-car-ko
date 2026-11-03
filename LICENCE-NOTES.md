# Where every part came from

| Part | From | Licence | In this repo |
|---|---|---|---|
| The tyre: Pacejka curve, combined slip, load sensitivity | [Godot Advanced Vehicle](https://github.com/Dechode/Godot-Advanced-Vehicle) by Dechode, `scenes/vehicle/tire_models/`, commit e055cc3 | MIT, © 2021 Dechode | ported and changed in `src/car.js`, notice in `third-party/LICENSE-godot-advanced-vehicle.txt` |
| Gearbox logic, damping ratios, anti-roll bars, brake balance, ABS, traction control, steering assists | [Godot Easy Vehicle Physics](https://github.com/DAShoe1/Godot-Easy-Vehicle-Physics), `addons/gevp/scripts/vehicle.gd` and `wheel.gd`, commit c392257 | MIT, © 2024 David Shoemaker, © 2021 Dechode, © 2024 Baron Wittman | ported and changed in `src/car.js`, notice in `third-party/LICENSE-godot-easy-vehicle-physics.txt` |
| What counts as upside down, and hopping to turn over | [folio-2025](https://github.com/brunosimon/folio-2025) by Bruno Simon, `sources/Game/Physics/PhysicsVehicle.js`, commit 41046b5 | MIT, © 2025 Bruno Simon | ported in `src/car.js`, notice in `third-party/LICENSE-folio-2025.txt` |
| A slip curve set by its falloff, tyre relaxation, wheel speeds in small steps, surfaces, the cars' numbers, `tools/bench.mjs` | Patch | MIT, © 2026 Patch | `src/car.js`, `src/cars.js`, `tools/` |
| The physics | [Rapier](https://github.com/dimforge/rapier.js) 0.17.3 by Dimforge | Apache-2.0 | through npm, notice in `third-party/LICENSE-rapier.txt` |
| three.js | the three.js authors | MIT | through npm |
| Model fitting, cameras, ragdoll, effects, sound player, yard, demo | Patch | MIT, © 2026 Patch | `src/` |
| Vireo rally, full and light models | Patch's hero car from the lab, unchanged | CC0 | `public/models/` |
| The Vireo's dirt | Patch, from the same model | MIT, © 2026 Patch | `src/dirt.js` |
| Rally car, muscle car, pickup | Patch, from the lab's approved models, textures shrunk (`make-models.mjs`) | CC0 | `public/models/` |
| The mannequin | Patch's 1.8 m scale figure, at about 2,800 triangles, the same build as the crowds block | CC0, Patch | `public/models/mannequin.glb` |
| The mannequin's clips | [Quaternius, Universal Animation Library 1 and 2](https://quaternius.com/packs/universalanimationlibrary.html), retargeted | CC0 | in `mannequin.glb` |
| Impact sounds | [Kenney, Impact Sounds](https://kenney.nl/assets/impact-sounds), from Patch's mirror, unedited | CC0 | `public/audio/` |
| The Car choice's pictures | stills of this demo (`make-thumbs.mjs`) | CC0, Patch | `thumbs/cars/` |

The yard's ground, containers, ramps, crates, drums, cones, grass, trees and sky are all drawn by `src/yard.js` and `src/demo.js`.

No art, models or sound from those projects are here. Godot Easy Vehicle Physics' demo car is Kenney's and isn't used. GPL simulators such as TORCS and Speed Dreams were not looked at for code.
