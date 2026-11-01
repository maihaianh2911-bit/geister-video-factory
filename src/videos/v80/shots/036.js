// 270.68–276.9: trust can make the person feel more responsible for the task they took on
import { K, bg, fade, pop, fig, poseAt, chip, headline, doc, badge, T } from './lib.js';
export default function renderShot(t) {
  const lam = fig(560, 1340, 1.2, 'lam', poseAt(t, [[270.68, 'stand'], [272.0, 'show']]), { prop: `<g transform="translate(-20 -100)">${doc(0, 0, 110, { title: 'PLAN', extra: badge(55, 110, 26, 'check', { a: fade(t, 275.34) }) })}</g>` });
  return bg(K.sky) + chip(540, 380, 'VERTRAUEN', { size: 54, bg: K.blue, a: fade(t, 270.94), sc: pop(t, 270.94) })
    + `<g opacity="${fade(t, 273.58)}">${T(540, 505, '↓', 80)}</g>`
    + chip(540, 600, 'VERANTWORTUNG', { size: 54, bg: K.green, a: fade(t, 275.0), sc: pop(t, 275.0) })
    + headline(t, 740, 'FÜR DIE AUFGABE', 64, { t0: 274.28 }) + lam + chip(560, 1300, 'HERR LÂM', { size: 34, bg: K.ink2 });
}
