// v71 "Eine Nacht ohne Schlaf – und trotzdem zur Arbeit?" — kit for this video only (style: jobs/v71/style.md).
// Channel 2 look (base kit adapted from v72): friendly, clean, rounded; pastel rooms, 4 px navy outline;
// teal = "ok", amber = tired, red only for warning. Cast: du = short brown hair, blue shirt; colleague = auburn bob, grey-blue cardigan.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  ink: '#16324F', teal: '#2EC4B6', tealD: '#1E9488', white: '#FFFFFF', pink: '#FF8FA3', pinkD: '#E0677F', skin: '#F1C6A5', skinD: '#D9A27E', room: '#EAF6F4', room2: '#D6ECE8',
  red: '#E5484D', amber: '#F2B13B', amberD: '#C98A1A', wood: '#C99A6B', woodD: '#A57A50', steel: '#C9D3D8', steelD: '#8E9AA2',
  du: '#5B8BD9', duD: '#3F6DB8', hairDu: '#5A3A22', other: '#6F86A6', otherD: '#526A88', hairO: '#9A4A2A',
  night: '#1D2B4A', night2: '#2B3D63', dusk: '#F3B07C', road: '#5C6670', roadL: '#E9EEF0', grass: '#BFE3C0', grassD: '#8CC79A', coffee: '#6B3E26', paper: '#FBF8EE',
  carBody: '#E5484D', carD: '#B5363A', glass: '#CFE8F2', shadow: 'rgba(22,50,79,.18)',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 4) => `stroke="${K.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const BG = (f = K.room) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${f}"/>`;
// rounded label card (navy text on white), optional colour
export const label = (x, y, txt, a = 1, col = K.ink, sz = 58, bg = K.white) => a <= .01 ? '' : `<g opacity="${f1(cl(a))}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(.85 + .15 * cl(a))})"><rect x="${f1(-(txt.length * sz * .33 + 34))}" y="${f1(-sz * .9)}" width="${f1(txt.length * sz * .66 + 68)}" height="${f1(sz * 1.4)}" rx="${f1(sz * .5)}" fill="${bg}" ${OL()}/>${TX(txt, 0, sz * .12, sz, col)}</g>`;
export const tick = (x, y, s, p, col = K.teal) => p <= 0 ? '' : `<path d="M ${f1(x - 40 * s)} ${f1(y)} L ${f1(x - 10 * s)} ${f1(y + 30 * s)} L ${f1(x + 46 * s)} ${f1(y - 36 * s)}" fill="none" stroke="${col}" stroke-width="${f1(18 * s)}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f1(160 * s)}" stroke-dashoffset="${f1(160 * s * (1 - cl(p)))}"/>`;

// ---- rooms
export const wallTiles = (y, c = K.room2) => `${[...Array(9)].map((_, i) => `<path d="M ${i * 140 - 40} 0 V ${y}" stroke="${c}" stroke-width="6"/>`).join('')}${[...Array(9)].map((_, i) => `<path d="M -60 ${i * 140} H 1140" stroke="${c}" stroke-width="6"/>`).join('')}`;
export const table = (y = 1250, c = K.wood, cd = K.woodD) => `<rect x="-60" y="${y}" width="1200" height="${2000 - y}" fill="${c}" ${OL()}/><path d="M -60 ${y + 40} H 1140" stroke="${cd}" stroke-width="6"/>`;
export const kitchen = (y = 1250) => `${BG()}${wallTiles(y)}${table(y)}`;
// office: plain light wall, window strip, grey desk
export const office = (y = 1250) => `${BG('#EEF3F6')}<rect x="-60" y="${y - 520}" width="1200" height="14" fill="${K.room2}"/>${table(y, '#DDE3E8', K.steelD)}`;
// window with sky colour (night → day via p)
export function windowSky(x, y, w, h, p) {
  const c1 = mix(K.night, '#BFE6F5', p), sun = p > .3 ? `<circle cx="${f1(x + w * .7)}" cy="${f1(y + h * (1 - .5 * p))}" r="${f1(36)}" fill="#FFD66B" opacity="${f1(cl((p - .3) * 2))}"/>` : '';
  const moon = p < .6 ? `<circle cx="${f1(x + w * .3)}" cy="${f1(y + h * .3)}" r="26" fill="#F6F0D2" opacity="${f1(1 - cl(p * 1.7))}"/>` : '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${c1}" ${OL(6)}/>${moon}${sun}<path d="M ${x + w / 2} ${y} V ${y + h} M ${x} ${y + h / 2} H ${x + w}" stroke="${K.white}" stroke-width="10"/><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" ${OL(6)}/>`;
}
export function mix(a, b, p) {
  const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)), A = h(a), B = h(b), q = cl(p);
  return `rgb(${A.map((v, i) => Math.round(v + (B[i] - v) * q)).join(',')})`;
}
// wall clock (hours h may be fractional), r radius
export function clock(x, y, r, h, m) {
  const ha = ((h % 12) + m / 60) / 12 * Math.PI * 2, ma = m / 60 * Math.PI * 2;
  const ticks = [...Array(12)].map((_, i) => { const a = i / 12 * Math.PI * 2; return `<path d="M ${f1(x + Math.sin(a) * r * .78)} ${f1(y - Math.cos(a) * r * .78)} L ${f1(x + Math.sin(a) * r * .9)} ${f1(y - Math.cos(a) * r * .9)}" stroke="${K.ink}" stroke-width="${i % 3 ? 4 : 8}" stroke-linecap="round"/>`; }).join('');
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${K.white}" ${OL(6)}/>${ticks}<path d="M ${x} ${y} L ${f1(x + Math.sin(ha) * r * .5)} ${f1(y - Math.cos(ha) * r * .5)}" stroke="${K.ink}" stroke-width="12" stroke-linecap="round"/><path d="M ${x} ${y} L ${f1(x + Math.sin(ma) * r * .75)} ${f1(y - Math.cos(ma) * r * .75)}" stroke="${K.ink}" stroke-width="7" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="9" fill="${K.red}"/>`;
}
// coffee mug, (x, y) = bottom centre, rotation about the handle grip; steam 0..1
export function mug(x, y, s, o = {}) {
  const st = o.steam ?? 1, t = o.t || 0, full = o.full ?? 1;
  const steam = st > 0 ? [0, 1, 2].map(i => `<path d="M ${-30 + i * 30} -150 q ${f1(-14 + 8 * Math.sin(t * 3 + i))} -30 0 -60 q ${f1(14 - 8 * Math.sin(t * 3 + i))} -30 0 -60" fill="none" stroke="${K.white}" stroke-width="9" stroke-linecap="round" opacity="${f1(.8 * st)}"/>`).join('') : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s)})">${steam}<path d="M 70 -110 q 60 0 60 45 q 0 45 -60 45" fill="none" ${OL(22)}/><path d="M 70 -110 q 60 0 60 45 q 0 45 -60 45" fill="none" stroke="${o.col || K.teal}" stroke-width="14"/>
    <path d="M -75 -140 L 75 -140 L 66 -8 Q 64 0 54 0 L -54 0 Q -64 0 -66 -8 Z" fill="${o.col || K.teal}" ${OL()}/>${full > 0 ? `<ellipse cx="0" cy="-140" rx="${f1(70)}" ry="12" fill="${K.coffee}" ${OL(3)}/>` : `<ellipse cx="0" cy="-140" rx="70" ry="12" fill="${K.tealD}" ${OL(3)}/>`}</g>`;
}

// ---- people (bust, origin = shoulder-line centre). o.look, o.lookY, o.brow (0..1 raised; <0 angry), o.mouth, o.lid (0..1 eyelid closure), o.tired (dark circles 0..1), o.tilt
const face = o => {
  const lk = (o.look || 0) * 8, ly = (o.lookY || 0) * 6, b = o.brow ?? 0, lid = cl(o.lid || 0), r = o.wide ? 8 : 7;
  let eyes = '';
  for (const ex of [-16, 16]) {
    const cx = ex + lk;
    if (lid > .92) { eyes += `<path d="M ${f1(cx - 11)} ${f1(ly + 1)} q 11 7 22 0" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`; continue; }
    eyes += `<circle cx="${f1(cx)}" cy="${f1(ly)}" r="${r}" fill="${K.ink}"/>`;
    if (lid > .02) { const e = ly - r - 2 + (2 * r + 2) * lid; eyes += `<path d="M ${f1(cx - r - 3)} ${f1(ly - r - 4)} H ${f1(cx + r + 3)} V ${f1(e)} H ${f1(cx - r - 3)} Z" fill="${K.skin}"/><path d="M ${f1(cx - r - 3)} ${f1(e)} H ${f1(cx + r + 3)}" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`; }
  }
  const circles = o.tired ? `<path d="M -28 14 q 12 7 24 0 M 4 14 q 12 7 24 0" fill="none" stroke="#9B8BB0" stroke-width="5" stroke-linecap="round" opacity="${f1(o.tired)}"/>` : '';
  const brows = b < 0 ? `<path d="M ${-30 + lk} -24 l 22 ${f1(8 * -b)} M ${30 + lk} -24 l -22 ${f1(8 * -b)}" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/>`
    : `<path d="M ${-28 + lk} ${f1(-20 - 5 * b)} l 20 ${f1(b > .5 ? -7 : 2)} M ${28 + lk} ${f1(-20 - 5 * b)} l -20 ${f1(b > .5 ? -7 : 2)}" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  const m = o.mouth === 'o' ? `<ellipse cx="${lk}" cy="30" rx="9" ry="12" fill="${K.ink}"/>` : o.mouth === 'sip' ? `<ellipse cx="${lk}" cy="30" rx="7" ry="6" fill="${K.ink}"/>`
    : o.mouth === 'smile' ? `<path d="M ${lk - 14} 24 q 14 12 28 0" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`
    : o.mouth === 'down' ? `<path d="M ${lk - 12} 32 q 12 -9 24 0" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`
    : o.mouth === 'snap' ? `<path d="M ${lk - 16} 26 h 32 v 10 h -32 Z" fill="${K.white}" ${OL(4)}/>`
    : o.mouth === 'yawn' ? `<ellipse cx="${lk}" cy="30" rx="14" ry="${f1(8 + 10 * cl(o.yawn ?? 1))}" fill="${K.ink}"/>`
    : `<path d="M ${lk - 11} 28 h 22" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  return circles + eyes + brows + m;
};
export function headOf(who, x, y, s, o = {}) {
  const hair = who === 'du' ? `<path d="M -60 -6 Q -66 -70 -6 -76 Q 52 -80 62 -20 Q 40 -44 8 -42 Q -22 -40 -36 -28 Q -48 -20 -60 -6 Z" fill="${K.hairDu}" ${OL(4)}/>`
    : `<path d="M -62 40 Q -70 -70 0 -72 Q 70 -70 62 40 L 48 40 Q 54 -20 30 -40 Q -10 -30 -48 -10 L -50 40 Z" fill="${K.hairO}" ${OL(4)}/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s)})"><ellipse cx="0" cy="0" rx="56" ry="62" fill="${K.skin}" ${OL(4)}/>${face(o)}${hair}</g>`;
}
export function arm(sh, el, hd, s, col, o = {}) {
  const d = `M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(hd[0])} ${f1(hd[1])}`;
  return `<path d="${d}" fill="none" stroke="${K.ink}" stroke-width="${f1(46 * s + 8)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f1(46 * s)}" stroke-linecap="round" stroke-linejoin="round"/>
    ${o.under || ''}<circle cx="${f1(hd[0])}" cy="${f1(hd[1])}" r="${f1(24 * s)}" fill="${K.skin}" ${OL(4)}/>${o.held || ''}`;
}
// shoulder positions of a bust (for computing arm targets)
export const shoulders = (x, y, s) => [[x - (100 - 16) * s, y + 34 * s], [x + (100 - 16) * s, y + 34 * s]];
// o.aL/o.aR = [[elbow],[hand]] or null; o.heldL/o.heldR svg drawn over that hand; o.underL/underR drawn below the hand dot
export function bust(who, x, y, s, o = {}) {
  const col = who === 'du' ? K.du : K.other, colD = who === 'du' ? K.duD : K.otherD;
  const w = 100 * s, h = 420 * s;
  const torso = `<path d="M ${f1(x - w)} ${f1(y + 20 * s)} Q ${f1(x - w - 14 * s)} ${f1(y + h * .6)} ${f1(x - w + 6 * s)} ${f1(y + h)} L ${f1(x + w - 6 * s)} ${f1(y + h)} Q ${f1(x + w + 14 * s)} ${f1(y + h * .6)} ${f1(x + w)} ${f1(y + 20 * s)} Q ${f1(x)} ${f1(y - 16 * s)} ${f1(x - w)} ${f1(y + 20 * s)} Z" fill="${col}" ${OL()}/>
    <path d="M ${f1(x - 40 * s)} ${f1(y + 4 * s)} Q ${f1(x)} ${f1(y + 40 * s)} ${f1(x + 40 * s)} ${f1(y + 4 * s)}" fill="none" stroke="${colD}" stroke-width="${f1(10 * s)}"/>`;
  const one = (pts, side, held, under) => { const sh = [x + side * (w - 16 * s), y + 34 * s]; const p = pts || [[sh[0] + side * 18 * s, sh[1] + 160 * s], [sh[0] + side * 12 * s, sh[1] + 310 * s]]; return arm(sh, p[0], p[1], s, col, { held, under }); };
  return `${torso}${o.front || ''}${headOf(who, x + (o.hx || 0) * s, y - 92 * s + (o.hy || 0) * s, s, o)}${o.noL ? '' : one(o.aL, -1, o.heldL, o.underL)}${o.noR ? '' : one(o.aR, 1, o.heldR, o.underR)}`;
}
// elbow for a hand target: point between shoulder and hand, pushed sideways by `out` px (sign = side)
export const elbow = (sh, hd, out) => { const mx = (sh[0] + hd[0]) / 2, my = (sh[1] + hd[1]) / 2, dx = hd[0] - sh[0], dy = hd[1] - sh[1], d = Math.hypot(dx, dy) || 1; return [mx - dy / d * out, my + dx / d * out]; };

// ---- office props
// monitor seen from the front, screen centre (x, y), w×h; inner svg drawn in screen coords (0..w, 0..h)
export function monitor(x, y, w, h, inner = '') {
  return `<rect x="${f1(x - 30)}" y="${f1(y + h / 2)}" width="60" height="90" fill="${K.steelD}" ${OL()}/><rect x="${f1(x - 120)}" y="${f1(y + h / 2 + 80)}" width="240" height="26" rx="12" fill="${K.steel}" ${OL()}/>
    <rect x="${f1(x - w / 2 - 22)}" y="${f1(y - h / 2 - 22)}" width="${f1(w + 44)}" height="${f1(h + 44)}" rx="24" fill="#2B3A4F" ${OL()}/><g transform="translate(${f1(x - w / 2)} ${f1(y - h / 2)})"><rect width="${w}" height="${h}" rx="8" fill="${K.white}"/>${inner}</g>`;
}
// email body: n text lines; hl index -> highlight colour; returns svg in screen coords
export function emailLines(w, n, o = {}) {
  let s = `<rect x="0" y="0" width="${w}" height="70" fill="${K.room2}"/><circle cx="44" cy="35" r="20" fill="${K.other}"/><rect x="80" y="22" width="${f1(w * .45)}" height="26" rx="8" fill="${K.steelD}"/>`;
  for (let i = 0; i < n; i++) {
    const y = 110 + i * 62, len = [.9, .75, .85, .6, .8, .7, .88, .5][i % 8] * (w - 80);
    const c = o.red === i ? K.red : K.steel;
    s += `<rect x="40" y="${y}" width="${f1(len)}" height="24" rx="10" fill="${c}"/>`;
  }
  return s;
}
// gauge bar: label above, fill p 0..1, colour
export function bar(x, y, w, h, p, col, txt, o = {}) {
  return `${txt ? TX(txt, x, y - 26, o.sz || 50, o.tcol || K.ink, 'start') : ''}<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${h / 2}" fill="${K.white}" ${OL(5)}/>
    ${p > .01 ? `<rect x="${x + 8}" y="${y + 8}" width="${f1((w - 16) * cl(p))}" height="${h - 16}" rx="${(h - 16) / 2}" fill="${col}"/>` : ''}${o.extra || ''}`;
}
// half-circle dial (meter) with needle angle p 0..1 (left→right), zones teal→amber→red
export function dial(x, y, r, p, txt) {
  const arc = (a0, a1, c) => { const P = a => [x - Math.cos(a * Math.PI) * r, y - Math.sin(a * Math.PI) * r]; const [x0, y0] = P(a0), [x1, y1] = P(a1); return `<path d="M ${f1(x0)} ${f1(y0)} A ${r} ${r} 0 0 1 ${f1(x1)} ${f1(y1)}" fill="none" stroke="${c}" stroke-width="${f1(r * .22)}"/>`; };
  const a = cl(p) * Math.PI, nx = x - Math.cos(a) * r * .82, ny = y - Math.sin(a) * r * .82;
  return `<path d="M ${x - r * 1.18} ${y + 30} A ${r * 1.18} ${r * 1.18} 0 0 1 ${x + r * 1.18} ${y + 30} Z" fill="${K.white}" ${OL(5)}/>${arc(0, .45, K.teal)}${arc(.45, .7, K.amber)}${arc(.7, 1, K.red)}
    <path d="M ${x} ${y} L ${f1(nx)} ${f1(ny)}" stroke="${K.ink}" stroke-width="14" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="18" fill="${K.ink}"/>${txt ? TX(txt, x, y + 110, 56, K.ink) : ''}`;
}
// side-view head silhouette with transparent window to the brain (x, y = centre of head), s scale; inner = svg in brain coords
export function brainHead(x, y, s, inner = '', o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M -40 300 L -40 200 Q -170 150 -170 -20 Q -170 -230 20 -240 Q 200 -240 210 -60 Q 214 0 250 60 Q 254 80 220 84 L 214 140 Q 200 170 140 168 L 120 300 Z" fill="${K.skin}" ${OL(6)}/>
    <path d="M -150 -40 Q -160 -200 10 -214 Q 170 -214 182 -70 Q 150 -60 120 -80 Q 90 -40 40 -60 Q 0 -30 -40 -60 Q -90 -30 -150 -40 Z" fill="${K.pink}" ${OL(5)}/>
    <path d="M -100 -120 q 30 -30 60 0 q 30 -30 60 0 M -60 -170 q 30 -20 60 0 M 40 -170 q 30 -20 60 10 M 70 -110 q 30 -20 60 10" fill="none" stroke="${K.pinkD}" stroke-width="7" stroke-linecap="round"/>${inner}
    ${o.eye === 'closed' ? `<path d="M 130 -10 q 18 10 36 0" fill="none" stroke="${K.ink}" stroke-width="6" stroke-linecap="round"/>` : `<circle cx="150" cy="-12" r="11" fill="${K.ink}"/>`}</g>`;
}

// ---- car & road
// side-view car, (x, y) = ground point under the centre, s scale, wheel turn w (rad); o.driver svg drawn in the window (car coords)
export function carSide(x, y, s, w = 0, o = {}) {
  const wheel = cx => `<g transform="translate(${cx} -46) rotate(${f1(w * 57.3)})"><circle r="46" fill="#2B3A4F" ${OL()}/><circle r="20" fill="${K.steel}"/><path d="M -20 0 H 20 M 0 -20 V 20" stroke="${K.steelD}" stroke-width="6"/></g>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><ellipse cx="0" cy="-2" rx="230" ry="14" fill="${K.shadow}"/>
    <path d="M -230 -60 Q -236 -130 -180 -136 L -110 -140 Q -70 -230 20 -232 L 90 -230 Q 150 -228 190 -146 Q 236 -140 236 -100 L 236 -60 Q 236 -40 210 -40 L -210 -40 Q -230 -40 -230 -60 Z" fill="${K.carBody}" ${OL(5)}/>
    <path d="M -86 -146 Q -56 -210 18 -212 L 30 -212 L 30 -146 Z" fill="${K.glass}" ${OL(4)}/><path d="M 50 -212 L 86 -212 Q 140 -210 168 -146 L 50 -146 Z" fill="${K.glass}" ${OL(4)}/>
    <g clip-path="url(#${o.id || 'cw'})">${o.driver || ''}</g><defs><clipPath id="${o.id || 'cw'}"><path d="M -86 -146 Q -56 -210 18 -212 L 30 -212 L 30 -146 Z M 50 -212 L 86 -212 Q 140 -210 168 -146 L 50 -146 Z"/></clipPath></defs>
    ${o.lights ? `<path d="M 236 -96 L 420 -130 L 420 -40 Z" fill="#FFE9A8" opacity="${f1(.5 * o.lights)}"/>` : ''}<rect x="214" y="-104" width="22" height="18" rx="6" fill="#FFE9A8" ${OL(3)}/>${wheel(-140)}${wheel(140)}</g>`;
}
// top-down car pointing up (towards -y), centre (x, y), s scale
export const carTop = (x, y, s, rot = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><rect x="-46" y="-90" width="92" height="180" rx="30" fill="${K.carBody}" ${OL(4)}/><rect x="-36" y="-50" width="72" height="38" rx="10" fill="${K.glass}" ${OL(3)}/><rect x="-34" y="30" width="68" height="30" rx="8" fill="${K.glass}" ${OL(3)}/><rect x="-40" y="-92" width="22" height="10" rx="4" fill="#FFE9A8"/><rect x="18" y="-92" width="22" height="10" rx="4" fill="#FFE9A8"/></g>`;
// speedometer
export function speedo(x, y, r, v, max = 100) {
  const a = (-130 + 260 * cl(v / max)) * Math.PI / 180;
  const ticks = [...Array(11)].map((_, i) => { const b = (-130 + 26 * i) * Math.PI / 180; return `<path d="M ${f1(x + Math.sin(b) * r * .74)} ${f1(y - Math.cos(b) * r * .74)} L ${f1(x + Math.sin(b) * r * .88)} ${f1(y - Math.cos(b) * r * .88)}" stroke="${K.white}" stroke-width="${i % 5 ? 5 : 9}" stroke-linecap="round"/>`; }).join('');
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="#22324A" ${OL(6)}/>${ticks}<path d="M ${x} ${y} L ${f1(x + Math.sin(a) * r * .8)} ${f1(y - Math.cos(a) * r * .8)}" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="20" fill="${K.white}"/>`;
}

// held mug: the hand grips the handle; returns { mug, hand } for a mug pose (bottom centre x, y, rotation deg, scale s)
export function heldMug(x, y, rot, s, o = {}) {
  const r = rot * Math.PI / 180, ox = 95 * s, oy = -65 * s;
  const hand = [x + ox * Math.cos(r) - oy * Math.sin(r), y + ox * Math.sin(r) + oy * Math.cos(r)];
  return { mug: mug(x, y, s, { ...o, rot }), hand };
}
// drinking motion for a bust at (bx, by, bs): reach (tA..tB) from rest hand to the mug on the table at (mx, my),
// lift (tB..tC) to the mouth, sip after tC; optional lower (tD..tE) back to the table. Returns { mug, hand, sip, reach }
export function sipMotion(t, bx, by, bs, mx, my, rest, tA, tB, tC, tD = 1e9, tE = 1e9, s = .8, o = {}) {
  const mouth = [bx + 20 * bs, by - 92 * bs + 30 * bs];
  // mug top-left (-75s, -140s) rotated -25° at the mouth
  const rr = -25 * Math.PI / 180, tlx = -75 * s, tly = -140 * s;
  const drink = [mouth[0] - (tlx * Math.cos(rr) - tly * Math.sin(rr)), mouth[1] - (tlx * Math.sin(rr) + tly * Math.cos(rr))];
  const up = eio(prog(t, tB, tC)) * (1 - eio(prog(t, tD, tE)));
  const px = lerp(mx, drink[0], up), py = lerp(my, drink[1], up) - Math.sin(up * Math.PI) * 30, rot = lerp(0, -25, up);
  const { mug: m, hand } = heldMug(px, py, rot, s, o);
  const a = eio(prog(t, tA, tB)), back = eio(prog(t, tE, tE + .5));
  const h = t < tB ? [lerp(rest[0], hand[0], a), lerp(rest[1], hand[1], a)] : t > tE ? [lerp(hand[0], rest[0], back), lerp(hand[1], rest[1], back)] : hand;
  return { mug: m, hand: h, sip: up > .95, up };
}
