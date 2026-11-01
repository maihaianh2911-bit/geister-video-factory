// 45.26–48.38 everything a second time: the life timeline 2007 → today, a loop arrow drags the kid back to the start, "2×" on "zweites"
import { K, kid, chip, headline, T, fade, pop, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#2c3560"/>`;
  s += headline(t, 260, ['ALLES', 'NOCH EINMAL'], 92, { t0: 45.4, fill: '#fff', mark: { word: 'NOCH EINMAL', t: 46.92, color: K.red } });
  // timeline
  const x0 = 120, x1 = 960, y = 1050;
  s += `<path d="M ${x0} ${y} L ${x1} ${y}" stroke="#8f9bd0" stroke-width="12" stroke-linecap="round"/>`;
  [['2007', x0], ['2012', 330], ['2017', 540], ['2022', 750], ['HEUTE', x1]].forEach(([l, x]) => { s += `<circle cx="${x}" cy="${y}" r="16" fill="#fff" stroke="${K.ol}" stroke-width="4"/>` + T(x, y + 70, l, 36, { fill: '#cfd6f5' }); });
  // the loop arrow from today back to 2007
  const lp = eio(prog(t, 46.4, 47.3));
  if (lp > 0) {
    const N = 30, pts = [];
    for (let i = 0; i <= N * lp; i++) { const u = i / N; pts.push([lerp(x1, x0, u), y - 40 - Math.sin(Math.PI * u) * 320]); }
    if (pts.length > 1) {
      s += `<path d="M ${pts.map(q => f1(q[0]) + ' ' + f1(q[1])).join(' L ')}" stroke="${K.red}" stroke-width="16" fill="none" stroke-linecap="round" stroke-dasharray="1 0"/>`;
      if (lp > .97) s += `<path d="M ${x0 - 30} ${y - 110} L ${x0} ${y - 40} L ${x0 + 50} ${y - 100}" stroke="${K.red}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
    }
  }
  s += chip(540, 560, '2×', { a: fade(t, 46.92), sc: pop(t, 46.92), bg: K.red, size: 70 });
  // the kid stands at 2007 and looks along the whole road ahead
  s += kid(x0 + 40, y - 30, .5, { aL: [12, 6], aR: [12, 6], mouth: 'sad', brows: 'worried', look: [14, 0] });
  return s;
}
