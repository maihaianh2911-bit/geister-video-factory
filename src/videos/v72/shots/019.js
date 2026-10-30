// 49.1–52.06: but many of its toxins remain ("Giftstoffe" 49.1, "bleiben" 49.78, "erhalten" 51.14) — the threads are gone, the purple dots stay and pulse
import { K, DEFS, BG, slice, toxins, label, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 49.7, 50.1));
  const inner = `${toxins(-150, -160, 300, 300, 14, 1, 7, t)}<circle cx="0" cy="-10" r="${f1(200 + 20 * Math.sin(t * 5))}" fill="none" stroke="${K.toxin}" stroke-width="8" opacity="${f1(.6 * p)}"/>`;
  return `${DEFS}${BG(K.room)}${cam(slice(540, 900, 2.6, { id: 's19', spot: .7, at: [-60, 40], toast: .45, inner }), 1 + .05 * eio(prog(t, 49.1, 52.06)), 540, 900)}${label(540, 260, 'GIFTSTOFFE BLEIBEN', p, K.toxin, 52)}`;
}
