// 40.24–44.54: others are carried along and end up on top of each other ("mitgerissen … übereinander"):
// continues from shot 12's last pose. A new push from the left: the man behind (C) steps, his foot catches the
// legs of the fallen man, he pitches forward, hands land on the fallen man's back, he goes down on his knees
// across him; the next one (D) is pushed onto C the same way. Then the picture mutes to grey. No injuries shown.
import { cam, K, DEFS, BG, crowdRow, grain, f1, prog, eio, lerp } from './lib.js';
import { fig, kf, marks, stand, restHands } from './fall.js';
import { poses } from './012.js';

const G = 1400;
const mix = (p, q, k) => [lerp(p[0], q[0], k), lerp(p[1], q[1], k)];
const END = poses(40.24);

export default function renderShot(t) {
  const surge = eio(prog(t, 40.3, 40.8)) * (1 - eio(prog(t, 43.2, 43.9)));
  const A = { ...END.A }, B = { ...END.B }, E = { ...END.E }, F = { ...END.F };
  const mA = marks(A);
  // C: step → foot caught on A's legs → pitch → hands on A's back → knees down, lying across A's hips
  const C0 = END.C;
  const C = {
    col: K.c4, brow: 1,
    th: kf(t, [[40.45, C0.th], [40.95, 36], [41.3, 50], [41.65, 50]]),
    hip: kf(t, [[40.45, C0.hip], [40.95, [452, 1222]], [41.3, [470, 1262]], [41.65, [474, 1308]]]),
    fB: kf(t, [[40.95, C0.fB], [41.3, [372, G]], [41.65, [392, G]]]),
    fF: kf(t, [[40.5, C0.fF], [40.7, [440, G - 40]], [40.85, [458, G - 22]], [41.3, [470, G - 18]], [41.65, [420, G]]]),
  };
  const hC = eio(prog(t, 41.0, 41.3));
  const rC = { hF: C0.hF, hB: C0.hB };
  C.hF = mix(rC.hF, mA.back(70), hC); C.hB = mix(rC.hB, mA.back(40), hC);
  const mC = marks(C);
  // D: same chain onto C, a beat later ("übereinander")
  const D0 = END.D;
  const D = {
    col: K.c3, brow: 1,
    th: kf(t, [[41.65, D0.th], [41.95, 18], [42.35, 44], [42.75, 54], [43.1, 56]]),
    hip: kf(t, [[41.65, D0.hip], [41.95, [292, 1220]], [42.35, [318, 1250]], [42.75, [328, 1306]], [43.1, [330, 1308]]]),
    fB: kf(t, [[41.95, D0.fB], [42.35, [212, G]], [42.75, [244, G]]]),
    fF: kf(t, [[41.7, D0.fF], [41.88, [312, G - 40]], [42.05, [352, G - 16]], [42.35, [360, G - 14]], [42.75, [282, G]]]),
  };
  const dRest = restHands(D0, 30, 112);
  const hD = eio(prog(t, 42.3, 42.6));
  D.hF = mix(dRest.hF, mC.back(80), hD); D.hB = mix(dRest.hB, mC.back(50), hD);
  const P0 = stand(108 + 20 * surge, G, 9 + 10 * surge, { col: K.c1, crouch: 8 * surge });
  Object.assign(P0, restHands(P0, 40, 100));
  const mute = eio(prog(t, 42.8, 43.8));
  const arrows = [0, 1].map(k => `<path d="M ${f1(-40 + 110 * surge)} ${1000 + k * 150} l 140 0 m -38 -32 l 38 32 l -38 32" stroke="${K.red}" stroke-width="16" fill="none" stroke-linecap="round" stroke-linejoin="round" opacity="${f1(.9 * surge)}"/>`).join('');
  const sc = `${BG('url(#lSky)')}${grain(9)}<rect x="-60" y="1400" width="1200" height="600" fill="${K.concreteD}"/>
    ${crowdRow(t, 1180, .75, 11, -40, 110, 12, { lean: () => 12 + 6 * surge })}
    ${fig(F)}${fig(E)}${fig(B)}${fig(P0)}${fig(A)}${fig(C)}${fig(D)}${arrows}`;
  const z = lerp(1.22, 1.3, eio(prog(t, 40.4, 43.4)));
  return `${DEFS}<g style="filter:grayscale(${f1(.8 * mute)})"><rect x="-60" y="1100" width="1200" height="900" fill="${K.concreteD}"/>${cam(sc, z, 540, 1400, lerp(0, 40, eio(prog(t, 40.4, 43.4))), -290)}</g><rect x="-60" y="-60" width="1200" height="2040" fill="${K.paperD}" opacity="${f1(.35 * mute)}"/>`;
}
