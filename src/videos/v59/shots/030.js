// 48.6–50.16: on the plan every door between the family and the stairwell closes and turns green.
import { K, DEFS, FG, prog, eio, floorPlan, planDots, PLAN, rings } from './lib.js';
export default function renderShot(t) {
  const { x, y } = PLAN;
  const d2 = eio(prog(t, 48.65, 48.85)), d1 = eio(prog(t, 48.95, 49.15));
  return `${DEFS}${floorPlan(t, { doors: [1, d1, d2], shelterGlow: 1 })}
    ${planDots(1, [[x + 480, y + 830], [x + 720, y + 830]], { gap: .45 })}
    ${rings(t, 48.85, x + 620, y + 600, K.safe, 2, 160, 8)}${rings(t, 49.15, x + 300, y + 450, K.safe, 2, 160, 8)}${rings(t, 49.4, x + 160, y, K.safe, 2, 160, 8)}
    ${FG(1430)}`;
}
