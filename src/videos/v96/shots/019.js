// L11b 52.56–54.84: close-up: du looks up ("schaust auf" 52.68), blank eyes; a faded empty bubble hangs where the question was ("weißt nicht" 53.46).
import { K, frame, cam, prog, eio, pop, thought, fade } from './lib.js';
import { dining } from './sets.js';
import { duHG, holdPhone, screenGlow } from './base.js';
export default function renderShot(t) {
  let s = dining(t, { strong: true });
  const up = eio(prog(t, 52.6, 52.9));
  s += duHG(560, 2160, 1.7, { t, seed: 1, look: [-14 * up, 16 - 26 * up], eyes: up > .5 ? 'blank' : 'n', brows: up > .5 ? 'up' : 'calm', mouth: up > .5 ? 'small' : 'flat', headTilt: -5 * up, armL: [-150, -330], front: screenGlow(-150, -480, 160, .4) + holdPhone(-150, -420, 8, { scroll: t * 35, s: 1 }) }, { s: .5, dx: 230, dy: -40 });
  s += thought(300, 330, ['?'], 420, 560, { p: pop(t, 53.5, .4), size: 80 });
  return frame(cam(s, 540, 900, 1.0 + .04 * eio(prog(t, 52.56, 54.84)) + .06 * eio(prog(t, 52.68, 52.98))));
}
