// 11.44–15.64: a man wants to pry the door open — his fingers go into the door gap ("aufhebeln"); you grab his forearm and hold him back ("zurück")
import { K, DEFS, cabin, bust, light, f1, cam, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 11.6, 12.4));
  const pull = eio(prog(t, 12.4, 13.3)) * (1 - eio(prog(t, 14.6, 15.2)));
  const grab = eio(prog(t, 13.5, 14.3));
  const gap = .04 * pull;
  const hx = lerp(860, 556, reach) + 16 * pull, hy = lerp(1300, 900, reach);
  const man = bust('man', 820, 940, 1.2, { look: grab > .5 ? .6 : -.9, brow: .9, mouth: grab > .5 ? 'o' : 'flat', aL: [[700, 1060], [hx, hy]], aR: [[900, 1120], [hx + 10, hy + 90]] });
  const yx = lerp(-80, 690, grab), yy = lerp(1200, 1020, grab);
  const you = bust('you', 180, 1180, 1.3, { look: .9, brow: .6, mouth: grab > .5 ? 'talk' : 'flat', t, aR: [[lerp(260, 560, grab), lerp(1500, 1120, grab)], [yx, yy]], noL: true });
  const sc = `${cabin(t, { lit: 0, gap })}${light(560, 900, 520, 1)}${man}${you}`;
  return `${DEFS}${cam(sc, 1.08, 600, 1000)}`;
}
