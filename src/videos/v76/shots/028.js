// 50.76–52.06: the bubble shows a pain burst that is crossed out — KEIN SCHMERZ ("Schmerz" 51.22); the patient looks relieved.
import { K, DEFS, TX, cam, bubble, pain, crossOut, prog, eout } from './lib.js';
import { theatre } from './t46.js';
import { bandage } from './026.js';
export default function renderShot(t) {
  const x = eout(prog(t, 51.15, 51.5));
  const inner = `<g>${pain(330, 330, 30, 1, t)}${crossOut(330, 330, 95, x)}${TX('KEIN', 640, 310, 76, K.ink)}${TX('SCHMERZ', 640, 390, 76, K.red)}</g>`;
  const sc = theatre(t, { lean: 1, pt: { neck: bandage, face: { t, eyes: 'open', look: .6, mouth: t < 51.4 ? 'talk' : 'smile', brow: 0 } },
    warren: { x: 830, look: -.9, lookY: .2, brow: x > .5 ? .1 : .5, mouth: x > .5 ? 'smile' : 'flat' } });
  return `${DEFS}${cam(sc, 1.45, 640, 920, -60, 0)}${bubble(540, 340, 720, 260, 1, inner, 520, 560)}`;
}
