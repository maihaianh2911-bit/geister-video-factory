// 22.50–24.30: close-up — the surgeon's hand holds an open pocket watch; the second hand races ("schnelles" 23.2).
import { K, DEFS, BG, watch, arm, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 22.6, 23.1)), sec = (t - 22.5) * 360 * 1.2;
  const y = lerp(1100, 820, lift);
  const w = watch(540, y, 230, 120, sec);
  const a = arm([1200, 1500], [900, 1300], [600, y + 250], 1.6, K.coatB);
  const fingers = `<path d="M 470 ${f1(y + 230)} q 0 40 40 50 M 630 ${f1(y + 230)} q 0 40 -40 50" fill="none" stroke="${K.ink}" stroke-width="8" stroke-linecap="round"/>`;
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="540" cy="820" rx="600" ry="600" fill="url(#nLamp)" opacity=".7"/>${a}${w}<ellipse cx="560" cy="${f1(y + 260)}" rx="90" ry="50" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>${fingers}`;
}
