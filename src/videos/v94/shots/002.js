// L1a 5.64–7.84: a week later on the street — du drags himself along under a huge backpack full of stones, stops on "gehen".
import { K, frame, cam, street, person, shadow, chip, wash, prog, eio, eout, lerp, cl, pop, f1, plantPot } from './lib.js';
export default function renderShot(t) {
  const stop = 7.04, walkT = Math.min(t, stop) - 5.64;
  const X = 360 + walkT * 70, Y = 1610, S = 1.5;
  let s = street({ dx: -walkT * 22 }) + wash('#3a4256', .22);
  s += shadow(X, Y + 4, 210);
  const sink = eio(prog(t, stop, stop + .5));
  s += person('du', X, Y, S, {
    t, seed: 1, load: 1.3, nStones: 6, hunch: .75 + .25 * sink, walk: t < stop ? walkT * .55 : undefined,
    eyes: 'tired', brows: 'worried', mouth: 'strain', look: [6, 8], sweat: .6 + .4 * Math.sin(t * 3), tilt: 2 + 3 * sink,
  });
  // sharp foreground: kerb, bollard, potted plant at the café door
  let fg = `<rect x="-60" y="1700" width="1200" height="300" fill="#8e8a84" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1700" width="1200" height="22" fill="#a8a49c"/>`;
  fg += `<g><rect x="60" y="1500" width="56" height="230" rx="14" fill="#3a3a40" stroke="${K.ink}" stroke-width="5"/><rect x="60" y="1540" width="56" height="18" fill="#e0b04a"/></g>` + plantPot(930, 1640, 1.3, '#3f7a4a', '#b9714f');
  s = cam(s + fg, 540, 1000, 1.02 + .06 * eio(prog(t, 5.64, 7.84)), -20 * eio(prog(t, 5.64, 7.84)));
  s += chip(540, 260, 'NACH 1 WOCHE', { p: pop(t, 5.9, .45), size: 64, bg: K.yellow });
  return frame(s);
}
