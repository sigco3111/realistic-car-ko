// The car's dirt dial, for three.js. The ORM texture's blue channel on the paint and wheel materials says how early each texel gets dirty:
// the sills and arches first, the roof last. Metal is 0 on both, so the channel is free for this.
//
//   import { addDirt } from './dirt.js';
//   const dirt = addDirt(gltf.scene);
//   dirt.value = 0.5; // 0 is clean, 1 is a whole stage of gravel; change it whenever you like
//
// Works on MeshStandardMaterial and MeshPhysicalMaterial, and costs a few shader instructions.
import { Color } from 'three';

const NAMES = ['paint', 'wheel'];

/** Adds the dial to the car's paint and wheel materials. Returns an object whose `value` you set. */
export function addDirt(root, { dust = new Color(0.44, 0.37, 0.27), mud = new Color(0.13, 0.095, 0.065), value = 0 } = {}) {
	const level = { value };
	const seen = new Set();
	root.traverse((o) => {
		if (!o.isMesh) return;
		for (const m of Array.isArray(o.material) ? o.material : [o.material]) {
			if (seen.has(m) || !NAMES.includes(m.name) || !m.metalnessMap) continue;
			seen.add(m);
			m.onBeforeCompile = (shader) => {
				shader.uniforms.uDirt = level;
				shader.uniforms.uDust = { value: dust };
				shader.uniforms.uMud = { value: mud };
				shader.fragmentShader = shader.fragmentShader
					.replace('#include <common>', '#include <common>\nuniform float uDirt;\nuniform vec3 uDust;\nuniform vec3 uMud;\nfloat dirtCover = 0.0;')
					.replace(
						'#include <roughnessmap_fragment>',
						`#include <roughnessmap_fragment>
						{
							float dirtMask = texture2D(metalnessMap, vMetalnessMapUv).b;
							dirtCover = smoothstep(1.0 - uDirt, 1.32 - uDirt, dirtMask) * (uDirt > 0.0 ? 1.0 : 0.0);
							dirtCover *= mix(0.55, 1.0, clamp((dirtMask - 0.35) / 0.5, 0.0, 1.0));
							diffuseColor.rgb = mix(diffuseColor.rgb, mix(uDust, uMud, smoothstep(0.62, 0.92, dirtMask)), dirtCover);
							roughnessFactor = mix(roughnessFactor, 0.85, dirtCover);
						}`,
					)
					.replace(
						'#include <lights_physical_fragment>',
						`#include <lights_physical_fragment>
						#ifdef USE_CLEARCOAT
							material.clearcoat *= 1.0 - dirtCover;
						#endif`,
					);
			};
			m.customProgramCacheKey = () => `car-dirt-${m.name}`;
			m.needsUpdate = true;
		}
	});
	return level;
}
