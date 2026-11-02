// L8b 44.00–46.60: a study participant (yellow cap, green top) writes an honest compliment card to an acquaintance ("schrieben" 44.32).
import { frame, cam, shadow, prog, eio, person, f1, K, T, plant } from './lib.js';
import { office, desk } from './sets.js';
export default function renderShot(t) {
  let s = office(t);
  const w = prog(t, 44.3, 46.4);
  const px = 470 + 140 * w + Math.sin(t * 18) * 6, py = 1450 + Math.cos(t * 23) * 4;
  s += person('stu', 520, 1700, 1, { t, seed: 11, look: [4, 14], brows: 'calm', mouth: 'soft', armR: [px - 520, py - 1700], elbowR: [200, -380], armL: [-120, -260], elbowL: [-220, -380] });
  s += desk(t, { y: 1420, monitor: false, keyboard: false, mugX: 900 });
  // card on the desk with the writing growing
  let card = `<rect x="330" y="1440" width="420" height="200" rx="10" fill="#fdf6e3" stroke="${K.ink}" stroke-width="5" transform="rotate(-3 540 1540)"/>`;
  card += `<path d="M 380 1500 C 360 1480 340 1500 360 1520 L 380 1540 L 400 1520 C 420 1500 400 1480 380 1500 Z" fill="#e05a5a" transform="rotate(-3 540 1540)"/>`;
  [[430, 1505, 280], [380, 1555, 330], [380, 1600, 200]].forEach(([x, y, len], i) => {
    const l = len * Math.max(0, Math.min(1, w * 3 - i));
    if (l > 1) card += `<path d="M ${x} ${y} h ${f1(l)}" stroke="#2f5fb5" stroke-width="7" stroke-linecap="round" stroke-dasharray="18 6" transform="rotate(-3 540 1540)"/>`;
  });
  s += card;
  s += `<g transform="translate(${f1(px)} ${f1(py)}) rotate(28)"><rect x="-9" y="-130" width="18" height="120" rx="6" fill="#2f5fb5" stroke="${K.ink}" stroke-width="4"/><path d="M -9 -10 L 0 12 L 9 -10 Z" fill="#e8d8b0" stroke="${K.ink}" stroke-width="4"/></g>`;
  return frame(cam(s, 540, 1250, 1.08 + .06 * eio(prog(t, 44, 46.6))));
}
