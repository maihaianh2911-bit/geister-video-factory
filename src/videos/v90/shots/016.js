// L15 52.08–56.84 next time: du trips a little ("Peinliches passiert"), laughs ("lach kurz darüber") and walks on ("geh weiter").
import { K, frame, bg, shadow, person, cam, prog, eio, eout, ein, f1, lerp } from './lib.js';
export default function renderShot(t) {
  let s = bg('street');
  s += `<path d="M 380 1318 h 70" stroke="#6b6b6b" stroke-width="12" stroke-linecap="round"/>`;
  const w1 = prog(t, 52.1, 53.4);
  const trip = Math.sin(Math.PI * prog(t, 53.4, 54.2));      // stumble forward and catch
  const laugh = t > 54.84 && t < 56.0;
  const w2 = prog(t, 56.0, 56.84);
  const x = lerp(160, 470, eio(w1)) + 30 * prog(t, 53.4, 54.2) + 520 * w2;
  s += shadow(x, 1330);
  const walking = (w1 > 0 && w1 < 1) || w2 > 0;
  s += person('du', x, 1330, 1, { t, seed: 1, tilt: 24 * trip, walk: walking ? t * 1.9 : undefined, armL: trip > .2 ? [-110, -330] : null, armR: trip > .2 ? [110, -330] : null,
    eyes: laugh ? 'happy' : (trip > .2 ? 'wide' : 'n'), mouth: laugh ? 'laugh' : (trip > .2 ? 'o' : 'smile'), headDy: laugh ? -Math.abs(Math.sin(t * 9)) * 8 : 0, look: [10, 0] });
  return frame(cam(s, 540, 1000, 1.02));
}
