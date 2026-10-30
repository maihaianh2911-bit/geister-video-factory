// v72 "Was passiert, wenn du verschimmeltes Brot isst?" — kit for this video only (style: jobs/v72/style.md).
// Channel 2 look: friendly, clean, rounded; pastel kitchen, 4 px navy outline; teal for "ok", red only for warning, purple dots = toxins.
// Cast: du = curly black hair, mustard sweater. Second person (only in the "different reactions" shot): grey-blue cardigan, auburn bob.
import { cl, prog, eio, eout, ein, back, lerp, ring, hash } from '../../../engine/core.js';
export { cl, prog, eio, eout, ein, back, lerp, ring, hash };

export const K = {
  ink: '#16324F', teal: '#2EC4B6', tealD: '#1E9488', white: '#FFFFFF', pink: '#FF8FA3', pinkD: '#E0677F', skin: '#F1C6A5', skinD: '#D9A27E', room: '#EAF6F4', room2: '#D6ECE8',
  red: '#E5484D', amber: '#F2B13B', toxin: '#8A5CC2', toxinL: '#B794E0', mold: '#5E9A4A', moldD: '#3F7234', moldL: '#9CC77E', hypha: '#4F7F3E',
  crust: '#B8743A', crustD: '#8E5426', crumb: '#F3DDB0', crumbD: '#E2C48C', wood: '#C99A6B', woodD: '#A57A50', steel: '#C9D3D8', steelD: '#8E9AA2',
  du: '#E0A030', duD: '#B87E1C', hairDu: '#1E1A1A', other: '#6F86A6', otherD: '#526A88', hairO: '#9A4A2A', rind: '#FBF8EE', cheese: '#F6E3A6',
};
export const f1 = v => (+v).toFixed(1);
export const OL = (w = 4) => `stroke="${K.ink}" stroke-width="${w}" stroke-linejoin="round" stroke-linecap="round"`;
export const TX = (s, x, y, sz, f, a = 'middle', ex = '') => `<text x="${f1(x)}" y="${f1(y)}" text-anchor="${a}" fill="${f}" ${ex} style="font-family:'Inter';font-weight:900;font-size:${sz}px">${s}</text>`;
export const cam = (inner, s = 1, cx = 540, cy = 900, dx = 0, dy = 0) => `<g transform="translate(${f1(cx + dx)} ${f1(cy + dy)}) scale(${(s).toFixed(4)}) translate(${-cx} ${-cy})">${inner}</g>`;
export const BG = (f = K.room) => `<rect x="-60" y="-60" width="1200" height="2040" fill="${f}"/>`;
export const DEFS = `<defs><radialGradient id="kSoft" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FFFFFF" stop-opacity=".8"/><stop offset="1" stop-color="#FFFFFF" stop-opacity="0"/></radialGradient>
<radialGradient id="kHeat" cx=".5" cy=".5" r=".5"><stop offset="0" stop-color="#FF7A3C" stop-opacity=".7"/><stop offset="1" stop-color="#FF7A3C" stop-opacity="0"/></radialGradient></defs>`;
// kitchen backdrop: wall, tiles, counter top at y
export const kitchen = (y = 1250) => `${BG()}${[...Array(9)].map((_, i) => `<path d="M ${i * 140 - 40} 0 V ${y}" stroke="${K.room2}" stroke-width="6"/>`).join('')}${[...Array(9)].map((_, i) => `<path d="M -60 ${i * 140} H 1140" stroke="${K.room2}" stroke-width="6"/>`).join('')}
  <rect x="-60" y="${y}" width="1200" height="${2000 - y}" fill="${K.wood}" ${OL()}/><path d="M -60 ${y + 40} H 1140" stroke="${K.woodD}" stroke-width="6"/>`;
// rounded label card (navy text on white), optional colour
export const label = (x, y, txt, a = 1, col = K.ink, sz = 58, bg = K.white) => a <= .01 ? '' : `<g opacity="${f1(cl(a))}" transform="translate(${f1(x)} ${f1(y)}) scale(${f1(.85 + .15 * cl(a))})"><rect x="${f1(-(txt.length * sz * .33 + 34))}" y="${f1(-sz * .9)}" width="${f1(txt.length * sz * .66 + 68)}" height="${f1(sz * 1.4)}" rx="${f1(sz * .5)}" fill="${bg}" ${OL()}/>${TX(txt, 0, sz * .12, sz, col)}</g>`;
export const crossOut = (x, y, r, p) => p <= 0 ? '' : `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r)}" fill="none" stroke="${K.red}" stroke-width="16" opacity="${f1(cl(p * 2))}"/><path d="M ${f1(x - r * .7)} ${f1(y - r * .7)} L ${f1(x - r * .7 + r * 1.4 * cl(p))} ${f1(y - r * .7 + r * 1.4 * cl(p))}" stroke="${K.red}" stroke-width="16" stroke-linecap="round"/>`;
export const tick = (x, y, s, p, col = K.teal) => p <= 0 ? '' : `<path d="M ${f1(x - 40 * s)} ${f1(y)} L ${f1(x - 10 * s)} ${f1(y + 30 * s)} L ${f1(x + 46 * s)} ${f1(y - 36 * s)}" fill="none" stroke="${col}" stroke-width="${f1(18 * s)}" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="${f1(160 * s)}" stroke-dashoffset="${f1(160 * s * (1 - cl(p)))}"/>`;
// toxin dots scattered inside a box (deterministic), a = visibility
export function toxins(x, y, w, h, n, a = 1, seed = 1, t = 0) {
  if (a <= 0) return '';
  let s = '';
  for (let i = 0; i < n; i++) { const px = x + hash(i * 3.1 + seed) * w, py = y + hash(i * 7.7 + seed) * h, r = 9 + 5 * Math.sin(t * 4 + i); s += `<circle cx="${f1(px)}" cy="${f1(py)}" r="${f1(r)}" fill="${K.toxin}" stroke="${K.ink}" stroke-width="3" opacity="${f1(cl(a * 1.4 - hash(i) * .4))}"/>`; }
  return s;
}

// ---- bread: slice (front face) centred at (x, y), scale s. o.bite (0..1 eaten from the top right), o.spot (mold spot size 0..1, at local (sx, sy)), o.toast (0..1 browning), o.id clip id
export function slice(x, y, s, o = {}) {
  const id = o.id || 'sl', sp = o.spot || 0, [mx, my] = o.at || [70, -60], tb = cl(o.toast || 0);
  const shape = `M -150 140 L -150 -60 Q -190 -150 -110 -190 Q 0 -240 110 -190 Q 190 -150 150 -60 L 150 140 Q 0 160 -150 140 Z`;
  const crumb = tb > 0 ? `rgb(${Math.round(243 - 60 * tb)},${Math.round(221 - 90 * tb)},${Math.round(176 - 110 * tb)})` : K.crumb;
  const bite = o.bite ? `<circle cx="${f1(160 - 60 * o.bite)}" cy="${f1(-200 + 40 * o.bite)}" r="${f1(150 * o.bite)}" fill="#000"/>` : '';
  const holes = [[-70, -40], [-20, 60], [40, -110], [80, 40], [-100, 90], [10, -10]].map(([hx, hy], i) => `<ellipse cx="${hx}" cy="${hy}" rx="${10 + i % 3 * 4}" ry="8" fill="${K.crumbD}" opacity=".8"/>`).join('');
  const spot = sp > 0 ? `<g transform="translate(${mx} ${my})"><path d="M ${f1(-46 * sp)} 0 Q ${f1(-40 * sp)} ${f1(-44 * sp)} 0 ${f1(-40 * sp)} Q ${f1(50 * sp)} ${f1(-36 * sp)} ${f1(44 * sp)} ${f1(4 * sp)} Q ${f1(40 * sp)} ${f1(46 * sp)} ${f1(-6 * sp)} ${f1(40 * sp)} Q ${f1(-50 * sp)} ${f1(40 * sp)} ${f1(-46 * sp)} 0 Z" fill="${K.mold}" ${OL(3)}/>
    ${[[-14, -10], [12, 8], [20, -16], [-18, 16]].map(([a, b]) => `<circle cx="${f1(a * sp)}" cy="${f1(b * sp)}" r="${f1(8 * sp)}" fill="${K.moldL}"/>`).join('')}</g>` : '';
  return `<defs><clipPath id="${id}"><path d="${shape}"/></clipPath><mask id="${id}m"><rect x="-300" y="-300" width="600" height="600" fill="#fff"/>${bite}</mask></defs>
    <g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s)})" mask="url(#${id}m)"><path d="${shape}" fill="${tb > .5 ? '#8E5426' : K.crust}" ${OL()}/>
    <g transform="scale(.9)"><path d="${shape}" fill="${crumb}"/></g><g clip-path="url(#${id})" transform="scale(.9)">${holes}${spot}${o.inner || ''}</g></g>`;
}
// hyphae: branching threads from (x, y) growing down/sideways, g 0..1, spread px
export function hyphae(x, y, g, spread = 160, depth = 300, seed = 1, col = K.hypha) {
  if (g <= 0) return '';
  let d = '';
  for (let i = 0; i < 14; i++) {
    const ang = Math.PI / 2 + (hash(i * 2.3 + seed) - .5) * 2.2, L = depth * (.5 + hash(i * 5.1 + seed) * .6) * g;
    const ex = x + Math.cos(ang) * L * (spread / depth) * 1.6, ey = y + Math.sin(ang) * L, mx = lerp(x, ex, .5) + (hash(i + seed) - .5) * 40, my = lerp(y, ey, .5);
    d += `M ${f1(x + (hash(i * 9) - .5) * 30)} ${f1(y)} Q ${f1(mx)} ${f1(my)} ${f1(ex)} ${f1(ey)} `;
    if (g > .4) d += `M ${f1(mx)} ${f1(my)} l ${f1((hash(i * 4) - .5) * 70 * g)} ${f1(50 * g)} `;
  }
  return `<path d="${d}" fill="none" stroke="${col}" stroke-width="4" stroke-linecap="round" opacity=".9"/>`;
}

// ---- people (bust, origin = shoulder-line centre). o.look, o.lookY, o.brow, o.mouth, o.closed, o.wide, o.sick (greenish), o.tilt
const face = o => {
  const lk = (o.look || 0) * 8, ly = (o.lookY || 0) * 6, b = o.brow ?? 0;
  const eyes = o.closed ? `<path d="M ${-26 + lk} 0 q 10 7 20 0 M ${6 + lk} 0 q 10 7 20 0" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>` : `<circle cx="${-16 + lk}" cy="${ly}" r="${o.wide ? 8 : 6}" fill="${K.ink}"/><circle cx="${16 + lk}" cy="${ly}" r="${o.wide ? 8 : 6}" fill="${K.ink}"/>`;
  const brows = `<path d="M ${-28 + lk} ${-20 - 5 * b} l 20 ${f1(b > .5 ? -7 : 2)} M ${28 + lk} ${-20 - 5 * b} l -20 ${f1(b > .5 ? -7 : 2)}" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  const m = o.mouth === 'o' ? `<ellipse cx="${lk}" cy="28" rx="9" ry="12" fill="${K.ink}"/>` : o.mouth === 'chew' ? `<ellipse cx="${lk}" cy="28" rx="13" ry="${f1(3 + 5 * Math.abs(Math.sin((o.t || 0) * 9)))}" fill="${K.ink}"/>` : o.mouth === 'wavy' ? `<path d="M ${lk - 16} 30 q 8 -8 16 0 q 8 8 16 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : o.mouth === 'smile' ? `<path d="M ${lk - 14} 24 q 14 12 28 0" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>` : o.mouth === 'down' ? `<path d="M ${lk - 12} 32 q 12 -9 24 0" fill="none" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>` : o.mouth === 'gasp' ? `<ellipse cx="${lk}" cy="30" rx="12" ry="${f1(8 + 6 * Math.abs(Math.sin((o.t || 0) * 7)))}" fill="${K.ink}"/>` : `<path d="M ${lk - 11} 28 h 22" stroke="${K.ink}" stroke-width="4.5" stroke-linecap="round"/>`;
  const sick = o.sick ? `<ellipse cx="0" cy="18" rx="44" ry="30" fill="${K.moldL}" opacity="${f1(.45 * o.sick)}"/>` : '';
  return sick + eyes + brows + m;
};
export function headOf(who, x, y, s, o = {}) {
  const hair = who === 'du' ? [[-40, -50], [-14, -64], [14, -64], [40, -50], [54, -24], [-54, -24]].map(([a, b]) => `<circle cx="${a}" cy="${b}" r="26" fill="${K.hairDu}" ${OL(3)}/>`).join('')
    : `<path d="M -62 40 Q -70 -70 0 -72 Q 70 -70 62 40 L 48 40 Q 54 -20 30 -40 Q -10 -30 -48 -10 L -50 40 Z" fill="${K.hairO}" ${OL(4)}/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.tilt || 0)}) scale(${f1(s)})"><ellipse cx="0" cy="0" rx="56" ry="62" fill="${K.skin}" ${OL(4)}/>${face(o)}${hair}</g>`;
}
export function arm(sh, el, hd, s, col, o = {}) {
  const d = `M ${f1(sh[0])} ${f1(sh[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(hd[0])} ${f1(hd[1])}`;
  return `<path d="${d}" fill="none" stroke="${K.ink}" stroke-width="${f1(46 * s + 8)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f1(46 * s)}" stroke-linecap="round" stroke-linejoin="round"/>
    <circle cx="${f1(hd[0])}" cy="${f1(hd[1])}" r="${f1(24 * s)}" fill="${K.skin}" ${OL(4)}/>${o.held || ''}`;
}
// o.aL/o.aR = [[elbow],[hand]] or null; o.front: svg drawn between torso and arms (e.g. stomach window); o.heldL/o.heldR svg drawn after that hand
export function bust(who, x, y, s, o = {}) {
  const col = who === 'du' ? K.du : K.other, colD = who === 'du' ? K.duD : K.otherD;
  const w = 100 * s, h = 420 * s;
  const torso = `<path d="M ${f1(x - w)} ${f1(y + 20 * s)} Q ${f1(x - w - 14 * s)} ${f1(y + h * .6)} ${f1(x - w + 6 * s)} ${f1(y + h)} L ${f1(x + w - 6 * s)} ${f1(y + h)} Q ${f1(x + w + 14 * s)} ${f1(y + h * .6)} ${f1(x + w)} ${f1(y + 20 * s)} Q ${f1(x)} ${f1(y - 16 * s)} ${f1(x - w)} ${f1(y + 20 * s)} Z" fill="${col}" ${OL()}/>
    <path d="M ${f1(x - 40 * s)} ${f1(y + 4 * s)} Q ${f1(x)} ${f1(y + 40 * s)} ${f1(x + 40 * s)} ${f1(y + 4 * s)}" fill="none" stroke="${colD}" stroke-width="${f1(10 * s)}"/>`;
  const one = (pts, side, held) => { const sh = [x + side * (w - 16 * s), y + 34 * s]; const p = pts || [[sh[0] + side * 18 * s, sh[1] + 160 * s], [sh[0] + side * 12 * s, sh[1] + 310 * s]]; return arm(sh, p[0], p[1], s, col, { held }); };
  return `${torso}${o.front || ''}${headOf(who, x + (o.hx || 0) * s, y - 92 * s + (o.hy || 0) * s, s, o)}${o.noL ? '' : one(o.aL, -1, o.heldL)}${o.noR ? '' : one(o.aR, 1, o.heldR)}`;
}
// stomach (seen through a "window" in the torso): rounded bean with a mild face, centred (x, y)
export function stomach(x, y, s, o = {}) {
  const m = o.mood || 'calm';
  const mouth = m === 'ill' ? `<path d="M -16 30 q 8 -8 16 0 q 8 8 16 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : m === 'happy' ? `<path d="M -14 24 q 14 12 28 0" fill="none" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>` : `<path d="M -10 28 h 20" stroke="${K.ink}" stroke-width="4" stroke-linecap="round"/>`;
  return `<g transform="translate(${f1(x)} ${f1(y)}) rotate(${f1(o.rot || 0)}) scale(${f1(s)})"><path d="M -40 -110 Q -20 -150 10 -120 Q 30 -90 60 -80 Q 140 -60 120 40 Q 100 130 0 120 Q -110 110 -90 20 Q -80 -40 -40 -60 Z" fill="${K.pink}" ${OL()}/>
    <circle cx="-14" cy="0" r="6" fill="${K.ink}"/><circle cx="20" cy="0" r="6" fill="${K.ink}"/>${mouth}${o.inner || ''}</g>`;
}
// body window: white rounded panel on the torso showing the stomach
export const bodyWindow = (x, y, s, inner) => `<rect x="${f1(x - 80 * s)}" y="${f1(y - 70 * s)}" width="${f1(160 * s)}" height="${f1(150 * s)}" rx="${f1(30 * s)}" fill="${K.white}" ${OL()}/>${inner}`;
