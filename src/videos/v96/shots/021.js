// L13 58.5–62.4: "SONNTAGABEND": dark blue living room, du on the sofa side; the hourglass fills completely; "ÜBER 20 STUNDEN" on "zwanzig Stunden" (60.52); push in to the hourglass.
import { K, frame, cam, shadow, label, pop, prog, eio } from './lib.js';
import { room } from './sets.js';
import { duHG } from './base.js';
import { fgTable } from './fg.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 50, light: .4 });
  s += shadow(540, 1640);
  s += duHG(540, 1640, 1, { t, seed: 1, look: [0, -14], brows: 'worried', mouth: 'frown' }, { s: 1.0, glow: .7 });
  s += fgTable(t, { mugX: 220, remote: 760 });
  s = cam(s, 540, 600, 1.0 + .12 * eio(prog(t, 58.6, 62.4)));
  s += label('SONNTAGABEND', 540, 250, 104, { p: pop(t, 58.55, .45) });
  s += label('ÜBER 20 STUNDEN', 540, 1330, 92, { p: pop(t, 60.4, .45), fill: '#ffffff' });
  return frame(s);
}
