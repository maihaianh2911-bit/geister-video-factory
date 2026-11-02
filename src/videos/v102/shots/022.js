// L13b 53.5–55.4: the kitchen at night (warm lamp light): du's arm lays the phone face-down on the counter ("legst das Handy in die Küche", 53.58–54.4), lets go and pulls the hand back; the phone stays there in the light.
import { K, frame, cam, prog, eio, phone, pool, f1 } from './lib.js';
import { kitchen } from './sets.js';
import { fadeWorld, bar } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = kitchen(t) + `<rect x="-200" y="-200" width="1480" height="2320" fill="#1a1430" opacity=".5"/>` + pool(540, 900, 560, 520, '#ffcf7a', .35);
  // sharp counter top in front
  s += `<rect x="-60" y="1160" width="1200" height="900" fill="#a8744a" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1140" width="1200" height="40" rx="6" fill="#d8c9ac" stroke="${INK}" stroke-width="6"/>`;
  s += `<g transform="translate(860 1150)"><rect x="-90" y="-180" width="180" height="180" rx="16" fill="#e8e2d4" stroke="${INK}" stroke-width="5"/><rect x="-70" y="-160" width="140" height="22" rx="6" fill="#c9bca4"/><circle cx="-40" cy="-60" r="18" fill="#c25b4e"/><circle cx="20" cy="-70" r="22" fill="#f2c14e"/><circle cx="50" cy="-40" r="16" fill="#7aa27a"/></g>`;
  const d = eio(prog(t, 53.58, 54.4)), back = eio(prog(t, 54.6, 55.2));
  const px = 470, py = lerp1(820, 1120, d);
  s += `<ellipse cx="${px}" cy="1150" rx="${f1(130 * (.6 + .4 * d))}" ry="18" fill="#000" opacity="${(.25 * d).toFixed(2)}"/>`;
  const ph = `<g transform="translate(${px} ${f1(py)}) scale(1 ${f1((1 - .78 * d) * 1000) / 1000})">` + phone(0, 0, 1, 0, '#3a5a8a', `<rect x="-40" y="-90" width="80" height="12" rx="6" fill="#9fd8ff"/>`) + `</g>`;
  s += ph;
  // arm from the top-left (sleeve), hand on the phone until release
  const hx = px - 10 - 300 * back, hy = py - 30 - 260 * back;
  const dd = `M -120 380 Q ${f1((hx - 120) / 2 + 40)} ${f1((hy + 380) / 2 + 80)} ${f1(hx)} ${f1(hy)}`;
  s += `<path d="${dd}" stroke="${INK}" stroke-width="86" fill="none" stroke-linecap="round"/><path d="${dd}" stroke="${K.du}" stroke-width="70" fill="none" stroke-linecap="round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="38" fill="${INK}"/>`;
  s += fadeWorld(t);
  s = cam(s, 500, 1000, 1.3 + .06 * eio(prog(t, 53.5, 55.4)));
  s += bar(t);
  return frame(s);
}
function lerp1(a, b, p) { return a + (b - a) * p; }
