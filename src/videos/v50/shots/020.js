// "obwohl die Ursache im Mund liegt": pain is felt at the forehead, the real cause is ringed in the mouth.
import { P, prog, back, eout, punch, bgPlain, profileHead, painBurst } from './lib.js';
const T0 = 32.70;
export default function renderShot(t) {
  const r = back(prog(t, 33.36, 33.6));
  const m = t > 34.08 ? 1 + .25 * Math.exp(-(t - 34.08) * 4) * Math.abs(Math.sin((t - 34.08) * 10)) : 1;
  const extra = `<circle cx="175" cy="150" r="${80 * r * m}" fill="none" stroke="${P.teal}" stroke-width="14"/>`;
  const pin = r > 0 ? `<g transform="translate(${450 + 175 * 1.2} ${760 + 150 * 1.2 + 120}) scale(${r})"><path d="M 0 -30 l 30 -50 h -60 z" fill="${P.teal}" stroke="${P.ink}" stroke-width="5"/></g>` : '';
  return punch(t, T0, `${bgPlain('#FFF7E0')}
    <g transform="translate(450 760) scale(1.2)">${profileHead({ id: 's20', skinA: .35, extra })}</g>
    ${painBurst(450 + 250 * 1.2, 760 - 200 * 1.2, 56 * (1 + .1 * Math.sin(t * 12)), 1)}`);
}
