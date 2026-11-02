// L15 63.54–66.02: SAMSTAGMORGEN, sunny kitchen: du sits at the table (bag still full) and starts writing on a note on "schreibst" (64.06).
import { K, frame, person, cam, shadow, paper, pen, mug, dayCard, prog, eio } from './lib.js';
import { kitchen } from './sets.js';
import { packOf } from './base.js';
export default function renderShot(t) {
  let s = kitchen(t);
  const wr = t > 64.06 ? Math.sin(t * 11) * 16 : 0;
  s += person('du', 600, 1560, 1.02, { t, pack: packOf(5), hunch: .35, look: [-6, 16], brows: 'calm', mouth: 'flat', armR: [60 + wr, -150], elbowR: [230, -280], armL: [-120, -150], elbowL: [-220, -280] });
  s += `<rect x="-60" y="1400" width="1200" height="600" fill="#c99a62" stroke="${K.ink}" stroke-width="5"/><rect x="-60" y="1400" width="1200" height="28" fill="#ddb57e"/>`;
  s += paper(600, 1410, 280, 70, 0, '', { lines: false });
  s += pen(660 + wr, 1400, .8, 30);
  // teapot (sharp foreground)
  s += `<g transform="translate(200 1440)"><path d="M -110 0 C -130 -120 130 -120 110 0 Z" fill="#5f8fb5" stroke="${K.ink}" stroke-width="6"/><path d="M 100 -50 C 150 -60 160 -110 190 -120" stroke="${K.ink}" stroke-width="22" fill="none" stroke-linecap="round"/><path d="M 100 -50 C 150 -60 160 -110 190 -120" stroke="#5f8fb5" stroke-width="12" fill="none" stroke-linecap="round"/><ellipse cx="0" cy="-92" rx="40" ry="14" fill="#4a7aa0" stroke="${K.ink}" stroke-width="5"/><circle cx="0" cy="-110" r="12" fill="${K.ink}"/></g>`;
  s += mug(900, 1430, 1, '#f2efe8', t);
  s = cam(s, 540, 1150, 1.0 + .08 * eio(prog(t, 63.54, 66.02)));
  s += dayCard(t, 63.54, 'SAMSTAGMORGEN', { size: 88 });
  return frame(s);
}
