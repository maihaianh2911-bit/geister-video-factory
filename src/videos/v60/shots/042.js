// REGEL 5 card slams over the dark forest with a faint light in the distance.
import { ruleShot, forest } from './lib.js';
export default function renderShot(t) {
  return ruleShot(5, t, 66.52, forest(t, { hz: 1050, px: 60 }) + `<circle cx="820" cy="1000" r="90" fill="url(#fBlue)"/>`);
}
