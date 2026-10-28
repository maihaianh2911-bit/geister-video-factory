<style_md>
# Fünf Seeleute, ein Affe und vier unsichtbare Kokosnüsse — style bible (v24)
- Mood: câu đố toán học sạch, tò mò, nhịp nhanh; không phải hoạt hình kinh dị/zombie, không tranh khắc như video mẫu.
- Palette: giấy trắng ngà #f4efe2 (cảnh ngày/giải) xen nền than #1d2026 (cảnh đêm/chia); nét & chữ xanh hải quân #1f3a68 (phụ #4a6aa0, nhạt #c9d4e6); dừa thật nâu #8a5a32 (bóng #6b4224); vàng dừa #e3a72f / #f6d77e cho mốc, kết quả; đỏ #d9443a CHỈ cho phần dư (quả của khỉ, số 0, −4); xanh lá #3f9b5a cho dấu ✓.
- Dừa thật: hình tròn nâu đặc có ba chấm. Dừa ảo: ĐÚNG BỐN quả, vòng tròn nét đứt xanh hải quân, nền xanh nhạt trong suốt; chỉ xuất hiện ở hook và phần lời giải, không bao giờ vào kho thật hay tay khỉ.
- Nét: 2D phẳng, không viền đen; khay = thanh xanh hải quân có 6 quả đại diện; số lớn Inter 900.
- Nhân vật: đúng một nhóm 5 thủy thủ cố định (áo sọc trắng–xanh hải quân, mũ trắng, số 1–5 trên huy hiệu tròn), một con khỉ nâu mặt kem. Đảo chỉ là dải cát, biển, một cây dừa đơn giản.
- Camera: cắt cứng theo câu, 1–4 s mỗi shot, đẩy/kéo nhẹ, số và công thức bật đúng từ; không hình đứng yên > 2 s.
- Chữ: chỉ nhãn/số: +4, ?, ÷ 5, NACHT 1–5, N' = 4·(N−1)/5, M = N + 4, M' = 4·M/5, (⅘)⁵, 5⁵, 3.125, 3.121, dãy 3.121→2.496→1.996→1.596→1.276→1.020, 1.020 : 5, 204, MIN., − 4.
- Phụ đề: clean (không hộp, chữ trắng viền) để hợp nền giấy/than.
- Tránh: watermark, chữ Việt/Nga của mẫu, tranh khắc, nhân vật người dẫn của mẫu, cả 5 thủy thủ cùng lấy một lúc ban đêm, khỉ nhận quả ở lần chia buổi sáng, vẽ hàng nghìn quả dừa.
</style_md>
<style_json>{"dust": false, "vignette": false, "subtitle": "clean"}</style_json>
<plan>
0.00-4.06 L[0]: Bốn quả dừa không có thật
4.06-6.00 L[1]: Năm thủy thủ
6.00-8.38 L[1]: Đống chung trên đảo
8.38-11.32 L[2]: Đêm 1
11.32-14.62 L[3]: Chia 5, dư 1
14.62-15.90 L[4]: Khỉ nhận
15.90-20.36 L[5]: Giấu phần, gom 4 khay
20.36-24.50 L[6]: Đêm 2→5
24.50-27.04 L[7]: 5 quả cho khỉ
27.04-31.42 L[8]: Sáng: chia đều
31.42-34.78 L[9]: Ban đầu bao nhiêu?
34.78-37.62 L[10]: 3.121
37.62-40.14 L[11]: Mẹo hơn con số
40.14-44.26 L[12]: Thêm 4 quả ảo
44.26-47.30 L[13]: M chia đều cho 5
47.30-50.86 L[13]: ⅘ của M
50.86-53.86 L[14]: Lặp 5 lần
53.86-56.84 L[15]: Chỉ số nguyên
56.84-60.68 L[15]: N + 4 chia hết 5⁵
60.68-65.96 L[16]: 5⁵ = 3.125
65.96-70.04 L[17]: Trừ 4
70.04-74.44 L[18]: Kiểm tra 5 đêm
74.44-76.72 L[19]: Mỗi người 204
76.72-79.84 L[20]: Không ai ăn quả ảo
79.84-84.68 L[21]: Phép tính đơn giản
</plan>
<scene_js>
// v24 — Fünf Seeleute, ein Affe und vier unsichtbare Kokosnüsse. Clean math graphics, flat, no outlines except the navy pen line.
const P = {
  paper: '#f4efe2', paperSh: '#e6dfcc', coal: '#1d2026', coal2: '#2a2e36', navy: '#1f3a68', navy2: '#4a6aa0', navyL: '#c9d4e6',
  coco: '#8a5a32', cocoSh: '#6b4224', cocoHi: '#a8743f', gold: '#e3a72f', goldL: '#f6d77e', red: '#d9443a', green: '#3f9b5a',
  sand: '#e9d9b0', sandSh: '#d6c08f', sea: '#9cc3d8', seaD: '#7aa9c2', leaf: '#3f7a4a', leafD: '#2f5f39', trunk: '#9a7048',
  skin: '#f0c8a0', skinSh: '#d9a77c', hair: '#4a3020', white: '#fbf8f0', ink: '#1d2026',
  mk: '#7a4a28', mkSh: '#5f3720', mkFace: '#e8c9a0', moon: '#f3ead2'
};
const FONT = `font-family:'Inter';font-weight:900`;
function T(s, x, y, size, fill, o = {}) {
  return `<text x="${x}" y="${y}" text-anchor="${o.a || 'middle'}" fill="${fill}" opacity="${o.op ?? 1}"${o.st ? ` stroke="${o.st}" stroke-width="${o.sw || 10}" paint-order="stroke" stroke-linejoin="round"` : ''} style="${FONT};font-size:${size}px">${s}</text>`;
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
  const w = label.length * size * .64 + size * 1.1, h = size * 1.5;
  return `<rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${bg}"/>${T(label, x, y + size * .36, size, fg)}`;
}
const fmt = n => { const s = String(Math.round(n)); return s.length > 3 ? s.slice(0, -3) + '.' + s.slice(-3) : s; };

// ---------- objects ----------
function coco(x, y, r, o = {}) {
  return `<g transform="translate(${x} ${y})">${o.glow ? `<circle r="${r * 1.7}" fill="${o.glow}" opacity=".35" filter="url(#blur8)"/>` : ''}
    <circle r="${r}" fill="${P.coco}"/><path d="M ${-r * .9} ${r * .3} A ${r} ${r} 0 0 0 ${r * .9} ${r * .3} Q 0 ${r * .65} ${-r * .9} ${r * .3} Z" fill="${P.cocoSh}"/>
    <circle cx="${-r * .3}" cy="${-r * .38}" r="${r * .3}" fill="${P.cocoHi}" opacity=".55"/>
    <circle cx="${-r * .22}" cy="${r * .02}" r="${r * .1}" fill="${P.cocoSh}"/><circle cx="${r * .2}" cy="${r * .02}" r="${r * .1}" fill="${P.cocoSh}"/><circle cx="0" cy="${r * .3}" r="${r * .1}" fill="${P.cocoSh}"/>
    ${o.ring ? `<circle r="${r + 10}" fill="none" stroke="${o.ring}" stroke-width="8"/>` : ''}</g>`;
}
function ghostCoco(x, y, r, t, o = {}) {
  const a = o.a ?? 1;
  return `<g transform="translate(${x} ${y})" opacity="${a}">${o.glow ? `<circle r="${r * 1.6}" fill="${P.navy2}" opacity=".25" filter="url(#blur8)"/>` : ''}
    <circle r="${r}" fill="${P.navyL}" fill-opacity=".35" stroke="${P.navy}" stroke-width="${Math.max(4, r * .12)}" stroke-dasharray="${r * .42} ${r * .28}" stroke-dashoffset="${-t * 40}"/>
    <circle cx="${-r * .22}" cy="${r * .02}" r="${r * .1}" fill="${P.navy}" opacity=".6"/><circle cx="${r * .2}" cy="${r * .02}" r="${r * .1}" fill="${P.navy}" opacity=".6"/><circle cx="0" cy="${r * .3}" r="${r * .1}" fill="${P.navy}" opacity=".6"/></g>`;
}
// pyramid pile of up to 21 coconuts; n = how many are drawn (bottom rows first)
const PILE = (() => { const a = []; [6, 5, 4, 3, 2, 1].forEach((k, row) => { for (let i = 0; i < k; i++) a.push([(i - (k - 1) / 2) * 62, -34 - row * 52]); }); return a; })();
function pile(x, y, s, n = 21, o = {}) {
  let g = `<ellipse cx="0" cy="4" rx="${200}" ry="24" fill="#000" opacity=".12"/>`;
  for (let i = 0; i < Math.min(n, 21); i++) g += coco(PILE[i][0], PILE[i][1] + (o.drop ? o.drop(i) : 0), 34);
  return `<g transform="translate(${x} ${y}) scale(${s})">${o.outline ? `<path d="M -220 20 Q 0 -400 220 20 Z" fill="none" stroke="${P.gold}" stroke-width="10" stroke-dasharray="26 16" opacity="${o.outline}"/>` : ''}${g}</g>`;
}
function tray(x, y, s, o = {}) {
  const n = o.n ?? 6, lab = o.lab;
  const SM = [[-44, -28], [0, -28], [44, -28], [-22, -66], [22, -66], [0, -104]];
  let c = '';
  for (let i = 0; i < n; i++) c += coco(SM[i][0], SM[i][1], 22);
  return `<g transform="translate(${x} ${y}) scale(${s})" opacity="${o.a ?? 1}">
    ${o.hi ? `<rect x="-98" y="-150" width="196" height="186" rx="26" fill="${o.hi}" opacity=".3"/>` : ''}
    <rect x="-84" y="-10" width="168" height="30" rx="12" fill="${P.navy}"/><rect x="-84" y="-10" width="168" height="10" rx="5" fill="${P.navy2}"/>
    ${c}${o.ghost ? ghostCoco(70, -64, 22, o.t || 0) : ''}${o.red ? coco(-70, -64, 22, { ring: P.red }) : ''}
    ${lab ? T(lab, 0, 84, 46, o.labCol || P.navy) : ''}</g>`;
}
function sailor(x, y, s, o = {}) {
  const k = o.k || 0, hi = o.hi || 0, walk = o.walk || 0, arm = o.arm || 0;
  const lg = 14 * Math.sin(walk * Math.PI * 2);
  const stripes = [-200, -168, -136].map(yy => `<rect x="-56" y="${yy}" width="112" height="14" fill="${P.navy}"/>`).join('');
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.lean || 0})">
    <ellipse cx="0" cy="4" rx="70" ry="12" fill="#000" opacity=".15"/>
    <rect x="-44" y="-112" width="36" height="112" rx="16" fill="${P.navy}" transform="rotate(${lg} -26 -112)"/><rect x="8" y="-112" width="36" height="112" rx="16" fill="${P.navy}" transform="rotate(${-lg} 26 -112)"/>
    <rect x="-82" y="-226" width="30" height="110" rx="15" fill="${P.white}" transform="rotate(${16 + arm} -67 -220)"/><rect x="52" y="-226" width="30" height="110" rx="15" fill="${P.white}" transform="rotate(${-16 - arm} 67 -220)"/>
    <rect x="-58" y="-236" width="116" height="134" rx="34" fill="${P.white}"/>${stripes}
    <path d="M -30 -236 L 0 -206 L 30 -236 Z" fill="${P.navy}"/>
    <circle cx="0" cy="-290" r="50" fill="${P.skin}"/><path d="M -50 -292 Q -48 -330 0 -330 Q 48 -330 50 -292 Q 30 -306 0 -304 Q -30 -306 -50 -292 Z" fill="${P.hair}"/>
    <ellipse cx="0" cy="-334" rx="58" ry="16" fill="${P.white}"/><rect x="-40" y="-366" width="80" height="34" rx="12" fill="${P.white}"/><rect x="-40" y="-350" width="80" height="10" fill="${P.navy}"/>
    ${o.sleep ? `<path d="M -26 -286 q 8 6 16 0 M 10 -286 q 8 6 16 0" stroke="${P.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>` : `<circle cx="${-16 + (o.look || 0)}" cy="-286" r="6" fill="${P.ink}"/><circle cx="${16 + (o.look || 0)}" cy="-286" r="6" fill="${P.ink}"/>`}
    <path d="M -12 -262 Q 0 ${-256 + (o.smile ? 6 : 0)} 12 -262" stroke="${P.skinSh}" stroke-width="5" fill="none" stroke-linecap="round"/>
    ${k ? `<g transform="translate(0 -420) scale(${1 + .25 * hi})"><circle r="34" fill="${hi ? P.gold : P.navy}"/>${T(String(k), 0, 14, 40, hi ? P.ink : P.white)}</g>` : ''}</g>`;
}
function sleeper(x, y, s, k, t, hi = 0) {
  const z = (t * .7 + k * .23) % 1;
  return `<g transform="translate(${x} ${y})"><g transform="scale(${s}) rotate(-90) translate(0 -60)">${sailor(0, 0, 1, { sleep: 1 })}</g>
    ${T('z', 60 + 30 * z, -90 - 90 * z, 40 + 20 * z, P.navyL, { op: Math.sin(z * Math.PI) })}
    <g transform="translate(-50 -150)"><circle r="26" fill="${hi ? P.gold : P.navy}"/>${T(String(k), 0, 11, 32, hi ? P.ink : P.white)}</g></g>`;
}
function monkey(x, y, s, o = {}) {
  const hop = o.hop || 0, arms = o.arms || 0, look = o.look || 0;
  return `<g transform="translate(${x} ${y - hop}) scale(${s * (o.dir || 1)} ${s})">
    <ellipse cx="0" cy="${4 + hop / s}" rx="80" ry="12" fill="#000" opacity=".15"/>
    <path d="M 50 -30 Q 140 -20 130 -110 Q 120 -160 90 -140" stroke="${P.mk}" stroke-width="16" fill="none" stroke-linecap="round"/>
    <ellipse cx="0" cy="-70" rx="66" ry="74" fill="${P.mk}"/><ellipse cx="0" cy="-56" rx="40" ry="50" fill="${P.mkFace}"/>
    <ellipse cx="-40" cy="-6" rx="30" ry="16" fill="${P.mkSh}"/><ellipse cx="40" cy="-6" rx="30" ry="16" fill="${P.mkSh}"/>
    <rect x="-82" y="-120" width="24" height="90" rx="12" fill="${P.mkSh}" transform="rotate(${20 + arms} -70 -116)"/><rect x="58" y="-120" width="24" height="90" rx="12" fill="${P.mkSh}" transform="rotate(${-20 - arms} 70 -116)"/>
    <circle cx="-62" cy="-196" r="22" fill="${P.mk}"/><circle cx="-62" cy="-196" r="12" fill="${P.mkFace}"/><circle cx="62" cy="-196" r="22" fill="${P.mk}"/><circle cx="62" cy="-196" r="12" fill="${P.mkFace}"/>
    <circle cx="0" cy="-190" r="56" fill="${P.mk}"/><ellipse cx="0" cy="-176" rx="42" ry="36" fill="${P.mkFace}"/>
    <circle cx="${-16 + look}" cy="-196" r="7" fill="${P.ink}"/><circle cx="${16 + look}" cy="-196" r="7" fill="${P.ink}"/>
    ${o.mouth === 'o' ? `<ellipse cx="0" cy="-160" rx="9" ry="11" fill="${P.ink}"/>` : `<path d="M -16 -164 Q 0 ${o.mouth === 'flat' ? -164 : -150} 16 -164" stroke="${P.ink}" stroke-width="5" fill="none" stroke-linecap="round"/>`}
    ${o.hold ? `<g transform="translate(0 -96)">${o.hold}</g>` : ''}</g>`;
}
function palm(x, y, s, t) {
  const sw = 3 * Math.sin(t * 1.3);
  const leaf = a => `<path d="M 0 0 Q ${110 * Math.cos(a)} ${110 * Math.sin(a) - 60} ${220 * Math.cos(a)} ${220 * Math.sin(a) + 20}" stroke="${P.leaf}" stroke-width="34" fill="none" stroke-linecap="round"/>`;
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 0 0 Q 30 -200 ${-20 + sw} -420" stroke="${P.trunk}" stroke-width="40" fill="none" stroke-linecap="round"/>
    <g transform="translate(${-20 + sw} -420) rotate(${sw})">${[-2.9, -2.3, -1.6, -.9, -.25].map(leaf).join('')}${coco(-20, 20, 22)}${coco(18, 26, 22)}</g></g>`;
}
function island(t, night = 0) {
  const sky = night ? P.coal : P.paper;
  return `<rect x="-400" y="-400" width="1880" height="2800" fill="${sky}"/>
    ${night ? `<circle cx="820" cy="420" r="70" fill="${P.moon}"/><circle cx="820" cy="420" r="150" fill="${P.moon}" opacity=".12"/>${[[150, 300], [300, 520], [620, 260], [960, 650], [480, 420]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="4" fill="${P.moon}" opacity=".7"/>`).join('')}`
      : `<circle cx="820" cy="420" r="80" fill="${P.goldL}"/>`}
    <rect x="-400" y="900" width="1880" height="1500" fill="${night ? '#26303f' : P.sea}"/>
    ${[0, 1, 2].map(i => `<path d="M ${-400 + ((t * 40 + i * 300) % 600)} ${960 + i * 70} q 60 -16 120 0" stroke="${night ? '#3a475c' : P.seaD}" stroke-width="8" fill="none" stroke-linecap="round"/>`).join('')}
    <path d="M -400 1240 Q 540 960 1480 1240 L 1480 2400 L -400 2400 Z" fill="${night ? '#3a3a3c' : P.sand}"/>
    <path d="M -400 1300 Q 540 1040 1480 1300" stroke="${night ? '#46464a' : P.sandSh}" stroke-width="10" fill="none"/>`;
}
function nightTag(t, k, t0) {
  const f = back(prog(t, t0, t0 + .25));
  return `<g transform="translate(540 230) scale(${f})">${pill(0, 0, `NACHT ${k}`, 50, P.gold, P.ink)}</g>`;
}
function frac(x, y, num, den, size, col, o = {}) {
  const w = Math.max(num.length, den.length) * size * .6;
  return `<g opacity="${o.op ?? 1}">${T(num, x, y - size * .25, size, col)}<rect x="${x - w / 2}" y="${y - 6}" width="${w}" height="12" rx="6" fill="${col}"/>${T(den, x, y + size * .95, size, col)}</g>`;
}
function bgPaper() { return `<rect x="-400" y="-400" width="1880" height="2800" fill="${P.paper}"/><ellipse cx="540" cy="900" rx="620" ry="840" fill="#fbf8f0" filter="url(#blur40)"/>`; }
function bgCoal() { return `<rect x="-400" y="-400" width="1880" height="2800" fill="${P.coal}"/><ellipse cx="540" cy="900" rx="620" ry="840" fill="${P.coal2}" filter="url(#blur40)"/>`; }
const SX = [150, 330, 540, 750, 930];
const GH4 = [[-150, -360], [-50, -420], [50, -420], [150, -360]];
function ghosts4(cx, cy, s, t, t0s, o = {}) {
  let g = '';
  GH4.forEach(([dx, dy], i) => {
    const p = t0s ? back(prog(t, t0s[i], t0s[i] + .25)) : 1;
    if (p <= 0) return;
    g += `<g transform="translate(${cx + dx * s} ${cy + dy * s + 8 * Math.sin(t * 2 + i)}) scale(${p})">${ghostCoco(0, 0, 40 * s, t, { a: o.a ?? 1, glow: o.glow })}</g>`;
  });
  return g;
}

// ---------- shots ----------
function sHook(t) { // 0 - 4.06
  const z = lerp(1.5, 1.0, eout(prog(t, 0, .45)));
  const [sx, sy] = shk(t, .12, 14, 7);
  const blink = t > 2.85 && t < 3.6 ? (Math.floor(t * 12) % 2 ? .25 : 1) : 1;
  const four = back(prog(t, 1.56, 1.8));
  const scene = `${bgPaper()}${pile(540, 1180, 1.6)}
    ${ghosts4(540, 1180, 1.6, t, [.25, .4, .55, .7], { a: blink, glow: t > 1.56 && t < 2.6 })}
    ${four > 0 ? `<g transform="translate(540 420) scale(${four})">${T('+4', 0, 50, 170, P.navy, { st: P.paper, sw: 14 })}</g>` : ''}
    ${t > 3.1 ? pop(t, 3.1, 860, 560, T('?', 860, 620, 180, P.red)) : ''}`;
  return cam(`<g transform="translate(${sx} ${sy})">${scene}</g>`, z, 540, 960);
}
function sGather(t) { // 4.06 - 6.0 : five sailors appear, toss coconuts into the pile
  let s = island(t), arcs = '';
  SX.forEach((x, i) => { s += pop(t, 4.1 + i * .14, x, 1300, sailor(x, 1420 - (i % 2) * 30, .8, { k: i + 1, arm: 40 * Math.max(0, Math.sin((t - 4.9 - i * .15) * 6)), look: (540 - x) / 60 })); });
  for (let i = 0; i < 8; i++) {
    const t0 = 4.9 + i * .14, p = prog(t, t0, t0 + .45);
    if (p > 0 && p < 1) { const x0 = SX[i % 5], x1 = 540 + 40 * Math.sin(i); arcs += coco(lerp(x0, x1, p), lerp(1150, 1080, p) - 260 * Math.sin(p * Math.PI), 22); }
  }
  const n = Math.round(lerp(3, 12, prog(t, 5.0, 6.0)));
  return cam(`${s}${pile(540, 1160, .7, n)}${arcs}${palm(140, 1200, .9, t)}`, 1.02, 540, 960);
}
function sIsland(t) { // 6.0 - 8.38 : wide island, common pile grows
  const n = Math.round(lerp(12, 21, prog(t, 6.0, 7.5)));
  const z = lerp(1.25, 1.0, eio(prog(t, 6.0, 7.2)));
  let s = island(t);
  SX.forEach((x, i) => { s += sailor(x, 1440 - (i % 2) * 30, .62, { k: i + 1, look: (540 - x) / 60, smile: 1 }); });
  const ol = eout(prog(t, 7.66, 7.9));
  return cam(`${s}${palm(90, 1220, .9, t)}${monkey(950, 1240, .7, { hop: 20 * Math.abs(Math.sin(t * 5)) * (t > 7.6 ? 1 : 0) })}${pile(540, 1180, 1.0, n, { outline: ol })}`, z, 540, 1080);
}
function sNight1(t) { // 8.38 - 11.32 : sailor 1 sneaks to the pile
  const rise = eout(prog(t, 8.9, 9.3));
  const walk = prog(t, 9.4, 10.9);
  let s = island(t, 1);
  [1, 2, 3, 4].forEach(i => { s += sleeper(SX[i] + 10, 1360 - (i % 2) * 30, .4, i + 1, t); });
  s += pile(560, 1200, .85, 21);
  const sx = lerp(150, 400, eio(walk));
  s += rise < 1 ? sleeper(150, 1360, .4, 1, t) : sailor(sx, 1420 - 8 * Math.abs(Math.sin(walk * Math.PI * 5)), .7, { k: 1, hi: 1, walk: walk * 3, lean: 8, look: 10 });
  return cam(s, lerp(1.0, 1.12, prog(t, 8.38, 11.32)), 460, 1150) + nightTag(t, 1, 8.5);
}
const TR5 = [140, 340, 540, 740, 940];
function splitView(t, t0, o = {}) { // pile splits into 5 trays + 1 leftover
  const p = eio(prog(t, t0, t0 + .8));
  let s = '';
  if (p < 1) s += pile(540, 900, lerp(1, .6, p), Math.round(lerp(21, 0, p)));
  TR5.forEach((x, i) => { s += `<g transform="translate(${lerp(540, x * .86 + 76, p)} ${lerp(900, 1080, p)}) scale(${p})">${tray(0, 0, .95, { n: 6, lab: o.labels ? o.labels[i] : '', hi: o.hi && o.hi[i] ? o.hi[i] : '', ghost: o.ghost && i > 0, t })}</g>`; });
  return s;
}
function sDivide(t) { // 11.32 - 14.62 : divide by five, exactly one left
  const one = back(prog(t, 12.72, 13.0));
  const glow = t > 13.18;
  const lbl = back(prog(t, 12.02, 12.25));
  return `${bgCoal()}${splitView(t, 11.5)}
    ${lbl > 0 ? `<g transform="translate(540 470) scale(${lbl})">${T('÷ 5', 0, 50, 140, P.white)}</g>` : ''}
    ${one > 0 ? `<g transform="translate(540 760) scale(${one})">${coco(0, 0, 44, { ring: P.red, glow: glow ? P.red : '' })}</g>` : ''}
    ${t > 13.18 ? pop(t, 13.18, 540, 640, T('1', 540, 670, 90, P.red)) : ''}` + nightTag(t, 1, 11.32);
}
function sMonkey(t) { // 14.62 - 15.9 : the monkey gets it
  const p = prog(t, 14.7, 15.25);
  const caught = t >= 15.25;
  const hop = caught ? 50 * Math.abs(Math.sin((t - 15.25) * 9)) * Math.exp(-(t - 15.25) * 3) : 0;
  return `${bgCoal()}${monkey(760, 1280, 1.5, { hop, arms: caught ? 30 : 70 * p, look: -8, mouth: caught ? 'smile' : 'o', hold: caught ? coco(0, 0, 40, { ring: P.red }) : '' })}
    ${!caught ? coco(lerp(240, 760, p), lerp(760, 1030, p) - 300 * Math.sin(p * Math.PI), 40, { ring: P.red }) : ''}` + nightTag(t, 1, 14.62);
}
function sHide(t) { // 15.9 - 20.36 : sailor hides his share, four trays merge, rule N' = 4(N-1)/5
  const take = eio(prog(t, 16.0, 16.9));
  const gather = eio(prog(t, 17.9, 18.9));
  const f = back(prog(t, 19.22, 19.5));
  let s = `${bgCoal()}<path d="M 40 1380 Q 120 1200 260 1240 Q 320 1180 380 1260 Q 420 1380 40 1380 Z" fill="#33503c"/>`;
  const tx = lerp(TR5[0] * .86 + 76, 150, take), ty = lerp(1080, 1260, take);
  if (take < .98) s += tray(tx, ty, .95 * (1 - .4 * take), { n: 6 });
  s += sailor(lerp(260, 190, take), 1420, .7, { k: 1, hi: 1, arm: 50 * (1 - take), lean: -6 * take, look: -12 });
  s += `<path d="M 60 1390 Q 140 1230 270 1270 Q 330 1210 390 1290 Q 420 1400 60 1390 Z" fill="#3f6248"/>`;
  [1, 2, 3, 4].forEach(i => { if (gather < 1) s += tray(lerp(TR5[i] * .86 + 76, 640 + (i - 2.5) * 60, gather), lerp(1080, 1040, gather), .95, { n: 6, a: 1 - gather * .7 }); });
  if (gather > 0) s += pile(640, 1080, lerp(.3, .8, gather), Math.round(lerp(4, 17, gather)));
  if (gather > .9) s += T('4 × ⅕', 640, 1200, 60, P.goldL, { op: cl((gather - .9) * 10) });
  return s + (f > 0 ? `<g transform="translate(540 600) scale(${f}) translate(-540 -600)"><rect x="150" y="440" width="780" height="300" rx="30" fill="${P.paper}"/>
    ${T("N' =", 330, 630, 96, P.navy)}${frac(640, 600, '4 · (N − 1)', '5', 84, P.navy)}</g>` : '') + nightTag(t, 1, 15.9);
}
function sRepeat(t) { // 20.36 - 24.5 : nights 2-5, one sailor after the other
  const N = [[2, 20.8], [3, 21.65], [4, 22.5], [5, 23.35]];
  let k = 1, t0 = 20.36;
  N.forEach(([kk, tt]) => { if (t >= tt) { k = kk; t0 = tt; } });
  const ph = prog(t, t0, t0 + .85);
  let s = bgCoal();
  for (let i = 1; i <= 5; i++) {
    const x = 120 + (i - 1) * 210;
    if (i === k && k > 1) s += sailor(x, 1440, .55, { k: i, hi: 1, arm: 40 * Math.sin(ph * Math.PI) });
    else s += sleeper(x + 20, 1380 - (i % 2) * 30, .36, i, t, 0);
  }
  const sz = lerp(1.0, .62, (k - 1) / 4) * (1 - .12 * eout(ph));
  s += pile(540, 1060, sz, 21);
  if (k > 1) {
    const mp = prog(ph, .1, .6);
    if (mp > 0 && mp < 1) s += coco(lerp(540, 940, mp), lerp(900, 760, mp) - 160 * Math.sin(mp * Math.PI), 30, { ring: P.red });
    const tp = prog(ph, .3, .8);
    if (tp > 0 && tp < 1) s += tray(lerp(540, 120 + (k - 1) * 210, tp), lerp(1000, 1260, tp), .6 * (1 - tp * .5), { n: 6 });
  }
  s += monkey(950, 800, .7, { hop: k > 1 && ph > .55 && ph < .8 ? 30 : 0, arms: 30 });
  return s + (k > 1 ? nightTag(t, k, t0) : nightTag(t, 1, 20.36));
}
function sMonkey5(t) { // 24.5 - 27.04 : one coconut for the monkey each time
  let row = '';
  for (let i = 0; i < 5; i++) {
    const p = back(prog(t, 24.6 + i * .35, 24.85 + i * .35));
    if (p > 0) row += `<g transform="translate(${180 + i * 180} 600) scale(${p})">${coco(0, 0, 56, { ring: P.red })}${T(String(i + 1), 0, 120, 44, P.goldL)}</g>`;
  }
  const happy = t > 26.4 ? 40 * Math.abs(Math.sin((t - 26.4) * 8)) : 0;
  return `${bgCoal()}${row}${monkey(540, 1380, 1.6, { hop: happy, arms: 40, mouth: 'smile', look: 0 })}`;
}
function sMorning(t) { // 27.04 - 31.42 : morning, split into five — no leftover
  const p = eio(prog(t, 27.9, 28.7));
  const zero = back(prog(t, 29.84, 30.1));
  let s = island(t);
  s += `<rect x="-400" y="-400" width="1880" height="2800" fill="${P.coal}" opacity="${.6 * (1 - eout(prog(t, 27.04, 27.6)))}"/>`;
  SX.forEach((x, i) => { s += sailor(x, 1300, .55, { k: i + 1, smile: 1, look: (540 - x) / 80 }); });
  if (p < 1) s += pile(540, 1000, lerp(.62, .3, p), Math.round(lerp(21, 0, p)));
  SX.forEach((x, i) => { s += `<g transform="translate(${lerp(540, x, p)} ${lerp(1000, 1350, p)}) scale(${p})">${tray(0, 0, .65, { n: 6 })}</g>`; });
  s += monkey(960, 880, .6, { mouth: t > 30 ? 'flat' : 'smile', arms: t > 30 ? 60 : 20, look: -6 });
  if (zero > 0) s += `<g transform="translate(540 820) scale(${zero})"><circle r="70" fill="none" stroke="${P.red}" stroke-width="8" stroke-dasharray="18 12"/>${T('0', 0, 34, 96, P.red)}</g>`;
  return cam(s, 1.0, 540, 1000);
}
function sQuestion(t) { // 31.42 - 34.78
  const q = back(prog(t, 31.9, 32.2));
  const wob = 6 * Math.sin(t * 5);
  const minP = back(prog(t, 33.48, 33.75));
  return `${bgPaper()}${pile(540, 1300, 1.4, 21, { outline: .5 + .5 * Math.sin(t * 4) })}
    ${q > 0 ? `<g transform="translate(540 560) rotate(${wob}) scale(${q})">${T('?', 0, 110, 340, P.red)}</g>` : ''}
    ${minP > 0 ? `<g transform="translate(540 1460) scale(${minP})">${pill(0, 0, 'MIN.', 50, P.navy, P.white)}</g>` : ''}`;
}
function sAnswer(t) { // 34.78 - 37.62 : 3.121
  const roll = prog(t, 35.0, 35.7);
  const n = t < 35.7 ? Math.floor(eout(roll) * 3121) : 3121;
  const done = t >= 35.7 ? 1 + .1 * ring(t, 35.7, 3, 5) : 1;
  return `${bgCoal()}${pile(540, 1340, .9, 21)}
    <g transform="translate(540 760) scale(${done})">${T(fmt(n), 0, 70, 240, t >= 35.7 ? P.goldL : P.white)}</g>`;
}
function sTrick(t) { // 37.62 - 40.14 : the trick outweighs the number (balance)
  const tip = eio(prog(t, 38.4, 39.0)) * -12 + 2 * Math.sin(t * 3);
  const L = [-260, 0], R = [260, 0];
  const rad = tip * Math.PI / 180;
  const ly = -260 * Math.sin(-rad), ry = 260 * Math.sin(-rad);
  return `${bgCoal()}<g transform="translate(540 820) scale(1.45)">
    <rect x="-14" y="-20" width="28" height="360" fill="${P.navy2}"/><rect x="-120" y="330" width="240" height="30" rx="12" fill="${P.navy2}"/>
    <g transform="rotate(${tip})"><rect x="-300" y="-12" width="600" height="24" rx="12" fill="${P.navyL}"/></g>
    <g transform="translate(-260 ${-ly})"><path d="M -110 60 L 110 60 L 80 100 L -80 100 Z" fill="${P.navyL}"/><line x1="0" y1="0" x2="-100" y2="60" stroke="${P.navyL}" stroke-width="4"/><line x1="0" y1="0" x2="100" y2="60" stroke="${P.navyL}" stroke-width="4"/>${T('3.121', 0, 40, 64, P.white)}</g>
    <g transform="translate(260 ${ry})"><path d="M -110 60 L 110 60 L 80 100 L -80 100 Z" fill="${P.navyL}"/><line x1="0" y1="0" x2="-100" y2="60" stroke="${P.navyL}" stroke-width="4"/><line x1="0" y1="0" x2="100" y2="60" stroke="${P.navyL}" stroke-width="4"/>
      ${pop(t, 37.96, 0, 20, `${ghostCoco(-40, 20, 34, t)}${ghostCoco(40, 20, 34, t)}${ghostCoco(-40, -44, 34, t)}${ghostCoco(40, -44, 34, t)}`)}</g>
    <circle r="22" fill="${P.gold}"/></g>`;
}
function sAdd4(t) { // 40.14 - 44.26 : add four invisible coconuts -> M = N + 4
  const f = back(prog(t, 43.2, 43.5));
  return `${bgPaper()}${pile(540, 1250, 1.4, 21)}
    ${ghosts4(540, 1250, 1.4, t, [41.56, 41.8, 42.04, 42.28], { glow: t < 43 })}
    ${T('N', 540, 1380, 70, P.coco, { op: cl(prog(t, 40.3, 40.6)) })}
    ${f > 0 ? `<g transform="translate(540 400) scale(${f}) translate(-540 -400)"><rect x="170" y="290" width="740" height="200" rx="30" fill="${P.white}"/>${T('M = N + 4', 540, 430, 110, P.navy)}</g>` : ''}`;
}
function sNightM(t) { // 44.26 - 47.3 : M splits into 5 equal trays; tray 1 = share + monkey; 4 dashed in trays 2-5
  const lbl = back(prog(t, 45.3, 45.6));
  return `${bgCoal()}${splitView(t, 44.4, { ghost: 1, hi: t > 46.68 ? ['', P.goldL, P.goldL, P.goldL, P.goldL] : [] })}
    ${t > 45.0 ? `<g opacity="${cl(prog(t, 45.0, 45.3))}">${coco(TR5[0] * .86 + 76 - 50, 990, 22, { ring: P.red })}</g>` : ''}
    ${lbl > 0 ? `<g transform="translate(540 520) scale(${lbl})">${T('M ÷ 5', 0, 40, 120, P.white)}</g>` : ''}`;
}
function sFourFifths(t) { // 47.3 - 50.86 : real rest + 4 = 4/5 of M  ->  M' = 4M/5
  const br = eout(prog(t, 48.26, 48.6)), all = eout(prog(t, 49.28, 49.6));
  const f = back(prog(t, 49.9, 50.2));
  const gp = .5 + .5 * Math.sin(t * 6);
  let s = `${bgCoal()}`;
  TR5.forEach((x, i) => { s += tray(x * .86 + 76, 1120, .95, { n: 6, ghost: i > 0, t, hi: i > 0 ? P.goldL : '' }); });
  s += coco(TR5[0] * .86 + 76 - 50, 1030, 22, { ring: P.red });
  if (t < 47.9) [1, 2, 3, 4].forEach(i => { s += `<circle cx="${TR5[i] * .86 + 76 + 66}" cy="${1056}" r="${40 + 10 * gp}" fill="none" stroke="${P.navyL}" stroke-width="6"/>`; });
  if (br > 0) s += `<path d="M 290 ${1260} V ${1290} H ${lerp(290, 960, br)} V 1260" stroke="${P.goldL}" stroke-width="10" fill="none"/>${T('⁴⁄₅ · M', 625, 1370, 64, P.goldL, { op: br })}`;
  if (all > 0) s += `<path d="M 110 ${900} V ${870} H ${lerp(110, 960, all)} V 900" stroke="${P.white}" stroke-width="8" fill="none"/>${T('M', 535, 850, 64, P.white, { op: all })}`;
  return s + (f > 0 ? `<g transform="translate(540 520) scale(${f}) translate(-540 -520)"><rect x="170" y="380" width="740" height="280" rx="30" fill="${P.paper}"/>${T("M' =", 380, 560, 110, P.navy)}${frac(640, 530, '4 · M', '5', 96, P.navy)}</g>` : '');
}
function sChain(t) { // 50.86 - 53.86 : same step five times
  let s = bgPaper();
  const xs = [100, 270, 440, 610, 780, 950];
  for (let i = 0; i < 6; i++) {
    const p = back(prog(t, 50.9 + i * .3, 51.15 + i * .3));
    if (p <= 0) continue;
    s += `<g transform="translate(${xs[i]} 860) scale(${p * (1 - i * .08)})">${i === 0 ? `<circle r="56" fill="${P.navy}"/>${T('M', 0, 22, 60, P.white)}` : `<circle r="50" fill="${P.navy2}"/>`}</g>`;
    if (i > 0) {
      const ap = eout(prog(t, 50.9 + i * .3 - .15, 50.9 + i * .3 + .1));
      s += `<path d="M ${xs[i - 1] + 50} 760 Q ${(xs[i - 1] + xs[i]) / 2} ${690} ${xs[i] - 46} 760" stroke="${P.gold}" stroke-width="9" fill="none" pathLength="1" style="stroke-dasharray:${ap} 1"/>`;
      s += T('×⅘', (xs[i - 1] + xs[i]) / 2, 670, 58, P.navy, { op: ap });
      s += T(String(i), xs[i], 990, 50, P.navy2, { op: p });
    }
  }
  const f = back(prog(t, 52.64, 52.9));
  return s + (f > 0 ? `<g transform="translate(540 1220) scale(${f}) translate(-540 -1220)"><rect x="200" y="1110" width="680" height="220" rx="30" fill="${P.white}"/>${T('M · (⅘)', 510, 1260, 100, P.navy)}${T('5', 712, 1200, 64, P.red)}</g>` : '');
}
function sWhole(t) { // 53.86 - 56.84 : only whole numbers
  const card = back(prog(t, 53.95, 54.25));
  const chk = back(prog(t, 55.36, 55.6));
  let blocks = '';
  for (let i = 0; i < 5; i++) { const p = back(prog(t, 54.6 + i * .1, 54.85 + i * .1)); if (p > 0) blocks += `<g transform="translate(${260 + i * 140} 1200) scale(${p})"><rect x="-56" y="-56" width="112" height="112" rx="18" fill="${P.navy2}"/></g>`; }
  const half = back(prog(t, 55.0, 55.25));
  return `${bgPaper()}
    ${card > 0 ? `<g transform="translate(540 640) scale(${card}) translate(-540 -640)"><rect x="110" y="460" width="860" height="360" rx="30" fill="${P.white}"/>
      ${T('M ·', 300, 670, 100, P.navy)}${frac(560, 640, '4⁵', '5⁵', 100, P.navy)}${T('= ?', 790, 670, 100, P.navy)}</g>` : ''}
    ${blocks}${half > 0 ? `<g transform="translate(960 1200) scale(${half})" opacity="${1 - chk * .7}"><rect x="-56" y="-56" width="56" height="112" rx="12" fill="${P.red}" stroke="${P.red}" stroke-dasharray="10 8"/></g>` : ''}
    ${chk > 0 ? `<g transform="translate(540 1000) scale(${chk})"><circle r="56" fill="${P.green}"/><path d="M -26 2 L -8 22 L 28 -20" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : ''}`;
}
function sDivisible(t) { // 56.84 - 60.68 : N + 4 must be divisible by 5^5
  const a = back(prog(t, 56.9, 57.2)), b = back(prog(t, 58.36, 58.6)), c = back(prog(t, 59.26, 59.5)), ok = back(prog(t, 59.9, 60.15));
  const pulse = 1 + .05 * Math.sin(t * 8) * (t > 59.6 ? 1 : 0);
  return `${bgCoal()}
    ${a > 0 ? `<g transform="translate(540 600) scale(${a * pulse})"><rect x="-300" y="-120" width="600" height="200" rx="30" fill="${P.navy}"/>${T('N + 4', 0, 30, 130, P.white)}</g>` : ''}
    ${b > 0 ? `<g transform="translate(540 800) scale(${b})"><rect x="-280" y="-10" width="560" height="20" rx="10" fill="${P.goldL}"/></g>` : ''}
    ${c > 0 ? `<g transform="translate(540 1000) scale(${c})">${T('5', -20, 40, 150, P.goldL)}${T('5', 60, -30, 80, P.goldL)}</g>` : ''}
    ${ok > 0 ? `<g transform="translate(840 1000) scale(${ok})"><circle r="56" fill="${P.green}"/><path d="M -26 2 L -8 22 L 28 -20" stroke="#fff" stroke-width="12" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : ''}
    ${ghosts4(540, 1380, .7, t, null, { a: .7 })}`;
}
function sPow(t) { // 60.68 - 65.96 : 5·5·5·5·5 = 3.125
  let s = bgPaper(), fives = '';
  const sup = back(prog(t, 60.7, 60.95)) * (1 - prog(t, 60.95, 61.1));
  if (sup > 0) s += `<g transform="translate(540 640) scale(${sup})">${T('5', -20, 60, 200, P.navy)}${T('5', 80, -40, 110, P.red)}</g>`;
  for (let i = 0; i < 5; i++) {
    const p = back(prog(t, 61.0 + i * .2, 61.25 + i * .2));
    if (p > 0) fives += `<g transform="translate(${160 + i * 190} 520) scale(${p})"><circle r="70" fill="${P.navy}"/>${T('5', 0, 30, 90, P.white)}</g>${i < 4 && p >= 1 ? T('·', 255 + i * 190, 550, 90, P.navy) : ''}`;
  }
  const roll = prog(t, 62.9, 63.6), n = Math.floor(eout(roll) * 3125);
  const show = t >= 62.9;
  const pileP = eout(prog(t, 64.0, 64.6));
  return s + fives + (show ? `<g transform="translate(540 760) scale(${t >= 63.6 ? 1 + .08 * ring(t, 63.6, 3, 5) : 1})">${T('= ' + fmt(t >= 63.6 ? 3125 : n), 0, 60, 170, P.navy)}</g>` : '')
    + (pileP > 0 ? `<g opacity="${pileP}">${pile(540, 1380, .9, 21)}${ghosts4(540, 1380, .9, t, null)}${T('M', 820, 1300, 80, P.navy)}</g>` : '');
}
function sMinus4(t) { // 65.96 - 70.04 : take the four away again -> 3.121
  const fly = eio(prog(t, 66.0, 66.9));
  const roll = prog(t, 66.4, 67.3), n = 3125 - Math.round(4 * roll);
  const done = t >= 67.48;
  let g = '';
  GH4.forEach(([dx, dy], i) => { g += ghostCoco(540 + dx * 1.2 + (dx > 0 ? 1 : -1) * 700 * fly, 1400 + dy * 1.2 - 300 * fly, 48, t, { a: 1 - fly }); });
  return `${bgPaper()}${pile(540, 1400, 1.2, 21, { outline: done ? .8 : 0 })}${g}
    ${t > 66.0 ? pop(t, 66.0, 860, 420, pill(860, 420, '− 4', 64, P.red, P.white)) : ''}
    <g transform="translate(540 700) scale(${done ? 1 + .1 * ring(t, 67.48, 3, 5) : 1})">${T((done ? 'N = ' : '') + fmt(n), 0, 60, 170, done ? P.coco : P.navy)}</g>`;
}
const SEQ = [3121, 2496, 1996, 1596, 1276, 1020];
function sSeq(t) { // 70.04 - 74.44 : check: 3.121 -> ... -> 1.020
  let s = bgCoal();
  SEQ.forEach((v, i) => {
    const t0 = 70.2 + i * .3, p = back(prog(t, t0, t0 + .25));
    if (p <= 0) return;
    const y = 360 + i * 175, last = i === 5;
    s += `<g transform="translate(540 ${y}) scale(${p * (last && t > 71.75 ? 1 + .12 * ring(t, 71.75, 3, 5) + .15 : 1)})">${T(fmt(v), 0, 30, last ? 110 : 84, last ? P.goldL : P.white)}</g>`;
    if (i > 0) s += `<g opacity="${p}"><path d="M 540 ${y - 135} V ${y - 85}" stroke="${P.navy2}" stroke-width="8"/>${T(`${i}`, 400, y - 90, 40, P.navy2)}${coco(700, y - 108, 18, { ring: P.red })}</g>`;
  });
  return s;
}
function sShare(t) { // 74.44 - 76.72 : 1.020 : 5 = 204 each, no monkey
  const p = eio(prog(t, 74.6, 75.3));
  let s = bgPaper();
  s += `<g transform="translate(540 ${lerp(600, 420, p)}) scale(${lerp(1, .7, p)})">${T('1.020 : 5', 0, 50, 140, P.navy)}</g>`;
  SX.forEach((x, i) => { s += `<g transform="translate(${lerp(540, x, p)} ${lerp(900, 980, p)}) scale(${p})">${tray(0, 0, .75, { n: 6 })}</g>`; s += sailor(x, 1380, .5, { k: i + 1, smile: 1 }); });
  for (let i = 0; i < 5; i++) s += pop(t, 75.7 + i * .06, SX[i], 1080, T('204', SX[i], 1100, 54, P.navy));
  return s;
}
function sNobody(t) { // 76.72 - 79.84 : nobody ate the four invisible ones
  const look = 12 * Math.sin(t * 2);
  return `${bgPaper()}${ghosts4(540, 1150, 1.6, t, [76.8, 76.95, 77.1, 77.25], { glow: 1 })}
    ${monkey(870, 1360, .9, { look: -14, mouth: 'flat', arms: 10 })}
    ${t > 78.4 ? pop(t, 78.4, 870, 980, T('?', 870, 1010, 110, P.navy)) : ''}
    ${SX.slice(0, 3).map((x, i) => sailor(x, 1400, .5, { k: i + 1, look })).join('')}`;
}
function sEnd(t) { // 79.84 - 84.684 : hard story -> simple calculation; ends on the hook image (loop)
  const m = eio(prog(t, 80.6, 81.6));
  const eq = back(prog(t, 82.1, 82.4));
  const back2 = eio(prog(t, 83.8, 84.6));
  let story = '';
  for (let i = 0; i < 5; i++) story += `<g transform="translate(${200 + (i % 3) * 300 + 40 * Math.sin(t + i)} ${560 + Math.floor(i / 3) * 280})" opacity="${1 - m}">${tray(0, 0, .7, { n: 4, lab: `${i + 1}`, labCol: P.navy2 })}</g>`;
  return `${bgPaper()}${story}
    <g opacity="${1 - back2}">${eq > 0 ? `<g transform="translate(540 760) scale(${eq})"><rect x="-420" y="-130" width="840" height="230" rx="34" fill="${P.navy}"/>${T('N = 5', -40, 30, 130, P.white)}${T('5', 150, -40, 70, P.goldL)}${T('− 4', 290, 30, 130, P.white)}</g>` : ''}</g>
    <g opacity="${lerp(.25, 1, back2)}">${pile(540, 1300, lerp(.9, 1.6, back2), 21)}${ghosts4(540, 1300, lerp(.9, 1.6, back2), t, null)}</g>`;
}
const SHOTS = [[0, sHook], [4.06, sGather], [6.0, sIsland], [8.38, sNight1], [11.32, sDivide], [14.62, sMonkey], [15.9, sHide], [20.36, sRepeat], [24.5, sMonkey5],
  [27.04, sMorning], [31.42, sQuestion], [34.78, sAnswer], [37.62, sTrick], [40.14, sAdd4], [44.26, sNightM], [47.3, sFourFifths], [50.86, sChain],
  [53.86, sWhole], [56.84, sDivisible], [60.68, sPow], [65.96, sMinus4], [70.04, sSeq], [74.44, sShare], [76.72, sNobody], [79.84, sEnd]];
function scene(t) {
  let f = SHOTS[0][1];
  for (const [t0, fn] of SHOTS) if (t >= t0) f = fn;
  try { return f(t); } catch (e) { return `<rect x="0" y="0" width="1080" height="1920" fill="${P.coal}"/>${'<g></g>'.repeat(40)}`; }
}

</scene_js>
<events_json>{"music": "science_curious", "events": [{"t": 0.0, "type": "whoosh", "dur": 0.3, "gain": 0.5}, {"t": 0.12, "type": "hit", "gain": 0.6, "weight": "hero"}, {"t": 0.25, "type": "pop", "gain": 0.35}, {"t": 0.4, "type": "pop", "gain": 0.35}, {"t": 0.55, "type": "pop", "gain": 0.35}, {"t": 0.7, "type": "pop", "gain": 0.35}, {"t": 1.56, "type": "shimmer", "dur": 0.8, "gain": 0.4}, {"t": 2.85, "type": "static", "dur": 0.6, "gain": 0.2}, {"t": 3.1, "type": "pop", "gain": 0.4}, {"t": 4.1, "type": "pop", "gain": 0.3}, {"t": 4.24, "type": "pop", "gain": 0.3}, {"t": 4.38, "type": "pop", "gain": 0.3}, {"t": 4.52, "type": "pop", "gain": 0.3}, {"t": 4.66, "type": "pop", "gain": 0.3}, {"t": 5.3, "type": "plop", "gain": 0.3}, {"t": 5.6, "type": "plop", "gain": 0.3}, {"t": 5.9, "type": "plop", "gain": 0.3}, {"t": 6.0, "type": "whoosh", "dur": 0.3, "gain": 0.3}, {"t": 7.66, "type": "ting", "f": 659.25, "gain": 0.4}, {"t": 8.38, "type": "hit", "gain": 0.45, "f0": 100, "f1": 60, "dur": 0.4}, {"t": 8.5, "type": "stamp", "gain": 0.4}, {"t": 9.0, "type": "rustle", "dur": 0.4, "gain": 0.3}, {"t": 9.4, "type": "steps", "dur": 1.5, "gain": 0.3}, {"t": 11.5, "type": "whoosh", "dur": 0.4, "gain": 0.35}, {"t": 12.02, "type": "stamp", "gain": 0.4}, {"t": 12.72, "type": "pop", "gain": 0.45}, {"t": 13.18, "type": "ting", "f": 880, "gain": 0.45, "weight": "hero"}, {"t": 14.7, "type": "whoosh", "dur": 0.4, "gain": 0.35}, {"t": 15.25, "type": "plop", "gain": 0.5}, {"t": 16.0, "type": "slide", "f0": 500, "f1": 300, "dur": 0.8, "gain": 0.3}, {"t": 16.9, "type": "rustle", "dur": 0.4, "gain": 0.3}, {"t": 17.9, "type": "whoosh", "dur": 0.5, "gain": 0.3}, {"t": 18.9, "type": "plop", "gain": 0.35}, {"t": 19.22, "type": "stamp", "gain": 0.5, "weight": "hero"}, {"t": 20.8, "type": "tick", "f": 1400, "gain": 0.35}, {"t": 21.65, "type": "tick", "f": 1500, "gain": 0.35}, {"t": 22.5, "type": "tick", "f": 1600, "gain": 0.35}, {"t": 23.35, "type": "tick", "f": 1700, "gain": 0.35}, {"t": 24.6, "type": "ting", "f": 523.25, "gain": 0.35}, {"t": 24.95, "type": "ting", "f": 587.33, "gain": 0.35}, {"t": 25.3, "type": "ting", "f": 659.25, "gain": 0.35}, {"t": 25.65, "type": "ting", "f": 783.99, "gain": 0.35}, {"t": 26.0, "type": "ting", "f": 880, "gain": 0.4}, {"t": 27.04, "type": "whoosh", "dur": 0.4, "gain": 0.3}, {"t": 27.9, "type": "whoosh", "dur": 0.6, "gain": 0.35}, {"t": 29.84, "type": "womp", "gain": 0.4}, {"t": 31.9, "type": "hit", "gain": 0.55, "weight": "hero"}, {"t": 33.48, "type": "pop", "gain": 0.35}, {"t": 35.0, "type": "riser", "dur": 0.7, "f0": 300, "f1": 900, "gain": 0.35}, {"t": 35.7, "type": "hit", "gain": 0.75, "weight": "hero"}, {"t": 37.96, "type": "shimmer", "dur": 0.6, "gain": 0.35}, {"t": 38.4, "type": "clank", "gain": 0.35}, {"t": 40.14, "type": "whoosh", "dur": 0.3, "gain": 0.3}, {"t": 41.56, "type": "ting", "f": 659.25, "gain": 0.35}, {"t": 41.8, "type": "ting", "f": 783.99, "gain": 0.35}, {"t": 42.04, "type": "ting", "f": 880, "gain": 0.35}, {"t": 42.28, "type": "ting", "f": 1046.5, "gain": 0.35}, {"t": 43.2, "type": "stamp", "gain": 0.5}, {"t": 44.4, "type": "whoosh", "dur": 0.6, "gain": 0.35}, {"t": 45.3, "type": "pop", "gain": 0.35}, {"t": 46.68, "type": "shimmer", "dur": 0.6, "gain": 0.3}, {"t": 48.26, "type": "click", "gain": 0.4}, {"t": 49.28, "type": "click", "gain": 0.4}, {"t": 49.9, "type": "stamp", "gain": 0.55, "weight": "hero"}, {"t": 50.9, "type": "tick", "f": 1200, "gain": 0.3}, {"t": 51.2, "type": "tick", "f": 1300, "gain": 0.3}, {"t": 51.5, "type": "tick", "f": 1400, "gain": 0.3}, {"t": 51.8, "type": "tick", "f": 1500, "gain": 0.3}, {"t": 52.1, "type": "tick", "f": 1600, "gain": 0.3}, {"t": 52.64, "type": "pop", "gain": 0.45}, {"t": 53.95, "type": "whoosh", "dur": 0.3, "gain": 0.3}, {"t": 54.6, "type": "pop", "gain": 0.3}, {"t": 55.0, "type": "womp", "gain": 0.3}, {"t": 55.36, "type": "ting", "f": 987.77, "gain": 0.45}, {"t": 56.9, "type": "stamp", "gain": 0.45}, {"t": 58.36, "type": "click", "gain": 0.35}, {"t": 59.26, "type": "pop", "gain": 0.4}, {"t": 59.9, "type": "ting", "f": 1046.5, "gain": 0.5, "weight": "hero"}, {"t": 61.0, "type": "pop", "gain": 0.3}, {"t": 61.2, "type": "pop", "gain": 0.3}, {"t": 61.4, "type": "pop", "gain": 0.3}, {"t": 61.6, "type": "pop", "gain": 0.3}, {"t": 61.8, "type": "pop", "gain": 0.3}, {"t": 62.9, "type": "riser", "dur": 0.7, "f0": 300, "f1": 900, "gain": 0.3}, {"t": 63.6, "type": "hit", "gain": 0.7, "weight": "hero"}, {"t": 66.0, "type": "whoosh", "dur": 0.8, "gain": 0.4}, {"t": 66.4, "type": "tick", "f": 1500, "gain": 0.3}, {"t": 67.48, "type": "hit", "gain": 0.6, "weight": "hero"}, {"t": 70.2, "type": "tick", "f": 1200, "gain": 0.3}, {"t": 70.5, "type": "tick", "f": 1300, "gain": 0.3}, {"t": 70.8, "type": "tick", "f": 1400, "gain": 0.3}, {"t": 71.1, "type": "tick", "f": 1500, "gain": 0.3}, {"t": 71.4, "type": "tick", "f": 1600, "gain": 0.3}, {"t": 71.75, "type": "ting", "f": 1046.5, "gain": 0.5, "weight": "hero"}, {"t": 74.6, "type": "whoosh", "dur": 0.6, "gain": 0.35}, {"t": 75.7, "type": "ting", "f": 783.99, "gain": 0.4}, {"t": 76.8, "type": "shimmer", "dur": 0.8, "gain": 0.35}, {"t": 78.4, "type": "pop", "gain": 0.35}, {"t": 80.6, "type": "whoosh", "dur": 0.8, "gain": 0.35}, {"t": 82.1, "type": "hit", "gain": 0.55, "weight": "hero"}, {"t": 83.8, "type": "shimmer", "dur": 0.8, "gain": 0.35}]}</events_json>
<storyboard_json>[{"t0": 0.0, "t1": 4.06, "lines": [0], "title_vi": "Bốn quả dừa không có thật", "desc_vi": "Đống dừa nâu, bốn quả nét đứt bật vào; +4; chúng nhấp nháy, dấu ? đỏ."}, {"t0": 4.06, "t1": 6.0, "lines": [1], "title_vi": "Năm thủy thủ", "desc_vi": "Năm thủy thủ số 1–5 bật ra trên bãi cát, tung dừa vào đống."}, {"t0": 6.0, "t1": 8.38, "lines": [1], "title_vi": "Đống chung trên đảo", "desc_vi": "Toàn cảnh đảo: cây dừa, khỉ, đống chung lớn dần, viền vàng."}, {"t0": 8.38, "t1": 11.32, "lines": [2], "title_vi": "Đêm 1", "desc_vi": "NACHT 1: bốn người ngủ (z), thủy thủ 1 dậy rón rén tới đống dừa."}, {"t0": 11.32, "t1": 14.62, "lines": [3], "title_vi": "Chia 5, dư 1", "desc_vi": "Đống chia ra 5 khay bằng nhau, ÷ 5; còn đúng một quả viền đỏ."}, {"t0": 14.62, "t1": 15.9, "lines": [4], "title_vi": "Khỉ nhận", "desc_vi": "Quả đỏ bay sang con khỉ, khỉ bắt và nhún."}, {"t0": 15.9, "t1": 20.36, "lines": [5], "title_vi": "Giấu phần, gom 4 khay", "desc_vi": "Thủy thủ 1 mang khay của mình giấu sau bụi; 4 khay còn lại gom thành đống; thẻ N' = 4·(N−1)/5."}, {"t0": 20.36, "t1": 24.5, "lines": [6], "title_vi": "Đêm 2→5", "desc_vi": "NACHT 2, 3, 4, 5 lần lượt: mỗi đêm một thủy thủ dậy, một quả đỏ sang khỉ, một khay mang đi, đống nhỏ dần."}, {"t0": 24.5, "t1": 27.04, "lines": [7], "title_vi": "5 quả cho khỉ", "desc_vi": "Năm quả đỏ xếp hàng đánh số 1–5, khỉ vui."}, {"t0": 27.04, "t1": 31.42, "lines": [8], "title_vi": "Sáng: chia đều", "desc_vi": "Trời sáng, đống chia 5 khay cho cả 5 người; khỉ không được quả nào: vòng đỏ 0."}, {"t0": 31.42, "t1": 34.78, "lines": [9], "title_vi": "Ban đầu bao nhiêu?", "desc_vi": "Đống dừa với dấu ? đỏ lớn, nhãn MIN."}, {"t0": 34.78, "t1": 37.62, "lines": [10], "title_vi": "3.121", "desc_vi": "Số đếm nhanh lên 3.121, chốt vàng."}, {"t0": 37.62, "t1": 40.14, "lines": [11], "title_vi": "Mẹo hơn con số", "desc_vi": "Cân: 3.121 một bên, 4 quả nét đứt bên kia; cân nghiêng về mẹo."}, {"t0": 40.14, "t1": 44.26, "lines": [12], "title_vi": "Thêm 4 quả ảo", "desc_vi": "Đống N, bốn quả nét đứt bay vào từng quả; thẻ M = N + 4."}, {"t0": 44.26, "t1": 47.3, "lines": [13], "title_vi": "M chia đều cho 5", "desc_vi": "M ÷ 5: 5 khay bằng nhau; khay 1 có quả đỏ của khỉ, khay 2–5 mỗi khay chứa một quả ảo."}, {"t0": 47.3, "t1": 50.86, "lines": [13], "title_vi": "⅘ của M", "desc_vi": "Khay 2–5 sáng vàng, ngoặc ⁴⁄₅ · M, ngoặc M; thẻ M' = 4·M/5."}, {"t0": 50.86, "t1": 53.86, "lines": [14], "title_vi": "Lặp 5 lần", "desc_vi": "Chuỗi M →×⅘ năm lần (1–5); thẻ M · (⅘)⁵."}, {"t0": 53.86, "t1": 56.84, "lines": [15], "title_vi": "Chỉ số nguyên", "desc_vi": "Thẻ M · 4⁵/5⁵ = ?; khối nguyên xanh, khối lẻ đỏ mờ đi, dấu ✓."}, {"t0": 56.84, "t1": 60.68, "lines": [15], "title_vi": "N + 4 chia hết 5⁵", "desc_vi": "N + 4 trên gạch chia, 5⁵ bên dưới, dấu ✓."}, {"t0": 60.68, "t1": 65.96, "lines": [16], "title_vi": "5⁵ = 3.125", "desc_vi": "Năm số 5 bật ra, = 3.125; đống M kèm bốn quả ảo."}, {"t0": 65.96, "t1": 70.04, "lines": [17], "title_vi": "Trừ 4", "desc_vi": "Bốn quả ảo bay đi, − 4, số lăn 3.125→3.121: N = 3.121."}, {"t0": 70.04, "t1": 74.44, "lines": [18], "title_vi": "Kiểm tra 5 đêm", "desc_vi": "Dãy 3.121 → 2.496 → 1.996 → 1.596 → 1.276 → 1.020, mỗi bước một quả đỏ cho khỉ; 1.020 vàng."}, {"t0": 74.44, "t1": 76.72, "lines": [19], "title_vi": "Mỗi người 204", "desc_vi": "1.020 : 5 → 5 khay cho 5 thủy thủ, mỗi khay 204."}, {"t0": 76.72, "t1": 79.84, "lines": [20], "title_vi": "Không ai ăn quả ảo", "desc_vi": "Bốn quả nét đứt lơ lửng nguyên vẹn; khỉ nhìn, dấu ?."}, {"t0": 79.84, "t1": 84.684, "lines": [21], "title_vi": "Phép tính đơn giản", "desc_vi": "Các khay câu chuyện mờ đi, thẻ N = 5⁵ − 4; kết về đống dừa + 4 quả ảo như mở đầu (vòng lặp)."}]</storyboard_json>
