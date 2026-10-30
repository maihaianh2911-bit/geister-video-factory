// 78.56–82.02: at the bedside du sweats with fever, the thermometer rises into red; the candle shrinks and goes out on "kosten" (80.1); the room dims, smoke curls up.
import { K, DEFS, BG, head, candle, prog, eio, eout, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const fever = eio(prog(t, 78.6, 79.8)), out = prog(t, 79.7, 80.15), dark = eio(prog(t, 80.1, 80.9));
  const fl = 1 - eio(out), wax = lerp(.6, .25, eio(prog(t, 78.56, 80.1)));
  const pillow = `<path d="M -80 1220 Q 100 1150 400 1160 Q 700 1150 820 1230 V 1420 H -80 Z" fill="${K.white}" stroke="${K.ink}" stroke-width="6"/>`;
  const h = head('du', 330, 930, 2.7, { t, eyes: fever > .5 ? 'half' : 'open', look: .4, lookY: .2, brow: .8, mouth: 'down', sweat: fever, tilt: -10 });
  const lv = lerp(.4, .92, fever);
  const therm = `<g transform="translate(760 360)"><rect x="-34" y="0" width="68" height="560" rx="34" fill="${K.white}" stroke="${K.ink}" stroke-width="6"/><circle cx="0" cy="600" r="60" fill="${K.red}" stroke="${K.ink}" stroke-width="6"/>
    <rect x="-16" y="${f1(560 - 540 * lv)}" width="32" height="${f1(540 * lv + 20)}" fill="${K.red}"/>${[100, 200, 300, 400].map(y => `<path d="M 34 ${y} h -20" stroke="${K.ink}" stroke-width="5"/>`).join('')}</g>`;
  let smoke = '';
  if (out > .6) for (let i = 0; i < 5; i++) { const p = ((t - 80.0) * .5 + i * .2) % 1.4; smoke += `<circle cx="${f1(900 + 30 * Math.sin(p * 6 + i))}" cy="${f1(1180 - 200 * p)}" r="${f1(14 + 20 * p)}" fill="#AAB2C8" opacity="${f1(.4 * (1 - p / 1.4))}"/>`; }
  const tbl = `<rect x="780" y="1300" width="300" height="30" fill="${K.wood}" stroke="${K.ink}" stroke-width="5"/>`;
  return `${DEFS}${BG('url(#nWall)')}<ellipse cx="900" cy="1100" rx="${f1(700 * fl + 10)}" ry="${f1(700 * fl + 10)}" fill="url(#nLamp)" opacity="${f1(.8 * fl)}"/>${pillow}${h}${therm}${tbl}${candle(900, 1300, wax, fl, t)}${smoke}<rect x="-80" y="-80" width="1240" height="2080" fill="#000" opacity="${f1(.4 * dark)}"/>`;
}
