// L14b 64.42–68.3: cold blue wide: du alone at the table; the chairs around hold faint outlines of the sister and friends that fade ("Momente" 64.8, "da warst" 65.8, "gefehlt" 67.04).
import { K, frame, cam, person, prog, eio, lerp } from './lib.js';
import { voidRoom, chair, dinTable } from './sets.js';
import { duHG } from './base.js';
function ghostOf(who, x, y, s, a, t, look) {
  if (a <= 0.01) return '';
  return `<g opacity="${(a * .7).toFixed(2)}">${person(who, x, y, s, { t, seed: 4, mouth: 'smile', brows: 'calm', look, legs: false }).replace(/fill="#(?!fff)[0-9a-f]{3,6}"/gi, 'fill="#8fa3c8"')}</g>`;
}
export default function renderShot(t) {
  let s = voidRoom(t);
  const f1 = 1 - eio(prog(t, 65.0, 66.2)), f2 = 1 - eio(prog(t, 65.8, 67.0)), f3 = 1 - eio(prog(t, 66.6, 67.6));
  const ca = (f) => lerp(.35, 1, f);
  s += chair(170, 1360, .8, ca(f1)) + chair(910, 1360, .8, ca(f2));
  s += ghostOf('sis', 170, 1500, .72, f1, t, [16, 0]) + ghostOf('mate', 910, 1500, .72, f2, t, [-16, 0]);
  s += chair(540, 1180, .62, ca(f3)) + ghostOf('cap', 540, 1300, .56, f3, t, [0, 6]);
  s += duHG(540, 1700, .9, { t, seed: 1, look: [lerp(-14, 14, eio(prog(t, 65.2, 66.8))), 6], brows: 'sad', mouth: 'frown', legs: false }, { fill: 1, flow: 0, glow: .1, s: .7 });
  s += dinTable(t, 1440, { plates: [540], glass: false });
  return frame(cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 64.42, 68.3))));
}
