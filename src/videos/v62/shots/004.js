// She pushes up off the seat on "Aufstehen": the tucked leg unfolds and the pale (numb) foot lands on the floor.
import { K, room, sofa, tv, person, POSE, HIP, lerpPose, cam, prog, eio, lerp, blinkAt } from './lib.js';

export default function renderShot(t) {
  const p = eio(prog(t, 7.36, 8.25));
  const mid = Math.sin(p * Math.PI);
  const pose = lerpPose(POSE.tucked, POSE.stand, p);
  pose.aB = lerp(186, 180, p) - 22 * mid;
  const hx = lerp(HIP.tucked[0], HIP.stand[0], p), hy = lerp(HIP.tucked[1], HIP.stand[1], p) - 20 * mid;
  const arm = { u: lerp(20, 0, p) - 30 * mid, f: lerp(80, 10, p) - 20 * mid };
  const world = room() + sofa() + tv(900, 560, .8, { t, prog: .95 }) + person(hx, hy, 1, { ...pose, numb: .5 + .3 * p, armN: arm, armF: arm, mouth: 'flat', look: 6, lookY: 6 * p, blink: blinkAt(t) });
  return cam(470, 880, 1.35, world, 780);
}
