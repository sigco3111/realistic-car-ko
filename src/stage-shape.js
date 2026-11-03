// The shape of the rally stage, as plain numbers: where the road runs, how high the land is, what's underfoot and where things
// grow. Nothing here draws anything, so it can be measured from Node (tools/stage-check.mjs). The open space in the middle is the
// yard's own footprint, flat at height 0, and the road leaves its tarmac lane at one end and comes back in at the other.
import { place, surfaceAt as yardSurfaceAt, YARD } from './yard.js';

export const WORLD = 1000; // half its width, m
export const CELL = 4; // metres between the land's heights
export const SIZE = (WORLD * 2) / CELL + 1; // heights along a side

const smooth = (a, b, x) => {
	const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
	return t * t * (3 - 2 * t);
};

// Value noise, seeded and smooth, from a table: the same land every time.
const TABLE = new Float32Array(65536);
{
	let s = 271828;
	for (let i = 0; i < 65536; i++) {
		s = (s * 1664525 + 1013904223) >>> 0;
		TABLE[i] = s / 4294967296;
	}
}
function noise(x, z) {
	const ix = Math.floor(x);
	const iz = Math.floor(z);
	const fx = x - ix;
	const fz = z - iz;
	const u = fx * fx * (3 - 2 * fx);
	const v = fz * fz * (3 - 2 * fz);
	const at = (a, b) => TABLE[(a * 251 + b * 65423) & 65535];
	const low = at(ix, iz) + (at(ix + 1, iz) - at(ix, iz)) * u;
	const high = at(ix, iz + 1) + (at(ix + 1, iz + 1) - at(ix, iz + 1)) * u;
	return low + (high - low) * v;
}
export function fbm(x, z, octaves = 4) {
	let sum = 0;
	let amp = 0.5;
	let f = 1;
	for (let i = 0; i < octaves; i++) {
		sum += amp * noise(x * f + i * 37.1, z * f - i * 11.3);
		amp *= 0.5;
		f *= 2.03;
	}
	return sum;
}

/** How far outside the flat open space a point is. */
const outsideYard = (x, z) => Math.max(0, Math.abs(x) - YARD - 6, Math.abs(z) - YARD - 6);

/** The rolling land before the road's been cut into it. */
function hills(x, z) {
	const broad = (fbm(x / 520, z / 520, 3) - 0.44) * 120;
	const close = (fbm(x / 120, z / 120, 4) - 0.47) * 26;
	// The far edge rises, to close the view with ridges.
	const rim = smooth(620, 980, Math.max(Math.abs(x), Math.abs(z))) * 70;
	return (broad + close + rim) * smooth(6, 130, outsideYard(x, z));
}

// The road, in the yard's own lengthways (u) and sideways (v) metres, from the lane's far end right round to its near end.
// s: sealed. width is its half width. Written to be driven: fast out, sweepers, a hairpin pair, a long jumpy straight, a tight
// wooded section, and a fast sealed run home.
const WAY = [
	[140, 0, 's', 5.2],
	[230, 1, 's', 4.6],
	[330, -6, 's', 4.4],
	[430, -20, 's', 4.4],
	[525, -62, 's', 4.4],
	[590, -135, 's', 4.4],
	[612, -225, 'g', 4.2],
	[572, -300, 'g', 4.2],
	[490, -322, 'g', 4.2],
	[415, -296, 'g', 4.4],
	[352, -304, 'g', 5],
	[322, -326, 'g', 6],
	[326, -358, 'g', 6],
	[356, -372, 'g', 5],
	[452, -424, 'g', 4.2],
	[540, -486, 'g', 4.4],
	[574, -544, 'g', 5.6],
	[566, -586, 'g', 6],
	[530, -606, 'g', 5.6],
	[420, -606, 'g', 4.2],
	[285, -584, 'g', 4.2],
	[165, -548, 'g', 4.2],
	[50, -592, 'g', 4.2],
	[-70, -540, 'g', 4.2],
	[-190, -578, 'g', 4.2],
	[-300, -520, 'g', 4.4],
	[-390, -566, 'g', 4.4],
	[-498, -530, 'g', 4.4],
	[-586, -440, 'g', 4.4],
	[-560, -344, 'g', 4.2],
	[-612, -252, 'g', 4.2],
	[-566, -160, 's', 4.4],
	[-462, -70, 's', 4.4],
	[-330, -14, 's', 4.6],
	[-210, -1, 's', 5.2],
	[-135, 0, 's', 8],
];
// Where it lifts over a crest: how far round the road (0 to 1), how high, how long. The sharp ones throw the car.
const CRESTS = [
	[0.1, 1.6, 34],
	[0.16, 1.2, 40],
	[0.3, 1.5, 26],
	[0.46, 1.1, 30],
	[0.52, 1.9, 16],
	[0.58, 1.4, 22],
	[0.64, 1.9, 18],
	[0.72, 1.3, 24],
	[0.9, 1.6, 40],
];

const STEP = 2; // metres between the road's points

/** Runs a closed-off spline through WAY and returns a point every STEP metres. */
function layRoad() {
	const pts = WAY.map(([u, v, kind, half]) => {
		const p = place(u, v);
		return { x: p.x, z: p.z, sealed: kind === 's' ? 1 : 0, half };
	});
	// Straight on at both ends, along the lane.
	const lead = place(100, 0);
	const tail = place(-100, 0);
	const list = [{ ...pts[0], x: lead.x, z: lead.z }, ...pts, { ...pts[pts.length - 1], x: tail.x, z: tail.z }];
	const fine = [];
	for (let i = 1; i < list.length - 2; i++) {
		const [a, b, c, d] = [list[i - 1], list[i], list[i + 1], list[i + 2]];
		for (let k = 0; k < 40; k++) {
			const t = k / 40;
			const t2 = t * t;
			const t3 = t2 * t;
			const blend = (m) => 0.5 * (2 * b[m] + (c[m] - a[m]) * t + (2 * a[m] - 5 * b[m] + 4 * c[m] - d[m]) * t2 + (3 * b[m] - a[m] - 3 * c[m] + d[m]) * t3);
			fine.push({ x: blend('x'), z: blend('z'), sealed: b.sealed + (c.sealed - b.sealed) * smooth(0.2, 0.8, t), half: b.half + (c.half - b.half) * t });
		}
	}
	fine.push({ ...list[list.length - 2] });
	const road = [];
	let carried = 0;
	let s = 0;
	for (let i = 0; i < fine.length - 1; i++) {
		const a = fine[i];
		const b = fine[i + 1];
		const len = Math.hypot(b.x - a.x, b.z - a.z);
		while (carried <= len) {
			const t = carried / (len || 1);
			road.push({ x: a.x + (b.x - a.x) * t, z: a.z + (b.z - a.z) * t, sealed: a.sealed + (b.sealed - a.sealed) * t, half: a.half + (b.half - a.half) * t, s: s + carried });
			carried += STEP;
		}
		carried -= len;
		s += len;
	}
	const length = s;
	// Heights: the hills with their bumps ironed out, then the crests, coming down to the flat at both ends.
	const raw = road.map((p) => hills(p.x, p.z));
	const window = 34;
	for (let i = 0; i < road.length; i++) {
		let sum = 0;
		let n = 0;
		for (let j = Math.max(0, i - window); j <= Math.min(road.length - 1, i + window); j++) {
			sum += raw[j];
			n++;
		}
		const p = road[i];
		let y = sum / n;
		for (const [at, high, long] of CRESTS) {
			const d = (p.s - at * length) / long;
			y += high * Math.exp(-d * d);
		}
		const ends = smooth(0, 90, p.s) * smooth(0, 90, length - p.s);
		p.y = y * ends;
	}
	// Direction, sideways and lean into the bends.
	for (let i = 0; i < road.length; i++) {
		const a = road[Math.max(0, i - 2)];
		const b = road[Math.min(road.length - 1, i + 2)];
		const len = Math.hypot(b.x - a.x, b.z - a.z) || 1;
		const p = road[i];
		p.dx = (b.x - a.x) / len;
		p.dz = (b.z - a.z) / len;
		p.sx = p.dz;
		p.sz = -p.dx;
	}
	const bend = road.map((p, i) => {
		const a = road[Math.max(0, i - 6)];
		const b = road[Math.min(road.length - 1, i + 6)];
		return (a.dx * b.dz - a.dz * b.dx) / 24;
	});
	road.forEach((p, i) => {
		let sum = 0;
		let n = 0;
		for (let j = Math.max(0, i - 8); j <= Math.min(road.length - 1, i + 8); j++) {
			sum += bend[j];
			n++;
		}
		p.bend = sum / n;
		p.bank = Math.max(-0.03, Math.min(0.03, -p.bend * 0.8));
	});
	return { points: road, length };
}

/** Everything about the land, worked out once. */
export function shapeStage() {
	const road = layRoad();
	const n = SIZE;
	const heights = new Float32Array(n * n);
	const toRoad = new Float32Array(n * n).fill(1e6);
	const roadY = new Float32Array(n * n);
	const roadHalf = new Float32Array(n * n);
	// Each road point stamps the land near it with how far away the road is, and how high.
	const REACH = 30;
	const cellsOut = Math.ceil(REACH / CELL);
	for (const p of road.points) {
		const cx = Math.round((p.x + WORLD) / CELL);
		const cz = Math.round((p.z + WORLD) / CELL);
		for (let j = Math.max(0, cz - cellsOut); j <= Math.min(n - 1, cz + cellsOut); j++) {
			for (let i = Math.max(0, cx - cellsOut); i <= Math.min(n - 1, cx + cellsOut); i++) {
				const x = i * CELL - WORLD;
				const z = j * CELL - WORLD;
				const d = Math.hypot(x - p.x, z - p.z);
				const k = j * n + i;
				if (d < toRoad[k]) {
					toRoad[k] = d;
					roadY[k] = p.y;
					roadHalf[k] = p.half;
				}
			}
		}
	}
	for (let j = 0; j < n; j++) {
		for (let i = 0; i < n; i++) {
			const k = j * n + i;
			const x = i * CELL - WORLD;
			const z = j * CELL - WORLD;
			let y = hills(x, z);
			if (toRoad[k] < REACH) {
				// A level bed under the road, just below it, then the land coming back: cuttings going through a rise, a bank across a dip.
				const near = roadHalf[k] + 5.5;
				const t = smooth(near, REACH, toRoad[k]);
				y = roadY[k] - 0.2 + (y - (roadY[k] - 0.2)) * t;
			}
			heights[k] = y;
		}
	}
	const heightAt = (x, z) => {
		const fx = Math.min(n - 1.001, Math.max(0, (x + WORLD) / CELL));
		const fz = Math.min(n - 1.001, Math.max(0, (z + WORLD) / CELL));
		const i = Math.floor(fx);
		const j = Math.floor(fz);
		const u = fx - i;
		const v = fz - j;
		const k = j * n + i;
		const a = heights[k];
		const b = heights[k + 1];
		const c = heights[k + n];
		const d = heights[k + n + 1];
		return (a + (b - a) * u) * (1 - v) + (c + (d - c) * u) * v;
	};
	const slopeAt = (x, z) => {
		const e = CELL;
		return Math.hypot(heightAt(x + e, z) - heightAt(x - e, z), heightAt(x, z + e) - heightAt(x, z - e)) / (2 * e);
	};
	const distanceAt = (x, z) => {
		const i = Math.round((x + WORLD) / CELL);
		const j = Math.round((z + WORLD) / CELL);
		if (i < 0 || j < 0 || i >= n || j >= n) return 1e6;
		return toRoad[j * n + i];
	};

	// What's underfoot, every 2 m, off the road and on it.
	const G = WORLD + 1;
	const ground = new Uint8Array(G * G);
	const inYard = (x, z) => Math.abs(x) < YARD && Math.abs(z) < YARD;
	const CODES = { grass: 0, gravel: 1, tarmac: 2 };
	const NAMES = ['grass', 'gravel', 'tarmac'];
	for (const p of road.points) {
		const r = p.half + 0.8;
		const cells = Math.ceil(r / 2);
		const cx = Math.round((p.x + WORLD) / 2);
		const cz = Math.round((p.z + WORLD) / 2);
		for (let j = cz - cells; j <= cz + cells; j++) {
			for (let i = cx - cells; i <= cx + cells; i++) {
				if (i < 0 || j < 0 || i >= G || j >= G) continue;
				if (Math.hypot(i * 2 - WORLD - p.x, j * 2 - WORLD - p.z) <= r) ground[j * G + i] = p.sealed > 0.5 ? CODES.tarmac : CODES.gravel;
			}
		}
	}
	const surfaceAt = (x, z) => {
		if (inYard(x, z)) return yardSurfaceAt(x, z);
		const i = Math.round((x + WORLD) / 2);
		const j = Math.round((z + WORLD) / 2);
		if (i < 0 || j < 0 || i >= G || j >= G) return 'grass';
		return NAMES[ground[j * G + i]];
	};

	/** How much of a wood a place is: 0 open to 1 deep in the trees. */
	const woodAt = (x, z) => {
		const patch = smooth(0.42, 0.56, fbm(x / 190 + 40, z / 190 - 12, 3));
		return patch * smooth(8, 26, distanceAt(x, z) - 2) * smooth(14, 40, outsideYard(x, z));
	};

	return { road, heights, heightAt, slopeAt, distanceAt, surfaceAt, woodAt, inYard, outsideYard };
}
