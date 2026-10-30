// Close on the hips: the body settles its weight down onto the tucked leg on "Bein unter dir" — the cushion gives, white pressure arrows press on the foot.
import { K, room, sofa, person, POSE, HIP, joints, cam, prog, eio, eout, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const sink = eio(prog(t, 3.7, 4.2));
  const hy = HIP.tucked[1] + 12 * sink;
  const J = joints(HIP.tucked[0], hy, 1, POSE.tucked);
  const ap = eout(prog(t, 4.08, 4.5));
  let arrows = '';
  for (let i = -1; i <= 1; i++) { const x = J.ankle[0] - 30 + i * 70, y = J.ankle[1] - 250 + 60 * ap; arrows += `<g opacity="${ap.toFixed(2)}"><path d="M ${x} ${y} V ${y + 90}" stroke="${K.white}" stroke-width="18" stroke-linecap="round"/><path d="M ${x - 28} ${y + 62} L ${x} ${y + 96} L ${x + 28} ${y + 62}" stroke="${K.white}" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
  const world = room() + sofa(0, { squash: 8 * sink }) + person(HIP.tucked[0], hy, 1, { ...POSE.tucked, mouth: 'smile', look: 10, blink: blinkAt(t) }) + `<g stroke="${K.ol}" stroke-width="4">${arrows}</g>`;
  return cam(360, 920, lerp(1.9, 2.05, prog(t, 2.98, 5)), world, 820);
}
