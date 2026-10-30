// v76 "Wie operierte man vor der Narkose?" — kit for this video only (style: jobs/v76/style.md).
// Channel 4 look: night-indigo room, one warm oil lamp, thin dark outlines; cyan = ether vapour, red = pain, lime = bacteria.
// Discreet medical illustration: instruments shown on a tray or in a hand, never cutting; no wounds beyond a thin stitched line.
// Cast: du (patient, brown hair, white shirt, grey sheet) · helpers (rolled sleeves, brown / olive waistcoats) · old-time surgeon (black coat, grey hair, apron)
// 1846: Morton (young, dark hair + moustache, brown coat) · Warren (older, white hair, black coat) · patient 1846 (dark beard, blue-grey shirt).
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  ink: '#0A0F1C', bg0: '#0B1026', bg1: '#1B2A5A', wall: '#202B55', wallL: '#2C3A6E', floor: '#141A38',
  wood: '#7A4E32', woodD: '#55351F', woodL: '#9C6A45', lamp: '#FFD27A', orange: '#FF8A3D', cyan: '#4FD1E8', cyanL: '#A8EEF8',
  white: '#F2F5FF', paper: '#EDE3CC', paperD: '#CDBF9F', red: '#E5484D', redL: '#FF7A7E', lime: '#A6D84A', limeD: '#6E9A26',
  skin: '#F0C6A0', skinD: '#D49C78', sheet: '#C9CEDC', sheetD: '#959BB0', shirt: '#EEF0F5', shirtD: '#C3C8D6',
  hairDu: '#5A3A22', hairM: '#22180F', hairW: '#E8E8EE', hairG: '#9A9AA6', coatB: '#23232E', coatBr: '#6B4A2E', vestA: '#7A5A3A', vestB: '#5E6B3A',
  trous: '#2B2F45', apron: '#D8D2C2', steel: '#C9D3D8', steelD: '#7E8A94', glass: '#BFEFF7', bottle: '#4A2E1A', pt46: '#7D93B5',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 4, c = K.ink) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const TI = (s, x, y, sz, f, a = 'middle') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" style="font-family:'Inter';font-weight:600;font-style:italic;font-size:${sz}px">${s}</text>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const DEFS = `<defs>
<linearGradient id="nSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${K.bg0}"/><stop offset="1" stop-color="${K.bg1}"/></linearGradient>
<radialGradient id="nLamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD27A" stop-opacity=".55"/><stop offset=".5" stop-color="#FF8A3D" stop-opacity=".16"/><stop offset="1" stop-color="#FF8A3D" stop-opacity="0"/></radialGradient>
<radialGradient id="nCyan" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#4FD1E8" stop-opacity=".6"/><stop offset="1" stop-color="#4FD1E8" stop-opacity="0"/></radialGradient>
<radialGradient id="nRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E5484D" stop-opacity=".55"/><stop offset="1" stop-color="#E5484D" stop-opacity="0"/></radialGradient>
<linearGradient id="nWall" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#151C40"/><stop offset="1" stop-color="#26336A"/></linearGradient>
</defs>`;
export const BG = (f = 'url(#nSky)') => `<rect x="-80" y="-80" width="1240" height="2080" fill="${f}"/>`;
// room: wall with wainscot, floor from y; lamp glow at (lx, ly)
export const room = (fy = 1350, lx = 540, ly = 360, glow = 1) => `${BG('url(#nWall)')}<rect x="-80" y="${fy - 260}" width="1240" height="260" fill="${K.wallL}" opacity=".55"/>
  <path d="M -80 ${fy - 260} H 1160" stroke="${K.woodD}" stroke-width="10"/><rect x="-80" y="${fy}" width="1240" height="${2000 - fy}" fill="${K.floor}"/>
  ${[...Array(10)].map((_, i) => `<path d="M ${i * 130 - 60} ${fy} L ${i * 170 - 300} 2000" stroke="#0E1330" stroke-width="5"/>`).join('')}
  <ellipse cx="${lx}" cy="${ly + 380}" rx="${f1(700 * glow)}" ry="${f1(700 * glow)}" fill="url(#nLamp)"/>`;
// hanging oil lamp, (x, y) = bottom of glass; sw swing deg
export const lamp = (x, y, s = 1, sw = 0, on = 1) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(sw)}) scale(${f1(s)})">
  <path d="M 0 -900 V -150" stroke="${K.ink}" stroke-width="5"/><path d="M -60 -150 H 60 L 30 -110 H -30 Z" fill="${K.woodD}" ${OL(3)}/>
  <ellipse cx="0" cy="-55" rx="${f1(140 * on + 20)}" ry="${f1(140 * on + 20)}" fill="url(#nLamp)"/>
  <path d="M -30 -110 Q -50 -60 -26 -10 H 26 Q 50 -60 30 -110 Z" fill="${on > .05 ? K.lamp : '#3A3A4A'}" opacity=".9" ${OL(3)}/><rect x="-36" y="-10" width="72" height="22" rx="6" fill="${K.woodD}" ${OL(3)}/></g>`;

// keyword card (channel 4): big coloured keyword + small italic line, white plate
export function card(x, y, word, sub, a = 1, col = K.orange, sz = 110) {
  if (a <= .01) return '';
  const w = Math.max(word.length * sz * .68, (sub || '').length * 22) + 100;
  return `<g opacity="${f1(cl(a * 1.5))}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(.9 + .1 * eout(cl(a)))})"><rect x="${f1(-w / 2)}" y="${f1(-sz - 30)}" width="${f1(w)}" height="${f1(sz + (sub ? 120 : 70))}" rx="26" fill="${K.white}" ${OL(5)}/>
    ${TX(word, 0, 0, sz, col)}${sub ? TI(sub, 0, 62, 42, K.ink) : ''}</g>`;
}
// small name/place tag (dark plate, light text)
export function tag(x, y, txt, a = 1, sz = 46, col = K.lamp, sub = '') {
  if (a <= .01) return '';
  const w = Math.max(txt.length * sz * .66, sub.length * sz * .45) + 60, h = sz * 1.45 + (sub ? sz * .9 : 0);
  return `<g opacity="${f1(cl(a * 1.4))}" transform="translate(${f1(x)} ${f1(y - 20 * (1 - eout(cl(a))))})"><rect x="${f1(-w / 2)}" y="${f1(-sz * 1.05)}" width="${f1(w)}" height="${f1(h)}" rx="14" fill="${K.ink}" opacity=".88" stroke="${col}" stroke-width="4"/>
    ${TX(txt, 0, 0, sz, col)}${sub ? `<text x="0" y="${f1(sz * .95)}" text-anchor="middle" fill="${K.white}" style="font-family:'Inter';font-weight:700;font-size:${f1(sz * .62)}px">${sub}</text>` : ''}</g>`;
}
export const crossOut = (x, y, r, p, col = K.red) => p <= 0 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="none" stroke="${col}" stroke-width="16" stroke-dasharray="${f1(2 * Math.PI * r)}" stroke-dashoffset="${f1(2 * Math.PI * r * (1 - cl(p * 1.6)))}"/><path d="M ${f1(x - r * .7)} ${f1(y - r * .7)} L ${f1(x - r * .7 + r * 1.4 * cl(p * 2 - .6))} ${f1(y - r * .7 + r * 1.4 * cl(p * 2 - .6))}" stroke="${col}" stroke-width="16" stroke-linecap="round" opacity="${p > .3 ? 1 : 0}"/>`;
export const check = (x, y, s, p, col = K.lime) => p <= 0 ? '' : `<path d="M ${f1(x - 40 * s)} ${f1(y)} L ${f1(x - 10 * s)} ${f1(y + 30 * s)} L ${f1(x + 46 * s)} ${f1(y - 36 * s)}" fill="none" stroke="${col}" stroke-width="${f1(16 * s)}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f1(160 * s)}" stroke-dashoffset="${f1(160 * s * (1 - cl(p)))}"/>`;
// pain zig-zag burst around (x, y); a = intensity 0..1
export function pain(x, y, r, a, t, seed = 1) {
  if (a <= .02) return '';
  let s = '';
  for (let i = 0; i < 7; i++) {
    const ang = (i / 7) * Math.PI * 2 + seed, rr = r + 14 * Math.sin(t * 9 + i * 2), L = 60 * a;
    const x0 = x + Math.cos(ang) * rr, y0 = y + Math.sin(ang) * rr, x1 = x + Math.cos(ang) * (rr + L), y1 = y + Math.sin(ang) * (rr + L);
    const nx = -Math.sin(ang) * 14, ny = Math.cos(ang) * 14;
    s += `<path d="M ${f1(x0)} ${f1(y0)} L ${f1(lerp(x0, x1, .35) + nx)} ${f1(lerp(y0, y1, .35) + ny)} L ${f1(lerp(x0, x1, .65) - nx)} ${f1(lerp(y0, y1, .65) - ny)} L ${f1(x1)} ${f1(y1)}" fill="none" stroke="${K.red}" stroke-width="9" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(cl(a))}"/>`;
  }
  return `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * 1.6)}" fill="url(#nRed)" opacity="${f1(cl(a))}"/>${s}`;
}

// ---- faces & heads. o.eyes 'open'|'wide'|'closed'|'half', o.brow 0..1 (fear/pain), o.mouth 'flat'|'o'|'grit'|'smile'|'down'|'talk', o.look/lookY -1..1, o.t
const face = (o, sk) => {
  const lk = (o.look || 0) * 9, ly = (o.lookY || 0) * 7, b = o.brow ?? 0, e = o.eyes || 'open';
  const eyes = e === 'closed' ? `<path d="M -30 2 q 12 8 24 0 M 6 2 q 12 8 24 0" fill="none" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/>`
    : e === 'half' ? `<path d="M -30 0 h 24 M 6 0 h 24" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/><circle cx="${-18 + lk}" cy="4" r="5" fill="${K.ink}"/><circle cx="${18 + lk}" cy="4" r="5" fill="${K.ink}"/>`
    : `<ellipse cx="-18" cy="0" rx="${e === 'wide' ? 13 : 11}" ry="${e === 'wide' ? 14 : 10}" fill="${K.white}" ${OL(3)}/><ellipse cx="18" cy="0" rx="${e === 'wide' ? 13 : 11}" ry="${e === 'wide' ? 14 : 10}" fill="${K.white}" ${OL(3)}/>
       <circle cx="${f1(-18 + lk)}" cy="${f1(ly)}" r="${e === 'wide' ? 5 : 6}" fill="${K.ink}"/><circle cx="${f1(18 + lk)}" cy="${f1(ly)}" r="${e === 'wide' ? 5 : 6}" fill="${K.ink}"/>`;
  const brows = `<path d="M -32 ${f1(-22 - 6 * b)} L -6 ${f1(-20 + (b > .5 ? -10 * b : 2))} M 32 ${f1(-22 - 6 * b)} L 6 ${f1(-20 + (b > .5 ? -10 * b : 2))}" stroke="${K.ink}" stroke-width="5.5" stroke-linecap="round"/>`;
  const m = o.mouth || 'flat', tt = o.t || 0;
  const mouth = m === 'o' ? `<ellipse cx="0" cy="38" rx="10" ry="13" fill="${K.ink}"/>`
    : m === 'grit' ? `<rect x="-20" y="30" width="40" height="16" rx="5" fill="${K.white}" ${OL(4)}/><path d="M -20 38 H 20 M -7 30 V 46 M 7 30 V 46" stroke="${K.ink}" stroke-width="2.5"/>`
    : m === 'smile' ? `<path d="M -16 32 q 16 13 32 0" fill="none" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/>`
    : m === 'down' ? `<path d="M -15 42 q 15 -10 30 0" fill="none" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/>`
    : m === 'talk' ? `<ellipse cx="0" cy="38" rx="13" ry="${f1(3 + 7 * Math.abs(Math.sin(tt * 11)))}" fill="${K.ink}"/>`
    : `<path d="M -13 38 h 26" stroke="${K.ink}" stroke-width="5" stroke-linecap="round"/>`;
  const sweat = o.sweat ? `<path d="M 50 -30 q 8 14 0 20 q -8 -6 0 -20 Z" fill="${K.cyanL}" opacity="${f1(o.sweat)}" ${OL(2)}/>` : '';
  return `<ellipse cx="-52" cy="8" rx="11" ry="16" fill="${sk}" ${OL(3)}/><ellipse cx="52" cy="8" rx="11" ry="16" fill="${sk}" ${OL(3)}/>${eyes}${brows}<path d="M 0 6 q -6 14 2 18" fill="none" stroke="${K.skinD}" stroke-width="4" stroke-linecap="round"/>${mouth}${sweat}`;
};
// who: 'du' | 'helpA' | 'helpB' | 'surg' | 'morton' | 'warren' | 'pt'
export function head(who, x, y, s, o = {}) {
  const sk = K.skin;
  let back = '', front = '';
  if (who === 'du') front = `<path d="M -58 -12 Q -64 -78 0 -80 Q 64 -78 58 -12 Q 46 -50 10 -52 Q -20 -40 -58 -12 Z" fill="${K.hairDu}" ${OL(4)}/>`;
  else if (who === 'helpA') front = `<path d="M -60 -20 Q -60 -82 0 -82 Q 60 -82 60 -20 Q 30 -46 -60 -20 Z" fill="#2E2A26" ${OL(4)}/><path d="M -70 -36 H 70 Q 64 -96 0 -98 Q -64 -96 -70 -36 Z" fill="#4A4A55" ${OL(4)}/>`;
  else if (who === 'helpB') front = `<path d="M -58 -10 Q -66 -80 0 -82 Q 66 -80 58 -10 Q 54 -50 0 -54 Q -54 -50 -58 -10 Z" fill="#A0522D" ${OL(4)}/>`;
  else if (who === 'surg') front = `<path d="M -60 0 Q -66 -72 -20 -78 Q 30 -84 62 -40 L 60 0 Q 50 -40 20 -48 Q -30 -44 -60 0 Z" fill="${K.hairG}" ${OL(4)}/><path d="M -48 30 Q -50 80 0 84 Q 50 80 48 30 Q 30 52 0 52 Q -30 52 -48 30 Z" fill="${K.hairG}" ${OL(3)}/>`;
  else if (who === 'morton') front = `<path d="M -60 -6 Q -70 -84 4 -84 Q 70 -80 60 -6 Q 52 -46 30 -56 Q -10 -40 -60 -6 Z" fill="${K.hairM}" ${OL(4)}/><path d="M -26 26 Q 0 16 26 26 Q 14 34 0 30 Q -14 34 -26 26 Z" fill="${K.hairM}"/>`;
  else if (who === 'warren') front = `<path d="M -62 10 Q -66 -40 -40 -58 L -40 -30 Q -52 -10 -54 14 Z M 62 10 Q 66 -40 40 -58 L 40 -30 Q 52 -10 54 14 Z" fill="${K.hairW}" ${OL(3)}/>`;
  else if (who === 'pt') front = `<path d="M -58 -10 Q -64 -80 0 -82 Q 64 -80 58 -10 Q 40 -48 0 -50 Q -40 -48 -58 -10 Z" fill="${K.hairM}" ${OL(4)}/><path d="M -54 20 Q -56 86 0 92 Q 56 86 54 20 Q 40 50 20 52 Q 0 46 -20 52 Q -40 50 -54 20 Z" fill="${K.hairM}" ${OL(3)}/>`;
  const fo = who === 'surg' || who === 'pt' ? { ...o, mouth: o.mouth === 'o' || o.mouth === 'talk' ? o.mouth : o.mouth } : o;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s)})">${back}<ellipse cx="0" cy="0" rx="58" ry="66" fill="${sk}" ${OL(4)}/>${face(fo, sk)}${front}</g>`;
}
// arm: shoulder → elbow → hand, sleeve colour; o.cuff (shirt cuff colour), o.held svg after the hand, o.fist
export function arm(sh, el, hd, s, col, o = {}) {
  const d = `M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(hd[0])} ${f1(hd[1])}`;
  const fore = o.bare ? `<path d="M ${f1(el[0])} ${f1(el[1])} L ${f1(hd[0])} ${f1(hd[1])}" fill="none" stroke="${K.ink}" stroke-width="${f1(38 * s + 8)}" stroke-linecap="round"/><path d="M ${f1(el[0])} ${f1(el[1])} L ${f1(hd[0])} ${f1(hd[1])}" fill="none" stroke="${K.skin}" stroke-width="${f1(38 * s)}" stroke-linecap="round"/>` : '';
  const upper = o.bare ? `M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])}` : d;
  return `<path d="${upper}" fill="none" stroke="${K.ink}" stroke-width="${f1(46 * s + 8)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${upper}" fill="none" stroke="${col}" stroke-width="${f1(46 * s)}" stroke-linecap="round" stroke-linejoin="round"/>${fore}
    <circle cx="${f1(hd[0])}" cy="${f1(hd[1])}" r="${f1(25 * s)}" fill="${K.skin}" ${OL(4)}/>${o.held || ''}`;
}
const ROLE = {
  du: { coat: K.shirt, shirt: K.shirt, tr: K.trous, cravat: null },
  helpA: { coat: K.vestA, shirt: K.shirt, tr: K.trous, bare: true },
  helpB: { coat: K.vestB, shirt: K.shirt, tr: '#3A3328', bare: true },
  surg: { coat: K.coatB, shirt: K.shirt, tr: K.trous, cravat: K.ink, apron: true },
  morton: { coat: K.coatBr, shirt: K.shirt, tr: '#2A2018', cravat: K.ink },
  warren: { coat: K.coatB, shirt: K.shirt, tr: K.coatB, cravat: K.white },
  pt: { coat: K.pt46, shirt: K.pt46, tr: '#3A3F55', cravat: null },
};
// standing figure, origin = between the feet on the floor, ~720·s tall. o.aL/o.aR = [[elbow],[hand]] absolute; o.heldL/o.heldR; o.step (walk phase, 0 = still); o.lean px of the upper body; o.noLegs
export function figure(who, x, y, s, o = {}) {
  const R = ROLE[who], lean = (o.lean || 0) * s, st = o.step || 0;
  const hipY = y - 330 * s, shY = y - 590 * s, hx = x + lean * .3;
  const legs = o.noLegs ? '' : [-1, 1].map(sd => { const sw = Math.sin(st) * 26 * s * sd; const fx = x + sd * 40 * s + sw; return `<path d="M ${f1(hx + sd * 40 * s)} ${f1(hipY)} L ${f1(fx)} ${f1(y - 20 * s)}" stroke="${K.ink}" stroke-width="${f1(62 * s + 8)}" stroke-linecap="round"/><path d="M ${f1(hx + sd * 40 * s)} ${f1(hipY)} L ${f1(fx)} ${f1(y - 20 * s)}" stroke="${R.tr}" stroke-width="${f1(62 * s)}" stroke-linecap="round"/><ellipse cx="${f1(fx + sd * 10 * s)}" cy="${f1(y - 8 * s - Math.max(0, Math.sin(st) * sd) * 10 * s)}" rx="${f1(46 * s)}" ry="${f1(18 * s)}" fill="#1A1410" ${OL(3)}/>`; }).join('');
  const tx = x + lean, w = 100 * s;
  const torso = `<path d="M ${f1(tx - w)} ${f1(shY)} Q ${f1(tx - w - 10 * s)} ${f1(hipY - 60 * s)} ${f1(hx - w * .85)} ${f1(hipY + 30 * s)} L ${f1(hx + w * .85)} ${f1(hipY + 30 * s)} Q ${f1(tx + w + 10 * s)} ${f1(hipY - 60 * s)} ${f1(tx + w)} ${f1(shY)} Q ${f1(tx)} ${f1(shY - 24 * s)} ${f1(tx - w)} ${f1(shY)} Z" fill="${R.coat}" ${OL()}/>
    <path d="M ${f1(tx - 34 * s)} ${f1(shY - 6 * s)} L ${f1(tx)} ${f1(shY + 90 * s)} L ${f1(tx + 34 * s)} ${f1(shY - 6 * s)} Z" fill="${R.shirt}" ${OL(3)}/>
    ${R.cravat ? `<path d="M ${f1(tx - 20 * s)} ${f1(shY + 4 * s)} L ${f1(tx + 20 * s)} ${f1(shY + 4 * s)} L ${f1(tx)} ${f1(shY + 34 * s)} Z" fill="${R.cravat}" ${OL(2)}/>` : ''}
    ${R.apron ? `<path d="M ${f1(tx - 70 * s)} ${f1(shY + 110 * s)} L ${f1(tx + 70 * s)} ${f1(shY + 110 * s)} L ${f1(hx + 80 * s)} ${f1(y - 120 * s)} L ${f1(hx - 80 * s)} ${f1(y - 120 * s)} Z" fill="${K.apron}" ${OL(3)}/>` : ''}
    ${R.bare ? `<path d="M ${f1(tx - w + 8 * s)} ${f1(shY + 10 * s)} L ${f1(tx - 34 * s)} ${f1(shY + 4 * s)} M ${f1(tx + w - 8 * s)} ${f1(shY + 10 * s)} L ${f1(tx + 34 * s)} ${f1(shY + 4 * s)}" stroke="${K.shirt}" stroke-width="${f1(26 * s)}"/>` : ''}`;
  const sleeve = R.bare ? K.shirt : R.coat;
  const one = (pts, sd, held) => { const sh = [tx + sd * (w - 14 * s), shY + 30 * s]; const p = pts || [[sh[0] + sd * 22 * s, sh[1] + 150 * s], [sh[0] + sd * 18 * s, sh[1] + 290 * s]]; return arm(sh, p[0], p[1], s, sleeve, { held, bare: R.bare }); };
  if (o.armsOnly) return `${o.noL ? '' : one(o.aL, -1, o.heldL)}${o.noR ? '' : one(o.aR, 1, o.heldR)}`;
  const hd = head(who, tx + (o.hx || 0) * s, shY - 90 * s + (o.hy || 0) * s, s, o);
  const back = o.armsBack ? `${o.noL ? '' : one(o.aL, -1, o.heldL)}${o.noR ? '' : one(o.aR, 1, o.heldR)}` : '';
  const front = o.armsBack ? '' : `${o.noL ? '' : one(o.aL, -1, o.heldL)}${o.noR ? '' : one(o.aR, 1, o.heldR)}`;
  return `${back}${legs}${torso}${o.front || ''}${hd}${front}`;
}
// shoulder positions of a figure (to aim arms)
export const shoulders = (x, y, s, lean = 0) => [[x + lean * s - 86 * s, y - 560 * s], [x + lean * s + 86 * s, y - 560 * s]];

// ---- operating table (side view): top surface y, from x0 to x1
export const table = (x0, x1, y) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="44" rx="6" fill="${K.wood}" ${OL()}/><path d="M ${x0 + 10} ${y + 14} H ${x1 - 10}" stroke="${K.woodL}" stroke-width="5"/>
  ${[x0 + 50, x1 - 70].map(lx => `<rect x="${lx}" y="${y + 44}" width="30" height="230" fill="${K.woodD}" ${OL(4)}/>`).join('')}<rect x="${x0 + 50}" y="${y + 190}" width="${x1 - x0 - 90}" height="18" fill="${K.woodD}" ${OL(3)}/>`;
// patient lying on the table: head at (x, y) (top of table = y + 70), body to the right, ~760 long. o.lift (head raise px), o.jerk (px body twitch), o.face (head opts), o.armUp (0..1 raises the free arm), o.holdShoulder / o.holdLeg (svg drawn over)
export function lying(x, y, s, o = {}) {
  const j = o.jerk || 0, lift = o.lift || 0;
  const by = y + 20 * s;
  const sheet = `<path d="M ${f1(x + 90 * s)} ${f1(by - 34 * s + j * .4)} Q ${f1(x + 260 * s)} ${f1(by - 70 * s + j)} ${f1(x + 420 * s)} ${f1(by - 46 * s + j * .5)} Q ${f1(x + 600 * s)} ${f1(by - 40 * s)} ${f1(x + 720 * s)} ${f1(by - 62 * s)} Q ${f1(x + 790 * s)} ${f1(by - 70 * s)} ${f1(x + 800 * s)} ${f1(by + 40 * s)} L ${f1(x + 90 * s)} ${f1(by + 50 * s)} Z" fill="${K.sheet}" ${OL()}/>
    <path d="M ${f1(x + 460 * s)} ${f1(by - 30 * s)} Q ${f1(x + 600 * s)} ${f1(by - 10 * s)} ${f1(x + 760 * s)} ${f1(by - 20 * s)}" fill="none" stroke="${K.sheetD}" stroke-width="${f1(6 * s)}"/>`;
  const shirt = `<path d="M ${f1(x + 30 * s)} ${f1(by - 46 * s + j * .3)} Q ${f1(x + 60 * s)} ${f1(by - 74 * s + j * .6)} ${f1(x + 130 * s)} ${f1(by - 60 * s + j * .6)} L ${f1(x + 130 * s)} ${f1(by + 46 * s)} L ${f1(x + 30 * s)} ${f1(by + 46 * s)} Z" fill="${K.shirt}" ${OL()}/>`;
  const pillow = `<path d="M ${f1(x - 120 * s)} ${f1(by + 46 * s)} Q ${f1(x - 130 * s)} ${f1(by - 10 * s)} ${f1(x - 60 * s)} ${f1(by - 4 * s)} L ${f1(x + 40 * s)} ${f1(by - 4 * s)} Q ${f1(x + 70 * s)} ${f1(by + 20 * s)} ${f1(x + 60 * s)} ${f1(by + 46 * s)} Z" fill="${K.white}" ${OL()}/>`;
  const au = o.armUp || 0;
  const freeArm = arm([x + 110 * s, by - 50 * s + j * .6], [x + lerp(230, 190, au) * s, by - lerp(30, 140, au) * s + j], [x + lerp(340, 250, au) * s, by - lerp(36, 200, au) * s + j], s, K.shirt, { held: o.heldHand || '' });
  const hd = head('du', x - 10 * s, by - 54 * s - lift, s, { tilt: -12 + (o.tiltAdd || 0), ...(o.face || {}) });
  return `${pillow}${sheet}${shirt}${hd}${o.noArm ? '' : freeArm}${o.over || ''}`;
}
// saw (bone saw shape, handle at origin, blade to the right); knife; instruments tray
export const saw = (x, y, s = 1, rot = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><path d="M 20 -24 H 250 V 22 H 20 Z" fill="${K.steel}" ${OL(4)}/><path d="M 20 22 ${[...Array(12)].map((_, i) => `L ${32 + i * 19} 34 L ${42 + i * 19} 22`).join(' ')}" fill="${K.steel}" ${OL(3)}/><rect x="-44" y="-30" width="70" height="60" rx="16" fill="${K.woodL}" ${OL(4)}/><rect x="-26" y="-12" width="34" height="24" rx="8" fill="${K.woodD}"/></g>`;
export const knife = (x, y, s = 1, rot = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><rect x="-90" y="-11" width="100" height="22" rx="8" fill="${K.woodL}" ${OL(3)}/><path d="M 10 -9 H 110 Q 140 -6 150 6 H 10 Z" fill="${K.steel}" ${OL(3)}/></g>`;
export const tray = (x, y, s = 1, o = {}) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M -230 0 H 230 L 210 40 H -210 Z" fill="${K.steelD}" ${OL(4)}/><path d="M -226 0 H 226" stroke="${K.steel}" stroke-width="6"/></g>
  ${o.noSaw ? '' : saw(x - 160 * s, y - 18 * s, s * .7)}${o.noKnife ? '' : knife(x + 110 * s, y - 14 * s, s * .7, 4)}<path d="M ${f1(x + 10 * s)} ${f1(y - 14 * s)} q 30 -20 60 0 q 30 20 60 0" fill="none" stroke="${K.paper}" stroke-width="${f1(6 * s)}"/>`;
// glass ether inhaler: globe with sponge, mouthpiece tube to the right; origin = globe centre
export const inhaler = (x, y, s = 1, rot = 0, vap = 0, t = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})">
  <path d="M 70 -10 Q 150 -10 200 10 L 200 34 Q 150 20 70 20 Z" fill="${K.glass}" opacity=".85" ${OL(3)}/><rect x="196" y="4" width="34" height="36" rx="8" fill="${K.woodL}" ${OL(3)}/>
  <path d="M -10 -86 V -130 H 22 V -86" fill="${K.glass}" ${OL(3)}/><rect x="-16" y="-146" width="44" height="20" rx="6" fill="${K.woodL}" ${OL(3)}/>
  <circle cx="6" cy="0" r="90" fill="${K.glass}" opacity=".55" ${OL(4)}/><ellipse cx="6" cy="30" rx="56" ry="36" fill="${K.paper}" opacity=".9"/>
  <circle cx="6" cy="0" r="90" fill="url(#nCyan)" opacity="${f1(.3 + .6 * vap)}"/><path d="M -46 -50 Q -30 -70 -6 -74" fill="none" stroke="${K.white}" stroke-width="7" stroke-linecap="round" opacity=".8"/></g>`;
// ether vapour wisps flowing from (x0,y0) to (x1,y1), a = amount
export function vapour(x0, y0, x1, y1, a, t) {
  if (a <= .02) return '';
  let s = '';
  for (let i = 0; i < 6; i++) {
    const p = ((t * .9 + i / 6) % 1), x = lerp(x0, x1, p), y = lerp(y0, y1, p) + 16 * Math.sin(t * 5 + i * 1.7), r = 14 + 22 * p;
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="${K.cyan}" opacity="${f1(a * .45 * Math.sin(p * Math.PI))}"/>`;
  }
  return s;
}
// pocket watch; ang = minute-hand degrees, sec = second-hand degrees
export const watch = (x, y, r, ang, sec, o = {}) => `<g transform="translate(${f1(x)} ${f1(y)})"><circle cx="0" cy="${f1(-r - 26)}" r="22" fill="none" stroke="${K.lamp}" stroke-width="10"/><circle r="${f1(r + 16)}" fill="#C8A04A" ${OL(5)}/><circle r="${f1(r)}" fill="${K.paper}" ${OL(4)}/>
  ${o.arc ? `<path d="M 0 0 L 0 ${f1(-r * .9)} A ${f1(r * .9)} ${f1(r * .9)} 0 ${o.arc > 180 ? 1 : 0} 1 ${f1(Math.sin(o.arc * Math.PI / 180) * r * .9)} ${f1(-Math.cos(o.arc * Math.PI / 180) * r * .9)} Z" fill="${o.arcCol || K.red}" opacity=".5"/>` : ''}
  ${[...Array(12)].map((_, i) => { const a = i * Math.PI / 6; return `<path d="M ${f1(Math.sin(a) * r * .82)} ${f1(-Math.cos(a) * r * .82)} L ${f1(Math.sin(a) * r * .94)} ${f1(-Math.cos(a) * r * .94)}" stroke="${K.ink}" stroke-width="${i % 3 ? 4 : 8}"/>`; }).join('')}
  <path d="M 0 0 L ${f1(Math.sin(ang * Math.PI / 180) * r * .72)} ${f1(-Math.cos(ang * Math.PI / 180) * r * .72)}" stroke="${K.ink}" stroke-width="10" stroke-linecap="round"/>
  <path d="M 0 0 L ${f1(Math.sin(sec * Math.PI / 180) * r * .86)} ${f1(-Math.cos(sec * Math.PI / 180) * r * .86)}" stroke="${K.red}" stroke-width="5" stroke-linecap="round"/><circle r="10" fill="${K.ink}"/></g>`;
// pain gauge: vertical bar, v 0..1
export function gauge(x, y, h, v, a = 1, lbl = 'SCHMERZ') {
  if (a <= .01) return '';
  const fh = h * cl(v), col = v > .66 ? K.red : v > .33 ? K.orange : K.lime;
  return `<g opacity="${f1(cl(a))}"><rect x="${f1(x - 60)}" y="${f1(y - h)}" width="120" height="${f1(h)}" rx="26" fill="${K.ink}" opacity=".8" stroke="${K.white}" stroke-width="5"/>
    <rect x="${f1(x - 44)}" y="${f1(y - 16 - (h - 32) * cl(v))}" width="88" height="${f1((h - 32) * cl(v))}" rx="16" fill="${col}"/>${TX(lbl, x, y - h - 30, 50, K.white)}</g>`;
}
// bacterium: rod with flagellum (lime), angle a
export const bact = (x, y, s, a, t = 0) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(a)}) scale(${f1(s)})"><path d="M -40 0 q -20 ${f1(10 * Math.sin(t * 9))} -40 0 q -20 ${f1(-10 * Math.sin(t * 9))} -36 4" fill="none" stroke="${K.limeD}" stroke-width="5" stroke-linecap="round"/><rect x="-40" y="-17" width="80" height="34" rx="17" fill="${K.lime}" ${OL(4)}/><circle cx="-10" cy="-3" r="5" fill="${K.limeD}"/><circle cx="14" cy="4" r="4" fill="${K.limeD}"/></g>`;
// tiered audience (amphitheatre rows), behind everything; figures = simple heads/shoulders. lean 0..1 makes them lean forward
export function audience(t, y0 = 300, rows = 4, lean = 0, seed = 1) {
  let s = '';
  for (let r = 0; r < rows; r++) {
    const y = y0 + r * 150, n = 9 - r % 2;
    s += `<rect x="-80" y="${y + 70}" width="1240" height="80" fill="${K.woodD}" ${OL(3)}/><path d="M -80 ${y + 82} H 1160" stroke="${K.wood}" stroke-width="6"/>`;
    for (let i = 0; i < n; i++) {
      const x = 60 + i * 125 + (r % 2) * 62 + (hash(i + r * 9 + seed) - .5) * 30, col = [K.coatB, K.coatBr, '#3A3F55', '#4B3A2E'][Math.floor(hash(i * 3 + r + seed) * 4)];
      const ly = lean * (8 + 10 * hash(i + r)), bob = Math.sin(t * 1.3 + i + r) * 2;
      s += `<path d="M ${x - 46} ${y + 76} Q ${x - 46} ${y + 10 + ly} ${x} ${y + 6 + ly} Q ${x + 46} ${y + 10 + ly} ${x + 46} ${y + 76} Z" fill="${col}" ${OL(3)}/><circle cx="${x}" cy="${f1(y - 22 + ly + bob)}" r="30" fill="${K.skinD}" ${OL(3)}/><path d="M ${x - 30} ${f1(y - 28 + ly + bob)} Q ${x} ${f1(y - 66 + ly + bob)} ${x + 30} ${f1(y - 28 + ly + bob)} Z" fill="${['#22180F', '#5A3A22', '#9A9AA6', '#3A2A1A'][Math.floor(hash(i + r * 5 + seed) * 4)]}"/>`;
    }
  }
  return s;
}
// tall arched windows/dome skylight wall for the 1846 theatre
export const theatreWall = () => `${BG('url(#nWall)')}<path d="M 140 -40 Q 540 -260 940 -40 V 120 H 140 Z" fill="#2F3D78" ${OL(4)}/>${[260, 400, 540, 680, 820].map(x => `<path d="M ${x} 120 V -10" stroke="${K.ink}" stroke-width="5"/>`).join('')}<ellipse cx="540" cy="140" rx="560" ry="240" fill="#6F86C8" opacity=".18"/>`;
// seated patient 1846 (front view) on a wooden chair: (x, y) = floor between feet. o.face, o.aL/aR, o.heldR
export function seated(x, y, s, o = {}) {
  const seatY = y - 260 * s, shY = seatY - 300 * s;
  const chair = `<rect x="${f1(x - 150 * s)}" y="${f1(shY - 120 * s)}" width="${f1(300 * s)}" height="${f1(seatY - shY + 120 * s)}" rx="${f1(30 * s)}" fill="${K.woodD}" ${OL()}/><rect x="${f1(x - 170 * s)}" y="${f1(seatY - 10 * s)}" width="${f1(340 * s)}" height="${f1(40 * s)}" rx="8" fill="${K.wood}" ${OL()}/>
    ${[-150, 130].map(dx => `<rect x="${f1(x + dx * s)}" y="${f1(seatY + 30 * s)}" width="${f1(22 * s)}" height="${f1(230 * s)}" fill="${K.woodD}" ${OL(3)}/>`).join('')}`;
  const legs = [-1, 1].map(sd => `<path d="M ${f1(x + sd * 50 * s)} ${f1(seatY)} L ${f1(x + sd * 58 * s)} ${f1(seatY + 40 * s)} L ${f1(x + sd * 64 * s)} ${f1(y - 20 * s)}" fill="none" stroke="${K.ink}" stroke-width="${f1(66 * s + 8)}" stroke-linecap="round" stroke-linejoin="round"/><path d="M ${f1(x + sd * 50 * s)} ${f1(seatY)} L ${f1(x + sd * 58 * s)} ${f1(seatY + 40 * s)} L ${f1(x + sd * 64 * s)} ${f1(y - 20 * s)}" fill="none" stroke="#3A3F55" stroke-width="${f1(66 * s)}" stroke-linecap="round" stroke-linejoin="round"/><ellipse cx="${f1(x + sd * 74 * s)}" cy="${f1(y - 8 * s)}" rx="${f1(44 * s)}" ry="${f1(17 * s)}" fill="#1A1410" ${OL(3)}/>`).join('');
  const w = 100 * s;
  const torso = `<path d="M ${f1(x - w)} ${f1(shY)} Q ${f1(x - w - 8 * s)} ${f1(seatY - 80 * s)} ${f1(x - w * .9)} ${f1(seatY + 20 * s)} L ${f1(x + w * .9)} ${f1(seatY + 20 * s)} Q ${f1(x + w + 8 * s)} ${f1(seatY - 80 * s)} ${f1(x + w)} ${f1(shY)} Q ${f1(x)} ${f1(shY - 24 * s)} ${f1(x - w)} ${f1(shY)} Z" fill="${K.pt46}" ${OL()}/><path d="M ${f1(x - 30 * s)} ${f1(shY - 4 * s)} L ${f1(x)} ${f1(shY + 60 * s)} L ${f1(x + 30 * s)} ${f1(shY - 4 * s)}" fill="${K.shirtD}" ${OL(3)}/>`;
  const one = (pts, sd, held) => { const sh = [x + sd * (w - 14 * s), shY + 30 * s]; const p = pts || [[sh[0] + sd * 30 * s, sh[1] + 160 * s], [x + sd * 70 * s, seatY - 10 * s]]; return arm(sh, p[0], p[1], s, K.pt46, { held }); };
  return `${chair}${legs}${torso}${o.neck || ''}${head('pt', x + (o.hx || 0) * s, shY - 90 * s + (o.hy || 0) * s, s, o.face || {})}${o.over || ''}${one(o.aL, -1, o.heldL)}${one(o.aR, 1, o.heldR)}`;
}
// speech bubble with content (content svg centred at (x, y))
export const bubble = (x, y, w, h, a, inner, tailX, tailY) => a <= .01 ? '' : `<g opacity="${f1(cl(a * 1.5))}"><path d="M ${f1(x - w / 2 + 30)} ${f1(y - h / 2)} H ${f1(x + w / 2 - 30)} Q ${f1(x + w / 2)} ${f1(y - h / 2)} ${f1(x + w / 2)} ${f1(y - h / 2 + 30)} V ${f1(y + h / 2 - 30)} Q ${f1(x + w / 2)} ${f1(y + h / 2)} ${f1(x + w / 2 - 30)} ${f1(y + h / 2)} H ${f1(x + 40)} L ${f1(tailX)} ${f1(tailY)} L ${f1(x - 30)} ${f1(y + h / 2)} H ${f1(x - w / 2 + 30)} Q ${f1(x - w / 2)} ${f1(y + h / 2)} ${f1(x - w / 2)} ${f1(y + h / 2 - 30)} V ${f1(y - h / 2 + 30)} Q ${f1(x - w / 2)} ${f1(y - h / 2)} ${f1(x - w / 2 + 30)} ${f1(y - h / 2)} Z" fill="${K.white}" ${OL(5)}/>${inner}</g>`;
// hospital bed (side view), mattress top y
export const bed = (x0, x1, y) => `<rect x="${x0}" y="${y}" width="${x1 - x0}" height="60" rx="14" fill="${K.white}" ${OL()}/><rect x="${x0 - 20}" y="${y - 150}" width="26" height="420" fill="#5B5F73" ${OL(4)}/><rect x="${x1 - 6}" y="${y - 80}" width="26" height="350" fill="#5B5F73" ${OL(4)}/><rect x="${x0}" y="${y + 60}" width="${x1 - x0}" height="18" fill="#5B5F73" ${OL(3)}/>`;
// candle in holder at (x, y) = base; h 0..1 remaining wax; flame 0..1
export const candle = (x, y, h = 1, fl = 1, t = 0) => `<ellipse cx="${x}" cy="${y}" rx="60" ry="16" fill="#C8A04A" ${OL(4)}/><rect x="${x - 18}" y="${f1(y - 20 - 140 * h)}" width="36" height="${f1(140 * h + 10)}" fill="${K.paper}" ${OL(4)}/>
  ${fl > .02 ? `<ellipse cx="${x}" cy="${f1(y - 60 - 140 * h)}" rx="${f1(160 * fl)}" ry="${f1(160 * fl)}" fill="url(#nLamp)"/><path d="M ${x} ${f1(y - 20 - 140 * h - 50 * fl + 3 * Math.sin(t * 13))} Q ${x + 14 * fl} ${f1(y - 36 - 140 * h)} ${x} ${f1(y - 22 - 140 * h)} Q ${x - 14 * fl} ${f1(y - 36 - 140 * h)} ${x} ${f1(y - 20 - 140 * h - 50 * fl + 3 * Math.sin(t * 13))} Z" fill="${K.lamp}" stroke="${K.orange}" stroke-width="3"/>` : ''}
  <path d="M ${x} ${f1(y - 20 - 140 * h)} v -14" stroke="${K.ink}" stroke-width="4"/>`;
