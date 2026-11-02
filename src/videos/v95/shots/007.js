// L3 14.70–17.96: medium bathroom: the roommate (curly hair, mustard sweater) appears in the door behind du and stops, staring (16.68).
import { K, frame, cam, person, shadow, prog, eio, lerp } from './lib.js';
import { bathroom, sinkFg, mirrorFrame } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = bathroom(t, { mood: 'grey' });
  const walk = eio(prog(t, 14.8, 15.6)), stare = t >= 16.68;
  const mx = lerp(-120, 230, walk);
  s += shadow(mx, 1240, 120) + person('mate', mx, 1240, .72, { t, seed: 4, walk: walk < 1 ? (t - 14.8) * 1.6 : undefined, eyes: stare ? 'wide' : 'n', brows: stare ? 'up' : 'calm', mouth: stare ? 'o' : 'small', look: [16, 4], armL: stare ? [-120, -720] : null, elbowL: [-200, -560] });
  s += duSp(640, 1760, 1.0, { t, eyes: 'tired', brows: 'sad', mouth: 'frown', look: [-6, 8] }, { talk: t < 15.6 ? 1 : 0 });
  s += sinkFg(t);
  s = cam(s, 540, 1100, 1.02 + .06 * eio(prog(t, 14.7, 17.96)), -20 * prog(t, 14.7, 17.96), 0);
  s += mirrorFrame(false);
  return frame(s);
}
