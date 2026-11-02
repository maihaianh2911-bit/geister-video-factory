// L8a 41.26–44.00: Chicago skyline by the lake, slow pan; two psychologists (white coats) in the sharp foreground from the first word;
// "CHICAGO" (42.02), study card with a check on "überprüft" (42.92).
import { frame, cam, label, pop, prog, eio, check, T, K, f1, person, shadow } from './lib.js';
import { chicago } from './sets.js';
export default function renderShot(t) {
  const p = eio(prog(t, 41.26, 44.0));
  let s = chicago(t, { dx: -60 + 120 * p });
  s += shadow(250, 1760, 170) + person('psy1', 250, 1760, .85, { t, seed: 12, look: [10, -8], mouth: 'soft', brows: 'calm', armR: [130, -380], elbowR: [190, -300], holdR: `<rect x="-50" y="-70" width="100" height="130" rx="8" fill="#c9a26b" stroke="#1d1d1d" stroke-width="5"/><rect x="-38" y="-52" width="76" height="98" fill="#fff"/>` });
  s += shadow(830, 1760, 170) + person('psy2', 830, 1760, .85, { t, seed: 13, look: [-10, -8], mouth: 'soft', brows: 'calm' });
  s = cam(s, 540, 900, 1.02 + .04 * p);
  s += label('CHICAGO', 540, 300, 140, { p: pop(t, 42.02, .45) });
  const c = pop(t, 42.92, .4);
  if (c > 0) s += `<g transform="translate(540 600) scale(${f1(c * 1000) / 1000})"><rect x="-230" y="-110" width="460" height="220" rx="24" fill="#fff" stroke="${K.ink}" stroke-width="7"/>${T(-40, 30, 'STUDIE', 64, { fill: K.txt })}<circle cx="150" cy="8" r="52" fill="#e3f3e8" stroke="${K.ink}" stroke-width="5"/>${check(150, 10, 1.3, K.green, prog(t, 43.1, 43.5))}</g>`;
  return frame(s);
}
