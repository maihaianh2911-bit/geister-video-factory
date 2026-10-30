// 7.26–10.6: in the back — both children in their child seats scream with fear ("schreien"); water already outside the windows
import { K, DEFS, interior, cam, f1, prog, eout } from './lib.js';
export default function renderShot(t) {
  const sc = prog(t, 8.0, 8.3) > 0;
  const wl = .32 + .04 * prog(t, 7.26, 10.6);
  const A = sc ? { look: .4, brow: 1, mouth: 'scream', t, tears: eout(prog(t, 8.6, 9.2)), squeeze: t > 8.9 && t < 9.6, aR: [[500, 900], [530, 760 + 10 * Math.sin(t * 16)]], aL: [[300, 900], [270, 760 + 10 * Math.sin(t * 16 + 1)]] } : { look: .4, brow: .8, mouth: 'o', wide: 1 };
  const B = sc ? { look: -.4, brow: 1, mouth: 'scream', t: t + .3, tears: eout(prog(t, 8.9, 9.4)) } : { look: -.4, brow: .8, mouth: 'o', wide: 1 };
  const inner = interior(t, { noFront: true, water: wl, rearWater: .15, poses: { kidA: A, kidB: B } });
  return `${DEFS}${cam(inner, 1.3 + .05 * prog(t, 7.26, 10.6), 540, 760, 0, 120)}`;
}
