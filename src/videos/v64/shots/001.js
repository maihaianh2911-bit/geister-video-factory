// 0–2.44: cover — 1950, the hanging carriage over the Wupper; on "springt" the side panel bursts and Tuffi tumbles out
import { K, DEFS, bahnScene, tuffi, card, stamp, HL, grain, cam, shards, prog, eout, eio, lerp, shk } from './lib.js';
import { fallingTuffi, T_OUT } from './fall.js';
export default function renderShot(t) {
  const open = eout(prog(t, T_OUT, 1.32));
  const [sx, sy] = shk(t, T_OUT, 10, 5);
  const world = bahnScene(t, { carX: 540, car: { faces: true, inner: t < T_OUT ? tuffi(lerp(-40, 0, prog(t, 0, T_OUT)), 352, .62, { tr: lerp(.3, .9, prog(t, .3, .9)), ear: 1, eye: 'wide', rot: -6 * prog(t, .4, T_OUT) }) : '', bulge: lerp(.25, 1, prog(t, 0, T_OUT)), open: t >= T_OUT ? open : 0, tilt: 2 * Math.sin(t * 2.2) + (t > T_OUT ? 3 * Math.exp(-(t - T_OUT) * 3) * Math.sin((t - T_OUT) * 14) : 0) },
    over: shards(540, 585, prog(t, T_OUT, 2.2), 14, .8, 3) + fallingTuffi(t) });
  return `${DEFS}${cam(world, lerp(2.25, 2.1, eio(prog(t, 0, 2.44))), 540, 640, sx, sy)}
    <rect x="70" y="1130" width="940" height="250" fill="${K.paperL}" stroke="${K.ink}" stroke-width="6"/>
    ${HL('DER ELEFANT', 540, 1235, 96, K.ink, 0)}${HL('IN DER SCHWEBEBAHN', 540, 1335, 70, K.red, 0)}
    ${stamp(860, 1040, '1950', 72, prog(t, .53, .8), -10)}${grain(t)}`;
}
