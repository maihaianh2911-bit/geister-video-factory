// Standing, she tries a careful step: the numb foot lands, the ankle wobbles on "schlechter steuern" — arms come out for balance, no comic stumble.
import { K, room, person, POSE, HIP, joints, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const lift = Math.sin(Math.PI * eio(prog(t, 28.6, 29.5)));
  const fwd = eio(prog(t, 28.6, 29.5));
  const wob = t > 29.5 ? 14 * Math.sin((t - 29.5) * 18) * Math.exp(-(t - 29.5) * 2.2) : 0;
  const near = { t: 14 * fwd + 18 * lift, s: 6 * fwd - 14 * lift, f: 90 - 10 * lift + wob };
  const bal = eio(prog(t, 29.6, 29.9));
  const arm = { u: lerp(0, 40, bal), f: lerp(10, 70, bal) }, armF = { u: lerp(0, -30, bal), f: lerp(0, -50, bal) };
  const world = room({ lamp: false }) + person(...HIP.stand, 1, { ...POSE.stand, near, numb: .8, armN: arm, armF, brow: 'worry', mouth: 'tight', lookY: 14, aB: 180 - 3 * bal });
  return cam(600, 920, 1.45, world, 760);
}
