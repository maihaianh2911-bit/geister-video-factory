// 65.48–68.62: today — the forecourt of Duisburg main station ("Vorplatz des Duisburger Hauptbahnhofs"); the camera drifts across the square in daylight
import { K, DEFS, BG, grain, TX, f1, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const dx = lerp(40, -40, eio(prog(t, 65.48, 68.62)));
  const st = `<rect x="80" y="420" width="920" height="560" fill="${K.concrete}" stroke="${K.ink}" stroke-width="6"/>
    ${[...Array(7)].map((_, i) => `<rect x="${130 + i * 125}" y="560" width="90" height="300" fill="#A9B4B0" stroke="${K.ink}" stroke-width="4"/>`).join('')}
    <rect x="300" y="450" width="480" height="80" fill="${K.paperL}" stroke="${K.ink}" stroke-width="4"/>${TX('HAUPTBAHNHOF', 540, 506, 48, K.ink)}
    <path d="M 80 980 L 1000 980" stroke="${K.ink}" stroke-width="6"/>`;
  const plaza = `<path d="M -60 980 L 1140 980 L 1140 1500 L -60 1500 Z" fill="${K.paperD}"/>${[...Array(8)].map((_, i) => `<path d="M ${-60 + i * 170} 1500 L ${200 + i * 110} 980" stroke="${K.concreteD}" stroke-width="3"/>`).join('')}`;
  return `${DEFS}${BG('url(#lSky)')}${grain(15)}<g transform="translate(${f1(dx)} 0)">${st}${plaza}</g>`;
}
