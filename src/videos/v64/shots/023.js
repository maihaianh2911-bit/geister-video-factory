// 43.72–47.0: cross-section of the river — the water is only about half a metre deep over soft mud; ruler 0,5 M WASSER
import { K, DEFS, BG, tuffi, card, HL, TX, grain, f1, prog, eout, eio, back, lerp } from './lib.js';
export default function renderShot(t) {
  const sY = 1040, bY = 1166;
  const r = eout(prog(t, 44.9, 45.6));
  let rip = '';
  for (let i = 0; i < 7; i++) rip += `<path d="M ${f1(((i * 170 + t * 40) % 1200) - 60)} ${sY + 4} q 30 -8 60 0 q 30 8 60 0" fill="none" stroke="#A3B0A2" stroke-width="5"/>`;
  const ruler = `<g opacity="${f1(prog(t, 44.8, 45.0))}"><path d="M 880 ${f1(sY + (bY - sY) * (1 - r))} V ${bY}" stroke="${K.red}" stroke-width="8"/><path d="M 850 ${sY} h 60 M 850 ${bY} h 60" stroke="${K.red}" stroke-width="8"/></g>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>
    <path d="M -60 760 Q 300 700 640 780 Q 900 820 1140 740 L 1140 1060 L -60 1060 Z" fill="#949A78"/>
    <rect x="-60" y="${bY}" width="1200" height="900" fill="${K.mud}"/>${[0, 1, 2, 3, 4, 5].map(i => `<ellipse cx="${100 + i * 180}" cy="${bY + 120 + (i % 2) * 70}" rx="40" ry="12" fill="${K.mudD}"/>`).join('')}
    ${tuffi(430, bY + 60, .95, { ear: .4, tr: .15, mud: 1 })}
    <rect x="-60" y="${bY}" width="1200" height="70" fill="${K.mud}" opacity=".92"/><path d="M -60 ${bY} H 1140" stroke="${K.mudD}" stroke-width="6"/>
    <rect x="-60" y="${sY}" width="1200" height="${bY - sY}" fill="#7D8C80" opacity=".6"/><path d="M -60 ${sY} H 1140" stroke="#5F6E64" stroke-width="5"/>${rip}
    ${ruler}${card(820, 820, '0,5 M WASSER', 58, back(prog(t, 45.56, 45.85)), { rot: -3, col: K.red })}
    ${TX('SCHLAMM', 540, bY + 260, 44, '#E6D3B4', 'middle', `opacity="${f1(prog(t, 46.3, 46.7))}"`)}${grain(t)}`;
}
