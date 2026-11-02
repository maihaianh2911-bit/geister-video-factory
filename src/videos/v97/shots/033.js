// L16a 85.10–88.00: medium, bright room: du is free of notes, relaxed, stretches; "10 SEKUNDEN" with a stopwatch on "zehn Sekunden" (86.32).
import { frame, cam, shadow, pop, prog, eio, person, label, f1, K } from './lib.js';
import { room, fgTable } from './sets.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'day', clock: false });
  const st = eio(prog(t, 85.2, 85.8)) * (1 - eio(prog(t, 86.6, 87.2)));
  s += shadow(540, 1650) + person('du', 540, 1650, 1, { t, seed: 3, look: [0, -4], eyes: st > .5 ? 'closed' : 'n', brows: 'calm', mouth: 'smile', armL: [-150 - 60 * st, -330 - 560 * st], elbowL: [-250, -480 - 160 * st], armR: [150 + 60 * st, -330 - 560 * st], elbowR: [250, -480 - 160 * st] });
  s += fgTable(t, { glass: 900, mugX: 180, phone: 600 });
  s = cam(s, 540, 1100, 1 + .06 * eio(prog(t, 85.1, 88)));
  const p = pop(t, 86.32, .45);
  if (p > 0) {
    const a = prog(t, 86.32, 88) * 360, r = Math.PI / 180;
    s += `<g transform="translate(540 330) scale(${f1(p * 1000) / 1000})"><circle cx="-380" cy="0" r="62" fill="#fff" stroke="${K.ink}" stroke-width="10"/><rect x="-400" y="-90" width="40" height="26" rx="6" fill="${K.ink}"/><path d="M -380 0 L ${f1(-380 + Math.sin(a * r) * 46)} ${f1(-Math.cos(a * r) * 46)}" stroke="${K.red}" stroke-width="9" stroke-linecap="round"/></g>`;
    s += label('10 SEKUNDEN', 610, 360, 84, { p });
  }
  return frame(s);
}
