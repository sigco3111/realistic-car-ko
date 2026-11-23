# Where every part came from

| Part | From | Licence | In this repo |
|---|---|---|---|
| The tyre: Pacejka curve, combined slip, load sensitivity | [Godot Advanced Vehicle](https://github.com/Dechode/Godot-Advanced-Vehicle) by Dechode, `scenes/vehicle/tire_models/`, commit e055cc3 | MIT, © 2021 Dechode | ported and changed in `src/car.js`, notice in `third-party/LICENSE-godot-advanced-vehicle.txt` |
| Gearbox logic, damping ratios, anti-roll bars, brake balance, ABS, traction control, steering assists | [Godot Easy Vehicle Physics](https://github.com/DAShoe1/Godot-Easy-Vehicle-Physics), `addons/gevp/scripts/vehicle.gd` and `wheel.gd`, commit c392257 | MIT, © 2024 David Shoemaker, © 2021 Dechode, © 2024 Baron Wittman | ported and changed in `src/car.js`, notice in `third-party/LICENSE-godot-easy-vehicle-physics.txt` |
| What counts as upside down, and hopping to turn over | [folio-2025](https://github.com/brunosimon/folio-2025) by Bruno Simon, `sources/Game/Physics/PhysicsVehicle.js`, commit 41046b5 | MIT, © 2025 Bruno Simon | ported in `src/car.js`, notice in `third-party/LICENSE-folio-2025.txt` |
| A slip curve set by its falloff, tyre relaxation, wheel speeds in small steps, surfaces, the car's numbers, `tools/bench.mjs` | Patch | MIT, © 2026 Patch | `src/car.js`, `src/vireo.js`, `tools/` |
| The physics | [Rapier](https://github.com/dimforge/rapier.js) 0.17.3 by Dimforge | Apache-2.0 | through npm, notice in `third-party/LICENSE-rapier.txt` |
| three.js | the three.js authors | MIT | through npm |
| Model fitting, cameras, ragdoll, effects, sound player, yard, demo | Patch | MIT, © 2026 Patch | `src/` |
| Vireo rally, full and light models | Patch's hero car from the lab, unchanged. Its makers and sponsors are made up | CC0 | `public/models/` |
| The car's dirt | Patch, from the same model | MIT, © 2026 Patch | `src/dirt.js` |
| The mannequin | Patch's 1.8 m scale figure, at about 2,800 triangles, the same build as the crowds block | CC0, Patch | `public/models/mannequin.glb` |
| The mannequin's clips | [Quaternius, Universal Animation Library 1 and 2](https://quaternius.com/packs/universalanimationlibrary.html), retargeted | CC0 | in `mannequin.glb` |
| Every sound | Real recordings from [Freesound](https://freesound.org), each one's licence read from its own page by `tools/fetch-sounds.py`, cut, looped and levelled by `tools/make-sounds.py` from the 128 kbps previews. Each file's source and author is in `public/audio/CREDITS.txt` | CC0 | `public/audio/` |
| The stage's road and land, its shape, grass, poles, boards and gantry, and the banners' made-up names | Patch | MIT, © 2026 Patch | `src/stage*.js` |
| Road gravel | [Forest Ground 04](https://polyhaven.com/a/forest_ground_04) by Rob Tuytel and Rico Cilliers, Poly Haven, shrunk | CC0 | `public/stage/gravel-*.webp` |
| Sealed road | [Asphalt 02](https://polyhaven.com/a/asphalt_02) by Rob Tuytel, Poly Haven, shrunk | CC0 | `public/stage/asphalt-*.webp` |
| Forest floor | [Forest Leaves 02](https://polyhaven.com/a/forest_leaves_02) by Rob Tuytel, Poly Haven, shrunk | CC0 | `public/stage/forest-*.webp` |
| Meadow | [Leafy Grass](https://polyhaven.com/a/leafy_grass) by Charlotte Baglioni, Poly Haven, shrunk | CC0 | `public/stage/grass-*.webp` |
| Bare rock | [Lichen Rock](https://polyhaven.com/a/lichen_rock) by Rico Cilliers, Poly Haven, shrunk | CC0 | `public/stage/rock-*.webp` |
| The sky | [Kloofendal 38d Partly Cloudy (Pure Sky)](https://polyhaven.com/a/kloofendal_38d_partly_cloudy_puresky) by Greg Zaal and Jarod Guest, Poly Haven, its upper half toned for the screen | CC0 | `public/stage/sky.webp`, `sky.json` |
| Boulders | [Rock Moss Set 01](https://polyhaven.com/a/rock_moss_set_01) by Kless Gyzen, Poly Haven, simplified with textures shrunk (`tools/make-rocks.mjs`) | CC0 | `public/stage/rocks.glb` |
| Pines and aspens | grown with [ez-tree](https://github.com/dgreenheck/ez-tree) by Daniel Greenheck, through Patch's Tree generator block (`tools/make-trees.mjs`) | MIT, © 2024 Daniel Greenheck | `public/stage/trees.bin`, `trees.json`, notice in `third-party/LICENSE-ez-tree.txt` |
| Pine and aspen leaves | ez-tree's, copied from Patch's Forests block | MIT, © 2024 Daniel Greenheck | `public/stage/*-leaf.webp` |
| Bark | [ambientCG](https://ambientcg.com) Bark 003 (pine) and Bark 002 (aspen), copied from Patch's Forests block | CC0 | `public/stage/bark-*.webp` |

The yard's ground, containers, ramps, crates, drums, cones, grass, trees and sky are all drawn by `src/yard.js` and `src/demo.js`. Nothing from Poly Haven is included whole: `tools/fetch-stage-assets.mjs` downloads the originals, and they stay out of the repo.

No art, models or sound from those projects are here. Godot Easy Vehicle Physics' demo car is Kenney's and isn't used. GPL simulators such as TORCS and Speed Dreams were not looked at for code.
