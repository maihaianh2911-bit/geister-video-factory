// L10 39.08–44.46: the LEISTUNG gauge (left, red) drops from full to very low between "Reaktion" (40.02) and "Konzentration" (41.06–41.8); on "durchwachten Nacht" (42.92) the caption WIE NACH EINER DURCHWACHTEN NACHT pops under it. The GEFÜHL gauge waits dimmed on the right. No numbers.
import { prog, eio, lerp, pop } from './lib.js';
import { gauges } from './gauges.js';
export default function renderShot(t) {
  const l = lerp(.92, .14, eio(prog(t, 40.0, 41.9)));
  return gauges(t, { l, lc: pop(t, 42.9, .45), la: 1, r: 0, rc: 0, ra: .35, cx: lerp(540, 470, eio(prog(t, 39.08, 44.46))), sc: 1.0 + .06 * eio(prog(t, 39.08, 44.46)) });
}
