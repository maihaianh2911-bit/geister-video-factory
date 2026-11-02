// v103 sets + helpers: apartment entrance with front door (inside view), stairwell outside, two doors (closed / ajar glowing),
// regret graph, memory bubbles (sepia pictures), cane. Glows are radialGradients; only the far group is blurred.
import { K, f1, op, cl, lerp, prog, eio, T, pool, blur, plant, clock, head, mug } from './lib.js';
const INK = K.ink;
const lg = (id, stops, v = true) => `<linearGradient id="${id}" x1="0" y1="0" x2="${v ? 0 : 1}" y2="${v ? 1 : 0}">${stops.map(([o, c]) => `<stop offset="${o}" stop-color="${c}"/>`).join('')}</linearGradient>`;

// ---------- apartment entrance, evening. Door centre-right (x 560..900, y 360..1200). o.open 0..1 swings it inward (towards camera, left) ----------
export function entry(t, o = {}) {
  const open = cl(o.open || 0);
  let s = `<defs>${lg('v103ew', [[0, '#3c3a52'], [.6, '#4d4a60'], [1, '#5a5266']])}${lg('v103ef', [[0, '#6e5444'], [1, '#43342c']])}</defs>`;
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="url(#v103ew)"/>`;
  // wainscot
  s += `<rect x="-200" y="900" width="1480" height="260" fill="#45425a"/><path d="M -200 900 H 1280" stroke="#2f2d40" stroke-width="10"/>`;
  // coat rack with hooks + coats (left)
  s += `<rect x="40" y="420" width="380" height="24" rx="8" fill="#7a5a48"/>${[90, 190, 290, 380].map(x => `<circle cx="${x}" cy="452" r="10" fill="#c9a86a"/>`).join('')}`;
  s += `<path d="M 70 452 C 40 560 40 760 60 860 L 140 860 C 150 760 140 560 110 452 Z" fill="#8a5a3c"/><path d="M 160 452 C 130 600 140 780 160 880 L 240 880 C 250 760 230 560 210 452 Z" fill="#3e5476"/><path d="M 280 452 C 260 520 260 600 270 640 L 330 640 C 330 590 320 520 300 452 Z" fill="#c25b4e"/><path d="M 380 452 Q 360 520 400 560 Q 430 520 390 452 Z" fill="#e0b04a"/>`;
  // mirror + framed pics
  s += `<ellipse cx="240" cy="260" rx="90" ry="110" fill="#9fb3c8" stroke="#c9a86a" stroke-width="12"/><path d="M 200 210 L 270 180 M 210 260 L 290 222" stroke="#dbe6f0" stroke-width="10" stroke-linecap="round" opacity=".7"/>`;
  s += `<rect x="960" y="380" width="120" height="150" fill="#e8dcc8"/><rect x="972" y="392" width="96" height="126" fill="#8fb3a8"/><rect x="980" y="580" width="90" height="90" fill="#e8dcc8"/><rect x="992" y="592" width="66" height="66" fill="#d98f6b"/>`;
  // dresser with key bowl, lamp, plant (left low)
  s += `<rect x="0" y="960" width="440" height="200" rx="8" fill="#6d4c3d"/><rect x="20" y="990" width="400" height="70" rx="6" fill="#5c3f33"/><rect x="20" y="1075" width="400" height="70" rx="6" fill="#5c3f33"/><circle cx="220" cy="1025" r="8" fill="#c9a86a"/><circle cx="220" cy="1110" r="8" fill="#c9a86a"/>`;
  s += `<ellipse cx="120" cy="955" rx="56" ry="16" fill="#5f8fb5"/>` + plant(360, 960, .55, '#c25b4e');
  // shoe rack right of door
  s += `<rect x="930" y="1080" width="220" height="80" fill="#6d4c3d"/>${[960, 1030, 1100].map((x, i) => `<path d="M ${x - 26} 1080 q 0 -30 26 -30 h 20 q 20 0 20 30 z" fill="${['#c25b4e', '#2e3440', '#e8dcc8'][i]}"/>`).join('')}`;
  s += `<rect x="-200" y="1160" width="1480" height="960" fill="url(#v103ef)"/><g fill="#000" opacity=".1">${[1250, 1400, 1580, 1780].map(y => `<rect x="-200" y="${y}" width="1480" height="5"/>`).join('')}</g>`;
  let b = blur(s, o.strong);
  // door frame + stairwell behind (sharp-ish, the main light source when open)
  b += `<rect x="540" y="340" width="380" height="840" fill="#2a2420"/>`;
  b += `<rect x="560" y="360" width="340" height="820" fill="#e9b75c"/><rect x="560" y="900" width="340" height="280" fill="#b98a4a"/><path d="M 560 1000 H 900 M 560 1080 H 900" stroke="#9a7038" stroke-width="8"/><rect x="760" y="420" width="16" height="540" fill="#8a6a4a"/>`;
  b += pool(730, 600, 260, 300, '#fff0b8', .7);
  // door leaf (hinged at left x 560): width shrinks as it opens
  const w = 340 * (1 - open * .82);
  b += `<path d="M 560 360 L ${f1(560 + w)} ${f1(360 - 40 * open)} L ${f1(560 + w)} ${f1(1180 + 40 * open)} L 560 1180 Z" fill="#8a5a3c" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  if (open < .9) b += `<rect x="${f1(560 + w * .12)}" y="${f1(430 - 30 * open)}" width="${f1(w * .76)}" height="300" rx="8" fill="none" stroke="#6e452c" stroke-width="8"/><rect x="${f1(560 + w * .12)}" y="${f1(800)}" width="${f1(w * .76)}" height="${f1(300 + 20 * open)}" rx="8" fill="none" stroke="#6e452c" stroke-width="8"/><circle cx="${f1(560 + w * .88)}" cy="780" r="16" fill="#d8b25a" stroke="${INK}" stroke-width="5"/><circle cx="${f1(560 + w * .5)}" cy="620" r="9" fill="#2a2420"/>`;
  b += `<rect x="540" y="340" width="380" height="840" fill="none" stroke="#e8dcc8" stroke-width="18"/>`;
  // doormat
  b += `<path d="M 520 1220 L 940 1220 L 990 1330 L 470 1330 Z" fill="#8c6a3f" stroke="${INK}" stroke-width="5"/><path d="M 540 1250 H 920 M 520 1290 H 950" stroke="#6e5230" stroke-width="6"/>`;
  // light spill on the floor from the stairwell
  b += pool(730, 1300, 380 * (.3 + .7 * open), 140, '#ffd98a', .5 * open);
  // ceiling lamp of the flat (dim, warm)
  b += pool(300, 300, 420, 420, '#ffcf8a', .18);
  return b;
}
// doorbell near the frame (x,y); ring 0..1 draws vibration arcs
export function bell(x, y, ring) {
  let s = `<rect x="${x - 26}" y="${y - 40}" width="52" height="80" rx="10" fill="#e8dcc8" stroke="${INK}" stroke-width="5"/><circle cx="${x}" cy="${y}" r="14" fill="#d8b25a" stroke="${INK}" stroke-width="4"/>`;
  if (ring > 0) s += `<g stroke="${K.yellow}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${op(ring)}"><path d="M ${x - 50} ${y - 30} q -18 30 0 60"/><path d="M ${x - 78} ${y - 50} q -30 50 0 100"/><path d="M ${x + 50} ${y - 30} q 18 30 0 60"/><path d="M ${x + 78} ${y - 50} q 30 50 0 100"/></g>`;
  return s;
}
// walking cane held at (hx,hy) standing on the floor at fy
export function cane(hx, hy, fy, lean = 0) {
  const bx = hx + lean;
  return `<path d="M ${f1(bx)} ${f1(fy)} L ${f1(hx)} ${f1(hy)} q 0 -40 -36 -40" stroke="${INK}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M ${f1(bx)} ${f1(fy)} L ${f1(hx)} ${f1(hy)} q 0 -40 -36 -40" stroke="#8a5a3c" stroke-width="12" fill="none" stroke-linecap="round"/>`;
}
// hat (on head-local coords of r=165 head): sits on top
export function hat(x, y, s = 1) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})"><path d="M -200 -100 Q 0 -150 200 -100 Q 180 -80 0 -90 Q -180 -80 -200 -100 Z" fill="#4a4c56" stroke="${INK}" stroke-width="6"/><path d="M -120 -110 C -120 -230 120 -230 120 -110 Z" fill="#5d5f68" stroke="${INK}" stroke-width="6"/><path d="M -118 -132 Q 0 -150 118 -132" stroke="#2a2b30" stroke-width="18" fill="none"/></g>`;
}

// ---------- memory bubble: big rounded picture with trailing circles toward (tx,ty); sepia tint. p = pop progress ----------
export function memBubble(x, y, w, h, tx, ty, p, inner, id, o = {}) {
  if (p <= 0) return '';
  const k = Math.max(.01, p);
  const c1 = [lerp(x, tx, .55), lerp(y + h / 2, ty, .45)], c2 = [lerp(x, tx, .8), lerp(y + h / 2, ty, .78)];
  const sep = o.sepia === undefined ? .28 : o.sepia;
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(k * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(cl(p * 2) * (o.a === undefined ? 1 : o.a))}"><circle cx="${f1(c2[0])}" cy="${f1(c2[1])}" r="12" fill="#f6ead2" stroke="${INK}" stroke-width="5"/><circle cx="${f1(c1[0])}" cy="${f1(c1[1])}" r="20" fill="#f6ead2" stroke="${INK}" stroke-width="5"/><g transform="translate(${f1(x)} ${f1(y)})"><defs><clipPath id="v103mb${id}"><rect x="${-w / 2 + 14}" y="${-h / 2 + 14}" width="${w - 28}" height="${h - 28}" rx="34"/></clipPath><radialGradient id="v103mv${id}" cx="50%" cy="50%" r="60%"><stop offset=".6" stop-color="#4a2e14" stop-opacity="0"/><stop offset="1" stop-color="#4a2e14" stop-opacity=".45"/></radialGradient></defs><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="46" fill="#f6ead2" stroke="${INK}" stroke-width="6"/><g clip-path="url(#v103mb${id})">${inner}<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#c08a4a" opacity="${op(sep)}"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="url(#v103mv${id})"/></g></g></g>`;
}

// ---------- the two doors (symbol): closed door (mistake) and ajar glowing door (missed chance) ----------
export function doorPanel(x, y, w, h, open, glow, o = {}) {
  // frame x..x+w, y..y+h, door hinged left; open 0..1 gap; glow 0..1 light through the gap
  let s = `<rect x="${x - 18}" y="${y - 18}" width="${w + 36}" height="${h + 18}" fill="${o.frame || '#e8dcc8'}" stroke="${INK}" stroke-width="6"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${glow > 0 ? '#fff3c4' : '#1c1a22'}"/>`;
  if (glow > 0) s += pool(x + w / 2, y + h / 2, w * .9, h * .7, '#ffe08a', glow);
  const dw = w * (1 - open * .7);
  s += `<path d="M ${x} ${y} L ${f1(x + dw)} ${f1(y - 24 * open)} L ${f1(x + dw)} ${f1(y + h + 24 * open)} L ${x} ${y + h} Z" fill="${o.col || '#8a5a3c'}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/>`;
  s += `<rect x="${f1(x + dw * .14)}" y="${y + 50}" width="${f1(dw * .72)}" height="${f1(h * .36)}" rx="8" fill="none" stroke="${o.sh || '#6e452c'}" stroke-width="8"/><rect x="${f1(x + dw * .14)}" y="${f1(y + h * .5)}" width="${f1(dw * .72)}" height="${f1(h * .4)}" rx="8" fill="none" stroke="${o.sh || '#6e452c'}" stroke-width="8"/><circle cx="${f1(x + dw * .86)}" cy="${f1(y + h * .48)}" r="14" fill="#d8b25a" stroke="${INK}" stroke-width="5"/>`;
  return s;
}
// dark calm "void" room for the symbolic shots
export function voidRoom2(t, o = {}) {
  let s = `<defs>${lg('v103vr', [[0, o.top || '#262a3a'], [1, o.bot || '#3a3346']])}</defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v103vr)"/>`;
  s += `<rect x="-200" y="1240" width="1480" height="880" fill="#2a2532"/><path d="M -200 1240 H 1280" stroke="#1d1a24" stroke-width="8"/>`;
  return s;
}

// ---------- graph: regret over time. reveal a/b 0..1 for the two lines, xOf/yOf helpers exported ----------
export const G = { X0: 150, X1: 950, Y0: 1180, YT: 520 };
export const yGetan = u => G.Y0 - 80 - 520 * (1 - eio(cl(u / .9)) * .82) * (u < .05 ? 1 : 1);
export const yNicht = u => G.Y0 - 80 - 520 * (.22 + .78 * eio(cl((u - .1) / .85)));
export function graph(t, a, b, o = {}) {
  const { X0, X1, Y0, YT } = G;
  let s = `<rect x="70" y="400" width="940" height="960" rx="30" fill="#fbf8ef" stroke="${INK}" stroke-width="8"/>`;
  s += `<path d="M ${X0} ${YT - 20} V ${Y0} H ${X1 + 30}" stroke="${INK}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M ${X1 + 30} ${Y0} l -22 -14 v 28 Z" fill="${INK}"/>`;
  s += T(X0 + 14, YT - 30, 'BEDAUERN', 34, { anchor: 'start', fill: K.txt });
  s += T(X0 + 10, Y0 + 60, 'KURZ DANACH', 30, { anchor: 'start', fill: '#5a636c', op: o.lab1 === undefined ? 1 : o.lab1 });
  s += T(X1 + 20, Y0 + 60, 'IM RÜCKBLICK', 30, { anchor: 'end', fill: '#5a636c', op: o.lab2 === undefined ? 1 : o.lab2 });
  const line = (fy, rev, col) => { let d = ''; for (let i = 0; i <= 60; i++) { const u = i / 60; if (u > rev) break; d += (d ? ' L ' : 'M ') + f1(X0 + 20 + u * (X1 - X0 - 20)) + ' ' + f1(fy(u)); } return d ? `<path d="${d}" stroke="${col}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` + (rev > 0 ? `<circle cx="${f1(X0 + 20 + cl(rev) * (X1 - X0 - 20))}" cy="${f1(fy(cl(rev)))}" r="16" fill="${col}" stroke="${INK}" stroke-width="5"/>` : '') : ''; };
  s += line(yGetan, a, '#d9493f') + line(yNicht, b, '#2f7fb5');
  return s;
}

// ---------- small memory pictures (bubble-local coords, centred) ----------
export function picWedding(t, w, h) {
  let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#efe2cf"/><path d="M ${-w / 2} ${h * .18} H ${w / 2}" stroke="#d8c6a8" stroke-width="6"/>`;
  s += `<g fill="#f6efe2" stroke="${INK}" stroke-width="4">${[-120, 120].map(x => `<path d="M ${x - 40} ${-h / 2 + 30} q 40 50 80 0"/>`).join('')}</g>`; // garlands
  s += `<path d="M -150 ${f1(h / 2)} C -150 40 -60 20 -40 ${f1(h / 2)} Z" fill="#7aa27a" stroke="${INK}" stroke-width="4"/>` + head('du', -96, -20, .34, { t, seed: 2, eyes: 'wide', brows: 'worried', mouth: 'wavy', blink: false });
  s += `<rect x="-20" y="-30" width="14" height="80" fill="#555"/><circle cx="-13" cy="-40" r="18" fill="#333" stroke="#777" stroke-width="3"/>`; // microphone
  s += `<g transform="translate(110 40)"><rect x="-50" y="-60" width="100" height="120" rx="10" fill="#fff" stroke="${INK}" stroke-width="4"/><path d="M -60 -60 h 120 l -10 -26 h -100 z" fill="#f6d6d6" stroke="${INK}" stroke-width="4"/></g>`; // cake
  return s;
}
export function picLetter(t, w, h) {
  let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#e6e2d8"/>`;
  s += `<g transform="rotate(-6)"><rect x="-110" y="-120" width="220" height="250" rx="6" fill="#fbf8ef" stroke="${INK}" stroke-width="4"/>${T(0, -70, 'KÜNDIGUNG', 30, { fill: K.txt })}${[-30, 0, 30, 60].map(y => `<rect x="-80" y="${y}" width="${y === 60 ? 90 : 160}" height="10" rx="5" fill="#b9b2a4"/>`).join('')}<path d="M 20 100 q 20 -20 40 0 t 40 0" stroke="#2f5fb5" stroke-width="5" fill="none"/></g>`;
  return s;
}
export function picLena(t, w, h) {
  let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#e9d3b4"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h * .4}" fill="#d9bf98"/>`;
  s += `<rect x="${w / 2 - 170}" y="${-h / 2 + 30}" width="130" height="150" fill="#c9dbe6" stroke="#8a6a4a" stroke-width="8"/>`; // café window
  s += `<path d="M ${-w / 2 + 30} ${-h / 2 + 60} H ${-w / 2 + 200}" stroke="#8a6a4a" stroke-width="8"/>${[0, 1, 2].map(i => `<rect x="${-w / 2 + 44 + i * 52}" y="${-h / 2 + 20}" width="34" height="40" rx="4" fill="${['#f2efe8', '#e8b85c', '#7fa7cf'][i]}"/>`).join('')}`;
  s += `<path d="M -150 ${f1(h / 2)} C -150 30 150 30 150 ${f1(h / 2)} Z" fill="#c8453c" stroke="${INK}" stroke-width="5"/>`;
  s += head('lena', 0, -36, .5, { t, seed: 5, eyes: 'happy', brows: 'up', mouth: 'grin', blink: false });
  s += `<rect x="${-w / 2}" y="${f1(h / 2 - 70)}" width="${w}" height="70" fill="#8a5a3c" stroke="${INK}" stroke-width="4"/>` + mug(170, h / 2 - 70, .9, '#f2efe8', t, true);
  return s;
}
// ticket; tear 0..1 splits it in two
export function ticket(x, y, s, tear, o = {}) {
  const d = 70 * tear, r = 10 * tear;
  const half = (side) => {
    const clipX = side < 0 ? -260 : 0;
    return `<g transform="translate(${f1(side * d)} ${f1(tear * 20)}) rotate(${f1(side * r)})"><defs><clipPath id="v103tk${o.id || 'a'}${side < 0 ? 'l' : 'r'}"><path d="${side < 0 ? 'M -260 -140 H 10 L -10 -90 L 14 -40 L -12 10 L 12 60 L -10 110 L 6 140 H -260 Z' : 'M 260 -140 H 10 L -10 -90 L 14 -40 L -12 10 L 12 60 L -10 110 L 6 140 H 260 Z'}"/></clipPath></defs><g clip-path="url(#v103tk${o.id || 'a'}${side < 0 ? 'l' : 'r'})"><rect x="-250" y="-130" width="500" height="260" rx="20" fill="#f6efe0" stroke="${INK}" stroke-width="6"/><rect x="-250" y="-130" width="500" height="70" rx="20" fill="#2f7fb5"/>${T(-210, -80, 'BOARDING PASS', 26, { anchor: 'start', fill: '#fff', w: 800 })}${T(-210, 10, 'BERLIN', 40, { anchor: 'start', fill: K.txt })}${T(200, 10, 'MADRID', 52, { anchor: 'end', fill: '#d9493f' })}<path d="M -40 -6 h 60 l -14 -14 m 14 14 l -14 14" stroke="${INK}" stroke-width="6" fill="none"/>${T(-210, 90, '1 JAHR · SPANIEN', 26, { anchor: 'start', fill: '#5a636c', w: 700 })}<g fill="${INK}">${Array.from({ length: 10 }, (_, i) => `<rect x="${110 + i * 12}" y="50" width="${i % 3 ? 5 : 9}" height="60"/>`).join('')}</g></g></g>`;
  };
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${half(-1)}${half(1)}</g>`;
}
// phone showing a contact "OPA" with a call button (screen-local); press 0..1 = thumb nearness
export function callPhone(t, x, y, s, o = {}) {
  const id = o.id || 'cf';
  let g = `<rect x="-170" y="-310" width="340" height="620" rx="44" fill="${INK}"/><rect x="-150" y="-280" width="300" height="560" rx="22" fill="${o.dim ? '#20242c' : '#2b3a55'}"/>`;
  g += `<circle cx="0" cy="-130" r="70" fill="#e9f7f4"/>` + head('opa', 0, -130, .34, { t, blink: false, mouth: 'smile', eyes: 'happy' });
  g += T(0, -10, 'OPA', 58, { fill: '#fff' }) + T(0, 30, o.sub || 'Mobil', 24, { fill: '#c8d3e0', w: 600 });
  g += `<circle cx="0" cy="170" r="54" fill="${o.calling ? '#d9493f' : '#3c9a5f'}" stroke="#fff" stroke-width="4"/><path d="M -22 156 q 8 -12 16 0 l -4 8 q 8 14 20 20 l 8 -4 q 12 8 0 16 q -30 10 -46 -26 q -4 -8 6 -14 Z" fill="#fff" transform="rotate(${o.calling ? 135 : 0} 0 170)"/>`;
  if (o.dim) g += `<rect x="-150" y="-280" width="300" height="560" rx="22" fill="#000" opacity="${op(o.dim * .6)}"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// thumb (black blob with sleeve) reaching from below-right to (x,y)
export function thumb(x, y, col = K.du, s = 1) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M 0 0 C 40 30 120 140 200 320" stroke="${INK}" stroke-width="96" fill="none" stroke-linecap="round"/><path d="M 60 120 C 100 180 150 260 210 340" stroke="${col}" stroke-width="110" fill="none" stroke-linecap="round"/><circle cx="0" cy="0" r="40" fill="${INK}"/></g>`;
}
