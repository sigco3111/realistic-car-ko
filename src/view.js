// The camera, from folio-2025's View.js (MIT, Bruno Simon): high up on a long lens, always looking the same way, easing
// after the car and backing off as it gets faster. Most of why folio's car reads so well is that the world doesn't swing
// around it. Sizes scale with the car. Drag turns it and scroll zooms, which it keeps.
import { MathUtils, Vector3 } from 'three';

const smoothstep = MathUtils.smoothstep;

export class CarView {
	constructor(camera, tune) {
		this.camera = camera;
		this.focus = new Vector3();
		this.smoothed = new Vector3();
		this.home = { phi: Math.PI * 0.27, theta: Math.PI * 0.25, zoom: 0.6 };
		this.phi = this.home.phi;
		this.theta = this.home.theta;
		this.zoom = this.home.zoom;
		this.zoomSmoothed = this.zoom;
		this.roll = 0;
		this.rollSpeed = 0;
		this.fit(tune);
	}

	/** A knock of the view, as on a hard hit: folio's. */
	kick(strength = 1) {
		this.rollSpeed = strength * (Math.random() < 0.5 ? -1 : 1);
	}

	fit(tune) {
		this.radiusMin = 15 * tune.s;
		this.radiusMax = 30 * tune.s;
		this.edge0 = 10 * (tune.s / tune.tau);
		this.edge1 = 80 * (tune.s / tune.tau);
	}

	/** Back to how it started, around a point. */
	reset(at) {
		this.phi = this.home.phi;
		this.theta = this.home.theta;
		this.zoom = this.home.zoom;
		this.zoomSmoothed = this.zoom;
		this.roll = 0;
		this.rollSpeed = 0;
		this.focus.set(at.x, 0, at.z);
		this.smoothed.copy(this.focus);
		this.apply();
	}

	/** Moves straight to a point, keeping the angle and zoom someone has chosen. */
	jump(at) {
		this.focus.set(at.x, 0, at.z);
		this.smoothed.copy(this.focus);
		this.apply();
	}

	drag(dx, dy) {
		this.theta -= dx * 0.005;
		this.phi = Math.min(Math.PI * 0.46, Math.max(Math.PI * 0.08, this.phi - dy * 0.004));
	}

	scroll(by) {
		this.zoom = Math.min(1, Math.max(0, this.zoom - by * 0.0006));
	}

	update(at, dt) {
		this.focus.set(at.x, 0, at.z);
		const beforeX = this.smoothed.x;
		const beforeZ = this.smoothed.z;
		const ease = Math.min(1, dt * 10);
		this.smoothed.x += (this.focus.x - this.smoothed.x) * ease;
		this.smoothed.z += (this.focus.z - this.smoothed.z) * ease;
		const speed = dt > 0 ? Math.hypot(this.smoothed.x - beforeX, this.smoothed.z - beforeZ) / dt : 0;
		const wanted = this.zoom - 0.4 * smoothstep(speed, this.edge0, this.edge1);
		this.zoomSmoothed += (wanted - this.zoomSmoothed) * Math.min(1, dt * 10);
		this.rollSpeed += -this.roll * 100 * dt;
		this.roll += this.rollSpeed * dt;
		this.rollSpeed *= Math.max(0, 1 - 4 * dt);
		this.apply();
	}

	apply() {
		const r = MathUtils.lerp(this.radiusMin, this.radiusMax, 1 - this.zoomSmoothed);
		const c = this.camera;
		c.position.setFromSphericalCoords(r, this.phi, this.theta).add(this.smoothed);
		c.lookAt(this.smoothed);
		c.rotation.z += this.roll;
	}
}
