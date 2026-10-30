// 26.3–28.72: the same nerve branches to many areas of the face — forehead, temple, cheek, jaw light up
import { K, DEFS, BG, headProfile, cam, prog, eout, eio, back, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const br = eio(prog(t, 26.6, 27.9));
  const head = `<g transform="translate(480 800) scale(1.85)">${headProfile(t, { id: 'p', ice: 1, cold: .8, nerve: 1, branches: br })}</g>`;
  const ends = [[190, -150, 0], [72, -84, 1], [172, 40, 2], [140, 186, 3]].map(([x, y, i]) => { const a = back(prog(t, 26.75 + i * .28, 27.05 + i * .28)); return `<circle cx="${f1(480 + x * 1.85)}" cy="${f1(800 + y * 1.85)}" r="${f1(30 * a)}" fill="${K.nerve}" ${'stroke="#16324F" stroke-width="6"'}/>`; }).join('');
  return `${DEFS}${BG(K.bg)}${head}${ends}`;
}
