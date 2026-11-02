// L17b 78.8–81.972: cutaway: the phone stays on the kitchen counter, du at the desk in the study; the door between the rooms closes on "anderen Raum" (80.14–80.6). End beat.
import { K, frame, cam, person, prog, eio, pop, label } from './lib.js';
import { twoRooms } from './sets.js';
import { hourglass, phoneDown, hgPos, screenGlow } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  const door = eio(prog(t, 80.1, 80.6));
  let s = twoRooms(t, { door });
  s += `<path d="M -60 1230 H 470 V 2000 H -60 Z" fill="#a8744a" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1230" width="530" height="24" fill="#c9a26b"/>` + phoneDown(220, 1242, .85, 2);
  const o = { t, seed: 1, look: [6, 16], brows: 'calm', mouth: t > 80.8 ? 'smile' : 'flat', legs: false };
  s += person('du', 820, 1690, .82, o);
  const [hx, hy] = hgPos(820, 1690, .82, o);
  s += hourglass(hx, hy, .62, { t, id: 'h28', glow: .05 });
  s += `<rect x="620" y="1330" width="520" height="30" fill="#8a6a4a" stroke="${INK}" stroke-width="5"/><rect x="640" y="1360" width="480" height="240" fill="#7a5a3e" stroke="${INK}" stroke-width="5"/><rect x="660" y="1400" width="200" height="70" rx="6" fill="#6a4c34" stroke="${INK}" stroke-width="4"/><circle cx="760" cy="1435" r="8" fill="#c9a86a"/><rect x="740" y="1290" width="200" height="40" fill="#fbf8ef" stroke="${INK}" stroke-width="4"/>`;
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 78.8, 81.97)));
  s += label('ANDERER RAUM', 540, 250, 100, { p: pop(t, 80.2, .45) });
  return frame(s);
}
