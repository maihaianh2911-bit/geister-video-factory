// 71.4–73.14: it is a photomontage — stamp FOTOMONTAGE lands; the postcard splits along the pasted seam (elephant cut-out separates)
import { K, DEFS, BG, postcard, stamp, tuffi, grain, f1, prog, eout, eio, lerp } from './lib.js';
import { postcardInner } from './jump.js';
export default function renderShot(t) {
  const sp = eio(prog(t, 72.3, 72.9));
  // cut-out elephant lifts off the card (card centre 540,860 scale 1.15; inner offset -380,-270)
  const ex = 540 + (420 - 380) * 1.15, ey = 860 + (400 - 270) * 1.15;
  const cut = sp > 0 ? `<g transform="translate(${f1(130 * sp)} ${f1(-260 * sp)}) rotate(${f1(-8 * sp)} ${f1(ex)} ${f1(ey)})"><circle cx="${f1(ex)}" cy="${f1(ey - 70)}" r="${f1(110)}" fill="#F7F1E3" stroke="${K.ink}" stroke-width="4" stroke-dasharray="14 10"/>${tuffi(ex, ey, .32 * 1.15, { rot: 25, ear: 1, tr: .7, legs: [-20, -10, 22, 14] })}</g>` : '';
  const hole = sp > 0 ? `<circle cx="${f1(ex)}" cy="${f1(ey - 70)}" r="110" fill="#D8CDB2" opacity="${f1(sp)}"/>` : '';
  return `${DEFS}${BG('#7A5A40')}${postcard(540, 860, 1.15, -4, postcardInner(), 760, 540, 'w33')}${hole}${cut}
    ${stamp(540, 1260, 'FOTOMONTAGE', 92, prog(t, 71.85, 72.15), -8)}${grain(t)}`;
}
