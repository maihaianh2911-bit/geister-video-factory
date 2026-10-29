// @ts-nocheck
// AUTO-GENERATED scene for v35. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// Blackout Grünau – Teil 2. Characters/props copied unchanged from v34 (series bible); Ben, firefighters and lift sets added.
const K = {
  bg: '#141A1F', bg2: '#1E2A30', moss: '#24363A', amb: '#FFB547', ambD: '#C9822A', red: '#E5484D', ol: '#0B0F12',
  skin: '#E8B38A', skinSh: '#C48E68',
  park: '#56703F', parkSh: '#3C5030', parkHi: '#6E8A50', hat: '#F07A2A', hatSh: '#C25A1A', hatHi: '#FF9A50', beard: '#6B4428', beardSh: '#4E301B',
  mia: '#F4C531', miaSh: '#C99A1E', miaHi: '#FFE07A', mHair: '#9A6A34', mHairSh: '#6F4A22', band: '#2EA39A',
  conc: '#2B3943', concSh: '#1F2A32', concHi: '#3A4B56', win: '#0E1418', lit: '#FFC46B',
  snow: '#DCE7EE', cold: '#5E7F93', coldHi: '#9DB8C8', water: '#7CC6E6', waterSh: '#3F8DB3', waterHi: '#CDEFFC',
  radio: '#F28C28', radioSh: '#B8601A', steel: '#5A6A74', steelSh: '#3A464E', steelHi: '#7D8D97', tile: '#2A3A42', tileSh: '#22303A',
  tram: '#D9DEE2', tramSh: '#A9B3BA', tramB: '#2F5D8A', wood: '#5A4030', woodSh: '#3E2C21',
};
const OL = (w = 6) => `stroke="${K.ol}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
const shk = (t, t0, a, d = 6) => { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; };
const blinkAt = (t, off = 0) => { const k = (t + off) % 2.7; return k > 2.55 ? Math.sin((k - 2.55) / .15 * Math.PI) : 0; };
const talkAt = (t, a, b) => t > a && t < b ? .25 + .75 * Math.abs(Math.sin((t - a) * 17)) * (.6 + .4 * Math.sin(t * 5.3)) : 0;

const MYDEFS = `<defs>
<linearGradient id="kSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#091015"/><stop offset=".65" stop-color="#1A262C"/><stop offset="1" stop-color="#2C3D45"/></linearGradient>
<linearGradient id="kHaze" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB547" stop-opacity="0"/><stop offset="1" stop-color="#FFB547" stop-opacity=".45"/></linearGradient>
<radialGradient id="kAmb" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB547" stop-opacity=".75"/><stop offset=".5" stop-color="#FFB547" stop-opacity=".25"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
<radialGradient id="kCold" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#CFE3F0" stop-opacity=".55"/><stop offset="1" stop-color="#CFE3F0" stop-opacity="0"/></radialGradient>
<radialGradient id="kRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E5484D" stop-opacity=".6"/><stop offset="1" stop-color="#E5484D" stop-opacity="0"/></radialGradient>
<linearGradient id="kFg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0F12" stop-opacity="0"/><stop offset=".35" stop-color="#0B0F12" stop-opacity=".82"/><stop offset="1" stop-color="#0B0F12" stop-opacity=".95"/></linearGradient>
<linearGradient id="kBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF1CF" stop-opacity=".7"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></linearGradient>
<linearGradient id="kWat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#9AD8F0"/><stop offset="1" stop-color="#3F8DB3"/></linearGradient>
<radialGradient id="kMem" cx=".5" cy=".5" r=".6"><stop offset=".6" stop-color="#3A2410" stop-opacity="0"/><stop offset="1" stop-color="#1A1008" stop-opacity=".85"/></radialGradient>
</defs>`;
const FG = (y = 1340) => `<rect x="0" y="${y}" width="1080" height="${1920 - y}" fill="url(#kFg)"/>`;

function snow(t, n = 40, seed = 1, wind = 40, a = .8) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const sp = 70 + 90 * hash(i + seed), y = (hash(i * 3 + seed) * 2000 + t * sp) % 2000 - 40;
    const x = (hash(i * 7 + seed) * 1180 + t * wind + 30 * Math.sin(t * 1.3 + i)) % 1180 - 50;
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${(2.5 + 4 * hash(i + 11 * seed)).toFixed(1)}" fill="${K.snow}" opacity="${(a * (.4 + .6 * hash(i + 5))).toFixed(2)}"/>`;
  }
  return s;
}

// a slab-building facade; windows drawn as dashed lines (cheap), per-window lights from hash
function tower(x, yb, w, fl, cols, o = {}) {
  const fh = o.fh || 80, h = fl * fh, L = o.lit || 0, seed = o.seed || 1, p = o.p ?? .72, cw = w / cols, ww = cw * .58, pad = cw * .21;
  let s = `<rect x="${x}" y="${yb - h}" width="${w}" height="${h}" fill="${o.col || K.conc}" ${OL(o.lw || 5)}/>`;
  s += `<rect x="${x + w * .78}" y="${yb - h}" width="${w * .22}" height="${h}" fill="${K.concSh}" opacity=".6"/>`;
  for (let f = 0; f < fl; f++) {
    const y = yb - (f + .5) * fh;
    s += `<line x1="${x}" y1="${yb - f * fh}" x2="${x + w}" y2="${yb - f * fh}" stroke="${K.concSh}" stroke-width="${Math.max(1.5, fh * .05)}"/>`;
    s += `<line x1="${x + pad}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${K.win}" stroke-width="${fh * .46}" stroke-dasharray="${ww} ${cw - ww}"/>`;
    if (L > 0) {
      const cs = [];
      for (let c = 0; c < cols; c++) if (hash(seed * 31.7 + f * 13.1 + c * 7.3) < p) cs.push(c);
      if (cs.length) {
        const da = [];
        cs.forEach((c, i) => { da.push(ww.toFixed(1)); da.push(i < cs.length - 1 ? ((cs[i + 1] - c) * cw - ww).toFixed(1) : 3000); });
        s += `<line x1="${x + pad + cs[0] * cw}" y1="${y}" x2="${x + w}" y2="${y}" stroke="${K.lit}" opacity="${L}" stroke-width="${fh * .46}" stroke-dasharray="${da.join(' ')}"/>`;
      }
    }
  }
  if (o.refl) s += `<line x1="${x + pad}" y1="${yb - h * .55}" x2="${x + w}" y2="${yb - h * .55 - 4}" stroke="${K.coldHi}" opacity=".12" stroke-width="${h * .9}" stroke-dasharray="${ww * .25} ${cw - ww * .25}"/>`;
  return s;
}

function lightLevel(t) { // the whole district: on, two flickers, out at 3.7
  if (t < 3.24) return 1;
  if (t < 3.3) return .15; if (t < 3.44) return 1; if (t < 3.5) return .25; if (t < 3.7) return .85;
  return 0;
}

// ---------- characters ----------
function arm(sx, sy, a1, a2, side, L1, L2, col, w) {
  const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
  const ex = sx + side * Math.sin(r1) * L1, ey = sy + Math.cos(r1) * L1;
  const hx = ex + side * Math.sin(r2) * L2, hy = ey + Math.cos(r2) * L2;
  const d = `M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx.toFixed(1)} ${hy.toFixed(1)}`;
  return { hx, hy, svg: `<path d="${d}" fill="none" stroke="${K.ol}" stroke-width="${w + 12}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` };
}
function eyesS(o) {
  const lx = cl(o.look || 0, -14, 14), ly = cl(o.lookY || 0, -12, 12), bl = o.blink || 0, es = o.eyeS || 1;
  return [-34, 34].map(ex => `<ellipse cx="${ex}" cy="-6" rx="${14 * es}" ry="${Math.max(2, 17 * es * (1 - bl))}" fill="#F6F1E8" ${OL(4)}/>` + (bl < .6 ? `<circle cx="${ex + lx * .7}" cy="${-5 + ly * .7}" r="${7.5 * Math.min(es, 1.15)}" fill="${K.ol}"/>` : '')).join('');
}
function browsS(type, col, y0 = -34) {
  const B = { calm: [[-52, 2, -18, 0], [18, 0, 52, 2]], worry: [[-52, 4, -18, -8], [18, -8, 52, 4]], up: [[-52, -8, -18, -12], [18, -12, 52, -8]], angry: [[-52, -6, -18, 6], [18, 6, 52, -6]] }[type || 'calm'];
  return B.map(b => `<path d="M ${b[0]} ${y0 + b[1]} L ${b[2]} ${y0 + b[3]}" stroke="${col}" stroke-width="10" stroke-linecap="round"/>`).join('');
}
function mouthS(m, talk, y) {
  if (talk > .05 || m === 'o') { const ry = m === 'o' ? 16 : 4 + 14 * talk; return `<ellipse cx="0" cy="${y}" rx="${m === 'o' ? 13 : 18}" ry="${ry}" fill="#3A1414" ${OL(4)}/>`; }
  if (m === 'smile') return `<path d="M -26 ${y - 6} Q 0 ${y + 18} 26 ${y - 6}" fill="none" ${OL(6)}/>`;
  if (m === 'grin') return `<path d="M -32 ${y - 8} Q 0 ${y + 36} 32 ${y - 8} Z" fill="#3A1414" ${OL(5)}/><path d="M -24 ${y - 3} L 24 ${y - 3}" stroke="#F6F1E8" stroke-width="7"/>`;
  if (m === 'worried') return `<path d="M -24 ${y + 4} q 8 -10 16 0 q 8 10 16 0 q 8 -10 16 0" fill="none" ${OL(5)}/>`;
  return `<path d="M -20 ${y} L 20 ${y}" fill="none" ${OL(6)}/>`;
}
function jHead(o = {}) {
  return `<g transform="rotate(${o.tilt || 0})">
   <circle cx="-86" cy="10" r="20" fill="${K.skinSh}" ${OL(5)}/><circle cx="86" cy="10" r="20" fill="${K.skinSh}" ${OL(5)}/>
   <ellipse cx="0" cy="6" rx="86" ry="100" fill="${K.skin}" ${OL(6)}/>
   <path d="M -85 12 Q -84 104 0 110 Q 84 104 85 12 Q 78 54 48 60 Q 0 72 -48 60 Q -78 54 -85 12 Z" fill="${K.beard}" ${OL(5)}/>
   <path d="M -42 46 Q 0 30 42 46 Q 22 58 0 51 Q -22 58 -42 46 Z" fill="${K.beardSh}"/>
   <path d="M -4 2 Q -14 30 -2 34 Q 8 36 12 30" fill="none" stroke="${K.skinSh}" stroke-width="7" stroke-linecap="round"/>
   ${eyesS(o)}${browsS(o.brow, K.beardSh)}
   ${mouthS(o.mouth || 'flat', o.talk || 0, 76)}
   <path d="M -94 -40 Q -98 -156 0 -158 Q 98 -156 94 -40 Z" fill="${K.hat}" ${OL(6)}/>
   <path d="M -50 -128 Q 0 -150 50 -128" fill="none" stroke="${K.hatHi}" stroke-width="9" stroke-linecap="round"/>
   <rect x="-100" y="-80" width="200" height="42" rx="16" fill="${K.hatSh}" ${OL(5)}/>
   <path d="M -70 -74 V -44 M -42 -74 V -44 M -14 -74 V -44 M 14 -74 V -44 M 42 -74 V -44 M 70 -74 V -44" stroke="${K.hat}" stroke-width="6"/>
  </g>`;
}
function jBackHead(u = 0) { // back of Jonas' head (over the shoulder), u turns toward right profile
  return `<g>
   <circle cx="${-84 + 20 * u}" cy="14" r="20" fill="${K.skinSh}" ${OL(5)}/><circle cx="${84 - 10 * u}" cy="14" r="20" fill="${K.skinSh}" ${OL(5)}/>
   <ellipse cx="0" cy="6" rx="86" ry="100" fill="${K.skinSh}" ${OL(6)}/>
   <path d="M -84 30 Q -70 104 0 108 Q 70 104 84 30 Q 40 70 0 68 Q -40 70 -84 30 Z" fill="${K.beard}" opacity="${.4 + .6 * u}"/>
   <path d="M -96 30 Q -100 -156 0 -158 Q 100 -156 96 30 Q 0 54 -96 30 Z" fill="${K.hat}" ${OL(6)}/>
   <rect x="-102" y="-8" width="204" height="44" rx="16" fill="${K.hatSh}" ${OL(5)}/>
   <path d="M -60 -130 Q 0 -152 60 -130" fill="none" stroke="${K.hatHi}" stroke-width="9" stroke-linecap="round"/>
  </g>`;
}
// Jonas: origin = centre of shoulder line. aL/aR = [upper, fore] degrees from straight down, + = outward, − = across the body
function jonas(x, y, s, o = {}) {
  const aL = o.aL || [10, 6], aR = o.aR || [10, 6];
  const L = arm(-126, 34, aL[0], aL[1], -1, 150, 138, K.park, 62), R = arm(126, 34, aR[0], aR[1], 1, 150, 138, K.park, 62);
  const hnd = p => `<circle cx="${p.hx.toFixed(1)}" cy="${p.hy.toFixed(1)}" r="27" fill="${K.skin}" ${OL(5)}/>`;
  const head = o.back ? jBackHead(o.u || 0) : jHead(o);
  return `<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s})">
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
function mHead(o = {}) {
  const sw = o.sway || 0;
  const braid = sd => { let b = ''; for (let i = 0; i < 5; i++) { const bx = sd * (84 + i * 3) + sw * i * 3, by = 30 + i * 30; b += `<ellipse cx="${bx}" cy="${by}" rx="${17 - i}" ry="19" fill="${i % 2 ? K.mHairSh : K.mHair}" ${OL(4)}/>`; } return b + `<rect x="${sd * 96 + sw * 15 - 12}" y="168" width="24" height="12" rx="5" fill="${K.band}" ${OL(3)}/>`; };
  return `<g transform="rotate(${o.tilt || 0})">
   ${braid(-1)}${braid(1)}
   <ellipse cx="0" cy="8" rx="80" ry="88" fill="${K.skin}" ${OL(6)}/>
   <ellipse cx="-50" cy="40" rx="16" ry="10" fill="#F08F86" opacity=".45"/><ellipse cx="50" cy="40" rx="16" ry="10" fill="#F08F86" opacity=".45"/>
   <path d="M -84 10 Q -96 -102 0 -100 Q 96 -102 84 10 Q 76 -46 34 -54 Q 10 -34 -16 -56 Q -72 -50 -84 10 Z" fill="${K.mHair}" ${OL(6)}/>
   <path d="M -40 -84 Q 0 -96 40 -84" fill="none" stroke="#C08A4C" stroke-width="8" stroke-linecap="round"/>
   <path d="M -2 10 Q -8 26 4 28" fill="none" stroke="${K.skinSh}" stroke-width="6" stroke-linecap="round"/>
   ${eyesS(Object.assign({ eyeS: 1.08 }, o))}${browsS(o.brow, K.mHairSh, -36)}
   ${mouthS(o.mouth || 'smile', o.talk || 0, 56)}
  </g>`;
}
function mia(x, y, s, o = {}) {
  const aL = o.aL || [8, 4], aR = o.aR || [8, 4];
  const L = arm(-98, 26, aL[0], aL[1], -1, 118, 108, K.mia, 50), R = arm(98, 26, aR[0], aR[1], 1, 118, 108, K.mia, 50);
  const hnd = p => `<circle cx="${p.hx.toFixed(1)}" cy="${p.hy.toFixed(1)}" r="22" fill="${K.skin}" ${OL(5)}/>`;
  return `<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s})">
    <path d="M -116 36 Q -118 -6 -74 -16 L 74 -16 Q 118 -6 116 36 L 132 440 L -132 440 Z" fill="${K.mia}" ${OL(6)}/>
    <path d="M 56 -10 Q 118 -6 116 36 L 132 440 L 86 440 Z" fill="${K.miaSh}"/>
    <path d="M 0 24 V 440" stroke="${K.miaSh}" stroke-width="6"/><path d="M -116 230 H 116" stroke="${K.miaSh}" stroke-width="5" opacity=".7"/>
    <g transform="translate(${o.hdx || 0} ${-92 + (o.hdy || 0)})">${mHead(o)}</g>
    <path d="M -88 -26 Q 0 34 88 -26 L 94 4 Q 0 62 -94 4 Z" fill="${K.miaHi}" ${OL(5)}/>
    ${o.holdL ? o.holdL(L.hx, L.hy) : ''}${o.holdR ? o.holdR(R.hx, R.hy) : ''}
    ${L.svg}${hnd(L)}${R.svg}${hnd(R)}
    ${o.front || ''}
  </g>`;
}


// arm reach (inverse kinematics) in a character's local units → [upper, fore] angles for jonas()/mia()
function ik(side, sx, sy, tx, ty, L1, L2, flip = 1) {
  const dx = tx - sx, dy = ty - sy, D = cl(Math.hypot(dx, dy), 1, L1 + L2 - 1);
  const ad = Math.atan2(side * dx, dy), al = Math.acos(cl((L1 * L1 + D * D - L2 * L2) / (2 * L1 * D), -1, 1));
  const a1 = ad + flip * al, ex = sx + side * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1;
  return [a1 * 180 / Math.PI, Math.atan2(side * (tx - ex), ty - ey) * 180 / Math.PI];
}
const jReach = (x, y, s, side, tx, ty, flip) => ik(side, side * 126, 34, (tx - x) / s, (ty - y) / s, 150, 138, flip);
const mReach = (x, y, s, side, tx, ty, flip) => ik(side, side * 98, 26, (tx - x) / s, (ty - y) / s, 118, 108, flip);
// a sleeve arm in screen coords from a visible shoulder to a hand (close-ups)
function armTo(sx, sy, hx, hy, w, flip = 1, col = K.park) {
  const L = Math.hypot(hx - sx, hy - sy) || 1, h = Math.sqrt(Math.max(0, (L * .56) ** 2 - (L / 2) ** 2));
  const ex = (sx + hx) / 2 + flip * h * (hy - sy) / L, ey = (sy + hy) / 2 - flip * h * (hx - sx) / L;
  const d = `M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx} ${hy}`;
  return `<path d="${d}" fill="none" stroke="${K.ol}" stroke-width="${w + 14}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${hx}" cy="${hy}" r="${w * .5}" fill="${K.skin}" ${OL(6)}/>`;
}

// ---------- props ----------
function phone(x, y, s, rot, o = {}) {
  const on = o.on ?? 1;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    ${on > 0 ? `<ellipse cx="0" cy="0" rx="190" ry="210" fill="url(#kCold)" opacity="${.8 * on}"/>` : ''}
    <rect x="-42" y="-78" width="84" height="156" rx="14" fill="#1A2126" ${OL(5)}/>
    <rect x="-34" y="-66" width="68" height="128" rx="8" fill="${on > 0 ? '#BFD8E6' : '#0E1418'}" opacity="${.3 + .7 * on}"/>
    ${o.screen || ''}
  </g>`;
}
function radio(x, y, s, o = {}) {
  const crank = o.crank || 0, dial = o.dial || 0, vib = o.vib || 0;
  const cx = 150, cy = 10;
  const hx = cx + 70 * Math.cos(crank), hy = cy + 70 * Math.sin(crank);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${dial > 0 ? `<ellipse cx="0" cy="-10" rx="${300}" ry="${260}" fill="url(#kAmb)" opacity="${.9 * dial}"/>` : ''}
    <line x1="-90" y1="-90" x2="-170" y2="-250" stroke="${K.steelHi}" stroke-width="8" stroke-linecap="round"/><circle cx="-170" cy="-250" r="9" fill="${K.steelHi}" ${OL(3)}/>
    <path d="M -110 -96 Q -110 -140 -60 -140 L 60 -140 Q 110 -140 110 -96" fill="none" stroke="#2B2B2B" stroke-width="22" stroke-linecap="round"/>
    <rect x="-140" y="-100" width="280" height="200" rx="34" fill="${K.radio}" ${OL(6)}/>
    <rect x="40" y="-100" width="100" height="200" rx="30" fill="${K.radioSh}" opacity=".55"/>
    <g transform="translate(${vib * Math.sin(o.t * 90)} 0)"><circle cx="-56" cy="18" r="58" fill="#2A2018" ${OL(5)}/>
    ${[0, 1, 2, 3].map(i => `<circle cx="-56" cy="18" r="${12 + i * 13}" fill="none" stroke="#4A3A2C" stroke-width="5"/>`).join('')}</g>
    <rect x="22" y="-66" width="92" height="44" rx="10" fill="${dial > 0 ? '#FFD58A' : '#4A3A2C'}" opacity="${.5 + .5 * dial}" ${OL(4)}/>
    <line x1="${34 + 66 * (o.needle || .4)}" y1="-62" x2="${34 + 66 * (o.needle || .4)}" y2="-26" stroke="${K.red}" stroke-width="5"/>
    <circle cx="68" cy="30" r="22" fill="${K.radioSh}" ${OL(5)}/><circle cx="68" cy="30" r="6" fill="${K.ol}"/>
    <circle cx="${cx}" cy="${cy}" r="18" fill="${K.steel}" ${OL(4)}/>
    <line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="${K.ol}" stroke-width="22" stroke-linecap="round"/><line x1="${cx}" y1="${cy}" x2="${hx.toFixed(1)}" y2="${hy.toFixed(1)}" stroke="${K.steelHi}" stroke-width="12" stroke-linecap="round"/>
    <circle cx="${hx.toFixed(1)}" cy="${hy.toFixed(1)}" r="20" fill="#2B2B2B" ${OL(4)}/>
  </g>`;
}
function bottle(x, y, s, lvl, o = {}) { // y = bottom
  const cap = o.cap ?? 1, capY = -260 - 50 * (1 - cap), h = 200 * cl(lvl);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -50 0 L -50 -170 Q -50 -200 -22 -214 L -22 -240 L 22 -240 L 22 -214 Q 50 -200 50 -170 L 50 0 Z" fill="#9DB8C8" fill-opacity=".22" ${OL(5)}/>
    ${h > 0 ? `<path d="M -45 -4 L -45 ${-Math.min(h, 170)} L 45 ${-Math.min(h, 170)} L 45 -4 Z" fill="url(#kWat)" opacity=".9"/>` : ''}
    <path d="M -34 -150 V -30" stroke="#fff" stroke-width="7" opacity=".35" stroke-linecap="round"/>
    ${cap > 0 ? `<g transform="rotate(${(1 - cap) * 200} 0 ${capY + 20})"><rect x="-27" y="${capY}" width="54" height="34" rx="6" fill="${o.capCol || '#2EA39A'}" ${OL(4)}/></g>` : ''}
  </g>`;
}
function pot(x, y, s, lvl) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-150" y="-110" width="40" height="18" rx="8" fill="${K.steelSh}" ${OL(4)}/><rect x="110" y="-110" width="40" height="18" rx="8" fill="${K.steelSh}" ${OL(4)}/>
    <path d="M -118 -130 L -110 -10 Q -108 0 -96 0 L 96 0 Q 108 0 110 -10 L 118 -130 Z" fill="${K.steel}" ${OL(5)}/>
    <ellipse cx="0" cy="-130" rx="118" ry="22" fill="${K.steelSh}" ${OL(5)}/>
    ${lvl > 0 ? `<ellipse cx="0" cy="${-130 + 100 * (1 - cl(lvl))}" rx="${110 - 6 * (1 - lvl)}" ry="18" fill="${K.water}" opacity=".95"/>` : ''}
    <path d="M -80 -100 V -30" stroke="${K.steelHi}" stroke-width="9" stroke-linecap="round"/>
  </g>`;
}
function wcan(x, y, s, lvl) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M 90 -110 L 220 -230" stroke="${K.ol}" stroke-width="30" stroke-linecap="round"/><path d="M 90 -110 L 220 -230" stroke="#4FA36A" stroke-width="18" stroke-linecap="round"/>
    <rect x="200" y="-262" width="44" height="30" rx="8" transform="rotate(-42 222 -247)" fill="#3E8556" ${OL(4)}/>
    <path d="M -100 -170 Q -170 -200 -150 -110 Q -140 -70 -100 -70" fill="none" stroke="${K.ol}" stroke-width="26"/><path d="M -100 -170 Q -170 -200 -150 -110 Q -140 -70 -100 -70" fill="none" stroke="#4FA36A" stroke-width="14"/>
    <path d="M -110 0 L -100 -190 L 100 -190 L 110 0 Z" fill="#4FA36A" ${OL(6)}/>
    <ellipse cx="0" cy="-190" rx="100" ry="18" fill="#3E8556" ${OL(5)}/>
    ${lvl > 0 ? `<ellipse cx="0" cy="-190" rx="${88 * cl(lvl)}" ry="${14 * cl(lvl)}" fill="${K.water}"/>` : ''}
    <path d="M -70 -160 V -30" stroke="#7CCB94" stroke-width="10" stroke-linecap="round"/>
  </g>`;
}
function tap(x, y, s, o = {}) { // faucet; spout tip at local (120, 40)
  const hr = o.handle || 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-40" y="-20" width="80" height="140" rx="14" fill="${K.steel}" ${OL(5)}/>
    <path d="M 0 0 Q 0 -80 80 -80 Q 130 -80 130 -20 L 130 30 L 104 30 L 104 -20 Q 104 -54 80 -54 Q 26 -54 26 0 Z" fill="${K.steelHi}" ${OL(5)}/>
    <g transform="rotate(${hr} 0 -40)"><rect x="-90" y="-58" width="180" height="34" rx="16" fill="${K.steel}" ${OL(5)}/><circle cx="0" cy="-40" r="22" fill="${K.steelHi}" ${OL(4)}/></g>
  </g>`;
}
function stream(x, y0, y1, w, t) {
  if (w <= .5) return '';
  let wob = '';
  for (let i = 0; i < 4; i++) { const yy = y0 + ((t * 900 + i * 90) % (y1 - y0)); wob += `<ellipse cx="${x}" cy="${yy}" rx="${w * .35}" ry="10" fill="${K.waterHi}" opacity=".55"/>`; }
  return `<rect x="${x - w / 2}" y="${y0}" width="${w}" height="${y1 - y0}" rx="${w / 2}" fill="url(#kWat)" stroke="${K.waterSh}" stroke-width="3"/>${wob}`;
}
function lab(str, cx, cy, sz, p, col = '#FFFFFF', bg = K.ol) {
  if (p <= 0) return '';
  const w = str.length * sz * .62 + sz * .9, h = sz * 1.35;
  return `<g transform="translate(${cx} ${cy}) scale(${p}) rotate(${-3 * (1 - cl(p))})">
    <rect x="${-w / 2 + 10}" y="${-h / 2 + 12}" width="${w}" height="${h}" rx="12" fill="#000" opacity=".5"/>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="12" fill="${bg}" stroke="${col}" stroke-opacity=".25" stroke-width="4"/>
    ${TX(str, 0, sz * .36, sz, col, 'middle', 'letter-spacing="4"')}
  </g>`;
}
function rings(t, t0, x, y, col = K.amb, n = 3, r1 = 260) {
  let s = '';
  for (let k = 0; k < n; k++) { const p = prog(t, t0 + k * .09, t0 + .7 + k * .09); if (p > 0 && p < 1) s += `<circle cx="${x}" cy="${y}" r="${40 + p * r1}" fill="none" stroke="${col}" stroke-width="${10 * (1 - p)}" opacity="${.7 * (1 - p)}"/>`; }
  return s;
}
function breath(t, t0, x, y, dir = 1) {
  const p = prog(t, t0, t0 + 1.1); if (p <= 0 || p >= 1) return '';
  let s = ''; for (let i = 0; i < 3; i++) { const q = cl(p * 1.3 - i * .12); if (q <= 0) continue; s += `<circle cx="${x + dir * (30 + 120 * q + i * 30)}" cy="${y - 20 * q - i * 10}" r="${18 + 50 * q}" fill="#E6F0F6" opacity="${.45 * (1 - q)}"/>`; }
  return s;
}
// apartment backdrop (after the blackout): cold wall, moonlight from a window at left
function flatWall(o = {}) {
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
   <rect x="0" y="1180" width="1080" height="740" fill="${K.bg}"/>
   <polygon points="${o.wx || 0},300 ${(o.wx || 0) + 300},300 ${(o.wx || 0) + 760},1500 ${(o.wx || 0) + 120},1500" fill="${K.coldHi}" opacity=".07"/>`;
}
function kitchen(t, o = {}) {
  let tiles = '';
  for (let r = 0; r < 4; r++) for (let c = 0; c < 10; c++) tiles += `<rect x="${c * 110}" y="${880 + r * 80}" width="108" height="78" fill="${(r + c) % 2 ? K.tile : K.tileSh}"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg2}"/>
   <rect x="60" y="240" width="330" height="440" rx="8" fill="#0D1519" ${OL(8)}/>
   <rect x="78" y="258" width="294" height="404" fill="url(#kSky)"/>
   ${tower(96, 662, 120, 9, 4, { fh: 42, col: '#18232A', lw: 3 })}${tower(250, 662, 110, 7, 4, { fh: 46, col: '#18232A', lw: 3 })}
   <circle cx="320" cy="320" r="26" fill="${K.coldHi}" opacity=".8"/>
   <path d="M 225 258 V 662 M 78 460 H 372" stroke="#0D1519" stroke-width="12"/>
   <polygon points="78,662 372,662 820,1500 120,1500" fill="${K.coldHi}" opacity=".08"/>
   ${tiles}
   <rect x="460" y="200" width="560" height="260" rx="8" fill="${K.moss}" ${OL(6)}/><path d="M 740 200 V 460" stroke="${K.ol}" stroke-width="6"/>
   <circle cx="715" cy="420" r="9" fill="${K.steelHi}"/><circle cx="765" cy="420" r="9" fill="${K.steelHi}"/>
   <rect x="0" y="1200" width="1080" height="40" fill="${K.steelSh}" ${OL(6)}/>
   <rect x="0" y="1240" width="1080" height="680" fill="${K.moss}" ${OL(6)}/>
   <path d="M 360 1240 V 1920 M 720 1240 V 1920" stroke="${K.ol}" stroke-width="6"/>
   <path d="M 540 0 V 120" stroke="${K.ol}" stroke-width="6"/><path d="M 470 170 Q 540 90 610 170 Z" fill="${K.steelSh}" ${OL(5)}/><circle cx="540" cy="172" r="16" fill="#3A4A52" ${OL(4)}/>`;
}



// ================= Teil 2 additions (Ben, firefighters, lift, stairwell) =================
const B = {
  hood: '#8A939A', hoodSh: '#6B737A', hoodHi: '#A7AFB5', cap: '#3E6FB0', capSh: '#2C5288', jeans: '#3B4A6B', jeansSh: '#2C3852',
  pale: '#D9C6B6', paleSh: '#B8A292', bHair: '#5A3A22',
  ff: '#2A3550', ffSh: '#1C2540', stripe: '#E8D94A', helm: '#E9E4D0', helmSh: '#B9B39C', glove: '#2B2B2B',
  truck: '#D23A30', truckSh: '#9E2620', blue: '#4FA3FF', scarf: '#7A1F2B', scarfSh: '#561520', door: '#5A4030', doorSh: '#3E2C21',
};
const MYDEFS2 = `<defs>
<radialGradient id="kBlue" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#4FA3FF" stop-opacity=".8"/><stop offset="1" stop-color="#4FA3FF" stop-opacity="0"/></radialGradient>
<linearGradient id="kSliver" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#CFE3F0" stop-opacity=".55"/><stop offset="1" stop-color="#CFE3F0" stop-opacity="0"/></linearGradient>
<linearGradient id="kLamp" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF6DD" stop-opacity=".8"/><stop offset="1" stop-color="#FFF6DD" stop-opacity="0"/></linearGradient>
</defs>`;

// Ben (12): grey hoodie, blue cap worn backwards. origin = centre of shoulder line
function bHead(o = {}) {
  const sk = o.pale ? B.pale : K.skin, sh = o.pale ? B.paleSh : K.skinSh;
  return `<g transform="rotate(${o.tilt || 0})">
   <path d="M -104 70 Q -122 -70 0 -118 Q 122 -70 104 70 Q 80 124 0 126 Q -80 124 -104 70 Z" fill="${B.hoodSh}" ${OL(6)}/>
   <circle cx="-78" cy="14" r="17" fill="${sh}" ${OL(5)}/><circle cx="78" cy="14" r="17" fill="${sh}" ${OL(5)}/>
   <ellipse cx="0" cy="10" rx="76" ry="86" fill="${sk}" ${OL(6)}/>
   <path d="M -76 -6 Q -70 -40 -50 -46 L -40 -20 Q -60 -20 -76 -6 Z M 76 -6 Q 70 -40 50 -46 L 40 -20 Q 60 -20 76 -6 Z" fill="${B.bHair}"/>
   <path d="M -58 -92 Q 0 -150 58 -92 L 50 -78 Q 0 -122 -50 -78 Z" fill="${B.capSh}" ${OL(5)}/>
   <path d="M -80 -14 Q -84 -104 0 -106 Q 84 -104 80 -14 Q 40 -40 0 -40 Q -40 -40 -80 -14 Z" fill="${B.cap}" ${OL(6)}/>
   <path d="M -24 -38 Q 0 -66 24 -38 Z" fill="${B.bHair}" ${OL(4)}/>
   <path d="M -44 -84 Q 0 -98 44 -84" fill="none" stroke="#6F98D0" stroke-width="7" stroke-linecap="round"/>
   ${o.pale ? '' : `<ellipse cx="-48" cy="40" rx="14" ry="8" fill="#F08F86" opacity=".35"/><ellipse cx="48" cy="40" rx="14" ry="8" fill="#F08F86" opacity=".35"/>`}
   <path d="M -2 12 Q -8 28 4 30" fill="none" stroke="${sh}" stroke-width="6" stroke-linecap="round"/>
   ${eyesS(o)}${browsS(o.brow, B.bHair, -30)}
   ${mouthS(o.mouth || 'flat', o.talk || 0, 54)}
  </g>`;
}
function ben(x, y, s, o = {}) {
  const sit = o.sit || 0, bh = 360 - 70 * sit;
  const aL = o.aL || [8, 4], aR = o.aR || [8, 4];
  const L = arm(-96, 26, aL[0], aL[1], -1, 112, 104, B.hood, 50), R = arm(96, 26, aR[0], aR[1], 1, 112, 104, B.hood, 50);
  const sk = o.pale ? B.pale : K.skin;
  const hnd = p => `<circle cx="${p.hx.toFixed(1)}" cy="${p.hy.toFixed(1)}" r="21" fill="${sk}" ${OL(5)}/>`;
  const legs = sit > .5 ? '' : `<rect x="-88" y="${bh - 30}" width="78" height="250" rx="18" fill="${B.jeans}" ${OL(6)}/><rect x="10" y="${bh - 30}" width="78" height="250" rx="18" fill="${B.jeans}" ${OL(6)}/>
     <ellipse cx="-56" cy="${bh + 222}" rx="56" ry="24" fill="#E6E6E6" ${OL(5)}/><ellipse cx="56" cy="${bh + 222}" rx="56" ry="24" fill="#E6E6E6" ${OL(5)}/>`;
  const knees = sit > .5 ? `<path d="M -128 ${bh + 20} Q -140 ${bh - 150} -58 ${bh - 160} Q -4 ${bh - 160} -6 ${bh + 20} Z" fill="${B.jeans}" ${OL(6)}/><path d="M 128 ${bh + 20} Q 140 ${bh - 150} 58 ${bh - 160} Q 4 ${bh - 160} 6 ${bh + 20} Z" fill="${B.jeans}" ${OL(6)}/>
     <ellipse cx="-70" cy="${bh + 30}" rx="62" ry="26" fill="#E6E6E6" ${OL(5)}/><ellipse cx="70" cy="${bh + 30}" rx="62" ry="26" fill="#E6E6E6" ${OL(5)}/>` : '';
  return `<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s})">
    ${legs}
    <path d="M -112 36 Q -114 -6 -72 -16 L 72 -16 Q 114 -6 112 36 L 120 ${bh} L -120 ${bh} Z" fill="${B.hood}" ${OL(6)}/>
    <path d="M 56 -10 Q 114 -6 112 36 L 120 ${bh} L 80 ${bh} Z" fill="${B.hoodSh}"/>
    <path d="M -70 ${bh - 130} H 70 L 88 ${bh - 30} H -88 Z" fill="none" stroke="${B.hoodSh}" stroke-width="7" stroke-linejoin="round"/>
    <g transform="translate(${o.hdx || 0} ${-88 + (o.hdy || 0)})">${bHead(o)}</g>
    <path d="M -86 -26 Q 0 36 86 -26 L 92 6 Q 0 64 -92 6 Z" fill="${B.hoodHi}" ${OL(5)}/>
    <path d="M -24 20 V 96 M 24 20 V 96" stroke="#E6E6E6" stroke-width="6" stroke-linecap="round"/>
    ${knees}
    ${L.svg}${hnd(L)}${R.svg}${hnd(R)}
    ${o.front || ''}
  </g>`;
}
const bReach = (x, y, s, side, tx, ty, flip) => ik(side, side * 96, 26, (tx - x) / s, (ty - y) / s, 112, 104, flip);

// firefighter: navy jacket with yellow reflective stripes, light helmet with lamp
function ffighter(x, y, s, o = {}) {
  const aL = o.aL || [10, 6], aR = o.aR || [10, 6];
  const L = arm(-126, 34, aL[0], aL[1], -1, 150, 138, B.ff, 62), R = arm(126, 34, aR[0], aR[1], 1, 150, 138, B.ff, 62);
  const hnd = p => `<circle cx="${p.hx.toFixed(1)}" cy="${p.hy.toFixed(1)}" r="29" fill="${B.glove}" ${OL(5)}/>`;
  return `<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s})">
    <path d="M -150 44 Q -152 -8 -96 -20 L 96 -20 Q 152 -8 150 44 L 174 560 L -174 560 Z" fill="${B.ff}" ${OL(6)}/>
    <path d="M 70 -14 Q 150 -6 150 44 L 174 560 L 112 560 Z" fill="${B.ffSh}"/>
    <rect x="-162" y="300" width="324" height="30" fill="${B.stripe}" ${OL(4)}/><rect x="-168" y="350" width="336" height="16" fill="#C9CFD3"/>
    <path d="M 0 30 V 560" stroke="${B.ffSh}" stroke-width="7"/>
    <g transform="translate(0 -112)"><g transform="rotate(${o.tilt || 0})">
      <ellipse cx="0" cy="10" rx="80" ry="94" fill="${K.skin}" ${OL(6)}/>
      ${eyesS(o)}${browsS(o.brow, '#3A2A1E')}${mouthS(o.mouth || 'flat', o.talk || 0, 62)}
      <path d="M -102 -26 Q -108 -158 0 -160 Q 108 -158 102 -26 Z" fill="${B.helm}" ${OL(6)}/>
      <path d="M -60 -130 Q 0 -150 60 -130" fill="none" stroke="#FFFFFF" stroke-width="9" stroke-linecap="round"/>
      <ellipse cx="0" cy="-26" rx="124" ry="22" fill="${B.helmSh}" ${OL(5)}/>
      <rect x="-26" y="-96" width="52" height="34" rx="8" fill="#2B2B2B" ${OL(4)}/><circle cx="0" cy="-79" r="11" fill="#FFF6DD"/>
    </g></g>
    <path d="M -112 -34 Q 0 40 112 -34 L 120 4 Q 0 74 -120 4 Z" fill="${B.ffSh}" ${OL(5)}/>
    ${o.holdL ? o.holdL(L.hx, L.hy) : ''}${o.holdR ? o.holdR(R.hx, R.hy) : ''}
    ${L.svg}${hnd(L)}${R.svg}${hnd(R)}
  </g>`;
}
// headlamp on Jonas' beanie (body-local coords, pass as front:)
const jLamp = (on, hdx = 0, hdy = 0) => `<g transform="translate(${hdx} ${-170 + hdy})"><rect x="-34" y="-22" width="68" height="44" rx="10" fill="#2B2B2B" ${OL(4)}/><circle cx="0" cy="0" r="14" fill="${on ? '#FFF6DD' : '#4A4A4A'}" ${OL(3)}/>${on ? `<circle cx="0" cy="0" r="46" fill="url(#kAmb)"/>` : ''}</g>`;
// lamp beam cone in screen coords from (x,y) toward angle (deg, 0 = right)
function beam(x, y, ang, len = 1100, spread = 22, a = .5) {
  return `<g transform="translate(${x} ${y}) rotate(${ang})"><polygon points="0,-14 ${len},${-len * Math.tan(spread * Math.PI / 360)} ${len},${len * Math.tan(spread * Math.PI / 360)} 0,14" fill="url(#kLamp)" opacity="${a}"/></g>`;
}
// steel lift doors in a frame; gap = opening in px (doors slide apart, clipped to the frame)
function liftDoors(id, x0, y0, w, h, gap = 0, dj = 0, inside = '#05080A') {
  const half = w / 2;
  return `<rect x="${x0 - 22}" y="${y0 - 44}" width="${w + 44}" height="${h + 44}" fill="#222B30" ${OL(6)}/>
   <rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="${inside}"/>
   <clipPath id="${id}"><rect x="${x0}" y="${y0}" width="${w}" height="${h}"/></clipPath>
   <g clip-path="url(#${id})" transform="translate(${dj} 0)">
    <rect x="${x0 - gap / 2}" y="${y0}" width="${half}" height="${h}" fill="${K.steel}" ${OL(5)}/>
    <rect x="${x0 + half + gap / 2}" y="${y0}" width="${half}" height="${h}" fill="${K.steel}" ${OL(5)}/>
    <path d="M ${x0 + 22 - gap / 2} ${y0 + 20} V ${y0 + h - 20} M ${x0 + w - 22 + gap / 2} ${y0 + 20} V ${y0 + h - 20}" stroke="${K.steelHi}" stroke-width="10" opacity=".6"/>
   </g>
   <circle cx="${x0 + half}" cy="${y0 - 22}" r="9" fill="${K.ol}"/>`;
}
function stairBg(o = {}) {
  return `<rect x="0" y="0" width="1080" height="1920" fill="#1A2227"/>
   <rect x="0" y="0" width="1080" height="${o.dado || 760}" fill="#1E282E"/>
   <rect x="0" y="1240" width="1080" height="680" fill="#11171B"/><path d="M 0 1240 H 1080" stroke="${K.ol}" stroke-width="6"/>`;
}
// inside the stuck cabin: back wall, side walls, ceiling vent; light sliver from the door gap above
function cabin(t, o = {}) {
  const lit = o.lit ?? 1;
  let sl = ''; for (let i = 0; i < 5; i++) sl += `<path d="M ${492 + i * 24} 262 V 298" stroke="${K.ol}" stroke-width="7"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#0C1215"/>
   <polygon points="80,160 1000,160 870,330 210,330" fill="#161F24" ${OL(5)}/>
   <rect x="470" y="250" width="140" height="60" rx="6" fill="#0B0F12" ${OL(4)}/>${sl}
   <rect x="210" y="330" width="660" height="930" fill="#1B252B" ${OL(5)}/>
   <polygon points="80,160 210,330 210,1260 80,1440" fill="#151D22" ${OL(5)}/><polygon points="1000,160 870,330 870,1260 1000,1440" fill="#151D22" ${OL(5)}/>
   <polygon points="210,1260 870,1260 1000,1440 80,1440" fill="#11181C" ${OL(5)}/>
   <path d="M 210 800 H 870" stroke="${K.steelSh}" stroke-width="16"/><path d="M 210 800 H 870" stroke="${K.steel}" stroke-width="7"/>
   <rect x="${o.px ?? 740}" y="560" width="90" height="230" rx="10" fill="#2B3439" ${OL(4)}/>
   ${[0, 1, 2, 3].map(i => `<circle cx="${(o.px ?? 740) + 45}" cy="${600 + i * 38}" r="12" fill="#3A464E" ${OL(3)}/>`).join('')}
   <circle cx="${(o.px ?? 740) + 45}" cy="${752}" r="18" fill="#8A7A30" ${OL(3)}/>
   <polygon points="300,160 780,160 1000,1440 80,1440" fill="url(#kSliver)" opacity="${.35 * lit}"/>
   <rect x="300" y="150" width="480" height="12" fill="#CFE3F0" opacity="${.7 * lit}"/>`;
}
// building cut-away: shaft between floor slabs; cabin at cy with content inside
function shaftCut(t, cy, inner = '', o = {}) {
  const fl = o.fl || [430, 1080];
  let floors = '';
  fl.forEach(y => { floors += `<rect x="0" y="${y}" width="1080" height="44" fill="${K.conc}" ${OL(5)}/>`; });
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   ${o.rooms === false ? '' : `<rect x="0" y="0" width="300" height="1420" fill="#172026"/><rect x="780" y="0" width="300" height="1420" fill="#172026"/>`}
   <rect x="300" y="0" width="480" height="1420" fill="#0B1014"/>
   <path d="M 400 0 V 1420 M 680 0 V 1420" stroke="#3A464E" stroke-width="8"/>
   <path d="M 528 0 V ${cy - 330} M 552 0 V ${cy - 330}" stroke="#4A5A64" stroke-width="5"/>
   <g transform="translate(0 ${cy})"><rect x="330" y="-320" width="420" height="640" fill="${K.steelSh}" ${OL(6)}/><rect x="350" y="-300" width="380" height="600" fill="#1A2227"/>
    <rect x="510" y="-360" width="60" height="44" fill="#3A464E" ${OL(4)}/>${inner}</g>
   ${floors}
   <rect x="300" y="${fl[0]}" width="480" height="44" fill="none"/>
   ${o.labels || ''}`;
}
function thermo(x, y, s, v, o = {}) { // v = degrees shown, scale 0..30 °C
  const h = 440 * cl(v / 30);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-70" y="-560" width="140" height="640" rx="40" fill="#E6EDF1" ${OL(6)}/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M 26 ${-30 - i * 440 / 6} H 50" stroke="#6B7B84" stroke-width="5"/>`).join('')}
    <rect x="-16" y="-500" width="32" height="480" rx="16" fill="#C9D2D8" ${OL(4)}/>
    <rect x="-10" y="${-30 - h}" width="20" height="${h + 10}" fill="${K.red}"/>
    <circle cx="0" cy="0" r="38" fill="${K.red}" ${OL(5)}/>
  </g>`;
}
function timer(cx, cy, r, frac, col = K.amb) {
  const f = cl(frac, 0, .999), a = -Math.PI / 2 + f * 2 * Math.PI, rr = r * .9;
  const x = cx + rr * Math.cos(a), y = cy + rr * Math.sin(a);
  let tk = ''; for (let i = 0; i < 12; i++) { const b = i / 12 * 2 * Math.PI; tk += `<path d="M ${cx + r * .78 * Math.sin(b)} ${cy - r * .78 * Math.cos(b)} L ${cx + r * .9 * Math.sin(b)} ${cy - r * .9 * Math.cos(b)}" stroke="#E6EDF1" stroke-width="8" stroke-linecap="round"/>`; }
  return `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#0E1418" ${OL(8)}/>
   ${f > .005 ? `<path d="M ${cx} ${cy} L ${cx} ${cy - rr} A ${rr} ${rr} 0 ${f > .5 ? 1 : 0} 1 ${x.toFixed(1)} ${y.toFixed(1)} Z" fill="${col}" opacity=".55"/>` : ''}
   ${tk}<path d="M ${cx} ${cy} L ${x.toFixed(1)} ${y.toFixed(1)}" stroke="#FFFFFF" stroke-width="14" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="18" fill="#FFFFFF" ${OL(4)}/>`;
}
function screwdriver(x, y, s, rot) { // handle at origin, tip pointing up (local −y)
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="-7" y="-210" width="14" height="150" fill="${K.steelHi}" ${OL(4)}/><path d="M -7 -210 L 0 -232 L 7 -210 Z" fill="${K.steelHi}" ${OL(3)}/>
    <rect x="-24" y="-70" width="48" height="110" rx="16" fill="#F2C230" ${OL(5)}/><path d="M -10 -56 V 26 M 10 -56 V 26" stroke="#C99A1E" stroke-width="6"/>
  </g>`;
}
const ITint = a => `<rect x="0" y="0" width="1080" height="1920" fill="#5E7F93" opacity="${a}" style="mix-blend-mode:multiply"/><rect x="26" y="26" width="1028" height="1868" rx="40" fill="none" stroke="#9DB8C8" stroke-width="10" stroke-dasharray="40 26" opacity=".7"/>`;
function knockRings(t, ks, x, y, col = '#fff', r1 = 240) { return ks.map(k => rings(t, k, x, y, col, 2, r1)).join(''); }
function knockJit(t, ks, a = 6) { let d = 0; ks.forEach(k => d += a * ring(t, k, 11, 9)); return d; }

// ================= shots =================
function t01(t) { // HOOK: torch-lit lift doors shudder with knocks from below
  const ks = [0.05, 0.3, 0.7, 1.06];
  const dj = knockJit(t, ks, 9), [sx, sy] = shk(t, .3, 10, 6), push = 1 + .06 * prog(t, 0, 1.6);
  let dust = '';
  ks.forEach((k, i) => { if (t > k) for (let j = 0; j < 6; j++) { const dt = t - k, p = prog(dt, 0, .9); if (p < 1) dust += `<circle cx="${250 + j * 110 + i * 14}" cy="${240 + 320 * dt * dt + (j % 3) * 30}" r="5" fill="#E6EDF1" opacity="${1 - p}"/>`; } });
  return `<g transform="translate(${540 + sx} ${900 + sy}) scale(${push}) translate(-540 -900)">
   ${stairBg()}
   ${liftDoors('t01c', 170, 250, 740, 990, 0, dj)}
   <ellipse cx="540" cy="760" rx="520" ry="620" fill="url(#kAmb)" opacity=".9"/>
   ${dust}${knockRings(t, ks, 540, 1220, '#FFF1CF', 360)}
   <g transform="translate(540 1240)">${[0, 1, 2].map(i => { const p = (t * 1.6 + i / 3) % 1; return `<path d="M ${-60 - 30 * p} ${20 + 90 * p} L 0 ${70 + 90 * p} L ${60 + 30 * p} ${20 + 90 * p}" fill="none" stroke="#FFB547" stroke-width="12" stroke-linecap="round" opacity="${1 - p}"/>`; }).join('')}</g>
   </g>
   ${FG(1460)}
   <g transform="translate(190 1200) scale(1.5)">${jBackHead(.15)}</g>
   ${phone(380, 1090, 1.3, 20, { on: 1 })}`;
}
function t02(t) { // camera sinks: cut-away, the cabin hangs between two floors, someone knocks inside
  const d = eio(prog(t, 1.45, 2.2)) * 420;
  const ks = [1.6, 1.9, 2.3, 2.62];
  const jx = knockJit(t, ks, 5), arm = ks.some(k => t > k - .1 && t < k + .05) ? -22 : 0;
  const glow = .5 + .5 * Math.max(0, Math.sin((t - 2.12) * 6)) * (t > 2.12 ? 1 : 0);
  const inner = `<g transform="translate(${jx} 0)"><ellipse cx="210" cy="20" rx="240" ry="280" fill="url(#kCold)" opacity=".5"/>
     <circle cx="190" cy="-30" r="56" fill="#0B0F12"/><path d="M 120 300 L 130 40 Q 190 0 250 40 L 260 300 Z" fill="#0B0F12"/>
     <path d="M 240 60 L ${330 + arm} -20" stroke="#0B0F12" stroke-width="34" stroke-linecap="round"/><circle cx="${340 + arm}" cy="-28" r="22" fill="#0B0F12"/></g>`;
  return `<g transform="translate(0 ${-d + 420})">${shaftCut(t, 760, `<g transform="translate(350 0)">${inner}</g>`, { fl: [380, 1100] })}
    <rect x="0" y="380" width="1080" height="44" fill="${K.amb}" opacity="${.35 * glow}"/><rect x="0" y="1100" width="1080" height="44" fill="${K.amb}" opacity="${.35 * glow}"/></g>
   ${knockRings(t, ks, 700, 760 - d + 420, '#FFF1CF', 200)}
   ${FG(1420)}`;
}
function t03(t) { // Jonas walks to the lift and leans in
  const w = eout(prog(t, 2.9, 3.35)), lean = eio(prog(t, 3.3, 3.8));
  const x = lerp(-120, 360, w) + 60 * lean;
  const ks = [3.5, 4.0];
  return `${stairBg()}
   ${liftDoors('t03c', 560, 420, 440, 830, 0, knockJit(t, ks, 5))}
   ${jonas(x, 980, 1.08, { lean: 14 * lean, hdx: 24 * lean, tilt: 16 * lean, look: 14, lookY: 4, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .4),
      aR: lean > .1 ? jReach(x, 980, 1.08, 1, 610, 1000 - 40 * lean, -1) : [lerp(30, 10, w), 6], aL: [lerp(-20, 10, w), 6], holdL: (hx, hy) => phone(hx, hy - 40, .8, -8, { on: 1 }) })}
   ${knockRings(t, ks, 780, 1230, '#FFF1CF', 200)}
   ${FG()}`;
}
function t04(t) { // close: ear to the steel, every knock shakes through
  const ks = [4.5, 4.9, 5.3, 5.7];
  const jt = knockJit(t, ks, 4), eye = ks.reduce((a, k) => a + Math.max(0, ring(t, k, 3, 6)), 0);
  return `${stairBg({ dado: 2000 })}
   <rect x="640" y="0" width="460" height="1400" fill="${K.steel}" ${OL(6)}/><path d="M 680 0 V 1400" stroke="${K.steelHi}" stroke-width="12" opacity=".6"/>
   <rect x="634" y="0" width="12" height="1400" fill="#05080A"/>
   <ellipse cx="560" cy="760" rx="460" ry="520" fill="url(#kAmb)" opacity=".45"/>
   ${jonas(450 + jt, 1180, 1.7, { lean: 8, tilt: 18, hdx: 30, look: -12, lookY: 6, eyeS: 1 + .25 * cl(eye), brow: 'worry', mouth: t > 5.0 ? 'o' : 'flat', blink: blinkAt(t, 1.4), aR: jReach(450 + jt, 1180, 1.7, 1, 700, 1060, -1), noArmL: true })}
   ${knockRings(t, ks, 720, 1180, '#FFF1CF', 260)}
   ${FG(1420)}`;
}
function t05(t) { // "Hallo? Ist da jemand?" — hands cupped at the door gap
  const up = eout(prog(t, 6.06, 6.3));
  const x = 470, y = 1050, s = 1.25;
  const tk = talkAt(t, 6.1, 6.5) + talkAt(t, 6.72, 7.3);
  return `${stairBg()}
   ${liftDoors('t05c', 640, 380, 520, 900)}
   <ellipse cx="560" cy="800" rx="360" ry="420" fill="url(#kAmb)" opacity=".4"/>
   ${jonas(x, y, s, { tilt: 10, hdx: 16, look: 14, lookY: 6, brow: 'up', mouth: 'o', talk: tk, blink: blinkAt(t, .9),
      aR: up > 0 ? jReach(x, y, s, 1, 660, 1000 - 40 * up, -1) : [10, 6], aL: [lerp(10, 30, up), lerp(6, -70, up)] })}
   ${rings(t, 6.15, 700, 940, '#FFFFFF', 2, 180)}${rings(t, 6.8, 700, 940, '#FFFFFF', 2, 180)}
   ${FG()}`;
}
function t06(t) { // inside the cabin: a small figure lifts its head
  const lift = eout(prog(t, 7.7, 8.1));
  return `${cabin(t, { lit: .7 })}
   ${ben(470, 900, .95, { sit: 1, tilt: lerp(18, -6, lift), hdy: lerp(26, 0, lift), look: 6, lookY: lerp(10, -12, lift), brow: 'worry', mouth: 'small', talk: talkAt(t, 8.54, 9.2) * .6, blink: blinkAt(t, .3),
      aL: [lerp(-30, 10, lift), lerp(-120, -20, lift)], aR: [lerp(-30, 10, lift), lerp(-120, -20, lift)] })}
   ${rings(t, 8.6, 470, 760, '#CFE3F0', 1, 120)}
   ${FG(1420)}`;
}
function t07(t) { // Ben close: "Ich bin Ben. Aus dem Neunten."
  const pt = eout(prog(t, 10.2, 10.45));
  return `${cabin(t, { lit: .8, px: 900 })}
   <ellipse cx="540" cy="800" rx="420" ry="460" fill="url(#kCold)" opacity=".45"/>
   ${ben(540, 1080, 1.6, { tilt: -4, look: 0, lookY: -10, brow: 'worry', mouth: 'small', talk: talkAt(t, 9.38, 11.1) * .7, blink: blinkAt(t, 1.1),
      aR: [lerp(10, 30, pt), lerp(4, 150, pt)], aL: [8, 4] })}
   ${FG(1420)}`;
}
function t08(t) { // Ben (12) slides down into the corner, hugs his knees
  const sd = eio(prog(t, 11.4, 12.2));
  return `${cabin(t, { lit: .6 })}
   ${ben(380, lerp(820, 900, sd), 1.0, { sit: sd > .5 ? 1 : 0, look: 8, lookY: 6, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .5), tilt: 6 * sd,
      aL: sd > .5 ? [-20, -100] : [8, 4], aR: sd > .5 ? [-20, -100] : [8, 4] })}
   ${FG(1420)}`;
}
function t09(t) { // half an hour in the dark: clock sweeps half a circle
  const f = .5 * eio(prog(t, 13.08, 13.9)), dk = prog(t, 13.9, 14.4);
  return `${cabin(t, { lit: .6 - .45 * dk })}
   ${ben(380, 900, 1.0, { sit: 1, look: 8, lookY: 8, brow: 'worry', mouth: 'flat', blink: blinkAt(t, 1.6), aL: [-20, -100], aR: [-20, -100] })}
   <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity="${.45 * dk}"/>
   ${timer(720, 520, 190 * back(prog(t, 13.08, 13.35)), f)}
   ${FG(1420)}`;
}
function t10(t) { // Ben presses the emergency bell: nothing
  const ps = [15.0, 15.45, 15.9];
  const press = ps.reduce((a, k) => a + (t > k - .12 && t < k + .1 ? 1 : 0), 0);
  const bx = 780, by = 760, x = 360, y = 820, s = 1.05;
  const reach = eout(prog(t, 14.78, 15.0));
  return `${cabin(t, { lit: .6, px: 2000 })}
   <rect x="690" y="540" width="180" height="420" rx="14" fill="#2B3439" ${OL(5)}/>
   ${[0, 1, 2, 3, 4].map(i => `<circle cx="780" cy="${590 + i * 34}" r="11" fill="#3A464E" ${OL(3)}/>`).join('')}
   <circle cx="${bx}" cy="${by + 60}" r="${44 - 6 * press}" fill="#8A7A30" ${OL(5)}/>
   <path d="M ${bx - 16} ${by + 72} Q ${bx - 16} ${by + 40} ${bx} ${by + 40} Q ${bx + 16} ${by + 40} ${bx + 16} ${by + 72} Z" fill="#3A3010"/>
   ${ben(x, y, s, { look: 14, lookY: 4, brow: 'worry', mouth: press ? 'worried' : 'flat', blink: blinkAt(t, .7),
      aR: bReach(x, y, s, 1, bx - 8 + 10 * press, by + 60, 1).map((v, i) => i === 0 ? lerp(8, v, reach) : lerp(4, v, reach)) })}
   ${FG(1420)}`;
}
function t11(t) { // panel close: speaker stays silent, power symbol struck through
  const sl = eout(prog(t, 17.3, 17.55));
  let grill = ''; for (let r = 0; r < 5; r++) for (let c = 0; c < 5; c++) grill += `<circle cx="${430 + c * 55}" cy="${470 + r * 55}" r="12" fill="#0B0F12"/>`;
  const fl = t > 16.56 ? 0 : 1;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#10161A"/>
   <rect x="250" y="300" width="580" height="1060" rx="40" fill="#2B3439" ${OL(8)}/>
   <rect x="360" y="400" width="360" height="360" rx="30" fill="#1C2328" ${OL(5)}/>${grill}
   ${[0, 1, 2].map(i => `<path d="M ${740 + i * 40} ${520 - i * 20} Q ${780 + i * 50} 580 ${740 + i * 40} ${640 + i * 20}" fill="none" stroke="#6B7B84" stroke-width="10" stroke-dasharray="14 18" opacity="${fl * (.8 - i * .2)}"/>`).join('')}
   <circle cx="540" cy="1000" r="110" fill="#8A7A30" ${OL(6)}/>
   <path d="M 500 1050 Q 500 960 540 960 Q 580 960 580 1050 Z M 488 1050 H 592" fill="#3A3010" stroke="#3A3010" stroke-width="8"/>
   <g transform="translate(540 1220)"><path d="M 10 -70 L -40 10 L 0 10 L -16 70 L 40 -16 L 2 -16 Z" fill="#6B7B84" ${OL(5)}/>
    ${sl > 0 ? `<line x1="-70" y1="-70" x2="${-70 + 140 * sl}" y2="${-70 + 140 * sl}" stroke="${K.red}" stroke-width="18" stroke-linecap="round"/>` : ''}</g>
   ${FG(1420)}`;
}
function t12(t) { // Jonas dials 1-1-2
  const taps = [19.24, 19.48, 19.72];
  const n = taps.filter(k => t >= k).length, lastK = taps.filter(k => t >= k).pop() || 0;
  const tapKey = [0, 0, 1][Math.max(0, n - 1)];
  const keys = [[-130, -40], [0, -40], [130, -40], [-130, 80], [0, 80], [130, 80], [-130, 200], [0, 200], [130, 200]];
  const kk = keys.map(([kx, ky], i) => `<circle cx="${kx}" cy="${ky}" r="50" fill="${n && i === tapKey && t - lastK < .18 ? '#FFFFFF' : '#3E5A6A'}" opacity=".9"/>${TX(String(i + 1), kx, ky + 16, 46, '#E6EDF1')}`).join('');
  const tk = keys[tapKey], fx = 540 + (n ? tk[0] : 130) * .9, fy = 860 + (n ? tk[1] : 300) * .9 + (n && t - lastK < .15 ? 0 : 30);
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   <ellipse cx="540" cy="850" rx="600" ry="640" fill="url(#kCold)" opacity=".6"/>
   ${jonas(980, 1700, 2.0, { back: true, u: .3, noArmL: true, noArmR: true })}
   <g transform="translate(540 ${860 - 40 * eout(prog(t, 17.92, 18.3))}) rotate(-3)">
    <rect x="-250" y="-460" width="500" height="920" rx="60" fill="#1A2126" ${OL(8)}/><rect x="-220" y="-420" width="440" height="840" rx="30" fill="#2E4654"/>
    ${TX('112'.slice(0, n), 0, -230, 130, '#FFFFFF', 'middle', 'letter-spacing="10"')}
    <g transform="scale(.9)">${kk}</g>
   </g>
   ${armTo(980 - 126 * 2, 1700 + 34 * 2, fx + 30, fy + 90, 110, -1)}<ellipse cx="${fx}" cy="${fy}" rx="30" ry="56" fill="${K.skin}" ${OL(6)} transform="rotate(-30 ${fx} ${fy})"/>
   ${taps.map(k => rings(t, k, 540, 400, '#FFFFFF', 1, 120)).join('')}
   ${FG(1420)}`;
}
function t13(t) { // phone at the ear: no dial tone, the line stays flat
  const x = 540, y = 1100, s = 1.4;
  let wave = ''; for (let i = 0; i < 24; i++) wave += `${i ? 'L' : 'M'} ${180 + i * 30} ${380 + (t < 20.3 ? 30 * Math.sin(i + t * 20) * (1 - prog(t, 19.98, 20.3)) : 0)} `;
  return `${stairBg()}
   <ellipse cx="540" cy="760" rx="440" ry="480" fill="url(#kCold)" opacity=".4"/>
   ${jonas(x, y, s, { look: -10, lookY: -4, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .2), tilt: -6, aR: jReach(x, y, s, 1, x + 140, y - 230, 1), holdR: (hx, hy) => phone(hx - 10, hy - 30, .9, 20, { on: 1 }) })}
   <path d="${wave}" fill="none" stroke="#9DB8C8" stroke-width="10" stroke-linecap="round" opacity=".85"/>
   ${FG()}`;
}
function t14(t) { // screen: no bars, 112 ✗
  const p = back(prog(t, 22.08, 22.35));
  let bars = ''; for (let i = 0; i < 4; i++) bars += `<rect x="${-120 + i * 70}" y="${-40 - i * 50}" width="46" height="${80 + i * 50}" rx="8" fill="#5C6A72" opacity=".5"/>`;
  const shake = t > 21.2 && t < 21.9 ? 10 * Math.sin(t * 40) : 0;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${K.bg}"/>
   <ellipse cx="540" cy="850" rx="600" ry="640" fill="url(#kCold)" opacity=".5"/>
   <g transform="translate(${540 + shake} 860) rotate(${-4 + shake * .3})">
    <rect x="-250" y="-460" width="500" height="920" rx="60" fill="#1A2126" ${OL(8)}/><rect x="-220" y="-420" width="440" height="840" rx="30" fill="#2E4654"/>
    <g transform="translate(0 0)">${bars}</g>
    <line x1="-150" y1="-240" x2="${-150 + 300 * eout(prog(t, 21.3, 21.6))}" y2="${-240 + 300 * eout(prog(t, 21.3, 21.6))}" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/>
   </g>
   ${lab('112 ✗', 540, 330, 140, p, '#FFFFFF')}
   ${FG(1420)}`;
}
function t15(t) { // he pulls a screwdriver from the parka pocket
  const x = 540, y = 1060, s = 1.25;
  const dig = eio(prog(t, 23.1, 23.45)), lift = eout(prog(t, 23.6, 24.1));
  const tgt = [lerp(x + 120 * s, x + 160, lift), lerp(y + 380 * s, y - 120, lift)];
  return `${stairBg()}
   ${liftDoors('t15c', 760, 420, 380, 830)}
   <ellipse cx="540" cy="800" rx="380" ry="460" fill="url(#kAmb)" opacity=".35"/>
   ${jonas(x, y, s, { look: 6, lookY: lift > .5 ? -6 : 10, brow: lift > .5 ? 'angry' : 'worry', mouth: 'flat', blink: blinkAt(t, .8),
      aR: dig > 0 ? jReach(x, y, s, 1, tgt[0], tgt[1], 1) : [10, 6], holdR: lift > .3 ? (hx, hy) => screwdriver(hx, hy, 1.1, 10) : null })}
   ${lift > .8 ? `<path d="M ${x + 160 + 30} ${y - 380} l 20 -40 l 20 40 l -20 40 Z" fill="#FFFFFF" opacity="${1 - prog(t, 24.1, 24.6)}"/>` : ''}
   ${FG()}`;
}
function t16(t) { // close: the tip goes into the gap between the doors
  const p = eio(prog(t, 24.74, 25.28)), pry = eout(prog(t, 25.3, 25.9));
  const gap = 4 + 14 * pry;
  const tipX = 540, tipY = 760, hx = lerp(820, 600, p), hy = lerp(1160, 1010, p);
  return `<rect x="0" y="0" width="1080" height="1920" fill="#1A2227"/>
   <rect x="0" y="0" width="${540 - gap / 2}" height="1400" fill="${K.steel}" ${OL(6)}/><rect x="${540 + gap / 2}" y="0" width="${540 - gap / 2}" height="1400" fill="${K.steel}" ${OL(6)}/>
   <path d="M 120 0 V 1400 M 960 0 V 1400" stroke="${K.steelHi}" stroke-width="14" opacity=".5"/>
   <ellipse cx="560" cy="820" rx="440" ry="520" fill="url(#kAmb)" opacity=".5"/>
   ${screwdriver(hx, hy, 1.6, -30 + 2 * Math.sin(t * 30) * pry)}
   ${armTo(1080, 1500, hx + 30, hy + 70, 120, 1)}
   ${t > 25.3 ? rings(t, 25.3, tipX, tipY, '#FFFFFF', 2, 160) : ''}
   ${FG(1420)}`;
}
function t17(t) { // he freezes
  const frz = eout(prog(t, 26.6, 26.85)), up = eio(prog(t, 27.1, 27.5));
  const x = 520, y = 1240, s = 1.75;
  return `${stairBg({ dado: 2000 })}
   <ellipse cx="540" cy="760" rx="460" ry="500" fill="url(#kAmb)" opacity=".4"/>
   ${jonas(x, y, s, { look: lerp(-8, 6, up), lookY: lerp(6, -14, up), eyeS: 1 + .3 * frz, brow: frz > .5 ? 'up' : 'angry', mouth: frz > .5 ? 'o' : 'flat', tilt: -4 * frz,
      aR: [40, -120], holdR: (hx, hy) => screwdriver(hx, hy, .9, 30 - 30 * frz) })}
   <rect x="0" y="0" width="1080" height="1920" fill="#5E7F93" opacity="${.18 * up}"/>
   ${FG(1420)}`;
}
function t18(t) { // what if: the power comes back — windows flash on
  const on = t < 28.12 ? 0 : (t < 28.2 ? .6 : (t < 28.28 ? .2 : 1));
  const [sx, sy] = shk(t, 28.12, 12, 6), bolt = back(prog(t, 28.1, 28.35));
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   <g transform="translate(${sx} ${sy})">
    ${tower(140, 1340, 800, 16, 8, { fh: 72, seed: 1, lit: on })}
    <rect x="-40" y="1330" width="1160" height="600" fill="#C9D6DE"/>
   </g>
   ${bolt > 0 ? `<g transform="translate(540 300) scale(${bolt})"><path d="M 30 -150 L -90 30 L 0 30 L -40 170 L 100 -30 L 10 -30 Z" fill="${K.amb}" ${OL(8)}/></g>` : ''}
   ${snow(t, 30, 9)}${ITint(.25)}${FG(1420)}`;
}
function t19(t) { // what if: the motor spins up, the cabin jerks into motion
  const go = t > 30.24 ? eio(prog(t, 30.24, 31.6)) : 0, jerk = 10 * ring(t, 30.24, 6, 5);
  const cy = 820 - 300 * go + jerk;
  const ang = go * 900 + (t > 30.24 ? (t - 30.24) * 200 : 0);
  const motor = `<g transform="translate(540 120)"><circle cx="0" cy="0" r="90" fill="${K.steel}" ${OL(6)}/><g transform="rotate(${ang})"><path d="M -80 0 H 80 M 0 -80 V 80" stroke="${K.ol}" stroke-width="12"/></g><circle cx="0" cy="0" r="20" fill="${K.steelHi}" ${OL(4)}/></g>`;
  const inner = `<ellipse cx="0" cy="0" rx="220" ry="260" fill="url(#kRed)" opacity="${.4 + .3 * go}"/>${ben(0, -60, .62, { sit: 1, look: 0, lookY: -12, eyeS: 1.2, brow: 'up', mouth: 'o' })}`;
  return `${shaftCut(t, cy, `<g transform="translate(540 0)">${inner}</g>`, { fl: [520, 1180] })}
   ${motor}
   ${t > 30.24 && t < 30.4 ? `<rect width="1080" height="1920" fill="${K.red}" opacity=".25"/>` : ''}
   ${ITint(.2)}${FG(1420)}`;
}
function t20(t) { // what if: Ben climbs out through the opened doors
  const cl1 = eio(prog(t, 32.1, 33.2));
  const x = 540, y = lerp(1060, 900, cl1);
  return `${stairBg()}
   <rect x="250" y="420" width="580" height="820" fill="#05080A" ${OL(6)}/>
   <rect x="170" y="420" width="90" height="820" fill="${K.steel}" ${OL(5)}/><rect x="820" y="420" width="90" height="820" fill="${K.steel}" ${OL(5)}/>
   <clipPath id="t20c"><rect x="250" y="0" width="580" height="1240"/></clipPath>
   <g clip-path="url(#t20c)">
    <rect x="270" y="1040" width="540" height="400" fill="${K.steelSh}" ${OL(6)}/><rect x="290" y="1060" width="500" height="380" fill="#1A2227"/>
    ${ben(x, y, 1.0, { look: 0, lookY: -10, brow: 'worry', mouth: 'worried', aL: bReach(x, y, 1, -1, 330, 1236, -1), aR: bReach(x, y, 1, 1, 750, 1236, 1) })}
   </g>
   <rect x="250" y="1236" width="580" height="20" fill="#2B3943" ${OL(4)}/>
   <ellipse cx="540" cy="900" rx="360" ry="400" fill="url(#kAmb)" opacity=".3"/>
   ${ITint(.22)}${FG()}`;
}
function t21(t) { // what if: the cabin moves exactly then — red flash, ✗
  const mv = t > 33.96 ? eio(prog(t, 33.96, 34.4)) : 0, fl = t > 33.96 ? Math.exp(-(t - 33.96) * 3) : 0;
  const [sx, sy] = shk(t, 33.96, 22, 5), x = 540, y = 900 - 160 * mv;
  const xs = back(prog(t, 34.3, 34.6));
  return `<g transform="translate(${sx} ${sy})">${stairBg()}
   <rect x="250" y="420" width="580" height="820" fill="#05080A" ${OL(6)}/>
   <rect x="170" y="420" width="90" height="820" fill="${K.steel}" ${OL(5)}/><rect x="820" y="420" width="90" height="820" fill="${K.steel}" ${OL(5)}/>
   <clipPath id="t21c"><rect x="250" y="0" width="580" height="1240"/></clipPath>
   <g clip-path="url(#t21c)">
    <rect x="270" y="${1040 - 160 * mv}" width="540" height="400" fill="${K.steelSh}" ${OL(6)}/><rect x="290" y="${1060 - 160 * mv}" width="500" height="380" fill="#1A2227"/>
    ${ben(x, y, 1.0, { look: 0, lookY: -12, eyeS: 1.3, brow: 'up', mouth: 'o', aL: [150, 10], aR: [150, 10] })}
   </g>
   <rect x="250" y="1236" width="580" height="20" fill="#2B3943" ${OL(4)}/></g>
   <rect width="1080" height="1920" fill="${K.red}" opacity="${.55 * fl}"/>
   ${xs > 0 ? `<g transform="translate(540 760) scale(${xs}) rotate(${-8 * (1 - cl(xs))})"><path d="M -200 -200 L 200 200 M 200 -200 L -200 200" stroke="${K.ol}" stroke-width="90" stroke-linecap="round"/><path d="M -200 -200 L 200 200 M 200 -200 L -200 200" stroke="${K.red}" stroke-width="60" stroke-linecap="round"/></g>` : ''}
   ${ITint(.2)}${FG()}`;
}
function t22(t) { // reality: screwdriver back into the pocket, door stays shut
  const x = 470, y = 1060, s = 1.25;
  const down = eio(prog(t, 35.5, 36.0)), flat = eout(prog(t, 36.1, 36.4));
  return `${stairBg()}
   ${liftDoors('t22c', 640, 420, 440, 830)}
   <ellipse cx="560" cy="800" rx="380" ry="460" fill="url(#kAmb)" opacity=".35"/>
   ${jonas(x, y, s, { look: 12, lookY: 4, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .6), tilt: 4,
      aL: down < 1 ? jReach(x, y, s, -1, lerp(x - 40, x - 150, down), lerp(y - 80, y + 470, down), -1) : [10, 6],
      holdL: down < .9 ? (hx, hy) => screwdriver(hx, hy, 1.1, -10) : null,
      aR: flat > 0 ? jReach(x, y, s, 1, 690, 980 - 40 * flat, -1) : [10, 6] })}
   ${rings(t, 36.34, 700, 760, '#FFF1CF', 2, 160)}
   ${FG()}`;
}
function t23(t) { // Jonas sits down with his back to the lift and talks
  const sd = eio(prog(t, 37.04, 37.6));
  const x = 560, y = lerp(980, 1260, sd), s = 1.2;
  return `${stairBg()}
   ${liftDoors('t23c', 300, 300, 480, 940)}
   <ellipse cx="540" cy="900" rx="420" ry="460" fill="url(#kAmb)" opacity=".4"/>
   ${jonas(x, y, s, { tilt: -10 * sd, hdx: -16 * sd, look: -10, lookY: -6, brow: 'calm', mouth: 'flat', talk: talkAt(t, 37.7, 38.8) * .7, blink: blinkAt(t, .1), aL: [20, -40], aR: [20, -40] })}
   ${FG(1360)}`;
}
function t24(t) { // calm and slow: hand moves down slowly, slow breath
  const x = 520, y = 1240, s = 1.7, hand = .5 + .5 * Math.sin((t - 38.88) * 3);
  return `${stairBg({ dado: 2000 })}
   ${liftDoors('t24c', -60, 200, 340, 1200)}
   <ellipse cx="540" cy="760" rx="460" ry="520" fill="url(#kAmb)" opacity=".45"/>
   ${jonas(x, y, s, { tilt: -6, look: -12, lookY: -2, brow: 'calm', mouth: 'flat', talk: talkAt(t, 38.88, 40.2) * .5, blink: (t > 39.3 && t < 39.6) ? 1 : 0, aR: [20, lerp(-120, -70, hand)] })}
   ${breath(t, 39.4, 300, 900, -1)}
   ${FG(1420)}`;
}
function t25(t) { // Ben: "setz dich auf den Boden" — he sits down
  const sd = eio(prog(t, 41.0, 41.6));
  return `${cabin(t, { lit: .8 })}
   ${rings(t, 40.4, 540, 170, '#CFE3F0', 2, 220)}${rings(t, 41.3, 540, 170, '#CFE3F0', 2, 220)}
   ${ben(540, lerp(800, 930, sd), 1.05, { sit: sd > .5 ? 1 : 0, look: 0, lookY: -12, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .9),
      aL: sd > .5 ? [-20, -100] : [lerp(8, 40, sd * 2), 4], aR: sd > .5 ? [-20, -100] : [lerp(8, 40, sd * 2), 4] })}
   ${FG(1420)}`;
}
function t26(t) { // air comes in through the ceiling vent
  let air = '';
  for (let i = 0; i < 7; i++) { const p = ((t - 42.2) * .9 + i / 7) % 1; if (t < 42.2) continue; const x = 470 + i * 24; air += `<path d="M ${x} ${300 + 600 * p} q 30 40 0 80 q -30 40 0 80" fill="none" stroke="#CFE3F0" stroke-width="8" stroke-linecap="round" opacity="${.8 * Math.sin(p * Math.PI)}"/>`; }
  const look = eout(prog(t, 42.2, 42.5));
  return `${cabin(t, { lit: .8 })}
   <ellipse cx="540" cy="280" rx="200" ry="120" fill="url(#kCold)" opacity=".7"/>
   ${air}
   ${ben(540, 1000, 1.05, { sit: 1, look: 0, lookY: lerp(0, -14, look), tilt: -8 * look, brow: 'up', mouth: 'o', blink: blinkAt(t, .2), aL: [-20, -100], aR: [-20, -100] })}
   ${FG(1420)}`;
}
function t27(t) { // Ben nods, a small smile
  const nod = t > 43.4 && t < 44.2 ? 10 * Math.sin((t - 43.4) * 16) : 0;
  return `${cabin(t, { lit: .9 })}
   <ellipse cx="540" cy="760" rx="420" ry="460" fill="url(#kCold)" opacity=".45"/>
   ${ben(540, 1100, 1.55, { sit: 1, hdy: nod, look: 0, lookY: -8, brow: 'calm', mouth: t > 43.9 ? 'smile' : 'flat', blink: blinkAt(t, .4), aL: [-20, -100], aR: [-20, -100] })}
   ${rings(t, 43.4, 540, 170, '#CFE3F0', 2, 220)}
   ${FG(1420)}`;
}
function t28(t) { // Mia kneels at the door and tells jokes through the gap
  const x = 400, y = 1010, s = 1.25;
  return `${stairBg()}
   ${liftDoors('t28c', 600, 380, 520, 900)}
   <ellipse cx="560" cy="860" rx="380" ry="420" fill="url(#kAmb)" opacity=".4"/>
   ${mia(x, y, s, { tilt: 12, hdx: 14, look: 14, lookY: 4, brow: 'up', mouth: 'grin', talk: talkAt(t, 45.6, 46.3), blink: blinkAt(t, 1.3),
      aR: mReach(x, y, s, 1, 610, 820, 1), aL: [30, -110], sway: Math.sin(t * 5) })}
   ${rings(t, 45.94, 640, 760, K.miaHi, 2, 180)}
   ${FG()}`;
}
function t29(t) { // cut-away: Mia above, Ben laughing below
  const laugh = t > 46.6 ? Math.abs(Math.sin((t - 46.6) * 14)) : 0;
  const inner = `<ellipse cx="0" cy="0" rx="220" ry="260" fill="url(#kCold)" opacity=".5"/>${ben(0, -40, .6, { sit: 1, hdy: -8 * laugh, tilt: 6 * laugh, look: 0, lookY: -12, brow: 'up', mouth: laugh > 0 ? 'grin' : 'smile', aL: [-20, -100], aR: [-20, -100] })}`;
  let ha = ''; for (let i = 0; i < 3; i++) { const p = prog(t, 46.7 + i * .25, 47.5 + i * .25); if (p > 0 && p < 1) ha += `<circle cx="${560 + 60 * Math.sin(i * 2 + p * 4)}" cy="${1000 - 320 * p}" r="${16 + 10 * p}" fill="none" stroke="#CFE3F0" stroke-width="6" opacity="${1 - p}"/>`; }
  return `${shaftCut(t, 1040, `<g transform="translate(540 0)">${inner}</g>`, { fl: [690, 1400], rooms: false })}
   <rect x="0" y="0" width="1080" height="690" fill="#1A2227"/><rect x="300" y="200" width="480" height="490" fill="${K.steel}" ${OL(5)}/><path d="M 540 200 V 690" stroke="${K.ol}" stroke-width="6"/>
   ${mia(250, 420, .6, { tilt: 12, look: 14, brow: 'up', mouth: 'grin', talk: talkAt(t, 46.3, 47.5), aR: mReach(250, 420, .6, 1, 410, 380, 1), aL: [30, -110] })}
   <rect x="0" y="690" width="1080" height="44" fill="${K.conc}" ${OL(5)}/>
   ${ha}
   ${FG(1420)}`;
}
function t30(t) { // Jonas pulls on the headlamp, clicks it on
  const on = t > 49.2, x = 540, y = 1240, s = 1.75;
  const put = eio(prog(t, 47.9, 48.7));
  const handT = [x + 30, y - (310 - 80 * (1 - put)) * s];
  return `${stairBg({ dado: 2000 })}
   ${liftDoors('t30c', 860, 200, 400, 1200)}
   <ellipse cx="540" cy="760" rx="460" ry="520" fill="url(#kAmb)" opacity="${on ? .5 : .25}"/>
   ${on ? beam(x, y - 170 * s * 1.0 - 120, -100, 900, 30, .6) : ''}
   ${jonas(x, y, s, { look: 0, lookY: -10, brow: 'angry', mouth: 'flat', blink: blinkAt(t, 1.0), front: put > .6 ? jLamp(on) : '',
      aR: t < 49.4 ? jReach(x, y, s, 1, handT[0] + 60, handT[1], 1) : [10, 6], holdR: put <= .6 ? (hx, hy) => `<g transform="translate(${hx} ${hy})"><rect x="-40" y="-24" width="80" height="48" rx="10" fill="#2B2B2B" ${OL(4)}/><circle cx="0" cy="0" r="14" fill="#4A4A4A"/></g>` : null })}
   ${on ? rings(t, 49.2, x, y - 300 * s, '#FFF6DD', 2, 200) : ''}
   ${FG(1420)}`;
}
function t31(t) { // he runs off; Mia stays at the door and waves
  const r = eio(prog(t, 49.8, 50.8)), x = lerp(520, -260, r), sw = Math.sin(t * 16);
  return `${stairBg()}
   ${liftDoors('t31c', 640, 380, 440, 900)}
   ${mia(830, 1040, .95, { look: -14, brow: 'up', mouth: 'smile', aR: [150, 10 + 20 * Math.sin(t * 12)], aL: [8, 4], blink: blinkAt(t, .6) })}
   ${beam(x - 40, 760, 180 + 6 * sw, 900, 30, .5)}
   ${jonas(x, 1000, 1.1, { lean: -14 * r, look: -14, brow: 'angry', mouth: 'flat', front: jLamp(1), aL: [20 + 40 * sw, -20], aR: [20 - 40 * sw, -20] })}
   ${FG()}`;
}
function t32(t) { // 14 floors down: stairs scroll past, beam zig-zags
  const sc = ((t - 50.84) * 900) % 560;
  let st = '';
  for (let k = -1; k < 5; k++) {
    const y0 = k * 560 - sc + 280, dir = k % 2 ? 1 : -1;
    st += `<polygon points="${dir > 0 ? 160 : 920},${y0} ${dir > 0 ? 920 : 160},${y0 + 420} ${dir > 0 ? 920 : 160},${y0 + 470} ${dir > 0 ? 160 : 920},${y0 + 50}" fill="#2B3943" ${OL(5)}/>`;
    for (let j = 0; j < 9; j++) { const xx = dir > 0 ? 160 + j * 84 : 920 - j * 84; st += `<path d="M ${xx} ${y0 + j * 46.6} v 18" stroke="${K.ol}" stroke-width="4"/>`; }
    st += `<rect x="${dir > 0 ? 920 : 40}" y="${y0 + 400}" width="120" height="70" fill="#2B3943" ${OL(5)}/>`;
  }
  const leg = Math.sin(t * 20);
  const p = back(prog(t, 51.26, 51.6));
  return `<rect x="0" y="0" width="1080" height="1920" fill="#141C20"/>${st}
   ${beam(560, 640, 120 + 20 * leg, 800, 34, .45)}
   ${jonas(560, 640, .62, { lean: 10 * leg, look: 6, lookY: 10, brow: 'angry', mouth: 'flat', front: jLamp(1), aL: [30 * leg + 20, -10], aR: [-30 * leg + 20, -10] })}
   ${lab('14 STOCKWERKE', 540, 300, 76, p)}
   ${FG(1420)}`;
}
function t33(t) { // the front door bursts open into the cold
  const op = back(prog(t, 52.9, 53.2)), r = eout(prog(t, 53.0, 54.0));
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${tower(-200, 1240, 1480, 14, 12, { fh: 90, seed: 3, col: K.conc })}
   <rect x="300" y="760" width="480" height="480" fill="#05080A" ${OL(6)}/>
   <polygon points="300,760 ${300 + 230 * (1 - .8 * op)},${760 - 30 * op} ${300 + 230 * (1 - .8 * op)},${1270 + 30 * op} 300,1240" fill="#3A4B56" ${OL(5)}/>
   <polygon points="780,760 ${780 - 230 * (1 - .8 * op)},${760 - 30 * op} ${780 - 230 * (1 - .8 * op)},${1270 + 30 * op} 780,1240" fill="#3A4B56" ${OL(5)}/>
   <rect x="-40" y="1240" width="1160" height="700" fill="#C9D6DE"/>
   ${op > .2 ? jonas(lerp(540, 300, r), lerp(1040, 1100, r), lerp(.6, .9, r), { lean: -8, look: -10, brow: 'angry', mouth: 'o', front: jLamp(1), aL: [40 * Math.sin(t * 14) + 20, -10], aR: [-40 * Math.sin(t * 14) + 20, -10] }) : ''}
   ${breath(t, 53.58, lerp(540, 300, r) - 60, 760, -1)}
   ${snow(t, 60, 33, 160)}${FG(1420)}`;
}
function t34(t) { // in the snow: the phone is dead, he shakes it
  const x = 540, y = 1080, s = 1.35, sh = t > 54.9 && t < 55.6 ? 14 * Math.sin(t * 40) : 0;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${tower(-100, 1160, 500, 12, 4, { fh: 86, seed: 5, col: '#18232A' })}${tower(560, 1160, 600, 11, 5, { fh: 90, seed: 6, col: '#18232A' })}
   <rect x="-40" y="1150" width="1160" height="800" fill="#AEBEC7"/>
   ${jonas(x, y, s, { look: 10, lookY: 10, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .3), front: jLamp(1), aR: jReach(x, y, s, 1, x + 160 + sh, y + 40, 1),
      holdR: (hx, hy) => phone(hx, hy - 40, 1, -6 + sh * .5, { on: 0 }) })}
   ${breath(t, 55.2, x - 80, y - 200, -1)}
   ${snow(t, 60, 34, 160)}${FG(1420)}`;
}
function t35(t) { // map: one way left — on foot to the fire station
  const d = eio(prog(t, 56.0, 57.0));
  const path = 'M 300 1180 L 300 900 L 620 900 L 620 560 L 780 560 L 780 360';
  let blocks = '';
  for (let i = 0; i < 9; i++) { const bx = 120 + (i % 3) * 300, by = 220 + Math.floor(i / 3) * 360; if (i === 7) continue; blocks += `<rect x="${bx + 20}" y="${by + 30}" width="${220}" height="${120}" fill="#2B3943" ${OL(5)} transform="rotate(${(i % 2) * 90} ${bx + 130} ${by + 90})"/>`; }
  const st = back(prog(t, 57.6, 57.9));
  return `<rect x="0" y="0" width="1080" height="1920" fill="#1E2A30"/>
   ${blocks}
   <rect x="200" y="1100" width="200" height="160" fill="${K.concHi}" ${OL(6)}/><circle cx="300" cy="1180" r="24" fill="${K.amb}" ${OL(4)}/>
   <path d="${path}" fill="none" stroke="${K.amb}" stroke-width="16" stroke-dasharray="1600" stroke-dashoffset="${1600 * (1 - d)}" stroke-linecap="round" stroke-linejoin="round"/>
   <path d="${path}" fill="none" stroke="${K.ol}" stroke-width="5" stroke-dasharray="12 26" opacity=".6"/>
   <g transform="translate(780 330) scale(${.6 + .4 * st})"><rect x="-110" y="-80" width="220" height="140" fill="${B.truck}" ${OL(6)}/><rect x="-80" y="-20" width="60" height="80" fill="#5A2025"/><rect x="20" y="-20" width="60" height="80" fill="#5A2025"/><path d="M -120 -80 L 0 -140 L 120 -80 Z" fill="${B.truckSh}" ${OL(5)}/></g>
   ${FG(1420)}`;
}
function t36(t) { // fire station: he bangs on the gate
  const ks = [57.66, 57.95, 58.2];
  const arm = ks.some(k => t > k - .1 && t < k + .05);
  const x = lerp(-100, 330, eout(prog(t, 57.1, 57.6))), y = 1100, s = 1.05;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   <rect x="-20" y="420" width="1120" height="800" fill="#6B3A30" ${OL(6)}/><rect x="-20" y="420" width="1120" height="60" fill="#4E2A22"/>
   <rect x="80" y="160" width="220" height="200" fill="#6B3A30" ${OL(6)}/><rect x="130" y="210" width="120" height="100" fill="${K.lit}" ${OL(4)}/><ellipse cx="190" cy="260" rx="200" ry="160" fill="url(#kAmb)" opacity=".7"/>
   ${[0, 1].map(i => `<rect x="${430 + i * 330}" y="620" width="280" height="600" fill="${B.truck}" ${OL(6)}/>${[0, 1, 2, 3, 4].map(j => `<path d="M ${430 + i * 330} ${700 + j * 100} h 280" stroke="${B.truckSh}" stroke-width="8"/>`).join('')}`).join('')}
   <rect x="-40" y="1210" width="1160" height="700" fill="#AEBEC7"/>
   ${jonas(x, y, s, { look: 14, lookY: -2, brow: 'angry', mouth: 'o', front: jLamp(1), aR: arm ? jReach(x, y, s, 1, 470, 760, 1) : [lerp(20, 60, prog(t, 57.5, 57.65)), -90] })}
   ${knockRings(t, ks, 480, 760, '#FFFFFF', 200)}
   ${snow(t, 50, 36, 140)}${FG(1420)}`;
}
function t37(t) { // forty minutes later: the clock sweeps two thirds
  const f = (2 / 3) * eio(prog(t, 58.6, 59.5)), bl = t > 59.76 ? (Math.floor(t * 4) % 2 ? 1 : .3) * prog(t, 59.76, 60.2) : 0;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${tower(-80, 1250, 1240, 14, 10, { fh: 88, seed: 2, col: '#18232A' })}
   <rect x="-40" y="1240" width="1160" height="700" fill="#AEBEC7"/>
   <ellipse cx="1000" cy="1240" rx="300" ry="160" fill="url(#kBlue)" opacity="${bl}"/>
   ${timer(540, 700, 260 * back(prog(t, 58.55, 58.85)), f)}
   ${snow(t, 50, 37, 60)}${FG(1420)}`;
}
function t38(t) { // the fire engine rolls up in front of the tower block
  const p = eout(prog(t, 60.34, 61.72)), x = lerp(1200, 140, p), bounce = 8 * ring(t, 61.72, 4, 4);
  const bl = Math.floor(t * 5) % 2;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${tower(60, 1120, 960, 16, 8, { fh: 64, seed: 1, col: K.conc })}
   <rect x="-40" y="1110" width="1160" height="800" fill="#C9D6DE"/>
   <g transform="translate(${x} ${bounce})">
    <ellipse cx="${bl ? 200 : 470}" cy="900" rx="300" ry="200" fill="url(#kBlue)"/>
    <rect x="0" y="960" width="800" height="300" rx="20" fill="${B.truck}" ${OL(6)}/><rect x="0" y="900" width="250" height="360" rx="30" fill="${B.truck}" ${OL(6)}/>
    <rect x="30" y="940" width="190" height="120" rx="12" fill="#2E4654" ${OL(5)}/><rect x="0" y="1150" width="800" height="26" fill="#FFFFFF"/>
    <rect x="280" y="940" width="500" height="40" fill="${K.steel}" ${OL(4)}/><path d="M 300 960 H 760" stroke="${K.steelHi}" stroke-width="6" stroke-dasharray="24 24"/>
    <rect x="${bl ? 140 : 160}" y="880" width="40" height="24" rx="6" fill="${bl ? B.blue : '#2A4A70'}" ${OL(3)}/><rect x="${bl ? 70 : 60}" y="880" width="40" height="24" rx="6" fill="${bl ? '#2A4A70' : B.blue}" ${OL(3)}/>
    <circle cx="140" cy="1270" r="56" fill="#1A1A1A" ${OL(5)}/><circle cx="620" cy="1270" r="56" fill="#1A1A1A" ${OL(5)}/>
    <circle cx="140" cy="1270" r="18" fill="${K.steelHi}"/><circle cx="620" cy="1270" r="18" fill="${K.steelHi}"/>
    <circle cx="8" cy="1100" r="18" fill="#FFF3D1"/>${beam(0, 1100, 180, 600, 20, .5)}
   </g>
   ${snow(t, 50, 38, 80)}${FG(1420)}`;
}
function t39(t) { // two firefighters at the lift, headlamps on the doors
  const s = 1.05;
  return `${stairBg()}
   ${liftDoors('t39c', 300, 380, 480, 860)}
   <ellipse cx="540" cy="800" rx="380" ry="440" fill="url(#kAmb)" opacity=".45"/>
   ${ffighter(200, 1000, s, { look: 14, lookY: -4, brow: 'calm', mouth: 'flat', talk: talkAt(t, 63.0, 63.8) * .6, aR: jReach(200, 1000, s, 1, 420, 1080, -1) })}
   ${ffighter(880, 1020, s, { look: -14, lookY: -4, brow: 'calm', mouth: 'flat', aL: [20, -60], holdL: (hx, hy) => `<g transform="translate(${hx} ${hy}) rotate(20)"><path d="M -6 -120 V 0 M -40 -120 H 30" stroke="${K.ol}" stroke-width="22" stroke-linecap="round"/><path d="M -6 -120 V 0 M -40 -120 H 30" stroke="${K.steelHi}" stroke-width="12" stroke-linecap="round"/></g>` })}
   ${FG()}`;
}
function t40(t) { // emergency key into the door lock, turn, doors part
  const ins = eio(prog(t, 64.4, 64.8)), turn = eio(prog(t, 64.85, 65.15)), op = eio(prog(t, 65.3, 65.9));
  const gap = 320 * op;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#1A2227"/>
   <rect x="0" y="300" width="1080" height="1100" fill="#05080A"/>
   ${op > 0 ? `<ellipse cx="540" cy="900" rx="${300 * op}" ry="500" fill="url(#kCold)" opacity="${op}"/>` : ''}
   <rect x="${-gap / 2}" y="300" width="540" height="1100" fill="${K.steel}" ${OL(6)}/><rect x="${540 + gap / 2}" y="300" width="540" height="1100" fill="${K.steel}" ${OL(6)}/>
   <rect x="0" y="120" width="1080" height="180" fill="#222B30" ${OL(6)}/>
   <circle cx="540" cy="210" r="30" fill="#0B0F12" ${OL(4)}/>
   <g transform="translate(540 ${lerp(420, 210, ins)}) rotate(${90 * turn})"><path d="M 0 0 V 220 M -70 220 H 70" stroke="${K.ol}" stroke-width="40" stroke-linecap="round"/><path d="M 0 0 V 220 M -70 220 H 70" stroke="${K.steelHi}" stroke-width="24" stroke-linecap="round"/></g>
   ${t > 65.15 ? rings(t, 65.15, 540, 210, '#FFFFFF', 2, 160) : ''}
   ${FG(1420)}`;
}
function t41(t) { // Ben climbs out, a firefighter pulls him up
  const up = eio(prog(t, 66.1, 67.2)), x = 560, y = lerp(1150, 930, up);
  return `${stairBg()}
   <rect x="300" y="380" width="480" height="860" fill="#05080A" ${OL(6)}/>
   <rect x="220" y="380" width="80" height="860" fill="${K.steel}" ${OL(5)}/><rect x="780" y="380" width="80" height="860" fill="${K.steel}" ${OL(5)}/>
   <clipPath id="t41c"><rect x="300" y="0" width="480" height="1240"/></clipPath>
   <g clip-path="url(#t41c)"><rect x="310" y="1060" width="460" height="300" fill="${K.steelSh}" ${OL(5)}/>
    ${ben(x, y, .95, { pale: 1, look: -10, lookY: -6, brow: 'worry', mouth: 'flat', aL: bReach(x, y, .95, -1, 330, 1010, -1), aR: [20, 10] })}</g>
   <rect x="300" y="1236" width="480" height="20" fill="#2B3943" ${OL(4)}/>
   ${ffighter(170, 1080, 1.0, { look: 14, lookY: 6, brow: 'calm', mouth: 'smile', aR: jReach(170, 1080, 1, 1, 330, 1010, -1) })}
   <ellipse cx="560" cy="860" rx="300" ry="380" fill="url(#kAmb)" opacity=".35"/>
   ${FG()}`;
}
function t42(t) { // Ben close: pale, but unhurt — thumbs up, Mia beside him
  const th = back(prog(t, 67.64, 67.95));
  return `${stairBg()}
   <ellipse cx="540" cy="760" rx="460" ry="520" fill="url(#kAmb)" opacity=".45"/>
   ${mia(820, 1200, 1.1, { tilt: -8, look: -12, brow: 'up', mouth: 'smile', aL: mReach(820, 1200, 1.1, -1, 600, 1180, 1), blink: blinkAt(t, .5) })}
   ${ben(470, 1120, 1.5, { pale: 1, tilt: 4, look: 0, lookY: 0, brow: 'worry', mouth: th > .5 ? 'smile' : 'flat', blink: blinkAt(t, 1.2),
      aR: [lerp(10, 160, th), lerp(4, 170, th)] })}
   ${FG(1420)}`;
}
function t43(t) { // only now: Jonas shivers, breath fogs
  const x = 540, y = 1240, s = 1.7, shv = t > 69.6 ? 4 * Math.sin(t * 60) : 0;
  return `${stairBg({ dado: 2000 })}
   <ellipse cx="540" cy="760" rx="460" ry="520" fill="url(#kCold)" opacity=".35"/>
   ${jonas(x + shv, y, s, { look: 0, lookY: -6, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .4), front: jLamp(1), aL: [20, -150], aR: [20, -150] })}
   ${breath(t, 69.96, x - 120, y - 300, -1)}${breath(t, 70.3, x + 120, y - 300, 1)}
   ${FG(1420)}`;
}
function t44(t) { // the stairwell window frosts over, the cold spreads
  const fr = eout(prog(t, 70.6, 71.9));
  let crys = ''; for (let i = 0; i < 26; i++) { const a = hash(i * 3) * Math.PI * 2, r = 40 + 220 * hash(i * 5) * fr; crys += `<path d="M ${540 + r * Math.cos(a)} ${600 + r * Math.sin(a) * 1.4} l ${18 * fr} ${-18 * fr} m ${-18 * fr} 0 l ${18 * fr} ${18 * fr}" stroke="#E6F0F6" stroke-width="5" opacity="${fr}"/>`; }
  return `${stairBg()}
   <rect x="300" y="200" width="480" height="800" fill="url(#kSky)" ${OL(8)}/>${tower(320, 1000, 200, 9, 3, { fh: 70, col: '#18232A', lw: 3 })}
   <path d="M 540 200 V 1000" stroke="#0D1519" stroke-width="12"/>
   <rect x="300" y="200" width="480" height="800" fill="#DCE7EE" opacity="${.45 * fr}"/>${crys}
   <polygon points="0,1240 1080,1240 1080,1100 0,1100" fill="#2B3943" ${OL(5)}/>
   ${jonas(200, 1150, .8, { look: 12, lookY: -10, brow: 'worry', mouth: 'flat', front: jLamp(1), aL: [20, -150], aR: [20, -150] })}
   ${breath(t, 71.2, 120, 950, -1)}
   <rect x="0" y="0" width="1080" height="1920" fill="#5E7F93" opacity="${.15 * fr}"/>
   ${FG()}`;
}
function t45(t) { // upstairs: back in the flat, beam across the wall to the thermometer
  const sw = eio(prog(t, 72.4, 73.4));
  return `${flatWall({ wx: 400 })}
   ${thermo(760, 900, .7, 19)}
   ${beam(260, 760, lerp(-30, -4, sw), 900, 26, .55)}
   ${jonas(260, 1180, 1.15, { look: lerp(4, 14, sw), lookY: -4, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .7), front: jLamp(1), tilt: 6 * sw, hdx: 10 * sw })}
   ${FG()}`;
}
function t46(t) { // thermometer close: falls to 19 °C
  const v = lerp(22, 19, eio(prog(t, 73.9, 74.97))), p = back(prog(t, 74.97, 75.25));
  return `${flatWall({ wx: 200 })}
   <ellipse cx="540" cy="820" rx="420" ry="520" fill="url(#kAmb)" opacity=".4"/>
   ${thermo(540, 1240, 1.6, v)}
   ${lab('19 °C', 540, 280, 130, p)}
   ${FG(1420)}`;
}
function t47(t) { // in the hallway his head snaps toward the neighbour's door
  const turn = eout(prog(t, 76.25, 76.5));
  return `${stairBg()}
   <rect x="760" y="380" width="320" height="880" fill="#0B1014" ${OL(6)}/>
   ${jonas(420, 1040, 1.2, { hdx: 24 * turn, look: lerp(-12, 14, turn), lookY: -2, eyeS: 1 + .25 * turn, brow: turn > .5 ? 'up' : 'worry', mouth: turn > .5 ? 'o' : 'flat', tilt: 8 * turn, front: jLamp(1, 24 * turn) })}
   ${beam(460 + 24 * turn, 840, lerp(160, 4, turn), 900, 26, .55)}
   ${FG()}`;
}
function t48(t) { // the neighbour's door stands ajar, red scarf on the hook inside
  const lit = eout(prog(t, 77.24, 77.6)), sc = back(prog(t, 78.2, 78.5)), sw = 3 * Math.sin(t * 2);
  const op = .18 + .05 * Math.sin(t * 3);
  return `<rect x="0" y="0" width="1080" height="1920" fill="#141C20"/>
   <rect x="0" y="1240" width="1080" height="680" fill="#11171B"/>
   <rect x="240" y="300" width="600" height="960" fill="#2A2420" ${OL(6)}/>
   <rect x="260" y="320" width="560" height="920" fill="#0B0F12"/>
   <rect x="300" y="520" width="110" height="20" fill="${K.steel}" ${OL(3)}/><circle cx="330" cy="540" r="10" fill="${K.steelHi}"/>
   <g transform="translate(330 540) rotate(${sw})"><path d="M -30 0 Q -40 160 -20 300 L 20 300 Q 30 160 20 0 Z" fill="${B.scarf}" ${OL(5)}/><path d="M -24 280 V 320 M -8 280 V 324 M 8 280 V 322" stroke="${B.scarfSh}" stroke-width="6"/></g>
   ${sc > 0 ? `<circle cx="330" cy="700" r="${200 * sc}" fill="none" stroke="#FFFFFF" stroke-width="6" opacity="${.6 * (1 - prog(t, 78.5, 79.3))}"/>` : ''}
   <polygon points="${260 + 560 * op + 300},320 820,330 820,1240 ${260 + 560 * op + 300},1240" fill="${B.door}" ${OL(5)}/>
   <circle cx="${600}" cy="820" r="16" fill="${K.steelHi}" ${OL(4)}/>
   <rect x="440" y="1240" width="300" height="20" fill="#2B2B2B"/>
   ${beam(1080, 600, 172, 900, 28, .55 * lit)}
   <ellipse cx="460" cy="700" rx="300" ry="360" fill="url(#kAmb)" opacity="${.45 * lit}"/>
   ${FG()}`;
}
function t49(t) { // the door swings wide open
  const op = eio(prog(t, 79.6, 80.2)) + .05 * ring(t, 80.2, 3, 4);
  const w = 560 * (1 - .82 * op);
  return `<rect x="0" y="0" width="1080" height="1920" fill="#141C20"/>
   <rect x="0" y="1240" width="1080" height="680" fill="#11171B"/>
   <rect x="240" y="300" width="600" height="960" fill="#2A2420" ${OL(6)}/>
   <rect x="260" y="320" width="560" height="920" fill="#0B0F12"/>
   <polygon points="260,700 820,700 820,1240 260,1240" fill="#161E22"/>
   <rect x="300" y="520" width="110" height="20" fill="${K.steel}" ${OL(3)}/>
   <g transform="translate(330 540)"><path d="M -30 0 Q -40 160 -20 300 L 20 300 Q 30 160 20 0 Z" fill="${B.scarf}" ${OL(5)}/></g>
   <polygon points="${820 - w},${320 - 40 * op} 820,320 820,1240 ${820 - w},${1240 + 40 * op}" fill="${B.door}" ${OL(5)}/>
   <circle cx="${820 - w + 40}" cy="820" r="16" fill="${K.steelHi}" ${OL(4)}/>
   ${beam(1080, 640, 176, 900, 30, .55)}
   <ellipse cx="460" cy="760" rx="320" ry="400" fill="url(#kAmb)" opacity=".4"/>
   ${FG()}`;
}
function t50(t) { // inside: beam sweeps over an empty armchair — the flat is empty
  const sw = eio(prog(t, 80.95, 81.9));
  return `${flatWall({ wx: 300 })}
   <rect x="0" y="1180" width="1080" height="740" fill="#161E22"/>
   <rect x="700" y="420" width="260" height="380" fill="#0E1418" ${OL(6)}/><rect x="720" y="440" width="220" height="340" fill="url(#kSky)"/>
   <g transform="translate(${lerp(560, 440, sw)} 0)">
    <path d="M -200 1220 L -200 860 Q -200 760 -100 760 L 100 760 Q 200 760 200 860 L 200 1220 Z" fill="#5A4A6A" ${OL(6)}/>
    <rect x="-150" y="980" width="300" height="120" rx="30" fill="#6E5C80" ${OL(5)}/>
    <path d="M -150 780 L 120 1000 L -160 1000 Z" fill="#B88A50" opacity=".85" ${OL(4)}/>
    <rect x="240" y="1060" width="120" height="160" fill="${K.wood}" ${OL(5)}/><rect x="270" y="1020" width="50" height="40" rx="8" fill="#E6EDF1" ${OL(4)}/>
   </g>
   ${beam(-40, 760, lerp(10, 30, sw), 1100, 30, .6)}
   <ellipse cx="${lerp(500, 760, sw)}" cy="${lerp(900, 1100, sw)}" rx="220" ry="200" fill="url(#kAmb)" opacity=".5"/>
   ${FG()}`;
}
function t51(t) { // outside: fresh footprints lead away into the snow and the dark
  const ft = prog(t, 82.6, 83.8);
  let fp = '';
  for (let i = 0; i < 10; i++) { if (i / 10 > ft) break; const y = 1380 - i * 56, x = 540 + 90 * Math.sin(i * .5) + (i % 2 ? 34 : -34), sc = 1 - i * .07; fp += `<ellipse cx="${x}" cy="${y}" rx="${30 * sc}" ry="${46 * sc}" fill="#5F7582" opacity="${.9 - i * .06}"/>`; }
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#kSky)"/>
   ${tower(-200, 860, 600, 9, 5, { fh: 80, seed: 8, col: '#18232A' })}${tower(640, 860, 600, 8, 5, { fh: 84, seed: 9, col: '#18232A' })}
   <rect x="-40" y="850" width="1160" height="1100" fill="#C9D6DE"/>
   <rect x="440" y="700" width="200" height="160" fill="#05080A" ${OL(5)}/>
   ${fp}
   <rect x="-40" y="850" width="1160" height="220" fill="#0B0F12" opacity=".35"/>
   ${snow(t, 70, 51, 200)}${FG(1420)}`;
}
function t52(t) { // Jonas looks at you: "?" — the lamp clicks off
  const q = back(prog(t, 84.95, 85.25)), off = t > 86.3;
  const turn = eout(prog(t, 84.42, 84.8));
  return `<rect x="0" y="0" width="1080" height="1920" fill="#141C20"/>
   <rect x="640" y="300" width="440" height="1100" fill="#0B0F12" ${OL(6)}/><polygon points="640,300 760,330 760,1370 640,1400" fill="${B.door}" ${OL(5)}/>
   <path d="M 840 400 Q 830 560 850 700 L 890 700 Q 900 560 880 400 Z" fill="${B.scarf}" ${OL(4)}/>
   ${off ? '' : `<ellipse cx="460" cy="760" rx="460" ry="520" fill="url(#kAmb)" opacity=".4"/>`}
   ${jonas(420, 1160, 1.3, { look: lerp(14, 0, turn), lookY: 0, brow: 'worry', mouth: 'flat', blink: blinkAt(t, .2), tilt: -4 * turn, front: jLamp(!off) })}
   ${breath(t, 85.4, 300, 900, -1)}
   ${q > 0 ? `<g transform="translate(700 420) scale(${q})">${TX('?', 0, 90, 300, K.red, 'middle', `stroke="${K.ol}" stroke-width="12" paint-order="stroke"`)}</g>` : ''}
   ${off ? `<rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity="${.8 * prog(t, 86.3, 86.45)}"/>` : ''}
   ${snow(t, 20, 52, 40, .4)}
   ${FG()}`;
}

const SHOTS = [
  [0, t01], [1.45, t02], [2.9, t03], [4.36, t04], [6.06, t05], [7.54, t06], [9.38, t07], [11.32, t08], [13.08, t09],
  [14.78, t10], [16.22, t11], [17.92, t12], [19.98, t13], [21.2, t14], [23.04, t15], [24.74, t16], [26.28, t17],
  [27.86, t18], [29.56, t19], [32.06, t20], [33.58, t21], [35.38, t22], [37.04, t23], [38.88, t24], [40.34, t25],
  [42.2, t26], [43.34, t27], [44.74, t28], [46.3, t29], [47.76, t30], [49.74, t31], [50.84, t32], [52.78, t33],
  [54.42, t34], [55.96, t35], [57.1, t36], [58.55, t37], [60.34, t38], [62.74, t39], [64.38, t40], [66.02, t41],
  [67.5, t42], [69.08, t43], [70.54, t44], [72.26, t45], [73.9, t46], [76.16, t47], [77.24, t48], [79.5, t49],
  [80.92, t50], [82.46, t51], [84.42, t52],
];
function scene(t) {
  let f = SHOTS[0][1];
  for (const [t0, fn] of SHOTS) if (t >= t0) f = fn;
  return MYDEFS + MYDEFS2 + f(t);
}

const __style = {"dust": true, "vignette": true, "subtitle": "horror"};
export const subtitleStyle = __style.subtitle;
export const subtitleTop = __style.subtitle_y;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
