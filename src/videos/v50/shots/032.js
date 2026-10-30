// 61.0–62.85 · "oder kommen andere Beschwerden dazu" — worried face; warning badges pop up one after another
import { P, pastel, girl, prog, back } from '../lib.js';

const B = [[230, 470, 61.42], [860, 560, 61.76], [180, 980, 62.1]];
export default function renderShot(t) {
  const badge = (x, y, t0) => { const s = back(prog(t, t0, t0 + .22)); return s > 0 ? `<g transform="translate(${x} ${y}) scale(${s}) rotate(${6 * Math.sin(t * 3 + x)})"><path d="M 0 -80 L 78 60 L -78 60 Z" fill="${P.nerve}" stroke="${P.ink}" stroke-width="9" stroke-linejoin="round"/><rect x="-9" y="-36" width="18" height="56" rx="8" fill="${P.ink}"/><circle cx="0" cy="40" r="10" fill="${P.ink}"/></g>` : ''; };
  return `${pastel(t, { color: '#FFF4E2' })}
    ${girl(560, 1640, 2.0, { t, id: 's32', eyes: 'wide', look: -10, brow: .8, mouth: 'flat', painFore: .6, handR: [300, 700], handL: [-300, 700] })}
    ${B.map(b => badge(...b)).join('')}`;
}
