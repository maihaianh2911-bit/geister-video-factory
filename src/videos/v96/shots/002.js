// L1b 2.62–5.08: close-up, du's face lit blue by the phone; from "jede Minute" (2.94) sand runs in the hourglass above.
import { K, frame, cam, prog, eio, pop } from './lib.js';
import { room } from './sets.js';
import { duHG, holdPhone, screenGlow } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 0, strong: true });
  const k = 1.7;
  s += duHG(560, 2140, k, { t, seed: 1, look: [14, 14], brows: 'calm', mouth: 'flat', armR: [210, -330], front: screenGlow(120, -560, 180, .5) + holdPhone(210, -420, -10, { scroll: t * 40, s: 1 }) }, { s: .62, dx: 180, dy: -60 });
  s = cam(s, 540, 700, 1.0 + .06 * eio(prog(t, 2.62, 5.08)), 0, 30 * prog(t, 2.62, 5.08));
  return frame(s);
}
