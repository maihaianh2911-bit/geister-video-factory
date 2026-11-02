// L7a 29.24–31.82: DIENSTAG. Stairwell, daylight from the landing window. The neighbour (grey hair, brown knit sweater) comes in from the right carrying a moving box ("Nachbar" 30.56); du (60 %) stops on the stairs.
import { frame, cam, shadow, person, pop, prog, eio, eout, dayCard, stairwell, box, batOver, duBat } from './all.js';
export default function renderShot(t) {
  let s = stairwell(t);
  const w = eout(prog(t, 29.9, 30.7)), nx = 1200 - 420 * w;
  s += shadow(310, 1660) + shadow(nx, 1660);
  s += person('du', 310, 1660, .92, { t, seed: 1, look: t > 30.3 ? [14, 0] : [-4, 6], eyes: 'tired', brows: 'calm', mouth: 'flat' });
  s += person('nach', nx, 1660, .92, { t, seed: 9, flip: true, walk: w < 1 ? t * 1.5 : undefined, look: [12, 0], brows: 'up', mouth: 'smile',
    armR: [150, -330], armL: [-60, -330], front: box(50, -230, 300, 220, 'UMZUG') });
  s += batOver(310, 1660, .92, duBat(t).lvl, { t, bs: .85 });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 29.24, 31.82)));
  s += dayCard(t, 29.3, 'DIENSTAG');
  return frame(s);
}
