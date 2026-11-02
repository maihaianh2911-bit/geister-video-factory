// L16 66.66–70.14 Medium from the foot of the bed: du lies awake; his OWN thought bubble slowly fades in above him on "gewünscht" (67.52),
// filled with the day's weight (clock, rain cloud, empty battery) — fully visible on "deine Blase" (68.78).
import { K, frame, cam, setBedroom, bed, blanket, nightstand, thought, icon, pop, prog, eio } from './lib.js';
import { lyingHead } from './023.js';
import { push } from './base.js';
export default function renderShot(t) {
  let s = setBedroom(t);
  s += bed(560, 1340);
  s += lyingHead(310, 1160, 135, t, { tired: true, rim: '#ffb46a' });
  s += blanket(560, 1340);
  s += nightstand(1000, 1300, 1, t);
  const p = eio(prog(t, 67.52, 68.9));
  s += thought(560, 640, [''], 330, 1040, { p: .85 + .15 * p, a: p, w: 640, h: 230, inner: icon.clock(380, 640, 1.6) + icon.cloud(560, 640, 1.6) + icon.battery(740, 640, 1.6) });
  return frame(cam(s, 480, 1050, push(t, 66.66, 70.14, 1.18, 1.3)), { tint: ['#1a1840', .1] });
}
