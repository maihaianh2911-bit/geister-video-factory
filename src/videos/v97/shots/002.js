// L0b 3.30–5.36: close-up. A big note slaps onto du's shoulder on "Zettel" (3.90); du looks down at it, a 4th lands at 4.48 ("bliebe").
import { frame, cam, prog, eio, eout, person, flyNote } from './lib.js';
import { room } from './sets.js';
import { COVER } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', clock: false, strong: true });
  const X = 520, Y = 2100, S = 1.6;
  const list = [COVER[1], COVER[2]];
  if (t >= 3.9) list.push(COVER[0]);
  if (t >= 4.48) list.push(COVER[5]);
  const look = t >= 4.0 ? [14, 12] : [0, 0];
  s += person('du', X, Y, S, { t, look, eyes: t >= 3.9 ? 'wide' : 'n', brows: t >= 3.9 ? 'worried' : 'up', mouth: t >= 3.95 ? 'o' : 'flat', headTilt: t >= 4.0 ? 6 * eout(prog(t, 4.0, 4.3)) : 0, notes: list });
  s += flyNote(t, 3.9, 1200, 300, X + COVER[0].x * S, Y + COVER[0].y * S, 2.4, S, COVER[0].rot, COVER[0].txt, .55, { arc: -60 });
  s += flyNote(t, 4.48, -200, 500, X + COVER[5].x * S, Y + COVER[5].y * S, 2.0, S * COVER[5].s, COVER[5].rot, [], .45, { arc: -40 });
  const bump = (t >= 3.9 ? .03 * Math.exp(-(t - 3.9) * 5) : 0);
  return frame(cam(s, 540, 1000, 1 + .05 * eio(prog(t, 3.3, 5.36)) + bump));
}
