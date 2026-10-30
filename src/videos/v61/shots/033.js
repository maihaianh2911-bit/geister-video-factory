// 64.0–65.44: final beat — Lea enjoys her ice cream calmly at the counter
import { K, DEFS, parlour, counterFront, lea, cam, prog, eout, eio, lerp, blinkAt } from './lib.js';
export default function renderShot(t) {
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'G', cone: { x: 780, y: 1000, rot: 2, bite: 1, small: 1 }, eyes: 'open', look: 10, lookY: -2, brow: 'up', mouth: 'smile', blink: blinkAt(t, .5) }) + counterFront(1236);
  return `${DEFS}${cam(scene, lerp(1.25, 1.1, eio(prog(t, 64, 65.44))), 540, 820)}`;
}
