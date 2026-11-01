// 71.38–75.52: my colleague Châu works smoothly with every department
import { K, bg, fade, pop, prog, eout, fig, chip, headline, badge } from './lib.js';
export default function renderShot(t) {
  const cx = 540, cy = 860;
  const deps = [[200, 560], [880, 560], [200, 1160], [880, 1160]];
  let g = '';
  deps.forEach(([x, y], i) => {
    const a = fade(t, 73.42 + i * .15), d = eout(prog(t, 74.36 + i * .1, 74.8 + i * .1));
    g += `<line x1="${cx}" y1="${cy}" x2="${cx + (x - cx) * d}" y2="${cy + (y - cy) * d}" stroke="${K.green}" stroke-width="12" stroke-linecap="round" opacity="${a}"/>`;
    g += `<g opacity="${a}"><circle cx="${x}" cy="${y}" r="110" fill="#fff" stroke="${K.ink}" stroke-width="6"/>${fig(x, y + 95, .42, i === 0 ? 'trang' : 'x', 'stand')}</g>`;
    g += badge(x + 80, y - 80, 30, 'check', { a: fade(t, 74.5 + i * .1), sc: pop(t, 74.5 + i * .1) });
  });
  return bg(K.mint) + headline(t, 260, 'ALLE ABTEILUNGEN', 88, { t0: 73.42 }) + g
    + `<circle cx="${cx}" cy="${cy}" r="170" fill="${K.butter}" stroke="${K.ink}" stroke-width="6"/>` + fig(cx, cy + 150, .72, 'chau', 'stand', { smile: 1 })
    + chip(cx, cy + 215, 'CHÂU', { size: 46, bg: K.blue, a: fade(t, 72.0), sc: pop(t, 72.0) })
    + chip(540, 1300, 'REIBUNGSLOS', { size: 52, bg: K.green, a: fade(t, 74.36), sc: pop(t, 74.36) });
}
