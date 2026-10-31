import { K, TX, card, antSide, bread, breadSide, yardSide, f1, cl, prog, eout, back, lerp } from './lib.js';
// 7.0–9.02 Close side view: the ant walks up to the bread and its antennae touch it on "Brot".
export default function renderShot(t) {
  const u = eout(prog(t, 7.0, 8.3));
  const x = lerp(100, 470, u), walking = t < 8.3;
  const touch = t > 8.3 ? Math.sin((t - 8.3) * 16) * 6 : 0;
  const mark = prog(t, 8.32, 8.6);
  return `${yardSide(1150)}${breadSide(900, 1150, 2)}${card(540, 360, 'AUF NAHRUNGSSUCHE', 60, prog(t, 7.44, 7.7))}${antSide(x, 1150, 3, walking ? t * 14 : 0, { ant: walking ? undefined : 14 + touch })}
    ${mark > 0 ? `<g transform="translate(${f1(x + 160)} 760) scale(${f1(back(cl(mark)))})">${TX('!', 0, 0, 150, K.red, 'middle', `stroke="${K.white}" stroke-width="10" paint-order="stroke"`)}</g>` : ''}`;
}
