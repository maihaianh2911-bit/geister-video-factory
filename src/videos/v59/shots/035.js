// 56.6–58.8: from the street: blue lights sweep the facade, a rescuer's torch beam finds the waving window on "sehen".
import { K, DEFS, FG, prog, eio, facade, famWindowXY } from './lib.js';
export default function renderShot(t) {
  const [wx, wy] = famWindowXY();
  const bl = Math.sin(t * 14) > 0 ? 1 : .2;
  const p = eio(prog(t, 56.8, 57.95));
  const tx = 200 + (wx - 200) * p, ty = 300 + (wy - 300) * p;
  const sx = 120, sy = 1600;
  const ang = Math.atan2(ty - sy, tx - sx), wd = 90;
  const beam = `M ${sx} ${sy} L ${tx + wd * Math.sin(ang)} ${ty - wd * Math.cos(ang)} L ${tx - wd * Math.sin(ang)} ${ty + wd * Math.cos(ang)} Z`;
  return `${DEFS}<g transform="translate(540 900) scale(.95) translate(-540 -900)">${facade(t)}</g>
    <rect x="-60" y="-60" width="1200" height="2040" fill="${K.blue}" opacity="${.14 * bl}"/>
    <ellipse cx="${bl > .5 ? 980 : 100}" cy="1380" rx="500" ry="300" fill="url(#vBlue)" opacity="${bl}"/>
    <path d="${beam}" fill="#FFF6D0" opacity=".28"/>
    <circle cx="${tx}" cy="${ty}" r="${wd}" fill="#FFF6D0" opacity=".35"/>
    <g transform="translate(${wx} ${wy})"><path d="M 30 10 L ${30 + 30 * Math.sin(t * 9)} -70" stroke="#0B0F12" stroke-width="22" stroke-linecap="round"/><path d="M 30 10 L ${30 + 30 * Math.sin(t * 9)} -70" stroke="${K.vTop}" stroke-width="12" stroke-linecap="round"/></g>
    ${FG(1430)}`;
}
