// Call screen: 112 is ringing through; the battery icon beside it blinks red — AKKU 4 % — while the call timer runs.
import { K, DEFS60, P, phone, battery, armTo, lab, FG, TX, prog, eout, lerp } from './lib.js';

export default function renderShot(t) {
  const s = 3.0, z = lerp(1.0, 1.06, prog(t, 23.0, 24.56));
  const sec = Math.floor((t - 22.4) * 1);
  const blink = Math.floor(t * 3) % 2 ? .4 : 1;
  const scr = `<rect x="-60" y="-112" width="120" height="224" rx="12" fill="#12301F"/>
    ${TX('112', 0, -40, 46, '#FFFFFF')}
    ${TX('00:0' + Math.max(1, sec), 0, -6, 18, '#9DDCB8')}
    <g opacity="${t > 23.3 ? blink : 1}">${battery(0, 40, .5, .04, K.red)}</g>
    <circle cx="0" cy="88" r="16" fill="${K.red}"/><path d="M -8 88 h 16" stroke="#fff" stroke-width="5"/>`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0E161A"/>
  <g transform="translate(540 900) scale(${z}) translate(-540 -900)">
    <ellipse cx="540" cy="860" rx="560" ry="620" fill="url(#fCold)" opacity=".3"/>
    ${armTo(1180, 1800, 700, 1140, 120, P.red.j, 1, P.red.skin)}
    ${phone(540, 860, s, 4, { on: 1, screen: scr, glow: false })}
    <g transform="translate(540 860) rotate(4)"><ellipse cx="200" cy="140" rx="44" ry="96" fill="${P.red.skin}" stroke="#0B0F12" stroke-width="7"/><ellipse cx="-196" cy="60" rx="40" ry="34" fill="${P.red.skin}" stroke="#0B0F12" stroke-width="6"/><ellipse cx="-200" cy="140" rx="40" ry="34" fill="${P.red.skin}" stroke="#0B0F12" stroke-width="6"/></g>
  </g>
  ${lab('AKKU 4 %', 540, 270, 96, prog(t, 23.4, 23.65), '#FFFFFF', '#0B0F12', K.red)}
  ${FG(1440)}`;
}
