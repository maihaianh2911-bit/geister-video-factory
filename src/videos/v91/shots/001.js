// L0 0–4.32 hook: du wants to say a white lie ("Alles gut!") — on "Lüge" a red X locks his mouth and the lie is struck out.
import { K, frame, bg, shadow, person, lie, title, cam, prog, eio, pop, fade, lockAt, lockAlpha } from './lib.js';
export default function renderShot(t) {
  const z = 1 + .07 * eio(prog(t, 0, 4.32));
  let s = bg('street', { sc: 1 + .03 * eio(prog(t, 0, 4.32)) });
  s += shadow(540, 1340, 120);
  const lk = lockAt(t, 2.44, 9), shocked = t > 2.6;
  s += person('du', 540, 1340, 1.05, { t, seed: 1, eyes: shocked ? 'wide' : 'n', brows: shocked ? 'up' : null, mouth: lk > 0 ? 'none' : 'smile', lock: lk,
    armL: shocked ? [-70 - 40 * eio(prog(t, 2.6, 3.0)), -330 - 60 * eio(prog(t, 2.6, 3.0))] : null, look: shocked ? [0, 6] : [8, -4] });
  // the white lie he wants to say: appears on "einzige", struck on "Lüge"
  s += lie(760, 660, 'Alles gut!', 640, 780, { p: pop(t, 1.95, .4), strike: eio(prog(t, 2.5, 2.9)), size: 52 });
  s = cam(s, 540, 1050, z);
  s += title(['WAS WÄRE, WENN DU', 'EINE WOCHE LANG', ['NICHT LÜGEN KÖNNTEST?', K.yellow]], 250, 70, { a: fade(t, 0, .25) });
  return frame(s);
}
