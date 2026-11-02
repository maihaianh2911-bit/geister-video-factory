// L15b 70.54–72.72: cutaway: phone left on the kitchen counter; du walks through the door into the study and sits down at the desk ("setzt" 71.94).
import { K, frame, cam, person, shadow, prog, eio, lerp } from './lib.js';
import { twoRooms, desk } from './sets.js';
import { hourglass, phoneDown, hgPos } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = twoRooms(t, { door: 0 });
  s += `<path d="M -60 1230 H 470 V 2000 H -60 Z" fill="#a8744a" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1230" width="530" height="24" fill="#c9a26b"/>` + phoneDown(220, 1242, .85, 2);
  const w = eio(prog(t, 70.54, 71.8)), x = lerp(560, 800, w), sit = eio(prog(t, 71.8, 72.1));
  const s0 = .82, y = 1620 + sit * 70;
  const o = { t, seed: 1, walk: w < 1 ? (t * 1.6) % 1 : undefined, look: [12, 10], brows: 'calm', mouth: 'flat', legs: sit < .5 };
  s += shadow(x, 1620, 150) + person('du', x, y, s0, o);
  const [hx, hy] = hgPos(x, y, s0, o);
  s += hourglass(hx, hy, .62, { t, id: 'h25', glow: .1 });
  s += `<rect x="620" y="1330" width="520" height="30" fill="#8a6a4a" stroke="${INK}" stroke-width="5"/><rect x="640" y="1360" width="480" height="240" fill="#7a5a3e" stroke="${INK}" stroke-width="5"/><rect x="660" y="1400" width="200" height="70" rx="6" fill="#6a4c34" stroke="${INK}" stroke-width="4"/><circle cx="760" cy="1435" r="8" fill="#c9a86a"/><rect x="840" y="1230" width="200" height="100" rx="8" fill="#f2efe8" stroke="${INK}" stroke-width="4"/>`;
  return frame(cam(s, 540, 1100, 1.0 + .04 * eio(prog(t, 70.54, 72.72))));
}
