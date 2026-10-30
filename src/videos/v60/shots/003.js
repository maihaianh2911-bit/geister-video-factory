// Side wide: the last dusk light drains out of the sky behind the pines, the group shrinks into black, then a phone torch clicks on.
import { K, DEFS60, forest, fig, fog, FG, prog, eio, eout, lerp } from './lib.js';

export default function renderShot(t) {
  const dusk = 1 - eio(prog(t, 3.5, 4.25));
  const on = prog(t, 4.42, 4.48);
  const dim = lerp(.0, .55, eio(prog(t, 3.5, 4.25)));
  const z = lerp(1.0, 1.08, prog(t, 3.48, 4.9));
  const grp = `${fig('green', 380, 1300, .52, { look: -10, brow: 'worry' })}${fig('blue', 500, 1310, .55, { hug: true, brow: 'worry', cold: true })}
    ${fig('red', 610, 1300, .55, { look: 8, brow: 'worry', aR: [60, 30] })}${fig('yellow', 720, 1300, .52, { look: 12, brow: 'worry' })}`;
  return DEFS60 + `<g transform="translate(540 1100) scale(${z}) translate(-540 -1100)">
    ${forest(t, { dusk, hz: 1150, noNear: true, px: 30 })}
    ${fog(t, 1180, .1 + .1 * dusk)}
    ${grp}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#05080A" opacity="${dim}"/>
    ${on > 0 ? `<ellipse cx="630" cy="1050" rx="${380 * on}" ry="${420 * on}" fill="url(#fAmb)" opacity=".7"/><circle cx="660" cy="1020" r="10" fill="#FFF6D8"/>` : ''}
    <path d="M -40 1250 Q 300 1220 540 1260 Q 800 1300 1120 1240 L 1120 1960 L -40 1960 Z" fill="#0A100E"/>
    
  </g>
  ${FG(1380)}`;
}
