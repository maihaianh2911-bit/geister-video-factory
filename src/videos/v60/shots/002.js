// Top-down: a clearing in the pine forest, four friends at a fork of three paths, the torch cone swings from path to path.
import { K, DEFS60, topFig, rings, FG, TX, prog, eio, eout, back, lerp, hash } from './lib.js';

function crowns(seed, n, z) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = hash(seed + i) * 1200 - 60, y = hash(seed + i * 2.3) * 2000 - 40;
    const dx = x - 540, dy = y - 860;
    if (Math.hypot(dx, dy * .8) < 330) continue;
    const r = 70 + 60 * hash(i * 1.3);
    let star = '';
    for (let k = 0; k < 8; k++) { const a = k / 8 * Math.PI * 2 + i; star += `${(x + Math.cos(a) * r).toFixed(1)},${(y + Math.sin(a) * r).toFixed(1)} ${(x + Math.cos(a + .39) * r * .55).toFixed(1)},${(y + Math.sin(a + .39) * r * .55).toFixed(1)} `; }
    s += `<polygon points="${star}" fill="${i % 3 ? '#14231F' : '#1B2E28'}" stroke="#0B0F12" stroke-width="5"/>`;
  }
  return s;
}
export default function renderShot(t) {
  const z = lerp(1, 1.22, eio(prog(t, 1.4, 3.48)));
  const sw = t < 2.2 ? lerp(-60, 0, eio(prog(t, 1.4, 2.2))) : t < 2.8 ? lerp(0, 60, eio(prog(t, 2.2, 2.8))) : lerp(60, -20, eio(prog(t, 2.8, 3.3)));
  const looks = [lerp(0, -40, eout(prog(t, 2.9, 3.2))), lerp(0, 30, eout(prog(t, 3.0, 3.3)))];
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0D1714"/>
  <g transform="translate(540 860) scale(${z}) translate(-540 -860)">
    <ellipse cx="540" cy="860" rx="380" ry="330" fill="#1C2A22"/>
    <path d="M 540 860 L 140 -40 M 540 860 L 1040 -60 M 540 860 L 560 1960" stroke="#3A3A32" stroke-width="90" stroke-linecap="round"/>
    <path d="M 540 860 L 140 -40 M 540 860 L 1040 -60 M 540 860 L 560 1960" stroke="#4A4A40" stroke-width="64" stroke-linecap="round" stroke-dasharray="6 26"/>
    <g transform="translate(540 860) rotate(${sw - 90})"><polygon points="0,0 700,-210 700,210" fill="url(#fBeam)" opacity=".75"/></g>
    ${topFig('red', 540, 850, 1.35, sw)}
    ${topFig('green', 380, 950, 1.35, -30 + looks[0])}
    ${topFig('yellow', 700, 960, 1.35, 30 + looks[1])}
    ${topFig('blue', 540, 1060, 1.35, 180)}
    ${rings(t, 3.09, 540, 900, K.amb, 2, 260, 8)}
    ${crowns(7, 70)}
  </g>
  ${FG(1380)}`;
}
