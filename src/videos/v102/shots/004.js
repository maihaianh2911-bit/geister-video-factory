// L1b 6.88–9.84: close-up of du in the fully grey street; on "Gefährliche" (7.2) a red warning sign pops up beside him,
// but du keeps smiling and does not look at it; on "kaum merken" (8.96) he shrugs happily.
import { K, frame, cam, prog, eio, person, pop, fade, f1, op } from './lib.js';
import { street } from './sets2.js';
import { farbeBar, colourAt, grey } from './common.js';
const INK = K.ink;
function warn(x, y, p, t) {
  if (p <= 0) return '';
  const pulse = 1 + .05 * Math.sin(t * 9);
  return `<g transform="translate(${x} ${y}) scale(${f1(p * pulse * 1000) / 1000})"><path d="M 0 -130 L 125 90 L -125 90 Z" fill="#d9493f" stroke="${INK}" stroke-width="10" stroke-linejoin="round"/><rect x="-12" y="-60" width="24" height="90" rx="10" fill="#fff"/><circle cx="0" cy="58" r="14" fill="#fff"/></g>`;
}
export default function renderShot(t) {
  let s = street(t, { strong: true });
  s += grey(1 - colourAt(t));
  const sh = eio(prog(t, 8.9, 9.3)) * (1 - eio(prog(t, 9.5, 9.84)) * .4);
  s += person('du', 400, 2110, 1.75, { t, seed: 1, eyes: t > 8.96 ? 'happy' : 'n', look: [-6, -4], brows: 'up', mouth: t > 7.6 ? 'smile' : 'small',
    armL: [-120 - 170 * sh, -380 - 200 * sh], elbowL: [-250, -400], armR: [120 + 170 * sh, -380 - 200 * sh], elbowR: [250, -400], headTilt: -6 * sh });
  s = cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 6.88, 9.84)));
  s += warn(800, 560, pop(t, 7.2, .4), t);
  s += farbeBar(colourAt(t));
  return frame(s);
}
