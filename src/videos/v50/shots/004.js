// 4.0–6.15 · "noch bevor du es genießen kannst" — chewing happily at the table, then the smile freezes
import { P, parlour, girl, table, cam, prog, eio, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const z = lerp(1.0, 1.1, eio(prog(t, 4.0, 6.15)));
  const freeze = t >= 5.72;
  const chew = freeze ? 0 : Math.abs(Math.sin(t * 9));
  const jolt = freeze ? 10 * Math.exp(-(t - 5.72) * 8) * Math.sin((t - 5.72) * 50) : 0;
  const nod = freeze ? 0 : 5 * Math.sin(t * 4.5);
  return `<g transform="${cam(z, 540, 950, 540, 950)}">${parlour(t)}
    <g transform="translate(${jolt} 0)">${girl(540, 1300, 1.55, { t, id: 's4', hold: 'cone', handR: [170, 10], bite: 1, biteSide: -1,
      eyes: freeze ? 'wide' : 'happy', mouth: freeze ? 'o' : 'chew', chew, tilt: nod, cheek: freeze ? 0 : .9 + .1 * chew, blush: .6 })}</g>
    ${table(1330)}</g>`;
}
