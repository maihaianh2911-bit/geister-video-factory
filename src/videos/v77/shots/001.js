import { K, OL, headline, stick, walkFeet, bread, nestSide, yardSide, f1, prog, eio, eout, lerp } from './lib.js';
// 0–2.6 Cover: you walk up to an anthill holding a slice of bread with jam; headline.
export default function renderShot(t) {
  const w = eout(prog(t, 0, 1.3)), x = lerp(180, 360, w), walking = t < 1.3;
  const [fL, fR] = walking ? walkFeet(x, 1250, t * 1.6, 80, 1.6) : [[x - 32, 1250], [x + 32, 1250]];
  const up = eio(prog(t, 1.2, 1.6));
  const hx = x + lerp(120, 250, up), hy = lerp(980, 770, up);
  const gl = prog(t, 2.1, 2.5);
  const sparkle = gl > 0 && gl < 1 ? `<path d="M ${f1(hx - 10)} ${f1(hy - 120)} l 10 -26 l 10 26 l 26 10 l -26 10 l -10 26 l -10 -26 l -26 -10 Z" fill="${K.white}" ${OL(3)} opacity="${f1(Math.sin(gl * Math.PI))}"/>` : '';
  return `${yardSide(1250)}${nestSide(840, 1250, 1.3)}
    ${stick(x, 1250, 1.6, { fL, fR, hR: [hx, hy], bendR: up > .5 ? 1 : -1, look: .8, lookY: up > .5 ? -.2 : .3, brow: 'up', mouth: 'smile', bob: walking ? 6 * Math.abs(Math.sin(t * 1.6 * Math.PI * 2)) : 0, over: bread(hx + 4, hy - 90, .55, -8) })}${sparkle}
    ${headline([['BROT NEBEN', 110, K.ink], ['AMEISEN?', 140, K.red]], 190)}`;
}
