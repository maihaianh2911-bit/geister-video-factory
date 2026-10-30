// Cover 0–1.4: ceiling smoke detector shrieks at 03:00, smoke creeps along the ceiling; headline.
import { K, BG, DEFS, FG, cam, prog, back, eout, shk, detector, alarmRings, lab, smokeFlow, TX } from './lib.js';
export default function renderShot(t) {
  const punch = 1.18 - .18 * eout(prog(t, 0, .35));
  const led = Math.sin(t * 26) > -.2 ? 1 : .15;
  const [sx, sy] = shk(t, .05, 16, 5);
  const h1 = 1 + .12 * (1 - back(prog(t, 0, .3))), h2 = 1 + .12 * (1 - back(prog(t, .08, .38))), c = 1;
  const scene = `<rect x="-60" y="-60" width="1200" height="760" fill="#E7E2DA" opacity=".12"/>
    <rect x="-60" y="-60" width="1200" height="2040" fill="#1E2A30"/>
    <rect x="-60" y="-60" width="1200" height="520" fill="#2A3840"/><path d="M -60 460 H 1140" stroke="${K.ol}" stroke-width="8"/>
    ${smokeFlow(t + 1.2, { t0: 0, x0: -120, y0: 300, vx: 230, vy: 0, n: 30, gap: .06, life: 9, r0: 70, grow: 30, spread: 120, seed: 3, op: .85, keep: 1 })}
    ${alarmRings(t, 0, 540, 560, .45, 600)}
    ${detector(540, 470, 2.3, led)}`;
  return `${DEFS}${BG('#1E2A30')}<g transform="translate(${sx} ${sy})">${cam(scene, punch, 540, 520)}</g>
    <rect x="-60" y="-60" width="1200" height="2040" fill="${K.red}" opacity="${.12 * led}"/>
    ${lab('03:00', 540, 800, 96, c, K.red)}
    <g transform="translate(540 1110) scale(${h1})">${TX('RAUCH IM', 0, 0, 130, '#FFFFFF', 'middle', `stroke="${K.ol}" stroke-width="16" paint-order="stroke"`)}</g>
    <g transform="translate(540 1260) scale(${h2})">${TX('TREPPENHAUS', 0, 0, 112, K.amb, 'middle', `stroke="${K.ol}" stroke-width="16" paint-order="stroke"`)}</g>
    ${FG(1440)}`;
}
