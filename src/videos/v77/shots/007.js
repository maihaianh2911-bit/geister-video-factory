import { card, ground, bread, nestTop, antOnRoute, prog } from './lib.js';
// 11.92–14.2 A little later more ants come out of the nest one after another ("weitere Ameisen") and set off on the same route.
export default function renderShot(t) {
  let ants = '';
  for (let i = 0; i < 6; i++) { const t0 = 12.9 + i * .45; if (t < t0) continue; const u = (t - t0) * .32; ants += antOnRoute(u, t, false, { s: 1.6, k: i }); }
  return `${ground(1)}${nestTop(250, 1250, 1)}${bread(790, 470, 1)}${ants}
    ${card(540, 1440 - 1100, 'ETWAS SPÄTER', 70, prog(t, 12.2, 12.45))}`;
}
