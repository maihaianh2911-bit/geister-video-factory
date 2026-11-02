// L0 0–4.08 hook: an argument in the evening kitchen; du's head lights up on "hören"; a thought forms over him on "denkt".
import { K, frame, person, thought, title, cam, prog, eio, eout, pop } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  const hear = eout(prog(t, 1.62, 2.2));
  let s = kitchen(t);
  s += person('du', DU, GY, 1, { t, seed: 1, hear, brows: t < 1.7 ? 'mean' : null, eyes: t > 1.8 ? 'wide' : 'n', mouth: t > 1.8 ? 'o' : 'flat', look: [12, 0], armR: t < 1.6 ? [130, -330 + Math.sin(t * 8) * 10] : null });
  s += person('er', ER, GY, 1, { t, seed: 2, brows: 'mean', mouth: 'flat', look: [-12, 0], armL: [-120, -320 + Math.sin(t * 7 + 1) * 10] });
  s += thought(820, 680, ['...'], ER, 800, { p: pop(t, 3.38, .4), size: 60 });
  s = cam(s, 540, 1000, 1 + .05 * eio(prog(t, 0, 4.08)));
  s += title(['WAS DENKT DEIN', 'PARTNER IM STREIT', ['WIRKLICH?', K.yellow]], 240, 76);
  return frame(s);
}
