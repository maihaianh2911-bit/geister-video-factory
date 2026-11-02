// L8 28.7–32.92 DONNERSTAG in a small bar: the friend (yellow cap, orange hoodie) asks du with a "?" and, on "Freundin", presents his new girlfriend (red headband, green top), who waves.
import { K, frame, bg, shadow, person, speech, glass, dayCard, cam, prog, eio, eout, pop, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('bar');
  s += shadow(230, 1360, 95) + shadow(620, 1360, 95) + shadow(880, 1360, 95);
  const show = eio(prog(t, 31.6, 32.0));
  const wave = t > 31.9 ? Math.sin((t - 31.9) * 10) * 30 : 0;
  s += person('gf', 880, 1360, .9, { t, seed: 6, eyes: 'happy', mouth: 'smile', look: [-10, 0], armR: show > .2 ? [110 + wave * .3, -470 + wave] : null });
  s += person('cap', 620, 1360, .9, { t, seed: 5, eyes: 'happy', mouth: 'grin', look: t < 31.6 ? [-12, 0] : [10, 0],
    armR: [lerp(90, 210, show), lerp(-250, -330, show)], armL: t > 30.2 && t < 31.6 ? [-150, -330] : null });
  s += person('du', 230, 1360, .9, { t, seed: 1, look: t < 31.6 ? [10, -2] : [14, 0], mouth: 'flat', armR: [80, -250] });
  s += glass(330, 1080, .9) + glass(520, 1080, .9, '#c96a52');
  s += `<rect x="-20" y="1080" width="1120" height="40" rx="10" fill="#94664a" stroke="${K.ink}" stroke-width="5"/>`;
  s += speech(560, 700, 'Und? Wie findest du sie?', 600, 860, { p: pop(t, 30.22, .38), size: 46 });
  s = cam(s, 560, 1000, 1 + .05 * eio(prog(t, 28.7, 32.92)));
  s += dayCard(t, 28.7, 'DONNERSTAG', { size: 104 });
  return frame(s);
}
