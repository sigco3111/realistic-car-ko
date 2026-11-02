// What the car leaves behind: tyre marks on the ground, dust where it slides or lands, and trails when it boosts. All of it
// is made of a few ribbons and sprites that exist from the start, so nothing compiles or allocates during play.
import { AdditiveBlending, BufferAttribute, BufferGeometry, CanvasTexture, Color, DynamicDrawUsage, InstancedBufferAttribute, InstancedMesh, Matrix4, Mesh, MeshBasicMaterial, PlaneGeometry, Quaternion, SRGBColorSpace, Vector3 } from 'three';

const up = new Vector3(0, 1, 0);

/** One ribbon that grows at its head and, past its length, loses its tail. */
class Ribbon {
	constructor(scene, material, length, { flat = true } = {}) {
		this.length = length;
		this.flat = flat;
		this.position = new Float32Array(length * 2 * 3);
		this.alpha = new Float32Array(length * 2);
		const index = [];
		for (let i = 0; i < length - 1; i++) {
			const a = i * 2;
			index.push(a, a + 1, a + 2, a + 1, a + 3, a + 2);
		}
		this.geometry = new BufferGeometry();
		this.geometry.setAttribute('position', new BufferAttribute(this.position, 3).setUsage(DynamicDrawUsage));
		this.geometry.setAttribute('alpha', new BufferAttribute(this.alpha, 1).setUsage(DynamicDrawUsage));
		this.geometry.setIndex(index);
		this.mesh = new Mesh(this.geometry, material);
		this.mesh.frustumCulled = false;
		scene.add(this.mesh);
		this.head = 0;
		this.joined = false;
		this.last = new Vector3();
	}

	/** Adds a point, or leaves a gap if `on` is false. */
	add(x, y, z, sideX, sideY, sideZ, alpha, on = true) {
		if (!on) {
			this.joined = false;
			return;
		}
		const i = this.head;
		const next = (i + 1) % this.length;
		const w = i * 6;
		this.position[w] = x + sideX;
		this.position[w + 1] = y + sideY;
		this.position[w + 2] = z + sideZ;
		this.position[w + 3] = x - sideX;
		this.position[w + 4] = y - sideY;
		this.position[w + 5] = z - sideZ;
		this.alpha[i * 2] = this.alpha[i * 2 + 1] = alpha;
		if (!this.joined) {
			// A gap: this quad and the one before it, from the last point written, draw nothing.
			const before = (i - 1 + this.length) % this.length;
			this.alpha[before * 2] = this.alpha[before * 2 + 1] = 0;
			this.alpha[i * 2] = this.alpha[i * 2 + 1] = 0;
		}
		// The tail's join to the head never shows.
		this.alpha[next * 2] = this.alpha[next * 2 + 1] = 0;
		this.head = next;
		this.joined = true;
		this.dirty = true;
	}

	flush() {
		if (!this.dirty) return;
		this.geometry.attributes.position.needsUpdate = true;
		this.geometry.attributes.alpha.needsUpdate = true;
		this.dirty = false;
	}

	clear() {
		this.alpha.fill(0);
		this.position.fill(0);
		this.geometry.attributes.alpha.needsUpdate = true;
		this.geometry.attributes.position.needsUpdate = true;
		this.joined = false;
		this.head = 0;
	}
}

const alphaMaterial = (color, opts) => {
	const material = new MeshBasicMaterial({ color, transparent: true, depthWrite: false, ...opts });
	material.onBeforeCompile = (shader) => {
		shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float alpha;\nvarying float vAlpha;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvAlpha = alpha;');
		shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vAlpha;').replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.a *= vAlpha;');
	};
	material.customProgramCacheKey = () => 'ribbon';
	return material;
};

export class CarEffects {
	constructor(scene, renderer) {
		this.scene = scene;
		const marks = alphaMaterial('#1d1712', { opacity: 0.55, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
		this.marks = [0, 1, 2, 3].map(() => new Ribbon(scene, marks, 1400));
		const glow = alphaMaterial('#ff8a3c', { opacity: 1, blending: AdditiveBlending, toneMapped: false, side: 2 });
		this.trails = [0, 1].map(() => new Ribbon(scene, glow, 40));

		// Dust: soft puffs that spread and fade.
		const canvas = document.createElement('canvas');
		canvas.width = canvas.height = 64;
		const g = canvas.getContext('2d');
		const grad = g.createRadialGradient(32, 32, 2, 32, 32, 32);
		grad.addColorStop(0, 'rgba(255,255,255,0.9)');
		grad.addColorStop(0.5, 'rgba(255,255,255,0.35)');
		grad.addColorStop(1, 'rgba(255,255,255,0)');
		g.fillStyle = grad;
		g.fillRect(0, 0, 64, 64);
		const map = new CanvasTexture(canvas);
		map.colorSpace = SRGBColorSpace;
		this.N = 120;
		const material = new MeshBasicMaterial({ map, color: '#cdb892', transparent: true, depthWrite: false, opacity: 0.8 });
		material.onBeforeCompile = (shader) => {
			shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float fade;\nvarying float vFade;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvFade = fade;');
			shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vFade;').replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.a *= vFade;');
		};
		material.customProgramCacheKey = () => 'dust';
		this.fade = new InstancedBufferAttribute(new Float32Array(this.N), 1).setUsage(DynamicDrawUsage);
		const plane = new PlaneGeometry(1, 1);
		plane.setAttribute('fade', this.fade);
		this.dust = new InstancedMesh(plane, material, this.N);
		this.dust.instanceMatrix.setUsage(DynamicDrawUsage);
		this.dust.frustumCulled = false;
		scene.add(this.dust);
		this.puffs = Array.from({ length: this.N }, () => ({ life: 0, max: 1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, size: 1 }));
		this.nextPuff = 0;
		this.m = new Matrix4();
		this.q = new Quaternion();
		this.p = new Vector3();
		this.s = new Vector3();
		this.c = new Color();
		void renderer;
		void up;
	}

	puff(x, y, z, vx, vy, vz, size, life = 0.9) {
		const d = this.puffs[this.nextPuff];
		this.nextPuff = (this.nextPuff + 1) % this.N;
		Object.assign(d, { life, max: life, x, y, z, vx, vy, vz, size });
	}

	burst(x, y, z, count, speed, size) {
		for (let i = 0; i < count; i++) {
			const a = Math.random() * 6.283;
			this.puff(x, y, z, Math.cos(a) * speed * (0.4 + Math.random()), 0.4 + Math.random() * speed * 0.4, Math.sin(a) * speed * (0.4 + Math.random()), size * (0.7 + Math.random() * 0.6), 0.6 + Math.random() * 0.6);
		}
	}

	/** Once a frame, with the car and how much time passed. */
	update(car, dt, camera) {
		const f = car.forward;
		const v = car.velocity;
		const sideSpeed = v.x * car.side.x + v.y * car.side.y + v.z * car.side.z;
		const slide = Math.abs(sideSpeed);
		const braking = car.input.brake && car.speed > 4;
		const launching = Math.abs(car.input.throttle) > 0 && car.input.boost && car.speed < 30;
		const scraping = slide > 2.6 || braking || launching;
		const rear = (x, y, z) => ({ x, y, z });
		void rear;
		const q = car.quaternion;
		for (const w of car.wheels) {
			// Where the tyre meets the ground, with the car's turn in it.
			const wx = w.x;
			const wz = w.z;
			const qx = q.x;
			const qy = q.y;
			const qz = q.z;
			const qw = q.w;
			const ly = w.y - w.radius;
			const tx = 2 * (qy * wz - qz * ly);
			const ty = 2 * (qz * wx - qx * wz);
			const tz = 2 * (qx * ly - qy * wx);
			const gx = car.position.x + wx + qw * tx + qy * tz - qz * ty;
			const gz = car.position.z + wz + qw * tz + qx * ty - qy * tx;
			const groundY = w.contactY ?? 0;
			const on = w.inContact && scraping && groundY < 0.4;
			const half = 0.13;
			const alpha = Math.min(1, Math.max(slide / 10, braking ? 0.55 : 0, launching ? 0.6 : 0));
			this.marks[w.index].add(gx, 0.02 + groundY, gz, car.side.x * half, 0, car.side.z * half, alpha, on);
			if (w.inContact && scraping && Math.random() < 0.5 * Math.min(1, slide / 8 + (braking || launching ? 0.6 : 0))) {
				this.puff(gx, 0.25, gz, v.x * 0.14 + (Math.random() - 0.5), 0.5 + Math.random() * 0.9, v.z * 0.14 + (Math.random() - 0.5), 1.2 + Math.random() * 1.1, 0.5 + Math.random() * 0.5);
			}
		}
		for (const r of this.marks) r.flush();

		// Boost: two short bright trails off the back.
		const boosting = car.input.boost && car.input.throttle > 0 && car.goingForward;
		const backZ = -car.size.length / 2;
		for (const [i, side] of [-0.45, 0.45].entries()) {
			const y = 0.55;
			const tx = 2 * (q.y * backZ - q.z * y);
			const ty = 2 * (q.z * side - q.x * backZ);
			const tz = 2 * (q.x * y - q.y * side);
			const x = car.position.x + side + q.w * tx + q.y * tz - q.z * ty;
			const yy = car.position.y + y + q.w * ty + q.z * tx - q.x * tz;
			const z = car.position.z + backZ + q.w * tz + q.x * ty - q.y * tx;
			const ribbon = this.trails[i];
			const on = boosting || ribbon.fading > 0;
			ribbon.fading = boosting ? 0.25 : (ribbon.fading ?? 0) - dt;
			ribbon.add(x, yy, z, 0, 0.09, 0, boosting ? 1 : 0, on);
			// Older points fade.
			for (let k = 0; k < ribbon.alpha.length; k++) ribbon.alpha[k] *= 0.9;
			ribbon.dirty = true;
			ribbon.flush();
		}
		void f;

		// Dust
		if (camera) this.q.copy(camera.quaternion);
		let n = 0;
		for (let i = 0; i < this.N; i++) {
			const d = this.puffs[i];
			if (d.life > 0) {
				d.life -= dt;
				d.x += d.vx * dt;
				d.y += d.vy * dt;
				d.z += d.vz * dt;
				const drag = Math.max(0, 1 - 2 * dt);
				d.vx *= drag;
				d.vz *= drag;
				const t = Math.max(0, d.life / d.max);
				const size = d.size * (1 + (1 - t) * 2.4);
				this.m.compose(this.p.set(d.x, d.y, d.z), this.q, this.s.set(size, size, size));
				this.dust.setMatrixAt(n, this.m);
				this.fade.array[n] = t * t * 0.75;
				n++;
			}
		}
		this.dust.count = n;
		this.dust.instanceMatrix.needsUpdate = true;
		this.fade.needsUpdate = true;
	}

	reset() {
		for (const r of this.marks) r.clear();
		for (const r of this.trails) r.clear();
		for (const d of this.puffs) d.life = 0;
		this.dust.count = 0;
	}
}
