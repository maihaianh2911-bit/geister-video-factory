// v101 extra sets: street (sunny / evening sun), supermarket checkout, savanna at night; plus brain, magnifier, happiness graph.
import { K, f1, op, cl, lerp, prog, eio, T, pool, blur, plant, hash, clock } from './lib.js';
const INK = K.ink;
const lg = (id, stops) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;
// ---------- street (houses, shop, trees, lamp posts, bikes, car); o.eve: warm late-afternoon sun ----------
export function street(t, o = {}) {
  const eve = o.eve ? 1 : 0;
  let s = `<defs>${lg('v101st', eve ? [[0, '#f6b26b'], [.6, '#fbd69a'], [1, '#fde9c4']] : [[0, '#6fb6e8'], [.7, '#cbe7f6'], [1, '#eef6f8']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101st)"/>`;
  s += `<circle cx="${eve ? 860 : 880}" cy="${eve ? 520 : 240}" r="70" fill="${eve ? '#ffe0a0' : '#fff6c8'}"/>`;
  const H = [[-160, 360, 300, '#d98f6b'], [140, 300, 260, '#e8d2a8'], [400, 380, 240, '#b0583f'], [640, 280, 280, '#c9cfd6'], [920, 340, 300, '#e0b04a']];
  for (const [x, y, w, c] of H) {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${1100 - y}" fill="${c}"/><path d="M ${x - 14} ${y} H ${x + w + 14} L ${x + w / 2} ${y - 90} Z" fill="#8a4a3a"/>`;
    for (let r = 0; r < 4; r++) for (let c2 = 0; c2 < 3; c2++) s += `<rect x="${x + 30 + c2 * (w - 60) / 3}" y="${y + 50 + r * 150}" width="${(w - 60) / 3 - 20}" height="90" fill="${eve ? '#ffd98a' : '#bcd8ee'}" stroke="#fff" stroke-width="6"/>`;
  }
  // shop front with awning
  s += `<rect x="380" y="860" width="300" height="240" fill="#f4f1ea"/><path d="M 370 860 H 690 L 670 800 H 390 Z" fill="#3c9a5f"/>${[0, 1, 2, 3, 4].map(i => `<path d="M ${390 + i * 60} 800 L ${410 + i * 60} 860 H ${440 + i * 60} L ${420 + i * 60} 800 Z" fill="#fff" opacity=".7"/>`).join('')}<rect x="400" y="900" width="120" height="200" fill="#bcd8ee"/>${T(600, 960, 'BÄCKER', 30, { fill: '#7a4a2e' })}`;
  s += `<rect x="-200" y="1100" width="1480" height="80" fill="#c9c2b0"/><rect x="-200" y="1180" width="1480" height="940" fill="#8a8f96"/><g fill="#fff" opacity=".6">${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${-160 + i * 240}" y="1420" width="120" height="16"/>`).join('')}</g>`;
  for (const x of [60, 980]) s += `<rect x="${x - 16}" y="840" width="32" height="260" fill="#7a5a3a"/><circle cx="${x}" cy="800" r="120" fill="#5e9a50"/><circle cx="${x + 50}" cy="740" r="80" fill="#6fae5e"/>`;
  for (const x of [300, 760]) s += `<rect x="${x - 6}" y="760" width="12" height="340" fill="#333"/><circle cx="${x}" cy="754" r="20" fill="#f6f1d8"/>`;
  s += `<g transform="translate(820 1090)"><circle cx="-50" cy="-30" r="30" fill="none" stroke="#333" stroke-width="7"/><circle cx="50" cy="-30" r="30" fill="none" stroke="#333" stroke-width="7"/><path d="M -50 -30 L -10 -80 L 30 -80 L 50 -30 M -10 -80 L 0 -30 L -50 -30" stroke="#c25b4e" stroke-width="7" fill="none"/></g>`;
  let b = blur(s, o.strong);
  if (eve) b += `<path d="M 860 520 L 1300 300 L 1300 1900 L -300 1900 Z" fill="#ffcf7a" opacity=".12"/>` + pool(860, 520, 520, 520, '#ffcf7a', .5);
  else b += pool(880, 240, 460, 460, '#fff3b0', .45);
  return b;
}
// ---------- supermarket checkout (shelves, products, conveyor belt, register) ----------
export function market(t, o = {}) {
  let s = `<defs>${lg('v101mk', [[0, '#e9edf0'], [1, '#d8dde2']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101mk)"/>`;
  const cols = ['#d9493f', '#f2c14e', '#3c9a5f', '#5f8fb5', '#e8742f', '#8a5bb5'];
  for (let r = 0; r < 4; r++) {
    s += `<rect x="-200" y="${300 + r * 170}" width="1480" height="16" fill="#9aa3ad"/>`;
    for (let i = 0; i < 22; i++) { const x = -190 + i * 68, h = 70 + hash(i + r * 30) * 60; s += `<rect x="${x}" y="${300 + r * 170 - h}" width="56" height="${h}" rx="6" fill="${cols[(i + r) % 6]}"/>`; }
  }
  s += `<rect x="60" y="210" width="300" height="60" rx="8" fill="#3c9a5f"/>${T(210, 252, 'KASSE 2', 34, { fill: '#fff' })}`;
  s += `<rect x="-200" y="1000" width="1480" height="1120" fill="#c4c8cc"/>`;
  let b = blur(s, o.strong);
  b += pool(540, 200, 700, 320, '#ffffff', .35);
  return b;
}
// sharp checkout counter: conveyor belt with groceries + register (y = belt top)
export function checkout(t, y = 1240) {
  let s = `<rect x="-60" y="${y}" width="1200" height="${2000 - y}" fill="#5a6270" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="60" fill="#2a2f36"/>`;
  const off = (t * 40) % 80;
  s += `<g stroke="#3a4048" stroke-width="5">${Array.from({ length: 17 }, (_, i) => `<path d="M ${f1(-60 + i * 80 - off)} ${y + 4} v 52"/>`).join('')}</g>`;
  s += `<g transform="translate(160 ${y})"><rect x="-50" y="-110" width="100" height="110" rx="10" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/><rect x="-30" y="-80" width="60" height="30" fill="#5f8fb5"/></g><g transform="translate(330 ${y})"><ellipse cx="0" cy="-40" rx="60" ry="40" fill="#f2c14e" stroke="${INK}" stroke-width="5"/></g><g transform="translate(470 ${y})"><rect x="-30" y="-140" width="60" height="140" rx="12" fill="#d9493f" stroke="${INK}" stroke-width="5"/></g>`;
  s += `<g transform="translate(860 ${y})"><rect x="-120" y="-200" width="240" height="200" rx="16" fill="#2e3440" stroke="${INK}" stroke-width="6"/><rect x="-96" y="-180" width="192" height="80" rx="8" fill="#9fd8b0"/>${T(0, -126, '12,49 €', 40, { fill: '#1d3a2a' })}</g>`;
  return s;
}
// ---------- night savanna (early humans) ----------
export function savanna(t, o = {}) {
  let s = `<defs>${lg('v101sv', [[0, '#0e1430'], [.7, '#2a2f55'], [1, '#4a3a4a']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101sv)"/>`;
  s += `<g fill="#fff">${Array.from({ length: 40 }, (_, i) => `<circle cx="${f1(-150 + hash(i) * 1380)}" cy="${f1(-100 + hash(i + 50) * 800)}" r="${f1(2 + hash(i + 9) * 3)}" opacity="${op(.4 + .6 * hash(i + 3))}"/>`).join('')}</g><circle cx="850" cy="260" r="60" fill="#f4eccd"/>`;
  s += `<path d="M -200 1000 Q 200 900 540 980 T 1280 960 V 2120 H -200 Z" fill="#3a3a2a"/>`;
  s += `<g fill="#1d241a"><path d="M 760 1000 C 700 820 980 800 1000 980 Z"/><path d="M 900 1010 C 860 860 1120 860 1140 1000 Z"/><rect x="180" y="760" width="22" height="260"/><path d="M 60 780 Q 190 680 330 780 Z"/></g>`;
  let b = blur(s, o.strong);
  b += pool(850, 260, 300, 300, '#cfd8ff', .25);
  return b;
}
// stylised brain (pink, folds), centre x,y, s=1 → 420×320
export function brain(x, y, s, t = 0) {
  const g = `<path d="M -200 20 C -220 -90 -140 -160 -60 -150 C -30 -190 50 -190 80 -150 C 170 -160 230 -80 205 10 C 230 90 160 160 80 140 C 40 170 -40 170 -80 140 C -170 160 -230 90 -200 20 Z" fill="#f1a7b5" stroke="${INK}" stroke-width="8"/><g stroke="#c9707f" stroke-width="8" fill="none" stroke-linecap="round"><path d="M 0 -170 C -10 -100 20 -40 0 150"/><path d="M -150 -80 C -100 -60 -100 0 -60 10"/><path d="M -170 50 C -120 30 -90 80 -40 70"/><path d="M 150 -90 C 100 -60 110 0 60 0"/><path d="M 170 60 C 120 40 90 90 40 80"/></g>`;
  return `<g transform="translate(${f1(x)} ${f1(y + Math.sin(t * 2) * 6)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// magnifying glass: lens centre (x,y), radius r, col frame colour, inner: SVG shown inside lens (world coords, clipped)
export function magnifier(x, y, r, col, inner, id, rot = 35) {
  const rad = rot * Math.PI / 180, hx = x + Math.cos(rad) * r * 1.05, hy = y + Math.sin(rad) * r * 1.05;
  return `<defs><clipPath id="v101mg${id}"><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}"/></clipPath></defs><path d="M ${f1(hx)} ${f1(hy)} L ${f1(hx + Math.cos(rad) * r * 1.1)} ${f1(hy + Math.sin(rad) * r * 1.1)}" stroke="${INK}" stroke-width="${f1(r * .34)}" stroke-linecap="round"/><path d="M ${f1(hx)} ${f1(hy)} L ${f1(hx + Math.cos(rad) * r * 1.1)} ${f1(hy + Math.sin(rad) * r * 1.1)}" stroke="#6e4527" stroke-width="${f1(r * .22)}" stroke-linecap="round"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="#e8f4fb" opacity=".9"/><g clip-path="url(#v101mg${id})">${inner}</g><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="none" stroke="${INK}" stroke-width="${f1(r * .16 + 6)}"/><circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="none" stroke="${col}" stroke-width="${f1(r * .16)}"/><path d="M ${f1(x - r * .55)} ${f1(y - r * .3)} A ${f1(r * .7)} ${f1(r * .7)} 0 0 1 ${f1(x - r * .2)} ${f1(y - r * .62)}" stroke="#fff" stroke-width="${f1(r * .08)}" fill="none" stroke-linecap="round"/>`;
}
