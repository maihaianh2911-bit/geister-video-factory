// L8b 44.00–46.60: a study participant (yellow cap, green top) at a desk writes an honest compliment card to an acquaintance ("schrieben" 44.32);
// the pen moves and the ink lines grow on the card.
import { frame, cam, prog, eio, person, f1, K, armW } from './lib.js';
import { office, desk } from './sets.js';
export default function renderShot(t) {
  let s = office(t);
  const w = prog(t, 44.3, 46.4);
  s += person('stu', 540, 1560, 1, { t, seed: 11, look: [0, 14], brows: 'calm', mouth: 'soft' });
  s += desk(t, { y: 1180, monitor: false, keyboard: false, mugX: 900 });
  // card on the desk with the writing growing
  let card = `<g transform="rotate(-3 540 1290)"><rect x="330" y="1210" width="420" height="180" rx="10" fill="#fdf6e3" stroke="${K.ink}" stroke-width="5"/>`;
  card += `<path d="M 380 1260 C 360 1240 340 1260 360 1280 L 380 1300 L 400 1280 C 420 1260 400 1240 380 1260 Z" fill="#e05a5a"/>`;
  [[430, 1265, 280], [380, 1315, 330], [380, 1360, 200]].forEach(([x, y, len], i) => {
    const l = len * Math.max(0, Math.min(1, w * 3 - i));
    if (l > 1) card += `<path d="M ${x} ${y} h ${f1(l)}" stroke="#2f5fb5" stroke-width="7" stroke-linecap="round" stroke-dasharray="18 6"/>`;
  });
  s += card + '</g>';
  // pen hand follows the current line
  const li = Math.min(2, Math.floor(w * 3)), lp = cl01(w * 3 - li);
  const row = [[430, 1265, 280], [380, 1315, 330], [380, 1360, 200]][li];
  const px = row[0] + row[2] * lp + Math.sin(t * 18) * 4, py = row[1] - 6 + Math.cos(t * 23) * 3;
  s += armW(640, 1050, 720, 1200, px + 18, py - 30, '#7aa27a');
  s += armW(440, 1050, 360, 1180, 360, 1230, '#7aa27a');
  s += `<g transform="translate(${f1(px)} ${f1(py)}) rotate(28)"><rect x="-9" y="-130" width="18" height="120" rx="6" fill="#2f5fb5" stroke="${K.ink}" stroke-width="4"/><path d="M -9 -10 L 0 12 L 9 -10 Z" fill="#e8d8b0" stroke="${K.ink}" stroke-width="4"/></g>`;
  return frame(cam(s, 540, 1100, 1.06 + .06 * eio(prog(t, 44, 46.6))));
}
const cl01 = x => Math.max(0, Math.min(1, x));
