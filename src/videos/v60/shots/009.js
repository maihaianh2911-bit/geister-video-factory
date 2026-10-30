// REGEL 1 card slams over the four friends standing together on the track.
import { ruleShot, forest, fig } from './lib.js';
export default function renderShot(t) {
  return ruleShot(1, t, 12.24, forest(t, { hz: 1050, px: 10 }) + fig('green', 250, 1500, .8, { look: 6 }) + fig('red', 430, 1500, .85, { look: 6 }) + fig('blue', 640, 1510, .85, { hug: true, cold: true }) + fig('yellow', 830, 1500, .8, { look: -6 }));
}
