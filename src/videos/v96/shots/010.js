// L5b 22.2–25.92: closer: du works, the face-down phone sharp in the foreground; on "Trotzdem" (23.7) du glances at it and the sand keeps running ("rieselt" 24.04).
import { K, frame, cam, person, prog, eio, pop } from './lib.js';
import { office2, desk } from './sets.js';
import { duHG, phoneDown } from './base.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  const glance = t >= 23.7 && t < 25.2;
  s += duHG(560, 1900, 1.25, { t, seed: 1, look: glance ? [16, 14] : [-6, 10], brows: glance ? 'worried' : 'calm', mouth: 'flat', legs: false }, { s: .8, dx: -260, dy: -120, glow: t > 23.9 ? .75 : .45 });
  s += desk(t, { y: 1440, monitor: false, kbX: 420, mugX: 120, extra: phoneDown(800, 1490, 1.5, -4) });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 22.2, 25.92)), 0, 0);
  return frame(s);
}
