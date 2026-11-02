// L17 71.48–73.80: kitchen, du stands holding the note: with each line a stone drops out of the bag to the floor (VERMIETER 72.14 … WÄSCHE 73.5); he straightens up.
import { K, frame, person, cam, shadow, outStone, packMouth, paper, T, prog, eio } from './lib.js';
import { kitchen } from './sets.js';
import { LB } from './base.js';
const OUT = [72.14, 72.55, 72.9, 73.2, 73.5];
const FLOOR = [[150, 1660], [300, 1700], [80, 1760], [250, 1790], [400, 1770]];
export default function renderShot(t) {
  let s = kitchen(t);
  const k = OUT.filter(x => t >= x).length;
  const x = 600;
  const up = eio(prog(t, 72.1, 73.7));
  s += shadow(x, 1640);
  s += person('du', x, 1640, 1, { t, pack: { n: 5 - k, labels: LB.slice(k) }, hunch: .45 * (1 - up), drops: OUT, look: [-14, 6], brows: up > .5 ? 'up' : 'worried', mouth: up > .4 ? 'smile' : 'flat', armR: [230, -520], elbowR: [260, -380], front: paper(240, -620, 200, 240, 6, T(0, -40, 'Mo 8:00', 26, { fill: '#22324d', w: 700 }) + T(0, 10, 'Mittags', 26, { fill: '#22324d', w: 700 }), { lines: false }) });
  OUT.forEach((t0, i) => {
    const [mx, my] = packMouth(x, 1640, 1, 5 - i, { hunch: .45 });
    s += outStone(t, t0, mx, my, FLOOR[i][0], FLOOR[i][1], LB[i], .95, .45, (i % 2 ? -1 : 1) * 20);
  });
  return frame(cam(s, 540, 1150, 1.04 + .05 * eio(prog(t, 71.48, 73.8))));
}
