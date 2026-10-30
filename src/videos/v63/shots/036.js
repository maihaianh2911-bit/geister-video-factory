// 68.74–72.08: only now can researchers study the disc calmly — lab table, lamp, gloved hand with magnifier
import { K, DEFS, BG, disc, grain, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const m = eio(prog(t, 70.6, 71.6));
  const glove = `<g transform="translate(${f1(lerp(980, 700, m))} ${f1(lerp(1500, 1080, m))}) rotate(-35)"><rect x="-50" y="0" width="100" height="420" fill="#E8EEF0" stroke="${K.ink}" stroke-width="5"/><circle cx="0" cy="-90" r="120" fill="#E9F3F5" fill-opacity=".35" stroke="${K.ink}" stroke-width="12"/><rect x="-16" y="30" width="32" height="40" fill="${K.ink}"/></g>`;
  return `${DEFS}${BG('#4A4038')}${cam(`<rect x="-60" y="700" width="1200" height="1300" fill="#D8D2C6"/><circle cx="540" cy="900" r="560" fill="url(#nLamp)" opacity=".7"/><path d="M 420 -60 L 420 220 L 300 380 L 780 380 L 660 220 L 660 -60 Z" fill="#3E4A3A" stroke="${K.ink}" stroke-width="6"/>`
    + disc(540, 1000, 300, { id: 'L', damage: true }) + glove, lerp(1, 1.08, eio(prog(t, 68.74, 72.08))), 540, 1000)}${grain(t)}`;
}
