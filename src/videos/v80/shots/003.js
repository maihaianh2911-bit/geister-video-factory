// 13.5–19.98: "Früher" – every request started with the same apology sentence
import { K, bg, headline, fig, poseAt, fade, pop, chip, bubble, prog } from './lib.js';
export default function renderShot(t) {
  const ich = fig(330, 1340, 1.25, 'ich', poseAt(t, [[13.5, 'stand'], [16.3, 'bow']]));
  const other = fig(820, 1340, 1.2, 'x', 'stand', { f: -1 });
  const b = bubble(90, 650, 760, [{ s: '„Entschuldigung, darf ich dich kurz stören?“' }], { size: 54, a: fade(t, 16.4), tail: [380, 880] });
  const tags = chip(540, 520, 'JEDE BITTE', { size: 46, bg: K.red, a: fade(t, 15.14) });
  return bg(K.lav) + chip(540, 200, 'FRÜHER', { size: 44, bg: K.ink2 }) + headline(t, 360, 'MEINE ANGEWOHNHEIT', 84, { t0: 14.42 })
    + tags + ich + other + b.svg;
}
