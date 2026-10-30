// 1.3–2.46: close-up, the cone comes toward the face, mouth opens wide (…zu schnell isst?)
import { K, DEFS, parlour, counterFront, lea, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const p = eio(prog(t, 1.3, 2.3)), op = prog(t, 1.75, 2.05);
  const cone = { x: lerp(760, 690, p), y: lerp(975, 1000, p), rot: lerp(-8, -22, p) };
  const z = lerp(1.75, 1.85, eout(prog(t, 1.3, 2.46)));
  const scene = parlour(t) + lea(t, 500, 720, 1, { id: 'b', cone, look: lerp(12, 8, p), lookY: 4, eyeS: 1.15, brow: 'up', mouth: op > .4 ? 'open' : 'smile' }) + counterFront(1236);
  return `${DEFS}${cam(scene, z, 540, 820)}`;
}
