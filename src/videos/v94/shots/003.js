// L1b 7.84–10.28: close-up — exhausted du looks up; a warm light opens on "Ausweg/leichter": a sheet of paper and a pen glow beside him.
import { K, frame, cam, street, person, wash, light, note, pen, prog, eio, eout, lerp, cl, pop, f1, op } from './lib.js';
export default function renderShot(t) {
  const warm = eio(prog(t, 8.5, 9.4));
  let s = street({ dx: 40 }) + wash('#2a3044', .45 - .25 * warm);
  s += light(740, 470, 360, 360, '#ffd98a', .2 + .5 * warm);
  const X = 400, Y = 2030, S = 2.75;
  s += person('du', X, Y, S, {
    t, seed: 1, load: 1.3, nStones: 6, hunch: .5 * (1 - warm),
    eyes: warm > .5 ? 'wide' : 'tired', brows: warm > .5 ? 'up' : 'worried', mouth: warm > .6 ? 'smile' : 'strain',
    look: [lerp(4, 14, eio(prog(t, 8.1, 8.6))), lerp(10, -12, eio(prog(t, 8.1, 8.6)))], rim: warm > 0 ? '#ffd98a' : null, sweat: .7 * (1 - warm),
  });
  const p = pop(t, 8.24, .5);
  if (p > 0) {
    const fy = 470 + Math.sin(t * 2) * 10;
    s += `<g transform="translate(740 ${f1(fy)}) scale(${f1(p * 1000) / 1000})">${light(0, 0, 300, 260, '#fff3b0', .6)}${note(0, 0, .8, -6, ['Was? Wann? Wo?'], [warm])}${pen(230, 60, 1, 28)}</g>`;
  }
  s = cam(s, 540, 900, 1 + .05 * eio(prog(t, 7.84, 10.28)) + .04 * eout(prog(t, 8.9, 9.3)));
  return frame(s, { vig: .65 - .15 * warm });
}
