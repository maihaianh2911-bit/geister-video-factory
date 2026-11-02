// L8b 34.72–38.82: split frame: left label on "Tisch" (36.4), phone lies beside the test; right label on "Nebenraum" (37.6), the phone sits on a shelf in the next room.
import { frame, cam, prog, eio } from './lib.js';
import { split } from './split.js';
export default function renderShot(t) {
  const s = split({ t, aL: 35.78, aR: 37.42, glowL: .2 + .2 * Math.max(0, Math.sin(t * 3)) });
  return frame(cam(s, 540, 960, 1.0 + .04 * eio(prog(t, 34.72, 38.82))));
}
