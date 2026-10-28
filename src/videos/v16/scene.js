// @ts-nocheck
// AUTO-GENERATED scene for v16. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

const K = { bg: '#090f1b', wall: '#17243b', wall2: '#1f3050', floor: '#101826', ol: '#04070d', amb: '#f4b24b', red: '#e8384a', skin: '#dcae8a', skinSh: '#b98a68', cold: '#7fa6c9', inf: '#a8b8a4', blood: '#8c1b2a', steel: '#3b4553' };
const OL = `stroke="${K.ol}" stroke-width="6" stroke-linejoin="round" stroke-linecap="round"`;
const tx = (s, x, y, sz, f, a = 'middle', o = 1) => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" opacity="${o}" style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
const shk = (t, t0, a, d) => t < t0 ? [0, 0] : [a * Math.exp(-(t - t0) * d) * Math.sin((t - t0) * 83), a * Math.exp(-(t - t0) * d) * Math.cos((t - t0) * 61)];
const tw = (t, sd) => (hash(Math.floor(t * 8) + sd * 7) - .5) * 30;
const blink = t => { const k = t % 3.1; return k > 2.9 ? Math.sin((k - 2.9) / .2 * Math.PI) : 0; };

function head(x, y, s, o = {}) {
  const sk = o.inf ? K.inf : (o.skin || K.skin), lx = o.lx || 0, ly = o.ly || 0, br = o.br || 0, es = o.es || 1, bl = o.bl || 0;
  const eye = ex => o.inf
    ? (o.shut ? `<path d="M ${ex - 16} -4 L ${ex + 16} -4" stroke="${K.ol}" stroke-width="6"/>` : `<ellipse cx="${ex}" cy="-6" rx="${17 * es}" ry="${14 * es}" fill="#e9efe0" stroke="${K.ol}" stroke-width="4"/><circle cx="${ex + lx * .6}" cy="${-6 + ly * .6}" r="7" fill="${K.red}"/>`)
    : `<ellipse cx="${ex}" cy="-6" rx="${17 * es}" ry="${Math.max(2, 21 * es * (1 - bl))}" fill="#f4f1ea" stroke="${K.ol}" stroke-width="4"/><circle cx="${ex + lx}" cy="${-6 + ly}" r="${8 * es}" fill="${K.ol}" opacity="${1 - bl * .8}"/>`;
  const M = {
    flat: `<path d="M -26 54 L 26 54" stroke="${K.ol}" stroke-width="7" stroke-linecap="round"/>`,
    worried: `<path d="M -30 56 q 10 -12 20 0 q 10 12 20 0 q 10 -12 20 0" stroke="${K.ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    o: `<ellipse cx="0" cy="58" rx="15" ry="21" fill="${K.ol}"/>`,
    open: `<path d="M -34 46 Q 0 100 34 46 Z" fill="#2a0a10" stroke="${K.ol}" stroke-width="5"/><path d="M -22 48 h 44" stroke="#e8e4d8" stroke-width="7"/>`,
    scream: `<ellipse cx="0" cy="62" rx="22" ry="32" fill="#2a0a10" stroke="${K.ol}" stroke-width="5"/><ellipse cx="0" cy="76" rx="13" ry="11" fill="#8c2a3a"/>`,
    grit: `<rect x="-32" y="44" width="64" height="22" rx="8" fill="#e8e4d8" stroke="${K.ol}" stroke-width="5"/><path d="M -16 44 v 22 M 0 44 v 22 M 16 44 v 22" stroke="${K.ol}" stroke-width="3"/>`,
    smile: `<path d="M -28 48 Q 0 74 28 48" stroke="${K.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  }[o.m || 'flat'];
  const hair = o.hair ? `<path d="M -98 -12 Q -108 -118 0 -118 Q 108 -118 98 -12 Q 86 -70 30 -74 Q 0 -62 -36 -76 Q -84 -66 -98 -12 Z" fill="${o.hair}" ${OL} stroke-width="5"/>` : '';
  const back = o.long ? `<path d="M -104 -20 Q -120 -140 0 -134 Q 120 -140 104 -20 L 112 100 L -112 100 Z" fill="${o.long}" ${OL} stroke-width="5"/>` : '';
  const glow = o.inf && o.glow && !o.shut ? [-38, 38].map(ex => `<circle cx="${ex}" cy="-6" r="26" fill="${K.red}" opacity=".3"/>`).join('') : '';
  const sweat = o.sweat ? `<path d="M 80 -60 q 8 16 0 22 q -8 -6 0 -22 Z" fill="#a9d4f2" opacity="${.5 + .5 * Math.sin(o.sweat * 6)}"/>` : '';
  return `<g transform="translate(${x} ${y}) rotate(${o.tilt || 0}) scale(${s})">${back}
    <ellipse cx="-93" cy="4" rx="16" ry="26" fill="${sk}" ${OL} stroke-width="5"/><ellipse cx="93" cy="4" rx="16" ry="26" fill="${sk}" ${OL} stroke-width="5"/>
    <ellipse cx="0" cy="0" rx="92" ry="104" fill="${sk}" ${OL}/>${hair}
    ${glow}${eye(-38)}${eye(38)}
    <path d="M -64 ${-38 + 4 * br} L -20 ${-50 - 14 * br} M 64 ${-38 + 4 * br} L 20 ${-50 - 14 * br}" stroke="${o.hair || K.ol}" stroke-width="10" fill="none" stroke-linecap="round"/>
    ${o.inf ? `<path d="M 40 -80 l 30 10 M -60 20 l -14 30" stroke="${K.blood}" stroke-width="6" stroke-linecap="round"/>` : ''}
    ${M}${sweat}</g>`;
}

function body(x, y, s, o = {}) {
  const col = o.col || '#5a7596', pa = o.pants || '#262f3f', sk = o.inf ? K.inf : (o.skin || K.skin);
  const ph = o.ph || 0, sw = Math.sin(ph) * 22, bob = o.walk ? Math.abs(Math.cos(ph)) * 10 : 0;
  const aL = o.aL ?? 8, aR = o.aR ?? -8, al = o.arm || 230;
  const arm = (a, sd) => `<g transform="rotate(${a} ${sd * 100} -440)"><rect x="${sd * 100 - 24}" y="-452" width="48" height="${al}" rx="24" fill="${col}" ${OL}/><circle cx="${sd * 100}" cy="${-452 + al + 6}" r="27" fill="${sk}" ${OL}/></g>`;
  const leg = (sd, a) => `<g transform="rotate(${a} ${sd * 44} -230)"><rect x="${sd * 44 - 32}" y="-236" width="64" height="232" rx="26" fill="${pa}" ${OL}/><ellipse cx="${sd * 44}" cy="-4" rx="46" ry="20" fill="#111723" ${OL}/></g>`;
  const bl = (o.blood || []).map(b => `<ellipse cx="${b[0]}" cy="${b[1]}" rx="${b[2]}" ry="${b[2] * .8}" fill="${K.blood}" opacity=".9"/>`).join('');
  return `<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s * (o.sx || 1)} ${s * (o.sy || 1)})">
    <ellipse cx="0" cy="0" rx="120" ry="20" fill="#000" opacity=".4"/>
    ${leg(-1, sw)}${leg(1, -sw)}
    <g transform="translate(0 ${-bob})">${arm(aL, -1)}${arm(aR, 1)}
    <rect x="-96" y="-480" width="192" height="276" rx="54" fill="${col}" ${OL}/>${bl}
    <rect x="-30" y="-520" width="60" height="60" rx="20" fill="${sk}" ${OL}/>
    ${head(0, -590 + (o.hdy || 0), .94, o.h || {})}</g></g>`;
}

const VPX = 540, VPY = 760, CW = 840, CF = 740, CE = -700;
const cX = (x, z) => VPX + x / z, cY = (y, z) => VPY + y / z;
const P = (x, y, z) => `${cX(x, z).toFixed(1)},${cY(y, z).toFixed(1)}`;
function corr(t, o = {}) {
  const zf = 6, zn = .45, dim = o.dim ?? 1;
  let s = `<rect width="1080" height="1920" fill="#04060c"/>`;
  s += `<polygon points="${P(-CW, CE, zf)} ${P(CW, CE, zf)} ${P(CW, CF, zf)} ${P(-CW, CF, zf)}" fill="#0b1424"/>`;
  s += `<polygon points="${P(-CW, CF, zf)} ${P(CW, CF, zf)} ${P(CW, CF, zn)} ${P(-CW, CF, zn)}" fill="${K.floor}"/>`;
  s += `<polygon points="${P(-CW, CE, zf)} ${P(CW, CE, zf)} ${P(CW, CE, zn)} ${P(-CW, CE, zn)}" fill="#0a111e"/>`;
  s += `<polygon points="${P(-CW, CE, zf)} ${P(-CW, CF, zf)} ${P(-CW, CF, zn)} ${P(-CW, CE, zn)}" fill="${K.wall}"/>`;
  s += `<polygon points="${P(CW, CE, zf)} ${P(CW, CF, zf)} ${P(CW, CF, zn)} ${P(CW, CE, zn)}" fill="${K.wall2}"/>`;
  for (let z = 1; z <= 6; z += .5) s += `<path d="M ${P(-CW, CF, z)} L ${P(CW, CF, z)}" stroke="#1b2740" stroke-width="3"/>`;
  s += `<path d="M ${P(0, CF, zf)} L ${P(0, CF, zn)}" stroke="#1b2740" stroke-width="3"/>`;
  s += `<polygon points="${P(-CW, 560, zf)} ${P(-CW, CF, zf)} ${P(-CW, CF, zn)} ${P(-CW, 560, zn)}" fill="#111c30"/><polygon points="${P(CW, 560, zf)} ${P(CW, CF, zf)} ${P(CW, CF, zn)} ${P(CW, 560, zn)}" fill="#16233c"/>`;
  (o.lights || [1.7, 2.9, 4.2, 5.4]).forEach((z, i) => {
    const on = o.flick ? (hash(Math.floor(t * 14) + i * 3) > .35 ? 1 : .2) : (o.lit ?? 1);
    s += `<polygon points="${P(-170, CE, z)} ${P(170, CE, z)} ${P(170, CE, z * 1.15)} ${P(-170, CE, z * 1.15)}" fill="#dfe9ff" opacity="${.9 * on * dim}"/>`;
    s += `<ellipse cx="${cX(0, z)}" cy="${cY(CF, z)}" rx="${520 / z}" ry="${70 / z}" fill="#9fc0ff" opacity="${.13 * on * dim}"/>`;
  });
  (o.doors || []).forEach(d => {
    const sd = d.s, z1 = d.z1, z2 = d.z2, op = d.op || 0, x = sd * CW;
    s += `<polygon points="${P(x, CF, z1)} ${P(x, -20, z1)} ${P(x, -20, z2)} ${P(x, CF, z2)}" fill="${d.open ? '#1a1206' : '#050810'}" ${OL} stroke-width="4"/>`;
    if (op > 0) s += `<polygon points="${P(x, CF, z1)} ${P(x, -20, z1)} ${P(x, -20, z2)} ${P(x, CF, z2)}" fill="#e9a640" opacity="${.35 + op}"/>`;
    const za = lerp(z1, z2, op * 4);
    s += `<polygon points="${P(x, CF, za)} ${P(x, -20, za)} ${P(x, -20, z2)} ${P(x, CF, z2)}" fill="${d.col || '#2c3e5c'}" ${OL} stroke-width="4"/>`;
    s += `<circle cx="${cX(x, lerp(za, z2, .8))}" cy="${cY(330, lerp(za, z2, .8))}" r="${10 / z1}" fill="${K.amb}"/>`;
    s += `<rect x="${cX(x, lerp(za, z2, .5)) - 12 / z1 * 1.5}" y="${cY(40, z1) + 14}" width="${24 / z1 * 1.5}" height="${14 / z1 * 1.5}" fill="#c7d4ea" opacity=".6"/>`;
  });
  return s;
}
const cz = (x, z) => [cX(x, z), cY(CF, z)];
function peep(inner, t, o = {}) {
  const r = 540 + (o.pulse || 0), id = 'pp' + (o.id || 0);
  return `<rect width="1080" height="1920" fill="#06080d"/>
    <path d="M 0 0 H 1080 V 1920 H 0 Z" fill="#1a1410"/>
    <clipPath id="${id}"><circle cx="540" cy="780" r="${r}"/></clipPath>
    <g clip-path="url(#${id})">${inner}<circle cx="540" cy="780" r="${r}" fill="none" stroke="#000" stroke-width="150" opacity=".6"/></g>
    <circle cx="540" cy="780" r="${r + 18}" fill="none" stroke="#b39a6b" stroke-width="22"/><circle cx="540" cy="780" r="${r + 36}" fill="none" stroke="${K.ol}" stroke-width="10"/>
    <path d="M 220 520 Q 300 330 520 270" stroke="#fff" stroke-width="10" fill="none" opacity=".12" stroke-linecap="round"/>`;
}
function fig(z, x, o = {}) {
  const [px, py] = cz(x, z);
  return body(px, py, 1.17 / z * (o.k || 1.5), o);
}

function phone(x, y, s, rot, inner, glow) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">${glow ? `<circle cx="0" cy="0" r="${220 * glow}" fill="${K.amb}" opacity=".16"/>` : ''}
   <rect x="-90" y="-170" width="180" height="340" rx="30" fill="#0e131d" ${OL}/><rect x="-78" y="-154" width="156" height="308" rx="16" fill="#05080f"/>${inner}</g>`;
}
function bell(x, y, s, col) { return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -34 20 Q -34 -40 0 -44 Q 34 -40 34 20 L 44 34 H -44 Z" fill="${col}"/><circle cx="0" cy="44" r="9" fill="${col}"/></g>`; }

function card(t, t0, num, label, icon) {
  const p = prog(t, t0, t0 + .3); if (p <= 0) return '';
  const sc = lerp(1.4, 1, eout(p)), sh = shk(t, t0 + .2, 9, 6);
  return `<g transform="translate(${540 + sh[0]} ${430 + sh[1]}) scale(${sc})" opacity="${cl(p * 3)}">
    <rect x="-430" y="-210" width="860" height="420" rx="30" fill="#0b0d14" stroke="${K.red}" stroke-width="9"/>
    <rect x="-410" y="-190" width="820" height="380" rx="20" fill="none" stroke="${K.red}" stroke-width="3" opacity=".6"/>
    <g transform="translate(0 -60)">${icon}</g>
    <text x="0" y="130" text-anchor="middle" fill="#f3ecdf" textLength="780" lengthAdjust="spacingAndGlyphs" style="font-family:'Inter';font-weight:900;font-size:64px"><tspan fill="${K.red}">${num} · </tspan>${label}</text></g>`;
}
const icon1 = `<rect x="-60" y="-95" width="120" height="190" rx="12" fill="#2c3e5c" ${OL}/><circle cx="36" cy="5" r="9" fill="${K.amb}"/><rect x="-36" y="-30" width="72" height="62" rx="10" fill="${K.red}" ${OL}/><path d="M -20 -30 v -24 a 20 20 0 0 1 40 0 v 24" fill="none" stroke="#e8e4d8" stroke-width="9"/>`;
const icon2 = `<path d="M -70 -24 H -30 L 20 -64 V 64 L -30 24 H -70 Z" fill="#e8e4d8" ${OL}/><path d="M 44 -34 q 24 34 0 68 M 68 -56 q 38 56 0 112" fill="none" stroke="#e8e4d8" stroke-width="8" stroke-linecap="round"/><path d="M -90 -80 L 100 80" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/>`;
const icon3 = `<rect x="-150" y="-85" width="90" height="170" rx="10" fill="#2c3e5c" ${OL}/><rect x="60" y="-85" width="90" height="170" rx="10" fill="#2c3e5c" ${OL}/><path d="M 60 -85 h 8 v 170 h -8 Z" fill="${K.amb}"/><ellipse cx="94" cy="-8" rx="24" ry="14" fill="#f4f1ea" ${OL} stroke-width="4"/><circle cx="94" cy="-8" r="8" fill="${K.red}"/>`;

function tower(t, o) {
  const f0 = o.f0, f1 = o.f1, n = f1 - f0 + 1, top = 210, bot = 1370, h = (bot - top) / n, x0 = o.x0 ?? 300, x1 = o.x1 ?? 780;
  let s = `<rect x="${x0 - 14}" y="${top - 14}" width="${x1 - x0 + 28}" height="${bot - top + 28}" rx="10" fill="${K.ol}"/>`;
  for (let i = 0; i < n; i++) {
    const f = f1 - i, y = top + i * h, v = o.heat ? o.heat(f, t) : 0;
    s += `<rect x="${x0}" y="${y + 1}" width="${x1 - x0}" height="${h - 2}" fill="${v > 0 ? `rgb(${Math.round(23 + 190 * v)},${Math.round(36 - 10 * v)},${Math.round(59 - 10 * v)})` : (f % 2 ? '#16233a' : '#1a2842')}"/>`;
    s += `<rect x="${x0}" y="${y + 1}" width="${Math.min(60, h * 1.2)}" height="${h - 2}" fill="#0a111e"/>`;
    if (o.cell) s += o.cell(f, y, h, t, x0, x1);
  }
  return s;
}
const fy = (f, f0, f1) => 210 + (f1 - f) * (1160 / (f1 - f0 + 1));

// ---------- elevator CCTV ----------
function elevator(t, l) {
  const lung = eout(prog(l, .3, .6)), str = l > .6 ? Math.sin(l * 17) * 6 : 0;
  const mx = lerp(300, 570, lung) + str, wx = lerp(700, 760, lung) + (l > .6 ? Math.sin(l * 15 + 1) * 8 : 0);
  const wl = l > .6 ? -14 + Math.sin(l * 11) * 5 : 0;
  const lightOk = l > 7 ? (hash(Math.floor(l * 12)) > .4 ? 1 : .5) : 1;
  let s = `<rect width="1080" height="1920" fill="#08110f"/>
   <rect x="120" y="260" width="840" height="1060" fill="#2c3a3a" ${OL}/><rect x="160" y="300" width="760" height="980" fill="#3a4b4a"/>
   <path d="M 540 300 V 1280" stroke="#1f2b2b" stroke-width="8"/><path d="M 160 780 H 920" stroke="#6c807c" stroke-width="14"/>
   <polygon points="120,1320 960,1320 1040,1480 40,1480" fill="#1d2928" ${OL}/>
   <rect x="300" y="268" width="480" height="20" fill="#e7fff4" opacity="${.85 * lightOk}"/>
   <rect x="860" y="470" width="60" height="230" rx="8" fill="#1b2524" ${OL} stroke-width="4"/>${[0, 1, 2, 3].map(i => `<circle cx="890" cy="${500 + i * 50}" r="11" fill="${i === 1 ? K.amb : '#8fa39e'}"/>`).join('')}`;
  s += body(wx, 1350, 1.12, { col: '#8a4f68', pants: '#2b2b3a', lean: wl, aL: lung > .3 ? 105 + Math.sin(l * 30) * 6 : 8, aR: lung > .3 ? -100 - Math.sin(l * 27) * 6 : -8, h: { long: '#2a1a1c', hair: '#2a1a1c', br: 1.9 * lung, m: lung > .3 ? 'scream' : 'flat', es: 1 + .4 * lung, ly: -3 * lung, lx: -8 * lung } });
  s += body(mx, 1350, 1.12, { col: '#a9afb7', pants: '#3a3a44', inf: 1, lean: 20 * lung, aL: -10 - 70 * lung, aR: -85 * lung - 8, blood: [[-40, -380, 30]], h: { inf: 1, glow: 1, hair: '#1b1410', br: -1, m: 'grit', tilt: 8 * lung } });
  return s;
}
function cctvOv(t, tag, ts) {
  let s = `<rect width="1080" height="1920" fill="#0a2a22" opacity=".28"/>`;
  for (let y = 0; y < 1920; y += 14) s += `<rect y="${y + (Math.floor(t * 12) % 14)}" width="1080" height="3" fill="#000" opacity=".22"/>`;
  s += `<rect x="60" y="150" width="300" height="70" rx="6" fill="#000" opacity=".55"/>` + tx(tag, 80, 200, 40, '#d8ffe8', 'start') + `<circle cx="900" cy="185" r="16" fill="${K.red}" opacity="${Math.floor(t * 1.6) % 2 ? .2 : 1}"/>` + tx('REC', 990, 200, 40, '#d8ffe8', 'end');
  s += tx(ts, 80, 1380, 46, '#d8ffe8', 'start');
  return s;
}
function sCctv1(t, l) { return elevator(t, l) + cctvOv(t, 'CAM 04', '19:42:0' + Math.floor(3 + l)); }
function sTower(t, l) {
  const p = prog(l, .8, 2.9), cur = Math.max(1, Math.round(1 + 40 * eio(p)));
  let s = `<rect width="1080" height="1920" fill="#080d18"/><rect x="0" y="1370" width="1080" height="200" fill="#0b121f"/>`;
  s += tower(t, { f0: 1, f1: 41, x0: 330, x1: 750, cell: (f, y, h, tt, x0, x1) => {
    let q = ''; for (let c = 0; c < 4; c++) { const on = hash(f * 7 + c * 3) > .35; q += `<rect x="${x0 + 80 + c * 62}" y="${y + 4}" width="46" height="${h - 8}" fill="${on ? K.amb : '#101a2d'}" opacity="${on ? .85 : 1}"/>`; }
    return q;
  } });
  const my = fy(cur, 1, 41) + 14;
  s += `<rect x="338" y="${my - 14}" width="44" height="26" fill="#e7fff4"/><rect x="330" y="${my - 15 + 14}" width="60" height="${1370 - my - 3}" fill="#e7fff4" opacity=".08"/>`;
  s += tx(String(cur), 900, 520, 150, K.amb, 'middle');
  if (l > 2.7) s += `<path d="M 420 150 L 660 150" stroke="${K.red}" stroke-width="8" opacity="${hash(Math.floor(t * 10)) > .5 ? 1 : .2}"/>`;
  return s;
}
function sCctv2(t, l) {
  const z = 1.25 + l * .02;
  let s = `<g transform="translate(540 800) scale(${z}) translate(-540 -800)">` + elevator(t + 9, l + 1.5) + `</g>`;
  if (l > 1.5 && l < 1.8) s += `<rect y="${600 + hash(Math.floor(t * 30)) * 300}" width="1080" height="40" fill="#cfffe8" opacity=".25"/>`;
  return s + cctvOv(t, 'CAM 04', '19:42:11');
}
function sMonitors(t, l) {
  let s = `<rect width="1080" height="1920" fill="#06090f"/>`;
  const cams = [[60, 200], [560, 200], [60, 720], [560, 720]];
  cams.forEach((c, i) => {
    s += `<g transform="translate(${c[0]} ${c[1]})"><rect width="460" height="480" rx="14" fill="#000" ${OL}/><clipPath id="mon${i}"><rect x="6" y="6" width="448" height="468" rx="10"/></clipPath><g clip-path="url(#mon${i})">`;
    if (i === 1) s += `<g transform="translate(-130 -160) scale(.6)">${elevator(t + 2, l + 5)}</g>`;
    else { s += `<rect width="460" height="480" fill="#0e1f1b"/>`; for (let k = 0; k < 6; k++) s += `<rect x="${hash(i * 9 + k + Math.floor(t * 3)) * 360}" y="${hash(k * 4 + i) * 440}" width="${40 + hash(k + i) * 60}" height="8" fill="#2d5a4b" opacity=".6"/>`; s += `<polygon points="150,480 310,480 280,200 180,200" fill="#16312a"/>`; }
    s += `<rect width="460" height="480" fill="#0a2a22" opacity=".25"/></g><rect x="6" y="6" width="448" height="468" rx="10" fill="none" stroke="${i === 1 ? K.red : '#26384a'}" stroke-width="${i === 1 ? 8 : 3}"/></g>`;
  });
  s += `<circle cx="640" cy="260" r="12" fill="${K.red}" opacity="${Math.floor(t * 1.6) % 2 ? .2 : 1}"/>` + tx('REC', 720, 274, 30, '#d8ffe8', 'start');
  const px = 540, py = 1290;
  s += `<rect x="40" y="1260" width="1000" height="40" fill="#1a2433"/>`;
  s += `<g transform="translate(${px - 80} ${py + 30})"><rect x="-70" y="-30" width="140" height="60" rx="10" fill="#222c3b" ${OL}/><circle cx="60" cy="0" r="22" fill="#0a0d14" ${OL}/><circle cx="60" cy="0" r="8" fill="${K.red}" opacity="${Math.floor(t * 1.6) % 2 ? 1 : .3}"/></g>`;
  return s;
}

// ---------- exits / people ----------
function sSealed(t, l) {
  let s = `<rect width="1080" height="1920" fill="#070b14"/><rect y="1130" width="1080" height="400" fill="#0d1523"/>`;
  s += `<rect x="40" y="440" width="940" height="690" fill="#16233a" ${OL}/>`;
  const lights = Math.floor(t * 5) % 2;
  s += `<circle cx="140" cy="360" r="40" fill="${lights ? K.red : '#3b1016'}"/><circle cx="940" cy="360" r="40" fill="${lights ? '#3b1016' : '#2f6cf0'}"/>`;
  const ts = [.8, 3.9, 4.8];
  [0, 1, 2].forEach(i => {
    const x = 70 + i * 290, p = eout(prog(l, ts[i], ts[i] + .35));
    s += `<rect x="${x}" y="560" width="260" height="560" fill="#0a111e" ${OL}/><rect x="${x + 20}" y="580" width="220" height="520" fill="#7fa6c9" opacity=".18"/>`;
    s += `<rect x="${x + 4}" y="${564}" width="252" height="${552 * p}" fill="#3b4553" ${OL} stroke-width="4"/>`;
    if (p > 0) for (let k = 0; k < 10; k++) s += `<path d="M ${x + 6} ${564 + k * 56} h 248" stroke="#27303c" stroke-width="5"/>`;
    const ex = l > 5.4 + i * .25;
    s += `<rect x="${x + 70}" y="490" width="120" height="50" rx="8" fill="${ex ? '#7a1020' : '#1c7a4a'}" ${OL} stroke-width="4"/>${tx(ex ? '✕' : '→', x + 130, 530, 38, '#fff')}`;
  });
  if (l > .3) s += tx(`30'`, 540, 300, 120, K.amb, 'middle', cl(prog(l, .3, .6)));
  return s;
}
function sWindows(t, l) {
  let s = `<rect width="1080" height="1920" fill="#080d18"/>`;
  const cnt = Math.round(600 * eio(prog(l, .6, 2.5)));
  for (let r = 0; r < 7; r++) for (let c = 0; c < 4; c++) {
    const x = 130 + c * 200, y = 560 + r * 120, id = r * 4 + c, hot = l > 3.4 && hash(id * 5 + Math.floor(t * 2)) > .55;
    s += `<rect x="${x}" y="${y}" width="170" height="100" rx="6" fill="${hot ? '#5a1522' : '#1c2842'}" ${OL} stroke-width="4"/><rect x="${x + 6}" y="${y + 6}" width="158" height="88" fill="${hot ? '#a02a3a' : '#e9a640'}" opacity="${.35 + .4 * hash(id)}"/>`;
    s += `<circle cx="${x + 85}" cy="${y + 50}" r="17" fill="${K.ol}" opacity=".8"/><path d="M ${x + 50} ${y + 98} Q ${x + 85} ${y + 54} ${x + 120} ${y + 98} Z" fill="${K.ol}" opacity=".8"/>`;
  }
  s += tx(cnt >= 600 ? '600+' : String(cnt), 540, 440, 200, K.amb);
  if (l > 3.2) { const k = 1 + .08 * Math.sin(l * 9); s += `<g transform="translate(540 1500) scale(${k})">${tx('?', 0, 0, 1, '#000', 'middle', 0)}</g>`; s += tx('?', 540, 520, 1, 'none'); s += `<g opacity="${cl(prog(l, 3.2, 3.5))}">${tx('?', 910, 700, 220, K.red, 'middle')}</g>`; }
  return s;
}

// ---------- corridor narrative ----------
function sSpeaker(t, l) {
  const d = [{ s: -1, z1: 1.3, z2: 3.2 }, { s: 1, z1: 1.3, z2: 3.2 }, { s: -1, z1: 3.6, z2: 5 }, { s: 1, z1: 3.8, z2: 5 }];
  const peek = i => prog(l, 1.5 + i * .3, 2.2 + i * .3) * (1 - prog(l, 4.5 + i * .5, 4.8 + i * .5)) * .07;
  d.forEach((x, i) => { x.op = peek(i); x.col = '#2c3e5c'; });
  const alarm = (Math.sin(t * 6) * .5 + .5);
  let s = corr(t, { doors: d, dim: .6, flick: l > 5.5 });
  s += `<rect width="1080" height="1920" fill="${K.red}" opacity="${.1 * alarm}"/>`;
  const sp = ring(l, 0, 0, 0);
  s += `<g transform="translate(540 330)"><rect x="-150" y="-60" width="300" height="120" rx="22" fill="#cfd8e6" ${OL}/><circle cx="0" cy="0" r="46" fill="#222c3b" ${OL}/><circle cx="0" cy="0" r="18" fill="#0a0d14"/></g>`;
  for (let k = 0; k < 4; k++) { const p = ((l * 1.2 + k * .25) % 1); s += `<path d="M ${540 - 90 - p * 260} ${330 + 130 + p * 330} Q 540 ${330 + 260 + p * 400} ${540 + 90 + p * 260} ${330 + 130 + p * 330}" fill="none" stroke="${K.amb}" stroke-width="${10 * (1 - p)}" opacity="${.7 * (1 - p)}"/>`; }
  [[-1, 1.3, 3.2], [1, 1.3, 3.2], [-1, 3.6, 5], [1, 3.8, 5]].forEach((q, i) => {
    const pp = peek(i); if (pp > .01) { const z = (q[1] + q[2]) / 2, ex = cX(q[0] * CW, q[1] + (q[2] - q[1]) * pp * 2), ey = cY(120, z); s += `<ellipse cx="${ex - q[0] * 8}" cy="${ey}" rx="${14 / z * 1.6}" ry="${10 / z * 1.6}" fill="#f4f1ea"/>`; }
  });
  return peepless(s);
}
const peepless = s => s;
function sInfHall(t, l) {
  let s = corr(t, { flick: true, dim: .5 });
  const pos = [[.3, 5.5, -150, '#6a3a46', '#2b3340'], [1.5, 4.7, 130, '#44566a', '#3b2b2b'], [2.4, 3.9, -40, '#5f6a4a', '#2b2b3a'], [3.0, 3.2, 200, '#7a5a3a', '#2a3340']];
  pos.forEach((q, i) => {
    const p = eout(prog(l, q[0], q[0] + 1.2)); if (p <= 0) return;
    const z = lerp(q[1] + 1.4, q[1], p);
    s += fig(z, q[2], { col: q[3], pants: q[4], inf: 1, walk: 1, ph: t * 5 + i, lean: 6 * Math.sin(t * 3 + i), aL: 24, aR: -24, h: { inf: 1, tilt: tw(t, i), m: 'open', lx: 0 } });
  });
  s += `<rect width="1080" height="1920" fill="${K.red}" opacity="${.06 + .05 * Math.sin(t * 7)}"/>`;
  return s;
}
function sTowerDiag(t, l) {
  const f0 = 25, f1 = 38, h = 1160 / 14;
  let s = `<rect width="1080" height="1920" fill="#080d18"/>`;
  s += tower(t, { f0, f1, x0: 340, x1: 760, heat: (f, tt) => (f >= 30 && l > 3.2 && f <= 30 + Math.floor((l - 3.2) * 2.2)) ? .5 + .3 * Math.sin(tt * 6 + f) : 0 });
  const y28 = fy(28, f0, f1), y35 = fy(35, f0, f1), pa = back(prog(l, 1.2, 1.6)), pb = back(prog(l, 4.2, 4.6));
  s += `<rect x="342" y="${y28 + 2}" width="416" height="${h - 4}" fill="${K.amb}" opacity="${.25 * pa}"/><rect x="342" y="${y35 + 2}" width="416" height="${h - 4}" fill="#ff8fb0" opacity="${.25 * pb}"/>`;
  s += `<g transform="translate(560 ${y28 + h - 6}) scale(${.34 * pa})">${body(0, 0, 1, { col: '#5a7596', h: { hair: '#1b1410', br: 1 } })}</g>`;
  s += `<g transform="translate(560 ${y35 + h - 6}) scale(${.27 * pb})">${body(0, 0, 1, { col: '#d98aa0', h: { hair: '#2a1d18', long: '#2a1d18', br: 1.2 } })}</g>`;
  s += tx('28', 220, y28 + h * .75, 100 * pa, K.amb) + tx('35', 220, y35 + h * .75, 100 * pb, '#ff8fb0');
  if (pb > .5) s += `<path d="M 790 ${y28 + h / 2} H 840 V ${y35 + h / 2} H 790" fill="none" stroke="#c7d4ea" stroke-width="6" stroke-dasharray="14 12" stroke-dashoffset="${-l * 70}" opacity=".7"/>`;
  if (l > 1.7) {
    for (let k = 0; k < 3; k++) { const p = (l * .9 + k / 3) % 1; s += `<circle cx="560" cy="${y28 + h / 2}" r="${30 + p * 230}" fill="none" stroke="${K.amb}" stroke-width="${8 * (1 - p)}" opacity="${.6 * (1 - p)}"/>`; }
    for (let k = 0; k < 4; k++) { const p = (l * .55 + k * .25) % 1; s += `<circle cx="${800 + (k % 2) * 22}" cy="${lerp(y28 + h, y35, p)}" r="11" fill="${K.red}" opacity="${Math.sin(p * Math.PI)}"/>`; }
    for (let f = 29; f <= 34; f++) if (hash(f * 3 + Math.floor(t * 6)) > .6) s += `<rect x="342" y="${fy(f, f0, f1) + 2}" width="416" height="${h - 4}" fill="${K.red}" opacity=".18"/>`;
  }
  return s;
}
function callMacro(t, l) {
  const k = l - 1.9, sh = [Math.sin(t * 37) * 2.5, Math.cos(t * 29) * 2.5], sig = Math.max(1, 4 - Math.floor(k * 1.1));
  let s = `<rect width="1080" height="1920" fill="#0b1220"/><ellipse cx="540" cy="800" rx="470" ry="520" fill="${K.cold}" opacity=".07"/>`;
  const bars = [0, 1, 2, 3, 4, 5, 6, 7, 8].map(i => `<rect x="${-62 + i * 14}" y="${40 - (10 + 46 * Math.abs(Math.sin(l * 11 + i * 1.3))) / 2}" width="9" height="${10 + 46 * Math.abs(Math.sin(l * 11 + i * 1.3))}" rx="4" fill="${K.amb}"/>`).join('');
  const sg = [0, 1, 2, 3].map(i => `<rect x="${30 + i * 11}" y="${-136 - i * 6}" width="7" height="${8 + i * 6}" fill="${i < sig ? '#c7d4ea' : '#2a3548'}"/>`).join('');
  const inner = `<rect x="-78" y="-154" width="156" height="308" fill="#0e1b2a"/><circle cx="0" cy="-70" r="38" fill="#2c3e5c"/>${sg}${bars}`;
  for (let i = 0; i < 3; i++) { const p = (l * 1.3 + i / 3) % 1; s += `<path d="M ${700 + p * 90} 600 Q ${760 + p * 110} 800 ${700 + p * 90} 1000" fill="none" stroke="${K.amb}" stroke-width="${9 * (1 - p)}" opacity="${.7 * (1 - p)}" stroke-linecap="round"/>`; }
  s += handHold(540 + sh[0], 800 + sh[1], 2.4, -4, inner);
  if (k > 1.5) s += `<rect y="${200 + hash(Math.floor(t * 25)) * 1000}" width="1080" height="26" fill="#fff" opacity=".12"/>`;
  return s;
}
function sCall(t, l) {
  if (l >= 1.9 && l <= 3.9) return callMacro(t, l);
  const cut = l > 3.9, sh = cut ? shk(t, 43.72 + 3.9, 10, 7) : [0, 0];
  let s = `<rect width="1080" height="1920" fill="#0b1220"/><rect x="0" y="1100" width="1080" height="500" fill="#0e1626"/><rect x="620" y="260" width="300" height="400" fill="#16233a" ${OL}/><path d="M 770 260 V 660 M 620 460 H 920" stroke="${K.ol}" stroke-width="8"/>`;
  s += `<g transform="translate(${sh[0]} ${sh[1]})">`;
  const arm = cut ? eio(prog(l, 4.0, 4.6)) : 0;
  s += `<g transform="translate(470 ${1250 + 10 * arm})">` + body(14 * Math.sin(l * 3) * (cut ? 0 : 1), 0, 1.55, { col: '#5a7596', aL: 150 - 120 * arm + (cut ? 0 : 7 * Math.sin(l * 5)), aR: -8, hdy: cut ? 0 : 6 * Math.sin(l * 7), h: { hair: '#1b1410', br: cut ? 1.4 : .8, m: cut ? 'o' : (Math.floor(l * 7) % 2 ? 'worried' : 'o'), lx: cut ? 10 : 0, bl: blink(t), es: cut ? 1.2 : 1 } }) + `</g>`;
  s += `<g transform="translate(750 ${520 + 40 * arm}) rotate(${-20 * arm})"><rect x="-44" y="-86" width="88" height="172" rx="14" fill="#0e131d" ${OL}/><rect x="-36" y="-76" width="72" height="150" rx="8" fill="${cut ? '#2a0a10' : '#12202e'}"/>${cut ? tx('✕', 0, 20, 70, K.red) : `<circle cx="0" cy="-8" r="${14 + 4 * Math.sin(t * 9)}" fill="${K.amb}"/>`}</g>`;
  for (let k = 0; k < 4; k++) s += `<rect x="${860 + k * 22}" y="${300 - k * 14}" width="12" height="${20 + k * 14}" fill="${cut ? '#3b1016' : K.amb}" opacity="${cut ? .6 : .9}"/>`;
  s += `</g>`;
  if (cut) s += `<rect y="${200 + hash(Math.floor(t * 25)) * 1000}" width="1080" height="30" fill="#fff" opacity=".15"/>`;
  s += tx('28', 130, 260, 90, K.amb);
  return s;
}
function doorIn(x, y, w, h, t, o = {}) {
  const j = o.j || 0;
  return `<g transform="translate(${x + j} ${y})"><rect x="-14" y="-14" width="${w + 28}" height="${h + 14}" fill="#0a111e" ${OL}/><rect width="${w}" height="${h}" fill="#34405a" ${OL}/>
    <rect x="${w * .15}" y="${h * .1}" width="${w * .7}" height="${h * .32}" fill="#2b3650" ${OL} stroke-width="4"/><rect x="${w * .15}" y="${h * .5}" width="${w * .7}" height="${h * .4}" fill="#2b3650" ${OL} stroke-width="4"/>
    <circle cx="${w / 2}" cy="${h * .08}" r="14" fill="#c7a86a" ${OL} stroke-width="4"/>
    <rect x="${w * .1}" y="${h * .45}" width="70" height="24" rx="8" fill="#b9b2a2" ${OL} stroke-width="4"/><rect x="${w * .1}" y="${h * .53}" width="${w * .18}" height="50" rx="8" fill="#b9b2a2" ${OL} stroke-width="4"/>
    <g transform="translate(${w * .88} ${h * .5}) rotate(${o.hr || 0} -40 0)"><rect x="-130" y="-14" width="150" height="28" rx="14" fill="#cfd4dc" ${OL}/><circle cx="-130" cy="0" r="22" fill="#cfd4dc" ${OL}/></g>
    <path d="M ${w * .1 + 70} ${h * .465} Q ${w * .5} ${h * .5 + 40} ${w * .87} ${h * .45}" fill="none" stroke="#c7a86a" stroke-width="7"/>
    <rect x="0" y="${h - 14}" width="${w}" height="14" fill="${K.amb}" opacity="${o.gap ?? .5}"/></g>`;
}
function sRule1(t, l) {
  const k = [3.3, 4.2, 4.9].map(a => shk(l, a, 8, 9));
  let s = `<rect width="1080" height="1920" fill="#080d16"/><rect y="1380" width="1080" height="300" fill="#0d1523"/>`;
  const j = k.reduce((a, b) => a + b[0], 0);
  s += doorIn(280, 740, 520, 640, t, { j, gap: .5, hr: 0 });
  [3.3, 4.2, 4.9].forEach(a => { const p = prog(l, a, a + .6); if (p > 0 && p < 1) s += `<circle cx="540" cy="1000" r="${60 + p * 380}" fill="none" stroke="${K.amb}" stroke-width="${8 * (1 - p)}" opacity="${.6 * (1 - p)}"/>`; });
  if (l > 3.0) s += `<path d="M 300 1380 q 40 -50 80 0 M 360 1380 q 10 -26 30 0" fill="${K.ol}" opacity=".7"/>`;
  return s + card(l, .2, '01', 'TÜR NICHT ÖFFNEN', icon1);
}
function sStairs(t, l) {
  let s = `<rect width="1080" height="1920" fill="#090f1b"/><rect y="1300" width="1080" height="300" fill="#0d1523"/>`;
  const walk = eio(prog(l, 1.0, 2.2)), freeze = l > 3.0;
  s += doorIn(560, 520, 420, 780, t, { gap: .3 });
  s += body(300 + 40 * walk, 1300, 1.0, { col: '#5a7596', walk: !freeze && walk < 1 ? 1 : 0, ph: t * 7, lean: freeze ? -4 : 0, aL: 14, aR: -14, h: { hair: '#1b1410', lx: 14, br: freeze ? 1.2 : .2, m: freeze ? 'o' : 'flat', bl: blink(t), tilt: freeze ? 4 : 0 } });
  const ar = prog(l, .2, 1.0) * (1 - prog(l, 2.1, 2.4));
  if (ar > 0) s += `<g opacity="${ar}" transform="translate(250 ${340 + 14 * Math.sin(l * 6)})"><path d="M -40 -50 H 40 V 10 H 80 L 0 90 L -80 10 H -40 Z" fill="${K.amb}" ${OL}/></g>`;
  [3.0, 3.35, 3.9].forEach(a => { const p = prog(l, a, a + 1); if (p > 0 && p < 1) s += `<circle cx="780" cy="760" r="${30 + p * 360}" fill="none" stroke="${K.red}" stroke-width="${9 * (1 - p)}" opacity="${.7 * (1 - p)}"/>`; });
  if (l > 3.0) s += `<rect width="1080" height="1920" fill="${K.red}" opacity="${.07 + .06 * Math.sin(l * 10)}"/>`;
  return s;
}
function pview(t, id, fn, o) { return peep(fn, t, { id, pulse: o }); }
function sPeep1(t, l) {
  const d = [{ s: -1, z1: 1.8, z2: 3.4 }, { s: 1, z1: 2.4, z2: 4.0 }, { s: -1, z1: 4.2, z2: 5.6 }];
  const p = prog(l, .3, 3.2), z = lerp(5.2, 1.7, ein(p) * .5 + p * .5);
  let s = corr(t, { doors: d, flick: l > 1 });
  s += fig(z, lerp(-60, 90, p), { col: '#cbd0d8', pants: '#2c3340', blood: [[-30, -390, 36], [40, -300, 24]], walk: 1, ph: t * 11, lean: 5 * Math.sin(t * 11), aL: 55 + 10 * Math.sin(t * 11), aR: -55, h: { hair: '#2a1d18', br: 1.6, m: 'open', es: 1.3, tilt: 0 } });
  return pview(t, 1, s);
}
function sPeep2(t, l) {
  const d = [{ s: -1, z1: 1.8, z2: 3.4 }, { s: 1, z1: 2.4, z2: 4.0 }, { s: -1, z1: 4.2, z2: 5.6 }];
  let s = corr(t, { doors: d, flick: true });
  const run = prog(l, 0, 4.4), z1 = lerp(1.6, 1.3, run);
  s += fig(z1, 100 - 30 * run, { col: '#cbd0d8', pants: '#2c3340', blood: [[-30, -390, 36]], walk: 1, ph: t * 11, lean: 8, aL: 60, aR: -60, k: 1, h: { hair: '#2a1d18', br: 1.6, m: 'open', es: 1.3 } });
  const w = prog(l, .8, 4.2), zz = lerp(5.4, 2.6, eio(w));
  s += fig(zz, lerp(-200, -30, w), { col: '#6b3b52', pants: '#2b2b3a', inf: 1, walk: 1, ph: t * 9, aL: 40, aR: -40, h: { inf: 1, tilt: tw(t, 2) * 1.2, m: 'open', long: '#3a1f1f', ly: 4 } });
  return pview(t, 2, s);
}
function sPeep3(t, l) {
  const d = [{ s: -1, z1: 1.8, z2: 3.4 }, { s: 1, z1: 2.4, z2: 4.0 }, { s: -1, z1: 4.2, z2: 5.6 }];
  const dark = l > 2.2 ? 1 : 0, g = prog(l, .3, 1.0), fall = eio(prog(l, .9, 1.6));
  let s = corr(t, { doors: d, flick: l > 1.4, dim: dark ? .3 : 1, lit: dark ? .1 : 1 });
  const z = 2.2, sh = shk(t, 70.1, 6, 5);
  if (l < 2.2) {
    s += fig(z, 20 + 10 * fall, { col: '#cbd0d8', pants: '#2c3340', blood: [[-30, -390, 36]], lean: 85 * fall, aL: 120, aR: -120, h: { hair: '#2a1d18', br: 1.8, m: 'open', es: 1.4 }, k: 1 - .1 * fall });
    s += fig(lerp(2.6, 2.1, g), lerp(-100, -10, g), { col: '#6b3b52', pants: '#2b2b3a', inf: 1, lean: 24 * fall, aL: -90, aR: 90, h: { inf: 1, tilt: tw(t, 2), m: 'open', long: '#3a1f1f' } });
  } else {
    s += `<rect width="1080" height="1920" fill="${K.red}" opacity=".08"/>`;
    s += `<g opacity=".8"><ellipse cx="560" cy="1100" rx="220" ry="26" fill="${K.blood}" opacity=".5"/></g>`;
  }
  s += `<rect width="1080" height="1920" fill="#000" opacity="${dark ? .35 : 0}"/>`;
  return `<g transform="translate(${sh[0]} ${sh[1]})">${pview(t, 3, s)}</g>`;
}
function sBack(t, l) {
  const p = back(prog(l, .3, 1.2)), q = prog(l, 2.3, 3.2);
  let s = `<rect width="1080" height="1920" fill="#0a101c"/><rect y="1180" width="1080" height="400" fill="#0d1523"/>`;
  s += doorIn(70 + 0, 380, 260, 800, t, { gap: .2 });
  const sc = lerp(2.6, 2.0, p), hx = lerp(640, 600, p);
  s += `<g transform="translate(${hx} ${lerp(820, 880, p)})">` + head(0, 0, sc, { hair: '#1b1410', br: lerp(1.7, .2, q), m: q > .6 ? 'flat' : 'o', es: lerp(1.35, 1, q), lx: lerp(0, -20, q), ly: lerp(0, 8, q), tilt: lerp(-10, 6, q) * (1 - q * .5), sweat: l, bl: blink(t) }) + `</g>`;
  s += `<path d="M 330 1110 q 120 -90 230 0 v 300 h -230 Z" fill="#5a7596" ${OL}/>`;
  const hp = back(prog(l, .4, .9));
  s += `<g transform="translate(${lerp(650, 640, hp)} ${lerp(1250, 1060, hp)})"><circle r="48" fill="${K.skin}" ${OL}/>${[-30, -10, 10, 30].map(x => `<rect x="${x - 9}" y="-66" width="18" height="48" rx="9" fill="${K.skin}" ${OL} stroke-width="4"/>`).join('')}</g>`;
  return s;
}
function sEar(t, l) {
  const open = l > .9 ? 1 : 0, snap = prog(l, .9, 1.05);
  let s = `<rect width="1080" height="1920" fill="#08090f"/>`;
  s += `<rect width="1080" height="1920" fill="${K.red}" opacity="${.05 + .05 * open}"/>`;
  s += `<g transform="translate(0 ${60})">` + head(540, 760, 3.2, { inf: 1, shut: !open, tilt: -16 + 4 * snap + tw(t, 5) * .2, m: 'open', lx: open ? -16 : 0, ly: 0 }) + `</g>`;
  for (let k = 0; k < 4; k++) { const p = ((l * 1.3 + k * .27) % 1); s += `<path d="M ${130 + p * 190} 560 Q ${70 + p * 150} 760 ${130 + p * 190} 960" fill="none" stroke="${K.amb}" stroke-width="${12 * (1 - p)}" opacity="${.8 * (1 - p)}" stroke-linecap="round" transform="translate(${-200 + p * 150} 0)"/>`; }
  s += `<g transform="translate(190 780)"><circle r="46" fill="${K.amb}" opacity="${.25 + .1 * Math.sin(l * 12)}"/></g>`;
  return s;
}
function sRule2(t, l) {
  const beat = 1 + .015 * Math.sin(l * 9) * Math.sin(l * 9);
  let s = `<rect width="1080" height="1920" fill="#06080f"/>`;
  s += `<g transform="translate(540 1000) scale(${beat})"><circle r="260" fill="#0d1523"/><circle r="200" fill="#111b2e"/></g>`;
  s += phone(540, 1020, 1.5, 0, `<rect x="-78" y="-154" width="156" height="308" fill="#0a0e18"/>${bell(0, -10, 2.2, '#c7d4ea')}<path d="M -60 -70 L 60 50" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/>`, 0);
  return s + card(l, .2, '02', 'NICHT AUFFALLEN', icon2);
}
function sDark(t, l) {
  const off = prog(l, .9, 1.0), sw = l > 1.0 ? 1 : 0;
  let s = `<rect width="1080" height="1920" fill="#10182a"/><rect x="0" y="0" width="1080" height="1920" fill="#2c3e5c" opacity="${.5 * (1 - off)}"/>`;
  if (l < 1.9) {
    s += `<rect x="300" y="500" width="480" height="720" rx="30" fill="#e8e4d8" ${OL}/><rect x="380" y="620" width="320" height="480" rx="20" fill="#cfcabd" ${OL} stroke-width="4"/>`;
    s += `<rect x="470" y="${sw ? 780 : 700}" width="140" height="${sw ? 220 : 220}" rx="14" fill="${sw ? '#777' : '#fff'}" ${OL} transform="translate(0 ${sw ? 0 : 0})"/>`;
    const hx = lerp(280, 520, eout(prog(l, 0, .8))); s += `<g transform="translate(${hx} ${sw ? 1020 : 1000}) rotate(-90)"><circle r="52" fill="${K.skin}" ${OL}/><rect x="-10" y="0" width="150" height="70" rx="30" fill="#5a7596" ${OL} transform="translate(30 -35)"/></g>`;
    s += `<rect width="1080" height="1920" fill="#000" opacity="${.9 * off}"/>`;
    s += `<rect x="470" y="600" width="140" height="30" fill="${K.amb}" opacity="${.5 * off}"/>`;
  } else if (l < 3.2) {
    const m = eio(prog(l, 2.2, 2.7));
    s = `<rect width="1080" height="1920" fill="#030509"/>` + phone(540, 820, 2.2, 0, `<rect x="-78" y="-154" width="156" height="308" fill="#0d1523"/>${bell(0, -60, 1.7, '#c7d4ea')}<rect x="-50" y="60" width="100" height="44" rx="22" fill="${m > .5 ? K.red : '#46556f'}"/><circle cx="${lerp(-28, 28, m)}" cy="82" r="18" fill="#fff"/>${m > .5 ? `<path d="M -60 -100 L 60 20" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/>` : ''}`, .5);
  } else {
    const p = eio(prog(l, 3.2, 4.1));
    s = `<rect width="1080" height="1920" fill="#02040a"/><rect x="200" y="1360" width="680" height="60" fill="#0a1020"/>`;
    s += `<g opacity=".95">${body(lerp(250, 650, p), 1360, 1.2, { col: '#2a3a52', pants: '#161d2a', walk: 1, ph: l * 5, aL: 12, aR: -12, h: { hair: '#10141c', lx: 10, br: .8 } })}</g>`;
    s += doorIn(740, 480, 280, 880, t, { gap: .15 });
    s += `<circle cx="880" cy="640" r="10" fill="${K.cold}" opacity=".9"/><ellipse cx="880" cy="650" rx="60" ry="46" fill="${K.cold}" opacity=".12"/>`;
  }
  return s;
}
function sThree(t, l) {
  const d = [{ s: -1, z1: 1.8, z2: 3.4 }, { s: 1, z1: 2.4, z2: 4.0 }, { s: -1, z1: 4.2, z2: 5.6 }];
  let s = corr(t, { doors: d, flick: true, dim: .6 });
  const stops = [[.2, 1], [1.4, 2], [3, 3]];
  [[-300, 5.6, '#6a3a46', 0], [60, 4.3, '#44566a', 1], [-120, 3.4, '#5f6a4a', 2]].forEach((q, i) => {
    const pr = prog(l, 0 + i * .35, 4.4), z = lerp(q[1] + .6, q[1] - 1.1 + i * .2, eio(pr));
    const listen = Math.sin(l * 2 + i) > .4 ? 1 : 0;
    s += fig(z, q[0], { col: q[2], pants: '#2b2b3a', inf: 1, walk: 1, ph: l * 4 + i * 2, lean: listen ? 14 * (i % 2 ? -1 : 1) : 4, aL: 30, aR: -30, h: { inf: 1, tilt: listen ? 28 * (i % 2 ? -1 : 1) : tw(t, i) * .4, m: 'flat', shut: listen } });
  });
  return pview(t, 4, s);
}
function sEye(t, l) {
  const dart = eio(prog(l, 1.9, 2.2)), nerv = Math.sin(l * 30) * 1.2 * (l > 2 ? 1 : 0);
  let s = `<rect width="1080" height="1920" fill="#0b101a"/>`;
  s += `<circle cx="540" cy="780" r="470" fill="#1c140e"/><circle cx="540" cy="780" r="440" fill="#26324a"/>`;
  s += `<circle cx="540" cy="780" r="340" fill="#0d1624" ${OL}/>`;
  s += `<g transform="translate(540 780)"><ellipse rx="230" ry="${150 * (1 - blink(t + 1.3))}" fill="#f4f1ea" ${OL}/><circle cx="${lerp(0, 90, dart) + nerv}" cy="0" r="${96 * (1 + .12 * Math.sin(l * 5))}" fill="#5b7a99" ${OL}/><circle cx="${lerp(0, 90, dart) + nerv}" cy="0" r="46" fill="${K.ol}"/><circle cx="${lerp(0, 90, dart) - 26}" cy="-30" r="16" fill="#fff"/>
    <path d="M -250 -170 Q 0 -300 250 -150 L 270 -190 Q 0 -350 -270 -210 Z" fill="#1b1410" ${OL}/>
    <path d="M -230 -40 Q 0 -190 230 -40" fill="none" stroke="${K.ol}" stroke-width="22" transform="translate(0 -110) scale(1 .6)"/></g>`;
  s += `<path d="M 310 440 Q 540 330 770 440" fill="none" stroke="#1b1410" stroke-width="40" stroke-linecap="round" transform="translate(0 ${-30 + 24 * Math.sin(l * 4)})"/>`;
  s += `<path d="M 790 1020 q 14 36 0 48 q -22 -16 0 -48 Z" fill="#a9d4f2" opacity=".8"/>`;
  s += `<circle cx="540" cy="780" r="470" fill="none" stroke="#b39a6b" stroke-width="22"/>`;
  return s;
}
function sRule3(t, l) {
  let s = `<rect width="1080" height="1920" fill="#06080f"/>`;
  s += `<rect x="130" y="760" width="320" height="660" fill="#16233a" ${OL}/><rect x="630" y="760" width="320" height="660" fill="#0a111e" ${OL}/>`;
  const op = prog(l, 1.2, 1.8), pk = .1 * op;
  s += `<rect x="630" y="760" width="${320 * (1 - pk)}" height="660" fill="#2c3e5c" ${OL}/><rect x="${630 + 320 * (1 - pk)}" y="760" width="${320 * pk}" height="660" fill="${K.amb}"/>`;
  if (op > 0) s += `<ellipse cx="${630 + 320 * (1 - pk) + 8}" cy="1010" rx="12" ry="${10 * Math.min(1, op * 2)}" fill="#f4f1ea"/>`;
  s += `<circle cx="${130 + 60}" cy="1090" r="10" fill="${K.amb}"/>`;
  return s + card(l, .2, '03', 'NIEMANDEM VERTRAUEN', icon3);
}
// ---------- opposite apartment (side-on corridor) ----------
const FLY = 1230;
const INFC = ['#6a3a46', '#44566a', '#5f6a4a'];
function sideStage(t, o = {}) {
  let s = `<rect width="1080" height="1920" fill="#0a111e"/><rect y="${FLY}" width="1080" height="700" fill="#0d1523"/><rect y="${FLY - 4}" width="1080" height="8" fill="#1b2740"/>`;
  [220, 600, 960].forEach((x, i) => { const on = o.flick ? (hash(Math.floor(t * 12) + i * 5) > .3 ? 1 : .25) : 1; s += `<rect x="${x - 100}" y="260" width="200" height="16" rx="8" fill="#dfe9ff" opacity="${.55 * on}"/><polygon points="${x - 100},276 ${x + 100},276 ${x + 240},${FLY} ${x - 240},${FLY}" fill="#9fc0ff" opacity="${.04 * on}"/>`; });
  return s + doorIn(40, FLY - 820, 300, 820, t, { gap: o.agap ?? .5 });
}
function infCrowd(t, xs, o = {}) {
  return xs.map((x, i) => body(x, FLY + 24 + (i % 2) * 18, .8, { col: INFC[i % 3], pants: '#2b2b3a', inf: 1, walk: o.walk, ph: t * 4 + i * 2, lean: (o.lean?.[i] ?? 3 * Math.sin(t * 2 + i)), aL: 24, aR: -24, h: { inf: 1, glow: 1, m: 'open', shut: o.shut, tilt: o.tilt?.[i] ?? tw(t, i) * .5 } })).join('');
}
// neighbour's door in local coords: frame x 0..320, bottom y 0, hinge on the right; a = opening angle (deg)
function nDoor(a, inner, o = {}) {
  const w = 320, h = 820, c = Math.cos(a * Math.PI / 180), fx = w - w * c, e = 40 * (1 - c), id = 'nd' + (o.id || 0);
  const L = (u, v) => `${lerp(fx, w, u).toFixed(1)},${lerp(lerp(-h - e, -h, u), lerp(e, 0, u), v).toFixed(1)}`;
  let s = `<rect x="-14" y="${-h - 14}" width="${w + 28}" height="${h + 14}" fill="${K.ol}"/><rect x="0" y="${-h}" width="${w}" height="${h}" fill="#150d07"/>`;
  s += `<clipPath id="${id}"><rect x="0" y="${-h}" width="${w}" height="${h}"/></clipPath><g clip-path="url(#${id})"><rect x="0" y="${-h}" width="${w}" height="${h}" fill="${K.amb}" opacity=".1"/>${inner}<rect x="0" y="-26" width="${w}" height="26" fill="${K.amb}" opacity=".35"/></g>`;
  s += `<polygon points="${L(0, 0)} ${L(1, 0)} ${L(1, 1)} ${L(0, 1)}" fill="#34405a" ${OL} stroke-width="5"/>`;
  s += `<polygon points="${L(.15, .08)} ${L(.85, .08)} ${L(.85, .42)} ${L(.15, .42)}" fill="#2b3650" ${OL} stroke-width="4"/><polygon points="${L(.15, .5)} ${L(.85, .5)} ${L(.85, .92)} ${L(.15, .92)}" fill="#2b3650" ${OL} stroke-width="4"/>`;
  const [kx, ky] = L(.1, .5).split(',').map(Number);
  s += `<circle cx="${kx}" cy="${ky}" r="${14 * (.5 + .5 * c)}" fill="#c7a86a" ${OL} stroke-width="4"/>`;
  const [px, py] = L(.5, .2).split(',').map(Number);
  s += `<circle cx="${px}" cy="${py}" r="9" fill="#06080d" stroke="#b39a6b" stroke-width="5"/>`;
  return s;
}
function nMan(t, x, o = {}) {
  return body(x, 0, 1.05, { col: '#8a6a4a', pants: '#262f3f', aL: 10, aR: -10, h: { hair: '#3a2a1c', br: o.br ?? 1, m: o.m || 'worried', es: o.es || 1.1, lx: o.lx ?? -12, ly: o.ly || 0, bl: blink(t), sweat: t, tilt: o.tilt || 0 } });
}
function nStage(t, a, man, o = {}) { return `<g transform="translate(640 ${FLY})">${nDoor(a, man, o)}</g>`; }

function sNeighbor(t, l) {
  const p = prog(l, 0, 3.4), e = eio(p), a = l < .5 ? 0 : 26 * eout(prog(l, .5, 1.1)) + 3 * Math.sin(l * 2.4);
  let s = sideStage(t, { flick: true });
  s += infCrowd(t, [lerp(-420, 560, e), lerp(-280, 450, e), lerp(-120, 340, e)], { walk: p < 1, shut: false });
  s += nStage(t, a, nMan(t, 55 + 4 * Math.sin(l * 2), { lx: lerp(-14, 4, e), br: 1.1, es: 1.15 }));
  s += `<rect width="1080" height="1920" fill="${K.red}" opacity="${.04 + .03 * Math.sin(t * 7)}"/>`;
  return s;
}
function sStop(t, l) {
  const w = eout(prog(l, 0, 1.4)), op = eout(prog(l, 1.7, 2.5)), a = 16 + 39 * op + (l > 2.5 ? 2 * Math.sin(l * 9) : 0), listen = l > 1.4;
  let s = sideStage(t, { flick: true });
  s += body(380, FLY + 24, .8, { col: INFC[0], pants: '#2b2b3a', inf: 1, aL: 24, aR: -24, lean: 4 * Math.sin(t * 2), h: { inf: 1, glow: 1, m: 'open', shut: true, tilt: tw(t, 1) * .5 } });
  s += body(470, FLY + 42, .8, { col: INFC[1], pants: '#2b2b3a', inf: 1, aL: 24, aR: -24, lean: -4 * Math.sin(t * 2), h: { inf: 1, glow: 1, m: 'open', shut: true, tilt: tw(t, 2) * .5 } });
  s += body(lerp(300, 585, w), FLY + 24, .8, { col: INFC[2], pants: '#2b2b3a', inf: 1, walk: w < 1 ? 1 : 0, ph: t * 5, lean: listen ? 12 : 4, aL: 30, aR: -30, h: { inf: 1, glow: 1, m: 'open', shut: l > 1.6, tilt: listen ? 30 + tw(t, 3) * .3 : 0 } });
  s += nStage(t, a, nMan(t, lerp(55, 80, op), { lx: -14, br: 1.4, es: 1.3, m: 'worried' }));
  const fx = 640 + 320 - 320 * Math.cos(a * Math.PI / 180);
  if (op > .2) s += `<g transform="translate(${fx - 6} ${FLY - 420})">${[0, 1, 2, 3].map(i => `<rect x="${-10 + i * 0}" y="${i * 34}" width="44" height="26" rx="13" fill="${K.skin}" ${OL} stroke-width="4"/>`).join('')}</g>`;
  s += `<rect width="1080" height="1920" fill="${K.red}" opacity="${.05 + .04 * Math.sin(t * 8)}"/>`;
  return s;
}
function handHold(x, y, sc, rot, inner) {
  const fingers = [0, 1, 2, 3].map(i => `<rect x="60" y="${-100 + i * 58}" width="120" height="48" rx="24" fill="${K.skin}" ${OL}/>`).join('');
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})">${fingers}<rect x="170" y="-130" width="420" height="200" rx="70" fill="#8a6a4a" ${OL}/><rect x="170" y="-130" width="40" height="200" fill="#6d553b"/>${inner ? phone(0, 0, 1, 0, inner, 0) : ''}<rect x="-118" y="40" width="112" height="46" rx="23" fill="${K.skin}" ${OL} transform="rotate(-22 -60 60)"/></g>`;
}
const wkInner = `<rect x="-78" y="-154" width="156" height="308" fill="#14100a"/><text x="0" y="40" text-anchor="middle" fill="${K.amb}" style="font-family:'Inter';font-weight:900;font-size:50px">21:08</text>`;
function sPhoneOut(t, l) {
  if (l < 1.8) {
    const e = eout(prog(l, .2, 1.0)), d = eio(prog(l, 1.0, 1.7));
    const H = [lerp(720, 540, e), lerp(FLY - 430, FLY - 400, e) + d * 420];
    let s = sideStage(t, { flick: true });
    s += infCrowd(t, [380, 470, 585], { shut: true });
    s += nStage(t, 55, nMan(t, 80, { lx: -14, br: 1.5, es: 1.3 }));
    s += `<path d="M 720 ${FLY - 470} L ${H[0]} ${H[1]}" stroke="${K.ol}" stroke-width="72" stroke-linecap="round" fill="none"/><path d="M 720 ${FLY - 470} L ${H[0]} ${H[1]}" stroke="#8a6a4a" stroke-width="58" stroke-linecap="round" fill="none"/>`;
    s += phone(H[0] - 36, H[1] - 6, .62, -8, wkInner + `${bell(0, -70, 1.1, K.red)}`, .8);
    s += `<circle cx="${H[0]}" cy="${H[1]}" r="30" fill="${K.skin}" ${OL}/>`;
    return s;
  }
  const k = l - 1.8, sh = [Math.sin(t * 37) * 3, Math.cos(t * 29) * 3];
  let s = `<rect width="1080" height="1920" fill="#07090f"/><rect y="1150" width="1080" height="500" fill="#0d1523"/><ellipse cx="540" cy="800" rx="480" ry="520" fill="${K.amb}" opacity="${.08 + .03 * Math.sin(l * 8)}"/>`;
  const al = wkInner + `${bell(0, -60, 1.4, Math.floor(l * 5) % 2 ? K.red : '#fff')}<rect x="-50" y="80" width="100" height="14" rx="7" fill="${K.red}"/>`;
  if (k < 1.7) s += handHold(560 + sh[0], 800 + sh[1], 2.1, -6, al);
  else {
    const hx = 560 + sh[0] - 330 * eout(prog(k, 1.7, 2.0)), px = 560 - 1100 * ein(prog(k, 1.75, 2.4));
    s += handHold(hx, 800, 2.1, -6, null) + phone(px, 800, 2.1, -6, al, .8) + `<rect x="${px + 150}" y="790" width="${Math.min(700, 560 - px)}" height="12" fill="#cfd8e6" opacity="${.35 * (1 - prog(k, 2.2, 2.4))}"/>`;
  }
  return s;
}
function sSlide(t, l) {
  if (l < 2.5) {
    const p = eout(prog(l, .3, 2.3)), x = lerp(560, 205, p) + 6 * ring(l, 2.3, 3, 6), y = FLY + 110;
    let s = sideStage(t, { flick: true });
    s += infCrowd(t, [380, 470, 585], { shut: true, tilt: [-10, 8, 22] });
    s += nStage(t, 55, nMan(t, 80, { lx: -16, ly: 8, br: 1.3, es: 1.25 }));
    if (p < 1) for (let k = 1; k < 7; k++) s += `<rect x="${x + 50 + k * 34 * (1 - p)}" y="${y - 3 + (k % 3) * 8}" width="${50 + k * 6}" height="5" fill="#cfd8e6" opacity="${.4 * (1 - p)}"/>`;
    s += `<ellipse cx="${x}" cy="${y + 26}" rx="${150 * (1 - p * .3)}" ry="30" fill="${K.amb}" opacity="${.25 + .08 * Math.sin(l * 9)}"/>`;
    s += phone(x, y - 8, .5, 80, wkInner, 0);
    return s;
  }
  const k = l - 2.5, pulse = .5 + .5 * Math.sin(k * 6);
  let s = `<rect width="1080" height="1920" fill="#080c14"/><rect x="0" y="0" width="1080" height="1010" fill="#34405a"/><rect x="90" y="120" width="900" height="380" fill="#2b3650" ${OL} stroke-width="5"/><rect x="90" y="570" width="900" height="360" fill="#2b3650" ${OL} stroke-width="5"/><rect y="1000" width="1080" height="12" fill="${K.ol}"/>`;
  s += `<rect y="1012" width="1080" height="908" fill="#0d1523"/><rect y="1000" width="1080" height="26" fill="${K.amb}" opacity=".8"/><polygon points="100,1026 980,1026 1180,1500 -100,1500" fill="${K.amb}" opacity=".13"/>`;
  s += `<ellipse cx="${330 + 40 * Math.sin(k * 1.3)}" cy="1013" rx="86" ry="14" fill="#04070d" opacity=".85"/><ellipse cx="${520 + 36 * Math.sin(k * 1.1 + 2)}" cy="1013" rx="80" ry="14" fill="#04070d" opacity=".85"/>`;
  s += `<ellipse cx="720" cy="1290" rx="${290 + 30 * pulse}" ry="${70 + 8 * pulse}" fill="${K.amb}" opacity="${.18 + .08 * pulse}"/><g transform="translate(720 1230) scale(1 .62)">${phone(0, 0, 1.2, 80, wkInner, 0)}</g>`;
  return s;
}
function sSlam(t, l) {
  const sl = l < .3 ? 0 : eio(prog(l, .3, .45)), a = 55 * (1 - ein(prog(l, .3, .45))) * (l < .3 ? 1 : 1), sh = shk(t, 115.52 + .45, 16, 7), j = [Math.sin(t * 19) * 1.5, Math.cos(t * 23) * 1.5];
  const flick = hash(Math.floor(t * 12)) > .3 ? 1 : .5;
  let s = `<rect width="1080" height="1920" fill="#0a111e"/><rect y="1400" width="1080" height="520" fill="#0d1523"/><rect x="40" y="200" width="200" height="16" rx="8" fill="#dfe9ff" opacity="${.5 * flick}"/>`;
  const ph = prog(l, 1.3, 2.6), pv = ph > 0 ? Math.sin(l * 60) * 4 * ph : 0;
  s += `<ellipse cx="170" cy="1420" rx="${120 + 40 * ph}" ry="26" fill="${K.amb}" opacity="${.2 + .2 * ph}"/>` + phone(170 + pv, 1400, .5, 80, wkInner, 0);
  s += `<g transform="translate(${sh[0] + j[0]} ${sh[1] + j[1]})"><g transform="translate(330 1400) scale(1.55)">`;
  const man = a > 1 ? nMan(t, lerp(80, 60, 1 - a / 55), { lx: -14, ly: 6, br: 1.7, es: 1.4, tilt: -4 }) : '';
  s += nDoor(a, man, { id: 1 });
  if (a < 1) { const tb = prog(l, .8, 1.15); s += `<g transform="translate(250 -430) rotate(${90 * tb})"><rect x="-8" y="-30" width="16" height="60" rx="8" fill="#c7a86a" ${OL} stroke-width="4"/></g><circle cx="250" cy="-430" r="16" fill="none" stroke="#6d6657" stroke-width="4"/>`; }
  s += `</g></g>`;
  if (l > .45 && l < 1.3) { const p = prog(l, .45, 1.3); s += `<circle cx="826" cy="1400" r="${40 + p * 320}" fill="none" stroke="#cfd8e6" stroke-width="${10 * (1 - p)}" opacity="${.5 * (1 - p)}"/>`; for (let i = 0; i < 6; i++) s += `<circle cx="${420 + i * 70}" cy="${300 + p * 500 * (.5 + hash(i))}" r="${5 + hash(i + 3) * 5}" fill="#cfd8e6" opacity="${.5 * (1 - p)}"/>`; }
  return s + `<rect width="1080" height="1920" fill="${K.red}" opacity="${.04 + .03 * Math.sin(t * 7)}"/>`;
}
function sAlarm(t, l) {
  const v = Math.sin(l * 80) * 9, on = Math.floor(l * 7) % 2;
  let s = `<rect width="1080" height="1920" fill="#06080d"/><rect y="0" width="1080" height="1010" fill="#34405a"/><rect x="90" y="120" width="900" height="380" fill="#2b3650" ${OL} stroke-width="5"/><rect x="90" y="570" width="900" height="360" fill="#2b3650" ${OL} stroke-width="5"/><rect y="1000" width="1080" height="920" fill="#0d1523"/><rect y="1000" width="1080" height="26" fill="${K.amb}" opacity=".8"/>`;
  s += `<polygon points="${540 - 140},1260 ${540 + 140},1260 ${540 + 520},120 ${540 - 520},120" fill="${K.red}" opacity="${on ? .12 : .05}"/>`;
  for (let k = 0; k < 4; k++) { const p = ((l * 1.8 + k * .25) % 1); s += `<ellipse cx="540" cy="1260" rx="${160 + p * 440}" ry="${40 + p * 110}" fill="none" stroke="${K.red}" stroke-width="${10 * (1 - p)}" opacity="${.85 * (1 - p)}"/>`; }
  s += `<ellipse cx="540" cy="1310" rx="360" ry="64" fill="${K.amb}" opacity=".25"/>`;
  s += `<g transform="translate(${540 + v} ${1240 + Math.cos(l * 70) * 5}) scale(1 .62)">${phone(0, 0, 1.4, 80 + v * .2, `<rect x="-78" y="-154" width="156" height="308" fill="${on ? '#3a0a14' : '#14100a'}"/><text x="0" y="40" text-anchor="middle" fill="${on ? '#fff' : K.red}" style="font-family:'Inter';font-weight:900;font-size:50px">21:08</text>${bell(0, -80, 1.2, on ? '#fff' : K.red)}`, 0)}</g>`;
  return s;
}
function sTurn(t, l) {
  const d = [{ s: -1, z1: 1.8, z2: 3.4 }, { s: 1, z1: 2.4, z2: 4.0 }, { s: -1, z1: 4.2, z2: 5.6 }];
  const w = l > .3 ? 1 : 0, tl = prog(l, .3, .4);
  let s = corr(t, { doors: d, flick: false });
  [[-300, 5.0, '#6a3a46', -1], [100, 3.9, '#44566a', 1], [-120, 3.0, '#5f6a4a', -1]].forEach((q, i) => {
    s += fig(q[1], q[0], { col: q[2], pants: '#2b2b3a', inf: 1, aL: 20, aR: -20, ph: 0, lean: lerp(q[3] * 16, 0, tl) + 2 * Math.sin(t * 6 + i), h: { inf: 1, shut: !w, tilt: lerp(q[3] * 30, 0, tl) + (w ? tw(t, i) * .5 : 0), m: w ? 'open' : 'flat', lx: 0, ly: 0 } });
  });
  s += `<circle cx="540" cy="780" r="${340 * prog(l, .3, 1.2)}" fill="${K.red}" opacity="${.18 * (1 - prog(l, .3, 1.2))}"/>`;
  return pview(t, 5, s, 0);
}
function sCome(t, l) {
  const d = [{ s: -1, z1: 1.8, z2: 3.4 }, { s: 1, z1: 2.4, z2: 4.0 }, { s: -1, z1: 4.2, z2: 5.6 }];
  const p = prog(l, 0, 2.2);
  let s = corr(t, { doors: d, flick: true });
  [[-300, 5.0, '#6a3a46'], [100, 3.9, '#44566a'], [-120, 3.0, '#5f6a4a']].forEach((q, i) => {
    const e = eio(prog(l, i * .15, 2.2)), z = lerp(q[1], 1.15 + i * .18, e), x = lerp(q[0], (i - 1) * 60, e);
    s += fig(z, x, { col: q[2], pants: '#2b2b3a', inf: 1, walk: 1, ph: t * 9 + i, lean: 5 * Math.sin(t * 9 + i), aL: 40, aR: -40, h: { inf: 1, m: 'open', tilt: tw(t, i) * .5 } });
  });
  s += `<rect width="1080" height="1920" fill="${K.red}" opacity="${.08 + .08 * p}"/>`;
  return pview(t, 6, s, 12 * Math.sin(t * 40) * p);
}
function infHand(grip) {
  const fingers = [0, 1, 2, 3].map(i => `<rect x="${-150 + i * 50}" y="${14 + i % 2 * 6}" width="42" height="${96 - i % 2 * 6}" rx="21" fill="${K.inf}" ${OL}/><rect x="${-146 + i * 50}" y="${100 + i % 2 * 0}" width="30" height="12" rx="6" fill="#0a0d0a"/><circle cx="${-129 + i * 50}" cy="20" r="21" fill="#8a9a86" ${OL} stroke-width="4"/>`).join('');
  return `<g><path d="M 150 -250 Q 330 -350 380 -520" stroke="${K.ol}" stroke-width="150" stroke-linecap="round" fill="none"/><path d="M 150 -250 Q 330 -350 380 -520" stroke="#6a3a46" stroke-width="136" stroke-linecap="round" fill="none"/>
    <path d="M 120 -190 q 60 -40 70 -90" stroke="${K.inf}" stroke-width="100" stroke-linecap="round" fill="none"/>
    <rect x="-176" y="-176" width="270" height="212" rx="70" fill="${K.inf}" ${OL}/>
    <path d="M -120 -150 q 30 40 10 100 M -40 -170 q 20 50 -10 110 M 30 -160 q 30 30 10 90" stroke="#b83a46" stroke-width="5" fill="none" stroke-linecap="round" opacity=".8"/>
    <path d="M -60 -110 l 40 14 M 20 -60 l 30 20" stroke="${K.blood}" stroke-width="9" stroke-linecap="round"/>${fingers}
    <rect x="-210" y="-96" width="60" height="140" rx="30" fill="${K.inf}" ${OL} transform="rotate(${14 + 6 * grip} -170 -80)"/></g>`;
}
function sHandle(t, l) {
  const press = prog(l, .8, 1.0), tug = l > 1.4 ? Math.max(0, Math.sin(l * 13)) * .55 : 0, dip = Math.min(1, press * (1 - .4 * prog(l, 1.1, 1.3)) + tug * .6);
  const sh = shk(t, 125.8, 6, 6), rat = Math.sin(l * 40) * 3 * dip, flick = hash(Math.floor(t * 14)) > .4 ? 1 : .35;
  let s = `<rect width="1080" height="1920" fill="#080c14"/>`;
  s += `<g transform="translate(${sh[0] * (l > .8 ? 1 : 0) + rat} ${sh[1] * (l > .8 ? 1 : 0)})"><rect x="150" y="160" width="780" height="1260" fill="#34405a" ${OL}/><rect x="190" y="200" width="700" height="460" fill="#2b3650" ${OL} stroke-width="4"/><rect x="190" y="740" width="700" height="600" fill="#2b3650" ${OL} stroke-width="4"/>`;
  s += `<rect x="150" y="1400" width="780" height="20" fill="${K.amb}" opacity=".7"/>`;
  s += `<circle cx="540" cy="360" r="46" fill="#14100a" ${OL}/><circle cx="540" cy="360" r="22" fill="${K.red}" opacity="${.35 * flick + .3 * dip}"/>`;
  s += `<rect x="240" y="860" width="150" height="60" rx="26" fill="#b9b2a2" ${OL}/><circle cx="320" cy="890" r="14" fill="#6d6657"/>`;
  s += `<path d="M 270 960 Q 330 1020 400 960" fill="none" stroke="#c7a86a" stroke-width="9"/><circle cx="270" cy="958" r="14" fill="#c7a86a" ${OL} stroke-width="4"/>`;
  s += `<rect x="470" y="1300" width="140" height="70" rx="20" fill="#b9b2a2" ${OL}/><g transform="rotate(${dip * 24} 790 1180)"><rect x="470" y="1150" width="320" height="58" rx="29" fill="#cfd4dc" ${OL}/><circle cx="790" cy="1180" r="40" fill="#cfd4dc" ${OL}/></g></g>`;
  s += `<clipPath id="hlens"><circle cx="500" cy="720" r="320"/></clipPath><circle cx="500" cy="720" r="344" fill="${K.ol}"/><g clip-path="url(#hlens)"><rect x="150" y="380" width="700" height="680" fill="#0a0507"/><rect x="150" y="380" width="700" height="680" fill="${K.red}" opacity="${.1 + .08 * flick}"/><rect x="150" y="900" width="700" height="170" fill="#1a0d10"/><rect x="150" y="1030" width="700" height="30" fill="${K.amb}" opacity=".3"/>`;
  s += `<g transform="translate(560 790) scale(.95)"><g transform="rotate(${dip * 24} 160 60)"><rect x="-300" y="30" width="470" height="62" rx="31" fill="#cfd4dc" ${OL}/><circle cx="160" cy="60" r="44" fill="#cfd4dc" ${OL}/>${infHand(dip)}</g></g></g>`;
  s += `<circle cx="500" cy="720" r="320" fill="none" stroke="${K.red}" stroke-width="8" stroke-dasharray="26 16" stroke-dashoffset="${-l * 40}"/>`;
  s += `<rect width="1080" height="1920" fill="${K.red}" opacity="${.07 + .05 * Math.sin(l * 10)}"/>`;
  return s;
}
function sSect1(t, l) {
  const fl = [[.5, 31, 1], [1.4, 18, 2], [2.4, 9, 3]];
  let s = `<rect width="1080" height="1920" fill="#080d18"/>`;
  s += tower(t, { f0: 1, f1: 41, x0: 330, x1: 750, heat: (f, tt) => { let v = 0; fl.forEach(q => { if (f === q[1] && l > q[0]) v = .55 + .4 * Math.sin(tt * 8 + f); }); return v; } });
  fl.forEach(q => { const p = prog(l, q[0], q[0] + .9); if (p > 0 && p < 1) { const y = fy(q[1], 1, 41) + 14; s += `<circle cx="540" cy="${y}" r="${30 + p * 260}" fill="none" stroke="${K.red}" stroke-width="${10 * (1 - p)}" opacity="${.8 * (1 - p)}"/>`; } });
  s += tx(`+10'`, 900, 520, 120, K.amb, 'middle', cl(prog(l, 0, .3)));
  s += tx('3×', 900, 650, 100, K.red, 'middle', cl(prog(l, 2.2, 2.6)));
  return s;
}
const SH = [[0, 2, sCctv1], [2, 5.5, sTower], [5.5, 7.9, sCctv2], [7.9, 10.22, sMonitors], [10.22, 14.52, sSect1], [14.52, 20.78, sSealed], [20.78, 26.08, sWindows], [26.08, 33.58, sSpeaker], [33.58, 37.44, sInfHall], [37.44, 43.72, sTowerDiag], [43.72, 49.5, sCall], [49.5, 55.16, sRule1], [55.16, 60.36, sStairs], [60.36, 64.66, sPeep1], [64.66, 69.2, sPeep2], [69.2, 72.28, sPeep3], [72.28, 77.14, sBack], [77.14, 79.36, sEar], [79.36, 83.14, sRule2], [83.14, 87.3, sDark], [87.3, 92.2, sThree], [92.2, 95.18, sEye], [95.18, 98.46, sRule3], [98.46, 102.14, sNeighbor], [102.14, 106.7, sStop], [106.7, 110.9, sPhoneOut], [110.9, 115.52, sSlide], [115.52, 118.12, sSlam], [118.12, 119.4, sAlarm], [119.4, 122.84, sTurn], [122.84, 125.02, sCome], [125.02, 999, sHandle]];
function scene(t) {
  let k = SH.length - 1;
  for (let i = 0; i < SH.length; i++) if (t < SH[i][1]) { k = i; break; }
  const sh = SH[k];
  try { return sh[2](t, t - sh[0]); } catch (e) { if (typeof globalThis.__DBG !== "undefined") throw e; return `<rect width="1080" height="1920" fill="#080d18"/>`; }
}

const __style = {"dust": true, "vignette": true, "subtitle": "horror"};
export const subtitleStyle = __style.subtitle;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
