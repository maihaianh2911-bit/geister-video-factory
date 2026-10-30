// 77.84–81.708: …and who there depends on them — inside each area, links light up from the local mosquitoes to the fish, birds and plants that use them ("abhängig")
import { K, DEFS, BG, vig, link, fish, swallow, orchid, flower, dragonfly, f1, prog, eio, eout, lerp } from './lib.js';
import { region, swarm } from './024.js';
export default function renderShot(t) {
  const w = eout(prog(t, 79.0, 79.6)), w2 = eout(prog(t, 79.4, 80.0));
  const n = `${swarm(60, 200, 960, 'n', t, 1)}${fish(300, 680, .7, { t })}${swallow(820, 330, .7, { t })}
    <g transform="translate(900 740) scale(.5)">${orchid(0, 0, 1)}</g>
    ${link(530, 380, 330, 660, w, { col: K.cyan })}${link(530, 380, 790, 340, w, { col: K.cyan })}${link(530, 380, 890, 600, w, { col: K.cyan })}`;
  const s = `${swarm(60, 820, 960, 'w', t, 1)}${fish(760, 1300, .7, { t: t + 1 })}${dragonfly(260, 1180, .7, { t })}${flower(560, 1380, 1170, .8, { t })}
    ${link(400, 1000, 740, 1290, w2, { col: K.sun })}${link(400, 1000, 280, 1170, w2, { col: K.sun })}${link(700, 1000, 560, 1160, w2, { col: K.sun })}`;
  return `${DEFS}${BG('url(#mData)')}${region(60, 200, 960, 560, 'n', t, 1, n)}${region(60, 820, 960, 560, 'w', t, 1, s)}${vig()}`;
}
