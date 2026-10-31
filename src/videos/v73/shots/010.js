// 28.1–32.3: a small movement passes on to everyone around ("übertragen"): one head is nudged, and the push travels outward through the packed crowd as a wave
import { K, DEFS, BG, headTop, grain, f1, prog, eio, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const sp = 84, t0 = 29.0, src = [540 - sp * 2, 860];
  let h = '';
  for (let r = -9; r <= 9; r++) for (let c = -8; c <= 8; c++) {
    let x = 540 + c * sp + (r % 2 ? sp / 2 : 0) + 10 * (hash(r * 17 + c) - .5), y = 860 + r * sp * .9 + 10 * hash(r * 7 + c);
    if (x < -60 || x > 1140 || y < -60 || y > 1500) continue;
    const dist = Math.hypot(x - src[0], y - src[1]), arr = t0 + dist / 380;
    const k = t > arr ? Math.exp(-(t - arr) * 2.2) * Math.sin(Math.min(Math.PI, (t - arr) * 6)) : 0;
    const ux = dist > 1 ? (x - src[0]) / dist : 1, uy = dist > 1 ? (y - src[1]) / dist : 0;
    x += ux * 60 * k; y += uy * 60 * k;
    const first = Math.abs(x - src[0]) < 50 && Math.abs(y - src[1]) < 50;
    h += headTop(x, y, .85, { col: first ? K.redL : [K.c1, K.c2, K.c3, K.c4, K.c5][Math.floor(hash(r * 3 + c * 5 + 40) * 5)], hair: hash(r + c * 13) > .5 ? K.brownD : K.ink, rot: 20 * (hash(r * c + 3) - .5) });
  }
  const ring = t > t0 ? `<circle cx="${src[0]}" cy="${src[1]}" r="${f1((t - t0) * 380)}" fill="none" stroke="${K.red}" stroke-width="12" opacity="${f1(Math.max(0, .95 - (t - t0) * .3))}"/>` : '';
  const nudge = `<path d="M ${src[0] - 220} ${src[1]} l 120 0 m -34 -30 l 34 30 l -34 30" stroke="${K.red}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(prog(t, 28.4, 28.8) * (1 - prog(t, 29.6, 30)))}"/>`;
  return `${DEFS}${BG(K.concrete)}${grain(7)}${h}${ring}${nudge}`;
}
