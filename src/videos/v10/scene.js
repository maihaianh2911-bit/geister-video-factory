// @ts-nocheck
// AUTO-GENERATED scene for v10. Change it by commenting on the issue.
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

// ===== v10: "Drohne über dem Hof" — cinematic dark style (owner's reference) =====
function car(x, y, s, o = {}) { // sedan side view, origin ground centre, facing right
  const lit = o.lights ? 1 : 0;
  return `<g transform="translate(${x} ${y}) scale(${s * (o.dir || 1)} ${s})">
    <ellipse cx="0" cy="4" rx="230" ry="14" fill="#000" opacity=".5"/>
    <path d="M -220 -40 Q -224 -86 -180 -92 L -120 -98 L -70 -150 Q -50 -164 -10 -164 L 80 -164 Q 110 -164 130 -140 L 170 -100 L 214 -90 Q 236 -84 232 -40 L 228 -20 L -216 -20 Z" fill="#4a5872"/>
    <path d="M -60 -144 L -10 -154 L 40 -154 L 40 -104 L -100 -104 Z" fill="#0d1220"/><path d="M 52 -154 L 84 -154 Q 106 -152 120 -136 L 148 -104 L 52 -104 Z" fill="#0d1220"/>
    ${o.driver ? `<circle cx="20" cy="-128" r="16" fill="${D.skin}"/><path d="M 4 -132 Q 6 -150 22 -148 Q 36 -146 34 -134 Z" fill="${D.hair}"/>` : ''}
    <path d="M -216 -40 H 230" stroke="#3a465e" stroke-width="4"/><rect x="-30" y="-90" width="26" height="6" rx="3" fill="#2a3346"/>
    ${[-140, 150].map(cx => `<circle cx="${cx}" cy="-20" r="40" fill="#0a0c12"/><circle cx="${cx}" cy="-20" r="18" fill="#4a5266"/>`).join('')}
    <rect x="216" y="-80" width="16" height="14" rx="4" fill="${lit ? '#fff3c4' : '#8a8f9e'}"/><rect x="-222" y="-78" width="12" height="14" rx="3" fill="${D.red}" opacity="${lit ? 1 : .5}"/>
    ${lit ? `<polygon points="232,-74 700,-160 700,40" fill="#fff3c4" opacity=".12"/>` : ''}</g>`;
}
function courtyard(t, o = {}) {
  const gy = 1150;
  return `${cityBg(t, { gy, dim: o.dim ?? 1 })}${streetLamp(o.lampX ?? 800, gy, 420)}`;
}
function entrance(x, gy) {
  return `<rect x="${x - 260}" y="${gy - 760}" width="520" height="760" fill="#1a2232"/>${winGrid(x - 260, gy - 760, 520, 520, 41, { fill: .7, lit: .2, dx: 64, dy: 90, ww: 30, wh: 46 })}
    <rect x="${x - 70}" y="${gy - 260}" width="140" height="260" fill="#3a2a22"/><rect x="${x - 100}" y="${gy - 290}" width="200" height="22" fill="#2a3346"/><rect x="${x - 14}" y="${gy - 282}" width="28" height="8" fill="${D.win}"/>
    <circle cx="${x}" cy="${gy - 270}" r="90" fill="${D.win}" opacity=".12" filter="url(#blur20)"/>`;
}
function neighbor(x, gy, s, k, film) {
  const cols = ['#5a3a34', '#2e5a44', '#4a4a2e', '#3a3456'];
  return `<g transform="translate(${x} ${gy}) scale(${s})"><rect x="-10" y="-120" width="20" height="120" fill="#121418"/><rect x="-22" y="-220" width="44" height="104" rx="12" fill="${cols[k % 4]}"/>
    <circle cx="0" cy="-242" r="22" fill="${D.skin}"/><path d="M -22 -244 Q -20 -268 0 -268 Q 22 -268 22 -246 Q 8 -252 -2 -248 Z" fill="${['#2a1b16', '#0e0f14', '#6a4a2a', '#0e0f14'][k % 4]}"/>
    ${film > 0 ? `<path d="M 8 -206 L 26 -290" stroke="${cols[k % 4]}" stroke-width="16" stroke-linecap="round"/><rect x="16" y="-322" width="18" height="32" rx="3" fill="${D.screen}"/><circle cx="25" cy="-306" r="${70 * film}" fill="${D.screen}" opacity=".35" filter="url(#blur20)"/>` : ''}</g>`;
}
function topYard(t, o = {}) { // top-down map of the yard
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.bg2}"/>
    ${[[120, 1060, 70], [980, 960, 60], [540, 1200, 50], [860, 1240, 70], [260, 1250, 60]].map(([x, y, r]) => `<circle cx="${x}" cy="${y}" r="${r}" fill="#0c1018" opacity=".8"/>`).join('')}
    <rect x="80" y="240" width="420" height="300" fill="${o.hitFill || '#151c2a'}"/>${planRoom(80, 240, 420, 300, { doors: [[250, 536, 90, 10]] })}
    <rect x="620" y="300" width="380" height="300" fill="#151c2a"/>${planRoom(620, 300, 380, 300, { doors: [[700, 596, 90, 10]] })}
    <line x1="-40" y1="1330" x2="1120" y2="1330" stroke="#3a4256" stroke-width="5" stroke-dasharray="40 30"/>${o.extra || ''}`;
}
const GRP = [[250, 620], [300, 650], [350, 620], [280, 690]];
// ---- 1  0–5.62  drone directly above — no panic; you're safe until you make a mistake
function s1(t) {
  if (t < 3.1) return `${cityBg(t, { gy: 1500, noTrees: 1 })}<rect x="-40" y="-40" width="1160" height="2000" fill="#000" opacity=".3"/>${radar(t, 540, 620, 1.6)}${droneTop(t, 540, 620, 1.1, { rot: 20 * Math.sin(t) })}`;
  const warn = prog(t, 4.2, 4.6);
  return `${courtyard(t)}${andrej(500, 1150, 1.05, { look: -4 })}${radar(t, 700, 260, .7)}
    ${warn > 0 ? `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.red}" opacity="${.12 * Math.sin(warn * Math.PI)}"/>` : ''}`;
}
// ---- 2–3  5.62–11.82  in the yard, the hum above the houses; he starts filming
function s2(t) {
  const hum = prog(t, 7.1, 7.6);
  const look = t > 8.2 ? -26 * eout(prog(t, 8.2, 8.6)) : 0;
  const film = t > 9.6 ? eout(prog(t, 9.6, 10.4)) : 0;
  return `${courtyard(t)}${hum > 0 ? `<g opacity="${hum}">${radar(t, 640, 300, 1)}</g>` : ''}
    ${andrej(500, 1150, 1.05, film > 0 ? { film: 1, look: -14 } : { look })}
    ${film > 0 ? `<circle cx="548" cy="830" r="${60 + 60 * film}" fill="${D.screen}" opacity="${.25 * film}" filter="url(#blur40)"/>` : ''}`;
}
// ---- 4–5  11.82–16.44  neighbours do the same at the entrance — that's the mistake
function s4(t) {
  let n = '';
  [[420, 0], [500, 1], [620, 2], [690, 3]].forEach(([x, k], i) => { n += neighbor(x, 1150, 1, k, prog(t, 12.1 + i * .35, 12.4 + i * .35)); });
  const hz = prog(t, 13.9, 14.3);
  return `${cityBg(t, { gy: 1150 })}${entrance(560, 1150)}${hatchEll('h4', 555, 1160, 230, 40, hz)}${n}
    ${andrej(150, 1150, .95, { film: 1, look: -14 })}
    ${tagErr(540, 220, 1, 'FEHLER Nr. 1', prog(t, 15.6, 15.9))}`;
}
// ---- 6  16.44–22.18  a glowing screen is visible from above; a group is the most obvious target
function s6(t) {
  const z = eout(prog(t, 16.44, 17.0));
  const lockG = prog(t, 20.6, 21.0);
  const glow = (x, y, s_) => `<circle cx="${x}" cy="${y}" r="${46 * s_}" fill="${D.screen}" opacity=".55" filter="url(#blur20)"/><circle cx="${x}" cy="${y}" r="${9 * s_}" fill="#fff"/>`;
  const cx = lerp(540, 300, eio(lockG)), cy = lerp(700, 650, eio(lockG)), w = lerp(820, 300, eio(lockG)), h = lerp(900, 260, eio(lockG));
  return `${topYard(t)}<rect x="-40" y="-40" width="1160" height="2000" fill="#000" opacity=".25"/>
    ${GRP.map(([x, y]) => glow(x, y, 1 + .1 * Math.sin(t * 6 + x))).join('')}${glow(820, 900, 1.2)}
    ${corners(cx - w / 2, cy - h / 2, w, h, 50)}<path d="M ${cx - 16} ${cy} H ${cx + 16} M ${cx} ${cy - 16} V ${cy + 16}" stroke="#fff" stroke-width="4"/>
    ${lockG > .9 ? `<rect x="${cx - w / 2}" y="${cy - h / 2}" width="${w}" height="${h}" fill="none" stroke="${D.red}" stroke-width="4" opacity="${.5 + .5 * Math.sin(t * 12)}"/>` : ''}
    ${tagWhite(540, 190, 1, 'VON OBEN', z)}`;
}
// ---- 7  22.18–24.7  the drone turns and goes down
function s7(t) {
  const turn = eio(prog(t, 22.5, 23.1));
  const dive = ein(prog(t, 23.6, 24.6));
  return `${courtyard(t)}${entrance(560, 1150)}${[[420, 0], [500, 1], [620, 2], [690, 3]].map(([x, k]) => neighbor(x, 1150, 1, k, 1)).join('')}${hatchEll('h7', 555, 1160, 230, 40, 1)}
    ${andrej(150, 1150, .95, { film: 1, look: -14 })}
    ${radar(t, lerp(800, 600, dive), lerp(240, 700, dive), .9)}${droneTop(t, lerp(800, 600, dive), lerp(240, 700, dive), .8, { rot: lerp(90, 200, turn) + 20 * dive })}`;
}
// ---- 8–11  24.7–40.26  the plan: 1 don't film · 2 don't stand together · 3 nearest basement, not in the hit house
function s8(t) {
  const filmOff = t > 27.58;
  const mv = eio(prog(t, 28.3, 29.3));
  const ax = lerp(820, 980, mv), ay = lerp(900, 1040, mv);
  const scat = eio(prog(t, 32.4, 33.4));
  const dirs = [[-200, -40], [-80, 260], [150, -80], [60, 300]];
  const hit = prog(t, 36.8, 37.2);
  const fire = prog(t, 38.4, 38.8);
  const crack = prog(t, 39.1, 39.6);
  let grp = '';
  GRP.forEach(([x, y], i) => { const [dx, dy] = dirs[i]; grp += dotP(t, x + dx * scat, y + dy * scat, { glow: !filmOff }); });
  const arrows = t > 32.3 ? GRP.map(([x, y], i) => yArrow([[x, y], [x + dirs[i][0], y + dirs[i][1]]], prog(t, 32.3 + i * .08, 32.9 + i * .08))).join('') : '';
  const extra = `${hit > 0 ? `${hatchRect('h8h', 80, 240, 420, 300, hit)}<path d="M 220 240 L 260 360 L 230 430 L 300 540" stroke="#05070c" stroke-width="10" fill="none" opacity="${crack}"/>` : ''}
    ${fire > 0 ? `<circle cx="290" cy="390" r="180" fill="#ff7a2a" opacity="${.45 * fire * (.8 + .2 * Math.sin(t * 9))}" filter="url(#blur40)"/>` : ''}`;
  const keller = prog(t, 35.6, 36.0);
  return `${topYard(t, { extra })}
    ${t < 30.36 ? hatchEll('h8o', 540, 820, 330, 200, prog(t, 28.6, 29.0) * (1 - prog(t, 29.8, 30.2))) : ''}
    ${arrows}${grp}
    ${yArrow([[820, 900], [980, 1040]], prog(t, 28.3, 29.0))}${dotP(t, ax, ay, { main: 1, glow: !filmOff })}
    ${safeRing(t, 745, 560, 90, keller)}${tagOk(745, 690, 1, 'KELLER', prog(t, 35.8, 36.1))}
    ${t > 36.8 ? `${redDash([[980, 1040], [600, 900], [300, 560]], prog(t, 36.8, 37.3))}${xMark(300, 560, 1, prog(t, 37.3, 37.6))}` : ''}
    ${t > 37.5 ? yArrow([[980, 1040], [880, 800], [760, 600]], prog(t, 37.6, 38.2)) : ''}
    ${tagStep(540, 160, 1, 1, 'NICHT FILMEN', prog(t, 26.0, 26.3) * (1 - prog(t, 30.2, 30.36)))}
    ${tagStep(540, 160, 1, 2, 'NICHT STEHEN', prog(t, 30.36, 30.66) * (1 - prog(t, 34.3, 34.42)))}
    ${tagStep(540, 160, 1, 3, 'KELLER', prog(t, 34.42, 34.72))}
    ${t < 26.0 ? corners(60, 200, 960, 1100, 60) : ''}`;
}
// ---- 12  40.26–46.38  phone away, neighbours scatter, he runs to the neighbour house basement
function s12(t) {
  const away = t > 41.28;
  const scat = eio(prog(t, 42.6, 43.6));
  const run = prog(t, 44.4, 45.7);
  const ax = lerp(150, 900, eio(run));
  let n = '';
  [[420, 0, -1], [500, 1, -1], [620, 2, 1], [690, 3, 1]].forEach(([x, k, d]) => { n += neighbor(x + d * 600 * scat, 1150, 1, k, 0); });
  return `${cityBg(t, { gy: 1150 })}${entrance(560, 1150)}
    <rect x="860" y="1050" width="180" height="100" fill="#0a0c12"/><path d="M 860 1050 L 1040 1050 L 1040 1150" stroke="${D.ok}" stroke-width="5" stroke-dasharray="16 12"/>
    ${n}${andrej(ax, 1150 + (ax > 880 ? (ax - 880) * .6 : 0), .95, run > 0 && run < 1 ? { walk: t * 14 } : away ? { armF: 10 } : { film: 1, look: -14 })}
    ${tagOk(950, 990, 1, 'KELLER', prog(t, 44.8, 45.1))}`;
}
// ---- 13–15  46.38–61.02  basement: blast and dust; away from door and small windows; sit by the wall; window flies in
function basement(t, o = {}) {
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#06080c"/><rect x="40" y="360" width="1000" height="790" fill="#141a26"/>
    <rect x="40" y="1150" width="1000" height="40" fill="#1c2232"/><rect x="40" y="340" width="1000" height="24" fill="#0a0c12"/>
    <g transform="rotate(${6 * Math.sin(t * 1.6)} 700 364)"><line x1="700" y1="364" x2="700" y2="520" stroke="#0a0c12" stroke-width="4"/><circle cx="700" cy="530" r="14" fill="${o.dark ? '#3a3f4c' : '#ffd9a0'}"/>${o.dark ? '' : `<circle cx="700" cy="530" r="120" fill="#ffd9a0" opacity=".12" filter="url(#blur20)"/>`}</g>
    ${[...Array(6)].map((_, i) => `<rect x="${120 + i * 160}" y="${700 + (i % 2) * 40}" width="120" height="16" fill="#1a2030"/>`).join('')}
    <rect x="70" y="760" width="150" height="390" fill="#2a1f1a" stroke="#3a3040" stroke-width="6"/>
    <rect x="300" y="380" width="200" height="90" fill="#0b1020" stroke="#3a4256" stroke-width="6"/>${o.winBroken ? '' : `<path d="M 300 380 L 500 470 M 500 380 L 300 470" stroke="#3a4256" stroke-width="2" opacity=".5"/>`}
    <rect x="${640}" y="380" width="180" height="90" fill="#0b1020" stroke="#3a4256" stroke-width="6"/>
    ${o.zones ? `${hatchRect('hb1', 40, 360, 330, 790, o.zones)}${hatchRect('hb2', 280, 360, 580, 160, o.zones2 ?? o.zones)}
      <rect x="${860}" y="560" width="170" height="590" fill="${D.ok}" fill-opacity=".1" stroke="${D.ok}" stroke-width="5" stroke-dasharray="16 12" opacity="${o.safe ?? 0}"/>` : ''}`;
}
function s13(t) {
  if (t < 48.92) {
    const [bl, sx, sy] = blast(t, 46.58, 540, 300, .9);
    return `<g transform="translate(${sx} ${sy})">${basement(t)}${bl}${andrej(330, 1150, 1.05, { crouch: 1 })}${plaster(t, 47.6)}${flash(t, 46.58)}</g>`;
  }
  if (t < 56.96) {
    const z1 = prog(t, 50.0, 50.4), z2 = prog(t, 52.6, 53.0), safe = prog(t, 53.6, 54.0);
    const walk = prog(t, 53.7, 54.6);
    const ax = lerp(330, 900, eio(walk));
    const sit = t > 54.7;
    return `${basement(t, { zones: z1, zones2: z2, safe })}${plaster(t, 47.6, 20)}
      ${sit ? andrejSitWall(930, 1150, 1.05) : andrej(ax, 1150, 1.05, { walk: walk > 0 && walk < 1 ? t * 9 : null })}
      ${tagErr(205, 300, .8, 'TÜR', z1)}${tagErr(560, 300, .8, 'FENSTER', z2)}
      ${tagStep(540, 200, .95, '→', 'AN DIE WAND', prog(t, 53.7, 54.0), -2).replace('→.', '→')}
      ${tagOk(945, 1240, 1, 'WARTEN', prog(t, 55.4, 55.7))}`;
  }
  const shards = t > 58.5 ? shardSpray(t, 58.5, 400, 425) : '';
  return `${basement(t, { zones: 1, safe: 1, winBroken: t > 58.5 })}${andrejSitWall(930, 1150, 1.05, { look: t > 58.6 ? -20 : 0 })}${shards}${flash(t, 58.52, '#ffd9a0')}`;
}
function andrejSitWall(x, y, s, o = {}) { // seated on the floor, back to the wall (facing left)
  return `<g transform="translate(${x} ${y}) scale(${-s} ${s})"><ellipse cx="0" cy="2" rx="80" ry="8" fill="#000" opacity=".4"/>
    <path d="M -20 -10 L 70 -14 L 100 -60 L 120 0" stroke="${D.pants}" stroke-width="24" fill="none" stroke-linejoin="round" stroke-linecap="round"/>
    <path d="M -34 -10 L -30 -120 Q -24 -144 0 -144 Q 22 -144 24 -120 L 24 -10 Z" fill="${D.jacket}"/>
    <path d="M 10 -120 Q 70 -100 96 -66" stroke="${D.jacketSh}" stroke-width="18" fill="none" stroke-linecap="round"/>
    <g transform="rotate(${o.look || 0} 0 -144)"><circle cx="4" cy="-174" r="25" fill="${D.skin}"/><path d="M -22 -174 Q -24 -202 4 -202 Q 28 -202 28 -184 Q 10 -190 -2 -180 Q -8 -166 -20 -162 Z" fill="${D.hair}"/></g></g>`;
}
function shardSpray(t, t0, x0, y0) {
  let s = '';
  for (let i = 0; i < 24; i++) { const dt = t - t0 - (i % 4) * .03; if (dt < 0) continue; const p = cl(dt / .8); const vx = 100 + 260 * hash(i + 1), vy = 120 + 400 * hash(i + 9); s += `<g transform="translate(${x0 + (hash(i + 4) - .5) * 160 + vx * p} ${y0 + vy * p + 500 * p * p}) rotate(${dt * 500})" opacity="${1 - cl((dt - .8) / .5)}"><path d="M 0 -14 L 9 8 L -8 6 Z" fill="#cfefff"/></g>`; }
  return s;
}
function plaster(t, t0, n = 40) {
  if (t < t0) return '';
  let s = '';
  for (let i = 0; i < n; i++) { const te = t0 + hash(i) * 1.6; if (t < te) continue; const dt = t - te, y = 370 + 500 * dt * dt + 120 * dt; if (y > 1150) continue; s += `<circle cx="${80 + hash(i + 3) * 920}" cy="${y}" r="${2 + 3 * hash(i + 5)}" fill="#c9c1b0" opacity=".85"/>`; }
  return s;
}
// ---- 16–17  61.02–70.06  why so low? radar sees roof-height poorly; shooting it down over houses → debris into yards
function radarDiag(t, o = {}) {
  let houses = '';
  for (let i = 0; i < 6; i++) { const x = 360 + i * 110, h = 200 + 90 * hash(i + 2); houses += `<rect x="${x}" y="${1050 - h}" width="96" height="${h}" fill="none" stroke="${D.line}" stroke-width="4"/>${winGrid(x, 1050 - h, 96, h - 20, i + 60, { fill: .6, lit: .25, dx: 22, dy: 30, ww: 8, wh: 10 })}`; }
  const beamY = (x) => 560 - (x - 160) * .32;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.bg2}"/>
    <path d="M 160 1050 L 130 560 M 160 1050 L 190 560 M 140 860 L 180 860 M 135 720 L 185 720" stroke="${D.line}" stroke-width="5" fill="none"/><circle cx="160" cy="550" r="16" fill="${D.line}"/>
    <path d="M 160 550 L 1080 ${beamY(1080)}" stroke="#5aa9ff" stroke-width="6"/><path d="M 160 550 L 1080 ${beamY(1080) - 80}" stroke="#5aa9ff" stroke-width="2" opacity=".5"/>
    <polygon points="160,550 1080,${beamY(1080)} 1080,${beamY(1080) - 80}" fill="#5aa9ff" opacity="${.1 + .05 * Math.sin(t * 4)}"/>
    ${houses}<line x1="60" y1="1050" x2="1040" y2="1050" stroke="${D.line}" stroke-width="5"/>${o.extra || ''}`;
}
function s16(t) {
  const fly = prog(t, 61.4, 65.3);
  const dx = lerp(1100, 380, fly), dy = 760 + 8 * Math.sin(t * 6);
  if (t < 65.42) {
    const hl = prog(t, 63.1, 63.5);
    return `${radarDiag(t, { extra: `${hl > 0 ? `<rect x="340" y="${700}" width="720" height="120" fill="#ffd23a" opacity="${.12 * hl}"/>` : ''}` })}
      <g transform="translate(${dx} ${dy}) rotate(-90)">${droneTop(t, 0, 0, .5)}</g>
      ${tagStep(540, 220, 1, '?', 'WARUM SO TIEF', prog(t, 61.02, 61.3)).replace('?.', '?')}
      ${t > 64.0 ? tagWhite(dx, dy + 100, .8, 'RADAR?', prog(t, 64.0, 64.3)) : ''}`;
  }
  const hitP = prog(t, 66.2, 66.9);
  const deb = t > 66.9;
  let d = '';
  if (deb) for (let i = 0; i < 8; i++) { const dt = t - 66.9 - i * .05; if (dt < 0) continue; const p = cl(dt / 1.2); d += `<rect x="${560 + (hash(i) - .5) * 200 + 60 * p * (hash(i + 2) - .5)}" y="${760 + 400 * p * p}" width="14" height="10" fill="#9aa4bb" transform="rotate(${dt * 400} ${560} ${760})"/>`; }
  return `${radarDiag(t)}
    ${!deb ? `<g transform="translate(${lerp(560, 560, 0)} 760) rotate(-90)">${droneTop(t, 0, 0, .5)}</g>` : ''}
    ${hitP > 0 && hitP < 1 ? `<path d="M 1000 1050 Q 800 700 ${lerp(1000, 560, hitP)} ${lerp(1050, 760, hitP)}" stroke="#ffd23a" stroke-width="5" fill="none" stroke-dasharray="10 10"/>` : ''}
    ${deb ? `<circle cx="560" cy="760" r="${80 * Math.exp(-(t - 66.9) * 2)}" fill="#ff9a3c" opacity="${.7 * Math.exp(-(t - 66.9) * 2)}" filter="url(#blur20)"/>${d}${hatchRect('h17', 500, 1000, 200, 50, prog(t, 68.0, 68.4))}` : ''}
    ${tagErr(560, 1200, .9, 'TRÜMMER', prog(t, 68.06, 68.35))}`;
}
// ---- 18  70.06–75.12  listen: sounds like a moped, flies low and steady, at night with a point of light
function s18(t) {
  const row = (i, t0, label, icon) => { const p = prog(t, t0, t0 + .3); if (p <= 0) return ''; return `<g transform="translate(${lerp(-300, 0, eout(p))} 0)" opacity="${p}"><rect x="140" y="${420 + i * 200}" width="800" height="150" rx="28" fill="#f4f6fb"/><g transform="translate(240 ${495 + i * 200})">${icon}</g>${txt(330, 515 + i * 200, 54, label, '#10131c', { anchor: 'start' })}</g>`; };
  const wave = `<path d="M -50 0 q 12 -30 25 0 t 25 0 t 25 0 t 25 0" stroke="#10131c" stroke-width="7" fill="none"/>`;
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="${D.bg2}"/>${radar(t, 540, 1260, .9)}
    ${tagStep(540, 250, 1, '!', 'HÖR HIN', prog(t, 70.1, 70.4)).replace('!.', '!')}
    ${row(0, 71.06, 'wie ein Moped', wave)}${row(1, 72.4, 'tief · gleichmäßig', `<path d="M -50 10 H 50" stroke="#10131c" stroke-width="8"/><path d="M 30 -6 L 52 10 L 30 26" stroke="#10131c" stroke-width="7" fill="none"/>`)}
    ${row(2, 74.4, 'Lichtpunkt', `<circle r="16" fill="${D.red}" opacity="${Math.floor(t * 3) % 2 ? .4 : 1}"/><circle r="34" fill="${D.red}" opacity=".3"/>`)}`;
}
// ---- 19–20  75.12–82.69  all clear — he gets in the car, exhales… a red dot in the rear-view mirror
function s19(t) {
  if (t < 79.12) {
    const walk = prog(t, 76.4, 77.3);
    const inCar = t > 77.4;
    return `${cityBg(t, { gy: 1150, road: 1 })}${streetLamp(200, 1150, 420)}
      ${car(640, 1150, 1.15, { driver: inCar })}
      ${!inCar ? andrej(lerp(200, 560, eio(walk)), 1150, 1.0, { walk: walk > 0 && walk < 1 ? t * 9 : null }) : ''}
      ${inCar && t > 77.9 ? `<circle cx="${700 + 60 * prog(t, 77.9, 78.8)}" cy="${975 - 10 * prog(t, 77.9, 78.8)}" r="${10 + 26 * prog(t, 77.9, 78.8)}" fill="#e9f0ff" opacity="${.3 * (1 - prog(t, 77.9, 78.8))}"/>` : ''}
      ${tagOk(540, 260, 1.1, 'ENTWARNUNG', prog(t, 75.12, 75.45))}`;
  }
  const dot = prog(t, 80.6, 80.9);
  return `<rect x="-40" y="-40" width="1160" height="2000" fill="#05070c"/>
    <rect x="-40" y="900" width="1160" height="1000" fill="#0b0e15"/>
    <rect x="200" y="420" width="680" height="240" rx="70" fill="#10141e" stroke="#2a3346" stroke-width="16"/>
    <clipPath id="mir"><rect x="214" y="434" width="652" height="212" rx="60"/></clipPath>
    <g clip-path="url(#mir)"><rect x="200" y="420" width="680" height="240" fill="#0c1220"/>
      ${winGrid(200, 450, 680, 140, 77, { fill: .3, lit: .18, dx: 28, dy: 30, ww: 6, wh: 8 })}
      <path d="M 200 640 L 540 560 L 880 640 Z" fill="#141a26"/><path d="M 540 560 L 540 660" stroke="#3a4256" stroke-width="4" stroke-dasharray="14 12"/>
      ${dot > 0 ? `<circle cx="610" cy="500" r="9" fill="${D.red}" opacity="${Math.floor(t * 3) % 2 ? .35 : 1}"/><circle cx="610" cy="500" r="30" fill="${D.red}" opacity="${.35 * dot}" filter="url(#blur8)"/>` : ''}
      <rect x="200" y="420" width="680" height="60" fill="#fff" opacity=".04"/></g>
    <rect x="510" y="300" width="60" height="120" fill="#10141e"/>
    ${t > 82.1 ? `<rect x="-40" y="-40" width="1160" height="2000" fill="#000" opacity="${.6 * prog(t, 82.1, 82.69)}"/>` : ''}`;
}
const SCENES = [[0, 5.62, s1, 1], [5.62, 11.82, s2, 1.15, 1000], [11.82, 16.44, s4, 1.05, 900], [16.44, 22.18, s6, 1], [22.18, 24.7, s7, 1.05, 900], [24.7, 40.26, s8, 1], [40.26, 46.38, s12, 1.05, 900],
  [46.38, 61.02, s13, 1], [61.02, 70.06, s16, 1], [70.06, 75.12, s18, 1], [75.12, 999, s19, 1]];
function scene(t) { let r = SCENES[SCENES.length - 1]; for (const x of SCENES) if (t >= x[0] && t < x[1]) { r = x; break; } const z = r[3] || 1, cy = r[4] || 800; return darkDefs() + (z !== 1 ? `<g transform="translate(540 ${cy}) scale(${z}) translate(-540 ${-cy})">${r[2](t)}</g>` : r[2](t)) + vignetteDark(); }

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
