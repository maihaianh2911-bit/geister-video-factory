import { K, card, ground, bread, nestTop, trail, antOnRoute, cl, prog, eio } from './lib.js';
// 31.2–33.12 Top-down: returning ants carry crumbs home and lay more scent — the trail grows thicker on "Duftmarkierung".
export default function renderShot(t) {
  const str = 1.1 + .6 * eio(prog(t, 31.6, 32.4));
  let ants = '';
  for (let i = 0; i < 5; i++) { const u = cl(.95 - ((t - 31.2) * .3 + i * .17) % 1); ants += antOnRoute(u, t, true, { s: 1.6, k: i, carry: 1 }); }
  for (let i = 0; i < 3; i++) { const u = cl(((t - 31.2) * .3 + i * .3 + .1) % 1); ants += antOnRoute(u, t, false, { s: 1.6, k: i + 9 }); }
  return `${ground(1)}${nestTop(250, 1250, 1)}${trail(0.06, .92, str)}${bread(790, 470, 1)}${ants}
    ${card(540, 1460 - 1100, 'MEHR DUFT', 70, prog(t, 32.14, 32.4), { col: K.trail })}`;
}
