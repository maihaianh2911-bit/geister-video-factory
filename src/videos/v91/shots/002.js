// L1 4.32–7.2 day one: three everyday white lies pop up in du's head; on "lügst" every one is struck out and du grabs his head.
import { K, frame, bg, shadow, person, lie, chip, cam, prog, eio, pop } from './lib.js';
export default function renderShot(t) {
  let s = bg('living');
  s += shadow(540, 1360, 120);
  const grab = eio(prog(t, 6.3, 6.6));
  const L = [['Mir geht’s gut!', 270, 600, 4.66], ['Bin gleich da!', 800, 520, 5.38], ['Klingt super!', 330, 860, 5.94]];
  s += person('du', 540, 1360, 1, { t, seed: 1, eyes: grab > .3 ? 'wide' : 'n', brows: grab > .3 ? 'up' : null, mouth: grab > .3 ? 'o' : 'flat',
    look: t < 5.38 ? [-10, -6] : t < 5.94 ? [10, -8] : [-8, 0],
    armL: grab > 0 ? [-110 + 15 * grab, -330 - 130 * grab] : null, armR: grab > 0 ? [110 - 15 * grab, -330 - 130 * grab] : null });
  L.forEach(([txt, x, y, t0], i) => { s += lie(x, y, txt, 540 + (x < 540 ? -60 : 60), 880, { p: pop(t, t0, .38), strike: eio(prog(t, 6.28 + i * .12, 6.6 + i * .12)), size: 46 }); });
  s += chip(540, 300, 'TAG 1', { p: pop(t, 4.46, .4), size: 60 });
  return frame(cam(s, 540, 1000, 1 + .05 * eio(prog(t, 4.32, 7.2))));
}
