// L17 68.40–73.24: close-up in the sunny bathroom: du speaks kindly to herself: white bubble "Du hast schlecht geschlafen." (69.62), then "Der Tag kann trotzdem gut werden." (71.2); she smiles.
import { K, frame, cam, speech, prog, eio, pop } from './lib.js';
import { bathroom } from './sets.js';
import { duSp, GREEN } from './base.js';
export default function renderShot(t) {
  let s = bathroom(t, { mood: 'sun', strong: true });
  const talk = (t > 69.62 && t < 70.9 || t > 71.2 && t < 72.8) && Math.sin(t * 14) > 0;
  const sm = eio(prog(t, 72.4, 72.9));
  s += duSp(470, 2080, 1.5, { t, look: [0, -6], brows: 'calm', eyes: sm > .5 ? 'happy' : 'n', mouth: talk ? 'talk' : (t > 71 ? 'smile' : 'small') }, { ...GREEN, talk: 0, p: .9 });
  const one = 1 - eio(prog(t, 70.95, 71.2));
  s += speech(560, 340, ['„Du hast schlecht', 'geschlafen.“'], 470, 640, { p: pop(t, 69.62, .4) * one, size: 58 });
  s += speech(560, 340, ['„Der Tag kann', 'trotzdem gut', 'werden.“'], 470, 640, { p: pop(t, 71.2, .4), size: 58, fill: '#eafff0' });
  return frame(cam(s, 540, 960, 1.0 + .06 * eio(prog(t, 68.4, 73.24))));
}
