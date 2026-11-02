// L11b 53.88–55.78: the boss holds out a folder NEUES PROJEKT (54.48), du takes it and smiles; the "Ich verliere meinen Job." cloud dissolves into white mist (54.86–55.7).
import { K, frame, cam, prog, eio, pop, person, shadow, lerp } from './lib.js';
import { office2, desk } from './sets.js';
import { cloud } from './clouds.js';
import { folder } from './props.js';
export default function renderShot(t) {
  let s = office2(t);
  s += `<path d="M -200 0 L 600 0 L 1100 1700 L -200 1700 Z" fill="#fff4c8" opacity=".16"/>`;
  const give = eio(prog(t, 54.0, 54.6)), take = eio(prog(t, 54.9, 55.3)), gone = eio(prog(t, 54.86, 55.7));
  s += cloud(260, 470, 340, { t, seed: 11, dark: .55, lines: ['Ich verliere', 'meinen Job.'], size: 31, gone });
  s += cloud(500, 330, 330, { t, seed: 21, dark: .55, lines: ['Ist sie sauer', 'auf mich?'], size: 30 });
  s += cloud(580, 570, 280, { t, seed: 31, dark: .5, q: true });
  // folder position: boss's hand → between → du's hand
  const fx = lerp(lerp(700, 560, give), 470, take), fy = lerp(lerp(1220, 1120, give), 1130, take);
  s += person('du', 340, 1640, 1, { t, seed: 1, look: [14, 6], brows: take > .5 ? 'up' : 'worried', mouth: take > .5 ? 'grin' : 'small', armR: take > 0 ? [lerp(160, fx - 340 - 60, take), lerp(-330, fy - 1640 + 30, take)] : [160, -330], elbowR: [220, -400] });
  s += shadow(790, 1640, 170);
  s += person('chef', 790, 1640, 1, { t, seed: 9, look: [-14, 6], brows: 'calm', mouth: 'smile', armL: [lerp(-120, fx - 790 + 40, Math.max(give, 0)) , lerp(-380, fy - 1640 + 40, give)], elbowL: [-200, -420] });
  s += folder(fx, fy, .6, ['NEUES', 'PROJEKT'], lerp(6, -4, take));
  s += desk(t, { y: 1330, monitor: false, mugX: 120, kbX: 300 });
  return frame(cam(s, 560, 1000, 1.03 + .05 * eio(prog(t, 53.88, 55.78))));
}
