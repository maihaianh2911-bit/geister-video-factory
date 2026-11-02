// L15 71.64–75.6: close-up of du smiling in the warm light; "Dein Leben ist nicht anders": room unchanged; on "mehr davon" (74.46) many small lights appear around him.
import { K, frame, cam, prog, eio, person, hash } from './lib.js';
import { bedroom } from './base.js';
import { orb } from './jar.js';
export default function renderShot(t) {
  let s = bedroom(t, { light: 1, strong: true });
  s += person('du', 540, 2230, 1.75, { t, seed: 1, look: [Math.sin(t * 1.5) * 10, -6], brows: 'calm', mouth: 'smile', eyes: t > 74.5 ? 'happy' : 'n', rim: '#ffc46b', rimL: '#ffc46b' });
  for (let i = 0; i < 12; i++) { const t0 = 74.3 + i * .07, x = 120 + hash(i * 5) * 840, y = 260 + hash(i * 11) * 560; s += orb(x, y + Math.sin(t * 2 + i) * 10, 10 + hash(i) * 8, eio(prog(t, t0, t0 + .3)), t); }
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 71.64, 75.6))));
}
