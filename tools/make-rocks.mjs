// The stage's rocks: Poly Haven's scanned moss rocks (CC0), simplified hard, with their textures made small, in one file.
//   node tools/make-rocks.mjs
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS, EXTTextureWebP } from '@gltf-transform/extensions';
import { dedup, prune, simplify, weld } from '@gltf-transform/functions';
import { execFileSync } from 'node:child_process';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
// The simplifier, from the forests block's own copy: this is a build step, and nothing of it ships.
const { MeshoptSimplifier } = await import(new URL('../../forests/node_modules/meshoptimizer/index.js', import.meta.url).href);
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
await MeshoptSimplifier.ready;
const raw = path.join(here, 'out/ph');
const doc = await io.read(path.join(raw, 'rock_moss_set_01/rock_moss_set_01.gltf'));
await doc.transform(
	weld(),
	simplify({ simplifier: MeshoptSimplifier, ratio: 0.05, error: 0.02, lockBorder: false }),
	dedup(),
	prune(),
);
doc.createExtension(EXTTextureWebP).setRequired(true);
const work = fs.mkdtempSync(path.join(os.tmpdir(), 'rocks-'));
doc.getRoot().listTextures().forEach((t, i) => {
	const from = path.join(work, `${i}.${t.getMimeType() === 'image/png' ? 'png' : 'jpg'}`);
	const to = path.join(work, `${i}.webp`);
	fs.writeFileSync(from, t.getImage());
	execFileSync('ffmpeg', ['-y', '-loglevel', 'error', '-i', from, '-vf', 'scale=512:512:flags=lanczos', '-c:v', 'libwebp', '-quality', '80', to]);
	t.setImage(fs.readFileSync(to)).setMimeType('image/webp');
});
let tris = 0;
for (const mesh of doc.getRoot().listMeshes()) for (const prim of mesh.listPrimitives()) tris += (prim.getIndices()?.getCount() ?? 0) / 3;
await io.write(path.join(here, '../public/stage/rocks.glb'), doc);
console.log('rocks', doc.getRoot().listMeshes().length, 'meshes', Math.round(tris), 'triangles');
