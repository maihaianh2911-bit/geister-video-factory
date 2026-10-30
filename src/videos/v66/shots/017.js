// 67.14–70.88: it does not destroy the germs, it slows them down — inside the fridge the germs remain but move and split slowly; KÜHLEN ≠ STERILISIEREN
import { K, DEFS, BG, colony, kcard, cross, milk, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const fake = eout(prog(t, 67.5, 67.9)) * (1 - eout(prog(t, 68.1, 68.4)));
  const slow = eio(prog(t, 69.1, 69.8));
  const sp = lerp(1, .15, slow);
  const tt = 67.14 + (t - 67.14) * sp;
  const n = 10 + Math.round(4 * prog(t, 69.0, 70.8));
  return `${DEFS}${BG('url(#kData)')}
    <rect x="80" y="380" width="920" height="880" rx="40" fill="#CDEBF5" stroke="${K.line}" stroke-width="6"/><rect x="80" y="380" width="920" height="880" rx="40" fill="url(#kGlowC)"/>
    ${milk(240, 1080, 1.4)}<rect x="90" y="1180" width="900" height="14" fill="${K.fridgeD}"/>
    ${colony(600, 820, n, 26, tt, { spread: 260, speed: sp })}
    ${fake > 0 ? cross(600, 820, 200, fake, K.red) + `<path d="M 380 600 L 820 1040" stroke="${K.n0}" stroke-width="0"/>` : ''}
    ${slow > 0 ? `<g transform="translate(860 520) scale(${f1(back(slow))})"><circle r="70" fill="${K.n0}" stroke="${K.cold}" stroke-width="5"/><path d="M 0 -40 V 0 L 26 18" stroke="${K.cold}" stroke-width="9" stroke-linecap="round" fill="none"/></g>` : ''}
    ${kcard(540, 220, 'KÜHLEN ≠ STERILISIEREN', prog(t, 67.3, 67.6), { sz: 56, col: K.cold })}`;
}
