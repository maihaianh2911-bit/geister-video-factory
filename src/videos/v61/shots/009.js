// 13.28–15.5: researchers' idea — inside the palate a small blood vessel carries blood (normal width)
import { K, DEFS, BG, prog, eout, eio, lerp, f1 } from './lib.js';
import { palateLens, contextHead } from './vlens.js';
export default function renderShot(t) {
  const o = eout(prog(t, 13.28, 13.75));
  const lx = lerp(435, 600, o), ly = lerp(503, 1060, o), r = lerp(40, 360, o);
  return `${DEFS}${BG(K.bg)}${contextHead(t, 300, 440, .9, { id: 'i' })}
    <path d="M ${f1(300 + 150 * .9)} ${f1(440 + 70 * .9 + 30)} L ${f1(lx - r * .3)} ${f1(ly - r * .95)}" stroke="${K.ink}" stroke-width="6" stroke-dasharray="14 12"/>
    ${palateLens(t, { id: 'i', lx, ly, r, w: 1, cold: .3 })}`;
}
