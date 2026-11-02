// L4b 17.42–21.22: office, du hunched behind the desk under the cloud; thought bubble "Ich habe etwas falsch gemacht." (17.42–19.1), then the cloud carries "Ich verliere meinen Job." (19.28) and darkens. Glass door CHEF behind.
import { K, frame, cam, prog, eio, fout, pop, person, thought, T } from './lib.js';
import { office2, desk } from './sets.js';
import { cloud, gloom } from './clouds.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = office2(t);
  s += `<rect x="-200" y="-200" width="1480" height="2320" fill="#22324a" opacity=".3"/>`;
  // glass door of the boss's office (sharp, mid-ground)
  s += `<rect x="640" y="560" width="300" height="520" fill="#cfe3ee" opacity=".75" stroke="#5a6672" stroke-width="12"/><rect x="700" y="640" width="180" height="56" rx="6" fill="#fff" stroke="${INK}" stroke-width="4"/>${T(790, 682, 'CHEF', 40, { fill: K.txt })}<rect x="900" y="820" width="16" height="70" rx="6" fill="#5a6672"/>`;
  s += gloom(380, 900, 460, 520, .45, 'f');
  const h = eio(prog(t, 19.2, 20.4));
  s += person('du', 380, 1640, 1, { t, seed: 1, look: [6, 10], brows: 'worried', mouth: 'frown', hunch: .3 + .4 * h, sweat: .6 });
  s += desk(t, { y: 1300, monX: 820, monitor: true, mugX: 120, kbX: 420 });
  s += thought(770, 300, ['Ich habe etwas', 'falsch gemacht.'], 440, 640, { p: pop(t, 17.45, .4), a: fout(t, 18.95, .3), size: 50 });
  const cw = 520 + 60 * h;
  s += cloud(320, 580, cw, { t, seed: 11, dark: .8 + .15 * h, lines: t >= 19.28 ? ['Ich verliere', 'meinen Job.'] : [], size: 54 });
  return frame(cam(s, 480, 1000, 1.0 + .05 * eio(prog(t, 17.42, 21.22)), 20 * prog(t, 17.42, 21.22)));
}
