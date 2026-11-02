// L7 23.44–25.86 camera pushes in on Lena; du hears her thought "Endlich schaut mal keiner auf sie."
import { K, frame, speech, thought, cam, hearLvl, prog, eio, eout, pop, fade } from './lib.js';
import { cafeScene, P } from './cafe.js';
export default function renderShot(t) {
  const lb = Math.abs(Math.sin((t - 22.9) * 9)) * 10 * (1 - fade(t, 24.2, .6));
  const pose = {
    du: { hear: hearLvl(t, [24.04]), quiff: true, mouth: t > 24.3 ? 'o' : 'sad', eyes: t > 24.3 ? 'wide' : 'sad', look: [-12, -6], headDy: 10 },
    lena: { mouth: 'smirk', eyes: 'sly', look: [14, 2] },
    gl: { mouth: lb > 2 ? 'laugh' : 'smile', eyes: 'happy', look: [10, 0], headDy: -lb },
    cap: { mouth: lb > 2 ? 'laugh' : 'smile', eyes: 'happy', look: [-10, 0], headDy: -lb },
  };
  let s = cafeScene(t, { pose, scale: { du: .75 } });
  const z = 1.03 + .3 * eio(prog(t, 23.44, 24.1));
  s = cam(s, 500, 980, z);
  s += thought(540, 500, ['Endlich schaut mal', 'keiner auf sie.'], 380, 820, { p: pop(t, 24.04, .45) });
  return frame(s);
}
