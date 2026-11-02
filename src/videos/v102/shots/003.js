// L2a 5.18–7.06: "Nach zwei Wochen wäre alles grau": card NACH 2 WOCHEN; the street goes completely grey (overlay to 1 on "grau" 6.46), meter drops to 0 % and turns red; du (still coloured) stands small-ish at the right, unaware.
import { frame, cam, prog, eio, pop, person, shadow, label } from './lib.js';
import { street } from './sets2.js';
import { fgTable, fadeWorld, bar } from './base.js';
export default function renderShot(t) {
  let s = street(t) + fgTable(t, 1720, { col: '#7d8a6a', hi: '#93a07c' });
  s += fadeWorld(t);
  s += shadow(700, 1640, 170);
  s += person('du', 700, 1640, .92, { t, seed: 1, look: [-8, -2], brows: 'calm', mouth: 'smile' });
  s = cam(s, 540, 1000, 1.02 + .05 * eio(prog(t, 5.18, 7.06)), -30 * eio(prog(t, 5.18, 7.06)));
  s += label('NACH 2 WOCHEN', 540, 330, 96, { p: pop(t, 5.2, .45), fill: '#fff' });
  s += bar(t);
  return frame(s);
}
