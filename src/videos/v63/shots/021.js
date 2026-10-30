// 37.72–39.6: the state archaeologist plays the buyer — suit silhouette with briefcase walks in
import { K, DEFS, BG, fig, grain, cam, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const x = lerp(200, 520, eio(prog(t, 37.72, 39.2)));
  const a = fig(x, 1450, 1.05, { col: K.suit, coat: true, walk: (t - 37.72) * 6 * (t < 39.2 ? 1 : 0), aR: [4, 2] });
  const bag = `<g transform="translate(${f1(a.hR[0])} ${f1(a.hR[1])})"><rect x="-80" y="0" width="160" height="120" rx="10" fill="${K.brownD}" stroke="${K.ink}" stroke-width="5"/><path d="M -30 0 V -24 H 30 V 0" fill="none" stroke="${K.ink}" stroke-width="8"/></g>`;
  return `${DEFS}${BG('#C9B79A')}<rect x="-60" y="1450" width="1200" height="600" fill="${K.brown}"/><rect x="640" y="380" width="300" height="420" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5"/>
    ${a.svg}${bag}${grain(t)}`;
}
