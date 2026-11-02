// L6 24.28–26.42 Close-up du in the office: hurt, then sulky; thought „Die mag mich einfach nicht.“ on "Die" (25.24).
import { K, frame, cam, setOffice, person, thought, pop } from './lib.js';
import { push, CU } from './base.js';
export default function renderShot(t) {
  let s = setOffice(t, { heavy: true });
  const sulk = t > 25.1;
  s += person('du', 430, CU.y, CU.s, { t, seed: 2, brows: sulk ? 'angry' : 'sad', eyes: sulk ? 'mean' : 'n', mouth: sulk ? 'grim' : 'sad', look: [9, 2], crossed: sulk, rim: '#ffffff' });
  s += thought(560, 380, ['Die mag mich', 'einfach nicht.'], 500, 620, { p: pop(t, 25.24, .4), size: 62 });
  return frame(cam(s, 430, 900, push(t, 24.28, 26.42, 1.02, 1.1)));
}
