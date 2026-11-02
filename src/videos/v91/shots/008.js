// L7 27.1–28.7 close-up: to du's surprise the boss only nods on "nickt" — du's eyes go wide.
import { K, frame, bg, shadow, person, wallClock, cam, prog, eio } from './lib.js';
export default function renderShot(t) {
  let s = bg('boss', { sc: 1.15, dx: 40 });
  s += shadow(330, 1500, 120) + shadow(780, 1500, 120);
  const nod = t > 28.0 ? Math.sin((t - 28.0) * 14) * 16 * Math.max(0, 1 - (t - 28.0) / .7) : 0;
  s += person('chef', 790, 1500, 1.2, { t, seed: 4, eyes: 'closed', noBlink: true, mouth: 'flat', headDy: Math.abs(nod), headTilt: 0, look: [-8, 0], armL: [-40, -240], armR: [40, -240] });
  const sur = eio(prog(t, 27.4, 27.7));
  s += person('du', 300, 1500, 1.2, { t, seed: 1, eyes: sur > .5 ? 'wide' : 'n', brows: sur > .5 ? 'up' : 'sad', mouth: sur > .5 ? 'o' : 'flat', look: [14, -4], headDy: -10 * sur });
  return frame(cam(s, 540, 950, 1 + .04 * eio(prog(t, 27.1, 28.7))));
}
