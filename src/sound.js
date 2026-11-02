// The sound of things being hit: Kenney's Impact Sounds (CC0), real recordings, chosen by what was hit and pitched by how
// heavy it is. There's no engine or tyre sound yet: we'd rather have none than a bad loop.
const SETS = {
	wood: ['impactPlank_medium_000', 'impactPlank_medium_001', 'impactPlank_medium_002'],
	metal: ['impactMetal_medium_000', 'impactMetal_medium_001', 'impactMetal_medium_002'],
	heavy: ['impactMetal_heavy_000', 'impactMetal_heavy_001'],
	plate: ['impactPlate_medium_000', 'impactPlate_medium_001'],
};

export class Sounds {
	constructor() {
		this.context = null;
		this.buffers = {};
		this.bytes = {};
		this.last = 0;
		this.played = 0;
	}

	/** Fetches the files. Nothing can play until someone clicks or presses a key: browsers insist. */
	async load() {
		const names = Object.values(SETS).flat();
		await Promise.all(
			names.map(async (name) => {
				const response = await fetch(`audio/${name}.ogg`);
				this.bytes[name] = await response.arrayBuffer();
			}),
		);
	}

	/** On a person's first click or key. */
	async start() {
		if (this.context) return;
		const Context = window.AudioContext ?? window.webkitAudioContext;
		if (!Context) return;
		this.context = new Context();
		this.output = this.context.createDynamicsCompressor();
		this.output.connect(this.context.destination);
		await Promise.all(
			Object.entries(this.bytes).map(async ([name, bytes]) => {
				try {
					this.buffers[name] = await this.context.decodeAudioData(bytes);
				} catch {
					// A browser that can't read Ogg just has no sound.
				}
			}),
		);
		this.bytes = {};
	}

	/** `strength` from 0 to 1; `pitch` about 1; `rate` slows it with slow motion. */
	play(kind, strength, pitch = 1, rate = 1) {
		const c = this.context;
		if (!c || c.state !== 'running' || strength < 0.03) return;
		const now = c.currentTime;
		if (now - this.last < 0.025) return; // A pile falling over is not forty sounds.
		this.last = now;
		const set = SETS[kind];
		const buffer = this.buffers[set[Math.floor(Math.random() * set.length)]];
		if (!buffer) return;
		const source = c.createBufferSource();
		source.buffer = buffer;
		source.playbackRate.value = pitch * rate * (0.92 + Math.random() * 0.16);
		const gain = c.createGain();
		gain.gain.value = Math.min(1, strength) ** 1.4 * 0.8;
		source.connect(gain).connect(this.output);
		source.start();
		this.played++;
	}

	setVisible(visible) {
		if (!this.context) return;
		if (visible) this.context.resume();
		else this.context.suspend();
	}
}
