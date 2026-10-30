// A hand pulls a flashlight out of the backpack on "Taschenlampe" and clicks it on.
import { K, DEFS60, P, backpack, torch, armTo, FG, prog, eout, eio, lerp } from './lib.js';

export default function renderShot(t) {
  const pull = eio(prog(t, 79.0, 79.5));
  const on = t >= 79.9 ? 1 : 0;
  const tx = lerp(560, 600, pull), ty = lerp(1080, 700, pull), rot = lerp(80, -20, pull);
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0E1513"/>
  <path d="M 0 1100 Q 540 1060 1080 1100 L 1080 1920 L 0 1920 Z" fill="#1A2420"/>
  ${on ? `<rect x="0" y="0" width="1080" height="1920" fill="#FFF1CF" opacity=".05"/>` : ''}
  ${backpack(480, 1180, 2.0, -6)}
  <path d="M 340 980 Q 480 920 620 980" stroke="#0B0F12" stroke-width="20" fill="none"/>
  ${torch(tx, ty, 1.8, rot, on, 900)}
  ${armTo(1180, 1500, tx + 30, ty + 10, 110, P.red.j, 1, P.red.skin)}
  ${FG(1440)}`;
}
