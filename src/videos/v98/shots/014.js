// L9a 36.04–38.22: close-up: the colleague beams ("strahlt" 36.2), warm glow; her bubble with mountains at sunrise grows big; chip "10 MIN" ("zehn Minuten" 37.12).
import { K, frame, cam, prog, eio, pop, person, chip, pool } from './lib.js';
import { canteen } from './sets.js';
import { warmBubble, mountains } from './base.js';
export default function renderShot(t) {
  let s = canteen(t, { crowd: false });
  const b = prog(t, 36.04, 36.6);
  s += pool(520, 1000, 620, 620, '#ffc46b', .2 + .3 * b);
  s += person('kol', 520, 2180, 1.7, { t, seed: 5, look: [10, -6], brows: 'up', mouth: Math.sin(t * 14) > 0 ? 'grin' : 'talk', eyes: t > 36.2 && t < 36.9 ? 'happy' : 'n' });
  s += warmBubble(500, 330, 480, 300, 600, 600, mountains(t, 460, 280), { p: 1, grow: .5 + .5 * prog(t, 36.04, 38.2), id: 'b14' });
  s += chip(860, 720, '10 MIN', { size: 46, bg: '#ffd23f', a: pop(t, 37.12, .4) > 0 ? 1 : 0 });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 36.04, 38.22))));
}
