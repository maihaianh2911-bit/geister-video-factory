// The map zooms in: the wide blue uncertainty circle shrinks to one exact point on "genau"; a crosshair locks on.
import { K, DEFS60, forestMap, pin, rings, FG, prog, eio, eout, back, lerp } from './lib.js';
import { monitor } from './021.js';

export default function renderShot(t) {
  const z = lerp(1, 2.2, eio(prog(t, 45.0, 45.7)));
  const r = lerp(260, 30, eio(prog(t, 45.3, 45.75)));
  const lock = back(prog(t, 45.72, 45.95));
  const inner = `<g transform="translate(540 710) scale(${z}) translate(-540 -710)"><g transform="translate(-100 160)">${forestMap(1400, 1200, 13)}</g></g>
    <circle cx="540" cy="710" r="${r}" fill="#5AA0FF" fill-opacity=".14" stroke="#5AA0FF" stroke-width="6" stroke-dasharray="14 10"/>
    ${pin(540, 710, 1.2, K.red)}
    ${lock > 0 ? `<g transform="translate(540 650) scale(${lock})" stroke="${K.amb}" stroke-width="8" fill="none"><circle r="120"/><path d="M -170 0 H -80 M 80 0 H 170 M 0 -170 V -80 M 0 80 V 170"/></g>` : ''}
    ${t > 45.72 ? rings(t, 45.72, 540, 650, K.amb, 2, 220, 8) : ''}`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0A0F14"/>${monitor(inner)}${FG(1440)}`;
}
