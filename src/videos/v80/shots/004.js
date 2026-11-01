// 19.98–25.46: belief – the more humble and polite, the more likely a yes
import { K, bg, headline, fig, poseAt, fade, pop, chip, T, badge, eout, prog } from './lib.js';
export default function renderShot(t) {
  const ich = fig(330, 1340, 1.25, 'ich', poseAt(t, [[19.98, 'stand'], [21.08, 'bow'], [21.8, 'deepbow']]));
  const other = fig(820, 1340, 1.2, 'x', 'stand', { f: -1 });
  const ar = eout(prog(t, 21.0, 22.4));
  const arrow = `<g opacity="${fade(t, 21.0)}"><line x1="150" y1="1100" x2="150" y2="${1100 - 330 * ar}" stroke="${K.ink}" stroke-width="16" stroke-linecap="round"/><path d="M 115 ${1100 - 330 * ar + 30} L 150 ${1100 - 330 * ar - 14} L 185 ${1100 - 330 * ar + 30} Z" fill="${K.ink}"/></g>`;
  return bg(K.pink) + chip(540, 200, 'ICH DACHTE', { size: 44, bg: K.ink2, a: fade(t, 20.0) })
    + headline(t, 340, '', 84, { t0: 21.08, lines: ['BESCHEIDENER', '+ HÖFLICHER'] })
    + headline(t, 590, '= EHER EIN JA?', 76, { t0: 23.5, mark: { word: 'JA?', t: 24.36, color: K.greenL } })
    + arrow + ich + other + badge(820, 820, 48, 'q', { a: fade(t, 24.36), sc: pop(t, 24.36) });
}
