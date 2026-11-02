// L13 49.30–53.06: two researchers (bun / glasses, lab coat) in the library; chip "KALIFORNIEN" on "Kalifornien" (50.7); red stamp "GEGENTEIL" on "Gegenteil" (52.08).
import { K, frame, cam, person, shadow, chip, paper, T, pop, prog, eio, f1 } from './lib.js';
import { library, libTable } from './sets.js';
export default function renderShot(t) {
  let s = library(t);
  const talk = Math.sin(t * 12) > 0;
  s += person('res1', 300, 1640, .98, { t, seed: 3, look: [14, 0], brows: 'calm', mouth: talk ? 'talk' : 'smile', armR: [190, -480], elbowR: [230, -380], front: paper(200, -500, 150, 190, 6, '', {}) });
  s += person('res2', 780, 1640, .98, { t, seed: 8, look: [-14, 0], brows: 'up', mouth: 'smile', armL: [-250, -780 + Math.sin(t * 5) * 10], elbowL: [-230, -560] });
  s += libTable(1440, [540]);
  s = cam(s, 540, 1100, 1.0 + .06 * eio(prog(t, 49.3, 53.06)), -20 * prog(t, 49.3, 53.06), 0);
  s += `<g transform="translate(540 190) scale(${Math.max(.01, pop(t, 49.54, .4))})">${chip(0, 0, '2 FORSCHERINNEN', { size: 42 })}</g>`;
  s += `<g transform="translate(540 300) scale(${Math.max(.01, pop(t, 50.7, .4))})">${chip(0, 0, 'KALIFORNIEN', { size: 56, bg: K.yellow })}</g>`;
  const p = pop(t, 52.08, .3);
  if (p > 0) s += `<g transform="translate(540 560) rotate(-8) scale(${f1(Math.max(.01, p) * 1000) / 1000})"><rect x="-300" y="-70" width="600" height="140" rx="16" fill="none" stroke="${K.red}" stroke-width="12"/>${T(0, 28, 'GEGENTEIL', 84, { fill: K.red })}</g>`;
  return frame(s);
}
