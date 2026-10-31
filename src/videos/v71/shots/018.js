// 44.4–48.94: but it does not restore judgement as fully as sleep: KAFFEE bar stops part-way ("nicht" 45.92), SCHLAF bar fills completely ("Schlaf" 47.98)
import { K, BG, bar, mug, label, tick, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const c = eio(prog(t, 45.0, 45.9)), s = eio(prog(t, 47.3, 47.98)), stop = prog(t, 45.92, 46.1);
  const moon = `<path d="M 200 1040 a 70 70 0 1 0 60 100 a 56 56 0 1 1 -60 -100 Z" fill="#F6E3A6" stroke="${K.ink}" stroke-width="5"/>`;
  const stopMark = stop > 0 ? `<path d="M ${f1(308 + 664 * .55)} 668 V 790" stroke="${K.red}" stroke-width="10" stroke-linecap="round" opacity="${f1(stop)}"/>` : '';
  return `${BG()}${label(540, 330, 'URTEILSVERMÖGEN', prog(t, 44.96, 45.2), K.ink, 54)}
    ${mug(200, 790, .6, { t })}${bar(300, 680, 680, 96, .55 * c, K.amber, 'KAFFEE', { sz: 52 })}${stopMark}
    ${moon}${bar(300, 1060, 680, 96, s, K.teal, 'SCHLAF', { sz: 52 })}${tick(930, 1108, .7, prog(t, 47.98, 48.3), K.tealD)}`;
}
