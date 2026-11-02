// Writes recipe.json, the car block's demo recipe (mode browser + block): `node make-recipe.mjs`.
// demo.js reads its controls from that file.
//
// For people: which car, with its picture, then grip, power and slow motion. WASD drives. The rest is for agents, in this
// recipe with its range and default. `--no-images` leaves the pictures out.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const images = !process.argv.includes('--no-images');
export const cars = [
	['muscle', 'Muscle car'],
	['rally', 'Rally car'],
	['pickup', 'Pickup'],
];

const recipe = {
	mode: 'browser',
	block: {
		controls: [
			{
				id: 'car',
				label: 'Car',
				hint: 'Which car you drive: a long muscle car, a short quick rally car, or a tall heavy pickup. Same driving code on all three, worked out from each one\'s size.',
				type: 'choice',
				options: cars.map(([value, label]) => ({ value, label, ...(images ? { image: `thumbs/cars/${value}.webp` } : {}) })),
				default: 'muscle',
				essential: true,
			},
			{ id: 'grip', label: 'Grip', hint: 'How hard the tyres hold. Low and it slides wide through every turn; high and it goes where it points.', type: 'number', min: 0.2, max: 2, step: 0.05, default: 1, essential: true },
			{ id: 'power', label: 'Power', hint: 'The engine and its top speed together.', type: 'number', min: 0.3, max: 2, step: 0.05, default: 1, essential: true },
			{ id: 'slow', label: 'Slow motion', hint: 'Slows the whole world down, the car with it. 0 is full speed; 0.9 is a tenth of it.', type: 'number', min: 0, max: 0.9, step: 0.05, default: 0, essential: true },
			{ id: 'gravity', label: 'Car gravity', hint: 'What pulls on the car; the rest follows from this and its length. 65 moves as folio-2025's 3 m car does; 9.8 like a real car.', type: 'number', min: 9.8, max: 65, step: 0.2, default: 40, unit: 'm/s²' },
			{ id: 'steering', label: 'Full lock', hint: 'How far the front wheels turn, in radians.', type: 'number', min: 0.2, max: 0.9, step: 0.01, default: 0.5, unit: 'rad' },
			{ id: 'boost', label: 'Boost', hint: 'How many times the engine boost adds. 0 turns it off.', type: 'number', min: 0, max: 5, step: 0.1, default: 2 },
			{ id: 'flip_wait', label: 'Seconds on its roof', hint: 'How long it lies upside down before it rights itself.', type: 'number', min: 0.2, max: 8, step: 0.1, default: 2, unit: 's' },
		],
		presets: [],
		triggers: [{ id: 'reset', label: 'Reset', hint: 'Back to the start: every control, the car, the crates, the mannequin and the view.' }],
	},
	credits: [
		{ files: 'assets/', license: 'MIT', source: 'https://github.com/brunosimon/folio-2025', author: 'Bruno Simon (folio-2025: the driving and the camera, ported)' },
		{ files: 'assets/', license: 'Apache-2.0', source: 'https://github.com/dimforge/rapier.js', author: 'Dimforge (Rapier, the physics)' },
		{ files: 'assets/', license: 'MIT', source: 'https://github.com/mrdoob/three.js', author: 'three.js authors' },
		{ files: 'models/', license: 'CC0-1.0', author: 'Patch (the muscle car, rally car, pickup and mannequin)' },
		{ files: 'thumbs/', license: 'CC0-1.0', author: 'Patch (stills of this demo)' },
	],
};
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	fs.writeFileSync(path.join(here, 'recipe.json'), `${JSON.stringify(recipe, null, '\t')}\n`);
	const c = recipe.block.controls;
	console.log(`recipe.json: ${c.length} controls (${c.filter((x) => x.essential).length} essential), ${recipe.block.triggers.length} triggers`);
}
