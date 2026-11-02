// L0a 0–3.08: living room evening; young du stands left alone; on "achtzigjähriges" (1.91) the old du appears at the right with a warm shimmer,
// title DU MIT ACHTZIG pops; young du's eyes go wide (2.3).
import { K, frame, cam, label, pop, prog, eio, person, shadow, pool } from './lib.js';
import { room } from './sets.js';
import { old } from './common.js';
export default function renderShot(t) {
  const ap = eio(prog(t, 1.85, 2.5));
  let s = room(t, { mood: 'amber', hh: 20, mm: 15 });
  s += pool(730, 1150, 340 * (.4 + ap), 560, '#ffe6a8', .55 * ap * (1 - .6 * prog(t, 2.5, 3.08)));
  s += shadow(330, 1640);
  const sur = t > 2.3;
  s += person('du', 330, 1640, 1, { t, seed: 1, look: ap > .3 ? [14, 0] : [4, 6], eyes: sur ? 'wide' : 'n', brows: sur ? 'up' : 'calm', mouth: sur ? 'o' : 'small', lean: sur ? -2 : 0, drops: [2.3] });
  if (ap > 0) s += old(t, 760, 1640, .98, { a: ap, look: [-14, 0], brows: 'calm', mouth: 'smile' });
  s = cam(s, 540, 1100, 1.0 + .06 * eio(prog(t, 0, 3.08)));
  s += label('DU MIT ACHTZIG', 540, 250, 104, { p: pop(t, 1.95, .45) });
  return frame(s);
}
