// L9b 38.22–41.4: two-shot: the colleague says „Mit dir kann man so gut reden.“ (speech bubble 39.48); du smiles.
import { K, frame, cam, person, prog, eio, pop, speech } from './lib.js';
import { canteen } from './sets.js';
import { heart } from './common.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = canteen(t);
  const talk = t > 39.4 && t < 40.9 && Math.sin(t * 15) > 0;
  s += person('kol', 300, 1640, 1, { t, seed: 5, look: [14, -2], brows: 'up', mouth: talk ? 'talk' : 'grin', legs: false, armL: [-120, -480] });
  s += person('du', 790, 1650, .95, { t, seed: 1, look: [-14, 0], brows: 'calm', mouth: 'smile', legs: false });
  s += `<path d="M -60 1400 H 1140 V 2000 H -60 Z" fill="#a8744a" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1400" width="1200" height="24" fill="#c9a26b"/>`;
  s += speech(430, 500, ['„Mit dir kann man', 'so gut reden.“'], 330, 760, { p: pop(t, 39.48, .4), size: 54 });
  s += heart(790, 700, .8, pop(t, 40.6, .4));
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 38.22, 41.4))));
}
