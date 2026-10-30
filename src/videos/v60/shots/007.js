// Top-down: torch circle with the four friends, three paths disappear into black; a big question mark lands on "tun".
import { K, DEFS60, topFig, FG, TX, prog, eout, back, lerp, hash } from './lib.js';

export default function renderShot(t) {
  const q = back(prog(t, 10.15, 10.45));
  const rot = lerp(-8, 8, prog(t, 9.4, 10.9));
  let dark = '';
  for (let i = 0; i < 40; i++) { const a = hash(i) * Math.PI * 2, r = 420 + 500 * hash(i * 3); dark += `<circle cx="${(540 + Math.cos(a) * r).toFixed(0)}" cy="${(820 + Math.sin(a) * r).toFixed(0)}" r="${(50 + 40 * hash(i + 9)).toFixed(0)}" fill="#0F1A17"/>`; }
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#080D0C"/>
  <g transform="translate(540 820) rotate(${rot}) translate(-540 -820)">
    <path d="M 540 820 L -100 300 M 540 820 L 1180 380 M 540 820 L 300 1900" stroke="#2A2C26" stroke-width="80" stroke-linecap="round"/>
    ${dark}
    <circle cx="540" cy="820" r="300" fill="url(#fAmb)" opacity=".9"/>
    ${topFig('red', 450, 730, 1.15, 200)}${topFig('green', 630, 730, 1.15, 160)}${topFig('yellow', 630, 910, 1.15, 20)}${topFig('blue', 450, 910, 1.15, -20)}
  </g>
  ${q > 0 ? `<g transform="translate(540 420) scale(${q})">${TX('?', 0, 110, 340, K.amb, 'middle', `stroke="${K.ol}" stroke-width="16" paint-order="stroke"`)}</g>` : ''}
  ${FG(1380)}`;
}
