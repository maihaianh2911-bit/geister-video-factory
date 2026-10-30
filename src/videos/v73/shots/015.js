// 48.24–51.72: not simply "mass panic": the word MASSENPANIK is typed on an archive card, then a red line strikes it through ("erklären lässt")
import { K, DEFS, BG, grain, TX, crossOut, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const word = '„MASSENPANIK“';
  const n = Math.floor(word.length * prog(t, 48.4, 49.6));
  const typed = word.slice(0, n);
  const strike = prog(t, 50.2, 50.7);
  return `${DEFS}${BG(K.paperD)}${grain(12)}<g transform="rotate(-2 540 820)"><rect x="80" y="560" width="920" height="520" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5"/>
    ${TX(typed, 540, 860, 96, K.ink)}${crossOut(130, 850, 950, 790, strike)}${strike > .9 ? TX('?', 950, 700, 120, K.red) : ''}</g>`;
}
