// 76.02–78.56: after the operation du lies in a bed; outside the window night turns to day; on "abgeschlossenen" (77.68) a red infection glow spreads at the leg.
import { K, DEFS, BG, lying, bed, cam, bact, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const day = eio(prog(t, 76.1, 77.2)), inf = eout(prog(t, 77.6, 78.3));
  const sky = `rgb(${Math.round(lerp(20, 120, day))},${Math.round(lerp(28, 160, day))},${Math.round(lerp(70, 210, day))})`;
  const win = `<rect x="620" y="300" width="300" height="380" rx="10" fill="${sky}" stroke="${K.ink}" stroke-width="8"/><circle cx="${f1(lerp(700, 860, day))}" cy="${f1(lerp(380, 360, day))}" r="38" fill="${day > .5 ? K.lamp : K.white}" opacity=".9"/><path d="M 770 300 V 680 M 620 490 H 920" stroke="${K.woodD}" stroke-width="12"/>`;
  const room = `${BG('url(#nWall)')}<rect x="-80" y="1400" width="1240" height="600" fill="${K.floor}"/>${win}<ellipse cx="770" cy="490" rx="420" ry="420" fill="url(#nLamp)" opacity="${f1(.3 * day)}"/>`;
  const glow = inf > 0 ? `<ellipse cx="760" cy="1010" rx="${f1(160 + 40 * inf)}" ry="70" fill="url(#nRed)" opacity="${f1(inf)}"/>${bact(700, 980, .5 * inf, 10, t)}${bact(820, 990, .5 * inf, -20, t + 1)}` : '';
  const p = lying(250, 1020.6, .9, { face: { t, eyes: 'open', look: .2, lookY: -.6, brow: lerp(0, .7, inf), mouth: inf > .5 ? 'down' : 'flat' } });
  return `${DEFS}${cam(`${room}${bed(110, 970, 1080)}${p}${glow}`, 1.15, 540, 1000)}`;
}
