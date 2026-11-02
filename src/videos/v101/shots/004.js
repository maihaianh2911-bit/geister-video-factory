// L2b 8.74–11.36: close-up of du smiling in the jar's warm light; a wall calendar flips month after month (from 9.1, "hält länger") while the glow stays on.
import { K, frame, cam, prog, eio, person, f1 } from './lib.js';
import { bedroom } from './base.js';
import { calendar } from './props.js';
import { orb } from './jar.js';
import { nod } from './common.js';
const M = ['JAN', 'FEB', 'MÄR', 'APR', 'MAI', 'JUN', 'JUL'];
export default function renderShot(t) {
  let s = bedroom(t, { light: .9, strong: true });
  const d = prog(t, 9.1, 11.0) * 6, i = Math.min(6, Math.floor(d)), fl = i < 6 && t > 9.1 ? d - i : 0;
  s += calendar(800, 470, 1.15, M[i], i + 1, { flip: fl, prev: i + 1 });
  s += person('du', 440, 2230, 1.75, { t, seed: 1, look: [12, -8], brows: 'calm', mouth: 'smile', eyes: t > 10.4 ? 'happy' : 'n', rim: '#ffc46b', headDy: nod(t, 10.3, 10.9) });
  s += orb(880, 1000, 40, 1, t);
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 8.74, 11.36))));
}
