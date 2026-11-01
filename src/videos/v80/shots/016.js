// 107.66–114.8: Lisa agrees at once and even reworks the whole layout
import { K, bg, fade, pop, prog, eio, fig, poseAt, chip, poster, badge, headline } from './lib.js';
export default function renderShot(t) {
  const tr = fig(200, 1340, 1.1, 'lisa', poseAt(t, [[107.66, 'stand'], [109.7, 'cheer']]));
  const up = eio(prog(t, 111.04, 112.7));
  const p0 = poster(380, 560, 260, 0, { label: 'VORHER' });
  const p1 = `<g opacity="${up}" transform="translate(${(1 - up) * -40} 0)">${poster(700, 560, 260, 1, { label: 'NACHHER' })}</g>`;
  const arr = `<path d="M 655 740 L 690 740" stroke="${K.ink}" stroke-width="14" stroke-linecap="round" opacity="${up}"/><path d="M 680 715 L 705 740 L 680 765" stroke="${K.ink}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${up}"/>`;
  return bg(K.butter) + headline(t, 260, 'SOFORT ZUGESAGT', 92, { mark: { word: 'SOFORT', t: 109.7, color: K.greenL } })
    + badge(200, 790, 52, 'check', { a: fade(t, 109.84), sc: pop(t, 109.84) }) + tr + p0 + arr + p1
    + chip(700, 1150, 'GESAMTES LAYOUT NEU', { size: 42, bg: K.green, a: fade(t, 112.24), sc: pop(t, 112.24) });
}
