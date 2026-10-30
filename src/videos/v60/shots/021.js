// The control room: a dispatcher's monitor in the dark, the forest map — the friends' pin drops in on "Standort".
import { K, DEFS60, forestMap, pin, rings, FG, prog, eout, back, lerp } from './lib.js';

export function monitor(inner, glow = 1) {
  return `<ellipse cx="540" cy="760" rx="620" ry="560" fill="url(#fBlue)" opacity="${.35 * glow}"/>
    <rect x="70" y="330" width="940" height="760" rx="26" fill="#1A2126" stroke="#0B0F12" stroke-width="10"/>
    <clipPath id="mon"><rect x="100" y="360" width="880" height="700" rx="10"/></clipPath>
    <g clip-path="url(#mon)">${inner}</g>
    <rect x="490" y="1090" width="100" height="90" fill="#141A1F" stroke="#0B0F12" stroke-width="8"/><rect x="380" y="1170" width="320" height="34" rx="12" fill="#1A2126" stroke="#0B0F12" stroke-width="8"/>
    <rect x="0" y="1200" width="1080" height="300" fill="#141C22"/>
    <path d="M 150 1300 q 0 -80 70 -80 q 70 0 70 80" stroke="#2E3A42" stroke-width="18" fill="none"/><rect x="128" y="1290" width="40" height="60" rx="12" fill="#2E3A42"/><rect x="272" y="1290" width="40" height="60" rx="12" fill="#2E3A42"/>
    <rect x="620" y="1260" width="300" height="70" rx="10" fill="#1E262C" stroke="#0B0F12" stroke-width="6"/>`;
}
export default function renderShot(t) {
  const drop = eout(prog(t, 30.4, 30.7)), lands = t >= 30.7;
  const map = `<g transform="translate(100 360)">${forestMap(880, 700, 9)}</g>
    <circle cx="560" cy="700" r="${lerp(240, 200, prog(t, 30.7, 31.9))}" fill="#5AA0FF" fill-opacity=".12" stroke="#5AA0FF" stroke-width="5" stroke-dasharray="14 12" opacity="${lands ? 1 : 0}"/>
    ${pin(560, lerp(380, 700, drop), 1.3, K.red)}
    ${lands ? rings(t, 30.7, 560, 700, K.red, 2, 160, 8) : ''}`;
  return DEFS60 + `<rect x="0" y="0" width="1080" height="1920" fill="#0A0F14"/>${monitor(map)}${FG(1440)}`;
}
