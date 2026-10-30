// 66.56–69.22: and the white mould on Camembert? ("Camembert" 68.86) — a round cheese on a board, a wedge slides out showing the white rind
import { K, DEFS, kitchen, label, cam, prog, eio, f1 } from './lib.js';
export function camembert(x, y, s, o = {}) {
  const w = o.wedge || 0;
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s)})"><ellipse cx="0" cy="40" rx="260" ry="90" fill="${K.rind}" stroke="${K.ink}" stroke-width="5"/><rect x="-260" y="-40" width="520" height="80" fill="${K.rind}"/><ellipse cx="0" cy="-40" rx="260" ry="90" fill="${K.rind}" stroke="${K.ink}" stroke-width="5"/>
    <path d="M -260 -40 V 40 M 260 -40 V 40" stroke="${K.ink}" stroke-width="5"/>${[...Array(12)].map((_, i) => `<circle cx="${-200 + (i * 37) % 400}" cy="${-60 + (i * 23) % 50}" r="6" fill="#EDE6D2"/>`).join('')}
    ${w > 0 ? `<g transform="translate(${f1(160 * w)} ${f1(60 * w)})"><path d="M 0 -40 L 230 -80 Q 260 -40 230 0 L 0 -40 Z" fill="${K.rind}" stroke="${K.ink}" stroke-width="5"/><path d="M 0 -40 L 230 0 L 230 80 L 0 40 Z" fill="${K.cheese}" stroke="${K.ink}" stroke-width="5"/><path d="M 0 -36 L 230 4" stroke="${K.white}" stroke-width="14"/></g><path d="M 0 -40 L 230 -80 Q 260 -40 230 0 Z" fill="${K.cheese}" opacity=".9"/>` : ''}</g>`;
}
export default function renderShot(t) {
  const w = eio(prog(t, 67.2, 68.4));
  const sc = `${kitchen(1250)}<ellipse cx="540" cy="1250" rx="420" ry="110" fill="${K.woodD}" stroke="${K.ink}" stroke-width="5"/>${camembert(500, 1160, 1.1, { wedge: w })}`;
  return `${DEFS}${cam(sc, 1 + .08 * eio(prog(t, 66.56, 69.22)), 540, 1100)}${label(540, 520, 'CAMEMBERT', eio(prog(t, 68.8, 69.1)))}`;
}
