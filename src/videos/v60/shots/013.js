// In the dark, the lone walker's boot catches a hidden root; he pitches forward and falls hard — a red flash on "verletzen".
import { K, DEFS60, forest, fig, rings, FG, prog, eio, eout, ein, lerp, shk } from './lib.js';

export default function renderShot(t) {
  const walk = prog(t, 17.3, 17.75), fall = ein(prog(t, 17.72, 18.0));
  const [sx, sy] = shk(t, 18.0, 18, 7);
  const x = lerp(260, 470, walk), lean = lerp(0, 74, fall);
  const flash = t > 17.98 ? Math.max(0, 1 - (t - 17.98) * 2.2) : 0;
  return DEFS60 + `<g transform="translate(${sx} ${sy})">
    ${forest(t, { hz: 1000, px: -40 })}
    <rect x="0" y="0" width="1080" height="1920" fill="#05080A" opacity=".55"/>
    <ellipse cx="${x + 200}" cy="1250" rx="360" ry="200" fill="url(#fAmb)" opacity=".35"/>
    ${fig('green', x, 1380, 1.0, { walk: fall > 0 ? undefined : t * 10, lean, brow: fall > .3 ? 'up' : 'worry', mouth: fall > .3 ? 'o' : 'flat', look: 10, lookY: fall > .3 ? 10 : 0, aL: fall > .2 ? [-60, -40] : [8, 4], aR: fall > .2 ? [-80, -30] : [8, 4] })}
    <path d="M 380 1400 Q 470 1320 560 1385 Q 640 1430 760 1370" stroke="#0B0F12" stroke-width="58" fill="none" stroke-linecap="round"/>
    <path d="M 380 1400 Q 470 1320 560 1385 Q 640 1430 760 1370" stroke="${K.bark}" stroke-width="40" fill="none" stroke-linecap="round"/>
    ${rings(t, 17.98, 700, 1250, K.red, 3, 300, 12)}
    <rect x="0" y="0" width="1080" height="1920" fill="url(#fRed)" opacity="${(flash * .9).toFixed(2)}"/>
  </g>
  ${FG(1440)}`;
}
