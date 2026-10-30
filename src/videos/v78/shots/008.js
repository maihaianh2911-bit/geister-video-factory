// 16.76–19.38: magnified skin under the arm: bacteria on the skin ("Bakterien" 16.76) gather at sweat droplets ("Schweißes" 19.38)
import { K, BG, lens, card, cam, prog, eio, ein, lerp, f1, hash } from './lib.js';
import { skin, sweat, bacterium } from './sets.js';
export default function renderShot(t) {
  const a = eio(prog(t, 16.8, 17.3)), g = eio(prog(t, 17.9, 19.0));
  const drops = [[380, 820], [700, 940], [520, 1120]];
  let bac = '';
  for (let i = 0; i < 12; i++) { const [dx, dy] = drops[i % 3], x0 = 200 + hash(i * 2) * 680, y0 = 600 + hash(i * 5) * 700;
    bac += bacterium(lerp(x0, dx + Math.cos(i) * 70, g), lerp(y0, dy + Math.sin(i) * 50, g), 1.2, i * 30 + t * 40 * (i % 2 ? 1 : -1)); }
  const inner = `${skin()}${drops.map(([x, y]) => sweat(x, y, 34)).join('')}<g opacity="${f1(a)}">${bac}</g>`;
  return `${BG()}${lens(540, 940, 420, inner, 'l8', { handle: false })}${card(540, 330, 'BAKTERIEN', 64, a, { col: K.bact })}`;
}
