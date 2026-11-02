// v91 kit (based on the v89 kit) — style "đầu tròn đen" (prompts/styles/dau-tron-den): solid black round heads with white faces,
// one accessory + top colour per person, blurred simple sets, white bubbles with black outline.
// Shapes follow prompts/styles/dau-tron-den/reference.svg (body path, stick legs, oval feet, highlight).
import { cl, prog, eio, eout, ein, back, lerp, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, hash };

export const K = {
  ink: '#1d1d1d', txt: '#2b2b2b', yellow: '#ffd23f', white: '#ffffff',
  du: '#2fa59a', duStr: '#e8f6f3',          // "du": teal hoodie, no accessory
  kol: '#8e6cc4', kolSh: '#6f51a3',          // colleague: purple top, bun
  mama: '#e3a86b', apron: '#f4efe6', apronSh: '#c9bfae', // mum: short hair, apron over a warm top
  chef: '#8b9096', chefSh: '#6c7177', tie: '#3b4f7a',     // boss: moustache, grey suit
  gf: '#5aa36b', band: '#d9493f',            // friend's new girlfriend: green top, red headband
  clip: '#f5c23a',
  cap: '#d9663a', capHat: '#f2c14e',         // friend 1: yellow cap, orange hoodie
  gl: '#a9c6e8',                             // friend 2: glasses, light-blue top
  jacket: '#c9862f', jacketSh: '#a86a20',    // Friday: the same new mustard jacket
  red: '#d9493f', green: '#3c9a5f', choc: '#6b3d22', chocWrap: '#8e2b3a',
};
const INK = K.ink;
export const f1 = n => Number.isFinite(n) ? Math.round(n * 10) / 10 : 0;
const op = a => f1(cl(a) * 100) / 100;
export const fade = (t, t0, d = .3) => eio(prog(t, t0, t0 + d));
export const fout = (t, t0, d = .3) => 1 - eio(prog(t, t0, t0 + d));
export const pop = (t, t0, d = .38) => t < t0 ? 0 : back(prog(t, t0, t0 + d), 1.7);
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

// rough Inter width table (em) for layout of bubbles / chips
export function textW(s, size) {
  let w = 0;
  for (const ch of String(s)) {
    if (ch === ' ') w += .28; else if ('.,:;!?„“"\'’|'.includes(ch)) w += .3;
    else if ('il'.includes(ch)) w += .3; else if ('mwMW'.includes(ch)) w += .9;
    else if (ch >= 'A' && ch <= 'Z' || 'ÄÖÜ'.includes(ch)) w += .74; else w += .6;
  }
  return w * size;
}
export const T = (x, y, s, size, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="Inter" font-weight="${o.w || 900}" font-size="${size}" fill="${o.fill || K.txt}" text-anchor="${o.anchor || 'middle'}"${o.op !== undefined ? ` opacity="${op(o.op)}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 12}" paint-order="stroke" stroke-linejoin="round"` : ''} style="font-family:'Inter';font-weight:${o.w || 900}">${esc(s)}</text>`;

// ---------- frame wrapper: vignette on top ----------
export function frame(body) {
  return `<defs><radialGradient id="v91vig" cx="50%" cy="45%" r="75%"><stop offset="60%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".42"/></radialGradient></defs>${body}<rect width="1080" height="1920" fill="url(#v91vig)"/>`;
}

// ---------- blurred sets ----------
const floorBand = (y, c1, c2, plank) => `<rect x="-60" y="${y}" width="1200" height="${1980 - y}" fill="${c1}"/><rect x="-60" y="${y}" width="1200" height="22" fill="${c2}"/>` +
  (plank ? `<g fill="${plank}"><rect x="40" y="${y + 150}" width="300" height="30" rx="6"/><rect x="740" y="${y + 150}" width="300" height="30" rx="6"/><rect x="-20" y="${y + 380}" width="380" height="36" rx="6"/><rect x="700" y="${y + 380}" width="380" height="36" rx="6"/></g>` : '');

export function bg(kind, o = {}) {
  const dx = o.dx || 0, sc = o.sc || 1;
  let s = '';
  if (kind === 'office') {
    s += `<rect x="-60" y="-60" width="1200" height="2040" fill="#dfe5ea"/>`;
    s += `<g fill="#f4f8fb" stroke="#9aa9b6" stroke-width="14"><rect x="90" y="420" width="380" height="520"/><rect x="610" y="420" width="380" height="520"/></g>`;
    s += `<path d="M 280 420 V 940 M 90 680 H 470 M 800 420 V 940 M 610 680 H 990" stroke="#9aa9b6" stroke-width="10"/>`;
    s += `<rect x="-60" y="1030" width="1200" height="60" fill="#c4ccd3"/>`;
    s += floorBand(1180, '#b9b2a6', '#a59d90', '#a0988b');
    s += `<rect x="30" y="980" width="70" height="180" rx="10" fill="#7b6a58"/><circle cx="65" cy="930" r="80" fill="#4f8a5b"/><circle cx="1010" cy="950" r="70" fill="#5c9a68"/><rect x="975" y="1000" width="70" height="170" rx="10" fill="#7b6a58"/>`;
  } else if (kind === 'cafe') {
    s += `<rect x="-60" y="-60" width="1200" height="2040" fill="#ecd9bf"/>`;
    s += `<rect x="120" y="380" width="840" height="300" rx="14" fill="#3b3a36"/><g fill="#d9d2c2"><rect x="170" y="430" width="300" height="18" rx="9"/><rect x="170" y="490" width="240" height="18" rx="9"/><rect x="170" y="550" width="280" height="18" rx="9"/><rect x="610" y="430" width="300" height="18" rx="9"/><rect x="610" y="490" width="220" height="18" rx="9"/><rect x="610" y="550" width="260" height="18" rx="9"/></g>`;
    s += `<g><path d="M 230 -60 V 250" stroke="#4a3b2c" stroke-width="6"/><path d="M 180 250 h 100 l -20 -50 h -60 z" fill="#2f2a24"/><circle cx="230" cy="262" r="26" fill="#ffe7a6"/>
      <path d="M 850 -60 V 250" stroke="#4a3b2c" stroke-width="6"/><path d="M 800 250 h 100 l -20 -50 h -60 z" fill="#2f2a24"/><circle cx="850" cy="262" r="26" fill="#ffe7a6"/></g>`;
    s += `<rect x="-60" y="820" width="1200" height="360" fill="#9a6b45"/><rect x="-60" y="800" width="1200" height="40" fill="#b88457"/>`;
    s += floorBand(1180, '#c9a985', '#b8956e', '#a8845d');
  } else if (kind === 'hall') {
    s += `<rect x="-60" y="-60" width="1200" height="2040" fill="#e7e1d3"/>`;
    s += `<rect x="610" y="430" width="330" height="760" fill="#8f6440"/><rect x="610" y="430" width="330" height="760" fill="none" stroke="#f3eee4" stroke-width="26"/><circle cx="660" cy="830" r="16" fill="#e8c56a"/>`;
    s += `<rect x="90" y="560" width="300" height="20" rx="8" fill="#6f5a45"/><g fill="#6f5a45"><circle cx="140" cy="590" r="10"/><circle cx="240" cy="590" r="10"/><circle cx="340" cy="590" r="10"/></g>`;
    s += `<path d="M 140 590 l -50 250 h 100 z" fill="#5a6f8c"/><path d="M 340 590 l -50 230 h 100 z" fill="#7f8f62"/>`;
    s += floorBand(1180, '#b7a184', '#a68e6f', '#9c8566');
    s += `<rect x="120" y="1210" width="280" height="40" rx="10" fill="#8a4b4b"/>`;
  } else if (kind === 'living') {
    s += `<rect x="-60" y="-60" width="1200" height="2040" fill="#e6d9c6"/>`;
    s += `<rect x="640" y="400" width="330" height="400" fill="#c9dbe6" stroke="#f6f0e6" stroke-width="18"/><path d="M 805 400 V 800 M 640 600 H 970" stroke="#f6f0e6" stroke-width="12"/>`;
    s += `<rect x="130" y="470" width="230" height="170" fill="#b98e6c" stroke="#7c5a40" stroke-width="12"/>`;
    s += `<path d="M 60 1180 V 700" stroke="#5b4a3a" stroke-width="10"/><path d="M 10 700 h 100 l -25 -90 h -50 z" fill="#f0d79c"/>`;
    s += floorBand(1180, '#a88c6c', '#987c5d', '#8f7455');
  } else if (kind === 'street') {
    s += `<rect x="-60" y="-60" width="1200" height="2040" fill="#d9e6ee"/>`;
    s += `<g><rect x="-20" y="380" width="300" height="820" fill="#c9b49a"/><rect x="290" y="300" width="260" height="900" fill="#b0a596"/><rect x="560" y="420" width="270" height="780" fill="#d1bfa4"/><rect x="840" y="330" width="260" height="870" fill="#a99a8a"/></g>`;
    s += `<g fill="#f2ead9" opacity=".85">${[[40, 480], [150, 480], [40, 640], [150, 640], [330, 400], [440, 400], [330, 560], [440, 560], [600, 520], [710, 520], [880, 440], [990, 440], [880, 600], [990, 600]].map(([x, y]) => `<rect x="${x}" y="${y}" width="80" height="100"/>`).join('')}</g>`;
    s += floorBand(1180, '#b9b6b0', '#a6a29b', '#a09c95');
  }
  else if (kind === 'boss') {
    s += `<rect x="-60" y="-60" width="1200" height="2040" fill="#d8dde2"/>`;
    s += `<rect x="560" y="360" width="440" height="560" fill="#eef2f5" stroke="#a6b0ba" stroke-width="16"/><path d="M 780 360 V 920" stroke="#a6b0ba" stroke-width="10"/><g fill="#8fa3b5" opacity=".6"><rect x="590" y="700" width="70" height="210"/><rect x="680" y="620" width="80" height="290"/><rect x="800" y="660" width="70" height="250"/><rect x="890" y="580" width="90" height="330"/></g>`;
    s += `<rect x="60" y="430" width="300" height="740" fill="#7a5a3e"/><rect x="60" y="430" width="300" height="740" fill="none" stroke="#f2efe8" stroke-width="22"/><circle cx="320" cy="820" r="14" fill="#e8c56a"/>`;
    s += `<rect x="460" y="1010" width="620" height="40" fill="#5b4535"/><rect x="480" y="1050" width="40" height="140" fill="#4a382b"/><rect x="1010" y="1050" width="40" height="140" fill="#4a382b"/>`;
    s += floorBand(1180, '#a9a39a', '#968f85', '#8e877d');
  } else if (kind === 'bar') {
    s += `<rect x="-60" y="-60" width="1200" height="2040" fill="#3d3330"/>`;
    s += `<rect x="-60" y="360" width="1200" height="560" fill="#5a4038"/><g fill="#8a6a52">${[0, 1, 2].map(i => `<rect x="-60" y="${470 + i * 150}" width="1200" height="16"/>`).join('')}</g>`;
    s += `<g>${Array.from({ length: 22 }, (_, i) => { const x = 20 + i * 48 + (i % 3) * 6, row = i % 3, y = 470 + row * 150; return `<rect x="${x}" y="${y - 70 - (i % 2) * 14}" width="26" height="${70 + (i % 2) * 14}" rx="8" fill="${['#9fd1b0', '#e2b45a', '#c96a52', '#7fb3d9'][i % 4]}" opacity=".8"/>`; }).join('')}</g>`;
    s += `<g><circle cx="200" cy="230" r="60" fill="#ffd98a" opacity=".6"/><circle cx="880" cy="230" r="60" fill="#ffd98a" opacity=".6"/></g>`;
    s += `<rect x="-60" y="960" width="1200" height="230" fill="#6e4a33"/><rect x="-60" y="940" width="1200" height="34" fill="#94664a"/>`;
    s += floorBand(1180, '#4c3c33', '#3f322b', null);
  } else if (kind === 'kitchen') {
    s += `<rect x="-60" y="-60" width="1200" height="2040" fill="#f1e2c8"/>`;
    s += `<g fill="#d8c09a" stroke="#b49a72" stroke-width="8"><rect x="80" y="300" width="260" height="300"/><rect x="380" y="300" width="260" height="300"/><rect x="680" y="300" width="300" height="300"/></g>`;
    s += `<rect x="-60" y="900" width="1200" height="40" fill="#cfb48a"/><rect x="-60" y="940" width="1200" height="400" fill="#e2cfae"/>`;
    s += `<rect x="740" y="700" width="200" height="200" rx="16" fill="#cfd8de"/>`;
  } else if (kind === 'desk') {
    s += `<rect x="-60" y="-60" width="1200" height="2040" fill="#e9e1d1"/>`;
    s += `<g fill="#c3ab86"><rect x="120" y="300" width="380" height="24"/><rect x="580" y="380" width="380" height="24"/></g><g>${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${140 + i * 56}" y="${200 - (i % 3) * 20}" width="44" height="${100 + (i % 3) * 20}" fill="${['#7f9cc2', '#c97d5d', '#7aa37a', '#d9b65a'][i % 4]}"/>`).join('')}</g>`;
    s += `<rect x="-60" y="760" width="1200" height="1200" fill="#a77d55"/><rect x="-60" y="740" width="1200" height="30" fill="#8c6644"/>`;
  }
  return `<g filter="url(#blur8)"><g transform="translate(${f1(540 + dx)} 960) scale(${f1(sc * 1000) / 1000}) translate(-540 -960)">${s}</g></g>`;
}
export const shadow = (x, y, rx = 110, a = 1) => `<ellipse cx="${f1(x)}" cy="${f1(y + 8)}" rx="${f1(rx)}" ry="16" fill="#000" opacity="${op(.18 * a)}" filter="url(#blur8)"/>`;

// ---------- blinking ----------
export function blinking(t, seed = 1) {
  const per = 3.1 + hash(seed) * 1.6, ph = hash(seed + 7) * per;
  const u = ((t + ph) % per + per) % per;
  return u < .13;
}

// ---------- face (head-local coords, head centre 0,0, r 100) ----------
function eyesSvg(o) {
  const lx = o.look ? o.look[0] : 0, ly = o.look ? o.look[1] : 0;
  const e = o.eyes || 'n', ex = 32, ey = -8;
  let s = '';
  if (e === 'happy') return `<path d="M ${-ex - 18} ${ey + 6} Q ${-ex} ${ey - 16} ${-ex + 18} ${ey + 6} M ${ex - 18} ${ey + 6} Q ${ex} ${ey - 16} ${ex + 18} ${ey + 6}" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  if (e === 'closed') return `<path d="M ${-ex - 18} ${ey} Q ${-ex} ${ey + 14} ${-ex + 18} ${ey} M ${ex - 18} ${ey} Q ${ex} ${ey + 14} ${ex + 18} ${ey}" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  if (o.glasses) {
    s += `<g fill="none" stroke="#fff" stroke-width="7"><rect x="${-ex - 22}" y="${ey - 15}" width="44" height="32" rx="12"/><rect x="${ex - 22}" y="${ey - 15}" width="44" height="32" rx="12"/></g><line x1="${-ex + 22}" y1="${ey}" x2="${ex - 22}" y2="${ey}" stroke="#fff" stroke-width="6"/>`;
    s += `<circle cx="${-ex + lx * .4}" cy="${ey + 1 + ly * .4}" r="6" fill="#fff"/><circle cx="${ex + lx * .4}" cy="${ey + 1 + ly * .4}" r="6" fill="#fff"/>`;
    return s;
  }
  const r = e === 'wide' ? 23 : 19, pr = e === 'wide' ? 8 : 9;
  s += `<circle cx="${-ex}" cy="${ey}" r="${r}" fill="#fff"/><circle cx="${ex}" cy="${ey}" r="${r}" fill="#fff"/>`;
  s += `<circle cx="${f1(-ex + lx)}" cy="${f1(ey + 2 + ly)}" r="${pr}" fill="${INK}"/><circle cx="${f1(ex + lx)}" cy="${f1(ey + 2 + ly)}" r="${pr}" fill="${INK}"/>`;
  if (e === 'sly') s += `<path d="M ${-ex - 24} ${ey - 24} H ${-ex + 24} V ${ey - 1} L ${-ex - 24} ${ey - 5} Z M ${ex - 24} ${ey - 24} H ${ex + 24} V ${ey - 5} L ${ex - 24} ${ey - 1} Z" fill="${INK}"/>`;
  if (e === 'sad') s += `<path d="M ${-ex - 24} ${ey - 24} H ${-ex + 24} V ${ey - 9} L ${-ex - 24} ${ey + 1} Z M ${ex - 24} ${ey - 24} H ${ex + 24} V ${ey + 1} L ${ex - 24} ${ey - 9} Z" fill="${INK}"/>`;
  return s;
}
function browsSvg(b) {
  if (!b) return '';
  const p = { up: 'M -50 -50 L -16 -56 M 16 -56 L 50 -50', sad: 'M -50 -44 L -16 -54 M 16 -54 L 50 -44', mean: 'M -50 -52 L -14 -42 M 14 -42 L 50 -52' }[b];
  return p ? `<path d="${p}" stroke="#fff" stroke-width="7" stroke-linecap="round" fill="none"/>` : '';
}
function mouthSvg(m) {
  switch (m) {
    case 'smile': return `<path d="M -22 42 Q 0 60 22 42" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'grin': return `<path d="M -28 38 Q 0 40 28 38 Q 22 66 0 66 Q -22 66 -28 38 Z" fill="#fff"/>`;
    case 'laugh': return `<path d="M -32 34 Q 0 36 32 34 Q 26 78 0 78 Q -26 78 -32 34 Z" fill="#fff"/>`;
    case 'o': return `<ellipse cx="0" cy="50" rx="12" ry="16" fill="#fff"/>`;
    case 'sad': return `<path d="M -20 58 Q 0 42 20 58" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'smirk': return `<path d="M -22 50 Q 6 56 26 38" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
    case 'none': return '';
    case 'shh': return `<ellipse cx="0" cy="50" rx="9" ry="7" fill="#fff"/>`;
    default: return `<rect x="-22" y="44" width="44" height="8" rx="4" fill="#fff"/>`;
  }
}

// ---------- the people ----------
export const WHO = {
  du: { top: K.du, str: K.duStr, acc: 'none' },
  kol: { top: K.kol, str: null, acc: 'bun' },
  mama: { top: K.mama, str: null, acc: 'short' },
  chef: { top: K.chef, str: null, acc: 'tache' },
  cap: { top: K.cap, str: '#f7e1d6', acc: 'cap' },
  gf: { top: K.gf, str: null, acc: 'band' },
};
const BODY = 'M -60 -240 C -60 -315 -40 -345 0 -345 C 40 -345 60 -315 60 -240 L 66 -130 C 66 -116 -66 -116 -66 -130 Z';

// hand positions are in person-local coords (feet at 0,0). armL/armR: [x,y] → draws a sleeve + hand
export function person(who, x, y, s, o = {}) {
  const W = WHO[who], t = o.t || 0;
  const bob = o.still ? 0 : Math.sin(t * 2.2 + (o.seed || 0)) * 3;
  const top = o.jacket ? K.jacket : W.top;
  const sit = o.sit ? 80 : 0;
  let legs = '';
  const wk = o.walk !== undefined ? o.walk : null;
  if (o.sit) {
    legs = `<line x1="-24" y1="-44" x2="-26" y2="-4" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><line x1="24" y1="-44" x2="26" y2="-4" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><ellipse cx="-32" cy="0" rx="20" ry="9" fill="${INK}"/><ellipse cx="32" cy="0" rx="20" ry="9" fill="${INK}"/>`;
  } else {
    const sw = wk === null ? 0 : Math.sin(wk * Math.PI * 2) * 22, lift = wk === null ? 0 : Math.max(0, Math.sin(wk * Math.PI * 2)) * 10, lift2 = wk === null ? 0 : Math.max(0, -Math.sin(wk * Math.PI * 2)) * 10;
    legs = `<line x1="-20" y1="-120" x2="${f1(-20 + sw)}" y2="${f1(-4 - lift)}" stroke="${INK}" stroke-width="10" stroke-linecap="round"/><line x1="20" y1="-120" x2="${f1(20 - sw)}" y2="${f1(-4 - lift2)}" stroke="${INK}" stroke-width="10" stroke-linecap="round"/>` +
      `<ellipse cx="${f1(-28 + sw)}" cy="${f1(-lift)}" rx="20" ry="9" fill="${INK}"/><ellipse cx="${f1(28 - sw)}" cy="${f1(-lift2)}" rx="20" ry="9" fill="${INK}"/>`;
  }
  const up = sit - (wk === null ? 0 : Math.abs(Math.sin(wk * Math.PI * 2)) * 6);
  let body = `<path d="${BODY}" fill="${top}" stroke="${INK}" stroke-width="5"/>`;
  if (o.jacket) {
    body += `<path d="M -12 -338 L 12 -338 L 14 -118 L -14 -118 Z" fill="${W.top}"/><path d="M -14 -340 L -38 -300 L -14 -270 M 14 -340 L 38 -300 L 14 -270" stroke="${K.jacketSh}" stroke-width="6" fill="none" stroke-linejoin="round"/><g fill="${K.jacketSh}"><rect x="-56" y="-200" width="34" height="8" rx="4"/><rect x="22" y="-200" width="34" height="8" rx="4"/></g>`;
  } else if (who === 'kol') {
    body += `<path d="M -24 -338 Q 0 -318 24 -338" stroke="${K.kolSh}" stroke-width="7" fill="none" stroke-linecap="round"/><path d="M -64 -140 H 64" stroke="${K.kolSh}" stroke-width="6"/>`;
  } else if (who === 'mama') {
    body += `<path d="M -36 -300 Q 0 -286 36 -300 L 48 -132 Q 0 -122 -48 -132 Z" fill="${K.apron}" stroke="${INK}" stroke-width="4"/><path d="M -36 -300 Q -30 -336 -12 -342 M 36 -300 Q 30 -336 12 -342" stroke="${K.apronSh}" stroke-width="5" fill="none"/><rect x="-26" y="-230" width="52" height="34" rx="6" fill="none" stroke="${K.apronSh}" stroke-width="4"/>`;
  } else if (who === 'chef') {
    body += `<path d="M -16 -342 L 0 -300 L 16 -342 Z" fill="#fff" stroke="${INK}" stroke-width="3"/><path d="M -7 -318 L 7 -318 L 10 -200 L 0 -186 L -10 -200 Z" fill="${K.tie}" stroke="${INK}" stroke-width="3"/><path d="M -16 -342 L -44 -290 L -14 -250 M 16 -342 L 44 -290 L 14 -250" stroke="${K.chefSh}" stroke-width="6" fill="none" stroke-linejoin="round"/><g fill="${INK}"><circle cx="-24" cy="-200" r="5"/><circle cx="-24" cy="-160" r="5"/></g>`;
  } else if (who === 'gf') {
    body += `<path d="M -26 -338 Q 0 -310 26 -338" stroke="#3f7d4e" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  } else if (W.str) {
    body += `<path d="M 0 -320 L -12 -270 M 0 -320 L 12 -270" stroke="${W.str}" stroke-width="5" stroke-linecap="round"/>`;
  }
  // arms
  const sleeve = top;
  const arm = (side, h) => {
    const sx = side * 50, sy = -300;
    const mx = (sx + h[0]) / 2 + side * 26, my = (sy + h[1]) / 2 + 10;
    return `<path d="M ${sx} ${sy} Q ${f1(mx)} ${f1(my)} ${f1(h[0])} ${f1(h[1])}" stroke="${INK}" stroke-width="38" fill="none" stroke-linecap="round"/><path d="M ${sx} ${sy} Q ${f1(mx)} ${f1(my)} ${f1(h[0])} ${f1(h[1])}" stroke="${sleeve}" stroke-width="28" fill="none" stroke-linecap="round"/><circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="15" fill="${INK}"/>`;
  };
  let armsBack = '', armsFront = '';
  if (o.armL) armsFront += arm(-1, o.armL); else armsBack += `<circle cx="-78" cy="-212" r="14" fill="${INK}"/>`;
  if (o.armR) armsFront += arm(1, o.armR); else armsBack += `<circle cx="78" cy="-212" r="14" fill="${INK}"/>`;
  // head
  const hy = -420 + (o.headDy || 0);
  const eyes = blinking(t, (o.seed || 0) + 3) && !o.noBlink && (o.eyes || 'n') !== 'happy' && (o.eyes || 'n') !== 'closed' ? 'closed' : (o.eyes || 'n');
  let head = '';
  if (o.hear > 0) {
    const h = cl(o.hear), pulse = .5 + .5 * Math.sin(t * 6);
    head += `<circle cx="0" cy="0" r="${f1(150 + 10 * pulse)}" fill="${K.yellow}" opacity="${op(.42 * h)}" filter="url(#blur20)"/>`;
    for (let i = 0; i < 2; i++) {
      const r = 130 + i * 34 + 6 * pulse;
      head += `<path d="M ${f1(r * Math.cos(2.6))} ${f1(-r * Math.sin(2.6))} A ${r} ${r} 0 0 0 ${f1(r * Math.cos(3.68))} ${f1(-r * Math.sin(3.68))} M ${f1(r * Math.cos(.54))} ${f1(-r * Math.sin(.54))} A ${r} ${r} 0 0 1 ${f1(r * Math.cos(-.54))} ${f1(-r * Math.sin(-.54))}" stroke="${K.yellow}" stroke-width="${9 - i * 2}" fill="none" stroke-linecap="round" opacity="${op(h * (1 - i * .35))}"/>`;
    }
  }
  if (W.acc === 'bun') head += `<circle cx="10" cy="-100" r="36" fill="${INK}"/>`;
  head += `<circle cx="0" cy="0" r="100" fill="${INK}"/>`;
  if (o.quiff) head += `<path d="M -40 -88 C -30 -150 40 -160 70 -118 C 40 -128 10 -120 -10 -90 Z" fill="${INK}"/>`;
  head += `<ellipse cx="-34" cy="-50" rx="28" ry="16" fill="#fff" opacity=".18"/>`;
  if (W.acc === 'short') head += `<path d="M -100 6 C -118 -60 -84 -122 -14 -118 C 10 -132 70 -122 96 -70 C 112 -40 108 -10 100 6 C 92 -40 60 -70 0 -66 C -60 -72 -96 -40 -100 6 Z" fill="${INK}"/><path d="M -96 -30 C -80 -90 -30 -110 20 -104" stroke="#555" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>`;
  head += eyesSvg({ eyes, look: o.look, glasses: W.acc === 'glasses' }) + browsSvg(o.brows) + mouthSvg(o.mouth || 'flat');
  if (W.acc === 'tache') head += `<path d="M -40 34 C -30 18 -8 20 0 30 C 8 20 30 18 40 34 C 30 30 14 40 0 36 C -14 40 -30 30 -40 34 Z" fill="#fff"/>`;
  if (W.acc === 'band') head += `<path d="M -92 -38 C -70 -96 70 -96 92 -38" stroke="${K.band}" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="62" cy="-78" r="16" fill="${K.band}" stroke="${INK}" stroke-width="3"/>`;
  if (o.lock > 0) { const lk = back(cl(o.lock), 2), lr = 30 * lk; head += `<g transform="translate(0 48) scale(${f1(lk * 100) / 100})" opacity="${op(o.lockA === undefined ? 1 : o.lockA)}"><circle r="40" fill="${K.red}" opacity=".18"/><path d="M -26 -26 L 26 26 M 26 -26 L -26 26" stroke="#fff" stroke-width="20" stroke-linecap="round"/><path d="M -26 -26 L 26 26 M 26 -26 L -26 26" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/></g>`; }
  if (W.acc === 'bun') head += `<g transform="translate(70 -62) rotate(-35)"><rect x="-20" y="-8" width="40" height="16" rx="5" fill="${K.clip}" stroke="${INK}" stroke-width="3"/></g>`;
  if (W.acc === 'cap') head += `<path d="M -94 -25 C -90 -105 -40 -135 10 -133 C 70 -129 100 -85 98 -25 Z" fill="${K.capHat}" stroke="${INK}" stroke-width="5"/><path d="M -94 -25 C -130 -25 -154 -15 -162 -5 C -130 -1 -90 -7 -60 -15 Z" fill="${K.capHat}" stroke="${INK}" stroke-width="5"/>`;
  const tilt = o.tilt || 0;
  const g = `${legs}<g transform="translate(0 ${f1(up + bob * .4)})">${armsBack}${o.behindBody || ''}${body}${o.overBody || ''}<g transform="translate(0 ${f1(hy + bob * .6)}) rotate(${f1(o.headTilt || 0)})">${head}${o.face || ''}</g>${armsFront}${o.front || ''}</g>`;
  const sx = o.flip ? -1 : 1;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(tilt)}) scale(${f1(s * sx * 1000) / 1000} ${f1(s * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}

// ---------- bubbles ----------
// speech: rounded rect + pointed tail towards (tx,ty). thought: pill + two small circles towards (tx,ty).
export function speech(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 44, lh = size * 1.2;
  const w = Math.max(...L.map(l => textW(l, size))) + 64, h = L.length * lh + 40;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2;
  const ax = cl(tx, bx + 40, bx + w - 40), base = ty > y ? by + h - 2 : by + 2;
  const tail = `M ${f1(ax - 22)} ${f1(base)} L ${f1(tx)} ${f1(ty)} L ${f1(ax + 22)} ${f1(base)} Z`;
  let s = `<path d="${tail}" fill="#fff" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(40, h / 2))}" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
  s += `<path d="M ${f1(ax - 19)} ${f1(base - (ty > y ? 4 : -4))} L ${f1(ax + 19)} ${f1(base - (ty > y ? 4 : -4))}" stroke="#fff" stroke-width="8"/>`;
  L.forEach((l, i) => { s += T(x, by + 20 + size * .9 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  const sc = o.noPop ? 1 : p;
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, sc) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
export function thought(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 44, lh = size * 1.2;
  const w = Math.max(...L.map(l => textW(l, size))) + 70, h = L.length * lh + 40;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2;
  const fill = o.dark ? '#fff4f4' : '#fff';
  // two small circles from the bubble edge towards the thinker's head
  const ex = cl(tx, bx + 50, bx + w - 50), ey = ty > y ? by + h : by;
  const c1x = lerp(ex, tx, .38), c1y = lerp(ey, ty, .38), c2x = lerp(ex, tx, .78), c2y = lerp(ey, ty, .78);
  let s = `<circle cx="${f1(c2x)}" cy="${f1(c2y)}" r="9" fill="${fill}" stroke="${INK}" stroke-width="4"/><circle cx="${f1(c1x)}" cy="${f1(c1y)}" r="16" fill="${fill}" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 46))}" fill="${fill}" stroke="${INK}" stroke-width="5"/>`;
  L.forEach((l, i) => { s += T(x, by + 20 + size * .9 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}

// big day card (MONTAG …) at the top, pops in on the spoken day
export function dayCard(t, t0, word, o = {}) {
  const p = pop(t, t0, .45); if (p <= 0) return '';
  const y = o.y || 300, size = o.size || 120;
  return `<g transform="translate(540 ${y - size * .35}) scale(${f1(p * 1000) / 1000}) translate(-540 ${-(y - size * .35)})">${T(540, y, word, size, { fill: K.yellow, stroke: INK, sw: 22 })}</g>`;
}
export function title(lines, y0, size, o = {}) {
  let s = '';
  lines.forEach((l, i) => { const [txt, col] = Array.isArray(l) ? l : [l, '#fff']; s += T(540, y0 + i * size * 1.18, txt, size, { fill: col, stroke: INK, sw: 16, op: o.a }); });
  return s;
}
export function chip(x, y, txt, o = {}) {
  const size = o.size || 44, w = textW(txt, size) + 56, h = size + 34, p = o.p === undefined ? 1 : o.p;
  if (p <= 0) return '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(p * 1000) / 1000}) rotate(${f1(o.rot || 0)})"><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="${o.bg || K.yellow}" stroke="${INK}" stroke-width="5"/>${T(0, size * .36, txt, size, { fill: o.fill || INK })}</g>`;
}

// ---------- props ----------
export function phone(x, y, s, o = {}) {
  let scr = o.screen || '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s * 1000) / 1000})"><rect x="-70" y="-130" width="140" height="260" rx="22" fill="${INK}"/><rect x="-60" y="-114" width="120" height="228" rx="12" fill="${o.lit === false ? '#2b2f36' : '#eef3f7'}"/>${scr}</g>`;
}
export function sofa(x, y, w = 620) {
  const l = x - w / 2;
  return `<rect x="${f1(l)}" y="${f1(y - 300)}" width="${w}" height="210" rx="40" fill="#5f7fa8" stroke="${INK}" stroke-width="5"/>` +
    `<rect x="${f1(l - 40)}" y="${f1(y - 200)}" width="90" height="170" rx="36" fill="#56749b" stroke="${INK}" stroke-width="5"/><rect x="${f1(l + w - 50)}" y="${f1(y - 200)}" width="90" height="170" rx="36" fill="#56749b" stroke="${INK}" stroke-width="5"/>` +
    `<rect x="${f1(l + 40)}" y="${f1(y - 120)}" width="${w - 80}" height="80" rx="20" fill="#6d8db5" stroke="${INK}" stroke-width="5"/>` +
    `<g stroke="${INK}" stroke-width="10" stroke-linecap="round"><line x1="${f1(l + 10)}" y1="${f1(y - 30)}" x2="${f1(l + 10)}" y2="${f1(y)}"/><line x1="${f1(l + w - 10)}" y1="${f1(y - 30)}" x2="${f1(l + w - 10)}" y2="${f1(y)}"/></g>`;
}
export function cafeTable(x, y, w = 700) {
  return `<rect x="${f1(x - w / 2)}" y="${f1(y)}" width="${w}" height="34" rx="12" fill="#b07a4c" stroke="${INK}" stroke-width="5"/><rect x="${f1(x - 18)}" y="${f1(y + 34)}" width="36" height="150" fill="#6b4a2e" stroke="${INK}" stroke-width="5"/>`;
}
export function cup(x, y, s = 1, col = '#ffffff') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M -28 -50 H 28 L 22 0 H -22 Z" fill="${col}" stroke="${INK}" stroke-width="4"/><path d="M 28 -38 q 22 6 2 24" fill="none" stroke="${INK}" stroke-width="4"/></g>`;
}
export function chocolate(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})"><rect x="-70" y="-34" width="140" height="68" rx="6" fill="${K.choc}" stroke="${INK}" stroke-width="4"/><rect x="-10" y="-36" width="80" height="72" rx="4" fill="${K.chocWrap}" stroke="${INK}" stroke-width="4"/><path d="M -60 -12 H -18 M -60 12 H -18 M -39 -30 V 30" stroke="#4e2b17" stroke-width="4"/></g>`;
}
export function heart(x, y, s = 1, col = K.red, a = 1) {
  return `<path transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})" d="M 0 18 C -40 -10 -34 -42 -12 -42 C 0 -42 0 -32 0 -28 C 0 -32 0 -42 12 -42 C 34 -42 40 -10 0 18 Z" fill="${col}" stroke="${INK}" stroke-width="4" opacity="${op(a)}"/>`;
}
export function cake(x, y, s = 1) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><rect x="-110" y="-110" width="220" height="110" rx="14" fill="#f6e3c8" stroke="${INK}" stroke-width="5"/><path d="M -110 -80 Q -80 -60 -55 -80 Q -27 -60 0 -80 Q 27 -60 55 -80 Q 80 -60 110 -80 V -96 H -110 Z" fill="#e89aa8" stroke="${INK}" stroke-width="4"/>
    <g>${[-50, 0, 50].map(cx => `<rect x="${cx - 7}" y="-160" width="14" height="50" fill="#9ccbe8" stroke="${INK}" stroke-width="3"/><path d="M ${cx} -184 q 10 12 0 22 q -10 -10 0 -22 Z" fill="${K.yellow}" stroke="${INK}" stroke-width="2"/>`).join('')}</g></g>`;
}
export function balloon(x, y, col, t, seed) {
  const sway = Math.sin(t * 1.6 + seed) * 8;
  return `<path d="M ${f1(x + sway)} ${f1(y + 70)} q -12 60 6 120 q 14 50 -6 110" stroke="${INK}" stroke-width="3" fill="none"/><ellipse cx="${f1(x + sway)}" cy="${f1(y)}" rx="58" ry="70" fill="${col}" stroke="${INK}" stroke-width="5"/><ellipse cx="${f1(x + sway - 20)}" cy="${f1(y - 26)}" rx="14" ry="20" fill="#fff" opacity=".35"/>`;
}
// a small simple "mini scene" card used in the recap: label + tiny Lena head with bubble dot
export function miniCard(x, y, label, p) {
  if (p <= 0) return '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(p * 1000) / 1000})"><rect x="-110" y="-80" width="220" height="160" rx="22" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="-36" cy="18" r="34" fill="${INK}"/><circle cx="-33" cy="-18" r="13" fill="${INK}"/><circle cx="-48" cy="14" r="7" fill="#fff"/><circle cx="-24" cy="14" r="7" fill="#fff"/>` +
    `<rect x="4" y="-30" width="86" height="40" rx="20" fill="#fff" stroke="${INK}" stroke-width="4"/><circle cx="2" cy="22" r="7" fill="#fff" stroke="${INK}" stroke-width="3"/>${T(47, -2, '…', 30, { w: 900 })}${T(0, -46, label, 30, { fill: INK })}</g>`;
}

// camera: scale content around (cx,cy)
export const cam = (body, cx, cy, sc) => `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(sc * 1000) / 1000}) translate(${f1(-cx)} ${f1(-cy)})">${body}</g>`;
// du's "hearing" glow level: steady with a flare on a heard thought
export const hearLvl = (t, flares = []) => .6 + .4 * Math.max(0, ...flares.map(f => cl(1 - Math.abs(t - f - .4) / .9)));
// icons used inside bubbles
export function sunIcon(x, y, s = 1) {
  let r = '';
  for (let i = 0; i < 8; i++) { const a = i * Math.PI / 4; r += `<line x1="${f1(x + Math.cos(a) * 34 * s)}" y1="${f1(y + Math.sin(a) * 34 * s)}" x2="${f1(x + Math.cos(a) * 48 * s)}" y2="${f1(y + Math.sin(a) * 48 * s)}" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/>`; }
  return r + `<circle cx="${x}" cy="${y}" r="${24 * s}" fill="${K.yellow}" stroke="${K.ink}" stroke-width="4"/>`;
}
export function palmIcon(x, y, s = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 0 40 Q 6 0 0 -30" stroke="#7b5a3a" stroke-width="10" fill="none" stroke-linecap="round"/><path d="M 0 -30 q -30 -14 -50 4 q 26 -6 50 -4 q -10 -30 -36 -36 q 30 10 36 36 q 14 -30 42 -30 q -30 12 -42 30 q 34 -6 50 14 q -30 -14 -50 -14 Z" fill="${K.green}" stroke="${K.ink}" stroke-width="3"/><ellipse cx="0" cy="44" rx="44" ry="8" fill="#e8cf8e"/></g>`;
}
export function arrowUp(x, y, s = 1, col = K.green) {
  return `<path transform="translate(${x} ${y}) scale(${s})" d="M 0 -50 L 40 -6 H 16 V 44 H -16 V -6 H -40 Z" fill="${col}" stroke="${K.ink}" stroke-width="5" stroke-linejoin="round"/>`;
}
export function star(x, y, r, col = K.yellow, rot = 0) {
  let d = '';
  for (let i = 0; i < 10; i++) { const a = -Math.PI / 2 + i * Math.PI / 5 + rot, rr = i % 2 ? r * .45 : r; d += `${i ? 'L' : 'M'} ${f1(x + Math.cos(a) * rr)} ${f1(y + Math.sin(a) * rr)} `; }
  return `<path d="${d}Z" fill="${col}" stroke="${K.ink}" stroke-width="4" stroke-linejoin="round"/>`;
}

// ---------- v91 additions ----------
// a lie that cannot be spoken: thought bubble whose text gets a red line through it (strike 0..1)
export function lie(x, y, txt, tx, ty, o = {}) {
  const size = o.size || 46, p = o.p === undefined ? 1 : o.p;
  if (p <= 0) return '';
  let s = thought(x, y, txt, tx, ty, Object.assign({}, o, { size, p, a: o.a }));
  const st = cl(o.strike || 0);
  if (st > 0) {
    const w = textW(txt, size) + 20, x0 = x - w / 2;
    s += `<g opacity="${op(o.a === undefined ? 1 : o.a)}"><line x1="${f1(x0)}" y1="${f1(y + 2)}" x2="${f1(x0 + w * st)}" y2="${f1(y - 4 * st)}" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/></g>`;
  }
  return s;
}
// lock level for "du": the X pops on t0 and fades between t1 and t1+.25
export const lockAt = (t, t0, t1) => t < t0 || t > t1 + .25 ? 0 : (t < t1 ? cl((t - t0) / .3) : 1);
export const lockAlpha = (t, t1) => 1 - cl((t - t1) / .25);
// presentation board on an easel showing many tiny slides
export function easel(x, y, s = 1, o = {}) {
  let g = `<g stroke="${INK}" stroke-width="10" stroke-linecap="round"><line x1="-150" y1="40" x2="-200" y2="420"/><line x1="150" y1="40" x2="200" y2="420"/><line x1="0" y1="40" x2="0" y2="400"/></g>`;
  g += `<rect x="-260" y="-300" width="520" height="350" rx="12" fill="#fff" stroke="${INK}" stroke-width="6"/>`;
  const n = o.n === undefined ? 24 : o.n;
  for (let i = 0; i < n; i++) {
    const c = i % 6, r = Math.floor(i / 6), px = -232 + c * 78, py = -272 + r * 78;
    const pp = o.reveal === undefined ? 1 : cl(o.reveal * n - i);
    if (pp <= 0) continue;
    g += `<g opacity="${op(pp)}"><rect x="${px}" y="${py}" width="66" height="62" rx="6" fill="${['#cfe2f3', '#fde3b0', '#e2d3f2', '#d4ecd9'][(i + r) % 4]}" stroke="${INK}" stroke-width="3"/><rect x="${px + 8}" y="${py + 10}" width="42" height="7" rx="3" fill="#555"/><rect x="${px + 8}" y="${py + 26}" width="50" height="5" rx="2" fill="#999"/><rect x="${px + 8}" y="${py + 38}" width="34" height="5" rx="2" fill="#999"/></g>`;
  }
  if (o.label) g += T(0, 92, o.label, 34, { fill: INK, w: 900 });
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// video-call style phone frame showing a person (inner drawn by caller in frame-local coords 0..w,0..h)
export function callFrame(x, y, w, h, inner, o = {}) {
  const id = o.id || 'v91cf';
  const grey = cl(o.grey || 0);
  let s = `<defs><clipPath id="${id}"><rect x="0" y="0" width="${w}" height="${h}" rx="36"/></clipPath></defs>`;
  s += `<rect x="-14" y="-14" width="${w + 28}" height="${h + 28}" rx="48" fill="${INK}"/>`;
  s += `<g clip-path="url(#${id})"><rect width="${w}" height="${h}" fill="#f1e2c8"/>${inner}<rect width="${w}" height="${h}" fill="#55606a" opacity="${op(grey * .55)}"/></g>`;
  if (o.label) s += `<rect x="${w / 2 - 110}" y="-34" width="220" height="64" rx="32" fill="#fff" stroke="${INK}" stroke-width="5"/>` + T(w / 2, 12, o.label, 40, { fill: INK });
  const p = o.p === undefined ? 1 : o.p;
  return `<g transform="translate(${f1(x + w / 2)} ${f1(y + h / 2)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) rotate(${f1(o.rot || 0)}) translate(${f1(-w / 2)} ${f1(-h / 2)})" opacity="${op(cl(p * 2))}">${s}</g>`;
}
export function plateCake(x, y, s = 1, o = {}) {
  const cut = o.cut ? `<path d="M 30 -70 L 90 -40 L 90 0 L 30 -30 Z" fill="#f1e2c8"/>` : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000}) rotate(${f1(o.rot || 0)})"><ellipse cx="0" cy="10" rx="130" ry="24" fill="#fff" stroke="${INK}" stroke-width="5"/><path d="M -90 -60 Q -90 -82 0 -82 Q 90 -82 90 -60 V 0 Q 90 14 0 14 Q -90 14 -90 0 Z" fill="#c98d4f" stroke="${INK}" stroke-width="5"/><path d="M -90 -60 Q -90 -38 0 -38 Q 90 -38 90 -60" fill="none" stroke="${INK}" stroke-width="4"/><g fill="#f6efe2"><circle cx="-40" cy="-62" r="6"/><circle cx="10" cy="-66" r="6"/><circle cx="50" cy="-58" r="6"/><circle cx="-10" cy="-52" r="5"/></g>${cut}</g>`;
}
export function wallClock(x, y, r, hh, mm) {
  const a1 = (hh % 12 + mm / 60) * 30 * Math.PI / 180, a2 = mm * 6 * Math.PI / 180;
  let s = `<circle cx="${x}" cy="${y}" r="${r}" fill="#fff" stroke="${INK}" stroke-width="7"/>`;
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; s += `<line x1="${f1(x + Math.sin(a) * r * .78)}" y1="${f1(y - Math.cos(a) * r * .78)}" x2="${f1(x + Math.sin(a) * r * .9)}" y2="${f1(y - Math.cos(a) * r * .9)}" stroke="${INK}" stroke-width="5"/>`; }
  s += `<line x1="${x}" y1="${y}" x2="${f1(x + Math.sin(a1) * r * .5)}" y2="${f1(y - Math.cos(a1) * r * .5)}" stroke="${INK}" stroke-width="9" stroke-linecap="round"/><line x1="${x}" y1="${y}" x2="${f1(x + Math.sin(a2) * r * .75)}" y2="${f1(y - Math.cos(a2) * r * .75)}" stroke="${K.red}" stroke-width="6" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="8" fill="${INK}"/>`;
  return s;
}
export function check(x, y, s = 1, p = 1, col = K.green) {
  if (p <= 0) return '';
  const k = back(cl(p), 2);
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * k * 1000) / 1000})"><circle r="36" fill="${col}" stroke="${INK}" stroke-width="5"/><path d="M -16 2 L -4 14 L 18 -12" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
export function glass(x, y, s = 1, col = '#e2b45a') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M -24 -80 H 24 L 20 0 H -20 Z" fill="${col}" opacity=".85" stroke="${INK}" stroke-width="4"/><path d="M -24 -80 H 24 V -66 H -24 Z" fill="#fff" stroke="${INK}" stroke-width="3"/></g>`;
}
