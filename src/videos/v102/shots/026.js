// L15b 65.78–67.38: the test: card 1 WOCHE; seven nights fill one after another with a moon and "8 h" in green (65.9 → 66.8); du sleeps smiling below.
import { frame, cam, prog, eio, label, pop } from './lib.js';
import { labBg, nights } from './graph.js';
import { bedDu } from './sets.js';
import { farbeBar, colourAt } from './common.js';
export default function renderShot(t) {
  let s = labBg(t);
  s += nights(t, 540, 640, 7, 65.9, .14, '8 h', { hdr: '#3c9a5f', col: '#3c9a5f' });
  s += `<g transform="translate(170 440) scale(.6)">${bedDu(t, { hx: 330, hy: 1010, eyes: 'closed', mouth: 'smile', brows: 'calm', blink: false })}</g>`;
  s = cam(s, 540, 800, 1.05 + .05 * eio(prog(t, 65.78, 67.38)));
  s += label('1 WOCHE', 540, 330, 104, { p: pop(t, 66.0, .45) });
  s += farbeBar(colourAt(t));
  return frame(s);
}
