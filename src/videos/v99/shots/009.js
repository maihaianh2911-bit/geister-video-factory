// L5a 21.22–23.98: card MITTAGS; close-up of du's phone: chat with his girlfriend (bun avatar) stops at 09:15; the phone clock runs on 12:00 → 14:30 ("seit Stunden"), "Keine neuen Nachrichten".
import { K, frame, cam, prog, eio, pop, label } from './lib.js';
import { office2 } from './sets.js';
import { chatPhone } from './props.js';
const INK = K.ink;
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  const p = eio(prog(t, 22.0, 23.3)), mins = Math.round(720 + 150 * p), hh = Math.floor(mins / 60), mm = mins % 60;
  const clock = `${hh}:${String(mm).padStart(2, '0')}`;
  s += chatPhone(t, 540, 860, 1.7, { id: 'c9', name: 'Freundin', who: 'gf', clock, status: 'zuletzt online 09:15', rot: 2,
    msgs: [{ lines: ['Bis später!'], time: '09:15', p: 1, size: 30, me: false }, { lines: ['Alles okay?'], time: '11:58', p: 1, size: 30, me: true }], empty: 'Keine neuen Nachrichten' });
  s += `<path d="M 780 1520 Q 700 1400 660 1350" stroke="${INK}" stroke-width="92" fill="none" stroke-linecap="round"/><path d="M 780 1520 Q 700 1400 660 1350" stroke="${K.du}" stroke-width="74" fill="none" stroke-linecap="round"/><circle cx="650" cy="1340" r="44" fill="${INK}"/>`;
  s = cam(s, 540, 860, 1.0 + .06 * eio(prog(t, 21.22, 23.98)));
  s += label('MITTAGS', 540, 220, 110, { p: pop(t, 21.3, .45) });
  return frame(s);
}
