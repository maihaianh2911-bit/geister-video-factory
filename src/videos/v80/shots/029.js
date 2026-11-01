// 219.6–228.66: method 2 – not "help me when it suits you", but show trust in their experience and judgement
import { K, bg, methodCard, oldNew } from './lib.js';
export default function renderShot(t) {
  return bg(K.mint) + methodCard(t, 219.6, 2, 'DEINE ERFAHRUNG ZÄHLT', 300, K.orange)
    + oldNew(t, 560, '„Hilf mir, wenn es dir gerade passt.“', 'Ich vertraue deiner Erfahrung und deinem Urteil.', 222.9, 225.28, { size: 62, tOld: 221.3 });
}
