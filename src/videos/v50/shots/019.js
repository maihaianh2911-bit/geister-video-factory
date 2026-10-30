// 32.70–35.36 · "obwohl die Ursache im Mund liegt" — felt at the forehead, caused in the mouth: arrow down to the ice
import { P, pastel, profileHead, arrow, prog, eio, eout, back } from '../lib.js';

export default function renderShot(t) {
  const s = 1.9, hx = 430, hy = 900;
  const ar = eio(prog(t, 32.9, 33.35));
  const ring = back(prog(t, 33.3, 33.6));
  const pulse = t > 34.08 ? 1 + .15 * Math.sin((t - 34.08) * 14) : 1;
  const ix = hx + 120 * s, iy = hy + 88 * s;
  const fx = hx + 160 * s, fy = hy - 150 * s;
  return `${pastel(t, { color: '#EEF5FB' })}
    ${profileHead(hx, hy, s, { t, id: 's19', xray: .85, ice: 1.2, palCold: 1, eye: 'shut', painFore: 1 })}
    <path d="M ${fx + 70} ${fy + 20} C ${fx + 260} ${fy + 120} ${ix + 260} ${iy - 140} ${ix + 90} ${iy - 20}" fill="none" stroke="#fff" stroke-width="24" pathLength="1" stroke-dasharray="${ar} 1" stroke-linecap="round"/>
    <path d="M ${fx + 70} ${fy + 20} C ${fx + 260} ${fy + 120} ${ix + 260} ${iy - 140} ${ix + 90} ${iy - 20}" fill="none" stroke="${P.ink}" stroke-width="11" pathLength="1" stroke-dasharray="${ar} 1" stroke-linecap="round"/>
    ${ar >= 1 ? arrow(ix + 140, iy - 60, ix + 80, iy - 16, P.ink, 11) : ''}
    ${ring > 0 ? `<circle cx="${ix}" cy="${iy}" r="${85 * ring * pulse}" fill="none" stroke="${P.teal}" stroke-width="14"/><circle cx="${ix}" cy="${iy}" r="${85 * ring * pulse}" fill="none" stroke="#fff" stroke-width="5"/>` : ''}`;
}
