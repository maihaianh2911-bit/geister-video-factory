// 114.8–126.18: Jonas – an apology stresses that you take their time and bring extra work
import { K, bg, fade, pop, prog, fig, poseAt, chip, bubble, headline, clock, doc, T } from './lib.js';
export default function renderShot(t) {
  const ch = fig(150, 1340, 1.0, 'jonas', poseAt(t, [[114.8, 'stand'], [118.23, 'idea']]));
  const b = bubble(380, 520, 620, [{ s: '„Entschuldige die Störung …“' }], { size: 50, a: fade(t, 119.13) });
  const arr = (x, y, a) => `<g opacity="${a}"><line x1="${x}" y1="${y}" x2="${x}" y2="${y + 70}" stroke="${K.ink}" stroke-width="12" stroke-linecap="round"/><path d="M ${x - 26} ${y + 50} L ${x} ${y + 82} L ${x + 26} ${y + 50}" stroke="${K.ink}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  const a1 = fade(t, 122.44), a2 = fade(t, 124.57);
  const stack = `<g opacity="${a2}" transform="translate(0 ${(1 - a2) * 30})">${doc(770, 840, 140, { rot: 8 })}${doc(750, 830, 140, { rot: -4 })}${doc(730, 820, 140, { title: '+' })}</g>`;
  return bg(K.lav) + chip(540, 200, 'JONAS SAGTE:', { size: 44, bg: K.blue }) + headline(t, 360, 'ENTSCHULDIGUNG BETONT:', 76, { t0: 118.38 })
    + ch + b.svg + arr(540, 690, fade(t, 121.44)) + clock(430, 950, 95, 0, { a: a1, sector: .3 * prog(t, 122.57, 123.58) })
    + chip(430, 1110, 'DEINE ZEIT', { size: 44, bg: K.red, a: a1 }) + stack
    + chip(800, 1110, 'EXTRA-ARBEIT', { size: 44, bg: K.red, a: a2 });
}
