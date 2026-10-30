// v66 "Ohne Kühlschrank" — kit for this video only (style: jobs/v66/style.md).
// Channel 4 look adapted to one German kitchen: warm evening kitchen vs. indigo data scenes, cyan cold / orange heat,
// thin 4 px outlines. Germs are small green capsules; they never vanish in the fridge, they only slow down.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  n0: '#0B1026', n1: '#1B2A5A', ink: '#141A2E', line: '#C9D4FF',
  sun: '#FF8A3D', warm: '#FFD58A', cyan: '#4FD1E8', cold: '#9FE6F2', star: '#F2F5FF', red: '#FF5A5F', green: '#7BD389', germ: '#8FD16A', germD: '#4F8F3A',
  wall: '#E9D8BE', wallD: '#D6C0A0', tile: '#F2E8D8', floor: '#9C7656', floorD: '#7E5C40', counter: '#5E6E8C', counterT: '#C9CFDB', cab: '#7FA3B8', cabD: '#5E8296',
  skin: '#F0C09A', skinD: '#C98F6B', hair: '#3A2A22', shirt: '#3E7CB1', shirtD: '#2C5C86', pants: '#3A3F55',
  fridge: '#F2F5FA', fridgeD: '#C4CCDA', milk: '#FFFFFF', meat: '#D9646A', meatL: '#F2A0A0', yog: '#F7E3A1', paper: '#F4EAD6', wood: '#8A6244', woodD: '#5E4230', jar: '#BFE3E8', ice: '#CFF3FA',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 4, c = K.ink) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const BG = f => `<rect x="-60" y="-60" width="1200" height="2040" fill="${f}"/>`;
export const DEFS = `<defs>
<linearGradient id="kData" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1026"/><stop offset="1" stop-color="#1B2A5A"/></linearGradient>
<linearGradient id="kWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#F1E2C8"/><stop offset="1" stop-color="#E0CAA8"/></linearGradient>
<linearGradient id="kOld" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5A4632"/><stop offset="1" stop-color="#3A2C20"/></linearGradient>
<linearGradient id="kCellar" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#4A5468"/><stop offset="1" stop-color="#2A3044"/></linearGradient>
<linearGradient id="kSun" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE3A8"/><stop offset="1" stop-color="#FFB86A"/></linearGradient>
<radialGradient id="kGlowC" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#4FD1E8" stop-opacity=".5"/><stop offset="1" stop-color="#4FD1E8" stop-opacity="0"/></radialGradient>
<radialGradient id="kGlowW" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FF8A3D" stop-opacity=".5"/><stop offset="1" stop-color="#FF8A3D" stop-opacity="0"/></radialGradient>
<radialGradient id="kVig" cx=".5" cy=".45" r=".75"><stop offset=".62" stop-color="#05081A" stop-opacity="0"/><stop offset="1" stop-color="#05081A" stop-opacity=".45"/></radialGradient>
</defs>`;
export const vig = (a = 1) => `<rect x="-60" y="-60" width="1200" height="2040" fill="url(#kVig)" opacity="${a}"/>`;

export function kcard(x, y, word, a = 1, o = {}) {
  if (a <= .01) return '';
  const sz = o.sz || 72, w = o.w || word.length * sz * .68 + 90, h = sz * 1.45;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(lerp(.85, 1, eout(cl(a))))}) rotate(${o.rot || 0})" opacity="${f1(cl(a))}">
    <rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="18" fill="${K.n0}" fill-opacity=".88" stroke="${o.col || K.cyan}" stroke-width="4"/>
    ${TX(word, 0, sz * .36, sz, o.col || K.cyan)}</g>`;
}
export function chip(x, y, txt, a = 1, col = K.star, sz = 40) {
  if (a <= .01) return '';
  const w = txt.length * sz * .64 + 44, h = sz * 1.5;
  return `<g transform="translate(${f1(x)} ${f1(y)})" opacity="${f1(cl(a))}"><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="${K.n0}" fill-opacity=".85" stroke="${col}" stroke-width="3"/>${TX(txt, 0, sz * .36, sz, col)}</g>`;
}
export const limb = (pts, w, col) => { const d = 'M ' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L '); return `<path d="${d}" fill="none" stroke="${K.ink}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`; };
export const handC = (x, y, r = 20) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${K.skin}" ${OL(3)}/>`;
export function head(x, y, s, o = {}) {
  const lk = (o.look || 0) * 7;
  const eyes = `<circle cx="${-15 + lk}" cy="${o.lookY || 0}" r="5.5" fill="${K.ink}"/><circle cx="${15 + lk}" cy="${o.lookY || 0}" r="5.5" fill="${K.ink}"/>`;
  const br = o.brow ? `<path d="M ${-26 + lk} -18 l 18 ${o.brow > 0 ? -5 : 5} M ${26 + lk} -18 l -18 ${o.brow > 0 ? -5 : 5}" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : '';
  const mouth = o.mouth === 'o' ? `<ellipse cx="${lk}" cy="26" rx="7" ry="9" fill="${K.ink}"/>` : o.mouth === 'flat' ? `<path d="M ${lk - 11} 26 h 22" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : o.mouth === 'down' ? `<path d="M ${lk - 12} 30 q 12 -8 24 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : `<path d="M ${lk - 12} 24 q 12 9 24 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s)})">
    <ellipse cx="0" cy="0" rx="54" ry="60" fill="${K.skin}" ${OL(4)}/>
    <path d="M -56 -6 Q -60 -70 0 -70 Q 58 -72 56 -10 Q 30 -40 -20 -36 Q -40 -30 -56 -6 Z" fill="${K.hair}" ${OL(4)}/>
    <ellipse cx="${o.dir === -1 ? 56 : -56}" cy="6" rx="9" ry="14" fill="${K.skinD}" ${OL(3)}/>${eyes}${br}${mouth}
    <path d="M ${lk + 3} 4 q 6 8 -2 12" fill="none" stroke="${K.skinD}" stroke-width="4" stroke-linecap="round"/></g>`;
}
// standing person (feet origin). o: aR/aL as [[elbow],[hand]] absolute offsets, walk phase, dir
export function person(x, y, s, o = {}) {
  const w = o.walk || 0, st = Math.sin(w) * 22;
  const sh = [x - 62 * s, y - 520 * s], shR = [x + 62 * s, y - 520 * s];
  const aL = o.aL || [[x - 90 * s, y - 400 * s], [x - 84 * s, y - 290 * s]], aR = o.aR || [[x + 90 * s, y - 400 * s], [x + 84 * s, y - 290 * s]];
  const legs = `${limb([[x - 26 * s, y - 300 * s], [x - (26 + st) * s, y - 150 * s], [x - (28 + st * 1.2) * s, y - 14 * s]], 40 * s, K.pants)}${limb([[x + 26 * s, y - 300 * s], [x + (26 + st) * s, y - 150 * s], [x + (28 + st * 1.2) * s, y - 14 * s]], 40 * s, K.pants)}
    <ellipse cx="${f1(x - (28 + st * 1.2) * s + 10 * s)}" cy="${f1(y - 6 * s)}" rx="${f1(34 * s)}" ry="${f1(13 * s)}" fill="${K.ink}"/><ellipse cx="${f1(x + (28 + st * 1.2) * s + 10 * s)}" cy="${f1(y - 6 * s)}" rx="${f1(34 * s)}" ry="${f1(13 * s)}" fill="${K.ink}"/>`;
  const torso = `<path d="M ${f1(x - 74 * s)} ${f1(y - 520 * s)} Q ${f1(x - 82 * s)} ${f1(y - 400 * s)} ${f1(x - 68 * s)} ${f1(y - 290 * s)} L ${f1(x + 68 * s)} ${f1(y - 290 * s)} Q ${f1(x + 82 * s)} ${f1(y - 400 * s)} ${f1(x + 74 * s)} ${f1(y - 520 * s)} Q ${x} ${f1(y - 548 * s)} ${f1(x - 74 * s)} ${f1(y - 520 * s)} Z" fill="${K.shirt}" ${OL(4)}/>`;
  const arm = (s0, a) => `${limb([s0, a[0], a[1]], 34 * s, K.shirt)}${handC(a[1][0], a[1][1], 18 * s)}`;
  return { hL: aL[1], hR: aR[1], svg: `${legs}${o.back ? arm(sh, aL) : ''}${torso}${head(x, y - 600 * s, s, o.head || {})}${o.back ? '' : arm(sh, aL)}${arm(shR, aR)}` };
}
// germ capsule
export function germ(x, y, r, o = {}) {
  const a = o.ang || 0;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)})" opacity="${f1(o.alpha ?? 1)}"><rect x="${f1(-r * 1.6)}" y="${f1(-r)}" width="${f1(r * 3.2)}" height="${f1(r * 2)}" rx="${f1(r)}" fill="${o.bad ? '#D86A5A' : K.germ}" stroke="${o.bad ? '#8A2E26' : K.germD}" stroke-width="${f1(Math.max(2, r * .22))}"/>
    <circle cx="${f1(-r * .5)}" cy="${f1(-r * .2)}" r="${f1(r * .25)}" fill="#fff" opacity=".5"/></g>`;
}
// a colony that doubles: n germs placed deterministically around (cx, cy)
export function colony(cx, cy, n, r, t, o = {}) {
  let s = '';
  const sp = o.speed ?? 1;
  for (let i = 0; i < n; i++) { const a = hash(i * 3.1 + (o.seed || 0)) * 6.283, d = Math.sqrt(i / Math.max(1, n)) * (o.spread || 120); s += germ(cx + Math.cos(a) * d + 4 * Math.sin(t * 3 * sp + i), cy + Math.sin(a) * d * .7 + 3 * Math.cos(t * 2.6 * sp + i), r, { ang: hash(i) * 180 + t * 20 * sp, bad: o.bad && i % 3 === 0, alpha: o.alpha }); }
  return s;
}
// kitchen back wall with counter; o.fridge: 0..1 solid, o.ghost: dashed outline alpha
export function kitchen(t, o = {}) {
  const fr = o.fridge ?? 1, gh = o.ghost ?? 0, fx = o.fx ?? 700;
  let tiles = '';
  for (let r = 0; r < 5; r++) for (let c = 0; c < 9; c++) tiles += `<rect x="${c * 120 - 20}" y="${720 + r * 60}" width="118" height="58" fill="${K.tile}" stroke="${K.wallD}" stroke-width="2"/>`;
  const fridge = `<g opacity="${f1(fr)}"><rect x="${fx}" y="420" width="300" height="760" rx="26" fill="${K.fridge}" ${OL(5)}/><path d="M ${fx} 690 H ${fx + 300}" stroke="${K.fridgeD}" stroke-width="6"/>
    <rect x="${fx + 24}" y="470" width="14" height="140" rx="7" fill="${K.fridgeD}" ${OL(3)}/><rect x="${fx + 24}" y="730" width="14" height="200" rx="7" fill="${K.fridgeD}" ${OL(3)}/></g>`;
  const ghost = gh > 0 ? `<rect x="${fx}" y="420" width="300" height="760" rx="26" fill="none" stroke="${K.cyan}" stroke-width="6" stroke-dasharray="22 16" opacity="${f1(gh)}"/>` : '';
  return `${BG('url(#kWall)')}${tiles}
    <rect x="-60" y="240" width="680" height="220" fill="${K.cab}" ${OL(4)}/>${[0, 1, 2].map(i => `<path d="M ${i * 220 + 160} 240 v 220" stroke="${K.ink}" stroke-width="4"/>`).join('')}
    <rect x="-60" y="1000" width="${fx + 50}" height="40" fill="${K.counterT}" ${OL(4)}/><rect x="-60" y="1040" width="${fx + 50}" height="300" fill="${K.counter}" ${OL(4)}/>
    ${[0, 1, 2].map(i => `<rect x="${i * 230 - 20}" y="1070" width="200" height="240" rx="8" fill="none" stroke="#4A5874" stroke-width="5"/>`).join('')}
    <rect x="-60" y="1180" width="1200" height="800" fill="${K.floor}"/><rect x="-60" y="1340" width="1200" height="700" fill="${K.floorD}" opacity=".35"/>
    ${fridge}${ghost}`;
}
export const milk = (x, y, s = 1) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M -40 60 L -40 -40 L -20 -70 L 20 -70 L 40 -40 L 40 60 Z" fill="${K.milk}" ${OL(4)}/><path d="M -40 -40 H 40" stroke="${K.ink}" stroke-width="3"/><rect x="-30" y="-10" width="60" height="40" fill="${K.cyan}" opacity=".7"/></g>`;
export const meat = (x, y, s = 1) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><rect x="-70" y="-30" width="140" height="64" rx="10" fill="#E9EEF4" ${OL(4)}/><path d="M -58 -18 q 30 -16 60 0 q 30 16 56 0 L 58 22 L -58 22 Z" fill="${K.meat}" ${OL(3)}/><path d="M -40 0 q 12 -8 24 0 M 6 6 q 12 -8 24 0" fill="none" stroke="${K.meatL}" stroke-width="4"/></g>`;
export const yog = (x, y, s = 1) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M -36 -40 L 36 -40 L 28 40 L -28 40 Z" fill="${K.yog}" ${OL(4)}/><rect x="-40" y="-50" width="80" height="12" rx="4" fill="#E8EEF4" ${OL(3)}/></g>`;
export function bag(x, y, s = 1, inner = '') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">${inner}<path d="M -100 -60 L 100 -60 L 86 140 L -86 140 Z" fill="#C9A87A" ${OL(4)}/><path d="M -60 -60 q 0 -70 60 -70 q 60 0 60 70" fill="none" stroke="#8A6A44" stroke-width="10"/></g>`;
}
export function thermo(x, y, h, lvl, col = K.red, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)})"><rect x="-26" y="${-h}" width="52" height="${h}" rx="26" fill="#F2F5FF" ${OL(4)}/><rect x="-11" y="${f1(-h + 20 + (h - 40) * (1 - lvl))}" width="22" height="${f1((h - 40) * lvl + 20)}" fill="${col}"/><circle cx="0" cy="0" r="40" fill="${col}" ${OL(4)}/>${o.label ? TX(o.label, 0, 100, 40, o.labCol || K.star) : ''}</g>`;
}
export function cal(x, y, w, days, inner, a = 1) {
  const cw = w / days.length;
  return `<g opacity="${f1(a)}"><rect x="${x}" y="${y}" width="${w}" height="320" rx="20" fill="${K.paper}" ${OL(4)}/><rect x="${x}" y="${y}" width="${w}" height="70" rx="20" fill="${K.red}" ${OL(4)}/>
    ${days.map((d, i) => `${TX(d, x + cw * (i + .5), y + 50, 34, '#fff')}${i ? `<path d="M ${f1(x + cw * i)} ${y + 70} v 250" stroke="${K.wallD}" stroke-width="3"/>` : ''}`).join('')}${inner}</g>`;
}
export const arrow = (x1, y1, x2, y2, col, w = 10, a = 1) => { const ang = Math.atan2(y2 - y1, x2 - x1), hx = x2 - Math.cos(ang) * 30, hy = y2 - Math.sin(ang) * 30; return `<g opacity="${f1(a)}"><path d="M ${f1(x1)} ${f1(y1)} L ${f1(hx)} ${f1(hy)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M ${f1(x2)} ${f1(y2)} L ${f1(hx + Math.cos(ang + 1.9) * 26)} ${f1(hy + Math.sin(ang + 1.9) * 26)} L ${f1(hx + Math.cos(ang - 1.9) * 26)} ${f1(hy + Math.sin(ang - 1.9) * 26)} Z" fill="${col}"/></g>`; };
export const cross = (x, y, r, p, col = K.red) => p <= 0 ? '' : `<path d="M ${f1(x - r)} ${f1(y - r)} L ${f1(x - r + 2 * r * p)} ${f1(y - r + 2 * r * p)} M ${f1(x + r)} ${f1(y - r)} L ${f1(x + r - 2 * r * p)} ${f1(y - r + 2 * r * p)}" stroke="${col}" stroke-width="14" stroke-linecap="round"/>`;
export const pot = (x, y, s = 1, steam = 0, t = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M -150 -90 L 150 -90 L 136 90 Q 0 110 -136 90 Z" fill="#7C8AA6" ${OL(5)}/><rect x="-170" y="-110" width="340" height="30" rx="12" fill="#97A5C0" ${OL(4)}/><path d="M -170 -60 h -40 M 170 -60 h 40" stroke="${K.ink}" stroke-width="16" stroke-linecap="round"/>
  ${[0, 1, 2].map(i => `<path d="M ${-60 + i * 60} -130 q -20 -40 0 -80 q 20 -40 0 -80" fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="${f1(steam * (.5 + .3 * Math.sin(t * 3 + i)))}"/>`).join('')}</g>`;
