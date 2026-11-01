// 40.08–51.12: Trang pauses; I quickly apologise and ask – "only a few words, won't take long"
import { K, bg, fade, prog, fig, poseAt, bubble, trangDesk, poster, chip } from './lib.js';
export default function renderShot(t) {
  const ich = fig(230, 1340, 1.2, 'ich', poseAt(t, [[40.08, 'stand'], [42.44, 'bow'], [46.3, 'show']]), { prop: t >= 46.3 ? poster(-20, -150, 100, 0) : '' });
  const tr = trangDesk(poseAt(t, [[40.08, 'type'], [41.2, 'sit']]));
  const lines = [
    { s: 'Entschuldige bitte die Störung.', a: fade(t, 44.18) },
    { s: 'Kannst du das hier ändern?', a: fade(t, 46.02) },
    { s: 'Nur ein paar Wörter …', a: fade(t, 47.8) },
    { s: '… dauert bestimmt nicht lange.', a: fade(t, 49.24) },
  ];
  const b = bubble(70, 300, 940, [{ s: 'Trang, …', a: fade(t, 43.1) }, ...lines], { size: 54, a: fade(t, 43.0), tail: [300, 830] });
  return bg(K.cream) + chip(540, 200, 'ICH, SCHNELL:', { size: 44, bg: K.ink2, a: fade(t, 42.44) }) + tr + ich + b.svg;
}
