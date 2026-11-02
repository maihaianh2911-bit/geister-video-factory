// v102 kit: colour loss (saturation overlay, no feColorMatrix), FARBE bar, and the video's own props/sets.
import { K, f1, op, T, pool, blur, plant, mug, clock, cl, prog, eio, lerp, hash, pop, label, person, head, shadow, textW } from './lib.js';
const INK = K.ink;
const lg = (id, stops, v = true) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;

// ---------- how grey the world is at time t (0 = full colour, 1 = grey) ----------
const KEYS = [
  [0, 0], [3.6, 0], [4.7, .42], [5.7, .42], [6.6, 1], [9.84, 1],   // hook: demo of the idea
  [9.85, 0], [13.9, 0], [13.97, .18], [17.95, .25],               // Monday: fresh, then a little paler
  [18.0, .45], [24.1, .5], [24.15, .74], [28.3, .78], [32.14, .82], // Wednesday, Friday
  [46.8, .86], [51.34, .86], [55.4, .62], [58.9, .5], [59.9, .5], [60.9, 0], [70, 0], // weekend → colour returns
];
export function G(t) {
  for (let i = 1; i < KEYS.length; i++) { const [a, va] = KEYS[i - 1], [b, vb] = KEYS[i]; if (t < b) return lerp(va, vb, eio(prog(t, a, b))); }
  return 0;
}
// grey the world painted so far: saturation blend (keeps light/dark) + a faint grey wash
export function grey(g, o = {}) {
  if (g <= .005) return '';
  const r = `x="-400" y="-400" width="1880" height="2720"`;
  return `<rect ${r} fill="#808080" style="mix-blend-mode:saturation" opacity="${op(g * (o.k || 1))}"/><rect ${r} fill="#9c9ea2" opacity="${op(.16 * g * (o.k || 1))}"/>`;
}
// small FARBE meter top-left (v = remaining colour 0..1)
export function farbe(v, a = 1, o = {}) {
  if (a <= 0) return '';
  const x = 70, y = 168, w = 250, h = 30, fw = Math.max(0, w * cl(v));
  const low = v < .35;
  let s = `<defs>${lg('v102fb', [[0, '#e8504a'], [.25, '#f2a23a'], [.5, '#f2d23a'], [.75, '#3fb36b'], [1, '#3b8fe0']], false)}<clipPath id="v102fbc"><rect x="${x}" y="${y}" width="${f1(fw)}" height="${h}" rx="15"/></clipPath></defs>`;
  s += T(x, y - 14, 'FARBE', 34, { anchor: 'start', fill: '#fff', stroke: INK, sw: 8 });
  s += `<rect x="${x - 6}" y="${y - 6}" width="${w + 12}" height="${h + 12}" rx="21" fill="${INK}"/><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="15" fill="#4a4a4e"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#v102fb)" clip-path="url(#v102fbc)"/>`;
  s += T(x + w + 22, y + 27, `${Math.round(cl(v) * 100)} %`, 32, { anchor: 'start', fill: low ? '#ff8a80' : '#fff', stroke: INK, sw: 8 });
  return `<g opacity="${op(a)}"${o.dy ? ` transform="translate(0 ${o.dy})"` : ''}>${s}</g>`;
}
export const bar = (t, a = 1) => farbe(1 - G(t), a);
export { lg };

// ---------- sleep-lab / study panel background (dark violet, blurred lab) ----------
export function lab(t, o = {}) {
  let s = `<defs>${lg('v102lb', [[0, '#1f2140'], [.6, '#2b2d52'], [1, '#34355c']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v102lb)"/>`;
  // two lab beds with monitors, a big window with night campus, shelves with files, clock
  s += `<rect x="560" y="260" width="440" height="420" rx="8" fill="#141a38"/><g fill="#22305a">${[0, 1, 2, 3].map(i => `<rect x="${580 + i * 105}" y="${470 - (i % 2) * 80}" width="90" height="${210 + (i % 2) * 80}"/>`).join('')}</g><g fill="#ffd36b" opacity=".7">${[[600, 520], [700, 450], [800, 540], [910, 480], [640, 600], [860, 620]].map(([x, y]) => `<rect x="${x}" y="${y}" width="12" height="14"/>`).join('')}</g><circle cx="920" cy="330" r="34" fill="#f4eccd"/><rect x="560" y="260" width="440" height="420" rx="8" fill="none" stroke="#8a90b0" stroke-width="14"/><line x1="780" y1="260" x2="780" y2="680" stroke="#8a90b0" stroke-width="10"/>`;
  s += `<rect x="60" y="300" width="380" height="460" fill="#3a3c66"/>${[420, 540, 660].map(y => `<rect x="60" y="${y}" width="380" height="12" fill="#26284a"/>`).join('')}${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${80 + i * 50}" y="${330 + (i % 3) * 120}" width="38" height="86" fill="${['#5f8fb5', '#e0b04a', '#c25b4e', '#7aa27a', '#d9cbb0', '#8a5bb5', '#5f8fb5'][i]}"/>`).join('')}`;
  s += clock(500, 220, 46, 2, 10, { face: '#e8e4f0' });
  s += `<rect x="-200" y="1060" width="1480" height="1060" fill="#2a2a44"/>`;
  for (const [x, y] of [[180, 980], [760, 1000]]) s += `<rect x="${x - 200}" y="${y - 60}" width="400" height="90" rx="20" fill="#e6e8f2"/><rect x="${x - 200}" y="${y + 30}" width="400" height="40" fill="#8a8ea8"/><rect x="${x - 190}" y="${y - 100}" width="120" height="50" rx="20" fill="#fff"/><rect x="${x + 120}" y="${y - 260}" width="140" height="110" rx="10" fill="#151830"/><path d="M ${x + 130} ${y - 200} l 20 0 l 10 -30 l 14 50 l 10 -20 l 30 0" stroke="#5cf0a0" stroke-width="5" fill="none"/><rect x="${x + 182}" y="${y - 150}" width="12" height="90" fill="#555"/>`;
  let b = blur(s, o.strong);
  b += pool(540, 900, 640, 700, '#8f8fff', .18) + pool(920, 330, 260, 260, '#f4eccd', .2);
  return b;
}

// ---------- traffic light (red lamp intensity r 0..1, pale = how grey the red looks) ----------
export function trafficLight(x, y, s = 1, o = {}) {
  const pale = o.pale || 0, red = o.red === undefined ? 1 : o.red;
  const rc = mixHex('#ff3b30', '#8d8789', pale);
  let g = `<rect x="-14" y="0" width="28" height="900" fill="#3a3d44" stroke="${INK}" stroke-width="5"/><rect x="-80" y="-330" width="160" height="350" rx="30" fill="#2a2c33" stroke="${INK}" stroke-width="6"/>`;
  g += `<path d="M -80 -300 h -26 v 60 h 26 M -80 -190 h -26 v 60 h 26 M 80 -300 h 26 v 60 h -26 M 80 -190 h 26 v 60 h -26" fill="#2a2c33" stroke="${INK}" stroke-width="5"/>`;
  g += `<circle cx="0" cy="-250" r="44" fill="${red > .5 ? rc : '#4a2a2a'}" stroke="${INK}" stroke-width="5"/>`;
  g += `<circle cx="0" cy="-145" r="44" fill="#4a3f22" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="-40" r="44" fill="#20402c" stroke="${INK}" stroke-width="5"/>`;
  g += `<path d="M -26 -268 A 28 28 0 0 1 10 -282" stroke="#fff" stroke-width="7" fill="none" opacity=".35" stroke-linecap="round"/>`;
  let glow = red > .5 ? pool(0, -250, 150 * (1 - .6 * pale), 150 * (1 - .6 * pale), rc, .55 * (1 - .75 * pale)) : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${glow}${g}</g>`;
}
export function mixHex(a, b, p) {
  const A = [1, 3, 5].map(i => parseInt(a.slice(i, i + 2), 16)), B = [1, 3, 5].map(i => parseInt(b.slice(i, i + 2), 16));
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], cl(p))).toString(16).padStart(2, '0')).join('');
}

// ---------- bicycle side view; wheel spin angle a (deg) ----------
export function bike(x, y, s = 1, a = 0, col = '#d9493f') {
  const wheel = cx => `<circle cx="${cx}" cy="0" r="105" fill="none" stroke="${INK}" stroke-width="16"/><circle cx="${cx}" cy="0" r="105" fill="none" stroke="#5a5d64" stroke-width="6"/><g transform="rotate(${f1(a)} ${cx} 0)" stroke="#9aa0a8" stroke-width="4">${[0, 30, 60, 90, 120, 150].map(d => `<path d="M ${f1(cx + Math.cos(d * Math.PI / 180) * 100)} ${f1(Math.sin(d * Math.PI / 180) * 100)} L ${f1(cx - Math.cos(d * Math.PI / 180) * 100)} ${f1(-Math.sin(d * Math.PI / 180) * 100)}"/>`).join('')}</g><circle cx="${cx}" cy="0" r="12" fill="${INK}"/>`;
  let g = wheel(-190) + wheel(190);
  g += `<path d="M -190 0 L -60 0 L 120 -170 L -100 -170 Z M -60 0 L -110 -210 M 190 0 L 140 -230" stroke="${INK}" stroke-width="22" fill="none" stroke-linejoin="round" stroke-linecap="round"/><path d="M -190 0 L -60 0 L 120 -170 L -100 -170 Z M -60 0 L -110 -210 M 190 0 L 140 -230" stroke="${col}" stroke-width="12" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
  g += `<path d="M -150 -215 H -60" stroke="${INK}" stroke-width="22" stroke-linecap="round"/><path d="M 140 -230 L 110 -250 M 140 -230 L 190 -240" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><circle cx="-60" cy="0" r="22" fill="#5a5d64" stroke="${INK}" stroke-width="5"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}

// ---------- 14-day calendar, each cell a moon + "6 h"; n cells revealed ----------
export function calendar14(x, y, n, t, o = {}) {
  const cw = 118, ch = 140, gap = 12, W = 7 * cw + 6 * gap, H = 2 * ch + gap;
  let s = `<rect x="${x - W / 2 - 30}" y="${y - 110}" width="${W + 60}" height="${H + 150}" rx="30" fill="#f6f2e8" stroke="${INK}" stroke-width="8"/><rect x="${x - W / 2 - 30}" y="${y - 110}" width="${W + 60}" height="84" rx="30" fill="#d9493f" stroke="${INK}" stroke-width="8"/><rect x="${x - W / 2 - 26}" y="${y - 60}" width="${W + 52}" height="34" fill="#d9493f"/>`;
  s += T(x, y - 52, o.title || '14 NÄCHTE', 50, { fill: '#fff' });
  for (let i = 0; i < 14; i++) {
    const cx = x - W / 2 + (i % 7) * (cw + gap), cy = y + 10 + Math.floor(i / 7) * (ch + gap);
    s += `<rect x="${cx}" y="${cy}" width="${cw}" height="${ch}" rx="14" fill="#e8e2d4" stroke="#b8b0a0" stroke-width="4"/>`;
    const p = cl((n - i) * 1.6);
    if (p > 0) {
      const sc = f1(back1(p) * 1000) / 1000, mx = cx + cw / 2, my = cy + 58;
      s += `<g transform="translate(${mx} ${my}) scale(${sc})"><rect x="${-cw / 2 + 4}" y="-54" width="${cw - 8}" height="${ch - 8}" rx="12" fill="#2b3566"/><path d="M 14 -30 A 30 30 0 1 0 22 22 A 24 24 0 1 1 14 -30 Z" fill="#f4e3a0"/>${T(0, 76, '6 h', 34, { fill: '#fff' })}</g>`;
    }
  }
  return s;
}
const back1 = p => { const c = 1.7, q = p - 1; return 1 + (c + 1) * q * q * q + c * q * q; };

// ---------- vertical gauge (level 0..1) with a caption block under it ----------
export function gauge(x, y, lvl, col, title, lines, o = {}) {
  const w = 190, h = 560, a = o.a === undefined ? 1 : o.a;
  let s = T(x, y - 30, title, 50, { fill: '#fff', stroke: INK, sw: 10 });
  s += `<rect x="${x - w / 2 - 10}" y="${y - 10}" width="${w + 20}" height="${h + 20}" rx="34" fill="${INK}"/><rect x="${x - w / 2}" y="${y}" width="${w}" height="${h}" rx="26" fill="#3a3b52"/>`;
  for (let i = 1; i < 5; i++) s += `<path d="M ${x - w / 2 + 14} ${y + h * i / 5} h 30" stroke="#6a6b85" stroke-width="5"/>`;
  const fh = h * cl(lvl);
  if (fh > 1) s += `<rect x="${x - w / 2 + 12}" y="${f1(y + h - fh + 12)}" width="${w - 24}" height="${f1(Math.max(0, fh - 24))}" rx="18" fill="${col}"/><rect x="${x - w / 2 + 26}" y="${f1(y + h - fh + 24)}" width="24" height="${f1(Math.max(0, fh - 48))}" rx="10" fill="#fff" opacity=".25"/>`;
  const cp = o.cap === undefined ? 1 : o.cap;
  if (cp > 0) {
    const size = 38, lh = 46, bw = 440, bh = lines.length * lh + 36, by = y + h + 44;
    s += `<g opacity="${op(cp)}" transform="translate(${x} ${by}) scale(${f1(Math.max(.01, back1(cl(cp))) * 1000) / 1000}) translate(${-x} ${-by})"><rect x="${x - bw / 2}" y="${by}" width="${bw}" height="${bh}" rx="26" fill="${col}" stroke="${INK}" stroke-width="7"/>${lines.map((l, i) => T(x, by + 30 + size * .85 + i * lh, l, size, { fill: '#fff', stroke: INK, sw: 7 })).join('')}</g>`;
  }
  return `<g opacity="${op(a)}">${s}</g>`;
}

// ---------- warning lamp (blink on/off) ----------
export function siren(x, y, s, on) {
  const c = on ? '#ff3b30' : '#7a2a26';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${on ? pool(0, -40, 170, 170, '#ff3b30', .55) : ''}<rect x="-70" y="0" width="140" height="34" rx="8" fill="#3a3d44" stroke="${INK}" stroke-width="6"/><path d="M -54 0 V -50 A 54 54 0 0 1 54 -50 V 0 Z" fill="${c}" stroke="${INK}" stroke-width="6"/><path d="M -30 -50 A 30 30 0 0 1 -6 -78" stroke="#fff" stroke-width="8" fill="none" opacity="${on ? .7 : .25}" stroke-linecap="round"/>${on ? `<g stroke="#ffd23f" stroke-width="9" stroke-linecap="round"><path d="M -100 -60 l -40 -14"/><path d="M 100 -60 l 40 -14"/><path d="M -80 -112 l -28 -30"/><path d="M 80 -112 l 28 -30"/><path d="M 0 -130 v -40"/></g>` : ''}</g>`;
}

// ---------- morning window (close framing): sky, trees, houses outside; wall, curtains, sill inside ----------
// o.pale 0..1 extra sky paleness; o.sun 0..1 sunlight
export function windowView(t, o = {}) {
  const pale = o.pale || 0, sun = o.sun === undefined ? .8 : o.sun;
  const sk1 = mixHex('#4fa3e0', '#b9c3cc', pale), sk2 = mixHex('#bfe3f5', '#d9dde0', pale);
  let s = `<defs>${lg('v102wv', [[0, sk1], [1, sk2]])}${lg('v102ww', [[0, '#e9dcc4'], [1, '#d8c6a6']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v102ww)"/>`;
  // outside
  s += `<rect x="120" y="230" width="840" height="900" fill="url(#v102wv)"/>`;
  s += `<circle cx="790" cy="360" r="62" fill="#fff4c0"/>`;
  s += `<g fill="#fff" opacity=".85"><ellipse cx="300" cy="380" rx="90" ry="34"/><ellipse cx="360" cy="360" rx="70" ry="34"/><ellipse cx="620" cy="470" rx="80" ry="26"/></g>`;
  const H = [[130, 700, 220, '#e0b04a'], [360, 640, 200, '#c25b4e'], [570, 720, 180, '#e8d2a8'], [760, 660, 210, '#5f8fb5']];
  for (const [x, y, w, c] of H) { s += `<rect x="${x}" y="${y}" width="${w}" height="${1130 - y}" fill="${c}"/><path d="M ${x - 10} ${y} H ${x + w + 10} L ${x + w / 2} ${y - 70} Z" fill="#8a4a3a"/>`; for (let r = 0; r < 3; r++) for (let c2 = 0; c2 < 2; c2++) s += `<rect x="${x + 30 + c2 * (w / 2 - 10)}" y="${y + 40 + r * 120}" width="${w / 2 - 50}" height="70" fill="#dbeaf4"/>`; }
  for (const [x, y, r] of [[230, 930, 150], [520, 980, 170], [840, 940, 160]]) s += `<rect x="${x - 16}" y="${y}" width="32" height="220" fill="#6b4a2e"/><circle cx="${x}" cy="${y - 20}" r="${r}" fill="#3f9a45"/><circle cx="${x - r * .45}" cy="${y + 20}" r="${r * .6}" fill="#4cae4f"/><circle cx="${x + r * .45}" cy="${y - r * .3}" r="${r * .65}" fill="#5cc25a"/>`;
  s += `<rect x="120" y="230" width="840" height="900" fill="none" stroke="#f6f2ea" stroke-width="26"/><path d="M 540 230 V 1130 M 120 680 H 960" stroke="#f6f2ea" stroke-width="16"/>`;
  // curtains, shelf with books, framed picture, wall lamp, clock
  s += `<path d="M 40 190 C 90 500 50 800 90 1160 L 170 1160 C 140 800 170 500 140 190 Z M 1040 190 C 990 500 1030 800 990 1160 L 910 1160 C 940 800 910 500 940 190 Z" fill="#c25b6a"/><rect x="0" y="176" width="1080" height="18" fill="#8a6a4a"/>`;
  let b = blur(s, o.strong);
  // sill (sharp) with plant, mug, book, alarm clock
  b += `<rect x="60" y="1130" width="960" height="44" rx="8" fill="#f2ece0" stroke="${INK}" stroke-width="6"/><rect x="80" y="1174" width="920" height="40" fill="#c9bca4"/>`;
  b += `<rect x="-200" y="1214" width="1480" height="900" fill="#cdb894"/>`;
  b += pool(790, 360, 520 * sun, 520 * sun, '#fff3b0', .5 * sun) + `<path d="M 120 230 L 960 230 L 1180 1900 L -100 1900 Z" fill="#fff6d0" opacity="${op(.1 * sun)}"/>`;
  return b;
}
export function sill(t) { return plant(180, 1132, .75, '#d9663a') + mug(900, 1130, .9, '#f2c14e', t) + `<rect x="300" y="1096" width="150" height="34" rx="4" fill="#5f8fb5" stroke="${INK}" stroke-width="4"/><rect x="310" y="1066" width="130" height="30" rx="4" fill="#e0b04a" stroke="${INK}" stroke-width="4"/>`; }

// ---------- traffic street at a crossing ----------
export function crossing(t, o = {}) {
  let s = `<defs>${lg('v102cs', [[0, '#7fb6e0'], [.7, '#cfe3ee'], [1, '#e8eef0']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v102cs)"/>`;
  const H = [[-160, 300, 300, '#d98f6b'], [140, 360, 260, '#e8d2a8'], [400, 280, 240, '#b0583f'], [640, 340, 280, '#c9cfd6'], [920, 300, 300, '#e0b04a']];
  for (const [x, y, w, c] of H) {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${1000 - y}" fill="${c}"/><path d="M ${x - 14} ${y} H ${x + w + 14} L ${x + w / 2} ${y - 90} Z" fill="#8a4a3a"/>`;
    for (let r = 0; r < 4; r++) for (let c2 = 0; c2 < 3; c2++) s += `<rect x="${x + 30 + c2 * (w - 60) / 3}" y="${y + 50 + r * 140}" width="${(w - 60) / 3 - 20}" height="84" fill="#bcd8ee" stroke="#fff" stroke-width="6"/>`;
  }
  s += `<rect x="560" y="820" width="260" height="180" fill="#f4f1ea"/><path d="M 550 820 H 830 L 810 770 H 570 Z" fill="#3c9a5f"/>`;
  for (const x of [40, 860]) s += `<rect x="${x - 14}" y="760" width="28" height="240" fill="#7a5a3a"/><circle cx="${x}" cy="720" r="110" fill="#5e9a50"/><circle cx="${x + 46}" cy="670" r="74" fill="#6fae5e"/>`;
  s += `<rect x="-200" y="1000" width="1480" height="70" fill="#c9c2b0"/><rect x="-200" y="1070" width="1480" height="1050" fill="#6f747c"/>`;
  s += `<g transform="translate(240 980)"><rect x="-130" y="-90" width="260" height="90" rx="26" fill="#5f8fb5"/><rect x="-90" y="-140" width="180" height="70" rx="20" fill="#5f8fb5"/><rect x="-74" y="-128" width="66" height="50" fill="#dbeaf4"/><rect x="6" y="-128" width="66" height="50" fill="#dbeaf4"/><circle cx="-80" cy="0" r="28" fill="#222"/><circle cx="80" cy="0" r="28" fill="#222"/></g>`;
  let b = blur(s, o.strong);
  // sharp road markings: zebra crossing + stop line
  b += `<g fill="#f2f2ee">${[0, 1, 2, 3, 4, 5].map(i => `<path d="M ${640 + i * 70} 1120 h 44 l 30 560 h -44 Z"/>`).join('')}</g><path d="M 600 1120 l 30 560" stroke="#f2f2ee" stroke-width="18"/>`;
  b += pool(880, 200, 460, 460, '#fff3b0', .35);
  return b;
}
