// 66.4–71.58: research distinguishes — left page BEKÄMPFEN: among many mosquito species only certain disease carriers get a red target ring ("bestimmter Krankheitsüberträger")
import { K, DEFS, BG, vig, kcard, mosquito, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
export const species = [['#2A2C3E', 0], ['#5A4A3A', 1], ['#2A2C3E', 2], ['#3E4A3A', 0], ['#4A3A4E', 1], ['#2A2C3E', 3], ['#5A4A3A', 2], ['#3A3E5A', 0]];
export function grid(x0, t, mark, cross, aIn) {
  let s = '';
  species.forEach(([col, pat], i) => {
    const x = x0 + (i % 2) * 210 + 120, y = 560 + Math.floor(i / 2) * 200;
    const a = eout(prog(aIn, i * .08, .4 + i * .08));
    const tgt = (i === 2 || i === 5) ? back(mark) : 0;
    s += `<g opacity="${f1(a)}">${mosquito(x, y, .62, { t: t + i, wings: 0, legCol: '#9AA6CC' }).replace(new RegExp(K.mos, 'g'), col)}
      ${pat === 3 || i === 2 || i === 5 ? [0, 1, 2].map(k => `<path d="M ${f1(x - 20 - k * 16)} ${f1(y + 6 + k * 6)} l 4 12" stroke="#F2F5FF" stroke-width="4"/>`).join('') : ''}
      ${tgt > 0 ? `<g transform="translate(${x} ${y}) scale(${f1(tgt)})"><circle r="92" fill="none" stroke="${K.red}" stroke-width="7"/><path d="M -110 0 h 30 M 80 0 h 30 M 0 -110 v 30 M 0 80 v 30" stroke="${K.red}" stroke-width="6"/></g>` : ''}
      ${cross > 0 ? `<path d="M ${x - 70} ${y - 60} L ${f1(x - 70 + 140 * cross)} ${f1(y - 60 + 120 * cross)} M ${x + 70} ${y - 60} L ${f1(x + 70 - 140 * cross)} ${f1(y - 60 + 120 * cross)}" stroke="${K.red}" stroke-width="8" stroke-linecap="round"/>` : ''}</g>`;
  });
  return s;
}
export function page(x0, w, title, col, a) {
  return `<g opacity="${f1(a)}"><rect x="${x0}" y="300" width="${w}" height="1060" rx="24" fill="#121A3E" stroke="${col}" stroke-width="4"/></g>`;
}
// a magnifier scans the species one after another and stops on the carriers
function lens(t) {
  const a = eout(prog(t, 67.4, 67.8)) * (1 - eout(prog(t, 70.6, 71.0)));
  if (a <= 0) return '';
  const path = [[160, 560], [370, 560], [160, 760], [370, 760], [160, 960], [370, 960], [160, 760]];
  const u = prog(t, 67.6, 69.8) * (path.length - 1), k = Math.min(path.length - 2, Math.floor(u)), f = eio(u - k);
  const x = lerp(path[k][0], path[k + 1][0], f) + 40, y = lerp(path[k][1], path[k + 1][1], f) + 40;
  return `<g opacity="${f1(a)}"><circle cx="${f1(x)}" cy="${f1(y)}" r="80" fill="${K.cyan}" fill-opacity=".08" stroke="${K.line}" stroke-width="8"/><path d="M ${f1(x + 56)} ${f1(y + 56)} l 70 70" stroke="${K.line}" stroke-width="18" stroke-linecap="round"/></g>`;
}
export default function renderShot(t) {
  const mark = prog(t, 69.8, 70.2);
  const sc = `${BG('url(#mData)')}${page(40, 480, '', K.cyan, 1)}${page(560, 480, '', K.sun, .35)}
    ${grid(40, t, mark, 0, prog(t, 66.5, 67.6))}${lens(t)}`;
  return `${DEFS}${sc}${kcard(280, 210, 'BEKÄMPFEN', 1, { sz: 52, sub: 'bestimmte Überträger' })}${kcard(800, 210, 'ENTFERNEN', .35, { sz: 52, col: K.sun, sub: 'alle Arten' })}${vig()}`;
}
