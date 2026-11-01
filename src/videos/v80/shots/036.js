// 271.38–277.8: trust can make the person feel more responsible for the task they took on
import { K, bg, fade, pop, fig, poseAt, chip, headline, doc, badge, T } from './lib.js';
export default function renderShot(t) {
  const becker = fig(560, 1340, 1.2, 'becker', poseAt(t, [[271.38, 'stand'], [273.03, 'show']]), { prop: `<g transform="translate(-20 -100)">${doc(0, 0, 110, { title: 'PLAN', extra: badge(55, 110, 26, 'check', { a: fade(t, 276.22) }) })}</g>` });
  return bg(K.sky) + chip(540, 380, 'VERTRAUEN', { size: 54, bg: K.blue, a: fade(t, 272.08), sc: pop(t, 272.08) })
    + `<g opacity="${fade(t, 274.62)}">${T(540, 505, '↓', 80)}</g>`
    + chip(540, 600, 'VERANTWORTUNG', { size: 54, bg: K.green, a: fade(t, 275.95), sc: pop(t, 275.95) })
    + headline(t, 740, 'FÜR DIE AUFGABE', 64, { t0: 275.26 }) + becker + chip(560, 1300, 'HERR BECKER', { size: 34, bg: K.ink2 });
}
