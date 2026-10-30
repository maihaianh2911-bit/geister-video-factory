// 17.12–20.5: rule 1 — right after the impact your hand goes to the driver door: the finger finds the front window switch and presses it ("Fensterheber")
import { K, DEFS, doorPanel, foreArm, water, rain, label, f1, prog, eio, eout, lerp, ring } from './lib.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 17.6, 19.4)), press = eout(prog(t, 19.75, 19.9));
  const hx = lerp(860, 418, reach), hy = lerp(1500, 911, reach) + 10 * press;
  const jolt = 10 * ring(t, 17.12, 3, 4);
  const win = `<path d="M -60 -60 L 1140 -60 L 1140 160 L -60 220 Z" fill="#0E1418"/><clipPath id="s7w"><path d="M -60 -60 L 1140 -60 L 1140 160 L -60 220 Z"/></clipPath><g clip-path="url(#s7w)">${water(t, 60, { amp: 10 })}${rain(t, .8, 20)}</g>`;
  const sc = `${doorPanel(t, { lit: 1 })}${win}${foreArm(1150, 1700, hx, hy, K.you, { finger: true, w: 120 })}`;
  return `${DEFS}<g transform="translate(0 ${f1(jolt)})">${sc}</g>${label(540, 1260, '1  FENSTER AUF', eout(prog(t, 17.2, 17.5)), K.amber, 66)}`;
}
