// 5.9–13.5: replace it with recognising a concrete strength; the colleague then helps gladly
import { K, bg, headline, fig, poseAt, fade, pop, badge, chip, bubble, T } from './lib.js';
export default function renderShot(t) {
  const ich = fig(300, 1340, 1.25, 'ich', poseAt(t, [[5.9, 'bow'], [6.3, 'stand'], [7.3, 'show']]));
  const other = fig(800, 1340, 1.2, 'x', poseAt(t, [[5.9, 'stand'], [11.3, 'cheer']]), { f: -1 });
  const star = badge(800, 770, 66, 'star', { a: fade(t, 7.88), sc: pop(t, 7.88) });
  const lab = chip(800, 640, 'STÄRKE', { size: 44, bg: K.orange, a: fade(t, 7.88) });
  const help = chip(300, 640, 'HILFT GERN', { size: 50, bg: K.green, a: fade(t, 11.26), sc: pop(t, 11.26) }) + badge(690, 760, 40, 'heart', { a: fade(t, 12.1), sc: pop(t, 12.1) });
  return bg(K.mint) + headline(t, 260, 'KONKRETE STÄRKE ANERKENNEN', 92, { lines: ['KONKRETE STÄRKE', 'ANERKENNEN'], mark: { word: 'STÄRKE', t: 7.88 } })
    + ich + other + lab + star + help;
}
