// 14.76–17.42: your banking app only shows a rotating circle ("Banking-App" 14.76, "rotierenden Kreis" 15.82–16.48)
import { K, DEFS, BG, phone, spinner, TX, cam, prog, eio } from './lib.js';
export default function renderShot(t) {
  const scr = `${TX('BANK', 0, -130, 40, K.greyL)}<rect x="-80" y="-100" width="160" height="10" rx="5" fill="${K.ind3}"/>${spinner(0, 30, 56, t * 1.2, K.data)}`;
  return `${DEFS}${BG()}${cam(phone(540, 900, 2.4, scr), 1 + .06 * eio(prog(t, 14.76, 17.42)), 540, 900)}`;
}
