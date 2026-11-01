// 277.8–287.36: method 4 – replace "if you're too busy, forget it" with respect for their schedule
import { K, bg, methodCard, oldNew } from './lib.js';
export default function renderShot(t) {
  return bg(K.butter) + methodCard(t, 277.8, 4, 'DEIN ZEITPLAN ZÄHLT', 300, K.green)
    + oldNew(t, 560, '„Wenn du zu beschäftigt bist, lass es. Ich finde schon eine andere Lösung.“', 'Respektiere den Zeitplan des anderen.', 283.2, 285.04, { size: 56, tOld: 279.62 });
}
