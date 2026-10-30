// 15.5–16.8: the cold makes the vessel contract (zusammenziehen) — walls squeeze in, blood slows
import { K, DEFS, BG, prog, eout, eio, lerp } from './lib.js';
import { palateLens, inArrows } from './vlens.js';
export default function renderShot(t) {
  const c = eio(prog(t, 15.6, 16.15));
  const w = lerp(1, .42, c);
  return `${DEFS}${BG(K.bg2)}${palateLens(t, { id: 'j', lx: 540, ly: 860, r: 470, w, cold: lerp(.3, 1, c), speed: lerp(1, .35, c) })}
    ${inArrows(540, 860, lerp(250, 150, c), prog(t, 15.6, 15.8), K.cold)}`;
}
