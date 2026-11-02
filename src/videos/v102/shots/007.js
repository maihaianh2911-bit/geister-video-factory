// L3 13.96–18.0: kitchen in the morning; du stands left with a coffee mug, the big window shows the sky.
// On "blasser" (15.42) the sky and the room turn paler (meter 86 → 70 %); on "bemerkst es nicht" (16.9) du sips the coffee, eyes closed.
import { K, frame, cam, prog, eio, person, shadow, mug, f1 } from './lib.js';
import { kitchen } from './sets.js';
import { farbeBar, colourAt, grey } from './common.js';
export default function renderShot(t) {
  let s = kitchen(t, {});
  const pale = eio(prog(t, 15.3, 16.2));
  s += `<rect x="300" y="240" width="460" height="480" fill="#e4e7ea" opacity="${(.45 * pale).toFixed(2)}"/>`;
  s += grey(1 - colourAt(t));
  const sip = eio(prog(t, 16.8, 17.3));
  const hx = 150 + 20 * sip, hy = -330 - 290 * sip;
  s += shadow(270, 1660);
  s += person('du', 270, 1660, 1, { t, seed: 1, look: sip > .5 ? [0, 0] : [-8, 14], eyes: sip > .6 ? 'closed' : 'n', mouth: 'small',
    armR: [hx, hy], elbowR: [230, -330 - 60 * sip], front: `<g transform="translate(${f1(hx + 10)} ${f1(hy + 30)})">${mug(0, 0, 1, '#f2efe8', t, true)}</g>` });
  s = cam(s, 540, 1000, 1.0 + .06 * eio(prog(t, 13.96, 18.0)), 20 * eio(prog(t, 13.96, 18)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
