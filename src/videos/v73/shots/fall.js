// v73 scenes 12–13 only: an articulated side-view figure (knees, elbows) in the same look as lib.person,
// so a loss of balance can be shown as a chain of contacts: pushed → pitch forward → hands on the next back
// → knees buckle → hands/knees on the ground → others carried over the fallen body.
// Joints are solved with two-bone IK, so planted feet stay planted and hands sit exactly on their contact point.
import { K, OL, f1, cl, lerp, eio } from './lib.js';

// keyframes: [[t, value], ...] where value is a number or an array of numbers; eased between keys
export function kf(t, keys, ease = eio) {
  if (t <= keys[0][0]) return keys[0][1];
  for (let i = 1; i < keys.length; i++) {
    const [t1, v1] = keys[i];
    if (t <= t1) {
      const [t0, v0] = keys[i - 1];
      const p = ease(cl((t - t0) / Math.max(1e-6, t1 - t0)));
      return Array.isArray(v0) ? v0.map((v, k) => lerp(v, v1[k], p)) : lerp(v0, v1, p);
    }
  }
  return keys[keys.length - 1][1];
}

const rad = d => d * Math.PI / 180;
// two-bone IK: root P, target T, lengths a, b; picks the bend whose joint lies further along `pref`
function ik(P, T, a, b, pref) {
  let dx = T[0] - P[0], dy = T[1] - P[1];
  let d = Math.hypot(dx, dy);
  const dMax = a + b - 0.5, dMin = Math.abs(a - b) + 0.5;
  const dc = Math.min(dMax, Math.max(dMin, d || dMin));
  const th = Math.atan2(dy, dx);
  const al = Math.acos(Math.min(1, Math.max(-1, (a * a + dc * dc - b * b) / (2 * a * dc))));
  const j1 = [P[0] + a * Math.cos(th + al), P[1] + a * Math.sin(th + al)];
  const j2 = [P[0] + a * Math.cos(th - al), P[1] + a * Math.sin(th - al)];
  const dot = j => (j[0] - P[0]) * pref[0] + (j[1] - P[1]) * pref[1];
  const J = dot(j1) >= dot(j2) ? j1 : j2;
  const E = [P[0] + dc * Math.cos(th), P[1] + dc * Math.sin(th)];
  return [J, E];
}

// figure pose (facing right):
//   hip [x,y]; th torso pitch in degrees (0 upright, + forward, 90 = horizontal, head to the right)
//   fF / fB front/back foot targets; hF / hB front/back hand targets (world points)
//   col shirt colour, s scale, face/brow, hair
export function fig(o) {
  const s = o.s || 1.05, col = o.col || K.c1;
  const TH = 90 * s, SH = 90 * s, UA = 64 * s, FA = 62 * s, TOR = 122 * s, HEAD = 172 * s;
  const a = rad(o.th || 0);
  const up = [Math.sin(a), -Math.cos(a)], front = [Math.cos(a), Math.sin(a)];
  const H = o.hip;
  const at = (k, n = 0) => [H[0] + up[0] * k + front[0] * n, H[1] + up[1] * k + front[1] * n];
  const shoulder = at(TOR), head = at(HEAD);
  const down = [-up[0], -up[1]];
  const legPref = front, armPref = [down[0] - front[0] * .4, down[1] - front[1] * .4];
  const seg = (P, J, E, w, c) => `<path d="M ${f1(P[0])} ${f1(P[1])} L ${f1(J[0])} ${f1(J[1])} L ${f1(E[0])} ${f1(E[1])}" fill="none" stroke="${K.ink}" stroke-width="${f1(w + 10 * s)}" stroke-linecap="round" stroke-linejoin="round"/><path d="M ${f1(P[0])} ${f1(P[1])} L ${f1(J[0])} ${f1(J[1])} L ${f1(E[0])} ${f1(E[1])}" fill="none" stroke="${c}" stroke-width="${f1(w)}" stroke-linecap="round" stroke-linejoin="round"/>`;
  const leg = (F) => { const [J, E] = ik(H, F, TH, SH, legPref); return seg(H, J, E, 20 * s, K.brownD); };
  const arm = (T) => { const [J, E] = ik(shoulder, T, UA, FA, armPref); return `${seg(shoulder, J, E, 18 * s, col)}<circle cx="${f1(E[0])}" cy="${f1(E[1])}" r="${f1(11 * s)}" fill="${K.skin}" ${OL(3)}/>`; };
  const deg = o.th || 0;
  const torso = `<g transform="translate(${f1(H[0])} ${f1(H[1])}) rotate(${f1(deg)}) scale(${f1(s)})"><path d="M -40 -140 Q -46 -70 -38 10 L 38 10 Q 46 -70 40 -140 Q 0 -160 -40 -140 Z" fill="${col}" ${OL(4)}/></g>`;
  const hd = o.headTh ?? deg * .8;
  const face = o.face === false ? '' : `<circle cx="14" cy="0" r="4.5" fill="${K.ink}"/><path d="M 10 24 h 14" stroke="${K.ink}" stroke-width="3.5"/>${o.brow ? `<path d="M 4 -16 l 18 6" stroke="${K.ink}" stroke-width="3.5"/>` : ''}`;
  const headSvg = `<g transform="translate(${f1(head[0])} ${f1(head[1])}) rotate(${f1(hd)}) scale(${f1(s)})"><circle cx="0" cy="0" r="40" fill="${K.skin}" ${OL(4)}/><path d="M -38 0 Q -36 -48 0 -48 Q 36 -48 38 0 Q 0 -22 -38 0 Z" fill="${o.hair || K.brownD}" ${OL(3)}/>${face}</g>`;
  return `<g>${leg(o.fB)}${arm(o.hB)}${torso}${headSvg}${leg(o.fF)}${arm(o.hF)}</g>`;
}
// useful landmarks of a pose (for putting someone else's hands on this body)
export function marks(o) {
  const s = o.s || 1.05, a = rad(o.th || 0);
  const up = [Math.sin(a), -Math.cos(a)], front = [Math.cos(a), Math.sin(a)], H = o.hip;
  const at = (k, n = 0) => [H[0] + up[0] * k * s + front[0] * n * s, H[1] + up[1] * k * s + front[1] * n * s];
  return { back: k => at(k, -42), chest: k => at(k, 42), axis: k => at(k, 0), shoulder: at(122), head: at(172) };
}
// standing pose helper: x = position on the ground, lean deg forward, crouch px lowers the hip (bends knees)
export const stand = (x, G, lean = 6, o = {}) => ({ hip: [x + lean * .9, G - 182 + (o.crouch || 0)], th: lean, fB: [x - 20 + (o.bx || 0), G], fF: [x + 22 + (o.fx || 0), G - (o.lift || 0)], ...o });
// relaxed hand position in front of the body (no contact), as a world point
export const restHands = (p, fwd = 30, drop = 112) => { const m = marks(p); const sh = m.shoulder; return { hF: [sh[0] + fwd, sh[1] + drop], hB: [sh[0] + fwd - 22, sh[1] + drop - 6] }; };
