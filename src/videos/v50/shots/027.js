// "Gefährlich ist er nicht.": warning sign flips to a check on "nicht".
import { P, prog, back, eio, punch, bgPlain } from './lib.js';
const T0 = 49.56;
export default function renderShot(t) {
  const flip = prog(t, 50.3, 50.5);
  const sx = Math.abs(Math.cos(flip * Math.PI));
  const ok = flip >= .5;
  const pop = back(prog(t, T0, T0 + .25));
  const tri = `<path d="M 0 -250 L 260 200 L -260 200 Z" fill="#FFD36E" stroke="${P.ink}" stroke-width="14" stroke-linejoin="round"/><rect x="-22" y="-110" width="44" height="190" rx="22" fill="${P.ink}"/><circle cx="0" cy="135" r="26" fill="${P.ink}"/>`;
  const chk = `<circle cx="0" cy="0" r="250" fill="${P.teal}" stroke="${P.ink}" stroke-width="14"/><path d="M -120 0 L -30 90 L 130 -90" stroke="#fff" stroke-width="44" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  return punch(t, T0, `${bgPlain(ok ? '#E3F7F3' : '#FFF6E0')}
    <g transform="translate(540 760) scale(${pop * sx * (ok ? 1 + .1 * (1 - prog(t, 50.5, 50.8)) : 1)} ${pop})">${ok ? chk : tri}</g>`);
}
