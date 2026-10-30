// Back on the sofa she stretches the leg straight out on "ausstreckst".
import { K, room, sofa, tv, person, POSE, HIP, lerpPose, cam, prog, eio, blinkAt } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 31.0, 31.6));
  const pose = lerpPose(POSE.sit, POSE.stretch, p);
  const world = room() + sofa() + tv(900, 560, .8, { t, prog: .95 }) + person(...HIP.sit, 1, { ...pose, numb: .7, mouth: 'flat', look: 6, lookY: 8, blink: blinkAt(t), armN: { u: 15, f: 60 } });
  return cam(470, 930, 1.45, world, 800);
}
