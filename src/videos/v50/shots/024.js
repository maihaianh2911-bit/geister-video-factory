// 44.86–47.0 · "Der Schmerz verschwindet meist von selbst" — the red glow fades, her face relaxes, hand comes down
import { P, parlour, girl, cam, prog, eio, eout, lerp } from '../lib.js';

export default function renderShot(t) {
  const f = eio(prog(t, 45.3, 46.0));
  const lower = eio(prog(t, 45.7, 46.2));
  const smile = t > 46.2;
  return `<g transform="${cam(lerp(1.12, 1.0, eout(prog(t, 44.86, 47.0))), 540, 900, 540, 900)}">${parlour(t)}
    ${girl(540, 1380, 1.7, { t, id: 's24', hold: 'cone', handR: [200, 60], bite: 1, biteSide: -1, handL: [lerp(-20, -215, lower), lerp(-300, 420, lower)], palmL: lower < .5 ? 8 : 0,
      eyes: f < .4 ? 'half' : (smile ? 'happy' : 'open'), brow: 1 - f, mouth: f < .4 ? 'flat' : (smile ? 'smile' : 'soft'), painFore: 1 - f })}</g>`;
}
