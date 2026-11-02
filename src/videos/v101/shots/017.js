// L9b 41.32–43.02: at the shop counter a customer (hair clip, red top) gives du a thumbs-up ("Lob" 41.5); du smiles, a light sparks.
import { K, frame, cam, prog, eio, person, shadow, lerp, f1 } from './lib.js';
import { cafe } from './sets.js';
import { orb } from './jar.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = cafe(t);
  const th = eio(prog(t, 41.4, 41.7)), sm = eio(prog(t, 41.8, 42.1));
  s += person('du', 300, 1660, 1, { t, seed: 1, look: [14, 0], brows: sm > .5 ? 'up' : 'calm', mouth: sm > .5 ? 'grin' : 'small', legs: false });
  const thumb = `<g transform="translate(${f1(lerp(-150, -180, th))} ${f1(lerp(-300, -620, th))})"><circle r="28" fill="${INK}"/><rect x="-10" y="-62" width="20" height="44" rx="10" fill="${INK}"/></g>`;
  s += person('kun', 780, 1660, 1, { t, seed: 5, look: [-14, 0], brows: 'up', mouth: 'smile', legs: false, armL: [lerp(-150, -180, th), lerp(-300, -620, th)], elbowL: [-250, -460], front: thumb });
  s += `<path d="M -60 1400 H 1140 V 2000 H -60 Z" fill="#6e4a36" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1400" width="1200" height="24" fill="#8a6248"/>`;
  s += orb(540, 560, 24, eio(prog(t, 41.7, 42.0)), t);
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 41.32, 43.02))));
}
