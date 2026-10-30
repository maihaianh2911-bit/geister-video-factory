// 50.82–53.1: relief step 1 — stop eating: she sets the cone into a stand on the counter and lets go (aufhören)
import { K, DEFS, parlour, counterFront, lea, cone, holder, holderFront, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const lower = eio(prog(t, 51.0, 52.0)), away = eio(prog(t, 52.2, 52.8));
  const hx = 820, hy = 1110;
  const held = t < 52.15;
  const cx = lerp(800, hx, lower), cy = lerp(1010, hy, lower), rot = lerp(8, 0, lower);
  const person = lea(t, 500, 720, 1, { id: 'A', cone: held ? { x: cx, y: cy, rot, bite: 1 } : null, handR: held ? null : { x: lerp(hx, 690, away), y: lerp(hy + 26, 1300, away) }, eyes: 'open', lookY: 10, look: 10 * lower, brow: 'calm', mouth: 'flat' });
  const scene = parlour(t) + holder(hx, hy, 1) + person + (held ? '' : cone(hx, hy, 0, 1, { id: 'Ac', bite: 1, hand: false })) + holderFront(hx, hy, 1) + counterFront(1236);
  return `${DEFS}${cam(scene, lerp(1.15, 1.22, eio(prog(t, 50.82, 53.1))), 560, 920)}`;
}
