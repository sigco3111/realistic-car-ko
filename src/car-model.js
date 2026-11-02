// Puts a model on a Car: finds its wheels and size, merges what doesn't move into a few draws, and each frame moves it to
// where the physics says, wheels and steering too. Any glTF works if its wheels are separate nodes; say which is which
// with `names` when they aren't called part_wheel_fl and so on. The model's front must face +Z, with the ground at y = 0.
import { Box3, BufferGeometry, Group, Matrix4, Mesh, Quaternion, Vector3 } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const DEFAULT_NAMES = { fl: 'part_wheel_fl', fr: 'part_wheel_fr', rl: 'part_wheel_rl', rr: 'part_wheel_rr' };
const box = new Box3();
const size = new Vector3();
const centre = new Vector3();
const target = new Quaternion();

/** The car's size and its wheels, in the model's own metres: what `new Car` asks for. */
export function measureCar(model, names = DEFAULT_NAMES) {
	model.updateMatrixWorld(true);
	const wheels = [];
	for (const [key, name] of Object.entries(names)) {
		const node = model.getObjectByName(name);
		if (!node) throw new Error(`measureCar: no wheel called ${name} in this model`);
		box.setFromObject(node).getCenter(centre);
		box.getSize(size);
		wheels.push({ key, name, x: centre.x, y: centre.y, z: centre.z, radius: size.y / 2, front: key[0] === 'f' });
	}
	const skip = new Set(wheels.map((w) => w.name));
	const all = new Box3();
	model.traverse((o) => {
		if (!o.isMesh) return;
		for (let p = o; p; p = p.parent) if (skip.has(p.name)) return;
		all.expandByObject(o);
	});
	all.getSize(size);
	return { size: { width: size.x, height: all.max.y, length: size.z }, wheels };
}

// Every mesh under `root` with its matrix baked in, relative to root, joined per material. Drops attributes they don't all have.
function merged(root, keep) {
	root.updateMatrixWorld(true);
	const inverse = new Matrix4().copy(root.matrixWorld).invert();
	const byMaterial = new Map();
	const walk = (o) => {
		if (o !== root && keep(o)) return;
		if (o.isMesh) {
			if (!byMaterial.has(o.material)) byMaterial.set(o.material, []);
			byMaterial.get(o.material).push(o);
		}
		for (const c of o.children) walk(c);
	};
	walk(root);
	const out = [];
	for (const [material, meshes] of byMaterial) {
		const geometries = meshes.map((m) => {
			const g = m.geometry.clone();
			const matrix = new Matrix4().multiplyMatrices(inverse, m.matrixWorld);
			g.applyMatrix4(matrix);
			if (matrix.determinant() < 0 && g.index) {
				const a = g.index.array;
				for (let i = 0; i < a.length; i += 3) {
					const t = a[i + 1];
					a[i + 1] = a[i + 2];
					a[i + 2] = t;
				}
			}
			return g.index ? g : g.toNonIndexed();
		});
		const names = Object.keys(geometries[0].attributes).filter((n) => geometries.every((g) => g.attributes[n]));
		const clean = geometries.map((g) => {
			const c = new BufferGeometry();
			c.setIndex(g.index);
			for (const n of names) c.setAttribute(n, g.attributes[n]);
			return c;
		});
		const mesh = new Mesh(mergeGeometries(clean, false), material);
		mesh.castShadow = true;
		mesh.receiveShadow = true;
		out.push(mesh);
	}
	return out;
}

/**
 * What the car looks like. `new CarModel(model, car)` takes the model as loaded (keeping its materials), then call
 * `view.update(dt, alpha)` once a frame after stepping, with alpha how far the frame is between the last two steps.
 */
export class CarModel {
	constructor(model, car, { names = DEFAULT_NAMES, steerNames = { fl: 'part_steer_fl', fr: 'part_steer_fr' }, bump = 0.13, droop = 0.2 } = {}) {
		this.car = car;
		this.object = new Group();
		this.object.name = 'car';
		this.bump = bump;
		this.droop = droop;
		model.updateMatrixWorld(true);
		const moving = new Set([...Object.values(names), ...Object.values(steerNames)]);
		for (const mesh of merged(model, (o) => moving.has(o.name))) this.object.add(mesh);
		const nodes = new Map();
		for (const w of car.wheels) {
			const wheel = model.getObjectByName(names[w.key]);
			const steerNode = steerNames[w.key] ? model.getObjectByName(steerNames[w.key]) : null;
			// The wheel turns about its own centre, whatever node it came from.
			const spin = new Group();
			const holder = new Group();
			holder.position.set(w.x, w.y, w.z);
			holder.add(spin);
			const baseInverse = new Matrix4().makeTranslation(-w.x, -w.y, -w.z);
			const inner = new Group();
			inner.applyMatrix4(baseInverse);
			spin.add(inner);
			// Everything under the wheel, and whatever else the steering knuckle carries.
			const source = steerNode ?? wheel;
			for (const mesh of merged(source, () => false)) {
				mesh.applyMatrix4(source.matrixWorld);
				inner.add(mesh);
			}
			this.object.add(holder);
			nodes.set(w.key, { holder, spin, y: 0 });
		}
		this.nodes = nodes;
		this.prev = { position: car.position, quaternion: car.quaternion };
		this.cur = { position: car.position, quaternion: car.quaternion };
	}

	/** Puts this model on another Car of the same shape, for when the physics are rebuilt. */
	attach(car) {
		this.car = car;
		for (const n of this.nodes.values()) n.y = 0;
		this.snap();
	}

	/** Call after each physics step: remembers the last two, so a frame can land between them. */
	stepped() {
		this.prev.position = this.cur.position;
		this.prev.quaternion = this.cur.quaternion;
		this.cur.position = this.car.position;
		this.cur.quaternion = this.car.quaternion;
	}

	/** Jump to where the car is, with nothing to catch up on. */
	snap() {
		this.prev.position = this.cur.position = this.car.position;
		this.prev.quaternion = this.cur.quaternion = this.car.quaternion;
		this.update(1, 1);
	}

	update(dt, alpha = 1) {
		const { prev, cur, car, object } = this;
		const a = prev.position;
		const b = cur.position;
		object.position.set(a.x + (b.x - a.x) * alpha, a.y + (b.y - a.y) * alpha, a.z + (b.z - a.z) * alpha);
		const qa = prev.quaternion;
		const qb = cur.quaternion;
		object.quaternion.set(qa.x, qa.y, qa.z, qa.w).slerp(target.set(qb.x, qb.y, qb.z, qb.w), alpha);
		for (const w of car.wheels) {
			const n = this.nodes.get(w.key);
			const wanted = Math.min(this.bump, Math.max(-this.droop, w.ride - w.length));
			n.y += (wanted - n.y) * Math.min(1, dt * 40);
			n.holder.position.y = w.y + n.y;
			n.holder.rotation.y = w.front ? w.steerAngle : 0;
			n.spin.rotation.x = w.angle;
		}
	}
}
