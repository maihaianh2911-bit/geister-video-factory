// @ts-nocheck
// AUTO-GENERATED scene for v18. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// v18 — Elf Tage ohne Schlaf (Randy Gardner). Flat outlined 2D explainer, natural proportions.
const K = {
  ol: '#161a22', skin: '#e9b48e', skinSh: '#c78b67',
  sw: 'url(#v18plaid)', swL: 'url(#v18plaidL)', swSh: '#a8741a', pants: '#2a2e3a', shoe: '#17181d',
  wall: '#8ea4b2', wallTop: '#73899a', trim: '#e3e8eb', floor: '#6e4b33', floorSh: '#583b28',
  wood: '#8b5a3a', woodHi: '#a8714b', woodSh: '#673f27',
  board: '#2d473b', boardHi: '#3a5a4b', chalk: '#eef1e6', red: '#e5483b', gold: '#f2c14e',
  night: '#0e1628', sheet: '#e5eaf0', sheetSh: '#b9c4d2', blanket: '#3f6fa8', blanketSh: '#2e5486', blanketHi: '#5d8cc4',
  dream: '#b9a2ff', ink: '#0b111d'
};
const OL = `stroke="${K.ol}" stroke-width="5" stroke-linejoin="round" stroke-linecap="round"`;
const FONT = `font-family:'Inter';font-weight:900`;
let UID = 0;
const uid = () => `v18u${UID++}`;
const hx = c => [parseInt(c.slice(1, 3), 16), parseInt(c.slice(3, 5), 16), parseInt(c.slice(5, 7), 16)];
function mix(a, b, p) {
  const A = hx(a), B = hx(b), q = cl(p);
  return '#' + A.map((v, i) => Math.round(v + (B[i] - v) * q).toString(16).padStart(2, '0')).join('');
}
function txt(s, x, y, size, fill = '#fff', o = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${fill}" opacity="${o.op ?? 1}" stroke="${o.st || K.ink}" stroke-width="${o.sw ?? 12}" paint-order="stroke" stroke-linejoin="round" style="${FONT};font-size:${size}px;letter-spacing:${o.ls || 0}px">${s}</text>`;
}
function popAt(t, t0, cx, cy, inner, d = .3) {
  const p = back(prog(t, t0, t0 + d));
  if (p <= 0) return '';
  return `<g transform="translate(${cx} ${cy}) scale(${p}) translate(${-cx} ${-cy})">${inner}</g>`;
}
// slam: big -> settle with a little shake
function slamAt(t, t0, cx, cy, inner) {
  if (t < t0) return '';
  const p = eout(prog(t, t0, t0 + .18)), sc = lerp(1.7, 1, p) + .04 * ring(t, t0 + .18, 4, 9);
  return `<g transform="translate(${cx} ${cy}) scale(${sc}) translate(${-cx} ${-cy})" opacity="${cl(p * 3)}">${inner}</g>`;
}
function tag(t, t0, label) {
  const p = back(prog(t, t0, t0 + .3));
  if (p <= 0) return '';
  return `<g transform="translate(${lerp(-320, 0, p)} 0)">
    <rect x="60" y="150" width="${label.length * 46 + 70}" height="104" rx="16" fill="${K.ink}" opacity=".82"/>
    <rect x="60" y="150" width="12" height="104" fill="${K.red}"/>
    ${txt(label, 100, 226, 74, '#f4f4f0', { a: 'start', sw: 0 })}</g>`;
}
const shakeXY = (t, t0, a, d) => t < t0 ? [0, 0] : [a * Math.exp(-(t - t0) * d) * Math.sin((t - t0) * 83), a * Math.exp(-(t - t0) * d) * Math.cos((t - t0) * 61)];
function cam(inner, sc = 1, fx = 540, fy = 960, dx = 0, dy = 0) {
  return `<g transform="translate(${540 + dx} ${960 + dy}) scale(${sc}) translate(${-fx} ${-fy})">${inner}</g>`;
}
const blinkAt = (t, sd = 0) => { const k = (t + sd) % 3.4; return k > 3.22 ? Math.sin((k - 3.22) / .18 * Math.PI) : 0; };

// ---------- characters ----------
const WHO = {
  randy: { skin: K.skin, skinSh: K.skinSh, hair: '#b4532a', hairHi: '#d06d3c', top: K.sw, topSh: K.swSh, pants: K.pants, style: 'randy' },
  old: { skin: '#e3ad89', skinSh: '#bf8562', hair: '#cdd1d6', hairHi: '#eef0f2', top: 'url(#v18plaidO)', topSh: '#7d6c40', pants: '#3a3f4d', style: 'old' },
  fA: { skin: '#f0c4a2', skinSh: '#cf9c7a', hair: '#e0b65a', hairHi: '#f0d184', top: '#2f8c86', topSh: '#226a65', pants: '#4b3c31', style: 'fA' },
  fB: { skin: '#a5704c', skinSh: '#83583a', hair: '#19130f', hairHi: '#3a2c22', top: '#6c4fa3', topSh: '#523b7d', pants: '#283048', style: 'fB' },
  dem: { skin: '#ebba98', skinSh: '#c98f6c', hair: '#3a2f29', hairHi: '#8f8a86', top: '#4b5468', topSh: '#3a4153', pants: '#3a4153', style: 'dem', suit: 1, glasses: 1 }
};
const HAIR = {
  randy: 'M -68 -2 Q -82 -74 -40 -98 Q -8 -116 22 -110 Q 30 -136 66 -124 Q 50 -116 52 -100 Q 84 -78 70 -2 Q 68 -40 56 -56 Q 24 -36 -12 -52 Q -40 -60 -56 -40 Q -66 -26 -68 -2 Z',
  old: 'M -68 -2 Q -80 -70 -40 -94 Q -6 -110 24 -104 Q 34 -118 56 -112 Q 48 -104 50 -96 Q 82 -76 70 -2 Q 68 -40 56 -54 Q 26 -40 -10 -54 Q -40 -60 -56 -40 Q -66 -26 -68 -2 Z',
  fA: 'M -70 4 Q -90 -28 -72 -56 Q -80 -94 -44 -102 Q -22 -126 4 -110 Q 32 -128 54 -104 Q 90 -96 78 -60 Q 92 -28 70 4 Q 66 -38 44 -50 Q 22 -40 0 -54 Q -22 -40 -46 -52 Q -64 -38 -70 4 Z',
  fB: 'M -66 -24 L -62 -134 Q 0 -150 62 -134 L 66 -24 Q 50 -64 0 -68 Q -50 -64 -66 -24 Z',
  dem: 'M -68 -12 Q -74 -88 -8 -102 Q 68 -100 70 -12 Q 66 -54 52 -64 Q 14 -80 -22 -70 Q -54 -66 -64 -38 Z'
};
function head(w, o = {}) {
  const lid = cl(o.lid || 0), red = o.red || 0, lx = o.lx || 0, ly = o.ly || 0, ol = K.ol;
  const eye = ex => {
    const h = Math.max(1.4, 10.5 * (1 - lid)), cy = -4 + 5 * lid;
    let s = `<ellipse cx="${ex}" cy="${cy}" rx="14" ry="${h}" fill="${mix('#f7f4ee', '#f0aaa2', red * .8)}" stroke="${ol}" stroke-width="3.5"/>`;
    if (red > .2 && h > 4) s += `<path d="M ${ex - 13} ${cy + 1} l 6 -1 M ${ex + 13} ${cy} l -6 2" stroke="#d0473f" stroke-width="2" opacity="${red}"/>`;
    if (h > 2.6) s += `<circle cx="${ex + lx}" cy="${cy + ly * .5}" r="${Math.min(5.8, h * .75)}" fill="${ol}"/>`;
    s += `<path d="M ${ex - 16} ${cy + 1} Q ${ex} ${cy - h - 4} ${ex + 16} ${cy + 1}" fill="none" stroke="${ol}" stroke-width="${4.5 + 2.5 * lid}" stroke-linecap="round"/>`;
    if (o.bags) s += `<path d="M ${ex - 13} ${cy + h + 5} Q ${ex} ${cy + h + 12} ${ex + 13} ${cy + h + 5}" fill="none" stroke="${w.skinSh}" stroke-width="4" stroke-linecap="round" opacity="${o.bags}"/>`;
    return s;
  };
  const B = { n: [-31, -34, -31], tired: [-36, -32, -25], angry: [-21, -30, -35], up: [-42, -46, -40], conf: [-42, -46, -38], soft: [-33, -36, -31] }[o.brow || 'n'];
  const B2 = o.brow === 'conf' ? [-24, -30, -32] : B;
  const brow = (sd, b) => `<path d="M ${sd * 12} ${b[0]} Q ${sd * 27} ${b[1]} ${sd * 42} ${b[2]}" fill="none" stroke="${w.style === 'old' ? '#9aa0a6' : w.hair}" stroke-width="7.5" stroke-linecap="round"/>`;
  const M = {
    n: `<path d="M -15 50 Q 0 52 15 50" fill="none" stroke="${ol}" stroke-width="4.5" stroke-linecap="round"/>`,
    tired: `<path d="M -18 53 Q 0 45 18 53" fill="none" stroke="${ol}" stroke-width="4.5" stroke-linecap="round"/>`,
    smile: `<path d="M -21 45 Q 0 60 21 45" fill="none" stroke="${ol}" stroke-width="4.5" stroke-linecap="round"/>`,
    o: `<ellipse cx="0" cy="51" rx="8" ry="10" fill="#4a1d1a" stroke="${ol}" stroke-width="3.5"/>`,
    grim: `<path d="M -20 52 L 20 52 M -20 52 l -4 5 M 20 52 l 4 5" fill="none" stroke="${ol}" stroke-width="4.5" stroke-linecap="round"/>`,
    open: `<path d="M -16 46 Q 0 44 16 46 Q 12 64 0 64 Q -12 64 -16 46 Z" fill="#4a1d1a" stroke="${ol}" stroke-width="3.5"/>`,
    yawn: `<ellipse cx="0" cy="54" rx="13" ry="18" fill="#4a1d1a" stroke="${ol}" stroke-width="3.5"/>`
  }[o.mouth || 'n'];
  const helmet = o.helmet ? `<path d="M -76 20 Q -84 -104 0 -108 Q 84 -104 76 20 L 60 22 Q 60 -40 0 -44 Q -60 -40 -60 22 Z" fill="#c8322b" ${OL}/>
    <path d="M -6 -106 L -6 -46 M 6 -106 L 6 -46" stroke="#f4f0e6" stroke-width="6"/>
    <path d="M -58 24 Q 0 40 58 24 M -54 46 Q 0 64 54 46 M 0 30 L 0 70" fill="none" stroke="#c9ccd2" stroke-width="7" stroke-linecap="round"/>` : '';
  return `<g>
    <ellipse cx="-64" cy="6" rx="12" ry="20" fill="${w.skinSh}" stroke="${ol}" stroke-width="4"/><ellipse cx="64" cy="6" rx="12" ry="20" fill="${w.skinSh}" stroke="${ol}" stroke-width="4"/>
    <path d="M -64 -10 Q -64 66 0 84 Q 64 66 64 -10 Q 64 -82 0 -84 Q -64 -82 -64 -10 Z" fill="${w.skin}" ${OL}/>
    ${o.flush ? `<ellipse cx="-36" cy="26" rx="16" ry="9" fill="#e0675a" opacity="${o.flush * .5}"/><ellipse cx="36" cy="26" rx="16" ry="9" fill="#e0675a" opacity="${o.flush * .5}"/>` : ''}
    ${o.helmet ? '' : `<path d="${HAIR[w.style]}" fill="${w.hair}" ${OL}/>`}
    ${w.style === 'dem' ? `<path d="M -62 -30 Q -60 -10 -60 0 M 62 -30 Q 60 -10 60 0" stroke="${w.hairHi}" stroke-width="7" fill="none"/>` : ''}
    ${w.style === 'old' ? `<path d="M -30 -60 Q 0 -66 30 -60 M -24 -50 Q 0 -54 24 -50 M -52 4 l -10 -4 M -52 12 l -10 2 M 52 4 l 10 -4 M 52 12 l 10 2 M -30 34 Q -36 48 -28 60 M 30 34 Q 36 48 28 60" stroke="${w.skinSh}" stroke-width="3.5" fill="none" stroke-linecap="round"/>` : ''}
    ${eye(-27)}${eye(27)}${brow(-1, B)}${brow(1, B2)}
    <path d="M -2 4 Q -9 24 -3 30 Q 4 32 9 28" fill="none" stroke="${w.skinSh}" stroke-width="4" stroke-linecap="round"/>
    ${M}
    ${w.glasses ? `<g fill="none" stroke="${ol}" stroke-width="4.5"><rect x="-48" y="-18" width="40" height="30" rx="9"/><rect x="8" y="-18" width="40" height="30" rx="9"/><path d="M -8 -6 Q 0 -10 8 -6 M -48 -8 L -62 -10 M 48 -8 L 62 -10"/></g>` : ''}
    ${helmet}
  </g>`;
}
function ik(sd, tx, ty, sh) {
  const sx = sd * 80, sy = sh + 24, L = 162;
  let dx = tx - sx, dy = ty - sy, d = Math.hypot(dx, dy);
  if (d > 2 * L - 1) { dx *= (2 * L - 1) / d; dy *= (2 * L - 1) / d; d = 2 * L - 1; }
  if (d < 40) d = 40;
  const th = Math.atan2(-dx, dy), al = Math.acos(cl(d / (2 * L), -1, 1));
  let best = null;
  for (const sg of [1, -1]) {
    const t1 = th + sg * al, t2 = th - sg * al;
    const ex = sx - L * Math.sin(t1);
    if (!best || ex * sd > best.ex * sd) best = { ex, t1, t2 };
  }
  const D = 180 / Math.PI;
  return [-sd * best.t1 * D, -sd * (best.t2 - best.t1) * D];
}
// full-body person, origin at the feet, ~1000 units tall at s=1
function human(x, y, s, who, o = {}) {
  const w = Object.assign({}, WHO[who], o.top ? { top: o.top, topSh: o.top } : {});
  const sit = o.sit, hip = sit ? -262 : -470, sh = hip - 318;
  let aL = o.aL ?? 6, bL = o.bL ?? 4, aR = o.aR ?? 6, bR = o.bR ?? 4;
  if (o.hL) [aL, bL] = ik(-1, o.hL[0], o.hL[1], sh);
  if (o.hR) [aR, bR] = ik(1, o.hR[0], o.hR[1], sh);
  const arm = (sd, a, b, prop) => `<g transform="translate(${sd * 80} ${sh + 24}) rotate(${-sd * a})">
      <rect x="-21" y="-16" width="42" height="186" rx="20" fill="${w.top}" ${OL}/>
      <g transform="translate(0 162) rotate(${-sd * b})">
        <rect x="-18" y="-12" width="36" height="164" rx="17" fill="${w.top}" ${OL}/>
        ${w.suit ? `<rect x="-15" y="134" width="30" height="14" fill="#f1f1ee" stroke="${K.ol}" stroke-width="3"/>` : `<path d="M -17 136 L 17 136" stroke="${w.topSh}" stroke-width="5"/>`}
        <g transform="translate(0 164)">${prop || ''}<ellipse cx="0" cy="6" rx="19" ry="24" fill="${w.skin}" ${OL}/><ellipse cx="${-sd * 15}" cy="-4" rx="7" ry="12" fill="${w.skin}" stroke="${K.ol}" stroke-width="4" transform="rotate(${sd * 28} ${-sd * 15} -4)"/></g>
      </g></g>`;
  const legL = o.legL || 0, legR = o.legR || 0;
  const leg = (sd, ang) => sit
    ? `<g transform="translate(${sd * 40} ${hip + 30})"><rect x="-27" y="-10" width="54" height="${-hip - 34}" rx="22" fill="${w.pants}" ${OL}/><ellipse cx="${sd * 10}" cy="${-hip - 40}" rx="38" ry="17" fill="${K.shoe}" ${OL}/></g><rect x="${sd * 40 - 32}" y="${hip - 24}" width="64" height="66" rx="28" fill="${w.pants}" ${OL}/>`
    : `<g transform="translate(${sd * 36} ${hip}) rotate(${ang})"><rect x="-28" y="-20" width="56" height="${-hip - 6}" rx="24" fill="${w.pants}" ${OL}/><ellipse cx="${sd * 10}" cy="${-hip - 8}" rx="38" ry="18" fill="${K.shoe}" ${OL}/></g>`;
  const torso = `<path d="M -86 ${sh + 44} Q -86 ${sh + 2} -48 ${sh - 2} L 48 ${sh - 2} Q 86 ${sh + 2} 86 ${sh + 44} L 76 ${hip + 12} Q 0 ${hip + 24} -76 ${hip + 12} Z" fill="${w.top}" ${OL}/>
    ${w.suit ? `<path d="M -30 ${sh - 2} L 0 ${sh + 110} L 30 ${sh - 2} Z" fill="#f1f1ee" ${OL}/><path d="M -9 ${sh + 8} L 9 ${sh + 8} L 12 ${sh + 90} L 0 ${sh + 108} L -12 ${sh + 90} Z" fill="#7a2b2b" stroke="${K.ol}" stroke-width="4"/><path d="M -30 ${sh} L -6 ${sh + 120} M 30 ${sh} L 6 ${sh + 120} M 0 ${sh + 150} v 0 M 0 ${sh + 200} v 0" stroke="${K.ol}" stroke-width="5" fill="none"/><circle cx="0" cy="${sh + 170}" r="5" fill="${K.ol}"/><circle cx="0" cy="${sh + 230}" r="5" fill="${K.ol}"/>`
      : `<path d="M -74 ${hip - 6} Q 0 ${hip + 6} 74 ${hip - 6}" stroke="${w.topSh}" stroke-width="7" fill="none"/><path d="M -40 ${sh - 2} Q 0 ${sh + 30} 40 ${sh - 2}" fill="${w.topSh}" stroke="${K.ol}" stroke-width="4"/>`}`;
  const neck = `<rect x="-21" y="${sh - 52}" width="42" height="60" fill="${w.skinSh}" ${OL}/>`;
  const hd = `<g transform="translate(0 ${sh - 118 + (o.headDy || 0)}) rotate(${o.headTilt || 0} 0 70)">${head(w, o)}</g>`;
  const shadow = o.noShadow ? '' : `<ellipse cx="0" cy="0" rx="${sit ? 150 : 120}" ry="20" fill="#000" opacity=".28"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s * (o.flip ? -1 : 1)} ${s * (o.sy || 1)})">${shadow}
    ${o.noLegs ? '' : leg(-1, legL) + leg(1, legR)}
    <g transform="rotate(${o.lean || 0} 0 ${hip})">
      ${o.behind || ''}${neck}${torso}${hd}${o.under || ''}
      ${arm(-1, aL, bL, o.pL)}${arm(1, aR, bR, o.pR)}${o.over || ''}
    </g></g>`;
}

// ---------- props & sets ----------
function clock(cx, cy, r, hAng, mAng, o = {}) {
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ticks += `<line x1="${cx + Math.sin(a) * r * .78}" y1="${cy - Math.cos(a) * r * .78}" x2="${cx + Math.sin(a) * r * .9}" y2="${cy - Math.cos(a) * r * .9}" stroke="${K.ol}" stroke-width="${i % 3 ? 3 : 6}"/>`; }
  return `<g><circle cx="${cx}" cy="${cy + 6}" r="${r + 8}" fill="#000" opacity=".18"/><circle cx="${cx}" cy="${cy}" r="${r}" fill="${o.face || '#f3f1ea'}" stroke="${o.rim || '#2c2f36'}" stroke-width="${r * .12}"/>${ticks}
    <line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(hAng * Math.PI / 180) * r * .5}" y2="${cy - Math.cos(hAng * Math.PI / 180) * r * .5}" stroke="${K.ol}" stroke-width="${r * .09}" stroke-linecap="round"/>
    <line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(mAng * Math.PI / 180) * r * .74}" y2="${cy - Math.cos(mAng * Math.PI / 180) * r * .74}" stroke="${K.ol}" stroke-width="${r * .06}" stroke-linecap="round"/>
    <circle cx="${cx}" cy="${cy}" r="${r * .07}" fill="${K.red}"/></g>`;
}
function blindsWin(x, y, w, h, sky, o = {}) {
  let sl = '';
  const n = Math.floor(h / 24), open = o.open ?? .55;
  for (let i = 0; i < n; i++) sl += `<rect x="${x + 8}" y="${y + 8 + i * 24}" width="${w - 16}" height="${24 * (1 - open) + 6}" fill="${o.slat || '#d6dde2'}"/>`;
  return `<g><rect x="${x - 14}" y="${y + h - 4}" width="${w + 28}" height="18" rx="4" fill="${K.trim}" ${OL}/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${sky}" stroke="${K.trim}" stroke-width="14"/>
    ${o.inside || ''}${sl}
    <line x1="${x + w / 2}" y1="${y}" x2="${x + w / 2}" y2="${y + h}" stroke="${K.trim}" stroke-width="10"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="none" stroke="${K.ol}" stroke-width="5"/>
    <line x1="${x + w - 30}" y1="${y + 10}" x2="${x + w - 30}" y2="${y + h * .7}" stroke="#c5cdd3" stroke-width="3"/></g>`;
}
function palm(x, y, s, t) {
  const sw = 4 * Math.sin(t * 1.3 + x);
  let fr = '';
  for (let i = 0; i < 7; i++) {
    const a = -170 + i * 28 + sw;
    fr += `<path d="M 0 0 Q ${Math.cos(a * Math.PI / 180) * 90} ${Math.sin(a * Math.PI / 180) * 90 - 30} ${Math.cos(a * Math.PI / 180) * 170} ${Math.sin(a * Math.PI / 180) * 170 + 50}" fill="none" stroke="#2f7a46" stroke-width="22" stroke-linecap="round"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -14 0 Q -30 -300 ${10 + sw} -560 L ${30 + sw} -560 Q 0 -300 14 0 Z" fill="#8a6a48" ${OL}/>
    <g transform="translate(${20 + sw} -560)">${fr}<circle cx="0" cy="6" r="16" fill="#5a3f28"/></g></g>`;
}
// room set: wall, blinds window left, wall clock, chalkboard, bed, desk
function room(t, o = {}) {
  const sky = o.sky || '#9fd2ee';
  const gid = uid();
  let planks = '';
  for (let i = 0; i < 9; i++) planks += `<line x1="${-60 + i * 150}" y1="1190" x2="${-420 + i * 240}" y2="1920" stroke="${K.floorSh}" stroke-width="5"/>`;
  return `<defs><linearGradient id="${gid}" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${K.wallTop}"/><stop offset="1" stop-color="${K.wall}"/></linearGradient></defs>
    <rect x="-40" y="-40" width="1160" height="1240" fill="url(#${gid})"/>
    <rect x="-40" y="1188" width="1160" height="780" fill="${K.floor}"/>${planks}
    <rect x="-40" y="1168" width="1160" height="26" fill="${K.trim}" ${OL}/>
    ${o.noWin ? '' : blindsWin(o.winX ?? 70, 300, 300, 440, sky, { open: o.open, inside: o.winIn })}
    ${o.clock ? clock(o.clock[0], o.clock[1], o.clock[2], o.clock[3], o.clock[4]) : ''}
    ${o.boardX != null ? chalkboard(o.boardX, 340, 360, 300, o.chalk || '') : ''}
    ${o.poster || ''}`;
}
function chalkboard(x, y, w, h, inner) {
  return `<g><rect x="${x - 16}" y="${y - 16}" width="${w + 32}" height="${h + 32}" rx="8" fill="${K.wood}" ${OL}/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${K.board}" stroke="${K.woodSh}" stroke-width="4"/>
    <path d="M ${x + 20} ${y + 40} Q ${x + w / 2} ${y + 10} ${x + w - 30} ${y + 60}" stroke="${K.boardHi}" stroke-width="30" fill="none" opacity=".5"/>
    ${inner}
    <rect x="${x - 6}" y="${y + h + 12}" width="${w + 12}" height="14" rx="4" fill="${K.woodSh}"/><rect x="${x + w - 70}" y="${y + h + 4}" width="30" height="10" rx="3" fill="${K.chalk}"/></g>`;
}
function bedSide(x0, x1, y, o = {}) {
  // bed seen from the side: headboard on the left
  return `<g><rect x="${x0 - 30}" y="${y - 250}" width="40" height="${330}" rx="10" fill="${K.wood}" ${OL}/>
    <rect x="${x1 - 10}" y="${y - 120}" width="36" height="200" rx="10" fill="${K.wood}" ${OL}/>
    <rect x="${x0}" y="${y}" width="${x1 - x0}" height="70" fill="${K.woodSh}" ${OL}/>
    <rect x="${x0}" y="${y - 80}" width="${x1 - x0}" height="86" rx="18" fill="${K.sheet}" ${OL}/>
    <rect x="${x0 + 10}" y="${y + 70}" width="22" height="80" fill="${K.woodSh}" ${OL}/><rect x="${x1 - 30}" y="${y + 70}" width="22" height="80" fill="${K.woodSh}" ${OL}/>
    ${o.pillow === false ? '' : `<path d="M ${x0 + 14} ${y - 70} Q ${x0 + 10} ${y - 140} ${x0 + 90} ${y - 140} L ${x0 + 200} ${y - 136} Q ${x0 + 250} ${y - 120} ${x0 + 236} ${y - 76} Z" fill="#f4f6f9" ${OL}/>`}</g>`;
}
function desk(x, y, w) {
  return `<g><rect x="${x}" y="${y}" width="${w}" height="30" rx="6" fill="${K.woodHi}" ${OL}/>
    <rect x="${x + 20}" y="${y + 30}" width="26" height="${1250 - y}" fill="${K.woodSh}" ${OL}/><rect x="${x + w - 46}" y="${y + 30}" width="26" height="${1250 - y}" fill="${K.woodSh}" ${OL}/>
    <rect x="${x + w - 190}" y="${y + 30}" width="150" height="120" fill="${K.wood}" ${OL}/><circle cx="${x + w - 115}" cy="${y + 90}" r="7" fill="${K.gold}"/></g>`;
}
function chair(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-110" y="-610" width="220" height="330" rx="18" fill="${K.wood}" ${OL}/><rect x="-80" y="-580" width="160" height="40" rx="8" fill="${K.woodSh}"/>
    <rect x="-130" y="-290" width="260" height="40" rx="10" fill="${K.woodHi}" ${OL}/><rect x="-118" y="-250" width="24" height="250" fill="${K.woodSh}" ${OL}/><rect x="94" y="-250" width="24" height="250" fill="${K.woodSh}" ${OL}/></g>`;
}
function clipboard(w = 120, h = 160, scribble = 0) {
  let l = '';
  for (let i = 0; i < 5; i++) { const ww = (w - 40) * (i < 4 ? 1 : cl(scribble)); l += `<line x1="${-w / 2 + 20}" y1="${-h / 2 + 50 + i * 22}" x2="${-w / 2 + 20 + ww}" y2="${-h / 2 + 50 + i * 22}" stroke="#7c8796" stroke-width="5" stroke-linecap="round"/>`; }
  return `<g><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="8" fill="#9b6a43" ${OL}/><rect x="${-w / 2 + 10}" y="${-h / 2 + 18}" width="${w - 20}" height="${h - 28}" fill="#f6f4ee"/>
    <rect x="-24" y="${-h / 2 - 8}" width="48" height="22" rx="5" fill="#b8bec7" ${OL}/>${l}</g>`;
}
const pen = (len = 70, col = '#2b3a67') => `<g><line x1="0" y1="-8" x2="0" y2="${len}" stroke="${K.ol}" stroke-width="13" stroke-linecap="round"/><line x1="0" y1="-8" x2="0" y2="${len}" stroke="${col}" stroke-width="7" stroke-linecap="round"/></g>`;
const chalkStick = () => `<rect x="-7" y="10" width="14" height="44" rx="4" fill="${K.chalk}" stroke="${K.ol}" stroke-width="3"/>`;
function zzz(t, x, y, t0) {
  let s = '';
  for (let i = 0; i < 3; i++) {
    const p = ((t - t0) * .5 + i / 3) % 1;
    if (t < t0) break;
    s += txt('Z', x + 60 * p + 14 * Math.sin(p * 9), y - 220 * p, 50 + 40 * p, '#e8eefb', { op: Math.sin(p * Math.PI) * .9, sw: 8 });
  }
  return s;
}
function bubble(t, t0, t1, cx, cy, rx, ry, inner, dots) {
  if (t < t0 || t > t1 + .25) return '';
  const id = uid(), pop = prog(t, t1, t1 + .2);
  const bs = back(prog(t, t0 + .22, t0 + .5)) * (1 + .1 * eout(pop));
  const path = scallop(0, 0, rx, ry, 14);
  let dd = '';
  if (pop <= 0) dots.forEach(([x, y, r], i) => { dd += `<circle cx="${x}" cy="${y}" r="${r * back(prog(t, t0 + i * .07, t0 + i * .07 + .16))}" fill="#f2efff" stroke="${K.ol}" stroke-width="5"/>`; });
  let burst = '';
  if (pop > 0) for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2, rr = lerp(rx * .8, rx * 1.3, eout(pop)); burst += `<circle cx="${cx + rr * Math.cos(a)}" cy="${cy + rr * Math.sin(a) * ry / rx}" r="${18 * (1 - pop)}" fill="#f2efff"/>`; }
  return `${dd}${pop < 1 ? `<g transform="translate(${cx} ${cy}) scale(${bs * (1 - pop)})">
    <path d="${path}" fill="#000" opacity=".3" transform="translate(0 16)"/>
    <clipPath id="${id}"><path d="${path}"/></clipPath><g clip-path="url(#${id})">${inner}</g>
    <path d="${path}" fill="none" stroke="#f2efff" stroke-width="14"/><path d="${path}" fill="none" stroke="${K.ol}" stroke-width="5"/></g>` : ''}${burst}`;
}
function qmark(t, t0, x, y, size = 170) {
  return popAt(t, t0, x, y - size * .35, `<g transform="rotate(${8 * Math.sin((t - t0) * 3)} ${x} ${y})">${txt('?', x, y, size, K.gold, { sw: 14 })}</g>`);
}
function streetSign(x, y, s, wob = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${wob} 0 0)"><rect x="-10" y="-760" width="20" height="760" fill="#9aa3ad" ${OL}/>
    <g transform="translate(0 -760)"><rect x="-95" y="-95" width="190" height="190" rx="14" fill="#2c6fd1" stroke="#f4f6f8" stroke-width="10"/><rect x="-95" y="-95" width="190" height="190" rx="14" fill="none" ${OL}/>
    <path d="M -70 60 L 70 60 L 0 -70 Z" fill="#f4f6f8" stroke="${K.ol}" stroke-width="4"/>
    <circle cx="0" cy="-14" r="10" fill="${K.ol}"/><path d="M 0 -2 L -6 26 M 0 4 L 14 16 M -6 26 L -16 46 M -6 26 L 8 46" stroke="${K.ol}" stroke-width="7" stroke-linecap="round"/></g></g>`;
}
function street(t, o = {}) {
  const fl = o.flicker || 0;
  let win = '';
  for (let b = 0; b < 4; b++) for (let r = 0; r < 4; r++) for (let c = 0; c < 2; c++) {
    const on = hash(b * 31 + r * 7 + c) > .45;
    const wob = (o.warp || 0) * 14 * Math.sin(t * 5 + r + b);
    if (on) win += `<rect x="${b * 280 + 40 + c * 70 + wob}" y="${560 + r * 90 - (b % 2) * 120}" width="40" height="52" fill="#e9b85a" opacity=".55"/>`;
  }
  const lampA = 1 - fl;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${o.bg || '#0f1830'}"/>
    ${[0, 1, 2, 3].map(b => `<rect x="${b * 280 + 10}" y="${520 - (b % 2) * 120}" width="250" height="760" fill="${b % 2 ? '#18223a' : '#141d33'}" ${OL}/>`).join('')}
    ${win}
    <rect x="-40" y="1270" width="1160" height="130" fill="#2b3346" ${OL}/>
    <rect x="-40" y="1395" width="1160" height="600" fill="#1a2030"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${i * 260 - 40}" y="1560" width="140" height="16" fill="#c9a94c" opacity=".7"/>`).join('')}
    <g><rect x="${(o.lampX ?? 150) - 9}" y="430" width="18" height="900" fill="#3a404c" ${OL}/>
      <rect x="${(o.lampX ?? 150) - 34}" y="380" width="68" height="70" rx="10" fill="${mix('#4a4a4a', '#ffe2a0', lampA)}" ${OL}/>
      <polygon points="${(o.lampX ?? 150) - 30},450 ${(o.lampX ?? 150) + 30},450 ${(o.lampX ?? 150) + 260},1330 ${(o.lampX ?? 150) - 260},1330" fill="#ffd27a" opacity="${.13 * lampA}"/>
      <ellipse cx="${o.lampX ?? 150}" cy="1340" rx="260" ry="40" fill="#ffd27a" opacity="${.12 * lampA}"/></g>`;
}
function stopwatch(cx, cy, r, ang) {
  return `<g><rect x="${cx - 22}" y="${cy - r - 44}" width="44" height="34" rx="8" fill="#c9ccd2" ${OL}/><circle cx="${cx}" cy="${cy}" r="${r}" fill="#f3f1ea" stroke="#c9ccd2" stroke-width="${r * .14}"/><circle cx="${cx}" cy="${cy}" r="${r * 1.07}" fill="none" ${OL}/>
    <line x1="${cx}" y1="${cy}" x2="${cx + Math.sin(ang) * r * .78}" y2="${cy - Math.cos(ang) * r * .78}" stroke="${K.red}" stroke-width="${r * .07}" stroke-linecap="round"/><circle cx="${cx}" cy="${cy}" r="${r * .08}" fill="${K.ol}"/></g>`;
}
function bigEye(cx, cy, r, open, red) {
  const h = Math.max(2, r * .55 * open);
  return `<g><path d="M ${cx - r} ${cy} Q ${cx} ${cy - h * 1.6} ${cx + r} ${cy} Q ${cx} ${cy + h * 1.6} ${cx - r} ${cy} Z" fill="${mix('#f7f4ee', '#f2b0a8', red)}" ${OL}/>
    ${h > 8 ? `<circle cx="${cx}" cy="${cy}" r="${Math.min(r * .32, h * .9)}" fill="#5a3b26" stroke="${K.ol}" stroke-width="4"/><circle cx="${cx}" cy="${cy}" r="${Math.min(r * .15, h * .5)}" fill="${K.ol}"/>` : ''}
    ${red > .2 ? `<path d="M ${cx - r * .85} ${cy - 4} l ${r * .25} 6 M ${cx + r * .85} ${cy + 3} l ${-r * .22} -8" stroke="#cf3f37" stroke-width="3" opacity="${red}"/>` : ''}
    <path d="M ${cx - r - 6} ${cy + 2} Q ${cx} ${cy - h * 1.75} ${cx + r + 6} ${cy + 2}" fill="none" stroke="${K.ol}" stroke-width="9" stroke-linecap="round"/></g>`;
}

// ---------- shots ----------
// 0–3.5 hook: extreme close-up of tired eyes, calendar rips to day 11
function sHook(t) {
  let lid;
  if (t < .58) lid = .8;
  else if (t < .7) lid = lerp(.8, 0, eout(prog(t, .58, .66)));
  else if (t < 2.28) lid = lerp(0, .68, eio(prog(t, .8, 2.25)));
  else lid = lerp(.68, .08, eout(prog(t, 2.28, 2.42))) + .3 * prog(t, 2.7, 3.5);
  const nod = t < 2.28 ? 22 * ein(prog(t, 1.55, 2.25)) : 22 * (1 - eout(prog(t, 2.28, 2.42)));
  const [sx, sy] = shakeXY(t, .58, 14, 8);
  const [jx, jy] = shakeXY(t, 2.3, 9, 9);
  const f = 10 * ein(prog(t, 0, .56)), n = Math.min(11, Math.floor(f) + 1), fr = f - Math.floor(f);
  const page = (d, extra = '') => `<g ${extra}><rect x="0" y="0" width="230" height="230" rx="10" fill="#f6f3ec" ${OL}/><rect x="0" y="0" width="230" height="56" rx="10" fill="${K.red}" ${OL}/>
    <text x="115" y="182" text-anchor="middle" fill="${K.ink}" style="${FONT};font-size:120px">${d}</text></g>`;
  let cal = `<g transform="translate(70 170) rotate(-4)">${page(n)}`;
  if (n < 11) cal += page(n, `transform="translate(${-260 * fr} ${-200 * fr}) rotate(${-50 * fr} 0 0)" opacity="${1 - fr}"`);
  cal += `<circle cx="70" cy="8" r="10" fill="#555"/><circle cx="160" cy="8" r="10" fill="#555"/></g>`;
  const calB = n >= 11 ? 1 + .08 * ring(t, .56, 3, 6) : 1;
  const m = t * 900;
  const face = `<g transform="translate(${540 + jx * .6} ${830 + jy * .6 + nod * 1.3}) rotate(${-nod * .25}) scale(4.3)">${head(WHO.randy, { lid: Math.max(lid, blinkAt(t) * .9), red: .65, bags: 1, brow: lid > .5 ? 'tired' : (t > .58 && t < 1.4 ? 'up' : 'tired'), mouth: 'tired', lx: t > 2.5 ? -2 : 0 })}</g>`;
  const label = t < 2.6 ? slamAt(t, .39, 540, 1300, `<g>${txt('11 TAGE', 540, 1340, 150, K.red, { sw: 16 })}</g>`)
    : `<g opacity="${cl((t - 2.6) / .1)}">${popAt(t, 2.62, 540, 1300, `<rect x="140" y="1238" width="800" height="110" rx="20" fill="${K.ink}" opacity=".85"/>${txt('RANDY GARDNER · 17', 540, 1318, 70, '#f4f4f0', { sw: 0 })}`)}</g>`;
  return `<g transform="translate(${sx} ${sy})">
    <rect x="-40" y="-40" width="1160" height="2000" fill="#1a2840"/>
    <g opacity=".55">${blindsWin(-120, 520, 340, 600, '#0b1226', { open: .6, slat: '#33415a' })}</g>
    <ellipse cx="540" cy="820" rx="560" ry="620" fill="#3d5a80" opacity=".35"/>
    <g opacity=".9">${clock(910, 250, 110, m / 12, m)}</g>
    <g transform="translate(185 285) scale(${calB}) translate(-185 -285)">${cal}</g>
    <path d="M 70 1960 Q 80 1460 330 1410 L 750 1410 Q 1000 1460 1010 1960 Z" fill="${K.swL}" ${OL}/>
    <rect x="450" y="1080" width="180" height="370" fill="${K.skinSh}" ${OL}/>
    <path d="M 330 1410 Q 540 1520 750 1410" fill="${K.swSh}" ${OL}/>
    ${face}
    ${label}</g>`;
}
// 3.5–7.1 wide room, time-lapse window + clock, 264 h counts up
function sRoomLapse(t) {
  const ph = (t - 3.5) * 1.5;
  const day = .5 + .5 * Math.sin(ph * Math.PI * 2);
  const sky = mix('#0d1730', '#9fd2ee', day);
  const m = 200 + (t - 3.5) * 1300;
  const nodP = t < 5.95 ? ein(prog(t, 5.25, 5.9)) : 1 - eout(prog(t, 5.95, 6.1));
  const lid = t < 5.95 ? lerp(.45, .92, nodP) : lerp(.15, .4, prog(t, 6.1, 7.1));
  const [jx] = shakeXY(t, 5.95, 10, 8);
  const cnt = Math.round(264 * eout(prog(t, 3.84, 4.7)));
  const body = human(540 + jx, 1560, 1.15, 'randy', { lid, red: .6, bags: 1, brow: 'tired', mouth: 'tired', headDy: 26 * nodP, headTilt: 10 * nodP, lean: 1.5 * Math.sin(t * 1.4), aL: 5 + 3 * Math.sin(t * 1.4), aR: 5 - 3 * Math.sin(t * 1.4) });
  return `${room(t, { sky, open: .5, clock: [840, 300, 92, m / 12, m], winIn: day > .5 ? `<circle cx="300" cy="380" r="40" fill="#fff3c4" opacity="${(day - .5) * 2}"/>` : '' })}
    ${bedSide(640, 1110, 1120, {})}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#0b1226" opacity="${.42 - .3 * day}"/>
    ${body}
    ${t >= 3.84 ? slamAt(t, 3.84, 400, 240, txt(`${cnt} h`, 400, 290, 170, K.red, { sw: 16 })) : ''}`;
}
// 7.1–9.04 three-quarter close-up, question about his head
function sKopf(t) {
  const tilt = lerp(-4, 9, eio(prog(t, 7.2, 8.4)));
  const sw = prog(t, 7.4, 9.04);
  let orbit = '';
  for (let i = 0; i < 3; i++) {
    const a = t * 3 + i * 2.1;
    orbit += `<circle cx="${430 + Math.cos(a) * 330}" cy="${560 + Math.sin(a) * 70}" r="${14 - i * 2}" fill="${K.gold}" opacity="${.85 * sw}"/>`;
  }
  const z = lerp(1.12, 1, eout(prog(t, 7.1, 7.5)));
  return cam(`<rect x="-200" y="-200" width="1480" height="2320" fill="#22344f"/>
    <ellipse cx="420" cy="800" rx="520" ry="560" fill="#5a7aa0" opacity=".35"/>
    <g opacity=".5">${blindsWin(700, 420, 300, 520, '#0b1226', { open: .6, slat: '#3a4a64' })}</g>
    <path d="M -60 1960 Q -40 1420 200 1360 L 640 1360 Q 880 1420 900 1960 Z" fill="${K.swL}" ${OL}/>
    <rect x="345" y="1180" width="150" height="220" fill="${K.skinSh}" ${OL}/>
    <path d="M 200 1360 Q 420 1460 640 1360" fill="${K.swSh}" ${OL}/>
    <ellipse cx="430" cy="560" rx="330" ry="70" fill="none" stroke="${K.gold}" stroke-width="5" stroke-dasharray="20 22" opacity="${.6 * sw}" transform="rotate(${-6 + tilt} 430 560)"/>
    <g transform="translate(420 840) rotate(${tilt}) scale(3.7)">${head(WHO.randy, { lid: .45 + .4 * blinkAt(t, 1), red: .7, bags: 1, brow: 'conf', mouth: t > 8.4 ? 'o' : 'tired', lx: 3, ly: t > 8.5 ? -6 : 0 })}</g>
    ${orbit}
    ${qmark(t, 8.44, 820, 470, 230)}`, z, 540, 900);
}
// 9.04–13.4 San Diego, school, Randy walks in
function sSanDiego(t) {
  const wk = prog(t, 9.1, 11.3), walking = wk > 0 && wk < 1;
  const x = lerp(1120, 560, eio(wk));
  const ph = (t - 9.1) * 7.5;
  const sw = walking ? Math.sin(ph) : 0;
  const bob = walking ? 8 * Math.abs(Math.cos(ph)) : 0;
  const lift = back(prog(t, 11.9, 12.2));
  const gull = prog(t, 12.2, 13.4);
  let roof = '';
  for (let i = 0; i < 16; i++) roof += `<path d="M ${150 + i * 50} 610 q 25 -18 50 0" fill="none" stroke="#8f3f29" stroke-width="4"/>`;
  const arch = (cx) => `<path d="M ${cx - 55} 1050 L ${cx - 55} 860 Q ${cx} 800 ${cx + 55} 860 L ${cx + 55} 1050 Z" fill="#5d7f9b" ${OL}/><path d="M ${cx} 830 L ${cx} 1050 M ${cx - 55} 940 L ${cx + 55} 940" stroke="#e8e3d6" stroke-width="6"/>`;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#86c6ec"/>
    <rect x="-40" y="500" width="1160" height="500" fill="#bfe3f4" opacity=".6"/>
    <circle cx="890" cy="230" r="70" fill="#fff1b8"/><circle cx="890" cy="230" r="120" fill="#fff1b8" opacity=".25"/>
    <path d="M -40 760 Q 200 640 420 720 Q 640 650 1120 740 L 1120 900 L -40 900 Z" fill="#9fb98a"/>
    <g><rect x="120" y="610" width="840" height="480" fill="#f1ebdd" ${OL}/>
      <path d="M 90 620 L 540 470 L 990 620 Z" fill="#c4613f" ${OL}/>${roof}
      ${arch(250)}${arch(420)}${arch(660)}${arch(830)}
      <rect x="490" y="900" width="100" height="190" fill="${K.woodSh}" ${OL}/>
      <circle cx="540" cy="700" r="48" fill="#f7f4ec" ${OL}/><line x1="540" y1="700" x2="540" y2="668" stroke="${K.ol}" stroke-width="6"/><line x1="540" y1="700" x2="562" y2="708" stroke="${K.ol}" stroke-width="6"/></g>
    ${palm(70, 1240, 1.05, t)}${palm(1010, 1250, .95, t + 2)}
    <rect x="-40" y="1090" width="1160" height="60" fill="#6fa25a"/>
    <rect x="-40" y="1150" width="1160" height="260" fill="#cfcac0" ${OL}/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<line x1="${i * 200}" y1="1150" x2="${i * 200 - 60}" y2="1410" stroke="#b1aca2" stroke-width="5"/>`).join('')}
    <rect x="-40" y="1405" width="1160" height="600" fill="#5c6068"/>
    ${gull > 0 && gull < 1 ? `<path d="M ${lerp(-60, 1140, gull) - 30} ${300 + 30 * Math.sin(gull * 6)} q 15 ${-14 + 10 * Math.sin(t * 20)} 30 0 q 15 ${-14 + 10 * Math.sin(t * 20)} 30 0" fill="none" stroke="#f4f4f4" stroke-width="6" stroke-linecap="round"/>` : ''}
    ${human(x, 1370 - bob, .9, 'randy', { legL: 22 * sw, legR: -22 * sw, aL: walking ? 6 - 16 * sw : lerp(6, 2, lift), aR: walking ? 6 + 16 * sw : 2, bR: 30, look: walking ? -4 : 0, lx: walking ? -4 : 0, mouth: lift > .5 ? 'smile' : 'n', brow: 'n',
      pR: `<g transform="rotate(-10)"><rect x="-36" y="-10" width="72" height="96" rx="6" fill="#3d6a4f" ${OL}/><rect x="-30" y="-4" width="60" height="84" fill="#e8e2d0" opacity=".4"/></g>`,
      lid: blinkAt(t) })}
    ${t > 10.5 ? `<g transform="translate(0 ${lerp(-200, 0, back(prog(t, 10.58, 10.9)))})"><rect x="150" y="150" width="780" height="120" rx="22" fill="${K.ink}" opacity=".85"/>${txt('SAN DIEGO · 1963/64', 540, 236, 72, '#f4f4f0', { sw: 0 })}</g>` : ''}`;
}
// 13.4–17.08 room by day: self-experiment, science fair poster pinned
function sProject(t) {
  const tap = prog(t, 13.55, 13.8) * (1 - prog(t, 14.5, 14.8));
  const tapB = 6 * Math.sin(t * 22) * (t > 13.8 && t < 14.4 ? 1 : 0);
  const pin = back(prog(t, 14.85, 15.15));
  const point = eout(prog(t, 15.3, 15.6));
  const posterY = lerp(1300, 380, eout(prog(t, 14.7, 15.0)));
  const poster = t > 14.7 ? `<g transform="translate(0 ${posterY - 380}) rotate(${-3 * (1 - pin)} 600 520)">
      <rect x="455" y="370" width="290" height="330" rx="6" fill="#f7f2e4" ${OL}/>
      <rect x="455" y="370" width="290" height="60" fill="${K.red}" ${OL}/>
      ${bigEye(600, 520, 90, 1, .2)}
      ${clock(600, 630, 40, 60, 300)}
      <circle cx="600" cy="378" r="10" fill="${K.gold}" ${OL}/></g>` : '';
  let tally = '';
  const nTal = Math.min(4, Math.floor(prog(t, 13.4, 16.8) * 5));
  for (let i = 0; i < nTal; i++) tally += `<line x1="${340 + i * 22}" y1="820" x2="${336 + i * 22}" y2="880" stroke="${K.chalk}" stroke-width="7" stroke-linecap="round"/>`;
  const handL = tap > 0 ? [lerp(-60, -20, tap), lerp(-500, -620 + tapB, tap)] : null;
  return `${room(t, { sky: '#a6d8f0', open: .45, winIn: palm(260, 760, .5, t), clock: [920, 260, 78, 300, 30], boardX: 300, chalk: tally })}
    ${desk(700, 1000, 380)}
    <rect x="740" y="930" width="70" height="70" rx="6" fill="#d9d4c6" ${OL}/>
    ${poster}
    ${human(240, 1560, 1.1, 'randy', { hL: handL, aR: lerp(6, 65, point), bR: lerp(4, 10, point), brow: 'n', mouth: tap > .3 ? 'open' : (point > .5 ? 'smile' : 'n'), lx: point > .3 ? 5 : 0, headTilt: point * 4, lid: blinkAt(t, .7) })}`;
}
// 17.08–20.28 friends take turns
function sFriends(t) {
  const sky = mix('#f0a76a', '#4a5a8a', prog(t, 17.08, 20.28));
  const inB = prog(t, 17.15, 18.25), xB = lerp(1200, 850, eio(inB)), wB = inB > 0 && inB < 1;
  const outA = prog(t, 18.35, 19.6), xA = lerp(200, -260, ein(outA)), wA = outA > 0 && outA < 1;
  const phB = Math.sin((t - 17.15) * 8), phA = Math.sin((t - 18.35) * 8);
  const scrib = t < 18.3 ? Math.sin(t * 18) : 0;
  const nod = t < 19.2 ? eio(prog(t, 18.4, 19.0)) : 1 - eout(prog(t, 19.2, 19.4));
  const [jx] = shakeXY(t, 19.22, 9, 9);
  const clap = t > 18.8 ? (t < 19.14 ? eio(prog(t, 18.85, 19.14)) : 1 - eout(prog(t, 19.3, 19.7))) : 0;
  const rings = t > 19.14 && t < 19.7 ? [0, 1].map(k => { const p = prog(t, 19.14 + k * .08, 19.6 + k * .08); return `<circle cx="820" cy="760" r="${30 + 150 * p}" fill="none" stroke="#fff3c4" stroke-width="${7 * (1 - p)}" opacity="${1 - p}"/>`; }).join('') : '';
  const A = human(xA, 1540, 1.02, 'fA', {
    flip: wA, legL: wA ? 18 * phA : 0, legR: wA ? -18 * phA : 0,
    hL: wA ? null : [40, -560], hR: wA ? null : [50 + 14 * scrib, -600 + 8 * Math.cos(t * 13)],
    over: wA ? '' : `<g transform="translate(-10 -560)">${clipboard(130, 170, prog(t, 17.1, 18.2))}</g>`,
    pR: wA ? '' : `<g transform="rotate(180)">${pen(60)}</g>`, aL: 6 + 14 * phA, aR: 6 - 14 * phA,
    lx: wA ? 0 : 6, ly: wA ? 0 : 6, mouth: 'n', brow: 'n'
  });
  const B = human(xB, 1540, 1.04, 'fB', {
    legL: wB ? 18 * phB : 0, legR: wB ? -18 * phB : 0,
    hL: clap > 0 ? [lerp(-120, -14, clap), lerp(-430, -640, clap)] : null, hR: clap > 0 ? [lerp(120, 14, clap), lerp(-430, -640, clap)] : null,
    aL: 6 + 14 * phB, aR: 6 - 14 * phB, lx: -6, mouth: clap > .5 ? 'open' : 'smile', brow: clap > .3 ? 'up' : 'n'
  });
  const R = human(540 + jx, 1540, 1.04, 'randy', {
    sit: 1, lid: t > 19.22 && t < 19.8 ? 0 : lerp(.35, .95, nod), red: .45, bags: .8, brow: t > 19.22 && t < 19.9 ? 'up' : 'tired', mouth: t > 19.22 && t < 19.9 ? 'o' : 'tired',
    headDy: 34 * nod, headTilt: -12 * nod, hL: [-48, -250], hR: [48, -250], lx: t > 17.5 ? 4 : 0
  });
  return `${room(t, { sky, open: .5, clock: [870, 250, 72, 220 + (t - 17) * 40, 40 + (t - 17) * 480], winIn: `<circle cx="230" cy="660" r="70" fill="#ffd27a" opacity="${.8 - .7 * prog(t, 17.08, 20.28)}"/>` })}
    ${chair(540, 1540, 1.04)}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#1a1f3a" opacity="${.1 + .2 * prog(t, 17.08, 20.28)}"/>
    ${R}${A}${B}${rings}`;
}
// 20.28–26.18 close-up at the desk: hesitant hand, irritation, double vision
function sFocus(t) {
  const z = t < 23.94 ? 1 : lerp(1, 1.14, eio(prog(t, 23.94, 24.6)));
  const ang = t > 22.76 && t < 23.9;
  const slam = t >= 22.9 ? 1 : 0;
  const [sx, sy] = shakeXY(t, 22.92, 16, 7);
  // pen hand path toward the cup (body-local coords, s = 2.1, feet at y 2000)
  let hx, hy;
  if (t < 22.75) {
    const p = prog(t, 20.4, 21.5);
    hx = lerp(-10, 95, eio(p)) + 12 * Math.sin(t * 5) * p;
    hy = lerp(-330, -440, eio(p)) + (t > 21.5 && t < 21.62 ? 10 * Math.sin(prog(t, 21.5, 21.62) * Math.PI) : 0);
    if (t > 21.62) { const q = prog(t, 21.62, 22.6); hx = 95 - 26 * Math.sin(q * Math.PI) + 7 * Math.sin(t * 9); hy = -440 + 30 * Math.sin(q * Math.PI); }
  } else {
    const q = eout(prog(t, 22.76, 22.9));
    hx = lerp(95, 30, q); hy = lerp(-440, -335, q);
  }
  const cupJ = t > 22.9 ? -26 * Math.abs(ring(t, 22.9, 2.5, 6)) : 0;
  const dbl = t > 23.94 ? eio(prog(t, 23.94, 24.5)) : 0;
  const off = dbl * (22 + 10 * Math.sin(t * 2.3));
  const bg = (dx, op, tint) => `<g transform="translate(${dx} 0)" opacity="${op}">
      <rect x="-200" y="-200" width="1480" height="1700" fill="${tint || K.wall}"/>
      ${blindsWin(-30, 220, 330, 520, '#20304d', { open: .55 })}
      ${clock(880, 320, 95, 140, (t - 20) * 60)}
    </g>`;
  const look = dbl > 0 ? 7 * Math.sin(t * 6) : (t < 22.75 ? 6 : 3);
  const R = human(540, 2000, 2.1, 'randy', {
    sit: 1, noShadow: 1, noLegs: 1, lid: ang ? .2 : (dbl > 0 ? .35 + .2 * Math.sin(t * 3) : .55 + .35 * blinkAt(t * .6)), red: .8, bags: 1,
    brow: ang ? 'angry' : (dbl > 0 ? 'conf' : 'tired'), mouth: ang ? 'grim' : 'tired', flush: ang ? 1 : 0,
    lx: look, ly: t < 22.75 ? 8 : 0, headTilt: ang ? -4 : 3,
    hR: [hx, hy], hL: [-110, -330],
    pR: t < 22.9 ? `<g transform="rotate(${t < 22.75 ? 160 : 175})">${pen(110, '#c0392b')}</g>` : ''
  });
  const anger = ang ? [0, 1, 2].map(i => `<g transform="translate(${250 + i * 60} ${300 + (i % 2) * 70}) scale(${back(prog(t, 22.8 + i * .05, 23.0 + i * .05))})"><path d="M -24 -24 L 24 24 M 24 -24 L -24 24" stroke="${K.ink}" stroke-width="20" stroke-linecap="round"/><path d="M -24 -24 L 24 24 M 24 -24 L -24 24" stroke="${K.red}" stroke-width="11" stroke-linecap="round"/></g>`).join('') : '';
  return `<g transform="translate(${sx} ${sy})">${cam(`
    ${bg(0, 1)}
    ${dbl > 0 ? bg(off, .45 * dbl, '#8f7fc0') + bg(-off, .35 * dbl, '#6fb3b0') : ''}
    <rect x="-200" y="-200" width="1480" height="1700" fill="#0c1424" opacity=".25"/>
    ${R}
    ${dbl > 0 ? `<g opacity="${.35 * dbl}" transform="translate(${off * 1.4} 0)">${human(540, 2000, 2.1, 'randy', { sit: 1, noShadow: 1, noLegs: 1, lid: .4, red: .8, brow: 'conf', mouth: 'tired', lx: look, hR: [hx, hy], hL: [-110, -330] })}</g>` : ''}
    <rect x="-200" y="1330" width="1480" height="900" fill="${K.woodHi}" ${OL}/>
    <rect x="-200" y="1330" width="1480" height="20" fill="${K.wood}"/>
    <g transform="translate(-160 ${cupJ + 120})"><path d="M 870 1060 L 1000 1060 L 985 1215 L 885 1215 Z" fill="#d9d4c6" ${OL}/><ellipse cx="935" cy="1060" rx="65" ry="16" fill="#9e9a90" ${OL}/>
      <line x1="905" y1="1060" x2="890" y2="960" stroke="${K.ol}" stroke-width="12" stroke-linecap="round"/><line x1="905" y1="1060" x2="890" y2="960" stroke="#2f6bd1" stroke-width="7" stroke-linecap="round"/>
      <line x1="950" y1="1060" x2="975" y2="970" stroke="${K.ol}" stroke-width="12" stroke-linecap="round"/><line x1="950" y1="1060" x2="975" y2="970" stroke="#3c9b57" stroke-width="7" stroke-linecap="round"/></g>
    ${t >= 22.9 ? `<g transform="translate(${540 + 60 * 2.1} 1318) rotate(84)">${pen(150, '#c0392b')}</g>` : ''}
    ${anger}`, z, 540, 760)}</g>`;
}
// 26.18–31.3 night street, day 4, hallucinations begin
function sNight(t) {
  const wk = prog(t, 26.2, 28.6), x = lerp(-80, 420, eio(wk)), walking = wk > 0 && wk < 1;
  const ph = Math.sin((t - 26.2) * 6.5);
  const hall = prog(t, 27.84, 28.3);
  const fl = t > 27.84 && t < 28.8 ? (hash(Math.floor(t * 14)) > .55 ? .8 : 0) : 0;
  const warp = hall + .6 * prog(t, 29.28, 29.8);
  let rings = '';
  if (t > 27.84) for (let k = 0; k < 3; k++) { const p = ((t - 27.84) * .7 + k / 3) % 1; rings += `<ellipse cx="${x}" cy="${1370 - 860}" rx="${80 + 340 * p}" ry="${60 + 250 * p}" fill="none" stroke="${K.dream}" stroke-width="${8 * (1 - p)}" opacity="${.7 * (1 - p) * hall}"/>`; }
  const shLen = 1 + 1.4 * eio(prog(t, 29.28, 30.2)), shSkew = 20 * Math.sin(t * 2.2) * prog(t, 29.28, 29.8);
  const look = t > 28.6 ? 8 * Math.sin(t * 3.4) : 4;
  return `${street(t, { flicker: fl, warp, lampX: 160 })}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#5b3fa0" opacity="${.18 * warp}"/>
    <g transform="translate(${x} 1372) skewX(${-30 + shSkew}) scale(1 ${-.25 * shLen})" opacity=".45"><ellipse cx="0" cy="-60" rx="80" ry="60" fill="#000"/><rect x="-70" y="-800" width="140" height="760" rx="60" fill="#000"/><circle cx="0" cy="-880" r="80" fill="#000"/></g>
    ${rings}
    ${human(x, 1370 - (walking ? 6 * Math.abs(ph) : 0), .9, 'randy', { legL: walking ? 14 * ph : 0, legR: walking ? -14 * ph : 0, aL: 6 - 10 * (walking ? ph : 0), aR: 6 + 10 * (walking ? ph : 0), lid: .45, red: .85, bags: 1, brow: t > 27.84 ? 'conf' : 'tired', mouth: t > 27.84 ? 'o' : 'tired', lx: look, headTilt: walking ? 3 * ph : 6 * Math.sin(t * 1.7) })}
    ${tag(t, 26.46, 'TAG 4')}`;
}
// 31.3–37.42 street sign mistaken for a person; football fantasy bubble
function sSign(t) {
  const look = eout(prog(t, 31.35, 31.7));
  const wob = 5 * ring(t, 31.8, 2.2, 3);
  const halo = prog(t, 32.5, 32.9) * (1 - prog(t, 33.7, 34.0));
  const wave = t > 32.95 && t < 33.9 ? 1 : eout(prog(t, 32.8, 32.95)) * (t < 33.9 ? 1 : 0);
  const waveA = 150 + 18 * Math.sin(t * 14);
  let parts = '';
  if (t > 33.7 && t < 34.3) for (let i = 0; i < 14; i++) { const p = prog(t, 33.7, 34.3), a = hash(i) * 6.28; parts += `<circle cx="${770 + Math.cos(a) * 160 * p}" cy="${640 + Math.sin(a) * 260 * p - 60 * p}" r="${8 * (1 - p)}" fill="${K.dream}"/>`; }
  const ghostP = halo > 0 ? `<g opacity="${.8 * halo}" transform="translate(770 1370) scale(.8 ${.8 + .02 * Math.sin(t * 9)})">
      <g filter="url(#blur8)" opacity=".6"><ellipse cx="0" cy="-520" rx="140" ry="520" fill="${K.dream}"/></g>
      <path d="M -70 0 L -60 -460 Q -100 -470 -96 -560 Q -90 -770 0 -780 Q 90 -770 96 -560 Q 100 -470 60 -460 L 70 0 Z" fill="${K.dream}" fill-opacity=".35" stroke="#efe8ff" stroke-width="7" stroke-dasharray="26 16"/>
      <circle cx="0" cy="-880" r="92" fill="${K.dream}" fill-opacity=".35" stroke="#efe8ff" stroke-width="7" stroke-dasharray="22 14"/>
      <path d="M -90 -760 Q -170 -620 -150 -470 M 90 -760 Q 170 -620 150 -470" stroke="#efe8ff" stroke-width="7" fill="none" stroke-dasharray="22 14"/></g>` : '';
  const cone = halo > 0 ? `<polygon points="355,600 760,520 760,820" fill="${K.dream}" opacity="${.18 * halo}"/>` : '';
  // football fantasy
  const fb = prog(t, 34.6, 35.0), cheer = back(prog(t, 35.75, 36.0));
  const inner = `<rect x="-400" y="-300" width="800" height="600" fill="#2f7a46"/>
    <rect x="-400" y="-300" width="800" height="240" fill="#1d2f52"/>
    ${[-300, -100, 100, 300].map(x => `<line x1="${x}" y1="-60" x2="${x * 1.3}" y2="300" stroke="#e8f2ea" stroke-width="6" opacity=".7"/>`).join('')}
    <circle cx="-300" cy="-230" r="24" fill="#fff6d0"/><circle cx="300" cy="-230" r="24" fill="#fff6d0"/>
    ${human(0, 380, .48, 'randy', { top: '#c8322b', helmet: 1, aL: 150 * cheer + 6, bL: 10, aR: 30, bR: 60, hR: [80, -620], mouth: 'smile', brow: 'up', lid: 0,
      pR: `<g transform="rotate(-30)"><ellipse cx="0" cy="40" rx="34" ry="56" fill="#8a4a24" ${OL}/><path d="M 0 0 L 0 80 M -10 26 L 10 26 M -10 40 L 10 40 M -10 54 L 10 54" stroke="#f4f0e6" stroke-width="4"/></g>`, noShadow: 1 })}
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${-280 + i * 110 + 10 * Math.sin(t * 6 + i)}" y="${-120 - 30 * Math.abs(Math.sin(t * 5 + i))}" width="16" height="30" fill="${['#f2c14e', '#e5483b', '#ffffff'][i % 3]}" transform="rotate(${t * 200 + i * 50} ${-272 + i * 110} -105)"/>`).join('')}`;
  const proud = eout(prog(t, 35.6, 35.9)) * (1 - eout(prog(t, 36.9, 37.3)));
  return `${street(t, { lampX: 980, bg: '#121c36' })}
    ${cone}
    ${streetSign(770, 1380, 1, wob)}
    ${ghostP}${parts}
    ${human(300, 1370, .92, 'randy', {
      lid: halo > 0 ? .1 : .45, red: .85, bags: 1, lx: lerp(0, 8, look) * (fb > 0 ? .2 : 1), ly: fb > 0 ? -6 : 0,
      brow: halo > 0 ? 'up' : (fb > 0 ? (proud > .3 ? 'up' : 'n') : 'conf'), mouth: halo > 0 ? 'open' : (proud > .3 ? 'smile' : 'tired'),
      aR: wave > 0 ? lerp(6, waveA, wave) : lerp(6, 20, proud), bR: wave > 0 ? 20 : 30 * proud,
      aL: lerp(6, 20, proud), bL: 30 * proud, sy: 1 + .03 * proud, headTilt: lerp(0, 6, look) - 6 * proud
    })}
    ${bubble(t, 34.0, 37.1, 600, 270, 380, 200, inner, [[380, 470, 14], [430, 420, 20], [485, 370, 28]])}`;
}
// 37.42–42.34 Dement observes Randy
function sDement(t) {
  const lapse = prog(t, 39.5, 40.5);
  const day = lapse > 0 && lapse < 1 ? .5 + .5 * Math.sin(lapse * Math.PI * 6) : 0;
  const sky = mix('#0e1830', '#9fd2ee', day);
  const writeOn = t > 40.7;
  const nod = t < 41.4 ? eio(prog(t, 40.9, 41.35)) : 1 - eout(prog(t, 41.5, 41.7));
  const lean = eout(prog(t, 40.6, 41.0)) * 5;
  const D = human(770, 1420, 1.0, 'dem', {
    lean: -lean, hL: [-10, -600], hR: [40 + (writeOn ? 10 * Math.sin(t * 16) : 0), -640 + (writeOn ? 6 * Math.cos(t * 11) : 0)],
    over: `<g transform="translate(-30 -600) rotate(-8)">${clipboard(130, 170, prog(t, 40.7, 42.2))}</g>`,
    pR: `<g transform="rotate(180)">${pen(56)}</g>`, lx: -7, ly: 3, brow: 'n', mouth: 'n', lid: blinkAt(t, 1.2) * .9
  });
  const R = human(290, 1310, .9, 'randy', { sit: 1, lid: lerp(.55, .95, nod), red: .9, bags: 1, brow: 'tired', mouth: 'tired', headDy: 30 * nod, headTilt: 10 * nod, hL: [-48, -250], hR: [48, -250], lean: -2 });
  return `${room(t, { sky, open: .5, winX: 380, clock: [190, 560, 70, (t - 37) * 90, (t - 37) * 1080 * (lapse > 0 && lapse < 1 ? 4 : .3)] })}
    ${bedSide(80, 600, 1150, {})}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#0c1426" opacity="${.35 - .25 * day}"/>
    <ellipse cx="300" cy="1100" rx="320" ry="300" fill="#ffd27a" opacity=".06"/>
    ${R}${D}
    ${t > 38.1 ? `<g transform="translate(0 ${lerp(-220, 0, back(prog(t, 38.2, 38.5)))})"><rect x="430" y="150" width="610" height="110" rx="20" fill="${K.ink}" opacity=".85"/>${txt('WILLIAM DEMENT', 735, 230, 66, '#f4f4f0', { sw: 0 })}</g>` : ''}`;
}
const NUMS = [['100', 48.0], ['93', 48.78], ['86', 50.26], ['79', 51.64], ['72', 52.42], ['65', 53.2]];
// 42.34–48.0 day 11, the task at the chalkboard
function sTask(t) {
  const pt = eout(prog(t, 44.8, 45.1)) * (1 - eout(prog(t, 47.3, 47.6)));
  const wr = prog(t, 45.86, 46.3), wr2 = prog(t, 46.74, 47.1);
  const chalkTxt = `<g style="${FONT}" fill="${K.chalk}">
      ${wr > 0 ? `<g opacity="${wr}"><text x="560" y="490" text-anchor="middle" style="font-size:110px">100</text></g>` : ''}
      ${wr2 > 0 ? `<g opacity="${wr2}"><text x="560" y="640" text-anchor="middle" style="font-size:110px" fill="${K.gold}">− 7</text></g>` : ''}</g>`;
  const ready = eout(prog(t, 47.0, 47.4));
  return `${room(t, { sky: '#1a2848', noWin: 1, clock: [940, 400, 66, 200, (t - 42) * 30] })}
    ${chalkboard(330, 330, 460, 380, chalkTxt)}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#0c1426" opacity=".3"/>
    ${human(190, 1380, .9, 'randy', { lid: .6, red: .9, bags: 1, brow: 'tired', mouth: 'tired', lx: 7, ly: -4, hR: ready > 0 ? [lerp(60, 150, ready), lerp(-400, -700, ready)] : [60, -400], pR: chalkStick(), headTilt: 3, sy: .99 })}
    ${human(890, 1380, .9, 'dem', { aL: lerp(6, 100, pt), bL: lerp(4, 10, pt), hR: [-30, -560], over: `<g transform="translate(-60 -560) rotate(10)">${clipboard(120, 160, 1)}</g>`, lx: -7, mouth: pt > .3 ? 'open' : 'n', brow: 'n', lid: blinkAt(t, .4) })}
    ${tag(t, 42.48, 'TAG 11')}`;
}
// 48.0–55.1 over-the-shoulder at the chalkboard: Randy writes the subtraction, stops at 65
function sBoard(t) {
  const pos = [[640, 400], [890, 400], [640, 590], [890, 590], [640, 780], [890, 780]];
  let nums = '', hand = [600, 980];
  for (let i = 0; i < 6; i++) {
    const [s, t0] = NUMS[i], [x, y] = pos[i], p = prog(t, t0, t0 + .32);
    if (p > 0) {
      const id = uid();
      nums += `<clipPath id="${id}"><rect x="${x - 130}" y="${y - 130}" width="${260 * p}" height="170"/></clipPath><text x="${x}" y="${y}" clip-path="url(#${id})" text-anchor="middle" fill="${i === 5 && t > 54 ? '#ffe9a8' : K.chalk}" style="${FONT};font-size:128px">${s}</text>`;
    }
    if (t >= t0 - .25) {
      const q = prog(t, t0 - .25, t0);
      const prev = i ? [pos[i - 1][0] + 100, pos[i - 1][1] + 10] : [600, 980];
      hand = p > 0 ? (p < 1 ? [x - 90 + 190 * p, y - 50 + 10 * Math.sin(p * 18)] : [x + 100, y + 10]) : [lerp(prev[0], x - 90, eio(q)), lerp(prev[1], y - 50, eio(q)) - 30 * Math.sin(q * Math.PI)];
    }
  }
  // after 65: move to the next empty slot, hover, then lower the arm
  let drop = 0;
  if (t > 53.6) {
    const mv = eio(prog(t, 53.6, 54.1));
    hand = [lerp(hand[0], 600, mv), lerp(hand[1], 960, mv)];
    if (t > 54.1) { drop = ein(prog(t, 54.6, 55.05)); hand = [600 + 3 * Math.sin(t * 30) * (t < 54.6 ? 1 : 0), 960 + 700 * drop]; }
  }
  // body: shoulders follow the hand a little (lean / small step), head tilts toward the writing
  const reach = cl((hand[0] - 600) / 300, -.4, 1);
  const bx = 40 * reach - 20 * drop, by = 60 - 18 * (1 - drop) * cl((900 - hand[1]) / 450);
  const sh = [470 + bx, 980 + by];
  // two-bone arm, elbow bends downward
  const L1 = 330, L2 = 300 + 110;
  let dx = hand[0] - sh[0], dy = hand[1] - sh[1], d = Math.hypot(dx, dy);
  if (d > L1 + L2 - 2) { const k = (L1 + L2 - 2) / d; hand = [sh[0] + dx * k, sh[1] + dy * k]; dx *= k; dy *= k; d = L1 + L2 - 2; }
  d = Math.max(d, 120);
  const base = Math.atan2(dy, dx), al = Math.acos(cl((L1 * L1 + d * d - L2 * L2) / (2 * L1 * d), -1, 1));
  // elbow hangs below the shoulder-hand line
  const eA = [sh[0] + L1 * Math.cos(base + al), sh[1] + L1 * Math.sin(base + al)], eB = [sh[0] + L1 * Math.cos(base - al), sh[1] + L1 * Math.sin(base - al)];
  const el = eA[1] >= eB[1] ? eA : eB;
  const fa = Math.atan2(hand[1] - el[1], hand[0] - el[0]);
  hand = [hand[0] - 110 * Math.cos(fa), hand[1] - 110 * Math.sin(fa)];
  const wrist = [hand[0] - 70 * Math.cos(fa), hand[1] - 70 * Math.sin(fa)];
  const seg = (p0, p1, w, fill) => `<line x1="${p0[0]}" y1="${p0[1]}" x2="${p1[0]}" y2="${p1[1]}" stroke="${K.ol}" stroke-width="${w + 12}" stroke-linecap="round"/><line x1="${p0[0]}" y1="${p0[1]}" x2="${p1[0]}" y2="${p1[1]}" stroke="${fill}" stroke-width="${w}" stroke-linecap="round"/>`;
  const cuff = [wrist[0] - 40 * Math.cos(fa), wrist[1] - 40 * Math.sin(fa)];
  const fd = fa * 180 / Math.PI;
  const write = t > 47.9 && t < 53.6 && NUMS.some(([, t0]) => t > t0 && t < t0 + .32);
  const handG = `<g transform="translate(${hand[0]} ${hand[1]}) rotate(${fd + 90})">
      <rect x="-9" y="${-118 + (write ? 2 * Math.sin(t * 40) : 0)}" width="18" height="62" rx="5" fill="${K.chalk}" stroke="${K.ol}" stroke-width="4" transform="rotate(-18 0 -60)"/>
      <path d="M -40 24 Q -46 -30 -20 -52 Q 6 -66 30 -50 Q 48 -30 42 20 Q 30 52 0 54 Q -30 52 -40 24 Z" fill="${K.skin}" ${OL}/>
      <path d="M -26 -40 Q -18 -74 0 -70 Q 10 -64 4 -44" fill="${K.skin}" stroke="${K.ol}" stroke-width="4"/>
      <path d="M 18 -44 Q 36 -62 44 -40 Q 46 -24 34 -18" fill="${K.skin}" stroke="${K.ol}" stroke-width="4"/>
      <path d="M -36 -4 Q -20 2 -8 -4 M 12 -10 Q 26 -4 36 -12" stroke="${K.skinSh}" stroke-width="4" fill="none" stroke-linecap="round"/></g>`;
  const arm = `${seg(sh, el, 104, K.swL)}${seg(el, cuff, 92, K.swL)}
    ${seg(cuff, [cuff[0] + 8 * Math.cos(fa), cuff[1] + 8 * Math.sin(fa)], 98, K.swSh)}
    ${seg(cuff, wrist, 62, K.skin)}${handG}`;
  // back / 3-4 view of Randy (left of frame, facing the board)
  const tilt = 6 * reach - 4 + (t > 54.1 ? 6 * eout(prog(t, 54.1, 54.5)) : 0) - 8 * drop;
  const breathe = 4 * Math.sin(t * 2.2);
  const hx = 300 + bx * .7, hy = 760 + by * .8 + breathe * .3;
  const head = `<g transform="translate(${hx} ${hy}) rotate(${tilt})">
      <rect x="-48" y="70" width="96" height="120" fill="${K.skinSh}" ${OL}/>
      <ellipse cx="128" cy="10" rx="24" ry="40" fill="${K.skin}" ${OL}/><path d="M 124 -8 Q 138 8 126 28" stroke="${K.skinSh}" stroke-width="5" fill="none" stroke-linecap="round"/>
      <path d="M 70 70 Q 126 90 132 40 L 120 -30 Z" fill="${K.skin}" ${OL}/>
      <ellipse cx="0" cy="0" rx="140" ry="158" fill="${K.skin}" ${OL}/>
      <path d="M -142 20 Q -158 -120 -60 -168 Q 0 -196 70 -170 Q 96 -200 140 -178 Q 116 -168 116 -150 Q 156 -100 136 10 Q 120 60 92 96 Q 40 120 -10 118 Q -70 116 -112 90 Q -142 60 -142 20 Z" fill="${WHO.randy.hair}" ${OL}/>
      <path d="M -90 -110 Q -40 -140 20 -130 M -110 -30 Q -60 -60 0 -54 M -80 50 Q -30 30 30 44 M 40 -120 Q 90 -100 108 -60" stroke="${WHO.randy.hairHi}" stroke-width="10" fill="none" stroke-linecap="round" opacity=".8"/></g>`;
  const torso = `<g transform="translate(${bx} ${by})">
      <path d="M 40 1960 L 60 1180 Q 70 1000 200 950 L 400 930 Q 520 940 540 1060 L 580 1960 Z" fill="${K.swL}" ${OL}/>
      <path d="M 210 950 Q 300 1010 400 935 L 380 905 Q 300 950 230 915 Z" fill="${K.swSh}" ${OL}/>
      <path d="M 300 1000 L 312 1960" stroke="${K.swSh}" stroke-width="10" opacity=".6"/>
      <path d="M 60 1180 Q 30 1500 50 1960" stroke="${K.ol}" stroke-width="5" fill="none"/></g>`;
  const hov = t > 54.1 && t < 55.05 ? `<circle cx="640" cy="960" r="${70 + 6 * Math.sin(t * 8)}" fill="none" stroke="${K.chalk}" stroke-width="4" stroke-dasharray="10 14" opacity=".35"/>` : '';
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#141b26"/>
    <rect x="30" y="260" width="1040" height="900" rx="10" fill="${K.wood}" ${OL}/>
    <rect x="52" y="282" width="1000" height="856" fill="${K.board}"/>
    <path d="M 100 380 Q 500 300 1000 440" stroke="${K.boardHi}" stroke-width="60" fill="none" opacity=".45"/>
    <path d="M 90 520 Q 160 500 230 530 M 110 600 Q 170 590 220 610" stroke="${K.chalk}" stroke-width="6" fill="none" opacity=".18"/>
    <text x="90" y="350" text-anchor="start" fill="${K.chalk}" opacity=".55" style="${FONT};font-size:54px">100 − 7</text>
    <rect x="22" y="1160" width="1056" height="26" rx="6" fill="${K.woodSh}" ${OL}/>
    ${nums}${hov}
    ${torso}${head}${arm}
    ${tag(t, 48.0, 'TAG 11')}`;
}
// 55.1–57.86 confused Randy in front of the board
function sForgot(t) {
  const look = eout(prog(t, 55.2, 55.5));
  const z = lerp(1.06, 1, eout(prog(t, 55.1, 55.6)));
  const board = `<g opacity=".85"><rect x="100" y="240" width="900" height="640" rx="10" fill="${K.wood}" ${OL}/><rect x="120" y="260" width="860" height="600" fill="${K.board}"/>
    ${NUMS.map(([s], i) => `<text x="${[250, 540, 830][i % 3]}" y="${i < 3 ? 440 : 660}" text-anchor="middle" fill="${K.chalk}" opacity=".7" style="${FONT};font-size:120px">${s}</text>`).join('')}</g>`;
  return cam(`<rect x="-200" y="-200" width="1480" height="2320" fill="#141b26"/>${board}
    ${human(560, 2620, 1.75, 'randy', { lid: .3, red: .9, bags: 1, brow: 'conf', mouth: t > 55.9 ? 'o' : 'n', lx: -6 * look, ly: -8 * look, headTilt: 9 * look, hL: [-110, -470], hR: [120, -480], pR: chalkStick() })}
    ${qmark(t, 55.48, 850, 1010, 210)}`, z, 540, 900);
}
// 57.86–59.0 the test ends: 264 h, he tips onto the bed
function sEnd(t) {
  const tip = ein(prog(t, 58.55, 59.0));
  return `${room(t, { sky: '#0e1830', open: .5, winX: 640, clock: [230, 620, 70, 300, 10] })}
    ${bedSide(80, 620, 1150, {})}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#0c1426" opacity=".35"/>
    ${human(720, 1380, .92, 'randy', { lid: lerp(.7, 1, prog(t, 58.4, 58.7)), red: .9, bags: 1, brow: 'tired', mouth: 'tired', lean: -38 * tip, headTilt: -10 * tip })}
    ${slamAt(t, 58.14, 540, 300, txt('264 h', 540, 350, 190, K.red, { sw: 16 }))}`;
}
// lying in bed (young or old), wide side view
function lying(t, who, o = {}) {
  const br = 6 * Math.sin(t * (o.breath || 1.6));
  const roll = o.roll || 0;
  const w = WHO[who];
  return `${bedSide(80, 1000, 1150, { pillow: true })}
    <g transform="translate(250 ${1000 + (o.headY || 0)}) rotate(${-90 + roll * 12})">${head(w, o.face || {})}</g>
    <path d="M 300 ${1090} C 300 ${960 - br} 360 ${930 - br} 470 ${930 - br + roll * 10} C 600 ${930 - br} 650 ${980} 720 ${1010} C 820 ${1030} 900 ${1010} 990 ${1020} L 1000 1090 Z" fill="${K.blanket}" ${OL}/>
    <path d="M 420 ${955 - br} Q 500 ${985} 560 ${960 - br} M 760 1030 Q 830 1050 900 1035" stroke="${K.blanketHi}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M 300 1090 L 300 ${985 - br} Q 330 ${955 - br} 360 ${945 - br}" fill="none" stroke="${w.top}" stroke-width="22" stroke-linecap="round"/>
    <rect x="296" y="1085" width="708" height="16" fill="${K.blanketSh}"/>`;
}
// 59.0–63.72 sleeping: lights down, clock spins, over 14 h
function sSleep(t) {
  const dim = eio(prog(t, 59.86, 60.6));
  const spin = prog(t, 60.6, 62.4);
  const m = 300 + 14 * 360 * eio(spin);
  const dawn = prog(t, 62.2, 63.7);
  const sky = mix(mix('#3a4f7a', '#060b18', dim), '#f2b27a', dawn);
  const [sx, sy] = shakeXY(t, 59.0, 12, 9);
  return `<g transform="translate(${sx} ${sy})">${room(t, { sky, open: .4, winX: 690, clock: [440, 500, 96, m / 12, m] })}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#060b18" opacity="${.15 + .45 * dim - .25 * dawn}"/>
    ${lying(t, 'randy', { face: { lid: 1, mouth: t < 59.9 ? 'tired' : 'n', brow: 'soft' } })}
    ${zzz(t, 290, 760, 59.9)}
    ${t > 61.2 ? slamAt(t, 61.28, 540, 240, `<rect x="120" y="170" width="840" height="130" rx="22" fill="${K.ink}" opacity=".85"/>${txt('ÜBER 14 h SCHLAF', 540, 265, 82, '#ffe7a6', { sw: 0 })}`) : ''}</g>`;
}
// 63.72–70.16 morning: sits up, stretches; but not proof of safety
function sMorning(t) {
  const up = eout(prog(t, 63.75, 64.5));
  const str = eio(prog(t, 64.9, 65.3)) * (1 - eio(prog(t, 66.1, 66.6)));
  const cool = eio(prog(t, 66.2, 67.0));
  const warn = back(prog(t, 67.0, 67.3));
  const [wx] = shakeXY(t, 68.62, 10, 6);
  const beams = [0, 1, 2].map(i => `<polygon points="${700 + i * 90},320 ${780 + i * 90},320 ${430 + i * 120},1300 ${300 + i * 120},1300" fill="#ffe2a8" opacity="${(.16 - .1 * cool)}"/>`).join('');
  const R = human(330, 1300, .9, 'randy', {
    sit: 1, noLegs: 1, noShadow: 1, lean: lerp(-75, 0, up), lid: lerp(1, 0, prog(t, 64.2, 64.6)) + (t > 64.9 && t < 65.6 ? .45 : 0) + blinkAt(t, .3) * .9, red: .25 * (1 - up) + .1,
    brow: cool > .5 ? 'n' : 'soft', mouth: str > .4 ? 'smile' : (cool > .5 ? 'n' : (up > .9 ? 'smile' : 'n')),
    aL: lerp(30, 165, str), aR: lerp(30, 165, str), bL: lerp(40, 10, str), bR: lerp(40, 10, str), lx: cool > .5 ? 6 : 0, ly: cool > .5 ? -4 : 0
  });
  return `${room(t, { sky: mix('#ffd9a0', '#bcd9ec', cool), open: .3, winX: 690, winIn: `<circle cx="880" cy="420" r="60" fill="#fff3c4" opacity="${1 - cool}"/>`, clock: [440, 500, 96, 250, 60] })}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#ffb867" opacity="${.12 - .1 * cool}"/>
    ${beams}
    ${bedSide(80, 1000, 1150, {})}
    ${R}
    <path d="M 210 1090 C 230 1000 320 990 420 1010 C 600 1030 700 990 800 1010 C 880 1020 940 1010 990 1020 L 1000 1090 Z" fill="${K.blanket}" ${OL}/>
    <path d="M 480 1030 Q 560 1050 640 1030" stroke="${K.blanketHi}" stroke-width="8" fill="none" stroke-linecap="round"/>
    <rect x="206" y="1085" width="798" height="16" fill="${K.blanketSh}"/>
    ${warn > 0 ? `<g transform="translate(${780 + wx} 470) scale(${warn})"><path d="M 0 -130 L 130 100 L -130 100 Z" fill="${K.gold}" stroke="${K.ink}" stroke-width="12" stroke-linejoin="round"/>${txt('!', 0, 80, 170, K.ink, { sw: 0 })}</g>` : ''}`;
}
// 70.16–77.3 Guinness stopped tracking: wake-record trophy struck out
function sRecord(t) {
  const rise = back(prog(t, 70.2, 70.6));
  const eyeO = eout(prog(t, 71.25, 71.5));
  const strike = eio(prog(t, 75.6, 75.95));
  const grey = prog(t, 75.7, 76.2);
  const gold = mix(K.gold, '#7d808a', grey), goldSh = mix('#c9952e', '#5d6068', grey);
  const sw = stopwatch(820, 900, 80, (t - 70) * 6);
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#111a2c"/>
    <circle cx="540" cy="720" r="460" fill="#24395e" opacity=".55"/>
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<line x1="540" y1="720" x2="${540 + Math.cos(i * .785 + t * .2) * 700}" y2="${720 + Math.sin(i * .785 + t * .2) * 700}" stroke="#2c4470" stroke-width="40" opacity=".35"/>`).join('')}
    <g transform="translate(0 ${lerp(700, 0, rise)})">
      <path d="M 360 470 Q 260 470 270 570 Q 285 670 400 690 M 720 470 Q 820 470 810 570 Q 795 670 680 690" fill="none" stroke="${K.ink}" stroke-width="40"/>
      <path d="M 360 470 Q 260 470 270 570 Q 285 670 400 690 M 720 470 Q 820 470 810 570 Q 795 670 680 690" fill="none" stroke="${gold}" stroke-width="28"/>
      <path d="M 340 440 L 740 440 Q 740 760 540 820 Q 340 760 340 440 Z" fill="${gold}" ${OL}/>
      <path d="M 380 470 Q 380 690 500 770" stroke="#fff3c4" stroke-width="14" fill="none" opacity="${.6 * (1 - grey)}"/>
      <rect x="500" y="815" width="80" height="120" fill="${goldSh}" ${OL}/>
      <rect x="400" y="930" width="280" height="80" rx="10" fill="${goldSh}" ${OL}/>
      <rect x="370" y="1005" width="340" height="60" rx="10" fill="#3a2a22" ${OL}/>
      ${eyeO > 0 ? bigEye(540, 600, 110, eyeO, .3 * (1 - grey)) : `<path d="M 430 600 Q 540 640 650 600" fill="none" stroke="${K.ol}" stroke-width="9" stroke-linecap="round"/>`}
    </g>
    ${t > 71.3 ? popAt(t, 71.3, 820, 900, sw) : ''}
    ${slamAt(t, 73.33, 540, 270, txt('1997', 540, 330, 200, '#f4f4f0', { sw: 16 }))}
    ${strike > 0 ? `<line x1="250" y1="1060" x2="${250 + 580 * strike}" y2="${1060 - 640 * strike}" stroke="${K.ink}" stroke-width="64" stroke-linecap="round"/><line x1="250" y1="1060" x2="${250 + 580 * strike}" y2="${1060 - 640 * strike}" stroke="${K.red}" stroke-width="44" stroke-linecap="round"/>` : ''}
    ${t > 75.75 ? slamAt(t, 75.8, 540, 1250, `<rect x="70" y="1180" width="940" height="130" rx="22" fill="${K.red}" ${OL}/>${txt('KEINE WACHREKORDE', 540, 1272, 74, '#fff', { sw: 0 })}`) : ''}`;
}
// 77.3–85.16 decades later: older Randy lies awake
function sLater(t) {
  let papers = '';
  if (t < 78.1) for (let i = 0; i < 12; i++) { const p = prog(t, 77.3 + i * .03, 77.9 + i * .03); if (p > 0 && p < 1) papers += `<g transform="translate(${lerp(-200, 1300, p)} ${300 + hash(i) * 1100 - 200 * p}) rotate(${p * 400 + i * 30})"><rect x="-60" y="-75" width="120" height="150" rx="6" fill="#f6f3ec" ${OL}/><rect x="-60" y="-75" width="120" height="34" fill="${K.red}"/></g>`; }
  const toss = Math.sin(prog(t, 78.4, 80.6) * Math.PI * 3) * (t < 80.6 ? 1 : 0);
  const stare = t > 80.0;
  const sw = t > 81.3 ? 1 : 0;
  return cam(`${room(t, { sky: '#0a1226', open: .55, winX: 690, winIn: `<circle cx="900" cy="400" r="34" fill="#e8eefc"/>`, clock: [440, 500, 96, 95 + (t - 77) * 6, 60 + (t - 77) * 72] })}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#060b18" opacity=".5"/>
    <polygon points="690,740 990,740 1060,1250 600,1250" fill="#c9d8ff" opacity=".07"/>
    ${lying(t, 'old', { roll: toss, breath: 2.4, face: { lid: stare ? 0 : .25, red: .3, brow: 'tired', mouth: 'tired', lx: stare ? 0 : 4 * toss, ly: stare ? -8 : 0 } })}
    ${papers}
    ${sw ? '' : `<g opacity="${1 - prog(t, 81.0, 81.3)}">${slamAt(t, 77.35, 540, 240, `<rect x="110" y="170" width="860" height="130" rx="22" fill="${K.ink}" opacity=".88"/>${txt('JAHRZEHNTE SPÄTER', 540, 262, 78, '#f4f4f0', { sw: 0 })}`)}</g>`}
    ${sw ? slamAt(t, 81.45, 540, 240, `<rect x="170" y="170" width="740" height="130" rx="22" fill="${K.ink}" opacity=".88"/>${txt('URSACHE UNKLAR', 540, 262, 80, K.gold, { sw: 0 })}`) : ''}
    ${qmark(t, 83.94, 800, 640, 200)}`, lerp(1, 1.08, eio(prog(t, 78.2, 85))), 540, 900);
}
// 85.16–89.7 not a safe endurance test: do not imitate
function sWarn(t) {
  const circ = eio(prog(t, 86.2, 86.75));
  const C2 = 2 * Math.PI * 300;
  const eyeO = .7 + .25 * Math.sin(t * 2) - .6 * blinkAt(t);
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#121a2b"/>
    <circle cx="540" cy="700" r="380" fill="#24395e" opacity=".5"/>
    ${popAt(t, 85.2, 540, 700, `${stopwatch(540, 700, 230, (t - 85) * 3)}${bigEye(540, 720, 120, cl(eyeO), .8)}${txt('264 h', 540, 860, 70, K.ink, { sw: 0 })}`)}
    ${circ > 0 ? `<circle cx="540" cy="700" r="300" fill="none" stroke="${K.ink}" stroke-width="62" stroke-dasharray="${C2 * circ} ${C2}" transform="rotate(-135 540 700)"/>
      <circle cx="540" cy="700" r="300" fill="none" stroke="${K.red}" stroke-width="44" stroke-dasharray="${C2 * circ} ${C2}" transform="rotate(-135 540 700)"/>` : ''}
    ${circ > .6 ? `<line x1="328" y1="488" x2="${328 + 424 * prog(circ, .6, 1)}" y2="${488 + 424 * prog(circ, .6, 1)}" stroke="${K.red}" stroke-width="44" stroke-linecap="round"/>` : ''}
    ${slamAt(t, 87.54, 540, 1200, `<rect x="110" y="1130" width="860" height="130" rx="22" fill="${K.red}" ${OL}/>${txt('NICHT NACHAHMEN', 540, 1222, 78, '#fff', { sw: 0 })}`)}`;
}
// 89.7–94.55 a hand puts the phone down, lamp dims, light out
function sPhone(t) {
  const down = eio(prog(t, 89.8, 91.26));
  const px = lerp(760, 590, down), py = lerp(380, 1080, down), rot = lerp(-28, -8, down);
  const rel = eio(prog(t, 91.5, 92.3));
  const scr = 1 - eio(prog(t, 91.8, 92.2));
  const lamp = 1 - .7 * eio(prog(t, 92.36, 93.0)) - .3 * (t > 93.85 ? 1 : 0);
  const [sx, sy] = shakeXY(t, 91.26, 5, 12);
  const hx = px + 40 + rel * 120, hy = py - 70 - rel * 640;
  const phone = `<g transform="translate(${px} ${py}) rotate(${rot}) scale(1 ${lerp(1, .5, down)})">
      <rect x="-90" y="-170" width="180" height="340" rx="26" fill="#1c1f26" ${OL}/>
      <rect x="-76" y="-150" width="152" height="300" rx="16" fill="${mix('#0c0f15', '#5d8fe0', scr)}"/>
      ${scr > .05 ? `<rect x="-60" y="-120" width="120" height="16" rx="8" fill="#e6efff" opacity="${scr}"/><rect x="-60" y="-80" width="90" height="16" rx="8" fill="#e6efff" opacity="${scr * .7}"/><rect x="-60" y="-20" width="120" height="70" rx="12" fill="#e6efff" opacity="${scr * .4}"/>` : ''}</g>`;
  const glow = `<ellipse cx="${px}" cy="${py}" rx="300" ry="260" fill="#6aa0ff" opacity="${.18 * scr}"/>`;
  const handG = `<g>
      <line x1="${hx + 520}" y1="${hy - 520}" x2="${hx + 40}" y2="${hy - 40}" stroke="${K.ol}" stroke-width="128" stroke-linecap="round"/>
      <line x1="${hx + 520}" y1="${hy - 520}" x2="${hx + 40}" y2="${hy - 40}" stroke="${K.swL}" stroke-width="116" stroke-linecap="round"/>
      <ellipse cx="${hx}" cy="${hy}" rx="78" ry="64" fill="${K.skin}" ${OL} transform="rotate(-35 ${hx} ${hy})"/>
      ${[0, 1, 2, 3].map(i => `<rect x="${hx - 92 - i * 4}" y="${hy - 8 + i * 22 - rel * 20}" width="74" height="26" rx="13" fill="${K.skin}" stroke="${K.ol}" stroke-width="4" transform="rotate(${-20 + i * 6 - rel * 20} ${hx - 40} ${hy})"/>`).join('')}
    </g>`;
  return `<g transform="translate(${sx} ${sy})">
    <rect x="-40" y="-40" width="1160" height="2000" fill="${mix('#0d1322', '#3a3040', lamp * .6)}"/>
    ${blindsWin(680, 200, 300, 460, '#0b1430', { open: .6, inside: '<circle cx="900" cy="300" r="30" fill="#e8eefc"/>' })}
    <ellipse cx="250" cy="760" rx="420" ry="460" fill="#ffd27a" opacity="${.2 * lamp}"/>
    <path d="M -40 980 L 1120 980 L 1120 1300 L -40 1300 Z" fill="${mix('#3a2a1e', K.woodHi, lamp * .8)}" ${OL}/>
    <rect x="-40" y="1300" width="1160" height="700" fill="${mix('#20160f', K.woodSh, lamp * .8)}" ${OL}/>
    <g><path d="M 170 540 L 330 540 L 380 760 L 120 760 Z" fill="${mix('#4a4033', '#ffe7b0', lamp)}" ${OL}/><rect x="238" y="760" width="24" height="200" fill="#5b4a3a" ${OL}/><ellipse cx="250" cy="970" rx="110" ry="24" fill="#5b4a3a" ${OL}/></g>
    <ellipse cx="${px}" cy="${py + 50}" rx="${130 + 60 * (1 - down)}" ry="${30 + 20 * (1 - down)}" fill="#000" opacity="${.15 + .3 * down}"/>
    ${glow}${phone}
    ${rel < 1 || t < 92.4 ? handG : ''}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#03060d" opacity="${.65 * eio(prog(t, 93.85, 94.4))}"/></g>`;
}

const SHOTS = [
  [0, sHook], [3.5, sRoomLapse], [7.1, sKopf], [9.04, sSanDiego], [13.4, sProject], [17.08, sFriends], [20.28, sFocus],
  [26.18, sNight], [31.3, sSign], [37.42, sDement], [42.34, sTask], [48.0, sBoard], [55.1, sForgot], [57.86, sEnd],
  [59.0, sSleep], [63.72, sMorning], [70.16, sRecord], [77.3, sLater], [85.16, sWarn], [89.7, sPhone]
];
function scene(t) {
  UID = 0;
  let f = SHOTS[0][1];
  for (const [t0, fn] of SHOTS) if (t >= t0) f = fn;
  const PL = (id, base, a, b, k) => `<pattern id="${id}" width="46" height="46" patternUnits="userSpaceOnUse" patternTransform="scale(${k}) rotate(4)"><rect width="46" height="46" fill="${base}"/><rect x="0" y="16" width="46" height="13" fill="${a}" opacity=".5"/><rect x="16" y="0" width="13" height="46" fill="${a}" opacity=".5"/><rect x="0" y="39" width="46" height="3" fill="${b}" opacity=".55"/><rect x="39" y="0" width="3" height="46" fill="${b}" opacity=".55"/></pattern>`;
  const defs = `<defs>${PL('v18plaid', '#d39a2c', '#a8741a', '#7a3b22', 1)}${PL('v18plaidL', '#d39a2c', '#a8741a', '#7a3b22', 3.4)}${PL('v18plaidO', '#9a8550', '#7d6c40', '#4e3d2a', 1)}</defs>`;
  try { return defs + f(t); } catch (e) { return `<rect x="0" y="0" width="1080" height="1920" fill="#101826"/><text x="540" y="960" fill="#fff">.</text>${'<g></g>'.repeat(30)}`; }
}

const __style = {"dust": false, "vignette": true, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
