// 49.08–51.38: she gets up and walks out of the river onto the bank
import { K, DEFS, tuffi, river, grain, f1, cam, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const up = eio(prog(t, 49.33, 49.95));
  const w = prog(t, 50.0, 51.38), x = lerp(330, 860, eio(w));
  const climb = prog(x, 600, 900);
  const y = 1260 - 120 * climb;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>
    <path d="M -60 640 Q 300 580 640 660 Q 900 700 1140 620 L 1140 1000 L -60 1000 Z" fill="#949A78"/>
    ${river(t, 990, 1500)}<path d="M 560 1500 L 560 1262 L 900 1140 L 1140 1130 L 1140 1980 L 560 1980 Z" fill="#7F8A5E" stroke="${K.ink}" stroke-width="5"/>
    ${tuffi(x, y, 1.0, { sit: lerp(.7, 0, up), walk: w > 0 ? t * 7 : 0, ear: .4, tr: .2, rot: climb > 0 && climb < 1 ? -14 : 0 })}
    <rect x="-60" y="1230" width="620" height="270" fill="#7D8C80" opacity=".6"/>${grain(t)}`;
}
