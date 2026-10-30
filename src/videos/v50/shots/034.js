// "lass das ärztlich abklären": walking up to a doctor's practice; the door opens.
import { P, prog, eio, back, lerp, punch, bgPlain, backView } from './lib.js';
const T0 = 62.80;
export default function renderShot(t) {
  const open = eio(prog(t, 63.38, 63.8));
  const walk = eio(prog(t, T0, 64.78));
  const bob = 8 * Math.abs(Math.sin((t - T0) * 6));
  const dw = 340 * (1 - .8 * open);
  return punch(t, T0, `${bgPlain('#EEF6FA')}
    <rect x="-60" y="1150" width="1200" height="900" fill="#D5E6EE"/>
    <rect x="330" y="420" width="420" height="740" fill="#FFF3D6"/>
    <rect x="330" y="420" width="420" height="740" fill="#FFE29A" opacity="${open}"/>
    <rect x="370" y="460" width="${dw}" height="700" fill="#fff" stroke="${P.ink}" stroke-width="8"/>
    <circle cx="${370 + dw - 40}" cy="820" r="16" fill="${P.ink}" opacity="${dw > 120 ? 1 : 0}"/>
    <rect x="330" y="420" width="420" height="740" fill="none" stroke="${P.tealD}" stroke-width="26"/>
    <g transform="translate(540 300) scale(${1 + .15 * back(prog(t, 63.38, 63.6)) - .15 * prog(t, 63.6, 63.8)})"><rect x="-90" y="-90" width="180" height="180" rx="26" fill="#fff" stroke="${P.ink}" stroke-width="8"/><path d="M -22 -60 h 44 v 38 h 38 v 44 h -38 v 38 h -44 v -38 h -38 v -44 h 38 z" fill="${P.teal}" stroke="${P.ink}" stroke-width="5"/></g>
    <g transform="translate(${lerp(300, 470, walk)} ${lerp(1500, 1330, walk) - bob}) scale(${lerp(1.3, 1.0, walk)})">${backView()}</g>`);
}
