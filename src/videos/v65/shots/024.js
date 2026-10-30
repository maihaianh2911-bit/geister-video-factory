// 74.28–77.84: the consequences depend on the area — two different places (a cool northern bog, a warm wetland); different mosquito species pop in on "Mückenarten"
import { K, DEFS, BG, vig, mosquito, f1, prog, eio, eout, back, lerp } from './lib.js';
export function region(x, y, w, h, kind, t, a, inner = '') {
  const id = 'r' + kind;
  const scene = kind === 'n'
    ? `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#mNight)"/>${[0, 1, 2, 3, 4].map(i => `<path d="M ${x + 40 + i * 90} ${y + h * .62} l 36 -150 l 36 150 Z" fill="#1F4136" stroke="${K.ink}" stroke-width="3"/>`).join('')}
       <rect x="${x}" y="${y + h * .62}" width="${w}" height="${h * .38}" fill="#2A5A6A"/>`
    : `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#mDusk)"/>${[0, 1, 2].map(i => `<path d="M ${x + 80 + i * 150} ${y + h * .62} q 10 -120 0 -200" fill="none" stroke="#5A4A2A" stroke-width="12"/><path d="M ${x + 80 + i * 150} ${y + h * .62 - 200} q -60 -10 -90 30 M ${x + 80 + i * 150} ${y + h * .62 - 200} q 60 -10 90 30 M ${x + 80 + i * 150} ${y + h * .62 - 200} q -10 -60 -50 -70 M ${x + 80 + i * 150} ${y + h * .62 - 200} q 30 -50 70 -50" fill="none" stroke="${K.leaf}" stroke-width="12" stroke-linecap="round"/>`).join('')}
       <rect x="${x}" y="${y + h * .62}" width="${w}" height="${h * .38}" fill="#2A6F86"/>`;
  return `<g opacity="${f1(a)}"><clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26"/></clipPath><g clip-path="url(#${id})">${scene}${inner}</g>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="none" stroke="${kind === 'n' ? K.cyan : K.sun}" stroke-width="4"/></g>`;
}
export function swarm(x, y, w, kind, t, p) {
  let s = '';
  const n = kind === 'n' ? 3 : 4;
  for (let i = 0; i < n; i++) { const q = back(prog(p, i * .15, i * .15 + .3)); if (q <= 0) continue; s += `<g transform="translate(${f1(x + 90 + i * (w - 180) / (n - 1))} ${f1(y + 110 + (i % 2) * 70 + 8 * Math.sin(t * 3 + i))}) scale(${f1(q)})">${mosquito(0, 0, .5, { t: t + i, male: i % 2 === 1 }).replace(new RegExp(K.mos, 'g'), kind === 'n' ? ['#2A2C3E', '#4A3A4E', '#3E4A3A'][i] : ['#5A4A3A', '#2A2C3E', '#3A3E5A', '#4A3A2E'][i])}</g>`; }
  return s;
}
export default function renderShot(t) {
  const a1 = eout(prog(t, 73.9, 74.3)), a2 = eout(prog(t, 74.1, 74.5));
  const p = prog(t, 76.7, 77.6);
  const z = lerp(1.08, 1, eio(prog(t, 74.28, 77.84))); // slow pull-back while the two areas are compared
  return `${DEFS}${BG('url(#mData)')}<g transform="translate(540 790) scale(${z.toFixed(4)}) translate(-540 -790)">${region(60, 200, 960, 560, 'n', t, a1, swarm(60, 200, 960, 'n', t, p))}${region(60, 820, 960, 560, 'w', t, a2, swarm(60, 820, 960, 'w', t, p))}</g>${vig()}`;
}
