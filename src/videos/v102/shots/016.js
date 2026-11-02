// L9 35.2–39.08: a big 14-day calendar over the blurred lab: from "schliefen" (35.54) to "sechs Stunden" (37.96) the 14 boxes fill one by one with a moon and "6 h" (two weeks, every night only six hours).
import { frame, cam, prog, eio, label, pop } from './lib.js';
import { lab, calendar14 } from './kit.js';
export default function renderShot(t) {
  let s = lab(t, { strong: true }) + `<rect x="-200" y="-200" width="1480" height="2320" fill="#14152e" opacity=".45"/>`;
  const n = 14 * prog(t, 35.54, 38.0);
  s += calendar14(540, 720, n, t, { title: '2 WOCHEN' });
  s = cam(s, 540, 860, 1.0 + .05 * eio(prog(t, 35.2, 39.08)));
  s += label('JEDE NACHT NUR 6 h', 540, 1260, 72, { p: pop(t, 37.4, .45), fill: '#fff' });
  return frame(s);
}
