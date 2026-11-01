// 0–5.9 hook: headline SO BITTEST DU UM HILFE; the habitual apology opener appears and is struck out on "an"
import { K, bg, headline, fig, poseAt, bubble, fade, prog, pop, badge, chip } from './lib.js';
export default function renderShot(t) {
  const ich = fig(330, 1340, 1.25, 'ich', poseAt(t, [[0, 'stand'], [2.9, 'bow']]));
  const tr = fig(820, 1340, 1.2, 'x', 'stand', { f: -1 });
  const b = bubble(90, 640, 700, [{ s: '„Tut mir leid, dass ich dich störe …“', strike: prog(t, 5.2, 5.7) }], { size: 54, a: fade(t, 3.25), tail: [380, 860] });
  return bg(K.cream) + headline(t, 300, 'SO BITTEST DU UM HILFE?', 104, { lines: ['SO BITTEST DU', 'UM HILFE?'], mark: { word: 'HILFE?', t: 2.18 } })
    + ich + tr + b.svg + badge(780, 660, 46, 'x', { a: fade(t, 5.45), sc: pop(t, 5.45) });
}
