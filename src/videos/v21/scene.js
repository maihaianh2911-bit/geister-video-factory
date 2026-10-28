// @ts-nocheck
// AUTO-GENERATED scene for v21. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

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
function smokeCol(cx, base, t, k, night) {
  let s = '';
  for (let i = 0; i < 7; i++) {
    const ph = ((t * .12 + i / 7 + k * .3) % 1);
    const y = base - ph * 760, r = 50 + ph * 70;
    s += `<circle cx="${cx + 30 * Math.sin(ph * 5 + k) + ph * 60}" cy="${y}" r="${r}" fill="${night ? '#262b38' : P.smoke}" opacity="${.5 * (1 - ph) + .1}"/>`;
  }
  return s;
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
function darkRoom(t, o = {}) {
  const strip = o.strip ?? .7, gap = o.gap || 0, dj = o.dj || 0, lamp = o.lamp || 0;
  return `<rect x="-300" y="-300" width="1680" height="2520" fill="#0d1018"/>
    <rect x="-300" y="1240" width="1680" height="1000" fill="#151218"/>
    ${lamp > 0 ? `<ellipse cx="${o.lx ?? 540}" cy="${o.ly ?? 1300}" rx="420" ry="200" fill="${P.torch}" opacity="${.16 * lamp}" filter="url(#blur40)"/>` : ''}
    <rect x="120" y="560" width="320" height="690" fill="#1a120d"/>
    ${gap > 0 ? `<rect x="${426 - 46 * gap}" y="574" width="${46 * gap}" height="676" fill="${P.torch}" opacity=".85"/><polygon points="${426 - 46 * gap},1250 426,1250 640,1400 ${380 - 60 * gap},1400" fill="${P.torch}" opacity=".18"/>` : ''}
    <g transform="translate(${dj} 0)"><rect x="134" y="574" width="${292 - 46 * gap}" height="676" fill="#2e1d13"/>
    <rect x="164" y="610" width="${232 - 46 * gap}" height="270" rx="6" fill="#3a2518"/><rect x="164" y="930" width="${232 - 46 * gap}" height="270" rx="6" fill="#3a2518"/>
    <circle cx="${398 - 46 * gap}" cy="910" r="13" fill="#6a5a3a"/><circle cx="280" cy="680" r="9" fill="#0b0805"/><circle cx="280" cy="680" r="4" fill="#6a5a3a"/>
    <rect x="${392 - 46 * gap}" y="640" width="44" height="12" rx="6" fill="#8d939c"/><path d="M ${420 - 46 * gap} 646 Q ${450 - 30 * gap} ${700 - 40 * gap} ${452} 660" stroke="${P.chain}" stroke-width="5" fill="none" stroke-dasharray="7 4"/><rect x="444" y="640" width="16" height="30" rx="4" fill="#8d939c"/></g>
    <rect x="134" y="1242" width="292" height="14" fill="#e8d9a8" opacity="${strip}"/>
    <polygon points="134,1256 426,1256 540,1400 20,1400" fill="#d9c79a" opacity="${strip * .2}"/>
    ${o.block ? `<rect x="${200}" y="1240" width="${150 * o.block}" height="18" fill="#0d1018"/><polygon points="200,1256 ${200 + 150 * o.block},1256 ${230 + 190 * o.block},1400 150,1400" fill="#0d1018" opacity=".7"/>` : ''}`;
}

function hallOut(t, beamX = 0) {
  return `<rect x="-400" y="-400" width="1880" height="2800" fill="${P.hall}"/>
    <polygon points="-400,-400 300,600 300,1100 -400,2400" fill="#20242e"/><polygon points="1480,-400 780,600 780,1100 1480,2400" fill="#2b303c"/>
    <rect x="300" y="600" width="480" height="500" fill="#181b23"/><rect x="380" y="700" width="140" height="400" fill="#12141a"/>
    <polygon points="300,1100 780,1100 1480,2400 -400,2400" fill="${P.hallFl}"/>
    <rect x="860" y="780" width="120" height="70" rx="6" fill="#3a2f2a"/>${T('12', 920, 830, 44, '#6a6f7c')}
    <ellipse cx="${540 + beamX}" cy="1650" rx="300" ry="90" fill="${P.torch}" opacity=".25" filter="url(#blur20)"/>`;
}
function peephole(inner, t, k = 1) {
  return `<rect x="-10" y="-10" width="1100" height="1940" fill="#050608"/>
    <clipPath id="v21ph"><circle cx="540" cy="820" r="${440 * k}"/></clipPath>
    <g clip-path="url(#v21ph)">${inner}
      <circle cx="540" cy="820" r="${440 * k}" fill="none" stroke="#000" stroke-width="160" opacity=".55" filter="url(#blur40)"/></g>
    <circle cx="540" cy="820" r="${440 * k}" fill="none" stroke="#1f232c" stroke-width="22"/>
    <path d="M ${540 - 300 * k} ${820 - 250 * k} A ${400 * k} ${400 * k} 0 0 1 ${540 + 120 * k} ${820 - 380 * k}" stroke="#fff" stroke-width="10" fill="none" opacity=".12" stroke-linecap="round"/>`;
}

// ---------- v21 additions (Teil 3: Tag 2) ----------
const Q = { door: '#7a4a2c', doorP: '#6a3f24', frame: '#5c3a26', print: '#2a1f1c', sofa: '#6f7f8f', sofaSh: '#5a6878', sofaHi: '#8494a4',
  shelf: '#9a6a44', shelfSh: '#7a5032', chair: '#efe6d2', chairSh: '#c9b994', rice: '#f4efe2', riceSh: '#ddd5c2', bowl: '#e9e4d8',
  slat: '#ece6d8', slatSh: '#cfc6b2', hallDay: '#bfc3c9', bed: '#c96a4a', bedSh: '#a85538', bedIn: '#e7cfa0' };

// badge: NACHT 1 time-lapse 03:12 -> 07:09, then TAG 2 07:10, 12:00 at noon
function badge(t) {
  const p = back(prog(t, .05, .35));
  let head = 'NACHT 1', time, t0 = -1, red = false;
  if (t < 2.88) { const m = Math.round(lerp(192, 429, eio(prog(t, .3, 2.7)))); time = `0${Math.floor(m / 60)}:${String(m % 60).padStart(2, '0')}`; red = true; }
  else if (t < 40.72) { head = 'TAG 2'; time = '07:10'; t0 = 2.88; }
  else { head = 'TAG 2'; time = '12:00'; t0 = 40.72; }
  const f = t0 > 0 ? back(prog(t, t0, t0 + .25)) : 1;
  return `<g transform="translate(${lerp(-330, 0, p)} 0)">
    <rect x="52" y="156" width="270" height="150" rx="18" fill="#000" opacity=".25" transform="translate(0 8)"/>
    <rect x="52" y="156" width="270" height="150" rx="18" fill="#1c2333"/>
    <rect x="52" y="156" width="14" height="150" rx="7" fill="${P.gold}"/>
    <g transform="translate(194 205) scale(${f}) translate(-194 -205)">${T(head, 194, 222, 52, P.white)}</g>
    <g transform="translate(194 272) scale(1 ${f}) translate(-194 -272)"><rect x="106" y="246" width="176" height="50" rx="25" fill="${red ? P.red : P.gold}"/>${T(time, 194, 285, 38, red ? '#fff' : P.ink)}</g>
  </g>`;
}

// ---------- day props ----------
function handprint(x, y, s, rot, a = 1, smear = 0) {
  if (a <= 0) return '';
  let f = '';
  [[-34, -70, -14], [-12, -88, -4], [12, -90, 4], [34, -78, 12], [52, -24, 50]].forEach(([fx, fy, r], i) => {
    f += `<rect x="${fx - 9}" y="${fy - 30}" width="18" height="${i === 4 ? 46 : 58}" rx="9" fill="${Q.print}" transform="rotate(${r} ${fx} ${fy})"/>`;
  });
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${s})" opacity="${a * .85}">
    <ellipse cx="0" cy="0" rx="44" ry="50" fill="${Q.print}"/>${f}
    ${smear > 0 ? `<path d="M -30 30 L -36 ${30 + 50 * smear} M -6 40 L -8 ${40 + 70 * smear} M 22 34 L 24 ${34 + 40 * smear}" stroke="${Q.print}" stroke-width="14" stroke-linecap="round" opacity=".7"/>` : ''}</g>`;
}
function riceBag(x, y, s, label = '1 KG', o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${o.rot || 0})">
    <ellipse cx="0" cy="8" rx="92" ry="16" fill="#000" opacity=".15"/>
    <path d="M -80 0 L -86 -200 Q -60 -236 -40 -222 Q 0 -246 40 -222 Q 60 -236 86 -200 L 80 0 Z" fill="${Q.rice}"/>
    <path d="M 40 -222 Q 60 -236 86 -200 L 80 0 L 46 0 Z" fill="${Q.riceSh}"/>
    <path d="M -50 -224 Q 0 -206 50 -224" stroke="${Q.riceSh}" stroke-width="6" fill="none"/>
    <rect x="-84" y="-130" width="168" height="56" fill="${P.gold}"/>
    ${T(label, 0, -88, 38, P.ink)}</g>`;
}
function can(x, y, s, col) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="4" rx="58" ry="14" fill="#000" opacity=".15"/>
    <rect x="-52" y="-130" width="104" height="130" rx="12" fill="${P.metal}"/><rect x="-52" y="-104" width="104" height="70" fill="${col}"/>
    <ellipse cx="0" cy="-130" rx="52" ry="12" fill="#d6dade"/></g>`;
}
function bowl(x, y, s, steam = 0, t = 0) {
  let st = '';
  if (steam > 0) for (let i = 0; i < 3; i++) { const q = (t * .9 + i / 3) % 1; st += `<path d="M ${-30 + i * 30} ${-40 - q * 70} q 14 -20 0 -40" stroke="#fff" stroke-width="8" fill="none" stroke-linecap="round" opacity="${steam * .7 * Math.sin(q * Math.PI)}"/>`; }
  return `<g transform="translate(${x} ${y}) scale(${s})">${st}<ellipse cx="0" cy="-36" rx="86" ry="20" fill="#fbf8f0"/>
    <path d="M -86 -36 Q -80 30 0 34 Q 80 30 86 -36 Z" fill="${P.shirt}"/><path d="M -80 -10 Q 0 6 80 -10" stroke="#fff" stroke-width="8" fill="none" opacity=".6"/><path d="M -60 -40 Q 0 -60 60 -40" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round"/></g>`;
}
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
// window with closed blinds; o.gap 0..1 = one slat pair lifted (slit at y≈ 800)
function blindWin(t, o = {}) {
  const gap = o.gap || 0;
  let sl = '';
  for (let i = 0; i < 18; i++) {
    const y = 330 + i * 40;
    let dy = 0;
    if (i >= 10) dy = 0; else if (i >= 9) dy = -60 * gap; else if (i >= 8) dy = -30 * gap;
    sl += `<rect x="250" y="${y + dy}" width="580" height="34" rx="4" fill="${Q.slat}"/><rect x="250" y="${y + dy + 26}" width="580" height="8" fill="${Q.slatSh}"/>`;
  }
  return `<rect x="-400" y="-400" width="1880" height="1700" fill="${P.wall}"/>
    <rect x="-400" y="1240" width="1880" height="1100" fill="${P.floor}"/>
    ${Array.from({ length: 14 }, (_, i) => `<line x1="-400" y1="${1268 + i * 60}" x2="1480" y2="${1268 + i * 60}" stroke="${P.floorSh}" stroke-width="4"/>`).join('')}
    <rect x="-400" y="1226" width="1880" height="22" fill="${P.wallSh}"/>
    <rect x="220" y="300" width="640" height="780" fill="#f1ece2"/>
    <rect x="250" y="320" width="580" height="740" fill="#a9b3bd"/>
    <clipPath id="v21bw"><rect x="250" y="320" width="580" height="740"/></clipPath><g clip-path="url(#v21bw)">
    ${gap > 0 ? `<g opacity="${gap}"><rect x="250" y="600" width="580" height="200" fill="${P.sky}"/>${smokeCol(420, 900, t, 2, 0)}</g>` : ''}${sl}</g>
    <rect x="232" y="300" width="616" height="30" rx="8" fill="${Q.slatSh}"/>
    <path d="M 800 330 V ${1010}" stroke="#9a9384" stroke-width="5"/><circle cx="800" cy="1016" r="10" fill="#9a9384"/>
    ${gap > 0 ? `<polygon points="250,${700} 830,${700} 1180,1500 -100,1500" fill="#fff6dc" opacity="${.14 * gap}"/>` : ''}`;
}
function dogBed(x, y, s, o = {}) {
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="10" rx="230" ry="40" fill="#000" opacity=".18"/>
    <ellipse cx="0" cy="-20" rx="220" ry="80" fill="${Q.bed}"/><ellipse cx="0" cy="-30" rx="160" ry="48" fill="${Q.bedIn}"/>
    <ellipse cx="${o.dent ? 20 : 0}" cy="-26" rx="100" ry="26" fill="#d9bd8a" opacity="${o.dent ? .9 : 0}"/>
    <path d="M -220 -20 Q -200 -100 0 -100 Q 200 -100 220 -20" stroke="${Q.bedSh}" stroke-width="30" fill="none"/></g>`;
}
function dogBowl(x, y, s) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><ellipse cx="0" cy="4" rx="80" ry="14" fill="#000" opacity=".18"/>
    <path d="M -80 -40 L -64 0 L 64 0 L 80 -40 Z" fill="#c8463a"/><ellipse cx="0" cy="-40" rx="80" ry="16" fill="#e05a4c"/><ellipse cx="0" cy="-40" rx="60" ry="10" fill="#8a2e26"/></g>`;
}
function bgPaper() { return `<rect x="-200" y="-200" width="1480" height="2400" fill="${P.sky}"/><ellipse cx="540" cy="900" rx="560" ry="820" fill="#e7e1d2" filter="url(#blur40)"/>`; }
function card(x, y, w, h, inner, col = '#fbf8f0') {
  return `<rect x="${x - w / 2 + 10}" y="${y - h / 2 + 14}" width="${w}" height="${h}" rx="26" fill="#000" opacity=".15"/><rect x="${x - w / 2}" y="${y - h / 2}" width="${w}" height="${h}" rx="26" fill="${col}"/>${inner}`;
}

// ---------- shots ----------
function sNight(t) { // 0 - 2.88
  const dj = 6 * ring(t, .25, 8, 8);
  const [sx, sy] = shk(t, .25, 14, 7);
  let rings = '';
  for (let i = 0; i < 2; i++) { const q = prog(t, .25 + i * .1, .9 + i * .1); if (q > 0 && q < 1) rings += `<circle cx="280" cy="900" r="${60 + 320 * q}" fill="none" stroke="${P.white}" stroke-width="${10 * (1 - q)}" opacity="${.6 * (1 - q)}"/>`; }
  const sway = 18 * Math.sin(t * 2.3);
  const dawn = prog(t, 2.1, 2.88);
  const scene = `${darkRoom(t, { strip: .85, dj })}
    <g opacity=".95"><rect x="${206 + sway}" y="1240" width="46" height="20" fill="#0d1018"/><rect x="${300 + sway}" y="1240" width="46" height="20" fill="#0d1018"/>
    <polygon points="${206 + sway},1256 ${346 + sway},1256 ${370 + sway * 1.3},1400 ${170 + sway * 1.3},1400" fill="#0d1018" opacity=".6"/></g>${rings}
    ${personSit(650, 1520, 1.0, { breath: .5 + .5 * Math.sin(t * 4), turn: -.15 })}
    ${toby(860, 1520, .95, { dir: -1, t, ear: 1, wag: 0, growl: .6 * cl(prog(t, .3, .6)) })}
    <rect x="-300" y="-300" width="1680" height="2520" fill="#f6e7c0" opacity="${.5 * dawn * dawn}"/>`;
  const z = lerp(1.35, 1.0, eout(prog(t, 0, .55))) + .05 * prog(t, .55, 2.88);
  return cam(`<g transform="translate(${sx} ${sy})">${scene}</g>`, z, 480, 1050);
}
function sDawn(t) { // 2.88 - 4.74 : morning, stand up, step to the door
  const fl = 1 - prog(t, 2.88, 3.3);
  const rise = eout(prog(t, 3.1, 3.7));
  const walk = eio(prog(t, 3.8, 4.7));
  const scene = `${doorWall(t)}
    <polygon points="1080,300 1480,300 1480,1900 700,1900" fill="#fff6dc" opacity=".25"/>
    ${rise < 1 ? personSit(lerp(700, 690, rise), 1560, 1.0, { turn: -.1, breath: .3 }) : personBack(lerp(700, 560, walk), lerp(1600, 1450, walk) - 10 * Math.abs(Math.sin(walk * Math.PI * 3)), lerp(1.0, .85, walk), { turn: -.1 })}
    ${toby(lerp(900, 860, walk), 1560, .9, { dir: -1, t, ear: .3 })}`;
  return cam(scene, lerp(1.0, 1.08, prog(t, 2.88, 4.74)), 540, 1000) + `<rect width="1080" height="1920" fill="#fff" opacity="${.7 * fl}"/>`;
}
function sPeek(t) { // 4.74 - 5.98 : lean to the peephole (day door)
  const p = eio(prog(t, 4.74, 5.5));
  const scene = `<rect x="-200" y="-200" width="1480" height="2400" fill="${P.wall}"/>
    <rect x="100" y="-100" width="880" height="2300" fill="${Q.door}"/><rect x="170" y="200" width="740" height="700" rx="10" fill="${Q.doorP}"/><rect x="170" y="980" width="740" height="900" rx="10" fill="${Q.doorP}"/>
    <circle cx="540" cy="520" r="34" fill="#8d7a52"/><circle cx="540" cy="520" r="18" fill="#1a120a"/><circle cx="540" cy="520" r="${7 + 5 * p}" fill="${Q.hallDay}"/>
    <g transform="translate(${lerp(780, 610, p)} ${lerp(1500, 1010, p)}) rotate(${lerp(0, -12, p)})">
      <rect x="-150" y="80" width="300" height="600" rx="90" fill="${P.shirt}"/><rect x="-40" y="20" width="80" height="80" fill="${P.skinSh}"/>
      <circle cx="0" cy="-60" r="140" fill="${P.skin}"/><path d="M -146 -40 Q -160 -210 0 -214 Q 156 -210 146 -50 Q 110 40 0 70 Q -110 40 -146 -40 Z" fill="${P.hair}"/>
      <path d="M -70 -170 Q 0 -200 70 -160" stroke="${P.hairHi}" stroke-width="16" fill="none" stroke-linecap="round"/></g>`;
  return cam(scene, lerp(1, 1.14, p), 540, 760);
}
function hallDay(t) {
  return `<rect x="-400" y="-400" width="1880" height="2800" fill="#b5bac2"/>
    <polygon points="-400,-400 300,600 300,1100 -400,2400" fill="#9aa0aa"/><polygon points="1480,-400 780,600 780,1100 1480,2400" fill="#aab0b9"/>
    <rect x="300" y="600" width="480" height="500" fill="#8a909b"/><rect x="380" y="700" width="140" height="400" fill="#6a5040"/>
    <polygon points="300,1100 780,1100 1480,2400 -400,2400" fill="#6c717c"/>
    <rect x="470" y="570" width="140" height="22" rx="6" fill="#f2f4f7"/>
    <rect x="860" y="780" width="120" height="70" rx="6" fill="#7a6a5a"/>${T('12', 920, 830, 44, '#e4e0d6')}`;
}
const PRINTS = [[930, 860, .9, 8, 8.5], [1010, 1010, .95, 16, 8.72], [880, 1100, .85, -6, 8.94], [1060, 1240, 1, 22, 9.16]];
function hallPrints(t, all) {
  let s = '';
  PRINTS.forEach(([x, y, sc, r, t0], i) => { const a = all ? 1 : cl(prog(t, t0, t0 + .12)); s += handprint(x, y, sc, r, a, all ? 1 : eout(prog(t, t0 + .1, t0 + .6))); });
  return s;
}
function sHall(t) { // 5.98 - 7.4 : empty corridor, fisheye scan
  const op = eout(prog(t, 5.98, 6.25));
  const pan = 120 * Math.sin(prog(t, 6.1, 7.4) * Math.PI * 1.2);
  const inner = `<g transform="translate(${pan} 0)">${hallDay(t)}</g>`;
  return peephole(inner, t, lerp(.3, 1, op));
}
function sPrints(t) { // 7.4 - 9.98 : dark handprints on the wall
  const pan = eio(prog(t, 7.4, 8.4));
  const z = lerp(1, 1.5, eio(prog(t, 8.3, 9.9)));
  const inner = `<g transform="translate(540 820) scale(${z}) translate(${-lerp(540, 960, pan)} ${-lerp(860, 1050, pan)})">${hallDay(t)}${hallPrints(t, false)}</g>`;
  return peephole(inner, t);
}
function sStay(t) { // 9.98 - 11.42 : hand off the handle, step back
  const off = eout(prog(t, 10.1, 10.45)), step = eout(prog(t, 10.4, 10.9));
  const sh = Math.sin(prog(t, 10.5, 11.3) * Math.PI * 3) * .35;
  const glint = back(prog(t, 10.38, 10.6)) * (1 - prog(t, 11.1, 11.4));
  const scene = `${doorWall(t)}
    <circle cx="672" cy="660" r="${60 * glint}" fill="${P.gold}" opacity=".35" filter="url(#blur8)"/>
    <path d="M 648 646 Q 670 690 692 650" stroke="${P.gold}" stroke-width="${10 * glint}" fill="none" opacity="${glint}"/>
    ${personBack(lerp(560, 520, step), lerp(1500, 1640, step), lerp(.95, 1.05, step), { turn: sh, reach: lerp(40, 0, off), breath: .4 })}
    ${toby(830, lerp(1600, 1620, step), .9, { dir: -1, t, ear: .5, headRot: -10 })}`;
  return cam(scene, 1.12, 540, 1000, 0, -40);
}
function sCount(t) { // 11.42 - 13.1 : supplies land on the table, counted one by one
  const items = [[260, 1060, 'r'], [420, 1060, 'r'], [580, 1060, 'r'], [300, 760, '#c8463a'], [460, 760, '#3d78c2'], [620, 760, '#d9a43b'], [780, 760, '#4f8a5a'], [760, 1060, 'b']];
  let s = '';
  items.forEach(([x, y, k], i) => {
    const t0 = 11.5 + i * .17, p = back(prog(t, t0, t0 + .22));
    if (p <= 0) return;
    const hl = t > 12.3 + i * .08 && t < 12.45 + i * .08;
    const g = k === 'r' ? riceBag(0, 0, .8) : k === 'b' ? `<g transform="translate(0 -10)">${bottleProp(1.2)}</g>` : can(0, 0, .9, k);
    s += `<g transform="translate(${x} ${y + 80 * (1 - p)}) scale(${p})">${hl ? `<ellipse cx="0" cy="-90" rx="110" ry="130" fill="${P.gold}" opacity=".35"/>` : ''}${g}</g>`;
  });
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.wall}"/><rect x="0" y="560" width="1080" height="700" fill="#a5774f"/><rect x="0" y="540" width="1080" height="30" fill="#c39367"/>
    <rect x="0" y="1260" width="1080" height="660" fill="${P.floor}"/>
    ${cam(s, lerp(1.3, 1.36, prog(t, 11.42, 13.1)), 540, 940)}`;
}
function sRice(t) { // 13.1 - 16.26 : 3 x 1 KG -> 3 KG -> ≈11.000 KCAL
  const merge = eio(prog(t, 13.62, 14.05));
  let bags = '';
  [-1, 0, 1].forEach((k, i) => {
    const p = back(prog(t, 13.1 + i * .1, 13.35 + i * .1));
    if (p <= 0) return;
    bags += riceBag(540 + k * lerp(250, 70, merge), 980 + (k ? 20 : 0) * merge, p * lerp(1.2, .9, merge), '1 KG', { rot: k * 6 * merge });
  });
  const c3 = back(prog(t, 13.9, 14.15));
  const n = Math.round(eout(prog(t, 14.4, 15.4)) * 11);
  const kc = t >= 14.4;
  const done = t >= 15.4 ? 1 + .1 * ring(t, 15.4, 3, 6) : 1;
  return `${bgPaper()}${bags}
    ${c3 > 0 ? `<g transform="translate(540 1150) scale(${c3}) translate(-540 -1150)">${pill(540, 1150, '3 KG', 64, P.ink, P.gold)}</g>` : ''}
    ${kc ? `<g transform="translate(540 520) scale(${done}) translate(-540 -520)">${slam(t, 14.4, 540, 520, `${T('≈' + (n ? n + '.000' : '0'), 540, 560, 150, P.ink)}${T('KCAL', 540, 660, 70, P.red)}`)}</g>` : ''}`;
}
function sPerDay(t) { // 16.26 - 19.9 : 2.000 / TAG -> 5.5 blocks
  const bar = eout(prog(t, 16.3, 16.7));
  const cardP = back(prog(t, 17.04, 17.3));
  const cut = prog(t, 18.28, 19.3);
  let segs = '';
  const W = 145, x0 = 140;
  for (let i = 0; i < 6; i++) {
    const w = i < 5 ? W : W * .5, on = cut * 5.5 > i;
    const lift = on ? -24 * back(cl(cut * 5.5 - i)) : 0;
    const gx = i * 10 * cut;
    segs += `<rect x="${x0 + i * W + gx}" y="${980 + lift}" width="${w - 6}" height="150" rx="14" fill="${on ? P.green : '#c9a24a'}"/>`;
    if (on && cut * 5.5 - i > .6) segs += `${T(String(i + 1), x0 + i * W + gx + (w - 6) / 2, 1080 + lift, 64, '#fff', { op: i < 5 ? 1 : 0 })}`;
  }
  const slamT = 18.9;
  return `${bgPaper()}
    ${T('11.000 KCAL', 540, 920, 56, '#5c5a55', { op: bar })}
    <g opacity="${bar}">${segs}</g>
    ${cardP > 0 ? `<g transform="translate(540 600) scale(${cardP}) translate(-540 -600)">${card(540, 600, 560, 200, `${T('2.000 / TAG', 540, 640, 92, P.ink)}`)}</g>` : ''}
    ${t >= slamT ? slam(t, slamT, 540, 1290, `${T('≈ 5,5', 440, 1320, 120, P.green, { st: '#fbf8f0', sw: 14 })}${T('TAGE', 720, 1320, 80, P.ink, { st: '#fbf8f0', sw: 12 })}`) : ''}`;
}
function sMonth(t) { // 19.9 - 20.84 : no month
  let cells = '';
  const red = eout(prog(t, 20.1, 20.5));
  for (let i = 0; i < 30; i++) {
    const r = Math.floor(i / 6), c = i % 6, x = 160 + c * 130, y = 620 + r * 130;
    const on = i < 5 ? 1 : i === 5 ? .5 : 0;
    const p = back(prog(t, 19.9 + i * .012, 20.1 + i * .012));
    cells += `<g transform="translate(${x + 55} ${y + 55}) scale(${p}) translate(${-x - 55} ${-y - 55})"><rect x="${x}" y="${y}" width="110" height="110" rx="14" fill="${on ? '#ece6d8' : '#ece6d8'}"/>
      ${on ? `<rect x="${x}" y="${y}" width="${110 * on}" height="110" rx="14" fill="${P.green}"/>` : `<rect x="${x}" y="${y}" width="110" height="110" rx="14" fill="${P.red}" opacity="${.5 * red}"/>`}</g>`;
  }
  const X = eout(prog(t, 20.2, 20.45));
  return `${bgPaper()}<rect x="130" y="560" width="820" height="720" rx="30" fill="#fbf8f0"/><rect x="130" y="520" width="820" height="70" rx="24" fill="${P.ink}"/>${cells}
    ${X > 0 ? `<path d="M 200 760 L ${200 + 680 * X} ${760 + 480 * X} M 880 760 L ${880 - 680 * X} ${760 + 480 * X}" stroke="${P.red}" stroke-width="22" stroke-linecap="round" opacity=".85"/>` : ''}`;
}
function pot(x, y, s, lvl, rice) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><clipPath id="v21pot"><rect x="-170" y="-260" width="340" height="260" rx="30"/></clipPath>
    <rect x="-170" y="-260" width="340" height="260" rx="30" fill="${P.metal}"/>
    <g clip-path="url(#v21pot)"><rect x="-180" y="${-260 * lvl}" width="360" height="${260 * lvl + 4}" fill="${P.water}"/><rect x="-180" y="${-260 * lvl}" width="360" height="10" fill="${P.waterHi}"/>
    ${rice > 0 ? Array.from({ length: 24 }, (_, i) => `<ellipse cx="${-140 + (i % 8) * 40 + 10 * hash(i)}" cy="${-20 - Math.floor(i / 8) * 26 - 8 * hash(i + 3)}" rx="11" ry="6" fill="#fbf8f0" opacity="${rice}"/>`).join('') : ''}</g>
    <rect x="-200" y="-240" width="40" height="22" rx="10" fill="${P.metalSh}"/><rect x="160" y="-240" width="40" height="22" rx="10" fill="${P.metalSh}"/>
    <rect x="-170" y="-260" width="340" height="16" rx="8" fill="#d6dade"/></g>`;
}
function sPot(t) { // 20.84 - 22.52 : rice needs water
  const pour = t > 21.5 && t < 22.45;
  const lvl = .2 + .5 * eio(prog(t, 21.5, 22.45));
  const tilt = lerp(0, -70, eout(prog(t, 21.3, 21.6))) * (1 - eout(prog(t, 22.3, 22.5)));
  const bagIn = back(prog(t, 20.9, 21.15));
  return `${bgPaper()}<rect x="0" y="1180" width="1080" height="760" fill="#cfc6b2"/>
    ${pot(500, 1220, 1.4, lvl, 1)}
    ${bagIn > 0 ? riceBag(220, lerp(1300, 1180, bagIn), .8, '1 KG') : ''}
    <g transform="translate(760 560) rotate(${tilt})">${bottleProp(2.0)}</g>
    ${pour ? `<path d="M ${700} ${560} Q ${640} ${700} ${600} ${1220 - 364 * lvl}" stroke="${P.water}" stroke-width="22" fill="none" stroke-linecap="round"/>` : ''}`;
}
function sList(t) { // 22.52 - 25.54 : the list: 2,5 L / KG
  const inP = back(prog(t, 22.52, 22.85));
  const line = eout(prog(t, 23.0, 23.5));
  const paper = `<g transform="translate(0 ${lerp(1400, 0, inP)}) rotate(-2 540 860)">
    <rect x="150" y="380" width="760" height="980" rx="20" fill="#000" opacity=".18" transform="translate(12 16)"/>
    <rect x="150" y="380" width="760" height="980" rx="20" fill="#fbf8f0"/>
    ${Array.from({ length: 11 }, (_, i) => `<line x1="190" y1="${470 + i * 80}" x2="870" y2="${470 + i * 80}" stroke="#c9d6e4" stroke-width="3"/>`).join('')}
    <line x1="240" y1="380" x2="240" y2="1360" stroke="#e8a0a0" stroke-width="3"/>
    <path d="M 280 540 q 60 -30 120 0 t 120 0 t 120 0" stroke="#8a93a6" stroke-width="7" fill="none" stroke-linecap="round" pathLength="1" style="stroke-dasharray:${line} 1"/>
    ${pop(t, 23.3, 360, 820, riceBag(360, 900, .75, '1 KG'))}
    ${T('+', 540, 860, 110, P.ink, { op: cl(prog(t, 23.5, 23.6)) })}
    ${pop(t, 23.5, 700, 820, `<path d="M 700 700 C 740 760 770 800 770 836 A 70 70 0 0 1 630 836 C 630 800 660 760 700 700 Z" fill="${P.water}"/>`)}
    ${t > 23.68 ? slam(t, 23.68, 530, 1150, `${T('2,5 L', 530, 1170, 150, '#2f7fd0')}${T('/ KG', 530, 1260, 70, P.ink)}`) : ''}
  </g>`;
  return `${bgPaper()}${cam(paper, lerp(1, 1.05, prog(t, 22.52, 25.54)), 540, 900)}`;
}
function sShrink(t) { // 25.54 - 28.9 : each meal shrinks the water reserve
  const meals = [25.78, 26.34, 26.88];
  let lvl = .82, bw = '';
  meals.forEach((m, i) => {
    lvl -= .05 * eio(prog(t, m + .15, m + .6));
    const p = back(prog(t, m, m + .25));
    if (p > 0) bw += `<g transform="translate(${250 + i * 290} 640) scale(${p})">${bowl(0, 0, 1.1, 1, t + i)}</g>`;
  });
  const arrow = eout(prog(t, 27.5, 27.9));
  const x = 290, y = 820, w = 500, h = 520;
  return `${bgPaper()}${bw}
    <clipPath id="v21tk"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40"/></clipPath>
    <rect x="${x}" y="${y}" width="${w}" height="${h}" rx="40" fill="#d8eaf4"/>
    <g clip-path="url(#v21tk)"><rect x="${x - 10}" y="${y + h - h * lvl}" width="${w + 20}" height="${h * lvl + 4}" fill="${P.water}"/>
      <rect x="${x - 10}" y="${y + h - h * lvl + 4 * Math.sin(t * 6)}" width="${w + 20}" height="12" fill="${P.waterHi}"/></g>
    <rect x="${x + 180}" y="${y - 40}" width="140" height="50" rx="12" fill="${P.shirt}"/>
    <path d="M ${x + w + 40} ${y + h - h * .82} H ${x + w + 80}" stroke="${P.ink}" stroke-width="6" opacity=".4"/>
    ${arrow > 0 ? `<g opacity="${arrow}" transform="translate(${x + w + 70} ${y + h - h * lvl - 70})"><path d="M 0 -50 V 40 M -30 10 L 0 44 L 30 10" stroke="${P.red}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>` : ''}`;
}
// barricade state helpers
function barricade(t, o = {}) {
  const sofaX = o.sofaX ?? 520, rot = o.rot || 0;
  return `${o.sofa !== false ? sofa(sofaX, 1330 + (o.sofaDy || 0), 1, rot) : ''}
    ${o.shelf ? bookshelf(o.shelfX ?? 700, 1310, 1, o.shelfRot || 0) : ''}
    ${o.chairs ? o.chairs : ''}`;
}
function sToDoor(t) { // 28.9 - 30.98
  const walk = eio(prog(t, 29.0, 30.6));
  const scene = `${doorWall(t)}
    ${sofa(lerp(-80, -60, walk), 1420, 1)}
    ${personBack(lerp(900, 600, walk), lerp(1700, 1500, walk) - 12 * Math.abs(Math.sin(walk * Math.PI * 4)), lerp(1.05, .88, walk), { turn: -.2, breath: .4 })}
    ${toby(lerp(1040, 820, eio(prog(t, 29.3, 30.9))), 1640, .85, { dir: -1, t: t * 1.6, ear: .3 })}`;
  return cam(scene, lerp(1.0, 1.12, walk), lerp(500, 520, walk), 1000);
}
function sSofa(t) { // 30.98 - 32.72 : push the sofa in front of the door
  const p = eio(prog(t, 31.2, 32.5));
  const sx = lerp(120, 520, p);
  const lean = 14 + 3 * Math.sin(t * 12) * (p > 0 && p < 1 ? 1 : 0);
  const scene = `${doorWall(t)}${sofa(sx, 1330, 1)}
    <g transform="rotate(${lean} ${sx - 300} 1340)">${personBack(sx - 300, 1340, .78, { reach: 70, turn: .4 })}</g>`;
  return cam(scene, 1.0, 520, 960, 0, -20);
}
function sShelf(t) { // 32.72 - 33.78 : bookshelf slides next to it
  const p = eout(prog(t, 32.85, 33.4));
  const [sx, sy] = shk(t, 33.4, 8, 9);
  const scene = `${doorWall(t)}${bookshelf(lerp(1000, 700, p), 1310, 1, lerp(4, 0, p))}${sofa(520, 1330, 1)}`;
  return cam(`<g transform="translate(${sx} ${sy})">${scene}</g>`, 1.35, 620, 1000);
}
function chairsOn(t, a, b) {
  const c1 = t >= a ? 1 - .12 * Math.abs(ring(t, a, 3, 8)) : -1, c2 = t >= b ? 1 : -1;
  const d1 = t >= a ? -30 * (1 - eout(prog(t, a, a + .15))) : 0, d2 = t >= b ? -30 * (1 - eout(prog(t, b, b + .15))) : 0;
  return `${c1 > 0 ? chair(400, 1120 + d1, .9, 180, 1) : ''}${c2 > 0 ? chair(640, 1120 + d2, .9, 180, -1) : ''}`;
}
function sChairs(t) { // 33.78 - 34.72
  const scene = `${doorWall(t)}${bookshelf(700, 1310, 1)}${sofa(520, 1330, 1)}${chairsOn(t, 34.04, 34.28)}`;
  return cam(scene, lerp(1.08, 1.0, eout(prog(t, 33.78, 34.7))), 540, 980);
}
function sUnder(t) { // 34.72 - 37.7 : low angle, the light strip under the door; something waits
  const sw = 40 * Math.sin((t - 34.72) * 1.1);
  const breath = .5 + .5 * Math.sin(t * 2);
  const red = .4 + .3 * Math.sin(t * 4);
  return `<rect width="1080" height="1920" fill="#2a1a10"/>
    <rect x="0" y="0" width="1080" height="1000" fill="${Q.door}"/><rect x="80" y="0" width="920" height="760" rx="10" fill="${Q.doorP}"/>
    <rect x="0" y="1000" width="1080" height="60" fill="#e6e9ee"/>
    <rect x="${300 + sw}" y="1000" width="170" height="60" fill="#1b1414" opacity=".95"/><rect x="${560 + sw}" y="1000" width="170" height="60" fill="#1b1414" opacity=".95"/>
    <polygon points="0,1060 1080,1060 1480,1920 -400,1920" fill="${P.floor}"/>
    ${Array.from({ length: 10 }, (_, i) => `<line x1="${-400 + i * 210}" y1="1920" x2="${i * 120}" y2="1060" stroke="${P.floorSh}" stroke-width="5"/>`).join('')}
    <polygon points="0,1060 1080,1060 1300,1500 -220,1500" fill="#fff" opacity="${.12 + .03 * breath}"/>
    <polygon points="${300 + sw},1060 ${730 + sw},1060 ${800 + sw * 1.4},1500 ${220 + sw * 1.4},1500" fill="#000" opacity=".35"/>
    <circle cx="${515 + sw}" cy="1030" r="${90 + 20 * breath}" fill="${P.red}" opacity="${.18 * red}" filter="url(#blur20)"/>`;
}
function hourglass(x, y, s, f, t) {
  const top = 1 - f, bot = f;
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-90" y="-150" width="180" height="20" rx="8" fill="${Q.shelf}"/><rect x="-90" y="130" width="180" height="20" rx="8" fill="${Q.shelf}"/>
    <path d="M -70 -130 L 70 -130 L 8 0 L 70 130 L -70 130 L -8 0 Z" fill="#e9f2f7" opacity=".9"/>
    <path d="M ${-60 * top} ${-10 - 100 * top} L ${60 * top} ${-10 - 100 * top} L 0 -6 Z" fill="${P.gold}"/>
    <path d="M -60 128 L 60 128 L ${60 - 50 * (1 - bot)} ${128 - 90 * bot} L ${-60 + 50 * (1 - bot)} ${128 - 90 * bot} Z" fill="${P.gold}"/>
    <rect x="-2" y="0" width="4" height="${126 - 90 * bot}" fill="${P.gold}" opacity=".9"/></g>`;
}
function sHold(t) { // 37.7 - 40.72 : barricade holds; patience runs
  const thump = [38.5, 39.6];
  let dj = 0, jit = 0;
  thump.forEach(k => { dj += 5 * ring(t, k, 9, 8); jit += 4 * ring(t, k + .03, 11, 9); });
  const hg = back(prog(t, 39.7, 40.0));
  const scene = `${doorWall(t, { dj })}<g transform="translate(${jit} 0)">${bookshelf(700, 1310, 1)}${sofa(520, 1330, 1)}${chairsOn(t, 0, 0)}</g>
    <path d="M 300 1360 Q 520 1300 760 1360" stroke="${P.green}" stroke-width="12" fill="none" stroke-linecap="round" opacity="${.6 * eout(prog(t, 37.9, 38.3))}"/>`;
  return cam(scene, lerp(.9, .98, prog(t, 37.7, 40.72)), 560, 1000, 0, 140)
    + (hg > 0 ? `<g transform="translate(860 520) scale(${hg}) rotate(${t > 40.3 ? 180 * eio(prog(t, 40.3, 40.7)) : 0})">${hourglass(0, 0, 1, prog(t, 39.7, 40.3), t)}</g>` : '');
}
function sBlind(t) { // 40.72 - 43.9 : noon, lift the blind a slit; Toby beside
  const reach = eout(prog(t, 41.4, 41.9));
  const gap = eout(prog(t, 42.52, 42.95));
  const scene = `${blindWin(t, { gap })}
    ${personBack(560, 1760, 1.05, { reach: 150 * reach, breath: .5 + .5 * Math.sin(t * 2.4), held: '' })}
    ${toby(220, 1430, .85, { dir: 1, t, ear: .3 + .4 * gap, headRot: -14 * gap })}`;
  return cam(scene, lerp(1.0, 1.1, eio(prog(t, 42.5, 43.9))), 540, lerp(1000, 820, eio(prog(t, 42.5, 43.9))));
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
  return `<clipPath id="v21sl"><rect x="0" y="${820 - h / 2}" width="1080" height="${h}"/></clipPath><rect width="1080" height="1920" fill="${Q.slat}"/>
    ${Array.from({ length: 24 }, (_, i) => `<rect x="0" y="${i * 80}" width="1080" height="8" fill="${Q.slatSh}"/>`).join('')}
    <g clip-path="url(#v21sl)">${inner}</g>
    <rect x="0" y="${820 - h / 2 - 20}" width="1080" height="20" fill="${Q.slatSh}"/><rect x="0" y="${820 + h / 2}" width="1080" height="20" fill="#bfb6a2"/>`;
}
function sirenIcon(x, y, p) {
  return `<g transform="translate(${x} ${y}) scale(${p})"><circle r="92" fill="${P.ink}" opacity=".9"/>
    <path d="M -46 30 L -46 -10 Q -46 -56 0 -56 Q 46 -56 46 -10 L 46 30 Z" fill="${P.red}"/><rect x="-62" y="28" width="124" height="22" rx="6" fill="#d6dade"/>
    <path d="M -64 -64 L 64 64" stroke="#fff" stroke-width="14" stroke-linecap="round"/></g>`;
}
function sCity(t) { // 43.9 - 46.64 : smoke, no siren
  const open = eout(prog(t, 43.9, 44.3));
  const pan = lerp(-60, 60, eio(prog(t, 43.9, 46.6)));
  const inner = cam(oppView(t), 1.25, 540 + pan, 900);
  const si = back(prog(t, 45.3, 45.6));
  return slit(inner, lerp(120, 520, open)) + (si > 0 ? sirenIcon(540, 1260, si) : '');
}
function flashAt(x, y, a, sz = 1) {
  if (a <= 0) return '';
  return `<g transform="translate(${x} ${y})" opacity="${a}"><circle r="${90 * sz}" fill="#fff8d8" opacity=".55" filter="url(#blur20)"/>
    <path d="M 0 ${-110 * sz} L ${12 * sz} ${-12 * sz} L ${110 * sz} 0 L ${12 * sz} ${12 * sz} L 0 ${110 * sz} L ${-12 * sz} ${12 * sz} L ${-110 * sz} 0 L ${-12 * sz} ${-12 * sz} Z" fill="#fff"/></g>`;
}
function sMirror(t) { // 46.64 - 49.54 : a mirror flashes on the roof opposite
  const z = lerp(1.25, 2.6, eio(prog(t, 47.4, 49.0)));
  const fx = lerp(540, 650, eio(prog(t, 47.4, 49.0))), fy = lerp(900, 800, eio(prog(t, 47.4, 49.0)));
  const f1 = Math.max(0, 1 - Math.abs(t - 46.9) / .18), f2 = Math.max(0, 1 - Math.abs(t - 48.75) / .2);
  const inner = cam(`${oppView(t, { fig: 1 })}${flashAt(672, 774, Math.max(f1, f2), .6 / z * 1.6)}`, z, fx, fy);
  return slit(inner, 520);
}
// SOS: 3 short, 3 long, 3 short
const SOS = (() => { const a = []; let t0 = 49.6; const S = .13, L = .27, G = .1;
  for (let i = 0; i < 3; i++) { a.push([t0, S]); t0 += S + G; } t0 += .1;
  for (let i = 0; i < 3; i++) { a.push([t0, L]); t0 += L + G; } t0 += .06;
  for (let i = 0; i < 3; i++) { a.push([t0, S]); t0 += S + G; } return a; })();
function sSOS(t) { // 49.54 - 52.52
  let on = 0, marks = '';
  SOS.forEach(([a, d], i) => {
    if (t >= a && t < a + d) on = 1;
    const lit = t >= a;
    const long = d > .2, grp = Math.floor(i / 3);
    const x = 150 + i * 88 + grp * 24, w = long ? 70 : 34;
    const fire = lit ? 1 + .4 * Math.max(0, 1 - (t - a) / .2) : 1;
    marks += `<g transform="translate(${x} 1240) scale(${fire})"><rect x="${-w / 2}" y="-17" width="${w}" height="34" rx="17" fill="${lit ? P.gold : '#3a4559'}"/></g>`;
  });
  const inner = cam(`${oppView(t, { fig: 1 })}${flashAt(672, 774, on, .7)}`, 2.6, 650, 800);
  const sos = t >= 52.3;
  return `<rect width="1080" height="1920" fill="${P.navy}"/>
    <clipPath id="v21sos"><rect x="90" y="300" width="900" height="760" rx="30"/></clipPath><g clip-path="url(#v21sos)"><g transform="translate(0 -100)">${inner}</g></g>
    <rect x="90" y="300" width="900" height="760" rx="30" fill="none" stroke="${Q.slat}" stroke-width="16"/>
    ${on ? `<rect x="90" y="300" width="900" height="760" rx="30" fill="#fff" opacity=".12"/>` : ''}
    ${marks}${sos ? slam(t, 52.3, 540, 520, T('SOS', 540, 600, 220, P.white, { st: P.ink, sw: 18 })) : ''}`;
}
function sAlive(t) { // 52.52 - 54.24 : someone is alive over there (two buildings diagram)
  const p = eio(prog(t, 52.6, 53.4));
  let s = `<rect width="1080" height="1920" fill="${P.navy}"/><ellipse cx="540" cy="900" rx="700" ry="800" fill="#1c2638" opacity=".6" filter="url(#blur40)"/>`;
  const fh = 62, bot = 1340;
  s += `<rect x="120" y="${bot - 12 * fh}" width="300" height="${12 * fh}" fill="${P.navy2}" stroke="${P.gridHi}" stroke-width="6"/>`;
  for (let k = 1; k <= 12; k++) { s += `<line x1="120" y1="${bot - k * fh}" x2="420" y2="${bot - k * fh}" stroke="${P.grid}" stroke-width="3"/>`; s += T(String(k), 90, bot - (k - .5) * fh + 12, 30, k === 12 ? P.gold : P.grey); }
  s += `<rect x="660" y="${bot - 9 * fh}" width="300" height="${9 * fh}" fill="${P.navy2}" stroke="${P.gridHi}" stroke-width="6"/>`;
  for (let k = 1; k <= 9; k++) s += `<line x1="660" y1="${bot - k * fh}" x2="960" y2="${bot - k * fh}" stroke="${P.grid}" stroke-width="3"/>`;
  s += `<rect x="-100" y="${bot}" width="1280" height="20" fill="${P.grid}"/>`;
  const y1 = bot - 11.5 * fh, y2 = bot - 9 * fh - 26;
  const x1 = 340, x2 = 800;
  s += `<path d="M ${x2} ${y2} L ${lerp(x2, x1 + 30, p)} ${lerp(y2, y1, p)}" stroke="${P.gold}" stroke-width="8" stroke-dasharray="16 12" stroke-dashoffset="${t * 60}"/>`;
  const pr = (t * .9) % 1;
  s += `<circle cx="${x1}" cy="${y1}" r="${20 + pr * 30}" fill="none" stroke="${P.green}" stroke-width="4" opacity="${.8 * (1 - pr)}"/><circle cx="${x1}" cy="${y1}" r="16" fill="${P.green}"/>${T('DU', x1 - 4, y1 - 36, 36, P.green)}`;
  const g = back(prog(t, 52.62, 52.9));
  const pr2 = (t * 1.4) % 1;
  if (g > 0) s += `<g transform="translate(${x2} ${y2}) scale(${g})"><circle r="${24 + pr2 * 60}" fill="none" stroke="#fff" stroke-width="5" opacity="${1 - pr2}"/><circle r="40" fill="#fff8d8" opacity=".4" filter="url(#blur8)"/><circle r="18" fill="#fff8d8"/></g>`;
  return cam(s, lerp(1.0, 1.08, prog(t, 52.52, 54.24)), 540, 1000);
}
function sHope(t) { // 54.24 - 57.08 : warm light through the slit, shoulders rise
  const warm = eout(prog(t, 54.4, 56.2));
  const br = .5 + .5 * Math.sin(t * 1.8);
  const scene = `${blindWin(t, { gap: 1 })}
    <polygon points="250,700 830,700 980,1600 100,1600" fill="${P.gold}" opacity="${.18 * warm}"/>
    ${personBack(540, 1880, 1.3, { breath: br + warm, turn: .08 * Math.sin(t * .8) })}
    <ellipse cx="540" cy="900" rx="${200 + 160 * warm}" ry="${70 + 40 * warm}" fill="${P.gold}" opacity="${.25 * warm}" filter="url(#blur40)"/>`;
  return cam(scene, lerp(1.2, 1.35, eio(prog(t, 54.24, 57.08))), 540, 860);
}
function sTurn(t) { // 57.08 - 58.72 : turn to Toby (over the shoulder), whip to the right
  const u = back(prog(t, 57.2, 57.75));
  const whip = ein(prog(t, 58.2, 58.72));
  const scene = `${blindWin(t, { gap: 1 })}
    ${personBack(540, 1880, 1.3, { turn: cl(u, 0, 1.05), breath: .6 })}`;
  return cam(scene, 1.3, 540 + 700 * whip, 860) + (whip > 0 ? `<rect width="1080" height="1920" fill="${P.wall}" opacity="${whip * .8}"/>` : '');
}
function sEmpty(t) { // 58.72 - 59.94 : the bed and bowl, empty
  const z = lerp(1.0, 1.12, eout(prog(t, 58.72, 59.9)));
  const [sx] = shk(t, 59.4, 6, 8);
  const scene = `<rect x="-400" y="-400" width="1880" height="1700" fill="${P.wall}"/><rect x="-400" y="1100" width="1880" height="1200" fill="${P.floor}"/>
    ${Array.from({ length: 16 }, (_, i) => `<line x1="-400" y1="${1130 + i * 64}" x2="1480" y2="${1130 + i * 64}" stroke="${P.floorSh}" stroke-width="4"/>`).join('')}
    <rect x="-400" y="1086" width="1480" height="22" fill="${P.wallSh}"/>
    ${dogBed(480, 1380, 1.4, { dent: 1 })}${dogBowl(860, 1300, 1)}`;
  return cam(`<g transform="translate(${sx} 0)">${scene}</g>`, z, 540, 1200, 0, -120) + `<rect width="1080" height="1920" fill="${P.wall}" opacity="${.8 * (1 - eout(prog(t, 58.72, 58.95)))}"/>`;
}
// end state of the barricade
function messState(t, k) {
  return `${bookshelf(lerp(700, 860, k), 1310, 1, lerp(0, 9, k))}${sofa(lerp(520, 380, k), 1330 + 70 * k, 1, lerp(0, -7, k))}`;
}
function fallenChairs() { return `${chair(130, 1600, 1.2, 90, 1)}${chair(960, 1660, 1.2, -84, 1)}`; }
function sLookDoor(t) { // 59.94 - 61.28 : head snaps to the door (seen from the window)
  const u = back(prog(t, 60.05, 60.5));
  const scene = `${doorWall(t, { gap: 1, chain: 'loose' })}${messState(t, 1)}
    <rect x="-400" y="-400" width="1880" height="2800" fill="#0b0f19" opacity=".25"/>
    ${personBack(940, 2150, 1.6, { turn: lerp(.6, -.55, cl(u, 0, 1)), breath: .5 })}`;
  return cam(scene, .8, 540, 1100, 0, 60);
}
function sReveal(t) { // 61.28 - 66.46 : chairs on the floor -> barricade shifted -> door ajar
  let z, fx, fy;
  if (t < 62.82) { z = lerp(1.3, 1.2, prog(t, 61.28, 62.82)); fx = 540; fy = 1560; }
  else if (t < 64.1) { const p = eio(prog(t, 62.82, 63.5)); z = lerp(1.4, 1.1, p); fx = lerp(540, 600, p); fy = lerp(1640, 1150, p); }
  else { const p = eio(prog(t, 64.1, 65.9)); z = lerp(1.1, 2.0, p); fx = lerp(600, 640, p); fy = lerp(1150, 920, p); }
  const ghostOut = eout(prog(t, 63.3, 63.7)) * (1 - prog(t, 64.3, 64.6));
  const creak = t > 64.4 ? 3 * Math.sin((t - 64.4) * 3) * Math.exp(-(t - 64.4)) : 0;
  const scene = `${doorWall(t, { gap: lerp(.8, 1, eout(prog(t, 64.4, 65.2))), chain: 'loose', dj: creak })}
    ${ghostOut > 0 ? `<g opacity="${ghostOut}"><rect x="290" y="1120" width="460" height="210" rx="36" fill="none" stroke="${P.red}" stroke-width="8" stroke-dasharray="20 14"/><rect x="590" y="720" width="220" height="590" rx="8" fill="none" stroke="${P.red}" stroke-width="8" stroke-dasharray="20 14"/></g>` : ''}
    ${messState(t, 1)}${fallenChairs()}
    <circle cx="640" cy="900" r="${160 * eout(prog(t, 64.6, 65.0))}" fill="#fff" opacity=".12" filter="url(#blur20)"/>`;
  return cam(scene, z, fx, fy);
}
function sNotMe(t) { // 66.46 - 68.18 : the chain hangs loose; you didn't open it
  const sw = 26 * Math.sin((t - 66.46) * 4) * Math.exp(-(t - 66.46) * .6) + 10;
  const sh = Math.sin(prog(t, 67.0, 67.9) * Math.PI * 3) * .3;
  return `<rect width="1080" height="1920" fill="${P.wall}"/>
    <rect x="460" y="0" width="160" height="1920" fill="${Q.hallDay}"/><rect x="480" y="0" width="60" height="1920" fill="#e6e9ee" opacity=".8"/>
    <rect x="-40" y="0" width="500" height="1920" fill="${Q.door}"/><rect x="20" y="200" width="380" height="1000" rx="10" fill="${Q.doorP}"/>
    <rect x="620" y="0" width="120" height="1920" fill="${Q.frame}"/>
    <rect x="360" y="560" width="110" height="34" rx="14" fill="${P.metalSh}"/><rect x="640" y="540" width="44" height="90" rx="10" fill="${P.metalSh}"/>
    <g transform="translate(420 577) rotate(${sw})"><path d="M 0 0 Q -10 120 10 260" stroke="${P.chain}" stroke-width="14" fill="none" stroke-dasharray="20 10"/><circle cx="10" cy="270" r="18" fill="${P.metalSh}"/></g>
    <circle cx="380" cy="1000" r="40" fill="#d8b25a"/><rect x="260" y="980" width="130" height="40" rx="20" fill="#d8b25a"/>
    ${personBack(860, 2400, 1.9, { turn: sh - .4, breath: .5 })}`;
}
function sWhere(t) { // 68.18 - 69.948 : TOBY? ; light dims back to night (loops to the start)
  const dim = eio(prog(t, 69.1, 69.9));
  const q = back(prog(t, 68.6, 68.9));
  const scene = `${doorWall(t, { gap: 1, chain: 'loose' })}${messState(t, 1)}${fallenChairs()}
    <rect x="-400" y="-400" width="1880" height="2800" fill="#0b0f19" opacity="${.35 + .55 * dim}"/>
    <rect x="616" y="552" width="52" height="700" fill="${Q.hallDay}" opacity="${.9 * (1 - dim * .6)}"/>`;
  return cam(scene, lerp(1.0, 1.15, eio(prog(t, 68.18, 69.9))), 560, 1000)
    + (q > 0 ? `<g transform="translate(540 620) scale(${q}) translate(-540 -620)">${T('TOBY?', 540, 680, 190, P.white, { st: P.red, sw: 16 })}</g>` : '');
}

const SHOTS = [[0, sNight], [2.88, sDawn], [4.74, sPeek], [5.98, sHall], [7.4, sPrints], [9.98, sStay], [11.42, sCount], [13.1, sRice], [16.26, sPerDay], [19.9, sMonth],
  [20.84, sPot], [22.52, sList], [25.54, sShrink], [28.9, sToDoor], [30.98, sSofa], [32.72, sShelf], [33.78, sChairs], [34.72, sUnder], [37.7, sHold],
  [40.72, sBlind], [43.9, sCity], [46.64, sMirror], [49.54, sSOS], [52.52, sAlive], [54.24, sHope], [57.08, sTurn], [58.72, sEmpty], [59.94, sLookDoor],
  [61.28, sReveal], [66.46, sNotMe], [68.18, sWhere]];
function scene(t) {
  let f = SHOTS[0][1];
  for (const [t0, fn] of SHOTS) if (t >= t0) f = fn;
  try { return f(t) + badge(t); } catch (e) { return `<rect x="0" y="0" width="1080" height="1920" fill="#111724"/>${'<g></g>'.repeat(40)}`; }
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
