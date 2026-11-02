// The demo's yard, all made in code: a concrete lot at the end of the day, shipping containers round it, a curved ramp,
// stacks of crates, drums and cones. Nothing here is part of the car: a game brings its own world.
import { BoxGeometry, CanvasTexture, Color, ConeGeometry, CylinderGeometry, BufferAttribute, BufferGeometry, DoubleSide, DynamicDrawUsage, IcosahedronGeometry, InstancedMesh, Matrix4, Mesh, MeshStandardMaterial, PlaneGeometry, Quaternion, RepeatWrapping, SRGBColorSpace, Vector3 } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';

export const YARD = 150; // half its width, m
const YAW = (-3 * Math.PI) / 4; // The course runs away from the camera, along the way the car starts out.
const forward = { x: Math.sin(YAW), z: Math.cos(YAW) };
const across = { x: Math.cos(YAW), z: -Math.sin(YAW) };
/** A place along the course: `u` metres ahead of the start, `v` to the car's left. */
export const place = (u, v, y = 0) => ({ x: forward.x * u + across.x * v, y, z: forward.z * u + across.z * v });
export const COURSE_YAW = YAW;

// Islands of long grass: where along the course, and how big.
const GRASS = [
	[8, 20, 11, 7],
	[30, 22, 8, 12],
	[-10, 18, 6, 9],
	[6, -24, 10, 6],
	[44, -22, 14, 8],
	[-24, -26, 12, 9],
	[84, 22, 16, 11],
	[100, -14, 12, 16],
	[-70, 8, 14, 12],
	[-52, 62, 20, 10],
	[120, 60, 18, 14],
	[20, 74, 16, 12],
	[-110, -30, 20, 18],
	[-20, -100, 22, 14],
	[64, -90, 18, 16],
];

let seed = 11;
const random = () => (seed = (seed * 16807) % 2147483647) / 2147483647;
const m = new Matrix4();
const q = new Quaternion();
const p = new Vector3();
const s = new Vector3(1, 1, 1);
const c = new Color();
const UP = new Vector3(0, 1, 0);

const canvasOf = (size, draw) => {
	const canvas = document.createElement('canvas');
	canvas.width = canvas.height = size;
	draw(canvas.getContext('2d'), size);
	const t = new CanvasTexture(canvas);
	t.colorSpace = SRGBColorSpace;
	t.anisotropy = 8;
	return t;
};

// Everything on the ground that's bigger than a slab joint, for the whole yard.
function groundPaint() {
	return canvasOf(2048, (g, n) => {
		const k = n / (YARD * 2);
		const X = (x) => (x + YARD) * k;
		g.fillStyle = '#d2bf9c';
		g.fillRect(0, 0, n, n);
		// Soft patches of weather: darker where it's stayed wet, warmer where the dust has blown.
		for (let i = 0; i < 900; i++) {
			const x = random() * n;
			const y = random() * n;
			const r = 20 + random() * 150;
			const dark = random() < 0.55;
			const grad = g.createRadialGradient(x, y, 0, x, y, r);
			const col = dark ? '84,72,58' : '226,196,150';
			grad.addColorStop(0, `rgba(${col},${0.05 + random() * 0.09})`);
			grad.addColorStop(1, `rgba(${col},0)`);
			g.fillStyle = grad;
			g.fillRect(x - r, y - r, r * 2, r * 2);
		}
		// Slab joints, turned to run with the course.
		g.save();
		g.translate(n / 2, n / 2);
		g.rotate(Math.PI / 4);
		const slab = 8 * k;
		// Slabs that were poured on another day.
		for (let i = 0; i < 420; i++) {
			const a = Math.floor((random() - 0.5) * 60) * slab;
			const b = Math.floor((random() - 0.5) * 60) * slab;
			g.fillStyle = random() < 0.5 ? `rgba(70,60,48,${0.03 + random() * 0.07})` : `rgba(235,220,190,${0.03 + random() * 0.06})`;
			g.fillRect(a, b, slab, slab);
		}
		// Where the grass comes through.
		g.restore();
		for (const [u, v, ru, rv] of GRASS) {
			const at = place(u, v);
			g.save();
			g.translate(X(at.x), X(at.z));
			g.rotate(Math.PI / 4);
			g.scale(ru * k, rv * k);
			const grad = g.createRadialGradient(0, 0, 0.1, 0, 0, 1.25);
			grad.addColorStop(0, 'rgba(84,88,40,0.9)');
			grad.addColorStop(0.72, 'rgba(92,90,42,0.65)');
			grad.addColorStop(1, 'rgba(120,104,60,0)');
			g.fillStyle = grad;
			g.beginPath();
			g.arc(0, 0, 1.25, 0, 7);
			g.fill();
			g.restore();
		}
		g.save();
		g.translate(n / 2, n / 2);
		g.rotate(Math.PI / 4);
		// The paint: a lane up the middle, a turning circle, parking bays.
		const paint = (alpha = 0.78) => `rgba(240,226,190,${alpha})`;
		g.lineWidth = 0.42 * k;
		g.strokeStyle = 'rgba(232,150,52,0.8)';
		g.beginPath();
		g.arc(-92 * k, 62 * k, 24 * k, 0, Math.PI * 2);
		g.stroke();
		g.beginPath();
		g.arc(-92 * k, 62 * k, 19 * k, 0, Math.PI * 2);
		g.stroke();
		g.strokeStyle = paint(0.6);
		g.lineWidth = 0.2 * k;
		for (let i = 0; i < 16; i++) {
			g.beginPath();
			g.moveTo((-60 + i * 4.4) * k, -60 * k);
			g.lineTo((-60 + i * 4.4) * k, -70 * k);
			g.stroke();
		}
		// Oil, and old tyre marks to say people have been at this before.
		for (let i = 0; i < 60; i++) {
			const x = (random() - 0.5) * n;
			const y = (random() - 0.5) * n;
			const r = (0.5 + random() * 1.6) * k;
			g.fillStyle = `rgba(30,24,20,${0.12 + random() * 0.22})`;
			g.beginPath();
			g.ellipse(x, y, r, r * 0.6, random() * 3, 0, 7);
			g.fill();
		}
		g.strokeStyle = 'rgba(30,26,22,0.13)';
		g.lineCap = 'round';
		for (let i = 0; i < 26; i++) {
			let x = (random() - 0.5) * n * 0.8;
			let y = (random() - 0.5) * n * 0.8;
			let a = random() * 7;
			const curve = (random() - 0.5) * 0.12;
			g.lineWidth = 0.3 * k;
			for (const side of [-0.8, 0.8]) {
				let px = x + Math.cos(a + 1.57) * side * k;
				let py = y + Math.sin(a + 1.57) * side * k;
				let qa = a;
				g.beginPath();
				g.moveTo(px, py);
				for (let t = 0; t < 40; t++) {
					qa += curve;
					px += Math.cos(qa) * 0.9 * k;
					py += Math.sin(qa) * 0.9 * k;
					g.lineTo(px, py);
				}
				g.stroke();
			}
			a += 0;
			x += 0;
			y += 0;
		}
		g.restore();
	});
}

// Close up: the grain of the concrete.
const groundGrain = () => {
	const t = canvasOf(512, (g, n) => {
		g.fillStyle = '#e8e8e8';
		g.fillRect(0, 0, n, n);
		for (let i = 0; i < 26000; i++) {
			const v = 120 + Math.floor(random() * 135);
			g.fillStyle = `rgba(${v},${v},${v},0.16)`;
			const r = random() < 0.92 ? 1 : 2.5;
			g.fillRect(random() * n, random() * n, r, r);
		}
	});
	t.colorSpace = SRGBColorSpace;
	t.wrapS = t.wrapT = RepeatWrapping;
	t.repeat.set(60, 60);
	return t;
};

const crateMap = () =>
	canvasOf(256, (g, n) => {
		g.fillStyle = '#b77f43';
		g.fillRect(0, 0, n, n);
		for (let i = 0; i < 6; i++) {
			g.fillStyle = i % 2 ? '#b07a40' : '#bf8748';
			g.fillRect(0, (i * n) / 6, n, n / 6);
			g.fillStyle = 'rgba(70,40,14,0.5)';
			g.fillRect(0, (i * n) / 6, n, 2);
		}
		for (let i = 0; i < 500; i++) {
			g.fillStyle = `rgba(80,48,18,${random() * 0.14})`;
			g.fillRect(random() * n, random() * n, 10 + random() * 50, 1);
		}
		g.strokeStyle = '#7f5427';
		g.lineWidth = 26;
		g.strokeRect(13, 13, n - 26, n - 26);
		g.lineWidth = 22;
		g.beginPath();
		g.moveTo(16, 16);
		g.lineTo(n - 16, n - 16);
		g.stroke();
		g.strokeStyle = 'rgba(50,28,8,0.6)';
		g.lineWidth = 2;
		g.strokeRect(26, 26, n - 52, n - 52);
	});

const containerMap = () =>
	canvasOf(512, (g, n) => {
		g.fillStyle = '#ffffff';
		g.fillRect(0, 0, n, n);
		// Ribs up the side, a frame, rust at the feet.
		for (let i = 0; i < 26; i++) {
			const x = (i * n) / 26;
			const grad = g.createLinearGradient(x, 0, x + n / 26, 0);
			grad.addColorStop(0, 'rgba(0,0,0,0.26)');
			grad.addColorStop(0.45, 'rgba(255,255,255,0.1)');
			grad.addColorStop(1, 'rgba(0,0,0,0.05)');
			g.fillStyle = grad;
			g.fillRect(x, 0, n / 26, n);
		}
		g.fillStyle = 'rgba(0,0,0,0.3)';
		g.fillRect(0, 0, n, 16);
		g.fillRect(0, n - 20, n, 20);
		for (let i = 0; i < 150; i++) {
			const x = random() * n;
			const h = 10 + random() * 90;
			g.fillStyle = `rgba(92,54,30,${random() * 0.2})`;
			g.fillRect(x, n - h, 3 + random() * 12, h);
		}
		for (let i = 0; i < 60; i++) {
			g.fillStyle = `rgba(255,255,255,${random() * 0.07})`;
			g.fillRect(random() * n, random() * n, 30 + random() * 70, 3 + random() * 20);
		}
	});

const rampMap = () => {
	const t = canvasOf(512, (g, n) => {
		g.fillStyle = '#3f4449';
		g.fillRect(0, 0, n, n);
		for (let i = 0; i < 1400; i++) {
			g.fillStyle = `rgba(${random() < 0.5 ? '255,245,225' : '10,10,10'},${random() * 0.06})`;
			g.fillRect(random() * n, random() * n, 2 + random() * 26, 1 + random() * 2);
		}
		// A chevron pointing up the ramp, one to a tile.
		g.strokeStyle = '#f0b53c';
		g.lineWidth = 44;
		g.lineJoin = 'miter';
		g.beginPath();
		g.moveTo(n * 0.1, n * 0.72);
		g.lineTo(n * 0.5, n * 0.28);
		g.lineTo(n * 0.9, n * 0.72);
		g.stroke();
		g.fillStyle = '#efe6d0';
		g.fillRect(0, 0, 22, n);
		g.fillRect(n - 22, 0, 22, n);
	});
	t.wrapS = t.wrapT = RepeatWrapping;
	return t;
};

// The ramp: a curve to run up, flat sides, and a wall at the back so nothing drives under it.
function rampGeometry(width, length, height, steps = 16) {
	const pos = [];
	const uv = [];
	const idx = [];
	const profile = [];
	for (let i = 0; i <= steps; i++) {
		const t = i / steps;
		profile.push([t * length, height * t * t]);
	}
	const hw = width / 2;
	// The running surface.
	for (let i = 0; i <= steps; i++) {
		const [z, y] = profile[i];
		pos.push(hw, y, z, -hw, y, z);
		uv.push(0, (z / length) * 3, 1, (z / length) * 3);
	}
	for (let i = 0; i < steps; i++) {
		const a = i * 2;
		idx.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
	}
	const surface = { pos: pos.slice(), idx: idx.slice() };
	// The sides and the back are for looks.
	const add = (verts, face) => {
		const base = pos.length / 3;
		for (const v of verts) {
			pos.push(...v);
			uv.push(0.3, 0.02);
		}
		for (const f of face) idx.push(base + f);
	};
	for (const side of [hw, -hw]) {
		const verts = [];
		const face = [];
		for (let i = 0; i <= steps; i++) {
			verts.push([side, profile[i][1], profile[i][0]], [side, 0, profile[i][0]]);
			if (i < steps) {
				const a = i * 2;
				if (side > 0) face.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
				else face.push(a, a + 2, a + 1, a + 1, a + 2, a + 3);
			}
		}
		add(verts, face);
	}
	add([[hw, height, length], [-hw, height, length], [hw, 0, length], [-hw, 0, length]], [0, 1, 2, 2, 1, 3]);
	const g = new BufferGeometry();
	g.setAttribute('position', new BufferAttribute(new Float32Array(pos), 3));
	g.setAttribute('uv', new BufferAttribute(new Float32Array(uv), 2));
	g.setIndex(idx);
	const flat = g.toNonIndexed();
	flat.computeVertexNormals();
	return { geometry: flat, surface };
}

/** A loose thing's look: instanced, one draw for all of a kind. */
class Loose {
	constructor(scene, geometry, material, items) {
		this.items = items;
		this.mesh = new InstancedMesh(geometry, material, items.length);
		this.mesh.instanceMatrix.setUsage(DynamicDrawUsage);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		this.mesh.frustumCulled = false;
		items.forEach((it, i) => {
			if (it.color) this.mesh.setColorAt(i, c.set(it.color));
		});
		scene.add(this.mesh);
		this.update(true);
	}

	update(all) {
		let changed = all;
		this.items.forEach((it, i) => {
			if (!all && it.body.isSleeping()) return;
			const t = it.body.translation();
			const r = it.body.rotation();
			m.compose(p.set(t.x, t.y, t.z), q.set(r.x, r.y, r.z, r.w), it.scale ?? s);
			this.mesh.setMatrixAt(i, m);
			changed = true;
		});
		if (changed) this.mesh.instanceMatrix.needsUpdate = true;
	}

	reset() {
		for (const it of this.items) {
			it.body.setTranslation(it.home.position, false);
			it.body.setRotation(it.home.rotation, false);
			it.body.setLinvel({ x: 0, y: 0, z: 0 }, false);
			it.body.setAngvel({ x: 0, y: 0, z: 0 }, false);
			it.body.sleep();
		}
		this.update(true);
	}
}

export function buildYard(RAPIER, world, scene, groups, quality = {}) {
	const R = RAPIER;
	const fixed = (desc) => world.createCollider(desc.setCollisionGroups(groups.solid).setFriction(0.5).setRestitution(0.1));
	const yawQ = (yaw) => ({ x: 0, y: Math.sin(yaw / 2), z: 0, w: Math.cos(yaw / 2) });

	// The ground
	world.createCollider(R.ColliderDesc.cuboid(YARD + 60, 1, YARD + 60).setTranslation(0, -1, 0).setFriction(0.5).setCollisionGroups(groups.solid));
	const paint = groundPaint();
	const ground = new Mesh(new PlaneGeometry(YARD * 2 + 900, YARD * 2 + 900), new MeshStandardMaterial({ map: groundGrain(), roughness: 0.93, metalness: 0 }));
	ground.material.onBeforeCompile = (shader) => {
		shader.uniforms.paintMap = { value: paint };
		shader.uniforms.paintSpan = { value: YARD * 2 };
		shader.uniforms.courseForward = { value: new Vector3(forward.x, forward.z, 0) };
		shader.uniforms.courseAcross = { value: new Vector3(across.x, across.z, 0) };
		shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nvarying vec2 vYard;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvYard = (modelMatrix * vec4(position, 1.0)).xz;');
		shader.fragmentShader = shader.fragmentShader
			.replace('#include <common>', '#include <common>\nvarying vec2 vYard;\nuniform sampler2D paintMap;\nuniform float paintSpan;\nuniform vec3 courseForward;\nuniform vec3 courseAcross;')
			.replace(
				'#include <map_fragment>',
				`#include <map_fragment>
				vec2 yardUv = vYard / paintSpan + 0.5;
				vec2 edge = smoothstep(vec2(0.0), vec2(0.03), yardUv) * (1.0 - smoothstep(vec2(0.97), vec2(1.0), yardUv));
				vec3 paintColour = texture2D(paintMap, vec2(yardUv.x, 1.0 - yardUv.y)).rgb;
				vec3 groundColour = paintColour;
				vec2 lane = vec2(dot(vYard, courseForward.xy), dot(vYard, courseAcross.xy));
				vec2 slabAt = abs(fract(lane / 8.0) - 0.5) * 8.0;
				vec2 slabWidth = max(fwidth(lane) * 0.7, vec2(0.03));
				float joint;
				joint = 1.0 - min(smoothstep(3.97 - slabWidth.x, 3.97, slabAt.x) + smoothstep(3.97 - slabWidth.y, 3.97, slabAt.y), 1.0);
				groundColour *= mix(0.72, 1.0, joint);
				float dashAcross = 1.0 - smoothstep(0.13, 0.13 + fwidth(lane.y), abs(abs(lane.y) - 7.0));
				float dashAlong = step(fract(lane.x / 5.8), 0.55);
				float inLot = 1.0 - smoothstep(140.0, 141.0, abs(lane.x));
				groundColour = mix(groundColour, vec3(0.93, 0.87, 0.72), dashAcross * dashAlong * inLot * 0.85);
				diffuseColor.rgb *= mix(vec3(0.42, 0.36, 0.26), groundColour, edge.x * edge.y);`,
			);
	};
	ground.material.customProgramCacheKey = () => 'yard-ground';
	ground.rotation.x = -Math.PI / 2;
	ground.receiveShadow = true;
	scene.add(ground);

	// Containers round the outside, two high in places, in faded colours.
	const containerGeometry = new BoxGeometry(1, 1, 1);
	const containerMaterial = new MeshStandardMaterial({ map: containerMap(), roughness: 0.62, metalness: 0.22 });
	const COLOURS = ['#24606b', '#b5432a', '#31556f', '#d08a2e', '#3e6f55', '#8a3a30', '#2d4a5c', '#c8c0ae'];
	const containers = [];
	const wall = (cx, cz, yaw, count, stack = 0.34) => {
		const L = 12.2;
		for (let i = 0; i < count; i++) {
			const off = (i - (count - 1) / 2) * (L + 0.12);
			const x = cx + Math.cos(yaw) * off;
			const z = cz - Math.sin(yaw) * off;
			const hi = random() < stack ? 2 : 1;
			for (let h = 0; h < hi; h++) containers.push({ x: x + (random() - 0.5) * 0.2, y: 1.3 + h * 2.6, z: z + (random() - 0.5) * 0.2, yaw: yaw + (random() - 0.5) * (h ? 0.05 : 0.012), sx: L, sy: 2.6, sz: 2.44, color: COLOURS[Math.floor(random() * COLOURS.length)] });
		}
	};
	const edgeCount = Math.ceil((YARD * 2) / 12.32);
	wall(0, -YARD, 0, edgeCount);
	wall(0, YARD, 0, edgeCount);
	wall(-YARD, 0, Math.PI / 2, edgeCount);
	wall(YARD, 0, Math.PI / 2, edgeCount);
	// A few in the yard, to drive round.
	for (const [u, v, turn, n] of [[92, -44, 0.4, 2], [58, 62, -0.5, 2], [-54, -60, 1.1, 2], [-74, 38, 0.2, 1], [130, 30, 1.5, 2]]) {
		const at = place(u, v);
		wall(at.x, at.z, YAW + Math.PI / 2 + turn, n, 0.5);
	}
	const containerMesh = new InstancedMesh(containerGeometry, containerMaterial, containers.length);
	containers.forEach((k, i) => {
		m.compose(p.set(k.x, k.y, k.z), q.setFromAxisAngle(UP, k.yaw), new Vector3(k.sx, k.sy, k.sz));
		containerMesh.setMatrixAt(i, m);
		containerMesh.setColorAt(i, c.set(k.color));
		fixed(R.ColliderDesc.cuboid(k.sx / 2, k.sy / 2, k.sz / 2).setTranslation(k.x, k.y, k.z).setRotation(yawQ(k.yaw)));
	});
	containerMesh.castShadow = true;
	containerMesh.receiveShadow = true;
	containerMesh.frustumCulled = false;
	scene.add(containerMesh);
	// Nothing leaves the yard, however good the jump.
	for (const [x, z, hx, hz] of [[0, -YARD - 3, YARD + 6, 2], [0, YARD + 3, YARD + 6, 2], [-YARD - 3, 0, 2, YARD + 6], [YARD + 3, 0, 2, YARD + 6]]) fixed(R.ColliderDesc.cuboid(hx, 40, hz).setTranslation(x, 40, z));

	// Trees beyond the wall, for something to see above it.
	{
		const crown = mergeGeometries([new IcosahedronGeometry(1, 1).translate(0, 2.3, 0), new IcosahedronGeometry(0.72, 1).translate(0.5, 3.2, 0.1), new IcosahedronGeometry(0.62, 1).translate(-0.5, 3.0, -0.2)].map((g) => g.toNonIndexed()));
		crown.computeVertexNormals();
		const trunk = new CylinderGeometry(0.1, 0.17, 2, 6).translate(0, 1, 0);
		const N = 240;
		const crowns = new InstancedMesh(crown, new MeshStandardMaterial({ roughness: 0.9, flatShading: true }), N);
		const trunks = new InstancedMesh(trunk, new MeshStandardMaterial({ color: '#4a3524', roughness: 1 }), N);
		const COLS = ['#a65f24', '#c17a2a', '#8e4a24', '#7f7a2c', '#5f6f2c', '#b5502c'];
		for (let i = 0; i < N; i++) {
			const edge = i % 4;
			const along = (random() - 0.5) * (YARD * 2 + 70);
			const out = YARD + 7 + random() * 40;
			const x = edge === 0 ? along : edge === 1 ? along : edge === 2 ? -out : out;
			const z = edge === 0 ? -out : edge === 1 ? out : along;
			const h = 2.2 + random() * 2.6;
			m.compose(p.set(x, 0, z), q.setFromAxisAngle(UP, random() * 7), new Vector3(h, h * (0.9 + random() * 0.4), h));
			crowns.setMatrixAt(i, m);
			trunks.setMatrixAt(i, m);
			crowns.setColorAt(i, c.set(COLS[Math.floor(random() * COLS.length)]));
		}
		for (const t of [crowns, trunks]) {
			t.frustumCulled = false;
			t.castShadow = true;
			scene.add(t);
		}
	}

	let grassMesh = null;
	// Long grass, in the islands the ground has been painted for. You drive straight through it.
	{
		const blade = new BufferGeometry();
		const verts = [];
		const shades = [];
		for (let i = 0; i < 6; i++) {
			const a = (i / 6) * 6.283 + random();
			const r = 0.05 + random() * 0.18;
			const x = Math.cos(a) * r;
			const z = Math.sin(a) * r;
			const w = 0.075;
			const lean = 0.2 + random() * 0.28;
			const h = 0.55 + random() * 0.55;
			verts.push(x - Math.sin(a) * w, 0, z + Math.cos(a) * w, x + Math.sin(a) * w, 0, z - Math.cos(a) * w, x + Math.cos(a) * lean, h, z + Math.sin(a) * lean);
			shades.push(0.48, 0.48, 0.48, 0.48, 0.48, 0.48, 1.12, 1.12, 1.12);
		}
		blade.setAttribute('position', new BufferAttribute(new Float32Array(verts), 3));
		blade.setAttribute('color', new BufferAttribute(new Float32Array(shades), 3));
		blade.setAttribute('normal', new BufferAttribute(new Float32Array(verts.length).map((_, i) => (i % 3 === 1 ? 1 : 0)), 3));
		const N = quality.grass ?? 5200;
		const grass = new InstancedMesh(blade, new MeshStandardMaterial({ vertexColors: true, roughness: 1, side: DoubleSide }), N);
		const COLS = ['#8f9234', '#a59a38', '#7c8a33', '#b49a3a', '#6f7f33', '#c59a3a'];
		const area = GRASS.reduce((sum, g) => sum + g[2] * g[3], 0);
		let i = 0;
		for (const [u, v, ru, rv] of GRASS) {
			const count = Math.floor((N * ru * rv) / area);
			for (let k = 0; k < count && i < N; k++, i++) {
				const a = random() * 6.283;
				const r = Math.sqrt(random());
				const at = place(u + Math.cos(a) * r * ru, v + Math.sin(a) * r * rv);
				const size = (0.75 + random() * 0.8) * (1.15 - r * 0.45);
				m.compose(p.set(at.x, 0, at.z), q.setFromAxisAngle(UP, random() * 7), new Vector3(size, size, size));
				grass.setMatrixAt(i, m);
				grass.setColorAt(i, c.set(COLS[Math.floor(random() * COLS.length)]));
			}
		}
		grass.count = i;
		grass.frustumCulled = false;
		grass.receiveShadow = true;
		scene.add(grass);
		grassMesh = grass;
	}

	// Ramps
	const rampMaterial = new MeshStandardMaterial({ map: rampMap(), roughness: 0.8, side: DoubleSide });
	const addRamp = (u, v, yaw, width, length, height) => {
		const { geometry, surface } = rampGeometry(width, length, height);
		const at = place(u, v);
		const mesh = new Mesh(geometry, rampMaterial);
		mesh.position.set(at.x, 0, at.z);
		mesh.rotation.y = yaw;
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		scene.add(mesh);
		const body = world.createRigidBody(R.RigidBodyDesc.fixed().setTranslation(at.x, 0, at.z).setRotation(yawQ(yaw)));
		world.createCollider(R.ColliderDesc.trimesh(new Float32Array(surface.pos), new Uint32Array(surface.idx)).setFriction(0.6).setCollisionGroups(groups.solid), body);
		// Under the surface, so nothing gets in from the side or back.
		const rows = 7;
		for (let i = 1; i < rows; i++) {
			const t0 = (i - 1) / (rows - 1);
			const t1 = i / (rows - 1);
			const y = height * t0 * t0 * 0.97;
			const z = ((t0 + t1) / 2) * length;
			if (y < 0.05) continue;
			world.createCollider(R.ColliderDesc.cuboid(width / 2, y / 2, ((t1 - t0) * length) / 2).setTranslation(0, y / 2, z).setFriction(0.3).setCollisionGroups(groups.solid), body);
		}
		world.createCollider(R.ColliderDesc.cuboid(width / 2, height / 2, 0.15).setTranslation(0, height / 2, length - 0.15).setFriction(0.3).setCollisionGroups(groups.solid), body);
	};
	addRamp(34, 0, YAW, 11, 18, 3.6); // Straight ahead
	addRamp(-38, 22, YAW + Math.PI, 8, 12, 1.9); // A small one behind the start
	addRamp(70, -46, YAW + 0.9, 13, 24, 5.2); // The big one, for boosting at
	addRamp(-30, -70, YAW + 2.4, 10, 16, 2.8);

	// Loose things
	const dyn = (x, y, z, rotation, desc, opts = {}) => {
		const body = world.createRigidBody(R.RigidBodyDesc.dynamic().setTranslation(x, y, z).setRotation(rotation).setLinearDamping(0.05).setAngularDamping(0.25).setCcdEnabled(false).setCanSleep(true));
		world.createCollider(desc.setCollisionGroups(groups.loose).setActiveEvents(R.ActiveEvents.COLLISION_EVENTS).setFriction(opts.friction ?? 0.55).setRestitution(opts.bounce ?? 0.12), body);
		body.sleep();
		const t = body.translation();
		const r = body.rotation();
		return { body, home: { position: { x: t.x, y: t.y, z: t.z }, rotation: { x: r.x, y: r.y, z: r.z, w: r.w } } };
	};

	// Crates, in stacks along the way.
	const crateItems = [];
	const crate = (u, v, h, size, yaw = YAW) => {
		const a = place(u, v);
		const it = dyn(a.x, h, a.z, yawQ(yaw), R.ColliderDesc.cuboid(size / 2, size / 2, size / 2).setMass(24 * size ** 3 + 8), {});
		it.scale = new Vector3(size, size, size);
		it.color = ['#ffffff', '#e8d9c4', '#d9c8ae', '#f3e6cf'][Math.floor(random() * 4)];
		crateItems.push(it);
	};
	const pyramid = (u, v, base, size, turn = 0) => {
		for (let row = 0; row < base; row++) {
			const n = base - row;
			for (let i = 0; i < n; i++) crate(u, v + (i - (n - 1) / 2) * (size + 0.02), size / 2 + row * size, size, YAW + turn);
		}
	};
	pyramid(22, -9.5, 4, 1.15);
	pyramid(27, 11, 3, 1.3);
	pyramid(63, 6, 5, 1.2);
	pyramid(-22, 6, 3, 1.2);
	pyramid(16, -22, 3, 1.1);
	for (let i = 0; i < 7; i++) crate(46 + (random() - 0.5) * 8, (random() - 0.5) * 12, 0.65, 1.2, YAW + random());

	// Oil drums
	const drumItems = [];
	const drum = (u, v, h = 0.5) => {
		const a = place(u, v);
		const it = dyn(a.x, h, a.z, yawQ(random() * 6), R.ColliderDesc.cylinder(0.46, 0.31).setMass(26), { bounce: 0.28 });
		it.color = ['#c2452a', '#2d5f70', '#d6a02e', '#39424a'][Math.floor(random() * 4)];
		drumItems.push(it);
	};
	for (const [u, v] of [[14, 8], [14.7, 8.7], [15.4, 8], [14.7, 7.4], [-14, -9], [-13.3, -8.4], [40, 20], [40.7, 20.6], [40, 21.3], [30, -24], [30.7, -24.6]]) drum(u, v);
	for (const [u, v] of [[14.7, 8]]) drum(u, v, 1.45);

	// Cones up the lane
	const coneItems = [];
	for (let i = 0; i < 16; i++) {
		const v = i % 2 ? 4 : -4;
		const a = place(-46 + i * 5.5 + 90, 0 + v + 26);
		coneItems.push(dyn(a.x, 0.36, a.z, yawQ(0), R.ColliderDesc.cone(0.36, 0.2).setMass(4), { bounce: 0.3 }));
	}

	const crates = new Loose(scene, new RoundedBoxGeometry(1, 1, 1, 2, 0.04), new MeshStandardMaterial({ map: crateMap(), roughness: 0.82 }), crateItems);
	const drums = new Loose(scene, new CylinderGeometry(0.31, 0.31, 0.92, 18), new MeshStandardMaterial({ roughness: 0.42, metalness: 0.55 }), drumItems);
	const coneGeometry = mergeGeometries([new ConeGeometry(0.2, 0.68, 12).translate(0, 0.02, 0).toNonIndexed(), new BoxGeometry(0.46, 0.04, 0.46).translate(0, -0.34, 0).toNonIndexed()]);
	const cones = new Loose(scene, coneGeometry, new MeshStandardMaterial({ color: '#e8611f', roughness: 0.6 }), coneItems);
	const groupsOfLoose = [crates, drums, cones];
	const kinds = new Map();
	for (const it of crateItems) kinds.set(it.body.handle, 'wood');
	for (const it of drumItems) kinds.set(it.body.handle, 'metal');
	for (const it of coneItems) kinds.set(it.body.handle, 'plate');

	return {
		update() {
			for (const g of groupsOfLoose) g.update(false);
		},
		reset() {
			for (const g of groupsOfLoose) g.reset();
		},
		/** What a body sounds like, if it's one of the loose things. */
		kindOf(body) {
			return body ? kinds.get(body.handle) : undefined;
		},
		/** Less grass, for a weak card. */
		lower() {
			grassMesh.count = Math.floor(grassMesh.count / 2);
		},
		count: crateItems.length + drumItems.length + coneItems.length,
	};
}
