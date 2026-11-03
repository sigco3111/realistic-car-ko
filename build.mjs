// Builds the car block's demo into dist/ (index.html at the top) with the files it loads and their licences:
// `npm install`, then `npm run build`.
// - The car and mannequin are in public/models and go in as they are.
import { execSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const here = path.dirname(fileURLToPath(import.meta.url));
const dist = path.join(here, 'dist');
execSync('node make-recipe.mjs', { cwd: here, stdio: 'inherit' });
execSync(`node "${path.join(here, 'node_modules/vite/bin/vite.js')}" build --config vite.config.mjs`, { cwd: here, stdio: 'inherit' });

const put = (from, to) => {
	fs.mkdirSync(path.dirname(path.join(dist, to)), { recursive: true });
	fs.cpSync(path.join(here, from), path.join(dist, to), { recursive: true });
};
put('LICENSE', 'LICENSE.txt');
put('LICENCE-NOTES.md', 'LICENCE-NOTES.md');
put('CREDITS.txt', 'CREDITS.txt');
put('third-party', 'third-party');

let bytes = 0;
const sizes = {};
const sum = (dir) => {
	for (const e of fs.readdirSync(dir, { withFileTypes: true })) {
		const p = path.join(dir, e.name);
		if (e.isDirectory()) sum(p);
		else {
			const n = fs.statSync(p).size;
			bytes += n;
			const top = path.relative(dist, p).split(path.sep)[0];
			sizes[top] = (sizes[top] ?? 0) + n;
		}
	}
};
sum(dist);
console.log(`dist: ${(bytes / 1048576).toFixed(1)} MB (${Object.entries(sizes).filter(([, n]) => n > 50000).map(([k, n]) => `${k} ${(n / 1048576).toFixed(1)}`).join(', ')})`);
