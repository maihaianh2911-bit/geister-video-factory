// 4.06–5.44: "Zwölf Meter tief" — a ruler from carriage floor to water reads 12 M; Tuffi hits the river at 5.3
import { K, DEFS, bahnScene, HL, grain, f1, prog, eout, lerp, WY, shk } from './lib.js';
import { fallingTuffi, fallSplash } from './fall.js';
export default function renderShot(t) {
  const d = eout(prog(t, 4.06, 4.5));
  const y1 = 660 + (WY - 660) * d;
  const ruler = `<path d="M 900 660 L 900 ${f1(y1)}" stroke="${K.red}" stroke-width="8"/><path d="M 870 660 h 60" stroke="${K.red}" stroke-width="8"/>
    ${d > .98 ? `<path d="M 870 ${WY} h 60" stroke="${K.red}" stroke-width="8"/>` : ''}
    <path d="M 884 690 L 900 660 L 916 690" fill="none" stroke="${K.red}" stroke-width="8"/>${d > .98 ? `<path d="M 884 ${WY - 30} L 900 ${WY} L 916 ${WY - 30}" fill="none" stroke="${K.red}" stroke-width="8"/>` : ''}`;
  const [sx, sy] = shk(t, 5.3, 8, 6);
  const world = bahnScene(t, { carX: 540, car: { faces: true, open: 1 }, over: fallingTuffi(t) + fallSplash(t) + ruler });
  return `${DEFS}<g transform="translate(${f1(sx)} ${f1(sy)})">${world}</g>
    <g opacity="${f1(prog(t, 4.06, 4.2))}"><rect x="770" y="860" width="230" height="110" fill="${K.paperL}" stroke="${K.ink}" stroke-width="6"/>${HL('12 M', 885, 942, 76, K.red, 0)}</g>${grain(t)}`;
}
