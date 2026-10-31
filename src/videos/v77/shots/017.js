import { card, ground, bread, nestTop, trail, antOnRoute, prog } from './lib.js';
// 33.12–37.78 (35.3–37.78) Top-down: busy two-way route; labels NEST and FUTTER; the trail stays bright ("erhalten").
export default function renderShot(t) {
  let ants = '';
  for (let i = 0; i < 6; i++) { ants += antOnRoute(((t - 35.3) * .3 + i / 6) % 1, t, false, { s: 1.6, k: i }); ants += antOnRoute(1 - (((t - 35.3) * .3 + i / 6 + .08) % 1), t, true, { s: 1.6, k: i + 5, carry: 1 }); }
  const pulse = 1.6 + .15 * Math.sin(t * 6);
  return `${ground(1)}${nestTop(250, 1250, 1)}${trail(0.06, .92, pulse)}${bread(790, 470, 1)}${ants}
    ${card(250, 1060, 'NEST', 60, prog(t, 35.32, 35.55))}${card(790, 700, 'FUTTER', 60, prog(t, 36.02, 36.25))}`;
}
