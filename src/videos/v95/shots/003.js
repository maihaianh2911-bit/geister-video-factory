// L1a 5.22–7.60: "NACH 1 TAG": du on the sofa in the evening, tired; the speaker beside her blares red waves at her.
import { K, frame, cam, shadow, label, spiky, pop, prog, eio } from './lib.js';
import { room, fgTable } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 22, mm: 30 });
  s += shadow(520, 1640) + duSp(520, 1640, 1, { t, hunch: .5, eyes: 'tired', brows: 'sad', mouth: 'frown', look: [12, 6] }, { talk: 1 });
  s += spiky(810, 560, ['…!'], 790, 760, { p: pop(t, 6.14, .4), size: 46 });
  s += fgTable(t, { mugX: 880, phone: 160 });
  s = cam(s, 540, 1100, 1.02 + .06 * eio(prog(t, 5.22, 7.6)), -30 * prog(t, 5.22, 7.6), 0);
  s += label('NACH 1 TAG', 540, 250, 104, { p: pop(t, 5.44, .45) });
  return frame(s);
}
