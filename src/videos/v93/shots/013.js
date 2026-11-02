// L8b 33.4–35.06 Close-up on the counter: her hand slides coins one by one across the counter ("ewig ihre Münzen"),
// the receipt display shows the total, her purse is almost empty.
import { K, frame, cam, setMarket, coin, T, prog, eio, lerp, f1 } from './lib.js';
import { push } from './base.js';
const CT = [33.46, 33.84, 34.06, 34.4, 34.72];
export default function renderShot(t) {
  let s = setMarket(t, { heavy: true });
  // counter top (sharp)
  s += `<rect x="-60" y="1000" width="1200" height="980" fill="#7c8894" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1000" width="1200" height="40" fill="#9aa5b0"/>`;
  // register display
  s += `<rect x="640" y="560" width="360" height="200" rx="16" fill="#2b2f36" stroke="${K.ink}" stroke-width="5"/><rect x="664" y="584" width="312" height="150" rx="8" fill="#0f2a1e"/>${T(820, 690, '12,47 €', 76, { fill: '#7dff9e' })}<rect x="800" y="760" width="40" height="240" fill="#3a3f46"/>`;
  // purse
  s += `<path d="M 80 1180 q 0 -110 110 -110 h 90 q 110 0 110 110 z" fill="#8a5a8a" stroke="${K.ink}" stroke-width="6"/><path d="M 120 1080 q 120 -60 240 0" stroke="#d8b04a" stroke-width="8" fill="none"/>`;
  // coins already counted
  let n = CT.filter(c => t >= c + .25).length;
  for (let i = 0; i < n; i++) s += coin(900 - i * 80, 1300 + (i % 2) * 14, 36);
  // moving coin + hand (sleeve from the left)
  const cur = CT.findIndex(c => t < c + .25);
  let hx = 330, hy = 1150;
  if (cur >= 0) {
    const p = eio(prog(t, CT[cur] - .2, CT[cur] + .25));
    hx = lerp(330, 860 - cur * 80, p); hy = lerp(1150, 1290 + (cur % 2) * 14, p) - Math.sin(p * Math.PI) * 30;
  }
  s += `<path d="M -80 1500 Q ${f1(hx - 200)} ${f1(hy + 120)} ${f1(hx)} ${f1(hy)}" stroke="${K.ink}" stroke-width="120" fill="none" stroke-linecap="round"/><path d="M -80 1500 Q ${f1(hx - 200)} ${f1(hy + 120)} ${f1(hx)} ${f1(hy)}" stroke="#7d6f8f" stroke-width="100" fill="none" stroke-linecap="round"/><circle cx="${f1(hx)}" cy="${f1(hy)}" r="46" fill="${K.ink}"/>`;
  if (cur >= 0) s += coin(hx + 46, hy + 22, 34);
  return frame(cam(s, 540, 1100, push(t, 33.4, 35.06, 1.0, 1.08)));
}
