// L11a 42.02–43.0 du honks: close-up through the side window, angry, both hands slam the horn on "hupst" (42.08);
// the honk is shown as yellow sound waves (no comic horn sound).
import { K, frame, cam, setStreet, person, soundWaves, prog, eio } from './lib.js';
import { push, CU } from './base.js';
export default function renderShot(t) {
  let s = setStreet(t, { heavy: true, rain: false });
  const press = t > 42.08 ? 1 : eio(prog(t, 42.02, 42.08));
  s += person('du', 420, CU.y, CU.s, { t, seed: 2, brows: 'angry', eyes: 'mean', mouth: 'grim', look: [9, 0], armR: [150, -150 + press * 20], armL: [120, -150 + press * 20], rim: '#ffd98a' });
  // steering wheel hub in the lower right
  s += `<ellipse cx="820" cy="1500" rx="200" ry="90" fill="#3a4055" stroke="${K.ink}" stroke-width="8"/>`;
  s += soundWaves(900, 1300, prog(t, 42.08, 42.9), 1) + soundWaves(860, 1300, prog(t, 42.25, 43.0), 1);
  // car window frame
  s += `<path d="M -80 -80 H 1160 V 2000 H -80 Z M 40 200 H 1040 V 1700 H 40 Z" fill="#141826" fill-rule="evenodd"/>`;
  const shake = t > 42.08 && t < 42.4 ? Math.sin(t * 80) * 6 : 0;
  return frame(cam(s, 540, 900, push(t, 42.02, 43.0, 1.04, 1.12), shake), { tint: ['#20305a', .12] });
}
