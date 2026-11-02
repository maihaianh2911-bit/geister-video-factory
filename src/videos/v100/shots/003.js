// L2a 4.86–7.06: a sharp planner sheet MO · DI · MI on a cool wall; one battery per day, each emptier (80 / 50 / 5 %), MI blinks red on "Mittwoch" (5.66); "LEER" on "leer" (6.52).
import { frame, cam, pop, prog, eio, battery, label, T, K, room, paper } from './all.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'blue', hh: 21, mm: 0, strong: true });
  s += `<rect x="90" y="330" width="900" height="900" rx="24" fill="#fbf8ef" stroke="${K.ink}" stroke-width="8"/><rect x="90" y="330" width="900" height="120" rx="24" fill="#3f6fb5" stroke="${K.ink}" stroke-width="7"/>` + T(540, 412, 'DIESE WOCHE', 60, { fill: '#fff' });
  const days = [['MO', 80, 4.95], ['DI', 50, 5.3], ['MI', 5, 5.66]];
  days.forEach(([d, l, t0], i) => {
    const y = 560 + i * 230, p = pop(t, t0, .4);
    s += T(230, y + 30, d, 84, { fill: i === 2 ? '#c23b52' : K.txt, op: Math.min(1, p * 2) });
    if (p > 0) s += battery(640, y, .95 * p, l, { t, blink: i === 2 && t > 5.9 });
    if (i < 2) s += `<path d="M 150 ${y + 115} H 930" stroke="#d8d0c0" stroke-width="4"/>`;
  });
  s = cam(s, 540, 800, 1.0 + .05 * eio(prog(t, 4.86, 7.06)), 0, 20 * prog(t, 4.86, 7.06));
  s += label('LEER', 540, 1360, 130, { p: pop(t, 6.52, .45), fill: '#ff5a4a' });
  return frame(s);
}
