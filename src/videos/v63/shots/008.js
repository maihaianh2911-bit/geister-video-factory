// 14.8–16.74: close on the metal detector: a gloved fist grips the handle, arm out of frame above; the whole tool swings from the shoulder and pings
import { K, DEFS, grain, cam, prog, f1 } from './lib.js';
import { soilBg } from './soil.js';
import { fist } from './hands.js';
export default function renderShot(t) {
  const th = 13 * Math.sin((t - 14.8) * 3.2), P = [540, -520];
  const ping = t > 15.95 ? prog(t, 15.95, 16.7) : 0;
  const rad = th * Math.PI / 180, cx = P[0] + Math.sin(-rad) * 1620, cy = P[1] + Math.cos(rad) * 1620;
  const det = `<g transform="rotate(${f1(th)} ${P[0]} ${P[1]})"><path d="M 540 1050 L 540 260" stroke="${K.ink}" stroke-width="30" stroke-linecap="round"/><path d="M 540 1050 L 540 260" stroke="#5E666A" stroke-width="20" stroke-linecap="round"/>
    <rect x="512" y="560" width="56" height="90" rx="10" fill="#2F3538" stroke="${K.ink}" stroke-width="5"/><circle cx="540" cy="590" r="9" fill="${ping ? K.red : '#556'}"/>
    <ellipse cx="540" cy="1100" rx="160" ry="56" fill="#3C4448" stroke="${K.ink}" stroke-width="6"/><ellipse cx="540" cy="1100" rx="110" ry="34" fill="none" stroke="#7D8589" stroke-width="6"/>
    ${fist(540, 400, 90, -90, 1.05, '#2C3A33', { skin: '#3A3F3A', len: 900 })}</g>`;
  const rings = ping ? [0, 1, 2].map(i => { const k = (ping * 1.6 + i / 3) % 1; return `<ellipse cx="${f1(cx)}" cy="1100" rx="${f1(160 + 300 * k)}" ry="${f1(56 + 100 * k)}" fill="none" stroke="${K.goldL}" stroke-width="8" opacity="${f1(1 - k)}"/>`; }).join('') : '';
  const leaves = [...Array(16)].map((_, i) => `<ellipse cx="${(i * 197) % 1080}" cy="${900 + (i * 131) % 700}" rx="30" ry="14" fill="${K.olive}" transform="rotate(${i * 37} ${(i * 197) % 1080} ${900 + (i * 131) % 700})"/>`).join('');
  return `${DEFS}${cam(soilBg(4) + leaves + `<rect x="-60" y="-60" width="1200" height="2040" fill="#0B1210" opacity=".3"/>` + rings + det, 1, 540, 900)}${grain(t)}`;
}
