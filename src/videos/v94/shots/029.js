// L19b 82.90–86.24: close on the fridge: the week plan with times; the time column is highlighted on "wann" (83.9); final title "SCHREIB AUF, WANN." and du smiling at the edge.
import { K, frame, cam, person, label, T, check, pool, pop, prog, eio, f1 } from './lib.js';
import { kitchen } from './sets.js';
const ROWS = [['Mo', '8:00', 'Vermieter', true], ['Mo', '12:00', 'Zahnarzt', true], ['Mi', '18:00', 'Steuer', false], ['Do', '17:00', 'Oma anrufen', false], ['Sa', '10:00', 'Wäsche', false]];
export default function renderShot(t) {
  let s = cam(kitchen(t, { strong: true }), 900, 800, 1.6, -360, 100);
  // fridge door (sharp, fills the right part)
  s += `<rect x="120" y="420" width="1000" height="1600" rx="40" fill="#eef1f3" stroke="${K.ink}" stroke-width="6"/><rect x="150" y="560" width="22" height="300" rx="11" fill="#c4ccd3"/>`;
  s += pool(700, 700, 500, 500, '#fff3b0', .3);
  let inner = T(0, -300, 'WOCHENPLAN', 54, { fill: K.txt });
  const hl = eio(prog(t, 83.9, 84.3));
  inner += `<rect x="-300" y="-240" width="${f1(170 * hl)}" height="430" rx="10" fill="${K.yellow}" opacity=".75"/>`;
  ROWS.forEach(([d, h, w, done], i) => {
    const y = -180 + i * 86;
    inner += T(-290, y, d, 38, { anchor: 'start', fill: '#55606e', w: 800 }) + T(-220, y, h, 38, { anchor: 'start', fill: K.red, w: 900 }) + T(-90, y, w, 38, { anchor: 'start', fill: '#22324d', w: 700 });
    if (done) inner += check(250, y - 12, .7, K.green, 1);
  });
  s += `<g transform="translate(640 860) rotate(2)"><rect x="-340" y="-380" width="680" height="640" rx="10" fill="#fffbe8" stroke="${K.ink}" stroke-width="5"/>${inner}</g>`;
  s += `<circle cx="420" cy="500" r="26" fill="${K.red}" stroke="${K.ink}" stroke-width="4"/><circle cx="860" cy="500" r="26" fill="${K.green}" stroke="${K.ink}" stroke-width="4"/>`;
  s += person('du', 70, 2250, 1.5, { t, look: [16, -6], eyes: t > 84.4 ? 'happy' : 'n', brows: 'calm', mouth: 'smile' });
  s = cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 82.9, 86.244)));
  s += label('SCHREIB AUF,', 540, 230, 92, { fill: '#fff', p: pop(t, 82.94, .4) });
  s += label('WANN.', 540, 350, 120, { p: pop(t, 83.9, .4) });
  return frame(s);
}
