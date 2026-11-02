// Writes recipe.json, the car block's demo recipe (mode browser + block): `node make-recipe.mjs`.
// demo.js reads its controls from that file.
//
// For people: which car, with its picture, then assists, grip, suspension and slow motion. WASD drives and Space is the
// handbrake. The rest is for agents, in this recipe with its range and default. `--no-images` leaves the pictures out.
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const images = !process.argv.includes('--no-images');
export const cars = [
	['rally', 'Rally car'],
	['vireo', 'Vireo rally'],
	['muscle', 'Muscle car'],
	['pickup', 'Pickup'],
];

const recipe = {
	mode: 'browser',
	block: {
		controls: [
			{
				id: 'car',
				label: 'Car',
				hint: 'A light four-wheel-drive rally car, a heavy rear-drive muscle car, or a tall soft pickup. Same simulation, different numbers.',
				type: 'choice',
				options: cars.map(([value, label]) => ({ value, label, ...(images ? { image: `thumbs/cars/${value}.webp` } : {}) })),
				default: 'rally',
				essential: true,
			},
			{ id: 'assists', label: 'Assists', hint: 'ABS, traction control and steering help. Off, full lock is full lock and the brakes will lock.', type: 'toggle', default: true, essential: true },
			{ id: 'grip', label: 'Grip', hint: 'How much all the tyres hold, on every surface. 1 is real tyres.', type: 'number', min: 0.4, max: 1.35, step: 0.05, default: 1, essential: true },
			{ id: 'stiffness', label: 'Suspension', hint: 'How stiff the springs are. Low and the body leans and dives; high and it stays flat.', type: 'number', min: 0.6, max: 2.2, step: 0.05, default: 1, essential: true },
			{ id: 'slow', label: 'Slow motion', hint: 'Slows the whole world down, the car with it. 0 is full speed; 0.9 is a tenth of it.', type: 'number', min: 0, max: 0.9, step: 0.05, default: 0, essential: true },
			{ id: 'power', label: 'Power', hint: 'The engine, as a share of what this car has.', type: 'number', min: 0.4, max: 2.5, step: 0.05, default: 1 },
			{ id: 'drive', label: 'Front drive', hint: 'How much drive goes to the front: 0 is rear drive, 1 front drive. Below 0, what this car has.', type: 'number', min: -0.05, max: 1, step: 0.05, default: -0.05 },
			{ id: 'lock', label: 'Steering lock', hint: 'How far the front wheels can turn, as a share of what this car has.', type: 'number', min: 0.5, max: 1.4, step: 0.05, default: 1 },
			{ id: 'flip_wait', label: 'Seconds on its roof', hint: 'How long it lies on its roof or side before it rights itself.', type: 'number', min: 0.5, max: 10, step: 0.5, default: 3, unit: 's' },
		],
		presets: [],
		triggers: [{ id: 'reset', label: 'Reset', hint: 'Back to the start: every control, the car, the crates, the mannequins and the view.' }],
	},
	credits: [
		{ files: 'assets/', license: 'MIT', source: 'https://github.com/Dechode/Godot-Advanced-Vehicle', author: 'Dechode (Godot Advanced Vehicle: the tyre model, ported)' },
		{ files: 'assets/', license: 'MIT', source: 'https://github.com/DAShoe1/Godot-Easy-Vehicle-Physics', author: 'David Shoemaker, Dechode and Baron Wittman (Godot Easy Vehicle Physics: gearbox, suspension rates and assists, ported)' },
		{ files: 'assets/', license: 'MIT', source: 'https://github.com/brunosimon/folio-2025', author: 'Bruno Simon (folio-2025: righting the car)' },
		{ files: 'assets/', license: 'Apache-2.0', source: 'https://github.com/dimforge/rapier.js', author: 'Dimforge (Rapier, the physics)' },
		{ files: 'assets/', license: 'MIT', source: 'https://github.com/mrdoob/three.js', author: 'three.js authors' },
		{ files: 'models/', license: 'CC0-1.0', author: 'Patch (the rally car, muscle car, pickup and mannequin)' },
		{ files: 'audio/', license: 'CC0-1.0', source: 'https://kenney.nl/assets/impact-sounds', author: 'Kenney (Impact Sounds)' },
		{ files: 'thumbs/', license: 'CC0-1.0', author: 'Patch (stills of this demo)' },
	],
};
if (process.argv[1] && path.resolve(process.argv[1]) === fileURLToPath(import.meta.url)) {
	fs.writeFileSync(path.join(here, 'recipe.json'), `${JSON.stringify(recipe, null, '\t')}\n`);
	const c = recipe.block.controls;
	console.log(`recipe.json: ${c.length} controls (${c.filter((x) => x.essential).length} essential), ${recipe.block.triggers.length} triggers`);
}
