// L1 4.08–6.9 "Die meisten Streits würden ganz anders enden": the red lightning between them softens into a heart on "anders".
import { K, frame, person, heart, cam, prog, eio, eout, pop, f1 } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t);
  const soft = eio(prog(t, 5.48, 5.9));
  s += person('du', DU, GY, 1, { t, seed: 1, hear: .6, brows: soft < .5 ? 'mean' : null, mouth: soft > .5 ? 'smile' : 'flat', look: [12, 0] });
  s += person('er', ER, GY, 1, { t, seed: 2, brows: soft < .5 ? 'mean' : null, mouth: soft > .5 ? 'smile' : 'flat', look: [-12, 0] });
  const zp = pop(t, 4.2, .35) * (1 - soft);
  if (zp > 0) s += `<g transform="translate(540 700) scale(${f1(zp * 100) / 100})"><path d="M -60 -120 L 20 -20 L -20 -10 L 60 120 L -10 10 L 30 0 Z" fill="${K.red}" stroke="${K.ink}" stroke-width="6" stroke-linejoin="round"/></g>`;
  if (soft > 0) s += heart(540, 720, 2.6 * pop(t, 5.48, .45), '#f07b8c');
  return frame(cam(s, 540, 1000, 1.03));
}
