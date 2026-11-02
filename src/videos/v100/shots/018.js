// L9b 39.98–41.14: close-up of the battery over du's tired head: 30 % → 5 %, red and blinking on "blinkt rot" (40.3–40.58); red glow on the face.
import { frame, cam, head, prog, eio, room, battery, duBat, pool, K } from './all.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 40, strong: true, light: .3 });
  const b = duBat(t);
  const red = t >= 40.3 ? (Math.sin(t * Math.PI * 4) > 0 ? 1 : .35) : 0;
  s += head('du', 540, 1420, 1.8, { t, seed: 1, eyes: 'half', brows: 'sad', mouth: 'frown', look: [0, -12] });
  s += `<path d="M 120 2000 C 140 1760 320 1700 540 1700 C 760 1700 940 1760 960 2000 Z" fill="${K.du}" stroke="${K.ink}" stroke-width="6"/>`;
  s += pool(540, 1200, 500, 400, '#ff4a3a', .3 * red);
  s += battery(540, 700, 1.9, b.lvl, { t, blink: b.blink, drop: b.drop });
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 39.98, 41.14))), { base: '#1c2230' });
}
