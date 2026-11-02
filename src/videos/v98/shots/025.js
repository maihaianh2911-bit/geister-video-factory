// L17 69.92–72.1: close-up du listening in warm light, soft smile ("Du musst nicht aufhören" 70.06); warm glow grows on the face.
import { K, frame, cam, prog, eio, person, pool } from './lib.js';
import { room } from './sets.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 5, strong: true });
  s += pool(700, 900, 520, 560, '#ffb35a', .3 + .2 * prog(t, 69.92, 72.1));
  s += person('du', 540, 2160, 1.7, { t, seed: 1, look: [12, -4], brows: 'calm', mouth: 'smile', headTilt: 6, rim: '#ffcf7a' });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 69.92, 72.1))));
}
