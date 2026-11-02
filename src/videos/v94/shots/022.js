// L16 66.02–71.48: top-down close on the sheet — du's pen writes „Montag, 8:00 – E-Mail an den Vermieter“ and
// „Mittags – Zahnarzt anrufen“ in sync with the voice.
import { K, frame, cam, note, pen, teapot, leaf, mug, textW, prog, eio, eout, lerp, cl, f1 } from './lib.js';
const L = ['Montag, 8:00 –', 'E-Mail an den Vermieter', 'Mittags –', 'Zahnarzt anrufen'];
const TT = [[66.02, 67.1], [67.72, 68.9], [69.2, 69.8], [69.9, 70.9]];
export default function renderShot(t) {
  let s = `<rect x="-60" y="-60" width="1200" height="2040" fill="#c99a68"/>` + [0, 1, 2, 3, 4, 5].map(i => `<rect x="-60" y="${i * 340}" width="1200" height="8" fill="#b0845a"/><path d="M ${100 + i * 160} ${i * 340 + 60} q 80 30 160 0" stroke="#b88c60" stroke-width="5" fill="none"/>`).join('');
  s += `<ellipse cx="540" cy="700" rx="600" ry="500" fill="#fff6d0" opacity=".25"/>`;
  const pr = TT.map(([a, b]) => prog(t, a, b));
  const NX = 540, NY = 760, NS = 1.6, rot = -3;
  s += `<rect x="${NX - 280 * NS + 18}" y="${NY - 200 * NS + 18}" width="${560 * NS}" height="${400 * NS}" fill="#000" opacity=".18" transform="rotate(${rot} ${NX} ${NY})"/>`;
  s += note(NX, NY, NS, rot, L, pr, { id: 'w' });
  // current pen position
  let i = pr.findIndex(p => p < 1); if (i < 0) i = 3;
  const lx = -186 + textW(L[i], 34) * 1.18 * cl(pr[i]) + 10, ly = -126 + i * 70 + 66 - 10;
  const a = rot * Math.PI / 180, wig = Math.sin(t * 24) * 6 * (pr[i] > 0 && pr[i] < 1 ? 1 : 0);
  const px = NX + (lx * Math.cos(a) - ly * Math.sin(a)) * NS, py = NY + (lx * Math.sin(a) + ly * Math.cos(a)) * NS + wig;
  s += `<path d="M 1200 1500 C 1000 1400 ${f1(px + 200)} ${f1(py + 300)} ${f1(px + 60)} ${f1(py + 110)}" stroke="${K.ink}" stroke-width="110" fill="none" stroke-linecap="round"/><path d="M 1200 1500 C 1000 1400 ${f1(px + 200)} ${f1(py + 300)} ${f1(px + 60)} ${f1(py + 110)}" stroke="${K.du}" stroke-width="90" fill="none" stroke-linecap="round"/>`;
  s += pen(px, py, 1.3, 28) + `<circle cx="${f1(px + 50)}" cy="${f1(py + 100)}" r="46" fill="${K.ink}"/>`;
  s += `<g transform="translate(150 1360)">${teapot(0, 0, 1.1, t)}</g>` + mug(900, 1300, 1.1, '#e8b85c', { t }) + leaf(1080, 120, 1.4, 150) + leaf(-40, 200, 1.2, 20);
  s = cam(s, NX, NY, 1.0 + .06 * eio(prog(t, 66.02, 71.48)), lerp(30, -30, eio(prog(t, 66.02, 71.48))), 0);
  return frame(s, { vig: .45 });
}
