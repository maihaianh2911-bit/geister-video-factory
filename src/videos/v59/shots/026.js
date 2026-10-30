// 42.22–43.6: REGEL 3 over the floor plan of the flat (smoke in the stairwell at the top).
import { K, DEFS, FG, prog, back, eio, floorPlan, planDots, regel, PLAN } from './lib.js';
export default function renderShot(t) {
  const z = 1.1 - .1 * eio(prog(t, 42.22, 43.0));
  const card = back(prog(t, 42.35, 42.6));
  const { x, y } = PLAN;
  return `${DEFS}<g transform="translate(540 760) scale(${z}) translate(-540 -760)">${floorPlan(t, { doors: [1, 0, 0] })}
    ${planDots(0, [[x + 150, y + 180], [x + 150, y + 450]])}</g>
    ${regel(3, 540, 1250, card)}
    ${FG(1430)}`;
}
