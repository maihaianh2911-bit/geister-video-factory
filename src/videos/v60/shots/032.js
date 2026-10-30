// REGEL 4 card slams over frosted forest ground.
import { ruleShot, forest } from './lib.js';
export default function renderShot(t) {
  return ruleShot(4, t, 49.02, forest(t, { hz: 1000, px: -50 }) + `<rect x="0" y="0" width="1080" height="1920" fill="#9DB8C8" opacity=".12"/>`);
}
