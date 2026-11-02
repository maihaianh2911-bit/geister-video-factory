// v97 shared helpers: du's sticky notes over time, the "covered head to toe" layout, the bubble → note transition.
import { K, f1, op, prog, eio, lerp, hash, note, flyNote, N1, N2, N3 } from './lib.js';
export { N1, N2, N3 };
// notes du carries on the story timeline (authored time)
export function duNotes(t) {
  const L = [];
  if (t >= 18.6 && t < 68.84) L.push(N1);
  if (t >= 30.22 && t < 74.72) L.push(N2);
  if (t >= 35.58 && t < 79.1) L.push(N3);
  return L;
}
// hypothetical hook: notes covering du from head to toe (person-local, s=1). First three carry the story texts.
export const COVER = (() => {
  const P = [
    [108, -505, 12], [-78, -395, -9], [62, -290, 7],
    [-120, -820, -14], [118, -840, 16], [0, -900, -4], [-170, -690, 8], [170, -670, -10],
    [-40, -520, 5], [-120, -480, -12], [10, -440, 9], [120, -400, -6], [-130, -310, 11], [-30, -300, -7],
    [140, -220, 14], [-60, -210, -3], [40, -190, 6], [-150, -200, -15], [-60, -80, 10], [60, -70, -12],
    [-160, -560, -8], [150, -560, 4],
  ];
  return P.map(([x, y, rot], i) => ({ x, y, rot, s: i < 3 ? 1 : .82 + hash(i) * .2, txt: [N1.txt, N2.txt, N3.txt][i] || [] }));
})();
// notes landing on du one after another: n notes, landing times from t0 to t1 (ease-in so they speed up)
export function coverAt(t, x, y, s, t0, t1, from = 0, upto = COVER.length, src = [-200, 600]) {
  const on = [], fly = [];
  for (let i = from; i < upto; i++) {
    const k = (i - from) / Math.max(1, upto - from - 1);
    const tl = t0 + (t1 - t0) * Math.sqrt(k);
    const n = COVER[i];
    if (t >= tl) on.push(n);
    else if (t > tl - .5) {
      const sx = i % 2 ? 1280 : -200, sy = src[1] + (hash(i * 3) - .5) * 900;
      fly.push(flyNote(t, tl, sx, sy, x + n.x * s, y + n.y * s, s * n.s * 1.3, s * n.s, n.rot, n.txt, .5, { arc: -80 }));
    }
  }
  return { on, fly: fly.join('') };
}
// a thought bubble collapsing into a note and flying to a target (world coords)
export function bubbleToNote(t, tStart, tLand, bx, by, tx, ty, s1, n) {
  if (t < tStart || t >= tLand) return '';
  return flyNote(t, tLand, bx, by, tx, ty, 1.6, s1, n.rot, n.txt, tLand - tStart, { arc: -60, glow: .5 });
}
