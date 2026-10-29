// @ts-nocheck
// AUTO-GENERATED scene for v43. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// v43 Ankereffekt — Kênh 5 kinetic typography; primitives reused from v29.
const P = { paper: '#F4EFE6', grid: '#E3DCCF', ink: '#2B2B2B', blue: '#2F4BDB', red: '#E5484D', orange: '#F28C28', teal: '#14A38B', purple: '#7A5AF8', mark: '#FFD84D', lav: '#E4DCFF', soft: '#DDD5C7' };
const SANS = `font-family:'Inter';font-weight:900`;
const SERIF = `font-family:'Liberation Serif','DejaVu Serif',serif;font-style:italic;font-weight:400`;

const fit = (txt, max, w = 860, k = 0.74) => Math.min(max, w / (Math.max(1, txt.length) * k));

// ---------- primitives ----------
function kw(txt, x, y, size, col, t0, t, o = {}) {
  if (t < t0) return '';
  const p = back(prog(t, t0, t0 + .24));
  const pulse = o.pulse ? 1 + .05 * Math.sin(prog(t, o.pulse, o.pulse + .35) * Math.PI) : 1;
  const idle = 1 + .008 * Math.sin(t * 3.1 + x * .01);
  const s = (o.from !== undefined ? lerp(o.from, 1, p) : p) * pulse * idle;
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})" opacity="${o.from !== undefined ? 1 : cl(prog(t, t0, t0 + .08) * 1.2)}"><text x="0" y="0" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${size}px;letter-spacing:-1px" fill="${col}"${o.stroke ? ` stroke="${o.stroke}" stroke-width="${o.sw || 8}" paint-order="stroke"` : ''}>${txt}</text></g>`;
}
function words(list, x, y, size, t, col = P.ink) {
  // list: [[word, t0], ...] — one centred serif-italic line, each word appears when spoken
  if (t < list[0][1]) return '';
  const sp = list.map(([w, t0]) => `<tspan fill-opacity="${cl(prog(t, t0, t0 + .12))}">${w} </tspan>`).join('');
  const dy = 18 * (1 - eout(prog(t, list[0][1], list[0][1] + .25)));
  return `<text x="${x}" y="${y + dy}" text-anchor="middle" style="${SERIF};font-size:${size}px" fill="${col}">${sp}</text>`;
}
function marker(x, y, w, h, t0, t1, t, col = P.mark) {
  const p = eout(prog(t, t0, t1));
  if (p <= 0) return '';
  return `<path d="M ${x} ${y + h * .15} L ${x + w * p} ${y} L ${x + w * p} ${y + h} L ${x} ${y + h * .9} Z" fill="${col}" opacity=".85"/>`;
}
function check(x, y, s, t0, t, col = P.teal) {
  const p = eout(prog(t, t0, t0 + .28));
  if (p <= 0) return '';
  return `<path d="M ${x - 40 * s} ${y} L ${x - 10 * s} ${y + 32 * s} L ${x + 48 * s} ${y - 40 * s}" pathLength="1" stroke-dasharray="${p} 1" fill="none" stroke="${col}" stroke-width="${16 * s}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function cross(x, y, s, t0, t, col = P.red) {
  const a = eout(prog(t, t0, t0 + .16)), b = eout(prog(t, t0 + .14, t0 + .3));
  if (a <= 0) return '';
  return `<path d="M ${x - 38 * s} ${y - 38 * s} L ${x + 38 * s} ${y + 38 * s}" pathLength="1" stroke-dasharray="${a} 1" stroke="${col}" stroke-width="${16 * s}" stroke-linecap="round" fill="none"/>
    ${b > 0 ? `<path d="M ${x + 38 * s} ${y - 38 * s} L ${x - 38 * s} ${y + 38 * s}" pathLength="1" stroke-dasharray="${b} 1" stroke="${col}" stroke-width="${16 * s}" stroke-linecap="round" fill="none"/>` : ''}`;
}
function stamp(txt, x, y, size, col, rot, t0, t) {
  if (t < t0 - .12) return '';
  const p = prog(t, t0 - .12, t0);
  const s = lerp(2.4, 1, ein(p)) * (1 + .06 * ring(t, t0, 5, 9));
  const w = txt.length * size * .74 + 60, h = size * 1.25;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${cl(p * 2)}">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="14" fill="none" stroke="${col}" stroke-width="10"/>
    <rect x="${-w / 2 + 14}" y="${-h / 2 + 14}" width="${w - 28}" height="${h - 28}" rx="8" fill="none" stroke="${col}" stroke-width="3"/>
    <text x="0" y="4" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${size}px" fill="${col}">${txt}</text></g>`;
}
function burst(x, y, t0, t, col = P.ink, n = 8, r0 = 70, r1 = 150) {
  const p = prog(t, t0, t0 + .35);
  if (p <= 0 || p >= 1) return '';
  let g = '';
  for (let i = 0; i < n; i++) {
    const a = i / n * Math.PI * 2 + .3, ra = lerp(r0, r1, eout(p)), rb = lerp(r0, r1, eout(cl(p * 1.6)));
    g += `<line x1="${x + Math.cos(a) * ra}" y1="${y + Math.sin(a) * ra}" x2="${x + Math.cos(a) * rb}" y2="${y + Math.sin(a) * rb}" stroke="${col}" stroke-width="6" stroke-linecap="round"/>`;
  }
  return g;
}
function dashBox(x, y, w, h, t0, t, col = P.ink) {
  const p = eout(prog(t, t0, t0 + .3));
  if (p <= 0) return '';
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="26" fill="none" stroke="${col}" stroke-width="5" stroke-dasharray="22 14" stroke-dashoffset="${-t * 40}" pathLength="${1000}" opacity="${p}" transform="translate(${x + w / 2} ${y + h / 2}) scale(${lerp(1.15, 1, p)}) translate(${-x - w / 2} ${-y - h / 2})"/>`;
}

// ---------- icons ----------
function brain(x, y, s, o = {}) {
  const t = o.t || 0, look = o.look || 0;
  const br = 1 + .025 * Math.sin(t * 4);
  const mouth = o.mouth === 'o' ? `<ellipse cx="0" cy="48" rx="14" ry="16" fill="${P.ink}"/>` : o.mouth === 'sad' ? `<path d="M -22 56 Q 0 38 22 56" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>` : `<path d="M -24 40 Q 0 62 24 40" stroke="${P.ink}" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  const blink = o.blink ? .15 : 1;
  return `<g transform="translate(${x} ${y}) scale(${s * br} ${s / br}) rotate(${o.tilt || 0})">
    <ellipse cx="0" cy="104" rx="${110}" ry="14" fill="${P.ink}" opacity=".12"/>
    <path d="${scallop(0, 0, 130, 98, 11)}" fill="#B9A6FF" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>
    <path d="M 0 -96 C -10 -50 12 -20 0 20" stroke="${P.purple}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <path d="M -96 -30 q 30 -18 52 6 M -88 40 q 30 10 46 -10 M 50 -60 q 30 4 40 34 M 56 50 q 30 -2 44 -26" stroke="${P.purple}" stroke-width="6" fill="none" stroke-linecap="round"/>
    <ellipse cx="${-34 + look}" cy="2" rx="13" ry="${18 * blink}" fill="${P.ink}"/><ellipse cx="${34 + look}" cy="2" rx="13" ry="${18 * blink}" fill="${P.ink}"/>
    <circle cx="${-30 + look}" cy="-5" r="4" fill="#fff"/><circle cx="${38 + look}" cy="-5" r="4" fill="#fff"/>
    ${mouth}${o.sweat ? `<path d="M 118 -50 q 14 24 0 34 q -14 -10 0 -34 Z" fill="#7FC8FF" stroke="${P.ink}" stroke-width="3" transform="translate(0 ${12 * ((t * 1.6) % 1)})"/>` : ''}
  </g>`;
}
function nameTag(x, y, s, rot, inner = '') {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="-300" y="-170" width="600" height="360" rx="34" fill="${P.ink}" opacity=".14" transform="translate(10 16)"/>
    <rect x="-300" y="-180" width="600" height="360" rx="34" fill="#fff" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -300 -100 V -146 Q -300 -180 -266 -180 H 266 Q 300 -180 300 -146 V -100 Z" fill="${P.red}" stroke="${P.ink}" stroke-width="6"/>
    <text x="0" y="-130" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:50px;letter-spacing:6px" fill="#fff">HALLO</text>
    <line x1="-230" y1="130" x2="230" y2="130" stroke="${P.soft}" stroke-width="5" stroke-dasharray="14 10"/>
    ${inner}</g>`;
}
// handwritten name inside a tag, revealed left→right by a pen (wipe 0..1) and removed by an eraser (erase 0..1)
function tagName(name, id, wipe, erase, col = P.blue) {
  if (wipe <= 0) return '';
  const x0 = -240 + 480 * erase, x1 = -240 + 480 * wipe;
  if (x1 <= x0) return '';
  return `<clipPath id="${id}"><rect x="${x0}" y="-90" width="${x1 - x0}" height="220"/></clipPath>
    <g clip-path="url(#${id})"><text x="0" y="22" text-anchor="middle" dominant-baseline="central" transform="skewX(-10)" style="${SANS};font-size:150px;letter-spacing:4px" fill="${col}">${name}</text></g>`;
}
function pen(x, y, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><path d="M 0 0 L 22 -40 L 60 -170 L 92 -160 L 54 -30 Z" fill="${P.orange}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/><path d="M 0 0 L 22 -40 L 34 -36 Z" fill="${P.ink}"/></g>`;
}
function eraser(x, y, rot = -20) {
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><rect x="-55" y="-120" width="110" height="160" rx="16" fill="#F7A6B4" stroke="${P.ink}" stroke-width="5"/><rect x="-55" y="-120" width="110" height="70" rx="14" fill="${P.blue}" stroke="${P.ink}" stroke-width="5"/></g>`;
}
function crumbs(x, y, t0, t, n = 8) {
  let g = '';
  for (let i = 0; i < n; i++) {
    const dt = t - t0 - i * .04;
    if (dt <= 0 || dt > .8) continue;
    g += `<circle cx="${x + (hash(i + 3) - .5) * 160 + dt * 60 * (hash(i) - .5)}" cy="${y + 40 + 500 * dt * dt + 30 * hash(i + 7)}" r="${4 + 4 * hash(i + 11)}" fill="#E7A3AE" opacity="${1 - dt / .8}"/>`;
  }
  return g;
}
function stopwatch(x, y, r, ang, fill = 0, col = P.red) {
  const a0 = -Math.PI / 2, a1 = a0 + fill * Math.PI * 2;
  const sector = fill > 0.001 ? `<path d="M 0 0 L ${r * .82 * Math.cos(a0)} ${r * .82 * Math.sin(a0)} A ${r * .82} ${r * .82} 0 ${fill > .5 ? 1 : 0} 1 ${r * .82 * Math.cos(a1)} ${r * .82 * Math.sin(a1)} Z" fill="${col}" opacity=".3"/>` : '';
  let ticks = '';
  for (let i = 0; i < 12; i++) { const a = i / 12 * Math.PI * 2; ticks += `<line x1="${Math.cos(a) * r * .72}" y1="${Math.sin(a) * r * .72}" x2="${Math.cos(a) * r * .84}" y2="${Math.sin(a) * r * .84}" stroke="${P.ink}" stroke-width="${i % 3 ? 3 : 6}"/>`; }
  return `<g transform="translate(${x} ${y})">
    <rect x="${-r * .16}" y="${-r * 1.28}" width="${r * .32}" height="${r * .26}" rx="6" fill="${P.ink}"/>
    <circle cx="0" cy="0" r="${r}" fill="#fff" stroke="${P.ink}" stroke-width="7"/>${sector}${ticks}
    <line x1="0" y1="0" x2="${Math.cos(ang - Math.PI / 2) * r * .7}" y2="${Math.sin(ang - Math.PI / 2) * r * .7}" stroke="${col}" stroke-width="8" stroke-linecap="round"/>
    <circle r="${r * .1}" fill="${P.ink}"/></g>`;
}
function person(x, y, s, fill, o = {}) {
  const j = o.jit || 0;
  return `<g transform="translate(${x + j * Math.sin((o.t || 0) * 70)} ${y}) scale(${s})">
    <path d="M -62 96 Q -62 30 0 30 Q 62 30 62 96 Z" fill="${fill}" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>
    <circle cx="0" cy="-12" r="38" fill="${fill}" stroke="${P.ink}" stroke-width="5"/>
    <circle cx="-12" cy="-14" r="4.5" fill="${P.ink}"/><circle cx="12" cy="-14" r="4.5" fill="${P.ink}"/>
    ${o.label ? `<text x="0" y="72" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:36px" fill="#fff">${o.label}</text>` : ''}
    ${o.sweat ? `<path d="M 40 -40 q 10 18 0 26 q -10 -8 0 -26 Z" fill="#7FC8FF" stroke="${P.ink}" stroke-width="3"/>` : ''}</g>`;
}
function bubble(x, y, w, h, tailX, tailY, s, inner, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M ${-w / 2 + 24} ${-h / 2} H ${w / 2 - 24} Q ${w / 2} ${-h / 2} ${w / 2} ${-h / 2 + 24} V ${h / 2 - 24} Q ${w / 2} ${h / 2} ${w / 2 - 24} ${h / 2} H ${18} L ${tailX} ${tailY} L ${-14} ${h / 2} H ${-w / 2 + 24} Q ${-w / 2} ${h / 2} ${-w / 2} ${h / 2 - 24} V ${-h / 2 + 24} Q ${-w / 2} ${-h / 2} ${-w / 2 + 24} ${-h / 2} Z" fill="#fff" stroke="${P.ink}" stroke-width="5" stroke-linejoin="round"/>
    ${inner}</g>`;
}

// ---------- background & progress ----------
function paper(t, shift) {
  let g = '';
  const ox = ((shift % 60) + 60) % 60;
  for (let x = -60; x <= 1140; x += 60) g += `<line x1="${x + ox}" y1="0" x2="${x + ox}" y2="1920" stroke="${P.grid}" stroke-width="2"/>`;
  for (let y = 0; y <= 1920; y += 60) g += `<line x1="0" y1="${y}" x2="1080" y2="${y}" stroke="${P.grid}" stroke-width="2"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.paper}"/>${g}
    <radialGradient id="pgV" cx=".5" cy=".45" r=".8"><stop offset=".6" stop-color="#C9BBA4" stop-opacity="0"/><stop offset="1" stop-color="#C9BBA4" stop-opacity=".35"/></radialGradient>
    <rect x="0" y="0" width="1080" height="1920" fill="url(#pgV)"/>`;
}
function progressBar(t) {
  const p = cl(t / DUR), x = lerp(90, 990, p);
  return `<line x1="90" y1="150" x2="990" y2="150" stroke="${P.ink}" stroke-width="4" opacity=".18" stroke-linecap="round"/>
    <line x1="90" y1="150" x2="${x}" y2="150" stroke="${P.ink}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="${x}" cy="150" r="11" fill="${P.red}" stroke="${P.ink}" stroke-width="4"/>`;
}


const DUR = 81.3;
const CARDS = [0, 4.78, 6.48, 7.72, 10.36, 13.42, 15.58, 18.24, 19.54, 22.74, 25.94, 27.04, 30.72, 31.96, 33.38, 36.24, 38.16, 40.82,
  43.62, 46.66, 49.36, 51.04, 53.1, 56.38, 58.8, 62.66, 64.46, 66.86, 69.8, 72.2, 74.24, 76.68, 78.1, 80.5];
const SHAKES = [[0.36, 10], [5.86, 12], [21.78, 16], [25.38, 10], [42.64, 12], [50.51, 18], [69.1, 20], [63.24, 10], [76.68, 14]];

// ---------- icons (flat, ink outline) ----------
function bike(x, y, s, col = P.blue) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${P.ink}" stroke-linecap="round" stroke-linejoin="round">
    <circle cx="-110" cy="40" r="78" stroke-width="12"/><circle cx="110" cy="40" r="78" stroke-width="12"/>
    <circle cx="-110" cy="40" r="10" fill="${P.ink}"/><circle cx="110" cy="40" r="10" fill="${P.ink}"/>
    <path d="M -110 40 L -40 -70 L 70 -70 L 110 40 M -40 -70 L 0 40 L 70 -70 M 0 40 L -110 40" stroke="${col}" stroke-width="16"/>
    <path d="M -60 -100 L -14 -100 M 60 -70 L 50 -120 L 90 -126" stroke="${P.ink}" stroke-width="12"/>
  </g>`;
}
function listing(x, y, s, price, o = {}) { // classifieds-style phone screen, no real logo
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})">
    <rect x="-300" y="-500" width="600" height="1000" rx="70" fill="${P.ink}" opacity=".15" transform="translate(14 18)"/>
    <rect x="-300" y="-500" width="600" height="1000" rx="70" fill="${P.ink}"/>
    <rect x="-270" y="-460" width="540" height="920" rx="40" fill="#FFFFFF"/>
    <rect x="-270" y="-460" width="540" height="100" rx="40" fill="${P.teal}"/><rect x="-270" y="-400" width="540" height="40" fill="${P.teal}"/>
    <rect x="-230" y="-430" width="300" height="40" rx="20" fill="#FFFFFF" opacity=".85"/>
    <rect x="-230" y="-330" width="460" height="340" rx="20" fill="#EAF2F0" stroke="${P.ink}" stroke-width="4"/>
    ${bike(0, -170, .9)}
    <rect x="-230" y="40" width="300" height="26" rx="13" fill="${P.soft}"/><rect x="-230" y="84" width="200" height="26" rx="13" fill="${P.soft}"/>
    ${price}
    <rect x="-230" y="340" width="460" height="80" rx="40" fill="${P.blue}"/><rect x="-150" y="370" width="300" height="20" rx="10" fill="#FFFFFF" opacity=".8"/>
  </g>`;
}
function anchor(x, y, s, rot = 0, col = P.blue) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" stroke="${P.ink}" stroke-linejoin="round" stroke-linecap="round">
    <circle cx="0" cy="-150" r="36" fill="none" stroke-width="30"/><circle cx="0" cy="-150" r="36" fill="none" stroke="${col}" stroke-width="16"/>
    <path d="M 0 -112 V 130 M -90 -70 H 90" fill="none" stroke-width="40"/><path d="M 0 -112 V 130 M -90 -70 H 90" fill="none" stroke="${col}" stroke-width="24"/>
    <path d="M -160 20 Q -150 150 0 150 Q 150 150 160 20 L 190 50 M 160 20 L 120 50 M -160 20 L -190 50 M -160 20 L -120 50" fill="none" stroke-width="40"/>
    <path d="M -160 20 Q -150 150 0 150 Q 150 150 160 20 L 190 50 M 160 20 L 120 50 M -160 20 L -190 50 M -160 20 L -120 50" fill="none" stroke="${col}" stroke-width="24"/>
  </g>`;
}
function chainLink(x1, y1, x2, y2, col = P.ink) {
  return `<path d="M ${x1} ${y1} L ${x2} ${y2}" stroke="${col}" stroke-width="10" stroke-dasharray="26 12" stroke-linecap="round"/>`;
}
function tagNum(txt, x, y, s, col, rot = 0) {
  const w = txt.length * 70 + 90;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <path d="M ${-w / 2} -60 H ${w / 2} L ${w / 2 + 50} 0 L ${w / 2} 60 H ${-w / 2} Z" fill="#FFFFFF" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/>
    <circle cx="${w / 2 + 8}" cy="0" r="10" fill="${P.paper}" stroke="${P.ink}" stroke-width="4"/>
    <text x="-6" y="4" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:96px" fill="${col}">${txt}</text></g>`;
}
function numLine(x0, x1, y, t, t0, ticks) {
  const p = eout(prog(t, t0, t0 + .4));
  let g = `<line x1="${x0}" y1="${y}" x2="${lerp(x0, x1, p)}" y2="${y}" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/>`;
  if (p > .9) for (const [v, xx] of ticks) g += `<line x1="${xx}" y1="${y - 18}" x2="${xx}" y2="${y + 18}" stroke="${P.ink}" stroke-width="5"/><text x="${xx}" y="${y + 60}" text-anchor="middle" style="${SANS};font-size:34px" fill="${P.ink}" opacity=".55">${v}</text>`;
  return g;
}
function dot(x, y, r, col, s = 1) { return s > 0 ? `<circle cx="${x}" cy="${y}" r="${r * s}" fill="${col}" stroke="${P.ink}" stroke-width="5"/>` : ''; }
function glasses(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="none" stroke="${P.ink}" stroke-width="10" stroke-linecap="round">
    <circle cx="-80" cy="0" r="62" fill="#FFFFFF"/><circle cx="80" cy="0" r="62" fill="#FFFFFF"/><path d="M -18 -6 Q 0 -24 18 -6 M -142 -10 L -200 -30 M 142 -10 L 200 -30"/>
    <path d="M -110 -20 Q -90 -36 -70 -30 M 50 -20 Q 70 -36 90 -30" stroke="#BFD8E6" stroke-width="8"/></g>`;
}
function die(x, y, s, n, rot = 0, col = '#FFFFFF') {
  const P3 = { 1: [[0, 0]], 2: [[-40, -40], [40, 40]], 3: [[-45, -45], [0, 0], [45, 45]], 4: [[-42, -42], [42, -42], [-42, 42], [42, 42]], 5: [[-42, -42], [42, -42], [0, 0], [-42, 42], [42, 42]], 6: [[-42, -48], [42, -48], [-42, 0], [42, 0], [-42, 48], [42, 48]] };
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <rect x="-90" y="-80" width="180" height="180" rx="34" fill="${P.ink}" opacity=".15"/>
    <rect x="-90" y="-90" width="180" height="180" rx="34" fill="${col}" stroke="${P.ink}" stroke-width="7"/>
    ${(P3[n] || []).map(([a, b]) => `<circle cx="${a}" cy="${b}" r="16" fill="${P.ink}"/>`).join('')}</g>`;
}
function gavel(x, y, s, rot) { // pivot at handle end
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round">
    <rect x="-14" y="-260" width="28" height="260" rx="12" fill="#A9743A"/>
    <rect x="-110" y="-330" width="220" height="90" rx="22" fill="#8A5A2B"/><rect x="-130" y="-322" width="30" height="74" rx="10" fill="#C6A15B"/><rect x="100" y="-322" width="30" height="74" rx="10" fill="#C6A15B"/></g>`;
}
function bulb(x, y, s, on) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${on ? `<circle cx="0" cy="-40" r="170" fill="${P.mark}" opacity=".35"/>` : ''}
    <path d="M -80 -40 Q -80 -150 0 -150 Q 80 -150 80 -40 Q 80 10 40 50 L 40 90 L -40 90 L -40 50 Q -80 10 -80 -40 Z" fill="${on ? P.mark : '#FFFFFF'}" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/>
    <rect x="-44" y="90" width="88" height="50" rx="10" fill="${P.soft}" stroke="${P.ink}" stroke-width="6"/>
    <path d="M -24 50 L -24 -10 L 0 20 L 24 -10 L 24 50" fill="none" stroke="${P.orange}" stroke-width="7" stroke-linejoin="round"/></g>`;
}
function bar(x, yb, w, h, col, lab) {
  return `<rect x="${x - w / 2}" y="${yb - h}" width="${w}" height="${Math.max(0, h)}" rx="14" fill="${col}" stroke="${P.ink}" stroke-width="5"/>${lab || ''}`;
}
function num(txt, x, y, size, col) { return `<text x="${x}" y="${y}" text-anchor="middle" dominant-baseline="central" style="${SANS};font-size:${size}px;letter-spacing:-1px" fill="${col}">${txt}</text>`; }
const POP = (t, t0, d = .24) => back(prog(t, t0, t0 + d));
const SC = (x, y, s, inner) => s > 0 ? `<g transform="translate(${x} ${y}) scale(${s}) translate(${-x} ${-y})">${inner}</g>` : '';
const PRICE = (big, t) => `<text x="0" y="240" text-anchor="middle" style="${SANS};font-size:104px;letter-spacing:-2px" fill="${P.red}">${big}</text>`;

// ---------- cards ----------
function c0(t) { // hook: the listing with 500 € VB
  const drop = lerp(-140, 0, back(prog(t, 0, .36))), pulse = 1 + .08 * Math.sin(prog(t, 1.92, 2.4) * Math.PI);
  let g = listing(540, 860 + drop, 1, `<g transform="translate(0 200) scale(${pulse}) translate(0 -200)">${PRICE('500 € VB', t)}</g>`, { rot: -3 + 2 * Math.sin(t * 1.4) });
  g += marker(560, 1070 + drop, 200, 26, 3.18, 3.5, t);
  g += burst(540, 1040, 1.92, t, P.red, 10, 300, 400);
  return g;
}
function c1(t) { // "du sitzt schon in der Falle": cage drops over you
  const cg = t < 5.86 ? lerp(-900, -60, ein(prog(t, 5.5, 5.86))) : -60 + 10 * ring(t, 5.86, 5, 8);
  let g = listing(780, 640, .45, PRICE('500 € VB', t), { rot: 6 });
  g += person(470, 1040, 2.0, P.blue, { t, sweat: t > 5.9 });
  let bars = ''; for (let i = 0; i < 7; i++) bars += `<line x1="${300 + i * 58}" y1="${700 + cg}" x2="${300 + i * 58}" y2="${1300 + cg}" stroke="${P.ink}" stroke-width="12" stroke-linecap="round"/>`;
  g += `<g>${bars}<path d="M 280 ${700 + cg} H 666 M 280 ${1300 + cg} H 666" stroke="${P.ink}" stroke-width="16" stroke-linecap="round"/></g>`;
  g += words([['du', 4.88], ['sitzt', 5.0], ['schon', 5.22], ['in', 5.56], ['der', 5.74], ['Falle', 5.86]], 540, 360, 74, t);
  return g;
}
function c2(t) { // "Du willst handeln": a hand-drawn arrow pushes the price down
  const ap = eout(prog(t, 6.6, 7.1));
  let g = tagNum('500', 540, 560, POP(t, 6.48), P.red, -4);
  g += `<path d="M 540 680 L 540 ${680 + 520 * ap}" stroke="${P.blue}" stroke-width="22" stroke-linecap="round"/>`;
  if (ap > .9) g += `<path d="M 470 1130 L 540 1220 L 610 1130" fill="none" stroke="${P.blue}" stroke-width="22" stroke-linecap="round" stroke-linejoin="round"/>`;
  g += person(300, 1080, 1.3, P.blue, { t });
  g += words([['Du', 6.48], ['willst', 6.6], ['handeln.', 6.8]], 540, 360, 80, t);
  return g;
}
function c3(t) { // "Du bietest vierhundert ... clever"
  let g = tagNum('500', 540, 470, .8, P.soft, -4);
  const st = eout(prog(t, 8.3, 8.55));
  if (st > 0) g += `<path d="M 360 480 L ${360 + 380 * st} 450" stroke="${P.red}" stroke-width="14" stroke-linecap="round"/>`;
  g += kw('400', 540, 820, 300, P.blue, 8.26, t, { pulse: 8.6 });
  g += marker(330, 930, 420, 40, 8.6, 8.9, t);
  g += SC(820, 1150, POP(t, 9.64), person(820, 1150, 1.3, P.blue, { t }) + `<path d="M 772 1124 h 40 M 828 1124 h 40" stroke="${P.ink}" stroke-width="18" stroke-linecap="round"/>`);
  g += check(300, 1170, 1.6, 9.7, t);
  g += burst(820, 1150, 9.7, t, P.orange, 8, 120, 190);
  return g;
}
function c4(t) { // "dein Gehirn hat längst mit 500 gerechnet": brain, thought bubble 500
  let g = brain(400, 1050, 1.3, { t, look: 14, mouth: t > 12.4 ? 'smile' : 'o' });
  const bs = POP(t, 11.6);
  g += SC(700, 640, bs, `<path d="${scallop(700, 640, 250, 170, 12)}" fill="#FFFFFF" stroke="${P.ink}" stroke-width="6"/>${num('500', 700, 640, 180, P.red)}`);
  if (bs > 0) g += `<circle cx="560" cy="860" r="22" fill="#FFFFFF" stroke="${P.ink}" stroke-width="5"/><circle cx="520" cy="930" r="14" fill="#FFFFFF" stroke="${P.ink}" stroke-width="5"/>`;
  g += words([['Aber', 10.36], ['dein', 10.54], ['Gehirn', 10.76]], 540, 340, 80, t);
  g += marker(560, 700, 290, 26, 12.0, 12.4, t);
  return g;
}
function c5(t) { // "Hätte dort 300 gestanden": the price tag flips
  const fl = eio(prog(t, 13.8, 14.2)), sx = Math.abs(Math.cos(fl * Math.PI));
  const txt = fl < .5 ? '500 € VB' : '300 € VB';
  return listing(540, 860, .95, `<g transform="translate(0 170) scale(1 ${Math.max(.05, sx)}) translate(0 -170)">${PRICE(txt, t)}</g>`, { rot: 2 * Math.sin(t * 1.3) }) + burst(540, 1040, 14.2, t, P.blue, 10, 300, 400);
}
function c6(t) { // number line: 300 → 250 vs 500 → 400
  const X = v => 140 + v * 1.4;
  let g = numLine(120, 960, 980, t, 15.58, [[0, X(0)], [200, X(200)], [400, X(400)], [600, X(600)]]);
  g += anchor(X(500), 740, .55 * POP(t, 15.6), 0, P.red) + num('500', X(500), 540, 90, P.red);
  g += anchor(X(300), 740, .55 * POP(t, 15.8), 0, P.blue) + num('300', X(300), 540, 90, P.blue);
  const p1 = eout(prog(t, 16.2, 16.9));
  g += dot(X(400), 980, 40, P.red, POP(t, 15.9)) + dot(X(250), 980, 40, P.blue, POP(t, 16.2));
  if (p1 > 0) g += `<g opacity="${p1}">${num('400', X(400), 1090, 84, P.red)}${num('250', X(250), 1090, 84, P.blue)}</g>`;
  g += chainLink(X(500), 830, X(400), 960, P.red) + (p1 > 0 ? chainLink(X(300), 830, X(250), 960, P.blue) : '');
  return g;
}
function c7(t) { // "für dasselbe Fahrrad": two identical bikes, =
  let g = bike(300, 820, .9 * POP(t, 18.24)) + bike(780, 820, .9 * POP(t, 18.4));
  g += num('300', 300, 1060, 90 * POP(t, 18.3), P.blue) + num('500', 780, 1060, 90 * POP(t, 18.45), P.red);
  g += kw('=', 540, 820, 200, P.ink, 18.88, t, { pulse: 19.0 });
  return g;
}
function c8(t) { // "Die erste Zahl ... wird zum Anker"
  const mo = eio(prog(t, 21.44, 21.78));
  let g = words([['Die', 19.54], ['erste', 19.66], ['Zahl,', 19.98], ['die', 20.5], ['du', 20.58], ['hörst', 20.7]], 540, 380, 76, t);
  if (mo < 1) g += SC(540, 820, (1 - mo) * POP(t, 19.98), tagNum('500', 540, 820, 1.2, P.red));
  if (mo > 0) g += anchor(540, lerp(700, 860, mo) + 10 * ring(t, 21.78, 4, 6), .95 * mo, 4 * Math.sin(t * 2), P.blue);
  g += kw('ANKER', 540, 1240, 170, P.blue, 21.78, t, { from: 1.4, pulse: 22.0 });
  g += marker(300, 1300, 480, 30, 22.0, 22.3, t);
  return g;
}
function c9(t) { // estimates are pulled toward the anchor and stick
  const ax = 540, ay = 700;
  let g = anchor(ax, ay, .6, 3 * Math.sin(t * 2), P.blue);
  const pts = [[120, 1200, P.orange], [960, 1150, P.teal], [160, 420, P.purple], [940, 420, P.orange], [540, 1320, P.teal], [880, 1300, P.purple]];
  pts.forEach(([x, y, c], i) => {
    const p = eio(prog(t, 23.1 + i * .22, 25.38));
    const tx = ax + 230 * Math.cos(i * 1.05), ty = ay + 300 + 190 * Math.sin(i * 1.05) * .6;
    const px = lerp(x, tx, p), py = lerp(y, ty, p);
    g += chainLink(ax, ay + 120, px, py, P.ink) + dot(px, py, 34, c, POP(t, 22.8 + i * .1));
  });
  g += words([['Alles,', 22.74], ['was', 23.1], ['du', 23.22], ['danach', 23.4], ['schätzt', 23.66]], 540, 340, 72, t);
  return g;
}
function c10(t) { // "Probier es aus": pencil writes in a dashed box
  const w = prog(t, 26.1, 27.0);
  let g = dashBox(170, 620, 740, 420, 25.94, t, P.blue);
  let d = 'M 260 860'; for (let i = 0; i < 12; i++) d += ` q 25 ${i % 2 ? 50 : -50} 50 0`;
  g += `<path d="${d}" fill="none" stroke="${P.blue}" stroke-width="12" stroke-linecap="round" pathLength="1" stroke-dasharray="${w} 1"/>`;
  g += pen(260 + 600 * w, 870, 20);
  g += kw('?', 540, 460, 200, P.orange, 26.2, t, { pulse: 26.4 });
  return g;
}
function c11(t) { // Gandhi: older or younger than 9?
  let g = glasses(540, 470, POP(t, 27.2));
  const up = POP(t, 27.46), dn = POP(t, 28.18);
  g += SC(250, 900, up, `<path d="M 250 1000 V 800 M 190 860 L 250 790 L 310 860" fill="none" stroke="${P.teal}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>`);
  g += SC(830, 900, dn, `<path d="M 830 800 V 1000 M 770 940 L 830 1010 L 890 940" fill="none" stroke="${P.red}" stroke-width="26" stroke-linecap="round" stroke-linejoin="round"/>`);
  g += kw('9', 540, 900, 320, P.blue, 28.84, t, { pulse: 29.18 });
  g += kw('?', 540, 1240, 140, P.ink, 29.92, t);
  return g;
}
function c12(t) { // "Natürlich älter": up arrow ✓, the 9 shrinks
  let g = glasses(540, 470, 1);
  g += `<path d="M 300 1100 V 700 M 220 780 L 300 690 L 380 780" fill="none" stroke="${P.teal}" stroke-width="30" stroke-linecap="round" stroke-linejoin="round"/>`;
  g += check(300, 1220, 1.6, 31.14, t);
  g += num('9', 740, 900, lerp(320, 120, eio(prog(t, 30.9, 31.4))), P.blue);
  return g;
}
function c13(t) { // "Aber wie alt genau?"
  const q = 1 + .1 * Math.sin(t * 8);
  let g = glasses(540, 470, 1);
  g += SC(540, 900, POP(t, 32.32) * q, num('?? J.', 540, 900, 240, P.blue));
  g += marker(300, 1010, 480, 34, 32.54, 32.9, t);
  return g;
}
function c14(t) { // students in Germany
  let g = '';
  for (let i = 0; i < 6; i++) { const x = 220 + (i % 3) * 320, y = 820 + Math.floor(i / 3) * 300; g += SC(x, y, POP(t, 34.62 + i * .08), person(x, y, 1.1, [P.blue, P.orange, P.teal, P.purple, P.blue, P.orange][i], { t }) + `<path d="M ${x - 60} ${y - 60} L ${x} ${y - 90} L ${x + 60} ${y - 60} L ${x} ${y - 34} Z" fill="${P.ink}"/>`); }
  const fp = eout(prog(t, 35.36, 35.7));
  g += `<rect x="340" y="420" width="${400 * fp}" height="30" fill="#2B2B2B"/><rect x="340" y="450" width="${400 * fp}" height="30" fill="${P.red}"/><rect x="340" y="480" width="${400 * fp}" height="30" fill="${P.mark}"/>`;
  g += words([['Genau', 33.38], ['diese', 33.6], ['Frage', 33.9]], 540, 340, 74, t);
  return g;
}
function split(t, tl, tr) {
  const d = eout(prog(t, 36.3, 36.6));
  let g = `<line x1="540" y1="${300}" x2="540" y2="${300 + 1080 * d}" stroke="${P.ink}" stroke-width="6" stroke-dasharray="20 14"/>`;
  for (let i = 0; i < 3; i++) g += person(160 + i * 120, 1200, .8, P.blue, { t }) + person(680 + i * 120, 1200, .8, P.orange, { t });
  return g;
}
function c15(t) { // half A hears 9
  let g = split(t);
  const bs = POP(t, 37.7);
  g += SC(290, 760, bs, bubble(290, 760, 340, 300, -40, 230, 1, num('9', 0, 0, 220, P.blue)));
  return g;
}
function c16(t) { // half B hears 140
  let g = split(t);
  g += bubble(290, 760, 340, 300, -40, 230, 1, num('9', 0, 0, 220, P.blue));
  g += SC(790, 760, POP(t, 39.54), bubble(790, 760, 400, 300, -40, 230, 1, num('140', 0, 0, 170, P.orange)));
  return g;
}
function c17(t) { // both numbers are nonsense
  const wob = 4 * Math.sin(t * 6);
  let g = num('9', 300, 780, 300, P.blue) + num('140', 780, 780, 220, P.orange);
  g += cross(300, 780, 2.4, 42.64, t) + cross(780, 780, 2.4, 42.74, t);
  g += kw('?!', 540, 1220, 160, P.red, 41.88, t, { rot: wob });
  return g;
}
const BX = [300, 780], BYB = 1250, BK = 9.5; // bars: value → height
function results(t, showR) {
  const vA = Math.round(lerp(9, 50, eio(prog(t, 44.6, 46.12)))), vB = showR ? Math.round(lerp(140, 67, eio(prog(t, 47.0, 48.08)))) : 0;
  let g = `<line x1="120" y1="${BYB}" x2="960" y2="${BYB}" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/>`;
  g += bar(BX[0], BYB, 200, vA * BK, P.blue, num(String(vA), BX[0], BYB - vA * BK - 60, 90, P.blue));
  if (showR) g += bar(BX[1], BYB, 200, Math.min(vB, 80) * BK, P.orange, num(String(vB), BX[1], BYB - Math.min(vB, 80) * BK - 60, 90, P.orange));
  return g;
}
function c18(t) { // 9 → 50 J.
  let g = results(t, false);
  g += kw('9 → 50 J.', 540, 380, 120, P.blue, 46.12, t, { pulse: 46.4 });
  g += marker(290, 440, 500, 26, 46.4, 46.66, t);
  return g;
}
function c19(t) { // 140 → 67 J.
  let g = results(t, true);
  g += num('9 → 50 J.', 300, 330, 64, P.blue);
  g += kw('140 → 67 J.', 600, 440, 104, P.orange, 48.08, t, { pulse: 48.4 });
  return g;
}
function c20(t) { // a beat to guess, then RICHTIG: 78
  let g = results(t, true);
  const sw = t < 50.51 ? (t - 49.36) * 6 : 0;
  if (t < 50.51) g += SC(540, 480, POP(t, 49.36), stopwatch(540, 480, 120, sw, prog(t, 49.36, 50.51), P.purple));
  const y78 = BYB - 78 * BK, ln = eout(prog(t, 50.51, 50.8));
  if (ln > 0) g += `<line x1="140" y1="${y78}" x2="${140 + 800 * ln}" y2="${y78}" stroke="${P.teal}" stroke-width="10" stroke-dasharray="26 14" stroke-linecap="round"/>`;
  g += stamp('RICHTIG: 78', 540, 330, 96, P.teal, -6, 50.51, t);
  return g;
}
function c21(t) { // "Und es geht noch krasser": a gauge swings into the red
  const a = lerp(-80, 70, back(prog(t, 51.6, 52.1))) + 3 * Math.sin(t * 30) * prog(t, 52.0, 52.4);
  let g = `<path d="M 240 980 A 300 300 0 0 1 840 980" fill="none" stroke="${P.soft}" stroke-width="60"/>
   <path d="M 240 980 A 300 300 0 0 1 380 720" fill="none" stroke="${P.teal}" stroke-width="60"/><path d="M 700 720 A 300 300 0 0 1 840 980" fill="none" stroke="${P.red}" stroke-width="60"/>
   <path d="M 240 980 A 300 300 0 0 1 840 980" fill="none" stroke="${P.ink}" stroke-width="6"/>
   <g transform="translate(540 980) rotate(${a})"><path d="M -18 0 L 0 -280 L 18 0 Z" fill="${P.ink}"/></g><circle cx="540" cy="980" r="36" fill="${P.ink}"/>`;
  g += kw('!!', 540, 1200, 160, P.red, 52.02, t);
  return SC(540, 980, POP(t, 51.04), g);
}
function c22(t) { // young lawyers judge an invented case
  let g = '';
  for (let i = 0; i < 3; i++) { const x = 240 + i * 300; g += SC(x, 900, POP(t, 53.44 + i * .12), person(x, 900, 1.4, [P.blue, P.purple, P.teal][i], { t }) + `<path d="M ${x - 20} 960 L ${x} 1010 L ${x + 20} 960 Z" fill="#FFFFFF" stroke="${P.ink}" stroke-width="4"/>`); }
  const gv = t < 55.06 ? -30 * POP(t, 54.74) : -30 + 30 * eout(prog(t, 55.06, 55.2));
  g += gavel(820, 1340, .7, gv);
  g += words([['Junge', 53.1], ['Juristinnen', 53.44], ['und', 54.0], ['Juristen', 54.28]], 540, 380, 70, t);
  return g;
}
function c23(t) { // "erfundener Fall über eine Ladendiebin": a case file with a shopping basket
  const op = eout(prog(t, 56.5, 56.9));
  let g = `<g transform="rotate(-4 540 860)"><rect x="220" y="520" width="640" height="720" rx="24" fill="#F3E3A0" stroke="${P.ink}" stroke-width="6"/><rect x="220" y="470" width="260" height="70" rx="18" fill="#F3E3A0" stroke="${P.ink}" stroke-width="6"/>
   <rect x="290" y="1060" width="380" height="24" rx="12" fill="${P.soft}"/><rect x="290" y="1110" width="260" height="24" rx="12" fill="${P.soft}"/></g>`;
  const bk = POP(t, 57.47);
  g += SC(540, 830, bk, `<path d="M 380 760 L 700 760 L 660 960 L 420 960 Z" fill="${P.orange}" stroke="${P.ink}" stroke-width="7" stroke-linejoin="round"/><path d="M 420 760 Q 540 620 660 760" fill="none" stroke="${P.ink}" stroke-width="10"/>
     <rect x="470" y="690" width="60" height="80" rx="10" fill="${P.teal}" stroke="${P.ink}" stroke-width="5" transform="rotate(${-10 + 20 * op} 500 730)"/>`);
  g += kw('?', 780, 600, 140, P.red, 57.84, t);
  return g;
}
function c24(t) { // they rolled the prosecutor's demand themselves
  const roll = prog(t, 59.22, 60.1), rot = 720 * eout(roll), x = lerp(-100, 540, eout(roll)), y = 820 - 200 * Math.abs(Math.sin(roll * Math.PI * 2)) * (1 - roll);
  let g = die(x, y, 1.5, roll < 1 ? 1 + Math.floor(t * 12) % 6 : 3, rot);
  g += SC(540, 1180, POP(t, 60.82), num('§', 540, 1180, 220, P.purple));
  g += words([['Vorher', 58.8], ['würfelten', 59.22], ['sie', 59.8]], 540, 380, 78, t);
  return g;
}
function c25(t) { // 🎲 3 ODER 9 (die drawn, not an emoji glyph)
  let g = die(540, 470, 1.1, 3, -8 + 4 * Math.sin(t * 3));
  g += kw('3 ODER 9', 540, 720, 130, P.purple, 62.66, t, { pulse: 63.24 });
  g += num('MONATE', 540, 850, 60 * POP(t, 63.64), P.ink);
  g += marker(330, 885, 420, 22, 63.7, 64.0, t);
  g += SC(390, 1100, POP(t, 62.66), num('3', 390, 1100, 200, P.blue)) + SC(700, 1100, POP(t, 63.24), num('9', 700, 1100, 260, P.red));
  return g;
}
function c26(t) { // the dice were secretly loaded: magnifier reveals a weight
  const mx = lerp(900, 600, eio(prog(t, 64.6, 65.3))), my = lerp(1200, 900, eio(prog(t, 64.6, 65.3)));
  let g = die(540, 860, 2.2, 3, -6);
  g += `<clipPath id="c26c"><circle cx="${mx}" cy="${my}" r="150"/></clipPath><g clip-path="url(#c26c)"><rect x="300" y="600" width="480" height="520" fill="#F7E7D0"/><circle cx="600" cy="960" r="70" fill="#6B7B84" stroke="${P.ink}" stroke-width="6"/><path d="M 560 930 l 80 60" stroke="#FFFFFF" stroke-width="6" opacity=".6"/></g>
   <circle cx="${mx}" cy="${my}" r="150" fill="none" stroke="${P.ink}" stroke-width="14"/><path d="M ${mx + 106} ${my + 106} L ${mx + 220} ${my + 220}" stroke="${P.ink}" stroke-width="34" stroke-linecap="round"/>`;
  g += stamp('!', 830, 480, 120, P.red, -10, 65.82, t);
  return g;
}
function c27(t) { // rolled 9 → harsher sentence: gavel slams
  const gv = t < 69.1 ? -40 * POP(t, 68.54) : -40 + 40 * eout(prog(t, 69.1, 69.2));
  let g = `<line x1="120" y1="1250" x2="960" y2="1250" stroke="${P.ink}" stroke-width="8" stroke-linecap="round"/>`;
  const hA = 300 * eout(prog(t, 67.0, 67.6)), hB = 520 * eout(prog(t, 67.3, 69.15));
  g += bar(280, 1250, 180, hA, P.blue, die(280, 1250 - hA - 120, .6, 3)) + bar(800, 1250, 180, hB, P.red, num('9', 800, 1250 - hB - 90, 110, P.red));
  g += gavel(560, 1000, .9, gv);
  g += burst(800, 1250 - hB, 69.1, t, P.red, 10, 120, 200);
  return g;
}
function c28(t) { // although everyone knew it was chance
  let g = '';
  for (let i = 0; i < 3; i++) { const x = 240 + i * 300; g += person(x, 1080, 1.2, [P.blue, P.purple, P.teal][i], { t }) + SC(x, 860, POP(t, 70.0 + i * .1), bulb(x, 860, .6, 1)); }
  const roll = prog(t, 71.28, 72.0);
  g += die(540, 520, 1.1, roll < 1 ? 1 + Math.floor(t * 10) % 6 : 5, 360 * roll);
  g += check(540, 300, 1.2, 70.4, t);
  return g;
}
function c29(t) { // your trick for the next negotiation
  let g = bulb(540, 820, 1.6 * POP(t, 72.42), t > 72.42);
  g += burst(540, 760, 72.5, t, P.orange, 12, 260, 360);
  g += words([['Dein', 72.2], ['Trick', 72.42], ['für', 72.64], ['die', 72.88], ['nächste', 73.02], ['Verhandlung', 73.3]], 540, 360, 66, t);
  return g;
}
function c30(t) { // salary or flea market
  const a = POP(t, 74.44), b = POP(t, 75.82);
  let g = SC(300, 850, a, `<rect x="160" y="680" width="280" height="360" rx="20" fill="#FFFFFF" stroke="${P.ink}" stroke-width="6"/><path d="M 200 760 h 200 M 200 820 h 160 M 200 880 h 180" stroke="${P.soft}" stroke-width="18" stroke-linecap="round"/>${num('€', 300, 970, 110, P.teal)}`);
  g += SC(780, 860, b, `<path d="M 600 760 L 960 760 L 920 680 L 640 680 Z" fill="${P.red}" stroke="${P.ink}" stroke-width="6" stroke-linejoin="round"/><path d="M 640 680 L 680 760 M 720 680 L 740 760 M 800 680 L 800 760 M 880 680 L 860 760" stroke="#FFFFFF" stroke-width="10"/>
     <rect x="620" y="760" width="320" height="40" fill="#A9743A" stroke="${P.ink}" stroke-width="5"/><path d="M 650 800 V 1040 M 910 800 V 1040" stroke="${P.ink}" stroke-width="12"/>
     ${tagNum('5', 780, 920, .7, P.orange, -8)}`);
  g += kw('/', 540, 860, 160, P.ink, 75.04, t);
  return g;
}
function c31(t) { // NENN DIE ERSTE ZAHL — you drop the anchor
  const ad = t < 77.48 ? lerp(-300, 0, ein(prog(t, 77.0, 77.48))) : 8 * ring(t, 77.48, 4, 6);
  let g = anchor(540, 1050 + ad, .8, 0, P.teal);
  g += stamp('NENN DIE ERSTE ZAHL', 540, 520, 58, P.teal, -5, 76.88, t);
  g += marker(240, 620, 600, 30, 77.5, 77.9, t);
  return g;
}
function c32(t) { // which number did you guess?
  let g = glasses(540, 520, 1 + .04 * Math.sin(t * 3));
  g += SC(540, 900, POP(t, 78.38), num('?? J.', 540, 900, 220, P.blue));
  g += SC(760, 1200, POP(t, 79.56), bubble(760, 1200, 300, 180, -60, 140, 1, `<path d="M -80 -20 h 160 M -80 30 h 110" stroke="${P.soft}" stroke-width="22" stroke-linecap="round"/>`));
  return g;
}
function c33(t) { // loop: the listing slides back in (= frame 0)
  return listing(540, 860, 1, PRICE('500 € VB', t), { rot: -3 + 2 * Math.sin(t * 1.4) });
}
const CARDF = [c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, c10, c11, c12, c13, c14, c15, c16, c17, c18, c19, c20, c21, c22, c23, c24, c25, c26, c27, c28, c29, c30, c31, c32, c33];

function scene(t) {
  let k = 0;
  for (let i = 0; i < CARDS.length; i++) if (t >= CARDS[i]) k = i;
  const p = k > 0 ? eout(prog(t, CARDS[k], CARDS[k] + .2)) : 1;
  const dir = k % 2 ? 1 : -1;
  let sh = 0;
  for (const [t0, a] of SHAKES) if (t >= t0 && t < t0 + .6) sh += a * Math.exp(-(t - t0) * 9);
  const sx = sh * Math.sin(t * 91), sy = sh * Math.cos(t * 77);
  const shift = -(k * 1100 * dir) + dir * -1100 * (p - 1);
  let body = '';
  if (p < 1) body += `<g transform="translate(${-dir * 1100 * p} 0)">${CARDF[k - 1](CARDS[k] - .001)}</g>`;
  body += `<g transform="translate(${dir * 1100 * (1 - p)} 0)">${CARDF[k](t)}</g>`;
  return `${paper(t, shift)}<g transform="translate(${sx} ${sy})">${body}</g>${progressBar(t)}`;
}

const __style = {"dust": false, "vignette": false, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const subtitleTop = __style.subtitle_y;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
