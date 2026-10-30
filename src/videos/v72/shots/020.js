// 52.06–56.06: crispier doesn't mean you can eat it again ("nicht" 53.52) — the toast pops up brown, your hand reaches, red cross, the hand pulls back
import { K, DEFS, kitchen, slice, arm, crossOut, cam, prog, eio, eout, lerp, f1 } from './lib.js';
import { toaster } from './017.js';
export default function renderShot(t) {
  const pop = eout(prog(t, 52.1, 52.5)), r = eio(prog(t, 52.6, 53.4)) * (1 - eio(prog(t, 54.2, 55.0)));
  const piece = `<defs><clipPath id="k20"><rect x="-100" y="-100" width="1300" height="1152"/></clipPath></defs><g clip-path="url(#k20)">${slice(540, lerp(1150, 900, pop), .9, { id: 's20', toast: .9, spot: .5, at: [-60, 40] })}</g>`;
  const sc = `${kitchen(1350)}${toaster(540, 1200, 1.3, { lever: 0 })}${piece}${arm([1300, 1500], [1100, 1100], [lerp(1200, 760, r), lerp(900, 880, r)], 1.4, K.du)}`;
  return `${DEFS}${cam(sc, 1.0, 540, 1000)}${crossOut(540, 840, 260, eio(prog(t, 53.4, 53.8)))}`;
}
