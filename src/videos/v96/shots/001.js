// L1a 0–2.62: evening living room, du (teal hoodie) on the phone; on "Sanduhr" (1.74) a golden hourglass pops in above the head.
import { K, frame, cam, shadow, label, pop, prog, eio, fade } from './lib.js';
import { room, } from './sets.js';
import { duHG, holdPhone, screenGlow } from './base.js';
import { fgTable } from './fg.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 0 });
  const p = pop(t, 1.74, .45);
  s += shadow(470, 1640);
  s += duHG(470, 1640, 1, { t, seed: 1, brows: 'calm', mouth: 'flat', look: [12, 16], armR: [140, -380], front: screenGlow(100, -560, 170, .35) + holdPhone(140, -460, -8, { scroll: t * 30 }) }, { p, a: p > 0 ? 1 : 0, s: .82 * Math.max(.01, p) });
  s += fgTable(t, { mugX: 860 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 0, 2.62)), 20 * prog(t, 0, 2.62));
  s += label('WAS WÄRE, WENN …', 540, 250, 92, { p: pop(t, .1, .45) });
  return frame(s);
}
