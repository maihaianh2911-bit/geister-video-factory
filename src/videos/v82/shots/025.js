// 85.92–90.66 option 1: live the old life exactly the same — the warm left path glows with the people you love, a loop arrow on "genauso", hearts on "liebst"
import { K, kid, adult, heart, chip, glow, fade, pop, prog, eio, eout, lerp, f1 } from './lib.js';
import { crossroads, sign } from './024.js';
export default function renderShot(t) {
  const w = eio(prog(t, 85.92, 86.6));
  let s = crossroads(t, { warm: lerp(.5, 1, w), cool: lerp(.5, .15, w) });
  s += `<rect x="540" y="0" width="540" height="1920" fill="${K.night}" opacity="${f1(w * 45) / 100}"/>`;
  s += glow(300, 700, 380 * w * (1 + .06 * Math.sin(t * 2.5)), K.gold, .5);
  s += sign(820, 760, 'NEUE ZUKUNFT', K.blue, 1, 1);
  // family + friend appear on the warm side
  const f = fade(t, 86.5, .4);
  s += `<g opacity="${f1(f * 100) / 100}">` + adult(130, 1000 - 6 * Math.abs(Math.sin(t * 2.2)), .5, { kind: 'mom', mouth: 'smile', aR: [20 + 10 * Math.sin(t * 2.2), 10] }) + adult(300, 1000 - 6 * Math.abs(Math.sin(t * 2.2 + 1)), .52, { kind: 'dad', mouth: 'smile', aL: [20 + 10 * Math.sin(t * 2.2 + 1), 10] }) + kid(440, 1000 - 8 * Math.abs(Math.sin(t * 3)), .45, { shirt: '#5fae7a', stripe: '#3c8a5a', hairC: '#c4642f', hairHi: '#de8a52', mouth: 'grin', brows: 'up' }) + `</g>`;
  // loop arrow above them on "genauso"
  s += chip(290, 250, 'ALTES LEBEN', { a: fade(t, 86.5), sc: pop(t, 86.5), bg: '#d9774f', size: 48 });
  s += chip(290, 360, 'GENAUSO NOCH MAL', { a: fade(t, 87.76), sc: pop(t, 87.76), bg: K.ol, size: 40 });
  [[160, 560, 89.96], [300, 520, 90.06], [440, 560, 90.16]].forEach(([x, y, t0]) => { const a = fade(t, t0, .2); if (a > 0) s += heart(x, y - (t - t0) * 30, .8 * pop(t, t0), K.red, { a }); });
  s += kid(540, 1330, .8, { aL: [12, 6], aR: [12, 6], mouth: t > 89.9 ? 'smile' : 'flat', brows: 'up', look: [-14, -4] });
  return s;
}
