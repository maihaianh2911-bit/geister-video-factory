// L1 5.2–7.84 "Vielleicht willst du es danach lieber gar nicht wissen." du covers the ears, Lena's bubble darkens.
import { K, frame, bg, shadow, person, thought, cam, prog, eio, eout, f1 } from './lib.js';
export default function renderShot(t) {
  const cover = eio(prog(t, 6.3, 6.8));               // hands go to the ears on "lieber gar nicht"
  const z = 1.05 + .07 * eio(prog(t, 5.2, 7.84));
  let s = bg('street', { sc: 1.02 });
  s += shadow(330, 1330) + shadow(750, 1330);
  const handL = [-78 - 26 * cover, -212 - 228 * cover], handR = [78 + 26 * cover, -212 - 228 * cover];
  s += person('du', 330, 1330, 1, { t, seed: 1, hear: .6 + .4 * cover, armL: cover > .02 ? handL : null, armR: cover > .02 ? handR : null, eyes: cover > .5 ? 'closed' : 'wide', mouth: cover > .5 ? 'flat' : 'o', look: [4, -4], brows: cover > .5 ? 'sad' : null });
  s += person('lena', 750, 1330, 1, { t, seed: 2, look: [-10, 0], mouth: 'smile' });
  // the unknown thought fills up and turns dark: something you may not want to hear
  const dk = eio(prog(t, 5.6, 6.6));
  s += thought(820, 660, ['...'], 780, 800, { size: 60 });
  s += `<g opacity="${f1(dk * 85) / 100}"><rect x="${820 - 90}" y="${660 - 54}" width="180" height="108" rx="46" fill="#3a3a3a"/>
    <path d="M ${760} ${660} q 20 -26 40 0 t 40 0 t 40 0" stroke="#d9493f" stroke-width="8" fill="none" stroke-linecap="round"/></g>`;
  s = cam(s, 330, 900, z);
  return frame(s);
}
