// v73 "Loveparade 2010" — archive-documentary kit for this video only (style: jobs/v73/style.md).
// Aged paper, brown ink, stamp red only for the date and danger. Crowd = simple anonymous figures (no real faces, no injuries shown).
// "Du" = the one figure in an olive jacket; everyone else in muted paper tones.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  paper: '#EADBC0', paperD: '#D9C6A3', paperL: '#F4EAD6', ink: '#3B2F2A', inkL: '#5A4A40', red: '#B23A2E', redL: '#D2584A',
  olive: '#6B7B4B', oliveD: '#4B5A35', brown: '#8A6E52', brownD: '#6A523C', skin: '#E2B48C', skinD: '#C49470',
  c1: '#B9A687', c2: '#A08A6C', c3: '#C8B898', c4: '#8F7C64', c5: '#B49C7A', concrete: '#BDB3A0', concreteD: '#9E9483', grass: '#8C9A68',
  bloom: '#F1D6DA', bloomD: '#D9A9B2', bark: '#5A4636', sky: '#E6E4D2',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 5, c = K.ink) => `stroke="${c}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const BG = (c = K.paper) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${c}"/>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const DEFS = `<defs>
<radialGradient id="lSpot" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFF1C9" stop-opacity=".7"/><stop offset="1" stop-color="#FFF1C9" stop-opacity="0"/></radialGradient>
<linearGradient id="lSky" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#E9E3CF"/><stop offset="1" stop-color="#D9CDB2"/></linearGradient>
</defs>`;
// paper card label: ink text on light paper with ink border (same style everywhere)
export const card = (x, y, txt, a = 1, sz = 56, col = K.ink, bg = K.paperL) => a <= .01 ? '' : `<g opacity="${f1(cl(a))}"><rect x="${f1(x - (txt.length * sz * .33 + 28))}" y="${f1(y - sz * .85)}" width="${f1(txt.length * sz * .66 + 56)}" height="${f1(sz * 1.32)}" fill="${bg}" ${OL(4, col)}/>${TX(txt, x, y + sz * .12, sz, col)}</g>`;
export function stamp(x, y, txt, p, sz = 80, rot = -8) {
  if (p <= 0) return '';
  const s = lerp(1.6, 1, eout(cl(p * 3)));
  const w = txt.length * sz * .64 + 50;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${rot}) scale(${f1(s)})" opacity="${f1(cl(p * 3))}"><rect x="${f1(-w / 2)}" y="${f1(-sz * .8)}" width="${f1(w)}" height="${f1(sz * 1.25)}" rx="10" fill="none" stroke="${K.red}" stroke-width="9"/>${TX(txt, 0, sz * .3, sz, K.red)}</g>`;
}
export const crossOut = (x0, y0, x1, y1, p) => p <= 0 ? '' : `<path d="M ${f1(x0)} ${f1(y0)} L ${f1(lerp(x0, x1, cl(p)))} ${f1(lerp(y0, y1, cl(p)))}" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/>`;
// paper grain
export function grain(seed = 1) { let s = ''; for (let i = 0; i < 40; i++) s += `<circle cx="${f1(hash(i * 3.3 + seed) * 1080)}" cy="${f1(hash(i * 7.1 + seed) * 1920)}" r="${f1(1 + 2 * hash(i))}" fill="${K.brown}" opacity=".18"/>`; return s; }

// --- side-view person (anonymous). (x, y) = between the feet on the ground; s scale (≈ 360·s tall).
// o.col shirt, o.you (olive jacket + face), o.lean deg (+ forward to the right), o.aL/aR arm angles deg from down (+ forward), o.stepL/stepR foot offsets [dx, dy], o.face 1 shows simple face, o.dir 1 faces right, -1 left
export function person(x, y, s, o = {}) {
  const col = o.you ? K.olive : (o.col || K.c1), dir = o.dir || 1;
  const lean = (o.lean || 0) * dir;
  const sL = o.stepL || [0, 0], sR = o.stepR || [0, 0];
  const hip = [0, -170], sh = [0, -300];
  const leg = (dx, f) => `<path d="M ${dx * 14} ${hip[1]} L ${f1(dx * 22 + f[0])} ${f1(f[1])}" stroke="${K.ink}" stroke-width="30" stroke-linecap="round"/><path d="M ${dx * 14} ${hip[1]} L ${f1(dx * 22 + f[0])} ${f1(f[1])}" stroke="${o.you ? K.oliveD : K.brownD}" stroke-width="20" stroke-linecap="round"/>`;
  const armP = (ang, side) => { const a = (ang ?? 10) * Math.PI / 180; const ex = Math.sin(a) * 120 * dir, ey = Math.cos(a) * 120; return `<path d="M ${side * 6} ${sh[1] + 16} L ${f1(ex)} ${f1(sh[1] + 16 + ey)}" stroke="${K.ink}" stroke-width="28" stroke-linecap="round"/><path d="M ${side * 6} ${sh[1] + 16} L ${f1(ex)} ${f1(sh[1] + 16 + ey)}" stroke="${col}" stroke-width="18" stroke-linecap="round"/><circle cx="${f1(ex)}" cy="${f1(sh[1] + 16 + ey)}" r="11" fill="${K.skin}" ${OL(3)}/>`; };
  const face = o.face ? `<circle cx="${f1(14 * dir)}" cy="-350" r="4.5" fill="${K.ink}"/><path d="M ${f1(10 * dir)} -326 h ${f1(14 * dir)}" stroke="${K.ink}" stroke-width="3.5"/>${o.brow ? `<path d="M ${f1(4 * dir)} -366 l ${f1(18 * dir)} 6" stroke="${K.ink}" stroke-width="3.5"/>` : ''}` : '';
  const hair = o.you ? `<path d="M -38 -352 Q -36 -398 2 -398 Q 36 -396 38 -360 Q 10 -380 -38 -352 Z" fill="${K.brownD}" ${OL(3)}/>` : `<path d="M -38 -350 Q -36 -398 0 -398 Q 36 -398 38 -350 Q 0 -372 -38 -350 Z" fill="${o.hair || K.brownD}" ${OL(3)}/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><g transform="rotate(${f1(lean)} 0 -170)">
    ${leg(-1, sL)}${leg(1, sR)}${armP(o.aB, -1)}
    <path d="M -40 -310 Q -46 -240 -38 -160 L 38 -160 Q 46 -240 40 -310 Q 0 -330 -40 -310 Z" fill="${col}" ${OL(4)}/>
    <circle cx="0" cy="-350" r="40" fill="${K.skin}" ${OL(4)}/>${hair}${face}${armP(o.aF, 1)}</g></g>`;
}
// top-view head + shoulders (crowd from above). o.you olive
export const headTop = (x, y, s = 1, o = {}) => `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s)})"><ellipse cx="0" cy="0" rx="36" ry="22" fill="${o.you ? K.olive : (o.col || K.c1)}" ${OL(3)}/><circle cx="0" cy="0" r="17" fill="${o.hair || K.brownD}" ${OL(3)}/></g>`;
// a packed crowd in side view: rows of people from back (small, high) to front
export function crowdRow(t, y, s, n, x0, dx, seed, o = {}) {
  let r = '';
  const cols = [K.c1, K.c2, K.c3, K.c4, K.c5];
  for (let i = 0; i < n; i++) { const sway = (o.sway || 0) * Math.sin(t * 2 + i * .9);
    r += person(x0 + i * dx + 10 * (hash(i + seed) - .5) + sway, y + 8 * hash(i * 3 + seed), s * (0.95 + .1 * hash(i * 5 + seed)), { col: cols[Math.floor(hash(i * 7 + seed) * 5)], hair: hash(i * 9 + seed) > .5 ? K.brownD : K.ink, lean: o.lean ? o.lean(i) : 0, dir: o.dir || 1, aF: 15, aB: -5 }); }
  return r;
}
// schematic of the access: two tunnels from the sides join under the railway; one ramp leads up to the grounds.
// p.tun / p.ramp / p.ground 0..1 draw-in progress
export function siteMap(t, p = {}) {
  const tun = p.tun ?? 1, ramp = p.ramp ?? 1, gr = p.ground ?? 1;
  const dash = (v) => `pathLength="1" stroke-dasharray="${f1(cl(v))} 1"`;
  return `${BG(K.paper)}${grain(3)}
    <rect x="80" y="${f1(1040)}" width="920" height="70" fill="${K.concreteD}" ${OL(4)}/>${[...Array(12)].map((_, i) => `<path d="M ${110 + i * 76} 1040 v 70" stroke="${K.ink}" stroke-width="3" opacity=".5"/>`).join('')}
    ${TX('BAHNDAMM', 540, 1090, 30, K.ink, 'middle', 'opacity=".6"')}
    <path d="M -40 1180 L 470 1180 M -40 1300 L 470 1300" fill="none" ${OL(8)} ${dash(tun)}/><path d="M 1120 1180 L 610 1180 M 1120 1300 L 610 1300" fill="none" ${OL(8)} ${dash(tun)}/>
    <rect x="-40" y="1180" width="${f1(510 * cl(tun))}" height="120" fill="${K.concrete}" opacity=".7"/><rect x="${f1(1120 - 510 * cl(tun))}" y="1180" width="${f1(510 * cl(tun))}" height="120" fill="${K.concrete}" opacity=".7"/>
    ${tun > .9 ? `<rect x="470" y="1180" width="140" height="120" fill="${K.concrete}" opacity=".7"/>` : ''}
    <path d="M 470 1180 L 450 700 M 610 1180 L 630 700" fill="none" ${OL(8)} ${dash(ramp)}/>
    <path d="M 470 1180 L ${f1(lerp(470, 450, ramp))} ${f1(lerp(1180, 700, ramp))} L ${f1(lerp(610, 630, ramp))} ${f1(lerp(1180, 700, ramp))} L 610 1180 Z" fill="${K.concrete}" opacity=".8"/>
    <g opacity="${f1(gr)}"><rect x="140" y="300" width="800" height="400" rx="20" fill="${K.grass}" opacity=".55" ${OL(5)}/>${TX('GELÄNDE', 540, 420, 52, K.ink)}</g>
    ${tun > .5 ? `${TX('TUNNEL', 200, 1370, 40, K.ink, 'middle', `opacity="${f1(tun)}"`)}${TX('TUNNEL', 880, 1370, 40, K.ink, 'middle', `opacity="${f1(tun)}"`)}` : ''}
    ${ramp > .5 ? TX('RAMPE', 720, 960, 40, K.ink, 'start', `opacity="${f1(ramp)}"`) : ''}`;
}
// flow dot positions along a path: route 0 = left tunnel → ramp → grounds, 1 = right tunnel → ramp → grounds. u 0..1
export function routePt(route, u) {
  const P = route === 0 ? [[-40, 1240], [540, 1240], [540, 700], [540, 520]] : [[1120, 1240], [540, 1240], [540, 700], [540, 520]];
  const L = [], segs = []; let tot = 0;
  for (let i = 0; i < 3; i++) { const d = Math.hypot(P[i + 1][0] - P[i][0], P[i + 1][1] - P[i][1]); segs.push(d); tot += d; }
  let d = cl(u) * tot;
  for (let i = 0; i < 3; i++) { if (d <= segs[i]) { const k = d / segs[i]; return [lerp(P[i][0], P[i + 1][0], k), lerp(P[i][1], P[i + 1][1], k)]; } d -= segs[i]; }
  return P[3];
}
// magnolia tree; bloom 0..1, (x, y) = trunk base
export function magnolia(x, y, s, bloom = 1, seed = 0) {
  let b = '';
  for (let i = 0; i < 14; i++) { const a = hash(i * 3 + seed) * Math.PI * 2, r = 70 * Math.sqrt(hash(i * 5 + seed)); const bx = Math.cos(a) * r * 1.3, by = -190 + Math.sin(a) * r * .9;
    const k = cl(bloom * 1.6 - i / 14 * .6); if (k > 0) b += `<ellipse cx="${f1(bx)}" cy="${f1(by)}" rx="${f1(13 * k)}" ry="${f1(18 * k)}" fill="${K.bloom}" stroke="${K.bloomD}" stroke-width="3" transform="rotate(${f1(hash(i) * 60 - 30)} ${f1(bx)} ${f1(by)})"/>`; }
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><path d="M 0 0 L -4 -120 M -2 -110 L -50 -180 M -2 -100 L 46 -170 M -3 -130 L -6 -230" stroke="${K.ink}" stroke-width="18" stroke-linecap="round" fill="none"/><path d="M 0 0 L -4 -120 M -2 -110 L -50 -180 M -2 -100 L 46 -170 M -3 -130 L -6 -230" stroke="${K.bark}" stroke-width="10" stroke-linecap="round" fill="none"/>${b}</g>`;
}
