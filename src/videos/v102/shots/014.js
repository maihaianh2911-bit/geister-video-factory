// L7 28.34–32.14: du stands next to his bike at the grey crossing, shrugs it off with a thumbs-up and a confident smile; speech bubble "Ich bin daran gewöhnt." (29.34), then "Sechs Stunden reichen mir." (30.66). World ~80 % grey.
import { K, frame, cam, prog, eio, person, shadow, speech, pop } from './lib.js';
import { crossing, bike, trafficLight } from './kit.js';
import { fadeWorld, bar } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = crossing(t) + trafficLight(900, 760, .9, { pale: .82 });
  s += bike(700, 1530, .9, 0);
  s += fadeWorld(t);
  s += shadow(380, 1650, 170);
  const th = eio(prog(t, 29.2, 29.6));
  const hand = [180, -560 - 80 * th];
  const thumb = th > .5 ? `<rect x="${hand[0] - 9}" y="${hand[1] - 52}" width="18" height="40" rx="9" fill="${INK}"/>` : '';
  s += person('du', 380, 1650, 1, { t, seed: 1, look: [6, -4], eyes: t > 30.6 ? 'happy' : 'n', brows: 'calm', mouth: 'smile', armR: hand, elbowR: [250, -420], front: thumb, headTilt: 4 * Math.sin(t * 1.5) });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 28.34, 32.14)), 30 - 30 * eio(prog(t, 28.34, 32.14)));
  const a = pop(t, 29.3, .4) * (t < 30.55 ? 1 : 0), b = pop(t, 30.6, .4);
  if (a > 0) s += speech(560, 520, ['Ich bin daran', 'gewöhnt.'], 420, 780, { p: a, size: 54 });
  if (b > 0) s += speech(560, 520, ['Sechs Stunden', 'reichen mir.'], 420, 780, { p: b, size: 54 });
  s += bar(t);
  return frame(s);
}
