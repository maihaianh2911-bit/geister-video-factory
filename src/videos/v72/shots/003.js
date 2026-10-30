// 4.64–6.54: you notice it ("entdeckst" 5.28) — you stop chewing, eyes wide, holding the piece away from you
import { K, DEFS, kitchen, bust, slice, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const r = eio(prog(t, 4.9, 5.5));
  const hx = lerp(640, 820, r), hy = lerp(980, 880, r);
  const du = bust('du', 440, 1050, 1.3, { look: lerp(.3, 1, r), wide: r > .4, brow: r, mouth: r > .4 ? 'o' : 'chew', t, aR: [[680, 1250], [hx, hy]], heldR: slice(hx + 30, hy - 120, .7, { bite: .55, id: 's3', spot: 1, at: [-60, 40] }), aL: [[300, 1260], [330, 1340]] });
  return `${DEFS}${cam(`${kitchen(1350)}${du}`, lerp(1.08, 1.15, prog(t, 4.64, 6.54)), 560, 1000)}`;
}
