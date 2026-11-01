// 229.34–239.6: example – "Lisa, you've booked meeting rooms often and know it better than me: which room fits?"
import { K, bg, fade, pop, fig, poseAt, chip, bubble, T, badge } from './lib.js';
export function rooms(t, pick, o = {}) {
  let g = '';
  [0, 1, 2].forEach(i => {
    const x = 470 + i * 160, a = o.a === undefined ? 1 : o.a;
    const on = pick === i ? o.on || 0 : 0;
    g += `<g opacity="${a}"><rect x="${x - 65}" y="890" width="130" height="250" rx="10" fill="${on > 0 ? K.greenL : '#fff'}" stroke="${K.ink}" stroke-width="6"/><circle cx="${x + 38}" cy="1020" r="9" fill="${K.ink}"/>${T(x, 950, 'R' + (i + 1), 46)}</g>`;
  });
  return g;
}
export default function renderShot(t) {
  const tr = fig(190, 1340, 1.1, 'lisa', poseAt(t, [[229.34, 'stand'], [237.24, 'think']]));
  const b = bubble(70, 300, 940, [{ s: 'Lisa, du hast schon oft Besprechungsräume gebucht.', a: fade(t, 230.42) }, { s: 'Du kennst dich besser aus als ich.', a: fade(t, 233.54) }], { size: 54, a: fade(t, 230.23), fill: K.greenL, tail: [200, 860] });
  return bg(K.butter) + chip(540, 200, 'ZUM BEISPIEL', { size: 44, bg: K.orange }) + b.svg + tr + chip(190, 1300, 'LISA', { size: 34, bg: K.purple })
    + rooms(t, -1, { a: fade(t, 236.23) }) + chip(630, 1240, 'WELCHER RAUM PASST?', { size: 42, bg: K.ink, a: fade(t, 236.9), sc: pop(t, 236.9) })
    + badge(630, 820, 44, 'q', { a: fade(t, 237.22), sc: pop(t, 237.22) });
}
