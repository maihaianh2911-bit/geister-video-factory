// 8.4–11.78: if you only ate a little ("wenig" 9.48) and are healthy ("gesund" 10.96) — tiny piece in a calm stomach, labels
import { K, DEFS, BG, stomach, label, tick, cam, prog, eio, f1 } from './lib.js';
export default function renderShot(t) {
  const a = eio(prog(t, 9.4, 9.7)), b = eio(prog(t, 10.9, 11.2));
  const sc = `${BG(K.room)}<circle cx="540" cy="900" r="360" fill="${K.white}" stroke="${K.ink}" stroke-width="5"/>${stomach(540, 920, 2.4, { mood: b > .5 ? 'happy' : 'calm', inner: `<circle cx="10" cy="60" r="${f1(14)}" fill="${K.crumbD}" stroke="${K.ink}" stroke-width="3"/>` })}`;
  return `${DEFS}${cam(sc, 1 + .05 * eio(prog(t, 8.4, 11.78)), 540, 900)}${label(300, 360, 'WENIG', a)}${label(780, 1440 - 140, 'GESUND', b, K.tealD)}${tick(900, 1150, 1.2, b)}`;
}
