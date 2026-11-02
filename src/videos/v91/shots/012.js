// L11 40.88–44.16 study: an open diary on a desk; on "Tagebuch" the cover opens, on "Lügen" a pen writes "MEINE LÜGEN" with tally marks.
import { K, frame, bg, T, chip, cam, prog, eio, eout, pop, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('desk');
  const open = eio(prog(t, 41.88, 42.4));
  // book: left page fixed, cover rotates open (scaleX from 1 to -1 around spine x=540)
  s += `<ellipse cx="540" cy="1260" rx="460" ry="40" fill="#000" opacity=".2" filter="url(#blur8)"/>`;
  s += `<rect x="540" y="620" width="400" height="620" rx="12" fill="#fbf7ec" stroke="${K.ink}" stroke-width="6"/>`;
  const lines = Array.from({ length: 8 }, (_, i) => `<line x1="580" y1="${780 + i * 54}" x2="900" y2="${780 + i * 54}" stroke="#c9d6e2" stroke-width="3"/>`).join('');
  s += lines;
  const wr = prog(t, 42.96, 43.4);
  if (wr > 0) s += T(740, 740, 'MEINE LÜGEN', 44, { fill: K.ink, op: wr * 3 });
  const n = Math.floor(cl0((t - 43.2) / .14));
  let tally = '';
  for (let i = 0; i < Math.min(n, 9); i++) { const x = 600 + i * 30 + Math.floor(i / 5) * 24; tally += i % 5 === 4 ? `<line x1="${x - 130}" y1="850" x2="${x - 2}" y2="800" stroke="${K.red}" stroke-width="7" stroke-linecap="round"/>` : `<line x1="${x}" y1="800" x2="${x}" y2="860" stroke="${K.red}" stroke-width="7" stroke-linecap="round"/>`; }
  s += tally;
  s += `<rect x="140" y="620" width="400" height="620" rx="12" fill="#fbf7ec" stroke="${K.ink}" stroke-width="6"/>` + Array.from({ length: 8 }, (_, i) => `<line x1="180" y1="${780 + i * 54}" x2="500" y2="${780 + i * 54}" stroke="#c9d6e2" stroke-width="3"/>`).join('');
  s += T(340, 740, 'MONTAG', 38, { fill: '#777' });
  // cover on top while closed: covers the right page, flips to the left
  const sx = 1 - 2 * open;
  if (open < 1) s += `<g transform="translate(540 0) scale(${f1(sx * 100) / 100} 1) translate(-540 0)"><rect x="540" y="610" width="410" height="640" rx="14" fill="${sx > 0 ? '#2f5a7a' : '#2a4f6b'}" stroke="${K.ink}" stroke-width="6"/>${sx > .3 ? `<rect x="620" y="800" width="250" height="90" rx="10" fill="#f3e6c4" stroke="${K.ink}" stroke-width="4"/>` : ''}</g>`;
  if (sx > .3) s += T(745, 862, 'TAGEBUCH', 40, { fill: K.ink });
  // pen
  const pp = eio(prog(t, 42.5, 42.95));
  const px = lerp(1000, 720 + (t > 43.2 ? (Math.min(n, 9) * 30) - 120 : 0), pp), py = lerp(1400, 820, pp) + (t > 43.2 ? Math.sin(t * 30) * 10 : 0);
  s += `<g transform="translate(${f1(px)} ${f1(py)}) rotate(35)"><rect x="-12" y="-200" width="24" height="200" rx="8" fill="#d9493f" stroke="${K.ink}" stroke-width="5"/><path d="M -12 0 L 0 34 L 12 0 Z" fill="#f2d3a0" stroke="${K.ink}" stroke-width="4"/></g>`;
  s += chip(540, 360, 'STUDIE: LÜGEN-TAGEBUCH', { p: pop(t, 40.95, .4), size: 50, bg: '#fff' });
  return frame(cam(s, 540, 930, 1 + .05 * eio(prog(t, 40.88, 44.16))));
}
function cl0(x) { return x < 0 ? 0 : x; }
