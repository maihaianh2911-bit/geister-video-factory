// 61.64–71.52: I follow up by message; she answers bluntly
import { K, bg, fade, phone, chat, poster, chip, T } from './lib.js';
export default function renderShot(t) {
  const W = 760;
  const out = `<g opacity="${fade(t, 62.08)}" transform="translate(0 ${(1 - fade(t, 62.08)) * 24})"><rect x="${W - 24 - 220}" y="130" width="220" height="150" rx="26" fill="${K.blueL}" stroke="${K.ink}" stroke-width="4"/>${poster(W - 210, 150, 80, 0)}${T(W - 60, 240, '?', 90)}</g>`;
  const c1 = chat(W, 330, ['Ich habe auch meine eigene Arbeit.'], 'l', { a: fade(t, 65.02), size: 54 });
  const c2 = chat(W, 330 + c1.h + 30, ['Ich sitze hier nicht herum und warte darauf, etwas für dich zu erledigen.'], 'l', { a: fade(t, 67.02), size: 54 });
  return bg(K.pink) + phone(160, 230, W, 1080, out + c1.svg + c2.svg, { title: 'Lisa' })
    + chip(540, 160, 'IHRE ANTWORT: DIREKT', { size: 44, bg: K.red, a: fade(t, 64.16) });
}
