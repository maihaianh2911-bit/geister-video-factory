// 64.84–67.72 "genau hier beginnt das eigentliche Problem": the light drains to night, the golden memory cloud cracks on "Problem"
import { K, kid, glow, cloudPath, icon, headline, fade, prog, eio, eout, f1 } from './lib.js';
export default function renderShot(t) {
  const d = eio(prog(t, 65.0, 66.6));
  let s = `<rect width="1080" height="1920" fill="#5a4d82"/><rect width="1080" height="1920" fill="${K.night}" opacity="${f1(d * 100) / 100}"/><rect x="0" y="1330" width="1080" height="590" fill="#232a4d"/>`;
  const cr = eout(prog(t, 66.8, 67.1));
  s += glow(540, 620, 360, K.gold, .5 * (1 - .6 * cr));
  const split = 24 * cr;
  const cloud = `<path d="${cloudPath(540, 620, 380, 240, 11)}" fill="${K.goldL}" stroke="${K.ol}" stroke-width="7"/>` + icon('cap', 400, 560, 1) + icon('car', 560, 500, 1) + icon('laptop', 700, 600, 1) + icon('heart', 470, 690, 1) + icon('plane', 640, 720, 1);
  const crackPath = 'M 560 360 L 520 470 L 580 560 L 500 650 L 560 760 L 530 880';
  s += `<clipPath id="v82c19L"><path d="M 0 0 L 560 360 L 520 470 L 580 560 L 500 650 L 560 760 L 530 880 L 0 1000 Z"/></clipPath><clipPath id="v82c19R"><path d="M 1080 0 L 560 360 L 520 470 L 580 560 L 500 650 L 560 760 L 530 880 L 1080 1000 Z"/></clipPath>`;
  s += `<g clip-path="url(#v82c19L)" transform="translate(${f1(-split)} ${f1(split * .4)}) rotate(${f1(-2 * cr)} 540 620)">${cloud}</g><g clip-path="url(#v82c19R)" transform="translate(${f1(split)} ${f1(split * .2)}) rotate(${f1(2 * cr)} 540 620)">${cloud}</g>`;
  if (cr > 0) s += `<path d="${crackPath}" stroke="${K.night}" stroke-width="${f1(8 + 30 * cr)}" fill="none" stroke-linejoin="round" opacity="${f1(cr * 100) / 100}"/>`;
  s += headline(t, 230, ['DAS EIGENTLICHE', 'PROBLEM'], 84, { t0: 65.6, fill: '#fff', mark: { word: 'PROBLEM', t: 66.8, color: K.red } });
  s += kid(540, 1330, .8, { aL: [12, 6], aR: [12, 6], mouth: cr > .5 ? 'o' : 'flat', brows: 'worried', look: [0, -14] });
  return s;
}
