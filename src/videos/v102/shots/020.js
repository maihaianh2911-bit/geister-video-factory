// L12b 49.22–51.34: close-up: du still grins carefree at the bottom, but above him a round x-ray panel shows his brain with two warning lamps; on "nicht" (50.36) the lamps start flashing red and the brain looks strained.
import { K, frame, cam, prog, eio, person, pop, f1 } from './lib.js';
import { room } from './sets.js';
import { brain } from './sets2.js';
import { siren } from './kit.js';
import { fadeWorld, bar } from './base.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = room(t, { mood: 'amber', hh: 21, mm: 30, strong: true }) + fadeWorld(t);
  s += person('du', 540, 2420, 1.6, { t, seed: 1, eyes: 'happy', brows: 'calm', mouth: 'grin', legs: false });
  const p = pop(t, 49.3, .45);
  if (p > 0) {
    const on = t > 50.36 && Math.floor((t - 50.36) * 4) % 2 === 0;
    let g = `<circle cx="540" cy="590" r="330" fill="#1c2340" stroke="${INK}" stroke-width="10"/><circle cx="540" cy="590" r="300" fill="none" stroke="#3a4a7a" stroke-width="6" stroke-dasharray="14 12"/>`;
    if (on) g += `<circle cx="540" cy="590" r="320" fill="#ff3b30" opacity=".18"/>`;
    g += brain(540, 620, 1.05, t) + siren(370, 390, .8, on) + siren(710, 390, .8, on);
    g += `<path d="M 470 1000 L 540 950 L 610 1000" fill="none" stroke="${INK}" stroke-width="0"/><circle cx="560" cy="950" r="20" fill="#fff" stroke="${INK}" stroke-width="5"/><circle cx="575" cy="990" r="12" fill="#fff" stroke="${INK}" stroke-width="5"/>`;
    s += `<g transform="translate(540 590) scale(${f1(Math.max(.01, p) * 1000) / 1000}) translate(-540 -590)">${g}</g>`;
  }
  s = cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 49.22, 51.34)));
  s += bar(t);
  return frame(s);
}
