// @ts-nocheck
// AUTO-GENERATED scene for v13. Change it by commenting on the issue.
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
// headphones drawn around a head at origin of person head coords (in person units)
const headphones = (col = '#e05a4a') => `<path d="M -50 -586 Q -54 -668 0 -668 Q 54 -668 50 -586" stroke="${P.ink}" stroke-width="16" fill="none"/><path d="M -50 -586 Q -54 -668 0 -668 Q 54 -668 50 -586" stroke="${col}" stroke-width="9" fill="none"/>
  <rect x="-66" y="-600" width="26" height="54" rx="10" fill="${col}" stroke="${P.ink}" stroke-width="3.5"/><rect x="40" y="-600" width="26" height="54" rx="10" fill="${col}" stroke="${P.ink}" stroke-width="3.5"/>`;
// sound waves: arcs from (x,y) direction dir (1 right, -1 left)
function waves(t, x, y, dir, n, amp, col, o = {}) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const ph = ((t * (o.speed || 1.2) + i / n) % 1), r = 30 + ph * (o.R || 180);
    s += `<path d="M ${x + dir * r * .6} ${y - r * .8} Q ${x + dir * r * 1.05} ${y} ${x + dir * r * .6} ${y + r * .8}" stroke="${col}" stroke-width="${o.w || 7}" fill="none" stroke-linecap="round" opacity="${amp * (1 - ph)}"/>`;
  }
  return s;
}
// jagged "tinnitus" zigzag line
function zig(t, x0, y, len, amp, col, w = 5, f = 22) {
  let d = `M ${x0} ${y}`;
  for (let i = 1; i <= f; i++) d += ` L ${x0 + len * i / f} ${y + (i % 2 ? -1 : 1) * amp * (.6 + .4 * hash(i + Math.floor(t * 12)))}`;
  return `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`;
}

// ===== v13 "Jeden Tag zuckerfreie Cola – was passiert?" — paper / sticky-note explainer style =====

// ---------- props ----------
// generic soda can (no brand): centre x,y (middle of can), s scale. o: col, label, tilt, open
function can(x, y, s, o = {}) {
  const col = o.col || '#2a2a30', band = o.band || '#d6402f';
  return `<g transform="translate(${x} ${y}) rotate(${o.tilt || 0}) scale(${s})">
    <ellipse cx="0" cy="118" rx="70" ry="12" fill="#3a2a14" opacity=".15"/>
    <path d="M -62 -96 Q -66 -110 -52 -118 L 52 -118 Q 66 -110 62 -96 L 62 96 Q 66 110 52 118 L -52 118 Q -66 110 -62 96 Z" fill="${col}" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -62 -20 Q 0 -44 62 -20 L 62 22 Q 0 0 -62 22 Z" fill="${band}" stroke="${P.ink}" stroke-width="3"/>
    <rect x="-50" y="-108" width="10" height="200" rx="5" fill="#fff" opacity=".22"/>
    <ellipse cx="0" cy="-118" rx="52" ry="10" fill="#c9ccd2" stroke="${P.ink}" stroke-width="5"/>
    ${o.open ? `<ellipse cx="14" cy="-118" rx="14" ry="5" fill="#1d1f24"/>` : `<rect x="-10" y="-122" width="30" height="8" rx="4" fill="#9aa0a8"/>`}
    ${o.label !== '' ? T(0, 78, 70, o.label ?? '0', '#fff') : ''}</g>`;
}
function glassW(x, y, s, fill = 1, col = '#a9d6f2') {
  const h = 200 * fill;
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -60 -110 L -48 100 L 48 100 L 60 -110 Z" fill="#eef7fd" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/>
    <clipPath id="gw${Math.round(x)}"><path d="M -60 -110 L -48 100 L 48 100 L 60 -110 Z"/></clipPath><g clip-path="url(#gw${Math.round(x)})"><rect x="-70" y="${100 - h}" width="140" height="${h}" fill="${col}" opacity=".85"/></g>
    <path d="M -40 -80 L -32 70" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity=".7"/></g>`;
}
function teaCup(x, y, s, t) {
  let st = ''; for (let i = 0; i < 3; i++) st += `<path d="M ${-30 + i * 30} -70 q ${10 * Math.sin(t * 3 + i)} -25 0 -50 q ${-10 * Math.sin(t * 3 + i)} -25 0 -50" stroke="${P.inkSoft}" stroke-width="5" fill="none" stroke-linecap="round" opacity=".6"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${st}<path d="M -80 -60 L 80 -60 Q 76 50 0 60 Q -76 50 -80 -60 Z" fill="#f4efe2" stroke="${P.ink}" stroke-width="6"/>
    <ellipse cx="0" cy="-60" rx="80" ry="14" fill="#c98a4a" stroke="${P.ink}" stroke-width="5"/><path d="M 78 -40 q 50 0 40 40 q -10 26 -46 22" stroke="${P.ink}" stroke-width="8" fill="none"/>
    <ellipse cx="0" cy="70" rx="110" ry="14" fill="#e8e0cc" stroke="${P.ink}" stroke-width="5"/></g>`;
}
function tooth(x, y, s, wear = 0, t = 0) {
  let spots = '';
  for (let i = 0; i < 7; i++) { const p = cl(wear * 7 - i); if (p > 0) spots += `<ellipse cx="${-60 + hash(i + 3) * 120}" cy="${-110 + hash(i + 8) * 120}" rx="${16 * p}" ry="${11 * p}" fill="#d9c27a" stroke="${P.ink}" stroke-width="2.5" opacity=".85"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})"><g filter="url(#pkSh2)"><path d="M -110 -120 Q -120 -190 -50 -180 Q 0 -165 50 -180 Q 120 -190 110 -120 Q 110 -40 80 30 L 60 150 Q 50 180 30 150 L 12 60 Q 0 44 -12 60 L -30 150 Q -50 180 -60 150 L -80 30 Q -110 -40 -110 -120 Z" fill="#fffdf6" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/></g>
    <path d="M -80 -140 Q -60 -165 -30 -158" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round"/>${spots}
    ${wear > .6 ? `<path d="M 40 -170 l -12 40 l 18 22 l -14 40" stroke="${P.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>` : ''}</g>`;
}
function scaleIcon(x, y, s, needle) { // bathroom scale; needle -1..1
  return `<g transform="translate(${x} ${y}) scale(${s})"><g filter="url(#pkSh2)"><rect x="-140" y="-90" width="280" height="180" rx="40" fill="#e8e4da" stroke="${P.ink}" stroke-width="6"/></g>
    <path d="M -80 -10 A 80 80 0 0 1 80 -10" fill="#fff" stroke="${P.ink}" stroke-width="5"/>
    ${[-60, -30, 0, 30, 60].map(a => `<path d="M ${Math.sin(a * Math.PI / 180) * 66} ${-10 - Math.cos(a * Math.PI / 180) * 66} L ${Math.sin(a * Math.PI / 180) * 78} ${-10 - Math.cos(a * Math.PI / 180) * 78}" stroke="${P.ink}" stroke-width="4"/>`).join('')}
    <path d="M 0 -10 L ${Math.sin(needle * 1.1) * 62} ${-10 - Math.cos(needle * 1.1) * 62}" stroke="${P.red}" stroke-width="7" stroke-linecap="round"/><circle cx="0" cy="-10" r="9" fill="${P.ink}"/></g>`;
}
function dropIcon(x, y, s, col = P.red) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 0 -70 C 30 -30 50 0 50 24 A 50 50 0 0 1 -50 24 C -50 0 -30 -30 0 -70 Z" fill="${col}" stroke="${P.ink}" stroke-width="6"/><path d="M -22 20 q 0 20 18 28" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" opacity=".6"/></g>`; }
function brainIcon(x, y, s, glow = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s})">${glow > 0 ? `<ellipse rx="190" ry="150" fill="#ff9aa8" opacity="${.35 * glow}" filter="url(#blur20)"/>` : ''}
    <path d="M -150 20 C -180 -60 -120 -130 -50 -120 C -20 -160 60 -160 90 -110 C 160 -110 190 -40 160 20 C 180 70 130 120 70 110 C 40 140 -30 140 -60 110 C -120 120 -170 80 -150 20 Z" fill="#f7b7c0" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -100 -40 q 30 -30 60 0 q 30 30 60 -10 M -110 40 q 40 -20 70 10 q 30 30 70 0 q 30 -20 60 10 M 0 -120 q -10 40 10 70 M 60 -80 q 30 20 60 0" stroke="${P.ink}" stroke-width="5" fill="none" stroke-linecap="round"/></g>`;
}
function gearI(x, y, r, a, col) { let d = ''; for (let i = 0; i < 9; i++) d += `<rect x="-11" y="${-r - 18}" width="22" height="26" rx="4" fill="${col}" stroke="${P.ink}" stroke-width="4" transform="rotate(${a + i * 40})"/>`; return `<g transform="translate(${x} ${y})">${d}<circle r="${r}" fill="${col}" stroke="${P.ink}" stroke-width="5"/><circle r="${r * .35}" fill="${P.paper}" stroke="${P.ink}" stroke-width="4"/></g>`; }
function magnifier(x, y, s, inner = '') { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 70 70 L 150 150" stroke="${P.ink}" stroke-width="34" stroke-linecap="round"/><path d="M 70 70 L 150 150" stroke="#8a5a3a" stroke-width="24" stroke-linecap="round"/>
  <circle r="100" fill="#eef7fd" opacity=".55" stroke="${P.ink}" stroke-width="8"/>${inner}<path d="M -60 -40 q 20 -30 50 -40" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/></g>`; }
function bact(x, y, s, col, a) { return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><rect x="-26" y="-11" width="52" height="22" rx="11" fill="${col}" stroke="${P.ink}" stroke-width="3"/><path d="M 26 0 q 10 -8 18 0" stroke="${P.ink}" stroke-width="3" fill="none"/></g>`; }
function arrowD(x1, y1, x2, y2, p, t, i, col = P.ink) {
  if (p <= 0) return '';
  const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
  const mx = (x1 + x) / 2 + boil(t, i, 2) + (y - y1) * .08, my = (y1 + y) / 2 + boil(t, i + 3, 2);
  return `<path d="M ${x1} ${y1} Q ${mx} ${my} ${x} ${y}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round"/>${p > .7 ? `<path d="M ${x - 26 * Math.cos(a - .5)} ${y - 26 * Math.sin(a - .5)} L ${x} ${y} L ${x - 26 * Math.cos(a + .5)} ${y - 26 * Math.sin(a + .5)}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`;
}
const bigRed = (x, y, txt, p, fs = 96, rot = -3) => p > 0 ? at(x, y, back(p), rot, T(0, fs * .35, fs, txt, P.red, { st: '#fff8ea', sw: 10 })) : '';
function yogurt(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -70 -70 L 70 -70 L 56 80 L -56 80 Z" fill="#fff" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/><rect x="-76" y="-90" width="152" height="24" rx="6" fill="#bcd8f0" stroke="${P.ink}" stroke-width="5"/><circle cx="0" cy="10" r="28" fill="#f4a7b9" stroke="${P.ink}" stroke-width="4"/></g>`; }
function gum(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-90" y="-50" width="180" height="100" rx="14" fill="${P.nMint}" stroke="${P.ink}" stroke-width="6"/><rect x="-60" y="-50" width="30" height="100" fill="#fff" opacity=".6"/><rect x="20" y="-50" width="30" height="100" fill="#fff" opacity=".6"/></g>`; }
function candy(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -60 0 L -110 -40 L -110 40 Z M 60 0 L 110 -40 L 110 40 Z" fill="${P.nPeach}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><circle r="62" fill="${P.redSoft}" stroke="${P.ink}" stroke-width="6"/><path d="M -40 -20 q 40 -40 80 0" stroke="#fff" stroke-width="10" fill="none" opacity=".6" stroke-linecap="round"/></g>`; }

// ---------- scenes ----------
function s0(t) { // 0–6.4 can, 0 Zucker, 0 Kalorien, every day?
  let s = '';
  const cp = pop(t, 1.0, .35);
  if (cp > 0) s += can(330, 700, 1.75 * cp, { label: '0', tilt: -6 + 3 * Math.sin(t * 2) });
  s += bigRed(740, 560, '0 ZUCKER', prog(t, 1.46, 1.75), 84, -4);
  s += bigRed(740, 720, '0 KALORIEN', prog(t, 2.64, 2.95), 74, -2);
  const days = ['MO', 'DI', 'MI', 'DO', 'FR'];
  for (let i = 0; i < 5; i++) {
    const p = pop(t, 3.84 + i * .12, .3);
    if (p > 0) s += can(150 + i * 195, 1170, .78 * p, { label: '0', tilt: (i - 2) * 3 }) + T(150 + i * 195, 1330, 40, days[i], P.inkSoft, { op: p });
  }
  s += sticky(780, 930, 420, 190, P.nYellow, ['JEDEN TAG', 'OK?'], 4, prog(t, 5.02, 5.3), { fs: 56 });
  s += at(560, 930, pop(t, 5.82, .3), 10, T(0, 0, 120, '?', P.red, { st: P.ink, sw: 7 }));
  s += titleBurst(t, 0, 1.14, ['ZUCKERFREIE', 'COLA?'], { y: 820, w: 820, fs: 92 });
  return s;
}
function s1(t) { // 6.4–8.52 what does it do with your body?
  let s = horizon(t, 1340);
  const lift = back(prog(t, 6.45, 6.8));
  s += person(430, 1340, 1.22, { t, aR: lerp(6, 105, lift), eR: lerp(4, 70, lift), holdR: `<g transform="rotate(${-60 * lift})">${can(0, -10, .42, { label: '0', open: true })}</g>`, mouth: 'flat', lookY: .3 });
  const q = pop(t, 7.74, .3);
  if (q > 0) s += `<circle cx="430" cy="${1340 - 1.22 * 400}" r="${110 * q}" fill="none" stroke="${P.red}" stroke-width="7" stroke-dasharray="18 12"/>` + magnifier(760, 760, .9 * q, T(0, 50, 150, '?', P.red, { st: P.ink, sw: 7 }));
  s += sticky(800, 1120, 360, 150, P.nLilac, ['KÖRPER?'], -4, prog(t, 7.74, 8.0), { fs: 58 });
  return s;
}
function s2(t) { // 8.52–16.88 WHO review 2022
  let s = srcTag('WHO · 2022', prog(t, 8.52, 8.85));
  s += quoteCard(540, 490, 920, 280, prog(t, 8.6, 9.0), [
    [['Studien zu ', 0], ['Süßstoffen', prog(t, 13.0, 13.4)]],
    [['zwei ', 0], ['widersprüchliche', prog(t, 14.78, 15.3)], [' Ergebnisse', 0]]], '— Rios-Leyvraz & Montez (WHO, 2022)', { fs: 54, top: 122 });
  // folder collects studies
  const fp = pop(t, 10.4, .35);
  if (fp > 0) {
    s += at(540, 1010, fp, 0, `<g filter="url(#pkSh)"><path d="M -200 -120 L -60 -120 L -30 -90 L 200 -90 L 200 120 L -200 120 Z" fill="#e3b866" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/></g>`);
    for (let i = 0; i < 7; i++) {
      const t0 = 12.28 + i * .2, p = eio(prog(t, t0, t0 + .45));
      if (t < t0) continue;
      const sx = i % 2 ? 1150 : -100, sy = 700 + hash(i) * 600;
      const x = lerp(sx, 540 + (i - 3) * 8, p), y = lerp(sy, 960 - i * 6, p);
      s += `<g transform="translate(${x} ${y}) rotate(${(1 - p) * (i % 2 ? 60 : -60) + (i - 3) * 3})"><rect x="-120" y="-80" width="240" height="160" fill="${P.ivory}" stroke="${P.ink}" stroke-width="4"/>${[0, 1, 2, 3].map(k => `<path d="M -90 ${-46 + k * 30} H ${60 - k * 14}" stroke="${P.inkSoft}" stroke-width="6" stroke-linecap="round" opacity=".5"/>`).join('')}</g>`;
    }
    s += at(540, 1010, fp, 0, `<path d="M -200 -40 L 200 -40 L 210 120 L -210 120 Z" fill="#f0c977" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/>`);
  }
  // two contradicting arrows
  const ap = prog(t, 14.48, 14.9);
  if (ap > 0) {
    s += arrowD(430, 1180, 170, 1320, ap, t, 3, '#2f9a63') + arrowD(650, 1180, 910, 1320, ap, t, 7, P.red);
    s += at(540, 1300, pop(t, 15.0, .3), 0, T(0, 30, 110, '≠', P.ink));
  }
  return s;
}
function s3(t) { // 16.88–27.56 short term vs long term
  let s = `<path d="M 540 400 V ${lerp(400, 1360, eout(prog(t, 16.9, 17.4)))}" stroke="${P.ink}" stroke-width="3" stroke-dasharray="14 12" opacity=".5"/>`;
  s += sticky(275, 500, 440, 220, P.nMint, ['KURZFRISTIG:', 'LEICHT', 'ABNEHMEN'], -3, prog(t, 16.88, 17.2), { fs: 44 });
  const sp = pop(t, 18.4, .35);
  const needle = t < 20.48 ? .3 : lerp(.3, -.5, eout(prog(t, 20.48, 21.0)));
  if (sp > 0) s += scaleIcon(275, 1170, 1.4 * sp, needle) + (t > 20.6 ? at(380, 840, pop(t, 20.6, .3), 0, `<path d="M 0 -60 V 40 M -34 6 L 0 44 L 34 6" stroke="#2f9a63" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`) : '');
  if (sp > 0) s += can(210, 840, .85 * sp, { label: '0' });
  s += sticky(805, 500, 440, 260, P.nPeach, ['LANGFRISTIG:', 'MEHR', 'ÜBERGEWICHT', '+ DIABETES'], 3, prog(t, 21.6, 21.92), { fs: 40 });
  // heavy drinker gets wider
  const pp = pop(t, 22.5, .35);
  if (pp > 0) {
    const w = 1 + .32 * eout(prog(t, 24.04, 24.7));
    s += `<g transform="translate(760 1350) scale(${w * pp} ${pp})">${person(0, 0, .95, { t, mouth: 'flat', look: -.3, aL: 16, aR: 14, eR: 70, holdR: can(0, -10, .36, { label: '0' }) })}</g>`;
    for (let i = 0; i < 6; i++) { const p = pop(t, 22.82 + i * .1, .25); if (p > 0) s += can(660 + (i % 3) * 52 + (i > 2 ? 26 : 0), 1290 - (i > 2 ? 70 : 0), .3 * p, { label: '0' }); }
  }
  s += at(960, 780, pop(t, 26.0, .3), 0, dropIcon(0, 0, .9) + T(0, 30, 34, 'TYP 2', '#fff'));
  return s;
}
function s4(t) { // 27.56–32.56 reverse causation
  let s = horizon(t, 1340);
  s += sticky(540, 470, 640, 190, P.gold, ['UMGEKEHRTE', 'URSACHE'], -2, prog(t, 28.28, 28.6), { fs: 60 });
  // flip arrows
  const fl = eio(prog(t, 28.5, 29.0));
  s += at(540, 640, pop(t, 28.3, .3), 0, `<g transform="scale(${1 - 2 * fl} 1)"><path d="M -180 0 H 160" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/><path d="M 130 -30 L 168 0 L 130 30" stroke="${P.ink}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>
    ${T(-290, 18, 46, 'LIGHT', P.ink)}${T(330, 18, 46, 'KG ↑', P.red)}`);
  const pick = back(prog(t, 31.12, 31.5));
  s += `<g transform="translate(340 1340) scale(1.22 1)">${person(0, 0, .98, { t, hairStyle: 'long', top: '#7a5aa0', mouth: t > 30.84 && t < 32.4 ? 'talk' : 'smile', aR: lerp(6, 70, pick), eR: lerp(4, 50, pick), holdR: pick > .1 ? can(0, -10, .4, { label: 'L', col: '#d8dde4', band: '#4a90c8' }) : '', look: .4 })}</g>`;
  s += bubble(690, 880, 'Lieber light!', pop(t, 30.84, .3), 470, 960);
  // shelf of light cans
  for (let i = 0; i < 3; i++) s += can(760 + i * 110, 1240, .48 * pop(t, 29.6 + i * .1, .3) + .0001, { label: 'L', col: '#d8dde4', band: '#4a90c8' });
  return s;
}
function s5(t) { // 32.56–35.1 researchers found something else
  let s = horizon(t, 1340);
  s += `<rect x="560" y="1110" width="420" height="24" fill="#b88a62" stroke="${P.ink}" stroke-width="4"/><path d="M 600 1134 V 1340 M 940 1134 V 1340" stroke="${P.ink}" stroke-width="8"/>`;
  s += can(700, 1000, .7, { label: '0' }) + glassW(860, 1020, .6, .6, '#5a3a2a');
  const sweep = eio(prog(t, 32.7, 33.9));
  const mx = lerp(620, 900, sweep);
  s += person(330, 1340, 1.15, { t, top: P.coat, mouth: t > 34.1 ? 'o' : 'flat', brow: t > 34.1 ? 1 : 0, look: .8, aR: 70, eR: 20 });
  s += magnifier(mx, 900 + 20 * Math.sin(sweep * 6), .75, '');
  s += at(760, 640, pop(t, 34.12, .3), 6, T(0, 40, 200, '!', P.red, { st: P.ink, sw: 9 }));
  return s;
}
function s6(t) { // 35.1–43.5 Yale 2017
  let s = srcTag('YALE · 2017', prog(t, 35.1, 35.45));
  s += quoteCard(540, 480, 920, 270, prog(t, 35.2, 35.6), [
    [['Süß', prog(t, 38.92, 39.2)], [' passt nicht zu ', 0], ['Kalorien', prog(t, 40.3, 40.7)]],
    [['→ Zucker ', 0], ['schlechter', prog(t, 42.54, 42.9)], [' verarbeitet', 0]]], '— Veldhuizen u. a. (Current Biology, 2017)', { fs: 50, top: 118 });
  // balance: sweet vs calories
  const bp = pop(t, 37.4, .35);
  if (bp > 0) {
    const tilt = t < 39.66 ? 0 : 16 * eout(prog(t, 39.66, 40.2)) + 2 * Math.sin((t - 39.66) * 6) * Math.exp(-(t - 39.66) * 2);
    const L = [-230 * Math.cos(tilt * Math.PI / 180), 230 * Math.sin(tilt * Math.PI / 180)];
    s += at(540, 940, bp, 0, `<path d="M 0 0 V 220 M -90 230 H 90" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/>
      <g transform="rotate(${-tilt})"><path d="M -230 0 H 230" stroke="${P.ink}" stroke-width="9" stroke-linecap="round"/></g><circle r="14" fill="${P.ink}"/>
      <g transform="translate(${L[0]} ${L[1]})"><path d="M 0 0 L -70 90 M 0 0 L 70 90" stroke="${P.ink}" stroke-width="3"/><path d="M -90 90 Q 0 130 90 90 Z" fill="#c9b994" stroke="${P.ink}" stroke-width="5"/>
        <rect x="-36" y="34" width="44" height="44" fill="#fff" stroke="${P.ink}" stroke-width="4" transform="rotate(-8)"/><rect x="0" y="40" width="44" height="44" fill="#fff" stroke="${P.ink}" stroke-width="4" transform="rotate(6)"/>${T(0, 150, 40, 'SÜSS', P.ink)}</g>
      <g transform="translate(${-L[0]} ${-L[1]})"><path d="M 0 0 L -70 90 M 0 0 L 70 90" stroke="${P.ink}" stroke-width="3"/><path d="M -90 90 Q 0 130 90 90 Z" fill="#c9b994" stroke="${P.ink}" stroke-width="5"/>${T(0, 80, 54, '0', P.red)}${T(0, 150, 40, 'KCAL', P.ink)}</g>`);
  }
  // body processes sugar worse: gears slow down
  const gp = pop(t, 41.16, .35);
  if (gp > 0) {
    const slow = eout(prog(t, 42.54, 43.3));
    const ang = (t - 41.16) * 120 * (1 - .85 * slow);
    s += at(540, 1260, gp, 0, gearI(-70, 0, 46, ang, '#c9d6e3') + gearI(46, -6, 34, -ang * 1.35 + 20, '#e8c27a'));
    if (slow > .2) { for (let i = 0; i < 3; i++) { const p = ((t * .8 + i / 3) % 1); s += `<circle cx="${560 + 20 * Math.sin(p * 6 + i)}" cy="${1200 - p * 120}" r="${10 + 16 * p}" fill="#8a8a8a" opacity="${.5 * (1 - p) * slow}"/>`; } }
  }
  return s;
}
function s7(t) { // 43.5–50.44 sweet signal flow
  let s = '';
  const N = [[300, 440, P.nYellow, ['SÜSS'], 43.5, -4], [740, 640, P.nLilac, ['GEHIRN:', 'ENERGIE KOMMT!'], 45.02, 3], [300, 860, P.nPeach, ['KEINE', 'KALORIEN'], 46.7, -3], [740, 1070, P.nMint, ['GEHIRN', 'GETÄUSCHT'], 47.98, 4], [320, 1290, '#f6b7b0', ['MEHR HUNGER'], 49.24, -2]];
  N.forEach(([x, y, c, l, t0, r], i) => {
    if (i > 0) { const [px, py] = N[i - 1]; s += arrowD(px + (x > px ? 160 : -160), py + 30, x + (x > px ? -200 : 200), y - 20, eio(prog(t, t0 - .5, t0 - .05)), t, i * 5); }
    s += sticky(x, y, 420, l.length > 1 ? 180 : 140, c, l, r, prog(t, t0, t0 + .3), { fs: 46 });
  });
  s += brainIcon(960, 470, .45 * pop(t, 45.3, .3) + .0001, prog(t, 45.4, 45.8) * (1 - prog(t, 47.8, 48.2)));
  if (t > 47.98) s += at(960, 380, pop(t, 48.0, .3), 10, T(0, 0, 80, '?!', P.red, { st: P.ink, sw: 6 }));
  // rumbling stomach
  const hp = pop(t, 49.5, .3);
  if (hp > 0) { const w = 3 * Math.sin(t * 40) * (1 - prog(t, 50, 50.4)); s += at(760 + w, 1290, hp, 0, `<ellipse rx="120" ry="80" fill="${P.skin}" stroke="${P.ink}" stroke-width="6"/><path d="M -60 0 q 20 -20 40 0 t 40 0 t 40 0" stroke="${P.ink}" stroke-width="5" fill="none"/>`) + T(900 + w, 1200, 44, 'GRRR', P.red, { op: hp }); }
  return s;
}
function s8(t) { // 50.44–56.5 Suez 2022: 2 weeks, under the limit
  let s = srcTag('CELL · 2022', prog(t, 50.44, 50.8));
  s += quoteCard(540, 470, 900, 230, prog(t, 50.5, 50.9), [[['120 Gesunde', prog(t, 52.08, 52.4)], [' · ', 0], ['2 Wochen', prog(t, 52.92, 53.3)]]], '— Suez u. a. (Cell, 2022)', { fs: 60, top: 110 });
  // calendar 14 days
  const cp = pop(t, 52.7, .35);
  if (cp > 0) {
    let g = `<g filter="url(#pkSh2)"><rect x="-350" y="-140" width="700" height="280" rx="14" fill="#fff"/></g><rect x="-350" y="-140" width="700" height="60" rx="14" fill="${P.red}"/><rect x="-350" y="-140" width="700" height="280" rx="14" fill="none" stroke="${P.ink}" stroke-width="5"/>`;
    for (let i = 0; i < 14; i++) {
      const cx = -300 + (i % 7) * 100, cy = -30 + Math.floor(i / 7) * 90;
      g += `<rect x="${cx - 36}" y="${cy - 34}" width="72" height="68" rx="8" fill="none" stroke="${P.ink}" stroke-width="2.5" opacity=".5"/>`;
      const k = prog(t, 53.0 + i * .08, 53.18 + i * .08);
      if (k > 0) g += `<g transform="translate(${cx} ${cy}) scale(${back(k)})"><circle r="20" fill="#fff" stroke="${P.ink}" stroke-width="4"/><path d="M -10 0 H 10" stroke="${P.ink}" stroke-width="3"/></g>`;
    }
    s += at(540, 820, cp, 0, g);
  }
  // daily limit gauge
  const lp = pop(t, 54.4, .35);
  if (lp > 0) {
    const f = eout(prog(t, 54.86, 55.6)) * .55;
    s += at(470, 1150, lp, 0, `<rect x="-330" y="-34" width="660" height="68" rx="34" fill="#fff" stroke="${P.ink}" stroke-width="5"/><rect x="-324" y="-28" width="${648 * f}" height="56" rx="28" fill="#7cc39b"/>
      <path d="M ${-330 + 660 * .85} -60 V 60" stroke="${P.red}" stroke-width="7" stroke-dasharray="10 8"/>${T(-330 + 660 * .85, -76, 38, 'MAX', P.red)}`);
  }
  s += sticky(800, 1300, 420, 140, P.nMint, ['UNTER DEM LIMIT'], 3, prog(t, 55.58, 55.85), { fs: 40 });
  return s;
}
function s9(t) { // 56.5–64.22 results: gut bacteria, blood sugar
  let s = '';
  s += sticky(540, 440, 640, 150, P.nYellow, ['SACCHARIN · SUCRALOSE'], -2, prog(t, 57.53, 57.85), { fs: 46 });
  // gut bacteria petri
  const gp = pop(t, 58.6, .35);
  if (gp > 0) {
    const ch = eout(prog(t, 59.0, 59.8));
    let b = '';
    for (let i = 0; i < 12; i++) {
      const good = i % 3 !== 0;
      const col = ch > hash(i) ? (good ? '#c79a6a' : '#b16a8a') : (good ? '#7cc39b' : '#9ec7e8');
      b += bact(-90 + hash(i * 3) * 180, -80 + hash(i * 5) * 160, .9 + .4 * hash(i), col, hash(i * 7) * 180 + 20 * Math.sin(t * 2 + i));
    }
    s += at(280, 790, gp, 0, `<g filter="url(#pkSh2)"><circle r="160" fill="#f7efe6"/></g><circle r="160" fill="none" stroke="${P.ink}" stroke-width="6"/><circle r="140" fill="none" stroke="${P.ink}" stroke-width="2" opacity=".4"/>${b}`);
  }
  s += sticky(770, 760, 420, 200, P.nLilac, ['DARMBAKTERIEN', 'VERÄNDERT'], 3, prog(t, 59.78, 60.05), { fs: 42 });
  // blood sugar curves
  const cp = pop(t, 60.64, .3);
  if (cp > 0) {
    const x0 = 120, y0 = 1330, W = 560, H = 290;
    let c = hline(x0, y0, x0 + W, y0, t, 3, P.ink, 4) + hline(x0, y0, x0, y0 - H - 10, t, 4, P.ink, 4);
    const curve = (k, amp, col, dash) => { let d = ''; const n = 40; for (let i = 0; i <= n * k; i++) { const u = i / n; const v = Math.exp(-Math.pow((u - .35) / .18, 2)) * amp + .12; d += `${i ? 'L' : 'M'} ${x0 + u * W} ${y0 - v * H}`; } return d ? `<path d="${d}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"${dash ? ' stroke-dasharray="14 10"' : ''}/>` : ''; };
    c += curve(eio(prog(t, 61.1, 61.9)), .5, '#8a8578', true) + curve(eio(prog(t, 62.26, 63.1)), .82, P.red, false);
    c += T(x0 + W * .35, y0 - H * .62, 30, 'VORHER', '#8a8578', { op: prog(t, 61.9, 62.1) });
    c += T(x0 + W * .35, y0 - H * .98, 34, 'NACHHER', P.red, { op: prog(t, 63.1, 63.3) });
    s += `<g opacity="${cp}">${c}</g>`;
  }
  s += sticky(860, 1180, 340, 220, '#f6b7b0', ['BLUT-', 'ZUCKER', 'HÖHER'], 4, prog(t, 62.64, 62.92), { fs: 44, extra: dropIcon(130, -80, .35) });
  return s;
}
function s10(t) { // 64.22–69.36 WHO 2023 advises against
  let s = srcTag('WHO · 2023', prog(t, 64.22, 64.6));
  s += scaleIcon(540, 1150, 1.2 * pop(t, 64.4, .35) + .0001, .2 * Math.sin(t * 3));
  const rp = prog(t, 64.98, 65.3);
  s += bigRed(540, 640, 'ZUM ABNEHMEN?', rp, 92, -2);
  const strike = eio(prog(t, 66.36, 66.8));
  if (strike > 0) s += `<path d="M 120 ${660} L ${120 + 820 * strike} ${610}" stroke="${P.ink}" stroke-width="16" stroke-linecap="round"/>`;
  s += sticky(540, 860, 640, 200, P.nPeach, ['WHO 2023:', 'NICHT ZUM ABNEHMEN'], 2, prog(t, 66.94, 67.25), { fs: 46 });
  s += stampX(860, 1080, .6, prog(t, 68.14, 68.4));
  return s;
}
function s11(t) { // 69.36–75.74 teeth & acid
  let s = '';
  const tp = pop(t, 69.76, .35);
  const wear = eio(prog(t, 73.34, 75.2));
  if (tp > 0) s += at(730, 830, tp * (1 + .03 * Math.sin(t * 2)), 0, tooth(0, 0, 1.25, wear, t));
  const cp = pop(t, 70.34, .35);
  if (cp > 0) s += can(260, 820, 1.25 * cp, { label: '0', open: true, tilt: 10 * eout(prog(t, 72.0, 72.4)) });
  // acid drops travel can -> tooth
  if (t > 72.0) for (let i = 0; i < 8; i++) { const p = ((t - 72.0) * .9 + i / 8) % 1; const x = lerp(320, 640, p), y = 700 - 120 * Math.sin(p * Math.PI) + 40 * p; s += `<g transform="translate(${x} ${y}) scale(${.4 + .2 * Math.sin(i)})">${dropIcon(0, 0, 1, '#a6d86a')}</g>`; }
  s += sticky(270, 1160, 400, 150, P.nLilac, ['SÄURE'], -4, prog(t, 72.42, 72.7), { fs: 60 });
  // sip counter: little sip marks appear repeatedly
  if (t > 72.82) for (let i = 0; i < 6; i++) { const p = pop(t, 72.9 + i * .22, .2); if (p > 0) s += at(120 + i * 60, 1300, p, 0, `<path d="M -16 -20 q 16 30 32 0" stroke="${P.ink}" stroke-width="5" fill="none"/><circle cx="0" cy="-30" r="7" fill="#a6d86a" stroke="${P.ink}" stroke-width="2"/>`); }
  s += sticky(790, 1200, 420, 150, P.nPeach, ['ZAHNSCHMELZ'], 3, prog(t, 74.44, 74.72), { fs: 50 });
  s += at(730, 520, pop(t, 69.9, .3) * (1 - prog(t, 70.6, 70.9)), 8, T(0, 0, 120, '?', P.red, { st: P.ink, sw: 7 }));
  return s;
}
function s12(t) { // 75.74–80.96 sugar vs zero: zero is the better choice
  let s = horizon(t, 1340);
  const a = pop(t, 77.58, .35), b = pop(t, 77.92, .35);
  if (a > 0) s += can(300, 900, 1.6 * a, { label: '', col: '#b8202a', band: '#fff' });
  if (b > 0) s += can(780, 900, 1.6 * b, { label: '0' });
  s += sticky(300, 1210, 380, 140, P.nPeach, ['MIT ZUCKER'], -3, prog(t, 77.6, 77.9), { fs: 46 });
  s += sticky(780, 1210, 380, 140, P.nMint, ['OHNE ZUCKER'], 3, prog(t, 78.2, 78.5), { fs: 46 });
  s += at(540, 900, pop(t, 77.76, .3), 0, T(0, 34, 100, 'vs', P.ink));
  const win = prog(t, 79.94, 80.3);
  s += stampOk(900, 660, .7, win);
  if (win > 0) s += `<g opacity="${.5 * win}"><circle cx="780" cy="900" r="${230 + 10 * Math.sin(t * 5)}" fill="#ffe066" opacity=".5"/></g>`;
  s += at(540, 520, pop(t, 75.8, .3) * (1 - prog(t, 77.2, 77.5)), 0, T(0, 0, 90, 'GANZ OHNE?', P.ink, { st: '#fff8ea', sw: 10 }));
  return s;
}
function s13(t) { // 80.96–85.56 not instead of water
  let s = '';
  s += sticky(540, 450, 640, 170, P.gold, ['RICHTIG TRINKEN'], -2, prog(t, 80.96, 81.3), { fs: 62 });
  const cp = pop(t, 81.3, .35);
  if (cp > 0) s += can(280, 860, 1.3 * cp, { label: '0' });
  s += stampX(280, 860, 1, prog(t, 81.66, 81.95));
  const wp = pop(t, 82.12, .35);
  if (wp > 0) s += glassW(640, 880, 1.3 * wp, eout(prog(t, 83.42, 84.0)) * .85 + .1);
  const tp = pop(t, 84.2, .35);
  if (tp > 0) s += teaCup(880, 930, 1.05 * tp, t);
  s += sticky(760, 1220, 460, 150, P.nMint, ['WASSER · TEE'], 3, prog(t, 84.92, 85.2), { fs: 52 });
  // water drop pours into glass
  if (t > 83.42 && t < 84.1) for (let i = 0; i < 4; i++) { const p = ((t - 83.42) * 2.2 + i / 4) % 1; s += dropIcon(640, 620 + p * 220, .28, '#7fc0ea'); }
  return s;
}
function s14(t) { // 85.56–90.88 read labels
  let s = '';
  s += sticky(540, 440, 560, 160, P.nYellow, ['ETIKETT LESEN'], -3, prog(t, 85.83, 86.1), { fs: 60 });
  const lp = pop(t, 86.1, .35);
  if (lp > 0) {
    const lines = ['Zutaten: Milch,', 'Erdbeeren, Aroma,', 'Sucralose, Säuerungs-', 'mittel, Stabilisator'];
    let L = `<g filter="url(#pkSh)"><rect x="-300" y="-150" width="600" height="300" fill="#fff"/></g><rect x="-300" y="-150" width="600" height="300" fill="none" stroke="${P.ink}" stroke-width="4"/>`;
    const hp = prog(t, 87.0, 87.4);
    lines.forEach((l, i) => { if (i === 2) L += hlLine(0, -70 + i * 60, 40, [['Sucralose', hp], [', Säuerungs-', 0]], 1); else L += T(0, -70 + i * 60, 40, l, P.inkSoft); });
    s += at(540, 790, lp, 1.5, L);
    const mx = lerp(840, 470, eio(prog(t, 86.4, 87.0)));
    s += magnifier(mx, 800, .85, '');
  }
  const items = [[230, 88.24, yogurt], [540, 88.88, gum], [850, 89.5, candy]];
  items.forEach(([x, t0, f], i) => { const p = pop(t, t0, .3); if (p > 0) s += f(x, 1200, 1.1 * p) + at(x + 80, 1110, pop(t, t0 + .25, .25), 10, `<circle r="26" fill="${P.red}" stroke="${P.ink}" stroke-width="4"/>${T(0, 12, 34, '!', '#fff')}`); });
  return s;
}
function s15(t) { // 90.88–96.42 share
  let s = horizon(t, 1340);
  const ph = back(prog(t, 94.2, 94.55));
  const sip = Math.sin(prog(t, 91.0, 93.6) * Math.PI);
  const lower = eio(prog(t, 95.2, 95.6));
  s += person(300, 1340, 1.05, { t, hairStyle: 'long', top: '#3f7d6b', aR: lerp(6, 60, ph), eR: lerp(4, 70, ph), holdR: ph > .1 ? `<g transform="rotate(-40)">${phoneProp(prog(t, 94.4, 94.7))}</g>` : '', mouth: t > 90.9 && t < 95.4 ? 'talk' : 'smile', look: .6 });
  const raise = Math.max(sip > .2 ? 1 : sip * 5, 0) * (1 - lower);
  s += person(780, 1340, 1.08, { t, aL: lerp(30, 120, raise), eL: lerp(40, 80, raise), holdL: `<g transform="rotate(${50 * raise})">${can(0, -14, .4, { label: '0', open: true })}</g>`, mouth: lower > .5 ? 'o' : 'flat', look: lower > .5 ? -.7 : 0, brow: lower });
  s += bubble(330, 520, 'Schau mal!', pop(t, 94.3, .3), 340, 620);
  s += bubble(800, 470, 'Echt?', pop(t, 95.6, .3), 790, 560, { fs: 54 });
  return s;
}

const SC = [[0, 6.4, s0], [6.4, 8.52, s1], [8.52, 16.88, s2], [16.88, 27.56, s3], [27.56, 32.56, s4], [32.56, 35.1, s5], [35.1, 43.5, s6], [43.5, 50.44, s7], [50.44, 56.5, s8], [56.5, 64.22, s9], [64.22, 69.36, s10], [69.36, 75.74, s11], [75.74, 80.96, s12], [80.96, 85.56, s13], [85.56, 90.88, s14], [90.88, 999, s15]];
function scene(t) {
  let i = SC.findIndex(x => t >= x[0] && t < x[1]); if (i < 0) i = SC.length - 1;
  let body = SC[i][2](t);
  if (i > 0 && t < SC[i][0] + .32) { const k = ein(prog(t, SC[i][0], SC[i][0] + .32)); body += `<g transform="translate(${-1150 * k} ${-60 * k}) rotate(${-6 * k} 540 960)">${SC[i - 1][2](t)}</g>`; }
  return paperDefs() + paperBG(t) + body + topicTag('ZUCKERFREIE COLA', prog(t, 1.1, 1.4), t);
}

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
