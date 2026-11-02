// L16b 74.6–78.78: close-up of the diary page with dates; card IN 2 WOCHEN (74.76); the entries get red X marks one after another (76.3–77.4, "eingetroffen"); final question "Wie viele sind eingetroffen?" and the sun drawn in the corner.
import { K, frame, cam, prog, eio, pop, T, pool, label } from './lib.js';
import { notebook, cross, sun } from './props.js';
const ROWS = [['03.11.', 'Ich verliere meinen Job.'], ['04.11.', 'Sie ist sauer auf mich.'], ['05.11.', 'Mein Rücken ist kaputt.'], ['07.11.', 'Ich schaffe das nie.']];
const MARK = [76.32, 76.6, 76.9, 77.2];
export default function renderShot(t) {
  let s = `<defs><linearGradient id="v99dk2" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6a4a36"/><stop offset="1" stop-color="#3e2a20"/></linearGradient></defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v99dk2)"/>`;
  s += pool(420, 760, 700, 700, '#ffc46b', .55);
  let left = T(200, 70, 'MEINE SORGEN', 34, { fill: '#22324d' });
  let page = T(200, 70, 'EINGETROFFEN?', 32, { fill: '#22324d' });
  ROWS.forEach(([d, w], i) => { const y = 150 + i * 90; left += T(24, y, d, 26, { anchor: 'start', fill: '#2f5fb5', w: 800 }) + T(24, y + 36, w, 25, { anchor: 'start', fill: '#22324d', w: 700 }); page += `<path d="M 30 ${y + 46} H 370" stroke="#e5dcc5" stroke-width="2"/>`; });
  s += `<g transform="translate(540 860) scale(1.25)">` + notebook(0, 0, 1, { open: 1, left, page }) + `</g>`;
  MARK.forEach((m, i) => { s += cross(540 + 1.25 * 200, 860 + 1.25 * (-250 + 150 + i * 90 + 10), .9, prog(t, m, m + .25)); });
  s += sun(540 + 1.25 * 320, 860 + 1.25 * 200, 30, t, eio(prog(t, 77.6, 78.1)));
  s = cam(s, 540, 860, 1.0 + .06 * eio(prog(t, 74.6, 78.78)));
  s += label('IN 2 WOCHEN', 540, 250, 104, { p: pop(t, 74.76, .45) });
  return frame(s);
}
