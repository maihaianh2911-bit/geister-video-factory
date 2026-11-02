// L1a 0–2.86: evening living room, du (teal hoodie) in the middle, yellow question marks float around; title; zipper closes du's mouth on "nichts über dich erzählen" (1.74).
import { K, frame, cam, shadow, label, pop, prog, eio } from './lib.js';
import { room } from './sets.js';
import { person } from './lib.js';
import { fgTable } from './fg.js';
import { qmark } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 8, mm: 0 });
  const z = eio(prog(t, 1.74, 2.3));
  s += shadow(540, 1640);
  s += [[180, 700, .8, 0.3], [900, 640, .7, .6], [230, 1150, .6, .9], [860, 1100, .75, 1.2], [560, 520, .55, 1.5]].map(([x, y, k, t0], i) => qmark(x, y, k * pop(t, t0, .45), t, i)).join('');
  s += person('du', 540, 1640, 1, { t, seed: 1, look: [0, 4], brows: z > .5 ? 'up' : 'calm', mouth: 'smile', zip: z, eyes: z > .5 ? 'wide' : 'n' });
  s += fgTable(t, { mugX: 860 });
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 0, 2.86)));
  s += label('NUR FRAGEN –', 540, 230, 96, { p: pop(t, .1, .45) }) + label('EINEN TAG LANG', 540, 340, 96, { p: pop(t, .4, .45) });
  return frame(s);
}
