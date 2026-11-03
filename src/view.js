// The camera: behind the car, low enough to see it lean and pitch, swinging round a little late so a slide shows as the car
// turning away from the way the camera's looking. Drag turns it and scroll zooms, which it keeps.
import { MathUtils, Vector3 } from 'three';

const look = new Vector3();
const wrap = (a) => {
	while (a > Math.PI) a -= 2 * Math.PI;
	while (a < -Math.PI) a += 2 * Math.PI;
	return a;
};

export class ChaseView {
	constructor(camera, car) {
		this.camera = camera;
		this.at = new Vector3();
		this.heading = 0;
		this.yawOffset = 0;
		this.pitch = 0.33;
		this.zoom = 1;
		this.pulled = 0;
		this.roll = 0;
		this.rollSpeed = 0;
		this.glide = 0;
		this.glideRate = 1;
		this.fit(car);
	}

	fit(car) {
		this.distance = 1.75 * car.size.length + 1.5;
		this.lift = car.size.height * 0.55;
	}

	/** A knock of the view, on a hard hit. */
	kick(strength = 1) {
		this.rollSpeed = strength * (Math.random() < 0.5 ? -1 : 1);
	}

	/** Back to how it started, behind the car. */
	reset(car) {
		this.yawOffset = 0;
		this.pitch = 0.33;
		this.zoom = 1;
		this.pulled = 0;
		this.roll = 0;
		this.rollSpeed = 0;
		this.glide = 0;
		this.jump(car);
	}

	/** Starts further back and glides in to where it should be: what Reset looks like, even when nothing else had moved. */
	glideIn(seconds = 1.5) {
		this.glide = 1;
		this.glideRate = 1 / seconds;
		this.apply();
	}

	/** Moves straight behind the car, keeping the angle and zoom someone has chosen. */
	jump(car) {
		this.heading = Math.atan2(car.forward.x, car.forward.z);
		this.at.set(car.position.x, car.position.y, car.position.z);
		this.apply();
	}

	drag(dx, dy) {
		this.yawOffset -= dx * 0.005;
		this.pitch = Math.min(1.35, Math.max(0.06, this.pitch + dy * 0.004));
	}

	scroll(by) {
		this.zoom = Math.min(3.5, Math.max(0.55, this.zoom * Math.exp(by * 0.0008)));
	}

	update(car, position, dt) {
		const carHeading = Math.atan2(car.forward.x, car.forward.z);
		// Going backwards it keeps facing the way the car points; going forwards it leans towards where the car's actually going.
		const moving = Math.hypot(car.velocity.x, car.velocity.z);
		let target = carHeading;
		if (car.forwardSpeed > 3 && moving > 3) target = carHeading + wrap(Math.atan2(car.velocity.x, car.velocity.z) - carHeading) * 0.55;
		if (car.upsideDown.active) target = this.heading;
		this.heading = wrap(this.heading + wrap(target - this.heading) * Math.min(1, dt * 3.2));
		const ease = Math.min(1, dt * 16);
		this.at.x += (position.x - this.at.x) * ease;
		this.at.y += (position.y - this.at.y) * Math.min(1, dt * 7);
		this.at.z += (position.z - this.at.z) * ease;
		// It drops back with speed, so a fast car still looks fast.
		const wanted = MathUtils.smoothstep(moving, 8, 45) * 0.35;
		this.pulled += (wanted - this.pulled) * Math.min(1, dt * 2.5);
		this.rollSpeed += -this.roll * 100 * dt;
		this.roll += this.rollSpeed * dt;
		this.rollSpeed *= Math.max(0, 1 - 5 * dt);
		this.glide = Math.max(0, this.glide - dt * this.glideRate);
		this.apply();
	}

	apply() {
		const c = this.camera;
		const away = this.distance * this.zoom * (1 + this.pulled) * (1 + 0.45 * this.glide * this.glide * (3 - 2 * this.glide));
		const yaw = this.heading + this.yawOffset;
		const flat = Math.cos(this.pitch) * away;
		const cx = this.at.x - Math.sin(yaw) * flat;
		const cz = this.at.z - Math.cos(yaw) * flat;
		c.position.set(cx, Math.max((this.groundAt?.(cx, cz) ?? 0) + 0.35, this.at.y + this.lift + Math.sin(this.pitch) * away), cz);
		look.set(this.at.x, this.at.y + this.lift, this.at.z);
		c.lookAt(look);
		c.rotation.z += this.roll;
	}
}
