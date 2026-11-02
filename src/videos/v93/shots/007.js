// L4b 18.6–20.76 Close-up of the man: worried face lit by the phone, sweat drop; the bubble now reads
// „Die Kita hat angerufen. Mein Sohn hat hohes Fieber.“ — 2nd sentence on "Mein Sohn" (18.72), thermometer icon on "Fieber".
import { K, frame, cam, setTrain, trainFG, person, thought, phone, icon, pop, prog } from './lib.js';
import { push, CU } from './base.js';
export default function renderShot(t) {
  let s = setTrain(t, { heavy: true });
  s += person('mann', 560, CU.y, CU.s, { t, seed: 7, brows: 'worried', mouth: 'wavy', look: [-3, 10], eyes: 'half', sweat: true, armR: [10, -236], front: phone(-4, -258, .95, { rot: 4 }), rimL: '#dff1ff' });
  const tp = pop(t, 19.66, .35);
  s += thought(540, 380, ['Die Kita hat angerufen.', 'Mein Sohn hat', 'hohes Fieber.'], 600, 640, { size: 54, w: 760, h: 300, text: .34 + .66 * prog(t, 18.72, 19.4), inner: tp > 0 ? `<g opacity="${tp > 1 ? 1 : tp}">${icon.thermo(850, 430, 1.1)}</g>` : '' });
  s += trainFG(80, { strap: false });
  return frame(cam(s, 560, 900, push(t, 18.6, 20.76, 1.02, 1.1)), { tint: ['#3a6ea8', .1] });
}
