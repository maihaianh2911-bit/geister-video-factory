// L9a 37.9–39.98: MITTWOCHABEND. Dark cold living room, wide→medium push: du drops onto the sofa ("sitzt" 38.42) and slumps ("erschöpft" 38.8). Battery 30 %.
import { frame, cam, pop, prog, eio, ein, dayCard, room, sitOnSofa, batOver, duBat, shadow } from './all.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 40, sofa: false, light: .35 });
  const drop = ein(prog(t, 38.2, 38.5)), sl = eio(prog(t, 38.6, 39.3));
  const yOff = -60 * (1 - drop);
  s += shadow(540, 1640, 420);
  s += sitOnSofa('du', 540, 1330 + yOff, 1.0, { t, seed: 1, eyes: 'tired', brows: 'sad', mouth: 'frown', hunch: sl, look: [0, 10], drops: [38.5] }, { x: 540 });
  s += batOver(540, 1330 + yOff + 150, 1.0, duBat(t).lvl, { t, hunch: sl, bdy: 40 * sl });
  s = cam(s, 540, 1100, 0.92 + .14 * eio(prog(t, 37.9, 39.98)));
  s += dayCard(t, 37.95, 'MITTWOCHABEND', { size: 92 });
  return frame(s, { base: '#1c2230' });
}
