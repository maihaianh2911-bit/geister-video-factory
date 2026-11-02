// L15b 82.90–85.10: close-up mother, moved: "Das hat mir lange keiner mehr gesagt." (82.96); eyes close, tear, soft smile.
import { frame, cam, pop, prog, eio, person, speech, phone } from './lib.js';
import { kitchen } from './sets.js';
export default function renderShot(t) {
  let s = kitchen(t, { strong: true });
  s += `<rect width="1080" height="1920" fill="#3a2440" opacity=".38"/><ellipse cx="540" cy="900" rx="600" ry="600" fill="#ffb86b" opacity=".14"/>`;
  s += person('mama', 600, 2300, 1.65, { t, seed: 5, look: [-6, 4], eyes: t > 84.0 ? 'happy' : 'n', brows: 'sad', mouth: t > 84.0 ? 'smile' : 'talk', tear: .8 + .2 * prog(t, 83, 85), armL: [-150, -720], elbowL: [-260, -500], holdL: phone(0, 0, .5, -15) });
  s += speech(520, 380, ['„Das hat mir lange', 'keiner mehr gesagt.“'], 560, 700, { p: pop(t, 82.96, .4), size: 58 });
  return frame(cam(s, 560, 1050, 1 + .06 * eio(prog(t, 82.9, 85.1))));
}
