// Search map from above: the rescuers' search area must grow — one dot by the track, a second dot drifting away; the dashed red search circle balloons.
import { K, DEFS60, forestMap, FG, prog, eio, eout, lerp, back } from './lib.js';

export default function renderShot(t) {
  const d = eio(prog(t, 18.9, 19.6)), grow = eout(prog(t, 19.3, 19.9));
  const lone = [lerp(470, 760, d), lerp(840, 560, d)];
  const r = lerp(140, 420, grow);
  const sweep = (t * 120) % 360;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0B0F12"/>
  <g transform="translate(40 230)"><clipPath id="m14"><rect x="0" y="0" width="1000" height="1100" rx="20"/></clipPath>
    <g clip-path="url(#m14)">${forestMap(1000, 1100, 9)}
      <rect x="0" y="0" width="1000" height="1100" fill="#05080A" opacity=".45"/>
      <g transform="translate(470 840) rotate(${sweep})"><polygon points="0,0 900,-160 900,160" fill="#FFF1CF" opacity=".12"/></g>
      <circle cx="${(470 + lone[0]) / 2}" cy="${(840 + lone[1]) / 2}" r="${r}" fill="${K.red}" fill-opacity=".08" stroke="${K.red}" stroke-width="8" stroke-dasharray="26 18"/>
      <circle cx="470" cy="840" r="22" fill="${K.amb}" stroke="#0B0F12" stroke-width="5"/><circle cx="440" cy="870" r="14" fill="${K.amb}"/><circle cx="500" cy="872" r="14" fill="${K.amb}"/>
      <circle cx="${lone[0]}" cy="${lone[1]}" r="20" fill="#6CA85C" stroke="#0B0F12" stroke-width="5"/>
      <path d="M 470 840 L ${lone[0]} ${lone[1]}" stroke="#6CA85C" stroke-width="5" stroke-dasharray="10 12" opacity="${d}"/>
    </g>
    <rect x="0" y="0" width="1000" height="1100" rx="20" fill="none" stroke="#2E3A42" stroke-width="10"/></g>
  ${FG(1420)}`;
}
