// @ts-nocheck
// AUTO-GENERATED scene for v20. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// v20 — Zombie-Apokalypse Teil 2: Wer steht vor deiner Tür? Same world/design as v19 (flat 2D, no outlines).
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

// ---------- badge NACHT 1 + time ----------
function badge(t) {
  const p = back(prog(t, .05, .35));
  const marks = [[0, '23:40'], [42.3, '23:55'], [50.2, '03:12']];
  let time = '23:40', t0 = -1;
  for (const [a, s] of marks) if (t >= a) { time = s; t0 = a; }
  const f = t0 > 0 ? back(prog(t, t0, t0 + .25)) : 1;
  const red = time === '03:12';
  return `<g transform="translate(${lerp(-330, 0, p)} 0)">
    <rect x="52" y="156" width="270" height="150" rx="18" fill="#000" opacity=".25" transform="translate(0 8)"/>
    <rect x="52" y="156" width="270" height="150" rx="18" fill="#1c2333"/>
    <rect x="52" y="156" width="14" height="150" rx="7" fill="${P.gold}"/>
    ${T('NACHT 1', 194, 222, 52, P.white)}
    <g transform="translate(194 272) scale(1 ${f}) translate(-194 -272)"><rect x="106" y="246" width="176" height="50" rx="25" fill="${red ? P.red : P.gold}"/>${T(time, 194, 285, 38, red ? '#fff' : P.ink)}</g>
  </g>`;
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
function tobyLie(x, y, s, o = {}) {
  const br = o.breath || 0, ear = o.ear || 0, dir = o.dir || 1;
  return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})">
    <ellipse cx="0" cy="2" rx="150" ry="16" fill="#000" opacity=".22"/>
    <path d="M -130 -20 Q -180 -10 -170 6" stroke="${P.dog}" stroke-width="20" fill="none" stroke-linecap="round"/>
    <ellipse cx="-30" cy="${-46 - br * 4}" rx="110" ry="${48 + br * 4}" fill="${P.dog}"/>
    <ellipse cx="10" cy="-22" rx="60" ry="20" fill="${P.cream}" opacity=".7"/>
    <rect x="40" y="-24" width="110" height="22" rx="11" fill="${P.dog}"/><ellipse cx="146" cy="-12" rx="22" ry="10" fill="${P.cream}"/>
    <rect x="60" y="-96" width="20" height="56" rx="8" fill="${P.collar}" transform="rotate(20 70 -70)"/>
    <g transform="translate(100 -86)"><circle r="46" fill="${P.dog}"/><ellipse cx="40" cy="12" rx="30" ry="21" fill="${P.cream}"/><circle cx="68" cy="6" r="8" fill="${P.ink}"/>
      <circle cx="16" cy="-8" r="6" fill="${P.ink}"/><circle cx="18" cy="-10" r="2.2" fill="#fff"/>
      <g transform="rotate(${-ear * 70} -16 -32)"><path d="M -16 -36 Q -42 -32 -44 6 Q -36 20 -24 9 Q -14 -12 -6 -32 Z" fill="${P.dogEar}"/></g></g>
  </g>`;
}
// Ernesto, front view, origin at feet (~820*s tall). o: aL1/aL2 screen-left arm (his right), aR1/aR2 screen-right arm (his left; holds torch),
// talk 0..1, nod px, beam 0..1, bottle (in screen-left hand), turn 0..1 (turned away, back view)
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
function ernesto(x, y, s, o = {}) {
  const talk = o.talk || 0, nod = o.nod || 0, beam = o.beam ?? 1;
  const aL1 = o.aL1 ?? 10, aL2 = o.aL2 ?? 0, aR1 = o.aR1 ?? -14, aR2 = o.aR2 ?? -40;
  const mo = talk > 0 ? 6 + 12 * talk : 0;
  const tor = limb(132, -560, aR1, aR2, 150, 140, 52, P.card, P.card, P.eSkin, `<g transform="translate(0 150) rotate(${-(aR1 + aR2) * (o.torchUp ? 1 : 0)})">${torchProp(beam)}</g>`);
  const left = limb(-132, -560, aL1, aL2, 150, 140, 52, P.card, P.card, P.eSkin, o.bottle ? `<g transform="translate(0 160) rotate(${-(aL1 + aL2)})">${bottleProp(.9)}</g>` : (o.palm ? `<ellipse cx="0" cy="166" rx="30" ry="40" fill="${P.eSkin}"/><rect x="-22" y="170" width="44" height="40" rx="14" fill="${P.eSkin}"/>` : ''));
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <ellipse cx="0" cy="0" rx="140" ry="20" fill="#000" opacity=".3"/>
    <rect x="-80" y="-300" width="70" height="300" rx="24" fill="${P.ePants}"/><rect x="10" y="-300" width="70" height="300" rx="24" fill="${P.ePants}"/>
    <ellipse cx="-48" cy="-8" rx="48" ry="18" fill="#2b2a2e"/><ellipse cx="48" cy="-8" rx="48" ry="18" fill="#2b2a2e"/>
    ${o.turn ? '' : (o.armsBehind ? '' : '')}
    <rect x="-140" y="-600" width="280" height="330" rx="72" fill="${P.card}"/>
    ${o.turn ? '' : `<path d="M -40 -598 L 0 -500 L 40 -598 Z" fill="${P.eShirt}"/><rect x="-6" y="-500" width="12" height="220" fill="${P.cardSh}"/>
    <circle cx="-22" cy="-440" r="7" fill="${P.cardSh}"/><circle cx="-22" cy="-380" r="7" fill="${P.cardSh}"/><circle cx="-22" cy="-320" r="7" fill="${P.cardSh}"/>`}
    <path d="M 80 -590 Q 136 -570 136 -480 L 136 -300 Q 110 -272 80 -272 Z" fill="${P.cardSh}" opacity=".6"/>
    ${left}${tor}
    <rect x="-30" y="-650" width="60" height="70" rx="20" fill="${P.eSkinSh}"/>
    <g transform="translate(0 ${-730 + nod})">
      <ellipse cx="-86" cy="10" rx="16" ry="26" fill="${P.eSkinSh}"/><ellipse cx="86" cy="10" rx="16" ry="26" fill="${P.eSkinSh}"/>
      <ellipse cx="0" cy="0" rx="86" ry="96" fill="${P.eSkin}"/>
      ${o.turn ? `<path d="M -88 -10 Q -90 60 0 70 Q 90 60 88 -10 Q 80 30 0 34 Q -80 30 -88 -10 Z" fill="${P.eHair}"/>` : `
      <path d="M -88 -6 Q -96 -60 -70 -64 Q -64 -20 -76 20 Z M 88 -6 Q 96 -60 70 -64 Q 64 -20 76 20 Z" fill="${P.eHair}"/>
      <path d="M -54 -34 L -16 -30 M 54 -34 L 16 -30" stroke="${P.eHair}" stroke-width="9" stroke-linecap="round"/>
      <circle cx="-34" cy="-6" r="24" fill="none" stroke="#2a2f3a" stroke-width="5"/><circle cx="34" cy="-6" r="24" fill="none" stroke="#2a2f3a" stroke-width="5"/><path d="M -10 -8 L 10 -8" stroke="#2a2f3a" stroke-width="5"/>
      <circle cx="-34" cy="-4" r="7" fill="${P.ink}"/><circle cx="34" cy="-4" r="7" fill="${P.ink}"/>
      <path d="M -50 14 q 16 8 30 0 M 20 14 q 16 8 30 0" stroke="${P.eSkinSh}" stroke-width="4" fill="none"/>
      <path d="M -6 0 Q -14 26 0 30" stroke="${P.eSkinSh}" stroke-width="6" fill="none" stroke-linecap="round"/>
      <path d="M -40 46 Q 0 30 40 46 Q 30 54 0 48 Q -30 54 -40 46 Z" fill="${P.eHair}"/>
      ${mo > 0 ? `<ellipse cx="0" cy="${60}" rx="16" ry="${mo / 2}" fill="#5a2a24"/>` : `<path d="M -16 60 L 16 60" stroke="#8a4a3a" stroke-width="5" stroke-linecap="round"/>`}`}
    </g>
  </g>`;
}

// ---------- sets ----------
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
const TW = { x: 320, w: 440, top: 400, fh: 76 };
function tower(t, o = {}) {
  const night = o.night || 0;
  const bot = TW.top + 12 * TW.fh;
  let s = `<rect x="${TW.x - 16}" y="${TW.top - 18}" width="${TW.w + 32}" height="20" fill="${night ? '#2c3240' : P.roof}"/>
    <rect x="${TW.x}" y="${TW.top}" width="${TW.w}" height="${12 * TW.fh + 10}" fill="${night ? '#3a3f4c' : P.bld}"/>
    <rect x="${TW.x + TW.w - 70}" y="${TW.top}" width="70" height="${12 * TW.fh + 10}" fill="${night ? '#323744' : P.bldSh}"/>`;
  for (let f = 12; f >= 1; f--) {
    const y = TW.top + (12 - f) * TW.fh + 16;
    for (let i = 0; i < 5; i++) {
      const x = TW.x + 26 + i * 80;
      const isMe = f === 12 && i === 2, isE = f === 11 && i === 3;
      let fill = night ? '#161b26' : P.win;
      if ((isMe && o.me) || (isE && o.ern)) fill = isMe ? '#2a2f22' : '#22304a';
      s += `<rect x="${x}" y="${y}" width="56" height="46" fill="${fill}"/>`;
      if (isMe && o.me) s += `<rect x="${x - 6}" y="${y - 6}" width="68" height="58" fill="none" stroke="${P.green}" stroke-width="5" opacity="${o.me}"/>`;
    }
  }
  s += `<rect x="${TW.x + 170}" y="${bot - 70}" width="100" height="80" fill="${night ? '#12161f' : '#3b3f4a'}"/>`;
  return s;
}
function street(night) {
  const bot = TW.top + 12 * TW.fh + 10;
  let s = `<rect x="-200" y="${bot}" width="1480" height="1200" fill="${night ? '#1a1d24' : P.road}"/>`;
  s += `<rect x="-200" y="${bot}" width="1480" height="34" fill="${night ? '#262a33' : P.walk}"/>`;
  for (let i = -2; i < 14; i++) s += `<rect x="${i * 110}" y="${bot + 150}" width="60" height="12" fill="${night ? '#3a3e48' : P.line}" opacity=".8"/>`;
  return s;
}
function shambler(x, y, s, t, k) {
  const ph = t * 1.6 + k * 2.1, lean = 10 * Math.sin(ph) + 6;
  return `<g transform="translate(${x} ${y}) scale(${s}) rotate(${lean})" opacity=".9">
    <rect x="-16" y="-70" width="13" height="70" rx="6" fill="#4d5244"/><rect x="3" y="-70" width="13" height="70" rx="6" fill="#4d5244"/>
    <rect x="-22" y="-130" width="44" height="66" rx="16" fill="#5d6551"/>
    <rect x="14" y="-124" width="12" height="54" rx="6" fill="#5d6551" transform="rotate(${-30 + 20 * Math.sin(ph * 1.3)} 20 -124)"/>
    <circle cx="${4 + 3 * Math.sin(ph)}" cy="-150" r="18" fill="#8a967a"/>
  </g>`;
}
// dark apartment with the brown front door (as at the end of v19). o.strip light under door, o.gap 0..1 door ajar (light slit at latch side), o.block shadow on strip
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

// cross-section map (v19) + blue Ernesto dot, gaze arrow, bark wave
const MX = { l: 170, r: 880, top: 380, bot: 1340, fh: 80 };
const fTop = k => MX.bot - k * MX.fh;
const MY = k => MX.bot - (k - .5) * MX.fh;
function stairPos(f) {
  const k = cl(Math.floor(f), 1, 12), fr = cl(f - k, 0, 1);
  const yb = MX.bot - (k - 1) * MX.fh, yt = yb - MX.fh;
  const x = k % 2 ? lerp(195, 315, fr) : lerp(315, 195, fr);
  return [x, lerp(yb - 10, yt + 10, fr)];
}
function dot(x, y, col, t, a = 1, rings = true, sp = 1.6) {
  let r = '';
  if (rings) for (let i = 0; i < 2; i++) { const q = ((t * sp) + i * .5) % 1; r += `<circle cx="${x}" cy="${y}" r="${18 + q * 50}" fill="none" stroke="${col}" stroke-width="5" opacity="${a * .8 * (1 - q)}"/>`; }
  return `<g opacity="${a}"><circle cx="${x}" cy="${y}" r="40" fill="${col}" opacity=".25" filter="url(#blur8)"/>${r}<circle cx="${x}" cy="${y}" r="18" fill="${col}"/></g>`;
}
function mapB(t, o = {}) {
  let s = `<rect x="-300" y="-300" width="1680" height="2520" fill="${P.navy}"/>
    <ellipse cx="540" cy="860" rx="700" ry="900" fill="#1c2638" opacity=".6" filter="url(#blur40)"/>
    <rect x="690" y="262" width="130" height="110" rx="10" fill="#3b4559"/><rect x="700" y="335" width="110" height="27" rx="6" fill="${P.water}" opacity=".7"/>
    <rect x="${MX.l}" y="${MX.top}" width="${MX.r - MX.l}" height="${MX.bot - MX.top}" fill="${P.navy2}"/>`;
  if (o.stairHi) s += `<rect x="${MX.l}" y="${MX.top}" width="170" height="${MX.bot - MX.top}" fill="${P.gold}" opacity="${.12 * o.stairHi}"/>`;
  const hiF = o.hiF || {};
  for (let k = 1; k <= 12; k++) {
    const y0 = fTop(k), yb = y0 + MX.fh;
    const hk = hiF[k] || 0;
    const col = hk ? P.red : k === 12 ? P.gold : k === o.blueFloor ? P.blue : P.grey;
    const sc = 1 + .5 * hk;
    s += `<g transform="translate(128 ${y0 + 42}) scale(${sc}) translate(-128 ${-(y0 + 42)})">${T(String(k), 128, y0 + 54, 34, col, { op: k === 12 || hk || k === o.blueFloor ? 1 : .8 })}</g>`;
    const [a, b] = k % 2 ? [[195, yb - 10], [315, y0 + 10]] : [[315, yb - 10], [195, y0 + 10]];
    const w = o.wave != null ? cl(1 - Math.abs((12 - k) / 11 - o.wave) * 5) : 0;
    s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${w > 0 ? P.white : P.gridHi}" stroke-width="${5 + 6 * w}" stroke-linecap="round"/>`;
    if (w > 0) s += `<line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="${P.gold}" stroke-width="30" stroke-linecap="round" opacity="${.35 * w}" filter="url(#blur8)"/>`;
    s += `<rect x="352" y="${y0 + 6}" width="84" height="${MX.fh - 12}" fill="#151c2a"/>`;
    for (let i = 0; i < 3; i++) s += `<rect x="${470 + i * 110}" y="${y0 + 20}" width="84" height="40" rx="4" fill="${P.cell}"/>`;
    s += `<line x1="${MX.l}" y1="${y0}" x2="${MX.r}" y2="${y0}" stroke="${P.grid}" stroke-width="4"/>`;
  }
  s += `<line x1="340" y1="${MX.top}" x2="340" y2="${MX.bot}" stroke="${P.grid}" stroke-width="4"/>`;
  s += `<rect x="${MX.l}" y="${MX.top}" width="${MX.r - MX.l}" height="${MX.bot - MX.top}" fill="none" stroke="${P.gridHi}" stroke-width="6"/>`;
  const ey = MY(8.25);
  s += `<line x1="394" y1="${MX.top}" x2="394" y2="${ey - 32}" stroke="${P.gridHi}" stroke-width="3"/>
    <rect x="360" y="${ey - 32}" width="68" height="62" rx="6" fill="#6c7488"/><rect x="372" y="${ey - 22}" width="20" height="42" fill="#556077"/><rect x="396" y="${ey - 22}" width="20" height="42" fill="#556077"/>`;
  s += `<path d="M 852 1300 L 852 300 L 820 300" stroke="#2c3548" stroke-width="18" fill="none" stroke-linejoin="round"/>
    <g transform="translate(852 1300)"><circle r="34" fill="#4a3438"/><path d="M -24 -24 L 24 24 M 24 -24 L -24 24" stroke="${P.red}" stroke-width="10" stroke-linecap="round"/></g>`;
  // DU door mark + marker
  s += `<rect x="514" y="${fTop(12) + 14}" width="14" height="${MX.fh - 22}" fill="#7a4a2c"/>`;
  const sp = o.duFast ? 3 : .8, pr = (t * sp) % 1;
  s += `<circle cx="590" cy="${MY(12)}" r="${20 + pr * 30}" fill="none" stroke="${P.green}" stroke-width="4" opacity="${.8 * (1 - pr)}"/>
    <circle cx="590" cy="${MY(12)}" r="22" fill="none" stroke="${P.green}" stroke-width="4"/><circle cx="590" cy="${MY(12)}" r="14" fill="${P.green}"/>
    ${T('DU', 650, MY(12) + 14, 38, P.green, { a: 'start' })}`;
  if (o.gaze > 0) {
    s += `<path d="M 560 ${MY(12)} L ${lerp(560, 250, o.gaze)} ${MY(12)}" stroke="${P.gold}" stroke-width="8" stroke-dasharray="18 12" stroke-dashoffset="${-t * 60}" fill="none"/>`;
    if (o.gaze >= 1) s += `<path d="M 270 ${MY(12) - 20} L 236 ${MY(12)} L 270 ${MY(12) + 20}" stroke="${P.gold}" stroke-width="8" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  }
  if (o.waveRing != null && o.waveRing > 0 && o.waveRing < 1) { const q = o.waveRing; s += `<circle cx="560" cy="${MY(12)}" r="${30 + 260 * q}" fill="none" stroke="${P.white}" stroke-width="${10 * (1 - q)}" opacity="${1 - q}"/>`; }
  if (o.blue) s += dot(o.blue[0], o.blue[1], P.blue, t, o.blue[2] ?? 1);
  if (o.red) s += dot(o.red[0], o.red[1], P.red, t, o.red[2] ?? 1, o.red[3] !== false);
  return s;
}

// ---------- shots ----------
function sKnock(t) { // 0 - 2.58
  const K = [.22, .52];
  let dj = 0, rings = '';
  K.forEach(k => { dj += 7 * ring(t, k, 9, 9); for (let i = 0; i < 2; i++) { const q = prog(t, k + i * .08, k + .6 + i * .08); if (q > 0 && q < 1) rings += `<circle cx="280" cy="900" r="${60 + 330 * q}" fill="none" stroke="${P.white}" stroke-width="${10 * (1 - q)}" opacity="${.7 * (1 - q)}"/>`; } });
  let waves = '';
  for (let i = 0; i < 3; i++) { const q = prog(t, 1.8 + i * .14, 2.5 + i * .14); if (q > 0 && q < 1) waves += `<path d="M ${440 + q * 220} ${760 - q * 40} q ${50} ${150 + q * 40} 0 ${300 + q * 80}" stroke="${P.blue}" stroke-width="${12 * (1 - q) + 2}" fill="none" stroke-linecap="round" opacity="${1 - q}"/>`; }
  const jerk = t > 1.82 ? .45 * back(prog(t, 1.82, 2.1)) : 0;
  const [sx, sy] = shk(t, .22, 16, 7);
  const z = lerp(1.22, 1.0, eout(prog(t, 0, .5))) + .04 * prog(t, .5, 2.58);
  const scene = `${darkRoom(t, { strip: .85, dj, block: 1 })}${rings}${waves}
    ${personSit(640, 1520, 1.0, { breath: .5 + .5 * Math.sin(t * 4), turn: -.15 - jerk })}
    ${toby(900, 1520, 1.0, { dir: -1, t, ear: t > .3 ? 1 : .2, wag: 0, headRot: t > .3 ? -6 : 0 })}`;
  return cam(`<g transform="translate(${sx} ${sy})">${scene}</g>`, z, 520, 1000);
}
function sNo(t) { // 2.58 - 3.68
  const sh = t < 3.4 ? Math.sin(prog(t, 2.62, 3.36) * Math.PI * 3) * .45 : 0;
  const step = eout(prog(t, 2.6, 2.95));
  const scene = `${darkRoom(t, { strip: .85, block: 1 })}
    ${personBack(lerp(300, 330, step), lerp(1560, 1640, step), lerp(1.0, 1.06, step), { turn: sh, breath: .5 })}`;
  return cam(scene, 1.25, 300, 1000, 0, 40);
}
function sPeek(t) { // 3.68 - 4.3
  const p = eio(prog(t, 3.68, 4.2));
  const scene = `<rect x="-200" y="-200" width="1480" height="2400" fill="#0b0d14"/>
    <rect x="100" y="-100" width="880" height="2300" fill="#2e1d13"/><rect x="170" y="200" width="740" height="700" rx="10" fill="#3a2518"/><rect x="170" y="980" width="740" height="900" rx="10" fill="#3a2518"/>
    <circle cx="540" cy="520" r="34" fill="#8d7a52"/><circle cx="540" cy="520" r="18" fill="#0b0805"/><circle cx="540" cy="520" r="${8 + 6 * p}" fill="${P.torch}" opacity="${.5 + .5 * Math.sin(t * 9) * .3}"/>
    <g transform="translate(${lerp(760, 600, p)} ${lerp(1500, 1020, p)}) rotate(${lerp(0, -12, p)})">
      <rect x="-150" y="80" width="300" height="600" rx="90" fill="${P.shirt}"/><rect x="-40" y="20" width="80" height="80" fill="${P.skinSh}"/>
      <circle cx="0" cy="-60" r="140" fill="${P.skin}"/><path d="M -146 -40 Q -160 -210 0 -214 Q 156 -210 146 -50 Q 110 40 0 70 Q -110 40 -146 -40 Z" fill="${P.hair}"/>
      <path d="M -70 -170 Q 0 -200 70 -160" stroke="${P.hairHi}" stroke-width="16" fill="none" stroke-linecap="round"/></g>`;
  return cam(scene, lerp(1, 1.12, p), 540, 760);
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
    <clipPath id="v20ph"><circle cx="540" cy="820" r="${440 * k}"/></clipPath>
    <g clip-path="url(#v20ph)">${inner}
      <circle cx="540" cy="820" r="${440 * k}" fill="none" stroke="#000" stroke-width="160" opacity=".55" filter="url(#blur40)"/></g>
    <circle cx="540" cy="820" r="${440 * k}" fill="none" stroke="#1f232c" stroke-width="22"/>
    <path d="M ${540 - 300 * k} ${820 - 250 * k} A ${400 * k} ${400 * k} 0 0 1 ${540 + 120 * k} ${820 - 380 * k}" stroke="#fff" stroke-width="10" fill="none" opacity=".12" stroke-linecap="round"/>`;
}
function sPeep1(t) { // 4.3 - 6.64
  const op = eout(prog(t, 4.3, 4.6));
  const sw = 14 * Math.sin(t * 1.7);
  const inner = `<g transform="translate(540 820) scale(${lerp(.7, 1, op)}) translate(-540 -820)">${hallOut(t, sw * 4)}
    ${ernesto(540, 1500, .95, { aR1: -16 + sw * .3, aR2: -30, beam: 1, nod: 0, talk: t > 5.0 && t < 6.2 ? .5 + .5 * Math.sin(t * 16) : 0 })}</g>`;
  return peephole(inner, t, lerp(.3, 1, op)) + (t > 5.12 ? pop(t, 5.12, 540, 1330, pill(540, 1330, 'ERNESTO', 50, P.blue, '#fff')) : '');
}
function sMap11(t) { // 6.64 - 8.22
  const inP = eout(prog(t, 6.64, 6.9));
  const bp = back(prog(t, 7.0, 7.3));
  const m = mapB(t, { blue: bp > 0 ? [700, MY(11), cl(bp)] : null, blueFloor: t > 7 ? 11 : 0 });
  return cam(m, lerp(1.5, 1.6, prog(t, 6.64, 8.22)), 560, MY(11.5), 0, -80)
    + `<rect width="1080" height="1920" fill="#000" opacity="${1 - inP}"/>`
    + (t > 7.36 ? slam(t, 7.36, 540, 1260, pill(540, 1260, 'ETAGE 11', 56, P.blue, '#fff')) : '');
}
function iconCheck(x, y, ok, p) {
  return `<g transform="translate(${x} ${y}) scale(${p})"><circle r="44" fill="${ok ? P.green : P.red}"/>${ok ? `<path d="M -20 2 L -6 18 L 22 -16" stroke="#fff" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : `<path d="M -16 -16 L 16 16 M 16 -16 L -16 16" stroke="#fff" stroke-width="10" stroke-linecap="round"/>`}</g>`;
}
function sTorch(t) { // 8.22 - 11.58
  const sweep = 18 * Math.sin((t - 8.22) * 2.2);
  const open = eout(prog(t, 10.0, 10.35));
  const z = lerp(1.0, 1.08, prog(t, 8.22, 11.58));
  const scene = `${hallOut(t, sweep * 5)}
    ${ernesto(540, 1560, 1.1, { aR1: -16, aR2: -34 + sweep, beam: 1, aL1: lerp(8, 34, open), aL2: lerp(0, 40, open), palm: open > .5 })}`;
  const tc = back(prog(t, 8.9, 9.15)), bo = back(prog(t, 10.4, 10.65)), x = back(prog(t, 10.7, 10.9));
  return cam(scene, z, 540, 1000)
    + (tc > 0 ? `<g transform="translate(820 520) scale(${tc})"><circle r="78" fill="${P.ink}" opacity=".85"/><g transform="rotate(-30) translate(0 -20)">${torchProp(0)}</g>${iconCheck(56, 56, true, 1)}</g>` : '')
    + (bo > 0 ? `<g transform="translate(250 520) scale(${bo})"><circle r="78" fill="${P.ink}" opacity=".85"/><g transform="translate(0 50)"><rect x="-26" y="-120" width="52" height="130" rx="16" fill="none" stroke="#d8eaf4" stroke-width="7" stroke-dasharray="12 8"/><rect x="-12" y="-138" width="24" height="22" rx="5" fill="#d8eaf4"/></g>${x > 0 ? iconCheck(56, 56, false, x) : ''}</g>` : '');
}
function sSwear(t) { // 11.58 - 15.38
  const up = back(prog(t, 11.62, 11.95));
  const cup = eio(prog(t, 13.7, 14.1));
  const aL1 = cup > 0 ? lerp(lerp(10, 52, up), 18, cup) : lerp(10, 52, up);
  const aL2 = cup > 0 ? lerp(lerp(0, 128, up), -70, cup) : lerp(0, 128, up);
  const talk = (t > 11.7 && t < 13.5) || (t > 13.8 && t < 14.9) ? .5 + .5 * Math.sin(t * 15) : 0;
  const inner = `${hallOut(t, 20)}${ernesto(540, 2050, 1.55, { aL1, aL2, palm: true, aR1: lerp(-14, -18, cup), aR2: lerp(-40, 60, cup), beam: .7, talk, nod: 4 * Math.sin(t * 3) })}`;
  const drop = back(prog(t, 14.4, 14.65));
  return peephole(inner, t)
    + (drop > 0 ? `<g transform="translate(540 300) scale(${drop})"><path d="M 0 -70 C 30 -20 54 10 54 34 A 54 54 0 0 1 -54 34 C -54 10 -30 -20 0 -70 Z" fill="${P.water}"/><ellipse cx="-16" cy="26" rx="12" ry="20" fill="${P.waterHi}" opacity=".7"/></g>` : '');
}
function sVoice(t) { // 15.38 - 18.62
  if (t < 16.9) {
    let waves = '';
    for (let i = 0; i < 4; i++) { const q = ((t - 15.38) * 1.3 + i / 4) % 1; waves += `<path d="M ${440 + q * 260} ${700 - q * 60} q ${60} ${160 + q * 60} 0 ${320 + q * 120}" stroke="${P.blue}" stroke-width="${12 * (1 - q) + 2}" fill="none" stroke-linecap="round" opacity="${.9 * (1 - q)}"/>`; }
    const scene = `${darkRoom(t, { strip: .85, gap: 0 })}${waves}
      ${personBack(560, 1720, 1.15, { turn: -.55, breath: .5 + .5 * Math.sin(t * 3), lean: -14 })}`;
    return cam(scene, lerp(1.1, 1.16, prog(t, 15.38, 16.9)), 440, 1000);
  }
  const p = eio(prog(t, 16.9, 18.62));
  let zs = '';
  [[140, 0], [250, 2], [860, 3], [930, 1]].forEach(([x, k]) => { zs += shambler(x + 20 * Math.sin(t * .5 + k), 1440, .55, t, k); });
  return cam(`${skyline(t, 1)}${tower(t, { night: 1, me: 1 })}${street(1)}${zs}`, lerp(1.0, 1.7, p), lerp(540, 506, p), lerp(960, 560, p), 0, 0)
    + `<rect width="1080" height="1920" fill="#000" opacity="${.6 * (1 - prog(t, 16.9, 17.1))}"/>`;
}
function shelf(t, taken) {
  let b = '';
  for (let i = 0; i < 5; i++) { if (i === 4 && taken) continue; b += `<g transform="translate(${660 + i * 80} 1030)">${bottleProp(.8)}</g>`; }
  return `<rect x="610" y="1040" width="420" height="22" rx="6" fill="#4a3324"/><rect x="630" y="1060" width="16" height="240" fill="#3a2518"/><rect x="994" y="1060" width="16" height="240" fill="#3a2518"/>${b}`;
}
function sDecide(t) { // 18.62 - 21.18
  const turn = eout(prog(t, 18.7, 19.2));
  const reach = Math.sin(prog(t, 19.5, 20.6) * Math.PI);
  const grab = t > 20.05;
  const rA = 70 * reach + (grab ? 25 * prog(t, 20.6, 21.0) : 0);
  const glow = t > 19.6 && !grab ? .5 + .5 * Math.sin(t * 10) : 0;
  const scene = `${darkRoom(t, { strip: .85, lamp: 1, lx: 760, ly: 1200 })}
    <ellipse cx="980" cy="1000" rx="70" ry="110" fill="${P.gold}" opacity="${.35 * glow}" filter="url(#blur20)"/>
    ${shelf(t, grab)}
    ${personBack(640, 1720, 1.05, { turn: lerp(-.3, .7, turn), reach: rA, held: grab ? `<g transform="translate(0 60)">${bottleProp(.8)}</g>` : '' })}`;
  return cam(scene, lerp(1.0, 1.06, prog(t, 18.62, 21.18)), 560, 1060);
}
function sChain(t) { // 21.18 - 22.9
  const sw = 18 * ring(t, 21.3, 2.2, 3);
  const lock = eout(prog(t, 21.96, 22.1));
  const kx = lerp(360, 470, lock);
  const hi = back(prog(t, 22.0, 22.3));
  const [sx, sy] = shk(t, 22.02, 8, 9);
  const plate = `<rect x="300" y="660" width="220" height="64" rx="12" fill="#8d939c"/><rect x="320" y="682" width="180" height="18" rx="9" fill="#2a2f3a"/>`;
  const mx = (kx + 760) / 2, my = 820 + sw * 2 - 60 * lock;
  let links = '';
  for (let i = 0; i <= 10; i++) { const q = i / 10; const x = (1 - q) * (1 - q) * kx + 2 * q * (1 - q) * mx + q * q * 760, y = (1 - q) * (1 - q) * 691 + 2 * q * (1 - q) * my + q * q * 720; links += `<ellipse cx="${x}" cy="${y}" rx="17" ry="11" fill="none" stroke="${P.chain}" stroke-width="7" transform="rotate(${i % 2 ? 60 : -20} ${x} ${y})"/>`; }
  const scene = `<rect x="-200" y="-200" width="1480" height="2400" fill="#0b0d14"/>
    <rect x="-100" y="-100" width="760" height="2200" fill="#2e1d13"/><rect x="0" y="200" width="560" height="1200" rx="10" fill="#3a2518"/>
    <rect x="660" y="-100" width="120" height="2200" fill="#1a120d"/><rect x="780" y="-100" width="500" height="2200" fill="#171b24"/>
    <rect x="640" y="-100" width="26" height="2200" fill="${P.torch}" opacity=".08"/>
    <circle cx="520" cy="1180" r="40" fill="#6a5a3a"/><rect x="420" y="1166" width="110" height="28" rx="14" fill="#6a5a3a"/>
    ${plate}<rect x="740" y="690" width="44" height="70" rx="8" fill="#8d939c"/>
    ${links}<circle cx="${kx}" cy="691" r="18" fill="#c9ced5"/>
    ${hi > 0 ? `<rect x="${280}" y="${620}" width="${520}" height="${200}" rx="40" fill="none" stroke="${P.gold}" stroke-width="10" opacity="${cl(hi)}" transform="translate(540 720) scale(${hi}) translate(-540 -720)"/>` : ''}`;
  return cam(`<g transform="translate(${sx} ${sy})">${scene}</g>`, lerp(1.25, 1.35, prog(t, 21.18, 22.9)), 540, 760);
}
// top-down view of threshold: hinge left at (340,980), jamb at 720. a = door angle deg (inward)
function topDoor(t, o = {}) {
  const a = o.a || 0, ar = a * Math.PI / 180;
  const hx = 340, hy = 990, L = 375;
  const lx = hx + L * Math.cos(ar), ly = hy + L * Math.sin(ar);
  const cx = hx + 300 * Math.cos(ar) - 22 * Math.sin(ar), cy = hy + 300 * Math.sin(ar) + 22 * Math.cos(ar);
  const ax = 770, ay = 1020;
  const sag = o.taut ? 4 : 60;
  let ch = '';
  for (let i = 0; i <= 9; i++) { const q = i / 9; const x = lerp(cx, ax, q), y = lerp(cy, ay, q) + sag * Math.sin(q * Math.PI); ch += `<circle cx="${x}" cy="${y}" r="9" fill="none" stroke="${P.chain}" stroke-width="5"/>`; }
  const gapLight = a > 1 ? `<polygon points="${lx},${ly} 720,975 ${760},1500 ${lx + 60},1500" fill="${P.torch}" opacity=".16"/>` : '';
  return { lx, ly, svg: `
    <rect x="-300" y="-300" width="1680" height="1240" fill="#2a2f3a"/>
    ${Array.from({ length: 10 }, (_, i) => `<line x1="${i * 140 - 100}" y1="-300" x2="${i * 140 - 100}" y2="940" stroke="#323846" stroke-width="5"/>`).join('')}
    <ellipse cx="${o.bx ?? 640}" cy="760" rx="300" ry="220" fill="${P.torch}" opacity=".18" filter="url(#blur40)"/>
    <rect x="-300" y="1010" width="1680" height="1300" fill="#2a1d16"/>
    ${Array.from({ length: 16 }, (_, i) => `<line x1="-300" y1="${1050 + i * 70}" x2="1380" y2="${1050 + i * 70}" stroke="#22170f" stroke-width="5"/>`).join('')}
    ${gapLight}
    <rect x="-300" y="940" width="640" height="70" fill="#4a4e5a"/><rect x="720" y="940" width="660" height="70" fill="#4a4e5a"/>
    <rect x="720" y="940" width="18" height="70" fill="#5c6170"/><rect x="322" y="940" width="18" height="70" fill="#5c6170"/>
    <rect x="340" y="990" width="380" height="20" fill="#1c140e"/>
    <rect x="752" y="1006" width="34" height="26" rx="6" fill="#8d939c"/>
    <g transform="rotate(${a} ${hx} ${hy})"><rect x="${hx}" y="${hy - 4}" width="${L}" height="34" rx="6" fill="#7a4a2c"/><rect x="${hx}" y="${hy + 22}" width="${L}" height="8" fill="#5e381f"/>
      <rect x="${hx + 280}" y="${hy + 28}" width="70" height="14" rx="5" fill="#8d939c"/><circle cx="${hx + 345}" cy="${hy + 44}" r="10" fill="#d8b25a"/></g>
    ${ch}` };
}
// top-down figures
function topPerson(x, y, rot, armTo, held) {
  // narrator from above: shoulders + head; right arm from shoulder to armTo [x,y]
  const sx = x + 70 * Math.cos(rot * Math.PI / 180), sy = y + 70 * Math.sin(rot * Math.PI / 180);
  let arm = '';
  if (armTo) {
    const dx = armTo[0] - sx, dy = armTo[1] - sy, ang = Math.atan2(dy, dx) * 180 / Math.PI, len = Math.hypot(dx, dy);
    arm = `<g transform="translate(${sx} ${sy}) rotate(${ang})"><rect x="-10" y="-24" width="${len + 10}" height="48" rx="24" fill="${P.shirtSh}"/><circle cx="${len}" cy="0" r="26" fill="${P.skin}"/></g>`;
  }
  return `<g><ellipse cx="${x}" cy="${y + 10}" rx="130" ry="80" fill="#000" opacity=".25"/>
    <g transform="translate(${x} ${y}) rotate(${rot + 90})"><ellipse cx="0" cy="0" rx="120" ry="62" fill="${P.shirt}"/><ellipse cx="-90" cy="10" rx="34" ry="40" fill="${P.shirtSh}"/></g>
    ${arm}${held || ''}
    <circle cx="${x}" cy="${y}" r="58" fill="${P.hair}"/><path d="M ${x - 30} ${y - 30} q 30 -20 60 0" stroke="${P.hairHi}" stroke-width="10" fill="none" stroke-linecap="round"/></g>`;
}
function topErn(x, y, armTo, beamA) {
  let arm = '';
  const sx = x + 50, sy = y + 30;
  if (armTo) { const dx = armTo[0] - sx, dy = armTo[1] - sy, ang = Math.atan2(dy, dx) * 180 / Math.PI, len = Math.hypot(dx, dy); arm = `<g transform="translate(${sx} ${sy}) rotate(${ang})"><rect x="-10" y="-24" width="${len + 10}" height="48" rx="24" fill="${P.cardSh}"/><circle cx="${len}" cy="0" r="25" fill="${P.eSkin}"/></g>`; }
  return `<g><ellipse cx="${x}" cy="${y + 10}" rx="130" ry="80" fill="#000" opacity=".3"/>
    <polygon points="${x - 70},${y + 40} ${x - 260},${y + 330} ${x - 20},${y + 380}" fill="${P.torch}" opacity="${.25 * beamA}"/>
    <ellipse cx="${x}" cy="${y}" rx="128" ry="64" fill="${P.card}"/><ellipse cx="${x - 92}" cy="${y + 20}" rx="34" ry="40" fill="${P.cardSh}"/><rect x="${x - 86}" y="${y + 20}" width="22" height="48" rx="6" fill="#3a3f4a"/>
    ${arm}
    <circle cx="${x}" cy="${y}" r="56" fill="${P.eSkin}"/><path d="M ${x - 54} ${y + 10} A 56 56 0 0 0 ${x + 54} ${y + 10} L ${x + 40} ${y + 4} A 42 42 0 0 1 ${x - 40} ${y + 4} Z" fill="${P.eHair}"/>
    <ellipse cx="${x - 14}" cy="${y - 16}" rx="14" ry="8" fill="#f0c8a8" opacity=".6"/></g>`;
}
function sHand(t) { // 22.9 - 26.4
  const a = 15 * eout(prog(t, 22.95, 23.9));
  const taut = t > 23.86;
  const jolt = taut ? 2 * ring(t, 23.86, 6, 8) : 0;
  const D = topDoor(t, { a: a + jolt, taut, bx: 640 });
  const reach = eio(prog(t, 24.5, 25.1)), back2 = eio(prog(t, 25.85, 26.35));
  const hand = [lerp(860, 728, reach), lerp(1240, 900, reach)];
  const handNow = back2 > 0 ? [lerp(728, 860, back2), lerp(900, 1240, back2)] : hand;
  const given = t > 25.45;
  const take = eio(prog(t, 25.2, 25.5));
  const eHand = [lerp(820, 734, take), lerp(640, 850, take)];
  const eHand2 = given ? [lerp(734, 800, prog(t, 25.5, 26.1)), lerp(850, 700, prog(t, 25.5, 26.1))] : eHand;
  const bottle = (bx, by) => `<g transform="translate(${bx} ${by}) rotate(-90)"><rect x="-22" y="-60" width="44" height="120" rx="14" fill="#d8eaf4"/><rect x="-20" y="-20" width="40" height="70" rx="10" fill="${P.water}"/><rect x="-10" y="-78" width="20" height="20" rx="4" fill="${P.shirt}"/></g>`;
  const bpos = given ? [eHand2[0] + 6, eHand2[1] + 40] : [handNow[0], handNow[1] - 40];
  const pbottle = t > 24.3 ? bottle(bpos[0], bpos[1]) : '';
  const scene = `${D.svg}
    ${topErn(820, 560, t > 25.0 ? eHand2 : null, 1)}
    ${given ? pbottle : ''}
    ${topPerson(930, 1340, -120, t > 24.3 ? handNow : null, given ? '' : pbottle)}`;
  return cam(scene, lerp(1.25, 1.35, prog(t, 22.9, 26.4)), 720, 1000, 0, -40);
}
function sGrowl(t) { // 26.4 - 29.86
  const gr = eout(prog(t, 26.5, 26.9));
  const gaze = eout(prog(t, 28.5, 28.9));
  let gl = '';
  for (let i = 0; i < 3; i++) { const q = ((t - 26.5) * 2.4 + i / 3) % 1; if (t > 26.6) gl += `<path d="M ${520 - q * 120} ${1040 - 10 * i} q -14 12 0 24 q 14 12 0 24" stroke="${P.white}" stroke-width="6" fill="none" opacity="${.6 * (1 - q) * gr}"/>`; }
  const scene = `<rect x="-300" y="-300" width="1680" height="2520" fill="#0d1018"/><rect x="-300" y="1240" width="1680" height="1000" fill="#151218"/>
    <rect x="760" y="560" width="320" height="690" fill="#1a120d"/><rect x="${1040 - 40}" y="574" width="40" height="676" fill="${P.torch}" opacity=".85"/>
    <rect x="774" y="574" width="226" height="676" fill="#2e1d13"/><polygon points="1000,1250 1040,1250 1200,1400 960,1400" fill="${P.torch}" opacity=".2"/>
    <rect x="-300" y="500" width="220" height="760" fill="#11141c"/>
    ${gaze > 0 ? `<path d="M 470 ${1000} L ${lerp(470, 60, gaze)} ${1000 - 40 * gaze}" stroke="${P.gold}" stroke-width="8" stroke-dasharray="18 12" stroke-dashoffset="${-t * 60}" fill="none"/>` : ''}
    ${gl}
    ${toby(640, 1340, 1.5, { dir: -1, t, growl: gr, ear: -.3 * gr, wag: 0, breath: .5 + .5 * Math.sin(t * 9) * gr })}`;
  return cam(scene, lerp(1.08, 1.0, eio(prog(t, 26.4, 29.86))), lerp(620, 520, eio(prog(t, 28.4, 29.4))), 1050);
}
function sGazeMap(t) { // 29.86 - 31.4
  const g = eout(prog(t, 29.95, 30.5));
  const m = mapB(t, { gaze: g, blue: [480, MY(12), 1], stairHi: prog(t, 30.4, 30.7), blueFloor: 0 });
  return cam(m, 1.7, 420, MY(11.4), 0, -80)
    + (t > 30.5 ? pop(t, 30.5, 380, 520, pill(380, 520, 'TREPPENHAUS', 46, P.ink, P.gold)) : '');
}
function gapView(t, o = {}) {
  // view from inside through the chained slit: dark door left & right, bright slit with Ernesto
  const inner = `${hallOut(t, 0)}${ernesto(o.ex ?? 560, 2000, 1.5, o.e || {})}`;
  return `<rect x="-10" y="-10" width="1100" height="1940" fill="#050608"/>
    <clipPath id="v20gap"><rect x="330" y="-10" width="420" height="1940"/></clipPath>
    <g clip-path="url(#v20gap)">${inner}</g>
    <rect x="-10" y="-10" width="350" height="1940" fill="#2e1d13"/><rect x="330" y="-10" width="18" height="1940" fill="#5e381f"/>
    <rect x="740" y="-10" width="350" height="1940" fill="#1a120d"/>
    <rect x="200" y="600" width="140" height="44" rx="10" fill="#8d939c"/><rect x="742" y="610" width="44" height="64" rx="8" fill="#8d939c"/>
    ${Array.from({ length: 9 }, (_, i) => { const q = i / 8, x = lerp(300, 764, q), y = 622 + 6 * Math.sin(q * Math.PI) + (o.jig || 0) * Math.sin(q * Math.PI); return `<ellipse cx="${x}" cy="${y}" rx="30" ry="16" fill="none" stroke="${P.chain}" stroke-width="10" transform="rotate(${i % 2 ? 0 : 0} ${x} ${y})"/>`; }).join('')}`;
}
function sTalk(t) { // 31.4 - 33.6
  const pt = eout(prog(t, 32.4, 32.8));
  const talk = .5 + .5 * Math.sin(t * 14);
  return cam(gapView(t, { e: { talk, aL1: lerp(10, 40, pt), aL2: lerp(0, -10, pt), palm: true, aR1: -14, aR2: -40, beam: .5, nod: 5 * Math.sin(t * 4) } }), 1.0 + .05 * prog(t, 31.4, 33.6), 540, 900);
}
function tankIcon(t, draw, lvl, q) {
  return `<g transform="translate(540 820)">
    <rect x="-200" y="-330" width="400" height="640" rx="90" fill="#e6e2d8" opacity="${cl(draw * 2 - 1)}"/>
    <rect x="-200" y="-330" width="400" height="640" rx="90" fill="none" stroke="#e6e2d8" stroke-width="14" pathLength="1" style="stroke-dasharray:${draw} 1"/>
    <clipPath id="v20tk"><rect x="-170" y="-300" width="340" height="580" rx="70"/></clipPath>
    <g clip-path="url(#v20tk)"><rect x="-170" y="${280 - 580 * lvl}" width="340" height="${580 * lvl + 10}" fill="${P.water}" opacity=".85"/>
      <path d="M -180 ${280 - 580 * lvl} q 45 ${-14 * Math.sin(t * 5)} 90 0 t 90 0 t 90 0 t 90 0" stroke="${P.waterHi}" stroke-width="10" fill="none"/></g>
    <rect x="-60" y="310" width="30" height="80" fill="#8d939c" opacity="${cl(draw * 2 - 1)}"/><rect x="30" y="310" width="30" height="80" fill="#8d939c" opacity="${cl(draw * 2 - 1)}"/>
    <rect x="-90" y="380" width="180" height="22" rx="8" fill="#c8463a" opacity="${cl(draw * 2 - 1)}"/>
    ${q > 0 ? `<g transform="translate(0 -40) scale(${q})"><circle r="110" fill="${P.gold}"/>${T('?', 0, 54, 160, P.ink)}</g>` : ''}
  </g>`;
}
function sTank(t) { // 33.6 - 36.82
  const draw = eio(prog(t, 33.62, 34.5));
  const lvl = .7 * eout(prog(t, 34.4, 35.3)) + .02 * Math.sin(t * 4);
  const q = back(prog(t, 34.1, 34.4));
  const [sx, sy] = shk(t, 35.3, 10, 8);
  return `<rect width="1080" height="1920" fill="#181d28"/><ellipse cx="540" cy="820" rx="560" ry="700" fill="#262e3f" filter="url(#blur40)"/>
    <g transform="translate(${sx} ${sy}) translate(540 820) scale(${1 + .04 * prog(t, 33.6, 36.82)}) translate(-540 -820)">${tankIcon(t, draw, lvl, q)}</g>
    ${slam(t, 35.3, 540, 340, pill(540, 340, 'WARMWASSERSPEICHER', 48, P.ink, P.gold))}`;
}
function sNote(t) { // 36.82 - 41.34
  const inP = back(prog(t, 36.82, 37.15));
  const w1 = prog(t, 37.0, 37.6), w2 = prog(t, 37.4, 37.95);
  const ic = back(prog(t, 37.7, 37.95));
  const pen = t < 38.0 ? [lerp(300, 820, (t > 37.4 ? w2 : w1)), t > 37.4 ? 640 : 560] : [lerp(820, 900, prog(t, 38, 38.4)), lerp(640, 760, prog(t, 38, 38.4))];
  const gl = eout(prog(t, 38.2, 38.6));
  const no = back(prog(t, 39.8, 40.05));
  const [sx, sy] = shk(t, 39.82, 8, 9);
  const scr = (y, w, k) => `<path d="M 260 ${y} ${Array.from({ length: 12 }, (_, i) => `q 11 ${i % 2 ? 22 : -22} 22 0`).join(' ')} ${Array.from({ length: 12 }, (_, i) => `q 11 ${i % 2 ? -18 : 18} 22 0`).join(' ')}" stroke="#2a3550" stroke-width="7" fill="none" stroke-linecap="round" pathLength="1" style="stroke-dasharray:${w} 1"/>`;
  const paper = `<g transform="translate(0 ${lerp(1400, 0, inP)}) rotate(-3 540 700)">
    <rect x="180" y="380" width="720" height="760" rx="20" fill="#000" opacity=".2" transform="translate(12 16)"/>
    <rect x="180" y="380" width="720" height="760" rx="20" fill="#fbf8f0"/>
    ${Array.from({ length: 9 }, (_, i) => `<line x1="210" y1="${470 + i * 76}" x2="870" y2="${470 + i * 76}" stroke="#c9d6e4" stroke-width="3"/>`).join('')}
    <line x1="240" y1="380" x2="240" y2="1140" stroke="#e8a0a0" stroke-width="3"/>
    ${scr(560, w1)}${scr(640, w2)}
    ${ic > 0 ? `<g transform="translate(560 860) scale(${.36 * ic})"><rect x="-200" y="-330" width="400" height="640" rx="90" fill="none" stroke="#2a3550" stroke-width="22"/><rect x="-170" y="0" width="340" height="280" rx="40" fill="${P.water}" opacity=".7"/></g>` : ''}
  </g>`;
  const penSvg = t < 38.5 && inP > .5 ? `<g transform="translate(${pen[0]} ${pen[1] + lerp(1400, 0, inP)}) rotate(35)"><rect x="-12" y="-170" width="24" height="160" rx="6" fill="${P.gold}"/><polygon points="-12,-10 12,-10 0,14" fill="#2a3550"/></g>` : '';
  const glass = gl > 0 ? `<g transform="translate(${lerp(1300, 760, gl)} 1150)"><path d="M -80 -170 L 80 -170 L 66 60 L -66 60 Z" fill="#dfeaf0" opacity=".9"/><path d="M -74 -90 L 74 -90 L 66 60 L -66 60 Z" fill="#9fb8a0" opacity=".85"/>
    <circle cx="-20" cy="-30" r="8" fill="#c9d6c0"/><circle cx="24" cy="10" r="6" fill="#c9d6c0"/>
    ${pop(t, 38.9, 0, -260, `<circle cx="0" cy="-260" r="56" fill="${P.gold}"/>${T('?', 0, -224, 90, P.ink)}`)}
    ${no > 0 ? `<g transform="translate(0 -60) scale(${no})"><circle r="150" fill="none" stroke="${P.red}" stroke-width="24"/><path d="M -106 -106 L 106 106" stroke="${P.red}" stroke-width="24"/></g>` : ''}</g>` : '';
  return `<rect width="1080" height="1920" fill="#1b2130"/><ellipse cx="540" cy="900" rx="560" ry="820" fill="#2a3142" filter="url(#blur40)"/>
    <g transform="translate(${sx} ${sy})">${paper}${penSvg}${glass}</g>`;
}
function sBye(t) { // 41.34 - 42.3
  const nod = 22 * Math.sin(prog(t, 41.5, 41.9) * Math.PI);
  const turn = t > 41.98;
  const slide = eio(prog(t, 42.0, 42.3));
  return cam(gapView(t, { ex: lerp(560, 300, slide), e: { nod, aL1: 30, aL2: 100, bottle: true, aR1: -14, aR2: -40, beam: .6, turn } }), 1.0, 540, 900);
}
function sBack11(t) { // 42.3 - 44.56
  // blue: corridor 12 -> stairs -> down to 11 -> apartment
  let bx, by;
  const a = prog(t, 42.35, 42.95), b = prog(t, 42.95, 43.4), c = prog(t, 43.4, 44.0);
  if (t < 42.95) { bx = lerp(480, 255, eio(a)); by = MY(12); }
  else if (t < 43.4) { [bx, by] = stairPos(lerp(12.5, 11.5, eio(b))); }
  else { bx = lerp(255, 700, eio(c)); by = MY(11); }
  const m = mapB(t, { blue: [bx, by, 1], blueFloor: t > 43.4 ? 11 : 0 });
  return cam(m, lerp(1.6, 1.5, prog(t, 42.3, 44.56)), 520, MY(11.3), 0, -80)
    + (t > 43.48 ? slam(t, 43.48, 540, 1260, pill(540, 1260, 'ETAGE 11', 56, P.blue, '#fff')) : '');
}
function sClose(t) { // 44.56 - 48.36
  const gap = 1 - eio(prog(t, 44.7, 45.15));
  const [sx, sy] = shk(t, 45.15, 10, 9);
  const lampOn = t < 46.8 ? 1 : 0;
  const sit = eio(prog(t, 47.3, 47.8));
  const pb = sit < .5;
  const scene = `${darkRoom(t, { strip: .85, gap, lamp: lampOn, lx: 560, ly: 1320 })}
    ${pb ? personBack(560, 1640 + 60 * sit, 1.0 - .1 * sit, { turn: -.2, breath: .5, reach: 10, held: `<g transform="rotate(155) translate(0 -10)">${torchProp(lampOn)}</g>` })
      : personSit(560, 1640, 1.0, { breath: .5 + .5 * Math.sin(t * 3), turn: -.2 })}
    ${sit > .6 ? `<g opacity="${cl((sit - .6) * 4)}">${tobyLie(870, 1660, .9, { dir: -1, breath: .5 + .5 * Math.sin(t * 3) })}</g>` : toby(900, 1640, .95, { dir: -1, t, wag: 0, ear: .3 })}`;
  const flash = t > 46.8 && t < 46.95 ? .3 : 0;
  return cam(`<g transform="translate(${sx} ${sy})">${scene}</g>`, lerp(1.12, 1.0, eio(prog(t, 44.56, 48.36))), 480, 1080)
    + (lampOn ? '' : `<rect width="1080" height="1920" fill="#000" opacity="${.25 - flash}"/>`);
}
function sStill(t) { // 48.36 - 50.2
  const br = .5 + .5 * Math.sin(t * 2.2);
  const ear = t > 49.4 && t < 49.7 ? Math.sin(prog(t, 49.4, 49.7) * Math.PI) : 0;
  const scene = `<rect x="-300" y="-300" width="1680" height="2520" fill="#0b0e15"/><rect x="-300" y="1300" width="1680" height="1000" fill="#131017"/>
    <rect x="-300" y="300" width="460" height="1000" fill="#1a120d"/><rect x="-300" y="320" width="440" height="980" fill="#24170f"/><rect x="140" y="1290" width="12" height="14" fill="#e8d9a8" opacity=".7"/>
    <rect x="120" y="300" width="40" height="1000" fill="#2a1d16"/>
    ${personSit(420, 1460, 1.1, { breath: br, turn: -.6 })}
    ${tobyLie(800, 1470, 1.0, { dir: -1, breath: br, ear })}`;
  return cam(scene, lerp(1.0, 1.08, prog(t, 48.36, 50.2)), 540, 1150);
}
function s0312(t) { // 50.2 - 51.17
  const [sx, sy] = shk(t, 50.24, 14, 7);
  const scene = `<rect x="-300" y="-300" width="1680" height="2520" fill="#0b0e15"/><rect x="-300" y="1300" width="1680" height="1000" fill="#131017"/>
    ${personSit(420, 1460, 1.1, { breath: .5, turn: -.6 })}${tobyLie(800, 1470, 1.0, { dir: -1, breath: .5 })}`;
  return `<g opacity=".55">${cam(scene, 1.1, 540, 1150)}</g>`
    + `<g transform="translate(${sx} ${sy})">${slam(t, 50.24, 540, 760, `<rect x="160" y="600" width="760" height="300" rx="40" fill="#0b0e15" opacity=".85"/>${T('03:12', 540, 830, 220, P.red)}`)}</g>`;
}
function sBark(t) { // 51.17 - 53.32
  const up = back(prog(t, 51.2, 51.38));
  const jaw = t < 51.42 ? 0 : Math.sin(prog(t, 51.42, 51.72) * Math.PI);
  const q = prog(t, 51.42, 52.3);
  const [sx, sy] = shk(t, 51.42, 14, 8);
  const ringS = q > 0 && q < 1 ? `<circle cx="760" cy="980" r="${80 + 700 * eout(q)}" fill="none" stroke="${P.white}" stroke-width="${22 * (1 - q)}" opacity="${1 - q}"/>` : '';
  const scene = `<rect x="-300" y="-300" width="1680" height="2520" fill="#0d1018"/><rect x="-300" y="1360" width="1680" height="900" fill="#151218"/>
    <ellipse cx="640" cy="1000" rx="420" ry="420" fill="#2a3a5a" opacity=".3" filter="url(#blur40)"/>
    ${ringS}
    ${toby(560, 1500, 2.0, { dir: 1, t, ear: 1, wag: 0, jaw, headRot: -12 * up })}`;
  return cam(`<g transform="translate(${sx} ${sy})">${scene}</g>`, lerp(1.0, 1.08, prog(t, 51.17, 53.32)), 560, 1050);
}
function sWave(t) { // 53.32 - 55.58
  const w = prog(t, 53.5, 55.0);
  const m = mapB(t, { wave: w > 0 && w < 1 ? w : null, waveRing: prog(t, 53.32, 54.0), stairHi: .4 });
  return cam(m, lerp(1.0, 1.08, prog(t, 53.32, 55.58)), 520, 860, 0, -60)
    + (t > 54.2 ? pop(t, 54.2, 540, 300, pill(540, 300, 'TREPPENHAUS', 48, P.ink, P.gold)) : '');
}
function redPos(t) {
  if (t < 55.7) return null;
  if (t < 57.34) return [...stairPos(lerp(1.3, 7.5, eio(prog(t, 55.85, 57.34)) * .9 + .1 * prog(t, 55.85, 57.34))), cl((t - 55.7) * 4)];
  if (t < 58.52) return [...stairPos(lerp(7.5, 8.5, eout(prog(t, 57.34, 57.7)))), 1];
  if (t < 58.98) return [...stairPos(lerp(8.5, 9.5, eout(prog(t, 58.52, 58.8)))), 1];
  if (t < 59.7) return [...stairPos(lerp(9.5, 10.5, eout(prog(t, 58.98, 59.3)))), 1];
  if (t < 60.9) return [...stairPos(lerp(10.5, 12.5, eio(prog(t, 59.7, 60.9)))), 1];
  const c = eio(prog(t, 61.0, 62.5));
  return [lerp(255, 490, c), MY(12), 1, t < 62.56];
}
function sSteps(t) { // 55.58 - 63.86
  const r = redPos(t);
  const hiF = {};
  [[8, 57.34], [9, 58.52], [10, 58.98]].forEach(([k, t0]) => { if (t >= t0) hiF[k] = back(prog(t, t0, t0 + .2)) * (1 - .6 * prog(t, t0 + .5, t0 + 1.2)); });
  const stop = t >= 62.56;
  const m = mapB(t, { red: r ? [r[0], r[1], r[2], r[3] !== false && !stop] : null, hiF, duFast: t > 61, stairHi: .3 });
  let z, fx, fy;
  if (t < 57.34) { z = lerp(1.0, 1.15, prog(t, 55.58, 57.34)); fx = 480; fy = 880; }
  else if (t < 59.7) { z = 1.5; fx = 400; fy = lerp(MY(7.5), MY(9.5), eio(prog(t, 57.34, 59.6))); }
  else if (t < 62.56) { z = lerp(1.5, 1.8, eio(prog(t, 59.7, 62.5))); fx = lerp(400, 440, eio(prog(t, 60.6, 62))); fy = lerp(MY(9.5), MY(12), eio(prog(t, 59.7, 60.9))); }
  else { z = lerp(1.8, 2.3, eio(prog(t, 62.56, 63.4))); fx = 520; fy = MY(12); }
  const [sx, sy] = shk(t, 62.56, 10, 8);
  return cam(`<g transform="translate(${sx} ${sy})">${m}</g>`, z, fx, fy, 0, -100)
    + (stop ? `<rect width="1080" height="1920" fill="#000" opacity="${.25 * Math.sin(prog(t, 62.56, 63.86) * Math.PI)}"/>` : '');
}
function sEnd(t) { // 63.86 - 67.26
  const off = prog(t, 66.4, 66.7);
  const z = lerp(1.15, 1.0, eio(prog(t, 63.86, 65.3)));
  const ghostW = prog(t, 64.7, 65.6);
  const w = ghostW > 0 && ghostW < 1 ? `<path d="M ${460 + 60 * ghostW} 760 q 50 150 0 300" stroke="${P.blue}" stroke-width="10" fill="none" stroke-linecap="round" stroke-dasharray="4 26" opacity="${.5 * (1 - ghostW)}"/>` : '';
  const scene = `${darkRoom(t, { strip: .85 * (1 - off), block: 1 })}${w}
    ${personSit(640, 1520, 1.0, { breath: .2, turn: -.2 })}
    ${toby(900, 1520, 1.0, { dir: -1, t, ear: 1, wag: 0, growl: .5 })}`;
  return cam(scene, z, 520, 1000) + (off > 0 ? `<rect width="1080" height="1920" fill="#000" opacity="${off * .55}"/>` : '');
}
const SHOTS = [[0, sKnock], [2.58, sNo], [3.68, sPeek], [4.3, sPeep1], [6.64, sMap11], [8.22, sTorch], [11.58, sSwear], [15.38, sVoice], [18.62, sDecide], [21.18, sChain], [22.9, sHand], [26.4, sGrowl], [29.86, sGazeMap], [31.4, sTalk], [33.6, sTank], [36.82, sNote], [41.34, sBye], [42.3, sBack11], [44.56, sClose], [48.36, sStill], [50.2, s0312], [51.17, sBark], [53.32, sWave], [55.58, sSteps], [63.86, sEnd]];
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
