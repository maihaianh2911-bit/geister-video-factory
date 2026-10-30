// 29.18–31.28: you and your wife both release your belts ("löst die Gurte"): hands to the buckles, belts run back to the pillars
import { K, DEFS, interior, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const r = eio(prog(t, 29.3, 30.1)), rel = 1 - eio(prog(t, 30.25, 30.9));
  const wy = 1090, s = 1.15;
  // inboard hands reach to the buckles at the inner hips
  const bW = [300 + 70 * s, wy + 340 * s], bY = [790 - 70 * s, wy + 340 * s];
  const W = { look: .6, lookY: .6, brow: .8, mouth: 'flat', aR: [[lerp(420, 440, r), lerp(1300, 1330, r)], [lerp(400, bW[0] + 10, r), lerp(1500, bW[1] - 10, r)]] };
  const Y = { look: -.6, lookY: .6, brow: .7, mouth: 'flat', aL: [[lerp(660, 640, r), lerp(1300, 1330, r)], [lerp(690, bY[0] - 10, r), lerp(1500, bY[1] - 10, r)]] };
  return `${DEFS}${interior(t, { water: .45, rearWater: .3, dash: .6, belts: { wom: rel, you: rel }, poses: { wom: W, you: Y, kidA: { look: .3, brow: 1, mouth: 'cry', tears: 1 }, kidB: { look: -.3, brow: 1, mouth: 'cry', tears: 1 } } })}`;
}
