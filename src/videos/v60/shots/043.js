// Very wide: the friends are a tiny light in a sea of trees; far away the rescuers' lamps search. Red raises the light on "Zeig".
import { K, DEFS60, pineRow, FG, prog, eout, lerp, rings } from './lib.js';

export default function renderShot(t) {
  const up = eout(prog(t, 67.5, 67.9));
  const sweep = Math.sin(t * 1.4) * 30;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="url(#fSky)"/>
  ${pineRow(780, 180, 260, 16, '#1A282C', 61)}
  ${pineRow(960, 260, 360, 14, '#142024', 67, 40)}
  <g transform="translate(860 860) rotate(${sweep - 120})"><polygon points="0,0 500,-60 500,60" fill="#BFE0FF" opacity=".25"/></g>
  <circle cx="860" cy="860" r="12" fill="#BFE0FF"/><circle cx="910" cy="880" r="9" fill="#BFE0FF" opacity=".8"/>
  ${pineRow(1180, 340, 480, 12, '#0F191C', 71, -30)}
  <rect x="0" y="1170" width="1080" height="800" fill="#0B1210"/>
  <ellipse cx="300" cy="1180" rx="${120 + 80 * up}" ry="${90 + 60 * up}" fill="url(#fAmb)"/>
  <circle cx="300" cy="${lerp(1190, 1120, up)}" r="12" fill="#FFF6D8"/>
  ${up > .9 ? `<polygon points="300,1120 ${300 + 240},${1120 - 900} ${300 + 420},${1120 - 860}" fill="url(#fBeamV)" opacity=".35"/>` : ''}
  ${rings(t, 67.54, 300, 1140, K.amb, 2, 200, 8)}
  ${FG(1420)}`;
}
