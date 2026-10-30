// 27.42–30.04: in the office you can open documents ("Dokumente öffnen" 29.04–29.48) — you click, the document opens on your monitor
import { K, DEFS, bust, monitor, TX, cam, prog, eio, lerp, f1 } from './lib.js';
import { room, desk } from './sets.js';
export default function renderShot(t) {
  const o = eio(prog(t, 29.0, 29.5));
  const scr = `<rect x="30" y="30" width="80" height="70" rx="8" fill="${K.sun}"/>${o > 0 ? `<rect x="${f1(300 - 240 * o)}" y="${f1(170 - 140 * o)}" width="${f1(480 * o)}" height="${f1(300 * o)}" rx="10" fill="${K.white}"/>${o > .8 ? [0, 1, 2, 3].map(i => `<rect x="${100}" y="${70 + i * 50}" width="${300 - i * 40}" height="16" rx="8" fill="${K.greyL}"/>`).join('') : ''}` : ''}`;
  const du = bust('du', 300, 1120, 1.1, { look: 1, lookY: -.3, brow: .1, mouth: o > .8 ? 'smile' : 'flat', aR: [[420, 1300], [lerp(470, 500, eio(prog(t, 28.4, 28.9))), 1260]] });
  return `${DEFS}${cam(`${room(1)}${monitor(680, 820, 560, 340, scr)}${desk(1250)}${du}`, 1, 540, 1000)}`;
}
