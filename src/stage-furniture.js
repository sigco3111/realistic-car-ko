// What makes it a rally stage and not just a road: boulders from real scans, marker poles down both sides, chevron boards on the
// outside of the tight corners, and a start gantry over the lane. Nothing stands on the road. Rocks are as solid as they look, and poles
// and boards snap off when they're hit, so nothing ends up inside the car.
import {
	BoxGeometry,
	CanvasTexture,
	Color,
	CylinderGeometry,
	InstancedMesh,
	Matrix4,
	Mesh,
	MeshStandardMaterial,
	PlaneGeometry,
	Quaternion,
	RepeatWrapping,
	SRGBColorSpace,
	Vector3,
} from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { place, COURSE_YAW } from './yard.js';
import { fbm, WORLD } from './stage-shape.js';
import { keepOutOfCar } from './stage-forest.js';

const up = new Vector3(0, 1, 0);

/** The farthest points of a shape in many directions: a few dozen, for a solid hull that's as big as what's drawn. */
function outline(geometry) {
	const at = geometry.attributes.position;
	const out = [];
	const seen = new Set();
	for (let i = 0; i < 9; i++) {
		const y = -1 + (i + 0.5) / 4.5;
		const around = Math.sqrt(1 - y * y);
		for (let j = 0; j < 8; j++) {
			const a = (j / 8) * 6.283 + i;
			const dx = Math.cos(a) * around;
			const dz = Math.sin(a) * around;
			let best = 0;
			let far = -Infinity;
			for (let v = 0; v < at.count; v++) {
				const d = at.getX(v) * dx + at.getY(v) * y + at.getZ(v) * dz;
				if (d > far) {
					far = d;
					best = v;
				}
			}
			if (seen.has(best)) continue;
			seen.add(best);
			out.push(at.getX(best), at.getY(best), at.getZ(best));
		}
	}
	return out;
}

function chevronTexture() {
	const canvas = document.createElement('canvas');
	canvas.width = 256;
	canvas.height = 128;
	const g = canvas.getContext('2d');
	g.fillStyle = '#f2efe6';
	g.fillRect(0, 0, 256, 128);
	g.fillStyle = '#c8321f';
	for (let i = -1; i < 4; i++) {
		const x = i * 80 + 16;
		g.beginPath();
		g.moveTo(x, 0);
		g.lineTo(x + 40, 0);
		g.lineTo(x + 92, 64);
		g.lineTo(x + 40, 128);
		g.lineTo(x, 128);
		g.lineTo(x + 52, 64);
		g.closePath();
		g.fill();
	}
	const t = new CanvasTexture(canvas);
	t.colorSpace = SRGBColorSpace;
	return t;
}

function bannerTexture() {
	const canvas = document.createElement('canvas');
	canvas.width = 2048;
	canvas.height = 256;
	const g = canvas.getContext('2d');
	g.fillStyle = '#14242b';
	g.fillRect(0, 0, 2048, 256);
	g.fillStyle = '#e8622b';
	g.fillRect(0, 206, 2048, 22);
	g.fillStyle = '#e8b53a';
	g.fillRect(0, 228, 2048, 12);
	g.fillStyle = '#f2efe6';
	g.font = '800 128px "Arial Narrow", Arial, sans-serif';
	g.textAlign = 'center';
	g.textBaseline = 'middle';
	g.fillText('NORDVIK RALLY', 720, 108);
	g.font = '700 84px "Arial Narrow", Arial, sans-serif';
	g.fillStyle = '#e8b53a';
	g.fillText('ORLA TYRES', 1560, 108);
	const t = new CanvasTexture(canvas);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = 8;
	return t;
}

export async function addFurniture({ R, group, shape, solid, light }) {
	const road = shape.road.points;
	const matrix = new Matrix4();
	const q = new Quaternion();
	const p = new Vector3();
	const s = new Vector3();
	let seed = 424243;
	const random = () => {
		seed = (seed * 1664525 + 1013904223) >>> 0;
		return seed / 4294967296;
	};

	// What snaps off when the car hits it, by where it stands, to find quickly.
	const CELL_SIZE = 8;
	const cells = new Map();
	const broken = [];
	const cellOf = (x, z) => (Math.floor((x + WORLD) / CELL_SIZE) << 12) | Math.floor((z + WORLD) / CELL_SIZE);
	const breakable = (x, z, reach, ...parts) => {
		const key = cellOf(x, z);
		if (!cells.has(key)) cells.set(key, []);
		cells.get(key).push({ x, z, y: shape.heightAt(x, z), reach, parts, kept: [] });
	};
	const gone = new Matrix4().makeScale(0, 0, 0);
	const towards = new Vector3();

	// Boulders, in groups, in the woods and on the rocky ground, and a few big ones by the road.
	const rocks = await new GLTFLoader().loadAsync('stage/rocks.glb');
	const pieces = [];
	rocks.scene.traverse((o) => {
		if (o.isMesh) pieces.push(o);
	});
	const spots = [];
	const COUNT = light ? 160 : 420;
	for (let i = 0; i < COUNT * 40 && spots.length < COUNT; i++) {
		const x = (random() - 0.5) * (WORLD * 2 - 40);
		const z = (random() - 0.5) * (WORLD * 2 - 40);
		const d = shape.distanceAt(x, z);
		if (d < 9 || shape.outsideYard(x, z) < 14) continue;
		const near = d < 34;
		const steep = shape.slopeAt(x, z) > 0.3;
		if (!near && !steep && fbm(x / 60, z / 60, 2) < 0.55) continue;
		const big = random();
		spots.push({ x, z, scale: 0.35 + big * big * big * (near ? 1.5 : 2.6), yaw: random() * 6.283, tilt: random() * 0.5, piece: Math.floor(random() * pieces.length) });
	}
	pieces.forEach((piece, index) => {
		const here = spots.filter((a) => a.piece === index);
		if (!here.length) return;
		piece.material.roughness = 1;
		if (!piece.material.userData.clear) {
			piece.material.userData.clear = true;
			keepOutOfCar(piece.material, 'stage-rock-clear');
		}
		const mesh = new InstancedMesh(piece.geometry, piece.material, here.length);
		const edge = outline(piece.geometry);
		here.forEach((a, i) => {
			q.setFromAxisAngle(up, a.yaw);
			const y = shape.heightAt(a.x, a.z) - a.scale * 0.1;
			matrix.compose(p.set(a.x, y, a.z), q, s.setScalar(a.scale));
			mesh.setMatrixAt(i, matrix);
			solid(R.ColliderDesc.convexHull(new Float32Array(edge.map((c) => c * a.scale))).setTranslation(a.x, y, a.z).setRotation(q));
		});
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		mesh.frustumCulled = false;
		group.add(mesh);
	});

	// Marker poles down both sides of the road, thin and orange-topped, for depth and speed. You'd snap one, so they aren't solid.
	const poleMaterial = new MeshStandardMaterial({ color: '#d9d4c7', roughness: 0.8 });
	const capMaterial = new MeshStandardMaterial({ color: '#e0471c', roughness: 0.6 });
	const poleGeometry = new CylinderGeometry(0.03, 0.035, 1.1, 5).translate(0, 0.55, 0);
	const capGeometry = new CylinderGeometry(0.036, 0.036, 0.26, 5).translate(0, 1.0, 0);
	const places = [];
	for (let i = 30; i < road.length - 30; i += 16) {
		const a = road[i];
		for (const side of [-1, 1]) places.push({ x: a.x + a.sx * side * (a.half + 2.1), z: a.z + a.sz * side * (a.half + 2.1) });
	}
	const poles = new InstancedMesh(poleGeometry, poleMaterial, places.length);
	const caps = new InstancedMesh(capGeometry, capMaterial, places.length);
	places.forEach((a, i) => {
		matrix.compose(p.set(a.x, shape.heightAt(a.x, a.z) - 0.04, a.z), q.identity(), s.setScalar(1));
		poles.setMatrixAt(i, matrix);
		caps.setMatrixAt(i, matrix);
	});
	for (const m of [poles, caps]) {
		m.frustumCulled = false;
		m.castShadow = true;
		group.add(m);
	}
	places.forEach((a, i) => breakable(a.x, a.z, 0.1, [poles, i], [caps, i]));

	// Chevron boards on the outside of the corners, facing the car coming in.
	const boards = [];
	let lastBoard = -100;
	for (let i = 20; i < road.length - 20; i++) {
		const a = road[i];
		if (Math.abs(a.bend) < 0.03 || i - lastBoard < 22) continue;
		lastBoard = i;
		// The outside of the bend, a little ahead.
		const ahead = road[Math.min(road.length - 1, i + 8)];
		const side = a.bend > 0 ? -1 : 1;
		for (const along of [0, 8, 16]) {
			const c = road[Math.min(road.length - 1, i + along)];
			boards.push({ x: c.x + c.sx * side * (c.half + 2.8), z: c.z + c.sz * side * (c.half + 2.8), yaw: Math.atan2(-ahead.dx, -ahead.dz), flip: side < 0 });
		}
	}
	const boardMaterial = new MeshStandardMaterial({ map: chevronTexture(), roughness: 0.6 });
	const boardGeometry = new PlaneGeometry(1.5, 0.75).translate(0, 1.15, 0);
	const boardMesh = new InstancedMesh(boardGeometry, boardMaterial, boards.length);
	const postGeometry = new BoxGeometry(0.07, 1.1, 0.05).translate(0, 0.45, 0);
	const postMesh = new InstancedMesh(postGeometry, poleMaterial, boards.length);
	boards.forEach((b, i) => {
		q.setFromAxisAngle(up, b.yaw);
		matrix.compose(p.set(b.x, shape.heightAt(b.x, b.z) - 0.05, b.z), q, s.set(b.flip ? -1 : 1, 1, 1));
		boardMesh.setMatrixAt(i, matrix);
		postMesh.setMatrixAt(i, matrix);
		breakable(b.x, b.z, 0.8, [boardMesh, i], [postMesh, i]);
	});
	boardMaterial.side = 2;
	for (const m of [boardMesh, postMesh]) {
		m.frustumCulled = false;
		m.castShadow = true;
		group.add(m);
	}

	// The start gantry, over the lane, with room to drive under.
	const yaw = COURSE_YAW;
	const steel = new MeshStandardMaterial({ color: '#2a3238', roughness: 0.55, metalness: 0.5 });
	const middle = place(46, 0);
	const across = place(46, 1);
	const ax = across.x - middle.x;
	const az = across.z - middle.z;
	const GAP = 10.5;
	for (const side of [-1, 1]) {
		const leg = new Mesh(new BoxGeometry(0.42, 7.4, 0.42).translate(0, 3.7, 0), steel);
		leg.position.set(middle.x + ax * side * GAP, 0, middle.z + az * side * GAP);
		leg.rotation.y = yaw;
		leg.castShadow = true;
		group.add(leg);
		solid(R.ColliderDesc.cuboid(0.21, 3.7, 0.21).setTranslation(leg.position.x, 3.7, leg.position.z));
	}
	const bannerMaterial = new MeshStandardMaterial({ map: bannerTexture(), roughness: 0.7 });
	const banner = new Mesh(new BoxGeometry(GAP * 2 + 0.42, 2.6, 0.22), [steel, steel, steel, steel, bannerMaterial, bannerMaterial]);
	banner.position.set(middle.x, 6.1, middle.z);
	banner.rotation.y = yaw;
	banner.castShadow = true;
	group.add(banner);

	// Keep three's tidy-up happy about unused imports while staying small.
	void Color;
	void RepeatWrapping;

	return {
		/** Anything the car's touching this frame snaps off. Says what, so there can be a noise and some dust. */
		update(car, snapped) {
			const o = car.object;
			const f = o.getWorldDirection(towards);
			const long = car.size.length / 2;
			const wide = car.size.width / 2;
			const cx = Math.floor((o.position.x + WORLD) / CELL_SIZE);
			const cz = Math.floor((o.position.z + WORLD) / CELL_SIZE);
			for (let i = cx - 1; i <= cx + 1; i++) {
				for (let j = cz - 1; j <= cz + 1; j++) {
					const here = cells.get((i << 12) | j);
					if (!here) continue;
					for (const item of here) {
						if (item.kept.length || Math.abs(item.y - o.position.y) > 3) continue;
						const dx = item.x - o.position.x;
						const dz = item.z - o.position.z;
						const along = dx * f.x + dz * f.z;
						const across = dx * f.z - dz * f.x;
						if (Math.abs(along) > long + item.reach || Math.abs(across) > wide + item.reach) continue;
						for (const [mesh, index] of item.parts) {
							const m = new Matrix4();
							mesh.getMatrixAt(index, m);
							item.kept.push(m);
							mesh.setMatrixAt(index, gone);
							mesh.instanceMatrix.needsUpdate = true;
						}
						broken.push(item);
						snapped(item);
					}
				}
			}
		},
		reset() {
			for (const item of broken) {
				item.parts.forEach(([mesh, index], i) => {
					mesh.setMatrixAt(index, item.kept[i]);
					mesh.instanceMatrix.needsUpdate = true;
				});
				item.kept = [];
			}
			broken.length = 0;
		},
		/** Where things stand, for tools/cabin-check.mjs. */
		standing() {
			const items = [...cells.values()].flat();
			const where = ({ x, z }) => ({ x, z });
			return { poles: items.filter((a) => a.reach < 0.5).map(where), boards: items.filter((a) => a.reach >= 0.5).map(where), rocks: spots.filter((a) => a.scale > 0.45).map(where) };
		},
	};
}
