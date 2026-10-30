// 11.78–14.64: maybe you notice no symptoms at all ("keine Symptome" 13.34–13.72) — you shrug and carry on, stomach calm
import { K, DEFS, kitchen, bust, stomach, bodyWindow, label, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const sh = eio(prog(t, 12.3, 12.8)) * (1 - eio(prog(t, 13.6, 14.2)));
  const win = bodyWindow(540, 1270, 1.6, stomach(540, 1280, .7, { mood: 'happy' }));
  const du = bust('du', 540, 1000, 1.3, { look: .4, brow: .2, mouth: 'smile', front: win, aL: [[lerp(400, 360, sh), lerp(1240, 1120, sh)], [lerp(380, 300, sh), lerp(1360, 1040, sh)]], aR: [[lerp(680, 720, sh), lerp(1240, 1120, sh)], [lerp(700, 780, sh), lerp(1360, 1040, sh)]] });
  return `${DEFS}${cam(`${kitchen(1500)}${du}`, 1.0, 540, 1000)}${label(540, 260, 'KEINE SYMPTOME', eio(prog(t, 13.3, 13.7)), K.tealD)}`;
}
