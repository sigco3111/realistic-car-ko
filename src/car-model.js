// Puts a model on a Car: finds its wheels and size, merges what doesn't move into a few draws, and each frame moves it to
// where the physics says, wheels and steering too. Any glTF works if its wheels are separate nodes; say which is which
// with `names` when they aren't called part_wheel_fl and so on. The model's front must face +Z, with the ground at y = 0.
import { Box3, BufferAttribute, BufferGeometry, Group, Matrix4, Mesh, Quaternion, Vector3 } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

const DEFAULT_NAMES = { fl: 'part_wheel_fl', fr: 'part_wheel_fr', rl: 'part_wheel_rl', rr: 'part_wheel_rr' };
const box = new Box3();
const size = new Vector3();
const centre = new Vector3();
const target = new Quaternion();
const turn = new Quaternion();
const aim = new Vector3();
const ALONG = new Vector3(0, 0, 1);

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

// A copy with every attribute as plain floats: a model may store them packed, and packed values can neither take a matrix
// without losing precision nor merge with other kinds.
function plainFloats(geometry) {
	const g = geometry.clone();
	for (const [name, attribute] of Object.entries(g.attributes)) {
		const { count, itemSize } = attribute;
		const array = new Float32Array(count * itemSize);
		for (let i = 0; i < count; i++) for (let c = 0; c < itemSize; c++) array[i * itemSize + c] = attribute.getComponent(i, c);
		g.setAttribute(name, new BufferAttribute(array, itemSize));
	}
	return g;
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
			const g = plainFloats(m.geometry);
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

// A part's meshes, baked in the part's own frame or the model's, and held by a group at the part's origin.
const CABIN = {
	rpm: 'part_needle_rpm',
	speed: 'part_needle_speed',
	clutch: 'part_pedal_clutch',
	brake: 'part_pedal_brake',
	throttle: 'part_pedal_throttle',
	handbrake: 'part_handbrake',
	gear: 'part_gear_lever',
};
const INSIDE_GLASS = 0.12;
const AXIS_X = new Vector3(1, 0, 0);
const AXIS_Z = new Vector3(0, 0, 1);

function holdPart(node, frame = 'model') {
	const at = new Vector3().setFromMatrixPosition(node.matrixWorld);
	const group = new Group();
	group.position.copy(at);
	const inner = new Group();
	group.add(inner);
	if (frame === 'model') inner.position.copy(at).negate();
	return { group, inner, at };
}

/**
 * What the car looks like. `new CarModel(model, car)` takes the model as loaded (keeping its materials), then call
 * `view.update(dt, alpha)` once a frame after stepping, with alpha how far the frame is between the last two steps.
 *
 * It moves, when the model has them (fl, fr, rl, rr):
 * - part_wheel_*: up and down with the suspension, and spinning.
 * - part_steer_*: an upright that carries a wheel, up and down and steering, origin at the wheel's centre. It doesn't spin.
 * - part_lca_* and part_uca_*: suspension arms, origin at the inboard pivot, turning about the car's long axis.
 * - part_spring_*: origin at the top mount, local +Y towards the lower mount, aimed at an empty mount_spring_* on the
 *   lower arm and stretched along Y.
 * - part_steering_wheel: turning about whichever of its own axes runs most along the car, or `wheelAxis` when it's given.
 * - The cabin, with `cabin` giving how far each part moves: part_needle_rpm and part_needle_speed turning about local Z,
 *   part_pedal_clutch, part_pedal_brake, part_pedal_throttle and part_handbrake about local X, and part_gear_lever
 *   rocking about local X on a shift. Needles and pedals only show after `showInside(true)`.
 */
export class CarModel {
	constructor(model, car, { names = DEFAULT_NAMES, steerNames = { fl: 'part_steer_fl', fr: 'part_steer_fr', rl: 'part_steer_rl', rr: 'part_steer_rr' }, bump = 0.13, droop = 0.2, wheelTurn = 5, wheelAxis = null, cabin = null, cabinGlow = 0 } = {}) {
		this.car = car;
		this.object = new Group();
		this.object.name = 'car';
		this.bump = bump;
		this.droop = droop;
		this.wheelTurn = wheelTurn;
		model.updateMatrixWorld(true);
		const moving = new Set([...Object.values(names), ...Object.values(steerNames)]);
		for (const key of Object.keys(names)) for (const part of ['part_lca_', 'part_uca_', 'part_spring_']) moving.add(part + key);
		moving.add('part_steering_wheel');
		for (const name of Object.values(CABIN)) moving.add(name);
		const nodes = new Map();
		for (const w of car.wheels) {
			const wheel = model.getObjectByName(names[w.key]);
			const steerNode = steerNames[w.key] ? model.getObjectByName(steerNames[w.key]) : null;
			const holder = new Group();
			holder.position.set(w.x, w.y, w.z);
			// The wheel spins about its own centre, whatever node it came from.
			const spin = new Group();
			holder.add(spin);
			const inner = new Group();
			inner.position.set(-w.x, -w.y, -w.z);
			spin.add(inner);
			for (const mesh of merged(wheel, () => false)) {
				mesh.applyMatrix4(wheel.matrixWorld);
				inner.add(mesh);
			}
			// The upright doesn't spin.
			if (steerNode) {
				const still = new Group();
				still.position.set(-w.x, -w.y, -w.z);
				holder.add(still);
				for (const mesh of merged(steerNode, (o) => o === wheel)) {
					mesh.applyMatrix4(steerNode.matrixWorld);
					still.add(mesh);
				}
			}
			this.object.add(holder);
			const node = { holder, spin, y: 0, arms: [], spring: null };

			for (const name of [`part_lca_${w.key}`, `part_uca_${w.key}`]) {
				const arm = model.getObjectByName(name);
				if (!arm) continue;
				const { group, inner: into, at } = holdPart(arm);
				for (const mesh of merged(arm, () => false)) {
					mesh.applyMatrix4(arm.matrixWorld);
					mesh.castShadow = false;
					into.add(mesh);
				}
				this.object.add(group);
				const reach = w.x - at.x;
				const entry = { group, at, reach };
				node.arms.push(entry);
				const mount = arm.getObjectByName(`mount_spring_${w.key}`);
				if (mount) {
					entry.mount = new Vector3().setFromMatrixPosition(mount.matrixWorld).sub(at);
					node.lower = entry;
				}
			}
			const springNode = model.getObjectByName(`part_spring_${w.key}`);
			if (springNode && node.lower) {
				const { group, inner: into, at } = holdPart(springNode, 'own');
				for (const mesh of merged(springNode, () => false)) {
					mesh.castShadow = false;
					into.add(mesh);
				}
				this.object.add(group);
				const rest = node.lower.mount.clone().add(node.lower.at).sub(at);
				springNode.getWorldQuaternion(group.quaternion);
				node.spring = { group, at, length: rest.length(), restDir: rest.clone().normalize(), restQ: group.quaternion.clone() };
			}
			nodes.set(w.key, node);
		}
		for (const mesh of merged(model, (o) => moving.has(o.name))) this.object.add(mesh);
		// An empty called eye_driver is where the driver's eye goes.
		this.eye = model.getObjectByName('eye_driver')?.getWorldPosition(new Vector3()) ?? null;
		const wheelNode = model.getObjectByName('part_steering_wheel');
		if (wheelNode) {
			const { group, inner: into } = holdPart(wheelNode, 'own');
			for (const mesh of merged(wheelNode, () => false)) into.add(mesh);
			wheelNode.getWorldQuaternion(group.quaternion);
			this.object.add(group);
			// Its column is whichever of its own axes runs most along the car. Turned so that left is anticlockwise to the driver.
			let axis = null;
			let best = 0;
			for (const local of [new Vector3(1, 0, 0), new Vector3(0, 1, 0), new Vector3(0, 0, 1)]) {
				const along = local.clone().applyQuaternion(group.quaternion).z;
				if (Math.abs(along) > best) {
					best = Math.abs(along);
					axis = local.multiplyScalar(-Math.sign(along));
				}
			}
			this.steeringWheel = { group, restQ: group.quaternion.clone(), axis: wheelAxis ? new Vector3(wheelAxis.x, wheelAxis.y, wheelAxis.z) : axis };
		}
		// The cabin's parts, each about its own origin.
		this.cabin = cabin;
		this.parts = {};
		for (const [key, name] of Object.entries(CABIN)) {
			const node = model.getObjectByName(name);
			if (!node) continue;
			const { group, inner: into } = holdPart(node, 'own');
			for (const mesh of merged(node, () => false)) {
				mesh.castShadow = false;
				into.add(mesh);
			}
			node.getWorldQuaternion(group.quaternion);
			this.object.add(group);
			this.parts[key] = { group, restQ: group.quaternion.clone(), amount: 0 };
		}
		// Glass looks right from outside and too dark from in the seat.
		this.glass = new Set();
		this.object.traverse((o) => {
			if (o.isMesh && o.material.name === 'glass') this.glass.add(o.material);
		});
		for (const m of this.glass) m.userData.outside = m.opacity;
		// The eye adapts to a dark cabin in a bright yard, so from the seat its trim lifts a little. Always set up, off outside, so
		// that swapping views compiles nothing.
		this.object.traverse((o) => {
			if (cabinGlow && o.isMesh && o.material.name === 'trim' && o.material.map && !this.trim) {
				this.trim = o.material;
				this.trim.emissive.set('#ffffff');
				this.trim.emissiveMap = this.trim.map;
				this.trim.emissiveIntensity = 0;
			}
		});
		this.cabinGlow = cabinGlow;
		this.shiftRock = 0;
		this.lastGear = 1;
		this.showInside(false);
		// A material called brake_light glows when the brakes are on.
		this.object.traverse((o) => {
			if (o.isMesh && o.material.name === 'brake_light') this.brakeLight = o.material;
		});
		if (this.brakeLight) {
			this.brakeLight.emissive.set('#ff1608');
			this.brakeLight.emissiveIntensity = 0;
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
			for (const arm of n.arms) arm.group.rotation.z = arm.reach ? Math.atan(n.y / Math.abs(arm.reach)) * Math.sign(arm.reach) : 0;
			if (n.spring) {
				const low = n.lower;
				// Where the lower mount has swung to, and the spring aimed at it from the top mount.
				aim.copy(low.mount).applyAxisAngle(ALONG, low.group.rotation.z).add(low.at).sub(n.spring.at);
				const length = aim.length();
				turn.setFromUnitVectors(n.spring.restDir, aim.divideScalar(length));
				n.spring.group.quaternion.copy(turn).multiply(n.spring.restQ);
				n.spring.group.scale.y = length / n.spring.length;
			}
		}
		if (this.brakeLight) {
			const on = car.input?.brake > 0 && car.gear > 0 ? 3.5 : car.input?.throttle > 0 && car.gear < 0 ? 3.5 : 0;
			this.brakeLight.emissiveIntensity += (on - this.brakeLight.emissiveIntensity) * Math.min(1, dt * 22);
		}
		if (this.steeringWheel) {
			const fronts = car.wheels.filter((w) => w.front);
			const steered = fronts.reduce((sum, w) => sum + w.steerAngle, 0) / (fronts.length || 1);
			this.steeringWheel.group.quaternion.copy(this.steeringWheel.restQ).multiply(turn.setFromAxisAngle(this.steeringWheel.axis, steered * this.wheelTurn));
		}
		if (this.cabin) this.updateCabin(dt);
	}

	/** Needles and pedals can't be seen from outside, so they only cost a draw from the seat. */
	showInside(on) {
		if (this.trim) this.trim.emissiveIntensity = on ? this.cabinGlow : 0;
		for (const m of this.glass) m.opacity = on ? Math.min(m.userData.outside, INSIDE_GLASS) : m.userData.outside;
		for (const key of ['rpm', 'speed', 'clutch', 'brake', 'throttle']) if (this.parts[key]) this.parts[key].group.visible = on;
	}

	updateCabin(dt) {
		const { car, cabin, parts } = this;
		const input = car.input ?? {};
		const move = (part, axis, angle) => {
			if (!part) return;
			part.group.quaternion.copy(part.restQ).multiply(turn.setFromAxisAngle(axis, angle));
		};
		// A needle swings quickly but not instantly, and a foot or hand takes a moment.
		const follow = (part, wanted, rate) => {
			if (!part) return 0;
			part.amount += (wanted - part.amount) * Math.min(1, dt * rate);
			return part.amount;
		};
		if (cabin.rpm) move(parts.rpm, AXIS_Z, cabin.rpm.sign * cabin.rpm.sweep * follow(parts.rpm, Math.min(1, car.rpm / cabin.rpm.full), 14));
		if (cabin.speed) move(parts.speed, AXIS_Z, cabin.speed.sign * cabin.speed.sweep * follow(parts.speed, Math.min(1, Math.abs(car.forwardSpeed) * 3.6 / cabin.speed.full), 8));
		const braking = car.gear < 0 ? input.throttle : input.brake;
		const going = car.gear < 0 ? input.brake : input.throttle;
		if (cabin.throttle) move(parts.throttle, AXIS_X, cabin.throttle * follow(parts.throttle, going ?? 0, 16));
		if (cabin.brake) move(parts.brake, AXIS_X, cabin.brake * follow(parts.brake, braking ?? 0, 16));
		if (cabin.clutch) move(parts.clutch, AXIS_X, cabin.clutch * follow(parts.clutch, car.shifting > 0 ? 1 : 0, 18));
		if (cabin.handbrake) move(parts.handbrake, AXIS_X, cabin.handbrake * follow(parts.handbrake, input.handbrake ?? 0, 18));
		if (cabin.gear && parts.gear) {
			if (car.gear !== this.lastGear) {
				this.shiftRock = car.gear > this.lastGear ? 1 : -1;
				this.lastGear = car.gear;
			}
			this.shiftRock -= this.shiftRock * Math.min(1, dt * 7);
			move(parts.gear, AXIS_X, cabin.gear * this.shiftRock);
		}
	}
}
