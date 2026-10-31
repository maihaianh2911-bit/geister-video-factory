import { P, ST, TX, fig, hammerP, helmetAt, jacketShape, frame, workshop, benchFront, bootOnBench, prog, eio, eout, back, lerp } from './lib.js';
// 71.6–75.66 Bookend: back at the workbench the shoemaker looks up at the poster with his invented name; on "Streich" he fades away, the name stays.
export default function renderShot(t) {
  const look = eout(prog(t, 71.7, 72.1));
  const fade = 1 - eio(prog(t, 73.46, 75.2));
  const smile = t > 72.6;
  const poster = `<g transform="translate(820 600) rotate(3)" filter="url(#drop)"><rect x="-200" y="-260" width="400" height="560" fill="#F2E3C2" ${ST(6)}/>
    <circle cx="0" cy="40" r="${170 + 30 * (1 - fade)}" fill="url(#kgold)"/>${jacketShape(0, -10, .55, { epaul: 1 })}${helmetAt(0, -62, .42, 0)}
    ${TX(0, -170, 54, 'HAUPTMANN', P.red, { ls: 2 })}${TX(0, -116, 38, 'VON KÖPENICK', P.ink, { ls: 2 })}</g>`;
  return frame(t, `${workshop()}${poster}
    <g opacity="${fade.toFixed(3)}">${fig(380, 1820, 1.85, { kind: 'voigtShoe', aR: -38, propR: hammerP(-95), aL: -28, bendL: -40, look: lerp(8, 14, look), lookY: lerp(10, -8, look), brow: 'up', mouth: smile ? 'smile' : 'flat' })}</g>
    ${benchFront()}${bootOnBench()}
    ${fade < .5 ? hammerP(-95)(700, 1290).replace('<g transform="translate(700 1290) rotate(-95)">', '<g transform="translate(560 1300) rotate(-90)" opacity="' + (1 - 2 * fade).toFixed(2) + '">') : ''}`);
}
