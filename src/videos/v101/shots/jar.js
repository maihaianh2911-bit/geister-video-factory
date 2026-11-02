// v101 motif: the glass jar of good moments. Every good thing becomes a warm golden light (radialGradient glow) that flies into the jar.
import { K, f1, op, cl, lerp, prog, eio, hash, pool, T } from './lib.js';
const INK = K.ink;
// one glowing light (x,y centre, r core radius, a 0..1)
export function orb(x, y, r, a = 1, t = 0) {
  if (a <= 0) return '';
  const pulse = 1 + Math.sin(t * 5 + x * .01) * .08;
  return pool(x, y, r * 3.4 * pulse, r * 3.4 * pulse, '#ffc94a', .55 * a) + `<circle cx="${f1(x)}" cy="${f1(y)}" r="${f1(r * pulse)}" fill="#fff4c2" opacity="${op(a)}"/><circle cx="${f1(x - r * .25)}" cy="${f1(y - r * .25)}" r="${f1(r * .4)}" fill="#ffffff" opacity="${op(a * .9)}"/>`;
}
// point on a soft arc from (x0,y0) to (x1,y1) at p 0..1
export function arc(x0, y0, x1, y1, p, lift = 220) {
  const e = eio(cl(p));
  return [lerp(x0, x1, e), lerp(y0, y1, e) - Math.sin(e * Math.PI) * lift];
}
// a light flying along an arc with a short trail
export function flyer(t, t0, dur, x0, y0, x1, y1, r = 16, lift = 220) {
  const p = prog(t, t0, t0 + dur); if (t < t0 || p >= 1) return '';
  let s = '';
  for (let k = 3; k >= 1; k--) { const [tx, ty] = arc(x0, y0, x1, y1, Math.max(0, p - k * .05), lift); s += `<circle cx="${f1(tx)}" cy="${f1(ty)}" r="${f1(r * (1 - k * .2))}" fill="#ffe08a" opacity="${op(.35 * (1 - k * .25))}"/>`; }
  const [x, y] = arc(x0, y0, x1, y1, p, lift);
  return s + orb(x, y, r, cl(p * 5), t);
}
// glass jar standing on a surface at (x,y) = bottom centre; s=1 → 220×300. o: n lights inside, t, glow 0..1 extra, newest pop time list
export function jar(x, y, s, o = {}) {
  const t = o.t || 0, n = Math.max(0, Math.floor(o.n || 0)), glow = cl(o.glow === undefined ? Math.min(1, n / 18) : o.glow);
  let back = '', inner = '';
  if (glow > 0) back += pool(x, y - 150 * s, (260 + 420 * glow) * s, (260 + 420 * glow) * s, '#ffb84a', .25 + .45 * glow);
  // lights inside (local coords)
  for (let i = 0; i < n; i++) {
    const px = (hash(i * 7 + 1) - .5) * 150, py = -40 - hash(i * 13 + 5) * 190, bob = Math.sin(t * 1.8 + i) * 6;
    const r = 13 + hash(i * 3) * 7, a = o.pops && o.pops[i] !== undefined ? cl((t - o.pops[i]) * 4) : 1;
    inner += orb(px, py + bob, r, a, t);
  }
  const body = 'M -96 -250 C -112 -250 -112 -230 -112 -210 L -112 -30 C -112 -6 -96 0 -70 0 L 70 0 C 96 0 112 -6 112 -30 L 112 -210 C 112 -230 112 -250 96 -250 Z';
  let g = `<path d="${body}" fill="#cfe6f0" opacity=".28"/>`;
  g += `<g>${inner}</g>`;
  g += `<path d="${body}" fill="none" stroke="${INK}" stroke-width="7" stroke-linejoin="round"/>`;
  g += `<path d="M -84 -220 C -92 -160 -92 -90 -84 -40" stroke="#ffffff" stroke-width="12" fill="none" stroke-linecap="round" opacity=".55"/>`;
  g += `<rect x="-86" y="-286" width="172" height="40" rx="10" fill="#c9a26b" stroke="${INK}" stroke-width="6"/><path d="M -70 -276 H 70" stroke="#a8814f" stroke-width="5"/>`;
  g += `<rect x="-100" y="-258" width="200" height="14" rx="6" fill="#e8dcc8" stroke="${INK}" stroke-width="4"/>`;
  return back + `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 1000) / 1000})">${g}</g>`;
}
// world coords of the jar's inside centre (target for flying lights)
export const jarIn = (x, y, s) => [x, y - 140 * s];

// thought bubble holding a small picture. inner: SVG in bubble-local coords (centred, w×h). tail toward (tx,ty)
export function picBubble(x, y, w, h, tx, ty, p, inner, id) {
  if (p <= 0) return '';
  const k = Math.max(.01, p);
  const c1 = [lerp(x, tx, .55), lerp(y + h / 2, ty, .45)], c2 = [lerp(x, tx, .8), lerp(y + h / 2, ty, .78)];
  return `<g transform="translate(${f1(tx)} ${f1(ty)}) scale(${f1(k * 1000) / 1000}) translate(${f1(-tx)} ${f1(-ty)})" opacity="${op(cl(p * 2))}"><circle cx="${f1(c2[0])}" cy="${f1(c2[1])}" r="12" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="${f1(c1[0])}" cy="${f1(c1[1])}" r="20" fill="#fff" stroke="${INK}" stroke-width="5"/><g transform="translate(${f1(x)} ${f1(y)})"><defs><clipPath id="v101pb${id}"><rect x="${-w / 2 + 14}" y="${-h / 2 + 14}" width="${w - 28}" height="${h - 28}" rx="34"/></clipPath></defs><rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" rx="46" fill="#fff" stroke="${INK}" stroke-width="6"/><g clip-path="url(#v101pb${id})">${inner}</g></g></g>`;
}
// steaming coffee cup picture (bubble-local)
export function picCoffee(t, w, h) {
  let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#f3e3c3"/><rect x="${-w / 2}" y="${h * .2}" width="${w}" height="${h * .3}" fill="#a8744a"/>`;
  s += `<path d="M -56 ${f1(h * .2 - 100)} H 56 L 46 ${f1(h * .2)} H -46 Z" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/><path d="M 52 ${f1(h * .2 - 80)} C 92 ${f1(h * .2 - 80)} 92 ${f1(h * .2 - 30)} 48 ${f1(h * .2 - 30)}" fill="none" stroke="${INK}" stroke-width="6"/><ellipse cx="0" cy="${f1(h * .2 - 100)}" rx="56" ry="10" fill="#7a4a2e"/>`;
  for (let i = 0; i < 3; i++) { const p = (t * .6 + i / 3) % 1; s += `<path d="M ${-24 + i * 24} ${f1(h * .2 - 116 - p * 50)} c -10 -16 10 -24 0 -44" stroke="#9a8a7a" stroke-width="6" fill="none" stroke-linecap="round" opacity="${op(Math.sin(p * Math.PI))}"/>`; }
  return s;
}
// smiley photo on a phone (bubble-local): sister with two braids and yellow top, pulling a funny face
export function picPhoto(t, w, h, headFn) {
  let s = `<rect x="${-w / 2}" y="${-h / 2}" width="${w}" height="${h}" fill="#dfeaf4"/>`;
  s += `<rect x="-80" y="${-h / 2 + 18}" width="160" height="${h - 36}" rx="18" fill="${INK}"/><rect x="-70" y="${-h / 2 + 30}" width="140" height="${h - 60}" rx="8" fill="#9fd3f0"/>`;
  s += `<path d="M -70 ${f1(h / 2 - 30)} C -70 ${f1(h / 2 - 90)} 70 ${f1(h / 2 - 90)} 70 ${f1(h / 2 - 30)} Z" fill="#f2c14e"/>`;
  s += headFn(0, -6, .28);
  return s;
}
