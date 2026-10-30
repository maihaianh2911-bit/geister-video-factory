// 0–3.94: cover — the night globe's network goes dark link by link ("vierundzwanzig Stunden" 2.88, "ausfällt" 3.94); headline
import { K, DEFS, BG, stars, card, TX, cam, prog, eio, lerp } from './lib.js';
import { globe } from './sets.js';
export default function renderShot(t) {
  const lit = 1 - eio(prog(t, 0.4, 3.9));
  return `${DEFS}${BG()}${stars(50, 1)}${cam(globe(540, 1000, 330, lit, t), lerp(1, 1.06, prog(t, 0, 3.94)), 540, 1000)}
    ${TX('INTERNET', 540, 300, 120, K.star)}${TX('WEG?', 540, 420, 120, K.red)}<g opacity="${eio(prog(t, 2.8, 3.1)).toFixed(2)}">${TX('24 STUNDEN', 540, 560, 70, K.data)}</g>`;
}
