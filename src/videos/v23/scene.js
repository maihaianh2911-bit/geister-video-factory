// @ts-nocheck
// AUTO-GENERATED scene for v23. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// Inherited from Part 4 (v22): palette, narrator, Toby, Lucía, flat, corridor, map helpers.
const P = {
  sky: '#d6cfbf', bg1: '#aaa498', bg2: '#9b958b', bg3: '#b8b2a5', smoke: '#7d7a76',
  bld: '#dccaa5', bldSh: '#c6b28c', roof: '#8d8678', win: '#26304a', lit: '#f6cf5a',
  road: '#4f5158', walk: '#9d978b', line: '#d9d4c6',
  navy: '#111724', navy2: '#1a2232', grid: '#3a4559', gridHi: '#5a6780', cell: '#232d40',
  green: '#4fd06e', red: '#ee4436', gold: '#f6c443', white: '#f4f1ea', ink: '#151a24', grey: '#8a93a6', blue: '#4a9cf0',
  wall: '#e2d8c4', wallSh: '#cdc1a8', floor: '#8a5a38', floorSh: '#744a2d',
  hair: '#6b4227', hairHi: '#835539', shirt: '#3d78c2', shirtSh: '#2e5f9f', pants: '#1f2d4f', skin: '#e8b48f', skinSh: '#cf9673',
  dog: '#a8683a', dogSh: '#83502b', dogEar: '#6f3d1e', cream: '#f1e2c6', collar: '#d8382f',
  water: '#5aa8e6', waterHi: '#9dd0f5', metal: '#b9bec6', metalSh: '#8d939c',
  eSkin: '#d9a582', eSkinSh: '#bf8a68', eHair: '#b9b6ae', card: '#7a6a4f', cardSh: '#62553e', eShirt: '#d8d2c4', ePants: '#4a4a52',
  torch: '#ffe7a8', hall: '#262b36', hallFl: '#1d2029', chain: '#c9ced5'
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
function pill(x, y, label, size, bg, fg, o = {}) {
  const w = label.length * size * .64 + size * 1.1, h = size * 1.5;
  return `<g opacity="${o.op ?? 1}"><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="${h / 2}" fill="${bg}"/>${T(label, x, y + size * .36, size, fg)}</g>`;
}

// ---------- characters (narrator + Toby identical to v19) ----------
function personBack(x, y, s, o = {}) {
  const u = o.turn || 0, br = o.breath || 0, au = Math.abs(u), sd = u >= 0 ? 1 : -1;
  const rA = o.reach || 0; // right arm (screen-right) lifted outward, degrees
  const held = o.held || '';
  const armR = `<g transform="rotate(${-4 - br * 2 - rA} 124 -540)"><rect x="98" y="-560" width="52" height="250" rx="26" fill="${P.shirtSh}"/>
      <circle cx="124" cy="-300" r="26" fill="${P.skin}"/>${held ? `<g transform="translate(124 -300) rotate(${4 + br * 2 + rA})">${held}</g>` : ''}</g>`;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="0" rx="130" ry="20" fill="#000" opacity=".18"/>
    <rect x="-74" y="-300" width="66" height="300" rx="26" fill="${P.pants}"/><rect x="8" y="-300" width="66" height="300" rx="26" fill="${P.pants}"/>
    <ellipse cx="-42" cy="-6" rx="44" ry="18" fill="#2b2a2e"/><ellipse cx="42" cy="-6" rx="44" ry="18" fill="#2b2a2e"/>
    <g transform="translate(0 ${-br * 6})">
    <rect x="-150" y="-560" width="52" height="250" rx="26" fill="${P.shirtSh}" transform="rotate(${4 + br * 2} -124 -540)"/>
    <circle cx="-128" cy="-300" r="26" fill="${P.skin}"/>
    ${rA < 20 ? armR : ''}
    <rect x="-116" y="-590" width="232" height="320" rx="70" fill="${P.shirt}"/>
    <path d="M 60 -580 Q 112 -560 112 -480 L 112 -300 Q 90 -272 60 -272 Z" fill="${P.shirtSh}" opacity=".7"/>
    ${rA >= 20 ? armR : ''}
    <rect x="-30" y="-640" width="60" height="70" rx="20" fill="${P.skinSh}"/>
    <g transform="translate(${o.lean || 0} -720)">
      <ellipse cx="${-86 + 30 * u}" cy="8" rx="16" ry="24" fill="${P.skinSh}"/><ellipse cx="${86 + 30 * u}" cy="8" rx="16" ry="24" fill="${P.skinSh}"/>
      <circle cx="0" cy="0" r="88" fill="${P.skin}"/>
      ${au > .3 ? `<circle cx="${sd * 70}" cy="2" r="6" fill="${P.ink}" opacity="${cl((au - .3) * 3)}"/><path d="M ${sd * 84} 10 q ${sd * 16} 10 ${sd * 2} 22" fill="${P.skin}" opacity="${cl((au - .3) * 3)}"/>` : ''}
      <path d="M ${-92 - 20 * u} 10 Q ${-100 - 10 * u} -96 ${-6 * u} -98 Q ${96 - 10 * u} -98 ${92 - 20 * u} 6 Q ${70 - 60 * u} ${40 - 20 * au} ${-30 * u} 52 Q ${-70 - 60 * u} 40 ${-92 - 20 * u} 10 Z" fill="${P.hair}"/>
      <path d="M ${-40 - 20 * u} -72 Q ${10 - 20 * u} -92 ${50 - 20 * u} -70" stroke="${P.hairHi}" stroke-width="12" fill="none" stroke-linecap="round"/>
    </g></g>
  </g>`;
}
function personSit(x, y, s, o = {}) {
  const u = o.turn || 0, br = o.breath || 0, au = Math.abs(u), sd = u >= 0 ? 1 : -1;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="4" rx="190" ry="26" fill="#000" opacity=".2"/>
    <ellipse cx="0" cy="-46" rx="175" ry="54" fill="${P.pants}"/>
    <g transform="translate(0 ${-br * 7}) scale(1 ${1 + br * .015})">
    <rect x="-142" y="-340" width="50" height="230" rx="25" fill="${P.shirtSh}" transform="rotate(10 -117 -330)"/>
    <rect x="92" y="-340" width="50" height="230" rx="25" fill="${P.shirtSh}" transform="rotate(-10 117 -330)"/>
    <rect x="-112" y="-370" width="224" height="300" rx="70" fill="${P.shirt}"/>
    <path d="M 58 -360 Q 108 -340 108 -270 L 108 -90 Q 86 -70 58 -70 Z" fill="${P.shirtSh}" opacity=".7"/>
    <rect x="-28" y="-420" width="56" height="64" rx="18" fill="${P.skinSh}"/>
    <g transform="translate(${8 * u} -496)">
      <ellipse cx="${-82 + 28 * u}" cy="8" rx="15" ry="22" fill="${P.skinSh}"/><ellipse cx="${82 + 28 * u}" cy="8" rx="15" ry="22" fill="${P.skinSh}"/>
      <circle cx="0" cy="0" r="84" fill="${P.skin}"/>
      ${au > .3 ? `<circle cx="${sd * 66}" cy="2" r="6" fill="${P.ink}" opacity="${cl((au - .3) * 3)}"/>` : ''}
      <path d="M ${-88 - 20 * u} 10 Q ${-96 - 10 * u} -92 ${-6 * u} -94 Q ${92 - 10 * u} -94 ${88 - 20 * u} 6 Q ${66 - 56 * u} ${38 - 18 * au} ${-28 * u} 50 Q ${-66 - 56 * u} 38 ${-88 - 20 * u} 10 Z" fill="${P.hair}"/>
      <path d="M ${-38 - 20 * u} -68 Q ${10 - 20 * u} -88 ${48 - 20 * u} -66" stroke="${P.hairHi}" stroke-width="12" fill="none" stroke-linecap="round"/>
    </g></g>
  </g>`;
}
// Toby (v19 design) + o.jaw 0..1 open mouth (bark), o.growl 0..1
function toby(x, y, s, o = {}) {
  const dir = o.dir || 1, ear = o.ear || 0, wag = o.wag ?? 12 * Math.sin((o.t || 0) * 7), hf = o.headFlip ?? 1;
  const br = o.breath || 0, jaw = o.jaw || 0, gr = o.growl || 0, hr = o.headRot || 0;
  const vib = gr ? 1.5 * Math.sin((o.t || 0) * 70) * gr : 0;
  return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})">
    <ellipse cx="0" cy="2" rx="120" ry="16" fill="#000" opacity=".22"/>
    <g transform="rotate(${-20 + wag} -96 -40)"><path d="M -96 -40 Q -150 -60 -146 -130" stroke="${P.dog}" stroke-width="22" fill="none" stroke-linecap="round"/></g>
    <ellipse cx="-52" cy="-50" rx="54" ry="44" fill="${P.dogSh}"/><ellipse cx="-14" cy="-10" rx="30" ry="11" fill="${P.dogSh}"/>
    <rect x="22" y="-120" width="22" height="118" rx="11" fill="${P.dogSh}"/>
    <g transform="translate(0 ${-br * 3})"><path d="M -100 -40 Q -110 -150 -10 -190 Q 60 -205 72 -150 Q 80 -90 52 -40 Z" fill="${P.dog}"/>
    <ellipse cx="46" cy="-120" rx="30" ry="56" fill="${P.cream}"/></g>
    <rect x="48" y="-118" width="24" height="118" rx="12" fill="${P.dog}"/>
    <ellipse cx="62" cy="-6" rx="20" ry="9" fill="${P.cream}"/><ellipse cx="34" cy="-6" rx="18" ry="8" fill="#d9c7a7"/>
    <ellipse cx="-62" cy="-42" rx="50" ry="40" fill="${P.dog}"/><ellipse cx="-20" cy="-8" rx="30" ry="11" fill="${P.dog}"/>
    <rect x="10" y="-196" width="62" height="16" rx="8" fill="${P.collar}" transform="rotate(-14 40 -188)"/>
    <g transform="translate(${44 + vib} -222) rotate(${hr}) scale(${hf} 1)">
      <circle cx="0" cy="0" r="50" fill="${P.dog}"/>
      ${jaw > 0 ? `<g transform="rotate(${28 * jaw} 20 22)"><path d="M 16 18 L 78 26 Q 82 40 66 44 L 18 38 Z" fill="${P.cream}"/></g><path d="M 22 18 L 80 18 L 70 ${18 + 26 * jaw} L 24 ${24 + 10 * jaw} Z" fill="#5a2320"/><path d="M 60 18 l 4 8 l 4 -8 Z" fill="#fff"/>` : ''}
      <ellipse cx="42" cy="${14 - 6 * jaw}" rx="34" ry="${24 - 6 * jaw}" fill="${P.cream}"/><circle cx="74" cy="${8 - 6 * jaw}" r="9" fill="${P.ink}"/>
      ${gr > 0 ? `<path d="M 30 ${26} l 6 6 l 6 -6 l 6 6 l 6 -6" stroke="#fff" stroke-width="3" fill="none" opacity="${gr}"/><path d="M 36 -4 q 10 -6 20 0 M 34 4 q 10 -6 20 0" stroke="${P.dogSh}" stroke-width="4" fill="none" opacity="${gr}"/>` : ''}
      <circle cx="18" cy="-10" r="7" fill="${P.ink}"/><circle cx="20" cy="-12" r="2.5" fill="#fff"/>
      ${gr > 0 ? `<path d="M 6 -24 L 30 -16" stroke="${P.dogEar}" stroke-width="6" stroke-linecap="round" opacity="${gr}"/>` : ''}
      <g transform="rotate(${-ear * 70} -18 -36)"><path d="M -18 -40 Q -46 -36 -48 6 Q -40 22 -26 10 Q -16 -14 -6 -36 Z" fill="${P.dogEar}"/></g>
    </g>
  </g>`;
}
// Toby lying down (side view, facing right), origin at floor
function limb(sx, sy, a1, a2, l1, l2, w, col, col2, handCol, inner = '') {
  return `<g transform="translate(${sx} ${sy}) rotate(${a1})"><rect x="${-w / 2}" y="-10" width="${w}" height="${l1 + 20}" rx="${w / 2}" fill="${col}"/>
    <g transform="translate(0 ${l1}) rotate(${a2})"><rect x="${-w / 2 + 2}" y="-6" width="${w - 4}" height="${l2}" rx="${w / 2 - 2}" fill="${col2}"/>
      <circle cx="0" cy="${l2 + 6}" r="${w * .46}" fill="${handCol}"/>${inner}</g></g>`;
}
function torchProp(beam) {
  return `<g transform="translate(0 30)">${beam > 0 ? `<path d="M -10 34 L -190 760 L 190 760 L 10 34 Z" fill="${P.torch}" opacity="${.22 * beam}"/><path d="M -6 34 L -90 520 L 90 520 L 6 34 Z" fill="${P.torch}" opacity="${.18 * beam}"/>` : ''}
    <rect x="-14" y="-40" width="28" height="70" rx="8" fill="#3a3f4a"/><rect x="-20" y="22" width="40" height="18" rx="5" fill="#c9ced5"/>
    ${beam > 0 ? `<ellipse cx="0" cy="40" rx="16" ry="6" fill="#fffbe6" opacity="${beam}"/>` : ''}</g>`;
}
function bottleProp(sc = 1) {
  return `<g transform="scale(${sc})"><rect x="-26" y="-120" width="52" height="130" rx="16" fill="#d8eaf4" opacity=".92"/>
    <rect x="-24" y="-70" width="48" height="78" rx="12" fill="${P.water}"/><rect x="-24" y="-74" width="48" height="8" fill="${P.waterHi}"/>
    <rect x="-12" y="-138" width="24" height="22" rx="5" fill="${P.shirt}"/><rect x="-16" y="-104" width="8" height="70" rx="4" fill="#fff" opacity=".5"/></g>`;
}
function skyline(t, night) {
  const B = [[0, 900, 150], [120, 1020, 140], [260, 780, 120], [760, 820, 150], [880, 960, 200], [980, 700, 120]];
  let s = `<rect x="-600" y="-900" width="2280" height="3400" fill="${night ? '#141a28' : P.sky}"/>`;
  s += smokeCol(180, 980, t, 0, night) + smokeCol(930, 1000, t, 1.7, night);
  B.forEach(([x, y, w], i) => {
    s += `<rect x="${x}" y="${y}" width="${w}" height="${1400 - y}" fill="${night ? (i % 2 ? '#1f2636' : '#242c3d') : (i % 2 ? P.bg1 : P.bg3)}"/>`;
    for (let r = 0; r < 8; r++) for (let c = 0; c < 3; c++) if (hash(i * 31 + r * 7 + c) > .45)
      s += `<rect x="${x + 18 + c * (w - 40) / 3}" y="${y + 30 + r * 70}" width="${(w - 60) / 4}" height="26" fill="${night ? (hash(i + r + c * 3) > .93 ? '#e08a3c' : '#151b29') : P.bg2}" opacity=".8"/>`;
  });
  return s;
}
function smokeCol(cx, base, t, k, night) {
  let s = '';
  for (let i = 0; i < 7; i++) {
    const ph = ((t * .12 + i / 7 + k * .3) % 1);
    const y = base - ph * 760, r = 50 + ph * 70;
    s += `<circle cx="${cx + 30 * Math.sin(ph * 5 + k) + ph * 60}" cy="${y}" r="${r}" fill="${night ? '#262b38' : P.smoke}" opacity="${.5 * (1 - ph) + .1}"/>`;
  }
  return s;
}
const Q = { door: '#7a4a2c', doorP: '#6a3f24', frame: '#5c3a26', print: '#2a1f1c', sofa: '#6f7f8f', sofaSh: '#5a6878', sofaHi: '#8494a4',
  shelf: '#9a6a44', shelfSh: '#7a5032', chair: '#efe6d2', chairSh: '#c9b994', rice: '#f4efe2', riceSh: '#ddd5c2', bowl: '#e9e4d8',
  slat: '#ece6d8', slatSh: '#cfc6b2', hallDay: '#bfc3c9', bed: '#c96a4a', bedSh: '#a85538', bedIn: '#e7cfa0' };
function chair(x, y, s, rot = 0, flip = 1) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s * flip} ${s})">
    <rect x="-70" y="-150" width="150" height="22" rx="8" fill="${Q.chair}"/>
    <rect x="58" y="-330" width="22" height="330" rx="8" fill="${Q.chairSh}"/><rect x="-66" y="-130" width="20" height="130" rx="8" fill="${Q.chairSh}"/>
    <rect x="30" y="-130" width="20" height="130" rx="8" fill="${Q.chairSh}" opacity=".8"/>
    <rect x="62" y="-310" width="18" height="120" rx="6" fill="${Q.chair}"/><rect x="40" y="-300" width="40" height="18" rx="6" fill="${Q.chair}"/><rect x="40" y="-240" width="40" height="18" rx="6" fill="${Q.chair}"/></g>`;
}
// sofa seen from behind/side (front view of the door wall), origin bottom centre
function sofa(x, y, s, rot = 0) {
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <ellipse cx="0" cy="6" rx="250" ry="18" fill="#000" opacity=".2"/>
    <rect x="-230" y="-210" width="460" height="190" rx="36" fill="${Q.sofa}"/>
    <rect x="-250" y="-150" width="70" height="140" rx="30" fill="${Q.sofaSh}"/><rect x="180" y="-150" width="70" height="140" rx="30" fill="${Q.sofaSh}"/>
    <rect x="-210" y="-196" width="420" height="40" rx="18" fill="${Q.sofaHi}" opacity=".6"/>
    <rect x="-200" y="-20" width="24" height="24" fill="#3a2a20"/><rect x="176" y="-20" width="24" height="24" fill="#3a2a20"/></g>`;
}
function bookshelf(x, y, s, rot = 0) {
  const cols = ['#c8463a', '#3d78c2', '#d9a43b', '#4f8a5a', '#7a5ca8', '#e7dcc4'];
  let b = '';
  for (let r = 0; r < 4; r++) for (let i = 0; i < 6; i++) {
    const h = 90 + 20 * hash(r * 9 + i);
    b += `<rect x="${-92 + i * 30}" y="${-30 - r * 140 - h}" width="26" height="${h}" rx="3" fill="${cols[(r * 2 + i) % 6]}"/>`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})">
    <ellipse cx="0" cy="6" rx="130" ry="14" fill="#000" opacity=".2"/>
    <rect x="-110" y="-590" width="220" height="590" rx="8" fill="${Q.shelf}"/>
    <rect x="-96" y="-576" width="192" height="560" fill="${Q.shelfSh}"/>${b}
    ${[0, 1, 2, 3].map(r => `<rect x="-96" y="${-30 - r * 140}" width="192" height="14" fill="${Q.shelf}"/>`).join('')}</g>`;
}
// front view of the apartment door wall (day). o.gap 0..1 ajar (latch side, right), o.dj jolt, o.chain 'hook'|'loose'
function doorWall(t, o = {}) {
  const gap = o.gap || 0, dj = o.dj || 0, dark = o.dark || 0;
  const gw = 52 * gap;
  return `<rect x="-400" y="-400" width="1880" height="1700" fill="${P.wall}"/>
    <rect x="-400" y="1240" width="1880" height="1100" fill="${P.floor}"/>
    ${Array.from({ length: 14 }, (_, i) => `<line x1="-400" y1="${1268 + i * 60}" x2="1480" y2="${1268 + i * 60}" stroke="${P.floorSh}" stroke-width="4"/>`).join('')}
    <rect x="-400" y="1226" width="1880" height="22" fill="${P.wallSh}"/>
    <rect x="800" y="520" width="170" height="120" fill="${P.wallSh}"/><rect x="814" y="534" width="142" height="92" fill="#7f8f73"/>
    <rect x="356" y="536" width="328" height="716" fill="${Q.frame}"/>
    ${gap > 0 ? `<rect x="${668 - gw}" y="552" width="${gw}" height="700" fill="${Q.hallDay}"/><rect x="${668 - gw}" y="552" width="${gw * .4}" height="700" fill="#e6e9ee" opacity=".8"/>
      <polygon points="${668 - gw},1252 668,1252 ${760 + 60 * gap},1500 ${640 - gw},1500" fill="#fff" opacity="${.18 * gap}"/>` : ''}
    <g transform="translate(${dj} 0)"><rect x="372" y="552" width="${296 - gw}" height="700" fill="${Q.door}"/>
    <rect x="402" y="590" width="${236 - gw}" height="280" rx="6" fill="${Q.doorP}"/><rect x="402" y="920" width="${236 - gw}" height="290" rx="6" fill="${Q.doorP}"/>
    <circle cx="${520 - gw / 2}" cy="690" r="12" fill="#2a1a10"/><circle cx="${520 - gw / 2}" cy="690" r="5" fill="#c9b48a"/>
    <circle cx="${640 - gw}" cy="910" r="14" fill="#d8b25a"/><rect x="${606 - gw}" y="902" width="40" height="14" rx="7" fill="#d8b25a"/>
    <rect x="${628 - gw}" y="640" width="40" height="12" rx="6" fill="${P.metalSh}"/></g>
    <rect x="684" y="636" width="16" height="30" rx="4" fill="${P.metalSh}"/>
    ${o.chain === 'loose' ? `<path d="M ${648 - gw} 646 Q ${640 - gw} ${720 + 10 * Math.sin(t * 5)} ${652 - gw + 6 * Math.sin(t * 4)} ${770}" stroke="${P.chain}" stroke-width="6" fill="none" stroke-dasharray="8 4"/>`
      : `<path d="M ${648 - gw} 646 Q ${672 - gw / 2} 690 692 650" stroke="${P.chain}" stroke-width="6" fill="none" stroke-dasharray="8 4"/>`}
    ${dark ? `<rect x="-400" y="-400" width="1880" height="2800" fill="#0b0f19" opacity="${dark}"/>` : ''}`;
}
function bgPaper() { return `<rect x="-200" y="-200" width="1480" height="2400" fill="${P.sky}"/><ellipse cx="540" cy="900" rx="560" ry="820" fill="#e7e1d2" filter="url(#blur40)"/>`; }
function card(x, y, w, h, inner, col = '#fbf8f0') {
  return `<rect x="${x - w / 2 + 10}" y="${y - h / 2 + 14}" width="${w}" height="${h}" rx="26" fill="#000" opacity=".15"/><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="26" fill="${col}"/>${inner}`;
}
function hallDay(t) {
  return `<rect x="-400" y="-400" width="1880" height="2800" fill="#b5bac2"/>
    <polygon points="-400,-400 300,600 300,1100 -400,2400" fill="#9aa0aa"/><polygon points="1480,-400 780,600 780,1100 1480,2400" fill="#aab0b9"/>
    <rect x="300" y="600" width="480" height="500" fill="#8a909b"/><rect x="380" y="700" width="140" height="400" fill="#6a5040"/>
    <polygon points="300,1100 780,1100 1480,2400 -400,2400" fill="#6c717c"/>
    <rect x="470" y="570" width="140" height="22" rx="6" fill="#f2f4f7"/>
    <rect x="860" y="780" width="120" height="70" rx="6" fill="#7a6a5a"/>${T('12', 920, 830, 44, '#e4e0d6')}`;
}
function oppView(t, o = {}) {
  const fig = o.fig || 0;
  let s = skyline(t, 0);
  s += `<rect x="380" y="900" width="560" height="1100" fill="${P.bld}"/><rect x="860" y="900" width="80" height="1100" fill="${P.bldSh}"/>
    <rect x="370" y="880" width="580" height="26" fill="${P.roof}"/>
    ${Array.from({ length: 4 }, (_, r) => Array.from({ length: 4 }, (_, c) => `<rect x="${420 + c * 120}" y="${960 + r * 120}" width="80" height="70" fill="${P.win}"/>`).join('')).join('')}
    <rect x="420" y="820" width="60" height="62" fill="${P.roof}"/>`;
  if (fig) s += `<g transform="translate(640 880)"><rect x="-10" y="-40" width="9" height="40" fill="#3a3f4a"/><rect x="2" y="-40" width="9" height="40" fill="#3a3f4a"/>
    <rect x="-14" y="-82" width="30" height="46" rx="8" fill="#8a4a3a"/><circle cx="1" cy="-96" r="13" fill="#d9a582"/><path d="M -12 -100 Q 1 -118 14 -100 Z" fill="#3b2720"/>
    <rect x="14" y="-90" width="22" height="7" rx="3" fill="#8a4a3a" transform="rotate(-40 14 -86)"/><rect x="26" y="-112" width="12" height="16" rx="3" fill="#dfe8f0"/></g>`;
  return s;
}
function slit(inner, h) {
  return `<clipPath id="v22sl"><rect x="0" y="${820 - h / 2}" width="1080" height="${h}"/></clipPath><rect width="1080" height="1920" fill="${Q.slat}"/>
    ${Array.from({ length: 24 }, (_, i) => `<rect x="0" y="${i * 80}" width="1080" height="8" fill="${Q.slatSh}"/>`).join('')}
    <g clip-path="url(#v22sl)">${inner}</g>
    <rect x="0" y="${820 - h / 2 - 20}" width="1080" height="20" fill="${Q.slatSh}"/><rect x="0" y="${820 + h / 2}" width="1080" height="20" fill="#bfb6a2"/>`;
}
function flashAt(x, y, a, sz = 1) {
  if (a <= 0) return '';
  return `<g transform="translate(${x} ${y})" opacity="${a}"><circle r="${90 * sz}" fill="#fff8d8" opacity=".55" filter="url(#blur20)"/>
    <path d="M 0 ${-110 * sz} L ${12 * sz} ${-12 * sz} L ${110 * sz} 0 L ${12 * sz} ${12 * sz} L 0 ${110 * sz} L ${-12 * sz} ${12 * sz} L ${-110 * sz} 0 L ${-12 * sz} ${-12 * sz} Z" fill="#fff"/></g>`;
}
function messState(t, k) {
  return `${bookshelf(lerp(700, 860, k), 1310, 1, lerp(0, 9, k))}${sofa(lerp(520, 380, k), 1330 + 70 * k, 1, lerp(0, -7, k))}`;
}
function fallenChairs() { return `${chair(130, 1600, 1.2, 90, 1)}${chair(960, 1660, 1.2, -84, 1)}`; }
function can(x, y, s, col) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="4" rx="58" ry="14" fill="#000" opacity=".15"/>
    <rect x="-52" y="-130" width="104" height="130" rx="12" fill="${P.metal}"/><rect x="-52" y="-104" width="104" height="70" fill="${col}"/>
    <ellipse cx="0" cy="-130" rx="52" ry="12" fill="#d6dade"/></g>`;
}

// ---------- v22 additions (Teil 4: Toby auf dem Dach) ----------
const L = { top: '#d0679f', topSh: '#b25488', sleeve: '#8e5fb0', sleeveSh: '#774c96', pants: '#2a2f45', shoe: '#3a3438',
  hair: '#6a4026', hairHi: '#84553a', skin: '#e8b48f', skinSh: '#cf9673', lip: '#c98a7c', lipDry: '#e2c2b4' };
const R = { floor: '#bfb8aa', floorSh: '#aaa396', para: '#a59d8f', paraTop: '#cfc8ba', hut: '#cdbfa2', hutSh: '#b4a688',
  tank: '#a9b7c2', tankSh: '#8d9ba6', band: '#7f8c97', leg: '#6f7680', step: '#a8a39a', stepSh: '#8d887f', hallW: '#b5bac2', hallFl: '#6c717c' };
const KID = '#e07bb3';

// Lucía, front view, origin at the feet (≈ 0.65 × the narrator's height)
function luciaHead(o = {}) {
  const lx = o.look || 0, ly = o.lookY || 0, bl = o.blink || 0, m = o.mouth || 'flat';
  const M = {
    flat: `<path d="M -12 36 L 12 36" stroke="${P.ink}" stroke-width="4.5" stroke-linecap="round"/>`,
    worried: `<path d="M -14 38 Q -7 32 0 36 Q 7 40 14 34" stroke="${P.ink}" stroke-width="4.5" fill="none" stroke-linecap="round"/>`,
    dry: `<ellipse cx="0" cy="36" rx="17" ry="7" fill="${L.lipDry}"/><path d="M -17 36 L 17 36" stroke="#9a6a5e" stroke-width="3"/><path d="M -8 30 l 2 5 M 2 29 l -1 6 M 9 31 l 2 4 M -4 38 l 1 4 M 6 38 l -1 4" stroke="#a87a6c" stroke-width="2"/>`,
    o: `<ellipse cx="0" cy="36" rx="7" ry="9" fill="${P.ink}"/>`,
  }[m];
  return `<path d="M 44 -46 Q 112 -20 98 70 Q 90 98 70 84 Q 86 20 34 -24 Z" fill="${L.hair}"/>
    <ellipse cx="-68" cy="6" rx="12" ry="17" fill="${L.skinSh}"/><ellipse cx="68" cy="6" rx="12" ry="17" fill="${L.skinSh}"/>
    <circle cx="0" cy="0" r="70" fill="${L.skin}"/>
    <path d="M -72 4 Q -80 -84 0 -86 Q 80 -84 72 4 Q 62 -40 24 -46 Q -6 -30 -38 -46 Q -64 -38 -72 4 Z" fill="${L.hair}"/>
    <path d="M -30 -70 Q 4 -82 36 -68" stroke="${L.hairHi}" stroke-width="9" fill="none" stroke-linecap="round"/>
    <circle cx="50" cy="-52" r="11" fill="${L.sleeve}"/>
    <ellipse cx="${-24 + lx}" cy="${4 + ly}" rx="6.5" ry="${Math.max(1, 8.5 * (1 - bl))}" fill="${P.ink}"/><ellipse cx="${24 + lx}" cy="${4 + ly}" rx="6.5" ry="${Math.max(1, 8.5 * (1 - bl))}" fill="${P.ink}"/>
    <path d="M -38 -14 L -13 -21 M 38 -14 L 13 -21" stroke="${L.hair}" stroke-width="5" stroke-linecap="round"/>
    <path d="M 0 12 q 6 8 0 13" stroke="${L.skinSh}" stroke-width="4" fill="none" stroke-linecap="round"/>${M}`;
}
function luciaF(x, y, s, o = {}) {
  const pose = o.pose || 'stand', hd = o.headDy || 0, ht = o.headTilt || 0;
  const aL = o.aL ?? 8, aR = o.aR ?? -8, bL = o.bL || 0, bR = o.bR || 0;
  const armL = (sy) => limb(-62, sy, aL, bL, o.l1L || 82, o.l2L || 76, 30, L.sleeve, o.bare ? L.skin : L.sleeveSh, L.skin, o.innerL || '');
  const armR = (sy) => limb(62, sy, aR, bR, o.l1R || 82, o.l2R || 76, 30, L.sleeve, o.bare ? L.skin : L.sleeveSh, L.skin, o.innerR || '');
  let body = '', headY = -440;
  if (pose === 'stand') {
    body = `<rect x="-40" y="-196" width="34" height="196" rx="15" fill="${L.pants}"/><rect x="6" y="-196" width="34" height="196" rx="15" fill="${L.pants}"/>
      ${o.shins ? `<rect x="-38" y="${-14 - 70 * o.shins}" width="30" height="${70 * o.shins}" rx="10" fill="${L.skin}"/><rect x="8" y="${-14 - 70 * o.shins}" width="30" height="${70 * o.shins}" rx="10" fill="${L.skin}"/><rect x="-42" y="${-28 - 70 * o.shins}" width="38" height="18" rx="8" fill="${L.pants}"/><rect x="4" y="${-28 - 70 * o.shins}" width="38" height="18" rx="8" fill="${L.pants}"/>` : ''}
      <ellipse cx="-26" cy="-6" rx="27" ry="12" fill="${L.shoe}"/><ellipse cx="26" cy="-6" rx="27" ry="12" fill="${L.shoe}"/>
      ${o.armsFront ? '' : armL(-336) + armR(-336)}
      <rect x="-66" y="-356" width="132" height="176" rx="36" fill="${L.top}"/><path d="M 30 -350 Q 64 -340 64 -290 L 64 -196 Q 50 -182 30 -182 Z" fill="${L.topSh}" opacity=".7"/>
      <rect x="-66" y="-204" width="132" height="22" rx="8" fill="${L.sleeve}"/>
      <rect x="-14" y="-386" width="28" height="40" rx="10" fill="${L.skinSh}"/>
      ${o.armsFront ? armL(-336) + armR(-336) : ''}`;
  } else if (pose === 'crouch') {
    headY = -330;
    body = `<ellipse cx="0" cy="-20" rx="96" ry="24" fill="${L.pants}"/>
      <rect x="-70" y="-262" width="140" height="200" rx="44" fill="${L.top}"/><rect x="-14" y="-286" width="28" height="34" rx="10" fill="${L.skinSh}"/>
      <rect x="-64" y="-150" width="52" height="144" rx="24" fill="${L.pants}"/><rect x="12" y="-150" width="52" height="144" rx="24" fill="${L.pants}"/>
      <circle cx="-38" cy="-160" r="32" fill="${L.pants}"/><circle cx="38" cy="-160" r="32" fill="${L.pants}"/>
      <ellipse cx="-40" cy="-6" rx="30" ry="12" fill="${L.shoe}"/><ellipse cx="40" cy="-6" rx="30" ry="12" fill="${L.shoe}"/>
      <rect x="-90" y="-148" width="180" height="36" rx="18" fill="${L.sleeve}"/><circle cx="-62" cy="-130" r="17" fill="${L.skin}"/><circle cx="62" cy="-130" r="17" fill="${L.skin}"/>`;
  } else { // sit
    headY = -400;
    body = `<ellipse cx="0" cy="-26" rx="118" ry="32" fill="${L.pants}"/><ellipse cx="-70" cy="-14" rx="26" ry="12" fill="${L.shoe}"/><ellipse cx="70" cy="-14" rx="26" ry="12" fill="${L.shoe}"/>
      ${o.armsFront ? '' : armL(-296) + armR(-296)}
      <rect x="-64" y="-316" width="128" height="280" rx="36" fill="${L.top}"/><rect x="-64" y="-70" width="128" height="22" rx="8" fill="${L.sleeve}"/>
      <rect x="-14" y="-346" width="28" height="38" rx="10" fill="${L.skinSh}"/>
      ${o.armsFront ? armL(-296) + armR(-296) : ''}`;
  }
  return `<g transform="translate(${x} ${y}) rotate(${o.sway || 0}) scale(${s} ${s * (o.sy || 1)})">
    <ellipse cx="0" cy="2" rx="${pose === 'stand' ? 80 : 120}" ry="14" fill="#000" opacity=".18"/>
    ${body}<g transform="translate(0 ${headY + hd}) rotate(${ht})">${luciaHead(o)}</g>${o.front || ''}</g>`;
}
// Lucía from behind (corridor / roof edge)
function luciaB(x, y, s, o = {}) {
  const u = o.turn || 0;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="2" rx="80" ry="14" fill="#000" opacity=".18"/>
    <rect x="-40" y="-196" width="34" height="196" rx="15" fill="${L.pants}"/><rect x="6" y="-196" width="34" height="196" rx="15" fill="${L.pants}"/>
    <ellipse cx="-26" cy="-6" rx="27" ry="12" fill="${L.shoe}"/><ellipse cx="26" cy="-6" rx="27" ry="12" fill="${L.shoe}"/>
    <g transform="rotate(${6 + (o.armL || 0)} -62 -336)"><rect x="-80" y="-346" width="30" height="160" rx="15" fill="${L.sleeveSh}"/><circle cx="-65" cy="-178" r="15" fill="${L.skin}"/></g>
    <g transform="rotate(${-6 - (o.armR || 0)} 62 -336)"><rect x="50" y="-346" width="30" height="160" rx="15" fill="${L.sleeveSh}"/><circle cx="65" cy="-178" r="15" fill="${L.skin}"/></g>
    <rect x="-66" y="-356" width="132" height="176" rx="36" fill="${L.top}"/><rect x="-66" y="-204" width="132" height="22" rx="8" fill="${L.sleeve}"/>
    <rect x="-14" y="-386" width="28" height="40" rx="10" fill="${L.skinSh}"/>
    <g transform="translate(0 -440)">
      <ellipse cx="${-66 + 24 * u}" cy="6" rx="12" ry="17" fill="${L.skinSh}"/><ellipse cx="${66 + 24 * u}" cy="6" rx="12" ry="17" fill="${L.skinSh}"/>
      <circle cx="0" cy="0" r="70" fill="${L.skin}"/>
      <path d="M ${-72 - 14 * u} 8 Q ${-80} -84 ${-4 * u} -86 Q 80 -84 ${72 - 14 * u} 6 Q ${54 - 40 * u} 44 ${-20 * u} 50 Q ${-56 - 40 * u} 44 ${-72 - 14 * u} 8 Z" fill="${L.hair}"/>
      <path d="M ${-6 - 20 * u} -40 Q ${16 - 20 * u} 40 ${-4 - 20 * u} 104 Q ${-22 - 20 * u} 96 ${-20 - 20 * u} 40 Z" fill="${L.hair}"/>
      <circle cx="${-6 - 20 * u}" cy="-38" r="12" fill="${L.sleeve}"/>
      <path d="M ${-34 - 20 * u} -70 Q ${0} -82 ${34 - 20 * u} -68" stroke="${L.hairHi}" stroke-width="9" fill="none" stroke-linecap="round"/>
    </g></g>`;
}
// Toby sitting (same design as v19–v21)
function tobyHead(o = {}) {
  const jaw = o.jaw || 0, ear = o.ear || 0, hr = o.headRot || 0, hf = o.headFlip ?? 1;
  return `<g transform="rotate(${hr}) scale(${hf} 1)">
      <circle cx="0" cy="0" r="50" fill="${P.dog}"/>
      ${jaw > 0 ? `<g transform="rotate(${28 * jaw} 20 22)"><path d="M 16 18 L 78 26 Q 82 40 66 44 L 18 38 Z" fill="${P.cream}"/></g><path d="M 22 18 L 80 18 L 70 ${18 + 26 * jaw} L 24 ${24 + 10 * jaw} Z" fill="#5a2320"/>` : ''}
      <ellipse cx="42" cy="${14 - 6 * jaw}" rx="34" ry="${24 - 6 * jaw}" fill="${P.cream}"/><circle cx="74" cy="${8 - 6 * jaw}" r="9" fill="${P.ink}"/>
      <circle cx="18" cy="-10" r="7" fill="${P.ink}"/><circle cx="20" cy="-12" r="2.5" fill="#fff"/>
      <g transform="rotate(${-ear * 70} -18 -36)"><path d="M -18 -40 Q -46 -36 -48 6 Q -40 22 -26 10 Q -16 -14 -6 -36 Z" fill="${P.dogEar}"/></g></g>`;
}
function tobySit(x, y, s, o = {}) {
  const dir = o.dir || 1, wag = o.wag ?? 0;
  return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})">
    <ellipse cx="-10" cy="2" rx="110" ry="15" fill="#000" opacity=".22"/>
    <g transform="rotate(${wag} -86 -20)"><path d="M -86 -20 Q -150 -16 -160 -70" stroke="${P.dog}" stroke-width="22" fill="none" stroke-linecap="round"/></g>
    <rect x="44" y="-150" width="22" height="150" rx="11" fill="${P.dogSh}"/>
    <path d="M -96 -30 Q -110 -170 -20 -232 Q 46 -268 72 -214 Q 86 -140 56 -30 Z" fill="${P.dog}"/>
    <ellipse cx="-44" cy="-56" rx="62" ry="56" fill="${P.dog}"/><ellipse cx="-50" cy="-60" rx="40" ry="34" fill="${P.dogSh}" opacity=".35"/>
    <ellipse cx="-14" cy="-8" rx="36" ry="11" fill="${P.dog}"/>
    <ellipse cx="44" cy="-164" rx="28" ry="58" fill="${P.cream}"/>
    <rect x="20" y="-150" width="24" height="150" rx="12" fill="${P.dog}"/>
    <ellipse cx="34" cy="-6" rx="19" ry="8" fill="${P.cream}"/><ellipse cx="60" cy="-6" rx="17" ry="7" fill="#d9c7a7"/>
    <rect x="6" y="-262" width="62" height="16" rx="8" fill="${P.collar}" transform="rotate(-14 37 -254)"/>
    <g transform="translate(40 -290)">${tobyHead(o)}</g></g>`;
}
function momFig(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-10" y="-40" width="9" height="40" fill="#3a3f4a"/><rect x="2" y="-40" width="9" height="40" fill="#3a3f4a"/>
    <rect x="-14" y="-82" width="30" height="46" rx="8" fill="#8a4a3a"/><circle cx="1" cy="-96" r="13" fill="#d9a582"/><path d="M -12 -100 Q 1 -118 14 -100 Z" fill="#3b2720"/>
    <rect x="14" y="-90" width="22" height="7" rx="3" fill="#8a4a3a" transform="rotate(-40 14 -86)"/><rect x="26" y="-112" width="12" height="16" rx="3" fill="#dfe8f0"/></g>`;
}
function check(x, y, p) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${p})"><circle r="56" fill="${P.green}"/><path d="M -26 2 L -6 22 L 28 -18" stroke="#fff" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
}
function sun(x, y, p) { return p <= 0 ? '' : `<g transform="translate(${x} ${y}) scale(${p})">${Array.from({ length: 8 }, (_, i) => `<rect x="-6" y="-66" width="12" height="20" rx="6" fill="${P.gold}" transform="rotate(${i * 45})"/>`).join('')}<circle r="38" fill="${P.gold}"/></g>`; }
function moon(x, y, p) { return p <= 0 ? '' : `<g transform="translate(${x} ${y}) scale(${p})"><path d="M 6 -44 A 44 44 0 1 0 30 34 A 34 34 0 1 1 6 -44 Z" fill="#c9d3ea"/></g>`; }
// water bottle with a level that stays horizontal when tilted (rot deg, origin = bottle bottom centre)
function bottleT(rot, fill, sc = 1, id = 'v22bt') {
  const c = Math.cos(rot * Math.PI / 180), sn = Math.sin(rot * Math.PI / 180);
  const ys = [[-26, 10], [26, 10], [-26, -120], [26, -120]].map(([px, py]) => px * sn + py * c);
  const lo = Math.max(...ys), hi = Math.min(...ys), lv = lerp(lo, hi, fill);
  return `<g transform="scale(${sc}) rotate(${rot})"><clipPath id="${id}"><rect x="-26" y="-120" width="52" height="130" rx="16"/></clipPath>
    <rect x="-26" y="-120" width="52" height="130" rx="16" fill="#d8eaf4" opacity=".92"/>
    <g clip-path="url(#${id})"><g transform="rotate(${-rot})"><rect x="-200" y="${lv}" width="400" height="400" fill="${P.water}"/><rect x="-200" y="${lv}" width="400" height="7" fill="${P.waterHi}"/></g></g>
    <rect x="-12" y="-138" width="24" height="22" rx="5" fill="${P.shirt}"/><rect x="-16" y="-104" width="8" height="70" rx="4" fill="#fff" opacity=".5"/></g>`;
}

// ---------- roof set (our building, above floor 12) ----------
function tankOnLegs(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="6" rx="210" ry="26" fill="#000" opacity=".16"/>
    <rect x="-150" y="-200" width="22" height="200" fill="${R.leg}"/><rect x="128" y="-200" width="22" height="200" fill="${R.leg}"/>
    <rect x="-70" y="-200" width="18" height="190" fill="#5c626b"/><rect x="52" y="-200" width="18" height="190" fill="#5c626b"/>
    <path d="M -140 -120 L 140 -190 M 140 -120 L -140 -190" stroke="${R.leg}" stroke-width="8"/>
    <rect x="-172" y="-214" width="344" height="22" rx="6" fill="${R.leg}"/>
    <rect x="-160" y="-480" width="320" height="270" rx="30" fill="${R.tank}"/><rect x="70" y="-480" width="90" height="270" rx="30" fill="${R.tankSh}"/>
    <rect x="-160" y="-420" width="320" height="14" fill="${R.band}"/><rect x="-160" y="-300" width="320" height="14" fill="${R.band}"/>
    <ellipse cx="0" cy="-480" rx="160" ry="30" fill="#c3ced6"/><rect x="-26" y="-522" width="52" height="34" rx="8" fill="${R.band}"/></g>`;
}
function roofSet(t, o = {}) {
  let s = `<rect x="-800" y="-800" width="2680" height="3600" fill="${P.sky}"/><ellipse cx="540" cy="700" rx="900" ry="500" fill="#e7e1d2" filter="url(#blur40)"/>`;
  s += smokeCol(-60, 1060, t, 0, 0) + smokeCol(560, 1040, t, 1.3, 0) + smokeCol(1260, 1050, t, 2.4, 0);
  [[-500, 900, 260], [-180, 960, 200], [120, 880, 220], [420, 980, 180], [1300, 900, 240], [1560, 960, 220]].forEach(([bx, by, bw], i) => {
    s += `<rect x="${bx}" y="${by}" width="${bw}" height="${400}" fill="${i % 2 ? P.bg1 : P.bg3}"/>`;
  });
  // the building opposite (lower roof, other side of the street)
  s += `<rect x="900" y="1004" width="420" height="200" fill="${P.bld}"/><rect x="890" y="990" width="440" height="18" fill="${P.roof}"/>${momFig(1080, 992, .9)}`;
  if (o.flash) s += flashAt(1110, 900, o.flash, .45);
  s += `<rect x="-800" y="1060" width="2680" height="74" fill="${R.para}"/><rect x="-800" y="1052" width="2680" height="16" fill="${R.paraTop}"/>
    <rect x="-800" y="1134" width="2680" height="1400" fill="${R.floor}"/>
    ${Array.from({ length: 12 }, (_, i) => `<line x1="-800" y1="${1170 + i * i * 9 + i * 36}" x2="1880" y2="${1170 + i * i * 9 + i * 36}" stroke="${R.floorSh}" stroke-width="4"/>`).join('')}
    ${Array.from({ length: 13 }, (_, i) => `<line x1="${540 + (i - 6) * 70}" y1="1134" x2="${540 + (i - 6) * 520}" y2="2400" stroke="${R.floorSh}" stroke-width="4"/>`).join('')}`;
  // stair hut (left), door open
  s += `<rect x="-560" y="640" width="500" height="500" fill="${R.hut}"/><rect x="-580" y="620" width="540" height="30" fill="${R.hutSh}"/>
    <rect x="-420" y="830" width="190" height="304" fill="#2a2d36"/><polygon points="-420,830 -500,850 -500,1150 -420,1134" fill="${P.metalSh}"/>`;
  s += tankOnLegs(620, 1330, 1);
  return s;
}

// ---------- building cross-section with roof (stairs on the left) ----------
const MX = { l: 170, r: 880, bot: 1400, fh: 76 };
const fTop = k => MX.bot - k * MX.fh;
const MY = k => MX.bot - (k - .5) * MX.fh;
function stairPos(f) { // f in [1, 13]; 13 = the flight inside the roof hut
  const k = cl(Math.floor(f), 1, 13), fr = cl(f - k, 0, 1);
  const yb = MX.bot - (k - 1) * MX.fh, yt = yb - MX.fh;
  const x = k % 2 ? lerp(195, 315, fr) : lerp(315, 195, fr);
  return [x, lerp(yb - 10, yt + 10, fr)];
}
function mapD(t, o = {}) {
  let s = `<rect x="-400" y="-600" width="1880" height="3200" fill="${P.navy}"/><ellipse cx="540" cy="900" rx="700" ry="900" fill="#1c2638" opacity=".6" filter="url(#blur40)"/>`;
  const top = fTop(12);
  // roof: hut over the stairs + water tank
  s += `<rect x="${MX.l}" y="${top - MX.fh}" width="170" height="${MX.fh}" fill="${P.navy2}" stroke="${P.gridHi}" stroke-width="5"/>
    <rect x="${MX.l - 30}" y="${top - 6}" width="${MX.r - MX.l + 60}" height="12" fill="${P.gridHi}"/>
    <g transform="translate(720 ${top - 6})"><rect x="-40" y="-40" width="8" height="40" fill="${P.grid}"/><rect x="72" y="-40" width="8" height="40" fill="${P.grid}"/>
    <rect x="-50" y="-110" width="140" height="74" rx="12" fill="#3b4559"/><rect x="-42" y="-88" width="124" height="46" rx="8" fill="${P.water}" opacity=".55"/></g>
    ${T('DACH', 112, top - 22, 30, o.dach ? P.gold : P.grey, { op: o.dach ? 1 : .85 })}`;
  if (o.dachHi) s += `<rect x="${MX.l}" y="${top - MX.fh}" width="${MX.r - MX.l}" height="${MX.fh}" fill="${P.gold}" opacity="${.14 * o.dachHi}"/>`;
  s += `<rect x="${MX.l}" y="${top}" width="${MX.r - MX.l}" height="${12 * MX.fh}" fill="${P.navy2}"/>`;
  for (let k = 1; k <= 13; k++) {
    const y0 = fTop(k), yb = y0 + MX.fh;
    const [a, b] = k % 2 ? [[195, yb - 10], [315, y0 + 10]] : [[315, yb - 10], [195, y0 + 10]];
    s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${P.gridHi}" stroke-width="5" stroke-linecap="round" opacity="${o.dim && k < 12 ? .45 : 1}"/>`;
    if (k > 12) continue;
    s += T(String(k), 128, y0 + 52, 32, k === 12 ? P.gold : P.grey, { op: k === 12 ? 1 : .8 });
    for (let i = 0; i < 4; i++) s += `<rect x="${380 + i * 120}" y="${y0 + 18}" width="92" height="40" rx="4" fill="${k === 12 && i === 1 ? '#2c3a52' : P.cell}"/>`;
    s += `<line x1="${MX.l}" y1="${y0}" x2="${MX.r}" y2="${y0}" stroke="${P.grid}" stroke-width="4"/>`;
  }
  if (o.dim) s += `<rect x="${MX.l}" y="${fTop(11)}" width="${MX.r - MX.l}" height="${11 * MX.fh}" fill="${P.navy}" opacity="${.45 * o.dim}"/>`;
  s += `<line x1="340" y1="${top}" x2="340" y2="${MX.bot}" stroke="${P.grid}" stroke-width="4"/>
    <rect x="${MX.l}" y="${top}" width="${MX.r - MX.l}" height="${12 * MX.fh}" fill="none" stroke="${P.gridHi}" stroke-width="6"/>`;
  if (o.du !== false) {
    const pr = (t * .8) % 1, a = o.duA ?? 1;
    s += `<g opacity="${a}"><circle cx="530" cy="${MY(12)}" r="${18 + pr * 28}" fill="none" stroke="${P.green}" stroke-width="4" opacity="${.8 * (1 - pr)}"/>
      <circle cx="530" cy="${MY(12)}" r="13" fill="${P.green}"/>${T('DU', 590, MY(12) + 13, 34, P.green, { a: 'start' })}</g>`;
  }
  return s;
}
// pictograms for the map
function icoPerson(x, y, s, col) { return `<g transform="translate(${x} ${y}) scale(${s})"><circle cx="0" cy="-58" r="15" fill="${col}"/><rect x="-14" y="-40" width="28" height="40" rx="10" fill="${col}"/></g>`; }
function icoDog(x, y, s, dir = 1) { return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})"><rect x="-26" y="-26" width="44" height="20" rx="10" fill="#c98a52"/><circle cx="20" cy="-30" r="11" fill="#c98a52"/><rect x="-22" y="-10" width="7" height="12" fill="#c98a52"/><rect x="8" y="-10" width="7" height="12" fill="#c98a52"/><path d="M -26 -20 l -10 -10" stroke="#c98a52" stroke-width="6" stroke-linecap="round"/><rect x="12" y="-24" width="14" height="5" fill="${P.collar}"/></g>`; }

// hallway (floor 12) seen from the corridor towards our door. a 0..1 = door pushed in (gap), taut 0..1
function hallDoor(t, o = {}) {
  const a = o.a || 0, g = 70 * a, dj = o.dj || 0, taut = o.taut || 0;
  const droop = lerp(46, 0, taut) + (taut > 0 ? 3 * Math.sin(t * 60) * (o.vib || 0) : 0);
  return `<rect x="-400" y="-400" width="1880" height="1720" fill="${R.hallW}"/>
    <rect x="-400" y="1300" width="1880" height="1100" fill="${R.hallFl}"/><rect x="-400" y="1290" width="1880" height="16" fill="#8a909b"/>
    ${Array.from({ length: 9 }, (_, i) => `<line x1="${-400 + i * 240}" y1="2400" x2="${200 + i * 85}" y2="1306" stroke="#60656f" stroke-width="4"/>`).join('')}
    <rect x="470" y="360" width="140" height="74" rx="8" fill="#7a6a5a"/>${T('12', 540, 414, 46, '#efe9dc')}
    <rect x="330" y="470" width="420" height="830" fill="${Q.frame}"/>
    <rect x="346" y="486" width="388" height="814" fill="#0d1018"/>
    ${g > 0 ? `<rect x="346" y="486" width="${g}" height="814" fill="#07090e"/><polygon points="346,1300 ${346 + g},1300 ${346 + g * .6},1420 346,1420" fill="#000" opacity=".25"/>
      ${o.glow ? `<rect x="346" y="486" width="${g}" height="814" fill="${P.red}" opacity="${.12 * o.glow}"/>` : ''}` : ''}
    <g transform="translate(${dj} 0)">
      <polygon points="${346 + g},${486 + 10 * a} 734,486 734,1300 ${346 + g},${1300 - 10 * a}" fill="${Q.door}"/>
      ${g > 0 ? `<polygon points="${346 + g},${486 + 10 * a} ${346 + g + 12 * a},${486 + 12 * a} ${346 + g + 12 * a},${1300 - 12 * a} ${346 + g},${1300 - 10 * a}" fill="#9a6a48"/>` : ''}
      <rect x="${386 + g * .9}" y="530" width="${310 - g * .9}" height="330" rx="8" fill="${Q.doorP}"/><rect x="${386 + g * .9}" y="910" width="${310 - g * .9}" height="340" rx="8" fill="${Q.doorP}"/>
      <circle cx="540" cy="690" r="11" fill="#2a1a10"/><circle cx="540" cy="690" r="5" fill="#c9b48a"/>
      <circle cx="${392 + g}" cy="900" r="15" fill="#d8b25a"/><rect x="${392 + g}" y="892" width="46" height="15" rx="7" fill="#d8b25a"/>
    </g>
    ${g > 0 && !o.noChain ? `<path d="M 352 640 Q ${346 + g / 2} ${648 + droop} ${340 + g} 652" stroke="${P.chain}" stroke-width="6" fill="none" stroke-dasharray="8 4"/>` : ''}
    <rect x="300" y="1300" width="480" height="40" rx="10" fill="#5a4a3e"/>`;
}

// ---------- v23 additions (Teil 5: Ernesto und der Weg nach unten) ----------
const E = { blue: '#4a9cf0', car: '#3a4f7a', carSh: '#2c3d60', glass: '#9fb4cc', gar: '#2b2f38', garSh: '#22252c', conc: '#4a4e57', night: '#0b1222' };
const CANC = ['#c8463a', '#4f8a5a', '#d9a43b', '#3d78c2'];
function ik(hx, hy, fx, fy, l1, l2, bend) {
  const dx = fx - hx, dy = fy - hy, d = Math.max(1, Math.min(Math.hypot(dx, dy), l1 + l2 - .01));
  const a = Math.atan2(dy, dx), c = cl((l1 * l1 + d * d - l2 * l2) / (2 * l1 * d), -1, 1);
  const k = a + bend * Math.acos(c);
  return [hx + l1 * Math.cos(k), hy + l1 * Math.sin(k)];
}
function armIK(sx, sy, tx, ty, l1, l2, bend, w, col, hand, inner = '') {
  const d = Math.hypot(tx - sx, ty - sy), m = l1 + l2 - .5;
  if (d > m) { tx = sx + (tx - sx) * m / d; ty = sy + (ty - sy) * m / d; }
  const [kx, ky] = ik(sx, sy, tx, ty, l1, l2, bend);
  return `<path d="M ${sx} ${sy} L ${kx} ${ky} L ${tx} ${ty}" stroke="${col}" stroke-width="${w}" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${tx}" cy="${ty}" r="${w * .56}" fill="${hand}"/>${inner}`;
}
// Ernesto (v20 design: grey hair at the sides + moustache, thin glasses, olive-brown cardigan, torch in the right hand). o.look pupils, o.reachL [x,y] local target, o.turn = back view
function ernesto(x, y, s, o = {}) {
  const talk = o.talk || 0, nod = o.nod || 0, beam = o.beam ?? 1, lk = o.look || 0;
  const aL1 = o.aL1 ?? 10, aL2 = o.aL2 ?? 0, aR1 = o.aR1 ?? -14, aR2 = o.aR2 ?? -40;
  const mo = talk > 0 ? 4 + 10 * talk : 0, fx = o.flip ? -1 : 1;
  const tor = o.noTorch ? limb(132, -560, aR1, aR2, 150, 140, 52, P.card, P.card, P.eSkin)
    : limb(132, -560, aR1, aR2, 150, 140, 52, P.card, P.card, P.eSkin, `<g transform="translate(0 150) rotate(${-(aR1 + aR2) * (o.torchUp ? 1 : 0)})">${torchProp(beam)}</g>`);
  const left = o.reachL ? armIK(-132, -560, o.reachL[0] * fx, o.reachL[1], 150, 140, o.bendL ?? 1, 52, P.card, P.eSkin, o.heldL || '')
    : limb(-132, -560, aL1, aL2, 150, 140, 52, P.card, P.card, P.eSkin, o.palm ? `<ellipse cx="0" cy="166" rx="30" ry="40" fill="${P.eSkin}"/>` : '');
  return `<g transform="translate(${x} ${y}) scale(${s * fx} ${s})">
    <ellipse cx="0" cy="0" rx="140" ry="20" fill="#000" opacity=".3"/>
    <rect x="-80" y="-300" width="70" height="300" rx="24" fill="${P.ePants}"/><rect x="10" y="-300" width="70" height="300" rx="24" fill="${P.ePants}"/>
    <ellipse cx="-48" cy="-8" rx="48" ry="18" fill="#2b2a2e"/><ellipse cx="48" cy="-8" rx="48" ry="18" fill="#2b2a2e"/>
    <rect x="-140" y="-600" width="280" height="330" rx="72" fill="${P.card}"/>
    ${o.turn ? '' : `<path d="M -40 -598 L 0 -500 L 40 -598 Z" fill="${P.eShirt}"/><rect x="-6" y="-500" width="12" height="220" fill="${P.cardSh}"/>
    <circle cx="-22" cy="-440" r="7" fill="${P.cardSh}"/><circle cx="-22" cy="-380" r="7" fill="${P.cardSh}"/><circle cx="-22" cy="-320" r="7" fill="${P.cardSh}"/>`}
    <path d="M 80 -590 Q 136 -570 136 -480 L 136 -300 Q 110 -272 80 -272 Z" fill="${P.cardSh}" opacity=".6"/>
    ${left}${tor}
    <rect x="-30" y="-650" width="60" height="70" rx="20" fill="${P.eSkinSh}"/>
    <g transform="translate(0 ${-730 + nod}) rotate(${o.headTilt || 0})">
      <ellipse cx="-86" cy="10" rx="16" ry="26" fill="${P.eSkinSh}"/><ellipse cx="86" cy="10" rx="16" ry="26" fill="${P.eSkinSh}"/>
      <ellipse cx="0" cy="0" rx="86" ry="96" fill="${P.eSkin}"/>
      ${o.turn ? `<path d="M -88 -10 Q -90 60 0 70 Q 90 60 88 -10 Q 80 30 0 34 Q -80 30 -88 -10 Z" fill="${P.eHair}"/>` : `
      <path d="M -88 -6 Q -96 -60 -70 -64 Q -64 -20 -76 20 Z M 88 -6 Q 96 -60 70 -64 Q 64 -20 76 20 Z" fill="${P.eHair}"/>
      <path d="M -54 -34 L -16 -30 M 54 -34 L 16 -30" stroke="${P.eHair}" stroke-width="9" stroke-linecap="round"/>
      <circle cx="-34" cy="-6" r="24" fill="none" stroke="#2a2f3a" stroke-width="5"/><circle cx="34" cy="-6" r="24" fill="none" stroke="#2a2f3a" stroke-width="5"/><path d="M -10 -8 L 10 -8" stroke="#2a2f3a" stroke-width="5"/>
      <circle cx="${-34 + lk}" cy="-4" r="7" fill="${P.ink}"/><circle cx="${34 + lk}" cy="-4" r="7" fill="${P.ink}"/>
      <path d="M -50 14 q 16 8 30 0 M 20 14 q 16 8 30 0" stroke="${P.eSkinSh}" stroke-width="4" fill="none"/>
      <path d="M -6 0 Q -14 26 0 30" stroke="${P.eSkinSh}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M -40 46 Q 0 30 40 46 Q 30 54 0 48 Q -30 54 -40 46 Z" fill="${P.eHair}"/>
      ${mo > 0 ? `<ellipse cx="0" cy="60" rx="14" ry="${mo / 2}" fill="#5a2a24"/>` : `<path d="M -16 60 L 16 60" stroke="#8a4a3a" stroke-width="5" stroke-linecap="round"/>`}`}
    </g>
  </g>`;
}
// ---------- props ----------
function phoneP(x, y, s, o = {}) { // 324x624 phone, centre origin; o.scr = screen content (-142..142, -286..286)
  const bz = o.buzz || 0, tt = o.t || 0, id = o.id || 'v23ph';
  return `<g transform="translate(${x + bz * 7 * Math.sin(tt * 95)} ${y + bz * 3 * Math.cos(tt * 81)}) rotate(${(o.rot || 0) + bz * 1.6 * Math.sin(tt * 73)}) scale(${s})">
    <rect x="-162" y="-312" width="324" height="624" rx="46" fill="#000" opacity=".25" transform="translate(10 16)"/>
    <rect x="-162" y="-312" width="324" height="624" rx="46" fill="#1d212b"/>
    <rect x="-142" y="-286" width="284" height="572" rx="30" fill="${o.bg || '#e9eef5'}"/>
    <clipPath id="${id}"><rect x="-142" y="-286" width="284" height="572" rx="30"/></clipPath>
    <g clip-path="url(#${id})">${o.scr || ''}</g>
    <rect x="-40" y="-276" width="80" height="16" rx="8" fill="#1d212b"/></g>`;
}
function battIco(x, y, s, lvl, col, st = P.white) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-100" y="-50" width="190" height="100" rx="18" fill="none" stroke="${st}" stroke-width="14"/><rect x="92" y="-20" width="18" height="40" rx="6" fill="${st}"/>
    <rect x="-84" y="-34" width="${Math.max(0, 158 * lvl)}" height="68" rx="8" fill="${col}"/></g>`;
}
function warnTri(x, y, s, col = P.red) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M 0 -62 L 62 50 L -62 50 Z" fill="${col}" stroke="${col}" stroke-width="18" stroke-linejoin="round"/><rect x="-7" y="-26" width="14" height="44" rx="7" fill="#fff"/><circle cx="0" cy="34" r="8" fill="#fff"/></g>`;
}
function wheel(cx) { return `<circle cx="${cx}" cy="-46" r="46" fill="#1a1c22"/><circle cx="${cx}" cy="-46" r="20" fill="#8d939c"/>`; }
function carSide(x, y, s, o = {}) { // origin ground centre, rear (exhaust) on the left
  const c = o.col || E.car, sh = o.sh || E.carSh;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="4" rx="270" ry="18" fill="#000" opacity=".3"/>
    <path d="M -250 -40 Q -256 -110 -200 -118 L -130 -124 Q -80 -200 0 -204 L 70 -204 Q 130 -200 170 -128 L 230 -118 Q 262 -110 258 -40 Z" fill="${c}"/>
    <path d="M -112 -128 Q -70 -186 -8 -188 L -8 -128 Z" fill="${o.glass || E.glass}"/><path d="M 8 -188 L 64 -188 Q 116 -184 150 -128 L 8 -128 Z" fill="${o.glass || E.glass}"/>
    <rect x="-250" y="-72" width="508" height="22" fill="${sh}"/>
    <rect x="232" y="-104" width="24" height="18" rx="6" fill="${o.lights ? '#f2e2a0' : '#8d8a7a'}"/><rect x="-252" y="-104" width="16" height="18" rx="5" fill="#7a2a24"/>
    <rect x="-270" y="-48" width="34" height="13" rx="6" fill="#5c626b"/>
    ${wheel(-150)}${wheel(150)}</g>`;
}
function carBattery(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-110" y="-70" width="220" height="140" rx="16" fill="#2b2f38"/><rect x="-110" y="-70" width="220" height="34" rx="12" fill="#3a3f4a"/>
    <rect x="-80" y="-96" width="36" height="28" rx="6" fill="${P.red}"/><rect x="44" y="-96" width="36" height="28" rx="6" fill="#8d939c"/>
    <path d="M -62 0 v 30 M -77 15 h 30" stroke="${P.red}" stroke-width="9" stroke-linecap="round"/><path d="M 47 15 h 30" stroke="#8d939c" stroke-width="9" stroke-linecap="round"/></g>`;
}
function engineOff(x, y, s, p) { // engine pictogram with a red stroke through it
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) scale(${s * p})"><circle r="96" fill="${P.ink}"/>
    <rect x="-44" y="-22" width="92" height="62" rx="8" fill="#cfd4dc"/><rect x="-36" y="-46" width="20" height="26" rx="4" fill="#cfd4dc"/><rect x="-8" y="-46" width="20" height="26" rx="4" fill="#cfd4dc"/><rect x="20" y="-46" width="20" height="26" rx="4" fill="#cfd4dc"/>
    <circle cx="-60" cy="8" r="20" fill="none" stroke="#cfd4dc" stroke-width="9"/><rect x="48" y="0" width="22" height="14" rx="4" fill="#cfd4dc"/>
    <path d="M -60 -60 L 60 60" stroke="${P.red}" stroke-width="16" stroke-linecap="round"/><circle r="96" fill="none" stroke="${P.red}" stroke-width="12"/></g>`;
}
function stadium(x, y, s, col = '#cfd4dc') {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="22" rx="124" ry="44" fill="${col}"/><rect x="-124" y="-28" width="248" height="50" fill="${col}"/>
    <ellipse cx="0" cy="-28" rx="124" ry="44" fill="#9aa2b1"/><ellipse cx="0" cy="-28" rx="84" ry="26" fill="${P.green}"/><path d="M 0 -54 v 52" stroke="#fff" stroke-width="4" opacity=".7"/>
    <rect x="-116" y="-118" width="8" height="80" fill="${col}"/><rect x="108" y="-118" width="8" height="80" fill="${col}"/>
    <rect x="-128" y="-130" width="32" height="16" rx="4" fill="${P.gold}"/><rect x="96" y="-130" width="32" height="16" rx="4" fill="${P.gold}"/></g>`;
}
function carKey(x, y, s, rot = 0) { // lies flat: bottom edge at y + 30*s
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})"><circle cx="-74" cy="0" r="20" fill="none" stroke="${P.metal}" stroke-width="7"/>
    <rect x="-60" y="-30" width="84" height="60" rx="22" fill="#2b2f38"/><circle cx="-30" cy="0" r="10" fill="${P.red}"/><circle cx="0" cy="0" r="8" fill="#6f7680"/>
    <rect x="22" y="-10" width="92" height="20" rx="4" fill="${P.metal}"/><path d="M 64 10 l 8 9 l 8 -9 l 8 9 l 8 -9" stroke="${P.metal}" stroke-width="6" fill="none"/></g>`;
}
function canB(x, y, s, col, bul = 0) { // can whose lid and base bulge (bul 0..1)
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="4" rx="58" ry="14" fill="#000" opacity=".15"/>
    <path d="M -52 0 Q ${-52 - 16 * bul} -65 -52 -130 L 52 -130 Q ${52 + 16 * bul} -65 52 0 Z" fill="${P.metal}"/>
    <path d="M ${-52 - 9 * bul} -104 L ${52 + 9 * bul} -104 Q ${52 + 15 * bul} -69 ${52 + 9 * bul} -34 L ${-52 - 9 * bul} -34 Q ${-52 - 15 * bul} -69 ${-52 - 9 * bul} -104 Z" fill="${col}"/>
    <ellipse cx="0" cy="${-130 - 14 * bul}" rx="52" ry="${12 + 18 * bul}" fill="#d6dade"/><ellipse cx="${-14}" cy="${-136 - 20 * bul}" rx="16" ry="${4 + 5 * bul}" fill="#fff" opacity=".6"/>
    ${bul > .1 ? `<ellipse cx="0" cy="${2 + 6 * bul}" rx="46" ry="${6 + 8 * bul}" fill="${P.metalSh}"/>` : ''}</g>`;
}
function xMark(x, y, s, p) { return p <= 0 ? '' : `<g transform="translate(${x} ${y}) scale(${s * p})"><path d="M -40 -40 L 40 40 M 40 -40 L -40 40" stroke="${P.red}" stroke-width="18" stroke-linecap="round"/></g>`; }
function bag(x, y, s, sq = 0) {
  return `<g transform="translate(${x} ${y}) scale(${s * (1 + .08 * sq)} ${s * (1 - .1 * sq)})"><ellipse cx="0" cy="4" rx="170" ry="20" fill="#000" opacity=".2"/>
    <path d="M -150 0 L -130 -250 L 130 -250 L 150 0 Z" fill="#c9b48a"/><path d="M 60 -250 L 130 -250 L 150 0 L 80 0 Z" fill="#b39d72"/>
    <path d="M -70 -250 Q -70 -330 0 -330 Q 70 -330 70 -250" stroke="#8a7650" stroke-width="16" fill="none"/>
    <rect x="-96" y="-300" width="70" height="60" rx="10" fill="${P.metal}"/><rect x="-20" y="-296" width="70" height="56" rx="10" fill="${P.metalSh}"/></g>`;
}
function wallClock(x, y, r, hh, mm) { // hh/mm as fractional hour/minute
  const ha = (hh % 12 + mm / 60) * 30, ma = mm * 6;
  return `<g transform="translate(${x} ${y})"><circle r="${r + 10}" fill="${Q.frame}"/><circle r="${r}" fill="#fbf8f0"/>
    ${Array.from({ length: 12 }, (_, i) => `<rect x="-3" y="${-r + 6}" width="6" height="${i % 3 ? 10 : 18}" fill="${P.ink}" transform="rotate(${i * 30})"/>`).join('')}
    <rect x="-5" y="${-r * .52}" width="10" height="${r * .52}" rx="5" fill="${P.ink}" transform="rotate(${ha})"/><rect x="-3.5" y="${-r * .8}" width="7" height="${r * .8}" rx="3.5" fill="${P.ink}" transform="rotate(${ma})"/><circle r="8" fill="${P.red}"/></g>`;
}
function torchGlow(x, y, rx, ry, a) { return a <= 0 ? '' : `<ellipse cx="${x}" cy="${y}" rx="${rx}" ry="${ry}" fill="${P.torch}" opacity="${.22 * a}" filter="url(#blur40)"/>`; }
function nightOv(a) { return a <= 0 ? '' : `<rect x="-600" y="-600" width="2280" height="3200" fill="${E.night}" opacity="${.66 * a}"/>`; }
function speech(x, y, t, t0, t1, col, dir = 1) { // sound arcs
  let s = '';
  for (let i = 0; i < 3; i++) {
    const q = ((t - t0) * 1.6 + i / 3) % 1;
    if (t < t0 || t > t1) continue;
    s += `<path d="M ${x + dir * (20 + 120 * q)} ${y - 60 - 40 * q} q ${dir * 40} ${60 + 40 * q} 0 ${120 + 80 * q}" stroke="${col}" stroke-width="${10 - 5 * q}" fill="none" stroke-linecap="round" opacity="${1 - q}"/>`;
  }
  return s;
}
// table, side view; o.night dims
function tableSet(t, o = {}) {
  const top = o.top || 1180, n = o.night || 0;
  let sl = '';
  for (let i = 0; i < 11; i++) sl += `<rect x="604" y="${306 + i * 34}" width="292" height="24" fill="${Q.slat}"/><rect x="604" y="${326 + i * 34}" width="292" height="4" fill="${Q.slatSh}"/>`;
  return `<rect x="-600" y="-600" width="2280" height="3200" fill="${P.wall}"/><rect x="-600" y="${top - 30}" width="2280" height="20" fill="${P.wallSh}"/>
    <rect x="590" y="292" width="320" height="400" fill="${Q.frame}"/><rect x="604" y="306" width="292" height="372" fill="${n ? '#141a28' : '#f4f0e4'}"/>${sl}
    <rect x="-600" y="${top - 60}" width="2280" height="60" fill="#b5835a"/><rect x="-600" y="${top - 60}" width="2280" height="6" fill="#c9976c"/>
    <rect x="-600" y="${top}" width="2280" height="36" fill="${Q.shelf}"/><rect x="-600" y="${top + 36}" width="2280" height="30" fill="${Q.shelfSh}"/>
    <rect x="-600" y="${top + 66}" width="2280" height="1400" fill="${P.floorSh}"/>`;
}
// ---------- building cross-section incl. underground garage (stairs on the left, 1 bottom -> 12 top) ----------
const G = { l: 170, r: 880, bot: 1230, fh: 64, gb: 1336 };
const gTop = k => G.bot - k * G.fh;
const gMY = k => k === 0 ? (G.bot + G.gb) / 2 : G.bot - (k - .5) * G.fh;
function stairG(f) { // f in [0, 13]; [0,1) = the flight down into the garage
  const k = cl(Math.floor(f), 0, 12), fr = cl(f - k, 0, 1);
  const yb = k === 0 ? G.gb : G.bot - (k - 1) * G.fh, yt = k === 0 ? G.bot : G.bot - k * G.fh;
  const x = k % 2 ? lerp(195, 315, fr) : lerp(315, 195, fr);
  return [x, lerp(yb - 10, yt + 10, fr)];
}
function pathG(f0, f1, p, col, w = 10, dash = '18 12') {
  if (p <= 0) return '';
  const fe = lerp(f0, f1, cl(p)), n = Math.max(2, Math.ceil(Math.abs(fe - f0) / .05));
  let d = '';
  for (let i = 0; i <= n; i++) { const [x, y] = stairG(lerp(f0, fe, i / n)); d += `${i ? 'L' : 'M'} ${x.toFixed(1)} ${y.toFixed(1)} `; }
  return `<path d="${d}" stroke="${col}" stroke-width="${w}" fill="none" stroke-dasharray="${dash}" stroke-linecap="round" stroke-linejoin="round"/>`;
}
function mapG(t, o = {}) {
  let s = `<rect x="-600" y="-600" width="2280" height="3200" fill="${P.navy}"/><ellipse cx="540" cy="900" rx="700" ry="900" fill="#1c2638" opacity=".6" filter="url(#blur40)"/>`;
  const top = gTop(12);
  s += `<rect x="-600" y="${G.bot}" width="2280" height="1200" fill="#0c1019"/><rect x="-600" y="${G.bot - 5}" width="2280" height="10" fill="${P.grid}"/>
    <rect x="${G.l}" y="${top - G.fh}" width="170" height="${G.fh}" fill="${P.navy2}" stroke="${P.gridHi}" stroke-width="5"/>
    <rect x="${G.l - 30}" y="${top - 6}" width="${G.r - G.l + 60}" height="12" fill="${P.gridHi}"/>
    <g transform="translate(720 ${top - 6})"><rect x="-40" y="-36" width="8" height="36" fill="${P.grid}"/><rect x="72" y="-36" width="8" height="36" fill="${P.grid}"/>
    <rect x="-50" y="-100" width="140" height="66" rx="12" fill="#3b4559"/><rect x="-42" y="-80" width="124" height="40" rx="8" fill="${P.water}" opacity=".55"/></g>
    <rect x="${G.l}" y="${top}" width="${G.r - G.l}" height="${12 * G.fh}" fill="${P.navy2}"/>`;
  for (let k = 1; k <= 13; k++) {
    const y0 = gTop(k), yb = y0 + G.fh;
    const [a, b] = k % 2 ? [[195, yb - 10], [315, y0 + 10]] : [[315, yb - 10], [195, y0 + 10]];
    s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${P.gridHi}" stroke-width="5" stroke-linecap="round"/>`;
    if (k > 12) continue;
    s += T(String(k), 128, y0 + 44, 28, k === 12 ? P.gold : P.grey, { op: k === 12 ? 1 : .8 });
    for (let i = 0; i < 4; i++) s += `<rect x="${380 + i * 120}" y="${y0 + 14}" width="92" height="36" rx="4" fill="${k === 12 && i === 1 ? '#2c3a52' : P.cell}"/>`;
    s += `<line x1="${G.l}" y1="${y0}" x2="${G.r}" y2="${y0}" stroke="${P.grid}" stroke-width="4"/>`;
  }
  s += `<line x1="340" y1="${top}" x2="340" y2="${G.bot}" stroke="${P.grid}" stroke-width="4"/>
    <rect x="${G.l}" y="${top}" width="${G.r - G.l}" height="${12 * G.fh}" fill="none" stroke="${P.gridHi}" stroke-width="6"/>`;
  // underground garage (below floor 1)
  const ga = o.gar ?? 1, hi = o.garHi || 0;
  if (ga > 0) {
    const [a0, b0] = [stairG(0), stairG(.999)];
    s += `<g opacity="${ga}"><rect x="${G.l}" y="${G.bot}" width="${G.r - G.l}" height="${G.gb - G.bot}" fill="#161c29" stroke="${hi ? P.gold : P.gridHi}" stroke-width="6"/>
      ${hi ? `<rect x="${G.l}" y="${G.bot}" width="${G.r - G.l}" height="${G.gb - G.bot}" fill="${P.gold}" opacity="${.12 * hi}"/>` : ''}
      <line x1="${a0[0]}" y1="${a0[1]}" x2="${b0[0]}" y2="${b0[1]}" stroke="${P.gridHi}" stroke-width="5" stroke-linecap="round"/><line x1="340" y1="${G.bot}" x2="340" y2="${G.gb}" stroke="${P.grid}" stroke-width="4"/>
      ${T('TIEFGARAGE', 520, G.bot + 66, 32, hi ? P.gold : P.grey)}
      ${o.car ? `<g transform="translate(775 ${G.gb - 12}) scale(${.2 * o.car})">${carSide(0, 0, 1, { col: E.blue, sh: '#3a7fd0', glass: '#1a2232' })}</g>` : ''}</g>`;
  }
  if (o.du !== false) {
    const pr = (t * .8) % 1, a = o.duA ?? 1;
    s += `<g opacity="${a}"><circle cx="530" cy="${gMY(12)}" r="${16 + pr * 26}" fill="none" stroke="${P.green}" stroke-width="4" opacity="${.8 * (1 - pr)}"/>
      <circle cx="530" cy="${gMY(12)}" r="12" fill="${P.green}"/>${T('DU', 556, gMY(12) + 11, 30, P.green, { a: 'start' })}</g>`;
  }
  if (o.ern) s += `<g opacity="${o.ern}"><circle cx="680" cy="${gMY(12)}" r="12" fill="${E.blue}"/>${T('ERNESTO', 700, gMY(12) + 10, 26, E.blue, { a: 'start' })}</g>`;
  return s;
}
// ---------- shots ----------
function chainClose(t, o = {}) { // hallway side: frame | dark gap | door; the chain across the gap
  const vib = o.vib || 0, beam = o.beam || 0, bx = o.bx ?? 540, loose = o.loose || 0;
  let s = `<rect width="1080" height="1920" fill="${R.hallW}"/>
    <rect x="200" y="0" width="210" height="1920" fill="${Q.frame}"/><rect x="380" y="0" width="30" height="1920" fill="#4a2e1e"/>
    <rect x="410" y="0" width="260" height="1920" fill="#07090e"/>`;
  if (beam > 0) s += `<clipPath id="v23gap"><rect x="410" y="0" width="260" height="1920"/></clipPath><g clip-path="url(#v23gap)">
      <ellipse cx="${bx}" cy="1180" rx="170" ry="520" fill="${P.torch}" opacity="${.35 * beam}" filter="url(#blur40)"/><circle cx="${bx}" cy="1000" r="${60 + 20 * beam}" fill="#fff6d0" opacity="${.5 * beam}" filter="url(#blur20)"/></g>
      <polygon points="410,1700 670,1700 ${880 + (bx - 540)},1920 ${200 + (bx - 540)},1920" fill="${P.torch}" opacity="${.3 * beam}"/>`;
  s += o.inner || '';
  s += `<polygon points="670,-40 730,0 730,1920 670,1960" fill="#9a6a48"/><rect x="730" y="0" width="400" height="1920" fill="${Q.door}"/><rect x="790" y="160" width="300" height="560" rx="10" fill="${Q.doorP}"/><rect x="790" y="800" width="300" height="760" rx="10" fill="${Q.doorP}"/>
    <rect x="384" y="770" width="46" height="110" rx="8" fill="${P.metalSh}"/><circle cx="406" cy="800" r="7" fill="#5c626b"/><circle cx="406" cy="850" r="7" fill="#5c626b"/>
    <rect x="628" y="800" width="64" height="44" rx="8" fill="${P.metalSh}"/><rect x="600" y="812" width="40" height="20" rx="6" fill="${P.metal}"/>`;
  s += loose ? `<path d="M 420 820 Q ${430 + 20 * Math.sin(t * 6)} 1000 ${440 + 30 * Math.sin(t * 5)} 1120" stroke="${P.chain}" stroke-width="14" fill="none" stroke-dasharray="22 8"/>`
    : `<path d="M 420 820 Q 520 ${822 + vib} 610 822" stroke="${P.chain}" stroke-width="14" fill="none" stroke-dasharray="22 8"/><circle cx="612" cy="822" r="14" fill="${P.metal}"/>`;
  s += `<circle cx="420" cy="820" r="12" fill="${P.metal}"/><rect x="860" y="980" width="70" height="26" rx="13" fill="#d8b25a"/>`;
  return s;
}
function sLocked(t) { // 0 - 1.5 : hook — the door jolts against the taut chain
  const j = 1.1 * ring(t, .12, 7, 6), [sx, sy] = shk(t, .12, 16, 7);
  const vib = 18 * ring(t, .12, 11, 5) + 6 * ring(t, .95, 10, 6);
  const z = lerp(1.35, 1.12, eout(prog(t, 0, .5))) + .04 * prog(t, .5, 1.5);
  return cam(`<g transform="translate(${sx + j * 14} ${sy})">${chainClose(t, { vib })}</g>`, z, 520, 840);
}
function hallGroup(t, o = {}) { // narrator (back), Lucía (back), Toby in the corridor of floor 12
  return `${toby(o.tx ?? 600, o.ty ?? 1720, o.ts ?? .5, { dir: -1, t: o.tt ?? t, ear: o.ear ?? .3, wag: o.wag })}
    ${luciaB(o.lx ?? 790, o.ly ?? 1900, o.ls ?? .85, { turn: o.lturn ?? -.3, armL: o.larm || 0, armR: o.larm || 0 })}
    ${personBack(o.px ?? 270, o.py ?? 2060, o.ps ?? 1.05, { breath: .4, turn: o.pturn ?? .1 })}`;
}
function sLockedWide(t) { // 1.5 - 3.24 : from the inside — the three of you stand outside
  const p = eout(prog(t, 1.5, 2.0)), red = back(prog(t, 2.06, 2.3));
  const lock = red > 0 ? `<g transform="translate(381 760) scale(${red})"><rect x="-40" y="-20" width="80" height="66" rx="12" fill="${P.red}"/><path d="M -24 -20 v -22 a 24 24 0 0 1 48 0 v 22" stroke="${P.red}" stroke-width="12" fill="none"/><circle cx="0" cy="12" r="9" fill="#fff"/></g>` : '';
  const scene = `${hallDoor(t, { a: 1, taut: 1, vib: Math.exp(-(t - 1.5) * 3) })}
    <rect x="330" y="470" width="420" height="830" fill="none" stroke="${P.red}" stroke-width="10" stroke-dasharray="26 16" opacity="${red > 0 ? .9 : 0}"/>${lock}
    ${hallGroup(t, {})}`;
  return cam(scene, lerp(1.5, 1.08, p) + .04 * prog(t, 2, 3.24), lerp(420, 520, p), lerp(800, 1000, p));
}
function sHide(t) { // 3.24 - 5.3 : Lucía hides behind you
  const h = eio(prog(t, 3.5, 4.5)), grip = eout(prog(t, 4.4, 4.8));
  const lx = lerp(800, 470, h), ly = lerp(1890, 1960, h);
  const scene = `${hallDoor(t, { a: 1, taut: 1 })}
    ${toby(700, 1640, .45, { dir: -1, t, ear: .2, wag: 10 * Math.sin(t * 6) })}
    ${personBack(600, 1900, 1.0, { breath: .5, turn: -.35 * h, reach: 0 })}
    ${luciaB(lx, ly - 18 * Math.sin(h * Math.PI), lerp(.9, .98, h), { turn: .5 * h, armL: 20 * grip, armR: 60 * grip })}`;
  return cam(scene, lerp(1.0, 1.06, prog(t, 3.24, 5.3)), 560, lerp(1240, 1300, h));
}
function sWag(t) { // 5.3 - 7.0 : …but Toby wags his tail at the gap
  const fast = eout(prog(t, 5.7, 5.95));
  const wag = lerp(8, 42, fast) * Math.sin(t * lerp(6, 22, fast));
  let lines = '';
  if (fast > 0) for (let i = 0; i < 3; i++) lines += `<path d="M ${170 - i * 26} ${1060 + i * 46} q -30 -20 -50 6" stroke="${P.gold}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${.8 * fast * (.6 + .4 * Math.sin(t * 20 + i))}"/>`;
  const scene = `<rect width="1080" height="1920" fill="${R.hallW}"/><rect y="1360" width="1080" height="560" fill="${R.hallFl}"/><rect y="1350" width="1080" height="16" fill="#8a909b"/>
    <rect x="700" y="0" width="80" height="1360" fill="${Q.frame}"/><rect x="780" y="0" width="120" height="1360" fill="#07090e"/>
    <rect x="900" y="0" width="300" height="1360" fill="${Q.door}"/><path d="M 790 640 Q 840 646 890 642" stroke="${P.chain}" stroke-width="10" fill="none" stroke-dasharray="16 6"/>
    ${lines}${toby(420, 1420, 1.55, { dir: 1, t, wag, ear: .15, headRot: -6 + 4 * Math.sin(t * 4), jaw: .2 * fast })}`;
  return cam(scene, lerp(1.0, 1.08, prog(t, 5.3, 7.0)), 520, 1000);
}
function sLight(t) { // 7.0 - 8.4 : torch light falls through the gap
  const beam = eout(prog(t, 7.75, 8.15)) + .25 * prog(t, 7.0, 7.75) * (.5 + .5 * Math.sin(t * 13));
  const bx = 540 + 60 * Math.sin((t - 7.8) * 2.4);
  return cam(chainClose(t, { beam, bx, vib: 2 * Math.sin(t * 3) }), lerp(1.06, 1.18, eio(prog(t, 7.0, 8.4))), 540, lerp(900, 1000, prog(t, 7, 8.4)));
}
function sLightWide(t) { // 8.4 - 9.74 : the light spills onto your feet
  const sw = Math.sin((t - 8.4) * 2.2);
  const scene = `${hallDoor(t, { a: 1, taut: 1 })}
    <polygon points="346,1300 416,1300 ${720 + 160 * sw},1920 ${120 + 120 * sw},1920" fill="${P.torch}" opacity=".32"/>
    <polygon points="352,600 410,600 410,1290 352,1290" fill="${P.torch}" opacity=".5"/>
    ${hallGroup(t, { lx: 690, ly: 1980, ls: .9, lturn: .4, larm: 30, wag: 30 * Math.sin(t * 18), ear: .1, tx: 560, ty: 1660 })}`;
  return cam(scene, lerp(1.12, 1.0, eio(prog(t, 8.4, 9.74))), 520, 1020);
}
function sVoice(t) { // 9.74 - 11.38 : you hear Ernesto — his face in the gap
  const rev = eout(prog(t, 10.2, 10.7));
  const inner = `<clipPath id="v23gap2"><rect x="410" y="0" width="260" height="1920"/></clipPath><g clip-path="url(#v23gap2)">
    <ellipse cx="540" cy="880" rx="260" ry="520" fill="${P.torch}" opacity="${.18 + .12 * rev}" filter="url(#blur40)"/>
    <g opacity="${.25 + .75 * rev}">${ernesto(lerp(640, 560, rev), 1560, 1.3, { look: -14, beam: 1, aR1: -6, aR2: -20, talk: t > 10.3 && t < 10.9 ? .5 + .5 * Math.sin(t * 22) : 0 })}</g></g>`;
  const p = back(prog(t, 10.42, 10.66));
  return cam(chainClose(t, { inner, vib: 1.5 * Math.sin(t * 4) }), lerp(1.08, 1.22, eio(prog(t, 9.74, 11.38))), 540, 900)
    + speech(700, 700, t, 10.0, 11.0, E.blue, 1)
    + (p > 0 ? `<g transform="translate(540 300) scale(${p}) translate(-540 -300)">${pill(540, 300, 'ERNESTO', 58, E.blue, '#fff')}</g>` : '');
}
function sSaw(t) { // 11.38 - 13.3 : earlier: he saw the open door (hallway, door ajar, no chain)
  const w = eio(prog(t, 11.4, 12.5)), look = eout(prog(t, 12.3, 12.6));
  const hi = back(prog(t, 11.8, 12.05));
  const scene = `${hallDoor(t, { a: 1.4, noChain: true })}
    <rect x="330" y="470" width="420" height="830" fill="none" stroke="${P.gold}" stroke-width="10" stroke-dasharray="26 16" opacity="${hi > 0 ? .9 : 0}"/>
    ${ernesto(lerp(1100, 820, w), 1560 - 10 * Math.abs(Math.sin(w * Math.PI * 3)), .62, { look: -14 * look, beam: 1, aR1: -30 * look, aR2: -40 })}`;
  return cam(scene, lerp(1.0, 1.1, prog(t, 11.38, 13.3)), 560, 1000)
    + `<rect width="1080" height="1920" fill="#d9c7a0" opacity=".12"/>`;
}
function sGuard(t) { // 13.3 - 15.3 : he stayed inside to guard — and hooked the chain
  const reach = eio(prog(t, 14.0, 14.55)), back2 = eio(prog(t, 14.85, 15.25));
  const hooked = t >= 14.62;
  const [sx, sy] = shk(t, 14.62, 5, 10);
  const loc = back(prog(t, 13.25, 13.5));
  // ernesto at (860,1300) s .7: local reach to the frame end of the chain (692, 650)
  const s = .8, ex = 850, ey = 1260;
  const tgt = [(lerp(760, 692, reach) - ex) / s, (lerp(980, 650, reach) - ey) / s];
  const e = ernesto(ex, ey, s, { look: -14, beam: .6, aR1: -10, aR2: -30, reachL: reach * (1 - back2) > .02 ? tgt : null, bendL: 1, aL1: 8 });
  const scene = `${doorWall(t, { chain: hooked ? 'hook' : 'loose' })}${messState(t, 1)}${e}`;
  return cam(`<g transform="translate(${sx} ${sy})">${scene}</g>`, lerp(1.25, 1.4, eio(prog(t, 13.3, 15.3))), 640, 880)
    + (loc > 0 ? `<g transform="translate(870 300) scale(${loc})"><path d="M 0 60 C -50 0 -50 -50 0 -50 C 50 -50 50 0 0 60 Z" fill="${E.blue}"/><circle cy="-10" r="18" fill="#fff"/></g>` : '');
}
function sUnhook(t) { // 15.3 - 16.3 : close: his hand takes the chain off the hook, it drops
  const reach = eout(prog(t, 15.3, 15.5)), slide = eio(prog(t, 15.5, 15.68));
  const drop = t >= 15.7;
  const kx = lerp(692, 664, slide), ky = 650;
  const s = .62, ex = 770, ey = 1110;
  const hand = drop ? [lerp(664, 700, eout(prog(t, 15.75, 16.2))), lerp(650, 700, eout(prog(t, 15.75, 16.2)))] : [lerp(740, kx, reach), lerp(760, ky + 6, reach)];
  const tgt = [(hand[0] - ex) / s, (hand[1] - ey) / s];
  const sw = drop ? 30 * Math.exp(-(t - 15.7) * 3) * Math.sin((t - 15.7) * 9) : 0;
  const chain = drop ? `<path d="M 648 646 Q ${640 + sw * .4} 720 ${648 + sw} 790" stroke="${P.chain}" stroke-width="6" fill="none" stroke-dasharray="8 4"/><circle cx="${648 + sw}" cy="792" r="7" fill="${P.metal}"/>`
    : `<path d="M 648 646 Q ${(648 + kx) / 2} 690 ${kx} ${ky}" stroke="${P.chain}" stroke-width="6" fill="none" stroke-dasharray="8 4"/><circle cx="${kx}" cy="${ky}" r="7" fill="${P.metal}"/>`;
  const wall = doorWall(t, { chain: 'none' }).replace(/<path d="M \d+(\.\d+)? 646[^>]*>/, '');
  const scene = `${wall}${chain}${ernesto(ex, ey, s, { turn: 1, noTorch: true, aR1: -8, aR2: 0, reachL: tgt, bendL: 1 })}`;
  return cam(scene, 2.5, 668, 700);
}
function sEnter(t) { // 16.3 - 17.74 : the door swings open, he lets you in
  const a = lerp(1, 4.6, eout(prog(t, 16.3, 16.8)));
  const g = 70 * a, step = eio(prog(t, 16.6, 17.1));
  const go = eio(prog(t, 16.9, 17.74));
  const inside = `<clipPath id="v23op"><rect x="346" y="486" width="${g}" height="814"/></clipPath><g clip-path="url(#v23op)">
    <rect x="346" y="486" width="${g}" height="814" fill="${P.wallSh}"/><rect x="346" y="1150" width="${g}" height="150" fill="${P.floor}"/>
    ${ernesto(lerp(520, 470, step), 1290, .62, { look: 10, beam: .5, aL1: lerp(10, 50, step), aL2: lerp(0, 30, step), palm: step > .4 })}</g>`;
  const scene = `${hallDoor(t, { a, noChain: true })}${inside}
    ${toby(lerp(600, 520, go), lerp(1720, 1420, go), lerp(.5, .38, go), { dir: -1, t: t * 1.6, ear: .2, wag: 30 * Math.sin(t * 14) })}
    ${luciaB(lerp(790, 650, go), lerp(1900, 1700, go) - 10 * Math.abs(Math.sin(go * 9)), lerp(.85, .7, go), { turn: -.2 })}
    ${personBack(lerp(270, 420, go), lerp(2060, 1880, go) - 12 * Math.abs(Math.sin(go * 9)), lerp(1.05, .9, go), { breath: .3 })}`;
  return cam(scene, lerp(1.0, 1.06, prog(t, 16.3, 17.74)), 540, 1000);
}
function grid12(t, o = {}) { // 4 x 3 cans on a light card; bad = indices 6, 11
  let s = card(540, 860, 900, 800, '');
  let n = 0;
  for (let i = 0; i < 12; i++) {
    const t0 = 18.1 + i * .13, p = back(prog(t, t0, t0 + .2));
    if (p <= 0) continue;
    n++;
    const c = i % 4, r = Math.floor(i / 4), x = 255 + c * 190, y = 690 + r * 230;
    const bad = i === 6 || i === 11, bul = bad ? (o.bul || 0) : 0;
    const wob = bad && bul > 0 ? 3 * Math.sin(t * 9 + i) * bul : 0;
    s += `<g transform="translate(${x} ${y}) rotate(${wob}) scale(${p}) translate(${-x} ${-y})">${canB(x, y, 1.05, CANC[(i * 3) % 4], bul)}</g>`;
    if (bad && o.x) s += `<circle cx="${x}" cy="${y - 70}" r="${86 * o.x}" fill="none" stroke="${P.red}" stroke-width="10"/>` + xMark(x + 62, y - 150, .7, o.x);
  }
  return [s, n];
}
function sBag(t) { // 17.74 - 18.4 : the bag lands on the table
  const land = 17.98, dropP = eio(prog(t, 17.74, land)), sq = ring(t, land, 4, 9);
  const s = 1.6, ex = 250, ey = 2000;
  const by = lerp(1060, 1160, dropP), hx = 560, hy = by - 350 + (t > land ? 30 * eout(prog(t, land + .1, 18.4)) : 0);
  const scene = `${tableSet(t)}${canB(800, 1160, .9, CANC[0])}
    ${bag(560, by, 1.1, t > land ? Math.abs(sq) : 0)}
    ${ernesto(ex, ey, s, { turn: 1, flip: 1, noTorch: true, reachL: [(hx - ex) / s, (hy - ey) / s], bendL: -1, aR1: 4 })}`;
  const [sx, sy] = shk(t, land, 8, 9);
  return cam(`<g transform="translate(${sx} ${sy})">${scene}</g>`, 1.05, 540, 1000);
}
function sCans(t) { // 18.4 - 22.1 : twelve cans; two lids bulge
  const bul = eout(prog(t, 20.9, 21.5)), x = back(prog(t, 21.5, 21.75));
  const [g, n] = grid12(t, { bul, x });
  const cnt = n > 0 ? pop(t, 18.1, 540, 360, pill(540, 360, String(n), 64, P.ink, P.gold), .2) : '';
  const z = lerp(1.0, 1.06, prog(t, 18.4, 22.1));
  return cam(`${bgPaper()}${g}`, z, 540, 900) + cnt;
}
function sAside(t) { // 22.1 - 24.4 : the two bulging cans are pushed aside, unopened
  const mv = eio(prog(t, 22.3, 23.0));
  const top = 1180;
  let ten = '';
  for (let i = 0; i < 10; i++) { const r = i < 5 ? 0 : 1; ten += canB(560 + (i % 5) * 76 + (r ? 38 : 0), top - 40 + r * 26, .62, CANC[i % 4]); }
  const b1x = lerp(470, 175, mv), b2x = lerp(540, 255, mv);
  const box = `<rect x="70" y="${top - 150}" width="270" height="150" rx="10" fill="#b39d72"/><rect x="70" y="${top - 150}" width="270" height="26" fill="#9a8560"/>`;
  const no = back(prog(t, 23.3, 23.55));
  const sxp = 296, syp = 1734;
  const hx = mv < 1 ? lerp(600, 320, mv) : lerp(280, 360, eio(prog(t, 23.1, 23.6))), hy = mv < 1 ? top - 70 : lerp(top - 70, top + 150, eio(prog(t, 23.1, 23.6)));
  const scene = `${tableSet(t)}${ten}
    ${box}${canB(b1x, top - 30, .62, CANC[2], 1)}${canB(b2x, top - 30, .62, CANC[1], 1)}<rect x="70" y="${top - 70}" width="270" height="70" rx="6" fill="#c9b48a"/>
    ${personBack(60, 2760, 1.9, { breath: .3, turn: .25 })}
    ${armIK(sxp, syp, hx, hy, 340, 340, 1, 84, P.shirtSh, P.skin)}`;
  return cam(scene, lerp(1.05, 1.12, prog(t, 22.1, 24.4)), 480, 1040)
    + (no > 0 ? `<g transform="translate(215 760) scale(${no})"><circle r="92" fill="${P.ink}"/>${canB(0, 50, .6, '#8d939c')}<path d="M -20 -60 l 40 16 l -40 16" stroke="#cfd4dc" stroke-width="10" fill="none"/>
      <path d="M -62 -62 L 62 62" stroke="${P.red}" stroke-width="15" stroke-linecap="round"/><circle r="92" fill="none" stroke="${P.red}" stroke-width="12"/></g>` : '');
}
function roomBg(t, k = 0) { // inside the flat: door wall (furniture still shifted as in Part 3)
  return `${doorWall(t, { chain: 'hook' })}${messState(t, 1)}`;
}
function sLook(t) { // 24.4 - 26.4 : Ernesto turns to Lucía
  const turn = eout(prog(t, 24.75, 25.1)), z = lerp(1.0, 1.1, eio(prog(t, 24.4, 26.4)));
  const scene = `${roomBg(t)}<rect x="-400" y="1240" width="1880" height="900" fill="#000" opacity=".05"/>
    ${ernesto(330, 1400, .8, { look: 14 * turn, headTilt: 4 * turn, beam: 0, aR1: -6, aR2: -10 })}
    ${luciaF(800, 1400, .78, { pose: 'stand', look: -10, mouth: 'flat', blink: t > 25.6 && t < 25.7 ? 1 : 0 })}
    ${tobySit(640, 1410, .45, { dir: 1, wag: 8 * Math.sin(t * 5), ear: .3, headRot: -6 })}`;
  return cam(scene, z, 560, 1000);
}
function sAsk(t) { // 26.4 - 28.72 : he asks quietly whether she was bitten
  const talk = t > 26.5 && t < 28.2 ? .3 + .25 * Math.sin(t * 18) : 0;
  const q = back(prog(t, 27.5, 27.75));
  const scene = `${roomBg(t)}${ernesto(380, 1700, 1.1, { look: 16, headTilt: 5, nod: 6 * Math.sin(t * 2.2), talk, beam: 0, aR1: -4, aR2: -12, aL1: 18, aL2: 26, palm: true })}
    ${luciaB(860, 2000, 1.15, { turn: -.4 })}`;
  return cam(scene, lerp(1.25, 1.35, prog(t, 26.4, 28.72)), 560, 900)
    + (q > 0 ? `<g transform="translate(620 360) scale(${q})"><path d="${scallop(0, 0, 120, 90, 9)}" fill="#fbf8f0" opacity=".92"/>${T('?', 0, 32, 96, P.ink)}</g>
      <circle cx="560" cy="490" r="${14 * q}" fill="#fbf8f0" opacity=".92"/><circle cx="530" cy="530" r="${9 * q}" fill="#fbf8f0" opacity=".92"/>` : '');
}
function sShow(t) { // 28.72 - 30.45 : she holds out her arms and legs herself
  const arm = back(prog(t, 28.9, 29.3)), leg = eout(prog(t, 29.8, 30.05));
  const c1 = back(prog(t, 29.42, 29.62)), c2 = back(prog(t, 29.94, 30.14));
  const kid = luciaF(560, 1400, 1.05, { pose: 'stand', look: 0, lookY: 4, mouth: 'flat', bare: 1, shins: leg, aL: lerp(8, 72, cl(arm, 0, 1.1)), aR: lerp(-8, -72, cl(arm, 0, 1.1)), bL: -6 * arm, bR: 6 * arm });
  const scene = `${roomBg(t)}${ernesto(200, 1330, .55, { look: 12, beam: 0, aR1: -6, aR2: -10 })}${kid}
    ${check(330, 960, c1 * .7)}${check(790, 960, c1 * .7)}${check(680, 1300, c2 * .7)}`;
  return cam(scene, lerp(1.15, 1.22, prog(t, 28.72, 30.45)), 560, 1040);
}
function sClear(t) { // 30.45 - 31.66 : no scratch
  const r1 = back(prog(t, 30.5, 30.7)), r2 = back(prog(t, 30.62, 30.82));
  const big = t > 30.9 ? slam(t, 30.9, 540, 1180, check(540, 1180, 1.7)) : '';
  const row = (y, lbl, p) => p <= 0 ? '' : `<g transform="translate(0 ${30 * (1 - p)})" opacity="${cl(p)}">${check(330, y, .6)}${T(lbl, 400, y + 22, 60, P.ink, { a: 'start' })}</g>`;
  return `${bgPaper()}${card(540, 900, 760, 720, `<rect x="160" y="540" width="760" height="110" rx="26" fill="${P.green}"/><rect x="160" y="610" width="760" height="40" fill="${P.green}"/>
    ${icoPerson(540, 650, 1.35, '#fff')}${row(780, 'ARME', r1)}${row(920, 'BEINE', r2)}`)}${big}`;
}
function phoneScr(t, o = {}) { // lock screen of your phone
  const low = o.low || 0, warn = o.warn || 0;
  return `<rect x="-142" y="-286" width="284" height="572" fill="${o.night ? '#1a2232' : '#dfe6ef'}"/>
    ${T(o.clock || '12:10', 0, -120, 76, o.night ? P.white : P.ink)}
    ${battIco(86, -252, .26, .28, low > 0 && Math.floor(t * 4) % 2 ? P.red : '#e08a3c', o.night ? P.white : P.ink)}
    ${warn > 0 ? `<g transform="translate(0 70) scale(${warn})">${warnTri(0, 0, 1.2)}</g>` : ''}`;
}
function sPhone(t) { // 31.66 - 34.68 : the next problem waits on your phone
  const up = eout(prog(t, 31.7, 32.3)), warn = back(prog(t, 33.56, 33.8));
  const px = 650, py = lerp(1280, 820, up);
  const ph = phoneP(px, py, .95, { t, scr: phoneScr(t, { low: warn, warn }), id: 'v23p1', rot: -4 });
  const scene = `<rect width="1080" height="1920" fill="${P.wallSh}"/><rect x="-100" y="300" width="560" height="700" fill="${P.wall}" opacity=".5" filter="url(#blur20)"/>
    ${personBack(260, 2900, 2.4, { breath: .3, turn: .2 })}${ph}
    ${armIK(560, 1620, px - 60, py + 260, 280, 260, -1, 90, P.shirtSh, P.skin)}`;
  return cam(scene, lerp(1.0, 1.08, eio(prog(t, 32.3, 34.68))), 600, 900);
}
function sBatt(t) { // 34.68 - 36.58 : 28 percent
  const p = t > 34.68 ? slam(t, 34.68, 540, 760, battIco(540, 760, 2.6, .28, Math.floor(t * 3) % 2 ? P.red : '#e08a3c')) : '';
  const n = t > 35.0 ? slam(t, 35.0, 540, 1130, T('28%', 540, 1190, 190, P.white, { st: P.ink, sw: 14 })) : '';
  const [sx, sy] = shk(t, 34.7, 10, 8);
  return `<rect width="1080" height="1920" fill="${P.navy}"/><ellipse cx="540" cy="860" rx="520" ry="560" fill="${P.red}" opacity="${.08 + .04 * Math.sin(t * 6)}" filter="url(#blur40)"/>
    <g transform="translate(${sx} ${sy})">${p}${n}</g>`;
}
function sLink(t) { // 36.58 - 39.38 : your link to the warnings outside
  const line = eio(prog(t, 37.0, 37.7)), pr = (t * 1.2) % 1;
  let alerts = '';
  for (let i = 0; i < 3; i++) {
    const q = prog(t, 37.95 + i * .32, 38.75 + i * .32);
    if (q <= 0 || q >= 1) continue;
    alerts += warnTri(lerp(760, 540, q), lerp(560, 980, q), .45);
  }
  const tw = 1 + .1 * Math.sin(prog(t, 38.8, 39.1) * Math.PI);
  const ph = phoneP(540, 1150, .55, { t, scr: phoneScr(t, { low: 1 }), id: 'v23p2' });
  return `${tableSet(t, { top: 1340 })}
    <g transform="translate(750 520) scale(${tw})"><rect x="-8" y="-40" width="16" height="140" fill="#5c626b"/><path d="M -40 100 L 0 -40 L 40 100" stroke="#5c626b" stroke-width="10" fill="none"/>
      <circle cy="-50" r="16" fill="${P.red}"/>${t > 37 ? `<circle cy="-50" r="${30 + pr * 60}" fill="none" stroke="${P.red}" stroke-width="6" opacity="${1 - pr}"/>` : ''}</g>
    ${ph}
    ${line > 0 ? `<path d="M 540 990 Q 640 760 ${lerp(540, 750, line)} ${lerp(990, 500, line)}" stroke="${P.gold}" stroke-width="9" fill="none" stroke-dasharray="16 12" stroke-dashoffset="${-t * 60}" opacity="${.6 + .4 * Math.sin(t * 9)}"/>` : ''}
    ${alerts}`;
}
function sCarMap(t) { // 39.38 - 42.16 : Ernesto's car in the underground garage
  const carP = back(prog(t, 40.3, 40.6)), dn = eio(prog(t, 39.9, 40.9)), out = eio(prog(t, 41.3, 42.1));
  const hi = eout(prog(t, 40.94, 41.2));
  const m = mapG(t, { ern: 1, car: carP, garHi: hi });
  const fy = lerp(lerp(gMY(12) + 60, gMY(0), dn), 900, out), z = lerp(1.7, 1.15, out);
  return cam(m, z, lerp(560, 540, out), fy);
}
function sIdea(t) { // 42.16 - 43.9 : its battery could help
  const b = back(prog(t, 42.4, 42.65)), arr = eio(prog(t, 42.7, 43.3)), ph = back(prog(t, 43.05, 43.3));
  const bolt = `<path d="M 10 -60 L -30 6 L 0 6 L -10 60 L 30 -6 L 0 -6 Z" fill="${P.gold}"/>`;
  return `${bgPaper()}${card(540, 860, 900, 640, '')}
    ${b > 0 ? `<g transform="translate(290 900) scale(${b})">${carBattery(0, 0, 1.2)}</g>` : ''}
    ${arr > 0 ? `<path d="M 430 860 L ${lerp(430, 660, arr)} 860" stroke="${P.gold}" stroke-width="14" stroke-dasharray="22 14" stroke-linecap="round"/>` : ''}
    ${ph > 0 ? `<g transform="translate(800 880) scale(${ph})">${phoneP(0, 0, .5, { t, scr: phoneScr(t, {}), id: 'v23p3' })}<g transform="translate(0 40) scale(1.2)">${bolt}</g></g>` : ''}`;
}
function garageInt(t, o = {}) { // underground garage interior (dim), Ernesto's car parked, engine OFF
  let s = `<rect x="-600" y="-600" width="2280" height="3200" fill="${E.gar}"/><rect x="-600" y="-600" width="2280" height="900" fill="${E.garSh}"/>
    <rect x="-600" y="1250" width="2280" height="1200" fill="${E.conc}"/>`;
  for (let i = -3; i < 8; i++) s += `<rect x="${i * 260}" y="300" width="70" height="950" fill="#33373f"/>`;
  for (let i = -3; i < 8; i++) s += `<line x1="${i * 260 + 160}" y1="1260" x2="${i * 340 - 200}" y2="2400" stroke="#e6e0cc" stroke-width="8" opacity=".5"/>`;
  for (let i = 0; i < 4; i++) s += `<rect x="${60 + i * 300}" y="320" width="140" height="16" rx="8" fill="#f2f0e4" opacity="${.35 + .2 * (i % 2)}"/>`;
  s += carSide(540, 1330, 1.25, {}) + carSide(-300, 1330, 1.1, { col: '#4a4e57', sh: '#3a3d45' }) + carSide(1360, 1330, 1.1, { col: '#5a4e48', sh: '#463c37' });
  if (o.ring) s += `<rect x="-600" y="-600" width="2280" height="3200" fill="none" stroke="${P.red}" stroke-width="${40 * o.ring}" opacity="${.6 * o.ring}"/>`;
  return s;
}
function sMotor(t) { // 43.9 - 46.1 : the engine must stay off there
  const off = back(prog(t, 44.1, 44.4)), lab = t > 44.98 ? slam(t, 44.98, 540, 860, pill(540, 860, 'MOTOR AUS', 62, P.red, '#fff')) : '';
  return cam(garageInt(t), lerp(1.0, 1.12, eio(prog(t, 43.9, 46.1))), 540, 1080) + engineOff(540, 640, 1.2, off) + lab;
}
function sGas(t) { // 46.1 - 49.96 : exhaust in a closed garage = another danger (no visible smoke)
  const box = eout(prog(t, 47.2, 47.7)), tri = t > 49.3 ? slam(t, 49.3, 540, 520, warnTri(540, 520, 2.2)) : '';
  const pipe = back(prog(t, 46.2, 46.5));
  const pr = (t * 1.3) % 1;
  let walls = '';
  if (box > 0) walls = `<rect x="80" y="${lerp(1100, 360, box)}" width="920" height="${lerp(10, 1020, box)}" rx="20" fill="none" stroke="${P.red}" stroke-width="12" stroke-dasharray="30 16"/>
    <rect x="80" y="360" width="920" height="40" fill="${P.red}" opacity="${.25 * box}"/>`;
  const lab = pill(800, 690, 'MOTOR AUS', 38, P.red, '#fff', { op: .95 });
  return `${cam(garageInt(t), 1.25, 520, 1120)}
    ${pipe > 0 ? `<g transform="translate(${540 - 330} ${1100}) scale(${pipe})"><circle r="${60 + pr * 30}" fill="none" stroke="${P.red}" stroke-width="8" opacity="${1 - pr}"/><circle r="56" fill="none" stroke="${P.red}" stroke-width="10"/></g>` : ''}
    ${walls}${engineOff(800, 560, .7, 1)}${lab}${tri}`;
}
function sStairs(t) { // 49.96 - 54.24 : on your plan the stairs run from 12 all the way down
  const d = eio(prog(t, 51.2, 53.6)), hi = eout(prog(t, 53.42, 53.7));
  const m = mapG(t, { ern: .9, car: 1, garHi: hi }) + pathG(12, 0, d, P.green, 10);
  const [dx, dy] = stairG(lerp(12, 0, d));
  const dot = d > 0 ? `<circle cx="${dx}" cy="${dy}" r="16" fill="${P.green}"/><circle cx="${dx}" cy="${dy}" r="30" fill="none" stroke="${P.green}" stroke-width="4" opacity=".6"/>` : '';
  const intro = eout(prog(t, 49.96, 50.6));
  const z = lerp(1.3, 1.0, intro), fy = lerp(gMY(12), 880, intro);
  return cam(m + dot, z, lerp(400, 540, intro), fy);
}
function sSilence(t) { // 54.24 - 56.4 : you listen to the silence and wait (clock runs on to the evening)
  const perk = eout(prog(t, 54.45, 54.7)), run = eio(prog(t, 55.2, 56.4));
  const mins = lerp(10, 9 * 60 + 40, run), hh = 12 + Math.floor(mins / 60), mm = mins % 60;
  const dim = .55 * run;
  const scene = `${roomBg(t)}${wallClock(150, 600, 80, hh, mm)}
    ${ernesto(140, 1420, .5, { look: 10, beam: run, aR1: -6, aR2: -10 })}
    ${luciaF(780, 1480, .62, { pose: 'sit', look: -6, lookY: -4, mouth: 'flat', blink: t > 55.5 && t < 55.6 ? 1 : 0 })}
    ${tobySit(620, 1500, .42, { dir: 1, ear: perk, headRot: -14 * perk, wag: 0 })}
    ${personSit(380, 1880, .95, { breath: .3 + .2 * Math.sin(t * 2), turn: .15 })}
    ${nightOv(dim)}${torchGlow(160, 1500, 260, 220, run)}`;
  return cam(scene, lerp(1.0, 1.05, prog(t, 54.24, 56.4)), 520, 1020);
}
function sEvening(t) { // 56.4 - 58.6 : evening — the building at night, 21:40
  const z = lerp(1.0, 1.25, eio(prog(t, 56.4, 58.6)));
  let b = skyline(t, 1);
  b += `<rect x="330" y="300" width="420" height="1500" fill="#1c2232"/><rect x="320" y="290" width="440" height="20" fill="#2a3142"/>`;
  for (let k = 0; k < 12; k++) for (let c = 0; c < 4; c++) {
    const lit = k === 0 && c === 1;
    b += `<rect x="${360 + c * 98}" y="${330 + k * 100}" width="64" height="56" fill="${lit ? '#e8c46a' : '#121726'}" opacity="${lit ? .55 + .2 * Math.sin(t * 5) : 1}"/>`;
  }
  b += `<circle cx="820" cy="260" r="40" fill="#c9d3ea" opacity=".85"/>`;
  return cam(b, z, 520, lerp(800, 420, eio(prog(t, 56.4, 58.6))));
}
function phoneNight(t, o = {}) { // screen at night, alert when lit
  const lit = o.lit || 0;
  return `<rect x="-142" y="-286" width="284" height="572" fill="#10141f"/>
    <g opacity="${lit}"><rect x="-142" y="-286" width="284" height="572" fill="#e9eef5"/>${T('21:40', 0, -190, 50, P.ink)}
    <rect x="-118" y="-140" width="236" height="230" rx="20" fill="#fff"/><rect x="-118" y="-140" width="236" height="56" rx="20" fill="${P.red}"/><rect x="-118" y="-104" width="236" height="20" fill="${P.red}"/>
    ${warnTri(-84, -112, .22, '#fff')}<rect x="-58" y="-122" width="130" height="14" rx="7" fill="#fff" opacity=".8"/>
    <rect x="-96" y="-56" width="192" height="14" rx="7" fill="#c9ced5"/><rect x="-96" y="-28" width="150" height="14" rx="7" fill="#c9ced5"/>
    ${battIco(86, -252, .26, .28, '#e08a3c', P.ink)}</g>`;
}
function sBuzz(t) { // 58.6 - 61.22 : both phones vibrate at the same moment (top-down on the table)
  const on = t >= 59.02, bz = on ? cl(1 - (t - 59.02) / 1.6) * (.6 + .4 * Math.abs(Math.sin((t - 59.02) * 6))) : 0;
  const lit = eout(prog(t, 59.02, 59.2));
  let wood = `<rect width="1080" height="1920" fill="#6a4a30"/>`;
  for (let i = 0; i < 14; i++) wood += `<rect x="0" y="${i * 140}" width="1080" height="6" fill="#5a3d26"/>`;
  const vib = (x, y) => on && bz > .05 ? `<path d="M ${x - 200} ${y - 60} l -20 30 l 20 30 l -20 30 M ${x + 200} ${y - 60} l 20 30 l -20 30 l 20 30" stroke="${P.gold}" stroke-width="7" fill="none" opacity="${bz}"/>` : '';
  return `${wood}${torchGlow(540, 860, 520, 520, 1)}${nightOv(.35)}
    ${phoneP(330, 860, .78, { t, buzz: bz, rot: -6, scr: phoneNight(t, { lit }), id: 'v23p4' })}${vib(330, 860)}
    ${phoneP(760, 900, .7, { t: t + .3, buzz: bz, rot: 8, scr: phoneNight(t, { lit }), id: 'v23p5' })}${vib(760, 900)}`;
}
function sAlert(t) { // 61.22 - 65.3 : new message: rescue point at the stadium, tomorrow 08:00
  const slide = eout(prog(t, 61.5, 61.9)), st = back(prog(t, 63.2, 63.45)), mg = back(prog(t, 64.05, 64.3)), eight = back(prog(t, 64.9, 65.12));
  const scr = `<rect x="-142" y="-286" width="284" height="572" fill="#10141f"/>${T('21:40', 0, -200, 44, P.white)}
    <g transform="translate(0 ${lerp(-460, 0, slide)})"><rect x="-128" y="-150" width="256" height="400" rx="22" fill="#f6f4ee"/><rect x="-128" y="-150" width="256" height="64" rx="22" fill="${P.red}"/><rect x="-128" y="-110" width="256" height="24" fill="${P.red}"/>
      ${warnTri(0, -118, .26, '#fff')}
      ${st > 0 ? `<g transform="translate(0 -20) scale(${st})">${stadium(0, 0, .5, '#8d939c')}</g>${T('STADION', 0, 70, 40, P.ink, { op: cl(st) })}` : ''}
      ${mg > 0 ? `<g transform="translate(0 140) scale(${mg})"><rect x="-112" y="-42" width="224" height="84" rx="16" fill="${P.gold}"/>${T('MORGEN', 0, -6, 30, P.ink)}${T('08:00', 0, 30, 34, P.ink, { op: eight > 0 ? 1 : .25 })}</g>` : ''}
    </g>`;
  const sunP = back(prog(t, 64.3, 64.6));
  return `<rect width="1080" height="1920" fill="${P.navy}"/><ellipse cx="540" cy="860" rx="520" ry="600" fill="${P.red}" opacity=".07" filter="url(#blur40)"/>
    ${phoneP(540, 880, 1.25, { t, scr, id: 'v23p6', buzz: t < 61.6 ? .4 : 0 })}
    ${sunP > 0 ? `<g transform="translate(860 380) scale(${sunP})"><rect x="-90" y="10" width="180" height="10" rx="5" fill="${P.gold}"/>${sun(0, 0, .8)}</g>` : ''}`;
}
function sGoal(t) { // 65.3 - 68.16 : a goal, but no safe way
  const pin = back(prog(t, 65.95, 66.25)), routes = [[66.7, -1], [66.9, 0], [67.1, 1]];
  let s = `<rect x="-200" y="-200" width="1480" height="2400" fill="${P.navy}"/>`;
  for (let i = 0; i < 9; i++) s += `<rect x="${-60 + i * 140}" y="200" width="18" height="1240" fill="#1d2536"/><rect x="0" y="${220 + i * 140}" width="1080" height="18" fill="#1d2536"/>`;
  s += `<g transform="translate(220 1220)"><rect x="-60" y="-260" width="120" height="260" fill="${P.navy2}" stroke="${P.gridHi}" stroke-width="5"/>${Array.from({ length: 6 }, (_, k) => `<line x1="-60" y1="${-k * 42}" x2="60" y2="${-k * 42}" stroke="${P.grid}" stroke-width="3"/>`).join('')}
    <circle cx="0" cy="-238" r="12" fill="${P.green}"/></g>`;
  s += stadium(800, 470, .9);
  if (pin > 0) s += `<g transform="translate(800 330) scale(${pin})"><path d="M 0 60 C -50 0 -50 -50 0 -50 C 50 -50 50 0 0 60 Z" fill="${P.gold}"/><circle cy="-10" r="18" fill="${P.navy}"/></g>`;
  routes.forEach(([t0, k], i) => {
    const d = eio(prog(t, t0 - .5, t0)), stop = [[420, 760], [600, 980], [520, 1160]][i];
    if (d <= 0) return;
    const ex = lerp(290, stop[0], d), ey = lerp(1000, stop[1], d);
    s += `<path d="M 290 1000 Q ${(290 + ex) / 2 + 60 * k} ${(1000 + ey) / 2 - 80} ${ex} ${ey}" stroke="${P.white}" stroke-width="8" fill="none" stroke-dasharray="14 12" opacity=".7"/>`;
    if (d >= 1) { const q = ((t - t0) * 1.5) % 1; s += `<circle cx="${ex}" cy="${ey}" r="${16 + q * 34}" fill="none" stroke="${P.red}" stroke-width="5" opacity="${1 - q}"/><circle cx="${ex}" cy="${ey}" r="16" fill="${P.red}"/>`; }
  });
  const qm = back(prog(t, 67.55, 67.8));
  return cam(s, lerp(1.05, 1.0, prog(t, 65.3, 68.16)), 540, 860)
    + (qm > 0 ? `<g transform="translate(560 1000) scale(${qm}) translate(-560 -1000)">${T('?', 560, 1060, 200, P.white, { st: P.red, sw: 14 })}</g>` : '');
}
function sKey(t) { // 68.16 - 70.9 : Ernesto puts the car key on the table (key touches the table, hand withdraws)
  const top = 1180, s = 1.5, ex = 190, ey = 2260;
  const down = eio(prog(t, 68.6, 70.0)), back2 = eio(prog(t, 70.2, 70.85));
  const kx = 600, ky = lerp(1050, top - 62, down);
  const hand = [lerp(kx - 24, 430, back2), lerp(ky - 30, 1330, back2)];
  const tgt = [(hand[0] - ex) / s, (hand[1] - ey) / s];
  const hit = t >= 70.0 ? ring(t, 70.0, 6, 9) : 0;
  const scene = `${tableSet(t, { night: 1 })}${nightOv(.55)}${torchGlow(620, 1150, 420, 260, 1)}
    ${carKey(kx, ky + 2 * hit, 1.4, 0)}
    ${ernesto(ex, ey, s, { turn: 1, flip: 1, noTorch: true, reachL: tgt, bendL: -1, aR1: 6 })}`;
  return cam(scene, lerp(1.05, 1.15, eio(prog(t, 68.16, 70.9))), 560, 1060);
}
function sHerLook(t) { // 70.9 - 72.2 : Lucía looks at you
  const up = eout(prog(t, 71.25, 71.55));
  const scene = `${roomBg(t)}${nightOv(.6)}${torchGlow(540, 1100, 520, 420, 1)}
    ${luciaF(540, 1960, 2.3, { pose: 'stand', look: lerp(-12, 0, up), lookY: lerp(6, 0, up), headTilt: lerp(8, 0, up), mouth: 'worried', blink: t > 71.9 && t < 72.0 ? 1 : 0 })}`;
  return cam(scene, lerp(1.0, 1.06, prog(t, 70.9, 72.2)), 540, 900);
}
function sListen(t) { // 72.2 - 73.4 : Toby listens towards the door
  const perk = eout(prog(t, 72.3, 72.55)), turn = eio(prog(t, 72.5, 72.9));
  const pr = ((t - 72.6) * 1.1) % 1;
  const scene = `<rect width="1080" height="1920" fill="${P.wall}"/><rect y="1360" width="1080" height="560" fill="${P.floor}"/>
    <rect x="700" y="0" width="80" height="1360" fill="${Q.frame}"/><rect x="780" y="0" width="420" height="1360" fill="${Q.door}"/><rect x="830" y="140" width="300" height="500" rx="10" fill="${Q.doorP}"/>
    <path d="M 800 600 Q 760 640 730 610" stroke="${P.chain}" stroke-width="10" fill="none" stroke-dasharray="16 6"/>
    ${nightOv(.4)}${torchGlow(420, 1150, 460, 380, 1.4)}
    ${toby(420, 1420, 1.55, { dir: 1, t, wag: 0, ear: perk, headRot: -10 * turn })}<rect width="1080" height="1920" fill="${E.night}" opacity=".15"/>
    ${t > 72.6 ? `<circle cx="780" cy="900" r="${40 + pr * 120}" fill="none" stroke="${P.red}" stroke-width="6" stroke-dasharray="12 10" opacity="${.5 * (1 - pr)}"/>` : ''}`;
  return cam(scene, lerp(1.0, 1.08, prog(t, 72.2, 73.4)), 560, 1000);
}
function sDownArrow(t) { // 73.4 - 75.86 : to get out, you first have to go down
  const out = eio(prog(t, 73.5, 74.1)), X = back(prog(t, 74.4, 74.6)), dn = eio(prog(t, 74.8, 75.6));
  let m = mapG(t, { ern: .9, car: 1, garHi: eout(prog(t, 75.4, 75.6)) });
  if (out > 0) m += `<g opacity="${1 - .6 * X}"><path d="M 900 ${gMY(12)} L ${lerp(900, 1040, out)} ${gMY(12)}" stroke="${P.gold}" stroke-width="16" stroke-linecap="round"/></g>`;
  if (X > 0) m += `<g transform="translate(960 ${gMY(12)}) scale(${X})"><circle r="70" fill="${P.ink}"/><path d="M -34 -34 L 34 34 M 34 -34 L -34 34" stroke="${P.red}" stroke-width="16" stroke-linecap="round"/></g>`;
  m += pathG(12, 0, dn, P.green, 14, '1 0');
  if (dn > 0) { const [x, y] = stairG(lerp(12, 0, dn)); m += `<circle cx="${x}" cy="${y}" r="20" fill="${P.green}"/>`; }
  const pr = (t * .9) % 1;
  if (t > 75.2) m += `<circle cx="660" cy="${gMY(0)}" r="${12 + pr * 40}" fill="none" stroke="${P.red}" stroke-width="4" opacity="${.5 * (1 - pr)}"/><circle cx="660" cy="${gMY(0)}" r="9" fill="${P.red}" opacity=".5"/>`;
  return cam(m, lerp(1.0, 1.04, prog(t, 73.4, 75.86)), 560, 900);
}
function sFinal(t) { // 75.86 - 78.8 : would you go into this garage?
  const z = lerp(1.0, 1.35, eio(prog(t, 75.86, 78.6))), q = back(prog(t, 77.4, 77.65)), pr = (t * .7) % 1;
  const dim = eio(prog(t, 78.2, 78.8));
  let st = '';
  for (let k = 0; k < 7; k++) { const w = lerp(1000, 520, k / 7), y = lerp(1900, 1290, k / 7); st += `<rect x="${540 - w / 2}" y="${y - 70}" width="${w}" height="${lerp(110, 60, k / 7)}" fill="${k % 2 ? '#3a3e47' : '#43474f'}"/>`; }
  const scene = `<rect x="-400" y="-400" width="1880" height="2800" fill="#24272e"/>
    <polygon points="-400,-400 330,560 330,1290 -400,2400" fill="#1d2026"/><polygon points="1480,-400 750,560 750,1290 1480,2400" fill="#2a2e36"/>
    <rect x="330" y="560" width="420" height="730" fill="#2f333b"/><rect x="380" y="720" width="320" height="570" fill="#07080c"/>
    <ellipse cx="540" cy="1150" rx="${120 + 20 * Math.sin(t * 2)}" ry="200" fill="${P.red}" opacity="${.12 + .06 * Math.sin(t * 3)}" filter="url(#blur40)"/>
    <rect x="400" y="610" width="280" height="70" rx="10" fill="#d9dde3"/>${T('TIEFGARAGE', 540, 660, 38, P.ink)}
    ${st}<rect x="-400" y="-400" width="1880" height="2800" fill="#000" opacity="${.5 * dim}"/>`;
  return cam(scene, z, 540, 960)
    + (q > 0 ? `<g transform="translate(540 380) scale(${q}) translate(-540 -380)">${T('?', 540, 470, 240, P.white, { st: P.red, sw: 16 })}</g>` : '');
}
// badge: TAG 2 / time (parked top-left; slams to centre when the time jumps to 21:40)
function badge(t) {
  if (t < 1.5) return '';
  const night = t >= 57.34;
  let sc = back(prog(t, 1.5, 1.75)), x = 187, y = 231;
  if (night) { const p = back(prog(t, 57.34, 57.6)), m = eio(prog(t, 58.1, 58.5)); sc = lerp(1.9, 1, m) * p; x = lerp(540, 187, m); y = lerp(760, 231, m); }
  return `<g transform="translate(${x} ${y}) scale(${sc}) translate(-187 -231)">
    <rect x="52" y="156" width="270" height="150" rx="18" fill="#000" opacity=".25" transform="translate(0 8)"/>
    <rect x="52" y="156" width="270" height="150" rx="18" fill="#1c2333"/><rect x="52" y="156" width="14" height="150" rx="7" fill="${P.gold}"/>
    ${T('TAG 2', 194, 222, 52, P.white)}<rect x="106" y="246" width="176" height="50" rx="25" fill="${night ? '#c9d3ea' : P.gold}"/>${T(night ? '21:40' : '12:10', 194, 285, 38, P.ink)}</g>`;
}

const SHOTS = [[0, sLocked], [1.5, sLockedWide], [3.24, sHide], [5.3, sWag], [7.0, sLight], [8.4, sLightWide], [9.74, sVoice], [11.38, sSaw], [13.3, sGuard],
  [15.3, sUnhook], [16.3, sEnter], [17.74, sBag], [18.4, sCans], [22.1, sAside], [24.4, sLook], [26.4, sAsk], [28.72, sShow], [30.45, sClear],
  [31.66, sPhone], [34.68, sBatt], [36.58, sLink], [39.38, sCarMap], [42.16, sIdea], [43.9, sMotor], [46.1, sGas], [49.96, sStairs], [54.24, sSilence],
  [56.4, sEvening], [58.6, sBuzz], [61.22, sAlert], [65.3, sGoal], [68.16, sKey], [70.9, sHerLook], [72.2, sListen], [73.4, sDownArrow], [75.86, sFinal]];
function scene(t) {
  let f = SHOTS[0][1];
  for (const [t0, fn] of SHOTS) if (t >= t0) f = fn;
  return f(t) + badge(t);
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
