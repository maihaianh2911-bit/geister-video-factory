// 48.68–50.76: the patient touches the bandage; speech bubble with scratch marks and KRATZEN ("Kratzen" 49.1).
import { K, DEFS, TX, cam, bubble, prog, eio, eout, lerp, f1 } from './lib.js';
import { theatre } from './t46.js';
import { bandage } from './026.js';
export default function renderShot(t) {
  const touch = eio(prog(t, 48.7, 49.1)), b = eout(prog(t, 49.0, 49.3));
  const scratch = [0, 1, 2].map(i => `<path d="M ${-270 + i * 45} -60 L ${-230 + i * 45} 20" stroke="${K.red}" stroke-width="12" stroke-linecap="round" stroke-dasharray="120" stroke-dashoffset="${f1(120 * (1 - eout(prog(t, 49.1 + i * .12, 49.35 + i * .12))))}"/>`).join('');
  const inner = `<g transform="translate(540 330)">${scratch}${TX('KRATZEN', 110, 28, 80, K.ink, 'middle')}</g>`;
  const sc = theatre(t, { lean: 1, pt: { neck: bandage, face: { t, eyes: 'open', look: .6, lookY: 0, mouth: 'talk' }, aR: [[lerp(640, 660, touch), lerp(1000, 960, touch)], [lerp(610, 585, touch), lerp(1100, 872, touch)]] },
    warren: { x: 830, look: -.9, lookY: .2, brow: .6 } });
  return `${DEFS}${cam(sc, 1.45, 640, 920, -60, 0)}${bubble(540, 330, 720, 260, b, inner, 520, 560)}`;
}
