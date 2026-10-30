// "viele sagen einfach Hirnfrost": the word HIRNFROST slams in and frosts over.
import { P, prog, back, eout, punch, shake, bgPlain, head, label, frostCrystal } from './lib.js';
const T0 = 42.70;
export default function renderShot(t) {
  const sl = back(prog(t, 43.78, 43.98));
  const [sx, sy] = shake(t, 43.78, 16, 6);
  let fr = '';
  for (let i = 0; i < 9; i++) fr += frostCrystal(120 + hash9(i) * 840, 380 + hash9(i + 20) * 900, 40 * eout(prog(t, 43.8 + i * .04, 44.2 + i * .04)) * (.6 + hash9(i + 5) * .7), i * 21, i % 2 ? '#fff' : P.cold);
  return punch(t, T0, `${bgPlain('#D6ECFA')}
    <g transform="translate(${540 + sx} ${1020 + sy}) scale(1.7)">${head({ id: 's24', mouth: 'ouch', eyes: 'squeeze', brow: -1 })}</g>
    <rect x="0" y="0" width="1080" height="1920" fill="${P.ice}" opacity="${.35 * prog(t, 43.78, 44.1)}"/>${fr}
    ${t >= 43.78 ? label(540 + sx, 520 + sy, 'HIRNFROST', 140, { s: sl, rot: -4, col: P.cold }) : ''}`);
}
function hash9(n) { const s = Math.sin(n * 91.7) * 43758.5453; return s - Math.floor(s); }
