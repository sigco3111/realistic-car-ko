// What grows on the stage. Pines and aspens grown by ez-tree: the real tree close to, a thinner one further off, and a picture of it
// beyond that, all drawn in instances. Grass near the camera, in one draw, wrapped round wherever the camera goes, and only where the
// land's painted as grass: never on the road. Every trunk near the car is solid: thousands of them at once would take all the physics' time.
import {
	BufferAttribute,
	BufferGeometry,
	Color,
	DataTexture,
	DataUtils,
	DirectionalLight,
	DoubleSide,
	DynamicDrawUsage,
	HalfFloatType,
	HemisphereLight,
	InstancedBufferAttribute,
	InstancedBufferGeometry,
	InstancedMesh,
	LinearFilter,
	Matrix4,
	Mesh,
	MeshStandardMaterial,
	OrthographicCamera,
	PlaneGeometry,
	Quaternion,
	RedFormat,
	RepeatWrapping,
	Scene,
	SRGBColorSpace,
	Vector2,
	Vector3,
	WebGLRenderTarget,
} from 'three';
import { CELL, fbm, SIZE, WORLD } from './stage-shape.js';

const SPECIES = {
	pine: { bark: 'bark-pine', leaf: 'pine-leaf', tall: [17, 27] },
	aspen: { bark: 'bark-aspen', leaf: 'aspen-leaf', tall: [12, 19] },
};
const up = new Vector3(0, 1, 0);
const ahead = new Vector3();
// How far a blade can lean from where it grows: what's kept clear round the car, on top of the car.
const BLADE = 0.3;

/** The wind in the leaves, in a few lines of the vertex shader. */
function withWind(material, time, key) {
	material.onBeforeCompile = (shader) => {
		shader.uniforms.windTime = time;
		shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nuniform float windTime;').replace(
			'#include <begin_vertex>',
			`#include <begin_vertex>
			#ifdef USE_INSTANCING
			float windSeed = instanceMatrix[3][0] * 0.13 + instanceMatrix[3][2] * 0.17;
			#else
			float windSeed = 0.0;
			#endif
			float windHigh = position.y * position.y * 0.0004;
			transformed.x += sin(windTime * 1.3 + windSeed + position.y * 0.1) * windHigh;
			transformed.z += cos(windTime * 1.1 + windSeed * 1.3 + position.x * 0.2) * windHigh * 0.7;`,
		);
	};
	material.customProgramCacheKey = () => key;
}

// A trunk stops the car, but a bough doesn't, and a low rock passes under its solid body: what's inside the car isn't drawn.
const carInverse = { value: new Matrix4() };
const carMiddle = { value: new Vector3() };
const carExtent = { value: new Vector3() };
export function keepOutOfCar(material, key) {
	const before = material.onBeforeCompile;
	material.onBeforeCompile = (shader, renderer) => {
		before.call(material, shader, renderer);
		Object.assign(shader.uniforms, { carInverse, carMiddle, carExtent });
		shader.vertexShader = shader.vertexShader
			.replace('#include <common>', '#include <common>\nuniform mat4 carInverse;\nvarying vec3 vInCar;')
			.replace('#include <project_vertex>', `#include <project_vertex>
				#ifdef USE_INSTANCING
					vInCar = (carInverse * modelMatrix * instanceMatrix * vec4(transformed, 1.0)).xyz;
				#else
					vInCar = vec3(1e4);
				#endif`);
		shader.fragmentShader = shader.fragmentShader
			.replace('#include <common>', '#include <common>\nuniform vec3 carMiddle, carExtent;\nvarying vec3 vInCar;')
			.replace('#include <clipping_planes_fragment>', `#include <clipping_planes_fragment>
				if (all(lessThan(abs(vInCar - carMiddle), carExtent))) discard;`);
	};
	material.customProgramCacheKey = () => key;
}

export async function addForest({ R, group, shape, maps, solid, unsolid, light, loader, renderer, sun }) {
	const [meta, bin] = await Promise.all([fetch('stage/trees.json').then((r) => r.json()), fetch('stage/trees.bin').then((r) => r.arrayBuffer())]);
	const time = { value: 0 };
	const load = async (name, colour, wrap) => {
		const t = await loader.loadAsync(`stage/${name}.webp`);
		if (colour) t.colorSpace = SRGBColorSpace;
		if (wrap) t.wrapS = t.wrapT = RepeatWrapping;
		t.anisotropy = 4;
		return t;
	};
	const kinds = {};
	for (const [name, s] of Object.entries(SPECIES)) {
		const [bark, leaf] = await Promise.all([load(s.bark, true, true), load(s.leaf, true, false)]);
		const barkMaterial = new MeshStandardMaterial({ map: bark, roughness: 0.95 });
		const leafMaterial = new MeshStandardMaterial({ map: leaf, roughness: 0.82, alphaTest: 0.45, side: DoubleSide });
		withWind(leafMaterial, time, `stage-leaf`);
		keepOutOfCar(barkMaterial, 'stage-bark-clear');
		keepOutOfCar(leafMaterial, 'stage-leaf-clear');
		const geometryOf = (part) => {
			const g = new BufferGeometry();
			const read = (Type, slot) => new Type(bin, slot.at, slot.length);
			g.setAttribute('position', new BufferAttribute(read(Float32Array, part.position), 3));
			g.setAttribute('normal', new BufferAttribute(read(Float32Array, part.normal), 3));
			g.setAttribute('uv', new BufferAttribute(read(Float32Array, part.uv), 2));
			g.setIndex(new BufferAttribute(read(Uint32Array, part.index), 1));
			return g;
		};
		const tiers = {};
		for (const tier of ['near', 'mid']) {
			const m = meta[name][tier];
			tiers[tier] = { branches: geometryOf(m.branches), leaves: geometryOf(m.leaves), height: m.height };
		}
		kinds[name] = { ...s, barkMaterial, leafMaterial, tiers };
	}

	// Pictures of the trees for far away, taken once, in the same light as everything else.
	const pictureCamera = new OrthographicCamera(-0.5, 0.5, 1, 0, 0.1, 400);
	const pictureScene = new Scene();
	pictureScene.add(new HemisphereLight('#c9d9ea', '#6e6240', 1.2));
	const pictureSun = new DirectionalLight('#fff0dc', 3);
	pictureSun.position.set(0.6, 0.75, 0.9);
	pictureScene.add(pictureSun);
	for (const [, kind] of Object.entries(kinds)) {
		const { branches, leaves, height } = kind.tiers.near;
		const parts = [new Mesh(branches, kind.barkMaterial), new Mesh(leaves, kind.leafMaterial)];
		for (const p of parts) pictureScene.add(p);
		leaves.computeBoundingBox();
		const box = leaves.boundingBox;
		const half = Math.max(Math.abs(box.min.x), box.max.x, Math.abs(box.min.z), box.max.z) * 1.04;
		const width = half * 2;
		Object.assign(pictureCamera, { left: -half, right: half, top: height * 1.02, bottom: 0 });
		pictureCamera.position.set(0, height / 2, 200);
		pictureCamera.lookAt(0, height / 2, 0);
		pictureCamera.updateProjectionMatrix();
		const target = new WebGLRenderTarget(light ? 128 : 256, light ? 256 : 512, { generateMipmaps: true, minFilter: LinearFilter });
		const before = renderer.getClearAlpha();
		const colour = new Color();
		renderer.getClearColor(colour);
		// Clear to the leaf's own colour, not black, so the picture's edges don't come out dark.
		renderer.setClearColor('#2e3a1e', 0);
		renderer.setRenderTarget(target);
		renderer.clear();
		renderer.render(pictureScene, pictureCamera);
		renderer.setRenderTarget(null);
		renderer.setClearColor(colour, before);
		kind.picture = target.texture;
		kind.pictureAspect = width / (height * 1.02);
		for (const p of parts) pictureScene.remove(p);
	}

	// Where they stand.
	const planted = { pine: [], aspen: [] };
	const spacing = light ? 12 : 8.5;
	let s = 987654;
	const random = () => {
		s = (s * 1664525 + 1013904223) >>> 0;
		return s / 4294967296;
	};
	for (let z = -WORLD + 8; z < WORLD - 8; z += spacing) {
		for (let x = -WORLD + 8; x < WORLD - 8; x += spacing) {
			const px = x + (random() - 0.5) * spacing * 0.9;
			const pz = z + (random() - 0.5) * spacing * 0.9;
			const roll = random();
			const roll2 = random();
			const roll3 = random();
			const roll4 = random();
			const wood = shape.woodAt(px, pz);
			// Woods thick, a few strays in the open.
			if (roll > wood * 0.92 + 0.006) continue;
			const d = shape.distanceAt(px, pz);
			if (d < 11 || shape.slopeAt(px, pz) > 0.7 || shape.outsideYard(px, pz) < 6) continue;
			const edge = fbm(px / 90, pz / 90, 2);
			const name = roll2 < (edge > 0.5 ? 0.35 : 0.06) ? 'aspen' : 'pine';
			const [lo, hi] = SPECIES[name].tall;
			planted[name].push({ x: px, y: shape.heightAt(px, pz) - 0.1, z: pz, tall: lo + (hi - lo) * roll3 * roll3, yaw: roll4 * 6.283 });
		}
	}
	const buckets = new Map();
	const solidBuckets = new Map();
	const solidQueue = [];
	const solidCell = { x: -1, z: -1 };
	const BUCKET = 64;
	const keyOf = (x, z) => (Math.floor((x + WORLD) / BUCKET) << 12) | Math.floor((z + WORLD) / BUCKET);
	const NEAR = light ? 34 : 62;
	const MID = light ? 120 : 210;
	for (const [name, list] of Object.entries(planted)) {
		const kind = kinds[name];
		kind.list = list;
		const h = kind.tiers.near.height;
		list.forEach((t) => {
			t.matrix = new Matrix4().compose(new Vector3(t.x, t.y, t.z), new Quaternion().setFromAxisAngle(up, t.yaw), new Vector3(1, 1, 1).multiplyScalar(t.tall / h));
			t.kind = name;
			const k = keyOf(t.x, t.z);
			if (!buckets.has(k)) buckets.set(k, []);
			buckets.get(k).push(t);
		});
		const CAP = { near: light ? 40 : 90, mid: light ? 200 : 500 };
		kind.meshes = {};
		for (const tier of ['near', 'mid']) {
			const { branches, leaves } = kind.tiers[tier];
			const make = (g, material) => {
				const m = new InstancedMesh(g, material, CAP[tier]);
				m.instanceMatrix.setUsage(DynamicDrawUsage);
				m.frustumCulled = false;
				m.count = 0;
				m.castShadow = tier === 'near';
				m.receiveShadow = true;
				group.add(m);
				return m;
			};
			kind.meshes[tier] = [make(branches, kind.barkMaterial), make(leaves, kind.leafMaterial)];
			kind.meshes[tier].cap = CAP[tier];
		}
		// Far away: one quad a tree, turning to face the camera, gone when the real tree's close enough to draw.
		const quad = new InstancedBufferGeometry();
		const plane = new PlaneGeometry(1, 1).translate(0, 0.5, 0);
		quad.index = plane.index;
		quad.setAttribute('position', plane.getAttribute('position'));
		quad.setAttribute('uv', plane.getAttribute('uv'));
		quad.setAttribute('normal', plane.getAttribute('normal'));
		const spot = new Float32Array(list.length * 4);
		list.forEach((t, i) => spot.set([t.x, t.y, t.z, t.tall], i * 4));
		quad.setAttribute('aSpot', new InstancedBufferAttribute(spot, 4));
		quad.instanceCount = list.length;
		const picture = new MeshStandardMaterial({ map: kind.picture, alphaTest: 0.5, roughness: 1 });
		picture.onBeforeCompile = (shader) => {
			shader.uniforms.farFrom = { value: MID };
			shader.uniforms.pictureAspect = { value: kind.pictureAspect };
			shader.vertexShader = shader.vertexShader
				.replace('#include <common>', '#include <common>\nattribute vec4 aSpot;\nuniform float farFrom;\nuniform float pictureAspect;')
				.replace(
					'#include <begin_vertex>',
					`vec3 toCamera = cameraPosition - aSpot.xyz;
					vec2 flat2 = normalize(toCamera.xz);
					vec3 sideways = vec3(flat2.y, 0.0, -flat2.x);
					float present = step(farFrom, length(toCamera));
					vec3 transformed = aSpot.xyz + (sideways * position.x * aSpot.w * pictureAspect + vec3(0.0, position.y * aSpot.w, 0.0)) * present;`,
				)
				.replace('#include <beginnormal_vertex>', 'vec3 objectNormal = normalize(vec3(cameraPosition.x - aSpot.x, 12.0, cameraPosition.z - aSpot.z));');
		};
		picture.customProgramCacheKey = () => 'stage-tree-picture';
		const far = new Mesh(quad, picture);
		far.frustumCulled = false;
		far.receiveShadow = false;
		group.add(far);
		kind.far = far;
	}

	// Grass.
	const COUNT = light ? 22000 : 110000;
	const carAt = { value: new Vector3() };
	const carAxis = { value: new Vector2(0, 1) };
	const carHalf = { value: new Vector2(1, 2) };
	const SPAN = light ? 56 : 100;
	const heightData = new Uint16Array(SIZE * SIZE);
	for (let i = 0; i < heightData.length; i++) heightData[i] = DataUtils.toHalfFloat(shape.heights[i]);
	const heightMap = new DataTexture(heightData, SIZE, SIZE, RedFormat, HalfFloatType);
	heightMap.minFilter = heightMap.magFilter = LinearFilter;
	heightMap.needsUpdate = true;
	const blade = [];
	const shade = [];
	for (let b = 0; b < 3; b++) {
		const a = (b / 3) * 6.283 + 0.4;
		const ox = Math.cos(a * 1.7) * 0.12;
		const oz = Math.sin(a * 1.3) * 0.12;
		const wx = Math.cos(a) * 0.045;
		const wz = Math.sin(a) * 0.045;
		const lean = 0.22;
		blade.push(ox - wx, 0, oz - wz, ox + wx, 0, oz + wz, ox + Math.sin(a) * lean, 1, oz - Math.cos(a) * lean);
		shade.push(0, 0, 1);
	}
	const grassGeometry = new InstancedBufferGeometry();
	grassGeometry.setAttribute('position', new BufferAttribute(new Float32Array(blade), 3));
	grassGeometry.setAttribute('aShade', new BufferAttribute(new Float32Array(shade), 1));
	grassGeometry.setAttribute('normal', new BufferAttribute(new Float32Array(blade.length).map((_, i) => (i % 3 === 1 ? 1 : 0)), 3));
	const seeds = new Float32Array(COUNT * 3);
	for (let i = 0; i < COUNT * 3; i++) seeds[i] = random();
	grassGeometry.setAttribute('aSeed', new InstancedBufferAttribute(seeds, 3));
	grassGeometry.instanceCount = COUNT;
	const grassMaterial = new MeshStandardMaterial({ roughness: 0.9, side: DoubleSide });
	grassMaterial.onBeforeCompile = (shader) => {
		Object.assign(shader.uniforms, { tHeight: { value: heightMap }, tSplat: { value: maps.splat }, tGrass: { value: maps.grass }, grassSpan: { value: SPAN }, landSpan: { value: WORLD * 2 }, windTime: time, landCell: { value: (WORLD * 2) / (SIZE - 1) }, carAt, carAxis, carHalf });
		shader.vertexShader = shader.vertexShader
			.replace(
				'#include <common>',
				`#include <common>
				attribute vec3 aSeed;
				attribute float aShade;
				uniform sampler2D tHeight, tSplat, tGrass;
				uniform float grassSpan, landSpan, windTime, landCell;
				uniform vec3 carAt;
				uniform vec2 carAxis, carHalf;
				varying vec3 vBlade;`,
			)
			.replace(
				'#include <begin_vertex>',
				`vec2 local = mod(aSeed.xy * grassSpan - cameraPosition.xz + grassSpan * 0.5, grassSpan) - grassSpan * 0.5;
				vec2 spot = cameraPosition.xz + local;
				vec2 spotUv = spot / landSpan + 0.5;
				float grows = textureLod(tSplat, spotUv, 0.0).r;
				float ring = 1.0 - smoothstep(grassSpan * 0.32, grassSpan * 0.5, length(local));
				float tall = smoothstep(0.25, 0.5, grows) * ring * (0.22 + aSeed.z * 0.42);
				// Flat under the car, whichever way it's facing, with room for a blade's lean. carAt.z is 0 once it's flown clear of the grass.
				vec2 fromCar = spot - carAt.xy;
				vec2 outside = abs(vec2(dot(fromCar, carAxis), dot(fromCar, vec2(-carAxis.y, carAxis.x)))) - carHalf;
				tall *= mix(1.0, smoothstep(0.0, 0.3, length(max(outside, 0.0))), carAt.z);
				float turn = aSeed.z * 6.283;
				vec3 turned = vec3(position.x * cos(turn) - position.z * sin(turn), position.y * tall, position.x * sin(turn) + position.z * cos(turn));
				turned.xz *= smoothstep(0.0, 0.08, tall);
				turned.x += sin(windTime * 1.7 + spot.x * 0.4 + spot.y * 0.3) * 0.09 * position.y * tall;
				float groundHere = textureLod(tHeight, (spot + landSpan * 0.5) / (landSpan + landCell) + 0.5 * landCell / (landSpan + landCell), 0.0).r;
				vec3 transformed = vec3(spot.x, groundHere, spot.y) + turned;
				vec3 bladeColour = mix(vec3(0.24, 0.26, 0.07), vec3(0.42, 0.42, 0.13), aSeed.y);
				vBlade = bladeColour * mix(0.5, 1.2, aShade);`,
			);
		shader.fragmentShader = shader.fragmentShader
			.replace('#include <common>', '#include <common>\nvarying vec3 vBlade;')
			.replace('#include <map_fragment>', 'diffuseColor.rgb = vBlade;')
			.replace('#include <normal_fragment_maps>', 'normal = normalize((viewMatrix * vec4(0.0, 1.0, 0.0, 0.0)).xyz);');
	};
	grassMaterial.customProgramCacheKey = () => 'stage-grass';
	const grassMesh = new Mesh(grassGeometry, grassMaterial);
	grassMesh.frustumCulled = false;
	grassMesh.receiveShadow = true;
	group.add(grassMesh);

	// Which trees are drawn how, redone when the camera's moved on far enough to matter.
	const last = new Vector3(1e9, 0, 0);
	const assign = (camera) => {
		const p = camera.position;
		if (Math.hypot(p.x - last.x, p.z - last.z) < 6) return;
		last.copy(p);
		const counts = { pine: { near: 0, mid: 0 }, aspen: { near: 0, mid: 0 } };
		const reach = Math.ceil(MID / BUCKET);
		const cx = Math.floor((p.x + WORLD) / BUCKET);
		const cz = Math.floor((p.z + WORLD) / BUCKET);
		for (let bx = cx - reach; bx <= cx + reach; bx++) {
			for (let bz = cz - reach; bz <= cz + reach; bz++) {
				const bucket = buckets.get((bx << 12) | bz);
				if (!bucket) continue;
				for (const t of bucket) {
					const d = Math.hypot(t.x - p.x, t.z - p.z);
					if (d >= MID) continue;
					const tier = d < NEAR ? 'near' : 'mid';
					const kind = kinds[t.kind];
					const count = counts[t.kind];
					if (count[tier] >= kind.meshes[tier].cap) continue;
					kind.meshes[tier][0].setMatrixAt(count[tier], t.matrix);
					kind.meshes[tier][1].setMatrixAt(count[tier], t.matrix);
					count[tier]++;
				}
			}
		}
		for (const [name, kind] of Object.entries(kinds)) {
			for (const tier of ['near', 'mid']) {
				for (const m of kind.meshes[tier]) {
					m.count = counts[name][tier];
					m.instanceMatrix.needsUpdate = true;
				}
			}
		}
	};

	return {
		count: { pine: planted.pine.length, aspen: planted.aspen.length, grass: COUNT },
		/** Keeps the trunks round this place solid, a few each physics step, and lets go of those it's left well behind. */
		solidAround(x, z) {
			const cx = Math.floor((x + WORLD) / BUCKET);
			const cz = Math.floor((z + WORLD) / BUCKET);
			if (cx !== solidCell.x || cz !== solidCell.z) {
				solidCell.x = cx;
				solidCell.z = cz;
				for (const [key, list] of solidBuckets) {
					if (Math.abs((key >> 12) - cx) <= 2 && Math.abs((key & 4095) - cz) <= 2) continue;
					for (const c of list) unsolid(c);
					solidBuckets.delete(key);
				}
				// The cell it's in first.
				for (const [i, j] of [[0, 0], [1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]) {
					const key = ((cx + i) << 12) | (cz + j);
					if (solidBuckets.has(key) || !buckets.has(key)) continue;
					const made = [];
					solidBuckets.set(key, made);
					for (const t of buckets.get(key)) solidQueue.push({ t, made });
				}
			}
			for (let n = 0; n < 30 && solidQueue.length; n++) {
				const { t, made } = solidQueue.shift();
				if (made === solidBuckets.get(keyOf(t.x, t.z))) made.push(solid(R.ColliderDesc.cylinder(3, Math.max(0.16, t.tall * 0.012)).setTranslation(t.x, t.y + 3, t.z)));
			}
		},
		/** Where the trunks stand. */
		standing() {
			return [...planted.pine, ...planted.aspen];
		},
		update(dt, camera, car) {
			time.value += dt;
			assign(camera);
			if (car) {
				const o = car.object;
				const f = o.getWorldDirection(ahead);
				const flat = Math.hypot(f.x, f.z) || 1;
				carAxis.value.set(f.x / flat, f.z / flat);
				carHalf.value.set(car.size.length / 2 + BLADE, car.size.width / 2 + BLADE);
				const above = o.position.y - shape.heightAt(o.position.x, o.position.z);
				carAt.value.set(o.position.x, o.position.z, 1 - Math.min(1, Math.max(0, (above - 1.6) / 0.8)));
				carInverse.value.copy(o.matrixWorld).invert();
				carMiddle.value.set(0, car.size.height / 2, 0);
				carExtent.value.set(car.size.width / 2 + 0.05, car.size.height / 2 + 0.05, car.size.length / 2 + 0.05);
			}
		},
		lower() {
			grassGeometry.instanceCount = Math.floor(COUNT / 2);
		},
	};
}
