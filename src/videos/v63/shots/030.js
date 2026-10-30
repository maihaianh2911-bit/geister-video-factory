// 55.7–57.64: the signal — his thumb hovers over SEND, he glances up (Zeichen geben)
import { K, DEFS, BG, phone, grain, cam, prog, eio, lerp, TX, f1 } from './lib.js';
export default function renderShot(t) {
  const th = eio(prog(t, 56.2, 56.9));
  const scr = `${TX('POLIZEI', 100, 70, 30, K.ink)}<rect x="20" y="100" width="160" height="120" rx="14" fill="#B9C9C2"/><rect x="50" y="300" width="100" height="50" rx="25" fill="${K.red}"/><path d="M 84 325 L 116 325 M 104 313 L 116 325 L 104 337" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  return `${DEFS}${BG(K.brownD)}${cam(phone(540, 900, 2.6, 0, scr) + `<g transform="translate(${f1(lerp(860, 600, th))} ${f1(lerp(1500, 1440, th))}) rotate(-40)"><rect x="-40" y="-20" width="80" height="320" rx="40" fill="${K.skin}" stroke="${K.ink}" stroke-width="6"/></g>`, 1, 540, 900)}${grain(t)}`;
}
