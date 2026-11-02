// L0 0–5.2 hook: du and Lena face each other; du's head lights up on "hören"; a thought forms over Lena on "Freundin".
import { K, frame, bg, shadow, person, thought, title, cam, prog, eio, eout, pop, fade, f1 } from './lib.js';
export default function renderShot(t) {
  const hear = eout(prog(t, 1.68, 2.3));
  const z = 1 + .05 * eio(prog(t, 0, 5.2));
  let s = bg('street', { sc: 1 + .02 * eio(prog(t, 0, 5.2)) });
  s += shadow(330, 1330) + shadow(750, 1330);
  const shocked = t > 1.9;
  s += person('du', 330, 1330, 1, { t, seed: 1, hear, eyes: shocked ? 'wide' : 'n', look: shocked ? [6, -6] : [10, 0], mouth: shocked ? 'o' : 'smile' });
  s += person('lena', 750, 1330, 1, { t, seed: 2, look: [-10, 0], mouth: 'smile' });
  // the thought she has (still unknown): an empty bubble that forms on "Freundin" and fills with dots
  const p = pop(t, 3.5, .5);
  const dots = '.'.repeat(Math.min(3, Math.max(0, Math.floor((t - 3.9) / .3) + 1)));
  s += thought(820, 660, [dots || ' '], 780, 800, { p, size: 60 });
  s = cam(s, 540, 1000, z);
  s += title(['WAS DENKT DEINE', 'BESTE FREUNDIN', ['WIRKLICH?', K.yellow]], 230, 78, { a: fade(t, 0, .25) });
  return frame(s);
}
