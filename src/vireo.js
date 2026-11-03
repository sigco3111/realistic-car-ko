// The demo's car: real-ish numbers for what it is. Wheel positions and sizes are measured from the model, and held here too so
// tools/bench.mjs can run without loading it.
export const VIREO = {
	label: 'Vireo rally',
	engine: 'rally',
	file: 'models/vireo-rally.glb',
	// For a weak card: the same rig with 25,000 triangles instead of 66,000, and smaller pictures.
	light: 'models/vireo-rally-lod.glb',
	// The body itself: the model's bounds also count its mirrors and wing, which shouldn't hit anything.
	size: { width: 1.9, height: 1.37, length: 4.02 },
	bodySize: { width: 1.9, height: 1.37, length: 4.02 },
	travelDrawn: { bump: 0.13, droop: 0.13 },
	// The model has eye_driver, and these moving cabin parts.
	wheelTurn: 8,
	cabinGlow: 0.16,
	wheelAxis: { x: 0, y: 1, z: 0 },
	cabin: {
		rpm: { full: 9000, sweep: 4.712, sign: 1 },
		speed: { full: 220, sweep: 4.712, sign: 1 },
		throttle: -0.35,
		brake: -0.35,
		clutch: -0.35,
		handbrake: -0.35,
		gear: 0.25,
	},
	wheels: [
		{ key: 'fl', x: 0.785, y: 0.325, z: 1.26, radius: 0.325, front: true },
		{ key: 'fr', x: -0.785, y: 0.325, z: 1.26, radius: 0.325, front: true },
		{ key: 'rl', x: 0.795, y: 0.325, z: -1.26, radius: 0.325, front: false },
		{ key: 'rr', x: -0.795, y: 0.325, z: -1.26, radius: 0.325, front: false },
	],
	tune: {
		// A short, light Group B-style car with a lot of power and four-wheel drive sent rearwards.
		mass: 1100,
		comHeight: 0.5,
		frontWeight: 0.47,
		travel: 0.26,
		rest: 0.5,
		hertz: [1.4, 1.35],
		damping: [0.4, 0.4],
		antiRoll: [0.26, 0.1],
		torque: 450,
		frontDrive: 0.36,
		gears: [3.1, 2.15, 1.65, 1.3, 1.05],
		finalDrive: 4.1,
		brakeTorque: 4500,
		brakeFront: 0.58,
		handbrakeTorque: 3300,
		// The arches clear 0.6 rad; the inside wheel turns 6% more than this.
		lock: 0.56,
	},
};

/** What `new Car` needs. */
export const specOf = () => ({ wheels: VIREO.wheels, size: VIREO.size, ...VIREO.tune });
