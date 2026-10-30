// v70 "Dein Auto versinkt" — kit for this video only (style: jobs/v70/style.md).
// Channel 1 look: rainy night, cold charcoal and dark water, one warm amber light (dashboard / door lights), red only for danger, 6 px outlines.
// Cast (identical in every shot): du = driver, teal jacket, short brown hair; Frau = plum coat, dark-blonde ponytail;
// Lena = older child, yellow raincoat, dark pigtails; Ben = younger child, light-blue hoodie, blond hair. Both kids sit in grey child seats.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  bg: '#141A1F', bg2: '#1E2A30', moss: '#24363A', ink: '#0B0F12', amber: '#FFB547', amberL: '#FFD58A', red: '#E5484D', white: '#F2F4F5', mono: '#E6EAEC',
  skin: '#E8B38A', skinD: '#B98462', water: '#163440', waterD: '#0C1F27', waterL: '#2F6474', foam: '#9CC7D1', rain: '#8FB3C2',
  car: '#5E6B74', carL: '#8494A0', carD: '#3C464E', glass: '#1B262D', glassL: '#9FC4D2', trim: '#20282E', seat: '#2B3238', seatL: '#3E474E', road: '#22272B',
  you: '#2E8C84', youD: '#1F625C', wom: '#6B4C7A', womD: '#4A3456', kidA: '#E8C547', kidAD: '#B8962E', kidB: '#5E9BD0', kidBD: '#3E6E99',
  hairY: '#5A3A28', hairW: '#A8793A', hairA: '#3A2A1E', hairB: '#C9A15A', strap: '#59636A', ham: '#E39B2D',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 6) => `stroke="${K.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const BG = (f = K.bg) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${f}"/>`;
export const DEFS = `<defs>
<radialGradient id="eTorch" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD58A" stop-opacity=".55"/><stop offset=".6" stop-color="#FFB547" stop-opacity=".18"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
<radialGradient id="eRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E5484D" stop-opacity=".45"/><stop offset="1" stop-color="#E5484D" stop-opacity="0"/></radialGradient>
<linearGradient id="eBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFE7B0" stop-opacity=".55"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></linearGradient>
<linearGradient id="eWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1D4351"/><stop offset="1" stop-color="#07141A"/></linearGradient>
<linearGradient id="eSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B1115"/><stop offset="1" stop-color="#1E2A30"/></linearGradient>
</defs>`;
export const light = (cx, cy, r, a = 1) => a <= .01 ? '' : `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="url(#eTorch)" opacity="${f1(cl(a))}"/>`;
export const dark = (a = 1) => `<rect x="-60" y="-60" width="1200" height="2040" fill="#05080A" opacity="${f1(.6 * a)}"/>`;
// mono label on black (rule cards, keywords). Same style everywhere.
export const label = (x, y, txt, a = 1, col = K.mono, sz = 52) => a <= .01 ? '' : `<g opacity="${f1(cl(a))}"><rect x="${f1(x - (txt.length * sz * .33 + 26))}" y="${f1(y - sz * .82)}" width="${f1(txt.length * sz * .66 + 52)}" height="${f1(sz * 1.3)}" fill="#05080A" stroke="${col}" stroke-width="3"/>${TX(txt, x, y + sz * .12, sz, col)}</g>`;
export const crossOut = (x, y, r, p) => p <= 0 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="none" stroke="${K.red}" stroke-width="14" opacity="${f1(cl(p * 2))}"/><path d="M ${f1(x - r * .7)} ${f1(y - r * .7)} L ${f1(x - r * .7 + r * 1.4 * cl(p))} ${f1(y - r * .7 + r * 1.4 * cl(p))}" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/>`;
export const tick = (x, y, s, p, col = K.amber) => p <= 0 ? '' : `<path d="M ${f1(x - 40 * s)} ${f1(y)} L ${f1(x - 10 * s)} ${f1(y + 30 * s)} L ${f1(x + 46 * s)} ${f1(y - 36 * s)}" fill="none" stroke="${col}" stroke-width="${f1(16 * s)}" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="${f1(cl(p))} 1"/>`;
// diagonal rain streaks over the frame (a = density/opacity)
export function rain(t, a = 1, n = 70, ang = 14) {
  if (a <= 0) return '';
  let s = '';
  for (let i = 0; i < n; i++) {
    const x = hash(i * 3.1) * 1240 - 80, sp = 1500 + hash(i * 7.7) * 700, y = ((hash(i * 1.9) * 2100 + t * sp) % 2100) - 100, L = 40 + hash(i) * 50;
    s += `<path d="M ${f1(x + y * Math.tan(ang * Math.PI / 180) * .2)} ${f1(y)} l ${f1(-L * .25)} ${f1(L)}" stroke="${K.rain}" stroke-width="3" opacity="${f1(.35 * a)}" stroke-linecap="round"/>`;
  }
  return s;
}
// water body from surface y down; small travelling waves
export function water(t, y, o = {}) {
  const amp = o.amp ?? 10, x0 = o.x0 ?? -60, x1 = o.x1 ?? 1140;
  let d = `M ${x0} ${f1(y)}`;
  for (let x = x0; x <= x1; x += 40) d += ` L ${x} ${f1(y + amp * Math.sin(x * .02 + t * 3) + amp * .4 * Math.sin(x * .05 - t * 4))}`;
  return `<path d="${d} L ${x1} 2000 L ${x0} 2000 Z" fill="${o.fill || 'url(#eWater)'}" opacity="${f1(o.alpha ?? 1)}"/><path d="${d}" fill="none" stroke="${K.waterL}" stroke-width="5" opacity="${f1(o.alpha ?? 1)}"/>`;
}

// --- people (bust/half figures; origin at the shoulder-line centre). o.look/lookY -1..1, o.mouth, o.brow (0 calm, 1 worried), o.tears
const face = o => {
  const lk = (o.look || 0) * 8, ly = (o.lookY || 0) * 6, b = o.brow ?? 0;
  const eyes = o.closed ? `<path d="M ${-24 + lk} 0 q 9 6 18 0 M ${6 + lk} 0 q 9 6 18 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`
    : o.squeeze ? `<path d="M ${-26 + lk} -4 l 18 5 l -18 5 M ${26 + lk} -4 l -18 5 l 18 5" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`
    : `<circle cx="${-16 + lk}" cy="${ly}" r="${o.wide ? 7.5 : 5.5}" fill="${K.ink}"/><circle cx="${16 + lk}" cy="${ly}" r="${o.wide ? 7.5 : 5.5}" fill="${K.ink}"/>`;
  const brows = `<path d="M ${-28 + lk} ${-20 - 4 * b} l 20 ${f1(b > .5 ? -6 : 2)} M ${28 + lk} ${-20 - 4 * b} l -20 ${f1(b > .5 ? -6 : 2)}" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  const mo = o.mouth;
  const m = mo === 'o' ? `<ellipse cx="${lk}" cy="28" rx="8" ry="10" fill="${K.ink}"/>`
    : mo === 'scream' ? `<ellipse cx="${lk}" cy="30" rx="14" ry="${f1(15 + 3 * Math.sin((o.t || 0) * 18))}" fill="${K.ink}"/>`
    : mo === 'cry' ? `<path d="M ${lk - 16} 34 q 16 -18 32 0 Z" fill="${K.ink}"/>`
    : mo === 'talk' ? `<ellipse cx="${lk}" cy="27" rx="10" ry="${f1(4 + 5 * Math.abs(Math.sin((o.t || 0) * 14)))}" fill="${K.ink}"/>`
    : mo === 'puff' ? `<path d="M ${lk - 8} 28 h 16" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`
    : mo === 'down' ? `<path d="M ${lk - 12} 31 q 12 -8 24 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`
    : mo === 'smile' ? `<path d="M ${lk - 12} 25 q 12 9 24 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`
    : `<path d="M ${lk - 11} 28 h 22" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`;
  const tears = o.tears ? `<path d="M ${-18 + lk} 10 q -4 14 0 22 q 6 -8 0 -22 Z M ${18 + lk} 10 q -4 14 0 22 q 6 -8 0 -22 Z" fill="#8FD0F0" opacity="${f1(o.tears)}"/>` : '';
  const cheeks = mo === 'puff' ? `<circle cx="${-30 + lk}" cy="22" r="14" fill="${K.skinD}" opacity=".5"/><circle cx="${30 + lk}" cy="22" r="14" fill="${K.skinD}" opacity=".5"/>` : '';
  return cheeks + eyes + brows + m + tears;
};
export function headOf(who, x, y, s, o = {}) {
  const hair = {
    you: `<path d="M -56 -8 Q -58 -72 0 -72 Q 58 -72 56 -8 Q 34 -44 -20 -40 Q -42 -34 -56 -8 Z" fill="${K.hairY}" ${OL(4)}/>`,
    wom: `<path d="M -58 6 Q -62 -72 0 -72 Q 62 -72 58 6 Q 52 -42 0 -46 Q -52 -42 -58 6 Z" fill="${K.hairW}" ${OL(4)}/>`,
    kidA: `<circle cx="-56" cy="-4" r="20" fill="${K.hairA}" ${OL(4)}/><circle cx="56" cy="-4" r="20" fill="${K.hairA}" ${OL(4)}/><path d="M -50 -2 Q -52 -62 0 -62 Q 52 -62 50 -2 Q 30 -34 0 -36 Q -30 -34 -50 -2 Z" fill="${K.hairA}" ${OL(4)}/>`,
    kidB: `<path d="M -48 -12 Q -46 -60 0 -60 Q 46 -60 48 -12 Q 20 -36 -6 -28 Q -24 -40 -48 -12 Z" fill="${K.hairB}" ${OL(4)}/>`,
  }[who];
  const kid = who === 'kidA' || who === 'kidB';
  const rx = kid ? 48 : 54, ry = kid ? 52 : 60;
  const pony = who === 'wom' ? `<path d="M 30 -50 Q 100 -40 88 40 Q 80 74 64 64 Q 74 10 36 -14 Z" fill="${K.hairW}" ${OL(4)}/>` : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s)})">${pony}<ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" fill="${K.skin}" ${OL(4)}/>${face(o)}${hair}</g>`;
}
export const COL = { you: [K.you, K.youD], wom: [K.wom, K.womD], kidA: [K.kidA, K.kidAD], kidB: [K.kidB, K.kidBD] };
// limb from shoulder through elbow to hand: sleeve colour, skin hand (fist) at the end
export function arm(sh, el, hd, s, col, o = {}) {
  const d = `M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(hd[0])} ${f1(hd[1])}`;
  return `<path d="${d}" fill="none" stroke="${K.ink}" stroke-width="${f1(44 * s + 8)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f1(44 * s)}" stroke-linecap="round" stroke-linejoin="round"/>${o.noHand ? '' : `<circle cx="${f1(hd[0])}" cy="${f1(hd[1])}" r="${f1(21 * s)}" fill="${K.skin}" ${OL(4)}/>`}`;
}
// shoulder position of a bust (side -1 = screen left)
export const shoulder = (who, x, y, s, side) => [x + side * ((who === 'kidA' || who === 'kidB' ? 70 : 92) - 14) * s, y + 30 * s];
// half figure: torso from shoulders (x, y) down to y + 380·s, head above; o.aL/o.aR = [[elbow],[hand]] absolute coords or null for hanging
export function bust(who, x, y, s, o = {}) {
  const [col, colD] = COL[who];
  const kid = who === 'kidA' || who === 'kidB';
  const w = (kid ? 70 : 92) * s, h = (kid ? 260 : 380) * s;
  const torso = `<path d="M ${f1(x - w)} ${f1(y + 20 * s)} Q ${f1(x - w - 10 * s)} ${f1(y + h * .6)} ${f1(x - w + 6 * s)} ${f1(y + h)} L ${f1(x + w - 6 * s)} ${f1(y + h)} Q ${f1(x + w + 10 * s)} ${f1(y + h * .6)} ${f1(x + w)} ${f1(y + 20 * s)} Q ${f1(x)} ${f1(y - 14 * s)} ${f1(x - w)} ${f1(y + 20 * s)} Z" fill="${col}" ${OL()}/>`;
  const extra = who === 'you' ? `<path d="M ${x} ${f1(y + 10 * s)} V ${f1(y + h)}" stroke="${colD}" stroke-width="${f1(6 * s)}"/><path d="M ${f1(x - 40 * s)} ${f1(y - 4 * s)} L ${x} ${f1(y + 40 * s)} L ${f1(x + 40 * s)} ${f1(y - 4 * s)}" fill="none" stroke="${colD}" stroke-width="${f1(8 * s)}"/>`
    : who === 'wom' ? `<path d="M ${f1(x - 44 * s)} ${f1(y)} Q ${x} ${f1(y + 50 * s)} ${f1(x + 44 * s)} ${f1(y)}" fill="none" stroke="${colD}" stroke-width="${f1(10 * s)}"/><circle cx="${x}" cy="${f1(y + 120 * s)}" r="${f1(7 * s)}" fill="${colD}"/><circle cx="${x}" cy="${f1(y + 200 * s)}" r="${f1(7 * s)}" fill="${colD}"/>`
    : who === 'kidA' ? `<path d="M ${f1(x - 60 * s)} ${f1(y + 10 * s)} Q ${x} ${f1(y - 30 * s)} ${f1(x + 60 * s)} ${f1(y + 10 * s)}" fill="${colD}" ${OL(4)}/>`
    : `<path d="M ${f1(x - 30 * s)} ${f1(y + 120 * s)} h ${f1(60 * s)}" stroke="${colD}" stroke-width="${f1(10 * s)}" stroke-linecap="round"/>`;
  const a = (pts, side) => { const sh = shoulder(who, x, y, s, side); const p = pts || [[sh[0] + side * 16 * s, sh[1] + 150 * s], [sh[0] + side * 10 * s, sh[1] + 290 * s]]; return arm(sh, p[0], p[1], s, col); };
  const hy = y - (kid ? 70 : 84) * s;
  return `${o.armsBehind ? a(o.aL, -1) + a(o.aR, 1) : ''}${torso}${extra}${o.belt ?? ''}${headOf(who, x + (o.hx || 0) * s, hy + (o.hy || 0) * s, s, o)}${o.armsBehind ? '' : (o.noL ? '' : a(o.aL, -1)) + (o.noR ? '' : a(o.aR, 1))}`;
}
// adult 3-point belt across the chest (front view): from outboard shoulder (side) to inboard hip; p = 1 fastened, 0 fully retracted toward the pillar
export function belt(x, y, s, side, p = 1) {
  const a = [x + side * 120 * s, y - 10 * s], b = [x - side * 70 * s, y + 340 * s];
  const e = [lerp(a[0], b[0], cl(p)), lerp(a[1], b[1], cl(p))];
  return p <= .02 ? '' : `<path d="M ${f1(a[0])} ${f1(a[1])} L ${f1(e[0])} ${f1(e[1])}" stroke="${K.ink}" stroke-width="${f1(34 * s)}" stroke-linecap="round"/><path d="M ${f1(a[0])} ${f1(a[1])} L ${f1(e[0])} ${f1(e[1])}" stroke="${K.strap}" stroke-width="${f1(24 * s)}" stroke-linecap="round"/>${p > .98 ? `<rect x="${f1(b[0] - 26 * s)}" y="${f1(b[1] - 16 * s)}" width="${f1(52 * s)}" height="${f1(40 * s)}" rx="${f1(6 * s)}" fill="#1E2328" ${OL(4)}/><rect x="${f1(b[0] - 14 * s)}" y="${f1(b[1] - 8 * s)}" width="${f1(28 * s)}" height="${f1(16 * s)}" rx="3" fill="${K.red}"/>` : ''}`;
}
// child seat shell (drawn behind the kid bust); shoulder line at (x, y)
export function childSeat(x, y, s) {
  return `<path d="M ${f1(x - 120 * s)} ${f1(y + 300 * s)} L ${f1(x - 130 * s)} ${f1(y - 120 * s)} Q ${f1(x - 130 * s)} ${f1(y - 210 * s)} ${f1(x - 60 * s)} ${f1(y - 220 * s)} L ${f1(x + 60 * s)} ${f1(y - 220 * s)} Q ${f1(x + 130 * s)} ${f1(y - 210 * s)} ${f1(x + 130 * s)} ${f1(y - 120 * s)} L ${f1(x + 120 * s)} ${f1(y + 300 * s)} Z" fill="${K.seat}" ${OL()}/>
    <path d="M ${f1(x - 112 * s)} ${f1(y - 150 * s)} Q ${f1(x - 150 * s)} ${f1(y - 60 * s)} ${f1(x - 112 * s)} ${f1(y + 20 * s)} M ${f1(x + 112 * s)} ${f1(y - 150 * s)} Q ${f1(x + 150 * s)} ${f1(y - 60 * s)} ${f1(x + 112 * s)} ${f1(y + 20 * s)}" fill="none" stroke="${K.seatL}" stroke-width="${f1(26 * s)}" stroke-linecap="round"/>`;
}
// 5-point harness over the kid: open 0 closed .. 1 straps swung aside, buckle released
export function harness(x, y, s, open = 0) {
  const bx = x, by = y + 220 * s, sw = 70 * s * open;
  const st = (x0, x1) => `<path d="M ${f1(x0)} ${f1(y - 6 * s)} L ${f1(x1)} ${f1(by - 10 * s)}" stroke="${K.ink}" stroke-width="${f1(26 * s)}" stroke-linecap="round"/><path d="M ${f1(x0)} ${f1(y - 6 * s)} L ${f1(x1)} ${f1(by - 10 * s)}" stroke="${K.strap}" stroke-width="${f1(17 * s)}" stroke-linecap="round"/>`;
  const clip = open < .3 ? `<rect x="${f1(bx - 40 * s)}" y="${f1(y + 100 * s)}" width="${f1(80 * s)}" height="${f1(26 * s)}" rx="${f1(8 * s)}" fill="#1E2328" ${OL(3)}/>` : '';
  return `${st(x - 40 * s, bx - 16 * s - sw)}${st(x + 40 * s, bx + 16 * s + sw)}${clip}<rect x="${f1(bx - 30 * s)}" y="${f1(by - 18 * s)}" width="${f1(60 * s)}" height="${f1(46 * s)}" rx="${f1(8 * s)}" fill="#1E2328" ${OL(4)}/><circle cx="${f1(bx)}" cy="${f1(by + 5 * s)}" r="${f1(12 * s)}" fill="${K.red}"/>`;
}
// a whole seated kid in a child seat (front view)
export function kidInSeat(who, x, y, s, o = {}) {
  return `${childSeat(x, y, s)}${bust(who, x, y, s, o)}${o.noHarness ? '' : harness(x, y, s, o.open || 0)}`;
}

// --- the car (graphite saloon), side view facing right. (x, y) = ground point under the car centre. o.tilt deg (nose down +),
// o.winF / o.winR 0 closed .. 1 lowered (driver-side windows), o.people (draw occupants), o.faces {you, wom, kidA, kidB}, o.lights headlights 0..1,
// o.inner amber interior glow 0..1, o.id unique clip prefix, o.waterIn 0..1 water level inside the cabin.
export function carSide(t, x, y, s, o = {}) {
  const id = o.id || 'cs';
  const body = `M 470 -60 Q 486 -100 480 -140 L 462 -196 Q 330 -214 190 -222 L 60 -360 Q 0 -378 -190 -376 L -330 -240 Q -420 -232 -470 -214 L -484 -140 Q -486 -90 -470 -60 Z`;
  const winF = `M 168 -226 L 52 -350 L -82 -352 L -82 -226 Z`, winR = `M -104 -226 L -104 -352 L -186 -352 L -312 -232 Z`;
  const wF = o.winF || 0, wR = o.winR || 0, inner = o.inner ?? .5;
  const occ = o.people === false ? '' : (() => {
    const f = o.faces || {};
    const on = w => !o.only || o.only.includes(w);
    return `${on('wom') ? headOf('wom', 40, -300, .78, f.wom || { look: -.4, brow: .6 }) : ''}${on('you') ? headOf('you', -20, -288, .92, f.you || { look: .6, brow: .5 }) : ''}
      ${on('kidB') ? headOf('kidB', -170, -292, .62, f.kidB || { look: .5, brow: .8 }) : ''}${on('kidA') ? headOf('kidA', -238, -282, .74, f.kidA || { look: .4, brow: .8 }) : ''}`;
  })();
  const win = (d, w, k) => `<clipPath id="${id}${k}"><path d="${d}"/></clipPath><path d="${d}" fill="#0E1418"/><g clip-path="url(#${id}${k})">
      <rect x="-400" y="-400" width="700" height="200" fill="#FFB547" opacity="${f1(.18 * inner)}"/>${occ}
      ${o.waterIn ? `<rect x="-400" y="${f1(lerp(-200, -380, o.waterIn))}" width="700" height="300" fill="#1D4351" opacity=".85"/>` : ''}
      <rect x="-400" y="${f1(-380 + 140 * cl(w))}" width="700" height="240" fill="${K.glassL}" opacity=".22"/><path d="M -400 ${f1(-380 + 140 * cl(w))} h 700" stroke="${K.glassL}" stroke-width="4" opacity="${w > .02 ? .7 : 0}"/></g><path d="${d}" fill="none" ${OL(5)}/>`;
  const wheel = wx => `<circle cx="${wx}" cy="-66" r="74" fill="#14191C" ${OL()}/><circle cx="${wx}" cy="-66" r="36" fill="${K.carL}" ${OL(4)}/><circle cx="${wx}" cy="-66" r="10" fill="${K.ink}"/>`;
  const beam = (o.lights || 0) > 0 ? `<path d="M 470 -150 L 1400 -260 L 1400 60 Z" fill="url(#eBeam)" opacity="${f1(.8 * o.lights)}"/>` : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s)})">${beam}
    ${wheel(300)}${wheel(-300)}
    <path d="${body}" fill="${K.car}" ${OL()}/>
    <path d="M 460 -180 Q 300 -196 180 -204 M -470 -200 Q -410 -214 -320 -222" fill="none" stroke="${K.carL}" stroke-width="8" stroke-linecap="round"/>
    <path d="M -480 -112 L 478 -112" stroke="${K.carD}" stroke-width="8"/>
    ${win(winF, wF, 'f')}${win(winR, wR, 'r')}
    <path d="M -82 -226 L -82 -352 L -104 -352 L -104 -226 Z" fill="${K.trim}" ${OL(4)}/>
    <path d="M -92 -222 L -92 -70 M 180 -222 L 196 -80" stroke="${K.carD}" stroke-width="5"/>
    <rect x="${f1(30)}" y="-196" width="56" height="12" rx="6" fill="${K.carD}"/><rect x="${f1(-250)}" y="-196" width="56" height="12" rx="6" fill="${K.carD}"/>
    <path d="M 452 -168 L 478 -160 L 476 -134 L 448 -138 Z" fill="${(o.lights || 0) > 0 ? '#FFF0C8' : '#C9D0D4'}" ${OL(3)}/><path d="M -478 -176 L -462 -178 L -462 -144 L -480 -146 Z" fill="${K.red}" opacity=".85" ${OL(3)}/>
    <path d="${body}" fill="none" ${OL()}/>${o.over || ''}</g>`;
}

// --- interior seen from the dashboard looking back: wife screen-left (passenger), you screen-right (driver), kids in the back.
// o.water outside-window level 0..1, o.dash dashboard light 0..1, o.belts {you, wom} 0..1, o.kidOpen {kidA, kidB}, o.poses {...bust opts}, o.wheel steering wheel visible
export function interior(t, o = {}) {
  const P = o.poses || {}, B = o.belts || {}, KO = o.kidOpen || {};
  const wl = o.water ?? .3, dash = o.dash ?? 1;
  const wy = lerp(1200, 300, wl);
  const side = (x0, x1) => `<path d="M ${x0} 160 L ${x1} 260 L ${x1} 1300 L ${x0} 1500 Z" fill="#0F171C"/>`;
  const outside = `<g opacity=".9">${side(-60, 110)}${side(1140, 970)}</g>`;
  const waterOut = `<rect x="-60" y="${f1(wy)}" width="170" height="${f1(1600 - wy)}" fill="#1D4351"/><rect x="970" y="${f1(wy)}" width="170" height="${f1(1600 - wy)}" fill="#1D4351"/><path d="M -60 ${f1(wy)} L 110 ${f1(wy + 6)} M 970 ${f1(wy + 6)} L 1140 ${f1(wy)}" stroke="${K.waterL}" stroke-width="5"/>`;
  const shell = `<path d="M -60 -60 H 1140 V 160 L 970 260 L 110 260 L -60 160 Z" fill="#1A2126" ${OL()}/>
    <path d="M 110 260 L 970 260 L 970 1300 L 110 1300 Z" fill="#161D22"/>
    <path d="M 300 300 L 780 300 L 820 520 L 260 520 Z" fill="#0D1317" ${OL(5)}/>${rain(t, .5, 16).replace(/<path/g, '<path clip-path="url(#iRw)"')}
    <clipPath id="iRw"><path d="M 300 300 L 780 300 L 820 520 L 260 520 Z"/></clipPath>
    ${o.rearWater ? `<rect x="250" y="${f1(lerp(520, 300, o.rearWater))}" width="580" height="240" fill="#1D4351" clip-path="url(#iRw)"/>` : ''}
    <path d="M 150 560 L 930 560 L 950 1100 L 130 1100 Z" fill="${K.seat}" ${OL()}/>
    <path d="M -60 -60 L 110 260 L 110 1300 L -60 1500" fill="none" ${OL(8)}/><path d="M 1140 -60 L 970 260 L 970 1300 L 1140 1500" fill="none" ${OL(8)}/>`;
  if (o.noFront) return `${BG('#0A0F12')}${outside}${waterOut}${rain(t, .6, 20)}${shell}${kidsOf(P, KO)}${o.over || ''}${light(540, 700, 700, .35 * dash)}`;
  const kA = P.kidA || { look: .3, brow: .9, mouth: 'cry' }, kB = P.kidB || { look: -.3, brow: .9, mouth: 'cry' };
  const kids = `${kidInSeat('kidA', 390, 760, .82, { ...kA, open: KO.kidA || 0 })}${kidInSeat('kidB', 690, 770, .76, { ...kB, open: KO.kidB || 0 })}`;
  const seatBack = (x) => `<path d="M ${x - 150} 1500 L ${x - 140} 1010 Q ${x - 130} 930 ${x} 925 Q ${x + 130} 930 ${x + 140} 1010 L ${x + 150} 1500 Z" fill="${K.seatL}" ${OL()}/><rect x="${x - 80}" y="800" width="160" height="110" rx="34" fill="${K.seatL}" ${OL()}/><path d="M ${x - 40} 910 v 20 M ${x + 40} 910 v 20" stroke="${K.ink}" stroke-width="10"/>`;
  const W = P.wom || { look: .5, brow: .8, mouth: 'o' }, Y = P.you || { look: -.3, brow: .6, mouth: 'flat' };
  const fronts = `${seatBack(300)}${seatBack(790)}
    ${bust('wom', 300, 1090, 1.15, { ...W, belt: belt(300, 1090, 1.15, -1, B.wom ?? 1) })}
    ${bust('you', 790, 1090, 1.15, { ...Y, belt: belt(790, 1090, 1.15, 1, B.you ?? 1) })}`;
  const wheel = o.wheel === false ? '' : `<circle cx="800" cy="1560" r="250" fill="none" stroke="${K.ink}" stroke-width="58"/><circle cx="800" cy="1560" r="250" fill="none" stroke="#2A3136" stroke-width="44"/><path d="M 560 1600 L 1040 1600" stroke="#2A3136" stroke-width="40"/>`;
  const dashB = `<path d="M -60 1500 Q 540 1440 1140 1500 V 1980 H -60 Z" fill="#11171B" ${OL()}/><path d="M 120 1520 Q 540 1470 960 1520" stroke="${K.amber}" stroke-width="6" opacity="${f1(.6 * dash)}" fill="none"/>`;
  return `${BG('#0A0F12')}${outside}${waterOut}${rain(t, .6, 20)}${shell}${kids}${fronts}${o.over || ''}${light(540, 1300, 900, .35 * dash)}${dashB}${wheel}${o.front || ''}`;
}

const kidsOf = (P, KO) => `${kidInSeat('kidA', 390, 760, .82, { ...(P.kidA || {}), open: KO.kidA || 0 })}${kidInSeat('kidB', 690, 770, .76, { ...(P.kidB || {}), open: KO.kidB || 0 })}`;
// the car from above (nose toward -y at yaw 0). o.win {fl, fr, rl, rr, ws, rw}: fill colours per pane, o.marks extra SVG in car coords
export function carTop(x, y, s, yaw, o = {}) {
  const W = o.win || {};
  const g = c => c || K.glass;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(yaw)}) scale(${f1(s)})">
    <rect x="-150" y="-330" width="300" height="660" rx="90" fill="${K.car}" ${OL()}/>
    <path d="M -118 -150 Q 0 -190 118 -150 L 104 -60 Q 0 -80 -104 -60 Z" fill="${g(W.ws)}" ${OL(5)}/>
    <path d="M -104 170 Q 0 186 104 170 L 116 240 Q 0 262 -116 240 Z" fill="${g(W.rw)}" ${OL(5)}/>
    <rect x="-100" y="-60" width="200" height="230" rx="16" fill="${K.carL}" ${OL(5)}/>
    <path d="M -146 -130 L -122 -140 L -110 -60 L -110 40 L -146 40 Z" fill="${g(W.fl)}" ${OL(4)}/><path d="M 146 -130 L 122 -140 L 110 -60 L 110 40 L 146 40 Z" fill="${g(W.fr)}" ${OL(4)}/>
    <path d="M -146 56 L -110 56 L -110 160 L -140 180 Z" fill="${g(W.rl)}" ${OL(4)}/><path d="M 146 56 L 110 56 L 110 160 L 140 180 Z" fill="${g(W.rr)}" ${OL(4)}/>
    <rect x="-120" y="-326" width="70" height="24" rx="10" fill="${o.lights ? '#FFF0C8' : '#C9D0D4'}" ${OL(3)}/><rect x="50" y="-326" width="70" height="24" rx="10" fill="${o.lights ? '#FFF0C8' : '#C9D0D4'}" ${OL(3)}/>
    <rect x="-120" y="304" width="60" height="18" rx="8" fill="${K.red}" ${OL(3)}/><rect x="60" y="304" width="60" height="18" rx="8" fill="${K.red}" ${OL(3)}/>${o.marks || ''}</g>`;
}
// driver-door close-up: arm rest with window switches, door handle; o.press 0..1 finger on front switch, o.lit amber backlight 0..1
export function doorPanel(t, o = {}) {
  const lit = o.lit ?? 1;
  const sw = (x, y) => `<rect x="${x - 46}" y="${y - 70}" width="92" height="140" rx="22" fill="#1A2024" ${OL(5)}/><path d="M ${x - 22} ${y - 10} L ${x} ${y - 38} L ${x + 22} ${y - 10} Z M ${x - 22} ${y + 14} L ${x} ${y + 42} L ${x + 22} ${y + 14} Z" fill="${lit > .3 ? K.amber : '#3A4248'}" opacity="${f1(.4 + .6 * lit)}"/>`;
  return `${BG('#10161A')}
    <path d="M -60 220 L 1140 160 L 1140 1500 L -60 1500 Z" fill="#232B31" ${OL()}/>
    <path d="M -60 260 L 1140 200" stroke="${K.carD}" stroke-width="14"/>
    <path d="M -60 760 Q 540 700 1140 740 L 1140 1060 Q 540 1010 -60 1080 Z" fill="${K.seat}" ${OL()}/>
    <rect x="230" y="770" width="620" height="200" rx="40" fill="#151B1F" ${OL(5)}/>
    ${sw(370, 870)}${sw(510, 870)}${sw(650, 870)}${sw(790, 870)}
    ${TX('VORNE', 370, 1000, 30, K.mono, 'middle', `opacity=".6"`)}${TX('HINTEN', 650, 1000, 30, K.mono, 'middle', `opacity=".6"`)}
    <path d="M 180 470 Q 300 430 420 470" fill="none" stroke="#3A4248" stroke-width="40" stroke-linecap="round"/><path d="M 180 470 Q 300 430 420 470" fill="none" ${OL(4)}/>
    ${light(510, 870, 420, .5 * lit)}`;
}
// emergency hammer: (x, y) = grip centre, rot deg (head points up at 0), s scale
export function hammer(x, y, s = 1, rot = 0) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})">
    <rect x="-24" y="-150" width="48" height="230" rx="18" fill="${K.ham}" ${OL(5)}/>
    <path d="M -90 -190 L 90 -190 L 104 -160 L -104 -160 Z" fill="#9AA6AE" ${OL(5)}/><path d="M -104 -160 L -122 -175 L -104 -190 M 104 -160 L 122 -175 L 104 -190" fill="#C9D0D4" ${OL(4)}/>
    <path d="M -24 50 L 24 50" stroke="${K.ink}" stroke-width="4"/><path d="M -10 64 L 10 64" stroke="${K.ink}" stroke-width="4"/></g>`;
}
// a forearm entering from a frame edge to a fist/finger at (hx, hy); from (ax, ay)
export function foreArm(ax, ay, hx, hy, col = K.you, o = {}) {
  const w = o.w || 110;
  const fing = o.finger ? (() => { const ang = Math.atan2(hy - ay, hx - ax), fx = hx + Math.cos(ang) * 70, fy = hy + Math.sin(ang) * 70;
    return `<path d="M ${f1(hx)} ${f1(hy)} L ${f1(fx)} ${f1(fy)}" stroke="${K.ink}" stroke-width="46" stroke-linecap="round"/><path d="M ${f1(hx)} ${f1(hy)} L ${f1(fx)} ${f1(fy)}" stroke="${K.skin}" stroke-width="34" stroke-linecap="round"/>`; })() : '';
  return `<path d="M ${f1(ax)} ${f1(ay)} L ${f1(hx)} ${f1(hy)}" stroke="${K.ink}" stroke-width="${w + 12}" stroke-linecap="round"/><path d="M ${f1(ax)} ${f1(ay)} L ${f1(hx)} ${f1(hy)}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/>${fing}<circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(w * .5)}" fill="${K.skin}" ${OL(5)}/>`;
}
