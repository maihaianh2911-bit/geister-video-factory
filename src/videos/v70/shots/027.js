// 72.78–75.04: the attempt can fail ("scheitern"): in the dark water your hand heaves at the handle, the door stays shut, the hand slips off
import { K, DEFS, BG, foreArm, crossOut, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const heave = Math.sin(Math.PI * prog(t, 72.9, 73.5)) + Math.sin(Math.PI * prog(t, 73.5, 74.0)), slip = eio(prog(t, 74.0, 74.5));
  const hx = 560 + 26 * heave + lerp(0, 260, slip), hy = 760 + lerp(0, 380, slip);
  let bub = '';
  for (let i = 0; i < 10; i++) { const ph = (t * .5 + hash(i + 40)) % 1; bub += `<circle cx="${f1(100 + hash(i * 3 + 40) * 880)}" cy="${f1(1400 - ph * 1300)}" r="${f1(5 + 9 * hash(i * 5))}" fill="none" stroke="${K.foam}" stroke-width="3" opacity="${f1(.45 * (1 - ph))}"/>`; }
  const handle = `<path d="M 420 700 Q 540 650 660 700 L 660 760 Q 540 720 420 760 Z" fill="#3A4248" stroke="${K.ink}" stroke-width="7"/><path d="M ${f1(450 + 18 * heave * (1 - slip))} 712 Q ${f1(540 + 18 * heave * (1 - slip))} 688 ${f1(630 + 18 * heave * (1 - slip))} 712" stroke="#9AA6AE" stroke-width="22" stroke-linecap="round" fill="none"/>`;
  const sc = `${BG('#0A161B')}<path d="M -60 220 L 1140 160 L 1140 1980 L -60 1980 Z" fill="#14232A" stroke="${K.ink}" stroke-width="6"/>
    <path d="M -60 440 Q 540 400 1140 430" stroke="#1E323A" stroke-width="18" fill="none"/>${handle}
    ${foreArm(1200, 1650, hx, hy, K.you, { w: 120 })}
    <rect x="-60" y="-60" width="1200" height="2040" fill="#020406" opacity=".42"/>${bub}${crossOut(540, 720, 230, prog(t, 73.86, 74.2))}`;
  return `${DEFS}${sc}`;
}
