// Back to the start: the leg tucked under on the sofa — a red dashed ring marks this unfavourable position on "ungünstigen Sitzhaltung".
import { K, room, sofa, person, POSE, HIP, joints, cam, prog, back, lerp } from './lib.js';
export default function renderShot(t) {
  const J = joints(...HIP.tucked, 1, POSE.tucked);
  const rp = back(prog(t, 45.85, 46.15));
  const pul = 1 + .05 * Math.sin(t * 8);
  const ring = rp > 0 ? `<ellipse cx="${J.ankle[0] - 10}" cy="${J.ankle[1] + 6}" rx="${150 * rp * pul}" ry="${90 * rp * pul}" fill="none" stroke="${K.red}" stroke-width="12" stroke-dasharray="24 14"/>` : '';
  const world = room() + sofa() + person(...HIP.tucked, 1, { ...POSE.tucked, numb: .5, mouth: 'flat', look: 10 }) + ring;
  return cam(360, 930, lerp(1.6, 1.75, prog(t, 45.54, 47.5)), world, 800);
}
