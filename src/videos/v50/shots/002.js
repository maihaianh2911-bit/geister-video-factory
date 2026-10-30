// "wenn du Eis zu schnell isst": cone whips up to the mouth on "schnell".
import { P, prog, eio, eout, back, lerp, punch, parlour, bust } from './lib.js';
const T0 = 1.32;
export default function renderShot(t) {
  const up = eio(prog(t, 1.5, 1.72));
  const hand = [lerp(250, 70, up), lerp(330, -40, up)];
  let speed = '';
  if (t > 1.48 && t < 1.85) for (let i = 0; i < 5; i++) {
    const a = 1 - prog(t, 1.48, 1.85);
    speed += `<path d="M ${880 + i * 14} ${1260 - i * 60} L ${960 + i * 20} ${1450 - i * 60}" stroke="${P.ink}" stroke-width="10" stroke-linecap="round" opacity="${a}"/>`;
  }
  const bite = t > 1.92;
  return punch(t, T0, `${parlour(t)}
    <g transform="translate(540 1040) scale(1.25)">${bust({ id: 's2', hand, handRotR: lerp(0, -10, up), head: { eyes: up > .5 ? 'wide' : 'happy', mouth: up > .3 ? 'bite' : 'smile', look: 6 }, coneO: { bite: bite ? eout(prog(t, 1.92, 2.05)) : 0, rot: lerp(0, -18, up) } })}</g>${speed}`);
}
