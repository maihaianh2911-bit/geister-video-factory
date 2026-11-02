// L11 48.22–50.68: close on du's face in bed; on "gute Nachricht" (49.16) warm golden light floods in and his face opens up.
import { K, frame, cam, light, wash, prog, eio, eout, lerp, cl, pop, f1, op } from './lib.js';
import { bedScene } from './015.js';
export default function renderShot(t) {
  const g = eio(prog(t, 48.9, 49.6));
  let s = bedScene(t, { press: .6 * (1 - g), hope: g > .5 ? 1 : 0, strain: 0 });
  s += wash('#ffcf6a', .1 * g) + light(950, 200, 420, 420, '#ffe7a0', .15 + .45 * g);
  for (let i = 0; i < 7; i++) { const a = 2.2 + i * .16; s += `<path d="M 1080 0 L ${f1(1080 + Math.cos(a) * 1400)} ${f1(Math.sin(a) * 1400)} L ${f1(1080 + Math.cos(a + .06) * 1400)} ${f1(Math.sin(a + .06) * 1400)} Z" fill="#fff3c0" opacity="${op(.08 * g)}"/>`; }
  s = cam(s, 540, 620, 1.55 + .1 * eio(prog(t, 48.22, 50.68)), 0, 220);
  return frame(s, { vig: .7 - .3 * g });
}
