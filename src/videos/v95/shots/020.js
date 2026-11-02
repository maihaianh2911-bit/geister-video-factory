// L14a 53.06–56.88: students after a bad test (paper "5" on "schlechten Test" 54.22); two groups split on "freundlich" (55.02): HART ZU SICH (left, cold) / FREUNDLICH ZU SICH (right, warm).
import { K, frame, cam, person, paper, label, chip, T, pool, prog, eio, pop, f1 } from './lib.js';
import { library, libTable } from './sets.js';
export default function renderShot(t) {
  let s = library(t);
  const split = eio(prog(t, 55.02, 55.5));
  s += `<rect x="0" y="0" width="540" height="1920" fill="#20304a" opacity="${f1(.35 * split)}"/>` + pool(810, 900, 300, 500, '#ffd98a', .35 * split);
  s += person('stu1', 270, 1640, .86, { t, seed: 2, look: [6, 14], brows: split > .5 ? 'angry' : 'sad', mouth: 'frown', hunch: .3 });
  s += person('stu2', 810, 1640, .86, { t, seed: 5, look: [-6, 14], brows: split > .5 ? 'calm' : 'sad', mouth: split > .5 ? 'smile' : 'frown' });
  s += libTable(1420, []);
  s += paper(270, 1440, 220, 150, -6, T(40, 40, '5', 80, { fill: K.red }) + `<rect x="-90" y="-40" width="100" height="12" rx="6" fill="#9aa6b4"/><rect x="-90" y="-10" width="80" height="12" rx="6" fill="#9aa6b4"/>`, { lines: false });
  s += paper(810, 1440, 220, 150, 5, T(40, 40, '5', 80, { fill: K.red }) + `<rect x="-90" y="-40" width="100" height="12" rx="6" fill="#9aa6b4"/><rect x="-90" y="-10" width="80" height="12" rx="6" fill="#9aa6b4"/>`, { lines: false });
  s = cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 53.06, 56.88)));
  s += `<g transform="translate(540 220) scale(${Math.max(.01, pop(t, 54.22, .4))})">${chip(0, 0, 'SCHLECHTER TEST', { size: 50, bg: '#ff8a7a' })}</g>`;
  s += label('HART', 270, 420, 76, { fill: '#9fc3ff', p: pop(t, 55.02, .4) }) + label('ZU SICH', 270, 500, 56, { fill: '#fff', p: pop(t, 55.1, .4) });
  s += label('FREUNDLICH', 810, 420, 64, { fill: K.yellow, p: pop(t, 55.02, .4) }) + label('ZU SICH', 810, 500, 56, { fill: '#fff', p: pop(t, 55.1, .4) });
  return frame(s);
}
