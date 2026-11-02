// L6 31.66–33.92: a university courtyard in London (clock tower behind); two researchers with clipboards measure; label LONDON on "London" (32.24);
// one of them ticks a list on "gemessen" (33.3).
import { K, frame, cam, prog, eio, pop, label, person, shadow, paper, check } from './lib.js';
import { campus } from './sets.js';
export default function renderShot(t) {
  let s = campus(t, { brick: true });
  const ck = eio(prog(t, 33.3, 33.7));
  s += shadow(330, 1680, 190) + person('res1', 330, 1680, .98, { t, seed: 3, look: [14, 6], brows: 'calm', mouth: 'small', armR: [150, -400], elbowR: [190, -320], front: paper(150, -440, 150, 190, -8, check(150, -440, 1, K.green, ck)) });
  s += shadow(720, 1690, 190) + person('res2', 720, 1690, .98, { t, seed: 4, look: [-12, 4], brows: 'calm', mouth: 'smile', armL: [-150, -400], elbowL: [-190, -320], front: paper(-150, -440, 150, 190, 8, '') });
  s = cam(s, 540, 1100, 1.0 + .06 * eio(prog(t, 31.66, 33.92)));
  s += label('LONDON', 540, 250, 120, { p: pop(t, 32.24, .45) });
  return frame(s);
}
