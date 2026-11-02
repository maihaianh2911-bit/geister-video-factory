// L11 44.46–46.8: the camera moves to the GEFÜHL gauge (right, blue), which rises high on "fühlten sich" (45.12–45.9); caption NUR EIN BISSCHEN MÜDE pops on "bisschen müde" (46.0). The LEISTUNG gauge stays low and red: the contrast is visible side by side.
import { prog, eio, lerp, pop } from './lib.js';
import { gauges } from './gauges.js';
export default function renderShot(t) {
  const r = lerp(0, .86, eio(prog(t, 45.1, 45.95)));
  return gauges(t, { l: .14, lc: 1, la: 1, r, rc: pop(t, 46.0, .45), ra: 1, cx: lerp(470, 560, eio(prog(t, 44.46, 45.3))), sc: 1.06 - .04 * eio(prog(t, 44.46, 46.8)) });
}
