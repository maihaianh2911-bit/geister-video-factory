import { K, ground, bread, nestTop, antOnRoute, f1, prog, eio, back } from './lib.js';
// 10.2–11.92 Top-down: the ant runs back from the bread along one route to the nest and disappears into it ("zum Nest").
export default function renderShot(t) {
  const u = 1 - eio(prog(t, 10.2, 11.25));
  const inNest = t > 11.25;
  return `${ground(1)}${nestTop(250, 1250, 1)}${bread(790, 470, 1)}
    ${!inNest ? antOnRoute(u, t, true, { s: 2 }) : ''}
    ${inNest ? `<circle cx="250" cy="1250" r="${f1(60 + 120 * prog(t, 11.25, 11.7))}" fill="none" stroke="${K.ink}" stroke-width="6" opacity="${f1(1 - prog(t, 11.25, 11.7))}"/>` : ''}`;
}
