// v69 "Im Aufzug eingeschlossen" — kit for this video only (style: jobs/v69/style.md).
// Channel 1 look: cold charcoal darkness, one warm amber light (your phone torch), red only for danger, 6 px outlines.
// Cast (kept identical in every shot): du = teal jacket, short brown hair; Mann = grey hoodie, beard;
// Frau = navy coat, mustard scarf, bun; Kind = yellow raincoat with hood down.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  bg: '#141A1F', bg2: '#1E2A30', moss: '#24363A', ink: '#0B0F12', amber: '#FFB547', amberL: '#FFD58A', red: '#E5484D', white: '#F2F4F5', mono: '#E6EAEC',
  skin: '#E8B38A', skinD: '#B98462', steel: '#3A464E', steelL: '#56646D', steelD: '#27323A', floor: '#2C2A28', panel: '#1A2228',
  you: '#2E8C84', youD: '#1F625C', man: '#6E7680', manD: '#4E555E', wom: '#2E3E66', womD: '#1F2B4A', scarf: '#C99A2E', kid: '#E8C547', kidD: '#B8962E',
  hairY: '#5A3A28', hairM: '#2A2622', hairW: '#7A4A2A', hairK: '#3A2A1E', hiviz: '#E9F23A', fire: '#B8352F',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 6) => `stroke="${K.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const BG = (f = K.bg) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${f}"/>`;
export const DEFS = `<defs>
<radialGradient id="eTorch" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFD58A" stop-opacity=".55"/><stop offset=".6" stop-color="#FFB547" stop-opacity=".18"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
<radialGradient id="eDark" cx=".5" cy=".5" r=".5"><stop offset=".35" stop-color="#05080A" stop-opacity="0"/><stop offset="1" stop-color="#05080A" stop-opacity=".82"/></radialGradient>
<radialGradient id="eRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E5484D" stop-opacity=".45"/><stop offset="1" stop-color="#E5484D" stop-opacity="0"/></radialGradient>
<linearGradient id="eBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFD58A" stop-opacity=".5"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></linearGradient>
</defs>`;
// warm pool of torch light + darkness around it (cx, cy, r)
export const light = (cx, cy, r, a = 1) => `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="url(#eTorch)" opacity="${f1(a)}"/>`;
export const dark = (a = 1) => `<rect x="-60" y="-60" width="1200" height="2040" fill="#05080A" opacity="${f1(.6 * a)}"/>`;
export const label = (x, y, txt, a = 1, col = K.mono, sz = 52) => a <= .01 ? '' : `<g opacity="${f1(cl(a))}"><rect x="${f1(x - (txt.length * sz * .33 + 26))}" y="${f1(y - sz * .82)}" width="${f1(txt.length * sz * .66 + 52)}" height="${f1(sz * 1.3)}" fill="#05080A" stroke="${col}" stroke-width="3"/>${TX(txt, x, y + sz * .12, sz, col)}</g>`;
export const crossOut = (x, y, r, p) => p <= 0 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="none" stroke="${K.red}" stroke-width="14" opacity="${f1(cl(p * 2))}"/><path d="M ${f1(x - r * .7)} ${f1(y - r * .7)} L ${f1(x - r * .7 + r * 1.4 * p)} ${f1(y - r * .7 + r * 1.4 * p)}" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/>`;

// --- people (bust/half figures; origin at the shoulder-line centre). o.look -1..1, o.mouth, o.brow (0 calm, 1 worried), o.tears, o.dir
const face = (o, s) => {
  const lk = (o.look || 0) * 8, ly = (o.lookY || 0) * 6, b = o.brow ?? 0;
  const eyes = o.closed ? `<path d="M ${-24 + lk} 0 q 9 6 18 0 M ${6 + lk} 0 q 9 6 18 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : `<circle cx="${-16 + lk}" cy="${ly}" r="5.5" fill="${K.ink}"/><circle cx="${16 + lk}" cy="${ly}" r="5.5" fill="${K.ink}"/>`;
  const brows = `<path d="M ${-28 + lk} ${-20 - 4 * b} l 20 ${f1(b > .5 ? -6 : 2)} M ${28 + lk} ${-20 - 4 * b} l -20 ${f1(b > .5 ? -6 : 2)}" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  const m = o.mouth === 'o' ? `<ellipse cx="${lk}" cy="28" rx="8" ry="10" fill="${K.ink}"/>` : o.mouth === 'cry' ? `<path d="M ${lk - 16} 32 q 16 -16 32 0 Z" fill="${K.ink}"/>` : o.mouth === 'talk' ? `<ellipse cx="${lk}" cy="27" rx="10" ry="${f1(4 + 5 * Math.abs(Math.sin((o.t || 0) * 14)))}" fill="${K.ink}"/>` : o.mouth === 'down' ? `<path d="M ${lk - 12} 31 q 12 -8 24 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : o.mouth === 'smile' ? `<path d="M ${lk - 12} 25 q 12 9 24 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : `<path d="M ${lk - 11} 28 h 22" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`;
  const tears = o.tears ? `<path d="M ${-18 + lk} 10 q -4 14 0 22 q 6 -8 0 -22 Z M ${18 + lk} 10 q -4 14 0 22 q 6 -8 0 -22 Z" fill="#8FD0F0" opacity="${f1(o.tears)}"/>` : '';
  return eyes + brows + m + tears;
};
export function headOf(who, x, y, s, o = {}) {
  const hair = { you: `<path d="M -56 -8 Q -58 -72 0 -72 Q 58 -72 56 -8 Q 34 -44 -20 -40 Q -42 -34 -56 -8 Z" fill="${K.hairY}" ${OL(4)}/>`,
    man: `<path d="M -56 -14 Q -56 -70 0 -70 Q 56 -70 56 -14 Q 30 -38 -30 -38 Z" fill="${K.hairM}" ${OL(4)}/><path d="M -50 10 Q -46 64 0 66 Q 46 64 50 10 Q 30 40 0 40 Q -30 40 -50 10 Z" fill="${K.hairM}" ${OL(4)}/>`,
    wom: `<circle cx="0" cy="-76" r="26" fill="${K.hairW}" ${OL(4)}/><path d="M -58 4 Q -60 -70 0 -70 Q 60 -70 58 4 Q 50 -40 0 -44 Q -50 -40 -58 4 Z" fill="${K.hairW}" ${OL(4)}/>`,
    kid: `<path d="M -50 -6 Q -50 -62 0 -62 Q 50 -62 50 -6 Q 26 -30 -26 -30 Z" fill="${K.hairK}" ${OL(4)}/>` }[who];
  const rx = who === 'kid' ? 48 : 54, ry = who === 'kid' ? 52 : 60;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s)})"><ellipse cx="0" cy="0" rx="${rx}" ry="${ry}" fill="${K.skin}" ${OL(4)}/>${who === 'man' ? hair + face(o, s) : face(o, s) + hair}</g>`;
}
// half figure: torso from shoulders (x, y) down to y + 360·s, head above; arms: o.aL/o.aR = [[elbow],[hand]] absolute coords or null for hanging
export function bust(who, x, y, s, o = {}) {
  const col = { you: K.you, man: K.man, wom: K.wom, kid: K.kid }[who], colD = { you: K.youD, man: K.manD, wom: K.womD, kid: K.kidD }[who];
  const w = (who === 'kid' ? 70 : 92) * s, h = (who === 'kid' ? 260 : 380) * s;
  const torso = `<path d="M ${f1(x - w)} ${f1(y + 20 * s)} Q ${f1(x - w - 10 * s)} ${f1(y + h * .6)} ${f1(x - w + 6 * s)} ${f1(y + h)} L ${f1(x + w - 6 * s)} ${f1(y + h)} Q ${f1(x + w + 10 * s)} ${f1(y + h * .6)} ${f1(x + w)} ${f1(y + 20 * s)} Q ${f1(x)} ${f1(y - 14 * s)} ${f1(x - w)} ${f1(y + 20 * s)} Z" fill="${col}" ${OL()}/>`;
  const extra = who === 'wom' ? `<path d="M ${f1(x - 50 * s)} ${f1(y + 4 * s)} Q ${f1(x)} ${f1(y + 40 * s)} ${f1(x + 50 * s)} ${f1(y + 4 * s)} L ${f1(x + 30 * s)} ${f1(y + 90 * s)} L ${f1(x + 10 * s)} ${f1(y + 40 * s)} Z" fill="${K.scarf}" ${OL(4)}/>` : who === 'man' ? `<path d="M ${f1(x - 30 * s)} ${f1(y + 60 * s)} v ${f1(60 * s)} M ${f1(x + 30 * s)} ${f1(y + 60 * s)} v ${f1(60 * s)}" stroke="${K.white}" stroke-width="${f1(5 * s)}"/>` : who === 'you' ? `<path d="M ${x} ${f1(y + 10 * s)} V ${f1(y + h)}" stroke="${colD}" stroke-width="${f1(6 * s)}"/>` : `<path d="M ${f1(x - 60 * s)} ${f1(y + 10 * s)} Q ${x} ${f1(y - 30 * s)} ${f1(x + 60 * s)} ${f1(y + 10 * s)}" fill="${colD}" ${OL(4)}/>`;
  const arm = (pts, side) => { const sh = [x + side * (w - 14 * s), y + 30 * s]; const p = pts || [[sh[0] + side * 16 * s, sh[1] + 150 * s], [sh[0] + side * 10 * s, sh[1] + 290 * s]]; const d = `M ${f1(sh[0])} ${f1(sh[1])} L ${f1(p[0][0])} ${f1(p[0][1])} L ${f1(p[1][0])} ${f1(p[1][1])}`; return `<path d="${d}" fill="none" stroke="${K.ink}" stroke-width="${f1(44 * s + 8)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f1(44 * s)}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${f1(p[1][0])}" cy="${f1(p[1][1])}" r="${f1(20 * s)}" fill="${K.skin}" ${OL(4)}/>`; };
  const hy = y - (who === 'kid' ? 70 : 84) * s;
  return `${o.armsBehind ? arm(o.aL, -1) + arm(o.aR, 1) : ''}${torso}${extra}${headOf(who, x + (o.hx || 0) * s, hy, s, o)}${o.armsBehind ? '' : (o.noL ? '' : arm(o.aL, -1)) + (o.noR ? '' : arm(o.aR, 1))}`;
}
// phone in a hand at (x, y); torch on → warm light toward ang (deg)
export function phone(x, y, s = 1, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s)})"><rect x="-26" y="-48" width="52" height="96" rx="10" fill="#15191C" ${OL(4)}/>${o.screen ? `<rect x="-20" y="-40" width="40" height="78" rx="4" fill="${o.screen}"/>` : ''}${o.torch ? `<circle cx="0" cy="-36" r="6" fill="${K.amberL}"/>` : ''}</g>`;
}
// cabin interior seen from the back wall toward the door (fills frame). o.lit 0..1 (ceiling light), door gap 0..1
export function cabin(t, o = {}) {
  const lit = o.lit ?? 0, gap = o.gap || 0;
  const dx = 120 * gap;
  return `${BG(K.steelD)}
    <path d="M 0 0 L 160 260 L 920 260 L 1080 0 Z" fill="#20292F" ${OL()}/><rect x="380" y="90" width="320" height="60" rx="10" fill="${lit > .5 ? '#F5F7E8' : '#3A4248'}" ${OL(4)}/>
    <path d="M 0 0 L 160 260 L 160 1500 L 0 1920 Z" fill="${K.steel}" ${OL()}/><path d="M 1080 0 L 920 260 L 920 1500 L 1080 1920 Z" fill="${K.steel}" ${OL()}/>
    <rect x="160" y="260" width="760" height="1240" fill="${K.steelL}" ${OL()}/>
    <rect x="${f1(250 - dx)}" y="300" width="290" height="1200" fill="${K.steel}" ${OL()}/><rect x="${f1(540 + dx)}" y="300" width="290" height="1200" fill="${K.steel}" ${OL()}/>
    ${gap > 0 ? `<rect x="${f1(540 - dx)}" y="300" width="${f1(2 * dx)}" height="1200" fill="${o.gapFill || '#0A0D10'}"/>` : ''}
    <path d="M 0 1920 L 160 1500 L 920 1500 L 1080 1920 Z" fill="${K.floor}" ${OL()}/>
    <rect x="-60" y="-60" width="1200" height="2040" fill="#05080A" opacity="${f1(.62 * (1 - lit))}"/>`;
}
// elevator button panel close-up
export function panel(t, o = {}) {
  const hold = o.hold || 0;
  let btn = '';
  for (let i = 0; i < 10; i++) { const r = Math.floor(i / 2), c = i % 2; btn += `<circle cx="${430 + c * 220}" cy="${360 + r * 150}" r="56" fill="#C9D0D4" ${OL(5)}/>${TX(String(i), 430 + c * 220, 380 + r * 150, 54, K.ink)}`; }
  const bell = `<circle cx="540" cy="1170" r="80" fill="${o.bellLit ? K.amber : K.amberL}" ${OL(6)}/>
    <path d="M 510 1196 Q 506 1140 540 1130 Q 574 1140 570 1196 Z M 500 1196 h 80" fill="none" stroke="${K.ink}" stroke-width="8" stroke-linejoin="round" stroke-linecap="round"/><circle cx="540" cy="1206" r="8" fill="${K.ink}"/>
    ${hold > 0 ? `<circle cx="540" cy="1170" r="104" fill="none" stroke="${K.amber}" stroke-width="12" stroke-dasharray="${f1(653 * hold)} 653" transform="rotate(-90 540 1170)"/>` : ''}`;
  const grill = `<g transform="translate(540 1360)">${[0, 1, 2, 3, 4].map(i => `<rect x="${-110 + i * 50}" y="-30" width="20" height="60" rx="6" fill="${o.talk ? K.amber : '#0F1418'}"/>`).join('')}</g>`;
  return `${BG(K.steel)}<rect x="300" y="240" width="480" height="1210" rx="30" fill="${K.panel}" ${OL()}/>${btn}${bell}${grill}`;
}
// shaft cutaway: cabin between two floors; o.y cabin top
export function shaft(t, o = {}) {
  const cy = o.cy ?? 820;
  const floor = (y, n) => `<rect x="-60" y="${y}" width="250" height="40" fill="#46525A" ${OL(5)}/><rect x="890" y="${y}" width="260" height="40" fill="#46525A" ${OL(5)}/>${TX(n, 100, y - 20, 56, K.mono)}`;
  return `${BG('#0E1316')}<rect x="190" y="-60" width="700" height="2040" fill="#151C20"/>
    ${[...Array(12)].map((_, i) => `<path d="M 200 ${i * 170} h 680" stroke="#1C2429" stroke-width="4"/>`).join('')}
    <path d="M 540 -60 V ${cy}" stroke="#56646D" stroke-width="10"/>${floor(560, '9')}${floor(1260, '8')}
    <rect x="260" y="${cy}" width="560" height="560" rx="10" fill="${K.steelL}" ${OL()}/><path d="M 540 ${cy + 40} V ${cy + 560}" stroke="${K.ink}" stroke-width="4"/>${o.inner || ''}`;
}
export function hiviz(x, y, s, o = {}) {
  return `<g>${bust('you', x, y, s, o).replace(new RegExp(K.you, 'g'), K.fire).replace(new RegExp(K.youD, 'g'), '#8A2622')}<path d="M ${f1(x - 92 * s)} ${f1(y + 200 * s)} H ${f1(x + 92 * s)}" stroke="${K.hiviz}" stroke-width="${f1(18 * s)}"/><path d="M ${f1(x - 64 * s)} ${f1(y - 150 * s)} Q ${x} ${f1(y - 214 * s)} ${f1(x + 64 * s)} ${f1(y - 150 * s)} Z" fill="${K.fire}" ${OL(4)}/></g>`;
}
