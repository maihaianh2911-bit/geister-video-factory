// 37.72–39.6: the state archaeologist plays the buyer — suit, white collar + red tie, briefcase; he walks to a hotel table and sets the case down
import { K, DEFS, BG, fig, grain, cam, prog, eio, lerp, f1 } from './lib.js';
import { collar } from './hands.js';
export default function renderShot(t) {
  const x = lerp(200, 500, eio(prog(t, 37.72, 38.9)));
  const lift = eio(prog(t, 38.95, 39.3)) * (1 - eio(prog(t, 39.38, 39.6)));
  const a = fig(x, 1450, 1.05, { col: K.suit, coat: true, walk: (t - 37.72) * 6 * (t < 38.9 ? 1 : 0), aR: [lerp(4, 30, lift), lerp(2, 0, lift)] });
  const top = fig(500, 1450, 1.05, { coat: true, aR: [30, 0] }).hR, tableY = top[1] + 120;
  const placed = t >= 39.3, bp = placed ? top : a.hR;
  const bag = `<g transform="translate(${f1(bp[0])} ${f1(bp[1])})"><rect x="-80" y="0" width="160" height="120" rx="10" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/><path d="M -30 0 V -24 H 30 V 0" fill="none" stroke="${K.ink}" stroke-width="8"/></g>`;
  const table = `<rect x="600" y="${f1(tableY)}" width="420" height="30" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/><path d="M 640 ${f1(tableY + 30)} V 1450 M 980 ${f1(tableY + 30)} V 1450" stroke="${K.ink}" stroke-width="14"/>`;
  const lamp = `<circle cx="860" cy="520" r="260" fill="url(#nLamp)" opacity=".7"/><path d="M 820 600 L 900 600 L 880 520 L 840 520 Z" fill="${K.gold}" stroke="${K.ink}" stroke-width="5"/><path d="M 860 600 V 700" stroke="${K.ink}" stroke-width="6"/>`;
  return `${DEFS}${cam(`${BG('#C9B79A')}<rect x="-60" y="1450" width="1200" height="600" fill="${K.brown}"/>${[...Array(6)].map((_, i) => `<path d="M ${-60 + i * 220} 200 V 1450" stroke="#B9A688" stroke-width="10"/>`).join('')}${lamp}${table}
    ${a.svg}${collar(x, 1450, 1.05)}${bag}`, 1, 540, 1000)}${grain(t)}`;
}
