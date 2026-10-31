// 71.4–76.644: let the rescuers secure the lift and help you out one by one — a firefighter kneeling on the corridor floor (the sill sits higher than the cabin floor, as in shot 20) clips a lock onto the door ("sichern"),
// lies forward over the sill, takes the child under the arms ("einzeln") and lifts her up over the sill onto the corridor floor
import { K, DEFS, cabin, bust, light, label, f1, cam, prog, eio, eout, back, lerp } from './lib.js';
import { solve, limb } from './ik.js';
const SILL = 1060;
export default function renderShot(t) {
  const lockHand = eio(prog(t, 72.3, 72.85)) * (1 - eio(prog(t, 73.3, 73.8)));
  const lock = back(prog(t, 72.85, 73.2));
  const lean = eio(prog(t, 73.6, 74.3));                // kneels forward over the sill and reaches down
  const lift = eio(prog(t, 74.55, 75.9));               // straightens up, child comes with the hands
  // rescuer (kneeling behind the sill): shoulder line drops while leaning, rises while lifting
  const fy = lerp(lerp(820, 1000, lean), 760, lift), fx = lerp(540, 465, lift), fs = 1.0;
  const sh = [[fx - 78, fy + 30], [fx + 78, fy + 30]];
  // child: standing on the cabin floor, then carried up until she sits on the sill edge
  const kx = lerp(540, 640, lift), ky = lerp(1240, 775, lift), ks = 1.1;   // ends sitting on the sill edge beside him
  const grip = [[kx - 84, ky + 82], [kx + 84, ky + 82]];  // under the arms, on the sides of the torso
  const restL = [fx - 120, SILL - 8], restR = [fx + 120, SILL - 8];   // kneeling, hands braced on the sill
  const lockAt = [740, 930];
  const hL = lean > 0 ? [lerp(restL[0], grip[0][0], lean), lerp(restL[1], grip[0][1], lean)] : restL;
  const hR0 = [lerp(restR[0], lockAt[0], lockHand), lerp(restR[1], lockAt[1], lockHand)];
  const hR = lean > 0 ? [lerp(hR0[0], grip[1][0], lean), lerp(hR0[1], grip[1][1], lean)] : hR0;
  const L = solve(sh[0], lean > .98 ? grip[0] : hL, 165, 165, -1), R = solve(sh[1], lean > .98 ? grip[1] : hR, 165, 165, 1);
  const body = bust('you', fx, fy, fs, { look: 0, lookY: .9, brow: .2, mouth: 'smile', noL: true, noR: true }).replace(new RegExp(K.you, 'g'), K.fire).replace(new RegExp(K.youD, 'g'), '#8A2622');
  const helmet = `<path d="M ${fx - 64} ${fy - 150} Q ${fx} ${fy - 214} ${fx + 64} ${fy - 150} Z" fill="${K.fire}" stroke="${K.ink}" stroke-width="4"/>`;
  const stripe = `<path d="M ${fx - 92} ${fy + 120} H ${fx + 92}" stroke="${K.hiviz}" stroke-width="18"/>`;
  const opening = `<rect x="300" y="300" width="480" height="${SILL - 300}" fill="#E8E6D8"/>`;
  const face = `<rect x="300" y="${SILL}" width="480" height="${1500 - SILL}" fill="#9A8C76" stroke="${K.ink}" stroke-width="6"/><rect x="300" y="300" width="480" height="1200" fill="none" stroke="${K.ink}" stroke-width="6"/>`;
  const lockG = lock > 0 ? `<g transform="translate(${lockAt[0]} ${lockAt[1] + 40}) scale(${f1(lock)})"><rect x="-44" y="-20" width="88" height="70" rx="10" fill="${K.amber}" stroke="${K.ink}" stroke-width="6"/><path d="M -26 -20 v -24 q 26 -36 52 0 v 24" fill="none" stroke="${K.ink}" stroke-width="8"/></g>` : '';
  const kid = bust('kid', kx, ky, ks, { look: 0, lookY: -1, brow: .2, mouth: lift > .3 ? 'smile' : 'flat', aL: [[kx - 92, ky + 150], [kx - 96, ky + 250]], aR: [[kx + 92, ky + 150], [kx + 96, ky + 250]] });
  const arms = limb(sh[0], L.el, L.hand, K.fire, fs) + limb(sh[1], R.el, R.hand, K.fire, fs);
  const sc = `${cabin(t, { lit: 0, gap: 1, gapFill: '#E8E6D8' })}${opening}${body}${helmet}${stripe}${face}${lockG}
    ${light(540, 1150, 520, .9)}
    ${bust('wom', 210, 1180, 1.1, { look: .6, lookY: -.6, brow: .2, mouth: 'smile' })}${bust('man', 880, 1200, 1.1, { look: -.6, lookY: -.6, brow: .2 })}
    ${kid}${arms}`;
  return `${DEFS}${cam(sc, 1.0, 540, 900)}${label(540, 230, 'GESICHERT', eout(prog(t, 73.0, 73.3)) * (1 - prog(t, 74.0, 74.15)), K.amber, 60)}${label(540, 230, 'EINZELN', eout(prog(t, 74.15, 74.4)), K.amber, 60)}`;
}
