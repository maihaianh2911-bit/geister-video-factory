// 26.18–34.48: reality – the more polite, the more annoyed / offhand / ignored
import { K, bg, headline, fig, poseAt, fade, pop, chip, badge } from './lib.js';
export default function renderShot(t) {
  const ich = fig(300, 1340, 1.25, 'ich', poseAt(t, [[26.18, 'bow'], [29.38, 'deepbow']]));
  const other = fig(790, 1340, 1.2, 'x', poseAt(t, [[26.18, 'stand'], [27.46, 'cross']]), { f: t < 32.31 ? -1 : 1 });
  const c = (y, s, t0) => chip(540, y, s, { size: 50, bg: K.red, a: fade(t, t0), sc: pop(t, t0) });
  return bg(K.sky) + headline(t, 260, 'DOCH DIE REAKTION:', 80)
    + c(430, 'GENERVT', 28.83) + c(560, 'BEILÄUFIG', 31.4) + c(690, 'KAUM BEACHTUNG', 33.12)
    + ich + other + badge(845, 840, 40, 'angry', { a: fade(t, 28.83) });
}
