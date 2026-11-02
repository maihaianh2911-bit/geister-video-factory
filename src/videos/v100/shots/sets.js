// v100 sets: detailed far backgrounds (one light blur group), one light source each (radialGradient pools), sharp foregrounds.
// World coords 1080×1920; medium-shot floor line ≈1130–1180, feet ≈1640.
import { K, f1, op, T, blur, pool, clock, plant, mug, phone, laptop, head } from './lib.js';
const INK = K.ink;
let gid = 0;
export const lg = (id, stops, v = true) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;

const MOODS = {
  amber: { wall: ['#3a3550', '#5a4a5e', '#6b5560'], floor: ['#7a5a48', '#4e3a30'], sky: ['#14183a', '#2d3566'], light: '#ffd98a', rug: '#8c3f45' },
  blue: { wall: ['#273049', '#36425e', '#46506a'], floor: ['#4f4a52', '#34303a'], sky: ['#1b2d55', '#41588a'], light: '#a9c8ff', rug: '#3e5476' },
  day: { wall: ['#c9cfd6', '#d8d6cf', '#e0d8c8'], floor: ['#b08a68', '#8a6a50'], sky: ['#8fc6ea', '#cfe8f5'], light: '#fff3b0', rug: '#c25b4e' },
  grey: { wall: ['#4a4c56', '#5d5f68', '#696a70'], floor: ['#5e5751', '#403b37'], sky: ['#6d7480', '#9aa0a8'], light: '#e8e4da', rug: '#6b6566' },
};

// books on a shelf row
export function books(x, y, list) {
  let s = '', cx = x;
  for (const [w, h, c] of list) { if (w < 0) { cx -= w; continue; } s += `<rect x="${cx}" y="${y - h}" width="${w}" height="${h}" fill="${c}"/>`; cx += w + 4; }
  return s;
}
export function bookshelf(x, y, w, h) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#6d4c3d"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#4a3328" stroke-width="10"/>`;
  const rows = 4, rh = h / rows;
  for (let i = 1; i < rows; i++) s += `<rect x="${x}" y="${f1(y + i * rh)}" width="${w}" height="14" fill="#563a2e"/>`;
  s += books(x + 25, y + rh, [[26, 90, '#e0b04a'], [22, 80, '#5f8fb5'], [30, 95, '#c25b4e'], [20, 75, '#7aa27a'], [-40], [70, 70, '#d9cbb0']]);
  s += books(x + 25, y + 2 * rh, [[24, 80, '#7aa27a'], [30, 90, '#e0b04a'], [22, 70, '#c25b4e']]) + `<circle cx="${x + w - 90}" cy="${f1(y + 2 * rh - 50)}" r="34" fill="#4f7a59"/><rect x="${x + w - 105}" y="${f1(y + 2 * rh - 45)}" width="30" height="45" fill="#b9714f"/>`;
  s += books(x + 40, y + 3 * rh, [[28, 80, '#5f8fb5'], [26, 90, '#d9cbb0'], [-50], [90, 60, '#e0b04a']]);
  s += books(x + 25, y + 4 * rh - 6, [[60, 50, '#a4553f'], [-20], [24, 90, '#5f8fb5'], [24, 84, '#c25b4e'], [24, 70, '#7aa27a']]);
  return s;
}
export function frames(x, y) {
  return `<rect x="${x}" y="${y}" width="110" height="140" fill="#e8dcc8"/><rect x="${x + 12}" y="${y + 12}" width="86" height="116" fill="#8fb3a8"/><path d="M ${x + 20} ${y + 110} L ${x + 50} ${y + 70} L ${x + 70} ${y + 95} L ${x + 85} ${y + 80} L ${x + 92} ${y + 120} Z" fill="#5d8a7a"/>` +
    `<rect x="${x + 10}" y="${y + 180}" width="90" height="90" fill="#e8dcc8"/><rect x="${x + 22}" y="${y + 192}" width="66" height="66" fill="#d98f6b"/><circle cx="${x + 55}" cy="${y + 220}" r="16" fill="#f3c27a"/>`;
}
export function cityWindow(x, y, w, h, sky, t, o = {}) {
  const id = `v100sky1`;
  let s = `<defs>${lg(id, [[0, sky[0]], [1, sky[1]]])}</defs><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="url(#${id})"/>`;
  if (o.moon !== false) s += `<circle cx="${x + w - 90}" cy="${y + 80}" r="34" fill="${o.sun ? '#fff3c4' : '#f4eccd'}"/>`;
  const bw = w / 5;
  const hs = [200, 260, 220, 280, 180];
  s += `<g fill="${o.bld || '#1b1f3f'}">${hs.map((hh, i) => `<rect x="${f1(x + i * bw + 6)}" y="${y + h - hh}" width="${f1(bw - 8)}" height="${hh}"/>`).join('')}</g>`;
  if (o.lit !== false) s += `<g fill="#ffd36b">${Array.from({ length: 12 }, (_, i) => `<rect x="${f1(x + 20 + (i * 67) % (w - 40))}" y="${f1(y + h - 60 - ((i * 53) % 160))}" width="10" height="12"/>`).join('')}</g>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="#e8dcc8" stroke-width="16"/><line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="#e8dcc8" stroke-width="10"/>`;
  return s;
}

// ---------- home room (Mon/Tue/Wed) ----------
export function room(t, o = {}) {
  const M = MOODS[o.mood || 'amber'];
  const id = `v100wall2`, fid = `v100floor3`;
  let s = `<defs>${lg(id, [[0, M.wall[0]], [.55, M.wall[1]], [1, M.wall[2]]])}${lg(fid, [[0, M.floor[0]], [1, M.floor[1]]])}</defs>`;
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="url(#${id})"/>`;
  s += cityWindow(600, 300, 380, 520, M.sky, t, { lit: o.mood !== 'grey' && o.mood !== 'day', moon: o.mood !== 'grey', sun: o.mood === 'day', bld: o.mood === 'day' ? '#7d93ab' : undefined });
  s += `<path d="M 570 270 C 600 420 560 640 590 860 L 640 860 C 620 640 650 420 630 270 Z" fill="#b5566a"/>`;
  s += bookshelf(70, 330, 330, 560);
  s += frames(440, 360);
  if (o.clock !== false) s += clock(495, 715, 50, o.hh === undefined ? 18 : o.hh, o.mm === undefined ? 10 : o.mm);
  s += `<rect x="-200" y="1130" width="1480" height="990" fill="url(#${fid})"/>`;
  s += `<g fill="#000" opacity=".12">${[1250, 1400, 1580, 1780].map(y => `<rect x="-200" y="${y}" width="1480" height="5"/>`).join('')}</g>`;
  s += `<ellipse cx="540" cy="1400" rx="520" ry="150" fill="${M.rug}" opacity=".55"/>`;
  if (o.sofa !== false) s += `<rect x="80" y="880" width="920" height="200" rx="40" fill="#3f6f8f"/><rect x="60" y="960" width="960" height="230" rx="36" fill="#2d5470"/><rect x="130" y="930" width="160" height="110" rx="22" fill="#e6b55c"/><rect x="790" y="925" width="150" height="110" rx="22" fill="#c25b4e"/>`;
  if (o.basket) s += `<g transform="translate(${o.basket[0]} ${o.basket[1]})"><path d="M -110 -100 H 110 L 90 0 H -90 Z" fill="#c9a26b"/><path d="M -100 -70 H 100 M -96 -40 H 96" stroke="#a5814f" stroke-width="6"/><path d="M -90 -100 C -70 -150 -10 -150 0 -110 C 20 -160 80 -150 95 -100 Z" fill="#7fa7cf"/><path d="M -40 -110 C -20 -140 20 -140 30 -112" fill="#e58a8a"/></g>`;
  s += plant(1020, 1130, 1.1);
  let b = blur(s, o.strong);
  // light source
  const L = o.light === undefined ? 1 : o.light;
  b += `<rect x="980" y="380" width="10" height="760" fill="#2a2420"/><path d="M 930 360 L 1040 360 L 1010 300 L 960 300 Z" fill="#f1d7a3"/>`;
  b += pool(985, 600, 380, 460, M.light, .38 * L) + pool(700, 1300, 520, 220, M.light, .12 * L);
  return b;
}

// ---------- kitchen (Saturday morning, sunny) ----------
export function office2(t, o = {}) {
  let s = `<defs>${lg('v100ow1', [[0, '#c8d6de'], [.6, '#d8e0e2'], [1, '#e0dfd8']])}${lg('v100osky', [[0, '#8fc6ea'], [1, '#d6ecf6']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v100ow1)"/>`;
  s += `<rect x="-140" y="240" width="560" height="560" fill="url(#v100osky)"/><g fill="#9fb3c4">${[[-120, 520, 140], [40, 460, 120], [180, 560, 150], [320, 500, 100]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${800 - y}"/>`).join('')}</g><rect x="-140" y="240" width="560" height="560" fill="none" stroke="#fff" stroke-width="18"/><line x1="140" y1="240" x2="140" y2="800" stroke="#fff" stroke-width="12"/>`;
  s += `<rect x="480" y="290" width="330" height="230" rx="6" fill="#fff" stroke="#9aa7b0" stroke-width="8"/><path d="M 510 480 L 580 420 L 640 450 L 720 360 L 780 330" stroke="#3c9a5f" stroke-width="8" fill="none"/><g fill="#f2c14e">${[[510, 310], [560, 310], [610, 310]].map(([x, y]) => `<rect x="${x}" y="${y}" width="40" height="40" transform="rotate(4 ${x} ${y})"/>`).join('')}</g>`;
  s += clock(900, 340, 52, 9, 40);
  s += `<rect x="840" y="440" width="300" height="16" fill="#9a7a5a"/>${books(856, 440, [[26, 80, '#c25b4e'], [24, 70, '#5f8fb5'], [30, 90, '#e0b04a'], [-20], [70, 50, '#d9cbb0']])}<rect x="840" y="640" width="300" height="16" fill="#9a7a5a"/><g>${[860, 940, 1020].map((x, i) => `<rect x="${x}" y="570" width="64" height="70" rx="4" fill="${['#5f8fb5', '#d9cbb0', '#7aa27a'][i]}"/>`).join('')}</g>`;
  s += `<rect x="-200" y="1080" width="1480" height="1040" fill="#a9aaa6"/><g fill="#000" opacity=".07">${Array.from({ length: 9 }, (_, i) => `<rect x="${-200 + i * 180}" y="1080" width="4" height="1040"/>`).join('')}</g>`;
  // background desks with monitors + printer + coat rack + plant
  s += `<rect x="460" y="820" width="460" height="24" fill="#c9b79a"/><path d="M 480 844 V 1080 M 900 844 V 1080" stroke="#8a7a6a" stroke-width="12"/><rect x="520" y="660" width="200" height="140" rx="8" fill="#2a2f36"/><rect x="532" y="672" width="176" height="116" fill="#bcd8ee"/><rect x="600" y="800" width="40" height="22" fill="#555"/>`;
  s += `<rect x="760" y="740" width="130" height="80" rx="8" fill="#e8e8e4"/><rect x="775" y="750" width="100" height="16" fill="#555"/>`;
  s += plant(1000, 1080, 1.1, '#e0e0e0') + `<path d="M 420 1080 V 700 M 380 700 H 460" stroke="#6b5a4a" stroke-width="10"/><path d="M 400 720 C 360 760 360 900 390 960 L 440 960 C 460 900 450 760 420 720 Z" fill="#c25b4e"/>`;
  let b = blur(s, o.strong);
  b += `<path d="M -140 240 L 420 240 L 760 1700 L -200 1700 Z" fill="#fff8d8" opacity=".12"/>` + pool(140, 520, 420, 420, '#fffbe0', .45);
  return b;
}
// sharp desk in front: keyboard, monitor back/side, mug, papers. y = desk top
export function desk(t, o = {}) {
  const y = o.y || 1300, c = o.col || '#c9a77c', hi = o.hi || '#dcbd95';
  let s = '';
  if (o.monitor !== false) { const mx = o.monX === undefined ? 820 : o.monX; s += `<rect x="${mx - 20}" y="${y - 130}" width="40" height="130" fill="#555" stroke="${INK}" stroke-width="5"/><rect x="${mx - 200}" y="${y - 430}" width="400" height="300" rx="14" fill="#2a2f36" stroke="${INK}" stroke-width="6"/><rect x="${mx - 184}" y="${y - 414}" width="368" height="268" rx="6" fill="${o.screen || '#dfeaf4'}"/>${o.screenInner || ''}`; }
  s += `<path d="M -60 ${y} H 1140 V 2000 H -60 Z" fill="${c}" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="26" fill="${hi}"/>`;
  if (o.keyboard !== false) { const kx = o.kbX || 470; s += `<rect x="${kx - 230}" y="${y + 40}" width="460" height="90" rx="12" fill="#e8e8e4" stroke="${INK}" stroke-width="5"/><g fill="#b8bcc0">${Array.from({ length: 3 }, (_, r) => Array.from({ length: 12 }, (_, c2) => `<rect x="${kx - 214 + c2 * 36}" y="${y + 52 + r * 24}" width="28" height="16" rx="3"/>`).join('')).join('')}</g>`; }
  if (o.mug !== false) s += mug(o.mugX || 120, y + 90, 1, '#f2efe8', t);
  if (o.extra) s += o.extra;
  return s;
}

// ---------- Texas campus (bright day, sun top right) ----------
export function voidRoom(t, o = {}) {
  let s = `<defs>${lg('v100vw1', [[0, '#1c2436'], [.6, '#283248'], [1, '#323c52']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v100vw1)"/>`;
  s += cityWindow(620, 300, 360, 460, ['#0e1430', '#222c50'], t, { lit: false, bld: '#141a34' });
  s += `<rect x="80" y="360" width="340" height="520" fill="#2e384e"/>${[460, 580, 700].map(y => `<rect x="80" y="${y}" width="340" height="12" fill="#222a3c"/>`).join('')}` + frames(470, 380).replace(/#e8dcc8|#8fb3a8|#5d8a7a|#d98f6b|#f3c27a/g, '#4a5670');
  s += `<rect x="-200" y="1100" width="1480" height="1020" fill="#252b3a"/>`;
  let b = blur(s, o.strong);
  b += `<path d="M 540 -20 V 220" stroke="#11141c" stroke-width="6"/><path d="M 430 300 L 650 300 L 600 210 L 480 210 Z" fill="#3a4a66" stroke="${INK}" stroke-width="5"/>`;
  b += pool(540, 900, 600, 640, '#8fb0e8', .22);
  return b;
}
// simple dining chair seen from the front (sharp). a = opacity
