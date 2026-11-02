// L9b 44.6–48.06: close-up of a diary page: handwritten worries with dates; on "geprüft" (45.58) the researcher's red pen marks each one: red X = nicht eingetroffen (four of five), one green check; label NICHT EINGETROFFEN.
import { K, frame, cam, prog, eio, pop, T, f1, label } from './lib.js';
import { hall } from './sets.js';
import { notebook, cross, check } from './props.js';
const INK = K.ink;
const ROWS = [['Mo', 'Ich verliere meinen Job.'], ['Di', 'Ich komme zu spät.'], ['Mi', 'Ich bin krank.'], ['Do', 'Sie ist sauer.'], ['Fr', 'Der Zug fällt aus.']];
const MARK = [45.6, 46.0, 46.4, 46.8, 47.2];
export default function renderShot(t) {
  let s = hall(t, { strong: true });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#2a2018" opacity=".25"/>`;
  let page = '';
  ROWS.forEach(([d, w], i) => { const y = 120 + i * 80; page += T(30, y, d, 28, { anchor: 'start', fill: '#7a838c', w: 800 }) + T(80, y, w, 26, { anchor: 'start', fill: '#22324d', w: 700 }); });
  let left = T(200, 90, 'MEINE SORGEN', 34, { fill: '#22324d' }) + `<g stroke="#22324d" stroke-width="5" fill="none"><path d="M 120 180 q 40 -50 80 0 t 80 0"/></g>` + T(200, 300, '10 Tage', 40, { fill: '#2f5fb5', w: 800 });
  s += `<g transform="translate(540 820) scale(1.25)">` + notebook(0, 0, 1, { open: 1, left, page }) + `</g>`;
  // marks in world coords (page right half: x 540..1040 world)
  MARK.forEach((m, i) => { const p = prog(t, m, m + .3), x = 540 + 1.25 * 370, y = 820 + 1.25 * (-250 + 112 + i * 80); s += i === 4 ? check(x - 20, y, 1.1, '#3c9a5f', p) : cross(x - 20, y, .8, p); });
  // red pen following the marks
  let cur = 0; MARK.forEach((m, i) => { if (t > m - .2) cur = i; });
  const px = 540 + 1.25 * 370 + 20, py = 820 + 1.25 * (-250 + 100 + cur * 80) + 40 * Math.sin(prog(t, MARK[cur], MARK[cur] + .3) * Math.PI);
  if (t > 45.3) s += `<g transform="translate(${f1(px)} ${f1(py)}) rotate(28)"><rect x="-12" y="-220" width="24" height="200" rx="8" fill="#d9493f" stroke="${INK}" stroke-width="5"/><path d="M -12 -20 L 0 10 L 12 -20 Z" fill="#e8d8b0" stroke="${INK}" stroke-width="4"/></g><circle cx="${f1(px + 70)}" cy="${f1(py - 110)}" r="34" fill="${INK}"/>`;
  s = cam(s, 540, 820, 1.0 + .05 * eio(prog(t, 44.6, 48.06)));
  s += label('NICHT EINGETROFFEN', 540, 260, 78, { p: pop(t, 46.0, .45), fill: '#ffffff' });
  return frame(s);
}
