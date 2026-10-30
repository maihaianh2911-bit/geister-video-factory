// The foot on the floor: the sparkles thin out and the colour returns as the clock moves on — gone within a few minutes ("wenigen Minuten").
import { K, BG, footCU, tingle, clock, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const f = eio(prog(t, 47.6, 51.0));
  return BG + `<rect x="0" y="1180" width="1080" height="740" fill="${K.floor}"/><path d="M 0 1180 H 1080" stroke="${K.ol}" stroke-width="5"/>
   ${footCU(380, 1180, 1.3, { numb: lerp(.9, 0, f) })}
   ${tingle(t, 560, 1130, 230, 70, 1 - f, 5, 30, 0, 1.4)}
   ${clock(780, 380, 150, lerp(0, .75, eio(prog(t, 47.6, 50.6))))}`;
}
