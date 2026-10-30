// Close-up: a big bite out of the top scoop ("großes Stück ab").
import { P, prog, eio, eout, back, lerp, punch, bgPlain, head, cone } from './lib.js';
const T0 = 2.52;
export default function renderShot(t) {
  const inn = eio(prog(t, 2.6, 3.32));          // cone moves into the mouth
  const out = eio(prog(t, 3.6, 3.95));          // pulls away with the bite missing
  const cx = lerp(900, 640, inn) + 180 * out, cy = lerp(1450, 1010, inn) + 160 * out;
  const chomp = t >= 3.32 && t < 3.6;
  const mouth = t < 2.75 ? 'smile' : (t < 3.32 ? 'bite' : (t < 3.6 ? 'flat' : 'chew'));
  let crumbs = '';
  if (t > 3.32) for (let i = 0; i < 6; i++) {
    const p = prog(t, 3.32, 3.9); if (p >= 1) break;
    crumbs += `<circle cx="${650 + i * 22 + 120 * p * (i % 2 ? 1 : -.4)}" cy="${930 + 260 * p * p + i * 6}" r="${7 - i * .6}" fill="${P.straw}" stroke="${P.ink}" stroke-width="3" opacity="${1 - p}"/>`;
  }
  return punch(t, T0, `${bgPlain('#FFF3E8')}
    <g transform="translate(470 700) scale(2.35)">${head({ id: 's3', mouth, eyes: chomp ? 'closed' : 'open', look: 14, lookY: 10, cheek: t > 3.6 ? 1 : 0, blush: .7 })}</g>
    <g transform="translate(${cx} ${cy}) rotate(-38) scale(1.9)">${cone(1, { id: 's3c', bite: t > 3.32 ? 1 : 0 })}</g>${crumbs}`);
}
