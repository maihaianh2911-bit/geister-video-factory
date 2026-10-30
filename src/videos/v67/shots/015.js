// 34.26–36.54: the magnified surface in section — the profile turns rough; arrows point into the tiny pits on "Unebenheiten"
import { K, arrow, card, prog, eio, eout, lerp } from './lib.js';
import { section, PITS, pitY } from './micro.js';
export default function renderShot(t) {
  const r = eio(prog(t, 34.3, 35.1));
  const ar = PITS.slice(1, 5).map((x, i) => arrow(x, 640, x, pitY(r) - 60, K.orange, 14, eout(prog(t, 35.1 + i * .08, 35.5 + i * .08)))).join('');
  return `${section(r)}${ar}`;
}
