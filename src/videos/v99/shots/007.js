// L4a 15.44–17.42: close-up of du: quick push-in, his face goes pale (wide eyes, worried brows, sweat), the room cools; on "Wolke" (16.4) a dark cloud slides in over his head.
import { K, frame, cam, prog, eio, eout, person } from './lib.js';
import { office2 } from './sets.js';
import { cloud, gloom } from './clouds.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  const pale = eio(prog(t, 15.5, 16.2)), c = eio(prog(t, 16.1, 16.8));
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#22324a" opacity="${(.15 + .3 * c).toFixed(2)}"/>` + gloom(540, 900, 560, 600, .5 * c, 'e');
  s += person('du', 540, 2230, 1.75, { t, seed: 1, look: [-4, pale > .5 ? 0 : 8], brows: pale > .3 ? 'worried' : 'up', mouth: pale > .3 ? 'o' : 'small', eyes: pale > .3 ? 'wide' : 'n', sweat: pale, drops: [15.55] });
  s += cloud(540 - 700 * (1 - c), 440, 560, { t, seed: 11, dark: .55 + .35 * c, a: c, p: c > 0 ? 1 : 0 });
  const k = 1.0 + .12 * eout(prog(t, 15.44, 15.8)) + .03 * prog(t, 15.8, 17.42);
  return frame(cam(s, 540, 900, k));
}
