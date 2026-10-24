// @ts-nocheck
// AUTO-GENERATED scene for v4. Change it by commenting on the issue.
import { C, cl, prog, eio, eout, ein, back, lerp, ring, hash, DEFS, ghostPath, ghost, headBack, hand, scallop, ghostX, personF, rwY, hallway, earth, photons, gear, stars, dust } from '../../engine/core.js';

// ===== v4: "8 Milliarden Menschen furzen gleichzeitig" =====
const G = { gas: '#93e46c', gasHi: '#d4f9aa', gasSh: '#57b24a', chalk: '#e6f1ea', board: '#1f3d35', sun: '#ffcf4a', sunSh: '#f0a030', atm: '#7cc8ff', air: '#e6f4ff', airHi: '#ffffff', airSh: '#a9d1f2', smoke: '#d3d9e6', smokeSh: '#9aa4bb' };
const PCOL = [C.pj, C.red, '#f2b544', '#9b7cf0', '#5fd0a0', '#ff8f5a'];

function fmt(n) { return String(Math.round(n)).replace(/\B(?=(\d{3})+(?!\d))/g, '.'); }
function T(x, y, size, str, fill, o = {}) {
  return `<text x="${x}" y="${y}" text-anchor="middle" style="font-family:'Inter';font-weight:900;font-size:${size}px" fill="${fill || C.warm}" stroke="${o.stroke || C.ol}" stroke-width="${o.sw ?? 8}" paint-order="stroke"${o.op !== undefined ? ` opacity="${o.op}"` : ''}>${str}</text>`;
}
function popT(x, y, size, str, p, fill, rot = 0) {
  if (p <= 0) return '';
  return `<g transform="translate(${x} ${y}) rotate(${rot}) scale(${p})">${T(0, size * .35, size, str, fill)}</g>`;
}
function space(seed = 3, n = 80) {
  return `<rect x="0" y="0" width="1080" height="1920" fill="#070b18"/><ellipse cx="540" cy="820" rx="620" ry="560" fill="#1a2756" opacity=".5" filter="url(#blur40)"/>${stars(n, seed)}`;
}
function room() {
  return `<rect x="0" y="0" width="1080" height="1920" fill="url(#gWall)"/><rect x="0" y="1330" width="1080" height="600" fill="url(#gFloor)"/>`;
}

// generic cartoon face (local units, ~110 px wide)
function face(o = {}) {
  const lx = o.look || 0, ly = o.lookY || 0, es = o.eyeS || 1, ol = C.ol, em = o.eyes || 'n';
  let e = '';
  if (em === 'x') e = `<path d="M -42 -20 L -18 4 M -18 -20 L -42 4 M 18 -20 L 42 4 M 42 -20 L 18 4" stroke="${ol}" stroke-width="7" stroke-linecap="round"/>`;
  else if (em === 'closed') e = `<path d="M -44 -6 Q -30 6 -16 -6 M 16 -6 Q 30 6 44 -6" stroke="${ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else if (em === 'happy') e = `<path d="M -44 0 Q -30 -16 -16 0 M 16 0 Q 30 -16 44 0" stroke="${ol}" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else if (em === 'swirl') e = [-30, 30].map(cx => `<g transform="rotate(${(o.t || 0) * 420} ${cx} -6)"><path d="M ${cx} -6 m -3 0 a 3 3 0 1 1 6 0 a 7 7 0 1 1 -14 0 a 11 11 0 1 1 22 0 a 15 15 0 1 1 -30 0" stroke="${ol}" stroke-width="5" fill="none"/></g>`).join('');
  else {
    const lid = o.lid || 0, lc = o.lidCol || '#2f6fd6';
    e = [-30, 30].map(cx => `<ellipse cx="${cx}" cy="-6" rx="${15 * es}" ry="${20 * es}" fill="#fff" stroke="${ol}" stroke-width="5"/><circle cx="${cx + lx}" cy="${-4 + ly}" r="${8 * es}" fill="${ol}"/><circle cx="${cx + lx + 3}" cy="${-8 + ly}" r="${2.6 * es}" fill="#fff"/>` +
      (lid > 0 ? `<rect x="${cx - 18 * es}" y="${-28 * es - 6}" width="${36 * es}" height="${44 * es * lid}" rx="10" fill="${lc}"/><path d="M ${cx - 16 * es} ${-28 * es - 6 + 44 * es * lid} H ${cx + 16 * es}" stroke="${ol}" stroke-width="5" stroke-linecap="round"/>` : '')).join('');
  }
  const B = {
    up: `<path d="M -46 -40 Q -30 -56 -14 -46 M 46 -40 Q 30 -56 14 -46" stroke="${ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    mean: `<path d="M -48 -42 L -14 -30 M 48 -42 L 14 -30" stroke="${ol}" stroke-width="7" stroke-linecap="round"/>`,
    sad: `<path d="M -46 -32 L -14 -44 M 46 -32 L 14 -44" stroke="${ol}" stroke-width="6" stroke-linecap="round"/>`,
    calm: `<path d="M -44 -38 Q -30 -46 -16 -40 M 44 -38 Q 30 -46 16 -40" stroke="${ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
  }[o.brows] || '';
  const M = {
    smile: `<path d="M -20 26 Q 0 42 20 26" stroke="${ol}" stroke-width="6" fill="none" stroke-linecap="round"/>`,
    grin: `<path d="M -26 22 Q 0 56 26 22 Z" fill="${ol}"/><path d="M -12 38 Q 0 46 12 38" fill="#ff8fa8"/>`,
    o: `<ellipse cx="0" cy="34" rx="14" ry="18" fill="${ol}"/><ellipse cx="0" cy="42" rx="8" ry="6" fill="#ff8fa8"/>`,
    flat: `<path d="M -16 32 L 16 32" stroke="${ol}" stroke-width="6" stroke-linecap="round"/>`,
    wavy: `<path d="M -24 32 q 8 -9 16 0 q 8 9 16 0 q 8 -9 16 0" stroke="${ol}" stroke-width="5" fill="none" stroke-linecap="round"/>`,
    small: `<ellipse cx="0" cy="32" rx="7" ry="9" fill="${ol}"/>`,
    sick: `<path d="M -24 30 q 8 -9 16 0 q 8 9 16 0 q 8 -9 16 0" stroke="${ol}" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M 2 33 q 4 24 16 4 Z" fill="#ff8fa8" stroke="${ol}" stroke-width="4"/>`,
    strain: `<rect x="-22" y="22" width="44" height="20" rx="6" fill="#fff" stroke="${ol}" stroke-width="5"/><path d="M -22 32 H 22 M -8 22 V 42 M 8 22 V 42" stroke="${ol}" stroke-width="3"/>`,
    puff: `<ellipse cx="0" cy="32" rx="10" ry="8" fill="${ol}"/><circle cx="-34" cy="22" r="14" fill="${o.blush || '#ff8fa8'}" opacity=".7"/><circle cx="34" cy="22" r="14" fill="${o.blush || '#ff8fa8'}" opacity=".7"/>`,
  }[o.mouth || 'smile'];
  const ba = o.blushA ?? .5;
  const bl = ba > 0 ? `<ellipse cx="-48" cy="14" rx="12" ry="7" fill="${o.blush || '#ff8fa8'}" opacity="${ba}"/><ellipse cx="48" cy="14" rx="12" ry="7" fill="${o.blush || '#ff8fa8'}" opacity="${ba}"/>` : '';
  return e + B + bl + M;
}

// globe with own clip id; o.face = face options; o.spin = land speed
function globe(t, cx, cy, r, id, o = {}) {
  const k = r / 300, rot = (t * (o.spin ?? 30)) % 900;
  const land = [[0, -80, 140, 90], [220, 40, 110, 140], [420, -40, 160, 80], [640, 60, 120, 110], [100, 150, 90, 50], [520, 170, 80, 40]];
  let L = '';
  for (const off of [-900, 0, 900]) for (const [lx, ly, w, h] of land) {
    const x = cx + (-450 + lx + rot + off) * k;
    if (x + w * k < cx - r || x - w * k > cx + r) continue;
    L += `<ellipse cx="${x}" cy="${cy + ly * k}" rx="${w * k}" ry="${h * k}" fill="#4caf7a" stroke="#2e7d55" stroke-width="${5 * k}"/>`;
  }
  const sw = cl(r / 36, 5, 9);
  return `${o.noGlow ? '' : `<circle cx="${cx}" cy="${cy}" r="${r * 1.08}" fill="#5aa9ff" opacity=".25"/>`}
    <clipPath id="${id}"><circle cx="${cx}" cy="${cy}" r="${r}"/></clipPath>
    <g clip-path="url(#${id})"><rect x="${cx - r}" y="${cy - r}" width="${2 * r}" height="${2 * r}" fill="#2f6fd6"/>${L}
      ${o.noIce ? '' : `<ellipse cx="${cx - r * .1}" cy="${cy - r * .98}" rx="${r * .55}" ry="${r * .2}" fill="#eaf4ff"/>`}
      <circle cx="${cx + r * .55}" cy="${cy + r * .2}" r="${r * 1.05}" fill="#000" opacity=".22"/>
      <circle cx="${cx - r * .38}" cy="${cy - r * .42}" r="${r * .32}" fill="#fff" opacity=".1"/></g>
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${C.ol}" stroke-width="${sw}"/>
    ${o.face ? `<g transform="translate(${cx} ${cy + r * .1}) scale(${r / 150})">${face({ lidCol: '#2f6fd6', blush: '#ff9fb3', ...o.face })}</g>` : ''}`;
}

const PD = scallop(0, 0, 100, 68, 9);
function puff(x, y, s, o = {}) {
  const t = o.t || 0, w = 1 + .05 * Math.sin(t * 6 + (o.k || 0) * 1.7);
  const sx = s * w * (o.sx || 1), sy = s / w * (o.sy || 1);
  const sw = cl(s * 9, 3, 8) / Math.max(.05, Math.max(sx, sy));
  if (o.dash) return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${sx} ${sy})"><path d="${PD}" fill="${G.chalk}" fill-opacity=".07" stroke="${G.chalk}" stroke-width="${sw}" stroke-dasharray="${3 * sw} ${2 * sw}"/></g>`;
  const c = o.col || G.gas, hi = o.hi || G.gasHi, sh = o.sh || G.gasSh;
  return `<g transform="translate(${x} ${y}) rotate(${o.rot || 0}) scale(${sx} ${sy})"${o.alpha !== undefined ? ` opacity="${o.alpha}"` : ''}>
    ${o.noGlow ? '' : `<path d="${PD}" fill="${c}" opacity=".28" transform="scale(1.18)"/>`}
    <path d="${PD}" fill="${c}" stroke="${C.ol}" stroke-width="${sw}"/>
    <path d="M -62 -26 Q -36 -58 4 -52" stroke="${hi}" stroke-width="12" fill="none" stroke-linecap="round"/>
    <path d="M 26 40 Q 58 26 76 2" stroke="${sh}" stroke-width="11" fill="none" stroke-linecap="round" opacity=".85"/>
    ${o.face ? `<g transform="translate(${o.fx || 0} 6) scale(.95)">${face({ blush: '#ff9f9f', ...o.face })}</g>` : ''}${o.extra || ''}</g>`;
}

// tiny person standing at (x,y) rotated by ang (deg), lean = bend in own frame
function tiny(x, y, s, ang, o = {}) {
  const col = o.col || C.pj, sq = o.sq || 1;
  return `<g transform="translate(${x} ${y}) rotate(${ang}) scale(${s / Math.sqrt(sq)} ${s * sq})"><g transform="rotate(${o.lean || 0})">
    <rect x="-18" y="-38" width="15" height="38" rx="7" fill="#33405e" stroke="${C.ol}" stroke-width="4"/><rect x="3" y="-38" width="15" height="38" rx="7" fill="#33405e" stroke="${C.ol}" stroke-width="4"/>
    <rect x="-23" y="-90" width="46" height="58" rx="18" fill="${col}" stroke="${C.ol}" stroke-width="4"/>
    <circle cx="0" cy="-112" r="23" fill="${C.skin}" stroke="${C.ol}" stroke-width="4"/>
    <path d="M -23 -114 Q -23 -138 0 -138 Q 23 -138 23 -114 Q 10 -124 0 -120 Q -12 -126 -23 -114 Z" fill="${C.hair}"/>
    <circle cx="-8" cy="-110" r="3.4" fill="${C.ol}"/><circle cx="8" cy="-110" r="3.4" fill="${C.ol}"/>
    ${o.mouth === 'o' ? `<ellipse cx="0" cy="-98" rx="4" ry="5" fill="${C.ol}"/>` : `<path d="M -6 -100 Q 0 -95 6 -100" stroke="${C.ol}" stroke-width="3" fill="none"/>`}
  </g></g>`;
}

function arrow(x1, y1, x2, y2, col, w = 30, p = 1) {
  if (p <= 0) return '';
  const L = Math.hypot(x2 - x1, y2 - y1) * p, a = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI, h = Math.min(L, w * 1.7);
  return `<g transform="translate(${x1} ${y1}) rotate(${a})"><path d="M 0 ${-w / 2} H ${L - h} V ${-w} L ${L} 0 L ${L - h} ${w} V ${w / 2} H 0 Z" fill="${col}" stroke="${C.ol}" stroke-width="6" stroke-linejoin="round"/></g>`;
}

function sunF(t, cx, cy, r, o = {}) {
  let rays = '';
  for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6 + t * .4; rays += `<path d="M ${cx + Math.cos(a - .1) * r * 1.08} ${cy + Math.sin(a - .1) * r * 1.08} L ${cx + Math.cos(a) * r * 1.42} ${cy + Math.sin(a) * r * 1.42} L ${cx + Math.cos(a + .1) * r * 1.08} ${cy + Math.sin(a + .1) * r * 1.08} Z" fill="${G.sun}" stroke="${C.ol}" stroke-width="5"/>`; }
  return `<circle cx="${cx}" cy="${cy}" r="${r * 1.9}" fill="${G.sun}" opacity=".22" filter="url(#blur40)"/>${rays}
    <circle cx="${cx}" cy="${cy}" r="${r}" fill="${G.sun}" stroke="${C.ol}" stroke-width="8"/>
    <path d="M ${cx + r * .55} ${cy - r * .6} A ${r * .85} ${r * .85} 0 0 1 ${cx + r * .6} ${cy + r * .55}" stroke="${G.sunSh}" stroke-width="${r * .14}" fill="none" stroke-linecap="round"/>
    ${o.face ? `<g transform="translate(${cx} ${cy + r * .08}) scale(${r / 120})">${face({ blush: '#ff8a5a', lidCol: G.sun, ...o.face })}</g>` : ''}`;
}

// chalk path drawn progressively (p 0..1)
function chalk(d, p, w = 7, col) {
  if (p <= 0) return '';
  return `<path d="${d}" fill="none" stroke="${col || G.chalk}" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" pathLength="1" stroke-dasharray="${p} 1"/>`;
}

// ---------------------------------------------------------------- S1 0–4.98  8 billion people on Earth
const PPL = Array.from({ length: 19 }, (_, i) => ({ a: -172 + i * (164 / 18), i, t0: 1.08 + ((i * 7) % 19) / 19 * 1.15 }));
function sIntro(t) {
  const cx = 540, cy = 930, r = 300;
  const bend = eio(prog(t, 3.24, 3.6));
  const fart = t >= 3.94;
  const shock = back(prog(t, 4.0, 4.25));
  const sh = t > 3.94 && t < 4.7 ? 9 * Math.exp(-(t - 3.94) * 6) : 0;
  let ppl = '', puffs = '';
  PPL.forEach(p => {
    const ap = back(prog(t, p.t0, p.t0 + .25)); if (ap <= 0) return;
    const ar = p.a * Math.PI / 180, x = cx + r * Math.cos(ar), y = cy + r * Math.sin(ar);
    const kick = fart ? Math.exp(-Math.max(0, t - 3.94 - (p.i % 4) * .03) * 7) : 0;
    const look = p.a + 90;
    ppl += tiny(x, y, .8 * ap, look, { col: PCOL[p.i % 6], lean: 28 * bend * (p.a < -90 ? -1 : 1) * -1, sq: 1 - .12 * kick, mouth: fart ? 'o' : 's' });
    if (fart) {
      const dt = t - 3.94 - (p.i % 4) * .03;
      if (dt > 0) {
        const g = eout(cl(dt / .7));
        puffs += puff(x - 40 - 230 * g - 20 * (p.i % 3), y - 40 - 40 * g + 10 * Math.sin(t * 3 + p.i), .16 + .2 * g, { t, k: p.i, noGlow: true });
      }
    }
  });
  const n = Math.round(8 * eio(prog(t, 1.08, 1.74)));
  const tp = back(prog(t, 1.08, 1.35));
  const ap = eout(prog(t, 3.62, 3.9));
  const fo = fart
    ? { mouth: 'o', brows: 'up', eyeS: 1 + .25 * shock, lookY: -6, look: -8 }
    : { mouth: 'smile', brows: 'calm', look: t > 1.1 ? 8 * Math.sin(t * 2) : 0, lookY: -10 };
  return `<g transform="translate(${sh * Math.sin(t * 93)} ${sh * Math.cos(t * 71)})">${space(7, 90)}
    ${globe(t, cx, cy, r, 's1g', { face: fo, spin: 12 })}
    ${puffs}${ppl}
    ${tp > 0 ? `<g transform="translate(540 300) scale(${tp})">${T(0, 40, 130, `${n} Mrd.`, C.warm)}</g>` : ''}
    ${ap > 0 && !fart ? arrow(760, 470, 320, 470, C.warm, 26, ap) : ''}
    ${fart ? arrow(lerp(760, 300, eout(prog(t, 3.94, 4.4))), 470, lerp(320, -140, eout(prog(t, 3.94, 4.4))), 470, C.warm, 26, 1) : ''}
  </g>`;
}

// ---------------------------------------------------------------- S2 4.98–8.34  recoil out of the solar system?
function sOrbit(t) {
  const sx = 170, sy = 1180, R = 620;
  const a0 = -52 * Math.PI / 180 + .05 * (t - 4.98);
  let ex = sx + R * Math.cos(a0), ey = sy + R * Math.sin(a0);
  const jet = t > 5.5;
  const recoil = jet ? 18 * eout(prog(t, 5.5, 5.75)) : 0;
  const dir = [Math.cos(a0 + .3), Math.sin(a0 + .3)]; // outward, away from the sun
  const pathP = eio(prog(t, 6.06, 6.9));
  const go = ein(prog(t, 7.64, 8.2));
  ex += recoil * dir[0] + go * 1100 * dir[0]; ey += recoil * dir[1] + go * 1100 * dir[1];
  const ox = sx + R * Math.cos(a0), oy = sy + R * Math.sin(a0);
  let puffs = '';
  if (jet) for (let k = 0; k < 9; k++) {
    const te = 5.5 + k * .2; if (t < te) break;
    const d = (t - te) * 260;
    puffs += puff(ex - dir[0] * (110 + d), ey - dir[1] * (110 + d) + 10 * Math.sin(t * 4 + k), .32 + .002 * d, { t, k, noGlow: true, alpha: cl(1.4 - d / 600) });
  }
  const q = back(prog(t, 7.95, 8.2));
  let lines = '';
  if (go > 0 && go < 1) for (let i = -1; i <= 1; i++) lines += `<line x1="${ex - dir[0] * 140 + i * 40 * dir[1]}" y1="${ey - dir[1] * 140 - i * 40 * dir[0]}" x2="${ex - dir[0] * 330 + i * 40 * dir[1]}" y2="${ey - dir[1] * 330 - i * 40 * dir[0]}" stroke="#e9f0ff" stroke-width="8" stroke-linecap="round" opacity=".8"/>`;
  const look = go > 0 ? 14 : 8;
  return `${space(4, 90)}
    <circle cx="${sx}" cy="${sy}" r="${R}" fill="none" stroke="#4d5f95" stroke-width="5" stroke-dasharray="22 18"/>
    ${sunF(t, sx, sy, 170, { face: { look, lookY: -12, mouth: go > 0 ? 'o' : 'smile', brows: go > 0 ? 'up' : 'calm' } })}
    ${pathP > 0 ? `<line x1="${ox}" y1="${oy}" x2="${ox + dir[0] * 1200 * pathP}" y2="${oy + dir[1] * 1200 * pathP}" stroke="${G.chalk}" stroke-width="7" stroke-dasharray="26 20" stroke-linecap="round"/>` : ''}
    ${go > 0 ? `<circle cx="${ox}" cy="${oy}" r="100" fill="none" stroke="${G.chalk}" stroke-width="6" stroke-dasharray="16 14"/>` : ''}
    ${puffs}${lines}
    <g transform="translate(${ex} ${ey}) scale(${1 + .1 * Math.exp(-Math.max(0, t - 5.5) * 6) * (jet ? 1 : 0)} ${1 - .08 * (jet ? Math.exp(-(t - 5.5) * 6) : 0)}) translate(${-ex} ${-ey})">
      ${globe(t, ex, ey, 100, 's2g', { face: { mouth: jet ? (go > 0 ? 'grin' : 'o') : 'smile', brows: jet ? 'up' : 'calm', eyeS: jet ? 1.15 : 1 }, spin: 20 })}</g>
    ${q > 0 ? popT(560, 380, 230, '?', q, C.warm, 10) : ''}`;
}

// ---------------------------------------------------------------- S3 8.34–10.12  "absurd": the idea bubble pops, person laughs
function sAbsurd(t) {
  const bub = back(prog(t, 8.4, 8.7));
  const popP = prog(t, 9.14, 9.3);
  const laugh = t > 9.2 ? 1 : 0;
  const shake = laugh ? Math.sin(t * 34) : 0;
  let bubble = '';
  if (popP < 1 && bub > 0) {
    const bx = 760, by = 420, s = bub * (1 + .15 * eout(popP));
    const path = scallop(0, 0, 220, 170, 13);
    const k = prog(t, 8.5, 9.1);
    const inner = `<rect x="-240" y="-190" width="480" height="380" fill="#0b1226"/>${stars(20, 2).replace(/cx="(\d+(\.\d+)?)"/g, (m, v) => `cx="${(+v) * .44 - 240}"`).replace(/cy="(\d+(\.\d+)?)"/g, (m, v) => `cy="${(+v) * .3 - 190}"`)}
      ${puff(-60 - 120 * k, 40 + 20 * k, .45, { t, noGlow: true })}
      ${globe(t, 60 + 140 * eio(k), -20 - 60 * eio(k), 70, 's3g', { noGlow: true, face: { mouth: 'grin', brows: 'up' } })}`;
    bubble = `<circle cx="${560}" cy="${620}" r="${16 * bub}" fill="#e9f0ff" stroke="${C.ol}" stroke-width="5"/><circle cx="${610}" cy="${560}" r="${24 * bub}" fill="#e9f0ff" stroke="${C.ol}" stroke-width="5"/>
      <g transform="translate(${bx} ${by}) scale(${s})" opacity="${popP > 0 ? 0 : 1}">
        <clipPath id="s3b"><path d="${path}"/></clipPath><g clip-path="url(#s3b)">${inner}</g>
        <path d="${path}" fill="none" stroke="#e9f0ff" stroke-width="14"/><path d="${path}" fill="none" stroke="${C.ol}" stroke-width="5"/></g>`;
  }
  let burst = '';
  if (popP > 0 && popP < 1) for (let i = 0; i < 12; i++) {
    const an = i / 12 * Math.PI * 2, rr = 200 + 150 * eout(popP);
    burst += `<circle cx="${760 + rr * Math.cos(an) * 1.2}" cy="${420 + rr * Math.sin(an) * .9}" r="${20 * (1 - popP)}" fill="#e9f0ff"/>`;
  }
  const tears = laugh ? [0, 1].map(i => { const ph = ((t - 9.2) * 2.2 + i * .5) % 1; return `<path transform="translate(${i ? 640 + 60 * ph : 440 - 60 * ph} ${740 + 120 * ph * ph})" d="M 0 -14 Q 12 4 0 12 Q -12 4 0 -14 Z" fill="#9fd9ff" stroke="${C.ol}" stroke-width="3" opacity="${1 - ph}"/>`; }).join('') : '';
  return `${room()}
    <rect x="80" y="230" width="300" height="400" rx="10" fill="#0d1630" stroke="${C.ol}" stroke-width="8"/>${`<circle cx="200" cy="340" r="40" fill="${C.moon}"/>`}
    <path d="M 230 230 V 630 M 80 430 H 380" stroke="#2a3557" stroke-width="10"/>
    ${personF(540, 1560 + (laugh ? 6 * Math.abs(shake) : 0), 1.25, {
      look: laugh ? 0 : 12, lookY: laugh ? 0 : -14, brow: laugh ? .2 : .5 * bub,
      mouth: laugh ? 'smile' : (bub > 0 ? 'flat' : 'flat'), headTilt: laugh ? 0 : 4 * bub,
      aL: laugh ? 40 + 10 * shake : 12, aR: laugh ? -150 + 15 * shake : -12, eyeS: laugh ? .8 : 1, sy: 1 + (laugh ? .02 * shake : 0)
    })}
    ${laugh ? (() => { const yy = 1560 + 6 * Math.abs(shake) - 612 * 1.25 * (1 + .02 * shake); return [482.5, 597.5].map(x => `<ellipse cx="${x}" cy="${yy}" rx="38" ry="46" fill="${C.skin}"/><path d="M ${x - 30} ${yy + 6} Q ${x} ${yy - 26} ${x + 30} ${yy + 6}" stroke="${C.ol}" stroke-width="9" fill="none" stroke-linecap="round"/>`).join(''); })() : ''}
    ${tears}${bubble}${burst}`;
}

// ---------------------------------------------------------------- S4 10.12–17.1  rocket: gas back, rocket forward
function rocket(x, y, s, o = {}) {
  const f = o.flame || 0, t = o.t || 0;
  const L = 240 * f * (1 + .15 * Math.sin(t * 47));
  return `<g transform="translate(${x} ${y}) scale(${s})">
    ${f > 0 ? `<path d="M -54 30 Q -66 ${30 + L * .5} 0 ${30 + L} Q 66 ${30 + L * .5} 54 30 Z" fill="#ff9a3c" stroke="${C.ol}" stroke-width="6"/>
      <path d="M -30 30 Q -36 ${30 + L * .35} 0 ${30 + L * .7} Q 36 ${30 + L * .35} 30 30 Z" fill="#fff3c4"/>
      <circle cx="0" cy="${40 + L * .3}" r="${90 * f}" fill="#ffcf7a" opacity=".35" filter="url(#blur20)"/>` : ''}
    <path d="M -44 -6 L -58 34 L 58 34 L 44 -6 Z" fill="#4b5266" stroke="${C.ol}" stroke-width="6"/>
    <path d="M -72 -150 L -150 -10 L -150 34 L -72 4 Z" fill="${C.red}" stroke="${C.ol}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M 72 -150 L 150 -10 L 150 34 L 72 4 Z" fill="${C.red}" stroke="${C.ol}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M -72 0 L -72 -340 Q -72 -470 0 -540 Q 72 -470 72 -340 L 72 0 Z" fill="#eef2fa" stroke="${C.ol}" stroke-width="7"/>
    <path d="M 34 -380 Q 50 -200 40 -10" stroke="#b9c3d6" stroke-width="22" fill="none" stroke-linecap="round"/>
    <path d="M -62 -400 Q -50 -480 0 -540 Q 50 -480 62 -400 Z" fill="${C.red}" stroke="${C.ol}" stroke-width="6" stroke-linejoin="round"/>
    <circle cx="0" cy="-290" r="40" fill="#5ab8ff" stroke="${C.ol}" stroke-width="8"/><path d="M -18 -304 Q -6 -318 10 -312" stroke="#dff1ff" stroke-width="8" fill="none" stroke-linecap="round"/>
    <path d="M -72 -110 H 72" stroke="${C.ol}" stroke-width="5"/><rect x="-72" y="-130" width="144" height="20" fill="${C.red}" stroke="${C.ol}" stroke-width="5"/>
    <path d="M 4 -540 V -580" stroke="${C.ol}" stroke-width="6"/>
  </g>`;
}
function smokeBall(x, y, r, k) {
  return `<g transform="translate(${x} ${y})"><circle r="${r}" fill="${G.smoke}" stroke="${C.ol}" stroke-width="6"/><path d="M ${-r * .5} ${-r * .45} Q ${-r * .1} ${-r * .8} ${r * .35} ${-r * .6}" stroke="#fff" stroke-width="${Math.max(3, r * .12)}" fill="none" stroke-linecap="round" opacity=".8"/><path d="M ${r * .2} ${r * .55} Q ${r * .6} ${r * .35} ${r * .7} 0" stroke="${G.smokeSh}" stroke-width="${Math.max(3, r * .12)}" fill="none" stroke-linecap="round"/></g>`;
}
function sRocket(t) {
  const lift = t > 15.06 ? 270 * Math.pow(t - 15.06, 2) : 0;
  const ry = 1250 - lift;
  const flame = t > 12.86 ? cl(.4 + 1.6 * prog(t, 12.86, 13.1) * (t < 15.06 ? .55 : 1) + (t > 15.06 ? .5 : 0), 0, 1.2) : 0;
  const ign = t > 12.86;
  const sh = ign ? (t > 15.06 ? 7 : 4) * Math.sin(t * 87) : 0;
  const arm = eio(prog(t, 10.34, 10.8));
  let smoke = '';
  if (ign) for (let k = 0; k < 26; k++) {
    const te = 12.86 + k * .12; if (t < te) break;
    const d = t - te, side = k % 2 ? 1 : -1;
    const x = 560 + side * (40 + 520 * eout(cl(d / 1.8)) * (.6 + .4 * hash(k))), y = 1320 - 60 * eout(cl(d / 1.5)) - 40 * hash(k + 3) - d * 20;
    smoke += smokeBall(x, y, 30 + 70 * eout(cl(d / 1.2)) * (.7 + .3 * hash(k + 1)), k);
  }
  const wall = eio(prog(t, 16.45, 17.1));
  let cover = '';
  if (wall > 0) {
    const top = lerp(2100, -260, wall);
    for (let i = 0; i < 8; i++) cover += smokeBall(i * 155, top + 60 * Math.sin(i * 2.1), 160, i);
    cover += `<rect x="0" y="${top}" width="1080" height="${Math.max(0, 2200 - top)}" fill="${G.smoke}"/>`;
  }
  const engineer = personF(900, 1360, .44, { aL: 12 + 140 * back(prog(t, 11.6, 11.95)) * (t < 12.86 ? 1 : 0), aR: t > 12.86 ? -150 : -12, look: -12, lookY: t > 15.06 ? -14 : -6, mouth: t > 12.86 ? 'o' : 'smile', brow: t > 12.86 ? .7 : 0 });
  const ad = back(prog(t, 13.52, 13.8)), au = back(prog(t, 15.5, 15.8));
  let tower = `<rect x="150" y="560" width="70" height="770" fill="none" stroke="#6b7591" stroke-width="10"/>`;
  for (let i = 0; i < 11; i++) tower += `<path d="M 150 ${560 + i * 70} L 220 ${630 + i * 70} M 220 ${560 + i * 70} L 150 ${630 + i * 70}" stroke="#56607c" stroke-width="5"/>`;
  return `<g transform="translate(${sh} 0)">
    <rect x="-20" y="0" width="1120" height="1920" fill="#0b1226"/>${stars(70, 8)}
    <path d="M -20 1330 Q 300 1290 540 1310 Q 800 1290 1100 1330 L 1100 1920 L -20 1920 Z" fill="#151a2c" stroke="${C.ol}" stroke-width="6"/>
    <rect x="400" y="1290" width="320" height="40" rx="8" fill="#3b4258" stroke="${C.ol}" stroke-width="6"/>
    ${tower}
    <g transform="rotate(${-70 * arm} 220 760)"><rect x="220" y="745" width="260" height="30" fill="#6b7591" stroke="${C.ol}" stroke-width="5"/></g>
    ${rocket(560, ry, 1, { flame, t })}
    ${smoke}
    ${engineer}
    ${t < 15.06 && ad > 0 ? arrow(340, 1000, 340, 1280, C.red, 30, ad) : ''}
    ${au > 0 ? arrow(800, 1000, 800, lerp(1000, 560, 1), C.warm, 30, au) : ''}
    ${cover}
  </g>`;
}

// ---------------------------------------------------------------- S5 17.1–23.66  chalkboard: 100 ml, 3 m/s
function sBoard(t) {
  const clear = eio(prog(t, 17.1, 17.5));
  let smoke = '';
  if (clear < 1) { const top = lerp(-260, -2400, clear); for (let i = 0; i < 8; i++) smoke += smokeBall(i * 155, top + 2160 + 60 * Math.sin(i * 2.1), 160, i); smoke = `<rect x="0" y="${top}" width="1080" height="2200" fill="${G.smoke}"/>` + smoke; }
  const walk = eout(prog(t, 17.1, 17.55));
  const write = t > 17.44 && t < 18.3;
  const scrib = chalk('M 110 330 q 25 -40 50 0 t 50 0 t 50 0 M 300 300 l 40 40 m 0 -40 l -40 40 M 380 320 h 50 m -50 20 h 50 M 470 300 q 20 -20 40 0 q 0 30 -40 50 h 44', eio(prog(t, 17.44, 18.3)), 7);
  const fig = eio(prog(t, 18.82, 19.3));
  const stick = chalk('M 220 560 a 38 38 0 1 0 0.1 0 M 220 636 V 770 M 220 680 L 160 730 M 220 680 L 280 730 M 220 770 L 175 860 M 220 770 L 265 860', fig, 8);
  const fill = eio(prog(t, 19.4, 20.4));
  const cyl = fig > 0 ? `<g opacity="${cl(fig * 2)}"><rect x="360" y="${840 - 260 * fill}" width="90" height="${260 * fill}" fill="${G.gas}" opacity=".9"/>
     <path d="M 350 560 V 840 Q 350 860 370 860 H 440 Q 460 860 460 840 V 560" fill="none" stroke="${G.chalk}" stroke-width="8"/>
     ${[0, 1, 2, 3, 4].map(i => `<path d="M 350 ${600 + i * 52} h 24" stroke="${G.chalk}" stroke-width="5"/>`).join('')}</g>` : '';
  const ml = back(prog(t, 19.5, 19.8));
  const fly = prog(t, 21.18, 22.4);
  const flyX = lerp(330, 860, eio(fly));
  const arr = chalk('M 300 980 H 900 M 860 950 L 900 980 L 860 1010', eio(prog(t, 21.3, 22.0)), 8);
  const ms = back(prog(t, 22.02, 22.3));
  let lines = '';
  if (fly > 0 && fly < 1) for (let i = 0; i < 3; i++) lines += `<line x1="${flyX - 90 - i * 20}" y1="${680 + i * 34}" x2="${flyX - 200 - i * 30}" y2="${680 + i * 34}" stroke="${G.chalk}" stroke-width="6" stroke-linecap="round"/>`;
  const px = lerp(1250, 860, walk);
  const nod = t > 22.9 ? 8 * Math.sin(prog(t, 22.9, 23.5) * Math.PI * 2) : 0;
  return `${room()}
    <rect x="50" y="220" width="980" height="900" rx="10" fill="${G.board}" stroke="${C.woodSh}" stroke-width="20"/>
    <rect x="50" y="1110" width="980" height="26" fill="${C.wood}" stroke="${C.ol}" stroke-width="5"/>
    <ellipse cx="540" cy="660" rx="420" ry="380" fill="#fff" opacity=".04"/>
    ${scrib}${stick}${cyl}
    ${ml > 0 ? popT(405, 470, 76, '100 ml', ml, G.chalk) : ''}
    ${arr}${lines}
    ${fly > 0 && fly < 1 ? puff(flyX, 700, .55, { t, noGlow: true, rot: 8 * Math.sin(t * 12) }) : ''}
    ${fly >= 1 ? puff(860 + 6 * Math.sin(t * 5), 700, .55, { t, noGlow: true }) : ''}
    ${ms > 0 ? popT(600, 900, 84, '3 m/s', ms, C.warm) : ''}
    ${personF(px, 1480, .8, { aL: write ? 150 + 12 * Math.sin(t * 30) : (t > 19.3 ? 110 : 12), aR: -12, look: -14, lookY: write ? -10 : 0, mouth: fly > 0 ? 'o' : 'smile', headTilt: nod, lean: lerp(-8, 0, walk) })}
    ${smoke}`;
}

// ---------------------------------------------------------------- S6 23.66–26.5  all puffs merge: 800.000 m³
const MERGE = Array.from({ length: 22 }, (_, i) => { const a = i / 22 * Math.PI * 2 + hash(i) * .3; return { x: 540 + 700 * Math.cos(a), y: 880 + 900 * Math.sin(a), t0: 23.7 + hash(i + 5) * .8 }; });
function sMerge(t) {
  const grow = eout(prog(t, 23.9, 25.2));
  const s = lerp(.5, 3.3, grow);
  let small = '';
  MERGE.forEach((m, i) => {
    const p = ein(prog(t, m.t0, m.t0 + .55)); if (p >= 1) return;
    small += puff(lerp(m.x, 540, p), lerp(m.y, 880, p), .45 * (1 - .5 * p), { t, k: i, noGlow: true });
  });
  const v = 800000 * eio(prog(t, 24.76, 25.86));
  const stamp = back(prog(t, 25.86, 26.06));
  const fo = t > 25.0 ? { mouth: 'grin', brows: 'mean', look: 6 * Math.sin(t * 2), blush: '#ff9f9f' } : null;
  return `${space(12, 80)}
    ${puff(540, 880, s, { t, face: fo, sx: 1 + .05 * Math.sin(t * 9) * (1 - grow) })}
    ${small}
    ${t > 24.7 ? `<g transform="translate(540 330) scale(${1 + .12 * stamp * (1 - prog(t, 26.06, 26.3))})">${T(0, 40, 118, fmt(v) + ' m³', C.warm)}</g>` : ''}`;
}

// ---------------------------------------------------------------- S7 26.5–28.0  cloud dives into an olympic pool
function poolSet(t, fillLv, o = {}) {
  const top = 640, bot = 1340, lt = 230, rt = 850, lb = 40, rb = 1040;
  let lanes = '';
  for (let i = 1; i < 8; i++) {
    const xt = lerp(lt, rt, i / 8), xb = lerp(lb, rb, i / 8);
    let dots = '';
    for (let k = 0; k < 14; k++) { const f = k / 13, yy = lerp(top, bot, f * f * .3 + f * .7); const xx = lerp(xt, xb, (yy - top) / (bot - top)); dots += `<circle cx="${xx}" cy="${yy}" r="${4 + 6 * (yy - top) / (bot - top)}" fill="${k % 2 ? '#ff5468' : '#ffffff'}"/>`; }
    lanes += dots;
  }
  const fy = lerp(bot, top, fillLv);
  const fl = lerp(lb, lt, (bot - fy) / (bot - top)), fr = lerp(rb, rt, (bot - fy) / (bot - top));
  const wave = 14 * Math.sin(t * 9);
  return `<rect x="0" y="0" width="1080" height="1920" fill="#16203a"/>
    <rect x="0" y="420" width="1080" height="240" fill="#1d2b4a"/>
    ${[0, 1, 2, 3, 4, 5].map(i => `<rect x="${60 + i * 170}" y="460" width="110" height="140" rx="6" fill="#2a3a64" stroke="${C.ol}" stroke-width="5"/>`).join('')}
    <polygon points="0,610 1080,610 1080,1500 0,1500" fill="#c9d6e6"/>
    <polygon points="${lt - 30},${top - 30} ${rt + 30},${top - 30} ${rb + 40},${bot + 30} ${lb - 40},${bot + 30}" fill="#e8eef6" stroke="${C.ol}" stroke-width="6"/>
    <polygon points="${lt},${top} ${rt},${top} ${rb},${bot} ${lb},${bot}" fill="#3fb7e8" stroke="${C.ol}" stroke-width="6"/>
    <path d="M ${lt + 60} ${top + 40} L ${rt - 120} ${top + 40} M ${lb + 160} ${bot - 200} L ${rb - 300} ${bot - 200}" stroke="#8fe0ff" stroke-width="8" stroke-linecap="round" opacity=".7"/>
    ${lanes}
    ${fillLv > 0 ? `<path d="M ${fl} ${fy} Q ${(fl + fr) / 2 - 200} ${fy - wave} ${(fl + fr) / 2} ${fy} Q ${(fl + fr) / 2 + 200} ${fy + wave} ${fr} ${fy} L ${rb} ${bot} L ${lb} ${bot} Z" fill="${G.gas}" opacity=".88" stroke="${G.gasSh}" stroke-width="6"/>` : ''}
    ${[0, 1, 2, 3, 4, 5, 6, 7].map(i => { const x = lerp(lt, rt, (i + .5) / 8); return `<rect x="${x - 22}" y="${top - 70}" width="44" height="40" rx="6" fill="#f4f7fb" stroke="${C.ol}" stroke-width="5"/>`; }).join('')}`;
}
function sPool(t) {
  const dive = prog(t, 26.58, 26.95);
  const fillLv = eout(prog(t, 26.95, 27.8));
  let cloud = '';
  if (dive < 1) {
    const x = 540, y = lerp(330, 1000, ein(dive)) - 60 * Math.sin(dive * Math.PI);
    cloud = puff(x, y, 1.6 * (1 - .35 * dive), { t, rot: 25 * dive, sx: 1 - .25 * dive, sy: 1 + .3 * dive, face: { mouth: 'grin', brows: 'mean', eyes: dive > .3 ? 'closed' : 'n' } });
  }
  let splash = '';
  const sp = prog(t, 26.95, 27.6);
  if (sp > 0 && sp < 1) for (let i = 0; i < 12; i++) {
    const a = -Math.PI * (.15 + .7 * i / 11), v = 520 + 200 * hash(i);
    splash += `<circle cx="${540 + Math.cos(a) * v * sp}" cy="${1000 + Math.sin(a) * v * sp + 900 * sp * sp}" r="${22 * (1 - sp) + 6}" fill="${G.gas}" stroke="${C.ol}" stroke-width="5"/>`;
  }
  const head = fillLv > .6 ? `<g transform="translate(830 ${1000 - 40 * back(prog(t, 27.35, 27.6))})"><circle r="52" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/><path d="M -52 -6 Q -52 -60 0 -60 Q 52 -60 52 -6 Q 26 -30 0 -26 Q -26 -30 -52 -6 Z" fill="#f2b544" stroke="${C.ol}" stroke-width="5"/>
      <rect x="-44" y="-16" width="88" height="26" rx="12" fill="#5ab8ff" stroke="${C.ol}" stroke-width="5"/><path d="M -16 28 q 8 -8 16 0 q 8 8 16 0" stroke="${C.ol}" stroke-width="5" fill="none"/>
      ${hand(70, -10, .7, 200)}</g>` : '';
  return `${poolSet(t, fillLv)}${head}${splash}${cloud}`;
}

// ---------------------------------------------------------------- S8 28.0–30.96  300 pools fill up
function sPools(t) {
  let g = '';
  const cols = 15, rows = 20, x0 = 75, y0 = 400, cw = 62, ch = 46;
  for (let r = 0; r < rows; r++) for (let c = 0; c < cols; c++) {
    const t0 = 28.1 + (c + r) / (cols + rows - 2) * 1.7;
    const f = eout(prog(t, t0, t0 + .3));
    const x = x0 + c * cw, y = y0 + r * ch;
    const bob = t > 30.12 ? 3 * Math.sin(t * 14 + c + r) * Math.exp(-(t - 30.12) * 2) : 0;
    g += `<rect x="${x + 4}" y="${y + 5 + bob}" width="${cw - 8}" height="${ch - 10}" rx="5" fill="${f > .5 ? G.gas : '#3fb7e8'}" stroke="${C.ol}" stroke-width="3"/>`;
  }
  const p3 = back(prog(t, 28.02, 28.3));
  return `<rect x="0" y="0" width="1080" height="1920" fill="#16203a"/>
    <rect x="55" y="380" width="970" height="960" rx="18" fill="#c9d6e6" stroke="${C.ol}" stroke-width="7"/>${g}
    ${p3 > 0 ? `<g transform="translate(540 270) scale(${p3})">${T(0, 46, 150, '300+', C.warm)}</g>` : ''}
    ${t > 29.5 ? puff(960, 300, .55, { t, face: { mouth: 'grin', brows: 'mean', eyes: 'happy' } }) : ''}`;
}

// ---------------------------------------------------------------- S9 30.96–32.48  "Das klingt gewaltig."
function sWow(t) {
  const up = back(prog(t, 31.0, 31.3));
  const boom = back(prog(t, 31.42, 31.7));
  const s = lerp(3.2, 4.6, boom);
  const sh = t > 31.42 ? 10 * Math.exp(-(t - 31.42) * 6) * Math.sin(t * 90) : 0;
  return `<g transform="translate(${sh} 0)">${space(15, 70)}
    ${puff(540, 560, s, { t, face: { mouth: 'grin', brows: 'mean', look: 0, lookY: 12 } })}
    <rect x="-20" y="1330" width="1120" height="600" fill="#151a2c"/>
    ${personF(540, 1560, 1.15, { aL: lerp(12, 150, up), aR: lerp(-12, -150, up), mouth: 'o', eyeS: 1 + .3 * up, brow: up, look: 0, lookY: -16, lean: 0, sy: 1 - .03 * up, headDy: 10 * up })}
  </g>`;
}

// ---------------------------------------------------------------- S10 32.48–35.8  the cloud tries to push the whole planet
function sPush(t) {
  const ex = 680, ey = 860, er = 380;
  const enter = eout(prog(t, 32.55, 33.25));
  const strain = prog(t, 33.4, 35.06);
  const max = back(prog(t, 35.06, 35.3));
  const s = 1.3;
  const contact = ex - er - 96 * s;
  let x = lerp(-320, contact, enter);
  const sq = 1 - .12 * strain - .14 * max;
  x += (1 - sq) * 60;
  const jit = strain > 0 ? 3 * Math.sin(t * 70) : 0;
  const blink = (t > 34.2 && t < 34.32) ? .9 : 0;
  const lid = Math.max(.45 * cl(prog(t, 33.4, 33.8)), blink);
  let sweat = '';
  if (strain > .3) for (let i = 0; i < 2; i++) { const ph = ((t * 1.6) + i * .5) % 1; sweat += `<path transform="translate(${x - 60 - 50 * ph - i * 20} ${720 - 40 * ph + 160 * ph * ph})" d="M 0 -14 Q 12 4 0 12 Q -12 4 0 -14 Z" fill="#9fd9ff" stroke="${C.ol}" stroke-width="3"/>`; }
  let lines = '';
  if (enter > 0 && enter < 1) for (let i = 0; i < 3; i++) lines += `<line x1="${x - 160 - i * 20}" y1="${820 + i * 40}" x2="${x - 330}" y2="${820 + i * 40}" stroke="#e9f0ff" stroke-width="7" stroke-linecap="round" opacity=".7"/>`;
  return `${space(21, 90)}
    ${globe(t, ex, ey, er, 's10g', { spin: 6, face: { look: -12, lookY: 6, lid, lidCol: '#2f6fd6', mouth: max > 0 ? 'flat' : 'smile', brows: max > 0 ? 'calm' : 'none' } })}
    ${lines}
    ${puff(x + jit, 860, s, { t, sx: sq, sy: 1 / sq, face: { mouth: strain > 0 ? 'strain' : 'grin', brows: 'mean', look: 10, eyes: max > 0 ? 'closed' : 'n', blush: '#ff6a6a', blushA: .4 + .5 * strain } })}
    ${sweat}`;
}

// ---------------------------------------------------------------- S11 35.8–40.3  ideal conditions: thrust gauge barely twitches
function sGauge(t) {
  const cx = 540, cy = 980, R = 380;
  const tw = t > 39.08 ? .9 * Math.exp(-(t - 39.08) * 3) * Math.abs(Math.sin((t - 39.08) * 25)) + .25 : 0;
  const na = Math.PI + tw * Math.PI / 180;
  let ticks = '';
  for (let i = 0; i <= 10; i++) { const a = Math.PI + i * Math.PI / 10; ticks += `<line x1="${cx + Math.cos(a) * (R - 30)}" y1="${cy + Math.sin(a) * (R - 30)}" x2="${cx + Math.cos(a) * (R - (i % 5 ? 70 : 95))}" y2="${cy + Math.sin(a) * (R - (i % 5 ? 70 : 95))}" stroke="${C.ol}" stroke-width="${i % 5 ? 7 : 11}" stroke-linecap="round"/>`; }
  const zone = (a0, a1, col) => `<path d="M ${cx + Math.cos(a0) * (R - 20)} ${cy + Math.sin(a0) * (R - 20)} A ${R - 20} ${R - 20} 0 0 1 ${cx + Math.cos(a1) * (R - 20)} ${cy + Math.sin(a1) * (R - 20)}" stroke="${col}" stroke-width="22" fill="none"/>`;
  let spark = '';
  [[200, 470, 36.46], [880, 520, 36.8], [760, 330, 37.14]].forEach(([x, y, t0], i) => {
    const p = prog(t, t0, t0 + .6); if (p <= 0 || p >= 1) return;
    const s = Math.sin(p * Math.PI) * 1.4;
    spark += `<path transform="translate(${x} ${y}) scale(${s}) rotate(${p * 90})" d="M 0 -40 L 10 -10 L 40 0 L 10 10 L 0 40 L -10 10 L -40 0 L -10 -10 Z" fill="#fff6c9" stroke="${C.ol}" stroke-width="4"/>`;
  });
  const shine = prog(t, 36.46, 37.3);
  const lp = back(prog(t, 39.5, 39.8));
  const lx = 240, ly = 760;
  let lens = '';
  if (lp > 0) {
    const zoomA = tw * 8;
    lens = `<g transform="translate(${lx} ${ly}) scale(${lp})">
      <line x1="100" y1="100" x2="190" y2="190" stroke="#2b2f3d" stroke-width="34" stroke-linecap="round"/>
      <clipPath id="s11l"><circle r="150"/></clipPath><circle r="150" fill="#f4f7fb"/>
      <g clip-path="url(#s11l)"><line x1="-40" y1="-160" x2="-40" y2="160" stroke="${C.ol}" stroke-width="22"/>
        <g transform="rotate(${zoomA} 400 40)"><rect x="-38" y="28" width="520" height="26" fill="${C.red}" stroke="${C.ol}" stroke-width="6"/></g></g>
      <circle r="150" fill="none" stroke="#c9d2e6" stroke-width="18"/><circle r="150" fill="none" stroke="${C.ol}" stroke-width="6"/></g>`;
  }
  const sad = t > 39.6;
  return `${room()}
    <rect x="${cx - R - 40}" y="${cy - 20}" width="${2 * R + 80}" height="200" rx="30" fill="#3b4258" stroke="${C.ol}" stroke-width="8"/>
    <path d="M ${cx - R} ${cy} A ${R} ${R} 0 0 1 ${cx + R} ${cy} Z" fill="#eef2fa" stroke="${C.ol}" stroke-width="10"/>
    ${zone(Math.PI, Math.PI * 1.5, '#5fd0a0')}${zone(Math.PI * 1.5, Math.PI * 1.8, '#f2b544')}${zone(Math.PI * 1.8, Math.PI * 2, C.red)}
    ${ticks}
    ${shine > 0 && shine < 1 ? `<path d="M ${cx - R + shine * 2 * R} ${cy - R} l 60 0 l -120 ${R} l -60 0 Z" fill="#fff" opacity=".45"/>` : ''}
    <g transform="rotate(${na * 180 / Math.PI} ${cx} ${cy})"><rect x="${cx}" y="${cy - 12}" width="${R - 40}" height="24" rx="12" fill="${C.red}" stroke="${C.ol}" stroke-width="6"/></g>
    <circle cx="${cx}" cy="${cy}" r="40" fill="#4b5266" stroke="${C.ol}" stroke-width="8"/>
    ${puff(800, 520 - 6 * Math.sin(t * 3), .9, { t, face: { mouth: sad ? 'flat' : 'o', brows: sad ? 'sad' : 'up', look: -14, lookY: 14, eyeS: sad ? 1 : 1.15 } })}
    ${spark}${lens}`;
}

// ---------------------------------------------------------------- S12 40.3–47.26  after one year: less than an atom
function atom(t, s) {
  let o = '';
  for (let i = 0; i < 3; i++) {
    const a = i * 60;
    const ea = t * 4 + i * 2.1;
    o += `<g transform="rotate(${a})"><ellipse rx="110" ry="40" fill="none" stroke="#9fdcff" stroke-width="7"/><circle cx="${110 * Math.cos(ea)}" cy="${40 * Math.sin(ea)}" r="13" fill="${C.warm}" stroke="${C.ol}" stroke-width="4"/></g>`;
  }
  return `<g transform="scale(${s})">${o}<circle r="28" fill="${C.red}" stroke="${C.ol}" stroke-width="6"/><circle cx="-8" cy="-8" r="8" fill="#ffb3bd"/></g>`;
}
function sAtom(t) {
  const cx = 540, cy = 690, r = 235;
  const flip = prog(t, 40.96, 41.9);
  const month = Math.min(12, 1 + Math.floor(flip * 12));
  const cal = back(prog(t, 40.5, 40.8));
  const dash = back(prog(t, 42.0, 42.25));
  const lp = back(prog(t, 43.0, 43.35));
  const ap = back(prog(t, 43.66, 43.95));
  const shrug = t > 46.28 ? 4 * Math.sin(prog(t, 46.28, 46.9) * Math.PI * 2) : 0;
  const lx = 620, ly = 1170;
  let lens = '';
  if (lp > 0) {
    lens = `<path d="M ${cx + r - 10} ${cy + 20} L ${lx - 120} ${ly - 150} M ${cx + r + 6} ${cy + 60} L ${lx + 150} ${ly - 110}" stroke="#c9d2e6" stroke-width="4" stroke-dasharray="10 8" opacity="${lp}"/>
    <g transform="translate(${lx} ${ly}) scale(${lp})">
      <clipPath id="s12l"><circle r="190"/></clipPath><circle r="190" fill="#0b1226"/>
      <g clip-path="url(#s12l)"><rect x="-260" y="-220" width="250" height="440" fill="#2f6fd6"/><rect x="-260" y="-220" width="200" height="440" fill="#4caf7a" opacity=".5"/>
        <line x1="-10" y1="-220" x2="-10" y2="220" stroke="${C.ol}" stroke-width="10"/>
        <line x1="-4" y1="-220" x2="-4" y2="220" stroke="${G.chalk}" stroke-width="6" stroke-dasharray="20 14"/>
        ${ap > 0 ? `<g transform="translate(-7 0) scale(${ap}) rotate(${t * 10})">${atom(t, 1.25)}</g>` : ''}</g>
      <circle r="190" fill="none" stroke="#c9d2e6" stroke-width="20"/><circle r="190" fill="none" stroke="${C.ol}" stroke-width="6"/></g>`;
  }
  const calC = cal > 0 ? `<g transform="translate(870 290) scale(${cal}) rotate(${6 + 3 * Math.sin(t * 2)})"><rect x="-110" y="-110" width="220" height="230" rx="18" fill="#f4efe2" stroke="${C.ol}" stroke-width="7"/>
      <rect x="-110" y="-110" width="220" height="60" rx="18" fill="${C.red}" stroke="${C.ol}" stroke-width="7"/><circle cx="-50" cy="-112" r="10" fill="${C.ol}"/><circle cx="50" cy="-112" r="10" fill="${C.ol}"/>
      ${T(0, 80, 120, String(month), C.ol, { sw: 0 })}
      ${flip > 0 && flip < 1 ? `<path d="M -110 -50 Q 0 ${-50 + 150 * ((flip * 12) % 1)} 110 -50" fill="#e5dcc6" stroke="${C.ol}" stroke-width="4"/>` : ''}</g>` : '';
  return `${space(25, 90)}
    ${dash > 0 ? `<circle cx="${cx}" cy="${cy}" r="${r + 0}" fill="none" stroke="${G.chalk}" stroke-width="7" stroke-dasharray="22 16" transform="translate(${cx} ${cy}) scale(${dash}) translate(${-cx} ${-cy})"/>` : ''}
    <g transform="rotate(${shrug} ${cx} ${cy + r})">${globe(t, cx, cy, r, 's12g', { spin: 30, face: { look: lp > 0 ? 12 : 0, lookY: lp > 0 ? 14 : -4, mouth: ap > 0 ? (t > 46.28 ? 'flat' : 'small') : 'smile', brows: ap > 0 ? 'up' : 'calm', lid: t > 44.5 && t < 46.2 ? .35 : 0 } })}</g>
    ${dash > 0 ? `<circle cx="${cx}" cy="${cy}" r="${r}" fill="none" stroke="${G.chalk}" stroke-width="6" stroke-dasharray="22 16" opacity=".85"/>` : ''}
    ${calC}${lens}`;
}

// ---------------------------------------------------------------- S13 47.26–54.08  4.5 billion years time-lapse + birthday
function phase13(t) { return .7 * (t - 47.26) + 58 * eio(prog(t, 48.0, 51.6)); }
function sTime(t) {
  const sx = 540, sy = 880, R = 360;
  const ph = phase13(t) - Math.PI / 2;
  const spd = (phase13(t + .02) - phase13(t - .02)) / .04;
  const ex = sx + R * Math.cos(ph), ey = sy + R * Math.sin(ph);
  const trailLen = cl(spd * .12, .05, 5.5);
  const tr0 = ph - trailLen;
  const big = trailLen > Math.PI ? 1 : 0;
  const trail = `<path d="M ${sx + R * Math.cos(tr0)} ${sy + R * Math.sin(tr0)} A ${R} ${R} 0 ${big} 1 ${ex} ${ey}" stroke="${G.gas}" stroke-width="${16}" fill="none" stroke-linecap="round" opacity=".55"/>`;
  const yrs = 4.5e9 * Math.pow(eio(prog(t, 47.5, 50.3)), 3);
  const st = back(prog(t, 50.3, 50.5));
  const party = back(prog(t, 52.88, 53.1));
  let conf = '';
  const cp = prog(t, 53.06, 54.08);
  if (cp > 0 && cp < 1) for (let i = 0; i < 16; i++) {
    const a = -Math.PI * hash(i), v = 300 + 300 * hash(i + 3);
    conf += `<rect x="-8" y="-14" width="16" height="28" fill="${PCOL[i % 6]}" transform="translate(${ex + Math.cos(a) * v * cp} ${ey - 80 + Math.sin(a) * v * cp + 500 * cp * cp}) rotate(${cp * 500 * (hash(i) - .5)})"/>`;
  }
  const hat = party > 0 ? `<g transform="translate(${ex + 10} ${ey - 78}) rotate(14) scale(${party})"><path d="M -42 0 L 0 -110 L 42 0 Z" fill="${C.red}" stroke="${C.ol}" stroke-width="6" stroke-linejoin="round"/><path d="M -28 -36 L 22 -50 M -14 -74 L 12 -82" stroke="#ffd27a" stroke-width="9" stroke-linecap="round"/><circle cx="0" cy="-114" r="16" fill="${C.warm}" stroke="${C.ol}" stroke-width="5"/></g>` : '';
  return `${space(31, 90)}
    <circle cx="${sx}" cy="${sy}" r="${R}" fill="none" stroke="#4d5f95" stroke-width="5" stroke-dasharray="22 18"/>
    ${trail}
    ${sunF(t * (spd > 3 ? 3 : 1), sx, sy, 120, { face: { look: cl(Math.cos(ph) * 12, -12, 12), lookY: cl(Math.sin(ph) * 12, -12, 12), mouth: party > 0 ? 'grin' : (spd > 6 ? 'o' : 'smile'), brows: spd > 6 ? 'up' : 'calm' } })}
    ${puff(ex - 70 * Math.cos(ph + Math.PI / 2), ey - 70 * Math.sin(ph + Math.PI / 2), .28, { t, noGlow: true })}
    ${globe(t * (spd > 3 ? 4 : 1), ex, ey, 72, 's13g', { spin: 30, face: { mouth: party > 0 ? 'grin' : (spd > 6 ? 'wavy' : 'smile'), eyes: party > 0 ? 'happy' : (spd > 6 ? 'swirl' : 'n'), t } })}
    ${hat}${conf}
    ${t < 50.3 ? T(540, 330, 96, fmt(yrs), C.ghost) : `<g transform="translate(540 300) scale(${st})">${T(0, 44, 130, '4,5 Mrd.', C.warm)}</g>`}`;
}

// ---------------------------------------------------------------- S14 54.08–56.82  result: a few centimetres (a snail is faster)
function snail(x, y, s, t) {
  const st = 1 + .06 * Math.sin(t * 8);
  return `<g transform="translate(${x} ${y}) scale(${s})">
    <path d="M -90 0 Q -100 -20 -70 -24 L 60 -24 Q ${84 * st} -26 ${90 * st} -60 Q ${96 * st} -80 ${104 * st} -60 Q ${110 * st} -20 80 0 Z" fill="#f2c27a" stroke="${C.ol}" stroke-width="6" stroke-linejoin="round"/>
    <path d="M ${92 * st} -60 L ${80 * st} -110 M ${102 * st} -62 L ${112 * st} -108" stroke="${C.ol}" stroke-width="5"/><circle cx="${80 * st}" cy="-112" r="8" fill="${C.ol}"/><circle cx="${112 * st}" cy="-110" r="8" fill="${C.ol}"/>
    <circle cx="-10" cy="-70" r="58" fill="#c46a4a" stroke="${C.ol}" stroke-width="6"/><path d="M -10 -70 m -6 0 a 6 6 0 1 1 12 0 a 16 16 0 1 1 -32 0 a 28 28 0 1 1 56 0" stroke="#7d3b28" stroke-width="7" fill="none"/>
    <path d="M ${100 * st} -40 q 6 6 0 10" stroke="${C.ol}" stroke-width="4" fill="none"/></g>`;
}
function sCm(t) {
  const u = 90, x0 = 90, R = 1400, ecy = 700;
  const mv = eio(prog(t, 54.9, 55.6));
  const edge = x0 + 7 * u * mv;
  const ecx = edge - R;
  let ticks = '';
  for (let i = 0; i <= 10; i++) ticks += `<line x1="${x0 + i * u}" y1="1080" x2="${x0 + i * u}" y2="${i % 5 ? 1120 : 1140}" stroke="${C.ol}" stroke-width="5"/><text x="${x0 + i * u}" y="1180" text-anchor="middle" style="font-family:'Inter';font-weight:900;font-size:30px" fill="${C.ol}">${i}</text>`;
  for (let i = 0; i < 10; i++) ticks += `<line x1="${x0 + i * u + u / 2}" y1="1080" x2="${x0 + i * u + u / 2}" y2="1104" stroke="${C.ol}" stroke-width="3"/>`;
  const cmP = back(prog(t, 55.28, 55.55));
  const snX = lerp(-150, 820, prog(t, 54.1, 56.82));
  return `${space(41, 60)}
    ${globe(t, ecx, ecy, R, 's14g', { spin: 0, noGlow: true, noIce: true })}
    <circle cx="${x0 - R}" cy="${ecy}" r="${R}" fill="none" stroke="${G.chalk}" stroke-width="7" stroke-dasharray="24 16"/>
    ${mv > 0 ? `<path d="M ${x0} 520 V 1060 M ${edge} 520 V 1060" stroke="${C.warm}" stroke-width="5" stroke-dasharray="12 10"/>` : ''}
    <rect x="40" y="1060" width="1000" height="140" rx="12" fill="#f2d27a" stroke="${C.ol}" stroke-width="7"/>${ticks}
    ${snail(snX, 1060, .9, t)}
    ${cmP > 0 ? popT(lerp(x0, edge, .5) + 60, 420, 120, '≈ 7 cm', cmP, C.warm) : ''}
    ${mv > 0 && mv < 1 ? arrow(edge - 160, 800, edge + 40, 800, C.warm, 26, 1) : ''}`;
}

// ---------------------------------------------------------------- S15 56.82–59.12  "der eigentliche Haken" — a hook drops
function sHook(t) {
  const lean = eio(prog(t, 56.9, 57.7));
  const drop = prog(t, 57.75, 58.26);
  const hx = 790;
  const hy = t < 58.26 ? lerp(-300, 520, ein(drop)) : 520 + 14 * ring(t, 58.26, 2.5, 4);
  const swing = t > 58.26 ? 10 * ring(t, 58.26, 1.1, 1.6) : 0;
  const jump = t > 58.3 ? Math.sin(prog(t, 58.3, 58.65) * Math.PI) : 0;
  const scared = t > 58.3;
  const ex = back(prog(t, 58.36, 58.6));
  const sh = t > 58.26 && t < 58.8 ? 9 * Math.exp(-(t - 58.26) * 7) * Math.sin(t * 90) : 0;
  const hook = `<g transform="rotate(${swing} ${hx} 0)">
    <line x1="${hx}" y1="-20" x2="${hx}" y2="${hy - 200}" stroke="#c9d2e6" stroke-width="6"/>
    <path d="M ${hx} ${hy - 210} V ${hy} Q ${hx} ${hy + 110} ${hx - 85} ${hy + 110} Q ${hx - 165} ${hy + 110} ${hx - 165} ${hy + 20} L ${hx - 190} ${hy + 60}" stroke="${C.ol}" stroke-width="44" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${hx} ${hy - 210} V ${hy} Q ${hx} ${hy + 110} ${hx - 85} ${hy + 110} Q ${hx - 165} ${hy + 110} ${hx - 165} ${hy + 20} L ${hx - 190} ${hy + 60}" stroke="#c9d2e6" stroke-width="28" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${hx - 6} ${hy - 190} V ${hy - 10}" stroke="#ffffff" stroke-width="8" stroke-linecap="round" opacity=".7"/>
    <circle cx="${hx}" cy="${hy - 222}" r="22" fill="none" stroke="${C.ol}" stroke-width="12"/><circle cx="${hx}" cy="${hy - 222}" r="22" fill="none" stroke="#c9d2e6" stroke-width="6"/></g>`;
  return `<g transform="translate(${sh} 0)">${room()}
    <ellipse cx="540" cy="800" rx="500" ry="500" fill="url(#gMoon)" opacity=".25"/>
    ${personF(470, 1560 - 80 * jump, 1.15, { lean: scared ? -4 : 6 * lean, look: scared ? 14 : 8 * lean, lookY: scared ? -14 : 0, mouth: scared ? 'o' : 'smile', brow: scared ? 1 : 0, eyeS: scared ? 1.25 : 1, aL: scared ? 150 : 12, aR: scared ? -150 : -12 - 50 * lean, sy: 1 + .08 * jump })}
    ${hook}
    ${ex > 0 ? popT(940, 330, 190, '!', ex, C.red, 10) : ''}
  </g>`;
}

// ---------------------------------------------------------------- S16–S18 59.12–71.56  Earth + atmosphere system
const EX = 540, EY = 960, ER = 250, AR = 350;
function atmo(t, bump = 0, glow = 1) {
  const ry = AR - bump * 30, cyy = EY - bump * 0;
  return `<ellipse cx="${EX}" cy="${cyy}" rx="${AR + bump * 10}" ry="${ry}" fill="${G.atm}" opacity="${.13 * glow}"/>
    <ellipse cx="${EX}" cy="${cyy}" rx="${AR + bump * 10}" ry="${ry}" fill="none" stroke="#9fdcff" stroke-width="${8 + 6 * Math.abs(bump)}" opacity="${.55 + .3 * Math.abs(bump)}"/>`;
}
function fins(p, alpha = 1) {
  if (p <= 0) return '';
  const d = `M ${EX - 150} ${EY + 160} L ${EX - 260} ${EY + 300} L ${EX - 120} ${EY + 240} M ${EX + 150} ${EY + 160} L ${EX + 260} ${EY + 300} L ${EX + 120} ${EY + 240} M ${EX - 120} ${EY - 180} L ${EX} ${EY - 330} L ${EX + 120} ${EY - 180} M ${EX - 70} ${EY + 230} L ${EX - 90} ${EY + 300} H ${EX + 90} L ${EX + 70} ${EY + 230}`;
  return `<g opacity="${alpha}">${chalk(d, p, 9)}</g>`;
}
function sAssume(t) {
  const fp = eio(prog(t, 59.3, 60.3));
  const wink = t > 59.78 && t < 60.4;
  const pp = back(prog(t, 60.88, 61.1));
  const fly = ein(prog(t, 61.42, 62.9));
  const py = lerp(EY - ER - 70, -260, fly);
  const ap = eio(prog(t, 61.42, 62.0));
  return `${space(51, 90)}
    ${atmo(t)}
    ${globe(t, EX, EY, ER, 's16g', { spin: 20, face: wink ? { eyes: 'n', mouth: 'grin', lid: .0, brows: 'mean', look: 6 } : { look: 0, lookY: pp > 0 ? -16 : 0, mouth: pp > 0 ? 'o' : 'smile', brows: 'calm' } })}
    ${wink ? `<rect x="${EX - 52}" y="${EY + 22 - 36}" width="44" height="46" rx="14" fill="#2f6fd6"/><path d="M ${EX - 48} ${EY + 10} Q ${EX - 30} ${EY + 20} ${EX - 12} ${EY + 10}" stroke="${C.ol}" stroke-width="7" fill="none" stroke-linecap="round"/>` : ''}
    ${fins(fp)}
    ${ap > 0 ? `<line x1="${EX + 150}" y1="${EY - ER - 40}" x2="${EX + 150}" y2="${lerp(EY - ER - 40, 180, ap)}" stroke="${G.chalk}" stroke-width="8" stroke-dasharray="26 18" stroke-linecap="round"/>
      <path d="M ${EX + 120} ${lerp(EY - ER - 40, 180, ap) + 40} L ${EX + 150} ${lerp(EY - ER - 40, 180, ap)} L ${EX + 180} ${lerp(EY - ER - 40, 180, ap) + 40}" stroke="${G.chalk}" stroke-width="8" fill="none" stroke-linecap="round"/>` : ''}
    ${pp > 0 ? `<g transform="translate(${EX} ${py}) scale(${pp})">${puff(0, 0, 1.0, { t, dash: true })}</g>` : ''}`;
}
function sAtmo(t) {
  const erase = prog(t, 63.66, 63.95);
  const rise = eout(prog(t, 63.8, 64.44));
  const top = EY - AR + 50;
  const bump = t > 64.44 ? ring(t, 64.44, 3, 4) : 0;
  let px, py, rot = 0;
  if (t < 64.44) { px = EX; py = lerp(EY - ER - 40, top, rise); }
  else {
    const a = -Math.PI / 2 + 2.6 * eio(prog(t, 64.6, 66.6)) * Math.PI;
    const rr = lerp(AR - 50, 268, prog(t, 64.44, 64.8));
    const back_ = Math.exp(-(t - 64.44) * 6) * 30;
    px = EX + rr * Math.cos(a); py = EY + rr * Math.sin(a) + back_; rot = (a + Math.PI / 2) * 180 / Math.PI;
  }
  const dizzy = t > 64.44 && t < 66.6;
  const lasso = eio(prog(t, 66.6, 67.4));
  const pulse = t > 67.48 ? 1 + .06 * Math.exp(-(t - 67.48) * 5) * Math.sin((t - 67.48) * 30) : 1;
  const L = AR + 50;
  return `${space(51, 90)}
    ${atmo(t, bump)}
    ${globe(t, EX, EY, ER, 's17g', { spin: 20, face: { look: cl((px - EX) / 15, -12, 12), lookY: cl((py - EY) / 15, -14, 14), mouth: lasso > 0 ? 'grin' : (t > 64.44 ? 'smile' : 'small'), brows: 'calm' } })}
    ${fins(1, 1 - erase)}
    ${erase > 0 && erase < 1 ? Array.from({ length: 10 }, (_, i) => `<circle cx="${EX - 250 + hash(i) * 500}" cy="${EY - 300 + hash(i + 4) * 600 + 200 * erase}" r="${6 * (1 - erase)}" fill="${G.chalk}"/>`).join('') : ''}
    ${puff(px, py, .5, { t, rot, face: { mouth: t > 64.44 ? 'o' : 'grin', eyes: dizzy ? 'swirl' : 'n', brows: t > 64.44 ? 'up' : 'mean', t } })}
    ${t > 64.44 && t < 65 ? `<g opacity="${1 - prog(t, 64.44, 65)}">${[0, 1, 2, 3].map(i => `<path transform="translate(${EX + (i - 1.5) * 60} ${EY - AR - 30}) rotate(${(i - 1.5) * 25})" d="M 0 0 L 0 -40" stroke="${C.warm}" stroke-width="8" stroke-linecap="round"/>`).join('')}</g>` : ''}
    ${lasso > 0 ? `<g transform="translate(${EX} ${EY}) scale(${pulse})"><circle r="${L}" fill="none" stroke="${C.warm}" stroke-width="10" stroke-dasharray="30 20" pathLength="1000" style="stroke-dasharray:${30} ${20}" opacity="${lasso}"/></g>` : ''}`;
}
function sCancel(t) {
  const L = AR + 50;
  const sp = back(prog(t, 68.02, 68.3));
  const gas = eout(prog(t, 68.12, 68.7));
  const ad = back(prog(t, 68.3, 68.6)), au = back(prog(t, 68.7, 69.0));
  const glow = t > 69.28 && t < 70.3 ? .5 + .5 * Math.sin((t - 69.28) * 12) : 0;
  const meet = eio(prog(t, 70.64, 70.94));
  const zero = back(prog(t, 70.94, 71.2));
  const flash = prog(t, 70.94, 71.25);
  const kick = t > 68.12 ? 12 * Math.exp(-(t - 68.12) * 6) : 0;
  const rx = lerp(960, EX + 40, meet), lx = lerp(120, EX - 40, meet);
  const ay = lerp(EY - 120, EY - 520, meet);
  return `${space(51, 90)}
    ${atmo(t)}
    <circle cx="${EX}" cy="${EY}" r="${L}" fill="none" stroke="${C.warm}" stroke-width="${10 + 8 * glow}" stroke-dasharray="30 20" opacity="${.6 + .4 * glow}"/>
    ${globe(t, EX, EY + kick * .3, ER, 's18g', { spin: 20, face: { look: 0, lookY: -10, mouth: zero > 0 ? 'grin' : 'small', brows: 'calm' } })}
    ${sp > 0 ? tiny(EX, EY - ER + kick * .3, .9 * sp, 0, { col: C.red, sq: 1 - .2 * Math.exp(-Math.max(0, t - 68.12) * 8) * (t > 68.12 ? 1 : 0), mouth: t > 68.12 ? 'o' : 's' }) : ''}
    ${gas > 0 ? puff(EX + 30, lerp(EY - ER - 60, EY - AR + 60, gas), .42, { t, noGlow: true }) : ''}
    ${meet < 1 ? arrow(rx, ay, rx, ay + 220, C.red, 30, ad) + arrow(lx, ay + 220, lx, ay, '#5ab8ff', 30, au) : ''}
    ${flash > 0 && flash < 1 ? `<circle cx="${EX}" cy="${ay + 110}" r="${40 + 200 * flash}" fill="none" stroke="#fff" stroke-width="${12 * (1 - flash)}"/>` : ''}
    ${zero > 0 ? popT(EX, 420, 200, '0', zero, C.warm) : ''}`;
}

// ---------------------------------------------------------------- S19 71.56–81.2  car: pushing the dashboard from inside
function carScene(t) {
  const enter = eout(prog(t, 71.56, 72.5));
  const cx = lerp(-700, 540, enter);
  const brake = t > 72.45 ? 3 * ring(t, 72.45, 1.6, 4) : 0;
  const wheel = (cx - 540) / 77 * 57.3;
  const push = eio(prog(t, 74.8, 75.4));
  const hard = eio(prog(t, 77.7, 78.2)) * (t < 79.9 ? 1 : 0);
  const flop = eio(prog(t, 79.9, 80.4));
  const strainS = Math.max(push * (t < 79.9 ? 1 : 0) * .4, hard);
  const shake = strainS * (2 + 3 * hard) * Math.sin(t * 70);
  const rock = (t > 75.4 && t < 80) ? .6 * strainS * Math.sin(t * 9) : 0;
  const bob = t > 73.3 && t < 73.8 ? -10 * Math.sin(prog(t, 73.3, 73.8) * Math.PI) : 0;
  // person (car-local coords, ground y = 0, facing right)
  const back_ = -12 * strainS + 18 * flop;     // torso lean back (deg)
  const hip = [-70, -120];
  const sh = [hip[0] + 110 * Math.sin(back_ * Math.PI / 180) * -1 - 10, hip[1] - 110 * Math.cos(back_ * Math.PI / 180)];
  const head = [sh[0] + 14, sh[1] - 58 + bob];
  const handRest = [150, -210], handPush = [238, -188], handLap = [10, -130];
  let hp = [lerp(handRest[0], handPush[0], push), lerp(handRest[1], handPush[1], push)];
  if (flop > 0) hp = [lerp(hp[0], handLap[0], flop), lerp(hp[1], handLap[1], flop)];
  const dx = hp[0] - sh[0], dy = hp[1] - sh[1], dist = Math.hypot(dx, dy), Lseg = 125;
  const bend = Math.sqrt(Math.max(0, Lseg * Lseg - dist * dist / 4));
  const el = [sh[0] + dx / 2 + bend * dy / dist * -1 * -1, sh[1] + dy / 2 + bend * -dx / dist * -1];
  const red = cl(hard * 1.2);
  let sweat = '';
  if (hard > .2) for (let i = 0; i < 3; i++) { const ph = ((t * 1.8) + i / 3) % 1; sweat += `<path transform="translate(${head[0] - 20 - 70 * ph + i * 30} ${head[1] - 50 - 60 * ph + 140 * ph * ph})" d="M 0 -12 Q 10 3 0 10 Q -10 3 0 -12 Z" fill="#9fd9ff" stroke="${C.ol}" stroke-width="3"/>`; }
  let steam = '';
  if (t > 78.74 && t < 80) for (let i = 0; i < 3; i++) { const ph = ((t - 78.74) * 1.5 + i / 3) % 1; steam += `<circle cx="${head[0] + (i - 1) * 30 + 10 * Math.sin(t * 6 + i)}" cy="${head[1] - 70 - 120 * ph}" r="${12 + 16 * ph}" fill="#fff" opacity="${.7 * (1 - ph)}"/>`; }
  const person = `
    <rect x="-150" y="-260" width="50" height="160" rx="20" fill="#7a2f3e" stroke="${C.ol}" stroke-width="6" transform="rotate(${-6 + .4 * back_} -125 -110)"/>
    <path d="M ${hip[0]} ${hip[1]} L ${hip[0] + 110} ${hip[1]} L ${hip[0] + 130} -50" stroke="#33405e" stroke-width="40" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <line x1="${hip[0]}" y1="${hip[1]}" x2="${sh[0]}" y2="${sh[1]}" stroke="${C.ol}" stroke-width="72" stroke-linecap="round"/>
    <line x1="${hip[0]}" y1="${hip[1]}" x2="${sh[0]}" y2="${sh[1]}" stroke="${C.pj}" stroke-width="60" stroke-linecap="round"/>
    <g transform="translate(${shake * .6} 0)">
    <circle cx="${head[0]}" cy="${head[1]}" r="50" fill="${C.skin}" stroke="${C.ol}" stroke-width="6"/>
    <circle cx="${head[0]}" cy="${head[1]}" r="47" fill="${C.red}" opacity="${.35 * red}"/>
    <path d="M ${head[0] - 50} ${head[1] + 4} Q ${head[0] - 56} ${head[1] - 60} ${head[0] + 6} ${head[1] - 56} Q ${head[0] + 48} ${head[1] - 52} ${head[0] + 46} ${head[1] - 20} Q ${head[0] + 10} ${head[1] - 30} ${head[0] - 10} ${head[1] - 10} Q ${head[0] - 30} ${head[1] + 10} ${head[0] - 50} ${head[1] + 4} Z" fill="${C.hair}" stroke="${C.ol}" stroke-width="5"/>
    <path d="M ${head[0] + 46} ${head[1] - 2} q 16 8 2 18" fill="${C.skin}" stroke="${C.ol}" stroke-width="5"/>
    ${flop > .5 ? `<path d="M ${head[0] + 14} ${head[1] - 12} l 14 14 m 0 -14 l -14 14" stroke="${C.ol}" stroke-width="5" stroke-linecap="round"/>` :
      hard > .3 ? `<path d="M ${head[0] + 10} ${head[1] - 16} l 18 8 l -18 6" stroke="${C.ol}" stroke-width="5" fill="none" stroke-linecap="round"/>` :
      `<circle cx="${head[0] + 22}" cy="${head[1] - 8}" r="7" fill="${C.ol}"/>`}
    ${hard > .3 && flop < .5 ? `<rect x="${head[0] + 18}" y="${head[1] + 16}" width="26" height="12" rx="3" fill="#fff" stroke="${C.ol}" stroke-width="4"/>` : flop > .5 ? `<ellipse cx="${head[0] + 30}" cy="${head[1] + 22}" rx="8" ry="10" fill="${C.ol}"/><path d="M ${head[0] + 30} ${head[1] + 28} q 2 14 10 4" fill="#ff8fa8"/>` : `<path d="M ${head[0] + 18} ${head[1] + 20} q 10 6 20 -2" stroke="${C.ol}" stroke-width="5" fill="none" stroke-linecap="round"/>`}
    </g>
    <path d="M ${sh[0]} ${sh[1]} L ${el[0]} ${el[1]} L ${hp[0]} ${hp[1]}" stroke="${C.ol}" stroke-width="40" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M ${sh[0]} ${sh[1]} L ${el[0]} ${el[1]} L ${hp[0]} ${hp[1]}" stroke="${C.pj}" stroke-width="28" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${hp[0]}" cy="${hp[1]}" r="20" fill="${C.skin}" stroke="${C.ol}" stroke-width="5"/>`;
  const W = (x) => `<g transform="translate(${x} -60) rotate(${wheel})"><circle r="74" fill="#1c1f2a" stroke="${C.ol}" stroke-width="7"/><circle r="40" fill="#9aa4bb" stroke="${C.ol}" stroke-width="5"/>${[0, 1, 2, 3, 4].map(i => `<line x1="0" y1="0" x2="${36 * Math.cos(i * 1.2566)}" y2="${36 * Math.sin(i * 1.2566)}" stroke="#5b6378" stroke-width="7"/>`).join('')}<circle r="10" fill="#5b6378"/></g>`;
  const aR = back(prog(t, 75.82, 76.1)) * (push > .5 && flop < .5 ? 1 : 0);
  const car = `<g transform="translate(${cx} 1260) scale(1.18) rotate(${brake + rock} 0 -60)">
    <ellipse cx="0" cy="0" rx="470" ry="22" fill="#000" opacity=".4"/>
    <path d="M -440 -80 Q -450 -180 -340 -200 L -210 -210 Q -150 -350 -10 -356 L 150 -356 Q 270 -346 340 -220 L 410 -205 Q 465 -190 460 -100 L 455 -70 Q 445 -50 410 -50 L -410 -50 Q -440 -55 -440 -80 Z" fill="#e2554f" stroke="${C.ol}" stroke-width="8" stroke-linejoin="round"/>
    <path d="M -190 -214 Q -132 -330 -8 -334 L 146 -334 Q 244 -322 304 -220 Z" fill="#101a33" stroke="${C.ol}" stroke-width="6"/>
    <clipPath id="s19w"><path d="M -190 -214 Q -132 -330 -8 -334 L 146 -334 Q 244 -322 304 -220 L 304 -100 L -190 -100 Z"/></clipPath>
    <g clip-path="url(#s19w)">
      <path d="M 196 -214 L 300 -214 L 300 -160 L 216 -160 Z" fill="#3b4258" stroke="${C.ol}" stroke-width="5"/>
      <g transform="rotate(-20 168 -238)"><ellipse cx="168" cy="-238" rx="12" ry="46" fill="#1c1f2a" stroke="${C.ol}" stroke-width="5"/></g>
      ${person}
    </g>
    <path d="M -190 -214 Q -132 -330 -8 -334 L 146 -334 Q 244 -322 304 -220 Z" fill="#9fd0ff" opacity=".12"/>
    <path d="M -100 -300 L -60 -230 M -40 -320 L 10 -230" stroke="#fff" stroke-width="10" opacity=".25" stroke-linecap="round"/>
    <line x1="60" y1="-334" x2="60" y2="-214" stroke="${C.ol}" stroke-width="9"/>
    <path d="M -440 -120 H 460" stroke="#b33c39" stroke-width="10"/>
    <rect x="410" y="-170" width="44" height="30" rx="8" fill="${C.warm}" stroke="${C.ol}" stroke-width="5"/>
    <rect x="-446" y="-160" width="30" height="30" rx="6" fill="${C.red}" stroke="${C.ol}" stroke-width="5"/>
    ${W(-260)}${W(270)}
  </g>`;
  // force arrows in world coords (dashboard push → , seat reaction ←)
  const k = 1.18, ox = cx, oy = 1260;
  const A1 = arrow(ox + 250 * k, oy - 300 * k, ox + 380 * k, oy - 300 * k, C.red, 24, aR);
  const A2 = arrow(ox - 140 * k, oy - 300 * k, ox - 270 * k, oy - 300 * k, '#5ab8ff', 24, aR);
  const stamp = back(prog(t, 80.38, 80.6));
  let bld = '';
  for (let i = 0; i < 7; i++) { const bx = i * 160 - 20, bh = 300 + 260 * hash(i + 2); bld += `<rect x="${bx}" y="${1100 - bh}" width="150" height="${bh + 20}" fill="#18213d" stroke="${C.ol}" stroke-width="5"/>`; for (let w = 0; w < 6; w++) if (hash(i * 7 + w) > .45) bld += `<rect x="${bx + 24 + (w % 2) * 60}" y="${1100 - bh + 40 + Math.floor(w / 2) * 80}" width="36" height="44" fill="${C.warm}" opacity=".55"/>`; }
  return `<rect x="0" y="0" width="1080" height="1920" fill="#0e1530"/>${stars(40, 17)}
    <circle cx="860" cy="300" r="70" fill="${C.moon}"/><circle cx="860" cy="300" r="140" fill="url(#gMoon)"/>
    ${bld}
    <rect x="0" y="1100" width="1080" height="70" fill="#2a3150"/>
    <rect x="0" y="1170" width="1080" height="800" fill="#1b1f2e"/>
    ${[0, 1, 2, 3, 4].map(i => `<rect x="${i * 260 - 60}" y="1330" width="150" height="16" rx="8" fill="#d8d2b8" opacity=".6"/>`).join('')}
    ${car}${A1}${A2}${sweat}${steam}
    ${enter > 0 && enter < 1 ? [0, 1, 2].map(i => `<line x1="${cx - 600 - i * 40}" y1="${1000 + i * 60}" x2="${cx - 800}" y2="${1000 + i * 60}" stroke="#e9f0ff" stroke-width="7" stroke-linecap="round" opacity=".6"/>`).join('') : ''}
    ${stamp > 0 ? `<g transform="translate(860 560) rotate(-10) scale(${stamp})"><circle r="110" fill="#f4efe2" stroke="${C.ol}" stroke-width="8"/><circle r="84" fill="none" stroke="#c9d2e6" stroke-width="8"/>${T(0, 40, 110, '0', C.red, { sw: 6 })}<path d="M -60 40 A 76 76 0 0 1 60 40" stroke="${C.ol}" stroke-width="5" fill="none" opacity=".3"/></g>` : ''}`;
}

// ---------------------------------------------------------------- S20 81.2–84.3  8 billion people — Earth stays put
const ALL = Array.from({ length: 26 }, (_, i) => ({ a: i * 360 / 26 - 90, i, t0: 81.5 + ((i * 11) % 26) / 26 * .75 }));
function sAll(t) {
  const cx = 540, cy = 900, r = 270, A = 380;
  let ppl = '', puffs = '';
  ALL.forEach(p => {
    const ap = back(prog(t, p.t0, p.t0 + .2)); if (ap <= 0) return;
    const ar = p.a * Math.PI / 180;
    ppl += tiny(cx + r * Math.cos(ar), cy + r * Math.sin(ar), .5 * ap, p.a + 90, { col: PCOL[p.i % 6], mouth: t > 82.7 ? 'o' : 's' });
    if (t > 82.7 && p.i % 2 === 0) {
      const d = t - 82.7 - (p.i % 4) * .05; if (d > 0) {
        const g = eout(cl(d / .5)), rr = lerp(r + 40, A - 35, g), aa = ar + d * .9;
        puffs += puff(cx + rr * Math.cos(aa), cy + rr * Math.sin(aa), .14 + .1 * g, { t, k: p.i, noGlow: true });
      }
    }
  });
  const shrug = t > 83.48 ? 3 * Math.sin(prog(t, 83.48, 84.1) * Math.PI * 2) : 0;
  const np = back(prog(t, 81.52, 81.8));
  return `${space(61, 90)}
    <circle cx="${cx}" cy="${cy}" r="${A}" fill="${G.atm}" opacity=".12"/><circle cx="${cx}" cy="${cy}" r="${A}" fill="none" stroke="#9fdcff" stroke-width="8" opacity=".55"/>
    <g transform="rotate(${shrug} ${cx} ${cy})">${globe(t, cx, cy, r, 's20g', { spin: 10, face: { lid: t > 82.9 ? .45 : 0, look: 0, mouth: t > 83.3 ? 'flat' : 'smile', brows: t > 83.3 ? 'calm' : 'none' } })}</g>
    ${puffs}${ppl}
    ${np > 0 ? `<g transform="translate(540 300) scale(${np})">${T(0, 40, 120, '8 Mrd.', C.warm)}</g>` : ''}`;
}

// ---------------------------------------------------------------- S21 84.3–86.34  Earth stays in its orbit
function sBahn(t) {
  const sx = 540, sy = 880, R = 380;
  const a = -Math.PI * .75 + .55 * (t - 84.3);
  const ex = sx + R * Math.cos(a), ey = sy + R * Math.sin(a);
  const a0 = -Math.PI * .75 + .55 * .35;
  const ox = sx + R * Math.cos(a0), oy = sy + R * Math.sin(a0);
  const tdir = [Math.cos(a0 - .35), Math.sin(a0 - .35)];
  const dp = eio(prog(t, 84.35, 84.66));
  const xp = back(prog(t, 84.66, 84.9));
  const mx = ox + tdir[0] * 260, my = oy + tdir[1] * 260;
  return `${space(71, 90)}
    <circle cx="${sx}" cy="${sy}" r="${R}" fill="none" stroke="#7d8fc5" stroke-width="7" stroke-dasharray="24 16"/>
    ${dp > 0 ? `<line x1="${ox}" y1="${oy}" x2="${ox + tdir[0] * 520 * dp}" y2="${oy + tdir[1] * 520 * dp}" stroke="${G.chalk}" stroke-width="7" stroke-dasharray="22 16" opacity=".8"/>` : ''}
    ${xp > 0 ? `<g transform="translate(${mx} ${my}) scale(${xp})"><path d="M -60 -60 L 60 60 M 60 -60 L -60 60" stroke="${C.ol}" stroke-width="40" stroke-linecap="round"/><path d="M -60 -60 L 60 60 M 60 -60 L -60 60" stroke="${C.red}" stroke-width="24" stroke-linecap="round"/></g>` : ''}
    ${sunF(t, sx, sy, 130, { face: { eyes: 'happy', mouth: 'smile' } })}
    <circle cx="${ex}" cy="${ey}" r="118" fill="${G.gas}" opacity=".25"/>
    ${globe(t, ex, ey, 88, 's21g', { spin: 30, face: { eyes: 'happy', mouth: 'smile' } })}`;
}

// ---------------------------------------------------------------- S22 86.34–90.108  bad day for the air
function sAir(t) {
  const haze = prog(t, 86.5, 87.8);
  const green = eio(prog(t, 87.2, 88.2));
  const sick = t > 88.06;
  const sag = eio(prog(t, 88.52, 89.0));
  const off = t > 89.55;
  const mix = (a, b, p) => { const h = s => [1, 3, 5].map(i => parseInt(s.slice(i, i + 2), 16)); const A = h(a), B = h(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], p)).toString(16).padStart(2, '0')).join(''); };
  const col = mix(G.air, '#b7e88f', green), sh = mix(G.airSh, G.gasSh, green);
  let rising = '';
  for (let i = 0; i < 9; i++) {
    const te = 86.4 + i * .18; if (t < te) continue;
    const d = t - te, x = 120 + i * 105 + 30 * Math.sin(d * 2 + i), y = 1260 - d * 330;
    if (y < 420) continue;
    rising += puff(x, y, .22 + .1 * cl(d), { t, k: i, noGlow: true, alpha: cl(1.5 - d * .5) });
  }
  const wob = sick ? 6 * Math.sin(t * 7) : 0;
  const ay = 700 + 120 * sag;
  return `<rect x="0" y="0" width="1080" height="1920" fill="#10204a"/>
    <rect x="0" y="0" width="1080" height="1300" fill="${mix('#2a4a8a', '#3f6a3a', green)}" opacity=".5"/>
    ${globe(t, 540, 2150, 900, 's22g', { spin: 8, noGlow: true, noIce: true })}
    ${rising}
    ${puff(540, ay, 2.6, { t, col, hi: '#ffffff', sh, rot: wob - 8 * sag, sx: 1 + .1 * sag, sy: 1 - .15 * sag,
      face: { eyes: sick ? (t > 88.52 ? 'x' : 'swirl') : (haze > .3 ? 'n' : 'happy'), mouth: sick ? 'sick' : (haze > .3 ? 'puff' : 'smile'), brows: sick ? 'sad' : (haze > .3 ? 'up' : 'none'), blush: haze > .3 ? '#9fd96a' : '#ff9fb3', eyeS: 1.1, t } })}
    ${sick ? [0, 1, 2].map(i => { const a = t * 4 + i * 2.1; return `<path transform="translate(${540 + 220 * Math.cos(a)} ${ay - 220 + 40 * Math.sin(a)}) scale(.8)" d="M 0 -20 L 6 -6 L 20 0 L 6 6 L 0 20 L -6 6 L -20 0 L -6 -6 Z" fill="${G.gas}" stroke="${C.ol}" stroke-width="3"/>`; }).join('') : ''}
    ${off ? `<rect x="0" y="0" width="1080" height="1920" fill="#000" opacity="${t > 89.62 ? .97 : .7}"/>` : ''}`;
}

const SCENES = [
  [0, 4.98, sIntro], [4.98, 8.34, sOrbit], [8.34, 10.12, sAbsurd], [10.12, 17.1, sRocket], [17.1, 23.66, sBoard],
  [23.66, 26.5, sMerge], [26.5, 28.0, sPool], [28.0, 30.96, sPools], [30.96, 32.48, sWow], [32.48, 35.8, sPush],
  [35.8, 40.3, sGauge], [40.3, 47.26, sAtom], [47.26, 54.08, sTime], [54.08, 56.82, sCm], [56.82, 59.12, sHook],
  [59.12, 63.66, sAssume], [63.66, 68.02, sAtmo], [68.02, 71.56, sCancel], [71.56, 81.2, carScene], [81.2, 84.3, sAll],
  [84.3, 86.34, sBahn], [86.34, 999, sAir],
];
function scene(t) {
  let f = SCENES[SCENES.length - 1][2];
  for (const [a, b, fn] of SCENES) if (t >= a && t < b) { f = fn; break; }
  return f(t);
}

export const __scene = scene;
export function renderSvg(t) {
  let body = '';
  try { body = scene(t); } catch (e) { body = `<rect width="1080" height="1920" fill="#1a0b12"/>`; }
  return DEFS + body + dust(t) + `<rect x="0" y="0" width="1080" height="1920" fill="url(#gVig)"/>`;
}
export function subtitleAt(t) { return ''; }
