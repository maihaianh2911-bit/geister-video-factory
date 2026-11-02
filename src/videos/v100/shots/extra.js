// v100 pieces: the battery above du's head, evening corridor, stairwell, research room, props (folder, invitation, boxes, month calendar).
import { K, f1, op, T, cl, lerp, prog, eio, eout, blur, pool, clock, plant, mug, headAt, pop } from './lib.js';
import { lg, books, bookshelf, frames, cityWindow } from './sets.js';
const INK = K.ink;

// ---------- battery ----------
export function batCol(l) { return l >= 70 ? '#3cc46a' : l >= 45 ? '#f2c14e' : l >= 20 ? '#f08a3a' : '#e8433a'; }
// level at time t from a list of drops [[t0, from, to], ...] (each drains over d seconds); before the first drop: first 'from'
export function level(t, drops, d = .55) {
  let l = drops[0][1];
  for (const [t0, a, b] of drops) if (t >= t0) l = lerp(a, b, eio(prog(t, t0, t0 + d)));
  return l;
}
// battery centred at (x,y), s=1 → 240×110. o: blink (bool), t, shown percentage (txt override), drop:[t0,amount] floating "−20 %", glow, noText
export function battery(x, y, s, lvl, o = {}) {
  const t = o.t || 0, c = batCol(lvl), L = cl(lvl / 100);
  let bl = 1;
  if (o.blink) bl = .35 + .65 * (Math.sin(t * Math.PI * 4) > 0 ? 1 : 0);
  let g = pool(0, 0, 230, 150, c, (o.glow === undefined ? .45 : o.glow) * bl);
  g += `<rect x="-120" y="-55" width="240" height="110" rx="22" fill="#1d2228" stroke="${INK}" stroke-width="8"/><rect x="122" y="-24" width="22" height="48" rx="6" fill="${INK}"/>`;
  g += `<rect x="-108" y="-43" width="${f1(216 * L)}" height="86" rx="13" fill="${c}" opacity="${op(bl)}"/>`;
  if (L > .05) g += `<rect x="-104" y="-39" width="${f1(Math.max(0, 216 * L - 8))}" height="18" rx="9" fill="#fff" opacity="${op(.28 * bl)}"/>`;
  if (!o.noText) g += T(0, 17, o.txt || `${Math.round(lvl)} %`, 50, { fill: '#fff', stroke: INK, sw: 9 });
  if (o.drop) {
    const [t0, amt] = o.drop, p = prog(t, t0, t0 + 1.1);
    if (t >= t0 && p < 1) g += T(150, -40 - 70 * eout(p), `−${amt} %`, 46, { fill: '#ff6b5e', stroke: INK, sw: 9, op: 1 - p * p });
  }
  if (o.bolt) g += `<path d="M 10 -36 L -22 6 L 0 6 L -12 38 L 24 -6 L 2 -6 Z" fill="#fff" opacity="${op(o.bolt)}" stroke="${INK}" stroke-width="4"/>`;
  const k = s * (o.pulse || 1);
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(k * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}
// battery floating over a person's head (same args as person + level)
export function batOver(x, y, s, lvl, o = {}) {
  const [hx, hy] = headAt(x, y, s, o);
  const t = o.t || 0, bob = Math.sin(t * 2.4) * 6;
  return battery(hx + (o.bdx || 0), hy - 165 * s - 120 * s + bob + (o.bdy || 0), (o.bs || 1) * Math.max(.75, s), lvl, o);
}

// ---------- props ----------
// presentation folder: blue folder with a slide (chart) clipped on. local centred, s=1 → 240×300
export function folder(x, y, s = 1, rot = 0, o = {}) {
  let g = `<rect x="-120" y="-150" width="240" height="300" rx="12" fill="#3f6fb5" stroke="${INK}" stroke-width="6"/><rect x="-100" y="-128" width="200" height="150" rx="6" fill="#fbf8ef" stroke="${INK}" stroke-width="4"/>`;
  g += `<g fill="#e0b04a"><rect x="-80" y="-30" width="30" height="40"/><rect x="-40" y="-60" width="30" height="70"/><rect x="0" y="-90" width="30" height="100"/></g><path d="M -84 -60 L -30 -84 L 40 -110 L 78 -116" stroke="#d9493f" stroke-width="7" fill="none"/>`;
  g += `<rect x="-100" y="40" width="200" height="14" rx="6" fill="#dfe8f4"/><rect x="-100" y="70" width="140" height="14" rx="6" fill="#dfe8f4"/><rect x="-30" y="-162" width="60" height="26" rx="6" fill="#b8bcc4" stroke="${INK}" stroke-width="4"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// tall paper stack on a desk (bottom centre at x,y). n sheets bundles
export function stack(x, y, n = 8, s = 1) {
  let g = '';
  for (let i = 0; i < n; i++) { const dx = Math.sin(i * 2.3) * 8; g += `<rect x="${f1(-90 + dx)}" y="${-(i + 1) * 34}" width="180" height="34" rx="3" fill="${i % 3 === 1 ? '#f4ecd6' : '#fbf8ef'}" stroke="${INK}" stroke-width="4"/><path d="M ${f1(-70 + dx)} ${-(i + 1) * 34 + 17} H ${f1(60 + dx)}" stroke="#c9d6e6" stroke-width="3"/>`; }
  g += `<rect x="40" y="${-(n * 34) - 30}" width="50" height="34" fill="#ffd23f" stroke="${INK}" stroke-width="3" transform="rotate(8 65 ${-(n * 34) - 13})"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${g}</g>`;
}
// birthday invitation card (local centred, s=1 → 260×180)
export function invite(x, y, s = 1, rot = 0) {
  let g = `<rect x="-130" y="-90" width="260" height="180" rx="10" fill="#fff4dc" stroke="${INK}" stroke-width="6"/><rect x="-130" y="-90" width="260" height="40" rx="10" fill="#e8546a" stroke="${INK}" stroke-width="5"/>`;
  g += T(0, -10, 'EINLADUNG', 34, { fill: '#c23b52' }) + T(0, 34, 'Geburtstag · Sa 20 Uhr', 22, { fill: K.txt, w: 700 });
  g += `<g transform="translate(96 54)"><path d="M -14 26 H 14 L 10 -6 H -10 Z" fill="#7fa7cf" stroke="${INK}" stroke-width="3"/><path d="M 0 -6 V -16" stroke="${INK}" stroke-width="3"/><path d="M 0 -26 q 6 6 0 10 q -6 -4 0 -10" fill="#ffb02e"/></g>`;
  g += `<circle cx="-100" cy="54" r="12" fill="#ffd23f" stroke="${INK}" stroke-width="3"/><path d="M -100 66 q 6 14 -4 26" stroke="${INK}" stroke-width="2" fill="none"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// cardboard moving box (bottom centre), label
export function box(x, y, w = 240, h = 180, lab = '', rot = 0) {
  let g = `<rect x="${-w / 2}" y="${-h}" width="${w}" height="${h}" fill="#c99a62" stroke="${INK}" stroke-width="6"/><rect x="${-w / 2}" y="${-h}" width="${w}" height="${h * .22}" fill="#b4864f" stroke="${INK}" stroke-width="5"/><rect x="-18" y="${-h}" width="36" height="${h}" fill="#d9c08f" opacity=".85"/>`;
  if (lab) g += T(0, -h * .38, lab, Math.min(40, w / 6), { fill: '#3a2a1a', w: 900 });
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})">${g}</g>`;
}
// month calendar (local centred, s=1 → 640×560). free: index of the free weekend cell; strike 0..1; hl 0..1 highlight
export function monthCal(x, y, s = 1, o = {}) {
  const busy = ['#e8946a', '#7fa7cf', '#e0b04a', '#a98bd0', '#7aa27a'];
  let g = `<rect x="-320" y="-300" width="640" height="590" rx="18" fill="#fbf8ef" stroke="${INK}" stroke-width="7"/><rect x="-320" y="-300" width="640" height="90" rx="18" fill="#c23b52" stroke="${INK}" stroke-width="6"/>` + T(0, -238, o.title || 'DIESER MONAT', 46, { fill: '#fff' });
  ['MO', 'DI', 'MI', 'DO', 'FR', 'SA', 'SO'].forEach((d, i) => { g += T(-270 + i * 90, -176, d, 26, { fill: i > 4 ? '#c23b52' : K.txt, w: 800 }); });
  const free = o.free === undefined ? 19 : o.free;
  for (let r = 0; r < 4; r++) for (let c = 0; c < 7; c++) {
    const i = r * 7 + c, cx = -270 + c * 90, cy = -110 + r * 98;
    const isFree = (i === free || i === free + 1);
    g += `<rect x="${cx - 40}" y="${cy - 40}" width="80" height="86" rx="8" fill="${isFree ? '#eaf7ec' : '#fff'}" stroke="#c9c2b2" stroke-width="3"/>` + T(cx - 22, cy - 14, String(i + 2), 20, { fill: '#7a7468', w: 700, anchor: 'start' });
    if (!isFree) g += `<rect x="${cx - 32}" y="${cy + 2}" width="64" height="16" rx="6" fill="${busy[(i * 3) % 5]}"/><rect x="${cx - 32}" y="${cy + 24}" width="${40 + (i * 7) % 24}" height="12" rx="5" fill="${busy[(i * 2 + 1) % 5]}" opacity=".8"/>`;
  }
  const fr = Math.floor(free / 7), fc = free % 7, fx = -270 + fc * 90 + 45, fy = -110 + fr * 98 + 3;
  const hl = cl(o.hl || 0);
  if (hl > 0) g += `<rect x="${fx - 98}" y="${fy - 56}" width="196" height="116" rx="14" fill="none" stroke="#3cc46a" stroke-width="${f1(8 * hl)}" opacity="${op(hl)}"/>` + T(fx, fy + 98, 'FREI', 34, { fill: '#2f9a55', op: hl, stroke: '#fff', sw: 8 });
  const st = cl(o.strike || 0);
  if (st > 0) {
    const L = 150 * st;
    g += `<path d="M ${fx - 75} ${fy - 45} l ${f1(L)} ${f1(L * .6)}" stroke="#d9493f" stroke-width="18" stroke-linecap="round"/>`;
    if (st > .5) { const L2 = 150 * (st - .5) * 2; g += `<path d="M ${fx + 75} ${fy - 45} l ${f1(-L2)} ${f1(L2 * .6)}" stroke="#d9493f" stroke-width="18" stroke-linecap="round"/>`; }
  }
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// acoustic guitar leaning (bottom at x,y)
export function guitar(x, y, s = 1, rot = -12, dim = 0) {
  let g = `<path d="M -10 -560 h 20 v 300 h -20 z" fill="#6d4c3d" stroke="${INK}" stroke-width="5"/><rect x="-22" y="-620" width="44" height="70" rx="8" fill="#4a3328" stroke="${INK}" stroke-width="5"/>`;
  g += `<path d="M 0 -300 C 80 -300 90 -230 60 -190 C 120 -150 120 0 0 0 C -120 0 -120 -150 -60 -190 C -90 -230 -80 -300 0 -300 Z" fill="#d99a4e" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="-150" r="30" fill="#3a2a20"/><rect x="-36" y="-70" width="72" height="16" rx="4" fill="#4a3328"/>`;
  if (dim) g += `<path d="M 0 -300 C 80 -300 90 -230 60 -190 C 120 -150 120 0 0 0 C -120 0 -120 -150 -60 -190 C -90 -230 -80 -300 0 -300 Z" fill="#1c2436" opacity="${op(dim)}"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})">${g}</g>`;
}
// sofa (sharp, front view), seat top at y; returns [back, front] so a person can sit between
export function sofa(x, y, w = 820, col = '#3f5f86', dark = '#2f4a6a') {
  const back = `<rect x="${x - w / 2}" y="${y - 330}" width="${w}" height="300" rx="50" fill="${col}" stroke="${INK}" stroke-width="6"/><rect x="${x - w / 2 + 40}" y="${y - 300}" width="${w / 2 - 50}" height="230" rx="34" fill="${dark}" opacity=".5"/><rect x="${x + 10}" y="${y - 300}" width="${w / 2 - 50}" height="230" rx="34" fill="${dark}" opacity=".5"/>`;
  const front = `<rect x="${x - w / 2 - 50}" y="${y - 40}" width="${w + 100}" height="170" rx="40" fill="${col}" stroke="${INK}" stroke-width="6"/><rect x="${x - w / 2 - 70}" y="${y - 160}" width="110" height="300" rx="40" fill="${col}" stroke="${INK}" stroke-width="6"/><rect x="${x + w / 2 - 40}" y="${y - 160}" width="110" height="300" rx="40" fill="${col}" stroke="${INK}" stroke-width="6"/><rect x="${x - w / 2 - 30}" y="${y + 130}" width="30" height="40" fill="${INK}"/><rect x="${x + w / 2}" y="${y + 130}" width="30" height="40" fill="${INK}"/>`;
  return [back, front];
}

// ---------- sets ----------
// apartment-building corridor in the evening: doors, coat hooks, ceiling lamp (light source), shoe rack. warm/dim amber.
export function corridor(t, o = {}) {
  let s = `<defs>${lg('v100cw', [[0, '#3c3248'], [.6, '#5a4656'], [1, '#6a5258']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v100cw)"/>`;
  // wainscot
  s += `<rect x="-200" y="860" width="1480" height="280" fill="#4a3a40"/><rect x="-200" y="850" width="1480" height="16" fill="#6e5660"/>`;
  // doors
  for (const [x, c, n] of [[-60, '#7a4a3a', '12'], [700, '#5a6a7a', '14']]) s += `<rect x="${x}" y="360" width="300" height="780" fill="${c}"/><rect x="${x + 30}" y="400" width="240" height="300" fill="#000" opacity=".12"/><rect x="${x + 30}" y="740" width="240" height="340" fill="#000" opacity=".12"/><circle cx="${x + 260}" cy="780" r="14" fill="#d8b46a"/><rect x="${x + 120}" y="300" width="60" height="40" rx="6" fill="#d8d0c0"/>` + T(x + 150, 332, n, 28, { fill: '#3a3a3a' });
  // coat hooks with jackets + scarf, framed poster, light switch, mail on a small shelf
  s += `<rect x="300" y="430" width="360" height="14" fill="#8a6a4a"/>${[340, 450, 560].map(x => `<rect x="${x}" y="444" width="10" height="24" fill="#555"/>`).join('')}<path d="M 330 470 C 300 520 300 700 320 760 L 420 760 C 430 700 420 520 380 470 Z" fill="#c25b4e"/><path d="M 440 470 C 410 520 420 680 430 720 L 500 720 C 510 680 500 520 470 470 Z" fill="#5f8fb5"/><path d="M 556 470 C 540 560 550 680 560 740 L 590 740 C 590 660 580 560 572 470 Z" fill="#e0b04a"/>`;
  s += `<rect x="360" y="180" width="240" height="180" fill="#e8dcc8"/><rect x="374" y="194" width="212" height="152" fill="#d98f6b"/><circle cx="440" cy="250" r="30" fill="#f3c27a"/><path d="M 380 340 L 460 280 L 520 320 L 580 270 L 580 340 Z" fill="#7a5a8a"/>`;
  s += `<rect x="1020" y="600" width="40" height="64" rx="6" fill="#e8e4da"/>`;
  s += `<rect x="330" y="900" width="300" height="120" rx="8" fill="#6d4c3d"/><path d="M 330 960 H 630" stroke="#563a2e" stroke-width="8"/>${[360, 430, 500, 560].map((x, i) => `<ellipse cx="${x + 20}" cy="${i % 2 ? 1010 : 950}" rx="30" ry="14" fill="${['#2a2a2a', '#c25b4e', '#f2efe8', '#5f8fb5'][i]}"/>`).join('')}`;
  s += plant(1000, 1140, .9, '#5f8fb5');
  s += `<rect x="-200" y="1140" width="1480" height="980" fill="#6a5040"/><g fill="#000" opacity=".1">${[1260, 1420, 1600, 1800].map(y => `<rect x="-200" y="${y}" width="1480" height="5"/>`).join('')}</g><rect x="140" y="1250" width="800" height="300" rx="20" fill="#8c3f45" opacity=".45"/>`;
  let b = blur(s, o.strong);
  b += `<rect x="470" y="-10" width="140" height="40" rx="10" fill="#e8dcc8"/><ellipse cx="540" cy="40" rx="90" ry="20" fill="#ffe7a6"/>`;
  b += pool(540, 300, 560, 560, '#ffcf7a', .42) + pool(540, 1350, 600, 240, '#ffcf7a', .16);
  return b;
}
// stairwell of an apartment building (afternoon, window on the landing is the light source)
export function stairwell(t, o = {}) {
  let s = `<defs>${lg('v100sw', [[0, '#b9c2c6'], [.6, '#cfd2cc'], [1, '#d8d2c2']])}${lg('v100ssky', [[0, '#8fc6ea'], [1, '#e6eef0']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v100sw)"/>`;
  s += `<rect x="-200" y="880" width="1480" height="260" fill="#9aa8a0"/>`;
  // landing window
  s += `<rect x="560" y="200" width="380" height="460" fill="url(#v100ssky)"/><g fill="#a9b8c4">${[[580, 480, 90], [690, 420, 110], [820, 500, 100]].map(([x, y, w]) => `<rect x="${x}" y="${y}" width="${w}" height="${660 - y}"/>`).join('')}</g><rect x="560" y="200" width="380" height="460" fill="none" stroke="#fff" stroke-width="18"/><line x1="750" y1="200" x2="750" y2="660" stroke="#fff" stroke-width="10"/>`;
  // stairs going up left with railing
  for (let i = 0; i < 9; i++) s += `<rect x="${-200 + i * 0}" y="${1100 - i * 70}" width="${520 - i * 40}" height="70" fill="${i % 2 ? '#8a8f94' : '#9da2a6'}"/>`;
  s += `<path d="M 340 1060 L -120 460" stroke="#5a4a3a" stroke-width="14"/>${[0, 1, 2, 3, 4, 5].map(i => `<path d="M ${300 - i * 80} ${1010 - i * 104} V ${1100 - i * 104}" stroke="#5a4a3a" stroke-width="6"/>`).join('')}`;
  // mailboxes, notice board, bicycle, flat number
  s += `<g>${[0, 1, 2].map(r => [0, 1, 2].map(c => `<rect x="${380 + c * 56}" y="${700 + r * 46}" width="50" height="40" fill="#c9a86a" stroke="#8a6a4a" stroke-width="3"/><rect x="${390 + c * 56}" y="${712 + r * 46}" width="30" height="6" fill="#5a4a3a"/>`).join('')).join('')}</g>`;
  s += `<rect x="980" y="300" width="200" height="240" fill="#a98a5a"/><rect x="996" y="320" width="70" height="80" fill="#fff" transform="rotate(-4 1030 360)"/><rect x="1080" y="340" width="70" height="60" fill="#ffd23f"/><rect x="1000" y="430" width="90" height="70" fill="#7fa7cf"/>`;
  s += `<g fill="none" stroke="#3a3a40" stroke-width="10"><circle cx="880" cy="1040" r="70"/><circle cx="1080" cy="1040" r="70"/><path d="M 880 1040 L 950 940 L 1050 940 L 1080 1040 M 950 940 L 980 1040 L 1050 940 M 940 920 h 30 M 1050 940 l 10 -40 h 30"/></g>`;
  s += `<rect x="-200" y="1140" width="1480" height="980" fill="#8d8a84"/><g fill="#000" opacity=".08">${Array.from({ length: 8 }, (_, i) => `<rect x="${-200 + i * 200}" y="1140" width="4" height="980"/>`).join('')}</g>`;
  let b = blur(s, o.strong);
  b += `<path d="M 560 200 L 940 200 L 1100 1700 L 200 1700 Z" fill="#fffbe0" opacity=".14"/>` + pool(750, 430, 400, 400, '#fffbe0', .45);
  return b;
}
// research room: whiteboard with a chart, shelves of files, lamp; cool neutral light from the ceiling
export function lab(t, o = {}) {
  let s = `<defs>${lg('v100lw', [[0, '#2f3a4e'], [.6, '#3e4a60'], [1, '#4a5468']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v100lw)"/>`;
  s += `<rect x="300" y="260" width="620" height="400" rx="8" fill="#eef2f4" stroke="#9aa7b0" stroke-width="12"/>`;
  s += `<g fill="none" stroke="#3f6fb5" stroke-width="6"><path d="M 340 600 H 880 M 340 600 V 300"/></g><g fill="#7fa7cf">${[0, 1, 2, 3, 4].map(i => `<rect x="${380 + i * 100}" y="${600 - (60 + (i * 47) % 200)}" width="60" height="${60 + (i * 47) % 200}"/>`).join('')}</g><path d="M 360 380 C 480 300 620 480 860 330" stroke="#d9493f" stroke-width="6" fill="none" stroke-dasharray="14 10"/>`;
  s += `<rect x="-140" y="300" width="380" height="760" fill="#3a3040"/>${[420, 560, 700, 840].map(y => `<rect x="-140" y="${y}" width="380" height="12" fill="#2a2230"/>`).join('')}`;
  s += [[420, ['#c25b4e', '#5f8fb5', '#e0b04a', '#7aa27a', '#d9cbb0']], [560, ['#5f8fb5', '#5f8fb5', '#e0b04a', '#c25b4e']], [700, ['#7aa27a', '#d9cbb0', '#c25b4e', '#5f8fb5', '#e0b04a']], [840, ['#e0b04a', '#7aa27a', '#5f8fb5']]].map(([y, cs]) => cs.map((c, i) => `<rect x="${-120 + i * 62}" y="${y - 110}" width="50" height="110" rx="4" fill="${c}"/><rect x="${-108 + i * 62}" y="${y - 80}" width="26" height="30" fill="#fff" opacity=".7"/>`).join('')).join('');
  s += `<rect x="960" y="360" width="200" height="300" fill="#e8dcc8"/>${T(1060, 450, 'STUDIE', 34, { fill: '#3a3a3a' })}<rect x="980" y="480" width="160" height="12" fill="#b8b0a0"/><rect x="980" y="510" width="120" height="12" fill="#b8b0a0"/>`;
  s += clock(860, 180, 48, 3, 15);
  s += `<rect x="-200" y="1080" width="1480" height="1040" fill="#4a4e58"/><rect x="300" y="900" width="560" height="24" fill="#9a8a7a"/><path d="M 330 924 V 1080 M 830 924 V 1080" stroke="#6a5a4a" stroke-width="12"/><rect x="380" y="780" width="200" height="120" rx="8" fill="#2a2f36"/><rect x="392" y="792" width="176" height="96" fill="#bcd8ee"/>` + plant(1000, 1080, 1, '#e0e0e0');
  let b = blur(s, o.strong);
  b += `<rect x="380" y="-10" width="320" height="30" rx="8" fill="#e8eef2"/>` + pool(540, 200, 600, 520, '#cfe2ff', .38) + pool(540, 1350, 600, 220, '#cfe2ff', .15);
  return b;
}
// neutral blurred thinking backdrop (grey-blue living room)
export { room as homeRoom } from './sets.js';
// head nod offset (px, head-local) during [t0,t1)
export const nod = (t, t0, t1) => (t >= t0 && t < t1) ? Math.max(0, Math.sin((t - t0) * 12)) * 18 : 0;
// picture thought bubble (white, trailing circles to tx,ty) with inner SVG drawn centred at the bubble centre
export function picThought(x, y, w, h, tx, ty, inner, p = 1) {
  if (p <= 0) return '';
  const INK = '#1d1d1d', ex = x + Math.max(-w / 2 + 50, Math.min(w / 2 - 50, tx - x)), ey = ty > y ? y + h / 2 : y - h / 2;
  const c1 = [ex + (tx - ex) * .4, ey + (ty - ey) * .4], c2 = [ex + (tx - ex) * .75, ey + (ty - ey) * .75];
  const s = `<circle cx="${c2[0]}" cy="${c2[1]}" r="12" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="${c1[0]}" cy="${c1[1]}" r="20" fill="#fff" stroke="${INK}" stroke-width="5"/><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${Math.min(h / 2, 70)}" fill="#fff" stroke="${INK}" stroke-width="6"/><g transform="translate(${x} ${y})">${inner}</g>`;
  return `<g transform="translate(${tx} ${ty}) scale(${Math.round(Math.max(.01, p) * 1000) / 1000}) translate(${-tx} ${-ty})" opacity="${Math.min(1, p * 2).toFixed(2)}">${s}</g>`;
}
// a person sitting on a sofa (front view). seatY = top of the seat cushion. Returns svg incl. sofa.
import { person as _person } from './lib.js';
export function sitOnSofa(who, x, seatY, s, o = {}, sofaO = {}) {
  const [back, front] = sofa(sofaO.x === undefined ? x : sofaO.x, seatY, sofaO.w || 820, sofaO.col || '#3f5f86', sofaO.dark || '#2f4a6a');
  const INK = '#1d1d1d';
  let g = back + _person(who, x, seatY + 150 * s, s, { ...o, legs: false }) + front;
  for (const dx of [-45, 45]) g += `<path d="M ${f1(x + dx * s)} ${f1(seatY + 70)} V ${f1(seatY + 250)}" stroke="${INK}" stroke-width="${f1(18 * s)}" stroke-linecap="round"/><ellipse cx="${f1(x + dx * 1.2 * s)}" cy="${f1(seatY + 258)}" rx="${f1(36 * s)}" ry="${f1(14 * s)}" fill="${INK}"/>`;
  return g;
}
// comparison chart board (sharp). a: bar 1 grow 0..1, b: bar 2 grow, la1/la2 label alphas, faces 0..1
import { head as _head } from './lib.js';
export function chartBoard(t, o = {}) {
  const INK = '#1d1d1d', a = cl(o.a || 0), b = cl(o.b || 0), AX = 1090;
  let g = `<rect x="60" y="290" width="960" height="1060" rx="28" fill="#f6f2e8" stroke="${INK}" stroke-width="8"/><path d="M 120 ${AX} H 960" stroke="${INK}" stroke-width="8" stroke-linecap="round"/>`;
  const h1 = 560 * a, h2 = 150 * b;
  g += `<rect x="170" y="${f1(AX - h1)}" width="340" height="${f1(h1)}" fill="#e05a4e" stroke="${INK}" stroke-width="6"/>`;
  g += `<rect x="570" y="${f1(AX - h2)}" width="340" height="${f1(h2)}" fill="#3cc46a" stroke="${INK}" stroke-width="6"/>`;
  if (o.ghost2) g += `<rect x="570" y="${AX - 150}" width="340" height="150" fill="none" stroke="#b8b0a0" stroke-width="5" stroke-dasharray="16 12" opacity="${op(o.ghost2)}"/>`;
  const l1 = cl(o.la1 || 0), l1b = cl(o.la1b || 0), l1c = cl(o.la1c || 0), l2 = cl(o.la2 || 0), l2b = cl(o.la2b || 0);
  g += T(340, AX + 70, 'ERWARTET:', 54, { fill: '#c23b3b', op: l1 }) + T(340, AX + 134, 'ENTTÄUSCHT,', 44, { fill: '#2b2b2b', op: l1b, w: 800 }) + T(340, AX + 192, 'VERÄRGERT', 44, { fill: '#2b2b2b', op: l1c, w: 800 });
  g += T(740, AX + 70, 'IN WAHRHEIT:', 50, { fill: '#2f9a55', op: l2 }) + T(740, AX + 134, 'GELASSEN', 52, { fill: '#2b2b2b', op: l2b, w: 900 });
  if (o.f1 > 0) g += _head('p2', 340, f1(AX - h1 - 110), .6 * o.f1, { t, seed: 13, brows: 'angry', mouth: 'frown', blink: false });
  if (o.f2 > 0) g += _head('p2', 740, f1(AX - h2 - 110), .6 * o.f2, { t, seed: 13, brows: 'calm', mouth: 'smile', eyes: 'happy' });
  return g;
}
// close-up bust: shoulders first, then the head on top (face stays above the subtitles when hy ≤ ~1120 at s≈1.7)
import { head as _hd, WHO as _W } from './lib.js';
export function bust(who, x, hy, s, o = {}) {
  const r = 165 * s, W = _W[who], INK = '#1d1d1d', sy = hy + .82 * r;
  let g = `<path d="M ${f1(x - 1.5 * r)} 2000 C ${f1(x - 1.42 * r)} ${f1(sy + .5 * r)} ${f1(x - 1.0 * r)} ${f1(sy)} ${f1(x)} ${f1(sy)} C ${f1(x + 1.0 * r)} ${f1(sy)} ${f1(x + 1.42 * r)} ${f1(sy + .5 * r)} ${f1(x + 1.5 * r)} 2000 Z" fill="${W.top}" stroke="${INK}" stroke-width="6"/>`;
  g += `<path d="M ${f1(x - .62 * r)} ${f1(sy + .1 * r)} C ${f1(x - .3 * r)} ${f1(sy - .12 * r)} ${f1(x + .3 * r)} ${f1(sy - .12 * r)} ${f1(x + .62 * r)} ${f1(sy + .1 * r)} C ${f1(x + .3 * r)} ${f1(sy + .3 * r)} ${f1(x - .3 * r)} ${f1(sy + .3 * r)} ${f1(x - .62 * r)} ${f1(sy + .1 * r)} Z" fill="${W.sh}" stroke="${INK}" stroke-width="5"/>`;
  if (W.str) g += `<path d="M ${f1(x - .1 * r)} ${f1(sy + .2 * r)} l ${f1(-.08 * r)} ${f1(.45 * r)} M ${f1(x + .1 * r)} ${f1(sy + .2 * r)} l ${f1(.08 * r)} ${f1(.45 * r)}" stroke="${W.str}" stroke-width="${f1(7 * s)}" stroke-linecap="round"/>`;
  return g + _hd(who, x, hy, s, o);
}
