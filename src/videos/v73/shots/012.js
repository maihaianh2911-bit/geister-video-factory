// 36.82–40.24: people lose their balance and fall ("Gleichgewicht … stürzten") — a contact chain in a packed row:
// the crowd presses from the left, the man behind pushes the grey-brown figure with both hands on his back;
// he pitches forward, his step is blocked, his hands land on the back of the person in front (who staggers and
// catches himself on the next back), then his knees buckle and he goes down onto knees and forearms.
import { cam, K, DEFS, BG, crowdRow, grain, f1, prog, eio, eout, lerp } from './lib.js';
import { fig, kf, marks, stand, restHands } from './fall.js';

const G = 1400;
const mix = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];

export function poses(t) {
  const press = eio(prog(t, 36.9, 37.5));
  const base = 7 + 4 * press;
  // A: the one who falls
  const A = {
    col: K.c2, brow: 1,
    th: kf(t, [[37.25, base], [38.05, 32], [38.55, 38], [39.0, 64], [39.45, 96]]),
    hip: kf(t, [[37.25, [556, 1218]], [38.05, [590, 1212]], [38.55, [598, 1224]], [39.0, [585, 1306]], [39.45, [548, 1314]]]),
    fB: kf(t, [[38.55, [530, G]], [39.2, [452, G]]]),
    fF: kf(t, [[37.5, [574, G]], [37.68, [598, G - 34]], [37.86, [616, G]], [38.6, [616, G]], [39.3, [500, G]]]),
  };
  // B: in front of A — gets A's hands on his back, staggers two steps and braces on E
  const B = {
    col: K.c5, brow: 1,
    th: kf(t, [[38.1, base], [38.4, 24], [38.95, 30], [39.6, 20]]),
    hip: kf(t, [[38.1, [706, 1218]], [38.5, [748, 1226]], [39.0, [806, 1230]], [39.6, [826, 1222]]]),
    fB: kf(t, [[38.35, [680, G]], [38.62, [740, G - 34]], [38.85, [806, G]]]),
    fF: kf(t, [[38.12, [724, G]], [38.32, [770, G - 34]], [38.52, [846, G]]]),
  };
  const E = stand(lerp(860, 912, eio(prog(t, 38.7, 39.3))), G, kf(t, [[38.6, base], [39.0, 17], [39.6, 12]]), { col: K.c1, fx: 26 * eio(prog(t, 38.75, 39.05)) });
  // C: behind A — pushed by the crowd, both hands on A's back
  const C = stand(400 + 22 * press, G, kf(t, [[36.9, 7], [37.4, 17], [38.6, 19], [39.3, 24]]), { col: K.c4, crouch: 10 * eio(prog(t, 38.8, 39.4)) });
  const D = stand(250 + 14 * press, G, base + 2, { col: K.c3 });
  const P0 = stand(100 + 8 * press, G, base, { col: K.c1 });
  const F = stand(1010, G, 6, { col: K.c4 });
  // hands
  const mA = marks(A), mB = marks(B), mE = marks(E);
  const onB = eio(prog(t, 37.8, 38.12)), offB = eio(prog(t, 38.62, 39.05));
  const rA = restHands(A, 34, 110);
  let hFA = mix(rA.hF, mB.back(100), onB), hBA = mix(rA.hB, mB.back(72), onB);
  const groundF = [A.hip[0] + 170, G - 8], groundB = [A.hip[0] + 150, G - 6];
  A.hF = mix(hFA, groundF, offB); A.hB = mix(hBA, groundB, offB);
  const onE = eio(prog(t, 38.55, 38.85));
  const rB = restHands(B, 34, 110);
  B.hF = mix(rB.hF, mE.back(96), onE); B.hB = mix(rB.hB, mE.back(70), onE);
  const mAc = marks(A);
  const onA = eio(prog(t, 36.95, 37.35)), offA = eio(prog(t, 38.75, 39.2));
  const rC = restHands(C, 34, 110);
  const reach = [A.hip[0] - 10, A.hip[1] - 70];
  C.hF = mix(mix(rC.hF, mAc.back(96), onA), reach, offA); C.hB = mix(mix(rC.hB, mAc.back(66), onA), [reach[0] - 26, reach[1] + 8], offA);
  for (const p of [D, P0, F, E]) Object.assign(p, restHands(p, 30, 112));
  return { A, B, C, D, E, F, P0, press };
}

export default function renderShot(t) {
  const { A, B, C, D, E, F, P0, press } = poses(t);
  const arrows = [0, 1].map(k => `<path d="M ${f1(-40 + 110 * press)} ${1000 + k * 150} l 140 0 m -38 -32 l 38 32 l -38 32" stroke="${K.red}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(.9 * press * (1 - eio(prog(t, 39.4, 39.9))))}"/>`).join('');
  const sc = `${BG('url(#lSky)')}${grain(9)}<rect x="-60" y="1400" width="1200" height="600" fill="${K.concreteD}"/>
    ${crowdRow(t, 1180, .75, 11, -40, 110, 12, { lean: () => 6 + 6 * press })}
    ${fig(F)}${fig(E)}${fig(B)}${fig(P0)}${fig(D)}${fig(A)}${fig(C)}${arrows}`;
  return `${DEFS}<rect x="-60" y="1100" width="1200" height="900" fill="${K.concreteD}"/>${cam(sc, 1.22, 540, 1400, 0, -290)}`;
}
