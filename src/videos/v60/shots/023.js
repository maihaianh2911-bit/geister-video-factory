// The dark phone rests on a knee; then it lights up and buzzes — the callback from 112 gets through.
import { K, DEFS60, P, phone, rings, FG, prog, eout, lerp, shk } from './lib.js';

export default function renderShot(t) {
  const ring = t >= 34.4;
  const [sx, sy] = ring ? [6 * Math.sin(t * 90), 0] : [0, 0];
  const z = lerp(1.0, 1.05, prog(t, 33.6, 35.68));
  const scr = `<rect x="-60" y="-112" width="120" height="224" rx="12" fill="#12301F"/>
    <circle cx="0" cy="-20" r="${30 + 4 * Math.sin(t * 12)}" fill="#2EB872"/><path d="M -14 -26 q 14 20 28 0" stroke="#fff" stroke-width="6" fill="none"/>
    <circle cx="-34" cy="80" r="16" fill="${K.red}"/><circle cx="34" cy="80" r="16" fill="#2EB872"/>`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0B1012"/>
  <g transform="translate(540 900) scale(${z}) translate(-540 -900)">
    <path d="M -40 1000 Q 540 700 1120 1000 L 1120 1500 L -40 1500 Z" fill="${K.pants}" stroke="#0B0F12" stroke-width="8"/>
    <path d="M 200 900 Q 540 760 880 900" stroke="${K.pantsSh}" stroke-width="12" fill="none"/>
    
    <g transform="translate(${sx} ${sy})">${phone(560, 820, 2.2, -78, { on: ring ? 1 : 0, screen: scr })}</g>
    ${ring ? rings(t, 34.4, 560, 820, '#2EB872', 3, 330, 10) : ''}
  </g>
  ${FG(1440)}`;
}
