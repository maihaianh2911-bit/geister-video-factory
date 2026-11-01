// 238.66–244.48: seen as knowledgeable → more motivation to give careful advice (Trang picks the fitting room)
import { K, bg, fade, pop, fig, poseAt, chip, headline, badge } from './lib.js';
import { rooms } from './030.js';
export default function renderShot(t) {
  const tr = fig(190, 1340, 1.1, 'trang', poseAt(t, [[238.66, 'think'], [241.0, 'point']]), { smile: fade(t, 239.5) });
  return bg(K.butter) + headline(t, 300, 'ALS SACHKUNDIG GESEHEN', 76, { mark: { word: 'SACHKUNDIG', t: 239.16 } })
    + chip(540, 470, '→ GIBT SICH MEHR MÜHE', { size: 50, bg: K.green, a: fade(t, 243.16), sc: pop(t, 243.16) })
    + tr + chip(190, 1300, 'TRANG', { size: 34, bg: K.purple }) + rooms(t, 1, { on: fade(t, 241.68) })
    + badge(630, 820, 46, 'check', { a: fade(t, 241.68), sc: pop(t, 241.68) }) + badge(260, 840, 50, 'star', { a: fade(t, 239.3), sc: pop(t, 239.3) });
}
