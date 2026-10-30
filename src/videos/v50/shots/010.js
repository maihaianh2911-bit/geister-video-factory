// "zusammenziehen": vessels in the palate shrink and turn cold blue.
import { P, prog, eio, punch, vessels, frostCrystal } from './lib.js';
const T0 = 15.20;
export default function renderShot(t) {
  const c = eio(prog(t, 15.9, 16.5));
  let arrows = '';
  const a = prog(t, 15.85, 16.1) * (1 - prog(t, 16.9, 17.2));
  for (const s of [-1, 1]) for (const x of [-180, 120]) arrows += `<path d="M ${x} ${s * 150} v ${-s * 60} m -24 ${s * 26} l 24 ${-s * 26} l 24 ${s * 26}" stroke="${P.cold}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${a}"/>`;
  let fr = '';
  for (let i = 0; i < 6; i++) fr += frostCrystal(-330 + i * 130, [-280, 260, -240, 280, -300, 240][i], 30 * prog(t, 15.95 + i * .06, 16.4 + i * .06), i * 11, '#fff');
  return punch(t, T0, `<rect x="-60" y="-60" width="1200" height="2040" fill="#FDECEF"/>
    <rect x="70" y="250" width="940" height="1100" rx="60" fill="#F9C9D3" stroke="${P.ink}" stroke-width="8"/>
    <clipPath id="s10c"><rect x="70" y="250" width="940" height="1100" rx="60"/></clipPath>
    <g clip-path="url(#s10c)"><rect x="70" y="250" width="940" height="1100" fill="${P.ice}" opacity="${.45 * c}"/>
    <g transform="translate(540 800) scale(1.35)">${vessels(1 - .58 * c, c)}${arrows}${fr}</g></g>`);
}
