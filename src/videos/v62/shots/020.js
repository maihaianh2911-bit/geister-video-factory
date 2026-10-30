// Close on the stretched foot on the sofa: fine sparkles on "kribbeln", sharper star points on "stechen", a warm orange glow on "brennen".
import { K, BG, footCU, tingle, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const k = eio(prog(t, 38.7, 39.0)), st = eio(prog(t, 39.5, 39.7)), hot = eio(prog(t, 39.95, 40.3));
  return BG + `<rect x="0" y="1075" width="1080" height="200" rx="30" fill="${K.sofa}" stroke="${K.ol}" stroke-width="5"/><rect x="0" y="1240" width="1080" height="700" fill="${K.sofaSh}"/>
   <ellipse cx="660" cy="820" rx="${260 * hot}" ry="${300 * hot}" fill="#FF8A3D" opacity="${(.35 * hot).toFixed(2)}"/>
   <g transform="translate(640 1000) rotate(-90)">${footCU(0, 0, 1.3, { numb: lerp(.6, .2, k) })}</g>
   ${tingle(t, 660, 830, 120, 200, .5 * k + .5 * st, 7, 30 + 10 * st, hot, 1 + .9 * st)}`;
}
