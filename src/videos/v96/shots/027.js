// L17a 74.96–78.8: medium at the desk: du concentrates ("konzentrieren" 76.12); a phone face down beside the keyboard gets a red cross on "nicht nur weg" (78.24): just turning it over is not enough.
import { K, frame, cam, prog, eio, pop, label, chip, f1, op } from './lib.js';
import { studyRoom, desk } from './sets.js';
import { duHG, phoneDown, screenGlow } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = studyRoom(t);
  const conc = t >= 76.1;
  s += duHG(440, 1640, 1, { t, seed: 1, look: conc ? [0, 16] : [8, 10], brows: conc ? 'strain' : 'calm', mouth: 'flat', legs: false }, { glow: .05 });
  const ph = t >= 77.4 ? 1 : 0;
  let ex = '';
  if (ph) {
    const w = t >= 77.9 ? .5 + .5 * Math.sin(t * 14) : 0;
    ex += phoneDown(760, 1345, 1.1, -4);
    if (w > 0) ex += `<g stroke="#7fd4ff" stroke-width="7" fill="none" stroke-linecap="round" opacity="${op(w)}"><path d="M 660 1300 q -20 -30 0 -60"/><path d="M 860 1300 q 20 -30 0 -60"/></g>`;
    const x = pop(t, 78.24, .35);
    if (x > 0) ex += `<g transform="translate(760 1310) scale(${f1(x * 1000) / 1000})"><path d="M -90 -90 L 90 90 M 90 -90 L -90 90" stroke="${INK}" stroke-width="36" stroke-linecap="round"/><path d="M -90 -90 L 90 90 M 90 -90 L -90 90" stroke="#d9493f" stroke-width="22" stroke-linecap="round"/></g>`;
  }
  s += desk(t, { y: 1300, monitor: false, kbX: 400, mugX: 120, extra: ex + `<g transform="translate(400 1270)"><rect x="-150" y="-40" width="300" height="40" fill="#fbf8ef" stroke="${INK}" stroke-width="4"/></g>` });
  s = cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 74.96, 78.8)));
  s += label('NICHT NUR WEG', 540, 250, 96, { p: pop(t, 78.3, .4) });
  return frame(s);
}
