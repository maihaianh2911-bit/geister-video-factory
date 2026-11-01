// 57.54–61.36: three days pass – the poster still lies there, unedited
import { K, bg, fade, prog, pop, calendar, poster, chip, headline } from './lib.js';
export default function renderShot(t) {
  const cal = calendar(110, 470, 460, { title: 'TAGE', cols: 4, rows: 2, cross: [prog(t, 57.54, 57.9), prog(t, 57.82, 58.2), prog(t, 58.08, 58.5)] });
  const stamp = `<g opacity="${fade(t, 60.18, .2)}" transform="translate(810 760) rotate(-12) scale(${.8 + .2 * pop(t, 60.18)})"><rect x="-230" y="-50" width="460" height="100" rx="14" fill="none" stroke="${K.red}" stroke-width="10"/><text x="0" y="22" font-family="Inter" font-weight="900" font-size="50" fill="${K.red}" text-anchor="middle" style="font-family:'Inter';font-weight:900">UNBEARBEITET</text></g>`;
  return bg(K.cream) + headline(t, 300, '3 TAGE SPÄTER', 100, { mark: { word: '3 TAGE', t: 57.54 } }) + cal + poster(670, 560, 280, 0) + stamp
    + chip(810, 1180, 'IMMER NOCH DA', { size: 40, bg: K.ink2, a: fade(t, 59.76) });
}
