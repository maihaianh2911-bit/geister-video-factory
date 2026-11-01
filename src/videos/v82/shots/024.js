// 83.6–85.92 a crossroads: the kid stands at a fork; two signposts pop up on "entscheiden"
import { K, kid, T, fade, pop, prog, eio, f1 } from './lib.js';
export function sign(x, y, label, col, dir, sc) {
  return `<g transform="translate(${x} ${y}) scale(${f1(sc * 100) / 100})"><rect x="-10" y="0" width="20" height="300" fill="${K.woodSh}" stroke="${K.ol}" stroke-width="5"/><path d="M ${dir < 0 ? -210 : -170} -60 L ${dir < 0 ? 170 : 210} -60 L ${dir < 0 ? 170 : 240} ${dir < 0 ? -60 : 0} L ${dir < 0 ? 170 : 210} ${dir < 0 ? 60 : 60} L ${dir < 0 ? -210 : -170} 60 ${dir < 0 ? 'L -240 0' : ''} Z" fill="${col}" stroke="${K.ol}" stroke-width="6" stroke-linejoin="round"/>${T(dir < 0 ? -10 : 10, 16, label, 40, { fill: '#fff' })}</g>`;
}
export function crossroads(t, o = {}) {
  let s = `<rect width="1080" height="1920" fill="#e9d7ef"/>`;
  s += `<path d="M 0 0 L 540 0 L 540 1330 L 0 1330 Z" fill="#f8d9bf" opacity="${f1((o.warm ?? .5) * 100) / 100}"/><path d="M 540 0 L 1080 0 L 1080 1330 L 540 1330 Z" fill="#cfe6f3" opacity="${f1((o.cool ?? .5) * 100) / 100}"/>`;
  s += `<rect x="0" y="1000" width="1080" height="920" fill="#9fcf86"/>`;
  s += `<path d="M 420 1920 L 500 1330 Q 520 1150 300 1000 L 160 1000 Q 400 1150 380 1330 L 300 1920 Z" fill="#e8d2a8"/><path d="M 660 1920 L 580 1330 Q 560 1150 780 1000 L 920 1000 Q 680 1150 700 1330 L 780 1920 Z" fill="#e8d2a8"/><path d="M 300 1920 L 780 1920 L 640 1330 L 440 1330 Z" fill="#e8d2a8"/>`;
  return s;
}
export default function renderShot(t) {
  let s = crossroads(t);
  s += sign(260, 760, 'ALTES LEBEN', '#d9774f', -1, pop(t, 84.96));
  s += sign(820, 760, 'NEUE ZUKUNFT', K.blue, 1, pop(t, 85.1));
  const lk = t < 84.4 ? -14 : t < 85.2 ? 14 : 0;
  s += kid(540, 1330, .8, { aL: [12, 6], aR: [12, 6], mouth: 'flat', brows: 'worried', look: [lk, -4] });
  return s;
}
