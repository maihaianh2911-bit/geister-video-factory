// 64.78–67.0 · "Beim nächsten Mal: kleinere Bissen" — a fresh cone; she takes a small bite; KLEINE BISSEN
import { P, parlour, girl, label, cam, prog, eio, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const near = eio(prog(t, 65.6, 66.0)) * (1 - eio(prog(t, 66.4, 66.8)));
  const bite = t >= 66.18 ? .45 : 0;
  return `<g transform="${cam(lerp(1.08, 1.0, eio(prog(t, 64.78, 65.3))), 540, 900, 540, 900)}">${parlour(t)}
    ${girl(540, 1390, 1.65, { t, id: 's34', hold: 'cone', handR: [lerp(200, 120, near), lerp(40, -40, near)], bite, biteSide: -1, coneRot: -8 * near,
      eyes: near > .5 ? 'closed' : 'open', look: 14, lookY: -6, mouth: near > .3 && t < 66.18 ? 'o' : 'smile', tilt: 5 * near })}</g>
    ${label('KLEINE BISSEN', 540, 330, 104, { scale: back(prog(t, 66.1, 66.35)), fill: P.teal, color: '#fff', rot: -3, w: 780 })}`;
}
