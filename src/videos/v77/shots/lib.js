// v77 "Brot neben dem Ameisennest" — channel 5 stick-figure kit (style: jobs/v77/style.md).
// stick() and its helpers are copied unchanged from v67 (channel host, prompts/hosts.md); ants, bread, nest and scent trail are new for v77.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  bg: '#F4EFE6', ink: '#1B1B1F', white: '#FFFFFF', paper: '#FBF8F2',
  blue: '#2F4BDB', red: '#E5484D', orange: '#F28C28', orangeD: '#D9741A', teal: '#14A38B',
  grass: '#CFE3B4', grassD: '#A9CB8A', sky: '#F4EFE6', fence: '#E9DCC6', fenceD: '#D7C6AA',
  wood: '#C99A6B', woodD: '#A97B4F',
  cola: '#5B2C17', colaL: '#7A3D20', foam: '#F3E3C8', foamD: '#E2CBA4', glass: '#E7F1F3',
  grey: '#8B8B93', soil: '#D8BC8E', soilD: '#B99668', soilL: '#E6D0A8', crust: '#B8742E', crumb: '#F3D9A4', jam: '#C8283A', jamL: '#E85566', ant: '#2A1C16', antL: '#5A4034', trail: '#14A38B', trailL: '#7FDCC8',
};
export const LW = 7;
export const f1 = v => (+v).toFixed(1);
export const OL = (w = LW, c = K.ink) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f = K.ink, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const BG = (c = K.bg) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${c}"/>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const pt = (a, b) => `${f1(a)} ${f1(b)}`;

// ---------- keyword card (max one per shot) ----------
export function card(x, y, txt, sz, a = 1, o = {}) {
  if (a <= 0) return '';
  const w = txt.length * sz * .66 + sz * 1.1, h = sz * 1.5, s = lerp(.85, 1, eout(cl(a)));
  return `<g opacity="${cl(a).toFixed(3)}" transform="translate(${f1(x)} ${f1(y)}) rotate(${o.rot || 0}) scale(${s.toFixed(3)})">
  <rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="${f1(sz * .28)}" fill="${o.fill || K.white}" ${OL(6)}/>
  ${TX(txt, 0, sz * .36, sz, o.col || K.ink)}</g>`;
}
// headline on the cover
export function headline(lines, y, a = 1) {
  return `<g opacity="${cl(a).toFixed(3)}">${lines.map(([s, sz, c], i) => TX(s, 540, y + i * sz * 1.08, sz, c, 'middle', `stroke="${K.bg}" stroke-width="16" stroke-linejoin="round" paint-order="stroke"`)).join('')}</g>`;
}

// ---------- two-bone limb (IK): returns elbow/knee point ----------
export function joint(ax, ay, bx, by, l1, l2, bend = 1) {
  let dx = bx - ax, dy = by - ay, d = Math.hypot(dx, dy) || 1e-3;
  const L = Math.min(d, l1 + l2 - .5);
  if (d > L) { bx = ax + dx / d * L; by = ay + dy / d * L; dx = bx - ax; dy = by - ay; d = L; }
  const a = (l1 * l1 - l2 * l2 + d * d) / (2 * d), h = Math.sqrt(Math.max(0, l1 * l1 - a * a));
  const mx = ax + dx / d * a, my = ay + dy / d * a;
  return [mx - dy / d * h * bend, my + dx / d * h * bend, bx, by];
}

// ---------- the channel's stick figure ----------
// (x, y) = point between the feet on the ground. o.hL / o.hR: hand targets in WORLD coords (screen-left/right);
// o.fL / o.fR: foot targets (default under hips); o.lean (deg), o.look (-1..1 eye dir), o.lookY, o.mouth
// 'smile'|'o'|'flat'|'open'|'worried', o.brow 'up'|'calm'|'knit', o.bob (body drop px), o.hold* SVG drawn in hand.
export const FIG = { headR: 58, neck: 352, sh: 318, hip: 168, arm: 92, leg: 90 };
export function stick(x, y, s = 1, o = {}) {
  const lean = (o.lean || 0) * Math.PI / 180, bob = o.bob || 0;
  const W = (lx, ly) => [x + lx * s, y + ly * s];
  const hipL = [0, -FIG.hip + bob];
  const tilt = v => [hipL[0] + Math.sin(lean) * v, hipL[1] - Math.cos(lean) * v];
  const shC = tilt(FIG.sh - FIG.hip), neck = tilt(FIG.neck - FIG.hip), head = tilt(FIG.neck - FIG.hip + FIG.headR + 4);
  const shL = [shC[0] - 30, shC[1] + 4], shR = [shC[0] + 30, shC[1] + 4];
  const hL = o.hL ? [(o.hL[0] - x) / s, (o.hL[1] - y) / s] : [shL[0] - 26, shL[1] + 150];
  const hR = o.hR ? [(o.hR[0] - x) / s, (o.hR[1] - y) / s] : [shR[0] + 26, shR[1] + 150];
  const fL = o.fL ? [(o.fL[0] - x) / s, (o.fL[1] - y) / s] : [-34, 0];
  const fR = o.fR ? [(o.fR[0] - x) / s, (o.fR[1] - y) / s] : [34, 0];
  const aL = joint(shL[0], shL[1], hL[0], hL[1], FIG.arm, FIG.arm, o.bendL ?? 1);
  const aR = joint(shR[0], shR[1], hR[0], hR[1], FIG.arm, FIG.arm, o.bendR ?? -1);
  const lL = joint(hipL[0] - 14, hipL[1], fL[0], fL[1], FIG.leg, FIG.leg, o.kneeL ?? 1);
  const lR = joint(hipL[0] + 14, hipL[1], fR[0], fR[1], FIG.leg, FIG.leg, o.kneeR ?? -1);
  const P = (p) => pt(...W(...p));
  const limb = (a, j) => `<path d="M ${P(a)} L ${P([j[0], j[1]])} L ${P([j[2], j[3]])}" fill="none" ${OL(LW * s)}/>`;
  const foot = (j, dir) => `<path d="M ${P([j[2], j[3]])} l ${f1(dir * 26 * s)} 0" fill="none" ${OL(LW * s)}/>`;
  // shirt: rounded trapezoid from shoulders to hips, short sleeves follow the upper arms
  const sl = (sh, j) => { const dx = j[0] - sh[0], dy = j[1] - sh[1], d = Math.hypot(dx, dy) || 1, k = 44 / d; return [sh[0] + dx * k, sh[1] + dy * k]; };
  const sL = sl(shL, aL), sR = sl(shR, aR);
  const hp = tilt(0), hw = 40, tw = 36;
  const shirt = `<path d="M ${P([shL[0] - 4, shL[1] - 6])} L ${P(sL)} M ${P([shR[0] + 4, shR[1] - 6])} L ${P(sR)}" fill="none" stroke="${K.ink}" stroke-width="${f1(30 * s)}" stroke-linecap="round"/>
    <path d="M ${P([shL[0] - 4, shL[1] - 6])} L ${P(sL)} M ${P([shR[0] + 4, shR[1] - 6])} L ${P(sR)}" fill="none" stroke="${o.shirt || K.orange}" stroke-width="${f1(17 * s)}" stroke-linecap="round"/>
    <path d="M ${P([shC[0] - tw, shC[1] - 4])} Q ${P([shC[0], shC[1] - 14])} ${P([shC[0] + tw, shC[1] - 4])} L ${P([hp[0] + hw, hp[1] + 6])} Q ${P([hp[0], hp[1] + 14])} ${P([hp[0] - hw, hp[1] + 6])} Z" fill="${o.shirt || K.orange}" ${OL(LW * s)}/>`;
  const [hx, hy] = W(...head), r = FIG.headR * s, lk = (o.look || 0) * 12 * s, ly = (o.lookY || 0) * 10 * s;
  const ex = 20 * s, eyR = (o.eye || 1) * 7.5 * s;
  const mouth = { smile: `M ${pt(hx - 18 * s + lk, hy + 22 * s)} Q ${pt(hx + lk, hy + 36 * s)} ${pt(hx + 18 * s + lk, hy + 22 * s)}`,
    flat: `M ${pt(hx - 14 * s + lk, hy + 27 * s)} L ${pt(hx + 14 * s + lk, hy + 27 * s)}`,
    worried: `M ${pt(hx - 16 * s + lk, hy + 31 * s)} Q ${pt(hx + lk, hy + 20 * s)} ${pt(hx + 16 * s + lk, hy + 31 * s)}` }[o.mouth || 'smile'];
  const mO = o.mouth === 'o' || o.mouth === 'open';
  const browY = hy - 20 * s + ly, bU = { up: -9, calm: 0, knit: 4 }[o.brow || 'calm'] * s, bK = o.brow === 'knit' ? 5 * s : (o.brow === 'up' ? -3 * s : 0);
  const face = `<circle cx="${f1(hx - ex + lk)}" cy="${f1(hy - 2 * s + ly)}" r="${f1(eyR)}" fill="${K.ink}"/><circle cx="${f1(hx + ex + lk)}" cy="${f1(hy - 2 * s + ly)}" r="${f1(eyR)}" fill="${K.ink}"/>
    ${o.brow === 'none' ? '' : `<path d="M ${pt(hx - ex - 12 * s + lk, browY + bU - bK)} L ${pt(hx - ex + 10 * s + lk, browY + bU + bK)} M ${pt(hx + ex - 10 * s + lk, browY + bU + bK)} L ${pt(hx + ex + 12 * s + lk, browY + bU - bK)}" fill="none" ${OL(5 * s)}/>`}
    ${mO ? `<ellipse cx="${f1(hx + lk)}" cy="${f1(hy + 27 * s)}" rx="${f1((o.mouth === 'open' ? 13 : 9) * s)}" ry="${f1((o.mouth === 'open' ? 15 : 11) * s)}" fill="${K.ink}"/>` : `<path d="${mouth}" fill="none" ${OL(5 * s)}/>`}`;
  const neckL = `<path d="M ${P(neck)} L ${P([shC[0], shC[1] - 6])}" fill="none" ${OL(LW * s)}/>`;
  const handDot = j => `<circle cx="${f1(W(j[2], j[3])[0])}" cy="${f1(W(j[2], j[3])[1])}" r="${f1(10 * s)}" fill="${K.ink}"/>`;
  const back = (o.backArm === 'L' ? limb(shL, aL) + handDot(aL) : '') + (o.backArm === 'R' ? limb(shR, aR) + handDot(aR) : '');
  const front = (o.backArm === 'L' ? '' : limb(shL, aL) + handDot(aL)) + (o.backArm === 'R' ? '' : limb(shR, aR) + handDot(aR));
  return `<g>${o.under || ''}${back}${limb([hipL[0] - 14, hipL[1]], lL)}${limb([hipL[0] + 14, hipL[1]], lR)}${foot(lL, -1)}${foot(lR, 1)}${neckL}${shirt}
    <circle cx="${f1(hx)}" cy="${f1(hy)}" r="${f1(r)}" fill="${K.white}" ${OL(LW * s)}/>${face}${o.mid || ''}${front}${o.over || ''}</g>`;
}
// world position of the figure's head centre (for thought marks etc.)
export const headPos = (x, y, s = 1, bob = 0) => [x, y + (-FIG.hip + bob - (FIG.neck - FIG.hip + FIG.headR + 4)) * s];
// walking feet: phase p (0..1 per stride), stride length L px, returns [fL, fR] targets relative to world
export function walkFeet(x, y, p, L = 70, s = 1) {
  const a = Math.sin(p * Math.PI * 2), lift = (v) => Math.max(0, v) * 22 * s;
  return [[x - 18 * s + a * L / 2 * s, y - lift(Math.cos(p * Math.PI * 2))], [x + 18 * s - a * L / 2 * s, y - lift(-Math.cos(p * Math.PI * 2))]];
}

// ---------- v77 additions ----------
// ground (top-down soil with pebbles and grass tufts), deterministic
export function ground(seed = 1, c = K.soil) {
  let s = `<rect x="-60" y="-60" width="1200" height="2040" fill="${c}"/>`;
  for (let i = 0; i < 70; i++) { const x = hash(i * 3.7 + seed) * 1080, y = hash(i * 5.1 + seed) * 1920, r = 4 + 10 * hash(i + seed * 9); s += `<ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(r * 1.3)}" ry="${f1(r)}" fill="${i % 3 ? K.soilD : K.soilL}" opacity=".7"/>`; }
  for (let i = 0; i < 9; i++) { const x = hash(i * 9.3 + seed) * 1080, y = hash(i * 2.9 + seed) * 1920; s += `<path d="M ${f1(x)} ${f1(y)} l -14 -40 M ${f1(x)} ${f1(y)} l 2 -50 M ${f1(x)} ${f1(y)} l 16 -38" stroke="#7FA65A" stroke-width="7" stroke-linecap="round"/>`; }
  return s;
}
// top-down ant; (x,y) centre of thorax, ang = heading in degrees (0 = right), ph = gait phase (radians)
export function antTop(x, y, ang = 0, s = 1, ph = 0, o = {}) {
  const sw = Math.sin(ph) * 14, ant = o.ant ?? Math.sin(ph * .7) * 10;
  const leg = (bx, side, k) => { const a = (k % 2 ? sw : -sw) * side; return `<path d="M ${bx} 0 l ${f1(10 + a * .4)} ${side * 16} l ${f1(8 + a)} ${side * 14}" fill="none" stroke="${K.ant}" stroke-width="4.5" stroke-linecap="round" stroke-linejoin="round"/>`; };
  let legs = ''; [[-8, 0], [0, 1], [8, 2]].forEach(([bx, k]) => { legs += leg(bx, 1, k) + leg(bx, -1, k + 1); });
  const carry = o.carry ? `<rect x="30" y="-9" width="18" height="16" rx="4" fill="${K.crumb}" stroke="${K.ink}" stroke-width="3"/>` : '';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(ang)}) scale(${s})" opacity="${o.a ?? 1}">${legs}
    <ellipse cx="-26" cy="0" rx="18" ry="13" fill="${K.ant}"/><ellipse cx="-30" cy="-4" rx="7" ry="4" fill="${K.antL}"/>
    <ellipse cx="0" cy="0" rx="11" ry="7" fill="${K.ant}"/><circle cx="17" cy="0" r="9" fill="${K.ant}"/>
    <path d="M 22 -4 q 10 ${f1(-10 - ant)} 22 ${f1(-12 - ant)} M 22 4 q 10 ${f1(10 + ant)} 22 ${f1(12 + ant)}" fill="none" stroke="${K.ant}" stroke-width="3.5" stroke-linecap="round"/>${carry}</g>`;
}
// side-view ant facing right; (x,y) = ground point under thorax; s scale (1 ≈ 120 px long)
export function antSide(x, y, s = 1, ph = 0, o = {}) {
  const dir = o.dir || 1, lift = o.lift || 0;
  const leg = (bx, k) => { const a = Math.sin(ph + k * 2.1) * 12, up = Math.max(0, Math.cos(ph + k * 2.1)) * 6; return `<path d="M ${bx} -26 L ${f1(bx + a * .5)} -36 L ${f1(bx + a)} ${f1(-up)}" fill="none" stroke="${K.ant}" stroke-width="5" stroke-linecap="round" stroke-linejoin="round"/>`; };
  const tip = o.tip || 0; // abdomen tip lowered to the ground (laying scent)
  const ant = o.ant ?? Math.sin(ph * .8) * 6;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(dir * s)} ${f1(s)})">${leg(-14, 0)}${leg(2, 1)}${leg(16, 2)}
    <g transform="rotate(${f1(-8 + 26 * tip)} -24 -36)"><ellipse cx="-46" cy="-38" rx="27" ry="19" fill="${K.ant}"/><ellipse cx="-52" cy="-46" rx="10" ry="6" fill="${K.antL}"/></g>
    <ellipse cx="0" cy="-38" rx="18" ry="10" fill="${K.ant}"/><circle cx="28" cy="-44" r="13" fill="${K.ant}"/><circle cx="32" cy="-48" r="3.5" fill="${K.antL}"/>
    <path d="M 34 -54 q 12 ${f1(-18 - ant)} 30 ${f1(-14 - ant)} M 30 -55 q 8 ${f1(-22 + ant)} 22 ${f1(-26 + ant)}" fill="none" stroke="${K.ant}" stroke-width="4" stroke-linecap="round"/>
    ${o.carry ? `<rect x="38" y="-44" width="24" height="20" rx="5" fill="${K.crumb}" stroke="${K.ink}" stroke-width="3"/>` : ''}</g>`;
}
// bread slice with jam (top-down-ish). (x,y) centre, s scale (1 ≈ 260 px)
export function bread(x, y, s = 1, rot = 0, o = {}) {
  const shape = 'M -120 -60 Q -130 -140 -40 -140 Q 0 -170 40 -140 Q 130 -140 120 -60 L 115 110 Q 115 130 95 130 L -95 130 Q -115 130 -115 110 Z';
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${s})" opacity="${o.a ?? 1}"><path d="${shape}" fill="${K.crust}" ${OL(7)}/>
    <path d="M -96 -52 Q -104 -116 -34 -116 Q 0 -142 34 -116 Q 104 -116 96 -52 L 92 98 Q 92 106 84 106 L -84 106 Q -92 106 -92 98 Z" fill="${K.crumb}"/>
    ${o.noJam ? '' : `<path d="M -70 -60 Q -40 -100 10 -84 Q 70 -96 74 -40 Q 92 20 50 50 Q 0 88 -40 60 Q -84 30 -70 -60 Z" fill="${K.jam}" ${OL(5)}/><path d="M -40 -56 Q -20 -72 6 -64" stroke="${K.jamL}" stroke-width="10" fill="none" stroke-linecap="round"/>`}</g>`;
}
export const breadGhost = (x, y, s = 1, a = 1) => `<path transform="translate(${f1(x)} ${f1(y)}) scale(${s})" d="M -120 -60 Q -130 -140 -40 -140 Q 0 -170 40 -140 Q 130 -140 120 -60 L 115 110 Q 115 130 95 130 L -95 130 Q -115 130 -115 110 Z" fill="none" stroke="${K.ink}" stroke-width="6" stroke-dasharray="18 14" opacity="${a}"/>`;
// nest mound, top-down: soil ring with dark entrance
export function nestTop(x, y, s = 1) {
  let g = ''; for (let i = 0; i < 26; i++) { const a = i / 26 * 6.283, r = 90 + 26 * hash(i); g += `<circle cx="${f1(Math.cos(a) * r)}" cy="${f1(Math.sin(a) * r * .9)}" r="${f1(9 + 6 * hash(i + 4))}" fill="${i % 2 ? K.soilL : K.soilD}"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><ellipse cx="0" cy="0" rx="150" ry="136" fill="#C9A672" ${OL(6)}/>${g}<ellipse cx="0" cy="0" rx="46" ry="40" fill="${K.ant}" ${OL(6)}/></g>`;
}
// nest mound, side view (for wide shots): (x,y) ground centre
export const nestSide = (x, y, s = 1) => `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})"><path d="M -170 0 Q -120 -120 0 -130 Q 120 -120 170 0 Z" fill="#C9A672" ${OL(7)}/><path d="M -30 -118 Q 0 -140 30 -118 Q 0 -104 -30 -118 Z" fill="${K.ant}"/>${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${-110 + i * 44}" cy="${-30 - 50 * Math.sin((i + .5) / 6 * Math.PI)}" r="7" fill="${K.soilD}"/>`).join('')}</g>`;
// the route between nest and bread used in top-down shots: quadratic curve
export const ROUTE = { a: [250, 1250], c: [330, 640], b: [790, 470] };
export function routeAt(u, R = ROUTE) {
  const { a, b, c } = R, v = 1 - u;
  const x = v * v * a[0] + 2 * v * u * c[0] + u * u * b[0], y = v * v * a[1] + 2 * v * u * c[1] + u * u * b[1];
  const dx = 2 * v * (c[0] - a[0]) + 2 * u * (b[0] - c[0]), dy = 2 * v * (c[1] - a[1]) + 2 * u * (b[1] - c[1]);
  return [x, y, Math.atan2(dy, dx) * 180 / Math.PI];
}
export const routeD = (R = ROUTE) => `M ${R.a[0]} ${R.a[1]} Q ${R.c[0]} ${R.c[1]} ${R.b[0]} ${R.b[1]}`;
// scent trail along the route from u0 to u1 (dotted teal), strength 0..1+
export function trail(u0, u1, str = 1, R = ROUTE) {
  if (str <= 0 || u1 <= u0) return '';
  let s = '';
  const n = Math.ceil((u1 - u0) * 60);
  for (let i = 0; i <= n; i++) { const u = u0 + (u1 - u0) * i / Math.max(1, n); const [x, y] = routeAt(u, R); const j = (hash(i * 7.3) - .5) * 10; s += `<circle cx="${f1(x + j)}" cy="${f1(y - j)}" r="${f1(5 + 4 * Math.min(1.6, str))}" fill="${K.trail}" opacity="${f1(Math.min(.9, .35 + .45 * str))}"/>`; }
  return `<g>${str > .8 ? `<path d="${routeD(R)}" fill="none" stroke="${K.trailL}" stroke-width="${f1(26 * Math.min(1.6, str))}" opacity="${f1(.25 * Math.min(1.5, str))}" stroke-linecap="round" pathLength="1" stroke-dasharray="${f1(u1 - u0)} 2" stroke-dashoffset="${f1(-u0)}"/>` : ''}${s}</g>`;
}
// ant walking along the route: u position 0..1 (nest→bread); back = walking towards nest
export const antOnRoute = (u, t, back = false, o = {}, R = ROUTE) => { const [x, y, a] = routeAt(cl(u), R); return antTop(x, y, back ? a + 180 : a, o.s || .9, t * 22 + (o.k || 0), o); };
// bread slice seen from the side, lying flat; (x,y) = ground centre, s scale (1 ≈ 300 px wide)
export function breadSide(x, y, s = 1, rot = 0, o = {}) {
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${s})"><rect x="-150" y="-52" width="300" height="52" rx="16" fill="${K.crust}" ${OL(7)}/><rect x="-136" y="-44" width="272" height="36" rx="10" fill="${K.crumb}"/>
    ${o.noJam ? '' : `<path d="M -120 -52 Q -60 -74 0 -64 Q 70 -76 124 -52 Z" fill="${K.jam}" ${OL(5)}/><path d="M -70 -62 Q -40 -70 -10 -64" stroke="${K.jamL}" stroke-width="7" fill="none" stroke-linecap="round"/>`}</g>`;
}
// side-view garden: cream sky, soil from horizon y down
export const yardSide = (gy = 1250) => `${BG()}<rect x="-60" y="${gy}" width="1200" height="${1980 - gy}" fill="${K.soil}"/><path d="M -60 ${gy} H 1140" ${OL(7)}/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<ellipse cx="${f1(60 + i * 140 + 40 * hash(i))}" cy="${f1(gy + 60 + 260 * hash(i + 3))}" rx="${f1(14 + 10 * hash(i + 1))}" ry="9" fill="${K.soilD}"/>`).join('')}<path d="M 80 ${gy} l -10 -40 M 80 ${gy} l 4 -50 M 80 ${gy} l 18 -38 M 990 ${gy} l -12 -36 M 990 ${gy} l 4 -46" stroke="#7FA65A" stroke-width="7" stroke-linecap="round"/>`;
