// v94 sets: detailed far backgrounds (light blur), one light source each, plus sharp foreground strips.
// All in world coords 1080×1920; floor line around y 1130–1180 for medium shots (feet ≈ 1640).
import { K, f1, op, T, blur, pool, clock, plant, mug, phone, laptop } from './lib.js';
const INK = K.ink;
let gid = 0;
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
  const id = `v94sky1`;
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
  const id = `v94wall2`, fid = `v94floor3`;
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

// ---------- street (evening, grey-blue) ----------
export function street(t, o = {}) {
  const dx = o.dx || 0;
  const id = `v94st4`;
  let s = `<defs>${lg(id, [[0, '#2b3656'], [.6, '#56607a'], [1, '#8a8590']])}</defs><rect x="-200" y="-200" width="1480" height="1500" fill="url(#${id})"/>`;
  const blds = [[-160, 260, 330, '#5b5160'], [170, 160, 300, '#6e5c58'], [470, 300, 290, '#55606e'], [760, 200, 300, '#6a5a6a'], [1060, 280, 260, '#5b5160']];
  let g = '';
  blds.forEach(([x, y, w, c], k) => {
    g += `<rect x="${x}" y="${y}" width="${w}" height="${1150 - y}" fill="${c}"/><rect x="${x - 10}" y="${y - 20}" width="${w + 20}" height="26" fill="#3e3640"/>`;
    for (let r = 0; r < 5; r++) for (let c2 = 0; c2 < 3; c2++) {
      const wx = x + 30 + c2 * (w - 60) / 3, wy = y + 50 + r * 150; if (wy > 900) continue;
      const lit = ((k * 7 + r * 3 + c2) % 4) !== 0;
      g += `<rect x="${f1(wx)}" y="${wy}" width="${f1((w - 60) / 3 - 22)}" height="96" fill="${lit ? '#ffd57a' : '#2f3346'}" opacity="${lit ? .9 : 1}"/><rect x="${f1(wx - 4)}" y="${wy + 96}" width="${f1((w - 60) / 3 - 14)}" height="10" fill="#3e3640"/>`;
    }
  });
  s += `<g transform="translate(${f1(dx * .4)} 0)">${g}</g>`;
  // shop with awning
  s += `<g transform="translate(${f1(dx * .6)} 0)"><rect x="200" y="930" width="420" height="220" fill="#2d2a33"/><rect x="220" y="960" width="380" height="170" fill="#f0c779" opacity=".85"/><path d="M 180 930 L 640 930 L 620 880 L 200 880 Z" fill="#c25b4e"/><path d="M 180 930 L 640 930" stroke="#fff" stroke-width="8" stroke-dasharray="40 40"/>${T(410, 915, 'BÄCKEREI', 34, { fill: '#fff' })}<circle cx="300" cy="1040" r="30" fill="#c98a4b"/><circle cx="380" cy="1050" r="26" fill="#d9a35e"/></g>`;
  s += `<rect x="-200" y="1150" width="1480" height="70" fill="#7c7a80"/><rect x="-200" y="1220" width="1480" height="900" fill="#4b4a52"/>`;
  s += `<g fill="#5b5a62">${[1290, 1420, 1600, 1820].map((y, i) => Array.from({ length: 8 }, (_, j) => `<rect x="${-180 + j * 190 + (i % 2) * 90}" y="${y}" width="170" height="${70 + i * 20}" rx="8"/>`).join('')).join('')}</g>`;
  // tree, bench, bike, bus stop
  s += `<g transform="translate(${f1(dx * .8)} 0)"><rect x="850" y="760" width="34" height="400" fill="#5a3f2e"/><circle cx="867" cy="700" r="130" fill="#3f6e4a"/><circle cx="800" cy="760" r="80" fill="#4f7a59"/><circle cx="950" cy="770" r="80" fill="#4f7a59"/>`;
  s += `<rect x="40" y="1060" width="200" height="22" rx="8" fill="#7b5a3c"/><rect x="40" y="1020" width="200" height="18" rx="8" fill="#7b5a3c"/><rect x="60" y="1080" width="12" height="70" fill="#333"/><rect x="210" y="1080" width="12" height="70" fill="#333"/>`;
  s += `<g fill="none" stroke="#333" stroke-width="10"><circle cx="680" cy="1110" r="42"/><circle cx="800" cy="1110" r="42"/><path d="M 680 1110 L 720 1050 L 790 1050 L 800 1110 M 720 1050 L 740 1110 L 790 1050"/></g>`;
  s += `<rect x="990" y="860" width="12" height="290" fill="#444"/><circle cx="996" cy="850" r="38" fill="#f2c14e" stroke="#444" stroke-width="8"/>${T(996, 864, 'H', 40, { fill: '#2e7d4f' })}</g>`;
  let b = blur(s);
  // street lamp (light source), sharp-ish
  b += `<g transform="translate(${f1(140 + dx)} 0)"><rect x="-8" y="420" width="16" height="740" fill="#2a2a30"/><path d="M -8 430 C -8 380 60 370 90 400" stroke="#2a2a30" stroke-width="12" fill="none"/><path d="M 60 400 L 120 400 L 108 430 L 72 430 Z" fill="#2a2a30"/><ellipse cx="90" cy="436" rx="22" ry="8" fill="#ffe7a6"/></g>`;
  b += pool(230 + dx, 800, 300, 520, '#ffd98a', .3);
  return b;
}

// ---------- café (warm) ----------
export function cafe(t, o = {}) {
  const id = `v94cw5`;
  let s = `<defs>${lg(id, [[0, '#6a4a3a'], [.5, '#8a6248'], [1, '#9b7253']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#${id})"/>`;
  // brick panel
  s += `<rect x="-200" y="250" width="620" height="660" fill="#9a5544"/><g fill="none" stroke="#7a3f33" stroke-width="5">${Array.from({ length: 11 }, (_, r) => `<path d="M -200 ${310 + r * 60} H 420"/>` + Array.from({ length: 6 }, (_, c) => `<path d="M ${-180 + c * 110 + (r % 2) * 55} ${250 + r * 60} v 60"/>`).join('')).join('')}</g>`;
  // menu chalkboard
  s += `<rect x="470" y="300" width="300" height="360" rx="10" fill="#2e3430" stroke="#7b5a3c" stroke-width="16"/>${T(620, 370, 'KAFFEE', 40, { fill: '#f3ead7' })}<g fill="#c9c2b0">${[420, 470, 520, 570, 610].map((y, i) => `<rect x="500" y="${y}" width="${150 - (i % 3) * 25}" height="12" rx="6"/><rect x="${700 - (i % 2) * 6}" y="${y}" width="44" height="12" rx="6"/>`).join('')}</g>`;
  // window right with street
  s += `<rect x="820" y="260" width="300" height="560" fill="#b9cfe0"/><rect x="820" y="600" width="300" height="220" fill="#8a9fb3"/><rect x="820" y="260" width="300" height="560" fill="none" stroke="#5a3f2e" stroke-width="18"/><line x1="970" y1="260" x2="970" y2="820" stroke="#5a3f2e" stroke-width="10"/>`;
  // shelves with cups/jars
  s += `<rect x="-160" y="420" width="540" height="14" fill="#5a3f2e"/><rect x="-160" y="600" width="540" height="14" fill="#5a3f2e"/>`;
  s += [[-120, '#f2efe8'], [-40, '#e8b85c'], [40, '#f2efe8'], [120, '#7fa7cf'], [220, '#f2efe8']].map(([x, c]) => `<path d="M ${x} 360 h 56 l -6 60 h -44 z" fill="${c}"/>`).join('');
  s += [[-110, '#d9a35e'], [-10, '#9c6b3e'], [90, '#e0c08a'], [200, '#7a4a2e']].map(([x, c]) => `<rect x="${x}" y="500" width="70" height="100" rx="12" fill="${c}"/><rect x="${x + 8}" y="488" width="54" height="16" rx="4" fill="#5a3f2e"/>`).join('');
  s += plant(330, 600, .8);
  // counter + espresso machine + cake display
  s += `<rect x="-200" y="900" width="1480" height="260" fill="#5a3f2e"/><rect x="-200" y="880" width="1480" height="30" fill="#c9a26b"/>`;
  s += `<rect x="60" y="720" width="260" height="170" rx="16" fill="#b8c0c8"/><rect x="80" y="740" width="220" height="40" rx="8" fill="#8e979f"/><rect x="110" y="800" width="30" height="50" fill="#555"/><rect x="230" y="800" width="30" height="50" fill="#555"/><circle cx="190" cy="760" r="14" fill="#d9493f"/>`;
  s += `<rect x="560" y="760" width="300" height="130" rx="10" fill="#dfe8ee" opacity=".8"/><g>${[600, 680, 760].map((x, i) => `<path d="M ${x} 860 l 30 -50 l 30 50 z" fill="${['#e8b85c', '#c25b4e', '#f2d1a8'][i]}"/>`).join('')}</g>`;
  s += `<rect x="-200" y="1160" width="1480" height="960" fill="#6e4a36"/><g fill="#000" opacity=".1">${Array.from({ length: 6 }, (_, i) => `<rect x="${-200 + i * 260}" y="1160" width="6" height="960"/>`).join('')}</g>`;
  let b = blur(s, o.strong);
  // pendant lamps (light source)
  for (const x of [300, 780]) b += `<path d="M ${x} -20 V 200" stroke="#2a2420" stroke-width="5"/><path d="M ${x - 60} 260 L ${x + 60} 260 L ${x + 34} 200 L ${x - 34} 200 Z" fill="#2f2a24"/><ellipse cx="${x}" cy="262" rx="40" ry="12" fill="#ffe7a6"/>`;
  b += pool(300, 700, 360, 560, '#ffcf7a', .32) + pool(780, 700, 360, 560, '#ffcf7a', .28);
  return b;
}

// ---------- bedroom (Friday night, dark blue) ----------
export function bedroom(t, o = {}) {
  const dawn = o.dawn || 0;
  const id = `v94bw6`;
  let s = `<defs>${lg(id, [[0, '#141a33'], [.6, '#1e2848'], [1, '#273257']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#${id})"/>`;
  s += cityWindow(560, 260, 420, 520, ['#0b1030', '#1d2a5a'], t, { bld: '#0e1330' });
  s += `<g fill="#fff">${[[620, 300], [700, 340], [880, 300], [760, 290], [940, 380]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="3"/>`).join('')}</g>`;
  s += `<path d="M 520 230 C 550 420 510 640 540 820 L 600 820 C 580 640 610 420 580 230 Z" fill="#3a3f6e"/><path d="M 1020 230 C 990 420 1030 640 1000 820 L 940 820 C 960 640 930 420 960 230 Z" fill="#3a3f6e"/>`;
  s += `<rect x="90" y="320" width="300" height="200" fill="#2c3460"/><rect x="104" y="334" width="272" height="172" fill="#3e4a80"/><circle cx="190" cy="420" r="40" fill="#5c6aa8"/><path d="M 120 500 L 220 420 L 290 480 L 360 430 L 376 506 H 104 Z" fill="#2a3266"/>`;
  s += `<rect x="70" y="600" width="380" height="16" fill="#2c2f4e"/>${books(100, 600, [[24, 70, '#4a5a8a'], [28, 80, '#6b4a6a'], [22, 60, '#3a6a6a'], [-30], [60, 40, '#5a5a7a']])}`;
  s += `<rect x="-200" y="1100" width="1480" height="1020" fill="#1b2140"/>`;
  // nightstand + digital clock
  s += `<rect x="40" y="880" width="220" height="240" rx="10" fill="#2a2e4e"/><rect x="40" y="880" width="220" height="20" fill="#363b62"/><rect x="60" y="960" width="180" height="10" fill="#22253f"/>`;
  s += `<rect x="70" y="800" width="160" height="80" rx="10" fill="#111"/>${T(150, 858, '03:12', 46, { fill: '#ff4d4d' })}`;
  s += `<path d="M 300 880 L 330 760 L 400 760 L 430 880 Z" fill="#3c4370"/><rect x="355" y="740" width="20" height="30" fill="#2a2e4e"/>`;
  let b = blur(s);
  b += pool(150, 840, 140, 80, '#ff4d4d', .25);
  b += pool(770, 520, 300, 360, '#7f9cff', .22 + dawn * .2);
  return b;
}

// ---------- kitchen (Saturday morning, sunny) ----------
export function kitchen(t, o = {}) {
  const id = `v94kw7`;
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

// ---------- 1920s study (Zeigarnik) ----------
export function study(t, o = {}) {
  const id = `v94sw8`;
  let s = `<defs>${lg(id, [[0, '#4a3b2c'], [.6, '#6a5440'], [1, '#7a6048']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#${id})"/>`;
  s += `<g stroke="#5a4634" stroke-width="3" opacity=".6">${Array.from({ length: 20 }, (_, i) => `<path d="M ${-200 + i * 80} -200 V 1150"/>`).join('')}</g>`;
  s += bookshelf(40, 300, 360, 640) + bookshelf(720, 300, 340, 640);
  s += `<rect x="440" y="340" width="240" height="300" fill="#c9a86a"/><rect x="458" y="358" width="204" height="264" fill="#efe3c4"/>${T(560, 430, 'PSYCHO-', 26, { fill: '#5a4634' })}${T(560, 462, 'LOGISCHES', 26, { fill: '#5a4634' })}${T(560, 494, 'INSTITUT', 26, { fill: '#5a4634' })}${T(560, 560, 'BERLIN', 30, { fill: '#8a3a2a' })}`;
  s += `<circle cx="560" cy="790" r="70" fill="#5f8fb5"/><path d="M 510 760 C 540 740 580 780 610 770 M 500 810 C 540 800 580 830 620 810" stroke="#7aa27a" stroke-width="16" fill="none"/><rect x="550" y="860" width="20" height="60" fill="#5a3f2e"/><rect x="510" y="910" width="100" height="16" fill="#5a3f2e"/>`;
  s += `<rect x="-200" y="1130" width="1480" height="990" fill="#4a3426"/><ellipse cx="540" cy="1420" rx="500" ry="150" fill="#7a3a33" opacity=".5"/>`;
  let b = blur(s);
  b += `<path d="M 880 1090 L 880 980 Q 880 950 910 950 L 1000 950" stroke="#2a2420" stroke-width="10" fill="none"/><path d="M 960 920 L 1060 920 L 1040 980 L 980 980 Z" fill="#2e6b4a" stroke="${INK}" stroke-width="4"/>`;
  b += pool(1010, 1050, 300, 260, '#ffd98a', .38);
  return b;
}

// ---------- modern office (Florida study) ----------
export function office(t, o = {}) {
  const id = `v94ow9`;
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
