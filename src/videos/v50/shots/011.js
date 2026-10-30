// "dann wieder weiten": vessels widen again, red and pulsing.
import { P, prog, eio, back, punch, vessels } from './lib.js';
const T0 = 17.20;
export default function renderShot(t) {
  const w = back(prog(t, 17.4, 17.85), 1.2);
  const pulse = Math.max(0, Math.sin((t - 17.4) * 9)) * prog(t, 17.6, 17.9);
  let arrows = '';
  const a = prog(t, 17.45, 17.65);
  for (const s of [-1, 1]) for (const x of [-120, 140]) arrows += `<path d="M ${x} ${s * 70} v ${s * 70} m -26 ${-s * 28} l 26 ${s * 28} l 26 ${-s * 28}" stroke="${P.red}" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${a}"/>`;
  return punch(t, T0, `<rect x="-60" y="-60" width="1200" height="2040" fill="#FDECEF"/>
    <circle cx="540" cy="780" r="520" fill="#F9C9D3" stroke="${P.ink}" stroke-width="8"/>
    <clipPath id="s11c"><circle cx="540" cy="780" r="520"/></clipPath>
    <g clip-path="url(#s11c)"><circle cx="540" cy="780" r="520" fill="${P.red}" opacity="${.12 * pulse}"/>
    <g transform="translate(560 800) scale(1.9) translate(0 -5)">${vessels(.42 + .93 * w, 1 - eio(prog(t, 17.4, 17.8)), pulse)}${arrows}</g></g>`);
}
