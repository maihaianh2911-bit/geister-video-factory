// L14 62.74–65.54: daylight living room: the leftover clouds of the whole week dissolve one after another (62.9–65.2, "löst sich auf" 63.94); the room brightens, the sun appears in the window, du smiles.
import { K, frame, cam, prog, eio, person, shadow } from './lib.js';
import { room } from './sets.js';
import { cloud } from './clouds.js';
import { sun } from './props.js';
import { fgTable } from './fg.js';
const CL = [[200, 360, 300, 62.9], [520, 280, 340, 63.25], [860, 360, 300, 63.6], [330, 560, 300, 63.95], [760, 580, 300, 64.3], [560, 470, 260, 64.65]];
export default function renderShot(t) {
  const b = eio(prog(t, 62.9, 65.3));
  let s = room(t, { mood: 'day', hh: 10, mm: 0 });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#0b0e18" opacity="${(.4 * (1 - b)).toFixed(2)}"/>`;
  s += sun(890, 380, 44, t, b);
  s += shadow(540, 1640);
  s += person('du', 540, 1640, 1, { t, seed: 1, look: [0, -12], brows: b > .5 ? 'up' : 'calm', mouth: b > .4 ? 'smile' : 'small', eyes: b > .8 ? 'happy' : 'n' });
  CL.forEach(([x, y, w, t0], i) => { s += cloud(x, y, w, { t, seed: 40 + i, dark: .8, gone: eio(prog(t, t0, t0 + .6)) }); });
  s += fgTable(t, { mugX: 200, keys: 760 });
  return frame(cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 62.74, 65.54))));
}
