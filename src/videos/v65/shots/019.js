// 55.68–58.18: BESTÄUBUNG — pollen sticks to the mosquito on flower A; it flies to flower B and leaves pollen there on "weiter"
import { K, DEFS, BG, vig, kcard, mosquito, flower, f1, prog, eio, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const fly = eio(prog(t, 56.6, 57.35));
  const A = [300, 760], B = [800, 860];
  const mx = lerp(A[0], B[0], fly), my = lerp(A[1], B[1], fly) - 160 * Math.sin(fly * Math.PI);
  const stick = eout(prog(t, 55.9, 56.4)), drop = eout(prog(t, 57.4, 57.8));
  let pol = '';
  for (let i = 0; i < 7; i++) {
    const ox = (hash(i) - .5) * 40, oy = (hash(i + 4) - .5) * 30;
    const onA = [A[0] + 30 + ox * 2, A[1] + 30 + oy];
    const onM = [mx + 60 + ox, my - 30 + oy];
    const onB = [B[0] + 30 + ox * 2, B[1] + 30 + oy];
    const [x, y] = drop > 0 && i < 4 ? [lerp(onM[0], onB[0], drop), lerp(onM[1], onB[1], drop)] : [lerp(onA[0], onM[0], stick), lerp(onA[1], onM[1], stick)];
    pol += `<circle cx="${f1(x)}" cy="${f1(y)}" r="9" fill="${K.pollen}" stroke="${K.ink}" stroke-width="2"/>`;
  }
  const sc = `${BG('url(#mDusk)')}<rect x="-60" y="1300" width="1200" height="700" fill="#203A3A"/>
    ${flower(A[0], 1320, A[1] + 30, 1.6, { t })}${flower(B[0], 1320, B[1] + 30, 1.6, { t: t + 1 })}
    ${mosquito(mx, my, 1.1, { t, wings: fly > 0 && fly < 1 ? 1 : 0, sip: fly > 0 && fly < 1 ? 0 : .8 })}${pol}`;
  return `${DEFS}${sc}${kcard(540, 250, 'BESTÄUBUNG', 1, { sz: 80, col: K.pollen })}${vig()}`;
}
