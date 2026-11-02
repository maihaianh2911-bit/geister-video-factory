// L12 42.38–46.16 night, bedroom: du lies awake in bed; the fall replays again and again in a thought bubble.
import { K, frame, person, thought, cam, prog, eio, eout, ein, pop, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = `<g filter="url(#blur8)"><rect x="-60" y="-60" width="1200" height="2040" fill="#2a3150"/><rect x="640" y="360" width="300" height="360" fill="#3d4a78" stroke="#56628f" stroke-width="16"/><circle cx="830" cy="470" r="44" fill="#f4eac2"/><rect x="-60" y="1250" width="1200" height="700" fill="#252a40"/></g>`;
  // bed
  s += `<rect x="120" y="1080" width="840" height="140" rx="20" fill="#7a5a44" stroke="${K.ink}" stroke-width="5"/><rect x="120" y="940" width="60" height="280" rx="14" fill="#6a4c38" stroke="${K.ink}" stroke-width="5"/><rect x="190" y="990" width="200" height="90" rx="40" fill="#e9ecf4" stroke="${K.ink}" stroke-width="5"/>`;
  // du lying: person rotated -90 around the feet, head on the pillow
  s += person('du', 760, 1040, .82, { t, seed: 1, hear: .6, tilt: -90, eyes: 'wide', mouth: 'flat', look: [0, -12], still: true });
  s += `<path d="M 380 1010 Q 560 960 900 990 L 940 1090 L 360 1090 Z" fill="#5f7fa8" stroke="${K.ink}" stroke-width="5"/>`;
  // replay bubble: a tiny du trips over and over (loop 1.2 s)
  const p = pop(t, 42.9, .45);
  if (p > 0) {
    s += thought(560, 600, ['                    ', ' ', ' ', ' '], 360, 940, { p, size: 44 });
    const u = ((t - 43.0) % 1.3 + 1.3) % 1.3, fall = ein(cl01((u - .45) / .35));
    const x = 420 + 160 * cl01(u / .6);
    s += `<g opacity="${f1(Math.min(1, p) * 100) / 100}"><path d="M 360 735 H 760" stroke="${K.ink}" stroke-width="4"/>${person('du', x, 735, .3, { t, seed: 1, tilt: 84 * fall, still: true, walk: fall < .02 ? t * 2 : undefined })}</g>`;
  }
  return frame(cam(s, 540, 1000, 1 + .05 * eio(prog(t, 42.38, 46.16))));
}
function cl01(x) { return Math.max(0, Math.min(1, x)); }
