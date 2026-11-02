// v99 motif: every worry is a dark grey cloud with its German thought in white letters.
// cloud(x, y, w, o): centre (x,y), width w. o: t (bob), seed, dark 0..1 (grey → near black), lines [..], size,
//   p appear 0..1 (scale in with overshoot), gone 0..1 (puffs drift apart, lighten and fade), rain 0..1, q (big "?"), a opacity.
import { K, f1, op, cl, lerp, T, hash } from './lib.js';
const INK = K.ink;
const hex = c => [1, 3, 5].map(i => parseInt(c.slice(i, i + 2), 16));
export const mix = (a, b, p) => { const A = hex(a), B = hex(b); return '#' + A.map((v, i) => Math.round(lerp(v, B[i], cl(p))).toString(16).padStart(2, '0')).join(''); };
const PUFFS = [[-.30, .02, .21], [-.12, -.13, .26], [.12, -.16, .25], [.31, -.03, .21], [0, .06, .24], [-.40, .12, .13], [.41, .12, .13]];
export function cloud(x, y, w, o = {}) {
  const p = o.p === undefined ? 1 : o.p; if (p <= 0) return '';
  const g = cl(o.gone || 0); if (g >= 1) return '';
  const t = o.t || 0, seed = o.seed || 0, d = cl(o.dark === undefined ? .7 : o.dark);
  const fill = mix(mix('#9aa1ad', '#3a3d46', d), '#f4f8ff', g * .8), shade = mix(fill, '#000000', .22), hi = mix(fill, '#ffffff', .22);
  const bob = Math.sin(t * 1.4 + seed) * 8;
  const sc = Math.max(.01, p);
  let back = '', front = '', top = '';
  PUFFS.forEach(([px, py, pr], i) => {
    const ang = hash(seed * 7 + i) * Math.PI * 2, dist = g * w * (.25 + hash(seed + i * 3) * .3);
    const cx = px * w + Math.cos(ang) * dist + (px >= 0 ? 1 : -1) * g * w * .1, cy = py * w + Math.sin(ang) * dist - g * w * .08, r = pr * w * (1 + g * .35);
    back += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r + 7)}" fill="${INK}" opacity="${op(1 - g)}"/>`;
    front += `<circle cx="${f1(cx)}" cy="${f1(cy)}" r="${f1(r)}" fill="${fill}" opacity="${op(1 - g * .9)}"/>`;
    top += `<ellipse cx="${f1(cx - r * .25)}" cy="${f1(cy - r * .45)}" rx="${f1(r * .45)}" ry="${f1(r * .2)}" fill="${hi}" opacity="${op(.55 * (1 - g))}"/>`;
  });
  if (g < .3) {
    const bw = w * .86, a = 1 - g / .3;
    back += `<rect x="${f1(-bw / 2 - 7)}" y="${f1(-.02 * w - 7)}" width="${f1(bw + 14)}" height="${f1(.2 * w + 14)}" rx="${f1(.1 * w + 7)}" fill="${INK}" opacity="${op(a)}"/>`;
    front += `<rect x="${f1(-bw / 2)}" y="${f1(-.02 * w)}" width="${f1(bw)}" height="${f1(.2 * w)}" rx="${f1(.1 * w)}" fill="${fill}" opacity="${op(a)}"/><path d="M ${f1(-bw / 2 + .08 * w)} ${f1(.16 * w)} H ${f1(bw / 2 - .08 * w)}" stroke="${shade}" stroke-width="${f1(.025 * w)}" stroke-linecap="round" opacity="${op(a)}"/>`;
  }
  let rain = '';
  const rn = cl(o.rain || 0);
  if (rn > 0) for (let i = 0; i < 9; i++) {
    const rx = (-.36 + i * .09) * w, ph = (t * 1.6 + hash(i + seed) ) % 1, ry = .2 * w + ph * w * .55;
    rain += `<path d="M ${f1(rx)} ${f1(ry)} l -8 ${f1(w * .07)}" stroke="#7fb0e8" stroke-width="${f1(Math.max(5, w * .016))}" stroke-linecap="round" opacity="${op(rn * (1 - ph) * (1 - g))}"/>`;
  }
  let txt = '';
  const L = o.lines || [], size = o.size || Math.round(w * .085), ta = cl(1 - g * 3);
  if (L.length && ta > 0) {
    const lh = size * 1.18, y0 = .02 * w - (L.length - 1) * lh / 2 + size * .3;
    L.forEach((l, i) => { txt += T(0, y0 + i * lh, l, size, { fill: '#ffffff', stroke: INK, sw: Math.max(6, size * .16), w: 900, op: ta }); });
  }
  if (o.q && ta > 0) txt += T(o.qx || 0, (o.qy || 0) + w * .1, '?', w * .36, { fill: K.yellow, stroke: INK, sw: w * .03, op: ta });
  return `<g transform="translate(${f1(x)} ${f1(y + bob)}) scale(${f1(sc * 1000) / 1000})" opacity="${op(o.a === undefined ? cl(p * 2) : o.a)}">${rain}${back}${front}${top}${txt}</g>`;
}
// soft dark shadow the clouds cast on the scene (radialGradient pool, no blur)
export function gloom(x, y, rx, ry, a, id) {
  if (a <= 0) return '';
  return `<radialGradient id="v99gl${id}"><stop offset="0" stop-color="#0b0e18" stop-opacity=".9"/><stop offset=".6" stop-color="#0b0e18" stop-opacity=".45"/><stop offset="1" stop-color="#0b0e18" stop-opacity="0"/></radialGradient><ellipse cx="${f1(x)}" cy="${f1(y)}" rx="${f1(rx)}" ry="${f1(ry)}" fill="url(#v99gl${id})" opacity="${op(a)}"/>`;
}
