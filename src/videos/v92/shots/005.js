// L4 12.58–16.3 his speech dims; in his head du hears: "Egal was ich mache, es reicht nie." — his face turns sad.
import { K, frame, person, speech, thought, cam, hearLvl, prog, eio, eout, pop } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { plates: 7 });
  const sad = t > 13.9;
  const down = 1 - eio(prog(t, 12.6, 13.0));
  s += person('du', DU, GY, 1, { t, seed: 1, hear: hearLvl(t, [13.8]), mouth: t > 14.2 ? 'o' : 'flat', eyes: t > 14.2 ? 'wide' : 'n', look: [12, -4] });
  s += person('er', ER, GY, 1, { t, seed: 2, brows: sad ? 'sad' : 'mean', eyes: sad ? 'sad' : 'n', mouth: sad ? 'sad' : 'grin', look: [-12, 6], headDy: sad ? 8 : 0,
    armL: down > .02 ? [-80 - 70 * down, -212 - 160 * down] : null, armR: down > .02 ? [80 + 70 * down, -212 - 160 * down] : null });
  s += speech(640, 700, ['Das stimmt doch', 'gar nicht!'], ER - 10, 830, { size: 52, noPop: true, a: .5 });
  s += thought(640, 420, ['Egal was ich mache,', 'es reicht nie.'], ER + 20, 800, { p: pop(t, 13.8, .45) });
  return frame(cam(s, 600, 1000, 1.08));
}
