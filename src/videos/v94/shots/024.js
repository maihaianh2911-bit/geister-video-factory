// L16 66.02–71.48: top-down close-up of the note: the pen writes "Montag, 8:00 – / E-Mail an den Vermieter" then "Mittags – / Zahnarzt anrufen" in sync with the voice.
import { K, frame, cam, paper, pen, hand, textW, mug, pool, prog, eio } from './lib.js';
const ROWS = [['Montag, 8:00 –', 66.02, 67.1], ['E-Mail an den Vermieter', 67.6, 68.95], ['Mittags –', 69.1, 69.75], ['Zahnarzt anrufen', 69.85, 70.8]];
export default function renderShot(t) {
  let s = `<rect width="1080" height="1920" fill="#c99a62"/><g opacity=".18" stroke="#8a5a36" stroke-width="6">${Array.from({ length: 12 }, (_, i) => `<path d="M -40 ${120 + i * 160} C 300 ${100 + i * 160} 700 ${150 + i * 160} 1120 ${110 + i * 160}"/>`).join('')}</g>`;
  s += pool(700, 500, 500, 400, '#fff3b0', .4);
  s += mug(900, 300, 1.4, '#f2efe8', t);
  const x0 = 160, ys = [620, 720, 880, 980], size = 54;
  let inner = '';
  let px = x0, py = ys[0];
  ROWS.forEach(([txt, a, b], i) => {
    const p = prog(t, a, b);
    inner += hand(txt, x0, ys[i], size, p, '#22324d', `hw${i}`);
    if (t >= a) { px = x0 + textW(txt, size) * 1.05 * p; py = ys[i]; }
  });
  s += `<g transform="rotate(-2 540 800)">` + paper(540, 800, 860, 620, 0, '') + inner + `</g>`;
  const jig = Math.sin(t * 16) * 5;
  s += `<path d="M ${px + 70} ${py + 60} Q ${px + 300} ${py + 300} 1150 ${py + 640}" stroke="${K.ink}" stroke-width="150" fill="none" stroke-linecap="round"/><path d="M ${px + 70} ${py + 60} Q ${px + 300} ${py + 300} 1150 ${py + 640}" stroke="${K.du}" stroke-width="130" fill="none" stroke-linecap="round"/>`;
  s += pen(px + 4, py + 4 + jig, 1.3, 35) + `<circle cx="${px + 60}" cy="${py - 20 + jig}" r="52" fill="${K.ink}"/>`;
  return frame(cam(s, 540, 800, 1.02 + .06 * eio(prog(t, 66.02, 71.48)), 0, 40));
}
