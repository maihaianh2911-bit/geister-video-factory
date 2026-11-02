// L1a 5.36–8.00: night. du covered with notes from head to toe — notes keep landing until "beklebt" (7.06). Card "AM ABEND".
import { frame, cam, shadow, pop, prog, eio, person, dayCard } from './lib.js';
import { room } from './sets.js';
import { coverAt, COVER } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 22, mm: 0 });
  const X = 540, Y = 1660, S = .92;
  const c = coverAt(t, X, Y, S, 5.5, 7.06, 4, COVER.length);
  const on = COVER.slice(0, 4).concat(c.on);
  const k = eio(prog(t, 5.6, 6.4));
  s += shadow(X, Y, 180) + person('du', X, Y, S, { t, look: [Math.sin(t * 3) * 10, -4], eyes: 'wide', brows: 'worried', mouth: t > 7.06 ? 'frown' : 'o', armL: [-200 - 60 * k, -330 - 60 * k], elbowL: [-230, -420], armR: [200 + 60 * k, -330 - 60 * k], elbowR: [230, -420], notes: on });
  s += c.fly;
  s = cam(s, 540, 1150, .98 + .08 * eio(prog(t, 5.36, 8.0)));
  s += dayCard(t, 5.52, 'AM ABEND', { size: 100 });
  return frame(s);
}
