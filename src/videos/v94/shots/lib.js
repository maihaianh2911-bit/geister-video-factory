// v94 kit — style "đầu tròn đen" at the reference2 quality bar (prompts/styles/dau-tron-den/reference2.svg):
// big characters, detailed lit sets in three layers (far background blur ≈3.5 / sharp characters / sharp foreground),
// one light source per shot, mood colours per emotion, camera always moving.
import { cl, prog, eio, eout, ein, back, lerp, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, hash };

export const K = {
  ink: '#1d1d1d', txt: '#2b2b2b', yellow: '#ffd23f', white: '#ffffff',
  du: '#2fa59a', duSh: '#268b82', duStr: '#e9f7f4',      // "du": teal hoodie (as reference2)
  pack: '#8a5a3a', packSh: '#6e4529', packHi: '#a5714c',  // brown canvas backpack
  cap: '#e07a3a', capSh: '#c4622a', capHat: '#f2c14e',   // friend 1: yellow cap, orange top
  bun: '#8a5cb8', bunSh: '#734a9e',                      // friend 2: bun, purple top
  stone: '#9b9ca2', stoneSh: '#7d7e85', stoneHi: '#b9bac0', stoneTxt: '#3a3a40',
  red: '#d9493f', green: '#3c9a5f', blue: '#3f7fd8',
};
const INK = K.ink;
export const f1 = n => Number.isFinite(n) ? Math.round(n * 10) / 10 : 0;
export const op = a => f1(cl(a) * 100) / 100;
export const fade = (t, t0, d = .3) => eio(prog(t, t0, t0 + d));
export const fout = (t, t0, d = .3) => 1 - eio(prog(t, t0, t0 + d));
export const pop = (t, t0, d = .4) => t < t0 ? 0 : back(prog(t, t0, t0 + d), 1.7);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function textW(s, size) {
  let w = 0;
  for (const ch of String(s)) {
    if (ch === ' ') w += .28; else if ('.,:;!?„“"\'’|·–-'.includes(ch)) w += .32;
    else if ('il1'.includes(ch)) w += .3; else if ('mwMW'.includes(ch)) w += .9;
    else if (ch >= 'A' && ch <= 'Z' || 'ÄÖÜ'.includes(ch)) w += .74; else w += .6;
  }
  return w * size;
}
export const T = (x, y, s, size, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="Inter" font-weight="${o.w || 900}" font-size="${size}" fill="${o.fill || K.txt}" text-anchor="${o.anchor || 'middle'}"${o.op !== undefined ? ` opacity="${op(o.op)}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 12}" paint-order="stroke" stroke-linejoin="round"` : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''} style="font-family:'Inter';font-weight:${o.w || 900}">${esc(s)}</text>`;

// ---------- frame: filters + vignette ----------
export function frame(body, o = {}) {
  const v = o.vig === undefined ? .55 : o.vig;
  return `<defs><filter id="v94b" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="${o.blur || 3.5}"/></filter><filter id="v94s" x="-20%" y="-50%" width="140%" height="200%"><feGaussianBlur stdDeviation="7"/></filter><filter id="v94g" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="22"/></filter>` +
    `<radialGradient id="v94vig" cx="50%" cy="46%" r="74%"><stop offset="56%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity="${v}"/></radialGradient>` +
    `<radialGradient id="v94lp"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient></defs>` +
    `<rect width="1080" height="1920" fill="#222"/>${body}<rect width="1080" height="1920" fill="url(#v94vig)"/>`;
}
// camera: scale around (cx,cy) then shift by (dx,dy)
export const cam = (body, cx, cy, sc, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${f1(sc * 1000) / 1000}) translate(${f1(-cx)} ${f1(-cy)})">${body}</g>`;
export const blurG = s => `<g filter="url(#v94b)">${s}</g>`;
// soft light pool (radial, additive look)
export function light(x, y, rx, ry, col, a = .45) {
  if (a <= 0) return '';
  return `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${col}" opacity="${op(a)}" filter="url(#v94g)"/>`;
}
const vg = (id, a, b, c) => `<linearGradient id="${id}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${a}"/>${c ? `<stop offset=".55" stop-color="${b}"/><stop offset="1" stop-color="${c}"/>` : `<stop offset="1" stop-color="${b}"/>`}</linearGradient>`;
export const shadow = (x, y, rx = 170, a = 1) => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(rx * .15)}" fill="#000" opacity="${op(.3 * a)}" filter="url(#v94s)"/>`;
// colour wash over the whole frame (mood shift)
export const wash = (col, a) => a > 0 ? `<rect width="1080" height="1920" fill="${col}" opacity="${op(a)}"/>` : '';

// ---------- helper props used in sets (screen coords) ----------
function books(x, y, w, seed, h = 90) {
  const cols = ['#e0b04a', '#5f8fb5', '#c25b4e', '#7aa27a', '#d9cbb0', '#8a6fb0', '#e08a5a'];
  let s = '', cx = x, i = 0;
  while (cx < x + w - 20) { const bw = 20 + Math.floor(hash(seed + i) * 14), bh = h - Math.floor(hash(seed + i + 50) * 26); s += `<rect x="${cx}" y="${y - bh}" width="${bw}" height="${bh}" fill="${cols[Math.floor(hash(seed + i * 3) * cols.length)]}"/>`; cx += bw + 3; i++; }
  return s;
}
function shelf(x, y, w, h, o = {}) {
  const c = o.col || '#6d4c3d', d = o.dk || '#563a2e';
  let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c}"/>`;
  const rows = o.rows || 3, rh = h / rows;
  for (let r = 1; r <= rows; r++) {
    const yy = y + r * rh;
    s += `<rect x="${x}" y="${f1(yy - 14)}" width="${w}" height="14" fill="${d}"/>`;
    const seed = (o.seed || 1) * 10 + r;
    s += books(x + 20, yy - 14, w * .55, seed, rh * .62);
    if (r % 3 === 1) s += `<circle cx="${f1(x + w * .78)}" cy="${f1(yy - 14 - rh * .32)}" r="${f1(rh * .22)}" fill="#4f7a59"/><rect x="${f1(x + w * .78 - rh * .14)}" y="${f1(yy - 14 - rh * .22)}" width="${f1(rh * .28)}" height="${f1(rh * .22)}" fill="#b9714f"/>`;
    else if (r % 3 === 2) s += `<rect x="${f1(x + w * .66)}" y="${f1(yy - 14 - rh * .45)}" width="${f1(w * .26)}" height="${f1(rh * .45)}" rx="6" fill="#d9cbb0"/>`;
    else s += `<rect x="${f1(x + w * .64)}" y="${f1(yy - 14 - rh * .38)}" width="${f1(w * .3)}" height="${f1(rh * .38)}" fill="#e0b04a"/>`;
  }
  return s;
}
const frameP = (x, y, w, h, c, fc = '#e8dcc8') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fc}"/><rect x="${x + 12}" y="${y + 12}" width="${w - 24}" height="${h - 24}" fill="${c}"/>`;
function clockFace(x, y, r, hh, mm, o = {}) {
  const ah = (hh % 12 + mm / 60) / 12 * Math.PI * 2, am = mm / 60 * Math.PI * 2;
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${o.face || '#f4efe4'}" stroke="${o.rim || '#3a3030'}" stroke-width="${f1(r * .14)}"/>` +
    [0, 1, 2, 3].map(i => { const a = i * Math.PI / 2; return `<line x1="${f1(x + Math.sin(a) * r * .72)}" y1="${f1(y - Math.cos(a) * r * .72)}" x2="${f1(x + Math.sin(a) * r * .86)}" y2="${f1(y - Math.cos(a) * r * .86)}" stroke="#3a3030" stroke-width="${f1(r * .07)}"/>`; }).join('') +
    `<line x1="${x}" y1="${y}" x2="${f1(x + Math.sin(ah) * r * .5)}" y2="${f1(y - Math.cos(ah) * r * .5)}" stroke="#2a2222" stroke-width="${f1(r * .1)}" stroke-linecap="round"/><line x1="${x}" y1="${y}" x2="${f1(x + Math.sin(am) * r * .74)}" y2="${f1(y - Math.cos(am) * r * .74)}" stroke="#2a2222" stroke-width="${f1(r * .06)}" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="${f1(r * .07)}" fill="#2a2222"/>`;
}
export { clockFace };
function plantPot(x, y, s = 1, leaf = '#4f8a5b', pot = '#b9714f') {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -40 0 L 40 0 L 30 70 L -30 70 Z" fill="${pot}"/><g fill="${leaf}"><ellipse cx="-30" cy="-40" rx="22" ry="52" transform="rotate(-28 -30 -40)"/><ellipse cx="28" cy="-46" rx="22" ry="54" transform="rotate(26 28 -46)"/><ellipse cx="0" cy="-70" rx="20" ry="62"/><ellipse cx="-50" cy="-10" rx="16" ry="40" transform="rotate(-60 -50 -10)"/><ellipse cx="50" cy="-12" rx="16" ry="40" transform="rotate(60 50 -12)"/></g></g>`;
}
export { plantPot };
function cityWindow(x, y, w, h, sky, o = {}) {
  const id = o.id || 'v94sky';
  let s = `<defs>${vg(id, sky[0], sky[1])}</defs><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="url(#${id})"/>`;
  if (o.moon) s += `<circle cx="${x + w * .76}" cy="${y + h * .16}" r="${w * .09}" fill="#f4eccd"/>`;
  if (o.sun) s += `<circle cx="${x + w * .7}" cy="${y + h * .22}" r="${w * .12}" fill="#fff3c4"/><circle cx="${x + w * .7}" cy="${y + h * .22}" r="${w * .2}" fill="#fff3c4" opacity=".35"/>`;
  if (o.stars) for (let i = 0; i < 14; i++) s += `<circle cx="${f1(x + 14 + hash(i * 3 + 1) * (w - 28))}" cy="${f1(y + 14 + hash(i * 7 + 2) * h * .45)}" r="${f1(1.5 + hash(i) * 2)}" fill="#fff" opacity=".8"/>`;
  const bc = o.bld || '#1b1f3f', lit = o.lit || '#ffd36b';
  const bl = [[0, .62, .18], [.19, .5, .16], [.37, .58, .22], [.6, .44, .16], [.78, .66, .22]];
  bl.forEach(([bx, by, bw], i) => {
    const X = x + bx * w, Y = y + by * h, W = bw * w;
    s += `<rect x="${f1(X)}" y="${f1(Y)}" width="${f1(W)}" height="${f1(y + h - Y)}" fill="${bc}"/>`;
    if (lit !== 'none') for (let k = 0; k < 4; k++) if (hash(i * 9 + k) > .35) s += `<rect x="${f1(X + 10 + (k % 2) * W * .45)}" y="${f1(Y + 16 + Math.floor(k / 2) * 40)}" width="10" height="12" fill="${lit}"/>`;
  });
  if (o.tree) s += `<rect x="${x + w * .2}" y="${y + h * .55}" width="14" height="${h * .45}" fill="#6b4a2e"/><circle cx="${x + w * .22}" cy="${y + h * .5}" r="${w * .17}" fill="#5f9a5a"/><circle cx="${x + w * .1}" cy="${y + h * .6}" r="${w * .12}" fill="#6fae66"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="8" fill="none" stroke="${o.frame || '#e8dcc8'}" stroke-width="16"/><line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${o.frame || '#e8dcc8'}" stroke-width="10"/>`;
  return s;
}

// ---------- moods ----------
const MOOD = {
  evening: { w: ['#3a3550', '#5a4a5e', '#6b5560'], f: ['#7a5a48', '#4e3a30'], sky: ['#232a5a', '#4a3f74'], lamp: '#ffd98a' },
  blue: { w: ['#22304a', '#30405c', '#3a4a62'], f: ['#3d4656', '#262c38'], sky: ['#0f1530', '#1f2a52'], lamp: '#9fc4ff' },
  grey: { w: ['#4a4f5a', '#5a5f68', '#62666e'], f: ['#5b5a5a', '#3b3a3a'], sky: ['#3a4256', '#565e70'], lamp: '#d8dde6' },
  day: { w: ['#e9dcc0', '#e3cfae', '#d8c09c'], f: ['#b98d62', '#8e6744'], sky: ['#8fc6ee', '#cfe8f7'], lamp: '#fff2c0' },
};

// ---------- sets (full frame, far layer blurred). o.dx = parallax shift ----------
export function home(o = {}) {
  const m = MOOD[o.mood || 'evening'];
  let s = `<defs>${vg('v94hw', ...m.w)}${vg('v94hf', ...m.f)}${vg('v94sofa', '#3f6f8f', '#2d5470')}</defs>`;
  s += `<rect x="-80" y="-80" width="1240" height="2080" fill="url(#v94hw)"/>`;
  s += cityWindow(600, 300, 380, 520, m.sky, { moon: true, id: 'v94hsky', lit: o.mood === 'grey' ? '#b8b8a0' : '#ffd36b' });
  s += `<path d="M570 270 C600 420 560 640 590 860 L640 860 C620 640 650 420 630 270 Z" fill="#b5566a"/>`;
  s += shelf(70, 330, 330, 560, { seed: 3 });
  s += frameP(440, 360, 110, 140, '#8fb3a8') + frameP(450, 540, 90, 90, '#d98f6b');
  s += clockFace(495, 720, 46, o.clock ? o.clock[0] : 20, o.clock ? o.clock[1] : 10);
  s += `<rect x="-80" y="1130" width="1240" height="900" fill="url(#v94hf)"/><ellipse cx="540" cy="1420" rx="540" ry="160" fill="#8c3f45" opacity=".55"/>`;
  s += `<rect x="80" y="880" width="920" height="200" rx="40" fill="url(#v94sofa)"/><rect x="60" y="960" width="960" height="230" rx="36" fill="#2d5470"/><rect x="130" y="930" width="160" height="110" rx="22" fill="#e6b55c"/><rect x="800" y="935" width="150" height="105" rx="22" fill="#c25b4e"/>`;
  s += plantPot(30, 1060, 1.4);
  let fg = `<rect x="980" y="380" width="10" height="760" fill="#2a2420"/><path d="M930 360 L1040 360 L1010 300 L960 300 Z" fill="#f1d7a3"/>`;
  return blurG(`<g transform="translate(${f1(o.dx || 0)} 0)">${s}${fg}</g>`) + light(985, 560, 380, 460, m.lamp, o.lampA === undefined ? .42 : o.lampA);
}

// desk corner at home (Monday/Tuesday evening): far wall with shelf, window, pinboard, wall clock
export function study(o = {}) {
  const m = MOOD[o.mood || 'evening'];
  let s = `<defs>${vg('v94sw', ...m.w)}${vg('v94sf', ...m.f)}</defs><rect x="-80" y="-80" width="1240" height="2080" fill="url(#v94sw)"/>`;
  s += cityWindow(80, 320, 360, 480, m.sky, { moon: o.mood !== 'day', id: 'v94ssky' });
  s += `<path d="M50 290 C80 430 40 640 70 840 L115 840 C100 640 130 430 110 290 Z" fill="#7a6aa8"/><path d="M410 290 C440 430 400 640 430 840 L475 840 C460 640 490 430 470 290 Z" fill="#7a6aa8"/>`;
  // pinboard with notes
  s += `<rect x="560" y="360" width="300" height="220" fill="#b98a5a" stroke="#8a6440" stroke-width="12"/>` + [[590, 390, '#ffe27a'], [690, 400, '#9fd6c2'], [780, 385, '#f5a3a3'], [610, 480, '#a9c6e8'], [720, 490, '#ffe27a']].map(([x, y, c], i) => `<rect x="${x}" y="${y}" width="70" height="66" fill="${c}" transform="rotate(${(i % 2 ? 5 : -4)} ${x + 35} ${y + 33})"/>`).join('');
  s += clockFace(950, 300, 52, o.clock ? o.clock[0] : 20, o.clock ? o.clock[1] : 15);
  s += shelf(560, 640, 440, 360, { rows: 2, seed: 7 });
  s += `<rect x="-80" y="1150" width="1240" height="900" fill="url(#v94sf)"/>`;
  s += plantPot(1010, 1080, 1.3, '#5c9a68');
  return blurG(`<g transform="translate(${f1(o.dx || 0)} 0)">${s}</g>`);
}

export function street(o = {}) {
  let s = `<defs>${vg('v94st', '#9ec9e8', '#e8d9c4')}</defs><rect x="-80" y="-80" width="1240" height="1400" fill="url(#v94st)"/>`;
  const B = [[-60, 260, 330, '#c9a587'], [270, 180, 300, '#b88f7a'], [570, 300, 260, '#d3bc98'], [830, 220, 330, '#a98d80']];
  B.forEach(([x, y, w, c], i) => {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${1200 - y}" fill="${c}"/><rect x="${x}" y="${y}" width="${w}" height="18" fill="#00000022"/>`;
    for (let r = 0; r < 4; r++) for (let k = 0; k < 3; k++) {
      const wx = x + 30 + k * (w - 60) / 3, wy = y + 50 + r * 150;
      if (wy > 900) continue;
      s += `<rect x="${f1(wx)}" y="${wy}" width="${f1((w - 60) / 3 - 26)}" height="96" fill="${hash(i * 20 + r * 3 + k) > .7 ? '#ffe7a6' : '#cfe0ea'}" stroke="#f4efe6" stroke-width="7"/>`;
    }
  });
  s += `<path d="M 290 920 h 260 l -20 60 h -220 z" fill="#c25b4e"/><path d="M 290 980 h 260" stroke="#fff" stroke-width="6" stroke-dasharray="26 26"/><rect x="330" y="985" width="180" height="215" fill="#5a4636"/><rect x="345" y="1000" width="150" height="120" fill="#e8d4a0"/>`;
  s += `<rect x="850" y="960" width="110" height="240" fill="#6b4a3a"/><circle cx="940" cy="1080" r="7" fill="#e8c56a"/>`;
  s += `<rect x="-80" y="1200" width="1240" height="140" fill="#b4b0a8"/><rect x="-80" y="1200" width="1240" height="14" fill="#8e8a84"/><rect x="-80" y="1340" width="1240" height="700" fill="#6c6a68"/>`;
  s += `<rect x="150" y="760" width="14" height="450" fill="#3a3a40"/><path d="M 120 760 h 74 l -12 -44 h -50 z" fill="#3a3a40"/><circle cx="157" cy="770" r="16" fill="#fff4c8"/>`;
  s += `<rect x="700" y="880" width="26" height="330" fill="#6b4a2e"/><circle cx="712" cy="820" r="120" fill="#5f9a5a"/><circle cx="640" cy="880" r="80" fill="#6fae66"/><circle cx="790" cy="870" r="86" fill="#558f52"/>`;
  s += `<rect x="20" y="1120" width="200" height="22" rx="8" fill="#7b5a3a"/><rect x="30" y="1142" width="12" height="60" fill="#3a3a40"/><rect x="198" y="1142" width="12" height="60" fill="#3a3a40"/><rect x="20" y="1080" width="200" height="16" rx="6" fill="#7b5a3a"/>`;
  s += `<g fill="none" stroke="#2f3a4a" stroke-width="9"><circle cx="560" cy="1160" r="40"/><circle cx="680" cy="1160" r="40"/><path d="M 560 1160 L 600 1100 L 660 1100 L 680 1160 M 600 1100 L 620 1160 L 660 1100"/></g>`;
  s += `<rect x="980" y="1080" width="70" height="120" rx="8" fill="#3f6b52"/><rect x="1000" y="760" width="10" height="440" fill="#9aa0a8"/><circle cx="1005" cy="760" r="40" fill="#2f6fd6" stroke="#fff" stroke-width="7"/>`;
  return blurG(`<g transform="translate(${f1(o.dx || 0)} 0)">${s}</g>`) + light(o.sunX || 900, 200, 420, 360, '#fff2c8', .35);
}

export function cafe(o = {}) {
  let s = `<defs>${vg('v94cw', '#7a4e36', '#9a6648', '#a8714f')}${vg('v94cf', '#6e4a35', '#4a3124')}</defs><rect x="-80" y="-80" width="1240" height="2080" fill="url(#v94cw)"/>`;
  // menu board
  s += `<rect x="90" y="300" width="420" height="300" rx="10" fill="#2f3330" stroke="#5a3a28" stroke-width="14"/>` + [0, 1, 2, 3].map(i => `<rect x="130" y="${350 + i * 58}" width="${200 - i * 18}" height="16" rx="8" fill="#d9d2c2"/><rect x="400" y="${350 + i * 58}" width="70" height="16" rx="8" fill="#e8c56a"/>`).join('');
  // cup shelf
  s += `<rect x="590" y="420" width="420" height="16" fill="#4a2f22"/><rect x="590" y="560" width="420" height="16" fill="#4a2f22"/>` + [0, 1, 2, 3, 4, 5].map(i => `<path d="M ${610 + i * 66} 380 h 46 l -6 40 h -34 z" fill="${['#f2efe8', '#e8b85c', '#c25b4e'][i % 3]}"/><path d="M ${614 + i * 66} 520 h 40 l -4 40 h -32 z" fill="${['#9fd6c2', '#f2efe8', '#e8b85c'][i % 3]}"/>`).join('');
  // window
  s += cityWindow(620, 640, 360, 300, ['#f0b77a', '#f6d7a8'], { id: 'v94csky', bld: '#8a6a5a', lit: 'none', tree: true });
  // counter + espresso machine + pastry display
  s += `<rect x="-80" y="960" width="1240" height="40" fill="#3a2418"/><rect x="-80" y="1000" width="1240" height="230" fill="#5a3a28"/><g fill="#4a2f22">${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${-40 + i * 200}" y="1030" width="160" height="170" rx="6"/>`).join('')}</g>`;
  s += `<rect x="130" y="800" width="240" height="160" rx="14" fill="#b8bcc4"/><rect x="150" y="820" width="200" height="40" rx="8" fill="#8a8e96"/><rect x="190" y="880" width="20" height="40" fill="#3a3a40"/><rect x="290" y="880" width="20" height="40" fill="#3a3a40"/><circle cx="250" cy="845" r="14" fill="#d9493f"/>`;
  s += `<rect x="420" y="860" width="170" height="100" rx="8" fill="#f2e6cc" opacity=".85"/><g fill="#c98a4a"><ellipse cx="460" cy="925" rx="26" ry="16"/><ellipse cx="520" cy="925" rx="26" ry="16"/><ellipse cx="490" cy="895" rx="24" ry="14"/></g>`;
  s += `<rect x="-80" y="1230" width="1240" height="800" fill="url(#v94cf)"/>`;
  s += plantPot(1020, 880, 1.2, '#5c9a68', '#e0d4c0') + plantPot(40, 900, 1.1, '#4f8a5b', '#c25b4e');
  // pendant lamps (sharp-ish, in front)
  let lamps = '';
  [240, 540, 840].forEach((x, i) => { lamps += `<line x1="${x}" y1="-40" x2="${x}" y2="${200 + (i % 2) * 40}" stroke="#2a1d16" stroke-width="5"/><path d="M ${x - 60} ${250 + (i % 2) * 40} h 120 l -26 -56 h -68 z" fill="#2f2a24"/><ellipse cx="${x}" cy="${252 + (i % 2) * 40}" rx="40" ry="10" fill="#ffe7a6"/>`; });
  return blurG(`<g transform="translate(${f1(o.dx || 0)} 0)">${s}${lamps}</g>`) + light(240, 420, 260, 300, '#ffd98a', .3) + light(540, 460, 280, 320, '#ffd98a', .34) + light(840, 420, 260, 300, '#ffd98a', .3);
}

export function bedroom(o = {}) {
  let s = `<defs>${vg('v94bw', '#141c34', '#1d2846', '#24304e')}${vg('v94bf', '#1c2236', '#11152a')}</defs><rect x="-80" y="-80" width="1240" height="2080" fill="url(#v94bw)"/>`;
  s += cityWindow(560, 260, 400, 520, ['#070b1e', '#16204a'], { moon: true, stars: true, id: 'v94bsky', bld: '#0a0e22', lit: '#c9a85a' });
  s += `<path d="M530 230 C560 400 520 640 550 860 L600 860 C580 640 610 400 590 230 Z" fill="#3a3f6a"/><path d="M930 230 C960 400 920 640 950 860 L1000 860 C980 640 1010 400 990 230 Z" fill="#3a3f6a"/>`;
  s += `<rect x="90" y="300" width="230" height="300" fill="#2c3550"/><rect x="104" y="314" width="202" height="272" fill="#3d4a70"/><circle cx="205" cy="420" r="60" fill="#55628a"/><path d="M 120 560 L 200 470 L 260 530 L 290 500 L 300 560 Z" fill="#4a577e"/>`;
  s += `<rect x="90" y="680" width="330" height="14" fill="#2a2030"/>` + books(100, 680, 220, 41, 80).replace(/fill="#/g, 'opacity=".55" fill="#');
  s += `<rect x="370" y="380" width="120" height="160" rx="8" fill="#2a3048" stroke="#3d4566" stroke-width="8"/>`;
  s += `<rect x="-80" y="1100" width="1240" height="940" fill="url(#v94bf)"/><ellipse cx="560" cy="1450" rx="520" ry="150" fill="#2a2f50" opacity=".7"/>`;
  s += `<rect x="40" y="900" width="190" height="20" rx="6" fill="#3a2f3a"/><rect x="60" y="920" width="14" height="190" fill="#2a2030"/><rect x="196" y="920" width="14" height="190" fill="#2a2030"/><rect x="60" y="720" width="20" height="200" fill="#2a2030"/><path d="M 90 790 q 60 -40 120 10 l -10 120 h -100 z" fill="#5a4a6a"/>`;
  s += plantPot(1010, 1000, 1.2, '#2f4a46', '#4a3a40');
  const moonCol = o.dawn ? '#ffd98a' : '#9fb8ff';
  return blurG(`<g transform="translate(${f1(o.dx || 0)} 0)">${s}</g>`) + light(760, 520, 420, 400, moonCol, o.dawn ? .55 * o.dawn + .2 : .22);
}

export function kitchen(o = {}) {
  let s = `<defs>${vg('v94kw', '#f3e6c6', '#ecd8b2', '#e2c99e')}${vg('v94kf', '#c49a6c', '#a07a52')}</defs><rect x="-80" y="-80" width="1240" height="2080" fill="url(#v94kw)"/>`;
  s += `<g fill="#9fc0a8" stroke="#7fa088" stroke-width="8"><rect x="-40" y="200" width="250" height="300" rx="8"/><rect x="230" y="200" width="250" height="300" rx="8"/></g><g fill="#e8d4a0"><circle cx="180" cy="350" r="9"/><circle cx="260" cy="350" r="9"/></g>`;
  s += cityWindow(560, 240, 380, 460, ['#8fc6ee', '#d9eefa'], { sun: true, id: 'v94ksky', bld: '#a9bfcf', lit: 'none', tree: true, frame: '#fbf6ea' });
  s += `<rect x="540" y="700" width="420" height="24" fill="#fbf6ea"/>` + plantPot(610, 640, .6, '#4f8a5b', '#e0d4c0') + plantPot(700, 646, .5, '#6fae66', '#c25b4e') + plantPot(880, 642, .55, '#5c9a68', '#e8b85c');
  s += `<rect x="-40" y="560" width="480" height="14" fill="#b08a5c"/>` + [0, 1, 2, 3, 4].map(i => `<rect x="${-20 + i * 90}" y="${490 + (i % 2) * 10}" width="60" height="${70 - (i % 2) * 10}" rx="10" fill="${['#e8b85c', '#f2efe8', '#c25b4e', '#9fd6c2', '#e8b85c'][i]}"/><rect x="${-20 + i * 90}" y="${482 + (i % 2) * 10}" width="60" height="14" rx="4" fill="#8a6440"/>`).join('');
  s += clockFace(470, 160, 50, o.clock ? o.clock[0] : 9, o.clock ? o.clock[1] : 5);
  s += `<g stroke="#5a4a3a" stroke-width="6"><line x1="1000" y1="760" x2="1000" y2="800"/><line x1="1050" y1="760" x2="1050" y2="800"/></g><circle cx="1000" cy="840" r="42" fill="#3a3a40"/><circle cx="1050" cy="850" r="34" fill="#c25b4e"/>`;
  s += `<rect x="-80" y="980" width="1240" height="30" fill="#efe6d6"/><rect x="-80" y="1010" width="1240" height="220" fill="#b8c9b8"/><g stroke="#a0b4a0" stroke-width="4">${[0, 1, 2, 3, 4, 5, 6].map(i => `<line x1="${-40 + i * 180}" y1="1010" x2="${-40 + i * 180}" y2="1230"/>`).join('')}</g>`;
  s += `<path d="M 300 980 q 0 -70 60 -70 q 60 0 60 70 z" fill="#d9493f"/><path d="M 410 940 q 40 0 40 -30" stroke="#d9493f" stroke-width="12" fill="none"/>`;
  s += `<rect x="-80" y="1230" width="1240" height="800" fill="url(#v94kf)"/>`;
  return blurG(`<g transform="translate(${f1(o.dx || 0)} 0)">${s}</g>`) + light(760, 420, 480, 520, '#fff6cf', .5);
}

// bright office in Florida: palm trees outside, binders, diplomas, filing cabinet, whiteboard
export function office(o = {}) {
  let s = `<defs>${vg('v94ow', '#e4ecef', '#d6e2e6', '#c9d6da')}${vg('v94of', '#9aa6ae', '#76828a')}</defs><rect x="-80" y="-80" width="1240" height="2080" fill="url(#v94ow)"/>`;
  s += `<defs>${vg('v94osky', '#5fb4ee', '#bfe6fb')}</defs><rect x="560" y="260" width="440" height="560" rx="8" fill="url(#v94osky)"/><circle cx="900" cy="340" r="40" fill="#fff6c8"/>`;
  [[640, 520], [860, 560]].forEach(([x, y]) => { s += `<path d="M ${x} 820 C ${x + 6} ${y + 120} ${x - 6} ${y + 60} ${x + 4} ${y}" stroke="#8a6440" stroke-width="16" fill="none"/>` + [0, 1, 2, 3, 4].map(i => `<ellipse cx="${x + Math.cos(i * 1.26) * 60}" cy="${y + Math.sin(i * 1.26) * 26}" rx="70" ry="16" fill="#3f9a5a" transform="rotate(${i * 72} ${x} ${y})"/>`).join(''); });
  s += `<rect x="560" y="740" width="440" height="80" fill="#e8d9a8"/><rect x="560" y="260" width="440" height="560" rx="8" fill="none" stroke="#fbfbf6" stroke-width="16"/><line x1="780" y1="260" x2="780" y2="820" stroke="#fbfbf6" stroke-width="10"/>`;
  s += `<rect x="70" y="300" width="400" height="16" fill="#8a7a66"/><rect x="70" y="470" width="400" height="16" fill="#8a7a66"/>` + [0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${90 + i * 52}" y="${190 + (i % 2) * 8}" width="40" height="${110 - (i % 2) * 8}" rx="4" fill="${['#3f7fd8', '#d9493f', '#e8b85c', '#3c9a5f'][i % 4]}"/><rect x="${90 + i * 52}" y="${360 + (i % 3) * 6}" width="40" height="${110 - (i % 3) * 6}" rx="4" fill="${['#e8b85c', '#3f7fd8', '#7aa27a', '#c25b4e'][i % 4]}"/>`).join('');
  s += frameP(110, 560, 150, 110, '#f4efe4', '#8a6440') + frameP(290, 560, 150, 110, '#f4efe4', '#8a6440') + `<circle cx="185" cy="640" r="14" fill="#d9493f"/><circle cx="365" cy="640" r="14" fill="#d9493f"/>`;
  s += clockFace(480, 180, 48, 10, 30);
  s += `<rect x="60" y="760" width="250" height="400" rx="6" fill="#8e9aa4"/><g fill="#76828a"><rect x="80" y="790" width="210" height="100" rx="4"/><rect x="80" y="910" width="210" height="100" rx="4"/><rect x="80" y="1030" width="210" height="100" rx="4"/></g><g fill="#c9d0d6"><rect x="155" y="830" width="60" height="14" rx="6"/><rect x="155" y="950" width="60" height="14" rx="6"/><rect x="155" y="1070" width="60" height="14" rx="6"/></g>`;
  s += `<rect x="-80" y="1160" width="1240" height="880" fill="url(#v94of)"/>` + plantPot(1020, 1050, 1.3, '#3f8a52', '#e0d4c0');
  return blurG(`<g transform="translate(${f1(o.dx || 0)} 0)">${s}</g>`) + light(800, 450, 420, 460, '#fff6d0', .45);
}

// fridge (sharp, drawn by the shot) with magnets and a weekly plan
export function fridge(x, y, s = 1, o = {}) {
  let g = `<rect x="-170" y="0" width="340" height="900" rx="26" fill="#eef1f2" stroke="${INK}" stroke-width="5"/><line x1="-170" y1="300" x2="170" y2="300" stroke="${INK}" stroke-width="4"/><rect x="128" y="120" width="16" height="120" rx="8" fill="#b9c0c6"/><rect x="128" y="360" width="16" height="160" rx="8" fill="#b9c0c6"/>`;
  g += `<circle cx="-120" cy="60" r="14" fill="${K.red}"/><circle cx="90" cy="70" r="12" fill="${K.yellow}"/><rect x="-140" y="120" width="90" height="70" fill="#ffe27a" transform="rotate(-6 -95 155)"/>`;
  if (o.plan !== false) {
    const p = o.plan === undefined ? 1 : o.plan;
    g += `<g opacity="${op(p)}"><rect x="-130" y="340" width="230" height="300" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="-15" cy="344" r="10" fill="${K.blue}"/>` + T(-15, 384, 'WOCHE', 28, { fill: INK });
    ['Mo', 'Di', 'Mi', 'Do', 'Fr'].forEach((d, i) => { const yy = 420 + i * 44; g += T(-110, yy + 14, d, 22, { fill: INK, anchor: 'start' }) + `<rect x="-70" y="${yy - 4}" width="${120 + (i * 37) % 40}" height="20" rx="6" fill="${['#9fd6c2', '#ffe27a', '#f5a3a3', '#a9c6e8', '#9fd6c2'][i]}"/>`; });
    g += `</g>`;
  }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}

// ---------- face pieces (head-local coords, r = 100) ----------
export function blinking(t, seed = 1) {
  const per = 3.2 + hash(seed) * 1.8, ph = hash(seed + 7) * per;
  return ((t + ph) % per + per) % per < .13;
}
function eyesSvg(e, look) {
  const lx = look ? look[0] : 0, ly = look ? look[1] : 0, ex = 33, ey = 4;
  if (e === 'happy') return `<path d="M ${-ex - 20} ${ey + 8} Q ${-ex} ${ey - 16} ${-ex + 20} ${ey + 8} M ${ex - 20} ${ey + 8} Q ${ex} ${ey - 16} ${ex + 20} ${ey + 8}" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  if (e === 'closed') return `<path d="M ${-ex - 19} ${ey} Q ${-ex} ${ey + 14} ${-ex + 19} ${ey} M ${ex - 19} ${ey} Q ${ex} ${ey + 14} ${ex + 19} ${ey}" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  if (e === 'tired') return `<ellipse cx="${-ex}" cy="${ey + 4}" rx="19" ry="12" fill="#fff"/><ellipse cx="${ex}" cy="${ey + 4}" rx="19" ry="12" fill="#fff"/><circle cx="${f1(-ex + lx * .7)}" cy="${f1(ey + 6 + ly * .4)}" r="8" fill="${INK}"/><circle cx="${f1(ex + lx * .7)}" cy="${f1(ey + 6 + ly * .4)}" r="8" fill="${INK}"/><path d="M ${-ex - 21} ${ey - 4} H ${-ex + 21} M ${ex - 21} ${ey - 4} H ${ex + 21}" stroke="${INK}" stroke-width="6"/>`;
  const rx = e === 'wide' ? 22 : 19, ry = e === 'wide' ? 26 : 22, pr = e === 'wide' ? 8 : 9;
  let s = `<ellipse cx="${-ex}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fff"/><ellipse cx="${ex}" cy="${ey}" rx="${rx}" ry="${ry}" fill="#fff"/>`;
  s += `<circle cx="${f1(-ex + lx)}" cy="${f1(ey + 2 + ly)}" r="${pr}" fill="${INK}"/><circle cx="${f1(ex + lx)}" cy="${f1(ey + 2 + ly)}" r="${pr}" fill="${INK}"/>`;
  s += `<circle cx="${f1(-ex + lx + 3)}" cy="${f1(ey - 2 + ly)}" r="2.6" fill="#fff"/><circle cx="${f1(ex + lx + 3)}" cy="${f1(ey - 2 + ly)}" r="2.6" fill="#fff"/>`;
  return s;
}
function browsSvg(b) {
  const p = { worried: 'M -56 -34 L -18 -42 M 18 -42 L 56 -34', up: 'M -54 -46 L -16 -50 M 16 -50 L 54 -46', mean: 'M -54 -44 L -16 -32 M 16 -32 L 54 -44', calm: 'M -52 -38 L -16 -40 M 16 -40 L 52 -38' }[b];
  return p ? `<path d="${p}" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none"/>` : '';
}
function mouthSvg(m) {
  switch (m) {
    case 'smile': return `<path d="M -22 56 Q 0 72 22 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'grin': return `<path d="M -28 50 Q 0 52 28 50 Q 22 78 0 78 Q -22 78 -28 50 Z" fill="#fff"/>`;
    case 'laugh': return `<path d="M -32 46 Q 0 48 32 46 Q 26 88 0 88 Q -26 88 -32 46 Z" fill="#fff"/>`;
    case 'o': return `<ellipse cx="0" cy="62" rx="11" ry="14" fill="#fff"/>`;
    case 'sad': return `<path d="M -22 68 Q 0 54 22 68" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'strain': return `<path d="M -26 62 L -13 56 L 0 62 L 13 56 L 26 62" stroke="#fff" stroke-width="6" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
    case 'relief': return `<ellipse cx="0" cy="62" rx="16" ry="9" fill="#fff"/>`;
    default: return `<path d="M -20 62 Q 0 58 20 62" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  }
}

// ---------- stones ----------
export function stoneW(label, size = 26) { return Math.max(140, textW(label, size) + 56); }
export function stone(x, y, s, label, o = {}) {
  const size = o.size || 26, w = stoneW(label, size), hw = w / 2, h = 46;
  const d = `M ${-hw} -4 C ${-hw - 2} ${-h * .8} ${-hw * .55} ${-h - 4} 0 ${-h} C ${hw * .6} ${-h - 2} ${hw + 2} ${-h * .7} ${hw} 0 C ${hw + 2} ${h * .6} ${hw * .55} ${h} 2 ${h} C ${-hw * .6} ${h + 2} ${-hw} ${h * .6} ${-hw} -4 Z`;
  let g = `<path d="${d}" fill="${K.stone}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  g += `<path d="M ${-hw + 14} ${h * .35} C ${-hw * .4} ${h * .9} ${hw * .5} ${h * .9} ${hw - 10} ${h * .3}" fill="none" stroke="${K.stoneSh}" stroke-width="10" stroke-linecap="round"/>`;
  g += `<ellipse cx="${f1(-hw * .45)}" cy="${-h * .55}" rx="${f1(hw * .28)}" ry="9" fill="${K.stoneHi}"/>`;
  g += `<circle cx="${f1(hw * .6)}" cy="${-h * .45}" r="4" fill="${K.stoneSh}"/><circle cx="${f1(-hw * .7)}" cy="${h * .3}" r="3" fill="${K.stoneSh}"/>`;
  if (label) g += T(0, size * .36 + 2, label, size, { fill: K.stoneTxt, w: 900 });
  const sq = o.squash || 0;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * (1 + sq * .18) * 1000) / 1000} ${f1(s * (1 - sq * .2) * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}
// falling stone: from (x,yTop) to (x,yLand), landing at tLand (duration dur). returns {svg, landed}
export function dropStone(t, tLand, x, yTop, yLand, s, label, o = {}) {
  const dur = o.dur || .45, p = prog(t, tLand - dur, tLand);
  if (t < tLand - dur) return '';
  const y = lerp(yTop, yLand, ein(p));
  const sq = t >= tLand ? Math.max(0, 1 - (t - tLand) / .18) * Math.sin(Math.min(1, (t - tLand) / .18) * Math.PI + Math.PI / 2) : 0;
  let s2 = '';
  if (p < 1) for (let k = 1; k <= 3; k++) s2 += `<line x1="${f1(x - 40 * s + k * 20 * s)}" y1="${f1(y - 70 * s - k * 30 * s)}" x2="${f1(x - 40 * s + k * 20 * s)}" y2="${f1(y - 70 * s - k * 30 * s - 50 * s)}" stroke="#fff" stroke-width="${f1(5 * s)}" stroke-linecap="round" opacity="${op(.5 * p)}"/>`;
  return s2 + stone(x, y, s, label, { rot: lerp(o.rot0 === undefined ? -18 : o.rot0, o.rot || 0, eout(p)), squash: t >= tLand ? Math.abs(sq) : 0 });
}
// impact burst lines around a point
export function impact(t, t0, x, y, r = 120, col = '#fff') {
  const p = prog(t, t0, t0 + .35); if (p <= 0 || p >= 1) return '';
  let s = '';
  for (let i = 0; i < 7; i++) { const a = Math.PI + i * Math.PI / 6, r0 = r * (.55 + p * .5), r1 = r * (.8 + p * .7); s += `<line x1="${f1(x + Math.cos(a) * r0)}" y1="${f1(y + Math.sin(a) * r0 * .6)}" x2="${f1(x + Math.cos(a) * r1)}" y2="${f1(y + Math.sin(a) * r1 * .6)}" stroke="${col}" stroke-width="7" stroke-linecap="round" opacity="${op(1 - p)}"/>`; }
  return s;
}

// ---------- backpack ----------
// local coords of the person (feet 0,0; head r 100). load 0..1.4 makes it bigger.
function packDims(load) { const w = 116 + load * 20, top = -392 - load * 92; return { w, top, bot: -118 + load * 10 }; }
export function packTop(load) { return packDims(load).top; }
export function packTopBack(load) { return -352 - load * 28; }
// back view: pack on the back, open at the top; stones = [{label, dx, dy, rot}]
function packBack(load, stones, open) {
  const { w, bot } = packDims(load), top = packTopBack(load);
  let s = `<path d="M ${-w * .62} ${top + 40} C ${-w * .62} ${top - 20} ${w * .62} ${top - 20} ${w * .62} ${top + 40}" fill="none" stroke="${INK}" stroke-width="22"/><path d="M ${-w * .62} ${top + 40} C ${-w * .62} ${top - 20} ${w * .62} ${top - 20} ${w * .62} ${top + 40}" fill="none" stroke="${K.packSh}" stroke-width="13"/>`;
  s += `<path d="M ${-w} ${top + 50} C ${-w} ${top + 10} ${w} ${top + 10} ${w} ${top + 50} L ${w + 6} ${bot - 30} C ${w + 6} ${bot + 10} ${-w - 6} ${bot + 10} ${-w - 6} ${bot - 30} Z" fill="${K.packSh}" stroke="${INK}" stroke-width="5"/>`;
  if (open) s += `<ellipse cx="0" cy="${top + 44}" rx="${f1(w * .86)}" ry="26" fill="#3a2414"/>`;
  (stones || []).forEach(st => { s += stone(st.dx || 0, top + 34 + (st.dy || 0), st.s || .62, st.label, { rot: st.rot || 0, size: 26 }); });
  // front panel over the stones' lower halves
  s += `<path d="M ${-w + 2} ${top + 56} C ${-w * .4} ${top + 74} ${w * .4} ${top + 74} ${w - 2} ${top + 56} L ${w + 6} ${bot - 30} C ${w + 6} ${bot + 10} ${-w - 6} ${bot + 10} ${-w - 6} ${bot - 30} Z" fill="${K.pack}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<path d="M ${-w + 2} ${top + 56} C ${-w * .4} ${top + 74} ${w * .4} ${top + 74} ${w - 2} ${top + 56}" fill="none" stroke="${K.packHi}" stroke-width="7"/>`;
  const py = (top + 70 + bot) / 2 + 30;
  s += `<rect x="${f1(-w * .62)}" y="${f1(py - 10)}" width="${f1(w * 1.24)}" height="${f1((bot - py) * .9)}" rx="22" fill="${K.packSh}" stroke="${INK}" stroke-width="4"/><path d="M ${f1(-w * .62 + 10)} ${f1(py + 14)} H ${f1(w * .62 - 10)}" stroke="${K.packHi}" stroke-width="4" stroke-dasharray="10 8"/>`;
  s += `<rect x="${f1(-w - 14)}" y="${f1(top + 90)}" width="16" height="${f1((bot - top) * .55)}" rx="7" fill="${K.packSh}" stroke="${INK}" stroke-width="4"/><rect x="${f1(w - 2)}" y="${f1(top + 90)}" width="16" height="${f1((bot - top) * .55)}" rx="7" fill="${K.packSh}" stroke="${INK}" stroke-width="4"/>`;
  return s;
}
// front view: pack bulging behind the body, stones peeking over its top edge
function packFrontBehind(load, n, extra) {
  const { w, top, bot } = packDims(load);
  let s = extra || '';
  for (let i = 0; i < n; i++) { const dx = [-0.45, .4, -.05, .62, -.7, .2][i % 6] * w, dy = -10 - (i > 2 ? 30 : 0); s += stone(dx, top + 36 + dy, .5, '', { rot: (i % 2 ? 14 : -12) }); }
  s += `<path d="M ${-w - 14} ${top + 50} C ${-w - 14} ${top + 6} ${w + 14} ${top + 6} ${w + 14} ${top + 50} L ${w + 26} ${bot} C ${w + 26} ${bot + 30} ${-w - 26} ${bot + 30} ${-w - 26} ${bot} Z" fill="${K.packSh}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<path d="M ${-w - 6} ${top + 40} C ${-w * .3} ${top + 22} ${w * .3} ${top + 22} ${w + 6} ${top + 40}" fill="none" stroke="${K.packHi}" stroke-width="6"/>`;
  return s;
}
function straps() {
  return `<path d="M -62 -346 C -70 -300 -76 -250 -70 -196" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/><path d="M 62 -346 C 70 -300 76 -250 70 -196" fill="none" stroke="${INK}" stroke-width="24" stroke-linecap="round"/>` +
    `<path d="M -62 -346 C -70 -300 -76 -250 -70 -196" fill="none" stroke="${K.pack}" stroke-width="15" stroke-linecap="round"/><path d="M 62 -346 C 70 -300 76 -250 70 -196" fill="none" stroke="${K.pack}" stroke-width="15" stroke-linecap="round"/>` +
    `<rect x="-82" y="-246" width="22" height="14" rx="3" fill="#c9b07a" stroke="${INK}" stroke-width="3"/><rect x="60" y="-246" width="22" height="14" rx="3" fill="#c9b07a" stroke="${INK}" stroke-width="3"/>`;
}

// ---------- people ----------
export const WHO = {
  du: { top: K.du, sh: K.duSh, str: K.duStr, acc: 'none', hood: true },
  cap: { top: K.cap, sh: K.capSh, str: null, acc: 'cap' },
  bun: { top: K.bun, sh: K.bunSh, str: null, acc: 'bun' },
  gl: { top: '#e9e6df', sh: '#cfcac0', str: null, acc: 'glasses', coat: true },   // psychologist 1: glasses, white coat
  curl: { top: '#e9e6df', sh: '#cfcac0', str: null, acc: 'curly', coat: true },   // psychologist 2: curly hair, white coat
  zg: { top: '#5a5f78', sh: '#474b60', str: null, acc: 'bob', collar: true },      // Bljuma Zeigarnik (portrait, 1920s)
};
const BODY = 'M -95 -225 C -95 -315 -58 -352 0 -352 C 58 -352 95 -315 95 -225 L 106 -98 C 106 -74 -106 -74 -106 -98 Z';
const arm = (side, h, sleeve, el) => {
  const sx = side * 76, sy = -300;
  const mx = el ? el[0] : (sx + h[0]) / 2 + side * 34, my = el ? el[1] : (sy + h[1]) / 2 + 16;
  const d = `M ${sx} ${sy} Q ${f1(mx)} ${f1(my)} ${f1(h[0])} ${f1(h[1])}`;
  return `<path d="${d}" stroke="${INK}" stroke-width="40" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${sleeve}" stroke-width="30" fill="none" stroke-linecap="round"/><circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="15" fill="${INK}"/>`;
};
// person(who, x, y, s, o): feet at (x,y), head radius 100*s.
// o: t, seed, back (seen from behind), load (backpack size; undefined = no pack), stones (back view: labels inside),
// nStones (front view: bumps over the pack), open, hunch 0..1, walk (phase), armL/armR [x,y] (+ elL/elR elbow),
// eyes 'n'|'wide'|'happy'|'closed'|'tired', look [x,y], brows, mouth, headTilt, tilt, rim (rim light colour), sweat 0..1,
// front (extra svg in local coords in front of the body), hold (extra svg drawn above arms), sit
export function person(who, x, y, s, o = {}) {
  const W = WHO[who], t = o.t || 0, hunch = o.hunch || 0;
  const bob = o.still ? 0 : Math.sin(t * 2.1 + (o.seed || 0)) * 3;
  const wk = o.walk !== undefined ? o.walk : null;
  const sw = wk === null ? 0 : Math.sin(wk * Math.PI * 2) * 26, l1 = wk === null ? 0 : Math.max(0, Math.sin(wk * Math.PI * 2)) * 12, l2 = wk === null ? 0 : Math.max(0, -Math.sin(wk * Math.PI * 2)) * 12;
  const kn = hunch * 22;
  let legs = '';
  if (!o.noLegs) legs = `<path d="M -26 -92 Q ${f1(-26 - kn + sw * .5)} -46 ${f1(-26 + sw)} ${f1(-8 - l1)}" stroke="${INK}" stroke-width="13" fill="none" stroke-linecap="round"/><path d="M 26 -92 Q ${f1(26 + kn - sw * .5)} -46 ${f1(26 - sw)} ${f1(-8 - l2)}" stroke="${INK}" stroke-width="13" fill="none" stroke-linecap="round"/>` +
    `<ellipse cx="${f1(-33 + sw)}" cy="${f1(-l1)}" rx="25" ry="10" fill="${INK}"/><ellipse cx="${f1(33 - sw)}" cy="${f1(-l2)}" rx="25" ry="10" fill="${INK}"/>`;
  const down = hunch * 26 + (wk === null ? 0 : Math.abs(Math.sin(wk * Math.PI * 2)) * 6);
  let body = `<path d="${BODY}" fill="${W.top}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  if (!o.back) {
    if (W.hood) body += `<path d="M -82 -318 C -62 -360 62 -360 82 -318 C 62 -298 -62 -298 -82 -318 Z" fill="${W.sh}" stroke="${INK}" stroke-width="5"/><path d="M -10 -304 L -20 -250 M 10 -304 L 20 -250" stroke="${W.str}" stroke-width="6" stroke-linecap="round"/><circle cx="-20" cy="-246" r="6" fill="${W.str}"/><circle cx="20" cy="-246" r="6" fill="${W.str}"/>` +
      `<path d="M -66 -168 C -40 -156 40 -156 66 -168 L 62 -128 C 38 -116 -38 -116 -62 -128 Z" fill="${W.sh}" stroke="${INK}" stroke-width="4"/>`;
    else if (W.coat) body += `<path d="M 0 -346 L 0 -86" stroke="${W.sh}" stroke-width="5"/><path d="M -30 -350 L 0 -290 L 30 -350" fill="#7fa8c9" stroke="${INK}" stroke-width="4"/><rect x="34" y="-250" width="40" height="34" rx="4" fill="none" stroke="${W.sh}" stroke-width="4"/><line x1="46" y1="-262" x2="46" y2="-236" stroke="${K.blue}" stroke-width="5"/>`;
    else if (W.collar) body += `<path d="M -34 -350 L 0 -312 L 34 -350 L 18 -356 L 0 -336 L -18 -356 Z" fill="#f2efe8" stroke="${INK}" stroke-width="4"/><g fill="#f2efe8"><circle cx="0" cy="-280" r="5"/><circle cx="0" cy="-240" r="5"/><circle cx="0" cy="-200" r="5"/></g>`;
    else body += `<path d="M -28 -340 Q 0 -318 28 -340" stroke="${W.sh}" stroke-width="8" fill="none" stroke-linecap="round"/><path d="M -100 -128 H 100" stroke="${W.sh}" stroke-width="7"/>`;
  } else body += `<path d="M -60 -320 C -30 -340 30 -340 60 -320" stroke="${W.sh}" stroke-width="7" fill="none"/>`;
  const hasPack = o.load !== undefined;
  let behind = '', over = '';
  if (hasPack && !o.back) { behind = packFrontBehind(o.load, o.nStones || 0, o.packIn); over = straps(); }
  if (hasPack && o.back) over = packBack(o.load, o.stones, o.open !== false);
  // arms
  let armsBack = '', armsFront = '';
  if (o.armL) armsFront += arm(-1, o.armL, W.top, o.elL); else if (!o.back || !hasPack) armsBack += `<circle cx="-112" cy="-150" r="15" fill="${INK}"/>`;
  if (o.armR) armsFront += arm(1, o.armR, W.top, o.elR); else if (!o.back || !hasPack) armsBack += `<circle cx="112" cy="-150" r="15" fill="${INK}"/>`;
  // head
  const hy = -440 + hunch * 34 + (o.headDy || 0);
  const e0 = o.eyes || 'n';
  const eyes = !o.noBlink && blinking(t, (o.seed || 0) + 3) && e0 !== 'happy' && e0 !== 'closed' ? 'closed' : e0;
  let head = '';
  if (W.acc === 'bun') head += `<circle cx="14" cy="-104" r="40" fill="${INK}"/>`;
  if (W.acc === 'curly') head += `<g fill="${INK}">${[[-80, -58], [-56, -88], [-20, -104], [20, -104], [56, -88], [80, -58]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="32"/>`).join('')}</g>`;
  if (W.acc === 'bob') head += `<path d="M -112 30 C -126 -80 -60 -122 0 -122 C 60 -122 126 -80 112 30 C 100 40 86 40 80 30 L -80 30 C -86 40 -100 40 -112 30 Z" fill="${INK}"/>`;
  head += `<circle cx="0" cy="0" r="100" fill="${INK}"/><ellipse cx="-38" cy="-50" rx="32" ry="16" fill="#fff" opacity=".15"/>`;
  if (o.rim) head += `<path d="M 66 -76 C 98 -44 104 22 78 64" fill="none" stroke="${o.rim}" stroke-width="7" stroke-linecap="round" opacity=".75"/>`;
  if (!o.back) {
    if (W.acc === 'glasses') head += `<g fill="none" stroke="#fff" stroke-width="6"><circle cx="-33" cy="4" r="27"/><circle cx="33" cy="4" r="27"/><line x1="-6" y1="2" x2="6" y2="2"/></g>`;
    head += eyesSvg(eyes, o.look) + browsSvg(o.brows) + mouthSvg(o.mouth);
    if (o.sweat > 0) head += `<path d="M 92 -40 q 14 22 0 32 q -14 -10 0 -32 Z" fill="#bfe3ff" stroke="${INK}" stroke-width="3" opacity="${op(o.sweat)}"/>`;
  }
  if (W.acc === 'cap') head += o.back ? `<path d="M -96 -20 C -92 -104 -40 -132 4 -130 C 64 -126 98 -84 96 -20 Z" fill="${K.capHat}" stroke="${INK}" stroke-width="5"/>` : `<path d="M -96 -26 C -92 -106 -40 -134 6 -132 C 66 -128 100 -86 98 -26 Z" fill="${K.capHat}" stroke="${INK}" stroke-width="5"/><path d="M 98 -26 C 132 -26 156 -18 166 -6 C 132 -2 92 -10 62 -16 Z" fill="${K.capHat}" stroke="${INK}" stroke-width="5"/>`;
  const headG = `<g transform="translate(0 ${f1(hy + bob * .5)}) rotate(${f1(o.headTilt || 0)})">${head}</g>`;
  const g = `${legs}<g transform="translate(0 ${f1(down + bob * .4)})">${behind}${armsBack}${body}${o.back ? headG + over : over + headG}${o.front || ''}${armsFront}${o.hold || ''}</g>`;
  const fx = o.flip ? -1 : 1;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s * fx * 1000) / 1000} ${f1(s * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}
// screen position of a local person point
export const P = (x, y, s, lx, ly) => [x + lx * s, y + ly * s];

// ---------- bubbles & labels ----------
export function thought(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 46, lh = size * 1.22;
  const w = Math.max(...L.map(l => textW(l, size))) + 76, h = L.length * lh + 44;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2;
  const ex = cl(tx, bx + 60, bx + w - 60), ey = ty > y ? by + h : by;
  const c1x = lerp(ex, tx, .4), c1y = lerp(ey, ty, .4), c2x = lerp(ex, tx, .78), c2y = lerp(ey, ty, .78);
  let s = `<circle cx="${f1(c2x)}" cy="${f1(c2y)}" r="10" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="${f1(c1x)}" cy="${f1(c1y)}" r="18" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 60))}" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
  L.forEach((l, i) => { s += T(x, by + 22 + size * .92 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
export function speech(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 44, lh = size * 1.2;
  const w = Math.max(...L.map(l => textW(l, size))) + 64, h = L.length * lh + 40;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2;
  const ax = cl(tx, bx + 44, bx + w - 44), base = ty > y ? by + h - 2 : by + 2;
  let s = `<path d="M ${f1(ax - 22)} ${f1(base)} L ${f1(tx)} ${f1(ty)} L ${f1(ax + 22)} ${f1(base)} Z" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(40, h / 2))}" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
  s += `<path d="M ${f1(ax - 18)} ${f1(base - (ty > y ? 4 : -4))} L ${f1(ax + 18)} ${f1(base - (ty > y ? 4 : -4))}" stroke="#fff" stroke-width="8"/>`;
  L.forEach((l, i) => { s += T(x, by + 20 + size * .9 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
export function dayCard(t, t0, word, o = {}) {
  const p = pop(t, t0, .45); if (p <= 0) return '';
  const y = o.y || 270, size = o.size || 110;
  const a = o.out ? fout(t, o.out, .3) : 1;
  return `<g transform="translate(540 ${y - size * .35}) scale(${f1(p * 1000) / 1000}) translate(-540 ${-(y - size * .35)})" opacity="${op(a)}">${T(540, y, word, size, { fill: K.yellow, stroke: INK, sw: 20 })}</g>`;
}
export function chip(x, y, txt, o = {}) {
  const size = o.size || 46, w = textW(txt, size) + 60, h = size + 36, p = o.p === undefined ? 1 : o.p;
  if (p <= 0) return '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(p * 1000) / 1000}) rotate(${f1(o.rot || 0)})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="${o.bg || K.yellow}" stroke="${INK}" stroke-width="5"/>${T(0, size * .36, txt, size, { fill: o.fill || INK })}</g>`;
}
export function bigText(x, y, txt, size, o = {}) {
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  return `<g transform="translate(${f1(x)} ${f1(y - size * .35)}) scale(${f1(p * 1000) / 1000}) translate(${f1(-x)} ${f1(-(y - size * .35))})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${T(x, y, txt, size, { fill: o.fill || '#fff', stroke: INK, sw: o.sw || 18 })}</g>`;
}

// ---------- props (sharp) ----------
export function laptop(x, y, s, o = {}) {
  const scr = o.screen || '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})"><path d="M -200 0 L 200 0 L 230 26 L -230 26 Z" fill="#b9bec6" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="-180" y="-250" width="360" height="250" rx="14" fill="#3a3e46" stroke="${INK}" stroke-width="5"/><rect x="-164" y="-234" width="328" height="218" rx="6" fill="${o.lit === false ? '#22262e' : '#f4f7fa'}"/>${scr}</g>`;
}
// email screen content in laptop coords (inside -164..164 × -234..-16)
export function mailScreen(o = {}) {
  let s = `<rect x="-164" y="-234" width="328" height="34" fill="#3f7fd8"/>` + T(-150, -210, 'Neue E-Mail', 20, { fill: '#fff', anchor: 'start', w: 800 });
  s += T(-150, -170, 'An: Vermieter', 24, { fill: INK, anchor: 'start', w: 800 }) + `<line x1="-150" y1="-158" x2="150" y2="-158" stroke="#c9d0d8" stroke-width="3"/>`;
  s += T(-150, -128, 'Betreff: Heizung', 20, { fill: '#555', anchor: 'start', w: 700 }) + `<line x1="-150" y1="-118" x2="150" y2="-118" stroke="#c9d0d8" stroke-width="3"/>`;
  const typed = o.typed === undefined ? 0 : o.typed;
  for (let i = 0; i < 3; i++) { const wl = cl(typed * 3 - i) * (i === 2 ? 160 : 290); if (wl > 0) s += `<rect x="-150" y="${-100 + i * 24}" width="${f1(wl)}" height="10" rx="5" fill="#9aa4b0"/>`; }
  if (o.cursor) s += `<rect x="-150" y="-104" width="4" height="22" fill="${INK}"/>`;
  if (o.sent > 0) s += `<g opacity="${op(o.sent)}"><rect x="-164" y="-234" width="328" height="218" rx="6" fill="#e8f6ec"/><circle cx="0" cy="-150" r="44" fill="${K.green}"/><path d="M -22 -150 L -6 -132 L 24 -168" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${T(0, -60, 'Gesendet ✓', 34, { fill: K.green })}</g>`;
  else s += `<rect x="70" y="-56" width="80" height="30" rx="15" fill="#3f7fd8"/>` + T(110, -35, 'Senden', 16, { fill: '#fff', w: 800 });
  return s;
}
export function deskLamp(x, y, s = 1, on = 1) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><ellipse cx="0" cy="0" rx="60" ry="14" fill="#2f2a24"/><path d="M 0 -6 L 30 -150 L -40 -230" stroke="#2f2a24" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M -90 -250 L -10 -270 L 10 -200 L -60 -170 Z" fill="#e0b04a" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>${on > 0 ? `<ellipse cx="-30" cy="-190" rx="26" ry="12" fill="#fff4c8" opacity="${op(on)}"/>` : ''}</g>`;
}
export function mug(x, y, s = 1, col = '#f2efe8', o = {}) {
  let st = '';
  if (o.t !== undefined) for (let i = 0; i < 2; i++) { const ph = o.t * 1.4 + i * .5, yy = -70 - (ph % 1) * 30; st += `<path d="M ${-10 + i * 22} ${f1(yy)} c -8 -12 8 -20 0 -34" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round" opacity="${op(.55 * (1 - ph % 1))}"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${st}<path d="M -36 -64 L 36 -64 L 30 0 L -30 0 Z" fill="${col}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M 34 -50 C 64 -50 64 -10 31 -12" fill="none" stroke="${INK}" stroke-width="5"/></g>`;
}
export function phone(x, y, s, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * 1000) / 1000})"><rect x="-80" y="-150" width="160" height="300" rx="26" fill="${INK}"/><rect x="-68" y="-132" width="136" height="264" rx="14" fill="${o.lit === false ? '#2b2f36' : '#eef3f7'}"/>${o.screen || ''}</g>`;
}
export function teapot(x, y, s = 1, t) {
  let st = '';
  if (t !== undefined) for (let i = 0; i < 2; i++) { const ph = t * 1.2 + i * .5, yy = -150 - (ph % 1) * 40; st += `<path d="M ${110 + i * 16} ${f1(yy + 40)} c -10 -14 10 -24 0 -40" stroke="#fff" stroke-width="6" fill="none" opacity="${op(.6 * (1 - ph % 1))}"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${st}<path d="M -90 0 C -110 -60 -80 -120 0 -120 C 80 -120 110 -60 90 0 Z" fill="#e0e8ee" stroke="${INK}" stroke-width="5"/><path d="M 80 -60 C 120 -70 120 -110 140 -120" stroke="${INK}" stroke-width="20" fill="none" stroke-linecap="round"/><path d="M 80 -60 C 120 -70 120 -110 140 -120" stroke="#e0e8ee" stroke-width="11" fill="none" stroke-linecap="round"/><path d="M -88 -80 C -140 -80 -140 -20 -86 -24" stroke="${INK}" stroke-width="6" fill="none"/><ellipse cx="0" cy="-122" rx="40" ry="12" fill="#c9d4dc" stroke="${INK}" stroke-width="4"/><circle cx="0" cy="-138" r="12" fill="#c9d4dc" stroke="${INK}" stroke-width="4"/><path d="M -60 -50 Q 0 -30 60 -50" stroke="#3f7fd8" stroke-width="8" fill="none"/></g>`;
}
export function leaf(x, y, s, rot, col = '#3f7a4a') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})"><path d="M 0 0 C 40 -60 120 -70 180 -40 C 120 0 50 20 0 0 Z" fill="${col}" stroke="${INK}" stroke-width="4"/><path d="M 10 -4 C 70 -30 120 -40 170 -40" stroke="#2c5a36" stroke-width="4" fill="none"/></g>`;
}
// wooden table edge across the bottom (sharp foreground)
export function tableEdge(y, col = '#8a5a3c', hi = '#a26c4a') {
  return `<rect x="-60" y="${y}" width="1200" height="${1980 - y}" rx="16" fill="${col}" stroke="${INK}" stroke-width="5"/><rect x="-60" y="${y}" width="1200" height="24" fill="${hi}"/>`;
}
export function stopwatch(x, y, s, frac, o = {}) {
  const a = frac * Math.PI * 2;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})"><rect x="-22" y="-150" width="44" height="34" rx="8" fill="#c9ccd2" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="0" r="120" fill="#f4f6f8" stroke="${INK}" stroke-width="10"/><circle cx="0" cy="0" r="104" fill="none" stroke="${o.done ? K.green : '#d0d4da'}" stroke-width="10"/>` +
    `<path d="M 0 -104 A 104 104 0 ${frac > .5 ? 1 : 0} 1 ${f1(Math.sin(a) * 104)} ${f1(-Math.cos(a) * 104)}" fill="none" stroke="${o.done ? K.green : K.red}" stroke-width="10" stroke-linecap="round"/>` +
    `<line x1="0" y1="0" x2="${f1(Math.sin(a) * 84)}" y2="${f1(-Math.cos(a) * 84)}" stroke="${INK}" stroke-width="8" stroke-linecap="round"/><circle cx="0" cy="0" r="10" fill="${INK}"/></g>`;
}
// sheet of paper (top-down) with lines of handwriting revealed progressively
export function note(x, y, s, rot, lines, prog_, o = {}) {
  let g = `<rect x="-280" y="-200" width="560" height="400" rx="6" fill="#fffdf4" stroke="${INK}" stroke-width="5"/>` + [0, 1, 2, 3, 4].map(i => `<line x1="-250" y1="${-110 + i * 70}" x2="250" y2="${-110 + i * 70}" stroke="#bcd3e8" stroke-width="3"/>`).join('') + `<line x1="-200" y1="-200" x2="-200" y2="200" stroke="#f0a0a0" stroke-width="3"/>`;
  lines.forEach((l, i) => {
    const pr = cl(prog_[i] || 0); if (pr <= 0) return;
    const w = textW(l, 34) * 1.3 + 30;
    g += `<defs><clipPath id="v94n${o.id || ''}${i}"><rect x="-190" y="${-170 + i * 70 + 50}" width="${f1(w * pr)}" height="70"/></clipPath></defs><g clip-path="url(#v94n${o.id || ''}${i})">${T(-186, -126 + i * 70 + 66, l, 34, { fill: '#1f3a8a', anchor: 'start', w: 700 })}</g>`;
  });
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
export function pen(x, y, s = 1, rot = -30) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})"><rect x="-10" y="-200" width="20" height="180" rx="8" fill="#3f7fd8" stroke="${INK}" stroke-width="4"/><path d="M -10 -20 L 10 -20 L 0 6 Z" fill="#f2d7a3" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/><circle cx="0" cy="3" r="3" fill="${INK}"/><rect x="-12" y="-200" width="24" height="30" rx="6" fill="#2a2a2a"/></g>`;
}
