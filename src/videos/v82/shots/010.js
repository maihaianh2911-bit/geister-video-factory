// 36.32–39.18 the problem: the light drops to night blue on "merkst"; the kid can't even reach the door handle — "DU BIST SECHS." on "sechs"
import { K, kid, headline, T, fade, pop, prog, eio, lerp, f1 } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 36.5, 37.3));
  let s = `<rect width="1080" height="1920" fill="#f3e1c4"/><rect width="1080" height="1920" fill="${K.night}" opacity="${f1(d * 85) / 100}"/>`;
  s += `<rect x="0" y="1330" width="1080" height="590" fill="#d9b48a"/><rect x="0" y="1330" width="1080" height="590" fill="${K.night}" opacity="${f1(d * 70) / 100}"/>`;
  // a tall front door
  s += `<rect x="470" y="330" width="460" height="1000" rx="10" fill="#8a5a3a" stroke="${K.ol}" stroke-width="8"/><rect x="520" y="390" width="360" height="380" rx="8" fill="none" stroke="#6d4429" stroke-width="10"/><rect x="520" y="830" width="360" height="440" rx="8" fill="none" stroke="#6d4429" stroke-width="10"/>`;
  s += `<rect x="500" y="770" width="70" height="26" rx="12" fill="${K.gold}" stroke="${K.ol}" stroke-width="5"/>`;
  // height line to the handle
  const h = fade(t, 37.3, .3);
  s += `<g opacity="${f1(h * 100) / 100}"><path d="M 515 805 L 515 885" stroke="#fff" stroke-width="7" stroke-dasharray="12 10"/></g>`;
  // kid stretches up, can't reach
  const reach = eio(prog(t, 37.0, 37.5));
  const tip = Math.sin(t * 9) * 4 * reach;
  s += kid(640, 1330 - 14 * reach + tip, .95, { aL: [lerp(12, 145, reach), lerp(6, 15, reach)], aR: [12, 6], mouth: t > 38.3 ? 'sad' : 'o', brows: 'worried', look: [-8, -14 * reach] });
  s += headline(t, 240, ['DU BIST SECHS.'], 100, { t0: 38.4, fill: '#fff', mark: { word: 'SECHS.', t: 38.52, color: K.red } });
  return s;
}
