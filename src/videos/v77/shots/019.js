import { card, ground, bread, breadGhost, nestTop, trail, antOnRoute, cl, prog } from './lib.js';
// 40.68–43.4 Top-down: the bread is gone (dashed outline) but ants already under way keep walking the trail ("unterwegs").
export default function renderShot(t) {
  let ants = '';
  for (let i = 0; i < 6; i++) { const u = cl((t - 40.68) * .26 + i * .1); ants += antOnRoute(Math.min(u, .9), t, false, { s: 1.6, k: i }); }
  return `${ground(1)}${nestTop(250, 1250, 1)}${trail(0.06, .92, 1.5)}${breadGhost(790, 470, 1)}${ants}
    ${card(540, 170, 'UNTERWEGS', 70, prog(t, 41.58, 41.8))}`;
}
