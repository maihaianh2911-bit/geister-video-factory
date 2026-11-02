// L6 20.04–22.46 "Ihr streitet also gar nicht über das Geschirr": the dish pile is crossed out on "Geschirr".
import { K, frame, person, cam, prog, eio, eout, pop, f1 } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { plates: 7 });
  s += person('du', DU, GY, 1, { t, seed: 1, hear: .6, eyes: 'sad', mouth: 'flat', look: [12, 6] });
  s += person('er', ER, GY, 1, { t, seed: 2, eyes: 'sad', mouth: 'flat', look: [-12, 6] });
  const x = eio(prog(t, 21.5, 21.9));
  const ring = pop(t, 20.5, .4);
  if (ring > 0) s += `<g opacity="${f1(Math.min(1, ring) * 100) / 100}"><circle cx="510" cy="900" r="${f1(150 * ring)}" fill="none" stroke="${K.red}" stroke-width="14"/></g>`;
  if (x > 0) s += `<path d="M 404 794 L ${f1(404 + 212 * x)} ${f1(794 + 212 * x)}" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/>`;
  return frame(cam(s, 540, 950, 1.05 + .1 * eio(prog(t, 20.04, 21.4))));
}
