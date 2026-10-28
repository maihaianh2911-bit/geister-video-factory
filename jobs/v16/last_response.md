<style_md># Quarantäne 41 — style bible
- Mood: kinh dị ngột ngạt, căng dần, hoạt hình 2D khối đơn giản, nhân vật tỉ lệ người thật.
- Palette: nền #090f1b, tường #17243b / #1f3050, sàn #101826, thép #3b4553; đỏ #e8384a chỉ cho nguy hiểm/cảnh báo; hổ phách #f4b24b cho thông tin và nguồn sáng nhỏ; da #dcae8a; người nhiễm da xám xanh #a8b8a4, mắt đỏ.
- Nét: viền #04070d dày 6px, góc bo tròn, bóng tối phẳng.
- Nhân vật: Artem áo hoodie xanh xám #5a7596, tóc đen; em gái áo hồng #d98aa0; hàng xóm áo nâu #8a6a4a; người nhiễm đầu giật, mắt đỏ mở trống.
- Camera: luân phiên camera an ninh (lớp xanh lục, scanline, REC), mắt thần tròn, hành lang một điểm tụ, sơ đồ mặt cắt tòa nhà, cận điện thoại, cận mặt.
- Chuyển cảnh: cắt cứng theo từng dòng; thẻ quy tắc đập vào khung có rung.
- Chữ: chỉ số liệu ngắn (19:42, 41, 600+, 28, 35, 21:08) và ba thẻ quy tắc tiếng Đức theo ghi chú.
- Phụ đề: kiểu horror (trắng, từ hiện tại đỏ).
- Tránh: máu chi tiết, nền be, phong cách giải thích sức khỏe, logo/watermark.
</style_md>
<style_json>{"dust": true, "vignette": true, "subtitle": "horror"}</style_json>
<plan>29 dòng, 32 cảnh theo storyboard.</plan>
<scene_js>
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
    grit: `<rect x="-32" y="44" width="64" height="22" rx="8" fill="#e8e4d8" stroke="${K.ol}" stroke-width="5"/><path d="M -16 44 v 22 M 0 44 v 22 M 16 44 v 22" stroke="${K.ol}" stroke-width="3"/>`,
    smile: `<path d="M -28 48 Q 0 74 28 48" stroke="${K.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`,
  }[o.m || 'flat'];
  const hair = o.hair ? `<path d="M -98 -12 Q -108 -118 0 -118 Q 108 -118 98 -12 Q 86 -70 30 -74 Q 0 -62 -36 -76 Q -84 -66 -98 -12 Z" fill="${o.hair}" ${OL} stroke-width="5"/>` : '';
  const back = o.long ? `<path d="M -104 -20 Q -120 -140 0 -134 Q 120 -140 104 -20 L 112 100 L -112 100 Z" fill="${o.long}" ${OL} stroke-width="5"/>` : '';
  const sweat = o.sweat ? `<path d="M 80 -60 q 8 16 0 22 q -8 -6 0 -22 Z" fill="#a9d4f2" opacity="${.5 + .5 * Math.sin(o.sweat * 6)}"/>` : '';
  return `<g transform="translate(${x} ${y}) rotate(${o.tilt || 0}) scale(${s})">${back}
    <ellipse cx="-93" cy="4" rx="16" ry="26" fill="${sk}" ${OL} stroke-width="5"/><ellipse cx="93" cy="4" rx="16" ry="26" fill="${sk}" ${OL} stroke-width="5"/>
    <ellipse cx="0" cy="0" rx="92" ry="104" fill="${sk}" ${OL}/>${hair}
    ${eye(-38)}${eye(38)}
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
  return body(px, py, 1.17 / z * (o.k || 1), o);
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
  s += body(wx, 1350, 1.12, { col: '#8a4f68', pants: '#2b2b3a', lean: wl, aL: lung > .3 ? 60 : 8, aR: -60, h: { long: '#2a1a1c', hair: '#2a1a1c', br: 1.2 * lung, m: lung > .3 ? 'open' : 'flat', es: 1 + .3 * lung } });
  s += body(mx, 1350, 1.12, { col: '#a9afb7', pants: '#3a3a44', lean: 20 * lung, aL: -10 - 70 * lung, aR: -85 * lung - 8, blood: [[-40, -380, 30]], h: { hair: '#1b1410', br: -1, m: 'grit', tilt: 8 * lung } });
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
  s += tx(String(cur), 900, 520, 150, K.amb, 'middle') + tx('STOCK', 900, 580, 40, '#c7d4ea', 'middle', .8);
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
  if (pb > .5) s += `<path d="M 790 ${y28 + h / 2} H 840 V ${y35 + h / 2} H 790" fill="none" stroke="#c7d4ea" stroke-width="6" stroke-dasharray="14 12" opacity=".7"/>`;
  return s;
}
function sCall(t, l) {
  const cut = l > 3.9, sh = cut ? shk(t, 43.72 + 3.9, 10, 7) : [0, 0];
  let s = `<rect width="1080" height="1920" fill="#0b1220"/><rect x="0" y="1100" width="1080" height="500" fill="#0e1626"/><rect x="620" y="260" width="300" height="400" fill="#16233a" ${OL}/><path d="M 770 260 V 660 M 620 460 H 920" stroke="${K.ol}" stroke-width="8"/>`;
  s += `<g transform="translate(${sh[0]} ${sh[1]})">`;
  const arm = cut ? eio(prog(l, 4.0, 4.6)) : 0;
  s += `<g transform="translate(470 ${1250 + 10 * arm})">` + body(0, 0, 1.55, { col: '#5a7596', aL: 150 - 120 * arm, aR: -8, h: { hair: '#1b1410', br: cut ? 1.4 : .8, m: cut ? 'o' : 'worried', lx: cut ? 10 : 0, bl: blink(t), es: cut ? 1.2 : 1 } }) + `</g>`;
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
  s += `<g transform="translate(${hx + 20} ${1130}) scale(${sc * .85})">${body(0, 0, 0, {})}</g>`;
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
function wide(t, o) {
  const d = [{ s: -1, z1: 1.3, z2: 3.2, col: '#2c3e5c' }, { s: 1, z1: 1.3, z2: 3.2, col: '#3a3048', op: o.op || 0 }];
  let s = corr(t, { doors: d, flick: o.flick, dim: .55, lights: [1.2, 2.2, 3.4, 4.6] });
  return s;
}
function sNeighbor(t, l) {
  let s = wide(t, { op: prog(l, 1.1, 1.5) * .02 });
  [[-60, 5.4, '#6a3a46', 0], [200, 4.5, '#44566a', 1], [-220, 4.2, '#5f6a4a', 2]].forEach((q, i) => {
    s += fig(q[1], q[0], { col: q[2], pants: '#2b2b3a', inf: 1, walk: 1, ph: t * 2.5 + i, aL: 28, aR: -28, h: { inf: 1, tilt: tw(t, i) * .6, m: 'open' } });
  });
  return s + `<rect width="1080" height="1920" fill="${K.red}" opacity="${.04}"/>`;
}
function sStop(t, l) {
  const op = prog(l, 2.0, 2.6) * .05;
  let s = wide(t, { op });
  s += fig(4.6, -170, { col: '#44566a', pants: '#2b2b3a', inf: 1, walk: 1, ph: t * 2, aL: 20, aR: -20, h: { inf: 1, m: 'open' } });
  s += fig(5.2, 120, { col: '#6a3a46', pants: '#2b2b3a', inf: 1, walk: 1, ph: t * 2 + 1, aL: 20, aR: -20, h: { inf: 1, m: 'open' } });
  const w = eout(prog(l, 0, 1.5)), z = lerp(4.0, 2.4, w);
  s += fig(z, lerp(-20, 640, eout(prog(l, 1, 1.8))), { col: '#5f6a4a', pants: '#2b2b3a', inf: 1, walk: w < 1 ? 1 : 0, ph: t * 5, lean: 14, aL: 30, aR: -30, h: { inf: 1, tilt: 30, m: 'open', shut: l > 1.6 } });
  if (op > 0) s += `<ellipse cx="${cX(CW, 2.0) - 20}" cy="${cY(80, 2.0)}" rx="14" ry="12" fill="#f4f1ea"/>`;
  return s;
}
function sPhoneOut(t, l) {
  const hand = eout(prog(l, .6, 1.6)), zoom = eio(prog(l, 2.2, 3.4));
  let s = `<rect width="1080" height="1920" fill="#07090f"/><rect x="560" y="200" width="520" height="1300" fill="#2c3e5c" ${OL}/><rect x="410" y="200" width="150" height="1300" fill="#0a0600"/><rect x="410" y="200" width="150" height="1300" fill="${K.amb}" opacity=".35"/>`;
  s += `<rect x="430" y="1250" width="130" height="14" fill="#fff" opacity=".1"/>`;
  s += `<g transform="translate(${lerp(560, 300, hand)} 900)"><rect x="-10" y="-40" width="420" height="110" rx="50" fill="#8a6a4a" ${OL} transform="translate(180 0)"/><circle cx="-10" cy="10" r="64" fill="${K.skin}" ${OL}/></g>`;
  const px = lerp(500, 380, hand);
  const al = `<rect x="-78" y="-154" width="156" height="308" fill="#14100a"/><text x="0" y="22" text-anchor="middle" fill="${K.amb}" style="font-family:'Inter';font-weight:900;font-size:50px">21:08</text>${bell(0, -80, 1.1, K.red)}<rect x="-50" y="80" width="100" height="14" rx="7" fill="${K.red}"/>`;
  s += phone(px, 860, lerp(1.4, 2.6, zoom), lerp(-6, 0, zoom), al, 1);
  s += `<g transform="translate(${lerp(560, 300, hand) - 10} 900)"><circle cx="0" cy="10" r="0"/></g>`;
  if (zoom > .2) s += `<rect width="1080" height="1920" fill="#07090f" opacity="${zoom * .4}"/>` + phone(540, 860, 2.6 + .05 * Math.sin(l * 10), 0, al, 1.4);
  return s;
}
function sSlide(t, l) {
  const p = eout(prog(l, .5, 3.1)), bounce = ring(l, 3.1, 2.5, 5) * .08;
  let s = wide(t, { op: .02 });
  const z = 2.0, x = lerp(740, -700, p) + 40 * bounce, [sx0, sy0] = [cX(x, z), cY(CF, z)];
  for (let k = 1; k < 7; k++) if (p < 1) s += `<rect x="${sx0 + k * 36 * (1 - p) + 40}" y="${sy0 - 40 + k * 6 - 2}" width="${60 + k * 6}" height="5" fill="#cfd8e6" opacity="${.35 * (1 - p)}"/>`;
  s += `<ellipse cx="${sx0}" cy="${sy0 + 14}" rx="${160 * (1 - p * .3)}" ry="40" fill="${K.amb}" opacity="${.22 + .1 * Math.sin(l * 9)}"/>`;
  s += phone(sx0, sy0 - 30, .55, 76, `<rect x="-78" y="-154" width="156" height="308" fill="#14100a"/><text x="0" y="22" text-anchor="middle" fill="${K.amb}" style="font-family:'Inter';font-weight:900;font-size:50px">21:08</text>`, 0);
  [[-60, 5.4], [200, 4.5], [-220, 4.2]].forEach((q, i) => s += fig(q[1], q[0], { col: ['#6a3a46', '#44566a', '#5f6a4a'][i], pants: '#2b2b3a', inf: 1, aL: 28, aR: -28, h: { inf: 1, shut: true, m: 'open' } }));
  return s;
}
function sSlam(t, l) {
  const sl = prog(l, .3, .42), sh = shk(t, 115.52 + .42, 12, 8);
  let s = wide(t, { op: (1 - sl) * .07 });
  s = `<g transform="translate(${sh[0]} ${sh[1]})">` + s;
  const z = 2.0, sx0 = cX(-700, z), sy0 = cY(CF, z);
  s += `<ellipse cx="${sx0}" cy="${sy0 + 14}" rx="130" ry="36" fill="${K.amb}" opacity=".3"/>` + phone(sx0, sy0 - 30, .55, 76, `<rect x="-78" y="-154" width="156" height="308" fill="#14100a"/><text x="0" y="22" text-anchor="middle" fill="${K.amb}" style="font-family:'Inter';font-weight:900;font-size:50px">21:08</text>`, 0);
  [[-60, 5.4], [200, 4.5], [-220, 4.2]].forEach((q, i) => s += fig(q[1], q[0], { col: ['#6a3a46', '#44566a', '#5f6a4a'][i], pants: '#2b2b3a', inf: 1, aL: 28, aR: -28, h: { inf: 1, shut: true, m: 'open' } }));
  if (l > .4 && l < 1.2) { const p = prog(l, .4, 1.2); s += `<circle cx="${cX(CW, 2.2)}" cy="${cY(200, 2.2)}" r="${40 + p * 260}" fill="none" stroke="#cfd8e6" stroke-width="${8 * (1 - p)}" opacity="${.5 * (1 - p)}"/>`; }
  return s + `</g>`;
}
function sAlarm(t, l) {
  const v = Math.sin(l * 70) * 6 * (l > .05 ? 1 : 0), on = Math.floor(l * 6) % 2;
  let s = `<rect width="1080" height="1920" fill="#06080d"/><polygon points="0,1000 1080,1000 1080,1920 0,1920" fill="#0d1421"/><path d="M 0 1000 H 1080" stroke="#1b2740" stroke-width="6"/>`;
  s += `<rect x="60" y="560" width="960" height="440" fill="#2c3e5c" ${OL}/><rect x="60" y="990" width="960" height="14" fill="${K.amb}" opacity=".6"/>`;
  for (let k = 0; k < 4; k++) { const p = ((l * 1.6 + k * .25) % 1); s += `<circle cx="540" cy="1240" r="${120 + p * 420}" fill="none" stroke="${K.red}" stroke-width="${10 * (1 - p)}" opacity="${.8 * (1 - p)}"/>`; }
  s += `<ellipse cx="540" cy="1290" rx="330" ry="70" fill="${K.amb}" opacity=".25"/>`;
  s += phone(540 + v, 1230, 1.2, 90 + v * .3, `<rect x="-78" y="-154" width="156" height="308" fill="${on ? '#3a0a14' : '#14100a'}"/><text x="0" y="22" text-anchor="middle" fill="${on ? '#fff' : K.red}" style="font-family:'Inter';font-weight:900;font-size:50px">21:08</text>${bell(0, -80, 1.2, on ? '#fff' : K.red)}`, 0);
  return s;
}
function sTurn(t, l) {
  const d = [{ s: -1, z1: 1.8, z2: 3.4 }, { s: 1, z1: 2.4, z2: 4.0 }, { s: -1, z1: 4.2, z2: 5.6 }];
  const w = l > .3 ? 1 : 0, tl = prog(l, .3, .4);
  let s = corr(t, { doors: d, flick: false });
  [[-300, 5.0, '#6a3a46', -1], [100, 3.9, '#44566a', 1], [-120, 3.0, '#5f6a4a', -1]].forEach((q, i) => {
    s += fig(q[1], q[0], { col: q[2], pants: '#2b2b3a', inf: 1, aL: 20, aR: -20, lean: lerp(q[3] * 16, 0, tl), h: { inf: 1, shut: !w, tilt: lerp(q[3] * 30, 0, tl), m: w ? 'open' : 'flat', lx: 0, ly: 0 } });
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
function sHandle(t, l) {
  const dip = l > .8 ? Math.min(1, prog(l, .8, 1.0)) * (1 - prog(l, 1.1, 1.3)) + (l > 1.5 ? Math.max(0, Math.sin(l * 14)) * .6 * (1 - prog(l, 1.5, 3)) : 0) : 0;
  const sh = shk(t, 125.8, 5, 6);
  let s = `<rect width="1080" height="1920" fill="#080c14"/>`;
  s += `<rect x="150" y="160" width="780" height="1260" fill="#34405a" ${OL}/><rect x="190" y="200" width="700" height="460" fill="#2b3650" ${OL} stroke-width="4"/><rect x="190" y="740" width="700" height="600" fill="#2b3650" ${OL} stroke-width="4"/>`;
  s += `<rect x="150" y="1400" width="780" height="20" fill="${K.amb}" opacity=".7"/>`;
  s += `<circle cx="540" cy="360" r="46" fill="#14100a" ${OL}/><circle cx="540" cy="360" r="22" fill="${K.red}" opacity=".35"/>`;
  s += `<g transform="translate(${sh[0] * dip} ${sh[1] * dip})"><rect x="240" y="860" width="150" height="60" rx="26" fill="#b9b2a2" ${OL}/><circle cx="320" cy="890" r="14" fill="#6d6657"/>
    <rect x="260" y="1000" width="110" height="230" rx="30" fill="#b9b2a2" ${OL}/>
    <g transform="rotate(${dip * 20} 760 1100)"><rect x="560" y="1075" width="260" height="54" rx="27" fill="#cfd4dc" ${OL}/><circle cx="780" cy="1102" r="38" fill="#cfd4dc" ${OL}/></g></g>`;
  s += `<path d="M 270 1000 Q 430 1060 640 1000 L 640 960" fill="none" stroke="#c7a86a" stroke-width="9"/>`;
  s += `<circle cx="640" cy="950" r="16" fill="#c7a86a" ${OL} stroke-width="4"/>`;
  s += `<g opacity="${.8}"><rect x="360" y="1404" width="60" height="16" fill="#000" opacity="${.5 + .4 * Math.sin(l * 20)}"/><rect x="560" y="1404" width="80" height="16" fill="#000" opacity="${.5 + .4 * Math.sin(l * 17)}"/></g>`;
  s += `<rect width="1080" height="1920" fill="${K.red}" opacity="${.08 + .05 * Math.sin(l * 10)}"/>`;
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
  try { return sh[2](t, t - sh[0]); } catch (e) { return `<rect width="1080" height="1920" fill="#080d18"/>`; }
}

</scene_js>
<events_json>{"music": "horror_tension", "events": [{"t": 0.3, "type": "whoosh", "dur": 0.3, "lo": 300, "hi": 1800, "gain": 0.4}, {"t": 0.55, "type": "hit", "gain": 0.8, "f0": 110, "f1": 40, "dur": 0.8, "weight": "hero"}, {"t": 0.7, "type": "thud", "gain": 0.5}, {"t": 1.2, "type": "crash", "dur": 0.3, "gain": 0.3}, {"t": 2.0, "type": "whoosh", "dur": 0.5, "lo": 200, "hi": 1200, "gain": 0.35}, {"t": 2.9, "type": "ting", "f": 392, "gain": 0.2, "decay": 0.8}, {"t": 3.4, "type": "ting", "f": 440, "gain": 0.2, "decay": 0.8}, {"t": 3.9, "type": "ting", "f": 494, "gain": 0.2, "decay": 0.8}, {"t": 4.4, "type": "ting", "f": 523, "gain": 0.2, "decay": 0.8}, {"t": 4.9, "type": "ting", "f": 587, "gain": 0.2, "decay": 0.8}, {"t": 5.5, "type": "thud", "gain": 0.5}, {"t": 6.2, "type": "thud", "gain": 0.35}, {"t": 6.9, "type": "crash", "dur": 0.4, "gain": 0.3}, {"t": 7.9, "type": "static", "dur": 0.5, "gain": 0.3}, {"t": 8.5, "type": "click", "gain": 0.3}, {"t": 9.3, "type": "tick", "f": 900, "gain": 0.2}, {"t": 10.7, "type": "hit", "gain": 0.5, "f0": 90, "f1": 40, "dur": 0.6}, {"t": 11.6, "type": "hit", "gain": 0.5, "f0": 90, "f1": 40, "dur": 0.6}, {"t": 12.6, "type": "hit", "gain": 0.5, "f0": 90, "f1": 40, "dur": 0.6}, {"t": 12.9, "type": "riser", "dur": 1.3, "f0": 100, "f1": 400, "gain": 0.3}, {"t": 15.3, "type": "clank", "gain": 0.7, "weight": "hero"}, {"t": 18.4, "type": "clank", "gain": 0.6}, {"t": 19.3, "type": "clank", "gain": 0.6}, {"t": 19.9, "type": "stamp", "gain": 0.5}, {"t": 21.4, "type": "tick", "f": 1200, "gain": 0.25}, {"t": 22.0, "type": "tick", "f": 1400, "gain": 0.25}, {"t": 22.8, "type": "tick", "f": 1600, "gain": 0.25}, {"t": 23.3, "type": "ting", "f": 523, "gain": 0.3, "decay": 1.2}, {"t": 24.1, "type": "hit", "gain": 0.5, "f0": 80, "f1": 40, "dur": 1.0}, {"t": 24.5, "type": "heart", "gain": 0.4}, {"t": 26.2, "type": "click", "gain": 0.4}, {"t": 26.4, "type": "static", "dur": 0.6, "gain": 0.3}, {"t": 28.3, "type": "creak", "dur": 0.6, "gain": 0.25}, {"t": 30.5, "type": "creak", "dur": 0.5, "gain": 0.25}, {"t": 31.8, "type": "click", "gain": 0.3}, {"t": 34.0, "type": "steps", "dur": 1.2, "gain": 0.3}, {"t": 35.2, "type": "steps", "dur": 1.2, "gain": 0.3}, {"t": 36.0, "type": "hit", "gain": 0.4, "f0": 70, "f1": 35, "dur": 0.9}, {"t": 37.9, "type": "pop", "f0": 300, "f1": 800, "gain": 0.3}, {"t": 41.8, "type": "pop", "f0": 300, "f1": 800, "gain": 0.3}, {"t": 41.3, "type": "riser", "dur": 1.5, "f0": 120, "f1": 500, "gain": 0.25}, {"t": 43.8, "type": "tick", "f": 700, "gain": 0.25}, {"t": 45.5, "type": "rustle", "dur": 0.4, "gain": 0.2}, {"t": 47.6, "type": "static", "dur": 0.5, "gain": 0.5, "weight": "hero"}, {"t": 47.9, "type": "womp", "gain": 0.3}, {"t": 49.7, "type": "hit", "gain": 0.8, "f0": 100, "f1": 40, "dur": 0.9, "weight": "hero"}, {"t": 49.8, "type": "stamp", "gain": 0.6}, {"t": 52.8, "type": "thud", "gain": 0.6}, {"t": 53.7, "type": "thud", "gain": 0.6}, {"t": 54.4, "type": "thud", "gain": 0.7}, {"t": 55.4, "type": "steps", "dur": 1.2, "gain": 0.25}, {"t": 58.2, "type": "air", "dur": 1.0, "gain": 0.4}, {"t": 58.5, "type": "hit", "gain": 0.5, "f0": 120, "f1": 50, "dur": 0.7}, {"t": 60.7, "type": "steps", "dur": 3.0, "gain": 0.3, "pan": 0.2}, {"t": 63.0, "type": "air", "dur": 0.6, "gain": 0.25}, {"t": 64.9, "type": "creak", "dur": 0.5, "gain": 0.3}, {"t": 67.0, "type": "steps", "dur": 1.4, "gain": 0.3}, {"t": 70.0, "type": "thud", "gain": 0.6}, {"t": 70.2, "type": "air", "dur": 0.8, "gain": 0.4}, {"t": 70.8, "type": "crash", "dur": 0.2, "gain": 0.3}, {"t": 71.6, "type": "hit", "gain": 0.7, "f0": 70, "f1": 30, "dur": 1.2, "weight": "hero"}, {"t": 72.9, "type": "whoosh", "dur": 0.4, "lo": 200, "hi": 900, "gain": 0.3}, {"t": 73.8, "type": "heart", "gain": 0.45}, {"t": 77.2, "type": "tick", "f": 1000, "gain": 0.3}, {"t": 77.9, "type": "riser", "dur": 1.0, "f0": 150, "f1": 600, "gain": 0.3}, {"t": 79.5, "type": "hit", "gain": 0.7, "f0": 100, "f1": 40, "dur": 0.8, "weight": "hero"}, {"t": 79.6, "type": "stamp", "gain": 0.5}, {"t": 80.8, "type": "heart", "gain": 0.4}, {"t": 81.6, "type": "heart", "gain": 0.4}, {"t": 84.2, "type": "switch", "gain": 0.5}, {"t": 85.4, "type": "click", "gain": 0.35}, {"t": 86.0, "type": "rustle", "dur": 0.5, "gain": 0.2}, {"t": 86.8, "type": "steps", "dur": 0.8, "gain": 0.15}, {"t": 87.6, "type": "steps", "dur": 3.0, "gain": 0.3}, {"t": 90.0, "type": "creak", "dur": 0.4, "gain": 0.2}, {"t": 92.5, "type": "heart", "gain": 0.5}, {"t": 93.3, "type": "heart", "gain": 0.5}, {"t": 94.2, "type": "riser", "dur": 0.9, "f0": 120, "f1": 500, "gain": 0.3}, {"t": 95.3, "type": "hit", "gain": 0.7, "f0": 100, "f1": 40, "dur": 0.8, "weight": "hero"}, {"t": 95.4, "type": "stamp", "gain": 0.5}, {"t": 99.9, "type": "click", "gain": 0.3}, {"t": 100.5, "type": "steps", "dur": 1.5, "gain": 0.25}, {"t": 102.8, "type": "steps", "dur": 0.8, "gain": 0.25}, {"t": 104.4, "type": "creak", "dur": 0.8, "gain": 0.35}, {"t": 107.0, "type": "rustle", "dur": 0.4, "gain": 0.25}, {"t": 108.6, "type": "tick", "f": 1500, "gain": 0.2}, {"t": 111.2, "type": "slide", "f0": 800, "f1": 200, "dur": 1.8, "gain": 0.35}, {"t": 113.9, "type": "plop", "f": 180, "gain": 0.4}, {"t": 116.0, "type": "thud", "gain": 0.9, "weight": "hero"}, {"t": 116.3, "type": "crack", "gain": 0.3}, {"t": 118.2, "type": "shimmer", "dur": 1.0, "gain": 0.5, "weight": "hero"}, {"t": 118.35, "type": "tick", "f": 2000, "gain": 0.4}, {"t": 119.65, "type": "hit", "gain": 0.9, "f0": 130, "f1": 40, "dur": 1.2, "weight": "hero"}, {"t": 119.7, "type": "air", "dur": 0.7, "gain": 0.5}, {"t": 122.9, "type": "steps", "dur": 2.0, "gain": 0.5}, {"t": 123.5, "type": "riser", "dur": 1.5, "f0": 100, "f1": 600, "gain": 0.4}, {"t": 125.9, "type": "clank", "gain": 0.7}, {"t": 126.3, "type": "thud", "gain": 0.5}, {"t": 127.0, "type": "clank", "gain": 0.4}]}</events_json>
<storyboard_json>[{"t0": 0, "t1": 2, "lines": [0], "title_vi": "19:42", "desc_vi": "Camera thang máy: người đàn ông lao vào tấn công người phụ nữ ngay giây đầu."}, {"t0": 2, "t1": 5.5, "lines": [0], "title_vi": "Tòa nhà 41 tầng", "desc_vi": "Mặt tiền tòa tháp, đèn thang máy chạy lên từ tầng 1 đến 41, bộ đếm tầng nhảy số."}, {"t0": 5.5, "t1": 7.9, "lines": [0], "title_vi": "Giằng co", "desc_vi": "Cận cảnh camera an ninh: hai người vật lộn, hình nhiễu giật."}, {"t0": 7.9, "t1": 10.22, "lines": [0], "title_vi": "Phòng giám sát", "desc_vi": "Bốn màn hình giám sát, một màn hình viền đỏ ghi lại vụ tấn công."}, {"t0": 10.22, "t1": 14.52, "lines": [1], "title_vi": "Mười phút sau", "desc_vi": "Mặt cắt tòa nhà: ba tầng lần lượt chớp đỏ, chữ +10' và 3×."}, {"t0": 14.52, "t1": 20.78, "lines": [2, 3], "title_vi": "Phong tỏa", "desc_vi": "Cửa ra: cuộn thép hạ xuống từng cửa, biển lối thoát chuyển đỏ, chữ 30'."}, {"t0": 20.78, "t1": 26.08, "lines": [3], "title_vi": "Hơn 600 người", "desc_vi": "Các ô cửa sổ có bóng người, bộ đếm 600+, vài ô chuyển đỏ và dấu ?."}, {"t0": 26.08, "t1": 33.58, "lines": [4], "title_vi": "Loa thông báo", "desc_vi": "Loa trần phát sóng âm, đèn báo đỏ nhấp nháy, hàng xóm hé cửa nhìn rồi đóng lại."}, {"t0": 33.58, "t1": 37.44, "lines": [5], "title_vi": "Đã ở trong nhà", "desc_vi": "Hành lang tối, các bóng người nhiễm lần lượt hiện ra từ phía xa."}, {"t0": 37.44, "t1": 43.72, "lines": [6, 7], "title_vi": "Tầng 28 và 35", "desc_vi": "Mặt cắt các tầng 25-38: Artem ở tầng 28, em gái tầng 35, vùng đỏ lan dần lên."}, {"t0": 43.72, "t1": 49.5, "lines": [7], "title_vi": "Cuộc gọi cuối", "desc_vi": "Artem áp điện thoại vào tai, nét mặt lo lắng; tín hiệu đứt, màn hình báo ✕."}, {"t0": 49.5, "t1": 55.16, "lines": [8], "title_vi": "Quy tắc 01", "desc_vi": "Thẻ 01 · TÜR NICHT ÖFFNEN, cánh cửa xích khóa bị gõ ba lần."}, {"t0": 55.16, "t1": 60.36, "lines": [9], "title_vi": "Muốn xuống tầng dưới", "desc_vi": "Artem bước tới cửa, mũi tên xuống, tiếng hét làm anh đứng khựng."}, {"t0": 60.36, "t1": 64.66, "lines": [10], "title_vi": "Qua mắt thần", "desc_vi": "Mắt thần: người đàn ông bê bết máu chạy dọc hành lang."}, {"t0": 64.66, "t1": 69.2, "lines": [11], "title_vi": "Người phụ nữ xuất hiện", "desc_vi": "Mắt thần: cô hàng xóm đầu giật bất thường đi theo sau."}, {"t0": 69.2, "t1": 72.28, "lines": [12], "title_vi": "Bị quật ngã", "desc_vi": "Cô ta đuổi kịp, quật ông xuống sàn, đèn tắt, tiếng hét im bặt."}, {"t0": 72.28, "t1": 77.14, "lines": [13], "title_vi": "Anh hiểu ra", "desc_vi": "Cận mặt Artem lùi lại, bàn tay che miệng, mắt dần hiểu."}, {"t0": 77.14, "t1": 79.36, "lines": [14], "title_vi": "Phản ứng với tiếng động", "desc_vi": "Cận mặt người nhiễm, sóng âm đập vào tai, mắt bật mở."}, {"t0": 79.36, "t1": 83.14, "lines": [15], "title_vi": "Quy tắc 02", "desc_vi": "Thẻ 02 · NICHT AUFFALLEN, điện thoại tắt chuông."}, {"t0": 83.14, "t1": 87.3, "lines": [16], "title_vi": "Tắt đèn, im lặng", "desc_vi": "Tay gạt công tắc, phòng tối sầm, bật chế độ im lặng, Artem rón rén tới cửa."}, {"t0": 87.3, "t1": 92.2, "lines": [17], "title_vi": "Ba người nhiễm", "desc_vi": "Mắt thần: ba người đi từng cửa, nghiêng đầu áp tai nghe."}, {"t0": 92.2, "t1": 95.18, "lines": [18], "title_vi": "Mắt thần cận", "desc_vi": "Cận con mắt Artem sau mắt thần, mồ hôi, mắt liếc sang bên."}, {"t0": 95.18, "t1": 98.46, "lines": [19], "title_vi": "Quy tắc 03", "desc_vi": "Thẻ 03 · NIEMANDEM VERTRAUEN, hai cánh cửa đối diện, một khe sáng có con mắt."}, {"t0": 98.46, "t1": 102.14, "lines": [20], "title_vi": "Người hàng xóm", "desc_vi": "Hành lang nhìn rộng: cửa Artem bên trái, cửa hàng xóm bên phải, ba người nhiễm phía xa."}, {"t0": 102.14, "t1": 106.7, "lines": [21], "title_vi": "Hé cửa", "desc_vi": "Một người nhiễm dừng trước cửa hàng xóm, cửa hé ra một khe."}, {"t0": 106.7, "t1": 110.9, "lines": [22], "title_vi": "Điện thoại báo thức", "desc_vi": "Bàn tay đẩy điện thoại ra, cận màn hình báo thức 21:08."}, {"t0": 110.9, "t1": 115.52, "lines": [23], "title_vi": "Trượt qua sàn", "desc_vi": "Điện thoại trượt ngang hành lang và dừng trước cửa Artem."}, {"t0": 115.52, "t1": 118.12, "lines": [24], "title_vi": "Đóng sầm", "desc_vi": "Cửa hàng xóm đóng sầm, bụi và sóng chấn động."}, {"t0": 118.12, "t1": 119.4, "lines": [25], "title_vi": "Chuông reo", "desc_vi": "Cận điện thoại rung và reo trên sàn."}, {"t0": 119.4, "t1": 122.84, "lines": [26], "title_vi": "Đồng loạt quay đầu", "desc_vi": "Mắt thần: ba người nhiễm cùng quay phắt đầu, mắt đỏ mở to."}, {"t0": 122.84, "t1": 125.02, "lines": [27], "title_vi": "Lao tới", "desc_vi": "Họ lao tới cửa, màn hình đỏ rung."}, {"t0": 125.02, "t1": 128.04, "lines": [28], "title_vi": "Bàn tay nắm cửa", "desc_vi": "Cận cửa nhìn từ trong: tay nắm bị nhấn xuống, cửa vẫn khóa chốt và xích."}]</storyboard_json>
