// Standing, she winces: glowing pins-and-needles dots flare over the pale foot on "tausend kleine Nadelstiche" (no real needles).
import { K, room, sofa, person, POSE, HIP, joints, tingle, cam, prog, eio, lerp } from './lib.js';

export default function renderShot(t) {
  const k = lerp(.2, 1, eio(prog(t, 10.38, 11.1)));
  const w = prog(t, 10.4, 10.7);
  const J = joints(...HIP.stand, 1, POSE.stand);
  const arm = { u: lerp(0, 18, w), f: lerp(10, 40, w) };
  const world = room() + sofa() + person(...HIP.stand, 1, { ...POSE.stand, numb: 1, armN: arm, armF: { u: -10, f: 0 }, mouth: w > .5 ? 'wince' : 'o', brow: w > .5 ? 'pain' : 'worry', eye: w > .5 ? 'squint' : 'open', lookY: 12 })
    + tingle(t, J.ankle[0] + 30, J.ankle[1] - 10, 110, 60, k, 3, 34, 0, 1.6);
  return cam(570, 880, 1.4, world, 780);
}
