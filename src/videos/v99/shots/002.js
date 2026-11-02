// L1b 2.8–4.68: close-up of du looking up; the dark cloud hovers right above his head ("über deinem Kopf" 3.3) and bobs ("schweben" 3.54); his eyes follow it.
import { K, frame, cam, prog, eio, person } from './lib.js';
import { room } from './sets.js';
import { cloud, gloom } from './clouds.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 19, mm: 10, strong: true });
  s += gloom(540, 900, 520, 560, .45, 'b');
  const sway = Math.sin(t * 1.6) * 30;
  s += person('du', 540, 2230, 1.75, { t, seed: 1, look: [sway / 4, -14], brows: 'worried', mouth: 'frown', eyes: 'wide' });
  s += cloud(540 + sway, 470 - 20 * eio(prog(t, 3.3, 3.9)), 560, { t, seed: 2, dark: .9 });
  return frame(cam(s, 540, 800, 1.0 + .06 * eio(prog(t, 2.8, 4.68))));
}
