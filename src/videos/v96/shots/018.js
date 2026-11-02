// L11a 49.8–52.56: dinner under a warm orange pendant lamp: the sister (bun, purple knit) talks to du ("fragt" 50.74, faded speech bubble), du looks down at his glowing phone; sand runs.
import { K, frame, cam, person, prog, eio, pop, speech, label } from './lib.js';
import { dining, dinTable } from './sets.js';
import { duHG, holdPhone, screenGlow } from './base.js';
export default function renderShot(t) {
  let s = dining(t);
  const talk = t >= 50.74 && t < 52.3 && Math.sin(t * 16) > 0;
  s += person('sis', 290, 1640, .95, { t, seed: 7, look: [14, 2], brows: 'calm', mouth: talk ? 'talk' : 'smile', legs: false });
  s += duHG(790, 1650, .95, { t, seed: 1, look: [-6, 16], brows: 'calm', mouth: 'flat', legs: false, armL: [-120, -400], front: screenGlow(-120, -560, 160, .45) + holdPhone(-120, -480, 10, { scroll: t * 35, s: .8 }) }, { s: .78 });
  s += dinTable(t, 1380, { plates: [290, 790] });
  s += `<g opacity=".7">${speech(330, 420, ['… … …'], 300, 640, { p: pop(t, 50.8, .4), size: 56, col: '#9aa0a8' })}</g>`;
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 49.8, 52.56)));
  s += label('ABENDS', 540, 220, 96, { p: pop(t, 49.85, .45) });
  return frame(s);
}
