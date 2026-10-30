// The nerve works again: bright signals race along it on "nehmen ihre Arbeit wieder auf", the nerve glows full yellow.
import { K, xsec, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const on = eio(prog(t, 36.2, 36.5));
  return cam(540, 960, lerp(1.3, 1.45, prog(t, 35.9, 38.08)), xsec(t, { press: 0, flow: 1, dim: .35 * (1 - on), signal: on }), 900);
}
