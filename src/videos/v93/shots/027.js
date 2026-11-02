// L18a 73.32–76.1 Morning train, medium: a passenger with headphones squeezes in and his bag bumps du on "nervt" (74.44);
// du starts to frown, then stops on "frag dich zuerst" (74.88): hand to chin, brows soften, a small "?" appears.
import { K, frame, cam, setTrain, trainFG, person, shadow, chip, impact, pop, prog, eio, lerp } from './lib.js';
import { push, handPt } from './base.js';
export default function renderShot(t) {
  let s = setTrain(t, { morning: true });
  const m = eio(prog(t, 73.4, 74.44)), px = lerp(1200, 720, m);
  const bump = t > 74.44, think = t > 74.88;
  s += shadow(330, 1620, 170) + person('du', 330, 1620, 1.6, { t, seed: 2, armR: think ? [60, -380] : undefined, armL: [-70, -560], tilt: bump && !think ? -3 : 0, look: [9, think ? -3 : 0], brows: think ? 'soft' : bump ? 'angry' : 'flat', eyes: bump && !think ? 'mean' : 'n', mouth: think ? 'flat' : bump ? 'grim' : 'flat' });
  s += shadow(px, 1590, 160) + person('p4', px, 1590, 1.5, { t, seed: 21, walk: m < 1 ? t * 1.8 : undefined, eyes: 'tired', brows: 'sad', mouth: 'flat', look: [-4, 6], front: `<rect x="-150" y="-260" width="110" height="130" rx="18" fill="#6b5a46" stroke="${K.ink}" stroke-width="5"/>` });
  s += impact(520, 1260, prog(t, 74.44, 74.85));
  s += chip(520, 560, '?', { p: pop(t, 74.88, .35), size: 90, bg: '#fff' });
  s += trainFG(1030, { hand: handPt(330, 1620, 1.6, [-70, -560], bump && !think ? -3 : 0) });
  return frame(cam(s, 540, 1000, push(t, 73.32, 76.1, 1.0, 1.07)), { tint: ['#f4b45c', .06] });
}
