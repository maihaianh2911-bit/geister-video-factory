// 179.6–188.26: method 1 – replace the apology with a concrete reason why exactly this person
import { K, bg, methodCard, oldNew } from './lib.js';
export default function renderShot(t) {
  return bg(K.lav) + methodCard(t, 179.75, 1, 'WARUM GERADE DU?', 300, K.purple)
    + oldNew(t, 560, '„Tut mir leid, dass ich dich störe.“', 'Sag konkret, warum du gerade diese Person fragst.', 183.56, 185.34, { size: 62, tOld: 181.2 });
}
