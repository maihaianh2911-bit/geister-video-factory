// L7b 29.0–31.38 Close-up colleague: she rubs her eyes with one hand (exhausted); bubble keeps filling; a hospital-cross icon
// appears on "Krankenhaus" (29.02), the last words land on "Vater gesessen" (30.08–30.46).
import { K, frame, cam, setOffice, person, thought, icon, pop, prog, eio, lerp } from './lib.js';
import { push, CU } from './base.js';
const L = ['Ich habe die ganze Nacht', 'im Krankenhaus bei', 'meinem Vater gesessen.'];
export default function renderShot(t) {
  let s = setOffice(t, { heavy: true });
  const r = eio(prog(t, 29.1, 29.6)) * (1 - eio(prog(t, 30.7, 31.2)));
  const rub = Math.sin(t * 9) * 6 * r;
  s += person('kol', 540, CU.y, CU.s, { t, seed: 11, eyes: r > .5 ? 'closed' : 'tired', brows: 'sad', mouth: 'sad', look: [-4, 6], armR: [lerp(90, 34 + rub, r), lerp(-160, -428, r)], headTilt: -4 * r, rimL: '#ffffff' });
  const ip = pop(t, 29.02, .4);
  s += thought(540, 340, L, 560, 600, { size: 50, w: 780, h: 270, text: .45 + .55 * prog(t, 29.0, 30.6), inner: ip > 0 ? `<g transform="translate(176 214) scale(${Math.min(ip, 1.2)})">${icon.cross(0, 0, 1)}</g>` : '' });
  return frame(cam(s, 540, 900, push(t, 29.0, 31.38, 1.02, 1.09)), { tint: ['#6f7f99', .1] });
}
