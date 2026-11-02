// L12b 53.28–55.4: dim kitchen at night; du stands behind the counter and lays his phone down on it ("Handy" 54.06,
// lands 54.3), lets go and walks away to the left — the phone stays in the kitchen.
import { K, frame, cam, prog, eio, person, phone, f1, lerp } from './lib.js';
import { kitchen } from './sets.js';
import { tint } from './base.js';
import { farbeBar, colourAt, grey } from './common.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = kitchen(t, {}) + tint('#0a1430', .5);
  s += grey(1 - colourAt(t));
  const down = eio(prog(t, 53.5, 54.3)), back = eio(prog(t, 54.6, 55.0)), leave = eio(prog(t, 54.9, 55.4));
  const x = 430 - 160 * leave;
  // hand target (local coords) — from chest height down onto the counter, then back
  const hx = lerp(lerp(150, 250, down), 120, back), hy = lerp(lerp(-460, -352, down), -420, back);
  s += person('du', x, 1640, 1, { t, seed: 1, look: [14, 16 * (1 - back)], mouth: 'small', armR: [hx, hy], elbowR: [240, -400], walk: leave > 0 && leave < 1 ? t * 1.7 : undefined });
  // phone: in the hand until it lands, then lying on the counter
  if (t < 54.3) s += phone(x + hx, 1640 + hy - 30, .55, lerp(-20, -80, down), '#3a6ab0');
  // counter (sharp foreground)
  s += `<rect x="-60" y="1300" width="1200" height="700" fill="#8a5a3c" stroke="${INK}" stroke-width="6"/><rect x="-60" y="1300" width="1200" height="30" fill="#a8744a"/>`;
  if (t >= 54.3) s += `<g transform="translate(680 1296)"><rect x="-70" y="-22" width="140" height="22" rx="8" fill="${INK}"/><rect x="-60" y="-20" width="120" height="8" rx="3" fill="#4a5a7a"/></g>`;
  s += `<rect x="760" y="1150" width="150" height="150" rx="10" fill="#d8dee4" stroke="${INK}" stroke-width="5"/><rect x="785" y="1180" width="100" height="60" rx="6" fill="#2a2f36"/>`;
  s = cam(s, 540, 1150, 1.05 + .05 * eio(prog(t, 53.28, 55.4)));
  s += farbeBar(colourAt(t));
  return frame(s);
}
