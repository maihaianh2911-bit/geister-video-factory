// 52.0–55.66: inside the car, facing you — your eyelids drop for short moments without you noticing ("Schlafphasen" 52.22, "bemerkst" 55.0)
import { K, BG, bust, label, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const c1 = Math.sin(Math.PI * prog(t, 52.2, 53.0)), c2 = Math.sin(Math.PI * prog(t, 53.6, 54.7));
  const lid = Math.max(.45, c1 * 1.05, c2 * 1.05), nod = 6 * c2;
  const lamp = ((t - 52) * 700) % 1400 - 200;
  const inside = `${BG('#2B3A4F')}<rect x="-60" y="-60" width="1200" height="760" fill="#3D4F7A"/><rect x="${f1(lamp)}" y="-60" width="160" height="760" fill="#FFE9A8" opacity=".12"/>
    <rect x="300" y="660" width="480" height="560" rx="90" fill="#46566E" stroke="${K.ink}" stroke-width="5"/><rect x="390" y="700" width="300" height="130" rx="50" fill="#56688A" stroke="${K.ink}" stroke-width="5"/>`;
  const du = bust('du', 540, 1080, 1.3, { look: 0, lookY: .2, tired: 1, lid, brow: 0, mouth: 'flat', tilt: nod, hy: nod * 2, aL: [[330, 1300], [400, 1250]], aR: [[750, 1300], [680, 1250]] });
  const wheel = `<circle cx="540" cy="1330" r="250" fill="none" stroke="${K.ink}" stroke-width="58"/><circle cx="540" cy="1330" r="250" fill="none" stroke="#3A3F46" stroke-width="44"/><path d="M 300 1330 H 780 M 540 1330 V 1580" stroke="#3A3F46" stroke-width="40"/><circle cx="540" cy="1330" r="70" fill="#3A3F46" stroke="${K.ink}" stroke-width="5"/>`;
  const hands = `<circle cx="400" cy="1250" r="31" fill="${K.skin}" stroke="${K.ink}" stroke-width="4"/><circle cx="680" cy="1250" r="31" fill="${K.skin}" stroke="${K.ink}" stroke-width="4"/>`;
  const pillars = `<path d="M -60 -60 L 120 -60 L 40 1980 L -60 1980 Z M 1140 -60 L 960 -60 L 1040 1980 L 1140 1980 Z" fill="#1F2A3C"/>`;
  return `${inside}${du}${wheel}${hands}${pillars}${label(540, 260, 'UNBEMERKT', prog(t, 55.0, 55.25), K.red, 62)}`;
}
