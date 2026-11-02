// L5 22.38–25.38: the colleague (glasses, blue shirt) turns to du on "dreht sich um" (22.8): white bubble "Wer redet denn so mit dir?" (23.8).
import { K, frame, cam, person, speech, prog, eio, pop } from './lib.js';
import { meeting, meetingTable } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = meeting(t);
  const turn = eio(prog(t, 22.8, 23.2));
  s += person('coll', 300, 1640, 1.0, { t, seed: 2, look: [-16 + 32 * turn, 0], brows: turn > .5 ? 'worried' : 'calm', mouth: turn > .5 ? 'talk' : 'flat', headTilt: 6 * turn });
  s += duSp(790, 1660, .96, { t, look: [-16, 4], brows: 'sad', mouth: 'flat', eyes: 'tired' }, { talk: 0, side: -1 });
  s += meetingTable(1400);
  s += speech(400, 470, ['„Wer redet denn', 'so mit dir?“'], 330, 760, { p: pop(t, 23.8, .4), size: 54 });
  return frame(cam(s, 540, 1100, 1.0 + .06 * eio(prog(t, 22.38, 25.38))));
}
