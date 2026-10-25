// @ts-nocheck
// AUTO-GENERATED scene for v12. Change it by commenting on the issue.
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
const GW = {"0":0.711,"1":0.452,"2":0.647,"3":0.669,"4":0.702,"5":0.666,"6":0.675,"7":0.595,"8":0.679,"9":0.675," ":0.199,"!":0.381,"\"":0.625,"%":1.044,"'":0.372,"(":0.388,")":0.388,"+":0.693,",":0.373,"-":0.475,".":0.373,"/":0.412,":":0.373,"?":0.601,"A":0.795,"B":0.668,"C":0.748,"D":0.723,"E":0.613,"F":0.584,"G":0.755,"H":0.75,"I":0.291,"J":0.596,"K":0.759,"L":0.565,"M":0.956,"N":0.77,"O":0.775,"P":0.656,"Q":0.787,"R":0.668,"S":0.666,"T":0.687,"U":0.722,"V":0.795,"W":1.082,"X":0.786,"Y":0.775,"Z":0.694,"a":0.597,"b":0.646,"c":0.603,"d":0.646,"e":0.607,"f":0.422,"g":0.647,"h":0.65,"i":0.296,"j":0.296,"k":0.607,"l":0.296,"m":0.943,"n":0.65,"o":0.625,"p":0.646,"q":0.646,"r":0.449,"s":0.588,"t":0.419,"u":0.65,"v":0.647,"w":0.877,"x":0.609,"y":0.65,"z":0.59,"Ä":0.795,"Ö":0.775,"Ü":0.722,"ä":0.597,"ö":0.625,"ü":0.65,"ß":0.693,"–":0.5,"—":1,"·":0.373,"…":1.119,"„":0.585,"“":0.625,"×":0.693,"−":0.693};
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
  const fs = 92;
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

// ===== v12 "Warum du nachts ein Rauschen im Ohr hörst" — paper / sticky-note explainer style =====

// ---------- props ----------
// line-drawn bedroom inside a soft panel. o: lamp 0..1, night 0..1, eye 'closed'|'open', look, zig 0..1, waves 0..1, fan 0..1, rain 0..1, lift
function bedroom(t, o = {}) {
  const night = o.night ?? 0, lamp = o.lamp ?? 0;
  const wall = night > 0 ? `rgb(${lerp(226, 150, night)},${lerp(220, 156, night)},${lerp(204, 186, night)})` : '#e2dccc';
  const floorC = night > 0 ? `rgb(${lerp(205, 128, night)},${lerp(192, 128, night)},${lerp(170, 160, night)})` : '#cdbfa6';
  let st = '';
  for (let i = 0; i < 7; i++) st += `<circle cx="${150 + hash(i + 3) * 210}" cy="${470 + hash(i + 9) * 200}" r="${2 + hash(i) * 2}" fill="#fff" opacity="${.5 + .4 * Math.sin(t * 3 + i)}"/>`;
  let rain = '';
  if ((o.rain || 0) > 0) for (let i = 0; i < 16; i++) { const yy = 440 + ((hash(i * 2.3) * 320 + t * 520) % 320); const xx = 130 + hash(i * 5.1) * 240; rain += `<path d="M ${xx} ${yy} l -8 26" stroke="#dfe9ff" stroke-width="4" stroke-linecap="round" opacity="${.8 * o.rain}"/>`; }
  const eye = o.eye === 'open' ? `<ellipse cx="${606 + (o.look || 0) * 6}" cy="906" rx="9" ry="${11 * (o.eyeS || 1)}" fill="#fff" stroke="${P.ink}" stroke-width="3"/><circle cx="${606 + (o.look || 0) * 6}" cy="${906 + (o.lookY || 0)}" r="5" fill="${P.ink}"/>`
    : `<path d="M 596 906 q 10 8 20 0" stroke="${P.ink}" stroke-width="4" fill="none" stroke-linecap="round"/>`;
  const lift = o.lift || 0;
  const head = `<g transform="translate(0 ${-lift}) rotate(${-lift * .3} 650 950)">
    <ellipse cx="650" cy="945" rx="62" ry="56" fill="${P.skin}" stroke="${P.ink}" stroke-width="4"/>
    <path d="M 600 898 q -8 -14 4 -22" stroke="${P.ink}" stroke-width="4" fill="${P.skin}"/>
    <path d="M 640 892 Q 700 870 712 930 Q 716 980 690 998 Q 700 950 672 930 Q 660 905 640 892 Z" fill="${P.hair}" stroke="${P.ink}" stroke-width="4"/>
    <ellipse cx="660" cy="950" rx="13" ry="18" fill="${P.skinSh}" stroke="${P.ink}" stroke-width="3.5"/>
    ${eye}<path d="M 590 940 q 8 5 14 0" stroke="${P.ink}" stroke-width="3.5" fill="none" stroke-linecap="round"/></g>`;
  const fan = (o.fan || 0) > 0 ? (() => {
    const s = back(o.fan), a = t * 900;
    let bl = ''; for (let k = 0; k < 3; k++) bl += `<ellipse cx="0" cy="-42" rx="22" ry="42" fill="#cfe2f0" stroke="${P.ink}" stroke-width="3" transform="rotate(${a + k * 120})"/>`;
    return `<g transform="translate(880 1176) scale(${s})"><path d="M -8 0 V -150 M 8 0 V -150" stroke="${P.ink}" stroke-width="4"/><ellipse cx="0" cy="0" rx="60" ry="14" fill="#9aa9b8" stroke="${P.ink}" stroke-width="3.5"/>
      <g transform="translate(0 -200)">${bl}<circle r="16" fill="#9aa9b8" stroke="${P.ink}" stroke-width="3.5"/><circle r="92" fill="none" stroke="${P.ink}" stroke-width="4"/>
      ${[0, 30, 60, 90, 120, 150].map(d => `<path d="M ${-92 * Math.cos(d * Math.PI / 180)} ${-92 * Math.sin(d * Math.PI / 180)} L ${92 * Math.cos(d * Math.PI / 180)} ${92 * Math.sin(d * Math.PI / 180)}" stroke="${P.ink}" stroke-width="1.5" opacity=".5"/>`).join('')}</g></g>`;
  })() : '';
  return `<clipPath id="bdClip"><rect x="60" y="360" width="960" height="1020" rx="26"/></clipPath>
    <g filter="url(#pkSh)"><rect x="60" y="360" width="960" height="1020" rx="26" fill="${wall}"/></g>
    <g clip-path="url(#bdClip)">
      <rect x="60" y="1180" width="960" height="220" fill="${floorC}"/>${hline(60, 1180, 1020, 1180, t, 31, P.ink, 3.5)}
      <!-- window -->
      <rect x="120" y="430" width="270" height="340" rx="6" fill="${night > .5 ? '#5c6a92' : '#a9bedc'}" stroke="${P.ink}" stroke-width="4"/>
      <circle cx="320" cy="510" r="38" fill="#fff6d8" opacity="${.4 + .6 * night}"/>${night > .3 ? st : ''}${rain}
      <path d="M 255 430 V 770 M 120 600 H 390" stroke="${P.ink}" stroke-width="5"/>
      <path d="M 104 420 H 406" stroke="${P.ink}" stroke-width="7" stroke-linecap="round"/>
      <path d="M 112 424 Q ${140 + 4 * Math.sin(t)} 600 118 800 L 150 800 Q 160 600 142 424 Z" fill="#c88f7a" stroke="${P.ink}" stroke-width="3.5"/>
      <path d="M 398 424 Q ${370 - 4 * Math.sin(t)} 600 392 800 L 360 800 Q 350 600 368 424 Z" fill="#c88f7a" stroke="${P.ink}" stroke-width="3.5"/>
      <!-- picture -->
      <rect x="470" y="520" width="150" height="110" fill="#efe5c8" stroke="${P.ink}" stroke-width="4"/><path d="M 480 620 l 40 -50 l 30 30 l 26 -22 l 34 42 Z" fill="#9cc1a4" stroke="${P.ink}" stroke-width="2.5"/>
      <!-- nightstand + lamp + clock -->
      <rect x="790" y="1000" width="190" height="180" fill="#b88a62" stroke="${P.ink}" stroke-width="4"/><path d="M 800 1070 H 970" stroke="${P.ink}" stroke-width="3"/><circle cx="885" cy="1110" r="7" fill="${P.ink}"/>
      <path d="M 870 1000 V 900" stroke="${P.ink}" stroke-width="5"/><path d="M 830 900 L 910 900 L 890 840 L 850 840 Z" fill="${lamp > 0 ? '#ffe9a8' : '#e7dcc0'}" stroke="${P.ink}" stroke-width="4"/>
      ${lamp > 0 ? `<path d="M 830 900 L 910 900 L 1000 1000 L 740 1000 Z" fill="#fff0b0" opacity="${.45 * lamp}"/><circle cx="870" cy="880" r="${140}" fill="#ffe28a" opacity="${.25 * lamp}" filter="url(#blur20)"/>` : ''}
      <rect x="922" y="950" width="92" height="50" rx="8" fill="#26221e" stroke="${P.ink}" stroke-width="3.5"/>
      ${T(968, 986, 30, o.clock || '23:00', '#ff6b5a')}
      ${fan}
      <!-- bed -->
      <rect x="140" y="1010" width="640" height="80" rx="10" fill="#f4efe2" stroke="${P.ink}" stroke-width="4"/>
      <rect x="130" y="1090" width="660" height="40" fill="#a87a55" stroke="${P.ink}" stroke-width="4"/>
      <path d="M 150 1130 V 1180 M 770 1130 V 1180" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/>
      <rect x="740" y="900" width="40" height="230" rx="10" fill="#a87a55" stroke="${P.ink}" stroke-width="4"/>
      <path d="M 600 1000 Q 590 960 640 958 L 730 960 Q 760 980 736 1010 Z" fill="#fff" stroke="${P.ink}" stroke-width="4"/>
      ${head}
      <path d="M 120 1080 Q 130 990 220 980 Q 300 ${960 - (o.breathe ? 6 * Math.sin(t * 2.2) : 0)} 420 972 Q 520 980 610 1004 Q 640 1040 620 1090 Z" fill="#b9d3ee" stroke="${P.ink}" stroke-width="4"/>
      <path d="M 260 1000 q 60 30 120 10 M 430 1000 q 50 20 110 14" stroke="${P.ink}" stroke-width="2.5" fill="none" opacity=".5"/>
      ${night > 0 ? `<rect x="60" y="360" width="960" height="1020" fill="#28305a" opacity="${.18 * night}"/>` : ''}
    </g>
    <rect x="60" y="360" width="960" height="1020" rx="26" fill="none" stroke="${P.ink}" stroke-width="5"/>`;
}
// side-view ear (line art), centre x,y, scale s
function earIcon(x, y, s, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -10 -120 C 80 -150 140 -70 120 0 C 105 50 60 60 50 100 C 40 140 -10 150 -30 110 C -40 90 -30 70 -10 60" fill="${o.col || P.skin}" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M 10 -80 C 70 -100 100 -40 80 0 C 70 20 40 20 40 40" stroke="${P.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M 20 -30 C 40 -40 55 -20 45 -5" stroke="${P.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <ellipse cx="22" cy="10" rx="14" ry="18" fill="${P.skinSh}" stroke="${P.ink}" stroke-width="4"/></g>`;
}
// pink brain line art
function brainIcon(x, y, s, glow = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s})">${glow > 0 ? `<ellipse rx="190" ry="150" fill="#ff9aa8" opacity="${.35 * glow}" filter="url(#blur20)"/>` : ''}
    <path d="M -150 20 C -180 -60 -120 -130 -50 -120 C -20 -160 60 -160 90 -110 C 160 -110 190 -40 160 20 C 180 70 130 120 70 110 C 40 140 -30 140 -60 110 C -120 120 -170 80 -150 20 Z" fill="#f7b7c0" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -100 -40 q 30 -30 60 0 q 30 30 60 -10 M -110 40 q 40 -20 70 10 q 30 30 70 0 q 30 -20 60 10 M 0 -120 q -10 40 10 70 M 60 -80 q 30 20 60 0" stroke="${P.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>
    <path d="M 20 110 q 10 40 -10 70" stroke="${P.ink}" stroke-width="6" fill="none"/></g>`;
}
// volume knob: angle -135..135
function knob(x, y, r, ang, o = {}) {
  let ticks = '';
  for (let i = 0; i <= 10; i++) { const a = (-135 + i * 27) * Math.PI / 180, c = i >= 8 ? P.red : P.ink; ticks += `<path d="M ${Math.sin(a) * (r + 14)} ${-Math.cos(a) * (r + 14)} L ${Math.sin(a) * (r + 34)} ${-Math.cos(a) * (r + 34)}" stroke="${c}" stroke-width="${i % 5 ? 4 : 7}" stroke-linecap="round"/>`; }
  return `<g transform="translate(${x} ${y})">${ticks}<g filter="url(#pkSh2)"><circle r="${r}" fill="#e8e4da" stroke="${P.ink}" stroke-width="6"/></g>
    <circle r="${r * .72}" fill="#d3cdbe" stroke="${P.ink}" stroke-width="3"/>
    <g transform="rotate(${ang})"><path d="M 0 ${-r * .2} V ${-r * .9}" stroke="${o.col || P.red}" stroke-width="12" stroke-linecap="round"/></g></g>`;
}
function heartIcon(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 0 40 C -60 0 -70 -40 -40 -55 C -20 -65 -5 -50 0 -38 C 5 -50 20 -65 40 -55 C 70 -40 60 0 0 40 Z" fill="${P.redSoft}" stroke="${P.ink}" stroke-width="5"/></g>`;
}
function sunIcon(x, y, s, t) { let r = ''; for (let i = 0; i < 10; i++) { const a = i / 10 * Math.PI * 2 + t * .6; r += `<path d="M ${Math.cos(a) * 70} ${Math.sin(a) * 70} L ${Math.cos(a) * 100} ${Math.sin(a) * 100}" stroke="${P.ink}" stroke-width="6" stroke-linecap="round"/>`; } return `<g transform="translate(${x} ${y}) scale(${s})">${r}<circle r="56" fill="${P.gold}" stroke="${P.ink}" stroke-width="6"/></g>`; }
function moonIcon(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 20 -60 A 62 62 0 1 0 50 40 A 50 50 0 1 1 20 -60 Z" fill="#f6e7a6" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/></g>`; }
function carIcon(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -110 20 L -100 -20 L -60 -30 L -30 -70 L 50 -70 L 80 -30 L 110 -20 L 115 20 Z" fill="#9cc1e0" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M -24 -60 L 0 -60 L 0 -32 L -46 -32 Z M 12 -60 L 44 -60 L 66 -32 L 12 -32 Z" fill="#eef5fb" stroke="${P.ink}" stroke-width="4"/><circle cx="-60" cy="22" r="22" fill="#3a3a40" stroke="${P.ink}" stroke-width="5"/><circle cx="66" cy="22" r="22" fill="#3a3a40" stroke="${P.ink}" stroke-width="5"/></g>`; }
function speaker(x, y, s, col = '#e8e4da') { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -60 -30 H -20 L 30 -75 V 75 L -20 30 H -60 Z" fill="${col}" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/></g>`; }
function hairCell(x, y, s, broken, t, i) {
  const bend = broken * 70, drop = broken * 26;
  let tuft = '';
  for (let k = -2; k <= 2; k++) {
    const h = 70 - Math.abs(k) * 12, sway = 4 * Math.sin(t * 3 + i + k);
    tuft += `<path d="M ${k * 12} -150 Q ${k * 12 + sway} ${-150 - h / 2} ${k * 12 + sway * 1.5 + bend * (k + 3) / 3} ${-150 - h + drop}" stroke="${broken > .5 ? '#9a8f84' : '#5a3d7a'}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})">${tuft}<path d="M -42 0 Q -48 -150 0 -152 Q 48 -150 42 0 Z" fill="${broken > .5 ? '#cfc6bc' : '#f4a7b9'}" stroke="${P.ink}" stroke-width="5"/>
    <circle cx="0" cy="-60" r="16" fill="${broken > .5 ? '#a89e93' : '#c56b8a'}" stroke="${P.ink}" stroke-width="3"/></g>`;
}
function shieldIcon(x, y, s) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 0 -150 L 130 -100 Q 130 60 0 150 Q -130 60 -130 -100 Z" fill="${P.nMint}" stroke="${P.ink}" stroke-width="8" stroke-linejoin="round"/><path d="M 0 -120 L 100 -82 Q 100 46 0 118 Z" fill="#fff" opacity=".35"/></g>`; }
function clockIcon(x, y, r, p, t) {
  const a = -Math.PI / 2 + p * Math.PI * 2;
  const arc = p > 0 ? `<path d="M 0 0 L 0 ${-r} A ${r} ${r} 0 ${p > .5 ? 1 : 0} 1 ${r * Math.cos(a)} ${r * Math.sin(a)} Z" fill="${P.nMint}" opacity=".9"/>` : '';
  return `<g transform="translate(${x} ${y})"><g filter="url(#pkSh2)"><circle r="${r}" fill="#fff" stroke="${P.ink}" stroke-width="7"/></g>${arc}
    ${Array.from({ length: 12 }, (_, i) => { const b = i / 12 * Math.PI * 2; return `<path d="M ${Math.sin(b) * r * .82} ${-Math.cos(b) * r * .82} L ${Math.sin(b) * r * .94} ${-Math.cos(b) * r * .94}" stroke="${P.ink}" stroke-width="5"/>`; }).join('')}
    <path d="M 0 0 L ${Math.cos(a) * r * .8} ${Math.sin(a) * r * .8}" stroke="${P.ink}" stroke-width="9" stroke-linecap="round"/><path d="M 0 0 L 0 ${-r * .5}" stroke="${P.ink}" stroke-width="11" stroke-linecap="round"/><circle r="10" fill="${P.ink}"/></g>`;
}
function hpIcon(x, y, s, col = '#e05a4a') { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -90 30 Q -100 -110 0 -110 Q 100 -110 90 30" stroke="${P.ink}" stroke-width="22" fill="none"/><path d="M -90 30 Q -100 -110 0 -110 Q 100 -110 90 30" stroke="${col}" stroke-width="12" fill="none"/>
  <rect x="-122" y="0" width="54" height="96" rx="20" fill="${col}" stroke="${P.ink}" stroke-width="6"/><rect x="68" y="0" width="54" height="96" rx="20" fill="${col}" stroke="${P.ink}" stroke-width="6"/></g>`; }
const qMark = (x, y, s, p, col = P.red) => p > 0 ? at(x, y, s * back(p), 8 * Math.sin(p * 6), T(0, 0, 130, '?', col, { st: P.ink, sw: 7 })) : '';
const zzz = (t, x, y, t0) => { let s = ''; for (let i = 0; i < 3; i++) { const p = prog(t, t0 + i * .35, t0 + i * .35 + 1.6); if (p > 0 && p < 1) s += T(x + 40 * p + i * 26, y - 140 * p - i * 30, 40 + i * 10, 'Z', P.night, { op: (1 - p) * 1.4 > 1 ? 1 : (1 - p) * 1.4 }); } return s; };
const note = (t, x, y, t0) => { const p = prog(t, t0, t0 + 1.3); if (p <= 0 || p >= 1) return ''; return `<g transform="translate(${x + 60 * p + 20 * Math.sin(p * 9)} ${y - 160 * p}) rotate(${-10 + 20 * Math.sin(p * 6)})" opacity="${1 - p}"><path d="M 0 0 V -50 L 30 -60 V -10" stroke="${P.ink}" stroke-width="6" fill="none"/><ellipse cx="-8" cy="0" rx="13" ry="10" fill="${P.ink}"/><ellipse cx="22" cy="-10" rx="13" ry="10" fill="${P.ink}"/></g>`; };

// ---------- scenes ----------
function s0(t) { // 0–7.58 bedroom: lights off, then noise
  const lampOff = t < 1.62 ? 1 : 0;
  const night = eout(prog(t, 1.62, 2.1));
  const eyeOpen = t >= 3.74;
  const lift = 14 * back(prog(t, 3.74, 4.0)) * (1 - .4 * prog(t, 6.6, 7.2));
  const look = t < 6.2 ? 0 : t < 6.7 ? -1.2 * eout(prog(t, 6.2, 6.4)) : t < 7.2 ? lerp(-1.2, 1.2, eio(prog(t, 6.7, 6.9))) : 0;
  const wv = prog(t, 4.58, 4.9);
  const zg = prog(t, 5.32, 5.5);
  let s = bedroom(t, { lamp: lampOff, night, eye: eyeOpen ? 'open' : 'closed', eyeS: eyeOpen ? 1 + .3 * Math.exp(-(t - 3.74) * 5) : 1, look, lift, breathe: !eyeOpen });
  if (!eyeOpen) s += zzz(t, 700, 860, 2.4);
  if (wv > 0) s += `<g transform="translate(0 ${-lift})">${waves(t, 660, 950, -1, 4, wv * .9, '#7d8bb5', { R: 160, w: 6 })}</g>`;
  if (zg > 0) s += `<g transform="translate(0 ${-lift})" opacity="${zg}">${zig(t, 470, 820, 150, 16 * zg, P.red, 5)}</g>`;
  s += bubble(560, 700, 'Rauschen?', pop(t, 4.9, .3), 600, 850);
  s += qMark(250, 900, .7, prog(t, 6.4, 6.7)) + qMark(520, 470, .6, prog(t, 6.72, 7.0)) + qMark(900, 640, .65, prog(t, 6.98, 7.25));
  // title card on top for the opening
  s += titleBurst(t, 0, 1.32, ['RAUSCHEN', 'IM OHR?'], { y: 820, w: 760 });
  return s;
}
function s2(t) { // 7.58–11.96 Kennst du das? Tinnitus, viel häufiger
  const a = 7.58;
  const ent = slideIn(t, a, .35, 1100);
  const ear = back(prog(t, 7.75, 8.15));
  const zg = prog(t, 8.1, 8.3);
  let s = `<g transform="translate(${ent} 0)">${horizon(t, 1340)}
    ${person(340, 1340, 1.18, { t, aR: lerp(6, 150, ear), eR: lerp(4, 95, ear), look: .4, brow: 1, mouth: t > 8.8 ? 'flat' : 'o', headTilt: -6 * ear })}
    <g opacity="${zg}">${zig(t, 470, 640, 200, 22, P.red, 6)}${zig(t + .3, 480, 700, 160, 14, P.red, 4)}</g>
    ${waves(t, 400, 670, 1, 3, .7 * zg, P.red, { R: 140, w: 5 })}</g>`;
  // TINNITUS sticky stamps in
  const tp = prog(t, 9.18, 9.42);
  s += sticky(760, 560, 470, 220, P.nYellow, ['TINNITUS'], 5, tp, { fs: 74, spin: 20 });
  // crowd pops: viel häufiger
  for (let i = 0; i < 6; i++) {
    const p = pop(t, 9.96 + i * .1, .3);
    if (p <= 0) continue;
    const x = 620 + (i % 3) * 140, y = 1340 - 0;
    const sc = .48;
    const fx = 620 + i * 75;
    s += at(fx, 1340, 1, 0, `<g transform="scale(1 ${p})">${person(0, 0, sc * (i % 2 ? .92 : 1), { t: t + i, hairStyle: i % 2 ? 'long' : 'short', top: ['#4a6fa5', '#a35d6a', '#3f7d6b', '#7a5aa0', '#c27b3a', '#23262d'][i], look: -.6, mouth: 'flat', brow: .6 })}</g>`);
    if (p > .8) s += zig(t + i, fx + 26, 1340 - 300, 50, 8, P.red, 3, 6);
  }
  return s;
}
function s3(t) { // 11.96–19.7 Studie 2008: 53 people, 4 min, soundproof room
  const a = 11.96;
  let s = srcTag('STUDIE · 2008', prog(t, a, a + .35));
  s += quoteCard(540, 520, 920, 300, prog(t, a + .05, a + .45), [
    [['53', prog(t, 13.76, 14.1)], [' junge Menschen', 0]],
    [['4 Minuten', prog(t, 16.6, 16.95)], [' · ', 0], ['schalldicht', prog(t, 17.98, 18.4)]]], '— Del Bo u. a. (Int. J. Audiology, 2008)', { fs: 58, top: 130 });
  // soundproof room
  const rp = eout(prog(t, 12.6, 13.0));
  if (rp > 0) {
    let foam = '';
    for (let i = 0; i < 14; i++) foam += `<path d="M ${170 + i * 52} 800 l 26 34 l 26 -34" stroke="${P.ink}" stroke-width="3" fill="#b9aa92"/>`;
    for (let j = 0; j < 9; j++) foam += `<path d="M 150 ${830 + j * 52} l 34 26 l -34 26" stroke="${P.ink}" stroke-width="3" fill="#b9aa92"/><path d="M 900 ${830 + j * 52} l -34 26 l 34 26" stroke="${P.ink}" stroke-width="3" fill="#b9aa92"/>`;
    const door = eio(prog(t, 17.9, 18.2));
    const walk = prog(t, 14.84, 16.0);
    const px = lerp(1000, 520, eout(walk));
    const sit = eout(prog(t, 16.0, 16.3));
    const outsideWaves = t > 18.2 ? `<g opacity="${prog(t, 18.2, 18.5)}">${waves(t, 1010, 1100, -1, 3, .8, P.red, { R: 90 })}${waves(t, 70, 1100, 1, 3, .8, P.red, { R: 90 })}</g>` : '';
    s += `<g transform="translate(0 ${400 * (1 - rp)})" opacity="${rp}">
      <g filter="url(#pkSh)"><rect x="140" y="790" width="800" height="560" fill="#efe8d8" stroke="${P.ink}" stroke-width="7"/></g>${foam}
      <rect x="148" y="1300" width="784" height="44" fill="#cdbfa6"/>
      ${clockIcon(540, 940, 70, prog(t, 16.6, 19.4), t)}
      ${t >= 14.84 ? person(px, 1310 + 30 * sit, .62 * (1 - .12 * sit), { t, walk: walk < 1 ? t * 9 : undefined, look: walk < 1 ? -1 : 0, mouth: t > 18.6 ? 'o' : 'flat', brow: t > 18.6 ? .8 : 0 }) : ''}
      ${sit > 0 ? `<rect x="${px - 50}" y="${1290}" width="100" height="16" fill="#8a6a4a" stroke="${P.ink}" stroke-width="3"/>` : ''}
      <!-- door -->
      <rect x="${940 - 10}" y="1010" width="14" height="300" fill="#8a6a4a"/>
      <path d="M 936 1010 L ${936 - 0} 1310 L ${936 - 120 * (1 - door)} ${1300 - 0} L ${936 - 120 * (1 - door)} 1020 Z" fill="#c7a77d" stroke="${P.ink}" stroke-width="4" opacity="${1 - door * .9}"/>
      ${outsideWaves}${stampX(1010, 1100, .45, prog(t, 18.5, 18.75))}${stampX(70, 1100, .45, prog(t, 18.6, 18.85))}</g>`;
  }
  // 53 people counter badge
  const cp = pop(t, 13.76, .3);
  if (cp > 0) {
    const n = Math.min(53, Math.round(53 * eout(prog(t, 13.76, 14.6))));
    s += at(890, 730, cp, 4, `<g filter="url(#pkSh2)"><rect x="-110" y="-56" width="220" height="112" fill="${P.nPeach}"/></g>${T(0, 22, 64, n + '×', P.ink)}`);
  }
  return s;
}
function s4(t) { // 19.7–26.02: 83 %; Rauschen / Summen / Puls
  let s = srcTag('STUDIE · 2008', 1);
  const g = eout(prog(t, 19.75, 20.5));
  s += `<g transform="translate(0 0)">${barChart(t, 120, 1320, 420, 840, [{ v: .83, val: Math.round(83 * g) + ' %', col: P.nPeach, t0: 19.75, d: .75 }], { vfs: 92 })}
    <rect x="${120 + 210 - 118}" y="${1320 - 840}" width="236" height="840" fill="none" stroke="${P.ink}" stroke-width="3" stroke-dasharray="10 10" opacity=".45"/>
    ${T(330, 1320 - 860, 36, '100 %', P.inkSoft, { op: .7 })}</g>`;
  // ear hears a sound that is not there
  const ep = pop(t, 21.2, .35);
  if (ep > 0) s += at(800, 520, ep, 0, `${earIcon(-40, 0, .8)}<g opacity="${prog(t, 21.5, 21.7)}">${waves(t, -110, 0, -1, 3, .8, '#7d8bb5', { R: 110 })}</g>`) + bubble(770, 360, 'gar nichts da!', pop(t, 22.42, .3), 790, 440, { fs: 40 });
  s += sticky(800, 790, 400, 150, P.nLilac, ['RAUSCHEN'], -4, prog(t, 23.3, 23.6), { fs: 58 });
  s += sticky(780, 990, 380, 150, P.nMint, ['SUMMEN'], 3, prog(t, 24.1, 24.4), { fs: 58 });
  const hb = t > 25.28 ? 1 + .12 * Math.abs(Math.sin((t - 25.28) * 7)) : 1;
  s += sticky(810, 1190, 380, 150, P.nPeach, ['PULS'], -3, prog(t, 25.28, 25.55), { fs: 58, extra: t > 25.4 ? heartIcon(-120, 0, .55 * hb) : '' });
  return s;
}
function s5(t) { // 26.02–35.88: Warum? Grundrauschen vs Alltag; still -> Gehirn dreht hoch
  let s = '';
  const q = pop(t, 26.02, .3), qOut = prog(t, 26.6, 26.9);
  // ear stays left
  const ep = pop(t, 26.5, .35);
  const knobA = t < 32.52 ? -100 : lerp(-100, 95, eio(prog(t, 32.52, 33.88)));
  const vol = (knobA + 135) / 270;
  const noisy = prog(t, 30.1, 30.5) * (1 - prog(t, 31.68, 32.0));
  const base = t < 34.46 ? .5 + .5 * cl(vol * 1.3) : 1;
  if (ep > 0) {
    s += at(250, 1000, ep, 0, earIcon(0, 0, 1.25));
    // faint ground noise (grey wavy line from the ear), amplitude rises with brain volume
    const amp = 6 + 26 * cl((vol - .13) * 1.4) + (t > 34.46 ? 10 * Math.sin((t - 34.46) * 9) : 0);
    s += `<g opacity="${(.35 + .65 * cl(vol * 1.5)) * prog(t, 27.5, 27.9) * (1 - .75 * noisy)}">${zig(t, 400, 1000, 240, amp, '#7d6bb0', 5, 14)}</g>`;
    if (t > 34.46) s += waves(t, 400, 1000, 1, 4, .9, P.red, { R: 220, speed: 1.6 });
  }
  s += sticky(720, 1000, 480, 150, P.nLilac, ['GRUNDRAUSCHEN'], -3, prog(t, 28.6, 28.9), { fs: 50 });
  // day: sun + noise sources
  const day = pop(t, 29.66, .35) * (1 - prog(t, 31.68, 31.98));
  if (day > 0) s += sunIcon(860, 470, .9 * day, t);
  const nIn = (k) => pop(t, 30.1 + k * .18, .3) * (1 - prog(t, 31.7 + k * .05, 32.0 + k * .05));
  const exitX = k => -900 * ein(prog(t, 31.7 + k * .05, 32.1 + k * .05));
  if (nIn(0) > 0) s += `<g transform="translate(${exitX(0)} 0)">${carIcon(330, 640, .95 * nIn(0))}${T(470, 560, 60, 'HUP!', P.red, { st: '#fff', sw: 8, op: nIn(0) })}</g>`;
  if (nIn(1) > 0) s += `<g transform="translate(${exitX(1)} 0)">${bubble(620, 430, 'Bla bla!', nIn(1), 560, 520)}</g>`;
  if (nIn(2) > 0) s += `<g transform="translate(${exitX(2)} 0)">${speaker(170, 470, .9 * nIn(2), '#e8c27a')}${waves(t, 210, 470, 1, 3, .9, P.red, { R: 120 })}</g>`;
  // ALLTAGSLÄRM note slides over GRUNDRAUSCHEN, flies off when it gets quiet
  const al = prog(t, 30.84, 31.15), alOut = ein(prog(t, 31.7, 32.0));
  if (al > 0 && alOut < 1) s += `<g transform="translate(${1100 * alOut} ${-200 * alOut})">${sticky(lerp(1300, 730, eout(al)), 1010, 500, 170, P.nPeach, ['ALLTAGSLÄRM'], 4, 1, { fs: 54, spin: 0 })}</g>`;
  if (noisy > 0) s += `<g opacity="${noisy}">${waves(t, 1000, 760, -1, 5, .9, '#c96a4a', { R: 420, w: 9, speed: 1.8 })}</g>`;
  // night: moon, brain + volume knob
  const nt = pop(t, 31.94, .35);
  if (nt > 0) s += moonIcon(880, 470, .85 * nt);
  const bp = pop(t, 32.4, .35);
  if (bp > 0) {
    s += brainIcon(560, 560, .95 * bp, cl(vol));
    s += at(560, 760, bp, 0, `<path d="M 0 -60 V 0" stroke="${P.ink}" stroke-width="5" stroke-dasharray="10 8"/>`);
    s += `<g transform="translate(560 ${780}) scale(${bp}) translate(-560 -780)">${knob(560, 780, 62, knobA)}</g>`;
    // volume meter
    for (let i = 0; i < 8; i++) { const on = vol * 8 > i + .5; s += `<rect x="${680 + i * 34}" y="${800 - i * 12}" width="24" height="${20 + i * 12}" fill="${on ? (i > 5 ? P.red : '#7cc39b') : 'none'}" stroke="${P.ink}" stroke-width="3" opacity="${bp}"/>`; }
  }
  if (t > 34.9) { const hb = 1 + .14 * Math.max(0, Math.sin((t - 34.9) * 7.5)); s += heartIcon(300, 1250, .9 * hb * pop(t, 34.9, .3)); }
  // Warum? stamp first
  if (q > 0 && qOut < 1) s += at(540, 800, (1 - qOut) * q * 1.4, -6, T(0, 50, 170, 'WARUM?', P.red, { st: P.ink, sw: 9 }));
  return s;
}
function s7(t) { // 35.88–39.1 meist harmlos
  let s = horizon(t, 1340);
  const p = prog(t, 36.12, 36.45);
  s += sticky(540, 600, 720, 300, P.nMint, ['MEIST', 'HARMLOS'], -3, p, { fs: 92 });
  s += stampOk(830, 760, .8, prog(t, 38.16, 38.4));
  const r = eout(prog(t, 38.16, 38.5));
  s += person(540, 1340, .88, { t, aL: lerp(6, 35, r), aR: lerp(6, 35, r), eL: lerp(4, 30, r), eR: lerp(4, 30, r), mouth: 'smile', look: 0 });
  return s;
}
function s8(t) { // 39.1–46.44 Jarach 2022: 1 in 7, rises with age
  let s = srcTag('META-ANALYSE · 2022', prog(t, 39.1, 39.45));
  s += quoteCard(540, 480, 900, 230, prog(t, 39.15, 39.55), [[['Etwa ', 0], ['jeder 7.', prog(t, 42.0, 42.35)], [' Erwachsene', 0]]], '— Jarach u. a. (JAMA Neurology, 2022)', { fs: 60, top: 108 });
  for (let i = 0; i < 7; i++) {
    const p = pop(t, 41.56 + i * .06, .3);
    if (p <= 0) continue;
    const hit = i === 6 && t >= 42.0;
    const x = 150 + i * 130;
    s += at(x, 870, 1, 0, `<g transform="scale(1 ${p})">${person(0, 0, .3, { t: t + i, top: hit ? '#d9536a' : '#8c8578', pants: hit ? P.pants : '#c9c1b2', hairStyle: i % 3 === 1 ? 'long' : 'short', mouth: hit ? 'o' : 'smile', brow: hit ? 1 : 0, breath: false })}</g>`);
    if (hit) s += zig(t, x + 18, 690, 50, 8, P.red, 3, 6);
  }
  s += `<path d="M 80 905 H 1000" stroke="${P.ink}" stroke-width="2" opacity=".3"/>`;
  if (t > 43.7) s += barChart(t, 140, 1320, 600, 300, [
    { v: .4, val: '10 %', label: '18–44', col: P.nBlue, t0: 43.86, d: .5 },
    { v: .57, val: '14 %', label: '45–64', col: P.nLilac, t0: 44.25, d: .5 },
    { v: .97, val: '24 %', label: '65+', col: P.nPeach, t0: 44.84, d: .6 }], { vfs: 50, lfs: 34 });
  s += sticky(905, 1140, 250, 200, P.nYellow, ['1 VON', '4'], 6, prog(t, 45.44, 45.7), { fs: 58 });
  return s;
}
function s9(t) { // 46.44–50.96 Lärm: Kopfhörer, Konzerte, Clubs
  let s = horizon(t, 1340);
  const bopA = Math.sin(t * 2 * Math.PI * 2.1);
  const loud = prog(t, 47.66, 47.9);
  s += person(330, 1340, 1.12, { t, headTilt: 7 * bopA * (.4 + .6 * loud), mouth: 'smile', eyes: 'closed', headExtra: headphones(), aL: 20, eL: 50 + 10 * bopA, aR: 10, eR: 10 });
  s += `<g opacity="${.4 + .6 * loud}">${waves(t, 400, 680, 1, 4, 1, P.red, { R: 200 + 120 * loud, w: 8, speed: 2 })}${waves(t, 260, 680, -1, 4, 1, P.red, { R: 120 + 60 * loud, w: 8, speed: 2 })}</g>`;
  s += note(t, 420, 560, 46.6) + note(t, 300, 520, 47.3) + note(t, 460, 540, 48.1) + note(t, 330, 560, 48.9) + note(t, 440, 530, 49.7) + note(t, 320, 560, 50.4);
  // dB meter
  const lv = .3 + .62 * loud + .06 * Math.sin(t * 17);
  s += `<g transform="translate(140 470)">${Array.from({ length: 10 }, (_, i) => `<rect x="0" y="${-i * 26}" width="56" height="20" fill="${lv * 10 > i ? (i > 6 ? P.red : i > 4 ? P.gold : '#7cc39b') : 'none'}" stroke="${P.ink}" stroke-width="3"/>`).join('')}</g>`;
  s += at(420, 420, pop(t, 47.66, .3), -6, T(0, 0, 100, 'LÄRM!', P.red, { st: P.ink, sw: 7 }));
  s += sticky(800, 560, 400, 160, P.nYellow, ['KOPFHÖRER'], -4, prog(t, 48.6, 48.9), { fs: 52 });
  s += sticky(810, 800, 390, 160, P.nLilac, ['KONZERTE'], 3, prog(t, 49.83, 50.1), { fs: 52 });
  s += sticky(790, 1040, 360, 160, P.nPeach, ['CLUBS'], -2, prog(t, 50.39, 50.62), { fs: 56 });
  return s;
}
function s10(t) { // 50.96–55.86 hair cells destroyed
  let s = '';
  const mp = eout(prog(t, 50.96, 51.3));
  s += `<g transform="translate(0 ${300 * (1 - mp)})" opacity="${mp}">
    <g filter="url(#pkSh)"><rect x="80" y="760" width="920" height="460" rx="30" fill="#f6eee6"/></g>
    <path d="M 80 1110 Q 540 1090 1000 1110 L 1000 1220 L 80 1220 Z" fill="#e8c9c0" stroke="${P.ink}" stroke-width="5"/>
    <rect x="80" y="760" width="920" height="460" rx="30" fill="none" stroke="${P.ink}" stroke-width="5"/>`;
  const broken = [0, 1, 0, 1, 1, 0, 1, 0];
  for (let i = 0; i < 8; i++) {
    const bt = 52.04 + [0, .12, 0, .3, .42, 0, .55, 0][i];
    const b = broken[i] ? eout(prog(t, bt, bt + .25)) : 0;
    s += hairCell(170 + i * 106, 1110 + 3 * Math.sin(i * 2), .95, b, t, i);
  }
  s += `</g>`;
  // loud wave sweeps across
  const sw = prog(t, 51.52, 52.9);
  if (sw > 0 && sw < 1) for (let k = 0; k < 3; k++) { const x = lerp(-150, 1250, sw) - k * 90; s += `<path d="M ${x} 760 Q ${x + 70} 940 ${x} 1110" stroke="${P.red}" stroke-width="${16 - k * 4}" fill="none" stroke-linecap="round" opacity="${.9 - k * .25}"/>`; }
  s += sticky(300, 560, 440, 150, P.nLilac, ['HAARZELLEN'], -4, prog(t, 53.08, 53.38), { fs: 54 });
  s += sticky(740, 520, 440, 210, P.nPeach, ['WACHSEN', 'NICHT NACH'], 4, prog(t, 54.9, 55.2), { fs: 50 });
  s += stampX(488, 960, .5, prog(t, 55.18, 55.4)) + stampX(806, 960, .5, prog(t, 55.32, 55.54));
  // crack sparks
  for (const [i, bt] of [[1, 52.16], [3, 52.34], [4, 52.46], [6, 52.59]]) { const p = prog(t, bt, bt + .35); if (p > 0 && p < 1) s += `<g transform="translate(${170 + i * 106} 930)">${[0, 1, 2, 3, 4].map(k => { const a = -Math.PI / 2 + (k - 2) * .5; return `<path d="M ${Math.cos(a) * 30 * p} ${Math.sin(a) * 30 * p} L ${Math.cos(a) * 70 * p} ${Math.sin(a) * 70 * p}" stroke="${P.gold}" stroke-width="5" stroke-linecap="round" opacity="${1 - p}"/>`; }).join('')}</g>`; }
  return s;
}
function s11(t) { // 55.86–63.44 ear worse -> brain turns up more -> louder; sleep loss & stress
  let s = '';
  const e = pop(t, 55.9, .35);
  s += at(230, 760, e, 0, earIcon(0, 0, 1.1));
  // incoming outside sound gets weaker
  const weak = prog(t, 56.62, 57.2);
  s += `<g opacity="${1 - .75 * weak}">${waves(t + .5, 80, 760, -1, 3, .8, '#7d8bb5', { R: 90 })}</g>`;
  { const dp = pop(t, 56.86, .3); if (dp > 0) s += at(110, 600, dp, 0, `<path d="M 0 -60 V 40 M -30 10 L 0 44 L 30 10" stroke="${P.ink}" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M 0 -60 V 40 M -30 10 L 0 44 L 30 10" stroke="${P.red}" stroke-width="11" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`); }
  const bp = pop(t, 57.4, .35);
  const ang = lerp(40, 125, eio(prog(t, 57.66, 58.9))) + (t > 62.22 ? 4 * Math.sin(t * 30) * Math.exp(-(t - 62.22) * 3) : 0);
  const vol = (ang + 135) / 270;
  if (bp > 0) {
    s += `<path d="M 380 740 Q 470 650 560 640" stroke="${P.ink}" stroke-width="5" fill="none" stroke-dasharray="12 10" opacity="${bp}"/><path d="M 545 625 L 568 640 L 545 660" stroke="${P.ink}" stroke-width="5" fill="none" opacity="${bp}"/>`;
    s += brainIcon(760, 620, .9 * bp, vol);
    s += `<g transform="translate(760 940) scale(${bp}) translate(-760 -940)">${knob(760, 940, 70, ang)}</g>`;
  }
  const lv = prog(t, 59.62, 60.4), boost = prog(t, 62.22, 62.6);
  const amp = 10 + 22 * lv + 16 * boost;
  s += `<g opacity="${.3 + .7 * prog(t, 58.4, 58.8)}">${zig(t, 120, 1080, 540, amp, P.red, 6, 26)}${lv > 0 ? zig(t + .5, 140, 1080, 500, amp * .6, P.redSoft, 4, 20) : ''}</g>`;
  s += sticky(280, 1230, 460, 150, P.nLilac, ['SCHLAFMANGEL'], -5, prog(t, 60.98, 61.28), { fs: 46, extra: moonIcon(-190, -48, .3) });
  s += sticky(780, 1240, 360, 150, P.nPeach, ['STRESS'], 4, prog(t, 61.86, 62.12), { fs: 56 });
  if (boost > 0 && boost < 1) s += `<circle cx="660" cy="1080" r="${60 + 300 * boost}" fill="none" stroke="${P.red}" stroke-width="${10 * (1 - boost)}"/>`;
  return s;
}
function s12(t) { // 63.44–71.42 60-60 rule
  let s = '';
  const sh = pop(t, 63.5, .35), mv = eio(prog(t, 65.2, 65.6));
  const sx = lerp(540, 200, mv), sy = lerp(800, 470, mv), ss = lerp(1.25, .62, mv);
  if (sh > 0) s += at(sx, sy, ss * sh, 0, shieldIcon(0, 0, 1) + earIcon(-20, 0, .7));
  s += sticky(650, 470, 600, 210, P.gold, ['60-60-REGEL'], -3, prog(t, 65.61, 65.9), { fs: 76 });
  // left: headphones + volume bar 60 %
  const lp = pop(t, 66.42, .35);
  if (lp > 0) {
    const f = eout(prog(t, 67.04, 67.95)) * .6 + (t > 68.7 ? .015 * Math.sin(t * 9) : 0);
    s += at(290, 820, lp, 0, hpIcon(0, 0, 1.05) + `<g transform="translate(-170 210)"><rect x="0" y="0" width="340" height="56" rx="28" fill="#fff" stroke="${P.ink}" stroke-width="5"/>
      <rect x="6" y="6" width="${328 * f}" height="44" rx="22" fill="#7cc39b"/><path d="M ${340 * .6} -16 V 72" stroke="${P.red}" stroke-width="5" stroke-dasharray="8 6"/></g>`);
  }
  s += sticky(290, 1200, 400, 170, P.nYellow, ['MAX. 60 %'], -4, prog(t, 67.91, 68.2), { fs: 64 });
  // right: clock 60 min
  const rp = pop(t, 69.3, .35);
  if (rp > 0) s += at(790, 870, rp, 0, clockIcon(0, 0, 150, eio(prog(t, 69.44, 70.4)), t));
  s += sticky(790, 1200, 440, 170, P.nMint, ['MAX. 60 MIN'], 3, prog(t, 70.14, 70.42), { fs: 60 });
  return s;
}
function s13(t) { // 71.42–79.98 background sound helps
  const fan = prog(t, 74.9, 75.25), rain = prog(t, 75.96, 76.4);
  const fade = prog(t, 77.0, 79.24);
  const closed = t > 78.76;
  let s = bedroom(t, { night: 1, eye: closed ? 'closed' : 'open', look: closed ? 0 : -.6, fan, rain, breathe: closed, clock: '00:30' });
  s += `<g opacity="${(1 - fade) * prog(t, 71.5, 71.8)}">${zig(t, 470, 830, 160, 18, P.red, 5)}</g>`;
  if (fan > 0) s += waves(t, 800, 976, -1, 4, .6 * fan, '#6f9fd0', { R: 240, w: 6, speed: .8 });
  if (rain > 0) s += waves(t + .4, 400, 600, 1, 4, .55 * rain, '#6f9fd0', { R: 240, w: 6, speed: .8 });
  s += bubble(450, 700, 'Rauschen?', pop(t, 71.6, .3) * (1 - prog(t, 73.6, 73.9)), 600, 860);
  s += sticky(780, 520, 330, 140, P.nBlue, ['VENTILATOR'], 4, prog(t, 75.04, 75.3), { fs: 42 });
  s += sticky(320, 860, 250, 130, P.nMint, ['REGEN'], -4, prog(t, 75.96, 76.2), { fs: 48 });
  if (closed) s += zzz(t, 700, 860, 79.0);
  return s;
}
function s14(t) { // 79.98–88.32 see an ENT doctor if …
  let s = '';
  s += quoteCard(540, 470, 900, 200, prog(t, 79.98, 80.35), [[['Zum ', 0], ['HNO-Arzt', prog(t, 81.15, 81.5)], [', wenn …', 0]]], '', { fs: 70, top: 112 });
  s += sticky(300, 780, 420, 250, P.nYellow, ['EIN OHR'], -4, prog(t, 82.22, 82.5), { fs: 56, extra: earIcon(-24, -95, .3) + '' });
  const hb = t > 83.66 ? 1 + .15 * Math.max(0, Math.sin((t - 83.66) * 8)) : 1;
  s += sticky(780, 800, 420, 250, P.nPeach, ['PULSIEREND'], 3, prog(t, 83.66, 83.92), { fs: 52, extra: heartIcon(0, -70, .5 * hb) });
  s += sticky(300, 1140, 440, 270, P.nLilac, ['PLÖTZLICH +', 'HÖRVERLUST'], 3, prog(t, 85.1, 85.38), { fs: 46, extra: `<path d="M 10 -125 L -20 -78 L 4 -78 L -14 -40 L 30 -92 L 6 -92 L 22 -125 Z" fill="${P.gold}" stroke="${P.ink}" stroke-width="4" stroke-linejoin="round"/>` });
  s += sticky(780, 1150, 420, 250, P.nMint, ['WOCHENLANG'], -3, prog(t, 86.38, 86.66), { fs: 52, extra: `<g transform="translate(0 -80)"><rect x="-40" y="-30" width="80" height="62" rx="6" fill="#fff" stroke="${P.ink}" stroke-width="4"/><rect x="-40" y="-30" width="80" height="16" fill="${P.red}" stroke="${P.ink}" stroke-width="4"/>${[0, 1, 2].map(r => [0, 1, 2, 3].map(c => `<circle cx="${-24 + c * 16}" cy="${-2 + r * 12}" r="3" fill="${P.ink}"/>`).join('')).join('')}</g>` });
  return s;
}
function s15(t) { // 88.32–90.9 do you hear it too?
  let s = horizon(t, 1340) + moonIcon(860, 470, .7);
  const ear = back(prog(t, 88.5, 88.85));
  s += person(480, 1340, 1.18, { t, aR: lerp(6, 150, ear), eR: lerp(4, 95, ear), look: 0, lookY: .5, mouth: 'flat', brow: .5, headTilt: -5 * ear });
  s += `<g opacity="${prog(t, 89.0, 89.3)}">${zig(t, 610, 640, 170, 18, P.red, 5)}</g>`;
  s += sticky(820, 900, 300, 220, P.nLilac, ['DU', 'AUCH?'], 5, prog(t, 89.66, 89.95), { fs: 64 });
  return s;
}
function s16(t) { // 90.9–96.6 share: two people, phone, friend with headphones
  let s = horizon(t, 1340);
  const ph = back(prog(t, 91.0, 91.35));
  const point = back(prog(t, 94.3, 94.6));
  const off = eio(prog(t, 95.1, 95.6));
  const bop = Math.sin(t * 2 * Math.PI * 2) * (1 - off);
  s += person(300, 1340, 1.05, { t, hairStyle: 'long', top: '#3f7d6b', aR: lerp(6, 60, ph) + 30 * point, eR: lerp(4, 70, ph) - 50 * point, holdR: ph > .1 ? `<g transform="rotate(${-40 * (1 - point)})">${phoneProp(prog(t, 91.48, 91.7))}</g>` : '', mouth: t > 91 && t < 95.5 ? 'talk' : 'smile', look: .6 });
  s += person(780, 1340, 1.08, { t, headTilt: 6 * bop, eyes: off > .5 ? 'n' : 'closed', mouth: off > .5 ? 'o' : 'smile', look: off > .5 ? -.7 : 0, headExtra: off < .5 ? headphones() : '', aL: lerp(10, 150, Math.sin(off * Math.PI)), eL: lerp(10, 60, Math.sin(off * Math.PI)), brow: off });
  if (off >= .5) s += `<g transform="translate(780 ${1340 - 1.08 * 470}) scale(${1.08})"><path d="M -50 -40 Q 0 30 50 -40" stroke="${P.ink}" stroke-width="16" fill="none"/><path d="M -50 -40 Q 0 30 50 -40" stroke="#e05a4a" stroke-width="9" fill="none"/></g>`;
  if (off < .5) s += note(t, 860, 640, 92.0) + note(t, 700, 620, 92.9) + note(t, 850, 640, 93.8);
  s += bubble(330, 520, 'Schau mal!', pop(t, 91.6, .3), 340, 620);
  s += bubble(790, 470, 'Oh!', pop(t, 95.6, .3), 790, 560, { fs: 56 });
  return s;
}

const SC = [[0, 7.58, s0], [7.58, 11.96, s2], [11.96, 19.7, s3], [19.7, 26.02, s4], [26.02, 35.88, s5], [35.88, 39.1, s7], [39.1, 46.44, s8], [46.44, 50.96, s9], [50.96, 55.86, s10], [55.86, 63.44, s11], [63.44, 71.42, s12], [71.42, 79.98, s13], [79.98, 88.32, s14], [88.32, 90.9, s15], [90.9, 999, s16]];
function scene(t) {
  let i = SC.findIndex(x => t >= x[0] && t < x[1]); if (i < 0) i = SC.length - 1;
  let body = SC[i][2](t);
  // outgoing page slides off to the left over the first 0.32 s of a new shot
  if (i > 0 && t < SC[i][0] + .32) { const k = ein(prog(t, SC[i][0], SC[i][0] + .32)); body += `<g transform="translate(${-1150 * k} ${-60 * k}) rotate(${-6 * k} 540 960)">${SC[i - 1][2](t)}</g>`; }
  const tagP = prog(t, 1.25, 1.55);
  return paperDefs() + paperBG(t) + body + topicTag("TINNITUS", tagP, t);
}

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
