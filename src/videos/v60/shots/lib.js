// v60 "Verirrt im Schwarzwald" — shared drawing helpers for this video only (style bible: jobs/v60/style.md).
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';

export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  ol: '#0B0F12', bg: '#141A1F', bg2: '#1E2A30', moss: '#24363A', amb: '#FFB547', ambHi: '#FFE2A8', red: '#E5484D',
  sky0: '#070C10', sky1: '#18252B', far: '#1D2D31', mid: '#15222A', near: '#0D1519', ground: '#1A2420', groundHi: '#2A3830',
  path: '#4A4A40', pathHi: '#6A6656', bark: '#3A2C22', barkHi: '#5A4434', cold: '#5E7F93', coldHi: '#9DB8C8', frost: '#DCEBF4',
  skin: '#E8B38A', skinSh: '#C48E68', pants: '#262E36', pantsSh: '#1A2026', boot: '#3A2A20', green: '#2E8B57', greenSh: '#1F6A40',
  screen: '#BFD8E6', screenD: '#0E1418', blue: '#3D8BFF',
};

// the four friends — identical in every shot (style.md)
export const P = {
  red: { j: '#D2413A', jSh: '#A02E29', jHi: '#E8655C', skin: '#E8B38A', skinSh: '#C48E68', hair: '#3A2620', hairSh: '#24170F', kind: 'pony' },
  green: { j: '#4F8A43', jSh: '#3A6A31', jHi: '#6CA85C', skin: '#C98E62', skinSh: '#A87048', hair: '#1E1A18', hairSh: '#0F0D0C', kind: 'short' },
  yellow: { j: '#E6B12E', jSh: '#B58A1F', jHi: '#F5CD5E', skin: '#F0C49C', skinSh: '#CF9E78', hair: '#8A3B22', hairSh: '#5E2715', kind: 'curly' },
  blue: { j: '#3C6DB0', jSh: '#2B5085', jHi: '#5A8BD0', skin: '#EBC09C', skinSh: '#C99A76', hair: '#C9A15A', hairSh: '#A07A3A', kind: 'beanie' },
};
export const BEANIE = '#8C949B', BEANIE_SH = '#6A7178', BEANIE_HI = '#AEB5BB';

export const OL = (w = 6) => `stroke="${K.ol}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const shk = (t, t0, a, d = 6) => { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; };
export const blinkAt = (t, off = 0) => { const k = (t + off) % 2.9; return k > 2.76 ? Math.sin((k - 2.76) / .14 * Math.PI) : 0; };
export const talkAt = (t, a, b) => t > a && t < b ? .25 + .75 * Math.abs(Math.sin((t - a) * 17)) * (.6 + .4 * Math.sin(t * 5.3)) : 0;
export const shiver = (t, a = 1) => a * (4 * Math.sin(t * 61) + 2.5 * Math.sin(t * 97 + 1));

export const DEFS60 = `<defs>
<linearGradient id="fSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${K.sky0}"/><stop offset=".7" stop-color="${K.sky1}"/><stop offset="1" stop-color="#22323A"/></linearGradient>
<linearGradient id="fDusk" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1B2A3A"/><stop offset=".7" stop-color="#4A4A5A"/><stop offset="1" stop-color="#8A6A5A"/></linearGradient>
<radialGradient id="fAmb" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFB547" stop-opacity=".8"/><stop offset=".5" stop-color="#FFB547" stop-opacity=".25"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></radialGradient>
<radialGradient id="fCold" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#CFE3F0" stop-opacity=".6"/><stop offset="1" stop-color="#CFE3F0" stop-opacity="0"/></radialGradient>
<radialGradient id="fRed" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#E5484D" stop-opacity=".65"/><stop offset="1" stop-color="#E5484D" stop-opacity="0"/></radialGradient>
<radialGradient id="fBlue" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#5AA0FF" stop-opacity=".75"/><stop offset="1" stop-color="#5AA0FF" stop-opacity="0"/></radialGradient>
<linearGradient id="fBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF1CF" stop-opacity=".75"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></linearGradient>
<linearGradient id="fBeamV" x1="0" y1="1" x2="0" y2="0"><stop offset="0" stop-color="#FFF1CF" stop-opacity=".7"/><stop offset="1" stop-color="#FFB547" stop-opacity="0"/></linearGradient>
<linearGradient id="fFg" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#0B0F12" stop-opacity="0"/><stop offset=".35" stop-color="#0B0F12" stop-opacity=".8"/><stop offset="1" stop-color="#0B0F12" stop-opacity=".95"/></linearGradient>
<linearGradient id="fGround" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1F2B26"/><stop offset="1" stop-color="#121A17"/></linearGradient>
<linearGradient id="fHeat" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#FFB547"/><stop offset="1" stop-color="#E5484D"/></linearGradient>
</defs>`;

// dark band under the subtitles
export const FG = (y = 1360) => `<rect x="0" y="${y}" width="1080" height="${1920 - y}" fill="url(#fFg)"/>`;

// ---------- forest ----------
export function pine(x, yb, h, col, o = {}) {
  const w = h * (o.w || .42), tiers = 4;
  let d = '';
  for (let i = 0; i < tiers; i++) {
    const top = yb - h + i * h * .2, bot = yb - h * .12 - (tiers - 1 - i) * h * .12, ww = w * (.45 + .55 * (i + 1) / tiers);
    d += `M ${(x).toFixed(1)} ${top.toFixed(1)} L ${(x + ww / 2).toFixed(1)} ${bot.toFixed(1)} L ${(x - ww / 2).toFixed(1)} ${bot.toFixed(1)} Z `;
  }
  const trunk = `<rect x="${(x - h * .025).toFixed(1)}" y="${(yb - h * .14).toFixed(1)}" width="${(h * .05).toFixed(1)}" height="${(h * .14).toFixed(1)}" fill="${col}"/>`;
  return trunk + `<path d="${d}" fill="${col}"${o.edge ? ` stroke="${o.edge}" stroke-width="${o.ew || 3}"` : ''}/>`;
}
// a row of pines; px = horizontal parallax offset
export function pineRow(yb, hMin, hMax, n, col, seed, px = 0, o = {}) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const span = 1400 / n, x = ((i * span + hash(seed + i) * span * .6 + px) % 1400 + 1400) % 1400 - 160;
    s += pine(x, yb + 20 * hash(seed * 3 + i), lerp(hMin, hMax, hash(seed * 7 + i)), col, o);
  }
  return s;
}
export function trunk(x, w, col = K.bark, hi = K.barkHi, y0 = -20, y1 = 1940) {
  return `<rect x="${x - w / 2}" y="${y0}" width="${w}" height="${y1 - y0}" fill="${col}" ${OL(6)}/>
    <path d="M ${x - w * .2} ${y0} V ${y1}" stroke="${hi}" stroke-width="${w * .12}" opacity=".5"/>
    <path d="M ${x + w * .22} ${y0 + 200} v 120 M ${x - w * .05} ${y0 + 700} v 160 M ${x + w * .1} ${y0 + 1200} v 140" stroke="${K.ol}" stroke-width="5" opacity=".6"/>`;
}
// full forest backdrop at night; o.px parallax, o.dusk 0..1 (last light), o.moon
export function forest(t, o = {}) {
  const px = o.px || 0, dusk = o.dusk || 0, hz = o.hz ?? 1100;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#fSky)"/>
   ${dusk > 0 ? `<rect x="0" y="0" width="1080" height="1920" fill="url(#fDusk)" opacity="${dusk}"/>` : ''}
   ${o.moon ? `<circle cx="${o.moon[0]}" cy="${o.moon[1]}" r="120" fill="url(#fCold)"/><circle cx="${o.moon[0]}" cy="${o.moon[1]}" r="38" fill="#DCE7EE" opacity="${o.moonA ?? .9}"/>` : ''}
   ${pineRow(hz - 120, 300, 460, 11, K.far, 3, px * .3)}
   ${pineRow(hz, 420, 640, 9, K.mid, 11, px * .6)}
   <rect x="0" y="${hz - 10}" width="1080" height="${1930 - hz}" fill="url(#fGround)"/>
   ${o.noNear ? '' : pineRow(hz + 260, 700, 1000, 5, K.near, 23, px, { w: .5 })}`;
}
// fog band
export function fog(t, y, a = .18, seed = 1) {
  let s = '';
  for (let i = 0; i < 6; i++) { const x = ((i * 260 + t * (14 + 6 * hash(seed + i))) % 1500) - 200; s += `<ellipse cx="${x.toFixed(1)}" cy="${y + 30 * hash(seed + i * 3)}" rx="${260 + 80 * hash(i + seed)}" ry="${50 + 20 * hash(i + 2)}" fill="#9DB8C8" opacity="${a}"/>`; }
  return s;
}
export function breath(t, t0, x, y, dir = 1, len = 1.1) {
  const p = prog(t, t0, t0 + len); if (p <= 0 || p >= 1) return '';
  let s = ''; for (let i = 0; i < 3; i++) { const q = cl(p * 1.3 - i * .12); if (q <= 0) continue; s += `<circle cx="${x + dir * (20 + 100 * q + i * 24)}" cy="${y - 18 * q - i * 8}" r="${14 + 40 * q}" fill="#E6F0F6" opacity="${.45 * (1 - q)}"/>`; }
  return s;
}
export function rings(t, t0, x, y, col = K.amb, n = 3, r1 = 240, w = 10) {
  let s = '';
  for (let k = 0; k < n; k++) { const p = prog(t, t0 + k * .09, t0 + .7 + k * .09); if (p > 0 && p < 1) s += `<circle cx="${x}" cy="${y}" r="${(40 + p * r1).toFixed(1)}" fill="none" stroke="${col}" stroke-width="${(w * (1 - p)).toFixed(1)}" opacity="${(.75 * (1 - p)).toFixed(2)}"/>`; }
  return s;
}

// ---------- characters ----------
function limb(d, col, w) {
  return `<path d="${d}" fill="none" stroke="${K.ol}" stroke-width="${w + 12}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
// arm from shoulder (sx,sy): a1/a2 degrees from straight down, + = outward
export function arm(sx, sy, a1, a2, side, L1, L2, col, w) {
  const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
  const ex = sx + side * Math.sin(r1) * L1, ey = sy + Math.cos(r1) * L1;
  const hx = ex + side * Math.sin(r2) * L2, hy = ey + Math.cos(r2) * L2;
  return { hx, hy, svg: limb(`M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx.toFixed(1)} ${hy.toFixed(1)}`, col, w) };
}
export function ik(side, sx, sy, tx, ty, L1, L2, flip = 1) {
  const dx = tx - sx, dy = ty - sy, D = cl(Math.hypot(dx, dy), 1, L1 + L2 - 1);
  const ad = Math.atan2(side * dx, dy), al = Math.acos(cl((L1 * L1 + D * D - L2 * L2) / (2 * L1 * D), -1, 1));
  const a1 = ad + flip * al, ex = sx + side * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1;
  return [a1 * 180 / Math.PI, Math.atan2(side * (tx - ex), ty - ey) * 180 / Math.PI];
}
// a sleeve arm in screen coords from a visible shoulder to a hand (close-ups)
export function armTo(sx, sy, hx, hy, w, col, flip = 1, skin = K.skin) {
  const L = Math.hypot(hx - sx, hy - sy) || 1, h = Math.sqrt(Math.max(0, (L * .56) ** 2 - (L / 2) ** 2));
  const ex = (sx + hx) / 2 + flip * h * (hy - sy) / L, ey = (sy + hy) / 2 - flip * h * (hx - sx) / L;
  return limb(`M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx} ${hy}`, col, w) + `<circle cx="${hx}" cy="${hy}" r="${w * .52}" fill="${skin}" ${OL(6)}/>`;
}

function eyes(o) {
  const lx = cl(o.look || 0, -14, 14), ly = cl(o.lookY || 0, -12, 12), bl = o.blink || 0, es = o.eyeS || 1;
  return [-28, 28].map(ex => `<ellipse cx="${ex}" cy="-4" rx="${12 * es}" ry="${Math.max(2, 15 * es * (1 - bl))}" fill="#F6F1E8" ${OL(4)}/>` + (bl < .6 ? `<circle cx="${(ex + lx * .6).toFixed(1)}" cy="${(-3 + ly * .6).toFixed(1)}" r="${6.5 * Math.min(es, 1.15)}" fill="${K.ol}"/>` : '')).join('');
}
function brows(type, col) {
  const B = { calm: [[-44, 2, -14, 0], [14, 0, 44, 2]], worry: [[-44, 4, -14, -8], [14, -8, 44, 4]], up: [[-44, -8, -14, -12], [14, -12, 44, -8]], focus: [[-44, -4, -14, 4], [14, 4, 44, -4]] }[type || 'calm'];
  return B.map(b => `<path d="M ${b[0]} ${-30 + b[1]} L ${b[2]} ${-30 + b[3]}" stroke="${col}" stroke-width="9" stroke-linecap="round"/>`).join('');
}
function mouth(m, talk, y, chat) {
  if (chat > 0) { // chattering teeth
    const o = 3 + 6 * Math.abs(Math.sin(chat * 40));
    return `<rect x="-20" y="${y - o}" width="40" height="${o * 2}" rx="4" fill="#3A1414" ${OL(4)}/><path d="M -16 ${y} H 16" stroke="#F6F1E8" stroke-width="5"/>`;
  }
  if (talk > .05 || m === 'o') { const ry = m === 'o' ? 13 : 3 + 12 * talk; return `<ellipse cx="0" cy="${y}" rx="${m === 'o' ? 11 : 15}" ry="${ry.toFixed(1)}" fill="#3A1414" ${OL(4)}/>`; }
  if (m === 'smile') return `<path d="M -22 ${y - 5} Q 0 ${y + 14} 22 ${y - 5}" fill="none" ${OL(5)}/>`;
  if (m === 'worried') return `<path d="M -20 ${y + 3} q 7 -9 13 0 q 7 9 13 0 q 7 -9 13 0" fill="none" ${OL(5)}/>`;
  if (m === 'tight') return `<path d="M -16 ${y + 2} Q 0 ${y - 4} 16 ${y + 2}" fill="none" ${OL(5)}/>`;
  return `<path d="M -16 ${y} L 16 ${y}" fill="none" ${OL(5)}/>`;
}
function hairBack(p) {
  if (p.kind === 'pony') return `<path d="M 50 -40 Q 120 -10 104 80 Q 96 120 78 130 Q 92 60 50 10 Z" fill="${p.hair}" ${OL(5)}/><rect x="52" y="-44" width="20" height="16" rx="6" fill="${K.red}" ${OL(3)}/>`;
  if (p.kind === 'curly') return [[-74, 10], [74, 10], [-70, 44], [70, 44]].map(([x, y]) => `<circle cx="${x}" cy="${y}" r="26" fill="${p.hair}" ${OL(5)}/>`).join('');
  return '';
}
function hairFront(p) {
  if (p.kind === 'pony') return `<path d="M -76 0 Q -86 -92 0 -94 Q 84 -92 76 0 Q 66 -54 20 -60 Q -30 -46 -76 0 Z" fill="${p.hair}" ${OL(5)}/><path d="M -36 -78 Q 0 -88 34 -78" fill="none" stroke="#5A3A2E" stroke-width="7" stroke-linecap="round"/>`;
  if (p.kind === 'short') return `<path d="M -74 -10 Q -80 -90 0 -92 Q 80 -90 74 -10 Q 70 -56 40 -62 L -40 -62 Q -70 -56 -74 -10 Z" fill="${p.hair}" ${OL(5)}/><path d="M -40 -78 Q 0 -86 40 -78" fill="none" stroke="#3A3430" stroke-width="7" stroke-linecap="round"/>`;
  if (p.kind === 'curly') {
    let c = '';
    [[-62, -40], [-40, -72], [-8, -84], [26, -80], [56, -60], [70, -26], [-72, -10]].forEach(([x, y]) => { c += `<circle cx="${x}" cy="${y}" r="28" fill="${p.hair}" ${OL(5)}/>`; });
    return c + [[-40, -72], [-8, -84], [26, -80]].map(([x, y]) => `<circle cx="${x + 2}" cy="${y + 2}" r="22" fill="${p.hair}"/>`).join('') + `<path d="M -20 -90 q 10 -8 22 -2" stroke="#B05A38" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  }
  // beanie (blue — the one who shivers)
  return `<path d="M -76 -16 Q -82 -128 0 -132 Q 82 -128 76 -16 Z" fill="${BEANIE}" ${OL(6)}/>
    <path d="M -40 -110 Q 0 -126 40 -110" fill="none" stroke="${BEANIE_HI}" stroke-width="8" stroke-linecap="round"/>
    <rect x="-82" y="-54" width="164" height="38" rx="14" fill="${BEANIE_SH}" ${OL(5)}/>
    <path d="M -56 -50 V -22 M -28 -50 V -22 M 0 -50 V -22 M 28 -50 V -22 M 56 -50 V -22" stroke="${BEANIE}" stroke-width="5"/>
    <path d="M -70 -14 q 6 14 16 10 M 70 -14 q -6 14 -16 10" stroke="${p.hair}" stroke-width="10" fill="none" stroke-linecap="round"/>`;
}
// head centred at 0,0 (face ~150 wide)
export function head(id, o = {}) {
  const p = P[id];
  if (o.back) {
    return `<g transform="rotate(${o.tilt || 0})">${hairBack(p)}
      <circle cx="-72" cy="10" r="16" fill="${p.skinSh}" ${OL(5)}/><circle cx="72" cy="10" r="16" fill="${p.skinSh}" ${OL(5)}/>
      <ellipse cx="0" cy="6" rx="72" ry="84" fill="${p.kind === 'beanie' ? p.skinSh : p.hair}" ${OL(6)}/>
      ${p.kind === 'beanie' ? hairFront(p) : p.kind === 'curly' ? hairFront(p) : `<path d="M -60 -40 Q 0 -70 60 -40" stroke="${p.hairSh}" stroke-width="8" fill="none"/>`}</g>`;
  }
  const cheek = o.cold ? `<ellipse cx="-44" cy="30" rx="16" ry="10" fill="#E46A6A" opacity=".55"/><ellipse cx="44" cy="30" rx="16" ry="10" fill="#E46A6A" opacity=".55"/>` : '';
  return `<g transform="rotate(${o.tilt || 0})">
    ${hairBack(p)}
    <circle cx="-72" cy="10" r="16" fill="${p.skinSh}" ${OL(5)}/><circle cx="72" cy="10" r="16" fill="${p.skinSh}" ${OL(5)}/>
    <ellipse cx="0" cy="6" rx="72" ry="84" fill="${p.skin}" ${OL(6)}/>
    ${cheek}
    <path d="M -2 2 Q -10 24 0 28 Q 8 30 10 24" fill="none" stroke="${p.skinSh}" stroke-width="6" stroke-linecap="round"/>
    ${eyes(o)}${brows(o.brow, p.hairSh)}
    ${mouth(o.mouth || 'flat', o.talk || 0, 52, o.chat || 0)}
    ${hairFront(p)}
  </g>`;
}
// upper-body / full figure. origin = FEET. ~700 units tall at s=1.
// o: aL/aR [upper,fore] degrees, look, brow, mouth, talk, blink, back, sit, walk (phase), lean, hug (arms crossed), hold(x,y)=>svg for right hand, holdL
export function fig(id, x, y, s, o = {}) {
  const p = P[id], sit = !!o.sit;
  const hipY = sit ? -110 : -300, shY = hipY - 210;
  let legs = '';
  if (sit) {
    legs = `<path d="M -110 -40 Q -120 -150 -60 -${110} L 60 -110 Q 120 -150 110 -40 Q 0 -10 -110 -40 Z" fill="${K.pants}" ${OL(6)}/>
      <ellipse cx="-80" cy="-112" rx="44" ry="40" fill="${K.pants}" ${OL(6)}/><ellipse cx="80" cy="-112" rx="44" ry="40" fill="${K.pants}" ${OL(6)}/>
      <ellipse cx="-112" cy="-20" rx="40" ry="24" fill="${K.boot}" ${OL(5)}/><ellipse cx="112" cy="-20" rx="40" ry="24" fill="${K.boot}" ${OL(5)}/>`;
  } else {
    const w = o.walk;
    const sw = w === undefined ? 0 : Math.sin(w) * 22;
    const leg = (sd, a) => {
      const hx = sd * 40, kx = hx + Math.sin(a * Math.PI / 180) * 150, ky = hipY + 150, fx = kx + Math.sin((a * .6) * Math.PI / 180) * 10, fy = -16;
      return limb(`M ${hx} ${hipY} L ${kx.toFixed(1)} ${ky} L ${fx.toFixed(1)} ${fy}`, K.pants, 52) + `<ellipse cx="${(fx + sd * 8).toFixed(1)}" cy="-8" rx="38" ry="18" fill="${K.boot}" ${OL(5)}/>`;
    };
    legs = leg(-1, sw) + leg(1, -sw);
  }
  const aL = o.hug ? [-30, -120] : (o.aL || [8, 4]), aR = o.hug ? [-30, -120] : (o.aR || [8, 4]);
  const L = arm(-92, shY + 26, aL[0], aL[1], -1, 130, 120, p.j, 44), R = arm(92, shY + 26, aR[0], aR[1], 1, 130, 120, p.j, 44);
  const hnd = q => `<circle cx="${q.hx.toFixed(1)}" cy="${q.hy.toFixed(1)}" r="23" fill="${p.skin}" ${OL(5)}/>`;
  const torso = `<path d="M -104 ${shY + 30} Q -106 ${shY - 6} -66 ${shY - 16} L 66 ${shY - 16} Q 106 ${shY - 6} 104 ${shY + 30} L 116 ${hipY + 40} L -116 ${hipY + 40} Z" fill="${p.j}" ${OL(6)}/>
    <path d="M 50 ${shY - 12} Q 106 ${shY - 6} 104 ${shY + 30} L 116 ${hipY + 40} L 74 ${hipY + 40} Z" fill="${p.jSh}"/>
    ${o.back ? `<path d="M -84 ${shY - 14} Q 0 ${shY - 50} 84 ${shY - 14} L 90 ${shY + 50} Q 0 ${shY + 22} -90 ${shY + 50} Z" fill="${p.jSh}" ${OL(5)}/>` : `<path d="M 0 ${shY + 20} V ${hipY + 40}" stroke="${p.jSh}" stroke-width="6"/>
    <path d="M -80 ${shY - 22} Q 0 ${shY + 34} 80 ${shY - 22} L 86 ${shY + 4} Q 0 ${shY + 62} -86 ${shY + 4} Z" fill="${p.jHi}" ${OL(5)}/>`}`;
  const hd = `<g transform="translate(${o.hdx || 0} ${shY - 92 + (o.hdy || 0)})">${head(id, o)}</g>`;
  const arms = o.hug
    ? `<path d="M -96 ${shY + 40} Q -30 ${shY + 150} 70 ${shY + 110}" fill="none" stroke="${K.ol}" stroke-width="56" stroke-linecap="round"/><path d="M -96 ${shY + 40} Q -30 ${shY + 150} 70 ${shY + 110}" fill="none" stroke="${p.j}" stroke-width="44" stroke-linecap="round"/>
       <path d="M 96 ${shY + 40} Q 30 ${shY + 130} -70 ${shY + 96}" fill="none" stroke="${K.ol}" stroke-width="56" stroke-linecap="round"/><path d="M 96 ${shY + 40} Q 30 ${shY + 130} -70 ${shY + 96}" fill="none" stroke="${p.jHi}" stroke-width="44" stroke-linecap="round"/>
       <circle cx="78" cy="${shY + 108}" r="22" fill="${p.skin}" ${OL(5)}/><circle cx="-78" cy="${shY + 94}" r="22" fill="${p.skin}" ${OL(5)}/>`
    : `${o.holdL ? o.holdL(L.hx, L.hy) : ''}${o.holdR ? o.holdR(R.hx, R.hy) : ''}${L.svg}${hnd(L)}${R.svg}${hnd(R)}${o.holdRFront ? o.holdRFront(R.hx, R.hy) : ''}`;
  const sh = o.shiver ? shiver(o.t || 0, o.shiver) : 0;
  return `<g transform="translate(${(x + sh).toFixed(1)} ${y}) rotate(${o.lean || 0}) scale(${s})">
    ${o.noShadow ? '' : `<ellipse cx="0" cy="0" rx="${sit ? 150 : 110}" ry="22" fill="#000" opacity=".35"/>`}
    ${legs}${o.back ? hd : ''}${torso}${o.back ? '' : hd}${arms}
  </g>`;
}
// local shoulder positions of fig() for IK (in fig units, relative to feet)
export const SHOULDER = sit => [92, (sit ? -110 : -300) - 210 + 26];
export const reach = (fx, fy, s, side, tx, ty, sit = false, flip = 1) => { const [sx, sy] = SHOULDER(sit); return ik(side, side * sx, sy, (tx - fx) / s, (ty - fy) / s, 130, 120, flip); };

// ---------- props ----------
// phone; o.screen: svg drawn in local screen coords (-60..60 x -110..110), o.on 0..1, o.torch (flashlight on back)
export function phone(x, y, s, rot, o = {}) {
  const on = o.on ?? 1;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    ${on > 0 && o.glow !== false ? `<ellipse cx="0" cy="0" rx="200" ry="230" fill="url(#fCold)" opacity="${.7 * on}"/>` : ''}
    <rect x="-70" y="-128" width="140" height="256" rx="22" fill="#1A2126" ${OL(6)}/>
    <rect x="-60" y="-112" width="120" height="224" rx="12" fill="${on > 0 ? '#16242C' : K.screenD}"/>
    ${on > 0 ? `<g opacity="${on}">${o.screen || ''}</g>` : ''}
    <rect x="-18" y="-122" width="36" height="6" rx="3" fill="#0B0F12"/>
  </g>`;
}
export function battery(x, y, s, lvl, col = K.red) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-60" y="-26" width="112" height="52" rx="10" fill="none" stroke="#E6EEF2" stroke-width="7"/><rect x="54" y="-11" width="10" height="22" rx="3" fill="#E6EEF2"/>
    <rect x="-52" y="-18" width="${(96 * cl(lvl)).toFixed(1)}" height="36" rx="5" fill="${col}"/></g>`;
}
export function bars(x, y, s, n, col = '#E6EEF2', dim = '#3A4A52') {
  let b = ''; for (let i = 0; i < 4; i++) b += `<rect x="${i * 22}" y="${-14 - i * 14}" width="14" height="${14 + i * 14}" rx="3" fill="${i < n ? col : dim}"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">${b}</g>`;
}
export function pin(x, y, s, col = K.red) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 0 0 C -18 -26 -40 -44 -40 -70 A 40 40 0 1 1 40 -70 C 40 -44 18 -26 0 0 Z" fill="${col}" ${OL(5)}/><circle cx="0" cy="-70" r="15" fill="#F6F1E8"/></g>`;
}
// the generic rescue point sign (owner: small sign with RETTUNGSPUNKT + FR-1234; not a copy of any state's sign)
export function sign(x, y, s, o = {}) {
  const lit = o.lit ?? 1, hi = o.hi ?? -1;
  const code = 'FR-1234';
  let num = '';
  for (let i = 0; i < code.length; i++) {
    const on = hi >= i ? 1 : 0;
    num += `<text x="${-138 + i * 46}" y="62" text-anchor="middle" fill="${on ? K.amb : '#FFFFFF'}" style="font-family:'Inter';font-weight:900;font-size:66px">${code[i]}</text>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})">
    <rect x="-180" y="-110" width="360" height="210" rx="18" fill="${K.green}" ${OL(7)}/>
    <rect x="-166" y="-96" width="332" height="182" rx="12" fill="none" stroke="#FFFFFF" stroke-width="6"/>
    <text x="0" y="-36" text-anchor="middle" fill="#FFFFFF" style="font-family:'Inter';font-weight:900;font-size:34px;letter-spacing:1px">RETTUNGSPUNKT</text>
    ${num}
    <circle cx="-150" cy="-82" r="7" fill="#B8C4CA" ${OL(3)}/><circle cx="150" cy="-82" r="7" fill="#B8C4CA" ${OL(3)}/>
    ${lit < 1 ? `<rect x="-186" y="-116" width="372" height="222" rx="20" fill="#05080A" opacity="${1 - lit}"/>` : ''}
  </g>`;
}
// flashlight; beam to the right of its local axis when on
export function torch(x, y, s, rot, on = 0, len = 700) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    ${on > 0 ? `<polygon points="70,-30 ${len},-${len * .32} ${len},${len * .32} 70,30" fill="url(#fBeam)" opacity="${on}"/><circle cx="74" cy="0" r="46" fill="url(#fAmb)" opacity="${on}"/>` : ''}
    <rect x="-90" y="-22" width="140" height="44" rx="12" fill="#2E3A42" ${OL(6)}/>
    <path d="M 46 -32 L 80 -38 L 80 38 L 46 32 Z" fill="#46545E" ${OL(6)}/>
    <rect x="-40" y="-30" width="30" height="10" rx="4" fill="${on > 0 ? K.amb : '#5A6A74'}" ${OL(3)}/>
    <rect x="76" y="-34" width="10" height="68" fill="${on > 0 ? '#FFF6D8' : '#6A7A84'}"/>
  </g>`;
}
export function backpack(x, y, s, rot = 0, col = '#5A6B3A', sh = '#44522A') {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="-90" y="-120" width="180" height="230" rx="40" fill="${col}" ${OL(6)}/>
    <path d="M 40 -116 Q 90 -110 90 -60 L 90 70 Q 90 110 50 110 Z" fill="${sh}"/>
    <rect x="-64" y="10" width="128" height="80" rx="18" fill="${sh}" ${OL(5)}/>
    <path d="M -50 -120 Q 0 -170 50 -120" fill="none" stroke="${K.ol}" stroke-width="16"/><path d="M -50 -120 Q 0 -170 50 -120" fill="none" stroke="${sh}" stroke-width="8"/>
    <path d="M -64 40 H 64" stroke="${K.ol}" stroke-width="4"/>
  </g>`;
}
// rule card "REGEL n" — mono white on black, amber number; p = pop progress
export function ruleCard(n, x, y, p, s = 1) {
  if (p <= 0) return '';
  const sc = back(cl(p)) * s;
  return `<g transform="translate(${x} ${y}) scale(${sc.toFixed(3)})">
    <rect x="-330" y="-120" width="660" height="240" rx="14" fill="#0B0F12" stroke="${K.amb}" stroke-width="8"/>
    ${TX('REGEL', -60, 52, 128, '#FFFFFF')}
    <rect x="160" y="-90" width="150" height="180" rx="14" fill="${K.amb}"/>
    ${TX(String(n), 235, 58, 150, '#0B0F12')}
  </g>`;
}
// small mono label on a black box (AKKU 4 %, 112, 6× / MIN …)
export function lab(str, cx, cy, sz, p, col = '#FFFFFF', bg = '#0B0F12', border = '') {
  if (p <= 0) return '';
  const w = str.length * sz * .62 + sz * .9, h = sz * 1.4;
  return `<g transform="translate(${cx} ${cy}) scale(${back(cl(p)).toFixed(3)})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="${sz * .18}" fill="${bg}"${border ? ` stroke="${border}" stroke-width="6"` : ''}/>
    ${TX(str, 0, sz * .36, sz, col)}</g>`;
}
// abstract top-down forest map (for Leitstelle screen / search map). o.pin [x,y], o.circle radius
export function forestMap(w, h, seed = 5) {
  let s = `<rect x="0" y="0" width="${w}" height="${h}" fill="#1E3A2C"/>`;
  for (let i = 0; i < 70; i++) s += `<circle cx="${(hash(seed + i) * w).toFixed(1)}" cy="${(hash(seed + i * 3.1) * h).toFixed(1)}" r="${(16 + 26 * hash(i * 1.7)).toFixed(1)}" fill="${i % 3 ? '#24493A' : '#2C5642'}"/>`;
  s += `<path d="M -10 ${h * .7} C ${w * .3} ${h * .62} ${w * .4} ${h * .3} ${w + 10} ${h * .22}" stroke="#C9B98A" stroke-width="10" fill="none"/>`;
  s += `<path d="M ${w * .2} -10 C ${w * .3} ${h * .3} ${w * .6} ${h * .6} ${w * .55} ${h + 10}" stroke="#C9B98A" stroke-width="7" fill="none"/>`;
  s += `<path d="M ${w * .7} ${h + 10} Q ${w * .8} ${h * .6} ${w + 10} ${h * .55}" stroke="#4A90C0" stroke-width="12" fill="none"/>`;
  return s;
}
// a friend seen from straight above (top-down shots)
export function topFig(id, x, y, s, rot = 0, o = {}) {
  const p = P[id];
  const hd = p.kind === 'beanie' ? `<circle cx="0" cy="0" r="38" fill="${BEANIE}" ${OL(5)}/><circle cx="0" cy="-4" r="22" fill="${BEANIE_HI}" opacity=".5"/>`
    : p.kind === 'curly' ? `<circle cx="0" cy="0" r="40" fill="${p.hair}" ${OL(5)}/>${[[-20, -16], [18, -18], [0, 18]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="16" fill="${p.hairSh}" opacity=".5"/>`).join('')}`
    : `<circle cx="0" cy="0" r="38" fill="${p.hair}" ${OL(5)}/>${p.kind === 'pony' ? `<ellipse cx="0" cy="44" rx="12" ry="22" fill="${p.hair}" ${OL(4)}/>` : ''}`;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <ellipse cx="0" cy="8" rx="84" ry="54" fill="#000" opacity=".35"/>
    <ellipse cx="0" cy="0" rx="78" ry="46" fill="${p.j}" ${OL(6)}/>
    <ellipse cx="${o.armL ?? -70}" cy="-26" rx="22" ry="30" fill="${p.jSh}" ${OL(5)}/><ellipse cx="${o.armR ?? 70}" cy="-26" rx="22" ry="30" fill="${p.jSh}" ${OL(5)}/>
    ${hd}
  </g>`;
}
// REGEL card shot: card slams in on "Regel", background gets a slow push; bg = svg string
export function ruleShot(n, t, t0, bg) {
  const p = prog(t, t0 + .02, t0 + .3), [sx, sy] = shk(t, t0 + .3, 12, 8);
  const z = lerp(1.0, 1.06, prog(t, t0, t0 + 1.2));
  return DEFS60 + `<g transform="translate(${540 + sx} ${900 + sy}) scale(${z}) translate(-540 -900)">${bg}</g>
    <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".45"/>
    ${ruleCard(n, 540 + sx, 760 + sy, p, 1.2)}
    ${rings(t, t0 + .3, 540, 760, K.amb, 2, 420, 8)}
    ${FG(1380)}`;
}
