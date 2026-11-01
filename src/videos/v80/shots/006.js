// 34.48–40.5: last autumn – Lisa from the design department, an event poster to revise
import { K, bg, chip, fade, pop, lisaDesk, poster, headline } from './lib.js';
export default function renderShot(t) {
  const tag = chip(700, 760, 'LISA · DESIGN', { size: 42, bg: K.purple, a: fade(t, 35.72), sc: pop(t, 35.72) });
  const pa = fade(t, 38);
  const p = `<g transform="translate(0 ${(1 - pa) * 40})">${poster(150, 470, 250, 0, { a: pa })}</g>`;
  const fix = chip(275, 870, 'ÜBERARBEITEN', { size: 40, bg: K.orange, a: fade(t, 39.36), sc: pop(t, 39.36) });
  return bg(K.cream) + chip(540, 200, 'LETZTEN HERBST', { size: 44, bg: K.ink2 }) + headline(t, 340, 'DAS PLAKAT', 88, { t0: 38.08 })
    + lisaDesk(t < 39.9 ? 'type' : 'type') + tag + p + fix;
}
