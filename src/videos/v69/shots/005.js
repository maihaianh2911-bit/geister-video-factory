// 11.44–15.64: a man wants to pry the door open — both his hands grip the edge of the right door leaf and drag it a crack open ("aufhebeln"); you grab his forearm ("hältst ihn") and pull his hands off the door ("zurück"), the leaf slides shut
import { K, DEFS, cabin, bust, light, f1, cam, prog, eio, eout, lerp } from './lib.js';
import { solve, limb } from './ik.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 11.7, 12.4));               // hands travel to the door edge, arrive on "Tür"/"aufhebeln"
  const pry = eio(prog(t, 12.45, 13.3));                // he hauls the leaf open while gripping it
  const grab = eio(prog(t, 13.55, 14.15));              // your hand closes on his left forearm ("hältst")
  const off = eio(prog(t, 14.3, 14.9));                 // pulled back: hands leave the edge ("zurück")
  const shut = eio(prog(t, 14.75, 15.3));               // released leaf slides closed
  const gap = .13 * pry * (1 - shut);
  const edge = 540 + 120 * gap;                         // left edge of the right door leaf
  const lean = -26 * pry * (1 - off) + 40 * off;         // leans into the pull, then is drawn back
  const mx = 745 + lean, my = 950, ms = 1.15;
  const w = 92 * ms, shL = [mx - (w - 14 * ms), my + 30 * ms], shR = [mx + (w - 14 * ms), my + 30 * ms];
  const A = 165;
  // hand targets: rest by the body → on the door edge (fingers in the crack) → pulled back toward his chest
  const restL = [shL[0] - 10, shL[1] + 300], restR = [shR[0] + 8, shR[1] + 300];
  const doorL = [edge + 22, 1010], doorR = [edge + 24, 1130];
  const backL = [mx - 95, 1250], backR = [mx + 60, 1290];
  const mix = (a, b, c, p, q) => [lerp(lerp(a[0], b[0], p), c[0], q), lerp(lerp(a[1], b[1], p), c[1], q)];
  const L = solve(shL, mix(restL, doorL, backL, reach, off), A, A, -1);
  const R = solve(shR, mix(restR, doorR, backR, reach, off), A, A, 1);
  const onDoor = reach > .95 && off < .05;
  const man = bust('man', mx, my, ms, { look: grab > .5 ? .7 : -.9, brow: .9, mouth: grab > .5 ? 'o' : 'flat', noL: true, noR: true })
    + limb(shR, R.el, R.hand, K.man, ms, onDoor ? 180 : null) + limb(shL, L.el, L.hand, K.man, ms, onDoor ? 180 : null);
  // your grip: a point 55 % along his left forearm (elbow → hand); your hand stays on it while he is pulled back
  const G = [lerp(L.el[0], L.hand[0], .55), lerp(L.el[1], L.hand[1], .55)];
  const ys = 1.3, yx = 250, yy = 1170, ySh = [yx + (92 * ys - 14 * ys), yy + 30 * ys];
  const yRest = [ySh[0] + 40, ySh[1] + 385];
  const Y = solve(ySh, [lerp(yRest[0], G[0], grab), lerp(yRest[1], G[1], grab)], 200, 200, 1);
  const you = bust('you', yx, yy, ys, { look: .9, brow: .6, mouth: grab > .5 ? 'talk' : 'flat', t, noL: true, noR: true }) + limb(ySh, Y.el, Y.hand, K.you, ys, grab > .8 ? -60 : null);
  const rim = `<path d="M ${f1(edge + 3)} 310 V 1490" stroke="${K.steelL}" stroke-width="6" opacity="${f1(.4 + .6 * reach)}"/>`;
  const sc = `${cabin(t, { lit: 0, gap })}${rim}${light(560, 960, 520, 1)}${man}${you}`;
  return `${DEFS}${cam(sc, 1.08, 600, 1000)}`;
}
