// "Auch ein Schluck lauwarmes Wasser": a sip of lukewarm water, gentle warmth rises.
import { P, prog, eio, lerp, punch, bgPlain, bust, glass } from './lib.js';
const T0 = 56.40;
export default function renderShot(t) {
  const S = 1.35, ox = 540, oy = 1080;
  const lift = eio(prog(t, 56.45, 56.8));
  const lvl = lerp(.85, .55, eio(prog(t, 57.4, 58.3)));
  const H = [lerp(220, 70, lift), lerp(380, 20, lift)];
  const g = `<g transform="translate(0 -150) scale(.5)">${glass({ id: 's31g', warm: 1, level: lvl })}</g>`;
  let waves = '';
  for (let k = 0; k < 3; k++) { const p = ((t - 57.0 - k * .3) % 1.1) / 1.1; if (t > 57.0 + k * .3) waves += `<path d="M ${ox + (-140 + k * 140)} ${oy - 520 - 80 * p} q 18 -20 0 -40 q -18 -20 0 -40" stroke="#FF8A3D" stroke-width="9" fill="none" stroke-linecap="round" opacity="${.8 * (1 - p)}"/>`; }
  return punch(t, T0, `${bgPlain('#FFF1E0')}
    <g transform="translate(${ox} ${oy}) scale(${S})">${bust({ id: 's31', hand: H, holdR: g, head: { mouth: lift > .8 ? 'sip' : 'smile', eyes: lift > .8 ? 'closed' : 'open', blush: .7 } })}</g>${waves}`);
}
