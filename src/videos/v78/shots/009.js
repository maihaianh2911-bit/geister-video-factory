// 19.38–22.36: they break down parts of the sweat and form smelly compounds ("riechende Verbindungen" 20.86–21.36) — droplets shrink, green smell clouds rise
import { K, BG, lens, smell, card, prog, eio, lerp, f1 } from './lib.js';
import { skin, sweat, bacterium } from './sets.js';
export default function renderShot(t) {
  const e = eio(prog(t, 19.5, 20.8)), s = eio(prog(t, 20.6, 21.2));
  const drops = [[380, 820], [700, 940], [520, 1120]];
  const inner = `${skin()}${drops.map(([x, y], k) => sweat(x, y, 34 * (1 - .6 * e)) + [0, 1, 2, 3].map(i => bacterium(x + Math.cos(i * 1.6 + k) * 70, y + Math.sin(i * 1.6 + k) * 50, 1.2, i * 40 + t * 60)).join('') + smell(x, y - 60, t, s, K.odor, 2, 1.4)).join('')}`;
  return `${BG()}${lens(540, 940, 420, inner, 'l9', { handle: false })}${card(540, 330, 'GERUCH', 70, s, { col: K.odorD })}`;
}
