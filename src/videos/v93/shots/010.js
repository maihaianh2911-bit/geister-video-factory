// L7a 26.42–29.0 Medium on the colleague at her desk: tired eyes with shadows, cold coffee; her thought bubble rises on "Blase" (27.04),
// text starts on "Ich habe" (27.74).
import { K, frame, cam, setOffice, officeDesk, person, thought, pop, prog } from './lib.js';
import { push } from './base.js';
const L = ['Ich habe die ganze Nacht', 'im Krankenhaus bei', 'meinem Vater gesessen.'];
export default function renderShot(t) {
  let s = setOffice(t);
  s += person('kol', 560, 1660, 1.6, { t, seed: 11, eyes: 'tired', brows: 'sad', mouth: 'sad', look: [0, 6], headTilt: -4 });
  s += officeDesk(1440, { kx: 400, mx: 760 });
  s += thought(540, 470, L, 560, 760, { p: pop(t, 27.04, .45), size: 50, w: 760, h: 260, text: prog(t, 27.74, 30.5) });
  return frame(cam(s, 560, 1000, push(t, 26.42, 29.0, 1.0, 1.07)), { tint: ['#6f7f99', .08] });
}
