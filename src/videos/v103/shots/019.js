// L12b 60.18–63.6: at the open front door (stairwell light) the old du puts on his hat (60.3–61.0), turns back and smiles: speech bubble
// "Ich habe dir nichts Neues erzählt." then "Du wusstest es schon." on 62.12; young du in the foreground listens.
import { K, frame, cam, prog, eio, pop, person, shadow, speech, f1, lerp } from './lib.js';
import { entry, hat } from './sets3.js';
import { old, talk } from './common.js';
export default function renderShot(t) {
  let s = entry(t, { open: 1 });
  const hp = eio(prog(t, 60.3, 61.0));
  const ox = 735, oy = 1205, sc = .78;
  // head centre of the old du (hunch .3)
  const hx = ox + sc * 5.4, hy = oy + sc * (-713 + .3 * 95);
  const handPos = [lerp(-150, 10, hp), lerp(-300, -880, hp)];
  s += old(t, ox, oy, sc, { look: [-10, 6], eyes: t > 62.12 ? 'happy' : 'n', brows: 'calm', mouth: talk(t, 60.2, 63.2, 'smile'), armL: hp < 1 ? handPos : undefined, elbowL: [-190, -560] });
  // the hat: in his hand, then on his head
  const hatX = hp < 1 ? ox + sc * handPos[0] : hx, hatY = hp < 1 ? oy + sc * handPos[1] + 10 : hy - sc * 120;
  s += hat(hatX, hatY, sc * (.9 + .1 * hp));
  s += shadow(240, 1780, 210);
  s += person('du', 240, 1780, 1.1, { t, seed: 1, look: [16, -12], brows: t > 62.12 ? 'up' : 'calm', mouth: 'small' });
  s = cam(s, 680, 900, 1.05 + .07 * eio(prog(t, 60.18, 63.6)));
  s += t < 62.12 ? speech(620, 300, ['Ich habe dir nichts', 'Neues erzählt.'], 680, 470, { p: pop(t, 60.2, .4), size: 52 })
                 : speech(620, 330, ['Du wusstest es schon.'], 680, 470, { p: pop(t, 62.12, .4), size: 56 });
  return frame(s);
}
