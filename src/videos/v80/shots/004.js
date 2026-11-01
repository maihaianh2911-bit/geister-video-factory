// 20.34–26.18: belief – the more humble and polite, the more likely a yes
import { K, bg, headline, fig, poseAt, fade, pop, chip, T, badge, eout, prog } from './lib.js';
export default function renderShot(t) {
  const ich = fig(330, 1340, 1.25, 'ich', poseAt(t, [[20.34, 'stand'], [21.56, 'bow'], [22.24, 'deepbow']]));
  const other = fig(820, 1340, 1.2, 'x', 'stand', { f: -1 });
  const ar = eout(prog(t, 21.46, 22.9));
  const arrow = `<g opacity="${fade(t, 21.46)}"><line x1="150" y1="1100" x2="150" y2="${1100 - 330 * ar}" stroke="${K.ink}" stroke-width="16" stroke-linecap="round"/><path d="M 115 ${1100 - 330 * ar + 30} L 150 ${1100 - 330 * ar - 14} L 185 ${1100 - 330 * ar + 30} Z" fill="${K.ink}"/></g>`;
  return bg(K.pink) + chip(540, 200, 'ICH DACHTE', { size: 44, bg: K.ink2, a: fade(t, 20.35) })
    + headline(t, 340, '', 84, { t0: 21.56, lines: ['BESCHEIDENER', '+ HÖFLICHER'] })
    + headline(t, 590, '= EHER EIN JA?', 76, { t0: 24.2, mark: { word: 'JA?', t: 24.98, color: K.greenL } })
    + arrow + ich + other + badge(820, 820, 48, 'q', { a: fade(t, 24.98), sc: pop(t, 24.98) });
}
