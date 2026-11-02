// L6a 26.76–28.34: card ABENDS; dark blue living room, du presses a hand to his lower back and winces on "Rücken" (27.78); both clouds still above.
import { K, frame, cam, prog, eio, pop, label, person, shadow } from './lib.js';
import { room } from './sets.js';
import { fgTable } from './fg.js';
import { cloud, gloom } from './clouds.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 20, mm: 30, light: .55 });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0b0e18" opacity=".25"/>` + gloom(600, 900, 560, 600, .45, 'h');
  const w = eio(prog(t, 27.6, 27.95));
  s += shadow(600, 1640);
  s += person('du', 600, 1640, 1, { t, seed: 1, look: [-6, 6], brows: w > .3 ? 'strain' : 'worried', mouth: w > .3 ? 'wavy' : 'frown', eyes: w > .5 ? 'half' : 'n', hunch: .25 + .25 * w, lean: 4 * w, armL: [-150, -260], elbowL: [-230, -420], drops: [27.8] });
  s += cloud(400, 520, 440, { t, seed: 11, dark: .9, lines: ['Ich verliere', 'meinen Job.'], size: 44 });
  s += cloud(800, 430, 440, { t, seed: 21, dark: .88, lines: ['Ist sie sauer', 'auf mich?'], size: 44 });
  s += fgTable(t, { mugX: 200, remote: 700 });
  s = cam(s, 600, 1000, 1.0 + .05 * eio(prog(t, 26.76, 28.34)));
  s += label('ABENDS', 540, 250, 110, { p: pop(t, 26.82, .45) });
  return frame(s);
}
