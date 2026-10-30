// 24.30–26.72: the surgeon works fast over the sheet (quick hand movements, motion streaks); card TEMPO ("Vorteil" 25.46).
import { K, DEFS, cam, card, prog, eout, f1 } from './lib.js';
import { orScene } from './or.js';
export default function renderShot(t) {
  const fast = Math.sin(t * 16), c = eout(prog(t, 25.3, 25.6));
  const streak = `<g opacity=".6">${[0, 1, 2].map(i => `<path d="M ${680 + i * 30} ${f1(980 - i * 18)} q 60 ${f1(-30 * fast)} 120 0" fill="none" stroke="${K.lamp}" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>`;
  const sc = orScene(t, { inA: 1, inB: 1, gripA: 1, gripB: 1, lift: 4, face: { eyes: 'closed', brow: 1, mouth: 'grit' }, saw: 'hand', sawUp: .15 + .12 * fast, surg: { look: -.4, lookY: .9, brow: .5 }, over: streak });
  return `${DEFS}${cam(sc, 1.25, 540, 1000, 0, 120)}${card(540, 330, 'TEMPO', 'ein wichtiger Vorteil', c, K.orange, 130)}`;
}
