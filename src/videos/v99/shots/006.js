// L3b 13.28–15.44: close-up of the phone in du's hand: chat with "Chef" (moustache avatar); the message "Hast du heute kurz Zeit?" pops in (13.3) after the typing dots.
import { K, frame, cam, prog, eio, pop } from './lib.js';
import { office2 } from './sets.js';
import { chatPhone } from './props.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#1d2430" opacity=".25"/>`;
  const pm = pop(t, 13.32, .4);
  s += chatPhone(t, 540, 820, 1.75, { id: 'c6', name: 'Chef', who: 'chef', clock: '08:47', status: 'online', typing: pm > 0 ? 0 : 1, buzz: t > 13.32 && t < 13.9 ? 1 : 0, rot: -3 + Math.sin(t * 1.2) * 1.2,
    msgs: [{ lines: ['Guten Morgen.'], time: '08:12', p: 1, size: 28 }, { lines: ['Hast du heute', 'kurz Zeit?'], time: '08:47', p: pm, size: 34 }] });
  // du's hand holding the phone from below (black dot hand + teal sleeve)
  s += `<path d="M 300 1500 Q 380 1380 430 1330" stroke="${INK}" stroke-width="92" fill="none" stroke-linecap="round"/><path d="M 300 1500 Q 380 1380 430 1330" stroke="${K.du}" stroke-width="74" fill="none" stroke-linecap="round"/><circle cx="440" cy="1320" r="44" fill="${INK}"/>`;
  return frame(cam(s, 540, 820, 1.0 + .07 * eio(prog(t, 13.28, 15.44))));
}
