// 8.02–10.6: 4 July 1999, night — two searchers with torches start up the wooded hill; an archive date tag is clipped into the scene on "Juli"
import { K, DEFS, card, grain, cam, prog, back, lerp, eio } from './lib.js';
import { hill } from './hill.js';
export default function renderShot(t) {
  return `${DEFS}${cam(hill(t), lerp(1, 1.04, eio(prog(t, 8.02, 10.6))), 540, 1000)}
    ${card(540, 330, '4.7.1999', 120, prog(t, 8.3, 8.42), { sc: back(prog(t, 8.3, 8.6)), w: 640 })}${grain(t)}`;
}
