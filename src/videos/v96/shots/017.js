// L10 46.06–49.8: close-up of du's head: a white brain outline appears ("Kopfes" 46.8); one part glows blue and blinks; on "vibriert" (48.64) a vibrating phone icon shakes inside it.
import { K, frame, cam, prog, eio, fade, f1, op } from './lib.js';
import { office2 } from './sets.js';
import { duHG, gphone, screenGlow } from './base.js';
export default function renderShot(t) {
  let s = office2(t, { strong: true });
  s = `<rect width="1080" height="1920" fill="#2a3346"/>` + `<g opacity=".45">${s}</g>`;
  s += duHG(540, 2240, 1.75, { t, seed: 1, look: [-6, 6], brows: 'worried', mouth: 'flat' }, { s: .5, dx: 180, dy: -70 });
  // brain outline on the upper head (head centre ≈ (540, 992), r ≈ 289)
  const a = fade(t, 46.7, .5), cx = 540, cy = 860;
  let br = `<g fill="none" stroke="#fff" stroke-width="8" stroke-linecap="round" opacity="${op(a * .9)}">`;
  br += `<path d="M ${cx - 170} ${cy + 40} C ${cx - 200} ${cy - 40} ${cx - 150} ${cy - 120} ${cx - 70} ${cy - 120} C ${cx - 40} ${cy - 160} ${cx + 40} ${cy - 160} ${cx + 70} ${cy - 120} C ${cx + 150} ${cy - 120} ${cx + 200} ${cy - 40} ${cx + 170} ${cy + 40} C ${cx + 150} ${cy + 80} ${cx - 150} ${cy + 80} ${cx - 170} ${cy + 40} Z"/>`;
  br += `<path d="M ${cx} ${cy - 150} C ${cx - 20} ${cy - 80} ${cx + 20} ${cy - 20} ${cx} ${cy + 66}"/><path d="M ${cx - 120} ${cy - 60} q 40 10 50 50 M ${cx - 90} ${cy + 20} q 30 -30 60 -10 M ${cx + 60} ${cy - 90} q 30 30 70 20 M ${cx + 40} ${cy + 10} q 40 -20 90 10"/></g>`;
  s += br;
  // glowing part (right lobe)
  const blink = t >= 47.2 ? .55 + .45 * Math.sin(t * 9) : 0;
  if (blink > 0) s += screenGlow(cx + 95, cy - 40, 110, .8 * blink * a);
  if (t >= 48.5) { const sh = Math.sin(t * 60) * 8; s += gphone(cx + 95 + sh, cy - 40, .48, 10 + sh, { lit: 1, id: 'p17' }) + `<g stroke="#7fd4ff" stroke-width="7" fill="none" stroke-linecap="round"><path d="M ${cx + 30} ${cy - 80} q -16 40 0 80"/><path d="M ${cx + 160} ${cy - 80} q 16 40 0 80"/></g>`; }
  return frame(cam(s, 540, 900, 1.0 + .06 * eio(prog(t, 46.06, 49.8))));
}
