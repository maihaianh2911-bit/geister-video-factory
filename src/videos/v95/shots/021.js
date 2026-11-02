// L14b 56.88–59.40: both groups study again: the left study-time bar stops short, the right one keeps growing on "länger" (57.54); no numbers.
import { K, frame, cam, person, label, T, pool, prog, eio, pop, f1 } from './lib.js';
import { library, libTable } from './sets.js';
export default function renderShot(t) {
  let s = cam(library(t), 540, 960, 1.1);
  s += `<rect x="0" y="0" width="540" height="1920" fill="#20304a" opacity=".35"/>` + pool(810, 900, 300, 500, '#ffd98a', .35);
  const l = eio(prog(t, 56.9, 57.4)) * .3, r = eio(prog(t, 56.9, 58.8)) * .9;
  const bar = (x, p, col) => `<rect x="${x - 70}" y="420" width="140" height="760" rx="20" fill="#fff" opacity=".85" stroke="${K.ink}" stroke-width="6"/><rect x="${x - 56}" y="${f1(1166 - 732 * p)}" width="112" height="${f1(732 * p)}" rx="14" fill="${col}"/>`;
  s += bar(270, l, '#7f9cff') + bar(810, r, K.yellow);
  // small clocks above the bars, hands spin while the bar grows
  const clk = (x, ang) => `<circle cx="${x}" cy="340" r="54" fill="#fff" stroke="${K.ink}" stroke-width="6"/><path d="M ${x} 340 L ${f1(x + 38 * Math.sin(ang))} ${f1(340 - 38 * Math.cos(ang))}" stroke="${K.red}" stroke-width="8" stroke-linecap="round"/>`;
  s += clk(270, l * 20) + clk(810, r * 20);
  s += person('stu1', 270, 1700, .62, { t, seed: 2, look: [0, 14], brows: 'sad', mouth: 'flat', eyes: 'tired' });
  s += person('stu2', 810, 1700, .62, { t, seed: 5, look: [0, 14], brows: 'calm', mouth: 'smile' });
  s += libTable(1500, []);
  s += label('LERNEN', 540, 160, 70, { p: pop(t, 56.88, .4) });
  s += label('LÄNGER', 810, 262, 60, { fill: '#fff', p: pop(t, 57.54, .4) });
  return frame(s);
}
