// L19b 82.94–86.244: push in to the weekly plan on the fridge — "Schreib auf, wann": times fill in row by row
// (WANN? on "wann" 83.9); du beside it, relaxed and smiling, holding the pen.
import { K, frame, cam, kitchen, person, chip, T, pen, light, prog, eio, eout, lerp, cl, pop, f1, op } from './lib.js';
const ROWS = [['Mo', '8:00', 'E-Mail Vermieter', 83.34], ['Mo', '12:00', 'Zahnarzt anrufen', 83.9], ['Mi', '18:00', 'Oma anrufen', 84.38], ['Do', '19:00', 'Steuer', 84.8], ['Sa', '10:00', 'Wäsche', 85.2]];
export default function renderShot(t) {
  let s = kitchen({ dx: 20, clock: [11, 5] }) + light(640, 760, 420, 520, '#fff6d0', .3);
  // fridge door (sharp, big) with the plan
  s += `<rect x="380" y="200" width="700" height="1700" rx="30" fill="#eef1f2" stroke="${K.ink}" stroke-width="6"/><rect x="420" y="560" width="20" height="300" rx="10" fill="#b9c0c6"/><circle cx="1000" cy="270" r="20" fill="${K.red}"/><circle cx="470" cy="300" r="16" fill="${K.yellow}"/>`;
  s += `<rect x="470" y="380" width="560" height="760" fill="#fff" stroke="${K.ink}" stroke-width="5"/><circle cx="750" cy="384" r="14" fill="${K.blue}"/>` + T(750, 450, 'MEINE WOCHE', 46, { fill: K.ink });
  ROWS.forEach(([d, h, what, t0], i) => {
    const y = 540 + i * 116, w = eio(prog(t, t0, t0 + .35));
    s += `<line x1="490" y1="${y + 46}" x2="1010" y2="${y + 46}" stroke="#d6dde3" stroke-width="3"/>` + T(500, y + 20, d, 34, { fill: K.ink, anchor: 'start' });
    if (w > 0) s += `<g opacity="${op(w)}"><rect x="560" y="${y - 22}" width="128" height="56" rx="12" fill="${K.yellow}" stroke="${K.ink}" stroke-width="4"/>${T(624, y + 18, h, 32, { fill: K.ink })}${T(704, y + 18, what, 30, { fill: '#1f3a8a', anchor: 'start', w: 800 })}</g>`;
  });
  const X = 250, Y = 1640, S = 1.5;
  const wr = ROWS.findIndex(r => t < r[3] + .35);
  const hy = wr < 0 ? -380 : -500 + wr * 14;
  s += person('du', X, Y, S, { t, seed: 1, load: 0, eyes: t > 85.4 ? 'happy' : 'n', brows: 'calm', mouth: 'smile', look: [16, -8], armR: [240, hy], hold: pen(244, hy, .45, 20), rim: '#fff2c0' });
  s = cam(s, 700, 820, 1.0 + .12 * eio(prog(t, 82.94, 86.244)), -40 * eio(prog(t, 82.94, 86.244)));
  s += chip(540, 220, 'WANN?', { p: pop(t, 83.9, .45), size: 84, bg: K.yellow });
  return frame(s, { vig: .4 });
}
