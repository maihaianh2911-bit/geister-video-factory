// v97 kit — "đầu tròn đen" at the reference2 quality bar (derived from the v95 kit).
// Big characters (head r=165 at s=1), detailed lightly blurred far background, sharp foreground, one light source, vignette.
// Render cost: light pools, glows and floor shadows are radialGradient fills (no blur filters);
// the only filter is the far-background blur (stdDeviation ≤ 4), used once per frame.
import { cl, prog, eio, eout, ein, back, lerp, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, hash };

export const K = {
  ink: '#1d1d1d', txt: '#2b2b2b', yellow: '#ffd23f', white: '#ffffff',
  du: '#2fa59a', duSh: '#268b82', duStr: '#e9f7f4',
  note: '#ffe066', noteSh: '#f2c94c', noteInk: '#3b3a52',
  kol: '#a9cfe8', kolSh: '#86b3d1',          // colleague: glasses + bun, light blue top
  neu: '#d9a62e', neuSh: '#b8871c',          // new colleague: curly hair, mustard sweater
  mama: '#d8c6a8', mamaSh: '#bba98b', apron: '#d2453b', apronSh: '#a8322b', // mother: short hair, red apron
  red: '#d9493f', green: '#3c9a5f', blush: '#ff8a8a',
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
const DEFS97 = `<defs>
<filter id="v97bg" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="3.5"/></filter>
<filter id="v97bg2" x="-5%" y="-5%" width="110%" height="110%"><feGaussianBlur stdDeviation="4"/></filter>
<radialGradient id="v97vig" cx="50%" cy="46%" r="74%"><stop offset="58%" stop-color="#000" stop-opacity="0"/><stop offset="100%" stop-color="#000" stop-opacity=".55"/></radialGradient>
<radialGradient id="v97shd" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#000" stop-opacity=".5"/><stop offset=".6" stop-color="#000" stop-opacity=".25"/><stop offset="1" stop-color="#000" stop-opacity="0"/></radialGradient>
<radialGradient id="v97nglow" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="#ffe680" stop-opacity=".95"/><stop offset=".5" stop-color="#ffd23f" stop-opacity=".45"/><stop offset="1" stop-color="#ffd23f" stop-opacity="0"/></radialGradient>
</defs>`;
export function frame(body, o = {}) {
  return `${DEFS97}<rect width="1080" height="1920" fill="${o.base || '#2a2630'}"/>${body}<rect width="1080" height="1920" fill="url(#v97vig)"/>`;
}
// camera: zoom sc around (cx,cy), then shift by dx,dy
export const cam = (body, cx, cy, sc, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${f1(sc * 1000) / 1000}) translate(${f1(-cx)} ${f1(-cy)})">${body}</g>`;
// light pool: soft radial light drawn with a radialGradient (no blur filter)
export function pool(x, y, rx, ry, col, a = .45) {
  const id = 'v97p' + Math.round(hash(x * 3.1 + y * 7.7 + rx * .13 + ry * .29 + col.length) * 1e7);
  return `<defs><radialGradient id="${id}" cx="50%" cy="50%" r="50%"><stop offset="0" stop-color="${col}" stop-opacity="1"/><stop offset=".45" stop-color="${col}" stop-opacity=".5"/><stop offset="1" stop-color="${col}" stop-opacity="0"/></radialGradient></defs><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="url(#${id})" opacity="${op(a)}"/>`;
}
export const shadow = (x, y, rx = 190, a = 1) => `<ellipse cx="${f1(x)}" cy="${f1(y + 4)}" rx="${f1(rx * 1.15)}" ry="${f1(rx * .2)}" fill="url(#v97shd)" opacity="${op(.75 * a)}"/>`;
export const blur = (s, strong) => `<g filter="url(#${strong ? 'v97bg2' : 'v97bg'})">${s}</g>`;

// ---------- blinking ----------
export function blinking(t, seed = 1) {
  const period = 3.1 + hash(seed) * 1.6, ph = (t + hash(seed + 7) * period) % period;
  return ph < .13;
}

// ---------- face parts (head-local coords, head r = 165) ----------
function eyesSvg(o) {
  const e = o.eyes || 'n', lk = o.look || [0, 0];
  const lx = cl(lk[0], -16, 16), ly = cl(lk[1], -14, 14);
  let s = '';
  if (e === 'closed') s = `<path d="M -85 10 Q -55 26 -25 10 M 25 10 Q 55 26 85 10" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  else if (e === 'happy') s = `<path d="M -85 18 Q -55 -14 -25 18 M 25 18 Q 55 -14 85 18" stroke="#fff" stroke-width="9" fill="none" stroke-linecap="round"/>`;
  else {
    const ry = e === 'wide' ? 40 : e === 'half' ? 20 : e === 'tired' ? 24 : 34, rx = e === 'wide' ? 34 : 30;
    const pr = e === 'blank' ? 9 : e === 'wide' ? 12 : 14;
    s = `<ellipse cx="-55" cy="10" rx="${rx}" ry="${ry}" fill="#fff"/><ellipse cx="50" cy="10" rx="${rx}" ry="${ry}" fill="#fff"/>`;
    s += `<circle cx="${f1(-55 + lx)}" cy="${f1(14 + ly)}" r="${pr}" fill="${INK}"/><circle cx="${f1(50 + lx)}" cy="${f1(14 + ly)}" r="${pr}" fill="${INK}"/>`;
    if (e !== 'blank') s += `<circle cx="${f1(-50 + lx)}" cy="${f1(8 + ly)}" r="4" fill="#fff"/><circle cx="${f1(55 + lx)}" cy="${f1(8 + ly)}" r="4" fill="#fff"/>`;
    if (e === 'half' || e === 'tired') s += `<path d="M -90 ${10 - ry + 6} H -20 M 15 ${10 - ry + 6} H 85" stroke="${INK}" stroke-width="14"/>`;
  }
  if (o.tear) s += `<path d="M 70 ${f1(48 + o.tear * 30)} q 12 20 0 28 q -12 -8 0 -28 Z" fill="#bfe3ff" opacity="${op(Math.min(1, o.tear * 2))}"/>`;
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
  }[b] || '';
  return `<path d="${d}" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>`;
}
function mouthSvg(m) {
  return {
    flat: '<path d="M -28 105 H 28" stroke="#fff" stroke-width="8" stroke-linecap="round"/>',
    frown: '<path d="M -30 112 C -12 98 12 98 30 112" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>',
    smile: '<path d="M -36 98 C -14 120 14 120 36 98" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round"/>',
    soft: '<path d="M -24 102 C -10 112 10 112 24 102" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>',
    grin: '<path d="M -44 92 C -20 132 20 132 44 92 Z" fill="#fff"/>',
    o: '<ellipse cx="0" cy="106" rx="16" ry="20" fill="#fff"/>',
    small: '<path d="M -14 104 Q 0 110 14 104" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>',
    wavy: '<path d="M -36 108 Q -24 98 -12 108 Q 0 118 12 108 Q 24 98 36 108" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>',
    talk: '<path d="M -26 98 C -10 124 10 124 26 98 Z" fill="#fff"/>',
    press: '<path d="M -22 104 H 22" stroke="#fff" stroke-width="10" stroke-linecap="round"/>',
  }[m || 'flat'] || '';
}

// ---------- people ----------
export const WHO = {
  du: { top: K.du, sh: K.duSh, str: K.duStr, pocket: true },                        // "du": teal hoodie (reference2)
  kol: { top: K.kol, sh: K.kolSh, acc: ['bun', 'glasses'], collar: true },           // colleague: glasses + bun, light blue blouse
  neu: { top: K.neu, sh: K.neuSh, acc: ['curly'], knit: true },                      // new colleague: curly hair, mustard sweater
  mama: { top: K.mama, sh: K.mamaSh, acc: ['short'], apron: true },                  // mother: short hair, red apron
  stu: { top: '#7aa27a', sh: '#5e865e', acc: ['cap'] },                              // study participant
  stu2: { top: '#8a5bb5', sh: '#704596', acc: ['bun2'] },
  psy1: { top: '#f2f2ee', sh: '#d6d6cf', acc: ['glasses'], collar: true },        // researcher 1: glasses, white coat
  psy2: { top: '#f2f2ee', sh: '#d6d6cf', acc: ['bun2'], collar: true },           // researcher 2: bun, white coat
};
const has = (W, a) => (W.acc || []).includes(a);
const BODY = 'M -150 -368 C -150 -518 -90 -578 0 -578 C 90 -578 150 -518 150 -368 L 170 -158 C 170 -123 -170 -123 -170 -158 Z';
const SHOULDER = { L: [-118, -520], R: [118, -520] };
function arm(side, h, sleeve, elbow, holdSvg) {
  const [sx, sy] = side < 0 ? SHOULDER.L : SHOULDER.R;
  const mx = elbow ? elbow[0] : (sx + h[0]) / 2 + side * 60, my = elbow ? elbow[1] : (sy + h[1]) / 2 + 30;
  const d = `M ${sx} ${sy} Q ${f1(mx)} ${f1(my)} ${f1(h[0])} ${f1(h[1])}`;
  return `<path d="${d}" stroke="${INK}" stroke-width="56" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${sleeve}" stroke-width="44" fill="none" stroke-linecap="round"/>${holdSvg ? `<g transform="translate(${f1(h[0])} ${f1(h[1])})">${holdSvg}</g>` : ''}<circle cx="${f1(h[0])}" cy="${f1(h[1])}" r="23" fill="${INK}"/>`;
}

function headSvg(W, t, o) {
  const eyes = (o.blink !== false && blinking(t, (o.seed || 0) + 3) && !['closed', 'happy'].includes(o.eyes || 'n')) ? 'closed' : (o.eyes || 'n');
  let head = '';
  if (has(W, 'bun')) head += `<circle cx="20" cy="-172" r="60" fill="${INK}"/><rect x="-26" y="-140" width="70" height="16" rx="8" fill="#5f8fb5" stroke="${INK}" stroke-width="3" transform="rotate(-12 9 -132)"/>`;
  if (has(W, 'bun2')) head += `<circle cx="0" cy="-175" r="52" fill="${INK}"/>`;
  if (has(W, 'curly')) head += `<g fill="${INK}">${[[-120, -80], [-90, -128], [-40, -158], [20, -160], [76, -136], [116, -92], [136, -36], [-138, -24]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="48"/>`).join('')}</g>`;
  if (has(W, 'short')) head += `<path d="M -180 40 C -205 -60 -155 -196 0 -198 C 155 -196 205 -60 180 40 C 160 -10 150 -40 140 -60 L -140 -60 C -150 -40 -160 -10 -180 40 Z" fill="${INK}" stroke="#5a5a5a" stroke-width="8"/><path d="M -150 -110 C -120 -170 -40 -186 20 -180" stroke="#555" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>`;
  head += `<circle cx="0" cy="0" r="165" fill="${INK}"/>`;
  head += `<ellipse cx="-65" cy="-75" rx="50" ry="24" fill="#fff" opacity=".16"/>`;
  if (o.rim) head += `<path d="M 110 -110 C 160 -60 170 50 125 110" fill="none" stroke="${o.rim}" stroke-width="9" stroke-linecap="round" opacity=".75"/>`;
  if (o.rimL) head += `<path d="M -110 -110 C -160 -60 -170 50 -125 110" fill="none" stroke="${o.rimL}" stroke-width="9" stroke-linecap="round" opacity=".75"/>`;
  if (o.blush) head += `<ellipse cx="-92" cy="70" rx="34" ry="18" fill="${K.blush}" opacity="${op(o.blush * .9)}"/><ellipse cx="88" cy="70" rx="34" ry="18" fill="${K.blush}" opacity="${op(o.blush * .9)}"/>`;
  head += eyesSvg({ eyes, look: o.look, glasses: has(W, 'glasses'), tear: o.tear }) + browsSvg(o.brows) + mouthSvg(o.mouth || 'flat');
  if (has(W, 'cap')) head += `<path d="M -158 -40 C -150 -150 -70 -180 10 -178 C 100 -174 160 -120 160 -40 Z" fill="#f2c14e" stroke="${INK}" stroke-width="6"/><path d="M -158 -40 C -210 -40 -250 -26 -262 -12 C -210 -4 -150 -14 -100 -26 Z" fill="#f2c14e" stroke="${INK}" stroke-width="6"/>`;
  return head;
}
// a single head (r = 165·s) centred at (x,y)
export function head(who, x, y, s, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.headTilt || 0)}) scale(${f1(s * 1000) / 1000})">${headSvg(WHO[who], o.t || 0, o)}</g>`;
}
// person: origin at the feet centre. s=1 → head r 165 (reference2 medium shot).
// o: t, seed, look, eyes, brows, mouth, blush, tear, armL/armR [x,y] hand target (local), elbowL/elbowR, holdL/holdR (svg at hand),
//    headTilt, headDy, lean, flip, a, legs:false, walk phase, front (local svg drawn over the body), notes (list for notesOn)
export function person(who, x, y, s, o = {}) {
  const W = WHO[who], t = o.t || 0;
  let bob = o.still ? 0 : Math.sin(t * 2.1 + (o.seed || 0)) * 4;
  const top = o.top || W.top, sh = W.sh;
  const wk = o.walk;
  let legs = '';
  if (o.legs !== false) {
    const sw = wk === undefined ? 0 : Math.sin(wk * Math.PI * 2) * 34;
    const l1 = wk === undefined ? 0 : Math.max(0, Math.sin(wk * Math.PI * 2)) * 14, l2 = wk === undefined ? 0 : Math.max(0, -Math.sin(wk * Math.PI * 2)) * 14;
    legs += `<path d="M -40 -150 Q ${f1(-40 + sw / 2)} -75 ${f1(-40 + sw)} ${f1(-10 - l1)}" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/>`;
    legs += `<path d="M 40 -150 Q ${f1(40 - sw / 2)} -75 ${f1(40 - sw)} ${f1(-10 - l2)}" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/>`;
    legs += `<ellipse cx="${f1(-50 + sw)}" cy="${f1(-l1)}" rx="36" ry="14" fill="${INK}"/><ellipse cx="${f1(50 - sw)}" cy="${f1(-l2)}" rx="36" ry="14" fill="${INK}"/>`;
  }
  let body = `<path d="${BODY}" fill="${top}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/>`;
  if (W.collar) {
    body += `<path d="M -60 -566 L 0 -500 L 60 -566 Z" fill="#f4eee0" stroke="${INK}" stroke-width="4"/><g fill="${sh}"><circle cx="0" cy="-450" r="7"/><circle cx="0" cy="-390" r="7"/><circle cx="0" cy="-330" r="7"/></g>`;
  } else {
    body += `<path d="M -130 -518 C -100 -578 100 -578 130 -518 C 100 -488 -100 -488 -130 -518 Z" fill="${sh}" stroke="${INK}" stroke-width="5"/>`;
    if (W.knit) body += `<g stroke="${sh}" stroke-width="5" fill="none">${[-430, -360, -290].map(y => `<path d="M -120 ${y} q 20 -14 40 0 t 40 0 t 40 0 t 40 0 t 40 0 t 40 0"/>`).join('')}</g>`;
    if (W.str) body += `<path d="M -12 -498 L -26 -423 M 12 -498 L 26 -423" stroke="${W.str}" stroke-width="7" stroke-linecap="round"/><circle cx="-26" cy="-416" r="7" fill="${W.str}"/><circle cx="26" cy="-416" r="7" fill="${W.str}"/>`;
    if (W.pocket) body += `<path d="M -100 -278 C -60 -258 60 -258 100 -278 L 95 -218 C 55 -198 -55 -198 -95 -218 Z" fill="${sh}" stroke="${INK}" stroke-width="4"/>`;
  }
  if (W.apron) body += `<path d="M -105 -470 L 105 -470 L 135 -150 C 70 -128 -70 -128 -135 -150 Z" fill="${K.apron}" stroke="${INK}" stroke-width="5" stroke-linejoin="round"/><path d="M -105 -470 C -90 -540 -60 -566 -40 -572 M 105 -470 C 90 -540 60 -566 40 -572" stroke="${K.apronSh}" stroke-width="10" fill="none"/><rect x="-60" y="-330" width="120" height="80" rx="10" fill="${K.apronSh}" stroke="${INK}" stroke-width="4"/>`;
  let armsF = '';
  if (o.armL) armsF += arm(-1, o.armL, top, o.elbowL, o.holdL);
  if (o.armR) armsF += arm(1, o.armR, top, o.elbowR, o.holdR);
  const headS = headSvg(W, t, o);
  const hy = -713 + (o.headDy || 0) + bob * .5;
  const up = bob * .5;
  const notes = o.notes ? notesOn(o.notes, t) : '';
  const g = `${legs}<g transform="translate(0 ${f1(up)})">${o.behind || ''}${body}<g transform="translate(0 ${f1(hy)}) rotate(${f1(o.headTilt || 0)})">${headS}${o.face || ''}</g>${o.armsBack ? '' : ''}${notes}${armsF}${o.front || ''}</g>`;
  const sx = o.flip ? -1 : 1;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.lean || 0)}) scale(${f1(s * sx * 1000) / 1000} ${f1(s * 1000) / 1000})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}
export const headAt = (x, y, s, o = {}) => [x + 0, y + s * (-713 + (o.headDy || 0))];

// a sleeve + hand drawn in world coords (for arms that must sit in front of a desk/prop)
export function armW(x0, y0, ex, ey, x1, y1, sleeve, s = 1) {
  const d = `M ${f1(x0)} ${f1(y0)} Q ${f1(ex)} ${f1(ey)} ${f1(x1)} ${f1(y1)}`;
  return `<path d="${d}" stroke="${INK}" stroke-width="${f1(56 * s)}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${sleeve}" stroke-width="${f1(44 * s)}" fill="none" stroke-linecap="round"/><circle cx="${f1(x1)}" cy="${f1(y1)}" r="${f1(23 * s)}" fill="${INK}"/>`;
}

// ---------- sticky notes ----------
// a yellow sticky note centred at (x,y); size 1 = 140×130; lines = short handwritten words
export function note(x, y, s, rot = 0, lines = [], o = {}) {
  const L = Array.isArray(lines) ? lines : [lines];
  let g = '';
  if (o.glow) g += `<ellipse cx="0" cy="0" rx="200" ry="190" fill="url(#v97nglow)" opacity="${op(o.glow)}"/>`;
  g += `<path d="M -66 -58 H 70 V 50 L 52 66 H -66 Z" fill="#000" opacity=".18" transform="translate(6 8)"/>`;
  g += `<path d="M -70 -65 H 70 V 48 L 50 65 H -70 Z" fill="${K.note}" stroke="${INK}" stroke-width="4" stroke-linejoin="round"/>`;
  g += `<rect x="-70" y="-65" width="140" height="22" fill="${K.noteSh}" opacity=".7"/>`;
  g += `<path d="M 70 48 L 50 48 L 50 65 Z" fill="${K.noteSh}" stroke="${INK}" stroke-width="3" stroke-linejoin="round"/>`;
  if (L.length) {
    const size = o.size || Math.min(26, 118 / Math.max(1, ...L.map(l => textW(l, 1))));
    const lh = size * 1.18, y0 = 6 - (L.length - 1) * lh / 2 + size * .35;
    L.forEach((l, i) => { g += T(0, y0 + i * lh, l, size, { fill: K.noteInk, w: 700 }); });
  } else {
    g += `<g stroke="${K.noteInk}" stroke-width="5" stroke-linecap="round" opacity=".75"><path d="M -48 -14 q 14 -8 28 0 t 28 0 t 28 0"/><path d="M -48 14 q 14 -8 28 0 t 28 0"/></g>`;
  }
  const sc = f1(s * (o.p === undefined ? 1 : Math.max(.01, o.p)) * 1000) / 1000;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${sc})"${o.a !== undefined ? ` opacity="${op(o.a)}"` : ''}>${g}</g>`;
}
// du's three compliment notes (person-local coords at s=1)
export const N1 = { x: 108, y: -505, rot: 12, txt: ['Das war', 'richtig gut.'] };            // shoulder (Montag morning)
export const N2 = { x: -78, y: -395, rot: -9, txt: ['Danke, du hast', 'meinen Tag', 'gerettet.'] }; // chest (noon)
export const N3 = { x: 62, y: -290, rot: 7, txt: ['Bestes', 'Essen!'] };                    // belly (evening)
// draws notes in person-local coords. list items: {x,y,rot,txt, glow, a, s}
export function notesOn(list, t = 0) {
  return list.map((n, i) => note(n.x, n.y, n.s || 1, n.rot + Math.sin(t * 3 + i * 1.7) * 1.5, n.txt || [], { glow: n.glow, a: n.a })).join('');
}
// a note flying from world (x0,y0) to (x1,y1), arriving at tLand (visible from tLand-dur). Spins a little, slaps flat.
export function flyNote(t, tLand, x0, y0, x1, y1, s0, s1, rot1, txt, dur = .6, o = {}) {
  if (t < tLand - dur || t >= tLand) return '';
  const p = eio(prog(t, tLand - dur, tLand));
  const arc = Math.sin(p * Math.PI) * (o.arc === undefined ? -120 : o.arc);
  return note(lerp(x0, x1, p), lerp(y0, y1, p) + arc, lerp(s0, s1, p), lerp(rot1 - 160, rot1, p), txt, { glow: o.glow });
}
// world position of a note given in person-local coords
export const noteAt = (x, y, s, n) => [x + n.x * s, y + n.y * s];
// a note peeling off and drifting (from tOff): returns svg while 0<p<1
export function peelNote(t, tOff, x0, y0, x1, y1, s0, s1, n, dur = 1.1, o = {}) {
  if (t < tOff || t >= tOff + dur) return '';
  const p = prog(t, tOff, tOff + dur), e = eio(p);
  const x = lerp(x0, x1, e) + Math.sin(p * Math.PI * 3) * 26 * (1 - p), y = lerp(y0, y1, e) - Math.sin(p * Math.PI) * (o.arc || 90);
  return note(x, y, lerp(s0, s1, e), n.rot + Math.sin(p * Math.PI * 2.5) * 30, n.txt, { glow: o.glow === undefined ? .8 * Math.sin(p * Math.PI) : o.glow, a: o.fadeEnd ? 1 - prog(p, .75, 1) : 1 });
}
// little warm sparkle burst (note turning into a smile)
export function sparkle(x, y, p, s = 1, col = K.yellow) {
  if (p <= 0 || p >= 1) return '';
  let g = `<circle cx="0" cy="0" r="${f1(40 + 120 * p)}" fill="url(#v97nglow)" opacity="${op(1 - p)}"/>`;
  for (let i = 0; i < 8; i++) {
    const a = i / 8 * Math.PI * 2 + .3, r0 = 40 + 90 * eout(p), r1 = r0 + 34 * (1 - p);
    g += `<path d="M ${f1(Math.cos(a) * r0)} ${f1(Math.sin(a) * r0)} L ${f1(Math.cos(a) * r1)} ${f1(Math.sin(a) * r1)}" stroke="${col}" stroke-width="10" stroke-linecap="round" opacity="${op(1 - p)}"/>`;
  }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${g}</g>`;
}

// ---------- bubbles / labels ----------
export function thought(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 46, lh = size * 1.2;
  const w = o.w || Math.max(...L.map(l => textW(l, size))) + 90, h = o.h || L.length * lh + 56;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2;
  const ex = cl(tx, bx + 60, bx + w - 60), ey = ty > y ? by + h : by;
  const c1x = lerp(ex, tx, .35), c1y = lerp(ey, ty, .35), c2x = lerp(ex, tx, .7), c2y = lerp(ey, ty, .7);
  let s = `<circle cx="${f1(c2x)}" cy="${f1(c2y)}" r="11" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="${f1(c1x)}" cy="${f1(c1y)}" r="19" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
  s += `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 70))}" fill="#fff" stroke="${INK}" stroke-width="6"/>`;
  if (o.inner) s += o.inner;
  else L.forEach((l, i) => { s += T(x, by + 28 + size * .88 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
export function label(txt, x, y, size, o = {}) {
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const s = T(x, y, txt, size, { fill: o.fill || K.yellow, stroke: INK, sw: o.sw || Math.round(size * .19), ls: o.ls, w: 900 });
  return `<g transform="translate(${f1(x)} ${f1(y - size * .35)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-x)} ${f1(-(y - size * .35))})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
}
export const dayCard = (t, t0, word, o = {}) => label(word, 540, o.y || 250, o.size || 104, { p: pop(t, t0, .45), a: o.a, fill: o.fill });
export function speech(x, y, lines, tx, ty, o = {}) {
  const L = Array.isArray(lines) ? lines : [lines], size = o.size || 46, lh = size * 1.2;
  const w = Math.max(...L.map(l => textW(l, size))) + 80, h = L.length * lh + 50;
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const bx = x - w / 2, by = y - h / 2, fill = o.fill || '#fff';
  const ex = cl(tx, bx + 70, bx + w - 70), ey = ty > y ? by + h - 4 : by + 4;
  let s = `<rect x="${f1(bx)}" y="${f1(by)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(Math.min(h / 2, 50))}" fill="${fill}" stroke="${INK}" stroke-width="6"/>`;
  s += `<path d="M ${f1(ex - 30)} ${f1(ey)} L ${f1(tx)} ${f1(ty)} L ${f1(ex + 30)} ${f1(ey)} Z" fill="${fill}" stroke="${INK}" stroke-width="6" stroke-linejoin="round"/><path d="M ${f1(ex - 26)} ${f1(ey)} L ${f1(ex + 26)} ${f1(ey)}" stroke="${fill}" stroke-width="10"/>`;
  L.forEach((l, i) => { s += T(x, by + 24 + size * .88 + i * lh, l, size, { w: 800, fill: o.col || K.txt }); });
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${s}</g>`;
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
// steaming dish (plate with food), centred at base (x,y)
export function dish(x, y, s = 1, t = 0, steam = 1) {
  let g = `<ellipse cx="0" cy="0" rx="150" ry="34" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/><ellipse cx="0" cy="-6" rx="110" ry="22" fill="#e6e1d6"/>`;
  g += `<path d="M -95 -8 C -90 -60 90 -60 95 -8 Z" fill="#d98a3e" stroke="${INK}" stroke-width="5"/><path d="M -60 -30 q 20 -18 40 0 M 0 -38 q 20 -16 40 0" stroke="#b5652a" stroke-width="7" fill="none" stroke-linecap="round"/><circle cx="-30" cy="-44" r="10" fill="#6aa565"/><circle cx="34" cy="-30" r="9" fill="#6aa565"/><circle cx="60" cy="-46" r="8" fill="#c25b4e"/>`;
  for (let i = 0; i < 3; i++) { const p = (t * .45 + i / 3) % 1; g += `<path d="M ${-40 + i * 40} ${f1(-60 - p * 70)} c -12 -18 12 -28 0 -50" stroke="#fff" stroke-width="7" fill="none" opacity="${op(.7 * steam * Math.sin(p * Math.PI))}" stroke-linecap="round"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">${g}</g>`;
}
// gauge bar for the study: level marker (0..1) vs estimate marker
export function check(x, y, s = 1, col = K.green, p = 1) {
  if (p <= 0) return '';
  return `<path d="M ${x - 30 * s} ${y} L ${x - 8 * s} ${y + 24 * s} L ${x + 34 * s} ${y - 26 * s}" stroke="${col}" stroke-width="${12 * s}" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f1(110 * s)}" stroke-dashoffset="${f1(110 * s * (1 - cl(p)))}"/>`;
}
export function arrow(x, y, s, dir, col, p = 1) {
  if (p <= 0) return '';
  const d = 'M 0 -90 L 70 -10 L 28 -10 L 28 90 L -28 90 L -28 -10 L -70 -10 Z';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${dir > 0 ? 0 : 180}) scale(${f1(s * cl(p * 1.4) * 1000) / 1000})"><path d="${d}" fill="${col}" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/></g>`;
}
