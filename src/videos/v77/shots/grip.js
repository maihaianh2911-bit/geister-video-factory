import { FIG, joint } from './lib.js';
// World position the stick figure's hand ACTUALLY reaches (same maths as stick(): the arm is clamped
// to its length). Props held in the hand are drawn from this point, so hand and prop never separate.
export function handAt(x, y, s, o, side = 'L') {
  const lean = (o.lean || 0) * Math.PI / 180, bob = o.bob || 0;
  const hip = [0, -FIG.hip + bob];
  const shC = [hip[0] + Math.sin(lean) * (FIG.sh - FIG.hip), hip[1] - Math.cos(lean) * (FIG.sh - FIG.hip)];
  const sh = side === 'L' ? [shC[0] - 30, shC[1] + 4] : [shC[0] + 30, shC[1] + 4];
  const tg = side === 'L' ? o.hL : o.hR;
  const h = [(tg[0] - x) / s, (tg[1] - y) / s];
  const j = joint(sh[0], sh[1], h[0], h[1], FIG.arm, FIG.arm, 1);
  return [x + j[2] * s, y + j[3] * s];
}
// grip point on a side-view bread slice (scale .9) relative to its ground centre: right crust, mid height
export const GRIP = [118, -26];
