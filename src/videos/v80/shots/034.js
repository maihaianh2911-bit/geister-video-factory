// 256.76–264.34: instead of "Herr Becker, sorry for the disturbance, could you look at this plan?" …
import { K, bg, fade, pop, prog, fig, poseAt, chip, bubble, doc, badge } from './lib.js';
export default function renderShot(t) {
  const ich = fig(260, 1340, 1.15, 'ich', poseAt(t, [[256.76, 'stand'], [258.35, 'bow']]), { prop: `<g transform="translate(-5 -40)">${doc(0, 0, 80, { title: 'PLAN' })}</g>` });
  const becker = fig(790, 1340, 1.15, 'becker', 'cross', { f: -1 });
  const st = prog(t, 263.18, 263.7);
  const b = bubble(70, 330, 940, [{ s: '„Herr Becker, entschuldigen Sie bitte die Störung.', strike: st }, { s: 'Können Sie sich diesen Plan ansehen?“', a: fade(t, 260.92), strike: prog(t, 263.39, 263.94) }], { size: 54, a: fade(t, 257.86), tail: [300, 840] });
  return bg(K.lav) + chip(540, 200, 'STATT ZU SAGEN:', { size: 44, bg: K.red }) + b.svg + ich + becker
    + chip(790, 1300, 'HERR BECKER', { size: 34, bg: K.ink2 })
    + badge(960, 340, 40, 'x', { a: fade(t, 263.48), sc: pop(t, 263.48) });
}
