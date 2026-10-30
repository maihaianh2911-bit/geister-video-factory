// v64 "Tuffi" — archive-documentary kit for this video only (style: jobs/v64/style.md).
// Summer daylight 1950, aged paper tones. Tuffi (grey calf, big ears, red circus bridle) and
// Franz Althoff (long coat, fedora, moustache) are drawn freely, not traced from photos.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  paper: '#EADBC0', paperD: '#D9C6A3', paperL: '#F4EAD6', ink: '#3B2F2A', inkL: '#5A4A40', red: '#B23A2E', redL: '#D2584A',
  olive: '#6B7B4B', oliveD: '#4B5A35', oliveL: '#8C9A68', brown: '#8A6E52', brownD: '#6A523C',
  sky: '#D9DCCB', skyD: '#C3C8B4', water: '#7D8C80', waterD: '#5F6E64', waterL: '#A3B0A2', mud: '#6E5A43', mudD: '#4F3F2E',
  steel: '#4D4A46', steelL: '#6E6A64', cream: '#EFE3C6', creamD: '#D8C9A6',
  ele: '#8E8983', eleD: '#726D68', eleF: '#7B7671', eleIn: '#BFA59C',
  skin: '#E2B48C', skinD: '#C49470', coat: '#5B4636', coatD: '#45352A', hat: '#3E3129', uni: '#3F4A5A', uniD: '#2F3846',
  glass: '#BFD3D0',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 5, c = K.ink) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const HL = (s, x, y, sz, f = K.paperL, sw = 14, a = 'middle', st = K.ink) => TX(s, x, y, sz, f, a, `stroke="${st}" stroke-width="${sw}" stroke-linejoin="round" paint-order="stroke"`);
export const BG = (c = K.paper) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${c}"/>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export function shk(t, t0, a, d = 6) { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; }

export const DEFS = `<defs>
<linearGradient id="wSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E6E4D2"/><stop offset="1" stop-color="#CFD2BE"/></linearGradient>
<linearGradient id="wWater" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#8E9C8F"/><stop offset="1" stop-color="#5F6E64"/></linearGradient>
<radialGradient id="wVig" cx=".5" cy=".46" r=".72"><stop offset=".6" stop-color="#2A1F18" stop-opacity="0"/><stop offset="1" stop-color="#2A1F18" stop-opacity=".5"/></radialGradient>
<radialGradient id="wFlash" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFFBEA" stop-opacity="1"/><stop offset=".4" stop-color="#FFF3C8" stop-opacity=".6"/><stop offset="1" stop-color="#FFF3C8" stop-opacity="0"/></radialGradient>
<radialGradient id="wSpot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF1C9" stop-opacity=".8"/><stop offset="1" stop-color="#FFF1C9" stop-opacity="0"/></radialGradient>
</defs>`;

// paper grain + edge darkening
export function grain(t, a = 1) {
  let d = '';
  const k = Math.floor(t * 12);
  for (let i = 0; i < 70; i++) { const x = hash(i * 7.3 + k * .13) * 1080, y = hash(i * 3.1 + k * .71) * 1920; d += `M ${f1(x)} ${f1(y)} h 3`; }
  return `<path d="${d}" stroke="${K.ink}" stroke-width="3" opacity="${.16 * a}"/><rect x="-60" y="-60" width="1200" height="2040" fill="url(#wVig)" opacity="${a}"/>`;
}
// paper card with text
export function card(x, y, txt, sz, a = 1, o = {}) {
  if (a <= .01) return '';
  const w = o.w || txt.length * sz * .66 + 80, h = sz * 1.55;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${o.rot ?? -2}) scale(${f1(o.sc ?? 1)})" opacity="${f1(cl(a))}">
    <rect x="${f1(-w / 2 + 8)}" y="${f1(-h / 2 + 10)}" width="${f1(w)}" height="${f1(h)}" fill="${K.ink}" opacity=".25"/>
    <rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" fill="${o.bg || K.paperL}" ${OL(5)}/>
    ${TX(txt, 0, sz * .36, sz, o.col || K.ink)}</g>`;
}
// red rubber stamp that lands (p: 0..1 progress of the landing)
export function stamp(x, y, txt, sz, p, rot = -8) {
  if (p <= 0) return '';
  const s = lerp(1.6, 1, eout(cl(p * 1.4))), a = cl(p * 3);
  const w = txt.length * sz * .66 + 60, h = sz * 1.5;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${f1(s)})" opacity="${f1(a * .92)}">
    <rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="10" fill="${K.paperL}" fill-opacity=".55" stroke="${K.red}" stroke-width="9"/>
    <rect x="${f1(-w / 2 + 12)}" y="${f1(-h / 2 + 12)}" width="${f1(w - 24)}" height="${f1(h - 24)}" rx="6" fill="none" stroke="${K.red}" stroke-width="3"/>
    ${TX(txt, 0, sz * .36, sz, K.red)}</g>`;
}
// small location/date tag in the top-left corner
export function tag(txt, a = 1, y = 210) {
  if (a <= .01) return '';
  const w = txt.length * 26 + 70;
  return `<g opacity="${f1(cl(a))}" transform="translate(${f1(lerp(-30, 0, eout(cl(a))))} 0)"><rect x="60" y="${y - 50}" width="${w}" height="72" fill="${K.ink}"/>${TX(txt, 60 + w / 2, y, 40, K.paperL)}</g>`;
}

// ---------------- Tuffi ----------------
// side view facing right, origin on the ground between the feet; ≈ 470 wide × 420 tall at s=1.
// o: walk (phase rad), ear (flap 0..1), tr (trunk 0 hanging .. 1 raised trumpeting), eye ('n'|'wide'|'shut'), rot (deg, about origin),
//    dir (1 right, -1 left), legs ([lf, lb, rf, rb] extra angles), sit (0..1 legs folded into mud), mud (0..1 legs hidden by mud line), scratch (0..1)
export function tuffi(x, y, s, o = {}) {
  const w = o.walk || 0, sit = o.sit || 0, tr = o.tr || 0;
  const la = o.legs || [0, 0, 0, 0];
  const leg = (hx, ang, col, len = 175) => {
    const L = lerp(len, len * .55, sit);
    return `<g transform="rotate(${f1(ang)} ${hx} -170)"><path d="M ${hx - 31} -175 L ${hx - 30} ${f1(-170 + L - 6)} Q ${hx} ${f1(-170 + L + 6)} ${hx + 30} ${f1(-170 + L - 6)} L ${hx + 31} -175 Z" fill="${col}" ${OL(5)}/>
      <path d="M ${hx - 18} ${f1(-170 + L - 8)} v -10 M ${hx} ${f1(-170 + L - 6)} v -10 M ${hx + 18} ${f1(-170 + L - 8)} v -10" stroke="${K.paperL}" stroke-width="5" stroke-linecap="round"/></g>`;
  };
  const sw = Math.sin(w) * 14;
  const bodyDy = sit * 75 + (o.bob || 0);
  // trunk: tapered polygon from base, segments bending by curl
  const N = 9, segL = 25 * lerp(1, 1.04, tr);
  let a = lerp(78, -48, tr) * Math.PI / 180;
  const curl = lerp(3.2, -13, tr) * Math.PI / 180;
  let px = 238, py = -238; const pts = [[px, py, a]];
  for (let i = 0; i < N; i++) { a += curl; px += Math.cos(a) * segL; py += Math.sin(a) * segL; pts.push([px, py, a]); }
  const wid = i => lerp(30, 13, i / N);
  const left = pts.map(([x0, y0, an], i) => [x0 + Math.sin(an) * wid(i), y0 - Math.cos(an) * wid(i)]);
  const right = pts.map(([x0, y0, an], i) => [x0 - Math.sin(an) * wid(i), y0 + Math.cos(an) * wid(i)]);
  const tp = pts[N];
  const trunk = `<path d="M ${left.map(p => p.map(f1).join(' ')).join(' L ')} Q ${f1(tp[0] + Math.cos(tp[2]) * 16)} ${f1(tp[1] + Math.sin(tp[2]) * 16)} ${right.slice().reverse().map(p => p.map(f1).join(' ')).join(' L ')} Z" fill="${K.ele}" ${OL(5)}/>`
    + [2, 4, 6].map(i => `<path d="M ${f1(left[i][0])} ${f1(left[i][1])} L ${f1(lerp(left[i][0], right[i][0], .45))} ${f1(lerp(left[i][1], right[i][1], .45))}" stroke="${K.eleD}" stroke-width="3"/>`).join('');
  const earA = -18 * (o.ear || 0);
  const eye = o.eye === 'shut' ? `<path d="M 196 -292 q 10 6 20 0" fill="none" ${OL(4)}/>`
    : o.eye === 'wide' ? `<circle cx="206" cy="-292" r="13" fill="${K.paperL}" ${OL(4)}/><circle cx="210" cy="-292" r="6" fill="${K.ink}"/><path d="M 190 -316 q 16 -10 32 -2" fill="none" ${OL(4)}/>`
    : `<circle cx="207" cy="-290" r="7" fill="${K.ink}"/><circle cx="209" cy="-293" r="2.4" fill="${K.paperL}"/><path d="M 194 -306 q 13 -6 26 0" fill="none" stroke="${K.ink}" stroke-width="3.5" stroke-linecap="round"/>`;
  const mouthOpen = o.mouth || (tr > .5 ? 1 : 0);
  const mouth = mouthOpen ? `<path d="M 214 -214 q 18 ${f1(10 + 16 * mouthOpen)} 34 -2" fill="#8E5A50" ${OL(4)}/>` : `<path d="M 214 -212 q 14 10 28 0" fill="none" ${OL(4)}/>`;
  const body = `<path d="M -175 -215 C -182 -330 -60 -360 40 -345 C 120 -335 160 -320 170 -280 L 175 -150 C 120 -100 -80 -95 -160 -125 C -180 -150 -178 -185 -175 -215 Z" fill="${K.ele}" ${OL(5)}/>
    <path d="M -150 -140 C -80 -112 60 -112 150 -150" fill="none" stroke="${K.eleD}" stroke-width="10" stroke-linecap="round" opacity=".6"/>`;
  const head = `<path d="M 100 -330 C 140 -380 250 -370 262 -300 C 268 -262 258 -236 238 -222 L 212 -200 C 180 -190 130 -205 110 -240 Z" fill="${K.ele}" ${OL(5)}/>`;
  const ear = `<g transform="rotate(${f1(earA)} 132 -318)"><path d="M 132 -318 C 60 -350 30 -280 50 -220 C 62 -180 112 -176 128 -206 C 138 -240 140 -290 132 -318 Z" fill="${K.ele}" ${OL(5)}/>
    <path d="M 120 -300 C 76 -316 64 -268 74 -232 C 84 -206 108 -206 116 -222" fill="${K.eleIn}" opacity=".7"/></g>`;
  const tail = `<path d="M -172 -250 Q ${f1(-205 + sw * .4)} -200 ${f1(-200 + sw * .6)} -150" fill="none" ${OL(6)}/><path d="M ${f1(-200 + sw * .6)} -150 l -8 22 l 16 -4 z" fill="${K.ink}"/>`;
  // red circus bridle: crown strap behind the ear, nose band, rings
  const bridle = `<path d="M 150 -352 C 150 -300 160 -250 176 -205" fill="none" stroke="${K.red}" stroke-width="13" stroke-linecap="round"/>
    <path d="M 150 -352 C 150 -300 160 -250 176 -205" fill="none" stroke="${K.ink}" stroke-width="3" stroke-dasharray="1 0" opacity=".0"/>
    <path d="M 168 -262 C 200 -268 236 -266 258 -258" fill="none" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="176" cy="-210" r="9" fill="none" stroke="#C9A24A" stroke-width="5"/>
    <path d="M 112 -335 L 150 -352" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/>`;
  const blanket = o.blanket === false ? '' : `<path d="M -40 -342 C 20 -350 80 -342 110 -330 L 100 -215 C 40 -205 -20 -205 -50 -215 Z" fill="${K.red}" ${OL(4)}/><path d="M -48 -228 C -10 -218 50 -218 102 -228" fill="none" stroke="#C9A24A" stroke-width="7"/>`;
  const scratch = o.scratch ? `<g opacity="${f1(o.scratch)}"><path d="M -150 -250 l 34 18 M -146 -236 l 26 14" stroke="${K.red}" stroke-width="5" stroke-linecap="round"/></g>` : '';
  const legsFar = leg(-110, sw + la[1], K.eleF) + leg(95, -sw + la[3], K.eleF);
  const legsNear = leg(-80, -sw + la[0], K.ele) + leg(130, sw + la[2], K.ele);
  const rein = o.rein ? `<path d="M 176 -210 Q ${f1(o.rein[0])} ${f1(o.rein[1])} ${f1(o.rein[2])} ${f1(o.rein[3])}" fill="none" stroke="${K.red}" stroke-width="8"/>` : '';
  const inner = `${legsFar}<g transform="translate(0 ${f1(bodyDy)})">${tail}${body}${blanket}${scratch}${head}${trunk}${mouth}${eye}${ear}${bridle}${rein}</g>${legsNear}`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1((o.dir || 1) * s * 1000) / 1000} ${f1(s * 1000) / 1000})">${inner}</g>`;
}
// world position of Tuffi's bridle ring (for a rein), same params as tuffi()
export const ringPos = (x, y, s, o = {}) => [x + (o.dir || 1) * 176 * s, y + (-210 + (o.sit || 0) * 75) * s];

// ---------------- people ----------------
// person, origin at the feet, ≈ 650 tall at s=1. o: coat ('long'|'jacket'), col, trou, hat ('fedora'|'cap'|'boater'|'none'), mous, look (-1..1 pupils),
//   aL/aR [shoulder, elbow] deg (0 = down; + = forward toward facing side), walk phase, lean, mouth ('n'|'o'|'flat'), brow (0..1 fear), bust (no legs),
//   cam (box camera at chest, flash 0..1), band (bandage on forehead), hair colour, dir (1 faces screen-right a little)
export function person(x, y, s, o = {}) {
  const col = o.col || K.coat, colD = o.colD || K.coatD, trou = o.trou || '#4A4038', dir = o.dir || 1;
  const w = o.walk || 0, st = Math.sin(w) * 20;
  const L1 = 115, L2 = 110, sh = [-58, -500], shR = [58, -500];
  const arm = (sx, sy, a, side) => { const [a1, a2] = a; const r1 = a1 * Math.PI / 180, r2 = (a1 + a2) * Math.PI / 180;
    const ex = sx + side * dir * Math.sin(r1) * L1 * .9 + (side === 1 ? 0 : 0), ey = sy + Math.cos(r1) * L1, hx = ex + side * dir * Math.sin(r2) * L2 * .9, hy = ey + Math.cos(r2) * L2;
    return { hx, hy, svg: `<path d="M ${sx} ${sy} L ${f1(ex)} ${f1(ey)} L ${f1(hx)} ${f1(hy)}" fill="none" stroke="${K.ink}" stroke-width="42" stroke-linecap="round" stroke-linejoin="round"/><path d="M ${sx} ${sy} L ${f1(ex)} ${f1(ey)} L ${f1(hx)} ${f1(hy)}" fill="none" stroke="${col}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="17" fill="${K.skin}" ${OL(4)}/>` }; };
  const camOn = !!o.cam;
  const aL = camOn ? [40, 70] : (o.aL || [6, 6]), aR = camOn ? [40, 70] : (o.aR || [6, 6]);
  let Lm = arm(sh[0], sh[1], aL, -1), R = arm(shR[0], shR[1], aR, 1);
  if (camOn) { const ca = (sx, ex, hx) => ({ hx, hy: -420, svg: `<path d="M ${sx} -500 L ${ex} -400 L ${hx} -420" fill="none" stroke="${K.ink}" stroke-width="42" stroke-linecap="round" stroke-linejoin="round"/><path d="M ${sx} -500 L ${ex} -400 L ${hx} -420" fill="none" stroke="${col}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${hx}" cy="-420" r="17" fill="${K.skin}" ${OL(4)}/>` });
    Lm = ca(-58, -84, -52); R = ca(58, 84, 52); }
  const legs = o.bust ? '' : `<path d="M -24 -300 L ${f1(-26 - st)} -150 L ${f1(-28 - st * 1.2)} -10" fill="none" stroke="${K.ink}" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/><path d="M -24 -300 L ${f1(-26 - st)} -150 L ${f1(-28 - st * 1.2)} -10" fill="none" stroke="${trou}" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M 24 -300 L ${f1(26 + st)} -150 L ${f1(28 + st * 1.2)} -10" fill="none" stroke="${K.ink}" stroke-width="48" stroke-linecap="round" stroke-linejoin="round"/><path d="M 24 -300 L ${f1(26 + st)} -150 L ${f1(28 + st * 1.2)} -10" fill="none" stroke="${trou}" stroke-width="38" stroke-linecap="round" stroke-linejoin="round"/>
    <ellipse cx="${f1(-28 - st * 1.2 + dir * 10)}" cy="-6" rx="34" ry="14" fill="${K.ink}"/><ellipse cx="${f1(28 + st * 1.2 + dir * 10)}" cy="-6" rx="34" ry="14" fill="${K.ink}"/>`;
  const torso = o.coat === 'long'
    ? `<path d="M -72 -520 Q -94 -330 -100 -170 L 100 -170 Q 94 -330 72 -520 Q 0 -548 -72 -520 Z" fill="${col}" ${OL(5)}/><path d="M 0 -520 L 0 -170" stroke="${colD}" stroke-width="5"/><path d="M -30 -524 L 0 -470 L 30 -524" fill="#EFE7D6" ${OL(4)}/>`
    : `<path d="M -70 -520 Q -80 -400 -66 -290 L 66 -290 Q 80 -400 70 -520 Q 0 -546 -70 -520 Z" fill="${col}" ${OL(5)}/><path d="M -26 -524 L 0 -478 L 26 -524" fill="#EFE7D6" ${OL(4)}/>`;
  const lk = (o.look || 0) * 7;
  const hy = -598;
  const face = `<rect x="-20" y="-552" width="40" height="34" fill="${K.skinD}" ${OL(4)}/>
    <ellipse cx="0" cy="${hy}" rx="50" ry="56" fill="${K.skin}" ${OL(5)}/>
    ${o.hat === 'none' || !o.hat ? `<path d="M -50 ${hy - 6} Q -48 ${hy - 62} 0 ${hy - 62} Q 48 ${hy - 62} 50 ${hy - 6} Q 30 ${hy - 40} -50 ${hy - 6} Z" fill="${o.hair || '#4A3A2E'}" ${OL(4)}/>` : ''}
    <circle cx="${f1(-17 + lk + dir * 6)}" cy="${hy - 4}" r="${o.brow ? 6 : 5}" fill="${K.ink}"/><circle cx="${f1(17 + lk + dir * 6)}" cy="${hy - 4}" r="${o.brow ? 6 : 5}" fill="${K.ink}"/>
    <path d="M ${-30 + dir * 6} ${f1(hy - 20 - 6 * (o.brow || 0))} l 22 ${f1(4 - 10 * (o.brow || 0))} M ${30 + dir * 6} ${f1(hy - 20 - 6 * (o.brow || 0))} l -22 ${f1(4 - 10 * (o.brow || 0))}" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>
    <path d="M ${dir * 6 + 2} ${hy} q ${dir * 8} 12 0 16" fill="none" stroke="${K.skinD}" stroke-width="4" stroke-linecap="round"/>
    ${o.mous ? `<path d="M ${dir * 6 - 24} ${hy + 22} Q ${dir * 6} ${hy + 10} ${dir * 6 + 24} ${hy + 22} Q ${dir * 6} ${hy + 16} ${dir * 6 - 24} ${hy + 22} Z" fill="#3E2E24" ${OL(3)}/>` : ''}
    ${o.mouth === 'o' ? `<ellipse cx="${dir * 6}" cy="${hy + 34}" rx="9" ry="12" fill="${K.ink}"/>` : o.mouth === 'flat' ? `<path d="M ${dir * 6 - 12} ${hy + 34} h 24" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : `<path d="M ${dir * 6 - 12} ${hy + 32} q 12 8 24 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`}
    ${o.band ? `<path d="M -50 ${hy - 26} Q 0 ${hy - 40} 50 ${hy - 26} L 50 ${hy - 10} Q 0 ${hy - 24} -50 ${hy - 10} Z" fill="#F4F0E6" ${OL(3)}/>` : ''}`;
  const hat = o.hat === 'fedora' ? `<ellipse cx="0" cy="${hy - 40}" rx="80" ry="16" fill="${K.hat}" ${OL(4)}/><path d="M -48 ${hy - 44} L -44 ${hy - 92} Q 0 ${hy - 110} 44 ${hy - 92} L 48 ${hy - 44} Z" fill="${K.hat}" ${OL(4)}/><path d="M -47 ${hy - 54} Q 0 ${hy - 62} 47 ${hy - 54}" stroke="#7A5B3E" stroke-width="9" fill="none"/>`
    : o.hat === 'cap' ? `<path d="M -52 ${hy - 36} L -48 ${hy - 76} L 48 ${hy - 76} L 52 ${hy - 36} Z" fill="${K.uniD}" ${OL(4)}/><path d="M ${dir > 0 ? -10 : -70} ${hy - 36} L ${dir > 0 ? 70 : 10} ${hy - 36} L ${dir > 0 ? 58 : -58} ${hy - 22} L ${dir > 0 ? -10 : 10} ${hy - 28} Z" fill="${K.ink}"/><rect x="-14" y="${hy - 66}" width="28" height="14" fill="#C9A24A"/>`
    : o.hat === 'boater' ? `<ellipse cx="0" cy="${hy - 40}" rx="74" ry="13" fill="#D8C08A" ${OL(4)}/><rect x="-44" y="${hy - 74}" width="88" height="34" fill="#D8C08A" ${OL(4)}/><rect x="-44" y="${hy - 54}" width="88" height="10" fill="${K.ink}"/>`
    : o.hat === 'cloche' ? `<path d="M -60 ${hy - 20} Q -60 ${hy - 90} 0 ${hy - 92} Q 60 ${hy - 90} 60 ${hy - 20} Q 0 ${hy - 40} -60 ${hy - 20} Z" fill="${o.hatCol || '#7B4B5A'}" ${OL(4)}/>` : '';
  let camSvg = '';
  if (camOn) {
    const fl = o.flash || 0;
    camSvg = `<g transform="translate(0 -430)"><rect x="-56" y="-40" width="112" height="84" rx="6" fill="#2E2A26" ${OL(4)}/><circle cx="${dir * 10}" cy="2" r="26" fill="#5D5850" ${OL(4)}/><circle cx="${dir * 10}" cy="2" r="12" fill="#1D1A17"/>
      <path d="M ${dir * 40} -40 L ${dir * 40} -84" stroke="${K.ink}" stroke-width="6"/><path d="M ${dir * 40 - 26} -84 Q ${dir * 40} -120 ${dir * 40 + 26} -84 Z" fill="#CFCAC0" ${OL(4)}/>
      ${fl > 0 ? `<circle cx="${dir * 40}" cy="-96" r="${f1(60 + 160 * fl)}" fill="url(#wFlash)" opacity="${f1(fl)}"/>` : ''}</g>`;
  }
  return { hL: [x + Lm.hx * s, y + Lm.hy * s], hR: [x + R.hx * s, y + R.hy * s], head: [x, y + hy * s],
    svg: `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.lean || 0)}) scale(${f1(s * 1000) / 1000})">${legs}${o.armsBack ? Lm.svg + R.svg : ''}${torso}${face}${hat}${o.armsBack ? '' : Lm.svg + R.svg}${camSvg}</g>` };
}
export const althoff = (x, y, s, o = {}) => person(x, y, s, { coat: 'long', col: K.coat, colD: K.coatD, hat: 'fedora', mous: true, ...o });
export const leiter = (x, y, s, o = {}) => person(x, y, s, { coat: 'jacket', col: K.uni, colD: K.uniD, trou: K.uniD, hat: 'cap', ...o });

// ---------------- places ----------------
// distant Wuppertal valley: green hills, slate roofs, a church spire, chimneys (neutral set dressing)
export function town(y0 = 900, o = {}) {
  let h = `<path d="M -60 ${y0 - 260} Q 200 ${y0 - 420} 460 ${y0 - 300} Q 720 ${y0 - 200} 1140 ${y0 - 380} L 1140 ${y0} L -60 ${y0} Z" fill="#A9AE8C"/>
    <path d="M -60 ${y0 - 150} Q 300 ${y0 - 260} 640 ${y0 - 170} Q 900 ${y0 - 110} 1140 ${y0 - 200} L 1140 ${y0} L -60 ${y0} Z" fill="#949A78"/>`;
  for (let i = 0; i < 16; i++) {
    const x = -40 + i * 74 + hash(i + 3) * 20, hh = 90 + hash(i + 11) * 90, ww = 64 + hash(i) * 24, yb = y0;
    h += `<rect x="${f1(x)}" y="${f1(yb - hh)}" width="${f1(ww)}" height="${f1(hh)}" fill="${i % 3 ? '#D9C8A6' : '#C7B491'}" ${OL(3)}/>
      <path d="M ${f1(x - 6)} ${f1(yb - hh)} L ${f1(x + ww / 2)} ${f1(yb - hh - 46)} L ${f1(x + ww + 6)} ${f1(yb - hh)} Z" fill="#5E605F" ${OL(3)}/>
      ${[0, 1].map(r => `<rect x="${f1(x + 12)}" y="${f1(yb - hh + 18 + r * 36)}" width="14" height="18" fill="#6F6A5E"/><rect x="${f1(x + ww - 26)}" y="${f1(yb - hh + 18 + r * 36)}" width="14" height="18" fill="#6F6A5E"/>`).join('')}`;
  }
  if (o.spire !== false) h += `<rect x="770" y="${y0 - 330}" width="56" height="200" fill="#C7B491" ${OL(3)}/><path d="M 760 ${y0 - 330} L 798 ${y0 - 470} L 836 ${y0 - 330} Z" fill="#5E605F" ${OL(3)}/>`;
  h += `<rect x="140" y="${y0 - 340}" width="26" height="160" fill="#8A6E52" ${OL(3)}/><rect x="1000" y="${y0 - 360}" width="26" height="170" fill="#8A6E52" ${OL(3)}/>`;
  return h;
}
// river surface between yTop and yBot with gentle ripples
export function river(t, yTop, yBot) {
  let r = '';
  for (let i = 0; i < 9; i++) { const y = yTop + 30 + i * (yBot - yTop - 40) / 9, x = ((hash(i) * 900 + t * 30 * (i % 2 ? 1 : -1)) % 1100) - 60; r += `<path d="M ${f1(x)} ${f1(y)} q 30 -8 60 0 q 30 8 60 0" fill="none" stroke="${K.waterL}" stroke-width="4" opacity=".7"/>`; }
  return `<rect x="-60" y="${yTop}" width="1200" height="${yBot - yTop}" fill="url(#wWater)"/>${r}`;
}
// steel track girder (lattice) at height y with supports going down to yG, offset ox for panning
export function track(y, yG, ox = 0, o = {}) {
  let lat = '';
  const x0 = -200 - ((ox % 80) + 80) % 80;
  for (let x = x0; x < 1300; x += 80) lat += `M ${x} ${y} L ${x + 40} ${y + 56} L ${x + 80} ${y}`;
  let sup = '';
  const sp = o.span || 760, s0 = ((-(ox) % sp) + sp) % sp - 120;
  for (let x = s0 - sp; x < 1300; x += sp) {
    sup += `<path d="M ${x - 30} ${y + 56} L ${x - 120} ${yG} M ${x + 30} ${y + 56} L ${x + 120} ${yG}" stroke="${K.steel}" stroke-width="26"/>
      <path d="M ${x - 60} ${y + 200} L ${x + 60} ${y + 200} M ${x - 85} ${y + 360} L ${x + 85} ${y + 360} M ${x - 40} ${y + 120} L ${x + 75} ${y + 330} M ${x + 40} ${y + 120} L ${x - 75} ${y + 330}" stroke="${K.steelL}" stroke-width="10"/>
      <rect x="${x - 150}" y="${yG - 14}" width="70" height="30" fill="#9C9284" ${OL(3)}/><rect x="${x + 80}" y="${yG - 14}" width="70" height="30" fill="#9C9284" ${OL(3)}/>`;
  }
  return `${sup}<rect x="-60" y="${y - 14}" width="1200" height="16" fill="${K.steel}"/><rect x="-60" y="${y + 52}" width="1200" height="12" fill="${K.steel}"/><path d="${lat}" fill="none" stroke="${K.steel}" stroke-width="8"/>`;
}
// carriage hanging from the rail; origin = rail contact point (x, y). Body ≈ 640 × 210 at s=1, from y+110 to y+320.
// o: faces (show heads in windows), ele (0..1 Tuffi visible through windows), bulge (0..1 wall pushed out), broken (0..1 window shattered), open (0..1 side panel swung out),
//    gap (true: opening without panel, after fall), tilt (deg sway)
export function car(x, y, s, o = {}) {
  const bx = -320, by = 110, bw = 640, bh = 210;
  const bul = o.bulge || 0;
  const wins = [0, 1, 2, 3, 4, 5].map(i => bx + 40 + i * 98);
  let w = '';
  const hole = o.open > 0 || o.gap;
  wins.forEach((wx, i) => {
    const inHole = hole && (i === 2 || i === 3);
    if (inHole) return;
    if (o.door && i === 4) { w += `<rect x="${wx - 6}" y="${by + 22}" width="90" height="${bh - 26}" fill="#3A332C" ${OL(4)}/>`; return; }
    const by2 = by + 34 - (i === 2 || i === 3 ? bul * 8 : 0);
    w += `<rect x="${wx}" y="${by2}" width="78" height="76" rx="6" fill="${K.glass}" ${OL(4)}/>`;
    if (o.ele && (i >= 1 && i <= 4)) w += `<rect x="${wx + 4}" y="${by2 + 4}" width="70" height="68" rx="4" fill="${K.ele}" opacity="${f1(o.ele)}"/>`;
    if (o.faces && (i === 0 || i === 5 || (!o.ele && !hole && !o.inner))) { const fx = wx + 39, fy = by2 + 50; w += `<circle cx="${fx}" cy="${fy}" r="18" fill="${K.skin}" ${OL(3)}/><path d="M ${fx - 22} ${fy - 10} h 44 l -8 -16 h -28 z" fill="${K.hat}"/>`; }
  });
  // something drawn inside the carriage (car-local coords), visible only through the glass
  let seen = '';
  if (o.inner) { const id = o.id || 'cw'; const rects = wins.map((wx, i) => (hole && (i === 2 || i === 3)) ? '' : `<rect x="${wx}" y="${by + 34}" width="78" height="76" rx="6"/>`).join('');
    seen = `<clipPath id="${id}">${rects}</clipPath><g clip-path="url(#${id})">${o.inner}</g>` + wins.map((wx, i) => (hole && (i === 2 || i === 3)) ? '' : `<rect x="${wx}" y="${by + 34}" width="78" height="76" rx="6" fill="none" ${OL(4)}/><path d="M ${wx + 8} ${by + 44} l 20 0" stroke="#fff" stroke-width="5" opacity=".5"/>`).join(''); }
  // bulge: the middle panel bows outward (drawn as a lens shape)
  const bulge = bul > 0 && !hole ? `<path d="M ${bx + 230} ${by + 20} Q ${bx + 320} ${f1(by + 20 - 30 * bul)} ${bx + 420} ${by + 20} L ${bx + 430} ${by + bh - 10} Q ${bx + 320} ${f1(by + bh + 26 * bul)} ${bx + 220} ${by + bh - 10} Z" fill="${K.oliveL}" opacity="${f1(.5 * bul)}"/>` : '';
  // shatter: cracks then missing glass on window 2
  let crack = '';
  if (o.broken > 0 && !hole) { const wx = wins[2] + 39, wy = by + 72; for (let k = 0; k < 7; k++) { const an = k / 7 * 6.28 + .3; crack += `<path d="M ${wx} ${wy} L ${f1(wx + Math.cos(an) * 44)} ${f1(wy + Math.sin(an) * 40)}" stroke="${K.ink}" stroke-width="3"/>`; }
    if (o.broken >= 1) crack += `<rect x="${wins[2] + 4}" y="${by + 38}" width="70" height="68" fill="${K.ink}" opacity=".75"/>`; }
  // open panel: a wall piece hinged at its bottom edge swinging out/down
  const op = o.open || 0;
  const panel = hole && !o.gap ? `<g transform="translate(${bx + 222} ${by + bh - 4}) skewY(0) scale(1 ${f1(Math.cos(op * 1.45))})"><rect x="0" y="${-(bh - 12)}" width="200" height="${bh - 12}" fill="${K.olive}" ${OL(5)}/><rect x="16" y="${-(bh - 46)}" width="70" height="66" fill="${K.ink}" opacity=".6"/></g>` : '';
  const holeSvg = hole ? `<path d="M ${bx + 222} ${by + 22} L ${bx + 422} ${by + 26} L ${bx + 416} ${by + bh - 4} L ${bx + 226} ${by + bh - 4} Z" fill="#3A332C"/>
    <path d="M ${bx + 222} ${by + 22} l 14 18 l -10 16 l 12 20 M ${bx + 422} ${by + 26} l -12 22 l 10 14 l -14 24" fill="none" ${OL(4)}/>` : '';
  const inside = o.inside || '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s * 1000) / 1000})">
    <rect x="-60" y="-26" width="120" height="34" rx="10" fill="${K.steel}" ${OL(4)}/><circle cx="-34" cy="-8" r="16" fill="${K.steelL}" ${OL(4)}/><circle cx="34" cy="-8" r="16" fill="${K.steelL}" ${OL(4)}/>
    <path d="M -10 8 L -10 70 Q -10 96 -60 ${by} M 10 8 L 10 70 Q 10 96 60 ${by}" fill="none" stroke="${K.steel}" stroke-width="18" stroke-linecap="round"/>
    <path d="M ${bx} ${by + 30} Q ${bx} ${by} ${bx + 40} ${by} L ${bx + bw - 40} ${by} Q ${bx + bw} ${by} ${bx + bw} ${by + 30} L ${bx + bw + 10} ${by + bh - 30} Q ${bx + bw + 10} ${by + bh} ${bx + bw - 30} ${by + bh} L ${bx + 30} ${by + bh} Q ${bx - 10} ${by + bh} ${bx - 10} ${by + bh - 30} Z" fill="${K.olive}" ${OL(5)}/>
    <rect x="${bx + 6}" y="${by + 6}" width="${bw - 12}" height="22" fill="${K.cream}"/>
    <path d="M ${bx} ${by + 128} L ${bx + bw + 6} ${by + 128}" stroke="${K.cream}" stroke-width="10"/>
    ${bulge}${w}${seen}${crack}${holeSvg}${inside}${panel}
    <path d="M ${bx + 20} ${by - 2} L ${bx + bw - 20} ${by - 2}" stroke="${K.steel}" stroke-width="10" stroke-linecap="round"/>
  </g>`;
}
// glass shards flying from (x,y), p 0..1
export function shards(x, y, p, n = 12, spread = 1, seed = 1) {
  if (p <= 0 || p >= 1) return '';
  let s = '';
  for (let i = 0; i < n; i++) { const a = (hash(i * 3.3 + seed) - .5) * 2.4 * spread - Math.PI / 2 + .3, v = 260 + hash(i + seed * 7) * 340;
    const dx = Math.cos(a) * v * p * 1.4, dy = Math.sin(a) * v * p + 900 * p * p; const r = hash(i + 4) * 360 + p * 500;
    s += `<path d="M 0 -14 L 12 8 L -10 10 Z" transform="translate(${f1(x + dx)} ${f1(y + dy)}) rotate(${f1(r)})" fill="${K.glass}" ${OL(3)} opacity="${f1(1 - p * .6)}"/>`; }
  return s;
}
// splash crown at (x, y) progress p
export function splash(x, y, p, w = 1, col = K.waterL) {
  if (p <= 0 || p >= 1) return '';
  let s = '';
  for (let i = 0; i < 14; i++) { const a = -Math.PI * (.08 + .84 * i / 13), v = (260 + hash(i) * 220) * w;
    s += `<circle cx="${f1(x + Math.cos(a) * v * p * 1.2)}" cy="${f1(y + Math.sin(a) * v * p + 700 * p * p)}" r="${f1((16 + hash(i + 2) * 14) * (1 - p * .7))}" fill="${col}" ${OL(3)}/>`; }
  return s + `<ellipse cx="${x}" cy="${y}" rx="${f1(w * (120 + 260 * eout(p)))}" ry="${f1(w * (24 + 40 * eout(p)))}" fill="none" stroke="${col}" stroke-width="${f1(10 * (1 - p))}"/>`;
}
// trumpet sound waves from (x,y) direction ang deg, p 0..1
export function trumpetWaves(x, y, ang, p) {
  let s = '';
  for (let k = 0; k < 3; k++) { const q = cl(p * 1.5 - k * .25); if (q <= 0 || q >= 1) continue;
    const r = 40 + 160 * q; s += `<path d="M ${f1(x + Math.cos((ang - 35) * Math.PI / 180) * r)} ${f1(y + Math.sin((ang - 35) * Math.PI / 180) * r)} A ${f1(r)} ${f1(r)} 0 0 1 ${f1(x + Math.cos((ang + 35) * Math.PI / 180) * r)} ${f1(y + Math.sin((ang + 35) * Math.PI / 180) * r)}" fill="none" stroke="${K.ink}" stroke-width="${f1(10 * (1 - q))}" stroke-linecap="round"/>`; }
  return s;
}
// interior cutaway of the carriage: back wall with windows, benches; returns svg. y0 = floor line. o.broken (window broken), o.hole
export function interior(t, o = {}) {
  const y0 = o.floor || 1260;
  let w = '';
  for (let i = 0; i < 4; i++) {
    const wx = 70 + i * 250, hole = o.hole && (i === 2);
    w += hole ? `<path d="M ${wx - 20} ${y0 - 640} L ${wx + 200} ${y0 - 636} L ${wx + 196} ${y0 - 250} L ${wx - 16} ${y0 - 250} Z" fill="url(#wSky)" ${OL(5)}/><path d="M ${wx - 20} ${y0 - 640} l 22 30 l -14 26 l 18 30 M ${wx + 200} ${y0 - 636} l -18 32 l 14 22 l -20 34" fill="none" ${OL(4)}/>`
      : `<rect x="${wx}" y="${y0 - 600}" width="180" height="230" rx="10" fill="url(#wSky)" ${OL(5)}/><path d="M ${wx} ${y0 - 470} h 180" stroke="${K.ink}" stroke-width="4"/>`;
    if (!hole) w += `<path d="M ${wx + 10} ${y0 - 410} Q ${wx + 90} ${y0 - 440} ${wx + 170} ${y0 - 416} L ${wx + 170} ${y0 - 380} L ${wx + 10} ${y0 - 380} Z" fill="#949A78" opacity=".8"/>`;
  }
  return `<rect x="-60" y="-60" width="1200" height="${y0 - 700}" fill="#B9A986"/><rect x="-60" y="${y0 - 760}" width="1200" height="760" fill="${K.cream}"/>
    <rect x="-60" y="${y0 - 760}" width="1200" height="40" fill="${K.creamD}"/>
    <rect x="-60" y="${y0 - 330}" width="1200" height="330" fill="${K.oliveL}" opacity=".55"/>
    ${w}
    <path d="M -60 ${y0 - 690} H 1140" stroke="${K.brown}" stroke-width="10"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<path d="M ${40 + i * 140} ${y0 - 690} v 60" stroke="${K.brown}" stroke-width="4"/><circle cx="${40 + i * 140}" cy="${y0 - 622}" r="12" fill="none" stroke="${K.brown}" stroke-width="5"/>`).join('')}
    <rect x="-60" y="${y0}" width="1200" height="800" fill="#8A6E52"/>${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M ${-60 + i * 180} ${y0} l -60 800" stroke="${K.brownD}" stroke-width="4"/>`).join('')}
    <rect x="-60" y="${y0 - 8}" width="1200" height="12" fill="${K.ink}"/>`;
}
// bench seen from the front (seat + backrest), x center, width
export const bench = (x, y0, w = 300) => `<rect x="${x - w / 2}" y="${y0 - 240}" width="${w}" height="120" rx="12" fill="${K.brown}" ${OL(5)}/><rect x="${x - w / 2 - 10}" y="${y0 - 130}" width="${w + 20}" height="34" rx="8" fill="${K.brownD}" ${OL(5)}/><path d="M ${x - w / 2 + 14} ${y0 - 96} V ${y0} M ${x + w / 2 - 14} ${y0 - 96} V ${y0}" stroke="${K.ink}" stroke-width="10"/>`;

// postcard frame (white border, scalloped edge); inner svg in local 0..W×0..H
export function postcard(x, y, sc, rot, inner, W = 760, H = 540, id = 'pc') {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(sc * 1000) / 1000})">
    <rect x="${-W / 2 - 28 + 12}" y="${-H / 2 - 28 + 16}" width="${W + 56}" height="${H + 56}" fill="${K.ink}" opacity=".28"/>
    <rect x="${-W / 2 - 28}" y="${-H / 2 - 28}" width="${W + 56}" height="${H + 56}" fill="#F7F1E3" ${OL(4)}/>
    <clipPath id="${id}"><rect x="${-W / 2}" y="${-H / 2}" width="${W}" height="${H}"/></clipPath>
    <g clip-path="url(#${id})"><g transform="translate(${-W / 2} ${-H / 2})">${inner}</g></g>
    <rect x="${-W / 2}" y="${-H / 2}" width="${W}" height="${H}" fill="none" ${OL(4)}/></g>`;
}
// banknote (generic 1950s style, value text)
export function note(x, y, rot, txt = '100', s = 1) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(rot)}) scale(${f1(s)})"><rect x="-150" y="-70" width="300" height="140" rx="6" fill="#C9C29A" ${OL(4)}/><rect x="-132" y="-52" width="264" height="104" rx="4" fill="none" stroke="${K.oliveD}" stroke-width="3"/>
    <circle cx="-74" cy="0" r="34" fill="none" stroke="${K.oliveD}" stroke-width="4"/>${TX(txt, 70, 18, 52, K.oliveD)}</g>`;
}
// circus tent (red/cream stripes), centre x, ground y, scale
export function tent(x, y, s, p = 1) {
  let st = '';
  const h = 520 * p;
  for (let i = -4; i < 4; i++) st += `<path d="M 0 ${f1(-h)} L ${i * 80} 0 L ${(i + 1) * 80} 0 Z" fill="${(i + 4) % 2 ? K.cream : K.red}" ${OL(4)}/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})">${st}<path d="M -320 0 L 0 ${f1(-h)} L 320 0" fill="none" ${OL(6)}/>
    <path d="M 0 ${f1(-h)} L 0 ${f1(-h - 90)}" ${OL(6)}/><path d="M 0 ${f1(-h - 90)} L 70 ${f1(-h - 70)} L 0 ${f1(-h - 50)} Z" fill="${K.red}" ${OL(4)}/>
    <path d="M -50 0 Q 0 -150 50 0 Z" fill="${K.ink}"/></g>`;
}

// exterior wide set: sky, town, river, track; car at carX hanging from rail at y=TY (scale CS). o.car = car() options, o.over = svg drawn over the car
export const TY = 420, CS = .75, WY = 1200;
export function bahnScene(t, o = {}) {
  const ox = o.ox || 0;
  return `<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>
    <circle cx="840" cy="230" r="70" fill="#F4E6B8" opacity=".9"/><circle cx="840" cy="230" r="170" fill="url(#wSpot)" opacity=".5"/>
    <g transform="translate(${f1(-ox * .25 % 1080)} 0)">${town(WY - 10)}</g>
    ${river(t, WY - 10, 1560)}
    <path d="M -60 1520 Q 300 1500 600 1530 Q 900 1550 1140 1520 L 1140 1980 L -60 1980 Z" fill="#7F8A5E"/><rect x="-60" y="1490" width="1200" height="40" fill="#A39A86" ${OL(3)}/>
    ${track(TY, WY + 10, ox)}
    ${o.under || ''}
    ${o.noCar ? '' : car(o.carX ?? 540, TY, CS, o.car || {})}
    ${o.over || ''}`;
}
