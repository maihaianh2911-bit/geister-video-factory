// REGEL 2 card slams in exactly like REGEL 1/5; below it a hand holds the phone up, screen lit, ready to dial.
import { ruleShot, forest, phone, battery, bars, armTo, P, K, TX } from './lib.js';
export default function renderShot(t) {
  const scr = `${bars(-40, -60, .9, 1)}${battery(30, -74, .4, .04, K.red)}${TX('112', 0, 30, 54, '#FFFFFF')}<circle cx="0" cy="80" r="18" fill="#2EB872"/>`;
  return ruleShot(2, t, 20.2, forest(t, { hz: 1050, px: 20 }) + armTo(1160, 1900, 640, 1260, 120, P.red.j, -1, P.red.skin) + phone(540, 1160, 1.5, -6, { on: 1, screen: scr }));
}
