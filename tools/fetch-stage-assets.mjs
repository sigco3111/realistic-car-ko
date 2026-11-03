// The rally stage's raw assets, all Poly Haven and CC0, into tools/out/ph/<id>/ with a record.json of their licence and authors.
// Build time only: make-stage-assets.py and make-rocks.mjs shrink them into public/stage/.
//   node tools/fetch-stage-assets.mjs
import { existsSync, mkdirSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

const root = fileURLToPath(new URL('./out/ph/', import.meta.url));
const TEXTURES = ['asphalt_02', 'forest_ground_04', 'forest_leaves_02', 'leafy_grass', 'lichen_rock'];
const MODELS = ['rock_moss_set_01'];
const SKIES = ['kloofendal_38d_partly_cloudy_puresky'];

const get = async (url) => {
	const r = await fetch(url, { headers: { 'user-agent': 'patch-car-block-build' } });
	if (!r.ok) throw new Error(`${url}: ${r.status}`);
	return r;
};
const save = async (url, path) => {
	if (existsSync(path)) return;
	writeFileSync(path, Buffer.from(await (await get(url)).arrayBuffer()));
};
let bytes = 0;
for (const id of [...TEXTURES, ...MODELS, ...SKIES]) {
	const dir = `${root}${id}/`;
	mkdirSync(dir, { recursive: true });
	const info = await (await get(`https://api.polyhaven.com/info/${id}`)).json();
	const files = await (await get(`https://api.polyhaven.com/files/${id}`)).json();
	writeFileSync(`${dir}record.json`, JSON.stringify({ id: `polyhaven:${id}`, name: info.name, authors: info.authors, license: 'CC0-1.0', source: `https://polyhaven.com/a/${id}`, polycount: info.polycount ?? null }, null, 1));
	if (TEXTURES.includes(id)) {
		for (const [key, name] of [['Diffuse', 'diff'], ['nor_gl', 'nor'], ['Rough', 'rough']]) {
			const f = files[key]?.['2k']?.jpg ?? files[key]?.['2k']?.png;
			if (!f) continue;
			bytes += f.size;
			await save(f.url, `${dir}${name}.${f.url.split('.').pop()}`);
		}
	} else if (MODELS.includes(id)) {
		const g = files.gltf['1k'].gltf;
		bytes += g.size;
		await save(g.url, `${dir}${id}.gltf`);
		for (const [rel, f] of Object.entries(g.include ?? {})) {
			mkdirSync(`${dir}${rel.split('/').slice(0, -1).join('/')}`, { recursive: true });
			bytes += f.size;
			await save(f.url, `${dir}${rel}`);
		}
	} else {
		const f = files.hdri['4k'].hdr;
		bytes += f.size;
		await save(f.url, `${dir}sky.hdr`);
		await save(`https://cdn.polyhaven.com/asset_img/primary/${id}.png?width=1024`, `${dir}preview.png`);
	}
	console.log(id, info.authors ? Object.keys(info.authors).join(', ') : '', info.polycount ?? '');
}
console.log(`${(bytes / 1048576).toFixed(0)} MB listed`);
