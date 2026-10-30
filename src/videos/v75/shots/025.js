// 69.54–72.32: the work that piled up hits the systems all at once ("aufgestaute Arbeit" 68.92–69.54, "gleichzeitig" 69.9, "Systeme" 71.2) — a server rack, a crowd of waiting items rushes in, the load bar shoots into the red
import { K, DEFS, BG, glow, cam, prog, eio, ein, lerp, f1, hash } from './lib.js';
export function server(load, t) {
  const col = load > .75 ? K.red : load > .4 ? K.sun : K.green;
  return `<rect x="380" y="380" width="320" height="760" rx="20" fill="${K.ind2}" stroke="${K.data}" stroke-width="5"/>${[0, 1, 2, 3, 4].map(i => `<rect x="410" y="${420 + i * 140}" width="260" height="110" rx="10" fill="${K.ind3}"/><circle cx="640" cy="${475 + i * 140}" r="12" fill="${col}" opacity="${f1(.5 + .5 * Math.abs(Math.sin(t * 9 + i)))}"/>`).join('')}
    <rect x="380" y="1180" width="320" height="40" rx="20" fill="${K.ind3}"/><rect x="384" y="1184" width="${f1(312 * load)}" height="32" rx="16" fill="${col}"/>${load > .75 ? glow(540, 760, 420, .6, 'iRed') : ''}`;
}
export function item(kind, x, y, s = 1) {
  const svg = kind === 0 ? `<rect x="-50" y="-34" width="100" height="68" rx="20" fill="${K.data}"/><path d="M -20 34 l -10 22 l 30 -22" fill="${K.data}"/>`
    : kind === 1 ? `<rect x="-56" y="-36" width="112" height="72" rx="10" fill="${K.green}"/><rect x="-56" y="-18" width="112" height="14" fill="${K.ink}"/>`
    : `<rect x="-46" y="-40" width="92" height="80" rx="8" fill="${K.sun}"/><path d="M -46 -10 H 46 M 0 -40 V -10" stroke="${K.ink}" stroke-width="6"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">${svg}</g>`;
}
export default function renderShot(t) {
  const rush = prog(t, 69.6, 72.2), load = eio(prog(t, 69.9, 71.4));
  let crowd = '';
  for (let i = 0; i < 24; i++) { const side = i % 2 ? 1 : -1, ph = (rush * 1.6 + hash(i)) % 1, x0 = 540 + side * (560 + hash(i * 3) * 120), y0 = 300 + hash(i * 5) * 1000;
    crowd += item(i % 3, lerp(x0, 540 + side * 170, ein(ph)), lerp(y0, 760, ein(ph)), .8 * (1 - .5 * ein(ph))); }
  return `${DEFS}${BG()}${cam(`${server(load, t)}${t > 69.6 ? crowd : ''}`, 1, 540, 850)}`;
}
