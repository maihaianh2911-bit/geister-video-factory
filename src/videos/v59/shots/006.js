// 7.62–9.1: close: father's hand presses the lever handle and opens the door a crack (Spalt).
import { K, DEFS, FG, prog, eio, back, lerp, armTo, grip, smokeFlow } from './lib.js';
export default function renderShot(t) {
  const reachP = eio(prog(t, 7.62, 7.95));
  const press = eio(prog(t, 7.98, 8.25));
  const open = eio(prog(t, 8.3, 8.6));
  const gap = 70 * open;
  const doorX = 120, doorR = 820, sh = -gap * .3;
  const px = 720 + sh, py = 880, a = 28 * press * Math.PI / 180;
  const gx = px - 110 * Math.cos(a), gy = py + 110 * Math.sin(a);   // grip point on the lever
  const hx = lerp(1060, gx, reachP), hy = lerp(1560, gy, reachP);
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#1A2228"/>
    <rect x="${doorR}" y="-60" width="${gap + 20}" height="2040" fill="#120C0A"/>
    <rect x="${doorR}" y="-60" width="${gap + 20}" height="2040" fill="url(#vFire)" opacity="${.5 * open}"/>
    ${open > .2 ? smokeFlow(t, { t0: 8.5, x0: doorR + gap * .6, y0: 200, vx: -40, vy: 30, n: 12, gap: .05, life: 2, r0: 20, grow: 50, spread: 30, seed: 9, op: .85 }) : ''}
    <rect x="${doorR + gap}" y="-60" width="300" height="2040" fill="${K.doorSh}" stroke="#0B0F12" stroke-width="8"/>
    <g transform="translate(${sh} 0)">
      <rect x="${doorX}" y="-60" width="${doorR - doorX}" height="2040" fill="url(#vDoor)" stroke="#0B0F12" stroke-width="8"/>
      <rect x="${doorX + 70}" y="120" width="${doorR - doorX - 140}" height="560" rx="10" fill="none" stroke="${K.doorSh}" stroke-width="10"/>
      <rect x="${doorX + 70}" y="1060" width="${doorR - doorX - 140}" height="460" rx="10" fill="none" stroke="${K.doorSh}" stroke-width="10"/>
      <rect x="690" y="880" width="56" height="150" rx="14" fill="${K.steel}" stroke="#0B0F12" stroke-width="5"/>
      <g transform="translate(720 880) rotate(${-28 * press})"><circle r="30" fill="${K.steelHi}" stroke="#0B0F12" stroke-width="6"/><rect x="-170" y="-20" width="180" height="42" rx="20" fill="${K.steelHi}" stroke="#0B0F12" stroke-width="6"/></g>
    </g>
    ${armTo(1200, 1760, hx + 40, hy + 50, 120, K.vTop, -1)}
    ${grip(hx, hy, 1.05, -28 * press)}
    ${FG(1430)}`;
}
