// v100 barrel: everything a shot needs + du's battery timeline over the whole video.
export * from './lib.js';
export * from './sets.js';
export * from './extra.js';
import { level } from './extra.js';
// du's battery: hook demo (100→70), Mon–Wed drains (80/60/30, red 5 % blinking on Wednesday), Thursday green 90.
export function duBat(t) {
  if (t < 4.86) return { lvl: level(t, [[3.86, 100, 70]]), drop: [3.86, 30] };
  if (t < 66.42) {
    const lvl = level(t, [[20.81, 100, 80], [28.5, 80, 60], [36.38, 60, 30], [40.3, 30, 5]]);
    const drops = [[20.81, 20], [28.5, 20], [36.38, 30], [40.3, 25]];
    let drop; for (const d of drops) if (t >= d[0]) drop = d;
    return { lvl, drop, blink: t >= 40.3 };
  }
  return { lvl: 90 };
}
