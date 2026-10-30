// 13.38–14.8: two men search the forest at night with torches (Zwei Männer … illegal)
import { K, DEFS, forest, fig, grain, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const w = (t - 13.38) * 5;
  const a = fig(lerp(300, 380, prog(t, 13.38, 14.8)), 1340, .9, { col: '#141A18', cap: true, walk: w, aL: [45, 15], rim: '#9FB5A8' });
  const b = fig(lerp(720, 790, prog(t, 13.38, 14.8)), 1360, .95, { col: '#141A18', cap: true, walk: w + 2, aR: [45, 15], rim: '#9FB5A8' });
  const beam = (h, dir) => `<path d="M ${f1(h[0])} ${f1(h[1])} L ${f1(h[0] + dir * 420)} ${f1(h[1] + 320)} L ${f1(h[0] + dir * 160)} ${f1(h[1] + 420)} Z" fill="url(#nTorch)" opacity=".75"/>`;
  return `${DEFS}${cam(forest(t) + beam(a.hL, -1) + beam(b.hR, 1) + a.svg + b.svg, 1.05, 540, 1000)}${grain(t)}`;
}
