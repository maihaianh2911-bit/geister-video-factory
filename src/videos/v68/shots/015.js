// 35.48–37.74: the soft egg lies whole in the open palm — it does not run through the fingers ("zerläuft nicht")
import { K, OL, f1, prog, eio, eout, lerp, card } from './lib.js';
import { closeBG, egg } from './sets.js';
export default function renderShot(t) {
  const b = Math.sin(Math.max(0, t - 35.6) * 9) * Math.exp(-Math.max(0, t - 35.6) * 3) * 6;
  const palm = `<path d="M 1180 1500 L 760 1210" fill="none" ${OL(60)}/><path d="M 300 1080 Q 540 1260 780 1080 L 800 1200 Q 540 1360 290 1190 Z" fill="${K.ink}"/>
    ${[0, 1, 2, 3].map(i => `<path d="M ${330 + i * 30} ${1100 + i * 10} q -40 -40 -20 -90" fill="none" ${OL(34)}/>`).join('')}`;
  return `${closeBG()}${palm}${egg(540, 940 + b, 3, { id: 'e15', shell: 0, w: 7, dent: 0 })}`;
}
