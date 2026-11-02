// L8 31.38–33.4 Supermarket checkout at noon, white ceiling light. The old woman (silver bun, red scarf, tote bag) stands at the belt
// counting coins out of her purse; du waits behind her with a basket, glancing at the queue.
import { K, frame, cam, setMarket, checkout, person, shadow, coin, prog, f1 } from './lib.js';
import { push } from './base.js';
export default function renderShot(t) {
  let s = setMarket(t);
  s += shadow(820, 1520, 150) + person('du', 820, 1520, 1.45, { t, seed: 2, look: [-9, 4], brows: 'flat', mouth: 'flat', armL: [-60, -200], front: `<path d="M -150 -200 h 120 l -14 90 h -92 z" fill="#d9493f" stroke="${K.ink}" stroke-width="5"/><path d="M -130 -200 q 30 -50 60 0" stroke="${K.ink}" stroke-width="6" fill="none"/>` });
  // woman, hands at the counter with coins
  const k = Math.floor((t - 31.4) / .45);
  s += person('oma', 380, 1600, 1.55, { t, seed: 13, tote: true, look: [0, 9], brows: 'worried', mouth: 'tight', armR: [70, -170], armL: [-10, -170] });
  s += checkout(1340, { items: true, tx: 980 });
  // purse + coins on the counter edge
  s += `<path d="M 470 1340 q 0 -60 60 -60 h 40 q 60 0 60 60 z" fill="#8a5a8a" stroke="${K.ink}" stroke-width="5"/>`;
  for (let i = 0; i < Math.max(0, Math.min(5, k)); i++) s += coin(380 + i * 34, 1322 - (i % 2) * 6, 20);
  return frame(cam(s, 520, 1000, push(t, 31.38, 33.4, 1.0, 1.06)));
}
