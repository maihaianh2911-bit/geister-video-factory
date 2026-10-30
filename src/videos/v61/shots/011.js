// 16.8–18.12: then the vessel widens again (weiten) — walls push out, warm blood rushes back
import { K, DEFS, BG, prog, eout, eio, lerp } from './lib.js';
import { palateLens, inArrows } from './vlens.js';
export default function renderShot(t) {
  const c = eout(prog(t, 17.05, 17.6));
  const w = lerp(.42, 1.35, c);
  const ar = prog(t, 17.1, 17.3) * (1 - prog(t, 17.9, 18.1));
  return `${DEFS}${BG(K.bg2)}${palateLens(t, { id: 'k', lx: 540, ly: 860, r: 470, w, cold: lerp(1, 0, c), hot: c, speed: lerp(.35, 1.6, c) })}
    ${inArrows(540, 860, lerp(110, 170, c), ar, K.hot, true)}`;
}
