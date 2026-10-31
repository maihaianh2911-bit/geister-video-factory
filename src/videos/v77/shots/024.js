import { K, card, ground, breadGhost, nestTop, trail, antOnRoute, f1, prog } from './lib.js';
// 55.2–58.28 Fewer and fewer ants follow the faint trail: they drop out one by one ("weniger Ameisen").
export default function renderShot(t) {
  let ants = '';
  for (let i = 0; i < 8; i++) { const gone = 55.4 + i * .32; const a = 1 - prog(t, gone, gone + .3); if (a <= 0 || i < 2) { if (i < 2) ants += antOnRoute(((t - 55) * .2 + i * .5) % 1 * .9, t, false, { s: 1.6, k: i }); continue; } ants += antOnRoute(((t - 55) * .2 + i * .125) % 1 * .9, t, false, { s: 1.6, k: i, a: f1(a) }); }
  return `${ground(1)}${nestTop(250, 1250, 1)}${trail(0.06, .92, .2)}${breadGhost(790, 470, 1, .4)}${ants}
    ${card(540, 170, 'WENIGER', 76, prog(t, 56.48, 56.7), { col: K.grey })}`;
}
