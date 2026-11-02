// v97 sets: detailed far backgrounds (light blur), one light source each, plus sharp foreground strips.
// All in world coords 1080×1920; floor line around y 1130–1180 for medium shots (feet ≈ 1640).
import { K, f1, op, T, blur, pool, clock, plant, mug, phone } from './lib.js';
const INK = K.ink;
const lg = (id, stops, v = true) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;

const MOODS = {
  amber: { wall: ['#3a3550', '#5a4a5e', '#6b5560'], floor: ['#7a5a48', '#4e3a30'], sky: ['#14183a', '#2d3566'], light: '#ffd98a', rug: '#8c3f45' },
  blue: { wall: ['#273049', '#36425e', '#46506a'], floor: ['#4f4a52', '#34303a'], sky: ['#1b2d55', '#41588a'], light: '#a9c8ff', rug: '#3e5476' },
  day: { wall: ['#c9cfd6', '#d8d6cf', '#e0d8c8'], floor: ['#b08a68', '#8a6a50'], sky: ['#8fc6ea', '#cfe8f5'], light: '#fff3b0', rug: '#c25b4e' },
  grey: { wall: ['#4a4c56', '#5d5f68', '#696a70'], floor: ['#5e5751', '#403b37'], sky: ['#6d7480', '#9aa0a8'], light: '#e8e4da', rug: '#6b6566' },
};

// books on a shelf row
function books(x, y, list) {
  let s = '', cx = x;
  for (const [w, h, c] of list) { if (w < 0) { cx -= w; continue; } s += `<rect x="${cx}" y="${y - h}" width="${w}" height="${h}" fill="${c}"/>`; cx += w + 4; }
  return s;
}
function bookshelf(x, y, w, h) {
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="#6d4c3d"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="#4a3328" stroke-width="10"/>`;
  const rows = 4, rh = h / rows;
  for (let i = 1; i < rows; i++) s += `<rect x="${x}" y="${f1(y + i * rh)}" width="${w}" height="14" fill="#563a2e"/>`;
  s += books(x + 25, y + rh, [[26, 90, '#e0b04a'], [22, 80, '#5f8fb5'], [30, 95, '#c25b4e'], [20, 75, '#7aa27a'], [-40], [70, 70, '#d9cbb0']]);
  s += books(x + 25, y + 2 * rh, [[24, 80, '#7aa27a'], [30, 90, '#e0b04a'], [22, 70, '#c25b4e']]) + `<circle cx="${x + w - 90}" cy="${f1(y + 2 * rh - 50)}" r="34" fill="#4f7a59"/><rect x="${x + w - 105}" y="${f1(y + 2 * rh - 45)}" width="30" height="45" fill="#b9714f"/>`;
  s += books(x + 40, y + 3 * rh, [[28, 80, '#5f8fb5'], [26, 90, '#d9cbb0'], [-50], [90, 60, '#e0b04a']]);
  s += books(x + 25, y + 4 * rh - 6, [[60, 50, '#a4553f'], [-20], [24, 90, '#5f8fb5'], [24, 84, '#c25b4e'], [24, 70, '#7aa27a']]);
  return s;
}
function frames(x, y) {
  return `<rect x="${x}" y="${y}" width="110" height="140" fill="#e8dcc8"/><rect x="${x + 12}" y="${y + 12}" width="86" height="116" fill="#8fb3a8"/><path d="M ${x + 20} ${y + 110} L ${x + 50} ${y + 70} L ${x + 70} ${y + 95} L ${x + 85} ${y + 80} L ${x + 92} ${y + 120} Z" fill="#5d8a7a"/>` +
    `<rect x="${x + 10}" y="${y + 180}" width="90" height="90" fill="#e8dcc8"/><rect x="${x + 22}" y="${y + 192}" width="66" height="66" fill="#d98f6b"/><circle cx="${x + 55}" cy="${y + 220}" r="16" fill="#f3c27a"/>`;
}
function cityWindow(x, y, w, h, sky, t, o = {}) {
  const id = `v97sky1`;
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
  const id = `v97wall2`, fid = `v97floor3`;
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
export function kitchen(t, o = {}) {
  const id = `v97kw7`;
  let s = `<defs>${lg(id, [[0, '#f3e3c3'], [.6, '#f6e7c9'], [1, '#ead2a6']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#${id})"/>`;
  // tiles band
  s += `<rect x="-200" y="760" width="1480" height="260" fill="#e8eef0"/><g stroke="#c9d3d8" stroke-width="4">${Array.from({ length: 5 }, (_, i) => `<path d="M -200 ${760 + i * 52} H 1280"/>`).join('')}${Array.from({ length: 24 }, (_, i) => `<path d="M ${-200 + i * 64} 760 v 260"/>`).join('')}</g>`;
  // window with sun + tree
  s += `<rect x="300" y="240" width="460" height="480" fill="#bfe3f5"/><circle cx="660" cy="340" r="56" fill="#fff3a8"/><circle cx="420" cy="620" r="110" fill="#7fb87a"/><circle cx="520" cy="660" r="90" fill="#6aa565"/><rect x="300" y="240" width="460" height="480" fill="none" stroke="#fff" stroke-width="20"/><line x1="530" y1="240" x2="530" y2="720" stroke="#fff" stroke-width="12"/><line x1="300" y1="480" x2="760" y2="480" stroke="#fff" stroke-width="12"/>`;
  s += `<rect x="280" y="720" width="500" height="22" fill="#fff"/>` + plant(360, 720, .6, '#d9663a') + plant(700, 720, .55, '#5f8fb5');
  // shelves left with jars, hanging pans
  s += `<rect x="-160" y="420" width="400" height="14" fill="#a8744a"/><rect x="-160" y="600" width="400" height="14" fill="#a8744a"/>`;
  s += [[-120, '#e0b04a'], [-40, '#c25b4e'], [40, '#7aa27a'], [130, '#f2efe8']].map(([x, c]) => `<rect x="${x}" y="330" width="60" height="90" rx="10" fill="${c}"/><rect x="${x + 6}" y="320" width="48" height="14" rx="4" fill="#8a5a36"/>`).join('');
  s += [[-100, '#f2efe8'], [0, '#5f8fb5'], [100, '#f2efe8']].map(([x, c]) => `<path d="M ${x} 540 h 60 l -6 60 h -48 z" fill="${c}"/>`).join('');
  s += `<path d="M 800 250 H 1060" stroke="#8a8a8a" stroke-width="8"/>${[840, 920, 1000].map((x, i) => `<path d="M ${x} 250 v 40" stroke="#8a8a8a" stroke-width="5"/><circle cx="${x}" cy="${330 + i * 6}" r="${40 + i * 6}" fill="#4a4a4f"/><rect x="${x - 6}" y="280" width="12" height="20" fill="#4a4a4f"/>`).join('')}`;
  // fridge right
  if (o.fridge !== false) s += `<rect x="840" y="440" width="300" height="700" rx="20" fill="#e9edf0"/><path d="M 840 700 H 1140" stroke="#b8c0c8" stroke-width="6"/><rect x="860" y="560" width="12" height="100" rx="6" fill="#b8c0c8"/><rect x="860" y="740" width="12" height="140" rx="6" fill="#b8c0c8"/><circle cx="920" cy="500" r="14" fill="#d9493f"/><circle cx="1010" cy="520" r="14" fill="#3c9a5f"/><rect x="960" y="760" width="90" height="110" fill="#fff8d0" transform="rotate(5 1005 815)"/>`;
  s += clock(160, 230, 60, 9, 0);
  // counter
  s += `<rect x="-200" y="1020" width="1040" height="140" fill="#a8744a"/><rect x="-200" y="1010" width="1040" height="20" fill="#c9a26b"/>`;
  s += `<rect x="-200" y="1160" width="1480" height="960" fill="#d8c3a0"/><g fill="#000" opacity=".06">${Array.from({ length: 8 }, (_, i) => `<rect x="${-200 + i * 200}" y="1160" width="5" height="960"/>`).join('')}</g>`;
  let b = blur(s, o.strong);
  // sun shafts from the window (light source)
  b += `<path d="M 330 260 L 760 260 L 1000 1700 L 120 1700 Z" fill="#fff6c8" opacity=".16"/>`;
  b += pool(560, 480, 380, 380, '#fff3b0', .4) + pool(540, 1350, 520, 220, '#fff3b0', .18);
  return b;
}

// ---------- modern office (Florida study) ----------
export function office(t, o = {}) {
  const id = `v97ow9`;
  let s = `<defs>${lg(id, [[0, '#cfe3ea'], [.6, '#dceaee'], [1, '#e6eef0'], ])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#${id})"/>`;
  s += `<rect x="620" y="260" width="400" height="500" fill="#8fd0f0"/><circle cx="920" cy="350" r="50" fill="#fff3a8"/><rect x="620" y="640" width="400" height="120" fill="#e8d6a0"/><path d="M 700 760 C 700 640 690 540 720 470" stroke="#7a5a3a" stroke-width="16" fill="none"/>${[[-70, -30], [-30, -60], [20, -50], [60, -10]].map(([a, c]) => `<path d="M 720 470 q ${a} ${c} ${a * 1.6} ${c + 60}" stroke="#3c8a4f" stroke-width="22" fill="none" stroke-linecap="round"/>`).join('')}<rect x="620" y="260" width="400" height="500" fill="none" stroke="#fff" stroke-width="18"/>`;
  s += `<rect x="70" y="300" width="460" height="320" rx="10" fill="#fff" stroke="#b8c0c8" stroke-width="12"/><g fill="#5f8fb5">${[[120, 200], [210, 140], [300, 240], [390, 90]].map(([x, h]) => `<rect x="${x}" y="${580 - h}" width="60" height="${h}"/>`).join('')}</g><path d="M 100 580 H 500" stroke="#555" stroke-width="5"/>`;
  s += `<rect x="560" y="800" width="460" height="16" fill="#9a7a5a"/>${books(580, 800, [[26, 80, '#c25b4e'], [24, 70, '#5f8fb5'], [30, 90, '#e0b04a'], [22, 64, '#7aa27a'], [-40], [80, 50, '#d9cbb0']])}`;
  s += `<rect x="-200" y="1130" width="1480" height="990" fill="#b9b2a6"/>`;
  s += plant(80, 1130, 1.2, '#e0e0e0');
  let b = blur(s);
  b += `<path d="M 620 260 L 1020 260 L 1080 1500 L 300 1500 Z" fill="#fff8d8" opacity=".14"/>` + pool(820, 520, 320, 340, '#fff3b0', .3);
  return b;
}

// ---------- sharp foregrounds ----------
export function fgTable(t, o = {}) {
  const y = o.y || 1700, c = o.col || '#8a5a3c', hi = o.hi || '#a26c4a';
  let s = `<rect x="-60" y="${y}" width="1200" height="${2000 - y}" rx="20" fill="${c}" stroke="${INK}" stroke-width="5"/><rect x="-60" y="${y}" width="1200" height="26" fill="${hi}"/>`;
  if (o.mug !== false) s += mug(o.mugX || 210, y, 1, '#f2efe8', t);
  if (o.keys) s += `<g transform="translate(${o.keys} ${y + 14})"><circle cx="0" cy="-10" r="20" fill="none" stroke="#c9a86a" stroke-width="7"/><rect x="14" y="-16" width="60" height="12" rx="4" fill="#c9a86a"/></g>`;
  if (o.phone) s += `<rect x="${o.phone}" y="${y - 30}" width="150" height="34" rx="10" fill="${INK}" transform="rotate(-6 ${o.phone + 75} ${y - 13})"/>`;
  if (o.glass) s += `<path d="M ${o.glass - 35} ${y - 70} L ${o.glass + 35} ${y - 70} L ${o.glass + 29} ${y} L ${o.glass - 29} ${y} Z" fill="#e8b85c" stroke="${INK}" stroke-width="5"/>`;
  return s;
}

// ---------- meeting room ----------
export function meeting(t, o = {}) {
  let s = `<defs>${lg('v97mw1', [[0, '#cdd6df'], [.6, '#dfe4e8'], [1, '#e5e3dc']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v97mw1)"/>`;
  s += `<rect x="300" y="240" width="520" height="340" fill="#fff" stroke="#9aa7b0" stroke-width="10"/><rect x="330" y="270" width="460" height="280" fill="#eef3f8"/><path d="M 360 520 L 450 440 L 540 470 L 640 360 L 760 300" stroke="#3d6fb6" stroke-width="10" fill="none"/>${T(560, 320, 'Q3', 34, { fill: '#55606e' })}`;
  s += `<rect x="-160" y="220" width="420" height="760" fill="#b9d3e2" opacity=".7"/><g stroke="#8fa7b6" stroke-width="6">${Array.from({ length: 14 }, (_, i) => `<path d="M -160 ${250 + i * 52} H 260"/>`).join('')}</g><rect x="-160" y="220" width="420" height="760" fill="none" stroke="#7a8a96" stroke-width="12"/>`;
  s += `<rect x="860" y="250" width="300" height="420" fill="#fff" stroke="#b8c0c8" stroke-width="10"/>${[300, 360, 420, 480].map((y, i) => `<rect x="890" y="${y}" width="${200 - i * 30}" height="14" rx="7" fill="#c25b4e" opacity=".6"/>`).join('')}`;
  s += plant(900, 1000, 1.1, '#e0e0e0');
  s += `<rect x="-200" y="1000" width="1480" height="1120" fill="#a9a59c"/>`;
  s += `<g fill="#3a3f48">${[150, 420, 700].map(x => `<rect x="${x - 70}" y="760" width="140" height="240" rx="30"/>`).join('')}</g>`;
  let b = blur(s);
  for (const x of [260, 820]) b += `<rect x="${x - 120}" y="60" width="240" height="22" rx="11" fill="#f4f6f8" stroke="${INK}" stroke-width="4"/>`;
  b += pool(560, 400, 420, 300, '#eef6ff', .4);
  return b;
}
export function meetingTable(y = 1380) {
  return `<path d="M -60 ${y} H 1140 V 2000 H -60 Z" fill="#6e5a48" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="26" fill="#8a7058"/>` +
    `<rect x="120" y="${y - 20}" width="180" height="24" rx="4" fill="#f2efe8" stroke="${INK}" stroke-width="4" transform="rotate(-4 210 ${y - 8})"/><rect x="780" y="${y - 70}" width="70" height="70" rx="8" fill="#f2efe8" stroke="${INK}" stroke-width="5"/>`;
}


// ---------- open-plan office (noon / sunny Tuesday morning) ----------
export function openOffice(t, o = {}) {
  const sun = o.mood === 'sun';
  let s = `<defs>${lg('v97oo1', sun ? [[0, '#f3ead6'], [.6, '#f2e6cf'], [1, '#e9dcc0']] : [[0, '#d7dde2'], [.6, '#e0e3e4'], [1, '#e2ded5']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v97oo1)"/>`;
  // big windows with city
  s += `<rect x="-160" y="230" width="1400" height="560" fill="${sun ? '#cfe9f7' : '#bcd7e6'}"/>`;
  s += `<g fill="${sun ? '#a9c4d6' : '#9db6c6'}">${[[-150, 420], [20, 360], [190, 470], [360, 330], [560, 440], [740, 380], [930, 460], [1100, 400]].map(([x, y]) => `<rect x="${x}" y="${y}" width="150" height="${790 - y}"/>`).join('')}</g>`;
  s += `<g fill="#fff" opacity=".55">${Array.from({ length: 16 }, (_, i) => `<rect x="${-120 + (i * 97) % 1300}" y="${400 + (i * 61) % 300}" width="18" height="24"/>`).join('')}</g>`;
  if (sun) s += `<circle cx="880" cy="330" r="60" fill="#fff6c4"/>`;
  s += `<g stroke="#f4f4f2" stroke-width="16">${[-160, 190, 540, 890, 1240].map(x => `<path d="M ${x} 230 V 790"/>`).join('')}<path d="M -160 230 H 1240 M -160 790 H 1240"/></g>`;
  // pin board, shelf with binders, clock, plants
  s += `<rect x="40" y="840" width="300" height="200" fill="#c9a26b" stroke="#8a6a4a" stroke-width="10"/>${[[70, 870, '#ffe066'], [160, 880, '#a9cfe8'], [250, 866, '#f6b0b0'], [90, 950, '#c8e6c0'], [200, 960, '#ffe066']].map(([x, y, c]) => `<rect x="${x}" y="${y}" width="70" height="60" fill="${c}"/>`).join('')}`;
  s += `<rect x="700" y="880" width="380" height="16" fill="#8a6a4a"/>${[[720, '#c25b4e'], [770, '#5f8fb5'], [820, '#e0b04a'], [870, '#7aa27a'], [920, '#5f8fb5']].map(([x, c]) => `<rect x="${x}" y="800" width="44" height="80" rx="4" fill="${c}"/>`).join('')}`;
  s += clock(560, 900, 46, o.hh === undefined ? 12 : o.hh, o.mm === undefined ? 30 : o.mm);
  s += plant(1010, 880, .7, '#e0e0e0');
  // far desks with monitors and co-workers
  s += `<rect x="-200" y="1060" width="1480" height="1060" fill="${sun ? '#b9a88c' : '#aaa59a'}"/>`;
  s += `<g>${[[-60, '#7aa27a'], [880, '#c25b4e']].map(([x, c]) => `<path d="M ${x - 70} 1060 C ${x - 70} 990 ${x + 70} 990 ${x + 70} 1060 Z" fill="${c}"/><circle cx="${x}" cy="930" r="60" fill="#1d1d1d"/>`).join('')}</g>`;
  s += `<rect x="-200" y="1040" width="1480" height="30" fill="#e8e2d6"/>`;
  s += `<g>${[200, 520].map(x => `<rect x="${x}" y="930" width="170" height="110" rx="8" fill="#2a2f36"/><rect x="${x + 10}" y="940" width="150" height="90" fill="#9cc3e0"/>`).join('')}</g>`;
  let b = blur(s, o.strong);
  // ceiling lights / sun shafts (light source)
  if (sun) b += `<path d="M 600 230 L 1100 230 L 1300 1700 L 300 1700 Z" fill="#fff4c8" opacity=".2"/>` + pool(840, 500, 420, 420, '#fff0a8', .45);
  else { for (const x of [260, 820]) b += `<rect x="${x - 120}" y="60" width="240" height="22" rx="11" fill="#f4f6f8" stroke="${K.ink}" stroke-width="4"/>`; b += pool(540, 420, 560, 360, '#f2f7ff', .35); }
  return b;
}
// sharp desk foreground with monitor (screen inner svg in local coords x -230..230, y -320..-30), keyboard, mug
export function desk(t, o = {}) {
  const y = o.y || 1380, mx = o.mx === undefined ? 540 : o.mx;
  let s = `<path d="M -60 ${y} H 1140 V 2000 H -60 Z" fill="#d8c3a0" stroke="${K.ink}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="24" fill="#e8d8b8"/>`;
  if (o.monitor !== false) {
    s += `<g transform="translate(${mx} ${y})"><rect x="-26" y="-60" width="52" height="60" fill="#555"/><rect x="-90" y="-12" width="180" height="16" rx="6" fill="#555" stroke="${K.ink}" stroke-width="4"/>`;
    s += `<rect x="-250" y="-340" width="500" height="300" rx="16" fill="#2a2f36" stroke="${K.ink}" stroke-width="6"/><rect x="-232" y="-322" width="464" height="264" fill="${o.screen || '#e9eef5'}"/>${o.inner || ''}</g>`;
  }
  if (o.keyboard !== false) s += `<rect x="${mx - 170}" y="${y + 40}" width="340" height="50" rx="10" fill="#e6e6e6" stroke="${K.ink}" stroke-width="5"/><g fill="#bbb">${Array.from({ length: 10 }, (_, i) => `<rect x="${mx - 155 + i * 31}" y="${y + 52}" width="24" height="10" rx="3"/><rect x="${mx - 155 + i * 31}" y="${y + 68}" width="24" height="10" rx="3"/>`).join('')}</g>`;
  if (o.mug !== false) s += mug(o.mugX || 880, y + 30, 1, '#e8742f', t);
  if (o.notes) s += `<g transform="translate(160 ${y + 20}) rotate(-8)"><rect x="-50" y="-44" width="100" height="88" fill="#ffe066" stroke="${K.ink}" stroke-width="4"/></g>`;
  return s;
}
// program window for the monitor (local coords of desk monitor)
export function programUI(o = {}) {
  let s = `<rect x="-232" y="-322" width="464" height="34" fill="#3d6fb6"/><circle cx="-210" cy="-305" r="7" fill="#f2c14e"/><rect x="-190" y="-311" width="120" height="12" rx="6" fill="#dbe6f5"/>`;
  s += `<rect x="-222" y="-278" width="110" height="210" fill="#d7dee8"/>${[-260, -230, -200, -170, -140].map((y, i) => `<rect x="-212" y="${y}" width="${80 - (i % 2) * 20}" height="12" rx="6" fill="#9aa6b4"/>`).join('')}`;
  s += `<rect x="-100" y="-278" width="320" height="160" fill="#fff" stroke="#c4ccd6" stroke-width="3"/>`;
  const fix = o.fix || 0;
  if (fix < 1) s += `<g opacity="${op(1 - fix)}"><rect x="-60" y="-250" width="240" height="100" rx="10" fill="#fbe3e1" stroke="#d9493f" stroke-width="4"/><circle cx="-20" cy="-200" r="26" fill="#d9493f"/>${T(-20, -189, '!', 34, { fill: '#fff' })}<rect x="20" y="-216" width="130" height="12" rx="6" fill="#d9493f" opacity=".6"/><rect x="20" y="-192" width="90" height="12" rx="6" fill="#d9493f" opacity=".6"/></g>`;
  if (fix > 0) s += `<g opacity="${op(fix)}"><rect x="-80" y="-266" width="280" height="22" rx="8" fill="#e3edf9"/><rect x="-80" y="-266" width="${f1(280 * fix)}" height="22" rx="8" fill="#3c9a5f"/><rect x="-80" y="-226" width="200" height="12" rx="6" fill="#9aa6b4"/><rect x="-80" y="-202" width="240" height="12" rx="6" fill="#9aa6b4"/><rect x="-80" y="-178" width="160" height="12" rx="6" fill="#9aa6b4"/></g>`;
  s += `<rect x="-100" y="-106" width="320" height="38" rx="8" fill="#e3edf9"/>`;
  if (o.cursor) s += `<path d="M ${o.cursor[0]} ${o.cursor[1]} l 0 34 l 9 -8 l 7 16 l 7 -3 l -7 -16 l 12 -1 Z" fill="#fff" stroke="${K.ink}" stroke-width="3"/>`;
  return s;
}

// ---------- dining room at home (warm amber evening, pendant lamp) ----------
export function dining(t, o = {}) {
  let s = `<defs>${lg('v97dw1', [[0, '#4a3a3a'], [.55, '#6a4e44'], [1, '#7a5a48']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v97dw1)"/>`;
  // wallpaper stripes
  s += `<g fill="#000" opacity=".06">${Array.from({ length: 16 }, (_, i) => `<rect x="${-200 + i * 100}" y="-200" width="40" height="1340"/>`).join('')}</g>`;
  // window with evening sky + curtains
  s += `<defs>${lg('v97dsky', [[0, '#1d2550'], [1, '#c26a4a']])}</defs><rect x="620" y="300" width="360" height="460" rx="8" fill="url(#v97dsky)"/><g fill="#1b1f3f">${[[640, 620], [720, 560], [800, 640], [880, 590]].map(([x, y]) => `<rect x="${x}" y="${y}" width="70" height="${760 - y}"/>`).join('')}</g><rect x="620" y="300" width="360" height="460" rx="8" fill="none" stroke="#e8dcc8" stroke-width="16"/><line x1="800" y1="300" x2="800" y2="760" stroke="#e8dcc8" stroke-width="10"/>`;
  s += `<path d="M 590 270 C 620 420 580 640 610 800 L 660 800 C 640 640 670 420 650 270 Z" fill="#a8463f"/><path d="M 1010 270 C 980 420 1020 640 990 800 L 940 800 C 960 640 930 420 950 270 Z" fill="#a8463f"/>`;
  // dresser with plates, framed family photo, wall clock
  s += `<rect x="60" y="720" width="420" height="380" fill="#6d4c3d"/><rect x="60" y="720" width="420" height="20" fill="#8a6248"/>${[90, 200, 310].map(x => `<rect x="${x}" y="780" width="100" height="140" fill="#5a3f2e"/><circle cx="${x + 80}" cy="850" r="7" fill="#c9a86a"/>`).join('')}`;
  s += `<rect x="60" y="400" width="420" height="16" fill="#5a3f2e"/>${[110, 200, 290, 380].map((x, i) => `<circle cx="${x}" cy="350" r="44" fill="${['#f2efe8', '#7fa7cf', '#f2efe8', '#e8b85c'][i]}" stroke="#d9cbb0" stroke-width="6"/>`).join('')}`;
  s += `<rect x="150" y="470" width="150" height="190" fill="#e8dcc8"/><rect x="164" y="484" width="122" height="162" fill="#8fb3a8"/><circle cx="205" cy="560" r="22" fill="#1d1d1d"/><circle cx="250" cy="575" r="18" fill="#1d1d1d"/>`;
  s += `<rect x="340" y="470" width="110" height="140" fill="#e8dcc8"/><rect x="352" y="482" width="86" height="116" fill="#d98f6b"/>`;
  s += clock(540, 380, 44, 19, 0);
  s += plant(560, 1100, .9);
  s += `<rect x="-200" y="1100" width="1480" height="1020" fill="#5e4234"/><g fill="#000" opacity=".1">${[1200, 1340, 1520].map(y => `<rect x="-200" y="${y}" width="1480" height="5"/>`).join('')}</g>`;
  let b = blur(s, o.strong);
  // pendant lamp (light source) above the table
  const lx = o.lampX || 540;
  b += `<path d="M ${lx} -20 V ${o.lampY || 300}" stroke="#2a2420" stroke-width="6"/><path d="M ${lx - 110} ${(o.lampY || 300) + 90} L ${lx + 110} ${(o.lampY || 300) + 90} L ${lx + 60} ${o.lampY || 300} L ${lx - 60} ${o.lampY || 300} Z" fill="#d98a3e" stroke="${K.ink}" stroke-width="5"/><ellipse cx="${lx}" cy="${(o.lampY || 300) + 92}" rx="70" ry="14" fill="#ffe7a6"/>`;
  b += pool(lx, (o.lampY || 300) + 500, 560, 620, '#ffcf7a', .42);
  return b;
}
// dining table foreground (sharp)
export function diningTable(t, o = {}) {
  const y = o.y || 1380;
  let s = `<path d="M -60 ${y} H 1140 V 2000 H -60 Z" fill="#8a5a3c" stroke="${K.ink}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="26" fill="#a26c4a"/>`;
  s += `<path d="M 180 ${y} L 900 ${y} L 960 2000 L 120 2000 Z" fill="#f1e6d0" opacity=".9"/><path d="M 180 ${y} L 900 ${y}" stroke="#d9c7a6" stroke-width="6"/>`;
  if (o.glass !== false) s += `<path d="M ${o.glassX || 860} ${y - 90} h 60 l -6 90 h -48 z" fill="#cfe3ef" stroke="${K.ink}" stroke-width="5" opacity=".95"/>`;
  return s;
}

// ---------- Chicago skyline (daylight, lake) ----------
export function chicago(t, o = {}) {
  const dx = o.dx || 0;
  let s = `<defs>${lg('v97ch1', [[0, '#6fa8d8'], [.6, '#b9d8ec'], [1, '#e9e0c9']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v97ch1)"/>`;
  s += `<g fill="#fff" opacity=".8"><ellipse cx="200" cy="300" rx="120" ry="34"/><ellipse cx="290" cy="280" rx="80" ry="30"/><ellipse cx="820" cy="380" rx="140" ry="32"/></g>`;
  const B = [[-160, 760, 160, '#5d6f86'], [10, 560, 130, '#6d7f96'], [150, 380, 120, '#3f4f66'], [280, 640, 150, '#7a8aa0'], [440, 300, 110, '#2f3d52'], [560, 500, 140, '#56677e'], [710, 420, 120, '#46566d'], [840, 620, 160, '#6a7b92'], [1010, 520, 150, '#4e5f76']];
  let g = '';
  B.forEach(([x, y, w, c], k) => {
    g += `<rect x="${x}" y="${y}" width="${w}" height="${1150 - y}" fill="${c}"/>`;
    for (let r = 0; y + 40 + r * 60 < 1100; r++) g += `<rect x="${x + 14}" y="${y + 40 + r * 60}" width="${w - 28}" height="10" fill="#c9d8e8" opacity=".5"/>`;
  });
  // two antenna towers
  g += `<path d="M 470 300 V 210 M 520 300 V 220" stroke="#2f3d52" stroke-width="10"/><rect x="430" y="300" width="130" height="20" fill="#2f3d52"/>`;
  s += `<g transform="translate(${f1(dx * .5)} 0)">${g}</g>`;
  // lake + promenade + trees
  s += `<rect x="-200" y="1150" width="1480" height="200" fill="#4f88b5"/><g stroke="#8fc0e0" stroke-width="5" opacity=".7">${Array.from({ length: 8 }, (_, i) => `<path d="M ${-150 + i * 170} ${1190 + (i % 3) * 40} h 70"/>`).join('')}</g>`;
  s += `<rect x="-200" y="1350" width="1480" height="770" fill="#9aa07a"/>`;
  s += `<g transform="translate(${f1(dx * .8)} 0)">${[[60, 1360], [300, 1380], [820, 1370], [1040, 1360]].map(([x, y]) => `<rect x="${x - 12}" y="${y - 140}" width="24" height="140" fill="#5a3f2e"/><circle cx="${x}" cy="${y - 190}" r="90" fill="#4f7a59"/>`).join('')}</g>`;
  let b = blur(s);
  b += pool(880, 200, 380, 300, '#fff6c4', .45);
  return b;
}
