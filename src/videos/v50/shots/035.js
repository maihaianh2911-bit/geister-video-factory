// "Beim nächsten Mal": back at the parlour with a fresh cone, a small spoon appears.
import { P, prog, back, lerp, eio, punch, parlour, bust } from './lib.js';
const T0 = 64.78;
export const spoon = `<g transform="rotate(-35)"><rect x="-8" y="-150" width="16" height="140" rx="8" fill="${P.teal}" stroke="${P.ink}" stroke-width="5"/><ellipse cx="0" cy="-170" rx="24" ry="32" fill="${P.teal}" stroke="${P.ink}" stroke-width="5"/></g>`;
export default function renderShot(t) {
  const sp = eio(prog(t, 65.3, 65.7));
  return punch(t, T0, `${parlour(t)}
    <g transform="translate(540 1080) scale(1.3)">${bust({ id: 's35', hand: [210, 200], handL: sp > 0 ? [lerp(-210, -230, sp), lerp(450, 150, sp)] : null, holdL: spoon, head: { eyes: 'open', mouth: 'smile', look: 10, lookY: 8 }, coneO: { bite: 0 } })}</g>`);
}
