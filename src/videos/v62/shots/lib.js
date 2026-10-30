// v62 "Bein eingeschlafen" — shared drawing helpers for this video only (style bible: jobs/v62/style.md).
import { cl, prog, eio, eout, ein, back, lerp, hash } from '../../../engine/core.js';

export { cl, prog, eio, eout, ein, back, lerp, hash };

export const K = {
  ol: '#16324F', wall: '#EAF6F4', wall2: '#DCEFEC', floor: '#CFE5E1', floorSh: '#B9D6D1', teal: '#2EC4B6', tealSh: '#21A396',
  white: '#FFFFFF', pink: '#FF8FA3', pinkSh: '#E66F86', navy: '#16324F', skin: '#F1C6A5', skinSh: '#DDA987',
  hair: '#5A3A2A', hairSh: '#3F281C', hood: '#F4B942', hoodSh: '#D99A26', hoodHi: '#FFD27A', pants: '#2B4A6F', pantsSh: '#213A58',
  sock: '#FFFFFF', sockSh: '#DCE6EA', sofa: '#7FA7D9', sofaSh: '#5E86BA', sofaHi: '#A3C2EA', wood: '#C9A27A',
  nerve: '#FFD23F', nerveSh: '#E0AE10', blood: '#E5484D', bloodHi: '#FF7A7E', muscle: '#FFC9BE', numb: '#B9CCE0', spark: '#FFD23F', red: '#E5484D', green: '#2EC4B6',
};

export const OL = (w = 4) => `stroke="${K.ol}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f = K.navy, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const D = (a) => [Math.sin(a * Math.PI / 180), Math.cos(a * Math.PI / 180)]; // 0 = down, 90 = right (facing), 180 = up
export const blinkAt = (t, off = 0) => { const k = (t + off) % 3.1; return k > 2.96 ? Math.sin((k - 2.96) / .14 * Math.PI) : 0; };

// label pill (white, navy outline) — p = pop progress
export function lab(str, cx, cy, sz, p, col = K.navy, bg = K.white, border = K.navy) {
  if (p <= 0) return '';
  const w = str.length * sz * .64 + sz * 1.0, h = sz * 1.5;
  return `<g transform="translate(${cx} ${cy}) scale(${back(cl(p)).toFixed(3)})"><rect x="${-w / 2}" y="${-h / 2 + 8}" width="${w}" height="${h}" rx="${h / 2}" fill="${K.ol}" opacity=".18"/><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${bg}" stroke="${border}" stroke-width="5"/>
    ${TX(str, 0, sz * .36, sz, col)}</g>`;
}

// ---------- room ----------
export const FLOOR = 1210;
export function room(o = {}) {
  const fy = o.floor ?? FLOOR;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>
  <rect x="0" y="${fy - 40}" width="1080" height="40" fill="${K.wall2}"/>
  <rect x="0" y="${fy}" width="1080" height="${1920 - fy}" fill="${K.floor}"/>
  <path d="M 0 ${fy} H 1080" ${OL(4)}/>
  ${o.lamp === false ? '' : `<g opacity=".9"><path d="M 60 ${fy} V ${fy - 560}" stroke="${K.ol}" stroke-width="6"/><path d="M 10 ${fy - 560} L 110 ${fy - 560} L 90 ${fy - 650} L 30 ${fy - 650} Z" fill="${o.night ? '#FFE9A8' : K.white}" ${OL(4)}/>${o.night ? `<ellipse cx="60" cy="${fy - 520}" rx="160" ry="120" fill="#FFE9A8" opacity=".35"/>` : ''}</g>`}
  ${o.window === false ? '' : `<rect x="380" y="260" width="240" height="300" rx="16" fill="${o.night ? '#2F4A78' : '#D6EEF7'}" ${OL(4)}/>${o.night ? '<circle cx="560" cy="320" r="22" fill="#FFF3C4"/>' : ''}<path d="M 500 260 V 560 M 380 410 H 620" stroke="${K.ol}" stroke-width="4"/>`}`;
}
// sofa seen from the side, facing right (backrest on the left); seat top at y=1040
export function sofa(x = 0, o = {}) {
  return `<g transform="translate(${x} 0)">
    <rect x="${150}" y="${1150}" width="24" height="${FLOOR - 1150}" fill="${K.wood}" ${OL(4)}/><rect x="${470}" y="${1150}" width="24" height="${FLOOR - 1150}" fill="${K.wood}" ${OL(4)}/>
    <rect x="120" y="1080" width="400" height="80" rx="18" fill="${K.sofaSh}" ${OL(4)}/>
    <rect x="110" y="620" width="130" height="470" rx="50" fill="${K.sofa}" ${OL(4)}/>
    <path d="M 140 660 Q 150 860 140 1060" stroke="${K.sofaHi}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <rect x="150" y="${1030 + (o.squash || 0)}" width="360" height="${70 - (o.squash || 0)}" rx="26" fill="${K.sofa}" ${OL(4)}/>
    <path d="M 180 ${1044 + (o.squash || 0)} H 470" stroke="${K.sofaHi}" stroke-width="8" stroke-linecap="round"/>
  </g>`;
}
export function tv(x, y, s, o = {}) {
  const pr = o.prog ?? 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-20" y="190" width="40" height="70" fill="${K.ol}"/><rect x="-80" y="250" width="160" height="16" rx="8" fill="${K.ol}"/>
    <rect x="-210" y="-10" width="420" height="250" rx="18" fill="${K.ol}"/>
    <rect x="-194" y="6" width="388" height="218" rx="8" fill="${o.on === false ? '#2A3D52' : '#9ED8F0'}"/>
    ${o.on === false ? '' : `<circle cx="${-60 + 30 * Math.sin((o.t || 0) * 1.3)}" cy="110" r="44" fill="${K.pink}"/><rect x="40" y="70" width="90" height="110" rx="20" fill="${K.teal}"/><path d="M -194 190 Q 0 150 194 190 V 224 H -194 Z" fill="#7CC4A0"/>
      <rect x="-170" y="206" width="340" height="8" rx="4" fill="#ffffff" opacity=".6"/><rect x="-170" y="206" width="${340 * cl(pr)}" height="8" rx="4" fill="${K.red}"/>`}
  </g>`;
}

// ---------- the person (one character, side view facing right) ----------
// origin = HIP joint. o: aB torso angle (180 upright), near/far legs {t: thigh, s: shin, f: foot} absolute angles,
// arms {u: upper, f: fore} absolute, face {eye, mouth, brow, look}, numb (0..1 tints the near foot), s scale
function seg(x0, y0, a, L) { const [dx, dy] = D(a); return [x0 + dx * L, y0 + dy * L]; }
function limb(pts, col, w) {
  const d = 'M ' + pts.map(p => `${p[0].toFixed(1)} ${p[1].toFixed(1)}`).join(' L ');
  return `<path d="${d}" fill="none" stroke="${K.ol}" stroke-width="${w + 8}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
export function legPts(hx, hy, L) {
  const k = seg(hx, hy, L.t, 170), a = seg(k[0], k[1], L.s, 165), toe = seg(a[0], a[1], L.f, 72);
  return { k, a, toe };
}
function sockFoot(a, toe, tint, numb) {
  const ang = Math.atan2(toe[1] - a[1], toe[0] - a[0]) * 180 / Math.PI;
  const fill = numb > 0 ? mix(K.sock, K.numb, numb) : K.sock;
  return `<g transform="translate(${a[0].toFixed(1)} ${a[1].toFixed(1)}) rotate(${ang.toFixed(1)})">
    <path d="M -22 -26 Q -40 0 -24 24 L 70 26 Q 96 20 92 0 Q 86 -16 60 -18 L 18 -26 Z" fill="${tint || fill}" stroke="${K.ol}" stroke-width="5" stroke-linejoin="round" ${numb > .3 ? `stroke-dasharray="14 9"` : ''}/>
    <path d="M -20 -26 L -22 24" stroke="${K.sockSh}" stroke-width="8"/></g>`;
}
export function mix(a, b, p) {
  const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16));
  const A = h(a), B = h(b);
  return '#' + A.map((v, i) => Math.round(lerp(v, B[i], cl(p))).toString(16).padStart(2, '0')).join('');
}
export function head(o = {}) {
  const HR = o.hairC || K.hair, HS = o.hairSh || K.hairSh;
  const eye = o.eye || 'open', mouth = o.mouth || 'flat', brow = o.brow || 'calm', lk = o.look || 0, lky = o.lookY || 0, bl = o.blink || 0;
  const eyeSvg = eye === 'closed' || bl > .6 ? `<path d="M 16 -6 q 12 8 24 0" fill="none" ${OL(4)}/>`
    : eye === 'squint' ? `<path d="M 16 -4 l 24 -4 M 16 -4 l 24 4" fill="none" ${OL(4)}/>`
      : `<ellipse cx="28" cy="-6" rx="9" ry="12" fill="${K.white}" ${OL(3)}/><circle cx="${31 + lk * .3}" cy="${-5 + lky * .3}" r="5.5" fill="${K.ol}"/>`;
  const browY = { calm: [-26, -26], worry: [-30, -22], up: [-34, -32], pain: [-22, -30] }[brow] || [-26, -26];
  const m = { flat: `<path d="M 30 32 L 48 31" ${OL(4)}/>`, smile: `<path d="M 26 28 Q 38 40 50 28" fill="none" ${OL(4)}/>`, o: `<ellipse cx="40" cy="32" rx="7" ry="9" fill="#7A2E3A" ${OL(3)}/>`,
    wince: `<path d="M 26 32 l 6 -5 l 6 5 l 6 -5 l 6 5" fill="none" ${OL(4)}/>`, tight: `<path d="M 28 34 Q 38 28 50 33" fill="none" ${OL(4)}/>` }[mouth];
  return `<g transform="rotate(${o.tilt || 0})">
    ${o.noBun ? '' : `<circle cx="-48" cy="18" r="28" fill="${HR}" ${OL(4)}/>`}
    <circle cx="0" cy="0" r="62" fill="${K.skin}" ${OL(4)}/>
    <path d="M 58 -2 Q 74 10 60 22" fill="${K.skin}" ${OL(4)}/>
    <path d="M -64 6 Q -70 -70 0 -66 Q 50 -64 60 -30 Q 20 -40 4 -18 Q -10 6 -8 26 Q -40 30 -64 6 Z" fill="${HR}" ${OL(4)}/>
    <ellipse cx="-4" cy="20" rx="12" ry="16" fill="${K.skinSh}" ${OL(3)}/>
    ${eyeSvg}
    <path d="M 16 ${browY[0]} L 42 ${browY[1]}" stroke="${HS}" stroke-width="6" stroke-linecap="round"/>
    ${m}${o.glasses ? `<circle cx="30" cy="-6" r="20" fill="none" ${OL(4)}/>` : ''}
    ${o.cheek ? `<ellipse cx="22" cy="18" rx="10" ry="6" fill="${K.pink}" opacity=".6"/>` : ''}
  </g>`;
}
export function person(hx, hy, s, o = {}) {
  const c = { hood: K.hood, hoodSh: K.hoodSh, pants: K.pants, pantsSh: K.pantsSh, ...(o.c || {}) };
  const aB = o.aB ?? 180, near = o.near || { t: 90, s: 0, f: 90 }, far = o.far || near;
  const [bx, by] = D(aB), neck = [bx * 230, by * 230], sh = [neck[0] - bx * 20, neck[1] - by * 20];
  const hc = [neck[0] + bx * 72, neck[1] + by * 72];
  const nA = o.armN || { u: 20, f: 80 }, fA = o.armF || nA;
  const el = (A) => seg(sh[0], sh[1], A.u, 130), hand = (A, e) => seg(e[0], e[1], A.f, 118);
  const eN = el(nA), hN = hand(nA, eN), eF = el(fA), hF = hand(fA, eF);
  const lf = legPts(-6, 4, far), ln = legPts(6, 0, near);
  const handC = (h, c) => `<circle cx="${h[0].toFixed(1)}" cy="${h[1].toFixed(1)}" r="21" fill="${c}" ${OL(4)}/>`;
  const nx = -by, ny = bx; // perpendicular toward the facing side
  const P = (bb, nn) => `${(bx * bb + nx * nn).toFixed(1)} ${(by * bb + ny * nn).toFixed(1)}`;
  const torso = `<path d="M ${P(-10, -66)} Q ${P(-30, 0)} ${P(-10, 70)} L ${P(150, 66)} Q ${P(232, 64)} ${P(228, 10)} L ${P(224, -50)} Q ${P(150, -78)} ${P(-10, -66)} Z" fill="${c.hood}" ${OL(4)}/>`;
  const pocket = `<path d="M ${P(40, 64)} Q ${P(90, 30)} ${P(120, 64)}" stroke="${c.hoodSh}" stroke-width="6" fill="none"/>`;
  const hood = `<path d="M ${neck[0] - 60} ${neck[1] + 20} Q ${neck[0] - 70} ${neck[1] - 30} ${neck[0] - 20} ${neck[1] - 26}" stroke="${c.hoodSh}" stroke-width="18" fill="none" stroke-linecap="round"/>`;
  const glowN = o.footGlow ? o.footGlow(ln.a, ln.toe) : '';
  return `<g transform="translate(${hx} ${hy}) scale(${s})">
    ${o.noShadow ? '' : ''}
    ${limb([sh, eF, hF], c.hoodSh, 40)}${handC(hF, K.skinSh)}
    ${limb([[-6, 4], lf.k, lf.a], c.pantsSh, 58)}${sockFoot(lf.a, lf.toe, K.sockSh, 0)}
    ${o.nearBehind ? limb([[6, 0], ln.k, ln.a], c.pants, 60) + sockFoot(ln.a, ln.toe, null, o.numb || 0) : ''}
    ${torso}${pocket}${hood}
    ${o.nearBehind ? '' : limb([[6, 0], ln.k, ln.a], c.pants, 60) + sockFoot(ln.a, ln.toe, null, o.numb || 0)}
    ${glowN}
    <g transform="translate(${hc[0].toFixed(1)} ${hc[1].toFixed(1)})">${head(o)}</g>
    ${o.holdN ? o.holdN(hN) : ''}
    ${limb([sh, eN, hN], c.hood, 42)}${handC(hN, K.skin)}
  </g>`;
}
// world positions of person joints (for tingles / contact)
export function joints(hx, hy, s, o = {}) {
  const near = o.near || { t: 90, s: 0, f: 90 };
  const ln = legPts(6, 0, near);
  const W = p => [hx + p[0] * s, hy + p[1] * s];
  return { knee: W(ln.k), ankle: W(ln.a), toe: W(ln.toe) };
}
// poses (hip positions for the sofa at x=0)
export const POSE = {
  tucked: { aB: 186, near: { t: 98, s: -82, f: -96 }, far: { t: 92, s: 4, f: 92 }, nearBehind: false },
  sit: { aB: 186, near: { t: 92, s: 2, f: 92 }, far: { t: 90, s: 0, f: 90 } },
  stretch: { aB: 192, near: { t: 92, s: 92, f: 175 }, far: { t: 90, s: 0, f: 90 } },
  stand: { aB: 180, near: { t: 0, s: 0, f: 90 }, far: { t: 0, s: 0, f: 90 } },
};
export function lerpPose(A, B, p) {
  const L = (a, b) => ({ t: lerp(a.t, b.t, p), s: lerp(a.s, b.s, p), f: lerp(a.f, b.f, p) });
  return { aB: lerp(A.aB, B.aB, p), near: L(A.near, B.near), far: L(A.far, B.far) };
}
export const HIP = { sit: [300, 1012], tucked: [300, 990], stand: [560, 865] };

// ---------- tingles (glowing dots — no needles) ----------
export function tingle(t, cx, cy, rx, ry, k, seed = 1, n = 22, hot = 0, sc = 1) {
  if (k <= 0.01) return '';
  let s = '';
  for (let i = 0; i < n; i++) {
    const ph = (t * (2.2 + 1.7 * hash(seed + i)) + hash(seed * 7 + i)) % 1;
    const a = hash(seed + i * 3.3) * Math.PI * 2, r = Math.sqrt(hash(seed * 5 + i)) ;
    const x = cx + Math.cos(a) * rx * r, y = cy + Math.sin(a) * ry * r - ph * 14;
    const sz = sc * (6 + 10 * hash(i * 9 + seed)) * Math.sin(ph * Math.PI) * cl(k * 1.4 - hash(i + seed * 2) * .4);
    if (sz <= .5) continue;
    const col = hot > 0 && i % 2 ? mix(K.spark, '#FF8A3D', hot) : (i % 3 ? K.spark : K.white);
    s += i % 2 ? `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(sz * .7).toFixed(1)}" fill="${col}" stroke="${K.ol}" stroke-width="2"/>`
      : `<path d="M ${x.toFixed(1)} ${(y - sz * 1.6).toFixed(1)} L ${(x + sz * .4).toFixed(1)} ${(y - sz * .4).toFixed(1)} L ${(x + sz * 1.6).toFixed(1)} ${y.toFixed(1)} L ${(x + sz * .4).toFixed(1)} ${(y + sz * .4).toFixed(1)} L ${x.toFixed(1)} ${(y + sz * 1.6).toFixed(1)} L ${(x - sz * .4).toFixed(1)} ${(y + sz * .4).toFixed(1)} L ${(x - sz * 1.6).toFixed(1)} ${y.toFixed(1)} L ${(x - sz * .4).toFixed(1)} ${(y - sz * .4).toFixed(1)} Z" fill="${col}" stroke="${K.ol}" stroke-width="2"/>`;
  }
  return s;
}

// ---------- close-up of the lower leg + sock foot standing/lying (facing right) ----------
// (x,y) = ankle; s scale; o.numb 0..1 (pale + dashed), o.rot foot rotation, o.leg angle of shin (0 = straight up from ankle)
export function footCU(x, y, s, o = {}) {
  const numb = o.numb || 0, col = mix(K.sock, K.numb, numb), skin = mix(K.skin, '#C9D6E4', numb * .6);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <g transform="rotate(${o.leg || 0})">
      <path d="M -70 -520 L -64 -40 L 64 -40 L 70 -520 Z" fill="${K.pants}" ${OL(5)}/>
      <path d="M 30 -520 L 34 -60" stroke="${K.pantsSh}" stroke-width="16"/>
      <rect x="-78" y="-120" width="156" height="50" rx="16" fill="${K.pantsSh}" ${OL(5)}/>
      <rect x="-60" y="-80" width="120" height="70" fill="${col}" ${OL(5)} ${numb > .3 ? 'stroke-dasharray="18 12"' : ''}/>
    </g>
    <g transform="rotate(${o.rot || 0})">
      <path d="M -64 -40 Q -86 40 -40 60 L 230 64 Q 290 56 286 18 Q 280 -12 230 -22 L 70 -50 Z" fill="${col}" stroke="${K.ol}" stroke-width="6" stroke-linejoin="round" ${numb > .3 ? 'stroke-dasharray="20 14"' : ''}/>
      <path d="M -50 40 Q 90 58 250 54" stroke="${K.sockSh}" stroke-width="10" fill="none" stroke-linecap="round"/>
      <path d="M 200 -18 Q 230 20 214 58" stroke="${K.sockSh}" stroke-width="6" fill="none"/>
    </g>
  </g>`;
}

// ---------- cross-section of the leg: nerve (yellow) + small vessel (red) under pressure ----------
// o: press 0..1, flow 0..1, signal 0..1 (pulses), t, sig dir +1 → right
function tube(x0, x1, yc, w, n = 60) {
  const top = [], bot = [];
  for (let i = 0; i <= n; i++) { const x = lerp(x0, x1, i / n), y = yc(x), ww = w(x) / 2; top.push(`${x.toFixed(1)},${(y - ww).toFixed(1)}`); bot.unshift(`${x.toFixed(1)},${(y + ww).toFixed(1)}`); }
  return top.concat(bot).join(' ');
}
export function xsec(t, o = {}) {
  const press = o.press || 0, flow = o.flow ?? 1, sig = o.signal || 0, X0 = 80, X1 = 1000, CX = 540;
  const bump = x => Math.exp(-(((x - CX) / 150) ** 2));
  const dip = x => 120 * press * bump(x);
  const legTop = x => 760 + dip(x), legBot = 1180;
  let s = `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>`;
  // leg body
  const top = [], n = 60;
  for (let i = 0; i <= n; i++) { const x = lerp(X0, X1, i / n); top.push(`${x.toFixed(1)},${legTop(x).toFixed(1)}`); }
  s += `<polygon points="${top.join(' ')} ${X1},${legBot} ${X0},${legBot}" fill="${K.skin}" ${OL(5)}/>`;
  s += `<polygon points="${top.map(p => { const [x, y] = p.split(','); return `${x},${(+y + 34).toFixed(1)}`; }).join(' ')} ${X1 - 10},${legBot - 26} ${X0 + 10},${legBot - 26}" fill="${K.muscle}"/>`;
  // nerve
  const ny = x => 900 + dip(x) * .7, nw = x => 46 * (1 - .72 * press * bump(x));
  const vy = x => 1040 + dip(x) * .45, vw = x => 30 * (1 - .8 * press * bump(x));
  // capillaries from vessel to nerve
  for (let i = 0; i < 6; i++) { const x = 200 + i * 135, a = i === 2 || i === 3 ? 1 - .7 * press : 1; s += `<path d="M ${x} ${vy(x).toFixed(1)} Q ${x + 30} ${((vy(x) + ny(x)) / 2).toFixed(1)} ${x + 10} ${ny(x).toFixed(1)}" stroke="${K.blood}" stroke-width="7" fill="none" opacity="${a.toFixed(2)}"/>`; }
  s += `<polygon points="${tube(X0, X1, vy, vw)}" fill="${K.blood}" ${OL(4)}/>`;
  s += `<polygon points="${tube(X0, X1, ny, nw)}" fill="${mix(K.nerve, '#C9C3A8', (o.dim || 0))}" ${OL(4)}/>`;
  s += `<path d="M ${X0} ${(ny(X0) - 8)} ${Array.from({ length: 30 }, (_, i) => { const x = lerp(X0, X1, i / 29); return `L ${x.toFixed(1)} ${(ny(x) - nw(x) * .2).toFixed(1)}`; }).join(' ')}" stroke="#FFF2B3" stroke-width="8" fill="none" opacity=".7"/>`;
  // blood flow dots: pass freely when flow; held back at the pinch
  for (let i = 0; i < 14; i++) {
    let x = X0 + 20 + ((i * 66 + (t * 220 * flow)) % (X1 - X0 - 40));
    if (press > .5 && x > CX - 120) { if (x < CX + 120 && flow < .5) x = CX - 120 - (i % 3) * 18; else if (flow < .5) continue; }
    s += `<circle cx="${x.toFixed(1)}" cy="${vy(x).toFixed(1)}" r="${(9 * (1 - .6 * press * bump(x))).toFixed(1)}" fill="${K.bloodHi}" stroke="${K.ol}" stroke-width="2"/>`;
  }
  // nerve signals
  if (sig > 0) for (let i = 0; i < 4; i++) {
    const ph = ((t * .9 + i / 4) % 1), x = o.dir === -1 ? lerp(X1, X0, ph) : lerp(X0, X1, ph);
    const past = o.dir === -1 ? x < CX : x > CX; const a = sig * (past ? 1 - .85 * press : 1);
    s += `<circle cx="${x.toFixed(1)}" cy="${ny(x).toFixed(1)}" r="${(26 * (past ? 1 - .5 * press : 1)).toFixed(1)}" fill="${K.white}" opacity="${(a * .9).toFixed(2)}"/><circle cx="${x.toFixed(1)}" cy="${ny(x).toFixed(1)}" r="12" fill="${K.nerve}" opacity="${a.toFixed(2)}"/>`;
  }
  // pressure block (the body weight) + arrows
  if (press > 0 || o.showBlock) {
    const by = lerp(420, 640, press) + dip(CX) * 0;
    s += `<rect x="${CX - 190}" y="${by - 260}" width="380" height="${260 + 120 * press}" rx="60" fill="${K.pants}" ${OL(5)} opacity="${cl(press * 3).toFixed(2)}"/>`;
    for (let i = -1; i <= 1; i++) { const ax = CX + i * 110, ay = by - 190; s += `<g opacity="${cl(press * 2).toFixed(2)}"><path d="M ${ax} ${ay} V ${ay + 110}" stroke="${K.white}" stroke-width="16" stroke-linecap="round"/><path d="M ${ax - 28} ${ay + 80} L ${ax} ${ay + 116} L ${ax + 28} ${ay + 80}" stroke="${K.white}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
  }
  return s;
}

// ---------- brain + nerve path (diagram) ----------
export function brain(x, y, s, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -150 30 Q -170 -70 -90 -110 Q -40 -160 30 -130 Q 110 -150 150 -80 Q 190 -10 140 50 Q 120 100 40 96 Q -20 120 -80 96 Q -150 90 -150 30 Z" fill="${o.col || K.pink}" ${OL(5)}/>
    <path d="M -100 -40 q 30 -30 60 0 q 30 30 60 0 M -60 40 q 30 -24 60 0 q 24 20 60 -6 M 0 -110 q -10 40 10 70" stroke="${K.pinkSh}" stroke-width="8" fill="none" stroke-linecap="round"/>
    ${o.face === false ? '' : `<ellipse cx="-36" cy="6" rx="10" ry="${o.blink ? 2 : 13}" fill="${K.ol}"/><ellipse cx="36" cy="6" rx="10" ry="${o.blink ? 2 : 13}" fill="${K.ol}"/>${o.mouth === 'o' ? `<ellipse cx="0" cy="48" rx="10" ry="12" fill="#7A2E3A"/>` : o.mouth === 'worry' ? `<path d="M -18 52 q 18 -14 36 0" stroke="${K.ol}" stroke-width="6" fill="none" stroke-linecap="round"/>` : `<path d="M -18 44 q 18 14 36 0" stroke="${K.ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`}`}
  </g>`;
}
// small foot icon (side view) for the brain's "position map"
export function footIcon(x, y, s, rot, o = {}) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${o.a ?? 1}">
    <path d="M -20 -110 L -20 -20 Q -36 30 0 34 L 110 34 Q 130 28 126 10 Q 118 -6 90 -10 L 26 -26 L 26 -110 Z" fill="${o.col || K.white}" stroke="${K.ol}" stroke-width="${o.w || 6}" stroke-linejoin="round" ${o.dash ? 'stroke-dasharray="14 10"' : ''}/>
  </g>`;
}
export function clock(x, y, r, frac, o = {}) {
  const a = frac * Math.PI * 2 - Math.PI / 2;
  const ex = x + r * .78 * Math.cos(a), ey = y + r * .78 * Math.sin(a);
  const arc = frac > 0.001 ? (frac >= .999 ? `<circle cx="${x}" cy="${y}" r="${r * .9}" fill="${K.teal}" opacity=".3"/>` : `<path d="M ${x} ${y} L ${x} ${y - r * .9} A ${r * .9} ${r * .9} 0 ${frac > .5 ? 1 : 0} 1 ${(x + r * .9 * Math.cos(a)).toFixed(1)} ${(y + r * .9 * Math.sin(a)).toFixed(1)} Z" fill="${K.teal}" opacity=".3"/>`) : '';
  let ticks = ''; for (let i = 0; i < 12; i++) { const b = i / 12 * Math.PI * 2; ticks += `<path d="M ${(x + Math.cos(b) * r * .8).toFixed(1)} ${(y + Math.sin(b) * r * .8).toFixed(1)} L ${(x + Math.cos(b) * r * .92).toFixed(1)} ${(y + Math.sin(b) * r * .92).toFixed(1)}" stroke="${K.ol}" stroke-width="${i % 3 ? 4 : 8}"/>`; }
  return `<circle cx="${x}" cy="${y}" r="${r}" fill="${K.white}" ${OL(6)}/>${arc}${ticks}<path d="M ${x} ${y} L ${ex.toFixed(1)} ${ey.toFixed(1)}" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/><circle cx="${x}" cy="${y}" r="12" fill="${K.ol}"/>`;
}
export function xmark(x, y, s, p) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${(back(cl(p)) * s).toFixed(3)})"><circle r="90" fill="${K.white}" stroke="${K.red}" stroke-width="12"/><path d="M -44 -44 L 44 44 M 44 -44 L -44 44" stroke="${K.red}" stroke-width="20" stroke-linecap="round"/></g>`;
}
export function check(x, y, s, p) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${(back(cl(p)) * s).toFixed(3)})"><circle r="90" fill="${K.white}" stroke="${K.teal}" stroke-width="12"/><path d="M -44 0 L -12 34 L 48 -34" stroke="${K.teal}" stroke-width="20" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
// headline text block (cover)
export function headline(lines, y, sz, p = 1) {
  return `<g opacity="${cl(p)}">${lines.map((l, i) => TX(l, 540, y + i * sz * 1.08, sz, K.navy)).join('')}</g>`;
}
export const BG = `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>`;

// camera: show the world point (fx,fy) at screen (540, sy) with zoom z
export const cam = (fx, fy, z, svg, sy = 760) => `<g transform="translate(540 ${sy}) scale(${z.toFixed(4)}) translate(${-fx} ${-fy})">${svg}</g>`;
// bed seen from the side (mattress top y = 1000)
export function bed() {
  return `<rect x="60" y="1100" width="30" height="${FLOOR - 1100}" fill="${K.wood}" ${OL(4)}/><rect x="960" y="1100" width="30" height="${FLOOR - 1100}" fill="${K.wood}" ${OL(4)}/>
  <rect x="40" y="760" width="60" height="360" rx="20" fill="${K.wood}" ${OL(4)}/>
  <rect x="80" y="1000" width="940" height="110" rx="30" fill="${K.white}" ${OL(4)}/><rect x="80" y="1070" width="940" height="50" rx="20" fill="${K.wall2}" ${OL(4)}/>`;
}

// world hand position of the near arm (same maths as person())
export function handAt(hx, hy, s, aB, A) {
  const [bx, by] = D(aB), sh = [bx * 210, by * 210];
  const [ux, uy] = D(A.u), [fx, fy] = D(A.f);
  return [hx + s * (sh[0] + ux * 130 + fx * 118), hy + s * (sh[1] + uy * 130 + fy * 118)];
}
export const DOC = { c: { hood: '#FFFFFF', hoodSh: '#DCE6EA', pants: '#2EC4B6', pantsSh: '#21A396' }, hairC: '#2A2A2A', hairSh: '#151515', noBun: true, glasses: true };
