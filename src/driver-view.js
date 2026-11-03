// The driver's view: an eye in the seat, with no one around it. The cabin stays fixed to the car, but the head steadies itself
// the way a real one does, so the horizon holds while the cabin leans round it. Acceleration moves the head a few centimetres,
// and it looks a little into corners and slides. Drag looks round, and lets go back to straight ahead.
import { Euler, MathUtils, Quaternion, Vector3 } from 'three';

const FOV = 62;
const FOV_FAST = 67;
export const DRIVER_NEAR = 0.05;
// How much of the body's pitch and roll reaches the eye.
const KEEP_PITCH = 0.7;
const KEEP_ROLL = 0.55;
// Metres the head moves per m/s² of acceleration, and the most it moves.
const SWAY = 0.0045;
const SWAY_SIDE = 0.04;
const SWAY_ALONG = 0.04;
const SWAY_UP = 0.025;

const BEHIND = new Quaternion().setFromAxisAngle(new Vector3(0, 1, 0), Math.PI);
const forward = new Vector3();
const up = new Vector3();
const side = new Vector3();
const eye = new Vector3();
const change = new Vector3();
const steady = new Quaternion();
const fixed = new Quaternion();
const look = new Quaternion();
const euler = new Euler(0, 0, 0, 'YXZ');
const lookEuler = new Euler(0, 0, 0, 'YXZ');

export class DriverView {
	constructor(camera) {
		this.camera = camera;
		this.eye = new Vector3();
		this.model = null;
		this.lastVelocity = new Vector3();
		this.sway = new Vector3();
		this.reset();
	}

	/** Which model it rides in, and where the eye sits in it. */
	seat(model, at) {
		this.model = model;
		this.eye.copy(at);
		this.settle();
	}

	settle() {
		this.sway.set(0, 0, 0);
		this.fresh = true;
		this.pitch = null;
		this.roll = 0;
		this.corner = 0;
		this.knock = 0;
		this.knockSpeed = 0;
	}

	reset() {
		this.yawOffset = 0;
		this.pitchOffset = 0;
		this.holding = false;
		this.settle();
	}

	jump() {
		this.settle();
	}

	glideIn() {}

	fit() {}

	scroll() {}

	/** A knock of the head, on a hard hit. */
	kick(strength = 1) {
		this.knockSpeed = strength * 0.6 * (Math.random() < 0.5 ? -1 : 1);
	}

	drag(dx, dy) {
		this.holding = true;
		this.yawOffset = Math.max(-1.9, Math.min(1.9, this.yawOffset - dx * 0.004));
		this.pitchOffset = Math.max(-0.55, Math.min(0.5, this.pitchOffset - dy * 0.003));
	}

	release() {
		this.holding = false;
	}

	update(car, _position, dt) {
		if (!this.model) return;
		const q = this.model.object.quaternion;
		forward.set(0, 0, 1).applyQuaternion(q);
		up.set(0, 1, 0).applyQuaternion(q);
		side.set(1, 0, 0).applyQuaternion(q);
		const heading = Math.atan2(forward.x, forward.z);
		const pitch = Math.asin(MathUtils.clamp(forward.y, -1, 1));
		const roll = Math.atan2(side.y, Math.max(0.001, up.y));

		// The head moves against the acceleration, smoothed so that bumps don't reach it.
		if (this.fresh || dt <= 0) {
			this.lastVelocity.set(car.velocity.x, car.velocity.y, car.velocity.z);
			this.pitch = pitch;
			this.roll = roll;
			this.fresh = false;
		} else {
			change.set(car.velocity.x, car.velocity.y, car.velocity.z).sub(this.lastVelocity).divideScalar(dt);
			this.lastVelocity.set(car.velocity.x, car.velocity.y, car.velocity.z);
			const ease = Math.min(1, dt * 5);
			this.sway.x += (MathUtils.clamp(-change.dot(side) * SWAY, -SWAY_SIDE, SWAY_SIDE) - this.sway.x) * ease;
			this.sway.z += (MathUtils.clamp(-change.dot(forward) * SWAY, -SWAY_ALONG, SWAY_ALONG) - this.sway.z) * ease;
			this.sway.y += (MathUtils.clamp(-change.dot(up) * SWAY, -SWAY_UP, SWAY_UP) - this.sway.y) * ease;
			const steadying = Math.min(1, dt * 14);
			this.pitch += (pitch - this.pitch) * steadying;
			this.roll += (roll - this.roll) * steadying;
		}

		// It looks a little where the car's turning, and where it's really going in a slide.
		const moving = Math.hypot(car.velocity.x, car.velocity.z);
		const fronts = car.wheels.filter((w) => w.front);
		let wanted = (fronts.reduce((sum, w) => sum + w.steerAngle, 0) / (fronts.length || 1)) * 0.16;
		if (car.forwardSpeed > 5 && moving > 5) {
			let slide = Math.atan2(car.velocity.x, car.velocity.z) - heading;
			while (slide > Math.PI) slide -= 2 * Math.PI;
			while (slide < -Math.PI) slide += 2 * Math.PI;
			wanted += MathUtils.clamp(slide * 0.3, -0.32, 0.32);
		}
		this.corner += (wanted - this.corner) * Math.min(1, dt * 3.5);

		this.knockSpeed += -this.knock * 120 * dt;
		this.knock += this.knockSpeed * dt;
		this.knockSpeed *= Math.max(0, 1 - 6 * dt);

		// Letting go, the head comes back to the road.
		if (!this.holding) {
			const back = Math.min(1, dt * 2.5);
			this.yawOffset -= this.yawOffset * back;
			this.pitchOffset -= this.pitchOffset * back;
		}

		const c = this.camera;
		const fov = FOV + (FOV_FAST - FOV) * MathUtils.smoothstep(Math.abs(car.forwardSpeed), 12, 48);
		if (Math.abs(fov - c.fov) > 0.02) {
			c.fov = fov;
			c.updateProjectionMatrix();
		}
		eye.copy(this.eye).add(this.sway);
		eye.applyQuaternion(q).add(this.model.object.position);
		c.position.copy(eye);

		euler.set(this.pitch * KEEP_PITCH, heading + Math.PI + this.corner, -this.roll * KEEP_ROLL + this.knock);
		steady.setFromEuler(euler);
		// Past tipping over the steadying has nothing to hold on to, so the eye goes with the car.
		fixed.copy(q).multiply(BEHIND);
		const q2 = steady.slerp(fixed, 1 - MathUtils.smoothstep(up.y, 0.25, 0.7));
		lookEuler.set(this.pitchOffset, this.yawOffset, 0);
		look.setFromEuler(lookEuler);
		c.quaternion.copy(q2).multiply(look);
	}

	apply() {}
}

export const DRIVER_FOV = FOV;
