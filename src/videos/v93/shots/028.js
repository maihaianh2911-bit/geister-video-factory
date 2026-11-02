// L18b 76.1–79.164 Close-up du in warm sunlight looking at the tired passenger (right edge): the face softens into a small smile.
// Over the passenger a dashed (imagined) bubble shows a heavy weight on "trägt" (76.26); end title „Was trägt dieser Mensch gerade mit sich herum?“.
import { K, frame, cam, setTrain, person, thought, icon, T, pop, prog, fade } from './lib.js';
import { push, CU } from './base.js';
export default function renderShot(t) {
  let s = setTrain(t, { morning: true, heavy: true });
  s += person('p4', 960, 1900, 2.0, { t, seed: 21, eyes: 'tired', brows: 'sad', mouth: 'flat', look: [-6, 6] });
  s += person('du', 380, CU.y, CU.s, { t, seed: 2, brows: 'soft', mouth: t > 76.9 ? 'smile' : 'soft', look: [9, -2], rim: '#ffcf7a' });
  s += thought(820, 560, [''], 930, 900, { p: pop(t, 76.26, .45), w: 260, h: 200, dashed: true, inner: icon.weight(820, 560, 2.0) });
  const e = fade(t, 77.68, .4);
  let txt = e > 0 ? T(540, 250, 'WAS TRÄGT DIESER', 66, { fill: '#fff', stroke: K.ink, sw: 14, op: e }) + T(540, 330, 'MENSCH GERADE?', 66, { fill: K.yellow, stroke: K.ink, sw: 14, op: e }) : '';
  return frame(cam(s, 540, 950, push(t, 76.1, 79.164, 1.0, 1.08)) + txt, { tint: ['#f4b45c', .08] });
}
