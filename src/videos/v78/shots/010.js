// 22.36–24.68: before work you spray on perfume ("sprühst" 23.0, "Parfüm" 23.56) — bottle in the right hand, pink mist puffs at the neck
import { K, OL, f1, stick, cam, prog, eio, lerp, hash } from './lib.js';
import { bathroom, FY, FS } from './sets.js';
export default function renderShot(t) {
  const up = eio(prog(t, 22.4, 22.95)), sp = prog(t, 23.0, 24.0);
  const hx = lerp(660, 700, up), hy = lerp(1110, 780, up);
  const btl = `<g transform="translate(${f1(hx)} ${f1(hy)})"><rect x="-26" y="-60" width="52" height="80" rx="10" fill="${K.perf}" ${OL(5)}/><rect x="-10" y="-80" width="20" height="22" fill="${K.grey}" ${OL(4)}/></g>`;
  let mist = '';
  if (sp > 0 && sp < 1) for (let i = 0; i < 14; i++) { const q = (sp * 2 + hash(i)) % 1; mist += `<circle cx="${f1(hx - 30 - q * 150)}" cy="${f1(hy - 70 - (hash(i * 3) - .5) * 80 * q)}" r="${f1(8 + 14 * q)}" fill="${K.perf}" opacity="${f1(.7 * (1 - q))}"/>`; }
  const fig = stick(560, FY, FS, { shirt: K.teal, look: .3, lookY: -.2, mouth: 'smile', hR: [hx, hy], mid: btl, hL: [460, 1100] });
  return cam(`${bathroom({ sink: false })}${fig}${mist}`, 1.35, 600, 860);
}
