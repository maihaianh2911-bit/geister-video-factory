// L2b 7.06–9.84: close-up of du in the grey street with a coffee cup, content and unaware; on "Gefährliche" (7.2) a small red warning "!" blinks beside him; on "kaum merken" (8.96–9.22) he sips, shrugs and smiles. du stays in colour.
import { K, frame, cam, prog, eio, person, mug, pop, f1 } from './lib.js';
import { street } from './sets2.js';
import { fadeWorld, bar } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = street(t, { strong: true }) + fadeWorld(t);
  const sip = eio(prog(t, 8.5, 8.9)) * (1 - eio(prog(t, 9.3, 9.7)));
  const sh = Math.sin(Math.PI * prog(t, 9.0, 9.5)) * 16;
  s += person('du', 470, 2140, 1.75, { t, seed: 1, look: [10, -6 + 10 * sip], brows: 'calm', mouth: sip > .5 ? 'small' : 'smile', eyes: sip > .5 ? 'happy' : 'n', headDy: -sh, armR: [40, -470 - 60 * sip], elbowR: [210, -360], front: mug(60, -430 - 60 * sip, 1.2, '#f2c14e', t) });
  const w = pop(t, 7.2, .4), on = Math.floor(t * 3) % 2 === 0 || t < 7.8;
  if (w > 0 && t < 8.9) s += `<g transform="translate(840 600) scale(${f1(Math.max(.01, w) * 1600) / 1000})"><path d="M 0 -80 L 78 60 L -78 60 Z" fill="${on ? '#d9493f' : '#8a3a34'}" stroke="${INK}" stroke-width="8" stroke-linejoin="round"/><path d="M 0 -34 V 18" stroke="#fff" stroke-width="16" stroke-linecap="round"/><circle cx="0" cy="40" r="9" fill="#fff"/></g>`;
  s = cam(s, 540, 900, 1.0 + .07 * eio(prog(t, 7.06, 9.84)));
  s += bar(t);
  return frame(s);
}
