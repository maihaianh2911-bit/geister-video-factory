// L6 25.92–28.66: close-up: du reads the same paragraph; counter 1× (26.6) 2× (27.0) 3× ("dreimal" 27.2); frown + sweat on "verstehst ihn nicht" (27.88).
import { K, frame, cam, prog, eio, pop, paper, chip, T, f1, cl } from './lib.js';
import { office2 } from './sets.js';
import { duHG } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  const reads = t < 26.6 ? 1 : t < 27.0 ? 2 : 3;
  const ph = (t - 25.92) % .42 / .42, eyeX = -14 + 28 * ph;
  const lost = t >= 27.88;
  s += duHG(540, 2160, 1.7, { t, seed: 1, look: [eyeX * .6, 14], brows: lost ? 'strain' : 'worried', mouth: lost ? 'wavy' : 'flat', sweat: lost ? 1 : 0, eyes: 'n' }, { s: .55, dx: 210, dy: -40 });
  // document held in the foreground with one highlighted paragraph
  let inner = '';
  inner += `<rect x="-300" y="-150" width="600" height="${f1(110)}" rx="8" fill="#ffd23f" opacity=".55"/>`;
  inner += `<g fill="#55606e">${[-130, -100, -70, -40].map((y, i) => `<rect x="-280" y="${y}" width="${[540, 520, 560, 380][i]}" height="14" rx="7"/>`).join('')}${[20, 50, 80, 110, 140].map((y, i) => `<rect x="-280" y="${y}" width="${[520, 560, 500, 540, 300][i]}" height="14" rx="7" opacity=".6"/>`).join('')}</g>`;
  inner += `<path d="M ${f1(-280 + 540 * ph)} -152 v 112" stroke="#d9493f" stroke-width="6"/>`;
  s += paper(540, 1480, 680, 420, -3, inner, { lines: false });
  s = cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 25.92, 28.66)) + (lost ? .05 * eio(prog(t, 27.88, 28.2)) : 0));
  for (let i = 0; i < reads; i++) s += chip(250 + i * 150, 300, `${i + 1}×`, { size: 60, bg: i === 2 ? '#ffd23f' : '#fff', a: cl(pop(t, [25.95, 26.6, 27.2][i], .3) * 2) });
  return frame(s);
}
