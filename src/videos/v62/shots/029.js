// In between she changes position — stretches the leg, then sits up with both feet down; POSITION WECHSELN on "Position".
import { K, room, sofa, tv, person, POSE, HIP, lerpPose, lab, cam, prog, eio, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const a = eio(prog(t, 60.3, 60.75)), b = eio(prog(t, 61.2, 61.7));
  const pose = lerpPose(lerpPose(POSE.sit, POSE.stretch, a), POSE.sit, b);
  const world = room({ night: true }) + sofa() + tv(900, 560, .8, { t: t * 3, prog: .4 }) + person(...HIP.sit, 1, { ...pose, mouth: 'smile', look: 8, lookY: 4, blink: blinkAt(t), armN: { u: 15, f: 60 } });
  return cam(470, 900, 1.4, world, 840) + lab('POSITION WECHSELN', 540, 300, 70, prog(t, 61.42, 61.7));
}
