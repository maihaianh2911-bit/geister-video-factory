// 58.8–60.3: looking down from the sill: a deep drop to the street — big red X on "nicht" (do not jump).
import { K, DEFS, FG, prog, eio, xMark, grip } from './lib.js';
export default function renderShot(t) {
  const lean = eio(prog(t, 58.8, 59.3));
  const z = 1 + .1 * lean;
  let fl = '';
  for (let i = 0; i < 6; i++) { const y = 300 + i * 150, w = 900 - i * 110; fl += `<rect x="${540 - w / 2}" y="${y}" width="${w}" height="20" fill="#3A4B56" stroke="#0B0F12" stroke-width="4"/>`; }
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#0F161B"/>
    <g transform="translate(540 700) scale(${z}) translate(-540 -700)">
    <polygon points="-60,200 1140,200 640,1250 440,1250" fill="#22303A"/>
    ${fl}
    <rect x="440" y="1180" width="200" height="90" fill="#151C21"/>
    <rect x="470" y="1190" width="60" height="30" fill="#3A5470"/><rect x="560" y="1205" width="50" height="26" fill="#7D2A2D"/>
    </g>
    <rect x="-60" y="1250" width="1200" height="200" fill="#D9D2C5" stroke="#0B0F12" stroke-width="10"/>
    ${grip(260, 1250, .9, 0)}${grip(820, 1250, .9, 0)}
    ${xMark(540, 720, 1.3, prog(t, 59.2, 59.55))}
    ${FG(1430)}`;
}
