// 44.7–47.4: the pain fades on its own (verschwindet von selbst) — glow dims, hand comes down, she breathes out
import { K, DEFS, parlour, counterFront, lea, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const fade = eio(prog(t, 45.2, 46.6)), down = eio(prog(t, 45.7, 46.4));
  const handL = down < .98 ? { kind: 'palm', x: lerp(395, 300, down), y: lerp(615, 1120, down), ang: lerp(-95, -30, down) } : { kind: 'rest' };
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'y', cone: { x: 800, y: 1010, rot: 8, bite: 1 }, handL, eyes: t < 46.0 ? 'squeeze' : 'open', eyeS: .95, brow: t < 46.2 ? 'pain' : 'calm', mouth: t < 45.9 ? 'grit' : t < 46.6 ? 'o' : 'soft', pain: 1 - fade, temple: .8 * (1 - fade) }) + counterFront(1236);
  const z = lerp(1.5, 1.32, eio(prog(t, 44.7, 47.4)));
  return `${DEFS}${cam(scene, z, 520, 860)}`;
}
