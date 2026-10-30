// 24.68–28.92: now you smell of perfume too ("Parfüm" 26.08), while sweat and dirt stay on your skin ("bleiben" 28.64) — pink and green clouds together; lens: sweat drops and dirt still on the skin
import { K, BG, stick, smell, lens, cam, prog, eio, lerp } from './lib.js';
import { skin, sweat, FY, FS } from './sets.js';
export default function renderShot(t) {
  const p = eio(prog(t, 25.8, 26.3)), l = eio(prog(t, 26.8, 27.3));
  const fig = stick(330, FY, FS, { shirt: K.teal, look: .4, mouth: 'flat', brow: 'calm', hL: [250, 1100], hR: [420, 1110] });
  const inner = `${skin()}${sweat(420, 860, 40)}${sweat(640, 1060, 34)}${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${380 + i * 70}" cy="${1180 - (i % 2) * 90}" r="${10 + i % 3 * 4}" fill="${K.dirt}"/>`).join('')}`;
  return `${BG()}${cam(`${fig}${smell(330, 640, t, p, K.perf, 3, 1.3)}${smell(390, 900, t, 1, K.odor, 2, 1)}`, 1, 540, 960)}${l > 0 ? `<g opacity="${l.toFixed(2)}">${lens(780, 880, 230, `<g transform="translate(780 880) scale(.4) translate(-540 -960)">${inner}</g>`, 'l11')}</g>` : ''}`;
}
