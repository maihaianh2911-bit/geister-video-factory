// @ts-nocheck
// AUTO-GENERATED scene for v40. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// v40 — Schwarzes Loch. Cinematic space: indigo gradient, glowing orange accretion disk, cyan data, thin outlines, soft glow.
const K = { sp0: '#0B1026', sp1: '#1B2A5A', orange: '#FF8A3D', orangeHi: '#FFC27A', cyan: '#4FD1E8', star: '#F2F5FF', ink: '#0A0E1F', suit: '#EEF1F8', suitSh: '#C3CADB', stripe: '#FF8A3D', visor0: '#1E3A6E', visor1: '#4FD1E8', red: '#FF4D5E', ship: '#C9D3E6', shipSh: '#8E9AB3', skin: '#F1C6A5', hair: '#3A2A22', yellow: '#FFD166' };
const OL = K.ink;
const FONT = `font-family:'Inter';font-weight:900`;
const ST = (w = 3) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const pop = (t, t0, d = .25) => back(prog(t, t0, t0 + d));
const shk = (t, t0, a, dec = 8, f = 41) => t < t0 ? 0 : a * Math.exp(-(t - t0) * dec) * Math.sin((t - t0) * f);
const TX = (x, y, sz, txt, fill, o = {}) => `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'middle'}" style="${FONT};font-size:${sz}px;letter-spacing:${o.ls || 0}px${o.italic ? ';font-style:italic;font-weight:600' : ''}" fill="${fill}"${o.sw ? ` stroke="${o.sc || OL}" stroke-width="${o.sw}" paint-order="stroke" stroke-linejoin="round"` : ''}${o.op !== undefined ? ` opacity="${o.op}"` : ''}>${txt}</text>`;
const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;

const KDEFS = `<defs>
<linearGradient id="kspace" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="${K.sp0}"/><stop offset="1" stop-color="${K.sp1}"/></linearGradient>
<radialGradient id="kdisk" cx=".5" cy=".5" r=".5"><stop offset=".45" stop-color="#FFF3D6" stop-opacity="0"/><stop offset=".5" stop-color="#FFF3D6"/><stop offset=".62" stop-color="${K.orangeHi}"/><stop offset=".8" stop-color="${K.orange}" stop-opacity=".8"/><stop offset="1" stop-color="#B83A1E" stop-opacity="0"/></radialGradient>
<radialGradient id="kglowO" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${K.orange}" stop-opacity=".55"/><stop offset="1" stop-color="${K.orange}" stop-opacity="0"/></radialGradient>
<radialGradient id="kglowC" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="${K.cyan}" stop-opacity=".45"/><stop offset="1" stop-color="${K.cyan}" stop-opacity="0"/></radialGradient>
<radialGradient id="ksun" cx=".45" cy=".4" r=".6"><stop offset="0" stop-color="#FFF1B8"/><stop offset=".6" stop-color="${K.orangeHi}"/><stop offset="1" stop-color="${K.orange}"/></radialGradient>
<linearGradient id="kvisor" x1="0" y1="0" x2="1" y2="1"><stop offset="0" stop-color="${K.visor1}"/><stop offset=".5" stop-color="${K.visor0}"/><stop offset="1" stop-color="${K.orange}"/></linearGradient>
<radialGradient id="kgal" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFE9C2"/><stop offset=".3" stop-color="#C9B6FF" stop-opacity=".7"/><stop offset="1" stop-color="#6A5ACD" stop-opacity="0"/></radialGradient>
<filter id="kblur" x="-50%" y="-50%" width="200%" height="200%"><feGaussianBlur stdDeviation="14"/></filter>
</defs>`;

let STARS = '';
for (let i = 0; i < 140; i++) STARS += `<circle cx="${(hash(i * 1.3) * 1080).toFixed(1)}" cy="${(hash(i * 2.7) * 1920).toFixed(1)}" r="${(0.8 + hash(i * 5.1) * 2.6).toFixed(2)}" fill="${K.star}" opacity="${(.35 + .6 * hash(i * 9.2)).toFixed(2)}"/>`;
const space = (dx = 0, dy = 0) => `${R(0, 0, 1080, 1920, 'url(#kspace)')}<g transform="translate(${((dx % 1080) + 1080) % 1080 - 1080} ${((dy % 1920) + 1920) % 1920 - 1920})">${STARS}<g transform="translate(1080 0)">${STARS}</g><g transform="translate(0 1920)">${STARS}</g><g transform="translate(1080 1920)">${STARS}</g></g>`;

// black hole with accretion disk; tilt = disk flattening
function bh(x, y, r, t, o = {}) {
  const tilt = o.tilt ?? .28;
  let streaks = '';
  for (let i = 0; i < 18; i++) { const a = (i / 18) * 6.283 + t * (o.spin ?? .9); const rr = r * (1.35 + .8 * hash(i)); streaks += `<path d="M ${Math.cos(a) * rr} ${Math.sin(a) * rr * tilt} A ${rr} ${rr * tilt} 0 0 1 ${Math.cos(a + .5) * rr} ${Math.sin(a + .5) * rr * tilt}" stroke="#FFF3D6" stroke-width="${3 + 3 * hash(i + 2)}" fill="none" opacity=".55"/>`; }
  const disk = (half) => `<g clip-path="url(#${half})"><ellipse rx="${r * 2.6}" ry="${r * 2.6 * tilt}" fill="url(#kdisk)"/>${streaks}</g>`;
  const id = 'kh' + Math.round(x) + Math.round(y);
  return `<g transform="translate(${x} ${y})">
    <circle r="${r * 3.2}" fill="url(#kglowO)"/>
    <clipPath id="${id}t"><rect x="${-r * 3}" y="${-r * 3}" width="${r * 6}" height="${r * 3}"/></clipPath><clipPath id="${id}b"><rect x="${-r * 3}" y="0" width="${r * 6}" height="${r * 3}"/></clipPath>
    ${disk(id + 't')}
    <path d="M ${-r * 1.5} 0 A ${r * 1.5} ${r * 1.25} 0 0 1 ${r * 1.5} 0" stroke="${K.orangeHi}" stroke-width="${r * .22}" fill="none" opacity=".75"/>
    <circle r="${r * 1.04}" fill="none" stroke="#FFF3D6" stroke-width="${Math.max(2, r * .05)}" opacity=".9"/>
    <circle r="${r}" fill="#000"/>
    ${disk(id + 'b')}</g>`;
}

// astronaut, origin at body centre. sy = stretch, sx = squeeze
function astro(x, y, s, o = {}) {
  const sy = o.sy || 1, sx = o.sx || 1, aL = o.aL ?? 30, aR = o.aR ?? -30, lL = o.lL ?? 8, lR = o.lR ?? -8;
  const tint = o.tint || 0;
  const suit = tint ? `rgb(${Math.round(238 - 30 * tint)},${Math.round(241 - 180 * tint)},${Math.round(248 - 190 * tint)})` : K.suit;
  const limb = (px, py, ang, len, w, end) => `<g transform="rotate(${ang} ${px} ${py})"><rect x="${px - w / 2}" y="${py - 10}" width="${w}" height="${len}" rx="${w / 2}" fill="${suit}" ${ST(4)}/><rect x="${px - w / 2}" y="${py + len * .45}" width="${w}" height="12" fill="${K.stripe}"/>${end(px, py + len)}</g>`;
  const glove = (px, py) => `<circle cx="${px}" cy="${py}" r="20" fill="${K.suitSh}" ${ST(4)}/>${o.thumb ? `<rect x="${px - 6}" y="${py - 40}" width="12" height="30" rx="6" fill="${K.suitSh}" ${ST(3)}/>` : ''}`;
  const boot = (px, py) => `<rect x="${px - 26}" y="${py - 14}" width="52" height="36" rx="12" fill="#6B7590" ${ST(4)}/>`;
  const vis = o.visor || 'url(#kvisor)';
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s * sx} ${s * sy})" opacity="${o.op ?? 1}">
    <rect x="-70" y="-120" width="140" height="160" rx="30" fill="${K.suitSh}" ${ST(4)}/>
    ${limb(-40, 70, lL, 150, 46, boot)}${limb(40, 70, lR, 150, 46, boot)}
    ${limb(-78, -60, aL, 130, 40, glove)}
    <rect x="-82" y="-110" width="164" height="200" rx="60" fill="${suit}" ${ST(4)}/>
    <rect x="-82" y="-20" width="164" height="18" fill="${K.stripe}"/><rect x="-40" y="-70" width="80" height="44" rx="10" fill="${K.suitSh}" ${ST(3)}/><circle cx="-20" cy="-48" r="7" fill="${K.red}"/><circle cx="4" cy="-48" r="7" fill="${K.cyan}"/>
    ${limb(78, -60, aR, 130, 40, glove)}
    <circle cx="0" cy="-185" r="92" fill="${suit}" ${ST(4)}/>
    <path d="M -66 -190 Q -66 -250 0 -252 Q 66 -250 66 -190 Q 66 -132 0 -128 Q -66 -132 -66 -190 Z" fill="${vis}" ${ST(4)}/>
    ${o.face ? `<g opacity=".9"><circle cx="-20" cy="-196" r="${o.face === 'shock' ? 9 : 7}" fill="#fff"/><circle cx="20" cy="-196" r="${o.face === 'shock' ? 9 : 7}" fill="#fff"/>${o.face === 'shock' ? `<ellipse cx="0" cy="-160" rx="10" ry="13" fill="#fff"/>` : o.face === 'sleep' ? `<path d="M -30 -196 h 20 M 10 -196 h 20" stroke="#fff" stroke-width="5"/><path d="M -12 -162 Q 0 -154 12 -162" stroke="#fff" stroke-width="5" fill="none"/>` : `<path d="M -16 -166 Q 0 -150 16 -166" stroke="#fff" stroke-width="5" fill="none" stroke-linecap="round"/>`}</g>` : ''}
    <path d="M -44 -222 Q -20 -240 10 -238" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" opacity=".7"/>
    ${o.frost ? `<circle cx="0" cy="-185" r="98" fill="none" stroke="#DFF6FF" stroke-width="10" stroke-dasharray="6 14" opacity="${o.frost}"/>` : ''}</g>`;
}

function sun(x, y, r, t, face = 0) {
  let rays = ''; for (let i = 0; i < 12; i++) { const a = i / 12 * 6.283 + t * .3; rays += `<path d="M ${Math.cos(a) * r * 1.1} ${Math.sin(a) * r * 1.1} L ${Math.cos(a) * r * 1.35} ${Math.sin(a) * r * 1.35}" stroke="${K.orangeHi}" stroke-width="${r * .12}" stroke-linecap="round"/>`; }
  return `<g transform="translate(${x} ${y})"><circle r="${r * 1.8}" fill="url(#kglowO)"/>${rays}<circle r="${r}" fill="url(#ksun)" ${ST(3)}/>${face ? `<circle cx="${-r * .3}" cy="${-r * .1}" r="${r * .08}" fill="${OL}"/><circle cx="${r * .3}" cy="${-r * .1}" r="${r * .08}" fill="${OL}"/><path d="M ${-r * .25} ${r * .25} Q 0 ${r * .45} ${r * .25} ${r * .25}" stroke="${OL}" stroke-width="${r * .07}" fill="none" stroke-linecap="round"/>` : ''}</g>`;
}

function kcard(y, key, col, p, sub = '') {
  if (p <= 0) return '';
  const w = Math.max(560, key.length * 74 + 120);
  return `<g transform="translate(540 ${y}) scale(${p}) rotate(${-3 * (1 - cl(p))})"><rect x="${-w / 2}" y="-110" width="${w}" height="${sub ? 230 : 200}" rx="26" fill="#0E1636" opacity=".92" stroke="${col}" stroke-width="5"/>
    ${TX(0, 34, 112, key, col, { ls: 2 })}${sub ? TX(0, 96, 44, sub, K.star, { italic: 1, op: .85 }) : ''}</g>`;
}
function badge(label, p) {
  if (!label) return '';
  const w = label.length * 34 + 120;
  return `<g transform="translate(60 120) scale(${.85 + .15 * p})"><rect width="${w}" height="92" rx="20" fill="#0E1636" opacity=".85" stroke="${K.cyan}" stroke-width="4"/><path d="M 36 26 V 66 M 22 52 L 36 68 L 50 52" stroke="${K.cyan}" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>${TX(72, 62, 50, label, K.cyan, { anchor: 'start', ls: 2 })}</g>`;
}
function arrow(x1, y1, x2, y2, col, w = 14) { const a = Math.atan2(y2 - y1, x2 - x1), h = w * 2.4; return `<path d="M ${x1} ${y1} L ${x2 - Math.cos(a) * h * .6} ${y2 - Math.sin(a) * h * .6}" stroke="${col}" stroke-width="${w}" stroke-linecap="round"/><path d="M ${x2} ${y2} L ${x2 - Math.cos(a - .5) * h} ${y2 - Math.sin(a - .5) * h} L ${x2 - Math.cos(a + .5) * h} ${y2 - Math.sin(a + .5) * h} Z" fill="${col}"/>`; }
function shipF(x, y, s, t, o = {}) { // droplet ship with friend in round window
  const wave = o.wave ? 30 * Math.sin(t * 8) : 0;
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})">
    <path d="M -260 0 Q -200 -170 40 -170 Q 260 -150 300 0 Q 260 150 40 170 Q -200 170 -260 0 Z" fill="${K.ship}" ${ST(5)}/><path d="M -200 60 Q 0 140 240 50" stroke="${K.shipSh}" stroke-width="18" fill="none"/>
    <path d="M -260 0 L -380 ${-30 + 10 * Math.sin(t * 20)} L -380 ${30 - 10 * Math.sin(t * 20)} Z" fill="${K.orange}" opacity=".85"/>
    <circle cx="60" cy="-10" r="104" fill="#16234A" ${ST(6)}/><clipPath id="kwin"><circle cx="60" cy="-10" r="98"/></clipPath>
    <g clip-path="url(#kwin)"><path d="M -10 120 Q 60 30 130 120 Z" fill="${K.cyan}"/><circle cx="60" cy="-10" r="44" fill="${K.skin}" ${ST(3)}/><path d="M 14 -14 Q 10 -70 60 -66 Q 110 -70 106 -14 Q 96 -50 60 -48 Q 24 -50 14 -14 Z" fill="${K.hair}"/>
      <circle cx="${44 + (o.look || 0)}" cy="-10" r="6" fill="${OL}"/><circle cx="${76 + (o.look || 0)}" cy="-10" r="6" fill="${OL}"/>${o.mouth === 'o' ? `<ellipse cx="60" cy="18" rx="8" ry="10" fill="${OL}"/>` : o.mouth === 'sad' ? `<path d="M 48 22 Q 60 12 72 22" stroke="${OL}" stroke-width="4" fill="none"/>` : `<path d="M 48 14 Q 60 26 72 14" stroke="${OL}" stroke-width="4" fill="none"/>`}
      ${o.binoc ? `<rect x="22" y="-28" width="30" height="34" rx="8" fill="${OL}"/><rect x="68" y="-28" width="30" height="34" rx="8" fill="${OL}"/>` : ''}
      ${o.wave ? `<g transform="rotate(${wave} 120 60)"><rect x="112" y="-20" width="20" height="80" rx="10" fill="${K.skin}" ${ST(3)}/></g>` : ''}</g>
    <circle cx="60" cy="-10" r="104" fill="none" stroke="#fff" stroke-width="6" opacity=".5"/><path d="M 10 -80 Q 40 -100 80 -96" stroke="#fff" stroke-width="10" fill="none" opacity=".6" stroke-linecap="round"/></g>`;
}
function noodle(x0, y0, x1, y1, t, w = 46, wig = 30) { // spaghettified astronaut: long white tube with orange stripes
  let d = `M ${x0} ${y0}`; const n = 20;
  for (let i = 1; i <= n; i++) { const p = i / n; d += ` L ${lerp(x0, x1, p) + wig * Math.sin(p * 9 + t * 6) * Math.sin(p * Math.PI)} ${lerp(y0, y1, p)}`; }
  return `<path d="${d}" stroke="${OL}" stroke-width="${w + 8}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${K.suit}" stroke-width="${w}" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${K.stripe}" stroke-width="${w * .3}" fill="none" stroke-dasharray="20 60" stroke-linecap="round"/>`;
}
function xmark(x, y, s, p) { if (p <= 0) return ''; return `<path transform="translate(${x} ${y}) scale(${s})" d="M -60 -60 L 60 60 M 60 -60 L -60 60" stroke="${K.red}" stroke-width="22" stroke-linecap="round" pathLength="1" style="stroke-dasharray:${cl(p)} 1"/>`; }

// ---------- shots ----------
function sFall(t) {
  const dive = eio(prog(t, .2, 2.1));
  const flail = Math.sin(t * 9);
  return `${space(0, -t * 220)}${bh(540, 1500 - 120 * dive, 230 + 90 * dive, t, { tilt: .3 })}
    ${astro(540 + 20 * Math.sin(t * 2), 640 + 160 * dive, 1.45, { rot: 8 * Math.sin(t * 3), aL: 120 + 40 * flail, aR: -120 - 40 * flail, lL: 10 + 12 * flail, lR: -10 + 12 * flail, face: 'shock' })}`;
}
function sFeet(t) {
  const st = 1 + .35 * eout(prog(t, 2.44, 3.4));
  return `${space(0, -t * 400)}<circle cx="540" cy="2000" r="700" fill="url(#kglowO)"/>
    <g transform="translate(540 900) scale(1 ${st}) translate(-540 -900)">${astro(540, 760, 2.3, { rot: 0, aL: 150 + 10 * Math.sin(t * 8), aR: -150 - 10 * Math.sin(t * 8), lL: 4, lR: -4, face: 'shock' })}</g>
    ${[0, 1, 2].map(i => { const p = ((t * 1.4 + i / 3) % 1); return `<path d="M ${380 + i * 160} ${1300 + p * 300} v 90" stroke="${K.cyan}" stroke-width="10" stroke-linecap="round" opacity="${1 - p}"/>`; }).join('')}`;
}
function sTenSuns(t) {
  let suns = ''; let n = 0;
  for (let i = 0; i < 10; i++) { const t0 = 5.52 + i * .06; if (t < t0) continue; n++; const p = back(prog(t, t0, t0 + .2)); suns += sun(340 + ((i % 4) - 1.5) * 64, -150 - Math.floor(i / 4) * 60, 30 * p, t); }
  const tiltB = -14 * (1 - n / 10) + 2 * ring(t, 6.1, 2, 4);
  return `${space(t * 10, 0)}<g transform="translate(540 1140)">
    <path d="M -40 300 L 40 300 L 10 0 L -10 0 Z" fill="${K.shipSh}" ${ST(4)}/>
    <g transform="rotate(${tiltB})"><rect x="-380" y="-10" width="760" height="20" rx="10" fill="${K.ship}" ${ST(4)}/>
      <path d="M -340 0 L -400 -120 M -340 0 L -280 -120 M 340 0 L 280 -120 M 340 0 L 400 -120" stroke="${K.ship}" stroke-width="5"/>
      <path d="M -420 -120 Q -340 -70 -260 -120 Z" fill="${K.shipSh}" ${ST(3)}/><path d="M 260 -120 Q 340 -70 420 -120 Z" fill="${K.shipSh}" ${ST(3)}/>
      <g transform="translate(-340 -190)">${bh(0, 0, 44, t, { tilt: .3 })}</g>${suns}</g></g>
    ${kcard(380, '10 × SONNE', K.orange, pop(t, 5.52, .3))}`;
}
function sHorizon(t) {
  const z = 1 + .25 * eio(prog(t, 7.98, 13.1));
  const ring = prog(t, 8.9, 9.9);
  const ruler = eout(prog(t, 10.8, 11.4));
  return `${space(0, 0)}<g transform="translate(540 900) scale(${z}) translate(-540 -900)">${bh(540, 900, 260, t, { tilt: .22 })}
    <circle cx="540" cy="900" r="276" fill="none" stroke="${K.cyan}" stroke-width="8" stroke-dasharray="1" pathLength="1" style="stroke-dasharray:${ring} 1" opacity=".95"/>
    ${ruler > 0 ? `<g opacity="${ruler}"><path d="M ${540 - 260 * ruler} 1300 H ${540 + 260 * ruler} M ${540 - 260 * ruler} 1270 V 1330 M ${540 + 260 * ruler} 1270 V 1330" stroke="${K.cyan}" stroke-width="7"/>${TX(540, 1250, 64, '60 KM', K.cyan)}</g>` : ''}</g>`;
}
function sFar(t) {
  const thumb = back(prog(t, 15.5, 15.8));
  return `${space(t * 6, t * 4)}${bh(860, 1250, 70, t, { tilt: .3 })}
    ${astro(420, 760 + 14 * Math.sin(t * 1.5), 1.3, { rot: -10 + 4 * Math.sin(t), aL: 40, aR: lerp(-30, -150, thumb), thumb: thumb > .5, lL: 14, lR: -6, face: 'happy' })}`;
}
function sPull(t) {
  const fa = eout(prog(t, 18.4, 19.0)), ha = eout(prog(t, 20.1, 20.6));
  return `${space(0, -t * 30)}<circle cx="540" cy="2100" r="900" fill="url(#kglowO)"/>
    ${astro(540, 760, 1.6, { rot: 0, aL: 160, aR: -160, lL: 4, lR: -4, face: 'shock', sy: 1 + .06 * fa })}
    ${fa > 0 ? arrow(540, 1080, 540, 1080 + 300 * fa, K.orange, 22) : ''}
    ${ha > 0 ? arrow(540, 300, 540, 300 + 90 * ha, K.cyan, 14) : ''}`;
}
function sApproach(t) {
  const g = eio(prog(t, 21.3, 24.3));
  return `${space(0, -t * 120)}${bh(540, lerp(1700, 1500, g), lerp(140, 300, g), t)}
    ${astro(540, 640, 1.3, { rot: 6 * Math.sin(t * 4), aL: 150, aR: -150, face: 'shock', sy: 1 + .15 * g, sx: 1 - .05 * g })}`;
}
function sGauge(t) {
  const v = eout(prog(t, 24.6, 25.5)) * 100;
  const a = lerp(-120, 120, v / 100) * Math.PI / 180;
  return `${space(t * 8, 0)}<g transform="translate(540 820)"><circle r="330" fill="#0E1636" stroke="${K.cyan}" stroke-width="6"/>
    ${Array.from({ length: 21 }, (_, i) => { const b = lerp(-120, 120, i / 20) * Math.PI / 180; return `<path d="M ${Math.sin(b) * 270} ${-Math.cos(b) * 270} L ${Math.sin(b) * (i % 5 ? 300 : 316)} ${-Math.cos(b) * (i % 5 ? 300 : 316)}" stroke="${K.star}" stroke-width="${i % 5 ? 4 : 8}"/>`; }).join('')}
    <path d="M 0 0 L ${Math.sin(a) * 250} ${-Math.cos(a) * 250}" stroke="${K.orange}" stroke-width="16" stroke-linecap="round"/><circle r="26" fill="${K.orange}"/>
    ${TX(0, 170, 120, `${Math.round(v)} ×`, K.orange)}</g>
    <g transform="translate(540 1300)"><circle r="56" fill="#3D7BD8" ${ST(4)}/><path d="M -30 -20 Q -10 -40 10 -20 Q 30 0 10 20 Q -20 30 -30 -20 Z" fill="#5DBB63"/></g>`;
}
function sStretch(t) {
  const sy = 1 + 1.4 * eio(prog(t, 28.9, 29.7)), sx = 1 - .45 * eio(prog(t, 30.3, 31.1));
  const sq = prog(t, 30.3, 31.1);
  return `${space(0, -t * 60)}<circle cx="540" cy="2200" r="1000" fill="url(#kglowO)"/>
    ${astro(540, 900, 1.25, { rot: 0, aL: 170, aR: -170, lL: 2, lR: -2, sy, sx, face: 'shock' })}
    ${arrow(540, 380, 540, 200, K.cyan, 14)}${arrow(540, 1480, 540, 1640, K.orange, 18)}
    ${sq > 0 ? arrow(120 + 80 * sq, 900, 300 + 60 * sq, 900, K.cyan, 14) + arrow(960 - 80 * sq, 900, 780 - 60 * sq, 900, K.cyan, 14) : ''}`;
}
function sSpaghetti(t) {
  const tw = prog(t, 34.4, 36.2);
  const len = eio(prog(t, 32.74, 33.6));
  return `${space(0, -t * 80)}${bh(540, 1650, 200, t)}
    ${noodle(540, lerp(700, 260, len), 540, lerp(1000, 1450, len), t, 46, 40 * len)}
    <g transform="translate(540 ${lerp(700, 260, len) - 60})">${astro(0, 0, .45, { face: 'shock', aL: 150, aR: -150 })}</g>
    ${tw > 0 ? `<g transform="translate(${700} ${lerp(-200, 520, eout(prog(t, 34.4, 34.8)))}) rotate(${tw * 720} 0 300)"><path d="M -30 0 L -30 200 M 0 0 L 0 200 M 30 0 L 30 200" stroke="${K.ship}" stroke-width="12" stroke-linecap="round"/><path d="M -40 200 Q 0 260 40 200 L 14 300 L 14 700 L -14 700 L -14 300 Z" fill="${K.ship}" ${ST(4)}/></g>` : ''}`;
}
function sNotHuman(t) {
  const p = prog(t, 36.3, 38.9);
  let s = '';
  for (let i = 0; i < 3; i++) { const a = p * 5 + i * 2.1; const rr = 420 - 300 * p; s += noodle(540 + Math.cos(a) * rr, 960 + Math.sin(a) * rr * .3, 540 + Math.cos(a + .6) * rr * .8, 960 + Math.sin(a + .6) * rr * .24, t, 20, 6); }
  const outline = 1 - prog(t, 37.5, 38.6);
  return `${space(t * 10, 0)}${bh(540, 960, 200, t, { tilt: .25 })}${s}
    <g opacity="${outline * .8}"><g transform="translate(540 560)">${astro(0, 0, .9, { op: 1, visor: 'none' }).replace(/fill="[^"]*"/g, 'fill="none"').replace(/stroke="#0A0E1F"/g, `stroke="${K.cyan}"`)}</g></g>
    ${xmark(540, 500, 1.4, prog(t, 37.9, 38.3))}`;
}
function sRewind(t) {
  const p = prog(t, 39.02, 39.8);
  const giant = eout(prog(t, 40.4, 40.98));
  let lines = ''; if (p < 1) for (let i = 0; i < 8; i++) lines += `<rect x="0" y="${(i * 240 + t * 2000) % 1920}" width="1080" height="${10 + 20 * hash(i)}" fill="#fff" opacity=".18"/>`;
  return `${space(-t * 900 * (1 - p), 0)}${giant > 0 ? bh(540, 1900 + 400 * (1 - giant), 900 * giant, t, { tilt: .2, spin: .3 }) : ''}
    ${astro(540, 720, 1.4, { aL: 40, aR: -150, thumb: 1, face: 'happy', rot: lerp(360, 0, eout(p)) })}${lines}`;
}
function galaxy(cx, cy, s, t) {
  let arms = '';
  for (let a = 0; a < 2; a++) for (let i = 0; i < 70; i++) { const k = i / 70, ang = a * Math.PI + k * 7 + t * .05, r = 40 + k * 420; arms += `<circle cx="${Math.cos(ang) * r + 30 * (hash(i + a * 99) - .5)}" cy="${Math.sin(ang) * r * .55 + 20 * (hash(i * 3 + a) - .5)}" r="${2 + 5 * hash(i + 7 + a)}" fill="${i % 4 ? '#DCD3FF' : K.cyan}" opacity="${.9 - .5 * k}"/>`; }
  return `<g transform="translate(${cx} ${cy}) scale(${s})"><ellipse rx="520" ry="300" fill="url(#kgal)"/>${arms}<circle r="40" fill="#FFF4D6" filter="url(#kblur)"/></g>`;
}
function sGalaxy(t) {
  const z = 1 + 1.6 * ein(prog(t, 45.6, 46.4));
  const dl = prog(t, 43.4, 44.9);
  const sx = 540 + 300, sy = 900 + 90;
  return `${space(t * 6, 0)}<g transform="translate(540 900) scale(${z}) translate(-540 -900)">${galaxy(540, 900, 1, t)}
    <circle cx="${sx}" cy="${sy}" r="12" fill="${K.yellow}"/><circle cx="${sx}" cy="${sy}" r="${24 + 6 * Math.sin(t * 6)}" fill="none" stroke="${K.yellow}" stroke-width="4"/>
    ${dl > 0 ? `<path d="M ${sx} ${sy} L ${lerp(sx, 540, dl)} ${lerp(sy, 900, dl)}" stroke="${K.cyan}" stroke-width="6" stroke-dasharray="16 12"/>` : ''}
    ${t > 41.4 ? `<circle cx="540" cy="900" r="${60 + 10 * Math.sin(t * 5)}" fill="none" stroke="${K.orange}" stroke-width="6" opacity="${prog(t, 41.4, 41.8)}"/>` : ''}</g>`;
}
function sGiant(t) {
  let dots = '';
  for (let i = 0; i < 90; i++) { const p = ((t * .25 + hash(i)) % 1); const a = i * 2.4 + p * 4; const r = 900 * (1 - p) + 300; dots += `<circle cx="${540 + Math.cos(a) * r}" cy="${1020 + Math.sin(a) * r * .5}" r="${3 + 3 * hash(i + 2)}" fill="${K.orangeHi}" opacity="${.8 * (1 - p * .5)}"/>`; }
  return `${space(t * 4, 0)}${dots}${bh(540, 1020, 300, t, { tilt: .22, spin: .4 })}${kcard(380, '4 MIO. × SONNE', K.orange, pop(t, 47.5, .3))}`;
}
function sRadius(t) {
  const r = eout(prog(t, 50.4, 51.4));
  return `${space(t * 4, 0)}${bh(500, 980, 400, t, { tilt: .18, spin: .3 })}
    ${r > 0 ? `<path d="M 500 980 L ${500 + 400 * r} 980" stroke="${K.cyan}" stroke-width="8" stroke-dasharray="20 12"/><circle cx="500" cy="980" r="10" fill="${K.cyan}"/>` : ''}
    ${sun(990, 560, 22, t)}<path d="M 990 600 L 990 680" stroke="${K.orangeHi}" stroke-width="4" opacity=".7"/>`;
}
function sCross(t) {
  const x = lerp(220, 860, eio(prog(t, 53.7, 58.3)));
  const lineX = 620;
  const crossed = x > lineX;
  const shrug = back(prog(t, 57.3, 57.6));
  return `${space(0, 0)}<rect x="${lineX}" y="0" width="${1080 - lineX}" height="1920" fill="#000" opacity=".5"/>
    <path d="M ${lineX} 0 V 1920" stroke="${K.orange}" stroke-width="${10 + 4 * Math.sin(t * 6)}" opacity=".9"/><rect x="${lineX - 40}" y="0" width="80" height="1920" fill="url(#kglowO)" opacity=".6"/>
    ${astro(x, 860 + 20 * Math.sin(t * 1.3), 1.15, { rot: -6, aL: crossed ? lerp(30, 120, shrug) : 30, aR: crossed ? lerp(-30, -120, shrug) : -30, face: 'happy', lL: 10, lR: -4 })}
    ${crossed ? `<g opacity="${prog(t, 56.6, 57.0)}">${[0, 1].map(i => `<circle cx="${x + 140}" cy="${700 - i * 40}" r="${8 + i * 6}" fill="${K.star}" opacity=".8"/>`).join('')}</g>` : ''}`;
}
function sNoJolt(t) {
  const icons = [[58.7, 300, 'jolt'], [59.64, 540, 'boom'], [60.42, 780, 'warn']];
  let s = '';
  for (const [t0, x, k] of icons) {
    const p = pop(t, t0 - .15, .2);
    if (p <= 0) continue;
    const ic = k === 'jolt' ? `<path d="M -80 0 L -40 -40 L 0 40 L 40 -40 L 80 0" stroke="${K.cyan}" stroke-width="18" fill="none" stroke-linejoin="round" stroke-linecap="round"/>`
      : k === 'boom' ? `<path d="M 0 -90 L 22 -30 L 86 -40 L 40 6 L 76 64 L 14 40 L -20 96 L -30 34 L -90 40 L -46 -6 L -80 -64 L -20 -36 Z" fill="${K.orange}" ${ST(5)}/>`
        : `<path d="M 0 -80 L 80 60 L -80 60 Z" fill="${K.yellow}" ${ST(6)}/><rect x="-8" y="-30" width="16" height="56" rx="6" fill="${OL}"/><circle cx="0" cy="44" r="8" fill="${OL}"/>`;
    s += `<g transform="translate(${x} 860) scale(${p})"><circle r="120" fill="#0E1636" stroke="${K.star}" stroke-width="4" opacity=".9"/>${ic}</g>${xmark(x, 860, 1.2, prog(t, t0, t0 + .2))}`;
  }
  return `${space(t * 10, 0)}<rect x="0" y="0" width="1080" height="1920" fill="#000" opacity=".35"/>${s}`;
}
function sDrift(t) {
  return `${space(-t * 30, 0)}<rect x="0" y="0" width="1080" height="1920" fill="#000" opacity=".45"/>
    ${astro(lerp(300, 760, prog(t, 61.34, 62.98)), 900 + 30 * Math.sin(t * 2), 1.4, { rot: 70, aL: 60, aR: -20, lL: 30, lR: 10, face: 'sleep' })}
    ${[0, 1, 2].map(i => { const p = (t * .8 + i / 3) % 1; return TX(700 + 40 * i, 640 - p * 200, 50 + i * 10, 'z', K.cyan, { op: 1 - p }); }).join('')}`;
}
function sNoReturn(t) {
  const beam = prog(t, 65.3, 66.6);
  let ph = '';
  for (let i = 0; i < 10; i++) { const p = cl(beam * 1.4 - i * .04); if (p <= 0) continue; const x = 540 + 30 + p * 280 * Math.cos(p * 3), y = 860 - p * 420 + p * p * 900; ph += `<circle cx="${x}" cy="${y}" r="10" fill="${K.yellow}"/>`; }
  const xb = prog(t, 64.5, 64.9);
  return `${space(0, 0)}<rect width="1080" height="1920" fill="#000" opacity=".55"/><circle cx="540" cy="1900" r="700" fill="url(#kglowO)" opacity=".5"/>
    ${astro(540, 900, 1.2, { aR: -100, aL: 30, face: 'shock', rot: 0 })}
    <path d="M 640 860 L 700 840" stroke="${K.yellow}" stroke-width="8"/>${ph}
    ${t > 63.5 ? `<g opacity="${prog(t, 63.5, 63.9)}">${arrow(540, 400, 540, 180, K.star, 16)}</g>${xmark(540, 290, 1, xb)}` : ''}`;
}
function sMinute(t) {
  const sec = cl((t - 67.3) / 3.2) * 50;
  const a = sec / 60 * 6.283;
  return `${space(t * 5, 0)}<rect width="1080" height="1920" fill="#000" opacity=".4"/>
    <g transform="translate(540 1000)"><circle r="300" fill="#0E1636" stroke="${K.cyan}" stroke-width="8"/><rect x="-40" y="-370" width="80" height="60" rx="12" fill="${K.cyan}"/>
    <path d="M 0 0 L 0 -260 A 260 260 0 ${a > Math.PI ? 1 : 0} 1 ${Math.sin(a) * 260} ${-Math.cos(a) * 260} Z" fill="${K.orange}" opacity=".35"/>
    ${Array.from({ length: 12 }, (_, i) => `<path d="M ${Math.sin(i * .5236) * 240} ${-Math.cos(i * .5236) * 240} L ${Math.sin(i * .5236) * 280} ${-Math.cos(i * .5236) * 280}" stroke="${K.star}" stroke-width="6"/>`).join('')}
    <path d="M 0 0 L ${Math.sin(a) * 250} ${-Math.cos(a) * 250}" stroke="${K.orange}" stroke-width="12" stroke-linecap="round"/><circle r="20" fill="${K.orange}"/></g>
    ${kcard(400, '≤ 1 MINUTE', K.cyan, pop(t, 69.44, .3))}`;
}
function sInner(t) {
  const st = eio(prog(t, 72.8, 73.8));
  return `${R(0, 0, 1080, 1920, '#05060E')}<circle cx="540" cy="1500" r="${60 + 10 * Math.sin(t * 9)}" fill="#FFF3D6" filter="url(#kblur)"/><circle cx="540" cy="1500" r="400" fill="url(#kglowO)"/>
    ${st < .3 ? astro(540, 760, 1.2, { rot: 0, aL: 160, aR: -160, face: 'shock', sy: 1 + 2 * st }) : noodle(540, 300, 540, lerp(1000, 1450, st), t, 46, 20) + `<g transform="translate(540 260)">${astro(0, 0, .5, { face: 'shock', aL: 150, aR: -150 })}</g>`}`;
}
function sFriend(t) {
  const enter = eout(prog(t, 74.6, 75.6));
  return `${space(t * 12, 0)}${bh(300, 1500, 260, t, { tilt: .2, spin: .4 })}
    ${shipF(lerp(1400, 640, enter), 760 + 20 * Math.sin(t * 1.6), 1.3, t, { wave: t > 76.2 && t < 77.4, binoc: t > 78.0, look: -6 })}
    ${astro(300, 1180 + 30 * Math.sin(t), .35, { rot: -20 })}`;
}
function sSlow(t) {
  const sp = lerp(1, .05, eout(prog(t, 80.0, 82.2)));
  const y = 900 + 260 * (1 - Math.exp(-(t - 79.74) * 1.2)) * .6;
  const ph = (t - 79.74) * sp;
  return `${space(0, 0)}<path d="M 0 1300 Q 540 1220 1080 1300 L 1080 1920 L 0 1920 Z" fill="#000"/><path d="M 0 1300 Q 540 1220 1080 1300" stroke="${K.orange}" stroke-width="12" fill="none"/>
    ${astro(540, Math.min(y, 1130), .9, { rot: 0, aL: 120 + 40 * Math.sin(ph * 9), aR: -120 - 40 * Math.sin(ph * 9), face: 'shock' })}
    <g transform="translate(860 380)"><circle r="110" fill="#0E1636" stroke="${K.cyan}" stroke-width="6"/><path d="M 0 0 L ${Math.sin(t * 6 * sp) * 90} ${-Math.cos(t * 6 * sp) * 90}" stroke="${K.cyan}" stroke-width="8" stroke-linecap="round"/></g>
    <g transform="translate(150 260) scale(.5)">${shipF(0, 0, 1, t, { binoc: 1 })}</g>`;
}
function sFreeze(t) {
  const red = eout(prog(t, 83.1, 83.6)), dark = eout(prog(t, 83.9, 84.6)), frost = eout(prog(t, 85.8, 86.5));
  return `${space(0, 0)}<path d="M 0 1300 Q 540 1220 1080 1300 L 1080 1920 L 0 1920 Z" fill="#000"/><path d="M 0 1300 Q 540 1220 1080 1300" stroke="${K.orange}" stroke-width="12" fill="none"/>
    <g opacity="${1 - .65 * dark}">${astro(540, 1120, .95, { rot: 0, aL: 140, aR: -140, tint: red, frost, visor: red > .5 ? '#5A1020' : undefined })}</g>
    <rect width="1080" height="1920" fill="#B0182E" opacity="${.25 * red * (1 - dark * .5)}"/>
    ${frost > 0 ? `<rect x="20" y="20" width="1040" height="1880" rx="40" fill="none" stroke="#DFF6FF" stroke-width="${24 * frost}" opacity=".6"/>` : ''}
    ${kcard(420, 'EINGEFROREN?', K.cyan, pop(t, 86.22, .3))}`;
}
function sSplit(t) {
  const shrug = back(prog(t, 89.3, 89.6));
  return `<clipPath id="ktop"><rect width="1080" height="950"/></clipPath><clipPath id="kbot"><rect y="970" width="1080" height="950"/></clipPath>
    <g clip-path="url(#ktop)">${space(t * 10, 0)}<path d="M 0 760 Q 540 700 1080 760 L 1080 950 L 0 950 Z" fill="#000"/><g opacity=".5">${astro(700, 660, .5, { rot: 0, tint: 1, visor: '#5A1020', frost: 1 })}</g>${shipF(300, 360, .8, t, { binoc: 1, mouth: shrug > .5 ? 'sad' : 'happy' })}</g>
    <rect y="950" width="1080" height="20" fill="${K.orange}"/>
    <g clip-path="url(#kbot)">${R(0, 970, 1080, 950, '#05060E')}<circle cx="540" cy="1700" r="300" fill="url(#kglowO)"/>${astro(540, 1260 + 20 * Math.sin(t * 2), .9, { aL: 40, aR: -150 + 30 * Math.sin(t * 8), face: 'happy' })}</g>`;
}
function sChoice(t) {
  const pl = t > 93.1 && t < 93.9, pr = t > 93.9;
  const q = pop(t, 94.6, .3);
  return `${space(t * 8, 0)}${bh(250, 1180, pl ? 110 : 90, t, { tilt: .3 })}${bh(860, 1240, pr ? 230 : 200, t, { tilt: .22, spin: .4 })}
    ${astro(540, 640, 1.05, { aL: pl ? 120 : 30, aR: pr ? -120 : -30, face: 'happy', rot: pl ? -8 : pr ? 8 : 0 })}
    ${q > 0 ? `<g transform="translate(540 ${300}) scale(${q})">${TX(0, 0, 200, '?', K.orange, { sw: 6, sc: K.sp0 })}</g>` : ''}`;
}

const SHOTS = [[0, 2.1, sFall], [2.1, 4.4, sFeet], [4.4, 7.98, sTenSuns], [7.98, 13.14, sHorizon], [13.14, 16.82, sFar], [16.82, 21.3, sPull], [21.3, 24.3, sApproach], [24.3, 28.48, sGauge],
  [28.48, 32.74, sStretch], [32.74, 36.26, sSpaghetti], [36.26, 39.02, sNotHuman], [39.02, 40.98, sRewind], [40.98, 46.42, sGalaxy], [46.42, 49.42, sGiant], [49.42, 53.64, sRadius],
  [53.64, 58.38, sCross], [58.38, 61.34, sNoJolt], [61.34, 62.98, sDrift], [62.98, 67.18, sNoReturn], [67.18, 70.94, sMinute], [70.94, 74.54, sInner], [74.54, 79.74, sFriend],
  [79.74, 82.4, sSlow], [82.4, 87.04, sFreeze], [87.04, 90.8, sSplit], [90.8, 999, sChoice]];
const BADGES = [[13.14, '20.000 KM'], [21.3, '1.700 KM'], [39.02, ''], [56.64, 'HORIZONT'], [67.18, '']];

function scene(t) {
  let f = SHOTS[0][2];
  for (const s of SHOTS) if (t >= s[0]) f = s[2];
  let body = '';
  try { body = f(t); } catch (e) { body = R(0, 0, 1080, 1920, K.sp0); }
  let lab = '', t0 = 0;
  for (const [bt, l] of BADGES) if (t >= bt) { lab = l; t0 = bt; }
  return `${KDEFS}${body}${badge(lab, back(prog(t, t0, t0 + .3)))}`;
}

const __style = {"dust": true, "vignette": true, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const subtitleTop = __style.subtitle_y;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
