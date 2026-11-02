// L12 47.78–51.26 Term card: du (close-up, bottom left, hand on chin, rim light) looks up at the big words
// FUNDAMENTALER / ATTRIBUTIONS- / FEHLER, which stamp in on "fundamentalen" (48.92) and "Attributionsfehler" (49.74).
import { K, frame, cam, setStreet, person, T, pop, f1 } from './lib.js';
import { push } from './base.js';
export default function renderShot(t) {
  let s = setStreet(t, { heavy: true, rain: false });
  s += `<rect x="-80" y="-80" width="1240" height="2080" fill="#0d1226" opacity=".55"/>`;
  s += person('du', 300, 2250, 2.6, { t, seed: 2, look: [8, -9], brows: 'up', mouth: 'flat', armR: [60, -360], rim: '#ffd23f' });
  const w = (txt, y, t0, col, size) => { const p = pop(t, t0, .35); return p > 0 ? `<g transform="translate(540 ${y}) scale(${f1(p * 1000) / 1000}) translate(-540 ${-y})">${T(540, y, txt, size, { fill: col, stroke: K.ink, sw: 20 })}</g>` : ''; };
  let txt = w('FUNDAMENTALER', 380, 48.92, '#fff', 104) + w('ATTRIBUTIONS-', 520, 49.74, K.yellow, 108) + w('FEHLER', 660, 50.1, K.yellow, 130);
  const sub = pop(t, 47.9, .4);
  if (sub > 0) txt += T(540, 230, 'PSYCHOLOGIE', 50, { fill: '#cfe6ff', op: Math.min(1, sub), ls: 6 });
  return frame(cam(s, 540, 1000, push(t, 47.78, 51.26, 1.0, 1.05)) + txt);
}
