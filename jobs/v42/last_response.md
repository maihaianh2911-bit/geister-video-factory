<style_md># v42 – Wenn jemand dich unbewusst nachmacht · Style bible

**Mood:** clean, clever, like a nice notebook page (Kênh 5 kinetic typography); light humour from the two figures copying each other.

**Background:** cream paper `#F4EFE6` with a faint square grid `#E3DCCF`, very soft corner shading. Never dark.

**Text cards (top half, y 230–730):** one card per sentence: white card `#FFFDF8` with ink border and a dashed inner note frame, slight tilt, slides in from the right. Keyword huge, Inter 900, coloured: blue `#2F4BDB` (you), orange `#F28C28` (your counterpart), teal `#14A38B` (good/result), red `#E5484D` (warning, "kein Zufall"), violet `#7A5AF8` (brain); grey `#A8A29A` for the control group. Lead-in line small in serif italic (Liberation Serif) ink `#2B2B2B`. Yellow marker `#FFD84D` swipes under key words; stamps for `KEIN ZUFALL`, `GETESTET`, `NICHT ÜBERTREIBEN`; hand-drawn ✓ / ✗. Owner texts: `KEIN ZUFALL`, `CHAMÄLEON-EFFEKT`, `MEHR TRINKGELD`, `TEST: ZURÜCKLEHNEN`.

**Figures (bottom half, y 830–1400):** two simple stick figures at a small café table, facing each other: left = you, blue shirt; right = counterpart, orange shirt (grey when the person does *not* mirror). Thick ink lines (8–11 px), round white heads with dot eyes, poses blend smoothly: rest, talk, chin on hand, glass, lean back, scratch head, wave. Waitress in the restaurant part: teal shirt, white apron, notepad.

**Motion:** text appears on the spoken word; the counterpart copies each pose a beat later; cards switch with a quick slide; nothing holds still > 2 s. Thin progress bar with a red dot along the top edge (channel signature).

**Subtitles:** `default`. No dust, no vignette.

**Avoid:** dark backgrounds, long sentences on cards, study author names, manipulation tips.
</style_md>
<style_json>{"dust": false, "vignette": false, "subtitle": "default"}</style_json>
<plan>0.00–4.38 [0] KEIN ZUFALL: Thẻ: “Wenn jemand genauso sitzt wie du …” + GENAUSO? gạch bút dạ; người áo cam lập tức chống cằm giống người áo xanh; tem đỏ KEIN ZUFALL.
4.38–5.66 [1] Để ý xem: Thẻ ACHTE MAL DRAUF với con mắt; hai người ngồi bình thường, liếc nhau.
5.66–7.42 [2] Bạn chống cằm: Thẻ KINN AUF DIE HAND (xanh); người áo xanh chống cằm.
7.42–10.46 [3] Vài giây sau: Đếm 1-2-3; người áo cam chống cằm theo; thẻ DASSELBE (cam).
10.46–15.22 [4] Cười và cầm ly: Người xanh cười, cầm ly; người cam cũng cầm ly; thẻ LACHEN + GLAS → AUCH GLAS.
15.22–17.46 [5] Không cố ý: Thẻ KEINE ABSICHT với dấu ✗; hai người thả lỏng, chớp mắt.
17.46–20.12 [6] Bộ não tự làm: Thẻ DEIN GEHIRN (tím); hai bộ não tím hiện trên đầu, đường nối chấm.
20.12–22.66 [7] CHAMÄLEON-EFFEKT: Thẻ CHAMÄLEON-EFFEKT (xanh ngọc) + con tắc kè hoa; hai người cùng nghiêng tới.
22.66–24.20 [8] Đã thử nghiệm: Tem GETESTET và bảng ghi chép.
24.20–30.14 [9] Nhóm A: Người lạ (áo cam) lén bắt chước tư thế và cử chỉ của người áo xanh; thẻ MACHT HEIMLICH NACH.
30.14–33.22 [10] Nhóm B: Người đối diện (áo xám) ngồi yên không bắt chước; thẻ NICHT NACHGEMACHT với ✗.
33.22–36.30 [11] Thích hơn: Thẻ MOCHTE IHN MEHR; trái tim đỏ hiện trên người áo xanh.
36.30–39.44 [12] Nói chuyện nhẹ nhàng: Bong bóng thoại trôi qua lại; thẻ GESPRÄCH LEICHTER.
39.44–42.28 [13] Không ai nhận ra: Thẻ NIEMAND HAT'S BEMERKT (đỏ); hai dấu ? trên đầu.
42.28–45.88 [14] Nhà hàng Hà Lan: Thẻ “Restaurant · Niederlande” + cờ Hà Lan + SOGAR UM GELD; đồng xu.
45.88–50.36 [15] Nhắc lại nguyên văn: Khách gọi món (bong bóng), cô phục vụ nhắc lại đúng như vậy (=); thẻ WORT FÜR WORT.
50.36–52.90 [16] „Kommt sofort.“: Với khách khác (áo xám) cô chỉ nói „KOMMT SOFORT.“
52.90–57.60 [17] MEHR TRINKGELD: Hai bàn: chồng xu cao bên khách được nhắc lại, chồng thấp bên kia; thẻ MEHR TRINKGELD ✓.
57.60–62.84 [18] Dấu hiệu tốt: Hai người cùng nghiêng tới, cùng nâng ly, cười; thẻ GUTES ZEICHEN ✓.
62.84–64.50 [19] Đừng làm quá: Tem đỏ NICHT ÜBERTREIBEN.
64.50–68.86 [20] Bắt chước mọi động tác: Người cam copy ngay lập tức từng động tác (gãi đầu, vẫy tay, chống cằm, cầm ly, ngả ra); người xanh toát mồ hôi; thẻ WIRKT SELTSAM.
68.86–72.98 [21] TEST: ZURÜCKLEHNEN: Thẻ TEST: ZURÜCKLEHNEN (tím); người xanh từ từ ngả người ra sau.
72.98–77.96 [22] Đếm xem: Đồng hồ bấm giờ, đếm 1…4; người cam cũng ngả ra sau; thẻ DASSELBE ✓.</plan>
<scene_js>
// v42 — Chamäleon-Effekt. Kinetic typography on cream grid paper + two stick figures at a café table mirroring each other.
const K = { paper: '#F4EFE6', grid: '#E3DCCF', ink: '#2B2B2B', blue: '#2F4BDB', red: '#E5484D', orange: '#F28C28', teal: '#14A38B', violet: '#7A5AF8', marker: '#FFD84D', card: '#FFFDF8', grey: '#A8A29A', wood: '#C99B6D', woodDk: '#A97B4F', skin: '#FFFFFF' };
const OL = K.ink;
const SANS = `font-family:'Inter';font-weight:900`;
const SERIF = `font-family:'Liberation Serif','DejaVu Serif',serif;font-style:italic;font-weight:400`;
const ST = (w = 3) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const pop = (t, t0, d = .25) => back(prog(t, t0, t0 + d));
const shk = (t, t0, a, dec = 8, f = 41) => t < t0 ? 0 : a * Math.exp(-(t - t0) * dec) * Math.sin((t - t0) * f);
const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const DUR = 77.964;

let GRID = '';
for (let x = 0; x <= 1080; x += 54) GRID += `<path d="M ${x} 0 V 1920" stroke="${K.grid}" stroke-width="2"/>`;
for (let y = 0; y <= 1920; y += 54) GRID += `<path d="M 0 ${y} H 1080" stroke="${K.grid}" stroke-width="2"/>`;
const KDEFS = `<defs><radialGradient id="kcorner" cx=".5" cy=".5" r=".75"><stop offset=".7" stop-color="#000" stop-opacity="0"/><stop offset="1" stop-color="#6B5B45" stop-opacity=".18"/></radialGradient>
<filter id="kshadow" x="-10%" y="-10%" width="120%" height="130%"><feDropShadow dx="0" dy="8" stdDeviation="10" flood-color="#6B5B45" flood-opacity=".22"/></filter></defs>`;
const paper = () => `${R(0, 0, 1080, 1920, K.paper)}${GRID}${R(0, 0, 1080, 1920, 'url(#kcorner)')}`;

// ---------- kinetic text ----------
function fitSize(txt, maxW, maxSz) { return Math.min(maxSz, maxW / (txt.length * .7)); }
function keyword(x, y, txt, col, p, o = {}) {
  if (p <= 0) return '';
  const sz = o.sz || fitSize(txt, o.maxW || 900, o.max || 150);
  const w = txt.length * sz * .68;
  const hl = o.hl !== undefined ? o.hl : 0;
  return `<g transform="translate(${x} ${y}) scale(${p}) rotate(${o.rot || 0})">${hl > 0 ? `<rect x="${-w / 2 - 14}" y="${sz * .02}" width="${(w + 28) * cl(hl)}" height="${sz * .4}" rx="10" fill="${K.marker}" opacity=".85" transform="skewX(-8)"/>` : ''}
    <text x="0" y="${sz * .36}" text-anchor="middle" style="${SANS};font-size:${sz}px;letter-spacing:1px" fill="${col}">${txt}</text></g>`;
}
function serifLine(x, y, txt, p, sz = 54) { if (p <= 0) return ''; return `<text x="${x}" y="${y}" text-anchor="middle" style="${SERIF};font-size:${sz}px" fill="${K.ink}" opacity="${cl(p)}" transform="translate(${(1 - cl(p)) * -40} 0)">${txt}</text>`; }
function stamp(x, y, rot, txt, col, p, sz = 90) {
  if (p <= 0) return '';
  const w = txt.length * sz * .7 + 70, h = sz * 1.5, sc = 1 + 1.2 * (1 - cl(p));
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})" opacity="${cl(p * 3)}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="16" fill="${K.card}" fill-opacity=".85" stroke="${col}" stroke-width="10"/><rect x="${-w / 2 + 14}" y="${-h / 2 + 14}" width="${w - 28}" height="${h - 28}" rx="8" fill="none" stroke="${col}" stroke-width="4"/>
    <text x="0" y="${sz * .36}" text-anchor="middle" style="${SANS};font-size:${sz}px;letter-spacing:3px" fill="${col}">${txt}</text></g>`;
}
function check(x, y, s, p, col = K.teal) { if (p <= 0) return ''; return `<path transform="translate(${x} ${y}) scale(${s})" d="M -40 0 L -10 30 L 46 -36" stroke="${col}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1" style="stroke-dasharray:${cl(p)} 1"/>`; }
function cross(x, y, s, p, col = K.red) { if (p <= 0) return ''; return `<path transform="translate(${x} ${y}) scale(${s})" d="M -36 -36 L 36 36 M 36 -36 L -36 36" stroke="${col}" stroke-width="16" fill="none" stroke-linecap="round" pathLength="2" style="stroke-dasharray:${2 * cl(p)} 2"/>`; }
function card(inner, p, o = {}) {
  if (p <= 0) return '';
  const x = lerp(o.fromX ?? 1300, 540, eout(cl(p))), y = o.y || 480;
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || -1.5})" filter="url(#kshadow)"><rect x="-480" y="-250" width="960" height="500" rx="28" fill="${K.card}" stroke="${OL}" stroke-width="3"/><rect x="-460" y="-230" width="920" height="460" rx="20" fill="none" stroke="${K.grid}" stroke-width="3" stroke-dasharray="14 10"/></g><g transform="translate(${x - 540} ${y - 480})">${inner}</g>`;
}
function progress(t) { const p = cl(t / DUR); return `<path d="M 60 70 H 1020" stroke="${OL}" stroke-width="4" opacity=".35"/><path d="M 60 70 H ${60 + 960 * p}" stroke="${OL}" stroke-width="6"/><circle cx="${60 + 960 * p}" cy="70" r="12" fill="${K.red}" ${ST(3)}/>`; }

// ---------- stick figures ----------
function ik(sx, sy, tx, ty, U, F, sign = 1) {
  const dx = tx - sx, dy = ty - sy; let d = Math.hypot(dx, dy); d = Math.min(Math.max(d, 1), U + F - .5);
  const a = Math.atan2(dy, dx), A = Math.acos(cl((U * U + d * d - F * F) / (2 * U * d), -1, 1));
  const ea = a + sign * A;
  return [sx + U * Math.cos(ea), sy + U * Math.sin(ea), sx + d * Math.cos(a), sy + d * Math.sin(a)];
}
const POSES = {
  rest: { h1: [78, 92], h2: [52, 100], lean: 4, tilt: 0 },
  talk: { h1: [96, 20], h2: [52, 100], lean: 6, tilt: 4 },
  chin: { h1: [30, -22], h2: [58, 96], lean: 12, tilt: 8 },
  glass: { h1: [52, -10], h2: [56, 96], lean: 4, tilt: -6 },
  lean: { h1: [-18, -96], h2: [-34, -84], lean: -20, tilt: -6 },
  scratch: { h1: [8, -96], h2: [56, 96], lean: 2, tilt: 10 },
  wave: { h1: [70, -150], h2: [56, 96], lean: 0, tilt: 0 },
  forward: { h1: [86, 70], h2: [70, 84], lean: 16, tilt: 4 },
};
function poseMix(a, b, p) { const A = POSES[a], B = POSES[b]; return { h1: [lerp(A.h1[0], B.h1[0], p), lerp(A.h1[1], B.h1[1], p)], h2: [lerp(A.h2[0], B.h2[0], p), lerp(A.h2[1], B.h2[1], p)], lean: lerp(A.lean, B.lean, p), tilt: lerp(A.tilt, B.tilt, p) }; }
// keys: [[t, poseName], ...] → pose at time t with 0.35 s transitions
function poseAt(keys, t, dur = .35) {
  let i = 0; for (let k = 0; k < keys.length; k++) if (t >= keys[k][0]) i = k;
  const prev = i > 0 ? keys[i - 1][1] : keys[0][1];
  return poseMix(prev, keys[i][1], eio(prog(t, keys[i][0], keys[i][0] + (keys[i][2] || dur))));
}
function stick(x, y, s, col, pose, o = {}) {
  const dir = o.dir || 1, lr = pose.lean * Math.PI / 180;
  const Sx = Math.sin(lr) * 125, Sy = -Math.cos(lr) * 125;
  const tilt = pose.tilt + (o.tiltAdd || 0);
  const Hx = Sx + Math.sin(lr) * 58, Hy = Sy - Math.cos(lr) * 58;
  const [e2x, e2y, h2x, h2y] = ik(Sx, Sy, Sx + pose.h2[0], Sy + pose.h2[1], 66, 74, 1);
  const [e1x, e1y, h1x, h1y] = ik(Sx, Sy, Sx + pose.h1[0], Sy + pose.h1[1], 66, 74, 1);
  const m = o.mouth || 'smile';
  const mouth = m === 'laugh' ? `<path d="M 6 14 Q 22 34 36 12 Z" fill="${OL}"/>` : m === 'o' ? `<ellipse cx="22" cy="18" rx="7" ry="9" fill="${OL}"/>` : m === 'flat' ? `<path d="M 10 18 H 32" ${ST(5)}/>` : m === 'worried' ? `<path d="M 10 22 Q 21 12 32 22" ${ST(5)} fill="none"/>` : `<path d="M 8 14 Q 21 28 34 12" ${ST(5)} fill="none"/>`;
  const eyes = o.eyes === 'closed' ? `<path d="M 4 -6 q 6 -6 12 0 M 24 -6 q 6 -6 12 0" ${ST(4)} fill="none"/>` : `<circle cx="${10 + (o.look || 0)}" cy="-6" r="5" fill="${OL}"/><circle cx="${30 + (o.look || 0)}" cy="-6" r="5" fill="${OL}"/>`;
  const glass = o.glass ? `<g transform="translate(${h1x + 8} ${h1y - 16})"><path d="M -16 -34 L 16 -34 L 12 22 L -12 22 Z" fill="#E8F4F8" ${ST(4)}/><path d="M -14 -10 L 14 -10 L 11 20 L -11 20 Z" fill="${o.glassC || '#F2B544'}"/></g>` : '';
  return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})">
    <path d="M 0 0 L 74 6 L 80 96 M 0 0 L 66 14 L 70 98" ${ST(10)} fill="none"/>
    <path d="M ${Sx} ${Sy} L ${e2x} ${e2y} L ${h2x} ${h2y}" stroke="#6E6A64" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${h2x}" cy="${h2y}" r="9" fill="#6E6A64"/>
    <path d="M 0 0 L ${Sx} ${Sy}" stroke="${OL}" stroke-width="52" stroke-linecap="round"/><path d="M 0 0 L ${Sx} ${Sy}" stroke="${col}" stroke-width="40" stroke-linecap="round"/>
    <g transform="translate(${Hx} ${Hy}) rotate(${tilt})"><circle r="44" fill="${K.skin}" ${ST(8)}/><g transform="translate(-8 0)">${eyes}${mouth}</g>${o.sweat ? `<path d="M -30 -40 q 8 14 0 20 q -8 -6 0 -20 Z" fill="#BFE6F2" ${ST(3)}/>` : ''}</g>
    <path d="M ${Sx} ${Sy} L ${e1x} ${e1y} L ${h1x} ${h1y}" ${ST(11)} fill="none"/><path d="M ${Sx} ${Sy} L ${e1x} ${e1y}" stroke="${col}" stroke-width="5" stroke-linecap="round"/><circle cx="${h1x}" cy="${h1y}" r="10" fill="${OL}"/>
    ${glass}</g>`;
}
function cafe(t, o = {}) {
  const ty = 1180;
  return `<g>${o.noTable ? '' : `<ellipse cx="540" cy="${ty + 230}" rx="330" ry="26" fill="#6B5B45" opacity=".15"/>`}
    <path d="M 210 1225 L 190 1400 M 250 1225 L 250 1400 M 150 1225 L 150 1060" ${ST(9)}/><path d="M 140 1225 H 270" ${ST(12)}/>
    <path d="M 870 1225 L 890 1400 M 830 1225 L 830 1400 M 930 1225 L 930 1060" ${ST(9)}/><path d="M 810 1225 H 940" ${ST(12)}/>
    ${o.left || ''}${o.right || ''}
    ${o.noTable ? '' : `<path d="M 380 ${ty} H 700" stroke="${K.woodDk}" stroke-width="22" stroke-linecap="round"/><path d="M 380 ${ty} H 700" ${ST(4)}/><path d="M 540 ${ty} V 1400 M 470 1400 H 610" ${ST(10)}/>`}
    ${o.top || ''}</g>`;
}
const BLUE_X = 300, ORANGE_X = 780, FIG_Y = 1225, FIG_S = 1.6;
function pair(t, kb, ko, o = {}) {
  const pb = poseAt(kb, t), po = poseAt(ko, t);
  return cafe(t, {
    left: stick(BLUE_X, FIG_Y, FIG_S, o.bCol || K.blue, pb, { dir: 1, mouth: o.bm, glass: o.bg, look: o.bl, sweat: o.bs, eyes: o.be, tiltAdd: o.bt }),
    right: stick(ORANGE_X, FIG_Y, FIG_S, o.oCol || K.orange, po, { dir: -1, mouth: o.om, glass: o.og, look: o.ol, sweat: o.os, eyes: o.oe, tiltAdd: o.ot }),
    top: o.top, noTable: o.noTable,
  });
}
function icon(kind, x, y, s, p, t) {
  if (p <= 0) return '';
  let g = '';
  if (kind === 'eye') g = `<path d="M -70 0 Q 0 -60 70 0 Q 0 60 -70 0 Z" fill="#fff" ${ST(5)}/><circle r="26" fill="${K.blue}" ${ST(4)}/><circle r="10" fill="${OL}"/>`;
  if (kind === 'brain') g = `<path d="M -60 20 Q -80 -30 -40 -50 Q -20 -80 20 -60 Q 70 -70 70 -20 Q 90 20 50 40 Q 20 60 -10 46 Q -50 60 -60 20 Z" fill="${K.violet}" ${ST(5)}/><path d="M -30 -40 Q -10 -20 -30 0 M 20 -50 Q 0 -20 20 0 M 0 -60 V 40" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/>`;
  if (kind === 'cham') g = `<path d="M -80 10 Q -60 -50 10 -46 Q 60 -44 70 0 Q 74 30 40 34 L -40 34 Q -70 34 -80 10 Z" fill="${K.teal}" ${ST(5)}/><circle cx="40" cy="-10" r="14" fill="#fff" ${ST(3)}/><circle cx="${42 + 4 * Math.sin(t * 3)}" cy="-10" r="6" fill="${OL}"/><path d="M -80 10 Q -110 20 -100 50 Q -90 70 -70 56 Q -64 44 -76 40" fill="none" ${ST(6)}/><path d="M 70 6 Q 110 ${10 + 10 * Math.sin(t * 6)} 130 0" stroke="${K.red}" stroke-width="6" fill="none"/>`;
  if (kind === 'clip') g = `<rect x="-50" y="-60" width="100" height="130" rx="10" fill="#fff" ${ST(5)}/><rect x="-24" y="-72" width="48" height="24" rx="6" fill="${K.grey}" ${ST(3)}/><path d="M -30 -20 H 30 M -30 6 H 30 M -30 32 H 14" ${ST(5)}/>`;
  if (kind === 'heart') g = `<path d="M 0 40 C -40 10 -60 -10 -60 -30 C -60 -60 -20 -66 0 -40 C 20 -66 60 -60 60 -30 C 60 -10 40 10 0 40 Z" fill="${K.red}" ${ST(5)}/>`;
  if (kind === 'coin') g = `<circle r="50" fill="${K.marker}" ${ST(5)}/><text x="0" y="22" text-anchor="middle" style="${SANS};font-size:60px" fill="${OL}">€</text>`;
  if (kind === 'nl') g = `<rect x="-70" y="-48" width="140" height="32" fill="#AE1C28" ${ST(3)}/><rect x="-70" y="-16" width="140" height="32" fill="#fff" ${ST(3)}/><rect x="-70" y="16" width="140" height="32" fill="#21468B" ${ST(3)}/>`;
  if (kind === 'watch') { const a = (t * 2) % 6.283; g = `<circle r="60" fill="#fff" ${ST(6)}/><rect x="-12" y="-82" width="24" height="18" fill="${OL}"/><path d="M 0 0 L ${Math.sin(a) * 44} ${-Math.cos(a) * 44}" stroke="${K.red}" stroke-width="7" stroke-linecap="round"/><circle r="6" fill="${OL}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s * p})">${g}</g>`;
}
function bubble(x, y, w, h, inner, p, tail = -1) { if (p <= 0) return ''; return `<g transform="translate(${x} ${y}) scale(${p})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="30" fill="#fff" ${ST(5)}/><path d="M ${tail * 20} ${h / 2 - 2} L ${tail * 60} ${h / 2 + 50} L ${tail * 70} ${h / 2 - 2} Z" fill="#fff" ${ST(5)}/><rect x="${-w / 2 + 3}" y="${h / 2 - 8}" width="${w - 6}" height="6" fill="#fff"/>${inner}</g>`; }
const scribble = (w, n, seed) => Array.from({ length: n }, (_, i) => `<path d="M ${-w / 2 + 30} ${-((n - 1) * 26) / 2 + i * 26} h ${(w - 60) * (.6 + .4 * hash(seed + i))}" stroke="${K.grey}" stroke-width="10" stroke-linecap="round"/>`).join('');

// ---------- shots ----------
function s0(t) { // hook
  const hl = prog(t, .25, .8);
  const z = pop(t, 2.94, .22);
  const kb = [[0, 'chin']], ko = [[0, 'rest'], [.45, 'chin', .25]];
  return `${paper()}${card(`${serifLine(540, 330, 'Wenn jemand genauso sitzt wie du …', 1)}${z <= 0 ? keyword(540, 520, 'GENAUSO?', K.blue, 1, { hl }) : stamp(540, 520, -6, 'KEIN ZUFALL', K.red, z, 104)}`, 1, { fromX: 540 })}
    ${pair(t, kb, ko, { om: t > .5 ? 'smile' : 'flat' })}`;
}
function s1(t) {
  const p = eout(prog(t, 4.38, 4.62));
  return `${paper()}${card(`${keyword(540, 450, 'ACHTE MAL DRAUF', K.ink, pop(t, 4.5, .22), { max: 110 })}${icon('eye', 540, 600, 1, pop(t, 4.8, .25), t)}`, p)}
    ${pair(t, [[4.38, 'rest']], [[4.38, 'rest']], { bl: 4 * Math.sin(t * 6), ol: -4 * Math.sin(t * 6) })}`;
}
function s2(t) {
  const p = eout(prog(t, 5.66, 5.9));
  return `${paper()}${card(`${serifLine(540, 340, 'Du …', pop(t, 5.7, .2))}${keyword(540, 520, 'KINN AUF DIE HAND', K.blue, pop(t, 6.2, .25), { max: 110 })}`, p)}
    ${pair(t, [[5.66, 'rest'], [6.1, 'chin', .4]], [[5.66, 'talk'], [6.6, 'rest']], { om: talkM(t, 5.7, 6.5) })}`;
}
function talkM(t, a, b) { return t > a && t < b && hash(Math.floor(t * 9)) > .4 ? 'o' : 'smile'; }
function s3(t) {
  const p = eout(prog(t, 7.42, 7.66));
  const secs = Math.min(3, Math.floor((t - 7.6) / .45) + 1);
  return `${paper()}${card(`${serifLine(540, 330, 'ein paar Sekunden später …', pop(t, 7.5, .2))}${t > 7.6 && t < 9.0 ? keyword(540, 500, `${'·'.repeat(Math.max(0, secs))} ${secs}`, K.grey, 1, { sz: 120 }) : ''}${keyword(540, 520, 'DASSELBE', K.orange, pop(t, 9.4, .25), { hl: prog(t, 9.6, 10.0) })}`, p)}
    ${pair(t, [[7.42, 'chin']], [[7.42, 'rest'], [9.0, 'chin', .5]], { om: t > 9.5 ? 'smile' : 'flat' })}`;
}
function s4(t) {
  const p = eout(prog(t, 10.46, 10.7));
  return `${paper()}${card(`${keyword(540, 400, 'LACHEN + GLAS', K.blue, pop(t, 11.1, .25), { max: 120 })}${keyword(540, 580, '→ AUCH GLAS', K.orange, pop(t, 13.9, .25), { max: 110, hl: prog(t, 14.1, 14.6) })}`, p)}
    ${pair(t, [[10.46, 'chin'], [10.6, 'rest', .3], [11.1, 'glass', .5]], [[10.46, 'chin'], [11.0, 'rest', .4], [12.6, 'glass', .6]], { bm: t > 10.58 && t < 11.3 ? 'laugh' : 'smile', bt: t > 10.58 && t < 11.3 ? -12 : 0, bg: t > 11.1, og: t > 12.6, om: t > 13 ? 'smile' : 'flat' })}`;
}
function s5(t) {
  const p = eout(prog(t, 15.22, 15.46));
  const sway = Math.sin(t * 2);
  return `${paper()}${card(`${keyword(540, 470, 'KEINE ABSICHT', K.red, pop(t, 15.6, .25), { max: 120 })}${cross(850, 330, 1, prog(t, 16.4, 16.8))}`, p)}
    ${pair(t, [[15.22, 'glass'], [15.8, 'rest', .5]], [[15.22, 'glass'], [16.1, 'rest', .5]], { bt: 4 * sway, ot: 4 * sway, be: t > 16.6 && t < 16.8 ? 'closed' : '', oe: t > 16.62 && t < 16.82 ? 'closed' : '' })}`;
}
function s6(t) {
  const p = eout(prog(t, 17.46, 17.7));
  const b = pop(t, 17.66, .3);
  const link = prog(t, 18.3, 19.0);
  const hy = FIG_Y - 125 * FIG_S - 58 * FIG_S - 120;
  return `${paper()}${card(`${keyword(540, 420, 'DEIN GEHIRN', K.violet, pop(t, 17.6, .25), { max: 130 })}${serifLine(540, 560, 'macht das ganz von allein', pop(t, 18.5, .25))}`, p)}
    ${pair(t, [[17.46, 'rest']], [[17.46, 'rest']], {})}
    ${icon('brain', BLUE_X + 60, hy, .9, b, t)}${icon('brain', ORANGE_X - 60, hy, .9, b, t)}
    ${link > 0 ? `<path d="M ${BLUE_X + 130} ${hy} Q 540 ${hy - 120} ${lerp(BLUE_X + 130, ORANGE_X - 130, link)} ${hy}" stroke="${K.violet}" stroke-width="8" fill="none" stroke-dasharray="16 12"/>` : ''}`;
}
function s7(t) {
  const p = eout(prog(t, 20.12, 20.36));
  return `${paper()}${card(`${serifLine(540, 320, 'Psychologen nennen das …', pop(t, 20.2, .2))}${keyword(540, 500, 'CHAMÄLEON-EFFEKT', K.teal, pop(t, 21.9, .3), { max: 120, hl: prog(t, 22.1, 22.5) })}`, p)}
    ${pair(t, [[20.12, 'rest'], [20.6, 'forward', .5]], [[20.12, 'rest'], [21.0, 'forward', .5]], {})}${icon('cham', 540, 900, 1.1, pop(t, 21.99, .3), t)}`;
}
function s8(t) {
  const p = eout(prog(t, 22.66, 22.9));
  return `${paper()}${card(`${stamp(540, 480, -5, 'GETESTET', K.blue, pop(t, 23.3, .2), 110)}`, p)}${icon('clip', 540, 1000, 1.4, pop(t, 22.8, .3), t)}
    ${pair(t, [[22.66, 'forward'], [23.2, 'rest']], [[22.66, 'forward'], [23.3, 'rest']], {})}`;
}
function s9(t) {
  const p = eout(prog(t, 24.2, 24.44));
  // stranger secretly copies with a short delay
  const kb = [[24.2, 'talk'], [25.3, 'chin', .4], [27.6, 'scratch', .4], [28.5, 'talk', .3]];
  const ko = [[24.2, 'rest'], [26.0, 'chin', .5], [28.1, 'scratch', .4], [29.1, 'talk', .4]];
  return `${paper()}${card(`${serifLine(540, 330, 'Gruppe A: eine fremde Person …', pop(t, 24.3, .2))}${keyword(540, 520, 'MACHT HEIMLICH NACH', K.orange, pop(t, 26.96, .3), { max: 110, hl: prog(t, 27.2, 27.7) })}`, p)}
    ${pair(t, kb, ko, { bm: talkM(t, 24.4, 29.8), ol: t > 25.8 && t < 26.4 ? 10 : 0, oCol: K.orange })}`;
}
function s10(t) {
  const p = eout(prog(t, 30.14, 30.38));
  return `${paper()}${card(`${serifLine(540, 330, 'Gruppe B:', pop(t, 30.2, .2))}${keyword(540, 520, 'NICHT NACHGEMACHT', K.grey, pop(t, 32.24, .3), { max: 110 })}${cross(860, 330, 1, prog(t, 32.44, 32.8))}`, p)}
    ${pair(t, [[30.14, 'talk'], [31.0, 'chin', .4], [32.0, 'glass', .4]], [[30.14, 'rest']], { bm: talkM(t, 30.3, 32.9), bg: t > 32.0, oCol: K.grey })}`;
}
function s11(t) {
  const p = eout(prog(t, 33.22, 33.46));
  const h = pop(t, 35.82, .3);
  return `${paper()}${card(`${serifLine(540, 330, 'Wer nachgeahmt wurde …', pop(t, 33.3, .2))}${keyword(540, 520, 'MOCHTE IHN MEHR', K.teal, pop(t, 35.6, .3), { max: 115 })}`, p)}
    ${pair(t, [[33.22, 'rest'], [35.0, 'forward', .5]], [[33.22, 'rest'], [35.2, 'forward', .5]], { bm: t > 35.8 ? 'laugh' : 'smile' })}
    ${icon('heart', BLUE_X + 40, 760, 1.3, h * (1 + .08 * Math.sin(t * 10)), t)}`;
}
function s12(t) {
  const p = eout(prog(t, 36.3, 36.54));
  let bub = '';
  for (let i = 0; i < 3; i++) { const t0 = 36.7 + i * .7, q = pop(t, t0, .25); bub += bubble(i % 2 ? 720 : 360, 800 - (t - t0) * 30, 220, 110, scribble(220, 2, i), q * (1 - prog(t, t0 + 1.6, t0 + 2.0)), i % 2 ? 1 : -1); }
  return `${paper()}${card(`${keyword(540, 420, 'GESPRÄCH', K.ink, pop(t, 36.5, .25), { max: 120 })}${keyword(540, 580, 'LEICHTER', K.teal, pop(t, 38.2, .3), { max: 140, hl: prog(t, 38.4, 38.9) })}`, p)}
    ${pair(t, [[36.3, 'forward'], [37.2, 'talk', .4], [38.4, 'rest', .4]], [[36.3, 'forward'], [37.6, 'talk', .4]], { bm: talkM(t, 36.5, 37.6), om: talkM(t, 37.8, 39.2) })}${bub}`;
}
function s13(t) {
  const p = eout(prog(t, 39.44, 39.68));
  const q = pop(t, 40.3, .25);
  return `${paper()}${card(`${keyword(540, 470, 'NIEMAND HAT\'S BEMERKT', K.red, pop(t, 40.0, .3), { max: 100 })}`, p)}
    ${pair(t, [[39.44, 'rest'], [40.2, 'scratch', .4]], [[39.44, 'rest']], { bl: 10 * Math.sin(t * 5), ol: -10 * Math.sin(t * 5 + 1) })}
    ${q > 0 ? `<g transform="translate(${BLUE_X + 40} 760) scale(${q})"><text text-anchor="middle" y="40" style="${SANS};font-size:150px" fill="${K.red}">?</text></g><g transform="translate(${ORANGE_X - 40} 760) scale(${pop(t, 40.6, .25)})"><text text-anchor="middle" y="40" style="${SANS};font-size:150px" fill="${K.red}">?</text></g>` : ''}`;
}
function waitress(x, y, s, t, o = {}) { // standing stick figure with apron and notepad
  const pose = { h1: o.h1 || [70, 40], h2: o.h2 || [-20, 120], lean: 0, tilt: o.tilt || 0 };
  const lr = 0, Sx = 0, Sy = -125;
  const [e1x, e1y, h1x, h1y] = ik(Sx, Sy, Sx + pose.h1[0], Sy + pose.h1[1], 66, 74, 1);
  return `<g transform="translate(${x} ${y}) scale(${s * (o.dir || 1)} ${s})"><path d="M -6 0 L -26 190 M 6 0 L 26 190" ${ST(10)} fill="none"/>
    <path d="M 0 0 L 0 -125" stroke="${OL}" stroke-width="52" stroke-linecap="round"/><path d="M 0 0 L 0 -125" stroke="${K.teal}" stroke-width="40" stroke-linecap="round"/><path d="M -22 -60 L 22 -60 L 26 20 L -26 20 Z" fill="#fff" ${ST(4)}/>
    <g transform="translate(0 -183) rotate(${pose.tilt})"><circle r="44" fill="#fff" ${ST(8)}/><path d="M -46 -10 Q -40 -60 0 -56 Q 40 -60 46 -10 Q 36 -40 0 -40 Q -36 -40 -46 -10 Z" fill="${OL}"/><circle cx="2" cy="-6" r="5" fill="${OL}"/><circle cx="22" cy="-6" r="5" fill="${OL}"/><path d="M 0 14 Q 12 26 26 12" ${ST(5)} fill="none"/></g>
    <path d="M ${Sx} ${Sy} L ${e1x} ${e1y} L ${h1x} ${h1y}" ${ST(11)} fill="none"/><g transform="translate(${h1x + 10} ${h1y - 20})"><rect x="-20" y="-28" width="40" height="52" fill="#fff" ${ST(3)}/></g></g>`;
}
function restaurant(t, inner) {
  return `${R(0, 860, 1080, 560, '#EFE3CF')}<path d="M 0 860 H 1080" ${ST(4)}/>${[160, 920].map(x => `<rect x="${x - 70}" y="880" width="140" height="160" rx="10" fill="#DCEBF0" ${ST(4)}/>`).join('')}${inner}`;
}
function s14(t) {
  const p = eout(prog(t, 42.28, 42.52));
  return `${paper()}${card(`${serifLine(540, 330, 'Restaurant · Niederlande', pop(t, 42.4, .2))}${keyword(540, 490, 'SOGAR UM GELD', K.orange, pop(t, 44.9, .3), { max: 120 })}${icon('nl', 540, 640, .7, pop(t, 43.8, .25), t)}`, p)}
    ${restaurant(t, `${pair(t, [[42.28, 'rest']], [[42.28, 'talk']], { oCol: K.grey, om: talkM(t, 42.4, 44) })}${icon('coin', 540, 1120, .8, pop(t, 45.38, .25), t)}`)}`;
}
function s15(t) {
  const p = eout(prog(t, 45.88, 46.12));
  const g = pop(t, 47.6, .25), w = pop(t, 48.98, .25);
  return `${paper()}${card(`${keyword(540, 470, 'WORT FÜR WORT', K.blue, pop(t, 49.0, .3), { max: 130, hl: prog(t, 49.3, 49.8) })}`, p)}
    ${restaurant(t, `${pair(t, [[45.88, 'talk']], [[45.88, 'rest']], { bm: talkM(t, 46.0, 48.6), oCol: K.grey, noTable: 0 })}${waitress(560, 1390, 1.25, t, { h1: [70, 30] })}
    ${bubble(300, 790, 300, 130, scribble(300, 2, 7), g, -1)}${bubble(700, 700, 300, 130, scribble(300, 2, 7), w, 1)}${w > .5 ? `<text x="500" y="770" text-anchor="middle" style="${SANS};font-size:110px" fill="${K.teal}">=</text>` : ''}`)}`;
}
function s16(t) {
  const p = eout(prog(t, 50.36, 50.6));
  return `${paper()}${card(`${serifLine(540, 330, 'Bei den anderen nur:', pop(t, 50.5, .2))}${keyword(540, 520, '„KOMMT SOFORT.“', K.grey, pop(t, 52.24, .3), { max: 120 })}`, p)}
    ${restaurant(t, `${pair(t, [[50.36, 'talk'], [51.4, 'rest']], [[50.36, 'rest']], { bCol: K.grey, oCol: K.grey, bm: talkM(t, 50.4, 51.3) })}${waitress(560, 1390, 1.25, t, { h1: [60, 60], tilt: -6 })}`)}`;
}
function coinsPile(x, y, n, t, t0) { let s = ''; for (let i = 0; i < n; i++) { const p = prog(t, t0 + i * .08, t0 + i * .08 + .25); if (p <= 0) continue; s += `<ellipse cx="${x + (i % 3 - 1) * 18}" cy="${lerp(y - 300, y - i * 12, eout(p))}" rx="34" ry="12" fill="${K.marker}" ${ST(4)}/>`; } return s; }
function s17(t) {
  const p = eout(prog(t, 52.9, 53.14));
  return `${paper()}${card(`${keyword(540, 470, 'MEHR TRINKGELD', K.teal, pop(t, 56.46, .3), { max: 130, hl: prog(t, 56.7, 57.2) })}${serifLine(540, 330, 'Wer wiederholt wurde …', pop(t, 53.0, .2))}`, p)}
    ${R(0, 860, 1080, 560, '#EFE3CF')}<path d="M 540 900 V 1400" stroke="${OL}" stroke-width="4" stroke-dasharray="14 12"/>
    <g transform="translate(-170 0)">${stick(BLUE_X, FIG_Y, 1.3, K.blue, POSES.rest, { mouth: 'smile' })}</g><g transform="translate(170 0)">${stick(ORANGE_X, FIG_Y, 1.3, K.grey, POSES.rest, { dir: -1, mouth: 'flat' })}</g>
    <path d="M 240 1180 H 470 M 610 1180 H 840" stroke="${K.woodDk}" stroke-width="18" stroke-linecap="round"/>
    ${coinsPile(370, 1168, 10, t, 55.8)}${coinsPile(720, 1168, 3, t, 55.8)}${check(370, 960, 1, prog(t, 56.8, 57.2))}`;
}
function s18(t) {
  const p = eout(prog(t, 57.6, 57.84));
  return `${paper()}${card(`${serifLine(540, 330, 'Umgekehrt: wenn jemand dich spiegelt …', pop(t, 57.7, .2), 48)}${keyword(540, 510, 'GUTES ZEICHEN', K.teal, pop(t, 61.0, .3), { max: 130 })}${check(880, 380, .9, prog(t, 62.0, 62.4))}`, p)}
    ${pair(t, [[57.6, 'rest'], [59.4, 'forward', .5], [60.6, 'glass', .5]], [[57.6, 'rest'], [59.9, 'forward', .5], [61.0, 'glass', .5]], { bg: t > 60.6, og: t > 61.0, bm: t > 61.6 ? 'laugh' : 'smile', om: t > 61.7 ? 'laugh' : 'smile' })}`;
}
function s19(t) {
  return `${paper()}${card(`${stamp(540, 480, -6, 'NICHT ÜBERTREIBEN', K.red, pop(t, 63.3, .22), 84)}`, eout(prog(t, 62.84, 63.08)))}${pair(t, [[62.84, 'glass']], [[62.84, 'glass']], { bg: 1, og: 1 })}`;
}
function s20(t) {
  const p = eout(prog(t, 64.5, 64.74));
  const seq = [[64.5, 'rest'], [64.9, 'scratch', .2], [65.4, 'wave', .2], [65.9, 'chin', .2], [66.4, 'glass', .2], [66.9, 'lean', .2], [67.4, 'talk', .2], [67.9, 'rest', .2]];
  const copy = seq.map(([tt, n, d]) => [tt + .08, n, d]);
  return `${paper()}${card(`${keyword(540, 420, 'JEDE BEWEGUNG?', K.orange, pop(t, 65.0, .25), { max: 120 })}${keyword(540, 580, 'WIRKT SELTSAM', K.red, pop(t, 67.08, .3), { max: 120, hl: prog(t, 67.3, 67.8) })}`, p)}
    ${pair(t, seq, copy, { bs: t > 66.4, bm: t > 66.4 ? 'worried' : 'smile', bl: t > 65.5 ? 10 : 0, om: 'smile', bg: t > 66.4 && t < 66.9, og: t > 66.48 && t < 66.98 })}`;
}
function s21(t) {
  const p = eout(prog(t, 68.86, 69.1));
  return `${paper()}${card(`${serifLine(540, 330, 'Mach heute einen kleinen …', pop(t, 68.9, .2))}${keyword(540, 510, 'TEST: ZURÜCKLEHNEN', K.violet, pop(t, 69.74, .3), { max: 110, hl: prog(t, 70.0, 70.5) })}`, p)}
    ${pair(t, [[68.86, 'talk'], [71.9, 'lean', 1.0]], [[68.86, 'rest']], { bm: t < 71.9 ? talkM(t, 69, 71.8) : 'smile' })}`;
}
function s22(t) {
  const p = eout(prog(t, 72.98, 73.22));
  const sec = Math.min(4, Math.max(0, Math.floor((t - 73.56) / .65) + 1));
  return `${paper()}${card(`${serifLine(540, 330, 'Zähl mit:', pop(t, 73.0, .2))}${sec > 0 && t < 76.04 ? keyword(540, 510, `${sec} …`, K.ink, 1, { sz: 140 }) : ''}${t > 76.04 ? keyword(540, 510, 'DASSELBE', K.teal, pop(t, 76.04, .3), { max: 140 }) : ''}${check(860, 520, 1, prog(t, 76.6, 77.0))}`, p)}
    ${pair(t, [[72.98, 'lean']], [[72.98, 'rest'], [75.4, 'lean', .9]], { om: t > 76.3 ? 'smile' : 'flat' })}${t < 76.04 ? icon('watch', 540, 860, 1, pop(t, 73.56, .25), t) : ''}`;
}

const SHOTS = [[0, 4.38, s0], [4.38, 5.66, s1], [5.66, 7.42, s2], [7.42, 10.46, s3], [10.46, 15.22, s4], [15.22, 17.46, s5], [17.46, 20.12, s6], [20.12, 22.66, s7], [22.66, 24.2, s8],
  [24.2, 30.14, s9], [30.14, 33.22, s10], [33.22, 36.3, s11], [36.3, 39.44, s12], [39.44, 42.28, s13], [42.28, 45.88, s14], [45.88, 50.36, s15], [50.36, 52.9, s16], [52.9, 57.6, s17],
  [57.6, 62.84, s18], [62.84, 64.5, s19], [64.5, 68.86, s20], [68.86, 72.98, s21], [72.98, 999, s22]];

function scene(t) {
  let f = SHOTS[0][2];
  for (const s of SHOTS) if (t >= s[0]) f = s[2];
  let body = '';
  try { body = f(t); } catch (e) { body = paper(); }
  return `${KDEFS}${body}${progress(t)}`;
}

</scene_js>
<events_json>{"music":"explainer_light","events":[
{"t":0.3,"type":"whoosh","dur":0.4,"gain":0.35},{"t":0.5,"type":"pop","f0":400,"f1":800,"gain":0.5,"weight":"hero"},{"t":2.94,"type":"stamp","gain":0.85,"weight":"hero"},
{"t":4.4,"type":"whoosh","dur":0.25,"gain":0.35},{"t":4.8,"type":"pop","f0":500,"f1":900,"gain":0.4},
{"t":5.7,"type":"whoosh","dur":0.25,"gain":0.3},{"t":6.24,"type":"pop","f0":300,"f1":600,"gain":0.45},
{"t":7.45,"type":"whoosh","dur":0.25,"gain":0.3},{"t":7.6,"type":"tick","f":1800,"gain":0.3},{"t":8.05,"type":"tick","f":1800,"gain":0.3},{"t":8.5,"type":"tick","f":1800,"gain":0.3},{"t":9.3,"type":"pop","f0":300,"f1":600,"gain":0.45},{"t":9.52,"type":"ting","f":783.99,"gain":0.45,"weight":"hero"},
{"t":10.5,"type":"whoosh","dur":0.25,"gain":0.3},{"t":11.4,"type":"clank","gain":0.3},{"t":13.2,"type":"clank","gain":0.3},{"t":13.92,"type":"ting","f":880,"gain":0.45},
{"t":15.25,"type":"whoosh","dur":0.25,"gain":0.3},{"t":16.4,"type":"slide","f0":600,"f1":300,"dur":0.4,"gain":0.35},
{"t":17.5,"type":"whoosh","dur":0.25,"gain":0.3},{"t":17.7,"type":"pop","f0":400,"f1":800,"gain":0.4},{"t":18.3,"type":"shimmer","dur":0.8,"gain":0.4},
{"t":20.15,"type":"whoosh","dur":0.25,"gain":0.3},{"t":21.99,"type":"shimmer","dur":0.6,"gain":0.5,"weight":"hero"},{"t":22.1,"type":"pop","f0":500,"f1":900,"gain":0.4},
{"t":22.7,"type":"whoosh","dur":0.25,"gain":0.3},{"t":23.3,"type":"stamp","gain":0.7,"weight":"hero"},
{"t":24.25,"type":"whoosh","dur":0.25,"gain":0.3},{"t":26.0,"type":"rustle","dur":0.4,"gain":0.3},{"t":26.96,"type":"pop","f0":300,"f1":600,"gain":0.45},{"t":28.1,"type":"rustle","dur":0.4,"gain":0.3},
{"t":30.2,"type":"whoosh","dur":0.25,"gain":0.3},{"t":32.3,"type":"pop","f0":500,"f1":300,"gain":0.35},{"t":32.44,"type":"womp","gain":0.35},
{"t":33.25,"type":"whoosh","dur":0.25,"gain":0.3},{"t":35.82,"type":"ting","f":1046.5,"gain":0.55,"weight":"hero"},
{"t":36.35,"type":"whoosh","dur":0.25,"gain":0.3},{"t":36.7,"type":"pop","f0":500,"f1":900,"gain":0.3},{"t":37.4,"type":"pop","f0":550,"f1":950,"gain":0.3},{"t":38.1,"type":"pop","f0":600,"f1":1000,"gain":0.35},
{"t":39.5,"type":"whoosh","dur":0.25,"gain":0.3},{"t":40.3,"type":"pop","f0":400,"f1":200,"gain":0.4},{"t":40.6,"type":"pop","f0":350,"f1":180,"gain":0.35},
{"t":42.3,"type":"whoosh","dur":0.25,"gain":0.3},{"t":43.8,"type":"pop","f0":400,"f1":700,"gain":0.35},{"t":45.38,"type":"ting","f":1318.5,"gain":0.5,"weight":"hero"},
{"t":45.9,"type":"whoosh","dur":0.25,"gain":0.3},{"t":47.6,"type":"pop","f0":400,"f1":800,"gain":0.35},{"t":48.98,"type":"pop","f0":400,"f1":800,"gain":0.45},{"t":49.4,"type":"ting","f":783.99,"gain":0.4},
{"t":50.4,"type":"whoosh","dur":0.25,"gain":0.3},{"t":52.24,"type":"click","gain":0.4},
{"t":52.95,"type":"whoosh","dur":0.25,"gain":0.3},{"t":55.8,"type":"ting","f":1568,"gain":0.35},{"t":56.1,"type":"ting","f":1760,"gain":0.35},{"t":56.46,"type":"hit","gain":0.55,"weight":"hero"},
{"t":57.65,"type":"whoosh","dur":0.25,"gain":0.3},{"t":60.6,"type":"clank","gain":0.3},{"t":61.0,"type":"pop","f0":400,"f1":900,"gain":0.45},{"t":62.0,"type":"ting","f":1046.5,"gain":0.4},
{"t":63.3,"type":"stamp","gain":0.8,"weight":"hero"},
{"t":64.55,"type":"whoosh","dur":0.25,"gain":0.3},{"t":64.9,"type":"slide","f0":400,"f1":800,"dur":0.2,"gain":0.3},{"t":65.4,"type":"slide","f0":400,"f1":800,"dur":0.2,"gain":0.3},{"t":65.9,"type":"slide","f0":400,"f1":800,"dur":0.2,"gain":0.3},{"t":66.4,"type":"slide","f0":400,"f1":800,"dur":0.2,"gain":0.3},{"t":67.08,"type":"womp","gain":0.5,"weight":"hero"},
{"t":68.9,"type":"whoosh","dur":0.25,"gain":0.3},{"t":69.74,"type":"pop","f0":400,"f1":900,"gain":0.5,"weight":"hero"},{"t":71.9,"type":"creak","dur":0.8,"gain":0.35},
{"t":73.0,"type":"whoosh","dur":0.25,"gain":0.3},{"t":73.56,"type":"tick","f":2000,"gain":0.35},{"t":74.21,"type":"tick","f":2000,"gain":0.35},{"t":74.86,"type":"tick","f":2000,"gain":0.35},{"t":75.5,"type":"tick","f":2000,"gain":0.35},{"t":76.04,"type":"ting","f":1046.5,"gain":0.6,"weight":"hero"},{"t":76.6,"type":"pop","f0":500,"f1":900,"gain":0.4}
]}
</events_json>
<storyboard_json>[
 {
  "t0": 0,
  "t1": 4.38,
  "lines": [
   0
  ],
  "title_vi": "KEIN ZUFALL",
  "desc_vi": "Thẻ: “Wenn jemand genauso sitzt wie du …” + GENAUSO? gạch bút dạ; người áo cam lập tức chống cằm giống người áo xanh; tem đỏ KEIN ZUFALL."
 },
 {
  "t0": 4.38,
  "t1": 5.66,
  "lines": [
   1
  ],
  "title_vi": "Để ý xem",
  "desc_vi": "Thẻ ACHTE MAL DRAUF với con mắt; hai người ngồi bình thường, liếc nhau."
 },
 {
  "t0": 5.66,
  "t1": 7.42,
  "lines": [
   2
  ],
  "title_vi": "Bạn chống cằm",
  "desc_vi": "Thẻ KINN AUF DIE HAND (xanh); người áo xanh chống cằm."
 },
 {
  "t0": 7.42,
  "t1": 10.46,
  "lines": [
   3
  ],
  "title_vi": "Vài giây sau",
  "desc_vi": "Đếm 1-2-3; người áo cam chống cằm theo; thẻ DASSELBE (cam)."
 },
 {
  "t0": 10.46,
  "t1": 15.22,
  "lines": [
   4
  ],
  "title_vi": "Cười và cầm ly",
  "desc_vi": "Người xanh cười, cầm ly; người cam cũng cầm ly; thẻ LACHEN + GLAS → AUCH GLAS."
 },
 {
  "t0": 15.22,
  "t1": 17.46,
  "lines": [
   5
  ],
  "title_vi": "Không cố ý",
  "desc_vi": "Thẻ KEINE ABSICHT với dấu ✗; hai người thả lỏng, chớp mắt."
 },
 {
  "t0": 17.46,
  "t1": 20.12,
  "lines": [
   6
  ],
  "title_vi": "Bộ não tự làm",
  "desc_vi": "Thẻ DEIN GEHIRN (tím); hai bộ não tím hiện trên đầu, đường nối chấm."
 },
 {
  "t0": 20.12,
  "t1": 22.66,
  "lines": [
   7
  ],
  "title_vi": "CHAMÄLEON-EFFEKT",
  "desc_vi": "Thẻ CHAMÄLEON-EFFEKT (xanh ngọc) + con tắc kè hoa; hai người cùng nghiêng tới."
 },
 {
  "t0": 22.66,
  "t1": 24.2,
  "lines": [
   8
  ],
  "title_vi": "Đã thử nghiệm",
  "desc_vi": "Tem GETESTET và bảng ghi chép."
 },
 {
  "t0": 24.2,
  "t1": 30.14,
  "lines": [
   9
  ],
  "title_vi": "Nhóm A",
  "desc_vi": "Người lạ (áo cam) lén bắt chước tư thế và cử chỉ của người áo xanh; thẻ MACHT HEIMLICH NACH."
 },
 {
  "t0": 30.14,
  "t1": 33.22,
  "lines": [
   10
  ],
  "title_vi": "Nhóm B",
  "desc_vi": "Người đối diện (áo xám) ngồi yên không bắt chước; thẻ NICHT NACHGEMACHT với ✗."
 },
 {
  "t0": 33.22,
  "t1": 36.3,
  "lines": [
   11
  ],
  "title_vi": "Thích hơn",
  "desc_vi": "Thẻ MOCHTE IHN MEHR; trái tim đỏ hiện trên người áo xanh."
 },
 {
  "t0": 36.3,
  "t1": 39.44,
  "lines": [
   12
  ],
  "title_vi": "Nói chuyện nhẹ nhàng",
  "desc_vi": "Bong bóng thoại trôi qua lại; thẻ GESPRÄCH LEICHTER."
 },
 {
  "t0": 39.44,
  "t1": 42.28,
  "lines": [
   13
  ],
  "title_vi": "Không ai nhận ra",
  "desc_vi": "Thẻ NIEMAND HAT'S BEMERKT (đỏ); hai dấu ? trên đầu."
 },
 {
  "t0": 42.28,
  "t1": 45.88,
  "lines": [
   14
  ],
  "title_vi": "Nhà hàng Hà Lan",
  "desc_vi": "Thẻ “Restaurant · Niederlande” + cờ Hà Lan + SOGAR UM GELD; đồng xu."
 },
 {
  "t0": 45.88,
  "t1": 50.36,
  "lines": [
   15
  ],
  "title_vi": "Nhắc lại nguyên văn",
  "desc_vi": "Khách gọi món (bong bóng), cô phục vụ nhắc lại đúng như vậy (=); thẻ WORT FÜR WORT."
 },
 {
  "t0": 50.36,
  "t1": 52.9,
  "lines": [
   16
  ],
  "title_vi": "„Kommt sofort.“",
  "desc_vi": "Với khách khác (áo xám) cô chỉ nói „KOMMT SOFORT.“"
 },
 {
  "t0": 52.9,
  "t1": 57.6,
  "lines": [
   17
  ],
  "title_vi": "MEHR TRINKGELD",
  "desc_vi": "Hai bàn: chồng xu cao bên khách được nhắc lại, chồng thấp bên kia; thẻ MEHR TRINKGELD ✓."
 },
 {
  "t0": 57.6,
  "t1": 62.84,
  "lines": [
   18
  ],
  "title_vi": "Dấu hiệu tốt",
  "desc_vi": "Hai người cùng nghiêng tới, cùng nâng ly, cười; thẻ GUTES ZEICHEN ✓."
 },
 {
  "t0": 62.84,
  "t1": 64.5,
  "lines": [
   19
  ],
  "title_vi": "Đừng làm quá",
  "desc_vi": "Tem đỏ NICHT ÜBERTREIBEN."
 },
 {
  "t0": 64.5,
  "t1": 68.86,
  "lines": [
   20
  ],
  "title_vi": "Bắt chước mọi động tác",
  "desc_vi": "Người cam copy ngay lập tức từng động tác (gãi đầu, vẫy tay, chống cằm, cầm ly, ngả ra); người xanh toát mồ hôi; thẻ WIRKT SELTSAM."
 },
 {
  "t0": 68.86,
  "t1": 72.98,
  "lines": [
   21
  ],
  "title_vi": "TEST: ZURÜCKLEHNEN",
  "desc_vi": "Thẻ TEST: ZURÜCKLEHNEN (tím); người xanh từ từ ngả người ra sau."
 },
 {
  "t0": 72.98,
  "t1": 77.964,
  "lines": [
   22
  ],
  "title_vi": "Đếm xem",
  "desc_vi": "Đồng hồ bấm giờ, đếm 1…4; người cam cũng ngả ra sau; thẻ DASSELBE ✓."
 }
]</storyboard_json>
