// "Das löst das Schmerzsignal aus": a pain signal fires at the palate.
import { P, prog, eout, back, punch, shake, bgPlain, profileHead, spark } from './lib.js';
const T0 = 18.40;
export default function renderShot(t) {
  const f = prog(t, 19.0, 19.15);
  const [sx, sy] = shake(t, 19.0, 10, 7);
  let burst = '';
  if (t > 19.0) for (let i = 0; i < 8; i++) {
    const p = prog(t, 19.0, 19.5), an = i / 8 * Math.PI * 2;
    burst += `<path d="M ${175 + Math.cos(an) * (40 + 60 * p)} ${125 + Math.sin(an) * (40 + 60 * p)} l ${Math.cos(an) * 40 * (1 - p)} ${Math.sin(an) * 40 * (1 - p)}" stroke="${P.nerve}" stroke-width="10" stroke-linecap="round"/>`;
  }
  const bolt = f > 0 ? `<g transform="translate(175 30) scale(${back(f)})"><path d="M 10 -60 L -22 6 L 4 6 L -12 60 L 28 -14 L 2 -14 L 18 -60 Z" fill="${P.nerve}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/></g>` : '';
  const flicker = t < 19 ? .5 + .5 * Math.sin(t * 20) : 1;
  return punch(t, T0, `${bgPlain('#FDECEF')}
    <g transform="translate(${430 + sx} ${700 + sy}) scale(1.3)">${profileHead({ id: 's12', skinA: .3, palCol: P.red, extra: `<path d="M 40 140 C 70 90 160 82 262 145" stroke="${P.red}" stroke-width="16" fill="none" opacity="${.5 * flicker}"/>${t >= 19 ? spark(175, 125, 18 + 8 * (1 - eout(prog(t, 19, 19.4)))) : ''}${burst}${bolt}` })}</g>`);
}
