// 52.1–55.06: the bare egg — a fingertip pushes the membrane in and it springs back ("biegsam"); then a red tear line shows it can rip ("reißen")
import { K, OL, f1, prog, eio, lerp } from './lib.js';
import { closeBG, egg } from './sets.js';
export default function renderShot(t) {
  const p = eio(prog(t, 52.4, 53.0)) * (1 - eio(prog(t, 53.3, 53.8)));
  const out = eio(prog(t, 53.8, 54.1));
  const fx = lerp(lerp(672, 648, p), 1000, out);
  const finger = `<path d="M 1180 900 L ${f1(fx + 40)} 940" fill="none" ${OL(54)}/><circle cx="${f1(fx + 22)}" cy="940" r="30" fill="${K.ink}"/>`;
  const tear = eio(prog(t, 54.1, 54.6));
  const tl = tear > 0 ? `<path d="M 470 820 l 26 30 l -18 24 l 30 30 l -20 26 l 28 30" fill="none" stroke="${K.red}" stroke-width="12" stroke-linecap="round" stroke-linejoin="round" stroke-dasharray="240" stroke-dashoffset="${f1(240 * (1 - tear))}"/>` : '';
  const plate = `<ellipse cx="540" cy="1150" rx="330" ry="60" fill="#FFFFFF" ${OL(7)}/>`;
  return `${closeBG({ gy: 1175 })}${plate}${egg(540, 960, 3.2, { id: 'e20', shell: 0, w: 7, dent: p })}${tl}${finger}`;
}
