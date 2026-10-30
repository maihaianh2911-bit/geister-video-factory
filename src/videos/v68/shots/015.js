// 35.48–37.74: the soft egg lies whole in the open palm — it does not run through the fingers ("zerläuft nicht")
import { K, OL, f1, prog, eio, eout, lerp, card } from './lib.js';
import { closeBG, egg } from './sets.js';
export default function renderShot(t) {
  const b = Math.sin(Math.max(0, t - 35.6) * 9) * Math.exp(-Math.max(0, t - 35.6) * 3) * 6;
  const palm = `<path d="M 1180 1420 L 760 1170" fill="none" ${OL(56)}/><path d="M 320 1040 Q 540 1260 760 1080" fill="none" ${OL(64)}/>`;
  return `${closeBG()}${palm}${egg(540, 960 + b, 3, { id: 'e15', shell: 0, w: 7, dent: 0 })}`;
}
