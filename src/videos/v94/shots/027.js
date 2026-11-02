// L18b 76.60–78.90: close-up: the stopwatch stops at 4:00 on "vier" (77.88) → label "4 MIN"; the laptop shows "Gesendet ✓" on "Minuten" (78.12).
import { K, frame, cam, laptop, chip, label, check, T, pool, pop, prog, eio, f1 } from './lib.js';
import { room } from './sets.js';
import { watch } from './026.js';
export default function renderShot(t) {
  let s = room(t, { mood: 'day', strong: true });
  s += pool(540, 800, 500, 400, '#fff3b0', .3);
  const sent = t >= 78.12;
  const inner = sent ? `<rect x="-212" y="-284" width="424" height="268" fill="#eaf6ee"/><circle cx="0" cy="-170" r="56" fill="${K.green}"/>${check(0, -170, 1.3, '#fff', fade2(t))}${T(0, -60, 'Gesendet', 46, { fill: K.green })}` : `<rect x="-212" y="-284" width="424" height="268" fill="#e9eef5"/>${T(0, -150, 'An: Vermieter', 36, { fill: K.txt })}<rect x="-90" y="-100" width="180" height="56" rx="12" fill="#3d6fb6"/>${T(0, -62, 'Senden', 28, { fill: '#fff' })}`;
  s += `<rect x="-60" y="1360" width="1200" height="640" fill="#8a5a3c" stroke="${K.ink}" stroke-width="5"/>`;
  s += laptop(700, 1360, 1.3, { inner });
  const stopped = t >= 77.88, bump = stopped ? 1 + .08 * Math.exp(-(t - 77.88) * 8) : 1;
  s += `<g transform="translate(330 700) scale(${f1(bump * 1000) / 1000})"><circle cx="0" cy="0" r="220" fill="#fff" stroke="${K.ink}" stroke-width="12"/><rect x="-40" y="-290" width="80" height="70" rx="12" fill="${K.ink}"/>${Array.from({ length: 12 }, (_, i) => `<path d="M ${f1(Math.sin(i * Math.PI / 6) * 180)} ${f1(-Math.cos(i * Math.PI / 6) * 180)} L ${f1(Math.sin(i * Math.PI / 6) * 200)} ${f1(-Math.cos(i * Math.PI / 6) * 200)}" stroke="${K.ink}" stroke-width="8"/>`).join('')}<path d="M 0 0 L ${f1(170 * Math.sin(Math.min(t, 77.88) * 3))} ${f1(-170 * Math.cos(Math.min(t, 77.88) * 3))}" stroke="${K.red}" stroke-width="14" stroke-linecap="round"/><circle r="16" fill="${K.ink}"/>${T(0, 120, watch(t), 76, { fill: stopped ? K.red : K.txt })}</g>`;
  s = cam(s, 540, 700, 1.0 + .05 * eio(prog(t, 76.6, 78.9)));
  s += label('4 MIN', 760, 330, 120, { p: pop(t, 77.88, .4) });
  return frame(s);
}
const fade2 = t => eio(prog(t, 78.12, 78.4));
