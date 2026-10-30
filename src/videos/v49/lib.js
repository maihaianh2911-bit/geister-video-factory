// @ts-nocheck
// v49 Stromausfall im Winter — shared helpers for this video's shots (Kênh 1 look; Jonas design from v34).
import { cl, prog, eio, eout, back, lerp, ring, hash } from '../../engine/core.js';

export const K = {
  bg: '#141A1F', bg2: '#1E2A30', moss: '#24363A', amb: '#FFB547', ambD: '#C9822A', red: '#E5484D', redD: '#A8282E', ol: '#0B0F12',
  skin: '#E8B38A', skinSh: '#C48E68',
  park: '#56703F', parkSh: '#3C5030', parkHi: '#6E8A50', hat: '#F07A2A', hatSh: '#C25A1A', hatHi: '#FF9A50', beard: '#6B4428', beardSh: '#4E301B',
  conc: '#2B3943', concSh: '#1F2A32', concHi: '#3A4B56', win: '#0E1418', lit: '#FFC46B',
  snow: '#DCE7EE', cold: '#5E7F93', coldHi: '#9DB8C8', ice: '#BFE3F5',
  steel: '#5A6A74', steelSh: '#3A464E', steelHi: '#7D8D97', wood: '#5A4030', woodSh: '#3E2C21', woodHi: '#7A5A44',
  blanket: '#8A3B3B', blanketSh: '#6A2A2C', towel: '#3E6FB0', towelSh: '#2C507F', sock: '#B5A27A',
  wall: '#2A3238', wallSh: '#20272C', floor: '#1A2024',
};
export const OL = (w = 6) => `stroke="${K.ol}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const shk = (t, t0, a, d = 6) => { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; };
export const blinkAt = (t, off = 0) => { const k = (t + off) % 2.7; return k > 2.55 ? Math.sin((k - 2.55) / .15 * Math.PI) : 0; };
export const talkAt = (t, a, b) => t > a && t < b ? .25 + .75 * Math.abs(Math.sin((t - a) * 17)) * (.6 + .4 * Math.sin(t * 5.3)) : 0;
export const f1 = v => (+v).toFixed(1);

export const KDEFS = `<defs>
<linearGradient id="kSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091015"/><stop offset=".65" stop-color="#1A262C"/><stop offset="1" stop-color="#2C3D45"/></linearGradient>
<radialGradient id="kAmb" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB547" stop-opacity=".75"/><stop offset=".5" stop-color="#FFB547" stop-opacity=".25"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
<radialGradient id="kCold" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#CFE3F0" stop-opacity=".55"/><stop offset="1" stop-color="#CFE3F0" stop-opacity="0"/></radialGradient>
<radialGradient id="kRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E5484D" stop-opacity=".6"/><stop offset="1" stop-color="#E5484D" stop-opacity="0"/></radialGradient>
<radialGradient id="kHeat" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FF8A3D" stop-opacity=".8"/><stop offset=".6" stop-color="#FFB547" stop-opacity=".3"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
<linearGradient id="kFg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0F12" stop-opacity="0"/><stop offset=".35" stop-color="#0B0F12" stop-opacity=".82"/><stop offset="1" stop-color="#0B0F12" stop-opacity=".95"/></linearGradient>
<linearGradient id="kBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF1CF" stop-opacity=".7"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></linearGradient>
</defs>`;
export const FG = (y = 1340) => `<rect x="0" y="${y}" width="1080" height="${1920 - y}" fill="url(#kFg)"/>`;

export function snow(t, n = 40, seed = 1, wind = 40, a = .8) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const sp = 70 + 90 * hash(i + seed), y = (hash(i * 3 + seed) * 2000 + t * sp) % 2000 - 40;
    const x = (hash(i * 7 + seed) * 1180 + t * wind + 30 * Math.sin(t * 1.3 + i)) % 1180 - 50;
    s += `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(2.5 + 4 * hash(i + 11 * seed))}" fill="${K.snow}" opacity="${(a * (.4 + .6 * hash(i + 5))).toFixed(2)}"/>`;
  }
  return s;
}

// slab building facade; lit = 0..1, off = per-floor blackout progress (0 lit … 1 dark, top floors first)
export function tower(x, yb, w, fl, cols, o = {}) {
  const fh = o.fh || 80, h = fl * fh, seed = o.seed || 1, cw = w / cols, ww = cw * .58, pad = cw * .21;
  let s = `<rect x="${x}" y="${yb - h}" width="${w}" height="${h}" fill="${o.col || K.conc}" ${OL(o.lw || 5)}/>`;
  s += `<rect x="${x + w * .78}" y="${yb - h}" width="${w * .22}" height="${h}" fill="${K.concSh}" opacity=".6"/>`;
  for (let f = 0; f < fl; f++) {
    const y = yb - (f + .5) * fh;
    s += `<line x1="${x}" y1="${yb - f * fh}" x2="${x + w}" y2="${yb - f * fh}" stroke="${K.concSh}" stroke-width="${Math.max(1.5, fh * .05)}"/>`;
    s += `<line x1="${x + pad}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${K.win}" stroke-width="${fh * .46}" stroke-dasharray="${f1(ww)} ${f1(cw - ww)}"/>`;
    const L = (o.lit || 0) * (o.off ? 1 - cl(o.off * fl - (fl - 1 - f) * .6) : 1);
    if (L > 0.01) {
      const cs = [];
      for (let c = 0; c < cols; c++) if (hash(seed * 31.7 + f * 13.1 + c * 7.3) < (o.p ?? .72)) cs.push(c);
      if (cs.length) {
        const da = [];
        cs.forEach((c, i) => { da.push(f1(ww)); da.push(i < cs.length - 1 ? f1((cs[i + 1] - c) * cw - ww) : 3000); });
        s += `<line x1="${f1(x + pad + cs[0] * cw)}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${K.lit}" opacity="${L.toFixed(2)}" stroke-width="${fh * .46}" stroke-dasharray="${da.join(' ')}"/>`;
      }
    }
  }
  if (o.mark) { // one window of Jonas' flat with his lantern
    const [c, f] = o.mark, mx = x + pad + c * cw + ww / 2, my = yb - (f + .5) * fh;
    s += `<rect x="${f1(mx - ww / 2)}" y="${f1(my - fh * .23)}" width="${f1(ww)}" height="${f1(fh * .46)}" fill="${K.amb}" opacity="${o.markA ?? 1}"/>`;
    s += `<circle cx="${f1(mx)}" cy="${f1(my)}" r="${fh * 1.6}" fill="url(#kAmb)" opacity="${.9 * (o.markA ?? 1)}"/>`;
  }
  return s;
}

// ---------- characters ----------
function arm(sx, sy, a1, a2, side, L1, L2, col, w) {
  const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
  const ex = sx + side * Math.sin(r1) * L1, ey = sy + Math.cos(r1) * L1;
  const hx = ex + side * Math.sin(r2) * L2, hy = ey + Math.cos(r2) * L2;
  const d = `M ${sx} ${sy} L ${f1(ex)} ${f1(ey)} L ${f1(hx)} ${f1(hy)}`;
  return { hx, hy, svg: `<path d="${d}" fill="none" stroke="${K.ol}" stroke-width="${w + 12}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` };
}
export function eyesS(o) {
  const lx = cl(o.look || 0, -14, 14), ly = cl(o.lookY || 0, -12, 12), bl = o.blink || 0, es = o.eyeS || 1, lid = o.lid || 0;
  return [-34, 34].map(ex => `<ellipse cx="${ex}" cy="-6" rx="${14 * es}" ry="${f1(Math.max(2, 17 * es * (1 - Math.max(bl, lid))))}" fill="#F6F1E8" ${OL(4)}/>` + (Math.max(bl, lid) < .6 ? `<circle cx="${f1(ex + lx * .7)}" cy="${f1(-5 + ly * .7)}" r="${7.5 * Math.min(es, 1.15)}" fill="${K.ol}"/>` : '')).join('');
}
export function browsS(type, col, y0 = -34) {
  const B = { calm: [[-52, 2, -18, 0], [18, 0, 52, 2]], worry: [[-52, 4, -18, -8], [18, -8, 52, 4]], up: [[-52, -8, -18, -12], [18, -12, 52, -8]], angry: [[-52, -6, -18, 6], [18, 6, 52, -6]], pain: [[-52, 8, -18, -10], [18, -10, 52, 8]] }[type || 'calm'];
  return B.map(b => `<path d="M ${b[0]} ${y0 + b[1]} L ${b[2]} ${y0 + b[3]}" stroke="${col}" stroke-width="10" stroke-linecap="round"/>`).join('');
}
export function mouthS(m, talk, y) {
  if (talk > .05 || m === 'o') { const ry = m === 'o' ? 16 : 4 + 14 * talk; return `<ellipse cx="0" cy="${y}" rx="${m === 'o' ? 13 : 18}" ry="${f1(ry)}" fill="#3A1414" ${OL(4)}/>`; }
  if (m === 'smile') return `<path d="M -26 ${y - 6} Q 0 ${y + 18} 26 ${y - 6}" fill="none" ${OL(6)}/>`;
  if (m === 'worried') return `<path d="M -24 ${y + 4} q 8 -10 16 0 q 8 10 16 0 q 8 -10 16 0" fill="none" ${OL(5)}/>`;
  if (m === 'grim') return `<path d="M -24 ${y + 6} Q 0 ${y - 8} 24 ${y + 6}" fill="none" ${OL(6)}/>`;
  return `<path d="M -20 ${y} L 20 ${y}" fill="none" ${OL(6)}/>`;
}
export function jHead(o = {}) {
  const hat = o.hatDown || 0; // 0..1 pulls the beanie lower over the ears
  return `<g transform="rotate(${o.tilt || 0})">
   <circle cx="-86" cy="10" r="20" fill="${K.skinSh}" ${OL(5)}/><circle cx="86" cy="10" r="20" fill="${K.skinSh}" ${OL(5)}/>
   <ellipse cx="0" cy="6" rx="86" ry="100" fill="${K.skin}" ${OL(6)}/>
   ${o.cold ? `<ellipse cx="-50" cy="34" rx="18" ry="10" fill="#E07A7A" opacity=".5"/><ellipse cx="50" cy="34" rx="18" ry="10" fill="#E07A7A" opacity=".5"/><ellipse cx="0" cy="26" rx="14" ry="10" fill="#E07A7A" opacity=".55"/>` : ''}
   ${o.pale ? `<ellipse cx="0" cy="6" rx="86" ry="100" fill="#9DB8C8" opacity="${.35 * o.pale}"/>` : ''}
   <path d="M -85 12 Q -84 104 0 110 Q 84 104 85 12 Q 78 54 48 60 Q 0 72 -48 60 Q -78 54 -85 12 Z" fill="${K.beard}" ${OL(5)}/>
   <path d="M -42 46 Q 0 30 42 46 Q 22 58 0 51 Q -22 58 -42 46 Z" fill="${K.beardSh}"/>
   <path d="M -4 2 Q -14 30 -2 34 Q 8 36 12 30" fill="none" stroke="${K.skinSh}" stroke-width="7" stroke-linecap="round"/>
   ${eyesS(o)}${browsS(o.brow, K.beardSh)}
   ${mouthS(o.mouth || 'flat', o.talk || 0, 76)}
   <g transform="translate(0 ${f1(26 * hat)})">
   <path d="M -94 -40 Q -98 -156 0 -158 Q 98 -156 94 -40 Z" fill="${K.hat}" ${OL(6)}/>
   <path d="M -50 -128 Q 0 -150 50 -128" fill="none" stroke="${K.hatHi}" stroke-width="9" stroke-linecap="round"/>
   <rect x="-100" y="-80" width="200" height="42" rx="16" fill="${K.hatSh}" ${OL(5)}/>
   <path d="M -70 -74 V -44 M -42 -74 V -44 M -14 -74 V -44 M 14 -74 V -44 M 42 -74 V -44 M 70 -74 V -44" stroke="${K.hat}" stroke-width="6"/></g>
  </g>`;
}
export function jBackHead(u = 0) {
  return `<g>
   <circle cx="${-84 + 20 * u}" cy="14" r="20" fill="${K.skinSh}" ${OL(5)}/><circle cx="${84 - 10 * u}" cy="14" r="20" fill="${K.skinSh}" ${OL(5)}/>
   <ellipse cx="0" cy="6" rx="86" ry="100" fill="${K.skinSh}" ${OL(6)}/>
   <path d="M -84 30 Q -70 104 0 108 Q 70 104 84 30 Q 40 70 0 68 Q -40 70 -84 30 Z" fill="${K.beard}" opacity="${.4 + .6 * u}"/>
   <path d="M -96 30 Q -100 -156 0 -158 Q 100 -156 96 30 Q 0 54 -96 30 Z" fill="${K.hat}" ${OL(6)}/>
   <rect x="-102" y="-8" width="204" height="44" rx="16" fill="${K.hatSh}" ${OL(5)}/>
   <path d="M -60 -130 Q 0 -152 60 -130" fill="none" stroke="${K.hatHi}" stroke-width="9" stroke-linecap="round"/>
  </g>`;
}
// Jonas: origin = centre of shoulder line. aL/aR = [upper, fore] degrees from straight down (+ outward, − across the body)
export function jonas(x, y, s, o = {}) {
  const aL = o.aL || [10, 6], aR = o.aR || [10, 6];
  const L = arm(-126, 34, aL[0], aL[1], -1, 150, 138, K.park, 62), R = arm(126, 34, aR[0], aR[1], 1, 150, 138, K.park, 62);
  const hnd = p => `<circle cx="${f1(p.hx)}" cy="${f1(p.hy)}" r="27" fill="${K.skin}" ${OL(5)}/>`;
  const head = o.back ? jBackHead(o.u || 0) : jHead(o);
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${o.lean || 0}) scale(${s})">
    <path d="M -150 44 Q -152 -8 -96 -20 L 96 -20 Q 152 -8 150 44 L 174 560 L -174 560 Z" fill="${K.park}" ${OL(6)}/>
    <path d="M 70 -14 Q 150 -6 150 44 L 174 560 L 112 560 Z" fill="${K.parkSh}"/>
    ${o.back ? '' : `<path d="M 0 30 V 560" stroke="${K.parkSh}" stroke-width="7"/><rect x="-136" y="330" width="88" height="72" rx="10" fill="none" stroke="${K.parkSh}" stroke-width="7"/><rect x="48" y="330" width="88" height="72" rx="10" fill="none" stroke="${K.parkSh}" stroke-width="7"/>`}
    ${o.back ? `<path d="M -120 -20 Q 0 -70 120 -20 L 130 70 Q 0 30 -130 70 Z" fill="${K.parkSh}" ${OL(5)}/>` : ''}
    <g transform="translate(${o.hdx || 0} ${-112 + (o.hdy || 0)})">${head}</g>
    ${o.back ? '' : `<path d="M -112 -34 Q 0 40 112 -34 L 120 4 Q 0 74 -120 4 Z" fill="${K.parkHi}" ${OL(5)}/>`}
    ${o.holdL ? o.holdL(L.hx, L.hy) : ''}${o.holdR ? o.holdR(R.hx, R.hy) : ''}
    ${o.noArmL ? '' : L.svg + hnd(L)}${o.noArmR ? '' : R.svg + hnd(R)}
    ${o.front || ''}
  </g>`;
}
export function ik(side, sx, sy, tx, ty, L1, L2, flip = 1) {
  const dx = tx - sx, dy = ty - sy, D = cl(Math.hypot(dx, dy), 1, L1 + L2 - 1);
  const ad = Math.atan2(side * dx, dy), al = Math.acos(cl((L1 * L1 + D * D - L2 * L2) / (2 * L1 * D), -1, 1));
  const a1 = ad + flip * al, ex = sx + side * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1;
  return [a1 * 180 / Math.PI, Math.atan2(side * (tx - ex), ty - ey) * 180 / Math.PI];
}
export const jReach = (x, y, s, side, tx, ty, flip) => ik(side, side * 126, 34, (tx - x) / s, (ty - y) / s, 150, 138, flip);
// sleeve arm in screen coords from a visible shoulder to a hand (close-ups)
export function armTo(sx, sy, hx, hy, w, flip = 1, col = K.park) {
  const L = Math.hypot(hx - sx, hy - sy) || 1, h = Math.sqrt(Math.max(0, (L * .56) ** 2 - (L / 2) ** 2));
  const ex = (sx + hx) / 2 + flip * h * (hy - sy) / L, ey = (sy + hy) / 2 - flip * h * (hx - sx) / L;
  const d = `M ${f1(sx)} ${f1(sy)} L ${f1(ex)} ${f1(ey)} L ${f1(hx)} ${f1(hy)}`;
  return `<path d="${d}" fill="none" stroke="${K.ol}" stroke-width="${w + 14}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="${w * .5}" fill="${K.skin}" ${OL(6)}/>`;
}

// neighbours (bust, origin = shoulder centre). Each has its own look; Jonas is never one of them.
export const NB = [
  { coat: '#7A4E8C', coatSh: '#5A3768', hair: '#D9D9D9', skin: '#E9BE9C', style: 'bun' },    // Frau Neumann, ~70
  { coat: '#3E6FB0', coatSh: '#2C507F', hair: '#2B1D16', skin: '#C98E66', style: 'short' },  // Herr Yilmaz
  { coat: '#C9A227', coatSh: '#9C7C18', hair: '#8A5A2B', skin: '#F0C7A4', style: 'long' },   // Lena
  { coat: '#B5523B', coatSh: '#8A3A28', hair: '#3A2A20', skin: '#E2B08A', style: 'cap' },    // Tom (teen)
  { coat: '#4F8C86', coatSh: '#386864', hair: '#C9C1B5', skin: '#E7BA94', style: 'bald' },   // Herr Krause
  { coat: '#6B737A', coatSh: '#4E555B', hair: '#5A4636', skin: '#E3B48E', style: 'short' },  // anonymous person in the "what happens" shots
];
export function nbr(i, x, y, s, o = {}) {
  const n = NB[i % NB.length];
  const hair = {
    bun: `<path d="M -84 -10 Q -92 -112 0 -114 Q 92 -112 84 -10 Q 70 -66 0 -70 Q -70 -66 -84 -10 Z" fill="${n.hair}" ${OL(5)}/><circle cx="0" cy="-118" r="34" fill="${n.hair}" ${OL(5)}/>`,
    short: `<path d="M -84 -10 Q -90 -112 0 -112 Q 90 -112 84 -10 Q 76 -60 40 -66 Q 0 -54 -40 -66 Q -76 -60 -84 -10 Z" fill="${n.hair}" ${OL(5)}/>`,
    long: `<path d="M -88 90 Q -104 -116 0 -114 Q 104 -116 88 90 L 60 90 Q 76 -40 40 -62 Q 0 -44 -40 -62 Q -76 -40 -60 90 Z" fill="${n.hair}" ${OL(5)}/>`,
    cap: `<path d="M -88 -24 Q -92 -116 0 -118 Q 92 -116 88 -24 Z" fill="#2B2B2B" ${OL(5)}/><path d="M -20 -40 Q 60 -54 140 -36 L 136 -22 Q 60 -34 -20 -26 Z" fill="#2B2B2B" ${OL(4)}/>`,
    bald: `<path d="M -84 10 Q -90 -30 -70 -50 M 84 10 Q 90 -30 70 -50" fill="none" stroke="${n.hair}" stroke-width="16" stroke-linecap="round"/>`,
  }[n.style];
  const lid = o.lid || 0;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${o.lean || 0}) scale(${s})">
    <path d="M -140 44 Q -142 -8 -90 -20 L 90 -20 Q 142 -8 140 44 L 160 460 L -160 460 Z" fill="${n.coat}" ${OL(6)}/>
    <path d="M 66 -14 Q 140 -6 140 44 L 160 460 L 104 460 Z" fill="${n.coatSh}"/>
    <g transform="translate(0 -104) rotate(${o.tilt || 0})">
      <circle cx="-80" cy="10" r="18" fill="${n.skin}" ${OL(5)}/><circle cx="80" cy="10" r="18" fill="${n.skin}" ${OL(5)}/>
      <ellipse cx="0" cy="6" rx="80" ry="94" fill="${n.skin}" ${OL(6)}/>
      ${o.pale ? `<ellipse cx="0" cy="6" rx="80" ry="94" fill="#9DB8C8" opacity="${.35 * o.pale}"/>` : ''}
      ${eyesS({ look: o.look || 0, lookY: o.lookY || 0, blink: o.blink || 0, lid, eyeS: .92 })}
      ${browsS(o.brow || 'calm', '#3A2A20', -36)}
      ${mouthS(o.mouth || 'flat', o.talk || 0, 58)}
      ${hair}
    </g>
    <path d="M -100 -32 Q 0 34 100 -32 L 108 2 Q 0 66 -108 2 Z" fill="${n.coatSh}" ${OL(5)}/>
    ${o.front || ''}
  </g>`;
}

// ---------- props ----------
export function lantern(x, y, s, on = 1) { // battery LED lantern (safe light source)
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    ${on > 0 ? `<ellipse cx="0" cy="-70" rx="420" ry="380" fill="url(#kAmb)" opacity="${(.8 * on).toFixed(2)}"/>` : ''}
    <path d="M -40 -150 Q 0 -200 40 -150" fill="none" stroke="#2B2B2B" stroke-width="12" stroke-linecap="round"/>
    <rect x="-50" y="-150" width="100" height="26" rx="8" fill="#2B2B2B" ${OL(4)}/>
    <rect x="-42" y="-124" width="84" height="100" rx="10" fill="${on > 0 ? '#FFE3A6' : '#4A4A4A'}" ${OL(5)}/>
    <rect x="-56" y="-24" width="112" height="28" rx="8" fill="#2B2B2B" ${OL(4)}/>
  </g>`;
}
export function thermo(x, y, s, v, o = {}) { // round wall thermometer, v = °C (−20..40), label below
  const a = (-135 + (v + 20) / 60 * 270) * Math.PI / 180;
  let ticks = '';
  for (let i = 0; i <= 12; i++) { const b = (-135 + i * 22.5) * Math.PI / 180; ticks += `<line x1="${f1(150 * Math.sin(b))}" y1="${f1(-150 * Math.cos(b))}" x2="${f1(124 * Math.sin(b))}" y2="${f1(-124 * Math.cos(b))}" stroke="#2B3943" stroke-width="${i % 2 ? 5 : 9}"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})" filter="url(#drop)">
    <circle cx="0" cy="0" r="190" fill="#D8DEE2" ${OL(8)}/><circle cx="0" cy="0" r="168" fill="#F2F4F5" ${OL(4)}/>
    <path d="M ${f1(158 * Math.sin(-135 * Math.PI / 180))} ${f1(-158 * Math.cos(-135 * Math.PI / 180))} A 158 158 0 0 1 0 -158" fill="none" stroke="#5EA8D6" stroke-width="12" opacity=".7"/>
    <path d="M 0 -158 A 158 158 0 0 1 ${f1(158 * Math.sin(135 * Math.PI / 180))} ${f1(-158 * Math.cos(135 * Math.PI / 180))}" fill="none" stroke="${K.red}" stroke-width="12" opacity=".6"/>
    ${ticks}
    <line x1="0" y1="0" x2="${f1(130 * Math.sin(a))}" y2="${f1(-130 * Math.cos(a))}" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/>
    <circle cx="0" cy="0" r="18" fill="${K.ol}"/>
    ${o.label ? TX(o.label, 0, 96, 64, K.ol) : ''}
  </g>`;
}
export function card(n, x, y, s, p, red = false) { // REGEL n card
  if (p <= 0) return '';
  const col = red ? K.red : K.amb;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${(s * p).toFixed(3)}) rotate(${f1(-4 * (1 - cl(p)))})">
    <rect x="-330" y="-150" width="660" height="300" rx="34" fill="#000" opacity=".5" transform="translate(14 18)"/>
    <rect x="-330" y="-150" width="660" height="300" rx="34" fill="${K.ol}" stroke="${col}" stroke-width="12"/>
    <rect x="-300" y="-120" width="600" height="56" rx="12" fill="${col}"/>
    ${TX('REGEL', 0, -76, 48, K.ol, 'middle', 'letter-spacing="14"')}
    ${TX(String(n), 0, 112, 190, col)}
  </g>`;
}
export function label(str, cx, cy, sz, p, col = '#FFFFFF', bg = K.ol) {
  if (p <= 0) return '';
  const w = str.length * sz * .62 + sz * .9, h = sz * 1.35;
  return `<g transform="translate(${f1(cx)} ${f1(cy)}) scale(${p.toFixed(3)}) rotate(${f1(-3 * (1 - cl(p)))})">
    <rect x="${f1(-w / 2 + 10)}" y="${f1(-h / 2 + 12)}" width="${f1(w)}" height="${f1(h)}" rx="12" fill="#000" opacity=".5"/>
    <rect x="${f1(-w / 2)}" y="${f1(-h / 2)}" width="${f1(w)}" height="${f1(h)}" rx="12" fill="${bg}" stroke="${col}" stroke-opacity=".35" stroke-width="4"/>
    ${TX(str, 0, f1(sz * .36), sz, col, 'middle', 'letter-spacing="4"')}
  </g>`;
}
export function rings(t, t0, x, y, col = K.amb, n = 3, r1 = 260) {
  let s = '';
  for (let k = 0; k < n; k++) { const p = prog(t, t0 + k * .09, t0 + .7 + k * .09); if (p > 0 && p < 1) s += `<circle cx="${x}" cy="${y}" r="${f1(40 + p * r1)}" fill="none" stroke="${col}" stroke-width="${f1(10 * (1 - p))}" opacity="${(.7 * (1 - p)).toFixed(2)}"/>`; }
  return s;
}
export function breath(t, t0, x, y, dir = 1) {
  const p = prog(t, t0, t0 + 1.1); if (p <= 0 || p >= 1) return '';
  let s = ''; for (let i = 0; i < 3; i++) { const q = cl(p * 1.3 - i * .12); if (q <= 0) continue; s += `<circle cx="${f1(x + dir * (30 + 120 * q + i * 30))}" cy="${f1(y - 20 * q - i * 10)}" r="${f1(18 + 50 * q)}" fill="#E6F0F6" opacity="${(.45 * (1 - q)).toFixed(2)}"/>`; }
  return s;
}
export function radiator(x, y, s, heat = 0, frost = 0) {
  let fins = '';
  for (let i = 0; i < 8; i++) fins += `<rect x="${-200 + i * 50}" y="-150" width="40" height="300" rx="18" fill="${heat > .05 ? '#E9E4DA' : '#D5DCE0'}" ${OL(5)}/>`;
  let waves = '';
  if (heat > .02) for (let i = 0; i < 5; i++) waves += `<path d="M ${-160 + i * 80} -180 q 20 -40 0 -80 q -20 -40 0 -80" fill="none" stroke="#FF8A3D" stroke-width="10" stroke-linecap="round" opacity="${(.7 * heat).toFixed(2)}"/>`;
  let fr = '';
  if (frost > .02) for (let i = 0; i < 9; i++) fr += `<path d="M ${-200 + i * 50} 150 l 10 ${f1(-40 * frost - 20 * hash(i))} l 10 ${f1(40 * frost + 20 * hash(i))}" fill="${K.ice}" opacity="${(.8 * frost).toFixed(2)}"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    ${heat > .02 ? `<ellipse cx="0" cy="-40" rx="380" ry="300" fill="url(#kHeat)" opacity="${(.8 * heat).toFixed(2)}"/>` : ''}
    <rect x="-220" y="-130" width="440" height="40" rx="14" fill="#BFC7CC" ${OL(5)}/>
    ${fins}
    <rect x="-220" y="90" width="440" height="40" rx="14" fill="#BFC7CC" ${OL(5)}/>
    <rect x="200" y="-40" width="60" height="80" rx="12" fill="#E9ECEE" ${OL(5)}/>
    ${waves}${fr}
  </g>`;
}
// small room interior (the one room Jonas keeps warm): window left, door right, lantern
export function room(t, o = {}) {
  const lamp = o.lamp ?? 1, door = o.door ?? 0;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.wall}"/>
    <rect x="0" y="1180" width="1080" height="740" fill="${K.floor}"/>
    <rect x="0" y="1170" width="1080" height="20" fill="${K.wallSh}" ${OL(4)}/>
    <rect x="80" y="300" width="360" height="480" rx="8" fill="#0D1519" ${OL(8)}/>
    <rect x="98" y="318" width="324" height="444" fill="url(#kSky)"/>
    ${tower(110, 762, 130, 10, 4, { fh: 40, col: '#18232A', lw: 3 })}${tower(270, 762, 120, 8, 4, { fh: 44, col: '#18232A', lw: 3 })}
    ${snow(t, 10, 4, 30, .7).replace(/<circle/g, '<circle clip-path="url(#v49win)"')}
    <clipPath id="v49win"><rect x="98" y="318" width="324" height="444"/></clipPath>
    <path d="M 260 318 V 762 M 98 540 H 422" stroke="#0D1519" stroke-width="12"/>
    ${o.blanket ? `<path d="M 60 ${f1(282 + 0 * o.blanket)} H 460 V ${f1(282 + 540 * o.blanket)} Q 260 ${f1(300 + 560 * o.blanket)} 60 ${f1(282 + 540 * o.blanket)} Z" fill="${K.blanket}" ${OL(6)}/><path d="M 140 300 V ${f1(282 + 520 * o.blanket)} M 260 300 V ${f1(282 + 540 * o.blanket)} M 380 300 V ${f1(282 + 520 * o.blanket)}" stroke="${K.blanketSh}" stroke-width="10" opacity=".8"/>` : ''}
    <rect x="50" y="270" width="420" height="22" rx="10" fill="${K.steelSh}" ${OL(4)}/>
    <rect x="720" y="420" width="300" height="760" fill="${K.woodSh}" ${OL(6)}/>
    <g transform="translate(720 0) scale(${f1(1 - .85 * door)} 1) translate(-720 0)"><rect x="728" y="428" width="284" height="752" fill="${K.wood}" ${OL(5)}/>
      <rect x="760" y="470" width="220" height="300" rx="6" fill="none" stroke="${K.woodSh}" stroke-width="8"/><rect x="760" y="820" width="220" height="300" rx="6" fill="none" stroke="${K.woodSh}" stroke-width="8"/>
      <circle cx="${980}" cy="820" r="16" fill="#C9A45A" ${OL(4)}/></g>
    ${o.towel ? `<path d="M 700 1168 Q 870 ${1150 - 6 * Math.sin(t * 2)} 1040 1168 L 1040 1196 Q 870 1186 700 1196 Z" fill="${K.towel}" ${OL(5)}/>` : ''}
    ${lamp > 0 ? `<polygon points="80,780 440,780 760,1500 0,1500" fill="${K.coldHi}" opacity=".05"/>` : ''}`;
}
export function heater(x, y, s, glow = 0, dial = 0) { // small electric fan heater, dial 0..1
  const a = -120 + 240 * dial;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    ${glow > .02 ? `<ellipse cx="0" cy="-60" rx="320" ry="260" fill="url(#kHeat)" opacity="${(.7 * glow).toFixed(2)}"/>` : ''}
    <rect x="-150" y="-200" width="300" height="200" rx="30" fill="#E3E6E8" ${OL(6)}/>
    <rect x="-120" y="-170" width="170" height="140" rx="16" fill="#2B2B2B" ${OL(4)}/>
    ${[0, 1, 2, 3, 4].map(i => `<line x1="-110" y1="${-150 + i * 26}" x2="40" y2="${-150 + i * 26}" stroke="${glow > .05 ? '#FF7A2A' : '#4A4A4A'}" stroke-width="8" opacity="${(.4 + .6 * glow).toFixed(2)}"/>`).join('')}
    <circle cx="100" cy="-100" r="32" fill="#C8CDD0" ${OL(4)}/><line x1="100" y1="-100" x2="${f1(100 + 24 * Math.sin(a * Math.PI / 180))}" y2="${f1(-100 - 24 * Math.cos(a * Math.PI / 180))}" stroke="${K.ol}" stroke-width="8" stroke-linecap="round"/>
    <rect x="-130" y="0" width="60" height="20" rx="8" fill="#2B2B2B"/><rect x="70" y="0" width="60" height="20" rx="8" fill="#2B2B2B"/>
  </g>`;
}
export function grill(x, y, s, t, coal = 1) { // kettle charcoal grill
  let coals = '';
  for (let i = 0; i < 7; i++) coals += `<circle cx="${-90 + i * 30}" cy="${-170 + 8 * Math.sin(i * 2.1)}" r="20" fill="${coal > .1 ? (i % 2 ? '#FF6A2A' : '#E5484D') : '#3A3A3A'}" opacity="${(.5 + .5 * coal * (.7 + .3 * Math.sin(t * 6 + i))).toFixed(2)}" ${OL(3)}/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    ${coal > .1 ? `<ellipse cx="0" cy="-180" rx="220" ry="130" fill="url(#kHeat)" opacity="${(.8 * coal).toFixed(2)}"/>` : ''}
    <path d="M -80 -60 L -130 120 M 80 -60 L 130 120 M 0 -50 L 0 120" stroke="#2B2B2B" stroke-width="14" stroke-linecap="round"/>
    <path d="M -160 -170 Q -150 -40 0 -40 Q 150 -40 160 -170 Z" fill="#2B2B2B" ${OL(6)}/>
    ${coals}
    <line x1="-170" y1="-170" x2="170" y2="-170" stroke="#9AA3A8" stroke-width="8"/>
    <path d="M -120 -110 Q -110 -70 -60 -60" fill="none" stroke="#555" stroke-width="10" stroke-linecap="round"/>
  </g>`;
}
export function gasOven(x, y, s, t, on = 1) { // portable gas heater with ceramic panel and blue cylinder behind
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    ${on > .1 ? `<ellipse cx="0" cy="-200" rx="240" ry="220" fill="url(#kHeat)" opacity="${(.7 * on).toFixed(2)}"/>` : ''}
    <rect x="-150" y="-380" width="300" height="380" rx="24" fill="#5A6A74" ${OL(6)}/>
    <rect x="-120" y="-350" width="240" height="190" rx="10" fill="${on > .1 ? '#FF7A2A' : '#4A4A4A'}" ${OL(4)}/>
    ${[0, 1, 2, 3].map(i => `<line x1="-110" y1="${-320 + i * 44}" x2="110" y2="${-320 + i * 44}" stroke="${on > .1 ? '#FFC46B' : '#3A3A3A'}" stroke-width="6" opacity="${(.6 + .4 * Math.sin(t * 5 + i)).toFixed(2)}"/>`).join('')}
    <circle cx="90" cy="-90" r="26" fill="#C8CDD0" ${OL(4)}/>
    <rect x="-150" y="-12" width="300" height="24" rx="8" fill="#3A464E" ${OL(4)}/>
  </g>`;
}
export function campStove(x, y, s, t, on = 1) { // camping gas stove with cartridge and blue flame
  let fl = '';
  if (on > .1) for (let i = 0; i < 6; i++) { const fx = -60 + i * 24, h = 40 + 14 * Math.sin(t * 13 + i * 2); fl += `<path d="M ${fx - 10} -150 Q ${fx} ${f1(-150 - h)} ${fx + 10} -150 Z" fill="#4FA3FF" opacity=".9"/><path d="M ${fx - 5} -150 Q ${fx} ${f1(-150 - h * .5)} ${fx + 5} -150 Z" fill="#CFE6FF"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <rect x="-90" y="-140" width="180" height="140" rx="30" fill="#D6A23A" ${OL(6)}/>
    <rect x="-90" y="-90" width="180" height="30" fill="#B5832A"/>
    <rect x="-110" y="-160" width="220" height="24" rx="8" fill="#5A6A74" ${OL(5)}/>
    <path d="M -110 -160 L -130 -190 M 110 -160 L 130 -190 M 0 -160 L 0 -190" stroke="#5A6A74" stroke-width="10" stroke-linecap="round"/>
    ${fl}
  </g>`;
}
// CO: invisible gas drawn only as faint dashed contours (viewers learn it is there but cannot be seen)
export function coHaze(t, cx, cy, rx, ry, a = 1, seed = 1) {
  if (a <= .01) return '';
  let s = '';
  for (let i = 0; i < 6; i++) {
    const px = cx + rx * (hash(i * 3.1 + seed) - .5) * 1.6 + 30 * Math.sin(t * .7 + i), py = cy + ry * (hash(i * 5.7 + seed) - .5) * 1.6 + 26 * Math.cos(t * .6 + i * 2);
    const r = 70 + 60 * hash(i + seed * 2);
    s += `<ellipse cx="${f1(px)}" cy="${f1(py)}" rx="${f1(r * 1.3)}" ry="${f1(r)}" fill="#C9D3DA" fill-opacity="${(.05 * a).toFixed(3)}" stroke="#C9D3DA" stroke-opacity="${(.45 * a).toFixed(2)}" stroke-width="5" stroke-dasharray="14 18"/>`;
  }
  return s;
}
export function cross(cx, cy, r, p, col = K.red) { // red ✗
  if (p <= 0) return '';
  const q = cl(p * 2), q2 = cl(p * 2 - 1);
  return `<g transform="translate(${f1(cx)} ${f1(cy)})"><path d="M ${-r} ${-r} L ${f1(-r + 2 * r * q)} ${f1(-r + 2 * r * q)}" stroke="${K.ol}" stroke-width="44" stroke-linecap="round"/><path d="M ${-r} ${-r} L ${f1(-r + 2 * r * q)} ${f1(-r + 2 * r * q)}" stroke="${col}" stroke-width="28" stroke-linecap="round"/>
    ${q2 > 0 ? `<path d="M ${r} ${-r} L ${f1(r - 2 * r * q2)} ${f1(-r + 2 * r * q2)}" stroke="${K.ol}" stroke-width="44" stroke-linecap="round"/><path d="M ${r} ${-r} L ${f1(r - 2 * r * q2)} ${f1(-r + 2 * r * q2)}" stroke="${col}" stroke-width="28" stroke-linecap="round"/>` : ''}</g>`;
}
// floor plan of Jonas' flat (top-down): rooms {x,y,w,h}; warm = index of the warm room, a = 0..1 highlight
export const PLAN = [
  { x: 120, y: 330, w: 520, h: 420, n: 'living' }, { x: 640, y: 330, w: 320, h: 420, n: 'bed' },
  { x: 120, y: 750, w: 360, h: 330, n: 'kitchen' }, { x: 480, y: 750, w: 220, h: 330, n: 'small' }, { x: 700, y: 750, w: 260, h: 330, n: 'bath' },
];
export function plan(t, o = {}) {
  let s = '';
  PLAN.forEach((r, i) => {
    const warm = o.warm === i ? (o.a ?? 1) : 0, dim = o.dim ?? 0;
    s += `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${warm > 0 ? K.amb : '#3C5A6B'}" opacity="${f1(warm > 0 ? .25 + .6 * warm : .55 - .3 * dim)}"/>`;
    if (warm > 0) s += `<ellipse cx="${r.x + r.w / 2}" cy="${r.y + r.h / 2}" rx="${r.w * .9}" ry="${r.h * .9}" fill="url(#kAmb)" opacity="${(.9 * warm).toFixed(2)}"/>`;
    else if (o.frost) s += `<g opacity="${(.6 * o.frost).toFixed(2)}">${[0, 1, 2].map(k => `<path d="M ${r.x + r.w * (.25 + .25 * k)} ${r.y + r.h * .5} m -22 0 h 44 m -22 -22 v 44 m -16 -16 l 32 -32 m -32 0 l 32 32" stroke="${K.ice}" stroke-width="6" stroke-linecap="round"/>`).join('')}</g>`;
  });
  s += `<rect x="120" y="330" width="840" height="750" fill="none" ${OL(16)}/>`;
  s += `<path d="M 640 330 V 600 M 640 690 V 750 M 120 750 H 380 M 440 750 H 520 M 600 750 H 960 M 480 750 V 1080 M 700 750 V 1080" stroke="${K.ol}" stroke-width="12" fill="none"/>`;
  // small room door gap (closes with o.door 0 open … 1 shut)
  const dc = o.door ?? 0;
  s += `<path d="M 600 750 L ${f1(600 - 80 * Math.cos(dc * Math.PI / 2))} ${f1(750 - 80 * Math.sin(dc * Math.PI / 2) * -1)}" stroke="${K.woodHi}" stroke-width="12" stroke-linecap="round"/>`;
  // windows
  s += `<path d="M 220 330 H 420 M 720 330 H 880 M 120 860 V 980 M 960 860 V 980 M 540 1080 H 640" stroke="${K.coldHi}" stroke-width="14"/>`;
  return s;
}
export function door(x, y, s, o = {}) { // flat door seen from inside a room: x,y = bottom-left
  const open = o.open || 0;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${s})">
    <rect x="-12" y="-780" width="344" height="792" fill="${K.woodSh}" ${OL(6)}/>
    <rect x="0" y="-770" width="320" height="770" fill="${o.gap || '#05080A'}"/>
    <g transform="scale(${f1(1 - .9 * open)} 1)"><rect x="0" y="-770" width="320" height="770" fill="${K.wood}" ${OL(5)}/>
      <rect x="34" y="-720" width="252" height="300" rx="6" fill="none" stroke="${K.woodSh}" stroke-width="8"/><rect x="34" y="-370" width="252" height="300" rx="6" fill="none" stroke="${K.woodSh}" stroke-width="8"/>
      <circle cx="285" cy="-390" r="17" fill="#C9A45A" ${OL(4)}/></g>
  </g>`;
}
// imagined / general "what happens" shots: cold tint + dashed inner frame (series convention from v35)
export const ITint = a => `<rect x="0" y="0" width="1080" height="1920" fill="#5E7F93" opacity="${a}" style="mix-blend-mode:multiply"/><rect x="26" y="26" width="1028" height="1868" rx="40" fill="none" stroke="#9DB8C8" stroke-width="10" stroke-dasharray="40 26" opacity=".7"/>`;
export function germany(cx, cy, s) { // simplified outline of Germany
  const P = [[0, -300], [60, -280], [90, -250], [150, -255], [170, -210], [140, -150], [190, -90], [200, -10], [170, 40], [210, 110], [190, 170], [130, 200], [150, 260], [90, 300], [10, 290], [-60, 300], [-90, 260], [-70, 200], [-140, 160], [-160, 90], [-200, 40], [-180, -40], [-200, -110], [-150, -150], [-110, -200], [-60, -220], [-40, -260]];
  return `<path d="M ${P.map(p => `${f1(cx + p[0] * s)} ${f1(cy + p[1] * s)}`).join(' L ')} Z" fill="#24363A" ${OL(8)}/>`;
}
export { cl, prog, eio, eout, back, lerp, ring, hash };
