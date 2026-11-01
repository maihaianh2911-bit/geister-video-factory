// v82 kit: warm nostalgic picture-book look. Thin dark-brown outlines, soft flat colours,
// one recurring 6-year-old ("du"), golden glow = adult memories, night blue = problems.
import { cl, prog, eio, eout, ein, back, lerp, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, hash };

export const K = {
  ol: '#2b1d16', paper: '#fffaf0',
  cream: '#f6ead2', peach: '#f8d9bf', sky: '#cfe6f3', mint: '#d7eedf', lilac: '#e4dcf3', sand: '#f3e3c1',
  night: '#1d2340', night2: '#2c3560', dusk: '#4a3f6e',
  skin: '#f6c9a3', skinSh: '#e3a982', hair: '#6b3f24', hairHi: '#8e5634',
  shirt: '#f5c84c', stripe: '#ef8a3c', shorts: '#3f73c4', shortsSh: '#2f5a9e',
  gold: '#ffcf5a', goldL: '#fff0b8', violet: '#8f7bd6', teal: '#2f8f8a', tealL: '#bfe4df',
  red: '#d9493f', redL: '#f6c8c2', green: '#3c9a5f', greenL: '#cbead4', grey: '#9d97a6', greyL: '#dcd8e0',
  wood: '#c98f5a', woodSh: '#a06a3c', wall: '#f3e1c4', blue: '#3f73c4',
};
const OL = K.ol;

export const fade = (t, t0, d = .35) => eio(prog(t, t0, t0 + d));
export const fout = (t, t0, d = .35) => 1 - eio(prog(t, t0, t0 + d));
export const pop = (t, t0, d = .4) => back(prog(t, t0, t0 + d), 1.6);
export const f1 = n => Number.isFinite(n) ? Math.round(n * 10) / 10 : 0;

// ---------- text ----------
const W = { "0": .71, "1": .45, "2": .65, "3": .67, "4": .7, "5": .65, "6": .67, "7": .59, "8": .68, "9": .67, " ": .2, "!": .38, "%": 1.04, "&": .7, "'": .37, "(": .39, ")": .39, "+": .69, ",": .37, "-": .47, ".": .37, "/": .41, ":": .37, "?": .6, "A": .8, "B": .67, "C": .75, "D": .72, "E": .61, "F": .58, "G": .75, "H": .75, "I": .29, "J": .6, "K": .76, "L": .57, "M": .96, "N": .77, "O": .78, "P": .66, "Q": .79, "R": .67, "S": .67, "T": .69, "U": .72, "V": .8, "W": 1.08, "X": .79, "Y": .78, "Z": .69, "a": .6, "b": .65, "c": .6, "d": .65, "e": .61, "f": .42, "g": .65, "h": .65, "i": .3, "j": .3, "k": .61, "l": .3, "m": .94, "n": .65, "o": .63, "p": .65, "q": .65, "r": .45, "s": .59, "t": .42, "u": .65, "v": .65, "w": .88, "x": .61, "y": .65, "z": .59, "Ä": .8, "Ö": .78, "Ü": .72, "ä": .6, "ö": .63, "ü": .65, "ß": .69, "„": .59, "“": .62, "–": .5, "…": 1.12, "€": .7, "×": .69, "✓": .88 };
export function textW(s, size) { let w = 0; for (const ch of String(s)) w += W[ch] !== undefined ? W[ch] : .68; return w * size; }
const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
export const T = (x, y, s, size, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="Inter" font-weight="${o.w || 900}" font-size="${size}" fill="${o.fill || OL}" text-anchor="${o.anchor || 'middle'}"${o.op !== undefined ? ` opacity="${f1(o.op * 100) / 100}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 10}" paint-order="stroke" stroke-linejoin="round"` : ''} style="font-family:'Inter';font-weight:${o.w || 900}"${o.ls ? ` letter-spacing="${o.ls}"` : ''}>${esc(s)}</text>`;

// headline lines at the top; appears at t0 (slides up); optional marker word
export function headline(t, y, lines, size, o = {}) {
  const a = o.t0 === undefined ? 1 : fade(t, o.t0, .4);
  const lh = size * 1.12;
  let out = '';
  lines.forEach((l, i) => {
    const ly = y + i * lh;
    if (o.mark && l.includes(o.mark.word)) {
      const pre = l.slice(0, l.indexOf(o.mark.word)), full = textW(l, size), x0 = 540 - full / 2 + textW(pre, size), mw = textW(o.mark.word, size);
      const p = eout(prog(t, o.mark.t, o.mark.t + .35));
      if (p > 0) out += `<rect x="${f1(x0 - 12)}" y="${f1(ly - size * .8)}" width="${f1((mw + 24) * p)}" height="${f1(size * .98)}" rx="12" fill="${o.mark.color || K.gold}"/>`;
    }
    out += T(540, ly, l, size, { fill: o.fill });
  });
  return `<g opacity="${f1(a * 100) / 100}" transform="translate(0 ${f1((1 - a) * 24)})">${out}</g>`;
}

export function chip(x, y, s, o = {}) {
  const size = o.size || 44, w = textW(s, size) + size * 1.2, h = size * 1.6;
  const a = o.a === undefined ? 1 : o.a;
  return `<g opacity="${f1(a * 100) / 100}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1((o.sc ?? 1) * 100) / 100})"><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="${o.bg || OL}" stroke="${o.line || OL}" stroke-width="5"/>${T(0, size * .36, s, size, { fill: o.fill || '#fff' })}</g>`;
}

// speech bubble (rounded box + tail to [tx,ty]); returns svg
export function bubble(x, y, w, h, tail, inner, o = {}) {
  const a = o.a === undefined ? 1 : o.a, sc = o.sc ?? 1, cx = x + w / 2, cy = y + h / 2;
  const tb = tail ? `<path d="M ${f1(cx - 40)} ${f1(y + h - 4)} L ${f1(tail[0])} ${f1(tail[1])} L ${f1(cx + 30)} ${f1(y + h - 4)}" fill="${o.bg || '#fff'}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>` : '';
  return `<g opacity="${f1(a * 100) / 100}" transform="translate(${f1(cx)} ${f1(cy)}) scale(${f1(sc * 100) / 100}) translate(${f1(-cx)} ${f1(-cy)})">${tb}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40" fill="${o.bg || '#fff'}" stroke="${OL}" stroke-width="6"/>${tail ? `<path d="M ${f1(cx - 37)} ${f1(y + h - 3)} L ${f1(cx + 27)} ${f1(y + h - 3)}" stroke="${o.bg || '#fff'}" stroke-width="8"/>` : ''}${inner}</g>`;
}

// soft glow blob
export const glow = (x, y, r, col, op = .5) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${col}" opacity="${f1(op * 100) / 100}" filter="url(#blur40)"/>`;

// sparkle star
export function spark(x, y, r, col = K.gold, op = 1) {
  if (r <= 0 || op <= 0) return '';
  return `<path d="M ${f1(x)} ${f1(y - r)} Q ${f1(x + r * .18)} ${f1(y - r * .18)} ${f1(x + r)} ${f1(y)} Q ${f1(x + r * .18)} ${f1(y + r * .18)} ${f1(x)} ${f1(y + r)} Q ${f1(x - r * .18)} ${f1(y + r * .18)} ${f1(x - r)} ${f1(y)} Q ${f1(x - r * .18)} ${f1(y - r * .18)} ${f1(x)} ${f1(y - r)} Z" fill="${col}" opacity="${f1(op * 100) / 100}"/>`;
}
export function sparks(t, cx, cy, R, n, seed, a = 1) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const an = hash(i + seed) * 6.283 + t * (.3 + hash(i + seed + 5) * .4), rr = R * (.55 + .45 * hash(i + seed + 2));
    const tw = .5 + .5 * Math.sin(t * 3 + i * 1.7);
    s += spark(cx + Math.cos(an) * rr, cy + Math.sin(an) * rr * .8, (10 + 12 * hash(i + seed + 3)) * tw, i % 3 ? K.gold : K.goldL, a * (.5 + .5 * tw));
  }
  return s;
}

// cloud path (thought/memory cloud) centred cx,cy
export function cloudPath(cx, cy, rx, ry, n = 9) {
  const pts = [];
  for (let i = 0; i < n; i++) { const a = i / n * Math.PI * 2; pts.push([cx + rx * Math.cos(a), cy + ry * Math.sin(a)]); }
  let d = `M ${f1(pts[0][0])} ${f1(pts[0][1])}`;
  for (let i = 0; i < n; i++) { const p = pts[(i + 1) % n], q = pts[i]; const r = Math.hypot(p[0] - q[0], p[1] - q[1]) * .6; d += ` A ${f1(r)} ${f1(r)} 0 0 1 ${f1(p[0])} ${f1(p[1])}`; }
  return d + ' Z';
}

// ---------- the kid ("du", 6 years old) ----------
// origin at feet centre, about 560·s tall, facing the viewer.
// o: aL/aR = [shoulderDeg, elbowDeg] measured from straight down (positive = outward/up),
//    mouth 'smile'|'grin'|'o'|'flat'|'sad'|'wow', brows 'calm'|'up'|'sad'|'worried'|'angry', look [dx,dy],
//    lean deg, sit (legs forward), blink 0..1, hold: svg drawn at right hand, holdL at left hand, grey 0..1
const rad = d => d * Math.PI / 180;
function armPts(side, a) {
  const sh = [side * 66, -300], L1 = 78, L2 = 72;
  const a1 = rad(a[0]), a2 = rad(a[0] + a[1]);
  const el = [sh[0] + side * Math.sin(a1) * L1, sh[1] + Math.cos(a1) * L1];
  const ha = [el[0] + side * Math.sin(a2) * L2, el[1] + Math.cos(a2) * L2];
  return [sh, el, ha];
}
export function face(o = {}, hx = 0, hy = 0) {
  const [lx, ly] = o.look || [0, 0], bl = o.blink || 0;
  const eye = (ex) => `<ellipse cx="${ex}" cy="-4" rx="17" ry="${f1(21 * (1 - bl) + 1)}" fill="#fff" stroke="${OL}" stroke-width="5"/>` + (bl < .7 ? `<circle cx="${f1(ex + lx)}" cy="${f1(-2 + ly)}" r="10" fill="${OL}"/><circle cx="${f1(ex + lx + 4)}" cy="${f1(-7 + ly)}" r="3.5" fill="#fff"/>` : '');
  const B = {
    calm: 'M -54 -42 Q -36 -52 -18 -44 M 18 -44 Q 36 -52 54 -42',
    up: 'M -54 -52 Q -36 -66 -18 -56 M 18 -56 Q 36 -66 54 -52',
    sad: 'M -54 -40 L -20 -52 M 20 -52 L 54 -40',
    worried: 'M -54 -44 Q -36 -40 -20 -56 M 20 -56 Q 36 -40 54 -44',
    angry: 'M -54 -54 L -20 -42 M 20 -42 L 54 -54',
  }[o.brows || 'calm'];
  const M = {
    smile: `<path d="M -22 40 Q 0 60 22 40" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    grin: `<path d="M -30 34 Q 0 76 30 34 Z" fill="${OL}"/><path d="M -16 52 Q 0 62 16 52" fill="#f08a8a"/>`,
    o: `<ellipse cx="0" cy="46" rx="13" ry="16" fill="${OL}"/>`,
    wow: `<ellipse cx="0" cy="48" rx="18" ry="22" fill="${OL}"/><ellipse cx="0" cy="58" rx="10" ry="7" fill="#f08a8a"/>`,
    flat: `<path d="M -16 46 L 16 46" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>`,
    sad: `<path d="M -20 52 Q 0 36 20 52" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  }[o.mouth || 'smile'];
  return `<g transform="translate(${hx} ${hy})">${eye(-36)}${eye(36)}<path d="${B}" stroke="${K.hair}" stroke-width="8" fill="none" stroke-linecap="round"/><ellipse cx="-62" cy="26" rx="14" ry="8" fill="#f2967d" opacity=".55"/><ellipse cx="62" cy="26" rx="14" ry="8" fill="#f2967d" opacity=".55"/>${M}</g>`;
}
export function kidHead(o = {}) {
  const HC = o.hairC || K.hair, HH = o.hairHi || K.hairHi;
  // head centred at 0,0, radius ~100
  return `<ellipse cx="-98" cy="10" rx="18" ry="24" fill="${K.skinSh}" stroke="${OL}" stroke-width="5"/><ellipse cx="98" cy="10" rx="18" ry="24" fill="${K.skinSh}" stroke="${OL}" stroke-width="5"/>
    <ellipse cx="0" cy="0" rx="100" ry="96" fill="${K.skin}" stroke="${OL}" stroke-width="6"/>
    <path d="M -100 -6 Q -112 -104 0 -104 Q 110 -104 100 -6 Q 86 -58 40 -62 Q 10 -44 -20 -64 Q -60 -50 -84 -60 Q -96 -40 -100 -6 Z" fill="${HC}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
    ${o.noTuft ? "" : `<path d="M 6 -102 Q 18 -140 46 -132 Q 26 -126 22 -100" fill="${HC}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>`}<path d="M 0 0" fill="${HC}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M -50 -88 Q -10 -100 30 -90" stroke="${HH}" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${face(o)}`;
}
export function kid(x, y, s, o = {}) {
  const SH = o.shirt || K.shirt, ST = o.stripe || K.stripe, SO = o.shorts || K.shorts;
  const aL = o.aL || [12, 8], aR = o.aR || [12, 8];
  const [shL, elL, haL] = armPts(-1, aL), [shR, elR, haR] = armPts(1, aR);
  const arm = (sh, el, ha) => `<path d="M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(ha[0])} ${f1(ha[1])}" stroke="${OL}" stroke-width="34" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(ha[0])} ${f1(ha[1])}" stroke="${K.skin}" stroke-width="23" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M ${f1(sh[0])} ${f1(sh[1])} L ${f1(lerp(sh[0], el[0], .55))} ${f1(lerp(sh[1], el[1], .55))}" stroke="${OL}" stroke-width="40" stroke-linecap="round"/><path d="M ${f1(sh[0])} ${f1(sh[1])} L ${f1(lerp(sh[0], el[0], .55))} ${f1(lerp(sh[1], el[1], .55))}" stroke="${SH}" stroke-width="29" stroke-linecap="round"/><circle cx="${f1(ha[0])}" cy="${f1(ha[1])}" r="17" fill="${K.skin}" stroke="${OL}" stroke-width="5"/>`;
  const legs = o.sit
    ? `<path d="M -30 -150 Q -30 -96 -36 -60" stroke="${OL}" stroke-width="36" stroke-linecap="round" fill="none"/><path d="M 30 -150 Q 30 -96 36 -60" stroke="${OL}" stroke-width="36" stroke-linecap="round" fill="none"/><path d="M -30 -150 Q -30 -96 -36 -60" stroke="${K.skin}" stroke-width="25" stroke-linecap="round" fill="none"/><path d="M 30 -150 Q 30 -96 36 -60" stroke="${K.skin}" stroke-width="25" stroke-linecap="round" fill="none"/><ellipse cx="-40" cy="-46" rx="30" ry="16" fill="#e8e1d6" stroke="${OL}" stroke-width="5"/><ellipse cx="40" cy="-46" rx="30" ry="16" fill="#e8e1d6" stroke="${OL}" stroke-width="5"/>`
    : `<path d="M -32 -150 L -34 -24" stroke="${OL}" stroke-width="36" stroke-linecap="round"/><path d="M 32 -150 L 34 -24" stroke="${OL}" stroke-width="36" stroke-linecap="round"/><path d="M -32 -150 L -34 -24" stroke="${K.skin}" stroke-width="25" stroke-linecap="round"/><path d="M 32 -150 L 34 -24" stroke="${K.skin}" stroke-width="25" stroke-linecap="round"/><path d="M -66 -2 Q -66 -30 -34 -30 Q -10 -30 -8 -2 Z" fill="${K.red}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/><path d="M 66 -2 Q 66 -30 34 -30 Q 10 -30 8 -2 Z" fill="${K.red}" stroke="${OL}" stroke-width="5" stroke-linejoin="round"/>`;
  const torso = `<path d="M -70 -296 Q -78 -230 -70 -168 L 70 -168 Q 78 -230 70 -296 Q 0 -322 -70 -296 Z" fill="${SH}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M -74 -258 Q 0 -270 74 -258 M -76 -222 Q 0 -232 76 -222" stroke="${ST}" stroke-width="12" fill="none"/>
    <path d="M -72 -176 L 72 -176 L 76 -130 L 6 -130 L 0 -146 L -6 -130 L -76 -130 Z" fill="${SO}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>`;
  const head = `<g transform="translate(0 -398) rotate(${o.tilt || 0})">${kidHead(o)}</g>`;
  const hR = o.hold ? `<g transform="translate(${f1(haR[0])} ${f1(haR[1])})">${o.hold}</g>` : '';
  const hL = o.holdL ? `<g transform="translate(${f1(haL[0])} ${f1(haL[1])})">${o.holdL}</g>` : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${o.lean || 0}) scale(${f1(s * 1000) / 1000})">
    <ellipse cx="0" cy="0" rx="${o.sit ? 0 : 110}" ry="16" fill="#000" opacity=".14"/>
    ${o.armsBack ? arm(shL, elL, haL) + arm(shR, elR, haR) : ''}${legs}${torso}${o.armsBack ? '' : arm(shL, elL, haL) + arm(shR, elR, haR)}${head}${hR}${hL}</g>`;
}

// ---------- grown-ups (mother / father / others), about 860·s tall ----------
// o: kind 'mom'|'dad'|'man'|'woman'|'shadow', top colour, aL/aR like kid, mouth, look, back (seen from behind)
export function adult(x, y, s, o = {}) {
  const kind = o.kind || 'mom';
  const top = o.top || { mom: '#d8664f', dad: '#4f8f6a', man: '#5a6fa8', woman: '#9c6cc0', shadow: '#5b5570' }[kind];
  const hair = o.hairC || { mom: '#8a4b2a', dad: '#3d2a1f', man: '#2f2a28', woman: '#c9893f', shadow: '#3e3a4c' }[kind];
  const sk = kind === 'shadow' ? '#7d7690' : (o.skin || K.skin);
  const aL = o.aL || [8, 4], aR = o.aR || [8, 4];
  const ap = (side, a) => { const sh = [side * 78, -660], a1 = rad(a[0]), a2 = rad(a[0] + a[1]); const el = [sh[0] + side * Math.sin(a1) * 150, sh[1] + Math.cos(a1) * 150]; const ha = [el[0] + side * Math.sin(a2) * 140, el[1] + Math.cos(a2) * 140]; return [sh, el, ha]; };
  const arm = ([sh, el, ha]) => `<path d="M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(ha[0])} ${f1(ha[1])}" stroke="${OL}" stroke-width="44" stroke-linecap="round" stroke-linejoin="round" fill="none"/><path d="M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(ha[0])} ${f1(ha[1])}" stroke="${top}" stroke-width="33" stroke-linecap="round" stroke-linejoin="round" fill="none"/><circle cx="${f1(ha[0])}" cy="${f1(ha[1])}" r="20" fill="${sk}" stroke="${OL}" stroke-width="5"/>`;
  const legC = kind === 'mom' || kind === 'woman' ? '#3b4a6b' : '#3c3a48';
  const legs = `<path d="M -42 -330 L -46 -24" stroke="${OL}" stroke-width="52" stroke-linecap="round"/><path d="M 42 -330 L 46 -24" stroke="${OL}" stroke-width="52" stroke-linecap="round"/><path d="M -42 -330 L -46 -24" stroke="${legC}" stroke-width="41" stroke-linecap="round"/><path d="M 42 -330 L 46 -24" stroke="${legC}" stroke-width="41" stroke-linecap="round"/><path d="M -84 -2 Q -84 -34 -46 -34 Q -16 -34 -14 -2 Z" fill="#3a2a22" stroke="${OL}" stroke-width="5"/><path d="M 84 -2 Q 84 -34 46 -34 Q 16 -34 14 -2 Z" fill="#3a2a22" stroke="${OL}" stroke-width="5"/>`;
  const torso = `<path d="M -84 -660 Q -96 -480 -80 -330 L 80 -330 Q 96 -480 84 -660 Q 0 -690 -84 -660 Z" fill="${top}" stroke="${OL}" stroke-width="6" stroke-linejoin="round"/>`;
  const [lx, ly] = o.look || [0, 0];
  const hy = -780;
  let head = `<ellipse cx="0" cy="${hy + 82}" rx="26" ry="30" fill="${sk}" stroke="${OL}" stroke-width="5"/>`;
  if (kind === 'mom' || kind === 'woman') head += `<path d="M -92 ${hy} Q -110 ${hy + 120} -70 ${hy + 150} L 70 ${hy + 150} Q 110 ${hy + 120} 92 ${hy} Z" fill="${hair}" stroke="${OL}" stroke-width="5"/>`;
  head += `<ellipse cx="0" cy="${hy}" rx="86" ry="96" fill="${sk}" stroke="${OL}" stroke-width="6"/>`;
  if (o.back) head += `<ellipse cx="0" cy="${hy - 8}" rx="88" ry="92" fill="${hair}" stroke="${OL}" stroke-width="5"/>`;
  else {
    if (kind === 'mom' || kind === 'woman') head += `<path d="M -88 ${hy + 10} Q -96 ${hy - 104} 0 ${hy - 102} Q 96 ${hy - 104} 88 ${hy + 10} Q 70 ${hy - 50} 10 ${hy - 56} Q -50 ${hy - 56} -88 ${hy + 10} Z" fill="${hair}" stroke="${OL}" stroke-width="5"/>` + (kind === 'mom' ? `<circle cx="0" cy="${hy - 112}" r="34" fill="${hair}" stroke="${OL}" stroke-width="5"/>` : '');
    else head += `<path d="M -86 ${hy - 10} Q -90 ${hy - 104} 0 ${hy - 100} Q 92 ${hy - 104} 86 ${hy - 10} Q 70 ${hy - 56} 0 ${hy - 58} Q -64 ${hy - 56} -86 ${hy - 10} Z" fill="${hair}" stroke="${OL}" stroke-width="5"/>`;
    if (kind !== 'shadow') {
      const M = { smile: `<path d="M -22 ${hy + 40} Q 0 ${hy + 58} 22 ${hy + 40}" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/>`, laugh: `<path d="M -26 ${hy + 34} Q 0 ${hy + 72} 26 ${hy + 34} Z" fill="${OL}"/>`, flat: `<path d="M -16 ${hy + 46} L 16 ${hy + 46}" stroke="${OL}" stroke-width="6" stroke-linecap="round"/>`, o: `<ellipse cx="0" cy="${hy + 46}" rx="12" ry="15" fill="${OL}"/>` }[o.mouth || 'smile'];
      const eyes = o.closed ? `<path d="M -46 ${hy - 4} Q -32 ${hy + 6} -18 ${hy - 4} M 18 ${hy - 4} Q 32 ${hy + 6} 46 ${hy - 4}" stroke="${OL}" stroke-width="6" fill="none" stroke-linecap="round"/>`
        : `<circle cx="${-32 + lx}" cy="${hy - 2 + ly}" r="10" fill="${OL}"/><circle cx="${32 + lx}" cy="${hy - 2 + ly}" r="10" fill="${OL}"/>`;
      head += eyes + `<path d="M -50 ${hy - 30} Q -32 ${hy - 40} -16 ${hy - 32} M 16 ${hy - 32} Q 32 ${hy - 40} 50 ${hy - 30}" stroke="${hair}" stroke-width="7" fill="none" stroke-linecap="round"/>` + M + `<ellipse cx="-56" cy="${hy + 24}" rx="13" ry="7" fill="#f2967d" opacity=".45"/><ellipse cx="56" cy="${hy + 24}" rx="13" ry="7" fill="#f2967d" opacity=".45"/>`;
    }
  }
  const hR = o.hold ? `<g transform="translate(${f1(ap(1, aR)[2][0])} ${f1(ap(1, aR)[2][1])})">${o.hold}</g>` : '';
  return `<g opacity="${o.a ?? 1}" transform="translate(${f1(x)} ${f1(y)}) rotate(${o.lean || 0}) scale(${f1(s * (o.f || 1) * 1000) / 1000} ${f1(s * 1000) / 1000})">
    <ellipse cx="0" cy="0" rx="130" ry="18" fill="#000" opacity=".14"/>${legs}${torso}${arm(ap(-1, aL))}${arm(ap(1, aR))}${head}${hR}</g>`;
}

// ---------- props ----------
export function calendar(x, y, s, year, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <rect x="-150" y="-180" width="300" height="360" rx="18" fill="#fff" stroke="${OL}" stroke-width="7"/>
    <rect x="-150" y="-180" width="300" height="104" rx="18" fill="${o.col || K.red}" stroke="${OL}" stroke-width="7"/>
    <rect x="-146" y="-110" width="292" height="30" fill="${o.col || K.red}"/>
    <circle cx="-80" cy="-180" r="12" fill="${OL}"/><circle cx="80" cy="-180" r="12" fill="${OL}"/>
    ${T(0, -108, o.month || 'SEPTEMBER', 40, { fill: '#fff' })}
    ${T(0, 40, year, 116, {})}
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="${-122 + i * 36}" y="96" width="24" height="18" rx="4" fill="${K.greyL}"/><rect x="${-122 + i * 36}" y="128" width="24" height="18" rx="4" fill="${i === (o.mark ?? -1) ? K.red : K.greyL}"/>`).join('')}
  </g>`;
}

export function book(x, y, w, h, col, title, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${o.rot || 0})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="10" fill="${col}" stroke="${OL}" stroke-width="6"/><rect x="${-w / 2}" y="${-h / 2}" width="22" height="${h}" rx="6" fill="#000" opacity=".15"/>${title ? T(10, -h / 2 + 64, title, o.size || 40, { fill: '#fff' }) : ''}${o.icon || ''}</g>`;
}

export function paper(x, y, w, h, o = {}) {
  let lines = '';
  for (let i = 0; i < (o.lines ?? 6); i++) lines += `<path d="M ${-w / 2 + 40} ${-h / 2 + 120 + i * 46} L ${w / 2 - 40 - (i % 3) * 40} ${-h / 2 + 120 + i * 46}" stroke="${K.greyL}" stroke-width="12" stroke-linecap="round"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${o.rot || 0})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="12" fill="${K.paper}" stroke="${OL}" stroke-width="6"/>${o.title ? T(-w / 2 + 40, -h / 2 + 70, o.title, o.ts || 40, { anchor: 'start' }) : ''}${lines}${o.inner || ''}</g>`;
}

export function coin(x, y, r, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1((o.sx ?? 1) * 100) / 100} 1)"><circle r="${r}" fill="${o.col || K.gold}" stroke="${OL}" stroke-width="${Math.max(4, r * .07)}"/><circle r="${r * .78}" fill="none" stroke="#e0a92e" stroke-width="${r * .07}"/>${o.label ? T(0, r * .3, o.label, r * .8, { fill: '#a8731c' }) : ''}</g>`;
}

export function heart(x, y, s, col = K.red, o = {}) {
  return `<path transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 100) / 100})" d="M 0 30 C -60 -10 -50 -60 -20 -60 C -6 -60 0 -50 0 -40 C 0 -50 6 -60 20 -60 C 50 -60 60 -10 0 30 Z" fill="${o.fill === false ? 'none' : col}" stroke="${o.line || OL}" stroke-width="${o.sw || 5}" stroke-linejoin="round" opacity="${o.a ?? 1}"/>`;
}

// background room (bedroom wall + floor); light: 0 day .. 1 night tint
export function room(o = {}) {
  const wall = o.wall || K.wall, fy = o.fy || 1330;
  return `<rect width="1080" height="1920" fill="${wall}"/>
    <rect x="0" y="${fy}" width="1080" height="${1920 - fy}" fill="${o.floor || '#d9b48a'}"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M ${i * 180 - 60} ${fy} L ${i * 240 - 300} 1920" stroke="#c49b70" stroke-width="5"/>`).join('')}
    <rect x="0" y="${fy - 20}" width="1080" height="24" fill="#fff4e2" stroke="${OL}" stroke-width="4"/>`;
}

export function windowFrame(x, y, w, h, o = {}) {
  return `<g transform="translate(${x} ${y})"><rect x="0" y="0" width="${w}" height="${h}" rx="10" fill="${o.sky || '#bfe3f5'}" stroke="${OL}" stroke-width="8"/>
    ${o.sun ? `<circle cx="${w * .7}" cy="${h * .32}" r="${w * .13}" fill="${K.goldL}"/>` : ''}
    <path d="M ${w / 2} 0 L ${w / 2} ${h} M 0 ${h / 2} L ${w} ${h / 2}" stroke="${OL}" stroke-width="8"/>
    <path d="M -30 -20 Q ${w * .2} ${h * .3} -10 ${h + 20} L -40 ${h + 20} L -40 -20 Z" fill="${o.curtain || '#ef8a7a'}" stroke="${OL}" stroke-width="5"/>
    <path d="M ${w + 30} -20 Q ${w * .8} ${h * .3} ${w + 10} ${h + 20} L ${w + 40} ${h + 20} L ${w + 40} -20 Z" fill="${o.curtain || '#ef8a7a'}" stroke="${OL}" stroke-width="5"/></g>`;
}

// memory icons (drawn at origin, ~100px)
export const ICON = {
  cap: `<path d="M -60 -10 L 0 -40 L 60 -10 L 0 20 Z" fill="${K.ol}"/><path d="M -34 4 L -34 34 Q 0 54 34 34 L 34 4" fill="#3a3045" stroke="${K.ol}" stroke-width="4"/><path d="M 50 -6 L 50 34" stroke="${K.gold}" stroke-width="6"/><circle cx="50" cy="38" r="8" fill="${K.gold}"/>`,
  car: `<path d="M -66 16 L -66 -6 Q -60 -20 -40 -22 L -24 -44 L 30 -44 L 50 -22 Q 66 -20 66 -6 L 66 16 Z" fill="${K.red}" stroke="${K.ol}" stroke-width="5" stroke-linejoin="round"/><path d="M -16 -38 L 26 -38 L 38 -22 L -26 -22 Z" fill="#cfe9f7"/><circle cx="-36" cy="18" r="16" fill="${K.ol}"/><circle cx="36" cy="18" r="16" fill="${K.ol}"/>`,
  laptop: `<rect x="-50" y="-48" width="100" height="66" rx="6" fill="#3b4a6b" stroke="${K.ol}" stroke-width="5"/><rect x="-40" y="-38" width="80" height="46" fill="#8fd0e8"/><path d="M -66 22 L 66 22 L 56 34 L -56 34 Z" fill="#9aa3b5" stroke="${K.ol}" stroke-width="5" stroke-linejoin="round"/>`,
  heart: `<path d="M 0 30 C -60 -10 -50 -60 -20 -60 C -6 -60 0 -50 0 -40 C 0 -50 6 -60 20 -60 C 50 -60 60 -10 0 30 Z" fill="${K.red}" stroke="${K.ol}" stroke-width="5"/>`,
  book: `<path d="M -58 -40 Q -30 -52 0 -36 Q 30 -52 58 -40 L 58 34 Q 30 22 0 38 Q -30 22 -58 34 Z" fill="#fff" stroke="${K.ol}" stroke-width="5" stroke-linejoin="round"/><path d="M 0 -36 L 0 38" stroke="${K.ol}" stroke-width="4"/><path d="M -44 -18 L -14 -12 M -44 0 L -14 6 M 14 -12 L 44 -18 M 14 6 L 44 0" stroke="${K.grey}" stroke-width="4"/>`,
  plane: `<path d="M -66 4 L 60 -14 Q 74 -14 70 -2 L -54 20 Z" fill="#e9eef7" stroke="${K.ol}" stroke-width="5" stroke-linejoin="round"/><path d="M -6 -4 L -30 -44 L -12 -46 L 26 -8 Z M -10 12 L -24 44 L -8 44 L 18 8 Z" fill="#9fb6dc" stroke="${K.ol}" stroke-width="4" stroke-linejoin="round"/>`,
  phone: `<rect x="-28" y="-50" width="56" height="100" rx="10" fill="#2f2a38" stroke="${K.ol}" stroke-width="5"/><rect x="-21" y="-38" width="42" height="72" rx="4" fill="#8fd0e8"/>`,
  key: `<circle cx="-30" cy="0" r="24" fill="none" stroke="${K.gold}" stroke-width="12"/><path d="M -6 0 L 60 0 M 44 0 L 44 18 M 58 0 L 58 14" stroke="${K.gold}" stroke-width="12" stroke-linecap="round"/>`,
};
export const icon = (name, x, y, s = 1, a = 1) => a <= 0 ? '' : `<g opacity="${f1(a * 100) / 100}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 100) / 100})">${ICON[name]}</g>`;

// big arrow from (x0,y0) to (x1,y1) drawn by p 0..1
export function arrow(x0, y0, x1, y1, p, col = K.ol, w = 16) {
  if (p <= 0) return '';
  const x = lerp(x0, x1, p), y = lerp(y0, y1, p), an = Math.atan2(y1 - y0, x1 - x0);
  const hx = x - Math.cos(an) * 40, hy = y - Math.sin(an) * 40;
  return `<path d="M ${f1(x0)} ${f1(y0)} L ${f1(hx)} ${f1(hy)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M ${f1(x)} ${f1(y)} L ${f1(hx - Math.sin(an) * 30)} ${f1(hy + Math.cos(an) * 30)} L ${f1(hx + Math.sin(an) * 30)} ${f1(hy - Math.cos(an) * 30)} Z" fill="${col}" stroke="${col}" stroke-width="6" stroke-linejoin="round"/>`;
}
