// @ts-nocheck
// AUTO-GENERATED scene for v28. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

const P = {
  sky0: '#060a12', sky1: '#0f1828', sky2: '#1c2739',
  bld: '#2a3446', bldSh: '#202837', bldHi: '#38445b', roof: '#181f2c',
  frost: '#dbe5ef', frostSh: '#b4c3d4', frostHi: '#f4f8fc', dark: '#080c14', glass: '#34415a',
  snow: '#e3eaf2', snowSh: '#aebccd', ice: '#cde0f0', iceHi: '#f4f9ff',
  amber: '#f2a54a', amberHi: '#ffd58a',
  red: '#e5484d', white: '#eef3f8', grey: '#7d8899', navy: '#0e1522', navy2: '#162031', grid: '#2e3a50', gridHi: '#4a5874',
  wall: '#364152', wallSh: '#2b3443', floor: '#1f2531', floorHi: '#2a3240', tile: '#56647a', tileLn: '#445064',
  door: '#6e4529', doorSh: '#55351f', doorHi: '#8a5a3a', metal: '#b7bfc9', metalSh: '#7f8996', metalHi: '#eef2f6',
  skin: '#dfb18c', skinSh: '#c08e6a', hair: '#111216', jacket: '#1e2a3f', jacketSh: '#141d2d', jacketHi: '#2c3b56', pants: '#191d26', boot: '#0b0d12',
  bl1: '#56698a', bl1s: '#45566f', bl2: '#7c6a5c', bl2s: '#66574b', bl3: '#4c6f70', bl3s: '#3c5859',
  torch: '#fff3cf', phone: '#0d1119', screen: '#1b2537', bubble: '#2f6fd6', water: '#8cc6ef'
};
const FONT = `font-family:'Inter';font-weight:900`;
function T(s, x, y, size, fill, o = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${fill}" opacity="${o.op ?? 1}"${o.st ? ` stroke="${o.st}" stroke-width="${o.sw || 10}" paint-order="stroke" stroke-linejoin="round"` : ''} style="${FONT};font-size:${size}px;letter-spacing:${o.ls || 0}px">${s}</text>`;
}
function pop(t, t0, cx, cy, inner, d = .28) {
  const p = back(prog(t, t0, t0 + d));
  if (p <= 0) return '';
  return `<g transform="translate(${cx} ${cy}) scale(${p}) translate(${-cx} ${-cy})">${inner}</g>`;
}
function slam(t, t0, cx, cy, inner) {
  if (t < t0) return '';
  const p = eout(prog(t, t0, t0 + .18)), sc = lerp(1.8, 1, p) + .05 * ring(t, t0 + .18, 4, 9);
  return `<g transform="translate(${cx} ${cy}) scale(${sc}) translate(${-cx} ${-cy})" opacity="${cl(p * 3)}">${inner}</g>`;
}
function cam(inner, sc = 1, fx = 540, fy = 960, dx = 0, dy = 0) {
  return `<g transform="translate(${540 + dx} ${960 + dy}) scale(${sc}) translate(${-fx} ${-fy})">${inner}</g>`;
}
const shk = (t, t0, a, d) => t < t0 ? [0, 0] : [a * Math.exp(-(t - t0) * d) * Math.sin((t - t0) * 83), a * Math.exp(-(t - t0) * d) * Math.cos((t - t0) * 61)];
function pill(x, y, label, size, bg, fg) {
  const w = label.length * size * .66 + size * 1.2, h = size * 1.55;
  return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h * .22}" fill="${bg}"/><rect x="${x - w / 2}" y="${y - h / 2}" width="10" height="${h}" fill="${P.red}"/>${T(label, x + 5, y + size * .36, size, fg, { ls: 2 })}`;
}
function brackets(x, y, w, h, p, col = P.red, sw = 10) {
  if (p <= 0) return '';
  const g = 40 * (1 - p), L = Math.min(w, h) * .32;
  const x0 = x - g, y0 = y - g, x1 = x + w + g, y1 = y + h + g;
  return `<g stroke="${col}" stroke-width="${sw}" fill="none" stroke-linecap="square" opacity="${cl(p * 2)}">
    <path d="M ${x0} ${y0 + L} V ${y0} H ${x0 + L} M ${x1 - L} ${y0} H ${x1} V ${y0 + L} M ${x1} ${y1 - L} V ${y1} H ${x1 - L} M ${x0 + L} ${y1} H ${x0} V ${y1 - L}"/></g>`;
}
function defs27() {
  return `<defs>
  <linearGradient id="v28fr" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${P.frostHi}"/><stop offset=".55" stop-color="${P.frost}"/><stop offset="1" stop-color="${P.frostSh}"/></linearGradient>
  <linearGradient id="v28sky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.sky0}"/><stop offset=".6" stop-color="${P.sky1}"/><stop offset="1" stop-color="${P.sky2}"/></linearGradient>
  <radialGradient id="v28am" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${P.amberHi}" stop-opacity=".9"/><stop offset=".45" stop-color="${P.amber}" stop-opacity=".35"/><stop offset="1" stop-color="${P.amber}" stop-opacity="0"/></radialGradient>
  <radialGradient id="v28tb" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#fff" stop-opacity=".95"/><stop offset=".4" stop-color="${P.torch}" stop-opacity=".55"/><stop offset="1" stop-color="${P.torch}" stop-opacity="0"/></radialGradient>
  <linearGradient id="v28bm" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${P.torch}" stop-opacity=".8"/><stop offset="1" stop-color="${P.torch}" stop-opacity="0"/></linearGradient>
  <linearGradient id="v28gap" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${P.torch}" stop-opacity=".75"/><stop offset="1" stop-color="${P.torch}" stop-opacity="0"/></linearGradient>
  <linearGradient id="v28dr" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="${P.doorSh}"/><stop offset=".3" stop-color="${P.door}"/><stop offset="1" stop-color="${P.doorHi}"/></linearGradient>
  </defs>`;
}
function snowfall(t, n, wind, seed = 1, op = .8, big = 1) {
  let s = '';
  for (let i = 0; i < n; i++) {
    const h = hash(i * 3.1 + seed);
    const x = ((hash(i + seed * 7) * 1300 + t * wind * (.6 + h)) % 1300 + 1300) % 1300 - 110;
    const y = (hash(i * 1.7 + seed) * 2100 + t * (180 + 140 * h)) % 2100 - 90;
    s += `<circle cx="${x}" cy="${y}" r="${(2 + 4 * hash(i + 11)) * big}" fill="#fff" opacity="${op * (.4 + .6 * h)}"/>`;
  }
  return s;
}
function breath(t, x, y, dir = 1, period = 1.6, off = 0) {
  let s = '';
  for (let k = 0; k < 2; k++) {
    const ph = ((t + off + k * period / 2) % period) / period;
    if (ph > .7) continue;
    const p = ph / .7;
    s += `<ellipse cx="${x + dir * 70 * p}" cy="${y - 50 * p}" rx="${18 + 40 * p}" ry="${12 + 24 * p}" fill="#e8f0f8" opacity="${.55 * (1 - p)}" filter="url(#blur8)"/>`;
  }
  return s;
}

// ---------- windows / towers ----------
function TW(x, y0, w, fh, f, c, cols = 4) {
  const pad = w * .07, cw = (w - 2 * pad) / cols;
  return { x: x + pad + c * cw + cw * .14, y: y0 - f * fh + fh * .2, w: cw * .72, h: fh * .6 };
}
function win(r, st, id = '') {
  if (st === 'dark') return `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${P.dark}"/>`;
  if (st === 'glass') return `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${P.glass}"/><path d="M ${r.x + r.w * .15} ${r.y + r.h * .8} L ${r.x + r.w * .55} ${r.y + r.h * .15}" stroke="#4b5a78" stroke-width="${r.w * .08}"/>`;
  if (st === 'lit') return `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${P.amberHi}"/><ellipse cx="${r.x + r.w / 2}" cy="${r.y + r.h / 2}" rx="${r.w * 1.6}" ry="${r.h * 1.4}" fill="url(#v28am)"/>`;
  if (st === 'patch') return `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="url(#v28fr)"/><clipPath id="v28p${id}"><rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}"/></clipPath><g clip-path="url(#v28p${id})"><ellipse cx="${r.x + r.w * .45}" cy="${r.y + r.h * .55}" rx="${r.w * .36}" ry="${r.h * .3}" fill="${P.dark}" filter="url(#blur8)"/></g>`;
  if (st === 'open') return `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="${P.dark}"/><polygon points="${r.x + r.w},${r.y} ${r.x + r.w * 1.55},${r.y - r.h * .08} ${r.x + r.w * 1.55},${r.y + r.h * 1.08} ${r.x + r.w},${r.y + r.h}" fill="url(#v28fr)" opacity=".9"/>`;
  let s = `<rect x="${r.x}" y="${r.y}" width="${r.w}" height="${r.h}" fill="url(#v28fr)"/>`;
  if (r.w > 110) s += `<path d="M ${r.x + r.w * .1} ${r.y + r.h * .9} q ${r.w * .2} ${-r.h * .3} ${r.w * .1} ${-r.h * .6} M ${r.x + r.w * .9} ${r.y + r.h * .15} q ${-r.w * .25} ${r.h * .2} ${-r.w * .2} ${r.h * .5}" stroke="#ffffff" stroke-width="${r.w * .04}" fill="none" opacity=".7"/>`;
  return s;
}
function tower(x, y0, w, fh, o = {}) {
  const cols = o.cols || 4, top = y0 - 17 * fh;
  let s = `<rect x="${x}" y="${top - fh * .45}" width="${w}" height="${y0 - top + fh * .45 + 400}" fill="${o.fill || P.bld}"/>
    <rect x="${x + w * .9}" y="${top - fh * .45}" width="${w * .1}" height="${y0 - top + 400}" fill="${P.bldSh}"/>
    <rect x="${x - w * .02}" y="${top - fh * .55}" width="${w * 1.04}" height="${fh * .22}" fill="${P.bldHi}"/>`;
  for (let f = 1; f <= 17; f++) for (let c = 0; c < cols; c++) {
    const st = o.state ? o.state(f, c) : 'frost';
    s += win(TW(x, y0, w, fh, f, c, cols), st, `${o.id || ''}${f}_${c}`);
  }
  if (o.letter) {
    const p = o.letterP ?? 1;
    if (p > 0) s += pop(o.t ?? 99, o.letterT ?? -9, x + w / 2, top - fh * 1.3, `<circle cx="${x + w / 2}" cy="${top - fh * 1.3}" r="${fh * .9}" fill="${o.letterHi ? P.red : P.navy2}"/>${T(o.letter, x + w / 2, top - fh * 1.3 + fh * .38, fh * 1.08, P.white)}`);
  }
  return s;
}

// ---------- Sascha ----------
function face(x, y, r, o = {}) {
  const lx = (o.look || 0) * r * .12, ly = (o.lookY || 0) * r * .1, br = o.brow ?? .4;
  const es = o.eyes === 'wide' ? 1.35 : 1, closed = o.eyes === 'closed';
  const eye = sd => closed ? `<path d="M ${sd * r * .36 - r * .14} ${-r * .02} q ${r * .14} ${r * .08} ${r * .28} 0" stroke="${P.hair}" stroke-width="${r * .06}" fill="none" stroke-linecap="round"/>`
    : `<ellipse cx="${sd * r * .36}" cy="${-r * .02}" rx="${r * .15 * es}" ry="${r * .12 * es}" fill="#f4f1ea"/><circle cx="${sd * r * .36 + lx}" cy="${-r * .02 + ly}" r="${r * .075}" fill="${P.hair}"/>
      <path d="M ${sd * r * .36 - r * .17} ${-r * .1} q ${r * .17} ${-r * .07 * (es > 1 ? .2 : 1)} ${r * .34} 0" stroke="${P.skinSh}" stroke-width="${r * .05}" fill="none"/>
      <path d="M ${sd * r * .36 - r * .13} ${r * .14} q ${r * .13} ${r * .06} ${r * .26} 0" stroke="${P.skinSh}" stroke-width="${r * .035}" fill="none" opacity=".8"/>`;
  const M = {
    flat: `<path d="M ${-r * .2} ${r * .5} L ${r * .2} ${r * .5}" stroke="#5a2f26" stroke-width="${r * .06}" stroke-linecap="round"/>`,
    tight: `<path d="M ${-r * .16} ${r * .52} Q 0 ${r * .46} ${r * .16} ${r * .52}" stroke="#5a2f26" stroke-width="${r * .07}" fill="none" stroke-linecap="round"/>`,
    o: `<ellipse cx="0" cy="${r * .52}" rx="${r * .11}" ry="${r * .14}" fill="#3b1c18"/>`,
    blow: `<ellipse cx="0" cy="${r * .52}" rx="${r * .07}" ry="${r * .07}" fill="#3b1c18"/>`
  }[o.mouth || 'flat'];
  const lit = o.lit || 0;
  return `<g transform="translate(${x} ${y}) rotate(${o.tilt || 0})">
    <rect x="${-r * .32}" y="${r * .6}" width="${r * .64}" height="${r * .6}" fill="${P.skinSh}"/>
    <ellipse cx="${-r * .98}" cy="${r * .08}" rx="${r * .16}" ry="${r * .22}" fill="${P.skinSh}"/><ellipse cx="${r * .98}" cy="${r * .08}" rx="${r * .16}" ry="${r * .22}" fill="${P.skinSh}"/>
    <ellipse cx="0" cy="0" rx="${r}" ry="${r * 1.08}" fill="${P.skin}"/>
    <path d="M ${r * .55} ${-r * .9} Q ${r * 1.05} ${-r * .2} ${r * .7} ${r * .8} Q ${r * .9} 0 ${r * .55} ${-r * .9} Z" fill="${P.skinSh}" opacity=".5"/>
    ${lit ? `<ellipse cx="${-r * .5}" cy="${r * .2}" rx="${r * .6}" ry="${r * .8}" fill="${P.amber}" opacity="${.35 * lit}" filter="url(#blur20)"/>` : ''}
    <path d="M ${-r * 1.02} ${-r * .1} Q ${-r * 1.08} ${-r * 1.2} 0 ${-r * 1.18} Q ${r * 1.08} ${-r * 1.2} ${r * 1.02} ${-r * .1} Q ${r * .9} ${-r * .6} ${r * .5} ${-r * .62} Q ${r * .1} ${-r * .5} ${-r * .2} ${-r * .66} Q ${-r * .6} ${-r * .55} ${-r * .86} ${-r * .62} Q ${-r * .95} ${-r * .4} ${-r * 1.02} ${-r * .1} Z" fill="${P.hair}"/>
    ${eye(-1)}${eye(1)}
    <path d="M ${-r * .56} ${-r * (.3 - .04 * br)} L ${-r * .18} ${-r * (.24 + .2 * br)} M ${r * .56} ${-r * (.3 - .04 * br)} L ${r * .18} ${-r * (.24 + .2 * br)}" stroke="${P.hair}" stroke-width="${r * .09}" stroke-linecap="round"/>
    <path d="M ${r * .02} ${r * .02} L ${-r * .06} ${r * .3} L ${r * .08} ${r * .3}" stroke="${P.skinSh}" stroke-width="${r * .05}" fill="none" stroke-linejoin="round"/>
    <path d="M ${-r * .5} ${r * .7} Q 0 ${r * 1.02} ${r * .5} ${r * .7}" stroke="#2a2d36" stroke-width="${r * .03}" fill="none" opacity=".35"/>
    ${M}</g>`;
}
function arm(sx, sy, ang, len, w, o = {}) {
  // arm from shoulder (sx,sy) rotated ang degrees (0 = down), sleeve + hand; o.hold = svg drawn at hand (local, upright)
  return `<g transform="translate(${sx} ${sy}) rotate(${ang})"><rect x="${-w / 2}" y="${-w * .3}" width="${w}" height="${len}" rx="${w / 2}" fill="${o.col || P.jacket}"/>
    <circle cx="0" cy="${len}" r="${w * .48}" fill="${P.skin}"/>${o.hold ? `<g transform="translate(0 ${len}) rotate(${-ang})">${o.hold}</g>` : ''}</g>`;
}
function sascha(x, y, s, o = {}) {
  // front view, origin at feet, ~780*s tall
  const sh = o.shiver ? 2.5 * Math.sin((o.t || 0) * 60) : 0;
  return `<g transform="translate(${x + sh} ${y}) scale(${s})">
    <ellipse cx="0" cy="0" rx="140" ry="20" fill="#000" opacity=".3"/>
    <rect x="-70" y="-310" width="62" height="300" rx="24" fill="${P.pants}"/><rect x="8" y="-310" width="62" height="300" rx="24" fill="${P.pants}"/>
    <ellipse cx="-44" cy="-8" rx="46" ry="20" fill="${P.boot}"/><ellipse cx="44" cy="-8" rx="46" ry="20" fill="${P.boot}"/>
    ${arm(-112, -560, o.aL ?? 10, 250, 54, { hold: o.holdL })}${o.armFrontR ? '' : arm(112, -560, o.aR ?? -10, 250, 54, { hold: o.holdR })}
    <path d="M -122 -540 Q -124 -600 -60 -606 L 60 -606 Q 124 -600 122 -540 L 112 -270 Q 0 -250 -112 -270 Z" fill="${P.jacket}"/>
    <path d="M 70 -600 Q 120 -590 120 -530 L 110 -272 Q 90 -266 70 -264 Z" fill="${P.jacketSh}"/>
    <path d="M -60 -606 L 0 -540 L 60 -606 L 40 -630 L 0 -590 L -40 -630 Z" fill="${P.jacketHi}"/>
    <line x1="0" y1="-560" x2="0" y2="-262" stroke="${P.jacketSh}" stroke-width="7"/>
    <rect x="-100" y="-330" width="200" height="30" rx="12" fill="${P.jacketSh}"/>
    ${o.armFrontR ? arm(112, -560, o.aR ?? -10, 250, 54, { hold: o.holdR }) : ''}
    ${face(0, -730 + (o.headDy || 0), 95, o)}
  </g>`;
}
function saschaSide(x, y, s, o = {}) {
  // profile facing right, origin at feet; o.walk phase (radians) or undefined; o.aF front arm angle (deg, 0 down, -90 forward)
  const w = o.walk;
  const lg = w === undefined ? 0 : 22 * Math.sin(w), bob = w === undefined ? 0 : 6 * Math.abs(Math.cos(w));
  const crouch = o.crouch || 0;
  const leg = (a, col) => `<g transform="translate(0 ${-300 + crouch * 90}) rotate(${a})"><rect x="-30" y="0" width="60" height="${300 - crouch * 90}" rx="24" fill="${col}"/><ellipse cx="18" cy="${296 - crouch * 90}" rx="48" ry="20" fill="${P.boot}"/></g>`;
  const r = 92;
  return `<g transform="translate(${x} ${y - bob}) scale(${s})">
    <ellipse cx="0" cy="${bob / s}" rx="120" ry="18" fill="#000" opacity=".3"/>
    ${leg(lg, '#12151c')}${leg(-lg, P.pants)}
    ${arm(-6, -560 + crouch * 90, o.aB ?? (w === undefined ? 6 : -18 * Math.sin(w)), 240, 50, { col: P.jacketSh, hold: o.holdB })}
    <g transform="translate(0 ${crouch * 90})">
    <path d="M -80 -540 Q -80 -610 -10 -612 Q 70 -612 82 -540 L 76 -280 Q 0 -262 -78 -280 Z" fill="${P.jacket}"/>
    <path d="M -80 -540 Q -80 -610 -40 -612 L -50 -280 Q -66 -276 -78 -280 Z" fill="${P.jacketSh}"/>
    <path d="M -10 -612 Q 40 -650 70 -606 L 40 -590 Z" fill="${P.jacketHi}"/>
    <rect x="-24" y="-660" width="52" height="60" fill="${P.skinSh}"/>
    <g transform="translate(6 -740) rotate(${o.tilt || 0})">
      <circle cx="0" cy="0" r="${r}" fill="${P.skin}"/>
      <path d="M ${r * .9} ${-r * .05} L ${r * 1.18} ${r * .2} L ${r * .9} ${r * .3} Z" fill="${P.skin}"/>
      <path d="M ${-r * 1.0} ${r * .1} Q ${-r * 1.1} ${-r * 1.15} ${r * .2} ${-r * 1.1} Q ${r * .95} ${-r * 1.0} ${r * .95} ${-r * .4} Q ${r * .5} ${-r * .62} ${r * .1} ${-r * .55} Q ${-r * .2} ${-r * .3} ${-r * .3} ${r * .15} Q ${-r * .7} ${r * .4} ${-r * 1.0} ${r * .1} Z" fill="${P.hair}"/>
      <ellipse cx="${-r * .15}" cy="${r * .05}" rx="${r * .16}" ry="${r * .22}" fill="${P.skinSh}"/>
      ${o.eyes === 'closed' ? `<path d="M ${r * .42} ${-r * .08} q ${r * .1} ${r * .06} ${r * .2} 0" stroke="${P.hair}" stroke-width="${r * .06}" fill="none"/>` : `<ellipse cx="${r * .55}" cy="${-r * .1}" rx="${r * .1}" ry="${r * .13 * (o.eyes === 'wide' ? 1.3 : 1)}" fill="#f4f1ea"/><circle cx="${r * .6}" cy="${-r * .1}" r="${r * .065}" fill="${P.hair}"/>`}
      <path d="M ${r * .38} ${-r * .34} L ${r * .76} ${-r * .3}" stroke="${P.hair}" stroke-width="${r * .09}" stroke-linecap="round"/>
      ${o.mouth === 'blow' ? `<ellipse cx="${r * .86}" cy="${r * .52}" rx="${r * .09}" ry="${r * .08}" fill="#3b1c18"/>` : `<path d="M ${r * .62} ${r * .52} L ${r * .88} ${r * .5}" stroke="#5a2f26" stroke-width="${r * .06}" stroke-linecap="round"/>`}
      ${o.headProp || ''}
    </g></g>
    ${o.carry || ''}
    ${arm(10, -560 + crouch * 90, o.aF ?? (w === undefined ? -6 : 18 * Math.sin(w)), 240, 52, { hold: o.holdF })}
  </g>`;
}
function nest(x, y, s, o = {}) {
  // Sascha sitting wrapped in blankets in the bathroom corner, origin at floor centre
  const t = o.t || 0, br = Math.sin(t * 2.2) * 4;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="10" rx="360" ry="40" fill="#000" opacity=".35"/>
    <path d="M -340 0 Q -360 -230 -180 -300 Q 0 -340 180 -300 Q 360 -230 340 0 Z" fill="${P.bl2}"/>
    <path d="M -340 0 Q -330 -140 -230 -200 L -150 0 Z" fill="${P.bl2s}"/>
    <path d="M -250 0 Q -260 ${-330 - br} 0 ${-370 - br} Q 260 ${-330 - br} 250 0 Z" fill="${P.bl1}"/>
    <path d="M 120 0 Q 200 -200 150 ${-330 - br} Q 250 -280 250 0 Z" fill="${P.bl1s}"/>
    ${face(0, -470 - br, 92, o)}
    <path d="M -175 ${-330 - br} Q -150 ${-440 - br} 0 ${-400 - br} Q 150 ${-440 - br} 175 ${-330 - br} Q 120 ${-300 - br} 0 ${-310 - br} Q -120 ${-300 - br} -175 ${-330 - br} Z" fill="${P.bl3}"/>
    <path d="M -190 ${-330 - br} Q -230 -200 -180 -60 L -110 -60 Q -150 -200 -120 ${-310 - br} Z" fill="${P.bl3s}"/>
    <path d="M -300 -40 Q 0 -90 300 -40" stroke="${P.bl2s}" stroke-width="14" fill="none" stroke-linecap="round"/>
    ${o.extra || ''}
  </g>`;
}

// ---------- props ----------
function candle(x, y, s, o = {}) {
  const fl = o.flame ?? 1, t = o.t || 0;
  const fw = 1 + .12 * Math.sin(t * 23) + .08 * Math.sin(t * 37);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="8" rx="150" ry="26" fill="${P.metalSh}"/><ellipse cx="0" cy="0" rx="150" ry="26" fill="${P.metal}"/><ellipse cx="0" cy="-2" rx="120" ry="18" fill="#9aa3ae"/>
    <rect x="-32" y="-170" width="64" height="168" rx="8" fill="#ece4d4"/><rect x="12" y="-170" width="20" height="168" fill="#d4cab6"/>
    <ellipse cx="0" cy="-170" rx="32" ry="9" fill="#f6efe2"/><line x1="0" y1="-170" x2="${o.bend || 0}" y2="-196" stroke="#2a2420" stroke-width="5"/>
    ${fl > 0 ? `<ellipse cx="0" cy="-230" rx="${260 * fl}" ry="${240 * fl}" fill="url(#v28am)" opacity="${.9 * fl}"/>
      <g transform="translate(${o.bend || 0} -196) scale(${fl * (o.lean ? 1 : 1)} ${fl * fw}) skewX(${o.lean || 0})"><path d="M 0 0 C -26 -20 -18 -60 0 -92 C 18 -60 26 -20 0 0 Z" fill="${P.amber}"/><path d="M 0 -4 C -12 -18 -8 -40 0 -58 C 8 -40 12 -18 0 -4 Z" fill="#fff4cf"/></g>` : ''}
  </g>`;
}
function smoke(t, t0, x, y) {
  if (t < t0) return '';
  let s = '';
  for (let i = 0; i < 6; i++) {
    const p = prog(t, t0 + i * .12, t0 + i * .12 + 1.6);
    if (p <= 0 || p >= 1) continue;
    s += `<circle cx="${x + 30 * Math.sin(p * 7 + i)}" cy="${y - 300 * p}" r="${12 + 30 * p}" fill="#c8d0da" opacity="${.45 * (1 - p)}" filter="url(#blur8)"/>`;
  }
  return s;
}
function handle(x, y, s, o = {}) {
  // lever handle on a door, o.ice 0..1 crust, o.shine 0..1 glint sweep, o.wet 0..1
  const ice = o.ice || 0;
  let crust = '';
  if (ice > 0) {
    crust = `<rect x="-60" y="-34" width="${70 + 230 * ice}" height="68" rx="30" fill="${P.ice}" opacity=".92"/>
      <ellipse cx="0" cy="0" rx="${70 * Math.min(1, ice * 2)}" ry="${84 * Math.min(1, ice * 2)}" fill="${P.ice}" opacity=".9"/>`;
    for (let i = 0; i < 5; i++) { const ip = cl(ice * 1.6 - i * .15); if (ip > 0) crust += `<path d="M ${20 + i * 48} 30 l 12 ${50 * ip} l 12 ${-50 * ip} Z" fill="${P.iceHi}"/>`; }
    crust += `<path d="M -30 -20 q 60 -14 ${150 * ice} -6" stroke="#fff" stroke-width="6" fill="none" opacity=".8"/>`;
  }
  const sh = o.shine || 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-58" y="-150" width="116" height="300" rx="22" fill="${P.metalSh}"/><rect x="-50" y="-142" width="100" height="284" rx="18" fill="${P.metal}"/>
    <circle cx="0" cy="90" r="16" fill="${P.metalSh}"/>
    <circle cx="0" cy="0" r="46" fill="${P.metalSh}"/>
    <rect x="-10" y="-22" width="270" height="44" rx="22" fill="${P.metal}"/><rect x="-10" y="-22" width="270" height="14" rx="7" fill="${P.metalHi}"/>
    <circle cx="0" cy="0" r="34" fill="${P.metal}"/><circle cx="-8" cy="-10" r="12" fill="${P.metalHi}"/>
    ${sh > 0 && sh < 1 ? `<rect x="${-40 + 300 * sh}" y="-26" width="34" height="52" fill="#fff" opacity="${.9 * Math.sin(sh * Math.PI)}" transform="skewX(-20)"/>` : ''}
    ${o.wet ? `<path d="M 30 22 q 4 ${20 * o.wet} 0 ${34 * o.wet} M 120 22 q 4 ${16 * o.wet} 0 ${26 * o.wet}" stroke="${P.water}" stroke-width="10" stroke-linecap="round" fill="none" opacity=".9"/><rect x="-10" y="-22" width="${270 * o.wet}" height="44" rx="22" fill="${P.water}" opacity=".35"/>` : ''}
    ${crust}
  </g>`;
}
function door87(x, y, w, h, o = {}) {
  return `<rect x="${x - 26}" y="${y - 26}" width="${w + 52}" height="${h + 26}" fill="${P.doorSh}"/>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#v28dr)"/>
    <rect x="${x + w * .12}" y="${y + h * .08}" width="${w * .76}" height="${h * .36}" rx="8" fill="none" stroke="${P.doorSh}" stroke-width="${w * .03}"/>
    <rect x="${x + w * .12}" y="${y + h * .52}" width="${w * .76}" height="${h * .4}" rx="8" fill="none" stroke="${P.doorSh}" stroke-width="${w * .03}"/>
    ${o.noPlate ? '' : `<rect x="${x + w * .3}" y="${y + h * .15}" width="${w * .4}" height="${w * .26}" rx="10" fill="${P.metal}"/>${T('87', x + w * .5, y + h * .15 + w * .2, w * .19, '#1a1d24')}`}`;
}
function radiator(x, y, s, frost) {
  let fins = '';
  for (let i = 0; i < 9; i++) fins += `<rect x="${i * 64}" y="0" width="52" height="300" rx="20" fill="#c9ced6"/><rect x="${i * 64 + 34}" y="10" width="12" height="280" rx="6" fill="#a5adb8"/>`;
  let ice = '';
  for (let i = 0; i < 9; i++) {
    const p = cl(frost * 1.5 - Math.abs(i - 4) * .08);
    if (p > 0) ice += `<rect x="${i * 64}" y="${300 - 300 * p}" width="52" height="${300 * p}" rx="20" fill="${P.iceHi}" opacity=".8"/><path d="M ${i * 64 + 6} 300 l 8 ${40 * p} l 8 ${-40 * p} M ${i * 64 + 28} 300 l 8 ${26 * p} l 8 ${-26 * p}" fill="${P.ice}"/>`;
  }
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-20" y="40" width="${9 * 64 + 28}" height="30" fill="#8d96a3"/><rect x="-20" y="230" width="${9 * 64 + 28}" height="30" fill="#8d96a3"/>${fins}${ice}</g>`;
}
function binoMask(inner, sway = [0, 0]) {
  const [dx, dy] = sway;
  return `<clipPath id="v28bino"><circle cx="${330 + dx}" cy="${820 + dy}" r="330"/><circle cx="${750 + dx}" cy="${820 + dy}" r="330"/></clipPath>
    <rect x="0" y="0" width="1080" height="1920" fill="#030509"/>
    <g clip-path="url(#v28bino)">${inner}<rect x="0" y="0" width="1080" height="1920" fill="#7fb0ff" opacity=".05"/></g>
    <circle cx="${330 + dx}" cy="${820 + dy}" r="330" fill="none" stroke="#000" stroke-width="40" opacity=".6" filter="url(#blur20)"/><circle cx="${750 + dx}" cy="${820 + dy}" r="330" fill="none" stroke="#000" stroke-width="40" opacity=".6" filter="url(#blur20)"/>`;
}
function floorMap(x, y1, w, rh, o = {}) {
  // schematic stack 1 (bottom) -> 17 (top); y1 = bottom edge of floor 1
  let s = '';
  for (let f = 1; f <= 17; f++) {
    const y = y1 - f * rh;
    const hi = o.hi && o.hi(f);
    s += `<rect x="${x}" y="${y + 3}" width="${w}" height="${rh - 6}" rx="6" fill="${hi ? hi : P.navy2}" stroke="${P.grid}" stroke-width="3"/>`;
    if (o.labels !== false && (f % 2 === 1 || f === 14 || f === 17)) s += T(String(f), x - 24, y + rh * .7, Math.min(64, rh * .58), f === 14 && o.mark14 ? P.red : P.grey, { a: 'end' });
  }
  return s;
}

function frostBig(x, y, w, h, seed, thaw, cx, cy) {
  // close-up frosted pane with fern crystals; thaw radius reveals dark outside
  let ferns = '';
  for (let i = 0; i < 14; i++) {
    const fx = x + hash(i + seed) * w, fy = y + hash(i * 2 + seed) * h, a = hash(i * 5 + seed) * 360, L = 80 + 120 * hash(i + 9);
    ferns += `<g transform="translate(${fx} ${fy}) rotate(${a})"><path d="M 0 0 L ${L} 0 ${Array.from({ length: 5 }, (_, k) => `M ${L * (k + 1) / 6} 0 l ${L * .14} ${-L * .14} M ${L * (k + 1) / 6} 0 l ${L * .14} ${L * .14}`).join(' ')}" stroke="#fff" stroke-width="5" fill="none" opacity=".75" stroke-linecap="round"/></g>`;
  }
  const id = `v28fb${seed}`;
  return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}"/></clipPath>
    <g clip-path="url(#${id})"><rect x="${x}" y="${y}" width="${w}" height="${h}" fill="url(#v28fr)"/>${ferns}
    ${thaw > 0 ? `<circle cx="${cx}" cy="${cy}" r="${thaw}" fill="${P.dark}" filter="url(#blur20)"/><circle cx="${cx}" cy="${cy}" r="${thaw * .82}" fill="${P.dark}"/>` : ''}</g>`;
}
function room(o = {}) {
  // dim apartment interior: wall, floor, frosted window on right
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.wall}"/>
    <rect x="0" y="1300" width="1080" height="620" fill="${P.floor}"/>
    <rect x="0" y="1290" width="1080" height="16" fill="${P.wallSh}"/>
    ${o.noWin ? '' : `<rect x="${o.wx ?? 640}" y="300" width="360" height="560" fill="${P.wallSh}"/>${frostBig((o.wx ?? 640) + 20, 320, 320, 520, 11, o.thaw || 0, (o.wx ?? 640) + 180, 580)}
    <rect x="${(o.wx ?? 640) + 170}" y="320" width="20" height="520" fill="#4a566b"/><rect x="${(o.wx ?? 640) - 10}" y="850" width="380" height="24" fill="#4a566b"/>
    <polygon points="${(o.wx ?? 640) + 20},860 ${(o.wx ?? 640) + 340},860 ${(o.wx ?? 640) + 420},1300 ${(o.wx ?? 640) - 120},1300" fill="#cfe0f0" opacity=".05"/>`}`;
}
function hallBg() {
  return `<rect x="0" y="0" width="1080" height="1920" fill="#2a3240"/><rect x="0" y="1500" width="1080" height="420" fill="#1c222c"/>
    <rect x="0" y="1490" width="1080" height="14" fill="#151a22"/>`;
}
function bathNight(t, extra = '') {
  let tiles = '';
  for (let i = 0; i < 9; i++) tiles += `<line x1="${i * 135}" y1="0" x2="${i * 135}" y2="1320" stroke="${P.tileLn}" stroke-width="4"/>`;
  for (let j = 0; j < 11; j++) tiles += `<line x1="0" y1="${j * 135}" x2="1080" y2="${j * 135}" stroke="${P.tileLn}" stroke-width="4"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.tile}"/>${tiles}<rect x="0" y="1320" width="1080" height="600" fill="#2b323e"/>
    <rect x="890" y="0" width="34" height="1320" fill="#8d96a3"/><rect x="880" y="400" width="54" height="30" fill="#6f7884"/><rect x="880" y="1000" width="54" height="30" fill="#6f7884"/>${extra}`;
}

// ---------- v28 additions (Teil 2: Die Nachricht unter der Tür) ----------
const S = { coat: '#1a1f2a', coatSh: '#12161e', glove: '#0b0d12', paper: '#eef0ea', paperSh: '#d3d6cf', ink: '#1a1d24', pen: '#24407a', match: '#d8b98a', head: '#a33', curtain: '#3b4a63', curtainSh: '#2e3a4f' };
// door seen from inside, low angle on the gap under it. o.strip 0..1 torch light, o.feet 0..1 shadows, o.sway, o.flame 0..1, o.lean deg, o.paper 0..1
function gapView(t, o = {}) {
  const st = o.strip ?? 1, fe = o.feet || 0, sw = o.sway || 0, fl = .85 + .15 * Math.sin(t * 13);
  const fx = o.feetX || 0;
  let s = `<rect x="-200" y="-200" width="1480" height="2400" fill="#0a0e16"/>
    <rect x="-20" y="160" width="1120" height="900" fill="#3a2617"/><rect x="60" y="230" width="960" height="360" rx="10" fill="#33210f"/><rect x="60" y="640" width="960" height="360" rx="10" fill="#33210f"/>
    <rect x="-20" y="1040" width="1120" height="30" fill="${P.torch}" opacity="${st * fl}"/>
    <polygon points="-20,1070 1100,1070 1300,1920 -220,1920" fill="url(#v28gap)" opacity="${.6 * st * fl}"/>`;
  if (fe > 0) s += `<g opacity="${fe}"><rect x="${300 + sw + fx}" y="1040" width="150" height="30" fill="#0a0e16"/><rect x="${620 + sw * .8 + fx}" y="1040" width="150" height="30" fill="#0a0e16"/>
    <polygon points="${300 + sw + fx},1070 ${450 + sw + fx},1070 ${520 + sw * 1.3 + fx},1920 ${200 + sw * 1.3 + fx},1920" fill="#0a0e16" opacity=".85"/><polygon points="${620 + sw * .8 + fx},1070 ${770 + sw * .8 + fx},1070 ${900 + sw + fx},1920 ${600 + sw + fx},1920" fill="#0a0e16" opacity=".85"/></g>`;
  if (o.flame > 0) {
    const f = o.flame, w = 1 + .15 * Math.sin(t * 29) + .1 * Math.sin(t * 41);
    s += `<ellipse cx="560" cy="1050" rx="${200 * f}" ry="${60 * f}" fill="url(#v28am)" opacity="${.9 * f}"/>
      <g transform="translate(560 1068) skewX(${o.lean || 0}) scale(${.55 * f} ${.55 * f * w})"><path d="M 0 0 C -26 -20 -18 -60 0 -92 C 18 -60 26 -20 0 0 Z" fill="${P.amber}"/><path d="M 0 -4 C -12 -18 -8 -40 0 -58 C 8 -40 12 -18 0 -4 Z" fill="#fff4cf"/></g>`;
  }
  if (o.paper > 0) s += `<g transform="translate(560 ${1210 - 80 * (1 - o.paper)}) rotate(-6)" opacity="${cl(o.paper * 2)}"><rect x="-150" y="-40" width="300" height="90" rx="6" fill="${S.paper}"/><rect x="-150" y="30" width="300" height="20" fill="${S.paperSh}"/><path d="M -110 -10 h 160 M -110 14 h 120" stroke="#9aa0a8" stroke-width="8" stroke-linecap="round"/></g>`;
  s += `<rect x="-200" y="1060" width="1480" height="900" fill="#0d1119" opacity=".55"/>`;
  return s;
}
// the stranger from behind: hooded dark coat, no face; origin at feet, faces away (towards the door)
function stranger(x, y, s, o = {}) {
  const a = o.arm ?? 8;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="0" rx="140" ry="20" fill="#000" opacity=".35"/>
    <rect x="-74" y="-320" width="64" height="320" rx="24" fill="#151922"/><rect x="10" y="-320" width="64" height="320" rx="24" fill="#151922"/>
    <rect x="-136" y="-640" width="272" height="380" rx="70" fill="${S.coat}"/><rect x="40" y="-630" width="96" height="360" rx="48" fill="${S.coatSh}"/>
    <g transform="rotate(${-a} 112 -580)"><rect x="88" y="-600" width="54" height="270" rx="27" fill="${S.coatSh}"/><circle cx="115" cy="-326" r="30" fill="${S.glove}"/></g>
    <g transform="rotate(10 -112 -580)"><rect x="-142" y="-600" width="54" height="260" rx="27" fill="${S.coatSh}"/><circle cx="-115" cy="-336" r="30" fill="${S.glove}"/></g>
    <path d="M -100 -650 Q -110 -820 0 -830 Q 110 -820 100 -650 Q 0 -620 -100 -650 Z" fill="${S.coatSh}"/>
    <path d="M -60 -800 Q 0 -840 60 -800" stroke="#232a38" stroke-width="10" fill="none"/></g>`;
}
function glove(x, y, s, rot = 0) { // gloved hand seen from the side, fingers pointing +x
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="-130" y="-34" width="120" height="68" rx="30" fill="${S.coatSh}"/>
    <rect x="-30" y="-46" width="110" height="92" rx="36" fill="${S.glove}"/>${[-30, -8, 14].map(d => `<rect x="60" y="${d}" width="56" height="22" rx="11" fill="${S.glove}"/>`).join('')}<rect x="10" y="-60" width="50" height="22" rx="11" fill="${S.glove}"/></g>`;
}
function matchStick(x, y, s, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><rect x="0" y="-6" width="120" height="12" rx="3" fill="${S.match}"/><ellipse cx="124" cy="0" rx="12" ry="10" fill="${S.head}"/></g>`;
}
// back of Sascha's head + shoulders (over the shoulder), origin = neck base
function saschaBack(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -260 300 Q -250 40 -120 10 L 120 10 Q 250 40 260 300 Z" fill="${P.jacket}"/><path d="M 120 10 Q 250 40 260 300 L 170 300 Z" fill="${P.jacketSh}"/>
    <path d="M -80 10 Q 0 -20 80 10 L 60 40 L -60 40 Z" fill="${P.jacketHi}"/>
    <rect x="-40" y="-60" width="80" height="80" fill="${P.skinSh}"/>
    <ellipse cx="-96" cy="-120" rx="18" ry="28" fill="${P.skinSh}"/><ellipse cx="96" cy="-120" rx="18" ry="28" fill="${P.skinSh}"/>
    <circle cx="0" cy="-140" r="100" fill="${P.hair}"/><path d="M -60 -220 Q 0 -246 60 -220" stroke="#2a2c33" stroke-width="10" fill="none"/></g>`;
}
function curtain(x, w, sway = 0) {
  let folds = '';
  for (let i = 0; i < 5; i++) folds += `<path d="M ${x + 20 + i * w / 5} -20 Q ${x + 30 + i * w / 5 + sway} 900 ${x + 20 + i * w / 5 + sway * 1.4} 1940" stroke="${S.curtainSh}" stroke-width="${w / 14}" fill="none"/>`;
  return `<rect x="${x}" y="-20" width="${w}" height="1960" fill="${S.curtain}"/>${folds}`;
}
function thermo(x, y, s, lvl) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-26" y="-150" width="52" height="300" rx="26" fill="${P.navy2}"/><circle cx="0" cy="170" r="48" fill="${P.navy2}"/>
    <rect x="-12" y="${-130 + 260 * (1 - lvl)}" width="24" height="${280 - 260 * (1 - lvl)}" rx="12" fill="#5aa8e6"/><circle cx="0" cy="170" r="34" fill="#5aa8e6"/></g>`;
}
function arrowD(x, y, p, col = P.red) { return p <= 0 ? '' : `<g transform="translate(${x} ${y}) scale(${p})"><path d="M 0 -60 V 50 M -36 14 L 0 54 L 36 14" stroke="${col}" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`; }
// window with a small top vent pane (Fortochka); o.open 0..1, o.frost 0..1 (pane frosted)
function ventWin(t, o = {}) {
  const op = o.open || 0, fr = o.frost ?? 1;
  return `<rect x="-200" y="-200" width="1480" height="2400" fill="${P.wall}"/>
    <rect x="140" y="220" width="800" height="1200" fill="#4a566b"/>
    ${frostBig(170, 540, 740, 850, 71, (1 - fr) * 420, 540, 960)}
    <rect x="525" y="540" width="30" height="850" fill="#4a566b"/>
    <rect x="170" y="250" width="740" height="270" fill="${P.dark}"/>${snowfall(t, 8, 300, 31, .7)}
    <g transform="translate(170 250)"><polygon points="0,0 ${740},0 ${740 - 40 * op},${270 - 10 * op} ${40 * op},${270 - 10 * op}" fill="url(#v28fr)" transform="translate(0 ${-60 * op}) scale(1 ${1 - .35 * op})" opacity=".97"/></g>
    <rect x="140" y="1400" width="800" height="36" fill="#5a667b"/>`;
}
// cross-section: window (left) -> room -> door gap (right) -> flame outside
function draftMap(t, p, flame = 1, lean = 0) {
  const flow = (t * 300) % 60;
  return `<rect x="-200" y="-200" width="1480" height="2400" fill="${P.navy}"/>
    <rect x="80" y="560" width="760" height="760" fill="${P.navy2}" stroke="${P.gridHi}" stroke-width="10"/>
    <rect x="70" y="640" width="24" height="200" fill="${P.dark}"/><rect x="40" y="620" width="80" height="18" fill="${P.frost}"/><rect x="40" y="842" width="80" height="18" fill="${P.frost}"/>
    <rect x="828" y="760" width="24" height="520" fill="#6e4529"/><rect x="828" y="1280" width="24" height="40" fill="${P.navy}"/>
    <rect x="840" y="1320" width="300" height="10" fill="${P.gridHi}"/>
    ${T('87', 960, 740, 60, P.grey)}
    <path d="M 60 740 C 380 760 520 1180 980 1300" stroke="${P.white}" stroke-width="12" fill="none" stroke-dasharray="40 20" stroke-dashoffset="${-flow}" pathLength="1000" style="stroke-dasharray:${1000 * p} 1000;opacity:.85"/>
    ${p > .95 ? `<path d="M 940 1270 L 990 1302 L 936 1322" stroke="${P.white}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : ''}
    ${flame > 0 ? `<ellipse cx="960" cy="1290" rx="90" ry="60" fill="url(#v28am)"/><g transform="translate(940 1318) skewX(${lean}) scale(.7)"><path d="M 0 0 C -26 -20 -18 -60 0 -92 C 18 -60 26 -20 0 0 Z" fill="${P.amber}"/></g>` : ''}`;
}

// ---------- shots ----------
function s0Gap(t) { // 0 - 2.8 : light under the door, two foot shadows step in
  const fe = .55 + .45 * eout(prog(t, .2, .55));
  const z = lerp(1.35, 1, eout(prog(t, 0, .6)));
  const [sx, sy] = shk(t, .3, 10, 7);
  return cam(gapView(t, { strip: 1, feet: fe, sway: 14 * Math.sin(t * 1.6), feetX: lerp(-420, 0, eout(prog(t, 0, .6))) }), z, 540, 1100, sx, sy)
    + slam(t, 1.44, 540, 420, T('87', 540, 500, 220, P.white, { st: P.navy, sw: 18 }));
}
function s1NoKnock(t) { // 2.8 - 4.62 : Sascha frozen, holding his breath; no knock
  const z = lerp(1.0, 1.1, eio(prog(t, 2.8, 4.62)));
  const hold = t > 3.3;
  return cam(`${room({ wx: 700 })}${door87(90, 420, 310, 880, { noPlate: true })}
    <rect x="90" y="1290" width="310" height="10" fill="${P.torch}" opacity=".85"/><rect x="170" y="1290" width="50" height="10" fill="#0a0e16"/><rect x="270" y="1290" width="50" height="10" fill="#0a0e16"/>
    <circle cx="350" cy="900" r="18" fill="${P.metalSh}"/><rect x="290" y="890" width="62" height="20" rx="10" fill="${P.metal}"/>
    ${sascha(700, 1560, .95, { t, aL: 14, aR: -14, brow: .7, mouth: 'tight', look: -1, eyes: 'wide' })}
    ${hold ? '' : breath(t, 700, 830, -1)}`, z, 540, 960);
}
function s2Face(t) { // 4.62 - 5.9 : he hears something
  const turn = eout(prog(t, 4.9, 5.2));
  return `${room({ wx: -400, noWin: true })}<rect width="1080" height="1920" fill="#000" opacity=".3"/>
    ${face(540, 900, 300, { eyes: 'wide', brow: .9, mouth: 'tight', look: lerp(0, -1, turn), tilt: -4 * turn })}
    <rect x="200" y="1300" width="680" height="700" rx="180" fill="${P.jacket}"/>`;
}
function s3Click(t) { // 5.9 - 6.62 : click — a spark beyond the gap
  const sp = prog(t, 5.98, 6.2);
  let spark = '';
  if (sp > 0 && sp < 1) for (let i = 0; i < 6; i++) { const a = i / 6 * Math.PI * 2; spark += `<line x1="${560 + 20 * Math.cos(a)}" y1="${1055 + 20 * Math.sin(a)}" x2="${560 + (40 + 60 * sp) * Math.cos(a)}" y2="${1055 + (40 + 60 * sp) * Math.sin(a) * .5}" stroke="#fff4cf" stroke-width="6" opacity="${1 - sp}"/>`; }
  return cam(gapView(t, { feet: 1, sway: 0 }) + spark, 1.5, 560, 1060);
}
function s4Flame(t) { // 6.62 - 8.7 : a small flame flickers under the door
  const f = eout(prog(t, 6.7, 7.3));
  const lean = lerp(0, 22, eio(prog(t, 8.3, 8.7)));
  return cam(gapView(t, { feet: 1, flame: f, lean }), lerp(1.7, 2.0, prog(t, 6.62, 8.7)), 560, 1060);
}
function s5Draft(t) { // 8.7 - 10.3 : diagram — air from the open window, through the room, out under the door
  const p = eio(prog(t, 8.75, 9.6));
  const lean = lerp(0, 24, eout(prog(t, 9.5, 9.9)));
  return cam(draftMap(t, p, 1, lean), 1.0, 540, 960) + pop(t, 9.0, 140, 470, `<circle cx="140" cy="470" r="60" fill="${P.navy2}"/><path d="M 110 470 h 60 M 140 440 v 60" stroke="${P.frost}" stroke-width="10" stroke-linecap="round" transform="rotate(45 140 470)"/>`);
}
function s6Mistake(t) { // 10.3 - 11.92 : he understands his mistake
  const d = eout(prog(t, 10.44, 10.8));
  return `${room({ wx: 700, thaw: 0 })}<rect width="1080" height="1920" fill="#000" opacity=".25"/>
    ${face(480, 860, 250, { eyes: 'wide', brow: 1, mouth: 'o', look: lerp(0, 1, d), tilt: 3 })}
    <rect x="160" y="1210" width="640" height="760" rx="170" fill="${P.jacket}"/>
    ${brackets(780, 380, 260, 380, eout(prog(t, 11.06, 11.3)))}`;
}
function s7Vent(t) { // 11.92 - 14.4 : the open vent pane let the glass freeze again
  const fr = eout(prog(t, 13.2, 14.3));
  const z = lerp(1.05, 1.0, prog(t, 11.92, 14.4));
  return cam(ventWin(t, { open: 1, frost: lerp(.6, 1, fr) }), z, 540, 900) + breath(t, 900, 1500, -1)
    + (fr > .95 ? `<g transform="translate(860 1180) scale(${back(prog(t, 14.1, 14.35))})"><circle r="60" fill="${P.navy2}"/><path d="M -26 0 L -6 20 L 28 -18" stroke="${P.white}" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : '');
}
function s8DraftOut(t) { // 14.4 - 17.42 : ...but a draft under the door
  const p = eio(prog(t, 14.5, 15.6));
  const hi = eout(prog(t, 15.86, 16.2));
  return cam(draftMap(t, p, 0) + `<circle cx="840" cy="1300" r="${110 * hi}" fill="none" stroke="${P.red}" stroke-width="12" opacity="${hi}"/>`, lerp(1.0, 1.25, eio(prog(t, 15.9, 17.4))), lerp(540, 760, eio(prog(t, 15.9, 17.4))), lerp(960, 1150, eio(prog(t, 15.9, 17.4))));
}
function s9Tarnung(t) { // 17.42 - 19.2 : his disguise gives him away — cold air leaks out under 87
  let wisps = '';
  for (let i = 0; i < 5; i++) { const q = ((t - 17.4) * .7 + i / 5) % 1; wisps += `<path d="M ${380 + i * 70} ${1490 - 20 * q} q ${30 + 60 * q} ${-30 - 50 * q} ${90 + 140 * q} ${-10 - 40 * q}" stroke="#dfe7f2" stroke-width="8" fill="none" opacity="${.7 * Math.sin(q * Math.PI)}" stroke-linecap="round"/>`; }
  const z = lerp(1.0, 1.12, eio(prog(t, 17.42, 19.2)));
  return cam(`${hallBg()}${door87(290, 380, 500, 1120)}${handle(700, 1000, .55, { ice: 1 })}${wisps}
    ${brackets(290, 1440, 500, 70, eout(prog(t, 18.2, 18.5)), P.red, 10)}`, z, 540, 1100);
}
function s10Hand(t) { // 19.2 - 21.2 : the stranger checks the handle (from behind, no face)
  const reach = eout(prog(t, 19.74, 20.3));
  return cam(`${hallBg()}${door87(240, 380, 500, 1120)}${handle(650, 1000, .55, { ice: 1 })}
    <ellipse cx="560" cy="900" rx="320" ry="260" fill="url(#v28tb)" opacity=".25"/>
    ${stranger(860, 1980, 1.25, { arm: lerp(8, 62, reach) })}`, 1.0, 540, 1000);
}
function s11Ice(t) { // 21.2 - 23.18 : ice crunches under his glove
  const press = eout(prog(t, 21.3, 21.85));
  const cr = prog(t, 21.88, 22.3);
  let cracks = '';
  if (t > 21.88) cracks = `<path d="M 560 860 l -40 -60 l 30 -40 M 640 870 l 20 -70 l 40 -20 M 720 950 l 60 30 l 10 50 M 520 960 l -60 40" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" pathLength="1" style="stroke-dasharray:${cr} 1"/>`;
  let chips = '';
  for (let i = 0; i < 6; i++) { const q = prog(t, 21.9 + i * .03, 22.6 + i * .03); if (q > 0 && q < 1) chips += `<rect x="${600 + 120 * Math.cos(i) * q}" y="${930 + 260 * q * q}" width="16" height="16" fill="${P.iceHi}" transform="rotate(${i * 40} ${600} ${930})" opacity="${1 - q}"/>`; }
  const [sx, sy] = shk(t, 21.88, 8, 9);
  return cam(`<rect x="-200" y="-200" width="1480" height="2400" fill="url(#v28dr)"/>${handle(330, 900, 1.6, { ice: 1 })}${cracks}${chips}
    ${glove(lerp(1200, 700, press), 900 + 6 * Math.sin(t * 20) * press, 1.5, 180)}`, lerp(1.05, 1.0, prog(t, 21.2, 23.18)), 540, 960, sx, sy);
}
function s12Signs(t) { // 23.18 - 28.4 : two signs contradict each other
  const card = (x, t0, inner) => pop(t, t0, x, 900, `<rect x="${x - 230}" y="620" width="460" height="560" rx="34" fill="${P.navy2}"/>${inner}`);
  const ice = `<g transform="translate(250 900)">${handle(-80, 0, .7, { ice: 1 })}</g>`;
  let wisps = '';
  for (let i = 0; i < 4; i++) { const q = ((t - 26.8) * .8 + i / 4) % 1; if (t > 26.8) wisps += `<path d="M ${740 + i * 30} ${1040} q ${40 * q} ${-60 * q} ${120 * q} ${-40 - 30 * q}" stroke="#dfe7f2" stroke-width="8" fill="none" opacity="${.8 * Math.sin(q * Math.PI)}" stroke-linecap="round"/>`; }
  const air = `<rect x="660" y="700" width="300" height="340" fill="url(#v28dr)"/><rect x="660" y="1040" width="300" height="12" fill="${P.torch}" opacity=".5"/>${wisps}`;
  const neq = back(prog(t, 24.0, 24.3));
  const fill1 = t > 25.54, fill2 = t > 26.8;
  const z = lerp(1.0, 1.05, prog(t, 23.18, 28.4));
  return cam(`<rect x="-200" y="-200" width="1480" height="2400" fill="${P.navy}"/>
    ${card(290, 23.3, fill1 ? ice : '')}${card(790, 23.45, fill2 ? air : '')}
    ${neq > 0 ? `<g transform="translate(540 900) scale(${neq})"><circle r="70" fill="${P.red}"/>${T('≠', 0, 34, 110, P.white)}</g>` : ''}
    ${fill1 ? brackets(70, 610, 440, 580, eout(prog(t, 25.54, 25.8)), P.white, 8) : ''}${fill2 ? brackets(570, 610, 440, 580, eout(prog(t, 26.8, 27.06)), P.red, 8) : ''}`, z, 540, 900);
}
function s13Match(t) { // 28.4 - 31.2 : he wedges a match into the door gap (outside)
  const ins = eio(prog(t, 29.1, 30.0));
  const off = eout(prog(t, 30.3, 30.9));
  const mx = lerp(760, 556, ins);
  const z = lerp(1.0, 1.25, eio(prog(t, 28.4, 31.2)));
  // door edge (left) | dark gap | frame (right) — the match sits in the gap, head outside
  return cam(`<rect x="-200" y="-200" width="1480" height="2400" fill="#2a3240"/>
    <rect x="-200" y="-200" width="740" height="2400" fill="url(#v28dr)"/><rect x="420" y="-200" width="120" height="2400" fill="${P.doorSh}"/>
    <rect x="540" y="-200" width="22" height="2400" fill="#05070b"/>
    <rect x="562" y="-200" width="200" height="2400" fill="${P.doorSh}"/><rect x="762" y="-200" width="600" height="2400" fill="#2a3240"/>
    <rect x="300" y="1300" width="40" height="110" rx="10" fill="${P.metalSh}"/>
    ${matchStick(mx - 60, 900, 1.3, 0)}
    <rect x="540" y="880" width="22" height="40" fill="#05070b" opacity="${ins > .9 ? .6 : 0}"/>
    ${glove(mx + 120 + 200 * off, 910 + 60 * off, 1.2, 180)}`, z, 600, 920);
}
function s14IfOpen(t) { // 31.2 - 33.34 : if the door opens, it falls (diagram only)
  const sw = eio(prog(t, 31.5, 32.3));
  const fall = ein(prog(t, 32.36, 32.9));
  return `<rect width="1080" height="1920" fill="${P.navy}"/>
    <rect x="200" y="420" width="680" height="900" rx="30" fill="${P.navy2}"/>
    <g stroke="${P.gridHi}" stroke-width="10" fill="none" stroke-dasharray="26 16">
      <rect x="340" y="520" width="320" height="700"/>
      <path d="M 660 520 L ${lerp(660, 540, sw)} ${lerp(520, 560, sw)} L ${lerp(660, 540, sw)} ${lerp(1220, 1180, sw)} L 660 1220"/></g>
    <rect x="652" y="520" width="16" height="700" fill="${P.white}" opacity=".5"/>
    <g transform="translate(${lerp(640, 700, fall)} ${lerp(860, 1220, fall)}) rotate(${lerp(0, 160, fall)})">${matchStick(0, 0, 1.1)}</g>
    ${fall >= 1 ? `<circle cx="720" cy="1240" r="${40 + 60 * prog(t, 32.9, 33.3)}" fill="none" stroke="${P.white}" stroke-width="6" opacity="${1 - prog(t, 32.9, 33.3)}"/>` : ''}
    ${pop(t, 31.3, 540, 330, `<circle cx="540" cy="330" r="70" fill="${P.navy2}"/>${T('?', 540, 370, 110, P.white)}`)}`;
}
function s15Leave(t) { // 33.34 - 34.6 : the footsteps move away
  const away = eio(prog(t, 33.44, 34.5));
  return cam(gapView(t, { feet: 1 - away * .9, feetX: 520 * away, strip: 1 - .6 * away }), 1.0, 540, 1100);
}
function s16Down(t) { // 34.6 - 36.0 : steps going down, floor 14 -> lower
  const y1 = 1600, rh = 70, x = 380, w = 320;
  let dots = '';
  for (let k = 0; k < 6; k++) { const t0 = 34.7 + k * .2; if (t < t0) break; const f = 14 - k; dots += `<circle cx="${x - 60}" cy="${y1 - f * rh + rh / 2}" r="${18 * back(prog(t, t0, t0 + .15))}" fill="${P.red}" opacity="${1 - k * .08}"/>`; }
  return `<rect width="1080" height="1920" fill="${P.navy}"/>
    ${floorMap(x, y1, w, rh, { mark14: true, hi: f => f === 14 ? '#3b2230' : null })}
    <rect x="${x + w * .55}" y="${y1 - 14 * rh + 12}" width="${w * .25}" height="${rh - 24}" rx="4" fill="${P.red}"/>${dots}
    ${arrowD(x - 140, y1 - 11 * rh, back(prog(t, 34.78, 35.0)))}`;
}
function s17Wait(t) { // 36.0 - 37.4 : Sascha waits
  const z = lerp(1.0, 1.08, prog(t, 36.0, 37.4));
  let ticks = '';
  for (let i = 0; i < 4; i++) ticks += `<circle cx="${420 + i * 80}" cy="300" r="16" fill="${t > 36.2 + i * .3 ? P.white : P.grid}"/>`;
  return cam(`${room({ wx: 700 })}${door87(90, 420, 310, 880, { noPlate: true })}
    ${sascha(560, 1580, 1.0, { t, aL: 12, aR: -12, brow: .6, mouth: 'tight', look: -.8 })}${breath(t, 560, 830, -1, 2.2)}`, z, 540, 1000) + ticks;
}
function s18Close(t) { // 37.4 - 39.64 : only then he closes the vent pane
  const cl1 = eio(prog(t, 37.6, 38.4));
  const reach = eout(prog(t, 37.4, 37.7));
  return cam(`${ventWin(t, { open: 1 - cl1, frost: 1 })}
    ${saschaSide(60, 1650, 1.5, { aF: lerp(-20, -140, reach), tilt: -10 })}
    ${cl1 >= 1 ? `<rect x="170" y="250" width="740" height="270" fill="#fff" opacity="${.5 * (1 - prog(t, 38.42, 38.7))}"/>` : ''}`, 1.0, 540, 900);
}
// courtyard seen from above (14th floor), between the curtains
function yard(t, o = {}) {
  const ang = o.ang ?? 0, beam = o.beam ?? 1;
  let prints = '';
  for (let i = 0; i < 12; i++) prints += `<ellipse cx="${200 + i * 50}" cy="${1500 - i * 40 + (i % 2) * 20}" rx="10" ry="16" fill="${P.snowSh}"/>`;
  const mx = 640, my = 1060;
  return `<rect x="-200" y="-200" width="1480" height="2400" fill="${P.snow}"/>
    <rect x="-200" y="-200" width="1480" height="500" fill="${P.bld}"/>${prints}
    <rect x="80" y="420" width="140" height="80" rx="10" fill="${P.snowSh}" opacity=".7"/><rect x="820" y="1300" width="200" height="90" rx="10" fill="${P.snowSh}" opacity=".7"/>
    ${beam > 0 ? `<g transform="translate(${mx} ${my}) rotate(${ang})" opacity="${beam}"><polygon points="0,0 -170,-620 170,-620" fill="${P.torch}" opacity=".35"/><ellipse cx="0" cy="-600" rx="200" ry="90" fill="url(#v28tb)" opacity=".8"/></g>` : ''}
    <ellipse cx="${mx}" cy="${my + 16}" rx="60" ry="24" fill="#000" opacity=".25"/>
    <g transform="translate(${mx} ${my}) rotate(${ang})"><rect x="-14" y="-110" width="28" height="90" rx="14" fill="${S.coat}"/><rect x="-10" y="-130" width="20" height="30" rx="6" fill="#3a3f4a"/></g>
    <ellipse cx="${mx}" cy="${my + 10}" rx="92" ry="60" fill="${S.coat}"/><circle cx="${mx}" cy="${my}" r="50" fill="${S.coatSh}"/><path d="M ${mx - 30} ${my - 30} Q ${mx} ${my - 50} ${mx + 30} ${my - 30}" stroke="#232a38" stroke-width="8" fill="none"/>
    ${snowfall(t, 30, 250, 41, .6)}`;
}
function s19Yard(t) { // 39.64 - 42.76 : in the yard, the same man with a torch
  const ang = 50 * Math.sin((t - 39.6) * 1.6);
  const z = lerp(1.0, 1.25, eio(prog(t, 39.64, 42.7)));
  return cam(yard(t, { ang }), z, 620, 1000) + curtain(-60, 240, 6 * Math.sin(t)) + curtain(900, 240, -6 * Math.sin(t));
}
function s20Still(t) { // 42.76 - 44.08 : he no longer searches — the beam stops
  const ang = lerp(50 * Math.sin((42.76 - 39.6) * 1.6), 0, eout(prog(t, 42.8, 43.3)));
  const tilt = eout(prog(t, 43.4, 44.0));
  return cam(yard(t, { ang }) + `<g transform="translate(640 1060) scale(1 ${1 - .4 * tilt})"><circle r="${30 + 10 * tilt}" fill="#e0c8a8" opacity="0"/></g>`, 1.4, 640, 1000) + curtain(-60, 200, 0) + curtain(940, 200, 0);
}
function s21Up(t) { // 44.08 - 46.44 : he looks straight at the 14th floor
  const fh = 92, y0 = 1820, x = 230, w = 620;
  const r = TW(x, y0, w, fh, 14, 2);
  const b = eout(prog(t, 44.2, 44.8));
  const st = (f, c) => 'frost';
  const tx = lerp(540, r.x + r.w / 2, b), ty = lerp(1700, r.y + r.h / 2, b);
  const vy = lerp(1400, 900, eio(prog(t, 44.1, 45.2)));
  return cam(`<rect x="-200" y="-400" width="1480" height="2800" fill="url(#v28sky)"/>${tower(x, y0, w, fh, { state: st, id: 'u' })}
    <rect x="-200" y="${y0}" width="1480" height="400" fill="${P.snow}"/>
    <polygon points="530,1880 550,1880 ${tx + 60},${ty} ${tx - 60},${ty}" fill="${P.torch}" opacity=".3"/>
    <ellipse cx="${tx}" cy="${ty}" rx="110" ry="90" fill="url(#v28tb)" opacity=".9"/>
    <circle cx="540" cy="1880" r="22" fill="${S.coat}"/>
    ${brackets(r.x, r.y, r.w, r.h, eout(prog(t, 45.12, 45.4)), P.red, 8)}`, 1.0, 540, vy) + snowfall(t, 40, 300, 43, .6)
    + pop(t, 45.12, 540, 220, pill(540, 220, 'ETAGE 14', 56, P.navy2, P.white));
}
function s22Curtain(t) { // 46.44 - 49.48 : Sascha stays behind the curtain until the light goes out
  const off = t > 48.76;
  const glow = off ? Math.max(0, 1 - (t - 48.76) / .1) : .7 + .2 * Math.sin(t * 7);
  const dim = eout(prog(t, 48.76, 49.1));
  return cam(`${room({ wx: -400, noWin: true })}
    <rect x="560" y="200" width="520" height="1200" fill="${P.dark}"/>
    ${curtain(520, 600, 4 * Math.sin(t * .8))}
    <ellipse cx="800" cy="760" rx="300" ry="380" fill="url(#v28tb)" opacity="${.55 * glow}"/>
    ${saschaSide(250, 1720, 1.0, { tilt: -4, eyes: 'wide' })}
    <rect x="-200" y="-200" width="1480" height="2400" fill="#000" opacity="${.35 * dim}"/>`, lerp(1.0, 1.1, eio(prog(t, 46.44, 49.48))), 520, 960);
}
function s23Back(t) { // 49.48 - 51.4 : he goes back to the door
  const w = (t - 49.48) * 8;
  const x = lerp(900, 420, eio(prog(t, 49.6, 51.2)));
  return cam(`${room({ wx: 1200, noWin: true })}${door87(60, 420, 310, 880, { noPlate: true })}
    <rect x="60" y="1290" width="310" height="10" fill="${P.torch}" opacity=".25"/>
    <g transform="translate(${2 * x} 0) scale(-1 1)">${saschaSide(x, 1600, .95, { walk: w })}</g>`, 1.0, 540, 1000);
}
function s24Note(t) { // 51.4 - 53.04 : a note lies on the floor by the door
  const p = eout(prog(t, 51.62, 51.9));
  return cam(gapView(t, { strip: .15, paper: 1 }) + (p > 0 ? `<ellipse cx="560" cy="1220" rx="${220 * p}" ry="${90 * p}" fill="none" stroke="${P.white}" stroke-width="8" opacity="${.8 * (1 - prog(t, 52.3, 53))}"/>` : ''), lerp(1.2, 1.45, eio(prog(t, 51.4, 53.04))), 560, 1150);
}
// the note held up (over the shoulder). side 'front' | 'back', flip 0..1 = mid-turn
function note(t, o = {}) {
  const fs = o.sx ?? 1;
  const front = `<rect x="-300" y="-390" width="600" height="780" rx="10" fill="${S.paper}"/>
    ${Array.from({ length: 3 }, (_, i) => `<line x1="-250" y1="${-330 + i * 40}" x2="${-60 + 30 * i}" y2="${-330 + i * 40}" stroke="#b3b8bf" stroke-width="10" stroke-linecap="round"/>`).join('')}
    ${o.l1 > 0 ? `<g opacity="${o.l1}">${T('BLOCK A', 0, -100, 92, S.ink)}</g>` : ''}
    ${o.l2 > 0 ? `<g opacity="${o.l2}">${T('7. ETAGE', 0, 20, 92, S.ink)}</g>` : ''}
    ${o.l3 > 0 ? `<g opacity="${o.l3}">${T('WIR HOLEN', 0, 180, 76, P.red)}${T('DICH', 0, 270, 76, P.red)}</g>` : ''}`;
  const wr = (s, y, p, size) => p <= 0 ? '' : `<clipPath id="v28w${y}"><rect x="-300" y="${y - size}" width="${600 * p}" height="${size * 1.4}"/></clipPath><g clip-path="url(#v28w${y})"><g transform="translate(0 ${y}) skewX(-14)">${T(s, 0, 0, size, S.pen, { ls: 3 })}</g></g>`;
  const backS = `<rect x="-300" y="-390" width="600" height="780" rx="10" fill="#e6e8e2"/>
    ${wr('DEIN VERSTECK', -170, o.b1 || 0, 66)}${wr('IM BAD.', -80, o.b1b || 0, 66)}${wr('ÖFFNE IHNEN', 110, o.b2 || 0, 66)}${wr('NICHT.', 200, o.b2b || 0, 66)}`;
  return `<g transform="scale(${fs} 1)">${o.side === 'back' ? backS : front}</g>`;
}
function noteShot(t, inner, z, fy) {
  const tr = 3 * Math.sin(t * 9);
  return cam(`${room({ wx: -400, noWin: true })}<rect width="1080" height="1920" fill="#000" opacity=".3"/>
    <g transform="translate(560 ${800 + tr}) rotate(-2)">${inner}</g>
    <path d="M 240 1700 Q 220 1300 300 1150" stroke="${P.jacket}" stroke-width="80" fill="none" stroke-linecap="round"/><circle cx="300" cy="1150" r="44" fill="${P.skin}"/>
    <path d="M 860 1700 Q 900 1300 820 1150" stroke="${P.jacketSh}" stroke-width="80" fill="none" stroke-linecap="round"/><circle cx="820" cy="1150" r="44" fill="${P.skin}"/>
    ${saschaBack(540, 1760, 1.6)}`, z, 540, fy);
}
function s25Front(t) { // 53.04 - 60.42 : the front: BLOCK A / 7. ETAGE / WIR HOLEN DICH
  const th = back(prog(t, 53.2, 53.5)) * (1 - eio(prog(t, 55.0, 55.3)));
  const lv = lerp(.5, .15, eio(prog(t, 53.74, 54.6)));
  const inner = note(t, { l1: cl(prog(t, 56.42, 56.6)), l2: cl(prog(t, 57.2, 57.4)), l3: cl(prog(t, 59.38, 59.55)) });
  const z = t < 58.16 ? lerp(1.0, 1.08, prog(t, 53.04, 58.16)) : lerp(1.15, 1.25, prog(t, 58.16, 60.42));
  const [sx, sy] = shk(t, 59.38, 10, 8);
  return cam(`<g transform="translate(${sx} ${sy})">${noteShot(t, inner, 1, 960)}</g>`, z, 540, t < 58.16 ? 900 : 1000)
    + (th > 0 ? `<g transform="translate(900 520) scale(${th})">${thermo(0, 0, .9, lv)}${arrowD(90, 60, 1, '#5aa8e6')}</g>` : '');
}
function s26Flip(t) { // 60.42 - 62.44 : Sascha turns the sheet over
  const f = eio(prog(t, 61.2, 61.7));
  const sxv = Math.cos(f * Math.PI);
  const inner = note(t, { side: f < .5 ? 'front' : 'back', sx: Math.max(.02, Math.abs(sxv)), l1: 1, l2: 1, l3: 1 });
  return cam(noteShot(t, inner, 1, 960), lerp(1.1, 1.0, eio(prog(t, 60.42, 61.2))), 540, 950);
}
function s27Back(t) { // 62.44 - 65.0 : on the back, another handwriting
  const inner = note(t, { side: 'back', b1: 0 });
  const z = lerp(1.0, 1.1, eio(prog(t, 62.44, 65.0)));
  const pen = eout(prog(t, 63.68, 64.0));
  return cam(noteShot(t, inner, 1, 960), z, 540, 900)
    + (pen > 0 ? `<g transform="translate(860 360) scale(${pen}) rotate(30)"><rect x="-14" y="-110" width="28" height="200" rx="10" fill="${S.pen}"/><path d="M -14 90 L 0 130 L 14 90 Z" fill="#c9ced6"/></g>` : '');
}
function s28Write(t) { // 65.0 - 68.02 : DEIN VERSTECK IM BAD. / ÖFFNE IHNEN NICHT.
  const inner = note(t, { side: 'back', b1: prog(t, 65.04, 65.6), b1b: prog(t, 65.6, 66.1), b2: prog(t, 66.82, 67.3), b2b: prog(t, 67.3, 67.6) });
  const z = lerp(1.3, 1.4, prog(t, 65.0, 68.02));
  const fy = lerp(700, 900, eio(prog(t, 66.4, 66.9)));
  return cam(noteShot(t, inner, 1, 960), z, 560, fy);
}
function s29Told(t) { // 68.02 - 70.06 : he told no one
  const sh = Math.sin(prog(t, 68.6, 69.6) * Math.PI * 3) * 4;
  return `${room({ wx: -400, noWin: true })}<rect width="1080" height="1920" fill="#000" opacity=".35"/>
    ${face(540, 860, lerp(260, 290, prog(t, 68.02, 70.06)), { eyes: 'wide', brow: 1, mouth: 'tight', tilt: sh, look: .3 * Math.sin(t * 2) })}
    <rect x="200" y="1250" width="680" height="760" rx="180" fill="${P.jacket}"/>`;
}
function s30Inside(t) { // 70.06 - 72.18 : only visible from inside — the bathroom hideout
  const pile = `<g transform="translate(400 1400)"><path d="M -300 0 Q -320 -200 -160 -260 Q 0 -300 160 -260 Q 320 -200 300 0 Z" fill="${P.bl2}"/>
    <path d="M -220 0 Q -230 -300 0 -330 Q 230 -300 220 0 Z" fill="${P.bl1}"/><path d="M -170 -290 Q 0 -360 170 -290 Q 0 -250 -170 -290 Z" fill="${P.bl3}"/></g>`;
  const z = lerp(1.0, 1.12, eio(prog(t, 70.06, 72.18)));
  return cam(`${bathNight(t, pile)}<rect x="-200" y="-200" width="1480" height="2400" fill="#050a14" opacity=".45"/>
    ${brackets(70, 1040, 660, 400, eout(prog(t, 71.18, 71.45)), P.red, 8)}`, z, 480, 1150);
}
function s31Wall(t) { // 72.18 - 73.74 : or heard through the wall — then the wall goes dark
  let rings = '';
  for (let i = 0; i < 3; i++) { const q = prog(t, 72.4 + i * .2, 73.1 + i * .2); if (q > 0 && q < 1) rings += `<path d="M ${1080 - 120 - 260 * q} ${760 - 200 * q} q ${-120 * q} ${200 * q} 0 ${400 * q}" stroke="#dfe7f2" stroke-width="${10 * (1 - q) + 3}" fill="none" opacity="${1 - q}"/>`; }
  const dark = eio(prog(t, 73.1, 73.7));
  let tiles = '';
  for (let i = 0; i < 6; i++) tiles += `<line x1="${i * 220}" y1="0" x2="${i * 220}" y2="1920" stroke="${P.tileLn}" stroke-width="6"/>`;
  for (let j = 0; j < 10; j++) tiles += `<line x1="0" y1="${j * 220}" x2="1080" y2="${j * 220}" stroke="${P.tileLn}" stroke-width="6"/>`;
  return `<rect width="1080" height="1920" fill="${P.tile}"/>${tiles}<rect x="890" y="0" width="60" height="1920" fill="#8d96a3"/>
    <rect width="1080" height="1920" fill="#050a14" opacity="${.45 + .5 * dark}"/>${rings}`;
}
function s32Who(t) { // 73.74 - 76.3 : the man at the door — or the writer?
  const a = back(prog(t, 74.76, 75.0)), b = back(prog(t, 76.18, 76.4));
  return `<rect width="1080" height="1920" fill="${P.navy}"/>
    ${a > 0 ? `<g transform="translate(540 560) scale(${a}) translate(-540 -560)"><clipPath id="v28pa"><rect x="80" y="230" width="920" height="660" rx="30"/></clipPath>
      <g clip-path="url(#v28pa)"><g transform="translate(540 560) scale(.55) translate(-560 -1060)">${gapView(t, { feet: 1, sway: 10 * Math.sin(t * 1.5) })}</g></g>
      <rect x="80" y="230" width="920" height="660" rx="30" fill="none" stroke="${P.red}" stroke-width="10"/></g>` : ''}
    ${b > 0 ? `<g transform="translate(540 1180) scale(${b}) translate(-540 -1180)"><rect x="80" y="960" width="920" height="440" rx="30" fill="${P.tile}"/>
      <g transform="translate(540 1180) scale(.4) rotate(-4)">${note(t, { side: 'back', b1: 1, b1b: 1, b2: 1, b2b: 1 })}</g>
      <rect x="80" y="960" width="920" height="440" rx="30" fill="none" stroke="#dfe7f2" stroke-width="10"/></g>` : ''}`;
}
function s33End(t) { // 77.0 - 78.8 : Sascha between both — "?" — back to the dark gap
  const q = back(prog(t, 77.16, 77.4));
  const dim = eio(prog(t, 78.2, 78.8));
  const look = Math.sin((t - 77.0) * 3) * .9;
  return `${room({ wx: -400, noWin: true })}<rect width="1080" height="1920" fill="#000" opacity=".4"/>
    ${face(540, 900, 280, { eyes: 'wide', brow: 1, mouth: 'tight', look })}
    <rect x="200" y="1290" width="680" height="760" rx="180" fill="${P.jacket}"/>
    ${q > 0 ? `<g transform="translate(540 330) scale(${q}) translate(-540 -330)">${T('?', 540, 400, 220, P.white, { st: P.red, sw: 14 })}</g>` : ''}
    <rect width="1080" height="1920" fill="#0a0e16" opacity="${.85 * dim}"/>`;
}

const SHOTS = [[0, s0Gap], [2.8, s1NoKnock], [4.62, s2Face], [5.9, s3Click], [6.62, s4Flame], [8.7, s5Draft], [10.3, s6Mistake], [11.92, s7Vent],
  [14.4, s8DraftOut], [17.42, s9Tarnung], [19.2, s10Hand], [21.2, s11Ice], [23.18, s12Signs], [28.4, s13Match], [31.2, s14IfOpen], [33.34, s15Leave],
  [34.6, s16Down], [36.0, s17Wait], [37.4, s18Close], [39.64, s19Yard], [42.76, s20Still], [44.08, s21Up], [46.44, s22Curtain], [49.48, s23Back],
  [51.4, s24Note], [53.04, s25Front], [60.42, s26Flip], [62.44, s27Back], [65.0, s28Write], [68.02, s29Told], [70.06, s30Inside], [72.18, s31Wall],
  [73.74, s32Who], [77.0, s33End]];
function scene(t) {
  let f = SHOTS[0][1];
  for (const [t0, fn] of SHOTS) if (t >= t0) f = fn;
  try { return defs27() + f(t); } catch (e) { return `<rect x="0" y="0" width="1080" height="1920" fill="${P.navy}"/>`; }
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
