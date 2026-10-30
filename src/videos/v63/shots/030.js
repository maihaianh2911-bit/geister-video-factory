// 55.7–57.64: the signal — his right hand holds the phone, fingertips round the left edge, thumb moves to SEND and hovers (no send yet: that is shot 33)
import { K, DEFS, BG, phone, grain, cam, prog, eio, lerp, TX, f1 } from './lib.js';
export default function renderShot(t) {
  const th = eio(prog(t, 55.9, 56.9));
  const tx = lerp(720, 590, th), ty = lerp(1340, 1262, th) + 6 * Math.sin(Math.max(0, t - 56.9) * 5);
  const scr = `${TX('POLIZEI', 100, 70, 30, K.ink)}<rect x="20" y="100" width="160" height="120" rx="14" fill="#B9C9C2"/><rect x="50" y="300" width="100" height="50" rx="25" fill="${K.red}"/><path d="M 84 325 L 116 325 M 104 313 L 116 325 L 104 337" stroke="#fff" stroke-width="6" fill="none" stroke-linecap="round"/>`;
  const wrist = `<path d="M 800 1420 L 1160 1900" stroke="${K.ink}" stroke-width="230" stroke-linecap="round"/><path d="M 800 1420 L 1160 1900" stroke="${K.skin}" stroke-width="214" stroke-linecap="round"/>
    <path d="M 900 1560 L 1200 1960" stroke="${K.ink}" stroke-width="270"/><path d="M 900 1560 L 1200 1960" stroke="${K.suit}" stroke-width="254"/><path d="M 900 1560 L 930 1600" stroke="#F2EEE6" stroke-width="254"/>`;
  const tips = [1000, 1120, 1240].map(y => `<ellipse cx="262" cy="${y}" rx="34" ry="44" fill="${K.skin}" stroke="${K.ink}" stroke-width="6"/>`).join('');
  const thumb = `<path d="M 790 1400 Q ${f1((790 + tx) / 2 + 20)} ${f1((1400 + ty) / 2 + 30)} ${f1(tx)} ${f1(ty)}" fill="none" stroke="${K.ink}" stroke-width="96" stroke-linecap="round"/><path d="M 790 1400 Q ${f1((790 + tx) / 2 + 20)} ${f1((1400 + ty) / 2 + 30)} ${f1(tx)} ${f1(ty)}" fill="none" stroke="${K.skin}" stroke-width="82" stroke-linecap="round"/>
    <ellipse cx="${f1(tx + 6)}" cy="${f1(ty - 4)}" rx="20" ry="16" fill="#E9C2A0" stroke="${K.ink}" stroke-width="4"/>`;
  const mound = `<ellipse cx="820" cy="1420" rx="120" ry="90" fill="${K.skin}" stroke="${K.ink}" stroke-width="6"/>`;
  return `${DEFS}${BG(K.brownD)}${cam(wrist + phone(540, 900, 2.6, 0, scr) + tips + mound + `<ellipse cx="820" cy="1420" rx="112" ry="82" fill="${K.skin}"/>` + thumb, 1, 540, 900)}${grain(t)}`;
}
