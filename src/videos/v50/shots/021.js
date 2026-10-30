// 37.85–40.64 · "schnellen Trinken durch den Strohhalm" — she sucks hard; the level drops fast, then the wince
import { P, parlour, girl, iceGlass, fingersOver, arm, painGlow, cam, prog, eio, eout, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const S = 1.5, X = 540, Y = 1350;
  const mx = X, my = Y - 84 * S;
  const lvl = lerp(.85, .25, eio(prog(t, 38.4, 39.9)));
  const wince = t > 40.0;
  const gx = X + 210, gy = Y + 40;
  const flow = t > 38.4 && t < 39.95;
  const dash = flow ? `<path d="M ${gx + 6} ${gy - 60} L ${mx + 14} ${my + 8}" stroke="#7FD3E8" stroke-width="12" stroke-dasharray="26 20" stroke-dashoffset="${-t * 300}" stroke-linecap="round"/>` : '';
  const sh = wince ? 6 * Math.sin(t * 70) * Math.exp(-(t - 40.0) * 4) : 0;
  return `<g transform="translate(${sh} 0) ${cam(1.0, 540, 900, 540, 900)}">${parlour(t)}
    ${girl(X, Y, S, { t, id: 's21', eyes: wince ? 'shut' : 'half', look: 14, lookY: 20, brow: wince ? 1 : .2, mouth: 'sip', painFore: wince ? eout(prog(t, 40.0, 40.3)) : 0, handR: [150, 120], handL: [-215, 420] })}
    <path d="M ${gx + 6} ${gy + 60} L ${mx + 14} ${my + 8}" stroke="${P.ink}" stroke-width="30" stroke-linecap="round"/>
    <path d="M ${gx + 6} ${gy + 60} L ${mx + 14} ${my + 8}" stroke="${P.teal}" stroke-width="20" stroke-linecap="round"/>${dash}
    ${iceGlass(gx, gy, .8, { id: 's21g', level: lvl, t, straw: false })}
    ${fingersOver(X + 150 * S, Y + 120 * S)}</g>`;
}
