// L13 56.14–59.92: "KONKRETER PLAN" (56.8) on a sunny board; three cards pop on the words: WAS (58.4) · WANN (58.98) · WO (59.24).
import { K, frame, cam, label, T, clock, pool, pop, prog, eio, f1 } from './lib.js';
import { kitchen } from './sets.js';
const icon = {
  was: `<rect x="-70" y="-48" width="140" height="96" rx="10" fill="#fff" stroke="${K.ink}" stroke-width="6"/><path d="M -70 -44 L 0 10 L 70 -44" stroke="${K.ink}" stroke-width="6" fill="none"/>`,
  wann: clock(0, 0, 62, 8, 0),
  wo: `<path d="M 0 70 C -60 0 -56 -70 0 -70 C 56 -70 60 0 0 70 Z" fill="${K.red}" stroke="${K.ink}" stroke-width="6"/><circle cx="0" cy="-22" r="22" fill="#fff" stroke="${K.ink}" stroke-width="5"/>`,
};
export default function renderShot(t) {
  let s = cam(kitchen(t, { strong: true }), 540, 960, 1.15);
  s += `<rect width="1080" height="1920" fill="#fff6d8" opacity=".25"/>` + pool(540, 900, 520, 420, '#fff3b0', .35);
  s += label('KONKRETER', 540, 300, 100, { p: pop(t, 56.8, .4) });
  s += label('PLAN', 540, 430, 128, { fill: '#fff', p: pop(t, 57.26, .4) });
  [[58.4, 190, 'WAS', icon.was, -4], [58.98, 540, 'WANN', icon.wann, 3], [59.24, 890, 'WO', icon.wo, -3]].forEach(([t0, x, w, ic, r]) => {
    const p = pop(t, t0, .4); if (p <= 0) return;
    const y = 1000 + Math.sin(t * 2 + x) * 6;
    s += `<g transform="translate(${x} ${f1(y)}) rotate(${r}) scale(${f1(Math.max(.01, p) * 1.12 * 1000) / 1000})"><rect x="-150" y="-200" width="300" height="400" rx="24" fill="#fbf8ef" stroke="${K.ink}" stroke-width="7"/><g transform="translate(0 -60)">${ic}</g>${T(0, 130, w, w.length > 3 ? 74 : 84, { fill: K.txt })}</g>`;
  });
  return frame(cam(s, 540, 860, 1 + .05 * eio(prog(t, 56.14, 59.92))));
}
