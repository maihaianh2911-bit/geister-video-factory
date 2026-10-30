// If the tingling stays: the sparkles keep fizzing on the foot while the clock runs past the usual few minutes and its rim turns red on "bestehen".
import { K, BG, footCU, tingle, clock, prog, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const fr = lerp(.75, 1.6, eio(prog(t, 62.4, 64.4)));
  const warn = prog(t, 63.2, 63.4);
  return BG + `<rect x="0" y="1180" width="1080" height="740" fill="${K.floor}"/><path d="M 0 1180 H 1080" stroke="${K.ol}" stroke-width="5"/>
   ${footCU(380, 1180, 1.3, { numb: .7 })}
   ${tingle(t, 560, 1130, 230, 70, .9, 5, 30, 0, 1.4)}
   ${clock(780, 380, 150, fr % 1)}
   <circle cx="780" cy="380" r="160" fill="none" stroke="${K.red}" stroke-width="${12 * warn}" opacity="${warn}"/>`;
}
