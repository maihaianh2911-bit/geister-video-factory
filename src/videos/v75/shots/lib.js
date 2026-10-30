// v75 "Was passiert, wenn das Internet für einen Tag ausfällt?" — kit for this video only (style: jobs/v75/style.md).
// Channel 4 look: indigo night gradient, soft glow, 3 px outlines; cyan = data/connection, orange = sun/warm light,
// red = no connection/error, green = still works. Power stays on: lights, fridge and screens keep glowing.
// Cast: du = green jacket, short dark-brown hair, glasses. Baker: white apron, cap.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  ink: '#0B1026', ind: '#141C3E', ind2: '#1B2A5A', ind3: '#2A3C78', sun: '#FF8A3D', sunL: '#FFC08A', data: '#4FD1E8', dataD: '#2A93A8', star: '#F2F5FF',
  red: '#FF5A6A', green: '#5FD38A', grey: '#7C86A8', greyL: '#B6BED8', skin: '#F0C3A0', skinD: '#C9946E', white: '#F2F5FF', screen: '#0F1838',
  du: '#3FB68B', duD: '#2A8566', hair: '#3A2418', wall: '#22305E', wall2: '#2C3D72', floor: '#18224A', wood: '#8A5A3C', woodL: '#B07A52', bread: '#E3A35A', breadD: '#B87A36',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 3) => `stroke="${K.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const BG = (f = 'url(#iSky)') => `<rect x="-60" y="-60" width="1200" height="2040" fill="${f}"/>`;
export const DEFS = `<defs><linearGradient id="iSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1026"/><stop offset="1" stop-color="#1B2A5A"/></linearGradient>
<radialGradient id="iGlow" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#4FD1E8" stop-opacity=".5"/><stop offset="1" stop-color="#4FD1E8" stop-opacity="0"/></radialGradient>
<radialGradient id="iWarm" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFC08A" stop-opacity=".6"/><stop offset="1" stop-color="#FF8A3D" stop-opacity="0"/></radialGradient>
<radialGradient id="iRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FF5A6A" stop-opacity=".45"/><stop offset="1" stop-color="#FF5A6A" stop-opacity="0"/></radialGradient></defs>`;
export const glow = (x, y, r, a = 1, id = 'iGlow') => a <= 0 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="url(#${id})" opacity="${f1(cl(a))}"/>`;
export const stars = (n = 40, seed = 1) => [...Array(n)].map((_, i) => `<circle cx="${f1(hash(i * 3.3 + seed) * 1080)}" cy="${f1(hash(i * 7.1 + seed) * 1100)}" r="${f1(1.5 + hash(i) * 2.5)}" fill="${K.star}" opacity="${f1(.3 + hash(i * 2) * .5)}"/>`).join('');
// big keyword card (channel 4): bold coloured word + small italic line
export const card = (x, y, word, sub, a = 1, col = K.data) => a <= .01 ? '' : `<g opacity="${f1(cl(a))}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(.9 + .1 * cl(a))})"><rect x="-430" y="-110" width="860" height="${sub ? 200 : 150}" rx="26" fill="${K.ink}" opacity=".88" stroke="${col}" stroke-width="4"/>${TX(word, 0, 0, 92, col)}${sub ? `<text x="0" y="66" text-anchor="middle" fill="${K.star}" style="font-family:'Inter';font-weight:600;font-style:italic;font-size:44px">${sub}</text>` : ''}</g>`;
export const label = (x, y, txt, a = 1, col = K.data, sz = 54) => a <= .01 ? '' : `<g opacity="${f1(cl(a))}"><rect x="${f1(x - (txt.length * sz * .34 + 30))}" y="${f1(y - sz * .88)}" width="${f1(txt.length * sz * .68 + 60)}" height="${f1(sz * 1.36)}" rx="${f1(sz * .3)}" fill="${K.ink}" stroke="${col}" stroke-width="4"/>${TX(txt, x, y + sz * .12, sz, col)}</g>`;
export const crossOut = (x, y, r, p) => p <= 0 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="none" stroke="${K.red}" stroke-width="14" opacity="${f1(cl(p * 2))}"/><path d="M ${f1(x - r * .7)} ${f1(y - r * .7)} L ${f1(x - r * .7 + r * 1.4 * cl(p))} ${f1(y - r * .7 + r * 1.4 * cl(p))}" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/>`;
export const tick = (x, y, s, p, col = K.green) => p <= 0 ? '' : `<path d="M ${f1(x - 40 * s)} ${f1(y)} L ${f1(x - 10 * s)} ${f1(y + 30 * s)} L ${f1(x + 46 * s)} ${f1(y - 36 * s)}" fill="none" stroke="${col}" stroke-width="${f1(16 * s)}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f1(160 * s)}" stroke-dashoffset="${f1(160 * s * (1 - cl(p)))}"/>`;
// wifi symbol; on 0..1 (cyan ↔ grey), struck red when off > .5
export function wifi(x, y, s, on = 1, o = {}) {
  const c = on > .5 ? K.data : K.grey;
  const arcs = [1, 2, 3].map(i => `<path d="M ${f1(-30 * i)} ${f1(-30 * i)} A ${f1(42 * i)} ${f1(42 * i)} 0 0 1 ${f1(30 * i)} ${f1(-30 * i)}" fill="none" stroke="${c}" stroke-width="12" stroke-linecap="round" opacity="${f1(on > .5 ? 1 : .6)}"/>`).join('');
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">${on > .5 ? `<circle r="140" fill="url(#iGlow)"/>` : ''}${arcs}<circle cx="0" cy="0" r="12" fill="${c}"/>${on <= .5 && !o.noX ? `<path d="M -70 -150 L 70 10" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/>` : ''}</g>`;
}
// loading spinner
export const spinner = (x, y, r, t, col = K.greyL) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1((t * 360) % 360)})"><circle r="${r}" fill="none" stroke="${K.ind3}" stroke-width="${f1(r * .22)}"/><path d="M ${r} 0 A ${r} ${r} 0 0 1 0 ${r}" fill="none" stroke="${col}" stroke-width="${f1(r * .22)}" stroke-linecap="round"/></g>`;
// phone: centre (x, y), scale s, rot; screen = svg in local coords (-100..100, -190..190)
export function phone(x, y, s, screen = '', rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><rect x="-115" y="-215" width="230" height="430" rx="34" fill="#0A0F22" ${OL(5)}/><rect x="-100" y="-190" width="200" height="380" rx="18" fill="${K.screen}"/>${screen}</g>`;
}
// monitor on a desk: centre of screen (x, y), w×h screen, svg screen content in local coords (0..w, 0..h)
export function monitor(x, y, w, h, screen = '') {
  return `<rect x="${f1(x - w / 2 - 20)}" y="${f1(y - h / 2 - 20)}" width="${f1(w + 40)}" height="${f1(h + 40)}" rx="18" fill="#0A0F22" ${OL(4)}/><g transform="translate(${f1(x - w / 2)} ${f1(y - h / 2)})"><rect width="${w}" height="${h}" rx="8" fill="${K.screen}"/>${screen}</g>
    <rect x="${f1(x - 30)}" y="${f1(y + h / 2 + 20)}" width="60" height="80" fill="#0A0F22"/><rect x="${f1(x - 120)}" y="${f1(y + h / 2 + 96)}" width="240" height="20" rx="8" fill="#0A0F22"/>`;
}
// cloud icon
export const cloud = (x, y, s, col = K.data) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M -110 40 Q -150 40 -150 0 Q -150 -40 -104 -42 Q -96 -100 -36 -100 Q 10 -100 30 -64 Q 50 -80 80 -76 Q 130 -70 130 -20 Q 160 -10 150 24 Q 144 40 120 40 Z" fill="${K.ind2}" stroke="${col}" stroke-width="10" stroke-linejoin="round"/></g>`;

// ---- people (bust, origin = shoulder-line centre). o.look, o.lookY, o.brow, o.mouth, o.closed, o.wide
const face = o => {
  const lk = (o.look || 0) * 8, ly = (o.lookY || 0) * 6, b = o.brow ?? 0;
  const eyes = `<circle cx="${-18 + lk}" cy="${ly}" r="6" fill="${K.ink}"/><circle cx="${18 + lk}" cy="${ly}" r="6" fill="${K.ink}"/>`;
  const glasses = o.glasses ? `<circle cx="-18" cy="0" r="17" fill="none" stroke="${K.ink}" stroke-width="4"/><circle cx="18" cy="0" r="17" fill="none" stroke="${K.ink}" stroke-width="4"/><path d="M -1 0 h 2" stroke="${K.ink}" stroke-width="4"/>` : '';
  const brows = `<path d="M ${-30 + lk} ${-24 - 5 * b} l 20 ${f1(b > .5 ? -7 : 2)} M ${30 + lk} ${-24 - 5 * b} l -20 ${f1(b > .5 ? -7 : 2)}" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  const m = o.mouth === 'o' ? `<ellipse cx="${lk}" cy="30" rx="9" ry="11" fill="${K.ink}"/>` : o.mouth === 'smile' ? `<path d="M ${lk - 14} 26 q 14 12 28 0" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>` : o.mouth === 'down' ? `<path d="M ${lk - 12} 34 q 12 -9 24 0" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>` : `<path d="M ${lk - 11} 30 h 22" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  return eyes + glasses + brows + m;
};
export function headOf(who, x, y, s, o = {}) {
  const hair = who === 'baker' ? `<path d="M -58 -30 Q -60 -100 0 -100 Q 60 -100 58 -30 Z" fill="${K.white}" ${OL(4)}/><rect x="-64" y="-38" width="128" height="20" rx="8" fill="${K.white}" ${OL(4)}/>`
    : `<path d="M -56 -8 Q -58 -74 0 -74 Q 58 -74 56 -8 Q 40 -46 -10 -44 Q -40 -40 -56 -8 Z" fill="${K.hair}" ${OL(4)}/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s)})"><ellipse cx="0" cy="0" rx="56" ry="62" fill="${K.skin}" ${OL(4)}/>${face({ ...o, glasses: who === 'du' })}${hair}</g>`;
}
export function arm(sh, el, hd, s, col, held = '') {
  const d = `M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(hd[0])} ${f1(hd[1])}`;
  return `<path d="${d}" fill="none" stroke="${K.ink}" stroke-width="${f1(46 * s + 7)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f1(46 * s)}" stroke-linecap="round" stroke-linejoin="round"/>${held}<circle cx="${f1(hd[0])}" cy="${f1(hd[1])}" r="${f1(24 * s)}" fill="${K.skin}" ${OL(3)}/>`;
}
// o.aL/o.aR = [[elbow],[hand]] or null; o.heldL/o.heldR svg drawn under that hand
export function bust(who, x, y, s, o = {}) {
  const col = who === 'baker' ? K.white : K.du, colD = who === 'baker' ? K.greyL : K.duD;
  const w = 100 * s, h = 420 * s;
  const torso = `<path d="M ${f1(x - w)} ${f1(y + 20 * s)} Q ${f1(x - w - 14 * s)} ${f1(y + h * .6)} ${f1(x - w + 6 * s)} ${f1(y + h)} L ${f1(x + w - 6 * s)} ${f1(y + h)} Q ${f1(x + w + 14 * s)} ${f1(y + h * .6)} ${f1(x + w)} ${f1(y + 20 * s)} Q ${f1(x)} ${f1(y - 16 * s)} ${f1(x - w)} ${f1(y + 20 * s)} Z" fill="${col}" ${OL()}/>
    ${who === 'du' ? `<path d="M ${f1(x)} ${f1(y + 6 * s)} V ${f1(y + h)}" stroke="${colD}" stroke-width="${f1(8 * s)}"/>` : `<rect x="${f1(x - 60 * s)}" y="${f1(y + 60 * s)}" width="${f1(120 * s)}" height="${f1(340 * s)}" rx="${f1(14 * s)}" fill="${K.greyL}" ${OL()}/>`}`;
  const one = (pts, side, held) => { const sh = [x + side * (w - 16 * s), y + 34 * s]; const p = pts || [[sh[0] + side * 18 * s, sh[1] + 160 * s], [sh[0] + side * 12 * s, sh[1] + 310 * s]]; return arm(sh, p[0], p[1], s, col, held); };
  return `${torso}${headOf(who, x, y - 92 * s, s, o)}${o.noL ? '' : one(o.aL, -1, o.heldL || '')}${o.noR ? '' : one(o.aR, 1, o.heldR || '')}`;
}
// a hand coming in from off-frame: forearm from (ex, ey) to hand (hx, hy)
export const reach = (ex, ey, hx, hy, s, col = K.du, held = '') => arm([ex, ey], [lerp(ex, hx, .55), lerp(ey, hy, .5)], [hx, hy], s, col, held);
// sun/moon on an arc across the top: p 0 (morning, left) .. 1 (evening, right)
export function sky(p, night = 0) {
  const x = lerp(140, 940, p), y = 330 - Math.sin(Math.PI * p) * 160;
  return `${glow(x, y, 160, 1 - night, 'iWarm')}<circle cx="${f1(x)}" cy="${f1(y)}" r="46" fill="${night > .5 ? K.star : K.sun}" opacity=".95"/>`;
}
