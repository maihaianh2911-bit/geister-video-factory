// 108.08–115.19: Trang agrees at once and even reworks the whole layout
import { K, bg, fade, pop, prog, eio, fig, poseAt, chip, poster, badge, headline } from './lib.js';
export default function renderShot(t) {
  const tr = fig(200, 1340, 1.1, 'trang', poseAt(t, [[108.08, 'stand'], [110.16, 'cheer']]));
  const up = eio(prog(t, 111.26, 112.9));
  const p0 = poster(380, 560, 260, 0, { label: 'VORHER' });
  const p1 = `<g opacity="${up}" transform="translate(${(1 - up) * -40} 0)">${poster(700, 560, 260, 1, { label: 'NACHHER' })}</g>`;
  const arr = `<path d="M 655 740 L 690 740" stroke="${K.ink}" stroke-width="14" stroke-linecap="round" opacity="${up}"/><path d="M 680 715 L 705 740 L 680 765" stroke="${K.ink}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${up}"/>`;
  return bg(K.butter) + headline(t, 260, 'SOFORT ZUGESAGT', 92, { mark: { word: 'SOFORT', t: 110.16, color: K.greenL } })
    + badge(200, 790, 52, 'check', { a: fade(t, 110.3), sc: pop(t, 110.3) }) + tr + p0 + arr + p1
    + chip(700, 1150, 'GESAMTES LAYOUT NEU', { size: 42, bg: K.green, a: fade(t, 112.5), sc: pop(t, 112.5) });
}
