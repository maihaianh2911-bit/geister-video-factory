// L17 53.76–57.08 same evening, different talk: both wash the dishes together; the pile shrinks, they smile.
import { K, frame, person, sink, heart, cam, prog, eio, eout, f1, lerp } from './lib.js';
import { kitchen, GY } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t, { sink: false, du: 420, er: 660 });
  const n = Math.max(1, Math.round(lerp(7, 2, prog(t, 53.9, 56.6))));
  s += sink(540, 1000, n);
  const wipe = Math.sin(t * 5) * 14;
  // du washes (hands at the sink), Er dries a plate with a towel
  s += person('du', 420, GY, 1, { t, seed: 1, eyes: 'happy', mouth: 'smile', look: [10, 0], armR: [110 + wipe, -330] });
  const plate = `<g transform="translate(${f1(-100)} ${f1(-300 + wipe * .5)})"><ellipse rx="54" ry="12" fill="#f4f1ea" stroke="${K.ink}" stroke-width="4"/><rect x="-30" y="-6" width="40" height="40" rx="6" fill="#e8c55a" stroke="${K.ink}" stroke-width="3"/></g>`;
  s += person('er', 660, GY, 1, { t, seed: 2, eyes: 'happy', mouth: 'smile', look: [-10, 0], armL: [-100, -300 + wipe * .5], front: plate });
  const h = prog(t, 55.4, 57.0);
  if (h > 0) s += heart(540, lerp(720, 600, h), .9, '#f07b8c', Math.max(0, 1 - h) * 1);
  return frame(cam(s, 540, 1000, 1.06 - .04 * eio(prog(t, 53.76, 57.08))));
}
