// 76.24–80.8: even Lisa asks him on her own whether he needs changes to a graphic
import { K, bg, fade, pop, fig, poseAt, chip, bubble, headline } from './lib.js';
export default function renderShot(t) {
  const tr = fig(300, 1340, 1.2, 'lisa', poseAt(t, [[76.24, 'stand'], [78.21, 'ask']]));
  const ch = fig(800, 1340, 1.2, 'jonas', 'stand', { f: -1, smile: fade(t, 79.39) });
  const b = bubble(90, 590, 780, [{ s: '„Brauchst du noch Änderungen an einer Grafik?“' }], { size: 54, a: fade(t, 78.3), tail: [330, 840], fill: K.lav });
  return bg(K.lav) + headline(t, 260, 'SOGAR LISA FRAGT', 88, { mark: { word: 'LISA', t: 76.6 } })
    + chip(540, 480, 'VON SICH AUS', { size: 46, bg: K.green, a: fade(t, 77.48), sc: pop(t, 77.48) }) + tr + ch + b.svg
    + chip(300, 1300, 'LISA', { size: 34, bg: K.purple }) + chip(800, 1300, 'JONAS', { size: 34, bg: K.blue });
}
