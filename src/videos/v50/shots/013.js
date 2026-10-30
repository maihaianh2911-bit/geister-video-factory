// "Aber das Eis ist in deinem Mund": a ring marks the ice chunk in the open mouth.
import { P, prog, back, eout, punch, bgPlain, head } from './lib.js';
const T0 = 20.16;
export default function renderShot(t) {
  const r = back(prog(t, 20.5, 20.8));
  const pulse = 1 + .15 * Math.exp(-Math.max(0, t - 21.6) * 5) * (t > 21.6 ? 1 : 0);
  const S = 1.9, cx = 540, cy = 720, my = cy + 104 * S;
  const ice = `<path d="M -34 112 q 0 -22 34 -22 q 34 0 34 22 q -16 14 -34 12 q -18 2 -34 -12 z" fill="#FFD1DC" stroke="${P.ink}" stroke-width="4"/><path d="M -16 100 q 10 -6 22 -4" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  return punch(t, T0, `${bgPlain('#FFF3E8')}
    <g transform="translate(${cx} ${cy}) scale(${S})">${head({ id: 's13', mouth: 'open', eyes: 'open', lookY: 14, brow: .3 })}${ice}</g>
    <circle cx="${cx}" cy="${my}" r="${130 * r * pulse}" fill="none" stroke="${P.teal}" stroke-width="14"/>
    <path d="M ${cx - 420} ${my + 160} Q ${cx - 300} ${my + 20} ${cx - 150} ${my + 10}" stroke="${P.teal}" stroke-width="12" fill="none" stroke-linecap="round" stroke-dasharray="420" stroke-dashoffset="${420 * (1 - eout(prog(t, 20.6, 20.9)))}"/>`);
}
