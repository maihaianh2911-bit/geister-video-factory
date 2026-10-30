// 28.64–30.86: operations deep inside the body — the diagram's organs light up and a dashed ring circles chest and belly ("tief" 28.64).
import { K, DEFS, BG, TX, prog, eout, eio, f1 } from './lib.js';
import { bodyDiagram } from './lib2.js';
export default function renderShot(t) {
  const g = eout(prog(t, 28.6, 29.0)), r = eio(prog(t, 28.7, 29.5)), lbl = eout(prog(t, 29.0, 29.3));
  return `${DEFS}${BG()}${bodyDiagram(t, { glowOrg: g, ring: r })}<g opacity="${f1(lbl)}">${TX('TIEF IM KÖRPER', 540, 150, 80, K.orange)}</g>`;
}
