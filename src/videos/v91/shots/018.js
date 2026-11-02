// L17 62.02–65.96 ending: a cloud of many small lie bubbles around du; on "weniger" most of them drift away, two stay; du smiles calmly on "denkst".
import { K, frame, bg, shadow, person, chip, cam, prog, eio, eout, pop, hash, f1, title, fade } from './lib.js';
export default function renderShot(t) {
  let s = bg('street', { sc: 1.05 });
  s += shadow(540, 1380, 110);
  const go = eio(prog(t, 63.22, 64.0));
  for (let i = 0; i < 10; i++) {
    const keep = i === 2 || i === 7;
    const a = Math.PI * .8 + i / 9 * Math.PI * 1.4, r = 1 + .08 * hash(i + 9), row = i % 2 ? 1 : .72;
    const x0 = 540 + Math.cos(a) * 360 * r, y0 = 900 + Math.sin(a) * 380 * r * row;
    const away = keep ? 0 : go * (1 + hash(i) * .6);
    const x = x0 + Math.cos(a) * 700 * away, y = y0 + Math.sin(a) * 500 * away - 200 * away;
    const p = pop(t, 62.1 + i * .06, .35);
    if (p > 0 && away < 1.2) s += chip(f1(x), f1(y + Math.sin(t * 2 + i) * 8), 'kleine Lüge', { p: p * (1 - Math.min(1, away) * .6), size: 32, bg: '#fff', rot: (hash(i + 3) - .5) * 20 });
  }
  const calm = eio(prog(t, 64.3, 64.6));
  s += person('du', 540, 1380, 1, { t, seed: 1, eyes: calm > .5 ? 'happy' : 'n', mouth: 'smile', look: [0, -8] });
  s = cam(s, 540, 960, 1 + .05 * eio(prog(t, 62.02, 65.96)));
  s += title(['WENIGER, ALS', ['DU DENKST.', K.yellow]], 300, 80, { a: fade(t, 64.2, .4) });
  return frame(s);
}
