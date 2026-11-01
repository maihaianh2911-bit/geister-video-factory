// 75.52–80.74: even Trang asks him on her own whether he needs changes to a graphic
import { K, bg, fade, pop, fig, poseAt, chip, bubble, headline } from './lib.js';
export default function renderShot(t) {
  const tr = fig(300, 1340, 1.2, 'trang', poseAt(t, [[75.52, 'stand'], [77.9, 'ask']]));
  const ch = fig(800, 1340, 1.2, 'chau', 'stand', { f: -1, smile: fade(t, 79.4) });
  const b = bubble(90, 590, 780, [{ s: '„Brauchst du noch Änderungen an einer Grafik?“' }], { size: 54, a: fade(t, 78.0), tail: [330, 840], fill: K.lav });
  return bg(K.lav) + headline(t, 260, 'SOGAR TRANG FRAGT', 88, { mark: { word: 'TRANG', t: 76.3 } })
    + chip(540, 480, 'VON SICH AUS', { size: 46, bg: K.green, a: fade(t, 77.08), sc: pop(t, 77.08) }) + tr + ch + b.svg
    + chip(300, 1300, 'TRANG', { size: 34, bg: K.purple }) + chip(800, 1300, 'CHÂU', { size: 34, bg: K.blue });
}
