// 210.52–220.08: five minutes later – figures exported, project codes added on his own, no searching one by one
import { K, bg, fade, pop, prog, chip, clock, T, headline, badge, crossOut } from './lib.js';
export default function renderShot(t) {
  const ta = fade(t, 212.22), pc = fade(t, 214.66);
  let rows = '';
  for (let r = 0; r < 4; r++) {
    const y = 640 + r * 90, ra = fade(t, 212.22 + r * .15);
    rows += `<g opacity="${ra}"><rect x="110" y="${y}" width="400" height="76" rx="10" fill="${r ? '#fff' : K.blueL}" stroke="${K.ink}" stroke-width="4"/>${T(310, y + 52, r ? String(1200 + r * 345) : 'ZAHLEN', 40)}</g>`;
    rows += `<g opacity="${pc}"><rect x="520" y="${y}" width="330" height="76" rx="10" fill="${r ? K.butter : K.yellow}" stroke="${K.ink}" stroke-width="4"/>${T(685, y + 52, r ? 'P-0' + (r + 3) : 'PROJEKTCODE', r ? 40 : 34)}</g>`;
  }
  const mg = `<g opacity="${fade(t, 217.1)}" transform="translate(300 1180)"><circle r="70" fill="#fff" stroke="${K.ink}" stroke-width="14"/><line x1="50" y1="50" x2="110" y2="110" stroke="${K.ink}" stroke-width="22" stroke-linecap="round"/></g>`;
  return bg(K.mint) + clock(200, 330, 95, 5, { sector: 5 / 60, secCol: K.green }) + headline(t, 330, '', 76, { lines: ['  5 MIN SPÄTER'] }).replace('x="540"', 'x="640"')
    + rows + badge(470, 600, 40, 'check', { a: fade(t, 212.5), sc: pop(t, 212.5) })
    + chip(685, 570, '+ VON SICH AUS', { size: 38, bg: K.green, a: pc, sc: pop(t, 214.66) })
    + mg + crossOut(210, 1090, 220, 220, prog(t, 217.82, 218.5))
    + chip(700, 1180, 'NICHT EINZELN SUCHEN', { size: 38, bg: K.ink, a: fade(t, 217.5) });
}
