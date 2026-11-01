// 188.26–196.23: example – asking Vinh to export report data, without apologising for the disturbance
import { K, bg, fade, pop, prog, eout, fig, poseAt, chip, headline, doc, bubble, crossOut } from './lib.js';
export default function renderShot(t) {
  const v = fig(760, 1340, 1.2, 'vinh', 'stand', { f: -1 });
  const ich = fig(280, 1340, 1.2, 'ich', poseAt(t, [[188.26, 'stand'], [195.0, 'ask']]));
  const ex = eout(prog(t, 191.6, 192.3));
  const rep = `<g opacity="${fade(t, 190.36)}">${doc(400, 500, 260, { title: 'BERICHT', lineCol: ['#9cc0f2', '#9cc0f2', '#f5c98e', '#9cc0f2', '#f5c98e'] })}
    <g opacity="${ex}"><path d="M 700 670 L ${700 + 130 * ex} 670" stroke="${K.green}" stroke-width="16" stroke-linecap="round"/><path d="M ${800 + 30 * ex} 640 L ${830 + 30 * ex} 670 L ${800 + 30 * ex} 700" stroke="${K.green}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>`;
  const b = bubble(60, 470, 320, [{ s: '„Sorry für die Störung …“' }], { size: 40, a: fade(t, 193.0) });
  return bg(K.sky) + chip(540, 200, 'ZUM BEISPIEL', { size: 44, bg: K.ink2 }) + headline(t, 340, 'DATEN EXPORTIEREN', 86, { t0: 190.36 })
    + rep + v + chip(760, 1300, 'VINH · DATEN', { size: 36, bg: K.blue, a: fade(t, 188.71), sc: pop(t, 188.71) }) + ich
    + b.svg + crossOut(70, 480, 300, b.h - 20, prog(t, 193.78, 194.5));
}
