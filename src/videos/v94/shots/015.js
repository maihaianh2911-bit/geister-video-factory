// L10 44.5–48.22: FREITAGNACHT — top-down view of du lying awake in bed in a dark blue bedroom (alarm clock 02:47);
// the stone-filled backpack lies on his chest and presses down on "drückt" (46.86).
import { K, frame, cam, person, stone, dayCard, light, T, prog, eio, eout, lerp, cl, pop, f1, op } from './lib.js';
export function bedScene(t, o = {}) {
  let s = `<rect x="-60" y="-60" width="1200" height="2040" fill="#1a2238"/>` + [0, 1, 2, 3, 4, 5, 6].map(i => `<rect x="-60" y="${-60 + i * 300}" width="1200" height="6" fill="#141a2e"/>`).join('');
  s += `<ellipse cx="540" cy="1000" rx="600" ry="760" fill="#28305a" opacity=".6"/>`;
  // nightstand + alarm clock + glass, slippers, book (sharp)
  s += `<rect x="10" y="330" width="170" height="210" rx="12" fill="#3a2f44" stroke="${K.ink}" stroke-width="5"/><rect x="30" y="380" width="130" height="70" rx="10" fill="#111" stroke="${K.ink}" stroke-width="4"/>` + T(95, 430, '02:47', 36, { fill: '#ff4a4a' }) + `<circle cx="120" cy="500" r="22" fill="#9fc4ff" opacity=".5" stroke="${K.ink}" stroke-width="4"/>`;
  s += `<g transform="translate(120 1600) rotate(-20)"><ellipse cx="0" cy="0" rx="40" ry="80" fill="#8a5cb8" stroke="${K.ink}" stroke-width="4"/><ellipse cx="90" cy="20" rx="40" ry="80" fill="#8a5cb8" stroke="${K.ink}" stroke-width="4"/></g><g transform="translate(980 1500) rotate(15)"><rect x="-70" y="-50" width="140" height="100" fill="#c25b4e" stroke="${K.ink}" stroke-width="4"/><line x1="0" y1="-50" x2="0" y2="50" stroke="${K.ink}" stroke-width="4"/></g>`;
  // bed
  s += `<rect x="190" y="300" width="700" height="1460" rx="30" fill="#5a4636" stroke="${K.ink}" stroke-width="6"/><rect x="210" y="330" width="660" height="1400" rx="24" fill="#e8e4f0" stroke="${K.ink}" stroke-width="4"/>`;
  s += `<rect x="280" y="380" width="520" height="280" rx="70" fill="#f6f4fb" stroke="${K.ink}" stroke-width="5"/>`;
  // head on the pillow (frontal from above)
  const press = o.press || 0;
  const hx = 540, hy = 560;
  s += `<g transform="translate(${hx} ${hy}) scale(1.45)"><circle cx="0" cy="0" r="100" fill="${K.ink}"/><ellipse cx="-38" cy="-50" rx="32" ry="16" fill="#fff" opacity=".15"/>` + faceTop(t, o) + `</g>`;
  // blanket
  s += `<path d="M 210 760 C 400 720 680 720 870 760 L 870 1730 L 210 1730 Z" fill="#3f6f8f" stroke="${K.ink}" stroke-width="5"/><path d="M 210 760 C 400 720 680 720 870 760 L 870 820 C 680 790 400 790 210 820 Z" fill="#e8e4f0" stroke="${K.ink}" stroke-width="5"/>` + [0, 1, 2, 3].map(i => `<path d="M 240 ${980 + i * 180} C 420 ${960 + i * 180} 660 ${1000 + i * 180} 840 ${975 + i * 180}" stroke="#355f7b" stroke-width="8" fill="none"/>`).join('');
  // arms on the blanket
  s += `<path d="M 330 820 C 280 960 300 1080 330 1160" stroke="${K.ink}" stroke-width="56" fill="none" stroke-linecap="round"/><path d="M 330 820 C 280 960 300 1080 330 1160" stroke="${K.du}" stroke-width="44" fill="none" stroke-linecap="round"/><circle cx="332" cy="1170" r="22" fill="${K.ink}"/>`;
  s += `<path d="M 750 820 C 800 960 780 1080 750 1160" stroke="${K.ink}" stroke-width="56" fill="none" stroke-linecap="round"/><path d="M 750 820 C 800 960 780 1080 750 1160" stroke="${K.du}" stroke-width="44" fill="none" stroke-linecap="round"/><circle cx="748" cy="1170" r="22" fill="${K.ink}"/>`;
  // backpack on the chest (top-down), stones bulging
  if (o.pack !== false) {
    const py = 980 + press * 24, sq = 1 + press * .05;
    s += `<ellipse cx="540" cy="${f1(py + 190)}" rx="${f1(220 * sq)}" ry="40" fill="#000" opacity=".25"/>`;
    s += `<g transform="translate(540 ${f1(py)}) scale(${f1(sq * 1000) / 1000} ${f1((2 - sq) * 1000) / 1000})"><rect x="-210" y="-180" width="420" height="360" rx="70" fill="${K.pack}" stroke="${K.ink}" stroke-width="6"/>`;
    [['VERMIETER', -70, -90, -8], ['ZAHNARZT', 80, -70, 10], ['STEUER', -90, 40, 6], ['OMA', 90, 60, -6], ['WÄSCHE', 0, -10, 2]].forEach(([l, x, y, r]) => { s += stone(x, y, .62, l, { rot: r, size: 24 }); });
    s += `<path d="M -210 70 C -100 130 100 130 210 70 L 210 110 C 210 170 160 180 140 180 L -140 180 C -160 180 -210 170 -210 110 Z" fill="${K.packSh}" stroke="${K.ink}" stroke-width="5"/><path d="M -120 -180 C -120 -250 120 -250 120 -180" stroke="${K.ink}" stroke-width="22" fill="none"/><path d="M -120 -180 C -120 -250 120 -250 120 -180" stroke="${K.packSh}" stroke-width="12" fill="none"/></g>`;
  }
  return s;
}
function faceTop(t, o) {
  const st = o.strain || 0, hope = o.hope || 0;
  let f = '';
  if (hope > .5) f += `<ellipse cx="-33" cy="4" rx="22" ry="26" fill="#fff"/><ellipse cx="33" cy="4" rx="22" ry="26" fill="#fff"/><circle cx="-29" cy="-4" r="9" fill="${K.ink}"/><circle cx="37" cy="-4" r="9" fill="${K.ink}"/><path d="M -54 -46 L -16 -50 M 16 -50 L 54 -46" stroke="#fff" stroke-width="7" stroke-linecap="round"/><path d="M -20 56 Q 0 70 20 56" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  else {
    f += st > .5 ? `<path d="M -52 0 L -16 8 L -52 16 M 52 0 L 16 8 L 52 16" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>` : `<ellipse cx="-33" cy="4" rx="19" ry="22" fill="#fff"/><ellipse cx="33" cy="4" rx="19" ry="22" fill="#fff"/><circle cx="-33" cy="4" r="8" fill="${K.ink}"/><circle cx="33" cy="4" r="8" fill="${K.ink}"/>`;
    f += `<path d="M -56 -34 L -18 -42 M 18 -42 L 56 -34" stroke="#fff" stroke-width="7" stroke-linecap="round"/>`;
    f += st > .5 ? `<path d="M -26 62 L -13 56 L 0 62 L 13 56 L 26 62" stroke="#fff" stroke-width="6" fill="none" stroke-linejoin="round"/>` : `<path d="M -20 62 Q 0 58 20 62" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round"/>`;
  }
  return f;
}
export default function renderShot(t) {
  const press = eio(prog(t, 46.6, 47.0)) * (1 + .3 * Math.sin(cl((t - 46.86) / .3) * Math.PI));
  let s = bedScene(t, { press, strain: t > 46.86 ? 1 : 0 });
  s += `<path d="M 1100 -60 L 700 -60 L 300 1980 L 900 1980 Z" fill="#9fb8ff" opacity=".08"/>` + light(80, 420, 120, 100, '#ff4a4a', .35);
  s = cam(s, 540, 900, 1.0 + .05 * eio(prog(t, 44.5, 48.22)), 20, 0);
  s += dayCard(t, 44.5, 'FREITAGNACHT', { size: 96 });
  return frame(s, { vig: .7 });
}
