// L8 36.3–37.9: close-up du in the stairwell, the battery drops 60→30 % on "Dreißig" (36.38) and turns orange; du's shoulders sag.
import { frame, cam, head, bust, prog, eio, stairwell, battery, duBat, K } from './all.js';
export default function renderShot(t) {
  let s = stairwell(t, { strong: true });
  const b = duBat(t), sag = eio(prog(t, 36.5, 37.2)) * 30;
  s += bust('du', 560, 1090 + sag, 1.7, { t, seed: 1, look: [-6, -14], eyes: 'tired', brows: 'sad', mouth: 'frown' });
  s += battery(560, 500, 1.55, b.lvl, { t, drop: b.drop });
  return frame(cam(s, 540, 900, 1.04 + .05 * eio(prog(t, 36.3, 37.9)), 0, -10 * prog(t, 36.3, 37.9)));
}
