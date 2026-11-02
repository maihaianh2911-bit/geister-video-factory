// L14 70.66–75.252: medium shot, du walks lightly along the clear meadow path in the morning sun (relaxed smile, the camera travels with him);
// on "einen Tag verpasst" (71.7) a small puddle lies on the path — on "geh … einfach weiter" (72.36) he simply steps over it and walks on.
// Label EINFACH WEITERGEHEN at 73.4. Counter TAG 67.
import { K, frame, cam, prog, eio, pop, label, f1 } from './lib.js';
import { field } from './common.js';
import { dayCounter } from './meadow.js';
const INK = K.ink;
export default function renderShot(t) {
  const hop = t > 72.36 && t < 72.9 ? Math.sin((t - 72.36) / .54 * Math.PI) : 0;
  const pud = `<ellipse cx="${f1(740 - 260 * prog(t, 70.66, 73.2))}" cy="1730" rx="120" ry="30" fill="#7fa7c9" stroke="#5a7f9e" stroke-width="5" opacity="${(1 - prog(t, 73.4, 74)).toFixed(2)}"/>`;
  const s = field(t, 480, 1720 - 50 * hop, 1.0, { mood: 'gold', p: 1, tall: 1.0, tallBack: 1.0, sunX: 820, sunY: 560, before: pud, du: { walk: (t - 70.66) * 1.5, look: [8, 2], eyes: 'n', brows: 'calm', mouth: 'smile', rim: '#ffcf7a' } });
  return frame(cam(s, 520, 1050, 1.04 + .06 * eio(prog(t, 70.66, 75.25))) + dayCounter('TAG 67', 820, 400, 1) + label('EINFACH WEITER', 540, 250, 92, { p: pop(t, 73.4, .45) }));
}
