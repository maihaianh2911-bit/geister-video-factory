// The goal: the tree line opens onto a valley with village lights; four friends walk out together — all of them safe.
import { K, DEFS60, pine, fig, FG, prog, eio, eout, lerp, hash } from './lib.js';

export default function renderShot(t) {
  const step = eio(prog(t, 10.95, 12.2));
  const z = lerp(1.0, 1.08, prog(t, 10.9, 12.24));
  let vil = '';
  for (let i = 0; i < 26; i++) vil += `<rect x="${(200 + hash(i) * 680).toFixed(0)}" y="${(900 + hash(i * 2) * 60).toFixed(0)}" width="22" height="16" rx="3" fill="#FFC46B" opacity="${(.7 + .3 * hash(i * 5)).toFixed(2)}"/>`;
  const xs = [-150, -50, 50, 150];
  return DEFS60 + `<g transform="translate(540 1100) scale(${z}) translate(-540 -1100)">
    <rect x="-40" y="-40" width="1160" height="2000" fill="url(#fSky)"/>
    <circle cx="760" cy="380" r="140" fill="url(#fCold)"/><circle cx="760" cy="380" r="46" fill="#DCE7EE"/>
    <path d="M -40 900 Q 300 820 540 870 Q 800 920 1120 840 L 1120 1100 L -40 1100 Z" fill="#24343C"/>
    <ellipse cx="540" cy="930" rx="460" ry="90" fill="url(#fAmb)" opacity=".6"/>${vil}
    <path d="M -40 1000 Q 540 960 1120 1000 L 1120 1960 L -40 1960 Z" fill="#18241F"/>
    <path d="M 540 1960 Q 500 1400 540 1000" stroke="#3E3E34" stroke-width="160" fill="none" stroke-linecap="round"/>
    <path d="M 540 1960 Q 500 1400 540 1000" stroke="#4E4C40" stroke-width="90" fill="none" stroke-dasharray="8 30"/>
    ${pine(60, 1700, 1500, '#0A1012', { w: .5 })}${pine(1030, 1700, 1600, '#0A1012', { w: .5 })}
    ${['green', 'red', 'blue', 'yellow'].map((id, i) => fig(id, 540 + xs[i] * lerp(1, .7, step), lerp(1600, 1300, step), lerp(.7, .5, step), { back: true, walk: t * 8 + i * 1.6, noShadow: true })).join('')}
  </g>
  ${FG(1400)}`;
}
