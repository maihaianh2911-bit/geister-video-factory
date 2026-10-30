// 63.0–66.4: such relationships — mosquito linked to orchid, fish, swallow, dragonfly; on "Eingriff" the mosquito is taken out and the links snap
import { K, DEFS, BG, vig, node, link, ic, f1, prog, eio, eout, back, lerp } from './lib.js';
export default function renderShot(t) {
  const M = [540, 820];
  const P = [[230, 470, 'orchid'], [850, 470, 'fish'], [230, 1160, 'bird'], [850, 1160, 'dfly']];
  const cut = eout(prog(t, 65.8, 66.15));
  let s = '';
  P.forEach(([x, y], i) => {
    const a = eout(prog(t, 63.1 + i * .2, 63.5 + i * .2));
    if (cut <= 0) s += link(M[0], M[1], x, y, a);
    else { const k = lerp(1, .45, cut); s += link(x, y, lerp(x, M[0], k), lerp(y, M[1], k), 1, { col: K.red }); }
  });
  P.forEach(([x, y, k], i) => { s += node(x, y, 88, ic[k](t), eout(prog(t, 63.05 + i * .2, 63.45 + i * .2))); });
  const mOut = cut > 0 ? `<g transform="translate(${M[0]} ${f1(M[1] - 260 * eio(cut))})" opacity="${f1(1 - cut)}">${ic.mos(t)}</g><circle cx="${M[0]}" cy="${M[1]}" r="96" fill="none" stroke="${K.red}" stroke-width="5" stroke-dasharray="12 10" opacity="${f1(cut)}"/>` : node(M[0], M[1], 96, ic.mos(t), 1);
  return `${DEFS}${BG('url(#mData)')}${s}${mOut}${vig()}`;
}
