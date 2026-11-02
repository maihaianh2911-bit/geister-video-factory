// v101 icons for the brain shots (bad: late bus, rain cloud, red X; good: sun, coffee, heart) and their dark background
import { K, f1, op } from './lib.js';
const INK = K.ink;
export function icons(x, y, s, kind, a = 1) {
  const g = {
    bus: `<rect x="-60" y="-40" width="120" height="70" rx="12" fill="#f2c14e" stroke="${INK}" stroke-width="5"/><rect x="-46" y="-30" width="30" height="26" fill="#bcd8ee"/><rect x="-6" y="-30" width="30" height="26" fill="#bcd8ee"/><circle cx="-34" cy="32" r="12" fill="${INK}"/><circle cx="34" cy="32" r="12" fill="${INK}"/>`,
    cloud: `<g fill="#6b7280" stroke="${INK}" stroke-width="5"><circle cx="-26" cy="0" r="30"/><circle cx="16" cy="-14" r="36"/><circle cx="44" cy="8" r="24"/></g><path d="M -20 40 l -8 20 M 10 40 l -8 20 M 40 40 l -8 20" stroke="#7fb0e8" stroke-width="6" stroke-linecap="round"/>`,
    x: `<path d="M -36 -36 L 36 36 M 36 -36 L -36 36" stroke="#d9493f" stroke-width="18" stroke-linecap="round"/>`,
    sun: `<circle r="34" fill="#ffd23f" stroke="${INK}" stroke-width="5"/>${Array.from({ length: 8 }, (_, i) => `<rect x="-4" y="-58" width="8" height="16" rx="4" fill="#ffd23f" transform="rotate(${i * 45})"/>`).join('')}`,
    cup: `<path d="M -32 -30 H 32 L 26 30 H -26 Z" fill="#f4f1ea" stroke="${INK}" stroke-width="5"/><path d="M 30 -16 C 56 -16 56 16 28 16" fill="none" stroke="${INK}" stroke-width="5"/><path d="M -8 -40 c -8 -12 8 -18 0 -30" stroke="#9a8a7a" stroke-width="5" fill="none"/>`,
    heart: `<path d="M 0 30 C -60 -10 -50 -60 -18 -60 C -4 -60 0 -48 0 -40 C 0 -48 4 -60 18 -60 C 50 -60 60 -10 0 30 Z" fill="#e8546a" stroke="${INK}" stroke-width="5"/>`,
  }[kind];
  return `<g transform="translate(${f1(x)} ${f1(y)}) scale(${f1(s * 100) / 100})" opacity="${op(a)}">${g}</g>`;
}
export const BAD = [['bus', 260, 1080], ['cloud', 540, 1160], ['x', 820, 1080]];
export const GOOD = [['sun', 220, 1300], ['cup', 540, 1340], ['heart', 860, 1300]];
export function bg(t) {
  return `<defs><radialGradient id="v101bb" cx="50%" cy="40%" r="70%"><stop offset="0" stop-color="#3a3550"/><stop offset="1" stop-color="#15131f"/></radialGradient></defs><rect x="-200" y="-200" width="1480" height="2320" fill="url(#v101bb)"/><g fill="#fff" opacity=".08">${Array.from({ length: 24 }, (_, i) => `<circle cx="${(i * 173) % 1080}" cy="${(i * 311) % 1920}" r="${3 + (i % 4)}"/>`).join('')}</g>`;
}
