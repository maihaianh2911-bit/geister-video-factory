// 43.28–45.22: if the window won't open ("nicht auf"): dark door panel, your finger presses the switch twice — the glass does not move
import { K, DEFS, doorPanel, foreArm, crossOut, water, rain, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 43.3, 43.8));
  const p1 = Math.sin(Math.PI * prog(t, 43.85, 44.05)), p2 = Math.sin(Math.PI * prog(t, 44.25, 44.45));
  const hx = lerp(860, 418, reach), hy = lerp(1500, 911, reach) + 12 * (p1 + p2);
  const win = `<path d="M -60 -60 L 1140 -60 L 1140 160 L -60 220 Z" fill="#0E1418"/><clipPath id="s18w"><path d="M -60 -60 L 1140 -60 L 1140 160 L -60 220 Z"/></clipPath><g clip-path="url(#s18w)">${water(t, 30, { amp: 12 })}<rect x="-60" y="-60" width="1200" height="300" fill="${K.glassL}" opacity=".22"/></g>`;
  const sc = `${doorPanel(t, { lit: 0 })}${win}<rect x="-60" y="200" width="1200" height="1800" fill="#05080A" opacity=".3"/>${foreArm(1150, 1700, hx, hy, K.you, { finger: true, w: 120 })}
    ${crossOut(540, 80, 120, prog(t, 44.1, 44.4))}`;
  return `${DEFS}${sc}`;
}
