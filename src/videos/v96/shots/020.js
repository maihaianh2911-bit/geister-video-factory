// L12 54.84–58.5: two-shot: the sister smiles briefly ("lächelt" 55.56), then picks up her own phone ("greift" 56.32); blue light on both faces ("Handy" 57.6); the warm lamp dims.
import { K, frame, cam, person, prog, eio, lerp } from './lib.js';
import { dining, dinTable } from './sets.js';
import { duHG, holdPhone, gphone, screenGlow, phoneDown } from './base.js';
export default function renderShot(t) {
  const dim = eio(prog(t, 56.8, 58.2));
  let s = dining(t, { dim });
  const smile = t >= 55.5 && t < 56.3;
  const g = eio(prog(t, 56.32, 56.9));
  const lit = eio(prog(t, 56.9, 57.6));
  const hand = [lerp(160, 120, g), lerp(-170, -420, g)];
  s += person('sis', 290, 1640, .95, { t, seed: 7, look: g > .3 ? [12, 16] : [14, 2], brows: smile ? 'sad' : 'calm', mouth: smile ? 'smile' : 'flat', eyes: smile ? 'happy' : 'n', legs: false, armR: hand, front: (lit > 0 ? screenGlow(120, -560, 160, .45 * lit) : '') + (g > 0 ? holdPhone(hand[0], hand[1] - 80, -10, { lit, s: .8, id: 'p20' }) : '') });
  s += duHG(790, 1650, .95, { t, seed: 1, look: [-6, 16], brows: 'calm', mouth: 'flat', legs: false, armL: [-120, -400], front: screenGlow(-120, -560, 160, .45) + holdPhone(-120, -480, 10, { scroll: t * 35, s: .8 }) }, { s: .78 });
  s += dinTable(t, 1380, { plates: [290, 790] });
  if (g <= 0) s += phoneDown(470, 1420, .8, 6);
  return frame(cam(s, 540, 1000, 1.04 - .04 * eio(prog(t, 54.84, 58.5)), 0, 0));
}
