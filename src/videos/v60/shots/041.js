// Close: two arms wrap around the shivering friend from both sides; the warm glow grows — "nie allein".
import { K, DEFS60, P, head, armTo, FG, prog, eio, eout, lerp, shiver, blinkAt } from './lib.js';

export default function renderShot(t) {
  const hug = eout(prog(t, 64.6, 65.0));
  const sh = shiver(t, lerp(1.2, .2, eio(prog(t, 64.9, 66.0))));
  const warm = eio(prog(t, 64.9, 66.2));
  const p = P.blue;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#101A20"/>
  <ellipse cx="540" cy="900" rx="${500 + 200 * warm}" ry="${560 + 200 * warm}" fill="url(#fAmb)" opacity="${.25 + .5 * warm}"/>
  <g transform="translate(100 1120) scale(1.5)">${head('red', { look: 14, brow: 'calm', mouth: 'smile', blink: blinkAt(t) })}</g>
  <g transform="translate(980 1120) scale(1.5)">${head('yellow', { look: -14, brow: 'calm', mouth: 'smile', blink: blinkAt(t, 1) })}</g>
  <g transform="translate(${540 + sh} 1000)">
    <path d="M -330 560 Q -350 200 -200 150 L 200 150 Q 350 200 330 560 Z" fill="${p.j}" stroke="#0B0F12" stroke-width="8"/>
    <path d="M -220 140 Q 0 290 220 140 L 230 200 Q 0 350 -230 200 Z" fill="${p.jHi}" stroke="#0B0F12" stroke-width="7"/>
    <g transform="translate(0 -120) scale(2.3)">${head('blue', { brow: 'calm', mouth: warm > .5 ? 'smile' : 'tight', cold: true, look: -4, blink: blinkAt(t, .5) })}</g>
  </g>
  ${armTo(-60, 1200, lerp(-40, 380, hug), lerp(1300, 1180, hug), 110, P.red.j, -1, P.red.skin)}
  ${armTo(1140, 1220, lerp(1120, 700, hug), lerp(1300, 1200, hug), 110, P.yellow.j, 1, P.yellow.skin)}
  ${FG(1460)}`;
}
