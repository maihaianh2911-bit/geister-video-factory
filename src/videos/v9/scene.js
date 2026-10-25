// @ts-nocheck
// AUTO-GENERATED scene for v9. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// ===== shared "drone safety" style: dark cinematic city, minimal side-view figure, tactical top-down maps =====
const D = { bg: '#0b0f18', bg2: '#121826', bg3: '#1a2030', bld: '#161d2c', bldFar: '#111725', win: '#f2c35a', winDim: '#6a5a30', lamp: '#ffb85c', jacket: '#24346a', jacketSh: '#18244a', pants: '#14161d', skin: '#d9a07a', hair: '#0e0f14', red: '#ff3b3b', redHatch: '#ff4a4a', ok: '#3ccf7a', paper: '#e9dcc3', line: '#d8e2f0', screen: '#dff1ff', ground: '#151a24', road: '#1b2130' };
const FT = `font-family:'Inter';font-weight:900`;
function txt(x, y, size, s, fill, o = {}) { return `<text x="${x}" y="${y}" text-anchor="${o.anchor || 'middle'}" style="${FT};font-size:${size}px;letter-spacing:${o.ls ?? 1}px" fill="${fill}">${s}</text>`; }
function tagErr(x, y, s, label, p) { // red rounded tag
  if (p <= 0) return ''; const w = label.length * 26 + 70;
  return `<g transform="translate(${x} ${y}) scale(${1.35 * s * back(p)})"><rect x="${-w / 2}" y="-38" width="${w}" height="76" rx="38" fill="${D.red}"/><rect x="${-w / 2 + 6}" y="-32" width="${w - 12}" height="64" rx="32" fill="none" stroke="#fff" stroke-opacity=".25" stroke-width="3"/>${txt(0, 15, 44, label, '#fff')}</g>`;
}
function tagStep(x, y, s, num, label, p, rot = -3) { // beige paper tag "1. FENSTER"
  if (p <= 0) return ''; const w = (label.length + 3) * 25 + 50;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${1.35 * s * back(p)})"><rect x="${-w / 2 + 6}" y="-34" width="${w}" height="74" fill="#000" opacity=".35"/><rect x="${-w / 2}" y="-40" width="${w}" height="74" fill="${D.paper}"/>
    <text x="${-w / 2 + 26}" y="12" style="${FT};font-size:42px" fill="${D.red}">${num}.<tspan fill="#1a1d26" dx="12">${label}</tspan></text></g>`;
}
function tagOk(x, y, s, label, p) {
  if (p <= 0) return ''; const w = label.length * 22 + 54;
  return `<g transform="translate(${x} ${y}) scale(${1.35 * s * back(p)})"><rect x="${-w / 2}" y="-30" width="${w}" height="60" rx="14" fill="${D.ok}"/>${txt(0, 13, 36, label, '#062814')}</g>`;
}
function tagWhite(x, y, s, label, p) {
  if (p <= 0) return ''; const w = label.length * 22 + 50;
  return `<g transform="translate(${x} ${y}) scale(${1.35 * s * back(p)})"><rect x="${-w / 2}" y="-30" width="${w}" height="60" rx="30" fill="#f4f6fb"/>${txt(0, 13, 34, label, '#10131c')}</g>`;
}
function winGrid(x0, y0, w, h, seed, o = {}) { // tiny lit windows
  let s = ''; const cols = Math.floor(w / (o.dx || 34)), rows = Math.floor(h / (o.dy || 44));
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const k = hash(seed * 31 + r * 7.3 + c * 1.9);
    if (k > (o.fill ?? .55)) continue;
    const lit = k < (o.lit ?? .22);
    s += `<rect x="${x0 + 10 + c * (o.dx || 34)}" y="${y0 + 12 + r * (o.dy || 44)}" width="${o.ww || 10}" height="${o.wh || 14}" fill="${lit ? D.win : '#232b3d'}" opacity="${lit ? .55 + .45 * hash(k * 9) : .8}"/>`;
  }
  return s;
}
function cityBg(t, o = {}) { // layered night city, ground at y = o.gy
  const gy = o.gy ?? 1180, dim = o.dim ?? 1;
  let far = '', mid = '';
  for (let i = 0; i < 7; i++) { const x = -40 + i * 170, h = 520 + 260 * hash(i + 3); far += `<rect x="${x}" y="${gy - h - 200}" width="150" height="${h + 200}" fill="${D.bldFar}"/>${winGrid(x, gy - h - 200, 150, h, i + 1, { fill: .35, lit: .12, dx: 26, dy: 34, ww: 6, wh: 9 })}`; }
  for (let i = 0; i < 5; i++) { const x = -60 + i * 250, h = 380 + 300 * hash(i + 11); mid += `<rect x="${x}" y="${gy - h}" width="210" height="${h}" fill="${D.bld}"/>${winGrid(x, gy - h, 210, h - 40, i + 20, { fill: .5, lit: .2 })}`; }
  let trees = '';
  for (const [tx, r] of [[60, 70], [420, 56], [980, 80]]) trees += `<circle cx="${tx}" cy="${gy - r - 40}" r="${r}" fill="#090c13"/><rect x="${tx - 6}" y="${gy - 50}" width="12" height="50" fill="#090c13"/>`;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.bg}"/>
    <rect x="-40" y="-40" width="1160" height="${gy}" fill="url(#gWall)" opacity=".25"/>
    <g opacity="${.8 * dim}">${far}</g><g opacity="${dim}">${mid}</g>${o.noTrees ? '' : trees}
    <rect x="-40" y="${gy}" width="1160" height="${2000 - gy}" fill="${D.ground}"/>
    <rect x="-40" y="${gy}" width="1160" height="8" fill="#252c3c"/>
    ${o.road ? `<line x1="-40" y1="${gy + 130}" x2="1120" y2="${gy + 130}" stroke="#3a4256" stroke-width="6" stroke-dasharray="50 40"/>` : ''}
    <rect x="-40" y="${gy + 200}" width="1160" height="800" fill="#000" opacity=".35"/>`;
}
function streetLamp(x, gy, h = 420, on = 1) {
  return `<rect x="${x - 5}" y="${gy - h}" width="10" height="${h}" fill="#0a0c12"/><path d="M ${x} ${gy - h} q 30 -20 60 0" stroke="#0a0c12" stroke-width="10" fill="none"/><rect x="${x + 44}" y="${gy - h - 4}" width="34" height="10" rx="4" fill="${on ? '#ffd9a0' : '#333'}"/>
    ${on ? `<ellipse cx="${x + 60}" cy="${gy - h + 40}" rx="200" ry="220" fill="${D.lamp}" opacity="${.18 * on}" filter="url(#blur40)"/><polygon points="${x + 46},${gy - h + 6} ${x + 76},${gy - h + 6} ${x + 200},${gy} ${x - 80},${gy}" fill="${D.lamp}" opacity="${.06 * on}"/>` : ''}`;
}
// minimal side-view figure; origin at feet; ~300 px tall at s=1; faces right (dir=1)
function andrej(x, y, s, o = {}) {
  const dir = o.dir ?? 1, ph = o.walk ?? null;
  const sw = ph === null ? 0 : Math.sin(ph) * 26, sw2 = ph === null ? 0 : Math.sin(ph + Math.PI) * 26;
  const bob = ph === null ? 0 : Math.abs(Math.cos(ph)) * 4;
  const aF = o.armF ?? (ph === null ? 4 : -sw * .9), aB = o.armB ?? (ph === null ? -4 : -sw2 * .9);
  const look = o.look || 0; // deg, negative = look up
  const leg = (a, c) => `<g transform="rotate(${a} 0 -130)"><rect x="-11" y="-136" width="22" height="134" rx="10" fill="${c}"/><rect x="-10" y="-10" width="32" height="12" rx="5" fill="#07080b"/></g>`;
  const arm = (a, c, front) => `<g transform="rotate(${a} 0 -236)"><rect x="-10" y="-244" width="20" height="104" rx="10" fill="${c}"/>${front && o.phone ? '' : `<circle cx="0" cy="-138" r="10" fill="${D.skin}"/>`}</g>`;
  const phoneArm = o.phone ? `<g><path d="M 0 -232 Q 34 -190 22 -262" stroke="${D.jacket}" stroke-width="20" fill="none" stroke-linecap="round"/><rect x="14" y="-292" width="16" height="30" rx="4" fill="#0b0d12"/><rect x="17" y="-289" width="10" height="24" rx="2" fill="${D.screen}"/><circle cx="24" cy="-276" r="${50 * o.phone}" fill="${D.screen}" opacity=".25" filter="url(#blur20)"/></g>` : '';
  const filmArm = o.film ? `<g><path d="M 0 -236 L 46 -300" stroke="${D.jacket}" stroke-width="20" stroke-linecap="round"/><rect x="36" y="-338" width="22" height="40" rx="4" fill="#0b0d12"/><rect x="39" y="-334" width="16" height="32" rx="2" fill="${D.screen}"/><circle cx="47" cy="-318" r="70" fill="${D.screen}" opacity=".35" filter="url(#blur20)"/></g>` : '';
  if (o.crouch) { // crouched, hands protecting head
    return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})">
      <ellipse cx="10" cy="2" rx="70" ry="10" fill="#000" opacity=".4"/>
      <path d="M -40 0 L -36 -60 L 30 -66 L 34 0" stroke="${D.pants}" stroke-width="24" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
      <path d="M -40 -60 Q -46 -140 10 -150 Q 46 -150 52 -110" fill="none" stroke="${D.jacket}" stroke-width="56" stroke-linecap="round"/>
      <circle cx="58" cy="-108" r="26" fill="${D.skin}"/><path d="M 34 -118 Q 50 -142 80 -128 Q 70 -110 44 -100 Z" fill="${D.hair}"/>
      ${o.phone ? `<rect x="80" y="-128" width="14" height="26" rx="3" fill="${D.screen}"/><circle cx="87" cy="-115" r="${60 * o.phone}" fill="${D.screen}" opacity=".3" filter="url(#blur20)"/><path d="M 20 -140 Q 70 -150 84 -118" stroke="${D.jacketSh}" stroke-width="18" fill="none" stroke-linecap="round"/>`
        : `<path d="M 10 -150 Q 60 -170 84 -126" stroke="${D.jacketSh}" stroke-width="18" fill="none" stroke-linecap="round"/><circle cx="82" cy="-124" r="9" fill="${D.skin}"/>`}</g>`;
  }
  if (o.lie) {
    return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})"><ellipse cx="0" cy="2" rx="160" ry="10" fill="#000" opacity=".4"/>
      <rect x="-150" y="-26" width="134" height="24" rx="10" fill="${D.pants}"/><rect x="-24" y="-40" width="130" height="40" rx="18" fill="${D.jacket}"/>
      <circle cx="128" cy="-26" r="24" fill="${D.skin}"/><path d="M 110 -40 Q 130 -54 150 -36 Q 140 -26 120 -16 Z" fill="${D.hair}"/><path d="M 60 -40 Q 110 -66 140 -48" stroke="${D.jacketSh}" stroke-width="16" fill="none" stroke-linecap="round"/></g>`;
  }
  return `<g transform="translate(${x} ${y - bob * s}) scale(${s * dir} ${s})">
    <ellipse cx="0" cy="${2 + bob}" rx="46" ry="8" fill="#000" opacity=".4"/>
    ${arm(aB, D.jacketSh, false)}${leg(sw2, '#0f1117')}${leg(sw, D.pants)}
    <path d="M -24 -136 L -26 -236 Q -20 -258 0 -258 Q 22 -258 26 -236 L 26 -136 Z" fill="${D.jacket}"/>
    <path d="M 8 -250 L 10 -140" stroke="#3a4c8a" stroke-width="3"/>
    <g transform="rotate(${look} 0 -258)"><rect x="-8" y="-272" width="16" height="18" fill="${D.skin}"/>
      <circle cx="2" cy="-290" r="25" fill="${D.skin}"/><path d="M -24 -290 Q -26 -318 2 -318 Q 26 -318 26 -300 Q 8 -306 -4 -296 Q -10 -282 -22 -278 Z" fill="${D.hair}"/><path d="M 26 -292 l 6 8 l -6 2" fill="${D.skin}"/></g>
    ${o.phone ? phoneArm : o.film ? filmArm : arm(aF, D.jacket, true)}${o.extra || ''}</g>`;
}
function droneTop(t, x, y, s, o = {}) { // grey arrowhead seen from above + blinking red dot
  const blink = Math.floor(t * 3) % 2 ? .25 : 1;
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${s})"><path d="M 0 -70 L 52 50 L 0 30 L -52 50 Z" fill="#8a93a6" stroke="#c9d2e6" stroke-width="3" stroke-linejoin="round"/><path d="M 0 -70 L 0 30" stroke="#5d6578" stroke-width="3"/>
    <circle cx="0" cy="10" r="7" fill="${D.red}" opacity="${blink}"/><circle cx="0" cy="10" r="20" fill="${D.red}" opacity="${.35 * blink}" filter="url(#blur8)"/></g>`;
}
function radar(t, x, y, s, o = {}) { // concentric thin rings + expanding pulses
  let r = '';
  for (let i = 1; i <= 3; i++) r += `<circle cx="${x}" cy="${y}" r="${i * 60 * s}" fill="none" stroke="#c9d2e6" stroke-opacity="${.22 + .1 * (3 - i)}" stroke-width="2"/>`;
  for (let k = 0; k < 2; k++) { const p = ((t * .8 + k * .5) % 1); r += `<circle cx="${x}" cy="${y}" r="${(30 + 220 * p) * s}" fill="none" stroke="#e9f0ff" stroke-width="${3 * (1 - p) + .5}" opacity="${(1 - p) * .7}"/>`; }
  return r + (o.dot !== false ? `<circle cx="${x}" cy="${y}" r="${8 * s + 3}" fill="${D.red}" opacity="${Math.floor(t * 3) % 2 ? .3 : 1}"/><circle cx="${x}" cy="${y}" r="${22 * s + 6}" fill="${D.red}" opacity=".3" filter="url(#blur8)"/>` : '');
}
function hatch(id, shapeSvg, o = {}) { // red hatched zone; shapeSvg is a closed shape (no fill) used as clip
  const bx = o.bx ?? 0, by = o.by ?? 0, bw = o.bw ?? 1080, bh = o.bh ?? 1920;
  let l = ''; for (let i = -bh; i < bw; i += 22) l += `<line x1="${bx + i}" y1="${by + bh}" x2="${bx + i + bh}" y2="${by}" stroke="${D.redHatch}" stroke-width="5"/>`;
  return `<clipPath id="${id}">${shapeSvg}</clipPath><g opacity="${o.op ?? .9}"><g clip-path="url(#${id})">${l}</g></g>${shapeSvg.replace('/>', ` fill="none" stroke="${D.redHatch}" stroke-width="5"/>`)}`;
}
function hatchEll(id, cx, cy, rx, ry, p = 1) { if (p <= 0) return ''; return hatch(id, `<ellipse cx="${cx}" cy="${cy}" rx="${rx * p}" ry="${ry * p}"/>`, { bx: cx - rx, by: cy - ry, bw: rx * 2, bh: ry * 2 }); }
function hatchRect(id, x, y, w, h, p = 1) { if (p <= 0) return ''; return hatch(id, `<rect x="${x}" y="${y}" width="${w * p}" height="${h}"/>`, { bx: x, by: y, bw: w, bh: h }); }
function safeRing(t, x, y, r, p = 1) { if (p <= 0) return ''; return `<circle cx="${x}" cy="${y}" r="${r * back(p)}" fill="${D.ok}" fill-opacity=".12" stroke="${D.ok}" stroke-width="5" stroke-dasharray="16 12" stroke-dashoffset="${-t * 30}"/>`; }
function corners(x, y, w, h, L = 50, col = '#e9f0ff', sw = 5) {
  return `<path d="M ${x} ${y + L} V ${y} H ${x + L} M ${x + w - L} ${y} H ${x + w} V ${y + L} M ${x + w} ${y + h - L} V ${y + h} H ${x + w - L} M ${x + L} ${y + h} H ${x} V ${y + h - L}" stroke="${col}" stroke-width="${sw}" fill="none"/>`;
}
function dotP(t, x, y, o = {}) { // top-down person dot
  return `${o.glow ? `<circle cx="${x}" cy="${y}" r="46" fill="${D.screen}" opacity=".35" filter="url(#blur20)"/>` : ''}<circle cx="${x}" cy="${y}" r="${o.r || 18}" fill="${o.main ? '#2a2f3c' : '#3a4256'}" stroke="${o.main ? '#f4f6fb' : '#c9d2e6'}" stroke-width="5"/>${o.main ? `<circle cx="${x + 4}" cy="${y - 4}" r="8" fill="${D.hair}"/>` : ''}`;
}
function yArrow(pts, p, col = '#ffd23a') { // yellow path arrow along polyline, progress p
  if (p <= 0) return '';
  const d = 'M ' + pts.map(q => q.join(' ')).join(' L ');
  const [a, b] = [pts[pts.length - 2], pts[pts.length - 1]];
  const ang = Math.atan2(b[1] - a[1], b[0] - a[0]) * 180 / Math.PI;
  return `<path d="${d}" stroke="${col}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="${p} 1"/>${p > .95 ? `<g transform="translate(${b[0]} ${b[1]}) rotate(${ang})"><path d="M 0 0 L -26 -16 L -26 16 Z" fill="${col}"/></g>` : ''}`;
}
function redDash(pts, p) { if (p <= 0) return ''; return `<path d="M ${pts.map(q => q.join(' ')).join(' L ')}" stroke="${D.red}" stroke-width="7" fill="none" stroke-dasharray="18 14" pathLength="1" opacity="${cl(p * 2)}"/>`; }
function xMark(x, y, s, p) { if (p <= 0) return ''; const a = cl(p * 2), b = cl(p * 2 - 1); return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -40 -40 L ${-40 + 80 * a} ${-40 + 80 * a}" stroke="${D.red}" stroke-width="16" stroke-linecap="round"/>${b > 0 ? `<path d="M 40 -40 L ${40 - 80 * b} ${-40 + 80 * b}" stroke="${D.red}" stroke-width="16" stroke-linecap="round"/>` : ''}</g>`; }
function blast(t, t0, x, y, s = 1) { // orange blurred flash; returns [svg, shakeX, shakeY]
  if (t < t0) return ['', 0, 0];
  const dt = t - t0, a = Math.exp(-dt * 2.2);
  const k = 18 * Math.exp(-dt * 6);
  return [`<circle cx="${x}" cy="${y}" r="${(260 + 300 * (1 - Math.exp(-dt * 4))) * s}" fill="#ff7a2a" opacity="${.75 * a}" filter="url(#blur40)"/><circle cx="${x}" cy="${y}" r="${140 * s}" fill="#ffd27a" opacity="${.8 * Math.exp(-dt * 5)}" filter="url(#blur20)"/>`, k * Math.sin(t * 93), k * Math.cos(t * 71)];
}
function flash(t, t0, col = '#ffb070') { if (t < t0) return ''; return `<rect x="-40" y="-40" width="1160" height="2000" fill="${col}" opacity="${.55 * Math.exp(-(t - t0) * 5)}"/>`; }
function planRoom(x, y, w, h, o = {}) { // white thin outline rectangle with optional door gap/window marks
  return `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${o.fill || 'none'}" stroke="${D.line}" stroke-width="5" opacity=".9"/>${(o.windows || []).map(([wx, wy, ww, wh]) => `<rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" fill="#8fd8ff" opacity=".9"/>`).join('')}${(o.doors || []).map(([dx, dy, dw, dh]) => `<rect x="${dx}" y="${dy}" width="${dw}" height="${dh}" fill="${D.bg2}"/>`).join('')}`;
}
function vignetteDark() { return `<rect x="0" y="1350" width="1080" height="570" fill="url(#gFadeD)"/>`; }
function darkDefs() { return `<defs><linearGradient id="gFadeD" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#000" stop-opacity="0"/><stop offset=".4" stop-color="#05070c" stop-opacity=".85"/><stop offset="1" stop-color="#05070c" stop-opacity="1"/></linearGradient></defs>`; }

// ===== v9: "Drohnenangriff: Geh nicht zum Fenster" — cinematic dark style (owner's reference) =====
// NOTE: the aligner failed for lines 0–6 (all squeezed into 0–29.92 s); line times below were measured from pauses in the voice track.
// L0 0–5.68 · L1 6.23–13.12 · L2 13.27–16.99 · L3 17.24–17.81 · L4 18.06–19.97 · L5 20.18–25.15 · L6 25.30–29.59
function andrejSit(x, y, s, o = {}) { // seated at a desk facing right; y = seat height
  const look = o.look || 0, type = o.type ? Math.sin(o.t * 18) * 4 : 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-50" y="-6" width="90" height="14" rx="6" fill="#0a0c12"/><rect x="-46" y="8" width="10" height="120" fill="#0a0c12"/><rect x="-60" y="-130" width="14" height="130" rx="6" fill="#0a0c12"/>
    <rect x="-24" y="-20" width="110" height="24" rx="10" fill="${D.pants}"/><rect x="72" y="-16" width="22" height="130" rx="10" fill="${D.pants}"/>
    <path d="M -30 -10 L -28 -110 Q -22 -132 0 -132 Q 24 -132 28 -110 L 30 -10 Z" fill="${D.jacket}"/>
    <path d="M 10 -110 Q 60 -90 ${92 + type} -60" stroke="${D.jacketSh}" stroke-width="18" fill="none" stroke-linecap="round"/>
    <g transform="rotate(${look} 0 -132)"><rect x="-8" y="-146" width="16" height="18" fill="${D.skin}"/><circle cx="4" cy="-164" r="25" fill="${D.skin}"/><path d="M -22 -164 Q -24 -192 4 -192 Q 28 -192 28 -174 Q 10 -180 -2 -170 Q -8 -156 -20 -152 Z" fill="${D.hair}"/><path d="M 28 -166 l 6 8 l -6 2" fill="${D.skin}"/></g></g>`;
}
function room(t, o = {}) { // apartment interior side view; o.light 0..1 (monitor), o.outside blast glow
  const mon = o.mon ?? 1;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#07090f"/>
    <rect x="-40" y="300" width="1160" height="860" fill="${D.bg2}"/>
    <rect x="-40" y="1150" width="1160" height="800" fill="#0d1018"/><rect x="-40" y="1150" width="1160" height="8" fill="#20283a"/>
    <g><rect x="700" y="440" width="270" height="420" fill="#0a1020"/>
      <clipPath id="rmW"><rect x="700" y="440" width="270" height="420"/></clipPath><g clip-path="url(#rmW)">
        <rect x="700" y="600" width="90" height="300" fill="${D.bldFar}"/>${winGrid(700, 600, 90, 260, 3, { fill: .5, lit: .3, dx: 22, dy: 30, ww: 6, wh: 9 })}
        <rect x="810" y="540" width="130" height="360" fill="${D.bld}"/>${winGrid(810, 540, 130, 320, 5, { fill: .5, lit: .3, dx: 24, dy: 30, ww: 7, wh: 10 })}
        ${o.outside || ''}</g>
      <rect x="700" y="440" width="270" height="420" fill="none" stroke="#2a3346" stroke-width="12"/><path d="M 835 440 V 860 M 700 650 H 970" stroke="#2a3346" stroke-width="8"/>
      <rect x="680" y="860" width="310" height="16" fill="#2a3346"/>${o.glass || ''}</g>
    ${mon > 0 ? `<polygon points="360,860 360,980 700,1150 120,1150" fill="${D.screen}" opacity="${.05 * mon}"/><circle cx="380" cy="890" r="200" fill="${D.screen}" opacity="${.18 * mon}" filter="url(#blur40)"/>` : ''}
    <rect x="160" y="980" width="340" height="16" fill="#1d2433"/><rect x="180" y="996" width="12" height="154" fill="#1d2433"/><rect x="470" y="996" width="12" height="154" fill="#1d2433"/>
    <rect x="330" y="960" width="90" height="10" fill="#1d2433"/><rect x="368" y="930" width="14" height="34" fill="#1d2433"/>
    <rect x="290" y="820" width="170" height="114" rx="6" fill="#1b2130"/><rect x="298" y="828" width="154" height="98" fill="${mon > 0 ? D.screen : '#06080d'}" opacity="${mon > 0 ? .9 * mon : 1}"/>
    <rect x="-40" y="260" width="1160" height="40" fill="#0a0c12"/>`;
}
function shardFly(t, t0, n, x0, y0, spread) {
  if (t < t0) return '';
  let s = '';
  for (let i = 0; i < n; i++) { const dt = t - t0 - (i % 5) * .03; if (dt < 0) continue; const p = cl(dt / .7); const vx = -(300 + 500 * hash(i + 1)), vy = (hash(i + 7) - .5) * spread; s += `<g transform="translate(${x0 + vx * p} ${y0 + vy * p + 300 * p * p}) rotate(${dt * 600 * (hash(i) > .5 ? 1 : -1)})" opacity="${1 - cl((dt - .7) / .4)}"><path d="M 0 -${12 + 14 * hash(i + 3)} L 10 8 L -8 6 Z" fill="#cfefff" stroke="#fff" stroke-width="2" opacity=".9"/></g>`; }
  return s;
}
// ---- 1  0–6.23  a reflex can endanger you: going to the window
function s1(t) {
  if (t < 3.6) {
    const pan = eio(prog(t, 0, 3.6));
    return `<g transform="translate(0 ${-40 * pan})">${cityBg(t, { gy: 1250 })}
      <rect x="300" y="420" width="480" height="830" fill="#1a2232"/>${winGrid(300, 420, 480, 800, 9, { fill: .6, lit: .12, dx: 60, dy: 80, ww: 26, wh: 36 })}
      <rect x="500" y="740" width="26" height="36" fill="${D.win}"/><rect x="480" y="720" width="66" height="76" fill="${D.win}" opacity=".25" filter="url(#blur8)"/>
      ${radar(t, 560, 330, 1)}${droneTop(t, 560 + 40 * Math.sin(t * .7), 330, .7, { rot: 90 })}
      ${streetLamp(160, 1250, 380)}</g>`;
  }
  const walk = prog(t, 3.7, 5.2);
  const hz = prog(t, 4.6, 5.0);
  return `${room(t, { mon: 1 })}${hatchRect('h1', 640, 1150, 380, 70, hz)}
    ${andrej(lerp(300, 620, eio(walk)), 1150, 1.05, { walk: walk > 0 && walk < 1 ? t * 9 : null, look: -10 })}
    ${radar(t, 820, 200, .7)}`;
}
// ---- 2  6.23–13.27  night, Andrej at the computer, a moped-like hum right above the house
function s2(t) {
  const hum = prog(t, 9.7, 10.2);
  const look = t > 10.8 ? lerp(0, -28, eout(prog(t, 10.8, 11.2))) : 0;
  const tremble = hum > 0 ? 2 * Math.sin(t * 50) * hum : 0;
  return `<g transform="translate(${tremble} 0)">${room(t)}
    ${andrejSit(380 - 120, 1030, 1.05, { look, t, type: t < 10.8 })}
    ${hum > 0 ? `<g opacity="${hum}">${radar(t, 560, 160, 1.2)}</g>` : ''}
    ${t < 8.15 ? `<rect x="-40" y="-40" width="1160" height="2000" fill="#000" opacity="${.85 * (1 - prog(t, 6.23, 7.2))}"/>` : ''}</g>`;
}
// ---- 3  13.27–17.24  he goes to the window — mistake: glass shards fly inward
function s3(t) {
  const up = prog(t, 13.27, 13.6), walk = prog(t, 13.5, 14.3);
  const [bl, bx, by] = blast(t, 15.0, 1100, 500, .8);
  const shards = shardFly(t, 15.4, 26, 830, 650, 500);
  const hz = prog(t, 16.2, 16.6);
  const flinch = t > 15.4;
  const ax = flinch ? lerp(640, 470, eout(prog(t, 15.4, 15.9))) : lerp(330, 640, eio(walk));
  return `<g transform="translate(${bx} ${by})">${room(t, { outside: bl })}
    ${hatchEll('h3', 760, 1150, 330, 60, hz)}
    ${t < 13.6 ? andrejSit(260, 1030, 1.05, { look: -28 * (1 - up), t }) : andrej(ax, 1150, 1.05, flinch ? { crouch: 1, dir: -1 } : { walk: walk < 1 ? t * 9 : null, look: -6 })}
    ${shards}${flash(t, 15.0)}
    ${tagErr(540, 250, 1, 'FEHLER', prog(t, 14.16, 14.45))}</g>`;
}
// ---- 4–7  17.24–29.84  top-down plan: away from windows, inner room, protect head, call 112
const PL = { x: 150, y: 330, w: 780, h: 820 };
function plan(t, o = {}) {
  const P = PL;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.bg2}"/>
    ${[...Array(10)].map((_, i) => `<circle cx="${80 + (i * 137) % 1000}" cy="${1250 + (i % 3) * 60}" r="${40 + 20 * hash(i)}" fill="#0c1018" opacity=".7"/>`).join('')}
    <rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" fill="#151c2a"/>
    ${planRoom(P.x, P.y, P.w, P.h, { windows: [[P.x + P.w - 6, 380, 12, 200], [P.x + P.w - 6, 760, 12, 200], [380, P.y - 6, 220, 12]] })}
    ${planRoom(P.x, 640, 300, 280, { doors: [[P.x + 300 - 4, 740, 10, 90]] })}
    ${planRoom(P.x, P.y, 300, 310, { doors: [[P.x + 120, 640 - 4, 90, 10]] })}
    <line x1="${P.x + 560}" y1="${P.y}" x2="${P.x + 560}" y2="${P.y + 360}" stroke="${D.line}" stroke-width="5"/>
    ${o.extra || ''}`;
}
function s4(t) {
  const zoom = eout(prog(t, 17.24, 17.7));
  const winZ = prog(t, 18.3, 18.8);
  const away = eio(prog(t, 18.9, 19.9));
  const toIn = eio(prog(t, 21.1, 22.6));
  let px = 840, py = 700;
  if (t > 18.9) { px = lerp(840, 600, away); py = lerp(700, 790, away); }
  if (t > 21.1) { px = lerp(600, 300, toIn); py = lerp(790, 780, toIn); }
  const safe = prog(t, 22.5, 22.9);
  const cc = 1 - .4 * zoom;
  const hz = `${hatchRect('h4a', 700, 330, 230, 820, winZ)}${hatchRect('h4b', 360, 330, 260, 110, winZ)}`;
  const g = t > 18.3 && t < 18.8 ? `<g opacity="${(1 - winZ)}">${dotP(t, 840, 700, { main: 1 })}</g>` : '';
  if (t >= 24.0 && t < 25.3) { // side view: crouched in the inner hallway, hands over head
    return `<rect x="-40" y="-40" width="1160" height="2000" fill="#0b0e15"/><rect x="-40" y="420" width="1160" height="730" fill="#141a26"/><rect x="-40" y="1150" width="1160" height="800" fill="#0d1018"/>
      <rect x="120" y="520" width="200" height="630" fill="#10141e" stroke="#232b3d" stroke-width="6"/><rect x="760" y="520" width="200" height="630" fill="#10141e" stroke="#232b3d" stroke-width="6"/>
      ${andrej(520, 1150, 1.25, { crouch: 1 })}${safeRing(t, 540, 1080, 260, 1)}
      ${tagStep(540, 260, 1, 2, 'INNENRAUM', 1)}`;
  }
  return `${plan(t, { extra: hz })}
    ${safeRing(t, 290, 780, 110, safe)}${tagOk(290, 950, 1, 'SICHER', prog(t, 22.7, 23.0))}
    ${yArrow([[840, 700], [600, 790]], prog(t, 18.9, 19.6))}${yArrow([[600, 790], [440, 785], [320, 780]], prog(t, 21.1, 22.2))}
    ${g}${dotP(t, px, py, { main: 1 })}
    ${t < 17.81 ? `<g opacity="${.6 + .4 * Math.sin(t * 20)}">${dotP(t, 840, 700, { main: 1, glow: 1 })}</g>` : ''}
    ${corners(lerp(40, 100, zoom), lerp(150, 260, zoom), lerp(1000, 880, zoom), lerp(1180, 1020, zoom), 60)}
    ${tagStep(540, 220, 1, 1, 'FENSTER', prog(t, 18.06, 18.35) * (1 - prog(t, 20.0, 20.18)))}
    ${tagStep(540, 220, 1, 2, 'INNENRAUM', prog(t, 20.18, 20.5))}
    ${radar(t, 980, 200, .5)}`;
}
function s7(t) { // 25.30–29.84 call 112: time, place, direction
  const ph = back(prog(t, 25.4, 25.75));
  const ic = [prog(t, 26.92, 27.2), prog(t, 27.7, 28.0), prog(t, 28.3, 28.6)];
  const call = t > 26.0;
  const scr = `<rect x="-120" y="-250" width="240" height="500" rx="34" fill="#0b0d12" stroke="#2a3346" stroke-width="6"/><rect x="-104" y="-226" width="208" height="452" rx="20" fill="#0f1a2c"/>
    ${txt(0, -120, 76, '112', '#fff')}
    ${call ? `<circle cx="0" cy="140" r="${44 + 6 * Math.sin(t * 8)}" fill="${D.ok}"/><path d="M -18 128 q 18 30 40 22 l 4 -12 l -12 -8 l -8 6 q -12 -6 -16 -18 l 6 -8 l -8 -12 z" fill="#fff"/>` : [0, 1, 2].map(r => [0, 1, 2].map(c => `<circle cx="${-60 + c * 60}" cy="${-20 + r * 60}" r="22" fill="#1e2a40"/>`).join('')).join('')}`;
  const icon = (i, x, y, svg) => ic[i] > 0 ? `<g transform="translate(${x} ${y}) scale(${back(ic[i])})"><circle r="70" fill="#1a2234" stroke="${D.line}" stroke-width="4"/>${svg}</g>` : '';
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#0b0e15"/><rect x="-40" y="420" width="1160" height="730" fill="#141a26"/><rect x="-40" y="1150" width="1160" height="800" fill="#0d1018"/>
    ${andrej(250, 1150, 1.2, { crouch: 1, phone: call ? 1 : .5 })}
    <g transform="translate(700 720) scale(${ph})"><circle r="300" fill="${D.screen}" opacity=".12" filter="url(#blur40)"/>${scr}</g>
    ${icon(0, 250, 520, `<circle r="40" fill="none" stroke="#fff" stroke-width="6"/><path d="M 0 0 V -26 M 0 0 L 18 10" stroke="#fff" stroke-width="6" stroke-linecap="round"/>`)}
    ${icon(1, 450, 360, `<path d="M 0 40 Q -34 0 -34 -14 A 34 34 0 1 1 34 -14 Q 34 0 0 40 Z" fill="${D.red}"/><circle cy="-14" r="12" fill="#1a2234"/>`)}
    ${icon(2, 250, 230, `<g transform="rotate(45)">${droneTop(t, 0, 0, .55)}</g><path d="M 20 -40 L 50 -60" stroke="#ffd23a" stroke-width="6"/>`)}
    ${tagStep(700, 230, 1, 3, '112', prog(t, 25.32, 25.6), 3)}`;
}
// ---- 8  29.84–33.91  explosion, power goes out, plaster trickles from the ceiling
function hall(t, o = {}) {
  const lit = o.lit ?? 1;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#07090f"/><rect x="-40" y="420" width="1160" height="730" fill="${lit ? '#161d2b' : '#0b0e15'}"/><rect x="-40" y="1150" width="1160" height="800" fill="#0b0d14"/>
    <rect x="-40" y="380" width="1160" height="40" fill="#0a0c12"/>
    ${lit ? `<circle cx="540" cy="440" r="160" fill="${D.lamp}" opacity=".2" filter="url(#blur40)"/>` : ''}<rect x="510" y="420" width="60" height="16" rx="6" fill="${lit ? '#ffd9a0' : '#2a2f3c'}"/>
    <rect x="120" y="520" width="200" height="630" fill="#10141e" stroke="#232b3d" stroke-width="6"/><rect x="760" y="520" width="200" height="630" fill="#10141e" stroke="#232b3d" stroke-width="6"/>`;
}
function plaster(t, t0, n = 40) {
  if (t < t0) return '';
  let s = '';
  for (let i = 0; i < n; i++) { const te = t0 + hash(i) * 1.6; if (t < te) continue; const dt = t - te, y = 430 + 500 * dt * dt + 120 * dt; if (y > 1150) continue; s += `<circle cx="${80 + hash(i + 3) * 920}" cy="${y}" r="${2 + 3 * hash(i + 5)}" fill="#c9c1b0" opacity=".85"/>`; }
  return s + `<rect x="${200}" y="420" width="700" height="${20 * cl((t - t0) * 2)}" fill="#c9c1b0" opacity=".08" filter="url(#blur8)"/>`;
}
function s8(t) {
  const [bl, sx, sy] = blast(t, 30.06, 540, 300, 1);
  const lit = t < 31.25 ? (t > 30.9 ? (hash(Math.floor(t * 25)) > .5 ? 1 : 0) : 1) : 0;
  return `<g transform="translate(${sx} ${sy})">${hall(t, { lit })}${bl}
    ${andrej(520, 1150, 1.25, { crouch: 1 })}${plaster(t, 32.1)}${flash(t, 30.06)}</g>`;
}
// ---- 9  33.91–37.3  don't get up right away — more impacts may follow
function s9(t) {
  const rise = Math.sin(prog(t, 34.0, 34.6) * Math.PI) * (t < 34.6 ? 1 : 0);
  const rd = prog(t, 35.6, 36.0);
  return `${hall(t, { lit: 0 })}${plaster(t, 31.5, 25)}
    ${rise > .3 ? andrej(520, 1150, 1.25, { look: -10 }) : andrej(520, 1150, 1.25, { crouch: 1 })}
    ${xMark(720, 760, 1.2, prog(t, 34.4, 34.7) * (1 - prog(t, 35.4, 35.6)))}
    ${rd > 0 ? `<g opacity="${rd}">${radar(t, 300, 250, 1)}${radar(t + .4, 820, 300, .8)}</g>` : ''}`;
}
// ---- 10  37.3–48.18  leaving: not the elevator (power cut) — stairs only if safe and smoke-free
function landing(t, o = {}) {
  let steps = '';
  for (let i = 0; i < 9; i++) steps += `<rect x="${600 + i * 60}" y="${900 + i * 40}" width="${520 - i * 60}" height="40" fill="${i % 2 ? '#1c2232' : '#20283a'}"/>`;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#07090f"/><rect x="-40" y="380" width="1160" height="520" fill="#151b28"/>
    <rect x="-40" y="900" width="640" height="1040" fill="#0d1018"/><rect x="-40" y="900" width="640" height="8" fill="#252c3c"/>${steps}
    <path d="M 600 860 L 1080 1220" stroke="#3a4256" stroke-width="8"/>
    <rect x="80" y="560" width="170" height="340" fill="#2a1f1a" stroke="#3a3040" stroke-width="6"/><circle cx="230" cy="740" r="7" fill="#c9a86a"/>
    <rect x="320" y="540" width="200" height="360" fill="#1e2534" stroke="#3a4256" stroke-width="6"/><line x1="420" y1="540" x2="420" y2="900" stroke="#3a4256" stroke-width="5"/>
    <rect x="536" y="680" width="34" height="60" rx="6" fill="#2a3346"/><circle cx="553" cy="${o.called ? 698 : 722}" r="9" fill="${o.lift === false ? '#333' : o.called ? D.win : '#5d6578'}"/>
    <rect x="370" y="500" width="100" height="30" rx="6" fill="#0a0c12"/>${txt(420, 523, 24, o.lift === false ? '' : '7', o.lift === false ? '#333' : D.red)}`;
}
function s10(t) {
  if (t >= 41.22 && t < 44.4) { // shaft cut-away: cabin stuck between floors in the dark
    const sh = t < 41.6 ? 4 * Math.sin(t * 60) : 0;
    return `<rect x="-40" y="-40" width="1160" height="2000" fill="#06080c"/>
      <rect x="340" y="150" width="400" height="1240" fill="#0d1018" stroke="#2a3346" stroke-width="8"/>
      ${[400, 820, 1240].map(y => `<rect x="300" y="${y}" width="480" height="20" fill="#1c2232"/>`).join('')}
      <line x1="540" y1="150" x2="540" y2="${560 + sh}" stroke="#3a4256" stroke-width="6"/>
      <g transform="translate(${sh} 0)"><rect x="390" y="${560}" width="300" height="400" fill="#1a2030" stroke="#5d6578" stroke-width="8"/>${andrej(540, 950, .9, { look: -20 })}</g>
      ${xMark(540, 300, 1.4, prog(t, 42.6, 42.9))}${tagErr(540, 1100 - 0, 1, 'FEHLER', prog(t, 41.3, 41.5))}`;
  }
  const exit = prog(t, 37.6, 38.4);
  const toLift = prog(t, 38.6, 39.4);
  const toStairs = prog(t, 44.5, 46.2);
  let x = 165, y = 900, walk = null, dir = 1, opt = {};
  if (t < 44.4) { x = t < 38.6 ? lerp(165, 200, exit) : lerp(200, 300, eio(toLift)); walk = (exit > 0 && exit < 1) || (toLift > 0 && toLift < 1) ? t * 9 : null; opt = { armF: t > 39.4 && t < 40.1 ? -70 : undefined }; }
  else { const st = eio(toStairs); x = lerp(300, 900, st); y = x < 600 ? 900 : 900 + (x - 600) * (40 / 60); walk = toStairs < 1 ? t * 9 : null; }
  const doorOpen = Math.sin(prog(t, 37.4, 38.6) * Math.PI);
  return `${landing(t, { called: t > 39.5 && t < 41.2, lift: t > 41.2 ? false : true })}
    ${doorOpen > 0 ? `<rect x="80" y="560" width="${170 * (1 - .8 * doorOpen)}" height="340" fill="#3a2a22" stroke="#4a3a40" stroke-width="6"/>` : ''}
    ${t < 41.22 ? xMark(420, 720, 1.6, prog(t, 40.18, 40.5)) : ''}${t < 41.22 ? tagErr(420, 470, 1, 'FALSCH', prog(t, 40.18, 40.4)) : ''}
    ${andrej(x, y, 1, { walk, dir, look: t > 39.4 && t < 41.2 ? -6 : 0, ...opt })}
    ${t > 45.5 ? safeRing(t, 760, 1000, 170, prog(t, 45.6, 46.0)) : ''}${tagOk(760, 780, 1, 'SICHER', prog(t, 46.5, 46.8))}`;
}
// ---- 11  48.18–54.9  a drone part on the steps — may still hold explosive or a battery that can catch fire
function stairsClose(t) {
  let s = '';
  for (let i = 0; i < 8; i++) s += `<rect x="${-40 + i * 150}" y="${560 + i * 100}" width="${1200 - i * 150}" height="100" fill="${i % 2 ? '#1a2030' : '#20283a'}"/><rect x="${-40 + i * 150}" y="${560 + i * 100}" width="${1200}" height="8" fill="#2c3448"/>`;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#07090f"/><rect x="-40" y="200" width="1160" height="400" fill="#121826"/>${s}
    <path d="M -40 480 L 1120 1300" stroke="#3a4256" stroke-width="10"/>`;
}
function part(t, x, y, s, o = {}) {
  const hot = o.hot || 0;
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -110 0 L -20 -60 L 90 -40 L 60 0 Z" fill="#6a7284" stroke="#9aa4bb" stroke-width="4"/><path d="M -20 -60 L 10 -20" stroke="#3a4256" stroke-width="4"/>
    <rect x="70" y="-46" width="70" height="44" rx="6" fill="#2a3142" stroke="#9aa4bb" stroke-width="4"/><rect x="80" y="-40" width="20" height="32" fill="${hot > 0 ? '#ff9a3c' : '#4a5266'}"/>
    ${hot > 0 ? `<circle cx="105" cy="-30" r="${50 * hot}" fill="#ff7a2a" opacity="${.5 * hot}" filter="url(#blur20)"/><path d="M 100 -50 q -14 -30 4 -56 q 6 22 16 18 q 10 22 -6 38 Z" fill="#ffb03a" opacity="${hot * (.7 + .3 * Math.sin(t * 20))}"/>` : ''}
    <path d="M -80 0 L -130 10 M 40 0 L 70 16" stroke="#9aa4bb" stroke-width="4"/></g>`;
}
function s11(t) {
  const walk = prog(t, 48.2, 49.1);
  const ax = lerp(60, 260, eout(walk)), ay = 560 + (ax + 40) / 150 * 100;
  const hz = prog(t, 50.5, 50.9);
  const pulse = t > 51.4 && t < 52.2 ? .2 * Math.sin((t - 51.4) * 20) : 0;
  return `${stairsClose(t)}${hatchEll('h11', 640, 1000, 290 * (1 + pulse), 70, hz)}
    ${part(t, 640, 990, 1.2, { hot: prog(t, 53.4, 53.9) })}
    ${andrej(ax, ay, 1.3, { walk: walk < 1 ? t * 9 : null, armF: t > 49.2 ? -80 : undefined, look: 14 })}
    ${t > 52.5 ? `<g transform="translate(840 700) scale(${back(prog(t, 52.5, 52.8))})"><rect x="-50" y="-80" width="100" height="160" rx="12" fill="#1a2234" stroke="${D.line}" stroke-width="5"/><rect x="-22" y="-96" width="44" height="16" rx="4" fill="${D.line}"/><rect x="-34" y="${-64 + 120 * (1 - prog(t, 53.4, 53.9))}" width="68" height="${128 * prog(t, 53.4, 53.9) + 8}" fill="#ff7a2a"/><path d="M 8 -40 L -14 4 L 6 4 L -6 46" stroke="#fff" stroke-width="7" fill="none" stroke-linejoin="round"/></g>` : ''}`;
}
// ---- 12  54.9–59.0  don't touch, don't pick up, don't go close for photos
function s12(t) {
  const reach = eout(prog(t, 54.95, 55.3));
  const pick = Math.sin(prog(t, 55.9, 56.5) * Math.PI);
  const cam = eout(prog(t, 56.7, 57.5));
  const vf = t > 57.3;
  return `${stairsClose(t)}${hatchEll('h12', 600, 1000, 300, 70, 1)}${part(t, 600, 990, 1.5, {})}
    <g transform="translate(${lerp(1200, 820, reach) - (t > 55.3 && t < 55.9 ? 0 : 0)} ${lerp(700, 820, reach) - 80 * pick})"><rect x="0" y="-26" width="420" height="56" rx="26" fill="${D.jacket}"/><ellipse cx="0" cy="0" rx="46" ry="34" fill="${D.skin}"/><rect x="-64" y="-8" width="40" height="18" rx="9" fill="${D.skin}"/></g>
    ${cam > 0 ? `<g transform="translate(${lerp(1200, 820, cam)} ${lerp(300, 520, cam)}) rotate(-20)"><rect x="-60" y="-110" width="120" height="220" rx="16" fill="#0b0d12" stroke="#3a4256" stroke-width="5"/><rect x="-48" y="-96" width="96" height="192" fill="${D.screen}" opacity=".85"/><circle r="150" fill="${D.screen}" opacity=".2" filter="url(#blur40)"/></g>` : ''}
    ${vf ? corners(420, 860, 360, 260, 40, '#fff', 4) : ''}
    ${xMark(300, 520, 1.1, prog(t, 55.1, 55.4))}${xMark(540, 520, 1.1, prog(t, 56.18, 56.45))}${xMark(780, 520, 1.1, prog(t, 57.9, 58.2))}`;
}
// ---- 13  59.0–62.26  keep distance, report via 112
function s13(t) {
  const back_ = prog(t, 59.0, 59.9);
  const ax = lerp(300, 120, eout(back_)), ay = 560 + (ax + 40) / 150 * 100;
  const ph = prog(t, 60.2, 60.5);
  return `${stairsClose(t)}${hatchEll('h13', 640, 1000, 290, 70, 1)}${part(t, 640, 990, 1.2, {})}
    ${andrej(ax, ay, 1.3, { dir: 1, phone: ph > 0 ? ph : 0, walk: back_ > 0 && back_ < 1 ? -t * 9 : null })}
    ${yArrow([[360, 880], [140, 740]], prog(t, 59.1, 59.6))}
    ${ph > 0 ? `<g transform="translate(830 420) scale(${back(prog(t, 61.3, 61.6))})"><rect x="-90" y="-50" width="180" height="100" rx="50" fill="${D.ok}"/>${txt(0, 20, 56, '112', '#062814')}</g>` : ''}`;
}
// ---- 14  62.26–68.08  outside: get away from the damaged building, don't stand at the entrance
function s14(t) {
  const P = { x: 140, y: 300, w: 520, h: 520 };
  const move = eio(prog(t, 63.4, 64.9));
  const px = lerp(400, 880, move), py = lerp(880, 1200, move);
  const grp = prog(t, 66.2, 66.6);
  const crowd = [[330, 900], [380, 920], [430, 900], [470, 930]];
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.bg2}"/>
    ${[...Array(9)].map((_, i) => `<circle cx="${120 + (i * 151) % 980}" cy="${1100 + (i % 3) * 80 + (i > 5 ? -700 : 0)}" r="${46 + 20 * hash(i)}" fill="#0c1018" opacity=".7"/>`).join('')}
    <rect x="${P.x}" y="${P.y}" width="${P.w}" height="${P.h}" fill="#1a2030"/>${hatchRect('h14', P.x, P.y, P.w, P.h, 1)}
    <path d="M ${P.x + 160} ${P.y} L ${P.x + 220} ${P.y + 160} L ${P.x + 180} ${P.y + 260} L ${P.x + 260} ${P.y + 380}" stroke="#05070c" stroke-width="10" fill="none"/>
    ${planRoom(P.x, P.y, P.w, P.h, { doors: [[P.x + 200, P.y + P.h - 4, 120, 10]] })}
    <line x1="-40" y1="1330" x2="1120" y2="1330" stroke="#3a4256" stroke-width="5" stroke-dasharray="40 30"/>
    ${hatchEll('h14b', 400, 915, 140, 60, grp)}
    ${grp > 0 ? crowd.map(([x, y]) => dotP(t, x, y)).join('') : ''}${xMark(400, 915, 1, prog(t, 66.9, 67.2))}
    ${safeRing(t, 880, 1200, 110, prog(t, 64.6, 65.0))}
    ${yArrow([[400, 880], [600, 1000], [880, 1200]], prog(t, 63.3, 64.6))}${dotP(t, px, py, { main: 1 })}
    ${corners(60, 220, 960, 1080, 60)}
    ${tagWhite(800, 420, 1, 'DRAUSSEN', prog(t, 62.3, 62.6))}`;
}
// ---- 15  68.08–73.02  Andrej breathes out… then hears the hum again above him
function s15(t) {
  const sigh = Math.sin(prog(t, 68.4, 69.4) * Math.PI);
  const look = t > 70.1 ? lerp(0, -32, eout(prog(t, 70.1, 70.5))) : 6 * sigh;
  const rd = prog(t, 70.7, 71.2);
  let breath = '';
  if (t > 68.5 && t < 69.8) { const p = prog(t, 68.5, 69.8); breath = `<circle cx="${590 + 60 * p}" cy="${830 - 20 * p}" r="${10 + 30 * p}" fill="#e9f0ff" opacity="${.35 * (1 - p)}"/>`; }
  return `${cityBg(t, { gy: 1150, road: 1 })}${streetLamp(760, 1150, 420)}
    ${andrej(540, 1150, 1.15, { look, armF: 4 + 8 * sigh, armB: -4 - 8 * sigh })}${breath}
    ${rd > 0 ? `<g opacity="${rd}">${radar(t, 560, 330, 1.1)}</g>` : ''}
    ${t > 72.3 ? `<rect x="-40" y="-40" width="1160" height="2000" fill="#000" opacity="${.6 * prog(t, 72.3, 73.0)}"/>` : ''}`;
}
const SCENES = [[0, 6.23, s1, 1], [6.23, 13.27, s2, 1.3, 860], [13.27, 17.24, s3, 1.25, 860], [17.24, 25.30, s4, 1], [25.30, 29.84, s7, 1], [29.84, 33.91, s8, 1.2, 900], [33.91, 37.3, s9, 1.2, 900], [37.3, 48.18, s10, 1.15, 800], [48.18, 54.9, s11, 1], [54.9, 59.0, s12, 1], [59.0, 62.26, s13, 1], [62.26, 68.08, s14, 1], [68.08, 999, s15, 1.15, 1000]];
function scene(t) { let r = SCENES[SCENES.length - 1]; for (const x of SCENES) if (t >= x[0] && t < x[1]) { r = x; break; } const z = r[3] || 1, cy = r[4] || 800; if (r[2] === s1 && t >= 3.6) return darkDefs() + `<g transform="translate(540 860) scale(1.3) translate(-540 -860)">${s1(t)}</g>` + vignetteDark(); return darkDefs() + (z !== 1 ? `<g transform="translate(540 ${cy}) scale(${z}) translate(-540 ${-cy})">${r[2](t)}</g>` : r[2](t)) + vignetteDark(); }

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
