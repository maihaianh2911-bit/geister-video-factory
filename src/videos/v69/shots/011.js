// 31.8–34.44: …until there's a connection to the emergency call centre — the speaker grille lights up, sound waves come out ("Verbindung"); NOTRUF
import { K, DEFS, panel, light, label, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const on = eout(prog(t, 32.0, 32.4));
  let waves = '';
  for (let i = 0; i < 3; i++) { const u = (t * 1.2 + i / 3) % 1; if (on > 0) waves += `<path d="M ${f1(700 + 140 * u)} ${f1(1290 - 60 * u)} q ${f1(30 + 30 * u)} ${f1(70 + 40 * u)} 0 ${f1(140 + 120 * u)}" fill="none" stroke="${K.amber}" stroke-width="10" stroke-linecap="round" opacity="${f1(on * (1 - u))}"/>`; }
  return `${DEFS}<g transform="translate(540 1360) scale(1.4) translate(-540 -1360)">${panel(t, { talk: on > .5, bellLit: true })}</g><rect x="-60" y="-60" width="1200" height="2040" fill="#05080A" opacity=".35"/>${light(540, 1300, 460, 1)}${waves}${label(540, 300, 'NOTRUF', on, K.amber, 80)}`;
}
