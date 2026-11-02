// L2b 13.9–15.68: close-up — du leans back, looks away from the laptop and thinks „Mach ich morgen.“
import { K, frame, cam, study, person, thought, light, prog, eio, eout, lerp, cl, pop } from './lib.js';
export default function renderShot(t) {
  let s = study({ mood: 'evening', dx: 30, clock: [20, 14] }) + light(820, 1500, 360, 300, '#cfe0ff', .35);
  const X = 380, Y = 2010, S = 2.7;
  const away = eio(prog(t, 14.1, 14.5));
  s += person('du', X, Y, S, { t, seed: 1, load: .1, brows: 'calm', mouth: away > .5 ? 'smile' : 'flat', eyes: away > .5 ? 'n' : 'n', look: [lerp(14, -14, away), lerp(10, -12, away)], headTilt: -6 * away, rim: '#ffd98a' });
  s += thought(700, 420, '„Mach ich morgen.“', 520, 700, { p: pop(t, 14.3, .45), size: 56 });
  s = cam(s, 540, 900, 1.02 + .06 * eio(prog(t, 13.9, 15.68)));
  return frame(s);
}
