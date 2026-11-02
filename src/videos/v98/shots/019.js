// L13a 50.62–53.72: close-up: someone talking about himself (green top, no accessory — a new, generic speaker); a golden "reward" star lights up inside his head on "Belohnung" (52.84).
import { K, frame, cam, prog, eio, pop, person, f1, op, pool } from './lib.js';
import { cafe } from './sets.js';
const INK = K.ink;
function star(x, y, r, a) { let d = ''; for (let i = 0; i < 10; i++) { const ang = -Math.PI / 2 + i * Math.PI / 5, rr = i % 2 ? r * .45 : r; d += (i ? 'L' : 'M') + f1(x + Math.cos(ang) * rr) + ' ' + f1(y + Math.sin(ang) * rr) + ' '; } return `<path d="${d}Z" fill="#ffd23f" stroke="#fff" stroke-width="5" opacity="${op(a)}"/>`; }
export default function renderShot(t) {
  let s = cafe(t, { strong: true });
  const talk = Math.sin(t * 15) > 0;
  s += person('stu2', 540, 2160, 1.7, { t, seed: 2, look: [-8, -6], brows: 'up', mouth: talk ? 'talk' : 'grin' });
  const a = pop(t, 52.7, .45);
  if (a > 0) s += pool(620, 830, 200, 200, '#ffd23f', .55 * Math.min(1, a)) + star(620, 830, 70 * Math.min(1.2, a), Math.min(1, a));
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 50.62, 53.72))));
}
