// L3 11.54–15.04 du stands up, face hot (red cheeks); a spotlight falls on du and eyes stare from the dark on "Alle starren".
import { K, frame, bg, shadow, person, spotlight, darkEyes, cam, prog, eio, eout, f1 } from './lib.js';
export default function renderShot(t) {
  const dark = eio(prog(t, 13.4, 13.8));
  let s = bg('office');
  s += `<rect width="1080" height="1920" fill="#0e0f14" opacity="${f1(dark * 82) / 100}"/>`;
  s += spotlight(540, 1330, 420, dark);
  s += shadow(540, 1330);
  const blush = eio(prog(t, 11.9, 12.4));
  const heat = t > 12.0 ? `<g stroke="#ff7a5a" stroke-width="6" stroke-linecap="round" fill="none" opacity="${f1(blush * 90) / 100}">${[-40, 0, 40].map((dx, i) => `<path d="M ${dx} ${-560 - 10 * Math.sin(t * 6 + i)} q 10 -16 0 -32 q -10 -16 0 -32"/>`).join('')}</g>` : '';
  s += person('du', 540, 1330, 1, { t, seed: 1, hear: .6, blush, eyes: 'wide', mouth: 'sad', look: [Math.sin(t * 3) * 10, 0], armL: [-100, -320], armR: [100, -320], front: heat, headDy: 6 });
  s += darkEyes([[140, 760, 1], [300, 640, .8], [880, 700, 1], [960, 960, .8], [120, 1060, .9], [760, 560, .7]], dark, [0, 0]);
  return frame(cam(s, 540, 1000, 1 + .06 * eio(prog(t, 11.54, 15.04))));
}
