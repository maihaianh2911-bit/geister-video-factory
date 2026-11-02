// L4a 13.96–16.8: morning. du (with a mug) stands at the window, the sky outside is blue; on "blasser" (15.42) the sky turns visibly paler; meter shows 82 %.
import { frame, cam, prog, eio, person, shadow, mug } from './lib.js';
import { windowView, sill } from './kit.js';
import { fadeWorld, bar } from './base.js';
export default function renderShot(t) {
  let s = windowView(t, { pale: .7 * eio(prog(t, 15.3, 16.2)), sun: .7 }) + sill(t);
  s += fadeWorld(t);
  s += shadow(330, 1660, 170);
  s += person('du', 330, 1660, 1, { t, seed: 1, look: [14, -6], brows: 'calm', mouth: 'small', eyes: 'half', armR: [70, -440], elbowR: [200, -340], front: mug(80, -400, 1.1, '#f2efe8', t) });
  s = cam(s, 540, 950, 1.0 + .05 * eio(prog(t, 13.96, 16.8)), -30 * eio(prog(t, 13.96, 16.8)));
  s += bar(t);
  return frame(s);
}
