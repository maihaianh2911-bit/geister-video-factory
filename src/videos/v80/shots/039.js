// 296.88–304.26: instead say "let me know when you have time; I can adapt to your schedule, it's not urgent"
import { K, bg, fade, pop, fig, poseAt, chip, bubble, calendar } from './lib.js';
export default function renderShot(t) {
  const ich = fig(240, 1340, 1.1, 'ich', poseAt(t, [[296.88, 'stand'], [297.68, 'show']]));
  const b = bubble(70, 330, 940, [{ s: '„Gib mir Bescheid, wenn du Zeit hast.', a: fade(t, 297.68) }, { s: 'Ich richte mich nach deinem Terminplan.', a: fade(t, 300.66) }, { s: 'Es ist nicht dringend.“', a: fade(t, 302.9) }], { size: 56, a: fade(t, 297.68), fill: K.greenL, tail: [280, 880] });
  return bg(K.mint) + chip(540, 200, 'SAG STATTDESSEN:', { size: 44, bg: K.green }) + b.svg + ich
    + calendar(520, 960, 320, { title: 'TERMINE', head: K.green, a: fade(t, 301.5) });
}
