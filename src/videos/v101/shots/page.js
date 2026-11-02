// v101 close-up of the diary under the warm lamp: left page date, right page the handwritten list "1. Kaffee / 2. Tür aufgehalten / 3. Foto".
import { K, f1, op, pool, prog, eio, T, cam } from './lib.js';
import { notebook, write } from './props.js';
const INK = K.ink;
export const ITEMS = ['1. Kaffee', '2. Tür aufgehalten', '3. Foto'];
// times: start time of each line (Infinity = not yet), done lines fully written. o.date, o.extra (right page extras, page coords)
export function diary(t, times, o = {}) {
  let s = `<defs><linearGradient id="v101dk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4030"/><stop offset="1" stop-color="#2e2018"/></linearGradient></defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101dk)"/>`;
  s += pool(260, 860, 760, 760, '#ffc46b', .5);
  s += `<g transform="translate(130 330)"><circle r="70" fill="#4f8a5b" stroke="${INK}" stroke-width="5"/><circle cx="34" cy="-26" r="44" fill="#5e9a6a"/></g><g transform="translate(930 360)"><path d="M -56 -86 L 56 -86 L 46 34 L -46 34 Z" fill="#f2efe8" stroke="${INK}" stroke-width="6"/><path d="M 54 -56 C 100 -56 100 6 50 6" fill="none" stroke="${INK}" stroke-width="8"/></g>`;
  const items = o.items || ITEMS;
  let page = '', last = -1;
  items.forEach((txt, i) => { const t0 = times[i]; if (t >= t0) { last = i; page += write(txt, 30, 110 + i * 100, 40, eio(prog(t, t0, t0 + .7)), `d${o.id || ''}${i}`); } });
  if (o.extra) page += o.extra;
  const left = T(200, 90, o.date || 'MONTAG', 44, { fill: '#2f5fb5', w: 800 }) + (o.left || '');
  s += notebook(540, 960, 1.25, { open: 1, left, page });
  // pen at the end of the line being written
  if (last >= 0) {
    const p = eio(prog(t, times[last], times[last] + .7)), len = items[last].length * 22;
    const away = eio(prog(t, times[last] + .8, times[last] + 1.2));
    const px = 540 + 1.25 * (30 + len * p) + away * (1000 - (540 + 1.25 * (30 + len))), py = 960 + 1.25 * (-250 + 110 + last * 100) + Math.sin(t * 20) * 4 * (p < 1 ? 1 : 0) + away * 260;
    s += `<g transform="translate(${f1(px)} ${f1(py)}) rotate(152)"><rect x="-12" y="-220" width="24" height="200" rx="8" fill="#2f5fb5" stroke="${INK}" stroke-width="5"/><path d="M -12 -20 L 0 10 L 12 -20 Z" fill="#e8d8b0" stroke="${INK}" stroke-width="4"/></g><circle cx="${f1(px + 70)}" cy="${f1(py + 130)}" r="34" fill="${INK}"/>`;
  }
  return s;
}
