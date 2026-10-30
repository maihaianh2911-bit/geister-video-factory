// 60.34–62.77: the egg swells a little — dashed outline of its old size stays behind ("sogar größer")
import { K, OL, f1, prog, eio, lerp } from './lib.js';
import { closeBG, egg, eggD } from './sets.js';
export default function renderShot(t) {
  const g = lerp(1, 1.12, eio(prog(t, 60.5, 61.4)));
  const old = `<g transform="translate(540 940) scale(3.2)"><path d="${eggD(48, 60)}" fill="none" stroke="${K.blue}" stroke-width="${f1(7 / 3.2)}" stroke-dasharray="${f1(14 / 3.2)} ${f1(10 / 3.2)}"/></g>`;
  const plate = `<ellipse cx="540" cy="${f1(940 + 60 * 3.2 * g + 10)}" rx="330" ry="56" fill="#FFFFFF" ${OL(7)}/>`;
  return `${closeBG({ gy: 1175 })}${plate}${egg(540, 940, 3.2, { id: 'e23', shell: 0, w: 7, grow: g })}${old}`;
}
