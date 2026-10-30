// "sticht es mitten in der Stirn": icy stab hits the forehead centre, pulses on "Stirn".
import { P, prog, eout, back, punch, shake, bgPlain, head, painBurst, frostCrystal } from './lib.js';
const T0 = 6.10;
export default function renderShot(t) {
  const stab = prog(t, 6.22, 6.4);
  const [sx, sy] = shake(t, 6.22, 18, 6);
  const pulse = t > 7.02 ? 1 + .35 * Math.exp(-(t - 7.02) * 4) * Math.abs(Math.sin((t - 7.02) * 12)) : 1;
  const fx = 540, fy = 860 - 78 * 2.1;
  let cracks = '';
  if (stab > 0) [[-1, -.4], [1, -.5], [-1, .5], [1, .4], [0, -1]].forEach(([a, b], i) => {
    const L = 170 * eout(stab);
    cracks += `<path d="M ${fx} ${fy} l ${a * L * .5} ${b * L * .4} l ${a * L * .2} ${b * L * .5 - 18} l ${a * L * .4} ${b * L * .3}" stroke="${P.cold}" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  });
  return punch(t, T0, `${bgPlain('#E4F1FB')}
    <g transform="translate(${540 + sx} ${860 + sy}) scale(2.1)">${head({ id: 's5', eyes: t < 6.22 ? 'happy' : 'wide', mouth: t < 6.22 ? 'chew' : 'o', brow: t < 6.22 ? 0 : .8, cheek: t < 6.22 ? .8 : 0, blush: .5 })}</g>
    <g transform="translate(${sx} ${sy})">${cracks}${painBurst(fx, fy, 80 * back(stab) * pulse, stab, P.red)}${frostCrystal(fx, fy, 120 * eout(stab), 10, '#fff')}</g>`);
}
