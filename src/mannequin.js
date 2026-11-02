// Patch's mannequin standing about until something hits it, then a Rapier ragdoll. One skinned draw each: its rigid shells
// are joined into one mesh with every vertex on one bone, standing it plays a clip and falling the bodies drive the bones.
import { AnimationMixer, Bone, BufferAttribute, BufferGeometry, Color, LoopRepeat, Matrix4, MeshStandardMaterial, Quaternion, Skeleton, SkinnedMesh, Vector3 } from 'three';
import { mergeGeometries } from 'three/addons/utils/BufferGeometryUtils.js';

// Each part of the body: the bones it carries, the bone its capsule starts at and the one it ends at, its radius and mass.
const PARTS = [
	{ name: 'pelvis', bones: ['Hips'], from: 'Hips', to: 'Spine', radius: 0.13, mass: 12 },
	{ name: 'chest', bones: ['Spine', 'Spine1', 'Spine2', 'LeftShoulder', 'RightShoulder'], from: 'Spine', to: 'Neck', radius: 0.15, mass: 24 },
	{ name: 'head', bones: ['Neck', 'Head'], from: 'Neck', to: 'Head', radius: 0.1, mass: 5, extend: 0.14 },
	{ name: 'armL', bones: ['LeftArm'], from: 'LeftArm', to: 'LeftForeArm', radius: 0.055, mass: 2.5 },
	{ name: 'armR', bones: ['RightArm'], from: 'RightArm', to: 'RightForeArm', radius: 0.055, mass: 2.5 },
	{ name: 'foreL', bones: ['LeftForeArm', 'LeftHand'], from: 'LeftForeArm', to: 'LeftHand', radius: 0.05, mass: 1.5, extend: 0.12 },
	{ name: 'foreR', bones: ['RightForeArm', 'RightHand'], from: 'RightForeArm', to: 'RightHand', radius: 0.05, mass: 1.5, extend: 0.12 },
	{ name: 'thighL', bones: ['LeftUpLeg'], from: 'LeftUpLeg', to: 'LeftLeg', radius: 0.08, mass: 9 },
	{ name: 'thighR', bones: ['RightUpLeg'], from: 'RightUpLeg', to: 'RightLeg', radius: 0.08, mass: 9 },
	{ name: 'shinL', bones: ['LeftLeg', 'LeftFoot', 'LeftToeBase'], from: 'LeftLeg', to: 'LeftFoot', radius: 0.065, mass: 5 },
	{ name: 'shinR', bones: ['RightLeg', 'RightFoot', 'RightToeBase'], from: 'RightLeg', to: 'RightFoot', radius: 0.065, mass: 5 },
];
// Ball joints at the hips, shoulders and neck; hinges with limits at the knees and elbows, so nothing bends backwards.
const JOINTS = [
	['pelvis', 'chest', 'Spine', 'ball'],
	['chest', 'head', 'Neck', 'ball'],
	['chest', 'armL', 'LeftArm', 'ball'],
	['chest', 'armR', 'RightArm', 'ball'],
	['armL', 'foreL', 'LeftForeArm', 'hinge', 0, 2.4],
	['armR', 'foreR', 'RightForeArm', 'hinge', -2.4, 0],
	['pelvis', 'thighL', 'LeftUpLeg', 'ball'],
	['pelvis', 'thighR', 'RightUpLeg', 'ball'],
	['thighL', 'shinL', 'LeftLeg', 'hinge', 0, 2.4],
	['thighR', 'shinR', 'RightLeg', 'hinge', 0, 2.4],
];

const v = new Vector3();
const a = new Vector3();
const b = new Vector3();
const q = new Quaternion();
const m = new Matrix4();
const UP = new Vector3(0, 1, 0);
const scale1 = new Vector3(1, 1, 1);

/** The parts of the loaded model that every figure shares: one geometry, with the skeleton it binds to. */
export function prepareMannequin(gltf) {
	const root = gltf.scene;
	root.updateMatrixWorld(true);
	const clipBones = new Set(gltf.animations.flatMap((clip) => clip.tracks.map((t) => t.name.split('.')[0])));
	const bones = [];
	root.traverse((o) => {
		if (clipBones.has(o.name) || PARTS.some((p) => p.bones.includes(o.name))) bones.push(o);
	});
	const index = new Map(bones.map((o, i) => [o, i]));
	const pieces = [];
	root.traverse((o) => {
		if (!o.isMesh) return;
		let owner = o.parent;
		while (owner && !index.has(owner)) owner = owner.parent;
		if (!owner) return;
		const g = o.geometry.clone().applyMatrix4(o.matrixWorld);
		const n = g.attributes.position.count;
		const c = new Color().copy(o.material.color);
		const colour = new Float32Array(n * 3);
		const skinIndex = new Uint16Array(n * 4);
		const skinWeight = new Float32Array(n * 4);
		for (let i = 0; i < n; i++) {
			colour.set([c.r, c.g, c.b], i * 3);
			skinIndex[i * 4] = index.get(owner);
			skinWeight[i * 4] = 1;
		}
		const out = new BufferGeometry();
		out.setIndex(g.index);
		out.setAttribute('position', g.attributes.position);
		out.setAttribute('normal', g.attributes.normal);
		out.setAttribute('color', new BufferAttribute(colour, 3));
		out.setAttribute('skinIndex', new BufferAttribute(skinIndex, 4));
		out.setAttribute('skinWeight', new BufferAttribute(skinWeight, 4));
		pieces.push(out);
	});
	const geometry = mergeGeometries(pieces, false);
	geometry.computeBoundingSphere();
	const material = new MeshStandardMaterial({ vertexColors: true, roughness: 0.5, metalness: 0.05 });
	const inverses = bones.map((o) => new Matrix4().copy(o.matrixWorld).invert());
	const parents = bones.map((o) => {
		let p = o.parent;
		while (p && !index.has(p)) p = p.parent;
		return p ? index.get(p) : -1;
	});
	const rest = bones.map((o) => ({ name: o.name, world: o.matrixWorld.clone() }));
	const clips = new Map(gltf.animations.map((clip) => [clip.name, clip]));
	return { geometry, material, inverses, parents, rest, clips };
}

export class Mannequin {
	constructor(RAPIER, world, shared, { position, yaw = 0, clip = 'idle', groups, phase = 0 }) {
		this.RAPIER = RAPIER;
		this.world = world;
		this.groups = groups;
		this.home = { position: { ...position }, yaw };
		this.falling = false;
		this.bones = shared.rest.map((r) => {
			const bone = new Bone();
			bone.name = r.name;
			return bone;
		});
		this.byName = new Map(this.bones.map((o) => [o.name, o]));
		const local = new Matrix4();
		let top = null;
		shared.rest.forEach((r, i) => {
			const parent = shared.parents[i];
			local.copy(r.world);
			if (parent >= 0) local.premultiply(m.copy(shared.rest[parent].world).invert());
			local.decompose(this.bones[i].position, this.bones[i].quaternion, this.bones[i].scale);
			if (parent >= 0) this.bones[parent].add(this.bones[i]);
			else top = this.bones[i];
		});
		this.top = top;
		this.mesh = new SkinnedMesh(shared.geometry, shared.material);
		this.mesh.castShadow = true;
		this.mesh.receiveShadow = true;
		this.mesh.frustumCulled = false;
		this.mesh.add(top);
		this.mesh.bind(new Skeleton(this.bones, shared.inverses), new Matrix4());
		this.mixer = new AnimationMixer(top);
		this.action = this.mixer.clipAction(shared.clips.get(clip) ?? shared.clips.get('idle'));
		this.action.setLoop(LoopRepeat, Infinity).play();
		this.phase = phase;
		this.action.time = phase;

		// Standing it's only a sensor a little wider than it is, which says when something's about to hit.
		this.sensorBody = world.createRigidBody(RAPIER.RigidBodyDesc.fixed().setTranslation(position.x, 0.95, position.z));
		this.sensor = world.createCollider(
			RAPIER.ColliderDesc.cylinder(0.95, 0.55).setSensor(true).setCollisionGroups(groups.sensor).setActiveEvents(RAPIER.ActiveEvents.COLLISION_EVENTS),
			this.sensorBody,
		);
		this.parts = null;
		this.joints = null;
		this.stand();
	}

	stand() {
		const { x, z } = this.home.position;
		this.falling = false;
		this.mesh.position.set(x, 0, z);
		this.mesh.rotation.y = this.home.yaw;
		this.mesh.updateMatrixWorld(true);
		for (const bone of this.bones) bone.matrixWorldAutoUpdate = true;
		this.mesh.matrixWorldAutoUpdate = true;
		this.action.time = this.phase;
		this.sensor.setEnabled(true);
		if (this.parts) {
			for (const j of this.joints) this.world.removeImpulseJoint(j, true);
			for (const p of this.parts) this.world.removeRigidBody(p.body);
			this.parts = null;
			this.joints = null;
		}
		this.mixer.update(0);
	}

	/** Lets go: bodies where the bones are, all moving at `velocity`. Then the world takes over. */
	fall(velocity = { x: 0, y: 0, z: 0 }) {
		if (this.falling) return;
		const R = this.RAPIER;
		this.falling = true;
		this.sensor.setEnabled(false);
		this.mesh.updateMatrixWorld(true);
		for (const bone of this.bones) bone.updateWorldMatrix(true, false);
		const parts = new Map();
		for (const def of PARTS) {
			const from = this.byName.get(def.from);
			const to = this.byName.get(def.to);
			a.setFromMatrixPosition(from.matrixWorld);
			b.setFromMatrixPosition(to.matrixWorld);
			const length = a.distanceTo(b) + (def.extend ?? 0);
			const dir = v.subVectors(b, a).normalize();
			const centre = a.clone().addScaledVector(dir, length / 2);
			q.setFromUnitVectors(UP, dir);
			const body = this.world.createRigidBody(
				R.RigidBodyDesc.dynamic()
					.setTranslation(centre.x, centre.y, centre.z)
					.setRotation({ x: q.x, y: q.y, z: q.z, w: q.w })
					.setLinvel(velocity.x, velocity.y, velocity.z)
					.setLinearDamping(0.02)
					.setAngularDamping(0.5)
					.setCcdEnabled(true),
			);
			const half = Math.max(0.01, length / 2 - def.radius);
			this.world.createCollider(R.ColliderDesc.capsule(half, def.radius).setMass(def.mass).setFriction(0.6).setRestitution(0.1).setCollisionGroups(this.groups.ragdoll), body);
			const inverse = new Matrix4().compose(centre, q.clone(), scale1).invert();
			const carried = def.bones.map((name) => {
				const bone = this.byName.get(name);
				return { bone, offset: new Matrix4().multiplyMatrices(inverse, bone.matrixWorld) };
			});
			parts.set(def.name, { body, carried, inverse });
		}
		this.parts = [...parts.values()];
		this.joints = [];
		for (const [one, two, boneName, kind, min, max] of JOINTS) {
			const A = parts.get(one);
			const B = parts.get(two);
			a.setFromMatrixPosition(this.byName.get(boneName).matrixWorld);
			const inA = a.clone().applyMatrix4(A.inverse);
			const inB = a.clone().applyMatrix4(B.inverse);
			let data;
			if (kind === 'ball') data = R.JointData.spherical(inA, inB);
			else {
				// The hinge runs across the limb: the figure's own left-right, in each body's frame it's the same line.
				const across = new Vector3(1, 0, 0).applyQuaternion(this.mesh.quaternion);
				m.copy(B.inverse);
				const axis = across.transformDirection(m);
				data = R.JointData.revolute(inA, inB, { x: axis.x, y: axis.y, z: axis.z });
				data.limitsEnabled = true;
				data.limits = [min, max];
			}
			const joint = this.world.createImpulseJoint(data, A.body, B.body, true);
			joint.setContactsEnabled(false);
			this.joints.push(joint);
		}
		for (const bone of this.bones) {
			bone.matrixWorldAutoUpdate = false;
			bone.matrixAutoUpdate = false;
		}
	}

	/** A shove on every part, in m/s. */
	shove(velocity, spin) {
		if (!this.parts) return;
		for (const p of this.parts) {
			const now = p.body.linvel();
			p.body.setLinvel({ x: now.x + velocity.x, y: now.y + velocity.y, z: now.z + velocity.z }, true);
			if (spin) p.body.setAngvel(spin, true);
		}
	}

	update(dt) {
		if (!this.falling) {
			this.mixer.update(dt);
			return;
		}
		for (const p of this.parts) {
			const t = p.body.translation();
			const r = p.body.rotation();
			m.compose(a.set(t.x, t.y, t.z), q.set(r.x, r.y, r.z, r.w), scale1);
			for (const c of p.carried) c.bone.matrixWorld.multiplyMatrices(m, c.offset);
		}
	}

	/** Back on its feet, where it started. */
	reset() {
		for (const bone of this.bones) {
			bone.matrixAutoUpdate = true;
		}
		this.stand();
	}
}
