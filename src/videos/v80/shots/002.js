// 6–13.62: replace it with recognising a concrete strength; the colleague then helps gladly
import { K, bg, headline, fig, poseAt, fade, pop, badge, chip, bubble, T } from './lib.js';
export default function renderShot(t) {
  const ich = fig(300, 1340, 1.25, 'ich', poseAt(t, [[6, 'bow'], [6.39, 'stand'], [7.21, 'show']]));
  const other = fig(800, 1340, 1.2, 'x', poseAt(t, [[6, 'stand'], [11.25, 'cheer']]), { f: -1 });
  const star = badge(800, 770, 66, 'star', { a: fade(t, 7.68), sc: pop(t, 7.68) });
  const lab = chip(800, 640, 'STÄRKE', { size: 44, bg: K.orange, a: fade(t, 7.68) });
  const help = chip(300, 640, 'HILFT GERN', { size: 50, bg: K.green, a: fade(t, 11.22), sc: pop(t, 11.22) }) + badge(690, 760, 40, 'heart', { a: fade(t, 12.12), sc: pop(t, 12.12) });
  return bg(K.mint) + headline(t, 260, 'KONKRETE STÄRKE ANERKENNEN', 92, { lines: ['KONKRETE STÄRKE', 'ANERKENNEN'], mark: { word: 'STÄRKE', t: 7.68 } })
    + ich + other + lab + star + help;
}
