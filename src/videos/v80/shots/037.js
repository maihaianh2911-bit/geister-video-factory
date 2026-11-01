// 276.9–286.36: method 4 – replace "if you're too busy, forget it" with respect for their schedule
import { K, bg, methodCard, oldNew } from './lib.js';
export default function renderShot(t) {
  return bg(K.butter) + methodCard(t, 276.9, 4, 'DEIN ZEITPLAN ZÄHLT', 300, K.green)
    + oldNew(t, 560, '„Wenn du zu beschäftigt bist, lass es. Ich finde schon eine andere Lösung.“', 'Respektiere den Zeitplan des anderen.', 282.2, 284.14, { size: 56, tOld: 278.42 });
}
