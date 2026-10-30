// Seated securely: both hands press on the cushion, the back rests against the backrest — teal check on "sicher hin".
import { K, room, sofa, person, POSE, HIP, check, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const s = eio(prog(t, 54.5, 54.95));
  const arm = { u: lerp(15, -12, s), f: lerp(60, -8, s) };
  const world = room() + sofa() + person(...HIP.sit, 1, { ...POSE.sit, aB: lerp(182, 190, s), numb: .6, armN: arm, armF: arm, mouth: 'flat', look: 4, lookY: 10 });
  return cam(400, 930, 1.6, world, 820) + check(800, 420, 1.1, prog(t, 55.0, 55.25));
}
