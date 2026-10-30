// Ending beat: back to the cover framing, relaxed with the cone; HIRNFROST returns for the loop.
import { P, prog, eio, back, punch, parlour, bust, label } from './lib.js';
const T0 = 69.60;
export default function renderShot(t) {
  const z = 1 + .12 * eio(prog(t, T0, 71.2));
  return `<g transform="translate(540 760) scale(${z}) translate(-540 -760)">${parlour(t, { blur: true })}
    <g transform="translate(540 1060) scale(1.45)">${bust({ id: 's38', hand: [175, 170], head: { eyes: 'happy', mouth: 'smile', blush: .7 }, coneO: { bite: .35 } })}</g></g>
    ${t > 70.6 ? label(540, 230, 'HIRNFROST', 132, { s: back(prog(t, 70.6, 70.8)), rot: -3 }) : ''}`;
}
