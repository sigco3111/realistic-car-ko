// Bundles tools/bake-trees-entry.mjs with ez-tree and runs it: node tools/make-trees.mjs
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { build } from 'vite';

const here = path.dirname(fileURLToPath(import.meta.url));
const generator = path.join(here, '../../tree-generator/ez-tree/lib/index.js');
await build({
	configFile: false,
	logLevel: 'warn',
	build: { ssr: path.join(here, 'bake-trees-entry.mjs'), outDir: path.join(here, 'out/bake-trees'), emptyOutDir: true, rollupOptions: { output: { entryFileNames: 'bake.mjs' } } },
	resolve: { alias: { '@dgreenheck/ez-tree': generator } },
	ssr: { noExternal: true },
});
execFileSync('node', [path.join(here, 'out/bake-trees/bake.mjs')], { stdio: 'inherit', cwd: path.join(here, '..') });
