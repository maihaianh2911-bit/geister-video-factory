// L0a 0–2.86: hook. Warm evening living room in full colour, du (teal hoodie) stands left; title WAS WÄRE, WENN …;
// on "Stunde" (1.18) a big wall clock right sweeps one hour and du glances at it; the FARBE meter appears full.
import { K, frame, cam, label, pop, prog, eio, person, shadow, clock, fade } from './lib.js';
import { room } from './sets.js';
import { fgTable } from './fg.js';
import { farbeBar, colourAt } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', clock: false });
  const sw = eio(prog(t, 1.1, 2.2));
  s += `<g transform="translate(770 620)"><circle r="150" fill="#000" opacity=".2" cx="10" cy="12"/></g>` + clock(770, 620, 150, 23 + sw, 30 + sw * 60, { hand: '#d9493f' });
  s += shadow(330, 1640);
  const lk = fade(t, 1.15, .3);
  s += person('du', 330, 1640, 1, { t, seed: 1, look: [14 * lk, -10 * lk], brows: lk > .5 ? 'up' : 'calm', mouth: 'small' });
  s += fgTable(t, { y: 1720, mugX: 860 });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 0, 2.86)));
  s += label('WAS WÄRE, WENN …', 540, 330, 92, { p: pop(t, .05, .45) });
  s += farbeBar(colourAt(t), { a: fade(t, .4, .4) });
  return frame(s);
}
