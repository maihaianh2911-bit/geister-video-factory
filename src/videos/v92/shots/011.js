// L10 31.82–35.4 the dish pile swells into a dark argument cloud that covers both ("ganze Beziehung").
import { K, frame, person, sink, cam, prog, eio, eout, pop, f1, lerp } from './lib.js';
import { kitchen, DU, ER, GY } from './base.js';
function cloud(cx, cy, r, a) {
  let s = '';
  [[-1, 0, .7], [-.5, -.45, .8], [.1, -.6, .9], [.65, -.35, .75], [1, .05, .6], [0, .1, 1]].forEach(([dx, dy, k]) => { s += `<circle cx="${f1(cx + dx * r)}" cy="${f1(cy + dy * r)}" r="${f1(r * .55 * k)}" fill="#3d3f4c"/>`; });
  return `<g opacity="${f1(a * 100) / 100}">${s}</g>`;
}
export default function renderShot(t) {
  let s = kitchen(t, { sink: false });
  const g = eio(prog(t, 32.5, 34.6));
  const n = Math.round(lerp(7, 16, eio(prog(t, 32.5, 33.4))));
  s += person('du', DU, GY, 1, { t, seed: 1, hear: .6, eyes: g > .6 ? 'wide' : 'sad', mouth: 'flat', look: [8, -10] });
  s += person('er', ER, GY, 1, { t, seed: 2, eyes: g > .6 ? 'wide' : 'sad', mouth: 'flat', look: [-8, -10] });
  s += sink(540, 1000, n);
  if (g > 0) {
    s += cloud(540, lerp(760, 560, g), lerp(80, 360, g), Math.min(1, g * 1.6));
    const fl = t > 34.58 && Math.sin(t * 30) > 0;
    if (g > .7) s += `<path d="M 470 520 L 540 640 L 505 650 L 580 780" stroke="${fl ? '#ffe37a' : K.yellow}" stroke-width="14" fill="none" stroke-linejoin="round"/>`;
  }
  return frame(cam(s, 540, 1000, 1.02));
}
