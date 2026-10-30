// 31.28–33.3: your wife opens Ben's child-seat buckle ("Verschlüsse der Kindersitze"): her hand presses the red button, the harness falls open
import { K, DEFS, BG, kidInSeat, foreArm, light, f1, prog, eio, eout, lerp } from './lib.js';
export default function renderShot(t) {
  const reach = eio(prog(t, 31.3, 31.75)), press = eout(prog(t, 31.75, 31.9)), open = eio(prog(t, 31.95, 32.6));
  const s = 2.3, x = 540, y = 520;
  const by = y + 220 * s + 5 * s; // buckle centre
  const hand = [lerp(-40, x - 60, reach), lerp(1500, by + 70, reach)];
  const hw = [lerp(hand[0], 120, eio(prog(t, 32.6, 33.2))), lerp(hand[1], 1350, eio(prog(t, 32.6, 33.2)))];
  const sc = `${BG('#0E1418')}<rect x="-60" y="-60" width="1200" height="2040" fill="#161D22"/>
    ${kidInSeat('kidB', x, y, s, { look: open > .5 ? -.6 : -.3, lookY: open > .5 ? .5 : 0, brow: 1, mouth: open > .5 ? 'o' : 'cry', tears: 1, open })}
    ${foreArm(-200, 1900, hw[0], hw[1] + 6 * press * (1 - open), K.wom, { finger: true, w: 130 })}
    ${light(540, 1000, 700, .4)}`;
  return `${DEFS}${sc}`;
}
