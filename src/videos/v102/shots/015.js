// L8 35.2–39.08: the experiment: card 2 WOCHEN on "zwei Wochen" (36.02); a 14-night calendar fills night by night,
// each cell gets a moon with "6 h" (36.3 → 38.2), a small sleeping test person at the bottom.
import { frame, cam, prog, eio, label, pop } from './lib.js';
import { labBg, nights } from './graph.js';
import { bedDu } from './sets.js';
export default function renderShot(t) {
  let s = labBg(t);
  s += nights(t, 540, 580, 14, 36.3, .14, '6 h');
  s += `<g transform="translate(170 470) scale(.6)">${bedDu(t, { hx: 330, hy: 1010, eyes: 'closed', mouth: 'small', brows: 'calm' })}</g>`;
  s = cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 35.2, 39.08)));
  s += label('2 WOCHEN', 540, 330, 100, { p: pop(t, 36.02, .45) });
  return frame(s);
}
