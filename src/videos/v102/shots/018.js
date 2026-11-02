// L11a 46.8–49.22: close-up of du in his grey living room: he yawns ("Müdigkeit" 48.22) and then smiles carefree, shrugging —
// his feeling has got used to being tired.
import { frame, cam, prog, eio, person } from './lib.js';
import { room } from './sets.js';
import { farbeBar, colourAt, grey } from './common.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', strong: true, hh: 20, mm: 0 });
  s += grey(1 - colourAt(t));
  const yawn = t > 47.6 && t < 48.6;
  const sh = eio(prog(t, 48.6, 49.0));
  s += person('du', 480, 2110, 1.75, { t, seed: 1, eyes: yawn ? 'closed' : t > 48.6 ? 'happy' : 'tired', look: [4, 0], brows: yawn ? 'up' : 'calm', mouth: yawn ? 'o' : t > 48.6 ? 'smile' : 'small',
    armL: [-120 - 160 * sh, -380 - 180 * sh], elbowL: [-250, -400], armR: [120 + 160 * sh, -380 - 180 * sh], elbowR: [250, -400] });
  s = cam(s, 540, 900, 1.0 + .07 * eio(prog(t, 46.8, 49.22)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
