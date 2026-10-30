// 20.52–24.1: the slice turns see-through; tiny fungal threads grow from the spot deep into the bread ("Pilzfäden" 20.86, "tief" 21.94)
import { K, DEFS, BG, slice, hyphae, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const x = eio(prog(t, 20.6, 21.1)), g = eio(prog(t, 20.9, 23.3));
  const inner = `<rect x="-200" y="-260" width="400" height="460" fill="${K.white}" opacity="${f1(.45 * x)}"/>${hyphae(-60, 40, g, 120, 240, 2)}`;
  return `${DEFS}${BG(K.room)}${cam(slice(540, 900, 3, { id: 's9', spot: 1, at: [-60, 40], inner }), 1.0 + .04 * g, 540, 900)}`;
}
