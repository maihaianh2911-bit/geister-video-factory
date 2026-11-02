// L13a 63.6–65.86: next morning, sunny kitchen; day card AM NÄCHSTEN MORGEN; young du holds the phone and taps the call button on
// "rufst du Opa an" (64.44), the phone starts ringing (yellow arcs) and du waits, hopeful.
import { K, frame, cam, prog, eio, pop, person, shadow, label, f1 } from './lib.js';
import { kitchen } from './sets.js';
import { callPhone } from './sets3.js';
export default function renderShot(t) {
  let s = kitchen(t, {});
  const calling = t > 64.5;
  s += shadow(420, 1650);
  const ph = callPhone(t, 0, 0, .42, { calling, sub: calling ? 'Anruf …' : 'Mobil', id: 'k20' });
  // phone held in the right hand in front of the chest (local coords of person)
  s += person('du', 420, 1650, 1.04, { t, seed: 1, look: [10, 14], brows: calling ? 'up' : 'calm', mouth: calling ? 'smile' : 'small', armR: [70, -370], elbowR: [210, -340], armL: [10 + 30 * eio(prog(t, 64.1, 64.44)), -400 + 40 * eio(prog(t, 64.1, 64.44))], elbowL: [-180, -380], front: `<g transform="translate(60 -420)">${ph}</g>` });
  if (calling) { const r = (t - 64.5) % .8 / .8; s += `<g stroke="${K.yellow}" stroke-width="8" fill="none" stroke-linecap="round" opacity="${(1 - r).toFixed(2)}"><path d="M ${f1(580 + 40 * r)} 1175 q 24 40 0 80"/><path d="M ${f1(384 - 40 * r)} 1175 q -24 40 0 80"/></g>`; }
  s = cam(s, 480, 1000, 1.04 + .06 * eio(prog(t, 63.6, 65.86)));
  s += label('AM NÄCHSTEN MORGEN', 540, 250, 70, { p: pop(t, 63.7, .45) });
  return frame(s);
}
