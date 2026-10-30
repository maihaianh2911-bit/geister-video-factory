// 18.78–20.4: REGEL 1: smoke tongues through the crack; the father slams the door shut on "sofort".
import { K, DEFS, FG, prog, eio, ein, back, shk, armTo, flatDoor, smokeFlow, regel, rings } from './lib.js';
export default function renderShot(t) {
  const shut = ein(prog(t, 19.8, 19.98));
  const open = .14 * (1 - shut);
  const [sx, sy] = shk(t, 19.98, 22, 7);
  const card = back(prog(t, 18.9, 19.15));
  const px = 330 + 560 * (1 - .78 * open) - 120, py = 980;
  const gapIn = `<rect x="260" y="300" width="560" height="1080" fill="url(#vFire)" opacity=".6"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1E2A30"/>
    <g transform="translate(${sx} ${sy})">
    ${flatDoor(260, 300, 560, 1080, open, { gap: '#140C0A', inGap: gapIn })}
    ${t < 20.3 ? smokeFlow(t, { t0: 18.4, x0: 760, y0: 360, vx: -160, vy: 40, n: 30, gap: .05, life: 1.8, r0: 30, grow: 90, spread: 60, seed: 12, op: .9 }) : ''}
    ${armTo(1180, 1500, px + 60, py, 120, K.vTop, 1)}
    <ellipse cx="${px + 40}" cy="${py}" rx="70" ry="86" fill="${K.skin}" stroke="#0B0F12" stroke-width="7"/>
    ${rings(t, 19.98, 830, 840, K.amb, 3, 320, 12)}
    </g>
    ${regel(1, 540, 210, card)}
    ${FG(1430)}`;
}
