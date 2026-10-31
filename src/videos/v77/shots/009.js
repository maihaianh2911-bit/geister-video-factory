import { K, TX, stick, antSide, bread, breadSide, nestSide, yardSide, f1, prog, eio, back, lerp } from './lib.js';
// 15.88–18.62 You crouch and watch the line; a question mark: how do they know where the bread is? Eyes go from ants to bread on "Brot".
export default function renderShot(t) {
  const X = 300, Y = 1250;
  const q = back(prog(t, 16.2, 16.5));
  const lk = t < 17.4 ? .2 : lerp(.2, 1, eio(prog(t, 17.4, 17.7)));
  let ants = '';
  for (let i = 0; i < 6; i++) { const x = ((t - 15.88) * 110 + i * 120) % 720 + 260; ants += antSide(x, Y, .7, t * 14 + i); }
  return `${yardSide(Y)}${nestSide(170, Y, .55)}${breadSide(960, Y, .55)}${ants}
    ${stick(X, Y, 1.6, { bob: 120, fL: [X - 80, Y], fR: [X + 70, Y], hL: [X - 75, Y - 150], hR: [X + 80, Y - 150], lean: 4, look: lk, lookY: .7, brow: 'up', mouth: 'flat' })}
    ${q > 0 ? `<g transform="translate(520 480) scale(${f1(q)})">${TX('?', 0, 0, 220, K.red, 'middle', `stroke="${K.white}" stroke-width="12" paint-order="stroke"`)}</g>` : ''}`;
}
