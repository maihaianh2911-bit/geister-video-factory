// v68 sets: bright kitchen, open drinking glass, raw egg (shell → membrane), vinegar bottle.
import { K, OL, f1, TX, BG, cl, lerp, hash, eio, prog } from './lib.js';
export const C = { wall: '#F4EFE6', tile: '#E6EEF0', tileL: '#D2DEE2', counter: '#C99A6B', counterD: '#A97B4F', vin: '#F3E7B8', vinL: '#E9D98F',
  shell: '#F2E3CF', shellD: '#D9C2A3', mem: '#F6EBD9', white: '#FBF4E6', yolk: '#F2A93B', yolkD: '#D98A1E', water: '#9FD3E6' };
export const TY = 1150, FY = 1390, FS = 1.5;
// sky colour for the window: d 0 = day, .5 = evening, 1 = night
function skyCol(d) { return d < .5 ? mix('#BFE3F2', '#F5B979', d * 2) : mix('#F5B979', '#2D3A66', (d - .5) * 2); }
function mix(a, b, p) { const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16); const c = [16, 8, 0].map(s => Math.round(lerp((A >> s) & 255, (B >> s) & 255, cl(p)))); return '#' + c.map(v => v.toString(16).padStart(2, '0')).join(''); }
export function kitchen(o = {}) {
  const d = o.night || 0, gy = o.gy ?? TY;
  let tiles = '';
  for (let r = 0; r < 4; r++) for (let c = -1; c < 12; c++) tiles += `<rect x="${c * 100 + (r % 2) * 50}" y="${gy - 300 + r * 70}" width="100" height="70" fill="${C.tile}" stroke="${C.tileL}" stroke-width="4"/>`;
  const sun = d < .7 ? `<circle cx="${f1(lerp(860, 700, d))}" cy="${f1(lerp(330, 520, d))}" r="44" fill="#FFD66B" ${OL(5)}/>` : `<circle cx="760" cy="330" r="34" fill="#F4EFC8" ${OL(5)}/>`;
  const dim = d > .5 ? `<rect x="-60" y="-60" width="1200" height="2040" fill="#1B2140" opacity="${f1((d - .5) * .5)}"/>` : '';
  return `${BG(C.wall)}
  <g><rect x="580" y="200" width="380" height="460" rx="10" fill="${skyCol(d)}"/>${sun}<rect x="580" y="200" width="380" height="460" rx="10" fill="none" ${OL(8)}/>
  <path d="M 770 200 V 660 M 580 430 H 960" ${OL(8)}/><rect x="560" y="660" width="420" height="26" rx="6" fill="${C.counter}" ${OL(6)}/></g>
  ${tiles}<path d="M -60 ${gy - 300} H 1140" ${OL(5)}/>
  <rect x="-60" y="${gy}" width="1200" height="${2000 - gy}" fill="${C.counter}"/><path d="M -60 ${gy} H 1140" ${OL(8)}/>
  <rect x="-60" y="${gy + 30}" width="1200" height="170" fill="${C.counterD}" opacity=".35"/>
  <rect x="-60" y="${gy + 200}" width="1200" height="${1800 - gy}" fill="#E3D6C2"/><path d="M -60 ${gy + 200} H 1140" ${OL(6)}/>${o.extra || ''}${dim}`;
}
// egg path centred at (0,0): rx half-width, ry half-height, narrower at the top
export const eggD = (rx, ry) => `M 0 ${-ry} C ${f1(rx * .78)} ${-ry} ${rx} ${f1(-ry * .2)} ${rx} ${f1(ry * .22)} C ${rx} ${f1(ry * .78)} ${f1(rx * .55)} ${ry} 0 ${ry} C ${f1(-rx * .55)} ${ry} ${-rx} ${f1(ry * .78)} ${-rx} ${f1(ry * .22)} C ${-rx} ${f1(-ry * .2)} ${f1(-rx * .78)} ${-ry} 0 ${-ry} Z`;
// egg at (x,y): o.shell 1 = opaque shell, 0 = bare membrane; o.glow lamp behind (0..1); o.dent 0..1 finger dent; o.grow size factor; o.w line width
export function egg(x, y, s = 1, o = {}) {
  const sh = cl(o.shell ?? 1), g = o.grow || 1, rx = 48 * g, ry = 60 * g, lw = (o.w || 6) / s, id = o.id || 'e';
  const dent = o.dent || 0;
  const rr = rx * (1 - .16 * dent), body = dent > 0 ? `M 0 ${-ry} C ${f1(rr * .78)} ${-ry} ${f1(rr)} ${f1(-ry * .2)} ${f1(rr)} ${f1(ry * .22)} C ${f1(rr)} ${f1(ry * .78)} ${f1(rr * .55)} ${ry} 0 ${ry} C ${f1(-rx * .55)} ${ry} ${-rx} ${f1(ry * .78)} ${-rx} ${f1(ry * .22)} C ${-rx} ${f1(-ry * .2)} ${f1(-rx * .78)} ${-ry} 0 ${-ry} Z` : eggD(rx, ry);
  const memCol = o.glow ? lerp(0, 1, o.glow) : 0;
  const inner = `<ellipse cx="0" cy="${f1(ry * .18)}" rx="${f1(rx * .5)}" ry="${f1(ry * .42)}" fill="${o.glow ? C.yolkD : C.yolk}" opacity="${f1((1 - sh) * (o.glow ? .9 : .38))}"/>`;
  const glow = o.glow ? `<path d="${body}" fill="#FFE7A8" opacity="${f1(o.glow * .9)}"/>` : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s.toFixed(4)}) rotate(${o.rot || 0})">
    <defs><clipPath id="${id}c"><path d="${body}"/></clipPath></defs>
    <path d="${body}" fill="${C.mem}"/>${glow}<g clip-path="url(#${id}c)">${inner}
    <path d="${body}" fill="${C.shell}" opacity="${f1(sh)}"/>${sh > .05 ? `<ellipse cx="${f1(-rx * .35)}" cy="${f1(-ry * .4)}" rx="${f1(rx * .16)}" ry="${f1(ry * .22)}" fill="#FFFFFF" opacity="${f1(.6 * sh)}"/>` : `<ellipse cx="${f1(-rx * .35)}" cy="${f1(-ry * .45)}" rx="${f1(rx * .14)}" ry="${f1(ry * .18)}" fill="#FFFFFF" opacity=".7"/>`}
    ${o.inner || ''}</g>
    <path d="${body}" fill="none" ${OL(lw)}/>${o.over || ''}</g>`;
}
// open drinking glass, bottom centre (x,y): o.level 0..1 vinegar height, o.inner drawn (egg/bubbles) in local coords
export const GL = { w: 78, h: 240 };
export function glass(x, y, s = 1, o = {}) {
  const { w, h } = GL, lev = (o.level ?? 0) * (h - 22), id = o.id || 'g', lw = (o.lw || 7) / s;
  const shape = `M ${-w} ${-h} L ${-w + 8} -6 Q ${-w + 9} 0 ${-w + 18} 0 L ${w - 18} 0 Q ${w - 9} 0 ${w - 8} -6 L ${w} ${-h} Z`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s.toFixed(4)})">
    <defs><clipPath id="${id}c"><path d="${shape}"/></clipPath></defs>
    <path d="${shape}" fill="#EEF6F8" opacity=".9"/>
    <g clip-path="url(#${id}c)">${o.under || ''}${lev > 0 ? `<rect x="${-w - 5}" y="${f1(-lev - 8)}" width="${2 * w + 10}" height="${f1(lev + 20)}" fill="${o.liquid || C.vin}" opacity=".78"/><path d="M ${-w} ${f1(-lev - 8)} H ${w}" stroke="${C.vinL}" stroke-width="${f1(5 / s * 1.5)}"/>` : ''}${o.inner || ''}
    <rect x="${-w + 12}" y="${-h + 16}" width="10" height="${h - 40}" rx="5" fill="#FFFFFF" opacity=".7"/></g>
    <path d="${shape}" fill="none" ${OL(lw)}/><path d="M ${-w + 18} -14 H ${w - 18}" stroke="${K.ink}" stroke-width="${f1(3 / s * 1.4)}" opacity=".3"/>${o.over || ''}</g>`;
}
// vinegar bottle (bottom centre), label ESSIG; o.rot pouring tilt about the bottom-centre
export function vinegar(x, y, s = 1, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${o.rot || 0}) scale(${s})">
    <path d="M -46 0 L -46 -190 Q -46 -230 -16 -250 L -16 -300 L 16 -300 L 16 -250 Q 46 -230 46 -190 L 46 0 Z" fill="${C.vin}" ${OL(6)}/>
    <rect x="-20" y="-322" width="40" height="24" rx="5" fill="${K.teal}" ${OL(5)}/>
    <rect x="-46" y="-160" width="92" height="74" fill="${K.white}" ${OL(5)}/>${TX('ESSIG', 0, -112, 22, K.ink)}</g>`;
}
// small bubbles stuck to the egg surface (glass-local coords around egg centre ex,ey); a appear 0..1
export function shellBubbles(ex, ey, rx, ry, a, t, n = 22, seed = 1, r0 = 4) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const ang = hash(i * 3.7 + seed) * Math.PI * 2, k = cl(a * 1.6 - hash(i * 2.9 + seed) * .6);
    if (k <= 0) continue;
    const bx = ex + Math.cos(ang) * (rx + 2), by = ey + Math.sin(ang) * (ry + 2) * (Math.sin(ang) < 0 ? 1 : .9) + ry * .1;
    s += `<circle cx="${f1(bx)}" cy="${f1(by)}" r="${f1(r0 * k * (.7 + .6 * hash(i * 1.3 + seed)))}" fill="#FFFFFF" fill-opacity=".55" stroke="${K.ink}" stroke-width="${f1(r0 * .35)}"/>`;
  }
  return s;
}
// detaching bubbles rising from the egg up to the surface yTop (local coords)
export function rising(ex, ey, rx, ry, yTop, t, t0, o = {}) {
  const n = o.n || 14, sp = o.speed || 90, seed = o.seed || 5, r0 = o.r || 4;
  let s = '';
  for (let i = 0; i < n; i++) {
    const per = (ey - yTop) / sp, ph = ((t - t0) / per + hash(i * 4.1 + seed)) % 1;
    if (t < t0 + hash(i * 4.1 + seed) * .4) continue;
    const ang = -Math.PI / 2 + (hash(i * 2.3 + seed) - .5) * 2.2, bx0 = ex + Math.cos(ang) * rx, by0 = ey + Math.sin(ang) * ry;
    const y = lerp(by0, yTop, ph), x = bx0 + Math.sin(ph * 7 + i) * 3;
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r0 * (.8 + .5 * hash(i)))}" fill="#FFFFFF" fill-opacity=".55" stroke="${K.ink}" stroke-width="${f1(r0 * .35)}"/>`;
  }
  return s;
}
export { mix };

export const CGX = 540, CGY = 1380, CS = 3, EY = -64;
export function closeBG(o = {}) { return kitchen({ gy: 1380, ...o }); }
