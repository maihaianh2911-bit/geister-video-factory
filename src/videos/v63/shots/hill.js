// v63 shots 5–6: the Mittelberg at night — two torch-carrying searchers climb toward the wooded summit (one continuous clock t)
import { K, fig, hash, lerp, eio, prog, f1 } from './lib.js';
const PATH = [[150, 1330], [420, 1210], [300, 1110], [560, 1010], [470, 930], [600, 860]];
function along(u) { const n = PATH.length - 1, x = Math.min(n - 1e-6, Math.max(0, u * n)), i = Math.floor(x), f = x - i; return [lerp(PATH[i][0], PATH[i + 1][0], f), lerp(PATH[i][1], PATH[i + 1][1], f), PATH[i + 1][0] > PATH[i][0] ? 1 : -1]; }
export function hill(t) {
  let tr = '';
  for (let i = 0; i < 46; i++) { const u = i / 45, x = -40 + u * 1160, y = 1300 - 520 * Math.sin(Math.min(1, Math.max(0, (x + 60) / 1200)) * Math.PI) + 40 + hash(i) * 50, h = 90 + hash(i + 3) * 70;
    if (Math.abs(x - 540) < 70 && y < 900) continue;
    tr += `<path d="M ${f1(x)} ${f1(y - h)} L ${f1(x - 38)} ${f1(y)} L ${f1(x + 38)} ${f1(y)} Z" fill="${i % 2 ? '#26332D' : '#2C3A33'}"/>`; }
  const path = `<path d="M ${PATH.map(p => p.join(' ')).join(' L ')}" fill="none" stroke="#4A5A4E" stroke-width="14" stroke-dasharray="2 22" stroke-linecap="round"/>`;
  const u = eio(prog(t, 8.1, 13.3)) * .92;
  const men = [0, .07].map((lag, j) => { const [x, y, dir] = along(Math.max(0, u - lag)); const s = lerp(.2, .15, u);
    const m = fig(x, y, s, { col: '#0F1513', cap: true, walk: t * 9 + j * 2, stride: 26, aR: [dir > 0 ? 55 : 10, 10], aL: [dir < 0 ? 55 : 10, 10] });
    const h = dir > 0 ? m.hR : m.hL;
    return `<path d="M ${f1(h[0])} ${f1(h[1])} L ${f1(h[0] + dir * 190)} ${f1(h[1] + 60)} L ${f1(h[0] + dir * 120)} ${f1(h[1] + 130)} Z" fill="url(#nTorch)" opacity=".9"/>${m.svg}<circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="7" fill="#FFF4D2"/>`; }).join('');
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="url(#nSky)"/><circle cx="830" cy="330" r="60" fill="#E9E2C8" opacity=".85"/><circle cx="830" cy="330" r="150" fill="url(#nLamp)" opacity=".25"/>
    <path d="M -60 1340 Q 540 440 1140 1340 L 1140 2000 L -60 2000 Z" fill="#1F2A25"/>${path}${tr}${men}`;
}
