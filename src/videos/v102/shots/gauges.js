// v102 the two gauges (LEISTUNG left, GEFÜHL right) over the dark lab
import { frame, cam, prog, eio, lerp } from './lib.js';
import { lab, gauge } from './kit.js';
export function gauges(t, o) {
  let s = lab(t, { strong: true }) + `<rect x="-200" y="-200" width="1480" height="2320" fill="#14152e" opacity=".5"/>`;
  s += gauge(290, 420, o.l, '#d9493f', 'LEISTUNG', ['WIE NACH EINER', 'DURCHWACHTEN', 'NACHT'], { cap: o.lc, a: o.la });
  s += gauge(790, 420, o.r, '#3b8fe0', 'GEFÜHL', ['NUR EIN', 'BISSCHEN MÜDE'], { cap: o.rc, a: o.ra });
  return frame(cam(s, o.cx, 900, o.sc));
}
