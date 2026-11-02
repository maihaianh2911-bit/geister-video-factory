// L6b 26.88–28.34: close-up of the traffic light: the red lamp is lit but almost as grey as the stones (pale red, weak glow); on "Rot" (27.08) a dashed ring circles it; du's head in the lower left looks up at it with wide eyes.
import { K, frame, cam, prog, eio, head, f1 } from './lib.js';
import { crossing, trafficLight } from './kit.js';
import { fadeWorld, bar } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = crossing(t, { strong: true });
  s += fadeWorld(t, .9);
  s += trafficLight(640, 1080, 1.9, { pale: .68 });
  const r = eio(prog(t, 27.08, 27.6));
  if (r > 0) s += `<circle cx="640" cy="605" r="${f1(110 + 30 * (1 - r))}" fill="none" stroke="#ffd23f" stroke-width="12" stroke-dasharray="30 18" opacity="${r.toFixed(2)}" transform="rotate(${f1(t * 40)} 640 605)"/>`;
  s += `<path d="M 40 1500 C 40 1300 420 1300 420 1500 L 440 1960 H 20 Z" fill="${K.du}" stroke="${INK}" stroke-width="7"/>` + head('du', 230, 1170, 1.25, { t, seed: 1, look: [14, -14], eyes: 'wide', brows: 'up', mouth: 'o' });
  s = cam(s, 540, 900, 1.0 + .07 * eio(prog(t, 26.88, 28.34)));
  s += bar(t);
  return frame(s);
}
