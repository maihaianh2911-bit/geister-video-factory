// L14b 69.78–71.64: wide shot of the whole bedroom lit warm orange by the jar ("erhellt" 71.23); du sits on the bed and smiles.
import { K, frame, cam, prog, eio, person, shadow, pool } from './lib.js';
import { bedroom, bed, nightstand } from './base.js';
import { jar } from './jar.js';
export default function renderShot(t) {
  const g = eio(prog(t, 69.9, 71.3));
  let s = bedroom(t, { light: 1 });
  s += pool(800, 1000, 900 + 400 * g, 900 + 400 * g, '#ffb84a', .25 + .2 * g);
  s += bed(1420, { w: 600 });
  s += shadow(340, 1640);
  s += person('du', 340, 1640, 1, { t, seed: 1, look: [14, -4], brows: 'calm', mouth: 'smile', eyes: t > 70.8 ? 'happy' : 'n', rim: '#ffc46b' });
  s += nightstand(t, 840, 1330) + jar(800, 1330, .95, { t, n: 34, glow: 1 });
  return frame(cam(s, 560, 1000, 1.06 - .06 * eio(prog(t, 69.78, 71.64))));
}
