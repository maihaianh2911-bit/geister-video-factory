// @ts-nocheck
// AUTO-GENERATED scene for v14. Change it by commenting on the issue.
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

// ===== v14 "Jeden Tag eiskalt trinken – schadet das?" — paper / sticky-note explainer style =====

// ---------- props ----------
// tall glass with drink + ice cubes. o: fill 0..1, col, ice (count), straw, lemon, dirty 0..1, t
function iceGlass(x, y, s, o = {}) {
  const t = o.t || 0, f = o.fill ?? .8, col = o.col || '#d9893a', id = 'ig' + Math.round(x) + '_' + Math.round(y);
  const top = 130 - 260 * f;
  let ice = '';
  for (let i = 0; i < (o.ice ?? 4); i++) {
    const ix = -40 + (i % 2) * 44 + (i > 1 ? 10 : 0), iy = top + 26 + Math.floor(i / 2) * 48 + 4 * Math.sin(t * 2 + i);
    ice += `<g transform="translate(${ix} ${iy}) rotate(${(i * 23) % 30 - 15})"><rect x="-24" y="-22" width="48" height="44" rx="8" fill="#eaf6ff" opacity=".92" stroke="${P.ink}" stroke-width="3.5"/><path d="M -14 -12 L 4 -12" stroke="#fff" stroke-width="5" stroke-linecap="round"/>
      ${(o.dirty || 0) > 0 ? `<circle cx="${8 - i * 3}" cy="6" r="${6 * o.dirty}" fill="#7a6a3a" opacity=".8"/><circle cx="-10" cy="${10 - i}" r="${4 * o.dirty}" fill="#5f7a3a" opacity=".8"/>` : ''}</g>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="138" rx="80" ry="12" fill="#3a2a14" opacity=".15"/>
    <clipPath id="${id}"><path d="M -70 -130 L -58 130 L 58 130 L 70 -130 Z"/></clipPath>
    <path d="M -70 -130 L -58 130 L 58 130 L 70 -130 Z" fill="#f2f9fd" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/>
    <g clip-path="url(#${id})"><rect x="-80" y="${top}" width="160" height="${270}" fill="${col}" opacity=".88"/>${ice}</g>
    ${o.straw ? `<path d="M 20 ${top + 60} L 50 -190 L 86 -210" stroke="${P.ink}" stroke-width="16" fill="none" stroke-linejoin="round"/><path d="M 20 ${top + 60} L 50 -190 L 86 -210" stroke="#e05a4a" stroke-width="9" fill="none" stroke-linejoin="round"/>` : ''}
    ${o.lemon ? `<g transform="translate(-62 -128)"><circle r="34" fill="#f6e06a" stroke="${P.ink}" stroke-width="4"/><circle r="24" fill="#fff4a8"/>${[0, 1, 2, 3, 4, 5].map(k => `<path d="M 0 0 L ${24 * Math.cos(k * Math.PI / 3)} ${24 * Math.sin(k * Math.PI / 3)}" stroke="#e8c84a" stroke-width="3"/>`).join('')}</g>` : ''}
    <path d="M -48 -100 L -40 100" stroke="#fff" stroke-width="9" stroke-linecap="round" opacity=".6"/>
    ${o.drops ? [0, 1, 2].map(k => `<path d="M ${66 - k * 8} ${-40 + k * 50 + ((t * 40 + k * 30) % 40)} q 6 10 0 16 q -6 -6 0 -16" fill="#bfe3f7" stroke="${P.ink}" stroke-width="2"/>`).join('') : ''}</g>`;
}
function sunIcon(x, y, s, t) { let r = ''; for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2 + t * .5; r += `<path d="M ${Math.cos(a) * 74} ${Math.sin(a) * 74} L ${Math.cos(a) * 108} ${Math.sin(a) * 108}" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>`; } return `<g transform="translate(${x} ${y}) scale(${s})"><circle r="120" fill="#ffd56a" opacity=".35"/>${r}<circle r="60" fill="${P.gold}" stroke="${P.ink}" stroke-width="6"/></g>`; }
function heatLines(t, x, y, n = 3, col = '#e8813a') { let s = ''; for (let i = 0; i < n; i++) { const p = (t * .8 + i / n) % 1; s += `<path d="M ${x + (i - 1) * 40} ${y - p * 90} q 12 -14 0 -28 q -12 -14 0 -28" stroke="${col}" stroke-width="6" fill="none" stroke-linecap="round" opacity="${Math.sin(p * Math.PI)}"/>`; } return s; }
function thermo(x, y, s, temp, o = {}) { // temp in °C, scale 0..40 mapped on tube
  const H = 520, v = cl(temp / 40), col = temp < 30 ? '#4a90c8' : P.red;
  let ticks = '';
  for (let c = 0; c <= 40; c += 10) ticks += `<path d="M 40 ${-v * 0 - c / 40 * H} H 62" stroke="${P.ink}" stroke-width="4"/>${T(110, -c / 40 * H + 12, 32, c + '', P.inkSoft)}`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><g filter="url(#pkSh2)"><rect x="-40" y="${-H - 50}" width="80" height="${H + 60}" rx="40" fill="#fff" stroke="${P.ink}" stroke-width="6"/><circle cx="0" cy="40" r="64" fill="#fff" stroke="${P.ink}" stroke-width="6"/></g>
    <rect x="-18" y="${-v * H}" width="36" height="${v * H + 40}" fill="${col}"/><circle cx="0" cy="40" r="46" fill="${col}"/>
    ${ticks}${o.marks || ''}</g>`;
}
function snowflake(x, y, s, a = 0) { let d = ''; for (let k = 0; k < 6; k++) d += `<g transform="rotate(${k * 60})"><path d="M 0 0 V -60 M 0 -36 L -14 -50 M 0 -36 L 14 -50" stroke="#4a90c8" stroke-width="8" stroke-linecap="round" fill="none"/></g>`; return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">${d}</g>`; }
function virus(x, y, s, a, col = '#9fd47a') { let sp = ''; for (let k = 0; k < 10; k++) { const b = k / 10 * Math.PI * 2; sp += `<path d="M ${Math.cos(b) * 40} ${Math.sin(b) * 40} L ${Math.cos(b) * 62} ${Math.sin(b) * 62}" stroke="${P.ink}" stroke-width="5"/><circle cx="${Math.cos(b) * 64}" cy="${Math.sin(b) * 64}" r="8" fill="${P.redSoft}" stroke="${P.ink}" stroke-width="3"/>`; } return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})">${sp}<circle r="44" fill="${col}" stroke="${P.ink}" stroke-width="5"/><circle cx="-12" cy="-8" r="8" fill="#6aa04a"/><circle cx="14" cy="10" r="6" fill="#6aa04a"/></g>`; }
function bact(x, y, s, col, a) { return `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><rect x="-26" y="-11" width="52" height="22" rx="11" fill="${col}" stroke="${P.ink}" stroke-width="3"/><path d="M 26 0 q 10 -8 18 0" stroke="${P.ink}" stroke-width="3" fill="none"/></g>`; }
function arrowD(x1, y1, x2, y2, p, t, i, col = P.ink) {
  if (p <= 0) return '';
  const x = lerp(x1, x2, p), y = lerp(y1, y2, p), a = Math.atan2(y2 - y1, x2 - x1);
  const mx = (x1 + x) / 2 + boil(t, i, 2), my = (y1 + y) / 2 + boil(t, i + 3, 2) - 20;
  return `<path d="M ${x1} ${y1} Q ${mx} ${my} ${x} ${y}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round"/>${p > .7 ? `<path d="M ${x - 26 * Math.cos(a - .5)} ${y - 26 * Math.sin(a - .5)} L ${x} ${y} L ${x - 26 * Math.cos(a + .5)} ${y - 26 * Math.sin(a + .5)}" stroke="${col}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}`;
}
function stomach(x, y, s, col = '#f4a7b9') { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -40 -150 Q -30 -100 -60 -60 Q -130 40 -60 110 Q 20 170 110 90 Q 160 40 120 -10 Q 90 -40 40 -20 Q 0 -10 -10 -70 Q -14 -120 -6 -150" fill="${col}" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/>
  <path d="M -50 40 q 40 30 100 -10" stroke="${P.ink}" stroke-width="4" fill="none" opacity=".5"/><path d="M 110 90 q 30 20 20 70" stroke="${P.ink}" stroke-width="7" fill="none"/></g>`; }
function potFire(x, y, s, t) {
  let fl = ''; for (let i = 0; i < 4; i++) { const h = 50 + 18 * Math.sin(t * 12 + i * 2); fl += `<path d="M ${-60 + i * 40} 120 q -20 ${-h * .6} 0 ${-h} q 20 ${h * .4} 18 ${h}" fill="${i % 2 ? '#f6b03a' : '#e8603a'}" stroke="${P.ink}" stroke-width="3"/>`; }
  let st = ''; for (let i = 0; i < 3; i++) { const p = (t * .7 + i / 3) % 1; st += `<path d="M ${-40 + i * 40} ${-70 - p * 140} q 18 -20 0 -40 q -18 -20 0 -40" stroke="#8a8a8a" stroke-width="7" fill="none" stroke-linecap="round" opacity="${.7 * Math.sin(p * Math.PI)}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">${st}<path d="M -110 -60 H 110 L 96 80 Q 0 100 -96 80 Z" fill="#7a7f88" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M -126 -60 H 126" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/>
    <path d="M -100 -50 Q -60 -66 -20 -50 Q 20 -66 60 -50 Q 90 -60 100 -50" stroke="#bfe3f7" stroke-width="8" fill="none"/>${fl}<path d="M -110 130 L 110 130 M -80 120 L -100 150 M 80 120 L 100 150" stroke="#6a4a2a" stroke-width="12" stroke-linecap="round"/></g>`;
}
function microscope(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -80 120 H 90" stroke="${P.ink}" stroke-width="20" stroke-linecap="round"/><path d="M 40 110 Q 90 40 40 -40" stroke="${P.ink}" stroke-width="18" fill="none" stroke-linecap="round"/>
  <g transform="rotate(-25)"><rect x="-30" y="-150" width="50" height="150" rx="10" fill="#c9d6e3" stroke="${P.ink}" stroke-width="6"/><rect x="-36" y="-170" width="62" height="30" rx="8" fill="#7a8a9a" stroke="${P.ink}" stroke-width="5"/></g><path d="M -40 40 H 60" stroke="${P.ink}" stroke-width="12" stroke-linecap="round"/></g>`; }
function jug(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -60 -110 Q -80 -90 -60 -70 Q -110 0 -80 90 Q 0 120 80 90 Q 110 0 60 -70 Q 80 -90 60 -110 Z" fill="#c98a5a" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M 80 -40 q 60 0 50 60 q -6 30 -50 30" stroke="${P.ink}" stroke-width="10" fill="none"/><path d="M -70 0 Q 0 20 70 0" stroke="${P.ink}" stroke-width="4" fill="none" opacity=".5"/></g>`; }
function flexArm(x, y, s, flex) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -150 60 Q -60 ${40 - 30 * flex} 0 50 L 30 ${-60 - 30 * flex}" stroke="${P.ink}" stroke-width="64" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M -150 60 Q -60 ${40 - 30 * flex} 0 50 L 30 ${-60 - 30 * flex}" stroke="${P.skin}" stroke-width="54" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <ellipse cx="-70" cy="${30 - 22 * flex}" rx="${50 + 14 * flex}" ry="${22 + 18 * flex}" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/><circle cx="34" cy="${-86 - 30 * flex}" r="34" fill="${P.skin}" stroke="${P.ink}" stroke-width="5"/></g>`; }
function iceMachine(x, y, s, t, dirt) {
  let grime = ''; for (let i = 0; i < 9; i++) { const p = cl(dirt * 9 - i); if (p > 0) grime += `<ellipse cx="${-150 + hash(i + 2) * 300}" cy="${-160 + hash(i + 7) * 320}" rx="${22 * p}" ry="${14 * p}" fill="#8a7a4a" opacity=".55"/>`; }
  let cubes = ''; for (let i = 0; i < 8; i++) cubes += `<rect x="${-110 + (i % 4) * 56}" y="${60 + Math.floor(i / 4) * 44}" width="46" height="40" rx="7" fill="#eaf6ff" stroke="${P.ink}" stroke-width="3"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><g filter="url(#pkSh)"><rect x="-180" y="-220" width="360" height="440" rx="20" fill="#d9dee4" stroke="${P.ink}" stroke-width="7"/></g>
    <rect x="-150" y="-190" width="300" height="80" rx="8" fill="#b8c2cc" stroke="${P.ink}" stroke-width="4"/><circle cx="110" cy="-150" r="14" fill="#7cc39b" stroke="${P.ink}" stroke-width="3"/>${T(-30, -138, 34, 'EIS', P.inkSoft)}
    <rect x="-140" y="30" width="280" height="160" rx="10" fill="#9fb0bf" stroke="${P.ink}" stroke-width="5"/>${cubes}
    <path d="M -140 30 L 140 30" stroke="${P.ink}" stroke-width="6"/>${grime}</g>`;
}
function iceCream(x, y, s, bite = 0) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -50 0 L 0 150 L 50 0 Z" fill="#e3b866" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M -36 20 L 20 110 M 0 10 L 34 60 M 36 20 L -20 110" stroke="${P.ink}" stroke-width="2.5" opacity=".5"/>
  <circle cx="0" cy="${-30 + 20 * bite}" r="${54 * (1 - .4 * bite)}" fill="#f8c9d4" stroke="${P.ink}" stroke-width="5"/><circle cx="-18" cy="${-46 + 20 * bite}" r="10" fill="#fff" opacity=".7"/></g>`; }
function tooth(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -110 -120 Q -120 -190 -50 -180 Q 0 -165 50 -180 Q 120 -190 110 -120 Q 110 -40 80 30 L 60 150 Q 50 180 30 150 L 12 60 Q 0 44 -12 60 L -30 150 Q -50 180 -60 150 L -80 30 Q -110 -40 -110 -120 Z" fill="#fffdf6" stroke="${P.ink}" stroke-width="8" stroke-linejoin="round"/></g>`; }
const zap = (x, y, s, a) => `<g transform="translate(${x} ${y}) rotate(${a}) scale(${s})"><path d="M 10 -60 L -22 0 L 4 0 L -14 56 L 34 -12 L 8 -12 L 26 -60 Z" fill="#9fdcff" stroke="${P.ink}" stroke-width="4" stroke-linejoin="round"/></g>`;
const MOM = { hairStyle: 'long', hairC: '#c9c4bc', top: '#a35d6a' };
const hlW = (txt, p) => p > 0 ? `<rect x="-6" y="-44" width="${12 + tw(txt, 50) * p}" height="56" rx="6" fill="${P.hl}"/>` : '';

// ---------- scenes ----------
function s0(t) { // 0–7.08 hot noon, iced tea, mom warns
  let s = horizon(t, 1340);
  s += sunIcon(880, 470, pop(t, .47, .4) + .0001, t) + (t > .7 ? heatLines(t, 880, 640, 3) : '');
  const g = pop(t, 1.4, .35);
  const iceIn = prog(t, 2.18, 2.5);
  const sip = Math.sin(prog(t, 2.6, 3.1) * Math.PI);
  const stop = eout(prog(t, 4.35, 4.6));
  const aR0 = lerp(30, 40 + 30 * sip, g) - 15 * stop, eR0 = lerp(20, 90 + 20 * sip, g);
  s += person(690, 1340, 1.12, { t, aR: aR0, eR: eR0, holdR: g > 0 ? `<g transform="rotate(${aR0 + eR0 - 25 * sip}) scale(${g})">${iceGlass(0, -40, .55, { t, straw: true, lemon: true, ice: Math.round(4 * iceIn), drops: true })}</g>` : '', mouth: t > 5.94 ? 'o' : 'smile', brow: t > 5.94 ? .8 : 0, look: t > 3.5 ? -.8 : 0 });
  // ice cubes drop in
  for (let i = 0; i < 3; i++) { const p = prog(t, 1.95 + i * .1, 2.25 + i * .1); if (p > 0 && p < 1) s += `<rect x="${850 + i * 20}" y="${lerp(500, 860, ein(p))}" width="40" height="38" rx="7" fill="#eaf6ff" stroke="${P.ink}" stroke-width="3"/>`; }
  const mw = prog(t, 3.1, 3.7);
  if (mw > 0) {
    const wag = t > 4.3 ? 14 * Math.sin((t - 4.3) * 12) * (1 - prog(t, 6.6, 7)) : 0;
    s += person(lerp(-150, 270, eout(mw)), 1340, 1.06, { ...MOM, t, walk: mw < 1 ? t * 9 : undefined, aR: t > 4.2 ? 150 + wag : 6, eR: t > 4.2 ? 20 : 4, mouth: t > 4.3 && t < 6.9 ? 'talk' : 'flat', brow: .9, look: .8 });
  }
  s += bubble(470, 540, 'Nicht so kalt – Halsschmerzen!', pop(t, 4.3, .3), 330, 680, { fs: 40 });
  s += titleBurst(t, 0, 1.12, ['EISKALT', 'TRINKEN?'], { y: 820, w: 720 });
  return s;
}
function s1(t) { // 7.08–10.26 what does it do with the body
  let s = '';
  const days = ['MO', 'DI', 'MI', 'DO', 'FR'];
  for (let i = 0; i < 5; i++) { const p = pop(t, 7.58 + i * .1, .3); if (p > 0) s += iceGlass(150 + i * 195, 640, .62 * p, { t: t + i, ice: 3, col: '#d9893a' }) + T(150 + i * 195, 790, 38, days[i], P.inkSoft, { op: p }); }
  s += sticky(540, 950, 460, 150, P.nYellow, ['JEDEN TAG?'], -3, prog(t, 8.3, 8.6), { fs: 60 });
  // body outline with cold arrow
  const bp = pop(t, 9.2, .35);
  if (bp > 0) {
    s += at(540, 1230, bp, 0, `<path d="M -130 120 Q -140 -40 -60 -60 Q -70 -110 -40 -140 Q 0 -170 40 -140 Q 70 -110 60 -60 Q 140 -40 130 120" fill="none" stroke="${P.ink}" stroke-width="6" stroke-dasharray="14 10"/>`);
    s += at(540, 1200, pop(t, 9.52, .3), 0, snowflake(0, 0, .55, t * 40)) + qMark(700, 1160, .6, prog(t, 9.6, 9.9));
  }
  return s;
}
const qMark = (x, y, s, p, col = P.red) => p > 0 ? at(x, y, s * back(p), 8 * Math.sin(p * 6), T(0, 0, 130, '?', col, { st: P.ink, sw: 7 })) : '';
function s2(t) { // 10.26–14.58 fear older than germ knowledge: timeline
  let s = '';
  const lp = eio(prog(t, 11.92, 13.2));
  s += hline(120, 1000, lerp(120, 960, lp), 1000, t, 4, P.ink, 6);
  if (lp > .97) s += `<path d="M 930 975 L 966 1000 L 930 1025" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  s += T(170, 1070, 36, 'FRÜHER', P.inkSoft, { op: prog(t, 10.5, 10.8) });
  const jp = pop(t, 10.72, .35);
  if (jp > 0) s += jug(240, 820, .95 * jp) + snowflake(330, 720, .45 * jp, t * 30);
  s += sticky(300, 520, 440, 200, P.nLilac, ['ANGST VOR', 'KALTEM WASSER'], -4, prog(t, 10.94, 11.25), { fs: 44 });
  const mp = pop(t, 13.14, .35);
  if (mp > 0) s += microscope(820, 860, 1.0 * mp) + bact(900, 700, .9 * mp, '#7cc39b', 20 + 10 * Math.sin(t * 3)) + bact(960, 760, .7 * mp, '#9ec7e8', -30);
  s += sticky(800, 1220, 400, 150, P.nMint, ['BAKTERIEN'], 3, prog(t, 13.38, 13.65), { fs: 56 });
  s += T(860, 1070, 36, 'SPÄTER', P.inkSoft, { op: prog(t, 13.2, 13.5) });
  return s;
}
function s3(t) { // 14.58–21.42 boiled water -> fewer sick -> cold = unhealthy
  let s = horizon(t, 1340);
  const pf = pop(t, 15.6, .35);
  if (pf > 0) s += potFire(280, 1150, 1.0 * pf, t);
  const drink = Math.sin(prog(t, 16.5, 17.2) * Math.PI);
  s += person(740, 1340, 1.02, { t, hairC: '#5a4030', top: '#8a6a4a', pants: '#c9b994', aR: 30 + 70 * drink, eR: 40 + 60 * drink, holdR: `<g transform="translate(0 -6)"><path d="M -26 -40 H 26 L 20 10 H -20 Z" fill="#c98a5a" stroke="${P.ink}" stroke-width="3"/></g>`, mouth: t > 17.84 ? 'smile' : 'flat', look: -.4 });
  s += stampOk(560, 720, .7, prog(t, 17.84, 18.1));
  s += T(560, 850, 44, 'GESUND', '#2f9a63', { op: prog(t, 18.0, 18.2) });
  s += sticky(540, 500, 620, 190, P.nPeach, ['KALT =', 'UNGESUND?'], -3, prog(t, 19.4, 19.7), { fs: 60 });
  if (t > 20.1) s += at(280, 790, pop(t, 20.14, .3), 0, iceGlass(0, 0, .6, { t, col: '#bfe3f7', ice: 3 }) + snowflake(70, -110, .35, t * 30));
  return s;
}
function s4(t) { // 21.42–25.2 not the cold but dirty water
  let s = '';
  s += sticky(540, 500, 600, 180, P.nLilac, ['KÄLTE MACHT', 'KRANK'], -3, prog(t, 21.64, 21.95), { fs: 56 });
  s += stampX(820, 500, .9, prog(t, 22.7, 22.95));
  const gp = pop(t, 23.3, .35);
  const dirt = eout(prog(t, 23.48, 24.2));
  if (gp > 0) {
    s += iceGlass(540, 860, 1.0 * gp, { t, ice: 0, col: `rgb(${lerp(190, 140, dirt)},${lerp(225, 125, dirt)},${lerp(245, 80, dirt)})`, fill: .85 });
    for (let i = 0; i < 6; i++) { const p = cl(dirt * 6 - i); if (p > 0) s += bact(480 + hash(i) * 120, 830 + hash(i + 4) * 110, .7 * p, i % 2 ? '#7cc39b' : '#b16a8a', t * 40 * (i % 2 ? 1 : -1) + i * 50); }
  }
  s += sticky(540, 1210, 680, 170, P.nPeach, ['SCHMUTZIGES WASSER'], 3, prog(t, 24.36, 24.65), { fs: 52 });
  return s;
}
function s5(t) { // 25.2–29.88 body keeps ~37 °C
  let s = horizon(t, 1340);
  s += person(330, 1340, 1.15, { t, mouth: 'smile', aL: 10, aR: 10 });
  const glow = .5 + .5 * Math.sin(t * 2);
  s += `<ellipse cx="330" cy="${1340 - 1.15 * 400}" rx="${170 + 10 * glow}" ry="${300 + 10 * glow}" fill="#ffb07a" opacity="${.18 * prog(t, 25.5, 26)}"/>`;
  const tp = pop(t, 26.36, .35);
  const temp = lerp(0, 37, eout(prog(t, 27.0, 28.4))) + (t > 28.5 ? .5 * Math.sin(t * 2) : 0);
  if (tp > 0) s += thermo(800, 1180, .95 * tp, temp, { marks: t > 28.24 ? `<path d="M -70 ${-37 / 40 * 520} H 70" stroke="${P.red}" stroke-width="5" stroke-dasharray="10 6"/>` : '' });
  s += sticky(780, 470, 420, 170, P.gold, ['~37 °C'], -3, prog(t, 28.24, 28.5), { fs: 84 });
  // thermostat loop arrow around body ("ständig")
  const lp = prog(t, 27.02, 27.6);
  if (lp > 0) { const a1 = -Math.PI / 2 + lp * Math.PI * 1.7; s += `<path d="M 330 ${560} A 210 330 0 ${lp > .6 ? 1 : 0} 1 ${330 + 210 * Math.cos(a1)} ${890 + 330 * Math.sin(a1)}" stroke="#e8813a" stroke-width="8" fill="none" stroke-linecap="round" stroke-dasharray="20 12"/>`; }
  return s;
}
function s6(t) { // 29.88–36.58 vessels constrict, muscles heat, back to normal
  let s = '';
  const gp = pop(t, 29.9, .3), tip = eout(prog(t, 30.36, 30.7));
  // vessels band
  const vp = pop(t, 31.1, .35);
  const narrow = eio(prog(t, 32.0, 32.5)) * (1 - eio(prog(t, 35.2, 35.8)));
  if (vp > 0) {
    let v = '';
    for (const yy of [-50, 50]) {
      const w = 56 - 28 * narrow;
      v += `<path d="M -440 ${yy} H 440" stroke="${P.ink}" stroke-width="${w + 10}" stroke-linecap="round"/><path d="M -440 ${yy} H 440" stroke="#e8786a" stroke-width="${w}" stroke-linecap="round"/>`;
      for (let i = 0; i < 9; i++) { const x = -440 + ((t * 160 * (1 - .5 * narrow) + i * 100) % 880); v += `<ellipse cx="${x}" cy="${yy}" rx="${14 - 4 * narrow}" ry="${10 - 3 * narrow}" fill="#c0392b" stroke="${P.ink}" stroke-width="2"/>`; }
    }
    s += at(540, 600, vp, 0, v);
    if (narrow > .3) s += `<path d="M 540 470 V 520 M 520 500 L 540 524 L 560 500 M 540 730 V 680 M 520 700 L 540 676 L 560 700" stroke="#4a90c8" stroke-width="7" fill="none" stroke-linecap="round" opacity="${narrow}"/>`;
  }
  if (gp > 0) s += `<g transform="translate(${lerp(0, -40, tip)} 0)">${iceGlass(170, 880, .62 * gp, { t, col: '#bfe3f7', ice: 4 })}</g>` + snowflake(190, 700, .45 * prog(t, 30.36, 30.7), t * 30);
  s += sticky(720, 860, 520, 180, P.nLilac, ['GEFÄSSE', 'ZIEHEN SICH ZUSAMMEN'], 3, prog(t, 32.32, 32.6), { fs: 40 });
  const fp = pop(t, 33.1, .35), flex = Math.abs(Math.sin((t - 33.1) * 5)) * prog(t, 33.48, 33.8);
  if (fp > 0) s += flexArm(260, 1150, .9 * fp, flex) + (t > 34.06 ? heatLines(t, 220, 1060, 3) : '');
  s += sticky(740, 1110, 500, 170, P.nPeach, ['MUSKELN', 'MACHEN WÄRME'], -3, prog(t, 34.06, 34.35), { fs: 44 });
  s += sticky(540, 1300, 460, 130, P.nMint, ['WIEDER NORMAL'], 2, prog(t, 35.72, 36.0), { fs: 50, extra: '' });
  s += stampOk(830, 1290, .5, prog(t, 35.8, 36.05));
  return s;
}
function s7(t) { // 36.58–50 Gut 1988: stomach temp 37 -> 21 -> back
  let s = srcTag('GUT · 1988', prog(t, 36.58, 36.95));
  s += quoteCard(540, 480, 940, 300, prog(t, 36.65, 37.05), [
    [['4 °C Wasser', prog(t, 41.09, 41.4)], [' → Magen ', 0], ['~21 °C', prog(t, 45.74, 46.1)]],
    [['nach 20–30 Min. ', 0], ['wieder normal', prog(t, 49.3, 49.7)]]], '— Sun u. a. (Gut, 1988)', { fs: 52, top: 126 });
  // stomach + pouring cold water
  const sp = pop(t, 39.4, .35);
  const cold = prog(t, 43.4, 45.9) * (1 - prog(t, 47.26, 49.3));
  if (sp > 0) s += stomach(300, 1050, 1.15 * sp, `rgb(${lerp(244, 170, cold)},${lerp(167, 205, cold)},${lerp(185, 240, cold)})`);
  const pour = prog(t, 41.58, 42.6);
  if (pour > 0 && pour < 1) { s += iceGlass(220, 700, .45, { t, col: '#bfe3f7', ice: 2, fill: .8 - .6 * pour }); for (let i = 0; i < 5; i++) { const p = ((t - 41.58) * 2.4 + i / 5) % 1; s += `<circle cx="${270 + 6 * Math.sin(p * 9)}" cy="${790 + p * 160}" r="9" fill="#9fd4ff" stroke="${P.ink}" stroke-width="2"/>`; } }
  if (cold > .2) s += snowflake(300, 1040, .5 * cold, t * 40);
  // thermometer
  const tp = pop(t, 39.49, .35);
  let temp = 37;
  if (t > 44.4) temp = lerp(37, 21, eout(prog(t, 44.4, 46.06)));
  if (t > 47.26) temp = lerp(21, 37, eio(prog(t, 47.26, 49.3)));
  if (tp > 0) s += thermo(760, 1250, .95 * tp, temp, { marks: `<path d="M -60 ${-21 / 40 * 520} H 60" stroke="#4a90c8" stroke-width="5" stroke-dasharray="10 6" opacity="${prog(t, 46, 46.3)}"/>` });
  if (tp > 0) s += at(900, lerp(1250, 1250 - 520 * .95, temp / 40) - 40, 1, 0, `<g filter="url(#pkSh2)"><rect x="-70" y="-38" width="150" height="70" fill="${temp < 30 ? P.nBlue : P.nPeach}"/></g>${T(5, 14, 42, Math.round(temp) + ' °C', P.ink)}`);
  // time labels
  s += sticky(330, 1330, 300, 110, P.nYellow, ['< 1 MIN'], -3, prog(t, 43.96, 44.2) * (1 - prog(t, 47.0, 47.3)), { fs: 46 });
  s += sticky(330, 1330, 340, 110, P.nMint, ['20–30 MIN'], 3, prog(t, 47.9, 48.2), { fs: 46 });
  return s;
}
function s8(t) { // 50–53.31 digestion slightly slower
  let s = '';
  s += stomach(300, 900, 1.1, '#f4a7b9');
  // speedometer: needle drops a little
  const n = lerp(.7, .5, eout(prog(t, 50.74, 51.6))) + .02 * Math.sin(t * 6);
  s += `<g transform="translate(760 940)"><g filter="url(#pkSh2)"><path d="M -170 0 A 170 170 0 0 1 170 0 Z" fill="#fff" stroke="${P.ink}" stroke-width="6"/></g>
    <path d="M -150 0 A 150 150 0 0 1 ${150 * Math.cos(Math.PI * (1 - .5))} ${-150 * Math.sin(Math.PI * .5)}" stroke="#7cc39b" stroke-width="16" fill="none"/>
    ${[0, .25, .5, .75, 1].map(k => `<path d="M ${-Math.cos(k * Math.PI) * 130} ${-Math.sin(k * Math.PI) * 130} L ${-Math.cos(k * Math.PI) * 156} ${-Math.sin(k * Math.PI) * 156}" stroke="${P.ink}" stroke-width="5"/>`).join('')}
    <path d="M 0 0 L ${-Math.cos(n * Math.PI) * 120} ${-Math.sin(n * Math.PI) * 120}" stroke="${P.red}" stroke-width="10" stroke-linecap="round"/><circle r="14" fill="${P.ink}"/></g>`;
  // snail crawls slowly under stomach
  const sx = lerp(120, 380, prog(t, 50.0, 53.3));
  s += `<g transform="translate(${sx} 1200)"><path d="M -60 0 Q -60 -20 -30 -20 L 50 -20 Q 70 -20 74 -44" stroke="${P.ink}" stroke-width="5" fill="#d9c27a"/><circle cx="0" cy="-44" r="40" fill="#c98a5a" stroke="${P.ink}" stroke-width="5"/><path d="M 0 -44 m -20 0 a 20 20 0 1 1 20 20" stroke="${P.ink}" stroke-width="4" fill="none"/><path d="M 70 -44 l 6 -24 M 64 -44 l -6 -22" stroke="${P.ink}" stroke-width="4"/></g>`;
  s += sticky(560, 520, 620, 190, P.nLilac, ['VERDAUUNG', 'ETWAS LANGSAMER'], -3, prog(t, 51.78, 52.1), { fs: 50 });
  s += sticky(760, 1200, 380, 130, P.nMint, ['NUR EIN WENIG'], 3, prog(t, 52.46, 52.75), { fs: 42 });
  return s;
}
function s9(t) { // 53.31–59.12 sore throat not proven; colds from viruses
  let s = '';
  const gp = pop(t, 53.54, .35);
  if (gp > 0) s += iceGlass(250, 640, .75 * gp, { t, col: '#bfe3f7', ice: 4 });
  s += arrowD(380, 640, 600, 640, eio(prog(t, 54.2, 54.7)), t, 3);
  const np = pop(t, 54.76, .35);
  if (np > 0) s += at(790, 640, np, 0, `<path d="M -160 200 Q -150 110 -50 100 L -40 40 L 40 40 L 50 100 Q 150 110 160 200 Z" fill="${P.top}" stroke="${P.ink}" stroke-width="5"/><rect x="-40" y="10" width="80" height="100" fill="${P.skinSh}" stroke="${P.ink}" stroke-width="5"/>
      <ellipse cx="0" cy="-60" rx="88" ry="100" fill="${P.skin}" stroke="${P.ink}" stroke-width="6"/><path d="M -88 -80 Q -90 -170 0 -166 Q 90 -170 88 -80 Q 60 -130 0 -128 Q -60 -130 -88 -80 Z" fill="${P.hair}" stroke="${P.ink}" stroke-width="5"/>
      <circle cx="-32" cy="-60" r="8" fill="${P.ink}"/><circle cx="32" cy="-60" r="8" fill="${P.ink}"/><path d="M -20 0 Q 0 -10 20 0" stroke="${P.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <circle cx="0" cy="66" r="${30 + 6 * Math.sin(t * 8)}" fill="${P.red}" opacity=".45"/>`) + qMark(920, 520, .55, prog(t, 55.2, 55.5));
  // stamp NICHT BELEGT
  const st = prog(t, 56.66, 56.9);
  if (st > 0) s += `<g transform="translate(540 880) rotate(-8) scale(${1.5 - .5 * eout(st)})" opacity="${cl(st * 3)}"><rect x="-300" y="-70" width="600" height="140" rx="14" fill="#fff8ea" fill-opacity=".85" stroke="${P.red}" stroke-width="10"/>${T(0, 26, 70, 'NICHT BELEGT', P.red)}</g>`;
  // viruses -> cold
  for (let i = 0; i < 4; i++) { const p = pop(t, 58.24 + i * .1, .3); if (p > 0) s += virus(170 + i * 110, 1000 + (i % 2) * 70, .8 * p, t * 30 + i * 40); }
  s += sticky(780, 1030, 440, 180, P.nMint, ['ERKÄLTUNG', '→ VIREN'], 3, prog(t, 58.7, 58.98), { fs: 52 });
  s += sticky(300, 1280, 400, 120, P.nPeach, ['NICHT DIE KÄLTE'], -2, prog(t, 58.9, 59.1), { fs: 40 });
  return s;
}
function s10(t) { // 59.12–63.9 belly ache -> dirty ice
  let s = horizon(t, 1340);
  const ache = prog(t, 59.91, 60.2);
  s += person(300, 1340, 1.12, { t, aL: lerp(6, 18, ache), eL: lerp(4, -100, ache), aR: lerp(6, 18, ache), eR: lerp(4, -100, ache), mouth: ache > .5 ? 'sad' : 'flat', brow: ache, headTilt: 4 * Math.sin(t * 8) * ache });
  if (ache > .5) s += `<g opacity="${ache}">${[0, 1, 2].map(k => `<path d="M ${300 + (k - 1) * 50} ${1340 - 1.12 * 360} l 10 -18 l -10 -14" stroke="${P.red}" stroke-width="5" fill="none"/>`).join('')}</g>`;
  s += sticky(780, 470, 480, 160, P.gold, ['WAHRE URSACHE?'], -3, prog(t, 59.2, 59.5), { fs: 52 });
  const gp = pop(t, 60.38, .35), dirt = eout(prog(t, 62.64, 63.3));
  if (gp > 0) s += iceGlass(780, 860, .95 * gp, { t, col: '#bfe3f7', ice: 4, dirty: dirt });
  for (let i = 0; i < 5; i++) { const p = cl(dirt * 5 - i); if (p > 0) s += bact(720 + hash(i) * 120, 760 + hash(i + 6) * 160, .6 * p, i % 2 ? '#7cc39b' : '#b16a8a', t * 50 * (i % 2 ? 1 : -1)); }
  s += sticky(780, 1220, 460, 150, P.nPeach, ['SCHMUTZIGES EIS'], 3, prog(t, 63.34, 63.6), { fs: 50 });
  return s;
}
function s11(t) { // 63.9–69.64 dirty ice machines, real risk
  let s = '';
  const mp = pop(t, 63.95, .35);
  const dirt = eout(prog(t, 64.38, 65.4));
  if (mp > 0) s += iceMachine(400, 860, 1.15 * mp, t, dirt);
  for (let i = 0; i < 9; i++) { const p = pop(t, 66.2 + i * .07, .25); if (p > 0) s += bact(270 + (i % 3) * 120 + 8 * Math.sin(t * 3 + i), 990 + Math.floor(i / 3) * 50 + 6 * Math.cos(t * 4 + i), .75 * p, ['#7cc39b', '#b16a8a', '#e8c27a'][i % 3], t * 60 * (i % 2 ? 1 : -1)); }
  s += sticky(820, 640, 380, 150, P.nLilac, ['BAKTERIEN'], 4, prog(t, 66.2, 66.5), { fs: 54 });
  // warning triangle
  const wp = pop(t, 68.22, .35);
  if (wp > 0) s += at(830, 980, wp, 0, `<path d="M 0 -120 L 120 90 L -120 90 Z" fill="${P.gold}" stroke="${P.ink}" stroke-width="8" stroke-linejoin="round"/>${T(0, 70, 150, '!', P.ink)}`);
  s += sticky(800, 1250, 440, 150, P.nPeach, ['DAS RISIKO'], -3, prog(t, 68.92, 69.2), { fs: 58 });
  return s;
}
function s12(t) { // 69.64–76.4 brain freeze
  let s = horizon(t, 1340);
  s += sticky(540, 470, 520, 150, P.nLilac, ['EMPFINDLICH'], -3, prog(t, 70.48, 70.78), { fs: 58 });
  const eat = t > 71.86 && t < 74.0 ? Math.abs(Math.sin((t - 71.86) * 9)) : 0;
  const ow = eout(prog(t, 74.5, 74.8));
  const bite = prog(t, 71.86, 73.8);
  s += person(470, 1340, 1.15, { t, aR: ow > 0 ? lerp(60, 160, ow) : 70 + 50 * eat, eR: ow > 0 ? lerp(70, 105, ow) : 70 + 40 * eat, aL: lerp(6, 160, ow), eL: lerp(4, 105, ow), holdR: ow < .5 ? `<g transform="rotate(-60)">${iceCream(0, -50, .45, bite)}</g>` : '', mouth: ow > 0 ? 'o' : (eat > .5 ? 'o' : 'smile'), eyes: ow > .5 ? 'closed' : undefined, brow: ow, headTilt: ow * 5 * Math.sin(t * 20) });
  if (ow > 0) { for (let i = 0; i < 6; i++) { const a = -Math.PI / 2 + (i - 2.5) * .45; const r = 150 + 30 * Math.sin(t * 10 + i); s += zap(470 + Math.cos(a) * r, 1340 - 1.15 * 580 + Math.sin(a) * r * .8, .7 * ow, a * 57 + 90); } }
  if (ow > 0 && ow < 1) s += `<circle cx="470" cy="${1340 - 1.15 * 580}" r="${100 + 200 * ow}" fill="none" stroke="#9fdcff" stroke-width="${10 * (1 - ow)}"/>`;
  s += bubble(780, 640, 'Au, Hirnfrost!', pop(t, 75.56, .3), 560, 720, { fs: 46 });
  if (ow > .2) s += iceCream(lerp(620, 700, ow), lerp(1100, 1290, ein(ow)), .5, 1);
  return s;
}
function s13(t) { // 76.4–83.48 BMJ 2002: fast eating -> more headache
  let s = srcTag('BMJ · 2002', prog(t, 76.4, 76.75));
  s += quoteCard(540, 480, 940, 280, prog(t, 76.45, 76.85), [
    [['Schnell', prog(t, 80.35, 80.65)], [' Eis essen', 0]],
    [['→ häufiger ', 0], ['Kopfschmerz', prog(t, 82.2, 82.6)]]], '— Kaczorowski & Kaczorowski (BMJ, 2002)', { fs: 56, top: 124 });
  if (t > 79.6) s += barChart(t, 220, 1290, 640, 480, [
    { v: .42, val: '13 %', label: 'LANGSAM', col: P.nMint, t0: 79.84, d: .6 },
    { v: .87, val: '27 %', label: 'SCHNELL', col: P.nPeach, t0: 81.12, d: .7 }], { vfs: 64, lfs: 36 });
  // icons over the labels
  const a = pop(t, 79.84, .3), b = pop(t, 80.35, .3);
  if (a > 0) s += iceCream(380, 760, .4 * a, 0) + `<g transform="translate(440 780) scale(${a})"><path d="M -40 0 q 20 -30 40 0" stroke="${P.ink}" stroke-width="0"/></g>`;
  if (b > 0) s += iceCream(700, 760, .4 * b, 0) + `<path d="M 620 720 h -60 M 620 760 h -80 M 620 800 h -60" stroke="${P.ink}" stroke-width="6" stroke-linecap="round" opacity="${b}"/>`;
  if (t > 82.2) s += zap(840, 760, .7 * pop(t, 82.2, .3), 20);
  return s;
}
function s14(t) { // 83.48–88.98 sensitive people: better cool
  let s = '';
  const flip = prog(t, 87.68, 88.0);
  const sy = Math.abs(Math.cos(flip * Math.PI));
  const card = flip < .5 ? ['WER EMPFINDLICH IST'] : ['LIEBER KÜHL'];
  s += `<g transform="translate(540 450) scale(1 ${sy}) translate(-540 -450)">${sticky(540, 450, 640, 170, flip < .5 ? P.nYellow : P.gold, card, -2, prog(t, 83.5, 83.8), { fs: flip < .5 ? 46 : 70 })}</g>`;
  s += sticky(380, 700, 560, 160, P.nPeach, ['BAUCHWEH BEI KÄLTE'], -3, prog(t, 84.26, 84.55), { fs: 42, extra: stomach(-220, 0, .28) });
  s += sticky(380, 930, 560, 160, P.nLilac, ['EMPFINDLICHE ZÄHNE'], 2, prog(t, 85.8, 86.1), { fs: 42, extra: tooth(-224, 4, .26) });
  s += sticky(380, 1160, 560, 160, P.nMint, ['HALSSCHMERZEN'], -2, prog(t, 86.46, 86.75), { fs: 46 });
  const gp = pop(t, 87.68, .35);
  if (gp > 0) s += iceGlass(870, 960, .85 * gp, { t, col: '#d9ecf7', ice: 1 }) + thermo(870, 1340, .38 * gp, 15);
  return s;
}
function s15(t) { // 88.98–94.84 everyone else: fine, clean ice, small sips
  let s = horizon(t, 1340);
  const sip = t > 93.42 ? Math.max(0, Math.sin((t - 93.42) * 7)) : 0;
  s += person(300, 1340, 1.12, { t, mouth: 'smile', aR: 40 + 30 * sip, eR: 90 + 30 * sip, holdR: `<g transform="rotate(${130 + 60 * sip - 25 * sip})">${iceGlass(0, -40, .42, { t, col: '#d9893a', ice: 3, straw: true })}</g>`, look: .3 });
  s += sticky(760, 560, 460, 180, P.nMint, ['TUT GUT?', 'RUHIG KALT!'], 3, prog(t, 90.7, 91.0), { fs: 50 });
  s += sticky(760, 820, 460, 150, P.nBlue, ['SAUBERES EIS'], -3, prog(t, 92.8, 93.05), { fs: 50, extra: '' });
  s += sticky(760, 1070, 460, 150, P.nYellow, ['KLEINE SCHLUCKE'], 2, prog(t, 93.68, 93.95), { fs: 46 });
  if (t > 92.9) s += `<g opacity="${prog(t, 92.9, 93.1)}">${[0, 1, 2].map(k => `<path d="M ${560 + k * 30} ${760 + 20 * Math.sin(t * 4 + k)} l 6 -14 l 6 14 l 14 6 l -14 6 l -6 14 l -6 -14 l -14 -6 Z" fill="#fff" stroke="${P.ink}" stroke-width="2"/>`).join('')}</g>`;
  return s;
}
function s16(t) { // 94.84–99.49 share: son shows mom the video
  let s = horizon(t, 1340);
  const ph = back(prog(t, 97.44, 97.8));
  s += person(300, 1340, 1.06, { ...MOM, t, aR: t < 96.6 ? 150 + 12 * Math.sin(t * 12) : lerp(150, 6, eout(prog(t, 96.6, 97.0))), eR: t < 96.6 ? 20 : 4, mouth: t < 96.6 ? 'talk' : (t > 98.6 ? 'smile' : 'o'), brow: t < 96.6 ? .9 : 0, look: .8 });
  s += person(760, 1340, 1.1, { t, aL: lerp(6, 60, ph), eL: lerp(4, 70, ph), holdL: ph > .1 ? `<g transform="rotate(40)">${phoneProp(prog(t, 97.6, 97.8))}</g>` : '', aR: 30, eR: 90, holdR: `<g transform="rotate(120)">` + iceGlass(0, -40, .36, { t, col: '#d9893a', ice: 3, straw: true }) + '</g>', mouth: t > 97.4 && t < 98.4 ? 'talk' : 'smile', look: -.7 });
  s += bubble(330, 520, 'Kein Eis!', pop(t, 95.0, .3) * (1 - prog(t, 96.9, 97.1)), 320, 640);
  s += bubble(760, 520, 'Schau mal!', pop(t, 97.5, .3), 740, 640);
  s += bubble(300, 520, 'Na gut …', pop(t, 98.6, .3), 320, 640, { fs: 46 });
  return s;
}

const SC = [[0, 7.08, s0], [7.08, 10.26, s1], [10.26, 14.58, s2], [14.58, 21.42, s3], [21.42, 25.2, s4], [25.2, 29.88, s5], [29.88, 36.58, s6], [36.58, 50.0, s7], [50.0, 53.31, s8], [53.31, 59.12, s9], [59.12, 63.9, s10], [63.9, 69.64, s11], [69.64, 76.4, s12], [76.4, 83.48, s13], [83.48, 88.98, s14], [88.98, 94.84, s15], [94.84, 999, s16]];
function scene(t) {
  let i = SC.findIndex(x => t >= x[0] && t < x[1]); if (i < 0) i = SC.length - 1;
  let body = SC[i][2](t);
  if (i > 0 && t < SC[i][0] + .32) { const k = ein(prog(t, SC[i][0], SC[i][0] + .32)); body += `<g transform="translate(${-1150 * k} ${-60 * k}) rotate(${-6 * k} 540 960)">${SC[i - 1][2](t)}</g>`; }
  return paperDefs() + paperBG(t) + body + topicTag('EISKALT TRINKEN', prog(t, 1.08, 1.38), t);
}

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
