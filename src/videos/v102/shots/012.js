// L5b 26.88–28.34: close-up of the traffic light: the red lamp is on, but so pale it is almost grey ("Das Rot war dir kaum aufgefallen");
// a faint pink halo pulses once on "Rot" (27.08).
import { frame, cam, prog, eio, pool } from './lib.js';
import { street } from './sets2.js';
import { trafficLight } from './011.js';
import { farbeBar, colourAt, grey } from './common.js';
export default function renderShot(t) {
  let s = street(t, { strong: true });
  s += trafficLight(560, 1050, 2.2, 1);
  const pulse = eio(prog(t, 27.0, 27.3)) * (1 - eio(prog(t, 27.4, 28.0)));
  s += pool(560, 500, 260, 260, '#ff7a6a', .35 + .25 * pulse);
  s += grey(1 - colourAt(t));
  s = cam(s, 540, 700, 1.0 + .1 * eio(prog(t, 26.88, 28.34)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
