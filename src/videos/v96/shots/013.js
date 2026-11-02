// L8a 31.96–34.72: lecture hall: rows of students; front row works on hard puzzles ("Denkaufgaben" 33.78) – puzzle sheets pop on the desks.
import { K, frame, cam, person, prog, eio, pop, paper, T, label } from './lib.js';
import { hall } from './sets.js';
const INK = K.ink;
function puzzle(x, y, rot, p, k) {
  if (p <= 0) return '';
  const inner = k % 2 ? `<g stroke="${INK}" stroke-width="5" fill="none"><path d="M -60 -20 l 40 -24 l 40 24 l -40 24 Z M -60 -20 v 50 l 40 24 v -50 M 20 -20 v 50 l -40 24"/></g>${T(60, 10, '?', 60, { fill: '#d9493f' })}` : `${T(0, -20, '3 · 9 · 27', 34, { fill: INK, w: 800 })}${T(0, 40, '?', 52, { fill: '#d9493f' })}`;
  return `<g transform="translate(${x} ${y}) scale(${p.toFixed(3)})">${paper(0, 0, 240, 170, rot, inner, { lines: false })}</g>`;
}
export default function renderShot(t) {
  let s = hall(t);
  s += person('stu1', 200, 1600, .78, { t, seed: 2, look: [6, 16], mouth: 'flat', brows: 'strain', legs: false });
  s += person('stu4', 540, 1610, .78, { t, seed: 4, look: [-4, 16], mouth: 'flat', brows: 'worried', legs: false });
  s += person('stu3', 880, 1600, .78, { t, seed: 6, look: [-8, 16], mouth: 'small', brows: 'strain', legs: false });
  const y = 1330;
  s += `<path d="M -60 ${y} H 1140 V 2000 H -60 Z" fill="#8a6a4a" stroke="${INK}" stroke-width="6"/><rect x="-60" y="${y}" width="1200" height="24" fill="#a8845e"/>`;
  s += puzzle(200, 1250, -4, pop(t, 33.78, .35), 0) + puzzle(540, 1255, 3, pop(t, 33.9, .35), 1) + puzzle(860, 1250, -2, pop(t, 34.0, .35), 0);
  s = cam(s, 540, 1000, 1.03, 30 - 60 * eio(prog(t, 31.96, 34.72)));
  s += label('HUNDERTE STUDIERENDE', 540, 230, 74, { p: pop(t, 32.0, .45) });
  return frame(s);
}
