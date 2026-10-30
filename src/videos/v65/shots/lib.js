// v65 "Ohne Stechmücken?" — kit for this video only (style: jobs/v65/style.md).
// Channel 4 look: indigo night/dusk gradients, warm window light, cyan data lines, thin 3–4 px outlines, soft glow.
// Mosquito drawn side-on facing right; male = feathery antennae, female = thin antennae.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  n0: '#0B1026', n1: '#1B2A5A', n2: '#2C3F7A', ink: '#0A0F22', line: '#C9D4FF',
  sun: '#FF8A3D', sunL: '#FFB27A', warm: '#FFD58A', cyan: '#4FD1E8', cyanD: '#2A8FA6', star: '#F2F5FF', red: '#FF5A5F',
  skin: '#F0C09A', skinD: '#C98F6B', hair: '#3A2A22', shirt: '#E07A3C', shirtD: '#B85E2A',
  wall: '#26345F', wallL: '#33467A', wood: '#7A5236', woodD: '#5A3C27', sheet: '#DDE4F5', sheetD: '#A9B5D6',
  grass: '#2E5A4A', grassD: '#1F4136', reed: '#5E8A55', water: '#2A6F86', waterD: '#123C55', waterL: '#7FC6D6',
  mos: '#2A2C3E', mosL: '#59607E', wing: '#DDEBFF', leaf: '#4E9A62', leafD: '#2F6B44', petal: '#F4E6FF', nectar: '#FFE07A',
  fish: '#E39A4B', fishD: '#B86F2A', bird: '#4A5C9E', birdL: '#E9EDF7', dfly: '#3FB6A8', pollen: '#FFD23F',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 4, c = K.ink) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const TI = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:600;font-style:italic;font-size:${sz}px">${s}</text>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const R = (x, y, w, h, f, ex = '') => `<rect x="${f1(x)}" y="${f1(y)}" width="${f1(w)}" height="${f1(h)}" fill="${f}" ${ex}/>`;

export const DEFS = `<defs>
<linearGradient id="mNight" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1026"/><stop offset="1" stop-color="#1B2A5A"/></linearGradient>
<linearGradient id="mDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#141C46"/><stop offset=".55" stop-color="#3A3F7A"/><stop offset=".85" stop-color="#C7708A"/><stop offset="1" stop-color="#FF9A5A"/></linearGradient>
<linearGradient id="mMorn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFE3B8"/><stop offset="1" stop-color="#F6C28C"/></linearGradient>
<linearGradient id="mWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2E7E95"/><stop offset="1" stop-color="#0E2E45"/></linearGradient>
<linearGradient id="mData" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1026"/><stop offset="1" stop-color="#1B2A5A"/></linearGradient>
<radialGradient id="mLamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD58A" stop-opacity=".85"/><stop offset="1" stop-color="#FFD58A" stop-opacity="0"/></radialGradient>
<radialGradient id="mCyan" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#4FD1E8" stop-opacity=".55"/><stop offset="1" stop-color="#4FD1E8" stop-opacity="0"/></radialGradient>
<radialGradient id="mVig" cx=".5" cy=".45" r=".75"><stop offset=".62" stop-color="#05081A" stop-opacity="0"/><stop offset="1" stop-color="#05081A" stop-opacity=".55"/></radialGradient>
<filter id="mGlow" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="6"/></filter>
</defs>`;

export const BG = (fill) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${fill}"/>`;
export const vig = (a = 1) => `<rect x="-60" y="-60" width="1200" height="2040" fill="url(#mVig)" opacity="${a}"/>`;
export function stars(n = 40, seed = 1, y1 = 900, a = 1) {
  let s = '';
  for (let i = 0; i < n; i++) s += `<circle cx="${f1(hash(i * 3.7 + seed) * 1080)}" cy="${f1(hash(i * 5.1 + seed * 2) * y1)}" r="${f1(1.5 + hash(i + seed) * 2.5)}" fill="${K.star}" opacity="${f1((.35 + .5 * hash(i * 9 + seed)) * a)}"/>`;
  return s;
}

// keyword card (channel style: bold coloured keyword + optional small italic line)
export function kcard(x, y, word, a = 1, o = {}) {
  if (a <= .01) return '';
  const sz = o.sz || 72, w = o.w || Math.max(word.length * sz * .68 + 90, o.sub ? o.sub.length * sz * .3 + 60 : 0), h = o.sub ? sz * 2.1 : sz * 1.45;
  const sc = lerp(.85, 1, eout(cl(a)));
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(sc)})" opacity="${f1(cl(a))}">
    <rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="18" fill="${K.n0}" fill-opacity=".86" stroke="${o.col || K.cyan}" stroke-width="4"/>
    ${TX(word, 0, o.sub ? -sz * .12 : sz * .36, sz, o.col || K.cyan)}
    ${o.sub ? TI(o.sub, 0, sz * .66, sz * .42, K.star) : ''}</g>`;
}
// small label chip
export function chip(x, y, txt, a = 1, col = K.star, sz = 40) {
  if (a <= .01) return '';
  const w = txt.length * sz * .64 + 44, h = sz * 1.5;
  return `<g transform="translate(${f1(x)} ${f1(y)})" opacity="${f1(cl(a))}"><rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(h / 2)}" fill="${K.n0}" fill-opacity=".8" stroke="${col}" stroke-width="3"/>${TX(txt, 0, sz * .36, sz, col)}</g>`;
}

// ---------------- mosquito ----------------
// side view facing right, origin at the thorax. o: t (wing beat), ang (deg), male, alpha, pollen ('head'|'eye'), sip (proboscis down 0..1), wings (0 = folded)
export function mosquito(x, y, s, o = {}) {
  const t = o.t || 0, flap = o.wings === 0 ? 0 : Math.sin(t * 90), al = o.alpha ?? 1;
  const pr = o.sip ? lerp(-18, 55, o.sip) : 25;
  const pa = pr * Math.PI / 180;
  const ant = o.male
    ? [0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M ${f1(52 + i * 6)} ${f1(-26 - i * 7)} l ${f1(-10 + i)} -14 M ${f1(52 + i * 6)} ${f1(-26 - i * 7)} l 14 -6" stroke="${K.line}" stroke-width="2"/>`).join('')
    : '';
  const legs = [[-6, 1], [4, 1.1], [14, 1.2]].map(([lx, k], i) => `<path d="M ${lx} 8 L ${f1(lx - 30 + i * 22)} ${f1(46 * k)} L ${f1(lx - 54 + i * 40)} ${f1(96 * k)}" fill="none" stroke="${o.legCol || K.line}" stroke-width="2.5"/>`).join('');
  const wing = (dy, sc) => `<ellipse cx="-34" cy="${f1(-22 - dy)}" rx="58" ry="${f1(14 * sc)}" transform="rotate(${f1(-14 - 26 * flap * sc)} 0 -14)" fill="${K.wing}" fill-opacity=".35" stroke="${K.wing}" stroke-width="2" stroke-opacity=".8"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.ang || 0)}) scale(${f1(s * 100) / 100})" opacity="${f1(al)}">
    ${legs}
    <path d="M -10 4 Q -60 18 -118 44 Q -124 50 -116 54 Q -56 34 -4 16 Z" fill="${K.mos}" stroke="${K.line}" stroke-width="2.5"/>
    ${[0, 1, 2, 3].map(i => `<path d="M ${-28 - i * 22} ${f1(12 + i * 8)} l 4 ${f1(10 + i)}" stroke="${K.mosL}" stroke-width="3"/>`).join('')}
    <ellipse cx="6" cy="0" rx="26" ry="20" fill="${K.mos}" stroke="${K.line}" stroke-width="2.5"/>
    <circle cx="38" cy="-8" r="13" fill="${K.mos}" stroke="${K.line}" stroke-width="2.5"/>
    <circle cx="43" cy="-11" r="5" fill="${K.line}" opacity=".9"/>
    ${o.male ? `<path d="M 46 -18 L 92 -72" stroke="${K.line}" stroke-width="2.5"/>${ant}` : `<path d="M 46 -18 Q 70 -46 84 -70" fill="none" stroke="${K.line}" stroke-width="2.5"/>`}
    <path d="M 48 -4 L ${f1(48 + 70 * Math.cos(pa))} ${f1(-4 + 70 * Math.sin(pa))}" stroke="${K.line}" stroke-width="3"/>
    ${o.pollen ? `<g>${[0, 1, 2].map(i => `<ellipse cx="${40 + i * 4}" cy="${-12 + i * 3}" rx="7" ry="11" transform="rotate(${-30 + i * 20} ${40 + i * 4} ${-12 + i * 3})" fill="${K.pollen}" stroke="${K.ink}" stroke-width="1.5"/>`).join('')}</g>` : ''}
    ${wing(0, 1)}${wing(6, .8)}
  </g>`;
}
// larva hanging below the surface y0 (siphon touching it), head down
export function larva(x, y0, s, t, o = {}) {
  const w = Math.sin(t * 5 + x) * 6;
  let segs = '';
  for (let i = 0; i < 7; i++) segs += `<ellipse cx="${f1(w * i / 7)}" cy="${30 + i * 16}" rx="${f1(10 - i * .4)}" ry="10" fill="${o.ghost ? 'none' : '#4A5E5A'}" stroke="${o.ghost ? K.waterL : K.line}" stroke-width="2" ${o.ghost ? 'stroke-dasharray="5 5"' : ''}/>`;
  return `<g transform="translate(${f1(x)} ${f1(y0)}) scale(${f1(s)}) rotate(${f1(-14 + w)})" opacity="${f1(o.alpha ?? 1)}">
    <path d="M 0 0 L 0 26" stroke="${o.ghost ? K.waterL : K.line}" stroke-width="4" ${o.ghost ? 'stroke-dasharray="5 5"' : ''}/>${segs}
    <circle cx="${f1(w)}" cy="150" r="13" fill="${o.ghost ? 'none' : '#3B4B48'}" stroke="${o.ghost ? K.waterL : K.line}" stroke-width="2" ${o.ghost ? 'stroke-dasharray="5 5"' : ''}/>
    ${o.ghost ? '' : `<path d="M ${f1(w - 10)} 160 l -8 10 M ${f1(w + 10)} 160 l 8 10" stroke="${K.line}" stroke-width="2"/>`}</g>`;
}
// fish facing right, origin at the body centre; o.mouth 0..1
export function fish(x, y, s, o = {}) {
  const m = o.mouth || 0, tw = Math.sin((o.t || 0) * 9) * 10;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1((o.dir || 1) * s)} ${f1(s)}) rotate(${f1(o.ang || 0)})">
    <path d="M -70 0 L ${f1(-130)} ${f1(-36 + tw)} L ${f1(-126)} ${f1(36 + tw)} Z" fill="${K.fishD}" ${OL(3)}/>
    <path d="M 80 ${f1(-8 * m)} Q 40 -56 -40 -40 Q -86 -22 -80 0 Q -86 22 -40 40 Q 40 56 80 ${f1(8 + 10 * m)} L ${f1(64 - 20 * m)} 0 Z" fill="${K.fish}" ${OL(3)}/>
    <path d="M -10 -44 Q 10 -70 40 -46" fill="${K.fishD}" ${OL(3)}/>
    <path d="M 10 -30 Q 0 0 10 30" fill="none" stroke="${K.fishD}" stroke-width="4"/>
    <circle cx="50" cy="-14" r="9" fill="${K.star}" ${OL(2)}/><circle cx="53" cy="-14" r="4" fill="${K.ink}"/></g>`;
}
// swallow facing right; o.flap phase, o.beak 0..1 open
export function swallow(x, y, s, o = {}) {
  const f = Math.sin((o.t || 0) * 14);
  const b = o.beak || 0;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)}) rotate(${f1(o.ang || 0)})">
    <path d="M -60 0 L -150 -30 L -112 0 L -150 24 Z" fill="${K.bird}" ${OL(3, K.line)}/>
    <path d="M -20 -6 Q -40 ${f1(-70 - 50 * f)} ${f1(-140)} ${f1(-100 - 70 * f)} Q -60 -30 10 -8 Z" fill="${K.bird}" ${OL(3, K.line)}/>
    <path d="M -70 0 Q -20 -36 50 -16 Q 78 -6 80 0 Q 50 22 -20 18 Q -60 14 -70 0 Z" fill="${K.bird}" ${OL(3, K.line)}/>
    <path d="M -40 12 Q 10 26 60 8" fill="none" stroke="${K.birdL}" stroke-width="10" stroke-linecap="round"/>
    <path d="M 74 -4 L ${f1(104)} ${f1(-4 - 8 * b)} L 76 2 L ${f1(102)} ${f1(6 + 8 * b)} L 74 6 Z" fill="#E7B04A" ${OL(2)}/>
    <circle cx="56" cy="-8" r="5" fill="${K.star}"/><circle cx="57" cy="-8" r="2.5" fill="${K.ink}"/>
    <path d="M -10 -4 Q -30 ${f1(-40 - 30 * f)} ${f1(-80)} ${f1(-60 - 40 * f)}" fill="none" stroke="${K.birdL}" stroke-width="3" opacity=".5"/></g>`;
}
// dragonfly facing right
export function dragonfly(x, y, s, o = {}) {
  const f = Math.sin((o.t || 0) * 70);
  const w = (dx, dy, r) => `<ellipse cx="${dx}" cy="${f1(dy)}" rx="70" ry="14" transform="rotate(${f1(r)} 0 0)" fill="${K.wing}" fill-opacity=".3" stroke="${K.wing}" stroke-width="2"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)}) rotate(${f1(o.ang || 0)})">
    ${w(-20, -30, -20 + 18 * f)}${w(-20, -30, 200 - 18 * f)}${w(10, -26, -40 + 18 * f)}${w(10, -26, 220 - 18 * f)}
    <path d="M -10 0 L -180 6 L -182 -2 L -12 -8 Z" fill="${K.dfly}" ${OL(2, K.line)}/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M ${-40 - i * 24} -6 v 10" stroke="${K.ink}" stroke-width="2"/>`).join('')}
    <ellipse cx="10" cy="-4" rx="24" ry="14" fill="${K.dfly}" ${OL(2, K.line)}/>
    <circle cx="40" cy="-8" r="14" fill="#2C7C74" ${OL(2, K.line)}/><circle cx="46" cy="-12" r="6" fill="${K.star}" opacity=".8"/>
    ${o.grab ? `<path d="M 30 6 L 56 26 M 20 8 L 40 30" stroke="${K.line}" stroke-width="3"/>` : `<path d="M 20 8 L 10 30 M 30 6 L 26 30" stroke="${K.line}" stroke-width="2.5"/>`}</g>`;
}
// garden flower (umbel of small white florets) — stem from (x, yBase) to (x, yTop)
export function flower(x, yBase, yTop, s = 1, o = {}) {
  const sw = Math.sin((o.t || 0) * 1.6 + x) * 6;
  let fl = '';
  for (let i = 0; i < 9; i++) { const a = -Math.PI * .9 + i / 8 * Math.PI * .8; fl += `<circle cx="${f1(Math.cos(a) * 58 * s)}" cy="${f1(Math.sin(a) * 26 * s + 10)}" r="${f1(15 * s)}" fill="${o.col || K.petal}" ${OL(2)}/><circle cx="${f1(Math.cos(a) * 58 * s)}" cy="${f1(Math.sin(a) * 26 * s + 10)}" r="${f1(4 * s)}" fill="${K.nectar}"/>`; }
  return `<g><path d="M ${x} ${yBase} Q ${f1(x + sw)} ${f1((yBase + yTop) / 2)} ${f1(x + sw)} ${yTop}" fill="none" stroke="${K.leafD}" stroke-width="${f1(8 * s)}"/>
    <path d="M ${x} ${f1(yBase - (yBase - yTop) * .4)} q -60 -30 -90 -10 q 40 30 90 10" fill="${K.leaf}" ${OL(2)}/>
    <g transform="translate(${f1(x + sw)} ${yTop})">${fl}</g></g>`;
}
// small bog orchid: green spike of tiny flowers
export function orchid(x, yBase, s = 1, o = {}) {
  let fl = '';
  for (let i = 0; i < 7; i++) {
    const yy = -200 - i * 46, side = i % 2 ? 1 : -1;
    fl += `<g transform="translate(${side * 18} ${yy}) scale(${side} 1)"><path d="M 0 0 q 26 -20 40 -6 q -10 14 -40 6 Z" fill="#A8D18A" ${OL(2)}/><path d="M 4 4 q 18 16 8 40" fill="none" stroke="#C9E8A8" stroke-width="5" stroke-linecap="round"/><path d="M 6 -2 q 4 -22 22 -26" fill="none" stroke="#7FB46A" stroke-width="4"/></g>`;
  }
  return `<g transform="translate(${f1(x)} ${f1(yBase)}) scale(${f1(s)})">
    <path d="M 0 0 L 0 -520" stroke="#5C8F4E" stroke-width="10"/>
    <path d="M 0 -10 Q -120 -40 -150 -120 Q -60 -90 0 -40 Z" fill="${K.leaf}" ${OL(3)}/>${fl}</g>`;
}
// simple person bust/figure parts
export function head(x, y, s, o = {}) {
  const lk = (o.look || 0) * 6;
  const eyes = o.sleep ? `<path d="M -22 2 q 8 6 16 0 M 8 2 q 8 6 16 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`
    : `<circle cx="${-15 + lk}" cy="0" r="5" fill="${K.ink}"/><circle cx="${15 + lk}" cy="0" r="5" fill="${K.ink}"/>`;
  const mouth = o.mouth === 'o' ? `<ellipse cx="${lk}" cy="26" rx="7" ry="9" fill="${K.ink}"/>` : o.mouth === 'down' ? `<path d="M -12 30 q 12 -8 24 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : `<path d="M -12 24 q 12 9 24 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s)})">
    <ellipse cx="0" cy="0" rx="54" ry="60" fill="${o.pale ? '#E9B9A4' : K.skin}" ${OL(4)}/>
    <path d="M -56 -6 Q -60 -70 0 -70 Q 58 -72 56 -10 Q 30 -40 -20 -36 Q -40 -30 -56 -6 Z" fill="${K.hair}" ${OL(4)}/>
    <ellipse cx="-56" cy="6" rx="9" ry="14" fill="${K.skinD}" ${OL(3)}/>
    ${eyes}${mouth}${o.sweat ? `<path d="M 40 -20 q 8 14 0 20 q -8 -6 0 -20 Z" fill="${K.waterL}"/>` : ''}</g>`;
}
// arm segment helper: thick rounded stroke with outline
export const limb = (pts, w, col) => { const d = 'M ' + pts.map(p => `${f1(p[0])} ${f1(p[1])}`).join(' L '); return `<path d="${d}" fill="none" stroke="${K.ink}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`; };
export const handC = (x, y, r = 20) => `<circle cx="${f1(x)}" cy="${f1(y)}" r="${r}" fill="${K.skin}" ${OL(3)}/>`;

// gabled German house front at night (centre x, ground y); win: window open 0..1 (left upper)
export function house(x, y, s, o = {}) {
  const op = o.win || 0;
  const lit = (wx, wy, on) => `<rect x="${wx}" y="${wy}" width="110" height="140" fill="${on ? K.warm : '#1A2244'}" ${OL(4)}/>${on ? `<rect x="${wx - 40}" y="${wy - 40}" width="190" height="220" fill="url(#mLamp)" opacity=".5"/>` : ''}<path d="M ${wx + 55} ${wy} v 140 M ${wx} ${wy + 60} h 110" stroke="${K.ink}" stroke-width="4"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">
    <path d="M -300 0 L -300 -520 L 0 -800 L 300 -520 L 300 0 Z" fill="#3A3F66" ${OL(5)}/>
    <path d="M -340 -500 L 0 -830 L 340 -500" fill="none" stroke="#5A2E2E" stroke-width="34" stroke-linejoin="round"/>
    ${[[-200, -440], [90, -440], [-200, -230], [90, -230]].map(([wx, wy], i) => i === 0 ? '' : lit(wx, wy, i === 2)).join('')}
    <rect x="-200" y="-440" width="110" height="140" fill="${op > 0 ? K.warm : '#1A2244'}" ${OL(4)}/>
    ${op > 0 ? `<rect x="-240" y="-480" width="190" height="220" fill="url(#mLamp)" opacity="${f1(.7 * op)}"/>` : ''}
    <path d="M -200 -440 L ${f1(-200 - 70 * op)} ${f1(-430)} L ${f1(-200 - 70 * op)} ${f1(-310)} L -200 -300 Z" fill="${op > 0 ? '#9FB3E0' : '#1A2244'}" fill-opacity=".8" ${OL(4)}/>
    <path d="M -90 -440 L ${f1(-90 + 30 * op)} -432 L ${f1(-90 + 30 * op)} -308 L -90 -300 Z" fill="#9FB3E0" fill-opacity=".6" ${OL(3)}/>
    <rect x="-40" y="-170" width="90" height="170" fill="${K.woodD}" ${OL(4)}/><circle cx="35" cy="-85" r="6" fill="${K.warm}"/></g>`;
}
// node of a food-web diagram
export function node(x, y, r, inner, a = 1, o = {}) {
  if (a <= .01) return '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(lerp(.6, 1, eout(cl(a))))})" opacity="${f1(cl(a) * (o.dim ?? 1))}">
    <circle r="${r + 16}" fill="url(#mCyan)" opacity="${o.glow ?? .6}"/>
    <circle r="${r}" fill="${K.n0}" stroke="${o.col || K.cyan}" stroke-width="4" ${o.dash ? 'stroke-dasharray="10 8"' : ''}/>
    <g>${inner}</g>${o.label ? TX(o.label, 0, r + 50, 34, o.col || K.star) : ''}</g>`;
}
export function link(x1, y1, x2, y2, p = 1, o = {}) {
  if (p <= 0) return '';
  const len = Math.hypot(x2 - x1, y2 - y1);
  return `<path d="M ${f1(x1)} ${f1(y1)} L ${f1(x2)} ${f1(y2)}" stroke="${o.col || K.cyan}" stroke-width="${o.w || 5}" stroke-linecap="round" opacity="${f1(o.a ?? .85)}" ${o.dash ? `stroke-dasharray="12 12"` : `stroke-dasharray="${f1(len * p)} ${f1(len)}"`}/>`;
}
// small icons for the diagram (centered at 0,0, fits r≈60)
export const ic = {
  mos: (t, o = {}) => mosquito(10, 6, .68, { t, ...o }),
  fish: t => fish(4, 0, .6, { t }),
  bird: t => swallow(14, 6, .52, { t }),
  dfly: t => dragonfly(20, 8, .42, { t }),
  orchid: () => `<g transform="scale(.24) translate(0 280)">${orchid(0, 0, 1)}</g>`,
  flea: () => `<g><ellipse cx="0" cy="0" rx="22" ry="28" fill="#C7A27A" ${OL(2)}/><path d="M -6 -26 l -18 -20 M 6 -26 l 18 -20" stroke="${K.line}" stroke-width="3"/><circle cx="6" cy="-10" r="4" fill="${K.ink}"/></g>`,
  fly: () => `<g><ellipse cx="0" cy="4" rx="24" ry="16" fill="#3E4A40" ${OL(2, K.line)}/><circle cx="22" cy="0" r="10" fill="#7A2F2F" ${OL(2, K.line)}/><ellipse cx="-6" cy="-14" rx="20" ry="9" fill="${K.wing}" fill-opacity=".5" stroke="${K.wing}" stroke-width="2"/></g>`,
  worm: () => `<path d="M -30 10 q 15 -24 30 0 q 15 24 30 0" fill="none" stroke="#D98B8B" stroke-width="12" stroke-linecap="round"/>`,
  beetle: () => `<g><ellipse cx="0" cy="0" rx="22" ry="30" fill="#2E3A2A" ${OL(2, K.line)}/><path d="M 0 -30 v 60" stroke="${K.line}" stroke-width="2"/><circle cx="0" cy="-34" r="10" fill="#2E3A2A" ${OL(2, K.line)}/></g>`,
};
