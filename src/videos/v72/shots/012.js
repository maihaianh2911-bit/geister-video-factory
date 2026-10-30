// 29.4–32.36: may not be enough ("nicht aus" 29.4) — see-through view: threads still run past the cut into the remaining bread ("befallenen Teil" 30.36)
import { K, DEFS, BG, slice, hyphae, crossOut, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const x = eio(prog(t, 29.4, 29.8)), h = eio(prog(t, 30.3, 30.9));
  const inner = `<rect x="-200" y="-260" width="400" height="460" fill="${K.white}" opacity="${f1(.45 * x)}"/><g opacity="${f1(x)}">${hyphae(-120, 30, 1, 300, 230, 5)}${hyphae(-120, -60, 1, 280, 200, 11)}${hyphae(-120, 110, 1, 260, 160, 17)}</g>
    <ellipse cx="-30" cy="40" rx="150" ry="170" fill="${K.red}" opacity="${f1(.2 * h)}"/>`;
  const sc = `<defs><clipPath id="k12"><rect x="350" y="-100" width="900" height="2000"/></clipPath></defs><g clip-path="url(#k12)">${slice(540, 900, 2.6, { id: 's12', at: [-120, 0], spot: 1, inner })}</g><path d="M 350 380 V 1300" stroke="${K.ink}" stroke-width="6" stroke-dasharray="20 14"/>`;
  return `${DEFS}${BG(K.room)}${cam(sc, 1.08, 600, 900)}${crossOut(230, 420, 110, eio(prog(t, 29.4, 29.8)))}`;
}
