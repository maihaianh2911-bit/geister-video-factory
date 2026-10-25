// @ts-nocheck
// AUTO-GENERATED scene for v11. Change it by commenting on the issue.
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
  if (p <= 0) return ''; const w = (label.length + 3) * 27 + 54;
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${1.35 * s * back(p)})"><rect x="${-w / 2 + 6}" y="-34" width="${w}" height="74" fill="#000" opacity=".35"/><rect x="${-w / 2}" y="-40" width="${w}" height="74" fill="${D.paper}"/>
    <text x="${-w / 2 + 26}" y="12" style="${FT};font-size:42px" fill="${D.red}">${num}.<tspan fill="#1a1d26" dx="12">${label}</tspan></text></g>`;
}
function tagOk(x, y, s, label, p) {
  if (p <= 0) return ''; const w = label.length * 27 + 60;
  return `<g transform="translate(${x} ${y}) scale(${1.35 * s * back(p)})"><rect x="${-w / 2}" y="-30" width="${w}" height="60" rx="14" fill="${D.ok}"/>${txt(0, 13, 36, label, '#062814')}</g>`;
}
function tagWhite(x, y, s, label, p) {
  if (p <= 0) return ''; const w = label.length * 25 + 56;
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

// ===== v11: "Drohne hinter dem Auto" — cinematic dark style (owner's reference) =====
function pines(off, gy, seed, col = '#06080c', h0 = 180) {
  let s = '';
  for (let i = -2; i < 22; i++) { const x = ((i * 70 - off) % 1540 + 1540) % 1540 - 230, h = h0 + 120 * hash(i + seed); s += `<polygon points="${x},${gy} ${x + 34},${gy - h} ${x + 68},${gy}" fill="${col}"/>`; }
  return s;
}
function highway(t, o = {}) { // side view: night road; o.speed scroll px/s; o.dawn
  const gy = 1120, sp = o.speed ?? 600, off = (o.off ?? t * sp);
  const dawn = o.dawn || 0;
  let dash = ''; for (let i = -1; i < 12; i++) { const x = ((i * 160 - off * 1.0) % 1760 + 1760) % 1760 - 160; dash += `<rect x="${x}" y="${gy + 120}" width="90" height="8" fill="#3a4256"/>`; }
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.bg}"/>
    <rect x="-40" y="-40" width="1160" height="${gy}" fill="#0d1220"/>
    ${dawn > 0 ? `<rect x="-40" y="${gy - 700}" width="1160" height="700" fill="url(#gDawn)" opacity="${dawn}"/>` : ''}
    ${o.city ? `<g opacity=".7">${winGrid(-40, gy - 330, 1160, 280, 5, { fill: .25, lit: .15, dx: 30, dy: 36, ww: 6, wh: 8 })}</g>` : ''}
    ${pines(off * .25, gy - 40, 3, '#0a0d16', 140)}${pines(off * .6, gy, 9, dawn > 0 ? '#05070b' : '#06080c', 220)}
    <rect x="-40" y="${gy}" width="1160" height="40" fill="#10141c"/><rect x="-40" y="${gy + 40}" width="1160" height="200" fill="${D.road}"/>${dash}
    <rect x="-40" y="${gy + 240}" width="1160" height="800" fill="#07090e"/>`;
}
function car2(x, y, s, o = {}) { // sedan side view, origin ground centre, facing right, headlight cone
  const burn = o.burn || 0, wreck = o.wreck || 0;
  const body = wreck ? '#1a1c22' : '#5a6a88';
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${o.lights && !wreck ? `<polygon points="226,-70 760,-170 760,40" fill="#fff3c4" opacity=".14"/><ellipse cx="420" cy="0" rx="260" ry="30" fill="#fff3c4" opacity=".08"/>` : ''}
    <ellipse cx="0" cy="4" rx="230" ry="14" fill="#000" opacity=".5"/>
    <path d="M -220 -40 Q -224 -86 -180 -92 L -120 -98 L -70 -150 Q -50 -164 -10 -164 L 80 -164 Q 110 -164 130 -140 L 170 -100 L 214 -90 Q 236 -84 232 -40 L 228 -20 L -216 -20 Z" fill="${body}"/>
    <path d="M -60 -144 L -10 -154 L 40 -154 L 40 -104 L -100 -104 Z" fill="#0d1220"/><path d="M 52 -154 L 84 -154 Q 106 -152 120 -136 L 148 -104 L 52 -104 Z" fill="#0d1220"/>
    ${o.driver ? `<circle cx="20" cy="-128" r="16" fill="${D.skin}"/><path d="M 4 -132 Q 6 -150 22 -148 Q 36 -146 34 -134 Z" fill="${D.hair}"/>` : ''}
    ${o.door ? `<path d="M -10 -104 L 60 -104 L 60 -30 L -10 -30 Z" fill="#0d1220"/><path d="M 60 -104 L ${60 + 70 * o.door} -${110 + 10 * o.door} L ${60 + 70 * o.door} -24 L 60 -30 Z" fill="${body}" stroke="#2a3346" stroke-width="3"/>` : ''}
    ${[-140, 150].map(cx => `<circle cx="${cx}" cy="-20" r="40" fill="#0a0c12"/><circle cx="${cx}" cy="-20" r="18" fill="${wreck ? '#22252c' : '#4a5266'}" transform="rotate(${(o.spin || 0)} ${cx} -20)"/><rect x="${cx - 3}" y="-36" width="6" height="12" fill="#2a3142" transform="rotate(${(o.spin || 0)} ${cx} -20)"/>`).join('')}
    <rect x="216" y="-80" width="16" height="14" rx="4" fill="${o.lights && !wreck ? '#fff3c4' : '#555'}"/><rect x="-222" y="-78" width="12" height="14" rx="3" fill="${D.red}" opacity="${o.brake ? 1 : .5}"/>${o.brake ? `<circle cx="-216" cy="-71" r="40" fill="${D.red}" opacity=".35" filter="url(#blur20)"/>` : ''}
    ${burn > 0 ? fire(o.t || 0, 0, -120, burn) : ''}${wreck ? smoke(o.t || 0, 0, -160) : ''}</g>`;
}
function fire(t, x, y, s) {
  let f = '';
  for (let i = 0; i < 6; i++) { const h = (90 + 40 * Math.sin(t * 9 + i * 2)) * s; f += `<path d="M ${x - 150 + i * 60} ${y + 60} Q ${x - 170 + i * 60} ${y + 60 - h * .5} ${x - 150 + i * 60 + 10 * Math.sin(t * 7 + i)} ${y + 60 - h} Q ${x - 120 + i * 60} ${y + 60 - h * .5} ${x - 110 + i * 60} ${y + 60} Z" fill="${['#ff9a3c', '#ffd27a', '#ff6a2a'][i % 3]}" opacity=".9"/>`; }
  return `<circle cx="${x}" cy="${y}" r="${220 * s}" fill="#ff7a2a" opacity="${.35 * s}" filter="url(#blur40)"/>${f}`;
}
function smoke(t, x, y) { let s = ''; for (let i = 0; i < 6; i++) { const p = ((t * .25 + i / 6) % 1); s += `<circle cx="${x + 30 * Math.sin(i * 2 + t) + 80 * p}" cy="${y - 400 * p}" r="${30 + 70 * p}" fill="#3a3f4c" opacity="${.5 * (1 - p)}"/>`; } return s; }
function redDot(t, x, y, s = 1) { const b = Math.floor(t * 3) % 2 ? .35 : 1; return `<circle cx="${x}" cy="${y}" r="${30 * s}" fill="${D.red}" opacity="${.35 * b}" filter="url(#blur8)"/><circle cx="${x}" cy="${y}" r="${8 * s}" fill="${D.red}" opacity="${b}"/><path d="M ${x - 26 * s} ${y - 6 * s} H ${x + 26 * s}" stroke="#2a2f3c" stroke-width="${4 * s}"/>`; }
function speedo(t, v) { // v km/h
  let tk = '';
  for (let k = 0; k <= 10; k++) { const a = (-220 + k * 26) * Math.PI / 180; tk += `<line x1="${Math.cos(a) * 300}" y1="${Math.sin(a) * 300}" x2="${Math.cos(a) * 340}" y2="${Math.sin(a) * 340}" stroke="${k >= 7 ? D.red : '#c9d2e6'}" stroke-width="8"/>${txt(Math.cos(a) * 250, Math.sin(a) * 250 + 14, 40, String(k * 20), k >= 7 ? D.red : '#c9d2e6')}`; }
  const a = (-220 + v / 20 * 26) * Math.PI / 180;
  return `<g transform="translate(540 760)"><circle r="400" fill="#0b0e15" stroke="#232b3d" stroke-width="16"/>
    <path d="M ${Math.cos(-38 * Math.PI / 180) * 360} ${Math.sin(-38 * Math.PI / 180) * 360} A 360 360 0 0 1 ${Math.cos(40 * Math.PI / 180) * 360} ${Math.sin(40 * Math.PI / 180) * 360}" stroke="${D.red}" stroke-width="18" fill="none"/>${tk}
    <line x1="0" y1="0" x2="${Math.cos(a) * 320}" y2="${Math.sin(a) * 320}" stroke="#ff9a3c" stroke-width="12" stroke-linecap="round"/><circle r="30" fill="#232b3d"/>
    ${txt(0, 200, 130, String(Math.round(v)), '#fff')}${txt(0, 250, 34, 'km/h', '#9aa4bb')}</g>`;
}
function roadTop(t, o = {}) { // top-down road map, road vertical in the middle
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.bg2}"/>
    <rect x="420" y="-40" width="240" height="2000" fill="#1a2030"/><line x1="420" y1="-40" x2="420" y2="1960" stroke="${D.line}" stroke-width="4"/><line x1="660" y1="-40" x2="660" y2="1960" stroke="${D.line}" stroke-width="4"/>
    <line x1="540" y1="-40" x2="540" y2="1960" stroke="#5d6578" stroke-width="5" stroke-dasharray="40 30" stroke-dashoffset="${-(o.scroll || 0)}"/>${o.extra || ''}`;
}
function carTop(x, y, s, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">${o.lights !== false ? `<polygon points="-24,-80 24,-80 90,-380 -90,-380" fill="#fff3c4" opacity=".16"/>` : ''}
    <rect x="-40" y="-80" width="80" height="160" rx="24" fill="#5a6a88" stroke="#c9d2e6" stroke-width="3"/><rect x="-30" y="-46" width="60" height="34" rx="6" fill="#0d1220"/><rect x="-30" y="30" width="60" height="26" rx="6" fill="#0d1220"/></g>`;
}
function quad(t, x, y, s) { // small FPV quad from above
  const r = t * 40;
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke="#8a93a6" stroke-width="10"/>${[[-40, -40], [40, -40], [-40, 40], [40, 40]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="24" fill="none" stroke="#c9d2e6" stroke-width="4" stroke-dasharray="20 10" transform="rotate(${r} ${a} ${b})"/>`).join('')}<rect x="-16" y="-16" width="32" height="32" rx="6" fill="#5d6578"/><circle cx="0" cy="-6" r="6" fill="${D.red}" opacity="${Math.floor(t * 4) % 2 ? .4 : 1}"/></g>`;
}
// ---- 1–2  0–6.7  a drone behind your car — no panic; a few seconds, if you make no mistake
function s1(t) {
  const dx = lerp(-80, 170, eout(prog(t, .9, 2.0)));
  const tm = t > 4.3 ? Math.max(0, 3 - Math.floor(t - 4.3)) : 3;
  return `${highway(t, { speed: 700 })}${car2(580, 1180, 1.05, { lights: 1, driver: 1, spin: t * 900 })}
    ${t > .9 ? redDot(t, dx, 900 + 20 * Math.sin(t * 2), 1.3) : ''}
    ${tagErr(540, 260, 1, `00:0${tm}`, prog(t, 4.3, 4.6))}`;
}
// ---- 3  6.7–11.58  red dot in the mirror — he hits the gas, like almost everyone
function mirror(t, dot) {
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#05070c"/><rect x="-40" y="900" width="1160" height="1000" fill="#0b0e15"/>
    <rect x="160" y="440" width="760" height="260" rx="80" fill="#10141e" stroke="#2a3346" stroke-width="16"/>
    <clipPath id="mi2"><rect x="174" y="454" width="732" height="232" rx="70"/></clipPath>
    <g clip-path="url(#mi2)"><rect x="160" y="440" width="760" height="260" fill="#0c1220"/>${pines(t * 80, 640, 4, '#06080c', 120)}
      <path d="M 160 690 L 540 600 L 920 690 Z" fill="#141a26"/><path d="M 540 600 L 540 700" stroke="#3a4256" stroke-width="4" stroke-dasharray="14 12" stroke-dashoffset="${-t * 80}"/>
      ${dot > 0 ? redDot(t, 600 + 20 * Math.sin(t * 2), 540, 1.1) : ''}</g><rect x="510" y="320" width="60" height="120" fill="#10141e"/>`;
}
function s3(t) {
  if (t < 9.6) return mirror(t, prog(t, 7.9, 8.2));
  const acc = eio(prog(t, 9.7, 10.6));
  const lines = [...Array(8)].map((_, i) => `<line x1="${(i * 140 + t * 2600) % 1200 - 100}" y1="${700 + i * 50}" x2="${(i * 140 + t * 2600) % 1200 + 60}" y2="${700 + i * 50}" stroke="#c9d2e6" stroke-width="3" opacity="${.4 * acc}"/>`).join('');
  return `${highway(t, { off: t * lerp(700, 2000, acc) })}${lines}${car2(580 + 60 * acc, 1180, 1.05, { lights: 1, driver: 1, spin: t * 2000 })}${redDot(t, 170 + 30 * Math.sin(t * 3), 900, 1.3)}`;
}
// ---- 4–5  11.58–17.22  100… 120… the dot stays on — mistake no. 1
function s4(t) {
  if (t < 13.36) { const v = t < 12.66 ? lerp(80, 100, eout(prog(t, 11.58, 12.0))) : lerp(100, 120, eout(prog(t, 12.66, 13.1))); return `<rect x="-40" y="-40" width="1160" height="2000" fill="#06080c"/>${speedo(t, v + 1.5 * Math.sin(t * 20))}`; }
  return `${highway(t, { off: t * 2200 })}${car2(620, 1180, 1.05, { lights: 1, driver: 1, spin: t * 2400 })}${redDot(t, 260 + 40 * Math.sin(t * 2.4), 880, 1.3)}
    ${yArrow([[120, 820], [300, 860]], prog(t, 14.2, 14.6), D.red)}
    ${tagErr(540, 260, 1, 'FEHLER Nr. 1', prog(t, 15.82, 16.1))}`;
}
// ---- 6–7  17.22–25.48  drone flies >100 km/h; lit car on an empty road is the easiest target; it starts its attack
function s6(t) {
  if (t < 20.2) {
    const fast = prog(t, 18.2, 19.5);
    return `${highway(t, { off: t * 2000 })}${car2(lerp(620, 520, fast), 1180, 1.05, { lights: 1, driver: 1, spin: t * 2400 })}${redDot(t, lerp(260, 380, fast), 880, 1.3)}
      ${tagWhite(540, 300, 1.2, '100+ km/h', prog(t, 18.3, 18.6))}`;
  }
  const lock = prog(t, 23.94, 24.6);
  const hud = `${corners(80, 200, 920, 1120, 70)}<circle cx="140" cy="250" r="12" fill="${D.red}" opacity="${Math.floor(t * 2) % 2 ? .3 : 1}"/>${txt(170, 262, 34, 'REC', '#fff', { anchor: 'start' })}${txt(950, 262, 32, `${118 + Math.round(4 * Math.sin(t * 3))} km/h`, '#fff', { anchor: 'end' })}`;
  const cx = 540, cy = lerp(760, 820, lock);
  const box = lerp(300, 150, eio(lock));
  return `${roadTop(t, { scroll: t * 900 })}${carTop(570, 820 + 4 * Math.sin(t * 8), 1.1)}
    <rect x="-40" y="-40" width="1160" height="2000" fill="#7aa0c8" opacity=".05"/>${hud}
    ${corners(cx - box / 2 + 30, cy - box / 2, box, box, 30, lock > .9 && Math.floor(t * 6) % 2 ? D.red : '#fff', 4)}<path d="M ${cx + 30 - 14} ${cy} H ${cx + 30 + 14} M ${cx + 30} ${cy - 14} V ${cy + 14}" stroke="#fff" stroke-width="3"/>
    ${tagWhite(540, 360, 1, 'DROHNEN-KAMERA', prog(t, 20.2, 20.5) * (1 - prog(t, 20.8, 21.0)))}
    ${tagStep(830, 1000, .8, '!', 'SCHEINWERFER', prog(t, 20.92, 21.2), 3).replace('!.', '!')}${tagStep(260, 640, .8, '!', 'LEERE STRASSE', prog(t, 21.4, 21.7), -3).replace('!.', '!')}`;
}
// ---- 8–11  25.48–40.04  the plan: 1 don't speed · 2 brake at cover · 3 out, away, into the ditch
function s8(t) {
  const P1 = t >= 27.5 && t < 30.44, P2 = t >= 30.44 && t < 35.94, P3 = t >= 35.94;
  let carY = 1200, dY = 1450;
  if (P1) { const p = prog(t, 28.0, 30.2); carY = lerp(1200, 500, eio(p)); dY = lerp(1450, carY + 160, eio(prog(t, 28.0, 30.0))); }
  if (P2 || P3) { carY = lerp(1200, 760, eio(prog(t, 31.6, 32.4))); dY = 1450 - 300 * prog(t, 30.5, 35.9); }
  const covers = `${safeRing(t, 300, 700, 90, prog(t, 32.7, 33.0))}<circle cx="300" cy="700" r="60" fill="#14301f"/><circle cx="270" cy="680" r="40" fill="#1a3a26"/>
    ${tagOk(300, 820, .8, 'BÄUME', prog(t, 32.76, 33.0))}
    <rect x="760" y="420" width="190" height="170" fill="#1a2030" stroke="${D.line}" stroke-width="4"/>${safeRing(t, 855, 505, 130, prog(t, 33.2, 33.5))}${tagOk(855, 650, .8, 'GEBÄUDE', prog(t, 33.24, 33.5))}
    <rect x="700" y="900" width="30" height="220" fill="#5d6578" stroke="${D.line}" stroke-width="3"/>${safeRing(t, 715, 1010, 110, prog(t, 33.7, 34.0))}${tagOk(860, 1010, .8, 'MAUER', prog(t, 33.76, 34.0))}`;
  const openZ = P2 ? hatchRect('h8z', 420, 1100, 240, 300, prog(t, 34.5, 34.9)) : '';
  const out = P3 ? eio(prog(t, 36.5, 38.1)) : 0;
  return `${roadTop(t, { scroll: P1 ? t * 600 : 0, extra: (P2 || P3) ? covers : '' })}${openZ}
    ${P3 ? `<rect x="50" y="560" width="110" height="400" rx="20" fill="#0c1018" stroke="${D.ok}" stroke-width="4" stroke-dasharray="14 10"/>${tagOk(110, 520, .8, 'GRABEN', prog(t, 38.0, 38.3))}` : ''}
    ${carTop(570, carY, 1.1, { lights: !P3 })}
    ${P3 ? `${hatchEll('h8c', 570, carY, 150, 150, prog(t, 37.3, 37.7))}${yArrow([[510, carY], [380, carY - 20], [105, 760]], prog(t, 36.6, 37.9))}${dotP(t, lerp(510, 105, out), lerp(carY, 760, out), { main: 1 })}` : ''}
    ${quad(t, 570, dY, .6)}${tagErr(640, dY + 70, .55, 'DROHNE', 1)}
    ${P1 ? redDash([[570, 1450], [570, carY + 100]], prog(t, 29.0, 29.6)) : ''}${P1 ? xMark(700, 800, 1, prog(t, 29.9, 30.2)) : ''}
    ${tagStep(540, 160, .9, 1, 'NICHT RASEN', P1 ? prog(t, 27.5, 27.8) : 0)}${tagStep(540, 160, .9, 2, 'DECKUNG BREMSEN', P2 ? prog(t, 30.44, 30.74) : 0)}${tagStep(540, 160, .9, 3, 'RAUS UND WEG', P3 ? prog(t, 35.94, 36.24) : 0)}
    ${!P1 && !P2 && !P3 ? tagStep(540, 160, 1, '·', 'PLAN', prog(t, 25.5, 25.8)).replace('·.', '·') : ''}`;
}
// ---- 12–13  40.04–45.44  brakes at the forest edge, door open, jumps into the ditch — explosion
function ditchSide(t, o = {}) {
  return `${highway(t, { speed: 0, off: o.off ?? 0, dawn: o.dawn || 0 })}
    <path d="M -40 1160 L 120 1160 L 200 1300 L 420 1300 L 500 1160 L 1120 1160" fill="none"/>
    <path d="M 60 1160 L 140 1290 L 380 1290 L 460 1160 Z" fill="#05070b"/>`;
}
function s12(t) {
  const brk = prog(t, 40.5, 41.4);
  const off = 40.04 * 700 + (t - 40.04) * 700 * (1 - eio(brk)) * (t < 41.4 ? 1 : 0) + (t >= 41.4 ? (41.4 - 40.04) * 350 : 0);
  const door = eout(prog(t, 41.8, 42.2));
  const run = prog(t, 42.3, 43.0), jump = prog(t, 43.0, 43.5);
  const ax = lerp(640, 300, eio(run)), ay = 1160 + (jump > 0 ? 120 * ein(jump) - 60 * Math.sin(jump * Math.PI) : 0);
  const [bl, sx, sy] = blast(t, 44.52, 700, 1000, 1);
  const boom = t > 44.52;
  return `<g transform="translate(${sx} ${sy})">${highway(t, { off: Math.min(off, 40.04 * 700 + 900), speed: 0 })}
    <path d="M 120 1160 L 180 1290 L 400 1290 L 460 1160 Z" fill="#05070b"/>
    ${car2(700, 1180, 1.05, { lights: !boom, brake: brk > 0 && brk < 1, driver: door === 0, door, spin: (1 - brk) * t * 900, burn: boom ? prog(t, 44.6, 45.0) : 0, t })}
    ${t > 42.3 && jump < 1 ? andrej(ax, ay, .95, { dir: -1, walk: t * 14 }) : ''}
    ${t > 43.5 ? `<g opacity=".9">${andrej(290, 1290, .9, { lie: 1, dir: -1 })}</g>` : ''}${bl}${flash(t, 44.52)}
    ${redDot(t, lerp(300, 640, prog(t, 41.0, 44.4)), lerp(820, 1000, ein(prog(t, 43.6, 44.5))), 1.2)}</g>`;
}
// ---- 14–15  45.44–53.18  face down, arms over head, mouth slightly open; never go back to the car
function trench(t, o = {}) {
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#07090e"/><rect x="-40" y="-40" width="1160" height="760" fill="#0d1220"/>
    ${pines(0, 720, 21, '#06080c', 200)}<rect x="-40" y="720" width="1160" height="40" fill="#10141c"/>
    <path d="M 100 760 L 260 1100 L 820 1100 L 980 760 Z" fill="#0a0d14" stroke="#2a3346" stroke-width="5" stroke-dasharray="14 10"/>
    ${o.burn ? `<g transform="translate(900 740) scale(.6)">${car2(0, 0, 1, { burn: 1, t })}</g>` : ''}`;
}
function proneHead(t, x, y, s, o = {}) { // lying face down, arms around head (side)
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="4" rx="230" ry="12" fill="#000" opacity=".4"/>
    <rect x="-220" y="-36" width="180" height="32" rx="14" fill="${D.pants}"/><rect x="-50" y="-56" width="170" height="54" rx="24" fill="${D.jacket}"/>
    <circle cx="150" cy="-30" r="30" fill="${D.skin}"/><path d="M 124 -46 Q 146 -66 176 -48 Q 168 -30 140 -18 Z" fill="${D.hair}"/>
    <path d="M 80 -54 Q 140 -${80 + (o.armUp || 0) * 10} 186 -40" stroke="${D.jacketSh}" stroke-width="22" fill="none" stroke-linecap="round"/>
    ${o.mouth ? `<ellipse cx="172" cy="-14" rx="6" ry="${4 + 3 * o.mouth}" fill="#3a1a1a"/>` : ''}${o.lift ? '' : ''}</g>`;
}
function s14(t) {
  const back_ = t >= 50.5;
  return `${trench(t, { burn: 1 })}${proneHead(t, 520, 1095, 1.2, { mouth: prog(t, 48.2, 48.6) })}
    ${t > 45.6 && t < 46.6 ? `${yArrow([[860, 820], [860, 960]], prog(t, 45.6, 45.9))}` : ''}
    ${!back_ ? `${tagStep(540, 200, .9, 1, 'GESICHT NACH UNTEN', prog(t, 45.44, 45.74))}${tagStep(540, 310, .9, 2, 'HÄNDE AUF DEN KOPF', prog(t, 46.62, 46.92), 2)}${tagStep(540, 420, .9, 3, 'MUND AUF', prog(t, 48.22, 48.52), -2)}` : ''}
    ${back_ ? `${redDash([[620, 1060], [760, 860], [900, 760]], prog(t, 51.2, 51.8))}${xMark(760, 880, 1.2, prog(t, 51.8, 52.1))}${tagErr(540, 260, 1, 'NICHT ZUM AUTO', prog(t, 50.5, 50.8))}` : ''}`;
}
// ---- 16–17  53.18–61.6  he lifts his head — a second red dot; a second drone often comes for those who go back
function s16(t) {
  const lift = eout(prog(t, 53.6, 54.2));
  const dot2 = prog(t, 56.2, 56.6);
  const back2 = t > 58.18;
  return `${trench(t, { burn: 1 })}
    <g transform="translate(520 1095) scale(1.2) rotate(${-12 * lift} 150 -30)" >${proneHead(t, 0, 0, 1, {}).replace(/^<g transform="translate\(0 0\) scale\(1\)">/, '<g>')}</g>
    ${dot2 > 0 ? `${redDot(t, 700 + 30 * Math.sin(t * 1.5), 360 + 10 * Math.sin(t * 2.3), 1.6)}${radar(t, 700 + 30 * Math.sin(t * 1.5), 360, .9, { dot: false })}` : ''}
    ${tagErr(540, 200, 1, 'ZWEITE DROHNE', prog(t, 56.76, 57.05))}
    ${back2 ? `<g opacity="${prog(t, 59.8, 60.2)}">${andrej(lerp(600, 820, prog(t, 59.8, 61.0)), 760, .7, { walk: t * 9, dir: 1 })}</g>${redDash([[700, 380], [820, 700]], prog(t, 60.5, 61.0))}${xMark(820, 640, 1, prog(t, 60.9, 61.2))}` : ''}`;
}
// ---- 18  61.6–71.14  how to recognise it (FPV): high whine like a mosquito, fast abrupt turns, can hover, camera sees movement
function s18(t) {
  const row = (i, t0, label, icon) => { const p = prog(t, t0, t0 + .3); if (p <= 0) return ''; return `<g transform="translate(${lerp(-300, 0, eout(p))} 0)" opacity="${p}"><rect x="120" y="${660 + i * 160}" width="840" height="130" rx="26" fill="#f4f6fb"/><g transform="translate(210 ${725 + i * 160})">${icon}</g>${txt(290, 742 + i * 160, 48, label, '#10131c', { anchor: 'start' })}</g>`; };
  const zig = `<path d="M -40 20 L -10 -20 L 10 10 L 40 -26" stroke="#10131c" stroke-width="7" fill="none"/>`;
  const qx = 300 + (t > 65.8 ? 120 * Math.sin(Math.floor((t - 65.8) * 2.5) * 2.1) : 0), qy = 400 + (t > 65.8 && t < 67.3 ? 50 * Math.cos(Math.floor((t - 65.8) * 2.5) * 1.7) : 0);
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.bg2}"/>
    ${tagStep(540, 190, 1, '?', 'FPV ERKENNEN', prog(t, 61.6, 61.9)).replace('?.', '?')}
    <rect x="120" y="270" width="840" height="340" rx="26" fill="#0d1220" stroke="#2a3346" stroke-width="4"/>
    ${quad(t, qx, qy, 1)}<g transform="translate(780 440) rotate(-90)">${droneTop(t, 0, 0, .9)}</g>${xMark(780, 440, .9, prog(t, 65.0, 65.3))}
    ${row(0, 63.18, 'Surren statt Moped', `<path d="M -40 0 q 6 -24 12 0 t 12 0 t 12 0 t 12 0 t 12 0 t 12 0" stroke="#10131c" stroke-width="6" fill="none"/>`)}
    ${row(1, 65.82, 'schnell und abrupt', zig)}${row(2, 67.32, 'schwebt', `<path d="M -36 0 H 36" stroke="#10131c" stroke-width="7"/><circle cx="0" cy="-16" r="12" fill="#10131c"/>`)}
    ${row(3, 68.76, 'Kamera', `<rect x="-34" y="-22" width="52" height="44" rx="8" fill="#10131c"/><path d="M 18 -10 L 40 -22 V 22 L 18 10 Z" fill="#10131c"/>`)}`;
}
// ---- 19  71.14–74.28  nets over the road? brake underneath
function s19(t) {
  const stop = eio(prog(t, 72.4, 73.4));
  const cx = lerp(-200, 560, stop);
  let net = '';
  for (let i = 0; i < 18; i++) net += `<line x1="${100 + i * 50}" y1="560" x2="${100 + i * 50 + 60}" y2="720" stroke="#9aa4bb" stroke-width="3" opacity=".7"/><line x1="${100 + i * 50 + 60}" y1="560" x2="${100 + i * 50}" y2="720" stroke="#9aa4bb" stroke-width="3" opacity=".7"/>`;
  return `${highway(t, { off: 71.14 * 300 + (t - 71.14) * 300 * (1 - stop) })}
    <rect x="90" y="540" width="16" height="620" fill="#2a3142"/><rect x="980" y="540" width="16" height="620" fill="#2a3142"/>
    <clipPath id="net"><rect x="100" y="560" width="890" height="160"/></clipPath><g clip-path="url(#net)">${net}</g><path d="M 100 560 H 990 M 100 720 H 990" stroke="#9aa4bb" stroke-width="5"/>
    ${car2(cx, 1180, 1.05, { lights: 1, driver: 1, brake: stop > 0 && stop < 1, spin: t * 600 * (1 - stop) })}
    ${safeRing(t, 560, 1060, 260, prog(t, 73.4, 73.8))}
    ${tagStep(540, 300, 1, '!', 'NETZE', prog(t, 71.3, 71.6)).replace('!.', '!')}`;
}
// ---- 20–21  74.28–82.98  all clear, silence; climbs out — car gone, but alive; dawn checklist
function s20(t) {
  const dawn = prog(t, 75.9, 79.5);
  const climb = prog(t, 76.4, 77.4);
  const items = [['nicht gerast', 79.9], ['an Deckung gebremst', 80.6], ['weg und hingelegt', 81.2]];
  let ck = '';
  items.forEach(([l, t0], i) => { const p = prog(t, t0, t0 + .3); if (p > 0) ck += `<g transform="translate(540 ${300 + i * 110}) scale(${back(p)})"><rect x="-330" y="-40" width="660" height="80" rx="40" fill="${D.ok}"/><circle cx="-284" cy="0" r="24" fill="#fff"/><path d="M -296 0 L -286 10 L -270 -10" stroke="${D.ok}" stroke-width="6" fill="none"/>${txt(20, 14, 38, l, '#062814')}</g>`; });
  return `<defs><linearGradient id="gDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2240" stop-opacity="0"/><stop offset=".7" stop-color="#7a4a5a"/><stop offset="1" stop-color="#ffb070"/></linearGradient></defs>
    ${highway(t, { speed: 0, off: 0, dawn })}
    <path d="M 120 1160 L 180 1290 L 400 1290 L 460 1160 Z" fill="#05070b"/>
    ${car2(760, 1180, 1.05, { wreck: 1, t })}
    ${t < 76.4 ? andrej(290, 1290, .9, { lie: 1, dir: -1 }) : andrej(lerp(290, 480, eio(climb)), lerp(1290, 1160, eio(climb)), .95, { walk: climb < 1 ? t * 8 : null, look: t > 77.7 ? 10 : 0 })}
    ${tagOk(540, 300, 1.2, 'ENTWARNUNG', prog(t, 74.28, 74.6) * (1 - prog(t, 79.4, 79.7)))}
    ${ck}`;
}
const SCENES = [[0, 6.7, s1], [6.7, 11.58, s3], [11.58, 17.22, s4], [17.22, 25.48, s6], [25.48, 40.04, s8], [40.04, 45.44, s12], [45.44, 53.18, s14], [53.18, 61.6, s16], [61.6, 71.14, s18], [71.14, 74.28, s19], [74.28, 999, s20]];
function scene(t) { let r = SCENES[SCENES.length - 1]; for (const x of SCENES) if (t >= x[0] && t < x[1]) { r = x; break; } return darkDefs() + `<defs><linearGradient id="gDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#1a2240" stop-opacity="0"/><stop offset=".7" stop-color="#7a4a5a"/><stop offset="1" stop-color="#ffb070"/></linearGradient></defs>`.repeat(r[2] === s20 ? 0 : 1) + r[2](t) + vignetteDark(); }

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
