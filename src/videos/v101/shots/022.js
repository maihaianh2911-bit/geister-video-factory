// L12a 53.78–57.18: label MARTIN SELIGMAN; the psychologist (glasses, dark jacket) in the lecture hall raises his hand and nods.
import { K, frame, cam, prog, eio, pop, label, person, shadow, lerp } from './lib.js';
import { hall } from './sets.js';
import { nod } from './common.js';
export default function renderShot(t) {
  let s = hall(t);
  const up = eio(prog(t, 55.3, 55.8));
  s += shadow(420, 1640);
  s += person('sel', 420, 1640, 1, { t, seed: 4, look: [10, 0], brows: 'calm', mouth: t > 54.5 && t < 56.8 && Math.sin(t * 14) > 0 ? 'talk' : 'smile', armR: [lerp(190, 250, up), -420 - 520 * up], elbowR: [lerp(250, 300, up), -500 - 190 * up], headDy: nod(t, 56.2, 56.8) });
  s = cam(s, 500, 1000, 1.0 + .06 * eio(prog(t, 53.78, 57.18)));
  s += label('MARTIN', 540, 230, 100, { p: pop(t, 55.2, .45) }) + label('SELIGMAN', 540, 350, 100, { p: pop(t, 55.6, .45) });
  return frame(s);
}
