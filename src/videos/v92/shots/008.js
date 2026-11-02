// L7 22.46–26.12 Er turns away: "Mach doch, was du willst." (speech) — in his head: "Bitte geh jetzt nicht." (thought)
import { K, frame, person, speech, thought, cam, hearLvl, prog, eio, eout, pop } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { plates: 7 });
  const turn = t > 23.0;
  s += person('du', DU, GY, 1, { t, seed: 1, hear: hearLvl(t, [24.74]), eyes: t > 25.0 ? 'wide' : 'n', brows: t < 25.0 ? 'mean' : null, mouth: 'flat', look: [12, 0] });
  s += person('er', ER, GY, 1, { t, seed: 2, brows: t < 24.6 ? 'mean' : 'sad', eyes: t > 24.6 ? 'sad' : 'n', mouth: 'flat', look: turn ? [14, 0] : [-12, 0], armL: t > 22.9 && t < 24.2 ? [-140, -300] : null });
  s += speech(620, 700, 'Mach doch, was du willst.', ER - 20, 840, { p: pop(t, 22.92, .4), a: t > 24.74 ? .5 : undefined, size: 44 });
  s += thought(700, 480, 'Bitte geh jetzt nicht.', ER + 10, 800, { p: pop(t, 24.74, .45) });
  return frame(cam(s, 600, 1000, 1.04 + .04 * eio(prog(t, 22.46, 26.12))));
}
