// 34.84–37.28: the dentist William Morton walks in carrying the glass ether inhaler in both hands; name tag on "William Morton" (36.42).
import { K, DEFS, theatreWall, figure, inhaler, tag, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const w = prog(t, 34.84, 36.2), x = lerp(160, 540, eio(w)), step = w < 1 ? w * 18 : 0;
  const hx = x + 10, hy = 900 + (w < 1 ? 6 * Math.sin(step * 2) : 0);
  const inh = inhaler(hx + 10, hy - 40, .8, 0, .2, t);
  const m = figure('morton', x, 1400, 1.05, { step, look: w < 1 ? .9 : 0, lookY: 0, mouth: 'flat', aL: [[x - 120, 820], [hx - 70, hy]], aR: [[x + 120, 820], [hx + 80, hy]], t });
  const floor = `<rect x="-80" y="1020" width="1240" height="1000" fill="#3A2C22"/><ellipse cx="540" cy="1150" rx="620" ry="420" fill="url(#nLamp)" opacity=".7"/>`;
  const a = prog(t, 35.84, 36.2), b = prog(t, 36.4, 36.7);
  const sc = `${theatreWall()}<rect x="-80" y="700" width="1240" height="320" fill="${K.wallL}" opacity=".6"/>${floor}${m}${inh}<circle cx="${f1(hx - 70)}" cy="${f1(hy)}" r="27" fill="${K.skin}" stroke="${K.ink}" stroke-width="4"/><circle cx="${f1(hx + 80)}" cy="${f1(hy)}" r="27" fill="${K.skin}" stroke="${K.ink}" stroke-width="4"/>`;
  return `${DEFS}${cam(sc, 1.25, 540, 1050)}${tag(540, 250, 'WILLIAM MORTON', b, 70, K.lamp, a > 0 ? 'ZAHNARZT' : '')}`;
}
