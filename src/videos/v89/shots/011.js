// L10 32.66–36.2 Lena shrugs "Reiner Zufall" (speech); her thought: "Was sie hat, will ich auch."
import { K, frame, bg, shadow, person, speech, thought, cam, hearLvl, prog, eio, eout, pop, fade, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('hall');
  s += shadow(320, 1330) + shadow(760, 1330);
  const shrug = eio(prog(t, 32.66, 33.0)) * (1 - eio(prog(t, 34.2, 34.6)));
  const sly = t > 34.6;
  s += person('du', 320, 1330, 1, { t, seed: 1, hear: hearLvl(t, [34.74]), jacket: true, eyes: t > 35.0 ? 'wide' : 'n', brows: t < 35.0 ? 'mean' : null, mouth: 'flat', look: [10, 0] });
  s += person('lena', 760, 1330, 1, { t, seed: 2, jacket: true, eyes: sly ? 'sly' : 'happy', mouth: sly ? 'smirk' : 'grin', look: sly ? [-14, 6] : [-8, 0],
    armL: shrug > .03 ? [-80 - 50 * shrug, -212 - 130 * shrug] : null, armR: shrug > .03 ? [80 + 50 * shrug, -212 - 130 * shrug] : null });
  s += speech(470, 700, 'Reiner Zufall', 715, 880, { p: pop(t, 32.66, .4), a: t > 34.74 ? .55 : undefined });
  s += thought(790, 470, ['Was sie hat,', 'will ich auch.'], 800, 805, { p: pop(t, 34.74, .45) });
  return frame(cam(s, 540, 1000, 1.03 + .05 * eio(prog(t, 32.66, 36.2))));
}
