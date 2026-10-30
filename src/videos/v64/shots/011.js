// 20.0–21.62: at the station — a carriage glides in and stops with its door open in front of Tuffi and Althoff
import { K, DEFS, tuffi, althoff, car, grain, f1, prog, eout, eio, lerp } from './lib.js';
export default function renderShot(t) {
  const cx = lerp(1500, 600, eout(prog(t, 20.0, 20.9)));
  const sway = 3 * Math.exp(-Math.max(0, t - 20.9) * 3) * Math.sin(Math.max(0, t - 20.9) * 9);
  const look = prog(t, 20.2, 20.6);
  let roof = '';
  for (let i = 0; i < 8; i++) roof += `<path d="M ${i * 160 - 60} 180 L ${i * 160 + 20} 320 L ${i * 160 + 100} 180" fill="none" stroke="${K.steel}" stroke-width="10"/>`;
  return `${DEFS}<rect x="-60" y="-60" width="1200" height="2040" fill="#CFC6AE"/>
    <rect x="-60" y="140" width="1200" height="50" fill="${K.steel}"/>${roof}<rect x="-60" y="310" width="1200" height="20" fill="${K.steel}"/>
    <rect x="-60" y="330" width="1200" height="20" fill="${K.steel}"/>
    ${car(cx, 350, 1.25, { faces: true, door: true, tilt: sway })}
    <rect x="-60" y="760" width="1200" height="1200" fill="#9E9480"/><rect x="-60" y="750" width="1200" height="22" fill="#E6D9B8" stroke="${K.ink}" stroke-width="4"/>
    ${[0, 1, 2, 3, 4, 5, 6].map(i => `<path d="M ${i * 180 - 60} 772 L ${i * 220 - 300} 1960" stroke="#8A806C" stroke-width="5"/>`).join('')}
    ${tuffi(330, 1330, 1.05, { ear: .3 + .5 * look, tr: .2, eye: look > .5 ? 'wide' : 'n' })}
    ${althoff(820, 1360, 1.0, { look: -1, dir: -1, aR: [lerp(10, 70, look), 30] }).svg}${grain(t)}`;
}
