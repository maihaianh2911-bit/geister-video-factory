// L1a 0–2.8: evening living room, du (teal hoodie) medium shot; on "Sorge" (1.28) a small grey cloud pops above his head and on "dunkle Wolke" (1.96–2.44) it swells and darkens. Hook title.
import { K, frame, cam, shadow, label, pop, prog, eio, person } from './lib.js';
import { room } from './sets.js';
import { fgTable } from './fg.js';
import { cloud, gloom } from './clouds.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 10 });
  const g = eio(prog(t, 1.96, 2.5));
  s += gloom(420, 1000, 420, 520, .35 * g, 'a');
  s += shadow(420, 1640);
  s += person('du', 420, 1640, 1, { t, seed: 1, look: g > .2 ? [8, -14] : [4, 2], brows: g > .4 ? 'worried' : 'calm', mouth: g > .4 ? 'frown' : 'small', eyes: g > .6 ? 'wide' : 'n' });
  s += cloud(440, 560, 300 + 140 * g, { t, seed: 2, p: pop(t, 1.28, .45), dark: .25 + .65 * g });
  s += fgTable(t, { mugX: 860 });
  s = cam(s, 480, 1000, 1.0 + .06 * eio(prog(t, 0, 2.8)));
  s += label('WAS WÄRE, WENN …', 540, 250, 92, { p: pop(t, .05, .45) });
  return frame(s);
}
