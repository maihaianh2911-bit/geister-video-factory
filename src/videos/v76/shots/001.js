// 0–2.26: cover — du on the wooden table under an oil lamp; surgeon lifts the saw. Headline.
import { K, DEFS, TX, cam, prog, eio, eout } from './lib.js';
import { orScene } from './or.js';
export default function renderShot(t) {
  const lift = 22 * eio(prog(t, .2, .8));
  const up = eio(prog(t, 1.0, 1.9));
  const sc = orScene(t, { lift, face: { look: lift > 10 ? .9 : .3, lookY: -.3, brow: .5 * eout(prog(t, 1.4, 2)), eyes: up > .5 ? 'wide' : 'open', mouth: up > .5 ? 'o' : 'flat' }, saw: 'hand', sawUp: up });
  return `${DEFS}${cam(sc, 1.25, 540, 1000)}${TX('OPERATION', 540, 230, 104, K.white)}${TX('OHNE NARKOSE?', 540, 345, 104, K.orange)}`;
}
