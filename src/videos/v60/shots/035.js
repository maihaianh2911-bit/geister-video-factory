// Side wide: yellow starts to sit down on the bare, frosty ground — a red X stops her halfway on "nicht".
import { K, DEFS60, forest, fig, FG, prog, eio, back, lerp, hash } from './lib.js';

export default function renderShot(t) {
  const down = eio(prog(t, 54.04, 54.4)) * (1 - eio(prog(t, 54.6, 55.0)));
  const x = back(prog(t, 54.42, 54.7));
  let rime = '';
  for (let i = 0; i < 40; i++) rime += `<path d="M ${(hash(i) * 1080).toFixed(0)} ${(1300 + hash(i * 3) * 120).toFixed(0)} l 10 -14 l 10 14" stroke="#DCEBF4" stroke-width="4" fill="none" opacity=".55"/>`;
  return DEFS60 + `${forest(t, { hz: 1000, px: 20 })}
  <rect x="0" y="1260" width="1080" height="700" fill="#2A3A3E"/>${rime}
  <ellipse cx="540" cy="1000" rx="520" ry="500" fill="url(#fAmb)" opacity=".35"/>
  ${fig('yellow', 540, lerp(1400, 1480, down), 1.15, { sy: 1, lean: 0, hdy: down * 60, aL: [lerp(8, 40, down), lerp(4, 60, down)], aR: [lerp(8, 40, down), lerp(4, 60, down)], brow: x > .5 ? 'up' : 'calm', mouth: x > .5 ? 'o' : 'flat', look: 0, lookY: 8 })}
  <rect x="0" y="1400" width="1080" height="80" fill="#2A3A3E"/>
  ${x > 0 ? `<g transform="translate(540 1330) scale(${x})"><circle r="140" fill="#0B0F12" opacity=".6"/><path d="M -90 -90 L 90 90 M 90 -90 L -90 90" stroke="${K.red}" stroke-width="40" stroke-linecap="round"/></g>` : ''}
  ${FG(1460)}`;
}
