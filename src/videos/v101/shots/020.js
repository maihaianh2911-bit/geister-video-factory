// L10b 49.2–51.56: long ago, at night on the savanna: an early human (round black head, fur tunic) by the bushes; two glowing eyes appear in the bush (49.9) and he jumps back ("Gefahren" 50.45); a red alert ring flashes around the brain icon.
import { K, frame, cam, prog, eio, pop, label, person, shadow, f1, op, lerp } from './lib.js';
import { savanna } from './sets2.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = savanna(t);
  const eyes = eio(prog(t, 49.8, 50.1)), jump = eio(prog(t, 50.3, 50.6)), x = lerp(520, 330, jump);
  // eyes in the bush right
  s += `<g opacity="${op(eyes)}"><ellipse cx="880" cy="930" rx="22" ry="14" fill="#ffe04a"/><ellipse cx="950" cy="930" rx="22" ry="14" fill="#ffe04a"/><ellipse cx="880" cy="930" rx="6" ry="12" fill="${INK}"/><ellipse cx="950" cy="930" rx="6" ry="12" fill="${INK}"/></g>`;
  s += shadow(x, 1640);
  s += person('cave', x, 1640 - 60 * Math.sin(jump * Math.PI), 1, { t, seed: 3, look: eyes > .5 ? [16, -4] : [0, 4], brows: jump > .2 ? 'worried' : 'calm', mouth: jump > .2 ? 'o' : 'flat', eyes: jump > .2 ? 'wide' : 'n', lean: -8 * jump, armR: jump > .2 ? [200, -640] : [150, -300], elbowR: [240, -520] });
  if (t > 50.4) { const r = ((t - 50.4) * 1.6) % 1; s += `<circle cx="${f1(x)}" cy="1000" r="${f1(200 + r * 200)}" fill="none" stroke="#d9493f" stroke-width="10" opacity="${op(1 - r)}"/>`; }
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 49.2, 51.56)));
  s += label('FRÜHER', 540, 250, 110, { p: pop(t, 49.25, .45), fill: '#ffffff' });
  return frame(s);
}
