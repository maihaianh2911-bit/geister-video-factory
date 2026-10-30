// 36.04–40.8: NAHRUNGSNETZ — mosquito at the centre linked to fish, swallow, dragonfly, water beetle; on "verlieren" its links go dashed,
// on "nicht automatisch ihre einzige" each predator's other prey lights up
import { K, DEFS, BG, vig, kcard, node, link, ic, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const M = [540, 860];
  const P = [[230, 560, 'fish', 'flea'], [830, 560, 'bird', 'fly'], [230, 1100, 'dfly', 'fly'], [830, 1100, 'beetle', 'worm']];
  const lose = eout(prog(t, 37.7, 38.1)), other = prog(t, 38.74, 39.9);
  let s = '';
  P.forEach(([x, y], i) => { const a = eout(prog(t, 36.2 + i * .12, 36.6 + i * .12)); s += lose > 0 ? link(M[0], M[1], x, y, 1, { dash: true, col: K.red, a: .7 }) : link(M[0], M[1], x, y, a); });
  // other prey: one small node per predator, out toward the edge
  P.forEach(([x, y, k, prey], i) => {
    const a = eout(prog(t, 38.74 + i * .25, 39.1 + i * .25));
    const px = y < 860 ? (x < 540 ? 110 : 960) : (x < 540 ? 420 : 660), py = y < 860 ? y - 220 : y + 210;
    s += link(x, y, px, py, a, { col: K.sun });
    s += node(px, py, 52, ic[prey](), a, { col: K.sun, glow: .3 });
  });
  P.forEach(([x, y, k], i) => { s += node(x, y, 82, ic[k](t), eout(prog(t, 36.1 + i * .12, 36.5 + i * .12))); });
  s += node(M[0], M[1], 96, ic.mos(t), 1, { col: lose > 0 ? K.red : K.cyan, dash: lose > 0, dim: 1 - .55 * lose });
  return `${DEFS}${BG('url(#mData)')}${s}${kcard(540, 220, 'NAHRUNGSNETZ', 1, { sz: 76 })}${vig()}`;
}
