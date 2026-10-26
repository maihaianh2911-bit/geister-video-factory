// @ts-nocheck
// Paper-style scene kit reused from v14; new phone-at-night animation below.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// ===== PAPER KIT: old cream paper, sticky notes, quote cards, hand-drawn charts, thin-line people =====
const P = {
  ink: '#2b2520', inkSoft: '#5a5046', paper: '#ebe5d3', paper2: '#d8cfb8', ivory: '#fbf8ef',
  gold: '#f5c431', goldSh: '#c9951a', brown: '#5a3a1a', red: '#d6402f', redSoft: '#e9786a',
  tape: '#f2d36b', hl: '#ffe066',
  nYellow: '#f6e7a6', nPeach: '#f8c9b4', nLilac: '#d9cdf0', nMint: '#bfe6d2', nBlue: '#bcd8f0',
  top: '#23262d', topSh: '#16181d', pants: '#a9c6df', pantsSh: '#86a7c4', skin: '#f1c7a5', skinSh: '#d9a684', hair: '#3a2a20',
  coat: '#f4f6f8', night: '#3e4a6e', nightSh: '#2f3955', sky: '#9fb7d8'
};
const FF = `font-family:'Inter';font-weight:900`;
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
// Inter Black advance widths (em), measured
const GW = {"0":0.711,"1":0.452,"2":0.647,"3":0.669,"4":0.702,"5":0.666,"6":0.675,"7":0.595,"8":0.679,"9":0.675," ":0.199,"!":0.381,"\"":0.625,"%":1.044,"'":0.372,"(":0.388,")":0.388,"+":0.693,",":0.373,"-":0.475,".":0.373,"/":0.412,":":0.373,"?":0.601,"A":0.795,"B":0.668,"C":0.748,"D":0.723,"E":0.613,"F":0.584,"G":0.755,"H":0.75,"I":0.291,"J":0.596,"K":0.759,"L":0.565,"M":0.956,"N":0.77,"O":0.775,"P":0.656,"Q":0.787,"R":0.668,"S":0.666,"T":0.687,"U":0.722,"V":0.795,"W":1.082,"X":0.786,"Y":0.775,"Z":0.694,"a":0.597,"b":0.646,"c":0.603,"d":0.646,"e":0.607,"f":0.422,"g":0.647,"h":0.65,"i":0.296,"j":0.296,"k":0.607,"l":0.296,"m":0.943,"n":0.65,"o":0.625,"p":0.646,"q":0.646,"r":0.449,"s":0.588,"t":0.419,"u":0.65,"v":0.647,"w":0.877,"x":0.609,"y":0.65,"z":0.59,"Ä":0.795,"Ö":0.775,"Ü":0.722,"ä":0.597,"ö":0.625,"ü":0.65,"ß":0.693,"–":0.5,"—":1,"·":0.373,"…":1.119,"„":0.585,"“":0.625,"×":0.693,"−":0.693,"→":0.954,"↑":0.966,"↓":0.966,"≠":0.693,"°":0.463,"‰":1.436,"½":0.91};
function tw(str, fs) { let w = 0; for (const ch of String(str)) w += GW[ch] ?? .62; return w * fs; }
const T = (x, y, fs, s, fill = P.ink, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" style="${FF};font-size:${fs}px${o.ls ? `;letter-spacing:${o.ls}px` : ''}" fill="${fill}"${o.st ? ` stroke="${o.st}" stroke-width="${o.sw || 6}" paint-order="stroke" stroke-linejoin="round"` : ''}${o.op !== undefined ? ` opacity="${o.op}"` : ''}>${esc(s)}</text>`;
// transform helper: scale/rotate around a point
const at = (x, y, s, r, inner) => `<g transform="translate(${x} ${y}) rotate(${r || 0}) scale(${s})">${inner}</g>`;
const pop = (t, t0, d = .3) => back(prog(t, t0, t0 + d));
// slide-in from a side: returns x offset (0 when settled)
const slideIn = (t, t0, d = .35, from = 1200) => from * (1 - eout(prog(t, t0, t0 + d)));
const slideOut = (t, t1, d = .3, to = -1300) => to * ein(prog(t, t1 - d, t1));

function paperDefs() {
  return `<defs>
  <linearGradient id="pkBg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#efe9d8"/><stop offset=".6" stop-color="${P.paper}"/><stop offset="1" stop-color="${P.paper2}"/></linearGradient>
  <radialGradient id="pkVig" cx=".5" cy=".45" r=".75"><stop offset=".6" stop-color="#3a2a14" stop-opacity="0"/><stop offset="1" stop-color="#3a2a14" stop-opacity=".38"/></radialGradient>
  <filter id="pkSh" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="0" dy="8" stdDeviation="9" flood-color="#3a2a14" flood-opacity=".28"/></filter>
  <filter id="pkSh2" x="-20%" y="-20%" width="140%" height="150%"><feDropShadow dx="4" dy="5" stdDeviation="4" flood-color="#3a2a14" flood-opacity=".25"/></filter>
  <linearGradient id="pkGold" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#ffe27a"/><stop offset=".55" stop-color="${P.gold}"/><stop offset="1" stop-color="#e2a91c"/></linearGradient>
  </defs>`;
}
let _grain = '';
function grain() {
  if (_grain) return _grain;
  let s = '';
  for (let i = 0; i < 260; i++) s += `<circle cx="${(hash(i * 3.1) * 1080).toFixed(0)}" cy="${(hash(i * 7.7 + 1) * 1920).toFixed(0)}" r="${(1 + hash(i * 1.3) * 2.2).toFixed(1)}" fill="${hash(i) > .5 ? '#7a6a50' : '#fffaf0'}" opacity="${(.08 + hash(i * 2.2) * .12).toFixed(2)}"/>`;
  for (let i = 0; i < 9; i++) s += `<ellipse cx="${hash(i + 40) * 1080}" cy="${hash(i + 50) * 1920}" rx="${120 + hash(i + 60) * 160}" ry="${80 + hash(i + 70) * 120}" fill="#c9b994" opacity=".08"/>`;
  return (_grain = s);
}
function paperBG(t) {
  // grain "boils" a tiny bit (stop-motion paper feel)
  const k = Math.floor(t * 6) % 3;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pkBg)"/><g transform="translate(${k * 2} ${k})">${grain()}</g>`;
}
const paperVig = () => `<rect x="0" y="0" width="1080" height="1920" fill="url(#pkVig)"/>`;

// fixed topic tag: gold bold letters with brown outline (serif-like via heavy stroke + shadow)
function topicTag(txt, p = 1, t = 0) {
  if (p <= 0) return '';
  const fs = Math.min(92, 940 / (tw(txt, 1) + String(txt).length * 6 / 92));
  return at(540, 205, back(p), -1.5, `<text x="0" y="8" text-anchor="middle" style="${FF};font-size:${fs}px;letter-spacing:6px" fill="${P.brown}" opacity=".45">${esc(txt)}</text>
    <text x="0" y="0" text-anchor="middle" style="${FF};font-size:${fs}px;letter-spacing:6px" fill="url(#pkGold)" stroke="${P.brown}" stroke-width="9" paint-order="stroke" stroke-linejoin="round">${esc(txt)}</text>
    <path d="M ${-tw(txt, fs) / 2 - 20} 26 q ${tw(txt, fs) / 2} 10 ${tw(txt, fs) + 40} 0" stroke="${P.brown}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".7"/>`);
}
// source tag top-left: thin black rectangle, bold caps
function srcTag(txt, p) {
  if (p <= 0) return '';
  const fs = 34, w = tw(txt, fs) + 44;
  return `<g transform="translate(${54 - 600 * (1 - eout(p))} 300)"><rect x="0" y="-36" width="${w}" height="60" fill="${P.ivory}" stroke="${P.ink}" stroke-width="3.5"/>
    ${T(22, 6, fs, txt, P.ink, { a: 'start', ls: 1 })}</g>`;
}
// sticky note: centre x,y ; w,h ; colour ; lines of caps text
function sticky(x, y, w, h, col, lines, rot, p, o = {}) {
  if (p <= 0) return '';
  let fs = o.fs || 50; const s = back(p);
  const mw = Math.max(...lines.map(l => tw(l, fs))); if (mw > w - 56) fs = fs * (w - 56) / mw;
  const r = rot + (1 - eout(p)) * (o.spin ?? 14);
  let tx = '';
  const n = lines.length;
  lines.forEach((l, i) => { tx += T(0, (i - (n - 1) / 2) * fs * 1.12 + fs * .36, fs, l, o.ink || '#3a2a1c'); });
  return at(x, y, s, r, `<g filter="url(#pkSh2)"><path d="M ${-w / 2} ${-h / 2} H ${w / 2} V ${h / 2 - 30} L ${w / 2 - 30} ${h / 2} H ${-w / 2} Z" fill="${col}"/>
    <path d="M ${w / 2} ${h / 2 - 30} L ${w / 2 - 30} ${h / 2} L ${w / 2 - 26} ${h / 2 - 26} Z" fill="#000" opacity=".12"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="22" fill="#000" opacity=".05"/></g>${o.extra || ''}${tx}`);
}
// highlighted text line: segs [[text, highlight?],...], centred at x
function hlLine(x, y, fs, segs, hp = 1) {
  const full = segs.map(s => s[0]).join('');
  let cx = x - tw(full, fs) / 2, out = '', hls = '';
  for (const [s, h] of segs) {
    const w = tw(s, fs);
    if (h) { const hpp = typeof h === 'number' ? h : hp; if (hpp > 0) hls += `<rect x="${cx - 6}" y="${y - fs * .78}" width="${(w + 12) * cl(hpp)}" height="${fs * 1.0}" rx="6" fill="${P.hl}" opacity=".95" transform="rotate(-1 ${cx} ${y})"/>`; }
    out += `<text x="${cx}" y="${y}" style="${FF};font-size:${fs}px;white-space:pre" fill="${P.ink}">${esc(s)}</text>`;
    cx += w;
  }
  return hls + out;
}
// quote card: ivory paper, tape, red quotes, lines (array of segs arrays), source line
function quoteCard(cx, cy, w, h, p, lines, src, o = {}) {
  if (p <= 0) return '';
  const fs = o.fs || 52, x0 = -w / 2, y0 = -h / 2;
  let L = '';
  const n = lines.length, gap = fs * 1.3;
  lines.forEach((segs, i) => { L += hlLine(0, y0 + (o.top || 150) + i * gap, fs, segs, 1); });
  const rot = (o.rot ?? -1.2);
  return `<g transform="translate(${cx + (o.dx || 0)} ${cy + 900 * (1 - eout(p))}) rotate(${rot + 6 * (1 - eout(p))})">
    <g filter="url(#pkSh)"><path d="M ${x0} ${y0 + 4} L ${-x0} ${y0} L ${-x0 + 3} ${-y0} L ${x0 - 2} ${-y0 - 3} Z" fill="${P.ivory}"/></g>
    <path d="M ${x0 + 20} ${y0 + 24} H ${-x0 - 20}" stroke="#e8e0cc" stroke-width="2"/>
    <rect x="-80" y="${y0 - 22}" width="160" height="44" fill="${P.tape}" opacity=".85" transform="rotate(-3 0 ${y0})"/>
    <text x="${x0 + 30}" y="${y0 + 120}" style="${FF};font-size:150px" fill="${P.red}">“</text>
    ${L}
    ${src ? T(-x0 - 34, -y0 - 34, o.sfs || 30, src, P.inkSoft, { a: 'end' }) : ''}
    ${o.extra || ''}</g>`;
}
// thin hand-drawn line with "boil"
const boil = (t, i, a = 1.5) => (hash(Math.floor(t * 8) + i * 13.7) - .5) * a * 2;
function hline(x1, y1, x2, y2, t, i, col = P.ink, w = 4) {
  const mx = (x1 + x2) / 2 + boil(t, i), my = (y1 + y2) / 2 + boil(t, i + 5);
  return `<path d="M ${x1} ${y1} Q ${mx} ${my} ${x2} ${y2}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round"/>`;
}
// bar chart: bars [{v (0..1 of max), label, val, col, t0}], area x,y(bottom),w,h
function barChart(t, x, y, w, h, bars, o = {}) {
  const n = bars.length, bw = w / n * .56, gap = w / n;
  let s = hline(x - 10, y, x + w + 10, y, t, 1, P.ink, 5) + hline(x, y + 8, x, y - h - 20, t, 2, P.ink, 4);
  for (let k = 1; k <= 4; k++) s += `<path d="M ${x} ${y - h * k / 4} H ${x + w}" stroke="${P.ink}" stroke-width="1.5" stroke-dasharray="6 10" opacity=".25"/>`;
  bars.forEach((b, i) => {
    const g = eout(prog(t, b.t0, b.t0 + (b.d || .7)));
    const bh = h * b.v * g, bx = x + gap * i + (gap - bw) / 2;
    if (g > 0) {
      s += `<path d="M ${bx} ${y} V ${y - bh} H ${bx + bw} V ${y}" fill="${b.col}" stroke="${P.ink}" stroke-width="4" stroke-linejoin="round"/>`;
      for (let k = 0; k < 5; k++) s += `<path d="M ${bx + 8} ${y - bh * (k + .5) / 5 + 12} L ${bx + bw - 8} ${y - bh * (k + .5) / 5 - 12}" stroke="#fff" stroke-width="3" opacity=".35"/>`;
      const vp = pop(t, b.t0 + (b.d || .7) * .7, .3);
      if (vp > 0) s += at(bx + bw / 2, y - bh - 24, vp, 0, T(0, 0, o.vfs || 64, b.val, P.ink));
    }
    if (b.label) s += T(bx + bw / 2, y + 56, o.lfs || 36, b.label, P.inkSoft);
  });
  return s;
}
// small speech bubble with German text; tail to (tx,ty)
function bubble(x, y, txt, p, tx, ty, o = {}) {
  if (p <= 0) return '';
  const fs = o.fs || 46, w = tw(txt, fs) + 60, h = fs + 46;
  const s = back(p);
  return `<g transform="translate(${x} ${y}) scale(${s})"><g filter="url(#pkSh2)"><path d="M ${-w / 2 + 24} ${-h / 2} H ${w / 2 - 24} Q ${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 24} V ${h / 2 - 24} Q ${w / 2} ${h / 2} ${w / 2 - 24} ${h / 2} H ${(tx - x) * .25 + 22} L ${(tx - x) / s} ${(ty - y) / s} L ${(tx - x) * .25 - 14} ${h / 2} H ${-w / 2 + 24} Q ${-w / 2} ${h / 2} ${-w / 2} ${h / 2 - 24} V ${-h / 2 + 24} Q ${-w / 2} ${-h / 2} ${-w / 2 + 24} ${-h / 2} Z" fill="#fff" stroke="${P.ink}" stroke-width="4" stroke-linejoin="round"/></g>
    ${T(0, fs * .36, fs, txt, o.col || P.ink)}</g>`;
}
// opening title card with rays
function titleBurst(t, t0, t1, lines, o = {}) {
  const p = pop(t, t0, .35), q = prog(t, t1 - .3, t1);
  if (p <= 0 || q >= 1) return '';
  let rays = '';
  for (let i = 0; i < 22; i++) {
    const a = i / 22 * Math.PI * 2 + .1, r0 = 330 + 30 * (i % 3), r1 = r0 + (90 + 70 * hash(i)) * eout(prog(t, t0 + .1 + i * .012, t0 + .4 + i * .012));
    rays += `<path d="M ${Math.cos(a) * r0 * 1.25} ${Math.sin(a) * r0 * .9} L ${Math.cos(a) * r1 * 1.25} ${Math.sin(a) * r1 * .9}" stroke="${i % 2 ? P.red : P.ink}" stroke-width="${i % 2 ? 12 : 7}" stroke-linecap="round"/>`;
  }
  const fs = o.fs || 96, n = lines.length;
  let tx = '';
  lines.forEach((l, i) => tx += T(0, (i - (n - 1) / 2) * fs * 1.1 + fs * .35, fs, l, P.ink));
  const w = o.w || 720, h = o.h || (n * fs * 1.1 + 110);
  const wob = 1.5 * Math.sin(t * 5);
  return `<g transform="translate(${540 - 1400 * ein(q)} ${o.y || 760}) rotate(${-5 + wob * .3}) scale(${back(p)})">${rays}
    <g filter="url(#pkSh)"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="url(#pkGold)" stroke="${P.ink}" stroke-width="9"/></g>
    <rect x="${-w / 2 + 16}" y="${-h / 2 + 16}" width="${w - 32}" height="${h - 32}" fill="none" stroke="${P.ink}" stroke-width="3"/>${tx}</g>`;
}
// red X stamp / check stamp
function stampX(x, y, s, p) { if (p <= 0) return ''; const k = s * (1.6 - .6 * eout(p)); return `<g transform="translate(${x} ${y}) scale(${k}) rotate(-8)" opacity="${cl(p * 3)}"><path d="M -60 -60 L 60 60 M 60 -60 L -60 60" stroke="${P.red}" stroke-width="22" stroke-linecap="round"/></g>`; }
function stampOk(x, y, s, p) { if (p <= 0) return ''; const k = s * (1.6 - .6 * eout(p)); return `<g transform="translate(${x} ${y}) scale(${k}) rotate(-8)" opacity="${cl(p * 3)}"><circle r="78" fill="none" stroke="#2f9a63" stroke-width="10"/><path d="M -40 2 L -10 32 L 44 -30" stroke="#2f9a63" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }

// ---- thin-line person, realistic proportions. origin at feet; height ≈ 640*s
// o: aL/aR upper-arm angle (deg from hanging down; + = forward/up toward screen-left for L), eL/eR elbow bend,
// walk (phase rad) , look (-1..1 head turn), mouth 'n'|'o'|'smile'|'talk', t, hairStyle 'short'|'long', top, pants, hold (svg in right-hand coords)
function person(x, y, s, o = {}) {
  const t = o.t || 0, ol = P.ink;
  const top = o.top || P.top, pants = o.pants || P.pants, hairC = o.hairC || P.hair;
  const wk = o.walk;
  const lg = wk === undefined ? 0 : Math.sin(wk) * 22;
  const bob = wk === undefined ? (o.breath === false ? 0 : 2 * Math.sin(t * 2.4)) : Math.abs(Math.cos(wk)) * 6;
  const leg = (ang, sx) => `<g transform="rotate(${ang} ${sx * 22} -300)"><path d="M ${sx * 22} -300 L ${sx * 24} -28" stroke="${ol}" stroke-width="40" stroke-linecap="round"/><path d="M ${sx * 22} -300 L ${sx * 24} -28" stroke="${pants}" stroke-width="32" stroke-linecap="round"/>
    <path d="M ${sx * 24 - 18} -6 Q ${sx * 24 - 18} -30 ${sx * 24 + 4} -30 Q ${sx * 24 + 34} -26 ${sx * 24 + 36} -6 Z" fill="#2b2b30" stroke="${ol}" stroke-width="3"/></g>`;
  const arm = (a, e, sx, hold) => {
    const shx = sx * 62, shy = -494;
    return `<g transform="rotate(${a * -sx} ${shx} ${shy})"><path d="M ${shx} ${shy} L ${shx} ${shy + 120}" stroke="${ol}" stroke-width="34" stroke-linecap="round"/><path d="M ${shx} ${shy} L ${shx} ${shy + 120}" stroke="${top}" stroke-width="27" stroke-linecap="round"/>
      <g transform="rotate(${(e || 0) * -sx} ${shx} ${shy + 120})"><path d="M ${shx} ${shy + 120} L ${shx} ${shy + 222}" stroke="${ol}" stroke-width="30" stroke-linecap="round"/><path d="M ${shx} ${shy + 120} L ${shx} ${shy + 200}" stroke="${top}" stroke-width="23" stroke-linecap="round"/>
      <circle cx="${shx}" cy="${shy + 230}" r="17" fill="${P.skin}" stroke="${ol}" stroke-width="3.5"/>${hold ? `<g transform="translate(${shx} ${shy + 236})">${hold}</g>` : ''}</g></g>`;
  };
  const lk = o.look || 0;
  const mouth = o.mouth === 'o' ? `<ellipse cx="${lk * 10}" cy="-546" rx="7" ry="9" fill="${ol}"/>`
    : o.mouth === 'talk' ? `<ellipse cx="${lk * 10}" cy="-547" rx="10" ry="${2 + 6 * Math.abs(Math.sin(t * 13))}" fill="${ol}"/>`
    : o.mouth === 'sad' ? `<path d="M ${lk * 10 - 11} -542 Q ${lk * 10} -552 ${lk * 10 + 11} -542" stroke="${ol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    : o.mouth === 'flat' ? `<path d="M ${lk * 10 - 10} -547 H ${lk * 10 + 10}" stroke="${ol}" stroke-width="3.5" stroke-linecap="round"/>`
    : `<path d="M ${lk * 10 - 12} -551 Q ${lk * 10} -540 ${lk * 10 + 12} -551" stroke="${ol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  const eyesClosed = o.eyes === 'closed';
  const ex = lk * 12, ey = (o.lookY || 0) * 4;
  const eyes = eyesClosed ? `<path d="M ${ex - 25} -582 q 8 6 16 0 M ${ex + 9} -582 q 8 6 16 0" stroke="${ol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`
    : `<circle cx="${ex - 17}" cy="${-584 + ey}" r="${o.eyeS ? 5 * o.eyeS : 5}" fill="${ol}"/><circle cx="${ex + 17}" cy="${-584 + ey}" r="${o.eyeS ? 5 * o.eyeS : 5}" fill="${ol}"/>`;
  const br = o.brow || 0;
  const brows = `<path d="M ${ex - 30} ${-600 - br * 6} q 12 ${-6 - br * 4} 22 ${br * 3} M ${ex + 8} ${-600 - br * 3} q 12 ${-6 - br * 4} 22 ${br * 6}" stroke="${ol}" stroke-width="3.5" fill="none" stroke-linecap="round"/>`;
  const longHair = o.hairStyle === 'long';
  const hair = longHair
    ? `<path d="M -50 -560 Q -62 -650 0 -652 Q 62 -650 50 -560 L 54 -500 Q 40 -490 34 -520 L 36 -590 Q 0 -610 -36 -590 L -34 -520 Q -40 -490 -54 -500 Z" fill="${hairC}" stroke="${ol}" stroke-width="3.5"/>`
    : `<path d="M -45 -575 Q -52 -646 4 -644 Q 54 -640 46 -580 Q 40 -612 0 -612 Q -32 -616 -45 -575 Z" fill="${hairC}" stroke="${ol}" stroke-width="3.5"/>`;
  const head = `<g transform="translate(0 ${-bob}) rotate(${o.headTilt || 0} 0 -530)">
    <rect x="-13" y="-528" width="26" height="30" fill="${P.skinSh}" stroke="${ol}" stroke-width="3.5"/>
    <ellipse cx="${-44 + lk * 4}" cy="-570" rx="9" ry="14" fill="${P.skin}" stroke="${ol}" stroke-width="3.5"/><ellipse cx="${44 + lk * 4}" cy="-570" rx="9" ry="14" fill="${P.skin}" stroke="${ol}" stroke-width="3.5"/>
    <ellipse cx="0" cy="-575" rx="45" ry="54" fill="${P.skin}" stroke="${ol}" stroke-width="3.5"/>
    ${hair}${eyes}${brows}${mouth}${o.headExtra || ''}</g>`;
  const body = `<g transform="translate(0 ${-bob * .6})">
    ${arm(o.aR ?? 6, o.eR ?? 4, 1, o.holdR)}
    <path d="M -64 -500 Q -70 -420 -54 -300 L 54 -300 Q 70 -420 64 -500 Q 0 -516 -64 -500 Z" fill="${top}" stroke="${ol}" stroke-width="3.5" stroke-linejoin="round"/>
    <path d="M -16 -506 Q 0 -488 16 -506" stroke="${ol}" stroke-width="3" fill="none"/>
    <path d="M -56 -300 L 56 -300 L 54 -282 L -54 -282 Z" fill="${P.pantsSh}" stroke="${ol}" stroke-width="3"/></g>`;
  return `<g transform="translate(${x} ${y}) scale(${s * (o.flip ? -1 : 1)} ${s}) rotate(${o.lean || 0} 0 -300)">
    <ellipse cx="0" cy="0" rx="78" ry="10" fill="#3a2a14" opacity=".18"/>
    ${leg(lg, -1)}${leg(-lg, 1)}${body}${head}
    <g transform="translate(0 ${-bob * .6})">${arm(o.aL ?? 6, o.eL ?? 4, -1, o.holdL)}</g></g>`;
}
const horizon = (t, y = 1340) => hline(-20, y, 1100, y + 2, t, 77, P.ink, 3) + `<path d="M 80 ${y + 26} h 140 M 640 ${y + 22} h 220" stroke="${P.ink}" stroke-width="2" opacity=".35" stroke-linecap="round"/>`;
// phone prop (hand coords)
const phoneProp = (glow = 0) => `<rect x="-26" y="-74" width="52" height="92" rx="9" fill="#1d1f24" stroke="${P.ink}" stroke-width="3"/><rect x="-20" y="-66" width="40" height="72" rx="4" fill="${glow > 0 ? '#9fd4ff' : '#4a5a70'}"/>${glow > 0 ? `<circle cx="0" cy="-30" r="${60 * glow}" fill="#9fd4ff" opacity="${.3 * glow}"/>` : ''}`;
// New scenes: all action times are relative to the approved provisional timeline.
// Final word alignment can remap this timeline without changing the composition.
const CUTS = [0,3.6611,9.5638,12.7766,16.8113,22.4898,29.0649,33.3985,38.7781,43.3358,46.997,52.3019,54.0204,56.486,62.6875,67.2453,70.8317,75.0158,80];
const TAGS = ['23:00 UHR','NUR ZEHN MINUTEN?','JEDEN ABEND?','1 · DEINE AUGEN','SELTENER BLINZELN','EIN AUGE IM KISSEN','HELL / DUNKEL','2 · DEIN SCHLAF','MELATONIN','3 · DER MORGEN','DER KREISLAUF','DREI ÄNDERUNGEN','1 · WARMES LICHT','2 · DISPLAY & ABSTAND','3 · FESTE SCHLUSSZEIT','AUSSER REICHWEITE','FEIERABEND','UND DU?'];
function inkPath(d,w=5,col=P.ink,extra='') {return `<path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" ${extra}/>`;}
function arrow(x1,y1,x2,y2,p=1,col=P.ink){
 const x=lerp(x1,x2,cl(p)),y=lerp(y1,y2,cl(p)),a=Math.atan2(y2-y1,x2-x1),r=22;
 return inkPath(`M ${x1} ${y1} Q ${(x1+x2)/2+20} ${(y1+y2)/2-15} ${x} ${y}`,5,col)+ (p>.9?inkPath(`M ${x-r*Math.cos(a-.5)} ${y-r*Math.sin(a-.5)} L ${x} ${y} L ${x-r*Math.cos(a+.5)} ${y-r*Math.sin(a+.5)}`,5,col):'');
}
function clockCard(x,y,txt,scale=1){return at(x,y,scale,-3,`<rect x="-180" y="-70" width="360" height="140" rx="8" fill="${P.ivory}" stroke="${P.ink}" stroke-width="5"/><rect x="-172" y="-62" width="344" height="124" fill="#000" opacity=".025"/>${T(0,27,79,txt)}`);}
function phone(x,y,s,t,{bright=1,warm=0,off=0,swipe=1,angle=0}={}){
 let rows='';
 for(let j=-1;j<5;j++){
  const yy=-105+j*63-((t*27*swipe)%63);
  rows+=`<rect x="-57" y="${yy}" width="114" height="45" rx="7" fill="${[P.nBlue,P.nPeach,P.nLilac,P.nMint,P.nYellow][(j+5)%5]}"/><circle cx="-40" cy="${yy+15}" r="7" fill="#fff" opacity=".7"/><path d="M -25 ${yy+12} h 65 M -25 ${yy+25} h 45" stroke="${P.ink}" stroke-width="3" opacity=".35"/>`;
 }
 return at(x,y,s,angle,`<rect x="-89" y="-160" width="178" height="320" rx="28" fill="#323438" stroke="${P.ink}" stroke-width="6"/><rect x="-73" y="-139" width="146" height="275" rx="15" fill="${off?'#27282c':warm?'#ffe4a8':'#dff2f7'}"/><clipPath id="ph${Math.round(x)}${Math.round(y)}"><rect x="-68" y="-112" width="136" height="235" rx="9"/></clipPath>${off?'':`<g clip-path="url(#ph${Math.round(x)}${Math.round(y)})">${rows}</g><rect x="-73" y="-139" width="146" height="275" rx="15" fill="#10141c" opacity="${(1-bright)*.65}"/>`}<rect x="-25" y="-130" width="50" height="8" rx="4" fill="#222"/>${off?'':`<rect x="-20" y="122" width="40" height="5" rx="3" fill="#fff"/>`}`);
}
function face(x,y,s,t,o={}){
 const blink=o.closed?1:Math.max(0,1-Math.abs(((t+(o.phase||0))%4.3)-.12)/.1);
 const fatigue=o.tired||0,look=o.look||0;
 return at(x,y,s,o.tilt||0,`<ellipse cx="0" cy="10" rx="96" ry="111" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/><path d="M -95 -12 Q -113 -122 -12 -116 Q 92 -133 99 -17 Q 72 -72 44 -55 Q 0 -102 -58 -51 L -95 -12 Z" fill="${P.hair}" stroke="${P.ink}" stroke-width="5"/>${[-34,34].map(ex=>`<g transform="translate(${ex} 1) scale(1 ${Math.max(.07,1-blink*.95)})"><ellipse rx="23" ry="${25-fatigue*7}" fill="${fatigue? '#fff3ed':'#fffdf8'}" stroke="${P.ink}" stroke-width="3"/><circle cx="${look*8}" cy="2" r="${10+fatigue*2}" fill="#537d87"/><circle cx="${look*8}" cy="2" r="6" fill="${P.ink}"/><circle cx="${look*8+3}" cy="-2" r="2.5" fill="#fff"/></g>${fatigue?inkPath(`M ${ex-19} 30 Q ${ex} 43 ${ex+19} 30`,4,'#a87d7c'):''}`).join('')}${inkPath('M -57 -33 Q -35 -45 -15 -35 M 15 -35 Q 37 -45 57 -33',4)}${o.closed?inkPath('M -52 0 q 18 12 36 0 M 16 0 q 18 12 36 0',4):''}${fatigue?inkPath('M -18 66 Q 0 54 18 66',4):inkPath('M -18 56 Q 0 73 18 56',4)}${o.glow?`<ellipse cx="40" cy="22" rx="50" ry="70" fill="#bce7fa" opacity="${o.glow*.23}"/>`:''}`);
}
function lamp(x,y,s,on,t=0){
 return at(x,y,s,0,`${on>0?`<ellipse cx="0" cy="20" rx="220" ry="285" fill="${P.gold}" opacity="${on*(.16+.015*Math.sin(t*2))}"/>`:''}${inkPath('M 0 -80 L 0 130 M -55 135 H 55',8)}<path d="M -62 -170 H 62 L 103 -56 H -103 Z" fill="${on>0?'#f8d16a':'#c8bda7'}" stroke="${P.ink}" stroke-width="5"/><path d="M -83 -68 H 83" stroke="#fff6ca" stroke-width="6" opacity=".7"/><path d="M 78 -48 V 6" stroke="${P.ink}" stroke-width="3"/><circle cx="78" cy="10" r="6" fill="${P.goldSh}"/>`);
}
function room(t,o={}){
 const br=9*Math.sin(t*2.2),headY=1040+br*.17,light=o.light||0;
 let s=`<rect x="54" y="405" width="972" height="952" rx="18" fill="${o.morning?'#e8ddbc':'#c9c5ba'}" stroke="${P.ink}" stroke-width="4"/><path d="M 55 1230 H 1025" stroke="${P.ink}" stroke-width="3"/>`;
 s+=`<rect x="735" y="465" width="215" height="260" rx="6" fill="${o.morning?'#d8eafa':'#404d69'}" stroke="${P.ink}" stroke-width="5"/>${o.morning?`<circle cx="840" cy="580" r="51" fill="${P.gold}"/>`:`<path d="M 855 505 a 46 46 0 1 0 28 77 a 51 51 0 0 1 -28 -77" fill="#e1e4c8"/><circle cx="780" cy="650" r="3" fill="#fff"/>`}<path d="M 842 465 V 725 M 735 594 H 950" stroke="${P.ink}" stroke-width="6"/>`;
 s+=`<rect x="91" y="971" width="131" height="237" fill="#b69e80" stroke="${P.ink}" stroke-width="5"/><path d="M 98 1010 H 215" stroke="${P.ink}" stroke-width="4"/>`+lamp(155,850,.7,light,t);
 s+=`<rect x="130" y="1195" width="816" height="65" rx="8" fill="#b49c80" stroke="${P.ink}" stroke-width="5"/><path d="M 145 1255 V 1310 M 930 1255 V 1310" stroke="${P.ink}" stroke-width="14"/><rect x="126" y="1015" width="19" height="254" rx="8" fill="#9e8b82" stroke="${P.ink}" stroke-width="4"/><path d="M 160 1095 Q 145 1015 235 1010 H 420 Q 470 1025 445 1117 Z" fill="${P.ivory}" stroke="${P.ink}" stroke-width="4"/>`;
 s+=`<path d="M 335 1075 Q 450 1050 570 1086 L 860 1150 L 850 1194 H 340 Z" fill="#525a65" stroke="${P.ink}" stroke-width="4"/>`;
 s+=face(315,headY,.72,t,{tired:o.tired,closed:o.sleep,glow:o.sleep?0:1,look:1,tilt:6});
 s+=`<path d="M 430 ${1080-br*.15} Q 650 ${1040-br*.3} 895 1128 Q 928 1140 928 1194 H 413 Q 430 1135 430 ${1080-br*.15} Z" fill="#a9c8d0" stroke="${P.ink}" stroke-width="5"/><path d="M 472 1110 Q 660 1090 883 1156 M 460 1140 Q 680 1115 893 1186" fill="none" stroke="#739aab" stroke-width="3" opacity=".65"/>`;
 if(!o.sleep){
  const swipe=Math.max(0,Math.sin(t*3.5));
  s+=`<path d="M 443 1110 Q 465 1030 ${512+swipe*4} 1017" fill="none" stroke="${P.ink}" stroke-width="30" stroke-linecap="round"/><path d="M 443 1110 Q 465 1030 ${512+swipe*4} 1017" fill="none" stroke="${P.skin}" stroke-width="22" stroke-linecap="round"/>`;
  s+=phone(510,945,.47,t,{angle:10,bright:1,swipe:1});
  s+=`<ellipse cx="489" cy="1008" rx="12" ry="25" transform="rotate(30 489 1008)" fill="${P.skin}" stroke="${P.ink}" stroke-width="3"/><path d="M 454 912 L 331 1008 L 367 1108 L 481 990 Z" fill="#a8dafa" opacity=".1"/>`;
 }
 if(light)s+=`<path d="M 90 735 L 200 735 L 550 1220 H 54 V 940 Z" fill="#ffe27a" opacity="${light*.09}"/>`;
 return s;
}
function eye(x,y,s,t,{pupil=25,dry=0,close=0,dim=0}={}){
 return at(x,y,s,0,`<path d="M -200 0 Q 0 -152 200 0 Q 0 152 -200 0 Z" fill="${dim?'#7f8194':'#fffdf5'}" stroke="${P.ink}" stroke-width="7"/><clipPath id="ey${Math.round(x)}${Math.round(y)}"><path d="M -200 0 Q 0 -152 200 0 Q 0 152 -200 0 Z"/></clipPath><g clip-path="url(#ey${Math.round(x)}${Math.round(y)})"><circle r="76" fill="${dim?'#535367':'#90bdc5'}" stroke="${P.ink}" stroke-width="4"/><circle r="${pupil}" fill="${P.ink}"/><circle cx="20" cy="-24" r="12" fill="#fff" opacity="${dim?.18:.9}"/>${dry?inkPath('M -174 -12 l 48 16 l -18 26 M -142 3 l 12 -30 M 180 10 l -48 -12 l 15 -23 M 143 -1 l -10 30',3,P.red):''}${close?`<rect x="-210" y="-160" width="420" height="${160*close}" fill="${P.skin}"/><rect x="-210" y="${160*(1-close)}" width="420" height="160" fill="${P.skin}"/>`:''}</g>${inkPath('M -180 -90 Q -20 -160 163 -92',8)}`);
}
function brain(x,y,s,t,{awake=1}={}){
 let signals='';
 for(let k=0;k<7;k++){const a=k*1.93+t*1.1;signals+=`<circle cx="${Math.cos(a)*(65+17*k)}" cy="${Math.sin(a)*90-18}" r="${4+awake*4}" fill="${P.gold}" opacity="${.35+.5*Math.sin(t*2+k)**2}"/>`;}
 return at(x,y,s,0,`<path d="M -158 100 Q -220 88 -193 26 Q -242 -27 -195 -73 Q -209 -133 -150 -159 Q -125 -217 -68 -193 Q -9 -230 28 -188 Q 94 -211 119 -163 Q 190 -164 194 -100 Q 243 -62 203 -13 Q 229 40 183 67 Q 177 117 119 119 L 74 170 L 25 155 L 6 111 Q -36 148 -83 112 Q -122 139 -158 100 Z" fill="#e5b4b4" stroke="${P.ink}" stroke-width="6"/>${inkPath('M -115 -139 q 50 15 20 65 q -50 20 -30 75 q 30 27 4 64 M -47 -163 q 42 36 18 64 q -29 29 8 69 q 36 45 3 97 M 60 -151 q -23 46 12 70 q 50 4 36 45 q -33 25 -15 73 M -170 -45 q 40 -24 75 -3 M 18 -71 q 24 -21 49 -10 M -17 27 q 29 -35 72 -7 M 101 66 q 54 -33 60 -68',5,'#95666d')}${signals}`);
}
function alarm(x,y,s,t,txt='06:30',ringing=0){
 return at(x,y,s,ringing*4*Math.sin(t*40),`<path d="M -80 -80 Q -96 -138 -143 -78 L -111 -44 M 80 -80 Q 96 -138 143 -78 L 111 -44" fill="${P.nPeach}" stroke="${P.ink}" stroke-width="5"/><circle r="106" fill="${P.nYellow}" stroke="${P.ink}" stroke-width="6"/><circle r="90" fill="${P.ivory}" stroke="${P.ink}" stroke-width="3"/>${T(0,14,43,txt)}${inkPath('M -63 82 l -15 35 M 63 82 l 15 35',10)}${ringing?inkPath('M -143 -100 q -42 33 -18 73 M 143 -100 q 42 33 18 73',5,P.red):''}`);
}
function drawCut(i,t){
 const a=CUTS[i],d=CUTS[i+1]-a,u=t-a,q=cl(u/Math.max(d,.1)),p=(f,len=.35)=>prog(u,f*d,f*d+len);
 let s='';
 if(i===0||i===1){
  s+=room(t,{tired:i===1&&q>.45});
  if(i===0){s+=clockCard(405,560,'23:00',.85);s+=sticky(570,805,510,110,P.nYellow,['LICHT AUS. HANDY AN.'],-2,p(.15),{fs:36});}
  else{
   s+=clockCard(380,560,q<.35?'23:00':q<.5?'23:34':'00:00',.85);
   s+=bubble(520,785,'Noch 10 Minuten …',pop(t,a+.1),485,890,{fs:39});
   if(q>.47)s+=sticky(540,1270,760,145,P.nPeach,q>.72?['AUGEN BRENNEN · IMMER NOCH WACH']:['AUGEN BRENNEN'],1,p(.47),{fs:35});
  }
 }
 if(i===2){
  s+=horizon(t,1330)+person(280,1330,1.1,{t,aR:38,eR:105,holdR:at(0,-20,1,120,phoneProp(1)),mouth:'o',look:1});
  const labels=[['AUGEN',P.nYellow],['SCHLAF',P.nPeach],['MORGEN',P.nLilac]];
  labels.forEach(([txt,col],k)=>s+=sticky(730,560+k*260,430,190,col,[txt],k%2?3:-3,p(.08+k*.24),{fs:55}));
 }
 if(i===3){
  s+=sticky(540,510,750,145,P.nLilac,['IM DUNKELN'],-2,p(.02),{fs:52});
  s+=eye(540,900,1.65,t,{pupil:lerp(25,58,eio(p(.28,1.4)))});
  s+=arrow(540,1170,540,1070,p(.5),P.red);
  s+=sticky(540,1280,600,130,P.nYellow,['PUPILLEN WEITEN SICH'],2,p(.6),{fs:40});
 }
 if(i===4){
  s+=phone(275,720,1.03,t,{angle:-8});
  s+=eye(700,780,1.05,t,{dry:q>.38,pupil:36,close:Math.max(0,1-Math.abs((u%3)-.25)/.12)});
  s+=sticky(570,1130,790,180,q>.5?P.nPeach:P.nYellow,[q>.5?'TROCKEN · BRENNEND':'WENIGER BLINZELN'],2,p(.03),{fs:44});
  if(q>.68){s+=at(540,1320,1,0,T(2*Math.sin(t*4),0,55,'UNSCHARFER BLICK',P.ink,{op:.8}));}
 }
 if(i===5){
  s+=face(400,830,2.1,t,{tilt:25,tired:0,glow:q<.55?1:0});
  s+=`<path d="M 65 723 Q 130 669 250 772 Q 355 877 368 1042 L 98 1154 Q 48 948 65 723 Z" fill="${P.ivory}" stroke="${P.ink}" stroke-width="5"/>`;
  s+=phone(825,835,.95,t,{off:q>.53,angle:5});
  if(q>.53)s+=`<ellipse cx="454" cy="819" rx="45" ry="49" transform="rotate(25 454 819)" fill="#424255" opacity="${.8*p(.54)}"/>`;
  s+=sticky(540,1250,760,140,P.nPeach,[q>.53?'PLÖTZLICH DUNKLER':'EIN AUGE IST VERDECKT'],-2,p(.02),{fs:42});
 }
 if(i===6){
  s+=`<rect x="75" y="560" width="435" height="540" rx="10" fill="${P.nYellow}"/><rect x="570" y="560" width="435" height="540" rx="10" fill="${P.nLilac}"/>`;
  s+=eye(293,800,.9,t,{pupil:22})+eye(788,800,.9,t,{pupil:54,dim:1});
  s+=T(293,1000,35,'AN LICHT GEWÖHNT')+T(788,1000,29,'AN DUNKELHEIT GEWÖHNT');
  s+=sticky(540,1260,750,135,P.ivory,['ZWEI AUGEN. ZWEI ZUSTÄNDE.'],2,p(.2),{fs:38});
 }
 if(i===7){
  s+=phone(250,1000,1.05,t,{angle:-10})+brain(720,800,1.05,t);
  for(let k=0;k<6;k++){const v=(u*.7+k/6)%1;s+=`<circle cx="${lerp(340,650,v)}" cy="${lerp(950,820,v)-35*Math.sin(v*Math.PI)}" r="7" fill="#83b7cf" opacity="${Math.sin(v*Math.PI)}"/>`;}
  s+=bubble(640,490,'Noch Tag!',p(.35),690,590,{fs:55});
  s+=sticky(720,1200,450,150,P.nYellow,['WACH BLEIBEN'],-2,p(.68),{fs:42});
 }
 if(i===8){
  s+=brain(320,770,.95,t,{awake:.6});
  s+=sticky(760,555,430,130,P.nLilac,['MELATONIN'],2,p(.02),{fs:44});
  s+=`<rect x="677" y="690" width="165" height="340" rx="16" fill="${P.ivory}" stroke="${P.ink}" stroke-width="5"/><rect x="689" y="${1020-310*(1-.72*eio(p(.2,1.5)))}" width="141" height="${310*(1-.72*eio(p(.2,1.5)))}" rx="8" fill="${P.nLilac}"/>`;
  s+=arrow(900,740,900,1000,p(.35),P.red);
  s+=sticky(540,1250,790,160,P.nPeach,['SPÄTER EINSCHLAFEN'],-2,p(.55),{fs:49});
 }
 if(i===9){
  s+=horizon(t,1350)+person(520,1350,1.2,{t,lean:9,headTilt:15,eyes:q>.15?'closed':undefined,mouth:'flat',aL:20,eL:36,aR:10,eR:7});
  s+=alarm(245,560,.9,t,'06:30',q<.6?1:0);
  s+=sticky(775,800,400,180,P.nLilac,['MORGENS','GERÄDERT'],3,p(.35),{fs:48});
  s+=`<path d="M 481 667 q 18 10 28 0 M 520 675 q 18 10 28 0" stroke="#a78386" stroke-width="5" fill="none"/>`;
 }
 if(i===10){
  s+=phone(540,545,.61,t,{angle:-5});
  s+=sticky(785,1000,365,160,P.nPeach,['SPÄT INS BETT'],3,p(.1),{fs:43});
  s+=sticky(285,1000,365,160,P.nLilac,['MÜDE AM TAG'],-3,p(.3),{fs:43});
  s+=arrow(620,660,815,888,p(.2));s+=arrow(625,1120,450,1120,p(.43));s+=arrow(220,880,400,615,p(.6),P.red);
  s+=sticky(540,1310,770,110,P.nYellow,['ABENDS WIEDER ZUM HANDY'],1,p(.75),{fs:40});
 }
 if(i===11){
  const c=[P.nYellow,P.nPeach,P.nMint];
  for(let k=0;k<3;k++)s+=sticky(245+k*295,855,240,300,c[k],[String(k+1)],k%2?4:-4,p(k*.16,.25),{fs:140});
  s+=T(540,1200,54,'KLEIN ANFANGEN.');
 }
 if(i===12){
  s+=lamp(540,825,1.9,eout(p(.13)),t);
  s+=`<path d="M 665 720 l 30 -8" stroke="${P.ink}" stroke-width="5"/>`;
  s+=sticky(540,1280,770,145,P.nYellow,['SCHWACHES, WARMES LICHT'],-2,p(.45),{fs:42});
 }
 if(i===13){
  if(q<.53){
   const dim=eio(prog(q,.05,.22)),warm=prog(q,.23,.33);
   s+=phone(370,830,1.65,t,{bright:1-.65*dim,warm,swipe:.4});
   s+=sticky(805,620,330,150,P.nYellow,['DIMMEN'],3,p(.01),{fs:48});
   s+=`<rect x="681" y="800" width="248" height="20" rx="10" fill="#c7bea8"/><rect x="681" y="800" width="${248*(1-.75*dim)}" height="20" rx="10" fill="${P.goldSh}"/><circle cx="${681+248*(1-.75*dim)}" cy="810" r="23" fill="${P.ivory}" stroke="${P.ink}" stroke-width="4"/>`;
   s+=sticky(800,1060,345,170,P.nPeach,['NACHTMODUS'],2,p(.23),{fs:38});
  }else{
   s+=face(220,835,1.45,t,{look:1,tilt:8});s+=phone(830,835,1.25,t,{bright:.4,warm:1,angle:4});
   const r=prog(q,.53,.72);
   s+=`<path d="M 395 1100 H ${395+330*r}" stroke="${P.ink}" stroke-width="4"/><path d="M 395 1078 V 1122 M 725 1078 V 1122" stroke="${P.ink}" stroke-width="4"/>`;
   for(let k=0;k<12;k++)if(k/12<r)s+=inkPath(`M ${405+k*28} 1100 v ${k%3?14:23}`,3);
   s+=sticky(560,1270,620,150,P.nMint,['ETWA 40 CM ABSTAND'],-2,prog(q,.57,.63),{fs:42});
  }
 }
 if(i===14){
  s+=alarm(540,840,1.8,t,'22:30',q>.5&&q<.67?1:0);
  s+=sticky(540,520,780,150,P.nPeach,['FESTE SCHLUSSZEIT'],-2,p(.03),{fs:49});
  s+=sticky(540,1250,760,150,P.nYellow,['30 MINUTEN VOR DEM SCHLAF'],2,p(.25),{fs:40});
 }
 if(i===15){
  const move=eio(p(.2,1.4)),xx=lerp(535,860,move),yy=lerp(810,1163,move);
  s+=alarm(240,625,.72,t,'22:30',q<.2?1:0);
  s+=`<rect x="681" y="1220" width="310" height="28" rx="4" fill="#b69e80" stroke="${P.ink}" stroke-width="5"/><path d="M 705 1248 V 1370 M 968 1248 V 1370" stroke="${P.ink}" stroke-width="9"/>`;
  s+=phone(xx,yy,.67,t,{off:q>.3,angle:lerp(-6,90,move),swipe:0});
  s+=person(260,1360,1.03,{t,aR:lerp(40,6,move),eR:lerp(110,4,move),mouth:'smile',look:1});
  if(q>.65)s+=stampOk(865,1000,.75,p(.65));
 }
 if(i===16){
  s+=room(t,{sleep:1,light:cl(1-p(.7,.5))*.55});
  s+=clockCard(430,540,'22:30',.72);
  s+=sticky(540,780,700,160,P.nMint,['FEIERABEND FÜR DIE AUGEN'],-2,p(.08),{fs:40});
  s+=phone(157,950,.28,t,{off:1,angle:90,swipe:0});
  if(q>.2)for(let k=0;k<3;k++){const z=(u*.32+k*.33)%1;s+=at(430+z*70,940-z*100,.35+.4*z,0,T(0,0,60,'z',P.inkSoft,{op:1-z}));}
 }
 if(i===17){
  s+=horizon(t,1360)+person(245,1360,1.12,{t,aR:60,eR:35,mouth:'talk',look:1});
  s+=sticky(690,600,590,270,P.nYellow,['WIE LANGE HAST DU','GESTERN GESCROLLT?'],-3,p(.02),{fs:45});
  s+=bubble(740,1040,'23 Uhr …',p(.22),730,1130,{fs:46});
  if(q>.5)s+=bubble(750,1230,'Oder später?',p(.5),630,1310,{fs:40});
  s+=arrow(780,1335,780,1390,p(.68),P.red);
 }
 return s;
}
function scene(t){
 const i=t>=CUTS[18]?17:Math.max(0,CUTS.findIndex((v,k)=>k<18&&t>=v&&t<CUTS[k+1]));
 return paperDefs()+paperBG(t)+drawCut(i,t)+topicTag('NACHTS AM HANDY',1,t)+srcTag(TAGS[i],prog(t,CUTS[i],CUTS[i]+.2))+paperVig();
}
export const __scene=scene;
export function renderSvg(t){return DEFS+scene(t);}
export function subtitleAt(t){return '';}
