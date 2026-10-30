// Wide night landscape: the friends' own mast stays dark (red X); signal waves from the phone fly to another provider's lit mast.
import { K, DEFS60, pineRow, FG, prog, eout, back, lerp, rings } from './lib.js';

function mast(x, y, lit) {
  return `<g transform="translate(${x} ${y})"><path d="M -60 0 L 0 -360 L 60 0 M -40 -120 L 40 -120 M -25 -220 L 25 -220 M -48 -60 L 34 -200 M 48 -60 L -34 -200" stroke="${lit ? '#9DB8C8' : '#3A4A52'}" stroke-width="10" fill="none" stroke-linejoin="round"/>
    <rect x="-20" y="-380" width="40" height="60" rx="8" fill="${lit ? '#E6EEF2' : '#2A3A44'}" stroke="#0B0F12" stroke-width="5"/>
    ${lit ? `<circle cx="0" cy="-390" r="14" fill="${K.red}"/><circle cx="0" cy="-350" r="90" fill="url(#fCold)"/>` : ''}</g>`;
}
export default function renderShot(t) {
  const send = prog(t, 26.55, 27.4);
  let waves = '';
  for (let k = 0; k < 4; k++) {
    const p = prog(t, 26.55 + k * .25, 27.35 + k * .25); if (p <= 0 || p >= 1) continue;
    const x = lerp(540, 850, p), y = lerp(1240, 650, p) - 120 * Math.sin(p * Math.PI);
    waves += `<path d="M ${x - 70} ${y + 30} q 70 -90 140 0" stroke="#9DDCB8" stroke-width="16" fill="none" stroke-linecap="round" opacity="${1 - p}"/><circle cx="${x}" cy="${y}" r="10" fill="#E6FFF2" opacity="${1 - p}"/>`;
  }
  const xx = back(prog(t, 27.5, 27.8));
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="url(#fSky)"/>
  <path d="M -20 820 Q 220 600 420 760 L 420 1960 L -20 1960 Z" fill="#1A262C"/>
  <path d="M 520 860 Q 820 560 1100 760 L 1100 1960 L 520 1960 Z" fill="#1D2A31"/>
  ${mast(220, 700, false)}${mast(850, 640, true)}
  ${xx > 0 ? `<g transform="translate(220 450) scale(${xx})"><path d="M -60 -60 L 60 60 M 60 -60 L -60 60" stroke="${K.red}" stroke-width="26" stroke-linecap="round"/></g>` : ''}
  ${pineRow(1180, 300, 480, 9, '#0F191C', 51)}
  <rect x="0" y="1150" width="1080" height="800" fill="#121B18"/>
  <ellipse cx="540" cy="1250" rx="200" ry="120" fill="url(#fAmb)" opacity=".8"/>
  <circle cx="540" cy="1240" r="12" fill="#FFF6D8"/>
  ${rings(t, 26.55, 540, 1240, '#9DDCB8', 2, 200, 8)}
  ${waves}
  ${FG(1420)}`;
}
