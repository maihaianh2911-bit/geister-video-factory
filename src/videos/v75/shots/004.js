// 9.86–12.76: messages don't go out ("nicht raus" 11.78–11.94) — close on the chat: your message sits with a red warning instead of sending
import { K, DEFS, BG, phone, reach, TX, cam, prog, eio, f1 } from './lib.js';
export function chatScreen(t, fail) {
  return `<rect x="-90" y="-180" width="180" height="40" fill="${K.ind2}"/>${TX('CHAT', 0, -152, 26, K.greyL)}
    <rect x="-84" y="-110" width="120" height="50" rx="20" fill="${K.ind3}"/><rect x="-30" y="0" width="120" height="56" rx="20" fill="${K.dataD}" opacity="${fail ? .55 : 1}"/>
    ${fail ? `<circle cx="-56" cy="28" r="22" fill="${K.red}"/>${TX('!', -56, 40, 34, K.white)}` : ''}<rect x="-90" y="130" width="180" height="44" rx="22" fill="${K.ind2}"/>`;
}
export default function renderShot(t) {
  const fail = t > 11.7, tap = eio(prog(t, 10.2, 10.9));
  return `${DEFS}${BG()}${cam(`${phone(540, 900, 2.3, chatScreen(t, fail))}${reach(1250, 1800, 760 - 60 * tap, 1500 - 160 * tap, 1.5)}`, 1, 540, 900)}`;
}
