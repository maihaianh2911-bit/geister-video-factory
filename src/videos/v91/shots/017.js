// L16 58.9–62.02 not every politeness has to go: three small polite phrases; on "streichen" a red line strikes only the middle one, the other two get green checks.
import { K, frame, bg, shadow, person, thought, check, cam, prog, eio, pop, f1, textW } from './lib.js';
export default function renderShot(t) {
  let s = bg('street');
  s += shadow(540, 1380, 110);
  const shake = t > 59.3 && t < 59.9 ? Math.sin((t - 59.3) * 24) * 8 : 0;
  s += person('du', 540, 1380, 1, { t, seed: 1, look: [0, -12], mouth: 'smile', headTilt: shake });
  const B = [['Danke, sehr nett!', 250, 760, 59.0], ['Sieht toll aus!', 540, 560, 59.25], ['Kein Problem!', 820, 760, 59.5]];
  B.forEach(([txt, x, y, t0]) => { s += thought(x, y, txt, x < 400 ? 450 : x > 700 ? 630 : 540, 870, { p: pop(t, t0, .38), size: 42, a: txt === 'Sieht toll aus!' && t > 61.5 ? 1 - .5 * prog(t, 61.5, 61.9) : undefined }); });
  const st = eio(prog(t, 60.82, 61.25)), w = textW('Sieht toll aus!', 42) + 30;
  if (st > 0) s += `<line x1="${f1(540 - w / 2)}" y1="562" x2="${f1(540 - w / 2 + w * st)}" y2="552" stroke="${K.red}" stroke-width="10" stroke-linecap="round"/>`;
  s += check(250 + 170, 700, .8, prog(t, 61.3, 61.6)) + check(820 + 140, 700, .8, prog(t, 61.45, 61.75));
  return frame(cam(s, 540, 960, 1 + .04 * eio(prog(t, 58.9, 62.02))));
}
