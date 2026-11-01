// 239.6–245.24: seen as knowledgeable → more motivation to give careful advice (Lisa picks the fitting room)
import { K, bg, fade, pop, fig, poseAt, chip, headline, badge } from './lib.js';
import { rooms } from './030.js';
export default function renderShot(t) {
  const tr = fig(190, 1340, 1.1, 'lisa', poseAt(t, [[239.6, 'think'], [241.38, 'point']]), { smile: fade(t, 240.41) });
  return bg(K.butter) + headline(t, 300, 'ALS SACHKUNDIG GESEHEN', 76, { mark: { word: 'SACHKUNDIG', t: 240.02 } })
    + chip(540, 470, '→ GIBT SICH MEHR MÜHE', { size: 50, bg: K.green, a: fade(t, 243.92), sc: pop(t, 243.92) })
    + tr + chip(190, 1300, 'LISA', { size: 34, bg: K.purple }) + rooms(t, 1, { on: fade(t, 242.4) })
    + badge(630, 820, 46, 'check', { a: fade(t, 242.4), sc: pop(t, 242.4) }) + badge(260, 840, 50, 'star', { a: fade(t, 240.18), sc: pop(t, 240.18) });
}
