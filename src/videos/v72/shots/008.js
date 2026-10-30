// 17.6–20.52: the green spot is only the visible part ("sichtbare Teil" 19.04–19.52) — close on the slice, a dashed ring marks the spot
import { K, DEFS, BG, slice, label, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const r = eio(prog(t, 18.9, 19.3));
  const ring = `<circle cx="${f1(540 - 60 * 3 * .9)}" cy="${f1(900 + 40 * 3 * .9)}" r="${f1(170 + 10 * Math.sin(t * 6))}" fill="none" stroke="${K.tealD}" stroke-width="10" stroke-dasharray="26 18" opacity="${f1(r)}"/>`;
  return `${DEFS}${BG(K.room)}${cam(`${slice(540, 900, 3, { id: 's8', spot: 1, at: [-60, 40] })}${ring}`, 1 + .06 * eio(prog(t, 17.6, 20.52)), 540, 900)}${label(540, 1380 - 60, 'SICHTBAR', r, K.tealD)}`;
}
