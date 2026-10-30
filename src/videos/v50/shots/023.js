// "Mediziner nennen das Kältekopfschmerz": a medical chart gets a head-with-frost symbol stamped on.
import { P, prog, back, eout, punch, shake, bgPlain, headIcon, frostCrystal } from './lib.js';
const T0 = 40.64;
export default function renderShot(t) {
  const st = back(prog(t, 41.68, 41.86));
  const [sx, sy] = shake(t, 41.68, 8, 8);
  let lines = '';
  for (let i = 0; i < 5; i++) lines += `<rect x="290" y="${1000 + i * 52}" width="${[480, 420, 500, 360, 440][i] * prog(t, T0 + .1 + i * .06, T0 + .35 + i * .06)}" height="20" rx="10" fill="#C9D6E2"/>`;
  return punch(t, T0, `${bgPlain()}
    <g transform="translate(${sx} ${sy})">
    <rect x="230" y="330" width="620" height="980" rx="30" fill="#8FB8C9" stroke="${P.ink}" stroke-width="8"/>
    <rect x="270" y="400" width="540" height="880" rx="12" fill="#fff" stroke="${P.ink}" stroke-width="6"/>
    <rect x="430" y="300" width="220" height="80" rx="20" fill="#C9D6E2" stroke="${P.ink}" stroke-width="7"/>
    ${lines}
    ${headIcon(540, 710, 1.3, '#C9D6E2')}
    ${st > 0 ? `<g transform="translate(540 690) scale(${st}) rotate(${-8 * st})"><circle cx="0" cy="0" r="210" fill="none" stroke="${P.tealD}" stroke-width="14"/>${headIcon(0, 20, 1.3, P.tealD)}${frostCrystal(0, -20, 60, 0, P.cold)}</g>` : ''}
    </g>`);
}
