// The stage's shape, measured without drawing it: node tools/stage-check.mjs
const { shapeStage, WORLD } = await import('../src/stage-shape.js');
const t0 = performance.now();
const st = shapeStage();
const p = st.road.points;
let worstGrade = 0, sharpest = 0, sealed = 0, maxY = -1e9, minY = 1e9, cross = 0;
for (let i = 2; i < p.length; i++) {
	const g = Math.abs(p[i].y - p[i - 2].y) / 4;
	if (g > worstGrade) worstGrade = g;
	if (Math.abs(p[i].bend) > sharpest) sharpest = Math.abs(p[i].bend);
	if (p[i].sealed > 0.5) sealed += 2;
	maxY = Math.max(maxY, p[i].y); minY = Math.min(minY, p[i].y);
	if (Math.abs(p[i].x) > WORLD - 20 || Math.abs(p[i].z) > WORLD - 20) cross++;
}
// The road mustn't run over itself.
let self = 0;
for (let i = 0; i < p.length; i += 5) for (let j = i + 40; j < p.length; j += 5) if (Math.hypot(p[i].x - p[j].x, p[i].z - p[j].z) < 18) self++;
console.log(JSON.stringify({ ms: Math.round(performance.now() - t0), length: Math.round(st.road.length), sealed, gravel: Math.round(st.road.length - sealed), worstGrade: +worstGrade.toFixed(3), tightestRadius: +(1 / sharpest).toFixed(1), y: [+minY.toFixed(1), +maxY.toFixed(1)], offWorld: cross, closeToItself: self }));
