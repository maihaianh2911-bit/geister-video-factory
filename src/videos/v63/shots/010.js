// 18.5–20.4: in the pit lies a round bronze disc, freshly damaged at the rim (runde Scheibe aus Bronze)
import { K, DEFS, disc, grain, cam, prog, eout, eio, lerp } from './lib.js';
import { soilBg } from './soil.js';
export default function renderShot(t) {
  const dirt = lerp(.55, .1, eio(prog(t, 18.5, 19.4)));
  return `${DEFS}${cam(soilBg(3) + disc(540, 900, 330, { id: 'j', dirt, damage: true, glow: .3 * prog(t, 19.2, 19.6) }), lerp(1.15, 1.25, eio(prog(t, 18.5, 20.4))), 540, 900)}${grain(t)}`;
}
