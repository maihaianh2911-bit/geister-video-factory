import { K, card, ground, breadGhost, nestTop, trail, antOnRoute, prog, eio } from './lib.js';
// 51.95–55.2 No food, no new scent: the trail fades on "nicht weiter verstärkt".
export default function renderShot(t) {
  const str = 1.5 - 1.3 * eio(prog(t, 53.6, 55.2));
  let ants = ''; for (let i = 0; i < 4; i++) ants += antOnRoute(((t - 52) * .2 + i * .25) % 1 * .9, t, i % 2 === 1, { s: 1.6, k: i });
  return `${ground(1)}${nestTop(250, 1250, 1)}${trail(0.06, .92, str)}${breadGhost(790, 470, 1, .6)}${ants}
    ${card(540, 170, 'NICHT VERSTÄRKT', 60, prog(t, 54.3, 54.55), { col: K.grey })}`;
}
