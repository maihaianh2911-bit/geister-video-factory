// 256.12–263.32: instead of "Herr Lâm, sorry for the disturbance, could you look at this plan?" …
import { K, bg, fade, pop, prog, fig, poseAt, chip, bubble, doc, badge } from './lib.js';
export default function renderShot(t) {
  const ich = fig(260, 1340, 1.15, 'ich', poseAt(t, [[256.12, 'stand'], [257.6, 'bow']]), { prop: `<g transform="translate(-5 -40)">${doc(0, 0, 80, { title: 'PLAN' })}</g>` });
  const lam = fig(790, 1340, 1.15, 'lam', 'cross', { f: -1 });
  const st = prog(t, 262.28, 262.8);
  const b = bubble(70, 330, 940, [{ s: '„Herr Lâm, entschuldigen Sie bitte die Störung.', strike: st }, { s: 'Können Sie sich diesen Plan ansehen?“', a: fade(t, 259.92), strike: prog(t, 262.5, 263) }], { size: 54, a: fade(t, 257.0), tail: [300, 840] });
  return bg(K.lav) + chip(540, 200, 'STATT ZU SAGEN:', { size: 44, bg: K.red }) + b.svg + ich + lam
    + chip(790, 1300, 'HERR LÂM', { size: 34, bg: K.ink2 })
    + badge(960, 340, 40, 'x', { a: fade(t, 262.6), sc: pop(t, 262.6) });
}
