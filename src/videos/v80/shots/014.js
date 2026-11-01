// 87.34–101.32: Châu's message – he admits the graphic isn't right yet and names her concrete strength
import { K, bg, fade, prog, phone, chat, chip } from './lib.js';
export default function renderShot(t) {
  const W = 760;
  const c1 = chat(W, 130, ['Trang, ich sitze lange an dieser Grafik – irgendwie stimmt sie noch nicht.'], 'r', { a: fade(t, 87.4), size: 44 });
  const c2 = chat(W, 130 + c1.h + 30, [{ s: 'Dein Plakat letztes Mal wurde von den Kunden sehr gelobt.', mark: prog(t, 96.74, 97.3) }], 'r', { a: fade(t, 93.38), size: 44 });
  const c3 = chat(W, 130 + c1.h + c2.h + 60, [{ s: 'Deine Farbauswahl: gleich viel lebendiger.', mark: prog(t, 98.36, 98.9) }], 'r', { a: fade(t, 98.02), size: 44 });
  return bg(K.mint) + chip(540, 160, 'CHÂUS NACHRICHT', { size: 44, bg: K.blue }) + phone(160, 240, W, 1080, c1.svg + c2.svg + c3.svg, { title: 'An: Trang' })
    + chip(540, 1270, 'STIMMT NOCH NICHT', { size: 46, bg: K.ink2, a: fade(t, 91.62) * (1 - fade(t, 98.2)) })
    + chip(540, 1270, 'KONKRETE STÄRKE', { size: 46, bg: K.orange, a: fade(t, 98.36), sc: 1 });
}
