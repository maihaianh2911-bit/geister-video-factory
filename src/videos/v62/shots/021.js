// Bedroom, morning: sitting on the bed edge she holds up her hand — sparkles fizz over it on "Hand"; she looks at it and flexes the fingers.
import { K, room, bed, person, POSE, handAt, tingle, cam, prog, eio, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 41.0, 41.6)), k = eio(prog(t, 42.1, 42.5));
  const A = { u: lerp(20, 70, up), f: lerp(60, 150, up) };
  const H = [520, 985], h = handAt(H[0], H[1], 1, 182, A);
  const shake = k * 6 * Math.sin(t * 30);
  const world = room({ lamp: false }) + bed() + person(H[0] + shake * 0, H[1], 1, { ...POSE.sit, aB: 182, armN: A, armF: { u: 15, f: 60 }, look: 4, lookY: lerp(0, -6, up), brow: k > .5 ? 'worry' : 'calm', mouth: k > .5 ? 'tight' : 'flat', blink: blinkAt(t) })
    + tingle(t, h[0], h[1], 60, 60, k, 11, 22, 0, 1.2);
  return cam(600, 820, 1.55, world, 740);
}
