// Cover: brain freeze face with cone, HIRNFROST headline slams in.
import { P, prog, eout, back, punch, shake, parlour, bust, painBurst, frostCrystal, label } from './lib.js';
export default function renderShot(t) {
  const z = 1 + .22 * (1 - eout(prog(t, 0, .35)));
  const hit = prog(t, .12, .42);
  const [sx, sy] = shake(t, .3, 10, 6);
  const trem = 3 * Math.sin(t * 40);
  const fx = 540, fy = 1060 - (230 + 78) * 1.45;
  let fr = '';
  for (let i = 0; i < 5; i++) fr += frostCrystal(fx + [-150, 160, -40, 90, 0][i], fy + [-10, 20, -110, -90, 40][i], 46 * back(prog(t, .3 + i * .05, .55 + i * .05)), i * 17, P.cold);
  const body = `${parlour(t, { blur: true })}
    <rect x="0" y="0" width="1080" height="1920" fill="${P.ice}" opacity=".25"/>
    <g transform="translate(${540 + sx} ${1060 + sy}) scale(1.45)">${bust({ id: 's1', hand: [175, 170 + trem], head: { eyes: 'squeeze', mouth: 'ouch', brow: -1, blush: .8 }, coneO: { bite: 1 }, tilt: -4 })}</g>
    ${painBurst(fx + sx, fy + sy, 70 * back(hit), hit, P.cold)}${fr}
`;
  return `<g transform="translate(540 760) scale(${z}) translate(-540 -760)">${body}</g>${label(540, 230, 'HIRNFROST', 132, { s: 1 + .12 * (1 - back(prog(t, 0, .3))), rot: -3 })}`;
}
