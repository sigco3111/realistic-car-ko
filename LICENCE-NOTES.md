# Where every part came from

| Part | From | Licence | In this repo |
|---|---|---|---|
| The driving: engine, brakes, suspension, jump, upside-down and stuck tests | [folio-2025](https://github.com/brunosimon/folio-2025) by Bruno Simon, `sources/Game/Physics/PhysicsVehicle.js` and `Player.js`, commit 41046b5 | MIT, © 2025 Bruno Simon | ported in `src/car.js`, notice in `third-party/LICENSE-folio-2025.txt` |
| The camera | the same repo, `sources/Game/View.js` | MIT, © 2025 Bruno Simon | ported in `src/view.js` |
| Scaling to any size, the flip's sums, `tools/bench.mjs` | Patch | MIT, © 2026 Patch | `src/car.js`, `tools/` |
| The physics | [Rapier](https://github.com/dimforge/rapier.js) 0.17.3 by Dimforge | Apache-2.0 | through npm, notice in `third-party/LICENSE-rapier.txt` |
| three.js | the three.js authors | MIT | through npm |
| Model fitting, ragdoll, effects, sound player, yard, demo | Patch | MIT, © 2026 Patch | `src/` |
| Muscle car, rally car, pickup | Patch, from the lab's approved models, textures shrunk (`make-models.mjs`) | CC0 | `public/models/` |
| The mannequin | Patch's 1.8 m scale figure, at about 2,800 triangles, the same build as the crowds block | CC0, Patch | `public/models/mannequin.glb` |
| The mannequin's clips | [Quaternius, Universal Animation Library 1 and 2](https://quaternius.com/packs/universalanimationlibrary.html), retargeted | CC0 | in `mannequin.glb` |
| Impact sounds | [Kenney, Impact Sounds](https://kenney.nl/assets/impact-sounds), from Patch's mirror, unedited | CC0 | `public/audio/` |
| The Car choice's pictures | stills of this demo (`make-thumbs.mjs`) | CC0, Patch | `thumbs/cars/` |

The yard's ground, containers, ramps, crates, drums, cones, grass, trees and sky are all drawn by `src/yard.js` and `src/demo.js`.

Only folio-2025's driving and camera code was used. Its art and sound were not copied: its `static/sounds/` folder has a licence of its own.
