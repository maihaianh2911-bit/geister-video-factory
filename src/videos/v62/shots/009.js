// Closer on the vessels: the small vessels that feed the nerve are squeezed — the blood dots back up and stop on "versorgen", the nerve turns dull.
import { K, xsec, cam, prog, eio, lerp } from './lib.js';

export default function renderShot(t) {
  const flow = 1 - eio(prog(t, 15.0, 15.5));
  const dim = eio(prog(t, 15.5, 16.4));
  return cam(540, 960, lerp(1.45, 1.6, prog(t, 14.9, 16.8)), xsec(t, { press: 1, flow, dim }), 900);
}
