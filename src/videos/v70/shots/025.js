// 66.38–68.66: … to then open the door? — under water your hand closes on the inner door handle and pulls ("Tür … öffnen")
import { K, DEFS, BG, foreArm, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 66.4, 66.94)), pull = eio(prog(t, 67.4, 67.9));
  const hx = lerp(820, 560, reach) + 40 * pull, hy = lerp(1300, 760, reach);
  let bub = '';
  for (let i = 0; i < 12; i++) { const ph = (t * .5 + hash(i)) % 1; bub += `<circle cx="${f1(100 + hash(i * 3) * 880)}" cy="${f1(1400 - ph * 1300)}" r="${f1(5 + 9 * hash(i * 5))}" fill="none" stroke="${K.foam}" stroke-width="3" opacity="${f1(.55 * (1 - ph))}"/>`; }
  const handle = `<path d="M 420 700 Q 540 650 660 700 L 660 760 Q 540 720 420 760 Z" fill="#3A4248" stroke="${K.ink}" stroke-width="7"/><path d="M ${f1(450 + 30 * pull)} 712 Q ${f1(540 + 30 * pull)} 688 ${f1(630 + 30 * pull)} 712" stroke="#9AA6AE" stroke-width="22" stroke-linecap="round" fill="none"/>`;
  const sc = `${BG('#10242C')}<path d="M -60 220 L 1140 160 L 1140 1980 L -60 1980 Z" fill="#1C2E36" stroke="${K.ink}" stroke-width="6"/>
    <path d="M -60 440 Q 540 400 1140 430" stroke="#26404A" stroke-width="18" fill="none"/>${handle}
    ${foreArm(1200, 1650, hx, hy, K.you, { w: 120 })}
    <rect x="-60" y="-60" width="1200" height="2040" fill="#1D4351" opacity=".35"/>${bub}`;
  return `${DEFS}${sc}`;
}
