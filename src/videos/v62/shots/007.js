// Back on the sofa: a magnifying lens slides over the tucked foot on "Haltung" and shows inside — the yellow nerve and red vessel squeezed under the body.
import { K, room, sofa, person, POSE, HIP, joints, cam, prog, eio, back, lerp } from './lib.js';

export default function renderShot(t) {
  const J = joints(...HIP.tucked, 1, POSE.tucked);
  const m = eio(prog(t, 12.2, 12.6)), inside = prog(t, 12.6, 12.9);
  const lx = lerp(J.ankle[0] + 260, J.ankle[0] - 10, m), ly = J.ankle[1] + 10;
  const r = 150;
  const pinch = 1;
  const lens = `<clipPath id="v62s7"><circle cx="${lx}" cy="${ly}" r="${r}"/></clipPath>
   <g clip-path="url(#v62s7)" opacity="1"><rect x="${lx - r}" y="${ly - r}" width="${2 * r}" height="${2 * r}" fill="${K.muscle}"/>
   <path d="M ${lx - r} ${ly - 20} Q ${lx} ${ly - 20 + 40 * pinch} ${lx + r} ${ly - 20}" stroke="${K.ol}" stroke-width="40" fill="none"/><path d="M ${lx - r} ${ly - 20} Q ${lx} ${ly - 20 + 40 * pinch} ${lx + r} ${ly - 20}" stroke="${K.nerve}" stroke-width="30" fill="none"/>
   <path d="M ${lx - r} ${ly + 50} Q ${lx} ${ly + 50 + 30 * pinch} ${lx + r} ${ly + 50}" stroke="${K.ol}" stroke-width="28" fill="none"/><path d="M ${lx - r} ${ly + 50} Q ${lx} ${ly + 50 + 30 * pinch} ${lx + r} ${ly + 50}" stroke="${K.blood}" stroke-width="20" fill="none"/></g>
   <circle cx="${lx}" cy="${ly}" r="${r}" fill="none" stroke="${K.ol}" stroke-width="14"/><circle cx="${lx}" cy="${ly}" r="${r}" fill="none" stroke="${K.white}" stroke-width="6"/>
   <path d="M ${lx + r * .7} ${ly + r * .7} L ${lx + r * 1.3} ${ly + r * 1.3}" stroke="${K.ol}" stroke-width="30" stroke-linecap="round"/>`;
  const world = room() + sofa() + person(...HIP.tucked, 1, { ...POSE.tucked, numb: .4, mouth: 'flat', look: 10 }) + lens;
  return cam(J.ankle[0] + 40, J.ankle[1] - 80, 2.0, world, 820);
}
