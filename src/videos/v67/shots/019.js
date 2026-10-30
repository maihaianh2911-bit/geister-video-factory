// 46.4–49.24: neck close-up — the wide foam is squeezed into the narrow neck ("bündelt") and leaves as a jet ("Fontäne")
import { K, arrow, bubble, fountain, prog, eio, eout, lerp, hash } from './lib.js';
import { NB, neckBottle, neckBG } from './005.js';
export default function renderShot(t) {
  let foam = '';
  for (let i = 0; i < 40; i++) { const x = (hash(i * 2.1) - .5) * 140, y = -250 - hash(i * 4.7) * 140, wy = y - ((t * 90 + hash(i) * 200) % 120); foam += bubble(x * (wy < -330 ? .3 : 1), wy, 7 + 6 * hash(i * 3.9), { fill: '#F3E3C8', stroke: '#1B1B1F', w: 1.4 }); }
  const c = eout(prog(t, 46.9, 47.5));
  const ar = c > 0 ? arrow(-62, -250, -14, -330, K.blue, 6, c) + arrow(62, -250, 14, -330, K.blue, 6, c) : '';
  const jet = fountain(NB.x, NB.y - 384 * NB.s, eout(prog(t, 47.9, 48.5)) * 900, 1, t, { w0: 60, w1: 120, drops: 8 });
  return `${neckBG()}${neckBottle('c19', foam + ar, 372)}${jet}`;
}
