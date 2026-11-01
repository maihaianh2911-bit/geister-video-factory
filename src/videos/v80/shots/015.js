// 101.1–107.66: "In design questions you are the expert – what should I change?"
import { K, bg, fade, prog, phone, chat, chip, pop } from './lib.js';
export default function renderShot(t) {
  const W = 760;
  const c3 = chat(W, 130, ['Deine Farbauswahl: gleich viel lebendiger.'], 'r', { size: 44 });
  const c4 = chat(W, 130 + c3.h + 30, [{ s: 'Bei Gestaltungsfragen bist du die Expertin.', mark: prog(t, 102.56, 103.03) }], 'r', { a: fade(t, 101.17), size: 50 });
  const c5 = chat(W, 130 + c3.h + c4.h + 60, ['Kannst du es dir ansehen und mir sagen, was ich ändern sollte?'], 'r', { a: fade(t, 103.96), size: 44 });
  return bg(K.mint) + chip(540, 160, 'JONAS’ NACHRICHT', { size: 44, bg: K.blue }) + phone(160, 240, W, 1080, `<g opacity=".45">${c3.svg}</g>` + c4.svg + c5.svg, { title: 'An: Lisa' })
    + chip(540, 1270, 'DU BIST DIE EXPERTIN', { size: 46, bg: K.orange, a: fade(t, 102.68), sc: pop(t, 102.68) });
}
