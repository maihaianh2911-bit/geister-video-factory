// 0–2.82: cover — you at the kitchen table, eating the last bit of a slice of bread; headline
import { K, DEFS, kitchen, bust, slice, TX, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 0.1, 0.9)) * (1 - eio(prog(t, 1.6, 2.4)));
  const hx = lerp(700, 610, up), hy = lerp(1180, 900, up);
  const piece = slice(hx + 40, hy - 40, .5, { bite: .55, id: 's1', rot: -20 });
  const du = bust('du', 540, 1000, 1.25, { look: .2, lookY: up > .5 ? .3 : 0, mouth: up > .5 ? 'o' : 'chew', t, aR: [[760, 1200], [hx, hy]], heldR: piece, aL: [[380, 1220], [420, 1300]] });
  const sc = `${kitchen(1300)}<ellipse cx="420" cy="1330" rx="170" ry="34" fill="${K.white}" stroke="${K.ink}" stroke-width="4"/>${du}`;
  return `${DEFS}${cam(sc, 1.05, 540, 1100)}<rect x="90" y="190" width="900" height="250" rx="40" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/>${TX('SCHIMMEL', 540, 300, 112, K.ink)}${TX('GEGESSEN?', 540, 412, 104, K.red)}`;
}
