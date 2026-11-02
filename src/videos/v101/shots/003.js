// L2a 5.52–8.74: card NACH EINER WOCHE; lights stream into the jar one after another, the room turns warm and bright ("hell" 7.32); du on the bed opens his mouth in surprise.
import { K, frame, cam, label, pop, prog, eio, person, shadow, hash } from './lib.js';
import { bedroom, bed, nightstand, jar } from './base.js';
import { flyer } from './jar.js';
export default function renderShot(t) {
  const N = 18, pops = Array.from({ length: N }, (_, i) => 5.7 + i * .1);
  const n = pops.filter(p => t >= p + .45).length;
  const L = eio(prog(t, 5.8, 7.6));
  let s = bedroom(t, { light: L });
  s += bed(1420, { w: 600 });
  s += shadow(340, 1640);
  s += person('du', 340, 1640, 1, { t, seed: 1, look: [14, 0], brows: L > .6 ? 'up' : 'calm', mouth: t > 7.2 ? 'o' : 'small', eyes: t > 7.2 ? 'wide' : 'n', rim: L > .4 ? '#ffc46b' : undefined });
  s += nightstand(t, 840, 1330) + jar(800, 1330, .95, { t, n, pops: pops.map(p => p + .45) });
  pops.forEach((p, i) => { s += flyer(t, p, .45, -40 + hash(i) * 200, 300 + hash(i + 9) * 500, 800, 1200, 14, 120); });
  s = cam(s, 560, 1050, 1.0 + .05 * eio(prog(t, 5.52, 8.74)));
  s += label('NACH EINER WOCHE', 540, 250, 84, { p: pop(t, 5.6, .45) });
  return frame(s);
}
