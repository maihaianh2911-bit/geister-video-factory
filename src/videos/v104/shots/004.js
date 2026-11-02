// L2 10.58–14.68: Monday morning at the front door (day card MONTAG, counter TAG 1); du steps onto the doorstep in his white sneakers and
// decides: a chip "10 MIN" with a small clock pops on "zehn Minuten" (12.66); the meadow lies untouched in front of him.
import { K, frame, cam, prog, eio, pop, label, chip, clock } from './lib.js';
import { field, house } from './common.js';
import { dayCounter } from './meadow.js';
export default function renderShot(t) {
  const st = eio(prog(t, 10.8, 11.6));
  let s = field(t, 200 + 40 * st, 1240, .78, { mood: 'morning', p: 0, tall: 1.5, tallBack: 1.2, frontClip: 390, house: { open: 1, w: 470, dx: 140 }, du: { look: [16, -4], brows: 'calm', mouth: t > 12.7 ? 'smile' : 'small', walk: st > 0 && st < 1 ? t * 1.6 : undefined } });
  s = cam(s, 420, 1000, 1.1 + .05 * eio(prog(t, 10.58, 14.68)));
  const cp = pop(t, 12.66, .4);
  if (cp > 0) s += `<g transform="translate(560 560) scale(${cp.toFixed(3)})">${chip(40, 0, '10 MIN', { size: 52 })}${clock(-130, 0, 40, 7, 10)}</g>`;
  s += label('MONTAG', 540, 250, 104, { p: pop(t, 10.62, .45) });
  s += dayCounter('TAG 1', 820, 400, pop(t, 11.3, .4));
  return frame(s);
}
