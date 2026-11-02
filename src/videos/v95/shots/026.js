// L18 73.24–74.86: medium sunny bathroom: the roommate in the door smiles on "lächelt" (74.16); du smiles back.
import { K, frame, cam, person, shadow, prog, eio } from './lib.js';
import { bathroom, sinkFg, mirrorFrame } from './sets.js';
import { duSp, GREEN } from './base.js';
export default function renderShot(t) {
  let s = bathroom(t, { mood: 'sun' });
  const sm = t >= 74.16;
  s += shadow(190, 1240, 120) + person('mate', 190, 1240, .72, { t, seed: 4, eyes: sm ? 'happy' : 'n', brows: 'calm', mouth: sm ? 'grin' : 'small', look: [16, 4], armL: [-60, -560], elbowL: [-200, -460] });
  s += duSp(640, 1760, 1.0, { t, eyes: 'n', brows: 'calm', mouth: 'smile', look: [-14, 0] }, { ...GREEN, talk: 0, p: .8 });
  s += sinkFg(t);
  s = cam(s, 540, 1100, 1.06 + .05 * eio(prog(t, 73.24, 74.86)), 20, 0);
  return frame(s + mirrorFrame(true));
}
