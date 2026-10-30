// 79.86–82.0: a milk brand was named after her — a milk bottle with a TUFFI label is set down
import { K, DEFS, BG, tuffi, TX, grain, f1, prog, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const d = eout(prog(t, 79.9, 80.3));
  const lab = back(prog(t, 80.1, 80.4));
  return `${DEFS}${BG()}<rect x="-60" y="1250" width="1200" height="800" fill="#B5A88E"/><path d="M -60 1250 H 1140" stroke="${K.ink}" stroke-width="6"/>
    <g transform="translate(540 ${f1(lerp(-400, 0, d))})">
      <path d="M 450 1250 L 450 760 Q 450 640 500 590 L 500 470 L 580 470 L 580 590 Q 630 640 630 760 L 630 1250 Z" transform="translate(-540 0) scale(1) " fill="#F8F6EE" stroke="${K.ink}" stroke-width="7"/>
      <rect x="-48" y="440" width="96" height="40" rx="6" fill="${K.red}" stroke="${K.ink}" stroke-width="5"/>
      <g transform="scale(${f1(lab)})" ><rect x="-90" y="830" width="180" height="260" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5"/>
      ${tuffi(-10, 990, .24, { tr: .6, ear: .3 })}${TX('TUFFI', 0, 1060, 46, K.red)}</g></g>${grain(t)}`;
}
