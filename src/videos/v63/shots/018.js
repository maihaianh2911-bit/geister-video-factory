// 32.31–34.0: a museum in Berlin — classical facade (no invented name), offer letter slides under the door
import { K, DEFS, BG, grain, cam, prog, eout, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const cols = [...Array(6)].map((_, i) => `<rect x="${200 + i * 130}" y="700" width="60" height="520" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5"/>`).join('');
  const l = eio(prog(t, 33.0, 33.8));
  return `${DEFS}${BG('#C9B79A')}${cam(`<path d="M 120 690 L 540 470 L 960 690 Z" fill="${K.paperL}" stroke="${K.ink}" stroke-width="6"/><rect x="140" y="680" width="800" height="30" fill="${K.paperD}" stroke="${K.ink}" stroke-width="5"/>${cols}
    <rect x="120" y="1220" width="840" height="50" fill="${K.paperD}" stroke="${K.ink}" stroke-width="5"/><rect x="80" y="1270" width="920" height="50" fill="${K.paperD}" stroke="${K.ink}" stroke-width="5"/>
    <rect x="-60" y="1320" width="1200" height="700" fill="${K.brown}"/>
    <g transform="translate(${f1(lerp(1200, 560, l))} 1340) rotate(-6)"><rect x="-150" y="-90" width="300" height="180" fill="${K.paperL}" stroke="${K.ink}" stroke-width="5"/><path d="M -150 -90 L 0 10 L 150 -90" fill="none" stroke="${K.ink}" stroke-width="5"/></g>`, lerp(1, 1.06, eio(prog(t, 32.31, 34))), 540, 900)}${grain(t)}`;
}
