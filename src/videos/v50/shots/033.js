// 62.85–64.78 · "lass das ärztlich abklären" — at the doctor's: the doctor listens with the stethoscope
import { P, pastel, girl, doctor, prog, eio, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const reach = eio(prog(t, 63.1, 63.45));
  const nod = t > 63.6 ? 6 * Math.sin((t - 63.6) * 8) * Math.exp(-(t - 63.6) * 2) : 0;
  const hx = lerp(-215, -330, reach), hy = lerp(400, 160, reach);
  const sx = 640 + hx * .95, sy = 1300 + hy * .95;
  return `${pastel(t, { color: '#E6F4F1' })}
    <rect x="420" y="190" width="240" height="240" rx="30" fill="#fff" stroke="${P.ink}" stroke-width="7"/>
    <path d="M 510 240 h 60 v 60 h 60 v 60 h -60 v 60 h -60 v -60 h -60 v -60 h 60 Z" transform="translate(-30 -30) scale(1) " fill="${P.teal}" stroke="${P.ink}" stroke-width="6"/>
    ${doctor(780, 1300, .95, { look: -12, handL: [hx, hy], handR: [215, 400] })}
    ${reach > .5 ? `<path d="M ${sx} ${sy} Q ${sx + 60} ${sy + 80} ${780 - 20} ${1300 + 200}" stroke="#4A5A6A" stroke-width="10" fill="none"/><circle cx="${sx - 40}" cy="${sy}" r="24" fill="#B9C6D2" stroke="${P.ink}" stroke-width="5"/>` : ''}
    ${girl(300, 1380, 1.0, { t, id: 's33', eyes: 'open', look: 14, mouth: 'soft', brow: .5, tilt: nod, handR: [215, 420], handL: [-215, 420] })}`;
}
