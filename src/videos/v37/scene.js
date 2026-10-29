// @ts-nocheck
// AUTO-GENERATED scene for v37. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// Das Wunder von Lengede – Kênh 3: hồ sơ lưu trữ, giấy ố, mực nâu, dấu đỏ; mặt cắt lòng đất là hình dẫn chuyện.
const P = {
  paper: '#EADBC0', paperSh: '#D9C6A3', paperHi: '#F4EAD6', ink: '#3B2F2A', red: '#B23A2E', olive: '#6B7B4B', brown: '#8A6E52',
  sky: '#3A4250', skyDawn: '#C9A27A', soil: '#B79B73', marl: '#A38866', rock: '#8F7A60', rock2: '#74624E', ore: '#7A4E3A', tun: '#2A221D',
  mud: '#5C4632', mudHi: '#7A6046', lamp: '#FFD27A', lampHi: '#FFF1C8', skin: '#E2B48C', skinSh: '#C0906A', helm: '#F2EEE4', helmSh: '#CFC8B8',
  jack: '#8C8F8E', jackSh: '#6E7170', jackHi: '#A6A9A6', steel: '#6F7378', steelSh: '#4F5358', dark: '#1E1916', water: '#7E8F86',
};
const OL = (w = 4) => `stroke="${P.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${x}" y="${y}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
const shk = (t, t0, a, d = 6) => { if (t < t0) return [0, 0]; const e = a * Math.exp(-(t - t0) * d); return [e * Math.sin((t - t0) * 83), e * Math.cos((t - t0) * 61)]; };
const blinkAt = (t, off = 0) => { const k = (t + off) % 2.9; return k > 2.75 ? Math.sin((k - 2.75) / .15 * Math.PI) : 0; };

function defs(t) {
  const sd = Math.floor(t * 12) % 40;
  return `<defs>
<filter id="pGrain" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".85" numOctaves="1" seed="${sd}"/><feColorMatrix values="0 0 0 0 .23  0 0 0 0 .18  0 0 0 0 .16  0 0 0 1.4 -.55"/></filter>
<filter id="pPaper" x="0" y="0" width="100%" height="100%"><feTurbulence type="fractalNoise" baseFrequency=".012 .03" numOctaves="3" seed="7"/><feColorMatrix values="0 0 0 0 .45  0 0 0 0 .33  0 0 0 0 .2  0 0 0 .9 -.25"/></filter>
<radialGradient id="pLamp" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF1C8" stop-opacity=".85"/><stop offset=".5" stop-color="#FFD27A" stop-opacity=".3"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></radialGradient>
<radialGradient id="pVig" cx=".5" cy=".5" r=".65"><stop offset=".55" stop-color="#2A1E16" stop-opacity="0"/><stop offset="1" stop-color="#2A1E16" stop-opacity=".7"/></radialGradient>
<linearGradient id="pBeam" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#FFF1C8" stop-opacity=".8"/><stop offset="1" stop-color="#FFD27A" stop-opacity="0"/></linearGradient>
<linearGradient id="pSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#2C323D"/><stop offset="1" stop-color="#5A5A5E"/></linearGradient>
<linearGradient id="pDawn" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#6E7A86"/><stop offset=".7" stop-color="#D9B48A"/><stop offset="1" stop-color="#F0D2A0"/></linearGradient>
<linearGradient id="pMud" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#7A6046"/><stop offset="1" stop-color="#4A3828"/></linearGradient>
</defs>`;
}
const GRAIN = `<rect x="0" y="0" width="1080" height="1920" filter="url(#pGrain)" opacity=".35"/>`;
const PAPERTEX = `<rect x="0" y="0" width="1080" height="1920" filter="url(#pPaper)" opacity=".5"/>`;
const paperBg = () => `<rect x="0" y="0" width="1080" height="1920" fill="${P.paper}"/>${PAPERTEX}`;

function stamp(str, cx, cy, sz, p, rot = -8, col = P.red) {
  if (p <= 0) return '';
  const w = str.length * sz * .64 + sz * 1.1, h = sz * 1.6, sc = 1 + 1.2 * (1 - cl(p * 1.0));
  return `<g transform="translate(${cx} ${cy}) rotate(${rot}) scale(${p >= 1 ? 1 : sc})" opacity="${cl(p * 3)}">
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="8" fill="none" stroke="${col}" stroke-width="${sz * .09}"/>
    <rect x="${-w / 2 + sz * .16}" y="${-h / 2 + sz * .16}" width="${w - sz * .32}" height="${h - sz * .32}" rx="5" fill="none" stroke="${col}" stroke-width="${sz * .04}"/>
    ${TX(str, 0, sz * .36, sz, col, 'middle', 'letter-spacing="3"')}
    ${[0, 1, 2, 3, 4, 5].map(i => `<circle cx="${-w / 2 + w * hash(i + str.length)}" cy="${-h / 2 + h * hash(i * 3 + 1)}" r="${sz * .08}" fill="${P.paper}" opacity=".8"/>`).join('')}
  </g>`;
}
function dayCard(n, x, y, s = 1, flip = 0) { // tear-off calendar block: "TAG n"
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <rect x="-150" y="-70" width="300" height="150" rx="10" fill="#000" opacity=".25" transform="translate(8 10)"/>
    <rect x="-150" y="-70" width="300" height="150" rx="10" fill="${P.paperHi}" ${OL(5)}/>
    <rect x="-150" y="-70" width="300" height="34" rx="8" fill="${P.red}" ${OL(5)}/>
    <circle cx="-90" cy="-70" r="9" fill="${P.ink}"/><circle cx="90" cy="-70" r="9" fill="${P.ink}"/>
    <g transform="translate(0 ${-20 * flip}) scale(1 ${1 - .6 * flip})">${TX('TAG ' + n, 0, 52, 70, P.ink, 'middle', 'letter-spacing="2"')}</g>
  </g>`;
}
function polaroid(cx, cy, w, h, rot, inner, id) {
  return `<g transform="translate(${cx} ${cy}) rotate(${rot})">
    <rect x="${-w / 2 - 30 + 14}" y="${-h / 2 - 30 + 18}" width="${w + 60}" height="${h + 150}" fill="#000" opacity=".3"/>
    <rect x="${-w / 2 - 30}" y="${-h / 2 - 30}" width="${w + 60}" height="${h + 150}" fill="${P.paperHi}" ${OL(4)}/>
    <clipPath id="${id}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}"/></clipPath>
    <g clip-path="url(#${id})">${inner}</g>
    <rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="none" ${OL(4)}/>
    <rect x="${-60}" y="${-h / 2 - 60}" width="120" height="44" fill="#E8DDB0" opacity=".75" transform="rotate(4)"/>
  </g>`;
}

// ---------- characters ----------
function arm(sx, sy, a1, a2, side, L1, L2, col, w) {
  const r1 = a1 * Math.PI / 180, r2 = a2 * Math.PI / 180;
  const ex = sx + side * Math.sin(r1) * L1, ey = sy + Math.cos(r1) * L1;
  const hx = ex + side * Math.sin(r2) * L2, hy = ey + Math.cos(r2) * L2;
  const d = `M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx.toFixed(1)} ${hy.toFixed(1)}`;
  return { hx, hy, svg: `<path d="${d}" fill="none" stroke="${P.ink}" stroke-width="${w + 10}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/>` };
}
function ik(side, sx, sy, tx, ty, L1, L2, flip = 1) {
  const dx = tx - sx, dy = ty - sy, D = cl(Math.hypot(dx, dy), 1, L1 + L2 - 1);
  const ad = Math.atan2(side * dx, dy), al = Math.acos(cl((L1 * L1 + D * D - L2 * L2) / (2 * L1 * D), -1, 1));
  const a1 = ad + flip * al, ex = sx + side * Math.sin(a1) * L1, ey = sy + Math.cos(a1) * L1;
  return [a1 * 180 / Math.PI, Math.atan2(side * (tx - ex), ty - ey) * 180 / Math.PI];
}
const reach = (x, y, s, side, tx, ty, flip) => ik(side, side * 120, 34, (tx - x) / s, (ty - y) / s, 145, 135, flip);
function eyesS(o) {
  const lx = cl(o.look || 0, -14, 14), ly = cl(o.lookY || 0, -12, 12), bl = o.blink || 0, es = o.eyeS || 1;
  return [-32, 32].map(ex => `<ellipse cx="${ex}" cy="-4" rx="${13 * es}" ry="${Math.max(2, 15 * es * (1 - bl))}" fill="#F7F0E2" ${OL(4)}/>` + (bl < .6 ? `<circle cx="${ex + lx * .7}" cy="${-3 + ly * .7}" r="${7 * Math.min(es, 1.15)}" fill="${P.ink}"/>` : '')).join('');
}
function browsS(type, y0 = -32) {
  const B = { calm: [[-50, 2, -16, 0], [16, 0, 50, 2]], worry: [[-50, 4, -16, -8], [16, -8, 50, 4]], up: [[-50, -8, -16, -12], [16, -12, 50, -8]], angry: [[-50, -6, -16, 6], [16, 6, 50, -6]] }[type || 'calm'];
  return B.map(b => `<path d="M ${b[0]} ${y0 + b[1]} L ${b[2]} ${y0 + b[3]}" stroke="${P.ink}" stroke-width="9" stroke-linecap="round"/>`).join('');
}
function mouthS(m, talk, y) {
  if (talk > .05 || m === 'o') { const ry = m === 'o' ? 14 : 4 + 13 * talk; return `<ellipse cx="0" cy="${y}" rx="${m === 'o' ? 12 : 17}" ry="${ry}" fill="#4A1E16" ${OL(4)}/>`; }
  if (m === 'smile') return `<path d="M -24 ${y - 5} Q 0 ${y + 16} 24 ${y - 5}" fill="none" ${OL(5)}/>`;
  if (m === 'grin') return `<path d="M -30 ${y - 7} Q 0 ${y + 32} 30 ${y - 7} Z" fill="#4A1E16" ${OL(4)}/><path d="M -22 ${y - 2} L 22 ${y - 2}" stroke="#F7F0E2" stroke-width="6"/>`;
  if (m === 'worried') return `<path d="M -22 ${y + 4} q 7 -9 14 0 q 7 9 14 0 q 7 -9 14 0" fill="none" ${OL(4)}/>`;
  return `<path d="M -18 ${y} L 18 ${y}" fill="none" ${OL(5)}/>`;
}
// miner head: white helmet with lamp; o.var 0..2 changes moustache / skin tone; o.lamp 0..1
function mHead(o = {}) {
  const v = o.var || 0, sk = v === 2 ? '#D49E78' : P.skin, lamp = o.lamp ?? 1, dirt = o.dirt || 0;
  return `<g transform="rotate(${o.tilt || 0})">
   <circle cx="-82" cy="10" r="18" fill="${P.skinSh}" ${OL(4)}/><circle cx="82" cy="10" r="18" fill="${P.skinSh}" ${OL(4)}/>
   <ellipse cx="0" cy="8" rx="82" ry="96" fill="${sk}" ${OL(5)}/>
   <path d="M -78 30 Q -70 100 0 104 Q 70 100 78 30 Q 50 74 0 74 Q -50 74 -78 30 Z" fill="${P.skinSh}" opacity=".55"/>
   ${dirt ? `<ellipse cx="-44" cy="40" rx="20" ry="12" fill="${P.ink}" opacity="${.25 * dirt}"/><ellipse cx="30" cy="-30" rx="16" ry="9" fill="${P.ink}" opacity="${.2 * dirt}"/>` : ''}
   <path d="M -4 4 Q -12 28 0 32 Q 8 33 12 28" fill="none" stroke="${P.skinSh}" stroke-width="6" stroke-linecap="round"/>
   ${v === 1 ? `<path d="M -38 48 Q 0 32 38 48 Q 20 60 0 54 Q -20 60 -38 48 Z" fill="${P.ink}"/>` : ''}
   ${eyesS(o)}${browsS(o.brow)}
   ${mouthS(o.mouth || 'flat', o.talk || 0, 70)}
   <path d="M -96 -38 Q -96 -150 0 -152 Q 96 -150 96 -38 Z" fill="${P.helm}" ${OL(5)}/>
   <path d="M 0 -150 V -40" stroke="${P.helmSh}" stroke-width="10"/>
   <path d="M -116 -36 Q 0 -60 116 -36 Q 0 -22 -116 -36 Z" fill="${P.helmSh}" ${OL(4)}/>
   <rect x="-28" y="-104" width="56" height="44" rx="10" fill="${P.steel}" ${OL(4)}/>
   <circle cx="0" cy="-82" r="16" fill="${lamp > 0 ? P.lampHi : '#3A332C'}" opacity="${.3 + .7 * lamp}" ${OL(3)}/>
   ${lamp > 0 ? `<circle cx="0" cy="-82" r="60" fill="url(#pLamp)" opacity="${lamp}"/>` : ''}
  </g>`;
}
function miner(x, y, s, o = {}) { // origin = centre of shoulder line
  const aL = o.aL || [10, 6], aR = o.aR || [10, 6];
  const L = arm(-120, 34, aL[0], aL[1], -1, 145, 135, P.jack, 58), R = arm(120, 34, aR[0], aR[1], 1, 145, 135, P.jack, 58);
  const hnd = p => `<circle cx="${p.hx.toFixed(1)}" cy="${p.hy.toFixed(1)}" r="25" fill="${P.skin}" ${OL(4)}/>`;
  return `<g transform="translate(${x} ${y}) rotate(${o.lean || 0}) scale(${s})">
    <path d="M -144 44 Q -146 -8 -92 -20 L 92 -20 Q 146 -8 144 44 L 166 540 L -166 540 Z" fill="${P.jack}" ${OL(5)}/>
    <path d="M 66 -14 Q 146 -6 144 44 L 166 540 L 108 540 Z" fill="${P.jackSh}"/>
    <path d="M 0 30 V 540" stroke="${P.jackSh}" stroke-width="6"/>${[110, 200, 290].map(y => `<circle cx="-14" cy="${y}" r="7" fill="${P.ink}"/>`).join('')}
    <rect x="-128" y="150" width="80" height="64" rx="6" fill="none" stroke="${P.jackSh}" stroke-width="6"/><rect x="48" y="150" width="80" height="64" rx="6" fill="none" stroke="${P.jackSh}" stroke-width="6"/>
    ${o.blanket ? `<path d="M -170 -10 Q 0 -60 170 -10 L 190 540 L -190 540 Z" fill="${P.olive}" ${OL(5)}/><path d="M -150 120 H 160 M -160 260 H 170" stroke="#56653B" stroke-width="10"/>` : ''}
    <g transform="translate(${o.hdx || 0} ${-110 + (o.hdy || 0)})">${mHead(o)}</g>
    <path d="M -104 -32 Q 0 34 104 -32 L 112 2 Q 0 66 -112 2 Z" fill="${P.jackHi}" ${OL(4)}/>
    ${o.holdL ? o.holdL(L.hx, L.hy) : ''}${o.holdR ? o.holdR(R.hx, R.hy) : ''}
    ${o.noArmL ? '' : L.svg + hnd(L)}${o.noArmR ? '' : R.svg + hnd(R)}
  </g>`;
}
function armTo(sx, sy, hx, hy, w, flip = 1, col = P.jack) {
  const L = Math.hypot(hx - sx, hy - sy) || 1, h = Math.sqrt(Math.max(0, (L * .56) ** 2 - (L / 2) ** 2));
  const ex = (sx + hx) / 2 + flip * h * (hy - sy) / L, ey = (sy + hy) / 2 - flip * h * (hx - sx) / L;
  const d = `M ${sx} ${sy} L ${ex.toFixed(1)} ${ey.toFixed(1)} L ${hx} ${hy}`;
  return `<path d="${d}" fill="none" stroke="${P.ink}" stroke-width="${w + 12}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${hx}" cy="${hy}" r="${w * .5}" fill="${P.skin}" ${OL(5)}/>`;
}
function helmetIcon(x, y, s, lit) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><path d="M -50 10 Q -50 -50 0 -52 Q 50 -50 50 10 Z" fill="${lit ? P.helm : '#9C9384'}" ${OL(4)}/><path d="M -62 10 H 62" ${OL(8)}/><circle cx="0" cy="-22" r="12" fill="${lit ? P.lampHi : '#5A5048'}" ${OL(3)}/>${lit ? `<circle cx="0" cy="-22" r="46" fill="url(#pLamp)"/>` : ''}</g>`;
}
function silhouette(x, y, s, o = {}) { // simple crowd figure (ink)
  return `<g transform="translate(${x} ${y}) scale(${s})" fill="${o.col || P.ink}"><circle cx="0" cy="-150" r="34"/>${o.hat ? `<ellipse cx="0" cy="-176" rx="44" ry="12"/><rect x="-26" y="-210" width="52" height="34" rx="8"/>` : ''}${o.scarf ? `<path d="M -40 -190 Q 0 -230 40 -190 L 46 -140 L -46 -140 Z"/>` : ''}<path d="M -50 -110 Q 0 -130 50 -110 L 62 0 L -62 0 Z"/>${o.arm ? `<path d="M 40 -100 L ${70} ${-170 - 20 * o.arm}" stroke="${o.col || P.ink}" stroke-width="22" stroke-linecap="round"/>` : ''}</g>`;
}

// ---------- the cross-section of the ground (world coords, surface at y = 0) ----------
// shaft at x 800, tunnels at y 1180 / 1380, pond above the tunnels (x 220..640), "Alter Mann" (x 100..420, y 1250..1460)
const LV = [[0, P.soil], [180, P.marl], [520, P.rock], [980, P.rock2], [1120, P.ore], [1520, P.rock2]];
function section(t, o = {}) {
  const lit = o.lit ?? 1, flood = o.flood || 0, pond = o.pond ?? 1, drill = o.drill || 0, drill2 = o.drill2 || 0;
  let s = `<rect x="-600" y="-900" width="2280" height="900" fill="${o.dawn ? 'url(#pDawn)' : 'url(#pSky)'}"/>`;
  LV.forEach(([y, c], i) => { const y1 = i < LV.length - 1 ? LV[i + 1][0] : 2600; s += `<path d="M -600 ${y} ${[...Array(12)].map((_, k) => `L ${-600 + k * 210} ${y + 14 * Math.sin(k * 1.7 + i)}`).join(' ')} L 1680 ${y} L 1680 ${y1} L -600 ${y1} Z" fill="${c}" ${OL(4)}/>`; });
  for (let i = 0; i < 60; i++) s += `<circle cx="${-500 + hash(i) * 2100}" cy="${60 + hash(i + 40) * 2300}" r="${4 + 8 * hash(i + 7)}" fill="${P.ink}" opacity=".18"/>`;
  // village on the surface
  s += [[60, 120], [170, 150], [300, 110]].map(([x, h]) => `<rect x="${x}" y="${-h}" width="90" height="${h}" fill="${P.paperSh}" ${OL(4)}/><polygon points="${x - 10},${-h} ${x + 45},${-h - 60} ${x + 100},${-h}" fill="${P.red}" ${OL(4)}/><rect x="${x + 30}" y="${-h + 30}" width="26" height="30" fill="${o.night ? P.lamp : P.ink}" opacity="${o.night ? .9 : .5}"/>`).join('');
  s += `<rect x="440" y="-260" width="50" height="260" fill="${P.paperSh}" ${OL(4)}/><polygon points="430,-260 465,-360 500,-260" fill="${P.ink}"/>`;
  // headframe
  s += `<path d="M 740 0 L 790 -380 L 840 0 M 760 -150 H 820 M 770 -260 H 810 M 840 0 L 950 -300 L 800 -380" stroke="${P.ink}" stroke-width="12" fill="none"/>
   <g transform="translate(800 -390) rotate(${o.wheel || 0})"><circle r="44" fill="none" stroke="${P.ink}" stroke-width="10"/><path d="M -44 0 H 44 M 0 -44 V 44 M -31 -31 L 31 31 M -31 31 L 31 -31" stroke="${P.ink}" stroke-width="5"/></g>`;
  // pond (Klärteich)
  if (pond > 0) s += `<path d="M 200 0 Q 230 110 420 120 Q 610 110 650 0 Z" fill="url(#pMud)" ${OL(5)}/><path d="M 230 8 Q 420 ${18 + 6 * Math.sin(t * 2)} 620 8" stroke="${P.mudHi}" stroke-width="10" fill="none"/>`;
  else s += `<path d="M 200 0 Q 230 110 420 120 Q 610 110 650 0 Z" fill="${P.tun}" ${OL(5)}/><path d="M 380 115 L 440 1180 L 470 1180 L 460 115 Z" fill="${P.tun}"/>`;
  // shaft + tunnels
  s += `<rect x="780" y="0" width="44" height="1420" fill="${P.tun}" ${OL(4)}/>
   <rect x="140" y="1160" width="680" height="44" fill="${P.tun}" ${OL(4)}/><rect x="440" y="1360" width="380" height="44" fill="${P.tun}" ${OL(4)}/>
   <path d="M 440 1204 L 500 1360 L 540 1360 L 480 1204 Z" fill="${P.tun}"/>`;
  // Alter Mann: collapsed old workings with a hollow
  s += `<path d="M 100 1260 L 160 1240 L 220 1268 L 300 1236 L 380 1262 L 430 1250 L 420 1460 L 360 1440 L 280 1470 L 190 1446 L 110 1462 Z" fill="#5C4C3E" ${OL(4)}/>
   ${[[150, 1300], [210, 1390], [330, 1300], [370, 1400], [260, 1430]].map(([x, y], i) => `<polygon points="${x - 30},${y} ${x},${y - 26} ${x + 34},${y + 4} ${x + 6},${y + 26}" fill="#4A3C30" ${OL(3)}/>`).join('')}
   <ellipse cx="${o.voidX || 255}" cy="1345" rx="62" ry="34" fill="${P.dark}" ${OL(4)}/>`;
  // flood (mud) running down the crack and through the tunnels
  if (flood > 0) {
    const f1 = cl(flood * 2), f2 = cl(flood * 2 - 1);
    s += `<rect x="410" y="120" width="40" height="${1060 * f1}" fill="url(#pMud)"/>`;
    if (f1 >= 1) s += `<rect x="${440 - 300 * f2}" y="1162" width="${40 + 680 * f2}" height="40" fill="${P.mud}"/><rect x="440" y="1362" width="${380 * cl(f2 * 1.4 - .3)}" height="40" fill="${P.mud}"/><rect x="782" y="${1400 - 1400 * f2 * .25}" width="40" height="${1400 * f2 * .25}" fill="${P.mud}"/>`;
  }
  // miners' lamps in the tunnels (129 dots on the counter shot; a few elsewhere)
  const n = o.dots || 0;
  for (let i = 0; i < n; i++) {
    const row = i % 3, x = row === 2 ? 470 + hash(i) * 330 : 160 + hash(i * 1.3) * 640, y = row === 2 ? 1382 : 1182;
    const goneAt = o.floodDots ? (row === 2 ? .7 : .45 + .5 * Math.abs(x - 440) / 680) : 9;
    if (i / n > lit) continue;
    const on = flood < goneAt;
    s += `<circle cx="${x}" cy="${y}" r="7" fill="${on ? P.lampHi : '#3A332C'}"/>${on ? `<circle cx="${x}" cy="${y}" r="18" fill="url(#pLamp)"/>` : ''}`;
  }
  // drills from the surface
  if (drill > 0) s += `<rect x="${(o.voidX || 255) - 4}" y="0" width="8" height="${1340 * drill}" fill="${P.steel}" ${OL(2)}/>`;
  if (drill2 > 0) s += `<rect x="${(o.voidX || 255) + 30}" y="0" width="34" height="${1330 * drill2}" fill="${P.tun}" ${OL(3)}/>`;
  if (o.cap !== undefined) s += `<g transform="translate(${(o.voidX || 255) + 47} ${o.cap})"><rect x="-13" y="-90" width="26" height="110" rx="12" fill="${P.steel}" ${OL(3)}/><line x1="0" y1="-90" x2="0" y2="${-o.cap - 90}" stroke="${P.ink}" stroke-width="3"/></g>`;
  return s;
}
const cam = (cx, cy, z, inner) => `<g transform="translate(540 820) scale(${z}) translate(${-cx} ${-cy})">${inner}</g>`;

// ---------- shots ----------
function minerPolaroid(t, lamp, q) {
  const inner = `<rect x="-400" y="-400" width="800" height="800" fill="${P.dark}"/>
    <ellipse cx="0" cy="40" rx="${380 * lamp}" ry="${380 * lamp}" fill="url(#pLamp)" opacity=".5"/>
    ${miner(0, 230, 1.15, { lamp, look: 0, lookY: 0, brow: 'worry', mouth: 'flat', dirt: 1, blink: blinkAt(t, .4), var: 1 })}
    <rect x="-400" y="-400" width="800" height="800" fill="${P.dark}" opacity="${.75 * (1 - lamp)}"/>`;
  return polaroid(540, 760, 780, 780, -3, inner, 'pPol' + (q ? 'b' : 'a'));
}
function s01(t) { // hook: the miner in the dark, TAG 1 → 14
  const n = t < .5 ? 1 : Math.min(14, 1 + Math.floor((t - .5) / (1.5 / 13)));
  const fl = t > 1.2 && t < 1.32 ? .4 : 1;
  const [sx, sy] = shk(t, 1.99, 10, 7);
  return `${paperBg()}<g transform="translate(${sx} ${sy}) translate(540 900) scale(${1 + .04 * prog(t, 0, 2.5)}) translate(-540 -900)">${minerPolaroid(t, fl, 0)}</g>
   ${dayCard(n, 540, 260, 1.15, n < 14 ? ((t - .5) / (1.5 / 13)) % 1 * .3 : 0)}`;
}
function s02(t) { // camera sinks from the village to the deep tunnels
  const p = eio(prog(t, 2.6, 5.2)), cy = lerp(-150, 1180, p);
  return `${paperBg()}${cam(540, cy, 1.25, section(t, { dots: 18, night: 1, wheel: t * 40 }))}
   <path d="M 1000 ${300} V ${1300}" stroke="${P.ink}" stroke-width="6" stroke-dasharray="18 12"/><polygon points="980,1290 1000,1340 1020,1290" fill="${P.ink}"/>`;
}
function s03(t) { // headframe sketch on paper + stamp LENGEDE · 1963
  const p = prog(t, 5.55, 5.8), wh = t * 60;
  const draw = eout(prog(t, 5.47, 6.6));
  return `${paperBg()}
   <g transform="translate(540 1000)">
    <path d="M -420 260 H 420" stroke="${P.ink}" stroke-width="8"/>
    <g stroke="${P.ink}" stroke-width="16" fill="none" stroke-linecap="round" pathLength="1" style="stroke-dasharray:${draw} 1">
     <path d="M -120 260 L -20 -380 L 80 260" pathLength="1"/><path d="M 80 260 L 300 -200 L -20 -380" pathLength="1"/><path d="M -90 60 H 50 M -60 -140 H 20" pathLength="1"/></g>
    <g transform="translate(-20 -400) rotate(${wh})"><circle r="70" fill="none" stroke="${P.ink}" stroke-width="12"/><path d="M -70 0 H 70 M 0 -70 V 70 M -50 -50 L 50 50 M -50 50 L 50 -50" stroke="${P.ink}" stroke-width="6"/></g>
    <rect x="-380" y="120" width="200" height="140" fill="${P.paperSh}" ${OL(5)}/><polygon points="-395,120 -280,40 -165,120" fill="${P.red}" ${OL(5)}/>
    <rect x="160" y="140" width="220" height="120" fill="${P.paperSh}" ${OL(5)}/><rect x="200" y="60" width="40" height="80" fill="${P.ink}"/>
    ${[0, 1, 2].map(i => `<circle cx="${220 + i * 40 + 20 * Math.sin(t * 2 + i)}" cy="${30 - ((t * 60 + i * 40) % 120)}" r="${20 + i * 6}" fill="${P.paperSh}" opacity=".7"/>`).join('')}
   </g>
   ${stamp('LENGEDE · 1963', 540, 420, 76, p)}`;
}
function s04(t) { // evening clock: just before eight
  const m = lerp(53, 56, prog(t, 8.46, 10.94));
  const ma = m / 60 * 360, ha = (7 + m / 60) / 12 * 360;
  const sp = back(prog(t, 8.5, 8.8));
  return `${paperBg()}
   <rect x="0" y="0" width="1080" height="900" fill="url(#pSky)" opacity=".9"/>
   ${section(t, { night: 1, wheel: t * 50 }).slice(0, 0)}
   <path d="M 0 900 L 0 760 L 200 760 L 200 700 L 360 700 L 360 780 L 1080 780 L 1080 900 Z" fill="${P.ink}"/>
   <path d="M 640 780 L 700 360 L 760 780 M 760 780 L 900 460 L 700 360" stroke="${P.ink}" stroke-width="14" fill="none"/><g transform="translate(700 350) rotate(${t * 80})"><circle r="40" fill="none" stroke="${P.ink}" stroke-width="10"/><path d="M -40 0 H 40 M 0 -40 V 40" stroke="${P.ink}" stroke-width="5"/></g>
   ${[[90, 800], [270, 740]].map(([x, y]) => `<rect x="${x}" y="${y}" width="24" height="24" fill="${P.lamp}"/>`).join('')}
   <g transform="translate(540 1150) scale(${sp})">
    <circle r="250" fill="${P.paperHi}" ${OL(10)}/><circle r="220" fill="none" stroke="${P.ink}" stroke-width="3"/>
    ${[...Array(12)].map((_, i) => `<line x1="${200 * Math.sin(i * Math.PI / 6)}" y1="${-200 * Math.cos(i * Math.PI / 6)}" x2="${170 * Math.sin(i * Math.PI / 6)}" y2="${-170 * Math.cos(i * Math.PI / 6)}" stroke="${P.ink}" stroke-width="${i % 3 ? 6 : 12}"/>`).join('')}
    <line x1="0" y1="0" x2="${110 * Math.sin(ha * Math.PI / 180)}" y2="${-110 * Math.cos(ha * Math.PI / 180)}" stroke="${P.ink}" stroke-width="18" stroke-linecap="round"/>
    <line x1="0" y1="0" x2="${180 * Math.sin(ma * Math.PI / 180)}" y2="${-180 * Math.cos(ma * Math.PI / 180)}" stroke="${P.ink}" stroke-width="10" stroke-linecap="round"/>
    <circle r="16" fill="${P.red}" ${OL(4)}/>
   </g>`;
}
function s05(t) { // three miners step into the cage, the gate slams
  const g = eio(prog(t, 12.0, 12.35)), [sx, sy] = shk(t, 12.35, 10);
  return `<g transform="translate(${sx} ${sy})"><rect x="0" y="0" width="1080" height="1920" fill="${P.tun}"/>
   <rect x="120" y="300" width="840" height="1100" fill="#3A302A" ${OL(6)}/>
   ${[0, 1, 2].map(i => miner(300 + i * 240, 1000 + (i % 2) * 30, .72, { lamp: 1, var: i, look: i === 1 ? 0 : (i === 0 ? 8 : -8), brow: 'calm', mouth: i === 2 ? 'smile' : 'flat', blink: blinkAt(t, i * .7), dirt: .3 })).join('')}
   <ellipse cx="540" cy="700" rx="500" ry="400" fill="url(#pLamp)" opacity=".35"/>
   <g transform="translate(0 ${-900 * (1 - g)})">${[...Array(9)].map((_, i) => `<line x1="${150 + i * 98}" y1="300" x2="${150 + i * 98}" y2="1400" stroke="${P.steel}" stroke-width="12"/>`).join('')}<rect x="120" y="1380" width="840" height="24" fill="${P.steel}" ${OL(4)}/></g>
   <rect x="100" y="280" width="880" height="40" fill="${P.steelSh}" ${OL(5)}/></g>`;
}
function s06(t) { // all the lamps underground: 129
  const lit = prog(t, 12.6, 13.43), n = Math.round(129 * lit);
  return `${paperBg()}${cam(480, 1260, 1.6, section(t, { dots: 129, lit }))}
   <g transform="translate(540 330)">${TX(String(n), 0, 60, 190, P.ink, 'middle', `stroke="${P.paperHi}" stroke-width="10" paint-order="stroke"`)}</g>
   ${helmetIcon(540, 470, .9, true)}`;
}
function s07(t) { // camera rises: the mud pond sits right above the tunnels
  const p = eio(prog(t, 14.5, 16.4));
  const ar = prog(t, 15.9, 16.4);
  return `${paperBg()}${cam(450, lerp(1150, 420, p), lerp(1.4, 1.0, p), section(t, { dots: 30, night: 1 }) + (ar > 0 ? `<path d="M 1000 1150 V ${1150 - 1000 * ar}" stroke="${P.red}" stroke-width="10" stroke-dasharray="24 14"/><polygon points="980,${1170 - 1000 * ar} 1000,${1120 - 1000 * ar} 1020,${1170 - 1000 * ar}" fill="${P.red}"/>` : ''))}`;
}
function s08(t) { // close on the pond: mud bubbles, the dam cracks
  let b = ''; for (let i = 0; i < 7; i++) { const ph = ((t * .9 + hash(i)) % 1); b += `<circle cx="${180 + hash(i * 3) * 720}" cy="${980 - ph * 40}" r="${8 + 30 * ph}" fill="none" stroke="${P.mudHi}" stroke-width="${6 * (1 - ph)}"/>`; }
  const cr = eout(prog(t, 17.4, 18.8));
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pSky)"/>
   <path d="M 0 760 Q 540 700 1080 760 V 1920 H 0 Z" fill="${P.soil}" ${OL(5)}/>
   <path d="M 60 860 Q 540 800 1020 860 L 940 1300 Q 540 1360 140 1300 Z" fill="url(#pMud)" ${OL(5)}/>
   ${b}
   <path d="M 120 900 Q 540 ${860 + 8 * Math.sin(t * 2)} 960 900" fill="none" stroke="${P.mudHi}" stroke-width="10"/>
   <path d="M 540 1340 l -30 ${80 * cr} l 40 ${60 * cr} l -20 ${90 * cr} l 50 ${80 * cr}" fill="none" stroke="${P.ink}" stroke-width="8"/>
   <path d="M 540 1340 l 50 ${50 * cr} l -10 ${70 * cr}" fill="none" stroke="${P.ink}" stroke-width="6"/>
   ${[[90, 780], [960, 790]].map(([x, y]) => `<path d="M ${x} ${y} l -10 -60 M ${x + 20} ${y} l 10 -70 M ${x + 40} ${y} l 0 -50" stroke="${P.olive}" stroke-width="7"/>`).join('')}
   ${PAPERTEX}`;
}
function s09(t) { // the pond floor breaks: mud pours into the depth
  const [sx, sy] = shk(t, 19.4, 22, 4);
  const f = eout(prog(t, 19.4, 20.4));
  return `<g transform="translate(${sx} ${sy})"><rect x="0" y="0" width="1080" height="1920" fill="url(#pSky)"/>
   <path d="M 0 760 Q 540 700 1080 760 V 1920 H 0 Z" fill="${P.soil}" ${OL(5)}/>
   <path d="M 60 860 Q 540 800 1020 860 L 940 1300 Q 540 1360 140 1300 Z" fill="url(#pMud)" ${OL(5)}/>
   ${f > 0 ? `<path d="M ${540 - 260 * f} 1310 Q 540 ${1340 + 300 * f} ${540 + 260 * f} 1310 L ${540 + 120 * f} 1920 L ${540 - 120 * f} 1920 Z" fill="${P.tun}"/>
     <path d="M ${540 - 200 * f} 900 Q 540 ${900 + 420 * f} ${540 + 200 * f} 900" fill="none" stroke="${P.mudHi}" stroke-width="16"/>
     ${[...Array(8)].map((_, i) => `<path d="M ${540 + (i - 3.5) * 40 * f} 1000 Q ${540 + (i - 3.5) * 20 * f} ${1300 + 100 * f} ${540 + (i - 3.5) * 10} 1920" stroke="${P.mud}" stroke-width="${18 + 6 * hash(i)}" fill="none" opacity=".9"/>`).join('')}` : `<path d="M 540 1340 l -30 80 l 40 60 l -20 90 l 50 80" fill="none" stroke="${P.ink}" stroke-width="8"/>`}
   ${t > 19.4 ? [...Array(10)].map((_, i) => { const dt = t - 19.4; return `<polygon points="0,-16 16,0 0,16 -16,0" transform="translate(${540 + (hash(i) - .5) * 600} ${1300 + 900 * dt * dt * (0.6 + hash(i + 3))}) rotate(${dt * 400 * hash(i)})" fill="${P.soil}" ${OL(3)}/>`; }).join('') : ''}
   ${PAPERTEX}</g>`;
}
function s10(t) { // the flood runs through the section, lamps go out
  const fl = eio(prog(t, 20.9, 23.3));
  return `${paperBg()}${cam(480, 760, 0.95, section(t, { dots: 60, flood: fl, floodDots: 1, pond: 0, night: 1 }))}`;
}
function s11(t) { // tunnel: a miner runs toward us, the mud wave behind him
  const w = eio(prog(t, 23.4, 26.5)), wx = lerp(-200, 1300, w) * 0 + 0;
  const run = Math.sin(t * 14), bob = 12 * Math.abs(run);
  const ms = lerp(.55, 1.05, prog(t, 23.4, 26.4));
  const waveS = lerp(.55, 1.8, eio(prog(t, 23.4, 26.86)));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.tun}"/>
   <polygon points="0,200 1080,200 700,760 380,760" fill="#3A302A"/><polygon points="0,1500 1080,1500 700,1000 380,1000" fill="#33281F"/>
   <polygon points="0,200 380,760 380,1000 0,1500" fill="#2E251E"/><polygon points="1080,200 700,760 700,1000 1080,1500" fill="#2E251E"/>
   ${[0, 1, 2, 3].map(i => { const z = ((t * .6 + i / 4) % 1), sc = .2 + z * 1.2; return `<rect x="${540 - 380 * sc}" y="${880 - 360 * sc}" width="${760 * sc}" height="${700 * sc}" fill="none" stroke="#5A4A3A" stroke-width="${4 + 14 * z}"/>`; }).join('')}
   <g transform="translate(540 880) scale(${waveS})"><path d="M -400 300 Q -300 -200 0 -260 Q 300 -200 400 300 Z" fill="url(#pMud)" ${OL(5)}/>${[0, 1, 2].map(i => `<path d="M ${-300 + i * 200} -150 q 40 -60 80 0" fill="none" stroke="${P.mudHi}" stroke-width="12"/>`).join('')}</g>
   ${miner(540, 1000 - bob * ms, ms, { lamp: 1, var: 2, brow: 'up', mouth: 'o', eyeS: 1.2, aL: [40 + 30 * run, 60], aR: [40 - 30 * run, 60], lean: 4 * run, dirt: 1 })}
   <polygon points="0,1500 1080,1500 1080,1920 0,1920" fill="#1E1916"/>
   ${GRAIN}`;
}
function s12(t) { // the cage climbs: 79 make it out
  const n = Math.round(79 * prog(t, 26.86, 27.36)), y = lerp(1250, 450, eio(prog(t, 26.9, 28.6)));
  return `${paperBg()}
   <rect x="380" y="0" width="320" height="1920" fill="${P.tun}" ${OL(5)}/>${[...Array(12)].map((_, i) => `<line x1="380" y1="${(i * 180 + t * 600) % 2000 - 80}" x2="700" y2="${(i * 180 + t * 600) % 2000 - 80}" stroke="#3A302A" stroke-width="10"/>`).join('')}
   <line x1="540" y1="0" x2="540" y2="${y - 300}" stroke="${P.steel}" stroke-width="10"/>
   <g transform="translate(540 ${y})"><rect x="-150" y="-300" width="300" height="420" fill="#3A302A" ${OL(5)}/>
    ${[-80, 0, 80].map((x, i) => `<g transform="translate(${x} -40)">${mHead({ lamp: 1, var: i, brow: 'worry', mouth: 'flat', dirt: 1, tilt: 5 * (i - 1) })}</g>`.replace(/<g transform="rotate/g, `<g transform="scale(.45) rotate`)).join('')}
    ${[...Array(5)].map((_, i) => `<line x1="${-150 + i * 75}" y1="-300" x2="${-150 + i * 75}" y2="120" stroke="${P.steel}" stroke-width="7"/>`).join('')}</g>
   <g transform="translate(860 500)">${TX(String(n), 0, 60, 180, P.ink, 'middle', `stroke="${P.paperHi}" stroke-width="10" paint-order="stroke"`)}</g>
   ${helmetIcon(860, 640, .8, true)}`;
}
function s13(t) { // night surface: a miner comes out, wrapped in a blanket
  const step = eio(prog(t, 28.6, 29.6));
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pSky)"/>
   <path d="M 120 1250 L 300 300 L 480 1250 M 480 1250 L 800 500 L 300 300" stroke="${P.ink}" stroke-width="22" fill="none"/>
   <rect x="0" y="1250" width="1080" height="670" fill="#4A4038"/>
   <rect x="140" y="760" width="340" height="490" fill="${P.ink}"/><rect x="170" y="800" width="280" height="450" fill="${P.lamp}" opacity=".55"/>
   ${miner(lerp(310, 620, step), 1000, .8, { blanket: 1, lamp: 0, var: 1, brow: 'worry', mouth: 'flat', look: -6, lookY: 4, dirt: 1, noArmL: true, noArmR: true, lean: 3 * Math.sin(t * 6) })}
   ${silhouette(860, 1420, 1.3, { col: '#2A2420', hat: 1 })}${silhouette(160, 1460, 1.2, { col: '#2A2420', scarf: 1 })}
   ${[0, 1, 2].map(i => `<circle cx="${lerp(310, 620, step) + 40 + i * 30}" cy="${880 - 40 * ((t * 1.2 + i * .3) % 1)}" r="${14 + 12 * ((t * 1.2 + i * .3) % 1)}" fill="#E8E2D6" opacity="${.5 * (1 - (t * 1.2 + i * .3) % 1)}"/>`).join('')}
   ${GRAIN}`;
}
function s14(t) { // families wait at the pit gate in the rain
  let rain = ''; for (let i = 0; i < 50; i++) { const y = (hash(i) * 1920 + t * 1600) % 1920, x = hash(i + 9) * 1080; rain += `<line x1="${x}" y1="${y}" x2="${x - 12}" y2="${y + 50}" stroke="#C8CCD0" stroke-width="3" opacity=".5"/>`; }
  const sw = 6 * Math.sin(t * 2.5);
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pSky)"/>
   <path d="M 600 1100 L 760 300 L 920 1100" stroke="${P.ink}" stroke-width="18" fill="none"/>
   <rect x="0" y="1100" width="1080" height="820" fill="#3E3630"/>
   ${[...Array(12)].map((_, i) => `<line x1="${i * 96}" y1="950" x2="${i * 96}" y2="1250" stroke="${P.ink}" stroke-width="12"/>`).join('')}<line x1="0" y1="980" x2="1080" y2="980" stroke="${P.ink}" stroke-width="10"/><line x1="0" y1="1120" x2="1080" y2="1120" stroke="${P.ink}" stroke-width="10"/>
   <g transform="rotate(${sw} 300 520)"><line x1="300" y1="300" x2="300" y2="520" stroke="${P.ink}" stroke-width="6"/><rect x="270" y="520" width="60" height="80" rx="10" fill="${P.lamp}" ${OL(4)}/></g><ellipse cx="300" cy="600" rx="300" ry="260" fill="url(#pLamp)" opacity=".7"/>
   ${silhouette(200, 1420, 1.5, { col: '#231E1A', scarf: 1 })}${silhouette(420, 1440, 1.6, { col: '#231E1A', hat: 1, arm: .5 + .5 * Math.sin(t * 1.5) })}${silhouette(640, 1430, 1.2, { col: '#231E1A', scarf: 1 })}${silhouette(840, 1450, 1.55, { col: '#231E1A', hat: 1 })}
   ${rain}${GRAIN}`;
}
function iconsRow(t, n, total, t0, dt, y = 1000, s = 1) {
  let r = ''; const cols = total <= 7 ? total : 6, sp = Math.min(150, 960 / cols);
  for (let i = 0; i < total; i++) { const c = i % cols, row = Math.floor(i / cols), lit = i < n && t > t0 + i * dt; const p = lit ? back(prog(t, t0 + i * dt, t0 + i * dt + .2)) : 1; r += `<g transform="translate(${540 + (c - (cols - 1) / 2) * sp} ${y + row * 160}) scale(${p})">${helmetIcon(0, 0, s, lit)}</g>`; }
  return r;
}
function s15(t) { // TAG 1: seven are rescued
  const fl = prog(t, 33.12, 33.4);
  return `${paperBg()}${dayCard(1, 540, 330, 1.3, fl < 1 ? fl : 0)}
   ${iconsRow(t, 7, 7, 34.2, .14, 900, 1.1)}
   ${polaroid(540, 1300, 520, 200, 2, `<rect x="-300" y="-200" width="600" height="400" fill="url(#pSky)"/><path d="M -100 100 L -40 -90 L 20 100" stroke="${P.ink}" stroke-width="10" fill="none"/><rect x="-300" y="80" width="600" height="40" fill="${P.ink}"/>`, 'pPol15')}`;
}
function s16(t) { // TAG 8: a narrow bore hole, three more
  const fl = prog(t, 35.84, 36.1), d = eio(prog(t, 36.2, 38.3));
  return `${paperBg()}
   ${cam(560, 640, .62, section(t, { drill: 0, night: 1 }) + `<rect x="596" y="0" width="10" height="${1150 * d}" fill="${P.steel}" ${OL(2)}/><ellipse cx="601" cy="1182" rx="70" ry="30" fill="${P.dark}" ${OL(3)}/>`)}
   ${dayCard(8, 540, 260, 1.15, fl < 1 ? fl : 0)}
   ${iconsRow(t, 3, 3, 38.72, .16, 1240, 1.1)}`;
}
function s17(t) { // little hope: rain, the wheel stands still, the lantern sinks low
  let rain = ''; for (let i = 0; i < 60; i++) { const y = (hash(i) * 1920 + t * 1700) % 1920, x = hash(i + 4) * 1080; rain += `<line x1="${x}" y1="${y}" x2="${x - 14}" y2="${y + 56}" stroke="#C8CCD0" stroke-width="3" opacity=".45"/>`; }
  const dim = 1 - .7 * prog(t, 40.3, 41.6), fl = prog(t, 39.7, 39.95);
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pSky)"/>
   <path d="M 260 1300 L 540 260 L 820 1300 M 380 860 H 700 M 450 560 H 630" stroke="${P.ink}" stroke-width="22" fill="none"/>
   <g transform="translate(540 240)"><circle r="90" fill="none" stroke="${P.ink}" stroke-width="16"/><path d="M -90 0 H 90 M 0 -90 V 90" stroke="${P.ink}" stroke-width="8"/></g>
   <rect x="0" y="1300" width="1080" height="620" fill="#3E3630"/>
   <rect x="160" y="1100" width="60" height="90" rx="10" fill="${P.lamp}" opacity="${dim}" ${OL(4)}/><ellipse cx="190" cy="1150" rx="${260 * dim}" ry="${220 * dim}" fill="url(#pLamp)"/>
   ${rain}
   ${dayCard(9, 760, 1180, .9, fl < 1 ? fl : 0)}${GRAIN}`;
}
function s18(t) { // miners insist: one slams the plan, marks the last spot
  const slam = t > 42.98 ? 1 : eio(prog(t, 42.6, 42.98)), [sx, sy] = shk(t, 42.98, 10);
  const mark = eout(prog(t, 44.3, 44.7));
  const plan = `<rect x="80" y="1080" width="920" height="420" fill="${P.paperHi}" ${OL(6)}/><path d="M 120 1200 H 960 M 120 1330 H 960 M 300 1100 V 1480" stroke="${P.brown}" stroke-width="10"/><path d="M 220 1190 L 270 1172 L 320 1196 L 370 1176 L 420 1198 L 420 1270 L 220 1270 Z" fill="${P.paperSh}" stroke="${P.brown}" stroke-width="5"/>
     <path d="M 305 1195 l ${50 * mark} ${50 * mark} M 355 1195 l ${-50 * mark} ${50 * mark}" stroke="${P.red}" stroke-width="14" stroke-linecap="round"/>`;
  return `<g transform="translate(${sx} ${sy})"><rect x="0" y="0" width="1080" height="1920" fill="#4A3E34"/>
   <ellipse cx="540" cy="500" rx="600" ry="500" fill="url(#pLamp)" opacity=".5"/><line x1="540" y1="0" x2="540" y2="180" stroke="${P.ink}" stroke-width="6"/><path d="M 470 230 Q 540 150 610 230 Z" fill="${P.steelSh}" ${OL(4)}/>
   ${miner(150, 820, .72, { var: 1, lamp: 0, brow: 'worry', mouth: 'flat', look: 12, lookY: 10 })}
   ${miner(820, 820, .78, { var: 2, lamp: 0, brow: 'calm', mouth: 'flat', look: -12, lookY: 10, aL: [30, -40] })}
   ${plan}
   ${miner(470, 900, .9, { var: 0, lamp: 0, brow: 'angry', mouth: t > 42.0 && t < 43.6 ? 'o' : 'flat', talk: 0, look: -6, lookY: 12, aL: reach(470, 900, .9, -1, 330, lerp(1010, 1225, slam)), aR: [20, 10] })}
   ${t > 42.98 ? `<circle cx="330" cy="1225" r="${40 + 160 * prog(t, 42.98, 43.4)}" fill="none" stroke="${P.ink}" stroke-width="${8 * (1 - prog(t, 42.98, 43.4))}"/>` : ''}
   ${GRAIN}</g>`;
}
function s19(t) { // zoom into the "Alter Mann": old, collapsed workings
  const p = eio(prog(t, 45.8, 47.6));
  return `${paperBg()}${cam(lerp(480, 265, p), lerp(760, 1340, p), lerp(.95, 2.6, p), section(t, { night: 1 }))}`;
}
function s20(t) { // collapse: roof slabs drop, dust
  const [sx, sy] = shk(t, 47.85, 14, 5);
  let slabs = '';
  [[-260, 47.8], [40, 48.3], [260, 49.2], [-80, 50.0]].forEach(([x, t0], i) => { const p = ein(prog(t, t0, t0 + .35)); slabs += `<polygon points="${-120},-40 ${110},-30 ${130},40 ${-100},50" transform="translate(${540 + x} ${lerp(420, 1060 - 40 * i, p)}) rotate(${lerp(0, 12 * (i % 2 ? 1 : -1), p)})" fill="${i % 2 ? '#5C4C3E' : '#4A3C30'}" ${OL(5)}/>`; });
  let dust = ''; for (let i = 0; i < 14; i++) { const dt = t - 47.85; if (dt > 0) dust += `<circle cx="${540 + (hash(i) - .5) * 900 * cl(dt)}" cy="${1060 - 200 * hash(i + 5) * cl(dt)}" r="${30 + 60 * cl(dt * .8)}" fill="${P.paperSh}" opacity="${.35 * (1 - prog(dt, 0, 2.5))}"/>`; }
  return `<g transform="translate(${sx} ${sy})"><rect x="0" y="0" width="1080" height="1920" fill="${P.dark}"/>
   <rect x="0" y="0" width="1080" height="400" fill="#5C4C3E" ${OL(5)}/><rect x="0" y="1100" width="1080" height="820" fill="#4A3C30" ${OL(5)}/>
   ${[150, 900].map(x => `<rect x="${x - 40}" y="400" width="80" height="700" fill="#7A6450" ${OL(4)}/>`).join('')}
   <path d="M 470 400 L 520 700 L 480 1100" stroke="#7A6450" stroke-width="70" fill="none"/>
   ${slabs}${dust}
   <ellipse cx="540" cy="760" rx="440" ry="360" fill="url(#pLamp)" opacity=".18"/>${GRAIN}</g>`;
}
function s21(t) { // TAG 10 at dawn: the drill rig turns
  const fl = prog(t, 51.46, 51.75), rot = t * 260;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pDawn)"/>
   <circle cx="820" cy="980" r="110" fill="#F7E2B8" opacity=".9"/>
   <rect x="0" y="1150" width="1080" height="770" fill="${P.soil}" ${OL(5)}/>
   <path d="M 380 1150 L 540 340 L 700 1150 M 430 900 H 650 M 480 640 H 600" stroke="${P.ink}" stroke-width="18" fill="none"/>
   <rect x="520" y="400" width="40" height="760" fill="${P.steel}" ${OL(4)}/>
   <g transform="translate(540 1080)"><ellipse rx="110" ry="30" fill="${P.steelSh}" ${OL(4)}/>${[0, 1, 2, 3].map(i => `<line x1="${100 * Math.cos(rot * Math.PI / 180 + i * Math.PI / 2)}" y1="${26 * Math.sin(rot * Math.PI / 180 + i * Math.PI / 2)}" x2="0" y2="0" stroke="${P.ink}" stroke-width="10"/>`).join('')}</g>
   ${miner(240, 1100, .6, { var: 2, lamp: 1, brow: 'worry', mouth: 'flat', look: 14, lookY: 4 })}${miner(860, 1110, .6, { var: 1, lamp: 1, brow: 'worry', mouth: 'flat', look: -14, lookY: 4 })}
   ${dayCard(10, 540, 250, 1.15, fl < 1 ? fl : 0)}${GRAIN}`;
}
function s22(t) { // the bit breaks into a hollow
  const d = t < 54.92 ? lerp(300, 1010, eio(prog(t, 53.2, 54.92))) : 1010 + 30 * eout(prog(t, 54.92, 55.2));
  const [sx, sy] = shk(t, 54.92, 18, 5);
  let crumbs = ''; if (t > 54.92) for (let i = 0; i < 12; i++) { const dt = t - 54.92; crumbs += `<polygon points="0,-12 12,0 0,12 -12,0" transform="translate(${540 + (hash(i) - .5) * 160 + (hash(i) - .5) * 200 * dt} ${1040 + 700 * dt * dt * (0.5 + hash(i + 2))}) rotate(${300 * dt})" fill="${P.rock}" ${OL(3)}/>`; }
  return `<g transform="translate(${sx} ${sy})"><rect x="0" y="0" width="1080" height="1920" fill="${P.rock2}"/>
   ${[...Array(30)].map((_, i) => `<circle cx="${hash(i) * 1080}" cy="${hash(i + 30) * 1920}" r="${6 + 10 * hash(i + 2)}" fill="${P.ink}" opacity=".18"/>`).join('')}
   <path d="M 0 1040 Q 300 980 540 1040 Q 800 1000 1080 1060 L 1080 1500 Q 540 1560 0 1480 Z" fill="${P.dark}" ${OL(5)}/>
   <rect x="510" y="0" width="60" height="${d}" fill="${P.steel}" ${OL(4)}/>
   <polygon points="510,${d} 570,${d} 540,${d + 70}" fill="${P.steelSh}" ${OL(4)}/>
   ${t > 54.92 ? `<ellipse cx="540" cy="1100" rx="${300 * prog(t, 54.92, 55.5)}" ry="${200 * prog(t, 54.92, 55.5)}" fill="url(#pLamp)" opacity=".25"/>` : ''}
   ${crumbs}${GRAIN}</g>`;
}
function s23(t) { // they knock on the pipe
  const sw = t < 56.1 ? -40 * eout(prog(t, 55.92, 56.1)) : -40 + 40 * eio(prog(t, 56.1, 56.14));
  let rg = ''; for (let k = 0; k < 3; k++) { const p = prog(t, 56.14 + k * .08, 56.6 + k * .08); if (p > 0 && p < 1) rg += `<ellipse cx="540" cy="${1150 + 500 * p}" rx="${60 + 40 * p}" ry="20" fill="none" stroke="${P.ink}" stroke-width="${8 * (1 - p)}"/>`; }
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pDawn)"/><rect x="0" y="1150" width="1080" height="770" fill="${P.soil}" ${OL(5)}/>
   <rect x="510" y="700" width="60" height="1300" fill="${P.steel}" ${OL(4)}/>
   ${miner(300, 900, .9, { var: 0, lamp: 1, brow: 'up', mouth: 'flat', look: 14, lookY: 6, aR: reach(300, 900, .9, 1, 500 + 30 * Math.sin(sw * Math.PI / 180), 1000), holdR: (x, y) => `<g transform="translate(${x} ${y}) rotate(${sw})"><rect x="-10" y="-10" width="160" height="20" rx="6" fill="${P.brown}" ${OL(3)}/><rect x="130" y="-40" width="40" height="80" rx="6" fill="${P.steelSh}" ${OL(3)}/></g>` })}
   ${rg}${GRAIN}`;
}
function s24(t) { // deep below in the dark: a weak knock answers
  const ks = [57.36, 57.8, 58.8];
  let hit = 0, rg = '';
  ks.forEach((k, i) => { hit = Math.max(hit, 1 - Math.abs(t - k) / .12); const p = prog(t, k, k + 1.0); if (p > 0 && p < 1) rg += `<ellipse cx="540" cy="${900 - 700 * p}" rx="${50 + 30 * p}" ry="14" fill="none" stroke="${P.lampHi}" stroke-width="${6 * (1 - p)}" opacity="${(1 - p) * (i === 2 ? .5 : .8)}"/>`; });
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.dark}"/>
   <rect x="520" y="0" width="40" height="1010" fill="#4F5358" ${OL(3)}/>
   <ellipse cx="540" cy="1010" rx="200" ry="90" fill="url(#pLamp)" opacity=".18"/>
   <g opacity=".55">${miner(300, 1250, .9, { var: 1, lamp: 0, brow: 'worry', mouth: 'flat', look: 14, lookY: -8, dirt: 1, noArmR: true, aL: [10, 6] })}</g>
   ${armTo(300 + 120 * .9, 1250 + 34 * .9, 505, Math.round(940 - 30 * hit), 52, 1)}
   <polygon points="480,${920 - 30 * hit} 520,${910 - 30 * hit} 525,${950 - 30 * hit} 485,${960 - 30 * hit}" fill="${P.rock}" ${OL(3)}/>
   <g opacity=".35">${miner(780, 1300, .8, { var: 2, lamp: 0, brow: 'worry', mouth: 'flat', look: -10, lookY: -10, dirt: 1 })}</g>
   ${rg}${GRAIN}`;
}
function s25(t) { // 11 LEBEN
  const p = prog(t, 59.76, 60.0);
  return `${paperBg()}${iconsRow(t, 11, 11, 59.8, .05, 820, 1.0)}
   ${stamp('11 LEBEN', 540, 420, 120, p)}`;
}
function s26(t) { // ten tally marks scratched into the rock
  const last = eout(prog(t, 61.0, 61.35));
  let tl = ''; for (let i = 0; i < 10; i++) { const x = 260 + i * 60 + (i >= 5 ? 60 : 0), dr = i < 9 ? 1 : last; if (i === 4 || i === 9) tl += `<line x1="${x - 250}" y1="${780}" x2="${x - 250 + 260 * dr}" y2="${960 - 0}" stroke="${P.paperHi}" stroke-width="12" stroke-linecap="round" opacity=".85"/>`; else tl += `<line x1="${x}" y1="760" x2="${x}" y2="${760 + 220 * dr}" stroke="${P.paperHi}" stroke-width="12" stroke-linecap="round" opacity=".85"/>`; }
  const hx = last < 1 ? 520 + 250 * last : 780, hy = last < 1 ? 780 + 180 * last : 960;
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.rock2}"/>
   ${[...Array(25)].map((_, i) => `<circle cx="${hash(i) * 1080}" cy="${hash(i + 30) * 1920}" r="${8 + 12 * hash(i + 2)}" fill="${P.ink}" opacity=".2"/>`).join('')}
   <ellipse cx="540" cy="900" rx="500" ry="420" fill="url(#pLamp)" opacity=".12"/>
   ${tl}
   ${miner(1000, 1700, 1.5, { var: 1, lamp: 0, noArmL: true, noArmR: true, brow: 'worry', mouth: 'flat', look: -14, lookY: -10, dirt: 1 })}
   ${armTo(1000 - 120 * 1.5, 1700 + 34 * 1.5, Math.round(hx + 30), Math.round(hy + 30), 90, -1)}
   <polygon points="${hx},${hy} ${hx + 30},${hy - 10} ${hx + 40},${hy + 20} ${hx + 10},${hy + 30}" fill="${P.rock}" ${OL(3)}/>
   <rect x="0" y="1400" width="1080" height="520" fill="${P.dark}" opacity=".6"/>${GRAIN}`;
}
function s27(t) { // no food, no light: empty lunch tin, dead helmet lamp
  const lid = eout(prog(t, 63.3, 63.6)), click = t > 64.26;
  const fl = t > 64.0 && t < 64.26 ? (Math.floor(t * 30) % 2 ? .3 : 1) : (click ? 0 : 1);
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.dark}"/>
   <g transform="translate(330 1100)"><rect x="-200" y="-60" width="400" height="160" rx="18" fill="${P.steel}" ${OL(5)}/><rect x="-180" y="-40" width="360" height="120" rx="10" fill="${P.steelSh}"/>
    <g transform="translate(-200 -60) rotate(${-110 * lid})"><rect x="0" y="-30" width="400" height="34" rx="12" fill="${P.steel}" ${OL(5)}/></g>
    <path d="M -120 40 l 20 -10 M 60 50 l 14 6" stroke="${P.paperSh}" stroke-width="6" stroke-linecap="round"/></g>
   <g transform="translate(760 820) scale(1.2)">${helmetIcon(0, 0, 2.2, fl > .5)}</g>
   ${fl > .5 ? `<ellipse cx="760" cy="760" rx="380" ry="380" fill="url(#pLamp)" opacity=".6"/>` : ''}${GRAIN}`;
}
function s28(t) { // food and clothes go down the narrow hole
  const y = lerp(150, 1100, eio(prog(t, 65.4, 67.5)));
  const got = eout(prog(t, 67.5, 67.9));
  return `<rect x="0" y="0" width="1080" height="1920" fill="${P.rock2}"/>
   <rect x="470" y="0" width="140" height="1200" fill="${P.tun}" ${OL(5)}/>
   <line x1="540" y1="0" x2="540" y2="${y - 160}" stroke="${P.ink}" stroke-width="5"/>
   <g transform="translate(540 ${y})"><rect x="-50" y="-170" width="100" height="250" rx="40" fill="${P.steel}" ${OL(4)}/>
    <rect x="-36" y="-130" width="72" height="70" rx="12" fill="#C99A5E" ${OL(3)}/><rect x="-36" y="-50" width="72" height="80" rx="8" fill="${P.olive}" ${OL(3)}/></g>
   <path d="M 0 1200 Q 540 1150 1080 1220 L 1080 1920 L 0 1920 Z" fill="${P.dark}"/>
   ${miner(330, 1500, .9, { var: 0, lamp: 0, dirt: 1, brow: 'up', mouth: got > .5 ? 'smile' : 'o', look: 12, lookY: -12, aR: reach(330, 1500, .9, 1, 500, lerp(1300, y + 40, got)) })}
   ${miner(780, 1520, .85, { var: 2, lamp: 0, dirt: 1, brow: 'up', mouth: 'o', look: -10, lookY: -12, aL: reach(780, 1520, .85, -1, 590, lerp(1300, y + 40, got)) })}
   ${GRAIN}`;
}
function s29(t) { // wider hole, four days: TAG 10 → 14
  const d = eio(prog(t, 69.0, 71.6)), n = 10 + Math.min(4, Math.floor(prog(t, 69.0, 71.2) * 4 + .001));
  const rot = t * 300;
  return `${paperBg()}
   ${cam(540, 520, .62, section(t, { drill: 1, drill2: d, dawn: 1, voidX: 520 }) + `<g transform="translate(565 -60)"><path d="M -120 60 L 0 -300 L 120 60" stroke="${P.ink}" stroke-width="16" fill="none"/><g transform="rotate(${rot})"><circle r="40" fill="none" stroke="${P.ink}" stroke-width="10"/><path d="M -40 0 H 40" stroke="${P.ink}" stroke-width="8"/></g></g>`)}
   ${dayCard(n, 540, 260, 1.15, 0)}`;
}
function s30(t) { // 07.11.1963: the narrow capsule is hung in the headframe
  const p = prog(t, 73.14, 73.4), sw = 5 * Math.sin(t * 2.4);
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pDawn)"/>
   <path d="M 280 1450 L 540 220 L 800 1450 M 360 1060 H 720 M 430 700 H 650" stroke="${P.ink}" stroke-width="20" fill="none"/>
   <g transform="translate(540 220) rotate(${t * 30})"><circle r="70" fill="none" stroke="${P.ink}" stroke-width="12"/><path d="M -70 0 H 70 M 0 -70 V 70" stroke="${P.ink}" stroke-width="6"/></g>
   <g transform="rotate(${sw} 540 290)"><line x1="540" y1="290" x2="540" y2="${lerp(560, 760, eio(prog(t, 74.0, 75.4)))}" stroke="${P.ink}" stroke-width="6"/>
    <g transform="translate(540 ${lerp(560, 760, eio(prog(t, 74.0, 75.4)))})"><path d="M -38 0 Q -40 -20 0 -24 Q 40 -20 38 0 L 38 460 Q 0 500 -38 460 Z" fill="${P.steel}" ${OL(5)}/><path d="M -20 20 V 440" stroke="#9AA0A5" stroke-width="8"/><rect x="-38" y="180" width="76" height="12" fill="${P.red}"/></g></g>
   <rect x="0" y="1450" width="1080" height="470" fill="${P.soil}" ${OL(5)}/>
   ${miner(160, 1420, .62, { var: 2, lamp: 1, brow: 'calm', mouth: 'flat', look: 14, lookY: -8, aR: [40, -120] })}${miner(910, 1430, .62, { var: 0, lamp: 1, brow: 'calm', mouth: 'flat', look: -14, lookY: -8 })}
   ${stamp('07.11.1963', 540, 1220, 96, p, 6)}${GRAIN}`;
}
function s31(t) { // the capsule goes down to the hollow
  const y = lerp(-80, 1300, eio(prog(t, 75.4, 77.19)));
  return `${paperBg()}${cam(560, lerp(400, 1150, eio(prog(t, 75.4, 77.4))), 1.05, section(t, { drill2: 1, dawn: 1, voidX: 520, cap: y }))}`;
}
function s32(t) { // daylight: one after another they are pulled up
  const k = Math.min(11, 1 + Math.floor(prog(t, 78.0, 80.6) * 11));
  const up = eout(prog(t, 78.0, 78.6));
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pDawn)"/><ellipse cx="540" cy="300" rx="500" ry="300" fill="#FFF4D8" opacity=".6"/>
   ${[...Array(10)].map((_, i) => `<line x1="540" y1="300" x2="${540 + 900 * Math.cos(i * .63)}" y2="${300 + 900 * Math.sin(i * .63)}" stroke="#FFF4D8" stroke-width="30" opacity=".18"/>`).join('')}
   <rect x="0" y="1250" width="1080" height="670" fill="${P.soil}" ${OL(5)}/>
   <rect x="500" y="${lerp(1250, 700, up)}" width="80" height="560" rx="30" fill="${P.steel}" ${OL(5)}/>
   ${miner(540, lerp(1150, 800, up), .62, { var: 1, lamp: 0, blanket: 1, brow: 'up', mouth: 'smile', dirt: 1, noArmL: true, noArmR: true, lookY: -10 })}
   ${silhouette(160, 1560, 1.4, { col: '#4A3E34', arm: .5 + .5 * Math.sin(t * 7) })}${silhouette(330, 1600, 1.2, { col: '#4A3E34', hat: 1 })}${silhouette(760, 1580, 1.3, { col: '#4A3E34', arm: .5 + .5 * Math.sin(t * 6 + 1) })}${silhouette(930, 1620, 1.4, { col: '#4A3E34', scarf: 1 })}
   ${[...Array(11)].map((_, i) => helmetIcon(140 + i * 80, 260, .5, i < k)).join('')}${GRAIN}`;
}
function s33(t) { // the whole country watches: live TV
  const fl = .85 + .15 * hash(Math.floor(t * 20));
  const up = eout(prog(t, 80.9, 82.6));
  const scr = `<rect x="-300" y="-220" width="600" height="440" fill="#B8B8B0"/><path d="M -200 160 L -60 -180 L 80 160" stroke="#3A3A38" stroke-width="16" fill="none"/><rect x="-80" y="${lerp(150, -60, up)}" width="34" height="160" rx="12" fill="#6A6A66" ${OL(3)}/><rect x="-300" y="150" width="600" height="70" fill="#5A5A56"/>`;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#4A3E34"/><rect x="0" y="0" width="1080" height="1920" filter="url(#pPaper)" opacity=".3"/>
   <ellipse cx="540" cy="760" rx="520" ry="420" fill="#DDE3E8" opacity="${.18 * fl}"/>
   <g transform="translate(540 760)"><rect x="-400" y="-320" width="800" height="600" rx="40" fill="${P.brown}" ${OL(6)}/>
    <clipPath id="pTv"><rect x="-320" y="-250" width="560" height="440" rx="60"/></clipPath><g clip-path="url(#pTv)" opacity="${fl}"><g transform="translate(-40 -30)">${scr}</g>${[...Array(18)].map((_, i) => `<line x1="-320" y1="${-250 + i * 26}" x2="240" y2="${-250 + i * 26}" stroke="#000" stroke-width="3" opacity=".15"/>`).join('')}</g>
    <rect x="-320" y="-250" width="560" height="440" rx="60" fill="none" ${OL(6)}/>
    <circle cx="320" cy="-150" r="30" fill="${P.paperSh}" ${OL(4)}/><circle cx="320" cy="-50" r="30" fill="${P.paperSh}" ${OL(4)}/>
    <path d="M -100 -320 L -220 -520 M 100 -320 L 220 -520" stroke="${P.ink}" stroke-width="8"/>
    <rect x="-300" y="280" width="30" height="120" fill="${P.ink}"/><rect x="270" y="280" width="30" height="120" fill="${P.ink}"/></g>
   ${silhouette(260, 1480, 1.8, { col: '#231E1A', scarf: 1 })}${silhouette(560, 1500, 2.0, { col: '#231E1A' })}${silhouette(830, 1480, 1.7, { col: '#231E1A', hat: 1 })}
   ${GRAIN}`;
}
function s34(t) { // 29 lamps on the wall; a miner lights a candle, head bowed
  const lt = prog(t, 84.0, 84.4), bow = eio(prog(t, 84.9, 85.6));
  let lamps = ''; for (let i = 0; i < 29; i++) { const c = i % 6, r = Math.floor(i / 6); lamps += `<g transform="translate(${200 + c * 120} ${360 + r * 150})"><line x1="0" y1="-30" x2="0" y2="0" stroke="${P.ink}" stroke-width="5"/><rect x="-24" y="0" width="48" height="74" rx="10" fill="#7A6E62" ${OL(4)}/><circle cx="0" cy="36" r="10" fill="#4A4038"/></g>`; }
  const fx = 820, fy = 1150;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#3E342C"/><rect x="0" y="0" width="1080" height="1920" filter="url(#pPaper)" opacity=".3"/>
   <rect x="120" y="280" width="760" height="800" fill="#5A4C40" ${OL(6)}/>${lamps}
   <rect x="740" y="1150" width="160" height="40" fill="${P.brown}" ${OL(4)}/><rect x="800" y="1060" width="40" height="90" fill="${P.paperHi}" ${OL(4)}/>
   ${lt > 0 ? `<path d="M 820 ${1060 - 50 * lt} Q 845 1030 820 1060 Q 795 1030 820 ${1060 - 50 * lt} Z" fill="${P.lamp}" transform="translate(${2 * Math.sin(t * 20)} 0)"/><ellipse cx="820" cy="1030" rx="${300 * lt}" ry="${300 * lt}" fill="url(#pLamp)"/>` : ''}
   ${miner(400, 1250, .85, { var: 0, lamp: 0, brow: 'worry', mouth: 'flat', look: 14, lookY: 10, hdy: 12 * bow, tilt: 6 * bow, blink: bow > .5 ? .9 : 0, aR: reach(400, 1250, .85, 1, t < 84.4 ? fx - 10 : 700, t < 84.4 ? 1050 : 1250) })}
   ${GRAIN}`;
}
function s35(t) { // "Das Wunder von Lengede": sunrise, the headframe, the stamp
  const p = prog(t, 88.66, 88.9), wh = t * 30;
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#pDawn)"/>
   ${[...Array(12)].map((_, i) => `<line x1="540" y1="1100" x2="${540 + 1400 * Math.cos(-Math.PI + i * Math.PI / 11)}" y2="${1100 + 1400 * Math.sin(-Math.PI + i * Math.PI / 11)}" stroke="#FFF4D8" stroke-width="40" opacity="${.15 + .05 * Math.sin(t * 2 + i)}"/>`).join('')}
   <circle cx="540" cy="1100" r="200" fill="#FFF4D8" opacity=".85"/>
   <path d="M 340 1250 L 540 420 L 740 1250 M 400 980 H 680 M 460 700 H 620" stroke="${P.ink}" stroke-width="20" fill="none"/>
   <g transform="translate(540 410) rotate(${wh})"><circle r="70" fill="none" stroke="${P.ink}" stroke-width="12"/><path d="M -70 0 H 70 M 0 -70 V 70" stroke="${P.ink}" stroke-width="6"/></g>
   <rect x="0" y="1250" width="1080" height="670" fill="${P.soil}" ${OL(5)}/>
   ${[...Array(11)].map((_, i) => helmetIcon(140 + i * 80, 1330, .45, t > 87.0 + i * .08)).join('')}
   ${stamp('LENGEDE · 1963', 540, 260, 76, p)}${GRAIN}`;
}
function s36(t) { // loop: back to the miner in the dark — how long would you last?
  const q = back(prog(t, 91.4, 91.7));
  const lamp = t > 93.2 ? 0 : (t > 92.9 && Math.floor(t * 20) % 2 ? .3 : 1);
  const n = 14;
  return `${paperBg()}${minerPolaroid(t, lamp, 1)}
   ${dayCard(n, 540, 260, 1.15, 0)}
   ${q > 0 ? `<g transform="translate(860 520) scale(${q})">${TX('?', 0, 90, 300, P.red, 'middle', `stroke="${P.paperHi}" stroke-width="12" paint-order="stroke"`)}</g>` : ''}`;
}

const SHOTS = [
  [0, s01], [2.5, s02], [5.47, s03], [8.46, s04], [10.94, s05], [12.6, s06], [14.43, s07], [16.6, s08], [18.9, s09], [20.89, s10],
  [23.4, s11], [26.86, s12], [28.6, s13], [30.84, s14], [33.12, s15], [35.84, s16], [39.68, s17], [41.78, s18], [45.8, s19], [47.7, s20],
  [51.46, s21], [53.2, s22], [55.92, s23], [56.6, s24], [59.76, s25], [61.0, s26], [63.2, s27], [65.22, s28], [68.82, s29], [72.72, s30],
  [75.4, s31], [77.98, s32], [80.84, s33], [83.18, s34], [86.74, s35], [90.18, s36],
];
function scene(t) {
  let f = SHOTS[0][1];
  for (const [t0, fn] of SHOTS) if (t >= t0) f = fn;
  return defs(t) + f(t);
}

const __style = {"dust": true, "vignette": true, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const subtitleTop = __style.subtitle_y;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
