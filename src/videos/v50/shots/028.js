// 53.3–54.9 · "die Zunge an den Gaumen drücken" — cross-section: the tongue lifts and presses on the cold palate
import { P, pastel, profileHead, label, arrow, prog, eio, back, lerp } from '../lib.js';

export default function renderShot(t) {
  const s = 4.6, px = 500, py = 820;
  const up = eio(prog(t, 53.85, 54.3));
  const press = t > 54.32 ? 1 + .04 * Math.sin((t - 54.32) * 16) : 1;
  return `${pastel(t, { color: '#EEF6FA' })}
    ${profileHead(px - 110 * s, py - 62 * s, s, { t, id: 's28', xray: 1, palCold: 1, tongueUp: up * press, eye: 'open', brow: .4 })}
    ${arrow(px + 20, py + 420, px + 20, py + 420 - 150 * up, P.tealD, 26, up > .05 ? 1 : 0)}
    ${label('ZUNGE AN DEN GAUMEN', 540, 250, 64, { scale: back(prog(t, 53.4, 53.65)), w: 900, fill: P.teal, color: '#fff' })}`;
}
