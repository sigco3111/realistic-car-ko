// Prepares the three cars for the demo from the lab's approved models: 1024 px WebP textures, no clips, the parts kept.
// Only run again when a model changes: the results are kept in public/models.
//
//   node make-models.mjs <patch-lab/models/vehicles>
//
// Each is CC0, made by Patch, approved by blendi on 2026-10-29 (patch-lab reviews/approved.md).
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { NodeIO } from '@gltf-transform/core';
import { ALL_EXTENSIONS } from '@gltf-transform/extensions';
import { prune, textureCompress } from '@gltf-transform/functions';
import sharp from 'sharp';

const here = path.dirname(fileURLToPath(import.meta.url));
const lab = process.argv[2];
if (!lab) throw new Error('Which folder? node make-models.mjs <patch-lab/models/vehicles>');
const io = new NodeIO().registerExtensions(ALL_EXTENSIONS);
for (const name of ['muscle-car', 'rally-car', 'pickup-truck']) {
	const doc = await io.read(path.join(lab, name, `${name}.glb`));
	for (const animation of doc.getRoot().listAnimations()) animation.dispose();
	await doc.transform(prune({ keepLeaves: true, keepAttributes: true }), textureCompress({ encoder: sharp, targetFormat: 'webp', resize: [1024, 1024], quality: 86 }));
	const to = path.join(here, 'public/models', `${name}.glb`);
	await io.write(to, doc);
	console.log(to);
}
