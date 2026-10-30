// 8.624–11.088: from above — ahead of you there is no room left ("vorne kein Platz"): the last gaps in front close up
import { K, DEFS, BG, headTop, grain, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const close = eio(prog(t, 9.2, 10.4));
  let h = '';
  for (let r = 0; r < 14; r++) for (let c = 0; c < 10; c++) {
    let x = 70 + c * 106 + (r % 2) * 53 + 14 * (hash(r * 10 + c) - .5), y = 160 + r * 92 + 10 * hash(r * 7 + c);
    // gap ahead of you (rows 3..6 centre) is filled by neighbours sliding in
    const gap = r >= 3 && r <= 6 && c >= 3 && c <= 6;
    if (gap) { const side = c < 4.5 ? -1 : 1; x += side * 160 * (1 - close); }
    if (r === 9 && c === 4) continue;
    h += headTop(x, y, 1, { col: [K.c1, K.c2, K.c3, K.c4, K.c5][Math.floor(hash(r * 3 + c * 5) * 5)], hair: hash(r + c * 13) > .5 ? K.brownD : K.ink });
  }
  const you = headTop(70 + 4 * 106 + 53, 160 + 9 * 92, 1.15, { you: true });
  const arrow = `<path d="M 545 950 L 545 ${f1(lerp(560, 840, close))}" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/><path d="M 515 ${f1(lerp(600, 880, close))} L 545 ${f1(lerp(560, 840, close))} L 575 ${f1(lerp(600, 880, close))}" stroke="${K.red}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  return `${DEFS}${BG(K.concrete)}${grain(4)}${h}${arrow}${you}`;
}
