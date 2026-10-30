// 11.5–13.74 · "Temperatur an deinem Gaumen schnell sinken" — big palate close-up, thermometer drops
import { P, pastel, profileHead, thermo, arrow, snowflake, prog, eio, eout, back, lerp, mix } from '../lib.js';

export default function renderShot(t) {
  const fall = eio(prog(t, 12.15, 12.82));
  const lvl = lerp(.82, .16, fall);
  const s = lerp(3.4, 3.6, prog(t, 11.5, 13.74));
  const px = 640, py = 760;
  return `${pastel(t, { color: mix('#F6E9EC', '#E1EFF8', fall) })}
    ${profileHead(px - 110 * s, py - 62 * s, s, { t, id: 's8', xray: 1, ice: 1, palCold: .3 + .7 * fall, frost: .3 + .7 * fall, eye: 'shut' })}
    <rect x="60" y="300" width="250" height="760" rx="40" fill="#fff" stroke="${P.ink}" stroke-width="6" opacity=".92"/>
    ${thermo(185, 640, 1.25, lvl, { id: 's8t' })}
    ${arrow(380, 420, 380, lerp(440, 800, fall), P.cold, 26, fall > 0 ? 1 : 0)}
    ${snowflake(820, 1220, .8 * back(prog(t, 12.2, 12.5)), t * .5, P.coldL)}
    ${snowflake(940, 380, .5 * back(prog(t, 12.4, 12.7)), -t * .5, P.coldL)}`;
}
