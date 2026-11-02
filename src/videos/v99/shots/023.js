// L13 58.76–62.74: sunny office: du gets up from his office chair (60.0), stretches both arms high (60.7, "zu lange"), rubs his back; the "?" cloud dissolves after "Schreibtisch" (61.7–62.6).
import { K, frame, cam, prog, eio, person, shadow, lerp } from './lib.js';
import { office2 } from './sets.js';
import { cloud } from './clouds.js';
const INK = K.ink;
function chairBack(x, y) {
  return `<g transform="translate(${x} ${y})"><rect x="-140" y="-560" width="280" height="330" rx="60" fill="#3a4250" stroke="${INK}" stroke-width="6"/><rect x="-20" y="-230" width="40" height="120" fill="#555c66" stroke="${INK}" stroke-width="5"/><rect x="-170" y="-130" width="340" height="50" rx="20" fill="#3a4250" stroke="${INK}" stroke-width="6"/><path d="M 0 -80 V -10 M -120 0 L 120 0" stroke="${INK}" stroke-width="14" stroke-linecap="round"/><circle cx="-120" cy="6" r="14" fill="${INK}"/><circle cx="120" cy="6" r="14" fill="${INK}"/></g>`;
}
export default function renderShot(t) {
  let s = office2(t);
  s += `<path d="M -200 0 L 600 0 L 1100 1700 L -200 1700 Z" fill="#fff4c8" opacity=".16"/>`;
  const up = eio(prog(t, 59.7, 60.3)), str = eio(prog(t, 60.5, 61.0)) * (1 - eio(prog(t, 61.9, 62.4))), gone = eio(prog(t, 61.7, 62.6));
  // desk with monitor at the right
  s += `<rect x="620" y="1180" width="520" height="30" fill="#c9a77c" stroke="${INK}" stroke-width="5"/><path d="M 660 1210 V 1640 M 1080 1210 V 1640" stroke="#8a6a4a" stroke-width="16"/><rect x="700" y="900" width="300" height="230" rx="12" fill="#2a2f36" stroke="${INK}" stroke-width="6"/><rect x="714" y="914" width="272" height="202" rx="6" fill="#dfeaf4"/><rect x="830" y="1130" width="40" height="50" fill="#555"/>`;
  s += chairBack(lerp(470, 560, up), 1640);
  const y = lerp(1760, 1640, up);
  s += shadow(450, 1640);
  s += person('du', 450, y, 1, { t, seed: 1, look: [0, str > .5 ? -10 : 0], brows: str > .5 ? 'up' : 'calm', mouth: str > .5 ? 'o' : 'small', eyes: str > .6 ? 'closed' : 'n', armL: [lerp(-150, -160, str), lerp(-300, -880, str)], elbowL: [lerp(-220, -200, str), lerp(-420, -720, str)], armR: [lerp(150, 160, str), lerp(-300, -880, str)], elbowR: [lerp(220, 200, str), lerp(-420, -720, str)], legs: up > .5 });
  s += cloud(470, 470, 380, { t, seed: 31, dark: .5, q: true, gone });
  return frame(cam(s, 540, 1000, 1.0 + .05 * eio(prog(t, 58.76, 62.74))));
}
