// L12 44.16–48.86 result bars: STUDIERENDE ~2× PRO TAG grows on "zweimal" (two X-mouth icons), ERWACHSENE ~1× PRO TAG on "einmal" (one icon). Source chip.
import { K, frame, bg, T, chip, cam, prog, eio, eout, pop, back, f1 } from './lib.js';
function xMouth(x, y, p) {
  if (p <= 0) return '';
  const k = back(Math.min(1, p), 2);
  return `<g transform="translate(${x} ${y}) scale(${f1(k * 100) / 100})"><circle r="44" fill="${K.ink}"/><circle cx="-14" cy="-10" r="8" fill="#fff"/><circle cx="14" cy="-10" r="8" fill="#fff"/><path d="M -12 10 L 12 30 M 12 10 L -12 30" stroke="${K.red}" stroke-width="8" stroke-linecap="round"/></g>`;
}
export default function renderShot(t) {
  let s = bg('desk', { sc: 1.1 });
  s += `<rect x="70" y="420" width="940" height="860" rx="36" fill="#fff" stroke="${K.ink}" stroke-width="6"/>`;
  s += T(540, 520, 'LÜGEN PRO TAG', 56, { fill: K.ink });
  // bar 1
  const b1 = eio(prog(t, 44.4, 45.6)), b2 = eio(prog(t, 46.84, 47.9));
  s += T(130, 650, 'STUDIERENDE', 50, { fill: K.ink, anchor: 'start', op: fade(t, 44.16) });
  s += `<rect x="130" y="690" width="${f1(720 * b1 + 1)}" height="110" rx="20" fill="${K.du}" stroke="${K.ink}" stroke-width="5" opacity="${b1 > 0 ? 1 : 0}"/>`;
  s += T(130 + 720 * b1 - 20, 768, '~2×', 64, { fill: '#fff', anchor: 'end', op: prog(t, 45.3, 45.6) });
  s += xMouth(240, 900, prog(t, 45.3, 45.6)) + xMouth(350, 900, prog(t, 45.55, 45.85));
  s += T(130, 1010, 'ERWACHSENE', 50, { fill: K.ink, anchor: 'start', op: fade(t, 46.6) });
  s += `<rect x="130" y="1050" width="${f1(360 * b2 + 1)}" height="110" rx="20" fill="${K.kol}" stroke="${K.ink}" stroke-width="5" opacity="${b2 > 0 ? 1 : 0}"/>`;
  s += T(130 + 360 * b2 - 20, 1128, '~1×', 64, { fill: '#fff', anchor: 'end', op: prog(t, 47.8, 48.1) });
  s += xMouth(620, 1105, prog(t, 47.8, 48.1));
  s += chip(540, 330, 'STUDIE: LÜGEN-TAGEBUCH', { size: 50, bg: '#fff' });
  s += T(540, 1340, 'DePaulo u. a., 1996', 34, { fill: '#fff', stroke: K.ink, sw: 8, op: fade(t, 44.6) });
  return frame(cam(s, 540, 860, 1 + .03 * eio(prog(t, 44.16, 48.86))));
}
function fade(t, t0) { return t < t0 ? 0 : Math.min(1, (t - t0) / .3); }
