// Grows the stage's trees with ez-tree (MIT, Dan Greenheck, through Patch's Tree generator block) and writes their buffers to
// public/stage/trees.bin and trees.json. Run through tools/make-trees.mjs.
import { writeFileSync } from 'node:fs';
import { Tree } from '@dgreenheck/ez-tree';

const SPECIES = {
	pine: { preset: 'Pine Medium', near: { sections: [10, 5, 3], segments: [7, 4, 3], leaves: 0.5 }, mid: { levels: 1, sections: [5, 2, 1], segments: [5, 3, 3], leaves: 0.12 } },
	aspen: { preset: 'Aspen Medium', near: { sections: [8, 4, 3], segments: [6, 4, 3], leaves: 0.45 }, mid: { levels: 1, sections: [4, 2, 1], segments: [5, 3, 3], leaves: 0.14 } },
};
const parts = [];
const meta = {};
let offset = 0;
const push = (array) => {
	const bytes = Buffer.from(array.buffer, array.byteOffset, array.byteLength);
	parts.push(bytes);
	const at = offset;
	offset += bytes.length;
	return { at, length: array.length };
};
for (const [name, spec] of Object.entries(SPECIES)) {
	meta[name] = {};
	for (const tier of ['near', 'mid']) {
		const t = spec[tier];
		const tree = new Tree();
		tree.loadPreset(spec.preset);
		const o = tree.options;
		if (t.levels) o.branch.levels = t.levels;
		t.sections.forEach((v, i) => {
			if (o.branch.sections[i] !== undefined) o.branch.sections[i] = v;
		});
		t.segments.forEach((v, i) => {
			if (o.branch.segments[i] !== undefined) o.branch.segments[i] = v;
		});
		o.leaves.count = Math.max(1, Math.round(o.leaves.count * t.leaves));
		o.leaves.size *= 1 / Math.sqrt(Math.max(t.leaves, 0.2));
		tree.generate();
		const entry = {};
		for (const kind of ['branches', 'leaves']) {
			const b = tree[kind];
			entry[kind] = {
				position: push(new Float32Array(b.verts)),
				normal: push(new Float32Array(b.normals)),
				uv: push(new Float32Array(b.uvs)),
				index: push(new Uint32Array(b.indices)),
				triangles: b.indices.length / 3,
			};
		}
		meta[name][tier] = entry;
		let top = 0;
		for (let i = 1; i < tree.leaves.verts.length; i += 3) top = Math.max(top, tree.leaves.verts[i]);
		for (let i = 1; i < tree.branches.verts.length; i += 3) top = Math.max(top, tree.branches.verts[i]);
		entry.height = top;
		console.log(name, tier, 'branches', entry.branches.triangles, 'leaves', entry.leaves.triangles, 'height', top.toFixed(1), 'bark', o.bark.type, 'leaf', o.leaves.type);
	}
}
writeFileSync('public/stage/trees.bin', Buffer.concat(parts));
writeFileSync('public/stage/trees.json', JSON.stringify(meta));
console.log('bytes', offset);
