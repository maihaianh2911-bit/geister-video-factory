// The leg goes out onto a pouf — no weight on it ("entlaste das Bein"); then the ankle circles slowly and carefully on "bewege es vorsichtig", the sparkles fade.
import { K, room, sofa, person, POSE, HIP, lerpPose, joints, tingle, cam, prog, eio, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 55.5, 55.95));
  const pose = lerpPose(POSE.sit, POSE.stretch, p);
  const m = prog(t, 56.9, 58.6);
  if (m > 0) pose.near.f = 175 + 18 * Math.sin(m * Math.PI * 4) * Math.sin(m * Math.PI);
  const J = joints(...HIP.sit, 1, pose);
  const world = room() + sofa() + `<rect x="560" y="1036" width="190" height="174" rx="40" fill="${K.teal}" stroke="${K.ol}" stroke-width="4"/><path d="M 580 1054 H 730" stroke="#7FE0D6" stroke-width="8" stroke-linecap="round"/>`
    + person(...HIP.sit, 1, { ...pose, numb: lerp(.5, .1, m), mouth: m > .4 ? 'smile' : 'flat', look: 6, lookY: 8, blink: blinkAt(t), armN: { u: 15, f: 60 } })
    + tingle(t, J.ankle[0] + 10, J.ankle[1] - 50, 60, 70, lerp(.7, .1, m), 9, 18, 0, 1);
  return cam(520, 930, 1.55, world, 800);
}
