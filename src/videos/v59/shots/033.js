// 53.3–54.86: outside the block: a phone torch flashes at the open window, a balcony below — they make themselves seen.
import { K, DEFS, FG, prog, eio, facade, famWindowXY, cl } from './lib.js';
export default function renderShot(t) {
  const [wx, wy] = famWindowXY();
  const z = 1.25 + .15 * eio(prog(t, 53.3, 54.86));
  const fl = t > 53.8 && Math.sin(t * 16) > 0 ? 1 : 0;
  const arm = 30 * Math.sin(t * 7);
  return `${DEFS}<g transform="translate(540 760) scale(${z}) translate(${-wx} ${-wy})">${facade(t)}
    <g transform="translate(${wx} ${wy + 40}) rotate(${arm})"><path d="M 0 0 L -20 -110" stroke="#0B0F12" stroke-width="30" stroke-linecap="round"/><path d="M 0 0 L -20 -110" stroke="${K.vTop}" stroke-width="18" stroke-linecap="round"/>
      <circle cx="-20" cy="-118" r="14" fill="${K.skin}" stroke="#0B0F12" stroke-width="4"/>
      ${fl ? `<circle cx="-20" cy="-130" r="70" fill="#FFF6D0" opacity=".8" filter="url(#vSoft2)"/><circle cx="-20" cy="-130" r="14" fill="#fff"/>` : ''}</g>
    </g>${FG(1430)}`;
}
