// L15 58.92–63.16: DIENSTAG. Morning window again; du turns to the window, and on "grün" (60.36) the colour rushes back: trees bright green, sky blue (overlay falls to 0); du's eyes go wide, mouth open in surprise; meter fills to 100 %.
import { frame, cam, prog, eio, person, shadow, mug, dayCard } from './lib.js';
import { windowView, sill } from './kit.js';
import { fadeWorld, bar } from './base.js';
export default function renderShot(t) {
  let s = windowView(t, { pale: 0, sun: .5 + .5 * eio(prog(t, 60.2, 61.0)) }) + sill(t);
  s += fadeWorld(t);
  const w = eio(prog(t, 60.3, 60.7));
  s += shadow(330, 1660, 170);
  s += person('du', 330, 1660, 1, { t, seed: 1, look: [14 * eio(prog(t, 59.2, 59.8)) , -8], eyes: w > .5 ? 'wide' : 'n', brows: w > .5 ? 'up' : 'calm', mouth: w > .5 ? 'o' : 'small', armR: [70, -440], elbowR: [200, -340], front: mug(80, -400, 1.1, '#f2efe8', t), headDy: -10 * w });
  s = cam(s, 540, 950, 1.0 + .08 * eio(prog(t, 58.92, 63.16)), 30 * eio(prog(t, 60.3, 63.16)));
  s += dayCard(t, 58.94, 'DIENSTAG', { y: 330 });
  s += bar(t);
  return frame(s);
}
