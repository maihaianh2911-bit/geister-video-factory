// v59 "Rauch im Treppenhaus" — shared drawing kit for this video only (style: jobs/v59/style.md).
// Family: Vater (du) slate-blue sleep shirt + dark short hair; Mutter lavender pyjama + auburn bun; Kind mint pyjama + blond tuft + brown bear.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  bg: '#141A1F', bg2: '#1E2A30', moss: '#24363A', wall: '#26343B', wallSh: '#1C272D', wallHi: '#33454E', floor: '#18211F',
  amb: '#FFB547', ambD: '#C9822A', red: '#E5484D', redD: '#8E2427', ol: '#0B0F12', cold: '#9DB8C8', coldD: '#5E7F93',
  safe: '#5FD08A', safeD: '#2F8F57', blue: '#3D8BFF', blueHi: '#9CC6FF',
  smoke: '#16161A', smoke2: '#2A2A30', smoke3: '#45444C',
  skin: '#E8B38A', skinSh: '#C48E68', skin2: '#E0A986', skin2Sh: '#BC8463',
  vTop: '#4F6D8A', vTopSh: '#3A5470', vTopHi: '#6585A3', vPants: '#565D66', vHair: '#2E241D', vHairHi: '#4A3A2E', stub: '#5C4636',
  mTop: '#9A86C2', mTopSh: '#7563A0', mTopHi: '#B4A3D6', mPants: '#7E6AA8', mHair: '#8A4A2A', mHairSh: '#653318', mHairHi: '#A8653D',
  kTop: '#7BC8A4', kTopSh: '#57A283', kTopHi: '#A2E0C3', kHair: '#D9B25A', kHairSh: '#AD8737', bear: '#A8754A', bearSh: '#7C5232',
  wood: '#5A4030', woodSh: '#3E2C21', woodHi: '#75573F', door: '#E3DDD2', doorSh: '#B9B1A4', steel: '#7D8D97', steelSh: '#4C5962', steelHi: '#A9B6BE',
  bed: '#3C4F7A', bedSh: '#2C3B5E', bedHi: '#5469A0', pillow: '#C9CFD8', pillowSh: '#9AA3B0',
  paper: '#0F2027', plan: '#17323C', planLine: '#7FB6C7', screen: '#0B1A24',
};
export const OL = (w = 6) => `stroke="${K.ol}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const BG = (c = K.bg) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${c}"/>`;
export const FG = (y = 1400) => `<rect x="-20" y="${y}" width="1120" height="${1980 - y}" fill="url(#vFg)"/>`;
export function shk(t, t0, a, d = 6) { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; }
export const blinkAt = (t, off = 0) => { const k = (t + off) % 2.9; return k > 2.75 ? Math.sin((k - 2.75) / .15 * Math.PI) : 0; };
export const talkAt = (t, a, b) => t > a && t < b ? .25 + .75 * Math.abs(Math.sin((t - a) * 17)) * (.6 + .4 * Math.sin(t * 5.3)) : 0;
// camera move: zoom about (cx,cy)
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${cx + dx} ${cy + dy}) scale(${s}) translate(${-cx} ${-cy})">${inner}</g>`;

export const DEFS = `<defs>
<linearGradient id="vFg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#07090B" stop-opacity="0"/><stop offset=".22" stop-color="#07090B" stop-opacity=".9"/><stop offset="1" stop-color="#07090B"/></linearGradient>
<radialGradient id="vAmb" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB547" stop-opacity=".75"/><stop offset=".5" stop-color="#FFB547" stop-opacity=".22"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
<radialGradient id="vRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E5484D" stop-opacity=".75"/><stop offset=".55" stop-color="#E5484D" stop-opacity=".2"/><stop offset="1" stop-color="#E5484D" stop-opacity="0"/></radialGradient>
<radialGradient id="vFire" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FF8A3D" stop-opacity=".9"/><stop offset=".45" stop-color="#E5484D" stop-opacity=".35"/><stop offset="1" stop-color="#E5484D" stop-opacity="0"/></radialGradient>
<radialGradient id="vCold" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#CFE3F0" stop-opacity=".5"/><stop offset="1" stop-color="#CFE3F0" stop-opacity="0"/></radialGradient>
<radialGradient id="vBlue" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5AA0FF" stop-opacity=".85"/><stop offset=".5" stop-color="#3D8BFF" stop-opacity=".25"/><stop offset="1" stop-color="#3D8BFF" stop-opacity="0"/></radialGradient>
<radialGradient id="vSafe" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5FD08A" stop-opacity=".55"/><stop offset="1" stop-color="#5FD08A" stop-opacity="0"/></radialGradient>
<linearGradient id="vSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#070C12"/><stop offset=".7" stop-color="#132029"/><stop offset="1" stop-color="#22323B"/></linearGradient>
<linearGradient id="vSmokeV" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0E0E11" stop-opacity=".97"/><stop offset=".7" stop-color="#1E1E23" stop-opacity=".88"/><stop offset="1" stop-color="#2A2A30" stop-opacity=".5"/></linearGradient>
<linearGradient id="vDoor" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#D9D2C5"/><stop offset="1" stop-color="#B9B1A4"/></linearGradient>
<filter id="vSoft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="10"/></filter>
<filter id="vSoft2" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="4"/></filter>
</defs>`;

// ---------------- faces ----------------
function eyes(o, gap = 32, ey = -6, col = K.ol) {
  const lx = cl(o.look || 0, -14, 14), ly = cl(o.lookY || 0, -12, 12), bl = o.sleep ? 1 : (o.blink || 0), es = o.eyeS || 1;
  return [-gap, gap].map(ex => {
    if (bl >= .85) return `<path d="M ${ex - 14} ${ey + 2} Q ${ex} ${ey + 10} ${ex + 14} ${ey + 2}" fill="none" ${OL(5)}/>`;
    return `<ellipse cx="${ex}" cy="${ey}" rx="${13 * es}" ry="${Math.max(2, 16 * es * (1 - bl))}" fill="#F6F1E8" ${OL(4)}/>` +
      (bl < .6 ? `<circle cx="${ex + lx * .65}" cy="${ey + 1 + ly * .65}" r="${7 * Math.min(es, 1.15)}" fill="${col}"/><circle cx="${ex + lx * .65 + 2.5}" cy="${ey - 2 + ly * .65}" r="2.2" fill="#fff"/>` : '');
  }).join('');
}
function brows(type, col, y0 = -34, gap = 32) {
  const B = { calm: [[-18, 2, 16, 0], [-16, 0, 18, 2]], worry: [[-18, 6, 16, -8], [-16, -8, 18, 6]], up: [[-18, -8, 16, -12], [-16, -12, 18, -8]], angry: [[-18, -6, 16, 6], [-16, 6, 18, -6]] }[type || 'calm'];
  return [[-gap, B[0]], [gap, B[1]]].map(([c, b]) => `<path d="M ${c + b[0]} ${y0 + b[1]} L ${c + b[2]} ${y0 + b[3]}" stroke="${col}" stroke-width="9" stroke-linecap="round"/>`).join('');
}
function mouth(m, talk, y, w = 1) {
  if (talk > .05 || m === 'o' || m === 'scream') {
    const ry = m === 'scream' ? 24 : m === 'o' ? 15 : 4 + 13 * talk;
    return `<ellipse cx="0" cy="${y}" rx="${(m === 'scream' ? 20 : m === 'o' ? 12 : 17) * w}" ry="${ry}" fill="#3A1414" ${OL(4)}/>`;
  }
  if (m === 'smile') return `<path d="M ${-22 * w} ${y - 5} Q 0 ${y + 14} ${22 * w} ${y - 5}" fill="none" ${OL(6)}/>`;
  if (m === 'worried') return `<path d="M ${-22 * w} ${y + 6} Q 0 ${y - 8} ${22 * w} ${y + 6}" fill="none" ${OL(6)}/>`;
  if (m === 'tight') return `<path d="M ${-16 * w} ${y} L ${16 * w} ${y}" fill="none" ${OL(7)}/>`;
  return `<path d="M ${-18 * w} ${y} L ${18 * w} ${y}" fill="none" ${OL(6)}/>`;
}
// father: short dark hair, stubble
function vHead(o = {}) {
  return `<g transform="rotate(${o.tilt || 0})">
   <ellipse cx="-74" cy="6" rx="15" ry="20" fill="${K.skinSh}" ${OL(5)}/><ellipse cx="74" cy="6" rx="15" ry="20" fill="${K.skinSh}" ${OL(5)}/>
   <path d="M -74 -10 Q -76 92 0 98 Q 76 92 74 -10 Q 74 -96 0 -98 Q -74 -96 -74 -10 Z" fill="${K.skin}" ${OL(6)}/>
   <path d="M -70 26 Q -62 92 0 96 Q 62 92 70 26 Q 56 70 0 74 Q -56 70 -70 26 Z" fill="${K.stub}" opacity=".35"/>
   <path d="M -4 0 Q -12 26 0 30 Q 8 31 11 26" fill="none" stroke="${K.skinSh}" stroke-width="6" stroke-linecap="round"/>
   ${eyes(o, 30, -6)}${brows(o.brow, K.vHair, -34, 30)}
   ${mouth(o.mouth || 'flat', o.talk || 0, 58)}
   <path d="M -78 -8 Q -86 -110 0 -112 Q 84 -112 78 -8 Q 72 -54 50 -62 Q 20 -50 -6 -66 Q -40 -52 -62 -60 Q -74 -44 -78 -8 Z" fill="${K.vHair}" ${OL(6)}/>
   <path d="M -34 -92 Q 4 -104 40 -90" fill="none" stroke="${K.vHairHi}" stroke-width="8" stroke-linecap="round"/>
  </g>`;
}
function vBack(o = {}) {
  return `<g transform="rotate(${o.tilt || 0})"><ellipse cx="-74" cy="10" rx="15" ry="20" fill="${K.skinSh}" ${OL(5)}/><ellipse cx="74" cy="10" rx="15" ry="20" fill="${K.skinSh}" ${OL(5)}/>
   <path d="M -74 -10 Q -76 92 0 98 Q 76 92 74 -10 Q 74 -96 0 -98 Q -74 -96 -74 -10 Z" fill="${K.skinSh}" ${OL(6)}/>
   <path d="M -78 40 Q -90 -112 0 -114 Q 90 -112 78 40 Q 40 58 0 56 Q -40 58 -78 40 Z" fill="${K.vHair}" ${OL(6)}/>
   <path d="M -40 -90 Q 0 -104 40 -90" fill="none" stroke="${K.vHairHi}" stroke-width="8" stroke-linecap="round"/></g>`;
}
// mother: auburn hair, loose bun, side strand
function mHead(o = {}) {
  return `<g transform="rotate(${o.tilt || 0})">
   <circle cx="0" cy="-118" r="40" fill="${K.mHair}" ${OL(6)}/><path d="M -18 -132 Q 0 -146 18 -132" fill="none" stroke="${K.mHairHi}" stroke-width="6" stroke-linecap="round"/>
   <path d="M -80 -10 Q -96 100 -60 120 L -50 40 Z" fill="${K.mHairSh}" ${OL(5)}/>
   <path d="M -70 -8 Q -72 88 0 94 Q 72 88 70 -8 Q 70 -92 0 -94 Q -70 -92 -70 -8 Z" fill="${K.skin2}" ${OL(6)}/>
   <ellipse cx="-44" cy="34" rx="13" ry="8" fill="#F08F86" opacity=".4"/><ellipse cx="44" cy="34" rx="13" ry="8" fill="#F08F86" opacity=".4"/>
   <path d="M -4 0 Q -10 24 2 27" fill="none" stroke="${K.skin2Sh}" stroke-width="6" stroke-linecap="round"/>
   ${eyes(o, 29, -6)}
   <path d="M -50 -22 l -10 -6 M 50 -22 l 10 -6" stroke="${K.ol}" stroke-width="4" stroke-linecap="round"/>
   ${brows(o.brow, K.mHairSh, -34, 29)}
   ${mouth(o.mouth || 'flat', o.talk || 0, 56, .9)}
   <path d="M -76 0 Q -84 -104 0 -106 Q 84 -104 76 0 Q 66 -56 20 -64 Q -10 -40 -44 -60 Q -70 -40 -76 0 Z" fill="${K.mHair}" ${OL(6)}/>
   <path d="M 20 -64 Q 44 -44 50 -24" fill="none" stroke="${K.mHairSh}" stroke-width="6" stroke-linecap="round"/>
  </g>`;
}
function mBack(o = {}) {
  return `<g transform="rotate(${o.tilt || 0})"><circle cx="0" cy="-112" r="40" fill="${K.mHair}" ${OL(6)}/>
   <path d="M -76 30 Q -88 -108 0 -108 Q 88 -108 76 30 Q 40 60 0 58 Q -40 60 -76 30 Z" fill="${K.mHair}" ${OL(6)}/>
   <path d="M -30 -84 Q 0 -96 30 -84" fill="none" stroke="${K.mHairHi}" stroke-width="7" stroke-linecap="round"/></g>`;
}
// child: big head, blond tuft
function kHead(o = {}) {
  return `<g transform="rotate(${o.tilt || 0})">
   <ellipse cx="-70" cy="8" rx="13" ry="17" fill="${K.skinSh}" ${OL(5)}/><ellipse cx="70" cy="8" rx="13" ry="17" fill="${K.skinSh}" ${OL(5)}/>
   <ellipse cx="0" cy="6" rx="72" ry="78" fill="${K.skin}" ${OL(6)}/>
   <ellipse cx="-42" cy="34" rx="14" ry="9" fill="#F08F86" opacity=".5"/><ellipse cx="42" cy="34" rx="14" ry="9" fill="#F08F86" opacity=".5"/>
   ${eyes(Object.assign({ eyeS: 1.12 }, o), 27, 2)}${brows(o.brow, K.kHairSh, -26, 27)}
   ${mouth(o.mouth || 'small', o.talk || 0, 46, .7)}
   <path d="M -74 -4 Q -82 -86 0 -86 Q 82 -86 74 -4 Q 62 -40 30 -46 L 22 -32 L 8 -48 L -10 -34 L -22 -50 Q -64 -44 -74 -4 Z" fill="${K.kHair}" ${OL(6)}/>
   <path d="M -6 -84 Q 4 -112 20 -104 Q 10 -98 12 -84" fill="${K.kHair}" ${OL(5)}/>
  </g>`;
}
function kBack(o = {}) {
  return `<g transform="rotate(${o.tilt || 0})"><ellipse cx="0" cy="6" rx="72" ry="78" fill="${K.skinSh}" ${OL(6)}/>
   <path d="M -76 30 Q -86 -88 0 -88 Q 86 -88 76 30 Q 40 56 0 54 Q -40 56 -76 30 Z" fill="${K.kHair}" ${OL(6)}/>
   <path d="M -6 -86 Q 4 -114 20 -106 Q 10 -100 12 -86" fill="${K.kHair}" ${OL(5)}/></g>`;
}

// ---------------- bodies ----------------
const PR = {
  v: { sh: 108, hip: 70, torso: 330, leg: 330, L1: 148, L2: 136, aw: 52, top: K.vTop, topSh: K.vTopSh, topHi: K.vTopHi, pants: K.vPants, skin: K.skin, head: vHead, back: vBack, neck: 112, hr: 26 },
  m: { sh: 98, hip: 66, torso: 320, leg: 310, L1: 138, L2: 128, aw: 46, top: K.mTop, topSh: K.mTopSh, topHi: K.mTopHi, pants: K.mPants, skin: K.skin2, head: mHead, back: mBack, neck: 108, hr: 24, sleeve: true },
  k: { sh: 66, hip: 44, torso: 190, leg: 180, L1: 86, L2: 80, aw: 34, top: K.kTop, topSh: K.kTopSh, topHi: K.kTopHi, pants: K.kTop, skin: K.skin, head: kHead, back: kBack, neck: 96, hr: 19 },
};
export const PROF = PR;
export function arm(sx, sy, a1, a2, side, L1, L2, col, w, skin, hr) {
  const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
  const ex = sx + side * Math.sin(r1) * L1, ey = sy + Math.cos(r1) * L1;
  const hx = ex + side * Math.sin(r2) * L2, hy = ey + Math.cos(r2) * L2;
  const d = `M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx.toFixed(1)} ${hy.toFixed(1)}`;
  return { hx, hy, svg: `<path d="${d}" fill="none" stroke="${K.ol}" stroke-width="${w + 12}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="${hr}" fill="${skin}" ${OL(5)}/>` };
}
function ik(side, sx, sy, tx, ty, L1, L2, flip = 1) {
  const dx = tx - sx, dy = ty - sy, D = cl(Math.hypot(dx, dy), 1, L1 + L2 - 1);
  const ad = Math.atan2(side * dx, dy), al = Math.acos(cl((L1 * L1 + D * D - L2 * L2) / (2 * L1 * D), -1, 1));
  const a1 = ad + flip * al, ex = sx + side * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1;
  return [a1 * 180 / Math.PI, Math.atan2(side * (tx - ex), ty - ey) * 180 / Math.PI];
}
// arm angles for person(kind,x,y,s) so that the hand on `side` (-1 screen-left, 1 screen-right) reaches world (tx,ty)
export function reach(kind, x, y, s, side, tx, ty, flip = 1) { const P = PR[kind]; return ik(side, side * P.sh, 30, (tx - x) / s, (ty - y) / s, P.L1, P.L2, flip); }
// person: origin = centre of the shoulder line. o: aL/aR [upper, fore] deg, back, walk (phase rad), stride, noLegs, lean, head opts
export function person(kind, x, y, s, o = {}) {
  const P = PR[kind];
  const aL = o.aL || [8, 4], aR = o.aR || [8, 4];
  const L = arm(-P.sh, 30, aL[0], aL[1], -1, P.L1, P.L2, P.top, P.aw, P.skin, P.hr), R = arm(P.sh, 30, aR[0], aR[1], 1, P.L1, P.L2, P.top, P.aw, P.skin, P.hr);
  const st = o.stride ?? 20, ph = o.walk;
  const lg = (side, ang) => {
    const r = ang * Math.PI / 180, hx = side * P.hip, hy = P.torso - 10;
    const fx = hx + Math.sin(r) * P.leg, fy = hy + Math.cos(r) * P.leg;
    return `<path d="M ${hx} ${hy} L ${fx.toFixed(1)} ${fy.toFixed(1)}" stroke="${K.ol}" stroke-width="${P.aw + 24}" stroke-linecap="round"/><path d="M ${hx} ${hy} L ${fx.toFixed(1)} ${fy.toFixed(1)}" stroke="${P.pants}" stroke-width="${P.aw + 12}" stroke-linecap="round"/>
      <ellipse cx="${(fx + side * 8).toFixed(1)}" cy="${(fy + 6).toFixed(1)}" rx="${P.aw * .7}" ry="${P.aw * .38}" fill="${P.skin}" ${OL(5)}/>`;
  };
  const legs = o.noLegs ? '' : lg(-1, ph === undefined ? (o.legL ?? 3) : st * Math.sin(ph)) + lg(1, ph === undefined ? (o.legR ?? -3) : -st * Math.sin(ph));
  const bob = ph === undefined ? 0 : -6 * Math.abs(Math.cos(ph));
  const head = o.back ? P.back(o) : P.head(o);
  const w = P.sh + 18, hb = P.torso;
  return `<g transform="translate(${x} ${y + bob * s}) rotate(${o.lean || 0}) scale(${s})">
    ${legs}
    ${o.back ? L.svg + R.svg : ''}
    <path d="M ${-w} 40 Q ${-w} -10 ${-P.sh + 30} -18 L ${P.sh - 30} -18 Q ${w} -10 ${w} 40 L ${w - 6} ${hb} L ${-w + 6} ${hb} Z" fill="${P.top}" ${OL(6)}/>
    <path d="M ${P.sh - 40} -14 Q ${w} -8 ${w} 40 L ${w - 6} ${hb} L ${P.sh - 30} ${hb} Z" fill="${P.topSh}"/>
    ${kind === 'k' && !o.back ? [[-30, 80], [26, 140], [-22, 190], [34, 40]].map(([a, b]) => `<path d="M ${a} ${b - 9} l 3 6 7 1 -5 5 1 7 -6 -3 -6 3 1 -7 -5 -5 7 -1 Z" fill="${K.kTopHi}"/>`).join('') : ''}
    ${kind === 'v' && !o.back ? `<path d="M -40 -16 Q 0 24 40 -16" fill="none" stroke="${K.vTopSh}" stroke-width="8"/>` : ''}
    ${kind === 'm' && !o.back ? `<path d="M -36 -16 L 0 30 L 36 -16" fill="none" stroke="${K.mTopHi}" stroke-width="7"/><circle cx="0" cy="90" r="6" fill="${K.mTopHi}"/><circle cx="0" cy="150" r="6" fill="${K.mTopHi}"/>` : ''}
    <g transform="translate(${o.hdx || 0} ${-P.neck + (o.hdy || 0)})">${head}</g>
    ${o.holdL ? o.holdL(L.hx, L.hy) : ''}${o.holdR ? o.holdR(R.hx, R.hy) : ''}
    ${o.back ? '' : (o.noArmL ? '' : L.svg) + (o.noArmR ? '' : R.svg)}
    ${o.front || ''}
  </g>`;
}
// head only (close-ups), centred at (x,y)
export function head(kind, x, y, s, o = {}) { const P = PR[kind]; return `<g transform="translate(${x} ${y}) scale(${s})">${o.back ? P.back(o) : P.head(o)}</g>`; }
// a sleeve arm from a visible shoulder (sx,sy) to a hand (hx,hy) — close-ups
export function armTo(sx, sy, hx, hy, w, col, flip = 1, skin = K.skin) {
  const L = Math.hypot(hx - sx, hy - sy) || 1, h = Math.sqrt(Math.max(0, (L * .56) ** 2 - (L / 2) ** 2));
  const ex = (sx + hx) / 2 + flip * h * (hy - sy) / L, ey = (sy + hy) / 2 - flip * h * (hx - sx) / L;
  const d = `M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx} ${hy}`;
  return `<path d="${d}" fill="none" stroke="${K.ol}" stroke-width="${w + 14}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${hx}" cy="${hy}" r="${w * .52}" fill="${skin}" ${OL(6)}/>`;
}
// big hand (close-up): fist with fingers wrapped around a horizontal bar at (x,y)
export function grip(x, y, s, rot = 0, skin = K.skin) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="-70" y="-48" width="120" height="96" rx="40" fill="${skin}" ${OL(6)}/>
    <path d="M -40 -46 V 46 M -10 -46 V 46 M 20 -46 V 46" stroke="${K.skinSh}" stroke-width="5"/>
    <path d="M 40 -30 Q 74 -20 66 16 Q 58 30 40 24" fill="${skin}" ${OL(5)}/></g>`;
}
export const bear = (x, y, s, rot = 0) => `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
  <circle cx="-30" cy="-62" r="16" fill="${K.bear}" ${OL(4)}/><circle cx="30" cy="-62" r="16" fill="${K.bear}" ${OL(4)}/>
  <ellipse cx="0" cy="20" rx="44" ry="50" fill="${K.bear}" ${OL(5)}/><circle cx="0" cy="-40" r="38" fill="${K.bear}" ${OL(5)}/>
  <ellipse cx="0" cy="-30" rx="15" ry="11" fill="#D9B08A"/><circle cx="0" cy="-35" r="5" fill="${K.ol}"/><circle cx="-14" cy="-48" r="4" fill="${K.ol}"/><circle cx="14" cy="-48" r="4" fill="${K.ol}"/></g>`;

// ---------------- smoke ----------------
// puffs emitted from (x0,y0) from t0 on, travelling (vx,vy) px/s with spread, growing; deterministic.
export function smokeFlow(t, o) {
  const { t0 = 0, x0, y0, vx = 0, vy = -60, n = 40, gap = .08, life = 3, r0 = 30, grow = 60, spread = 40, seed = 1, rise = 0, op = .9, max = 99 } = o;
  let s = '';
  for (let i = 0; i < n; i++) {
    const age = t - t0 - i * gap;
    if (age <= 0) continue;
    const p = age / life; if (p >= 1 && !o.keep) continue;
    const a = Math.min(age, o.keep ? life : age);
    const h1 = hash(i * 7.1 + seed), h2 = hash(i * 3.3 + seed * 2), h3 = hash(i * 1.7 + seed * 5);
    const x = x0 + vx * a * (.7 + .6 * h1) + (h2 - .5) * spread * (1 + a) + 14 * Math.sin(t * 1.3 + i);
    const y = y0 + vy * a * (.7 + .6 * h2) - rise * a * a + (h3 - .5) * spread * .6 * (1 + a) + 10 * Math.cos(t * 1.1 + i);
    const r = Math.min(max, r0 + grow * a * (.6 + .8 * h3));
    const c = h1 > .66 ? K.smoke3 : h1 > .3 ? K.smoke2 : K.smoke;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${r.toFixed(1)}" fill="${c}" opacity="${(op * (o.keep ? 1 : Math.min(1, (1 - p) * 2))).toFixed(2)}"/>`;
  }
  return `<g filter="url(#vSoft2)">${s}</g>`;
}
// a slowly churning smoke mass filling a rectangle (stairwell, corridor)
export function smokeMass(t, x, y, w, h, o = {}) {
  const n = o.n || 26, seed = o.seed || 3; let s = `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#vSmokeV)" opacity="${o.op ?? .92}"/>`;
  for (let i = 0; i < n; i++) {
    const h1 = hash(i + seed), h2 = hash(i * 2.3 + seed), h3 = hash(i * 5.1 + seed);
    const cx = x + w * ((h1 + t * (.02 + .04 * h3)) % 1), cy = y + h * (.1 + .8 * h2) + 26 * Math.sin(t * (.8 + h3) + i);
    const r = (o.r || 90) * (.6 + .8 * h3);
    s += `<circle cx="${cx.toFixed(1)}" cy="${cy.toFixed(1)}" r="${r.toFixed(1)}" fill="${h1 > .6 ? K.smoke3 : K.smoke2}" opacity="${(.45 + .4 * h2).toFixed(2)}"/>`;
  }
  return `<g filter="url(#vSoft)">${s}</g>`;
}

// ---------------- UI pieces ----------------
export function lab(str, cx, cy, sz, p, col = '#FFFFFF', bg = K.ol, rot = 0) {
  if (p <= 0) return '';
  const w = str.length * sz * .64 + sz * .9, h = sz * 1.38;
  return `<g transform="translate(${cx} ${cy}) scale(${p}) rotate(${rot - 3 * (1 - cl(p))})">
    <rect x="${-w / 2 + 10}" y="${-h / 2 + 12}" width="${w}" height="${h}" rx="14" fill="#000" opacity=".5"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="14" fill="${bg}" stroke="${col}" stroke-opacity=".35" stroke-width="4"/>
    ${TX(str, 0, sz * .36, sz, col, 'middle', 'letter-spacing="3"')}
  </g>`;
}
// REGEL n card: stamps in at p (0..1 back-eased), amber number
export function regel(n, cx, cy, p, sub = '') {
  if (p <= 0) return '';
  return `<g transform="translate(${cx} ${cy}) scale(${p}) rotate(${-4 + 2 * (1 - cl(p))})">
    <rect x="-262" y="-104" width="540" height="220" rx="26" fill="#000" opacity=".55"/>
    <rect x="-270" y="-112" width="540" height="220" rx="26" fill="${K.ol}" stroke="${K.amb}" stroke-width="8"/>
    ${TX('REGEL', -82, 34, 92, '#FFFFFF', 'middle', 'letter-spacing="4"')}
    <circle cx="180" cy="-2" r="80" fill="${K.amb}" ${OL(6)}/>${TX(String(n), 180, 40, 116, K.ol)}
    ${sub ? TX(sub, 0, 168, 46, K.amb, 'middle', 'letter-spacing="4"') : ''}
  </g>`;
}
export function xMark(cx, cy, s, p) {
  if (p <= 0) return '';
  const d1 = cl(p * 2), d2 = cl(p * 2 - 1), L = 150;
  return `<g transform="translate(${cx} ${cy}) scale(${s * (1 + .25 * (1 - cl(p * 1.4)))})">
    <circle cx="0" cy="0" r="190" fill="${K.red}" opacity="${.18 * cl(p * 2)}"/>
    <path d="M ${-L} ${-L} L ${-L + 2 * L * d1} ${-L + 2 * L * d1}" stroke="${K.ol}" stroke-width="64" stroke-linecap="round"/>
    ${d2 > 0 ? `<path d="M ${L} ${-L} L ${L - 2 * L * d2} ${-L + 2 * L * d2}" stroke="${K.ol}" stroke-width="64" stroke-linecap="round"/>` : ''}
    <path d="M ${-L} ${-L} L ${-L + 2 * L * d1} ${-L + 2 * L * d1}" stroke="${K.red}" stroke-width="44" stroke-linecap="round"/>
    ${d2 > 0 ? `<path d="M ${L} ${-L} L ${L - 2 * L * d2} ${-L + 2 * L * d2}" stroke="${K.red}" stroke-width="44" stroke-linecap="round"/>` : ''}
  </g>`;
}
export function check(cx, cy, s, p) {
  if (p <= 0) return '';
  const d = cl(p);
  return `<g transform="translate(${cx} ${cy}) scale(${s})"><circle r="120" fill="${K.safe}" opacity=".18"/>
   <path d="M -70 0 L -20 50 L 80 -60" fill="none" stroke="${K.ol}" stroke-width="52" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="300" stroke-dashoffset="${300 * (1 - d)}"/>
   <path d="M -70 0 L -20 50 L 80 -60" fill="none" stroke="${K.safe}" stroke-width="32" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="300" stroke-dashoffset="${300 * (1 - d)}"/></g>`;
}
export function rings(t, t0, x, y, col = K.red, n = 3, r1 = 260, w = 10) {
  let s = '';
  for (let k = 0; k < n; k++) { const p = prog(t, t0 + k * .1, t0 + .7 + k * .1); if (p > 0 && p < 1) s += `<circle cx="${x}" cy="${y}" r="${40 + p * r1}" fill="none" stroke="${col}" stroke-width="${w * (1 - p)}" opacity="${.8 * (1 - p)}"/>`; }
  return s;
}
// repeating alarm rings every `per` seconds
export function alarmRings(t, t0, x, y, per = .5, r1 = 300) {
  if (t < t0) return '';
  let s = ''; const k0 = Math.floor((t - t0) / per);
  for (let k = Math.max(0, k0 - 2); k <= k0; k++) s += rings(t, t0 + k * per, x, y, K.red, 1, r1, 12);
  return s;
}
// ceiling smoke detector, centre (x,y); led 0..1
export function detector(x, y, s, led) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="40" rx="${150 + 80 * led}" ry="${70 + 40 * led}" fill="url(#vRed)" opacity="${led}"/>
    <rect x="-150" y="-60" width="300" height="40" rx="10" fill="#CFD4D8" ${OL(6)}/>
    <path d="M -150 -20 Q -150 50 -110 66 L 110 66 Q 150 50 150 -20 Z" fill="#E8ECEF" ${OL(6)}/>
    ${[-90, -54, -18, 18, 54, 90].map(x2 => `<rect x="${x2 - 8}" y="0" width="16" height="44" rx="8" fill="#B8BFC5"/>`).join('')}
    <circle cx="96" cy="44" r="13" fill="${led > .5 ? K.red : '#5A2224'}" ${OL(3)}/>
    ${led > .5 ? `<circle cx="96" cy="44" r="30" fill="${K.red}" opacity=".45" filter="url(#vSoft2)"/>` : ''}</g>`;
}
// phone (portrait), centre (x,y)
export function phone(x, y, s, rot, screen = '', glow = 1) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    ${glow > 0 ? `<ellipse cx="0" cy="0" rx="260" ry="300" fill="url(#vCold)" opacity="${.7 * glow}"/>` : ''}
    <rect x="-96" y="-180" width="192" height="360" rx="30" fill="#1A2126" ${OL(6)}/>
    <rect x="-82" y="-160" width="164" height="318" rx="16" fill="${K.screen}"/>
    <g>${screen}</g>
    <rect x="-24" y="-172" width="48" height="8" rx="4" fill="#2C353B"/>
  </g>`;
}
export const pin = (x, y, s, col = K.amb) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 0 0 Q -60 -70 -60 -110 A 60 60 0 1 1 60 -110 Q 60 -70 0 0 Z" fill="${col}" ${OL(6)}/><circle cx="0" cy="-110" r="22" fill="${K.ol}"/></g>`;
// pictograms (white line icons, local size ~100)
export const icon = {
  house: (x, y, s, c = '#fff') => `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${c}" stroke-width="10" stroke-linejoin="round" stroke-linecap="round"><path d="M -50 0 L 0 -46 L 50 0 M -36 -12 V 46 H 36 V -12"/><rect x="-12" y="14" width="24" height="32"/></g>`,
  floors: (x, y, s, c = '#fff', hi = 2) => `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-40" y="-60" width="80" height="120" fill="none" stroke="${c}" stroke-width="10"/>${[0, 1, 2, 3].map(i => `<rect x="-28" y="${34 - i * 28}" width="56" height="16" fill="${i === hi ? K.amb : c}" opacity="${i === hi ? 1 : .35}"/>`).join('')}</g>`,
  people: (x, y, s, c = '#fff', n = 3) => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}">${[[-46, 1], [0, .7], [46, 1]].slice(0, n).map(([px, k]) => `<circle cx="${px}" cy="${-28 * k - 6}" r="${15 * k}"/><path d="M ${px - 22 * k} 40 Q ${px - 22 * k} ${-6 * k} ${px} ${-8 * k} Q ${px + 22 * k} ${-6 * k} ${px + 22 * k} 40 Z"/>`).join('')}</g>`,
  stairsSmoke: (x, y, s) => `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -60 50 H -30 V 20 H 0 V -10 H 30 V -40 H 60" fill="none" stroke="#fff" stroke-width="10" stroke-linejoin="round"/><circle cx="-20" cy="-30" r="26" fill="${K.smoke3}"/><circle cx="10" cy="-46" r="30" fill="#5B5A63"/><circle cx="40" cy="-20" r="22" fill="${K.smoke3}"/></g>`,
  child: (x, y, s, c = '#fff') => `<g transform="translate(${x} ${y}) scale(${s})" fill="${c}"><circle cx="0" cy="-30" r="22"/><path d="M -26 46 Q -26 -4 0 -4 Q 26 -4 26 46 Z"/></g>`,
};

// ---------------- sets ----------------
// apartment wall with window to the night (opposite blocks)
export function nightWindow(x, y, w, h, t, o = {}) {
  let blocks = '';
  for (let b = 0; b < 3; b++) {
    const bx = x + 20 + b * w * .36, bw = w * .3, bt = y + h * (.25 + .12 * (b % 2));
    blocks += `<rect x="${bx}" y="${bt}" width="${bw}" height="${y + h - bt}" fill="#172128"/>`;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) { const lit = hash(b * 31 + r * 7 + c) > .82; if (bt + 20 + r * 34 < y + h - 20) blocks += `<rect x="${bx + 12 + c * bw * .3}" y="${bt + 16 + r * 34}" width="${bw * .18}" height="18" fill="${lit ? '#FFC46B' : '#0E1418'}" opacity="${lit ? .8 : 1}"/>`; }
  }
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#vSky)"/>${blocks}
    <circle cx="${x + w * .78}" cy="${y + h * .16}" r="22" fill="${K.cold}" opacity=".85"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" ${OL(10)}/><path d="M ${x + w / 2} ${y} V ${y + h} M ${x} ${y + h * .45} H ${x + w}" stroke="${K.ol}" stroke-width="12"/>`;
}
// front door of the flat (inside view), hinge on the left; open = 0..1 (crack ~.12)
export function flatDoor(x, y, w, h, open, o = {}) {
  const ow = w * (1 - .78 * open), sk = 26 * open;
  return `<rect x="${x - 20}" y="${y - 20}" width="${w + 40}" height="${h + 20}" fill="${K.doorSh}" ${OL(7)}/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.gap || '#2A1A16'}"/>
    ${o.inGap || ''}
    <polygon points="${x},${y} ${x + ow},${y + sk} ${x + ow},${y + h - sk} ${x},${y + h}" fill="url(#vDoor)" ${OL(6)}/>
    <circle cx="${x + ow * .5}" cy="${y + h * .24}" r="${10 * (1 - .6 * open)}" fill="#2B3135" ${OL(3)}/>
    <g transform="translate(${x + ow - 46 * (1 - .7 * open)} ${y + h * .52}) rotate(${o.handle || 0})"><circle cx="0" cy="0" r="16" fill="${K.steelHi}" ${OL(4)}/><rect x="-70" y="-10" width="76" height="22" rx="10" fill="${K.steelHi}" ${OL(4)}/></g>
    <rect x="${x + ow - 60 * (1 - .7 * open)}" y="${y + h * .52 + 40}" width="28" height="50" rx="8" fill="${K.steel}" ${OL(3)}/>`;
}
// stairwell slice with fire glow below; smoke level 0..1
export function stairwell(t, o = {}) {
  const fl = .6 + .4 * Math.sin(t * 13) * Math.sin(t * 7.3);
  let steps = '';
  for (let i = 0; i < 9; i++) steps += `<rect x="${120 + i * 70}" y="${1300 - i * 60}" width="${1000 - i * 70}" height="62" fill="${i % 2 ? '#3A3F44' : '#33383D'}" ${OL(4)}/>`;
  let rail = '';
  for (let i = 0; i < 9; i++) rail += `<path d="M ${150 + i * 70} ${1300 - i * 60} V ${1180 - i * 60}" stroke="${K.steel}" stroke-width="8"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#2B2F33"/>
    <rect x="0" y="0" width="1080" height="1920" fill="#1F2327" opacity=".5"/>
    ${steps}${rail}<path d="M 120 1180 L 750 640" stroke="${K.steelHi}" stroke-width="14" stroke-linecap="round"/>
    <rect x="0" y="1360" width="1080" height="600" fill="#24272A"/>
    <ellipse cx="300" cy="1500" rx="700" ry="420" fill="url(#vFire)" opacity="${.85 * fl}"/>
    ${o.noMass ? '' : smokeMass(t, -60, -60, 1200, 1500 * (o.level ?? 1) + 60, { n: 30, r: 120, seed: 4 })}`;
}
// building facade at night; win = [col,row] of the family window; opts: lit, wave
export function facade(t, o = {}) {
  const cols = 4, rows = 7, x0 = 140, y0 = 260, cw = 200, rh = 170;
  const fw = o.fam || [2, 3];
  let w = '';
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const x = x0 + c * cw + 34, y = y0 + r * rh + 40, fam = c === fw[0] && r === fw[1];
    const lit = fam ? 1 : hash(r * 5 + c * 3 + 2) > .62 ? .9 : 0;
    w += `<rect x="${x}" y="${y}" width="132" height="96" fill="${fam ? (o.famCol || '#FFC46B') : lit ? '#FFC46B' : '#0E1418'}" opacity="${fam ? 1 : lit ? .55 : 1}" ${OL(5)}/>`;
    if (r >= 1 && c !== 0) w += `<rect x="${x - 10}" y="${y + 92}" width="152" height="12" fill="#3A4B56" ${OL(3)}/>`;
  }
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#vSky)"/>
    <rect x="${x0}" y="${y0}" width="${cols * cw + 68}" height="${rows * rh + 300}" fill="#2B3943" ${OL(7)}/>
    <rect x="${x0 + cols * cw - 120}" y="${y0}" width="188" height="${rows * rh + 300}" fill="#1F2A32"/>
    ${w}
    <rect x="-20" y="${y0 + rows * rh + 160}" width="1120" height="600" fill="#151C21"/>`;
}
export function famWindowXY(o = {}) { const fw = o.fam || [2, 3]; return [140 + fw[0] * 200 + 34 + 66, 260 + fw[1] * 170 + 40 + 48]; }
// fire engine (side view), (x,y) = rear wheel ground point, light phase t
export function fireTruck(x, y, s, t) {
  const on = Math.sin(t * 18) > 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="300" cy="-210" rx="${on ? 220 : 160}" ry="${on ? 160 : 120}" fill="url(#vBlue)" opacity="${on ? 1 : .5}"/>
    <rect x="-80" y="-230" width="640" height="190" rx="16" fill="#C8262B" ${OL(7)}/>
    <rect x="420" y="-300" width="180" height="260" rx="22" fill="#D93036" ${OL(7)}/>
    <rect x="450" y="-280" width="120" height="90" rx="10" fill="#9CC6E6" ${OL(5)}/>
    <rect x="-60" y="-262" width="460" height="22" rx="8" fill="${K.steelHi}" ${OL(5)}/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<path d="M ${-40 + i * 70} -262 V -240" stroke="${K.ol}" stroke-width="5"/>`).join('')}
    <rect x="-60" y="-160" width="460" height="16" fill="#F2F2F2" opacity=".85"/>
    <rect x="460" y="-322" width="90" height="26" rx="8" fill="${on ? K.blueHi : '#2A4E8C'}" ${OL(4)}/>
    <circle cx="0" cy="-40" r="56" fill="#22282C" ${OL(6)}/><circle cx="0" cy="-40" r="20" fill="${K.steel}"/>
    <circle cx="470" cy="-40" r="56" fill="#22282C" ${OL(6)}/><circle cx="470" cy="-40" r="20" fill="${K.steel}"/></g>`;
}
// top-down floor plan of the flat (dark blueprint). o: smoke 0..1 at the entrance, doors [0..1 closed], dots
export const PLAN = { x: 120, y: 260, w: 840, h: 1000 };
export function floorPlan(t, o = {}) {
  const { x, y, w, h } = PLAN, L = K.planLine;
  const sm = o.smoke ?? 1;
  let s = `<rect x="0" y="0" width="1080" height="1920" fill="${K.paper}"/>`;
  for (let i = 0; i < 20; i++) s += `<path d="M ${i * 60} 0 V 1920 M 0 ${i * 100} H 1080" stroke="#173540" stroke-width="2"/>`;
  // stairwell strip at the top, flat below. Entrance door at top-left (hall), shelter room bottom-right
  s += `<rect x="${x}" y="${y - 170}" width="${w}" height="150" fill="#24282C" stroke="${L}" stroke-width="6"/>`;
  s += `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${K.plan}" stroke="${L}" stroke-width="10"/>`;
  // walls: hall corridor down the left, rooms on the right
  s += `<path d="M ${x + 300} ${y} V ${y + 380} M ${x + 300} ${y + 520} V ${y + h} M ${x + 300} ${y + 600} H ${x + w} M ${x + 300} ${y + 300} H ${x + 560} M ${x + 680} ${y + 300} H ${x + w}" stroke="${L}" stroke-width="8"/>`;
  // room labels (pictograms instead of words): bed in shelter room, window marks
  s += `<rect x="${x + 520}" y="${y + 720}" width="200" height="140" rx="14" fill="none" stroke="${L}" stroke-width="5" opacity=".7"/><rect x="${x + 540}" y="${y + 735}" width="60" height="40" rx="8" fill="${L}" opacity=".4"/>`;
  s += `<path d="M ${x + w - 4} ${y + 720} V ${y + 900}" stroke="#CFE8F0" stroke-width="18"/><path d="M ${x + 500} ${y + h} H ${x + 700}" stroke="#CFE8F0" stroke-width="18"/>`;
  // smoke in the stairwell + behind the entrance door
  if (sm > 0) s += `<g filter="url(#vSoft)" opacity="${sm}">${[0, 1, 2, 3, 4, 5, 6].map(i => `<circle cx="${x + 60 + i * 120 + 10 * Math.sin(t * 2 + i)}" cy="${y - 95 + 12 * Math.cos(t * 1.7 + i)}" r="${70 + 10 * Math.sin(t + i)}" fill="${i % 2 ? K.smoke3 : K.smoke2}"/>`).join('')}</g>`;
  if (o.leak) s += `<g filter="url(#vSoft)" opacity="${o.leak}">${[0, 1, 2].map(i => `<circle cx="${x + 150 + 40 * i}" cy="${y + 40 + 30 * i}" r="${60 - 10 * i}" fill="${K.smoke3}"/>`).join('')}</g>`;
  // doors: d0 entrance (top of hall), d1 hall→shelter room, d2 corridor door
  const dr = (hx, hy, len, ang0, closed, horiz) => {
    const a = (ang0 + (1 - closed) * 80) * Math.PI / 180;
    const ex = hx + Math.cos(a) * len, ey = hy + Math.sin(a) * len;
    const ok = closed > .95;
    return `<path d="M ${hx} ${hy} L ${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${ok ? K.safe : '#E3DDD2'}" stroke-width="${ok ? 16 : 12}" stroke-linecap="round"/>${ok ? `<path d="M ${hx} ${hy} L ${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${K.safe}" stroke-width="44" stroke-linecap="round" opacity=".25"/>` : ''}`;
  };
  const D = o.doors || [1, 0, 0];
  s += dr(x + 70, y, 170, 0, D[0], 1);                 // entrance (stairwell side)
  s += dr(x + 300, y + 520, 140, -90, D[1], 0);         // hall → back corridor
  s += dr(x + 560, y + 600, 120, 0, D[2], 1);           // shelter room door
  if (o.shelterGlow) s += `<rect x="${x + 300}" y="${y + 600}" width="${w - 300}" height="${h - 600}" fill="${K.safe}" opacity="${.18 * o.shelterGlow}"/>`;
  if (o.winGlow) s += `<circle cx="${x + w}" cy="${y + 810}" r="${90 + 10 * Math.sin(t * 6)}" fill="url(#vAmb)" opacity="${o.winGlow}"/>`;
  return s;
}
// family as three dots on the plan, path progress p (0..1) along a polyline
export function planDots(p, pts, o = {}) {
  const gp = o.gap ?? .05;
  const seg = []; let tot = 0;
  for (let i = 1; i < pts.length; i++) { const l = Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); seg.push(l); tot += l; }
  const at = q => { let d = cl(q) * tot; for (let i = 0; i < seg.length; i++) { if (d <= seg[i]) { const f = d / (seg[i] || 1); return [lerp(pts[i][0], pts[i + 1][0], f), lerp(pts[i][1], pts[i + 1][1], f)]; } d -= seg[i]; } return pts[pts.length - 1]; };
  const cols = [K.vTop, K.kTop, K.mTop], rr = [30, 22, 28];
  return [0, 1, 2].map(i => { const [cx, cy] = at(p - i * gp); return `<circle cx="${cx}" cy="${cy}" r="${rr[i] + 10}" fill="${cols[i]}" opacity=".25"/><circle cx="${cx}" cy="${cy}" r="${rr[i]}" fill="${cols[i]}" ${OL(5)}/>`; }).join('');
}
