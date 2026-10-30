// 60.3–61.88: the facade: a dashed climbing route from the window down the drainpipe — crossed out on "Fassade".
import { K, DEFS, FG, prog, eio, facade, famWindowXY, xMark } from './lib.js';
export default function renderShot(t) {
  const [wx, wy] = famWindowXY();
  const d = eio(prog(t, 60.3, 60.9));
  const px = wx + 140;
  const path = `M ${wx + 60} ${wy + 40} L ${px} ${wy + 60} L ${px} ${wy + 700}`;
  return `${DEFS}<g transform="translate(540 760) scale(1.3) translate(${-wx - 60} ${-wy - 200})">${facade(t)}
    <rect x="${px - 12}" y="200" width="24" height="1500" fill="#5A6A74" stroke="#0B0F12" stroke-width="5"/>
    <path d="${path}" fill="none" stroke="#FFFFFF" stroke-width="10" stroke-dasharray="30 20" stroke-dashoffset="${-t * 60}" pathLength="1000" opacity="${d}"/>
    </g>
    ${xMark(560, 780, 1.2, prog(t, 60.9, 61.25))}
    ${FG(1430)}`;
}
