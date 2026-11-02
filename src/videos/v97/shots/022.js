// L11a 60.24–62.70: DIENSTAG, sunny office. du (three notes) walks over to the colleague, who holds a coffee ("gehst" 61.06).
import { frame, cam, shadow, pop, prog, eio, person, dayCard, mug } from './lib.js';
import { openOffice } from './sets.js';
import { duNotes } from './base.js';
export default function renderShot(t) {
  let s = openOffice(t, { mood: 'sun', hh: 9, mm: 15 });
  const w = eio(prog(t, 60.9, 62.3));
  const X = 100 + 260 * w;
  s += shadow(800, 1650) + person('kol', 800, 1650, 1, { t, seed: 4, look: [-10, 0], mouth: 'soft', brows: 'calm', armL: [-60, -420], elbowL: [-180, -360], holdL: mug(0, 40, .6, '#f2efe8', t) });
  s += shadow(X, 1650) + person('du', X, 1650, 1, { t, seed: 3, look: [14, -2], brows: 'up', mouth: 'soft', walk: w > 0 && w < 1 ? t * 1.7 : undefined, notes: duNotes(t) });
  s = cam(s, 540, 1050, .96 + .1 * eio(prog(t, 60.24, 62.7)));
  s += dayCard(t, 60.24, 'DIENSTAG');
  return frame(s);
}
