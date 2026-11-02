// L3 10.86–15.4 Lena smiles "Wow, Glückwunsch!" (speech) — du hears her thought "Warum immer sie?" (thought).
import { K, frame, bg, shadow, person, speech, thought, chip, star, cam, hearLvl, prog, eio, eout, pop, fade, f1 } from './lib.js';
export default function renderShot(t) {
  let s = bg('office');
  s += shadow(330, 1330) + shadow(750, 1330);
  const heard = t > 14.45;
  const down = eio(prog(t, 14.5, 15.0)), hy = -420 + 150 * down;
  const paper = `<g transform="translate(126 ${f1(hy - 70)}) rotate(${f1(10 * down)})"><rect x="-55" y="-70" width="110" height="140" rx="8" fill="#fff" stroke="${K.ink}" stroke-width="5"/><path d="M -32 -36 H 32 M -32 -12 H 32 M -32 12 H 14" stroke="#9aa3ad" stroke-width="7" stroke-linecap="round"/>${star(26, 44, 18)}</g>`;
  s += person('du', 330, 1330, 1, { t, seed: 1, hear: hearLvl(t, [14.3]), armR: [120, hy], front: paper, eyes: heard ? 'wide' : 'happy', mouth: heard ? 'o' : 'grin', look: [10, -4] });
  const smile = t > 11.04;
  s += person('lena', 750, 1330, 1, { t, seed: 2, look: [-10, 0], eyes: smile && t < 14.2 ? 'happy' : 'n', mouth: smile ? 'grin' : 'flat', armL: t > 11.86 && t < 13.2 ? [-110, -300] : null });
  s += speech(560, 700, 'Wow, Glückwunsch!', 720, 880, { p: pop(t, 11.86, .4), a: t > 14.3 ? .55 : undefined });
  s += thought(760, 500, 'Warum immer sie?', 790, 800, { p: pop(t, 14.3, .45) });
  return frame(cam(s, 540, 960, 1.03 + .04 * eio(prog(t, 10.86, 15.4))));
}
