// "kleinere Bissen": the spoon takes only a small piece from the top scoop.
import { P, prog, eio, back, lerp, punch, bgPlain, cone, label } from './lib.js';
import { spoon } from './035.js';
const T0 = 66.10;
export default function renderShot(t) {
  const dip = eio(prog(t, 66.5, 66.8)), lift = eio(prog(t, 66.9, 67.4));
  const x = lerp(lerp(900, 640, dip), 860, lift), y = lerp(lerp(500, 600, dip), 520, lift);
  const bit = t > 66.85 ? `<ellipse cx="0" cy="-170" rx="18" ry="14" fill="${P.straw}" stroke="${P.ink}" stroke-width="4"/>` : '';
  return punch(t, T0, `${bgPlain('#FFF3E8')}
    <g transform="translate(520 1020) scale(2.2)">${cone(1, { id: 's36c', bite: t > 66.85 ? .35 : 0 })}</g>
    <g transform="translate(${x} ${y}) scale(1.4) rotate(-20)">${spoon.replace('</g>', bit + '</g>')}</g>
    ${t >= 66.16 ? label(540, 250, 'KLEINE BISSEN', 92, { s: back(prog(t, 66.16, 66.36)) }) : ''}`);
}
