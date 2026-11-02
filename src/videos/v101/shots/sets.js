// v101 sets: detailed far backgrounds (one light blur group), one light source each (radialGradient pools), sharp foregrounds.
// World coords 1080×1920; medium-shot floor line ≈1130–1180, feet ≈1640.
import { K, f1, op, T, blur, pool, clock, plant, mug, phone, laptop, head } from './lib.js';
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
  const id = `v101sky1`;
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
  const id = `v101wall2`, fid = `v101floor3`;
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
  const id = `v101kw7`;
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


// ---------- bedroom, Monday 6:30 (blue-grey dawn); window right is the light source ----------
export function bedroom2(t, o = {}) {
  const d = o.dawn || 0;
  let s = `<defs>${lg('v101bw1', [[0, '#2c3650'], [.6, '#3b4762'], [1, '#4a5470']])}${lg('v101bsky', [[0, '#6f86b0'], [1, '#e6b9a0']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101bw1)"/>`;
  // window + curtains
  s += `<rect x="620" y="260" width="380" height="480" rx="8" fill="url(#v101bsky)"/><g fill="#33405e">${[0, 1, 2, 3].map(i => `<rect x="${640 + i * 92}" y="${560 - (i % 2) * 70}" width="80" height="${180 + (i % 2) * 70}"/>`).join('')}</g><g fill="#ffd9a0" opacity=".8">${[[660, 600], [760, 520], [870, 610], [940, 560]].map(([x, y]) => `<rect x="${x}" y="${y}" width="12" height="14"/>`).join('')}</g><rect x="620" y="260" width="380" height="480" rx="8" fill="none" stroke="#c9cdd6" stroke-width="16"/><line x1="810" y1="260" x2="810" y2="740" stroke="#c9cdd6" stroke-width="10"/>`;
  s += `<path d="M 590 230 C 620 420 580 620 610 800 L 660 800 C 640 620 670 420 650 230 Z" fill="#5a6a8e"/><path d="M 1030 230 C 1000 420 1040 620 1010 800 L 960 800 C 980 620 950 420 970 230 Z" fill="#5a6a8e"/><path d="M 570 225 H 1060" stroke="#888" stroke-width="10"/>`;
  // wardrobe left, posters, shelf with books + plant, hanging jacket
  s += `<rect x="-120" y="240" width="360" height="900" rx="10" fill="#5a4a46"/><path d="M 60 250 V 1130" stroke="#43363a" stroke-width="8"/><circle cx="40" cy="700" r="9" fill="#c9a86a"/><circle cx="80" cy="700" r="9" fill="#c9a86a"/>`;
  s += `<rect x="290" y="300" width="130" height="170" fill="#d8d0c0"/><rect x="302" y="312" width="106" height="146" fill="#c25b4e"/><circle cx="355" cy="370" r="30" fill="#f2c14e"/><rect x="450" y="330" width="120" height="120" fill="#d8d0c0"/><rect x="462" y="342" width="96" height="96" fill="#5f8fb5"/><path d="M 470 430 L 510 380 L 550 430 Z" fill="#7aa27a"/>`;
  s += `<rect x="280" y="560" width="300" height="16" fill="#6d4c3d"/>${books(296, 560, [[24, 80, '#e0b04a'], [20, 70, '#7aa27a'], [28, 86, '#c25b4e'], [22, 64, '#d9cbb0'], [-30]])}` + plant(530, 560, .5, '#d9663a');
  s += `<path d="M 300 640 h 40 v 30" stroke="#888" stroke-width="6" fill="none"/><path d="M 300 670 C 280 700 280 820 300 860 L 380 860 C 400 820 400 700 380 670 Z" fill="#c25b4e"/>`;
  s += `<rect x="-200" y="1130" width="1480" height="990" fill="#3a3a4a"/><ellipse cx="560" cy="1500" rx="560" ry="160" fill="#4e5a7a" opacity=".5"/>`;
  // chair with clothes, slippers
  s += `<rect x="440" y="900" width="140" height="18" fill="#7a5a48"/><path d="M 450 918 V 1120 M 570 918 V 1120 M 450 900 V 760 H 570 V 900" stroke="#7a5a48" stroke-width="12" fill="none"/><path d="M 440 880 C 470 840 560 850 590 890 L 560 940 L 470 930 Z" fill="#7aa27a"/>`;
  let b = blur(s, o.strong);
  b += pool(810, 500, 380, 420, '#f6c8a8', .3 + d * .25) + pool(700, 1200, 600, 300, '#a9c0ff', .14 + d * .1);
  return b;
}
// bed with du lying in it (seen slightly from above). Head on the pillow at (hx,hy). o: t, eyes, look, brows, mouth, arm: hand target [x,y] (world) or null, phone: {lit, rot, scroll}
export function bedDu(t, o = {}) {
  const hx = o.hx || 330, hy = o.hy || 1010, s = o.s || 1;
  let g = `<path d="M -60 1000 H 1140 V 1420 H -60 Z" fill="#6d4c3d" stroke="${INK}" stroke-width="6"/>`; // bed frame
  g += `<path d="M -40 940 H 1120 V 1360 H -40 Z" fill="#e9ecf2" stroke="${INK}" stroke-width="5"/>`; // mattress/sheet
  g += `<rect x="${hx - 230 * s}" y="${hy - 150 * s}" width="${460 * s}" height="${250 * s}" rx="${60 * s}" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/><path d="M ${hx - 190 * s} ${hy + 60 * s} C ${hx - 60 * s} ${hy + 90 * s} ${hx + 60 * s} ${hy + 90 * s} ${hx + 190 * s} ${hy + 60 * s}" stroke="#d8d2c4" stroke-width="6" fill="none"/>`;
  g += head('du', hx, hy - 10 * s, .9 * s, { t, seed: 1, eyes: o.eyes, look: o.look, brows: o.brows, mouth: o.mouth, blink: o.blink, headTilt: o.tilt === undefined ? -8 : o.tilt });
  // blanket from the chin to the right
  const bt = hy + 120 * s;
  g += `<path d="M ${hx - 260 * s} ${bt + 20} C ${hx - 120 * s} ${bt - 30} ${hx + 300} ${bt - 40} 1140 ${bt - 60} V 1400 H ${hx - 280 * s} Z" fill="#4f7fb5" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M ${hx - 250 * s} ${bt + 26} C ${hx - 100 * s} ${bt - 10} ${hx + 300} ${bt - 20} 1140 ${bt - 40}" stroke="#7fa7d8" stroke-width="18" fill="none"/>`;
  g += `<g stroke="#3d6a9a" stroke-width="6" fill="none">${[0, 1, 2].map(i => `<path d="M ${hx + 120 + i * 180} ${bt + 40} c 40 60 30 140 10 220"/>`).join('')}</g>`;
  if (o.arm) {
    const sx = hx + 150 * s, sy = bt + 10, [ax, ay] = o.arm;
    const mx = (sx + ax) / 2 + 60, my = (sy + ay) / 2 + 40;
    const d = `M ${f1(sx)} ${f1(sy)} Q ${f1(mx)} ${f1(my)} ${f1(ax)} ${f1(ay)}`;
    g += `<path d="${d}" stroke="${INK}" stroke-width="56" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${K.du}" stroke-width="44" fill="none" stroke-linecap="round"/>`;
    if (o.phone) g += o.phone(ax, ay);
    g += `<circle cx="${f1(ax)}" cy="${f1(ay + 30)}" r="24" fill="${INK}"/>`;
  }
  return g;
}
// nightstand + digital alarm clock (sharp, foreground left). ring 0..1 shakes it. txt = clock digits
export function nightstand(t, x, y, o = {}) {
  const ring = o.ring || 0, sh = ring ? Math.sin(t * 70) * 6 * ring : 0, cx = x + (o.cdx || 0);
  let g = `<rect x="${x - 170}" y="${y}" width="340" height="420" rx="10" fill="#6b5446" stroke="${INK}" stroke-width="6"/><rect x="${x - 170}" y="${y}" width="340" height="30" fill="#7e6352" stroke="${INK}" stroke-width="5"/><rect x="${x - 140}" y="${y + 80}" width="280" height="120" rx="8" fill="#5c4639" stroke="${INK}" stroke-width="4"/><circle cx="${x}" cy="${y + 140}" r="10" fill="#c9a86a"/>`;
  g += `<g transform="translate(${f1(cx + sh)} ${y}) rotate(${f1(sh * .8)})"><rect x="-120" y="-130" width="240" height="130" rx="22" fill="#2a2a30" stroke="${INK}" stroke-width="6"/><rect x="-100" y="-110" width="200" height="80" rx="10" fill="#160f12"/>${T(0, -48, o.txt || '06:30', 60, { fill: '#ff5a4a' })}</g>`;
  if (ring > 0) g += pool(cx, y - 70, 200, 140, '#ff5a4a', .35 * ring) + `<g stroke="#ffd23f" stroke-width="8" fill="none" stroke-linecap="round" opacity="${op(ring)}"><path d="M ${cx - 150} ${y - 150} q -24 -30 -10 -60"/><path d="M ${cx + 150} ${y - 150} q 24 -30 10 -60"/><path d="M ${cx - 185} ${y - 120} q -34 -40 -16 -90"/><path d="M ${cx + 185} ${y - 120} q 34 -40 16 -90"/></g>`;
  if (o.phone) g += o.phone;
  return g;
}

// ---------- office (daylight, window left is the light source) ----------
export function office2(t, o = {}) {
  let s = `<defs>${lg('v101ow1', [[0, '#c8d6de'], [.6, '#d8e0e2'], [1, '#e0dfd8']])}${lg('v101osky', [[0, '#8fc6ea'], [1, '#d6ecf6']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101ow1)"/>`;
  s += `<rect x="-140" y="240" width="560" height="560" fill="url(#v101osky)"/><g fill="#9fb3c4">${[[-120, 520, 140], [40, 460, 120], [180, 560, 150], [320, 500, 100]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${800 - y}"/>`).join('')}</g><rect x="-140" y="240" width="560" height="560" fill="none" stroke="#fff" stroke-width="18"/><line x1="140" y1="240" x2="140" y2="800" stroke="#fff" stroke-width="12"/>`;
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
export function campus(t, o = {}) {
  let s = `<defs>${lg('v101csky', [[0, '#5aa8e0'], [.7, '#bfe3f5'], [1, '#f4e6c8']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101csky)"/>`;
  s += `<circle cx="900" cy="260" r="70" fill="#fff6c8"/>`;
  // main building with tower
  const wall = o.brick ? '#b0583f' : '#e8d2a8', wall2 = o.brick ? '#a24e38' : '#efdcb5';
  s += `<rect x="400" y="300" width="200" height="520" fill="${wall}"/><path d="M 380 300 H 620 L 500 200 Z" fill="#c98a5a"/><rect x="450" y="340" width="100" height="100" fill="#f6e7c9"/>${clock(500, 390, 40, 10, 10)}<g fill="#7b8fa6">${[480, 560, 640, 720].map(y => `<rect x="440" y="${y}" width="40" height="50"/><rect x="520" y="${y}" width="40" height="50"/>`).join('')}</g>`;
  s += `<rect x="80" y="620" width="920" height="460" fill="${wall2}"/><path d="M 60 620 H 1020 L 990 580 H 90 Z" fill="#c98a5a"/><g fill="#7b8fa6">${Array.from({ length: 9 }, (_, i) => `<rect x="${120 + i * 100}" y="680" width="56" height="90" rx="26"/><rect x="${120 + i * 100}" y="830" width="56" height="90"/>`).join('')}</g><rect x="440" y="940" width="200" height="140" fill="#8a5a36"/><path d="M 440 940 Q 540 880 640 940" fill="#8a5a36"/>`;
  // trees, lamp posts, lawn, path
  s += `<rect x="-200" y="1080" width="1480" height="1040" fill="#8cbf6a"/><path d="M 470 1080 L 610 1080 L 900 2100 L 200 2100 Z" fill="#e8d8b0"/>`;
  for (const [x, r] of [[-40, 150], [140, 110], [940, 140], [1110, 120]]) s += `<rect x="${x - 14}" y="${1080 - r * 1.4}" width="28" height="${r * 1.4}" fill="#7a5a3a"/><circle cx="${x}" cy="${1080 - r * 1.6}" r="${r}" fill="#5e9a50"/><circle cx="${x + r * .4}" cy="${1080 - r * 1.9}" r="${r * .7}" fill="#6fae5e"/>`;
  for (const x of [300, 780]) s += `<rect x="${x - 6}" y="880" width="12" height="200" fill="#333"/><circle cx="${x}" cy="874" r="20" fill="#f6f1d8"/>`;
  let b = blur(s, o.strong);
  b += pool(900, 260, 420, 420, '#fff3b0', .45);
  return b;
}

// ---------- lecture hall (neutral daylight from the windows top) ----------
export function hall(t, o = {}) {
  let s = `<defs>${lg('v101hw1', [[0, '#b9a58a'], [.6, '#cdbb9e'], [1, '#d6c6aa']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101hw1)"/>`;
  s += `<rect x="140" y="260" width="800" height="380" rx="8" fill="#2f4a3e" stroke="#8a6a4a" stroke-width="18"/>`;
  s += `<g stroke="#f2efe8" stroke-width="7" fill="none"><path d="M 200 360 l 60 -34 l 60 34 l -60 34 Z M 200 360 v 70 l 60 34 v -70 M 320 360 v 70 l -60 34"/><path d="M 420 330 h 90 v 90 h -90 Z M 420 360 h 90 M 420 390 h 90 M 450 330 v 90 M 480 330 v 90"/></g>${T(740, 400, '2 · 4 · 8 · ?', 54, { fill: '#f2efe8', w: 700 })}${T(740, 520, 'A → ? → C', 44, { fill: '#f2efe8', w: 700 })}`;
  s += `<g fill="#e8f0f4">${[-160, 980].map(x => `<rect x="${x}" y="200" width="220" height="520"/>`).join('')}</g>`;
  // tiers of desks with small background students (props)
  const cols = ['#c25b4e', '#5f8fb5', '#7aa27a', '#e0b04a', '#8a5bb5', '#e8742f'];
  for (let r = 0; r < 3; r++) {
    const y = 820 + r * 120, n = 7 + r, w = 1300 / n;
    for (let i = 0; i < n; i++) { const x = -110 + w * (i + .5); s += `<path d="M ${f1(x - 46 - r * 4)} ${y + 40} C ${f1(x - 46)} ${y - 20} ${f1(x + 46)} ${y - 20} ${f1(x + 46 + r * 4)} ${y + 40} Z" fill="${cols[(i + r * 2) % 6]}"/><circle cx="${f1(x)}" cy="${y - 40}" r="${40 + r * 6}" fill="#1d1d1d"/>`; }
    s += `<rect x="-200" y="${y + 30}" width="1480" height="40" fill="#8a6a4a"/><rect x="-200" y="${y + 70}" width="1480" height="50" fill="#6e5440"/>`;
  }
  s += `<rect x="-200" y="1180" width="1480" height="940" fill="#6e5440"/>`;
  let b = blur(s, o.strong);
  b += pool(540, 300, 700, 300, '#fff8e0', .3);
  return b;
}
// exam cubicle panel (one half of a split, local coords x0..x0+540). side: 'tisch' | 'neben'
export function examPanel(t, x0, side, o = {}) {
  const warm = side === 'neben';
  let s = `<defs>${lg('v101ex' + side, warm ? [[0, '#d9e6dc'], [1, '#eef0e4']] : [[0, '#c9ccd8'], [1, '#dcdde4']])}</defs><rect x="${x0}" y="0" width="540" height="1920" fill="url(#v101ex${side})"/>`;
  // wall props: clock, window or door, shelf, plant
  s += clock(x0 + 110, 560, 46, 10, 15);
  if (side === 'neben') {
    // open door into the next room, phone on a shelf there
    s += `<rect x="${x0 + 280}" y="440" width="200" height="660" fill="#8a7a6a"/><rect x="${x0 + 296}" y="456" width="168" height="644" fill="#f0dcb0"/><rect x="${x0 + 310}" y="760" width="140" height="14" fill="#a8744a"/><rect x="${x0 + 350}" y="650" width="60" height="110" fill="#1d1d1d" rx="10"/><rect x="${x0 + 358}" y="660" width="44" height="88" fill="#5f8fd0" rx="5"/><path d="M ${x0 + 296} 456 L ${x0 + 240} 480 V 1080 L ${x0 + 296} 1100 Z" fill="#b8a48c" stroke="#7a6a5a" stroke-width="4"/>`;
  } else {
    s += `<rect x="${x0 + 260}" y="420" width="220" height="280" fill="#bcd8ee"/><rect x="${x0 + 260}" y="420" width="220" height="280" fill="none" stroke="#fff" stroke-width="14"/><line x1="${x0 + 370}" y1="420" x2="${x0 + 370}" y2="700" stroke="#fff" stroke-width="8"/>`;
  }
  s += `<rect x="${x0 + 40}" y="760" width="190" height="12" fill="#9a7a5a"/>${books(x0 + 52, 760, [[20, 60, '#c25b4e'], [18, 70, '#5f8fb5'], [22, 56, '#e0b04a']])}` + plant(x0 + 190, 760, .4, '#d9663a');
  s += `<rect x="${x0}" y="1100" width="540" height="820" fill="${warm ? '#b7ad98' : '#a7a4a6'}"/>`;
  let b = `<g clip-path="url(#v101clip${side})">${blur(s)}</g>`;
  return `<defs><clipPath id="v101clip${side}"><rect x="${x0}" y="0" width="540" height="1920"/></clipPath></defs>` + b;
}

// ---------- dining room (evening, warm orange pendant lamp is the light source) ----------
export function dining(t, o = {}) {
  const dim = o.dim || 0;
  let s = `<defs>${lg('v101dw1', [[0, '#4a3a3a'], [.6, '#6a4c42'], [1, '#7a5848']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101dw1)"/>`;
  s += cityWindow(640, 300, 360, 460, ['#141a3a', '#3a3a6a'], t, {});
  s += `<rect x="60" y="360" width="360" height="560" fill="#7a5a44"/><g>${[440, 560, 680].map(y => `<rect x="60" y="${y}" width="360" height="12" fill="#5a3f2e"/>`).join('')}</g>`;
  s += [100, 170, 240, 310].map((x, i) => `<circle cx="${x + 20}" cy="410" r="28" fill="${['#f2efe8', '#7fa7cf', '#f2efe8', '#e8b85c'][i]}"/>`).join('') + [90, 190, 300].map((x, i) => `<path d="M ${x} 556 h 60 l -8 -60 h -44 z" fill="${['#c25b4e', '#f2efe8', '#7aa27a'][i]}"/>`).join('') + `<rect x="100" y="600" width="80" height="80" rx="8" fill="#e0b04a"/><rect x="220" y="610" width="60" height="70" rx="8" fill="#d9cbb0"/>`;
  s += frames(470, 380) + plant(560, 930, .8, '#b9714f');
  s += `<rect x="-200" y="1100" width="1480" height="1020" fill="#4e3a30"/>`;
  s += `<g fill="#3a2a22">${[160, 900].map(x => `<rect x="${x - 70}" y="760" width="140" height="340" rx="20"/>`).join('')}</g>`;
  let b = blur(s, o.strong);
  const L = 1 - dim * .7;
  b += `<path d="M 540 -20 V 220" stroke="#2a2420" stroke-width="6"/><path d="M 430 300 L 650 300 L 600 210 L 480 210 Z" fill="#e8742f" stroke="${INK}" stroke-width="5"/><ellipse cx="540" cy="302" rx="90" ry="16" fill="#ffe7a6" opacity="${op(L)}"/>`;
  b += pool(540, 700, 620, 700, '#ffb35a', .38 * L) + pool(540, 1400, 640, 260, '#ffb35a', .2 * L);
  return b;
}
// dining table (sharp foreground) with plates
export function dinTable(t, y = 1380, o = {}) {
  let s = `<path d="M -60 ${y} H 1140 V 2000 H -60 Z" fill="#8a5a3c" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="26" fill="#a26c4a"/>`;
  for (const x of (o.plates || [260, 800])) s += `<ellipse cx="${x}" cy="${y + 90}" rx="150" ry="44" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/><ellipse cx="${x}" cy="${y + 86}" rx="90" ry="24" fill="#e8b85c"/><path d="M ${x - 60} ${y + 80} q 30 -20 60 0 t 60 0" stroke="#7aa27a" stroke-width="10" fill="none"/>`;
  if (o.glass !== false) s += `<path d="M 510 ${y - 10} L 570 ${y - 10} L 564 ${y + 70} L 516 ${y + 70} Z" fill="#cfe6f0" stroke="${INK}" stroke-width="5" opacity=".9"/>`;
  return s;
}

// ---------- cold empty room (missed moments) ----------
export function voidRoom(t, o = {}) {
  let s = `<defs>${lg('v101vw1', [[0, '#1c2436'], [.6, '#283248'], [1, '#323c52']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101vw1)"/>`;
  s += cityWindow(620, 300, 360, 460, ['#0e1430', '#222c50'], t, { lit: false, bld: '#141a34' });
  s += `<rect x="80" y="360" width="340" height="520" fill="#2e384e"/>${[460, 580, 700].map(y => `<rect x="80" y="${y}" width="340" height="12" fill="#222a3c"/>`).join('')}` + frames(470, 380).replace(/#e8dcc8|#8fb3a8|#5d8a7a|#d98f6b|#f3c27a/g, '#4a5670');
  s += `<rect x="-200" y="1100" width="1480" height="1020" fill="#252b3a"/>`;
  let b = blur(s, o.strong);
  b += `<path d="M 540 -20 V 220" stroke="#11141c" stroke-width="6"/><path d="M 430 300 L 650 300 L 600 210 L 480 210 Z" fill="#3a4a66" stroke="${INK}" stroke-width="5"/>`;
  b += pool(540, 900, 600, 640, '#8fb0e8', .22);
  return b;
}
// simple dining chair seen from the front (sharp). a = opacity
export function chair(x, y, s = 1, a = 1, col = '#6d4c3d') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})" opacity="${op(a)}"><rect x="-110" y="-420" width="220" height="250" rx="22" fill="${col}" stroke="${INK}" stroke-width="6"/><rect x="-80" y="-390" width="160" height="40" rx="10" fill="#8a6650"/><rect x="-130" y="-190" width="260" height="50" rx="14" fill="${col}" stroke="${INK}" stroke-width="6"/><path d="M -110 -140 V 0 M 110 -140 V 0" stroke="${INK}" stroke-width="16" stroke-linecap="round"/></g>`;
}

// ---------- sunny study room (right of the kitchen) ----------
export function studyRoom(t, o = {}) {
  let s = `<defs>${lg('v101sr1', [[0, '#efe2c4'], [.6, '#f3e8cf'], [1, '#e9d6ae']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101sr1)"/>`;
  s += `<rect x="560" y="250" width="420" height="500" fill="#bfe3f5"/><circle cx="880" cy="350" r="56" fill="#fff3a8"/><circle cx="660" cy="660" r="100" fill="#7fb87a"/><rect x="560" y="250" width="420" height="500" fill="none" stroke="#fff" stroke-width="18"/><line x1="770" y1="250" x2="770" y2="750" stroke="#fff" stroke-width="12"/>`;
  s += bookshelf(60, 300, 330, 560) + `<rect x="410" y="330" width="120" height="150" fill="#e8dcc8"/><rect x="422" y="342" width="96" height="126" fill="#d98f6b"/>`;
  s += `<rect x="-200" y="1120" width="1480" height="1000" fill="#c9a77c"/><ellipse cx="560" cy="1450" rx="520" ry="140" fill="#7fa7a0" opacity=".45"/>`;
  s += plant(1010, 1120, 1.1, '#d9663a');
  let b = blur(s, o.strong);
  b += `<path d="M 560 250 L 980 250 L 1100 1700 L 260 1700 Z" fill="#fff6c8" opacity=".16"/>` + pool(770, 480, 420, 420, '#fff3b0', .45);
  return b;
}

// ---------- cutaway: kitchen (left) | wall with door | study (right). door 0 = open … 1 = closed ----------
export function twoRooms(t, o = {}) {
  const door = o.door || 0;
  let s = `<defs>${lg('v101tk', [[0, '#f3e3c3'], [1, '#ead2a6']])}${lg('v101ts', [[0, '#efe2c4'], [1, '#e9d6ae']])}</defs>`;
  s += `<rect x="-200" y="-200" width="760" height="2320" fill="url(#v101tk)"/><rect x="560" y="-200" width="720" height="2320" fill="url(#v101ts)"/>`;
  // kitchen props
  s += `<rect x="20" y="340" width="300" height="300" fill="#bfe3f5"/><circle cx="240" cy="420" r="40" fill="#fff3a8"/><rect x="20" y="340" width="300" height="300" fill="none" stroke="#fff" stroke-width="14"/>`;
  s += `<rect x="-200" y="720" width="760" height="200" fill="#e8eef0"/><g stroke="#c9d3d8" stroke-width="4">${Array.from({ length: 4 }, (_, i) => `<path d="M -200 ${720 + i * 50} H 560"/>`).join('')}${Array.from({ length: 12 }, (_, i) => `<path d="M ${-200 + i * 64} 720 v 200"/>`).join('')}</g>`;
  s += `<rect x="-200" y="250" width="200" height="14" fill="#a8744a"/>${[[-180, '#e0b04a'], [-110, '#c25b4e'], [-50, '#7aa27a']].map(([x, c]) => `<rect x="${x}" y="190" width="44" height="60" rx="8" fill="${c}"/>`).join('')}` + clock(420, 300, 46, 7, 50);
  // study props
  s += `<rect x="760" y="300" width="300" height="400" fill="#bfe3f5"/><circle cx="960" cy="380" r="40" fill="#fff3a8"/><rect x="760" y="300" width="300" height="400" fill="none" stroke="#fff" stroke-width="14"/>`;
  s += `<rect x="640" y="760" width="200" height="12" fill="#9a7a5a"/>${books(652, 760, [[24, 80, '#c25b4e'], [20, 70, '#5f8fb5'], [28, 90, '#e0b04a'], [22, 64, '#7aa27a']])}`;
  s += `<rect x="-200" y="1120" width="1480" height="1000" fill="#c9a77c"/>`;
  let b = blur(s);
  // wall (sharp) + door frame + door leaf
  b += `<rect x="520" y="-20" width="70" height="1160" fill="#d8c8a6" stroke="${INK}" stroke-width="5"/>`;
  b += `<rect x="500" y="480" width="110" height="660" fill="#6b5446" stroke="${INK}" stroke-width="5"/><rect x="512" y="492" width="86" height="648" fill="#3a2e28"/>`;
  // door leaf hinged on the right side of the doorway, swinging toward the study: width shrinks as it opens
  const w = 86 * door + 8;
  const sw = 240 * (1 - door);
  b += `<path d="M 598 492 L ${f1(598 - w)} ${f1(492 - sw * .1)} L ${f1(598 - w)} ${f1(1140 + sw * .1)} L 598 1140 Z" fill="#c9a26b" stroke="${INK}" stroke-width="5"/>`;
  if (door < .95) b += `<path d="M 598 492 L ${f1(598 + sw)} ${f1(470)} L ${f1(598 + sw)} ${f1(1170)} L 598 1140 Z" fill="#c9a26b" stroke="${INK}" stroke-width="5"/><circle cx="${f1(598 + sw * .85)}" cy="820" r="9" fill="#8a6a4a"/>`;
  else b += `<circle cx="${f1(598 - w + 16)}" cy="820" r="9" fill="#8a6a4a"/>`;
  b += pool(170, 480, 340, 360, '#fff3b0', .4) + pool(910, 500, 360, 360, '#fff3b0', .4);
  return b;
}

// ---------- café (warm) ----------
export function cafe(t, o = {}) {
  const id = `v101cw5`;
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


// ---------- canteen (noon) ----------
export function canteen(t, o = {}) {
  let s = `<defs>${lg('v101cw1', [[0, '#e8e1d2'], [.6, '#efe8da'], [1, '#e6dccb']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101cw1)"/>`;
  s += `<g>${[[-180, 240], [180, 240], [540, 240], [900, 240]].map(([x, y]) => `<rect x="${x}" y="${y}" width="300" height="420" fill="#bfe0f2"/><rect x="${x}" y="${y}" width="300" height="420" fill="none" stroke="#fff" stroke-width="16"/><circle cx="${x + 220}" cy="${y + 120}" r="40" fill="#7fb87a"/><circle cx="${x + 90}" cy="${y + 330}" r="60" fill="#8cc486"/>`).join('')}</g>`;
  s += `<rect x="-200" y="700" width="1480" height="30" fill="#c9b79a"/>`;
  s += `<rect x="100" y="760" width="380" height="140" rx="10" fill="#2e3430"/>${T(290, 820, 'MITTAGESSEN', 36, { fill: '#f3ead7' })}<rect x="140" y="845" width="300" height="12" rx="6" fill="#c9c2b0"/>`;
  s += `<rect x="560" y="820" width="560" height="200" fill="#c4ccd3"/><g>${[620, 720, 820, 920, 1020].map((x, i) => `<rect x="${x}" y="840" width="80" height="50" rx="8" fill="${['#e8b85c', '#7aa27a', '#c25b4e', '#f2d1a8', '#9c6b3e'][i]}"/>`).join('')}</g>`;
  s += `<rect x="-200" y="1060" width="1480" height="1060" fill="#cfc4b0"/><g fill="#000" opacity=".06">${Array.from({ length: 10 }, (_, i) => `<rect x="${-200 + i * 160}" y="1060" width="4" height="1060"/>`).join('')}</g>`;
  if (o.crowd !== false) s += `<g>${[[80, '#7aa27a'], [260, '#e8742f'], [860, '#5f8fb5'], [1020, '#c25b4e']].map(([x, c]) => `<path d="M ${x - 70} 1080 C ${x - 70} 1000 ${x + 70} 1000 ${x + 70} 1080 Z" fill="${c}"/><circle cx="${x}" cy="940" r="60" fill="#1d1d1d"/>`).join('')}</g><rect x="-60" y="1070" width="420" height="30" rx="8" fill="#a8744a"/><rect x="760" y="1070" width="420" height="30" rx="8" fill="#a8744a"/>`;
  let b = blur(s);
  b += `<path d="M 180 240 L 1200 240 L 1400 1600 L 0 1600 Z" fill="#fff9e0" opacity=".14"/>` + pool(540, 420, 640, 300, '#fff7d0', .35);
  return b;
}

