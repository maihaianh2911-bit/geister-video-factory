// 20.90–22.50: diagram — a cyan circle of what doctors could do is squeezed by a red SCHMERZ ring ("Möglichkeiten" 20.9).
import { K, DEFS, BG, TX, knife, saw, watch, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const a = 1, sq = eio(prog(t, 21.0, 22.0));
  const r = lerp(330, 170, sq);
  // what surgeons could do = their tools inside the circle; the pain ring pushes them together
  const out = 1 - sq;
  const ringR = lerp(460, r + 36, sq);
  return `${DEFS}${BG()}<circle cx="540" cy="860" r="${f1(r)}" fill="${K.cyan}" opacity="${f1(.18 * a)}" stroke="${K.cyan}" stroke-width="10"/>
    <g opacity="${f1(a)}">${knife(lerp(470, 500, sq), lerp(760, 830, sq), lerp(1.2, .8, sq), -20)}${saw(lerp(400, 470, sq), lerp(960, 900, sq), lerp(1, .6, sq), 10)}</g>
    <g opacity="${f1(a * out)}">${watch(lerp(700, 600, sq), lerp(900, 880, sq), lerp(70, 40, sq), 60, t * 300)}</g>
    <circle cx="540" cy="860" r="${f1(ringR)}" fill="none" stroke="${K.red}" stroke-width="${f1(lerp(10, 60, sq))}" opacity="${f1(a)}"/>${TX('SCHMERZ', 540, 300, 110, K.red, 'middle', `opacity="${f1(a)}"`)}`;
}
