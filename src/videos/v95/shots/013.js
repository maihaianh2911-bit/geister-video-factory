// L7 30.20–32.46: canteen, wider: at the next table two people stop eating and stare at du ("plötzlich still" 31.38); du shrinks.
import { K, frame, cam, person, shadow, prog, eio, f1 } from './lib.js';
import { canteen } from './sets.js';
import { duSp } from './base.js';
export default function renderShot(t) {
  let s = canteen(t, { crowd: false });
  const st = eio(prog(t, 31.2, 31.6));
  const chew = Math.sin(t * 12) > 0 && st < .5;
  s += person('stu1', 760, 1500, .8, { t, seed: 3, look: [-16 * st, 0], eyes: st > .5 ? 'wide' : 'n', mouth: st > .5 ? 'flat' : (chew ? 'o' : 'small') });
  s += person('stu2', 990, 1500, .8, { t, seed: 6, look: [-16 * st, 0], eyes: st > .5 ? 'wide' : 'n', mouth: st > .5 ? 'flat' : 'small', brows: st > .5 ? 'up' : 'none' });
  s += duSp(300, 1640, .98, { t, hunch: .4 * st, look: [16, 6], brows: 'sad', mouth: 'flat' }, { talk: st > .5 ? 0 : 1 });
  s += `<path d="M -60 1460 H 1140 V 2000 H -60 Z" fill="#a8744a" stroke="${K.ink}" stroke-width="6"/><rect x="620" y="1420" width="420" height="44" rx="10" fill="#c4ccd3" stroke="${K.ink}" stroke-width="5"/><ellipse cx="830" cy="1420" rx="80" ry="20" fill="#f2efe8" stroke="${K.ink}" stroke-width="4"/>`;
  if (st > .3) s += `<g opacity="${f1(st)}">${[0, 1, 2].map(i => `<circle cx="${820 + i * 40}" cy="${640 + Math.sin(t * 3 + i) * 4}" r="12" fill="#fff" stroke="${K.ink}" stroke-width="4"/>`).join('')}</g>`;
  return frame(cam(s, 540, 1100, 1.06 - .05 * eio(prog(t, 30.2, 32.46))));
}
