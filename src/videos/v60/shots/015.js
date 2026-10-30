// REGEL 2 card slams over the phone in the dark.
import { ruleShot, phone, K } from './lib.js';
export default function renderShot(t) {
  return ruleShot(2, t, 20.2, `<rect x="0" y="0" width="1080" height="1920" fill="#0E161A"/>${phone(540, 1150, 2.2, 8, { on: 1 })}`);
}
