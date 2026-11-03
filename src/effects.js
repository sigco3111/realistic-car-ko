// What the tyres leave behind: black marks and white smoke on tarmac, pale ruts and thrown dust on gravel, torn earth on
// grass. All of it is a few ribbons and sprites that exist from the start, so nothing compiles or allocates during play.
import { BufferAttribute, BufferGeometry, CanvasTexture, Color, DynamicDrawUsage, InstancedBufferAttribute, InstancedMesh, Matrix4, Mesh, MeshBasicMaterial, PlaneGeometry, Quaternion, SRGBColorSpace, Vector3 } from 'three';

/** One ribbon on the ground that grows at its head and, past its length, loses its tail. */
class Ribbon {
	constructor(scene, material, length) {
		this.length = length;
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
		this.lastX = 0;
		this.lastZ = 0;
	}

	/** Adds a point if the tyre's moved on enough, or leaves a gap if `on` is false. */
	add(x, y, z, sideX, sideY, sideZ, alpha, on) {
		if (!on) {
			this.joined = false;
			return;
		}
		const moved = Math.hypot(x - this.lastX, z - this.lastZ);
		if (this.joined && moved < 0.28) return;
		// Too far to be the same mark, as when the car's been put back.
		if (moved > 6) this.joined = false;
		this.lastX = x;
		this.lastZ = z;
		// A new mark starts past the spare point after the last one, so nothing joins the two.
		if (!this.joined) this.head = (this.head + 1) % this.length;
		const i = this.head;
		const next = (i + 1) % this.length;
		const after = (next + 1) % this.length;
		const w = i * 6;
		this.position[w] = x + sideX;
		this.position[w + 1] = y + sideY;
		this.position[w + 2] = z + sideZ;
		this.position[w + 3] = x - sideX;
		this.position[w + 4] = y - sideY;
		this.position[w + 5] = z - sideZ;
		const value = this.joined ? alpha : 0;
		this.alpha[i * 2] = this.alpha[i * 2 + 1] = value;
		// Every point joins the next in the strip, so the point after the head sits on the head, and has nothing to draw until it's
		// the head itself. The one after that fades the tail out where the tail is.
		this.position.copyWithin(next * 6, w, w + 6);
		this.alpha[next * 2] = this.alpha[next * 2 + 1] = 0;
		this.alpha[after * 2] = this.alpha[after * 2 + 1] = 0;
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

const ribbonMaterial = (color, opacity) => {
	const material = new MeshBasicMaterial({ color, transparent: true, depthWrite: false, opacity, polygonOffset: true, polygonOffsetFactor: -2, polygonOffsetUnits: -2 });
	material.onBeforeCompile = (shader) => {
		shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float alpha;\nvarying float vAlpha;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvAlpha = alpha;');
		shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vAlpha;').replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.a *= vAlpha;');
	};
	material.customProgramCacheKey = () => 'ribbon';
	return material;
};

const PUFF = {
	tarmac: { color: '#e8e4dc', life: 1.1, grow: 3, rise: 1.1, opacity: 0.3 },
	gravel: { color: '#c7ae84', life: 1.2, grow: 2.6, rise: 0.9, opacity: 0.55 },
	grass: { color: '#7f7446', life: 0.8, grow: 2, rise: 1.2, opacity: 0.7 },
};

export class CarEffects {
	constructor(scene) {
		this.scene = scene;
		const black = ribbonMaterial('#17130f', 0.62);
		const pale = ribbonMaterial('#7d6746', 0.42);
		const earth = ribbonMaterial('#40331c', 0.6);
		const make = (material) => [0, 1, 2, 3].map(() => new Ribbon(scene, material, 900));
		this.marks = { tarmac: make(black), gravel: make(pale), grass: make(earth) };

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
		this.N = 220;
		const material = new MeshBasicMaterial({ map, transparent: true, depthWrite: false });
		material.onBeforeCompile = (shader) => {
			shader.vertexShader = shader.vertexShader.replace('#include <common>', '#include <common>\nattribute float fade;\nvarying float vFade;').replace('#include <begin_vertex>', '#include <begin_vertex>\nvFade = fade;');
			shader.fragmentShader = shader.fragmentShader.replace('#include <common>', '#include <common>\nvarying float vFade;').replace('#include <color_fragment>', '#include <color_fragment>\ndiffuseColor.a *= vFade;');
		};
		material.customProgramCacheKey = () => 'puff';
		this.fade = new InstancedBufferAttribute(new Float32Array(this.N), 1).setUsage(DynamicDrawUsage);
		const plane = new PlaneGeometry(1, 1);
		plane.setAttribute('fade', this.fade);
		this.dust = new InstancedMesh(plane, material, this.N);
		this.dust.instanceMatrix.setUsage(DynamicDrawUsage);
		this.dust.frustumCulled = false;
		this.c = new Color('#ffffff');
		for (let i = 0; i < this.N; i++) this.dust.setColorAt(i, this.c);
		this.dust.instanceColor.setUsage(DynamicDrawUsage);
		scene.add(this.dust);
		this.puffs = Array.from({ length: this.N }, () => ({ life: 0, max: 1, x: 0, y: 0, z: 0, vx: 0, vy: 0, vz: 0, size: 1, grow: 3, opacity: 0.7, color: '#ffffff' }));
		this.nextPuff = 0;
		// From the driver's seat a puff near the car would hang inside the cabin, so they fade out close to the camera.
		this.clearAround = false;
		this.heightAt = () => 0;
		this.m = new Matrix4();
		this.q = new Quaternion();
		this.p = new Vector3();
		this.s = new Vector3();
	}

	puff(x, y, z, vx, vy, vz, size, surface) {
		const kind = PUFF[surface] ?? PUFF.gravel;
		const d = this.puffs[this.nextPuff];
		this.nextPuff = (this.nextPuff + 1) % this.N;
		const life = kind.life * (0.7 + Math.random() * 0.6);
		Object.assign(d, { life, max: life, x, y, z, vx, vy, vz, size, grow: kind.grow, opacity: kind.opacity, color: kind.color });
	}

	burst(x, y, z, count, speed, size, surface = 'gravel') {
		for (let i = 0; i < count; i++) {
			const a = Math.random() * 6.283;
			this.puff(x, y, z, Math.cos(a) * speed * (0.4 + Math.random()), 0.4 + Math.random() * speed * 0.4, Math.sin(a) * speed * (0.4 + Math.random()), size * (0.7 + Math.random() * 0.6), surface);
		}
	}

	/** Once a frame, with the car and how much time passed. */
	update(car, dt, camera) {
		const v = car.velocity;
		for (const w of car.wheels) {
			const contact = w.inContact && w.axisL;
			const surface = w.surface;
			const slip = contact ? w.slip : 0;
			const moving = Math.abs(w.vz) + Math.abs(w.vx);
			const onFlat = contact && Math.abs(w.contact.y - this.heightAt(w.contact.x, w.contact.z)) < 0.6;
			// How hard this tyre's working past its peak.
			const scrub = Math.min(1, Math.max(0, (slip - 1.35) / 2.2));
			for (const name of Object.keys(this.marks)) {
				const ribbon = this.marks[name][w.index];
				const here = name === surface && onFlat;
				// Tarmac only marks when a tyre's sliding; loose ground takes a print from anything rolling on it.
				const marks = here && moving > 0.6 && (name === 'tarmac' ? slip > 1.4 : true);
				const alpha = name === 'tarmac' ? Math.min(1, 0.25 + scrub) : Math.min(1, 0.32 + scrub * 0.8);
				if (contact) ribbon.add(w.contact.x, w.contact.y + 0.03, w.contact.z, w.axisL.x * 0.13, (w.axisL.y ?? 0) * 0.13, w.axisL.z * 0.13, alpha, marks);
				else ribbon.add(0, 0, 0, 0, 0, 0, 0, false);
				ribbon.flush();
			}
			if (!contact || moving < 1) continue;
			// Smoke and dust.
			let rate = 0;
			if (surface === 'tarmac') rate = scrub * 16;
			else rate = scrub * 24 + Math.min(1, moving / 30) * 4;
			let count = rate * dt;
			while (count > 0) {
				if (Math.random() < count) {
					const backX = v.x * 0.1 - w.spin * w.radius * w.axisF.x * 0.12;
					const backZ = v.z * 0.1 - w.spin * w.radius * w.axisF.z * 0.12;
					this.puff(w.contact.x, w.contact.y + 0.22, w.contact.z, backX + (Math.random() - 0.5) * 1.2, (surface === 'tarmac' ? 0.6 : 0.9) + Math.random(), backZ + (Math.random() - 0.5) * 1.2, 0.6 + Math.random() * 0.5 + scrub * 0.4, surface);
				}
				count -= 1;
			}
		}

		if (camera) this.q.copy(camera.quaternion);
		let n = 0;
		for (let i = 0; i < this.N; i++) {
			const d = this.puffs[i];
			if (d.life <= 0) continue;
			d.life -= dt;
			d.x += d.vx * dt;
			d.y += d.vy * dt;
			d.z += d.vz * dt;
			const drag = Math.max(0, 1 - 1.8 * dt);
			d.vx *= drag;
			d.vz *= drag;
			d.vy *= drag;
			const t = Math.max(0, d.life / d.max);
			const size = d.size * (1 + (1 - t) * d.grow);
			this.m.compose(this.p.set(d.x, d.y, d.z), this.q, this.s.set(size, size, size));
			this.dust.setMatrixAt(n, this.m);
			this.dust.setColorAt(n, this.c.set(d.color));
			let near = 1;
			if (this.clearAround && camera) {
				const p = camera.position;
				near = Math.min(1, Math.max(0, (Math.hypot(d.x - p.x, d.y - p.y, d.z - p.z) - size * 0.5 - 1) / 2));
			}
			this.fade.array[n] = t * t * d.opacity * near;
			n++;
		}
		this.dust.count = n;
		this.dust.instanceMatrix.needsUpdate = true;
		this.dust.instanceColor.needsUpdate = true;
		this.fade.needsUpdate = true;
	}

	reset() {
		for (const set of Object.values(this.marks)) for (const r of set) r.clear();
		for (const d of this.puffs) d.life = 0;
		this.dust.count = 0;
	}
}
