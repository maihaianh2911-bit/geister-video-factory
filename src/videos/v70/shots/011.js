// 26.58–29.18: the on-board electrics could fail ("Bordelektrik … ausfallen"): the switch lights flicker and die; your window is already open
import { K, DEFS, doorPanel, foreArm, water, rain, label, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const fail = t < 27.4 ? 1 : t < 28.3 ? (hash(Math.floor(t * 14)) > .5 ? .9 : .15) : 0;
  const win = `<path d="M -60 -60 L 1140 -60 L 1140 160 L -60 220 Z" fill="#0E1418"/><clipPath id="s11w"><path d="M -60 -60 L 1140 -60 L 1140 160 L -60 220 Z"/></clipPath><g clip-path="url(#s11w)">${water(t, 90, { amp: 12 })}${rain(t, 1, 24)}</g>`;
  const sc = `${doorPanel(t, { lit: fail })}${win}<path d="M -60 220 L 1140 160" stroke="${K.glassL}" stroke-width="10" opacity=".6"/>
    ${fail < .5 ? `<rect x="-60" y="200" width="1200" height="1800" fill="#05080A" opacity="${f1(.35 * prog(t, 28.2, 28.8))}"/>` : ''}`;
  return `${DEFS}${sc}${label(540, 1260, 'BORDELEKTRIK', eout(prog(t, 26.9, 27.2)), K.red, 66)}${t > 28.3 ? `<path d="M 300 1300 L 780 1300" stroke="${K.red}" stroke-width="12" stroke-linecap="round" opacity="${f1(eout(prog(t, 28.3, 28.5)))}"/>` : ''}`;
}
