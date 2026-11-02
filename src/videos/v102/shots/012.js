// L6a 24.14–26.88: FREITAG. Street crossing, almost grey. du rides his bike in from the left; the traffic light ahead shows a pale, nearly grey red; on "spät" (26.16) he brakes hard — the bike stops past the stop line, he lurches forward, skid marks, eyes wide.
import { K, frame, cam, prog, eio, eout, person, shadow, dayCard, f1 } from './lib.js';
import { crossing, bike, trafficLight } from './kit.js';
import { fadeWorld, bar } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = crossing(t);
  const p = prog(t, 24.14, 26.16), bx = -40 + 700 * eout(p);
  const lurch = t >= 26.16 ? 14 * Math.exp(-(t - 26.16) * 4) * Math.cos((t - 26.16) * 10) : 0;
  const shock = t >= 26.1;
  // skid marks behind the rear wheel
  if (t > 25.7) s += `<path d="M ${f1(Math.max(-60, bx - 190 - 160 * prog(t, 25.7, 26.16)))} 1336 H ${f1(bx - 190)}" stroke="#2a2a2a" stroke-width="10" opacity=".6"/>`;
  s += fadeWorld(t);
  s += trafficLight(900, 730, 1, { pale: .68 });
  s += shadow(bx, 1340, 300, .8);
  const rot = (bx + 40) / 105 * 57.3;
  // legs to the pedals (behind the body)
  const ca = rot * Math.PI / 180, px = bx - 60, py = 1230;
  const p1 = [px + Math.cos(ca) * 42, py + Math.sin(ca) * 42], p2 = [px - Math.cos(ca) * 42, py - Math.sin(ca) * 42];
  let legs = [p1, p2].map(([x, y], i) => `<path d="M ${f1(bx - 105 + (i ? -20 : 20))} 1020 Q ${f1(bx - 10)} 1110 ${f1(x)} ${f1(y)}" stroke="${INK}" stroke-width="18" fill="none" stroke-linecap="round"/><ellipse cx="${f1(x)}" cy="${f1(y + 6)}" rx="30" ry="12" fill="${INK}"/>`).join('');
  s += `<g transform="rotate(${f1(lurch * .4)} ${f1(bx + 190)} 1230)">` + bike(bx, 1230, 1, rot) + legs + person('du', bx - 100, 1150, .85, { t, seed: 1, legs: false, lean: lurch, look: [14, shock ? -6 : -2], eyes: shock ? 'wide' : 'tired', brows: shock ? 'up' : 'calm', mouth: shock ? 'o' : 'flat', armR: [270, -150], elbowR: [210, -330], still: true }) + `</g>`;
  s = cam(s, 540, 950, 1.0 + .05 * eio(prog(t, 24.14, 26.88)));
  s += dayCard(t, 24.16, 'FREITAG', { y: 330 });
  s += bar(t);
  return frame(s);
}
