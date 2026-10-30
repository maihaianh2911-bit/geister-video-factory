// 76.46–79.86: 39 more years in the ring — Tuffi in the circus ring under a spotlight, raising her trunk; counter 39 JAHRE
import { K, DEFS, BG, tuffi, card, HL, grain, f1, prog, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const n = Math.round(39 * eout(prog(t, 77.2, 78.0)));
  const up = back(prog(t, 76.6, 77.2));
  return `${DEFS}${BG('#2E2621')}<path d="M 540 -60 L 120 1400 L 960 1400 Z" fill="url(#wSpot)" opacity=".55"/>
    <ellipse cx="540" cy="1330" rx="520" ry="120" fill="#B98F6E" stroke="${K.ink}" stroke-width="6"/><ellipse cx="540" cy="1330" rx="460" ry="95" fill="#D8C08A"/>
    <path d="M 20 1330 Q 540 1480 1060 1330" fill="none" stroke="${K.red}" stroke-width="28"/>
    <rect x="380" y="1200" width="320" height="110" rx="10" fill="${K.red}" stroke="${K.ink}" stroke-width="6"/><path d="M 380 1225 H 700" stroke="#C9A24A" stroke-width="10"/>
    ${tuffi(540, 1205, 1.0, { tr: up, ear: .4, legs: [-10 * up, 0, 0, 0] })}
    <g opacity="${f1(prog(t, 77.1, 77.3))}"><rect x="290" y="300" width="500" height="150" fill="${K.paperL}" stroke="${K.ink}" stroke-width="6"/>${HL(`${n} JAHRE`, 540, 405, 96, K.red, 0)}</g>${grain(t)}`;
}
