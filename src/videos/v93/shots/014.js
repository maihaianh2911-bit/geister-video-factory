// L9a 35.06–36.3 Close-up du in the queue: rolls the eyes on "verdrehst die Augen" (pupils up, lids half down), sighs.
import { K, frame, cam, setMarket, person, lerp, prog, eio } from './lib.js';
import { push, CU } from './base.js';
export default function renderShot(t) {
  let s = setMarket(t, { heavy: true });
  const r = eio(prog(t, 35.1, 35.45)) * (1 - eio(prog(t, 35.95, 36.25)));
  s += person('du', 540, CU.y, CU.s, { t, seed: 2, noBlink: true, eyes: 'half', look: [lerp(-6, 4, r), lerp(4, -10, r)], brows: r > .5 ? 'up' : 'flat', mouth: 'grim', headTilt: 6 * r, rim: '#ffffff' });
  return frame(cam(s, 540, 900, push(t, 35.06, 36.3, 1.0, 1.12)));
}
