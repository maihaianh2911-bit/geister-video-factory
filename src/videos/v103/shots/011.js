// L7 31.6–35.82: full-frame sepia memory: a boarding pass BERLIN → MADRID ("1 JAHR · SPANIEN") lies on a desk under a lamp; young du's
// hands (teal sleeves) hold it and tear it in two on "abgesagt" (32.84–33.4); the halves sink and drift apart on "unsicher" (34.56).
import { K, frame, cam, prog, eio, f1, op, pool, T } from './lib.js';
import { ticket } from './sets3.js';
const INK = K.ink;
function armTo(x0, y0, x1, y1) { const d = `M ${x0} ${y0} Q ${f1((x0 + x1) / 2)} ${f1(y0 - 60)} ${f1(x1)} ${f1(y1)}`; return `<path d="${d}" stroke="${INK}" stroke-width="96" fill="none" stroke-linecap="round"/><path d="${d}" stroke="${K.du}" stroke-width="80" fill="none" stroke-linecap="round"/><circle cx="${f1(x1)}" cy="${f1(y1)}" r="40" fill="${INK}"/>`; }
export default function renderShot(t) {
  let s = `<defs><linearGradient id="v103dk11" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#5a4130"/><stop offset="1" stop-color="#7a5a40"/></linearGradient></defs><rect x="-100" y="-100" width="1280" height="2120" fill="url(#v103dk11)"/>`;
  // desk objects (passport, pen, map corner, lamp light)
  s += `<g transform="rotate(-8 200 520)"><rect x="60" y="380" width="300" height="300" fill="#e6d8b8" stroke="${INK}" stroke-width="5"/><path d="M 90 430 C 160 470 210 420 300 470 M 100 560 C 180 520 240 600 330 560" stroke="#b08a5a" stroke-width="6" fill="none"/><circle cx="240" cy="520" r="14" fill="#d9493f"/></g>`;
  s += `<g transform="translate(830 520) rotate(12)"><rect x="-90" y="-120" width="180" height="240" rx="12" fill="#7a2f3e" stroke="${INK}" stroke-width="5"/>${T(0, -40, 'PASS', 30, { fill: '#e8c66a' })}<circle cx="0" cy="30" r="40" fill="none" stroke="#e8c66a" stroke-width="5"/></g>`;
  s += `<g transform="translate(860 1180) rotate(-30)"><rect x="-10" y="-130" width="20" height="160" rx="6" fill="#2f5fb5" stroke="${INK}" stroke-width="4"/></g>`;
  s += pool(540, 820, 620, 520, '#ffe0a0', .5);
  const tear = eio(prog(t, 32.84, 33.45));
  const fall = eio(prog(t, 33.5, 35.6));
  const sep = 70 * tear + 90 * fall;
  s += `<g transform="translate(0 ${f1(60 * fall)})">${ticket(540, 860, 1.6, tear + .6 * fall, { id: 'm11' })}</g>`;
  // hands at the ticket's left and right edges
  const lx = 150 - sep * 1.6, rx = 930 + sep * 1.6, hy = 900 + 60 * fall + 30 * tear;
  s += armTo(-120, 1700, lx, hy) + armTo(1200, 1700, rx, hy);
  // sepia tint + memory border
  s += `<rect x="-100" y="-100" width="1280" height="2120" fill="#b07a3c" opacity=".22"/>`;
  s += `<rect x="30" y="140" width="1020" height="1260" rx="50" fill="none" stroke="#f6ead2" stroke-width="16" opacity=".85"/>`;
  return frame(cam(s, 540, 860, 1.02 + .06 * eio(prog(t, 31.6, 35.82))), { base: '#3a2a20' });
}
