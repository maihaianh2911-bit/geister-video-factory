// 27.64–31.8: find the button with the bell and hold it for a few seconds — torch on the panel, your finger slides to the bell ("Glocke"), presses; a ring fills while held ("gedrückt")
import { K, DEFS, panel, light, label, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const find = eio(prog(t, 28.0, 29.2));
  const press = eout(prog(t, 29.3, 29.6));
  const hold = prog(t, 29.6, 31.7);
  const fx = lerp(760, 556, find), fy = lerp(560, 1150, find) + 10 * press;
  const finger = `<path d="M ${f1(fx + 30)} ${f1(fy + 30)} L ${f1(fx + 360)} ${f1(fy + 420)}" stroke="${K.ink}" stroke-width="128" stroke-linecap="round"/><path d="M ${f1(fx + 30)} ${f1(fy + 30)} L ${f1(fx + 360)} ${f1(fy + 420)}" stroke="${K.you}" stroke-width="116" stroke-linecap="round"/>
    <path d="M ${f1(fx)} ${f1(fy)} L ${f1(fx + 90)} ${f1(fy + 110)}" stroke="${K.ink}" stroke-width="58" stroke-linecap="round"/><path d="M ${f1(fx)} ${f1(fy)} L ${f1(fx + 90)} ${f1(fy + 110)}" stroke="${K.skin}" stroke-width="46" stroke-linecap="round"/>
    <circle cx="${f1(fx + 110)}" cy="${f1(fy + 140)}" r="58" fill="${K.skin}" stroke="${K.ink}" stroke-width="6"/>`;
  return `${DEFS}${panel(t, { hold, bellLit: press > .5 })}<rect x="-60" y="-60" width="1200" height="2040" fill="#05080A" opacity=".45"/>${light(fx, fy, 420, 1)}${finger}${label(540, 150, 'GLOCKE HALTEN', eout(prog(t, 29.2, 29.5)), K.amber, 56)}`;
}
