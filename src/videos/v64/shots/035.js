// 75.1–76.46: nobody stood on the bank — the empty riverbank below the track; a dashed outline of a photographer gets a red cross on "keiner"
import { K, DEFS, river, track, grain, f1, prog, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const x = eout(prog(t, 75.15, 75.5));
  const ghost = `<g opacity=".8" fill="none" stroke="${K.ink}" stroke-width="7" stroke-dasharray="18 14"><ellipse cx="540" cy="860" rx="55" ry="60"/><path d="M 470 940 Q 540 920 610 940 L 630 1180 L 450 1180 Z"/><path d="M 470 1180 L 470 1340 M 610 1180 L 610 1340"/><rect x="480" y="980" width="120" height="86" rx="6"/></g>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="url(#wSky)"/>${track(200, 700, 0)}
    ${river(t, 700, 960)}<path d="M -60 960 Q 400 930 1140 970 L 1140 1980 L -60 1980 Z" fill="#7F8A5E" stroke="${K.ink}" stroke-width="5"/>
    <g transform="translate(0 40)">${ghost}</g>
    ${x > 0 ? `<path d="M 380 760 L 700 1420 M 700 760 L 380 1420" stroke="${K.red}" stroke-width="24" stroke-linecap="round" stroke-dasharray="${f1(x * 740)} 740"/>` : ''}${grain(t)}`;
}
