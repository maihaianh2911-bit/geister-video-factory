// 45.22–49.16: an emergency hammer can smash a pane of toughened glass (ESG): the hammer in your hand strikes the pane's corner and it crumbles into small cubes ("zertrümmern")
import { K, DEFS, BG, hammer, arm, label, f1, prog, eio, ein, eout, lerp, hash } from './lib.js';
export default function renderShot(t) {
  const lift = eio(prog(t, 45.4, 46.2)), swing = ein(prog(t, 47.7, 48.06)), hit = t >= 48.06;
  const ang = lerp(lerp(35, 25, lift), -40, swing);
  // hand/grip; the hammer head ends at the pane's lower-right corner on impact
  const gx = lerp(lerp(1000, 960, lift), 951, swing), gy = lerp(lerp(1700, 1290, lift), 1134, swing);
  const fall = prog(t, 48.06, 49.16);
  let cubes = '';
  if (hit) for (let i = 0; i < 90; i++) { const cx = 140 + (i % 10) * 62 + 10 * hash(i), cy = 400 + Math.floor(i / 10) * 76 + 10 * hash(i + 3);
    const d = fall * fall * (500 + 400 * hash(i * 2)); cubes += `<rect x="${f1(cx + (hash(i * 5) - .5) * 120 * fall)}" y="${f1(cy + d)}" width="30" height="30" fill="${K.glassL}" opacity="${f1(.75 * (1 - fall * .6))}" transform="rotate(${f1(hash(i) * 60 * fall)} ${f1(cx)} ${f1(cy + d)})" stroke="${K.ink}" stroke-width="2"/>`; }
  const pane = hit ? '' : `<rect x="120" y="380" width="640" height="720" rx="40" fill="${K.glassL}" opacity=".35"/><path d="M 200 450 L 360 450" stroke="${K.white}" stroke-width="10" opacity=".5" stroke-linecap="round"/>`;
  const sc = `${BG('#121A1F')}<rect x="90" y="350" width="700" height="780" rx="56" fill="none" stroke="${K.ink}" stroke-width="22"/><rect x="90" y="350" width="700" height="780" rx="56" fill="none" stroke="#3A464E" stroke-width="12"/>
    ${pane}${cubes}
    ${hit ? `<circle cx="735" cy="1075" r="${f1(40 + 140 * eout(fall))}" fill="none" stroke="${K.amberL}" stroke-width="6" opacity="${f1(1 - fall)}"/>` : ''}
    ${arm([1150, 1900], [1110, 1520], [gx, gy], 1.4, K.you, { noHand: true })}${hammer(gx, gy, 1.05, ang)}<circle cx="${f1(gx)}" cy="${f1(gy)}" r="40" fill="${K.skin}" stroke="${K.ink}" stroke-width="5"/>`;
  return `${DEFS}${sc}${label(540, 250, 'ESG', eout(prog(t, 46.8, 47.1)), K.amber, 84)}`;
}
