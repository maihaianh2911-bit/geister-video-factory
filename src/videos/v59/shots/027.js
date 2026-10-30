// 43.6–45.4: on the plan the three move together from the hall to the room farthest from the smoke.
import { K, DEFS, FG, prog, eio, floorPlan, planDots, PLAN } from './lib.js';
export default function renderShot(t) {
  const { x, y } = PLAN;
  const p = eio(prog(t, 43.6, 45.2));
  const pts = [[x + 150, y + 180], [x + 150, y + 450], [x + 420, y + 450], [x + 430, y + 700], [x + 640, y + 830]];
  let trail = `M ${pts[0][0]} ${pts[0][1]} ` + pts.slice(1).map(q => `L ${q[0]} ${q[1]}`).join(' ');
  return `${DEFS}${floorPlan(t, { doors: [1, 0, 0], shelterGlow: prog(t, 44.6, 45.4) })}
    <path d="${trail}" fill="none" stroke="${K.amb}" stroke-width="10" stroke-dasharray="26 18" opacity=".6"/>
    ${planDots(p, pts)}
    ${FG(1430)}`;
}
