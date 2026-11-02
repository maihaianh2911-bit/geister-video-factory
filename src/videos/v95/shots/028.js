// L20 77.86–82.60: final: warm evening, du hugs herself and smiles; a heart floats up; labels "SPRICH MIT DIR" (77.86) / "WIE MIT DEINER" (79.06) / "BESTEN FREUNDIN" (79.76).
import { K, frame, cam, shadow, label, pool, prog, eio, pop, f1 } from './lib.js';
import { room, fgTable } from './sets.js';
import { duSp, GREEN } from './base.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', clock: false });
  const hug = eio(prog(t, 78.2, 78.8));
  s += pool(540, 900, 400, 400, '#ffd98a', .2 * hug);
  s += shadow(540, 1640) + duSp(540, 1640, 1.0, { t, look: [0, -4], brows: 'calm', eyes: 'happy', mouth: 'smile', armL: [lerpN(-140, 100, hug), lerpN(-300, -420, hug)], elbowL: [-200, -380], armR: [lerpN(140, -100, hug), lerpN(-300, -380, hug)], elbowR: [200, -340] }, { ...GREEN, talk: 0, p: .5 });
  const hp = pop(t, 80.04, .5), hy = 660 - 40 * prog(t, 80.04, 82.6);
  if (hp > 0) s += `<path d="M 540 ${f1(hy)} c -40 -50 -110 -10 -70 50 l 70 70 l 70 -70 c 40 -60 -30 -100 -70 -50 Z" fill="#e2577a" stroke="${K.ink}" stroke-width="6" transform="translate(540 ${f1(hy + 40)}) scale(${f1(Math.max(.01, hp))}) translate(-540 ${f1(-hy - 40)})"/>`;
  s += fgTable(t, { mugX: 170, phone: 700, glass: 920 });
  s = cam(s, 540, 1100, 1.0 + .07 * eio(prog(t, 77.86, 82.6)));
  s += label('SPRICH MIT DIR', 540, 220, 92, { fill: '#fff', p: pop(t, 77.86, .4) });
  s += label('WIE MIT DEINER', 540, 330, 76, { p: pop(t, 79.06, .4) });
  s += label('BESTEN FREUNDIN', 540, 430, 80, { p: pop(t, 79.76, .4) });
  return frame(s);
}
const lerpN = (a, b, p) => a + (b - a) * p;
