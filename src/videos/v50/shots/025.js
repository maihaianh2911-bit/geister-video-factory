// "Der Schmerz verschwindet meist von selbst": the pain fades, the face relaxes.
import { P, prog, eio, punch, parlour, bust, painBurst } from './lib.js';
const T0 = 44.86;
export default function renderShot(t) {
  const S = 1.35, oy = 1080;
  const fade = 1 - eio(prog(t, 45.46, 46.1));
  const relax = t > 46.0;
  const fy = oy - (230 + 78) * S;
  return punch(t, T0, `${parlour(t)}
    <g transform="translate(540 ${oy}) scale(${S})">${bust({ id: 's25', hand: [210, 300], head: { eyes: fade > .5 ? 'squeeze' : (t > 46.42 ? 'happy' : 'open'), mouth: fade > .5 ? 'ouch' : (t > 46.42 ? 'smile' : 'flat'), brow: fade > .5 ? -1 : 0 }, coneO: { bite: 1 } })}</g>
    ${painBurst(540, fy, 56 * fade, fade)}`);
}
