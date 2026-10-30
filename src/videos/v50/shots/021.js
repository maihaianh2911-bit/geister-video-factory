// "bei eiskalten Getränken": an iced drink lands on the counter and frosts over.
import { P, prog, back, eout, punch, shake, parlour, glass } from './lib.js';
const T0 = 35.36;
export default function renderShot(t) {
  const drop = eout(prog(t, T0, T0 + .22));
  const [sx, sy] = shake(t, T0 + .22, 10, 8);
  const frost = prog(t, 36.54, 37.2);
  const y = 520 - 700 * (1 - drop);
  return punch(t, T0, `${parlour(t, { blur: true })}
    <g transform="translate(${sx} ${sy})"><ellipse cx="540" cy="${1090}" rx="210" ry="28" fill="#000" opacity="${.15 * drop}"/>
    <path d="M 610 ${y - 60} L 700 ${y - 300}" stroke="${P.ink}" stroke-width="34" stroke-linecap="round"/><path d="M 610 ${y - 60} L 700 ${y - 300}" stroke="${P.teal}" stroke-width="22" stroke-linecap="round"/>
    <g transform="translate(540 ${y}) scale(1.5)">${glass({ id: 's21g', frost })}</g></g>`);
}
