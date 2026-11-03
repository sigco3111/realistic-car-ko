// What the car sounds like: real recordings only, listed with their roles in audio/sounds.json (made by tools/make-sounds.py), so swapping one
// is a line there. The engine is a few loops cut from a recording at steady revs, faded from one to the next and pitched by the real rev
// value. Tyres, gravel and wind are loops the car's speed and slip turn up and down. Everything else is a one-off, chosen by what was hit and how
// hard, and never the same one twice running.
const clamp = (x, a, b) => Math.min(b, Math.max(a, x));
const smooth = (a, b, x) => {
	const t = clamp((x - a) / (b - a), 0, 1);
	return t * t * (3 - 2 * t);
};

// How the mix changes from the seat: what's outside is muffled by the body, and the engine's nearer.
const CABIN = { outside: 1600, hits: 3200, engine: 7000, worldGain: 0.62, engineGain: 1.08 };

export class Sounds {
	constructor() {
		this.context = null;
		this.buffers = {};
		this.manifest = null;
		this.last = {};
		this.lastPlayed = {};
		this.played = 0;
		this.engine = null;
		this.loops = {};
		this.inside = false;
		this.wasThrottle = 0;
		this.pops = 0;
		this.popAt = 0;
		this.scraping = 0;
	}

	/** Fetches and decodes the files, before the demo's ready, so a first click has nothing to wait for. */
	async load() {
		this.manifest = await (await fetch('audio/sounds.json')).json();
		const m = this.manifest;
		const names = new Set();
		for (const set of Object.values(m.engines)) for (const l of set.loops) names.add(l.file);
		for (const l of Object.values(m.loops)) names.add(l.file);
		for (const tiers of Object.values(m.hits)) for (const list of Object.values(tiers)) for (const h of list) names.add(h.file);
		const offline = new OfflineAudioContext(1, 44100, 44100);
		await Promise.all(
			[...names].map(async (name) => {
				const response = await fetch(`audio/${name}`);
				try {
					this.buffers[name] = await offline.decodeAudioData(await response.arrayBuffer());
				} catch {
					// A browser that can't read Ogg just has no sound.
				}
			}),
		);
	}

	/** On a person's first click or key: nothing can play until then, browsers insist. */
	start() {
		if (this.context) return;
		const Context = window.AudioContext ?? window.webkitAudioContext;
		if (!Context || !this.manifest) return;
		const c = (this.context = new Context());
		this.limiter = c.createDynamicsCompressor();
		this.limiter.threshold.value = -10;
		this.limiter.ratio.value = 8;
		this.limiter.attack.value = 0.004;
		this.limiter.release.value = 0.18;
		this.master = c.createGain();
		this.master.connect(this.limiter).connect(c.destination);
		const bus = (cut) => {
			const filter = c.createBiquadFilter();
			filter.type = 'lowpass';
			filter.frequency.value = cut;
			const gain = c.createGain();
			filter.connect(gain).connect(this.master);
			return { filter, gain };
		};
		this.engineBus = bus(18000);
		this.worldBus = bus(18000);
		this.hitBus = bus(18000);
		for (const [name, l] of Object.entries(this.manifest.loops)) {
			const buffer = this.buffers[l.file];
			if (!buffer) continue;
			const source = c.createBufferSource();
			source.buffer = buffer;
			source.loop = true;
			const gain = c.createGain();
			gain.gain.value = 0;
			source.connect(gain).connect(this.worldBus.filter);
			source.start(0, Math.random() * buffer.duration);
			this.loops[name] = { source, gain, level: l.gain ?? 1 };
		}
		this.applyInside();
		if (this.wantedEngine) this.useEngine(this.wantedEngine);
	}

	/** In the seat or not. */
	setInside(inside) {
		this.inside = inside;
		this.applyInside();
	}

	applyInside() {
		if (!this.context) return;
		const t = this.context.currentTime;
		const go = (param, value) => param.setTargetAtTime(value, t, 0.06);
		go(this.engineBus.filter.frequency, this.inside ? CABIN.engine : 18000);
		go(this.worldBus.filter.frequency, this.inside ? CABIN.outside : 18000);
		go(this.hitBus.filter.frequency, this.inside ? CABIN.hits : 18000);
		go(this.worldBus.gain.gain, this.inside ? CABIN.worldGain : 1);
		go(this.engineBus.gain.gain, this.inside ? CABIN.engineGain : 1);
	}

	/** Which engine's playing: which set of loops in audio/sounds.json. */
	useEngine(name) {
		this.wantedEngine = name;
		if (!this.context || this.engine?.name === name) return;
		this.stopEngine();
		const set = this.manifest.engines[name];
		if (!set) return;
		const c = this.context;
		const tone = c.createBiquadFilter();
		tone.type = 'lowpass';
		tone.frequency.value = 12000;
		const out = c.createGain();
		out.gain.value = 0;
		tone.connect(out).connect(this.engineBus.filter);
		const loops = [];
		for (const l of set.loops) {
			const buffer = this.buffers[l.file];
			if (!buffer) continue;
			const source = c.createBufferSource();
			source.buffer = buffer;
			source.loop = true;
			const gain = c.createGain();
			gain.gain.value = 0;
			source.connect(gain).connect(tone);
			source.start(0, Math.random() * buffer.duration);
			loops.push({ source, gain, rpm: l.rpm, level: l.gain ?? 1 });
		}
		this.engine = { name, loops, tone, out, level: set.gain ?? 1, popKind: set.pops, offTone: set.offTone ?? 1500, offGain: set.offGain ?? 0.5 };
	}

	stopEngine() {
		if (!this.engine) return;
		for (const l of this.engine.loops) l.source.stop();
		this.engine.out.disconnect();
		this.engine = null;
	}

	/**
	 * Once a frame, with the car as it is now. `rate` slows it all with slow motion.
	 * Revs choose the two nearest loops and pitch them; the foot on the throttle opens up the sound.
	 */
	update(car, dt, rate = 1) {
		const c = this.context;
		if (!c || c.state !== 'running') return;
		const t = c.currentTime;
		const glide = (param, value, time = 0.03) => param.setTargetAtTime(value, t, time);

		const e = this.engine;
		if (e && e.loops.length) {
			const rpm = car.rpm;
			const loops = e.loops;
			let high = loops.findIndex((l) => l.rpm >= rpm);
			if (high < 0) high = loops.length - 1;
			const low = Math.max(0, high - 1);
			const mix = high === low ? 1 : clamp((rpm - loops[low].rpm) / (loops[high].rpm - loops[low].rpm), 0, 1);
			loops.forEach((l, i) => {
				const share = i === high ? Math.sin((mix * Math.PI) / 2) : i === low ? Math.cos((mix * Math.PI) / 2) : 0;
				glide(l.gain.gain, share * l.level, 0.02);
				glide(l.source.playbackRate, clamp((rpm / l.rpm) * rate, 0.4, 2.4), 0.012);
			});
			const load = car.shifting > 0 ? 0 : (car.throttleOut ?? 0);
			const open = smooth(0, 0.7, load);
			glide(e.tone.frequency, e.offTone + (14000 - e.offTone) * open, 0.05);
			glide(e.out.gain, e.level * (e.offGain + (1 - e.offGain) * open), 0.05);
			// Lifting off at high revs, a turbo car spits now and then.
			const foot = car.input.throttle;
			if (e.popKind && this.wasThrottle > 0.6 && foot < 0.1 && rpm > 4200 && Math.random() < 0.7) {
				this.pops = 1 + Math.floor(Math.random() * 3);
				this.popAt = t + 0.05 + Math.random() * 0.08;
			}
			if (this.pops > 0 && t >= this.popAt && load < 0.3) {
				this.play(e.popKind, 0.4 + Math.random() * 0.4, 1, rate, this.engineBus.filter);
				this.pops--;
				this.popAt = t + 0.07 + Math.random() * 0.16;
			}
			this.wasThrottle = foot;
		}

		// Under the tyres. Speed in m/s along the ground.
		const speed = Math.hypot(car.velocity.x, car.velocity.z);
		let tarmac = 0;
		let gravel = 0;
		let grass = 0;
		let slipTarmac = 0;
		let slipLoose = 0;
		for (const w of car.wheels) {
			if (!w.inContact) continue;
			if (w.surface === 'tarmac') {
				tarmac++;
				slipTarmac = Math.max(slipTarmac, w.slip);
			} else {
				if (w.surface === 'grass') grass++;
				else gravel++;
				slipLoose = Math.max(slipLoose, w.slip);
			}
		}
		const set = (name, level, pitch) => {
			const l = this.loops[name];
			if (!l) return;
			glide(l.gain.gain, l.level * level, 0.07);
			if (pitch !== undefined) glide(l.source.playbackRate, pitch * rate, 0.08);
		};
		const pace = smooth(0.5, 42, speed);
		const wheels = car.wheels.length;
		set('road', (tarmac / wheels) * pace ** 0.8, 0.8 + pace * 0.5);
		set('gravel', ((gravel + grass * 0.7) / wheels) * Math.min(1, pace ** 0.7 + smooth(1.2, 4, slipLoose) * smooth(1, 6, speed) * 0.5), 0.82 + pace * 0.4);
		set('squeal', smooth(1.25, 3.2, slipTarmac) * smooth(1.5, 7, speed), 0.9 + clamp(slipTarmac / 16, 0, 0.3));
		set('wind', smooth(10, 75, speed) ** 1.6 * (this.inside ? 0.7 : 1), 0.85 + pace * 0.35);
		// Metal dragging along something: while it's in touch and moving.
		this.scraping = Math.max(0, this.scraping - dt * 5);
		set('scrape', this.scraping * smooth(1, 14, speed), 0.85 + pace * 0.4);
	}

	/** Something's rubbing along the car, from a contact that goes on. */
	scrape(strength) {
		this.scraping = Math.max(this.scraping, clamp(strength, 0, 1));
	}

	/**
	 * A one-off. `kind` is a set in sounds.json, with a `light` and a `heavy` list chosen by `strength` from 0 to 1, and at most every 25 ms:
	 * a pile falling over is not forty sounds. `pitch` about 1; `rate` slows it with slow motion.
	 */
	play(kind, strength, pitch = 1, rate = 1, into = null) {
		const c = this.context;
		if (!c || c.state !== 'running' || strength < 0.03) return;
		const now = c.currentTime;
		if (now - (this.lastPlayed[kind] ?? -1) < 0.025) return;
		this.lastPlayed[kind] = now;
		const tiers = this.manifest.hits[kind];
		if (!tiers) return;
		const list = (strength > 0.5 ? tiers.heavy : tiers.light) ?? tiers.heavy ?? tiers.light;
		if (!list?.length) return;
		// Anything but the last one it played.
		const options = list.length > 1 ? list.filter((h) => h !== this.last[kind]) : list;
		const hit = options[Math.floor(Math.random() * options.length)];
		this.last[kind] = hit;
		const buffer = this.buffers[hit.file];
		if (!buffer) return;
		const source = c.createBufferSource();
		source.buffer = buffer;
		source.playbackRate.value = pitch * rate * (0.92 + Math.random() * 0.16);
		const gain = c.createGain();
		gain.gain.value = clamp(strength, 0, 1) ** 1.2 * (hit.gain ?? 1) * (0.88 + Math.random() * 0.12);
		const pan = c.createStereoPanner ? c.createStereoPanner() : null;
		if (pan) {
			pan.pan.value = (Math.random() - 0.5) * 0.5;
			source.connect(gain).connect(pan).connect(into ?? this.hitBus.filter);
		} else source.connect(gain).connect(into ?? this.hitBus.filter);
		source.start();
		this.played++;
	}

	setVisible(visible) {
		if (!this.context) return;
		if (visible) this.context.resume();
		else this.context.suspend();
	}
}
