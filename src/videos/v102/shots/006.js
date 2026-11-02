// L3b 12.2–13.96: close-up, du's face lit cold blue by the laptop (back of the lid at the bottom), screen flicker; on "spannend" (13.0) eyes go wide, a grin, he leans in.
import { frame, cam, prog, eio, person, laptop, pool } from './lib.js';
import { nightRoom, bar } from './base.js';
export default function renderShot(t) {
  let s = nightRoom(t, { dark: .65, strong: true, mx: 860, my: 330 });
  const fl = .75 + .25 * Math.sin(t * 11) * Math.sin(t * 2.7);
  const ex = eio(prog(t, 12.9, 13.2));
  s += person('du', 540, 2160, 1.75, { t, seed: 1, look: [0, 14], eyes: ex > .5 ? 'wide' : 'n', brows: 'up', mouth: ex > .5 ? 'grin' : 'small', headDy: 20 * ex, legs: false });
  s += pool(540, 900, 420, 360, '#7fc8ff', .5 * fl);
  s += laptop(540, 1880, 1.6, { back: true });
  s += pool(540, 1500, 520, 220, '#9fd8ff', .35 * fl);
  s = cam(s, 540, 950, 1.02 + .08 * eio(prog(t, 12.2, 13.96)));
  s += bar(t);
  return frame(s);
}
