// The rally stage: land to the horizon, a real road through it, sealed and loose, and the yard's open space in the middle. Its shape is
// src/stage-shape.js; this draws it and makes it solid. Everything is built before the demo says it's ready, and nothing compiles later.
import {
	BackSide,
	BufferAttribute,
	BufferGeometry,
	ClampToEdgeWrapping,
	DataTexture,
	Group,
	LinearFilter,
	LinearMipmapLinearFilter,
	Mesh,
	MeshBasicMaterial,
	MeshStandardMaterial,
	PMREMGenerator,
	RepeatWrapping,
	RGBAFormat,
	Scene,
	SphereGeometry,
	SRGBColorSpace,
	TextureLoader,
	Vector3,
} from 'three';
import { CELL, fbm, shapeStage, SIZE, WORLD } from './stage-shape.js';
import { addForest } from './stage-forest.js';
import { addFurniture } from './stage-furniture.js';

const CHUNKS = 10;
const smooth = (a, b, x) => {
	const t = Math.min(1, Math.max(0, (x - a) / (b - a)));
	return t * t * (3 - 2 * t);
};

// The land's look: four grounds mixed by a painted map. Each ground is read twice, at two sizes, so it doesn't repeat.
function landMaterial(maps, splat, light) {
	const material = new MeshStandardMaterial({ roughness: 0.95, metalness: 0 });
	material.onBeforeCompile = (shader) => {
		Object.assign(shader.uniforms, {
			tSplat: { value: splat },
			tGrass: { value: maps.grass },
			tForest: { value: maps.forest },
			tRock: { value: maps.rock },
			tGravel: { value: maps.gravel },
			nGrass: { value: maps.grassN },
			nForest: { value: maps.forestN },
			nRock: { value: maps.rockN },
			nGravel: { value: maps.gravelN },
			landSpan: { value: WORLD * 2 },
		});
		shader.vertexShader = shader.vertexShader
			.replace('#include <common>', '#include <common>\nvarying vec3 vLand;\nvarying vec3 vLandNormal;')
			.replace('#include <begin_vertex>', '#include <begin_vertex>\nvLand = position;\nvLandNormal = normal;');
		shader.fragmentShader = shader.fragmentShader
			.replace(
				'#include <common>',
				`#include <common>
				varying vec3 vLand;
				varying vec3 vLandNormal;
				uniform sampler2D tSplat, tGrass, tForest, tRock, tGravel, nGrass, nForest, nRock, nGravel;
				uniform float landSpan;
				vec4 landWeights;
				vec2 landUv;`,
			)
			.replace(
				'#include <map_fragment>',
				`landUv = vLand.xz;
				vec4 sp = texture2D(tSplat, landUv / landSpan + 0.5);
				// Break the edges between grounds up with the grain of the ground itself.
				float grain = texture2D(tForest, landUv / 3.7).g;
				sp = max(sp + (grain - 0.42) * 0.55 * (sp * (1.0 - sp) * 4.0), vec4(0.0));
				landWeights = sp / max(sp.r + sp.g + sp.b + sp.a, 0.001);
				vec2 a = landUv / 4.3;
				vec2 b = landUv / 23.0;
				vec3 land = vec3(0.0);
				land += landWeights.r * mix(texture2D(tGrass, a).rgb, texture2D(tGrass, b).rgb, 0.45) * vec3(0.78, 1.0, 0.5);
				land += landWeights.g * mix(texture2D(tForest, a).rgb, texture2D(tForest, b).rgb, 0.4) * vec3(0.62, 0.68, 0.46);
				land += landWeights.b * mix(texture2D(tRock, a * 0.6).rgb, texture2D(tRock, b).rgb, 0.45);
				vec3 stone = mix(texture2D(tGravel, a).rgb, texture2D(tGravel, b).rgb, 0.4);
				land += landWeights.a * mix(stone, vec3(dot(stone, vec3(0.33))), 0.45) * 1.25;
				// Broad changes of colour across the land, seen from far.
				land *= 0.82 + 0.36 * texture2D(tGrass, landUv / 211.0).g;
				diffuseColor.rgb = land;`,
			)
			.replace(
				'#include <normal_fragment_maps>',
				light
					? ''
					: `{
					vec2 a = landUv / 4.3;
					vec2 detail = landWeights.r * (texture2D(nGrass, a).xy - 0.5) + landWeights.g * (texture2D(nForest, a).xy - 0.5) + landWeights.b * (texture2D(nRock, a * 0.6).xy - 0.5) + landWeights.a * (texture2D(nGravel, a).xy - 0.5);
					vec3 w = normalize(vLandNormal + vec3(detail.x, 0.0, -detail.y) * 1.2);
					normal = normalize((viewMatrix * vec4(w, 0.0)).xyz);
				}`,
			);
	};
	material.customProgramCacheKey = () => `stage-land${light ? '-light' : ''}`;
	return material;
}

// The road's look, sealed or loose, along and across it.
function roadMaterial(maps, light) {
	const material = new MeshStandardMaterial({ roughness: 0.92, metalness: 0, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
	material.onBeforeCompile = (shader) => {
		Object.assign(shader.uniforms, {
			tGravel: { value: maps.gravel },
			tAsphalt: { value: maps.asphalt },
			nGravel: { value: maps.gravelN },
			nAsphalt: { value: maps.asphaltN },
		});
		shader.vertexShader = shader.vertexShader
			.replace('#include <common>', '#include <common>\nattribute vec4 aRoad;\nvarying vec4 vRoad;\nvarying vec3 vRoadNormal;')
			.replace('#include <begin_vertex>', '#include <begin_vertex>\nvRoad = aRoad;\nvRoadNormal = normal;');
		shader.fragmentShader = shader.fragmentShader
			.replace(
				'#include <common>',
				`#include <common>
				varying vec4 vRoad; // metres across, metres along, half width, how sealed
				varying vec3 vRoadNormal;
				uniform sampler2D tGravel, tAsphalt, nGravel, nAsphalt;
				float roadSealed;
				vec2 roadUv;`,
			)
			.replace(
				'#include <map_fragment>',
				`roadUv = vec2(vRoad.x, vRoad.y) / 4.3;
				float across = abs(vRoad.x);
				float edge = across / max(vRoad.z, 0.1);
				float wobble = texture2D(tGravel, vec2(vRoad.y / 37.0, 0.3)).g - 0.5;
				roadSealed = smoothstep(0.42, 0.58, vRoad.w + wobble * 0.5);
				// Loose: two pale worn lines where the wheels go, loose stone at the sides and down the middle.
				vec3 gravel = mix(texture2D(tGravel, roadUv).rgb, texture2D(tGravel, roadUv * 0.19).rgb, 0.4);
				gravel = mix(gravel, vec3(dot(gravel, vec3(0.33))), 0.45) * 1.25;
				float tracks = smoothstep(0.55, 0.0, abs(abs(vRoad.x + wobble * 0.5) - 1.05));
				gravel *= 1.0 + tracks * 0.18 - smoothstep(0.75, 1.0, edge) * 0.12;
				// Sealed: worn tarmac, a white line down each side, and dashes down the middle.
				vec3 tar = mix(texture2D(tAsphalt, roadUv).rgb, texture2D(tAsphalt, roadUv * 0.23).rgb, 0.45);
				float width = fwidth(vRoad.x);
				float lines = 1.0 - smoothstep(0.07, 0.07 + width, abs(across - (vRoad.z - 0.34)));
				float dash = (1.0 - smoothstep(0.05, 0.05 + width, across)) * step(fract(vRoad.y / 9.0), 0.42);
				tar = mix(tar, vec3(0.74, 0.72, 0.66), max(lines, dash) * 0.82 * smoothstep(0.0, 0.5, vRoad.z - across + 0.3));
				diffuseColor.rgb = mix(gravel, tar, roadSealed);`,
			)
			.replace('#include <roughnessmap_fragment>', '#include <roughnessmap_fragment>\nroughnessFactor = mix(0.96, 0.82, roadSealed);')
			.replace(
				'#include <normal_fragment_maps>',
				light
					? ''
					: `{
					vec2 detail = mix(texture2D(nGravel, roadUv).xy, texture2D(nAsphalt, roadUv).xy, roadSealed) - 0.5;
					vec3 w = normalize(mix(vRoadNormal, vec3(0.0, 1.0, 0.0), smoothstep(0.95, 1.1, abs(vRoad.x) / max(vRoad.z, 0.1))) + vec3(detail.x, 0.0, -detail.y) * 0.9);
					normal = normalize((viewMatrix * vec4(w, 0.0)).xyz);
				}`,
			);
	};
	material.customProgramCacheKey = () => `stage-road${light ? '-light' : ''}`;
	return material;
}

/** Builds it all. Costs about a second, before the demo says it's ready. */
export async function buildStage(RAPIER, world, scene, groups, { light = false, renderer, progress = () => {} } = {}) {
	const R = RAPIER;
	const shape = shapeStage();
	const group = new Group();
	group.name = 'stage';
	scene.add(group);
	const colliders = new Set();
	const solid = (desc) => {
		const c = world.createCollider(desc.setCollisionGroups(groups.solid).setFriction(0.6).setRestitution(0.05));
		colliders.add(c);
		return c;
	};
	const unsolid = (c) => {
		colliders.delete(c);
		world.removeCollider(c, false);
	};

	// Pictures
	const loader = new TextureLoader();
	const load = async (name, colour) => {
		const t = await loader.loadAsync(`stage/${name}.webp`);
		t.wrapS = t.wrapT = RepeatWrapping;
		t.anisotropy = light ? 2 : 8;
		if (colour) t.colorSpace = SRGBColorSpace;
		return t;
	};
	const [grass, grassN, forest, forestN, rock, rockN, gravel, gravelN, asphalt, asphaltN, skyInfo, sky] = await Promise.all([
		load('grass-diff', true),
		load('grass-nor'),
		load('forest-diff', true),
		load('forest-nor'),
		load('rock-diff', true),
		load('rock-nor'),
		load('gravel-diff', true),
		load('gravel-nor'),
		load('asphalt-diff', true),
		load('asphalt-nor'),
		fetch('stage/sky.json').then((r) => r.json()),
		loader.loadAsync('stage/sky.webp'),
	]);
	const maps = { grass, grassN, forest, forestN, rock, rockN, gravel, gravelN, asphalt, asphaltN };
	progress('The land');

	// The land's solid shape. Rapier wants it by columns, x slowest.
	const n = SIZE;
	const byColumn = new Float32Array(n * n);
	for (let j = 0; j < n; j++) for (let i = 0; i < n; i++) byColumn[j + i * n] = shape.heights[j * n + i];
	solid(R.ColliderDesc.heightfield(n - 1, n - 1, byColumn, { x: WORLD * 2, y: 1, z: WORLD * 2 }));
	// Nobody leaves the world.
	for (const [x, z, hx, hz] of [[0, -WORLD, WORLD, 2], [0, WORLD, WORLD, 2], [-WORLD, 0, 2, WORLD], [WORLD, 0, 2, WORLD]]) solid(R.ColliderDesc.cuboid(hx, 200, hz).setTranslation(x, 0, z));

	// What grows where: grass, forest floor, bare rock, gravel, every 2 m.
	const S = 1024;
	const paint = new Uint8Array(S * S * 4);
	for (let j = 0; j < S; j++) {
		for (let i = 0; i < S; i++) {
			const x = ((i + 0.5) / S) * WORLD * 2 - WORLD;
			const z = ((j + 0.5) / S) * WORLD * 2 - WORLD;
			const slope = shape.slopeAt(x, z);
			const d = shape.distanceAt(x, z);
			const wood = shape.woodAt(x, z);
			let rocky = smooth(0.42, 0.62, slope + (fbm(x / 26, z / 26, 2) - 0.5) * 0.3);
			let stony = smooth(9, 2, d - 4) * 0.95;
			if (shape.inYard(x, z)) {
				const under = shape.surfaceAt(x, z);
				stony = under === 'grass' ? 0 : 1;
				rocky = 0;
			} else {
				// The open space's edge fades out into the meadow.
				stony = Math.max(stony, smooth(26, 4, shape.outsideYard(x, z)));
			}
			const rest = (1 - rocky) * (1 - stony);
			const k = (j * S + i) * 4;
			paint[k] = 255 * rest * (1 - wood);
			paint[k + 1] = 255 * rest * wood;
			paint[k + 2] = 255 * rocky * (1 - stony);
			paint[k + 3] = 255 * stony;
		}
	}
	const splat = new DataTexture(paint, S, S, RGBAFormat);
	splat.minFilter = LinearMipmapLinearFilter;
	splat.magFilter = LinearFilter;
	splat.wrapS = splat.wrapT = ClampToEdgeWrapping;
	splat.generateMipmaps = true;
	splat.needsUpdate = true;
	progress('The land');
	await new Promise((go) => setTimeout(go));

	// The land's picture, in pieces that can be left out and drawn coarser far away.
	const land = landMaterial(maps, splat, light);
	const perChunk = Math.floor((n - 1) / CHUNKS);
	const chunks = [];
	const normalOf = (i, j) => {
		const at = (a, b) => shape.heights[Math.max(0, Math.min(n - 1, b)) * n + Math.max(0, Math.min(n - 1, a))];
		const v = new Vector3(at(i - 1, j) - at(i + 1, j), 2 * CELL, at(i, j - 1) - at(i, j + 1));
		return v.normalize();
	};
	const indexFor = (span, step) => {
		const line = span + 1;
		const index = [];
		for (let b = 0; b < span; b += step) {
			for (let a = 0; a < span; a += step) {
				const p = b * line + a;
				const q = b * line + a + step;
				const r = (b + step) * line + a;
				const s = (b + step) * line + a + step;
				index.push(p, r, q, q, r, s);
			}
		}
		// A skirt round the edge hides the steps between coarse and fine.
		const skirtStart = line * line;
		const edge = [];
		for (let a = 0; a < span; a += step) edge.push([a, 0, a + step, 0]);
		for (let a = 0; a < span; a += step) edge.push([span, a, span, a + step]);
		for (let a = span; a > 0; a -= step) edge.push([a, span, a - step, span]);
		for (let a = span; a > 0; a -= step) edge.push([0, a, 0, a - step]);
		const skirtOf = (x, y) => {
			if (y === 0) return skirtStart + x;
			if (x === span) return skirtStart + line + y - 1;
			if (y === span) return skirtStart + line + span + (span - x) - 1;
			return skirtStart + line + span * 2 + (span - y) - 1;
		};
		for (const [a, b2, c, d] of edge) {
			const top1 = b2 * line + a;
			const top2 = d * line + c;
			index.push(top1, top2, skirtOf(a, b2), top2, skirtOf(c, d), skirtOf(a, b2));
		}
		return index;
	};
	const span = perChunk;
	const LEVELS = [1, 2, 5];
	const indexes = LEVELS.map((step) => new BufferAttribute(new Uint32Array(indexFor(span, step)), 1));
	for (let cz = 0; cz < CHUNKS; cz++) {
		for (let cx = 0; cx < CHUNKS; cx++) {
			const line = span + 1;
			const skirtCount = line + span + span + span - 1;
			const count = line * line + skirtCount + 1;
			const position = new Float32Array(count * 3);
			const normal = new Float32Array(count * 3);
			const put = (k, i, j, drop) => {
				const ii = cx * span + i;
				const jj = cz * span + j;
				position[k * 3] = ii * CELL - WORLD;
				position[k * 3 + 1] = shape.heights[jj * n + ii] - drop;
				position[k * 3 + 2] = jj * CELL - WORLD;
				const no = normalOf(ii, jj);
				normal[k * 3] = no.x;
				normal[k * 3 + 1] = no.y;
				normal[k * 3 + 2] = no.z;
			};
			for (let j = 0; j < line; j++) for (let i = 0; i < line; i++) put(j * line + i, i, j, 0);
			let k = line * line;
			for (let i = 0; i < line; i++) put(k++, i, 0, 5);
			for (let j = 1; j <= span; j++) put(k++, span, j, 5);
			for (let i = span - 1; i >= 0; i--) put(k++, i, span, 5);
			for (let j = span - 1; j > 0; j--) put(k++, 0, j, 5);
			const pos = new BufferAttribute(position, 3);
			const nor = new BufferAttribute(normal, 3);
			const levels = indexes.map((index) => {
				const g = new BufferGeometry();
				g.setAttribute('position', pos);
				g.setAttribute('normal', nor);
				g.setIndex(index);
				g.computeBoundingSphere();
				const mesh = new Mesh(g, land);
				mesh.receiveShadow = true;
				mesh.visible = false;
				group.add(mesh);
				return mesh;
			});
			levels[0].visible = true;
			chunks.push({ x: (cx + 0.5) * span * CELL - WORLD, z: (cz + 0.5) * span * CELL - WORLD, levels, level: 0 });
		}
	}
	progress('The road');
	await new Promise((go) => setTimeout(go));

	// The road: a strip with a bevel at each side that dips into the land, in lengths that can be left out.
	const road = roadMaterial(maps, light);
	const pts = shape.road.points;
	const CROSS = [-2, -1.25, -1, -0.5, 0, 0.5, 1, 1.25, 2];
	const dipOf = (c) => (Math.abs(c) <= 1 ? 0 : Math.abs(c) < 1.5 ? 0.06 : 0.55);
	const across = CROSS.length;
	const verts = new Float32Array(pts.length * across * 3);
	const attrs = new Float32Array(pts.length * across * 4);
	pts.forEach((p, i) => {
		CROSS.forEach((c, k) => {
			const m = c * p.half;
			const at = (i * across + k) * 3;
			verts[at] = p.x + p.sx * m;
			verts[at + 1] = p.y + p.bank * Math.max(-p.half, Math.min(p.half, m)) - dipOf(c);
			verts[at + 2] = p.z + p.sz * m;
			const a = (i * across + k) * 4;
			attrs[a] = m;
			attrs[a + 1] = p.s;
			attrs[a + 2] = p.half;
			attrs[a + 3] = p.sealed;
		});
	});
	const quads = [];
	for (let i = 0; i < pts.length - 1; i++) {
		for (let k = 0; k < across - 1; k++) {
			const a = i * across + k;
			quads.push(a, a + across, a + 1, a + 1, a + across, a + across + 1);
		}
	}
	const whole = new BufferGeometry();
	whole.setAttribute('position', new BufferAttribute(verts, 3));
	whole.setIndex(quads);
	whole.computeVertexNormals();
	const normals = whole.getAttribute('normal');
	const pieceLength = 40;
	for (let start = 0; start < pts.length - 1; start += pieceLength) {
		const end = Math.min(pts.length - 1, start + pieceLength);
		const g = new BufferGeometry();
		const count = (end - start + 1) * across;
		g.setAttribute('position', new BufferAttribute(verts.slice(start * across * 3, start * across * 3 + count * 3), 3));
		g.setAttribute('normal', new BufferAttribute(normals.array.slice(start * across * 3, start * across * 3 + count * 3), 3));
		g.setAttribute('aRoad', new BufferAttribute(attrs.slice(start * across * 4, start * across * 4 + count * 4), 4));
		const index = [];
		for (let i = 0; i < end - start; i++) {
			for (let k = 0; k < across - 1; k++) {
				const a = i * across + k;
				index.push(a, a + across, a + 1, a + 1, a + across, a + across + 1);
			}
		}
		g.setIndex(index);
		g.computeBoundingSphere();
		const piece = new Mesh(g, road);
		piece.receiveShadow = true;
		group.add(piece);
	}
	solid(R.ColliderDesc.trimesh(verts, new Uint32Array(quads)));

	// The open space's own sealed parts, in the same places as the yard's: the lane and the circle.
	{
		const flat = (position, attr, index) => {
			const g = new BufferGeometry();
			g.setAttribute('position', new BufferAttribute(new Float32Array(position), 3));
			g.setAttribute('normal', new BufferAttribute(new Float32Array(position.length).map((_, i) => (i % 3 === 1 ? 1 : 0)), 3));
			g.setAttribute('aRoad', new BufferAttribute(new Float32Array(attr), 4));
			g.setIndex(index);
			g.computeBoundingSphere();
			const mesh = new Mesh(g, road);
			mesh.receiveShadow = true;
			group.add(mesh);
		};
		const { place } = await import('./yard.js');
		const position = [];
		const attr = [];
		const index = [];
		const FROM = -135;
		const TO = 140;
		const HALF = 8;
		const steps = 28;
		for (let i = 0; i <= steps; i++) {
			const u = FROM + ((TO - FROM) * i) / steps;
			for (const v of [-HALF, 0, HALF]) {
				const p = place(u, v);
				position.push(p.x, 0.02, p.z);
				attr.push(v, u, HALF, 1);
			}
		}
		for (let i = 0; i < steps; i++) {
			for (let k = 0; k < 2; k++) {
				const a = i * 3 + k;
				index.push(a, a + 1, a + 3, a + 1, a + 4, a + 3);
			}
		}
		flat(position, attr, index);
		const middle = place(62, 30);
		const circle = [middle.x, 0.02, middle.z];
		const circleAttr = [0, 0, 40, 1];
		const circleIndex = [];
		const RIM = 48;
		for (let i = 0; i < RIM; i++) {
			const a = (i / RIM) * Math.PI * 2;
			circle.push(middle.x + Math.cos(a) * 23, 0.02, middle.z + Math.sin(a) * 23);
			circleAttr.push(Math.cos(a) * 23, Math.sin(a) * 23, 40, 1);
			circleIndex.push(0, 1 + ((i + 1) % RIM), 1 + i);
		}
		flat(circle, circleAttr, circleIndex);
	}

	// The sky, on a sphere that goes where the camera goes.
	sky.colorSpace = SRGBColorSpace;
	sky.anisotropy = 4;
	const skyShare = skyInfo.share;
	const skyGeometry = new SphereGeometry(40, 48, 24, 0, Math.PI * 2, 0, Math.PI * skyShare);
	const skyMesh = new Mesh(
		skyGeometry,
		new MeshBasicMaterial({
			map: sky,
			side: BackSide,
			depthWrite: false,
			depthTest: false,
			fog: false,
			toneMapped: false,
		}),
	);
	sky.wrapS = RepeatWrapping;
	skyMesh.renderOrder = -10;
	skyMesh.frustumCulled = false;
	group.add(skyMesh);

	// What the paint reflects: the same sky, over this land.
	const reflected = new Scene();
	reflected.add(new Mesh(new SphereGeometry(10, 32, 16, 0, Math.PI * 2, 0, Math.PI * skyShare), new MeshBasicMaterial({ map: sky, side: BackSide, toneMapped: false })));
	const under = new Mesh(new SphereGeometry(10, 16, 8, 0, Math.PI * 2, Math.PI * skyShare, Math.PI * (1 - skyShare)), new MeshBasicMaterial({ color: '#4b4a33', side: BackSide, toneMapped: false }));
	reflected.add(under);
	const pmrem = new PMREMGenerator(renderer);
	const environment = pmrem.fromScene(reflected, 0.01).texture;
	pmrem.dispose();

	progress('The trees');
	await new Promise((go) => setTimeout(go));
	const furniture = await addFurniture({ R, group, shape, solid, light });
	const forestLife = await addForest({ R, group, shape, maps: { ...maps, splat }, solid, unsolid, light, loader, renderer, sun: skyInfo.sun });
	progress('The stage');

	const worldCamera = new Vector3();
	let frame = 0;
	const updateLevels = (camera) => {
		for (const c of chunks) {
			const d = Math.hypot(c.x - camera.position.x, c.z - camera.position.z) - (span * CELL) / 2;
			const want = d < 90 ? 0 : d < 300 ? 1 : 2;
			if (want !== c.level) {
				c.levels[c.level].visible = false;
				c.levels[want].visible = true;
				c.level = want;
			}
		}
	};

	return {
		name: 'stage',
		start: null,
		group,
		environment,
		environmentIntensity: 0.62,
		// Where the sun is in the picture, as this sphere wraps it.
		sun: new Vector3(skyInfo.sun[0], skyInfo.sun[1], -skyInfo.sun[2]),
		sunColour: '#fff0dc',
		sunIntensity: 3.1,
		hemisphere: { sky: '#bcd0e6', ground: '#6b6242', intensity: 0.62 },
		fog: { colour: `rgb(${skyInfo.horizon.map((c) => Math.round(c * 255)).join(',')})`, near: 260, far: 1500 },
		far: 2600,
		bounds: WORLD,
		surfaceAt: shape.surfaceAt,
		heightAt: (x, z) => (shape.inYard(x, z) ? 0 : shape.heightAt(x, z)),
		shape,
		/** On or off, drawn and solid. */
		setActive(on) {
			group.visible = on;
			for (const c of colliders) c.setEnabled(on);
		},
		/** Each physics step, where the car is. */
		solidAround(x, z) {
			forestLife.solidAround(x, z);
		},
		/** `car` is what's drawn, `.object` and `.size`: grass lies flat under it, and it snaps what it hits. */
		update(dt, camera, car, snapped) {
			skyMesh.position.copy(camera.getWorldPosition(worldCamera));
			forestLife.update(dt, camera, car);
			furniture.update(car, snapped);
			if (frame++ % 12 === 0) updateLevels(camera);
		},
		/** Every piece of every level, so the warm-up can send them all to the GPU. */
		allPieces() {
			const out = [];
			group.traverse((o) => {
				if (o.isMesh) out.push(o);
			});
			return out;
		},
		reset() {
			furniture.reset();
		},
		standing() {
			return { ...furniture.standing(), trunks: forestLife.standing().map(({ x, z }) => ({ x, z })) };
		},
		lower() {
			forestLife.lower();
		},
		kindOf() {
			return undefined;
		},
		count: { chunks: chunks.length },
	};
}
