// 1.4–2.8: the family sleeps (father, child with bear, mother); clock 03:00 on the nightstand.
import { K, DEFS, FG, cam, prog, eio, blinkAt, head, bear } from './lib.js';
import { bedroom, bedFrame, blanket, clock } from './sets.js';
export default function renderShot(t) {
  const z = 1.08 + .07 * eio(prog(t, 1.4, 2.8));
  const br = k => 5 * Math.sin(t * 2.4 + k);
  const sc = `${bedroom(t)}${bedFrame(t)}
    ${head('v', 330, 890 + br(0), .78, { sleep: 1, tilt: -14, mouth: 'flat' })}
    ${head('m', 750, 885 + br(2), .76, { sleep: 1, tilt: 12, mouth: 'flat' })}
    ${head('k', 545, 930 + br(1), .62, { sleep: 1, tilt: 6, mouth: 'flat' })}
    ${bear(615, 975, .55, 14)}
    ${blanket(975, t, { breath: 6 })}
    ${clock(250, 1250, .9, '03:00', Math.floor(t * 2) % 2 ? .3 : 1)}`;
  return `${DEFS}${cam(sc, z, 540, 900)}${FG(1430)}`;
}
