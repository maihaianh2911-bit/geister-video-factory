import { P, TX, calendar, pop, shk, wallpaper, frame, prog } from './lib.js';
// 21.72–23.0 Tear-off calendar flips to 16 OKTOBER on "sechzehnten".
export default function renderShot(t) {
  const flips = [21.76, 21.9, 22.04];
  let n = 13, fp = 0;
  flips.forEach((f, i) => { if (t >= f) { n = 14 + i; fp = prog(t, f, f + .2); } });
  if (t >= 22.12) n = 16;
  const land = shk(t, 22.16, 8);
  return frame(t, `${wallpaper('#E0CDA4', '#CDB48A')}${calendar(540, 820 + land, 1.25, n, 'OKTOBER', fp, -3)}
    ${t > 22.4 ? `<g transform="translate(540 1330) scale(${pop(t, 22.46, .2)})">${TX(0, 0, 90, '1906', P.red, { sw: 10, sc: P.white, ls: 6 })}</g>` : ''}`);
}
