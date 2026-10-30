// "nach ein paar Sekunden bis wenigen Minuten": stopwatch runs, SEKUNDEN – MINUTEN appears word by word.
import { P, prog, back, punch, bgPlain, label } from './lib.js';
const T0 = 47.00;
export default function renderShot(t) {
  const sec = (t - T0) * 5, min = (t - T0) * .6;
  const hand = (a, L, w, c) => `<path d="M 0 0 L ${Math.sin(a) * L} ${-Math.cos(a) * L}" stroke="${c}" stroke-width="${w}" stroke-linecap="round"/>`;
  let ticks = '';
  for (let i = 0; i < 60; i++) { const a = i / 60 * Math.PI * 2, r1 = i % 5 ? 250 : 225; ticks += `<path d="M ${Math.sin(a) * r1} ${-Math.cos(a) * r1} L ${Math.sin(a) * 270} ${-Math.cos(a) * 270}" stroke="${P.ink}" stroke-width="${i % 5 ? 4 : 9}"/>`; }
  const sweep = (sec % (Math.PI * 2));
  const arc = `<path d="M 0 -270 A 270 270 0 ${sweep > Math.PI ? 1 : 0} 1 ${Math.sin(sweep) * 270} ${-Math.cos(sweep) * 270} L 0 0 Z" fill="${P.teal}" opacity=".25"/>`;
  const txt = t < 47.52 ? '' : (t < 48.68 ? label(540, 1180, 'SEKUNDEN', 90, { s: back(prog(t, 47.52, 47.7)) }) : label(540, 1180, 'SEKUNDEN – MINUTEN', 66, { s: back(prog(t, 48.68, 48.85)) }));
  return punch(t, T0, `${bgPlain()}
    <g transform="translate(540 680)">
      <rect x="-40" y="-370" width="80" height="70" rx="12" fill="${P.tealD}" stroke="${P.ink}" stroke-width="7"/>
      <circle cx="0" cy="0" r="300" fill="#fff" stroke="${P.ink}" stroke-width="14"/><circle cx="0" cy="0" r="300" fill="none" stroke="${P.teal}" stroke-width="6" transform="scale(.94)"/>
      ${arc}${ticks}${hand(min, 150, 18, P.ink)}${hand(sec, 240, 9, P.red)}<circle cx="0" cy="0" r="18" fill="${P.ink}"/>
    </g>${txt}`);
}
