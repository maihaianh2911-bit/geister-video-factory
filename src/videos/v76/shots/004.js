// 5.275–6.85 ("Eingriff" 5.86): du is awake — medium shot on the head end of the table; eyes go from the lamp to the surgeon, head lifts slightly.
import { DEFS, cam, prog, eio, lerp } from './lib.js';
import { orScene } from './or.js';
export default function renderShot(t) {
  const turn = eio(prog(t, 5.55, 5.95)), lift = 14 * eio(prog(t, 5.95, 6.35));
  const sc = orScene(t, { lift, face: { look: lerp(-.2, 1, turn), lookY: lerp(-1, -.2, turn), brow: .45 * turn, eyes: 'open', mouth: turn > .6 ? 'down' : 'flat' }, saw: 'hand', sawUp: 1 });
  return `${DEFS}${cam(sc, 1.9, 330, 940, 210, 0)}`;
}
