// L11a 52.24–54.38: dark hall with two doors; the left door (FEHLER) swings shut on "Ende" (53.46) and the light behind it is gone;
// the right door stays dim in the background.
import { K, frame, cam, prog, eio, pop, label, pool, ein } from './lib.js';
import { voidRoom2, doorPanel } from './sets3.js';
export default function renderShot(t) {
  let s = voidRoom2(t);
  const shut = ein(prog(t, 52.9, 53.46));
  s += doorPanel(170, 520, 320, 720, .55 * (1 - shut), .55 * (1 - shut));
  s += `<g opacity=".45">${doorPanel(640, 520, 320, 720, .22, .25)}</g>`;
  s += pool(330, 1300, 240, 60, '#ffe08a', .4 * (1 - shut));
  const shake = t > 53.46 ? 6 * Math.exp(-(t - 53.46) * 8) * Math.sin((t - 53.46) * 40) : 0;
  s = cam(s, 330, 880, 1.12 + .04 * eio(prog(t, 52.24, 54.38)), shake);
  s += label('FEHLER', 540, 250, 110, { p: pop(t, 52.42, .45), fill: '#ffffff' });
  return frame(s);
}
