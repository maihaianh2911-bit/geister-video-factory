// 38.42–43.42: read the lift number off the notice plate, if you find it — the torch finds the plate; the line AUFZUG-NR. lights up on "Aufzugsnummer"
import { K, DEFS, BG, light, TX, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const sweep = eio(prog(t, 38.5, 39.3));
  const s2 = eio(prog(t, 40.2, 40.9)), s3 = eio(prog(t, 41.6, 43.0));
  // torch: finds the number line, drops to the maintenance line, then you tilt the phone closer to read it
  const lx = lerp(200, 540, sweep) + 160 * Math.sin(s3 * Math.PI), ly = lerp(1300, 820, sweep) + 90 * s2;
  const hl = eout(prog(t, 39.3, 39.7)), hl2 = eout(prog(t, 40.4, 40.8));
  const plate = `<rect x="160" y="520" width="760" height="600" rx="20" fill="#D9DEE1" stroke="${K.ink}" stroke-width="7"/>
    ${TX('NOTRUF-HINWEIS', 540, 610, 52, K.ink)}
    <rect x="200" y="${700}" width="680" height="110" rx="10" fill="${hl > 0 ? K.amber : '#C2C8CC'}" opacity="${f1(.4 + .6 * hl)}"/>${TX('AUFZUG-NR.  2', 540, 776, 62, K.ink)}
    <rect x="200" y="${850}" width="680" height="90" rx="10" fill="#C2C8CC" opacity="${f1(.5 + .3 * hl2)}"/>${TX('WARTUNG  ☎ ···· ····', 540, 912, 46, K.ink)}
    ${[0, 1].map(i => `<path d="M 230 ${990 + i * 50} H ${850 - i * 160}" stroke="#9AA2A8" stroke-width="12"/>`).join('')}`;
  return `${DEFS}${BG(K.steel)}${plate}<rect x="-60" y="-60" width="1200" height="2040" fill="#05080A" opacity="${f1(.55 - .2 * sweep)}"/>${light(lx, ly, lerp(520, 420, s3), 1)}`;
}
