// L14 55.4–58.92: du sleeps deeply (closed eyes, small smile) in the moonlit bedroom; "8 STUNDEN" chip on "acht Stunden" (55.98); the moon moves across the window and on "nächsten Nacht wieder" (57.68) a second chip "NACHT 2: 8 STUNDEN" replaces it. Colour visibly returns (meter rising).
import { K, frame, cam, prog, eio, pop, chip, f1, T } from './lib.js';
import { bedDu } from './sets.js';
import { nightRoom, digiClock, standTop, fadeWorld, bar } from './base.js';
export default function renderShot(t) {
  const m = prog(t, 55.4, 58.92);
  let s = nightRoom(t, { dark: .45, warm: .4, mx: 700 + 240 * m, my: 330 + 60 * Math.sin(m * Math.PI) * -1 + 40 });
  s += bedDu(t, { hx: 330, hy: 980, eyes: 'closed', brows: 'calm', mouth: 'smile', blink: false, tilt: -8 + 2 * Math.sin(t * 1.3) });
  for (let i = 0; i < 3; i++) { const p = (t * .45 + i / 3) % 1; s += T(470 + 60 * p + i * 10, 820 - 160 * p, 'z', 46 + 16 * i, { fill: '#fff', op: Math.sin(p * Math.PI) * .8 }); }
  s += standTop(870, 1330, 360) + digiClock(870, 1320, t < 57.6 ? '06:00' : '06:00', 1);
  s += fadeWorld(t);
  s = cam(s, 540, 1050, 1.0 + .05 * eio(m));
  const a = pop(t, 55.98, .4) * (t < 57.6 ? 1 : 0), b = pop(t, 57.68, .4);
  if (a > 0) s += `<g transform="translate(540 420) scale(${f1(Math.max(.01, a) * 1000) / 1000}) translate(-540 -420)">${chip(540, 420, '8 STUNDEN SCHLAF', { size: 50, bg: K.green, fill: '#fff' })}</g>`;
  if (b > 0) s += `<g transform="translate(540 420) scale(${f1(Math.max(.01, b) * 1000) / 1000}) translate(-540 -420)">${chip(540, 420, 'NACHT 2: WIEDER 8 STUNDEN', { size: 46, bg: K.green, fill: '#fff' })}</g>`;
  s += bar(t);
  return frame(s);
}
