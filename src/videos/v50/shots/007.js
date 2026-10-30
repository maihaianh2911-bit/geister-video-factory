// "Die plötzliche Kälte": cross-section; cold waves spread from the ice chunk against the palate.
import { P, prog, eout, mix, punch, bgPlain, profileHead } from './lib.js';
const T0 = 9.26;
export default function renderShot(t) {
  const cold = prog(t, 9.96, 11.2);
  let rings = '';
  for (let k = 0; k < 4; k++) {
    const p = ((t - 9.96 - k * .3) % 1.2) / 1.2;
    if (t > 9.96 + k * .3 && p >= 0) rings += `<circle cx="175" cy="150" r="${30 + 170 * eout(p)}" fill="none" stroke="${P.cold}" stroke-width="${12 * (1 - p)}" opacity="${.9 * (1 - p)}"/>`;
  }
  return punch(t, T0, `${bgPlain('#E4F1FB')}
    <g transform="translate(470 780) scale(1.15)">${profileHead({ id: 's7', skinA: .35, palCol: mix(P.pink, P.ice, cold), extra: rings })}</g>`, .1, 540, 900);
}
