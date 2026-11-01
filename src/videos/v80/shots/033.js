// 248.64–256.76: many hesitate not from unwillingness but from fear that every detail will be criticised
import { K, bg, fade, pop, prog, fig, poseAt, chip, headline, badge, doc } from './lib.js';
export default function renderShot(t) {
  const f = fig(250, 1340, 1.15, 'x', poseAt(t, [[248.64, 'stand'], [252.18, 'think']]));
  const marks = [0, 1, 2, 3, 4].map(i => { const t0 = 253.93 + i * .3; return `<g opacity="${fade(t, t0, .15)}"><ellipse cx="${560 + (i % 2) * 150 + i * 20}" cy="${760 + i * 95}" rx="62" ry="26" fill="none" stroke="${K.red}" stroke-width="8"/></g>`; }).join('');
  return bg(K.pink) + headline(t, 260, 'WARUM MANCHE ZÖGERN', 80)
    + chip(540, 400, 'NICHT: KEINE LUST ZU HELFEN', { size: 44, bg: K.ink2, a: fade(t, 249.34) })
    + chip(540, 510, 'SONDERN: ANGST VOR KRITIK', { size: 50, bg: K.red, a: fade(t, 252.22), sc: pop(t, 252.22) })
    + `<g opacity="${fade(t, 253.23)}">${doc(500, 640, 380, { title: 'ARBEIT', n: 5 })}</g>` + marks + f
    + badge(310, 870, 30, 'sweat', { a: fade(t, 255.58) });
}
