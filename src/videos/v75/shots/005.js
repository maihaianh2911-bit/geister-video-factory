// 12.76–14.76: news don't load ("laden nicht" 13.18–13.68) — the news feed stays grey placeholder bars with a spinner
import { K, DEFS, BG, phone, spinner, TX, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const sh = .45 + .25 * Math.sin(t * 6);
  const scr = `${TX('NEWS', 0, -150, 30, K.greyL)}${[0, 1, 2].map(i => `<rect x="-84" y="${-110 + i * 90}" width="168" height="70" rx="10" fill="${K.ind3}" opacity="${f1(sh)}"/>`).join('')}${spinner(0, 150, 22, t)}`;
  return `${DEFS}${BG()}${cam(phone(540, 900, 2.3, scr), 1 + .04 * eio(prog(t, 12.76, 14.76)), 540, 900)}`;
}
