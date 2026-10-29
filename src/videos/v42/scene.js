// @ts-nocheck
// AUTO-GENERATED scene for v42. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// v42 — Chamäleon-Effekt. Kinetic keyword tags on cream paper + two stick figures mirroring each other,
// moving through changing sets: café, close-ups, split screen, lab, Dutch restaurant, living room.
const K = { paper: '#F4EFE6', grid: '#E3DCCF', ink: '#2B2B2B', blue: '#2F4BDB', red: '#E5484D', orange: '#F28C28', teal: '#14A38B', violet: '#7A5AF8', marker: '#FFD84D', card: '#FFFDF8', grey: '#A8A29A', wood: '#C99B6D', woodDk: '#A97B4F', skin: '#FFFFFF' };
const OL = K.ink;
const SANS = `font-family:'Inter';font-weight:900`;
const SERIF = `font-family:'Liberation Serif','DejaVu Serif',serif;font-style:italic;font-weight:400`;
const ST = (w = 3) => `stroke="${OL}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
const pop = (t, t0, d = .25) => back(prog(t, t0, t0 + d));
const R = (x, y, w, h, fill, extra = '') => `<rect x="${x}" y="${y}" width="${w}" height="${h}" fill="${fill}" ${extra}/>`;
const DUR = 77.964;
function mix(a, b, p) {
  const A = parseInt(a.slice(1), 16), B = parseInt(b.slice(1), 16), q = cl(p);
  const ch = s => Math.round(lerp((A >> s) & 255, (B >> s) & 255, q));
  return `rgb(${ch(16)},${ch(8)},${ch(0)})`;
}

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
function serifLine(x, y, txt, p, sz = 54) { if (p <= 0) return ''; return `<text x="${x}" y="${y}" text-anchor="middle" style="${SERIF};font-size:${sz}px" fill="${K.ink}" opacity="${cl(p)}">${txt}</text>`; }
function stamp(x, y, rot, txt, col, p, sz = 90) {
  if (p <= 0) return '';
  const w = txt.length * sz * .7 + 70, h = sz * 1.5, sc = 1 + 1.2 * (1 - cl(p));
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${sc})" opacity="${cl(p * 3)}"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="16" fill="${K.card}" fill-opacity=".9" stroke="${col}" stroke-width="10"/><rect x="${-w / 2 + 14}" y="${-h / 2 + 14}" width="${w - 28}" height="${h - 28}" rx="8" fill="none" stroke="${col}" stroke-width="4"/>
    <text x="0" y="${sz * .36}" text-anchor="middle" style="${SANS};font-size:${sz}px;letter-spacing:3px" fill="${col}">${txt}</text></g>`;
}
function check(x, y, s, p, col = K.teal) { if (p <= 0) return ''; return `<path transform="translate(${x} ${y}) scale(${s})" d="M -40 0 L -10 30 L 46 -36" stroke="${col}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" pathLength="1" style="stroke-dasharray:${cl(p)} 1"/>`; }
function cross(x, y, s, p, col = K.red) { if (p <= 0) return ''; return `<path transform="translate(${x} ${y}) scale(${s})" d="M -36 -36 L 36 36 M 36 -36 L -36 36" stroke="${col}" stroke-width="16" fill="none" stroke-linecap="round" pathLength="2" style="stroke-dasharray:${2 * cl(p)} 2"/>`; }
// A tag card exists only from t0 on and carries its keyword from its first frame (lesson: never an empty card).
function tag(t, t0, txt, col, o = {}) {
  if (t < t0) return '';
  const p = eout(prog(t, t0, t0 + .2));
  const y = o.y ?? 330, sub = o.sub || '', h = sub ? 290 : 220, rot = o.rot ?? -1.5;
  const x = lerp(o.fromX ?? 1400, 540, p);
  const ky = sub ? 50 : 0;
  return `<g transform="translate(${x} ${y}) rotate(${rot})"><g filter="url(#kshadow)"><rect x="-480" y="${-h / 2}" width="960" height="${h}" rx="26" fill="${K.card}" stroke="${OL}" stroke-width="3"/></g>
    <rect x="-462" y="${-h / 2 + 18}" width="924" height="${h - 36}" rx="18" fill="none" stroke="${K.grid}" stroke-width="3" stroke-dasharray="14 10"/>
    ${sub ? serifLine(0, -h / 2 + 78, sub, 1, o.subSz || 50) : ''}
    ${keyword(0, ky, txt, col, .55 + .45 * back(prog(t, t0, t0 + .28)), { max: o.max || 130, maxW: 860, hl: o.hl ? prog(t, t0 + .3, t0 + .75) : 0 })}${o.extra || ''}</g>`;
}
function progress(t) { const p = cl(t / DUR); return `<path d="M 60 70 H 1020" stroke="${OL}" stroke-width="4" opacity=".35"/><path d="M 60 70 H ${60 + 960 * p}" stroke="${OL}" stroke-width="6"/><circle cx="${60 + 960 * p}" cy="70" r="12" fill="${K.red}" ${ST(3)}/>`; }
function talkM(t, a, b) { return t > a && t < b && hash(Math.floor(t * 9)) > .4 ? 'o' : 'smile'; }
const zoom = (cx, cy, k, inner) => `<g transform="translate(${cx} ${cy}) scale(${k}) translate(${-cx} ${-cy})">${inner}</g>`;
function panel(id, x, y, w, h, inner, o = {}) {
  return `<clipPath id="${id}"><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22"/></clipPath><g clip-path="url(#${id})">${inner}</g><rect x="${x}" y="${y}" width="${w}" height="${h}" rx="22" fill="none" ${ST(o.sw || 7)}/>`;
}
function letter(x, y, L, col, p = 1) { if (p <= 0) return ''; const hw = 48 + (L.length - 1) * 30; return `<g transform="translate(${x} ${y}) scale(${p})"><rect x="${-hw}" y="-48" width="${2 * hw}" height="96" rx="18" fill="${col}" ${ST(5)}/><text y="30" text-anchor="middle" style="${SANS};font-size:84px" fill="#fff">${L}</text></g>`; }

// ---------- figures ----------
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
  stiff: { h1: [40, 110], h2: [30, 110], lean: -2, tilt: 0 },
};
// bust (close-up) poses: front hand target in bust-local units (facing right), body lean, head tilt
const BP = {
  rest: { h1: [150, 140], lean: 0, tilt: 0 },
  chin: { h1: [45, -232], lean: 5, tilt: 9 },
  reach: { h1: [150, -110], lean: 6, tilt: 0 },
  glass: { h1: [105, -290], lean: 0, tilt: -6 },
  scratch: { h1: [70, -480], lean: 0, tilt: 12 },
  wave: { h1: [175, -430], lean: 0, tilt: 0 },
  lean: { h1: [-40, -440], lean: -6, tilt: -10 },
  pad: { h1: [150, -170], lean: 0, tilt: 5 },
  talk: { h1: [190, -130], lean: 3, tilt: 4 },
};
function poseMix(A, B, p) { const o = {}; for (const k in A) o[k] = Array.isArray(A[k]) ? [lerp(A[k][0], B[k][0], p), lerp(A[k][1], B[k][1], p)] : lerp(A[k], B[k], p); return o; }
// keys: [[t, poseName, dur?], ...] → pose at time t
function poseAt(keys, t, dur = .35, TB = POSES) {
  let i = 0; for (let k = 0; k < keys.length; k++) if (t >= keys[k][0]) i = k;
  const prev = i > 0 ? keys[i - 1][1] : keys[0][1];
  return poseMix(TB[prev], TB[keys[i][1]], eio(prog(t, keys[i][0], keys[i][0] + (keys[i][2] || dur))));
}
const bpAt = (keys, t, dur) => poseAt(keys, t, dur, BP);
function face(o) {
  const m = o.mouth || 'smile';
  const mouth = m === 'laugh' ? `<path d="M 6 14 Q 22 34 36 12 Z" fill="${OL}"/>` : m === 'o' ? `<ellipse cx="22" cy="18" rx="7" ry="9" fill="${OL}"/>` : m === 'flat' ? `<path d="M 10 18 H 32" ${ST(5)}/>` : m === 'worried' ? `<path d="M 10 22 Q 21 12 32 22" ${ST(5)} fill="none"/>` : m === 'grin' ? `<path d="M 4 12 Q 22 30 40 10 Z" fill="#fff" ${ST(4)}/>` : `<path d="M 8 14 Q 21 28 34 12" ${ST(5)} fill="none"/>`;
  const lk = o.look || 0, ly = o.lookY || 0, er = o.eyeR || 5;
  const eyes = o.eyes === 'closed' ? `<path d="M 4 -6 q 6 -6 12 0 M 24 -6 q 6 -6 12 0" ${ST(4)} fill="none"/>` : o.eyes === 'wide' ? `<circle cx="10" cy="-6" r="9" fill="#fff" ${ST(3)}/><circle cx="30" cy="-6" r="9" fill="#fff" ${ST(3)}/><circle cx="${10 + lk * .5}" cy="${-6 + ly * .5}" r="4.5" fill="${OL}"/><circle cx="${30 + lk * .5}" cy="${-6 + ly * .5}" r="4.5" fill="${OL}"/>` : `<circle cx="${10 + lk}" cy="${-6 + ly}" r="${er}" fill="${OL}"/><circle cx="${30 + lk}" cy="${-6 + ly}" r="${er}" fill="${OL}"/>`;
  const brow = o.brow ? `<path d="M 2 -20 L 16 -16 M 38 -20 L 24 -16" ${ST(4)}/>` : '';
  const sweat = o.sweat ? `<path d="M -26 -36 q 8 14 0 20 q -8 -6 0 -20 Z" fill="#BFE6F2" ${ST(3)}/>` : '';
  return `${eyes}${brow}${mouth}${sweat}`;
}
function glassSvg(fill = '#F2B544') { return `<path d="M -16 -34 L 16 -34 L 12 22 L -12 22 Z" fill="#E8F4F8" ${ST(4)}/><path d="M -14 -10 L 14 -10 L 11 20 L -11 20 Z" fill="${fill}"/>`; }
function stick(x, y, s, col, pose, o = {}) {
  const dir = o.dir || 1, lr = pose.lean * Math.PI / 180;
  const Sx = Math.sin(lr) * 125, Sy = -Math.cos(lr) * 125;
  const tilt = pose.tilt + (o.tiltAdd || 0);
  const Hx = Sx + Math.sin(lr) * 58, Hy = Sy - Math.cos(lr) * 58;
  const [e2x, e2y, h2x, h2y] = ik(Sx, Sy, Sx + pose.h2[0], Sy + pose.h2[1], 66, 74, 1);
  const [e1x, e1y, h1x, h1y] = ik(Sx, Sy, Sx + pose.h1[0], Sy + pose.h1[1], 66, 74, 1);
  const glass = o.glass ? `<g transform="translate(${h1x + 8} ${h1y - 16})">${glassSvg(o.glassC)}</g>` : '';
  return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s})">
    <path d="M 0 0 L 74 6 L 80 96 M 0 0 L 66 14 L 70 98" ${ST(10)} fill="none"/>
    <path d="M ${Sx} ${Sy} L ${e2x} ${e2y} L ${h2x} ${h2y}" stroke="#6E6A64" stroke-width="10" fill="none" stroke-linecap="round" stroke-linejoin="round"/><circle cx="${h2x}" cy="${h2y}" r="9" fill="#6E6A64"/>
    <path d="M 0 0 L ${Sx} ${Sy}" stroke="${OL}" stroke-width="52" stroke-linecap="round"/><path d="M 0 0 L ${Sx} ${Sy}" stroke="${col}" stroke-width="40" stroke-linecap="round"/>
    <g transform="translate(${Hx} ${Hy}) rotate(${tilt})"><circle r="44" fill="${K.skin}" ${ST(8)}/><g transform="translate(-8 0)">${face(o)}</g></g>
    <path d="M ${Sx} ${Sy} L ${e1x} ${e1y} L ${h1x} ${h1y}" ${ST(11)} fill="none"/><path d="M ${Sx} ${Sy} L ${e1x} ${e1y}" stroke="${col}" stroke-width="5" stroke-linecap="round"/><circle cx="${h1x}" cy="${h1y}" r="10" fill="${OL}"/>
    ${glass}</g>`;
}
// big head-and-shoulders figure, origin = bottom centre of the torso (facing right; dir -1 mirrors)
function bust(x, y, s, col, pose, o = {}) {
  const dir = o.dir || 1;
  const ka = ik(140, -185, pose.h1[0], pose.h1[1], 165, 165, -1), kb = ik(140, -185, pose.h1[0], pose.h1[1], 165, 165, 1);
  const [ex, ey, hx, hy] = pose.h1[1] < -380 ? (ka[0] > kb[0] ? ka : kb) : (ka[1] > kb[1] ? ka : kb);
  const behind = pose.h1[1] < -380;
  const arm = `<path d="M 140 -185 L ${ex} ${ey} L ${hx} ${hy}" ${ST(34)} fill="none"/><path d="M 140 -185 L ${lerp(140, ex, .8)} ${lerp(-185, ey, .8)}" stroke="${o.sleeve || col}" stroke-width="20" stroke-linecap="round"/><circle cx="${hx}" cy="${hy}" r="27" fill="${OL}"/>`;
  const hair = o.hair ? `<path d="M -138 -10 Q -140 -150 0 -146 Q 120 -146 136 -40 Q 90 -110 -20 -112 Q -100 -100 -138 -10 Z" fill="${o.hair}" ${ST(8)}/><circle cx="-112" cy="-120" r="46" fill="${o.hair}" ${ST(8)}/>` : '';
  const specs = o.specs ? `<g transform="translate(36 -20)"><circle cx="-6" r="30" fill="none" ${ST(7)}/><circle cx="66" r="30" fill="none" ${ST(7)}/><path d="M 24 0 H 36" ${ST(7)}/></g>` : '';
  const apron = o.apron ? `<path d="M -110 -150 L 120 -150 L 140 400 L -130 400 Z" fill="#fff" ${ST(7)}/><path d="M -110 -150 L -150 -205 M 120 -150 L 150 -205" ${ST(6)}/>` : '';
  const coat = o.coat ? `<path d="M -190 400 L -190 -120 Q -190 -205 -60 -212 L 0 -60 L 60 -212 Q 190 -205 190 -120 L 190 400 Z" fill="#fff" ${ST(8)}/><path d="M 0 -60 V 400" ${ST(5)}/>` : '';
  const prop = o.glass ? `<g transform="translate(${hx + 18} ${hy - 44}) scale(2.3)">${glassSvg(o.glassC)}</g>` : o.pad ? `<g transform="translate(${hx + 10} ${hy - 70}) rotate(-8)"><rect x="-60" y="-80" width="120" height="150" rx="8" fill="#fff" ${ST(6)}/><path d="M -36 -40 H 36 M -36 -10 H 30 M -36 20 H 20" stroke="${K.grey}" stroke-width="9" stroke-linecap="round"/></g>` : o.pen ? `<path d="M ${hx} ${hy} l 40 -70" stroke="${K.blue}" stroke-width="14" stroke-linecap="round"/>` : '';
  return `<g transform="translate(${x} ${y}) scale(${s * dir} ${s}) rotate(${pose.lean})">
    <path d="M -195 400 L -195 -110 Q -195 -205 -95 -214 L 95 -214 Q 195 -205 195 -110 L 195 400 Z" fill="${col}" ${ST(9)}/>${coat}${apron}
    <path d="M -46 -214 Q 0 -150 46 -214" fill="#fff" ${ST(7)}/>
    ${behind ? arm : ''}<g transform="translate(0 -240) rotate(${pose.tilt + (o.tiltAdd || 0)}) translate(0 -125)"><circle r="130" fill="${K.skin}" ${ST(10)}/>${hair}<g transform="translate(-12 -6) scale(2.9) translate(-8 0)">${face(o)}</g>${specs}</g>
    ${behind ? '' : arm}
    ${prop}</g>`;
}
function stander(x, y, s, t, o = {}) { // standing figure (waitress, researcher)
  const sh = o.shirt || K.teal;
  const [e1x, e1y, h1x, h1y] = ik(0, -125, (o.h1 || [70, 40])[0], -125 + (o.h1 || [70, 40])[1], 66, 74, 1);
  const hair = o.hair ? `<path d="M -46 -10 Q -40 -60 0 -56 Q 40 -60 46 -10 Q 36 -40 0 -40 Q -36 -40 -46 -10 Z" fill="${o.hair}"/><circle cx="-38" cy="-40" r="16" fill="${o.hair}"/>` : '';
  const coat = o.coat ? `<path d="M -30 -140 L 30 -140 L 34 40 L -34 40 Z" fill="#fff" ${ST(4)}/>` : `<path d="M -22 -60 L 22 -60 L 26 20 L -26 20 Z" fill="#fff" ${ST(4)}/>`;
  const specs = o.specs ? `<path d="M -2 -8 a 10 10 0 1 0 0.1 0 M 26 -8 a 10 10 0 1 0 0.1 0" fill="none" ${ST(4)}/>` : '';
  const prop = o.prop === 'clip' ? `<g transform="translate(${h1x + 14} ${h1y - 24})"><rect x="-26" y="-34" width="52" height="66" rx="5" fill="#fff" ${ST(3)}/><path d="M -14 -14 H 14 M -14 0 H 14 M -14 14 H 6" stroke="${K.grey}" stroke-width="5"/></g>` : `<g transform="translate(${h1x + 10} ${h1y - 20})"><rect x="-20" y="-28" width="40" height="52" fill="#fff" ${ST(3)}/></g>`;
  return `<g transform="translate(${x} ${y}) scale(${s * (o.dir || 1)} ${s})"><path d="M -6 0 L -26 190 M 6 0 L 26 190" ${ST(10)} fill="none"/>
    <path d="M 0 0 L 0 -125" stroke="${OL}" stroke-width="52" stroke-linecap="round"/><path d="M 0 0 L 0 -125" stroke="${sh}" stroke-width="40" stroke-linecap="round"/>${coat}
    <g transform="translate(0 -183) rotate(${o.tilt || 0})"><circle r="44" fill="#fff" ${ST(8)}/>${hair}<g transform="translate(-8 0)">${face(o)}</g>${specs}</g>
    <path d="M 0 -125 L ${e1x} ${e1y} L ${h1x} ${h1y}" ${ST(11)} fill="none"/>${prop}</g>`;
}

// ---------- sets ----------
const FS = 1.9, FY = 1204, XL = 290, XR = 790; // seated pair: scale, hip line, x of left / right figure
function chair(x, y, s, dir) {
  return `<path d="M ${x - dir * 69 * s} ${y} L ${x - dir * 69 * s} ${y + 109 * s} M ${x - dir * 31 * s} ${y} L ${x - dir * 31 * s} ${y + 109 * s} M ${x - dir * 94 * s} ${y} L ${x - dir * 94 * s} ${y - 103 * s}" ${ST(9)}/><path d="M ${x - dir * 100 * s} ${y} H ${x - dir * 18 * s}" ${ST(12)}/>`;
}
function seatedPair(t, kb, ko, o = {}) {
  const pb = poseAt(kb, t), po = poseAt(ko, t);
  const ty = FY - 28 * FS;
  const table = o.noTable ? '' : `<ellipse cx="540" cy="${FY + 100 * FS}" rx="330" ry="24" fill="#6B5B45" opacity=".15"/><path d="M 540 ${ty} V ${FY + 108 * FS} M 465 ${FY + 108 * FS} H 615" ${ST(10)}/><path d="M 385 ${ty} H 695" stroke="${o.tableC || K.woodDk}" stroke-width="24" stroke-linecap="round"/><path d="M 385 ${ty} H 695" ${ST(4)}/>${o.onTable || ''}`;
  return `${o.noChairs ? '' : chair(XL, FY, FS, 1) + chair(XR, FY, FS, -1)}
    ${stick(XL, FY, FS, o.bCol || K.blue, pb, { dir: 1, mouth: o.bm, glass: o.bg, look: o.bl, sweat: o.bs, eyes: o.be, tiltAdd: o.bt })}
    ${stick(XR, FY, FS, o.oCol || K.orange, po, { dir: -1, mouth: o.om, glass: o.og, look: o.ol, sweat: o.os, eyes: o.oe, tiltAdd: o.ot })}
    ${table}`;
}
function cafeBG(t) {
  const fl = FY + 40 * FS;
  let planks = ''; for (let i = 0; i < 14; i++) planks += `<path d="M ${i * 90 - 40} ${fl} L ${i * 110 - 200} 1920" stroke="#CDB38F" stroke-width="4"/>`;
  return `${R(0, 0, 1080, fl, '#F5E4CC')}${R(0, fl - 150, 1080, 150, '#E7CDA8')}<path d="M 0 ${fl - 150} H 1080" ${ST(4)}/>${R(0, fl, 1080, 1920 - fl, '#E9D5B7')}${planks}<path d="M 0 ${fl} H 1080" ${ST(4)}/>
    <g><rect x="360" y="520" width="360" height="330" rx="14" fill="#D9ECF3" ${ST(7)}/><path d="M 360 700 Q 450 650 540 690 T 720 670 V 850 H 360 Z" fill="#BFD9C4"/><path d="M 540 520 V 850 M 360 680 H 720" ${ST(6)}/></g>
    ${[150, 930].map((x, i) => `<path d="M ${x} 0 V ${470 + 6 * Math.sin(t * 2 + i)}" ${ST(4)}/><path d="M ${x - 70} ${540} Q ${x} ${440} ${x + 70} ${540} Z" fill="${K.marker}" ${ST(6)}/><ellipse cx="${x}" cy="560" rx="60" ry="14" fill="${K.marker}" opacity=".35"/>`).join('')}
    <g transform="translate(70 ${fl - 150})"><rect x="-30" y="-70" width="60" height="70" rx="8" fill="#C46B4A" ${ST(5)}/><path d="M 0 -70 Q -40 -150 -10 -190 M 0 -70 Q 30 -160 50 -170 M 0 -70 Q 0 -140 10 -200" stroke="#4E9A6A" stroke-width="12" fill="none" stroke-linecap="round"/></g>`;
}
function labBG(t, o = {}) {
  const fl = FY + 40 * FS;
  let tiles = ''; for (let x = 0; x <= 1080; x += 90) tiles += `<path d="M ${x} 0 V ${fl}" stroke="#CFE0D8" stroke-width="3"/>`; for (let y = 0; y <= fl; y += 90) tiles += `<path d="M 0 ${y} H 1080" stroke="#CFE0D8" stroke-width="3"/>`;
  const wx = 330, wy = 470, ww = 420, wh = 330;
  const watcher = o.watcher === false ? '' : `<g opacity=".85"><circle cx="${wx + 300}" cy="${wy + 170 + 3 * Math.sin(t * 2)}" r="46" fill="#33404F"/><path d="M ${wx + 220} ${wy + wh} Q ${wx + 230} ${wy + 230} ${wx + 300} ${wy + 225} Q ${wx + 370} ${wy + 230} ${wx + 380} ${wy + wh} Z" fill="#33404F"/><rect x="${wx + 238}" y="${wy + 250 + 5 * Math.sin(t * 7)}" width="50" height="62" rx="4" fill="#8FA0B4"/></g>`;
  return `${R(0, 0, 1080, fl, '#E6F1EC')}${tiles}${R(0, fl, 1080, 1920 - fl, '#D5D9D8')}<path d="M 0 ${fl} H 1080" ${ST(4)}/>
    ${R(0, fl, 1080, 12, '#B9C2C0')}<rect x="300" y="150" width="480" height="34" rx="17" fill="#fff" ${ST(5)}/><path d="M 330 184 L 250 470 H 830 L 750 184 Z" fill="#fff" opacity=".25"/>
    <rect x="${wx}" y="${wy}" width="${ww}" height="${wh}" rx="8" fill="#56677C" ${ST(8)}/>${watcher}
    <path d="M ${wx + 40} ${wy + wh} L ${wx + 160} ${wy} M ${wx + 100} ${wy + wh} L ${wx + 220} ${wy}" stroke="#fff" stroke-width="18" opacity=".18"/>
    ${o.sign ? letter(230, 600, o.sign, o.signC || K.ink, 1) : ''}
    <g transform="translate(950 ${fl - 10})"><rect x="-50" y="-150" width="100" height="150" rx="6" fill="#fff" ${ST(5)}/><path d="M -50 -110 H 50" ${ST(4)}/><circle cx="30" cy="-130" r="7" fill="${K.red}"/></g>`;
}
function restBG(t) {
  const fl = FY + 40 * FS;
  let checks = '';
  return `${R(0, 0, 1080, fl, '#F3DDC4')}${R(0, fl - 260, 1080, 260, '#3F7D6B')}<path d="M 0 ${fl - 260} H 1080" ${ST(5)}/>${R(0, fl, 1080, 1920 - fl, '#C9A27C')}<path d="M 0 ${fl} H 1080" ${ST(4)}/>
    <g><rect x="80" y="420" width="380" height="420" rx="12" fill="#CFE8F5" ${ST(7)}/>
      <path d="M 80 760 H 460 V 840 H 80 Z" fill="#5C8FB0"/>
      <path d="M 100 760 V 600 L 140 560 L 180 600 V 760 Z M 190 760 V 560 L 235 510 L 280 560 V 760 Z M 290 760 V 620 L 330 580 L 370 620 V 760 Z" fill="#B5523B" ${ST(4)}/>
      <path d="M 410 760 V 640 M 410 640 l -40 -30 M 410 640 l 40 30 M 410 640 l -30 40 M 410 640 l 30 -40" stroke="${OL}" stroke-width="7" stroke-linecap="round" transform="rotate(${t * 40} 410 640)"/>
      <path d="M 270 420 V 840 M 80 600 H 460" ${ST(6)}/></g>
    <g transform="translate(860 330)"><path d="M 0 -330 V 0" ${ST(4)}/><path d="M -90 0 Q 0 -110 90 0 Z" fill="#3F7D6B" ${ST(6)}/></g>${checks}`;
}
function livingBG(t) {
  const fl = FY + 40 * FS;
  return `${R(0, 0, 1080, fl, '#ECE4F4')}${R(0, fl, 1080, 1920 - fl, '#D8C3A5')}<path d="M 0 ${fl} H 1080" ${ST(4)}/>
    <ellipse cx="540" cy="${fl + 120}" rx="520" ry="90" fill="#B9A6D9" ${ST(5)}/>
    <g><rect x="410" y="420" width="260" height="200" rx="8" fill="#FFF7E6" ${ST(7)}/><path d="M 430 600 L 500 510 L 550 560 L 600 490 L 650 600 Z" fill="#9FC7A8"/><circle cx="620" cy="470" r="22" fill="${K.marker}"/></g>
    <g transform="translate(120 ${fl})"><path d="M 0 0 V -560" ${ST(8)}/><path d="M -70 -540 L -40 -640 H 40 L 70 -540 Z" fill="${K.marker}" ${ST(6)}/><path d="M -40 10 H 40" ${ST(10)}/></g>
    <g transform="translate(980 ${fl})"><rect x="-40" y="-90" width="80" height="90" rx="10" fill="#C46B4A" ${ST(5)}/><path d="M 0 -90 Q -60 -200 -30 -260 M 0 -90 Q 40 -220 70 -230 M 0 -90 Q 10 -200 0 -300" stroke="#4E9A6A" stroke-width="14" fill="none" stroke-linecap="round"/></g>`;
}
function armchair(x, y, s, dir, col, front) {
  if (front) return `<rect x="${Math.min(x - dir * 110 * s, x + dir * 60 * s)}" y="${y - 46 * s}" width="${170 * s}" height="${40 * s}" rx="${18 * s}" fill="${col}" ${ST(7)}/>`;
  return `<rect x="${Math.min(x - dir * 125 * s, x - dir * 55 * s)}" y="${y - 175 * s}" width="${70 * s}" height="${215 * s}" rx="${26 * s}" fill="${col}" ${ST(7)}/><rect x="${Math.min(x - dir * 100 * s, x + dir * 75 * s)}" y="${y - 6 * s}" width="${175 * s}" height="${46 * s}" rx="${14 * s}" fill="${col}" ${ST(7)}/><path d="M ${x - dir * 90 * s} ${y + 40 * s} V ${y + 96 * s} M ${x + dir * 60 * s} ${y + 40 * s} V ${y + 96 * s}" ${ST(9)}/>`;
}
function livingPair(t, kb, ko, o = {}) {
  const pb = poseAt(kb, t), po = poseAt(ko, t);
  return `${armchair(XL, FY, FS, 1, '#7A5AF8')}${armchair(XR, FY, FS, -1, '#E58A3A')}
    <g transform="translate(540 ${FY + 60 * FS})"><rect x="-110" y="-20" width="220" height="24" rx="10" fill="${K.woodDk}" ${ST(5)}/><path d="M -90 4 V 90 M 90 4 V 90" ${ST(8)}/><g transform="translate(-40 -40)"><rect x="-22" y="-26" width="44" height="46" rx="8" fill="#fff" ${ST(4)}/></g><g transform="translate(45 -40)"><rect x="-22" y="-26" width="44" height="46" rx="8" fill="#fff" ${ST(4)}/></g></g>
    ${stick(XL, FY, FS, K.blue, pb, { dir: 1, mouth: o.bm, look: o.bl })}${stick(XR, FY, FS, K.orange, po, { dir: -1, mouth: o.om, look: o.ol, eyes: o.oe })}
    ${armchair(XL, FY, FS, 1, '#7A5AF8', 1)}${armchair(XR, FY, FS, -1, '#E58A3A', 1)}`;
}
function icon(kind, x, y, s, p, t) {
  if (p <= 0) return '';
  let g = '';
  if (kind === 'eye') g = `<path d="M -70 0 Q 0 -60 70 0 Q 0 60 -70 0 Z" fill="#fff" ${ST(5)}/><circle r="26" fill="${K.blue}" ${ST(4)}/><circle r="10" fill="${OL}"/>`;
  if (kind === 'brain') g = `<path d="M -60 20 Q -80 -30 -40 -50 Q -20 -80 20 -60 Q 70 -70 70 -20 Q 90 20 50 40 Q 20 60 -10 46 Q -50 60 -60 20 Z" fill="${K.violet}" ${ST(5)}/><path d="M -30 -40 Q -10 -20 -30 0 M 20 -50 Q 0 -20 20 0 M 0 -60 V 40" stroke="#fff" stroke-width="5" fill="none" opacity=".7"/>`;
  if (kind === 'heart') g = `<path d="M 0 40 C -40 10 -60 -10 -60 -30 C -60 -60 -20 -66 0 -40 C 20 -66 60 -60 60 -30 C 60 -10 40 10 0 40 Z" fill="${K.red}" ${ST(5)}/>`;
  if (kind === 'coin') g = `<circle r="50" fill="${K.marker}" ${ST(5)}/><circle r="36" fill="none" stroke="#E0B830" stroke-width="5"/><text x="0" y="22" text-anchor="middle" style="${SANS};font-size:60px" fill="${OL}">€</text>`;
  if (kind === 'nl') g = `<rect x="-70" y="-48" width="140" height="32" fill="#AE1C28" ${ST(3)}/><rect x="-70" y="-16" width="140" height="32" fill="#fff" ${ST(3)}/><rect x="-70" y="16" width="140" height="32" fill="#21468B" ${ST(3)}/>`;
  if (kind === 'soup') g = `<path d="M -60 -6 H 60 Q 56 50 0 54 Q -56 50 -60 -6 Z" fill="#fff" ${ST(5)}/><ellipse cx="0" cy="-6" rx="60" ry="14" fill="#E58A3A" ${ST(4)}/><path d="M -16 -30 q 8 -12 0 -24 M 14 -30 q 8 -12 0 -24" stroke="${K.grey}" stroke-width="5" fill="none" stroke-linecap="round"/>`;
  if (kind === 'drink') g = `<g transform="scale(1.6)">${glassSvg('#F2B544')}</g>`;
  return `<g transform="translate(${x} ${y}) scale(${s * p})">${g}</g>`;
}
function bubble(x, y, w, h, inner, p, tail = -1) { if (p <= 0) return ''; return `<g transform="translate(${x} ${y}) scale(${p})"><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="30" fill="#fff" ${ST(5)}/><path d="M ${tail * 20} ${h / 2 - 2} L ${tail * 60} ${h / 2 + 50} L ${tail * 70} ${h / 2 - 2} Z" fill="#fff" ${ST(5)}/><rect x="${-w / 2 + 3}" y="${h / 2 - 8}" width="${w - 6}" height="6" fill="#fff"/>${inner}</g>`; }
const scribble = (w, n, seed) => Array.from({ length: n }, (_, i) => `<path d="M ${-w / 2 + 30} ${-((n - 1) * 26) / 2 + i * 26} h ${(w - 60) * (.6 + .4 * hash(seed + i))}" stroke="${K.grey}" stroke-width="10" stroke-linecap="round"/>`).join('');
function chameleon(x, y, s, col, t) {
  const eyeA = t * 2.2, ex = 14 * Math.cos(eyeA), ey = 8 * Math.sin(eyeA * 1.3);
  const curl = 6 * Math.sin(t * 1.5);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -90 10 Q -150 20 -150 70 Q -150 ${110 + curl} -110 ${110 + curl} Q -80 ${105 + curl} -86 80 Q -92 62 -110 70" fill="none" stroke="${OL}" stroke-width="26" stroke-linecap="round"/><path d="M -90 10 Q -150 20 -150 70 Q -150 ${110 + curl} -110 ${110 + curl} Q -80 ${105 + curl} -86 80 Q -92 62 -110 70" fill="none" stroke="${col}" stroke-width="15" stroke-linecap="round"/>
    <path d="M -60 40 L -70 84 M 40 40 L 50 84" ${ST(12)}/>
    <path d="M -100 20 Q -80 -60 10 -56 Q 70 -54 96 -20 Q 120 10 92 34 L -70 40 Q -100 40 -100 20 Z" fill="${col}" ${ST(6)}/>
    <path d="M -60 -34 Q -40 -10 -50 30 M -20 -48 Q 0 -10 -10 34 M 20 -50 Q 40 -10 30 34" stroke="#fff" stroke-width="6" fill="none" opacity=".35"/>
    <path d="M 40 -56 L 70 -86 L 96 -30" fill="${col}" ${ST(5)}/>
    <circle cx="70" cy="-14" r="24" fill="${col}" ${ST(5)}/><circle cx="${70 + ex * .5}" cy="${-14 + ey * .5}" r="9" fill="${OL}"/>
    <path d="M 96 18 Q 104 22 112 14" ${ST(4)} fill="none"/></g>`;
}

// ---------- shots ----------
// 0 hook — café wide, the counterpart copies the chin pose at once
function s0(t) {
  const z = pop(t, 2.94, .22);
  const kb = [[0, 'chin']], ko = [[0, 'rest'], [.45, 'chin', .3]];
  const card = `<g transform="translate(540 380) rotate(-1.5)"><g filter="url(#kshadow)"><rect x="-480" y="-170" width="960" height="340" rx="28" fill="${K.card}" stroke="${OL}" stroke-width="3"/></g>
    ${serifLine(0, -80, 'Wenn jemand genauso sitzt wie du …', 1)}${z <= 0 ? keyword(0, 60, 'GENAUSO?', K.blue, 1, { max: 150, hl: prog(t, .25, .8) }) : ''}</g>${stamp(540, 440, -6, 'KEIN ZUFALL', K.red, z, 104)}`;
  return `${cafeBG(t)}${seatedPair(t, kb, ko, { om: t > .5 ? 'smile' : 'flat', ol: t < .45 ? 6 : 0 })}${card}`;
}
// 1 "Achte mal drauf." — camera pushes in through a magnifying glass
function s1(t) {
  const k = lerp(1, 1.18, eio(prog(t, 4.38, 5.66)));
  const lp = back(prog(t, 4.4, 4.7));
  const lx = lerp(1300, 560, eout(prog(t, 4.4, 4.75))) + 30 * Math.sin(t * 3), ly = 930;
  const lens = lp > 0 ? `<g transform="translate(${lx} ${ly}) scale(${cl(lp, 0, 1.2)})"><path d="M 230 230 L 360 360" stroke="${OL}" stroke-width="56" stroke-linecap="round"/><path d="M 230 230 L 360 360" stroke="${K.woodDk}" stroke-width="40" stroke-linecap="round"/><circle r="300" fill="#fff" fill-opacity=".12" stroke="${OL}" stroke-width="34"/><circle r="300" fill="none" stroke="#C9D2E6" stroke-width="20"/><path d="M -200 -120 Q -150 -220 -40 -250" stroke="#fff" stroke-width="16" fill="none" stroke-linecap="round" opacity=".7"/></g>` : '';
  return `${zoom(540, 1000, k, `${cafeBG(t)}${seatedPair(t, [[4.38, 'chin'], [4.6, 'rest']], [[4.38, 'chin'], [4.7, 'rest']], { bl: 5 * Math.sin(t * 6), ol: -5 * Math.sin(t * 6) })}`)}${lens}
    ${lp > 0 ? icon('eye', lx, ly - 330, .9, pop(t, 4.8, .25), t) : ''}${tag(t, 4.38, 'ACHTE MAL DRAUF', K.ink, { max: 110 })}`;
}
// 2 "Du stützt dein Kinn auf die Hand." — close-up on YOU
function s2(t) {
  const pose = bpAt([[5.66, 'rest'], [6.2, 'chin', .45]], t);
  return `${cafeBG(t)}${R(0, 0, 1080, 1920, '#F5E4CC', 'opacity=".35"')}
    ${bust(470, 1500, 2.05, K.blue, pose, { dir: 1, mouth: t > 6.7 ? 'smile' : 'flat', look: t > 6.3 ? 3 : 0, eyes: t > 6.9 && t < 7.05 ? 'closed' : '' })}
    ${letter(860, 330, 'DU', K.blue, pop(t, 5.7, .25))}`;
}
// split-screen portraits (mirror): left = you, right = counterpart
function split(t, kb, ko, ob = {}, oo = {}, id = 'sp') {
  const bgL = `${R(30, 500, 500, 920, '#DCEAF5')}<rect x="70" y="560" width="200" height="170" rx="10" fill="#fff" opacity=".6"/>`;
  const bgR = `${R(550, 500, 500, 920, '#FBE3CD')}<rect x="810" y="560" width="200" height="170" rx="10" fill="#fff" opacity=".6"/>`;
  return `${paper()}${panel(id + 'L', 30, 500, 500, 920, `${bgL}${bust(250, 1500, 1.55, K.blue, bpAt(kb, t), { dir: 1, ...ob })}`)}
    ${panel(id + 'R', 550, 500, 500, 920, `${bgR}${bust(830, 1500, 1.55, K.orange, bpAt(ko, t), { dir: -1, ...oo })}`)}`;
}
// 3 "Ein paar Sekunden später macht dein Gegenüber dasselbe." — split: count 1-2-3, then the copy
function s3(t) {
  const n = t < 7.6 ? 0 : Math.min(3, Math.floor((t - 7.6) / .45) + 1);
  const cnt = n > 0 && t < 9.3 ? `<g transform="translate(540 300)"><circle r="88" fill="#fff" ${ST(7)}/><text y="44" text-anchor="middle" style="${SANS};font-size:130px" fill="${K.ink}" transform="scale(${1 + .25 * (1 - eout(prog(t, 7.6 + (n - 1) * .45, 7.6 + (n - 1) * .45 + .2)))})">${n}</text></g>` : '';
  return `${split(t, [[7.42, 'chin']], [[7.42, 'rest'], [9.0, 'chin', .45]], { mouth: 'smile' }, { mouth: t > 9.4 ? 'smile' : 'flat', look: t > 8.4 && t < 9.0 ? -4 : 0 }, 's3')}
    ${cnt}${tag(t, 9.3, 'DASSELBE', K.orange, { y: 300, max: 140, hl: 1 })}`;
}
// 4 "Du lachst und greifst zum Glas, und schon greift die andere Person auch zum Glas." — table close-up
function s4(t) {
  const pb = bpAt([[10.46, 'rest'], [11.12, 'reach', .3], [11.5, 'glass', .5]], t);
  const po = bpAt([[10.46, 'rest'], [12.58, 'reach', .3], [13.25, 'glass', .5]], t);
  const laugh = t > 10.58 && t < 11.3;
  const shake = laugh ? 4 * Math.sin(t * 50) : 0;
  const ty = 1180;
  const gl = (x, held) => held ? '' : `<g transform="translate(${x} ${ty - 50}) scale(2.3)">${glassSvg()}</g>`;
  return `${cafeBG(t)}${zoom(540, 900, 1.05, '')}
    ${bust(250, 1330 + shake, 1.3, K.blue, pb, { dir: 1, mouth: laugh ? 'laugh' : 'smile', tiltAdd: laugh ? -10 : 0, glass: t > 11.4, eyes: laugh ? 'closed' : '' })}
    ${bust(830, 1330, 1.3, K.orange, po, { dir: -1, mouth: t > 13.3 ? 'smile' : 'flat', glass: t > 13.2, look: t > 11.4 && t < 12.6 ? -4 : 0 })}
    ${R(-20, ty, 1120, 260, K.wood, ST(6))}${R(-20, ty, 1120, 26, '#DDB487', ST(5))}
    ${gl(445, t > 11.4)}${gl(635, t > 13.2)}
    ${tag(t, 13.92, 'AUCH', K.orange, { y: 300, max: 150, hl: 1 })}`;
}
// 5 "Keiner von euch tut das mit Absicht." — café wide, both on autopilot
function s5(t) {
  const sway = Math.sin(t * 2);
  return `${cafeBG(t)}${seatedPair(t, [[15.22, 'glass'], [15.8, 'rest', .5]], [[15.22, 'glass'], [16.1, 'rest', .5]], { bt: 4 * sway, ot: 4 * sway, be: t > 16.6 && t < 16.8 ? 'closed' : '', oe: t > 16.62 && t < 16.82 ? 'closed' : '', bg: t < 15.8, og: t < 16.1 })}
    ${tag(t, 15.22, 'KEINE ABSICHT', K.red, { max: 120, extra: cross(400, -70, .8, prog(t, 16.4, 16.8)) })}`;
}
// 6 "Euer Gehirn macht das ganz von allein." — x-ray heads, brains linked
function s6(t) {
  const b = pop(t, 17.66, .3), xr = eout(prog(t, 17.6, 17.9)), link = prog(t, 18.3, 18.9);
  const nod = t > 18.5 ? 6 * Math.sin((t - 18.5) * 5) : 0;
  const head = (x, dir, col) => `<g transform="translate(${x} 1420)"><path d="M -230 520 L -230 -150 Q -230 -230 -140 -240 L 140 -240 Q 230 -230 230 -150 L 230 520 Z" fill="${col}" ${ST(9)}/>
    <g transform="translate(0 -250) rotate(${nod * dir}) translate(0 -300)"><circle r="260" fill="${mix('#FFFFFF', '#EEE9FF', xr)}" ${ST(10)}/><g transform="translate(${dir * 50 - 80} 90) scale(4) translate(-8 0)">${face({ mouth: 'smile', look: dir * 3 })}</g>${icon('brain', -dir * 10, -110, 2.3, b, t)}</g></g>`;
  let pulses = '';
  if (link > 0) for (let i = 0; i < 4; i++) { const q = ((t - 18.3) * .9 + i * .25) % 1; pulses += `<circle cx="${lerp(300, 780, q)}" cy="${720 - 140 * Math.sin(q * Math.PI)}" r="14" fill="${K.violet}" opacity="${cl(link * 2)}"/>`; }
  return `${paper()}${head(250, 1, K.blue)}${head(830, -1, K.orange)}
    ${link > 0 ? `<path d="M 300 720 Q 540 440 ${lerp(300, 780, link)} ${lerp(720, 720, link)}" stroke="${K.violet}" stroke-width="10" fill="none" stroke-dasharray="20 14" stroke-dashoffset="${-t * 80}"/>` : ''}${pulses}
    ${tag(t, 17.66, 'DEIN GEHIRN', K.violet, { y: 290, max: 130 })}`;
}
// 7 "Psychologen nennen das den Chamäleon-Effekt." — chameleon turns from blue to orange
function s7(t) {
  const c = mix(K.blue, K.orange, eio(prog(t, 20.5, 21.9)));
  const pt = eout(prog(t, 20.6, 20.9));
  return `${paper()}<path d="M -20 1220 Q 400 1150 700 1190 T 1100 1140" stroke="${OL}" stroke-width="44" fill="none" stroke-linecap="round"/><path d="M -20 1220 Q 400 1150 700 1190 T 1100 1140" stroke="${K.woodDk}" stroke-width="32" fill="none" stroke-linecap="round"/>
    ${[[860, 1150, -30], [980, 1120, 20], [420, 1170, -150]].map(([x, y, r]) => `<path transform="translate(${x} ${y}) rotate(${r})" d="M 0 0 Q 40 -50 100 -20 Q 50 20 0 0 Z" fill="#4E9A6A" ${ST(5)}/>`).join('')}
    ${chameleon(650, 1010 - 6 * Math.sin(t * 2), 2.7, c, t)}
    ${stander(190, 1210, 1.25, t, { shirt: K.violet, coat: 1, specs: 1, h1: [lerp(40, 120, pt), lerp(60, -30, pt)], prop: 'clip', mouth: talkM(t, 20.12, 21.9) })}
    ${t > 21.99 ? `<g opacity="${cl(1 - prog(t, 22.4, 22.66))}">${[0, 1, 2, 3, 4, 5].map(i => { const a = i / 6 * 6.283, r = 230 + 140 * eout(prog(t, 21.99, 22.4)); return `<circle cx="${650 + r * Math.cos(a)}" cy="${1000 + r * Math.sin(a) * .7}" r="12" fill="${K.teal}"/>`; }).join('')}</g>` : ''}
    ${tag(t, 21.99, 'CHAMÄLEON-EFFEKT', K.teal, { y: 380, max: 120, hl: 1, sub: 'Psychologen nennen das …' })}`;
}
// 8 "Und sie haben ihn getestet." — lab: clipboard close-up, stamp
function s8(t) {
  const up = eout(prog(t, 22.66, 22.95));
  const ticks = [23.0, 23.15].map((t0, i) => check(450, 860 + i * 140, .8, prog(t, t0, t0 + .15), K.blue)).join('');
  return `${labBG(t, { watcher: false })}<rect x="0" y="0" width="1080" height="1920" fill="#fff" opacity=".25"/>
    <g transform="translate(0 ${(1 - up) * 900}) rotate(-3 540 1000)"><rect x="250" y="560" width="580" height="780" rx="24" fill="${K.woodDk}" ${ST(8)}/><rect x="290" y="620" width="500" height="690" rx="8" fill="#fff" ${ST(5)}/><rect x="440" y="530" width="200" height="70" rx="14" fill="${K.grey}" ${ST(6)}/>
      ${[0, 1, 2].map(i => `<rect x="340" y="${830 + i * 140}" width="60" height="60" rx="8" fill="none" ${ST(5)}/><path d="M 440 ${860 + i * 140} h ${220 + 60 * hash(i)}" stroke="${K.grey}" stroke-width="14" stroke-linecap="round"/>`).join('')}
      <path d="M 340 700 h 300" stroke="${OL}" stroke-width="18" stroke-linecap="round"/>${ticks.replace(/translate\(450/g, 'translate(370')}
      ${stamp(560, 1150, -8, 'GETESTET', K.blue, pop(t, 23.3, .2), 100)}</g>
    ${bust(1000, 1720, 1.15, '#fff', BP.pad, { dir: -1, coat: 1, specs: 1, pad: 1, mouth: 'smile' })}`;
}
function labPair(t, kb, ko, o = {}) { return `${labBG(t, o)}${seatedPair(t, kb, ko, { noTable: true, ...o })}`; }
// 9 "Menschen sprachen mit einer fremden Person, die heimlich ihre Haltung und Gesten nachmachte." — lab, group A
function s9(t) {
  const kb = [[24.2, 'talk'], [25.3, 'chin', .4], [27.6, 'scratch', .4], [28.5, 'talk', .3]];
  const ko = [[24.2, 'rest'], [26.0, 'chin', .5], [28.1, 'scratch', .4], [29.1, 'talk', .4]];
  const k = t < 26.84 ? lerp(1, 1.06, prog(t, 24.2, 26.84)) : lerp(1.32, 1.38, prog(t, 26.84, 30.14));
  const cy = t < 26.84 ? 1000 : 1040;
  const sly = t > 25.8 && t < 26.6;
  return `${zoom(540, cy, k, labPair(t, kb, ko, { sign: 'A', signC: K.orange, bm: talkM(t, 24.4, 29.8), ol: sly ? 10 : 0, om: sly ? 'grin' : 'smile' }))}
    ${tag(t, 26.84, 'MACHT HEIMLICH NACH', K.orange, { max: 110, hl: 1 })}`;
}
// 10 "Andere sprachen mit jemandem, der das nicht tat." — A / B panels stacked
function s10(t) {
  const pA = labPair(t, [[0, 'chin']], [[0, 'chin']], { sign: false, watcher: false, bm: 'smile' });
  const pB = labPair(t, [[30.14, 'talk'], [31.0, 'chin', .4], [32.0, 'glass', .4]], [[30.14, 'stiff']], { sign: false, watcher: false, bm: talkM(t, 30.3, 32.9), bg: t > 32.0, oCol: K.grey, om: 'flat' });
  const slide = eout(prog(t, 30.14, 30.4));
  return `${paper()}${panel('pA', 30, 170, 1020, 600, `<g transform="translate(108 -374) scale(.8)">${pA}</g>`)}${letter(100, 240, 'A', K.orange)}${check(960, 260, .9, 1)}
    <g transform="translate(${(1 - slide) * 1100} 0)">${panel('pB', 30, 800, 1020, 600, `<g transform="translate(108 256) scale(.8)">${pB}</g>`)}${letter(100, 870, 'B', K.grey)}${cross(960, 890, .9, prog(t, 32.44, 32.8))}</g>`;
}
// 11 "Wer nachgeahmt wurde, mochte sein Gegenüber danach mehr." — questionnaire, pen circles the happiest face
function s11(t) {
  const target = 4;
  const fx = i => 300 + i * 120;
  const px = t < 34.5 ? lerp(1150, fx(0), eout(prog(t, 33.3, 34.0))) : lerp(fx(0), fx(target), eio(prog(t, 34.5, 35.4)));
  const py = 930 + (t > 35.4 ? 40 * Math.sin((t - 35.4) * 14) * (1 - prog(t, 35.4, 35.8)) : 0);
  const circ = prog(t, 35.4, 35.8);
  const faces = [0, 1, 2, 3, 4].map(i => { const m = ['worried', 'worried', 'flat', 'smile', 'laugh'][i]; return `<g transform="translate(${fx(i)} 850)"><circle r="48" fill="#fff" ${ST(6)}/><g transform="translate(-18 4) scale(1.15) translate(-8 0)">${face({ mouth: m })}</g></g>`; }).join('');
  return `${R(0, 0, 1080, 1920, '#E7D3B5')}${Array.from({ length: 9 }, (_, i) => `<path d="M 0 ${i * 220 + 40} H 1080" stroke="#D6BE9A" stroke-width="6"/>`).join('')}
    <g transform="rotate(-2 540 900)"><rect x="200" y="420" width="680" height="900" rx="10" fill="#fff" ${ST(7)}/>${letter(280, 500, 'A', K.orange, pop(t, 33.3, .25))}
      <path d="M 360 500 h 360 M 270 620 h 520 M 270 680 h 420" stroke="${K.grey}" stroke-width="16" stroke-linecap="round"/>
      ${faces}${circ > 0 ? `<ellipse cx="${fx(target)}" cy="850" rx="72" ry="66" fill="none" stroke="${K.blue}" stroke-width="10" pathLength="1" style="stroke-dasharray:${circ} 1"/>` : ''}
      <path d="M 270 1020 h 520 M 270 1100 h 380" stroke="${K.grey}" stroke-width="16" stroke-linecap="round" opacity=".6"/></g>
    <path d="M ${px + 30} ${py + 40} L ${px + 420} ${py + 700}" ${ST(46)}/><path d="M ${px + 250} ${py + 410} L ${px + 420} ${py + 700}" stroke="${K.blue}" stroke-width="32" stroke-linecap="round"/><path d="M ${px} ${py} l 40 64" stroke="${K.blue}" stroke-width="16" stroke-linecap="round"/><circle cx="${px + 40}" cy="${py + 64}" r="30" fill="${OL}"/>
    ${icon('heart', 820, 470, 1.8, pop(t, 35.82, .3) * (1 + .06 * Math.sin(t * 10)), t)}
    ${tag(t, 35.82, 'MOCHTE IHN MEHR', K.teal, { y: 250, max: 110 })}`;
}
// 12 "Und das Gespräch fühlte sich für ihn leichter an." — lab medium shot, bubbles float up like balloons
function s12(t) {
  let bub = '';
  for (let i = 0; i < 3; i++) { const t0 = 36.7 + i * .7, q = pop(t, t0, .25); bub += bubble(i % 2 ? 760 : 320, 720 - (t - t0) * 90, 220, 110, scribble(220, 2, i), q * (1 - prog(t, t0 + 1.8, t0 + 2.1)), i % 2 ? 1 : -1); }
  return `${zoom(540, 1080, 1.15, labPair(t, [[36.3, 'forward'], [37.2, 'talk', .4], [38.4, 'rest', .4]], [[36.3, 'forward'], [37.6, 'talk', .4]], { sign: 'A', signC: K.orange, bm: talkM(t, 36.5, 37.6), om: talkM(t, 37.8, 39.2) }))}${bub}
    ${tag(t, 38.2, 'LEICHTER', K.teal, { y: 300, max: 150, hl: 1 })}`;
}
// 13 "Dabei hatte niemand bemerkt, was passiert war." — behind the one-way mirror
function s13(t) {
  const inner = labPair(t, [[39.44, 'rest'], [40.2, 'talk', .4]], [[39.44, 'rest'], [40.5, 'talk', .4]], { sign: 'A', signC: K.orange, watcher: false, bm: talkM(t, 39.6, 41.6), om: talkM(t, 40.6, 42) });
  const q1 = pop(t, 40.3, .25), q2 = pop(t, 40.6, .25);
  const wr = 6 * Math.sin(t * 16);
  return `${R(0, 0, 1080, 1920, '#7C889A')}${R(0, 1300, 1080, 620, '#6A7587')}
    ${panel('win13', 110, 300, 860, 760, `<g transform="translate(64 -205) scale(.82)">${inner}</g><rect x="110" y="300" width="860" height="760" fill="#9DB4CC" opacity=".18"/>`, { sw: 12 })}
    <path d="M 160 1060 L 330 300 M 260 1060 L 430 300" stroke="#fff" stroke-width="22" opacity=".12"/>
    ${q1 > 0 ? `<g transform="translate(300 410) scale(${q1})"><text text-anchor="middle" y="40" style="${SANS};font-size:130px" fill="${K.red}" stroke="#fff" stroke-width="6" paint-order="stroke">?</text></g>` : ''}${q2 > 0 ? `<g transform="translate(780 410) scale(${q2})"><text text-anchor="middle" y="40" style="${SANS};font-size:130px" fill="${K.red}" stroke="#fff" stroke-width="6" paint-order="stroke">?</text></g>` : ''}
    <g transform="translate(330 1330)"><path d="M -230 600 L -230 40 Q -230 -50 -120 -60 L 120 -60 Q 230 -50 230 40 L 230 600 Z" fill="#fff" ${ST(9)}/><circle cy="-190" r="150" fill="#fff" ${ST(10)}/><path d="M -150 -200 Q -120 -330 0 -340" stroke="${OL}" stroke-width="10" fill="none" opacity=".25"/></g>
    <g transform="translate(720 1260) rotate(-12)"><rect x="-120" y="-150" width="240" height="300" rx="12" fill="${K.woodDk}" ${ST(7)}/><rect x="-100" y="-120" width="200" height="250" fill="#fff" ${ST(4)}/>${[0, 1, 2].map(i => `<path d="M -70 ${-70 + i * 60} h ${i === 2 ? 60 + 80 * prog(t, 40.9, 41.8) : 140}" stroke="${K.grey}" stroke-width="12" stroke-linecap="round"/>`).join('')}
      <path d="M ${-10 + 80 * prog(t, 40.9, 41.8)} ${50 + wr} l 60 120" stroke="${OL}" stroke-width="16" stroke-linecap="round"/></g>`;
}
// 14 "In einem Restaurant in den Niederlanden ging es sogar um Geld." — Dutch canal street
function s14(t) {
  const k = lerp(1, 1.08, prog(t, 42.28, 45.88));
  const houses = [['#B5523B', 760], ['#E9D8B4', 880], ['#2F6F73', 820], ['#C9883E', 900], ['#8A3B2E', 780]];
  let hs = '';
  houses.forEach(([c, h], i) => {
    const x = i * 216, top = 1180 - h;
    let win = ''; for (let r = 0; r < 3; r++) for (let q = 0; q < 2; q++) win += `<rect x="${x + 44 + q * 80}" y="${top + 150 + r * 150}" width="50" height="90" rx="6" fill="#DDEFF7" ${ST(4)}/>`;
    hs += `<path d="M ${x} 1180 V ${top + 60} H ${x + 40} V ${top + 20} H ${x + 70} V ${top - 20} H ${x + 146} V ${top + 20} H ${x + 176} V ${top + 60} H ${x + 216} V 1180 Z" fill="${c}" ${ST(6)}/>${win}`;
  });
  const flag = pop(t, 43.8, .3);
  const coinP = prog(t, 45.38, 45.88), cy = 860 - 260 * Math.sin(coinP * Math.PI * .5);
  return `${zoom(540, 1000, k, `${R(0, 0, 1080, 1180, '#CFE8F5')}<circle cx="880" cy="230" r="70" fill="${K.marker}" opacity=".8"/>${hs}
    <g transform="translate(432 1180)"><rect x="0" y="-250" width="216" height="250" fill="#E9D8B4" ${ST(6)}/><path d="M -10 -260 H 226 L 206 -190 H 10 Z" fill="${K.red}" ${ST(5)}/>${[0, 1, 2, 3, 4].map(i => `<path d="M ${10 + i * 44} -260 L ${22 + i * 40} -190" stroke="#fff" stroke-width="14"/>`).join('')}<rect x="76" y="-160" width="64" height="160" rx="6" fill="${K.woodDk}" ${ST(5)}/><rect x="14" y="-150" width="50" height="70" rx="5" fill="#FFE9A8" ${ST(4)}/><rect x="152" y="-150" width="50" height="70" rx="5" fill="#FFE9A8" ${ST(4)}/></g>
    ${flag > 0 ? `<g transform="translate(650 640)"><path d="M 0 0 L -120 -60" ${ST(8)}/><g transform="translate(-120 -60) scale(${flag}) rotate(${-26 + 4 * Math.sin(t * 6)})"><g transform="translate(-75 0)">${icon('nl', 0, 0, 1.05, 1, t)}</g></g></g>` : ''}
    ${R(0, 1180, 1080, 740, '#5C8FB0')}<path d="M 0 1180 H 1080" ${ST(6)}/>${R(0, 1180, 1080, 26, '#9B8A78', ST(4))}
    ${[0, 1, 2, 3].map(i => `<path d="M ${(i * 300 + t * 40) % 1200 - 100} ${1290 + i * 30} q 30 -12 60 0 t 60 0" stroke="#A9CBE0" stroke-width="7" fill="none"/>`).join('')}
    <g transform="translate(200 1164)"><circle cx="-40" cy="-40" r="36" fill="none" ${ST(6)}/><circle cx="50" cy="-40" r="36" fill="none" ${ST(6)}/><path d="M -40 -40 L 0 -90 L 50 -40 M 0 -90 L 20 -110 M -10 -40 L 0 -90" ${ST(6)} fill="none"/></g>`)}
    ${coinP > 0 ? `<g transform="translate(540 ${cy}) scale(${Math.cos(t * 14) * 1.7} 1.7)">${icon('coin', 0, 0, 1, 1, t)}</g>` : ''}
    ${tag(t, 44.88, 'SOGAR UM GELD', K.orange, { max: 120, sub: 'Restaurant · Niederlande' })}`;
}
// restaurant table with one seated guest (left) and the waitress (right)
function restScene(t, guestCol, kb, wOpt, gOpt = {}) {
  const pb = poseAt(kb, t);
  const ty = FY - 28 * FS;
  return `${restBG(t)}${chair(XL, FY, FS, 1)}${stick(XL, FY, FS, guestCol, pb, { dir: 1, ...gOpt })}
    <path d="M 540 ${ty} V ${FY + 108 * FS} M 465 ${FY + 108 * FS} H 615" ${ST(10)}/><path d="M 380 ${ty} H 700" stroke="#fff" stroke-width="26" stroke-linecap="round"/><path d="M 380 ${ty} H 700" ${ST(4)}/>${[0, 1, 2, 3, 4, 5, 6, 7].map(i => `<rect x="${384 + i * 40}" y="${ty - 4}" width="20" height="10" fill="${K.red}"/>`).join('')}
    ${stander(790, FY + 182, 1.75, t, { shirt: K.teal, hair: '#6B3E26', ...wOpt })}`;
}
// 15 "Eine Kellnerin wiederholte die Bestellung mancher Gäste Wort für Wort." — waitress repeats the order exactly
function s15(t) {
  const g = pop(t, 47.6, .25), w = pop(t, 48.98, .25);
  const order = `${icon('soup', -60, 0, .75, 1, t)}${icon('drink', 60, 0, .75, 1, t)}`;
  return `${restScene(t, K.blue, [[45.88, 'talk'], [47.3, 'wave', .3], [48.4, 'talk', .3]], { h1: [70, 30], mouth: t > 48.98 && t < 49.6 ? 'o' : 'smile', tilt: t > 47.6 && t < 48.9 ? 8 : 0 }, { mouth: talkM(t, 47.4, 48.6) })}
    ${bubble(300, 720, 300, 150, order, g, -1)}${bubble(790, 720, 300, 150, order, w, 1)}${w > .5 ? `<text x="545" y="760" text-anchor="middle" style="${SANS};font-size:130px" fill="${K.teal}" stroke="#fff" stroke-width="8" paint-order="stroke">=</text>` : ''}
    ${tag(t, 48.98, 'WORT FÜR WORT', K.blue, { y: 320, max: 130, hl: 1 })}`;
}
// 16 "Bei den anderen sagte sie nur: Kommt sofort." — close on the waitress, grey guest from behind
function s16(t) {
  const turn = eio(prog(t, 50.5, 50.9));
  const say = pop(t, 52.24, .22);
  return `${restBG(t)}${R(0, 0, 1080, 1920, '#F3DDC4', 'opacity=".25"')}
    ${bust(650, 1560, 1.85, K.teal, bpAt([[50.36, 'pad'], [51.6, 'talk', .3]], t), { dir: -1, hair: '#6B3E26', apron: 1, pad: t < 51.8, mouth: t > 52.2 && t < 52.8 ? 'o' : 'flat', look: lerp(4, -4, turn), eyes: t > 51.2 && t < 51.35 ? 'closed' : '' })}
    <g transform="translate(150 1600)"><path d="M -200 400 L -200 -60 Q -200 -150 -90 -160 L 120 -160 Q 220 -150 220 -60 L 220 400 Z" fill="${K.grey}" ${ST(9)}/><circle cy="-300" r="140" fill="#fff" ${ST(10)}/></g>
    ${bubble(560, 330, 760, 230, `<text y="36" text-anchor="middle" style="${SANS};font-size:96px" fill="${K.ink}">„Kommt sofort.“</text>`, say, 1)}`;
}
// 17 "Die Gäste, deren Worte sie wiederholt hatte, gaben deutlich mehr Trinkgeld." — two tip saucers
function s17(t) {
  const pile = (x, n, t0) => { let s = ''; for (let i = 0; i < n; i++) { const p = prog(t, t0 + i * .07, t0 + i * .07 + .22); if (p <= 0) continue; s += `<ellipse cx="${x + (i % 3 - 1) * 8}" cy="${lerp(700, 1110 - i * 16, eout(p))}" rx="44" ry="15" fill="${K.marker}" ${ST(4)}/>`; } return s; };
  const saucer = x => `<ellipse cx="${x}" cy="1130" rx="130" ry="34" fill="#fff" ${ST(6)}/><ellipse cx="${x}" cy="1124" rx="80" ry="18" fill="none" stroke="${K.grey}" stroke-width="4"/>`;
  const receipt = x => `<g transform="translate(${x} 1150) rotate(-8)"><path d="M -40 -10 L 40 -10 L 40 80 L -40 80 Z" fill="#fff" ${ST(4)}/><path d="M -24 14 h 48 M -24 36 h 36" stroke="${K.grey}" stroke-width="6"/></g>`;
  const eq = pop(t, 54.3, .25);
  return `${restBG(t)}${R(0, 0, 1080, 1920, '#F3DDC4', 'opacity=".2"')}
    ${bust(270, 1180, 1.05, K.blue, bpAt([[52.9, 'rest'], [55.5, 'reach', .3]], t), { dir: 1, mouth: t > 55.8 ? 'laugh' : 'smile' })}
    ${bust(810, 1180, 1.05, K.grey, bpAt([[52.9, 'rest'], [55.6, 'reach', .3], [56.2, 'rest', .4]], t), { dir: -1, mouth: 'flat' })}
    ${R(-20, 1110, 1120, 330, '#fff', ST(6))}${[...Array(14)].map((_, i) => `<rect x="${i * 80}" y="1110" width="40" height="330" fill="${K.red}" opacity=".18"/>`).join('')}<path d="M 540 1110 V 1440" stroke="${OL}" stroke-width="6" stroke-dasharray="16 12"/>
    ${saucer(330)}${saucer(750)}${receipt(200)}${receipt(880)}${pile(330, 10, 55.8)}${pile(750, 2, 55.86)}
    ${bubble(420, 600, 230, 120, `<text y="36" text-anchor="middle" style="${SANS};font-size:100px" fill="${K.teal}">=</text>`, eq * (1 - prog(t, 55.6, 55.8)), 1)}
    ${check(330, 960, 1.2, prog(t, 56.8, 57.2))}
    ${tag(t, 56.46, 'MEHR TRINKGELD', K.teal, { y: 320, max: 130, hl: 1 })}`;
}
// 18 "Das heißt umgekehrt: Wenn jemand dich spiegelt, läuft es zwischen euch meistens gut." — café, in sync
function s18(t) {
  const k = lerp(1.12, 1, eout(prog(t, 57.6, 58.2)));
  const arr = pop(t, 57.65, .3), spin = 180 * eio(prog(t, 58.04, 58.6));
  return `${zoom(540, 1000, k, `${cafeBG(t)}${seatedPair(t, [[57.6, 'rest'], [59.4, 'forward', .5], [60.4, 'glass', .5]], [[57.6, 'rest'], [59.9, 'forward', .5], [60.8, 'glass', .5]], { bg: t > 60.4, og: t > 60.8, bm: t > 61.6 ? 'laugh' : 'smile', om: t > 61.7 ? 'laugh' : 'smile' })}`)}
    ${t < 61.0 ? `<g transform="translate(540 330)"><g filter="url(#kshadow)"><rect x="-300" y="-110" width="600" height="220" rx="26" fill="${K.card}" stroke="${OL}" stroke-width="3" transform="scale(${cl(arr, 0, 1.1)})"/></g><g transform="scale(${arr}) rotate(${spin})"><path d="M -150 -30 H 130 M 90 -70 L 150 -30 L 90 10" stroke="${K.blue}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/><path d="M 150 40 H -130 M -90 0 L -150 40 L -90 80" stroke="${K.orange}" stroke-width="22" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g></g>` : ''}
    ${t > 60.9 ? `<g opacity="${eout(prog(t, 60.9, 61.1))}"><path d="M 380 ${700 - 20 * Math.sin(t * 4)} Q 540 ${600} 700 ${700 - 20 * Math.sin(t * 4 + 1)}" stroke="${K.teal}" stroke-width="10" fill="none" stroke-dasharray="18 12"/></g>` : ''}
    ${tag(t, 61.0, 'GUTES ZEICHEN', K.teal, { max: 130, extra: check(400, -10, .8, prog(t, 62.0, 62.4)) })}`;
}
// 19 "Aber übertreib es nicht." — the copier, too eager, stamp
function s19(t) {
  const k = lerp(1.15, 1, eout(prog(t, 62.84, 63.2)));
  return `${zoom(540, 1100, k, `${cafeBG(t)}${R(0, 0, 1080, 1920, '#FBE3CD', 'opacity=".5"')}${bust(600, 1520, 2.0, K.orange, bpAt([[62.84, 'rest'], [62.95, 'glass', .2]], t), { dir: -1, mouth: 'grin', eyes: 'wide', look: -6, glass: t > 63.0, tiltAdd: 4 * Math.sin(t * 9) })}`)}
    ${stamp(540, 420, -7, 'NICHT ÜBERTREIBEN', K.red, pop(t, 63.3, .22), 84)}`;
}
// 20 "Wer jede Bewegung sofort kopiert, wirkt eher seltsam als sympathisch." — split screen, instant copying
function s20(t) {
  const seq = [[64.5, 'rest'], [64.9, 'scratch', .2], [65.4, 'wave', .2], [65.9, 'chin', .2], [66.4, 'glass', .2], [66.9, 'lean', .2], [67.4, 'talk', .2], [67.9, 'rest', .2]];
  const copy = seq.map(([tt, n, d]) => [tt + .08, n, d]);
  const wierd = t > 66.4;
  return `${split(t, seq, copy, { mouth: wierd ? 'worried' : 'smile', sweat: wierd, look: t > 65.5 ? 5 : 0, glass: t > 66.4 && t < 66.9 }, { mouth: 'grin', eyes: 'wide', look: -4, glass: t > 66.48 && t < 66.98 }, 's20')}
    ${t > 64.9 && t < 67.08 ? `<g transform="translate(540 470)"><circle r="56" fill="#fff" ${ST(6)}/><path d="M -26 -10 H 22 M 8 -24 L 22 -10 L 8 4 M 26 14 H -22 M -8 0 L -22 14 L -8 28" stroke="${K.red}" stroke-width="8" fill="none" stroke-linecap="round" transform="rotate(${t * 200})"/></g>` : ''}
    ${tag(t, 67.08, 'WIRKT SELTSAM', K.red, { y: 300, max: 130, hl: 1 })}`;
}
// 21 "Mach heute einen kleinen Test: Lehn dich im nächsten Gespräch langsam zurück." — living room, you lean back
function s21(t) {
  const k = lerp(1.06, 1, eout(prog(t, 68.86, 69.6)));
  return `${zoom(540, 1000, k, `${livingBG(t)}${livingPair(t, [[68.86, 'talk'], [71.9, 'lean', 1.0]], [[68.86, 'rest']], { bm: t < 71.9 ? talkM(t, 69, 71.8) : 'smile', ol: t > 72 ? -4 : 0 })}`)}
    ${tag(t, 69.74, 'TEST: ZURÜCKLEHNEN', K.violet, { max: 110, hl: 1 })}`;
}
// 22 "Und zähl, wie lange es dauert, bis dein Gegenüber dasselbe tut." — stopwatch counts, the counterpart leans back too
function s22(t) {
  const sec = t < 73.56 ? 0 : Math.min(4, Math.floor((t - 73.56) / .65) + 1);
  const ang = sec * 90 - 90 + (t > 73.56 ? 8 * ring(t, 73.56 + (sec - 1) * .65, 3, 10) : 0);
  const w = pop(t, 73.0, .3) * (1 - prog(t, 77.2, 77.6));
  const watch = w > 0 ? `<g transform="translate(250 520) scale(${w})"><rect x="-26" y="-190" width="52" height="40" rx="8" fill="${OL}"/><circle r="160" fill="#fff" ${ST(10)}/>${[0, 1, 2, 3].map(i => `<path d="M 0 -150 V -126" ${ST(8)} transform="rotate(${i * 90})"/>`).join('')}
    <path d="M 0 0 L ${120 * Math.cos(ang * Math.PI / 180)} ${120 * Math.sin(ang * Math.PI / 180)}" stroke="${K.red}" stroke-width="12" stroke-linecap="round"/><circle r="12" fill="${OL}"/>
    ${sec > 0 && t < 76.04 ? `<text x="0" y="96" text-anchor="middle" style="${SANS};font-size:100px" fill="${K.ink}">${sec}</text>` : ''}</g>` : '';
  return `${zoom(700, 1060, 1.22, `${livingBG(t)}${livingPair(t, [[72.98, 'lean']], [[72.98, 'rest'], [75.4, 'lean', .9]], { om: t > 76.3 ? 'smile' : 'flat', ol: t < 75.4 ? -5 : 0, bm: 'smile' })}`)}
    ${watch}${tag(t, 76.04, 'DASSELBE', K.teal, { y: 300, max: 150, extra: check(380, -10, .9, prog(t, 76.6, 77.0)) })}`;
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

const __style = {"dust": false, "vignette": false, "subtitle": "default"};
export const subtitleStyle = __style.subtitle;
export const subtitleTop = __style.subtitle_y;
export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + (__style.dust === false ? '' : dust(t)) + (__style.vignette === false ? '' : `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`);
}
export function subtitleAt(t) { return ''; }
