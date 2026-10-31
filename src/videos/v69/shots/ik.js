// v69 local helper (shots 005, 022): two-bone arm solver + a drawn arm in the cast's style, so hands land exactly on their targets with fixed limb lengths.
import { K, f1 } from './lib.js';
// elbow for shoulder s, hand h, segment lengths a/b. The elbow bends downward (gravity side); when both
// solutions are about as low, it bends outward to side `out` (-1 = figure's left arm on screen-left, +1 = right). If the target is out of reach, the hand stops at full extension.
export function solve(s, h, a, b, out = 1) {
  let dx = h[0] - s[0], dy = h[1] - s[1], d = Math.hypot(dx, dy) || 1;
  const max = (a + b) * .995;
  if (d > max) { h = [s[0] + dx / d * max, s[1] + dy / d * max]; dx = h[0] - s[0]; dy = h[1] - s[1]; d = max; }
  const x = (a * a - b * b + d * d) / (2 * d), y = Math.sqrt(Math.max(0, a * a - x * x));
  const ux = dx / d, uy = dy / d;
  const c = sd => [s[0] + ux * x - uy * y * sd, s[1] + uy * x + ux * y * sd];
  const p = c(1), q = c(-1);
  const el = Math.abs(p[1] - q[1]) > .6 * y ? (p[1] > q[1] ? p : q) : ((p[0] - q[0]) * out > 0 ? p : q);
  return { el, hand: h };
}
// arm drawn like bust() arms: outlined sleeve, skin hand; optional fingers pointing toward ang (deg)
export function limb(s, el, hand, col, sc = 1, fingers = null) {
  const d = `M ${f1(s[0])} ${f1(s[1])} L ${f1(el[0])} ${f1(el[1])} L ${f1(hand[0])} ${f1(hand[1])}`;
  const fg = fingers == null ? '' : `<g transform="translate(${f1(hand[0])} ${f1(hand[1])}) rotate(${f1(fingers)})"><rect x="4" y="${f1(-14 * sc)}" width="${f1(36 * sc)}" height="${f1(28 * sc)}" rx="${f1(10 * sc)}" fill="${K.skin}" stroke="${K.ink}" stroke-width="4"/></g>`;
  return `<path d="${d}" fill="none" stroke="${K.ink}" stroke-width="${f1(44 * sc + 8)}" stroke-linecap="round" stroke-linejoin="round"/><path d="${d}" fill="none" stroke="${col}" stroke-width="${f1(44 * sc)}" stroke-linecap="round" stroke-linejoin="round"/>${fg}<circle cx="${f1(hand[0])}" cy="${f1(hand[1])}" r="${f1(20 * sc)}" fill="${K.skin}" stroke="${K.ink}" stroke-width="4"/>`;
}
