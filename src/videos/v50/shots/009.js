// "Forscher vermuten": the lens finds the blood vessels in the palate; a question mark = assumption.
import { P, prog, back, lerp, eio, punch, bgPlain, lens, vessels, label } from './lib.js';
const T0 = 13.74;
export default function renderShot(t) {
  const sweep = eio(prog(t, T0, 14.5));
  const lx = lerp(380, 520, sweep), ly = lerp(860, 760, sweep);
  const q = back(prog(t, 14.08, 14.35));
  const inner = `<rect x="-400" y="-400" width="800" height="800" fill="#F9C9D3"/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<circle cx="${-300 + i * 90}" cy="${-260 + (i % 3) * 230}" r="${40 + (i % 2) * 20}" fill="#fff" opacity=".25"/>`).join('')}<g transform="translate(${(520 - lx) * .8} ${(760 - ly) * .8})">${vessels(1, .2)}</g>`;
  return punch(t, T0, `${bgPlain('#FDECEF')}
    ${lens(lx, ly, 350, inner, 's9l')}
    <g transform="translate(830 330) scale(${q})">${label(0, 0, '?', 150, { col: P.teal })}</g>`);
}
