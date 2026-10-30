// 64.66–66.4: plain-clothes police storm in through the door (stürmen herein)
import { K, DEFS, BG, fig, grain, cam, shk, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const d = eout(prog(t, 65.1, 65.35));
  const [sx, sy] = shk(t, 65.24, 12, 8);
  const run = eio(prog(t, 65.3, 66.3));
  const cops = [0, 1, 2].map(i => fig(lerp(540 + (i - 1) * 60, 300 + i * 260, run), 1420 + i * 20, .85 + i * .05, { col: '#1B1F22', walk: (t - 65.3) * 10 + i, stride: 40, aR: [70, 0], aL: [30, 20], lean: 6 }).svg).join('');
  return `${DEFS}<g transform="translate(${f1(sx)} ${f1(sy)})">${BG('#C9B79A')}<rect x="330" y="560" width="420" height="880" fill="#F2E0B0"/>
    <g transform="translate(330 0) scale(${f1(1 - .85 * d)} 1)"><rect x="0" y="560" width="420" height="880" fill="#6A5A48" stroke="${K.ink}" stroke-width="6"/></g>
    ${run > 0 ? cops : ''}<rect x="-60" y="1440" width="1200" height="600" fill="${K.brown}"/></g>${grain(t)}`;
}
