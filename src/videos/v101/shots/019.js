// L10a 45.4–49.2: our brain (pink) with a red magnifying glass that glides over bad things (late bus, rain cloud, red X) and stops on them ("das Schlechte" 48.12); the good things (sun, coffee, heart) stay small and grey at the side.
import { K, frame, cam, prog, eio, pop, label, T, f1, op, lerp } from './lib.js';
import { brain, magnifier } from './sets2.js';
import { icons, BAD, GOOD, bg } from './icons.js';
export default function renderShot(t) {
  let s = bg(t);
  s += brain(540, 560, 1.2, t);
  BAD.forEach(([k, x, y], i) => { s += icons(x, y, 2.0 * pop(t, 45.8 + i * .25, .35), k); });
  GOOD.forEach(([k, x, y]) => { s += icons(x, y, 1.0, k, .35); });
  // magnifier path: from the brain down over the bad things, settling on the cloud for "Schlechte"
  const p = prog(t, 46.6, 48.2), seg = Math.min(2, Math.floor(p * 3)), f = eio(p * 3 - seg);
  const P = [[230, 1060], [850, 1060], [540, 1140], [540, 1140]];
  const mx = lerp(P[seg][0], P[seg + 1][0], f), my = lerp(P[seg][1], P[seg + 1][1], f);
  const appear = eio(prog(t, 46.2, 46.6));
  if (appear > 0) {
    let inner = '';
    BAD.forEach(([k, x, y]) => { inner += icons(x + (x - mx) * .5, y + (y - my) * .5, 3.0, k); });
    s += `<g opacity="${op(appear)}">${magnifier(mx, my, 175, '#d9493f', `<rect x="-200" y="-200" width="1480" height="2320" fill="#ffe5e5"/>` + inner, 'r19')}</g>`;
  }
  s = cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 45.4, 49.2)));
  s += label('DAS GEHIRN', 540, 250, 96, { p: pop(t, 45.6, .45), fill: '#ffffff' });
  return frame(s);
}
