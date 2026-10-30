// 52.4–56.24: laminated glass (Verbundglas) does not crumble: same pane, a foil layer between two glass sheets; the hammer strikes, cracks spread but the pane holds together
import { K, DEFS, BG, hammer, arm, label, TX, f1, prog, eio, ein, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 52.5, 53.2)), swing = ein(prog(t, 53.7, 54.0)), hit = t >= 54.0, reb = eout(prog(t, 54.0, 54.5));
  const ang = hit ? lerp(-40, -10, reb) : lerp(lerp(35, 25, lift), -40, swing);
  const gx = hit ? lerp(1090, 1110, reb) : lerp(lerp(1100, 1080, lift), 1090, swing), gy = hit ? lerp(1195, 1290, reb) : lerp(lerp(1700, 1330, lift), 1195, swing);
  const cr = eout(prog(t, 54.0, 54.4));
  let cracks = '';
  if (hit) { for (let i = 0; i < 14; i++) { const a = Math.PI + i * (Math.PI / 2) / 13 - .05, L = (260 + 360 * hash(i)) * cr; let d = 'M 875 1135'; let x = 875, y = 1135;
      for (let k = 1; k <= 4; k++) { x = 875 + Math.cos(a + (hash(i * 9 + k) - .5) * .3) * L * k / 4; y = 1135 + Math.sin(a + (hash(i * 7 + k) - .5) * .3) * L * k / 4 * -1; d += ` L ${f1(x)} ${f1(Math.min(1160, y))}`; }
      cracks += `<path d="${d}" fill="none" stroke="${K.white}" stroke-width="4" opacity=".85"/>`; }
    for (let r = 1; r <= 3; r++) cracks += `<path d="M ${f1(875 - 70 * r * cr)} 1135 A ${f1(70 * r * cr)} ${f1(70 * r * cr)} 0 0 1 875 ${f1(1135 - 70 * r * cr)}" fill="none" stroke="${K.white}" stroke-width="3" opacity=".7"/>`; }
  const sec = eout(prog(t, 52.9, 53.3));
  const inset = sec <= 0 ? '' : `<g opacity="${f1(sec)}" transform="translate(540 1330)"><rect x="-300" y="-60" width="600" height="120" fill="#05080A" stroke="${K.mono}" stroke-width="3"/>
    <rect x="-260" y="-34" width="520" height="22" fill="${K.glassL}"/><rect x="-260" y="-10" width="520" height="16" fill="${K.amber}"/><rect x="-260" y="8" width="520" height="22" fill="${K.glassL}"/>
    ${TX('FOLIE', 290, 6, 26, K.amber, 'end')}</g>`;
  const sc = `${BG('#121A1F')}<rect x="150" y="370" width="780" height="820" rx="56" fill="none" stroke="${K.ink}" stroke-width="22"/><rect x="150" y="370" width="780" height="820" rx="56" fill="none" stroke="#3A464E" stroke-width="12"/>
    <rect x="180" y="400" width="720" height="760" rx="40" fill="${K.glassL}" opacity="${f1(.35 + .1 * cr)}"/><path d="M 260 470 L 420 470" stroke="${K.white}" stroke-width="10" opacity=".5" stroke-linecap="round"/>
    <clipPath id="s21p"><rect x="180" y="400" width="720" height="760" rx="40"/></clipPath><g clip-path="url(#s21p)">${cracks}</g>
    ${arm([1200, 1900], [1180, 1560], [gx, gy], 1.4, K.you, { noHand: true })}${hammer(gx, gy, 1.05, ang)}<circle cx="${f1(gx)}" cy="${f1(gy)}" r="40" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>${inset}`;
  return `${DEFS}${sc}${label(540, 250, 'VERBUNDGLAS', eout(prog(t, 52.45, 52.75)), K.mono, 76)}`;
}
