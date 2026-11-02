// v94 kit — style "đầu tròn đen" at the reference2 quality bar (prompts/styles/dau-tron-den/reference2.svg):
// big characters (head r=165 at s=1), detailed blurred far background, sharp foreground, one light source, vignette.
// Character geometry is the reference2 "du" shifted so the FEET are at the local origin.
import { cl, prog, eio, eout, ein, back, lerp, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, hash };

export const K = {
  ink: '#1d1d1d', txt: '#2b2b2b', yellow: '#ffd23f', white: '#ffffff',
  du: '#2fa59a', duSh: '#268b82', duStr: '#e9f7f4',
  bag: '#8a5a36', bagSh: '#6e4527', bagHi: '#a8744a',
  stone: '#9a9a9c', stoneSh: '#77777a', stoneHi: '#b9b9bb',
  cap: '#e8742f', capSh: '#c95f22', capHat: '#f2c14e',   // friend 1: yellow cap, orange top
  bun: '#8a5bb5', bunSh: '#704596',                     // friend 2: bun, purple top
  red: '#d9493f', green: '#3c9a5f',
};
const INK = K.ink;
export const f1 = n => Number.isFinite(n) ? Math.round(n * 10) / 10 : 0;
export const op = a => f1(cl(a) * 100) / 100;
export const fade = (t, t0, d = .3) => eio(prog(t, t0, t0 + d));
export const fout = (t, t0, d = .3) => 1 - eio(prog(t, t0, t0 + d));
export const pop = (t, t0, d = .38) => t < t0 ? 0 : back(prog(t, t0, t0 + d), 1.7);
export const esc = s => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export function textW(s, size) {
  let w = 0;
  for (const ch of String(s)) {
    if (ch === ' ') w += .28; else if ('.,:;!?„“"\'’|·'.includes(ch)) w += .3;
    else if ('il'.includes(ch)) w += .3; else if ('mwMW'.includes(ch)) w += .9;
    else if (ch >= 'A' && ch <= 'Z' || 'ÄÖÜ'.includes(ch)) w += .74; else if (ch >= '0' && ch <= '9') w += .62; else w += .6;
  }
  return w * size;
}
export const T = (x, y, s, size, o = {}) => `<text x="${f1(x)}" y="${f1(y)}" font-family="Inter" font-weight="${o.w || 900}" font-size="${size}" fill="${o.fill || K.txt}" text-anchor="${o.anchor || 'middle'}"${o.op !== undefined ? ` opacity="${op(o.op)}"` : ''}${o.ls ? ` letter-spacing="${o.ls}"` : ''}${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 12}" paint-order="stroke" stroke-linejoin="round"` : ''}${o.rot ? ` transform="rotate(${f1(o.rot)} ${f1(x)} ${f1(y)})"` : ''} style="font-family:'Inter';font-weight:${o.w || 900}">${esc(s)}</text>`;

// ---------- frame + camera ----------
// filters/gradients shared by every shot (ids prefixed v94)
const DEFS94 = `<defs>
<filter id="v94bg" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="3.5"/></filter>
<filter id="v94bg2" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="7"/></filter>
<filter id="v94soft" x="-30%" y="-80%" width="160%" height="260%"><feGaussianBlur stdDeviation="7"/></filter>
<filter id="v94glow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="18"/></filter>
<radialGradient id="v94vig" cx="50%" cy="46%" r="74%"><stop offset="58%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient>
<radialGradient id="v94pool" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#fff" stop-opacity="1"/><stop offset="1" stop-color="#fff" stop-opacity="0"/></radialGradient>
</defs>`;
export function frame(body, o = {}) {
  return `${DEFS94}<rect width="1080" height="1920" fill="${o.base || '#2a2630'}"/>${body}<rect width="1080" height="1920" fill="url(#v94vig)"/>`;
}
// camera: zoom sc around (cx,cy), then shift by dx,dy
export const cam = (body, cx, cy, sc, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${f1(sc * 1000) / 1000}) translate(${f1(-cx)} ${f1(-cy)})">${body}</g>`;
// light pool: coloured soft radial light (screen-like add)
export const pool = (x, y, rx, ry, col, a = .45) => `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="${col}" opacity="${op(a)}" filter="url(#v94glow)"/>`;
export const shadow = (x, y, rx = 190, a = 1) => `<ellipse cx="${f1(x)}" cy="${f1(y + 4)}" rx="${f1(rx)}" ry="${f1(rx * .14)}" fill="#000" opacity="${op(.3 * a)}" filter="url(#v94soft)"/>`;
export const blur = (s, strong) => `<g filter="url(#${strong ? 'v94bg2' : 'v94bg'})">${s}</g>`;

// ---------- blinking ----------
export function blinking(t, seed = 1) {
  const period = 3.1 + hash(seed) * 1.6, ph = (t + hash(seed + 7) * period) % period;
  return ph < .13;
}

// ---------- face parts (head-local coords, head r = 165) ----------
function eyesSvg(o) {
  const e = o.eyes || 'n', lk = o.look || [0, 0];
  const lx = cl(lk[0], -16, 16), ly = cl(lk[1], -14, 14);
  if (e === 'closed') return `<path d="M -85 10 Q -55 26 -25 10 M 25 10 Q 55 26 85 10" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  if (e === 'happy') return `<path d="M -85 18 Q -55 -14 -25 18 M 25 18 Q 55 -14 85 18" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  const ry = e === 'wide' ? 40 : e === 'half' ? 20 : e === 'tired' ? 24 : 34, rx = e === 'wide' ? 34 : 30;
  const pr = e === 'blank' ? 9 : e === 'wide' ? 12 : 14;
  let s = `<ellipse cx="-55" cy="10" rx="${rx}" ry="${ry}" fill="#fff"/><ellipse cx="50" cy="10" rx="${rx}" ry="${ry}" fill="#fff"/>`;
  s += `<circle cx="${f1(-55 + lx)}" cy="${f1(14 + ly)}" r="${pr}" fill="${INK}"/><circle cx="${f1(50 + lx)}" cy="${f1(14 + ly)}" r="${pr}" fill="${INK}"/>`;
  if (e !== 'blank') s += `<circle cx="${f1(-50 + lx)}" cy="${f1(8 + ly)}" r="4" fill="#fff"/><circle cx="${f1(55 + lx)}" cy="${f1(8 + ly)}" r="4" fill="#fff"/>`;
  if (e === 'half' || e === 'tired') s += `<path d="M -90 ${10 - ry + 6} H -20 M 15 ${10 - ry + 6} H 85" stroke="${INK}" stroke-width="14"/>`;
  if (o.glasses) s += `<g fill="none" stroke="#fff" stroke-width="6"><circle cx="-55" cy="10" r="46"/><circle cx="50" cy="10" r="46"/><path d="M -9 6 Q -2 -2 4 6"/></g>`;
  return s;
}
function browsSvg(b) {
  if (!b || b === 'none') return '';
  const d = {
    calm: 'M -92 -50 Q -60 -60 -28 -52 M 22 -52 Q 54 -60 86 -50',
    worried: 'M -90 -45 L -30 -57 M 22 -57 L 82 -45',
    up: 'M -92 -66 Q -60 -80 -28 -68 M 22 -68 Q 54 -80 86 -66',
    angry: 'M -90 -62 L -30 -44 M 22 -44 L 82 -62',
    sad: 'M -92 -42 L -32 -62 M 24 -62 L 84 -42',
    strain: 'M -92 -40 L -30 -58 M 22 -58 L 84 -40',
  }[b] || '';
  return `<path d="${d}" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>`;
}
function mouthSvg(m) {
  const d = {
    flat: '<path d="M -28 105 H 28" stroke="#fff" stroke-width="8" stroke-linecap="round"/>',
    frown: '<path d="M -30 112 C -12 98 12 98 30 112" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>',
    smile: '<path d="M -36 98 C -14 120 14 120 36 98" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>',
    grin: '<path d="M -44 92 C -20 132 20 132 44 92 Z" fill="#fff"/>',
    o: '<ellipse cx="0" cy="106" rx="16" ry="20" fill="#fff"/>',
    small: '<path d="M -14 104 Q 0 110 14 104" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>',
    wavy: '<path d="M -36 108 Q -24 98 -12 108 Q 0 118 12 108 Q 24 98 36 108" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>',
    talk: '<path d="M -26 98 C -10 124 10 124 26 98 Z" fill="#fff"/>',
  }[m || 'flat'];
  return d || '';
}

// ---------- people ----------
export const WHO = {
  du: { top: K.du, sh: K.duSh, str: K.duStr },
  cap: { top: K.cap, sh: K.capSh, acc: 'cap' },
  bun: { top: K.bun, sh: K.bunSh, acc: 'bun' },
  zeig: { top: '#4f6b58', sh: '#3e5646', acc: 'bun2', collar: true },
  doc1: { top: '#f2f2ee', sh: '#d6d6cf', acc: 'glasses', coat: true },
  doc2: { top: '#f2f2ee', sh: '#d6d6cf', acc: 'curly', coat: true },
};
const BODY = 'M -150 -368 C -150 -518 -90 -578 0 -578 C 90 -578 150 -518 150 -368 L 170 -158 C 170 -123 -170 -123 -170 -158 Z';
const SHOULDER = { L: [-118, -520], R: [118, -520] };
function arm(side, h, sleeve, elbow) {
  const [sx, sy] = side < 0 ? SHOULDER.L : SHOULDER.R;
  const mx = elbow ? elbow[0] : (sx + h[0]) / 2 + side * 60, my = elbow ? elbow[1] : (sy + h[1]) / 2 + 30;
  const d = `M ${sx} ${sy} Q ${f1(mx)} ${f1(my)} ${f1(h[0])} ${f1(h[1])}`;
  return `<path d="${d}" stroke="${INK}" stroke-width="56" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${sleeve}" stroke-width="44" fill="none" stroke-linecap="round"/><circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="23" fill="${INK}"/>`;
}

// backpack geometry (person-local). n = number of stones carried (grows the bag).
function packGeo(n) {
  const k = Math.min(n, 6);
  const w = 250 + k * 16, h = 360 + k * 26;
  const right = -90, left = right - w, top = -700 - k * 18;
  return { w, h, left, right, top, cx: (left + right) / 2 };
}
// world position of the bag opening (where stones fall in / out)
export function packMouth(x, y, s, n, o = {}) {
  const g = packGeo(n), hunch = o.hunch || 0;
  return [x + s * (g.cx - 10), y + s * (g.top + hunch * 40 - 20)];
}
// labelled stone. size 1 = 150×100
export function stone(x, y, s, label, rot = 0, o = {}) {
  const id = Math.round(hash((label || 'x').length + (o.seed || 0)) * 3);
  const shapes = [
    'M -72 10 C -78 -30 -40 -52 0 -50 C 44 -52 78 -28 74 8 C 76 40 40 52 0 50 C -42 52 -70 40 -72 10 Z',
    'M -76 6 C -70 -36 -30 -50 8 -48 C 50 -46 80 -20 74 14 C 68 44 30 54 -6 50 C -46 48 -80 36 -76 6 Z',
    'M -70 -4 C -66 -40 -20 -54 18 -50 C 56 -44 82 -12 72 18 C 62 46 20 52 -14 50 C -52 46 -74 28 -70 -4 Z',
    'M -74 12 C -80 -24 -46 -50 -4 -52 C 40 -52 74 -30 76 4 C 78 38 44 54 2 52 C -40 52 -70 42 -74 12 Z',
  ];
  const d = shapes[id % 4];
  let g = `<path d="${d}" fill="${o.fill || K.stone}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  g += `<path d="M -48 -26 C -30 -42 0 -44 20 -40" stroke="${K.stoneHi}" stroke-width="9" fill="none" stroke-linecap="round" opacity=".9"/>`;
  g += `<path d="M -60 26 C -30 44 30 46 62 22" stroke="${K.stoneSh}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  g += `<circle cx="40" cy="-18" r="4" fill="${K.stoneSh}"/><circle cx="-38" cy="22" r="3" fill="${K.stoneSh}"/>`;
  if (label) {
    const fs = Math.min(30, 120 / Math.max(1, textW(label, 1)));
    g += T(0, 2 + fs * .36, label, fs, { fill: '#3a3a3c', w: 900 });
  }
  if (o.glow) g = `<path d="${d}" fill="#ffd23f" opacity="${op(o.glow * .6)}" filter="url(#v94glow)" transform="scale(1.3)"/>` + g;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}

function backpack(n, labels, hunch) {
  const g = packGeo(n), dy = hunch * 40;
  const L = g.left, R = g.right, Tp = g.top + dy, B = Tp + g.h;
  let s = '';
  // back panel / inner opening
  s += `<path d="M ${L + 10} ${Tp + 30} C ${L + 20} ${Tp - 10} ${R - 20} ${Tp - 10} ${R - 10} ${Tp + 30} Z" fill="${K.bagSh}" stroke="${INK}" stroke-width="5"/>`;
  // stones peeking out of the opening (stacked pile, newest on top)
  const shown = labels.slice(-5);
  const PILE = shown.length === 1 ? [[0, -14]] : [[-58, -6], [58, -2], [0, -66], [-62, -112], [60, -108]];
  shown.forEach((lb, i) => {
    const [px, py] = PILE[i];
    s += stone(g.cx + px * (1 + Math.min(n, 6) * .03), Tp + py, .92, lb, (i % 2 ? 7 : -6), { seed: i });
  });
  // bag body
  s += `<path d="M ${L} ${Tp + 40} C ${L - 6} ${Tp + 10} ${R + 6} ${Tp + 10} ${R} ${Tp + 40} L ${R + 6} ${B - 40} C ${R + 6} ${B + 4} ${L - 6} ${B + 4} ${L - 6} ${B - 40} Z" fill="${K.bag}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  s += `<path d="M ${L + 14} ${Tp + 52} C ${L + 40} ${Tp + 36} ${R - 40} ${Tp + 36} ${R - 14} ${Tp + 52}" stroke="${K.bagHi}" stroke-width="8" fill="none" stroke-linecap="round"/>`;
  // front pocket + buckle + seam
  const py = Tp + g.h * .5;
  s += `<path d="M ${L + 26} ${py} H ${R - 26} L ${R - 30} ${B - 40} C ${R - 34} ${B - 14} ${L + 34} ${B - 14} ${L + 30} ${B - 40} Z" fill="${K.bagSh}" stroke="${INK}" stroke-width="4"/>`;
  s += `<rect x="${g.cx - 16}" y="${py - 12}" width="32" height="26" rx="5" fill="#d8b46a" stroke="${INK}" stroke-width="4"/>`;
  s += `<path d="M ${L + 18} ${Tp + 70} V ${B - 50}" stroke="${K.bagSh}" stroke-width="5" stroke-dasharray="10 10"/>`;
  // bulge lines when heavy
  if (n >= 3) s += `<path d="M ${L - 4} ${Tp + g.h * .3} q -14 30 0 60" stroke="${INK}" stroke-width="4" fill="none" opacity=".5"/>`;
  return s;
}

function headSvg(W, t, o) {
  // head
  const eyes = (o.blink !== false && blinking(t, (o.seed || 0) + 3) && !['closed', 'happy'].includes(o.eyes || 'n')) ? 'closed' : (o.eyes || 'n');
  let head = '';
  if (W.acc === 'bun') head += `<circle cx="20" cy="-170" r="58" fill="${INK}"/><rect x="-26" y="-140" width="70" height="16" rx="8" fill="${K.yellow}" stroke="${INK}" stroke-width="3" transform="rotate(-12 9 -132)"/>`;
  if (W.acc === 'bun2') head += `<circle cx="0" cy="-175" r="52" fill="${INK}"/>`;
  if (W.acc === 'curly') head += `<g fill="${INK}">${[[-120, -80], [-90, -128], [-40, -158], [20, -160], [76, -136], [116, -92], [136, -36], [-138, -24]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="48"/>`).join('')}</g>`;
  head += `<circle cx="0" cy="0" r="165" fill="${INK}"/>`;
  head += `<ellipse cx="-65" cy="-75" rx="50" ry="24" fill="#fff" opacity=".16"/>`;
  if (o.rim) head += `<path d="M 110 -110 C 160 -60 170 50 125 110" fill="none" stroke="${o.rim}" stroke-width="9" stroke-linecap="round" opacity=".75"/>`;
  if (o.rimL) head += `<path d="M -110 -110 C -160 -60 -170 50 -125 110" fill="none" stroke="${o.rimL}" stroke-width="9" stroke-linecap="round" opacity=".75"/>`;
  head += eyesSvg({ eyes, look: o.look, glasses: W.acc === 'glasses' }) + browsSvg(o.brows) + mouthSvg(o.mouth || 'flat');
  if (W.acc === 'cap') head += `<path d="M -158 -40 C -150 -150 -70 -180 10 -178 C 100 -174 160 -120 160 -40 Z" fill="${K.capHat}" stroke="${INK}" stroke-width="6"/><path d="M -158 -40 C -210 -40 -250 -26 -262 -12 C -210 -4 -150 -14 -100 -26 Z" fill="${K.capHat}" stroke="${INK}" stroke-width="6"/><circle cx="0" cy="-176" r="12" fill="${K.capSh}" stroke="${INK}" stroke-width="4"/>`;
  if (o.sweat) {
    const p = (t * .9) % 1;
    head += `<path d="M 150 ${f1(-60 + p * 60)} q 14 22 0 30 q -14 -8 0 -30 Z" fill="#bfe3ff" stroke="${INK}" stroke-width="3" opacity="${op(o.sweat * (1 - p))}"/>`;
  }
  return head;
}
// a single head (r = 165·s) centred at (x,y)
export function head(who, x, y, s, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.headTilt || 0)}) scale(${f1(s * 1000) / 1000})">${headSvg(WHO[who], o.t || 0, o)}</g>`;
}
// person: origin at the feet centre. s=1 → head r 165 (reference2 medium shot).
// o: t, seed, look, eyes, brows, mouth, armL/armR [x,y] hand target (local), elbowL/elbowR,
//    hunch 0..1, pack: {n, labels} (backpack behind, straps in front), walk phase, rim (light colour),
//    headTilt, headDy, lean, sweat 0..1, flip, a, legs:false
export function person(who, x, y, s, o = {}) {
  const W = WHO[who], t = o.t || 0, hunch = cl(o.hunch || 0);
  let bob = o.still ? 0 : Math.sin(t * 2.1 + (o.seed || 0)) * 4;
  for (const d of (o.drops || [])) if (t >= d) bob += 22 * Math.exp(-(t - d) * 7) * Math.cos((t - d) * 22);
  const top = o.top || W.top, sh = W.sh;
  const wk = o.walk;
  let legs = '';
  if (o.legs !== false) {
    const sw = wk === undefined ? 0 : Math.sin(wk * Math.PI * 2) * 34;
    const l1 = wk === undefined ? 0 : Math.max(0, Math.sin(wk * Math.PI * 2)) * 14, l2 = wk === undefined ? 0 : Math.max(0, -Math.sin(wk * Math.PI * 2)) * 14;
    const kn = hunch * 26; // knees bend outward under weight
    legs += `<path d="M -40 -150 Q ${f1(-40 - kn + sw / 2)} -75 ${f1(-40 + sw)} ${f1(-10 - l1)}" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/>`;
    legs += `<path d="M 40 -150 Q ${f1(40 + kn - sw / 2)} -75 ${f1(40 - sw)} ${f1(-10 - l2)}" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/>`;
    legs += `<ellipse cx="${f1(-50 + sw)}" cy="${f1(-l1)}" rx="36" ry="14" fill="${INK}"/><ellipse cx="${f1(50 - sw)}" cy="${f1(-l2)}" rx="36" ry="14" fill="${INK}"/>`;
  }
  // body
  const sqY = 1 - hunch * .1;
  let body = `<path d="${BODY}" fill="${top}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  if (W.coat) {
    body += `<path d="M 0 -560 V -140" stroke="${sh}" stroke-width="6"/><path d="M -60 -566 L 0 -470 L 60 -566" stroke="${INK}" stroke-width="5" fill="#9fc3df"/><g fill="${sh}"><rect x="-120" y="-300" width="70" height="60" rx="8"/><rect x="50" y="-300" width="70" height="60" rx="8"/></g><rect x="56" y="-420" width="44" height="10" rx="4" fill="#3a6fb5"/>`;
  } else if (W.collar) {
    body += `<path d="M -60 -566 L 0 -500 L 60 -566 Z" fill="#f4eee0" stroke="${INK}" stroke-width="4"/><g fill="${sh}"><circle cx="0" cy="-450" r="7"/><circle cx="0" cy="-390" r="7"/><circle cx="0" cy="-330" r="7"/></g>`;
  } else {
    body += `<path d="M -130 -518 C -100 -578 100 -578 130 -518 C 100 -488 -100 -488 -130 -518 Z" fill="${sh}" stroke="${INK}" stroke-width="5"/>`;
    if (W.str) body += `<path d="M -12 -498 L -26 -423 M 12 -498 L 26 -423" stroke="${W.str}" stroke-width="7" stroke-linecap="round"/><circle cx="-26" cy="-416" r="7" fill="${W.str}"/><circle cx="26" cy="-416" r="7" fill="${W.str}"/>`;
    body += `<path d="M -100 -278 C -60 -258 60 -258 100 -278 L 95 -218 C 55 -198 -55 -198 -95 -218 Z" fill="${sh}" stroke="${INK}" stroke-width="4"/>`;
  }
  let packBack = '', straps = '';
  if (o.pack) {
    const n = o.pack.n || 0, labels = o.pack.labels || [];
    packBack = backpack(n, labels, hunch);
    const sw = 26 + Math.min(n, 7) * 2;
    straps = `<path d="M -112 -548 C -126 -470 -128 -400 -118 -330 M 112 -548 C 126 -470 128 -400 118 -330" stroke="${INK}" stroke-width="${sw + 10}" fill="none" stroke-linecap="round"/><path d="M -112 -548 C -126 -470 -128 -400 -118 -330 M 112 -548 C 126 -470 128 -400 118 -330" stroke="${K.bag}" stroke-width="${sw}" fill="none" stroke-linecap="round"/><rect x="-136" y="-420" width="36" height="24" rx="5" fill="#d8b46a" stroke="${INK}" stroke-width="4"/><rect x="100" y="-420" width="36" height="24" rx="5" fill="#d8b46a" stroke="${INK}" stroke-width="4"/>`;
  }
  // arms
  let armsF = '';
  if (o.armL) armsF += arm(-1, o.armL, top, o.elbowL);
  if (o.armR) armsF += arm(1, o.armR, top, o.elbowR);
  const head = headSvg(W, t, o);
  const hy = -713 + hunch * 95 + (o.headDy || 0) + bob * .5;
  const hx = hunch * 18;
  const up = bob * .5;
  const g = `${legs}<g transform="translate(0 ${f1(up)})">${packBack}<g transform="translate(0 -150) scale(1 ${f1(sqY * 1000) / 1000}) translate(0 150)">${body}${straps}</g>${o.behindHead || ''}<g transform="translate(${f1(hx)} ${f1(hy)}) rotate(${f1((o.headTilt || 0) + hunch * 7)})">${head}${o.face || ''}</g>${armsF}${o.front || ''}</g>`;
  const sx = o.flip ? -1 : 1;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.lean || 0)}) scale(${f1(s * sx * 1000) / 1000} ${f1(s * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}

// world position of a person's head centre
export const headAt = (x, y, s, o = {}) => [x + s * (cl(o.hunch || 0) * 18), y + s * (-713 + cl(o.hunch || 0) * 95 + (o.headDy || 0))];

// ---------- bubbles / labels ----------
export function thought(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 46, lh = size * 1.2;
  const w = Math.max(...L.map(l => textW(l, size))) + 90, h = L.length * lh + 56;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2;
  const ex = cl(tx, bx + 60, bx + w - 60), ey = ty > y ? by + h : by;
  const c1x = lerp(ex, tx, .35), c1y = lerp(ey, ty, .35), c2x = lerp(ex, tx, .7), c2y = lerp(ey, ty, .7);
  let s = `<circle cx="${f1(c2x)}" cy="${f1(c2y)}" r="11" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="${f1(c1x)}" cy="${f1(c1y)}" r="19" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 70))}" fill="#fff" stroke="${INK}" stroke-width="6"/>`;
  L.forEach((l, i) => { s += T(x, by + 28 + size * .88 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
// big outlined label (day cards, hook title)
export function label(txt, x, y, size, o = {}) {
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const s = T(x, y, txt, size, { fill: o.fill || K.yellow, stroke: INK, sw: o.sw || Math.round(size * .19), ls: o.ls, w: 900 });
  return `<g transform="translate(${f1(x)} ${f1(y - size * .35)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-x)} ${f1(-(y - size * .35))})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
export const dayCard = (t, t0, word, o = {}) => label(word, 540, o.y || 250, o.size || 104, { p: pop(t, t0, .45), a: o.a });
// rounded chip with text
export function chip(x, y, txt, o = {}) {
  const size = o.size || 40, w = textW(txt, size) + 60, h = size + 34;
  return `<g opacity="${op(o.a === undefined ? 1 : o.a)}"><rect x="${f1(x - w / 2)}" y="${f1(y - h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="${o.bg || '#fff'}" stroke="${INK}" stroke-width="5"/>${T(x, y + size * .36, txt, size, { fill: o.fill || K.txt, w: 800 })}</g>`;
}

// ---------- props ----------
export function mug(x, y, s = 1, col = '#f2efe8', t = 0, steam = true) {
  let g = `<path d="M -40 -90 L 40 -90 L 32 0 L -32 0 Z" fill="${col}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M 38 -70 C 72 -70 72 -20 35 -20" fill="none" stroke="${INK}" stroke-width="6"/>`;
  if (steam) for (let i = 0; i < 2; i++) { const p = (t * .5 + i * .5) % 1; g += `<path d="M ${-14 + i * 26} ${f1(-100 - p * 40)} c -8 -14 8 -22 0 -40" stroke="#fff" stroke-width="5" fill="none" opacity="${op(.6 * Math.sin(p * Math.PI))}" stroke-linecap="round"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${g}</g>`;
}
export function phone(x, y, s = 1, rot = 0, screen = '#2b3a55', inner = '') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000})"><rect x="-70" y="-130" width="140" height="260" rx="22" fill="${INK}"/><rect x="-58" y="-112" width="116" height="222" rx="10" fill="${screen}"/>${inner}</g>`;
}
export function plant(x, y, s = 1, pot = '#b9714f') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M -10 -60 C -60 -120 -90 -150 -100 -200 C -50 -180 -20 -140 -4 -70 Z M 6 -60 C 30 -150 60 -190 110 -210 C 90 -150 60 -110 14 -60 Z M 0 -60 C -10 -150 0 -200 20 -250 C 34 -190 26 -130 8 -60 Z" fill="#4f8a5b" stroke="${INK}" stroke-width="4"/><path d="M -50 -60 H 50 L 40 0 H -40 Z" fill="${pot}" stroke="${INK}" stroke-width="5"/></g>`;
}
export function clock(x, y, r, hh, mm, o = {}) {
  const ha = (hh % 12 + mm / 60) * 30 - 90, ma = mm * 6 - 90, rad = a => a * Math.PI / 180;
  return `<g><circle cx="${x}" cy="${y}" r="${r}" fill="${o.face || '#f6f1e6'}" stroke="${INK}" stroke-width="${Math.max(4, r * .08)}"/>${[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11].map(i => `<circle cx="${f1(x + Math.cos(rad(i * 30)) * r * .8)}" cy="${f1(y + Math.sin(rad(i * 30)) * r * .8)}" r="${f1(r * (i % 3 ? .03 : .06))}" fill="${INK}"/>`).join('')}<path d="M ${x} ${y} L ${f1(x + Math.cos(rad(ha)) * r * .5)} ${f1(y + Math.sin(rad(ha)) * r * .5)}" stroke="${INK}" stroke-width="${f1(r * .09)}" stroke-linecap="round"/><path d="M ${x} ${y} L ${f1(x + Math.cos(rad(ma)) * r * .72)} ${f1(y + Math.sin(rad(ma)) * r * .72)}" stroke="${o.hand || INK}" stroke-width="${f1(r * .055)}" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="${f1(r * .07)}" fill="${INK}"/></g>`;
}
// laptop seen from the front-ish (screen faces viewer when face='front', else back of lid)
export function laptop(x, y, s = 1, o = {}) {
  const open = o.open === undefined ? 1 : o.open;
  const lidH = 300 * open;
  let g = `<rect x="-260" y="-14" width="520" height="28" rx="10" fill="#9aa3ad" stroke="${INK}" stroke-width="5"/>`;
  if (o.back) g = `<path d="M -230 0 L -230 ${f1(-lidH)} L 230 ${f1(-lidH)} L 230 0 Z" fill="#b8c0c8" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="${f1(-lidH / 2)}" r="${f1(22 * open)}" fill="#e8edf2"/>` + g;
  else g = `<path d="M -230 0 L -230 ${f1(-lidH)} L 230 ${f1(-lidH)} L 230 0 Z" fill="#2a2f36" stroke="${INK}" stroke-width="5"/><rect x="-212" y="${f1(-lidH + 16)}" width="424" height="${f1(Math.max(0, lidH - 32))}" fill="${o.screen || '#e9eef5'}"/>${open > .95 ? (o.inner || '') : ''}` + g;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// email window content for laptop (local coords inside the screen: x -212..212, y -284..-16)
export function emailUI(o = {}) {
  let s = `<rect x="-212" y="-284" width="424" height="44" fill="#3d6fb6"/>${T(-190, -252, o.head || 'Neue E-Mail', 24, { anchor: 'start', fill: '#fff', w: 800 })}`;
  s += T(-190, -204, 'An: Vermieter', 30, { anchor: 'start', fill: K.txt, w: 800 }) + `<path d="M -200 -190 H 200" stroke="#c4ccd6" stroke-width="3"/>`;
  s += T(-190, -160, 'Betreff: Heizung', 26, { anchor: 'start', fill: '#55606e', w: 700 }) + `<path d="M -200 -146 H 200" stroke="#c4ccd6" stroke-width="3"/>`;
  const lines = o.lines === undefined ? 0 : o.lines;
  for (let i = 0; i < 3; i++) { const w = [340, 300, 220][i] * cl(lines - i); if (w > 1) s += `<rect x="-196" y="${-128 + i * 30}" width="${f1(w)}" height="12" rx="6" fill="#9aa6b4"/>`; }
  if (o.cursor) s += `<rect x="${-196 + (o.cursorX || 0)}" y="-132" width="4" height="24" fill="${K.txt}"/>`;
  return s;
}
// paper sheet (local, centred)
export function paper(x, y, w, h, rot = 0, inner = '', o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)})"><rect x="${f1(-w / 2 + 8)}" y="${f1(-h / 2 + 10)}" width="${w}" height="${h}" rx="6" fill="#000" opacity=".22"/><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${w}" height="${h}" rx="6" fill="${o.fill || '#fbf8ef'}" stroke="${INK}" stroke-width="4"/>${o.lines !== false ? Array.from({ length: Math.floor((h - 60) / 50) }, (_, i) => `<path d="M ${f1(-w / 2 + 24)} ${f1(-h / 2 + 70 + i * 50)} H ${f1(w / 2 - 24)}" stroke="#b9cde6" stroke-width="3"/>`).join('') : ''}${inner}</g>`;
}
export function pen(x, y, s = 1, rot = 30) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${s})"><rect x="-10" y="-150" width="20" height="130" rx="6" fill="#2f5fb5" stroke="${INK}" stroke-width="4"/><path d="M -10 -20 L 0 6 L 10 -20 Z" fill="#e8d8b0" stroke="${INK}" stroke-width="4"/><rect x="-10" y="-150" width="20" height="20" fill="${INK}"/></g>`;
}
// clipped handwriting: reveal text left→right with progress p
let clipN = 0;
export function hand(txt, x, y, size, p, col = '#22324d', id = 'hw') {
  if (p <= 0) return '';
  const w = textW(txt, size) * 1.05;
  return `<defs><clipPath id="v94${id}"><rect x="${f1(x - 4)}" y="${f1(y - size)}" width="${f1(w * cl(p) + 4)}" height="${f1(size * 1.4)}"/></clipPath></defs>${T(x, y, txt, size, { anchor: 'start', fill: col, w: 700 }).replace('<text ', `<text clip-path="url(#v94${id})" `)}`;
}
export function check(x, y, s = 1, col = K.green, p = 1) {
  if (p <= 0) return '';
  return `<path d="M ${x - 30 * s} ${y} L ${x - 8 * s} ${y + 24 * s} L ${x + 34 * s} ${y - 26 * s}" stroke="${col}" stroke-width="${12 * s}" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f1(110 * s)}" stroke-dashoffset="${f1(110 * s * (1 - cl(p)))}"/>`;
}

// a stone falling from (x0,y0) into (x1,y1), landing at tLand (visible from tLand-dur until tLand)
export function fallStone(t, tLand, x0, y0, x1, y1, lb, s = 1, dur = .45, rot0 = -30) {
  if (t < tLand - dur || t >= tLand) return '';
  const p = ein(prog(t, tLand - dur, tLand));
  return stone(lerp(x0, x1, p), lerp(y0, y1, p), s, lb, lerp(rot0, 0, p), { seed: lb.length });
}
// stone dropping out of the bag to the floor, then lying there (from tOut)
export function outStone(t, tOut, x0, y0, x1, y1, lb, s = 1, dur = .5, rot1 = 18) {
  if (t < tOut) return '';
  const p = prog(t, tOut, tOut + dur);
  const x = lerp(x0, x1, p), y = lerp(y0, y1, p * p) - Math.sin(p * Math.PI) * 60 * (1 - p);
  return stone(x, y, s, lb, lerp(0, rot1, p), { seed: lb.length });
}
// the backpack alone, centred at (x,y) (used when it lies on du's chest)
export function bagSolo(x, y, s, n, labels, rot = 0) {
  const g = packGeo(n);
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s * 1000) / 1000}) translate(${f1(-g.cx)} ${f1(-(g.top + g.h / 2))})">${backpack(n, labels, 0)}</g>`;
}
