// L18b 76.5–78.9: close on the stopwatch and the laptop — it stops at 4 MIN on "vier Minuten" (77.88); the e-mail shows "Gesendet ✓".
import { K, frame, cam, study, laptop, mailScreen, stopwatch, chip, light, T, prog, eio, eout, lerp, cl, pop, f1 } from './lib.js';
export default function renderShot(t) {
  let s = study({ mood: 'day', dx: 30, clock: [10, 4] }) + light(540, 700, 500, 500, '#fff6d0', .35);
  const stop = 77.88, fr = t < stop ? lerp(.8, 1, prog(t, 76.5, stop)) : 1;
  const done = t >= stop;
  s += stopwatch(330, 700, 1.5, fr * .999, { done });
  const secs = Math.floor(lerp(212, 240, cl((t - 76.5) / (stop - 76.5))));
  s += `<rect x="190" y="930" width="280" height="90" rx="16" fill="#1d1d1d"/>` + T(330, 994, `${Math.floor(secs / 60)}:${String(secs % 60).padStart(2, '0')}`, 58, { fill: done ? '#6fe08a' : '#fff' });
  s += `<rect x="-60" y="1360" width="1200" height="640" fill="#a8774f" stroke="${K.ink}" stroke-width="5"/>`;
  s += laptop(720, 1362, 1.3, { screen: mailScreen({ typed: 1, sent: eio(prog(t, 78.15, 78.45)) }) });
  s = cam(s, 540, 900, 1.02 + .06 * eio(prog(t, 76.5, 78.9)) + .04 * eout(prog(t, stop, stop + .3)));
  s += chip(560, 310, '4 MIN', { p: pop(t, stop, .45), size: 96, bg: K.yellow });
  return frame(s, { vig: .4 });
}
