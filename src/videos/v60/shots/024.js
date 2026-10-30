// REGEL 3 card slams over a dark tree trunk.
import { ruleShot, forest, trunk } from './lib.js';
export default function renderShot(t) {
  return ruleShot(3, t, 35.68, forest(t, { hz: 1100, px: 40 }) + trunk(820, 120));
}
