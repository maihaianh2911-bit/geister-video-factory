// 55.14–58.72 avoid the future traitor: the kid walks away from a grey child; the hidden crossed fingers show on "verraten"
import { K, kid, chip, fade, pop, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#cfe6f3"/><rect x="0" y="1180" width="1080" height="740" fill="#9fcf86"/><path d="M 0 1180 Q 540 1140 1080 1180" fill="none" stroke="#7cb565" stroke-width="10"/>`;
  // playground slide
  s += `<path d="M 130 1180 L 130 820 L 230 820 L 230 1180" stroke="${K.ol}" stroke-width="10" fill="none"/><path d="M 230 820 Q 360 980 420 1180" stroke="${K.red}" stroke-width="30" fill="none"/><path d="M 130 900 L 230 900 M 130 980 L 230 980 M 130 1060 L 230 1060" stroke="${K.ol}" stroke-width="8"/>`;
  // the other child (grey hair, purple shirt) waving friendly, fingers crossed behind the back
  const rev = fade(t, 57.36, .3);
  s += kid(800, 1330, .9, { shirt: '#9a84c9', stripe: '#7a64ab', hairC: '#3b3340', hairHi: '#5a5160', noTuft: 1, aL: [12, 6], aR: [140, 20], mouth: rev > .5 ? 'flat' : 'smile', brows: rev > .5 ? 'angry' : 'calm', look: [-14, 0] });
  // crossed fingers behind the back (shown on reveal)
  s += `<g opacity="${f1(rev * 100) / 100}" transform="translate(${800 - 70} ${1330 - 150})"><circle r="56" fill="${K.red}" opacity=".25"/><rect x="-14" y="-40" width="18" height="50" rx="9" fill="${K.skin}" stroke="${K.ol}" stroke-width="4" transform="rotate(-14)"/><rect x="-2" y="-40" width="18" height="50" rx="9" fill="${K.skin}" stroke="${K.ol}" stroke-width="4" transform="rotate(16)"/><circle cx="0" cy="16" r="20" fill="${K.skin}" stroke="${K.ol}" stroke-width="4"/></g>`;
  s += chip(800, 560, 'VERRÄT DICH SPÄTER', { a: rev, sc: pop(t, 57.36), bg: K.red, size: 40 });
  // our kid turns and walks away to the left
  const go = eio(prog(t, 55.42, 57.2));
  const bob = Math.abs(Math.sin(t * 9)) * 10 * (go > 0 && go < 1 ? 1 : 0);
  s += kid(lerp(480, 230, go), 1330 - bob, .9, { aL: [12, 6], aR: [12, 6], mouth: 'flat', brows: 'angry', look: [-14, 0], lean: -4 * (go > 0 && go < 1 ? 1 : 0) });
  return s;
}
