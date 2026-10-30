// Blood flows again: the red dots start moving through the vessel on "Versorgung erholt sich", the capillaries refill and the nerve regains colour.
import { K, xsec, cam, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const f = eio(prog(t, 34.0, 34.6));
  return cam(540, 960, lerp(1.35, 1.5, prog(t, 33.94, 35.9)), xsec(t, { press: 0, flow: f, dim: lerp(1, .35, eio(prog(t, 34.5, 35.6))) }), 860);
}
