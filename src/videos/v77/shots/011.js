import { K, card, antSide, breadSide, nestSide, yardSide, f1, prog, eio, back, lerp } from './lib.js';
// 20.9–24.02 Close side view: the discoverer walks back toward the nest, lowers her abdomen tip and leaves scent dots behind ("Rückweg", "Pheromone").
export default function renderShot(t) {
  const x = lerp(900, 260, prog(t, 20.9, 24.02));
  const tip = eio(prog(t, 21.9, 22.14));
  const x0 = lerp(900, 260, prog(22.14, 20.9, 24.02));
  let dots = '';
  if (t > 22.14) for (let dx = x0; dx > x + 60; dx -= 26) dots += `<circle cx="${f1(dx)}" cy="1152" r="11" fill="${K.trail}" opacity=".9"/>`;
  return `${yardSide(1150)}${nestSide(60, 1150, 1.1)}${breadSide(1060, 1150, 1.1)}${dots}${antSide(x, 1150, 3, t * 14, { dir: -1, tip })}
    ${card(540, 380, 'PHEROMONE', 80, prog(t, 22.54, 22.8), { col: K.trail })}`;
}
