// 52.4–56.24: laminated glass (Verbundglas) does not crumble: same pane, a foil layer between two glass sheets; the hammer strikes, cracks spread but the pane holds together
import { K, DEFS, BG, hammer, arm, label, TX, f1, prog, eio, ein, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 52.5, 53.2)), swing = ein(prog(t, 53.7, 54.0)), hit = t >= 54.0, reb = eout(prog(t, 54.0, 54.5));
  const ang = hit ? lerp(-40, -10, reb) : lerp(lerp(35, 25, lift), -40, swing);
  const gx = hit ? lerp(951, 990, reb) : lerp(lerp(1000, 960, lift), 951, swing), gy = hit ? lerp(1134, 1240, reb) : lerp(lerp(1700, 1290, lift), 1134, swing);
  const cr = eout(prog(t, 54.0, 54.4));
  let cracks = '';
  if (hit) { for (let i = 0; i < 14; i++) { const a = Math.PI + i * (Math.PI / 2) / 13, L = (380 + 420 * hash(i)) * cr; let d = 'M 735 1075'; let x = 735, y = 1075;
      for (let k = 1; k <= 4; k++) { x = 735 + Math.cos(a + (hash(i * 9 + k) - .5) * .3) * L * k / 4; y = 1075 + Math.sin(a + (hash(i * 7 + k) - .5) * .3) * L * k / 4; d += ` L ${f1(x)} ${f1(y)}`; }
      cracks += `<path d="${d}" fill="none" stroke="${K.white}" stroke-width="5" opacity=".9"/>`; }
    for (let r = 1; r <= 3; r++) cracks += `<path d="M ${f1(735 - 90 * r * cr)} 1075 A ${f1(90 * r * cr)} ${f1(90 * r * cr)} 0 0 1 735 ${f1(1075 - 90 * r * cr)}" fill="none" stroke="${K.white}" stroke-width="3" opacity=".7"/>`; }
  const sec = eout(prog(t, 52.9, 53.3));
  const inset = sec <= 0 ? '' : `<g opacity="${f1(sec)}" transform="translate(440 1300)"><rect x="-300" y="-60" width="600" height="120" fill="#05080A" stroke="${K.mono}" stroke-width="3"/>
    <rect x="-260" y="-34" width="520" height="22" fill="${K.glassL}"/><rect x="-260" y="-10" width="520" height="16" fill="${K.amber}"/><rect x="-260" y="8" width="520" height="22" fill="${K.glassL}"/>
    ${TX('GLAS · FOLIE · GLAS', 0, -78, 34, K.mono)}</g>`;
  const sc = `${BG('#121A1F')}<rect x="90" y="350" width="700" height="780" rx="56" fill="none" stroke="${K.ink}" stroke-width="22"/><rect x="90" y="350" width="700" height="780" rx="56" fill="none" stroke="#3A464E" stroke-width="12"/>
    <rect x="120" y="380" width="640" height="720" rx="40" fill="${K.glassL}" opacity="${f1(.35 + .1 * cr)}"/><path d="M 200 450 L 360 450" stroke="${K.white}" stroke-width="10" opacity=".5" stroke-linecap="round"/>
    <clipPath id="s21p"><rect x="120" y="380" width="640" height="720" rx="40"/></clipPath><g clip-path="url(#s21p)">${cracks}</g>
    ${arm([1150, 1900], [1110, 1520], [gx, gy], 1.4, K.you, { noHand: true })}${hammer(gx, gy, 1.05, ang)}<circle cx="${f1(gx)}" cy="${f1(gy)}" r="40" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>${inset}`;
  return `${DEFS}${sc}${label(540, 250, 'VERBUNDGLAS', eout(prog(t, 52.45, 52.75)), K.mono, 76)}`;
}
