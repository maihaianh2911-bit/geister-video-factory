// 29.24–30.8: from fence to fence — the disc passes along a chain of silhouettes
import { K, DEFS, BG, fig, disc, grain, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 29.4, 30.7));
  const xs = [180, 540, 900];
  const figs = xs.map((x, i) => fig(x, 1400, .82, { col: '#2A221D', hat: i !== 1, coat: true, aR: [i < 2 ? 70 : 20, 10], aL: [i > 0 ? 70 : 20, 10] }));
  const seg = p * 2, k = Math.min(1, Math.floor(seg)), f = seg - k;
  const a = k === 0 ? figs[0].hR : figs[1].hR, b = k === 0 ? figs[1].hL : figs[2].hL;
  const dx = lerp(a[0], b[0], eio(Math.min(1, f * 1.3))), dy = lerp(a[1], b[1], eio(Math.min(1, f * 1.3))) - 60 * Math.sin(Math.PI * Math.min(1, f * 1.3));
  return `${DEFS}${BG(K.paper)}<rect x="-60" y="1400" width="1200" height="600" fill="${K.paperD}"/>${figs.map(g => g.svg).join('')}${disc(dx, dy - 30, 70, { id: 'p', damage: true })}${grain(t)}`;
}
