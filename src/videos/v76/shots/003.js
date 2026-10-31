// 2.95–5.275: there was no reliable anaesthetic — an empty dashed bottle labelled NARKOSE is crossed out ("Narkose" 3.77).
import { K, DEFS, BG, TX, crossOut, prog, eio, eout, f1 } from './lib.js';
export default function renderShot(t) {
  const draw = eio(prog(t, 2.95, 3.4)), lbl = eout(prog(t, 3.3, 3.65)), x = eout(prog(t, 3.77, 4.2));
  const L = 1900;
  const bottle = `<path d="M 470 520 H 610 V 600 Q 760 650 760 800 V 1180 Q 760 1240 700 1240 H 380 Q 320 1240 320 1180 V 800 Q 320 650 470 600 Z" fill="none" stroke="${K.cyan}" stroke-width="10" stroke-dasharray="34 22" stroke-linejoin="round" opacity=".95" style="stroke-dashoffset:${f1(L * (1 - draw))}"/>
    <rect x="450" y="470" width="180" height="60" rx="12" fill="none" stroke="${K.cyan}" stroke-width="8" stroke-dasharray="20 14" opacity="${f1(draw)}"/>`;
  const label = lbl > 0 ? `<g opacity="${f1(lbl)}"><rect x="300" y="830" width="480" height="150" rx="14" fill="${K.paper}" stroke="${K.ink}" stroke-width="5"/>${TX('NARKOSE', 540, 932, 84, K.ink)}</g>` : '';
  return `${DEFS}${BG()}<ellipse cx="540" cy="880" rx="520" ry="520" fill="url(#nCyan)" opacity=".35"/>${bottle}${label}${crossOut(540, 880, 380, x)}`;
}
