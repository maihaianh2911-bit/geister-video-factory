// L9 39.08–44.46: result gauge LEISTUNG: a stopwatch pops on "Reaktion" (40.02), a target on "Konzentration" (41.06);
// on "schlecht" (42.02) the full green bar sinks to a low red level; on "durchwachten Nacht" (42.92) the text WIE NACH EINER DURCHWACHTEN NACHT appears.
// The second gauge (GEFÜHL) waits empty on the right.
import { frame, cam, prog, eio, pop, lerp, label } from './lib.js';
import { labBg, gauge, stopwatch, target, lines } from './graph.js';
export default function renderShot(t) {
  let s = labBg(t);
  const d = eio(prog(t, 42.0, 42.9));
  const v = lerp(.92, .16, d);
  const col = d > .5 ? '#d9493f' : '#3c9a5f';
  s += gauge(300, 600, 520, v, col);
  s += gauge(780, 600, 520, 0, '#3c9a5f', .35);
  const sw = pop(t, 40.02, .4), tg = pop(t, 41.06, .4);
  if (sw > 0) s += stopwatch(190, 470, 1.2 * sw, t);
  if (tg > 0) s += target(410, 470, 1.2 * tg);
  s += lines(300, 1210, ['LEISTUNG:'], 60, '#ffffff', eio(prog(t, 39.2, 39.6)));
  s += lines(300, 1290, ['WIE NACH EINER', 'DURCHWACHTEN', 'NACHT'], 46, '#ff8a80', eio(prog(t, 42.92, 43.3)));
  s = cam(s, 540, 880, 1.0 + .05 * eio(prog(t, 39.08, 44.46)), 60 - 60 * eio(prog(t, 39.08, 44.46)));
  s += label('NACH 14 NÄCHTEN', 540, 330, 80, { p: pop(t, 39.15, .45), fill: '#ffffff' });
  return frame(s);
}
