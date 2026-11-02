// L3a 9.84–12.2: MONTAG. Night bedroom, du lies in bed propped on the pillow, a laptop on the blanket throws cold blue light on his face; digital clock 01:30 on the nightstand in front; on "sechs Stunden" (11.14) a chip "NUR 6 STUNDEN" pops. Full colour again (meter 100 %).
import { K, frame, cam, prog, eio, pop, chip, laptop, pool, dayCard, f1 } from './lib.js';
import { bedDu } from './sets.js';
import { nightRoom, digiClock, standTop, bar } from './base.js';
export default function renderShot(t) {
  let s = nightRoom(t, { dark: .6 });
  const fl = .8 + .2 * Math.sin(t * 9) * Math.sin(t * 3.3);
  s += bedDu(t, { hx: 330, hy: 980, eyes: 'n', look: [14, 8], brows: 'up', mouth: 'small' });
  s += pool(330, 980, 300, 260, '#7fc8ff', .45 * fl);
  s += laptop(640, 1230, .72, { back: true });
  s += pool(640, 1080, 260, 160, '#9fd8ff', .35 * fl);
  s += standTop(900, 1330, 340) + digiClock(900, 1320, '01:30', .95);
  s = cam(s, 540, 1050, 1.0 + .06 * eio(prog(t, 9.84, 12.2)));
  s += dayCard(t, 9.86, 'MONTAG', { y: 330 });
  const c = pop(t, 11.14, .4);
  if (c > 0) s += `<g transform="translate(540 520) scale(${f1(Math.max(.01, c) * 1000) / 1000}) translate(-540 -520)">${chip(540, 520, 'NUR 6 STUNDEN', { size: 48, bg: '#2b3566', fill: '#fff' })}</g>`;
  s += bar(t);
  return frame(s);
}
