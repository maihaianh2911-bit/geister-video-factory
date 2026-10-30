// 0–1.64: cover — kitchen, glass of vinegar on the counter; the figure holds a raw egg over it; headline
import { K, stick, headline, prog, eio, lerp } from './lib.js';
import { kitchen, glass, egg, vinegar, TY, FY, FS } from './sets.js';
export default function renderShot(t) {
  const up = eio(prog(t, .2, 1.2)), hx = lerp(640, 718, up), hy = lerp(1000, 860, up);
  const fig = stick(460, FY, FS, { hR: [hx, hy], hL: [360, 1180], look: .8, lookY: lerp(.1, .4, up), brow: 'up', mouth: up > .5 ? 'o' : 'smile', over: egg(hx, hy - 34, .62, { id: 'e1' }) });
  return `${kitchen()}${vinegar(930, TY, .7)}${glass(720, TY, .9, { id: 'g1', level: .6 })}${fig}${headline([['EI IN', 150, K.blue], ['ESSIG?', 150, K.orange]], 330)}`;
}
