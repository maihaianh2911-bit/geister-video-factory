// Pause: the torch is dark; a one-minute dial sweeps once around on "Pause" (time compressed).
import { K, DEFS60, torch, FG, prog, eio, lerp } from './lib.js';

export default function renderShot(t) {
  const a = eio(prog(t, 71.9, 73.3)) * 360;
  const r = 300, cx = 540, cy = 860;
  const rad = (a - 90) * Math.PI / 180, ex = cx + r * Math.cos(rad), ey = cy + r * Math.sin(rad);
  const arc = a >= 359.9 ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#9DB8C8" opacity=".25"/>` : a > 0 ? `<path d="M ${cx} ${cy} L ${cx} ${cy - r} A ${r} ${r} 0 ${a > 180 ? 1 : 0} 1 ${ex.toFixed(1)} ${ey.toFixed(1)} Z" fill="#9DB8C8" opacity=".25"/>` : '';
  let ticks = '';
  for (let i = 0; i < 12; i++) { const b = i / 12 * Math.PI * 2; ticks += `<path d="M ${cx + Math.cos(b) * (r - 40)} ${cy + Math.sin(b) * (r - 40)} L ${cx + Math.cos(b) * (r - 10)} ${cy + Math.sin(b) * (r - 10)}" stroke="#E6EEF2" stroke-width="${i % 3 ? 5 : 10}"/>`; }
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0B1014"/>
  <circle cx="${cx}" cy="${cy}" r="${r + 30}" fill="#141C22" stroke="#0B0F12" stroke-width="10"/>
  <circle cx="${cx}" cy="${cy}" r="${r}" fill="#1A242C" stroke="#E6EEF2" stroke-width="8"/>
  ${arc}${ticks}
  <path d="M ${cx} ${cy} L ${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${K.amb}" stroke-width="14" stroke-linecap="round"/>
  <circle cx="${cx}" cy="${cy}" r="18" fill="${K.amb}"/>
  ${torch(540, 1290, 1.4, 0, 0)}
  ${FG(1440)}`;
}
