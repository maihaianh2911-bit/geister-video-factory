// 22.0–23.94 · "warum tut dann deine Stirn weh?" — dashed arrow from mouth up to the throbbing forehead, "?"
import { P, pastel, girl, headline, prog, eio, eout, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const S = 2.05, X = 470, Y = 1500;
  const my = Y - 84 * S, fy = Y - 300 * S;
  const lower = eio(prog(t, 22.0, 22.35));
  const ar = eio(prog(t, 22.35, 22.85));
  const throb = t > 22.88 ? 1 + .25 * Math.sin((t - 22.88) * 14) : prog(t, 22.6, 22.88);
  const q = back(prog(t, 23.28, 23.5));
  const path = `M ${X + 230} ${my} C ${X + 420} ${my - 60} ${X + 420} ${fy + 40} ${X + 170} ${fy}`;
  return `${pastel(t, { color: '#F4EEF6' })}
    ${girl(X, Y, S, { t, id: 's14', eyes: 'half', look: 10, lookY: -8, brow: 1, mouth: 'flat', painFore: throb, handL: [lerp(-20, -260, lower), lerp(-300, 600, lower)], palmL: lower < .5 ? 8 : 0, handR: [300, 700], cheek: .6 })}
    <ellipse cx="${X + 20}" cy="${my}" rx="140" ry="100" fill="none" stroke="${P.teal}" stroke-width="12" stroke-dasharray="30 18"/>
    <path d="${path}" fill="none" stroke="#fff" stroke-width="22" pathLength="1" stroke-dasharray="${ar} 1" stroke-linecap="round"/>
    <path d="${path}" fill="none" stroke="${P.ink}" stroke-width="10" pathLength="1" stroke-dasharray="${ar} 1" stroke-linecap="round"/>
    ${ar >= 1 ? `<path d="M ${X + 150} ${fy - 30} L ${X + 170} ${fy} L ${X + 140} ${fy + 26}" fill="none" stroke="${P.ink}" stroke-width="10" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
    ${headline('?', 900, 420, 300, { scale: q, color: P.pain, rot: 8 })}`;
}
