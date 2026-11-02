// L3a 11.36–13.72: card MONTAGABEND; cold dark-blue bedroom, wide → push in; du sits on the bed edge, shoulders down, sighs; the jar on the nightstand is empty.
import { K, frame, cam, label, pop, prog, eio, person, shadow } from './lib.js';
import { bedroom, bed, nightstand, jar } from './base.js';
export default function renderShot(t) {
  let s = bedroom(t, { light: 0 });
  s += bed(1420, { w: 600 });
  const sigh = eio(prog(t, 12.4, 13.2));
  s += shadow(360, 1640);
  s += person('du', 360, 1640, 1, { t, seed: 1, look: [4, 12], brows: 'sad', mouth: 'frown', eyes: sigh > .5 ? 'half' : 'n', hunch: .3 + .3 * sigh });
  s += nightstand(t, 840, 1330) + jar(800, 1330, .95, { t, n: 0, glow: 0 });
  s = cam(s, 540, 1050, .94 + .1 * eio(prog(t, 11.36, 13.72)));
  s += label('MONTAGABEND', 540, 250, 100, { p: pop(t, 11.4, .45) });
  return frame(s);
}
