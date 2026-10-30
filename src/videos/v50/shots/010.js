// 15.20–17.0 · "Blutgefäße dort zusammenziehen" — the vessel squeezes narrow and turns cold blue
import { P, pastel, vesselTube, arrow, snowflake, prog, eio, back, lerp, mix } from '../lib.js';

export default function renderShot(t) {
  const c = eio(prog(t, 15.7, 16.15));
  const wf = lerp(1.1, .42, c);
  const col = mix('#E5484D', P.cold, c);
  const a = c > 0 && c < 1 ? 1 : (t > 16.15 ? 1 - prog(t, 16.5, 16.9) : 0);
  const ay = 2.1 * (110 * wf / 2 + 22) + 30;
  return `${pastel(t, { color: mix('#FBEFF1', '#E3F1FA', c) })}
    <g transform="rotate(-8 540 800) translate(540 800) scale(2.1) translate(-540 -800)">${vesselTube(540, 800, 700, wf, col, t, 1 - .7 * c)}</g>
    ${[300, 540, 780].map(x => arrow(x, 800 - ay - 170, x, 800 - ay - 40, P.cold, 20, a) + arrow(x, 800 + ay + 170, x, 800 + ay + 40, P.cold, 20, a)).join('')}
    ${snowflake(170, 330, .9 * back(prog(t, 15.4, 15.7)), t * .6, P.coldL)}`;
}
