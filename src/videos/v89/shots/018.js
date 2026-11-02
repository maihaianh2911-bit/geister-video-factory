// L17 55.8–58.81 finger on the lips ("Erzähl ihr nur nicht mehr…"), the phone goes into the pocket ("zuerst").
import { K, frame, bg, shadow, person, speech, phone, cam, prog, eio, eout, pop, fade, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('cafe', { sc: 1.05 });
  // Lena in the background, chatting with someone (out of focus)
  s += `<g filter="url(#blur8)" opacity=".75">${person('lena', 860, 1130, .62, { t, seed: 2, eyes: 'happy', mouth: 'grin', look: [-8, 0], armR: [130, -320 + Math.sin(t * 6) * 14] })}</g>`;
  s += shadow(470, 1340);
  const shh = eio(prog(t, 55.85, 56.2)) * (1 - eio(prog(t, 57.9, 58.3)));
  const pk = eio(prog(t, 57.0, 57.6));   // phone to the pocket
  const lh = [lerp(-120, -60, pk), lerp(-300, -150, pk)];
  const ph = pk < .98 ? phone(lh[0] + 6, lh[1] - 46, .5, { rot: -10 + 10 * pk }) : '';
  const pocket = `<path d="M -62 -190 h 50 v 46 q -25 12 -50 0 Z" fill="#268a80" stroke="${K.ink}" stroke-width="4"/>`;
  s += person('du', 470, 1340, 1.05, { t, seed: 1, armR: shh > .02 ? [lerp(78, 14, shh), lerp(-212, -372, shh)] : null, armL: lh, overBody: pocket, front: ph, face: shh > .6 ? `<rect x="-9" y="18" width="18" height="62" rx="9" fill="${K.du}" stroke="${K.ink}" stroke-width="4"/>` : '', eyes: 'n', mouth: shh > .4 ? 'shh' : 'flat', look: [-6, 0] });
  // the pocket's front edge is drawn over the phone as it slides in
  if (pk > .3 && pk < .98) s += `<g transform="translate(470 1340) scale(1.05)"><path d="M -62 -190 h 50" stroke="${K.ink}" stroke-width="4"/></g>`;
  return frame(cam(s, 470, 1000, 1.02 + .05 * eio(prog(t, 55.8, 58.81))));
}
