// 56.06–58.38: the mouldy bread belongs in the bin ("weggeworfen" 57.28) — your hand drops it in, the lid closes
import { K, DEFS, kitchen, slice, arm, cam, prog, eio, ein, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const m = eio(prog(t, 56.1, 56.9)), fall = ein(prog(t, 57.0, 57.4)), lid = eio(prog(t, 57.5, 57.9));
  const hx = lerp(820, 560, m), hy = lerp(700, 640, m);
  const by = fall > 0 ? lerp(hy + 120, 1250, fall) : hy + 120;
  const bin = `<rect x="360" y="1000" width="360" height="460" rx="30" fill="${K.tealD}" stroke="${K.ink}" stroke-width="5"/><g transform="rotate(${f1(lerp(-70, 0, lid))} 360 1000)"><rect x="350" y="970" width="380" height="40" rx="14" fill="${K.teal}" stroke="${K.ink}" stroke-width="5"/></g>`;
  const piece = fall >= 1 ? '' : slice(hx - 10, by, .55, { id: 's21', toast: .9, spot: .5, at: [-60, 40] });
  return `${DEFS}${cam(`${kitchen(1450)}${piece}${bin}${arm([1300, 300], [1000, 560], [hx, hy], 1.3, K.du)}`, 1.0, 540, 1000)}`;
}
