// L6b 26.06–28.42: bubble: the colleague (bun, purple top) holds the office door open with a smile (26.3); "2. Tür aufgehalten" is written ("Tür" 27.12).
import { K, frame, cam, prog, eio, pop, person, lerp } from './lib.js';
import { diary } from './page.js';
import { picBubble } from './jar.js';
const INK = K.ink;
function doorPic(t) {
  const o = eio(prog(t, 26.3, 26.9));
  let s = `<rect x="-210" y="-150" width="420" height="300" fill="#dfe6ee"/><rect x="-210" y="100" width="420" height="50" fill="#a9aaa6"/>`;
  s += `<rect x="20" y="-130" width="150" height="240" fill="#5a6672"/><rect x="28" y="-122" width="134" height="232" fill="#f0dcb0"/>`;
  s += `<path d="M 28 -122 L ${lerp(162, 70, o)} ${lerp(-122, -136, o)} L ${lerp(162, 70, o)} ${lerp(110, 124, o)} L 28 110 Z" fill="#c9a26b" stroke="${INK}" stroke-width="4"/>`;
  s += person('kol2', -60, 150, .42, { t, seed: 6, look: [12, 0], brows: 'calm', mouth: 'smile', armR: [260, -330], elbowR: [210, -420] });
  return s;
}
export default function renderShot(t) {
  let s = diary(t, [-1, 27.0, Infinity], { id: 'b' });
  s += picBubble(540, 400, 420, 300, 600, 700, pop(t, 26.2, .4), doorPic(t), 'k11');
  return frame(cam(s, 540, 900, 1.03 + .05 * eio(prog(t, 26.06, 28.42))));
}
