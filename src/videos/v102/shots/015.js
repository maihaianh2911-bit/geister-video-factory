// L8 32.14–35.2: research. A sleep lab at night (beds with monitors, blurred); two researchers in white coats (glasses / curly hair), one with a clipboard; big card PENNSYLVANIA on "Pennsylvania" (33.52); on "überprüft" (34.02) a green check is ticked on the clipboard. The FARBE meter fades out (study section).
import { K, frame, cam, prog, eio, pop, person, shadow, label, paper, check, fout } from './lib.js';
import { lab } from './kit.js';
import { bar } from './base.js';
export default function renderShot(t) {
  let s = lab(t);
  s += shadow(330, 1640, 170) + shadow(770, 1640, 170);
  const ck = eio(prog(t, 34.02, 34.5));
  s += person('res2', 330, 1640, .95, { t, seed: 6, look: [12, 6], brows: 'calm', mouth: 'flat', armR: [150, -420], elbowR: [210, -330], front: paper(130, -400, 180, 230, -6, check(0, 0, 1.6, K.green, ck), { lines: false }) });
  s += person('doc2', 770, 1640, .95, { t, seed: 8, look: [-12, 4], brows: 'up', mouth: 'small', armL: [-150, -620], elbowL: [-230, -470] });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 32.14, 35.2)));
  s += label('PENNSYLVANIA', 540, 340, 100, { p: pop(t, 33.5, .45), fill: '#fff' });
  s += bar(t, fout(t, 32.14, .5));
  return frame(s);
}
