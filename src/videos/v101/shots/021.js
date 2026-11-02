// L11 51.56–53.78: the magnifier swaps its red frame for warm gold ("das Gute" 52.4) and now shows the good things big (sun, coffee, heart); the bad icons fade to grey.
import { K, frame, cam, prog, eio, pop, label, lerp, op } from './lib.js';
import { brain, magnifier } from './sets2.js';
import { icons, BAD, GOOD, bg } from './icons.js';
import { orb } from './jar.js';
export default function renderShot(t) {
  let s = bg(t);
  s += brain(540, 560, 1.2, t);
  const sw = eio(prog(t, 52.2, 52.6)), fade = eio(prog(t, 52.3, 52.8));
  BAD.forEach(([k, x, y]) => { s += icons(x, y, 1.3 - .5 * fade, k, 1 - .65 * fade); });
  GOOD.forEach(([k, x, y]) => { s += icons(x, y, .8 + .5 * fade, k, .35 + .65 * fade); });
  const p = eio(prog(t, 52.4, 53.6)), mx = lerp(540, lerp(220, 860, p), sw), my = lerp(1160, 1300, sw);
  const col = sw < .5 ? '#d9493f' : '#f2b632';
  let inner = `<rect x="-200" y="-200" width="1480" height="2320" fill="${sw < .5 ? '#ffe5e5' : '#fff4d0'}"/>`;
  (sw < .5 ? BAD : GOOD).forEach(([k, x, y]) => { inner += icons(x + (x - mx) * .6, y + (y - my) * .6, 2.1, k); });
  s += magnifier(mx, my - 10, 120, col, inner, 'g21');
  if (sw > .5) s += orb(mx, my - 200, 18, sw, t);
  s = cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 51.56, 53.78)));
  s += label('TRAINIERBAR', 540, 250, 96, { p: pop(t, 53.3, .45) });
  return frame(s);
}
