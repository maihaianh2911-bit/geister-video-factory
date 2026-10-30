// The alpine distress signal as a loop: six flashes round a circle, then the pause arc — it repeats, the light blinks over the mountains on "Notsignal".
import { K, DEFS60, FG, prog, eout, back, lerp, rings } from './lib.js';

export default function renderShot(t) {
  const cyc = ((t - 73.36) / 1.6) % 1; // one compressed cycle = 1.6 s
  const cx = 540, cy = 760, r = 260;
  let s = '';
  for (let i = 0; i < 6; i++) {
    const a = (-90 + i * 30) * Math.PI / 180, on = cyc >= i * .08 && cyc < .5;
    s += `<circle cx="${(cx + r * Math.cos(a)).toFixed(1)}" cy="${(cy + r * Math.sin(a)).toFixed(1)}" r="${on ? 40 : 28}" fill="${on ? K.amb : '#2A3A44'}" stroke="#0B0F12" stroke-width="6"/>`;
  }
  const pa = lerp(90, 270, prog(cyc, .5, 1)) - 90;
  const p0 = 90 * Math.PI / 180, p1 = (pa + 90) * Math.PI / 180;
  const arc = cyc > .5 ? `<path d="M ${cx + r * Math.cos(p0)} ${cy + r * Math.sin(p0)} A ${r} ${r} 0 0 1 ${(cx + r * Math.cos(p1 + Math.PI / 2 - Math.PI / 2)).toFixed(1)} ${(cy + r * Math.sin(p1)).toFixed(1)}" stroke="#9DB8C8" stroke-width="18" fill="none" stroke-linecap="round"/>` : '';
  const fl = cyc < .5 && (cyc * 12) % 1 < .5 ? 1 : 0;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="url(#fSky)"/>
  <path d="M -20 1260 L 220 980 L 380 1110 L 600 860 L 800 1060 L 940 960 L 1100 1150 L 1100 1960 L -20 1960 Z" fill="#1A262C" stroke="#0B0F12" stroke-width="6"/>
  <path d="M 600 860 L 660 930 L 620 920 L 580 960 L 550 920 Z" fill="#DCE7EE" opacity=".8"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="#2A3A44" stroke-width="10" stroke-dasharray="8 14"/>
  ${s}${arc}
  <circle cx="540" cy="1250" r="${fl ? 20 : 10}" fill="#FFF6D8"/>
  ${fl ? `<circle cx="540" cy="1250" r="140" fill="url(#fAmb)"/>` : ''}
  ${rings(t, 74.32, cx, cy, K.amb, 2, 360, 8)}
  ${FG(1440)}`;
}
