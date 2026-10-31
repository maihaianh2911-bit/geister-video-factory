import { K, card, ground, antTop, f1, prog, lerp } from './lib.js';
// 24.02–26.6 Macro top-down: a follower ant sweeps its antennae over the scent dots and keeps to them ("orientieren sich").
export default function renderShot(t) {
  const y = lerp(1500, 520, prog(t, 24.02, 26.6));
  let dots = '';
  for (let i = 0; i < 26; i++) { const dy = i * 70 - 60, dx = 540 + 26 * Math.sin(i * 1.3); dots += `<circle cx="${f1(dx)}" cy="${dy}" r="16" fill="${K.trail}" opacity=".85"/>`; }
  const sweep = Math.sin(t * 9) * 22;
  const hl = t > 25.12 ? `<circle cx="540" cy="${f1(y - 150)}" r="${f1(80 + 10 * Math.sin(t * 10))}" fill="none" stroke="${K.trailL}" stroke-width="10" opacity=".8"/>` : '';
  return `${ground(4)}${dots}${hl}${antTop(540 + 10 * Math.sin(t * 3), y, -90, 3, t * 18, { ant: sweep })}
    ${card(540, 1300, 'CHEMISCHE SPUR', 64, prog(t, 25.6, 25.85), { col: K.trail })}`;
}
