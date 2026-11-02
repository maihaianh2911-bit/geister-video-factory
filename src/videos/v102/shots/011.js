// L5a 24.14–26.88: card FREITAG. Grey crossroads, du rides in on a bicycle from the left; a car crosses in front of him and
// on "spät" (26.16) he brakes hard: the bike stops with a jolt, skid marks, du leans forward with wide eyes. Traffic light behind.
import { K, frame, cam, prog, eio, eout, person, shadow, dayCard, f1, op, lerp } from './lib.js';
import { street } from './sets2.js';
import { farbeBar, colourAt, grey } from './common.js';
const INK = K.ink;
export function trafficLight(x, y, s, redA = 1) {
  return `<g transform="translate(${x} ${y}) scale(${s})"><rect x="-14" y="0" width="28" height="900" fill="#3a3a3a" stroke="${INK}" stroke-width="5"/><rect x="-80" y="-330" width="160" height="350" rx="30" fill="#2a2a2a" stroke="${INK}" stroke-width="7"/><circle cx="0" cy="-250" r="50" fill="#d9493f" opacity="${op(redA)}"/><circle cx="0" cy="-250" r="50" fill="none" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="-140" r="50" fill="#5a4a2a" stroke="${INK}" stroke-width="5"/><circle cx="0" cy="-30" r="50" fill="#2f4a36" stroke="${INK}" stroke-width="5"/></g>`;
}
function bike(x, y) {
  return `<g transform="translate(${f1(x)} ${y})"><circle cx="-170" cy="0" r="105" fill="none" stroke="${INK}" stroke-width="14"/><circle cx="170" cy="0" r="105" fill="none" stroke="${INK}" stroke-width="14"/><circle cx="-170" cy="0" r="14" fill="${INK}"/><circle cx="170" cy="0" r="14" fill="${INK}"/><path d="M -170 0 L -40 -150 L 120 -150 L 170 0 M -40 -150 L 0 0 L -170 0 M 0 0 L 120 -150 M 120 -150 L 110 -230 L 60 -240" stroke="#c25b4e" stroke-width="16" fill="none" stroke-linejoin="round" stroke-linecap="round"/><rect x="-90" y="-180" width="100" height="26" rx="12" fill="${INK}"/></g>`;
}
export default function renderShot(t) {
  let s = street(t, {});
  s += trafficLight(760, 480, 1, 1);
  const carX = lerp(1500, -700, prog(t, 25.6, 26.9));
  s += `<g transform="translate(${f1(carX)} 1290)"><rect x="-260" y="-170" width="520" height="150" rx="40" fill="#5f8fb5" stroke="${INK}" stroke-width="7"/><path d="M -160 -170 L -110 -260 L 120 -260 L 180 -170 Z" fill="#bcd8ee" stroke="${INK}" stroke-width="7"/><circle cx="-160" cy="-20" r="50" fill="${INK}"/><circle cx="160" cy="-20" r="50" fill="${INK}"/></g>`;
  s += grey(1 - colourAt(t));
  const p = prog(t, 24.3, 26.16);
  const x = lerp(-180, 430, eout(p));
  const jolt = t > 26.16 ? Math.exp(-(t - 26.16) * 5) * Math.sin((t - 26.16) * 16) : 0;
  const lean = t > 26.1 ? 10 * Math.exp(-(t - 26.16) * 2.5) + 6 * jolt : 0;
  if (t > 25.9) s += `<g stroke="${INK}" stroke-width="10" stroke-linecap="round" opacity=".5"><path d="M ${f1(x - 420)} 1660 H ${f1(x - 200)}"/><path d="M ${f1(x - 80)} 1660 H ${f1(x + 140)}"/></g>`;
  s += shadow(x, 1670, 260);
  const scared = t > 26.0;
  s += `<g transform="rotate(${f1(lean)} ${f1(x + 170)} 1660)">${bike(x, 1560)}` +
    person('du', x - 40, 1500, .85, { t, seed: 1, legs: false, eyes: scared ? 'wide' : 'tired', brows: scared ? 'worried' : 'calm', mouth: scared ? 'o' : 'flat', look: [14, -4], armR: [230, -330], elbowR: [210, -440], armL: [200, -320], elbowL: [80, -380] }) +
    `<path d="M ${f1(x - 60)} 1395 L ${f1(x + 10)} 1480 L ${f1(x - 10)} 1560 M ${f1(x - 20)} 1395 L ${f1(x + 50)} 1470 L ${f1(x + 20)} 1545" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/></g>`;
  s = cam(s, 540, 1100, 1.0 + .05 * eio(prog(t, 24.14, 26.88)) + .04 * jolt);
  s += dayCard(t, 24.2, 'FREITAG', { y: 330 });
  s += farbeBar(colourAt(t));
  return frame(s);
}
