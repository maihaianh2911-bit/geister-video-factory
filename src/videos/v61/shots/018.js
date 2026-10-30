// 30.8–32.7: the brain places the pain at the forehead (Stirn) and the temples (Schläfen)
import { K, DEFS, BG, headProfile, cam, zap, prog, eout, eio, back, lerp } from './lib.js';
export default function renderShot(t) {
  const fore = eout(prog(t, 31.1, 31.45)), tem = eout(prog(t, 32.0, 32.35));
  const head = `<g transform="translate(480 800) scale(1.85)">${headProfile(t, { id: 'r', ice: 1, cold: .8, nerve: 1, branches: 1, brain: .5, fore: fore * (.85 + .15 * Math.sin(t * 14)), temple: tem * (.85 + .15 * Math.sin(t * 14 + 1)) })}</g>`;
  return `${DEFS}${BG(K.bg)}${head}${zap(480 + 160 * 1.85 + 40, 800 - 120 * 1.85 - 150, back(prog(t, 31.1, 31.35)), fore)}${zap(480 + 72 * 1.85 - 10, 800 - 84 * 1.85 - 150, .8 * back(prog(t, 32, 32.25)), tem)}`;
}
