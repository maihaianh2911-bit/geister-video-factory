// 34.22–40.08: last autumn – Trang from the design department, an event poster to revise
import { K, bg, chip, fade, pop, trangDesk, poster, headline } from './lib.js';
export default function renderShot(t) {
  const tag = chip(700, 760, 'TRANG · DESIGN', { size: 42, bg: K.purple, a: fade(t, 35.52), sc: pop(t, 35.52) });
  const pa = fade(t, 37.6);
  const p = `<g transform="translate(0 ${(1 - pa) * 40})">${poster(150, 470, 250, 0, { a: pa })}</g>`;
  const fix = chip(275, 870, 'ÜBERARBEITEN', { size: 40, bg: K.orange, a: fade(t, 38.94), sc: pop(t, 38.94) });
  return bg(K.cream) + chip(540, 200, 'LETZTEN HERBST', { size: 44, bg: K.ink2 }) + headline(t, 340, 'DAS PLAKAT', 88, { t0: 37.68 })
    + trangDesk(t < 39.5 ? 'type' : 'type') + tag + p + fix;
}
