// L4a 14.82–16.58: close-up du, eyes on the tall paper stack beside them; a new bundle lands on it on "genug" (15.44), du sweats.
import { frame, cam, head, pop, prog, eio, ein, office2, stack, batOver, duBat, battery, K } from './all.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  s += head('du', 380, 1120, 1.65, { t, seed: 1, look: [16, 4], brows: t > 15.5 ? 'worried' : 'calm', mouth: t > 15.5 ? 'wavy' : 'flat', sweat: t > 15.6 ? 1 : 0 });
  s += `<path d="M 30 1900 C 50 1560 180 1440 380 1440 C 580 1440 710 1560 730 1900 Z" fill="${K.du}" stroke="${K.ink}" stroke-width="6"/>`;
  // desk + stack (sharp, right)
  s += `<path d="M 560 1480 H 1140 V 2000 H 560 Z" fill="#c9a77c" stroke="${K.ink}" stroke-width="6"/><rect x="560" y="1480" width="580" height="24" fill="#dcbd95"/>`;
  s += stack(840, 1490, 14, 1.15);
  const f = ein(prog(t, 15.1, 15.44)), land = t >= 15.44 ? Math.exp(-(t - 15.44) * 9) * Math.cos((t - 15.44) * 30) * 10 : 0;
  s += `<g transform="translate(0 ${-(1 - f) * 700 + land})">` + `<rect x="740" y="${1490 - 14 * 34 * 1.15 - 70}" width="210" height="70" rx="4" fill="#f4ecd6" stroke="${K.ink}" stroke-width="5"/><path d="M 760 ${1490 - 14 * 34 * 1.15 - 35} H 930" stroke="#c9d6e6" stroke-width="4"/></g>`;
  s = cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 14.82, 16.58)));
  s += battery(380, 480, 1.0, duBat(t).lvl, { t });
  return frame(s);
}
