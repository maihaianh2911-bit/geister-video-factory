// 2.82–4.64: close on your hand — you turn the last piece and a green mould spot shows on it ("Schimmelfleck" 4.64)
import { K, DEFS, BG, slice, arm, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const turn = eio(prog(t, 2.9, 3.9)), sp = eout(prog(t, 4.2, 4.7));
  const hx = 560, hy = lerp(1160, 1080, turn);
  const piece = slice(hx, hy - 230, 1.6, { bite: .55, id: 's2', rot: lerp(30, 0, turn), spot: sp, at: [-60, 40] });
  return `${DEFS}${BG(K.room)}${cam(`${piece}${arm([900, 1900], [760, 1400], [hx, hy], 1.6, K.du)}`, lerp(1, 1.08, prog(t, 2.82, 4.64)), 560, 900)}`;
}
