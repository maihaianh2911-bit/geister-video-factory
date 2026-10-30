// She starts to get up on the numb foot — a red X on "nicht": she stops and sinks back onto the seat instead of walking off.
import { K, room, sofa, person, POSE, HIP, lerpPose, xmark, joints, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const up = .32 * eio(prog(t, 51.35, 51.7)) * (1 - eio(prog(t, 52.2, 52.9)));
  const pose = lerpPose(POSE.sit, POSE.stand, up);
  pose.aB = 182 - 40 * up / .32;
  const hx = lerp(HIP.sit[0], HIP.stand[0], up), hy = lerp(HIP.sit[1], HIP.stand[1], up);
  const J = joints(hx, hy, 1, pose);
  const arm = { u: lerp(15, -30, up / .32), f: lerp(60, -5, up / .32) };
  const world = room() + sofa() + person(hx, hy, 1, { ...pose, numb: .8, armN: arm, armF: arm, brow: t > 51.8 ? 'worry' : 'calm', mouth: 'flat', lookY: 14 });
  return cam(470, 930, 1.45, world, 800) + xmark(700, 470, 1.2, prog(t, 51.72, 52.0));
}
