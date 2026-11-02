// L6 26.56–29.24: corridor medium shot: du takes the invitation and says "Ich komme gern." (27.1); the battery drops 80→60 %, yellow, on "Sechzig" (28.5).
import { frame, cam, shadow, person, speech, pop, prog, eio, corridor, invite, batOver, duBat } from './all.js';
export default function renderShot(t) {
  let s = corridor(t);
  const g = eio(prog(t, 27.4, 27.9)), d = t >= 28.5;
  s += shadow(330, 1660) + shadow(770, 1660);
  s += person('bek', 770, 1660, .95, { t, seed: 7, flip: true, look: [12, 0], brows: 'calm', mouth: t > 27.9 ? 'grin' : 'smile', armR: g < .5 ? [190, -380] : null });
  s += person('du', 330, 1660, .95, { t, seed: 1, look: d ? [0, -12] : [14, 0], eyes: 'tired', brows: d ? 'sad' : 'worried', mouth: t > 27.0 && t < 28.1 ? 'talk' : 'flat', armR: g > .5 ? [170, -380] : null });
  const cx = 770 - 190 * .95 + ((330 + 170 * .95) - (770 - 190 * .95)) * g;
  s += invite(cx, 1660 - 380 * .95 - 60, .75, -6);
  const b = duBat(t);
  s += batOver(330, 1660, .95, b.lvl, { t, bs: .95, drop: b.drop });
  s = cam(s, 540, 1000, 1.02 + .05 * eio(prog(t, 26.56, 29.24)), 25 * prog(t, 26.56, 29.24));
  s += speech(700, 300, 'Ich komme gern.', 440, 640, { p: pop(t, 27.1), size: 62 });
  return frame(s);
}
