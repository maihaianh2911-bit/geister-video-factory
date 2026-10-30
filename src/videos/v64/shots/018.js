// 36.2–37.2: she trumpets — trunk up, sound waves; the passengers recoil on the benches
import { K, DEFS, interior, tuffi, trumpetWaves, grain, cam, f1, prog, eout, back, lerp } from './lib.js';
import { crowd } from './cabin.js';
export default function renderShot(t) {
  const up = back(prog(t, 36.2, 36.45));
  const r = eout(prog(t, 36.35, 36.7));
  const s = 1.05, x = 520, y = 1262;
  // trunk tip approx. for tr=1 (local ≈ 300,-430)
  const tip = [x + 300 * s, y - 440 * s];
  const sc = `${interior(t)}${crowd(t, 1260, r)}${tuffi(x, y, s, { tr: up, ear: 1, eye: 'wide' })}${trumpetWaves(tip[0], tip[1], -60, prog(t, 36.3, 37.1))}`;
  return `${DEFS}${cam(sc, 1.05, 540, 950)}${grain(t)}`;
}
