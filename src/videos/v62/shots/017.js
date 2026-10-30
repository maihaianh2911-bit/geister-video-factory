// Cross-section: the weight lifts off on "lässt der Druck nach" — the nerve and the vessel round out again (still pale, flow not yet back).
import { K, xsec, cam, prog, eio } from './lib.js';
export default function renderShot(t) {
  return cam(540, 880, 1.3, xsec(t, { press: 1 - eio(prog(t, 32.5, 32.95)), flow: 0, dim: 1, showBlock: false }), 820);
}
