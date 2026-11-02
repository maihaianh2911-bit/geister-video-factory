// L6 20.36–23.44 Lena grins "Neue Frisur? Mutig." (speech) — everyone laughs, du shrinks a little.
import { K, frame, speech, star, cam, prog, eio, eout, pop, fade, f1 } from './lib.js';
import { cafeScene, P } from './cafe.js';
export default function renderShot(t) {
  const laugh = t > 22.9, lb = laugh ? Math.abs(Math.sin((t - 22.9) * 9)) * 10 : 0;
  const shrink = eio(prog(t, 22.9, 23.3));
  const pose = {
    du: { hear: .6, quiff: true, mouth: laugh ? 'sad' : 'smile', eyes: laugh ? 'sad' : 'n', look: [-10, -4], headDy: 10 * shrink },
    lena: { mouth: t > 20.64 ? 'smirk' : 'smile', eyes: t > 20.64 ? 'sly' : 'n', look: [10, -2], armR: t > 21.4 && t < 22.7 ? [120, -330] : null },
    gl: { mouth: laugh ? 'laugh' : 'smile', eyes: laugh ? 'happy' : 'n', look: [10, 0], headDy: -lb },
    cap: { mouth: laugh ? 'laugh' : 'smile', eyes: laugh ? 'happy' : 'n', look: [-10, 0], headDy: -lb },
  };
  let s = cafeScene(t, { pose, scale: { du: .82 - .07 * shrink } });
  // sparkle points at du's new hair on "Frisur"
  const sp = pop(t, 21.56, .35) * (1 - fade(t, 22.6, .3));
  if (sp > 0) s += star(P.du + 70, 790, 26 * sp, K.yellow, t) + star(P.du - 70, 800, 18 * sp, K.yellow, -t);
  s += speech(400, 600, 'Neue Frisur? Mutig.', P.lena + 10, 840, { p: pop(t, 21.36, .4) });
  return frame(cam(s, 540, 1000, 1.03));
}
