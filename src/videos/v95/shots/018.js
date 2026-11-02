// L12 46.30–49.30: "HÄRTE = BESSER?": the red speaker barks at a small du at her desk; the big question card tilts with a question mark on "besser" (48.46).
import { K, frame, cam, person, speaker, label, chip, pool, prog, eio, pop, f1 } from './lib.js';
import { library, libTable } from './sets.js';
import { RED } from './base.js';
export default function renderShot(t) {
  let s = library(t);
  s += person('duw', 560, 1660, 1.0, { t, hunch: .5, look: [10, -12], brows: 'strain', mouth: 'wavy', eyes: 'tired', sweat: 1 });
  s += speaker(830, 760, .9, { t, ...RED, talk: 1, face: `<path d="M -54 -66 L -14 -52 M 14 -52 L 54 -66" stroke="#fff" stroke-width="9" stroke-linecap="round"/>` });
  s += libTable(1420);
  s = cam(s, 540, 1100, 1.0 + .06 * eio(prog(t, 46.3, 49.3)));
  s += label('HÄRTE GEGEN SICH', 540, 270, 80, { fill: '#ff6a5a', p: pop(t, 47.2, .4) });
  s += label('= BESSER?', 540, 390, 110, { fill: '#fff', p: pop(t, 48.46, .4) });
  s += `<g transform="translate(540 130) scale(${Math.max(.01, pop(t, 46.3, .4))})">${chip(0, 0, 'VIELE GLAUBEN', { size: 40 })}</g>`;
  return frame(s);
}
