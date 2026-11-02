// L8 36.3–37.9: close-up du in the stairwell, the battery drops 60→30 % on "Dreißig" (36.38) and turns orange; du's shoulders sag.
import { frame, cam, head, prog, eio, stairwell, battery, duBat, K } from './all.js';
export default function renderShot(t) {
  let s = stairwell(t, { strong: true });
  const b = duBat(t), sag = eio(prog(t, 36.5, 37.2)) * 30;
  s += head('du', 560, 1260 + sag, 1.7, { t, seed: 1, look: [-6, -14], eyes: 'tired', brows: 'sad', mouth: 'frown' });
  s += `<path d="M 160 1960 C 180 1660 350 ${1560 + sag} 560 ${1560 + sag} C 770 ${1560 + sag} 940 1660 960 1960 Z" fill="${K.du}" stroke="${K.ink}" stroke-width="6"/>`;
  s += battery(560, 590, 1.55, b.lvl, { t, drop: b.drop });
  return frame(cam(s, 540, 900, 1.04 + .05 * eio(prog(t, 36.3, 37.9)), 0, -10 * prog(t, 36.3, 37.9)));
}
