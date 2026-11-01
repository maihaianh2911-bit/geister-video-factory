// 40.5–51.62: Lisa pauses; I quickly apologise and ask – "only a few words, won't take long"
import { K, bg, fade, prog, fig, poseAt, bubble, lisaDesk, poster, chip } from './lib.js';
export default function renderShot(t) {
  const ich = fig(230, 1340, 1.2, 'ich', poseAt(t, [[40.5, 'stand'], [42.78, 'bow'], [46.86, 'show']]), { prop: t >= 46.86 ? poster(-20, -150, 100, 0) : '' });
  const tr = lisaDesk(poseAt(t, [[40.5, 'type'], [41.64, 'sit']]));
  const lines = [
    { s: 'Entschuldige bitte die Störung.', a: fade(t, 44.72) },
    { s: 'Kannst du das hier ändern?', a: fade(t, 46.58) },
    { s: 'Nur ein paar Wörter …', a: fade(t, 48.4) },
    { s: '… dauert bestimmt nicht lange.', a: fade(t, 49.62) },
  ];
  const b = bubble(70, 300, 940, [{ s: 'Lisa, …', a: fade(t, 44.06) }, ...lines], { size: 54, a: fade(t, 43.62), tail: [300, 830] });
  return bg(K.cream) + chip(540, 200, 'ICH, SCHNELL:', { size: 44, bg: K.ink2, a: fade(t, 42.78) }) + tr + ich + b.svg;
}
